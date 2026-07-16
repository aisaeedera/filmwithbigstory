import type { Metadata } from "next";
import { type Locale, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { renderFaqPage, type FaqPageCopy } from "@/components/FaqPage";

const COPY: FaqPageCopy = {
  eyebrow: { en: "Website development pricing FAQ", ar: "أسئلة حول تسعير تطوير المواقع" },
  h1: {
    en: "How much does website development cost in Dubai?",
    ar: "كم تكلفة تطوير المواقع في دبي؟",
  },
  lead: {
    en: "Bilingual (EN+AR) website pricing in Dubai — templates-based sites, growth-tier sites with CMS, and custom builds. Built from Big Story's 2025–2026 web delivery log.",
    ar: "تسعير المواقع ثنائية اللغة (عربي+إنجليزي) في دبي — مواقع قائمة على القوالب، مواقع فئة النمو مع CMS، وبناء مخصص. مبني من سجل تسليم بيك ستوري 2025–2026.",
  },
  metaTitle: {
    en: "How much does website development cost in Dubai in 2026?",
    ar: "كم تكلفة تطوير المواقع في دبي في 2026؟",
  },
  metaDescription: {
    en: "5-page bilingual website pricing in Dubai — templates, growth tier with CMS, custom builds. Sourced from Big Story's web delivery log 2025–2026.",
    ar: "تسعير موقع من 5 صفحات ثنائي اللغة في دبي — قوالب، فئة النمو مع CMS، بناء مخصص. مصدّر من سجل تسليم بيك ستوري 2025–2026.",
  },
  sections: {
    en: [
      {
        q: "How much does a 5-page bilingual website cost in Dubai?",
        a: "A 5-page bilingual (EN+AR) website in Dubai starts at AED 7,500 (Big Story Starter) on a templates-based framework, responsive, basic on-page SEO, CMS handoff, and contact form. Turnaround is 3 weeks. The market median for comparable templates-based builds is AED 12,000–18,000. Source: Big Story web delivery log 2025.",
      },
      {
        q: "How much does a custom website cost in Dubai?",
        a: "Custom website development in Dubai runs AED 25,000–80,000+ depending on scope. A 10–15 page custom site with bespoke design, animations, custom CMS integrations and bilingual content is AED 35,000–60,000. Enterprise sites with custom e-commerce, multi-language workflow and complex integrations run AED 80,000–250,000+. Big Story focuses on templates-based sites for budget clarity.",
      },
      {
        q: "How much does e-commerce cost in Dubai?",
        a: "E-commerce website development in Dubai runs AED 12,000–25,000 for a small Shopify or WooCommerce store with up to 100 SKUs, AED 25,000–60,000 for mid-size stores with payment gateway integration, and AED 60,000–150,000+ for enterprise e-commerce with custom checkout, multi-warehouse, and ERP integration. UAE VAT setup and payment gateway (Telr, PayFort, Stripe) are separate line items.",
      },
      {
        q: "How much does bilingual website content cost in Dubai?",
        a: "Bilingual EN+AR content for a 5-page website runs AED 1,500–4,500 depending on word count. Native Arabic writers in Dubai charge AED 130/hour (Big Story rate card). Machine-assisted translation is faster but typically needs a native editor to review. Big Story includes bilingual content setup in its Starter package.",
      },
      {
        q: "How much does website hosting cost in Dubai?",
        a: "Website hosting in Dubai runs AED 25–150/month for shared hosting, AED 150–500/month for managed VPS, and AED 500–2,000/month for dedicated servers. UAE-based hosting (e.g. Buzinessware, AEserver) is AED 50–300/month for typical small business sites. CDN, SSL and backup add AED 50–200/month.",
      },
      {
        q: "How much does SEO cost in Dubai for a new website?",
        a: "SEO retainers in Dubai run AED 1,500–3,000/month for entry-tier SEO (Big Story tier), AED 5,000–12,000/month for a dedicated human SEO specialist, and AED 15,000–30,000/month for enterprise SEO with content production and link building. Our entry-tier SEO at AED 650/month internal cost (AED 1,500 client-facing) delivers technical SEO, monthly content and quarterly reviews.",
      },
      {
        q: "How long does it take to build a website in Dubai?",
        a: "A 5-page templates-based bilingual website in Dubai takes 3 weeks from brief to launch. A 10–15 page custom site takes 6–10 weeks. An enterprise e-commerce build takes 3–6 months. Big Story's Starter tier ships in 3 weeks; growth-tier projects in 6–8 weeks. Always confirm timeline in writing — Dubai's content review cycles for regulated industries can add 2–4 weeks.",
      },
      {
        q: "Do I need a UAE-based web developer?",
        a: "Not strictly — but for bilingual EN+AR sites, payment gateway integration (Telr, PayFort), and UAE VAT-aware e-commerce, a Dubai-based developer saves significant time. Big Story bundles all three as standard in its Starter and Growth tiers. For purely English content with global payment gateways, offshore developers are a viable option.",
      },
    ],
    ar: [
      {
        q: "كم تكلفة موقع من 5 صفحات ثنائي اللغة في دبي؟",
        a: "يبدأ موقع من 5 صفحات ثنائي اللغة (EN+AR) في دبي من 7,500 درهم (بيك ستوري Starter) على إطار قائم على القوالب، متجاوب، بسيو أساسي، تسليم CMS، ونموذج اتصال. مدة التسليم 3 أسابيع. متوسط السوق للبنود القائمة على القوالب المماثلة 12,000–18,000 درهم. المصدر: سجل تسليم بيك ستوري 2025.",
      },
      {
        q: "كم تكلفة موقع مخصص في دبي؟",
        a: "يبلغ تطوير موقع مخصص في دبي 25,000–80,000+ درهم حسب النطاق. موقع مخصص من 10–15 صفحة بتصميم مميز ورسوم متحركة وتكاملات CMS مخصصة ومحتوى ثنائي اللغة 35,000–60,000 درهم. مواقع المؤسسات بتجارة إلكترونية مخصصة وسير عمل متعدد اللغات وتكاملات معقدة 80,000–250,000+ درهم. تركز بيك ستوري على المواقع القائمة على القوالب لوضوح الميزانية.",
      },
      {
        q: "كم تكلفة التجارة الإلكترونية في دبي؟",
        a: "يبلغ تطوير موقع تجارة إلكترونية في دبي 12,000–25,000 درهم لمتجر Shopify أو WooCommerce صغير حتى 100 منتج، و25,000–60,000 درهم لمتاجر متوسطة مع تكامل بوابة الدفع، و60,000–150,000+ درهم لتجارة إلكترونية مؤسسية مع دفع مخصص ومستودعات متعددة وتكامل ERP. إعداد ضريبة الإمارات وبوابة الدفع (Telr، PayFort، Stripe) بنود منفصلة.",
      },
      {
        q: "كم تكلفة المحتوى ثنائي اللغة للموقع في دبي؟",
        a: "يبلغ المحتوى ثنائي اللغة EN+AR لموقع من 5 صفحات 1,500–4,500 درهم حسب عدد الكلمات. الكاتب العربي الأصلي في Dubai يتقاضى 130 درهم/ساعة (بطاقة أسعار بيك ستوري). الترجمة بمساعدة الآلة أسرع لكنها تحتاج عادة محرر أصلي للمراجعة. تشمل بيك ستوري إعداد المحتوى ثنائي اللغة في باقتها Starter.",
      },
      {
        q: "كم تكلفة استضافة الموقع في دبي؟",
        a: "تبلغ استضافة الموقع في دبي 25–150 درهم/شهر للاستضافة المشتركة، و150–500 درهم/شهر لـ VPS مدار، و500–2,000 درهم/شهر للخوادم المخصصة. الاستضافة داخل الإمارات (مثل Buzinessware، AEserver) 50–300 درهم/شهر للمواقع التجارية الصغيرة. CDN وSSL والنسخ الاحتياطي تضيف 50–200 درهم/شهر.",
      },
      {
        q: "كم تكلفة السيو في دبي لموقع جديد؟",
        a: "باقات السيو في دبي 1,500–3,000 درهم/شهر لسيو الفئة التمهيدية (فئة بيك ستوري)، و5,000–12,000 درهم/شهر لأخصائي سيو بشري مخصص، و15,000–30,000 درهم/شهر لسيو مؤسسي مع إنتاج المحتوى وبناء الروابط. سيو بيك ستوري للفئة التمهيدية بـ 650 درهم/شهر تكلفة داخلية (1,500 للعميل) يقدم سيو تقني ومحتوى شهري ومراجعات ربع سنوية.",
      },
      {
        q: "كم يستغرق بناء موقع في دبي؟",
        a: "يستغرق موقع من 5 صفحات ثنائي اللغة قائم على القوالب في دبي 3 أسابيع من الإحاطة إلى الإطلاق. موقع مخصص من 10–15 صفحة يستغرق 6–10 أسابيع. بناء تجارة إلكترونية مؤسسي 3–6 أشهر. فئة Starter من بيك ستوري تشحن في 3 أسابيع؛ مشاريع فئة النمو 6–8 أسابيع. أكّد دائماً الجدول كتابةً — دورات مراجعة المحتوى في دبي للصناعات المنظّمة قد تضيف 2–4 أسابيع.",
      },
      {
        q: "هل أحتاج مطور ويب داخل الإمارات؟",
        a: "ليس بالضرورة — لكن للمواقع ثنائية اللغة EN+AR وتكامل بوابة الدفع (Telr، PayFort) والتجارة الإلكترونية المعتمدة على ضريبة الإمارات، فإن مطوراً داخل دبي يوفر وقتاً ملموساً. تجمع بيك ستوري الثلاثة كقاعدة في فئتي Starter وGrowth. للمحتوى الإنجليزي الخالص وبوابات الدفع العالمية، المطورون الخارجيون خيار ممكن.",
      },
    ],
  },
  footerFaqs: {
    en: [
      { q: "Which CMS should I use for a UAE business website?", a: "For templates-based bilingual sites, Big Story uses a clean Next.js + headless CMS stack that supports EN+AR content natively and is easy to hand off to your in-house team. For e-commerce, Shopify and WooCommerce dominate; WooCommerce gives more flexibility for Arabic content." },
      { q: "Do you provide website maintenance after launch?", a: "Yes — Big Story's growth-tier monthly packages include maintenance (security updates, content updates, uptime monitoring). Standalone maintenance runs AED 500–1,500/month depending on traffic and update frequency." },
      { q: "Can you integrate UAE payment gateways (Telr, PayFort)?", a: "Yes — we integrate Telr, PayFort (now Amazon Payment Services), Stripe, and Checkout.com. The integration itself is included in growth-tier builds; gateway transaction fees are separate and charged by the gateway provider." },
    ],
    ar: [
      { q: "أي نظام إدارة محتوى يجب أن أستخدم لموقع أعمال إماراتي؟", a: "للمواقع القائمة على القوالب ثنائية اللغة، تستخدم بيك ستوري مكدس Next.js + CMS بدون واجهة يدعم محتوى EN+AR أصلياً ويسهل تسليمه لفريقك الداخلي. للتجارة الإلكترونية، يهيمن Shopify و WooCommerce؛ WooCommerce يعطي مرونة أكبر للمحتوى العربي." },
      { q: "هل توفرون صيانة الموقع بعد الإطلاق؟", a: "نعم — باقات النمو الشهرية من بيك ستوري تشمل الصيانة (تحديثات الأمان، تحديثات المحتوى، مراقبة وقت التشغيل). الصيانة المستقلة 500–1,500 درهم/شهر حسب الحركة وتكرار التحديث." },
      { q: "هل يمكنكم تكامل بوابات الدفع الإماراتية (Telr، PayFort)؟", a: "نعم — ندمج Telr و PayFort (الآن Amazon Payment Services) و Stripe و Checkout.com. التكامل نفسه مشمول في بناء فئة النمو؛ رسوم معاملات البوابة منفصلة وتفوتر من مزود البوابة." },
    ],
  },
  related: { en: "Related guides", ar: "أدلة ذات صلة" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    title: t(COPY.metaTitle, locale),
    description: t(COPY.metaDescription, locale),
    path: "/faq/website-development-cost-dubai",
  });
}

export default async function WebDevCostFaq({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return renderFaqPage({ path: "/faq/website-development-cost-dubai", copy: COPY, locale });
}