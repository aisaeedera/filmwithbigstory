import { ImageResponse } from "next/og";
import type { Locale } from "@/lib/i18n";

export const alt = "Big Story — Film & Video Production, Dubai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const tagline =
    locale === "ar" ? "إنتاج الأفلام والفيديو · دبي" : "Film & Video Production · Dubai";
  const headline =
    locale === "ar" ? "قصص تستحق المشاهدة" : "Brands deserve stories worth watching.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080A",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 40, color: "#FAFAF7", fontWeight: 700 }}>
          BIG<span style={{ color: "#C9A227" }}>·</span>STORY
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#C9A227" }}>
            {tagline}
          </div>
          <div style={{ fontSize: 68, color: "#FAFAF7", lineHeight: 1.05, marginTop: 24, maxWidth: 960 }}>
            {headline}
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#8A8A85" }}>filmwithbigstory.com · +971 52 841 8108</div>
      </div>
    ),
    { ...size }
  );
}
