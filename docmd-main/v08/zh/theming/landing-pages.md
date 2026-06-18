---
title: "设计自定义登录页 (Landing Page)"
description: "如何借助 docmd 的 Hero 与 Grid 容器，为您的文档打造高质量的登录页。"
---

## 问题

在大多数文档生成器中，`index.md` 默认看起来就是一篇普通的技术页面。要做出有冲击力、可对标营销质量的登录页，通常需要引入额外的 Web 框架（如 Next.js 或 Astro），这会让文档工作流变得复杂。

## 为什么重要

您的文档首页往往是开发者与产品的第一次接触。一份千篇一律、由 Markdown 直接渲染的页面，难以让人对项目质量产生信心。一个定制的登录页能把用户引导到重点章节，同时强化品牌视觉。

## 方法

docmd 提供了专门的 [Hero](../../content/containers/hero.md) 与 [Grid](../../content/containers/grids.md) 容器，正是为打造高质量登录页而生。若您希望拥有完全创作自由，可在 frontmatter 中使用 `noStyle` 属性，完整接管页面的 HTML 与样式。

## 实现

### 1. 使用 Hero 容器

`hero` 容器支持多种布局，例如 `split`（左右并排）与 `glow`（现代感光效）。

```markdown
::: hero layout:split glow:true
# 用 docmd 构建得更快
面向现代开发团队的零配置文档引擎。

[立即开始](/docs/start) [在 GitHub 上查看](https://github.com/docmd-io/docmd)

== side
![Dashboard 预览](../../static/img/hero-preview.png)
:::
```

### 2. 用 Grid 组织内容

使用 [Grid 与 Card](../../content/containers/grids.md) 构建高层级的导航分区，让用户快速找到所需内容。

```markdown
::: grids
::: grid
::: card "快速开始" icon:rocket
5 分钟内即可上手。
[了解更多](/docs/start.md)
:::
:::
::: grid
::: card "API 参考" icon:code
覆盖全部端点的完整文档。
[浏览 API](/api)
:::
:::
:::
```

### 3. 通过 noStyle 完全自定义

如果您需要彻底摆脱默认文档布局（无侧边栏、无顶栏），可在 [页面 Frontmatter](../../content/frontmatter.md) 中使用 `noStyle` 属性。

```yaml
---
title: "自定义 Dashboard"
noStyle: true
---
```
当 `noStyle: true` 时，docmd 只会渲染您提供的原始 HTML/Markdown。这让您可以注入自己的 CSS 与 JavaScript，实现像素级精准的体验。

## 取舍

使用 `noStyle: true` 意味着您将失去 docmd 原生的导航、搜索以及主题切换能力。您需要自行保证自定义页面在移动端的响应式表现与无障碍合规。对大多数场景来说，结合 `hero` 与 `grid` 容器，已能在美观与功能之间取得最佳平衡。
