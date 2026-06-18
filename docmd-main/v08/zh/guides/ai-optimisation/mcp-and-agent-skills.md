---
title: "MCP 与 Agent Skills"
description: "使用 Model Context Protocol 与自定义 Skills，为 AI 开发 Agent 优化您的文档工作区。"
---

将 AI 开发 Agent 集成到您的工作流中，需要结构化的接口，使模型能够高效地查询、读取与写入文档上下文。`docmd` 通过一个原生 **Model Context Protocol (MCP)** 服务器和一个可扩展的 **Agent Skills** 数据库来满足这一需求。

## Model Context Protocol (MCP) 设置

Model Context Protocol 将 LLM 环境直接连接到您本地工作区的工具。

### 1. Claude Desktop 集成

将以下内容添加到您的桌面配置文件中（macOS 通常位于 `~/Library/Application Support/Claude/claude_desktop_config.json`，Windows 位于 `%APPDATA%\Claude\claude_desktop_config.json`）：

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

### 2. IDE 集成（Cursor / Windsurf）

在编辑器的 MCP 设置面板中，使用 `stdio` 传输方式添加一个新服务器：

-   **Command**：`npx @docmd/core mcp`
-   **Transport**：`stdio`

## 可用的 MCP 工具

连接成功后，以下工具将对 Agent 可用：

1.  `search_docs(query)`：执行工作区范围的全文本搜索。
2.  `read_doc(route)`：获取指定路由的原始 Markdown 内容。
3.  `validate_docs()`：对整个文档进行 lint 检查，并返回校验错误（例如断链）。
4.  `get_llms_context()`：获取合并后的 `llms-full.txt` 上下文文件。

## 利用 Agent Skills (`SKILL.md`)

当您在项目中运行 `docmd init` 时，引擎会自动在工作区根目录生成一个 `SKILL.md` 文件。该文件充当了在您仓库中工作的任意 AI Agent 的提示指令卡。

### 面向 AI Agent 的最佳实践

1.  **首先阅读 SKILL.md**：指示 Agent 在编码会话开始时阅读 `SKILL.md` 文件。这能让模型了解自定义 Callout、OpenAPI 标记以及文件结构。
2.  **编辑后进行校验**：每当 Agent 修改了 Markdown 文件，都应调用 `validate_docs` 工具（或运行 `npx @docmd/core validate`），以验证相对链接和锚点路径是否仍然有效。
3.  **同步本地化版本**：如果项目使用版本管理或多语言，Agent 应使用对比矩阵来确保所有翻译保持同步。