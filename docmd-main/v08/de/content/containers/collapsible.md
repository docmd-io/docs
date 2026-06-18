---
title: "Einklappbare Abschnitte"
description: "Betten Sie interaktive Akkordeon-Umschalter für FAQs, tiefgehende Inhalte und Spoiler ein."
---

Der `collapsible`-Container erstellt ein interaktives, umschaltbares Akkordeon. Er ist ideal für FAQs und detaillierte technische Konfigurationen und hält sekundäre Informationen zugänglich, ohne die Hauptansicht zu überladen.

::: callout info "VitePress-Alias"
Wenn Sie von VitePress migrieren, verwenden Sie `:::details` als Alias für `:::collapsible`. Auch die schreibweise ohne Leerzeichen wie `:::collapsible` funktioniert.
:::

## Syntax-Referenz

```markdown
::: collapsible [open] "Title text" [property:value...]
Main content goes here.
:::
```

| Parameter | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Offen-Zustand** | `open` | Optional. Wenn angegeben, wird der Abschnitt initial im aufgeklappten Zustand dargestellt. |
| **Titel** | `"String"` | Der Text, der auf der Umschaltleiste gerendert wird. Standard ist „Click to expand". |
| **Symbol** | `icon:NAME` | Optional. Fügt ein [Lucide](external:https://lucide.dev/icons)-Symbol vor dem Titeltext hinzu. |

## Beispiele

### Standardzustand

Ein einklappbarer Abschnitt ist standardmäßig geschlossen. Ideal für FAQs und reduzierte visuelle Dichte.

```markdown
::: collapsible "How do I upgrade docmd?"
Run `npm update -g @docmd/core` to fetch the latest stable engine.
:::
```

::: collapsible "How do I upgrade docmd?"
Run `npm update -g @docmd/core` to fetch the latest stable engine.
:::

### Initial geöffnet

Verwenden Sie das `open`-Flag für Abschnitte, die standardmäßig sichtbar sein sollen, aber vom Nutzer minimiert werden können.

```markdown
::: collapsible open "Environment Prerequisites"
1. Node.js v18+ (LTS recommended)
2. PNPM package manager
:::
```

::: collapsible open "Environment Prerequisites"
1. Node.js v18+ (LTS recommended)
2. PNPM package manager
:::

### Reichhaltige Inhalte

Einklappbare Abschnitte können beliebiges Markdown enthalten, einschließlich syntaxhervorgehobener Code-Blöcke.

````markdown
::: collapsible "Sample JSON Response"
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
