---
title: "Strukturierung der Dokumentation für KI-Agenten"
description: "Wie Sie von visueller Formatierung zu semantischer Strukturierung übergehen, um die Genauigkeit von KI-Codierungsassistenten zu verbessern."
---

## Problem

Menschliche Leser verlassen sich auf visuelle Hinweise, die Navigation in der Seitenleiste und abgeleiteten Kontext, um Dokumentationen zu verstehen. KI-Agenten und Large Language Models (LLMs) konsumieren jedoch primär rohe Textströme. Wenn einer Dokumentation eine strenge semantische Struktur fehlt, haben diese Modelle Schwierigkeiten, Beziehungen zwischen Konzepten abzubilden, was zu mangelhaften Schlussfolgerungen und ungenauen Codierungsvorschlägen führt.

## Warum es wichtig ist

Wenn Ihre Dokumentation nicht für LLMs optimiert ist, werden Entwickler, die Tools wie GitHub Copilot, Cursor oder ChatGPT verwenden, bei der Arbeit mit Ihrer Software mehr Halluzinationen erleben. Dies verschlechtert direkt die Entwicklererfahrung, da Benutzer oft das Produkt selbst für die von ihren KI-Assistenten generierten Fehler verantwortlich machen.

## Ansatz

Wechseln Sie von einer "Visual-First"-Mentalität zu einer **"Semantic-First"**-Mentalität. Verwenden Sie Standard-Markdown-Funktionen — wie strenge Überschriftenhierarchien, explizite Sprach-Tags für Codeblöcke und beschreibende Alt-Texte —, um einen klaren, maschinenlesbaren Fahrplan für Ihre Inhalte bereitzustellen. `docmd` verarbeitet diese Struktur über das [LLMs-Plugin](../../plugins/llms.md) zu optimierten Ausgaben.

## Implementierung

### 1. Strenge Überschriftenhierarchie

Vermeiden Sie es, Überschriftenebenen nur für rein visuelle Effekte zu überspringen. Eine konsistente Hierarchie ermöglicht es LLMs, den Umfang und die Beziehung verschiedener Abschnitte zu verstehen.

-   **`#` Titel**: Das Hauptthema der Seite.
-   **`##` Hauptkonzept**: Ein atomares, übergeordnetes Thema.
-   **`###` Detail**: Eine spezifische Teilaufgabe oder Eigenschaft dieses Konzepts.

*   **❌ Schlecht**: Die Verwendung von `###` unmittelbar nach `#`, nur weil Ihnen die kleinere Schriftgröße gefällt.
*   **✅ Gut**: `# Installation` gefolgt von `## Voraussetzungen` und dann `### Systemanforderungen`.

### 2. Beschreibende Metadaten für Medien

Da LLMs Bilder oder Diagramme nicht "sehen" können, müssen Sie den architektonischen Kontext im Alternativtext oder einem angrenzenden Absatz bereitstellen.

```markdown
![Systemarchitektur: Die Frontend-React-Anwendung kommuniziert über REST mit der Node.js-API, die wiederum einen Redis-Cache und eine PostgreSQL-Datenbank abfragt.](../../static/img/architecture.png)
```

### 3. Explizite Kennzeichnung von Codeblöcken

Geben Sie für jeden Fenced Code Block immer die Sprache mithilfe von [Syntax Highlighting](../../content/syntax/index.md) an. Dies ermöglicht es LLMs, den Abstract Syntax Tree (AST) des Codes korrekt zu parsen.

```javascript
// docmd.config.js
export default {
  plugins: ['llms']
};
```

### 4. Semantische Container

Verwenden Sie [Callouts](../../content/containers/callouts.md) anstelle von generischen Blockzitaten, um eine Absicht (Intent) zu vermitteln. Die semantischen Container von `docmd` helfen KI-Modellen, zwischen Kernanweisungen und ergänzenden Tipps oder Warnungen zu unterscheiden.

## Abwägungen

Semantische Strenge erfordert Disziplin von den Autoren. Sie können Markdown-Funktionen (wie Blockzitate oder Überschriften) nicht mehr als rein dekorative Elemente verwenden. Diese Disziplin führt jedoch zu einer Dokumentation, die sowohl für KI-Agenten als auch für menschliche Leser, die assistierende Technologien verwenden, deutlich zugänglicher ist.
