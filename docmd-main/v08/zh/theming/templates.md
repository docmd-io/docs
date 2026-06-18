---
title: "模板 (Templates)"
description: "通过 npm 安装替代的站点布局。每个模板都在默认主题之上叠加一套完整的 HTML/CSS/JS 资源。"
---

# 模板 (Templates)

::: callout info
**0.8.7 新增。** 模板让您可以把一套完整的替代布局（HTML 结构、partials、CSS、JS）作为独立插件发布。它构建于现有的 `theme` + `customCss` 体系之上 —— 并非取而代之。
:::

**模板 (Template)** 是一个 npm 包，它声明 `capabilities: ['template']`，并提供一组 `.ejs` partial 覆盖以及自己的 CSS / JS bundle。`@docmd/ui` 中的解析器会沿着固定的优先级链查找每个 slot 对应的 partial，遇到任何问题都会回退到默认实现。**任何模板问题都不会导致构建失败。**

## 快速开始

### 1. 安装模板

```bash
# 0.8.7 随第一个官方模板一起发布 —— 通过 docmd add 流程安装：
npx @docmd/core add summer
```

### 2. 在配置中启用

只需设置 **一个键** —— `theme.name`。docmd 会自动判断这个名字指向的是保留的 CSS 主题（`default`、`sky`、`ruby`、`retro`）还是一个模板包（`summer` 等）。

```json "docmd.config.json"
{
  "theme": {
    "name": "summer"
  }
}
```

此后每个页面都会使用 `summer` 模板的 `layout.ejs`。您没有覆盖的 slot（侧边栏、页脚等）会自动回退到 `@docmd/ui` 的默认实现。

::: callout info
**想在某个 CSS 主题之上叠加模板？** 使用显式的 `theme.template` 键。它始终优先于 `theme.name`：
```json "docmd.config.json"
{
  "theme": {
    "name": "sky",
    "template": "summer"
  }
}
```
↑ **summer** 的结构 + **sky** 的配色。
:::

### 3. 按页面覆盖

只需一个 frontmatter 键，就能让该页面单独使用其他模板：

```markdown
---
title: "Changelog"
template: "template-changelog"
---

# Changelog
…
```

## 解析链

页面渲染时，解析器自上而下遍历这条链，取首个匹配：

| # | 来源 | 示例 |
|---|---|---|
| 1 | `frontmatter.template` | `template: "template-changelog"` |
| 2 | `config.templates[glob]` | `"blog/*": "template-blog"` |
| 3 | `config.theme.template` *(显式)* | `"template": "summer"` |
| 4 | `config.theme.name` *(若不是已知 CSS 主题则自动提升为模板)* | `"name": "summer"` |
| 5 | 内置默认 | 由 `@docmd/ui` 自带的 `.ejs` 文件 |

CSS 主题 `default`、`sky`、`ruby`、`retro` 属于保留名 —— 若 `theme.name` 命中其中之一，就仍是 CSS 主题。其他任何值都会被视作模板名，对应的 `@docmd/template-*` 包会自动加载。

若解析到的文件在磁盘上不存在，解析器会打印一条 TUI 警告并回退到默认实现。

## 支持的模板 slot

模板可以覆盖以下 12 个 slot 中的任何一个。未覆盖的 slot 会回退到默认：

| Slot | 默认文件 | 用途 |
|---|---|---|
| `layout` | `templates/layout.ejs` | 完整的 HTML 页面 |
| `404` | `templates/404.ejs` | 404 页面 |
| `toc` | `templates/toc.ejs` | 目录侧边栏 |
| `navigation` | `templates/navigation.ejs` | 侧边栏导航树 |
| `footer` | `templates/partials/footer.ejs` | 页脚 |
| `menubar` | `templates/partials/menubar.ejs` | 顶部导航栏 |
| `options-menu` | `templates/partials/options-menu.ejs` | 搜索/主题/个人菜单 |
| `project-switcher` | `templates/partials/project-switcher.ejs` | 多项目切换器 |
| `version-dropdown` | `templates/partials/version-dropdown.ejs` | 版本选择器 |
| `language-switcher` | `templates/partials/language-switcher.ejs` | 语言切换器 |
| `banner` | `templates/partials/banner.ejs` | 站点横幅 |
| `cookie-consent` | `templates/partials/cookie-consent.ejs` | Cookie 同意对话框 |

::: callout info
`no-style` 页面没有模板专属副本。无论激活的是哪个模板，它们始终使用默认的 `templates/no-style.ejs`。
:::

## 资源优先级

当多个模板与您的 `customCss` 都提供了 CSS / JS 时，它们按下表顺序加载（数值小的先加载，数值大的在级联冲突中胜出）：

| 优先级 | 层级 |
|---|---|
| 0 | 基础 (`docmd-main.css`、`docmd-main.js`) |
| 5 | 主题配色层（如 `docmd-theme-sky.css`） |
| 10 | **模板结构**（模板的默认优先级） |
| 15 | 用户 `customCss` / `customJs` —— 始终胜出 |
| 20 | 插件 CSS/JS |
| 25+ | 高优先级模板（Summer 即使用 25） |

若想覆盖某个模板的样式，请将规则放入项目级 `customCss`（优先级 15）。请避免在模板 CSS 中使用 `!important`，这样用户无需 fork 就能调整。

## 模板本地化

当前 locale 会作为普通 local 传入您的模板。翻译仍通过 `t(key)` helper 查找 —— 您既有的 `assets/i18n/<locale>.json` 文件继续有效。

## 接下来

- [开发模板](/development/building-templates) —— 编写您自己的模板包。
- [主题定制](/theming/custom-css-js) —— 在任意模板上叠加 `customCss`。
- [自定义登录页](/theming/landing-pages) —— 把模板首页改成您自己的样子。