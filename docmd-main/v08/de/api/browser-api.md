---
title: "Browser-API (Clientseitig)"
description: "Interagieren Sie vom Browser aus mit docmd — Live-Kompilierung und Plugin-Kommunikation im Entwicklungsmodus."
---

`docmd` bietet zwei Browser-APIs: die **isomorphe Compile-Engine** zum Rendern von Markdown im Browser und die **Plugin-API für den Entwicklungsmodus** für die Echtzeitkommunikation mit dem Dev-Server.

## Isomorphe Compile-Engine

Dieselbe Engine, die statische Websites in Node.js generiert, kann vollständig in einem Webbrowser ausgeführt werden. Dies ist ideal für den Aufbau von CMS-Vorschauen, interaktiven Playgrounds oder die Einbettung von Dokumentationen in bestehende Webanwendungen.

### Installation via CDN

```html
<!-- Kern-Styles -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- Die isomorphe Engine -->
<script src="https://unpkg.com/@docmd/live/dist/docmd-live.js"></script>
```

### `docmd.compile(markdown, config)`

Kompiliert rohes Markdown unter Verwendung des Standard-`docmd`-Layouts in einen vollständigen HTML-Dokument-String.

**Parameter:**
- `markdown` (String): Der rohe Markdown-Inhalt.
- `config` (Object): Konfigurations-Überschreibungen (gleiches Schema wie `docmd.config.js`).

**Rückgabe:** `Promise<String>`: Das vollständige HTML-Dokument.

### Beispiel: Live-Vorschau

Um eine Stil-Isolation zu gewährleisten, wird empfohlen, die Ausgabe innerhalb eines `<iframe>` mittels des `srcdoc`-Attributs zu rendern.

```javascript
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

async function updatePreview() {
  const html = await docmd.compile(editor.value, {
    title: 'Vorschau',
    theme: { appearance: 'light' }
  });
  preview.srcdoc = html;
}

editor.addEventListener('input', updatePreview);
```

## Plugin-API für den Entwicklungsmodus

Während `docmd dev` aktiv ist, wird automatisch eine globale `window.docmd`-Variable in jede Seite eingefügt. Diese API ermöglicht die Echtzeitkommunikation zwischen clientseitigem Plugin-Code und serverseitigen Action-Handlern via WebSocket RPC.

::: callout info "Nur im Entwicklungsmodus"
Die unten aufgeführten Plugin-API-Methoden sind nur während `docmd dev` verfügbar. Sie sind nicht in Produktions-Builds enthalten.
:::

### `docmd.call(action, payload)`

Ruft einen serverseitigen Action-Handler auf, der von einem Plugin registriert wurde. Gibt ein Promise zurück, das mit dem Rückgabewert des Handlers aufgelöst wird.

```javascript
// Eine Plugin-Aktion aufrufen und das Ergebnis erhalten
const threads = await docmd.call('threads:get-threads', {
  file: 'docs/erste-schritte.md'
});
console.log(threads); // Array von Thread-Objekten
```

Wenn die Aktion Quelldateien modifiziert, lädt die Seite nach Auflösung des Promises automatisch neu.

### `docmd.send(name, data)`

Sendet ein „Fire-and-forget“-Ereignis an den Server. Es wird keine Antwort zurückgegeben.

```javascript
// Den Server über einen Seitenaufruf benachrichtigen
docmd.send('analytics:page-view', {
  path: window.location.pathname
});
```

### `docmd.on(name, callback)`

Abonniert vom Server gesendete Ereignisse (Server-pushed Events). Gibt eine Unsubscribe-Funktion zurück.

### `docmd.afterReload(name, callback)` & `docmd.scheduleReload(name, context)`

Ermöglichen die Erhaltung des Zustands (z. B. Scrollposition) über einen automatischen Neuladevorgang hinweg, indem Daten im `sessionStorage` zwischengespeichert werden.

## Wichtige Hinweise
- **Kein Dateisystem**: Die Browser-Engine kann keine Ordner scannen. Sie müssen das `navigation`-Array explizit im Konfigurationsobjekt angeben, wenn Sie eine Seitenleiste benötigen.
- **Node-only Plugins**: Plugins, die auf Node.js-APIs angewiesen sind (wie Sitemap oder LLM), sind im Browser deaktiviert.