# Portfolio (Hugo) — `work.yashraj.cc`

Personal portfolio site built with **Hugo** and deployed with **GitHub Pages** (via **GitHub Actions**).

## What this repo contains

- **Content**: Markdown in [`content/`](content/)
  - Home page content: [`content/_index.md`](content/_index.md)
  - Work section: [`content/work/`](content/work/)
- **Templates**: Hugo layouts in [`layouts/`](layouts/)
- **Static assets**: [`static/`](static/) (CSS, JS, images, favicon)

## How it’s built

- Hugo version (local + CI): **0.160.1 extended**
- Build output: `public/` (not committed)
- Canonical site URL: set in [`hugo.toml`](hugo.toml)

Common files:

- Site config: [`hugo.toml`](hugo.toml)
- Base template (meta + CSS/JS includes): [`layouts/_default/baseof.html`](layouts/_default/baseof.html)
- Global styles: [`static/css/styles.css`](static/css/styles.css)

## Local development

```bash
hugo server --baseURL http://localhost:1313/
```

Open the printed local URL (usually `http://localhost:1313/`).

## Deployment (GitHub Pages only)

This repo deploys using:

- Workflow: [`.github/workflows/pages.yml`](.github/workflows/pages.yml)
- Custom domain file: [`static/CNAME`](static/CNAME)

Deployment + rollback details live in:

- [`DEPLOYMENT.md`](DEPLOYMENT.md)

## Custom domain

The intended domain is **`work.yashraj.cc`**.

- DNS is managed at your registrar (e.g. Namecheap)
- GitHub Pages expects a **CNAME** `work` → `yashrajcc.github.io`
- GitHub will enable **Enforce HTTPS** once DNS is correct

## Content workflow (adding work)

Add a new case study under `content/work/`:

```bash
hugo new work/my-project.md
```

Then fill front matter fields like `summary`, `role`, `outcome`, `tags`, and `image`.

Reference archetype:

- [`archetypes/work.md`](archetypes/work.md)

## Resume

Links point to `/resume.pdf`.

- Put a file at [`static/resume.pdf`](static/resume.pdf) to enable it.

## Session notes / history

We keep lightweight change logs as session files:

- [`SESSION_LOG_2026-04-17.md`](SESSION_LOG_2026-04-17.md)

