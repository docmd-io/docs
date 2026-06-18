---
title: "可扩展的文件夹结构"
description: "如何使用 Diátaxis 框架和 docmd 的解析系统组织大型文档项目。"
---

## 问题

小型文档站点通常以扁平的 `docs/` 文件夹开始。随着项目发展到包含多个模块、API 和概念性深入探讨，组织混乱的文件夹结构成为重要的维护负担。文件变得难以定位，导航侧边栏变成压倒性的"链接墙"。

## 为什么重要

组织混乱的文件夹结构会造成混乱的用户体验，因为 docmd 的路由和默认导航是从您的文件系统派生的。对于作者来说，缺乏明确的结构会导致内容重复和命名不一致。随着更多贡献者的加入，这会使文档更难以管理。

## 方法

我们建议采用 [Diátaxis](external:https://diataxis.fr/) 等信息架构框架。它将内容分为四个不同的类别：教程、操作指南、参考和说明。将这些类别严格映射到您的物理文件系统，为读者和作者都提供了清晰的路线图。

## 实现

### 1. Diátaxis 层级

将您的源目录组织成语义子文件夹。这种物理隔离使管理大量文件变得更加容易，并确保干净的 URL 结构。

```text
my-project/
├── docs/
│   ├── tutorials/           (学习导向：分步课程)
│   │   └── getting-started.md
│   ├── guides/              (任务导向：解决特定问题)
│   │   └── deployment.md
│   ├── reference/           (信息导向：技术描述)
│   │   └── api-spec.md
│   ├── explanation/         (理解导向：理论背景)
│   │   └── architecture.md
│   └── navigation.json      (主导航定义)
└── docmd.config.json
```

### 2. 战略性地使用 navigation.json

不要在全局配置中定义庞大的导航树，而是在源目录中使用 `navigation.json` 文件。docmd 遵循 [解析优先级](../../configuration/navigation#navigation-resolution-priority) 系统。这允许您为站点的不同部分定义不同的侧边栏层级。

```json "navigation.json"
// docs/navigation.json
[
  {
    "title": "Tutorials",
    "icon": "book-open",
    "children": [
      { "title": "Get Started", "path": "/tutorials/getting-started" }
    ]
  },
  {
    "title": "Reference",
    "icon": "braces",
    "children": [
      { "title": "API Specification", "path": "/reference/api-spec" }
    ]
  }
]
```

### 3. 基于文件的路由

每个 Markdown 文件在文件夹结构中的位置决定了其最终 URL。例如，`docs/guides/auth.md` 变成 `your-site.com/guides/auth`。利用这一点来创建直观、易记的 URL。

## 权衡

像 Diátaxis 这样严格的组织框架需要清楚地理解内容类型。技术作者偶尔可能发现对特定文档进行分类很困难。随着团队的成长，建立明确的内部贡献指南对于保持一致性至关重要。