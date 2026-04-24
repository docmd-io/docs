---
title: "由 MkDocs 迁移"
description: "将您的 MkDocs (或 Material for MkDocs) 项目迁移到 docmd 的综合指南。"
---

# 由 MkDocs 迁移

MkDocs，特别是结合了 Material 主题，是一个非常受欢迎的基于 Python 的文档生成器。`docmd` 提供类似的以 Markdown 优先的体验，但基于 Node.js/Bun，构建速度极快，且原生支持丰富的交互式功能，无需安装复杂的 Python 扩展。

## 第一步：运行迁移引擎

在您现有的 MkDocs 项目的根目录（即 `mkdocs.yml` 所在的位置）运行以下命令：

```bash
npx @docmd/core migrate --mkdocs
```

### 自动执行的操作

1.  **备份**：您的整个项目会被安全地移动到一个新的 `mkdocs-backup/` 目录中。
2.  **内容迁移**：您的 `docs/` 文件夹会被恢复到根目录，供 `docmd` 使用。
3.  **配置生成**：生成一个 `docmd.config.js` 文件，从您的 `mkdocs.yml` 中提取您的站点 `site_name`。

## 第二步：测试配置

命令完成后，在 `docmd` 中预览您的内容：

```bash
npx @docmd/core dev
```

您的 Markdown 文件将被编译，但导航侧边栏此时为空。

## 第三步：手动配置

MkDocs 使用 `mkdocs.yml` 来定义网站导航和扩展。您需要将这些设置转换至 `docmd`。

### 1. 导航设置

在 MkDocs 中，导航严格定义在 `mkdocs.yml` 的 `nav` 键下。

**所需操作：** 您必须在您的 `docs/` 文件夹内创建一个 `navigation.json` 文件。

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
    "title": "Home",
    "path": "/"
  },
  {
    "title": "Guide",
    "collapsible": true,
    "children": [
      { "title": "Setup", "path": "/setup" },
      { "title": "Usage", "path": "/usage" }
    ]
  }
]
```

### 2. 替换 Python Markdown 扩展

如果您使用了 "Material for MkDocs"，您很可能依赖了 Python Markdown 扩展（如 PyMdown Extensions）来实现标签页、提示框或任务列表。

**所需操作：** 将特定于 MkDocs 扩展的语法转换为 `docmd` 原生的 [容器](/content/containers/callouts)。

#### 示例：转换提示框（Admonitions）

**MkDocs (PyMdown):**
```markdown
!!! note "Optional Title"
    This is an admonition content block.
```

**docmd:**
```markdown
::: note "Optional Title"
This is an admonition content block.
:::
```

#### 示例：转换标签页（Tabs）

**MkDocs (SuperFences):**
```markdown
=== "Tab 1"
    Content for tab 1.

=== "Tab 2"
    Content for tab 2.
```

**docmd:**
```markdown
::: tabs
== tab "Tab 1"
Content for tab 1.

== tab "Tab 2"
Content for tab 2.
:::
```

## 下一步

- `docmd` 具有原生搜索功能。您不需要配置额外的搜索插件。
- 探索 [主题选项](/theming/customization) 从而自定义您的网站颜色，以匹配您之前的 Material 主题。
