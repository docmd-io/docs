---
title: "可扩展的技术写作"
description: "如何借助渐进呈现 (Progressive Disclosure) 与结构化容器管理日益复杂的文档，又不让用户被淹没。"
---

## 问题

在初期，一个特性只用寥寥几段就能说清。但随着产品演进，这几段会被各种边界情况、平台差异与复杂选项淹没。结果就是"纵向臃肿"——整页变成读不下去的文字墙。

## 为什么重要

纵向臃肿会摧毁理解力，并推高认知负担。当用户在一堆无关内容里上下滚动时，他们会感到信息过载，甚至以为产品比实际更复杂。可扩展的写作能确保用户在任意时刻只看当下所需的信息。

## 方法

采用 **渐进呈现 (Progressive Disclosure)**：先把最关键的信息（"愉快路径 / Happy Path"）摆出来，把复杂、技术性强或细节化的内容藏在可交互的 UI 结构背后。docmd 提供了多种专门为应对这种复杂度而设计的内置容器。

## 实现

### 1. 使用 Tabs 处理差异

与其按顺序罗列多种包管理器的指令，不如使用 [Tabs 容器](../../content/containers/tabs.md)。用户能选择自己所用的环境，无关命令立刻隐藏，从而显著降低视觉噪声。

````markdown
::: tabs

    == tab "npm"
        ```bash
        npm install docmd
        ```

    == tab "pnpm"
        ```bash
        pnpm add docmd
        ```
:::
````

### 2. 使用 Collapsible 处理边缘情况

若某个排错步骤只对少数用户适用，不要让它打断主教程的逻辑流。可使用 [Collapsible 容器](../../content/containers/collapsible.md) 把它"埋"起来，又仍然可达。

```markdown
1. 通过运行 `npx @docmd/core dev` 启动开发服务器。

::: collapsible "故障排查：端口已被占用"
如果您遇到 `EADDRINUSE` 错误，可通过 `--port` 参数指定自定义端口：`npx @docmd/core dev --port 4000`。
:::
```

### 3. 使用 Callout 渐进展开细节

使用 [标注 (Callout)](../../content/containers/callouts.md) 提供不属于主要任务、但对进阶用户很有价值的补充上下文。

## 取舍

把内容藏到 Tabs 或 Collapsibles 里，偶尔会让用户难以通过浏览器的原生 `Ctrl+F` 搜索找到它们。不过 docmd 内置的 [搜索引擎](../../plugins/search.md) 会对这些容器内的全部内容建索引，既能让用户准确找到所需，又保持了清爽的阅读体验。