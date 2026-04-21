---
title: "Schnellstart"
description: "Gelangen Sie in weniger als einer Minute von einem leeren Ordner zu einer laufenden Dokumentationsseite."
---

Führen Sie docmd in jedem Ordner aus, der Markdown-Dateien enthält. Keine Konfigurationsdatei, kein Setup, keine Framework-Kenntnisse erforderlich.

## Entwicklungsserver starten

```bash
npx @docmd/core dev
```
<!-- SCREENSHOT: Terminalausgabe nach dem Ausführen von `npx @docmd/core dev`, die die lokale Entwicklungsserver-URL und die Build-Zusammenfassung mit der Seitenanzahl zeigt. -->

Öffnet `http://localhost:3000`. Ihre Dokumentation ist live.

<!-- SCREENSHOT: Browser, der die docmd-Standardseite unter localhost:3000 anzeigt — die automatisch generierte Homepage mit sichtbarer Seitenleisten-Navigation. -->

<!-- SCREENSHOT: Screenshot eines frisch laufenden docmd-Entwicklungsservers mit automatisch generierter Navigation -->

## Was automatisch passiert

docmd scannt Ihr Projekt und richtet alles ein:

1. **Ordnererkennung** — sucht nach `docs/`, `src/docs/`, `documentation/` oder beliebigen `.md`-Dateien
2. **Navigationserstellung** — erstellt eine verschachtelte Seitenleiste aus Ihrer Ordnerstruktur
3. **Metadaten-Extraktion** — liest die `package.json` für den Seitentitel aus, falls verfügbar
4. **Theme-Aktivierung** — wendet das Standard-Theme mit systemabhängigem Hell-/Dunkelmodus an
5. **Suchindexierung** — ermöglicht die integrierte Volltextsuche

Es wird keine `docmd.config.js` benötigt. Fügen Sie später eine hinzu, wenn Sie Versionierung, Plugins oder eine benutzerdefinierte Navigation benötigen.

## Für die Produktion erstellen

```bash
npx @docmd/core build
```

Gibt eine statische Website in `./site/` aus, die überall bereitgestellt werden kann.