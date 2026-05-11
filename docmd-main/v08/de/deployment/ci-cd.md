---
title: "CI/CD-Pipelines"
description: "Automatisieren Sie die Erstellung und Bereitstellung Ihrer Dokumentation mit CI/CD-Pipelines für GitHub Pages, Vercel, Netlify und mehr."
---

Verwenden Sie CI/CD-Workflows, um Ihre `docmd`-Website bei jedem Push von Änderungen automatisch zu erstellen und bereitzustellen. Unten finden Sie einsatzbereite Konfigurationen für gängige Cloud-Plattformen.

## Cloud-Plattformen

::: tabs

== tab "GitHub Pages"

Die empfohlene Methode ist die Verwendung von **GitHub Actions**, um Ihre Deployments bei jedem Push zu automatisieren.

**Erstellen Sie `.github/workflows/deploy.yml`:**

```yaml
name: Deploy docmd
on:
  push:
    branches: ["main"]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: npx @docmd/core build
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./site }
      - uses: actions/deploy-pages@v4
```

== tab "Vercel"

1.  Verbinden Sie Ihr Repository mit Vercel.
2.  In den **Build Settings** des Projekts:
    - **Framework Preset**: `Other`
    - **Build Command**: `npx @docmd/core build`
    - **Output Directory**: `site`
3.  Deployen. Vercel erkennt automatisch den statischen Output und liefert ihn global aus.

== tab "Netlify"

1.  Importieren Sie Ihr Projekt von GitHub/GitLab/Bitbucket.
2.  Konfigurieren Sie Ihre Build-Einstellungen:
    - **Build command**: `npx @docmd/core build`
    - **Publish directory**: `site`
3.  Klicken Sie auf **Deploy site**. Das CDN von Netlify kümmert sich um das Routing und die Asset-Auslieferung.

== tab "Cloudflare Pages"

1.  Erstellen Sie ein neues Projekt im Cloudflare Dashboard unter **Pages**.
2.  Verbinden Sie Ihren Git-Provider und wählen Sie Ihr Repository aus.
3.  Konfigurieren Sie die Build-Einstellungen:
    - **Framework preset**: `None`
    - **Build command**: `npx @docmd/core build`
    - **Build output directory**: `site`
4.  Speichern und Deployen.

== tab "Firebase"

1.  Installieren Sie das Firebase CLI: `npm install -g firebase-tools`.
2.  Erstellen Sie Ihre Website: `npx @docmd/core build`.
3.  Führen Sie `firebase init hosting` aus und wählen Sie Ihr Projekt.
4.  Setzen Sie das öffentliche Verzeichnis auf `site`.
5.  Konfigurieren Sie es als Single-Page-App: `Yes` (dies regelt das 404-Verhalten).
6.  Deployen Sie mit `firebase deploy`.

:::

::: callout info "Warum npx @docmd/core?"
In CI/CD-Umgebungen, in denen `docmd` nicht global installiert ist, verwenden Sie `npx @docmd/core`, um das Paket direkt auszuführen. Wenn Ihr Projekt `@docmd/core` als `devDependency` gelistet hat, funktioniert auch einfach `docmd build` nach einem `npm install`.
:::

## Manuelle Übertragung / Statischer Server

Für klassische Webserver (Apache, IIS etc.):

1.  Erstellen Sie die Website: `npx @docmd/core build`.
2.  Laden Sie den Inhalt des Ordners `site/` über SFTP, SCP oder Ihr bevorzugtes Deployment-Tool auf Ihren Server hoch.
3.  Stellen Sie sicher, dass Ihr Server so konfiguriert ist, dass er `index.html` für Verzeichnisse ausliefert (Standard bei den meisten Servern).