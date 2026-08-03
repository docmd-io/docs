---
title: "从 VitePress 迁移"
description: "一份完整的指南，帮您把 VitePress 项目迁移到 docmd。"
---

# 从 VitePress 迁移到 docmd

VitePress 是一个基于 Vue 的快速 SSG 框架。docmd 同样很快，但不会向客户端输出任何 JavaScript 框架逻辑。这样就免去了 Vue 的 hydration 开销。

## 第 1 步：运行迁移引擎

在您现有 VitePress 项目的根目录下执行以下命令：

```bash
npx @docmd/core migrate --vitepress
```

### 自动完成的工作

1.  **备份**：整个项目会被安全地移入新建的 `vitepress-backup/` 目录。
2.  **内容迁移**：把 `docs/` 目录恢复到项目根，供 docmd 使用；同时完全移除隐藏的 `.vitepress` 配置目录，以避免冲突。
3.  **配置生成**：生成一份 `docmd.config.json`，从 `.vitepress/config.js` 或 `.ts` 中抽取站点 `title`。

## 第 2 步：验证设置

命令完成后，您可以在 docmd 中预览内容：

```bash
npx @docmd/core dev
```

您的 Markdown 文件将被编译，但导航侧边栏还是空的。

## 第 3 步：手动配置

VitePress 把导航写在配置文件里，并会在 Markdown 中使用 Vue 组件。您必须把这些迁移到 docmd。

### 1. 导航设置

VitePress 使用 `themeConfig.sidebar` 中的对象数组。

**待办事项**：在 `docs/` 目录下创建一份 `navigation.json`。

```javascript ".vitepress/config.js"
themeConfig: {
  "sidebar": [
    {
      "text": "指南",
      "items": [
        { "text": "简介", "link": "/introduction" },
        { "text": "快速开始", "link": "/getting-started" }
      ]
    }
  ]
}
```

```json "navigation.json"
[
  {
    "title": "指南",
    "collapsible": true,
    "children": [
      { "title": "简介", "path": "/introduction" },
      { "title": "快速开始", "path": "/getting-started" }
    ]
  }
]
```

### 2. 替换 Vue 组件

VitePress 允许作者在 Markdown 文件中直接嵌入 Vue 组件。由于 docmd 不在客户端运行 Vue，您需要删除自定义组件，或将它们替换为原生 Markdown。

**待办事项**：把 Vue 专属的 UI 组件替换为 docmd [容器](../content/containers/callouts.md)。

#### 示例：Admonition（自定义容器）

VitePress 使用的 markdown-it 自定义块语法与 docmd 类似。

**VitePress：**
```markdown
::: info
这是一个 info 提示框。
:::
```

**docmd：**
```markdown
::: info
这是一个 info 提示框。
:::
```

::: callout success "无需任何改动"
VitePress 容器语法**完全无需修改**即可使用。以下别名均已支持：
- `:::tip` → 渲染为 `callout tip`
- `:::warning` → 渲染为 `callout warning`
- `:::danger` → 渲染为 `callout danger`
- `:::info` → 渲染为 `callout info`
- `:::details` → 渲染为 `collapsible`

也支持无空格的写法。您既有的 VitePress 内容在 docmd 中可照常渲染。
:::

## 下一步

- 阅读 docmd 的 [构建与部署](../deployment/index.md) 指南。docmd 并不依赖 Vite 的构建流水线。
- 查看完整的 [docmd 容器](../content/containers/index.md) 列表，了解更多可用的 UI 组件。