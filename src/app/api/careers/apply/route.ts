import { NextResponse } from "next/server";
import { addCareerApplicant } from "@/lib/careers/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const honeypot = String(body.company || "").trim();
  if (honeypot) return NextResponse.json({ ok: true });

  try {
    const applicant = await addCareerApplicant({
      name: String(body.name || ""),
      email: String(body.email || ""),
      phone: String(body.phone || ""),
      role: String(body.role || ""),
      note: String(body.note || ""),
      locale: body.locale === "ar" ? "ar" : "en",
    });
    return NextResponse.json({ ok: true, applicantId: applicant.id });
  } catch (error) {
    if (error instanceof Error && (error.message === "INVALID_APPLICANT" || error.message === "INVALID_POSITION")) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }
    console.error("[career-application]", error);
    return NextResponse.json({ error: "Unable to save your application right now." }, { status: 500 });
  }
}
