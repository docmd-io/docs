---
title: "Frontmatter 参考"
description: "docmd 中页面级元数据与配置的完整指南。"
---

Frontmatter 允许你在单个页面上覆盖全局设置。它心须写在 Markdown 文件最顶部，以 YAML 格式编写。

## 核心元数据

| 键名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `title` | `String` | **必填。** 设置 HTML `<title>` 和页面主标题。 |
| `description` | `String` | SEO 和搜索结果的元描述。 |
| `keywords` | `Array` | `<meta name="keywords">` 标签的关键词列表。 |


::: callout warning "标题很重要"
虽然并非必填，但强烈建议填写 `title`。如果缺失，docmd 会回退到第一个 `# H1` 标题或文件名作为标题，可能产生不理想的 `<title>` 标签和搜索结果。
:::


## 显示与索引

| 键名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `noindex` | `Boolean` | 将该页面排除在内部搜索索引之外。 |
| `llms` | `Boolean` | 设为 `false` 可将该页面排除在 AI 上下文文件（`llms.txt`）之外。 |
| `hideTitle` | `Boolean` | 隐藏固定头部中的标题（当使用自定义 H1 时很有用）。 |
| `bodyClass` | `String` | 为该页面的 `<body>` 标签添加自定义 CSS 类。 |

## 布局控制

| 键 | 类型 | 说明 |
| :--- | :--- | :--- |
| `layout` | `String` | 设为 `full` 使用主内容宽度并隐藏目录侧边栏。 |
| `toc` | `Boolean` | 设为 `false` 完全禁用目录。 |
| `noStyle` | `Boolean` | 为自定义页面禁用整个 `docmd` UI（侧边栏、Header、Footer）。 |

### `noStyle` 组件控制

`noStyle: true` 启用时，必须显式选择要保留的组件：

```yaml
---
noStyle: true
components:
  meta: true      # 注入 SEO 元数据
  favicon: true   # 注入站点 favicon
  css: true       # 注入 docmd-main.css
  theme: true     # 注入主题特定样式
  highlight: true # 注入语法高亮
  scripts: true   # 注入 SPA 路由器逻辑
  sidebar: true   # 注入导航侧边栏
  footer: true    # 注入站点页脚
---
```

## 插件覆盖

### SEO（`seo`）
*   `image`：页面的自定义社交分享图片 URL。
*   `aiBots`：设为 `false` 可阻止 AI 爬虫访问此页面。
*   `canonicalUrl`：为 SEO 设置自定义规范链接。
