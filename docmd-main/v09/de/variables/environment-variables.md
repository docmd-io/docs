---
title: Referenz für Umgebungsvariablen
description: Umgebungsvariablen aus CI/CD-Pipelines über env.* und DOCMD_VAR_* in docmd-Dokumentation einbinden.
---

# Referenz für Umgebungsvariablen

docmd ermöglicht es Ihnen, System-Umgebungsvariablen direkt in Dokumentationsinhalte und Konfigurationen einzuspeisen — ideal für die nahtlose Integration in CI/CD-Pipelines (z. B. GitHub Actions, GitLab CI, Vercel oder Netlify).

## Zugriff auf Umgebungsvariablen über `env.*`

Jede während des Builds verfügbare System-Umgebungsvariable kann mit dem Präfix `env.` angesprochen werden:

```markdown
Bereitgestellt in Umgebung: **\{{ env.ENVIRONMENT || 'development' }}**.
Build-ID: `\{{ env.GITHUB_RUN_ID || 'local' }}`
Branch: `\{{ env.GITHUB_REF_NAME || 'main' }}`
```

### Fallback-Werte angeben

Da Umgebungsvariablen lokal oft nicht gesetzt sind, empfiehlt sich immer ein aussagekräftiger Fallback mit `||`:

```markdown
Staging-Endpunkt:
`\{{ env.STAGING_GATEWAY_URL || "https://sandbox.gateway.io" }}`
```

## Zero-Prefix-Promotion über `DOCMD_VAR_*`

Um das `env.`-Präfix in Markdown-Dateien zu vermeiden, werden alle mit `DOCMD_VAR_` beginnenden Umgebungsvariablen automatisch auf die oberste Ebene befördert:

```bash
# In Ihrer Pipeline oder .env:
export DOCMD_VAR_API_HOST="https://api.production.internal"
export DOCMD_VAR_RELEASE_CHANNEL="beta"
```

In Ihren Markdown-Dokumenten:

```markdown
Unser Server-Endpunkt: `\{{ API_HOST }}`.
Aktueller Release-Kanal: **\{{ RELEASE_CHANNEL }}**.
```

::: callout info "Duale Zugriffssyntax" icon:layers
Beide Variablen können weiterhin auch über ihren vollen Namen angesprochen werden (`\{{ DOCMD_VAR_API_HOST }}`).
:::

::: callout warning "Vertrauliche Zugangsdaten & Geheimnisse" icon:shield-alert
Veröffentlichen Sie niemals private API-Schlüssel oder Datenbank-Passwörter über Build-Variablen! Alles, was zur Build-Zeit aufgelöst wird, landet im statischen Quelltext der Website. Für vertrauliche Werte nutzen Sie die Client-Laufzeit (`window.docmd.var.set`).
:::

## CI/CD-Pipeline-Integration

So binden Sie dynamische Metadaten in Ihren automatisierten Deployment-Ablauf ein:

::: steps
::: step "Pipeline-Umgebungsvariablen deklarieren" icon:settings
Konfigurieren Sie Ihre Pipeline so, dass Umgebungsvariablen exportiert werden (z. B. mit `DOCMD_VAR_`-Präfix).
:::

::: step "Compiler ausführen" icon:terminal
Führen Sie `docmd build` aus. Der Compiler liest `process.env` automatisch aus.
:::

::: step "Kompilierte Dokumentation bereitstellen" icon:cloud
Das Ausgabeverzeichnis enthält fertiges statisches HTML mit allen aufgelösten Werten.
:::
::: /steps

### Pipeline-Beispiele

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

      - name: Dokumentation bauen
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
