---
title: "CI/CD-Pipelines"
description: "Automatisieren Sie Dokumentations-Builds und -Deployments mit CI/CD-Pipelines für GitHub Pages, Vercel, Netlify und mehr."
---

Nutzen Sie CI/CD-Workflows, um Ihre `docmd`-Site bei jedem Push von Änderungen automatisch zu bauen und bereitzustellen. Im Folgenden finden Sie einsatzbereite Konfigurationen für gängige Cloud-Plattformen.

## Cloud-Plattformen

::: tabs

== tab "GitHub Pages"

Die empfohlene Methode ist die Verwendung von **GitHub Actions**, um Ihre Bereitstellungen bei jedem Push zu automatisieren.

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
3.  Bereitstellen. Vercel erkennt automatisch die statische Ausgabe und liefert sie global aus.

== tab "Netlify"

1.  Importieren Sie Ihr Projekt von GitHub/GitLab/Bitbucket.
2.  Konfigurieren Sie Ihre Build-Einstellungen:
    - **Build command**: `npx @docmd/core build`
    - **Publish directory**: `site`
3.  Klicken Sie auf **Deploy site**. Das CDN von Netlify übernimmt das Routing und die Asset-Zustellung.

== tab "Cloudflare Pages"

1.  Erstellen Sie ein neues Projekt im Cloudflare-Dashboard unter **Pages**.
2.  Verbinden Sie Ihren Git-Anbieter und wählen Sie Ihr Repository aus.
3.  Konfigurieren Sie die Build-Einstellungen:
    - **Framework preset**: `None`
    - **Build command**: `npx @docmd/core build`
    - **Build output directory**: `site`
4.  Speichern und Bereitstellen.

== tab "Firebase"

1.  Installieren Sie die Firebase CLI: `npm install -g firebase-tools`.
2.  Bauen Sie Ihre Website: `npx @docmd/core build`.
3.  Führen Sie `firebase init hosting` aus und wählen Sie Ihr Projekt aus.
4.  Setzen Sie das öffentliche Verzeichnis auf `site`.
5.  Als Single-Page App konfigurieren: `Yes` (dies regelt das 404-Verhalten).
6.  Bereitstellung mittels `firebase deploy`.

:::

::: callout info "Warum npx @docmd/core?"
In CI/CD-Umgebungen, in denen `docmd` nicht global installiert ist, verwenden Sie `npx @docmd/core`, um das Paket direkt auszuführen. Wenn Ihr Projekt `@docmd/core` als `devDependency` gelistet hat, funktioniert nach einem `npm install` auch einfach der Aufruf von `docmd build`.
:::

## Manuelle Bereitstellung / Statischer Server

Für klassische Webserver (NGINX, Apache, IIS):

1.  Website generieren: `npx @docmd/core build`.
2.  Laden Sie den Inhalt des `site/`-Ordners via SFTP, SCP oder Ihr bevorzugtes Tool auf Ihren Server hoch.
3.  Stellen Sie sicher, dass Ihr Server so konfiguriert ist, dass er `index.html` für Verzeichnisse ausliefert (Standard bei den meisten).

Für selbst gehostete Umgebungen wie Docker, NGINX oder Caddy sehen Sie sich die speziellen [Bereitstellung-Leitfäden](./docker) an.