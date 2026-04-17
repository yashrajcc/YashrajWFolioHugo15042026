# Session log — 2026-04-17

This is a lightweight, human-readable record of what changed today (repo + hosting decisions), and why.

## Goal

- Keep the portfolio **nimble** and **static**.
- End with **one simple deployment path** and clear rollback.

## Key decisions (final state)

- **Hosting**: GitHub Pages (via GitHub Actions), **no Netlify** required.
- **Custom domain**: `work.yashraj.cc` (DNS hosted at Namecheap).
- **Branching**: `main` as the single source of truth.

## What we changed in the repo

### Removed Netlify

- Deleted `netlify.toml` and removed Netlify-specific guidance from docs/content.

### GitHub Pages deployment added

- Added GitHub Pages workflow:
  - `.github/workflows/pages.yml`
  - Builds with Hugo extended `0.160.1`
  - Uploads Pages artifact + deploys to GitHub Pages
  - Later fixed a deploy failure by making the Pages artifact name **unique per run attempt** (prevents “Multiple artifacts named github-pages”).

### Custom domain file

- Added `static/CNAME` with:
  - `work.yashraj.cc`
  - Ensures the built site publishes a `CNAME` file for GitHub Pages.

### Canonical URL

- Updated `hugo.toml`:
  - `baseURL = 'https://work.yashraj.cc/'`
  - `relativeURLs = false`

### Deployment documentation

- Updated `DEPLOYMENT.md` to reflect **GitHub Pages only**:
  - GitHub Settings → Pages → **Source: GitHub Actions**
  - Namecheap DNS: **CNAME `work` → `yashrajcc.github.io`**
  - Rollback guidance (git revert / redeploy)
  - Notes about private repo limitations and headers on Pages

### Site basics

- Added `.gitignore` suitable for Hugo output/cache.
- Added `layouts/404.html` and corresponding CSS for a minimal 404 page.
- Added `static/favicon.svg` and linked it in `layouts/_default/baseof.html`.
- Minor mobile nav tap-target improvement in `static/css/styles.css`.

## What we did outside the repo (browser / platform steps)

### Git + GitHub

- Initialized the repo and pushed to GitHub.
- Renamed the GitHub repository later; updated local remote URL accordingly.

### GitHub Pages setup

- Enabled GitHub Pages and configured it to deploy via **GitHub Actions**.
- Encountered and fixed deploy error:
  - **Error**: `Multiple artifacts named "github-pages" were unexpectedly found`
  - **Fix**: unique artifact name + explicitly deploy that artifact.

### Domain + DNS (Namecheap → GitHub Pages)

- Configured custom domain `work.yashraj.cc` in GitHub Pages.
- GitHub reported `InvalidCNAMEError` until DNS propagated / record corrected.
- Required DNS record:
  - Namecheap → Advanced DNS → **CNAME**
  - Host: `work`
  - Value: `yashrajcc.github.io`

## Where to look next time (fast)

- **How to deploy / rollback**: `DEPLOYMENT.md`
- **GitHub Actions deploy workflow**: `.github/workflows/pages.yml`
- **Domain file**: `static/CNAME`
- **Site canonical URL**: `hugo.toml` (`baseURL`)

