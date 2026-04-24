---
title: "Strukturierung der Dokumentation für KI-Agenten"
description: "Wie Sie von der visuellen Formatierung zur semantischen Strukturierung übergehen, um die Genauigkeit von KI-Coding-Assistenten zu verbessern."
---

## Problem

Menschliche Leser verlassen sich auf visuelle Hinweise, die Sidebar-Navigation und impliziten Kontext, um Dokumentationen zu verstehen. KI-Agenten und Large Language Models (LLMs) konsumieren hingegen primär rohe Textströme. Wenn einer Dokumentation die semantische Struktur fehlt, haben diese Modelle Schwierigkeiten, Beziehungen zwischen Konzepten abzubilden, was zu mangelhafter Logik und ungenauen Code-Vorschlägen führt.

## Warum es wichtig ist

Wenn Ihre Dokumentation nicht für LLMs optimiert ist, werden Entwickler, die Tools wie GitHub Copilot, Cursor oder ChatGPT nutzen, häufiger Halluzinationen erhalten. Dies beeinträchtigt direkt die Developer Experience, da Nutzer oft das Produkt selbst für die Fehler ihrer KI-Assistenten verantwortlich machen.

## Ansatz

Wechseln Sie von einer "Visual-first"- zu einer **"Semantic-first"**-Denkweise. Nutzen Sie Standard-Markdown-Funktionen – wie strikte Überschriften-Hierarchien, explizite Sprach-Tags für Codeblöcke und aussagekräftige Alt-Texte –, um eine klare, maschinenlesbare Roadmap für Ihren Inhalt bereitzustellen. `docmd` verarbeitet diese Struktur über das [LLMs-Plugin](../../plugins/usage) zu optimierten Ausgaben.

## Implementierung

### 1. Strikte Überschriften-Hierarchie

Vermeiden Sie es, Überschriftenebenen nur aus visuellen Gründen zu überspringen. Eine konsistente Hierarchie ermöglicht es LLMs, den Umfang und die Beziehung verschiedener Abschnitte zu verstehen.

-   **`#` Titel**: Das Hauptthema der Seite.
-   **`##` Hauptkonzept**: Ein atomares, übergeordnetes Thema.
-   **`###` Detail**: Eine spezifische Unteraufgabe oder Eigenschaft dieses Konzepts.

*   **❌ Schlecht**: Die Verwendung von `###` direkt nach `#`, weil Ihnen die kleinere Schriftgröße besser gefällt.
*   **✅ Gut**: `# Installation`, gefolgt von `## Voraussetzungen` und dann `### Systemanforderungen`.

### 2. Deskriptive Metadaten für Medien

Da LLMs keine Bilder oder Diagramme "sehen" können, müssen Sie den architektonischen Kontext im Alternativtext oder in einem angrenzenden Absatz beschreiben.

```markdown
![Systemarchitektur: Die Frontend-React-Anwendung kommuniziert über REST mit der Node.js-API, welche wiederum einen Redis-Cache und eine PostgreSQL-Datenbank abfragt.](../../static/img/architecture.png)
```

### 3. Explizite Kennzeichnung von Codeblöcken

Geben Sie für jeden Codeblock die Sprache mittels [Syntax-Highlighting](../../content/syntax) an. Dies ermöglicht es LLMs, den Abstract Syntax Tree (AST) des Codes korrekt zu parsen.

```javascript
// docmd.config.js
export default {
  plugins: ['llms']
};
```

### 4. Semantische Container

Nutzen Sie [Callouts](../../content/containers/callouts) anstelle von generischen Blockzitaten, um eine Absicht (Intent) zu vermitteln. Die semantischen Container von `docmd` helfen KI-Modellen dabei, zwischen Kernanweisungen und ergänzenden Tipps oder Warnungen zu unterscheiden.

## Abwägungen

Semantische Strenge erfordert Disziplin von den Autoren. Markdown-Features (wie Blockzitate oder Überschriften) können nicht mehr als rein dekorative Elemente verwendet werden. Diese Disziplin führt jedoch zu einer Dokumentation, die sowohl für KI-Agenten als auch für menschliche Leser, die Hilfsmittel (Assistive Technologies) nutzen, wesentlich zugänglicher ist.
