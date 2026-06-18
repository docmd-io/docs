---
title: "组织大型仓库"
description: "如何在复杂的文档结构中通过枢纽页面和分层导航保持导航清晰度和可用性。"
---

## 问题

随着文档仓库增长到数百个页面，在单个侧边栏中显示每个主题会使站点无法使用。用户遭受"选择悖论"的困扰，要查找特定模块需要在数十个不相关的类别中滚动。

## 为什么重要

导航是用户体验的关键组成部分。杂乱的界面会降低您产品的感知质量，并使开发人员更难找到答案。如果导航感觉混乱，用户通常会认为软件本身难以使用。

## 方法

使用 docmd 的 [导航配置](../../configuration/navigation.md) 实施分层分组策略。在需要之前隐藏复杂性。使用可折叠分组和"枢纽页面"来保持侧边栏整洁，确保用户可以专注于他们当前的任务。

## 实现

### 1. 分层分组

在您的 `navigation.json` 或配置文件中使用 `collapsible` 属性对相关页面进行分组。这可以保持侧边栏整洁，并允许用户仅展开他们需要的部分。

```json "navigation.json"
[
  {
    "title": "Advanced API",
    "icon": "braces",
    "collapsible": true,
    "children": [
      { "title": "Authentication", "path": "/api/auth" },
      { "title": "Webhooks", "path": "/api/webhooks" },
      { "title": "Rate Limiting", "path": "/api/rate-limiting" }
    ]
  }
]
```

### 2. 实施枢纽页面

不要在侧边栏中暴露每个单独的页面，而是创建作为特定子系统目录的中央"枢纽页面"。使用 [网格和卡片](../../content/containers/grids.md) 提供可用内容的可视化高级概览。

```markdown
# Integrations Hub

::: grids
::: grid
::: card "Database Integrations" icon:database
Connect your application to popular databases like Postgres and MongoDB.
[View Database Guides](/integrations/databases)
:::
:::
::: grid
::: card "Payment Gateways" icon:credit-card
Learn how to implement Stripe, PayPal, and more.
[View Payment Guides](/integrations/payments)
:::
:::
:::
```

### 3. 使用面包屑

docmd 根据您的文件夹结构和导航层级自动为每个页面生成 [面包屑](../../content/syntax/advanced.md#breadcrumbs)。通过使用枢纽页面，您可以保持侧边栏的专注，而面包屑提供上下文和一种简单的导航回上一层级的方式。

## 权衡

使用枢纽页面可能为用户增加额外的"点击"以到达深度内容。但是，这通常优于一个杂乱的侧边栏使发现变得困难。这种权衡是一种更清洁、更专业的界面，可改善整体可搜索性和专注度。