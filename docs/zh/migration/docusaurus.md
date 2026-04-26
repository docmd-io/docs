---
title: "由 Docusaurus 迁移"
description: "将您的 Docusaurus v2/v3 项目迁移到 docmd 的综合指南。"
---

# 由 Docusaurus 迁移到 docmd

Docusaurus 是一个流行的基于 React 的文档框架。`docmd` 提供了一个快速、零配置的替代方案，其编译速度显著加快，并且不需要 React 组件即可渲染丰富的功能。

## 第一步：运行迁移引擎

在您现有的 Docusaurus 项目的根目录（即 `docusaurus.config.js` 或 `docusaurus.config.ts` 所在的位置）运行以下命令：

```bash
npx @docmd/core migrate --docusaurus
```

### 自动执行的操作

1.  **备份**：您的整个项目（不包括 `node_modules` 和 `.git`）会被安全地移动到一个新的 `docusaurus-backup/` 目录中。
2.  **内容迁移**：您的 `docs/` 文件夹会被恢复到根目录，供 `docmd` 使用。
3.  **配置生成**：生成一个 `docmd.config.js` 文件，从您的 Docusaurus 配置中提取站点 `title`。

## 第二步：测试配置

命令完成后，您可以立即在 `docmd` 中预览您的 Markdown 内容：

```bash
npx @docmd/core dev
```

您的 Markdown 文件将被编译，但导航侧边栏此时为空。

## 第三步：手动配置

Docusaurus 具有复杂的编程式配置，`docmd` 不会尝试猜测这些配置。您需要手动映射它们。

### 1. 导航设置

Docusaurus 的侧边栏通常是自动生成的，或在 `sidebars.js` 中配置。

**所需操作：** 在您新的 `docs/` 目录内创建一个 `navigation.json` 文件以构建 `docmd` 侧边栏。请参阅 [导航指南](../configuration/navigation.md)。

### 2. 替换 MDX 组件

Docusaurus 严重依赖 MDX (`.mdx`) 来渲染自定义的 React 组件（如 Tabs、Admonitions 或自定义 UI 元素）。`docmd` 完全是由 Markdown 驱动的，不使用 React。

**所需操作：** 您必须将所有自定义的 `<MyReactComponent />` 标签转换为标准的 Markdown，或使用 `docmd` 的原生 [容器](../content/containers/callouts.md)。

#### 示例：转换提示框（Admonitions）

**Docusaurus:**
```markdown
:::tip My Tip
This is a helpful tip.
:::
```

**docmd:** （无需修改！`docmd` 默认将 Docusaurus 风格的警告块原生支持为 Callouts）。
```markdown
::: tip "My Tip"
This is a helpful tip.
:::
```

#### 示例：转换标签页（Tabs）

**Docusaurus:**
```jsx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    This is an apple.
  </TabItem>
  <TabItem value="orange" label="Orange">
    This is an orange.
  </TabItem>
</Tabs>
```

**docmd:** （转换为原生 `docmd` 的标签页容器语法）
```markdown
::: tabs
== tab "Apple"
This is an apple.

== tab "Orange"
This is an orange.
:::
```

### 3. 国际化 (i18n)

如果您使用了 Docusaurus 的 `i18n` 功能，您翻译好的文件可能位于 `i18n/locale/docusaurus-plugin-content-docs/current/` 中。

**所需操作：** 将这些文件移动到 `docmd` 的目录结构中（例如 `docs/en/`, `docs/zh/` 等），并在 `docmd.config.js` 中配置本地化语言。请参阅 [国际化指南](../configuration/localisation/index.md)。

## 下一步

- 探索 [布局与界面](../configuration/layout-ui.md) 设置，使其匹配您原先的 Docusaurus 主题。
- 将基于 React 的首屏横幅转换为 `docmd` [主页横幅容器](../content/containers/hero.md)。
