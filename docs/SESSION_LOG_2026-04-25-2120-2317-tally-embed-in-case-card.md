# Session log — 25 Apr 2026 (21:20–23:17 IST)

Notes for the repo (not a Hugo page). Summarizes adding the NDA access Tally embed across case-study footer cards.

## Goal

- Replace the “email me” CTA in the case-study end card with an **inline Tally form**.
- Make the embed safe to include on multiple pages (no duplicate script injection).

## What changed

- Updated `layouts/shortcodes/case-contact-card.html` to embed:
  - `https://tally.so/embed/ja07Q9?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`
- Added a script loader that:
  - Loads `https://tally.so/widgets/embed.js` only once.
  - Calls `Tally.loadEmbeds()` when available.
  - Falls back to setting `iframe.src` from `data-tally-src`.
- Added a `<noscript>` fallback with an email option (when available).

## Verification

- `hugo -D` builds cleanly.
- Built `public/work/*/index.html` pages that use `{{< case-contact-card >}}` contain the Tally embed URL.

