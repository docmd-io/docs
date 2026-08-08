---
title: "Configuración"
description: "Referencia completa de opciones para la inicialización y actualizaciones dinámicas de docmd-assistant."
---

`docmd-assistant` acepta un objeto de configuración flexible `AssistantOptions` al inicializarse. Todas las opciones también se pueden actualizar dinámicamente en tiempo de ejecución.

## Referencia del Esquema de Opciones

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

## Detalles de los Parámetros

| Campo | Tipo | Descripción | Predeterminado |
| :---- | :--- | :---------- | :------------- |
| `provider` | `string` | Proveedor de IA de destino (`'openai'`, `'anthropic'`, `'gemini'`, `'deepseek'`, `'groq'`, `'minimax'`, `'ollama'`) | Dinámico |
| `model` | `string` | Identificador del modelo (ej. `'gpt-4o-mini'`, `'claude-3-5-haiku-20241022'`) | Dinámico |
| `apiKey` | `string` | Clave API del proveedor para conexión directa mediante `aiplug` | `undefined` |
| `baseURL` | `string` | URL personalizada de la puerta de enlace API base | `undefined` |
| `relayUrl` | `string` | URL del punto final Cloud Relay para enrutamiento proxy sin clave | `undefined` |
| `endpoint` | `string` | Alias para `relayUrl` | `'https://api.docmd.io/v1/ai/chat'` |
| `projectId` | `string` | Identificador del proyecto enviado con las solicitudes relay | `undefined` |
| `systemPrompt` | `string` | Instrucciones base que guían la identidad y comportamiento del asistente | Predeterminado |
| `history` | `ChatMessage[]` | Historial de conversación preinstalado | `[]` |
| `tools` | `AssistantTool[]` | Arreglo inicial de herramientas registradas | `[]` |
| `temperature` | `number` | Temperatura de muestreo (0.0 a 1.0) | Predeterminado |
| `maxTokens` | `number` | Tokens máximos devueltos por respuesta | Predeterminado |
| `reasoning` | `boolean \| string` | Alternar modo de razonamiento extendido (`false`, `'low'`, `'medium'`, `'high'`) | `false` |
| `headers` | `Record<string, string>` | Encabezados HTTP personalizados para solicitudes relay | `{}` |

::: callout tip "Prompt del Sistema Predeterminado"
Si no se proporciona un `systemPrompt`, el motor aplica un prompt predeterminado que hace cumplir las reglas de identidad de docmd, llamadas a herramientas orientadas a búsqueda y enlaces de cita.
:::

## Actualización de Opciones en Tiempo de Ejecución

Modifique las opciones de configuración dinámicamente durante una sesión activa usando `updateOptions()`:

```typescript
assistant.updateOptions({
  provider: 'anthropic',
  model: 'claude-3-5-haiku-20241022',
  temperature: 0.2
});
```

## Gestión del Prompt del Sistema

`docmd-assistant` proporciona métodos dedicados para actualizar o añadir instrucciones al sistema:

```typescript
// Reemplazar el prompt del sistema completamente
assistant.setSystemPrompt('Usted es un especialista en soporte técnico para una plataforma de desarrollo cloud.');

// Añadir contexto o instrucciones adicionales
assistant.appendSystemPrompt('Responda siempre en español y proporcione fragmentos de código paso a paso.');

// Obtener el prompt del sistema activo
const currentPrompt = assistant.getSystemPrompt();
```

## Soporte para Modo de Razonamiento

Para modelos que soportan razonamiento extendido (como DeepSeek-R1 o OpenAI o3-mini), configure la opción `reasoning`:

```typescript
const assistant = new DocmdAssistantEngine({
  provider: 'deepseek',
  model: 'deepseek-reasoner',
  apiKey: process.env.DEEPSEEK_API_KEY,
  reasoning: 'medium'
});
```

## Encabezados Relay Personalizados

Pase encabezados personalizados al enrutar mediante puertas de enlace API empresariales:

```typescript
const assistant = new DocmdAssistantEngine({
  relayUrl: 'https://internal-ai-gateway.company.com/v1/chat',
  headers: {
    'Authorization': 'Bearer my_enterprise_token',
    'X-Custom-Tenant-ID': 'tenant_12345'
  }
});
```
