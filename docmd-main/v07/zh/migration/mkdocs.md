---
title: "从 MkDocs 迁移"
description: "关于将你的 MkDocs (或 Material for MkDocs) 项目转移到 docmd 的综合指南。"
---

# 从 MkDocs 迁移到 docmd

MkDocs，特别是配合 Material 主题，是一个流行的基于 Python 的文档生成器。`docmd` 提供了类似的 Markdown 优先体验，但它依赖于 Node.js/Bun 以实现极快的构建速度和丰富的交互功能，而无需复杂的 Python 扩展。

## 第 1 步：运行迁移引擎

在现有 MkDocs 项目的根目录（即 `mkdocs.yml` 所在的位置）运行以下命令：

```bash
npx @docmd/core migrate --mkdocs
```

### 自动发生的更改

1.  **备份**: 你的整个项目会被安全地移动到一个新的 `mkdocs-backup/` 目录中。
2.  **内容迁移**: 你的 `docs/` 文件夹将被恢复到根目录，供 `docmd` 使用。
3.  **配置生成**: 生成一个 `docmd.config.js` 文件，从你的 `mkdocs.yml` 中提取站点名称 (`site_name`)。

## 第 2 步：测试设置

命令完成后，在 `docmd` 中预览你的内容：

```bash
npx @docmd/core dev
```

你的 Markdown 文件将会编译，但你的导航侧边栏将是空的。

## 第 3 步：手动配置

MkDocs 使用 `mkdocs.yml` 来定义站点导航和扩展。你需要将这些设置转换为 `docmd`。

### 1. 导航设置

在 MkDocs 中，导航严格定义在 `mkdocs.yml` 的 `nav` 键中。

**所需操作：** 你必须在 `docs/` 文件夹内创建一个 `navigation.json` 文件。

**MkDocs (`mkdocs.yml`):**
```yaml
nav:
  - Home: index.md
  - Guide:
    - Setup: setup.md
    - Usage: usage.md
```

**docmd (`navigation.json`):**
```json
[
  {
    "title": "首页",
    "path": "/"
  },
  {
    "title": "指南",
    "collapsible": true,
    "children": [
      { "title": "安装设置", "path": "/setup" },
      { "title": "使用方法", "path": "/usage" }
    ]
  }
]
```

### 2. 替换 Python Markdown 扩展

如果你使用了 "Material for MkDocs"，你可能依赖于 Python Markdown 扩展（如 PyMdown Extensions）来实现选项卡、提示框或任务列表。

**所需操作：** 将 MkDocs 特有的扩展语法转换为 `docmd` 原生的 [容器](../content/containers/callouts.md)。

#### 示例：转换提示框 (Admonitions)

**MkDocs (PyMdown):**
```markdown
!!! note "可选标题"
    这是一个提示框内容块。
```

**docmd:**
```markdown
::: callout info "可选标题"
这是一个提示框内容块。
:::
```

#### 示例：转换选项卡 (Tabs)

**MkDocs (SuperFences):**
```markdown
=== "选项卡 1"
    选项卡 1 的内容。

=== "选项卡 2"
    选项卡 2 的内容。
```

**docmd:**
```markdown
::: tabs
== tab "选项卡 1"
选项卡 1 的内容。

== tab "选项卡 2"
选项卡 2 的内容。
:::
```

## 后续步骤

- `docmd` 具有原生搜索功能。你不需要配置搜索插件。
- 探索 [主题选项](../theming/customization.md) 来自定义网站颜色，以匹配你旧的 Material 主题。
