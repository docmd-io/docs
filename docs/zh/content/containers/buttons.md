---
title: "按钮 (Buttons)"
description: "通过单行语法注入用于内部路由或外部资源的呼吁操作按钮。"
---

按钮是用于突出导航的高影响力 UI 元素。与块容器不同，`button` 是 **自闭合的** —— 它定义在单行上，不需要结束标签 `:::`。

## 语法

```markdown
::: button "标签" 路径 [选项]
```

### 选项参考

| 属性 | 格式 | 描述 |
| :--- | :--- | :--- |
| **路径 (Path)** | `/path/` | 相对项目 URL（会自动解析以用于 SPA 导航）。 |
| **外部 (External)** | `external:URL`| 在新的浏览器标签页中打开目标 URL (`target="_blank"`)。 |
| **颜色 (Color)** | `color:VALUE` | 应用背景颜色（支持 CSS 名称或十六进制代码）。 |
| **图标 (Icon)** | `icon:NAME` | 在按钮标签前添加 [Lucide](external:https://lucide.dev/icons) 图标。 |

## 使用示例

### 1. 内部导航
使用相对路径以确保在 `docmd` SPA 中实现无缝、零刷新的切换。
```markdown
::: button "安装 docmd" /getting-started/installation
```
::: button "安装 docmd" /getting-started/installation

### 2. 外部资源链接
在 URL 前面加上 `external:` 以确保安全的外部链接。
```markdown
::: button "查看 GitHub 仓库" external:https://github.com/docmd-io/docmd
```
::: button "查看 GitHub 仓库" external:https://github.com/docmd-io/docmd

### 3. 语义与品牌样式
使用颜色覆盖来使按钮符合你的品牌标识或语义优先级。
```markdown
::: button "危险操作" /delete color:crimson
::: button "成功确认" /success color:#228B22
```
::: button "危险操作" ./#delete color:crimson
::: button "成功确认" ./#success color:#228B22

### 4. 带有图标的按钮
添加 Lucide 图标以增强视觉清晰度。
```markdown
::: button "开始使用" /getting-started/installation icon:arrow-right
::: button "查看源码" external:https://github.com/docmd-io/docmd icon:github
```
::: button "开始使用" /getting-started/installation icon:arrow-right
::: button "查看源码" external:https://github.com/docmd-io/docmd icon:github

## 关键提示：自闭合逻辑

由于按钮是自闭合的，添加结尾的 `:::` 行将终止按钮所在的 **父容器**（例如 Card 或 Tab），这可能会破坏你的布局。

**不正确的序列：**
```markdown
::: card "设置"
    ::: button "开始" /setup
    :::        <-- 错误：这将提前关闭 Card。
:::
```

**正确的序列：**
```markdown
::: card "设置"
    ::: button "开始" /setup
:::        <-- 正确：这将关闭 Card。
```