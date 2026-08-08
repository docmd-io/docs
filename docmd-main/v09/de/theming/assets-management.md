---
title: "Asset-Verwaltung"
description: "Erfahren Sie, wie docmd CSS-, JavaScript- und Bild-Assets aus Quellverzeichnissen in Ausgabebuilds spiegelt."
---

`docmd` verwendet eine "Spiegeln & Zuordnen"-Architektur für statische Assets. Dies stellt sicher, dass lokale Entwicklungsdateipfade nahtlos mit kompilierten Produktions-Build-Ausgaben übereinstimmen.

## Verzeichnisstruktur

Standardmäßig verarbeitet `docmd` ein `assets/`-Verzeichnis im Stammverzeichnis Ihres Projekts:

```bash
my-docs/
  ├── assets/          # Quell-Assets (Bilder, Fonts, CSS, JS)
  │   ├── css/
  │   ├── js/
  │   └── images/
  ├── docs/            # Markdown-Inhaltsdateien
  ├── docmd.config.json
  └── site/            # Kompilierte Produktionsausgabe (Automatisch gespiegelt)
```

## Automatische Asset-Spiegelung

Beim Ausführen von `npx @docmd/core build` oder `npx @docmd/core dev`:

1. **Spiegelungslogik**: Der gesamte Inhalt von `assets/` wird rekursiv nach `site/assets/` kopiert.
2. **Build-Stabilität**: Das Kopieren von Assets verwendet eine gehärtete, asynchrone Kopier-Engine mit exponentiellen Wiederholungsversuchen, um Dateisystem-Sperrfehler auf macOS und SSD-Volumes zu verhindern.
3. **Pfadreferenzen**: Referenzieren Sie Assets in Markdown und Konfigurationsdateien mit **stammrelativen** Pfaden:
    ```markdown
    ![Architektur-Diagramm](/assets/images/architecture.png)
    ```

## Integration von eigenem CSS & JS

Verknüpfen Sie benutzerdefinierte Stylesheet- oder Skript-Assets über die Theme-Konfiguration in `docmd.config.json` auf allen Seiten:

```json "docmd.config.json"
{
  "theme": {
    "customCss": ["/assets/css/branding.css"]
  },
  "customJs": ["/assets/js/analytics.js"]
}
```

::: callout tip "Asset-Organisation für KI-Indexierer" icon:lightbulb
* **Strukturierte Unterverzeichnisse**: Halten Sie `/css`, `/js` und `/images` isoliert. Eine saubere Verzeichnistrennung ermöglicht es KI-Agenten, relevante Styling-Assets sofort zu lokalisieren.
* **Beschreibende Dateinamen**: Die Benennung von Bildern wie `authentication-flow-diagram.png` bietet Such-Indexierern und `llms.txt`-Crawlern im Vergleich zu generischen Namen wie `image1.png` reichhaltigen Kontext.
:::