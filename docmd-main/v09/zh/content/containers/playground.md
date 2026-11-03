---
title: "Playground"
description: "通过 ::: playground 容器嵌入可运行的 JavaScript 环境、实时 HTML 组件预览、Live/Code 选项卡切换以及代码库活动脚本。"
---

`::: playground` 容器将静态代码示例转化为交互式、自包含的代码演练场。读者可以直接在浏览器中实时编辑代码，通过一键点击或快捷键执行代码，查看结构化的控制台输出，在实时渲染视图与底层代码之间无缝切换，并即时预览 HTML/CSS 组件。

::: callout info "Zero-Config 零配置极简架构" icon:zap
演练场运行时采用原生标准 JavaScript 与 CSS 构建，无需 Monaco 或 React 等重型框架。未引用演练场的页面加载 **0 KB 额外资源**。
:::

## 容器语法

````markdown
# 标准块级容器
::: playground [title:"工具栏标题"] [icon:图标名称] [live] [view:"code"|"live"] [tab:"preview"|"console"]
// JavaScript 或 HTML/CSS 代码
::: /playground # 显式容器闭合标签

# 动态引用外部脚本的自闭合容器
::: playground src="./path/to/script.js" [title:"工具栏标题"] [icon:图标名称] [live] /:::

# 快速代码围栏语法
```js playground [title:"工具栏标题"] [icon:图标名称] [live]
// JavaScript 代码
```
````

## 功能与支持属性

| 参数 / 属性 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| **标题** | `"String"` \| `title:"..."` | 自动推导或 `"Playground"` | 工具栏显示的标题文本（第 1 个位置参数或 `title:"..."`）。 |
| **源码文件** | `src:路径` \| `file:路径` | 无 | 要内联载入演练场编辑器的本地代码文件的相对路径。 |
| **图标** | `icon:NAME` | `"play"` | 可选。[Lucide](external:https://lucide.dev/icons) 图标名称（如 `icon:code`, `icon:cpu`, `icon:layout`）。 |
| **语言声明** | `lang:LANG` | 自动推导 (`"js"`) | 明确指定代码语言（`js`, `html`, `css`）。从文件扩展名或内部代码围栏推导。 |
| **自动运行** | `live` | `false` | 声明后在页面加载时自动运行代码。 |
| **初始视图** | `view:"code"` \| `view:"live"` | `"live"` | 初始激活的视图模式（`"live"` 为运行效果/控制台，`"code"` 则直接展开源码编辑器）。 |
| **输出选项卡** | `tab:"preview"` \| `tab:"console"` | `"console"` 或 `"preview"` | 默认激活的输出子选项卡（`"preview"` 或 `"console"`）。也支持独立的 `preview` 标志。 |
| **隐藏源码** | `nocode` | `false` | 隐藏代码切换按钮，仅呈现全宽实时预览效果（也可写作 `code:false`）。 |
| **只读模式** | `readonly` | `false` | 锁定代码编辑器禁止修改，但允许点击运行。 |
| **布局模式** | `layout:"stacked"` \| `"split"` | `"stacked"` | 布局展示：默认采用整合 Play/Code 切换器的全宽单面板视图，或使用 `"split"` 左右分栏。 |
| **闭合标签** | `::: /playground`, `/:::`, `:::` | 标准闭合 | 支持显式闭合 `::: /playground`、自闭合 `/:::` 或通用闭合 `:::`。 |

::: callout warning "安全须知与脚本执行" icon:shield-alert
所有 Playground 代码均完全在访客浏览器的客户端环境中运行，不存在服务端执行。HTML 预览在具备不透明源（`null`）的沙箱 iframe 中运行，严格禁止访问父级 DOM 或 Cookie。使用 `live` 自动运行特性时，请确保代码片段来自可信的文档源。
:::

## 使用示例

### 交互式 JavaScript 运行器

标准块级演练场，演示 `console.log`、`console.info`、`console.warn` 以及返回值捕获：

````markdown
::: playground title="JavaScript 控制台与返回值演示" icon:code live
```js
console.log("来自 docmd 的问候！");
console.info("状态数据:", { status: "active", version: "0.9.9" });
console.warn("提示: 示例警告信息");
return "执行圆满完成";
```
::: /playground
````

::: playground title="JavaScript 控制台与返回值演示" icon:code live
```js
console.log("来自 docmd 的问候！");
console.info("状态数据:", { status: "active", version: "0.9.9" });
console.warn("提示: 示例警告信息");
return "执行圆满完成";
```
::: /playground

### 实时 HTML 组件预览

当语言设置为 `html`（或 `lang:html`）时，演练场会自动激活**预览（Preview）**面板，并在沙箱 Frame 中即时渲染 HTML/CSS：

````markdown
::: playground title="交互式组件实时预览" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">即时组件预览</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    通过顶栏切换按钮，在 <strong>Play</strong> 实时呈现与 <strong>Code</strong> 源码视图之间无缝切换。
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('从组件预览中触发了操作！')">
    触发控制台日志
  </button>
</div>
```
::: /playground
````

::: playground title="交互式组件实时预览" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">即时组件预览</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    通过顶栏切换按钮，在 <strong>Play</strong> 实时呈现与 <strong>Code</strong> 源码视图之间无缝切换。
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('从组件预览中触发了操作！')">
    触发控制台日志
  </button>
</div>
```
::: /playground

### 响应式变量与 docmd 运行时集成

演练场具备全局 `window.docmd` 运行时对象与响应式变量的完整访问权限：

````markdown
::: playground title="响应式变量探索器" icon:sparkles live
```js
const buildYear = docmd.var.get("docmd.buildYear");
const siteTitle = docmd.var.get("site.title");

console.log("站点标题:", siteTitle);
console.log("构建年份:", buildYear);

// 修改客户端响应式变量
docmd.var.set("user.plan", "Enterprise");
console.info("更新后的用户计划:", docmd.var.get("user.plan"));
return `当前年份: ${buildYear}`;
```
::: /playground
````

::: playground title="响应式变量探索器" icon:sparkles live
```js
const buildYear = docmd.var.get("docmd.buildYear");
const siteTitle = docmd.var.get("site.title");

console.log("站点标题:", siteTitle);
console.log("构建年份:", buildYear);

// 修改客户端响应式变量
docmd.var.set("user.plan", "Enterprise");
console.info("更新后的用户计划:", docmd.var.get("user.plan"));
return `当前年份: ${buildYear}`;
```
::: /playground

### 优先显示源码视图 (`view:"code"`)

将演练场配置为在页面载入时直接展开代码编辑器，同时保留随时切换到运行视图的能力：

````markdown
::: playground view:"code" title="阶乘算法（优先源码）" icon:code live
```js
// 递归计算阶乘
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

const num = 5;
const result = factorial(num);
console.log(`${num} 的阶乘为:`, result);
return result;
```
::: /playground
````

::: playground view:"code" title="阶乘算法（优先源码）" icon:code live
```js
// 递归计算阶乘
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

const num = 5;
const result = factorial(num);
console.log(`${num} 的阶乘为:`, result);
return result;
```
::: /playground

### 动态引用代码库脚本 (`src`)

通过 `src` 属性直接链接到仓库中的现有脚本文件：

````markdown
::: playground src="./snippets/counter.js" title="动态引用代码库脚本" icon:cpu live /:::
````

::: playground src="./snippets/counter.js" title="动态引用代码库脚本" icon:cpu live /:::

::: callout tip "代码持续同步" icon:refresh-cw
使用 `src="./path/to/file"` 时，`docmd` 会在构建时自动解析该文件。当代码库更新时，文档示例将在下次构建时自动同步。若源文件丢失或路径变更，`docmd` 会显示友好的警告横幅而不会中断构建流程。
:::

### 快速代码围栏语法

对于无需多层嵌套的快速演示，可直接在标准 Markdown 代码块上追加 `playground`：

````markdown
```js playground title="斐波那契数列快速运行器" icon:zap
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log("Fib(10) =", fib(10));
return fib(10);
```
````

```js playground title="斐波那契数列快速运行器" icon:zap
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log("Fib(10) =", fib(10));
return fib(10);
```

## 键盘快捷键

演练场内置了标准 IDE 键盘快捷键：

| 快捷键 | 功能描述 |
| :--- | :--- |
| <kbd class="docmd-kbd">Cmd</kbd> + <kbd class="docmd-kbd">Enter</kbd> / <kbd class="docmd-kbd">Ctrl</kbd> + <kbd class="docmd-kbd">Enter</kbd> | 立即运行当前代码块。 |
| <kbd class="docmd-kbd">Tab</kbd> | 插入 2 个空格缩进，避免切换浏览器焦点。 |
| <kbd class="docmd-kbd">Shift</kbd> + <kbd class="docmd-kbd">Tab</kbd> | 回退当前行或选中区域的缩进。 |

## 相关文档

如需深入了解 AST 解析钩子、构建期脚本解析原理、平滑容错机制及全局插件配置项，请参阅 **[Playground 插件架构与技术参考](../../plugins/playground.md)**。