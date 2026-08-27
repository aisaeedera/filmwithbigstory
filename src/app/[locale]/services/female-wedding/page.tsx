import type { Metadata } from "next";
import { type Locale, localizedPath } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { Section, Button } from "@/components/primitives";
import { waLink } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, title: locale === "ar" ? "أفراح نسائية خاصة | بيك ستوري" : "Private Female Wedding Coverage | Big Story", description: locale === "ar" ? "تغطية خاصة بطاقم نسائي وتسليم عائلي." : "Women-only crew and private family delivery.", path: "/services/female-wedding" });
}

export default async function FemaleWeddingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params; const ar = locale === "ar";
  const items = ["Female-only crew for private and women-only areas", "Private family delivery and controlled media custody", "Regular Drone Coverage — conditional", "Guided Cinematic Entrance/Flight — conditional", "female licensed PIC", "Venue, authority and insurance approval", "Private monitoring, safe route and rehearsal"];
  return <><Section><p className="bs-eyebrow">{ar ? "تغطية نسائية خاصة" : "Private female wedding coverage"}</p><h1 className="mt-5 text-[clamp(2.4rem,5vw,4rem)]">{ar ? "خصوصية أولاً، وطاقم نسائي" : "Privacy first, with a women-only crew"}</h1><p className="bs-lead mt-6">{ar ? "تغطية تحضير العروس وقاعة النساء بتسليم عائلي خاص. الأسعار نقاط بداية خاضعة للمراجعة؛ لا يوجد إجمالي ثابت منشور." : "Bride preparation and women-side coverage with private family delivery. Prices are reviewed starting points; no fixed total is released."}</p><div className="mt-8 flex gap-4"><a className="bs-btn bs-btn-gold" href={waLink("Interested in private female wedding coverage.")} target="_blank" rel="noopener noreferrer">{ar ? "اطلبي مراجعة" : "Request review"}</a><Button href={localizedPath(locale, "/weddings")} variant="ghost">{ar ? "صفحة الأفراح" : "Wedding hub"}</Button></div></Section><Section alt><h2 className="text-3xl">{ar ? "المتطلبات والخيارات" : "Requirements and conditional options"}</h2><ul className="mt-6 space-y-3">{items.map((item) => <li key={item} className="bs-card text-sm">{item}</li>)}</ul><p className="mt-8 text-sm text-[color:var(--color-muted)]">{ar ? "لا يتم تأكيد الطاقم أو التاريخ أو السعر النهائي قبل مراجعة بيك ستوري المكتوبة." : "No crew, date, or final price is confirmed before Big Story's written review."}</p></Section></>;
}