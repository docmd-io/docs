---
title: "从 MkDocs 迁移"
description: "一份完整的指南，帮您把 MkDocs（或 Material for MkDocs）项目迁移到 docmd。"
---

# 从 MkDocs 迁移到 docmd

MkDocs 是一款流行的 Python 文档生成器。docmd 同样提供 Markdown 优先的体验，并且基于 Node.js/Bun 构建，可实现极速构建且无需复杂的 Python 扩展。

## 第 1 步：运行迁移引擎

在您现有 MkDocs 项目的根目录下执行以下命令：

```bash
npx @docmd/core migrate --mkdocs
```

### 自动完成的工作

1.  **备份**：整个项目会被安全地移入新建的 `mkdocs-backup/` 目录。
2.  **内容迁移**：把 `docs/` 目录恢复到项目根，供 docmd 使用。
3.  **配置生成**：生成一份 `docmd.config.json`，并从 `mkdocs.yml` 中抽取 `site_name`。

## 第 2 步：验证设置

命令完成后，您可以在 docmd 中预览内容：

```bash
npx @docmd/core dev
```

您的 Markdown 文件将被编译，但导航侧边栏还是空的。

## 第 3 步：手动配置

MkDocs 通过 `mkdocs.yml` 定义站点导航与扩展。您必须手动把这一套映射到 docmd。

### 1. 导航设置

在 MkDocs 中，导航严格定义在 `mkdocs.yml` 的 `nav` 键下。

**待办事项**：在 `docs/` 目录下创建一份 `navigation.json`。

**MkDocs (`mkdocs.yml`)：**
```yaml "mkdocs.yml"
nav:
  - 首页: index.md
  - 指南:
    - 安装: setup.md
    - 使用: usage.md
```

**docmd (`navigation.json`)：**
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

### 2. 替换 Python Markdown 扩展

如果您用过 "Material for MkDocs"，很可能依赖 Python Markdown 扩展来实现 tabs 或 admonition。

**待办事项**：把 MkDocs 的扩展语法转换为 docmd 原生的 [容器](../content/containers/callouts.md)。

#### 示例：转换 Admonition

**MkDocs (PyMdown)：**
```markdown
!!! note "可选标题"
    这是一段 admonition 内容。
```

::: callout warning "需要手动转换"
MkDocs 的 admonition 使用 `!!!` 语法，与 docmd 的 `:::` 语法不同。您必须手动转换，或借助查找替换工具。

**映射关系：**
- `!!! note` → `::: callout info` 或 `:::note`
- `!!! tip` → `::: callout tip` 或 `:::tip`
- `!!! warning` → `::: callout warning` 或 `:::warning`
- `!!! danger` → `::: callout danger` 或 `:::danger`
- `!!! example` → `::: callout info`
:::

**docmd：**
```markdown
::: callout info "可选标题"
这是一段 admonition 内容。
:::
```

#### 示例：转换 Tabs

**MkDocs (SuperFences)：**
```markdown
=== "Tab 1"
    Tab 1 的内容。

=== "Tab 2"
    Tab 2 的内容。
```

**docmd：**
```markdown
::: tabs
== tab "Tab 1"
Tab 1 的内容。

== tab "Tab 2"
Tab 2 的内容。
:::
```

## 下一步

- docmd 自带搜索，无需再额外配置搜索插件。
- 浏览 [主题选项](../theming/customisation.md)，定制颜色以匹配您原本的 Material 主题。
