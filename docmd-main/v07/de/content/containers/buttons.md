---
title: "Buttons"
description: "Fügen Sie Call-to-Action-Buttons für internes Routing oder externe Ressourcen mit einer einzeiligen Syntax ein."
---

Buttons sind einflussreiche UI-Elemente, die für eine prominente Navigation verwendet werden. Im Gegensatz zu Block-Containern ist der `button` **selbstschließend** — er wird in einer einzigen Zeile definiert und benötigt kein schließendes `:::`-Tag.

## Syntax

```markdown
::: button "Beschriftung" Pfad [Optionen]
```

### Optionen-Referenz

| Eigenschaft | Format | Beschreibung |
| :--- | :--- | :--- |
| **Pfad (Path)** | `/pfad/` | Relative Projekt-URL (wird automatisch für die SPA-Navigation aufgelöst). |
| **Extern (External)** | `external:URL`| Öffnet die Ziel-URL in einem neuen Browser-Tab (`target="_blank"`). |
| **Farbe (Color)** | `color:WERT` | Wendet eine Hintergrundfarbe an (unterstützt CSS-Namen oder Hex-Codes). |
| **Icon** | `icon:NAME` | Fügt ein [Lucide](external:https://lucide.dev/icons)-Icon vor der Button-Beschriftung hinzu. |

## Anwendungsbeispiele

### 1. Interne Navigation
Verwenden Sie relative Pfade, um nahtlose Übergänge ohne Neuladen innerhalb der `docmd` SPA zu gewährleisten.
```markdown
::: button "docmd installieren" /getting-started/installation
```
::: button "docmd installieren" /getting-started/installation

### 2. Link zu externen Ressourcen
Stellen Sie der URL `external:` voran, um eine sichere externe Verlinkung zu gewährleisten.
```markdown
::: button "GitHub-Repository anzeigen" external:https://github.com/docmd-io/docmd
```
::: button "GitHub-Repository anzeigen" external:https://github.com/docmd-io/docmd

### 3. Semantisches & Marken-Styling
Passen Sie Buttons durch Farbüberschreibungen an Ihre Markenidentität oder semantische Priorität an.
```markdown
::: button "Gefährliche Aktion" /delete color:crimson
::: button "Erfolgreiche Bestätigung" /success color:#228B22
```
::: button "Gefährliche Aktion" ./#delete color:crimson
::: button "Erfolgreiche Bestätigung" ./#success color:#228B22

### 4. Buttons mit Icons
Fügen Sie ein Lucide-Icon hinzu, um die visuelle Klarheit zu verbessern.
```markdown
::: button "Erste Schritte" /getting-started/installation icon:arrow-right
::: button "Quellcode anzeigen" external:https://github.com/docmd-io/docmd icon:github
```
::: button "Erste Schritte" /getting-started/installation icon:arrow-right
::: button "Quellcode anzeigen" external:https://github.com/docmd-io/docmd icon:github

## Wichtiger Hinweis: Selbstschließende Logik

Da Buttons selbstschließend sind, beendet das Hinzufügen einer abschließenden `:::`-Zeile den **übergeordneten Container** (z. B. eine Card oder ein Tab), in dem sich der Button befindet, was potenziell Ihr Layout zerstören kann.

**Falsche Sequenz:**
```markdown
::: card "Setup"
    ::: button "Beginnen" /setup
    :::        <-- Fehler: Dies schließt die Card vorzeitig.
:::
```

**Richtige Sequenz:**
```markdown
::: card "Setup"
    ::: button "Beginnen" /setup
:::        <-- Richtig: Dies schließt die Card.
```