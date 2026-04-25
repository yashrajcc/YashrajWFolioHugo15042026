# Session log — 25 Apr 2026 (17:20–19:20 IST)

Notes for the repo (not a Hugo page). Summarizes NIU case study content + image bundling work.

## Goal

- Add 5 new NIU narrative images into the Google Maps NIU case study.
- Make image paths robust and case-study-local (page bundle).

## What changed

- Converted the case study from a single file into a **page bundle**:
  - `content/work/google-maps-niu.md` → `content/work/google-maps-niu/index.md`
- Added the 5 PNGs into the bundle:
  - `niuContext.png`
  - `niuJourney.png`
  - `niuFormula.png`
  - `niuExploration.png`
  - `niuFinal.png`
- Embedded the images in the narrative and added meaningful **alt text** + short **captions**.

## Notes

- The initial markdown image embeds compiled to relative `src="niuX.png"` in HTML; depending on how the URL is resolved (trailing slash vs not), relative asset paths can be brittle. This led to a “only first image renders” symptom in some contexts.

