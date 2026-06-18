---
title: "Plugins entwickeln"
description: "Ein umfassender Leitfaden zur Erweiterung von docmd mit benutzerdefinierter Logik, Dateninjektion und interaktiven Funktionen."
---

Plugins sind der primäre Erweiterungsmechanismus für docmd. Sie ermöglichen es Ihnen, HTML zu injizieren, das Markdown-Parsing zu modifizieren, Build-Zeit-Daten zu injizieren und Post-Build-Aufgaben zu automatisieren. Dieser Leitfaden beschreibt die Plugin-API.

## Plugin-Deskriptor

Jedes Plugin muss einen `plugin`-Deskriptor exportieren, der seine Identität und Fähigkeiten deklariert. Dies ermöglicht es der Engine, Grenzen beim Laden zu validieren und zu isolieren.

```javascript
  "plugin": {
    "name": "my-analytics",
    "version": "1.0.0",
    "capabilities": ["head", "body", "post-build"]
  },

  "generateScripts": (config, opts) => { ... },
  "onPostBuild": async (ctx) => { ... }
```

> **Hinweis:** Der Deskriptor ist zwingend erforderlich. Plugins ohne ihn können nicht geladen werden.

## Kernfähigkeiten

Das `capabilities`-Array bestimmt, welche Hooks Ihr Plugin verwenden darf.

| Fähigkeit | Erlaubte Hooks | Phase |
| :--- | :--- | :--- |
| `init` | `onConfigResolved` | Init |
| `markdown` | `markdownSetup` | Setup |
| `head` | `generateMetaTags`, `generateScripts` (head) | Render |
| `body` | `generateScripts` (body) | Render |
| `build` | `onBeforeParse`, `onAfterParse`, `onBeforeBuild`, `onBeforeRender`, `onPageReady` | Build |
| `post-build`| `onPostBuild` | Post-Build |
| `dev` | `onDevServerReady` | Dev-Server |
| `assets` | `getAssets` | Output |
| `actions` | `actions` | Interactive |
| `events` | `events` | Interactive |
| `translations`| `translations` | i18n |
| `template` *(neu in 0.8.7)* | `templates`, `templateAssets` | Render |

> **Hinweis:** Die `template`-Fähigkeit ist exklusiv — wenn ein Plugin sie deklariert, kann es nicht auch `head`, `build`, `post-build` usw. deklarieren. Templates liefern nur Slots und Assets; sie führen keine Lebenszyklus-Hooks aus. Wenn Sie beides benötigen, liefern Sie zwei separate Pakete.

## Plugin-API-Referenz

Ein docmd-Plugin ist ein Standard-JavaScript-Objekt, das einen oder mehrere der folgenden Hooks implementiert.

| Hook | Beschreibung |
| :--- | :--- |
| `markdownSetup(md, opts)` | Erweitern Sie die `markdown-it`-Instanz. Synchron. |
| `generateMetaTags(config, page, root)` | Injizieren Sie `<meta>`- oder `<link>`-Tags in den `<head>`. |
| `generateScripts(config, opts)` | Geben Sie ein Objekt zurück, das `headScriptsHtml` und `bodyScriptsHtml` enthält. |
| `getAssets(opts)` | Definieren Sie externe Dateien oder CDN-Skripte zum Injizieren. |
| `onPostBuild(ctx)` | Logik ausführen, nachdem alle HTML-Dateien generiert wurden. |
| `translations(localeId)` | Geben Sie ein Objekt mit übersetzten Strings für die angegebene Locale zurück. |
| `actions` | Ein Objekt benannter Action-Handler für WebSocket-RPC-Aufrufe. |
| `events` | Ein Objekt benannter Event-Handler für Browser-Nachrichten. |
| `templates[]` *(neu in 0.8.7, Fähigkeit: `template`)* | Array von `TemplateHook`-Einträgen — jeder `{ type, templatePath }` überschreibt einen EJS-Slot. |
| `templateAssets[]` *(neu in 0.8.7, Fähigkeit: `template`)* | Array von `TemplateAssetHook`-Einträgen — jeder `{ type, path, priority?, position? }` liefert das CSS/JS-Bundle des Templates. |

### Ein Template-Plugin entwickeln (neu in 0.8.7)

Ein Template ist ein Plugin mit `capabilities: ['template']`. Es liefert ein `templates[]`-Array (Slot-Überschreibungen) und ein `templateAssets[]`-Array (CSS/JS-Bundle). Siehe den dedizierten [Templates-Leitfaden](../theming/templates.md) und [Theming → Templates](../theming/templates.md) für die vollständige Authoring-Anleitung, Slot-Tabelle und Auflösungskette. Das minimal lebensfähige Template sieht so aus:

```javascript "index.js"
export default {
  plugin: {
    name: 'template-foo',
    version: '1.0.0',
    capabilities: ['template'],
  },
  templates: [
    { type: 'menubar', templatePath: '/abs/path/to/templates/partials/menubar.ejs' },
    { type: 'footer',  templatePath: '/abs/path/to/templates/partials/footer.ejs' },
  ],
  templateAssets: [
    { type: 'css', path: '/abs/path/to/assets/css/foo.css', priority: 10, position: 'head' },
  ],
};
```

## Ein lokales Plugin erstellen

Ein Plugin zu erstellen ist so einfach wie das Definieren einer JavaScript-Datei. Zum Beispiel `my-plugin.js`:

```javascript "my-plugin.js"
import path from "path";

export default {
  plugin: {
    "name": "my-plugin",
    "version": "1.0.0",
    "capabilities": ["head", "post-build"]
  },

  markdownSetup: (md, options) => {
    // Benutzerdefinierte Parser-Regeln hinzufügen
  },

  generateMetaTags: async (config, page, relativePathToRoot) => {
    return `<meta name="x-build-id" content="${config._buildHash}">`;
  },

  onPostBuild: async ({ config, pages, outputDir, log, options }) => {
    log(`Custom Plugin: Verified ${pages.length} pages.`);
  }
};
```

Um Ihr Plugin zu aktivieren, referenzieren Sie seinen **vollständigen Paketnamen** in Ihrer `docmd.config.json`:

```json "docmd.config.json"
  "plugins": {
    "my-awesome-plugin": {}
  }
```

> **Hinweis:** Kurznamen (z. B. `math`, `search`) sind offiziellen `@docmd/plugin-*`-Paketen vorbehalten. Drittanbieter-Plugins müssen immer ihren vollständigen npm-Paketnamen verwenden.

### Plugin-Auflösung

Die docmd-Engine löst Plugin-Namen wie folgt auf:
- **Offizielle Kurznamen** (`math`, `search`) werden zu `@docmd/plugin-<name>` erweitert. Nur offizielle Pakete dürfen unter dem `@docmd`-Scope existieren.
- **Drittanbieter-Plugins** müssen ihren vollständigen Paketnamen verwenden (z. B. `my-awesome-plugin`, `@myorg/docmd-extras`). Es gibt kein Alias-System für externe Plugins. Dies eliminiert Supply-Chain-Angriffsvektoren.

### Plugin-Isolation

Jeder Hook-Aufruf ist in einen try/catch-Block eingeschlossen. Ein defektes Plugin kann den Build nicht zum Absturz bringen oder andere Plugins stören. Fehler werden protokolliert und in einer Zusammenfassung gesammelt.

### Plugins einschränken (`noStyle`)

Plugins injizieren ihr CSS/JS standardmäßig universell. Entwickler können explizit verhindern, dass ihr Plugin auf `noStyle`-Seiten rendert, indem sie einen `noStyle`-Boolean exportieren:

```javascript
export default {
  noStyle: false,

  generateScripts: () => { ... }
}
```

Benutzer können dies über die Konfiguration (`plugins: { math: { noStyle: false } }`) oder dynamisch über das Markdown-Frontmatter (`plugins: { math: true }`) überschreiben.

## Lebenszyklus-Hooks

Docmd bietet Deep-Integration-Hooks. Sie ermöglichen Plugins die Manipulation von Konfiguration, Roh-Quellen und Seitendaten.

| Hook | Beschreibung | Erwartete Rückgabe |
| :--- | :--- | :--- |
| **`onConfigResolved(config)`** | Liest oder modifiziert die aktive Konfiguration direkt nach der Initialisierung. | `void` oder `Promise<void>` |
| **`onDevServerReady(server, wss)`** | Stellt den rohen Node.js-Server während `npx @docmd/core dev` bereit. | `void` oder `Promise<void>` |
| **`onBeforeParse(src, frontmatter, filePath?)`** | Verarbeitet Markdown-Roh-String-Daten direkt vor dem Parsing vor. | `string` oder `Promise<string>` |
| **`onAfterParse(html, frontmatter, filePath?)`** | Verarbeitet generiertes HTML, das den Markdown-Body darstellt, nach. | `string` oder `Promise<string>` |
| **`onBeforeBuild(ctx)`** | Wird aufgerufen, nachdem alles Markdown geparst wurde, aber bevor HTML generiert wird. Für schwere Vorabberechnungen verwendet. | `void` oder `Promise<void>` |
| **`onBeforeRender(page)`** | Wird vor dem Template-Rendering aufgerufen. Änderungen an `frontmatter` und `html` spiegeln sich in der Ausgabe wider. | `void` oder `Promise<void>` |
| **`onPageReady(page)`** | Greift auf vollständig zusammengestellte Seiten-Metadaten zu, kurz bevor sie in die Zieldatei geschrieben werden. | `void` oder `Promise<void>` |

### Engine-Beschleunigung & Hintergrundaufgaben (`runWorkerTask`)

docmd führt intensive Operationen über eine **Pluggable Engine Architecture** aus. Plugins können benutzerdefinierte schwere I/O- oder CPU-gebundene Subroutinen einfach über die konfigurierte Build-Engine (z. B. JavaScript- oder native Rust-Worker) auslagern.

Die Methode `runWorkerTask` wird transparent in `PageContext`, `PostBuildContext` und `ActionContext` injiziert.

```javascript "my-plugin.js"
{
  "plugin": { "name": "my-plugin", "version": "1.0.0", "capabilities": ["post-build"] },

  "onPostBuild": async (ctx) => {
    // Übergeben Sie einen registrierten Engine-Action-Namen oder einen absoluten Skriptpfad
    const result = await ctx.runWorkerTask('/path/to/worker.js', 'parseData', [ctx.outputDir]);
  }
}
```

### Datenabruf und Indizierung (`onBeforeBuild`)

Der `onBeforeBuild`-Hook läuft *nach* dem Markdown-Parsing, aber *bevor* die HTML-Rendering-Schleife beginnt. Er ist optimal für schwere Datenindizierung oder API-Aufrufe.

Er empfängt den `BeforeBuildContext`, der alle `pages` und die `tui`-Instanz enthält. Dies ermöglicht es Plugins, isolierte Fortschrittsbalken anzuzeigen.

```typescript
export async function onBeforeBuild({ pages, tui }) {
  tui.step('Fetching remote plugin data', 'WAIT');

  let processed = 0;
  for (const page of pages) {
    if (page.sourcePath) {
      page.frontmatter.remoteData = await fetchHeavyData(page.sourcePath);
    }
    processed++;
    if (processed % 10 === 0 || processed === pages.length) {
      tui.progress('Fetching remote plugin data', processed, pages.length);
    }
  }

  tui.step('Fetching remote plugin data', 'DONE');
}
```

### `onBeforeRender` und PageContext

Verwenden Sie `onBeforeRender`, um aus der Quelldatei abgeleitete Build-Zeit-Daten zu injizieren.

```typescript
interface PageContext {
  sourcePath: string;
  frontmatter: Record<string, any>;
  html: string;
  localeId?: string;
  versionId?: string;
  relativePathToRoot?: string;
  runWorkerTask<T = any>(modulePath: string, functionName: string, args: any[]): Promise<T>;
}
```

```javascript "my-metadata-plugin.js"
export default {
  plugin: {
    name: "my-metadata-plugin",
    version: "1.0.0",
    capabilities: ["build"]
  },

  onBeforeRender: async (page) => {
    const stats = fs.statSync(page.sourcePath);
    page.frontmatter.wordCount = page.html.split(/\s+/).length;
    page.frontmatter.fileSize = stats.size;
  }
}
```

## Tiefer Einblick: Asset-Injektion

Der `getAssets()`-Hook ermöglicht es Ihrem Plugin, Client-seitige Logik sicher zu bündeln.

```javascript "index.js"
export default {
  getAssets: (options) => {
    return [
      {
        url: "https://example.com/script.js",
        type: "js",
        location: "head"
      },
      {
        src: path.join(__dirname, "plugin-init.js"),
        dest: "assets/js/plugin-init.js",
        type: "js",
        location: "body"
      }
    ];
  }
}
```

## Plugins übersetzen (i18n)

Plugins, die Client-seitige UI rendern, sollten Strings über den `translations(localeId)`-Hook bereitstellen. Die Engine führt diese automatisch mit den Core-Strings zusammen.

Das Standardmuster speichert eine JSON-Datei für jede Sprache in einem `i18n/`-Verzeichnis:

```javascript "index.js"
import fs from "fs";
import path from "path";

export default {
  plugin: {
    name: "my-plugin",
    version: "1.0.0",
    capabilities: ["translations", "body"]
  },

  translations: (localeId) => {
    try {
      const p = path.join(__dirname, "i18n", `${localeId}.json`);
      return JSON.parse(fs.readFileSync(p, "utf8"));
    } catch { }

    return {};
  }
}
```

## WebSocket-RPC-Actions

Plugins können **Action-Handler** und **Event-Handler** auf dem Dev-Server registrieren. Sie sind über die `window.docmd`-API vom Browser aus aufrufbar.

```javascript "index.js"
export default {
  plugin: {
    name: "my-live-plugin",
    version: "1.0.0",
    capabilities: ["actions", "events"]
  },

  actions: {
    "my-plugin:save-note": async (payload, ctx) => {
      const content = await ctx.readFile(payload.file);
      const updated = content + "\n\n> " + payload.note;
      await ctx.writeFile(payload.file, updated);
      return { "saved": true };
    }
  },

  events: {
    "my-plugin:page-viewed": (data, ctx) => {
      console.log(`Page viewed: ${data.path}`);
    }
  }
};
```

Das `ctx` (ActionContext) bietet:

| Methode | Beschreibung |
| :--- | :--- |
| `ctx.readFile(path)` | Liest eine Datei relativ zum Projektstamm. |
| `ctx.writeFile(path, content)` | Schreibt eine Datei (löst Rebuild + Reload aus). |
| `ctx.readFileLines(path)` | Liest eine Datei als Array von Zeilen. |
| `ctx.broadcast(event, data)` | Pusht ein Event an alle verbundenen Browser. |
| `ctx.runWorkerTask(module, fn, args)` | Lagert schwere CPU-Aufgaben in den Worker-Pool aus. |
| `ctx.source` | Quelltext-Bearbeitungswerkzeuge für block-level Markdown-Manipulation. |
| `ctx.projectRoot` | Absoluter Pfad zum Projektstamm. |
| `ctx.config` | Aktuelle docmd-Site-Konfiguration. |

Alle Dateioperationen sind auf den Projektstamm sandboxed.

::: callout info "Nur Dev-Modus 🛡️"
Das WebSocket-RPC-System ist nur während `npx @docmd/core dev` aktiv. Produktions-Builds enthalten weder den API-Client noch das serverseitige Action-Handling.
:::

## Best Practices

1.  **Fähigkeiten deklarieren**: Exportieren Sie immer einen `plugin`-Deskriptor mit deklarierten Fähigkeiten.
2.  **`onBeforeRender` für Dateninjektion verwenden**: Wenn Ihr Plugin Frontmatter-Felder berechnet, verwenden Sie `onBeforeRender`.
3.  **Async/Await**: Verwenden Sie immer `async`-Funktionen für `onPostBuild`, `onBeforeRender` und Action-Handler.
4.  **Zustandslosigkeit**: Vermeiden Sie die Pflege von Zuständen innerhalb des Plugin-Objekts. Die Engine kann Plugins dynamisch neu initialisieren.
5.  **Namenskonvention**: Community-Pakete sollten mit `docmd-plugin-` präfixiert werden.
6.  **Action-Namensraum**: Präfixieren Sie Action-Namen mit Ihrem Plugin-Namen (z. B. `my-plugin:save-note`).
7.  **Action-Validierung**: Definieren und verlangen Sie ein explizites Payload-Schema in Ihren Actions.
8.  **Logging**: Verwenden Sie den bereitgestellten `log()`-Helper in `onPostBuild`, um die Ausführlichkeitseinstellungen des Benutzers zu respektieren.

::: callout tip "KI-bereites Design 🤖"
Die docmd-Plugin-API ist **LLM-optimal**. Da die Hooks Standard-JavaScript-Objekte verwenden, können KI-Agenten mit minimaler Anleitung fehlerfreie Plugins generieren.
:::
