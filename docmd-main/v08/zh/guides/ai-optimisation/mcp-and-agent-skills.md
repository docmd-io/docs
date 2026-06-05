---
title: "MCP 与 Agent 技能"
description: "使用 Model Context Protocol 和自定义技能为 AI 开发 Agent 优化你的文档工作区。"
---

将 AI 开发 Agent 集成到你的工作流中，需要结构化的接口来让模型高效地查询、读取和写入文档上下文。`docmd` 通过内置的 **Model Context Protocol (MCP)** 服务端和可扩展的 **Agent Skills (Agent 技能)** 数据库满足了这一需求。

## Model Context Protocol (MCP) 配置

Model Context Protocol 将 LLM 环境直接连接到你的本地工作区工具。

### 1. Claude Desktop 集成

将以下内容添加到你的 Desktop 配置文件中（macOS 上通常位于 `~/Library/Application Support/Claude/claude_desktop_config.json`，Windows 上位于 `%APPDATA%\Claude\claude_desktop_config.json`）：

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

### 2. IDE 集成 (Cursor / Windsurf)

在编辑器的 MCP 设置面板中，添加一个使用 `stdio` 传输协议的新服务端：

-   **命令 (Command)**: `npx @docmd/core mcp`
-   **传输协议 (Transport)**: `stdio`

## 可用的 MCP 工具

连接成功后，Agent 将可以使用以下工具：

1.  `search_docs(query)`: 执行工作区范围内的全文检索。
2.  `read_doc(route)`: 获取特定路由的原始 Markdown 内容。
3.  `validate_docs()`: 校验整个文档并返回验证错误（例如：损坏的链接）。
4.  `get_llms_context()`: 获取合并后的 `llms-full.txt` 上下文文件。

## 杠杆化 Agent 技能 (`SKILL.md`)

当你在项目中运行 `docmd init` 时，引擎会自动在你的根工作区生成一个 `SKILL.md` 文件。该文件可用作在你的仓库上工作的任何 AI Agent 的 Prompt 指导卡。

### AI Agent 最佳实践

1.  **优先阅读 SKILL.md**：指示你的 Agent 在编码会话开始时阅读 `SKILL.md` 文件。这有助于模型学习自定义标注、OpenAPI 标记和文件结构。
2.  **修改后进行校验**：每当 Agent 修改 Markdown 文件时，都应当调用 `validate_docs` 工具（或运行 `npx @docmd/core validate`）来校验没有任何相对链接或锚点路径损坏。
3.  **同步多语言**：如果项目使用版本控制或多语言环境，Agent 应当使用对比矩阵来确保所有翻译保持同步。
