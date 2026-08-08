---
title: "Comandos de la CLI"
description: "Referencia de la interfaz de línea de comandos para docmd: comandos, marcadores y opciones para compilar y gestionar la documentación."
---

## Descripción general de comandos

| Comando | Función técnica |
| :--- | :--- |
| [`npx @docmd/core init`](#npx-docmdcore-init) | Inicializar un nuevo espacio de trabajo de documentación. |
| [`npx @docmd/core dev`](#npx-docmdcore-dev) | Iniciar el servidor de desarrollo local con recarga rápida. |
| [`npx @docmd/core build`](#npx-docmdcore-build) | Compilar un sitio estático listo para producción. |
| [`npx @docmd/core live`](#npx-docmdcore-live) | Iniciar el entorno del Editor en vivo basado en el navegador. |
| [`npx @docmd/core stop`](#npx-docmdcore-stop) | Finalizar los servidores de desarrollo activos. |
| [`npx @docmd/core deploy`](#npx-docmdcore-deploy) | Generar manifiestos de despliegue y archivos de contenedor. |
| [`npx @docmd/core migrate`](#npx-docmdcore-migrate) | Actualizar configuraciones heredadas o migrar desde herramientas de terceros. |
| [`npx @docmd/core validate`](#npx-docmdcore-validate) | Ejecutar la validación de enlaces y comprobar la integridad del documento Markdown. |
| [`npx @docmd/core doctor`](#npx-docmdcore-doctor) | Ejecutar diagnósticos de entorno previos al vuelo e inspeccionar dependencias. |
| [`npx @docmd/core mcp`](#npx-docmdcore-mcp) | Ejecutar el servidor del Protocolo de Contexto de Modelo (MCP) a través de `stdio`. |
| [`npx @docmd/core add <plugin>`](#npx-docmdcore-add-plugin) | Instalar y configurar plugins de docmd. |
| [`npx @docmd/core remove <plugin>`](#npx-docmdcore-remove-plugin) | Desinstalar plugins y eliminar entradas de configuración. |

## Opciones globales

| Marcador de parámetro | Alias | Descripción técnica |
| :--- | :--- | :--- |
| `--config <path>` | `-c` | Especificar ruta personalizada al archivo de configuración (predeterminado: `docmd.config.json`). |
| `--verbose` | `-V` | Emitir registros de ejecución detallados. |
| `--version` | `-v` | Emitir la versión del paquete instalado. |
| `--help` | `-h` | Emitir instrucciones de ayuda de la CLI de comandos. |
| `--cwd <path>` | - | Anular la ruta del directorio de trabajo de destino. |

## `npx @docmd/core init`

Inicializa un diseño de repositorio de documentación dentro del directorio de trabajo.

```bash
npx @docmd/core init
```

Genera:
* `docs/index.md`: página de inicio predeterminada.
* `docmd.config.json`: opciones de configuración estándar.
* Scripts de compilación de `package.json` actualizados.

## `npx @docmd/core dev`

Inicia el servidor de desarrollo local con recarga rápida en tiempo real.

```bash
npx @docmd/core dev [opciones]
```

| Marcador de parámetro | Alias | Descripción técnica |
| :--- | :--- | :--- |
| `--port <number>` | `-p` | Especificar puerto del servidor web (predeterminado: `3000`). |
| `--config <path>` | `-c` | Ruta personalizada al archivo de configuración. |

## `npx @docmd/core build`

Compila un sitio estático de producción en su directorio de salida configurado (`site/`).

```bash
npx @docmd/core build [opciones]
```

| Marcador de parámetro | Alias | Descripción técnica |
| :--- | :--- | :--- |
| `--offline` | - | Reescribir rutas de recursos y enlaces a archivos relacionales `.html` para la navegación local en el sistema de archivos. |
| `--config <path>` | `-c` | Ruta personalizada al archivo de configuración. |

## `npx @docmd/core live`

Inicia el entorno del Editor en vivo basado en el navegador.

```bash
npx @docmd/core live [opciones]
```

| Marcador de parámetro | Descripción técnica |
| :--- | :--- |
| `--build-only` | Compilar el paquete independiente del Editor en vivo sin iniciar el servidor web de vista previa. |

## `npx @docmd/core stop`

Finaliza los servidores de desarrollo en ejecución.

```bash
npx @docmd/core stop [opciones]
```

| Marcador de parámetro | Alias | Descripción técnica |
| :--- | :--- | :--- |
| `--port <number>` | `-p` | Finalizar el proceso que se ejecuta en el puerto especificado. |
| `--force` | `-f` | Forzar la detención de procesos que se ejecutan en puertos estándar (3000, 3001, 8080, 8081). |

## `npx @docmd/core deploy`

Genera manifiestos de despliegue y archivos de configuración.

```bash
npx @docmd/core deploy [opciones]
```

| Marcador de parámetro | Descripción técnica |
| :--- | :--- |
| `--docker` | Emitir `Dockerfile` multietapa y `.dockerignore`. |
| `--nginx` | Emitir `nginx.conf` para producción. |
| `--caddy` | Emitir `Caddyfile`. |
| `--github-pages` | Emitir `.github/workflows/deploy.yml`. |
| `--vercel` | Emitir `vercel.json`. |
| `--netlify` | Emitir `netlify.toml`. |
| `--force` | Sobrescribir los manifiestos de despliegue existentes. |

## `npx @docmd/core migrate`

Migra configuraciones desde versiones heredadas o motores de terceros.

```bash
npx @docmd/core migrate [opciones]
```

Marcadores de opción:
* `--upgrade`: Traducir las claves de configuración heredadas anteriores a 0.7.x en el lugar.
* `--dry-run`: Previsualizar los cambios de migración sin modificar el contenido del disco.

## `npx @docmd/core validate`

Valida los destinos de enlaces internos y la estructura de documentos en las fuentes Markdown.

```bash
npx @docmd/core validate [opciones]
```

| Marcador de parámetro | Descripción técnica |
| :--- | :--- |
| `--json` | Emitir errores de validación como JSON legible por máquina para la integración con CI. |

## `npx @docmd/core doctor`

Ejecuta diagnósticos de entorno previos al vuelo e inspecciona los estados de instalación de plugins/plantillas.

```bash
npx @docmd/core doctor [opciones]
```

| Marcador de parámetro | Descripción técnica |
| :--- | :--- |
| `--config <path>` | Ruta a un archivo de configuración que no sea el predeterminado. |
| `--fix` | Autoinstalar plugins o plantillas oficiales que falten e identificados durante la comprobación. |
| `--json` | Emitir el informe de diagnóstico en formato JSON legible por máquina. |

## `npx @docmd/core mcp`

Ejecuta el servidor del Protocolo de Contexto de Modelo (MCP) a través de `stdio` para integraciones de agentes.

```bash
npx @docmd/core mcp
```

```json "claude_desktop_config.json"
{
  "mcpServers": {
    "docmd": {
      "command": "npx",
      "args": ["-y", "@docmd/core", "mcp"]
    }
  }
}
```

## `npx @docmd/core add <plugin>`

Instala y configura plugins oficiales o de terceros.

```bash
npx @docmd/core add <nombre-del-plugin>
```

| Ejemplo de comando | Función técnica |
| :--- | :--- |
| `npx @docmd/core add analytics` | Instalar `@docmd/plugin-analytics`. |
| `npx @docmd/core add search` | Instalar `@docmd/plugin-search`. |

## `npx @docmd/core remove <plugin>`

Desinstala plugins y limpia los bloques de configuración correspondientes en `docmd.config.json`.

```bash
npx @docmd/core remove <nombre-del-plugin>
```

::: callout tip "Registro de terminal para agentes" icon:sparkles
docmd da formato a la salida de la CLI mediante registros de terminal estructurados para simplificar el análisis por parte de trabajos de CI automatizados y agentes de desarrollo de IA.
:::