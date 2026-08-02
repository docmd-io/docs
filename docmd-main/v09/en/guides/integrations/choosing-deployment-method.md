---
title: "Choosing Your Deployment Method"
description: "A practical guide to choosing between the docmd GitHub App, GitHub Action, Starter Template, and Deployer Package — with a decision matrix and real-world scenarios."
---

# Choosing Your Deployment Method

docmd offers four ways to get your documentation live. They all produce the same output — a static site deployed to GitHub Pages or a hosting provider of your choice — but they differ in how much control you want and where you are starting from.

## Quick Decision Matrix

| | [GitHub App](../../integrations/github-app.md) | [Starter Template](../../integrations/starter-template.md) | [GitHub Action](../../integrations/github-action.md) | [Deployer Package](../../deployment/deployer-package.md) |
|---|---|---|---|---|
| **Starting point** | Existing repo | New repo | Any | Any |
| **Setup effort** | One click | Two clicks | Write YAML | Run a command |
| **Workflow file** | Auto-generated | Included | You write it | Auto-generated |
| **Customisable** | After generation | From the start | Fully | Fully |
| **Hosting target** | GitHub Pages | GitHub Pages | GitHub Pages | Any provider |
| **Monorepo support** | ✓ Auto-detected | — | Manual `--cwd` | ✓ |
| **Non-GitHub hosting** | ✗ | ✗ | Adaptable | ✓ Docker, Nginx, Vercel, Netlify… |

## Scenario Guide

### "I want docs live in under two minutes with zero setup"

Use the **[GitHub App](../../integrations/github-app.md)**. Install it, select your repository, done. It detects your config, generates the workflow, enables GitHub Pages, and deploys — without you touching a single file.

::: button "Install GitHub App" external:https://github.com/apps/docmd/installations/new icon:github color:#2ea44f

---

### "I'm starting a brand-new documentation site"

Use the **[Starter Template](../../integrations/starter-template.md)**. Click "Use this template" on GitHub, update `docmd.config.json` with your title and URL, enable GitHub Pages once, and push. Everything is pre-wired.

::: button "Use Starter Template" external:https://github.com/docmd-io/docmd-template/generate icon:github

---

### "I have an existing CI/CD pipeline and want to add docs to it"

Use the **[GitHub Action](../../integrations/github-action.md)**. Drop `docmd-io/deploy@v1` into your existing workflow. It composes cleanly with other steps — run tests, build your app, then build docs, all in one job.

---

### "I'm deploying to Vercel, Netlify, Docker, or my own server"

Use the **[Deployer Package](../../deployment/deployer-package.md)**. Run `npx @docmd/core deploy --vercel` (or `--netlify`, `--docker`, `--nginx`) to generate provider-specific config files tailored to your `docmd.config.json`.

---

### "I'm in a monorepo with docs in a subdirectory"

Both the **GitHub App** and the **Deployer Package** handle this automatically. The App detects configs anywhere in the repository tree and injects the correct `--cwd` flag. The Deployer Package reads your config from the current working directory.

If you prefer the GitHub Action, pass `--cwd` manually:

```yaml
- run: npx @docmd/core build --cwd packages/docs
```

---

### "I want to preview docs on every pull request"

Use the **GitHub Action** combined with a PR preview service (e.g. Cloudflare Pages preview deployments or a self-hosted preview environment). See [Previewing Changes](../workflows-teams/previewing-changes.md) for a full walkthrough.

---

## How They Fit Together

These methods are not mutually exclusive. A common progression looks like this:

```
Start with the GitHub App (fastest path to live)
  ↓
Customise the generated workflow file as your needs grow
  ↓
Add the Deployer Package to generate Nginx/Docker configs for self-hosting
  ↓
Integrate the Action into a broader CI/CD pipeline
```

You can also mix them: use the Starter Template for a new project, then add the Deployer Package later to generate a Docker image for your staging environment.

## Comparing Build Triggers

| Method | Triggers on push | Manual trigger | PR preview |
|---|---|---|---|
| GitHub App | ✓ (auto-configured) | ✓ `workflow_dispatch` | Requires extra step |
| Starter Template | ✓ `main` / `master` | ✓ `workflow_dispatch` | Requires extra step |
| GitHub Action | You configure | You configure | You configure |
| Deployer Package | Generates the file; triggers depend on your workflow | — | — |

## Further Reading

- [GitHub Action reference](../../integrations/github-action.md)
- [GitHub App reference](../../integrations/github-app.md)
- [Starter Template reference](../../integrations/starter-template.md)
- [Deployer Package reference](../../deployment/deployer-package.md)
- [GitHub Actions CI/CD guide](./github-actions-cicd.md)
- [Previewing Changes](../workflows-teams/previewing-changes.md)
