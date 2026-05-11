---
title: "多团队协作"
description: "如何使用去中心化导航和全局菜单栏，让多个团队在不发生冲突的情况下共同为一个统一的文档项目做出贡献。"
---

## 问题

当多个独立的团队（如前端、后端、DevOps 和产品团队）共同为一个文档库做出贡献时，往往会出现组织摩擦。团队可能会意外地覆盖全局导航设置，创建冲突的样式范式，或者在并发更新期间破坏跨领域边界的链接。

## 为什么重要

写作体验中的摩擦会导致“文档孤岛”，即团队为了避免共享库的复杂性而创建独立的、孤立的维基。这破坏了统一文档门户的连贯用户体验，并使用户更难找到关于整个系统的全面信息。

## 方法

利用 `docmd` 的去中心化 [解析优先级](../../configuration/navigation#navigation-resolution-priority) 系统。这允许各个团队使用本地 `navigation.json` 文件对其特定领域拥有完全的自主权，同时由一个核心团队管理全局 [菜单栏](../../configuration/menubar) 和视觉设计系统。

## 实施

### 1. 基于领域的归属权

将您的文档划分为分配给特定团队的顶级目录。每个团队完全拥有其分配文件夹的内容和内部结构。

```text
my-project/
├── docs/
│   ├── frontend/             # 归 UI 团队所有
│   │   ├── navigation.json   # 团队特定的侧边栏
│   │   └── components.md
│   ├── backend/              # 归 API 团队所有
│   │   ├── navigation.json
│   │   └── database.md
│   └── docmd.config.js       # 归平台/核心团队所有
```

### 2. 全局上下文切换 (菜单栏)

中央平台团队控制 [菜单栏](../../configuration/menubar)，它作为主要的导航层，用于在不同的团队领域之间切换。

```javascript
// docmd.config.js
export default {
  menubar: {
    enabled: true,
    items: [
      { text: '前端', url: '/frontend/components' },
      { text: '后端', url: '/backend/database' },
      { text: '基础设施', url: '/devops/setup' }
    ]
  }
};
```

### 3. 利用 navigation.json 实现本地自主

当用户浏览 `/frontend/` 目录下的内容时，`docmd` 会自动优先处理 `frontend/navigation.json` 文件。侧边栏会动态更新，仅反映前端特定的层级结构，从而防止导航被来自其他团队的无关信息所淹没。

```json
// docs/frontend/navigation.json
[
  { "title": "设计系统", "path": "/frontend/design-system" },
  { "title": "组件库", "path": "/frontend/components" }
]
```

## 权衡

去中心化导航要求团队注意跨领域的链接。虽然 `docmd` 可以有效地处理相对链接，但移动整个团队目录将破坏其他团队文件中的链接。我们建议在不同团队领域之间的链接使用根相对路径（以 `/` 开头），以确保稳定性。
