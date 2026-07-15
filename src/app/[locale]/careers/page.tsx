import type { Metadata } from "next";
import { type Locale, localizedPath } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { SITE } from "@/lib/site";
import { Section, Eyebrow } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/JsonLd";
import { CAREER_POSITIONS } from "@/lib/careers/positions";

const positions = [
  { title: "DOP / Cinematographer", ar: "مدير تصوير / سينماتوغرافر", tier: "Freelance", type: "Project basis", summary: "Camera-led storytellers for commercials, brand films and premium productions.", summaryAr: "صنّاع صورة للمشاريع الإعلانية والأفلام التجارية والإنتاجات المميزة." },
  { title: "1st AC", ar: "مساعد كاميرا أول", tier: "Priority pool", type: "3–5 people", summary: "Reliable focus pullers and camera assistants for RED and Sony cinema packages.", summaryAr: "مساعدو كاميرا وساحبو فوكس موثوقون للعمل مع كاميرات RED وSony السينمائية." },
  { title: "Wedding Videographer", ar: "مصور فيديو أعراس", tier: "T1", type: "Saudi-style weddings", summary: "Experienced wedding operators who understand privacy, pace and women-only celebrations.", summaryAr: "مصورون ذوو خبرة يفهمون الخصوصية وسرعة العمل وطبيعة حفلات الزفاف النسائية." },
  { title: "Wedding Photographer", ar: "مصور أعراس", tier: "T1", type: "Experienced", summary: "Calm, editorial photographers for UAE weddings and high-touch guest experiences.", summaryAr: "مصورون بأسلوب تحريري هادئ لأعراس الإمارات وتجارب الضيوف الراقية." },
  { title: "Drone Operator", ar: "مشغل درون مرخص", tier: "T1", type: "DCAA licensed", summary: "Licensed UAE operators for safe aerial coverage on approved productions.", summaryAr: "مشغلو درون مرخصون في الإمارات للتصوير الجوي الآمن في المشاريع المعتمدة." },
  { title: "Production Assistant", ar: "مساعد إنتاج", tier: "T1", type: "Flexible hours", summary: "Organised set support for call sheets, logistics, gear moves and client care.", summaryAr: "دعم منظم لمواقع التصوير وجداول العمل واللوجستيات والمعدات وخدمة العميل." },
  { title: "Arabic Liaison", ar: "منسق عربي للمناسبات", tier: "T1", type: "Wedding / event", summary: "Arabic-first coordination between families, venues, crew and production.", summaryAr: "تنسيق عربي بين العائلات والقاعات والطاقم وفريق الإنتاج." },
  { title: "Editor / Colorist", ar: "مونتير / مصحح ألوان", tier: "Post", type: "Freelance", summary: "Story editors and colourists for cinematic, social and same-day delivery.", summaryAr: "مونتيرون ومصححو ألوان للأفلام السينمائية والمحتوى الاجتماعي والتسليم في نفس اليوم." },
  { title: "Motion Designer", ar: "مصمم موشن", tier: "Post", type: "Freelance", summary: "Motion systems, titles and compositing for commercial and social campaigns.", summaryAr: "تصميم موشن وعناوين وتركيب بصري للحملات الإعلانية والاجتماعية." },
  { title: "Social Media Manager", ar: "مدير وسائل التواصل", tier: "Growth", type: "Project basis", summary: "Content planning, publishing and community operations for visual brands.", summaryAr: "تخطيط المحتوى والنشر وإدارة المجتمعات للعلامات التجارية البصرية." },
] as const;

const faq = {
  en: [
    { q: "Are these permanent jobs?", a: "Most openings begin on a freelance or project basis. Joining the network means we can contact you when a role, shoot or backup call matches your profile." },
    { q: "Do I need to live in Dubai?", a: "UAE-based availability is preferred. Tell us where you are based and whether you can travel across Dubai, Abu Dhabi and the Northern Emirates." },
    { q: "What happens after I apply?", a: "We save your profile in our talent pool, review it against upcoming projects and contact you only when the fit is relevant. Applying does not guarantee a booking." },
    { q: "Can I apply for more than one role?", a: "Yes. Choose your strongest role in the form and mention any additional skills in the note." },
  ],
  ar: [
    { q: "هل هذه وظائف دائمة؟", a: "تبدأ معظم الفرص بنظام العمل الحر أو حسب المشروع. انضمامك للشبكة يعني أننا نستطيع التواصل معك عند توفر دور أو تصوير أو بديل مناسب لملفك." },
    { q: "هل يجب أن أعيش في دبي؟", a: "نفضّل التوفر داخل الإمارات. اذكر مكان إقامتك وقدرتك على التنقل بين دبي وأبوظبي والإمارات الشمالية." },
    { q: "ماذا يحدث بعد التقديم؟", a: "نحفظ ملفك في شبكة المواهب ونراجعه حسب المشاريع القادمة، ونتواصل معك فقط عند وجود فرصة مناسبة. التقديم لا يضمن الحجز." },
    { q: "هل يمكنني التقديم لأكثر من دور؟", a: "نعم. اختر أقوى دور لديك في النموذج واذكر مهاراتك الإضافية في النبذة." },
  ],
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return pageMeta({
    locale,
    title: isAr ? "شبكة المواهب وفرص الإنتاج | بيك ستوري" : "Production Careers & Talent Network | Big Story Dubai",
    description: isAr ? "انضم إلى شبكة مواهب بيك ستوري للأدوار الحرة والمشاريع في التصوير والإنتاج والمونتاج في الإمارات." : "Join Big Story's UAE talent network for freelance cinematography, wedding, production and post-production opportunities.",
    path: "/careers",
  });
}

export default async function CareersPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const faqItems: { q: string; a: string }[] = isAr ? [...faq.ar] : [...faq.en];
  const posted = "2026-07-15";
  const expires = "2026-12-31";
  const jobSchemas = positions.slice(0, 5).map((position) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: isAr ? position.ar : position.title,
    description: isAr ? position.summaryAr : position.summary,
    datePosted: posted,
    validThrough: `${expires}T23:59:59+04:00`,
    employmentType: "CONTRACTOR",
    hiringOrganization: { "@type": "Organization", name: SITE.name, sameAs: SITE.domain },
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" } },
    applicantLocationRequirements: { "@type": "Country", name: "United Arab Emirates" },
    directApply: true,
    url: `${SITE.domain}${localizedPath(locale, "/careers")}#apply`,
  }));

  return (
    <>
      <JsonLd data={[breadcrumbSchema(locale, [{ name: isAr ? "الرئيسية" : "Home", path: "/" }, { name: isAr ? "الوظائف" : "Careers", path: "/careers" }]), faqSchema(faqItems), ...jobSchemas]} />

      <Section className="pb-14 md:pb-20">
        <Breadcrumbs locale={locale} items={[{ name: isAr ? "الرئيسية" : "Home", path: "/" }, { name: isAr ? "شبكة المواهب" : "Talent network" }]} />
        <Reveal>
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div>
              <Eyebrow>{isAr ? "فرص 2026 · الإمارات" : "2026 opportunities · UAE"}</Eyebrow>
              <h1 className="mt-6 max-w-5xl text-[clamp(2.7rem,6.5vw,5.8rem)]">{isAr ? "عمل رائع يبدأ بطاقم رائع." : "Great work starts with a great crew."}</h1>
              <p className="bs-lead mt-8 !max-w-3xl">{isAr ? "نبني شبكة موثوقة من صنّاع الصورة وطاقم الإنتاج وما بعد الإنتاج للمشاريع القادمة والبدائل عند الحاجة." : "We are building a trusted bench of camera, production and post talent for upcoming projects—and the backup calls that cannot wait."}</p>
            </div>
            <div className="border-s border-[color:var(--color-gold)] ps-6">
              <p className="bs-num">5</p>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{isAr ? "أدوار ذات أولوية الآن" : "priority roles open now"}</p>
              <p className="mt-6 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[color:var(--color-gold)]">{isAr ? "آخر تحديث: 15 يوليو 2026" : "Last updated · 15 Jul 2026"}</p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section alt>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><Eyebrow>{isAr ? "الأدوار" : "The roster"}</Eyebrow><h2 className="mt-5 text-[clamp(2rem,4vw,3.4rem)]">{isAr ? "عشرة تخصصات. شبكة واحدة." : "Ten disciplines. One trusted network."}</h2></div>
          <p className="max-w-md text-sm text-[color:var(--color-muted)]">{isAr ? "الأدوار الخمسة الأولى مفتوحة بأولوية. بقية الأدوار ضمن شبكة المواهب للمشاريع المستقبلية." : "The first five roles are priority openings. The remaining roles stay active in our future-project talent pool."}</p>
        </div>
        <div className="mt-10 divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]">
          {positions.map((position, index) => (
            <article key={position.title} className="grid gap-4 py-7 md:grid-cols-[70px_minmax(0,1fr)_150px] md:items-center">
              <span className="font-[family-name:var(--font-mono)] text-sm text-[color:var(--color-gold)]">{String(index + 1).padStart(2, "0")}</span>
              <div><h3 className="text-xl md:text-2xl">{isAr ? position.ar : position.title}</h3><p className="mt-2 max-w-2xl text-sm text-[color:var(--color-muted)]">{isAr ? position.summaryAr : position.summary}</p></div>
              <div className="md:text-end"><p className="text-sm font-semibold">{position.tier}</p><p className="mt-1 text-xs text-[color:var(--color-muted)]">{position.type}</p>{index < 5 ? <span className="mt-3 inline-block rounded-full border border-[color:var(--color-gold-soft)] px-3 py-1 text-xs text-[color:var(--color-gold)]">{isAr ? "مفتوح الآن" : "Open now"}</span> : null}</div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="apply">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <Reveal>
            <Eyebrow>{isAr ? "انضم للشبكة" : "Join the network"}</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.4rem)]">{isAr ? "أرسل ملفك قبل أن نحتاجه." : "Send your profile before the call comes."}</h2>
            <p className="mt-6 text-[color:var(--color-muted)]">{isAr ? "نراجع الملفات بحسب احتياجات المشاريع. نحتفظ ببياناتك بشكل خاص، ولا يعني التقديم وجود عقد مضمون." : "We review profiles against real production needs. Your details stay private, and applying does not promise a booking or employment contract."}</p>
            <div className="mt-8 grid grid-cols-2 gap-4"><div className="border-t border-[color:var(--color-line)] pt-4"><p className="text-2xl font-semibold">UAE</p><p className="mt-1 text-xs text-[color:var(--color-muted)]">{isAr ? "قاعدة العمل" : "working base"}</p></div><div className="border-t border-[color:var(--color-line)] pt-4"><p className="text-2xl font-semibold">Project</p><p className="mt-1 text-xs text-[color:var(--color-muted)]">{isAr ? "البداية المعتادة" : "typical start"}</p></div></div>
          </Reveal>
          <CareerApplicationForm locale={locale} />
        </div>
      </Section>

      <Section alt>
        <Eyebrow>{isAr ? "أسئلة شائعة" : "FAQ"}</Eyebrow>
        <div className="mt-8 divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]">{faqItems.map((item) => <details key={item.q} className="py-5"><summary className="cursor-pointer font-medium">{item.q}</summary><p className="mt-3 max-w-3xl text-[color:var(--color-muted)]">{item.a}</p></details>)}</div>
      </Section>
    </>
  );
}

export const careerPositionCount = CAREER_POSITIONS.length;
