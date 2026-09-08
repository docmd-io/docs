---
title: "Uso de plugins"
description: "Instale, configure y gestione plugins de docmd, desde extensiones integradas en el núcleo hasta complementos de terceros."
---

`docmd` cuenta con una arquitectura de plugins modular. Los plugins integrados se distribuyen directamente con el motor principal y no requieren instalación adicional. Los plugins opcionales y de terceros pueden instalarse mediante la CLI o gestores de paquetes.

## Instalación de plugins

Utilice la CLI de `docmd` para gestionar paquetes de plugins:

```bash
# Instalar un plugin oficial
npx @docmd/core add <nombre-del-plugin>

# Desinstalar un plugin
npx @docmd/core remove <nombre-del-plugin>
```

El instalador detecta el gestor de paquetes activo (npm, pnpm, yarn o bun), expande el nombre corto al paquete oficial `@docmd/plugin-*` y actualiza automáticamente su archivo `docmd.config.json`.

Use `--verbose` (o `-V`) para ver registros detallados de la instalación:

```bash
npx @docmd/core add <nombre-del-plugin> -V
```

## Plugins centrales integrados

Estos plugins vienen incorporados con `@docmd/core` y no requieren instalación por separado. Habilítelos o configúrelos en `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "search": {},
    "ai": {},
    "seo": { "aiBots": false },
    "sitemap": {},
    "analytics": {},
    "llms": {},
    "okf": {},
    "mermaid": {},
    "openapi": {},
    "git": {}
  }
}
```

::: callout tip title:"Detección de repositorios Git" icon:git-branch
El plugin de Git detecta si la raíz del proyecto es un repositorio Git válido. Si no se dispone de historial Git, desactiva automáticamente la marca de tiempo en el pie de página.
::: /callout

::: callout info title:"Soporte de paquetes OKF" icon:info
El plugin `@docmd/plugin-okf` genera un paquete en formato Open Knowledge Format (`site/okf/`) con manifiestos tipados y archivos de conceptos para agentes de IA. Está activo por defecto; configure `"plugins": { "okf": false }` para desactivarlo. Consulte [Plugin de paquetes OKF](okf.md) para más detalles.
::: /callout

## Plugins opcionales

Los plugins opcionales requieren instalación previa antes de poder activarse:

| Plugin | Comando de instalación | Propósito |
| :--- | :--- | :--- |
| [Soporte PWA](pwa.md) | `npx @docmd/core add pwa` | Manifiesto de Aplicación Web Progresiva y caché sin conexión con service worker |
| [Threads](threads.md) | `npx @docmd/core add threads` | Hilos de discusión colaborativos y comentarios nativos en Markdown |
| [Matemáticas (KaTeX)](math.md) | `npx @docmd/core add math` | Renderizado de ecuaciones matemáticas LaTeX y KaTeX del lado del servidor |

## Mecanismo de autoinstalación

Si se declara un plugin oficial en `docmd.config.json` sin estar presente en `node_modules`, `docmd` lo descarga e instala automáticamente durante la siguiente compilación:

```json "docmd.config.json"
{
  "plugins": {
    "pwa": {}
  }
}
```

El autoinstalador:
* Se limita estrictamente a paquetes oficiales con el ámbito `@docmd/plugin-*`.
* Hace coincidir las versiones con la versión instalada de `@docmd/core`.
* Autodetecta el gestor de paquetes del proyecto (npm, pnpm, yarn, bun).
* Muestra el progreso de instalación directamente en la terminal.

::: callout tip title:"Resolución robusta de módulos" icon:shield-check
El autoinstalador utiliza importaciones dinámicas de módulos ES con rutas de resolución alternativas, permitiendo cargar paquetes ESM que declaren mapas `exports` explícitos.
::: /callout

## Plugins personalizados y de terceros

Por seguridad, el instalador automático solo procesa el registro oficial. Instale plugins de terceros directamente con su gestor de paquetes preferido:

```bash
npm install mi-plugin-personalizado
# o pnpm add / yarn add / bun add
```

Añada el plugin a `docmd.config.json` usando su identificador de paquete completo:

```json "docmd.config.json"
{
  "plugins": {
    "mi-plugin-personalizado": {
      "opcionEjemplo": true
    }
  }
}
```

## Ámbito de plugins a nivel de página y `noStyle`

Por defecto, los plugins inyectan estilos y funcionalidad globalmente. Puede deshabilitar plugins en páginas de aterrizaje sin estilos (`noStyle: true`) o documento por documento en el frontmatter.

### Ámbito en configuración global

Configure qué plugins omiten las páginas `noStyle` en `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "math": {
      "noStyle": false
    }
  }
}
```

### Ámbito en frontmatter de página

Active o desactive plugins selectivamente por documento usando el [Frontmatter de página](../content/frontmatter.md):

```yaml
---
noStyle: true
plugins:
  math: true
  threads: false
---
```

## Ciclo de vida de la arquitectura de plugins

Los plugins se acoplan a distintas etapas de compilación y desarrollo:

| Hook de ciclo de vida | Función técnica |
| :--- | :--- |
| `markdownSetup(md, opts)` | Registra reglas personalizadas para Markdown-it |
| `generateMetaTags(config, page, root)` | Inyecta elementos `<meta>` y `<link>` en `<head>` |
| `generateScripts(config, opts)` | Inyecta scripts de cliente en `<head>` o `</body>` |
| `getAssets(opts)` | Registra archivos estáticos o paquetes CDN externos |
| `onPostBuild(ctx)` | Ejecuta tareas tras finalizar la generación de HTML |
| `translations(localeId)` | Registra mapas de cadenas traducidas para la interfaz |
| `actions` | Registra controladores RPC para llamadas WebSocket en modo desarrollo |
| `events` | Registra escuchadores de eventos del lado del cliente |

## Garantías de seguridad y aislamiento

* **Validación de descriptores**: Los descriptores con estructura incorrecta se rechazan en el arranque.
* **Aislamiento de fallos**: Toda llamada a un hook está protegida por bloques try/catch; un error en un plugin no interrumpe la compilación.
* **Control de capacidades**: Solo se permite ejecutar hooks expresamente declarados en las capacidades del plugin.

Consulte [Creación de plugins](../development/building-plugins.md) para conocer las pautas de desarrollo completas.
