---
title: "Mermaid 图表"
description: "使用显式 ::: mermaid 容器或标准 Markdown 代码块渲染流程图、时序图与架构映射图。"
---

`docmd` 内置支持通过 **Mermaid** 渲染高保真图表。文档作者既可选择使用 `::: mermaid` 容器实现单图表的高级定制，也可使用标准 Markdown 代码块保持通用兼容性。

::: callout info "v0.9.1+ 容器语法标准化" icon:sparkles
自 **v0.9.1** 起，`docmd` 引入了显式的容器开启与闭合标签（例如 `::: mermaid` ... `::: /mermaid`）、显式的键值对属性（`title:"..."`、`align:center`）以及末尾的 `# 注释`。推荐在编写新文档时采用此现代语法。同时，对标准 ` ```mermaid ` 代码块及全局插件配置的向下兼容将被严格保留。
:::

## 概述与混合架构设计

`docmd` 为图表渲染提供了灵活的混合架构支持：

1. **`::: mermaid` 容器语法（推荐高级 UI 使用）**：支持针对单个图表配置标题、图标、对齐方式、缩放控件以及主题覆盖。
2. **标准 ` ```mermaid ` 代码块语法（GFM 退避逻辑）**：100% 兼容 GitHub、IDE 预览窗口及标准 Markdown 解析器，并自动应用 `docmd.config.json` 中定义的全局配置。

## 1. 容器语法 (`::: mermaid`)

`::: mermaid` 容器提供了对单个图表展示形式的精细控制。

### 参考语法

```markdown
::: mermaid title:"标题文本" icon:图标名称 align:center|left|right zoom:true|false theme:主题名称 # 可选注释
graph TD
    A[开始] --> B[处理]
::: /mermaid
```

### 包含标题的基础流程图

```markdown
::: mermaid title:"应用生命周期" icon:refresh-cw align:center # 生命周期图表
graph TD
    A[Init] --> B[Parse Markdown]
    B --> C[Inject Assets]
    C --> D[Render HTML]
::: /mermaid
```

### 带有控制控件的时序图

```markdown
::: mermaid title:"OAuth2 令牌流向" icon:shield-check align:center zoom:true # 时序流程
sequenceDiagram
    autonumber
    Client->>AuthServer: POST /token
    AuthServer-->>Client: 200 OK (Access Token)
::: /mermaid
```

### 核心属性说明

| 属性 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `""` | 在图表上方显示的可选标题。 |
| `icon` | `string` | `""` | 标题旁边显示的图标（例如 `icon:git-branch`）。 |
| `align` | `string` | `"center"` | 容器对齐方式：`left`、`center` 或 `right`。 |
| `zoom` | `boolean` | `true` | 是否启用交互式平移与缩放控件。 |
| `theme` | `string` | `""` | 针对单个图表覆盖主题（`default`、`dark`、`forest`、`neutral`）。 |

## 2. 标准代码块退避逻辑（GFM 兼容性）

为确保在 GitHub Markdown 预览及其他 Git 平台上的通用兼容性，可直接使用标准代码块：

````markdown
```mermaid
graph LR
    A[代码库] --> B[构建流水线] --> C[自动化部署]
```
````

使用代码块渲染的图表将自动继承 `docmd.config.json` 中 `plugins.mermaid` 的全局设置。

## 全局插件配置

可以在项目配置文件中统一指定全局默认设置：

```json
{
  "plugins": {
    "mermaid": {
      "theme": "default",
      "darkTheme": "dark",
      "zoom": true
    }
  }
}
```

有关插件安装与静态资源引入的完整细节，请参阅 [@docmd/plugin-mermaid 参考文档](../../plugins/mermaid.md)。