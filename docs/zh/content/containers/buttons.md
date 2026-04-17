---
title: "按钮"
description: "使用单行语法注入面向内部路由或外部资源的行动号召按钮。"
---

按鈕是用于突出导航的高影响力 UI 元素。与块级容器不同，`button` 为**自闭合**类型——在单行上定义，不需要闭合的 `:::` 标签。

## 语法

```markdown
::: button "标签" 路径 [选项]
```

### 选项参考

| 属性 | 格式 | 说明 |
| :--- | :--- | :--- |
| **路径** | `/path/` | 相对项目 URL（自动解析以支持 SPA 导航）。 |
| **外部链接** | `external:URL`| 在新浏览器标签中打开目标 URL（`target="_blank"`）。 |
| **颜色** | `color:VALUE` | 应用背景色（支持 CSS 颜色名称或十六进制代码）。 |

## 使用示例

### 1. 内部导航
使用相对路径确保在 `docmd` SPA 内的无缝零刷新跳转。
```markdown
::: button "安装 docmd" /getting-started/installation
```
::: button "安装 docmd" /getting-started/installation

### 2. 外部资源链接
在 URL 前加 `external:` 以确保安全的外部链接。
```markdown
::: button "查看 GitHub 仓库" external:https://github.com/docmd-io/docmd
```
::: button "查看 GitHub 仓库" external:https://github.com/docmd-io/docmd

### 3. 语义与品牌样式
使用颜色覆盖使按钮与你的品牌标识或语义优先级匹配。
```markdown
::: button "危险操作" /delete color:crimson
::: button "成功确认" /success color:#228B22
```
::: button "危险操作" ./#delete color:crimson
::: button "成功确认" ./#success color:#228B22

## 注意：自闭合逻辑

由于按钮是自闭合的，添加终止 `:::` 行会关闭按钮所在的**父容器**（如卡片或标签页），可能破坏布局。

**错误写法：**
```markdown
::: card "设置"
::: button "开始" /setup
:::        <-- 错误：此处会提前关闭卡片。
:::
```

**正确写法：**
```markdown
::: card "设置"
::: button "开始" /setup
:::        <-- 正确：此处关闭卡片。
```