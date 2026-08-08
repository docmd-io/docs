---
title: "KI-Assistent Einrichtung & Integration"
description: "So konfigurieren und deployen Sie docmds interaktiven KI-Assistenten für RAG-gestützte Dokumentationsunterstützung."
---

Der docmd KI-Assistent bietet Lesern Echtzeit-Antworten mit Kontextbezug, die direkt aus Ihren Markdown-Dokumenten abgeleitet werden. Angetrieben von `@docmd/plugin-ai` und `aiplug` führt der Assistent Retrieval-Augmented Generation (RAG) mit dem vorgefertigten Suchindex Ihrer Website aus und hält API-Schlüssel sicher auf der Serverseite.

## Voraussetzungen

Stellen Sie vor der Konfiguration des KI-Assistenten sicher:
1. `@docmd/plugin-search` ist in `docmd.config.json` aktiviert (erforderlich für RAG-Kontext-Extraktion).
2. Sie besitzen einen API-Schlüssel für Ihren bevorzugten Anbieter (OpenAI, Anthropic, Gemini, DeepSeek, Groq oder Ollama).

## Konfiguration

Fügen Sie den `ai`-Plugin-Block zu Ihrer `docmd.config.json` hinzu:

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "indexBody": true
    },
    "ai": {
      "assistant": true,
      "provider": "openai",
      "model": "gpt-4o-mini",
      "position": "bottom-center",
      "greeting": "Wie kann ich heute bei dieser Dokumentation helfen?",
      "suggestions": [
        "Wie starte ich?",
        "Konfigurationsoptionen anzeigen",
        "Schlüsselkonzepte erklären"
      ],
      "contextLimit": 5,
      "captcha": false
    }
  }
}
```

::: callout tip "Empfohlene Modelle" icon:sparkles
Für das optimale Verhältnis von Antwortgeschwindigkeit zu Kosten empfehlen wir schnelle Reasoning-Modelle wie `gpt-4o-mini` (OpenAI), `claude-3-5-haiku-20241022` (Anthropic) oder `gemini-1.5-flash` (Google).
:::

## Anbieter-Zugangsdaten festlegen

Um jeden Verlust von Zugangsdaten zu verhindern, werden API-Schlüssel ausschließlich aus Umgebungsvariablen gelesen:

```bash
# OpenAI
export OPENAI_API_KEY="sk-..."

# Anthropic
export ANTHROPIC_API_KEY="sk-ant-..."

# Google Gemini
export GEMINI_API_KEY="AIzaSy..."

# Generischer Fallback-Schlüssel
export AI_API_KEY="ihr-api-schluessel"
```

Starten Sie Ihren Entwicklungs- oder Produktions-Webserver nach dem Exportieren der Schlüssel. Die clientseitige Assistenten-Schublade kommuniziert über sichere RPC-Action-Handler mit dem Server.

## Feinabstimmung von RAG & Suchkontext

Der KI-Assistent verwendet `@docmd/plugin-search`-Daten, um Fakten-Snippets aus der Dokumentation zu extrahieren, bevor er Prompts ausführt.

### 1. Kontext-Tiefe erhöhen

Passen Sie `contextLimit` an, um zu steuern, wie viele Markdown-Häppchen an das Modell übergeben werden:

```json
{
  "plugins": {
    "ai": {
      "contextLimit": 8
    }
  }
}
```

Höhere `contextLimit`-Werte verbessern die Antwortgenauigkeit bei komplexen Fragen über mehrere Seiten hinweg, erhöhen jedoch den Prompt-Token-Verbrauch.

### 2. Schutz vor Bot-Missbrauch

Verhindern Sie automatisierten Skript-Missbrauch durch Konfiguration von Gleitfenster-Ratenbegrenzungen oder durch Aktivierung eingebauter Proof-of-Work-CAPTCHA-Challenges:

```json
{
  "plugins": {
    "ai": {
      "captcha": true,
      "rateLimit": {
        "maxRequests": 10,
        "windowMs": 60000
      }
    }
  }
}
```

## Lokales LLM-Deployment (Ollama)

Für isolierte Umgebungen oder lokale Tests konfigurieren Sie `@docmd/plugin-ai` so, dass es auf eine lokale Ollama-Instanz zugreift:

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "provider": "ollama",
      "model": "llama3.2:3b",
      "baseUrl": "http://localhost:11434"
    }
  }
}
```

Stellen Sie sicher, dass Ollama lokal läuft (`ollama serve`), bevor Sie docmd bauen oder starten.

::: callout info "Theme-Integration" icon:palette
Der schwebende Auslöser und die Glassmorphism-Schublade des KI-Assistenten passen sich automatisch an das aktive Erscheinungsbild Ihres Themes (heller oder dunkler Modus) an und beachten die Grenzen der Menüleiste.
:::
