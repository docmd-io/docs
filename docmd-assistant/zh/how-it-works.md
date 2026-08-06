---
title: "引擎架构"
description: "docmd-assistant 引擎架构、执行管道与事件模型的技术解析。"
---

`docmd-assistant` 作为一个解耦的 Headless 执行引擎运行。它将对话状态管理、系统 Prompt 合成、多模型通信与客户端工具执行分离，独立于用户界面渲染。

## 架构概览

```
                                ┌─────────────────────────────┐
                                │          应用层             │
                                │ (React, Vue, CLI, Custom UI)│
                                └──────────────┬──────────────┘
                                               │ sendMessage()
                                               ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                  DocmdAssistantEngine                                  │
│                                                                                        │
│  ┌───────────────────────┐   ┌───────────────────────┐   ┌──────────────────────────┐  │
│  │     历史记录状态       │   │    系统 Prompt 管理器 │   │        工具注册表        │  │
│  └───────────────────────┘   └───────────────────────┘   └──────────────────────────┘  │
│                                                                                        │
│                               对话轮次处理管道                                         │
└────────────────────────────────────────┬───────────────────────────────────────────────┘
                                         │
                    ┌────────────────────┴────────────────────┐
                    │                                         │
                    ▼                                         ▼
        ┌────────────────────────┐             ┌────────────────────────┐
        │        直接模式        │             │        中继模式        │
        │  (aiplug LLM Adapter)  │             │   (Cloud Relay API)    │
        └────────────────────────┘             └────────────────────────┘
```

## 对话轮次步骤

当调用 `sendMessage(text)` 时，引擎按以下五个步骤处理对话轮次：

::: steps

### 第 1 步  -  用户消息接收

输入的字符串被追加到内部历史记录中作为用户消息，并触发一个 `'message'` 事件。

### 第 2 步  -  上下文组装

引擎将当前生效的系统 Prompt、历史消息和已注册的工具定义合并为一个对话 Payload。

### 第 3 步  -  执行路由

- **直接模式**: 如果检测到 `apiKey` 或本地 Provider 设置，`docmd-assistant` 初始化一个 `aiplug` 适配器以直接与 Provider 通信。
- **中继模式**: 如果使用 `relayUrl` 或 `endpoint`，引擎将包含用户查询、页面 URL、页面标题和对话历史记录的 JSON Payload 以 POST 方式发送到中继端点。

### 第 4 步  -  工具执行循环

如果模型返回一个工具调用请求（例如 `search_documentation`），`docmd-assistant` 执行已注册的工具处理函数，触发 `'tool_call'` 和 `'tool_result'` 事件，并将结果传回以完成对话轮次。

### 第 5 步  -  响应发送

助手的回复文本追加到历史记录中作为助手消息，并由 `'message'` 事件总线触发。

:::

## 事件总线参考

`docmd-assistant` 包含一个内置的事件总线。使用 `on(event, listener)` 附加监听器：

| 事件类型 | 触发时机 | 数据 Payload 模式 |
| :--------- | :------------- | :------------------ |
| `'message'` | 用户或助手消息追加到历史记录时 | `ChatMessage` 对象 |
| `'tool_call'` | 引擎开始执行工具时 | `{ name: string, args: any }` |
| `'tool_result'`| 工具处理函数完成执行时 | `{ name: string, args: any, result: any }` |
| `'error'` | 发生错误或中继失败时 | 错误对象或详细信息 |
| `'clear'` | 对话历史记录重置时 | `null` |

```typescript
// 订阅引擎事件
assistant.on('message', (event) => {
  console.log(`来自 ${event.data.sender} 的消息:`, event.data.content);
});

assistant.on('tool_result', (event) => {
  console.log(`工具 ${event.data.name} 返回结果:`, event.data.result);
});
```

## 中继模式下发送的上下文数据

在中继模式下运行时，`docmd-assistant` 自动捕获并在每个请求中包含浏览器上下文详细信息：

```json
{
  "projectId": "prj_my_docs_site",
  "siteId": "prj_my_docs_site",
  "message": "如何配置搜索？",
  "pageUrl": "https://docs.example.com/setup",
  "pageTitle": "安装与配置",
  "history": [
    { "sender": "user", "text": "你好" },
    { "sender": "assistant", "text": "你好！今天有什么我可以帮你的吗？" }
  ],
  "systemPrompt": "你是 docmd 助手...",
  "reasoning": false
}
```

::: callout info "自动页面上下文"
捕获 `pageUrl` 和 `pageTitle` 允许服务端中继提供针对特定页面的解答，无需在客户端应用中进行手动上下文配置。
:::

## 错误处理与降级机制

引擎可以优雅地捕获网络错误、身份验证失败和工具执行异常：

- **工具执行错误**: 被捕获并通过 `'error'` 触发，不会导致对话进程崩溃。错误对象被返回给模型上下文，以便助手可以解释问题或使用替代参数重试。
- **中继错误**: 干净地处理，并通过 `'error'` 触发包含详细信息的错误消息。
- **未配置的中继状态**: 如果云端中继返回 `{ unconfigured: true }`，引擎返回一个带有 `unconfigured: true` 的结构化 `ChatResponse` 对象，允许客户端 UI 显示引导式的配置说明。
