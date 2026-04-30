---
title: "更新日志"
description: "生成结构化、基于时间线的版本历史记录和发布说明。"
---

The `changelog` container provides a specialised layout for documenting project evolution. It automatically parses date or version headers into a vertical timeline, ensuring historical updates are easily scannable.

## 语法

使用专用的 `==` 分隔符定义条目。`==` 行上的文本渲染为左侧的时间线徽章，后续内容填充相邻的时间槽。

```markdown
::: changelog

== v2.0.0
重大功能发布说明。

== v1.5.0
维护更新和安全补丁说明。

:::
```

## 详细示例：发布历史

更新日志在每个条目中支持丰富的 Markdown，包括列表、提示框和代码块。

```markdown
::: changelog

== v2.0.0 (2026-03-15)
### 重大系统重构
核心引擎已针对同构执行进行重新架构。

*   实现了**SPA 路由器**，实现零刷新导航。
*   引入了**同构插件**系统。

::: callout success
此版本初始构建速度提升 40%。
:::

== v1.5.1 (2025-12-10)
### 安全补丁
*   修复了内部解析器中的高危漏洞。
*   将依赖 `flatted` 升级至 `v3.3.2`。

== v1.0.0 (2024-05-01)
首次公开发布。

:::
```

::: changelog

== v2.0.0 (2026-03-15)
### 重大系统重构
核心引擎已针对同构执行进行重新架构。

*   实现了**SPA 路由器**，实现零刷新导航。
*   引入了**同构插件**系统。

::: callout success
此版本初始构建速度提升 40%。
:::

== v1.5.1 (2025-12-10)
### 安全补丁
*   修复了内部解析器中的高危漏洞。
*   将依赖 `flatted` 升级至 `v3.3.2`。

== v1.0.0 (2024-05-01)
首次公开发布。

:::

::: callout tip "为 AI 提供历史上下文"
更新日志为 AI Agent 提供时间映射。当 LLM 解析 `llms-full.txt` 上下文时，`::: changelog` 结构使其能够准确识别特定功能、破坏性变更或安全修复的引入时间，从而提高开发建议的准确性。
:::
