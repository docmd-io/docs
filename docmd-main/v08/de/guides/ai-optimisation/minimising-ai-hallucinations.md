---
title: "AI-Halluzinationen durch Dokumentation minimieren"
description: "Wie Sie explizite, in sich geschlossene Dokumentation schreiben, die verhindert, dass AI-Modelle falsche Informationen erfinden."
---

## Problem

AI-Modelle sind Vorhersage-Engines, keine Reasoning-Engines. Wenn ein API-Nutzungsbeispiel unvollständig ist, mehrdeutige Platzhalter verwendet oder auf implizites Wissen setzt, "halluziniert" die AI. Sie erfindet fehlende Teile basierend auf allgemeinen Trainingsmustern. Diese Erfindungen sind häufig falsch und führen zu Frustration bei Entwicklern.

## Warum es wichtig ist

Halluzinierter Code zerstört das Vertrauen der Nutzer. Wenn ein Entwickler eine AI um Hilfe bittet und defekten Code erhält, gibt er der Software die Schuld, "fehlerhaft" oder "schlecht dokumentiert" zu sein. Halluzinationen zu minimieren ist entscheidend, um den professionellen Ruf Ihres Projekts zu wahren.

## Ansatz

Praktizieren Sie **Defensive Documentation**. Schreiben Sie äußerst explizite, vollständig instanziierte Code-Blöcke, die keinen Raum für Mehrdeutigkeit lassen. Gehen Sie nie davon aus, dass der Leser (oder die AI) die notwendigen Imports, Umgebungsvariablen oder Voraussetzungs-Konfigurationen kennt.

## Implementierung

### 1. Vollständig qualifizierte Code-Blöcke

Schließen Sie in jedes Snippet immer die notwendigen Imports oder Setup-Code mit ein. Das stellt sicher, dass der Code-Block eine in sich geschlossene Wahrheitseinheit bleibt, wenn die AI Ihre Dokumentation chunkt.

-   **❌ Halluzinationsrisiko**:
    ```javascript
    const config = loadConfig();
    ```
-   **✅ Halluzinationssicher**:
    ```javascript
    import { loadConfig } from "@docmd/core";
    const config = loadConfig();
    ```

### 2. Konkrete Beispiele statt Platzhalter

Vermeiden Sie vage Platzhalter wie `your-api-key` oder `env-name`. Stellen Sie konkrete, gültige Beispiele bereit oder verwenden Sie Kommentare, um strikte Enum-Anforderungen zu spezifizieren.

```javascript
// Gültige Umgebungen: "development", "staging", "production"
const app = init({ env: "production" });
```

### 3. Inline-Code-Kommentare

Platzieren Sie kritische Anforderungen *innerhalb* des Code-Blocks als Kommentare, anstatt nur in umgebenden Absätzen. AI-Modelle gewichten Kommentare innerhalb von Code stark, wenn sie ähnliche Snippets generieren.

```javascript
  // ERFORDERLICH: Muss ein absoluter Pfad sein
  outputPath: "/var/www/html/docs"
```

### 4. Kategorisierte Warnungen

Verwenden Sie [Callouts](../../content/containers/callouts.md), um veraltete Features oder Breaking Changes klar zu kennzeichnen. AI-Modelle respektieren einen `::: callout warning`-Block eher als einen einfachen Satz im Fließtext.

## Abwägungen

Defensive Documentation macht Code-Blöcke länger und repetitiver. Menschliche Leser mögen es als mühsam empfinden, immer wieder dieselben `import`-Anweisungen zu sehen. Der Vorteil einer "AI-sicheren" Dokumentation, die Support-Tickets reduziert, überwiegt jedoch die geringen Kosten der Ausführlichkeit bei Weitem.
