---
title: "从 Docusaurus 迁移"
description: "一份完整的指南，帮您把 Docusaurus v2/v3 项目迁移到 docmd。"
---

Docusaurus 是一款基于 React 的文档框架。`docmd` 提供了一种快速、零配置的替代方案：编译速度显著更快，且渲染丰富的文档特性时无需 React 组件。

### 1. 运行迁移引擎

在您现有 Docusaurus 项目的根目录下运行以下命令：

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core migrate --docusaurus
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core migrate --docusaurus
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core migrate --docusaurus
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core migrate --docusaurus
```
:::

#### 自动处理流程

::: steps

1. **备份**：除 `node_modules`、`.git`、`package.json` 及 lockfile 之外的整个项目目录，会被安全地备份到一个新的 `docusaurus-backup/` 目录中。
2. **内容迁移**：您的 `docs/` 文件夹会被恢复到项目根目录。
3. **Frontmatter 转换**：Docusaurus 的 `sidebar_label` frontmatter 标签会自动转换为 `docmd` 的 `nav_title`，旧版的 `id` 标签会被安全剥离。
4. **配置生成**：生成一份 `docmd.config.json`，直接从 `docusaurus.config.js` 或 `docusaurus.config.ts` 中提取您的站点 `title` 和静态目录选项。

:::

### 2. 预览迁移产物

在 `docmd` 中立即预览您的 Markdown 内容：

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core dev
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core dev
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core dev
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core dev
```
:::

### 3. 手动配置与组件替换

Docusaurus 使用编程式 JavaScript 配置与 React 组件，需要将其映射为原生 Markdown 和 `docmd` 容器。

#### 导航设置

Docusaurus 侧边栏通常是自动生成或在 `sidebars.js` 中声明的。请在新的 `docs/` 目录中创建一份 `navigation.json` 以定义显式的侧边栏导航。参阅 [导航指南](../configuration/navigation.md)。

#### 替换 MDX 与 React 组件

将自定义 `<MyReactComponent />` 标签转换为标准 Markdown 或改用 `docmd` 原生的 [容器](../content/containers/callouts.md)。

##### 提示框容器别名

Docusaurus 提示框语法 **开箱即用**，无需修改文件：
- `:::note` → 渲染为 `callout info`
- `:::tip` → 渲染为 `callout tip`
- `:::info` → 渲染为 `callout info`
- `:::caution` → 渲染为 `callout warning`
- `:::danger` → 渲染为 `callout danger`

::: callout tip "原生容器语法" icon:sparkles
如需增强特性（例如自定义图标或自定义徽章颜色），可将 Docusaurus 提示框转换为原生 `docmd` 语法：
```markdown
::: callout tip "自定义标题" icon:sparkles
这是一个提示框容器。
:::
```
:::

##### 选项卡代码块

**Docusaurus (React MDX):**
```jsx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    Apple 内容。
  </TabItem>
  <TabItem value="orange" label="Orange">
    Orange 内容。
  </TabItem>
</Tabs>
```

**docmd (原生容器):**
```markdown
::: tabs
== tab "Apple" icon:apple
Apple 内容。

== tab "Orange" icon:citrus
Orange 内容。
:::
```

#### 本地化 (i18n)

如果您使用了 Docusaurus 的 `i18n` 功能，请将翻译文件从 `i18n/<locale>/docusaurus-plugin-content-docs/current/` 移动到 `docmd` 的语言目录（`docs/en/`、`docs/de/`、`docs/zh/` 等），并在 `docmd.config.json` 中定义语言代码。参阅 [本地化指南](../configuration/localisation/index.md)。

## 下一步

- 在 [布局与界面指南](../configuration/layout-ui.md) 中自定义站点外观。
- 将基于 React 的自定义 hero 落地页替换为原生的 [Hero 容器](../content/containers/hero.md)。