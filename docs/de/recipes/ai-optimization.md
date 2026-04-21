---
title: "Optimierung für KI-Agenten"
description: "Gestalten Sie Ihre Dokumentation für eine maximale Erfassbarkeit durch LLMs und KI-Agenten."
---

`docmd` ist als „AI-First“-Dokumentations-Engine konzipiert. Indem Sie diese bewährten strukturellen Praktiken befolgen, stellen Sie sicher, dass LLMs (wie ChatGPT, Claude und GitHub Copilot) die Logik und Architektur Ihres Projekts mit chirurgischer Präzision analysieren können.

## 1. Das LLM-Plugin aktivieren

Die Basis für die KI-Optimierung ist das native `llms`-Plugin. Es generiert strukturierte Kontextdateien, die speziell für das Einlesen durch Modelle entwickelt wurden.

```javascript
// docmd.config.js
export default {
  plugins: {
    llms: { 
      fullContext: true // Generiert die umfassende llms-full.txt
    }
  }
}
```

## 2. Semantische Integrität der Überschriften

KI-Modelle nutzen H-Tags, um eine hierarchische Karte technischer Zusammenhänge aufzubauen.

*   **Logische Abfolge**: Überspringen Sie niemals Überschriftenebenen (gehen Sie immer H1 → H2 → H3).
*   **Technische Dichte**: Verwenden Sie aussagekräftige Überschriften. Statt „Auth“ nutzen Sie „Implementierung von OAuth2-Password-Grants“.
*   **Einzigartiges H1**: Stellen Sie sicher, dass der `title` im Markdown-Frontmatter beschreibend ist; `docmd` nutzt dies als primären semantischen Einstiegspunkt.

## 3. Lexikalische Code-Metadaten

Geben Sie bei Code-Blöcken immer explizit die Sprachkennung an. Dies ermöglicht es dem internen Tokenizer der KI, bei der Kontextabfrage die korrekten Grammatikregeln anzuwenden.

````markdown
```typescript
// Optimierter Einstiegspunkt
const docmd = new Engine();
```
````

## 4. Nutzung der Kontext-Pipeline

Die Datei `llms-full.txt` ist ein hochwertiger, zusammengefügter Stream Ihrer gesamten statischen Website.

*   **Prompt Engineering**: Weisen Sie Ihre KI an: *"Nutze die semantische Struktur in /llms.txt und den umfassenden technischen Inhalt in /llms-full.txt, um diese Codebasis zu analysieren."*
*   **Kontext-Steuerung**: Verwenden Sie `llms: false` im Frontmatter spezifischer Seiten, um sensible oder rein interne Dokumentationen vom öffentlichen KI-Kontext-Stream auszuschließen.

## 5. Hochwertige Alt-Texte

Obwohl sehfähige Modelle (multimodale LLMs) Fortschritte machen, bleibt beschreibender Text das zuverlässigste Signal für Logik-Engines. Umfassende `alt`-Texte für Diagramme und Screenshots stellen sicher, dass der Agent die visuelle Logik auch in reinen Textverarbeitungsphasen versteht.