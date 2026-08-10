---
title: "标签"
description: "使用标签容器来标记版本、状态，或在内联中高亮显示短文本片段。"
---

`tag` 容器是一个自闭合组件，可在行内插入小型胶囊形徽章。标签在各处都保持其紧凑比例 —— 它们不会继承标题尺寸或周围文本样式。

## 容器语法 (Container Syntax)

```markdown
::: tag [title:"徽章文本"] [color:css颜色|hex_code] [icon:图标名称] [url:[external:]地址]
```

## 功能特性与支持属性 (Features & Attributes)

| 参数 / 属性 | 类型 | 描述 |
| :--- | :--- | :--- |
| **徽章文本** | `"String"` \| `title:"..."` | 显示在胶囊形徽章内的文字（第 1 位置参数或 `title:"..."`）。 |
| **背景颜色** | `color:数值` | 应用背景颜色（CSS 名称或十六进制）。自动计算对比文字颜色。 |
| **图标支持** | `icon:名称` | 在徽章内添加 [Lucide](external:https://lucide.dev/icons) 图标。 |
| **超链接 URL** | `url:URL` | 将标签转换为链接。添加 `external:` 前缀可在新标签页中打开。 |

::: callout info "v0.9.1+ 容器语法标准化" icon:sparkles
自 **v0.9.1** 起，`docmd` 引入了显式的容器开启与闭合标签（例如 `::: card` ... `::: /card`、`::: tab` ... `::: /tab`）、显式的键值对属性（`title:"..."`、`url:"..."`）以及末尾的 `# 注释`。推荐在编写新文档时采用此现代语法。同时，对传统子块标记（`== tab`、`1.`）和位置参数退避逻辑的向下兼容将被严格保留。
:::


## 示例

### 版本徽章

使用彩色标签内联标记某功能的引入版本。

```markdown
This feature was added in ::: tag "v0.8.2" color:blue and works perfectly.
```

This feature was added in ::: tag "v0.8.2" color:blue and works perfectly.

### 状态标签

使用标签在整个页面中标记状态。颜色完全可定制。

```markdown
::: tag title:"Deprecated" color:#ef4444
::: tag title:"Beta" color:#eab308
::: tag title:"Stable" color:#22c55e
::: tag title:"Verified" icon:check-circle color:#10b981
```

::: tag "Deprecated" color:#ef4444
::: tag "Beta" color:#eab308
::: tag "Stable" color:#22c55e
::: tag "Verified" icon:check-circle color:#10b981

### 可链接标签

添加 `url:` 让标签充当超链接，便于交叉引用发布说明或外部资源。值不加引号，与 [按钮](buttons.md) 的约定保持一致。

```markdown
Check out the latest ::: tag "Release Notes" icon:external-link url:/zh/release-notes/0-8-2.md
```

Check out the latest ::: tag "Release Notes" icon:external-link url:/zh/release-notes/0-8-2.md

### 外部链接

在 URL 前加 `external:` 前缀，强制链接在新标签页中打开，即使目标位于你自己的域名下。

```markdown
::: tag title:"GitHub" icon:github url:external:https://github.com/docmd-io/docmd
```

::: tag "GitHub" icon:github url:external:https://github.com/docmd-io/docmd