import { NextResponse } from "next/server";
import { createQrCodeDataUrl, buildPhotoFinderUrl } from "@/lib/photo-finder/qr";
import { getEvent } from "@/lib/photo-finder/storage";
import { isPhotoFinderAdmin, unauthorized } from "@/lib/photo-finder/admin";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: Promise<{ "event-id": string }> }) {
  const { "event-id": eventId } = await params;
  if (!isPhotoFinderAdmin(request)) return unauthorized();
  const event = await getEvent(eventId);
  if (!event) return NextResponse.json({ error: "Event not found." }, { status: 404 });
  const url = buildPhotoFinderUrl(eventId, process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin);
  return NextResponse.json({ eventId, url, qrDataUrl: await createQrCodeDataUrl(url) });
}
