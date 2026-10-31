---
title: Environment Variables Reference
description: How to pass CI/CD and system environment variables into docmd documentation and configuration using env.* and DOCMD_VAR_* patterns.
---

# Environment Variables Reference

docmd allows you to inject system environment variables directly into your documentation, enabling seamless integration with CI/CD pipelines (such as GitHub Actions, GitLab CI, Vercel, or Netlify).

## Accessing Environment Variables via `env.*`

Any system environment variable available during the build process can be accessed using the `env.` prefix:

```markdown
Deployed on infrastructure environment: **{{ env.ENVIRONMENT || 'development' }}**.
Build ID: `{{ env.GITHUB_RUN_ID || 'local' }}`
Branch: `{{ env.GITHUB_REF_NAME || 'main' }}`
```

### Fallback Values

Environment variables may not always be present when developing locally. Always specify a sensible fallback with `||`:

```markdown
Connect to our staging gateway:
`{{ env.STAGING_GATEWAY_URL || "https://sandbox.gateway.io" }}`
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
Our server endpoint is `{{ API_HOST }}`.
Current release channel: **{{ RELEASE_CHANNEL }}**.
```

Both variables can also still be referenced using their full names (`{{ DOCMD_VAR_API_HOST }}`).

## Example: GitHub Actions Pipeline

Here is an example `.github/workflows/deploy.yml` passing build metadata into docmd:

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
          DOCMD_VAR_DEPLOYED_AT: ${{ steps.date.outputs.date }}
          DOCMD_VAR_PR_NUMBER: ${{ github.event.number }}
          DEPLOY_ENV: production
```