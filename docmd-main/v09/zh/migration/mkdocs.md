---
title: "从 MkDocs 迁移"
description: "一份完整的指南，帮您把 MkDocs（或 Material for MkDocs）项目迁移到 docmd。"
---

MkDocs 是一款基于 Python 的静态站点生成器。`docmd` 同样提供 Markdown 优先的体验，并且基于 Node.js/Bun 构建，可实现极速编译且无需复杂的 Python 虚拟环境或额外的 pip 依赖。

::: steps

### 1. 运行迁移引擎

在您现有 MkDocs 项目的根目录下运行以下命令：

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core migrate --mkdocs
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core migrate --mkdocs
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core migrate --mkdocs
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core migrate --mkdocs
```
:::

#### 自动处理流程

::: steps

1. **备份**：除 `node_modules`、`.git`、`package.json` 及 lockfile 之外的整个项目目录，会被安全地备份到一个新的 `mkdocs-backup/` 目录中。
2. **内容迁移**：您的 `docs/` 文件夹会被恢复到根目录供 `docmd` 使用。
3. **配置生成**：生成一份 `docmd.config.json`，从 `mkdocs.yml` 中提取您的 `site_name` 和 `site_dir`。
4. **导航自动转换**：`mkdocs.yml` 中的顶层 `nav:` 块会被自动解析并转换为 `docmd` 的 `navigation` 数组格式（包括嵌套的 `children`）。

:::

### 2. 预览迁移产物

在 `docmd` 中立即预览您的内容：

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

### 3. 手动配置与扩展映射

MkDocs 通过 `mkdocs.yml` 定义导航结构与 PyMdown 扩展。请将任何自定义设置转换为 `docmd` 容器。

#### 导航设置

`mkdocs.yml` 中的顶层 `nav:` 块会被自动转换为 `docmd` 的 `navigation` 数组。如果您需要高级导航特性（例如自定义图标或外部 URL），请在 `docs/` 文件夹中创建 `navigation.json`：

```yaml "mkdocs.yml"
nav:
  - 首页: index.md
  - 指南:
    - 安装: setup.md
    - 使用: usage.md
```

```json "navigation.json"
[
  {
    "title": "首页",
    "path": "/"
  },
  {
    "title": "指南",
    "collapsible": true,
    "children": [
      { "title": "安装", "path": "/setup" },
      { "title": "使用", "path": "/usage" }
    ]
  }
]
```

#### 替换 Python Markdown 扩展

将 MkDocs 的 PyMdown 扩展语法转换为 `docmd` 原生的 [容器](../content/containers/callouts.md)。

##### 转换提示框

MkDocs 使用 `!!!` 块语法，需要将其转换为 `:::` 格式。

**MkDocs (PyMdown):**
```markdown
!!! note "可选标题"
    这是一段提示框内容块。
```

**docmd:**
```markdown
::: callout info "可选标题"
这是一段提示框内容块。
:::
```

##### 转换选项卡

**MkDocs (SuperFences):**
```markdown
=== "Tab 1"
    Tab 1 的内容。

=== "Tab 2"
    Tab 2 的内容。
```

**docmd:**
```markdown
::: tabs
== tab "Tab 1"
Tab 1 的内容。

== tab "Tab 2"
Tab 2 的内容。
:::
```

:::

## 下一步

- `docmd` 内置搜索功能。无需额外的搜索插件或外部索引器。
- 探索 [主题选项](../theming/customisation.md) 来自定义颜色和品牌，匹配您之前的主题。