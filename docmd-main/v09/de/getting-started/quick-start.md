---
title: "Schnellstart"
description: "In unter einer Minute von einem leeren Verzeichnis zu einer laufenden Dokumentationsseite."
---

Führen Sie `docmd` in jedem Verzeichnis aus, das Markdown-Dateien enthält. Keine Konfigurationsdatei, kein Setup-Overhead oder Framework-Erfahrung erforderlich.

::: steps

### 1. Entwicklungsserver starten

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core dev
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core dev
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core dev
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core dev
```
:::

Dies öffnet `http://localhost:3000`. Ihre Dokumentation ist jetzt live.

<img width="500" class="with-border" src="/assets/previews/terminal-npx-dev.webp">

::: callout tip "Automatische Port-Umschaltung" icon:info
Wenn Port `3000` derzeit belegt ist, erkennt `docmd` dies automatisch und bindet sich an den nächsten verfügbaren Port (z. B. `3001`).
:::

### 2. Automatische Funktionsauflösung

Die Engine konfiguriert alle wesentlichen Funktionen automatisch:

1. **Verzeichniserkennung**: Sucht nach `docs/`, `src/docs/`, `documentation/`, `content/` oder allen `.md`-Dateien im Projekt-Root.
2. **Navigationsstrukturierung**: Erstellt einen verschachtelten Sidebar-Navigationsbaum direkt aus Ihrer Verzeichnishierarchie.
3. **Titelauflösung**: Extrahiert Seitentitel automatisch aus dem ersten `H1`-Überschriften-Tag.
4. **Suchindexierung**: Erstellt sofort einen clientseitigen Volltext-Suchindex.
5. **Smartes Caching**: Löst bei Dateispeicherung automatisch Rebuilds in unter 200 ms aus.

Keine `docmd.config.json` erforderlich. Fügen Sie später eine hinzu, um Layouts, Plugins oder Versionierungseinstellungen anzupassen.

### 3. Für Produktion bauen

Kompilieren Sie Ihre Markdown-Dateien in eine optimierte, statische Produktions-Website.

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core build
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core build
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core build
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core build
```
:::

Der Compiler gibt eine statische Website nach `./site/` aus. Hosten Sie diese statische Ausgabe überall, z. B. auf GitHub Pages, Vercel, Netlify oder jedem statischen HTTP-Host.

:::

::: callout info "Nächste Schritte" icon:compass
Bereit, Ihr Projekt zu konfigurieren? Erfahren Sie im [Projektstruktur-Leitfaden](./project-structure.md), wie Sie Ihr Repository strukturieren, oder erkunden Sie lokale Installationsoptionen unter [Installation](./installation.md).
:::
