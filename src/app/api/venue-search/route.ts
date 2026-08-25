import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

/**
 * Venue search logging API.
 * Saves every venue search to a JSON file for building the venue database.
 * This data will be used to create "hot places" lists and venue recommendations.
 */

const DATA_DIR = path.join(process.cwd(), "data");
const VENUE_FILE = path.join(DATA_DIR, "venue-searches.json");

interface VenueSearch {
  venue: string;
  placeId: string;
  celebrationType: string;
  timestamp: string;
  ip?: string;
  userAgent?: string;
}

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

async function loadSearches(): Promise<VenueSearch[]> {
  try {
    if (existsSync(VENUE_FILE)) {
      const data = await readFile(VENUE_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // File corrupted or unreadable, start fresh
  }
  return [];
}

async function saveSearches(searches: VenueSearch[]) {
  await ensureDataDir();
  await writeFile(VENUE_FILE, JSON.stringify(searches, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { venue, placeId, celebrationType, timestamp } = body;

    if (!venue || !timestamp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const search: VenueSearch = {
      venue,
      placeId: placeId || "",
      celebrationType: celebrationType || "unknown",
      timestamp,
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    };

    const searches = await loadSearches();

    // Deduplicate: same venue + same day = one entry (keep first search)
    const today = new Date(timestamp).toISOString().split("T")[0];
    const isDuplicate = searches.some(
      (s) => s.venue === venue && s.timestamp.startsWith(today)
    );

    if (!isDuplicate) {
      searches.push(search);
      await saveSearches(searches);
    }

    return NextResponse.json({ ok: true, totalSearches: searches.length });
  } catch (error) {
    console.error("Venue search logging error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const searches = await loadSearches();

    // Aggregate: count by venue, sorted by frequency
    const venueCounts: Record<string, { count: number; placeId: string; lastSearched: string; celebrationTypes: Set<string> }> = {};

    for (const s of searches) {
      const key = s.venue.toLowerCase().trim();
      if (!venueCounts[key]) {
        venueCounts[key] = {
          count: 0,
          placeId: s.placeId,
          lastSearched: s.timestamp,
          celebrationTypes: new Set(),
        };
      }
      venueCounts[key].count++;
      venueCounts[key].celebrationTypes.add(s.celebrationType);
      if (s.timestamp > venueCounts[key].lastSearched) {
        venueCounts[key].lastSearched = s.timestamp;
      }
    }

    // Convert to sorted array
    const hotVenues = Object.entries(venueCounts)
      .map(([venue, data]) => ({
        venue,
        placeId: data.placeId,
        searchCount: data.count,
        lastSearched: data.lastSearched,
        celebrationTypes: Array.from(data.celebrationTypes),
      }))
      .sort((a, b) => b.searchCount - a.searchCount);

    return NextResponse.json({
      totalSearches: searches.length,
      uniqueVenues: hotVenues.length,
      hotVenues: hotVenues.slice(0, 50), // Top 50
      recentSearches: searches.slice(-20).reverse(), // Last 20
    });
  } catch (error) {
    console.error("Venue search read error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
