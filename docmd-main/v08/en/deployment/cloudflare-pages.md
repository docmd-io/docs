---
title: "Cloudflare Pages"
description: "Deploy your docmd documentation to Cloudflare Pages using its global edge network. CI/CD-ready with automatic builds on every push."
---

[Cloudflare Pages](https://pages.cloudflare.com/) hosts your docmd site on Cloudflare's global edge network with zero-configuration CI/CD — connect your repository and every push to your default branch triggers an automatic build and deployment.

## Dashboard Setup

1.  Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages → Create → Pages**.
2.  Connect your git provider (GitHub or GitLab) and select your repository.
3.  Configure the build settings:

    | Setting | Value |
    |---------|-------|
    | Framework preset | `None` |
    | Build command | `npx @docmd/core build` |
    | Build output directory | `site` |

4.  Click **Save and Deploy**.

Cloudflare Pages detects the static output and distributes it across its edge network automatically.

## Custom Domain

Add a custom domain under **Pages → your project → Custom domains**. Cloudflare provisions an SSL certificate automatically.

Set the `url` field in `docmd.config.json` to match your domain so that canonical tags, sitemaps, and the LLMs plugin generate correct absolute URLs.

## CI/CD Notes

Cloudflare Pages runs a fresh CI/CD build on every commit pushed to the connected branch. You do not need a separate GitHub Actions or CI workflow — the build pipeline is managed by Cloudflare.

::: callout info "Why `npx @docmd/core`?"
In CI/CD environments where `docmd` is not globally installed, `npx @docmd/core` fetches and runs the package directly. If your project lists `@docmd/core` as a `devDependency`, running `docmd build` after `npm install` works just as well.
:::

## SPA Routing

`docmd` generates each page as its own `index.html`, so direct URL access works without any rewrite rules. No additional Cloudflare configuration is needed.