---
title: "可扩展的文件夹结构"
description: "如何使用 Diátaxis 框架和 docmd 的解析系统组织大型文档项目。"
---

## 问题

小型文档网站通常从扁平的 `docs/` 文件夹开始。然而，随着项目扩展到包含多个模块、教程、API 和概念性深度解析，杂乱无章的文件夹结构就变成了沉重的维护负担。文件变得难以定位，导航侧边栏也变成了令人窒息的“链接墙”。

## 为什么重要

杂乱无章的文件夹结构会直接导致用户体验混乱，因为 `docmd` 的路由和默认导航都是从您的文件系统派生出来的。对于作者来说，缺乏清晰的结构会导致内容重复和命名不一致，随着更多贡献者加入项目，文档将变得越来越难以管理。

## 方法

我们建议采用 [Diátaxis](https://diataxis.fr/) 等信息架构框架，它将内容分为四个不同的类别：教程 (Tutorials)、操作指南 (How-To Guides)、参考 (Reference) 和解释 (Explanation)。将这些类别严格映射到您的物理文件系统，可以为读者和作者提供清晰的路线图。

## 实施

### 1. Diátaxis 层级结构

将您的源目录组织成语义化的子文件夹。这种物理隔离使得管理大量文件变得更加容易，并确保了清晰的 URL 结构。

```text
my-project/
├── docs/
│   ├── tutorials/           (学习导向：逐步课程)
│   │   └── getting-started.md
│   ├── guides/              (任务导向：解决特定问题)
│   │   └── deployment.md
│   ├── reference/           (信息导向：技术描述)
│   │   └── api-spec.md
│   ├── explanation/         (理解导向：理论背景)
│   │   └── architecture.md
│   └── navigation.json      (主导航定义)
└── docmd.config.js
```

### 2. navigation.json 的战略运用

不要在全局配置中定义庞大的导航树，而是在源目录中使用 `navigation.json` 文件。`docmd` 遵循 [解析优先级](../../configuration/navigation#navigation-resolution-priority) 系统，允许您为网站的不同部分定义独特的侧边栏层级。

```json
// docs/navigation.json
[
  {
    "title": "教程",
    "icon": "book-open",
    "children": [
      { "title": "快速入门", "path": "/tutorials/getting-started" }
    ]
  },
  {
    "title": "参考",
    "icon": "braces",
    "children": [
      { "title": "API 规范", "path": "/reference/api-spec" }
    ]
  }
]
```

### 3. 基于文件的路由

请记住，每个 Markdown 文件在文件夹结构中的位置决定了其最终的 URL。例如，`docs/guides/auth.md` 变为 `your-site.com/guides/auth`。利用这一点为您的用户创建直观、易记的 URL。

## 权衡

像 Diátaxis 这样严格的组织框架需要对内容类型有清晰的理解。技术作家偶尔可能会觉得很难对特定的文档进行分类（例如，“这是一个指南还是一个教程？”）。建立清晰的内部贡献指南对于随着团队和文档的增长保持一致性至关重要。
