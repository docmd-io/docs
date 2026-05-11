---
title: "由 Astro Starlight 迁移"
description: "将您的 Astro Starlight 项目迁移到 docmd 的综合指南。"
---

# 由 Astro Starlight 迁移到 docmd

Starlight 是一个构建在 Astro 框架上的出色文档主题。`docmd` 提供了类似的默认零 JavaScript 体验，但它消除了配置完整 Web 框架 (Astro) 的需要，从而大幅降低了技术作者的学习曲线。

## 第一步：运行迁移引擎

在您现有的 Starlight 项目的根目录（即 `astro.config.mjs` 所在的位置）运行以下命令：

```bash
npx @docmd/core migrate --starlight
```

### 自动执行的操作

1.  **备份**：您的整个项目会被安全地移动到一个新的 `starlight-backup/` 目录中。
2.  **内容迁移**：Starlight 将文档保存在 `src/content/docs/` 目录中。迁移引擎会自动提取该特定目录，并将其内容移动至根目录下的 `docs/` 文件夹供 `docmd` 使用。
3.  **配置生成**：生成一个 `docmd.config.js` 文件，从 `astro.config.mjs` 内的 Starlight 集成中提取您的站点 `title`。

## 第二步：测试配置

命令完成后，在 `docmd` 中预览您的内容：

```bash
npx @docmd/core dev
```

您的 Markdown 文件将被编译，但导航侧边栏此时为空。

## 第三步：手动配置

### 1. 导航设置

Starlight 通过 `sidebar` 数组在 `astro.config.mjs` 中定义导航。

**所需操作：** 您必须在您新生成的 `docs/` 文件夹内创建一个 `navigation.json` 文件。

**Starlight (`astro.config.mjs`):**
```js
sidebar: [
  {
    label: 'Guides',
    items: [
      { label: 'Setup', link: '/guides/setup/' }
    ],
  },
]
```

**docmd (`navigation.json`):**
```json
[
  {
    "title": "Guides",
    "collapsible": true,
    "children": [
      { "title": "Setup", "path": "/guides/setup" }
    ]
  }
]
```

### 2. 替换 Astro 组件 (MDX/Markdoc)

Starlight 使用通过 MDX 或 Markdoc 嵌入的 Astro 组件（`<Tabs>`, `<Card>` 等）。由于 `docmd` 依赖于纯 Markdown 语法而不是 UI 组件，因此需要转换这些内容。

**所需操作：** 将 Astro 组件替换为 `docmd` 的 [容器](../content/containers/callouts.md)。

#### 示例：转换标签页（Tabs）

**Starlight:**
```mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="Stars">Sirius, Vega, Betelgeuse</TabItem>
  <TabItem label="Moons">Io, Europa, Ganymede</TabItem>
</Tabs>
```

**docmd:**
```markdown
::: tabs
== tab "Stars"
Sirius, Vega, Betelgeuse

== tab "Moons"
Io, Europa, Ganymede
:::
```

#### 示例：转换提示框（Asides / Admonitions）

**Starlight:**
```mdx
:::note[Optional Title]
Some note content.
:::
```

**docmd:**
```markdown
::: note "Optional Title"
Some note content.
:::
```

### 3. Frontmatter 映射

Starlight 通过 Astro 的内容合集功能对 Frontmatter 进行了严格地类型限制。`docmd` 的 Frontmatter 则更加简单。
如果您在 Starlight 中的登录页面使用了 `hero` 或 `banner` 前置属性，则需要将它们替换为直接写在 Markdown 正文中的 `docmd` [主页横幅](../content/containers/hero.md)。

## 下一步

- 探索 `docmd` 的内置 [搜索插件](../plugins/search.md)（Starlight 使用 Pagefind，而 `docmd` 则原生提供了一个高度优化的本地搜索索引器）。
