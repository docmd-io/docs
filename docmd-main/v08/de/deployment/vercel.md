---
title: "Vercel"
description: "Stellen Sie Ihre docmd-Dokumentation unter Verwendung einer generierten vercel.json auf Vercel bereit."
---

Der Befehl `npx @docmd/core deploy --vercel` generiert eine `vercel.json`-Datei im Root Ihres Projekts. Sie ist automatisch auf das Ausgabeverzeichnis Ihrer Website und die SPA-Routing-Einstellungen konfiguriert.

```bash
npx @docmd/core deploy --vercel
```

## Was generiert wird

Die `vercel.json` konfiguriert Folgendes:

- **Build-Befehl** – Führt `npx @docmd/core build` aus.
- **Ausgabeverzeichnis (Output Directory)** – Entspricht der Eigenschaft `out` in Ihrer Konfiguration.
- **Installationsbefehl** – Installiert die exakte verwendete Version von `@docmd/core`.
- **Cache-Header** – Unveränderliches Caching für Assets, no-cache für HTML.
- **SPA-Routing** – Eine Catch-all-Route zu `index.html`, wenn `layout.spa` aktiviert ist.

## Bereitstellung

Nachdem Sie die Datei generiert haben, stellen Sie sie mit der [Vercel-CLI](https://vercel.com/docs/cli) bereit:

```bash
npm install -g vercel
vercel
```

Alternativ können Sie Ihr Repository über das Dashboard mit Vercel verbinden. Es erkennt die `vercel.json` automatisch.

## Erneutes Generieren

Wenn Sie Ihr `out`-Verzeichnis oder Ihre `url` in der `docmd.config.json` ändern, führen Sie den Befehl erneut aus, um die Datei neu zu generieren. Dies hält die Konfiguration synchron.
