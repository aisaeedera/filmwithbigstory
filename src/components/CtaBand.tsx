import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { ui } from "@/data/copy";
import { waLink } from "@/lib/site";
import { Section, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";

export default function CtaBand({
  locale,
  heading,
  lead,
  waContext,
  alt = false,
}: {
  locale: Locale;
  heading: string;
  lead?: string;
  waContext?: string;
  alt?: boolean;
}) {
  return (
    <Section alt={alt} className="text-center">
      <Reveal className="mx-auto max-w-3xl">
        <h2 className="text-[clamp(2.25rem,5vw,3.75rem)]">{heading}</h2>
        {lead ? <p className="bs-lead mx-auto mt-6">{lead}</p> : null}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button href={waLink(waContext)} variant="gold" external>
            {t(ui.nav.startYourProject, locale)}
          </Button>
          <Button href={`mailto:${"hi@filmwithbigstory.com"}`} variant="ghost">
            {t(ui.emailUs, locale)}
          </Button>
        </div>
        <p className="mt-6 text-sm text-[color:var(--color-muted)]">{t(ui.speedPromise, locale)}</p>
        <p className="mt-3 text-sm text-[color:var(--color-muted)]">{t(ui.notClearYet, locale)}</p>
      </Reveal>
    </Section>
  );
}
