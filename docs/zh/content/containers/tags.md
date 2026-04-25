---
title: "标签 (Tags)"
description: "使用标签容器无缝地在内联文本中标记版本、状态或突出显示简短文本。"
---

`tag`（标签）容器是一个自闭合组件，用于直接在您的文本中插入药丸状的小徽章。与块级容器不同，标签不会继承标题等父元素的巨大尺寸——无论放在哪里，它们都会保持紧凑、干净的比例。

## 基本用法

要创建一个基本的标签，只需提供您想要显示的文本即可：

::: tabs

== tab "预览"
此功能在 ::: tag "v0.7.4" 中添加，并且运行完美。
== tab "Markdown 源码"
````markdown
此功能在 ::: tag "v0.7.4" 中添加，并且运行完美。
````

:::

## 自定义颜色

您可以使用 `color:` 属性提供任何有效的 CSS 颜色字符串（例如 `#ff0000`、`blue` 或 `hsl(...)`）来覆盖默认的标签样式。`docmd` 会自动计算出精美的带有色彩的背景，以及完美对比的文本和边框！

::: tabs

== tab "预览"
::: tag "已废弃" color:#ef4444
::: tag "测试版" color:#eab308
::: tag "稳定版" color:#22c55e
== tab "Markdown 源码"
````markdown
::: tag "已废弃" color:#ef4444
::: tag "测试版" color:#eab308
::: tag "稳定版" color:#22c55e
````

:::

## 添加图标

就像按钮和引言块一样，您可以通过 `icon:` 属性轻松附加来自 `docmd` 图标库的图标。

::: tabs

== tab "预览"
::: tag "已验证" icon:check-circle color:#10b981
== tab "Markdown 源码"
````markdown
::: tag "已验证" icon:check-circle color:#10b981
````

:::

## 链接标签

如果需要您的标签充当超链接（例如，将版本标签直接链接到其发布说明），您可以使用 `link:` 属性。系统会自动检测外部链接并在新标签页中打开。

::: tabs

== tab "预览"
查看最新的 ::: tag "发布说明" icon:external-link link:/release-notes/0-7-4
== tab "Markdown 源码"
````markdown
查看最新的 ::: tag "发布说明" icon:external-link link:/release-notes/0-7-4
````

:::

## 在标题中使用标签

由于标签是纯内联元素，因此当它们用于标记主标题时，看起来非常华丽。它们会自动与基线对齐，而不会继承标题巨大的字体大小。

::: tabs

== tab "预览"
# 搜索过滤 ::: tag "新功能" color:#8b5cf6
== tab "Markdown 源码"
````markdown
# 搜索过滤 ::: tag "新功能" color:#8b5cf6
````

:::
