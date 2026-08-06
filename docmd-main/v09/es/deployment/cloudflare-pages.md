---
title: "Cloudflare Pages Deployment"
description: "Deploy docmd static documentation sites to Cloudflare Pages edge hosting."
---

[Cloudflare Pages](https://pages.cloudflare.com/) hosts static docmd documentation sites across Cloudflare's global edge network with built-in Git CI/CD integration.

## Dashboard Setup Steps

1. Navigate to **Workers & Pages → Create → Pages** in the Cloudflare Dashboard.
2. Link your Git provider account and select the target repository.
3. Configure build variables:

| Setting Parameter | Configuration Value |
| :--- | :--- |
| **Framework Preset** | `None` |
| **Build Command** | `npx @docmd/core build` |
| **Build Output Directory** | `site` |

4. Save and deploy.

## Custom Domain Configuration

Add custom domains in **Pages → Project → Custom domains**. TLS certificates are provisioned automatically.

Set the `url` property in `docmd.config.json` to match your domain:

```json "docmd.config.json"
{
  "url": "https://docs.example.com"
}
```

::: callout info "Build Execution in CI/CD" icon:info
Running `npx @docmd/core build` in Cloudflare build environments fetches `@docmd/core` on demand. If `@docmd/core` is listed in your `package.json` `devDependencies`, Cloudflare uses the installed version automatically.
:::