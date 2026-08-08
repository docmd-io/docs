---
title: "Primeros Pasos"
description: "Guía de inicio rápido para instalar e inicializar docmd-assistant en su aplicación."
---

Instale `docmd-assistant` y cree su primera interacción conversacional en menos de dos minutos.

## Requisitos del Sistema

::: callout info "Requisitos Previos"
- **Node.js 20.0.0+**
- Soporte de navegadores: Navegadores web modernos (Chrome, Firefox, Safari, Edge)
- Compatible con macOS, Linux y Windows
:::

## Instalación

::: tabs
== tab "npm" icon:package
```bash
npm install docmd-assistant
```
== tab "pnpm" icon:zap
```bash
pnpm add docmd-assistant
```
== tab "yarn" icon:package
```bash
yarn add docmd-assistant
```
:::

## Inicialización del Motor

::: steps

### Paso 1 – Crear la Instancia del Motor

Importe `DocmdAssistantEngine` y pase las opciones de configuración:

```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
  systemPrompt: 'Usted es un guía experto para este sitio de documentación.'
});
```

### Paso 2 – Enviar Mensaje del Usuario

Invoque `sendMessage()` para ejecutar una interacción conversacional:

```typescript
const response = await assistant.sendMessage('¿Cómo configuro la búsqueda?');

console.log('Respuesta del asistente:', response.message);
```

### Paso 3 – Inspeccionar el Objeto de Respuesta

El objeto devuelto contiene el texto de respuesta y el historial de conversación actualizado:

```typescript
console.log('Mensaje:', response.message);
console.log('Longitud del historial:', response.history.length);
```

:::

## Modos de Conexión

`docmd-assistant` admite dos modos de conexión:

::: grid

::: card "Modo Directo (aiplug)" icon:zap
Pase una clave API de proveedor (`apiKey`) u opciones locales (`provider: 'ollama'`). El motor utiliza `aiplug` para comunicarse directamente.
:::

::: card "Modo Cloud Relay" icon:cloud
Pase `relayUrl` o `endpoint` (ej. `https://api.docmd.io/v1/ai/chat`) junto con un `projectId`. El motor envía payloads a su backend relay para ocultar las claves API.
:::

:::

### Ejemplo de Modo Cloud Relay

```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  relayUrl: 'https://api.docmd.io/v1/ai/chat',
  projectId: 'prj_my_docs_site',
  systemPrompt: 'Ayude a los usuarios con preguntas sobre archivos de configuración.'
});

const response = await assistant.sendMessage('¿Cuál es la carpeta de salida predeterminada?');
console.log(response.message);
```

## Suscripción a Eventos

Escuche eventos en tiempo real para actualizaciones de mensajes, ejecución de herramientas y errores:

```typescript
// Se activa cada vez que se añade un mensaje de usuario o asistente
assistant.on('message', (event) => {
  const msg = event.data;
  console.log(`[${msg.sender.toUpperCase()}]: ${msg.content}`);
});

// Se activa cuando una herramienta comienza a ejecutarse
assistant.on('tool_call', (event) => {
  console.log('Ejecutando herramienta:', event.data.name, event.data.args);
});

// Se activa cuando finaliza la ejecución de la herramienta
assistant.on('tool_result', (event) => {
  console.log('Resultado de herramienta:', event.data.result);
});

// Se activa cuando ocurre un error
assistant.on('error', (event) => {
  console.error('Error del motor:', event.data);
});
```

## Siguientes Pasos

- [Arquitectura del Motor](how-it-works) – Conozca el bucle de ejecución y ensamblaje de contexto
- [Configuración](configuration) – Explore todas las opciones, modelos y actualizaciones en tiempo de ejecución
- [Sistema de Herramientas](tools) – Registre herramientas personalizadas y auxiliares de búsqueda
