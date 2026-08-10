---
title: "从 Astro Starlight 迁移"
description: "一份完整的指南，帮您把 Astro Starlight 项目迁移到 docmd。"
---

Starlight 是一款构建在 Astro 之上的文档主题。`docmd` 提供类似的“默认零 JavaScript”体验，无需配置完整的 Web 框架或复杂的 Astro 集成。

::: steps

### 1. 运行迁移引擎

在您现有 Starlight 项目的根目录下运行以下命令：

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core migrate --starlight
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core migrate --starlight
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core migrate --starlight
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core migrate --starlight
```
:::

#### 自动处理流程

::: steps

1. **备份**：除 `node_modules`、`.git`、`package.json` 及 lockfile 之外的整个项目目录，会被安全地备份到一个新的 `starlight-backup/` 目录中。
2. **内容迁移**：Starlight 将文档存放在 `src/content/docs/` 中。迁移引擎会提取该文件夹并将内容移动至根 `docs/` 文件夹。
3. **配置生成**：生成一份 `docmd.config.json`，从 `astro.config.mjs` 或 `astro.config.ts` 中的 Starlight 集成中提取您的站点 `title`。

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

#### 导航设置

Starlight 通过 `sidebar` 数组在 `astro.config.mjs` 中定义导航侧边栏。请在 `docs/` 目录中创建 `navigation.json`：

**Starlight (`astro.config.mjs`):**
```javascript
sidebar: [
  {
    label: "指南",
    items: [
      { label: "安装", link: "/guides/setup/" }
    ]
  }
]
```

**docmd (`navigation.json`):**
```json
[
  {
    "title": "指南",
    "collapsible": true,
    "children": [
      { "title": "安装", "path": "/guides/setup" }
    ]
  }
]
```

#### 替换 Astro 组件（MDX / Markdoc）

Starlight 使用通过 MDX 或 Markdoc 嵌入的 Astro 组件。请将其替换为 `docmd` 原生的 [容器](../content/containers/callouts.md)。

##### 转换选项卡组件

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
== tab "Stars" icon:sparkles
天狼星、织女星、参宿四

== tab "Moons" icon:moon
Io, Europa, Ganymede
::: /tabs
```

##### 转换 Asides（提示框）

**Starlight:**
```mdx
:::note[可选标题]
一段注释内容。
:::
```

**docmd:**
```markdown
::: callout info title:"可选标题"
一段注释内容。
::: /callout
```

#### Frontmatter 映射

Starlight 通过 Astro 内容集合强制进行严格的 Frontmatter 类型化。如果您为落地页使用了 `hero` 或 `banner` frontmatter 属性，请将其替换为直接写在 Markdown 正文中的 `docmd` 原生 [Hero 区域](../content/containers/hero.md)。

:::

## 下一步

- 探索 `docmd` 内置的 [Search 插件](../plugins/search.md)。Starlight 依赖 Pagefind 集成，而 `docmd` 开箱即用包含快速、零配置的本地搜索索引器。