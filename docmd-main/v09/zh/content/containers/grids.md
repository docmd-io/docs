---
title: "网格 (Grids)"
description: "使用原生 markdown 容器，通过自动调整的响应式列无缝组织布局。"
---

`grids` 提供了一个原生的、由 Markdown 驱动的布局系统。使用 `grids` 容器来并排组织元素。各列会自动平衡可用空间，并在移动视口上垂直堆叠。

## 语法参考

```markdown
::: grids
    ::: grid
        第一列的内容。
    :::
    ::: grid
        第二列的内容。
    :::
:::
```

| 容器 | 描述 |
| :--- | :--- |
| **`::: grids`** | 发起响应式 flexbox 布局的外层包装容器。 |
| **`::: grid`** | 内层列容器。根据需要声明任意数量的 `grid` 块。 |

## 使用示例

### 并排卡片

将 `grids` 与 `cards` 结合使用，在响应式行中呈现多个功能块：

```markdown
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
