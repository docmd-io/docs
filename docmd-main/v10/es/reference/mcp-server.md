---
title: "Servidor MCP"
description: "Referencia del servidor del Protocolo de Contexto de Modelo (MCP) para la integración con herramientas de desarrollo de IA."
---

docmd incorpora un servidor nativo del Protocolo de Contexto de Modelo (MCP), lo que permite a los agentes de desarrollo de IA interactuar con su espacio de trabajo de documentación mediante programación a través de canales de transporte locales.

## Descripción técnica

El [Protocolo de Contexto de Modelo](external:https://modelcontextprotocol.io/) es una especificación abierta para conectar modelos de IA con herramientas del espacio de trabajo local. docmd implementa la capa de transporte `stdio`: los clientes inician `docmd mcp` como un subproceso e intercambian mensajes JSON-RPC 2.0 a través de los flujos de entrada/salida estándar.

## Inicio y configuración

```bash
docmd mcp
```

### Integración con Claude Desktop

Agregue a su `claude_desktop_config.json`:

```json "claude_desktop_config.json"
{
  "mcpServers": {
    "docmd": {
      "command": "npx",
      "args": ["@docmd/core", "mcp"],
      "cwd": "/path/to/your/docs/project"
    }
  }
}
```

### Configuración en Cursor e IDE

Configure en el panel de ajustes de MCP del editor:

```json "mcp_settings.json"
{
  "command": "npx @docmd/core mcp",
  "transport": "stdio"
}
```

## Herramientas disponibles

El servidor MCP expone los siguientes controladores de herramientas principales:

| Herramienta | Propósito técnico |
| :--- | :--- |
| **`search_docs`** | Ejecutar consultas de búsqueda de texto completo en archivos fuente Markdown. Devuelve ubicaciones de archivos y números de línea coincidentes. Respeta `config.exclude` — los archivos excluidos nunca aparecen en los resultados. |
| **`list_docs`** | Enumerar rutas relativas de archivos Markdown dentro del espacio de trabajo (opcionalmente delimitadas por subdirectorios). Respeta `config.exclude`. |
| **`read_doc`** | Leer el contenido fuente Markdown sin procesar para las rutas de archivo especificadas. El acceso está estrictamente aislado a las raíces del proyecto. |
| **`get_config`** | Inspeccionar los parámetros de configuración resueltos (`docmd.config.json`). Las claves sensibles (tokens de API, ID secretos) se redactan automáticamente. |
| **`validate_docs`** | Ejecutar comprobaciones de validación de enlaces en las fuentes Markdown. Devuelve informes de enlaces rotos. Respeta `config.exclude`. |
| **`get_llms_context`** | Obtener cargas útiles de contexto `llms-full.txt` unificadas y optimizadas para la ingestión de indicaciones de LLM. |

## MCP sobre HTTP

[`docmd serve`](../deployment/docmd-serve#mcp-sobre-http) puede exponer estas herramientas en `POST /mcp` en el servidor de producción. Está desactivado de forma predeterminada:

```json "docmd.config.json"
{
  "serve": {
    "mcp": { "enabled": true, "origins": [] }
  }
}
```

A través de HTTP, las herramientas son de solo lectura: `get_llms_context` devuelve el archivo `llms-full.txt` del sitio que se está sirviendo en lugar de reconstruirlo. Una solicitud con un encabezado `Origin` debe coincidir con `serve.mcp.origins`; las solicitudes sin él (clientes MCP que no son navegadores) son aceptadas. El punto final no tiene estado: una respuesta JSON por solicitud, sin sesiones.

```bash
claude mcp add --transport http docmd https://docs.example.com/mcp
```

## Detalles de cumplimiento del protocolo

docmd admite la especificación MCP estándar:

* **Mecanismo de transporte**: `stdio` (mensajes JSON-RPC 2.0 a través de E/S estándar); HTTP sin estado bajo `docmd serve`.
* **Registro**: Registros de diagnóstico fuera de banda emitidos a través de `stderr`.
* **Flujo del ciclo de vida**: `initialize` : `notifications/initialized` : Invocaciones de herramientas.
* **Capacidades**: Expone `tools`, `resources` y `prompts`.

## Controles de seguridad

* **Aislamiento de procesos locales**: `docmd mcp` opera estrictamente como un subproceso sin abrir puertos de red externos. A través de HTTP, el punto final es opcional, de solo lectura y no tiene autenticación propia: protéjalo con su proxy inverso si su documentación es privada.
* **Verificación de límites de ruta**: Las operaciones de E/S de archivos están restringidas dentro del directorio raíz del proyecto, y `read_doc` solo devuelve Markdown dentro del directorio fuente.
* **Cumplimiento de `config.exclude`**: `search_docs`, `list_docs` y `validate_docs` respetan los patrones glob definidos en `config.exclude` — los archivos y directorios excluidos del build del sitio también se excluyen de los resultados de las herramientas MCP. Esto garantiza que los agentes de IA solo vean la documentación publicada intencionalmente.

::: callout tip "Uso de MCP frente a llms.txt" icon:zap
Utilice **MCP** cuando los agentes de IA necesiten acceso interactivo a herramientas para buscar archivos o validar enlaces durante la edición de código. Utilice **`llms-full.txt`** al entregar cargas útiles completas de contexto del sitio en operaciones de una sola indicación.
:::
