---
title: "Karten (Cards)"
description: "Organisieren Sie Informationen in eingerahmten, visuell abgehobenen Containern für Feature-Grids und Landingpages in docmd."
---

Karten kapseln zusammengehörige Inhalte in einem eigenen, umrandeten Rahmen mit einem optionalen Header ein und bieten eine klare visuelle Hierarchie auf Ihren Dokumentationsseiten.

## Container-Syntax

```markdown
::: card [title:"Header-Titel"] [icon:Icon-Name] # Karten-Container Öffner
Inhaltsblock mit Unterstützung für Markdown, Code-Snippets, Buttons und Callouts...
::: /card # Explizites Schließ-Tag
```

## Funktionen & Unterstützte Attribute

| Parameter / Eigenschaft | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Titel** | `"String"` \| `title:"..."` | Optionaler Header-Titel oben im Kartenrahmen (1. positionaler Parameter oder `title:"..."`). |
| **Symbolik** | `icon:NAME` | Optional. Fügt ein [Lucide](external:https://lucide.dev/icons)-Symbol neben dem Titeltext ein. |
| **Markdown-Inhalt** | Freitext | Unterstützt beliebige Markdown-Elemente, Codeblöcke, Listen, Buttons und verschachtelte Container. |
| **Schließ-Tags** | `::: /card`, `:::` | Unterstützt explizit benanntes Schließ-Tag `::: /card` oder generisches `:::`. |

::: callout info "v0.9.1+ Standardisierung der Container-Syntax" icon:sparkles
Ab **v0.9.1** führt `docmd` explizite Öffnungs- und Schließungs-Container-Tags (z.B. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explizite Key-Value-Eigenschaften (`title:"..."`, `url:"..."`) und nachfolgende `# Kommentare` ein. Diese modernisierte Syntax wird für alle neuen Dokumentationen empfohlen. Die vollständige Abwärtskompatibilität für alte Sub-Block-Marker (`== tab`, `1.`) und Positionsparameter bleibt strikt erhalten.
:::


## Anwendungsbeispiele

### Feature-Highlight-Karte

Verwenden Sie eine Karte, um eine einzelne technische Funktion mit einem expliziten Titel und Icon einzurahmen:

```markdown
::: card title:"Asynchrone Generierung" icon:zap
Die Core-Engine nutzt eine nicht-blockierende I/O-Pipeline und kompiliert Tausende von Seiten in Millisekunden.
::: /card
```

::: card "Asynchrone Generierung" icon:zap
Die Core-Engine nutzt eine nicht-blockierende I/O-Pipeline und kompiliert Tausende von Seiten in Millisekunden.
:::

### Komposition reichhaltiger Inhalte

Karten akzeptieren jegliche Markdown-Inhalte, einschließlich Code-Snippets und Button-Container:

```markdown
::: card title:"Sofortige Lokalisierung"
Bereiten Sie Ihre Dokumentation für ein globales Publikum mit integrierter i18n-Unterstützung vor.

```bash
npx @docmd/core build
```

::: button title:"Leitfaden zur Lokalisierungsstrategie" url:"../getting-started/quick-start.md"
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
        ::: card title:"Primärer Knoten"
        Konfigurationsoptionen für Master-Instanzen.
        ::: /card
    ::: /grid
    ::: grid
        ::: card title:"Sekundärer Knoten"
        Konfigurationsoptionen für Replica-Instanzen.
        ::: /card
    ::: /grid
::: /grids
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
