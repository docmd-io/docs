---
title: "Schnellstart"
description: "Gelangen Sie in weniger als einer Minute von einem leeren Ordner zu einer laufenden Dokumentationsseite."
---

Führen Sie docmd in jedem Ordner aus, der Markdown-Dateien enthält. Keine Konfigurationsdatei, kein Setup, keine Framework-Kenntnisse erforderlich.

## 1. Entwicklungsserver starten

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core dev
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core dev
```
:::

Öffnet `http://localhost:3000`. Ihre Dokumentation ist live.

<!-- SCREENSHOT: Terminal window showing a successful local dev server startup, with the green local access URL http://localhost:3000 and initial build statistics. -->

::: callout tip "Automatische Port-Umleitung"
Wenn Port `3000` bereits verwendet wird, findet docmd automatisch den nächsten verfügbaren Port (z. B. `3001`).
:::

## 2. Automatische Funktionen

Die Engine richtet alles automatisch ein:

1. **Ordnererkennung** - Sucht nach `docs/`, `src/docs/`, `documentation/` oder `.md`-Dateien.
2. **Navigationserstellung** - Erstellt eine verschachtelte Seitenleiste aus Ihrer Ordnerstruktur.
3. **Titel-Auflösung** - Extrahiert automatisch Seitentitel aus dem ersten `H1`-Tag.
4. **Suchindexierung** - Aktiviert sofort die integrierte Volltextsuche.
5. **Intelligentes Caching** - Erzeugt beim Speichern sub-200ms-Neuerstellungen.

Es wird keine `docmd.config.json` benötigt. Fügen Sie später eine hinzu, um Layouts, Plugins oder Versionen anzupassen.

## 3. Für die Produktion erstellen

Kompilieren Sie Ihre Markdown-Dateien in eine statische, produktionsreife Website.

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core build
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core build
```
:::

Der Compiler gibt eine statische Website in `./site/` aus.

<!-- SCREENSHOT: Terminal output showing a successful production build with compilation times, sitemap generation, and total page count summary. -->

Hosten Sie diese statische Ausgabe überall. Stellen Sie auf GitHub Pages, Vercel, Netlify oder einem anderen statischen Host bereit.