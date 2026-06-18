---
title: "按钮"
description: "在文档中直接注入清晰、高度可见的号召性用语 (call-to-action)。"
---

按钮是用于导航和号召性用语的交互组件。它们可以指向内部文档页面或外部资源。

## 语法参考

```markdown
::: button "Label text" target_url [property:value...]
```

| 参数 | 类型 | 说明 |
| :--- | :--- | :--- |
| **路径** | `/path/` | 相对项目 URL。在 SPA 导航中会自动解析。 |
| **外部** | `external:URL`| 在新浏览器标签页中打开目标 URL（`target="_blank"`）。 |
| **颜色** | `color:VALUE` | 应用背景颜色（支持 CSS 名称或十六进制代码）。 |
| **图标** | `icon:NAME` | 在标签前添加一个 [Lucide](external:https://lucide.dev/icons) 图标。 |

## 示例

### 内部导航

使用相对的 Markdown 路径，以确保在 docmd SPA 内无缝过渡。

```markdown
::: button "Install docmd" ../../getting-started/installation.md
```

::: button "Install docmd" ../../getting-started/installation.md

### 外部资源链接

在 URL 前加 `external:` 前缀，可强制链接在新标签页中打开。

```markdown
::: button "View GitHub Repository" external:https://github.com/docmd-io/docmd
```

::: button "View GitHub Repository" external:https://github.com/docmd-io/docmd

### 样式与图标

使用颜色覆盖和 Lucide 图标，将按钮与您的品牌形象匹配，以增强视觉清晰度。

```markdown
::: button "Success Confirmation" ./#success color:#228B22
::: button "Danger Action" ./#delete color:crimson icon:alert-circle
::: button "View Source" external:https://github.com/docmd-io/docmd icon:github
```

::: button "Success Confirmation" ./#success color:#228B22
::: button "Danger Action" ./#delete color:crimson icon:alert-circle
::: button "View Source" external:https://github.com/docmd-io/docmd icon:github

## 关键注意：自闭合逻辑

按钮是自闭合的。在按钮之后紧接一行终止 `:::` 会终止**父容器**（例如 Card 或 Tab），可能破坏您的布局。

**错误的写法：**
```markdown
::: card "Setup"
    ::: button "Begin" ../../setup.md
    :::        <-- 错误：这会过早关闭 Card。
:::
```

**正确的写法：**
```markdown
::: card "Setup"
    ::: button "Begin" ../../setup.md
:::        <-- 正确：这能干净地关闭 Card。
```