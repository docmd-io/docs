---
title: "Playground 插件"
description: "轻量级实时交互式代码运行器与组件 Playground，支持实时控制台输出捕获、沙箱 HTML 预览和零配置 Markdown 容器。"
---

`@docmd/plugin-playground` 插件为您的 `docmd` 站点带来交互式、可运行的代码块与实时组件预览。文档创作者可以直接在文档中嵌入独立的 JavaScript 执行环境、实时 HTML/CSS 组件以及代码库中的真实源文件，而无需引入庞大的运行时依赖（如 Monaco 或 React）。

::: callout success "内置核心插件（捆绑于 @docmd/core）" icon:zap
从 **v0.9.9** 起，`@docmd/plugin-playground` 直接包含在 `@docmd/core` 中并默认启用。得益于 `docmd` 的按需条件资源加载机制，不包含 Playground 的页面加载 **0 KB 额外资源**，保证极致性能。
:::

## 核心特性

::: cards
::: card title="零配置即开即用" icon:play
使用 ` ```js playground ` 或 `::: playground` 即可立即生成可运行的沙箱组件。
:::
::: card title="动态源码直接引用" icon:file-code
使用 `::: playground src="./counter.js" /:::` 直接嵌入工程中的实际脚本，代码更新时文档示例自动同步。
:::
::: card title="实时控制台捕获" icon:terminal
实时拦截并格式化展示 `console.log()`、`console.info()`、`console.warn()`、`console.error()` 输出及表达式返回值。
:::
::: card title="实时 HTML & CSS 沙箱" icon:layout
在隔离的预览面板中实时渲染交互式 UI 组件，支持控制台与预览视图便捷切换。
:::
::: card title="docmd-runtime 原生集成" icon:braces
原生访问客户端 `window.docmd` 运行时及响应式变量（`docmd.var.get()` 和 `docmd.var.set()`）。
:::
::: card title="极致轻量高效" icon:feather
纯原生 JavaScript 与 CSS（总体积 < 10 KB），支持快捷键操作（`Cmd+Enter` / `Ctrl+Enter` 运行，`Tab` 缩进）。
:::
:::

## 插件配置

作为核心插件，`playground` 无需任何配置即可使用。您也可以在 `docmd.config.json` 中自定义全局选项或关闭该插件：

```json "docmd.config.json"
{
  "plugins": {
    "playground": {
      "enabled": true,
      "theme": "default",
      "defaultLayout": "split"
    }
  }
}
```

::: callout tip "全局停用插件" icon:slash
若需在全站禁用客户端代码执行，只需在 `docmd.config.json` 的 `"plugins"` 下设置 `"playground": false`。
:::
