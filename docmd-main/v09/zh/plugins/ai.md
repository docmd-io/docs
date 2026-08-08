---
title: "AI 助手插件"
description: "基于 aiplug 多提供者集成的交互式、感知搜索的 AI 文档助手。"
---

`@docmd/plugin-ai` 插件为您的文档网站带来全新的交互式 AI 助手。它利用 `@docmd/plugin-search` 预编译的索引执行检索增强生成 (RAG)，精确定位相关文档章节，输出带有可点击来源引用的上下文回答。

## 核心功能

* **悬浮触发器与玻璃拟物抽屉**: 极简胶囊触发器（`⌘K` 快捷键），可展开为感知主题的聊天面板。
* **搜索感知 RAG**: 查询预构建的 `search-index.json` 数据，将 LLM 响应直接基于您站点的文档内容进行锚定。
* **BYOK 服务端安全**: API 密钥仅在服务端环境（`AI_API_KEY`、`OPENAI_API_KEY`）中解析，确保客户端 Web 包中零凭据暴露。
* **多提供商集成**: 由 `aiplug` 提供支持，原生支持 OpenAI、Anthropic、Gemini、DeepSeek、Groq 和本地 Ollama 实例。
* **主题中立性**: 完美适配所有内置与自定义主题模式下的浅色与深色主题。

## 配置选项

在 `docmd.config.json` 中配置助手选项与提供商凭据：

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "assistant": true,
      "provider": "openai",
      "model": "gpt-4o-mini",
      "position": "bottom-center",
      "greeting": "今天有什么可以帮您解答的吗？",
      "placeholder": "输入关于文档的问题...",
      "suggestions": [
        "如何快速开始？",
        "查看配置选项说明",
        "解释核心概念"
      ],
      "contextLimit": 5,
      "rateLimit": {
        "maxRequests": 10,
        "windowMs": 60000
      }
    }
  }
}
```

## 选项参考

| 选项 | 类型 | 默认值 | 技术描述 |
| :--- | :--- | :--- | :--- |
| `assistant` | `boolean` | `true` | 启用或禁用交互式 AI 助手触发器。 |
| `captcha` | `boolean` | `false` | 开启开源 Proof-of-Work 人机验证防刷机制。 |
| `provider` | `string` | `'openai'` | LLM 提供商（`'openai'`、`'anthropic'`、`'gemini'`、`'deepseek'`、`'groq'`、`'ollama'`）。 |
| `model` | `string` | 提供商默认 | 具体模型标识符（例如 `gpt-4o-mini`、`claude-3-5-haiku-20241022`）。 |
| `position` | `string` | `'bottom-center'` | 悬浮胶囊触发器的屏幕位置（`'bottom-center'`、`'bottom-right'`、`'bottom-left'`）。 |
| `greeting` | `string` | `'今天有什么可以帮您解答的吗？'` | 聊天面板内的初始欢迎语。 |
| `placeholder` | `string` | `'输入关于文档的问题...'` | 聊天输入框占位符文本。 |
| `suggestions` | `string[]` | 默认问题列表 | 推荐的快捷提示按钮。 |
| `contextLimit` | `number` | `5` | 传入 LLM 上下文窗口的最大 RAG 文档切片数量。 |
| `rateLimit` | `object` | `{ maxRequests: 10, windowMs: 60000 }` | 滑动窗口速率限制，保护 LLM 模型免受 API 过度使用。 |

## 服务端安全（自带密钥 BYOK）

::: callout warning "零凭据泄漏" icon:alert-triangle
`@docmd/plugin-ai` 严格在服务端处理 API 凭据。提供商 API 密钥绝不会渲染在客户端 HTML 或静态 JavaScript 包中。
:::

在启动文档服务器前设置提供商环境变量：

```bash
export OPENAI_API_KEY="sk-..."
# 或
export ANTHROPIC_API_KEY="sk-ant-..."
# 或通用备用变量
export AI_API_KEY="your-api-key"
```

## 架构执行流程

1. **构建期 Action 注册**: 在站点编译期间，`@docmd/plugin-ai` 注册服务端 RPC Action 处理程序 (`ai:chat`) 并注入轻量级客户端触发器脚本。
2. **检索增强生成 (RAG)**: 当读者提交提问时：
   - RPC 端点查询由 `@docmd/plugin-search` 编译的搜索索引。
   - 根据向量/关键词距离选择匹配的文档标题和段落文本切片。
   - 相关切片与用户对话历史一起编译为结构化的系统提示词。
3. **提供商处理与引用**: 请求通过 `aiplug` 路由到指定的提供商。输出的响应包含指向引用的文档锚点的 Markdown 链接。
