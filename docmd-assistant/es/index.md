---
title: "docmd-assistant"
description: "Motor de IA independiente y headless para sitios de documentación."
---

`docmd-assistant` es un motor de ejecución de IA independiente y headless diseñado para sitios de documentación.

::: callout tip "Arquitectura Headless"
`docmd-assistant` gestiona el estado, prompts del sistema y llamadas a herramientas. Puede diseñar la interfaz con React, Vue o JS nativo.
:::

## Características Principales

::: grid

::: card "Múltiples Proveedores" icon:cpu
Soporte para OpenAI, Anthropic, Gemini, DeepSeek, Groq, MiniMax y Ollama local.
:::

::: card "Herramientas Estándar" icon:search
Herramientas integradas para búsqueda de texto completo, lector de páginas y copiado de código.
:::

::: card "Modo Cloud Relay" icon:shield
Soporte para relays cloud protegiendo las claves API en los dispositivos cliente.
:::

::: card "Bus de Eventos" icon:activity
Suscripción a eventos en tiempo real: `message`, `tool_call`, `tool_result` y `error`.
:::

:::

## Inicio Rápido

```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY
});

const response = await assistant.sendMessage('¿Cómo configuro la búsqueda?');
console.log(response.message);
```

## Páginas de Documentación

| Página | Descripción |
| :--- | :---------- |
| [Primeros Pasos](getting-started) | Instalación, requisitos previos e inicialización |
| [Configuración](configuration) | Esquema de opciones, actualizaciones y relay |
| [Arquitectura del Motor](how-it-works) | Flujo de turnos, bus de eventos y payloads |
| [Sistema de Herramientas](tools) | Herramientas personalizadas y alternativas DOM |
| [API Programable](api) | Referencia completa de clases y métodos de `DocmdAssistantEngine` |
