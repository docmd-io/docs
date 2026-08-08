---
title: "MCP y habilidades de agente"
description: "Configure servidores del Protocolo de Contexto de Modelo (MCP) y habilidades de agentes de IA para espacios de trabajo de docmd."
---

La integración de agentes de desarrollo de IA en su flujo de trabajo requiere interfaces estructuradas que permitan a los modelos consultar, leer y validar el contexto de la documentación de manera eficiente. docmd satisface esta necesidad a través de un servidor nativo del **Protocolo de Contexto de Modelo (MCP)** e instrucciones generadas automáticamente de **Habilidades de Agente**.

## Configuración del Protocolo de Contexto de Modelo (MCP)

El Protocolo de Contexto de Modelo conecta los entornos LLM directamente a las herramientas de su espacio de trabajo local a través de `stdio`.

### 1. Integración con Claude Desktop

Agregue lo siguiente a su `claude_desktop_config.json`:

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

### 2. Integración con IDE (Cursor / Windsurf)

En el panel de configuración de MCP de su editor, agregue un nuevo servidor utilizando el transporte `stdio`:

* **Comando**: `npx @docmd/core mcp`
* **Transporte**: `stdio`

## Herramientas MCP disponibles

Una vez conectados, los agentes pueden ejecutar 6 controladores de herramientas principales:

1. `search_docs(query)`: Realiza búsquedas de texto completo en los archivos del espacio de trabajo.
2. `list_docs(subdir?)`: Enumera las rutas relativas de los archivos Markdown, opcionalmente delimitadas a un idioma o versión.
3. `read_doc(route)`: Lee el contenido Markdown sin procesar para una ruta de archivo aislada.
4. `get_config()`: Inspecciona las opciones resueltas de `docmd.config.json` con los valores secretos redactados.
5. `validate_docs()`: Analiza los destinos de enlaces internos e informa de anclas rotas.
6. `get_llms_context()`: Obtiene la carga útil de contexto consolidada `llms-full.txt`.

## Aprovechamiento de las habilidades de agente (`SKILL.md`)

Ejecutar `docmd init` genera un archivo `SKILL.md` en la raíz de su repositorio. Este documento sirve como manual de instrucciones para los agentes de IA que operan en su código base.

::: callout tip "Flujo de trabajo de agente recomendado" icon:bot
1. **Inicializar contexto**: Inste a los agentes a inspeccionar `SKILL.md` al comienzo de una sesión para aprender sobre avisos personalizados, marcado OpenAPI y estructuras de archivos.
2. **Validar ediciones**: Instruya a los agentes para que ejecuten `validate_docs` o `npx @docmd/core validate` después de editar archivos Markdown para evitar regresiones de enlaces rotos.
:::