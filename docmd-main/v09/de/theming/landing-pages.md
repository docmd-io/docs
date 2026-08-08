---
title: "Gestaltung benutzerdefinierter Landing-Pages"
description: "Erstellen Sie benutzerdefinierte Landing-Pages mit Hero-Headern, Grid-Containern und dem noStyle-Modus in docmd."
---

Dokumentations-Startseiten dienen als primärer Einstiegspunkt für Entwickler, die Ihr Projekt erkunden. `docmd` bietet integrierte visuelle Container und Layoutmodi zum Erstellen von Landing-Pages ohne externe Web-Frameworks.

## Design-Ansätze

`docmd` bietet zwei primäre Methoden zur Erstellung von Landing-Pages:

1. **Standard-Layout mit Hero & Grids**: Behält die Navigation der Website, die Seitenleisten und die obere Menüleiste bei und fügt gleichzeitig dynamische Hero-Header und Feature-Karten hinzu.
2. **Leere Leinwand (`noStyle: true`)**: Umgeht das Standard-Dokumentations-Chrome für die totale kreative Kontrolle über benutzerdefinierte HTML- und CSS-Layouts.

## Implementierungsbeispiele

### 1. Hero-Header-Container

Der [Hero](../content/containers/hero.md)-Container unterstützt geteilte Medien-Layouts (`layout:split`) und radiale Hintergrund-Glow-Effekte (`glow:true`):

```markdown
::: hero layout:split glow:true
# Schneller bauen mit docmd
Die Zero-Config-Dokumentations-Engine für moderne Softwareteams.

::: button "Schnellstart-Leitfaden" ../getting-started/quick-start.md color:blue
::: button "GitHub-Repository" external:https://github.com/docmd-io/docmd color:gray

== side
::: embed "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
:::
```

### 2. Feature-Navigation mit Grids

Kombinieren Sie [Grids und Karten](../content/containers/grids.md), um Kern-Produktfunktionen nebeneinander zu präsentieren:

```markdown
::: grids
  ::: grid
    ::: card "Schnellstart" icon:rocket
    In weniger als fünf Minuten einsatzbereit.
    ::: button "Mehr erfahren" ../getting-started/quick-start.md
    :::
  :::
  ::: grid
    ::: card "API-Referenz" icon:code
    Umfassende Dokumentation für alle Kernfunktionen.
    ::: button "API erkunden" ../api/index.md
    :::
  :::
:::
```

### 3. Leere Leinwand mit `noStyle`

Für vollständige Layout-Freiheit, die Seitenleisten und Header umgeht, geben Sie `noStyle: true` im [Seiten-Frontmatter](../content/frontmatter.md) an:

```yaml
---
title: "Produkt-Showcase"
noStyle: true
components:
  meta: true
  css: true
  menubar: true
---
```

Wenn `noStyle: true` aktiv ist, rendert `docmd` nur die bereitgestellten Inhalte auf der Seite, sodass Sie rohe HTML-Utility-Klassen frei mit `docmd`-Containern kombinieren können.

::: callout tip "Auswahl des richtigen Landing-Modus" icon:lightbulb
Für die meisten Dokumentations-Websites bietet die Kombination von `::: hero` und `::: grids` innerhalb von Standard-Layoutseiten die optimale Markenwirkung, während die Sofortsuch-Navigation und Theme-Umschalter erhalten bleiben.
:::