---
title: "从 Docusaurus 迁移"
description: "一份完整的指南，帮您把 Docusaurus v2/v3 项目迁移到 docmd。"
---

# 从 Docusaurus 迁移到 docmd

Docusaurus 是一款流行的、基于 React 的文档框架。docmd 提供了一种快速、零配置的替代方案：构建速度显著更快，并且渲染丰富特性时无需 React 组件。

## 第 1 步：运行迁移引擎

在您现有 Docusaurus 项目的根目录下执行以下命令：

```bash
npx @docmd/core migrate --docusaurus
```

### 自动完成的工作

1.  **备份**：除 `node_modules` 与 `.git` 之外的整个项目，会被安全地移入新建的 `docusaurus-backup/` 目录。
2.  **内容迁移**：把 `docs/` 目录恢复到项目根，供 docmd 使用。
3.  **配置生成**：生成一份 `docmd.config.json`，并从 Docusaurus 配置中抽取站点 `title`。

## 第 2 步：验证设置

命令完成后，您可以立即在 docmd 中预览 Markdown 内容：

```bash
npx @docmd/core dev
```

您的 Markdown 文件将被编译，但导航侧边栏还是空的。

## 第 3 步：手动配置

Docusaurus 拥有复杂的编程式配置，docmd 不会去"猜"。这些都需要您手动映射。

### 1. 导航设置

Docusaurus 的侧边栏通常是自动生成或在 `sidebars.js` 中配置的。

**待办事项**：在新的 `docs/` 目录中创建一份 `navigation.json`，用于组织 docmd 的侧边栏。详情请参阅 [导航指南](../configuration/navigation.md)。

### 2. 替换 MDX 组件

Docusaurus 大量依赖 MDX（`.mdx`）来渲染自定义 React 组件。docmd 完全是 Markdown 驱动，不使用 React。

**待办事项**：把所有自定义 `<MyReactComponent />` 标签转换为标准 Markdown，或改用 docmd 原生的 [容器](../content/containers/callouts.md)。

#### 示例：转换 Admonition

**Docusaurus：**
```markdown
:::tip 小贴士
这是一个有用的小贴士。
:::
```

::: callout success "无需任何改动"
Docusaurus 的 admonition 语法**完全无需修改**即可使用。以下别名均已支持：
- `:::note` → 渲染为 `callout info`
- `:::tip` → 渲染为 `callout tip`
- `:::info` → 渲染为 `callout info`
- `:::caution` → 渲染为 `callout warning`
- `:::danger` → 渲染为 `callout danger`

也支持无空格的写法。您既有的 Docusaurus admonition 在 docmd 中可照常渲染。
:::

**docmd 原生语法**（可选，提供自定义图标等更多特性）：
```markdown
::: callout tip "小贴士"
这是一个有用的小贴士。
:::
```

#### 示例：转换 Tabs

**Docusaurus：**
```jsx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    这是一个苹果。
  </TabItem>
  <TabItem value="orange" label="Orange">
    这是一个橘子。
  </TabItem>
</Tabs>
```

**docmd：**（转换为 docmd 原生的 tabs 容器语法）
```markdown
::: tabs
== tab "苹果"
这是一个苹果。

== tab "橘子"
这是一个橘子。
:::
```

### 3. 本地化 (i18n)

如果您使用了 Docusaurus 的 `i18n` 功能，您的翻译文件很可能位于 `i18n/locale/docusaurus-plugin-content-docs/current/`。

**待办事项**：把这些文件移动到 docmd 的目录结构（`docs/en/`、`docs/es/` 等），并在 `docmd.config.json` 中配置 locale。详情请参阅 [本地化指南](../configuration/localisation/index.md)。

## 下一步

- 浏览 [布局与界面](../configuration/layout-ui.md) 设置，匹配您原有的 Docusaurus 主题。
- 把基于 React 的 hero 头部转换为 docmd 的 [Hero 容器](../content/containers/hero.md)。