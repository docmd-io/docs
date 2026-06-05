---
title: "Live-Vorschau"
description: "Führen Sie die Engine mithilfe der Live-Architektur vollständig im Browser ohne Backend-Server aus."
---

Der Compiler verfügt über eine modulare Architektur, die Dateisystemoperationen von der Kernlogik trennt. Dies ermöglicht es der Engine, vollständig im Browser zu laufen, und erleichtert Live-Editoren sowie CMS-Vorschauen ohne ein Node.js-Backend.

<img width="720" class="with-border" src="/assets/previews/live-editor-preview.webp">

::: button "Live-Editor öffnen" external:https://live.docmd.io

## Der Live-Editor

Der integrierte Live-Editor bietet eine leistungsstarke Split-Pane-Oberfläche. Schreiben Sie Ihr Markdown im linken Bereich und sehen Sie in Echtzeit, wie die gerenderte Ausgabe im rechten Bereich synchronisiert und aktualisiert wird.

### Lokale Ausführung

Starten Sie den Live-Editor lokal in Ihrem Projekt:

```bash
npx @docmd/core live
```

### Statische Bereitstellung

Generieren Sie eine eigenständige, statische Version des Editors, die Sie auf Plattformen wie Vercel oder GitHub Pages hosten können:

```bash
npx @docmd/core live --build-only
```

Dies erzeugt ein `dist/`-Verzeichnis mit der Einstiegsdatei `index.html` und der gebündelten `docmd-live.js`-Engine.

## Einbetten von @docmd/core

Integrieren Sie das browserkompatible Bundle in Ihre eigenen Anwendungen, um interne Markdown-Rendering- oder Vorschaufähigkeiten bereitzustellen.

### 1. Ressourcen-Integration

Binden Sie die erforderlichen CSS- und JavaScript-Bundles aus Ihren Assets oder einem CDN ein:

```html
<link rel="stylesheet" href="/assets/css/docmd-main.css">
<script src="/docmd-live.js"></script>
```

### 2. Isomorphe API

Das globale `docmd`-Objekt stellt die `compile`-Methode für sofortiges Rendering bereit.

```javascript
const html = await docmd.compile(markdown, {
  "title": "Dynamische Vorschau",
  "theme": { "appearance": "dark" }
});


document.getElementById("preview-frame").srcdoc = html;
```

::: callout tip "KI-Feedback-Schleifen" icon:sparkles
Die Live-Architektur ist ideal für den Aufbau von **KI-Agenten-Sandboxes**. Leiten Sie die vorgeschlagenen Änderungen eines Agenten in einen Live-Kompilierungspuffer. Überprüfen Sie KI-Vorschläge visuell, bevor Sie die Änderungen in Ihr Repository übernehmen.
:::