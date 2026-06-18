---
title: "Netlify"
description: "Stellen Sie Ihre docmd-Dokumentation mit einer generierten netlify.toml auf Netlify bereit."
---

`npx @docmd/core deploy --netlify` generiert eine `netlify.toml`-Datei im Stammverzeichnis Ihres Projekts. Sie ist mit dem korrekten Build-Befehl, Publish-Verzeichnis, Cache-Headern und SPA-Weiterleitungen vorkonfiguriert.

```bash
npx @docmd/core deploy --netlify
```

## Was wird generiert

Die `netlify.toml` konfiguriert:

- **Build-Befehl** - installiert `@docmd/core` und führt `npx @docmd/core build` aus.
- **Publish-Verzeichnis** - auf Ihr konfiguriertes `out`-Verzeichnis gesetzt.
- **Node-Version** - auf Node 20 festgelegt.
- **Cache-Header** - unveränderlich für Assets, kein Cache für HTML-Seiten.
- **SPA-Weiterleitungen** - ein `/*` → `/index.html`-Rewrite, wenn `layout.spa` aktiviert ist.

## Bereitstellung

Verbinden Sie Ihr Repository über das [Netlify-Dashboard](external:https://app.netlify.com) mit Netlify. Es erkennt die `netlify.toml` automatisch und stellt bei jedem Push bereit.

Alternativ verwenden Sie die [Netlify CLI](external:https://docs.netlify.com/cli/get-started/):

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Neu generieren

Führen Sie `npx @docmd/core deploy --netlify` jedes Mal erneut aus, wenn Sie `out` oder andere Konfigurationsfelder ändern. Dies hält die `netlify.toml` synchron.