import { SITE } from "@/lib/site";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { caseStudies } from "@/data/work";
import { t } from "@/lib/i18n";

export const dynamic = "force-static";

export function GET() {
  const d = SITE.domain;
  const lines: string[] = [];
  lines.push(`# Big Story`);
  lines.push("");
  lines.push(
    `> Big Story is a boutique film and video production studio based in Dubai, UAE, producing cinema-grade TVCs, brand films, corporate video, product films, social content, event coverage and documentary across the UAE. Concept to final cut, one team, English and Arabic.`
  );
  lines.push("");
  lines.push(`Contact: ${SITE.email} · WhatsApp ${SITE.phone} · Dubai, UAE`);
  lines.push(`Arabic mirror of every page is available under /ar/.`);
  lines.push("");
  lines.push(`## Core pages`);
  lines.push(`- [Home](${d}/): Studio overview, showreel, services, service areas`);
  lines.push(`- [Services](${d}/services): Seven production services end to end`);
  lines.push(`- [Work](${d}/work): Concepts and case studies`);
  lines.push(`- [About](${d}/about): Boutique studio, one-team approach, NDA-ready`);
  lines.push(`- [Contact](${d}/contact): WhatsApp brief, email, project form`);
  lines.push(`- [Service Areas](${d}/service-areas): Coverage across six UAE emirates`);
  lines.push(`- [FAQs](${d}/faqs): Process, pricing approach, timelines`);
  lines.push(`- [Careers](${d}/careers): Crew applications`);
  lines.push("");
  lines.push(`## Services`);
  for (const s of services) {
    lines.push(`- [${t(s.name, "en")}](${d}/services/${s.slug}): ${t(s.description, "en")}`);
  }
  lines.push("");
  lines.push(`## Service areas (cities)`);
  for (const c of cities) {
    lines.push(`- ${t(c.name, "en")}: ${t(c.note, "en")}`);
  }
  lines.push("");
  lines.push(`## Location pages`);
  lines.push(
    `Every service is available as a dedicated city page at ${d}/locations/{service}-{city} (42 combinations, e.g. /locations/tvc-production-dubai).`
  );
  lines.push("");
  lines.push(`## Selected work`);
  for (const cs of caseStudies) {
    lines.push(`- [${t(cs.title, "en")}](${d}/work/${cs.slug}): ${t(cs.summary, "en")}`);
  }
  lines.push("");
  lines.push(`## Related`);
  lines.push(`- RED Camera Rentals: ${SITE.redDomain}`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
