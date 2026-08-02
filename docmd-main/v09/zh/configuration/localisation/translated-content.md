---
title: "翻译后的内容"
description: "通过按文件回退与按本地化的导航，在本地化子目录中组织翻译。"
---

## 目录结构

每种本地化版本都存放在源目录内各自的子目录中。文件夹名与配置中的本地化 `id` 相匹配。

```text
docs/
├── en/                     ← 默认本地化内容
│   ├── index.md
│   ├── navigation.json
│   └── getting-started/
│       └── installation.md
├── hi/                     ← 第二种本地化版本
│   ├── index.md            ← 已翻译的首页
│   ├── navigation.json     ← 已翻译的导航标签
│   └── getting-started/
│       └── installation.md ← 已翻译的页面
└── zh/                     ← 第三种本地化版本
    └── index.md            ← 仅翻译了首页
```

源目录只包含本地化文件夹。启用 i18n 时，根目录下不放置任何内容文件。

::: callout info "文件夹名由您决定" icon:info
文件夹名与配置中的 `id` 值匹配。如果您的配置设置了 `{ id: 'fr-ca' }`，则文件夹为 `docs/fr-ca/`。
:::

## 按文件回退

您无需翻译每个页面。docmd 扫描**默认本地化目录**作为规范结构。对于其他每种本地化版本，它会检查是否存在翻译页面：

- 如果 `docs/hi/getting-started/installation.md` 存在 → 提供印地语翻译版本。
- 如果不存在 → 提供默认本地化版本。

当页面回退时，docmd 会显示一个翻译后的标注，以告知查看者该页面以默认语言显示。通过您的 [UI 字符串](ui-strings.md) 配置自定义此消息。

## 本地化专属页面

非默认本地化版本可以托管默认本地化版本中不存在的页面。这些页面仅对该特定本地化版本渲染。

## 翻译导航

每个本地化目录都可以包含自己的 `navigation.json`。docmd 使用级联优先级系统来解析侧边栏。

关于解析层级的细节，请参阅 [导航配置](../navigation.md)。

本地化的 `navigation.json` 使用标准格式：

```json "navigation.json"
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

::: callout tip "部分导航" icon:info
仅在需要翻译后的标签时才创建本地化的 `navigation.json`。如果缺失，则使用默认导航。
:::

## 版本管理与 i18n

结合版本管理与 i18n 时，按层次结构组织源目录：

```text
docs/                    ← 当前版本
  en/                    ← 当前版本，默认本地化
  hi/                    ← 当前版本，已翻译的本地化
docs-v1/                 ← 旧版本
  en/                    ← v1，默认本地化
  hi/                    ← v1，已翻译的本地化
```

输出 URL 首先嵌套本地化版本，然后是版本：

```text
/                        ← 默认本地化，当前版本
/hi/                     ← 已翻译的本地化，当前版本
/v1/                     ← 默认本地化，旧版本
/hi/v1/                  ← 已翻译的本地化，旧版本
```