---
title: "Konfiguration"
description: "Vollständige Referenz der Optionen für die Initialisierung und dynamische Runtime-Updates von docmd-assistant."
---

`docmd-assistant` akzeptiert bei der Initialisierung ein flexibles `AssistantOptions`-Konfigurationsobjekt. Alle Einstellungen können auch dynamisch zur Laufzeit aktualisiert werden.

## Optionenschema-Referenz

```typescript
interface AssistantOptions {
  provider?: string;
  model?: string;
  apiKey?: string;
  baseURL?: string;
  relayUrl?: string;
  endpoint?: string;
  projectId?: string;
  systemPrompt?: string;
  history?: ChatMessage[];
  tools?: AssistantTool[];
  temperature?: number;
  maxTokens?: number;
  reasoning?: boolean | 'none' | 'low' | 'medium' | 'high';
  headers?: Record<string, string>;
}
```

## Parameter-Details

| Feld | Typ | Beschreibung | Standard |
| :---- | :--- | :---------- | :------ |
| `provider` | `string` | Ziel-KI-Anbieter (`'openai'`, `'anthropic'`, `'gemini'`, `'deepseek'`, `'groq'`, `'minimax'`, `'ollama'`) | Dynamisch |
| `model` | `string` | Modell-Bezeichner (z. B. `'gpt-4o-mini'`, `'claude-3-5-haiku-20241022'`) | Dynamisch |
| `apiKey` | `string` | Anbieter-API-Schlüssel für direkte Verbindung via `aiplug` | `undefined` |
| `baseURL` | `string` | Benutzerdefinierte Basis-API-Gateway-URL | `undefined` |
| `relayUrl` | `string` | Cloud-Relay-Endpunkt-URL für schlüsselloses Routing | `undefined` |
| `endpoint` | `string` | Alias für `relayUrl` | `'https://api.docmd.io/v1/ai/chat'` |
| `projectId` | `string` | Projekt-Bezeichner, der mit Relay-Anfragen gesendet wird | `undefined` |
| `systemPrompt` | `string` | Anweisungen zur Identität und zum Verhalten des Assistenten | System-Standard |
| `history` | `ChatMessage[]` | Vorbefüllter Konversationsverlauf | `[]` |
| `tools` | `AssistantTool[]` | Initiales Array registrierter Werkzeuge | `[]` |
| `temperature` | `number` | Sampling-Temperatur (0.0 bis 1.0) | Anbieter-Standard |
| `maxTokens` | `number` | Maximale Token pro Antwort | Anbieter-Standard |
| `reasoning` | `boolean \| string` | Umschalten des erweiterten Reasoning-Modus (`false`, `'low'`, `'medium'`, `'high'`) | `false` |
| `headers` | `Record<string, string>` | Benutzerdefinierte HTTP-Header für Relay-Anfragen | `{}` |

::: callout tip "Standard-System-Prompt"
Wenn kein `systemPrompt` angegeben ist, wendet die Engine einen Standard-Prompt an, der Regeln für die Assistentenidentität, bevorzugte Werkzeugaufrufe und klickbare Zitationslinks durchsetzt.
:::

## Aktualisieren von Optionen zur Laufzeit

Ändern Sie Konfigurationsoptionen dynamisch während einer aktiven Sitzung mit `updateOptions()`:

```typescript
assistant.updateOptions({
  provider: 'anthropic',
  model: 'claude-3-5-haiku-20241022',
  temperature: 0.2
});
```

## System-Prompt-Verwaltung

`docmd-assistant` bietet dedizierte Methoden zum Aktualisieren oder Anhängen von Systemanweisungen:

```typescript
// System-Prompt vollständig ersetzen
assistant.setSystemPrompt('Sie sind ein technischer Support-Spezialist für eine Entwicklerplattform.');

// Zusätzlichen Kontext anhängen
assistant.appendSystemPrompt('Antworten Sie immer auf Deutsch und stellen Sie Schritt-für-Schritt-Codebeispiele bereit.');

// Aktuellen System-Prompt abrufen
const currentPrompt = assistant.getSystemPrompt();
```

## Unterstützung für den Reasoning-Modus

Für Modelle, die erweitertes Reasoning unterstützen (wie DeepSeek-R1 oder OpenAI o3-mini), stellen Sie die Option `reasoning` ein:

```typescript
const assistant = new DocmdAssistantEngine({
  provider: 'deepseek',
  model: 'deepseek-reasoner',
  apiKey: process.env.DEEPSEEK_API_KEY,
  reasoning: 'medium'
});
```

## Benutzerdefinierte Relay-Header

Übergeben Sie benutzerdefinierte Header beim Routing durch Unternehmens-API-Gateways:

```typescript
const assistant = new DocmdAssistantEngine({
  relayUrl: 'https://internal-ai-gateway.company.com/v1/chat',
  headers: {
    'Authorization': 'Bearer my_enterprise_token',
    'X-Custom-Tenant-ID': 'tenant_12345'
  }
});
```
