---
title: "Schaltflächen"
description: "Fügen Sie klare, gut sichtbare Call-to-Actions direkt in Ihre Dokumentation ein."
---

Schaltflächen sind interaktive Komponenten für Navigation und Call-to-Actions. Sie können auf interne Dokumentationsseiten oder externe Ressourcen verweisen.

## Syntax-Referenz

```markdown
::: button "Label text" target_url [property:value...]
```

| Parameter | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Pfad** | `/path/` | Relative Projekt-URL. Wird automatisch für die SPA-Navigation aufgelöst. |
| **Extern** | `external:URL`| Öffnet die Ziel-URL in einem neuen Browser-Tab (`target="_blank"`). |
| **Farbe** | `color:VALUE` | Wendet eine Hintergrundfarbe an (unterstützt CSS-Namen oder Hex-Codes). |
| **Symbol** | `icon:NAME` | Fügt ein [Lucide](external:https://lucide.dev/icons)-Symbol vor dem Label hinzu. |

## Beispiele

### Interne Navigation

Verwenden Sie relative Markdown-Pfade, um nahtlose Übergänge innerhalb der docmd-SPA sicherzustellen.

```markdown
::: button "Install docmd" ../../getting-started/installation.md
```

::: button "Install docmd" ../../getting-started/installation.md

### Link zu externer Ressource

Stellen Sie `external:` der URL voran, um den Link in einem neuen Tab zu öffnen.

```markdown
::: button "View GitHub Repository" external:https://github.com/docmd-io/docmd
```

::: button "View GitHub Repository" external:https://github.com/docmd-io/docmd

### Styling & Symbole

Passen Sie Schaltflächen mit Farbüberschreibungen und Lucide-Symbolen an Ihre Markenidentität an.

```markdown
::: button "Success Confirmation" ./#success color:#228B22
::: button "Danger Action" ./#delete color:crimson icon:alert-circle
::: button "View Source" external:https://github.com/docmd-io/docmd icon:github
```

::: button "Success Confirmation" ./#success color:#228B22
::: button "Danger Action" ./#delete color:crimson icon:alert-circle
::: button "View Source" external:https://github.com/docmd-io/docmd icon:github

## Wichtiger Hinweis: Selbstschließende Logik

Schaltflächen sind selbstschließend. Eine abschließende `:::`-Zeile unmittelbar nach einer Schaltfläche beendet den **übergeordneten Container** (z. B. eine Card oder einen Tab) und kann Ihr Layout beschädigen.

**Falsche Reihenfolge:**
```markdown
::: card "Setup"
    ::: button "Begin" ../../setup.md
    :::        <-- Fehler: Dies schließt die Card vorzeitig.
:::
```

**Korrekte Reihenfolge:**
```markdown
::: card "Setup"
    ::: button "Begin" ../../setup.md
:::        <-- Korrekt: Dies schließt die Card sauber.
```
