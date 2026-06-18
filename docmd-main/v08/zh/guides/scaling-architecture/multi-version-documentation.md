---
title: "管理多版本文档"
description: "如何使用统一的切换器和路径保留来维护文档的多个版本。"
---

## 问题

随着软件产品的演进，用户通常停留在较旧的 LTS 版本上。在 v2 发布时删除 v1 的文档会让用户陷入困境。为每个版本维护单独的站点会分散用户体验并蚕食 SEO。

## 为什么重要

如果没有无缝切换版本的方式，开发人员会错误地将最新文档中的说明应用于遗留环境。这会导致错误并增加支持开销。统一的版本控制系统可确保用户了解其上下文并能轻松地在版本之间跳转。

## 方法

docmd 拥有原生的 [版本管理引擎](../../configuration/versioning.md)，将版本视为一等公民。它将构建隔离到带版本前缀的目录中，提供"粘性切换"以保留路径，并将搜索结果限定到活动版本。

## 实现

### 1. 组织源目录

将您的最新文档保存在标准目录中（例如 `docs/`）。将遗留版本放在同级目录中（例如 `docs-v1/`）。

```text
my-project/
├── docs/             # v2.x（当前）
├── docs-v1/          # v1.x（遗留 LTS）
└── docmd.config.json
```

### 2. 配置版本映射

在 `docmd.config.json` 中定义您的版本结构。`current` 版本在根 URL 处提供。其他版本在 `/{id}/` 处提供。

```json "docmd.config.json"
  "versions": {
    "current": "v2",           
    "position": "sidebar-top", 
    "all": [
      { "id": "v2", "dir": "docs",    "label": "v2.x (LTS)" },
      { "id": "v1", "dir": "docs-v1", "label": "v1.x (Legacy)" }
    ]
  }
```

### 3. 按版本导航

如果不同版本之间的导航结构不同，请在每个版本的源目录中放置一个 `navigation.json` 文件。docmd 将检测并将其用于该特定版本。

```json "navigation.json"
// docs-v1/navigation.json
[
  { "title": "Legacy Setup", "path": "/legacy-setup" },
  { "title": "Migration to v2", "path": "/migration" }
]
```

### 4. 路径保留（粘性切换）

docmd 在用户切换版本时会尝试保留用户的当前路径。如果用户在 `v2` 站点上位于 `/api/auth` 并切换到 `v1`，引擎会将他们路由到 `/v1/api/auth`。如果页面不存在，则回退到该版本的主页。

## 权衡

在单个仓库中存储多个版本会随着时间的推移增加仓库大小。对于大型文档集，请考虑使用 CI/CD 在构建过程中动态拉取遗留目录，而不是将它们提交到主分支。