---
title: "AI 助手插件"
description: "基于 aiplug 多提供者集成的交互式、感知搜索的 AI 文档助手。"
---

`@docmd/plugin-ai` 插件为您的文档网站带来全新的交互式 AI 助手。它利用 `@docmd/plugin-search` 预编译的索引执行检索增强生成 (RAG)，精确定位相关文档章节，输出带有可点击来源引用的上下文回答。

## 核心功能

* **悬浮触发器与玻璃拟物抽屉**: 极简胶囊触发器（`⌘K` 快捷键），可展开为感知主题的聊天面板。
* **搜索感知 RAG**: 查询预构建的 `search-index.json` 数据，将 LLM 响应直接基于您站点的文档内容进行锚定。
* **免费 docmd Cloud 中继**: 零后端服务器开销，可直接部署在静态托管平台（GitHub Pages、Cloudflare Pages、Netlify、Vercel 等）。
* **BYOK 服务端与 KMS 安全**: API 密钥在 docmd Cloud 中通过硬件安全模块 (KMS) 加密存储，或仅在服务端环境变量中解析，确保客户端 Web 包中零凭证暴露。
* **多提供商集成**: 由 `aiplug` 提供支持，原生支持 OpenAI、Anthropic、Gemini、DeepSeek、Groq 和本地 Ollama 实例。
* **主题中立性**: 完美适配所有内置与自定义主题模式下的浅色与深色主题。

## 配置选项

在 `docmd.config.json` 中配置助手选项：

### 选项 A：免费 docmd Cloud 中继（静态站点推荐）

针对部署在 GitHub Pages、Cloudflare Pages、Netlify、Vercel 或 S3 的静态文档，通过 `projectId` 连接 docmd 免费 Cloud 中继服务：

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "assistant": true,
      "projectId": "docmd_aiv77jc8ms8qtpvd",
      "position": "bottom-center",
      "greeting": "今天有什么可以帮您解答的吗？",
      "placeholder": "输入关于文档的问题...",
      "suggestions": [
        "如何快速开始？",
        "查看配置选项说明",
        "解释核心概念"
      ]
    }
  }
}
```

### 选项 B：自托管服务器（BYOK 环境变量）

若以 Node.js 服务器或 Docker 容器运行 docmd，可直接配置提供商与模型：

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
| `projectId` | `string` | `undefined` | 来自 [docmd Cloud](https://cloud.docmd.io) 的项目 ID，用于静态站点免后端中继。 |
| `cloud` | `object` | `undefined` | 云中继配置对象（如 `{ "projectId": "docmd_ai..." }`）。 |
| `endpoint` | `string` | `'https://api.docmd.io/v1/ai/chat'`（配置了 `projectId` 时） | 自定义 AI 聊天中继接口地址。 |
| `captcha` | `boolean` | `false` | 开启开源 Proof-of-Work 人机验证防刷机制。 |
| `provider` | `string` | `'openai'` | 自托管服务器的 LLM 提供商（`'openai'`、`'anthropic'`、`'gemini'`、`'deepseek'`、`'groq'`、`'ollama'`）。 |
| `model` | `string` | 提供商默认 | 具体模型标识符（例如 `gpt-4o-mini`、`claude-3-5-haiku-20241022`）。 |
| `position` | `string` | `'bottom-center'` | 悬浮胶囊触发器的屏幕位置（`'bottom-center'`、`'bottom-right'`、`'bottom-left'`）。 |
| `greeting` | `string` | `'今天有什么可以帮您解答的吗？'` | 聊天面板内的初始欢迎语。 |
| `placeholder` | `string` | `'输入关于文档的问题...'` | 聊天输入框占位符文本。 |
| `suggestions` | `string[]` | 默认问题列表 | 推荐的快捷提示按钮。 |
| `contextLimit` | `number` | `5` | 传入 LLM 上下文窗口的最大 RAG 文档切片数量。 |
| `rateLimit` | `object` | `{ maxRequests: 10, windowMs: 60000 }` | 滑动窗口速率限制，保护 LLM 模型免受 API 过度使用。 |

## 免费 docmd Cloud 中继配置指南

如果您的文档作为静态页面托管在 GitHub Pages、Cloudflare Pages、Netlify 或 Vercel，无需额外搭建后端服务器。docmd 在 [cloud.docmd.io](https://cloud.docmd.io) 提供免费的 Cloud Relay 服务：

1. **创建账号与项目**: 访问 [cloud.docmd.io](https://cloud.docmd.io) 登录并创建新项目。
2. **设置关联域名**: 在**项目设置 (Project Configuration)**中填写您的文档域名（如 `docs.mycompany.com`）。只有来自该域名的请求才会被授权调用中继。
3. **启用本地测试 (本地开发)**: 在本地预览调试时，勾选**启用本地测试 (127.0.0.1 / localhost)**。在公开发布生产环境前请注意按需关闭。
4. **配置模型与 BYOK 密钥**: 在**模型与 BYOK 密钥配置 (Model & BYOK Key Setup)**中，选择 AI 提供商（OpenAI、Anthropic、Gemini、Groq、DeepSeek 等），输入模型名称与 API Key，点击**测试连接 (Test Connection)**，成功后点击**保存密钥与配置**。密钥在云端采用 KMS 硬件加密保存，不会暴露给浏览器。
5. **在配置文件中添加 Project ID**: 进入**集成 (Integration)**选项卡，复制 `projectId` 代码片段并粘贴到 `docmd.config.json`：
   ```json
   {
     "plugins": {
       "ai": {
         "assistant": true,
         "projectId": "docmd_aiv77jc8ms8qtpvd"
       }
     }
   }
   ```

## 服务端安全（自托管 BYOK）

::: callout warning title:"零凭证泄漏" icon:alert-triangle
`@docmd/plugin-ai` 严格在服务端或通过 docmd Cloud 的 KMS 加密中继处理 API 凭证。提供商 API 密钥绝不会渲染在客户端 HTML 或静态 JavaScript 包中。
::: /callout

以 Node.js 服务器模式运行时，在启动文档服务器前设置提供商环境变量：

```bash
export OPENAI_API_KEY="sk-..."
# 或
export ANTHROPIC_API_KEY="sk-ant-..."
# 或通用备用变量
export AI_API_KEY="your-api-key"
```

## 架构执行流程

1. **构建期 Action 注册**: 在站点编译期间，`@docmd/plugin-ai` 注册服务端 RPC Action 处理程序 (`ai:chat`) 或注入携带 `projectId` 的 Cloud 中继客户端。
2. **检索增强生成 (RAG)**: 当读者提交提问时：
   - 客户端查询由 `@docmd/plugin-search` 编译的搜索索引或通过 MCP 工具读取上下文。
   - 根据向量/关键词距离选择匹配的文档标题和段落文本切片。
   - 相关切片与工具调用结果传递给中继或服务端接口。
3. **提供商处理与引用**: 请求安全路由至指定模型。输出的响应实时流式返回，并包含指向引用文档锚点的 Markdown 链接。
