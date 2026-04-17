# Deploy with GitHub Pages only

This Hugo site builds with **GitHub Actions** and is published to **GitHub Pages**. There is no Netlify (or other host) in the loop. For **private** repositories, GitHub Pages may require a paid plan; **public** repos can use Pages at no extra cost.

## One-time setup in GitHub

1. Push this repo to GitHub (if it is not already remote). If an old **Netlify** site is still connected to this repo, disconnect or delete it so you are not deploying to two hosts by accident.
2. **Settings → Pages**
   - **Source:** GitHub Actions (not “Deploy from a branch”).
3. **Settings → Actions → General → Workflow permissions**
   - Choose **Read and write permissions** (needed for Pages deployment from Actions the first time you may also need to allow “GitHub Actions” to create the `github-pages` environment—approve any prompt after the first workflow run).

After you push to `main`, open the **Actions** tab and confirm the “Deploy site to GitHub Pages” workflow succeeds. The site URL is shown on the workflow run and under **Settings → Pages**.

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
