---
title: "实时预览"
description: "使用 Live 架构完全在浏览器中运行渲染引擎，无需后端服务器。"
---

编译器采用模块化架构，将文件系统操作与核心逻辑分离。这使得引擎能够完全在浏览器中运行，无需 Node.js 后端即可轻松实现实时编辑器和 CMS 预览。

<img width="720" class="with-border" src="/assets/previews/live-editor-preview.webp">

::: button "打开实时编辑器" external:https://live.docmd.io

## 实时编辑器

内置的实时编辑器提供高性能的左右分栏界面。在左栏编写 Markdown，在右栏实时同步查看渲染后的输出。

### 本地运行

在项目中本地启动实时编辑器：

```bash
npx @docmd/core live
```

### 静态部署

生成独立、静态版本的编辑器，并将其托管到 Vercel 或 GitHub Pages 等平台：

```bash
npx @docmd/core live --build-only
```

这会生成一个 `dist/` 目录，其中包含入口文件 `index.html` 和打包后的 `docmd-live.js` 引擎。

## 嵌入 @docmd/core

将兼容浏览器的打包文件集成到你的应用中，提供内置的 Markdown 渲染或预览功能。

### 1. 资源集成

从你的资源目录或 CDN 中包含所需的 CSS 和 JavaScript 文件：

```html
<link rel="stylesheet" href="/assets/css/docmd-main.css">
<script src="/docmd-live.js"></script>
```

### 2. 同构 API

全局 `docmd` 对象提供了用于瞬时渲染的 `compile` 方法。

```javascript
const html = await docmd.compile(markdown, {
  "title": "动态预览",
  "theme": { "appearance": "dark" }
});


document.getElementById("preview-frame").srcdoc = html;
```

::: callout tip "AI 反馈循环" icon:sparkles
实时架构是构建 **AI 代理沙箱** 的理想选择。你可以将代理建议的更改传输到实时编译缓冲区，在将更改提交到仓库之前，直观地验证 AI 的建议。
:::