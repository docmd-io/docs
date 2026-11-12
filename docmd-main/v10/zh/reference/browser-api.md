---
title: "浏览器 API"
description: "docmd 的客户端 API - 同构渲染引擎与开发模式 WebSocket 插件通信。"
---

docmd 暴露了两个客户端 API：用于在浏览器上下文中渲染 Markdown 的 **同构编译引擎**，以及用于与本地开发服务器通信的 **开发模式插件 API**。

## 同构编译引擎

Markdown 渲染引擎可以在浏览器环境中无缝运行。可以使用它构建实时编辑器预览、交互式 Playground 或嵌入式文档小工具。

### CDN 集成

```html
<!-- 主主题样式表 -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- 同构渲染引擎 -->
<script src="https://unpkg.com/@docmd/live/public/docmd-live.js"></script>
```

### `docmd.compile(markdown, config)`

使用 docmd 页面模板将原始 Markdown 编译为完整的 HTML 文档。

* **`markdown`** (`string`): 原始 Markdown 源码文本。
* **`config`** (`object`): 配置覆盖（匹配 `docmd.config.json` 架构）。
* **返回值**: 解析为编译后 HTML 文档的 `Promise<string>`。

### 实时预览实现示例

使用 `srcdoc` 在 `<iframe>` 元素内部渲染输出，以保证完全的样式隔离：

```javascript
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

async function updatePreview() {
  const html = await docmd.compile(editor.value, {
    title: "预览",
    theme: { appearance: "light" }
  });
  preview.srcdoc = html;
}

editor.addEventListener("input", updatePreview);
```

## 开发模式插件 API

在执行 `npx @docmd/core dev` 期间，全局 `window.docmd` 对象会被注入到服务页面中。该接口允许浏览器端插件组件通过 WebSocket RPC 与服务端 action handler 通信。

::: callout info "仅限开发模式" icon:code
开发模式插件 API 仅在 `npx @docmd/core dev` 会话期间可用，在生产构建中会被省略。
:::

### `docmd.call(action, payload)`

向由插件注册的服务端 action handler 发送 RPC 调用。返回解析为 handler 输出的 Promise：

```javascript
const threads = await docmd.call("threads:get-threads", {
  file: "docs/getting-started.md"
});
console.log(threads);
```

### `docmd.send(name, data)`

向开发服务器传输即发即弃 (fire-and-forget) 的事件，无需等待响应：

```javascript
docmd.send("analytics:page-view", {
  path: window.location.pathname
});
```

### `docmd.on(name, callback)`

订阅服务端推送的 WebSocket 事件。返回一个取消订阅函数：

```javascript
const unsubscribe = docmd.on("threads:updated", (data) => {
  console.log("Threads 已更新:", data);
});

unsubscribe();
```

### 热重载状态持久化

```javascript
// 热重载前保存上下文
docmd.scheduleReload("scroll-restore", {
  scrollY: window.scrollY
});

// 重载后恢复上下文
docmd.afterReload("scroll-restore", (ctx) => {
  window.scrollTo(0, ctx.scrollY);
});
```
