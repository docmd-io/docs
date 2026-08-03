---
title: "开发模板 (Building Templates)"
description: "编写 docmd 模板包 —— 目录结构、描述符、EJS 上下文、资源优先级与 API 参考。"
---

# 开发模板

> **面向模板作者。** 若您只是想在文档站点中*使用*模板，请参阅 [模板 (Templates)](/theming/templates)。

模板就是一个普通的 npm 包，声明 `capabilities: ['template']` 并提供一个 `templates[]` 数组（包含一组 `.ejs` 覆盖文件）。`@docmd/ui` 中的模板解析器负责按页查找、识别 frontmatter 与 config 中的覆盖，并在必要时回退到默认实现。

## 包结构

```
@docmd/template-summer/
├── package.json
├── index.js                # 插件入口 —— 导出 templates[] 与 templateAssets[]
├── templates/
│   ├── layout.ejs
│   ├── partials/
│   │   ├── menubar.ejs     # 仅包含您需要覆盖的 partial
│   │   └── footer.ejs
└── assets/
    ├── css/
    │   └── summer.css      # 叠加在 docmd-main.css 之上，并非替换。
    └── js/
        └── summer.js
```

## `package.json`

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
    "description": "为 0.8.7+ 模板系统打造的明亮夏日风格布局。"
  }
}
```

## ESM exports — `default` 条件

您的 `package.json` **必须**在 `exports["."]` 中同时包含 `import` 条
件和 `"default"` 条件:

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js",
    "default": "./dist/index.js"
  }
}
```

如果您只声明 `import`,自动安装器的第一次尝试会抛出
`ERR_PACKAGE_PATH_NOT_EXPORTED`,因为 Node 的 CommonJS 解析器找不到
任何匹配条件。重试路径仍会成功(它直接使用动态 `import()`),但构
建每次都会打印一行多余的 "Plugin installed" 提示。插件
(`@docmd/plugin-*`) 的要求相同 —— 完整说明请参阅
[插件开发指南](building-plugins.md#esm-exports--default-条件)。

## `index.js`

```js "index.js"
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
    // 仅列出您真正想要覆盖的 slot。
    { type: 'layout',   templatePath: path.join(__dirname, 'templates/layout.ejs') },
    { type: 'menubar',  templatePath: path.join(__dirname, 'templates/partials/menubar.ejs') },
    { type: 'footer',   templatePath: path.join(__dirname, 'templates/partials/footer.ejs') },
  ],

  templateAssets: [
    {
      type: 'css',
      path: path.join(__dirname, 'assets/css/summer.css'),
      priority: 10,           // 高于主题（5），低于 customCss（15）
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

## `layout.ejs` 上下文

模板会收到与默认布局相同的 EJS 上下文。常用 locals：

| Local | 说明 |
|---|---|
| `config` | 规范化后的站点配置。 |
| `frontmatter` | 当前页面的 frontmatter。 |
| `relativePathToRoot` | 如 `./` 或 `../` —— 用它构建相对 URL。 |
| `renderIcon(name, opts)` | 渲染一个 Lucide 图标。 |
| `t(key, params?)` | 翻译函数。 |
| `buildRelativeUrl(url)` | 将 URL 解析为相对于当前页面的路径。 |
| `pageTitle`, `siteTitle`, `appearance` | 常用字符串。 |
| `_template` | 已解析模板的元数据（0.8.7 新增）。 |

您可以在构建时读取 `@docmd/ui` 自带的默认 partial。最简单的模式是保留您复用 partial 的一份副本；模板不会自动继承 partial 路径。

## 资源优先级链

CSS 与 JS 按下表顺序加载（数值小的先加载，数值大的在级联冲突中胜出）：

| 优先级 | 层级 | 说明 |
|---|---|---|
| 0  | 基础 (`docmd-main.css`、`docmd-main.js`) | 始终存在。 |
| 5  | 主题配色层（如 `docmd-theme-sky.css`） | 来自 `theme.name`。当名字已被自动提升为模板时跳过（见 `_noCssOverlay`）。 |
| 10 | **模板结构**（默认） | 您模板的 CSS —— 省略 `priority` 时的默认值。 |
| 15 | 用户 `customCss` / `customJs` | 始终胜出 —— 这是契约。 |
| 20 | 插件 CSS/JS | lightbox、search、analytics 等。 |
| 25+ | 更高优先级模板 | **仅在必须覆盖插件时使用。** 官方 Summer 模板声明 `priority: 25`，使其在插件 CSS 之后加载。更高的值会在更晚的位置级联。 |

模板可以将 priority 声明为高于 10 —— Summer 自身使用 **25**，以覆盖插件样式。推荐的区间是 **10–20**（"用户可覆盖"的模板）与 **20+**（"主张强烈"的布局模板）。

::: callout warning "请勿使用 !important"
模板编写的 CSS 应当能被优先级 15 的 `customCss` 覆盖。使用 `!important` 会破坏这一契约，迫使用户只能 fork 您的模板才能调整。（Summer 的 CSS 文件头会强制这一点 —— `!important` 已在 0.8.7 清理中移除，让用户最终不再需要靠自己的 `!important` 才能覆盖 Summer。）
:::

## `theme.name` 的自动提升

`theme.name` → `theme.template` 的提升发生在 `normalizeConfig()` 中，而非解析器里：

- 当 `theme.name` 是非保留值且 `theme.template` 未设置时，配置会被改写为 `theme.template = theme.name`，并设置 `theme._noCssOverlay = true`（这样生成器会跳过对 `docmd-theme-${name}.css` 的查找 —— 否则会 404）。
- 在解析阶段，解析器看到的永远只有 `theme.template`。

这正是为什么一个非保留的 `theme.name` 能自动加载您的模板 —— 您无需把它也写到 `config.plugins` 里。

## 模板本地化

`i18n` 配置仍然生效 —— 当前 locale 会作为普通 local 传入您的模板。翻译仍通过 `t(key)` 助手查找，就像在默认模板中一样。

## API 参考

### `@docmd/ui` 中的 `resolveTemplate(ctx)`

```ts
import { resolveTemplate } from '@docmd/ui';

const resolved = resolveTemplate({
  type: 'layout',                       // 任意 TemplateSlot
  pagePath: '/guide/intro.html',
  frontmatter: page.frontmatter,        // 可能带有 `template: "..."`
  config,                                 // 规范化后的站点配置
  localeId: 'en',                         // 可选
  versionId: '0.8',                       // 可选
});

// resolved.templatePath → .ejs 文件的绝对路径
// resolved.source       → 'default' | 'frontmatter' | 'config' | 'plugin'
// resolved.pluginName   → 插件名（当 source === 'plugin' 时）
// resolved.type         → 已解析的 slot
```

### `@docmd/api` 中的类型

```ts
import type {
  TemplateSlot,         // 12 个 slot 名称的联合
  TemplateHook,         // { type, templatePath, priority?, pages?, exclude? }
  TemplateAssetHook,    // { type: 'css'|'js', path, priority?, position? }
  ResolvedTemplate,
  TemplateResolutionContext,
  Capability,           // 现已包含 'template'
} from '@docmd/api';
```

## 故障排查

### "模板声明了 slot X，但文件找不到"

模板的 `index.js` 中列出的 `templatePath` 在磁盘上不存在，解析器回退到了默认实现。请检查路径是否为绝对路径（使用 `fileURLToPath(import.meta.url)`），以及该文件是否包含在发布包的 `files` 字段中。

### 我模板的 CSS 被别的东西覆盖了

CSS 优先级是最终裁决。用户 `customCss`（优先级 15）始终胜出。如果您希望用户在不覆盖整个模板的前提下覆盖特定选择器，请公开您模板的 CSS 类名，并让用户通过 `customCss` 进行精确覆盖。

### 按页面覆盖模板无效

请确保 frontmatter 中的 `template` 值与已注册的插件匹配。解析器在比对插件的 `descriptor.name` 时会自动去除 `@docmd/` 与 `template-` 前缀。因此以下写法等价：

- `template: "summer"`
- `template: "template-summer"`
- `template: "@docmd/template-summer"`

若都不匹配，解析器会继续回退到 `config.theme.template`，最后回退到默认。