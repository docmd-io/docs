---
title: "MCP 服务端"
description: "通过 Model Context Protocol 将 AI 开发 Agent 连接到您的文档工作区。"
---

docmd 包含原生的 Model Context Protocol (MCP) 服务端，使 AI 开发 Agent 能够以编程方式与您的文档工作区进行交互。

## 什么是 MCP？

[Model Context Protocol](external:https://modelcontextprotocol.io/) 是一个连接 AI 模型与外部工具和数据源的开放标准。它使用 JSON-RPC 2.0 消息通过传输层（stdio、HTTP）进行通信。docmd 实现了 `stdio` 传输 — Agent 以子进程方式启动 `docmd mcp`，通过 stdin/stdout 进行通信。

## 快速开始

```bash
docmd mcp
```

这将通过 `stdio` 启动 MCP 服务端。不会打开任何网络端口 — 所有通信都通过标准输入/输出流进行。

### Claude Desktop 配置

添加到 `claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "docmd": {
      "command": "npx",
      "args": ["@docmd/core", "mcp"],
      "cwd": "/您的/文档/项目/路径"
    }
  }
}
```

### Cursor / Windsurf 配置

```json
{
  "command": "npx @docmd/core mcp",
  "transport": "stdio"
}
```

## 可用工具

| 工具 | 描述 |
| :--- | :--- |
| **`search_docs`** | 对所有文档文件进行全文搜索。 |
| **`read_doc`** | 通过相对路径读取文档的原始 Markdown 内容。 |
| **`validate_docs`** | 对所有 Markdown 文件执行链接校验。 |
| **`get_llms_context`** | 返回完整的 `llms-full.txt` 上下文内容。 |

## 协议详情

docmd 实现了 MCP 规范（协议版本 `2025-03-26`）：

- **传输**: `stdio` — 通过 stdin/stdout 传输 JSON-RPC 2.0 消息
- **诊断**: 日志输出到 `stderr`
- **生命周期**: `initialize` → `notifications/initialized` → 工具调用
- **Ping**: 响应 `ping` 请求，返回 `{}`，用于连接健康检查

## 隐私与安全

- **仅限本地**: 服务端作为子进程运行 — 无网络暴露
- **沙箱隔离**: 文件操作限制在项目工作目录内
- **无遥测**: 不会向任何地方发送数据

## 互补功能

- **`llms.txt` / `llms-full.txt`**: 由 `llms` 插件在构建时生成。
- **复制上下文组件**: 浏览器按钮，将页面内容复制为 AI 优化格式。
- **SKILL.md**: 由 `docmd init` 生成的 Agent 指令手册。指向 [docmd-skills](external:https://github.com/docmd-io/docmd-skills)。
