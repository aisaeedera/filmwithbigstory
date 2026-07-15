#!/usr/bin/env python3
"""
Inject <UaeTravelSection locale={locale} /> into all 17 override service pages
just before the final CtaBand. Also adds the import.

Idempotent: if UaeTravelSection is already imported + used, skip.
"""
import os
import sys
from pathlib import Path

PAGES_DIR = Path(
    "/Users/aiagentmacbookprom1max/BIGSTORY/website/clients/filmwithbigstory/react-site/src/app/[locale]/services"
)

# 17 override page dirs (not [slug] — that's the dynamic default)
TARGETS = [
    "cinematic-wedding",
    "cinematography-dubai",
    "cinematography-rates-dubai-2026",
    "corporate-video-production-uae",
    "live-streaming",
    "photography-revamp",
    "tvc-production-dubai",
    "video-production",
    "wedding-album-design",
    "wedding-engagement-session",
    "wedding-live-streaming",
    "wedding-photo-video",
    "wedding-photography",
    "wedding-same-day-teaser",
    "wedding-videography",
    "wedding-videography-dubai",
    "weddings",
]

IMPORT_LINE = 'import UaeTravelSection from "@/components/UaeTravelSection";\n'
INJECT_LINE = "      <UaeTravelSection locale={locale} />\n"


def patch_file(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    # Skip if already injected
    if "UaeTravelSection" in text:
        return "skipped (already present)"

    # Add the import after the last existing import line.
    lines = text.splitlines(keepends=True)
    last_import_idx = -1
    for i, line in enumerate(lines):
        if line.startswith("import "):
            last_import_idx = i
    if last_import_idx < 0:
        return "FAILED: no import line found"
    lines.insert(last_import_idx + 1, IMPORT_LINE)
    text_after_import = "".join(lines)

    # Find the final <CtaBand ... /> block and inject the section just before its closing.
    # We anchor on the *last* occurrence of "<CtaBand" so we always land before the final CTA.
    last_cta_idx = text_after_import.rfind("<CtaBand")
    if last_cta_idx < 0:
        return "FAILED: no <CtaBand> anchor"
    # Find the matching "</>" end of fragment. We want to insert just before this CtaBand's
    # final closing tag — the simplest, robust spot is to put the section ABOVE the CtaBand block.
    # Walk back from last_cta_idx to the start of that JSX element's indentation:
    # the CtaBand tag sits at the same indent as other section children inside the fragment.
    # We'll insert the inject line immediately before the line containing "<CtaBand".
    # Find the start-of-line that contains last_cta_idx.
    line_start = text_after_import.rfind("\n", 0, last_cta_idx) + 1
    new_text = text_after_import[:line_start] + INJECT_LINE + text_after_import[line_start:]
    path.write_text(new_text, encoding="utf-8")
    return "patched"


def main() -> int:
    results = []
    for slug in TARGETS:
        p = PAGES_DIR / slug / "page.tsx"
        if not p.exists():
            results.append(f"{slug}: MISSING file")
            continue
        try:
            r = patch_file(p)
            results.append(f"{slug}: {r}")
        except Exception as e:
            results.append(f"{slug}: EXCEPTION {e!r}")
    for line in results:
        print(line)
    return 0


if __name__ == "__main__":
    sys.exit(main())