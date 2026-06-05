---
title: "MCP & Agent Skills"
description: "Optimise your documentation workspace for AI development agents using the Model Context Protocol and custom Skills."
---

Integrating AI development agents into your workflow requires structured interfaces that allow models to query, read, and write documentation context efficiently. `docmd` satisfies this need via a native **Model Context Protocol (MCP)** server and an extensible **Agent Skills** database.

## Model Context Protocol (MCP) Setup

The Model Context Protocol connects LLM environments directly to your local workspace tools.

### 1. Claude Desktop Integration

Add the following to your desktop configuration file (typically at `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS or `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
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

-   **Command**: `npx @docmd/core mcp`
-   **Transport**: `stdio`

## Available MCP Tools

Once connected, the following tools become available to the agent:

1.  `search_docs(query)`: Performs a workspace-wide full-text search.
2.  `read_doc(route)`: Retrieves the raw Markdown contents of a specific route.
3.  `validate_docs()`: Lints the entire documentation and returns validation errors (e.g., broken links).
4.  `get_llms_context()`: Fetches the consolidated `llms-full.txt` context file.

## Leveraging Agent Skills (`SKILL.md`)

When you run `docmd init` in your project, the engine automatically generates a `SKILL.md` file in your root workspace. This file serves as a prompt instruction card for any AI agent working on your repository.

### Best Practices for AI Agents

1.  **Read SKILL.md First**: Instruct your agents to read the `SKILL.md` file at the start of a coding session. This teaches the model about custom Callouts, OpenAPI markup, and file structures.
2.  **Validate After Edits**: Whenever an agent modifies Markdown files, it should call the `validate_docs` tool (or run `npx @docmd/core validate`) to verify that no relative links or anchor paths are broken.
3.  **Synchronize Locales**: If the project uses versioning or multiple languages, agents should use the comparison matrix to ensure all translations stay in sync.