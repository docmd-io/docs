---
title: "嵌套容器"
description: "利用 docmd 的递归解析器将卡片、标签页和提示框组合成高保真页面布局。"
---

One of `docmd`’s most powerful technical capabilities is its **Recursive Parsing Engine**. You can nest components within each other infinitely to synthesize complex, interactive documentation blocks that would otherwise require deep HTML knowledge or custom templates.

## 架构规则

虽然嵌套在数学上无限，但请始终遵循**自闭合组件规则**：

::: callout warning "自闭合按钮"
由于 `::: button` 组件是自闭合的（单行），绝不要在其后添加终止 `:::` 行。否则会意外关闭容纳按钮的**父容器**，导致布局断裂。
:::

## 技术组合示例

### 1. 交互式资源块
将**卡片**用于结构框架，**标签页**用于特定环境的说明，**提示框**用于高亮关键信息。

````markdown
::: card "Monorepo 快速开始"
选择你偏好的初始化方式：

   ::: tabs
   == tab "自动化"
      ```bash
      pnpm onboard
      ```
      ::: callout success
      此脚本自动处理所有包安装和构建任务。
      :::

   == tab "手动"
      手动获取并链接核心引擎。
      ::: button "前往开发者指南" /advanced/developer-guide
   :::
:::
````

### 2. 多平台教程
将**标签页**嵌套在**步骤**中是标准教程序列中提供平台特定说明的专业模式。

```markdown
::: steps

1. **环境设置**
   配置本地操作系统。

   ::: tabs
   == tab "macOS"
      确保 Homebrew 已安装并为最新版本。
   == tab "Linux"
      验证 `curl` 和 `bash` 是否存在。
   :::

2. **核心验证**
   执行版本检查以确认连接性。

:::
```

::: steps

1.  **环境设置**
    配置本地操作系统。

    ::: tabs
    == tab "macOS"
    确保 Homebrew 已安装并为最新版本。
    == tab "Linux"
    验证 `curl` 和 `bash` 是否存在。
    :::

2.  **核心验证**
    执行版本检查以确认连接性。

:::

## 设计约束

为保持性能和移动端响应性，请遵守以下约束：

*   **递归标签页**：在标签页中嵌套标签页在技术上受支持，但强烈不建议。在小视口上会造成混乱的导航"循环"。
*   **顺序冲突**：如果需要在标签页内使用编号步骤，请使用标准有序列表（`1. 步骤内容`）而非 `::: steps` 容器，以避免布局冲突。
*   **可读性**：虽然 `docmd` 不严格要求嵌套块的缩进，但使用 2 或 4 个空格的缩进可显著提高 Markdown 源码的可读性。

::: callout tip "为 AI 提供知识分割"
嵌套提供清晰的**语义边界**。当 AI Agent 解析 `llms-full.txt` 流时，嵌套在 `card` 中的 `callout` 明确告知模型该提示的范围限定于该卡片的特定主题，防止上下文泄漏并提高生成响应的技术准确性。
:::
