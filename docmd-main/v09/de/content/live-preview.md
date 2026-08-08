---
title: "Live-Vorschau"
description: "Führen Sie die docmd-Engine vollständig im Browser aus unter Verwendung der Browser-Compiler-Architektur von @docmd/live in docmd."
---

Die `docmd`-Compiler-Architektur entkoppelt Dateisystem-I/O-Operationen von der zentralen Markdown-Parsing-Logik. Die Core-Engine kann vollständig im Browser ausgeführt werden und treibt Live-Editoren, CMS-Vorschaufenster und dynamische Webanwendungen an, ohne ein Server-Backend zu erfordern.

<img width="720" class="with-border" src="/assets/previews/live-editor-preview.webp" alt="docmd Live Editor Interface">

::: button "Live-Editor öffnen" external:https://live.docmd.io

## Der Live-Editor

Der integrierte Live-Editor bietet einen hochperformanten Split-Pane-Erstellungs-Workspace. Schreiben Sie Markdown im linken Bereich und beobachten Sie, wie sich die gerenderte HTML-Ausgabe in Echtzeit auf der rechten Seite aktualisiert.

### Lokale Entwicklungsausführung

Starten Sie den Live-Editor lokal in Ihrem Projekt-Workspace:

```bash
npx @docmd/core live
```

### Statischer Distributions-Build

Kompilieren Sie eine eigenständige, statische Version der Live-Editor-Benutzeroberfläche für das Hosting auf Vercel, Cloudflare Pages oder GitHub Pages:

```bash
npx @docmd/core live --no-serve
```

Dies kompiliert statische Assets in das Ausgabeverzeichnis, einschließlich des Einstiegspunkts `index.html` und der gebündelten `@docmd/live`-Browser-Engine.

## Einbetten von @docmd/live

Integrieren Sie das browserkompatible Bundle in Webanwendungen von Drittanbietern, um `docmd`-Markdown clientseitig zu rendern.

### 1. Ressourcen-Integration

Binden Sie das Stylesheet und das JavaScript-Bundle aus statischen Assets oder vom CDN ein:

```html
<link rel="stylesheet" href="/assets/css/docmd-main.css">
<script src="/docmd-live.js"></script>
```

### 2. Browser-Compiler-API

Das globale `docmd`-Objekt stellt eine asynchrone `compile`-Methode für sofortiges clientseitiges Rendern bereit:

```javascript
const html = await docmd.compile(markdown, {
  "title": "Dynamic Live Preview",
  "theme": { "appearance": "dark" }
});

document.getElementById("preview-frame").srcdoc = html;
```

::: callout tip "KI-Feedback & Validierungs-Sandboxes" icon:sparkles
Die `@docmd/live`-Browser-Architektur eignet sich ideal für den Aufbau von **KI-Agent-Sandboxes**. Leiten Sie von Agenten generiertes Markdown direkt in einen Live-Kompilierungspuffer für die sofortige visuelle Überprüfung, bevor Sie Änderungen in Ihrem Git-Repository committen.
:::