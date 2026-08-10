---
title: "网格 (Grids)"
description: "使用原生 markdown 容器，通过自动调整的响应式列无缝组织布局。"
---

`grids` 提供了一个原生的、由 Markdown 驱动的布局系统。使用 `grids` 容器来并排组织元素。各列会自动平衡可用空间，并在移动视口上垂直堆叠。

## 容器语法 (Container Syntax)

```markdown
::: grids # 外层 Flexbox 网格包装器开启
    ::: grid # 内层列容器开启
        第 1 列内容（卡片、文本、按钮、代码块）...
    ::: /grid # 显式列闭合

    ::: grid # 第 2 列开启
        第 2 列内容...
    ::: /grid
::: /grids # 显式包装器闭合
```

## 功能特性与支持属性 (Features & Attributes)

| 容器 / 元素 | 类型 | 描述 |
| :--- | :--- | :--- |
| **`::: grids`** | 外层容器 | 包装器，发起响应式 Flexbox 网格布局。 |
| **`::: grid`** | 子容器 | 列容器。在 `grids` 内部声明多个 `grid` 块。 |
| **Flex 弹性分布** | 响应式 | 在桌面端水平平衡分布，在移动端自动垂直堆叠。 |
| **闭合标签** | `::: /grids`, `::: /grid`, `:::` | 支持显式命名闭合标签或通用 `:::` 闭合标记。 |

::: callout info "v0.9.1+ 容器语法标准化" icon:sparkles
自 **v0.9.1** 起，`docmd` 引入了显式的容器开启与闭合标签（例如 `::: card` ... `::: /card`、`::: tab` ... `::: /tab`）、显式的键值对属性（`title:"..."`、`url:"..."`）以及末尾的 `# 注释`。推荐在编写新文档时采用此现代语法。同时，对传统子块标记（`== tab`、`1.`）和位置参数退避逻辑的向下兼容将被严格保留。
:::


## 使用示例

### 并排卡片

将 `grids` 与 `cards` 结合使用，在响应式行中呈现多个功能块：

```markdown
::: grids
    ::: grid
        ::: card title:"速度" icon:zap
        建立在异步非阻塞 I/O 引擎上，以获得最大性能。
        ::: /card
    ::: /grid
    ::: grid
        ::: card title:"可扩展性" icon:layers
        专为大型 monorepos 和多项目工作区而设计。
        ::: /card
    ::: /grid
::: /grids
```

::: grids
    ::: grid
        ::: card "速度" icon:zap
        建立在异步非阻塞 I/O 引擎上，以获得最大性能。
        :::
    :::
    ::: grid
        ::: card "可扩展性" icon:layers
        专为大型 monorepos 和多项目工作区而设计。
        :::
    :::
:::

### 三列布局

添加第三个 `grid` 块以创建三行列：

```markdown
::: grids
    ::: grid
        ::: card title:"搜索引擎" icon:search
        内置全文搜索索引器。
        ::: /card
    ::: /grid
    ::: grid
        ::: card title:"多语言" icon:globe
        多语言目录路由与本地化搜索索引。
        ::: /card
    ::: /grid
    ::: grid
        ::: card title:"主题引擎" icon:palette
        内置深色模式与完整的 CSS 变量自定义。
        ::: /card
    ::: /grid
::: /grids
```

::: grids
    ::: grid
        ::: card "搜索引擎" icon:search
        内置全文搜索索引器。
        :::
    :::
    ::: grid
        ::: card "多语言" icon:globe
        多语言目录路由与本地化搜索索引。
        :::
    :::
    ::: grid
        ::: card "主题引擎" icon:palette
        内置深色模式与完整的 CSS 变量自定义。
        :::
    :::
:::

::: callout tip "清晰的结构信号" icon:lightbulb
`grids` 容器纯粹在 Markdown 中维护布局结构。这消除了原生 HTML 冗余，并确保 AI 上下文索引器清晰地解析并排的关联信号。
:::
