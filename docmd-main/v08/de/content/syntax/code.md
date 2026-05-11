---
title: "Code-Blöcke"
description: "Dokumentieren Sie technische Implementierungen mit hochwertiger Syntax-Hervorhebung und interaktiven Kopierschaltflächen."
---

`docmd` nutzt die extrem schnelle `lite-hl`-Engine, um eine automatische, kontextsensitive Syntax-Hervorhebung für hunderte von Programmiersprachen und Konfigurationsformaten bereitzustellen.

## Syntax-Hervorhebung

Verfassen Sie Ihre technischen Beispiele mit standardmäßigen Markdown-Code-Zäunen (Fenced Code Blocks). Geben Sie immer die Sprachkennung an, um sicherzustellen, dass die Highlighting-Engine die korrekten lexikalischen Regeln anwendet.

````markdown
```javascript
function initialize() {
  console.log("docmd engine active.");
}
```
````

**Gerendertes Ergebnis:**

```javascript
function initialize() {
  console.log("docmd engine active.");
}
```

::: callout tip "Portabilität mit einem Klick"
Wenn `copyCode: true` in Ihrer Konfiguration aktiviert ist (Standard), erscheint automatisch eine dezente Kopierschaltfläche in der oberen rechten Ecke jedes Code-Blocks beim Darüberfahren mit der Maus. So können Benutzer Ausschnitte sofort in ihre IDE übertragen.
:::

## Strategie für KI-Kontext

Beachten Sie beim Dokumentieren von Code für die Nutzung durch LLMs und KI-Agenten diese technischen Best Practices:

1.  **Strikte Sprachkennzeichnung**: Die explizite Kennzeichnung von Blöcken als `typescript`, `bash` oder `json` stellt sicher, dass der KI-Parser die Grammatik des Blocks innerhalb des `llms-full.txt`-Streams korrekt interpretiert.
2.  **Eingebettete Intention**: Verwenden Sie Inline-Kommentare innerhalb Ihrer Code-Blöcke, um das *Warum* hinter komplexer Logik zu erklären. Dies liefert der KI kritischen Kontext für die Argumentation, der einfachem Text außerhalb des Blocks fehlen könnte.

## Referenz der Sprachunterstützung

`docmd` bietet standardmäßige Unterstützung für die gängigsten technischen Ökosysteme, darunter:

*   **Logik**: `javascript`, `typescript`, `python`, `rust`, `go`, `ruby`, `csharp`.
*   **Web**: `html`, `css`, `markdown`.
*   **Daten & Shell**: `json`, `yaml`, `bash`, `powershell`, `dockerfile`.
*   **Dokumentation**: `mermaid`, `changelog`.