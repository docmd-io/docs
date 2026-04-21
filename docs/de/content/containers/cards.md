---
title: "Karten (Cards)"
description: "Organisieren Sie Informationen in eingerahmten, visuell abgegrenzten Containern. Perfekt für Feature-Raster und Landingpages."
---

Karten sind die primären strukturellen Bausteine in `docmd`. Sie kapseln verwandte Inhalte in einem abgegrenzten, umrandeten Rahmen mit optionalen Headern ein und bieten so eine klare visuelle Hierarchie für Ihre Dokumentation.

## Syntax-Referenz

```markdown
::: card "Optionaler Titel"
Dies ist der Hauptinhaltsbereich der Karte.
:::
```

Fügen Sie einen optionalen `icon:`-Parameter hinzu, um ein [Lucide](https://lucide.dev/icons) Icon im Header anzuzeigen:
```markdown
::: card "Setup" icon:rocket
In Sekunden startklar.
:::
```
::: card "Setup" icon:rocket
In Sekunden startklar.
:::

## Praktische Implementierungsbeispiele

### 1. Präsentation von Funktionen
Verwenden Sie Karten, um wichtige technische Vorteile oder Modulfähigkeiten hervorzuheben.
```markdown
::: card "Asynchrone Generierung"
Die `docmd`-Kern-Engine nutzt eine nicht-blockierende I/O-Pipeline, die die Generierung von Tausenden von Seiten in Millisekunden ermöglicht.
:::
```
::: card "Asynchrone Generierung"
Die `docmd`-Kern-Engine nutzt eine nicht-blockierende I/O-Pipeline, die die Generierung von Tausenden von Seiten in Millisekunden ermöglicht.
:::

### 2. Integration mehrerer Komponenten
Karten können alle Standard-Markdown-Elemente aufnehmen, einschließlich Code mit Syntax-Highlighting und Call-to-Action-Schaltflächen.

````markdown
::: card "Sofortige Lokalisierung"
Bereiten Sie Ihre Dokumentation mit der integrierten i18n-Unterstützung für ein globales Publikum vor.

```bash
docmd add i18n
```

::: button "L10n Strategie-Leitfaden" /guides/localization
:::
````

::: card "Sofortige Lokalisierung"
Bereiten Sie Ihre Dokumentation mit der integrierten i18n-Unterstützung für ein globales Publikum vor.

```bash
docmd add i18n
```

::: button "L10n Strategie-Leitfaden" ./#localization
:::

## Mehrspaltige Layouts (Grids)

Sie können den nativen `grids`-Container nutzen, um Ihre Karten in sauberen, responsiven mehrspaltigen Layouts zu organisieren, ohne jemals HTML anfassen zu müssen.

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
Im `llms-full.txt`-Stream wird Inhalt, der in eine `card` gehüllt ist, von KI-Agenten als **zusammenhängendes Themen-Cluster** behandelt. Die Verwendung von Karten zur Segmentierung unverwandter technischer Konzepte auf derselben Seite verhindert Kontext-Leaks und stellt sicher, dass von LLMs generierte Zusammenfassungen logisch isoliert und präzise bleiben.
:::