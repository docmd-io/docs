---
title: "无样式页面"
description: "通过禁用默认 docmd 主题创建自定义落地页和独特布局。"
---

`docmd` 允许你在单个页面上跳过标准文档布局（侧边栏、头部和页脚）。这非常适合创建产品落地页、自定义仪表盘或运营起始页，同时沉淦使用文档引擎的各种组件。

## 启用无样式模式

在页面的 frontmatter 中添加 `noStyle: true` 即可禁用全局 UI。

```yaml
---
title: "产品展示"
noStyle: true
components:
  meta: true      # 保留 SEO 和 OpenGraph 标签
  favicon: true   # 保留网站图标
  css: true       # 注入 docmd-main.css 用于排版
---

<!-- 原生 HTML 或特殊 Markdown 放在这里 -->
<div class="hero">
  <h1>下一代文档</h1>
  <p>零配置。同构。AI 就绪。</p>
</div>

::: callout info "无限层级嵌套"
即使开启 `noStyle: true`，所有标准 `docmd` 容器（如 `::: card`、`::: tabs`、`::: hero`）仍完全可用，并可以无限深度嵌套。
:::
```

## 组件单独启用

开启 `noStyle` 后，页面从空白画布开始。根据需要选择性地开启核心组件：

| 组件 | 说明 |
| :--- | :--- |
| `meta` | 注入 `<title>`、SEO 元标签和 OpenGraph 结构化数据。 |
| `favicon` | 注入项目全局网站图标。 |
| `css` | 注入 `docmd-main.css`。强烈建议开启，提供基础网格和排版。 |
| `menubar` | 注入网站顶部菜单栏。 |
| `theme` | 注入当前主题的 CSS 变量和外观覆盖。 |
| `scripts` | 注入交互组件逻辑（需要 `mainScripts: true`）。 |
| `spa` | 启用单页应用路由（需要 `scripts: true`）。 |

## 组合式落地页

`noStyle` 的核心优势在于：它允许你将所有 `docmd` 组件使用为在空白画布上的高价值“小插件”。你不局限于原始 HTML，可以纯簹用 Markdown 构建复杂的结构化设计。

### 打造现代入口页

```yaml
---
title: "欢迎使用"
noStyle: true
components:
  meta: true
  css: true
  menubar: true    # 使用网站顶部导航
  scripts: true
  spa: true
---

::: hero
# 下一代文档
沈浸式, 18kb, AI 就绪.
::: button "立马开始" /getting-started/quick-start
:::
```

::: callout tip "AI 辅助布局设计"
`noStyle` 页面同时支持原生 HTML 和 `docmd` 容器，因此非常适合 **AI 驱动的 UI 设计**。你可以提示 AI：*"使用 Tailwind 风格的工具类和 docmd 按钮设计一个现代 hero 区块，封装在 noStyle: true 容器中。"* AI 即可在你的静态网站流水线中快速迭代设计，无需任何额外配置。
:::