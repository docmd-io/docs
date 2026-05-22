---
title: "Plugins entwickeln"
description: "Ein umfassender Leitfaden zur Erweiterung von docmd mit benutzerdefinierter Logik, Dateneinfügung und interaktiven Funktionen."
---

Plugins sind der primäre Erweiterungsmechanismus für `docmd`. Sie ermöglichen das Einfügen von benutzerdefiniertem HTML, das Ändern der Markdown-Parslogik, das Einschleusen von Build-Zeit-Daten vor dem Template-Rendering und die Automatisierung von Post-Build-Aufgaben. Dieser Leitfaden beschreibt die Plugin-API und Best Practices für die Erstellung wiederverwendbarer Komponenten.

## Plugin-Deskriptor

Jedes Plugin sollte einen `plugin`-Deskriptor exportieren, der seine Identität und Fähigkeiten deklariert. Dies ermöglicht der Engine, Fähigkeitsgrenzen beim Laden zu validieren, zu isolieren und durchzusetzen.

```javascript
export default {
  plugin: {
    name: 'my-analytics',
    version: '1.0.0',
    capabilities: ['head', 'body', 'post-build']
  },

  generateScripts: (config, opts) => { ... },
  onPostBuild: async (ctx) => { ... }
};
```

> **Hinweis:** Der Deskriptor ist derzeit optional (Soft-Deprecation-Warnung). Er wird **ab 0.8.0 erforderlich sein**.

## Kern-Fähigkeiten

Das `capabilities`-Array bestimmt, welche Hooks Ihr Plugin verwenden darf.

| Fähigkeit | Erlaubte Hooks | Phase |
| :--- | :--- | :--- |
| `init` | `onConfigResolved` | Init |
| `markdown` | `markdownSetup` | Setup |
| `head` | `generateMetaTags`, `generateScripts` (head) | Rendering |
| `body` | `generateScripts` (body) | Rendering |
| `build` | `onBeforeParse`, `onAfterParse`, `onBeforeRender`, `onPageReady` | Build |
| `post-build`| `onPostBuild` | Post-Build |
| `dev` | `onDevServerReady` | Dev-Server |
| `assets` | `getAssets` | Ausgabe |
| `actions` | `actions` | Interaktiv |
| `events` | `events` | Interaktiv |
| `translations`| `translations` | i18n |

Legacy-Plugins ohne Deskriptor erhalten vollen Zugriff auf alle Hooks, sodass während der Übergangsphase nichts abbricht.

## Plugin-API-Referenz

Ein `docmd`-Plugin ist ein Standard-JavaScript-Objekt (oder ein Modul, das eines als Standard exportiert), das einen oder mehrere der folgenden Hooks implementiert.

| Hook | Beschreibung |
| :--- | :--- |
| `markdownSetup(md, opts)` | Erweitert die `markdown-it`-Instanz. Synchron. |
| `generateMetaTags(config, page, root)` | Fügt `<meta>`- oder `<link>`-Tags in den `<head>` ein. |
| `generateScripts(config, opts)` | Gibt ein Objekt mit `headScriptsHtml` und `bodyScriptsHtml` zurück. |
| `getAssets(opts)` | Definiert externe Dateien oder CDN-Skripte zum Einbinden. |
| `onPostBuild(ctx)` | Führt Logik nach der Generierung aller HTML-Dateien aus. |
| `translations(localeId)` | Gibt ein Objekt mit übersetzten Strings für das angegebene Gebietsschema zurück. |
| `actions` | Objekt mit benannten Aktions-Handlern für WebSocket-RPC-Aufrufe vom Browser. |
| `events` | Objekt mit benannten Event-Handlern für Fire-and-Forget-Nachrichten vom Browser. |

## Ein lokales Plugin erstellen

Ein Plugin zu erstellen ist so einfach wie das Definieren einer JavaScript-Datei. Zum Beispiel `my-plugin.js`:

```javascript
// my-plugin.js
import path from 'path';

export default {
  plugin: {
    name: 'my-plugin',
    version: '1.0.0',
    capabilities: ['head', 'post-build']
  },

  markdownSetup: (md, options) => {
    // Beispiel: Regel hinzufügen oder markdown-it-Plugin verwenden
  },

  generateMetaTags: async (config, page, relativePathToRoot) => {
    return `<meta name="x-build-id" content="${config._buildHash}">`;
  },

  onPostBuild: async ({ config, pages, outputDir, log, options }) => {
    log(`Benutzerdefiniertes Plugin: ${pages.length} Seiten überprüft.`);
  }
};
```

Verweisen Sie in Ihrer `docmd.config.js` über den **vollständigen Paketnamen** auf Ihr Plugin:

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    'my-awesome-plugin': {
      // Ihre benutzerdefinierten Optionen hier
    }
  }
});
```

> **Hinweis:** Kurzformen (z.B. `math`, `search`) sind ausschließlich für offizielle `@docmd/plugin-*`-Pakete reserviert. Drittanbieter-Plugins müssen immer mit ihrem vollständigen npm-Paketnamen referenziert werden.

### Plugin-Isolierung

Jeder Hook-Aufruf ist in eine try/catch-Grenze eingebettet. Ein defektes Plugin kann den Build nicht zum Absturz bringen oder andere Plugins stören. Fehler werden protokolliert und am Ende des Builds in einer Zusammenfassung gesammelt.

## Lebenszyklus-Hooks

docmd bietet tiefe Integrations-Hooks, die es Plugins ermöglichen, Konfiguration, Rohquellen und Seitendaten während der gesamten Build-Pipeline zu manipulieren.

| Hook | Beschreibung | Erwarteter Rückgabewert |
| :--- | :--- | :--- |
| **`onConfigResolved(config)`** | Liest oder modifiziert die aktive normalisierte Konfiguration direkt nach der Initialisierung. | `void` oder `Promise<void>` |
| **`onDevServerReady(server, wss)`** | Gibt den rohen Node.js `http.Server` und `WebSocketServer` im Entwicklungsmodus frei. | `void` oder `Promise<void>` |
| **`onBeforeParse(src, frontmatter)`** | Vorverarbeitet rohe Markdown-Zeichenkettendaten unmittelbar bevor sie zur Analyse übergeben werden. | `string` oder `Promise<string>` |
| **`onAfterParse(html, frontmatter)`** | Nachverarbeitet den generierten HTML-Code, der das Markdown-Body-Segment darstellt. | `string` oder `Promise<string>` |
| **`onBeforeRender(page)`** | Wird vor dem Template-Rendering aufgerufen. Empfängt den vollständigen `PageContext`. Änderungen an `frontmatter` und `html` werden in der gerenderten Ausgabe widergespiegelt. | `void` oder `Promise<void>` |
| **`onPageReady(page)`** | Greift auf die vollständig zusammengestellten Seitenmetadaten zu, kurz bevor die Seite in die Zieldatei geschrieben wird. | `void` oder `Promise<void>` |

### Multi-Threaded Hintergrundaufgaben (`runWorkerTask`)

Ab Version 0.8.0 verarbeitet docmd Markdown in einem persistenten, mehrfädigen `WorkerPool`. Plugins können ihre eigenen I/O- oder CPU-intensiven Aufgaben auf diese Threads auslagern, anstatt den Haupt-Build-Thread zu blockieren.

Die Methode `runWorkerTask` wird in `PageContext`, `PostBuildContext` und `ActionContext` injiziert.

```javascript
export default {
  plugin: { name: "my-plugin", version: "1.0.0", capabilities: ["post-build"] },
  
  onPostBuild: async (ctx) => {
    // Übergeben Sie den absoluten Pfad zu Ihrem Worker-Skript, den exportierten Funktionsnamen und ein Array von Argumenten
    const result = await ctx.runWorkerTask('/absolute/path/to/worker.js', 'parseData', [ctx.outputDir]);
  }
}
```

### `onBeforeRender` und `PageContext`

Der `onBeforeRender`-Hook ist der richtige Ort für Plugins, die Build-Zeit-Daten aus der Quelldatei einschleusen müssen - Datei-Metadaten lesen, benutzerdefinierte Frontmatter-Felder berechnen oder Daten aus externen Quellen laden.

```typescript
interface PageContext {
  sourcePath: string;           // Absoluter Pfad zur .md-Quelldatei. Immer gesetzt.
  frontmatter: Record<string, any>; // Veränderbar - Änderungen in der Template-Ausgabe widergespiegelt
  html: string;                 // Veränderbar - gerenderter Markdown-Body
  localeId?: string;
  versionId?: string;
  relativePathToRoot?: string;
}
```

```javascript
export default {
  plugin: {
    name: 'my-metadata-plugin',
    version: '1.0.0',
    capabilities: ['build']
  },

  onBeforeRender: async (page) => {
    // sourcePath ist immer verfügbar - kein Raten oder Pfadkonstruktion nötig
    const stats = fs.statSync(page.sourcePath);
    page.frontmatter.wordCount = page.html.split(/\s+/).length;
    page.frontmatter.fileSize = stats.size;
  }
};
```

## Vertiefung: Asset-Einbindung

Der `getAssets()`-Hook ermöglicht es Ihrem Plugin, clientseitige Logik sicher zu bündeln.

```javascript
getAssets: (options) => {
  return [
    {
      url: 'https://cdn.example.com/lib.js',
      type: 'js',
      location: 'head'
    },
    {
      src: path.join(__dirname, 'plugin-init.js'),
      dest: 'assets/js/plugin-init.js',
      type: 'js',
      location: 'body'
    }
  ];
}
```

## Plugins übersetzen (i18n)

Plugins, die clientseitige UI rendern, sollten übersetzbare Strings über den `translations(localeId)`-Hook bereitstellen.

```javascript
export default {
  plugin: {
    name: 'my-plugin',
    version: '1.0.0',
    capabilities: ['translations', 'body']
  },

  translations: (localeId) => {
    try {
      const p = path.join(__dirname, 'i18n', `${localeId}.json`);
      return JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch { }
    try {
      const p = path.join(__dirname, 'i18n', 'en.json');
      return JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch { }
    return {};
  }
}
```

## WebSocket-RPC-Aktionen

Plugins können **Aktions-Handler** und **Event-Handler** registrieren, die auf dem Dev-Server laufen und über die `window.docmd`-API vom Browser aufrufbar sind.

```javascript
export default {
  plugin: {
    name: 'my-live-plugin',
    version: '1.0.0',
    capabilities: ['actions', 'events']
  },

  actions: {
    'my-plugin:save-note': async (payload, ctx) => {
      const content = await ctx.readFile(payload.file);
      const updated = content + '\n\n> ' + payload.note;
      await ctx.writeFile(payload.file, updated);
      return { saved: true };
    }
  },

  events: {
    'my-plugin:page-viewed': (data, ctx) => {
      console.log(`Seite aufgerufen: ${data.path}`);
    }
  }
};
```

Das `ctx`-Objekt (ActionContext) bietet:

| Methode | Beschreibung |
| :--- | :--- |
| `ctx.readFile(path)` | Liest eine Datei relativ zum Projektstamm. |
| `ctx.writeFile(path, content)` | Schreibt eine Datei (löst Rebuild + Reload aus). |
| `ctx.readFileLines(path)` | Liest eine Datei als Zeilenarray. |
| `ctx.broadcast(event, data)` | Sendet ein Event an alle verbundenen Browser. |
| `ctx.source` | Quellbearbeitungswerkzeuge für blockbasierte Markdown-Manipulation. |
| `ctx.projectRoot` | Absoluter Pfad zum Projektstamm. |
| `ctx.config` | Aktuelle docmd-Seitenkonfiguration. |

::: callout info "Nur Entwicklungsmodus 🛡️"
Das WebSocket-RPC-System ist nur während `docmd dev` aktiv. Produktions-Builds enthalten weder den API-Client noch serverseitige Aktionsverarbeitung.
:::

## Best Practices

1.  **Fähigkeiten deklarieren**: Exportieren Sie immer einen `plugin`-Deskriptor mit Ihren deklarierten Fähigkeiten. Ab `0.8.0` wird dies erforderlich sein.
2.  **`onBeforeRender` für Dateneinfügung verwenden**: Wenn Ihr Plugin die Quelldatei liest oder Frontmatter-Felder berechnet, verwenden Sie `onBeforeRender` - nicht `generateMetaTags`. `sourcePath` ist im `PageContext` immer verfügbar.
3.  **Async/Await**: Verwenden Sie immer `async`-Funktionen für `onPostBuild`, `onBeforeRender` und Aktions-Handler.
4.  **Zustandslosigkeit**: Vermeiden Sie die Beibehaltung von Zustand im Plugin-Objekt, da `docmd` Plugins während Entwicklungs-Rebuilds neu initialisieren kann.
5.  **Namenskonvention**: Für Community-Plugins, stellen Sie `docmd-plugin-` voran (z.B. `docmd-plugin-analytics`).
6.  **Aktions-Namensräume**: Stellen Sie Ihren Plugin-Namen voran (z.B. `my-plugin:save-note`) um Kollisionen zu vermeiden.
7.  **Aktionsvalidierung**: Definieren Sie immer ein explizites Payload-Schema in Ihren Aktionen.
8.  **Logging**: Verwenden Sie den bereitgestellten `log()`-Helfer in `onPostBuild`.

::: callout tip "KI-optimiertes Design 🤖"
Die `docmd`-Plugin-API ist **LLM-optimal** gestaltet. Da die Hooks Standard-JavaScript-Objekte und -Typen ohne versteckte komplexe Klassenhierarchien verwenden, können KI-Agenten fehlerfreie benutzerdefinierte Plugins mit minimaler Anleitung generieren.
:::