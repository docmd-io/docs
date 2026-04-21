---
title: "Live-Vorschau"
description: "Betreiben Sie docmd mithilfe der Live-Architektur vollständig im Browser, ohne Backend-Server."
---

`docmd` verfügt über eine modulare Architektur, die Dateisystemoperationen von der Kernverarbeitungslogik trennt. Dies ermöglicht es der Dokumentations-Engine, **vollständig im Browser** zu laufen, was Live-Editoren und CMS-Vorschauen ohne die Notwendigkeit eines Node.js-Backends ermöglicht.

<!-- SCREENSHOT: Ein in eine Dokumentationsseite eingebettetes Live-Vorschaufenster, das links einen Code-Editor und rechts die gerenderte HTML-Ausgabe zeigt, wobei sich die Vorschau in Echtzeit aktualisiert. -->

::: button "Live-Editor öffnen" https://live.docmd.io

## Der Live-Editor

Der integrierte Live-Editor bietet eine leistungsstarke Oberfläche mit geteilter Ansicht. Verfassen Sie Ihr Markdown im linken Bereich und beobachten Sie, wie die gerenderte Ausgabe im rechten Bereich in Echtzeit synchronisiert wird.

### Lokale Ausführung

Um den Live-Editor lokal in Ihrem Projekt zu starten:

```bash
docmd live
```

### Statische Distribution

Generieren Sie eine eigenständige, statische Version des Editors für das Hosting auf Plattformen wie Vercel oder GitHub Pages:

```bash
docmd live --build-only
```

Dies generiert ein `dist/`-Verzeichnis, das den Einstiegspunkt `index.html` und die gebündelte isomorphe Engine `docmd-live.js` enthält.

## docmd einbetten

Sie können das browserkompatible Bundle in Ihre eigenen Anwendungen integrieren, um interne Markdown-Rendering- oder Vorschaufunktionen bereitzustellen.

### 1. Ressourcen-Integration

Binden Sie die erforderlichen CSS- und JavaScript-Bundles aus Ihren Assets oder von einem CDN ein:

```html
<link rel="stylesheet" href="/assets/css/docmd-main.css">
<script src="/docmd-live.js"></script>
```

### 2. Isomorphe API

Das globale `docmd`-Objekt stellt die Methode `compile` für sofortiges Rendering zur Verfügung.

```javascript
const html = await docmd.compile(markdown, {
  siteTitle: 'Dynamische Vorschau',
  theme: { appearance: 'dark' }
});

// In einen Iframe zur Stil-Isolation einfügen
document.getElementById('preview-frame').srcdoc = html;
```

::: callout tip "KI-Feedbackschleifen"
Die Live-Architektur ist ideal für die Erstellung von **KI-Agenten-Sandboxes**. Anstatt einem Agenten Schreibzugriff auf das Dateisystem zu gewähren, können Sie dessen vorgeschlagene Dokumentationsänderungen in einen Live-Kompilierungspuffer leiten. Dies ermöglicht es Ihnen, KI-Vorschläge in einer Testumgebung visuell zu verifizieren, bevor Sie die Änderungen in Ihr Repository übernehmen.
:::