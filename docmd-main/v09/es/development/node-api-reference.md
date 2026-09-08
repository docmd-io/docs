---
title: "Referencia de la API de Node"
description: "API de bajo nivel de Node para desarrolladores de plugins: utilidades de URL, despachadores de acciones, herramientas de origen, cargador de motores y tipos de TypeScript."
---

::: callout info
**Para desarrolladores de plugins.** Si solo desea *invocar* docmd desde un script de Node, consulte la [API de compilación](../reference/build-api.md). Esta página describe las utilidades de bajo nivel expuestas por `@docmd/api` para escribir extensiones.
:::

El paquete `@docmd/api` es el núcleo del sistema de plugins. Proporciona registro de hooks, despacho WebSocket RPC, herramientas de edición de Markdown y utilidades centralizadas de URL.

```bash
npm install @docmd/api
```

::: callout tip
**Nota:** Todas las exportaciones de `@docmd/api` también están disponibles desde `@docmd/core`. En proyectos nuevos se recomienda importar directamente desde `@docmd/api`.
:::

## Utilidades de URL

Los plugins deben usar estas funciones centralizadas en lugar de implementar lógica propia de URLs.

### `outputPathToSlug(outputPath)`

Convierte una ruta de salida generada por el compilador en un slug de directorio limpio.

```javascript
import { outputPathToSlug } from '@docmd/api';

outputPathToSlug('guide/intro.html'); // → 'guide/intro/'
outputPathToSlug('index.html');       // → '/'
```

### `outputPathToPathname(outputPath)`

Convierte una ruta de salida en un pathname relativo a la raíz con barra final.

```javascript
import { outputPathToPathname } from '@docmd/api';

outputPathToPathname('guide/index.html'); // → '/guide/'
outputPathToPathname('index.html');       // → '/'
```

### `outputPathToCanonical(outputPath, siteUrl)`

Construye una URL canónica completa.

```javascript
import { outputPathToCanonical } from "@docmd/api";

outputPathToCanonical("guide/index.html", "https://docs.example.com");
```

### `sanitizeUrl(url)`

Elimina dobles barras inclinadas sucesivas (excepto después del protocolo).

```javascript
import { sanitizeUrl } from "@docmd/api";

sanitizeUrl("https://docs.example.com//guide"); // → "https://docs.example.com/guide"
sanitizeUrl("/foo//bar"); // → "/foo/bar"
```

### `buildAbsoluteUrl(base, localePrefix, versionPrefix, pagePath)`

Construye una URL absoluta incorporando prefijos de idioma y versión.

```javascript
import { buildAbsoluteUrl } from '@docmd/api';

buildAbsoluteUrl('/', 'es/', 'v1/', 'guide/'); // → '/es/v1/guide/'
```

### `resolveHref(href)`

Normaliza los enlaces escritos por el usuario en URLs limpias. Gestiona la eliminación de `.md`, barras finales y prefijos especiales como `external:` y `raw:`.

```javascript
import { resolveHref } from "@docmd/api";

resolveHref("overview.md"); // → "overview/"
resolveHref("external:https://github.com"); // → "https://github.com"
resolveHref("raw:docs/readme.md"); // → "docs/readme.md"
```

## URLs de página precalculadas

Cada objeto de página incluye datos de URL calculados con anterioridad. Los plugins pueden leerlos directamente sin cómputos adicionales.

```javascript
export async function onPostBuild({ pages, config }) {
  for (const page of pages) {
    console.log(page.urls.slug);
    console.log(page.urls.canonical);
    console.log(page.urls.pathname);
  }
}
```

| Propiedad | Tipo | Descripción |
|:---------|:-----|:------------|
| `slug` | `string` | Slug limpio en formato directorio (ej., `guide/` o `/`) |
| `canonical` | `string` | URL canónica completa (solo si `config.url` está definido) |
| `pathname` | `string` | Ruta relativa a la raíz (ej., `/guide/`) |

## Despacho de acciones y eventos

### `createActionDispatcher(hooks, options)`

Crea un despachador que enruta mensajes WebSocket RPC hacia los controladores de acciones y eventos del plugin.

```javascript
import { createActionDispatcher } from "@docmd/api";

const dispatcher = createActionDispatcher(
  { "actions": myPlugin.actions, "events": myPlugin.events },
  { "projectRoot": "/path/to/project", config, broadcast }
);

const { result, reload } = await dispatcher.handleCall("my-action", payload);
```

### `createSourceTools({ projectRoot })`

Crea utilidades de edición de código fuente para la manipulación programática de archivos Markdown.

```javascript
import { createSourceTools } from "@docmd/api";

const source = createSourceTools({ "projectRoot": "/path/to/project" });

const block = await source.getBlockAt("docs/page.md", [10, 12]);
await source.wrapText("docs/page.md", [10, 12], "important", 0, "**", "**");
```

### `loadPlugins(config, options)`

Carga, valida y registra todos los plugins declarados en la configuración. Devuelve el registro de hooks completo. Acepta `isDev` (booleano) para indicar si la compilación se ejecuta en modo desarrollo (controlando la inclusión de activos para plugins que requieren servidor en vivo).

```javascript
import { loadPlugins, hooks } from "@docmd/api";

const registeredHooks = await loadPlugins(config, {
  "resolvePaths": [__dirname],
  "isDev": true // opcional, por defecto false
});
```

## API de Entorno del Cliente (`window.docmd`)

Durante el desarrollo local (`docmd dev`), el navegador carga el puente RPC en `/__dev/docmd-api.js`, exponiendo `window.docmd` para comunicación en tiempo real y detección del estado del servidor.

### `docmd.isLive()`

Devuelve `true` de forma síncrona si la conexión WebSocket con el servidor de desarrollo activo está abierta y lista.

```javascript
if (window.docmd && window.docmd.isLive()) {
  // Servidor dev en vivo conectado
}
```

### `docmd.ping(timeoutMs = 2000)`

Envía una solicitud asíncrona de comprobación al servidor dev mediante la acción RPC integrada `system:ping`. Resuelve a `true` si responde, o a `false` en caso de desconexión o tiempo de espera agotado.

```javascript
const ok = await window.docmd.ping();
```

## API del cargador de motores

La arquitectura conectable permite la resolución y creación programática de capas de aceleración directamente mediante `@docmd/api`.

### `loadEngine(engineName)`

Resuelve e inicializa el motor de compilación solicitado. Si los binarios nativos no están disponibles en la plataforma actual, realiza una retirada elegante hacia el motor de JavaScript de alto rendimiento.

```javascript
import { loadEngine } from "@docmd/api";

const engine = await loadEngine("rust");
const gitLogResult = await engine.runWorkerTask("git:log", { "paths": ["docs/guide.md"] });
```

### `registerEngine(engineName, engineInstance)`

Permite a herramientas personalizadas o integradores registrar motores de ejecución de manera programática.

```javascript
import { registerEngine } from "@docmd/api";

registerEngine("custom", myCustomEngineImpl);
```

## Exportación de tipos

Para desarrolladores que empleen TypeScript, se exportan los siguientes tipos:

```typescript
import type {
  PluginModule,
  PluginDescriptor,
  PluginHooks,
  PageContext,
  BeforeBuildContext,
  PostBuildContext,
  Capability,
  ActionContext,
  ActionHandler,
  EventHandler,
  SourceTools,
  BlockInfo,
  TextLocation,
  Engine,
} from '@docmd/api';
```

## Siguientes pasos

- [Creación de plugins](./building-plugins.md) — empiece aquí.
- [Ejemplos de plugins](./plugin-examples.md) — recorrido práctico por un plugin completo.
- [Motores y arquitectura](./engines/overview.md) — motor Rust, N-API e interiores del cargador.
