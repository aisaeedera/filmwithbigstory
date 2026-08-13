/**
 * InvitationPoster — original, code-generated vector artwork for a demo record.
 *
 * Eight distinct compositions, one per seed style family, drawn entirely in SVG
 * from the record's palette. No photos, no imported artwork, no competitor
 * templates — every ornament here is original geometry. This is the "original
 * CSS/SVG/vector-generated demo visual" the build brief mandates.
 *
 * Pure/deterministic: no hooks, no randomness — safe to render on the server and
 * inside the client gallery alike. The visible نموذج badge is rendered by
 * InvitationCard as HTML; a faint نموذج watermark is also woven into the artwork
 * so a downloaded/screenshotted frame still reads as a sample.
 */

import type { Locale } from "@/lib/i18n";
import { styleFamilies, type InvitationDemo } from "@/data/invitation-designs";

const W = 320;
const H = 420;

function Ornament({ style, c }: { style: InvitationDemo["styleKey"]; c: ReturnType<typeof palette> }) {
  switch (style) {
    case "Majlis Pearl":
      // Strands of pearls draping from the top, a central pearl drop.
      return (
        <g fill="none" stroke={c.accent} strokeWidth={1.2}>
          {[70, 160, 250].map((x, i) => (
            <path key={i} d={`M${x} 44 q0 26 ${i === 1 ? 0 : 0} 40`} strokeWidth={0.8} opacity={0.5} />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <circle key={i} cx={70 + i * 22.5} cy={44} r={3} fill={c.accent} stroke="none" opacity={0.9} />
          ))}
          <circle cx={160} cy={92} r={6} fill={c.soft} stroke={c.accent} strokeWidth={1} />
          <circle cx={160} cy={92} r={2} fill={c.accent} stroke="none" />
        </g>
      );
    case "Desert Moon":
      // Crescent moon over layered dunes and a scatter of stars.
      return (
        <g>
          <path d={`M210 78 a30 30 0 1 1 -0.1 -0.1 a24 24 0 1 0 0.1 0.1 z`} fill={c.accent} opacity={0.95} />
          {[[70, 60], [110, 96], [250, 120], [60, 130]].map(([x, y], i) => (
            <g key={i} fill={c.soft}>
              <path d={`M${x} ${y - 4} l1.2 2.8 3 0.4 -2.2 2.1 0.6 3 -2.6 -1.5 -2.6 1.5 0.6 -3 -2.2 -2.1 3 -0.4 z`} />
            </g>
          ))}
          <path d={`M0 360 q80 -34 160 -6 t160 -6 v72 H0 z`} fill={c.soft} opacity={0.22} />
          <path d={`M0 384 q80 -26 160 -2 t160 -10 v64 H0 z`} fill={c.accent} opacity={0.16} />
        </g>
      );
    case "Emirati Geometry":
      // Sadu-inspired lattice band + a central diamond medallion.
      return (
        <g stroke={c.accent} strokeWidth={1.1} fill="none">
          {Array.from({ length: 8 }).map((_, i) => (
            <path key={i} d={`M${20 + i * 40} 40 l20 16 -20 16 -20 -16 z`} opacity={0.55} />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <path key={`b${i}`} d={`M${20 + i * 40} 348 l20 16 -20 16 -20 -16 z`} opacity={0.55} />
          ))}
          <path d={`M160 150 l34 60 -34 60 -34 -60 z`} strokeWidth={1.4} />
          <path d={`M160 176 l17 34 -17 34 -17 -34 z`} fill={c.accent} opacity={0.18} stroke="none" />
        </g>
      );
    case "Night Garden":
      // Botanical vines climbing the corners with small florets.
      return (
        <g fill="none" stroke={c.accent} strokeWidth={1.2}>
          <path d="M28 40 q40 30 34 90 q-4 40 24 70" opacity={0.7} />
          <path d="M292 40 q-40 30 -34 90 q4 40 -24 70" opacity={0.7} />
          {[[40, 78], [58, 120], [86, 168], [280, 78], [262, 120], [234, 168]].map(([x, y], i) => (
            <g key={i}>
              <path d={`M${x} ${y} q10 -8 18 0 q-8 8 -18 0 z`} fill={c.soft} stroke="none" opacity={0.8} />
              <circle cx={x} cy={y} r={2} fill={c.accent} stroke="none" />
            </g>
          ))}
        </g>
      );
    case "Golden Palms":
      // Two palm fronds arching up from the lower corners.
      return (
        <g fill="none" stroke={c.accent} strokeWidth={1.3}>
          {[-1, 1].map((s) => (
            <g key={s}>
              <path d={`M160 372 q${s * 70} -40 ${s * 96} -150`} />
              {Array.from({ length: 9 }).map((_, i) => {
                const t = i / 9;
                const bx = 160 + s * 96 * t * (1.05 - 0.3 * t);
                const by = 372 - 150 * t;
                return (
                  <path
                    key={i}
                    d={`M${bx} ${by} q${s * 18} -6 ${s * 30} -16`}
                    strokeWidth={0.9}
                    opacity={0.75}
                  />
                );
              })}
            </g>
          ))}
          <circle cx={160} cy={92} r={5} fill={c.accent} stroke="none" />
        </g>
      );
    case "Emerald Arch":
      // A pointed mihrab arch framing the composition.
      return (
        <g fill="none" stroke={c.accent} strokeWidth={1.4}>
          <path d="M64 372 V150 q0 -66 96 -66 q96 0 96 66 V372" opacity={0.9} />
          <path d="M78 372 V152 q0 -54 82 -54 q82 0 82 54 V372" strokeWidth={0.8} opacity={0.5} />
          <path d="M160 84 v-16 m-10 8 h20" strokeWidth={1.1} />
        </g>
      );
    case "Burgundy Script":
      // Calligraphic swash underline + ornate corner flourishes.
      return (
        <g fill="none" stroke={c.accent} strokeWidth={1.3}>
          <path d="M70 250 q40 24 90 24 q50 0 90 -24" />
          <path d="M96 262 q64 22 128 0" strokeWidth={0.8} opacity={0.55} />
          <circle cx={160} cy={276} r={2.4} fill={c.accent} stroke="none" />
          {[[36, 48, 1], [284, 48, -1], [36, 372, 1], [284, 372, -1]].map(([x, y, s], i) => (
            <path key={i} d={`M${x} ${y} q${(s as number) * 26} 2 ${(s as number) * 30} 26`} strokeWidth={1} opacity={0.7} />
          ))}
        </g>
      );
    case "Pearl Sky":
      // Minimal: a thin ring "sun" and soft cloud arcs.
      return (
        <g fill="none" stroke={c.accent} strokeWidth={1.2}>
          <circle cx={160} cy={96} r={26} opacity={0.85} />
          <circle cx={160} cy={96} r={17} strokeWidth={0.7} opacity={0.5} />
          <path d="M40 330 q40 -18 80 0 q40 -18 80 0 q40 -18 80 0" opacity={0.4} />
          <path d="M40 352 q40 -14 80 0 q40 -14 80 0 q40 -14 80 0" opacity={0.28} />
        </g>
      );
  }
}

function palette(demo: InvitationDemo) {
  const f = styleFamilies[demo.styleKey];
  return { bg: f.bg, bg2: f.bg2, ink: f.ink, accent: f.accent, soft: f.soft, light: f.light };
}

export default function InvitationPoster({
  demo,
  locale,
  className,
}: {
  demo: InvitationDemo;
  locale: Locale;
  className?: string;
}) {
  const c = palette(demo);
  const alt = locale === "ar" ? demo.altAr : demo.altEn;
  const gid = `bg-${demo.id}`;
  const occasion = demo.categoryNameAr; // Arabic-first ground

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label={alt}
      preserveAspectRatio="xMidYMid slice"
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.bg} />
          <stop offset="1" stopColor={c.bg2} />
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#${gid})`} />
      {/* Double keyline frame */}
      <rect x={14} y={14} width={W - 28} height={H - 28} fill="none" stroke={c.accent} strokeWidth={1.2} opacity={0.9} />
      <rect x={20} y={20} width={W - 40} height={H - 40} fill="none" stroke={c.accent} strokeWidth={0.6} opacity={0.5} />

      <Ornament style={demo.styleKey} c={c} />

      {/* Occasion eyebrow (Arabic) */}
      <text
        x={W / 2}
        y={132}
        textAnchor="middle"
        fill={c.accent}
        fontSize={13}
        letterSpacing="1"
        style={{ fontFamily: "var(--font-arabic), sans-serif", direction: "rtl" }}
      >
        {occasion}
      </text>

      {/* Names (Arabic display) */}
      <text
        x={W / 2}
        y={210}
        textAnchor="middle"
        fill={c.ink}
        fontSize={34}
        style={{ fontFamily: "var(--font-arabic-display), serif", direction: "rtl" }}
      >
        {demo.demoNameAr}
      </text>

      {/* Divider dot row */}
      <g fill={c.accent}>
        {[-1, 0, 1].map((k) => (
          <circle key={k} cx={W / 2 + k * 14} cy={234} r={k === 0 ? 2.6 : 1.6} opacity={k === 0 ? 1 : 0.7} />
        ))}
      </g>

      {/* Style family name (Arabic) */}
      <text
        x={W / 2}
        y={330}
        textAnchor="middle"
        fill={c.ink}
        fontSize={12}
        opacity={0.72}
        style={{ fontFamily: "var(--font-arabic), sans-serif", direction: "rtl" }}
      >
        {demo.styleAr}
      </text>

      {/* Woven-in sample watermark (redundant safety label) */}
      <text
        x={W / 2}
        y={H - 30}
        textAnchor="middle"
        fill={c.accent}
        fontSize={11}
        opacity={0.55}
        letterSpacing="2"
        style={{ fontFamily: "var(--font-arabic), sans-serif", direction: "rtl" }}
      >
        نموذج · Big Story
      </text>
    </svg>
  );
}
