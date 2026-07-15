import QRCode from "qrcode";

export function buildPhotoFinderUrl(eventId: string, siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://filmwithbigstory.com") {
  const origin = siteOrigin.replace(/\/$/, "");
  return `${origin}/photo-finder/${encodeURIComponent(eventId)}`;
}

export async function createQrCodeDataUrl(url: string) {
  return QRCode.toString(url, {
    type: "svg" as const,
    errorCorrectionLevel: "M",
    margin: 2,
    color: { dark: "#08080a", light: "#ffffff" },
  }).then((svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`);
}
