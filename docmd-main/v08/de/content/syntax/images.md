---
title: "Bilder & visuelle Medien"
description: "Meistern Sie das Medienmanagement: Responsive Bilder, Styling-Attribute und automatische Lightbox-Effekte."
---

`docmd` nutzt die Standard-Markdown-Syntax für die Medienintegration. Wir empfehlen, Ihre Medien-Assets im Verzeichnis `assets/images/` innerhalb Ihres Projekt-Quellordners zu zentralisieren.

```markdown
![Technisches Diagramm](/assets/images/architecture.png "Optionaler Tooltip-Titel")
```

## Referenz für technisches Styling

Weisen Sie Ihren Bildern spezielle CSS-Klassen und Attribute direkt mit der Attributsyntax `{ .klasse }` zu.

### Dynamische Größenanpassung
```markdown
![Kleines Format](/assets/icon.png){ .size-small }
![Standardansicht](/assets/preview.png){ .size-medium }
![Großes Format](/assets/banner.png){ .size-large }
```

### Ausrichtung & Layout
```markdown
![Zentrierter Fokus](/assets/img.png){ .align-center }
![Rechtsfließend](/assets/img.png){ .align-right .with-shadow .with-border }
```

![Beispiel für fortgeschrittenes Styling](/assets/images/docmd-preview.png){.with-border .with-shadow .size-medium .align-center}

## Strukturierte Medienelemente

### Bildunterschriften (Figure Captions)
Für präzise, barrierefreie Bildunterschriften verwenden Sie standardmäßige HTML5 `<figure>`-Elemente.
```html
<figure>
  <img src="/assets/diagram.png" alt="Cloud-Infrastruktur-Diagramm">
  <figcaption>Abbildung 1.1: Architektur der Kernsystem-Infrastruktur.</figcaption>
</figure>
```

### Bildergalerien
Organisieren Sie mehrere Assets in einem responsiven, ausgewogenen Raster mit der Klasse `image-gallery`.

```html
<div class="image-gallery">
  <figure>
    <img src="/assets/screen1.jpg" alt="Benutzer-Dashboard-Ansicht">
    <figcaption>Live-Leistungsmonitor</figcaption>
  </figure>
  <figure>
    <img src="/assets/screen2.jpg" alt="Konfigurationspanel-Ansicht">
    <figcaption>Globale Projekteinstellungen</figcaption>
  </figure>
</div>
```

## Interaktiver Lightbox-Zoom

Wenn die Komponente `mainScripts` aktiviert ist (Standard), wendet `docmd` automatisch einen Vollbild-Zoomeffekt auf jedes Bild an, das in einer Galerie enthalten ist oder mit der Klasse `.lightbox` markiert wurde.

```markdown
![Detaillierte Texturanalyse](/assets/sample.png){ .lightbox }
```

::: callout tip "KI-Kontext & Barrierefreiheit"
Geben Sie immer umfassende **Alt-Texte** für visuelle Medien an. Obwohl fortgeschrittene KI-Modelle über Sehfähigkeiten verfügen, liefert beschreibender Text innerhalb der Markdown-Quelle ein direktes, hochwertiges Signal für die Argumentationsebene des Modells — dies verbessert die Architekturanalyse und das Verständnis von Funktionen im `llms-full.txt`-Stream.
:::