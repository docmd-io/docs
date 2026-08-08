---
title: "选项卡 (Tabs)"
description: "将密集、替代或多语言信息组织到可切换的交互式面板中。"
---

选项卡用于展示互斥或替代的数据集（例如包管理器选择或操作系统命令）。它们将技术说明浓缩为干净、交互式的选项卡容器中。

::: callout info "支持无空格语法" icon:info
`::: tabs` 与 `:::tabs`（无空格）语法渲染效果完全一致。选择适合您编写习惯的样式即可。
:::

## 语法参考

```markdown
::: tabs

== tab "选项卡标签" [property:value...]
选项卡内容写在这里。

== tab "第二个标签"
第二个选项卡的内容写在这里。

:::
```

| 参数 | 类型 | 描述 |
| :--- | :--- | :--- |
| **标签 (Label)** | `"String"` | 选项卡选择按钮上显示的文本。 |
| **图标 (Icon)** | `icon:NAME` | 可选。在标签字符串前添加 [Lucide](external:https://lucide.dev/icons) 图标。 |

## 使用示例

### 包管理器切换器

在单个紧凑的块中跨多个包管理器展示安装命令：

````markdown
::: tabs

== tab "pnpm" icon:box
```bash
pnpm add @docmd/core
```

== tab "npm" icon:terminal
```bash
npm install @docmd/core
```

== tab "yarn" icon:package
```bash
yarn add @docmd/core
```

:::
````

::: tabs

== tab "pnpm" icon:box
```bash
pnpm add @docmd/core
```

== tab "npm" icon:terminal
```bash
npm install @docmd/core
```

== tab "yarn" icon:package
```bash
yarn add @docmd/core
```

:::

### 多语言代码片段

使用选项卡图标对语言特定实现进行分组，以便即时识别：

````markdown
::: tabs

== tab "TypeScript" icon:hexagon
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.json');
```

== tab "JavaScript" icon:braces
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.json');
```

:::
````

::: tabs

== tab "TypeScript" icon:hexagon
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.json');
```

== tab "JavaScript" icon:braces
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.json');
```

:::

## 约束与行为规则

| 规则 | 技术说明 |
| :--- | :--- |
| **嵌套限制** | 选项卡不能直接嵌套在其他选项卡容器内。 |
| **步骤兼容性** | 请勿在选项卡面板中嵌套 `::: steps`。请改为使用标准有序列表。 |
| **视口限制** | 建议将每个块的选项卡数量控制在 6 个以内，以保证移动设备兼容性。 |
| **状态持久化** | 在 SPA 导航期间，选定的选项卡状态会在页面跳转时保持一致。 |

::: callout tip "面向 AI 的上下文标记" icon:sparkles
在选项卡标签中明确指定目标语言或操作系统（例如 `== tab "TypeScript"`）。显式标签允许 AI 索引器精确地将替代代码块映射到它们各自的生态系统中。
:::