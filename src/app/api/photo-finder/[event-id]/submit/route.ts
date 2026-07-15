import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { addSubmission, getMatches, PHOTO_FINDER_RUNTIME_DIRECTORY } from "@/lib/photo-finder/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);

function safeFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/-+/g, "-").slice(0, 100) || "upload.jpg";
}

export async function POST(request: Request, { params }: { params: Promise<{ "event-id": string }> }) {
  const { "event-id": eventId } = await params;
  const form = await request.formData();
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const faceThumbnail = String(form.get("faceThumbnail") || "").trim();
  const file = form.get("photo");
  if (!name || !email) return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  if (file && !(file instanceof File)) return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  if (file instanceof File && file.size > MAX_UPLOAD_BYTES) return NextResponse.json({ error: "Photo must be 10 MB or smaller." }, { status: 400 });
  if (file instanceof File && file.type && !allowedImageTypes.has(file.type)) return NextResponse.json({ error: "Please upload a JPG, PNG, WebP, or HEIC image." }, { status: 400 });

  let photoUpload: { name: string; type: string; size: number; path?: string } | undefined;
  if (file instanceof File && file.size > 0) {
    const submissionId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const relativeDir = path.join("uploads", "photo-finder", eventId);
    const absoluteDir = process.env.VERCEL
      ? path.join(PHOTO_FINDER_RUNTIME_DIRECTORY, "..", "..", "..", "uploads", eventId)
      : path.join(process.cwd(), "public", relativeDir);
    await mkdir(absoluteDir, { recursive: true });
    const uploadFileName = `${submissionId}-${safeFileName(file.name)}`;
    await writeFile(path.join(absoluteDir, uploadFileName), Buffer.from(await file.arrayBuffer()));
    const relativePath = path.join(relativeDir, uploadFileName).replaceAll(path.sep, "/");
    photoUpload = { name: file.name, type: file.type, size: file.size, ...(process.env.VERCEL ? {} : { path: `/${relativePath}` }) };
  }

  try {
    const submission = await addSubmission(eventId, { name, email, ...(faceThumbnail ? { faceThumbnail } : {}), ...(photoUpload ? { photoUpload } : {}) });
    const result = await getMatches(eventId, submission);
    const isPreEditing = result.event?.status === "pre-editing" || result.event?.photos.length === 0;
    return NextResponse.json({
      ok: true,
      submissionId: submission.id,
      status: isPreEditing ? "pre-editing" : result.status,
      photos: isPreEditing ? [] : result.photos,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "EVENT_NOT_FOUND") return NextResponse.json({ error: "Event not found." }, { status: 404 });
    console.error("[photo-finder-submit]", error);
    return NextResponse.json({ error: "Unable to save your claim right now." }, { status: 500 });
  }
}
