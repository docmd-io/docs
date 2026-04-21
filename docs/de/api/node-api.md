---
title: "Node.js-API"
description: "Integrieren Sie die Build-Engine von docmd direkt in Ihre benutzerdefinierten Node.js-Skripte und Automatisierungs-Pipelines."
---

Für fortgeschrittene Workflows können Sie die `docmd`-Build-Engine direkt in Ihre eigenen Node.js-Anwendungen importieren und verwenden. Dies ist ideal für benutzerdefinierte CI/CD-Pipelines, automatisierte Dokumentationsgenerierung oder die Erweiterung von `docmd` für spezielle Umgebungen.

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
    isDev: false,      // Auf true setzen für Watch-Mode-Logik
    offline: false,    // Auf true setzen für Optimierung auf file://-Zugriff
    zeroConfig: false  // Auf true setzen, um die Suche nach Konfigurationsdateien zu überspringen
  });
}
```

### `buildLive(options)`

Generiert das Bundle für den browserbasierten **Live-Editor**.

```javascript
import { buildLive } from '@docmd/core';

async function generateEditor() {
  await buildLive({
    serve: false, // true startet einen lokalen Server; false generiert statische Dateien
    port: 3000    // Benutzerdefinierter Port, falls serve true ist
  });
}
```

## Beispiel: Benutzerdefinierte Pipeline

Sie können `docmd` nutzen, um komplexe Dokumentations-Workflows zu erstellen.

```javascript
import { buildSite } from '@docmd/core';
import fs from 'fs-extra';

async function deploy() {
  // 1. Dynamische Inhalte generieren
  await fs.writeFile('./docs/dynamic.md', '# Generierter Inhalt');

  // 2. docmd build ausführen
  await buildSite('./docmd.config.js');

  // 3. Ausgabe verschieben
  await fs.move('./site', './public/docs');
}
```

::: callout tip
Die programmatische API ist hervorragend mit **KI-gesteuerter Dokumentation** kompatibel. Agenten können Builds nach Inhaltsaktualisierungen auslösen, um die Integrität zu prüfen und Bereitstellungen autonom zu verwalten.
:::

## Plugin-API (`@docmd/api`)

Das Paket `@docmd/api` ist das dedizierte Zuhause für das Plugin-System. Es bietet Hook-Registrierung, WebSocket-RPC-Dispatching und Werkzeuge zur Bearbeitung von Quelldateien.

```bash
npm install @docmd/api
```

> **Abwärtskompatibilität:** Alle Exporte aus `@docmd/api` werden auch von `@docmd/core` re-exportiert, sodass bestehender Code ohne Änderungen weiter funktioniert. Neue Projekte sollten jedoch direkt aus `@docmd/api` importieren.

### `createActionDispatcher(hooks, options)`

Erstellt einen Dispatcher, der WebSocket-RPC-Nachrichten an Plugin-Action/Event-Handler weiterleitet.

```javascript
import { createActionDispatcher } from '@docmd/api';

const dispatcher = createActionDispatcher(
  { actions: myPlugin.actions, events: myPlugin.events },
  { projectRoot: '/pfad/zum/projekt', config, broadcast }
);

const { result, reload } = await dispatcher.handleCall('my-action', payload);
```

### `createSourceTools({ projectRoot })`

Erstellt Werkzeuge zur Bearbeitung von Quellcodedateien (Markdown).

```javascript
import { createSourceTools } from '@docmd/api';

const source = createSourceTools({ projectRoot: '/pfad/zum/projekt' });

// Block-Informationen in einem bestimmten Zeilenbereich abrufen
const block = await source.getBlockAt('docs/page.md', [10, 12]);

// Text mit Syntax-Markern umschließen
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

### Typen-Exporte

Für Entwickler von TypeScript-Plugins stehen die folgenden Typen zur Verfügung: `PluginModule`, `PluginDescriptor`, `PluginHooks`, `Capability`, `ActionContext`, `ActionHandler`, `EventHandler`, `SourceTools`, `BlockInfo`, `TextLocation`.