---
title: "MCP & Agent Skills"
description: "Configure Model Context Protocol (MCP) servers and AI agent skills for docmd workspaces."
---

Integrating AI development agents into your workflow requires structured interfaces that allow models to query, read, and validate documentation context efficiently. docmd satisfies this need via a native **Model Context Protocol (MCP)** server and auto-generated **Agent Skills** instructions.

## Model Context Protocol (MCP) Setup

The Model Context Protocol connects LLM environments directly to your local workspace tools over `stdio`.

### 1. Claude Desktop Integration

Add the following to your `claude_desktop_config.json`:

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

### 2. IDE Integration (Cursor / Windsurf)

In your editor's MCP settings panel, add a new server using the `stdio` transport:

* **Command**: `npx @docmd/core mcp`
* **Transport**: `stdio`

## Available MCP Tools

Once connected, agents can execute 6 primary tool handlers:

1. `search_docs(query)`: Performs full-text searches across workspace files.
2. `list_docs(subdir?)`: Lists relative Markdown file paths, optionally scoped to a locale or version.
3. `read_doc(route)`: Reads raw Markdown contents for a sandboxed file route.
4. `get_config()`: Inspects resolved `docmd.config.json` options with secret values redacted.
5. `validate_docs()`: Lints internal link targets and reports broken anchors.
6. `get_llms_context()`: Fetches the consolidated `llms-full.txt` context payload.

## Leveraging Agent Skills (`SKILL.md`)

Running `docmd init` generates a `SKILL.md` file in your repository root. This document serves as an instruction manual for AI agents operating on your codebase.

::: callout tip "Recommended Agent Workflow" icon:bot
1. **Initialise Context**: Direct agents to inspect `SKILL.md` at the start of a session to learn custom Callouts, OpenAPI markup, and file structures.
2. **Validate Edits**: Instruct agents to run `validate_docs` or `npx @docmd/core validate` after editing Markdown files to prevent broken link regressions.
:::