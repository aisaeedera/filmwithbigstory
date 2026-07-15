import { NextResponse } from "next/server";
import { addPhoto, getEvent, tagPhoto } from "@/lib/photo-finder/storage";
import { badRequest, isPhotoFinderAdmin, unauthorized } from "@/lib/photo-finder/admin";
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";

export const runtime = "nodejs";
const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);

function safeFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/-+/g, "-").slice(0, 100) || "photo.jpg";
}

export async function POST(request: Request, { params }: { params: Promise<{ "event-id": string }> }) {
  const { "event-id": eventId } = await params;
  if (!isPhotoFinderAdmin(request)) return unauthorized();
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !file.size) return badRequest("A photo file is required.");
  if (file.size > MAX_UPLOAD_BYTES) return badRequest("Photo must be 25 MB or smaller.");
  if (!allowedImageTypes.has(file.type)) return badRequest("Please upload a JPG, PNG, WebP, or HEIC image.");
  const event = await getEvent(eventId);
  if (!event) return NextResponse.json({ error: "Event not found." }, { status: 404 });
  const photoId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const relativeDir = path.join("uploads", "photo-finder", eventId);
  const absoluteDir = path.join(process.cwd(), "public", relativeDir);
  await mkdir(absoluteDir, { recursive: true });
  const relativePath = path.join(relativeDir, `${photoId}-${safeFileName(file.name)}`).replaceAll(path.sep, "/");
  await writeFile(path.join(process.cwd(), "public", relativePath), Buffer.from(await file.arrayBuffer()));
  const tags = String(form.get("tags") || "").split(",");
  const photo = await addPhoto(eventId, { id: photoId, url: `/${relativePath}`, tags, caption: String(form.get("caption") || "").trim(), uploadedAt: new Date().toISOString() });
  return NextResponse.json({ ok: true, event: photo });
}

export async function PUT(request: Request, { params }: { params: Promise<{ "event-id": string }> }) {
  const { "event-id": eventId } = await params;
  if (!isPhotoFinderAdmin(request)) return unauthorized();
  let body: { photoId?: string; tags?: string[] };
  try { body = await request.json(); } catch { return badRequest("Invalid JSON."); }
  if (!body.photoId || !Array.isArray(body.tags)) return badRequest("photoId and tags are required.");
  try {
    const photo = await tagPhoto(eventId, body.photoId, body.tags);
    return NextResponse.json({ ok: true, photo });
  } catch (error) {
    if (error instanceof Error && error.message === "EVENT_NOT_FOUND") return NextResponse.json({ error: "Event not found." }, { status: 404 });
    if (error instanceof Error && error.message === "PHOTO_NOT_FOUND") return NextResponse.json({ error: "Photo not found." }, { status: 404 });
    return NextResponse.json({ error: "Unable to tag photo." }, { status: 500 });
  }
}
