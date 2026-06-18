---
title: "docmd : 自定义无样式页面演示"
description: "noStyle 架构功能的功能演示。"
noStyle: true
components:
  meta: true
  favicon: true
  css: true
  theme: true
  scripts: true
  mainScripts: true
copyCode: true
customHead: |
  <style>
    body {
      font-family: 'Inter', -apple-system, system-ui, sans-serif;
      margin: 0;
      padding: 0;
      line-height: 1.6;
      background: var(--bg-primary);
      color: var(--text-primary);
    }
    .demo-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 80px 20px;
    }
    .demo-hero {
      text-align: centre;
      margin-bottom: 60px;
    }
    .demo-hero h1 {
      font-size: 3.5rem;
      margin-bottom: 20px;
      color: var(--brand-primary, #4a6cf7);
    }
    .demo-hero p {
      font-size: 1.25rem;
      color: var(--text-secondary);
    }
    .demo-card {
      background: var(--bg-secondary, #f8f9fa);
      padding: 40px;
      border-radius: 16px;
      border: 1px solid var(--border-colour);
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    }
    .demo-button {
      display: inline-block;
      padding: 14px 28px;
      background-color: var(--brand-primary, #4a6cf7);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin-top: 30px;
      transition: filter 0.2s ease;
    }
    .demo-button:hover {
      filter: brightness(1.1);
    }
  </style>
---

<div class="demo-container">
  <div class="demo-hero">
    <h1>自定义页面架构</h1>
    <p>展示通过 <code>noStyle: true</code> 实现的绝对布局控制能力。</p>
  </div>

  <div class="demo-card">
    <h2>逻辑基础</h2>
    <p>
      本演示利用 <code>noStyle: true</code> frontmatter 指令绕过全局文档布局（侧边栏、页头和目录）。这为创建营销落地页或自定义产品仪表板提供了"零摩擦"的画布。
    </p>

    <h3>已启用的系统组件</h3>
    <p>在 No-Style 模式下，您可以明确选择启用文档引擎的核心功能：</p>

    <ul>
      <li><strong>SEO 元数据引擎</strong>：保留结构化标签和社交图谱数据。</li>
      <li><strong>项目品牌</strong>：全局 favicon 注入保持激活。</li>
      <li><strong>基础排版</strong>：处理过的 <code>docmd-main.css</code> 提供基础样式。</li>
      <li><strong>主题同步</strong>：亮色/暗色模式状态完全保留。</li>
      <li><strong>交互能力</strong>：SPA 路由和组件逻辑仍然可用。</li>
    </ul>

    <h3>技术实现</h3>
    <p>
      此页面的布局使用标准 HTML 包装器和 <code>customHead</code> frontmatter 字段内定义的作用域 CSS 编写。这确保了零 CSS 泄漏到文档站点的其他部分。
    </p>

    <a href="/content/no-style-pages/" class="demo-button">查看实现指南 →</a>
  </div>
</div>
