---
title: "AI 助手插件"
description: "基于 aiplug 多提供者集成的交互式、感知搜索的 AI 文档助手。"
---

`@docmd/plugin-ai` 插件为您的文档网站带来全新的交互式 AI 助手。它利用 `@docmd/plugin-search` 检索增强生成 (RAG) 索引，精确定位相关文档章节，输出带有可点击来源引用的准确回答。

## 配置示例

AI 插件在 `v0.9.0` 中作为核心插件默认启用。您可以在 `docmd.config.json` 中配置自定义选项：

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "assistant": true,
      "captcha": false,
      "provider": "openai",
      "model": "gpt-4o-mini",
      "position": "bottom-center",
      "greeting": "今天有什么可以帮您解答的吗？",
      "placeholder": "输入关于文档的问题...",
      "suggestions": [
        "如何快速开始？",
        "查看配置选项说明"
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

## 配置选项

| 选项 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `assistant` | `boolean` | `true` | 是否启用交互式 AI 助手浮层。 |
| `captcha` | `boolean` | `false` | 是否开启开源 Proof-of-Work 人机验证防刷机制。 |
| `provider` | `string` | `'openai'` | LLM 提供者：`'openai'`、`'anthropic'`、`'gemini'`、`'deepseek'`、`'groq'` 或 `'ollama'`。 |
| `model` | `string` | 提供者默认 | 具体模型名称（如 `gpt-4o-mini`、`claude-3-5-haiku-20241022`）。 |
| `position` | `string` | `'bottom-center'` | 浮动输入栏位置：`'bottom-center'`、`'bottom-right'` 或 `'bottom-left'`。 |
| `greeting` | `string` | `'今天有什么可以帮您解答的吗？'` | AI 聊天窗口顶部的欢迎语。 |
| `placeholder` | `string` | `'输入关于文档的问题...'` | 输入框占位符文本。 |
| `suggestions` | `string[]` | 默认问题列表 | 快捷提示词 Pill 按钮列表。 |
| `contextLimit` | `number` | `5` | 提供给 LLM 上下文窗口的最大 RAG 切片数量。 |
| `rateLimit` | `object` | `{ maxRequests: 10, windowMs: 60000 }` | 滑动窗口请求速率限制，防止模型被过度调用或滥用。 |
