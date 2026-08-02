---
title: "无样式页面"
description: "通过禁用默认 docmd 主题创建自定义落地页和独特布局。"
---

docmd 允许您按页面绕过标准的文档布局（侧边栏、页头、页脚）。这非常适合创建落地页或自定义仪表板，同时保留对引擎组件的访问能力。

## 启用 No-Style 模式

要禁用全局 UI，请在页面的 frontmatter 中添加 `noStyle: true`。

```yaml
---
title: "产品展示"
noStyle: true
components:
  meta: true      # 保留 SEO 与 OpenGraph 标签
  favicon: true   # 保留站点 favicon
  css: true       # 注入 docmd-main.css 以获得排版基础
---

<!-- 这里是原始 HTML 或专门的 Markdown -->
<div class="hero">
  <h1>下一代文档</h1>
  <p>零配置。同构。AI 就绪。</p>
</div>

::: callout info "支持无限嵌套" icon:info
即使启用了 `noStyle: true`，所有标准的 docmd 容器（如 `::: card`、`::: tabs`、`::: hero`）仍完全受支持，并且可以无限嵌套。
:::
```

## 组件选择启用

当 `noStyle` 处于激活状态时，您从一个空白画布开始。按需有选择地重新启用核心系统组件：

| 组件 | 说明 |
| :--- | :--- |
| `meta` | 注入 `<title>`、SEO meta 标签和结构化的 OpenGraph 数据。 |
| `favicon` | 注入项目范围内的 favicon。 |
| `css` | 注入 `docmd-main.css`。强烈推荐用于基础网格和排版。 |
| `menubar` | 注入站点的顶部菜单栏。 |
| `theme` | 注入当前主题的 CSS 变量和外观覆盖。 |
| `scripts` | 注入交互式组件逻辑（需要 `mainScripts: true`）。 |
| `spa` | 启用单页应用路由（需要 `scripts: true`）。 |

## 可组合的落地页

`noStyle` 的主要威力在于将 docmd 组件用作空白画布上的高保真"小部件"。您不仅限于使用原始 HTML；您可以纯粹在 Markdown 中构建复杂的结构化设计。

### 构建现代入口页面

```yaml
---
title: "欢迎"
noStyle: true
components:
  meta: true
  css: true
  menubar: true    # 使用站点的顶部导航
  scripts: true    # 启用交互式组件
  mainScripts: true
---

::: hero layout:split glow:true
# 打造令人惊艳的文档。
面向现代工程团队的零配置引擎。

::: button "开始使用" ../getting-started/quick-start.md color:blue
::: button "GitHub" github:docmd-io/docmd color:gray

== side
::: embed "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
:::
:::

::: grids
  ::: card "零配置"
  只需编写 Markdown。无需复杂的 React 逻辑或构建脚本。
  :::
  ::: card "AI 优化"
  为 LLM 时代设计的结构感知解析。
  :::
  ::: card "没有框架开销的高速体验"
  带同构 SPA 导航的静态生成。
  :::
:::
```

::: callout tip "AI 生成的布局" icon:lightbulb
由于 `noStyle` 页面同时支持原始 HTML 和 docmd 容器，它们非常适合 **AI 驱动的 UI 设计**。向 AI 提示：*"使用工具类和 docmd 按钮设计一个现代 hero 区域，包裹在 noStyle 容器中。"* AI 可以在您的静态站点流水线中零配置地迭代。
:::

## 字符串替换（针对 noStyle 的 i18n）

当您的站点配置了 [i18n](../configuration/localisation/index.md) 时，主题文档页面会自动获得完整的服务端翻译。然而，`noStyle` 页面使用自定义 HTML。docmd 提供 **字符串替换** 来通过 `data-i18n` 属性和 JSON 翻译文件翻译 HTML。

::: callout info "为什么这仅适用于 noStyle 页面" icon:info
字符串替换会查找具有 `data-i18n` 属性的元素并替换其文本内容。标准 Markdown 内容会渲染为不带这些属性的纯 `<p>`、`<h2>`、`<li>` 标签。对于标准 Markdown，请使用 [目录模式](../configuration/localisation/translated-content.md)。
:::

### 工作原理

字符串替换有两种模式：

- **服务端（推荐）**：在您的 i18n 配置中设置 `stringMode: true`，docmd 会在**构建时**解析 `data-i18n` 属性。它会在 `/{locale}/` 目录下为搜索引擎生成完全翻译的 HTML。
- **客户端**：`docmd-i18n-strings.js` 脚本通过 XHR 在运行时加载翻译。这对于无需页面重载的原地切换非常有用。

两种模式使用相同的 `data-i18n` 属性语法和 JSON 文件格式。

1. 将 JSON 翻译文件放在 `assets/i18n/` 中 —— 每个语言一个文件：

```text
assets/
  i18n/
    en.json
    hi.json
    zh.json
```

2. 每个 JSON 文件是一个扁平的键值映射：

```json "assets/i18n/en.json"
{
  "hero.title": "Markdown → Production Docs",
  "hero.subtitle": "The zero-config documentation engine.",
  "nav.docs": "Documentation",
  "nav.editor": "Live Editor",
  "cta.getStarted": "Get Started",
  "cta.install": "npm i @docmd/core"
}
```

3. 在您的 HTML 元素上使用 `data-i18n` 属性：

```html
<h1 data-i18n="hero.title">Markdown → Production Docs</h1>
<p data-i18n="hero.subtitle">The zero-config documentation engine.</p>
<a data-i18n="nav.docs" href="/docs">Documentation</a>
```

默认语言文本作为回退。当非默认语言被激活时，引擎会替换文本。

### 属性翻译

要翻译 `placeholder`、`title` 或 `aria-label` 等属性，请使用 `data-i18n-{attr}`：

```html
<input data-i18n-placeholder="search.placeholder" placeholder="Search...">
<button data-i18n-aria-label="nav.menuLabel" aria-label="Open menu">☰</button>
<a data-i18n-title="nav.tooltip" title="Go to docs">Docs</a>
```

### HTML 内容

对于包含 HTML 标记的键，请使用 `data-i18n-html` 而不是 `data-i18n`：

```html
<p data-i18n-html="hero.desc">Static HTML for SEO. <br>SPA for speed.</p>
```

### 切换语言

i18n 字符串模块通过 `window.DOCMD_I18N_STRINGS` 暴露一个全局 API：

```javascript
// 切换语言
DOCMD_I18N_STRINGS.switchLocale("hi");

// 获取当前语言
console.log(DOCMD_I18N_STRINGS.locale);

// 获取所有语言
console.log(DOCMD_I18N_STRINGS.locales);
```

您可以使用此 API 构建自定义的语言切换器：

```html
<select onchange="DOCMD_I18N_STRINGS.switchLocale(this.value)">
  <option value="en">English</option>
  <option value="hi">हिन्दी</option>
</select>
```

### 事件

监听 `docmd:i18n-applied` 事件，在字符串应用后运行自定义逻辑：

```javascript
document.addEventListener("docmd:i18n-applied", function(e) {
  console.log("Locale:", e.detail.locale);
  console.log("Strings:", e.detail.strings);
});
```

::: callout info "自动检测" icon:info
该脚本从 URL 路径前缀检测当前语言。对于默认语言，它会检查 `localStorage` 中保存的偏好设置。`switchLocale()` 函数会自动处理 URL 导航。
:::

### 原地模式

对于单页站点，请在 i18n 配置中设置 `inPlace: true` 以在无需 URL 重定向的情况下切换字符串：

```json "docmd.config.json"
{
  "i18n": {
    "default": "en",
    "locales": [
      { "id": "en", "label": "English" },
      { "id": "zh", "label": "中文" }
    ],
    "inPlace": true
  }
}
```

启用 `inPlace: true` 后，调用 `switchLocale()` 会重新加载新语言的 JSON 并即时替换所有 `data-i18n` 字符串。不会发生导航。