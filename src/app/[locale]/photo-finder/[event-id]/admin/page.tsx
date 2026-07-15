import { notFound } from "next/navigation";
import { Section, Eyebrow } from "@/components/primitives";
import { getEvent } from "@/lib/photo-finder/storage";
import PhotoFinderAdmin from "@/components/PhotoFinderAdmin";
import type { Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function PhotoFinderAdminPage({ params }: { params: Promise<{ locale: Locale; "event-id": string }> }) {
  const { "event-id": eventId } = await params;
  const event = await getEvent(eventId);
  if (!event) notFound();
  return <Section><Eyebrow>Photo finder admin</Eyebrow><h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,5rem)]">Upload and tag final photos.</h1><p className="bs-lead mt-6">{event.name} · {event.date} · {event.location}</p><div className="mt-10"><PhotoFinderAdmin eventId={eventId} initialPhotos={event.photos} /></div></Section>;
}
