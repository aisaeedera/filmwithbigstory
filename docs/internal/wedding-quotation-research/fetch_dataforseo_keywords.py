#!/usr/bin/env python3
"""Fetch UAE Google Ads keyword volumes from DataForSEO without exposing credentials."""

from __future__ import annotations

import base64
import json
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

BIGSTORY_SCRIPTS = Path("/Users/aiagentmacbookprom1max/Bigstory/scripts")
sys.path.insert(0, str(BIGSTORY_SCRIPTS))
from bigstory_config import env  # noqa: E402

OUT = Path(__file__).with_name("dataforseo_uae_wedding_keywords_2026-08-25.json")
ENDPOINT = "https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live"

ENGLISH_KEYWORDS = [
    "aqd al qiran",
    "aqd al-qiran",
    "aqd qiran",
    "akd al qiran",
    "akd qiran",
    "aqd al nikah",
    "aqd al nikkah",
    "katb al kitab",
    "katb al-kitab",
    "katb kitab",
    "katb el kitab",
    "katb el-kitab",
    "katb ketab",
    "katb el ketab",
    "kateb kitab",
    "kateb ketab",
    "katb al kitaab",
    "katb al-kitaab",
    "katb kitab photography dubai",
    "katb kitab photographer dubai",
    "katb kitab videography dubai",
    "katb kitab wedding photography dubai",
    "aqd qiran photography dubai",
    "aqd al qiran photography dubai",
    "nikah",
    "nikkah",
    "nikah ceremony",
    "nikkah ceremony",
    "nikah dubai",
    "nikkah dubai",
    "nikah photographer dubai",
    "nikkah photographer dubai",
    "nikah photography dubai",
    "nikkah photography dubai",
    "malka wedding",
    "milka wedding",
    "wedding photographer dubai",
    "wedding photographer dubai price",
    "best wedding photographers in dubai",
    "indian wedding photographer dubai",
    "pre wedding photographers in dubai",
    "pre wedding photography in dubai",
    "wedding photography dubai",
    "wedding videographer dubai",
    "wedding videography dubai",
    "wedding video dubai",
    "wedding photographer and videographer dubai",
    "wedding photography and videography dubai",
    "wedding photography and videography in dubai",
    "wedding photography packages dubai",
    "wedding videography packages dubai",
    "wedding cinematography dubai",
    "luxury wedding photographer dubai",
    "destination wedding photographer dubai",
    "female wedding photographer dubai",
    "female photographer dubai wedding",
    "ladies wedding photography dubai",
    "emirati wedding photographer",
    "arab wedding photographer dubai",
    "muslim wedding photographer dubai",
    "wedding photographer uae",
    "wedding videographer uae",
    "wedding photography abu dhabi",
    "wedding videography abu dhabi",
    "wedding live streaming dubai",
]

ARABIC_KEYWORDS = [
    "عقد القران",
    "عقد القرآن",
    "عقد قران",
    "حفل عقد قران",
    "حفل عقد القران",
    "تصوير عقد قران",
    "تصوير عقد القران",
    "مصور عقد قران",
    "مصورة عقد قران",
    "فيديو عقد قران",
    "توثيق عقد قران",
    "كتب الكتاب",
    "كتب كتاب",
    "تصوير كتب الكتاب",
    "تصوير كتب كتاب",
    "عقد نكاح",
    "حفل زفاف",
    "تصوير زفاف دبي",
    "تصوير اعراس دبي",
    "تصوير أعراس دبي",
    "مصور اعراس دبي",
    "مصور أعراس دبي",
    "مصورة اعراس دبي",
    "مصورات اعراس دبي",
    "مصور افراح دبي",
    "مصور أفراح دبي",
    "تصوير حفلات زفاف دبي",
    "تصوير حفلات اعراس دبي",
    "استديو تصوير اعراس في دبي",
    "مصور زفاف دبي",
    "مصورة زفاف دبي",
    "شركة تصوير زفاف دبي",
    "تصوير افراح دبي",
    "تصوير أفراح دبي",
    "باقات تصوير زفاف",
]


def credentials() -> tuple[str, str]:
    username = env("DATAFORSEO_USERNAME", "") or env("DATAFORSEO_LOGIN", "")
    password = env("DATAFORSEO_PASSWORD", "")
    if not username or not password:
        raise RuntimeError("DataForSEO credentials are not configured in Big Story shared config")
    return username, password


def fetch(keywords: list[str], language_code: str) -> dict:
    username, password = credentials()
    token = base64.b64encode(f"{username}:{password}".encode()).decode()
    payload = [
        {
            "keywords": keywords,
            "location_code": 2784,
            "language_code": language_code,
        }
    ]
    request = urllib.request.Request(
        ENDPOINT,
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={
            "Authorization": f"Basic {token}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=90) as response:
            return json.load(response)
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"DataForSEO HTTP {exc.code}: {detail[:500]}") from exc


def main() -> int:
    output = {
        "retrieved_at": datetime.now(timezone.utc).isoformat(),
        "source": ENDPOINT,
        "location_code": 2784,
        "batches": {
            "en": fetch(ENGLISH_KEYWORDS, "en"),
            "ar": fetch(ARABIC_KEYWORDS, "ar"),
        },
    }
    OUT.write_text(json.dumps(output, ensure_ascii=False, indent=2), encoding="utf-8")
    summary = {}
    for language, response in output["batches"].items():
        tasks = response.get("tasks", [])
        task = tasks[0] if tasks else {}
        results = task.get("result") or []
        summary[language] = {
            "status_code": task.get("status_code"),
            "status_message": task.get("status_message"),
            "cost": task.get("cost"),
            "result_count": len(results),
        }
    print(json.dumps({"output": str(OUT), "summary": summary}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
