---
title: "Einklappbare Abschnitte"
description: "Betten Sie interaktive Akkordeon-Umschalter für FAQs, tiefgehende Inhalte und Spoiler ein."
---

Der `collapsible`-Container erstellt ein interaktives, umschaltbares Akkordeon. Er ist ideal für FAQs und detaillierte technische Konfigurationen und hält sekundäre Informationen zugänglich, ohne die Hauptansicht zu überladen.

## Container-Syntax

```markdown
::: collapsible [open] [title:"Zusammenfassungs-Text"] [icon:icon_name] # Einklappbar-Öffner
Interaktiver Inhalt (Markdown-Text, Code-Blöcke, Listen, Hinweisfelder)...
::: /collapsible # Expliziter Schließ-Tag
```

## Funktionen & Unterstützte Attribute

| Parameter / Eigenschaft | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Expansion-Flag** | `open` | Optional. Stellt das Akkordeon beim ersten Laden der Seite im aufgeklappten Zustand dar. |
| **Zusammenfassungs-Titel** | `"String"` \| `title:"..."` | Text auf der Umschaltleiste (1. Parameter oder `title:"..."`). |
| **Iconografie** | `icon:NAME` | Optional. Fügt ein [Lucide](external:https://lucide.dev/icons)-Icon vor dem Titeltext hinzu. |
| **Aliase** | `::: details` | `::: details` und schreibweise ohne Leerzeichen wie `:::collapsible` werden als Aliase unterstützt. |
| **Schließ-Tags** | `::: /collapsible`, `::: /details`, `:::` | Unterstützt benannte Schließ-Tags oder generische `:::`-Schließer. |


## Beispiele

### Standardzustand

Ein einklappbarer Abschnitt ist standardmäßig geschlossen. Ideal für FAQs und reduzierte visuelle Dichte.

```markdown
::: collapsible title:"How do I upgrade docmd?"
Run `npm update -g @docmd/core` to fetch the latest stable engine.
::: /collapsible
```

::: collapsible "How do I upgrade docmd?"
Run `npm update -g @docmd/core` to fetch the latest stable engine.
:::

### Initial geöffnet

Verwenden Sie das `open`-Flag für Abschnitte, die standardmäßig sichtbar sein sollen, aber vom Nutzer minimiert werden können.

```markdown
::: collapsible open title:"Environment Prerequisites"
1. Node.js v18+ (LTS recommended)
2. PNPM package manager
::: /collapsible
```

::: collapsible open "Environment Prerequisites"
1. Node.js v18+ (LTS recommended)
2. PNPM package manager
:::

### Reichhaltige Inhalte

Einklappbare Abschnitte können beliebiges Markdown enthalten, einschließlich syntaxhervorgehobener Code-Blöcke.

````markdown
::: collapsible title:"Sample JSON Response"
```json
{
  "status": "success",
  "data": { "version": "0.8.2" }
}
```
:::
````

::: collapsible "Sample JSON Response"
```json
{
  "status": "success",
  "data": { "version": "0.8.2" }
}
```
:::

::: callout tip
Inhalte innerhalb eines `collapsible` werden vollständig von der Suche indiziert und in den `llms.txt`-Stream aufgenommen. KI-Agenten können Fragen basierend auf versteckten technischen Details beantworten, während die menschliche Oberfläche sauber bleibt.
:::