---
title: 提示工具容器 (Tooltip Container)
description: 了解如何在 docmd 中使用 ::: tip 提示工具容器渲染行内及块级悬浮提示框与可点击术语解释。
---

`::: tip` 容器（亦可写作 `::: tooltip`）用于在文本行内或块级元素周围渲染交互式悬浮提示框 (Hover Tooltips) 与术语解释。

## 容器语法 (Container Syntax)

```markdown
# 行内提示框模式
::: tip "悬浮说明文字" [term:"显示的术语文本"] [url:"目标链接"] ::: /tip

# 块级提示框模式
::: tip "悬浮说明文字" [url:"目标链接"]
提示容器块内部包裹的内容...
::: /tip
```

## 功能特性与支持属性 (Features & Attributes)

| 参数 / 属性 | 类型 | 描述 |
| :--- | :--- | :--- |
| **悬浮说明文字** | `"String"` | 鼠标悬浮时在浮动提示框中显示的说明文本（第 1 个位置参数或 `text:"..."`）。 |
| **显示的术语** | `term:"String"` | 在正文中渲染显示的术语文本。若省略，默认显示悬浮说明文字。 |
| **目标跳转链接** | `url:URL` | 将提示项转换为可点击的超链接。支持 `external:https://...` 在新标签页打开。 |
| **别名支持** | `::: tip`, `::: tooltip` | 两个容器名称在行内和块级模式下的行为完全一致。 |

## 使用示例 (Usage Examples)

### 行内术语提示框

为技术术语或特性亮点渲染行内悬浮解释：

```markdown
Docmd 采用了 ::: tip "无需复杂的构建配置" term:"Zero-Config" ::: /tip 设计架构。
```

Docmd 采用了 ::: tip "无需复杂的构建配置" term:"Zero-Config" ::: /tip 设计架构。

### 带有跳转链接的提示框

添加 `url:` 属性可在提供悬浮预览的同时将显示术语变为可点击链接：

```markdown
了解更多关于 ::: tip "零配置静态构建引擎" term:"Docmd 架构设计" url:"external:https://github.com/docmd-io/docmd" ::: /tip 的信息。
```

了解更多关于 ::: tip "零配置静态构建引擎" term:"Docmd 架构设计" url:"external:https://github.com/docmd-io/docmd" ::: /tip 的信息。

### 块级提示框包裹器

在块级提示框中包裹多行文本或标题：

```markdown
::: tip "交互式图表 UI 壳"
将鼠标悬浮在此区块上即可查看图表 UI 壳的上下文说明。
::: /tip
```

::: tip "交互式图表 UI 壳"
将鼠标悬浮在此区块上即可查看图表 UI 壳的上下文说明。
::: /tip