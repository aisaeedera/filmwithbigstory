import { NextResponse } from "next/server";

/**
 * Deliberately disabled: Vercel's filesystem is not durable storage and this
 * endpoint must not accept abandoned-session PII until a consented store exists.
 */
export async function POST() {
  return NextResponse.json(
    { ok: false, code: "WEDDING_SESSION_STORAGE_UNAVAILABLE" },
    { status: 410 }
  );
}