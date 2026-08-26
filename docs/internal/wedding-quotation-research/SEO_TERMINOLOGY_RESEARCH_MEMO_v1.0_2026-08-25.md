# SEO Terminology Research Memo v1.0

**Project:** Film with Big Story wedding quotation funnel  
**Market:** United Arab Emirates, with GCC terminology checks  
**Date:** 2026-08-25  
**Status:** Research input for the versioned revision brief; no implementation is authorized by this memo.

## Decision summary

1. Use **Katb Kitab / Aqd Al Qiran** as the English customer-facing lane label. Lead with `Katb Kitab` because it has the clearest measurable UAE demand; retain `Aqd Al Qiran` as a culturally familiar secondary synonym.[1]
2. Use **تصوير كتب الكتاب وعقد القران** as the Arabic service label. `كتب الكتاب` is the strongest Arabic term in the measured set.[1]
3. For search acquisition, pair the ceremony term with the larger service cluster: **wedding photographer Dubai**, **wedding photography Dubai**, **wedding videographer Dubai**, and **wedding videography Dubai**.[1]
4. Include **Nikah / Nikkah** only as supporting copy or an FAQ synonym. Its volume is higher, but broad queries have mixed legal, religious, venue, dress, and service intent.[1][2]
5. Do not create an `Aqd Al Qiran`-only SEO page. Keep the variants together on one service-intent page or section to avoid thin content and keyword cannibalization.

## Method and limits

- DataForSEO Google Ads live search-volume snapshots were run for UAE location code `2784`, separately in English and Arabic, on 2026-08-25. The endpoint supplies search volume, monthly history, competition, and related fields.[1]
- Raw evidence is versioned locally in `docs/internal/wedding-quotation-research/dataforseo_uae_wedding_keywords_2026-08-25.json` (65 English terms; 35 Arabic terms).
- Google Suggest was queried with `gl=ae` for 12 English/Arabic seed phrases. Suggestion presence/order is a ranking signal, not a volume estimate.[2] Raw evidence: `docs/internal/wedding-quotation-research/google_suggest_uae_wedding_terms_2026-08-25.json`.
- Google Ads can combine close spellings. Identical volumes for close variants must **not** be added together. A blank/null result (rendered `—` below) means no reportable volume in this snapshot, not proof that nobody uses the phrase.[1]

## Terminology variants and relative UAE interest

### A. Katb Kitab family — strongest ceremony-specific cluster

| Variant | UAE search volume | Signal / use |
|---|---:|---|
| `كتب الكتاب` | 140 | Highest ceremony-specific Arabic variant tested; primary Arabic term |
| `كتب كتاب` | 90 | Strong Arabic no-article variant; secondary Arabic copy |
| `Katb Kitab` | 30 | Highest English transliteration tested; primary English ceremony term |
| `Katb Al Kitab`, `Katb Al-Kitab` | 10 each | Valid secondary variants; both appear in UAE-localized autocomplete |
| `Katb el Kitab`, `Katb el-Kitab` | 10 each | Common regional transliteration; autocomplete returns both forms |
| `Katb Ketab`, `Katb el Ketab` | 10 each | Search-used spelling variants; suitable for FAQ/body coverage |
| `Kateb Kitab`, `Kateb Ketab` | 10 each | Lower-priority variants; body/FAQ only |
| `Katb Al Kitaab`, `Katb Al-Kitaab` | 10 each | Long-vowel transliteration; body/FAQ only |

Google Suggest reinforces this family: `katb` returns `katb kitab` first, then `katb ketab` and `katb al kitab`; `katb al` expands to `katb al kitab`, `meaning`, `ceremony`, `dress`, and `invitation`; `katb el` expands to both `katb el kitab` and `katb el ketab`.[2]

The spelling diversity is also visible in UAE/GCC editorial usage: a UAE marriage-services article uses `Katb Al-kitaab`, Grazia Middle East uses `katb al kitab` for a Dubai event, and Arabia Weddings uses `Katb Kitab` for a UAE royal marriage ceremony.[3][4][5]

### B. Aqd Al Qiran family — recognizable, but weak measurable search demand

| Variant | UAE search volume | Signal / use |
|---|---:|---|
| `Aqd Al Nikah` | 10 | The only measured English `Aqd` variant with reportable volume |
| `Aqd Al Qiran`, `Aqd Al-Qiran`, `Aqd Qiran` | — | Retain as a cultural synonym; do not lead SEO with it |
| `Akd Al Qiran`, `Akd Qiran` | — | Possible transliterations; no reportable demand |
| `عقد القران`, `عقد قران`, `عقد القرآن` | — | Use `عقد القران` only as secondary Arabic wording in this service context |
| `Aqd Al Qiran photography Dubai`, `Aqd Qiran photography Dubai` | — | Useful descriptive long-tail copy, but not a standalone demand driver |

Autocomplete provides an additional caution: `aqd al` returns `aqd al nikah`, while `aqd qiran` drifts to `aqd quran` / `aqd al quran`. That spelling ambiguity makes `Aqd Al Qiran` unsuitable as the sole title or URL keyword.[2]

### C. Nikah / Nikkah umbrella — high volume, mixed intent

| Variant | UAE search volume | Recommended role |
|---|---:|---|
| `Nikah`, `Nikkah` | 480 each | Supporting synonym only; close-variant volumes are not additive |
| `Nikah ceremony`, `Nikkah ceremony` | 210 each | FAQ/body synonym; mixed informational intent |
| `Nikah Dubai` | 70 | Secondary location phrase |
| `Nikkah Dubai` | 10 | Secondary misspelling |
| `عقد نكاح` | 40 | Useful Arabic FAQ/body synonym |
| `Nikah/Nikkah photographer/photography Dubai` | — | Descriptive long-tail, not a measurable primary keyword |

## Recommended website keyword map

### Customer-facing quotation lane

- **English title:** `Katb Kitab / Aqd Al Qiran`
- **English subtitle:** `Photography, videography and live coverage for the ceremony`
- **Arabic title:** `تصوير كتب الكتاب وعقد القران`
- **Arabic subtitle:** `تغطية تصوير فوتوغرافي وفيديو وبث مباشر للمناسبة`

### Primary SEO cluster

1. `wedding photographer dubai` — 210[1]
2. `wedding photography dubai` — 110[1]
3. `wedding videographer dubai` — 50[1]
4. `wedding videography dubai` — 50[1]
5. `katb kitab` — 30[1]
6. `كتب الكتاب` — 140[1]
7. `كتب كتاب` — 90[1]

Recommended section/H1 wording if a dedicated service page is later approved:

- **EN:** `Katb Kitab and Aqd Al Qiran Photography & Videography in Dubai`
- **AR:** `تصوير كتب الكتاب وعقد القران في دبي`

The exact long-tail combinations (`katb kitab photography dubai`, `katb kitab photographer dubai`, `katb kitab videography dubai`) returned no reportable volume.[1] They are still the correct service-intent phrasing, while the broader wedding-service terms should carry acquisition demand.

### Secondary keyword cluster

- `nikah ceremony` / `nikkah ceremony` — 210 each; FAQ/body only[1]
- `nikah dubai` — 70[1]
- `عقد نكاح` — 40[1]
- `best wedding photographers in dubai` — 20[1]
- `wedding photography abu dhabi` — 20[1]
- `female wedding photographer dubai` — 10, high paid-search competition index (`93`)[1]
- `destination wedding photographer dubai` — 10
- `indian wedding photographer dubai` — 10
- `luxury wedding photographer dubai` — 10
- `pre wedding photographers in dubai` — 10
- `wedding cinematography dubai` — 10
- `wedding photography packages dubai` — 10, high paid-search competition index (`100`)
- Arabic service signal: `تصوير اعراس دبي` — 10; `استديو تصوير اعراس في دبي` — 10

## Related UAE wedding-service opportunities

Among the tested commercial terms, the strongest measurable acquisition targets are `wedding photographer dubai` (210), `wedding photography dubai` (110), and the two videography variants (50 each).[1] Ceremony-only phrases are smaller, so the page should combine cultural specificity with those service/location terms rather than compete only on the ceremony name.

Useful supporting content sections:

1. Katb Kitab photo and video coverage in Dubai
2. Female wedding photographer / women-only crew availability, only if operationally true
3. Wedding photography packages in Dubai
4. Nikah ceremony photography and videography FAQ
5. Abu Dhabi and UAE coverage, only where service delivery is confirmed

## Cannibalization and implementation guardrail

The existing invitation page already targets invitation intent at `/services/katb-kitab-invitations`, with metadata in `src/data/invitations.ts:522-579`. Keep `invitation`, `digital invitation`, `RSVP`, and invitation-design terms on that page. Keep `photography`, `videography`, `coverage`, `crew`, `live stream`, and package terms in the wedding quotation/service cluster.

If a standalone coverage page is approved later, use a clearly distinct route such as `/services/katb-kitab-photography-videography-dubai`; otherwise, optimize the existing wedding quotation route/section. **No code, route, metadata, or copy change should proceed until Saeed approves the consolidated versioned revision brief.**

## Sources

[1] https://docs.dataforseo.com/v3/keywords_data-google_ads-search_volume-live — DataForSEO Google Ads Search Volume API
[2] https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=ae&q=katb — Google Suggest UAE query: katb
[3] https://dubaicourtmarriage.com/blog/islamic-marital-practices-uae — Islamic marital practices in the UAE
[4] https://graziamagazine.com/me/articles/asallah-kamel-wedding — Asallah Kamel Dubai wedding
[5] https://arabiaweddings.com/tips/sheikha-mahra-and-sheikh-manas-royal-wedding — Sheikha Mahra and Sheikh Mana royal wedding
