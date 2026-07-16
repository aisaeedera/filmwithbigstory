import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { SITE } from "@/lib/site";
import { ui } from "@/data/copy";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  JsonLd,
  breadcrumbSchema,
  personSchema,
  organizationSchema,
} from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return pageMeta({
    locale,
    title: isAr
      ? "سعيد سالم — مؤسس ومدير تصوير | بيك ستوري دبي"
      : "Saeed Salim — Founder & Director of Photography | Big Story Dubai",
    description: isAr
      ? "سعيد سالم، مؤسس بيك ستوري، استوديو سينمائي بوتيكي في دبي. خبرة في إنتاج الأفلام والإعلانات التجارية وصناعة السينما الإماراتية."
      : "Saeed Salim, founder of Big Story — boutique cinematic studio in Dubai. Cinematographer, founder story director and producer working across the UAE film industry.",
    path: "/about/saeed",
  });
}

const COPY = {
  eyebrow: { en: "Founder · Cinematographer · Producer", ar: "مؤسس · مدير تصوير · منتج" },
  h1: { en: "Saeed Salim", ar: "سعيد سالم" },
  tagline: {
    en: "Founder of Big Story. Cinema-grade production for the brands that want their story to land.",
    ar: "مؤسس بيك ستوري. إنتاج سينمائي للعلامات التي تريد لقصتها أن تصل.",
  },
  intro: {
    en: "I run Big Story from a warehouse studio in Al Quoz — the same block where most of Dubai's working DPs stage their gear. We make cinema-grade commercials, brand films and TVCs for UAE and GCC brands who care that the finished frame actually feels like something.",
    ar: "أدير بيك ستوري من استوديو في القوز — نفس الحي الذي يحضّر فيه معظم مديري التصوير العاملين في دبي معداتهم. نصنع إعلانات وأفلام تعريفية سينمائية بدرجة البث لعلامات الإمارات والخليج التي تهتم بأن يبدو الإطار النهائي شيئاً حقيقياً.",
  },
  credentials: {
    title: { en: "Credentials", ar: "الاعتمادات" },
    items: [
      { en: "Founder & Director of Photography — Big Story Film & Video Production (2019–present)", ar: "مؤسس ومدير تصوير — بيك ستوري لإنتاج الأفلام والفيديو (2019–حتى الآن)" },
      { en: "RED Komodo X cinema kit, Alexa Mini LF, Sony FX3 — operator-grade on all three", ar: "RED Komodo X، Alexa Mini LF، Sony FX3 — مستوى مشغل على الثلاثة" },
      { en: "DFTC-registered production house (Dubai Film & TV Commission)", ar: "بيت إنتاج مسجل في لجنة دبي للسينما والتلفزيون (DFTC)" },
      { en: "twofour54 Abu Dhabi vendor network member", ar: "عضو شبكة موردي تو فورتي فور أبو ظبي" },
      { en: "120+ UAE shoots across TVCs, brand films, documentaries, social, podcasts and events", ar: "+120 تصوير في الإمارات عبر الإعلانات والأفلام التعريفية والوثائقي والسوشيال والبودكاست والفعاليات" },
    ],
  },
  clients: {
    title: { en: "Selected clients", ar: "عملاء مختارون" },
    items: [
      { en: "Real estate developers — DAMAC, Emaar-adjacent projects, Aldar co-productions", ar: "مطورون عقاريون — داماك، مشاريع مرتبطة بإعمار، مشاركات إنتاج مع الدار" },
      { en: "Dental & clinics — brand films for clinic homepages and waiting-room screens", ar: "الأسنان والعيادات — أفلام تعريفية لواجهات مواقع العيادات وشاشات غرف الانتظار" },
      { en: "Hospitality — F&B launches, hotel brand films, restaurant TVCs", ar: "الضيافة — إطلاقات أغذية ومشروبات، أفلام تعريفية للفنادق، إعلانات مطاعم" },
      { en: "Tech startups & SMEs — product launches and pitch films for funded rounds", ar: "شركات ناشئة تقنية و SMEs — إطلاقات منتجات وأفلام عروض لجولات التمويل" },
      { en: "Government & semi-government — CSR films and documentary work", ar: "القطاع الحكومي وشبه الحكومي — أفلام المسؤولية المجتمعية وأفلام وثائقية" },
    ],
  },
  press: {
    title: { en: "Press & recognition", ar: "الصحافة والتقدير" },
    items: [
      { en: "Featured case studies — filmwithbigstory.com/work (selected public work)", ar: "دراسات حالة مختارة — filmwithbigstory.com/work" },
      { en: "Industry contributions — Big Story rate cards and crew data have been referenced by twofour54 and ProductionHUB UAE", ar: "مساهمات صناعية — تمت الإشارة إلى بيانات أسعار بيك ستوري وأرقام الطاقم من قبل twofour54 و ProductionHUB الإمارات" },
      { en: "Speaking — internal workshops on Dubai cinematography pricing and crew rate benchmarks", ar: "محاضرات — ورش عمل داخلية حول تسعير التصوير السينمائي في دبي ومعايير أسعار الطاقم" },
    ],
  },
  links: {
    title: { en: "Find Saeed", ar: "تواصل مع سعيد" },
    linkedinLabel: { en: "LinkedIn", ar: "لينكد إن" },
    emailLabel: { en: "Email", ar: "البريد" },
    companyLinkedinLabel: { en: "Big Story on LinkedIn", ar: "بيك ستوري على لينكد إن" },
  },
};

export default async function SaeedAuthorPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/about/saeed";
  const isAr = locale === "ar";

  return (
    <>
      <JsonLd
        data={[
          personSchema({ path }),
          organizationSchema(),
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.about, locale), path: "/about" },
            { name: "Saeed Salim", path },
          ]),
        ]}
      />

      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.about, locale), path: "/about" },
            { name: "Saeed Salim" },
          ]}
        />
        <Reveal>
          <Eyebrow>{t(COPY.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]">{t(COPY.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(COPY.tagline, locale)}</p>
          <p className="bs-prose mt-8 max-w-3xl text-[color:var(--color-muted)]">{t(COPY.intro, locale)}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Reveal className="bs-card" delay={0}>
            <p className="bs-eyebrow">{isAr ? "الاسم" : "Name"}</p>
            <p className="mt-3 text-lg">Saeed Salim</p>
          </Reveal>
          <Reveal className="bs-card" delay={80}>
            <p className="bs-eyebrow">{isAr ? "الموقع" : "Based in"}</p>
            <p className="mt-3 text-lg">{isAr ? "دبي، الإمارات" : "Dubai, UAE"}</p>
          </Reveal>
          <Reveal className="bs-card" delay={160}>
            <p className="bs-eyebrow">{isAr ? "منذ" : "Since"}</p>
            <p className="mt-3 text-lg">2019</p>
          </Reveal>
        </div>
      </Section>

      <Section alt>
        <Reveal>
          <Eyebrow>{t(COPY.credentials.title, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{t(COPY.credentials.title, locale)}</h2>
        </Reveal>
        <ul className="mt-8 grid gap-3">
          {COPY.credentials.items.map((it, i) => (
            <li key={i} className="flex gap-4 border-b border-[color:var(--color-line)] py-4">
              <span className="text-[color:var(--color-gold)]" aria-hidden="true">—</span>
              <span>{t(it, locale)}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>{t(COPY.clients.title, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{t(COPY.clients.title, locale)}</h2>
        </Reveal>
        <ul className="mt-8 grid gap-3">
          {COPY.clients.items.map((it, i) => (
            <li key={i} className="flex gap-4 border-b border-[color:var(--color-line)] py-4">
              <span className="text-[color:var(--color-gold)]" aria-hidden="true">—</span>
              <span>{t(it, locale)}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section alt>
        <Reveal>
          <Eyebrow>{t(COPY.press.title, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{t(COPY.press.title, locale)}</h2>
        </Reveal>
        <ul className="mt-8 grid gap-3">
          {COPY.press.items.map((it, i) => (
            <li key={i} className="flex gap-4 border-b border-[color:var(--color-line)] py-4">
              <span className="text-[color:var(--color-gold)]" aria-hidden="true">—</span>
              <span>{t(it, locale)}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>{t(COPY.links.title, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{t(COPY.links.title, locale)}</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link href={`mailto:${SITE.email}`} className="bs-card bs-card-hover block">
            <p className="bs-eyebrow">{t(COPY.links.emailLabel, locale)}</p>
            <p className="mt-3 text-sm break-all">{SITE.email}</p>
          </Link>
        </div>
      </Section>

      <CtaBand
        locale={locale}
        heading={isAr ? "هل تريد العمل مع سعيد وفريقه؟" : "Want to work with Saeed and the team?"}
        waContext={isAr ? "قرأت صفحة سعيد." : "Read your author page."}
      />
    </>
  );
}