---
title: "从 VitePress 迁移"
description: "一份完整的指南，帮您把 VitePress 项目迁移到 docmd。"
---

VitePress 是一款基于 Vue 的静态站点生成器。`docmd` 在保持极速运行的同时，不包含任何客户端 JavaScript 框架开销，消除了 Vue 水合（hydration）延迟。

::: steps

### 1. 运行迁移引擎

在您现有 VitePress 项目的根目录下运行以下命令：

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core migrate --vitepress
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core migrate --vitepress
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core migrate --vitepress
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core migrate --vitepress
```
:::

#### 自动处理流程

::: steps

1. **备份**：除 `node_modules`、`.git`、`package.json` 及 lockfile 之外的整个项目目录，会被安全地备份到一个新的 `vitepress-backup/` 目录中。
2. **内容迁移**：您的 `docs/` 文件夹（或根目录 Markdown 文件）会被恢复到项目根目录。隐藏的 `.vitepress` 配置目录会被剥离以避免冲突。
3. **配置生成**：生成一份 `docmd.config.json`，从 `.vitepress/config.js`、`ts` 或 `mjs` 中提取您的站点 `title`。

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

VitePress 在 JavaScript 配置模块中配置导航，并允许嵌入 Vue 组件。请将这些转换为 `docmd` 容器。

#### 导航设置

VitePress 在 `themeConfig.sidebar` 中使用对象数组。请在 `docs/` 目录中创建 `navigation.json`：

**VitePress (`.vitepress/config.js`):**
```javascript
themeConfig: {
  sidebar: [
    {
      text: "指南",
      items: [
        { text: "简介", link: "/introduction" },
        { text: "快速开始", link: "/getting-started" }
      ]
    }
  ]
}
```

**docmd (`navigation.json`):**
```json
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

#### 替换 Vue 组件与容器语法

由于 `docmd` 不在客户端执行 Vue，请将自定义组件替换为 `docmd` [容器](../content/containers/callouts.md)。

VitePress 提示框容器 **开箱即用**，无需修改：
- `:::tip` → 渲染为 `callout tip`
- `:::warning` → 渲染为 `callout warning`
- `:::danger` → 渲染为 `callout danger`
- `:::info` → 渲染为 `callout info`
- `:::details` → 渲染为 `collapsible`

::: callout success "零修改要求" icon:check-circle
VitePress 容器语法受原生支持。已有的提示框块和可折叠 details 章节无需编辑 Markdown 文件即可正确渲染。
:::

:::

## 下一步

- 探索 `docmd` 的 [部署指南](../deployment/index.md) 以设置 GitHub Actions、Vercel、Netlify 或 Docker 构建。
- 查看完整的视觉 [容器](../content/containers/index.md) 集合。