---
title: "KI-Assistent Einrichtung & Integration"
description: "So konfigurieren und deployen Sie docmds interaktiven KI-Assistenten für RAG-gestützte Dokumentationsunterstützung."
---

Der docmd KI-Assistent bietet Lesern Echtzeit-Antworten mit Kontextbezug, die direkt aus Ihren Markdown-Dokumenten abgeleitet werden. Angetrieben von `@docmd/plugin-ai` und `aiplug` führt der Assistent Retrieval-Augmented Generation (RAG) mit dem vorgefertigten Suchindex Ihrer Website aus und hält API-Schlüssel sicher auf der Serverseite.

## Voraussetzungen

Stellen Sie vor der Konfiguration des KI-Assistenten sicher:
1. `@docmd/plugin-search` ist in `docmd.config.json` aktiviert (erforderlich für RAG-Kontext-Extraktion).
2. Sie besitzen einen API-Schlüssel für Ihren bevorzugten Anbieter (OpenAI, Anthropic, Gemini, DeepSeek, Groq oder Ollama).

## Bereitstellungsarchitektur: Wählen Sie Ihre Strategie

Der docmd KI-Assistent unterstützt zwei primäre Bereitstellungsmodelle:

| Architektur | Geeignet für | Backend-Infrastruktur | API-Schlüsselsicherheit |
| :--- | :--- | :--- | :--- |
| **Kostenloses docmd Cloud-Relay** | Statische Websites (GitHub Pages, Cloudflare Pages, Netlify, Vercel, S3) | Null Server — betrieben über das verwaltete serverlose Relay von docmd | Im Ruhezustand via Hardware-KMS verschlüsselt |
| **Selbst gehosteter Server** | Dynamische Node.js-Apps, Docker-Container, Firmenintranets | Eigener Node.js-Server (`docmd dev` / `docmd serve`) | Umgebungsvariablen auf dem Server |
| **Lokales LLM (Ollama)** | Isolierte Netzwerke, lokale Entwicklung, null Cloud-Abhängigkeiten | Lokale Workstation mit `ollama` | Lokaler Localhost-Endpunkt |

---

## Strategie 1: Kostenloses docmd Cloud-Relay (Null Infrastruktur)

Für statisches Jamstack-Hosting stellt docmd unter [cloud.docmd.io](https://cloud.docmd.io) eine kostenlose Cloud-Relay-Plattform bereit. Diese leitet KI-Anfragen sicher weiter, ohne dass Sie einen Node.js-Server betreiben müssen oder API-Schlüssel preisgeben.

### 1. Cloud-Projekt erstellen
1. Rufen Sie [cloud.docmd.io](https://cloud.docmd.io) auf und melden Sie sich an.
2. Klicken Sie auf **Projekt erstellen (Create New Project)**, vergeben Sie einen Namen (z. B. `Entwickler-Docs`) und tragen Sie Ihre **Zugehörige Domain-Adresse** ein (z. B. `docs.mycompany.com`).
3. Aktivieren Sie für lokale Entwicklungstests die Option **Localhost-Tests aktivieren (127.0.0.1 / localhost)**.

### 2. BYOK-Provider-Schlüssel konfigurieren
1. Wechseln Sie im Projekt-Dashboard zu **Assistenten-Modell & BYOK-Schlüssel-Einrichtung**.
2. Wählen Sie Ihren KI-Anbieter (OpenAI, Anthropic, Google Gemini, Groq, DeepSeek etc.).
3. Geben Sie den Modellnamen an (z. B. `gpt-4o-mini`, `claude-3-5-haiku-20241022`, `gemini-1.5-flash`).
4. Geben Sie Ihren API-Schlüssel ein, klicken Sie auf **Verbindung testen**, und speichern Sie die Einstellungen.

### 3. Projekt-ID in `docmd.config.json` eintragen
Kopieren Sie im Tab **Integration** den Konfigurationsabschnitt in Ihre `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "indexBody": true
    },
    "ai": {
      "assistant": true,
      "projectId": "docmd_aiv77jc8ms8qtpvd",
      "position": "bottom-center",
      "greeting": "Wie kann ich heute bei dieser Dokumentation helfen?",
      "suggestions": [
        "Wie starte ich?",
        "Konfigurationsoptionen anzeigen",
        "Schlüsselkonzepte erklären"
      ]
    }
  }
}
```

Bauen Sie die Seite und laden Sie die statischen Dateien auf einen beliebigen Host (GitHub Pages, S3, Cloudflare Pages). Der Assistent baut automatisch eine sichere, domain-authentifizierte Verbindung über das Relay auf.

---

## Strategie 2: Selbst gehosteter Server (Umgebungs-BYOK)

Wenn Sie docmd auf einem Node.js-Server oder im Docker-Container ausführen:

### 1. Konfiguration

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

::: callout tip title:"Empfohlene Modelle" icon:sparkles
Für das optimale Verhältnis von Antwortgeschwindigkeit zu Kosten empfehlen wir schnelle Reasoning-Modelle wie `gpt-4o-mini` (OpenAI), `claude-3-5-haiku-20241022` (Anthropic) oder `gemini-1.5-flash` (Google).
::: /callout

### 2. Anbieter-Zugangsdaten festlegen

Um jeden Verlust von Zugangsdaten zu verhindern, werden API-Schlüssel ausschließlich aus Umgebungsvariablen auf Ihrem Server gelesen:

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

Starten Sie den Server mit `docmd dev` oder `docmd serve`. Die Client-Schublade kommuniziert über sichere RPC-Aktionshandler mit dem Server.

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
