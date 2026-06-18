---
title: "Node.js-API"
description: "Integrieren Sie docmds Build-Engine in Ihre benutzerdefinierten Node.js-Skripte und Automatisierungs-Pipelines."
---

Sie können docmds Build-Engine direkt in Ihren Node.js-Anwendungen importieren und verwenden. Das ist ideal für benutzerdefinierte CI/CD-Pipelines, automatisierte Dokumentations-Generierung oder die Erweiterung von docmd für spezielle Umgebungen.

## Installation

Stellen Sie sicher, dass `@docmd/core` in Ihrem Projekt installiert ist:

```bash
npm install @docmd/core
```

## Kern-Funktionen

### `buildSite(configPath, options)`

Die primäre Build-Funktion. Sie übernimmt das Laden der Konfiguration, das Markdown-Parsing und die Asset-Generierung.

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

## Beispiel: Benutzerdefinierte Pipeline

Sie können docmd umhüllen, um komplexe Dokumentations-Workflows zu erstellen.

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

## Plugin-API (`@docmd/api`)

Das Paket `@docmd/api` ist die dedizierte Heimat des Plugin-Systems. Es stellt Hook-Registrierung, WebSocket-RPC-Dispatch, Source-Editing-Tools und **zentrale URL-Utilities** bereit.

```bash
npm install @docmd/api
```

### URL-Utilities

Plugins sollten diese zentralen Utilities verwenden, anstatt eigene URL-Logik zu implementieren.

#### `outputPathToSlug(outputPath)`

Konvertiert einen Build-Engine-Ausgabepfad in einen sauberen Verzeichnis-Slug.

```javascript
import { outputPathToSlug } from '@docmd/api';

outputPathToSlug('guide/index.html');   // → 'guide/'
outputPathToSlug('index.html');         // → '/'
outputPathToSlug('de/v1/api/index.html'); // → 'de/v1/api/'
```

#### `outputPathToPathname(outputPath)`

Konvertiert in einen root-relativen Pfadnamen.

```javascript
import { outputPathToPathname } from '@docmd/api';

outputPathToPathname('guide/index.html'); // → '/guide/'
outputPathToPathname('index.html');       // → '/'
```

#### `outputPathToCanonical(outputPath, siteUrl)`

Erstellt eine vollständige kanonische URL.

```javascript
import { outputPathToCanonical } from "@docmd/api";

outputPathToCanonical("guide/index.html", "https://docs.example.com");
```

#### `sanitizeUrl(url)`

Reduziert doppelte Schrägstriche (außer nach dem Protokoll).

```javascript
import { sanitizeUrl } from "@docmd/api";

sanitizeUrl("https://docs.example.com//guide"); // → "https://docs.example.com/guide"
sanitizeUrl("/foo//bar"); // → "/foo/bar"
```

#### `buildAbsoluteUrl(base, localePrefix, versionPrefix, pagePath)`

Baut eine absolute URL mit Locale- und Versions-Prefixes.

```javascript
import { buildAbsoluteUrl } from '@docmd/api';

buildAbsoluteUrl('/', 'de/', 'v1/', 'guide/'); // → '/de/v1/guide/'
```

#### `resolveHref(href)`

Normalisiert vom Benutzer geschriebene hrefs zu sauberen URLs. Behandelt das Strippen von `.md`, Trailing-Slashes sowie die Präfixe `external:` und `raw:`.

```javascript
import { resolveHref } from "@docmd/api";

resolveHref("overview.md"); // → "overview/"
resolveHref("external:https://github.com"); // → "https://github.com"
resolveHref("raw:docs/readme.md"); // → "docs/readme.md"
```

### Vorberechnete Seiten-URLs

Jedes Page-Objekt enthält vorberechnete URL-Daten. Plugins können diese ohne weitere Berechnung direkt lesen.

```javascript
export async function onPostBuild({ pages, config }) {
  for (const page of pages) {
    console.log(page.urls.slug);
    console.log(page.urls.canonical);
    console.log(page.urls.pathname);
  }
}
```

| Eigenschaft | Typ | Beschreibung |
|:---------|:-----|:------------|
| `slug` | `string` | Sauberer Verzeichnis-Slug (z. B. `guide/` oder `/`) |
| `canonical` | `string` | Vollständige kanonische URL (nur wenn `config.url` gesetzt ist) |
| `pathname` | `string` | Root-relativer Pfad (z. B. `/guide/`) |

> **Hinweis:** Alle Exporte aus `@docmd/api` sind auch aus `@docmd/core` verfügbar. Neue Projekte sollten direkt aus `@docmd/api` importieren.

### `createActionDispatcher(hooks, options)`

Erzeugt einen Dispatcher, der WebSocket-RPC-Nachrichten an Plugin-Action/Event-Handler weiterleitet.

```javascript
import { createActionDispatcher } from "@docmd/api";

const dispatcher = createActionDispatcher(
  { "actions": myPlugin.actions, "events": myPlugin.events },
  { "projectRoot": "/path/to/project", config, broadcast }
);

const { result, reload } = await dispatcher.handleCall("my-action", payload);
```

### `createSourceTools({ projectRoot })`

Erzeugt Source-Editing-Utilities zur Bearbeitung von Markdown-Dateien.

```javascript
import { createSourceTools } from "@docmd/api";

const source = createSourceTools({ "projectRoot": "/path/to/project" });

const block = await source.getBlockAt("docs/page.md", [10, 12]);
await source.wrapText("docs/page.md", [10, 12], "important", 0, "**", "**");
```

### `loadPlugins(config, options)`

Lädt, validiert und registriert alle in der Konfiguration deklarierten Plugins. Gibt die befüllte Hook-Registry zurück.

```javascript
import { loadPlugins, hooks } from "@docmd/api";

const registeredHooks = await loadPlugins(config, {
  "resolvePaths": [__dirname]
});
```

### Engine-Loader-API

Die steckbare Engine-Architektur erlaubt die programmatische Auflösung und Instanziierung von Beschleunigungs-Schichten direkt über `@docmd/api`.

#### `loadEngine(engineName)`

Löst das angeforderte Build-Engine-Backend auf und initialisiert es. Falls native Architektur-Binaries nicht verfügbar sind, fällt es sauber auf die hochperformante JavaScript-Engine zurück.

```javascript
import { loadEngine } from "@docmd/api";

const engine = await loadEngine("rust");
const gitLogResult = await engine.runWorkerTask("git:log", { "paths": ["docs/guide.md"] });
```

#### `registerEngine(engineName, engineInstance)`

Erlaubt benutzerdefinierten Tools oder Drittanbieter-Integratoren, eigene Ausführungs-Engines programmatisch zu registrieren.

```javascript
import { registerEngine } from "@docmd/api";

registerEngine("custom", myCustomEngineImpl);
```

### Typ-Exporte

Für TypeScript-Plugin-Autoren sind die folgenden Typen verfügbar:

```typescript
import type {
  PluginModule,
  PluginDescriptor,
  PluginHooks,
  PageContext,
  BeforeBuildContext,
  PostBuildContext,
  Capability,
  ActionContext,
  ActionHandler,
  EventHandler,
  SourceTools,
  BlockInfo,
  TextLocation,
  Engine,
} from '@docmd/api';
```
