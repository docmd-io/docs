---
title: "Browser API"
description: "Clientseitige APIs für docmd – isomorphe Rendering-Engine und Dev-Modus-WebSocket-Plugin-Kommunikation."
---

docmd bietet zwei clientseitige APIs: die **Isomorphe Kompilierungs-Engine** zum Rendern von Markdown in Browserkontexten und die **Dev-Modus Plugin API** zur Kommunikation mit dem lokalen Entwicklungsserver.

## Isomorphe Kompilierungs-Engine

Die Markdown-Rendering-Engine läuft nahtlos in Browserumgebungen. Verwenden Sie sie, um Live-Editor-Vorschauen, interaktive Playgrounds oder eingebettete Dokumentations-Widgets zu erstellen.

### CDN-Integration

```html
<!-- Haupt-Theme-Stylesheets -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- Isomorphe Rendering-Engine -->
<script src="https://unpkg.com/@docmd/live/public/docmd-live.js"></script>
```

### `docmd.compile(markdown, config)`

Kompiliert rohes Markdown unter Verwendung von docmd-Seitenvorlagen in ein vollständiges HTML-Dokument.

* **`markdown`** (`string`): Roher Markdown-Quelltext.
* **`config`** (`object`): Konfigurations-Overrides (entspricht dem `docmd.config.json`-Schema).
* **Rückgabe**: `Promise<string>`, das zum kompilierten HTML-Dokument aufgelöst wird.

### Beispiel für eine Live-Vorschau-Implementierung

Rendern Sie Ausgaben in `<iframe>`-Elementen mit `srcdoc`, um eine vollständige Stil-Isolierung zu gewährleisten:

```javascript
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

async function updatePreview() {
  const html = await docmd.compile(editor.value, {
    title: "Vorschau",
    theme: { appearance: "light" }
  });
  preview.srcdoc = html;
}

editor.addEventListener("input", updatePreview);
```

## Dev-Modus Plugin API

Während der Ausführung von `npx @docmd/core dev` wird ein globales `window.docmd`-Objekt in bereitgestellte Seiten injiziert. Diese Schnittstelle ermöglicht es browserseitigen Plugin-Komponenten, über WebSocket-RPC mit serverseitigen Action-Handlern zu kommunizieren.

::: callout info "Nur im Entwicklungsmodus" icon:code
Die Dev-Modus Plugin API ist ausschließlich während `npx @docmd/core dev`-Sitzungen verfügbar und wird in Produktions-Builds weggelassen.
:::

### `docmd.call(action, payload)`

Sendet RPC-Aufrufe an serverseitige Action-Handler, die von Plugins registriert wurden. Gibt ein Promise zurück, das zum Handler-Ergebnis aufgelöst wird:

```javascript
const threads = await docmd.call("threads:get-threads", {
  file: "docs/getting-started.md"
});
console.log(threads);
```

### `docmd.send(name, data)`

Überträgt Fire-and-Forget-Events an den Dev-Server, ohne auf Antworten zu warten:

```javascript
docmd.send("analytics:page-view", {
  path: window.location.pathname
});
```

### `docmd.on(name, callback)`

Abonniert vom Server gesendete WebSocket-Events. Gibt eine Abmeldefunktion zurück:

```javascript
const unsubscribe = docmd.on("threads:updated", (data) => {
  console.log("Threads aktualisiert:", data);
});

unsubscribe();
```

### Status-Persistenz bei Hot-Reloads

```javascript
// Kontext vor Hot-Reload speichern
docmd.scheduleReload("scroll-restore", {
  scrollY: window.scrollY
});

// Kontext nach Reload wiederherstellen
docmd.afterReload("scroll-restore", (ctx) => {
  window.scrollTo(0, ctx.scrollY);
});
```
