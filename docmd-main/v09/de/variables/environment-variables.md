---
title: Referenz der Umgebungsvariablen
description: So übergeben Sie CI/CD- und System-Umgebungsvariablen an docmd mithilfe von env.* und DOCMD_VAR_*.
---

# Referenz der Umgebungsvariablen

docmd ermöglicht es Ihnen, System-Umgebungsvariablen direkt in Ihre Dokumentation einzubinden, um eine nahtlose Integration mit CI/CD-Pipelines (wie GitHub Actions, GitLab CI, Vercel oder Netlify) zu gewährleisten.

## Zugriff auf Umgebungsvariablen über `env.*`

Jede während des Builds verfügbare Umgebungsvariable kann mit dem Präfix `env.` aufgerufen werden:

```markdown
Bereitgestellt in der Umgebung: **{{ env.ENVIRONMENT || 'development' }}**.
Build-ID: `{{ env.GITHUB_RUN_ID || 'local' }}`
Branch: `{{ env.GITHUB_REF_NAME || 'main' }}`
```

### Fallback-Werte

Umgebungsvariablen sind bei der lokalen Entwicklung möglicherweise nicht gesetzt. Geben Sie stets einen sinnvollen Fallback mit `||` an:

```markdown
Verbinden Sie sich mit unserem Staging-Gateway:
`{{ env.STAGING_GATEWAY_URL || "https://sandbox.gateway.io" }}`
```

## Präfixlose Bereitstellung über `DOCMD_VAR_*`

Damit Sie in Dokumenten nicht zwingend `env.` voranstellen müssen, wird jede Umgebungsvariable mit dem Präfix `DOCMD_VAR_` automatisch an die oberste Ebene befördert:

```bash
# In Ihrer CI/CD-Pipeline oder .env:
export DOCMD_VAR_API_HOST="https://api.production.internal"
export DOCMD_VAR_RELEASE_CHANNEL="beta"
```

In Ihren Markdown-Dokumenten:

```markdown
Unser Server-Endpunkt lautet `{{ API_HOST }}`.
Aktueller Release-Kanal: **{{ RELEASE_CHANNEL }}**.
```

Beide Variablen können alternativ weiterhin über ihren vollständigen Namen aufgerufen werden (`{{ DOCMD_VAR_API_HOST }}`).

## Beispiel: GitHub Actions Pipeline

Hier ist ein Beispiel für eine `.github/workflows/deploy.yml`:

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
