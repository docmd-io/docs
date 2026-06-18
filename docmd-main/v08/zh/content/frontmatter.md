---
title: "Frontmatter 参考"
description: "页面级元数据与配置的完整指南。"
---

Frontmatter 会针对单个页面覆盖全局设置。在 Markdown 文件顶部以 YAML 格式书写。

## 核心元数据

| 键 | 类型 | 说明 |
| :--- | :--- | :--- |
| `title` | `String` | **必需。** 设置 HTML `<title>` 与主区块标题。 |
| `description` | `String` | 设置用于 SEO 与搜索结果的 meta description。 |
| `keywords` | `Array` | 用于 `<meta name="keywords">` 标签的关键词列表。 |

::: callout warning "标题很重要" icon:triangle-alert
强烈建议设置 `title` 字段。若未设置，引擎会回退到首个 `# H1` 标题或文件名。这可能会产生不够理想的搜索结果。
:::

## 可见性与索引

| 键 | 类型 | 说明 |
| :--- | :--- | :--- |
| `noindex` | `Boolean` | 将该页面排除在内部搜索索引之外。 |
| `llms` | `Boolean` | 设为 `false` 可将该页面排除在 AI 上下文文件（`llms.txt`）之外。 |
| `hideTitle` | `Boolean` | 在粘性页头中隐藏标题。适用于自定义 H1。 |
| `bodyClass` | `String` | 向 `<body>` 标签添加自定义 CSS 类。 |

## 布局控制

| 键 | 类型 | 说明 |
| :--- | :--- | :--- |
| `layout` | `String` | 设为 `full` 以使用最大宽度并隐藏目录侧边栏。 |
| `toc` | `Boolean` | 设为 `false` 完全禁用目录。 |
| `noStyle` | `Boolean` | 禁用整个 UI（侧边栏、页头、页脚），用于自定义页面。 |
| `titleAppend` | `Boolean` | 设为 `false` 以防止将站点标题附加到元数据标签。默认为 `true`。 |

### `noStyle` 组件控制

当 `noStyle: true` 生效时，您必须选择启用希望保留的组件。

```yaml
---
noStyle: true
components:
  meta: true      # 注入 SEO 元数据
  favicon: true   # 注入站点 favicon
  css: true       # 注入 docmd-main.css
  theme: true     # 注入主题特定样式
  highlight: true # 注入语法高亮
  scripts: true   # 注入 SPA 路由逻辑
  sidebar: true   # 注入导航侧边栏
  footer: true    # 注入站点页脚
---
```

## 插件覆盖

### SEO（`seo`）
*   `image`：该页面的自定义社交分享图片 URL。
*   `aiBots`：设为 `false` 以阻止 AI 爬虫访问此页面。
*   `canonicalUrl`：为 SEO 设置自定义规范链接。
