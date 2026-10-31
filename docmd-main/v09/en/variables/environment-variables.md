---
title: Environment Variables Reference
description: How to pass CI/CD and system environment variables into docmd documentation and configuration using env.* and DOCMD_VAR_* patterns.
---

# Environment Variables Reference

docmd allows you to inject system environment variables directly into your documentation, enabling seamless integration with CI/CD pipelines such as GitHub Actions, GitLab CI, Vercel, or Netlify.

## Accessing Environment Variables via `env.*`

Any system environment variable available during the build process can be accessed using the `env.` prefix:

```markdown
Deployed on infrastructure environment: **\{{ env.ENVIRONMENT || 'development' }}**.
Build ID: `\{{ env.GITHUB_RUN_ID || 'local' }}`
Branch: `\{{ env.GITHUB_REF_NAME || 'main' }}`
```

### Fallback Values

Environment variables may not always be present when developing locally. Always specify a sensible fallback with `||`:

```markdown
Connect to our staging gateway:
`\{{ env.STAGING_GATEWAY_URL || "https://sandbox.gateway.io" }}`
```

## Zero-Prefix Promotion via `DOCMD_VAR_*`

To avoid prefixing variables with `env.` in markdown documents, any environment variable prefixed with `DOCMD_VAR_` is automatically promoted to top-level:

```bash
# In your CI/CD pipeline or .env:
export DOCMD_VAR_API_HOST="https://api.production.internal"
export DOCMD_VAR_RELEASE_CHANNEL="beta"
```

In your markdown documents:

```markdown
Our server endpoint is `\{{ API_HOST }}`.
Current release channel: **\{{ RELEASE_CHANNEL }}**.
```

::: callout info "Dual Access Syntax" icon:layers
Both variables can also still be referenced using their full names (`\{{ DOCMD_VAR_API_HOST }}`).
:::

::: callout warning "Sensitive Credentials & Private Secrets" icon:shield-alert
Never expose private API secret keys or database credentials through build-time variables! Everything resolved during `docmd build` is compiled into static HTML and is visible to anyone inspecting the web page source. For private per-user credentials, use client runtime personalisation (`window.docmd.var.set`).
:::

## CI/CD Pipeline Integration

Follow these steps to pass dynamic build metadata into your documentation pipeline:

::: steps
::: step "Declare Pipeline Environment Variables" icon:settings
Configure your deployment pipeline to export environment variables. You can prefix custom variables with `DOCMD_VAR_` for top-level access.
:::

::: step "Run the Compiler" icon:terminal
Execute `docmd build`. The compiler automatically reads `process.env` and registers all available variables.
:::

::: step "Deploy the Compiled Artefacts" icon:cloud
The output directory contains static HTML with all environment variables fully baked in.
:::
::: /steps

### Pipeline Examples

::: tabs
::: tab "GitHub Actions" icon:github
```yaml
name: Deploy Documentation

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Build Documentation
        run: npx @docmd/core build
        env:
          DOCMD_VAR_DEPLOYED_AT: ${{ github.event.head_commit.timestamp }}
          DOCMD_VAR_BUILD_ID: ${{ github.run_id }}
          DOCMD_VAR_COMMIT_SHA: ${{ github.sha }}
          ENVIRONMENT: production
```
::: /tab

::: tab "GitLab CI" icon:gitlab
```yaml
deploy_docs:
  image: node:22
  stage: deploy
  script:
    - npx @docmd/core build
  variables:
    DOCMD_VAR_DEPLOYED_AT: $CI_PIPELINE_CREATED_AT
    DOCMD_VAR_BUILD_ID: $CI_PIPELINE_ID
    ENVIRONMENT: production
  artifacts:
    paths:
      - site/
```
::: /tab
::: /tabs