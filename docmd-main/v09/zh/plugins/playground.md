---
title: "Playground 演练场插件"
description: "轻量交互式代码运行器与组件演练场插件，提供实时控制台捕获、Live HTML 预览沙箱以及零配置 Markdown 容器。"
---

`@docmd/plugin-playground` 插件为 `docmd` 站点带来交互式、可运行的代码块与实时组件预览。文档作者可以直接在文档中嵌入独立的 JavaScript 执行环境、实时 HTML/CSS 组件以及代码库中的真实脚本文件，而无需引入 Monaco 或 React 等庞大的第三方依赖。

::: callout success "内置于 @docmd/core 的核心插件" icon:zap
自 **v0.9.9** 起，`@docmd/plugin-playground` 直接随 `@docmd/core` 分发并默认启用。得益于 `docmd` 的按需资产加载机制，未包含演练场代码块的页面加载 **0 KB 额外资产**，确保静态内容的极致性能。
:::

## 核心特性

::: cards
::: card title="Zero-Config 零配置激活" icon:play
在文档中编写 ` ```js playground ` 或 `::: playground`，即可立即实例化一个交互式沙箱。
:::
::: card title="代码库文件动态嵌入" icon:file-code
通过 `::: playground src="./counter.js" /:::` 直接引用代码库中的源脚本，确保文档示例随实际项目代码自动保持同步。
:::
::: card title="控制台日志实时捕获" icon:terminal
实时拦截并格式化 `console.log()`、`console.info()`、`console.warn()` 和 `console.error()` 输出，并直观展示返回值。
:::
::: card title="实时 HTML & CSS 组件沙箱" icon:layout
在隔离的预览框架内渲染动态 UI 组件，并支持在控制台日志与渲染视图之间便捷切换。
:::
::: card title="docmd-runtime 深度集成" icon:braces
原生访问客户端 `window.docmd` 运行时与响应式页面变量，支持 `docmd.var.get()` 和 `docmd.var.set()`。
:::
::: card title="Live 与 Code 视图切换" icon:columns
在顶栏提供交互式选项卡，可在组件实时渲染输出与底层源代码之间即刻切换（`tabs`）。
:::
::: card title="优雅错误降级与提示" icon:shield-alert
引用的脚本缺失时显示不影响构建的友好警告横幅；代码运行抛出异常时在控制台清晰呈现错误信息。
:::
::: card title="超轻量与极致速度" icon:feather
纯原生 JavaScript 与 CSS 构建（整体体积 < 10 KB），支持常用键盘快捷键（`Cmd+Enter` / `Ctrl+Enter` 运行，`Tab` 缩进）。
:::
:::

## 插件配置

由于 `@docmd/plugin-playground` 属于核心插件，默认开箱即用，无需额外配置。您亦可在 `docmd.config.json` 中自定义全局选项或显式关闭插件：

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

### 配置项说明

| 选项 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | 全局开启或关闭演练场渲染。 |
| `theme` | `string` | `"default"` | 匹配当前 `docmd` 布局的配色主题（`default`, `dark`, `light`）。 |
| `defaultLayout` | `string` | `"split"` | 默认排版形式（`split` 为左右分栏，`stacked` 为上下堆叠）。 |

::: callout tip "禁用插件" icon:slash
若需要在整个文档站点禁用客户端代码求值，请在 `docmd.config.json` 的 `"plugins"` 下设置 `"playground": false`。所有演练场代码块将优雅降级为带语法高亮的基础代码块，且不会注入任何演练场脚本或样式。
:::

## 使用方式

`docmd` 支持多种编写演练场的方式：

1. **[容器语法指南](../content/containers/playground.md)**：推荐用于复杂与灵活的配置，支持 `title`、`icon`、`live`、`tabs`、`readonly` 以及通过 `src="..."` 引用活动脚本。
2. **标准代码围栏语法**：编写 ` ```js playground ` 或 ` ```html playground ` 快速嵌入代码示例。
3. **自闭合容器语法**：编写 `::: playground src="..." /:::` 直接嵌入源码库文件。

完整语法参考及实时运行演示，请参阅 **[Playground 容器文档指南](../content/containers/playground.md)**。