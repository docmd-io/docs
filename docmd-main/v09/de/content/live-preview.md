---
title: "Live-Vorschau"
description: "Führen Sie die Engine vollständig im Browser aus — ohne Backend-Server mit der Live-Architektur."
---

Der Compiler trennt Dateisystem-Operationen von der Kernlogik. Die Kern-Engine kann daher vollständig im Browser laufen und Live-Editoren sowie CMS-Vorschauen ohne Node.js-Backend antreiben.

<img width="720" class="with-border" src="/assets/previews/live-editor-preview.webp">

::: button "Live-Editor öffnen" external:https://live.docmd.io

## Der Live-Editor

Der eingebaute Live-Editor bietet eine performante Split-Pane-Oberfläche. Verfassen Sie Ihr Markdown im linken Bereich. Beobachten Sie, wie die gerenderte Ausgabe in Echtzeit im rechten Bereich aktualisiert und synchronisiert wird.

### Lokale Ausführung

Starten Sie den Live-Editor lokal in Ihrem Projekt:

```bash
npx @docmd/core live
```

### Statische Distribution

Erzeugen Sie eine eigenständige, statische Version des Editors. Hosten Sie sie auf Plattformen wie Vercel oder GitHub Pages:

```bash
npx @docmd/core live --build-only
```

Dies erzeugt ein `dist/`-Verzeichnis. Es enthält den `index.html`-Einstiegspunkt und die gebündelte `docmd-live.js`-Engine.

## @docmd/core einbetten

Fügen Sie das browserkompatible Bundle zu einer Drittanbieter-App hinzu, um Markdown auf dem Client zu rendern.

### 1. Ressourcenintegration

Binden Sie die CSS- und JavaScript-Bundles aus Ihren Assets oder einem CDN ein:

```html
<link rel="stylesheet" href="/assets/css/docmd-main.css">
<script src="/docmd-live.js"></script>
```

### 2. Isomorphe API

Das globale `docmd`-Objekt stellt eine `compile`-Methode für sofortiges Rendern bereit.

```javascript
const html = await docmd.compile(markdown, {
  "title": "Dynamic Preview",
  "theme": { "appearance": "dark" }
});


document.getElementById("preview-frame").srcdoc = html;
```

::: callout tip "KI-Feedback-Schleifen" icon:sparkles
Die Live-Architektur ist ideal für den Aufbau von **KI-Agent-Sandboxes**. Leiten Sie die vorgeschlagenen Änderungen eines Agenten in einen Live-Compilation-Puffer. Überprüfen Sie KI-Vorschläge visuell, bevor Sie Änderungen in Ihrem Repository committen.
:::