---
title: "Netlify"
description: "Stellen Sie Ihre docmd-Dokumentation unter Verwendung einer generierten netlify.toml auf Netlify bereit."
---

Der Befehl `npx @docmd/core deploy --netlify` generiert eine `netlify.toml`-Datei im Root Ihres Projekts. Sie ist bereits mit dem korrekten Build-Befehl, dem Veröffentlichungsverzeichnis (Publish Directory), Cache-Headern und SPA-Redirects konfiguriert.

```bash
npx @docmd/core deploy --netlify
```

## Was generiert wird

Die `netlify.toml` konfiguriert Folgendes:

- **Build-Befehl** – Installiert `@docmd/core` und führt `npx @docmd/core build` aus.
- **Publish-Verzeichnis** – Entspricht Ihrem konfigurierten `out`-Verzeichnis.
- **Node-Version** – Festgelegt auf Node 20.
- **Cache-Header** – Unveränderlich (immutable) für Assets, no-cache für HTML-Seiten.
- **SPA-Redirects** – Ein Rewrite von `/*` zu `/index.html`, wenn `layout.spa` aktiviert ist.

## Bereitstellung

Verbinden Sie Ihr Repository über das [Netlify-Dashboard](https://app.netlify.com) mit Netlify. Es erkennt die `netlify.toml` automatisch und führt bei jedem Push ein Deployment aus.

Alternativ können Sie die [Netlify-CLI](https://docs.netlify.com/cli/get-started/) verwenden:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Erneutes Generieren

Führen Sie `npx @docmd/core deploy --netlify` jederzeit aus, wenn Sie `out` or andere Konfigurationsfelder ändern. Dies hält die `netlify.toml` synchron.