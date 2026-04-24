---
title: "从 MkDocs 迁移"
description: "将您的文档从 MkDocs 迁移到 docmd 的零配置、高性能 JavaScript 生态系统的全面指南。"
---

## 问题

许多技术团队多年来一直使用 MkDocs（以及受欢迎的 MkDocs Material 主题）。然而，对于已经标准化使用 Node.js 和 NPM 生态系统的组织来说，管理 Python 环境、`pip` 依赖项以及复杂的 `mkdocs.yml` 配置可能会让人感到沮丧。大型 MkDocs 站点的构建时间也可能成为 CI/CD 流水线中的瓶颈。

## 为什么重要

将您的文档工具链整合到 JavaScript 生态系统中（您的前端和全栈开发人员已经在其中工作），可以提高内部贡献率并简化您的基础设施。`docmd` 为基于 Python 的工具提供了一个零配置、高性能的替代方案，提供了更现代的开发体验和更快的部署周期。

## 方法

`docmd` 采用了许多与 MkDocs Material 相同的以用户为中心的范式，例如原生版本控制、即时搜索和丰富的 UI 容器。迁移过程主要涉及将您的 `mkdocs.yml` 逻辑转换为 `docmd.config.js` 文件，并更新您的警告框语法以匹配 `docmd` 的容器系统。

## 实施

### 1. 配置映射

将基于 YAML 的配置转换为 `docmd` 的 [全局配置](../../configuration/general)。

**之前 (mkdocs.yml)：**
```yaml
site_name: My Docs
theme:
  name: material
  palette:
    scheme: slate
```

**之后 (docmd.config.js)：**
```javascript
export default {
  title: 'My Docs',
  theme: {
    appearance: 'dark' // docmd 原生支持 浅色/深色/系统 模式
  }
};
```

### 2. 警告框替换

MkDocs 使用 `!!!` 或 `???` 语法来表示警告框。`docmd` 使用统一的 `::: callout` [容器](../../content/containers/callouts) 语法。您可以使用全局查找替换或正则表达式来转换您的文件：

*   **MkDocs**: `!!! info "标题"`
*   **docmd**: `::: callout info "标题"`

### 3. 集成版本控制

使用 `docmd` 原生的 [版本控制引擎](../../configuration/versioning) 替换复杂的 `mike` 插件及其多分支部署策略。`docmd` 在单次构建过程中即可处理多个文档版本，无需外部 Python 实用工具。

```javascript
versions: {
  current: 'v2',
  all: [
    { id: 'v2', dir: 'docs', label: 'v2.x (最新版)' },
    { id: 'v1', dir: 'docs-v1', label: 'v1.x (旧版)' }
  ]
}
```

## 权衡

MkDocs Material 生态系统拥有大量基于 Python 的插件。虽然 `docmd` 的 [插件系统](../../customisation/extending-custom-plugins) 正在迅速发展并使用现代 JavaScript，但某些非常特殊的 MkDocs 插件可能还没有直接的对应项。然而，构建速度的显著提升、简化的环境管理以及卓越的客户端性能，通常使得对于现代工程团队来说，这种转变是非常值得的。
