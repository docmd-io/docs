---
title: "组织大型代码库"
description: "如何使用落地页和层级导航在复杂的文档结构中保持导航清晰度和易用性。"
---

## 问题

随着文档库增长到数百个页面，在单个庞大的侧边栏中显示所有主题会使网站变得难以使用。用户会陷入“选择瘫痪”，寻找一个特定的模块需要滚动浏览数十个无关的、已展开的分类。

## 为什么重要

导航是用户体验的关键组成部分。杂乱无章的界面会降低产品的感知质量，使开发者更难找到所需的答案。如果导航感觉混乱，用户通常会认为软件本身也同样难以使用。

## 方法

使用 `docmd` 的 [导航配置](../../configuration/navigation) 实施层级分组策略。核心原则是在需要之前隐藏复杂性。使用可折叠组和“落地页 (Hub Pages)”来保持侧边栏整洁，确保用户可以专注于当前任务而不会感到不知所措。

## 实施

### 1. 层级分组

在 `navigation.json` 或配置文件中使用 `collapsible` 属性对相关页面进行分组。这可以保持侧边栏整洁，并允许用户仅展开他们感兴趣的部分。

```json
// docs/navigation.json
[
  {
    "title": "高级 API",
    "icon": "braces",
    "collapsible": true,
    "children": [
      { "title": "身份验证", "path": "/api/auth" },
      { "title": "Webhook", "path": "/api/webhooks" },
      { "title": "速率限制", "path": "/api/rate-limiting" }
    ]
  }
]
```

### 2. 实施落地页 (Hub Pages)

不要在侧边栏中公开每一个单独的页面，而是创建中央“落地页”，作为特定子系统的目录。使用 [网格和卡片](../../content/containers/grids-cards) 提供可用内容的视觉化、高层级概览。

```markdown
# 集成中心 (Integrations Hub)

::: grids
::: grid
::: card "数据库集成" icon:database
将您的应用程序连接到 Postgres 和 MongoDB 等流行数据库。
[查看数据库指南](/integrations/databases)
:::
:::
::: grid
::: card "支付网关" icon:credit-card
了解如何集成 Stripe、PayPal 等。
[查看支付指南](/integrations/payments)
:::
:::
:::
```

### 3. 利用面包屑导航

`docmd` 会根据您的文件夹结构和导航层级为每个页面自动生成 [面包屑导航](../../content/syntax/advanced#breadcrumbs)。通过使用落地页，您可以保持侧边栏的专注，同时面包屑导航提供必要的上下文，并方便用户向上级层级导航。

## 权衡

使用落地页可能会增加用户到达深度内容的“点击”次数。然而，这通常优于一个使内容发现变得困难的杂乱侧边栏。权衡的结果是一个更整洁、更专业的界面，显著提高了文档的整体可搜索性和专注度。
