---
title: "MCP Server"
description: "Model Context Protocol (MCP) server reference for integration with AI development tools."
---

docmd incorporates a native Model Context Protocol (MCP) server, enabling AI development agents to interact with your documentation workspace programmatically over local transport channels.

## Technical Overview

The [Model Context Protocol](external:https://modelcontextprotocol.io/) is an open specification for interfacing AI models with local workspace tools. docmd implements the `stdio` transport layer, clients launch `docmd mcp` as a subprocess and exchange JSON-RPC 2.0 messages over standard input/output streams. A deployed site can also serve the same tools over HTTP, see [MCP over HTTP](#mcp-over-http).

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

The MCP server exposes the following primary tool handlers:

| Tool | Technical Purpose |
| :--- | :--- |
| **`search_docs`** | Execute full-text search queries across Markdown source files. Returns file locations and matching line numbers. Respects `config.exclude` — excluded files are never surfaced in results. |
| **`list_docs`** | List relative Markdown file paths within the workspace (optionally scoped by subdirectories). Respects `config.exclude`. |
| **`read_doc`** | Read raw Markdown source contents for specified file paths. Access is strictly sandboxed to project roots. |
| **`get_config`** | Inspect resolved configuration parameters (`docmd.config.json`). Sensitive keys (API tokens, secret IDs) are redacted automatically. |
| **`validate_docs`** | Execute link validation checks across Markdown sources. Returns broken link reports with target locations. Respects `config.exclude`. |
| **`get_llms_context`** | Retrieve unified `llms-full.txt` context payloads optimised for LLM prompt ingestion. |

## MCP over HTTP

[`docmd serve`](../deployment/docmd-serve#mcp-over-http) can expose these tools at `POST /mcp` on the production server. It is off by default:

```json "docmd.config.json"
{
  "serve": {
    "mcp": { "enabled": true, "origins": [] }
  }
}
```

Over HTTP the tools are read-only: `get_llms_context` returns the `llms-full.txt` of the site being served instead of rebuilding it. A request with an `Origin` header must match `serve.mcp.origins`; requests without one (non-browser MCP clients) are accepted. The endpoint is stateless: one JSON response per request, no sessions.

```bash
claude mcp add --transport http docmd https://docs.example.com/mcp
```

## Protocol Compliance Details

docmd supports the standard MCP specification:

* **Transport Mechanism**: `stdio` (JSON-RPC 2.0 messages over standard I/O); stateless HTTP under `docmd serve`.
* **Logging**: Out-of-band diagnostic logs emitted via `stderr`.
* **Lifecycle Flow**: `initialize` : `notifications/initialized` : Tool invocations.
* **Capabilities**: Exposes `tools`, `resources`, and `prompts`.

## Security Controls

* **Local Process Sandbox**: `docmd mcp` operates strictly as a child process without opening external network ports. Over HTTP, the endpoint is opt-in, read-only, and has no authentication of its own: protect it with your reverse proxy if your docs are private.
* **Path Boundary Verification**: File I/O operations are restricted within the project root directory, and `read_doc` only returns Markdown inside the source directory.
* **`config.exclude` Enforcement**: `search_docs`, `list_docs`, and `validate_docs` honour the `config.exclude` glob patterns defined in your configuration — files and directories excluded from the site build are equally excluded from MCP tool results. This ensures AI agents only see documentation that is intentionally published.

::: callout tip "MCP vs llms.txt Usage" icon:zap
Use **MCP** when AI agents need interactive tool access to search files or validate links during code editing. Use **`llms-full.txt`** when delivering complete site context payloads in single prompt operations.
:::