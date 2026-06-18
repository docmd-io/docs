---
title: "Vercel"
description: "Stellen Sie Ihre docmd-Dokumentation mit einer generierten vercel.json auf Vercel bereit."
---

`npx @docmd/core deploy --vercel` generiert eine `vercel.json`-Datei im Stammverzeichnis Ihres Projekts. Sie wird automatisch für das Ausgabeverzeichnis und die SPA-Routing-Einstellungen Ihrer Site konfiguriert.

```bash
npx @docmd/core deploy --vercel
```

## Was wird generiert

Die `vercel.json` konfiguriert:

- **Build-Befehl** - führt `npx @docmd/core build` aus.
- **Ausgabeverzeichnis** - auf die `out`-Eigenschaft in Ihrer Konfiguration gesetzt.
- **Installationsbefehl** - installiert die exakte verwendete `@docmd/core`-Version.
- **Cache-Header** - unveränderliches Caching für Assets, kein Cache für HTML.
- **SPA-Routing** - eine Catch-All-Route zu `index.html`, wenn `layout.spa` aktiviert ist.

## Bereitstellung

Nach der Generierung der Datei stellen Sie mit der [Vercel CLI](external:https://vercel.com/docs/cli) bereit:

```bash
npm install -g vercel
vercel
```

Alternativ verbinden Sie Ihr Repository über das Dashboard mit Vercel. Es erkennt die `vercel.json` automatisch.

## Neu generieren

Wenn Sie Ihr `out`-Verzeichnis oder Ihre `url` in `docmd.config.json` ändern, führen Sie den Befehl erneut aus, um die Datei neu zu generieren. Dies hält die Konfiguration synchron.
