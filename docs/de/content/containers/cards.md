---
title: "Cards"
description: "Organisieren Sie Informationen in gerahmten, visuell abgegrenzten Containern. Perfekt für Feature-Grids und Landingpages."
---

Cards sind die primären strukturellen Bausteine in `docmd`. Sie kapseln verwandte Inhalte in einem eigenen, umrandeten Rahmen mit optionalen Kopfzeilen ein und bieten so eine klare visuelle Hierarchie für Ihre Dokumentation.

## Syntax-Referenz

```markdown
::: card "Optionaler Titel für die Kopfzeile"
Dies ist der primäre Inhaltsbereich der Card.
:::
```

Fügen Sie einen optionalen `icon:`-Parameter hinzu, um ein [Lucide](external:https://lucide.dev/icons)-Icon in der Kopfzeile anzuzeigen:
```markdown
::: card "Setup" icon:rocket
In Sekundenschnelle startklar.
:::
```
::: card "Setup" icon:rocket
In Sekundenschnelle startklar.
:::

## Praktische Implementierungsbeispiele

### 1. Präsentation von Funktionen
Verwenden Sie Cards, um wichtige technische Vorteile oder Modulfunktionen hervorzuheben.
```markdown
::: card "Asynchrone Generierung"
Die `docmd`-Core-Engine nutzt eine nicht-blockierende I/O-Pipeline, die die Generierung von Tausenden von Seiten in Millisekunden ermöglicht.
:::
```
::: card "Asynchrone Generierung"
Die `docmd`-Core-Engine nutzt eine nicht-blockierende I/O-Pipeline, die die Generierung von Tausenden von Seiten in Millisekunden ermöglicht.
:::

### 2. Integration mehrerer Komponenten
Cards können alle Standard-Markdown-Elemente aufnehmen, einschließlich syntax-hervorgehobenem Code und Call-to-Action-Buttons.

````markdown
::: card "Sofortige Lokalisierung"
Bereiten Sie Ihre Dokumentation mit der integrierten i18n-Unterstützung für ein globales Publikum vor.

```bash
docmd add i18n
```

::: button "L10n-Strategie-Leitfaden" /guides/localization
:::
````

::: card "Sofortige Lokalisierung"
Bereiten Sie Ihre Dokumentation mit der integrierten i18n-Unterstützung für ein globales Publikum vor.

```bash
docmd add i18n
```

::: button "L10n-Strategie-Leitfaden" ./#localization
:::

## Mehrspaltige Layouts (Grids)

Sie können den nativen `grids`-Container nutzen, um Ihre Cards in sauberen, responsiven mehrspaltigen Layouts zu organisieren, ohne jemals HTML anfassen zu müssen.

```markdown
::: grids
    ::: grid
        ::: card "Primärer Knoten"
            Konfiguration für die Master-Instanz.
        :::
    :::
    ::: grid
        ::: card "Sekundärer Knoten"
            Konfiguration für redundante Slave-Instanzen.
        :::
    :::
:::
```

::: callout tip "Semantisches Clustering für KI"
Im `llms-full.txt`-Stream werden Inhalte, die in einer `card` eingeschlossen sind, von KI-Agenten als **zusammenhängendes Themen-Cluster** behandelt. Die Verwendung von Cards zur Segmentierung nicht verwandter technischer Konzepte auf derselben Seite verhindert Kontext-Leckagen und stellt sicher, dass von LLMs generierte Zusammenfassungen logisch isoliert und präzise bleiben.
:::