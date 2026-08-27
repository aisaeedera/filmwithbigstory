import type { Metadata } from "next";
import { type Locale, localizedPath } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { Section, Button } from "@/components/primitives";
import { waLink } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, title: locale === "ar" ? "كتب الكتاب وعقد القران | بيك ستوري" : "Katb Kitab / Aqd Al Qiran | Big Story", description: locale === "ar" ? "تغطية أقسام الرجال والنساء وكلاهما." : "Male, female, and both-section coverage.", path: "/services/katb-kitab-aqd-al-qiran" });
}
export default async function KatbPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params; const ar = locale === "ar";
  return <><Section><p className="bs-eyebrow">Katb Kitab / Aqd Al Qiran</p><h1 className="mt-5 text-[clamp(2.4rem,5vw,4rem)]">{ar ? "تغطية عقد القران حسب القسم" : "Marriage-contract coverage by section"}</h1><p className="bs-lead mt-6">{ar ? "اختاروا قسم الرجال أو النساء أو كليهما. الأسعار نقاط بداية خاضعة للمراجعة وليست إجماليات ثابتة." : "Choose male, female, or both sections. Prices are reviewed starting points, not released fixed totals."}</p><a className="bs-btn bs-btn-gold mt-8 inline-flex" href={waLink("Interested in Katb Kitab / Aqd Al Qiran coverage.")} target="_blank" rel="noopener noreferrer">{ar ? "اطلبوا مراجعة" : "Request review"}</a></Section><Section alt><div className="grid gap-6 md:grid-cols-3"><article className="bs-card"><h2 className="text-xl">{ar ? "قسم الرجال" : "Male section"}</h2><p className="mt-3 text-sm">Dialogue-critical sound. Instagram Live and near-real-time QR sharing are male side only. Director/ATEM encoder workflow is activation-pending YoloBox/Instagram bench validation.</p></article><article className="bs-card"><h2 className="text-xl">{ar ? "قسم النساء" : "Female section"}</h2><p className="mt-3 text-sm">Private coverage requires a female videographer, female photographer, and female Arabic-proficient sound recordist. No male-side public feature crosses this boundary.</p></article><article className="bs-card"><h2 className="text-xl">{ar ? "كلا القسمين" : "Both sections"}</h2><p className="mt-3 text-sm">Male features stop at the women-side boundary. The female privacy team continues women-side coverage and private delivery.</p></article></div><Button href={localizedPath(locale, "/weddings")} variant="ghost" className="mt-8">{ar ? "صفحة الأفراح" : "Wedding hub"}</Button></Section></>;
}