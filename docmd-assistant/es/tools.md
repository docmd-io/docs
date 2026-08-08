---
title: "Sistema de Herramientas"
description: "Creación, registro y ejecución de herramientas personalizadas y estándar con docmd-assistant."
---

`docmd-assistant` incluye un sistema de ejecución de herramientas. Las herramientas permiten al asistente realizar búsquedas de texto completo, leer páginas de documentación, navegar por URL, copiar fragmentos de código o invocar funciones personalizadas en su aplicación.

## Definición de una Herramienta

La definición de una herramienta requiere un nombre (`name`), una descripción (`description`), un esquema de parámetros (`parameters`) y una función de ejecución (`execute` o `handler`):

```typescript
import { AssistantTool } from 'docmd-assistant';

const weatherTool: AssistantTool = {
  name: 'get_weather_forecast',
  description: 'Obtiene el pronóstico del tiempo actual para una ciudad.',
  parameters: {
    type: 'object',
    properties: {
      city: { type: 'string', description: 'Nombre de la ciudad' },
      unit: { type: 'string', enum: ['celsius', 'fahrenheit'], description: 'Unidad de temperatura' }
    },
    required: ['city']
  },
  execute: async ({ city, unit = 'celsius' }) => {
    // Realizar llamada a API o lógica de la aplicación
    return { city, temperature: 22, unit, condition: 'Soleado' };
  }
};
```

## Registro de Herramientas

Registre herramientas al inicializar o dinámicamente mediante `registerTool()`:

::: tabs
== tab "Al Inicializar" icon:settings
```typescript
const assistant = new DocmdAssistantEngine({
  tools: [weatherTool]
});
```
== tab "Registro Dinámico" icon:plus-circle
```typescript
assistant.registerTool({
  name: 'open_modal',
  description: 'Abre un diálogo modal de interfaz de usuario',
  parameters: {
    type: 'object',
    properties: {
      modalId: { type: 'string' }
    },
    required: ['modalId']
  },
  execute: async ({ modalId }) => {
    document.getElementById(modalId)?.classList.add('visible');
    return { success: true };
  }
});
```
:::

## Herramientas Estándar de Documentación

`docmd-assistant` exporta la función fábrica `createStandardTools()` proporcionando cuatro herramientas estándar:

| Nombre de Herramienta | Parámetros | Descripción |
| :-------- | :--------- | :---------- |
| `search_documentation` | `{ query: string }` | Busca en los índices de documentos o secciones DOM activas |
| `read_documentation_page` | `{ path: string }` | Obtiene y extrae el texto completo y bloques de código de la página |
| `navigate_to_page` | `{ path: string }` | Navega por el navegador a una URL o ancla de desplazamiento (`#section`) |
| `copy_code_snippet` | `{ code: string }` | Copia fragmentos de código directamente al portapapeles del sistema del usuario |

### Inicialización de Herramientas Estándar

```typescript
import { DocmdAssistantEngine, createStandardTools } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  tools: createStandardTools(
    // 1. Callback de búsqueda personalizado (ej. docmd-search, Algolia, Fuse.js o API de backend)
    async (query) => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      return await res.json();
    },
    // 2. Callback de lectura de página personalizado (API de CMS, punto final Markdown o BD)
    async (path) => {
      const res = await fetch(`/api/page?path=${encodeURIComponent(path)}`);
      const data = await res.json();
      return { title: data.title, content: data.markdown };
    }
  )
});
```

## Modos de Integración de Búsqueda

`createStandardTools()` admite tres modos de integración de búsqueda:

::: grid

::: card "Modo Plugin docmd" icon:puzzle
Al usarse dentro de un sitio `docmd` mediante `@docmd/plugin-ai`, la búsqueda se delega directamente a `docmd-search` (`window.docmdSearch`), buscando lotes estáticos preconstruidos.
:::

::: card "Callback de Búsqueda Personalizado" icon:search
Proporcione una función `customSearch` para conectar motores de búsqueda externos como Algolia, Fuse.js o puntos finales de servidor.
:::

::: card "Extractor de Encabezados DOM" icon:code
Si no se proporciona un callback personalizado, `search_documentation` recurre a un extractor DOM en el navegador que busca en encabezados `<h1>`–`<h4>` y etiquetas `<section>`.
:::

:::

## Mecánica del Lector de Páginas Completo (`read_documentation_page`)

Cuando los fragmentos de búsqueda resultan insuficientes, el asistente llama automáticamente a `read_documentation_page({ path })`:

1. **Callback de Lectura Personalizado (`customReader`)**: Si se proporciona, el motor delega la obtención de la página a su cargador personalizado.
2. **Alternativa DOM Parser**: Si no se proporciona un callback, la herramienta obtiene `window.location.origin + path` mediante `fetch()` y extrae texto de elementos `<main>`, `<article>` o `[role="main"]` usando `DOMParser()`.
3. **Citas Hipervinculadas**: El contenido devuelto se incorpora al contexto, permitiendo al modelo generar enlaces Markdown con clic `[Título de Página](path)` en su respuesta final.
