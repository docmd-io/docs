---
title: "GitHub Pages"
description: "Deploy your docmd documentation to GitHub Pages automatically using a generated GitHub Actions CI/CD workflow."
---

`npx @docmd/core deploy --github-pages` generates a ready-to-use GitHub Actions CI/CD workflow file at `.github/workflows/deploy.yml`. Push it to your repository. GitHub builds and deploys your site automatically on every push to `main`.

```bash
npx @docmd/core deploy --github-pages
```

This creates `.github/workflows/deploy.yml` personalised to your project. No manual editing is required.

## What Gets Generated

The workflow:

1. Checks out your repository.
2. Installs Node.js and your project dependencies.
3. Installs the exact version of `@docmd/core` used to scaffold the file.
4. Runs `npx @docmd/core build`.
5. Uploads the output directory as a GitHub Pages artefact.
6. Deploys it to GitHub Pages.

## Enabling GitHub Pages

Before pushing the workflow, enable GitHub Pages in your repository:

1. Go to **Settings → Pages**.
2. Set the **Source** to **GitHub Actions**.

Once enabled, every push to `main` triggers a deployment.

## Customising the Workflow

The generated file is plain YAML. Edit it freely. Common changes include:

- **Branch**: Change `branches: [main]` to your default branch name.
- **Node version**: Update `node-version: "20"` to match your project.
- **Build command**: The workflow uses `npx @docmd/core build` by default. If you use a custom config file, re-run `npx @docmd/core deploy --github-pages --config your-config.json` to regenerate.

## Custom Domain

After deploying, you can add a custom domain in **Settings → Pages → Custom domain**. Set the `url` field in your `docmd.config.json` to match, then redeploy so sitemaps and canonical tags remain correct.