---
title: "MCP 服务器"
description: "使用 Model Context Protocol，把 AI 开发 Agent 接入您的文档工作区。"
---

docmd 内置了一个原生的 Model Context Protocol (MCP) 服务器，使 AI 开发 Agent 能够以编程方式、经由一条安全的本地连接与您的文档工作区交互。

## 什么是 MCP？

[Model Context Protocol](external:https://modelcontextprotocol.io/) 是一个开放标准，用于把 AI 模型与外部工具和数据源相连。它通过传输层（stdio、HTTP）传递 JSON-RPC 2.0 消息。docmd 实现的是 `stdio` 传输 —— 由 Agent 把 `docmd mcp` 派生为子进程，通过 stdin/stdout 通信。

## 快速开始

```bash
docmd mcp
```

通过 `stdio` 启动 MCP 服务器。不会开放任何网络端口 —— 所有通信都通过标准输入/输出流进行。

### Claude Desktop 配置

加入您的 Claude Desktop `claude_desktop_config.json`：

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

### Cursor / Windsurf 配置

加入您编辑器的 MCP 设置：

```json "mcp_settings.json"
{
  "command": "npx @docmd/core mcp",
  "transport": "stdio"
}
```

## 可用工具

MCP 服务器向 Agent 暴露四个工具：

| 工具 | 说明 |
| :--- | :--- |
| **`search_docs`** | 在所有文档文件中进行全文搜索。返回匹配行及其文件路径和行号。 |
| **`read_doc`** | 读取任意文档文件的原始 Markdown 内容（按相对路径）。 |
| **`validate_docs`** | 跨所有 Markdown 文件执行链接校验，返回失效链接的列表（含文件、行号、目标）。 |
| **`get_llms_context`** | 拉取完整的 `llms-full.txt` 上下文 —— 整个文档站点内容的统一聚合，已为 LLM 摄取优化。 |

### 工具 Schema

#### `search_docs`

```json
{
  "name": "search_docs",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "要搜索的关键词或短语。" }
    },
    "required": ["query"]
  }
}
```

#### `read_doc`

```json
{
  "name": "read_doc",
  "inputSchema": {
    "type": "object",
    "properties": {
      "route": { "type": "string", "description": "Markdown 文件的相对路径（例如 docs/getting-started.md）。" }
    },
    "required": ["route"]
  }
}
```

#### `validate_docs` / `get_llms_context`

无需任何入参。

## 协议细节

docmd 实现了 MCP 规范（协议版本 `2025-03-26`）：

- **传输**：`stdio` —— stdin/stdout 上的 JSON-RPC 2.0 消息，每行一条
- **诊断**：写入 `stderr`（不干扰 JSON-RPC 流）
- **生命周期**：`initialize` → `notifications/initialized` → 工具调用
- **Ping**：以 `{}` 响应 `ping` 请求（连接健康检查必需）
- **能力**：声明 `tools`、`resources` 与 `prompts`（其中 tools 是主要接口）

## 隐私与安全

- **完全本地**：服务器作为子进程运行 —— 不暴露网络、不开放端口
- **沙箱化**：文件操作被限制在项目工作目录之内
- **无遥测**：不向任何地方发送数据 —— 所有处理都在您的本机进行

## 互补特性

MCP 服务器与 docmd 中其他 AI 优先特性协同工作：

- **`llms.txt` / `llms-full.txt`**：由 `llms` 插件在构建时生成。任何 Agent 都可在不依赖 MCP 的情况下从您部署好的站点拉取。
- **复制上下文小部件 (Copy Context)**：浏览器中一个把页面内容以"喂给 AI 对话"的格式复制到剪贴板的按钮。
- **SKILL.md**：通过 `docmd init` 自动生成的 Agent 说明文档，指向 [docmd-skills](external:https://github.com/docmd-io/docmd-skills) 知识库。

::: callout tip "何时用 MCP vs. llms.txt"
当 Agent 在开发过程中需要交互式搜索、读取特定文件或校验链接时，请使用 **MCP**；当 Agent 希望通过单次请求获得完整文档上下文（例如用于 RAG 或预填 Prompt）时，请使用 **llms-full.txt**。
:::