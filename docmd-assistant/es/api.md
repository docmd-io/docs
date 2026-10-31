---
title: "API Programática"
description: "Referencia completa de clases, métodos y tipos para DocmdAssistantEngine."
---

El paquete `docmd-assistant` exporta la clase principal `DocmdAssistantEngine`, funciones auxiliares estándar, constantes de versión y definiciones de tipos de TypeScript.

```typescript
import {
  DocmdAssistantEngine,
  createStandardTools,
  DEFAULT_SYSTEM_PROMPT,
  ENGINE_VERSION
} from 'docmd-assistant';
```

## Clase: DocmdAssistantEngine

### Constructor

```typescript
new DocmdAssistantEngine(options?: AssistantOptions)
```

Inicializa una nueva instancia con la configuración especificada.

```typescript
const assistant = new DocmdAssistantEngine({
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
  systemPrompt: 'Eres un asistente técnico de documentación.'
});
```

## Métodos de Mensajería

### sendMessage(content, overrideOptions?)

Agrega un mensaje de usuario al historial, despacha la ronda de conversación y devuelve una promesa `ChatResponse`.

```typescript
public async sendMessage(
  content: string,
  overrideOptions?: Partial<AssistantOptions>
): Promise<ChatResponse>
```

**Parámetros:**

| Parámetro | Tipo | Descripción |
| :-------- | :--- | :---------- |
| `content` | `string` | Mensaje de texto del usuario |
| `overrideOptions` | `Partial<AssistantOptions>` | Anulaciones de configuración para la ronda actual |

**Valor de retorno:** `Promise<ChatResponse>`

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

Ejecuta una ronda de conversación con transmisión de tokens en tiempo real, notificaciones de llamadas a herramientas y actualizaciones intermedias de síntesis.

```typescript
public async sendMessageStream(
  content: string,
  callbacks: StreamCallbacks,
  overrideOptions?: Partial<AssistantOptions>
): Promise<ChatResponse>
```

**Interfaz StreamCallbacks:**

```typescript
interface StreamCallbacks {
  onChunk: (chunk: string, meta?: { replace?: boolean; turn?: number }) => void;
  onToolCall?: (toolCall: any) => void;
  onToolResult?: (toolResult: any) => void;
  onComplete?: (fullText: string) => void;
  onError?: (error: any) => void;
}
```

### Reversión Atómica ante Errores

Si una ronda falla debido a problemas de red, indisponibilidad del relay o errores del proveedor, el motor elimina automáticamente el mensaje del usuario de `engine.getHistory()`. Esto garantiza que el historial interno permanezca sin corromperse.

## Ganchos de Ciclo de Vida Extendidos

`docmd-assistant` ofrece ganchos de ciclo de vida no invasivos para paquetes descendentes (como `@docmd/plugin-ai`) o integraciones personalizadas:

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
    console.debug('Carga útil despachada:', payload);
  }
});
```

## Métodos de Gestión de Herramientas

### registerTool(tool)

Registra una herramienta en la instancia del motor.

```typescript
public registerTool(tool: AssistantTool): this
```

### unregisterTool(name)

Elimina una herramienta por nombre.

```typescript
public unregisterTool(name: string): boolean
```

### getTools()

Devuelve un array con todas las herramientas registradas.

```typescript
public getTools(): AssistantTool[]
```

### getTool(name)

Devuelve una herramienta específica por nombre.

```typescript
public getTool(name: string): AssistantTool | undefined
```

### executeTool(name, args)

Ejecuta manualmente una herramienta registrada.

```typescript
public async executeTool(name: string, args: any): Promise<any>
```

## Métodos de Configuración y Prompt del Sistema

### updateOptions(newOptions)

Actualiza opciones dinámicamente en tiempo de ejecución.

```typescript
public updateOptions(newOptions: Partial<AssistantOptions>): this
```

### setSystemPrompt(prompt)

Reemplaza el prompt del sistema activo.

```typescript
public setSystemPrompt(prompt: string): this
```

### appendSystemPrompt(additionalPrompt)

Añade texto al prompt del sistema existente.

```typescript
public appendSystemPrompt(additionalPrompt: string): this
```

### getSystemPrompt()

Devuelve el prompt del sistema activo.

```typescript
public getSystemPrompt(): string
```

## Métodos de Gestión de Historial

### getHistory()

Devuelve una copia del historial de mensajes.

```typescript
public getHistory(): ChatMessage[]
```

### setHistory(history)

Reemplaza el historial de mensajes.

```typescript
public setHistory(history: ChatMessage[]): this
```

### clearHistory()

Limpia todos los mensajes y emite un evento `'clear'`.

```typescript
public clearHistory(): this
```

### addMessage(message)

Añade un mensaje directamente al historial.

```typescript
public addMessage(message: ChatMessage): this
```

## Suscripción a Eventos

### on(event, listener)

Registra un escuchador para eventos del motor (`'message'`, `'tool_call'`, `'tool_result'`, `'error'`, `'clear'`).

```typescript
public on(event: AssistantEventType, listener: AssistantEventListener): this
```

### off(event, listener)

Elimina un escuchador registrado.

```typescript
public off(event: AssistantEventType, listener: AssistantEventListener): this
```

## Constantes y Definiciones de Tipos

```typescript
import { ENGINE_VERSION } from 'docmd-assistant';
```

Definiciones de tipos:

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
