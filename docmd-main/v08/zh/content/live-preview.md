---
title: "实时预览"
description: "使用 Live 架构在浏览器中完全运行引擎，无需后端服务器。"
---

编译器将文件系统操作与核心逻辑分离。因此核心引擎可以完全在浏览器中运行，为实时编辑器与 CMS 预览提供支持，无需 Node.js 后端。

<img width="720" class="with-border" src="/assets/previews/live-editor-preview.webp">

::: button "打开 Live 编辑器" external:https://live.docmd.io

## Live 编辑器

内置的 Live 编辑器提供了一个高性能的分屏界面。在左侧面板撰写 Markdown，右侧实时同步渲染输出。

### 本地执行

在项目中本地启动 Live 编辑器：

```bash
npx @docmd/core live
```

### 静态分发

生成编辑器的独立静态版本。可将其托管在 Vercel 或 GitHub Pages 等平台上：

```bash
npx @docmd/core live --build-only
```

这会生成一个 `dist/` 目录。其中包含 `index.html` 入口点和打包好的 `docmd-live.js` 引擎。

## 嵌入 @docmd/core

将浏览器兼容的 bundle 添加到第三方应用，以在客户端渲染 Markdown。

### 1. 资源集成

从您的资源或 CDN 中引入 CSS 与 JavaScript bundle：

```html
<link rel="stylesheet" href="/assets/css/docmd-main.css">
<script src="/docmd-live.js"></script>
```

### 2. 同构 API

全局 `docmd` 对象暴露 `compile` 方法用于即时渲染。

```javascript
const html = await docmd.compile(markdown, {
  "title": "Dynamic Preview",
  "theme": { "appearance": "dark" }
});


document.getElementById("preview-frame").srcdoc = html;
```

::: callout tip "AI 反馈循环" icon:sparkles
Live 架构非常适合构建 **AI 智能体沙盒 (AI-Agent Sandbox)**。将智能体的建议更改传输到实时编译缓冲区，可在将更改提交到仓库之前直观地验证 AI 建议。
:::