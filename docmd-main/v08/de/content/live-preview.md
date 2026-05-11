---
title: "Live-Vorschau"
description: "Integrieren Sie die docmd-Rendering-Engine in Ihre eigenen Web-Interfaces für sofortige Dokumentationsvorschauen im Browser."
---

Die `docmd`-Live-Vorschau-Architektur ermöglicht es Ihnen, die produktionsreife Markdown-Rendering-Engine direkt in benutzerdefinierte Editoren, CMS-Dashboards oder webbasierte IDEs zu bringen.

### 1. Ressourcen-Integration

Binden Sie die erforderlichen CSS- und JavaScript-Bundles aus Ihren Assets oder einem CDN ein:

```html
<link rel="stylesheet" href="/assets/css/docmd-main.css">
<script src="/docmd-live.js"></script>
```

### 2. Isomorphe API

Das globale `docmd`-Objekt bietet die `compile`-Methode für verzögerungsfreies Rendering.

```javascript
const html = await docmd.compile(markdown, {
  siteTitle: 'Dynamische Vorschau',
  theme: { appearance: 'dark' }
});

// In einen Iframe injizieren für Stil-Isolation
document.getElementById('preview-frame').srcdoc = html;
```

::: callout tip "KI-Feedback-Schleifen"
Die Live-Architektur ist ideal für den Aufbau von **KI-Agenten-Sandboxes**. Anstatt einem Agenten Schreibzugriff auf das Dateisystem zu gewähren, können Sie dessen vorgeschlagene Dokumentationsänderungen in einen Live-Kompilierungspuffer leiten. Dies ermöglicht es Ihnen, KI-Vorschläge in einer "Ghost"-Umgebung visuell zu überprüfen, bevor Sie Änderungen in Ihr Repository übernehmen.
:::