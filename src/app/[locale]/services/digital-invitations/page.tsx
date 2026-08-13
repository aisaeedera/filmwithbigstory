import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { ui } from "@/data/copy";
import { getInvitationPage, invitationUi, GALLERY_PATH } from "@/data/invitations";
import { invitationDemos } from "@/data/invitation-designs";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { waLink } from "@/lib/site";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/components/JsonLd";
import InvitationCard from "@/components/invitations/InvitationCard";

const PATH = "/services/digital-invitations";
const AREA = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Al Ain"];

const HUB = {
  meta: {
    title: {
      en: "Digital Invitations UAE | Arabic and English | Big Story",
      ar: "دعوات إلكترونية عربية وإنجليزية في الإمارات | بيك ستوري",
    },
    description: {
      en: "Arabic-first digital invitations for every UAE and GCC occasion — weddings, Katb Kitab, engagements, newborns, graduations and birthdays. WhatsApp-ready, with RSVP, QR and maps.",
      ar: "دعوات إلكترونية عربية أولاً لكل مناسبات الإمارات والخليج — أعراس وعقد قران وخطوبة ومواليد وتخرّج وأعياد ميلاد. جاهزة للواتساب، مع تأكيد حضور وQR وخرائط.",
    },
  },
  eyebrow: { en: "Digital invitations", ar: "دعوات إلكترونية" },
  h1: {
    en: "Arabic-first digital invitations for every UAE and GCC occasion",
    ar: "دعوات إلكترونية عربية أولاً لكل مناسباتكم في الإمارات والخليج",
  },
  lead: {
    en: "One studio for every invitation you'll send — designed Arabic-first with native right-to-left typography, delivered ready for WhatsApp as a card, an animated video, or an interactive link. Pick your occasion below, or browse the demo gallery to find a style, then we personalise it with your names, date and details.",
    ar: "استوديو واحد لكل دعوة سترسلونها — مصمّمة بالعربية أولاً بطباعة صحيحة من اليمين إلى اليسار، وتُسلَّم جاهزة للواتساب كبطاقة أو فيديو متحرك أو رابط تفاعلي. اختاروا مناسبتكم بالأسفل، أو تصفّحوا معرض النماذج لإيجاد أسلوب، ثم نُخصّصه بأسمائكم وتاريخكم وتفاصيلكم.",
  },
  groups: [
    {
      title: { en: "Weddings & ceremonies", ar: "الأعراس والمناسبات" },
      slugs: [
        "digital-wedding-invitations",
        "katb-kitab-invitations",
        "malka-engagement-invitations",
        "wedding-save-the-date",
        "wedding-announcements",
        "animated-video-invitations",
      ],
    },
    {
      title: { en: "Family occasions", ar: "مناسبات العائلة" },
      slugs: [
        "newborn-invitations-announcements",
        "baby-shower-invitations",
        "graduation-invitations",
        "birthday-invitations",
      ],
    },
    {
      title: { en: "Language & features", ar: "اللغة والمزايا" },
      slugs: [
        "bilingual-arabic-english-invitations",
        "whatsapp-invitations",
        "digital-invitations-rsvp",
        "digital-invitations-qr-code",
        "invitations-location-map",
      ],
    },
  ],
  faqs: [
    {
      q: { en: "Which occasions can you create digital invitations for?", ar: "ما أنواع المناسبات التي تصممون لها دعوات إلكترونية؟" },
      a: {
        en: "Weddings, Katb Kitab / Aqd Qiran, Malka and engagements, Save the Dates, wedding announcements, newborn announcements, baby showers, graduations and birthdays — plus feature pages for RSVP, QR entry and venue maps.",
        ar: "الأعراس، وعقد القران، والملكة والخطوبة، واحفظوا التاريخ، وإعلانات الزواج، وبشارات المواليد، والبيبي شاور، والتخرج، وأعياد الميلاد — إضافةً لصفحات مزايا تأكيد الحضور والدخول بالباركود وخرائط الموقع.",
      },
    },
    {
      q: { en: "Can guests open the invitation from WhatsApp without an app?", ar: "هل يمكن إرسال الدعوة عبر واتساب من دون تطبيق للضيف؟" },
      a: {
        en: "Yes. Images and videos open inside WhatsApp itself, and a link version opens in the phone's browser. Guests never need to install anything.",
        ar: "نعم. تُفتح الصور والفيديوهات داخل واتساب نفسه، وتفتح نسخة الرابط في متصفّح الهاتف. لا يحتاج الضيوف لتثبيت أي شيء.",
      },
    },
    {
      q: { en: "Can I order a static card, an animated video, or an interactive link?", ar: "هل تتوفر الدعوة كصورة وفيديو ورابط تفاعلي؟" },
      a: {
        en: "All three. A static card is fast and timeless, an animated MP4 adds music and motion, and a link can carry RSVP, a map or a QR. Many families use a combination.",
        ar: "الثلاثة جميعاً. البطاقة الثابتة سريعة وخالدة، والفيديو المتحرك يضيف موسيقى وحركة، والرابط يمكن أن يحمل تأكيد حضور أو خريطة أو باركود. تستخدم عائلات كثيرة مزيجاً منها.",
      },
    },
  ],
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, title: t(HUB.meta.title, locale), description: t(HUB.meta.description, locale), path: PATH });
}

export default async function DigitalInvitationsHub({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const faqItems = HUB.faqs.map((f) => ({ q: t(f.q, locale), a: t(f.a, locale) }));
  // One demo per style family for the hub preview strip.
  const preview = invitationDemos.filter((d) => d.categorySlug === "wedding-invitation");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.services, locale), path: "/services" },
            { name: t(HUB.eyebrow, locale), path: PATH },
          ]),
          serviceSchema({
            locale,
            name: t(HUB.h1, locale),
            description: t(HUB.meta.description, locale),
            path: PATH,
            areaServed: AREA,
          }),
          faqSchema(faqItems),
        ]}
      />

      {/* HERO */}
      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.services, locale), path: "/services" },
            { name: t(HUB.eyebrow, locale) },
          ]}
        />
        <Reveal>
          <Eyebrow>{t(HUB.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]">{t(HUB.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(HUB.lead, locale)}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={localizedPath(locale, GALLERY_PATH)} variant="gold">
              {t(invitationUi.galleryAnchor, locale)}
            </Button>
            <Button href={waLink("Re: Digital invitations")} variant="ghost" external>
              {t(invitationUi.startOnWhatsApp, locale)}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ALL PAGES BY GROUP (matrix: hub links to every child) */}
      {HUB.groups.map((group, gi) => (
        <Section key={gi} alt={gi % 2 === 0}>
          <Reveal>
            <Eyebrow>{t(group.title, locale)}</Eyebrow>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {group.slugs.map((slug) => {
              const p = getInvitationPage(slug);
              if (!p) return null;
              return (
                <Reveal as="div" key={slug}>
                  <Link
                    href={localizedPath(locale, `/services/${slug}`)}
                    className="bs-card bs-card-hover flex h-full flex-col"
                  >
                    <h2 className="text-xl">{t(p.breadcrumb, locale)}</h2>
                    <p className="mt-3 text-sm text-[color:var(--color-muted)]">{t(p.meta.description, locale)}</p>
                    <span className="mt-5 text-sm text-[color:var(--color-gold)]">
                      {t(invitationUi.viewService, locale)} →
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Section>
      ))}

      {/* DEMO GALLERY PREVIEW */}
      <Section>
        <Reveal>
          <Eyebrow>{t(invitationUi.samples, locale)}</Eyebrow>
          <p className="bs-lead mt-6 !max-w-2xl">{t(invitationUi.samplesNote, locale)}</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {preview.map((demo) => (
            <InvitationCard key={demo.id} demo={demo} locale={locale} />
          ))}
        </div>
        <div className="mt-8">
          <Button href={localizedPath(locale, GALLERY_PATH)} variant="ghost">
            {t(invitationUi.galleryAnchor, locale)} →
          </Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(invitationUi.faqs, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(HUB.h1, locale)}</h2>
        </Reveal>
        <div className="mt-10">
          <Faq items={faqItems} />
        </div>
      </Section>

      <CtaBand locale={locale} heading={t(HUB.h1, locale)} waContext="Re: Digital invitations" />
    </>
  );
}
