---
title: "Browser API (Client-Seite)"
description: "Interagieren Sie mit docmd aus dem Browser - Live-Kompilierung und Plugin-Kommunikation im Dev-Modus."
---

docmd bietet zwei Browser-APIs: die **isomorphe Compile-Engine** zum Rendern von Markdown im Browser und die **Dev-Mode-Plugin-API** zur Echtzeit-Kommunikation mit dem Dev-Server.

## Isomorphe Compile-Engine

Die Engine, die statische Sites in Node.js generiert, kann vollständig in einem Webbrowser laufen. Das ist ideal für den Bau von CMS-Vorschauen, interaktiven Playgrounds oder zum Einbetten von Dokumentation.

### Installation via CDN

```html
<!-- Kern-Styles -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- Die isomorphe Engine -->
<script src="https://unpkg.com/@docmd/live/public/docmd-live.js"></script>
```

### `docmd.compile(markdown, config)`

Kompiliert rohes Markdown in einen vollständigen HTML-Dokument-String unter Verwendung des docmd-Standard-Layouts.

**Parameter:**
- `markdown` (String): Der rohe Markdown-Inhalt.
- `config` (Object): Konfigurations-Überschreibungen (gleiches Schema wie `docmd.config.json`).

**Rückgabe:** `Promise<String>`: Das vollständige HTML-Dokument.

### Beispiel: Live-Vorschau

Um Style-Isolation zu gewährleisten, rendern Sie die Ausgabe in einem `<iframe>` unter Verwendung des Attributs `srcdoc`.

```javascript
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

async function updatePreview() {
  const html = await docmd.compile(editor.value, {
    "title": "Vorschau",
    "theme": { "appearance": "light" }
  });
  preview.srcdoc = html;
}

editor.addEventListener("input", updatePreview);
```

## Dev-Mode-Plugin-API

Während `npx @docmd/core dev` wird automatisch eine globale Variable `window.docmd` in jede Seite injiziert. Diese API ermöglicht Echtzeit-Kommunikation zwischen Browser-seitigem Plugin-Code und serverseitigen Action-Handlern via WebSocket-RPC.

::: callout info "Nur im Dev-Modus" icon:code
Die Plugin-API-Methoden unten sind nur während `npx @docmd/core dev` verfügbar. Sie sind in Produktions-Builds nicht enthalten.
:::

### `docmd.call(action, payload)`

Ruft einen serverseitigen Action-Handler auf, der von einem Plugin registriert wurde. Gibt ein Promise zurück, das mit dem Rückgabewert des Handlers aufgelöst wird.

```javascript
const threads = await docmd.call("threads:get-threads", {
  "file": "docs/getting-started.md"
});
console.log(threads);
```

Wenn die Action Quelldateien verändert, wird die Seite automatisch neu geladen, sobald das Promise aufgelöst wird.

### `docmd.send(name, data)`

Sendet ein "Fire-and-forget"-Event an den Server. Es wird keine Antwort zurückgegeben.

```javascript
docmd.send("analytics:page-view", {
  "path": window.location.pathname
});
```

### `docmd.on(name, callback)`

Abonniert vom Server gesendete Events. Gibt eine Unsubscribe-Funktion zurück.

```javascript
const unsub = docmd.on("threads:updated", (data) => {
  console.log("Threads aktualisiert:", data);
});

unsub();
```

### `docmd.afterReload(name, callback)`

Registriert einen Handler, der nach einem Page-Reload ausgeführt wird. Wenn Kontext via `scheduleReload` gespeichert wurde, empfängt der Callback diese Daten.

```javascript
// Scroll-Position nach einem Live-Reload wiederherstellen
docmd.afterReload('scroll-restore', (ctx) => {
  window.scrollTo(0, ctx.scrollY);
});
```

### `docmd.scheduleReload(name, context)`

Speichert Kontext im `sessionStorage` für einen benannten `afterReload`-Handler. Der passende Handler wird nach dem nächsten Page-Reload mit diesem Kontext aufgerufen.

```javascript
docmd.scheduleReload("scroll-restore", {
  "scrollY": window.scrollY
});
```

## Hinweise

- **Kein Dateisystem**: Die Browser-Engine kann keine Ordner scannen. Sie müssen das `navigation`-Array explizit im Config-Objekt angeben, falls Sie eine Sidebar benötigen.
- **Node-only Plugins**: Plugins, die auf Node.js-APIs angewiesen sind (wie Sitemap oder LLM-Text-Generierung), sind in der Browser-Umgebung deaktiviert.
- **WebSocket-Verbindung**: Die Dev-Mode-API erfordert eine aktive WebSocket-Verbindung zum Dev-Server. Sie verbindet sich automatisch mit exponentiellem Backoff neu, falls die Verbindung abbricht.