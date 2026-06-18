---
title: "Vercel"
description: "Stellen Sie Ihre docmd-Dokumentation mit einer generierten vercel.json auf Vercel bereit."
---

`npx @docmd/core deploy --vercel` erzeugt eine `vercel.json`-Datei im Stamm Ihres Projekts. Sie ist automatisch auf das Ausgabeverzeichnis und die SPA-Routing-Einstellungen Ihrer Site konfiguriert.

```bash
npx @docmd/core deploy --vercel
```

## Was erzeugt wird

Die `vercel.json` konfiguriert:

- **Build-Befehl** — führt `npx @docmd/core build` aus.
- **Ausgabeverzeichnis** — entspricht der Eigenschaft `out` in Ihrer Konfiguration.
- **Install-Befehl** — installiert die exakte verwendete `@docmd/core`-Version.
- **Cache-Header** — unveränderliches Caching für Assets, no-cache für HTML.
- **SPA-Routing** — eine Catch-all-Route auf `index.html`, wenn `layout.spa` aktiviert ist.

## Bereitstellen

Nachdem die Datei erzeugt wurde, stellen Sie mit der [Vercel-CLI](external:https://vercel.com/docs/cli) bereit:

```bash
npm install -g vercel
vercel
```

Alternativ verbinden Sie Ihr Repository über das Dashboard mit Vercel. Die `vercel.json` wird dort automatisch erkannt.

## Neu erzeugen

Wenn Sie Ihr `out`-Verzeichnis oder Ihre `url` in der `docmd.config.json` ändern, führen Sie den Befehl erneut aus, um die Datei neu zu erzeugen. So bleibt die Konfiguration synchron.
