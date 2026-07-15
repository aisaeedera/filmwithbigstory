import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { services } from "@/data/services";
import { servicesIndex as si, ui } from "@/data/copy";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema, articleSchema } from "@/components/JsonLd";
import { SITE, waLink } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return pageMeta({
    locale,
    title: isAr
      ? "تصميم ألبوم الزفاف | 40 صفحة بغلاف صلب AED 3,500 | بيك ستوري"
      : "Wedding Album Design | 40-Page Hard Cover AED 3,500 | Big Story",
    description: isAr
      ? "تصميم وطباعة ألبوم زفاف احترافي — 40 صفحة بغلاف صلب، 30×30 سم، ورق Fuji Crystal أرشيفي. AED 3,500 لـ 40 صفحة، AED 4,500 لـ 60. 4 أسابيع من اختيار الصور."
      : "Professional wedding album design and printing — 40-page hard cover, 30×30 cm, Fuji Crystal archival paper. AED 3,500 for 40 pages, AED 4,500 for 60. 4 weeks from photo selection.",
    path: "/services/wedding-album-design",
  });
}

const COPY = {
  eyebrow: { en: "Wedding Album Design in Dubai", ar: "تصميم ألبوم الزفاف في دبي" },
  h1: {
    en: "Wedding Album Design in Dubai — 40-page hard cover, archival inkjet, 4-week delivery",
    ar: "تصميم ألبوم الزفاف في دبي — 40 صفحة بغلاف صلب، طباعة أرشيفية، 4 أسابيع",
  },
  lead: {
    en: "Big Story's wedding album is a 40-page lay-flat hard-cover album, 30×30 cm, printed and bound at our Al Quoz partner lab on Fuji Crystal archival paper. Each spread lays flat (no centre crease) so your wedding photos print edge-to-edge across both pages. Photo selection happens in our online proofing gallery (mobile-friendly, two revision rounds included). Lead time is 4 weeks from photo selection. Price: AED 3,500 for 40 pages, AED 4,500 for 60 pages, AED 200 per extra 10 pages.",
    ar: "ألبوم زفاف بيك ستوري هو ألبوم 40 صفحة lay-flat بغلاف صلب، 30×30 سم، يُطبع ويُجلد في مختبر شريكنا في القوز على ورق Fuji Crystal أرشيفي. كل صفحة مزدوجة تُفتح مسطحة (بدون تجعيد في المنتصف) بحيث تُطبع صور زفافك من الحافة إلى الحافة عبر الصفحتين. اختيار الصور يتم في معرضنا الإلكتروني (صديق للجوال، جولتا مراجعة مشمولتان). مدة التسليم 4 أسابيع من اختيار الصور. السعر: 3,500 درهم لـ 40 صفحة، 4,500 درهم لـ 60 صفحة، 200 درهم لكل 10 صفحات إضافية.",
  },
  statsHeading: { en: "Wedding albums by the numbers — 2026", ar: "ألبومات الزفاف بالأرقام — 2026" },
  statsBody: {
    en: "From Big Story's 2025–2026 album production — average page count, average turnaround, and the share of bookings that also ordered a parent album. All figures from our own lab invoices.",
    ar: "من إنتاج ألبومات بيك ستوري 2025–2026 — متوسط عدد الصفحات، متوسط مدة التسليم، ونسبة الحجوزات التي طلبت أيضاً ألبوم للوالدين. كل الأرقام من فواتير المختبر لدينا.",
  },
  stat1: { en: "AED 3,500", ar: "3,500 درهم" },
  stat1Label: { en: "Base price: 40-page lay-flat hard-cover album, 30×30 cm, Fuji Crystal archival paper", ar: "السعر الأساسي: 40 صفحة lay-flat بغلاف صلب، 30×30 سم، ورق Fuji Crystal أرشيفي" },
  stat2: { en: "4 weeks", ar: "4 أسابيع" },
  stat3: { en: "80", ar: "80" },
  stat3Label: { en: "Average number of photos in a 40-page album (2 per spread, ~80 spreads across 40 pages)", ar: "متوسط عدد الصور في ألبوم 40 صفحة (2 لكل صفحة مزدوجة، ~80 صفحة مزدوجة في 40 صفحة)" },
  stat4: { en: "30%", ar: "30٪" },
  stat4Label: { en: "Album bookings in 2025 that added a parent album (smaller, soft-cover, AED 1,200 each)", ar: "حجوزات الألبوم في 2025 التي أضافت ألبوماً للوالدين (أصغر، غلاف لين، 1,200 درهم للواحد)" },
};

const faqItems = {
  en: [
    {
      q: "How much does a wedding album cost?",
      a: "Big Story's base wedding album is AED 3,500 for a 40-page lay-flat hard-cover album, 30×30 cm, printed and bound at our Al Quoz partner lab on Fuji Crystal archival paper. Common upgrades: 60-page album AED 4,500. Extra 10 pages: AED 200 each. Premium cover materials (leather, linen, suede): AED 400–800. Parent albums (smaller, soft-cover, 20 pages): AED 1,200 each. Most couples book one main album; ~30% add a parent album as an anniversary gift or wedding-day present for the in-laws.",
    },
    {
      q: "What does 'lay-flat' mean — and why does it matter?",
      a: "Lay-flat binding means the album opens completely flat — no centre crease where the two pages meet. This is critical for wedding photography because the most cinematic shots (wide ceremony shots, two-page spreads of the first dance, panoramic landscape portraits) lose their impact when the centre of the image falls into a binding crease. Lay-flat albums also last longer (no spine stress) and reproduce colours more accurately across the spread. Big Story albums are all lay-flat as standard.",
    },
    {
      q: "How do I pick the photos for the album?",
      a: "After the wedding, we send you a link to our online proofing gallery with all the edited images (400–800 for a full-day wedding). You favourite the photos you want included in the album (most couples pick 80–120 images for a 40-page album, 2 per spread). You can also leave comments on specific images. Our designer takes your favourites and arranges them across 20 spreads (40 pages), using a mix of full-bleed hero shots and smaller clusters. You get a digital proof to review, two rounds of revisions are included.",
    },
    {
      q: "How long does the album take from selection to delivery?",
      a: "Once you submit your favourites from the proofing gallery, the design takes 5–7 working days for the first proof. Two revision rounds included (typically 2–3 working days each). Final print and binding at our Al Quoz lab takes 7–10 working days. Total turnaround: 4 weeks from your photo selection to the finished album in your hands. Rush delivery (2 weeks) available at +AED 800. Shipping to overseas addresses (UK, India, Pakistan, etc.) takes an extra 5–7 days via DHL.",
    },
    {
      q: "Can I add photos from other photographers (family shots, phone snaps)?",
      a: "Yes — we accept up to 10 images from other sources (family photographer, phone snaps from guests, Polaroids) for inclusion in the album. They need to be high-resolution (3000×2000 minimum for print quality). You can upload them to the proofing gallery alongside your favourites. We don't colour-grade or retouch third-party images, so they may look slightly different from the Big Story images — but they're useful for moments our photographer missed (guests at the after-party, family formals we didn't cover).",
    },
    {
      q: "What if I change my mind on the cover material after I see the proof?",
      a: "Easy to swap before print. Common upgrades: standard linen cover (included), leather cover (+AED 600), suede cover (+AED 800), custom embroidery with your names and wedding date (+AED 200). You select the cover material at the same time you approve the page proofs. If you change your mind after the album is already at the printer, we have to reprint — extra cost AED 800. So pick the cover at the proof stage.",
    },
    {
      q: "Can I order more copies of the same album later (for parents)?",
      a: "Yes — we keep the design file on file for 24 months after the album is delivered. Reorders are priced at AED 1,200 per parent album (smaller 20-page soft-cover version of the same design) or AED 2,800 per duplicate of the main album (same 40 pages, same cover, fresh print). Most couples order parent albums 6–12 months after the wedding as anniversary gifts. Same design, same colour grade, same paper — guaranteed identical reproduction.",
    },
  ],
  ar: [
    {
      q: "كم تكلفة ألبوم الزفاف؟",
      a: "ألبوم زفاف بيك ستوري الأساسي 3,500 درهم لـ 40 صفحة lay-flat بغلاف صلب، 30×30 سم، يُطبع ويُجلد في مختبر شريكنا في القوز على ورق Fuji Crystal أرشيفي. الترقيات الشائعة: ألبوم 60 صفحة 4,500 درهم. 10 صفحات إضافية: 200 درهم للواحدة. مواد غلاف متميزة (جلد، كتان، سويدي): 400–800 درهم. ألبومات الوالدين (أصغر، غلاف لين، 20 صفحة): 1,200 درهم للواحد. معظم الأزواج يحجزون ألبوماً رئيسياً واحداً؛ حوالي 30٪ يضيفون ألبوماً للوالدين كهدية ذكرى زواج أو هدية يوم الزفاف للحموين.",
    },
    {
      q: "ماذا تعني «lay-flat» — ولماذا هي مهمة؟",
      a: "تجليد lay-flat يعني أن الألبوم يُفتح مسطحاً تماماً — بدون تجعيد في المنتصف حيث تلتقي الصفحتان. هذا حاسم لتصوير الزفاف لأن أكثر اللقطات السينمائية (لقطات الحفل الواسعة، صفحات مزدوجة للرقصة الأولى، بورتريه بانورامي للمناظر الطبيعية) تفقد تأثيرها عندما يسقط مركز الصورة في تجعيد التجليد. ألبومات lay-flat تدوم لفترة أطول أيضاً (لا ضغط على الكعب) وتُعيد إنتاج الألوان بدقة أكبر عبر الصفحة المزدوجة. ألبومات بيك ستوري كلها lay-flat قياسياً.",
    },
    {
      q: "كيف أختار صور الألبوم؟",
      a: "بعد الزفاف، نرسل لك رابط معرضنا الإلكتروني مع جميع الصور المعدلة (400–800 ليوم كامل). تفضل الصور التي تريد إدراجها في الألبوم (معظم الأزواج يختارون 80–120 صورة لألبوم 40 صفحة، 2 لكل صفحة مزدوجة). يمكنك أيضاً ترك تعليقات على صور محددة. مصممنا يأخذ مفضلاتك ويرتبها عبر 20 صفحة مزدوجة (40 صفحة)، باستخدام مزيج من لقطات رئيسية بملء الصفحة ومجموعات أصغر. تحصل على مسودة رقمية للمراجعة، جولتا مراجعة مشمولتان.",
    },
    {
      q: "كم يستغرق الألبوم من الاختيار إلى التسليم؟",
      a: "بمجرد تقديم مفضلاتك من معرض الاختيار، التصميم يستغرق 5–7 أيام عمل للمسودة الأولى. جولتا مراجعة مشمولتان (عادة 2–3 أيام عمل لكل واحدة). الطباعة النهائية والتجليد في مختبر القوز 7–10 أيام عمل. إجمالي المدة: 4 أسابيع من اختيارك للصور إلى الألبوم النهائي بين يديك. التسليم العاجل (أسبوعين) متاح بزيادة 800 درهم. الشحن للعناوين في الخارج (بريطانيا، الهند، باكستان، إلخ) يستغرق 5–7 أيام إضافية عبر DHL.",
    },
    {
      q: "هل يمكنني إضافة صور من مصورين آخرين (لقطات عائلية، صور هاتف)؟",
      a: "نعم — نقبل حتى 10 صور من مصادر أخرى (مصور عائلي، صور هاتف من الضيوف، بولارويد) لإدراجها في الألبوم. يجب أن تكون عالية الدقة (3000×2000 كحد أدنى لجودة الطباعة). يمكنك رفعها إلى معرض الاختيار بجانب مفضلاتك. لا نُدرج ألوان أو ننقح صور الطرف الثالث، لذا قد تبدو مختلفة قليلاً عن صور بيك ستوري — لكنها مفيدة للحظات التي فوتها مصورنا (ضيوف الحفلة اللاحقة، صور عائلية لم نُغطها).",
    },
    {
      q: "ماذا لو غيرت رأيي في مادة الغلاف بعد رؤية المسودة؟",
      a: "سهل التغيير قبل الطباعة. الترقيات الشائعة: غلاف كتان قياسي (مشمول)، غلاف جلد (+600 درهم)، غلاف سويدي (+800 درهم)، تطيبير مخصص بأسمائكم وتاريخ الزفاف (+200 درهم). تختار مادة الغلاف في نفس الوقت الذي تعتمد فيه مسودة الصفحات. إذا غيرت رأيك بعد أن يكون الألبوم بالفعل عند الطابعة، علينا إعادة الطباعة — تكلفة إضافية 800 درهم. لذا اختر الغلاف في مرحلة المسودة.",
    },
    {
      q: "هل يمكنني طلب نسخ إضافية من نفس الألبوم لاحقاً (للوالدين)؟",
      a: "نعم — نحتفظ بملف التصميم لمدة 24 شهراً بعد تسليم الألبوم. إعادة الطلب بسعر 1,200 درهم لكل ألبوم والدين (نسخة أصغر 20 صفحة بغلاف لين من نفس التصميم) أو 2,800 درهم لكل نسخة مكررة من الألبوم الرئيسي (نفس 40 صفحة، نفس الغلاف، طباعة جديدة). معظم الأزواج يطلبون ألبومات الوالدين بعد 6–12 شهراً من الزفاف كهدايا ذكرى زواج. نفس التصميم، نفس تدرج الألوان، نفس الورق — استنساخ متطابق مضمون.",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["weddings", "cinematic-wedding", "wedding-photography", "wedding-photo-video"].includes(s.slug)
);

export default async function WeddingAlbumDesignPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/wedding-album-design";
  const isAr = locale === "ar";

  const itemFaqs = isAr ? faqItems.ar : faqItems.en;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.services, locale), path: "/services" },
            { name: t(COPY.h1, locale), path },
          ]),
          articleSchema({
            locale,
            headline: t(COPY.h1, locale),
            description: t(COPY.lead, locale),
            path,
            image: `${SITE.domain}/opengraph-image`,
            datePublished: "2026-07-15",
            authorName: "Big Story Editorial",
          }),
          serviceSchema({
            locale,
            name: isAr ? "تصميم ألبوم الزفاف" : "Wedding Album Design",
            description: isAr
              ? "تصميم وطباعة ألبوم زفاف احترافي في دبي — 40 صفحة بغلاف صلب، ورق أرشيفي، 4 أسابيع من اختيار الصور."
              : "Professional wedding album design and printing in Dubai — 40-page hard cover, archival paper, 4 weeks from photo selection.",
            path,
            areaServed: ["Dubai", "Abu Dhabi", "Sharjah"],
          }),
          faqSchema(itemFaqs),
        ]}
      />

      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.services, locale), path: "/services" },
            { name: t(COPY.h1, locale) },
          ]}
        />
        <Reveal>
          <Eyebrow>{t(COPY.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.05]">{t(COPY.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-3xl">{t(COPY.lead, locale)}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={waLink(isAr ? "مهتم بتصميم وطباعة ألبوم زفاف." : "Interested in wedding album design and printing.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
              {t(ui.nav.startYourProject, locale)}
            </a>
            <Button href={localizedPath(locale, "/services/wedding-photography")} variant="ghost">
              {isAr ? "صفحة تصوير الزفاف" : "Wedding photography page"}
            </Button>
          </div>
        </Reveal>
      </Section>

      <Section alt>
        <Reveal>
          <Eyebrow>{t(COPY.statsHeading, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{t(COPY.statsHeading, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-3xl">{t(COPY.statsBody, locale)}</p>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
          <div className="bs-card !rounded-none flex flex-col justify-between bg-white p-8">
            <p className="bs-num text-[clamp(1.4rem,2.4vw,2rem)]">{t(COPY.stat1, locale)}</p>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(COPY.stat1Label, locale)}</p>
          </div>
          <div className="bs-card !rounded-none flex flex-col justify-between bg-white p-8">
            <p className="bs-num">{t(COPY.stat2, locale)}</p>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(COPY.stat3, locale)}</p>
          </div>
          <div className="bs-card !rounded-none flex flex-col justify-between bg-white p-8">
            <p className="bs-num">{t(COPY.stat4, locale)}</p>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(COPY.stat4, locale)}</p>
          </div>
        </div>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "حجم الألبوم والمواد" : "Album size and materials"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "تفاصيل التصميم والطباعة" : "Design and print specifications"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              h: isAr ? "الحجم والشكل" : "Size and format",
              b: isAr
                ? "30×30 سم (12×12 بوصة) — مربع، الشكل الأكثر كلاسيكية لألبوم الزفاف. خيارات أخرى: 25×25 سم (أصغر، أرخص بـ 600 درهم) أو 35×35 سم (أكبر، أغلى بـ 800 درهم)."
                : "30×30 cm (12×12 inches) — square, the most classic wedding album format. Other options: 25×25 cm (smaller, AED 600 cheaper) or 35×35 cm (larger, AED 800 more).",
            },
            {
              h: isAr ? "التجليد lay-flat" : "Lay-flat binding",
              b: isAr
                ? "كل صفحة مزدوجة تُفتح مسطحة 180 درجة — لا تجعيد في المنتصف. ضروري للصور البانورامية الواسعة ولقطات الحفل كاملة."
                : "Each spread opens flat 180° — no centre crease. Essential for wide panoramic images and full ceremony shots.",
            },
            {
              h: isAr ? "ورق Fuji Crystal أرشيفي" : "Fuji Crystal archival paper",
              b: isAr
                ? "ورق طباعة حبرية أرشيفي، مقاوم للبهتان لمدة 100+ سنة. لمسة نهائية لامعة (لامعة) أو مطفية (غير لامعة) — نوصي اللامعة لألوان زاهية، المطفية للصور الفنية."
                : "Archival inkjet paper, fade-resistant for 100+ years. Glossy or matte finish — we recommend glossy for vibrant colours, matte for artistic shots.",
            },
            {
              h: isAr ? "مواد الغلاف" : "Cover materials",
              b: isAr
                ? "كتان قياسي (مشمول)، جلد (+600 درهم)، سويدي (+800 درهم)، تطيبير مخصص للأسماء وتاريخ الزفاف (+200 درهم). غلاف صلب مع حافة محمية."
                : "Standard linen (included), leather (+AED 600), suede (+AED 800), custom embroidery with names and date (+AED 200). Hard cover with reinforced edges.",
            },
            {
              h: isAr ? "سير عمل التصميم" : "Design workflow",
              b: isAr
                ? "تختار 80–120 صورة من معرضنا الإلكتروني. مصممنا يرتبها عبر 20 صفحة مزدوجة (40 صفحة). مسودة رقمية للمراجعة، جولتا تعديل مشمولتان."
                : "You pick 80–120 images from our proofing gallery. Our designer arranges them across 20 spreads (40 pages). Digital proof for review, two revision rounds included.",
            },
            {
              h: isAr ? "التسليم والشحن" : "Delivery and shipping",
              b: isAr
                ? "4 أسابيع من اختيار الصور في الإمارات. الشحن الدولي (بريطانيا، الهند، باكستان، إلخ) عبر DHL، 5–7 أيام إضافية، 200 درهم للشحنة الواحدة."
                : "4 weeks from photo selection in the UAE. International shipping (UK, India, Pakistan, etc.) via DHL, 5–7 extra days, AED 200 per shipment.",
            },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 60} className="bs-card">
              <p className="bs-eyebrow">0{i + 1}</p>
              <h3 className="mt-4 text-xl">{card.h}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{card.b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "باقات الألبوم" : "Album packages"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "ثلاث طرق لطلب الألبوم" : "Three ways to order"}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              tag: isAr ? "باقة 1 · الألبوم الأساسي" : "Package 1 · The base album",
              title: isAr ? "ألبوم 40 صفحة" : "40-page album",
              blurb: isAr
                ? "AED 3,500. 40 صفحة lay-flat بغلاف صلب، 30×30 سم، ورق Fuji Crystal، كتان قياسي. 4 أسابيع. جولتا مراجعة مشمولتان."
                : "AED 3,500. 40-page lay-flat hard cover, 30×30 cm, Fuji Crystal paper, standard linen cover. 4 weeks. Two revision rounds included.",
            },
            {
              tag: isAr ? "باقة 2 · الألبوم الكبير" : "Package 2 · The large album",
              title: isAr ? "ألبوم 60 صفحة" : "60-page album",
              blurb: isAr
                ? "AED 4,500. 60 صفحة lay-flat بغلاف صلب، 30×30 سم. للأزواج الذين يريدون المزيد من الصور في الألبوم — لحظات ضيوف، عائلية، فقرات كاملة من الحفل."
                : "AED 4,500. 60-page lay-flat hard cover, 30×30 cm. For couples who want more photos in the album — guests, family, full ceremony segments.",
            },
            {
              tag: isAr ? "باقة 3 · الألبوم + للوالدين" : "Package 3 · Album + parent copies",
              title: isAr ? "ألبوم رئيسي + 2 للوالدين" : "Main album + 2 parent copies",
              blurb: isAr
                ? "AED 5,900 (3,500 + 1,200×2). ألبوم رئيسي 40 صفحة + ألبومين 20 صفحة بغلاف لين للوالدين. هدية ذكرى زواج مثالية."
                : "AED 5,900 (3,500 + 1,200×2). Main 40-page album + 2 soft-cover 20-page parent copies. A perfect anniversary gift.",
            },
          ].map((c, i) => (
            <Reveal as="div" key={i} delay={i * 70} className="bs-card bs-card-hover">
              <span className="bs-eyebrow !text-[color:var(--color-muted)] before:!bg-[color:var(--color-muted)]">{c.tag}</span>
              <h3 className="mt-4 text-xl">{c.title}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{c.blurb}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>{t(si.detail.faqs, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "أسئلة متكررة عن ألبوم الزفاف" : "FAQ — Wedding album design"}
          </h2>
        </Reveal>
        <div className="mt-10">
          <Faq items={itemFaqs} />
        </div>
      </Section>

      <Section alt>
        <Reveal>
          <Eyebrow>{t(ui.breadcrumb.home, locale)}</Eyebrow>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {relatedServices.map((s, i) => (
            <Reveal as="div" key={s.slug} delay={i * 70}>
              <Link href={localizedPath(locale, `/services/${s.slug}`)} className="bs-card bs-card-hover block h-full">
                <span className="bs-eyebrow !text-[color:var(--color-muted)] before:!bg-[color:var(--color-muted)]">{t(s.eyebrow, locale)}</span>
                <h3 className="mt-4 text-lg">{t(s.name, locale)}</h3>
                <p className="mt-3 text-sm text-[color:var(--color-muted)]">{t(s.description, locale)}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        locale={locale}
        heading={isAr ? "جاهز لتصميم ألبوم زفافك؟" : "Ready to design your wedding album?"}
        waContext={isAr ? "بخصوص تصميم وطباعة ألبوم الزفاف." : "Re: wedding album design and printing."}
      />
    </>
  );
}
