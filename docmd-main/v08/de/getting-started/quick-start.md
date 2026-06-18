---
title: "Schnellstart"
description: "In unter einer Minute vom leeren Ordner zu einer laufenden Dokumentations-Site."
---

Führen Sie docmd in einem beliebigen Ordner mit Markdown-Dateien aus. Keine Konfigurationsdatei, kein Setup und keine Framework-Kenntnisse erforderlich.

## 1. Dev-Server starten

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

Dies öffnet `http://localhost:3000`. Ihre Dokumentation ist live.

<img width="500" class="with-border" src="/assets/previews/terminal-npx-dev.webp">

::: callout tip "Automatische Port-Ausweichung" icon:info
Wenn Port `3000` belegt ist, findet docmd automatisch den nächsten freien Port (z. B. `3001`).
:::

## 2. Automatische Funktionen

Die Engine richtet alles automatisch ein:

1.  **Verzeichniserkennung**: Durchsucht `docs/`, `src/docs/`, `documentation/`, `content/` oder beliebige `.md`-Dateien im Projektstamm.
2.  **Navigationsstrukturierung**: Baut eine verschachtelte Sidebar aus Ihrer Ordnerstruktur auf.
3.  **Titel-Auflösung**: Extrahiert Seitentitel automatisch aus dem ersten `H1`-Tag.
4.  **Suchindexierung**: Aktiviert sofort die eingebaute Volltextsuche.
5.  **Intelligentes Caching**: Löst bei Datei-Speicherung sofort Rebuilds unter 200 ms aus.

Keine `docmd.config.json` erforderlich. Fügen Sie sie später hinzu, um Layouts, Plugins oder Versionen anzupassen.

## 3. Produktions-Build

Kompilieren Sie Ihre Markdown-Dateien zu einer statischen, produktionsreifen Site.

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

Der Compiler gibt eine statische Site nach `./site/` aus.

Hosten Sie diese statische Ausgabe überall. Stellen Sie auf GitHub Pages, Vercel, Netlify oder einem beliebigen Static Host bereit.
