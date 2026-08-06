---
title: "MCP Server"
description: "Model Context Protocol (MCP) server reference for integration with AI development tools."
---

docmd incorporates a native Model Context Protocol (MCP) server, enabling AI development agents to interact with your documentation workspace programmatically over local transport channels.

## Technical Overview

The [Model Context Protocol](external:https://modelcontextprotocol.io/) is an open specification for interfacing AI models with local workspace tools. docmd implements the `stdio` transport layer — clients launch `docmd mcp` as a subprocess and exchange JSON-RPC 2.0 messages over standard input/output streams.

## Launch & Configuration

```bash
docmd mcp
```

### Claude Desktop Integration

Add to your `claude_desktop_config.json`:

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

### Cursor & IDE Settings

Configure in editor MCP settings:

```json "mcp_settings.json"
{
  "command": "npx @docmd/core mcp",
  "transport": "stdio"
}
```

## Available Tool Handlers

The MCP server exposes 6 primary tool handlers:

| Tool | Technical Purpose |
| :--- | :--- |
| **`search_docs`** | Execute full-text search queries across Markdown source files. Returns file locations and matching line numbers. |
| **`list_docs`** | List relative Markdown file paths within the workspace (optionally scoped by subdirectories). |
| **`read_doc`** | Read raw Markdown source contents for specified file paths. Access is strictly sandboxed to project roots. |
| **`get_config`** | Inspect resolved configuration parameters (`docmd.config.json`). Sensitive keys (API tokens, secret IDs) are redacted automatically. |
| **`validate_docs`** | Execute link validation checks across Markdown sources. Returns broken link reports with target locations. |
| **`get_llms_context`** | Retrieve unified `llms-full.txt` context payloads optimised for LLM prompt ingestion. |

## Protocol Compliance Details

docmd supports the standard MCP specification:

* **Transport Mechanism**: `stdio` (JSON-RPC 2.0 messages over standard I/O).
* **Logging**: Out-of-band diagnostic logs emitted via `stderr`.
* **Lifecycle Flow**: `initialize` → `notifications/initialized` → Tool invocations.
* **Capabilities**: Exposes `tools`, `resources`, and `prompts`.

## Security Controls

* **Local Process Sandbox**: Operates strictly as a child process without opening external network ports.
* **Path Boundary Verification**: File I/O operations are restricted within the project root directory.

::: callout tip "MCP vs llms.txt Usage" icon:zap
Use **MCP** when AI agents need interactive tool access to search files or validate links during code editing. Use **`llms-full.txt`** when delivering complete site context payloads in single prompt operations.
:::