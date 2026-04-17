---
title: "浏览器 API（客户端）"
description: "在浏览器中与 docmd 交互——实时编译与开发模式插件通信。"
---

`docmd` 提供两类浏览器 API：用于在浏览器中渲染 Markdown 的**同构编译引擎**，以及用于与开发服务器实时通信的**开发模式插件 API**。

## 同构编译引擎

在 Node.js 中生成静态站点的同一引擎可完全在浏览器中运行。非常适合构建 CMS 预览、交互式演示场，或将文档嵌入现有 Web 应用。

### 通过 CDN 安装

```html
<!-- 核心样式 -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- 同构引擎 -->
<script src="https://unpkg.com/@docmd/live/dist/docmd-live.js"></script>
```

### `docmd.compile(markdown, config)`

使用默认的 `docmd` 布局将原始 Markdown 编译为完整的 HTML 文档字符串。

**参数：**
- `markdown`（String）：原始 Markdown 内容。
- `config`（Object）：配置覆盖（与 `docmd.config.js` 使用相同的 schema）。

**返回值：** `Promise<String>`：完整的 HTML 文档。

### 示例：实时预览

为确保样式隔离，建议通过 `srcdoc` 属性在 `<iframe>` 内渲染输出。

```javascript
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

async function updatePreview() {
  const html = await docmd.compile(editor.value, {
    title: '预览',
    theme: { appearance: 'light' }
  });
  preview.srcdoc = html;
}

editor.addEventListener('input', updatePreview);
```

## 开发模式插件 API

在 `docmd dev` 运行期间，`window.docmd` 全局对象会自动注入每个页面。该 API 通过 WebSocket RPC 实现浏览器端插件代码与服务器端动作处理程序的实时通信。

::: callout info "仅限开发模式"
以下插件 API 方法仅在 `docmd dev` 期间可用，不包含在生产构建中。
:::

### `docmd.call(action, payload)`

调用插件注册的服务器端动作处理程序。返回一个 Promise，其值为处理程序的返回值。

```javascript
// 调用插件动作并获取结果
const threads = await docmd.call('threads:get-threads', {
  file: 'docs/getting-started.md'
});
console.log(threads); // 线程对象数组
```

如果动作修改了源文件，Promise 完成后页面将自动重载。

### `docmd.send(name, data)`

向服务器发送即发即忘事件，不返回响应。

```javascript
// 通知服务器页面浏览（不期待响应）
docmd.send('analytics:page-view', {
  path: window.location.pathname
});
```

### `docmd.on(name, callback)`

订阅服务器推送事件。返回取消订阅函数。

```javascript
// 监听服务器广播事件
const unsub = docmd.on('threads:updated', (data) => {
  console.log('线程已更新：', data);
});

// 稍后取消订阅
unsub();
```

### `docmd.afterReload(name, callback)`

声明页面重载后运行的处理程序。如果使用 `scheduleReload` 存储了上下文，回调将接收到该上下文。

```javascript
// 在实时重载后恢复滚动位置
docmd.afterReload('scroll-restore', (ctx) => {
  window.scrollTo(0, ctx.scrollY);
});
```

### `docmd.scheduleReload(name, context)`

将上下文存储到 `sessionStorage` 中，供命名的 `afterReload` 处理程序使用。在下次页面重载后，匹配的处理程序将以此上下文触发。

```javascript
// 在文件编辑触发重载之前，保存状态
docmd.scheduleReload('scroll-restore', {
  scrollY: window.scrollY
});
```

## 注意事项

- **WebSocket 连接**：开发模式 API 需要与开发服务器保持活跃的 WebSocket 连接。如果连接断开，将以指数退避方式自动重连。
