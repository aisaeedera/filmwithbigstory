import { NextResponse } from "next/server";
import { createEvent } from "@/lib/photo-finder/storage";
import { isPhotoFinderAdmin, badRequest, unauthorized } from "@/lib/photo-finder/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isPhotoFinderAdmin(request)) return unauthorized();
  let body: { id?: string; name?: string; date?: string; location?: string; coverImage?: string };
  try { body = await request.json(); } catch { return badRequest("Invalid JSON."); }
  if (!body.id || !body.name || !body.date || !body.location) return badRequest("id, name, date, and location are required.");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.id)) return badRequest("id must be a lowercase URL slug.");
  try {
    const event = await createEvent({ id: body.id, name: body.name, date: body.date, location: body.location, totalPhotos: 0, photos: [], submissions: [], status: "pre-editing", ...(body.coverImage ? { coverImage: body.coverImage } : {}) });
    return NextResponse.json({ ok: true, event }, { status: 201 });
  } catch { return NextResponse.json({ error: "Unable to create event." }, { status: 500 }); }
}
