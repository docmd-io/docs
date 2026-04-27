---
title: "标签 (Tags)"
description: "使用标签容器在行内无缝标注版本、状态或突出显示短文本片段。"
---

`tag` 容器是一个自闭合组件，用于直接在文本中插入小巧的药丸状徽章。与块容器不同，标签不会继承父元素（如标题）的巨大尺寸，无论放置在哪里，它们都会保留紧凑、整洁的比例。

## 基本用法

要创建一个基本标签，只需提供你想要显示的文本：

::: tabs
    == tab "预览"
        此功能已在 ::: tag "v0.7.4" color:blue 中添加，且运行完美。
    == tab "Markdown 源码"
        ```markdown
        此功能已在 ::: tag "v0.7.4" 中添加，且运行完美。
        ```
:::

## 自定义颜色

你可以通过提供任何有效的 CSS 颜色字符串（例如 `#ff0000`、`blue` 或 `hsl(...)`），使用 `color:` 属性来覆盖默认的标签样式。`docmd` 会自动计算出精美的淡色背景，并配以对比完美的文本和边框！

::: tabs

== tab "预览"
::: tag "已弃用" color:#ef4444
::: tag "Beta" color:#eab308
::: tag "稳定版" color:#22c55e
== tab "Markdown 源码"
````markdown
::: tag "已弃用" color:#ef4444
::: tag "Beta" color:#eab308
::: tag "稳定版" color:#22c55e
````

:::

## 添加图标

就像按钮和标注一样，你可以使用 `icon:` 属性轻松附加来自 `docmd` 图标库的图标。

::: tabs

== tab "预览"
::: tag "已验证" icon:check-circle color:#10b981
== tab "Markdown 源码"
````markdown
::: tag "已验证" icon:check-circle color:#10b981
````

:::

## 链接标签

如果你需要标签充当超链接（例如，将版本标签直接链接到其发布说明），可以使用 `link:` 属性。外部链接会被自动检测并在新标签页中打开。

::: tabs

== tab "预览"
查看最新的 ::: tag "发行说明" icon:external-link link:/release-notes/0-7-4
== tab "Markdown 源码"
````markdown
查看最新的 ::: tag "发行说明" icon:external-link link:/release-notes/0-7-4
````

:::

## 在标题中使用标签

因为标签是真正的行内元素，所以当用于标记主标题时，它们看起来非常华丽。它们会自动对齐到基线，而不会继承标题巨大的字体大小。

::: tabs

== tab "预览"
# 搜索过滤 ::: tag "新" color:#8b5cf6
== tab "Markdown 源码"
````bash
# 搜索过滤 ::: tag "新" color:#8b5cf6
````

:::
