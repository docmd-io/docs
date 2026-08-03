---
title: "步骤"
description: "将标准有序列表转化为高冲击力的可视化时间线和教程。"
---

`steps` 容器将标准 Markdown 有序列表转化为带编号的垂直时间线。专为技术教程和顺序操作指南设计。

::: callout info "无空格语法"
`::: steps` 和 `:::steps`（无空格）均原生支持，使用你喜欢的风格即可。
:::

## 语法参考

```markdown
::: steps

1. **步骤标题**
   步骤描述放在这里。

2. **下一步**
   继续步骤序列。

:::
```

| 容器 | 说明 |
| :--- | :--- |
| **`::: steps`** | 父容器，将子有序列表项转化为带编号的时间线。 |
| **`1. `** | 任何标准 Markdown 有序列表项都作为一个步骤。加粗每项的第一行作为标题。 |

## 示例

### 基础工作流

```markdown
::: steps

1.  **初始化项目**
    运行 `npx @docmd/core init` 搭建目录结构。

2.  **编写内容**
    使用标准 Markdown 文件编写文档。

3.  **构建与部署**
    运行 `npx @docmd/core build` 生成静态站点。

:::
```

::: steps

1.  **初始化项目**
    运行 `npx @docmd/core init` 搭建目录结构。

2.  **编写内容**
    使用标准 Markdown 文件编写文档。

3.  **构建与部署**
    运行 `npx @docmd/core build` 生成静态站点。

:::

### 包含富内容的步骤

每个步骤可以包含代码块、标注和其他嵌套容器。

```markdown
::: steps

1.  **配置环境**
    在 `docmd.config.json` 中定义项目变量。

    ::: callout tip
    使用 `defineConfig` 可为所有配置键启用 IDE 自动补全。
    :::

2.  **生成生产构建**
    执行构建命令生成高度优化的静态站点。

    ```bash
    npx @docmd/core build
    ```

3.  **部署到基础设施**
    将 `site/` 目录同步到 S3、Cloudflare Pages 或 Vercel。

:::
```

::: steps

1.  **配置环境**
    在 `docmd.config.json` 中定义项目变量。

    ::: callout tip
    使用 `defineConfig` 可为所有配置键启用 IDE 自动补全。
    :::

2.  **生成生产构建**
    执行构建命令生成高度优化的静态站点。

    ```bash
    npx @docmd/core build
    ```

3.  **部署到基础设施**
    将 `site/` 目录同步到 S3、Cloudflare Pages 或 Vercel。

:::

::: callout tip "工作流优化" icon:lightbulb
AI 模型将 `steps` 容器解读为**顺序工作流**的高保真信号。始终以**加粗标题**开头每个列表项——这让 AI Agent 能在处理实现细节之前，可靠地从 `llms.txt` 上下文中解析每个步骤的目标。
:::
