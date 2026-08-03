---
title: "Eigene Landing-Pages gestalten"
description: "Wie Sie mit docmds Hero- und Grid-Containern erstklassige Landing-Pages für Ihre Dokumentation erstellen."
---

## Problem

Standardmäßig sieht die Datei `index.md` in den meisten Dokumentations-Generatoren wie eine gewöhnliche technische Seite aus. Eine wirkungsstarke, Marketing-reife Landing-Page zu erstellen erfordert normalerweise ein separates Web-Framework (wie Next.js oder Astro). Das erhöht die Komplexität Ihres Dokumentations-Workflows.

## Warum es wichtig ist

Ihre Dokumentations-Startseite ist oft die erste Interaktion eines Entwicklers mit Ihrem Produkt. Eine generische, Markdown-geparste Seite kann das Vertrauen in die Qualität Ihres Projekts nicht wecken. Eine benutzerdefinierte Landing-Page leitet Benutzer zu wichtigen Abschnitten und verstärkt gleichzeitig die visuelle Identität Ihrer Marke.

## Ansatz

docmd bietet spezialisierte [Hero](../../content/containers/hero.md)- und [Grids](../../content/containers/grids.md)-Container, die speziell für die Erstellung erstklassiger Landing-Pages entwickelt wurden. Für völlige kreative Freiheit verwenden Sie die Frontmatter-Eigenschaft `noStyle`, um die volle Kontrolle über HTML und Styling einer Seite zu übernehmen.

## Implementierung

### 1. Verwendung des Hero-Containers

Der `hero`-Container unterstützt mehrere Layouts, einschließlich `split` (für Side-by-Side-Inhalte) und `glow` (für eine moderne Ästhetik).

```markdown
::: hero layout:split glow:true
# Schneller bauen mit docmd
Die Zero-Config-Dokumentations-Engine für moderne Entwicklerteams.

[Loslegen](/docs/start) [Auf GitHub ansehen](https://github.com/docmd-io/docmd)

== side
![Dashboard-Vorschau](../../static/img/hero-preview.png)
:::
```

### 2. Inhalte mit Grids organisieren

Verwenden Sie [Grids und Cards](../../content/containers/grids.md), um übergeordnete Navigations-Abschnitte zu erstellen, die Benutzern helfen, schnell zu finden, was sie brauchen.

```markdown
::: grids
::: grid
::: card "Schnellstart" icon:rocket
In weniger als 5 Minuten einsatzbereit.
[Mehr erfahren](/docs/start.md)
:::
:::
::: grid
::: card "API-Referenz" icon:code
Umfassende Dokumentation für alle unsere Endpoints.
[API erkunden](/api)
:::
:::
:::
```

### 3. Volle Anpassung mit noStyle

Wenn Sie ein vollständig benutzerdefiniertes Design benötigen, das das Standard-Dokumentations-Layout ignoriert (keine Sidebar und kein Header), verwenden Sie die Eigenschaft `noStyle` im [Page-Frontmatter](../../content/frontmatter.md).

```yaml
---
title: "Benutzerdefiniertes Dashboard"
noStyle: true
---
```
Wenn `noStyle: true` gesetzt ist, rendert docmd nur den rohen HTML/Markdown-Inhalt, den Sie bereitstellen. Das erlaubt es Ihnen, Ihr eigenes CSS und JavaScript für ein pixel-perfektes Erlebnis zu injizieren.

## Abwägungen

`noStyle: true` zu verwenden bedeutet, dass Sie auf die nativen Navigations-, Such- und Theme-Switching-Features von docmd verzichten. Sie sind dafür verantwortlich, sicherzustellen, dass die benutzerdefinierte Seite mobil-responsiv und barrierefrei ist. Für die meisten Anwendungsfälle bietet die Kombination aus `hero`- und `grid`-Containern die beste Balance zwischen Ästhetik und Funktionalität.