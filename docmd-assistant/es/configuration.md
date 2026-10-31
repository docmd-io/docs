---
title: "Configuración"
description: "Referencia completa de opciones para inicialización, ganchos de ciclo de vida y actualizaciones dinámicas de docmd-assistant."
---

`docmd-assistant` acepta un objeto de configuración flexible `AssistantOptions` durante su inicialización. Todas las opciones también pueden actualizarse dinámicamente en tiempo de ejecución.

## Esquema de Opciones

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

## Detalles de los Parámetros

| Campo | Tipo | Descripción | Predeterminado |
| :---- | :--- | :---------- | :------------- |
| `provider` | `string` | Proveedor de IA de destino (`'openai'`, `'anthropic'`, `'gemini'`, `'deepseek'`, `'groq'`, `'minimax'`, `'ollama'`) | Dinámico |
| `model` | `string` | Identificador del modelo (ej. `'gpt-4o-mini'`, `'claude-3-5-haiku-20241022'`) | Dinámico |
| `apiKey` | `string` | Clave API del proveedor para conexión directa mediante `aiplug` | `undefined` |
| `baseURL` | `string` | URL base personalizada de puerta de enlace API | `undefined` |
| `relayUrl` | `string` | URL del endpoint de Cloud Relay para enrutamiento sin claves | `undefined` |
| `endpoint` | `string` | Alias para `relayUrl` | `'https://api.docmd.io/v1/ai/chat'` |
| `projectId` | `string` | Identificador de proyecto o sitio enviado en peticiones relay | `undefined` |
| `systemPrompt` | `string` | Instrucciones base que guían la identidad y comportamiento del asistente | Prompt predeterminado |
| `history` | `ChatMessage[]` | Historial de mensajes precargado | `[]` |
| `tools` | `AssistantTool[]` | Herramientas registradas inicialmente | `[]` |
| `temperature` | `number` | Temperatura de muestreo (0.0 a 1.0) | Predeterminado del proveedor |
| `maxTokens` | `number` | Límite de tokens devueltos por respuesta | Predeterminado del proveedor |
| `reasoning` | `boolean \| string` | Modo de razonamiento extendido (`false`, `'low'`, `'medium'`, `'high'`) | `false` |
| `headers` | `Record<string, string>` | Encabezados HTTP personalizados para peticiones relay | `{}` |
| `contextWindow` | `number` | Límite de caracteres de contexto documental por turno. `0` = sin límite. | `0` (sin límite) |
| `formatToolResult` | `function` | Gancho para filtrar o condensar resultados de herramientas antes de inyectarlos. | `undefined` |
| `compactHistory` | `function` | Gancho para compactar mensajes anteriores antes de despachar la petición. | `undefined` |
| `transformContext` | `function` | Gancho de transformación del contexto antes de la ejecución de la petición. | `undefined` |
| `onPayload` | `function` | Gancho de sólo lectura para inspeccionar la carga útil preparada. | `undefined` |

::: callout tip "Prompt de Sistema Predeterminado"
Si no se proporciona un `systemPrompt`, el motor aplica un prompt que impone reglas de búsqueda y citas Markdown verificadas.
:::

## Configuración de Ganchos de Ciclo de Vida

Los paquetes derivados (como `@docmd/plugin-ai`) o integraciones personalizadas pueden definir ganchos:

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
    console.debug('Carga útil saliente:', payload);
  }
});
```

## Actualización de Opciones en Tiempo de Ejecución

```typescript
assistant.updateOptions({
  provider: 'anthropic',
  model: 'claude-3-5-haiku-20241022',
  temperature: 0.2
});
```

## Gestión del Prompt del Sistema

```typescript
// Reemplazar prompt del sistema
assistant.setSystemPrompt('Eres un especialista en soporte técnico.');

// Añadir instrucciones adicionales
assistant.appendSystemPrompt('Responde siempre de manera concisa con ejemplos de código.');

// Consultar prompt activo
const currentPrompt = assistant.getSystemPrompt();
```

## Soporte para Razonamiento Extendido

Para modelos con razonamiento (como DeepSeek-R1 u OpenAI o3-mini):

```typescript
const assistant = new DocmdAssistantEngine({
  provider: 'deepseek',
  model: 'deepseek-reasoner',
  apiKey: process.env.DEEPSEEK_API_KEY,
  reasoning: 'medium'
});
```

## Encabezados de Retransmisión Personalizados

```typescript
const assistant = new DocmdAssistantEngine({
  relayUrl: 'https://internal-ai-gateway.company.com/v1/chat',
  headers: {
    'Authorization': 'Bearer my_enterprise_token',
    'X-Custom-Tenant-ID': 'tenant_12345'
  }
});
```
