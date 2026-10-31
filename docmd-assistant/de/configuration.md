---
title: "Konfiguration"
description: "Vollständige Optionsreferenz für die Initialisierung, Lifecycle-Hooks und dynamische Laufzeit-Updates von docmd-assistant."
---

`docmd-assistant` akzeptiert bei der Initialisierung ein flexibles `AssistantOptions`-Objekt. Alle Einstellungen können auch zur Laufzeit dynamisch aktualisiert werden.

## Options-Schema-Referenz

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
  contextWindow?: number;
  formatToolResult?: (toolName: string, rawResult: any) => any;
  compactHistory?: (history: ChatMessage[]) => ChatMessage[] | Promise<ChatMessage[]>;
  transformContext?: (context: { systemPrompt: string; history: ChatMessage[]; tools?: any[]; payload?: any }) => any;
  onPayload?: (payload: any) => void;
}
```

## Parameterdetails

| Feld | Typ | Beschreibung | Standard |
| :--- | :--- | :----------- | :------- |
| `provider` | `string` | Ziel-KI-Anbieter (`'openai'`, `'anthropic'`, `'gemini'`, `'deepseek'`, `'groq'`, `'minimax'`, `'ollama'`) | Dynamisch |
| `model` | `string` | Zielmodell-ID (z. B. `'gpt-4o-mini'`, `'claude-3-5-haiku-20241022'`) | Dynamisch |
| `apiKey` | `string` | Provider-API-Schlüssel für direkte Anbindung via `aiplug` | `undefined` |
| `baseURL` | `string` | Benutzerdefinierte API-Gateway-Basis-URL | `undefined` |
| `relayUrl` | `string` | Cloud-Relay-Endpunkt für schlüsselloses Routing | `undefined` |
| `endpoint` | `string` | Alias für `relayUrl` | `'https://api.docmd.io/v1/ai/chat'` |
| `projectId` | `string` | Projekt- oder Website-ID für Relay-Anfragen | `undefined` |
| `systemPrompt` | `string` | Basis-Anweisungen zur Steuerung von Identität und Verhalten | System-Standard |
| `history` | `ChatMessage[]` | Vorbefüllter Konversationsverlauf | `[]` |
| `tools` | `AssistantTool[]` | Initial registrierte Tools | `[]` |
| `temperature` | `number` | Sampling-Temperatur (0.0 bis 1.0) | Provider-Standard |
| `maxTokens` | `number` | Maximale Tokens pro Antwort | Provider-Standard |
| `reasoning` | `boolean \| string` | Erweiterter Reasoning-Modus (`false`, `'low'`, `'medium'`, `'high'`) | `false` |
| `headers` | `Record<string, string>` | Benutzerdefinierte HTTP-Header für Relay-Anfragen | `{}` |
| `contextWindow` | `number` | Zeichenlimit für Dokumentationskontext pro Runde. `0` = unbegrenzt. | `0` (unbegrenzt) |
| `formatToolResult` | `function` | Hook zum Formatieren oder Filtern von Tool-Ausgaben. | `undefined` |
| `compactHistory` | `function` | Hook zum Komprimieren von Verlaufsnachrichten vor dem Senden. | `undefined` |
| `transformContext` | `function` | Hook zur Kontext-Transformation vor der Anfrageausführung. | `undefined` |
| `onPayload` | `function` | Lese-Hook zur Inspektion der vorbereiteten ausgehenden Payload. | `undefined` |

::: callout tip "Standard-System-Prompt"
Wird kein `systemPrompt` angegeben, verwendet die Engine einen Standard-Prompt, der docmd-Regeln, Such-Priorisierung und präzise Markdown-Zitate durchsetzt.
:::

## Lifecycle-Hooks-Konfiguration

Downstream-Pakete (wie `@docmd/plugin-ai`) oder eigene Integrationen können Lifecycle-Hooks registrieren:

```typescript
const assistant = new DocmdAssistantEngine({
  formatToolResult: (toolName, rawResult) => {
    return rawResult;
  },
  compactHistory: async (history) => {
    return history.length > 8 ? history.slice(-6) : history;
  },
  transformContext: (context) => {
    return context;
  },
  onPayload: (payload) => {
    console.debug('Ausgehende Payload:', payload);
  }
});
```

## Optionen zur Laufzeit aktualisieren

Passen Sie Einstellungen während einer aktiven Sitzung dynamisch an:

```typescript
assistant.updateOptions({
  provider: 'anthropic',
  model: 'claude-3-5-haiku-20241022',
  temperature: 0.2
});
```

## System-Prompt verwalten

```typescript
// System-Prompt vollständig ersetzen
assistant.setSystemPrompt('Sie sind technischer Support-Spezialist.');

// Zusätzliche Anweisungen anhängen
assistant.appendSystemPrompt('Antworten Sie immer präzise mit Codebeispielen.');

// Aktiven System-Prompt abfragen
const currentPrompt = assistant.getSystemPrompt();
```

## Reasoning-Modus

Für Modelle mit erweiterter Argumentation (wie DeepSeek-R1 oder OpenAI o3-mini):

```typescript
const assistant = new DocmdAssistantEngine({
  provider: 'deepseek',
  model: 'deepseek-reasoner',
  apiKey: process.env.DEEPSEEK_API_KEY,
  reasoning: 'medium'
});
```

## Benutzerdefinierte Relay-Header

```typescript
const assistant = new DocmdAssistantEngine({
  relayUrl: 'https://internal-ai-gateway.company.com/v1/chat',
  headers: {
    'Authorization': 'Bearer my_enterprise_token',
    'X-Custom-Tenant-ID': 'tenant_12345'
  }
});
```
