---
title: "MCP 与 Agent Skills"
description: "为 docmd 工作区配置 Model Context Protocol (MCP) 服务端与 AI 智能体技能。"
---

将 AI 开发智能体集成到你的工作流中，需要结构化的接口来允许模型高效地查询、阅读和校验文档上下文。docmd 通过原生的 **Model Context Protocol (MCP)** 服务端和自动生成的 **Agent Skills** 指令满足这一需求。

## Model Context Protocol (MCP) 设置

Model Context Protocol 通过 `stdio` 将 LLM 环境直接连接到你的本地工作区工具。

### 1. Claude Desktop 集成

在你的 `claude_desktop_config.json` 中添加以下内容：

```json "claude_desktop_config.json"
{
  "mcpServers": {
    "docmd": {
      "command": "npx",
      "args": ["@docmd/core", "mcp"],
      "cwd": "/your/docs/project/path"
    }
  }
}
```

### 2. IDE 集成 (Cursor / Windsurf)

在编辑器的 MCP 设置面板中，使用 `stdio` 传输添加一个新服务：

* **Command**: `npx @docmd/core mcp`
* **Transport**: `stdio`

## 可用的 MCP 工具

连接成功后，智能体可以执行 6 个核心工具处理程序：

1. `search_docs(query)`: 在工作区文件之间执行全文搜索。
2. `list_docs(subdir?)`: 列出相对 Markdown 文件路径，支持按语言版本或语言筛选。
3. `read_doc(route)`: 读取沙箱文件路由的原始 Markdown 内容。
4. `get_config()`: 审查已解析的 `docmd.config.json` 选项（敏感值已打码）。
5. `validate_docs()`: 校验内部链接目标并报告失效锚点。
6. `get_llms_context()`: 获取整合后的 `llms-full.txt` 上下文载荷。

## 利用 Agent Skills (`SKILL.md`)

运行 `docmd init` 会在仓库根目录下生成一个 `SKILL.md` 文件。该文档作为在你的代码库上工作的 AI 智能体的使用指南。

::: callout tip "推荐的智能体工作流" icon:bot
1. **初始化上下文**: 指导智能体在会话开始时审查 `SKILL.md`，以学习自定义 Callouts、OpenAPI 标记和文件结构。
2. **校验修改**: 指导智能体在编辑 Markdown 文件后运行 `validate_docs` 或 `npx @docmd/core validate`，以防止链接失效。
:::
