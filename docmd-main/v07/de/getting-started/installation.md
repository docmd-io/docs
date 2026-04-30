---
title: "Installation"
description: "Installieren Sie docmd global, lokal oder führen Sie es sofort mit npx aus. Erfordert Node.js 18+."
---

Wählen Sie die Installationsmethode, die am besten zu Ihrem Workflow passt.

## Sofort ausführen

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

Keine Installation erforderlich. Führt docmd direkt in jedem Ordner mit Markdown-Dateien aus.

::: tabs
== tab "npm" icon:box
```bash
# Eine produktionsreife statische Website erstellen
npx @docmd/core build
```
== tab "Bun" icon:zap
```bash
# Eine produktionsreife statische Website erstellen
bunx @docmd/core build
```
:::

## Als Projektabhängigkeit installieren (empfohlen)

::: tabs
== tab "npm" icon:package
```bash
npm install -D @docmd/core
npx @docmd/core init
npx @docmd/core dev
```
== tab "pnpm" icon:boxes
```bash
pnpm add -D @docmd/core
pnpm dlx docmd init
pnpm dlx docmd dev
```
== tab "yarn" icon:scroll
```bash
yarn add -D @docmd/core
yarn docmd init
yarn docmd dev
```
== tab "Bun" icon:zap
```bash
bun add -D @docmd/core
bunx docmd init
bunx docmd dev
```
:::

Dies fixiert die Version für Ihr gesamtes Team und Ihre CI/CD-Pipeline.

<!-- SCREENSHOT: Terminalausgabe eines erfolgreichen `npx @docmd/core init`-Laufs — der generierte Dateibaum mit docmd.config.js, docs/index.md und der 'Ready!'-Nachricht. -->

::: callout tip "Nach der lokalen Installation"
Sobald `@docmd/core` eine Projektabhängigkeit ist, verwenden Sie `npx @docmd/core` anstelle von `npx @docmd/core` für alle Befehle.
:::

## Global installieren

::: tabs
== tab "npm" icon:package
```bash
npm install -g @docmd/core
```
== tab "pnpm" icon:boxes
```bash
pnpm add -g @docmd/core
```
== tab "yarn" icon:scroll
```bash
yarn global add @docmd/core
```
== tab "Bun" icon:zap
```bash
bun add -g @docmd/core
```
:::

```bash
# Den 'docmd'-Befehl überall verwenden
docmd dev
docmd build
```

## Nur-Browser-Integration

::: callout info "Nur für Bibliotheksnutzung"
Diese Methode bettet die docmd-Rendering-Engine in eine andere Webanwendung ein. Dies ist nicht der Standardweg zum Erstellen von Dokumentationsseiten.
:::

```html
<!-- Kern-Styles -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- Processing-Engine -->
<script src="https://unpkg.com/@docmd/live/dist/docmd-live.js"></script>
```

Weitere Details zur Integration finden Sie im [Browser-API](../api/browser-api.md)-Leitfaden.

## Fehlerbehebung

::: callout warning "Berechtigung verweigert (EACCES)"
Wenn während der globalen Installation unter macOS oder Linux `EACCES`-Fehler auftreten, wechseln Sie zu einem Node-Versionsmanager wie [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm), anstatt `sudo` zu verwenden.
:::

::: callout info "PowerShell-Skriptausführung (Windows)"
Wenn PowerShell die Skriptausführung blockiert, führen Sie dies als Administrator aus:
`Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
:::