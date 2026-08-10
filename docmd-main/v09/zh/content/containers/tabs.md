---
title: "选项卡 (Tabs)"
description: "在 docmd 中将备选代码片段、平台指令和多语言内容组织到可切换的选项卡中。"
---

选项卡呈现互斥或备选的数据集（如包管理器选择或操作系统命令）。它们将技术说明精简为整洁的交互式选项卡容器。

## 容器语法 (Container Syntax)

```markdown
::: tabs # 外层选项卡组容器开启
::: tab [title:"选项卡标签"] [icon:图标名称] # 单个选项卡项目开启
选项卡 1 内容（代码块、文本、列表）...
::: /tab # 显式选项卡项目闭合

::: tab [title:"选项卡标签 2"] [icon:图标名称] # 第二个选项卡开启
选项卡 2 内容...
::: /tab
::: /tabs # 显式选项卡组闭合
```

## 功能特性与支持属性 (Features & Attributes)

| 参数 / 属性 | 类型 | 描述 |
| :--- | :--- | :--- |
| **选项卡标签** | `"String"` \| `title:"..."` | 显示在选项卡选择按钮上的文本（第 1 个位置参数或 `title:"..."`）。 |
| **图标支持** | `icon:名称` | 可选。在选项卡标签前添加 [Lucide](external:https://lucide.dev/icons) 图标。 |
| **子容器包装** | `::: tab` ... `::: /tab` | 显式选项卡子容器。传统 `== tab` 语法亦获完全支持。 |
| **闭合标签** | `::: /tabs`, `::: /tab`, `:::` | 支持显式命名闭合标签或通用 `:::` 闭合标记。 |

::: callout info "v0.9.1+ 容器语法标准化" icon:sparkles
自 **v0.9.1** 起，`docmd` 引入了显式的容器开启与闭合标签（例如 `::: card` ... `::: /card`、`::: tab` ... `::: /tab`）、显式的键值对属性（`title:"..."`、`url:"..."`）以及末尾的 `# 注释`。推荐在编写新文档时采用此现代语法。同时，对传统子块标记（`== tab`、`1.`）和位置参数退避逻辑的向下兼容将被严格保留。
:::


## 使用示例

```markdown
::: tabs # 包管理器选项
::: tab "pnpm" icon:box # 推荐的包管理器
```bash
pnpm add @docmd/core
```
::: /tab

::: tab "npm" icon:terminal
```bash
npm install @docmd/core
```
::: /tab

::: tab "yarn" icon:package
```bash
yarn add @docmd/core
```
::: /tab
::: /tabs
```

::: tabs # 包管理器选项
::: tab "pnpm" icon:box # 推荐的包管理器
```bash
pnpm add @docmd/core
```
::: /tab

::: tab "npm" icon:terminal
```bash
npm install @docmd/core
```
::: /tab

::: tab "yarn" icon:package
```bash
yarn add @docmd/core
```
::: /tab
::: /tabs

### 多语言代码片段 (Multi-Language Code Snippets)

使用选项卡图标和显式闭合标签将特定语言的实现分组：

````markdown
::: tabs
::: tab title:"TypeScript" icon:hexagon
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.json');
```
::: /tab

::: tab title:"JavaScript" icon:braces
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.json');
```
::: /tab
::: /tabs
````

::: tabs
::: tab title:"TypeScript" icon:hexagon
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.json');
```
::: /tab

::: tab title:"JavaScript" icon:braces
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.json');
```
::: /tab
::: /tabs

::: callout note "传统 == tab 语法" icon:archive
使用 `== tab` 语法的现有文档仍可平滑解析：

```markdown
::: tabs
== tab "JavaScript"
console.log("传统语法");
::: /tabs
```
:::