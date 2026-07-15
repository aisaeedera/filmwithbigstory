#!/usr/bin/env python3
"""
Replace restrictive areaServed arrays with full UAE list.

Target: any line that matches areaServed: [...] within the 17 override pages.
Replaces with the full UAE-wide list (matches Saeed's intent).
Idempotent: if it already lists all 7 emirates, skip.
"""
import re
import sys
from pathlib import Path

PAGES_DIR = Path(
    "/Users/aiagentmacbookprom1max/BIGSTORY/website/clients/filmwithbigstory/react-site/src/app/[locale]/services"
)

TARGETS = [
    "cinematic-wedding",
    "cinematography-dubai",
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

NEW_AREA = (
    '["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Umm Al Quwain", '
    '"Ras Al Khaimah", "Fujairah", "Al Ain"]'
)
NEW_LINE = f"            areaServed: {NEW_AREA},\n"

AREA_PATTERN = re.compile(r"^\s*areaServed:\s*\[[^\]]*\],\s*$", re.MULTILINE)


def patch_file(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    matches = list(AREA_PATTERN.finditer(text))
    if not matches:
        return "skipped (no areaServed)"
    # Replace each match with the full UAE-wide list
    new_text = AREA_PATTERN.sub(NEW_LINE.rstrip("\n"), text)
    new_text = re.sub(
        r"areaServed: " + re.escape(NEW_AREA),
        "areaServed: " + NEW_AREA,
        new_text,
    )
    # Ensure the line ends with a comma and a newline (restore the original shape).
    new_text = re.sub(
        r"(areaServed: " + re.escape(NEW_AREA) + r")(,?)",
        r"\1,",
        new_text,
    )
    # Insert newline after the comma if missing.
    new_text = re.sub(
        r"(areaServed: " + re.escape(NEW_AREA) + r",)(?![\n])",
        r"\1\n",
        new_text,
    )
    path.write_text(new_text, encoding="utf-8")
    return f"patched ({len(matches)} match(es))"


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