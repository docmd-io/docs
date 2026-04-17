---
title: "翻译内容"
description: "在语言区域子目录中组织翻译内容，支持逐文件降级回退和各区域独立导航。"
---
## 目录结构

每种语言区域（包括默认区域）在源目录中都有自己的子目录。文件夹名称与配置中的区域 `id` 匹配。

```
docs/
├── en/                     ← 默认区域内容
│   ├── index.md
│   ├── navigation.json
│   └── getting-started/
│       └── installation.md
├── hi/                     ← 第二语言区域
│   ├── index.md            ← 翻译后的首页
│   ├── navigation.json     ← 翻译后的导航标签
│   └── getting-started/
│       └── installation.md ← 翻译后的页面
└── zh/                     ← 第三语言区域
    └── index.md            ← 仅翻译了首页
```

源目录是纯净的容器——启用 i18n 后，根目录下不放任何内容文件，只放语言区域文件夹。

::: callout info "文件夹名称由你决定"
文件夹名称直接来自配置中的 `id` 值。如果配置中写的是 `{ id: 'fr-ca' }`，文件夹就是 `docs/fr-ca/`。如果印地语是默认区域（`default: 'hi'`），则 `docs/hi/` 就是规范内容目录。
:::

## 逐文件回退

无需翻译每一个页面。docmd 以**默认区域的目录**为页面规范列表。对于其他区域，会检查每个页面是否存在翻译版本：

- 如果 `docs/hi/getting-started/installation.md` 存在 → 提供印地语翻译
- 如果不存在 → 提供该页面的默认区域版本

当页面发生回退时，docmd 可以显示一个翻译后的提示框，告知用户当前页面以默认语言展示。该消息可通过[UI 字符串](./ui-strings)配置自定义。

## 仅限该区域的页面

非默认区域也可以拥有默认区域中不存在的页面。这些页面仅为该区域渲染，不会出现在其他区域中。

## 翻译导航

每个区域目录都可以有自己的 `navigation.json`。解析优先级：

1. **特定区域** — `docs/hi/navigation.json`（如果存在）
2. **默认区域** — `docs/en/navigation.json`（回退）
3. **版本特定** — `docs-v1/navigation.json`（针对没有区域目录的旧版本）
4. **根配置** — `docmd.config.js` 中的 `navigation` 数组

区域的 `navigation.json` 使用相同格式：

```json
[
  {
    "title": "शुरू करें",
    "children": [
      { "title": "इंस्टालेशन", "path": "/getting-started/installation" },
      { "title": "स्थानीयकरण", "path": "/configuration/localisation" }
    ]
  }
]
```

::: callout tip "部分导航"
只有在需要翻译标签时才需要创建区域 `navigation.json`。如果缺少该文件，将使用默认区域的导航——页面仍正常渲染，只是标签未翻译。
:::

## 版本控制与 i18n 结合使用

同时配置版本控制和 i18n 时，源目录结构如下：

```
docs/                    ← 当前版本（容器）
  en/                    ← 当前版本，默认区域
  hi/                    ← 当前版本，翻译区域
docs-v1/                 ← 旧版本
  index.md               ← 旧版本内容（无区域结构）
  navigation.json
```

早于 i18n 的旧版本可自动工作——当没有区域子目录时，docmd 直接读取。只有默认区域渲染旧版本。如需为旧版本添加翻译，在旧版本目录中创建区域子目录：

```
docs-v1/
  hi/                    ← v1 的印地语翻译
    index.md
    navigation.json
```

输出 URL 按区域优先、版本其次的顺序嵌套：

```
/                        ← 默认区域，当前版本
/hi/                     ← 翻译区域，当前版本
/v1/                     ← 默认区域，旧版本
/hi/v1/                  ← 翻译区域，旧版本
```
