---
title: 变量与动态运行时概览
description: 了解 docmd 变量与个性化引擎如何在构建期静态替换和客户端浏览器运行时实现动态、易维护且交互式的文档系统。
---

# 变量与动态运行时概览

docmd 拥有高效的**变量与个性化运行时引擎**，将静态构建期的模板变量插值与客户端浏览器的响应式动态个性化无缝结合。

您无需在数十个 Markdown 文件中硬编码公司名称、API 地址、版本号或版权年份，只需使用简洁优雅的模板语法即可灵活引用动态变量。

```markdown
欢迎查阅 **\{{ site.title }}** v\{{ docmd.version }} 官方技术文档！
当前版权所有：© \{{ docmd.buildYear }}。
```

::: callout info "本次构建实时解析的变量" icon:sparkles
以下数值由 docmd 编译器在本次文档构建过程中实时计算并解析：
- **站点标题：** {{ site.title }}
- **编译器版本：** v{{ docmd.version }}
- **构建年份：** © {{ docmd.buildYear }}
- **当前 Git 分支：** {{ docmd.gitBranch || "main" }}
- **当前 Git 提交：** {{ docmd.gitCommit || "HEAD" }}
- **当前页面 Slug：** `{{ page.slug }}`
:::

## 模板语法

变量引擎使用标准双花括号语法：

```markdown
\{{ variableName }}
```

### 默认回退值 (Fallbacks)

当某个变量在当前环境中未定义（例如在本地离线预览或可选配置场景），可通过 `||` 操作符指定默认回退值：

```markdown
连接至网关服务器：`\{{ server.endpoint || "https://api.example.com" }}`
欢迎回来，\{{ user.name || '访客' }}！
针对版本 \{{ targetVersion || 2.0 }} 编译。
```

回退值可支持：
* 单引号字符串：`'示例'`
* 双引号字符串：`"示例"`
* 数值：`42` 或 `2.0`
* 标识符：`default`

### 空白符容错

表达式对变量名与操作符前后的空格完全宽容：

```markdown
\{{   myVar   }}
\{{ env.PORT || "8080" }}
```

## 变量生命周期：构建期 vs 运行时

docmd 将变量生命周期清晰解耦为两个高效阶段：

::: mermaid title:"变量解析流水线架构图" icon:workflow align:center zoom:true
graph TD
    subgraph 来源["1. 输入与定义来源"]
        B1["docmd.config.json<br/><code>variables</code> 配置块"]
        B2["Git 与系统环境变量<br/><code>env.*</code>, <code>DOCMD_VAR_*</code>, Git 仓库"]
        B3["内置动态元数据<br/><code>version</code>, <code>buildYear</code>, <code>page.slug</code>"]
    end

    subgraph 编译期["2. 构建期静态解析 (@docmd/parser)"]
        来源 --> VReg["VariableRegistry 注册表"]
        VReg --> Interp["Markdown 与配置项插值器"]
        Interp --> HTML["纯静态 HTML (零 JS 开销)"]
        Interp --> Markers["动态标记 &lt;span data-docmd-var&gt;"]
    end

    subgraph 运行时["3. 客户端响应式运行时"]
        Markers --> DRuntime["docmd-runtime.js (window.docmd)"]
        DRuntime --> DOM["页面实时渲染与代码块同步"]
        DRuntime --> Events["跨窗口 postMessage 与事件总线"]
    end
::: /mermaid

::: grids
    ::: grid
        ::: card "构建期静态变量" icon:cpu
        在执行 `docmd build` 时直接内嵌编译至 HTML。在浏览器中零 JS 运行耗时、零网络请求、零累积布局偏移 (CLS)。
        :::
    :::
    ::: grid
        ::: card "客户端响应式变量" icon:sparkles
        用户会话与交互变量（如 API Key 和用户名）由 `docmd-runtime.js` 实时水合。一旦修改，页面所有代码块即刻动态响应。
        :::
    :::
::: /grids

### 构建期静态变量

构建期确定的系统元数据和全局配置会被直接烘焙进最终的 HTML 代码中，对最终读者没有任何渲染延迟。

### 客户端动态变量

被标记为 dynamic 或以 `user.` 开头的变量，会在 HTML 中被轻量级的响应式标记所包裹：

```html
<span data-docmd-var="user.name" class="docmd-var">访客</span>
```

在浏览器加载后，`docmd-runtime.js` 会自动根据当前用户的登录信息或输入框内容刷新对应的值，并在 SPA 无刷新页面切换时保持同步。

## 架构：引擎与界面的严格分离

为了保障极致的性能与系统的长久稳定性，docmd 严格区分了前端呈现与动态运行时内核：

* **`docmd-runtime.js`**：通用无头（Headless）动态引擎，内置于包括默认模板和 `summer` 在内的所有主题中。专注于变量管理、状态持久化与跨窗口事件，绝不干涉 DOM 样式与视觉动画。
* **`docmd-main.js`**：UI 呈现层脚本，负责主题切换、移动端抽屉导航与 SPA 路由。每次页面跳转完成后会自动调用 `window.docmd.sync()` 确保新内容完全水合。

::: callout tip "通用模板兼容性" icon:check-circle
无论使用官方模板还是第三方主题扩展，`docmd-runtime.js` 均会自动加载，开箱即用支持完整的个性化动态变量。
:::

## 深入探索

浏览以下详细指南以掌握各类变量的配置与用法：

::: grids
    ::: grid
        ::: card "内置变量参考" icon:terminal
        版本号、构建时间、年份及 Git 提交元数据。
        [阅读指南](./built-in-variables.md)
        :::
    :::
    ::: grid
        ::: card "配置与自定义变量" icon:settings
        在 `docmd.config.json` 中定义并在页脚、公告栏与文档中引用。
        [阅读指南](./config-variables.md)
        :::
    :::
::: /grids

::: grids
    ::: grid
        ::: card "系统环境变量" icon:server
        CI/CD 流水线集成与 `DOCMD_VAR_*` 免前缀自动提升。
        [阅读指南](./environment-variables.md)
        :::
    :::
    ::: grid
        ::: card "客户端运行时与个性化" icon:sparkles
        浏览器 SDK (`window.docmd`)、动态用户凭证与交互式代码块。
        [阅读指南](./runtime-personalisation.md)
        :::
    :::
::: /grids
