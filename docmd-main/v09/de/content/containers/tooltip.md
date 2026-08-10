---
title: Tooltip-Container
description: Erfahren Sie, wie Sie den ::: tip Tooltip-Container in docmd verwenden, um interaktive Hover-Popups und klickbare Begriffserklärungen anzuzeigen.
---

Der Container `::: tip` (auch als `::: tooltip` verfügbar) rendert interaktive Hover-Tooltips und Begriffserklärungen inline im Text oder um Blockelemente.

## Container-Syntax

```markdown
# Inline-Tooltip
::: tip "Tooltip Hover-Erklärung" [term:"Angezeigter Begriff"] [url:"Ziel-URL"] ::: /tip

# Block-Level-Tooltip
::: tip "Tooltip Hover-Erklärung" [url:"Ziel-URL"]
Inhalt innerhalb des Tooltip-Containerblocks...
::: /tip
```

## Funktionen & Unterstützte Attribute

| Parameter / Attribut | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Tooltip-Erklärung** | `"String"` | Haupttext, der im schwebenden Hover-Tooltip-Popup angezeigt wird (1. positionaler Parameter oder `text:"..."`). |
| **Angezeigter Begriff** | `term:"String"` | Text, der im Fließtext gerendert wird. Falls weggelassen, wird standardmäßig der Tooltip-Erklärungstext verwendet. |
| **Ziel-Link-URL** | `url:URL` | Wandelt das Tooltip-Element in einen interaktiven Hyperlink um. Unterstützt `external:https://...` für neue Tabs. |
| **Aliase** | `::: tip`, `::: tooltip` | Beide Container-Namen verhalten sich sowohl im Inline- als auch im Block-Modus identisch. |

## Anwendungsbeispiele

### Inline-Begriff-Tooltip

Rendert Inline-Hover-Erklärungen für Fachbegriffe oder Feature-Highlights:

```markdown
Docmd bietet ein ::: tip "Keine Erstellungskonfiguration erforderlich" term:"Zero-Config" ::: /tip Design.
```

Docmd bietet ein ::: tip "Keine Erstellungskonfiguration erforderlich" term:"Zero-Config" ::: /tip Design.

### Tooltip mit Ziel-Link

Fügen Sie `url:` hinzu, um den angezeigten Begriff klickbar zu machen und gleichzeitig eine Hover-Vorschau anzuzeigen:

```markdown
Erfahren Sie mehr über die ::: tip "Statische Build-Engine ohne Konfiguration" term:"Docmd-Architektur" url:"external:https://github.com/docmd-io/docmd" ::: /tip in unserem Repository.
```

Erfahren Sie mehr über die ::: tip "Statische Build-Engine ohne Konfiguration" term:"Docmd-Architektur" url:"external:https://github.com/docmd-io/docmd" ::: /tip in unserem Repository.

### Block-Level-Tooltip-Wrapper

Umschließen Sie mehrzeiligen Text oder Überschriften mit Block-Tooltips:

```markdown
::: tip "Interaktives Diagramm-Shell"
Fahren Sie mit der Maus über diesen Block, um die Kontexterklärung des Diagramm-Shells anzuzeigen.
::: /tip
```

::: tip "Interaktives Diagramm-Shell"
Fahren Sie mit der Maus über diesen Block, um die Kontexterklärung des Diagramm-Shells anzuzeigen.
::: /tip