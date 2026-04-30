---
title: "从 Docusaurus 迁移"
description: "关于将你的 Docusaurus v2/v3 项目转移到 docmd 的综合指南。"
---

# 从 Docusaurus 迁移到 docmd

Docusaurus 是一个基于 React 的流行文档框架。`docmd` 提供了一个快速、零配置的替代方案，它的编译速度显著提高，并且不需要 React 组件即可渲染丰富的功能。

## 第 1 步：运行迁移引擎

在现有 Docusaurus 项目的根目录（即 `docusaurus.config.js` 或 `docusaurus.config.ts` 所在的位置）运行以下命令：

```bash
npx @docmd/core migrate --docusaurus
```

### 自动发生的更改

1.  **备份**: 你的整个项目（不包括 `node_modules` 和 `.git`）会被安全地移动到一个新的 `docusaurus-backup/` 目录中。
2.  **内容迁移**: 你的 `docs/` 文件夹将被恢复到根目录，供 `docmd` 使用。
3.  **配置生成**: 生成一个 `docmd.config.js` 文件，从你的 Docusaurus 配置中提取站点标题 (`title`)。

## 第 2 步：测试设置

命令完成后，你可以立即在 `docmd` 中预览你的 Markdown 内容：

```bash
npx @docmd/core dev
```

你的 Markdown 文件将会编译，但你的导航侧边栏将是空的。

## 第 3 步：手动配置

Docusaurus 拥有复杂的编程式配置，`docmd` 不会尝试猜测这些配置。你需要手动进行映射。

### 1. 导航设置

Docusaurus 的侧边栏通常是在 `sidebars.js` 中自动生成或配置的。

**所需操作：** 在新的 `docs/` 目录内创建一个 `navigation.json` 文件来构建你的 `docmd` 侧边栏。请参阅 [导航指南](../configuration/navigation.md)。

### 2. 替换 MDX 组件

Docusaurus 严重依赖 MDX (`.mdx`) 来渲染自定义 React 组件（如 Tabs、Admonitions 或自定义 UI 元素）。`docmd` 是纯粹由 Markdown 驱动的，不使用 React。

**所需操作：** 你必须将任何自定义的 `<MyReactComponent />` 标签转换为标准 Markdown，或使用 `docmd` 原生的 [容器](../content/containers/callouts.md)。

#### 示例：转换提示框 (Admonitions)

**Docusaurus:**
```markdown
:::tip My Tip
这是一个有用的技巧。
:::
```

**docmd:** (除了为了更好的用户体验而更改了一些关键字外，学习曲线几乎为零。`docmd` 原生支持 Docusaurus 风格的提示框作为标注)。
```markdown
::: callout tip "My Tip"
这是一个有用的技巧。
:::
```

#### 示例：转换选项卡 (Tabs)

**Docusaurus:**
```jsx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    这是一个苹果。
  </TabItem>
  <TabItem value="orange" label="Orange">
    这是一个橙子。
  </TabItem>
</Tabs>
```

**docmd:** (转换为原生的 `docmd` 选项卡容器语法)
```markdown
::: tabs
== tab "Apple"
这是一个苹果。

== tab "Orange"
这是一个橙子。
:::
```

### 3. 本地化 (i18n)

如果你使用了 Docusaurus 的 `i18n` 功能，你的翻译文件可能位于 `i18n/locale/docusaurus-plugin-content-docs/current/`。

**所需操作：** 将这些文件移入 `docmd` 的目录结构（`docs/en/`、`docs/zh/` 等），并在 `docmd.config.js` 中配置语言环境。请参阅 [本地化指南](../configuration/localisation/index.md)。

## 后续步骤

- 探索 [布局与 UI](../configuration/layout-ui.md) 设置，以匹配你的 Docusaurus 主题。
- 将基于 React 的 hero 页眉转换为 `docmd` [英雄区块容器](../content/containers/hero.md)。
