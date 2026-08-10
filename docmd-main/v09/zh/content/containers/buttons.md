---
title: "按钮"
description: "在文档中直接注入清晰、高度可见的号召性用语 (call-to-action)。"
---

按钮是用于导航和号召性用语的交互组件。它们可以指向内部文档页面或外部资源。

## 容器语法 (Container Syntax)

```markdown
# 独立单行按钮模式
::: button ["按钮文本"] ["目标URL" | url:"目标URL"] [icon:图标名称] [color:#十六进制颜色|CSS颜色] [::: /button]

# 显式键值对模式
::: button title:"按钮文本" url:"目标URL" icon:图标名称 color:#十六进制颜色 [::: /button]

# 句中行内按钮模式
点击 ::: button title:"按钮文本" url:"目标URL" icon:图标名称 ::: /button 继续操作。
```

## 功能特性与支持属性 (Features & Attributes)

| 参数 / 属性 | 类型 | 描述 |
| :--- | :--- | :--- |
| **标题 / 文本** | `"String"` \| `title:"..."` | 按钮内部显示的文本标签（第 1 个位置参数或 `title:"..."`）。 |
| **目标 URL** | `"URL"` \| `url:URL` | 导航跳转目标（第 2 个位置参数或 `url:"..."`）。支持相对 SPA 路径、mailto、tel 或外部链接。 |
| **外部链接** | `external:URL` | 在新浏览器标签页中打开目标链接（`target="_blank"` 并带 `rel="noopener noreferrer"`）。 |
| **背景颜色** | `color:VALUE` | 自定义背景与边框颜色（支持 CSS 颜色名称或 Hex 十六进制代码）。 |
| **图标显示** | `icon:NAME` | 在文本标签前插入一个 [Lucide](external:https://lucide.dev/icons) 图标。 |
| **自闭合与行内** | `::: /button` \| `:::` | 默认单行自闭合；在句中行内使用时，可通过 `::: /button` 显式闭合。 |

::: callout info "v0.9.1+ 容器语法标准化" icon:sparkles
自 **v0.9.1** 起，`docmd` 引入了显式的容器开启与闭合标签（例如 `::: card` ... `::: /card`、`::: tab` ... `::: /tab`）、显式的键值对属性（`title:"..."`、`url:"..."`）以及末尾的 `# 注释`。推荐在编写新文档时采用此现代语法。同时，对传统子块标记（`== tab`、`1.`）和位置参数退避逻辑的向下兼容将被严格保留。
:::

## 示例

### 内部导航

使用相对的 Markdown 路径，以确保在 docmd SPA 内无缝过渡。

```markdown
::: button title:"Install docmd" url:"../../getting-started/installation.md"
```

::: button "Install docmd" ../../getting-started/installation.md

### 外部资源链接

在 URL 前加 `external:` 前缀，可强制链接在新标签页中打开。

```markdown
::: button title:"View GitHub Repository" url:"external:https://github.com/docmd-io/docmd"
```

::: button "View GitHub Repository" external:https://github.com/docmd-io/docmd

### 样式与图标

使用颜色覆盖和 Lucide 图标，将按钮与您的品牌形象匹配，以增强视觉清晰度。

```markdown
::: button title:"Success Confirmation" url:"./#success" color:#228B22
::: button title:"Danger Action" url:"./#delete" color:crimson icon:alert-circle
::: button title:"View Source" url:"external:https://github.com/docmd-io/docmd" icon:github
```

::: button "Success Confirmation" ./#success color:#228B22
::: button "Danger Action" ./#delete color:crimson icon:alert-circle
::: button "View Source" external:https://github.com/docmd-io/docmd icon:github

### 句中行内按钮示例

按钮可以在段落句子内部作为行内元素使用：

```markdown
点击 ::: button title:"下载 v0.9.1" url:"https://docmd.io" icon:download ::: /button 开启使用！
```

点击 ::: button "下载 v0.9.1" https://docmd.io icon:download ::: /button 开启使用！