---
title: "MCP 服务端"
description: "用于与 AI 开发工具集成的 Model Context Protocol (MCP) 服务端参考。"
---

docmd 内置了原生的 Model Context Protocol (MCP) 服务端，允许 AI 开发智能体通过本地传输通道以程序化方式与你的文档工作区交互。

## 技术概述

[Model Context Protocol](external:https://modelcontextprotocol.io/) 是一个用于将 AI 模型连接到本地工作区工具的开放规范。docmd 实现层为 `stdio` 传输层 —— 客户端将 `docmd mcp` 作为子进程启动，并通过标准输入/输出流交换 JSON-RPC 2.0 消息。

## 启动与配置

```bash
docmd mcp
```

### Claude Desktop 集成

添加到你的 `claude_desktop_config.json`：

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

### Cursor 与 IDE 设置

在编辑器的 MCP 设置中配置：

```json "mcp_settings.json"
{
  "command": "npx @docmd/core mcp",
  "transport": "stdio"
}
```

## 可用的 Tool Handler

MCP 服务端暴露了 6 个核心 Tool Handler：

| Tool | 技术用途 |
| :--- | :--- |
| **`search_docs`** | 在 Markdown 源文件之间执行全文搜索。返回文件位置和匹配的行号。 |
| **`list_docs`** | 列出工作区内的相对 Markdown 文件路径（可选按子目录限定范围）。 |
| **`read_doc`** | 读取指定文件路径的原始 Markdown 源码内容。访问权限被严格限制在项目根目录下。 |
| **`get_config`** | 审查已解析的配置参数 (`docmd.config.json`)。敏感键（API Token、Secret ID）会被自动打码。 |
| **`validate_docs`** | 在 Markdown 源码之间执行链接校验检查。返回带有目标位置的死链报告。 |
| **`get_llms_context`** | 获取针对 LLM prompt 摄取优化的统一 `llms-full.txt` 上下文载荷。 |

## 协议合规细节

docmd 支持标准 MCP 规范：

* **传输机制**: `stdio`（通过标准 I/O 传递 JSON-RPC 2.0 消息）。
* **日志**: 通过 `stderr` 发送带外诊断日志。
* **生命周期流程**: `initialize` → `notifications/initialized` → Tool 调用。
* **能力**: 暴露 `tools`、`resources` 和 `prompts`。

## 安全控制

* **本地进程沙箱**: 严格作为子进程运行，不打开任何外部网络端口。
* **路径边界校验**: 文件 I/O 操作被限制在项目根目录内。

::: callout tip "MCP 与 llms.txt 的使用场景" icon:zap
当 AI 智能体在代码编辑期间需要交互式工具访问来搜索文件或校验链接时，请使用 **MCP**。当在单个 prompt 操作中传递完整的站点上下文载荷时，请使用 **`llms-full.txt`**。
:::
