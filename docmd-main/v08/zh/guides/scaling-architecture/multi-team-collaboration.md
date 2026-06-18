---
title: "多团队协作"
description: "如何使用去中心化导航和全局菜单栏允许多个团队无摩擦地贡献。"
---

## 问题

当多个独立团队（例如前端、后端、DevOps 和产品）向单个文档仓库贡献时，会出现组织摩擦。团队可能会覆盖全局导航设置、创建冲突的样式范式或在并发更新期间破坏跨边界的链接。

## 为什么重要

作者体验中的摩擦会导致"文档孤岛"。团队会创建孤立的 wiki 以避免共享仓库的复杂性。这破坏了单一门户的统一用户体验，并使用户更难找到全面的信息。

## 方法

使用 docmd 的去中心化 [导航解析](../../configuration/navigation.md#navigation-resolution-priority) 系统。这允许各个团队使用本地 `navigation.json` 文件完全自主其特定领域。一个中央团队管理全局 [菜单栏](../../configuration/menubar.md) 和视觉设计系统。

## 实现

### 1. 基于域的所有权

将您的文档划分为分配给特定团队的顶级目录。每个团队完全拥有其分配文件夹的内容和内部结构。

```text
my-project/
├── docs/
│   ├── frontend/             # 由 UI 团队拥有
│   │   ├── navigation.json   # 团队特定的侧边栏
│   │   └── components.md
│   ├── backend/              # 由 API 团队拥有
│   │   ├── navigation.json
│   │   └── database.md
│   └── docmd.config.json     # 由 Platform/Core 团队拥有
```

### 2. 全局上下文切换（菜单栏）

中央平台团队控制 [菜单栏](../../configuration/menubar.md)。它充当在不同团队域之间切换的主要导航层。

```json "docmd.config.json"
  "menubar": {
    "enabled": true,
    "items": [
      { "text": "Frontend", "url": "/frontend/components" },
      { "text": "Backend", "url": "/backend/database" },
      { "text": "Infrastructure", "url": "/devops/setup" }
    ]
  }
```

### 3. 带有 navigation.json 的本地自主性

当用户在 `/frontend/` 目录中浏览内容时，docmd 会自动优先处理 `frontend/navigation.json` 文件。侧边栏动态更新以仅反映 frontend 特定的层级。这可以防止导航杂乱。

```json "navigation.json"
// docs/frontend/navigation.json
[
  { "title": "Design System", "path": "/frontend/design-system" },
  { "title": "Component Library", "path": "/frontend/components" }
]
```

## 权衡

去中心化导航要求团队注意跨域链接。虽然 docmd 有效地处理相对链接，但移动整个团队目录会破坏其他团队文件中的链接。对不同团队域之间的链接使用根相对路径（以 `/` 开头）以确保稳定性。