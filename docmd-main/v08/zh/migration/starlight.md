---
title: "从 Astro Starlight 迁移"
description: "一份完整的指南，帮您把 Astro Starlight 项目迁移到 docmd。"
---

# 从 Astro Starlight 迁移到 docmd

Starlight 是构建在 Astro 之上的文档主题。docmd 提供类似的"默认零 JavaScript"体验，并且省去了配置整套 Web 框架的麻烦，从而降低学习成本。

## 第 1 步：运行迁移引擎

在您现有 Starlight 项目的根目录下执行以下命令：

```bash
npx @docmd/core migrate --starlight
```

### 自动完成的工作

1.  **备份**：整个项目会被安全地移入新建的 `starlight-backup/` 目录。
2.  **内容迁移**：Starlight 将文档存放在 `src/content/docs/`，迁移引擎会提取该目录并把内容移至项目根目录的 `docs/` 文件夹。
3.  **配置生成**：生成一份 `docmd.config.json`，从 `astro.config.mjs` 中的 Starlight 集成里抽取站点 `title`。

## 第 2 步：验证设置

命令完成后，您可以在 docmd 中预览内容：

```bash
npx @docmd/core dev
```

您的 Markdown 文件将被编译，但导航侧边栏还是空的。

## 第 3 步：手动配置

### 1. 导航设置

Starlight 通过 `astro.config.mjs` 的 `sidebar` 数组定义导航。

**待办事项**：在新的 `docs/` 目录下创建一份 `navigation.json`。

**Starlight (`astro.config.mjs`)：**
```javascript
sidebar: [
  {
    "label": "指南",
    "items": [
      { "label": "安装", "link": "/guides/setup/" }
    ]
  }
]
```

**docmd (`navigation.json`)：**
```json "navigation.json"
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

### 2. 替换 Astro 组件（MDX / Markdoc）

Starlight 通过 MDX 或 Markdoc 嵌入 Astro 组件。由于 docmd 仅依赖纯 Markdown 语法，这些组件都必须转换。

**待办事项**：把 Astro 组件替换为 docmd [容器](../content/containers/callouts.md)。

#### 示例：转换 Tabs

**Starlight：**
```mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="恒星">天狼星、织女星、参宿四</TabItem>
  <TabItem label="卫星">Io、Europa、Ganymede</TabItem>
</Tabs>
```

**docmd：**
```markdown
::: tabs
== tab "恒星"
天狼星、织女星、参宿四

== tab "卫星"
Io、Europa、Ganymede
:::
```

#### 示例：转换 Asides（Admonition）

**Starlight：**
```mdx
:::note[可选标题]
一段注释内容。
:::
```

**docmd：**
```markdown
::: note "可选标题"
一段注释内容。
:::
```

### 3. Frontmatter 映射

Starlight 通过 Astro Content Collections 对 Frontmatter 进行了严格的类型化约束。docmd 的 Frontmatter 更简单。
如果您在 Starlight 中为登录页使用了 `hero` 或 `banner` 这类 frontmatter 属性，请改用直接写在 Markdown 正文里的 docmd [Hero 区域](../content/containers/hero.md)。

## 下一步

- 了解 docmd 内置的 [Search 插件](../plugins/search.md)。Starlight 使用 Pagefind，而 docmd 原生自带一个高度优化的本地搜索索引器。
