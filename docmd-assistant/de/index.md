---
title: "docmd-assistant"
description: "Entkoppelte Headless-KI-Engine für Dokumentationswebsites."
---

`docmd-assistant` ist eine entkoppelte Headless-KI-Engine für Dokumentationswebsites und Entwickleranwendungen.

::: callout tip "Headless-Architektur"
`docmd-assistant` verwaltet den Status, System-Prompts und Tool-Aufrufe. Sie können Ihre eigene Benutzeroberfläche mit React, Vue oder Vanilla JS gestalten.
:::

## Hauptmerkmale

::: grid

::: card "Multi-Anbieter Support" icon:cpu
Unterstützung für OpenAI, Anthropic, Gemini, DeepSeek, Groq, MiniMax und lokales Ollama.
:::

::: card "Standard-Werkzeuge" icon:search
Integrierte Werkzeuge für Volltextsuche, Seitenleser, Navigation und Code-Kopieren.
:::

::: card "Cloud-Relay-Modus" icon:shield
Unterstützung für Cloud-Relays zum Schutz von API-Schlüsseln auf der Client-Seite.
:::

::: card "Echtzeit-Eventbus" icon:activity
Reagieren Sie auf `message`, `tool_call`, `tool_result` und `error` Events.
:::

:::

## Schnellstart

```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY
});

const response = await assistant.sendMessage('Wie konfiguriere ich die Búsqueda?');
console.log(response.message);
```

## Dokumentationsseiten

| Seite | Beschreibung |
| :--- | :---------- |
| [Erste Schritte](getting-started) | Installation, Anforderungen und erste Schritte |
| [Konfiguration](configuration) | Optionenschema, Runtime-Updates und Relay-Einstellungen |
| [Engine-Architektur](how-it-works) | Pipeline-Ablauf, Eventbus und Payload-Formate |
| [Werkzeug-System](tools) | Custom Tools, Standard-Werkzeuge und DOM-Scraper |
| [Programmierbare API](api) | Vollständige Klassenreferenz für `DocmdAssistantEngine` |
