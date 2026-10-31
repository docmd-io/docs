---
title: "AI 助手插件"
description: "启用基于搜索与 RAG 的交互式 AI 文档助手，由 aiplug 多模型提供商集成强力驱动。"
---

`@docmd/plugin-ai` 插件为您的文档站点带来交互式 AI 助手抽屉面板。它结合 `@docmd/plugin-search` 预编译索引实现检索增强生成（RAG），按需检索特定文档章节，提供具备可点击源链接的精准上下文解答。

## 核心特性

* **悬浮胶囊与玻璃拟态抽屉**：精致的药丸型触发器（支持 `Ctrl+K` 快捷键），点击展开自适应明暗配色的聊天面板。
* **确定性检索与事实求真**：执行严格的两步检索流程（一次精准搜索，随后完整研读权威单页），并对内部路径与外部 URL 进行实时存在性校验。
* **外部 URL 抓取与云端治理**：在 `docmd.config.json` 开启且经 docmd Cloud 云端策略许可后，可抓取外部 HTTP/HTTPS 参考文档。
* **无感长会话历史压缩**：针对多轮深度对话，在后台无缝精简早期对话轮次，防止超出中继字符阈值。
* **免费 docmd Cloud 静态中继**：无缝部署于 GitHub Pages、Cloudflare Pages、Netlify、Vercel 等静态托管平台，无需自建后端。
* **BYOK 与 KMS 密钥安全**：API 密钥在 docmd Cloud 端使用 KMS 硬件级加密存储，或在自托管服务器端通过环境变量解析，浏览器端 JavaScript 包零凭据暴露。
* **多模型提供商原生接入**：底层由 `aiplug` 驱动，支持 OpenAI、Anthropic、Gemini、DeepSeek、Groq 及本地 Ollama 模型。
* **主题自适应**：原生融入浅色与深色外观，适配所有内置和自定义主题。

## 配置选项

在 `docmd.config.json` 中配置助手参数：

### 方案 A：免费 docmd Cloud 中继（静态托管）

针对静态站点，通过 `projectId` 连接 docmd 免费提供的云中继：

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "assistant": true,
      "projectId": "docmd_aiv77jc8ms8qtpvd",
      "position": "bottom-center",
      "allowExternalUrls": false,
      "greeting": "今天有什么可以帮您解答的吗？",
      "placeholder": "输入关于文档的问题...",
      "suggestions": [
        "如何快速入门？",
        "查看所有配置选项",
        "解释核心概念"
      ]
    }
  }
}
```

### 方案 B：自托管后端（BYOK 环境变量）

当在 Node.js 或 Docker 容器中作为服务运行时：

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "assistant": true,
      "provider": "openai",
      "model": "gpt-4o-mini",
      "position": "bottom-center",
      "allowExternalUrls": false,
      "greeting": "今天有什么可以帮您解答的吗？",
      "placeholder": "输入关于文档的问题...",
      "suggestions": [
        "如何快速入门？",
        "查看所有配置选项",
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
| `allowExternalUrls` | `boolean` | `false` | 允许助手工具执行外部 HTTP/HTTPS 文档 URL 抓取。 |
| `captcha` | `boolean` | `false` | 开启开源 Proof-of-Work 人机验证防刷机制。 |
| `provider` | `string` | `'openai'` | 自托管服务器的 LLM 提供商（`'openai'`、`'anthropic'`、`'gemini'`、`'deepseek'`、`'groq'`、`'ollama'`）。 |
| `model` | `string` | 提供商默认 | 具体模型标识符（例如 `gpt-4o-mini`、`claude-3-5-haiku-20241022`）。 |
| `position` | `string` | `'bottom-center'` | 悬浮胶囊触发器的屏幕位置（`'bottom-center'`、`'bottom-right'`、`'bottom-left'`）。 |
| `greeting` | `string` | `'今天有什么可以帮您...'` | 聊天面板内的初始欢迎语。 |
| `placeholder` | `string` | `'输入关于文档的问题...'` | 聊天输入框占位符文本。 |
| `suggestions` | `string[]` | 默认问题列表 | 推荐的快捷提示按钮。 |
| `contextLimit` | `number` | `5` | 传入 LLM 上下文窗口的最大 RAG 文档切片数量。 |
| `rateLimit` | `object` | `{ maxRequests: 10, windowMs: 60000 }` | 滑动窗口速率限制，保护 LLM 模型免受 API 过度使用。 |

## 外部 URL 抓取与云端权限治理

当文档需要引用外部行业规范、开源协议或关联系统文档时，可在 `docmd.config.json` 中开启外部读取能力：

```json
{
  "plugins": {
    "ai": {
      "allowExternalUrls": true
    }
  }
}
```

### 云端中继优先级规则

::: callout important title:"云端中继安全策略具备绝对优先级" icon:shield
在 docmd Cloud 管理后台配置的安全策略优先级始终高于客户端 `docmd.config.json` 本地设置。
:::

当使用 docmd Cloud 中继服务时，云端策略权威决定是否允许发起外网 HTTP 抓取：

1. 登录 [cloud.docmd.io](https://cloud.docmd.io) 后台。
2. 依次进入 **项目设置 (Project Configuration)** &rarr; **权限与功能 (Permissions & Capabilities)**。
3. 勾选 **允许抓取外部 URL (Allow External URL Fetching)**。
4. 若云端中继未授予该权限，即使本地配置中设置了 `allowExternalUrls: true`，中继依然会拒绝外网请求，确保外联安全。

### 存在性校验与杜绝胡编

助手在引用文档前会严格验证页面可达性。当执行 `read_documentation_page` 时：
* 系统会实时校验目标 Markdown 页面或外部 URL 是否能正常响应。
* 若遇到 404 或资源不存在，助手会如实说明该页面无法访问，坚决避免凭空伪造虚假文档内容。

## 确定性检索流水线与对话压缩机制

为保证极速的首字返回并杜绝无休止的连续工具调用，`@docmd/plugin-ai` 采用了确定性两步流程：

1. **精准检索**：助手先发起一次 `search_documentation` 查询，圈定相关度最高的文档。
2. **权威单页阅读**：直接调用 `read_documentation_page` 研读排在首位的页面。
3. **即时综合回答**：立刻基于该文档内容生成带有可靠代码块和源链接的最终解答，仅在初次阅读确实无法解答提问时才尝试二次查找。

### 无感历史压缩

当连续对话达到 6 轮以上时，助手会在后台自动将早期对话压缩为关键事实摘要。这既避免了超出中继服务器的报文长度限制（如 50,000 字符上限），又完整维系了长篇讨论的上下文记忆。

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
:::

当在 Node.js 服务端运行 docmd 时，启动前设置对应环境变量：

```bash
export OPENAI_API_KEY="sk-..."
# 或
export ANTHROPIC_API_KEY="sk-ant-..."
# 或通用备用变量
export AI_API_KEY="your-api-key"
```

## 架构执行流程

1. **构建期注册**：编译阶段，`@docmd/plugin-ai` 注册 RPC 动作处理函数（`ai:chat`）或注入附带 `projectId` 的云中继客户端脚本。
2. **检索增强生成 (RAG)**：读者提问时，客户端查询搜索索引，匹配关键章节传递给模型。
3. **流式响应**：模型输出实时流式呈现在界面上，附带指向对应文档锚点的 Markdown 链接。
