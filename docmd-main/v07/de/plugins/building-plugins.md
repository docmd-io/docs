---
title: "Plugins erstellen"
description: "Ein umfassender Leitfaden zur Erweiterung von docmd um benutzerdefinierte Logik und interaktive Funktionen."
---

Plugins sind der primäre Erweiterungsmechanismus für `docmd`. Sie ermöglichen es Ihnen, eigenes HTML einzufügen, die Markdown-Parsing-Logik zu modifizieren und Post-Build-Aufgaben zu automatisieren. Dieser Leitfaden beschreibt die Plugin-API und Best Practices für die Erstellung teilbarer Komponenten.

## Plugin-Deskriptor

Ab Version `0.7.1` sollte jedes Plugin einen `plugin`-Deskriptor exportieren, der seine Identität und Fähigkeiten deklariert. Dies ermöglicht es der Engine, beim Laden Validierungen durchzuführen, Isolation zu gewährleisten und Fähigkeitsgrenzen durchzusetzen.

```javascript
export default {
  plugin: {
    name: 'mein-analytics',
    version: '1.0.0',
    capabilities: ['head', 'body', 'post-build']
  },

  generateScripts: (config, opts) => { ... },
  onPostBuild: async (ctx) => { ... }
};
```

> **Hinweis:** Der Deskriptor ist derzeit optional (es wird eine Warnung ausgegeben). Ab **Version 0.8.0 wird er zwingend erforderlich** sein.

## Kernfähigkeiten (Capabilities)

Das Array `capabilities` im Deskriptor legt fest, welche Hooks Ihr Plugin verwenden darf.

| Fähigkeit | Erlaubte Hooks | Phase |
| :--- | :--- | :--- |
| `init` | `onConfigResolved` | Initialisierung |
| `markdown` | `markdownSetup` | Setup |
| `head` | `generateMetaTags`, `generateScripts` (head) | Rendering |
| `body` | `generateScripts` (body) | Rendering |
| `build` | `onBeforeParse`, `onAfterParse`, `onPageReady` | Build |
| `post-build`| `onPostBuild` | Post-Build |
| `dev` | `onDevServerReady` | Dev-Server |
| `assets` | `getAssets` | Ausgabe |
| `actions` | `actions` | Interaktiv |
| `events` | `events` | Interaktiv |
| `translations`| `translations` | i18n |

Ältere Plugins ohne Deskriptor erhalten vollen Zugriff auf alle Hooks, damit während des Übergangs nichts kaputt geht.

## Plugin-API-Referenz

Ein `docmd`-Plugin ist ein standardmäßiges JavaScript-Objekt (oder ein Modul, das ein solches als Standard exportiert), das einen oder mehrere der folgenden Hooks implementiert.

| Hook | Beschreibung |
| :--- | :--- |
| `markdownSetup(md, opts)` | Erweitert die `markdown-it`-Instanz. Synchron. |
| `generateMetaTags(config, page, root)` | Fügt `<meta>`- oder `<link>`-Tags in den `<head>` ein. |
| `generateScripts(config, opts)` | Gibt ein Objekt mit `headScriptsHtml` und `bodyScriptsHtml` zurück. |
| `getAssets(opts)` | Definiert externe Dateien oder CDN-Skripte zum Einfügen. |
| `onPostBuild(ctx)` | Führt Logik nach der Generierung aller HTML-Dateien aus. |
| `translations(localeId)` | Gibt ein Objekt mit übersetzten Strings für die angegebene Sprache zurück. |
| `actions` | Ein Objekt mit benannten Action-Handlern für WebSocket RPC-Aufrufe vom Browser. |
| `events` | Ein Objekt mit benannten Event-Handlern für „Fire-and-forget“-Nachrichten vom Browser. |

## Erstellen eines lokalen Plugins

Das Erstellen eines Plugins ist so einfach wie das Definieren einer JavaScript-Datei. Zum Beispiel `mein-plugin.js`:

```javascript
// mein-plugin.js
import path from 'path';

export default {
  // Plugin-Deskriptor (empfohlen)
  plugin: {
    name: 'mein-plugin',
    version: '1.0.0',
    capabilities: ['head', 'post-build']
  },

  // 1. Markdown-Parser erweitern
  markdownSetup: (md, options) => {
    // Beispiel: Regel hinzufügen oder ein markdown-it-Plugin verwenden
  },

  // 2. Seitenvmetadaten einfügen
  generateMetaTags: async (config, page, relativePathToRoot) => {
    return `<meta name="x-build-id" content="${config._buildHash}">`;
  },

  // 3. Post-Build-Automatisierung
  onPostBuild: async ({ config, pages, outputDir, log, options }) => {
    log(`Custom Plugin: ${pages.length} Seiten verifiziert.`);
    // Beispiel: Benutzerdefiniertes Manifest oder Benachrichtigung generieren
  }
};
```

Um Ihr Plugin zu aktivieren, referenzieren Sie seinen **vollständigen Paketnamen** in Ihrer `docmd.config.js`:

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    'mein-tolles-plugin': {
      // Ihre benutzerdefinierten Optionen kommen hierhin
    }
  }
});
```

> **Hinweis:** Kurznamen (z. B. `math`, `search`) sind exklusiv den offiziellen `@docmd/plugin-*`-Paketen vorbehalten. Drittanbieter-Plugins müssen immer über ihren vollständigen npm-Paketnamen referenziert werden.

### Plugin-Auflösung
Die `docmd`-Engine löst Plugin-Namen wie folgt auf:
- **Offizielle Kurznamen** (`math`, `search`, `seo` etc.) werden automatisch zu `@docmd/plugin-<name>` erweitert. Da der `@docmd`-npm-Scope dem Projekt gehört, können darunter nur offizielle Pakete existieren.
- **Drittanbieter-Plugins** müssen ihren vollständigen Paketnamen verwenden (z. B. `mein-tolles-plugin`, `@meinorg/docmd-extras`). Es gibt kein Alias- oder Kurznamen-System für externe Plugins — dies beugt Verwirrung vor und eliminiert Supply-Chain-Angriffsszenarien vollständig.

### Plugin-Isolation
Jeder Hook-Aufruf ist in eine Try/Catch-Grenze gehüllt. Ein fehlerhaftes Plugin kann den Build nicht zum Absturz bringen oder andere Plugins beeinträchtigen. Fehler werden protokolliert und am Ende des Builds in einer Zusammenfassung gesammelt.

### Plugin-Gültigkeitsbereich (`noStyle`)
Standardmäßig fügen Plugins ihr CSS/JS universell ein. Entwickler können jedoch explizit verhindern, dass ihr Plugin auf `noStyle`-Seiten (wie minimalistischen Landing-Templates) gerendert wird, indem sie einen `noStyle`-Boolean exportieren:

```javascript
export default {
  noStyle: false, // Verhindert, dass generateMetaTags und generateScripts auf noStyle-Seiten laufen

  generateScripts: () => { ... }
}
```
Benutzer können dieses Verhalten über ihre Konfiguration (`plugins: { math: { noStyle: false } }`) oder dynamisch über das Markdown-Frontmatter (`plugins: { math: true }`) überschreiben.

## Erweiterte Lebenszyklus-Hooks
Docmd `0.7.1` erweitert den Build-Prozess um tiefe Integrations-Hooks, die es Plugins ermöglichen, Konfigurationen, Rohquellen und HTML-Darstellungen während der Generierung zu manipulieren.

| Hook | Beschreibung | Erwartete Rückgabe |
| :--- | :--- | :--- |
| **`onConfigResolved(config)`** | Liest oder modifiziert die aktive normalisierte `config` direkt nach der Initialisierung. | `void` oder `Promise<void>` |
| **`onDevServerReady(server, wss)`** | Exponiert den rohen Node.js `http.Server` und `WebSocketServer` während des Entwicklungsmodus (`docmd dev`). | `void` oder `Promise<void>` |
| **`onBeforeParse(src, frontmatter)`** | Verarbeitet den rohen Markdown-String vor, unmittelbar bevor dieser zum Parsen an markdown-it übergeben wird. | `string` oder `Promise<string>` |
| **`onAfterParse(html, frontmatter)`** | Verarbeitet das generierte HTML nach, das den Körper des Markdown-Abschnitts darstellt. | `string` or `Promise<string>` |
| **`onPageReady(page)`** | Greift auf die vollständig zusammengebauten Metadaten der Seite zu (`page.html`, `page.outputPath`, `page.frontmatter`), kurz bevor diese in die Zieldatei geschrieben werden. | `void` oder `Promise<void>` |

## Deep Dive: Asset-Injektion
Der Hook `getAssets()` ermöglicht es Ihrem Plugin, clientseitige Logik sicher mit auszuliefern.

```javascript
getAssets: (options) => {
  return [
    {
      url: 'https://cdn.beispiel.de/lib.js', // Externes CDN-Skript
      type: 'js',
      location: 'head'
    },
    {
      src: path.join(__dirname, 'plugin-init.js'), // Lokale Quelle
      dest: 'assets/js/plugin-init.js',            // Ziel in build/
      type: 'js',
      location: 'body'
    }
  ];
}
```

## Übersetzen von Plugins (i18n)
Plugins, die eine clientseitige UI rendern, sollten übersetzbare Strings über den Hook `translations(localeId)` bereitstellen. Die docmd-Engine ruft diesen Hook während des Build-Prozesses auf, führt die Ergebnisse mit den Kernsystem-Strings und Benutzer-Überschreibungen zusammen und reicht sie weiter.

## WebSocket-RPC-Aktionen
Ab Version `0.6.8` können Plugins **Action-Handler** und **Event-Handler** registrieren, die auf dem Dev-Server laufen und vom Browser aus über die `window.docmd`-API aufrufbar sind.

```javascript
// mein-live-plugin.js
export default {
  plugin: {
    name: 'mein-live-plugin',
    version: '1.0.0',
    capabilities: ['actions', 'events']
  },

  // Serverseitige Aktion — Browser ruft via docmd.call() auf
  actions: {
    'mein-plugin:save-note': async (payload, ctx) => {
      const content = await ctx.readFile(payload.file);
      const updated = content + '\n\n> ' + payload.note;
      await ctx.writeFile(payload.file, updated);
      return { saved: true };
    }
  },

  // Serverseitiges Event — Browser sendet via docmd.send()
  events: {
    'mein-plugin:page-viewed': (data, ctx) => {
      console.log(`Seite aufgerufen: ${data.path}`);
    }
  }
};
```

Das `ctx`-Objekt (ActionContext) bietet u.a.: `ctx.readFile(path)`, `ctx.writeFile(path, content)`, `ctx.broadcast(event, data)`, `ctx.config`. Alle Dateioperationen sind auf das Projekt-Root beschränkt.

::: callout info "Nur im Dev-Modus 🛡️"
Das WebSocket-RPC-System ist nur während `docmd dev` aktiv. Produktions-Builds enthalten weder den API-Client noch serverseitige Action-Handler.
:::

## Best Practices

1.  **Fähigkeiten deklarieren**: Exportieren Sie immer einen `plugin`-Deskriptor. Dies wird in `0.8.0` zwingend erforderlich sein.
2.  **Async/Await**: Verwenden Sie immer `async`-Funktionen für `onPostBuild` und Action-Handler, um die Build-Engine nicht zu blockieren.
3.  **Namenskonvention**: Stellen Sie bei Community-Plugins Ihrem Paketnamen den Präfix `docmd-plugin-` voran.
4.  **Aktions-Namespacing**: Stellen Sie Ihren Aktionsnamen den Namen Ihres Plugins voran (z. B. `mein-plugin:save-note`).
5.  **Logging**: Nutzen Sie den bereitgestellten `log()`-Helper, damit Ihre Nachrichten die `--verbose`-Einstellungen des Benutzers respektieren.

::: callout tip "KI-bereites Design 🤖"
Die Plugin-API von `docmd` ist auf **optimale LLM-Nutzung** ausgelegt. Da die Hooks Standard-JavaScript-Objekte und Typen ohne versteckte komplexe Klassenhierarchien verwenden, können KI-Agenten mit minimalen Anweisungen fehlerfreie benutzerdefinierte Plugins für Sie generieren.
:::