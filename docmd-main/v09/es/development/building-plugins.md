---
title: "Creación de plugins"
description: "Guía completa para extender docmd con lógica personalizada, inyección de datos y funciones interactivas."
---

Los plugins son el mecanismo de extensión principal de docmd. Le permiten inyectar HTML, modificar el análisis de Markdown, incorporar datos en tiempo de compilación y automatizar tareas posteriores a la generación. Esta guía detalla la API de plugins.

## Descriptor del plugin

Cada plugin debe exportar un descriptor `plugin` declarando su identidad y capacidades. Esto permite al motor validar y aislar los límites de ejecución en el momento de la carga.

```javascript
  "plugin": {
    "name": "my-analytics",
    "version": "1.0.0",
    "capabilities": ["head", "body", "post-build"],
    "requiresLiveServer": false // opcional, true si el plugin requiere servidor dev en vivo
  },

  "generateScripts": (config, opts) => { ... },
  "onPostBuild": async (ctx) => { ... }
```

> **Nota:** El descriptor es estrictamente obligatorio. Los plugins que no lo incluyan no se cargarán.

## El espacio de nombres `docmd` (nuevo en 0.8.9)

Además del descriptor `plugin` en tiempo de ejecución, todo plugin oficial **debe** declarar un espacio de nombres `docmd` en su `package.json`. Este espacio de nombres representa el contrato en tiempo de compilación que lee el generador de registros para construir la fuente única de verdad utilizada por el cargador en tiempo de ejecución.

```json "package.json"
{
  "name": "@docmd/plugin-foo",
  "version": "1.0.0",
  "docmd": {
    "key": "foo",
    "kind": "plugin",
    "displayName": "Foo",
    "tagline": "Descripción breve de la función del plugin",
    "capabilities": ["head", "body", "post-build"],
    "requiresLiveServer": false
  }
}
```

| Campo | Obligatorio | Descripción |
| :--- | :--- | :--- |
| `key` | Recomendado | Identificador accesible para el usuario (`config.plugins.<key>`). Si se omite, se deriva del nombre del paquete. |
| `kind` | Recomendado | Uno de los valores: `plugin`, `template`, `engine`. Si se omite, se deriva de la estructura de directorios. |
| `displayName` | Recomendado | Nombre legible mostrado en catálogos y en la salida de `docmd doctor`. |
| `tagline` | Recomendado | Descripción breve en una línea; se utiliza como alternativa a la descripción de npm. |
| `capabilities` | Obligatorio para plugins y plantillas | Mismas capacidades de hooks declaradas en el descriptor JS. La validación en compilación advierte si difieren. |
| `preview` | Opcional | Ruta a un recurso de vista previa (solo plantillas); mostrado en catálogos. |
| `requiresLiveServer` | Opcional | Cuando es `true`, los activos del cliente (`getAssets`, `generateScripts`, `generateMetaTags`) se omiten automáticamente en compilaciones estáticas (`docmd build`). Por defecto es `false`. |

### Requisito de servidor en vivo (`requiresLiveServer`)

Al desarrollar plugins interactivos que dependen de un servidor de desarrollo en vivo o puente RPC WebSocket (como edición en línea o comentarios colaborativos en `@docmd/plugin-threads`), declare `"requiresLiveServer": true` en el descriptor del plugin y en `package.json#docmd`.

Durante compilaciones estáticas de producción (`docmd build`), docmd omite automáticamente la inyección de recursos cliente mientras mantiene activos los analizadores Markdown (`markdownSetup`). Esto garantiza que los sitios estáticos sigan siendo livianos, rápidos y sin errores de backend ausente, mientras que los bloques de Markdown continúan mostrándose correctamente. Los usuarios pueden anular esto en su configuración mediante `devOnly: false` (o `liveOnly: false`).

Los motores comparten el mismo espacio de nombres `docmd` pero **sin `capabilities`**, ya que no participan en el sistema de hooks, sino únicamente en el cargador de motores.

La verificación cruzada en tiempo de compilación detecta desajustes entre el descriptor JS y el manifiesto, incluyendo errores silenciosos donde un hook se implementaba sin haber sido declarado.

::: callout warning title:"Eliminación del registro empaquetado en 0.9.0"
El archivo `packages/plugins/installer/registry/plugins.json`, mantenido manualmente como catálogo de plugins oficiales, está **obsoleto desde 0.8.9** y se **eliminará en 0.9.0**. El generador de registro en compilación es ahora la única fuente de verdad: basta con declarar el espacio de nombres `docmd` en `package.json` para que el generador lo procese en la siguiente compilación `pnpm build` de `@docmd/api`.
::: /callout

## Capacidades principales

La matriz `capabilities` determina qué hooks tiene autorización de usar su plugin.

| Capacidad | Hooks autorizados | Fase |
| :--- | :--- | :--- |
| `init` | `onConfigResolved` | Inicialización |
| `markdown` | `markdownSetup` | Configuración |
| `head` | `generateMetaTags`, `generateScripts` (head) | Renderizado |
| `body` | `generateScripts` (body) | Renderizado |
| `build` | `onBeforeParse`, `onAfterParse`, `onBeforeBuild`, `onBeforeRender`, `onPageReady` | Compilación |
| `post-build`| `onPostBuild` | Post-compilación |
| `dev` | `onDevServerReady` | Servidor de desarrollo |
| `assets` | `getAssets` | Salida |
| `actions` | `actions` | Interactivo |
| `events` | `events` | Interactivo |
| `translations`| `translations` | i18n |
| `template` *(nuevo en 0.8.7)* | `templates`, `templateAssets` | Renderizado |

> **Nota:** La capacidad `template` es exclusiva: si un plugin la declara, no puede declarar simultáneamente `head`, `build`, `post-build`, etc. Las plantillas proporcionan ranuras (slots) y recursos visuales; no ejecutan hooks de ciclo de vida. Si necesita ambas funcionalidades, distribuya dos paquetes independientes.

## Referencia de la API de plugins

Un plugin de docmd es un objeto estándar de JavaScript que implementa uno o varios de los siguientes hooks.

| Hook | Descripción |
| :--- | :--- |
| `markdownSetup(md, opts)` | Extiende la instancia de `markdown-it`. Función síncrona. |
| `generateMetaTags(config, page, root)` | Inyecta etiquetas `<meta>` o `<link>` en `<head>`. |
| `generateScripts(config, opts)` | Devuelve un objeto con `headScriptsHtml` y `bodyScriptsHtml`. |
| `getAssets(opts)` | Define archivos externos o scripts de CDN para su inyección. |
| `onPostBuild(ctx)` | Ejecuta lógica tras la generación de todos los archivos HTML. |
| `translations(localeId)` | Devuelve un objeto con cadenas traducidas para el idioma dado. |
| `actions` | Objeto con controladores de acciones para llamadas RPC sobre WebSocket. |
| `events` | Objeto con controladores de eventos para mensajes entrantes del navegador. |
| `templates[]` *(nuevo en 0.8.7, capacidad: `template`)* | Matriz de ranuras `TemplateHook` — cada `{ type, templatePath }` anula una ranura EJS. |
| `templateAssets[]` *(nuevo en 0.8.7, capacidad: `template`)* | Matriz de `TemplateAssetHook` — cada entrada `{ type, path, priority?, position? }` suministra el paquete CSS/JS de la plantilla. |

### Creación de un plugin de plantilla

Una plantilla es un plugin con `capabilities: ['template']`. Suministra matrices `templates[]` y `templateAssets[]`. Consulte la [Guía de plantillas](../theming/templates.md) para el recorrido completo. Una plantilla mínima se estructura de la siguiente forma:

```javascript
export default {
  plugin: {
    name: 'template-foo',
    version: '1.0.0',
    capabilities: ['template'],
  },
  templates: [
    { type: 'menubar', templatePath: '/abs/path/to/templates/partials/menubar.ejs' },
    { type: 'footer',  templatePath: '/abs/path/to/templates/partials/footer.ejs' },
  ],
  templateAssets: [
    { type: 'css', path: '/abs/path/to/assets/css/foo.css', priority: 10, position: 'head' },
  ],
};
```

## Creación de un plugin local

Crear un plugin consiste simplemente en definir un archivo JavaScript. Por ejemplo, `my-plugin.js`:

```javascript
import path from "path";

export default {
  plugin: {
    "name": "my-plugin",
    "version": "1.0.0",
    "capabilities": ["head", "post-build"]
  },

  markdownSetup: (md, options) => {
    // Agregar reglas de análisis personalizadas
  },

  generateMetaTags: async (config, page, relativePathToRoot) => {
    return `<meta name="x-build-id" content="${config._buildHash}">`;
  },

  onPostBuild: async ({ config, pages, outputDir, log, options }) => {
    log(`Plugin personalizado: se verificaron ${pages.length} páginas.`);
  }
};
```

Para habilitar su plugin, referencie su **nombre de paquete completo** en su archivo `docmd.config.json`:

```json "docmd.config.json"
  "plugins": {
    "my-awesome-plugin": {}
  }
```

> **Nota:** Los nombres abreviados (por ejemplo, `math`, `search`) están reservados para los paquetes oficiales `@docmd/plugin-*`. Los plugins de terceros siempre deben especificar su nombre de paquete npm completo.

### Resolución de plugins

El motor de docmd resuelve los nombres de plugins de la siguiente manera:
- **Abreviaturas oficiales** (`math`, `search`) se expanden a `@docmd/plugin-<name>`. Solo los paquetes oficiales pueden usar el ámbito `@docmd`.
- **Plugins de terceros** deben utilizar su nombre completo (por ejemplo, `my-awesome-plugin`, `@myorg/docmd-extras`). No existe un sistema de alias para plugins externos, eliminando riesgos en la cadena de suministro.

### Aislamiento de plugins

Cada invocación de un hook está encapsulada en un bloque try/catch. Un error en un plugin no interrumpe la compilación ni perjudica a otros plugins; los errores se registran y consolidan en el informe final.

### Ámbito de plugins (`noStyle`)

Por defecto, los plugins inyectan su CSS/JS globalmente. Los desarrolladores pueden evitar que su plugin actúe sobre páginas `noStyle` exportando una propiedad booleana `noStyle`:

```javascript
export default {
  noStyle: false, 

  generateScripts: () => { ... }
}
```

Los usuarios pueden anular esto mediante la configuración (`plugins: { math: { noStyle: false } }`) o dinámicamente en el frontmatter de Markdown (`plugins: { math: true }`).

## Hooks del ciclo de vida

Docmd proporciona hooks de integración profunda para interactuar con la configuración, las fuentes originales y los datos procesados de cada página.

| Hook | Descripción | Valor devuelto esperado |
| :--- | :--- | :--- |
| **`onConfigResolved(config)`** | Lee o modifica la configuración activa inmediatamente tras su inicialización. | `void` o `Promise<void>` |
| **`onDevServerReady(server, wss)`** | Expone el servidor Node.js subyacente durante `npx @docmd/core dev`. | `void` o `Promise<void>` |
| **`onBeforeParse(src, frontmatter, filePath?)`** | Preprocesa la cadena Markdown original antes de su análisis sintáctico. | `string` o `Promise<string>` |
| **`onAfterParse(html, frontmatter, filePath?)`** | Postprocesa el HTML generado a partir del cuerpo Markdown. | `string` o `Promise<string>` |
| **`onBeforeBuild(ctx)`** | Se ejecuta tras analizar todo el Markdown y antes de renderizar el HTML. Ideal para precálculos pesados. | `void` o `Promise<void>` |
| **`onBeforeRender(page)`** | Se ejecuta antes del renderizado de plantillas. Las mutaciones a `frontmatter` y `html` se reflejan en la salida. | `void` o `Promise<void>` |
| **`onPageReady(page)`** | Accede a los metadatos ensamblados de la página justo antes de escribirlos en disco. | `void` o `Promise<void>` |

### Aceleración de motor y tareas en segundo plano (`runWorkerTask`)

docmd ejecuta operaciones intensivas a través de una **Arquitectura de motores conectables**. Los plugins pueden delegar rutinas de cálculo pesado o E/S intensiva al motor configurado (por ejemplo, subprocesos JavaScript o subprocesos nativos en Rust).

El método `runWorkerTask` se inyecta de forma transparente en `PageContext`, `PostBuildContext` y `ActionContext`.

```javascript
{
  "plugin": { "name": "my-plugin", "version": "1.0.0", "capabilities": ["post-build"] },

  "onPostBuild": async (ctx) => {
    // Indicar el nombre de una acción registrada o ruta absoluta a un script
    const result = await ctx.runWorkerTask('/path/to/worker.js', 'parseData', [ctx.outputDir]);
  }
}
```

### Obtención de datos e indexación (`onBeforeBuild`)

El hook `onBeforeBuild` se ejecuta *después* del análisis de Markdown y *antes* del ciclo de renderizado HTML. Es la fase idónea para indexación de datos o llamadas a APIs externas.

Recibe `BeforeBuildContext`, que incluye todas las `pages` y la instancia de `tui` para mostrar barras de progreso dedicadas.

```typescript
export async function onBeforeBuild({ pages, tui }) {
  tui.step('Obteniendo datos remotos para el plugin', 'WAIT');

  let processed = 0;
  for (const page of pages) {
    if (page.sourcePath) {
      page.frontmatter.remoteData = await fetchHeavyData(page.sourcePath);
    }
    processed++;
    if (processed % 10 === 0 || processed === pages.length) {
      tui.progress('Obteniendo datos remotos para el plugin', processed, pages.length);
    }
  }

  tui.step('Obteniendo datos remotos para el plugin', 'DONE');
}
```

### `onBeforeRender` y `PageContext`

Utilice `onBeforeRender` para inyectar datos derivados del archivo de origen en tiempo de compilación.

```typescript
interface PageContext {
  sourcePath: string;           
  frontmatter: Record<string, any>; 
  html: string;                 
  localeId?: string;
  versionId?: string;
  relativePathToRoot?: string;
  runWorkerTask<T = any>(modulePath: string, functionName: string, args: any[]): Promise<T>; 
}
```

```javascript
export default {
  plugin: {
    name: "my-metadata-plugin",
    version: "1.0.0",
    capabilities: ["build"]
  },

  onBeforeRender: async (page) => {
    const stats = fs.statSync(page.sourcePath);
    page.frontmatter.wordCount = page.html.split(/\s+/).length;
    page.frontmatter.fileSize = stats.size;
  }
}
```

## Inyección de recursos (Assets)

El hook `getAssets()` permite que su plugin suministre recursos del lado del cliente de forma estructurada.

```javascript
export default {
  getAssets: (options) => {
    return [
      {
        url: "https://example.com/script.js",
        type: "js",
        location: "head"
      },
      {
        src: path.join(__dirname, "plugin-init.js"), 
        dest: "assets/js/plugin-init.js",            
        type: "js",
        location: "body"
      }
    ];
  }
}
```

## Traducción de plugins (i18n)

Los plugins que muestran interfaces en el cliente deben proporcionar sus cadenas a través del hook `translations(localeId)`. El motor las fusiona automáticamente con las cadenas del sistema.

El patrón recomendado almacena un archivo JSON por cada idioma en un directorio `i18n/`:

```javascript
import fs from "fs";
import path from "path";

export default {
  plugin: {
    name: "my-plugin",
    version: "1.0.0",
    capabilities: ["translations", "body"]
  },

  translations: (localeId) => {
    try {
      const p = path.join(__dirname, "i18n", `${localeId}.json`);
      return JSON.parse(fs.readFileSync(p, "utf8"));
    } catch { }

    return {};
  }
}
```

## Acciones WebSocket RPC

Los plugins pueden registrar **controladores de acciones** y **controladores de eventos** ejecutados en el servidor de desarrollo, accesibles desde el navegador mediante la API `window.docmd`.

```javascript
export default {
  plugin: {
    name: "my-live-plugin",
    version: "1.0.0",
    capabilities: ["actions", "events"]
  },

  actions: {
    "my-plugin:save-note": async (payload, ctx) => {
      const content = await ctx.readFile(payload.file);
      const updated = content + "\n\n> " + payload.note;
      await ctx.writeFile(payload.file, updated);
      return { "saved": true };
    }
  },

  events: {
    "my-plugin:page-viewed": (data, ctx) => {
      console.log(`Página visitada: ${data.path}`);
    }
  }
};
```

El objeto `ctx` (ActionContext) proporciona:

| Método | Descripción |
| :--- | :--- |
| `ctx.readFile(path)` | Lee un archivo relativo a la raíz del proyecto. |
| `ctx.writeFile(path, content)` | Escribe un archivo (activa recompilación y recarga). |
| `ctx.readFileLines(path)` | Lee un archivo como una matriz de líneas. |
| `ctx.broadcast(event, data)` | Emite un evento a todos los navegadores conectados. |
| `ctx.runWorkerTask(module, fn, args)` | Delega tareas pesadas de CPU al grupo de subprocesos. |
| `ctx.source` | Utilidades de edición en bloque para archivos Markdown. |
| `ctx.projectRoot` | Ruta absoluta a la raíz del proyecto. |
| `ctx.config` | Configuración activa del sitio docmd. |

Todas las operaciones sobre archivos están confinadas a la raíz del proyecto.

::: callout info title:"Solo en modo desarrollo 🛡️"
El sistema WebSocket RPC únicamente está activo durante `npx @docmd/core dev`. Las compilaciones de producción no incluyen el cliente de API ni controladores en el servidor.
::: /callout

## Buenas prácticas

1. **Declarar capacidades**: Exporte siempre un descriptor `plugin` con las capacidades explícitas.
2. **Usar `onBeforeRender` para inyectar datos**: Si su plugin computa campos de frontmatter, use `onBeforeRender`.
3. **Funciones asíncronas**: Use siempre `async/await` en `onPostBuild`, `onBeforeRender` y controladores de acción.
4. **Sin estado global mutable**: Evite almacenar estado volátil en el objeto del plugin; el motor puede reinicializarlo dinámicamente.
5. **Convención de nombres**: Añada el prefijo `docmd-plugin-` a los paquetes comunitarios.
6. **Espacios de nombres en acciones**: Prefije los nombres de acción con el nombre de su plugin (por ejemplo, `my-plugin:save-note`).
7. **Validación de acciones**: Valide y requiera un esquema de carga útil estricto en sus acciones.
8. **Registro con `log`**: Utilice el asistente `log()` suministrado en `onPostBuild` para respetar las preferencias de verbosidad del usuario.

::: callout tip title:"Diseñado para Inteligencia Artificial 🤖"
La API de plugins de docmd es óptima para modelos de lenguaje (LLM). Al estructurarse en objetos de JavaScript convencionales, los agentes de IA pueden generar extensiones fiables con instrucciones mínimas.
::: /callout

## Exportaciones ESM — la condición `default`

El archivo `package.json` de su plugin **debe** incluir una condición `"default"` en `exports["."]`, junto con la condición `import`:

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js",
    "default": "./dist/index.js"
  }
}
```

Si declara únicamente `import`, el primer intento del instalador automático arrojará `ERR_PACKAGE_PATH_NOT_EXPORTED` porque el sistema de resolución CommonJS de Node no coincidirá con ninguna condición. La ruta de reintento funcionará, pero imprimirá avisos redundantes en la consola.
