---
title: "Live-Editor"
description: "Verstehen Sie den docmd Live-Editor und seinen browserbasierten Authoring-Workflow."
---

Der docmd Live-Editor ist eine dedizierte Umgebung für das Echtzeit-Authoring von Dokumentation. Er verwendet den isomorphen Core, um eine sofortige, nebeneinander liegende Vorschau Ihrer Markdown-Inhalte zu bieten — ohne Backend-Build-Prozess.

## Editor starten

Starten Sie den lokalen Live-Editor mit:

```bash
npx @docmd/core live
```

Der Editor ist typischerweise unter `http://localhost:3000` verfügbar.

## Architektur

Anders als der Standard-`dev`-Server, der Dateien auf der Festplatte neu aufbaut, läuft der Live-Editor die Engine direkt in Ihrem Browser. Das ermöglicht:

1.  **Sofortiges Feedback**: Inhalte werden beim Tippen neu gerendert.
2.  **Portable Playgrounds**: Der Editor kann in eine statische Site gebündelt und auf Plattformen wie GitHub Pages gehostet werden.
3.  **Cross-Platform-Konsistenz**: Die Vorschau verwendet exakt dieselbe Render-Logik wie der Produktions-Build.

## Statisches Deployment

Generieren Sie eine teilbare, eigenständige Version des Editors:

```bash
npx @docmd/core live --build-only
```

Dies erzeugt ein `dist/`-Verzeichnis mit dem HTML des Editors und der gebündelten isomorphen Engine.