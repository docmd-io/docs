---
title: "Browser API（客户端）"
description: "在浏览器中与 docmd 交互 —— 实时编译与 dev 模式下的插件通信。"
---

docmd 提供两类浏览器 API：**同构编译引擎 (isomorphic compile engine)** 用于在浏览器中渲染 Markdown，**dev 模式插件 API** 用于与 dev 服务器进行实时通信。

## 同构编译引擎

在 Node.js 中生成静态站点的引擎，同样可以完全运行在浏览器里。这非常适合构建 CMS 预览、交互式 playground，或把文档嵌入到其他页面。

### 通过 CDN 安装

```html
<!-- 核心样式 -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- 同构引擎 -->
<script src="https://unpkg.com/@docmd/live/public/docmd-live.js"></script>
```

### `docmd.compile(markdown, config)`

使用 docmd 默认布局，把原始 Markdown 编译成完整的 HTML 文档字符串。

**参数：**
- `markdown` (String)：原始 Markdown 内容。
- `config` (Object)：配置覆盖项（与 `docmd.config.json` 同 schema）。

**返回值：** `Promise<String>`：完整的 HTML 文档。

### 示例：实时预览

为保证样式隔离，请通过 `srcdoc` 属性在 `<iframe>` 内渲染输出。

```javascript
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

async function updatePreview() {
  const html = await docmd.compile(editor.value, {
    "title": "预览",
    "theme": { "appearance": "light" }
  });
  preview.srcdoc = html;
}

editor.addEventListener("input", updatePreview);
```

## dev 模式插件 API

运行 `npx @docmd/core dev` 时，会自动向每个页面注入一个 `window.docmd` 全局变量。该 API 通过 WebSocket RPC，让浏览器端的插件代码可以与服务器端的 action 处理器进行实时通信。

::: callout info "仅在 dev 模式下可用" icon:code
下面列出的插件 API 方法仅在 `npx @docmd/core dev` 运行时可用，不会包含在生产构建中。
:::

### `docmd.call(action, payload)`

调用一个由插件注册的服务器端 action 处理器。返回一个 Promise，最终 resolve 为该 handler 的返回值。

```javascript
const threads = await docmd.call("threads:get-threads", {
  "file": "docs/getting-started.md"
});
console.log(threads);
```

如果该 action 会修改源文件，Promise resolve 后页面会自动重新加载。

### `docmd.send(name, data)`

向服务器发送一个"即发即弃"的事件。不会有任何响应返回。

```javascript
docmd.send("analytics:page-view", {
  "path": window.location.pathname
});
```

### `docmd.on(name, callback)`

订阅服务器推送的事件。返回一个取消订阅的函数。

```javascript
const unsub = docmd.on("threads:updated", (data) => {
  console.log("Threads 已更新：", data);
});

unsub();
```

### `docmd.afterReload(name, callback)`

声明一个在页面重新加载后运行的处理器。如果使用 `scheduleReload` 暂存了上下文，处理器会收到它。

```javascript
// 在 live-reload 后恢复滚动位置
docmd.afterReload('scroll-restore', (ctx) => {
  window.scrollTo(0, ctx.scrollY);
});
```

### `docmd.scheduleReload(name, context)`

把上下文存入 `sessionStorage`，绑定到具名 `afterReload` 处理器。下次页面重新加载时，对应的处理器会带着这份上下文被触发。

```javascript
docmd.scheduleReload("scroll-restore", {
  "scrollY": window.scrollY
});
```

## 注意事项

- **没有文件系统**：浏览器端引擎无法扫描目录。如果您需要侧边栏，必须在 config 对象中显式提供 `navigation` 数组。
- **仅 Node 可用的插件**：依赖 Node.js API 的插件（如 Sitemap 或 LLM 文本生成）在浏览器环境中会被禁用。
- **WebSocket 连接**：dev 模式 API 需要与 dev 服务器保持一条活跃的 WebSocket 连接；连接断开时会按指数退避自动重连。