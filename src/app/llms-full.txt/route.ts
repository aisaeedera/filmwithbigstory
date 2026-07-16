import { SITE } from "@/lib/site";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { faqs } from "@/data/copy";
import { t } from "@/lib/i18n";
import { fill } from "@/lib/util";

export const dynamic = "force-static";

export function GET() {
  const d = SITE.domain;
  const out: string[] = [];
  out.push(`# Big Story — Full Content Reference`);
  out.push("");
  out.push(
    `Big Story is a Dubai-based boutique film and video production studio serving the UAE. We handle strategy, story, shoot and post under one team. Primary contact is WhatsApp ${SITE.phone} or email ${SITE.email}. We reply within one business day. Every page has an Arabic mirror under /ar/.`
  );
  out.push("");

  out.push(`## Services (detail)`);
  for (const s of services) {
    out.push(``);
    out.push(`### ${t(s.name, "en")} — ${d}/services/${s.slug}`);
    out.push(t(s.lead, "en"));
    out.push(`Process: ${s.process.map((p) => `${p.n} ${t(p.title, "en")}`).join(" · ")}`);
    out.push(`Deliverables: ${s.deliverables.map((x) => t(x, "en")).join("; ")}`);
    for (const f of s.faqs) {
      out.push(`Q: ${t(f.q, "en")}`);
      out.push(`A: ${t(f.a, "en")}`);
    }
    out.push(`Available in: ${cities.map((c) => t(c.name, "en")).join(", ")}.`);
  }

  out.push("");
  out.push(`## Cities (local context)`);
  for (const c of cities) {
    out.push(``);
    out.push(`### ${t(c.name, "en")}`);
    out.push(fill(t(c.groundBase, "en"), { city: t(c.name, "en") }));
    out.push(`Areas: ${c.areas.join(", ")}.`);
  }

  out.push("");
  out.push(`## General FAQs`);
  for (const it of faqs.items) {
    out.push(`Q: ${t(it.q, "en")}`);
    out.push(`A: ${t(it.a, "en")}`);
  }

  out.push("");
  out.push(`## Related properties`);
  out.push(`- RED Camera Rentals (equipment arm): ${SITE.redDomain}`);
  out.push("");

  return new Response(out.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
