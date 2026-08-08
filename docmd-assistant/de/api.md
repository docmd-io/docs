---
title: "Programmierbare API"
description: "Vollständige Klassen-, Methoden- und Typenreferenz für DocmdAssistantEngine."
---

Das Paket `docmd-assistant` exportiert die Hauptklasse `DocmdAssistantEngine`, Hilfsfunktionen und TypeScript-Typdefinitionen.

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

## Nachrichteneigenschaften & Methoden

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

## Werkzeug-Verwaltungsmethoden

### registerTool(tool)

Registriert einen Werkzeug-Handler auf der Engine-Instanz.

```typescript
public registerTool(tool: AssistantTool): this
```

### unregisterTool(name)

Enfernt ein Werkzeug nach Namen. Gibt `true` zurück, wenn das Werkzeug gefunden und gelöscht wurde.

```typescript
public unregisterTool(name: string): boolean
```

### getTools()

Gibt ein Array aller registrierten Werkzeuge zurück.

```typescript
public getTools(): AssistantTool[]
```

### getTool(name)

Gibt eine spezifische Werkzeugdefinition nach Namen zurück oder `undefined`, falls nicht registriert.

```typescript
public getTool(name: string): AssistantTool | undefined
```

### executeTool(name, args)

Führt ein registriertes Werkzeug manuell mit Argumenten aus.

```typescript
public async executeTool(name: string, args: any): Promise<any>
```

## Konfigurations- & System-Prompt-Methoden

### updateOptions(newOptions)

Aktualisiert Engine-Optionen dynamisch.

```typescript
public updateOptions(newOptions: Partial<AssistantOptions>): this
```

### setSystemPrompt(prompt)

Ersetzt den aktiven System-Prompt.

```typescript
public setSystemPrompt(prompt: string): this
```

### appendSystemPrompt(additionalPrompt)

Hängt zusätzlichen Text an den bestehenden System-Prompt an.

```typescript
public appendSystemPrompt(additionalPrompt: string): this
```

### getSystemPrompt()

Gibt den aktuell aktiven System-Prompt als String zurück.

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

Löscht alle Nachrichten im Verlauf und löst das Event `'clear'` aus.

```typescript
public clearHistory(): this
```

### addMessage(message)

Fügt ein Nachrichtenobjekt direkt zum Verlauf hinzu.

```typescript
public addMessage(message: ChatMessage): this
```

## Event-Subskriptionsmethoden

### on(event, listener)

Registriert einen Event-Listener für Engine-Events (`'message'`, `'tool_call'`, `'tool_result'`, `'error'`, `'clear'`).

```typescript
public on(event: AssistantEventType, listener: AssistantEventListener): this
```

### off(event, listener)

Entfernt einen registrierten Event-Listener.

```typescript
public off(event: AssistantEventType, listener: AssistantEventListener): this
```

## Exportierte Typdefinitionen

Alle TypeScript-Schnittstellen werden direkt aus `docmd-assistant` exportiert:

```typescript
import type {
  AssistantOptions,
  AssistantTool,
  AssistantToolParameters,
  AssistantToolParameterProperty,
  ChatMessage,
  ChatResponse,
  SearchResultItem,
  AssistantEventType,
  AssistantEvent,
  AssistantEventListener
} from 'docmd-assistant';
```
