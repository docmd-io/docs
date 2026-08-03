---
title: "标签"
description: "使用标签容器来标记版本、状态，或在内联中高亮显示短文本片段。"
---

`tag` 容器是一个自闭合组件，可在行内插入小型胶囊形徽章。标签在各处都保持其紧凑比例 —— 它们不会继承标题尺寸或周围文本样式。

## 语法参考

```markdown
::: tag "Label text" [property:value...]
```

| 参数 | 类型 | 说明 |
| :--- | :--- | :--- |
| **标签** | `"String"` | 显示在胶囊形徽章内的文字。 |
| **颜色** | `color:VALUE` | 应用背景颜色（支持 CSS 名称或十六进制代码）。自动计算对比文字颜色。 |
| **图标** | `icon:NAME` | 在徽章内添加一个 [Lucide](external:https://lucide.dev/icons) 图标。 |
| **URL** | `url:URL` | 将标签设为可点击的超链接。加 `external:` 前缀可强制在新标签页中打开。沿用 [按钮](button) 的 URL 不加引号约定。 |

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
::: tag "Deprecated" color:#ef4444
::: tag "Beta" color:#eab308
::: tag "Stable" color:#22c55e
::: tag "Verified" icon:check-circle color:#10b981
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
::: tag "GitHub" icon:github url:external:https://github.com/docmd-io/docmd
```

::: tag "GitHub" icon:github url:external:https://github.com/docmd-io/docmd