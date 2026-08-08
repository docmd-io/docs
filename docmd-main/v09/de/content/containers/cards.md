---
title: "Karten (Cards)"
description: "Organisieren Sie Informationen in eingerahmten, visuell abgehobenen Containern für Feature-Grids und Landingpages in docmd."
---

Karten kapseln zusammengehörige Inhalte in einem eigenen, umrandeten Rahmen mit einem optionalen Header ein und bieten eine klare visuelle Hierarchie auf Ihren Dokumentationsseiten.

## Syntax-Referenz

```markdown
::: card "Titeltext" [Eigenschaft:Wert...]
Dies ist der Hauptinhaltsbereich der Karte.
:::
```

| Parameter | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Title** | `"String"` | Optionaler Header-Titel, der oben im Kartenrahmen gerendert wird. |
| **Icon** | `icon:NAME` | Optional. Fügt ein [Lucide](external:https://lucide.dev/icons)-Icon neben dem Header-Titel hinzu. |

## Anwendungsbeispiele

### Feature-Highlight-Karte

Verwenden Sie eine Karte, um eine einzelne technische Funktion mit einem expliziten Titel und Icon einzurahmen:

```markdown
::: card "Asynchrone Generierung" icon:zap
Die Core-Engine nutzt eine nicht-blockierende I/O-Pipeline und kompiliert Tausende von Seiten in Millisekunden.
:::
```

::: card "Asynchrone Generierung" icon:zap
Die Core-Engine nutzt eine nicht-blockierende I/O-Pipeline und kompiliert Tausende von Seiten in Millisekunden.
:::

### Komposition reichhaltiger Inhalte

Karten akzeptieren jegliche Markdown-Inhalte, einschließlich Code-Snippets und Button-Container:

```markdown
::: card "Sofortige Lokalisierung"
Bereiten Sie Ihre Dokumentation für ein globales Publikum mit integrierter i18n-Unterstützung vor.

```bash
npx @docmd/core build
```

::: button "Leitfaden zur Lokalisierungsstrategie" ../getting-started/quick-start.md
:::
````

::: card "Sofortige Lokalisierung"
Bereiten Sie Ihre Dokumentation für ein globales Publikum mit integrierter i18n-Unterstützung vor.

```bash
npx @docmd/core build
```

::: button "Leitfaden zur Lokalisierungsstrategie" ../getting-started/quick-start.md
:::

### Mehrspaltiges Layout

Umschließen Sie mehrere Karten mit einem `grids`-Container für ein responsives mehrspaltiges Layout:

```markdown
::: grids
    ::: grid
        ::: card "Primärer Knoten"
        Konfigurationsoptionen für Master-Instanzen.
        :::
    :::
    ::: grid
        ::: card "Sekundärer Knoten"
        Konfigurationsoptionen für Replica-Instanzen.
        :::
    :::
:::
```

::: grids
    ::: grid
        ::: card "Primärer Knoten"
        Konfigurationsoptionen für Master-Instanzen.
        :::
    :::
    ::: grid
        ::: card "Sekundärer Knoten"
        Konfigurationsoptionen für Replica-Instanzen.
        :::
    :::
:::

::: callout tip "Semantisches Clustering für KI" icon:lightbulb
Im `llms.txt`-Kontextstream werden Inhalte innerhalb einer `card` als **kohärenter Themen-Cluster** geparst. Die Verwendung von Karten zur Segmentierung von Konzepten verhindert Kontextlecks über unzusammenhängende Abschnitte hinweg.
:::
