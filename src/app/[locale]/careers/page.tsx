import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { SITE } from "@/lib/site";
import { Section, Eyebrow } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/JsonLd";
import { CAREER_POSITIONS } from "@/lib/careers/positions";
import { ROSTER } from "@/lib/careers/roster";

const steps = [
  {
    title: { en: "Choose your roles", ar: "اختر أدوارك" },
    body: {
      en: "Pick the discipline (or disciplines) where you are strongest.",
      ar: "اختر التخصص أو التخصصات التي تتقنها أكثر.",
    },
  },
  {
    title: { en: "Add your portfolio, reel or CV", ar: "أضف أعمالك أو سيرتك الذاتية" },
    body: {
      en: "Upload links or files in the form so we can see your work.",
      ar: "ارفع الروابط أو الملفات في النموذج حتى نرى عملك.",
    },
  },
  {
    title: { en: "Share your availability and rates", ar: "شارك توفرك وأسعارك" },
    body: {
      en: "Tell us your UAE base and when you can work.",
      ar: "أخبرنا بمقر إقامتك في الإمارات ومتى يمكنك العمل.",
    },
  },
  {
    title: { en: "We contact you when there's a fit", ar: "نتواصل معك عند وجود تناسب" },
    body: {
      en: "Big Story reaches out to suitable people for upcoming productions.",
      ar: "تتواصل بيك ستوري مع الأشخاص المناسبين للإنتاجات القادمة.",
    },
  },
] as const;

const faq = {
  en: [
    { q: "Are these permanent jobs?", a: "No. This is a freelance roster, not permanent employment. Joining means we can contact you when a project, shoot or backup call matches your profile — project by project." },
    { q: "Do I need to live in Dubai?", a: "UAE-based availability is preferred. Tell us where you are based and whether you can travel across Dubai, Abu Dhabi and the Northern Emirates." },
    { q: "What happens after I apply?", a: "Your details go straight into our roster behind the form. We review it against upcoming productions and reach out only when the fit is relevant. Applying does not guarantee a booking." },
    { q: "Can I apply for more than one role?", a: "Yes. Choose your strongest role in the form and mention any additional disciplines in the notes." },
  ],
  ar: [
    { q: "هل هذه وظائف دائمة؟", a: "لا. هذا سجل عمل حر وليس توظيفاً دائماً. الانضمام يعني أننا نستطيع التواصل معك عند توفر مشروع أو تصوير أو بديل مناسب لملفك — مشروعاً تلو الآخر." },
    { q: "هل يجب أن أعيش في دبي؟", a: "نفضّل التوفر داخل الإمارات. اذكر مكان إقامتك وقدرتك على التنقل بين دبي وأبوظبي والإمارات الشمالية." },
    { q: "ماذا يحدث بعد التقديم؟", a: "تذهب بياناتك مباشرة إلى سجلنا خلف النموذج. نراجعها حسب الإنتاجات القادمة ونتواصل معك فقط عند وجود فرصة مناسبة. التقديم لا يضمن الحجز." },
    { q: "هل يمكنني التقديم لأكثر من دور؟", a: "نعم. اختر أقوى دور لديك في النموذج واذكر تخصصاتك الإضافية في الملاحظات." },
  ],
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return pageMeta({
    locale,
    title: isAr ? "سجل المواهب الحرة | بيك ستوري" : "Freelance Talent Roster | Big Story Dubai",
    description: isAr ? "انضم إلى سجل المواهب الحرة في بيك ستوري عبر 26 تخصصاً في التصوير والإنتاج والمونتاج في الإمارات — عبر نموذج واحد." : "Join Big Story's UAE freelance roster across 26 film and video disciplines. One form — we contact suitable people project by project.",
    path: "/careers",
  });
}

export default async function CareersPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const faqItems: { q: string; a: string }[] = isAr ? [...faq.ar] : [...faq.en];
  const roleCount = CAREER_POSITIONS.length;

  return (
    <>
      <JsonLd data={[breadcrumbSchema(locale, [{ name: isAr ? "الرئيسية" : "Home", path: "/" }, { name: isAr ? "الوظائف" : "Careers", path: "/careers" }]), faqSchema(faqItems)]} />

      <Section className="pb-14 md:pb-20">
        <Breadcrumbs locale={locale} items={[{ name: isAr ? "الرئيسية" : "Home", path: "/" }, { name: isAr ? "سجل المواهب" : "Talent roster" }]} />
        <Reveal>
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div>
              <Eyebrow>{isAr ? "الإمارات · عمل حر" : "UAE · freelance roster"}</Eyebrow>
              <h1 className="mt-6 max-w-5xl text-[clamp(2.7rem,6.5vw,5.8rem)]">{isAr ? "عمل رائع يبدأ بطاقم رائع." : "Great work starts with a great crew."}</h1>
              <p className="bs-lead mt-8 !max-w-3xl">{isAr ? "نبني سجلاً موثوقاً من المواهب الحرة عبر التصوير والإنتاج وما بعد الإنتاج والأداء أمام الكاميرا — للإنتاجات القادمة في الإمارات." : "We are building a trusted freelance roster across camera, production, post and on-screen talent for upcoming productions across the UAE."}</p>
            </div>
            <div className="border-s border-[color:var(--color-gold)] ps-6">
              <p className="bs-num">{roleCount}</p>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{isAr ? "تخصصاً مفتوحاً الآن" : "disciplines open now"}</p>
              <p className="mt-6 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[color:var(--color-gold)]">{isAr ? "آخر تحديث: 17 يوليو 2026" : "Last updated · 17 Jul 2026"}</p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section alt>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><Eyebrow>{isAr ? "الأدوار" : "The roster"}</Eyebrow><h2 className="mt-5 text-[clamp(2rem,4vw,3.4rem)]">{isAr ? `${roleCount} تخصصاً. سجل واحد.` : `${roleCount} disciplines. One roster.`}</h2></div>
          <p className="max-w-md text-sm text-[color:var(--color-muted)]">{isAr ? "سجل عمل حر واحد عبر الكاميرا والإنتاج وما بعد الإنتاج والأداء. نتواصل مع الأشخاص المناسبين عندما يناسب المشروع." : "One freelance roster across camera, production, post and on-screen talent. We contact suitable people when a project fits."}</p>
        </div>
        <div className="mt-12 space-y-12">
          {ROSTER.map((category, categoryIndex) => (
            <div key={category.title}>
              <div className="flex items-baseline gap-4">
                <span className="font-[family-name:var(--font-mono)] text-sm text-[color:var(--color-gold)]">{String(categoryIndex + 1).padStart(2, "0")}</span>
                <h3 className="text-lg uppercase tracking-[0.12em] text-[color:var(--color-muted)]">{isAr ? category.titleAr : category.title}</h3>
              </div>
              <div className="mt-5 divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]">
                {category.roles.map((role) => (
                  <article key={role.title} className="grid gap-2 py-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-baseline md:gap-8">
                    <h4 className="text-lg md:text-xl">{isAr ? role.ar : role.title}</h4>
                    <p className="text-sm text-[color:var(--color-muted)]">{isAr ? role.summaryAr : role.summary}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="apply">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>{isAr ? "كيف تنضم إلى السجل" : "How to join the roster"}</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.4rem)]">{isAr ? "نموذج واحد. أربع خطوات." : "One form. Four steps."}</h2>
            <p className="mt-6 text-[color:var(--color-muted)]">{isAr ? "التقديم يتم عبر نموذج المواهب الحرة الموثّق فقط. يطلب النموذج تسجيل الدخول بحساب Google لأنه يحتوي على رفع ملفات — هذا طبيعي." : "Applications go through the verified freelancer form only. The form asks you to sign in with a Google account because it includes a file upload — that is expected."}</p>
          </div>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-line)] sm:grid-cols-2">
            {steps.map((step, index) => (
              <li key={step.title.en} className="bg-[color:var(--color-elevated)] p-7">
                <p className="bs-num text-[clamp(1.8rem,3vw,2.4rem)] text-[color:var(--color-gold)]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-xl">{isAr ? step.title.ar : step.title.en}</h3>
                <p className="mt-2 text-sm text-[color:var(--color-muted)]">{isAr ? step.body.ar : step.body.en}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col items-start gap-5">
            <a href={SITE.careersForm} target="_blank" rel="noopener" className="bs-btn bs-btn-gold">
              {isAr ? "قدّم إلى السجل" : "Apply to the roster"}
            </a>
            <p className="max-w-2xl text-sm text-[color:var(--color-muted)]">{isAr ? "السجل مفتوح الآن. الانضمام لا يعني توظيفاً دائماً — نتواصل مع المستقلين المناسبين مشروعاً تلو الآخر." : "The roster is open now. Joining does not imply permanent employment — we contact suitable freelancers project by project."}</p>
          </div>
        </Reveal>
      </Section>

      <Section alt>
        <Eyebrow>{isAr ? "أسئلة شائعة" : "FAQ"}</Eyebrow>
        <div className="mt-8 divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]">{faqItems.map((item) => <details key={item.q} className="py-5"><summary className="cursor-pointer font-medium">{item.q}</summary><p className="mt-3 max-w-3xl text-[color:var(--color-muted)]">{item.a}</p></details>)}</div>
      </Section>
    </>
  );
}

export const careerPositionCount = CAREER_POSITIONS.length;
