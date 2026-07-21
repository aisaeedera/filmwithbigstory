import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { fontVariables } from "@/lib/fonts";
import { locales, isLocale, dir, htmlLang, t, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { ui } from "@/data/copy";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: "Big Story | Film & Video Production in Dubai",
    template: "%s",
  },
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;

  return (
    <html lang={htmlLang(loc)} dir={dir(loc)} className={fontVariables} suppressHydrationWarning>
      <body>
        <a href="#main" className="bs-skip">
          {t(ui.nav.skip, loc)}
        </a>
        <JsonLd data={[organizationSchema(), websiteSchema(loc)]} />
        <Nav locale={loc} />
        <main id="main">{children}</main>
        <Footer locale={loc} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
