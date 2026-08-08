---
title: "Build-API"
description: "Programmatische Node.js-API-Referenz für docmd — Websites, Live-Editor-Bundles und Multi-Projekt-Workspaces bauen."
---

Sie können die docmd Build-Engine programmatisch aus Node.js-Anwendungen importieren und ausführen. Dies ermöglicht benutzerdefinierte Build-Pipelines, automatisierte Dokumentationsgenerierung und Monorepo-Integrationen.

## Installation

Stellen Sie sicher, dass `@docmd/core` in Ihrem Projekt installiert ist:

```bash
npm install @docmd/core
```

## Primäre Build-Exportfunktionen

### `buildSite(configPath, options)`

Führt die standardmäßige statische Website-Kompilierung aus:

```javascript
import { buildSite } from "@docmd/core";

async function runBuild() {
  await buildSite("./docmd.config.json", {
    isDev: false,
    offline: false,
    zeroConfig: false
  });
}
```

### `buildLive(options)`

Kompiliert die browserbasierte Live-Editor-Anwendung:

```javascript
import { buildLive } from "@docmd/core";

async function generateEditor() {
  await buildLive({
    serve: false,
    port: 3000
  });
}
```

## Workspace-Funktionen

Funktionen zur programmatischen Verwaltung von Multi-Projekt-Workspaces:

* **`isWorkspace(config)`**: Bewertet, ob ein Konfigurationsobjekt Workspace-Schemata entspricht.
* **`detectWorkspace(configPath)`**: Löst Workspace-Konfigurationen auf und gibt eine normalisierte `WorkspaceRootConfig` oder `null` zurück.
* **`buildWorkspace(config, options)`**: Kompiliert alle in einem Workspace-Stamm definierten Projekte.
* **`devWorkspace(config, options)`**: Startet den Workspace-Entwicklungsserver mit gezielter Rebuild-Verfolgung.

```javascript
import { detectWorkspace, buildWorkspace } from "@docmd/core";

async function buildAllWorkspaces() {
  const config = await detectWorkspace("./docmd.config.json");
  if (config) {
    await buildWorkspace(config, { quiet: false });
  }
}
```

## Beispiel für benutzerdefinierte Pipeline

Kombinieren Sie die docmd-Kompilierung mit benutzerdefinierten Build-Skripten:

```javascript
import { buildSite } from "@docmd/core";
import fs from "fs-extra";

async function deployPipeline() {
  // 1. Dynamische Inhaltsquellen generieren
  await fs.writeFile("./docs/dynamic.md", "# Dynamisch generierte Seite");

  // 2. Statische Kompilierung ausführen
  await buildSite("./docmd.config.json");

  // 3. Ausgabeverzeichnis verschieben
  await fs.move("./site", "./public/docs");
}
```

::: callout tip "Kompatibilität mit KI-Automatisierung" icon:cpu
Die programmatische Build-API ermöglicht es Hintergrund-Workern und KI-Agenten, nach Quellcodeänderungen automatisch Builds auszulösen, um die Website-Integrität zu überprüfen.
:::