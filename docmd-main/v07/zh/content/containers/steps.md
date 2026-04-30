---
title: "步骤"
description: "将标准有序列表转化为高冲击力的可视化时间线和教程。"
---

The `steps` container is designed specifically for "How-to" guides and technical tutorials. It transforms a standard Markdown ordered list into a polished, numbered vertical timeline with automatic spacing and visual emphasis.

## 语法

将任意标准有序列表包裹在 `::: steps` 块中。

```markdown
::: steps

1.  **初始化项目**
    运行 `docmd init` 命令搭建目录结构。

2.  **编写内容**
    使用标准 Markdown 文件编写文档。

3.  **构建与部署**
    使用 `docmd build` 生成静态资源。

:::
```

## 详细实现

`steps` 组件支持在每个条目中使用丰富的 Markdown 内容，包括代码块、图片和嵌套容器。

```markdown
::: steps

1.  **生成生产构建**
    执行构建命令以生成高度优化的静态站点。
    ```bash
    docmd build
    ```

2.  **验证资源完整性**
    检查 `site/` 目录，确保所有资源均已正确编译。

3.  **部署到基础设施**
    将 `site/` 目录同步到你的主要托管提供商（如 S3、Cloudflare Pages 或 Vercel）。

:::
```

::: steps

1.  **生成生产构建**
    执行构建命令以生成高度优化的静态站点。
    ```bash
    docmd build
    ```

2.  **验证资源完整性**
    检查 `site/` 目录，确保所有资源均已正确编译。

3.  **部署到基础设施**
    将 `site/` 目录同步到你的主要托管提供商（如 S3、Cloudflare Pages 或 Vercel）。

:::

## 高级嵌套

你可以在步骤内嵌套其他文档组件（如**提示框**或**按钮**），而不会中断序列的时间流。

```markdown
::: steps

1.  **配置环境**
    在 `docmd.config.js` 中定义项目特定变量。

    ::: callout tip
    使用 `defineConfig` 可为配置键启用 IDE 自动补全。
    :::

2.  **验证架构**
    运行 `docmd verify` 确保配置结构正确。

:::
```

::: callout tip "工作流优化"
现代 AI 模型将 `steps` 容器解读为**顺序工作流**的高保真信号。为最大化 `llms-full.txt` 上下文中的 AI 准确性，请始终以**加粗标题**开头每个列表项。这允许 Agent 在处理实现细节之前可靠地解析每个步骤的目标。
:::
