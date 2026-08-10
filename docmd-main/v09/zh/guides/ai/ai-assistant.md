---
title: "AI 助手配置与集成"
description: "如何配置和部署 docmd 的交互式 AI 助手，以获得 RAG 驱动的文档支持。"
---

docmd AI 助手基于你的 Markdown 文档直接为读者提供实时、上下文感知的解答。由 `@docmd/plugin-ai` 和 `aiplug` 提供支持，该助手利用站点的预编译搜索索引执行检索增强生成 (RAG)，同时在服务端保持 API 密钥的安全。

## 前置条件

在配置 AI 助手之前，请确保：
1. `docmd.config.json` 中已启用 `@docmd/plugin-search`（RAG 上下文提取所必需）。
2. 你拥有首选提供商（OpenAI、Anthropic、Gemini、DeepSeek、Groq 或 Ollama）的 API 密钥。

## 配置

在 `docmd.config.json` 中添加 `ai` 插件配置块：

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "indexBody": true
    },
    "ai": {
      "assistant": true,
      "provider": "openai",
      "model": "gpt-4o-mini",
      "position": "bottom-center",
      "greeting": "今天有什么可以帮你的？",
      "suggestions": [
        "如何快速开始？",
        "显示配置选项",
        "解释核心概念"
      ],
      "contextLimit": 5,
      "captcha": false
    }
  }
}
```

::: callout tip title:"推荐模型" icon:sparkles
为了在响应速度和成本之间取得最佳平衡，我们推荐使用快速推理模型，如 `gpt-4o-mini` (OpenAI)、`claude-3-5-haiku-20241022` (Anthropic) 或 `gemini-1.5-flash` (Google)。
::: /callout

## 设置提供商凭据

为防止凭据泄露，提供商 API 密钥仅从环境变量中读取：

```bash
# OpenAI
export OPENAI_API_KEY="sk-..."

# Anthropic
export ANTHROPIC_API_KEY="sk-ant-..."

# Google Gemini
export GEMINI_API_KEY="AIzaSy..."

# 通用备用密钥
export AI_API_KEY="your-api-key"
```

导出密钥后启动你的开发或生产 Web 服务器。客户端助手抽屉通过安全的 RPC action handler 与服务端通信。

## 微调 RAG 与搜索上下文

AI 助手利用 `@docmd/plugin-search` 数据在执行 prompt 之前提取准确的文档片段。

### 1. 增加上下文深度

调整 `contextLimit` 以控制传递给模型的 Markdown 片段数量：

```json
{
  "plugins": {
    "ai": {
      "contextLimit": 8
    }
  }
}
```

较高的 `contextLimit` 值可提高跨多页复杂问题的回答准确度，但会增加 prompt token 消耗。

### 2. 防止 Bot 滥用

通过配置滑动窗口速率限制或启用内置的 Proof-of-Work CAPTCHA 验证，防止自动化脚本滥用：

```json
{
  "plugins": {
    "ai": {
      "captcha": true,
      "rateLimit": {
        "maxRequests": 10,
        "windowMs": 60000
      }
    }
  }
}
```

## 本地 LLM 部署 (Ollama)

对于隔离环境或本地测试，可配置 `@docmd/plugin-ai` 指向本地 Ollama 实例：

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "provider": "ollama",
      "model": "llama3.2:3b",
      "baseUrl": "http://localhost:11434"
    }
  }
}
```

在构建或启动 docmd 之前，请确保 Ollama 已在本地运行 (`ollama serve`)。

::: callout info "主题集成" icon:palette
AI 助手的悬浮触发按钮和毛玻璃抽屉会自动适应你当前的主题外观（浅色或深色模式），并适配菜单栏布局边界。
:::
