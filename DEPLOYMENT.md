# Deployment and rollback

This site is a Hugo project configured for Netlify ([netlify.toml](netlify.toml)).

## First-time setup

1. **Git remote** — Create an empty repository on GitHub (or similar), then:
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. **Netlify** — New site from Git → pick this repo → leave build settings as in `netlify.toml` (Hugo version is pinned via `HUGO_VERSION`).
3. **Custom domain** — In Netlify: Domain settings → add `yashraj.cc` (or `www`) → follow DNS instructions at your registrar. Until DNS is correct, the `*.netlify.app` URL still serves the latest deploy.
4. **Résumé file** — Put your PDF at [static/resume.pdf](static/resume.pdf). Links use `/resume.pdf` until the file exists (you will get a 404 for that path until then).

## Local development

Production [hugo.toml](hugo.toml) uses `https://yashraj.cc/` as `baseURL`. For local browsing with correct absolute URLs:

```bash
hugo server --baseURL http://localhost:1313/
```

## Rollback

- **Netlify** — Deploys → select a previous successful deploy → **Publish deploy**. Production switches without a git change.
- **Git** — If a bad change is already on `main`, revert the merge or commit and push; Netlify will build the previous code state.

## Optional hardening

On your Git host, enable branch protection on `main` (e.g. block force-push) if you want a cheap safety net against accidental history rewrites.
