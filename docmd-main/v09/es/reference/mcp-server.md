---
title: "Servidor MCP (Model Context Protocol)"
description: "Referencia técnica del servidor MCP integrado en docmd para interacción con agentes de IA."
---

`docmd` incluye un servidor MCP nativo que permite a los agentes de IA (como Claude Desktop o Cursor) interactuar programáticamente con su espacio de trabajo de documentación.

## Inicio y Configuración

```bash
docmd mcp
```

### Configuración en Claude Desktop

Añada lo siguiente a su archivo `claude_desktop_config.json`:

```json "claude_desktop_config.json"
{
  "mcpServers": {
    "docmd": {
      "command": "npx",
      "args": ["@docmd/core", "mcp"],
      "cwd": "/ruta/a/su/proyecto/docs"
    }
  }
}
```

## Herramientas Disponibles

* **`search_docs`**: Búsqueda de texto completo en los archivos Markdown.
* **`read_doc`**: Lee el contenido completo de un archivo específico.
* **`validate_docs`**: Ejecuta la validación de enlaces internos.
