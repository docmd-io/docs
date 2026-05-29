---
title: "国际化"
description: "通过语言区域优先路由、翻译导航和自动降级回退，以多种语言提供文档服务。"
---
为你的文档站点添加多语言支持。docmd 以各自的 URL 前缀提供每种语言区域的内容，翻译系统 UI 字符串，并在缺少翻译时优雅地回退。

## 在配置中添加语言

```js
// docmd.config.js
export default {
  i18n: {
    default: 'en',
    locales: [
      { id: 'en', label: 'English' },
      { id: 'hi', label: 'हिन्दी' },
      { id: 'zh', label: '中文' }
    ]
  }
}
```

`default` 语言区域在站点根路径（`/`）渲染。其他所有区域在 `/{id}/` 渲染。你可以自由选择 ID、标签以及哪个区域为默认值 -  - 没有任何硬编码假设。如果想以印地语为默认语言，设置 `default: 'hi'`，印地语将在 `/` 渲染，英语在 `/en/` 渲染。

| 键 | 类型 | 说明 |
|:----|:-----|:------------|
| `default` | `string` | 在 `/` 渲染的区域 ID。省略时默认为第一个区域。 |
| `locales` | `array` | 区域对象列表。每个对象必须包含 `id`。 |
| `position` | `string` | 语言切换器的显示位置。`options-menu`（默认）、`sidebar-top` 或 `sidebar-bottom`。 |

每个区域对象可包含以下字段：

| 键 | 类型 | 默认值 | 说明 |
|:----|:-----|:--------|:------------|
| `id` | `string` | - | 你选择的任意标识符（如 `en`、`hi`、`fr-ca`）。用作文件夹名称和 URL 前缀。必填。 |
| `label` | `string` | 同 `id` | 语言切换器中显示的名称。 |
| `dir` | `string` | `ltr` | 文字方向。阿拉伯语、希伯来语等设为 `rtl`。 |
| `translations` | `object` | `{}` | 自定义 UI 字符串覆盖（参见 [自定义 UI 字符串](./ui-strings)）。 |

## URL 结构

默认区域没有 URL 前缀。非默认区域嵌套在 `/{id}/` 下。与[版本控制](../versioning)结合使用时，URL 格式为 `/{locale}/{version}/page`。

```
/                       ← 默认区域，当前版本
/getting-started        ← 默认区域页面
/05/                    ← 默认区域，旧版本
/hi/                    ← 非默认区域，当前版本
/hi/getting-started     ← 非默认区域页面
/hi/05/                 ← 非默认区域，旧版本
```

切换语言时，语言切换器会保留当前页面和版本。版本切换器会保留当前语言区域。

## 缺失的语言区域目录

如果在 `locales` 中声明了某个语言区域，但其源目录不存在（例如没有 `docs/hi/` 文件夹），docmd 会自动在语言切换器中**禁用**该语言区域。该语言区域仍会出现在下拉菜单中 - 带有"N/A"标记和灰色样式 - 但点击不会产生任何效果。

这可以防止在您列出计划中的语言但内容尚未准备好时出现 404 错误。

## 语言切换器位置

使用 `position` 选项控制语言切换器的显示位置：

```js
i18n: {
  position: 'options-menu',  // 默认
  // ...
}
```

| 位置 | 行为 |
|:---------|:----------|
| `options-menu` | 紧凑的地球仪图标，与主题切换和搜索并排。默认。 |
| `sidebar-top` | 带标签的完整下拉菜单，位于侧边栏顶部。 |
| `sidebar-bottom` | 带标签的完整下拉菜单，位于侧边栏底部。 |

## 字符串模式（仅适用于 noStyle 页面）

标准 i18n 对每种语言区域使用单独的目录（`docs/en/`、`docs/hi/`），每个目录都有自己的 markdown 文件。**字符串模式**是一种更简单的替代方案，专为 [noStyle 页面](../../content/no-style-pages.md) 设计 - 使用原始 HTML 而非 markdown 的页面。

```json
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

1. 源文件保留在根 `docs/` 目录中（无语言子目录）
2. 默认语言区域正常在 `/` 构建
3. 对于每种非默认语言区域，docmd 会克隆渲染的 HTML，并使用 `assets/i18n/{locale}.json` 中的 JSON 文件应用**服务器端字符串替换**
4. 输出到 `/{locale}/` - 例如 `/zh/index.html` - 包含完整 SEO（hreflang 标签、正确的 `lang` 属性）
5. 如果翻译文件缺失，页面将使用默认语言文本渲染

有关 `data-i18n` 属性语法和 JSON 文件格式的完整详情，请参阅 [noStyle 字符串替换](../../content/no-style-pages.md#string-replacement-i18n-for-nostyle)。

::: callout warning "字符串模式不翻译 markdown 内容" icon:info
字符串替换通过在渲染的 HTML 中查找 `data-i18n` 属性来工作。标准 markdown 内容（`## Heading`、段落、列表）渲染为普通 HTML 标签，没有这些属性 - 因此替换器找不到任何内容。

- **文档站点** → 使用目录模式（默认）。每种语言区域都有自己的 markdown 文件，包含完全翻译的文章。
- **着陆页、营销网站、仪表板** → 使用字符串模式。这些是 noStyle 页面，使用自定义 HTML，你可以控制每个标签并添加 `data-i18n` 属性。

如果你的站点同时包含两者 - 例如，noStyle 着陆页 plus 文档 - 对文档使用目录模式，并在你的 noStyle 页面添加 `data-i18n` 属性。字符串模式将翻译 noStyle HTML，而目录模式处理文档内容。
:::

## 后续步骤

- [翻译内容](translated-content.md) - 目录结构、编写翻译、导航
- [UI 字符串与 SEO](ui-strings.md) - 自定义系统文本、hreflang 标签
- [noStyle 字符串替换](../../content/no-style-pages.md#string-replacement-i18n-for-nostyle) - noStyle 页面的 `data-i18n` 属性语法和 JSON 格式
