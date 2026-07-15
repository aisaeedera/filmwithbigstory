import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

function configuredAdminKey() {
  return process.env.PHOTO_FINDER_ADMIN_KEY || process.env.ADMIN_API_KEY || "";
}

export function isPhotoFinderAdmin(request: Request, providedKey?: string) {
  const expected = configuredAdminKey();
  const supplied = providedKey || request.headers.get("x-photo-finder-admin-key") || request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
  if (!expected || !supplied) return false;
  const expectedBuffer = Buffer.from(expected);
  const suppliedBuffer = Buffer.from(supplied);
  return expectedBuffer.length === suppliedBuffer.length && timingSafeEqual(expectedBuffer, suppliedBuffer);
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}
