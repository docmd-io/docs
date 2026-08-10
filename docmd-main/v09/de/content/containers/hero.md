---
title: "Hero-Bereiche"
description: "Erstellen Sie wirkungsvolle Landing-Page-Header und Marketing-Highlights in Markdown in docmd."
---

Der `hero`-Container erstellt visuell ansprechende Landing-Page-Header mit Unterstützung für geteilte Medien-Layouts, Hintergrund-Glow-Effekte und interaktive Karussells.

## Container-Syntax

```markdown
::: hero [layout:split|slider] [glow:true|false] # Hero-Container Öffner
::: slide # Einzelnes Karussell-Slide Öffner
# Isomorphe Kern-Engine
Rendert statisch und führt nahtlos auf Client-Seite aus.
::: /slide # Expliziter Slide-Schließer

::: slide # Zweites Slide Öffner
# KI-Kontext-Optimierung
Strukturbewusstes Parsing für LLM-Agenten.
::: /slide
::: /hero # Expliziter Hero-Schließer
```

## Funktionen & Unterstützte Attribute

| Parameter / Eigenschaft | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Layout-Variante** | `layout:split` \| `layout:slider` | `split` unterteilt in Text- und Medienbereich; `slider` erstellt ein Karussell. |
| **Glow-Effekt** | `glow:true` \| `glow:false` | Fügt einen subtilen radialen Farbverlauf hinter den Header ein. |
| **Sub-Container** | `::: slide` ... `::: /slide` | Definiert ein einzelnes Karussell-Panel. Legacy `== slide` wird unterstützt. |
| **Schließ-Tags** | `::: /hero`, `::: /slide`, `:::` | Unterstützt benannte Schließ-Tags oder generische `:::`-Schließer. |

::: callout info "v0.9.1+ Standardisierung der Container-Syntax" icon:sparkles
Ab **v0.9.1** führt `docmd` explizite Öffnungs- und Schließungs-Container-Tags (z.B. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explizite Key-Value-Eigenschaften (`title:"..."`, `url:"..."`) und nachfolgende `# Kommentare` ein. Diese modernisierte Syntax wird für alle neuen Dokumentationen empfohlen. Die vollständige Abwärtskompatibilität für alte Sub-Block-Marker (`== tab`, `1.`) und Positionsparameter bleibt strikt erhalten.
:::


## Anwendungsbeispiele

```markdown
::: hero layout:slider # Interaktiver Slider-Container
::: slide # Panel 1
# Isomorphe Kern-Engine
Rendert statisch und führt nahtlos auf Client-Seite aus.
::: /slide

::: slide # Panel 2
# KI-Kontext-Optimierung
Strukturbewusstes Parsing für LLM-Agenten.
::: /slide
::: /hero
```

::: hero layout:slider
::: slide
# Isomorphe Kern-Engine
Rendert statisch und führt nahtlos auf Client-Seite aus.
::: /slide

::: slide
# KI-Kontext-Optimierung
Strukturbewusstes Parsing für LLM-Agenten.
::: /slide
::: /hero