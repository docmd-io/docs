---
title: "Programmierbare API"
description: "Vollständige Klassen-, Methoden- und Typenreferenz für DocmdAssistantEngine."
---

Das Paket `docmd-assistant` exportiert die Hauptklasse `DocmdAssistantEngine`, Standard-Hilfsfunktionen, Versionskonstanten und TypeScript-Typdefinitionen.

```typescript
import {
  DocmdAssistantEngine,
  createStandardTools,
  DEFAULT_SYSTEM_PROMPT,
  ENGINE_VERSION
} from 'docmd-assistant';
```

## Klasse: DocmdAssistantEngine

### Konstruktor

```typescript
new DocmdAssistantEngine(options?: AssistantOptions)
```

Initialisiert eine neue Engine-Instanz mit der angegebenen Konfiguration.

```typescript
const assistant = new DocmdAssistantEngine({
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
  systemPrompt: 'Sie sind ein KI-Dokumentationsassistent.'
});
```

## Nachrichten-Methoden

### sendMessage(content, overrideOptions?)

Hängt eine Benutzernachricht an den Verlauf an, führt die Konversationsrunde aus und gibt ein `ChatResponse`-Promise zurück.

```typescript
public async sendMessage(
  content: string,
  overrideOptions?: Partial<AssistantOptions>
): Promise<ChatResponse>
```

**Parameter:**

| Parameter | Typ | Beschreibung |
| :-------- | :--- | :---------- |
| `content` | `string` | Nachrichtentext des Benutzers |
| `overrideOptions` | `Partial<AssistantOptions>` | Optionale Konfigurations-Overrides für eine Runde |

**Rückgabewert:** `Promise<ChatResponse>`

```typescript
interface ChatResponse {
  message: string;
  role: 'assistant';
  unconfigured?: boolean;
  unconfiguredData?: any;
  history: ChatMessage[];
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}
```

### sendMessageStream(content, callbacks, overrideOptions?)

Führt eine Konversationsrunde mit Live-Token-Streaming, Tool-Aufruf-Benachrichtigungen und Zwischenergebnissen durch.

```typescript
public async sendMessageStream(
  content: string,
  callbacks: StreamCallbacks,
  overrideOptions?: Partial<AssistantOptions>
): Promise<ChatResponse>
```

**Stream Callbacks Schnittstelle:**

```typescript
interface StreamCallbacks {
  onChunk: (chunk: string, meta?: { replace?: boolean; turn?: number }) => void;
  onToolCall?: (toolCall: any) => void;
  onToolResult?: (toolResult: any) => void;
  onComplete?: (fullText: string) => void;
  onError?: (error: any) => void;
}
```

### Atomares Rollback bei Fehlern

Schlägt eine Runde aufgrund eines Netzwerkfehlers oder einer Unerreichbarkeit des Relays fehl, entfernt die Engine die ausstehende Benutzernachricht atomar aus `engine.getHistory()`. Dadurch bleibt der Konversationsverlauf intakt und unverfälscht.

## Erweiterte Lifecycle-Hooks

`docmd-assistant` bietet nicht-invasive Lifecycle-Hooks für Plugins (wie `@docmd/plugin-ai`) und benutzerdefinierte Integrationen:

```typescript
const assistant = new DocmdAssistantEngine({
  // Tool-Ergebnisse vor Injektion in den Prompt aufbereiten
  formatToolResult: (toolName, rawResult) => {
    return rawResult;
  },

  // Konversationsverlauf vor dem Senden komprimieren
  compactHistory: async (history) => {
    return history.length > 8 ? history.slice(-6) : history;
  },

  // Kontext vor der Ausführung transformieren
  transformContext: (context) => {
    return context;
  },

  // Ausgehende Payload zur Überwachung einsehen
  onPayload: (payload) => {
    console.debug('Payload gesendet:', payload);
  }
});
```

## Tool-Verwaltungsmethoden

### registerTool(tool)

Registriert einen Tool-Handler auf der Engine-Instanz.

```typescript
public registerTool(tool: AssistantTool): this
```

### unregisterTool(name)

Entfernt ein Tool nach Name.

```typescript
public unregisterTool(name: string): boolean
```

### getTools()

Gibt ein Array aller registrierten Tools zurück.

```typescript
public getTools(): AssistantTool[]
```

### getTool(name)

Gibt die Definition eines spezifischen Tools zurück.

```typescript
public getTool(name: string): AssistantTool | undefined
```

### executeTool(name, args)

Führt ein registriertes Tool manuell mit Argumenten aus.

```typescript
public async executeTool(name: string, args: any): Promise<any>
```

## Konfigurations- & System-Prompt-Methoden

### updateOptions(newOptions)

Aktualisiert Optionen dynamisch zur Laufzeit.

```typescript
public updateOptions(newOptions: Partial<AssistantOptions>): this
```

### setSystemPrompt(prompt)

Ersetzt den aktiven System-Prompt.

```typescript
public setSystemPrompt(prompt: string): this
```

### appendSystemPrompt(additionalPrompt)

Hängt Text an den bestehenden System-Prompt an.

```typescript
public appendSystemPrompt(additionalPrompt: string): this
```

### getSystemPrompt()

Gibt den aktiven System-Prompt zurück.

```typescript
public getSystemPrompt(): string
```

## Verlaufs-Verwaltungsmethoden

### getHistory()

Gibt eine Kopie des aktuellen Konversationsverlaufs zurück.

```typescript
public getHistory(): ChatMessage[]
```

### setHistory(history)

Ersetzt den aktuellen Konversationsverlauf.

```typescript
public setHistory(history: ChatMessage[]): this
```

### clearHistory()

Löscht alle Nachrichten und emittiert ein `'clear'`-Event.

```typescript
public clearHistory(): this
```

### addMessage(message)

Fügt ein Nachrichtenobjekt direkt zum Verlauf hinzu.

```typescript
public addMessage(message: ChatMessage): this
```

## Event-Abonnements

### on(event, listener)

Registriert einen Listener für Engine-Events (`'message'`, `'tool_call'`, `'tool_result'`, `'error'`, `'clear'`).

```typescript
public on(event: AssistantEventType, listener: AssistantEventListener): this
```

### off(event, listener)

Entfernt einen Event-Listener.

```typescript
public off(event: AssistantEventType, listener: AssistantEventListener): this
```

## Exportierte Typen & Konstanten

```typescript
import { ENGINE_VERSION } from 'docmd-assistant';
```

Typdefinitionen:

```typescript
import type {
  AssistantOptions,
  AssistantTool,
  AssistantToolParameters,
  AssistantToolParameterProperty,
  ChatMessage,
  ChatResponse,
  SearchResultItem,
  StreamCallbacks,
  AssistantEventType,
  AssistantEvent,
  AssistantEventListener
} from 'docmd-assistant';
```
