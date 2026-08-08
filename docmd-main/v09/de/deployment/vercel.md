---
title: "Vercel-Bereitstellung"
description: "Stellen Sie statische docmd-Dokumentations-Websites auf Vercel unter Verwendung generierter vercel.json-Konfigurationen bereit."
---

Generieren Sie Produktions-Deployment-Manifeste für Vercel mit dem Deployer-CLI-Tool:

```bash
npx @docmd/core deploy --vercel
```

## Generierte Konfiguration

Die ausgegebene Datei `vercel.json` konfiguriert Build-Befehle, Veröffentlichungsverzeichnisse und Routing-Richtlinien:

* **Build-Ausführung**: Führt `npx @docmd/core build` aus.
* **Ausgabepfad**: Löst automatisch Ihre `out`-Eigenschaft auf (Standard ist `site`).
* **Cache-Header**: Cacht statische Assets (`/assets/*`) unveränderlich, während Revalidierung für HTML-Dokumente erzwungen wird.
* **SPA-Regeln**: Fügt Catch-All-Routen-Neuschreiben an, wenn `layout.spa: true` ist.

```json "vercel.json"
{
  "buildCommand": "npx @docmd/core build",
  "outputDirectory": "site",
  "cleanUrls": true
}
```

## Bereitstellungsausführung

Veröffentlichen Sie auf Vercel unter Verwendung der CLI oder der Dashboard-Integration:

```bash
npm install -g vercel
vercel --prod
```

Alternativ verknüpfen Sie Ihr Git-Repository im Vercel Dashboard. Vercel erkennt `vercel.json` und verwaltet CI/CD-Auslöser automatisch.

::: callout tip "Neu-Generierung" icon:refresh-cw
Führen Sie `npx @docmd/core deploy --vercel --force` erneut aus, nachdem Sie `out`- oder `url`-Optionen in `docmd.config.json` geändert haben.
:::