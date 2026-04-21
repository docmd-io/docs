---
title: "Schaltflächen (Buttons)"
description: "Fügen Sie Call-to-Action-Schaltflächen für internes Routing oder externe Ressourcen mit einer einzeiligen Syntax ein."
---

Buttons sind wirkungsvolle UI-Elemente, die für eine prominente Navigation eingesetzt werden. Im Gegensatz zu Block-Containern ist der `button` **selbstschließend** — er wird in einer einzigen Zeile definiert und benötigt kein schließendes `:::`-Tag.

## Syntax

```markdown
::: button "Beschriftung" Pfad [Optionen]
```

### Referenz der Optionen

| Eigenschaft | Format | Beschreibung |
| :--- | :--- | :--- |
| **Pfad** | `/pfad/` | Relative Projekt-URL (wird automatisch für die SPA-Navigation aufgelöst). |
| **Extern** | `external:URL`| Öffnet die Ziel-URL in einem neuen Browser-Tab (`target="_blank"`). |
| **Farbe** | `color:WERT` | Wendet eine Hintergrundfarbe an (unterstützt CSS-Namen oder Hex-Codes). |
| **Icon** | `icon:NAME` | Fügt ein [Lucide](https://lucide.dev/icons) Icon vor der Beschriftung hinzu. |

## Anwendungsbeispiele

### 1. Interne Navigation
Verwenden Sie relative Pfade, um nahtlose Übergänge ohne Neuladen innerhalb der `docmd` SPA zu gewährleisten.
```markdown
::: button "docmd installieren" /getting-started/installation
```
::: button "docmd installieren" /getting-started/installation

### 2. Externer Ressourcen-Link
Stellen Sie der URL `external:` voran, um eine sichere externe Verlinkung zu gewährleisten.
```markdown
::: button "GitHub Repository ansehen" external:https://github.com/docmd-io/docmd
```
::: button "GitHub Repository ansehen" external:https://github.com/docmd-io/docmd

### 3. Semantisches & Marken-Styling
Passen Sie Schaltflächen mit Farbüberschreibungen an Ihre Markenidentität oder semantische Priorität an.
```markdown
::: button "Gefährliche Aktion" /delete color:crimson
::: button "Erfolg Bestätigen" /success color:#228B22
```
::: button "Gefährliche Aktion" ./#delete color:crimson
::: button "Erfolg Bestätigen" ./#success color:#228B22

### 4. Schaltflächen mit Icons
Fügen Sie ein Lucide-Icon hinzu, um die visuelle Klarheit zu erhöhen.
```markdown
::: button "Erste Schritte" /getting-started/installation icon:arrow-right
::: button "Quellcode ansehen" external:https://github.com/docmd-io/docmd icon:github
```
::: button "Erste Schritte" /getting-started/installation icon:arrow-right
::: button "Quellcode ansehen" external:https://github.com/docmd-io/docmd icon:github

## Wichtiger Hinweis: Selbstschließende Logik

Da Buttons selbstschließend sind, wird das Hinzufügen einer abschließenden `:::`-Zeile den **übergeordneten Container** (z. B. eine Karte oder einen Tab) beenden, in dem sich der Button befindet, was möglicherweise Ihr Layout zerstört.

**Falsche Sequenz:**
```markdown
::: card "Setup"
::: button "Beginnen" /setup
:::        <-- Fehler: Dies schließt die Karte vorzeitig.
:::
```

**Richtige Sequenz:**
```markdown
::: card "Setup"
::: button "Beginnen" /setup
:::        <-- Korrekt: Dies schließt die Karte.
```