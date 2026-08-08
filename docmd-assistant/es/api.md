---
title: "API Programable"
description: "Referencia completa de clases, métodos y tipos para DocmdAssistantEngine."
---

El paquete `docmd-assistant` exporta la clase principal `DocmdAssistantEngine`, funciones auxiliares y definiciones de tipos TypeScript.

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

Inicializa una nueva instancia del motor con la configuración especificada.

```typescript
const assistant = new DocmdAssistantEngine({
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
  systemPrompt: 'Usted es un guía asistente de IA para la documentación.'
});
```

## Métodos Principales de Mensajería

### sendMessage(content, overrideOptions?)

Añade un mensaje de usuario al historial, procesa la interacción conversacional y devuelve una promesa `ChatResponse`.

```typescript
public async sendMessage(
  content: string,
  overrideOptions?: Partial<AssistantOptions>
): Promise<ChatResponse>
```

**Parámetros:**

| Parámetro | Tipo | Descripción |
| :-------- | :--- | :---------- |
| `content` | `string` | Cadena de texto con el mensaje del usuario |
| `overrideOptions` | `Partial<AssistantOptions>` | Sobrescritura opcional de configuración para esta interacción |

**Valor de Retorno:** `Promise<ChatResponse>`

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

## Métodos de Gestión de Herramientas

### registerTool(tool)

Registra una herramienta en la instancia del motor.

```typescript
public registerTool(tool: AssistantTool): this
```

### unregisterTool(name)

Desregistra una herramienta por su nombre. Devuelve `true` si la herramienta fue encontrada y eliminada.

```typescript
public unregisterTool(name: string): boolean
```

### getTools()

Devuelve un arreglo con todas las herramientas registradas.

```typescript
public getTools(): AssistantTool[]
```

### getTool(name)

Devuelve una definición de herramienta específica por su nombre, o `undefined` si no está registrada.

```typescript
public getTool(name: string): AssistantTool | undefined
```

### executeTool(name, args)

Ejecuta manualmente una herramienta registrada especificando su nombre y argumentos.

```typescript
public async executeTool(name: string, args: any): Promise<any>
```

## Métodos de Configuración y Prompt del Sistema

### updateOptions(newOptions)

Actualiza las opciones del motor dinámicamente.

```typescript
public updateOptions(newOptions: Partial<AssistantOptions>): this
```

### setSystemPrompt(prompt)

Reemplaza el prompt del sistema activo.

```typescript
public setSystemPrompt(prompt: string): this
```

### appendSystemPrompt(additionalPrompt)

Añade texto adicional al prompt del sistema existente.

```typescript
public appendSystemPrompt(additionalPrompt: string): this
```

### getSystemPrompt()

Devuelve la cadena del prompt del sistema activo actual.

```typescript
public getSystemPrompt(): string
```

## Métodos de Gestión del Historial

### getHistory()

Devuelve una copia del arreglo del historial de conversación actual.

```typescript
public getHistory(): ChatMessage[]
```

### setHistory(history)

Reemplaza el historial de conversación actual.

```typescript
public setHistory(history: ChatMessage[]): this
```

### clearHistory()

Borra todos los mensajes del historial y emite un evento `'clear'`.

```typescript
public clearHistory(): this
```

### addMessage(message)

Añade un objeto de mensaje directamente al historial.

```typescript
public addMessage(message: ChatMessage): this
```

## Métodos de Suscripción a Eventos

### on(event, listener)

Asigna un oyente de eventos para el motor (`'message'`, `'tool_call'`, `'tool_result'`, `'error'`, `'clear'`).

```typescript
public on(event: AssistantEventType, listener: AssistantEventListener): this
```

### off(event, listener)

Elimina un oyente de eventos registrado.

```typescript
public off(event: AssistantEventType, listener: AssistantEventListener): this
```

## Definiciones de Tipos Exportadas

Todas las interfaces TypeScript se exportan directamente desde `docmd-assistant`:

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
