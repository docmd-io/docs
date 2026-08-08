---
title: "Netlify-Bereitstellung"
description: "Stellen Sie docmd-Dokumentation auf Netlify unter Verwendung generierter netlify.toml-Konfigurationen bereit."
---

Generieren Sie Netlify-Build-Manifeste entsprechend Ihrer Projektkonfiguration:

```bash
npx @docmd/core deploy --netlify
```

## Generierte Konfiguration

Die ausgegebene Datei `netlify.toml` konfiguriert Build-Umgebungen, Ausgabeverzeichnisse und Header-Steuerelemente:

* **Build-Befehl**: Führt `npm install @docmd/core && npx @docmd/core build` aus.
* **Veröffentlichungsverzeichnis**: Synchronisiert mit `config.out` (`site`).
* **Header-Richtlinien**: Erzwingt unveränderliches Caching für statische Assets und No-Cache-Regeln für HTML-Einträge.
* **Weiterleitungsregeln**: Konfiguriert `/*` → `/index.html`-Rewrites, wenn `layout.spa: true` ist.

```toml "netlify.toml"
[build]
  command = "npx @docmd/core build"
  publish = "site"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## Bereitstellungsausführung

Verbinden Sie Ihr Git-Repository in Netlify für automatisierte Builds beim Push oder stellen Sie über die Netlify CLI bereit:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

::: callout tip "Neu-Generierung" icon:refresh-cw
Führen Sie `npx @docmd/core deploy --netlify --force` erneut aus, wenn Sie `out`- oder `url`-Werte in `docmd.config.json` ändern.
:::