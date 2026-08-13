import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import InvitationServicePage, { invitationServiceMetadata } from "@/components/invitations/InvitationServicePage";

const SLUG = "malka-engagement-invitations";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return invitationServiceMetadata(SLUG, locale);
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <InvitationServicePage slug={SLUG} locale={locale} />;
}
