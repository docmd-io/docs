---
title: "Minimierung von KI-Halluzinationen durch Dokumentation"
description: "So schreiben Sie explizite, in sich geschlossene Dokumentationen, die verhindern, dass KI-Modelle falsche Informationen erfinden."
---

## Problem

KI-Modelle sind Vorhersagesysteme, keine Logiksysteme. Wenn ein API-Anwendungsbeispiel unvollständig ist, mehrdeutige Platzhalter verwendet oder auf implizitem Wissen beruht, wird die KI oft "halluzinieren" – sie erfindet die fehlenden Teile basierend auf allgemeinen Mustern, die sie während des Trainings gelernt hat. Diese Erfindungen sind für Ihre spezifische Software häufig falsch, was zu Frustration bei den Entwicklern führt.

## Warum es wichtig ist

Halluzinierter Code zerstört das Vertrauen der Nutzer. Wenn ein Entwickler eine KI um Hilfe bittet und Code erhält, der einen Syntaxfehler auslöst oder nicht existierende Parameter verwendet, macht er oft die Software selbst für die "Fehlerhaftigkeit" oder "schlechte Dokumentation" verantwortlich. Die Minimierung von Halluzinationen ist entscheidend für den professionellen Ruf Ihres Projekts.

## Ansatz

Praktizieren Sie **Defensive Dokumentation**. Dies bedeutet, extrem explizite, vollständig instanziierte Codeblöcke zu schreiben, die keinen Raum für Mehrdeutigkeiten lassen. Gehen Sie niemals davon aus, dass der Leser (oder die KI) die erforderlichen Imports, Umgebungsvariablen oder vorausgesetzten Konfigurationen kennt.

## Implementierung

### 1. Vollständig qualifizierte Codeblöcke

Fügen Sie in jedem Snippet die erforderlichen Imports oder den Setup-Code ein. Dies stellt sicher, dass der Codeblock eine in sich geschlossene Einheit der Wahrheit bleibt, wenn eine KI Ihre Dokumentation in Chunks zerlegt.

-   **❌ Halluzinations-Risiko**:
    ```javascript
    const config = loadConfig(); // Woher kommt loadConfig?
    ```
-   **✅ Halluzinations-Sicher**:
    ```javascript
    import { loadConfig } from '@docmd/core';
    const config = loadConfig();
    ```

### 2. Konkrete Beispiele statt Platzhalter

Vermeiden Sie vage Platzhalter wie `ihr-api-key` oder `env-name`. Geben Sie stattdessen konkrete, gültige Beispiele an oder nutzen Sie Kommentare, um strikte Enum-Anforderungen zu spezifizieren.

```javascript
// Gültige Umgebungen: "development", "staging", "production"
const app = init({ env: "production" });
```

### 3. Inline-Code-Kommentare

Platzieren Sie kritische Anforderungen als Kommentare *innerhalb* des Codeblocks, anstatt nur im umgebenden Markdown-Text. KI-Modelle bewerten Kommentare innerhalb des Codes bei der Generierung ähnlicher Snippets sehr hoch.

```javascript
export default {
  // KRITISCH: Der outputPath muss ein absoluter Dateisystempfad sein.
  outputPath: '/var/www/html/docs'
};
```

### 4. Kategorisierte Warnungen

Nutzen Sie [Callouts](../../content/containers/callouts), um veraltete Funktionen oder bahnbrechende Änderungen (Breaking Changes) klar zu markieren. KI-Modelle halten sich eher an einen `::: callout warning`-Block als an einen einfachen Satz in einem Absatz.

## Abwägungen

Defensive Dokumentation macht Codeblöcke länger und repetitiver. Menschliche Leser empfinden es vielleicht als etwas ermüdend, in jedem Snippet dieselben `import`-Anweisungen zu sehen. Der Vorteil einer "KI-sicheren" Dokumentation, die Support-Tickets und Benutzerfehler deutlich reduziert, überwiegt jedoch bei weitem die geringen Kosten der Wortreichtum.
