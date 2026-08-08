---
title: "Arquitectura del Motor"
description: "Desglose técnico de la arquitectura del motor docmd-assistant, tubería de ejecución y modelo de eventos."
---

`docmd-assistant` funciona como un motor de ejecución independiente y headless. Separa la gestión del estado conversacional, la síntesis del prompt del sistema, la comunicación con múltiples proveedores de modelos y la ejecución de herramientas del cliente del renderizado de la interfaz de usuario.

## Visión General de la Arquitectura

```
                                ┌─────────────────────────────┐
                                │     Capa de Aplicación      │
                                │ (React, Vue, CLI, Custom UI)│
                                └──────────────┬──────────────┘
                                               │ sendMessage()
                                               ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                  DocmdAssistantEngine                                  │
│                                                                                        │
│  ┌───────────────────────┐   ┌───────────────────────┐   ┌──────────────────────────┐  │
│  │   Estado Historial    │   │ Gestor Prompt Sistema │   │ Registro de Herramientas │  │
│  └───────────────────────┘   └───────────────────────┘   └──────────────────────────┘  │
│                                                                                        │
│                             Tubería de Procesamiento                                   │
└────────────────────────────────────────┬───────────────────────────────────────────────┘
                                         │
                    ┌────────────────────┴────────────────────┐
                    │                                         │
                    ▼                                         ▼
        ┌────────────────────────┐             ┌────────────────────────┐
        │      Modo Directo      │             │       Modo Relay       │
        │  (aiplug LLM Adapter)  │             │   (Cloud Relay API)    │
        └────────────────────────┘             └────────────────────────┘
```

## Pasos de la Interacción Conversacional

Cuando se llama a `sendMessage(text)`, el motor procesa el turno en cinco pasos:

::: steps

### Paso 1  -  Ingreso del Mensaje del Usuario

La cadena de entrada se añade al historial interno como mensaje de usuario y se emite un evento `'message'`.

### Paso 2  -  Ensamblaje del Contexto

El motor combina el prompt del sistema activo, los mensajes del historial y las definiciones de herramientas registradas en un payload de conversación.

### Paso 3  -  Enrutamiento de Ejecución

- **Modo Directo**: Si se detecta un `apiKey` o un proveedor local, `docmd-assistant` inicializa un adaptador `aiplug` para comunicación directa.
- **Modo Relay**: Si se usa `relayUrl` o `endpoint`, el motor envía un payload JSON mediante POST con la consulta del usuario, la URL de la página, el título de la página y el historial de conversación al punto final del relay.

### Paso 4  -  Bucle de Ejecución de Herramientas

Si el modelo devuelve una solicitud de llamada a herramienta (como `search_documentation`), `docmd-assistant` ejecuta el controlador registrado, emite los eventos `'tool_call'` y `'tool_result'`, y devuelve el resultado para completar el turno.

### Paso 5  -  Emisión de la Respuesta

El texto de respuesta del asistente se añade al historial como mensaje de asistente y se emite mediante el bus de eventos `'message'`.

:::

## Referencia del Bus de Eventos

`docmd-assistant` incluye un bus de eventos integrado. Añada oyentes usando `on(event, listener)`:

| Tipo de Evento | Desencadenado Cuando | Esquema del Payload |
| :--------- | :------------- | :------------------ |
| `'message'` | Se añade un mensaje de usuario o asistente al historial | Objeto `ChatMessage` |
| `'tool_call'` | El motor comienza a ejecutar una herramienta | `{ name: string, args: any }` |
| `'tool_result'`| El controlador de la herramienta completa su ejecución | `{ name: string, args: any, result: any }` |
| `'error'` | Ocurre un error o fallo de comunicación con el relay | Objeto de error o detalles |
| `'clear'` | Se reinicia el historial de conversación | `null` |

```typescript
// Suscripción a eventos del motor
assistant.on('message', (event) => {
  console.log(`Mensaje de ${event.data.sender}:`, event.data.content);
});

assistant.on('tool_result', (event) => {
  console.log(`Herramienta ${event.data.name} devolvió:`, event.data.result);
});
```

## Datos de Contexto Enviados en Modo Relay

Al ejecutarse en Modo Relay, `docmd-assistant` captura e incluye automáticamente detalles contextuales del navegador con cada solicitud:

```json
{
  "projectId": "prj_my_docs_site",
  "siteId": "prj_my_docs_site",
  "message": "¿Cómo configuro la búsqueda?",
  "pageUrl": "https://docs.example.com/setup",
  "pageTitle": "Instalación y Configuración",
  "history": [
    { "sender": "user", "text": "Hola" },
    { "sender": "assistant", "text": "¡Hola! ¿En qué puedo ayudarte hoy?" }
  ],
  "systemPrompt": "Usted es el asistente docmd...",
  "reasoning": false
}
```

::: callout info "Contexto Automático de Página"
Capturar `pageUrl` y `pageTitle` permite a los relays del servidor ofrecer respuestas adaptadas a la página actual sin requerir una configuración manual en el cliente.
:::

## Manejo de Errores y Alternativas

El motor captura de forma segura errores de red, fallos de autenticación y excepciones de herramientas:

- **Errores de Herramientas**: Se capturan y emiten mediante `'error'` sin interrumpir el turno. Se devuelve un objeto de error al contexto del modelo.
- **Errores de Relay**: Se manejan limpiamente con mensajes explicativos mediante `'error'`.
- **Estado de Relay No Configurado**: Si el relay devuelve `{ unconfigured: true }`, el motor devuelve un objeto `ChatResponse` con `unconfigured: true`.
