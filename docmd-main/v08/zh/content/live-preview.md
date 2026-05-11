---
title: "实时预览 (Live Preview)"
description: "将 docmd 渲染引擎集成到你自己的 Web 界面中，以实现即时、在浏览器中进行的文档预览。"
---

`docmd` 实时预览架构允许你将生产级的 Markdown 渲染引擎直接引入到自定义编辑器、CMS 仪表板或基于 Web 的 IDE 中。

### 1. 资源集成

从你的资源目录或 CDN 中包含所需的 CSS 和 JavaScript 捆绑包：

```html
<link rel="stylesheet" href="/assets/css/docmd-main.css">
<script src="/docmd-live.js"></script>
```

### 2. 同构 API

全局 `docmd` 对象提供了用于瞬时渲染的 `compile` 方法。

```javascript
const html = await docmd.compile(markdown, {
  siteTitle: 'Dynamic Preview',
  theme: { appearance: 'dark' }
});

// 注入到 iframe 中以实现样式隔离
document.getElementById('preview-frame').srcdoc = html;
```

::: callout tip "AI 反馈循环"
实时架构是构建 **AI 代理沙箱 (AI-Agent Sandboxes)** 的理想选择。你可以将 AI 建议的文档更改通过管道传输到实时编译缓冲区，而不是直接授予代理文件系统写入权限。这允许你在将更改提交到存储库之前，在“影子”环境中直观地验证 AI 的建议。
:::