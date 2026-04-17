---
title: "实用技巧：设计自定义落地页"
description: "掌握 noStyle 模式，打造高影响力的营销页面和产品展示页。"
---

`docmd` 擅长结构化技术文档，但你也可以轻松绕过默认 UI 逻辑，使用**无样式页面**创建定制落地页、产品展示页或营销起始页。

## 架构概念

在页面的 frontmatter 中激活 `noStyle: true` 后，引擎会移除标准侧边栏、头部和默认 CSS 框架，提供一块「空白画布」，同时保留文档引擎的 SEO 元标签和 Markdown 解析能力。

## 实现工作流程

在 `docs/index.md` 创建或修改项目根入口。

```html
---
title: "下一代文档"
description: "零配置、同构、AI 下一代文档引擎。"
noStyle: true
components:
  meta: true      # 保留结构化 SEO 和 OpenGraph 标签
  favicon: true   # 保留项目品牌
  scripts: false  # 此页面退出默认 SPA 路由器
customHead: |
  <style>
    body { font-family: 'Inter', sans-serif; margin: 0; background: #000; color: #fff; }
    .hero { height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .btn { background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
  </style>
---

<div class="hero">
  <h1>架构与文档的完美结合。</h1>
  <p>同构执行。AI 优化上下文。零刷新导航。</p>
  <br>
  <a href="/getting-started/" class="btn">进入文档 →</a>
</div>

<div class="feature-grid">
   <!-- 在此嵌入自定义落地页 HTML 或专用 Markdown 卡片 -->
</div>
```

## 技术效果

通过 `docmd build` 编译项目后，根目录 `index.html` 将渲染为一个定制落地页，作为高层次入口无缝引导用户进入标准化文档环境。