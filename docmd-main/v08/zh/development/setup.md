---
title: "Setup"
description: "本地运行本站、链接到全局 docmd 安装并执行完整的验证流水线。"
---

# Setup

> **面向本站点的贡献者。** 想为 docmd 框架本身做贡献？请参阅 [GitHub 贡献指南](https://github.com/docmd-io/docmd?tab=contributing-ov-file) —— 框架的开发流程在那里维护。

本页介绍如何参与 **这个文档站点**（`docmd-io/docs`）的开发，而不是 docmd 框架（`docmd-io/docmd`）。

## 前置条件

- **Node.js**：v22.x 或更高版本（推荐 LTS）
- **pnpm**：v10.x 或更高版本

## 本地开发

```bash
git clone https://github.com/docmd-io/docs.git
cd docs
pnpm install
npx @docmd/core dev
```

站点会在 `http://localhost:3000` 提供服务，并支持热刷新。

### 关联本地框架

如果您正在 `docmd-io/docmd` 中修改框架代码，并希望这些改动反映到本站：

```bash
# 在框架仓库中
pnpm build

# 在本站中链接本地构建
npx @docmd/core link ../docmd/packages/core
```

然后重启 `npx @docmd/core dev`。您对框架的修改会在框架重新构建后生效。

## 质量门禁

在发起 Pull Request 之前：

```bash
# 对 Markdown 进行 lint，并检查失效链接
pnpm lint

# 完整验证流水线（lint + build + 失效链接检查）
pnpm verify
```

该流水线与维护者在每个 PR 上运行的内容一致。必须全部通过（绿灯）才能合并。

## 翻译

添加或更新 `de/`、`zh/` 内容的流程：

1. 修改 EN 原文 `docmd-main/v08/en/...`。
2. 在 `de/`、`zh/` 中镜像此次改动（保持路径一致、翻译正文、保留 frontmatter 键、保留容器标记、代码块原样不动）。
3. 保留代码块上的文件标题（如 ` ```json "docmd.config.json"`）。
4. 运行 `pnpm verify`，确认链接与结构仍然有效。

翻译的 house style 与代码块文件标题规则，请查阅项目 memory。

## 项目结构

```
docs/
├── docmd-main/v08/
│   ├── en/                  # 英文规范源
│   ├── de/                  # 德文翻译（与 en/ 对应）
│   ├── zh/                  # 中文翻译（与 en/ 对应）
│   └── navigation.json      # 单一导航，按 locale 复制
├── docmd-search/            # 搜索索引资源
├── docs/                    # 其他文档项目（docmd-search、docmd-main 等）
└── package.json
```

## 下一步

- [开发插件](/development/building-plugins) —— 编写自定义 docmd 插件。
- [插件示例](/development/plugin-examples) —— 查看完整的插件演练。
- [开发模板](/development/building-templates) —— 编写 docmd 模板。
- [Node API 参考](/development/node-api-reference) —— 程序化构建 API。
