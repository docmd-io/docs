---
title: "由 VitePress 迁移"
description: "将您的 VitePress 项目迁移到 docmd 的综合指南。"
---

# 由 VitePress 迁移到 docmd

VitePress 是一个极其快速的基于 Vue 的静态网站生成器 (SSG) 框架。与 VitePress 类似，`docmd` 的运行速度也非常快，但它通过绝不向客户端加载任何 JavaScript 框架逻辑（没有 Vue 的水合成本）来实现这一点。

## 第一步：运行迁移引擎

在您现有的 VitePress 项目的根目录运行以下命令：

```bash
npx @docmd/core migrate --vitepress
```

### 自动执行的操作

1.  **备份**：您的整个项目会被安全地移动到一个新的 `vitepress-backup/` 目录中。
2.  **内容迁移**：您的 `docs/` 文件夹会被恢复到根目录，供 `docmd` 使用。新 `docs/` 目录中会完全剥离 `.vitepress` 隐藏配置文件夹以防止冲突。
3.  **配置生成**：生成一个 `docmd.config.js` 文件，从您的 `.vitepress/config.js` 或 `.ts` 中提取您的站点 `title`。

## 第二步：测试配置

命令完成后，在 `docmd` 中预览您的内容：

```bash
npx @docmd/core dev
```

您的 Markdown 文件将被编译，但导航侧边栏此时为空。

## 第三步：手动配置

VitePress 在其配置文件中设置导航，并在 Markdown 内部使用 Vue 组件。您需要将这些转换为 `docmd` 的语法。

### 1. 导航设置

VitePress 在 `themeConfig.sidebar` 中使用对象数组。

**所需操作：** 在您的 `docs/` 目录内创建一个 `navigation.json` 文件。

**VitePress (`.vitepress/config.js`):**
```js
themeConfig: {
  sidebar: [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/introduction' },
        { text: 'Getting Started', link: '/getting-started' }
      ]
    }
  ]
}
```

**docmd (`navigation.json`):**
```json
[
  {
    "title": "Guide",
    "collapsible": true,
    "children": [
      { "title": "Introduction", "path": "/introduction" },
      { "title": "Getting Started", "path": "/getting-started" }
    ]
  }
]
```

### 2. 替换 Vue 组件

VitePress 允许作者在 Markdown 文件中直接嵌入 Vue 组件（例如 `<MyComponent />`）。由于 `docmd` 不会在客户端运行 Vue，您必须移除这些自定义组件，或者用原生的 Markdown 语法代替。

**所需操作：** 将特定的 Vue UI 组件替换为 `docmd` 的 [容器](/content/containers/callouts)。

#### 示例：提示框（自定义容器）

VitePress 使用了与 `docmd` 非常相似的 markdown-it 自定义块语法。

**VitePress:**
```markdown
::: info
This is an info box.
:::
```

**docmd:**
```markdown
::: info
This is an info box.
:::
```
*注：VitePress 使用 `info`, `tip`, `warning`, `danger`, `details`。`docmd` 原生支持其中绝大多数，但您可能需要查看完整的 [docmd 提示框列表](/content/containers/callouts)。*

## 下一步

- 探索 `docmd` 的 [构建与部署](/deployment) 指南，因为 `docmd` 并不依赖 Vite 的构建管线。
