# ericschimel.com

Static rebuild of [ericschimel.com](https://www.ericschimel.com/) (originally Squarespace), ready for GitHub Pages.

## Structure

- `index.html` — the one-page site (Intro / Maker / Speaker / Writer / Other Efforts)
- `contact/index.html` — contact page
- `assets/images/` — all images, downloaded from the original site
- `assets/css/style.css`, `assets/js/main.js` — hand-written styles and behavior (slideshows, parallax, dot nav, background video)

No build step — edit the HTML/CSS directly and commit.

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. Repo **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)`.
3. The site goes live at `https://<username>.github.io/<repo>/`.

### Custom domain (www.ericschimel.com)

1. In **Settings → Pages → Custom domain**, enter `www.ericschimel.com` (this creates a `CNAME` file).
2. At your DNS provider, point `www` at `<username>.github.io` with a CNAME record, and (optionally) the apex `ericschimel.com` at GitHub Pages' A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
3. Enable **Enforce HTTPS** once the certificate is issued.

## Contact form

GitHub Pages is static, so the old Squarespace form backend is gone. The form in
`contact/index.html` is wired for [Formspree](https://formspree.io) (free tier is fine):

1. Create a form at formspree.io and copy its ID.
2. In `contact/index.html`, replace `YOUR_FORM_ID` in the form's `action` attribute.

Until then, the form displays but submissions will not be delivered.

## Notes on the migration

- Fonts: the original used Source Sans Pro and PT Serif (plus Typekit's futura-pt for minor UI). This rebuild loads Source Sans 3 and PT Serif from Google Fonts.
- The Maker section's background video is the same YouTube clip, embedded muted/looping.
- Legacy unlinked Squarespace pages (`/test`, `/showold`, `/pitch`, etc.) were intentionally not migrated; only the pages reachable from navigation (home + contact) were rebuilt.
