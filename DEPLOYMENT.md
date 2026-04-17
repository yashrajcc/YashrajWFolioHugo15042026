# Deploy with GitHub Pages only

This Hugo site builds with **GitHub Actions** and is published to **GitHub Pages**. There is no Netlify (or other host) in the loop. For **private** repositories, GitHub Pages may require a paid plan; **public** repos can use Pages at no extra cost.

## Three separate things (easy to mix up)

| What | Who controls it |
|------|------------------|
| **This Git repo** | Pushing code only updates GitHub. It does **not** delete or change anything inside your **Netlify** account. |
| **Netlify** | A Netlify **site** is a separate object. Removing `netlify.toml` only stops *configuring* Netlify from the repo; Netlify will **keep building** until you **disconnect** the repo there or **delete the site** in the Netlify UI. |
| **GitHub Pages** | Does nothing until **Settings → Pages → Source** is set to **GitHub Actions** and a workflow run **succeeds** (you may need to **approve** the `github-pages` environment the first time). |

## One-time setup in GitHub

1. Push this repo so `.github/workflows/pages.yml` exists on GitHub (default branch should be **`main`** or **`master`**; the workflow listens to both).
2. **Settings → Pages → Build and deployment**
   - **Source:** **GitHub Actions** (not “Deploy from a branch”). Until this is set, the deploy workflow either does not publish or fails with a Pages-related error.
3. **Settings → Actions → General → Workflow permissions**
   - If deploys fail with permission errors, set **Read and write permissions** and save, then **re-run** the workflow.
4. Open **Actions** → latest **“Deploy site to GitHub Pages”** run:
   - If it says **“Waiting for approval”** for environment `github-pages`, open the run → **Review deployments** → **Approve**.
   - If it failed, open the failed step and read the log (common: Pages source not set to GitHub Actions yet).

The live URL appears on the successful run and under **Settings → Pages**.

## Stop Netlify from deploying this repo

In **Netlify** (browser): open the site that is linked to this GitHub repo → **Site configuration** → **Build & deploy** → **Continuous deployment** → **Manage repository** / **Unlink** (wording varies), **or** **General** → **Delete project** if you want the site gone entirely. None of that can be done from this repository alone.

## Custom domain (`work.yashraj.cc`)

1. In the repo: **Settings → Pages → Custom domain** → enter `work.yashraj.cc` and save (GitHub may ask to create a DNS check; the repo already includes [`static/CNAME`](static/CNAME) so Hugo publishes the correct hostname file).
2. In **Namecheap → Advanced DNS** for `yashraj.cc`:
   - **Type:** `CNAME Record`
   - **Host:** `work`
   - **Value:** `YOUR_GITHUB_USERNAME.github.io` (replace with your GitHub username or org name that owns the repo)
   - **TTL:** Automatic (or 30 min)

3. Wait for DNS and for GitHub to show the certificate as ready (can take up to an hour).

Your canonical URL in [hugo.toml](hugo.toml) is `https://work.yashraj.cc/`. The workflow passes `--baseURL` from GitHub so previews on `https://<user>.github.io/<repo>/` stay correct until the custom domain is active.

## Résumé PDF

Put your file at [static/resume.pdf](static/resume.pdf). Nav and the about card link to `/resume.pdf`.

## Local development

```bash
hugo server --baseURL http://localhost:1313/
```

## Rollback

- **Git:** Revert the bad commit on `main` and push; the next workflow run redeploys the previous version.
- **GitHub:** **Actions → failed run → Re-run** only helps the same commit; for “go back in time” use `git revert` or reset + force-push (only if you are comfortable with history rewrites).

## Note on security headers

GitHub Pages does not let you set custom response headers the way some other hosts do. If you need strict security headers everywhere, you would add a small proxy (e.g. Cloudflare in front of Pages) later—that is optional.
