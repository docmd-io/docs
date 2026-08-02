---
title: "Code-Blöcke"
description: "Dokumentieren Sie technische Implementierungen mit Syntax-Highlighting, Datei-Titeln und One-Click-Kopieren."
---

docmd nutzt die ultraschnelle `lite-hl`-Engine für automatisches, kontextbezogenes Syntax-Highlighting. Geben Sie den Sprachbezeichner bei jedem umzäunten Block an, um die korrekten lexikalischen Regeln sicherzustellen.

## Syntax-Highlighting

Geben Sie immer die Sprache nach dem öffnenden Zaun an. Der Highlighter wendet grammatikalische Regeln an, die spezifisch für dieses Ökosystem sind.

````markdown
```typescript
async function build(config: string): Promise<void> {
  await initialise(config);
}
```
````

```typescript
async function build(config: string): Promise<void> {
  await initialise(config);
}
```

## Block-Titel

Folgen Sie dem Sprachbezeichner mit einem in Anführungszeichen gesetzten Dateinamen, um eine beschriftete Headerleiste über dem Block zu rendern. Dies ist nützlich, um direkt auf Konfigurationsdateien und Quellpfade zu verweisen.

````markdown
```json "docmd.config.json"
{
  "title": "My Documentation",
  "src": "docs/"
}
```
````

```json "docmd.config.json"
{
  "title": "My Documentation",
  "src": "docs/"
}
```

## Sprachunterstützung

docmd unterstützt gängige technische Ökosysteme out of the box:

*   **Logik:** `javascript`, `typescript`, `python`, `rust`, `go`, `ruby`, `csharp`
*   **Web:** `html`, `css`, `markdown`
*   **Daten & Shell:** `json`, `yaml`, `bash`, `powershell`, `dockerfile`
*   **Dokumentation:** `mermaid`, `changelog`

## KI-Kontext-Strategie

Wenn Sie Code für KI-Agenten dokumentieren, befolgen Sie diese Praktiken:

1.  **Beschriften Sie jeden Block explizit** — verwenden Sie `typescript`, `bash`, `json`, anstatt sich auf Auto-Erkennung zu verlassen. Dies stellt sicher, dass der Parser die korrekte Grammatik für den `llms.txt`-Stream anwendet.
2.  **Betten Sie Absichten in Kommentaren ein** — Inline-Kommentare erklären komplexe Logik und liefern wichtige Begründungen direkt im Code.

::: callout tip "Ein-Klick-Portabilität"
Setzen Sie `copyCode: true` in Ihrer Konfiguration, um eine dezente Kopierschaltfläche zu aktivieren. Sie erscheint beim Hover oben rechts auf jedem Block und ermöglicht es Lesern, Snippets sofort zu kopieren.
:::