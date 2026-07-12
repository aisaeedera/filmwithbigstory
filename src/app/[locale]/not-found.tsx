import Link from "next/link";
import { Section, Eyebrow } from "@/components/primitives";

export default function NotFound() {
  return (
    <Section className="min-h-[60vh]">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)]">This scene didn&apos;t make the cut.</h1>
      <p className="bs-lead mt-6">The page you&apos;re looking for isn&apos;t here. Let&apos;s get you back to the story.</p>
      <div className="mt-9 flex flex-wrap gap-4">
        <Link href="/" className="bs-btn bs-btn-gold">Back home</Link>
        <Link href="/work" className="bs-btn bs-btn-ghost">See our work</Link>
      </div>
    </Section>
  );
}
