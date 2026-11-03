---
title: "Playground 演练场容器"
description: "通过 ::: playground 容器嵌入可运行的 JavaScript 环境、实时 HTML 组件预览、Live/Code 选项卡切换以及代码库活动脚本。"
---

`::: playground` 容器将静态代码示例转化为交互式、自包含的代码演练场。读者可以直接在浏览器中实时编辑代码，通过一键点击或快捷键执行代码，查看结构化的控制台输出，在实时渲染视图与底层代码之间无缝切换，并即时预览 HTML/CSS 组件。

::: callout info "Zero-Config 零配置极简架构" icon:zap
演练场运行时采用原生标准 JavaScript 与 CSS 构建，无需 Monaco 或 React 等重型框架。未引用演练场的页面加载 **0 KB 额外资源**。
:::

## 容器语法

```markdown
# 代码块普通容器（包含代码与输出）
::: playground [title:"标题"] [icon:NAME] [live] [view:"code"] [tab:"preview"|"console"] [nocode] [readonly]
```js
// JavaScript 或 HTML/CSS 代码
```
::: /playground

# 自闭合容器（动态引用代码库脚本）
::: playground src="./snippets/counter.js" [title:"标题"] [icon:NAME] [live] /:::

# 快速代码围栏语法
```js playground [title:"标题"] [icon:NAME] [live]
// 代码内容
```
```

## 功能与支持属性

| 参数 / 属性 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| **标题** | `string` \| `title:"..."` | 自动推导或 `"Playground"` | 工具栏显示的标题。支持 `title:"标题文本"` 或引号包裹。 |
| **源码文件** | `src:路径` \| `file:路径` | 无 | 要内联载入演练场编辑器的本地代码文件的相对路径。 |
| **图标** | `icon:NAME` | `"play"` | 可选。[Lucide](external:https://lucide.dev/icons) 图标名称（如 `icon:code`, `icon:cpu`, `icon:layout`）。 |
| **自动运行** | `live` | `false` | 声明后在页面加载时自动运行代码。 |
| **初始视图** | `view:"code"` \| `view:"live"` | `"live"` | 初始激活的视图模式（`"live"` 为运行效果/控制台，`"code"` 则直接展开源码编辑器）。 |
| **输出选项卡** | `tab:"preview"` \| `tab:"console"` | `"console"` 或 `"preview"` | 默认激活的输出子选项卡（`"preview"` 或 `"console"`）。也支持独立的 `preview` 标志。 |
| **隐藏源码** | `nocode` | `false` | 隐藏代码切换按钮，仅呈现全宽实时预览效果（也可写作 `code:false`）。 |
| **只读模式** | `readonly` | `false` | 锁定代码编辑器禁止修改，但允许点击运行。 |
| **布局模式** | `layout:"stacked"` \| `"split"` | `"stacked"` | 布局展示：默认采用整合 Play/Code 切换器的全宽单面板视图，或使用 `"split"` 左右分栏。 |
| **语言声明** | `lang:LANG` | 自动推导 (`"js"`) | 明确指定代码语言（`js`, `html`, `css`）。从文件扩展名或内部代码围栏推导。 |
| **闭合标签** | `::: /playground`, `/:::`, `:::` | 标准闭合 | 支持显式闭合 `::: /playground`、自闭合 `/:::` 或通用闭合 `:::`。 |


## 使用示例

### 1. 包含代码块的普通容器

使用 `::: playground` 块将普通代码包裹起来：

````markdown
::: playground title="响应式变量探索器" icon:code live
```js
const buildYear = docmd.var.get("docmd.buildYear");
const siteTitle = docmd.var.get("site.title");

console.log("站点标题:", siteTitle);
console.log("构建年份:", buildYear);

// 修改客户端响应式页面变量
docmd.var.set("user.plan", "Enterprise");
console.info("已将用户方案更新为:", docmd.var.get("user.plan"));
return `当前年份: ${buildYear}`;
```
:::
````

以下是由 `docmd` 直接渲染的实时可交互演练场：

::: playground title="响应式变量探索器" icon:code live
```js
const buildYear = docmd.var.get("docmd.buildYear");
const siteTitle = docmd.var.get("site.title");

console.log("站点标题:", siteTitle);
console.log("构建年份:", buildYear);

// 修改客户端响应式页面变量
docmd.var.set("user.plan", "Enterprise");
console.info("已将用户方案更新为:", docmd.var.get("user.plan"));
return `当前年份: ${buildYear}`;
```
:::

### 2. Play 与 Code 视图切换

每个演练场都在顶部工具栏内置了二合一的 **Play** 与 **Code** 视图切换器。主体区域默认以全宽单面板形式呈现：

````markdown
::: playground title="交互式组件（Play 与 Code 切换）" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">即时组件预览</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    通过右上角工具栏的按钮在 <strong>Play</strong> 实时渲染与 <strong>Code</strong> 源码视图之间自由切换。
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('在组件预览中触发了操作！')">
    触发控制台日志
  </button>
</div>
```
:::
````

支持视图切换的实时运行演练场：

::: playground title="交互式组件（Play 与 Code 切换）" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">即时组件预览</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    通过右上角工具栏的按钮在 <strong>Play</strong> 实时渲染与 <strong>Code</strong> 源码视图之间自由切换。
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('在组件预览中触发了操作！')">
    触发控制台日志
  </button>
</div>
```
:::

### 3. 初始展示代码视图的容器 (`view="code"`)

如果希望默认向读者展示代码编辑器，同时保留随时切换到实时效果的“Play”切换按钮，可指定 `view="code"`：

````markdown
::: playground view="code" title="阶乘算法（代码优先）" icon:code live
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
:::
````

代码优先的实时工作演练场：

::: playground view="code" title="阶乘算法（代码优先）" icon:code live
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
:::

### 4. 动态引用代码文件的自闭合容器

无需手动将代码复制粘贴到文档中，您可以通过 `src` 属性直接引用代码库中的实际脚本或组件文件：

```markdown
::: playground src="./snippets/counter.js" title="动态引用脚本文件" icon:cpu live /:::
```

引用本地代码文件 [./snippets/counter.js](file:///Users/mac/Workspace/GitHub/docmd-io/docs/docmd-main/v09/zh/content/containers/snippets/counter.js) 的实时演练场：

::: playground src="./snippets/counter.js" title="动态引用脚本文件" icon:cpu live /:::

::: callout tip "代码库持续同步" icon:refresh-cw
使用 `src="./path/to/file"` 时，`docmd` 会在构建时自动相对于文档所在页面或工作区根目录解析该文件。当项目源码更新时，文档中的示例将在下次构建时自动同步更新。
:::

### 5. 源码丢失时的优雅警告降级

如果指定的脚本文件路径无效或已被重命名，`docmd` 会展示醒目的警告提示栏并在编辑器中整洁打印备用代码，而不会导致构建中断：

```markdown
::: playground src="./snippets/missing-script.js" title="缺少脚本文件的友好警告" icon:alert-triangle /:::
```

优雅错误降级的实时演练场：

::: playground src="./snippets/missing-script.js" title="缺少脚本文件的友好警告" icon:alert-triangle /:::

### 6. 代码围栏语法

对于无需容器嵌套的快速示例，只需在 Markdown 代码围栏后添加 `playground`：

````markdown
```js playground title="斐波那契快速执行器" icon:zap
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log("Fib(10) =", fib(10));
return fib(10);
```
````

实时可运行代码围栏示例：

```js playground title="斐波那契快速执行器" icon:zap
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log("Fib(10) =", fib(10));
return fib(10);
```


## 交互能力

::: tabs
::: tab "JavaScript 运行器" icon:code
演练场在隔离的沙盒上下文中执行 JavaScript。控制台实时捕获：

* `console.log(...)` — 带有高亮语法色彩的标准日志
* `console.info(...)` — 带有蓝色指示器的信息性输出
* `console.warn(...)` — 带有琥珀色指示器的警告日志
* `console.error(...)` — 带有红色指示器和调用堆栈的错误跟踪
* 表达式返回值 — 脚本末尾的求值结果自动显示为：`=> 30`

```js playground title="控制台能力演示"
console.log("来自 docmd 的问候！");
console.info("状态数据:", { status: "active", version: "0.9.9" });
console.warn("注意: 测试警告提示");
return "执行圆满完成";
```
::: /tab

::: tab "HTML 组件预览" icon:layout
当演练场语言设为 `html`（通过 ```` ```html playground ```` 或 `::: playground lang:html`）时，演练场会自动激活**预览**选项卡，并在隔离的沙箱框架中渲染 HTML/CSS：

```html playground title="实时可交互按钮" live
<button style="padding: 10px 20px; background: #6366f1; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onclick="alert('组件被成功点击！')">
  交互式组件按钮
</button>
```
::: /tab

::: tab "docmd-runtime 深度集成" icon:braces
演练场可直接访问全局 `window.docmd` 运行时对象以及响应式页面变量：

* `docmd.var.get('docmd.version')` — 读取构建期或客户端动态变量
* `docmd.var.set('key', 'value')` — 实时更新变量并驱动页面 DOM 自动重新渲染
* `docmd.theme.get()` / `docmd.theme.toggle()` — 获取或切换当前明暗主题

```js playground title="主题与变量 API" live
console.log("当前主题:", window.docmd?.theme?.get() || "light");
console.log("Docmd 引擎版本:", window.docmd?.var?.get("docmd.version") || "0.9.9");
console.log("Git 分支:", window.docmd?.var?.get("docmd.gitBranch") || "main");
return "SDK 调用正常";
```
::: /tab
::: /tabs

## 键盘快捷键

演练场编辑器提供主流 IDE 标准快捷键，提升操作效率：

* <kbd class="docmd-kbd">Cmd</kbd> + <kbd class="docmd-kbd">Enter</kbd> (macOS) 或 <kbd class="docmd-kbd">Ctrl</kbd> + <kbd class="docmd-kbd">Enter</kbd> (Windows/Linux): 即刻执行当前代码块
* <kbd class="docmd-kbd">Tab</kbd>: 插入 2 个空格缩进，避免浏览器焦点失焦
* <kbd class="docmd-kbd">Shift</kbd> + <kbd class="docmd-kbd">Tab</kbd>: 消除当前行或选区的缩进

## 关联插件技术文档

有关 AST 解析钩子、构建期脚本安全解析、异常容错机制以及全局插件配置选项的深入技术说明，请参阅 **[Playground 插件技术架构与参考指南](../../plugins/playground.md)**。