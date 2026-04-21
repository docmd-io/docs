---
title: "Live-Editor"
description: "Verständnis des docmd Live-Editors und seines browserbasierten Authoring-Workflows."
---

Der `docmd` Live-Editor ist eine spezialisierte Umgebung für das Schreiben von Dokumentationen in Echtzeit. Er nutzt den isomorphen Kern von `docmd`, um eine sofortige Side-by-Side-Vorschau Ihrer Markdown-Inhalte zu ermöglichen, ohne dass ein Backend-Build-Prozess erforderlich ist.

## Editor starten

Starten Sie den lokalen Live-Editor mit dem Befehl:

```bash
docmd live
```

Der Editor ist normalerweise unter `http://localhost:3000` erreichbar.

## Architektur

Im Gegensatz zum Standard-`dev`-Server, der Dateien auf der Festplatte neu baut, führt der Live-Editor die `docmd`-Engine direkt in Ihrem Browser aus. Dies ermöglicht:

1.  **Sofortiges Feedback**: Inhalte werden bereits während des Schreibens neu gerendert.
2.  **Portable Playgrounds**: Der Editor kann in eine statische Website gebündelt werden, um beispielsweise auf GitHub Pages gehostet zu werden.
3.  **Plattformübergreifende Konsistenz**: Die Vorschau nutzt exakt dieselbe Rendering-Logik wie der Produktions-Build.

## Statische Bereitstellung

Generieren Sie eine teilbare, eigenständige Version des Editors:

```bash
docmd live --build-only
```

Dies erstellt ein `dist/`-Verzeichnis, das das HTML des Editors und die gebündelte isomorphe Engine enthält.