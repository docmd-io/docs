---
title: "AI 助手配置与集成"
description: "如何配置和部署 docmd 的交互式 AI 助手，以获得 RAG 驱动的文档支持。"
---

docmd AI 助手基于你的 Markdown 文档直接为读者提供实时、上下文感知的解答。由 `@docmd/plugin-ai` 和 `aiplug` 提供支持，该助手利用站点的预编译搜索索引执行检索增强生成 (RAG)，同时在服务端保持 API 密钥的安全。

## 前置条件

在配置 AI 助手之前，请确保：
1. `docmd.config.json` 中已启用 `@docmd/plugin-search`（RAG 上下文提取所必需）。
2. 你拥有首选提供商（OpenAI、Anthropic、Gemini、DeepSeek、Groq 或 Ollama）的 API 密钥。

## 部署架构：选择您的方案

docmd AI 助手支持两种主要的部署架构模式：

| 架构模式 | 适用场景 | 后端基础设施 | API 密钥安全性 |
| :--- | :--- | :--- | :--- |
| **免费 docmd Cloud 中继** | 静态文档站点（GitHub Pages、Cloudflare Pages、Netlify、Vercel、S3） | 零服务器 — 由 docmd 托管的 Serverless 中继驱动 | 云端硬件 KMS 加密存储 |
| **自托管服务器** | 动态 Node.js 应用、Docker 容器、企业内部专网环境 | 开发者自建 Node.js 服务 (`docmd dev` / `docmd serve`) | 服务器系统环境变量 |
| **本地 LLM (Ollama)** | 离线网络、本地研发测试、零云端依赖 | 本地工作站运行 `ollama` | 本地 localhost 端口通信 |

---

## 方案 1：免费 docmd Cloud 中继（零后端基础设施）

对于静态 Jamstack 托管，docmd 提供了免费的 Cloud Relay 平台 [cloud.docmd.io](https://cloud.docmd.io)，可安全代理 AI 交互请求，无需维护 Node.js 后端，也绝不会暴露您的 API 密钥。

### 1. 创建云端项目
1. 访问并登录 [cloud.docmd.io](https://cloud.docmd.io)。
2. 点击 **创建新项目 (Create New Project)**，输入项目名称（如 `开发者文档`），并填写**关联域名地址 (Associated Domain Address)**（如 `docs.mycompany.com`）。
3. 如果在本地电脑开发调试，勾选 **启用本地测试 (127.0.0.1 / localhost)**。

### 2. 配置 BYOK 提供商密钥
1. 在项目控制台中进入 **模型与 BYOK 密钥配置 (Model & BYOK Key Setup)**。
2. 选择您的 AI 提供商（OpenAI、Anthropic、Google Gemini、Groq、DeepSeek 等）。
3. 输入模型名称（如 `gpt-4o-mini`、`claude-3-5-haiku-20241022`、`gemini-1.5-flash`）。
4. 填入您的提供商 API 密钥，点击 **测试连接 (Test Connection)**，成功后点击 **保存密钥与配置**。

### 3. 将 Project ID 添加至 `docmd.config.json`
进入 **集成 (Integration)** 标签页，复制项目配置片段并更新 `docmd.config.json`：

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "indexBody": true
    },
    "ai": {
      "assistant": true,
      "projectId": "docmd_aiv77jc8ms8qtpvd",
      "position": "bottom-center",
      "greeting": "今天有什么可以帮您的？",
      "suggestions": [
        "如何快速开始？",
        "显示配置选项",
        "解释核心概念"
      ]
    }
  }
}
```

随后即可编译并将生成的静态站点发布至任意静态托管环境（GitHub Pages、S3、Cloudflare Pages 等）。客户端助手将自动建立经过域名授权的安全会话。

---

## 方案 2：自托管服务器（环境变量 BYOK）

若在 Node.js 服务器或 Docker 容器内运行 docmd：

### 1. 配置文件

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

### 2. 设置提供商凭据

为防止凭据泄露，提供商 API 密钥仅从服务端的环境变量中读取：

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

启动服务器（`docmd dev` 或 `docmd serve`）。客户端助手抽屉通过安全的 RPC action 处理程序与服务端通信。

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
