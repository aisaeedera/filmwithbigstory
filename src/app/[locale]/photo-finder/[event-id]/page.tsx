import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, Eyebrow, Button } from "@/components/primitives";
import { JsonLd, articleSchema, faqSchema } from "@/components/JsonLd";
import { pageMeta } from "@/lib/meta";
import { getEvent } from "@/lib/photo-finder/storage";
import PhotoFinderForm from "@/components/PhotoFinderForm";
import { SITE } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const FAQ = {
  en: [
    { q: "How does the photo finder work?", a: "Tell us your name and email, then optionally add a face photo or reference image. Our team uses the claim to connect you with the final tagged gallery once editing is complete." },
    { q: "Are my details private?", a: "Yes. We use your details only to deliver your event gallery and never publish your face photo or contact details." },
    { q: "When will my photos be ready?", a: "Event photos appear here after editing and tagging. If the gallery is not ready yet, we will keep your claim on file and update the event gallery." },
  ],
  ar: [
    { q: "كيف يعمل البحث عن الصور؟", a: "أدخل اسمك وبريدك الإلكتروني، ويمكنك إضافة صورة للوجه أو صورة مرجعية. نستخدم الطلب لربطك بالمعرض النهائي بعد اكتمال المونتاج ووضع العلامات." },
    { q: "هل بياناتي خاصة؟", a: "نعم. نستخدم بياناتك فقط لإرسال معرض صور مناسبتك، ولا ننشر صورة وجهك أو بيانات التواصل." },
    { q: "متى ستكون صوري جاهزة؟", a: "تظهر صور المناسبة هنا بعد المونتاج ووضع العلامات. إذا لم يجهز المعرض بعد، نحتفظ بطلبك ونحدّث المعرض عند جاهزيته." },
  ],
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; "event-id": string }> }): Promise<Metadata> {
  const { locale, "event-id": eventId } = await params;
  const event = await getEvent(eventId);
  const isAr = locale === "ar";
  return pageMeta({
    locale,
    path: `/photo-finder/${eventId}`,
    title: isAr ? `صور مناسبة ${event?.name || "بيك ستوري"} | بيك ستوري` : `${event?.name || "Event"} Photo Finder | Big Story`,
    description: isAr ? "ابحث عن صورك من مناسبة بيك ستوري عبر نموذج آمن ثنائي اللغة." : "Find your photos from this Big Story event through a private bilingual claim form.",
    noindex: true,
  });
}

export async function generateStaticParams() {
  return [];
}

export default async function PhotoFinderPage({ params }: { params: Promise<{ locale: Locale; "event-id": string }> }) {
  const { locale, "event-id": eventId } = await params;
  const event = await getEvent(eventId);
  if (!event) notFound();
  const isAr = locale === "ar";
  const faqItems: { q: string; a: string }[] = isAr ? [...FAQ.ar] : [...FAQ.en];
  const copy = isAr ? {
    name: "الاسم الكامل", email: "البريد الإلكتروني", face: "صورة مرجعية (اختياري)", upload: "يمكنك رفع صورة شخصية أو صورة للوجه للمساعدة في المطابقة.", submit: "كنت في هذه المناسبة — ابحث عن صوري", searching: "جارٍ البحث…", matches: "وجدنا هذه الصور لك", noMatches: "لم نجد صوراً مطابقة بعد. سنحدّث المعرض بعد اكتمال المونتاج.", preEdit: "المناسبة قيد المونتاج حالياً. حفظنا طلبك وسنحدّث المعرض عند جاهزية الصور.", error: "تعذر حفظ الطلب. حاول مرة أخرى.",
  } : {
    name: "Full name", email: "Email address", face: "Reference photo (optional)", upload: "Upload a selfie or face photo to help our team find your images.", submit: "I was at this event — find my photos", searching: "Searching…", matches: "We found these photos for you", noMatches: "No matches yet. We will update the gallery after editing.", preEdit: "This event is still being edited. We saved your claim and will update the gallery when the photos are ready.", error: "We could not save your claim. Please try again.",
  };
  return (
    <>
      <JsonLd data={[articleSchema({ locale, headline: isAr ? `صور ${event.name}` : `${event.name} Photo Finder`, description: isAr ? "ابحث عن صورك من المناسبة." : "Find your photos from this event.", path: `/photo-finder/${eventId}`, image: event.coverImage || `${SITE.domain}/opengraph-image`, datePublished: event.date, authorName: SITE.name }), faqSchema(faqItems)]} />
      <Section className="pb-14 md:pb-20">
        <Eyebrow>{isAr ? "معرض الضيوف" : "Guest gallery"}</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)]">{isAr ? "هل كنت معنا؟ اعثر على صورك." : "Were you there? Find your photos."}</h1>
        <p className="bs-lead mt-8">{isAr ? `ابحث عن صورك من ${event.name}.` : `Find your photos from ${event.name}.`}</p>
        <div className="mt-7 flex flex-wrap gap-3 text-sm text-[color:var(--color-muted)]"><span>{event.date}</span><span aria-hidden="true">·</span><span>{event.location}</span><span aria-hidden="true">·</span><span>{event.totalPhotos} {isAr ? "صورة منشورة" : "photos published"}</span></div>
      </Section>
      <Section alt>
        <PhotoFinderForm eventId={eventId} copy={copy} />
      </Section>
      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          <div><Eyebrow>{isAr ? "خصوصيتك" : "Your privacy"}</Eyebrow><p className="mt-5 text-sm text-[color:var(--color-muted)]">{isAr ? "بياناتك للاستخدام في تسليم الصور فقط." : "Your details are used only to deliver your gallery."}</p></div>
          <div><Eyebrow>{isAr ? "بعد المونتاج" : "After editing"}</Eyebrow><p className="mt-5 text-sm text-[color:var(--color-muted)]">{isAr ? "نستمر في تحديث المعرض بعد اكتمال التحرير." : "We keep updating the gallery after the edit is complete."}</p></div>
          <div><Eyebrow>{isAr ? "مساعدة" : "Need help?"}</Eyebrow><p className="mt-5 text-sm text-[color:var(--color-muted)]"><Button href="mailto:hi@filmwithbigstory.com" variant="ghost">{isAr ? "راسلنا" : "Email Big Story"}</Button></p></div>
        </div>
      </Section>
      <Section alt>
        <Eyebrow>{isAr ? "أسئلة شائعة" : "FAQ"}</Eyebrow>
        <div className="mt-8 divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]">{faqItems.map((item) => <details key={item.q} className="py-5"><summary className="cursor-pointer font-medium">{item.q}</summary><p className="mt-3 max-w-3xl text-[color:var(--color-muted)]">{item.a}</p></details>)}</div>
      </Section>
    </>
  );
}
