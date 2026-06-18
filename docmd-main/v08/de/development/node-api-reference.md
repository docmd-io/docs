---
title: "Node-API-Referenz"
description: "Low-Level Node-API für Plugin-Autoren — URL-Utilities, Action-Dispatcher, Source-Tools, Engine-Loader und TypeScript-Typen."
---

> **Für Plugin-Autoren.** Wenn Sie docmd einfach nur *aus einem Node-Skript aufrufen* möchten, sehen Sie stattdessen [Build-API](/reference/build-api). Diese Seite behandelt die tieferen Utilities, die `@docmd/api` für das Schreiben von Plugins bereitstellt.

Das Paket `@docmd/api` ist die dedizierte Heimat des Plugin-Systems. Es stellt Hook-Registrierung, WebSocket-RPC-Dispatch, Source-Editing-Tools und zentrale URL-Utilities bereit.

```bash
npm install @docmd/api
```

> **Hinweis:** Alle Exporte aus `@docmd/api` sind auch aus `@docmd/core` verfügbar. Neue Projekte sollten direkt aus `@docmd/api` importieren.

## URL-Utilities

Plugins sollten diese zentralen Utilities verwenden, anstatt eigene URL-Logik zu implementieren.

### `outputPathToSlug(outputPath)`

Konvertiert einen Build-Engine-Ausgabepfad in einen sauberen Verzeichnis-Slug.

```javascript
import { outputPathToSlug } from '@docmd/api';

outputPathToSlug('guide/index.html');   // → 'guide/'
outputPathToSlug('index.html');         // → '/'
outputPathToSlug('de/v1/api/index.html'); // → 'de/v1/api/'
```

### `outputPathToPathname(outputPath)`

Konvertiert in einen root-relativen Pfadnamen.

```javascript
import { outputPathToPathname } from '@docmd/api';

outputPathToPathname('guide/index.html'); // → '/guide/'
outputPathToPathname('index.html');       // → '/'
```

### `outputPathToCanonical(outputPath, siteUrl)`

Erstellt eine vollständige kanonische URL.

```javascript
import { outputPathToCanonical } from "@docmd/api";

outputPathToCanonical("guide/index.html", "https://docs.example.com");
```

### `sanitizeUrl(url)`

Reduziert doppelte Schrägstriche (außer nach dem Protokoll).

```javascript
import { sanitizeUrl } from "@docmd/api";

sanitizeUrl("https://docs.example.com//guide"); // → "https://docs.example.com/guide"
sanitizeUrl("/foo//bar"); // → "/foo/bar"
```

### `buildAbsoluteUrl(base, localePrefix, versionPrefix, pagePath)`

Baut eine absolute URL mit Locale- und Versions-Prefixes.

```javascript
import { buildAbsoluteUrl } from '@docmd/api';

buildAbsoluteUrl('/', 'de/', 'v1/', 'guide/'); // → '/de/v1/guide/'
```

### `resolveHref(href)`

Normalisiert vom Benutzer geschriebene hrefs zu sauberen URLs. Behandelt das Strippen von `.md`, Trailing-Slashes sowie die Präfixe `external:` und `raw:`.

```javascript
import { resolveHref } from "@docmd/api";

resolveHref("overview.md"); // → "overview/"
resolveHref("external:https://github.com"); // → "https://github.com"
resolveHref("raw:docs/readme.md"); // → "docs/readme.md"
```

## Vorberechnete Seiten-URLs

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

## Action- & Event-Dispatch

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

## Engine-Loader-API

Die steckbare Engine-Architektur erlaubt die programmatische Auflösung und Instanziierung von Beschleunigungs-Schichten direkt über `@docmd/api`.

### `loadEngine(engineName)`

Löst das angeforderte Build-Engine-Backend auf und initialisiert es. Falls native Architektur-Binaries nicht verfügbar sind, fällt es sauber auf die hochperformante JavaScript-Engine zurück.

```javascript
import { loadEngine } from "@docmd/api";

const engine = await loadEngine("rust");
const gitLogResult = await engine.runWorkerTask("git:log", { "paths": ["docs/guide.md"] });
```

### `registerEngine(engineName, engineInstance)`

Erlaubt benutzerdefinierten Tools oder Drittanbieter-Integratoren, eigene Ausführungs-Engines programmatisch zu registrieren.

```javascript
import { registerEngine } from "@docmd/api";

registerEngine("custom", myCustomEngineImpl);
```

## Typ-Exporte

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

## Nächste Schritte

- [Plugins entwickeln](/development/building-plugins) — Einstiegspunkt.
- [Plugin-Beispiele](/development/plugin-examples) — vollständiger Plugin-Walkthrough.
- [Engines & Architektur](/development/engines/overview) — Rust-Engine, N-API und Engine-Loader-Internals.
