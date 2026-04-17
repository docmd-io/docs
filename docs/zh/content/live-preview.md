---
title: "实时预览"
description: "使用 Live 架构在浏览器中无需后端服务器即可运行 docmd。"
---

`docmd` 采用模块化架构，将文件系统操作与核心处理逻辑分离。这使得文档引擎能够**完全在浏览器中运行**，无需 Node.js 后端即可实现实时编辑器和 CMS 预览。

::: button "打开实时编辑器" https://live.docmd.io

## 实时编辑器

内置实时编辑器提供高性能的双屏界面。在左侧编辑 Markdown，右侧即时预览渲染结果并实时同步。

### 本地运行

在项目中本地启动实时编辑器：

```bash
docmd live
```

### 静态分发

生成独立静态版本的编辑器，可以托管到 Vercel 或 GitHub Pages：

```bash
docmd live --build-only
```

这将生成一个 `dist/` 目录，包含 `index.html` 入口和打包好的 `docmd-live.js` 同构引擎。

## 嵌入 docmd

准备好资源后，就可以将浏览器兼容包集成到自己的应用中。

### 1. 引入资源

将所需 CSS 和 JavaScript 包引入到页面：

```html
<link rel="stylesheet" href="/assets/css/docmd-main.css">
<script src="/docmd-live.js"></script>
```

### 2. 同构 API

全局 `docmd` 对象提供 `compile` 方法实现即时渲染。

```javascript
const html = await docmd.compile(markdown, {
  siteTitle: '动态预览',
  theme: { appearance: 'dark' }
});

// 注入 iframe 实现样式隔离
document.getElementById('preview-frame').srcdoc = html;
```

::: callout tip "AI 反馈回路"
Live 架构非常适合构建 **AI Agent 沙笻**。无需将文件系统写入权限授予 Agent，只需将 AI 建议的文档更改传入实时编译缓冲区。这样就可以在提交仓库之前在「幽灵」环境中目视化验证 AI 建议。
:::