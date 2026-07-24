"use client";

import { useState } from "react";
import { type Locale } from "@/lib/i18n";
import { contact as c, ui } from "@/data/copy";
import { waBriefLinkFromState } from "@/lib/site";
import { Eyebrow } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import ContactWizard, { type Selection } from "@/components/ContactWizard";

// Client boundary for the brief section. Owns the categorical selection so the
// left-column WhatsApp CTA is state-aware (pre-fills whatever the user has
// chosen in the wizard) without breaking the two-column layout or duplicating
// the wizard's content. Per adaptation spec §2 / build brief §2.
export default function ContactBriefSection({ locale }: { locale: Locale }) {
  const [selection, setSelection] = useState<Selection>({});
  const waHref = waBriefLinkFromState(selection);

  return (
    <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
      <Reveal>
        <Eyebrow>{c.brief.eyebrow[locale]}</Eyebrow>
        <h2 className="mt-5 text-[clamp(1.9rem,4vw,2.75rem)]">{c.brief.h2[locale]}</h2>
        <p className="bs-lead mt-6 !max-w-none">{c.brief.lead[locale]}</p>
        <div className="mt-8">
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
            {ui.ctaWhatsApp[locale]}
          </a>
        </div>
        <p className="mt-6 text-sm text-[color:var(--color-muted)]">{ui.speedPromise[locale]}</p>
      </Reveal>
      <Reveal delay={100}>
        <ContactWizard locale={locale} selection={selection} onSelectionChange={setSelection} />
      </Reveal>
    </div>
  );
}
