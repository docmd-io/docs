---
title: "Gestaltung von benutzerdefinierten Landing-Pages"
description: "So nutzen Sie die Hero- und Grid-Container von docmd, um hochwertige Landing-Pages für Ihre Dokumentation zu erstellen."
---

## Problem

Standardmäßig sieht die `index.md`-Datei in den meisten Dokumentationsgeneratoren wie eine gewöhnliche technische Seite aus. Die Erstellung einer wirkungsvollen Landing-Page in Marketing-Qualität erfordert normalerweise ein separates Web-Framework (wie Next.js oder Astro), was den Dokumentations-Workflow verkompliziert.

## Warum es wichtig ist

Die Startseite Ihrer Dokumentation ist oft der erste Kontakt eines Entwicklers mit Ihrem Produkt. Eine generische, aus Markdown geparste Seite kann das Vertrauen in die Professionalität und Qualität Ihres Projekts mindern. Eine benutzerdefinierte Landing-Page kann Benutzer gezielter zu den wichtigsten Abschnitten führen und gleichzeitig die visuelle Identität Ihrer Marke stärken.

## Ansatz

`docmd` bietet spezialisierte [Hero](../../content/containers/hero)- und [Grid](../../content/containers/grids-cards)-Container, die speziell für den Aufbau hochwertiger Landing-Pages entwickelt wurden. Für vollständige kreative Freiheit können Sie auch die Frontmatter-Eigenschaft `noStyle` verwenden, um die volle Kontrolle über HTML und Styling einer Seite zu übernehmen.

## Implementierung

### 1. Verwendung des Hero-Containers

Der `hero`-Container unterstützt verschiedene Layouts, darunter `split` (für Side-by-side-Inhalte) und `glow` (für eine moderne Ästhetik).

```markdown
::: hero layout:split glow:true
# Schneller aufbauen mit docmd
Die Zero-Config Documentation Engine für moderne Entwicklerteams.

[Erste Schritte](/docs/start) [Auf GitHub ansehen](https://github.com/docmd-io/docmd)

== side
![Dashboard Vorschau](../../static/img/hero-preview.png)
:::
```

### 3. Inhalte mit Grids organisieren

Nutzen Sie [Grids und Cards](../../content/containers/grids-cards), um übergeordnete Navigationsbereiche zu erstellen, die den Benutzern helfen, schnell zu finden, was sie suchen.

```markdown
::: grids
::: grid
::: card "Quick Start" icon:rocket
In weniger als 5 Minuten einsatzbereit.
[Mehr erfahren](/docs/start)
:::
:::
::: grid
::: card "API Referenz" icon:code
Umfassende Dokumentation für alle unsere Endpunkte.
[API erkunden](/api)
:::
:::
:::
```

### 3. Vollständige Anpassung mit noStyle

Wenn Sie ein komplett individuelles Design benötigen, das das Standard-Layout (ohne Sidebar oder Header) ignoriert, verwenden Sie die Eigenschaft `noStyle` im [Seiten-Frontmatter](../../content/frontmatter).

```yaml
---
title: "Benutzerdefiniertes Dashboard"
noStyle: true
---
```
Wenn `noStyle: true` gesetzt ist, rendert `docmd` nur den von Ihnen bereitgestellten rohen HTML/Markdown-Inhalt. Dies ermöglicht es Ihnen, eigenes CSS und JavaScript für ein pixelgenaues Erlebnis einzubinden.

## Abwägungen

Die Verwendung von `noStyle: true` bedeutet, dass Sie auf die nativen Funktionen für Navigation, Suche und Theme-Umschaltung von `docmd` verzichten. Sie sind selbst dafür verantwortlich, dass die benutzerdefinierte Seite responsiv und barrierefrei ist. In den meisten Fällen bietet die Kombination aus `hero`- und `grid`-Containern innerhalb des Standard-Layouts die beste Balance zwischen Ästhetik und Funktionalität.
