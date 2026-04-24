---
title: "设计自定义落地页"
description: "如何使用 docmd 的 hero 和 grid 容器为您的文档创建高级落地页。"
---

## 问题

默认情况下，大多数文档生成器中的 `index.md` 文件看起来都像一个标准的页面。创建一个具有高冲击力的、营销级的落地页通常需要使用单独的 Web 框架（如 Next.js 或 Astro），这增加了文档工作流的复杂性。

## 为什么重要

您的文档首页通常是开发者与您产品的第一次互动。一个通俗的 Markdown 解析页面可能无法激发用户对您产品精致程度和专业质量的信心。自定义落地页可以更好地引导用户访问最重要的章节，同时强化您品牌的视觉身份。

## 方法

`docmd` 提供了专门的 [Hero](../../content/containers/hero) 和 [网格 (Grid)](../../content/containers/grids-cards) 容器，专门用于构建高级落地页。为了获得完全的创作自由，您还可以使用 `noStyle` Frontmatter 属性来完全控制页面的 HTML 和样式。

## 实施

### 1. 使用 Hero 容器

`hero` 容器支持多种布局，包括 `split`（用于并排内容）和 `glow`（用于现代美学效果）。

```markdown
::: hero layout:split glow:true
# 使用 docmd 更快地构建
面向现代开发团队的零配置文档引擎。

[开始使用](/docs/start) [在 GitHub 上查看](https://github.com/docmd-io/docmd)

== side
![仪表板预览](../../static/img/hero-preview.png)
:::
```

### 2. 使用网格组织内容

使用 [网格和卡片](../../content/containers/grids-cards) 创建高层级的导航区域，帮助用户快速找到所需内容。

```markdown
::: grids
::: grid
::: card "快速入门" icon:rocket
在不到 5 分钟的时间内启动并运行。
[了解更多](/docs/start)
:::
:::
::: grid
::: card "API 参考" icon:code
我们所有端点的全面文档。
[探索 API](/api)
:::
:::
:::
```

### 3. 使用 noStyle 进行完全自定义

如果您需要一个完全自定义的设计，且忽略标准的文档布局（无侧边栏或页眉），请在 [页面 Frontmatter](../../content/frontmatter) 中使用 `noStyle` 属性。

```yaml
---
title: "自定义仪表板"
noStyle: true
---
```
设置 `noStyle: true` 后，`docmd` 将仅渲染您提供的原始 HTML/Markdown 内容，允许您注入自己的 CSS 和 JavaScript，以实现像素级的完美体验。

## 权衡

使用 `noStyle: true` 意味着您放弃了 `docmd` 提供的原生导航、搜索和主题切换功能。您负责确保自定义页面是移动端自适应且符合无障碍要求的。对于大多数用例，在标准布局中结合使用 `hero` 和 `grid` 容器可以在美观和功能之间提供最佳平衡。
