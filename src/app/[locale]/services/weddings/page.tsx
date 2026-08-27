import { redirect } from "next/navigation";
import { type Locale, localizedPath } from "@/lib/i18n";

/** Legacy route retained only as the canonical redirect to the wedding hub. */
export default async function LegacyWeddingsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  redirect(localizedPath(locale, "/weddings"));
}