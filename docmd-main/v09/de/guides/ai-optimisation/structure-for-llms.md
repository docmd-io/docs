---
title: "Dokumentation für AI-Agenten strukturieren"
description: "Wie Sie von visueller Formatierung zu semantischer Strukturierung übergehen, um die Genauigkeit von AI-Coding-Assistenten zu verbessern."
---

## Problem

Menschliche Leser verlassen sich auf visuelle Hinweise und abgeleiteten Kontext. AI-Agenten konsumieren rohe Textströme. Ohne rigorose semantische Struktur haben Modelle Schwierigkeiten, Beziehungen zwischen Konzepten abzubilden. Das führt zu schlechtem Reasoning und ungenauen Coding-Vorschlägen.

## Warum es wichtig ist

Wenn Ihre Dokumentation nicht für LLMs optimiert ist, sehen sich Entwickler, die Tools wie GitHub Copilot oder Cursor verwenden, mehr Halluzinationen gegenüber. Das verschlechtert die Developer Experience. Benutzer geben häufig Ihrem Produkt die Schuld für Fehler, die von ihren AI-Assistenten erzeugt wurden.

## Ansatz

Wechseln Sie von einem "Visual-First"- zu einem **"Semantic-First"**-Mindset. Verwenden Sie Standard-Markdown-Features — strenge Header-Hierarchien, explizite Code-Block-Tags und beschreibende Alt-Texte — um eine maschinenlesbare Roadmap bereitzustellen. docmd verarbeitet diese Struktur über das [LLMs-Plugin](../../plugins/llms.md) zu optimierten Outputs.

## Implementierung

### 1. Strenge Header-Hierarchie

Vermeiden Sie es, Header-Ebenen für visuelle Effekte zu überspringen. Eine konsistente Hierarchie ermöglicht es LLMs, den Geltungsbereich und die Beziehungen verschiedener Abschnitte zu verstehen.

-   **`#` Titel**: Das primäre Thema der Seite.
-   **`##` Hauptkonzept**: Ein atomares, übergeordnetes Thema.
-   **`###` Detail**: Eine spezifische Unteraufgabe oder Eigenschaft.

*   **❌ Schlecht**: Verwendung von `###` direkt nach `#`, um eine kleinere Schriftgröße zu erzielen.
*   **✅ Gut**: `# Installation` gefolgt von `## Voraussetzungen` und `### Systemanforderungen`.

### 2. Beschreibende Metadaten für Medien

LLMs können Bilder oder Diagramme nicht "sehen". Stellen Sie architektonischen Kontext im Alt-Text oder in einem benachbarten Absatz bereit.

```markdown
![Systemarchitektur: Die Frontend-React-App kommuniziert über REST mit der Node.js-API, die einen Redis-Cache und eine PostgreSQL-Datenbank abfragt.](../../static/img/architecture.png)
```

### 3. Explizite Code-Block-Beschriftung

Geben Sie für jeden umzäunten Code-Block die Sprache an, um [Syntax-Highlighting](../../content/syntax/index.md) zu nutzen. Dadurch können LLMs den Abstract Syntax Tree (AST) korrekt parsen.

```json
  "plugins": {
    "llms": {}
  }
```

### 4. Semantische Container

Verwenden Sie [Callouts](../../content/containers/callouts.md) statt generischer Blockzitate, um Absichten zu verdeutlichen. Die semantischen Container von docmd helfen AI-Modellen, zentrale Anweisungen von ergänzenden Warnungen zu unterscheiden.

## Abwägungen

Semantische Strenge erfordert Disziplin. Sie können Markdown-Features nicht rein als dekorative Elemente verwenden. Diese Disziplin erzeugt jedoch Dokumentation, die sowohl für AI-Agenten als auch für menschliche Leser mit assistiven Technologien deutlich zugänglicher ist.