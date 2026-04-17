---
title: "网格"
description: "使用原生 Markdown 容器通过自动调整的响应式栏列无缝组织布局。"
---

Grids provide a native, markdown-driven layout system in `docmd`. Instead of writing manual HTML wrappers, you can leverage the `grids` container to structure elements side-by-side. 

列会自动调整宽度以填充可用空间，并在小屏幕（移动设备）上逻辑性地垂直堆叠。

## 语法参考

```markdown
::: grids
::: grid
#### 组件 A
左侧内容。
:::
::: grid
#### 组件 B
右侧内容。
:::
:::
```

## 实际应用示例

### 1. 并排展示功能
使用栅格并排展示主要功能，例如将结构卡片与信息块组合。

```markdown
::: grids
::: grid
::: card "速度 :rocket:"
基于非阻塞 I/O 管道，实现最大性能。
:::
:::
::: grid
::: card "可扩展性 :zap:"
专为大型 Monorepo 和庞大项目结构设计。
:::
:::
:::
```

::: grids
::: grid
::: card "速度 :rocket:"
基于非阻塞 I/O 管道，实现最大性能。
:::
:::
::: grid
::: card "可扩展性 :zap:"
专为大型 Monorepo 和庞大项目结构设计。
:::
:::
:::

### 2. 布局均衡
栅格会根据可用内容自动计算每列的最优宽度（在超宽屏幕上每行最多 4 项），并在窄视口上无缝分组成行。

::: callout tip "语义布局"
使用 `grids` 容器让你的文档结构完全以 Markdown 编写，生成更简洁的源文件，并确保 LLM 能完美理解你的结构关系！
:::
