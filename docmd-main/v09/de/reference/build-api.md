---
title: "Build-API"
description: "Programmatische Build-API — rufen Sie docmd aus Node.js auf, um Sites, Live-Editor-Bundles und Workspace-Projekte zu bauen."
---

Sie können docmds Build-Engine direkt aus Ihren Node.js-Anwendungen importieren und verwenden. Das ist ideal für benutzerdefinierte CI/CD-Pipelines, automatisierte Dokumentations-Generierung und das Vor-Rendern von Docs in Monorepos.

## Installation

Stellen Sie sicher, dass `@docmd/core` in Ihrem Projekt installiert ist:

```bash
npm install @docmd/core
```

## Kern-Funktionen

### `buildSite(configPath, options)`

Die primäre Build-Funktion. Übernimmt das Laden der Konfiguration, das Markdown-Parsing und die Asset-Generierung.

```javascript
import { buildSite } from "@docmd/core";

async function runBuild() {
  await buildSite("./docmd.config.json", {
    "isDev": false,
    offline: false,
    zeroConfig: false
  });
}
```

### `buildLive(options)`

Generiert das browserbasierte **Live-Editor**-Bundle.

```javascript
import { buildLive } from "@docmd/core";

async function generateEditor() {
  await buildLive({
    "serve": false,
    port: 3000
  });
}
```

## Workspace-Verwaltung

Um Workspaces programmatisch zu verwalten, verwenden Sie die dedizierten Workspace-Funktionen.

### `isWorkspace(config)`
Gibt `true` zurück, wenn das übergebene Konfigurations-Objekt dem Workspace-Schema folgt.

### `detectWorkspace(configPath)`
Erkennt und lädt eine Workspace-Konfigurationsdatei. Gibt eine normalisierte `WorkspaceRootConfig` oder `null` zurück.

### `buildWorkspace(config, options)`
Baut alle Projekte innerhalb eines Workspace. Behandelt geteilte Assets und projekt-spezifische Prefixes.

### `devWorkspace(config, options)`
Startet den Workspace-Dev-Server. Beobachtet alle Projekte auf Änderungen und führt gezielte Rebuilds durch.

```javascript
import { detectWorkspace, buildWorkspace } from "@docmd/core";

async function buildAll() {
  const config = await detectWorkspace("./docmd.config.json");
  if (config) {
    await buildWorkspace(config, { quiet: false });
  }
}
```

## Beispiel: Eigene Pipeline

Umschließen Sie docmd, um komplexe Dokumentations-Workflows zu komponieren — dynamische Inhalte generieren, bauen und die Ausgabe anschließend an Ihren endgültigen Ort verschieben.

```javascript
import { buildSite } from '@docmd/core';
import fs from 'fs-extra';

async function deploy() {
  // 1. Dynamische Inhalte generieren
  await fs.writeFile('./docs/dynamic.md', '# Generierter Inhalt');

  // 2. Build ausführen
  await buildSite('./docmd.config.json');

  // 3. Ausgabe verschieben
  await fs.move('./site', './public/docs');
}
```

::: callout tip
Die programmatische API ist hochkompatibel mit **AI-gesteuerter Dokumentation**. Agenten können nach Inhalts-Updates Builds auslösen, um die Integrität zu prüfen und Deployments autonom zu verwalten.
:::

## Nächste Schritte

- [Plugins](/plugins/usage) — erweitern Sie docmd, ohne die Engine anzufassen.
- [CLI-Befehle](/reference/cli-commands) — der empfohlene Weg für die meisten CI/CD-Setups.
- [Workspaces](/configuration/workspaces) — Konfigurationsreferenz für Multi-Projekt-Setups.