---
title: "Node.js API"
description: "Integrieren Sie die Build-Engine von docmd in Ihre benutzerdefinierten Node.js-Skripte und Automatisierungs-Pipelines."
---

Für fortgeschrittene Workflows können Sie die `docmd`-Build-Engine direkt in Ihren eigenen Node.js-Anwendungen importieren und verwenden. Dies ist ideal für benutzerdefinierte CI/CD-Pipelines, automatisierte Dokumentationserstellung oder die Erweiterung von `docmd` für spezialisierte Umgebungen.

## Installation

Stellen Sie sicher, dass `@docmd/core` in Ihrem Projekt installiert ist:

```bash
npm install @docmd/core
```

## Kernfunktionen

### `buildSite(configPath, options)`

Die primäre Build-Funktion. Sie übernimmt das Laden der Konfiguration, das Parsen von Markdown und die Generierung von Assets.

```javascript
import { buildSite } from '@docmd/core';

async function runBuild() {
  await buildSite('./docmd.config.js', {
    isDev: false,      // Auf true setzen für Watch-Modus-Logik
    offline: false,    // Auf true setzen zur Optimierung für file:// Zugriff
    zeroConfig: false  // Auf true setzen, um die Erkennung der Konfigurationsdatei zu umgehen
  });
}
```

### `buildLive(options)`

Erzeugt das Bundle für den browserbasierten **Live Editor**.

```javascript
import { buildLive } from '@docmd/core';

async function generateEditor() {
  await buildLive({
    serve: false, // true startet einen lokalen Server; false erzeugt statische Dateien
    port: 3000    // Benutzerdefinierter Port, wenn serve true ist
  });
}
```

## Beispiel: Benutzerdefinierte Pipeline

Sie können `docmd` kapseln, um komplexe Dokumentations-Workflows zu erstellen.

```javascript
import { buildSite } from '@docmd/core';
import fs from 'fs-extra';

async function deploy() {
  // 1. Dynamische Inhalte generieren
  await fs.writeFile('./docs/dynamic.md', '# Generierter Inhalt');

  // 2. docmd-Build ausführen
  await buildSite('./docmd.config.js');

  // 3. Ausgabe verschieben
  await fs.move('./site', './public/docs');
}
```

::: callout tip
Die programmatische API ist hochgradig kompatibel mit **KI-gesteuerter Dokumentation**. Agenten können Builds nach Inhaltsaktualisierungen auslösen, um die Integrität zu prüfen und Bereitstellungen autonom zu verwalten.
:::

## Plugin-API (`@docmd/api`)

Das Paket `@docmd/api` ist die dedizierte Heimat für das Plugin-System. Es bietet Hook-Registrierung, WebSocket-RPC-Dispatch, Quellcode-Editierwerkzeuge und **zentralisierte URL-Utilities**.

```bash
npm install @docmd/api
```

### URL-Utilities

Plugins sollten diese zentralisierten Utilities verwenden, anstatt eine eigene URL-Logik zu implementieren.

#### `outputPathToSlug(outputPath)`

Konvertiert einen Ausgabe-Pfad der Build-Engine in einen sauberen Slug im Verzeichnis-Stil.

```javascript
import { outputPathToSlug } from '@docmd/api';

outputPathToSlug('guide/index.html');   // → 'guide/'
outputPathToSlug('index.html');         // → '/'
outputPathToSlug('de/v1/api/index.html'); // → 'de/v1/api/'
```

#### `outputPathToPathname(outputPath)`

Konvertiert in einen Wurzel-relativen Pfadnamen (Pathname).

```javascript
import { outputPathToPathname } from '@docmd/api';

outputPathToPathname('guide/index.html'); // → '/guide/'
outputPathToPathname('index.html');       // → '/'
```

#### `outputPathToCanonical(outputPath, siteUrl)`

Erstellt eine vollständige kanonische URL.

```javascript
import { outputPathToCanonical } from '@docmd/api';

outputPathToCanonical('guide/index.html', 'https://example.com');
// → 'https://example.com/guide/'
```

#### `sanitizeUrl(url)`

Fasst Doppelschrägstriche zusammen (außer nach dem Protokoll).

```javascript
import { sanitizeUrl } from '@docmd/api';

sanitizeUrl('https://example.com//path/'); // → 'https://example.com/path/'
sanitizeUrl('/foo//bar/');                  // → '/foo/bar/'
```

#### `buildAbsoluteUrl(base, localePrefix, versionPrefix, pagePath)`

Erstellt eine absolute URL mit Locale- und Versions-Präfixen.

```javascript
import { buildAbsoluteUrl } from '@docmd/api';

buildAbsoluteUrl('/', 'de/', 'v1/', 'guide/');
// → '/de/v1/guide/'
```

#### `resolveHref(href)`

Normalisiert vom Benutzer geschriebene Hrefs zu sauberen URLs. Behandelt das Entfernen von `.md`, abschließende Schrägstriche sowie `external:` und `raw:` Präfixe.

```javascript
import { resolveHref } from '@docmd/api';

resolveHref('overview.md');
// → { href: 'overview/', isExternal: false, isRaw: false }

resolveHref('external:https://github.com/docmd-io/docmd');
// → { href: 'https://github.com/docmd-io/docmd', isExternal: true, isRaw: false }

resolveHref('raw:docs/readme.md');
// → { href: 'docs/readme.md', isExternal: false, isRaw: true }
```

### Vorberechnete Seiten-URLs

Jedes Seiten-Objekt enthält vorberechnete URL-Daten. Plugins können diese direkt lesen — keine Berechnung erforderlich.

```javascript
export async function onPostBuild({ pages, config }) {
  for (const page of pages) {
    console.log(page.urls.slug);      // "guide/"
    console.log(page.urls.canonical); // "https://example.com/guide/"
    console.log(page.urls.pathname);  // "/guide/"
  }
}
```

| Eigenschaft | Typ | Beschreibung |
|:------------|:-----|:------------|
| `slug` | `string` | Sauberer Slug im Verzeichnis-Stil (z. B. `guide/` oder `/`) |
| `canonical` | `string` | Vollständige kanonische URL (nur wenn `config.url` gesetzt ist) |
| `pathname` | `string` | Wurzel-relativer Pfad (z. B. `/guide/`) |

> **Abwärtskompatibilität:** Alle Exporte aus `@docmd/api` werden auch aus `@docmd/core` re-exportiert, sodass bestehender Code ohne Änderungen weiterhin funktioniert. Neue Projekte werden ermutigt, direkt aus `@docmd/api` zu importieren.

### `createActionDispatcher(hooks, options)`

Erstellt einen Dispatcher, der WebSocket-RPC-Nachrichten an Plugin-Aktions-/Event-Handler leitet.

```javascript
import { createActionDispatcher } from '@docmd/api';

const dispatcher = createActionDispatcher(
  { actions: myPlugin.actions, events: myPlugin.events },
  { projectRoot: '/path/to/project', config, broadcast }
);

const { result, reload } = await dispatcher.handleCall('my-action', payload);
```

### `createSourceTools({ projectRoot })`

Erstellt Werkzeuge zur Quellcode-Bearbeitung für die Manipulation von Markdown-Dateien.

```javascript
import { createSourceTools } from '@docmd/api';

const source = createSourceTools({ projectRoot: '/path/to/project' });

// Block-Informationen an einem bestimmten Zeilenbereich abrufen
const block = await source.getBlockAt('docs/page.md', [10, 12]);

// Text mit Syntax-Markierungen umschließen
await source.wrapText('docs/page.md', [10, 12], 'important', 0, '**', '**');
```

### `loadPlugins(config, options)`

Lädt, validiert und registriert alle in der Konfiguration deklarierten Plugins. Gibt das gefüllte Hook-Register zurück.

```javascript
import { loadPlugins, hooks } from '@docmd/api';

const registeredHooks = await loadPlugins(config, {
  resolvePaths: [__dirname]  // Hilft beim Auflösen von Plugins in pnpm-Workspaces
});
```

### Typ-Exporte

Für TypeScript-Plugin-Autoren stehen folgende Typen zur Verfügung:

```typescript
import type {
  PluginModule,       // Vollständiges Plugin-Vertragsinterface
  PluginDescriptor,   // Plugin-Metadaten (Name, Version, Fähigkeiten)
  PluginHooks,        // Form des Hook-Registers
  Capability,         // Deklaration der Hook-Kategorie (init, body, actions, etc.)
  ActionContext,      // Kontext, der an Aktions-/Event-Handler übergeben wird
  ActionHandler,      // Signatur für Aktions-Handler
  EventHandler,       // Signatur für Event-Handler
  SourceTools,        // Interface für Quellcode-Editierwerkzeuge
  BlockInfo,          // Von getBlockAt zurückgegebene Block-Informationen
  TextLocation,       // Von findText zurückgegebene Textposition
} from '@docmd/api';
```