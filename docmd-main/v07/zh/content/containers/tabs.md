---
title: "选项卡 (Tabs)"
description: "将密集、替代或多语言信息组织到可切换的交互式面板中。"
---

选项卡是在紧凑、交互式的格式中展示互斥或相关数据集（例如，“通过 NPM 与 Yarn 安装”或“macOS 与 Windows”指令）的最佳 UI 模式。

## 语法参考

`tabs` 容器使用专门的子分隔符 `== tab "标签"`。你可以选择使用 `icon:name` 语法添加图标。

```markdown
::: tabs

== tab "标签 1" icon:rocket
第一个选项卡的内容。

== tab "标签 2" icon:settings
第二个选项卡的内容。

:::
```

## 实现展示

### 1. 包管理
选项卡最常用于在单个视图中显示不同包管理器的安装说明。

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
通过分离不同的编程语言或环境来保持逻辑整洁。

::: tabs

== tab "TypeScript" icon:hexagon
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.js');
```

== tab "JavaScript" icon:braces
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.js');
```

:::

## 核心能力

### 同构延迟渲染
`docmd` 实现了 **条件资源延迟 (Conditional Resource Laziness)**。如果选项卡包含计算密集型元素（例如 **Mermaid.js** 图表或高分辨率图像），则仅在用户激活该特定选项卡时才初始化并渲染这些资源。这确保了初始页面的快速加载。

### 状态持久化
默认的 SPA 路由器会在类似的文档页面之间跟踪活动选项卡的索引。如果用户在某一页选择了“pnpm”，并导航到另一页具有匹配选项卡结构的页面，则“pnpm”选项卡将自动保持活动状态。

## 技术约束

| 约束 | 说明 |
| :--- | :--- |
| **嵌套深度** | 为了保持布局完整性，选项卡不能嵌套在其他选项卡组件内。 |
| **交互冲突**| 高冲突语法：要在选项卡内嵌套“步骤”，请使用标准有序列表 (`1. 第一步`) 而不是 `::: steps` 容器。 |
| **响应限制** | 建议将每个区块的选项卡数量限制在 6 个以内，以确保移动设备兼容性。 |

::: callout tip "AI 上下文映射"
在将选项卡用于代码片段时，始终直接在选项卡标签中包含目标语言（例如 `== tab "TypeScript"`）。这允许 LLM 从 `llms-full.txt` 上下文流中立即识别并提取技术相关的部分。
:::
