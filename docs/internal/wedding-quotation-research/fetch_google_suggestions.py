#!/usr/bin/env python3
"""Capture UAE-localized Google autocomplete suggestions for wedding terminology."""

from __future__ import annotations

import json
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

OUT = Path(__file__).with_name("google_suggest_uae_wedding_terms_2026-08-25.json")
ENDPOINT = "https://suggestqueries.google.com/complete/search"
QUERIES = [
    ("aqd al", "en"),
    ("aqd qiran", "en"),
    ("katb", "en"),
    ("katb al", "en"),
    ("katb el", "en"),
    ("nikah dubai", "en"),
    ("nikkah dubai", "en"),
    ("wedding photographer dubai", "en"),
    ("wedding videographer dubai", "en"),
    ("عقد القران", "ar"),
    ("كتب الكتاب", "ar"),
    ("تصوير اعراس دبي", "ar"),
]


def fetch(query: str, language: str) -> list[str]:
    params = urllib.parse.urlencode(
        {"client": "firefox", "hl": language, "gl": "ae", "q": query}
    )
    request = urllib.request.Request(
        f"{ENDPOINT}?{params}",
        headers={"User-Agent": "Mozilla/5.0"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        payload = json.load(response)
    return payload[1] if len(payload) > 1 else []


def main() -> int:
    output = {
        "retrieved_at": datetime.now(timezone.utc).isoformat(),
        "source": ENDPOINT,
        "country": "ae",
        "queries": [
            {"query": query, "language": language, "suggestions": fetch(query, language)}
            for query, language in QUERIES
        ],
    }
    OUT.write_text(json.dumps(output, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"output": str(OUT), "query_count": len(QUERIES)}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
