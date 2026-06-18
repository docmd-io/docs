---
title: "国际化"
description: "以本地化优先的路由、翻译后的导航与自动回退，为文档站点提供多语言支持。"
---

为您的文档站点添加多语言支持。docmd 在各自的 URL 前缀下提供每种本地化版本，翻译系统 UI 字符串，并在缺失翻译时优雅回退。

## 在配置中添加语言

```json "docmd.config.json"
{
  "i18n": {
    "default": "en",
    "locales": [
      { "id": "en", "label": "English" },
      { "id": "hi", "label": "हिन्दी" },
      { "id": "zh", "label": "中文" }
    ]
  }
}
```

`default` 本地化版本渲染在站点根路径（`/`）。所有其他本地化版本渲染在 `/{id}/` 下。您可以选择 ID、标签以及哪种语言是默认 —— 这里没有硬编码的假设。如果您希望将印地语设为默认，只需设置 `default: 'hi'`，印地语就会渲染在 `/`，而英语渲染在 `/en/`。

| 键 | 类型 | 说明 |
|:----|:-----|:------------|
| `default` | `string` | 在 `/` 渲染的本地化 ID。若省略，默认为第一个本地化版本。 |
| `locales` | `array` | 本地化对象列表。每个对象必须具有 `id`。 |
| `position` | `string` | 语言切换器出现的位置。`options-menu`（默认）、`sidebar-top` 或 `sidebar-bottom`。 |
| `stringMode` | `boolean` | 为 `true` 时，使用 `data-i18n` 属性替换从单一源生成本地化页面。默认 `false`。 |
| `inPlace` | `boolean` | 为 `true` 时（配合客户端脚本），无需 URL 导航即可切换字符串。仅用于 SPA/Dashboard。默认 `false`。 |

每个本地化对象接受：

| 键 | 类型 | 默认值 | 说明 |
|:----|:-----|:--------|:------------|
| `id` | `string` | - | 您选择的任意标识符（如 `en`、`hi`、`fr-ca`）。用作文件夹名与 URL 前缀。必填。 |
| `label` | `string` | 与 `id` 相同 | 在语言切换器中显示的名称。 |
| `dir` | `string` | `ltr` | 文本方向。对阿拉伯语、希伯来语等设为 `rtl`。 |
| `translations` | `object` | `{}` | 自定义 UI 字符串覆盖（请参阅 [自定义 UI 字符串](ui-strings.md)）。 |

## URL 结构

默认本地化版本没有 URL 前缀。非默认本地化版本嵌套在 `/{id}/` 下。与 [版本管理](../versioning.md) 结合使用时，URL 为 `/{locale}/{version}/page`。

```
/                       ← 默认本地化版本，当前版本
/getting-started        ← 默认本地化版本页面
/05/                    ← 默认本地化版本，旧版本
/hi/                    ← 非默认本地化版本，当前版本
/hi/getting-started     ← 非默认本地化版本页面
/hi/05/                 ← 非默认本地化版本，旧版本
```

切换语言时会保留您当前的页面与版本。切换版本时会保留您当前的本地化版本。

## 缺失的本地化目录

如果在 `locales` 中声明了某个本地化版本，但其源目录不存在（例如没有 `docs/hi/` 文件夹），docmd 会自动在语言切换器中**禁用**该本地化版本。该本地化版本仍会出现在下拉列表中 —— 带有 "N/A" 徽标和灰色样式 —— 但点击不会生效。

这可以避免在内容就绪之前列出已规划语言时出现 404 错误。

## 定位语言切换器

<img width="500" class="with-border" src="/assets/previews/menu-i18n.webp">

使用 `position` 选项控制语言切换器出现的位置：

```json "docmd.config.json"
{
  "i18n": {
    "position": "sidebar-top"
  }
}
```

| 位置 | 行为 |
|:---------|:----------|
| `options-menu` | 紧凑的地球图标，与主题切换和搜索并列。默认。 |
| `sidebar-top` | 完整下拉，含标签，位于侧边栏顶部。 |
| `sidebar-bottom` | 完整下拉，含标签，位于侧边栏底部。 |

## 字符串模式（仅适用于 noStyle 页面）

标准 i18n 使用每个本地化版本一个目录（`docs/en/`、`docs/hi/`），每个目录有自己的 Markdown 文件。**字符串模式** 是一种更简单的替代方案，专为 [noStyle 页面](../../content/no-style-pages.md) 设计 —— 即使用原始 HTML 而非 Markdown 的页面。

```json "docmd.config.json"
  "i18n": {
    "default": "en",
    "stringMode": true,
    "locales": [
      { "id": "en", "label": "English" },
      { "id": "zh", "label": "中文" }
    ]
  }
```

启用 `stringMode: true` 后：

1. 源文件保持在根 `docs/` 目录中（无本地化子目录）
2. 默认本地化版本照常构建在 `/`
3. 对于每个非默认本地化版本，docmd 克隆渲染后的 HTML，并使用 `assets/i18n/{locale}.json` 中的 JSON 文件进行**服务端字符串替换**
4. 输出进入 `/{locale}/` —— 例如 `/zh/index.html` —— 并附带完整的 SEO（hreflang 标签、正确的 `lang` 属性）
5. 若翻译文件缺失，页面会使用默认语言文本渲染

关于 `data-i18n` 属性语法与 JSON 文件格式的完整细节，请参阅 [noStyle 字符串替换](../../content/no-style-pages.md#string-replacement-i18n-for-nostyle)。

::: callout warning "字符串模式不会翻译 Markdown 内容" icon:info
字符串替换的工作原理是在渲染后的 HTML 中查找 `data-i18n` 属性。标准 Markdown 内容（`## Heading`、段落、列表）会渲染为不带这些属性的纯 HTML 标签 —— 因此替换器无内容可查找。

- **文档站点** → 使用目录模式（默认）。每个本地化版本拥有自己的 Markdown 文件，包含完整翻译的正文。
- **落地页、营销站点、Dashboard** → 使用字符串模式。这些是 noStyle 页面，具有自定义 HTML，您可以控制每个标签并添加 `data-i18n` 属性。

如果您的站点同时包含两者 —— 例如，noStyle 落地页加文档 —— 请对文档使用目录模式，并对您的 noStyle 页面添加 `data-i18n` 属性。字符串模式会翻译 noStyle HTML，而目录模式处理文档内容。
:::

## 后续步骤

- [翻译后的内容](translated-content.md) —— 目录结构、撰写翻译、导航
- [UI 字符串与 SEO](ui-strings.md) —— 自定义系统文本、hreflang 标签
- [noStyle 字符串替换](../../content/no-style-pages.md#string-replacement-i18n-for-nostyle) —— noStyle 页面的 `data-i18n` 属性语法与 JSON 格式