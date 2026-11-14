---
title: "deed.page Deployment"
description: "Publish a built docmd site to a public deed.page URL with one HTTP request, with no account or CI setup."
---

[deed.page](https://deed.page) is static hosting built for scripts and AI coding agents: one HTTP request uploads a folder and returns a permanent HTTPS URL. No account or Git connection is needed for the first publish, which makes it a quick way to share a preview of your docs or hand a link to someone for review.

## Publish the `site/` Folder

1. Compile your site:
   ```bash
   npx @docmd/core build
   ```
2. Pack the contents of the output directory (from inside it, so `index.html` sits at the root):
   ```bash
   tar -C site -czf /tmp/docs.tar.gz .
   ```
3. Upload the archive and pick a slug:
   ```bash
   curl -T /tmp/docs.tar.gz "https://deed.page/v1/sites?slug=my-docs-preview" \
     -H "Content-Type: application/gzip"
   ```

The JSON response contains the live `url` (for example `https://my-docs-preview.deed.page/`) and a `token`. Save the token: it is shown once, and it is needed to update or delete the site.

## Updating the Site

Rebuild, re-pack, and send the same request with the token to publish a new version at the same URL:

```bash
curl -T /tmp/docs.tar.gz "https://deed.page/v1/sites?slug=my-docs-preview" \
  -H "Content-Type: application/gzip" \
  -H "Authorization: Bearer $DEEDPAGE_TOKEN"
```

## How docmd Output Is Served

* **Clean URLs**: docmd writes each page as `page/index.html`, and a request for `/page` resolves to that file, so no rewrite configuration is needed.
* **404 page**: the `404.html` that docmd compiles into the output root is used for missing paths.
* **Free plan**: up to 25 MB per site; free sites show a small "Published with deed.page" link in the bottom-right corner.
* **Request size**: one request body is capped at 4 MB. Check the size of `docs.tar.gz` before uploading; see the [deed.page docs](https://deed.page/docs) for the multi-step upload used by larger sites.

::: callout tip "Canonical URL" icon:globe
Set the `url` property in `docmd.config.json` to your deed.page address (or your custom domain) before building, so the sitemap and open graph metadata point to the right place.
:::
