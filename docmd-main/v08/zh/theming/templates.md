---
title: "模板"
description: "以插件形式发布替代的站点布局。模板是以模块化方式覆盖 EJS partial 并附带自定义 CSS/JS bundle 的方式，具备健壮的解析链和优雅的兜底机制（失败时回退到默认主题）。"
---

# 模板

> **0.8.7 新增。** 模板让您以独立插件形式发布完整的替代布局（HTML 结构、partial、CSS、JS）。它们**不是**对现有 theme + customCss 体系的替代 —— 而是在其之上叠加。

**模板**是一个声明了 `capabilities: ['template']` 并附带 `templates[]` 数组（包含 `.ejs` 文件覆盖）的插件。`@docmd/ui` 中的模板解析器（新引入的 `resolveTemplate()`）负责按页查找、尊重 frontmatter / config 的覆盖，并在出错时回退到默认模板。

## 快速开始

### 1. 安装模板

```bash
# 首个官方模板随 0.8.7 一起发布 —— 通过 docmd add 流水线安装：
npx @docmd/core add summer
```

> **发布顺序：** 为满足 npm 的 OIDC 首次发布要求，`@docmd/template-summer@0.8.6` 会先于 monorepo 发布。与 `docmd@0.8.7` 同步发布的版本功能上完全一致。

### 2. 在配置中启用

您只需设置**一个键** —— `theme.name`。docmd 会自动识别这个名字指向的是一个预留的 CSS 主题（`default`、`sky`、`ruby`、`retro`），还是一个模板包（`summer`、…）。

```json "docmd.config.json"
{
  "theme": {
    "name": "summer"
  }
}
```

就这样。每一页都会使用 `summer` 模板的 `layout.ejs`。您没有提供覆盖的页面（sidebar、footer 等）会自动使用默认的 `@docmd/ui` 版本。

> **需要消除歧义？** 使用显式的 `theme.template` 键。存在时，它在模板选择上始终优先于 `theme.name`：
>
> ```json
> { "theme": { "name": "sky", "template": "summer" } }
> ```
> ↑ 使用 **summer** 模板叠加 **sky** 配色。
>
> **自动提升的实际机制。** `theme.name` → `theme.template` 的提升发生在 `normalizeConfig()` 内部，而非解析器：当 `theme.name` 是一个非预留值且 `theme.template` 未设置时，配置会被改写为 `theme.template = theme.name` 并设置 `theme._noCssOverlay = true`（这样生成器就会跳过会 404 的 `docmd-theme-${name}.css` 查询）。在解析时，解析器只会看到 `theme.template`。

### 3. 按页覆盖

```markdown
---
title: "更新日志"
template: "template-changelog"
---

# 更新日志
…
```

仅一个 frontmatter 键就能切换该页的模板。

## 解析链

页面渲染时，解析器按自上而下的顺序遍历解析链，并使用首个匹配项：

| # | 来源 | 示例 |
|---|---|---|
| 1 | `frontmatter.template` | `template: "template-changelog"` |
| 2 | `config.templates[glob]`（未来） | `"blog/*": "template-blog"` |
| 3 | `config.theme.template`（*显式*） | `"template": "summer"` |
| 4 | `config.theme.name`（*若非已知 CSS 主题，自动提升为 template*） | `"name": "summer"` |
| 5 | 内置默认 | `@docmd/ui` 自带的 `.ejs` 文件 |

CSS 主题 `default`、`sky`、`ruby`、`retro` 是预留的 —— 如果 `theme.name` 与其中之一匹配，它仍保持为 CSS 主题。其他任何值会被当作模板名，并自动加载对应的 `@docmd/template-*` 包（无需同时在 `config.plugins` 中列出）。

如果解析到的文件在磁盘上不存在，解析器只会输出一次 TUI 警告并回退到默认。**构建永远不会因为模板问题而失败。**

## 支持的模板插槽

一个模板可以覆盖以下 12 个插槽中的任意一个。未覆盖的插槽自动回退到默认：

| 插槽 | 默认文件 | 用途 |
|---|---|---|
| `layout` | `templates/layout.ejs` | 完整的 HTML 页面 |
| `404` | `templates/404.ejs` | 未找到页面 |
| `toc` | `templates/toc.ejs` | 目录侧边栏 |
| `navigation` | `templates/navigation.ejs` | 侧边栏导航树 |
| `footer` | `templates/partials/footer.ejs` | 页脚 |
| `menubar` | `templates/partials/menubar.ejs` | 顶部导航栏 |
| `options-menu` | `templates/partials/options-menu.ejs` | 搜索/主题/个人菜单 |
| `project-switcher` | `templates/partials/project-switcher.ejs` | 多项目切换器 |
| `version-dropdown` | `templates/partials/version-dropdown.ejs` | 版本选择器 |
| `language-switcher` | `templates/partials/language-switcher.ejs` | 语言切换器 |
| `banner` | `templates/partials/banner.ejs` | 全站公告（新增） |
| `cookie-consent` | `templates/partials/cookie-consent.ejs` | Cookie 对话框（新增） |

> `no-style` 页面没有模板专属内容。无论激活哪个模板，它们始终使用默认的 `templates/no-style.ejs`。

## 编写模板

一个模板就是一个普通的 npm 包：

```
@docmd/template-summer/
├── package.json
├── index.js                # 插件入口 —— 导出 templates[] + templateAssets[]
├── templates/
│   ├── layout.ejs
│   ├── partials/
│   │   ├── menubar.ejs     # 仅覆盖您需要的 partial
│   │   └── footer.ejs
└── assets/
    ├── css/
    │   └── summer.css      # 是否替换 docmd-main.css？不 —— 在其之上叠加。
    └── js/
        └── summer.js
```

### package.json

```json "package.json"
{
  "name": "@docmd/template-summer",
  "version": "0.1.0",
  "type": "module",
  "main": "index.js",
  "peerDependencies": {
    "@docmd/core": ">=0.8.7"
  },
  "docmd": {
    "kind": "template",
    "displayName": "Summer",
    "description": "面向 0.8.7+ 模板系统的明亮夏日风格布局。"
  }
}
```

### index.js

```js
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  plugin: {
    name: 'template-summer',
    version: '0.1.0',
    capabilities: ['template'],
  },

  templates: [
    // 只列出您真正想要覆盖的插槽。
    { type: 'layout',   templatePath: path.join(__dirname, 'templates/layout.ejs') },
    { type: 'menubar',  templatePath: path.join(__dirname, 'templates/partials/menubar.ejs') },
    { type: 'footer',   templatePath: path.join(__dirname, 'templates/partials/footer.ejs') },
  ],

  templateAssets: [
    {
      type: 'css',
      path: path.join(__dirname, 'assets/css/summer.css'),
      priority: 10,           // 高于主题 (5)，低于 customCss (15)
      position: 'head',
    },
    {
      type: 'js',
      path: path.join(__dirname, 'assets/js/summer.js'),
      priority: 10,
      position: 'body',
    },
  ],
};
```

### layout.ejs

模板接收与默认布局相同的 EJS 上下文。最常用的局部变量：

| 局部变量 | 说明 |
|---|---|
| `config` | 归一化后的站点配置。 |
| `frontmatter` | 单页 frontmatter。 |
| `relativePathToRoot` | 例如 `./` 或 `../` —— 用于构建相对 URL。 |
| `renderIcon(name, opts)` | 渲染一个 Lucide 图标。 |
| `t(key, params?)` | 翻译函数。 |
| `buildRelativeUrl(url)` | 解析相对于当前页面的 URL。 |
| `pageTitle`、`siteTitle`、`appearance` | 常用字符串。 |
| `_template` | 关于已解析模板的元数据（0.8.7 新增）。 |

您可以在构建时通过读取 `@docmd/ui` 中的默认 partial 来包含它们。最简单的模式是保留一份您复用的 partial 副本；模板不会自动继承 partial 路径。

## 资源优先级链

CSS 与 JS 按以下顺序加载（数字小的先加载，数字大的在级联冲突中胜出）：

| 优先级 | 层级 | 说明 |
|---|---|---|
| 0  | 基础层（`docmd-main.css`、`docmd-main.js`） | 始终存在。 |
| 5  | 主题配色层（`docmd-theme-sky.css` 等） | 来自 `theme.name`。当名字被自动提升为模板时跳过（见 `_noCssOverlay`）。 |
| 10 | **模板结构**（默认） | 您模板的 CSS —— 如果省略 `priority`，这是默认值。 |
| 15 | 用户的 `customCss` / `customJs` | 始终胜出 —— 这是约定。 |
| 20 | 插件 CSS/JS | lightbox、search、analytics 等。 |
| 25+ | 更高的模板优先级 | **仅在必须覆盖插件时使用。** 官方 Summer 模板声明 `priority: 25`，因此它在插件 CSS 之后加载。更大的值在级联中越靠后。 |

模板可以声明高于 10 的优先级 —— Summer 自身使用 **25** 以覆盖插件样式。推荐区间：**10–20** 用于"用户可覆盖"的模板，**20+** 用于"强观点布局"模板。

::: callout warning "不要使用 !important"
模板应编写能被 `customCss`（优先级 15）覆盖的 CSS。使用 `!important` 会破坏这一约定，导致用户不得不 fork 您的模板才能重新设置样式。（Summer 的 CSS 文件头强制了这一点 —— `!important` 已在 0.8.7 清理时被移除，这样用户无需使用 `!important` 也能覆盖 Summer。）
:::

## 模板本地化

`i18n` 配置仍然适用 —— 当前语言作为普通局部变量传递给您的模板。翻译通过 `t(key)` helper 查找，与默认模板中一致。

## API 参考

### 来自 `@docmd/ui` 的 `resolveTemplate(ctx)`

```ts
import { resolveTemplate } from '@docmd/ui';

const resolved = resolveTemplate({
  type: 'layout',                       // 任一 TemplateSlot
  pagePath: '/guide/intro.html',
  frontmatter: page.frontmatter,        // 可能携带 `template: "..."`
  config,                                 // 归一化后的站点配置
  localeId: 'en',                         // 可选
  versionId: '0.8',                       // 可选
});

// resolved.templatePath → 指向 .ejs 文件的绝对路径
// resolved.source       → 'default' | 'frontmatter' | 'config' | 'plugin'
// resolved.pluginName   → 插件名（当 source === 'plugin' 时）
// resolved.type         → 已解析的插槽
```

### 来自 `@docmd/api` 的类型

```ts
import type {
  TemplateSlot,         // 14 个插槽名的联合类型
  TemplateHook,         // { type, templatePath, priority?, pages?, exclude? }
  TemplateAssetHook,    // { type: 'css'|'js', path, priority?, position? }
  ResolvedTemplate,
  TemplateResolutionContext,
  Capability,           // 现已包含 'template'
} from '@docmd/api';
```

## 故障排查

### "模板声明了插槽 X 但找不到文件"

模板的 `index.js` 中列出的 `templatePath` 在磁盘上不存在。解析器已回退到默认。请检查路径是否为绝对路径（使用 `fileURLToPath(import.meta.url)`），并确认文件已包含在发布包的 `files` 字段中。

### 我模板的 CSS 被其他东西覆盖了

CSS 优先级是最终裁决。用户的 `customCss`（优先级 15）始终胜出。如果您希望用户在不完全覆盖整个模板的前提下，能够覆盖某些具体选择器，请在文档中说明可公开的 CSS 类名，并让用户使用 `customCss` 来针对它们。

### 按页模板覆盖不生效

请确认 frontmatter 中的 `template` 值与已注册的插件匹配。解析器根据插件的 `descriptor.name` 进行匹配，会剥离 `@docmd/` 与 `template-` 前缀。因此以下写法是等价的：

- `template: "summer"`
- `template: "template-summer"`
- `template: "@docmd/template-summer"`

如果都不匹配，解析器会继续尝试 `config.theme.template`，最后回退到默认。