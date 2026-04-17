---
title: "标签页"
description: "将密集、可选或多语言内容整理为可切换的交互式选项卡面板。"
---

Tabs are the optimal UI pattern for presenting mutually exclusive or related data sets (e.g., "Install via NPM vs. Yarn" or "macOS vs. Windows" instructions) within a compact, interactive format.

## 语法参考

`tabs` 容器使用专用子分隔符 `== tab "标签"`。每个标签定义一个用户可切换的独立面板。

```markdown
::: tabs

== tab "标签 1"
第一个标签的内容。

== tab "标签 2"
第二个标签的内容。

:::
```

## 示例画廊

### 1. 包管理
标签页最常用于在单个视图中显示不同包管理器的安装说明。

::: tabs

== tab "pnpm"
```bash
pnpm add @docmd/core
```

== tab "npm"
```bash
npm install @docmd/core
```

== tab "yarn"
```bash
yarn add @docmd/core
```

:::

### 2. 多语言代码片段
通过分离不同编程语言或环境保持逻辑清晰。

::: tabs

== tab "TypeScript"
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.js');
```

== tab "JavaScript"
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.js');
```

:::

## 核心功能

### 同构懒渲染
`docmd` 实现了**条件资源懒加载**。如果标签页包含计算密集型元素（如 **Mermaid.js** 图表或高分辨率图片），这些资源仅在用户激活特定标签时才初始化和渲染，确保快速的初始页面加载。

### 状态持久化
默认 SPA 路由器会跨相似文档页面追踪活动标签的索引。如果用户在某页选择了"pnpm"并导航到具有相同标签结构的另一页，"pnpm"标签会自动保持激活状态。

## 技术约束

| 约束 | 说明 |
| :--- | :--- |
| **嵌套深度** | 为保持布局完整性，标签页不能嵌套在其他标签组件内。 |
| **交互冲突** | 高冲突语法：在标签页内嵌套步骤时，请使用标准有序列表（`1. 步骤一`）而非 `::: steps` 容器。 |
| **响应式限制** | 建议每个块的标签数量限制在 6 个以内，以确保移动设备兼容性。 |

::: callout tip "AI 上下文映射"
在代码片段中使用标签页时，请始终在标签标签中直接包含目标语言（如 `== tab "TypeScript"`）。这允许 LLM 从 `llms-full.txt` 上下文流中即时识别并提取技术相关部分。
:::
