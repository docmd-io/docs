---
title: "参与贡献"
description: "贡献 docmd 的指南与开发环境配置说明。"
---

感谢你有意向为 `docmd` 做贡献！我们欢迎 Bug 修复、文档改进、新功能开发以及设计建议。

## 开发环境

`docmd` 是一个由 [pnpm](https://pnpm.io/) 管理的 monorepo 项目。

### 前置要求

- **Node.js**：v22.x 或更高版本（推荐使用 LTS 版）
- **pnpm**：v10.x 或更高版本

### 项目配置

克隆仓库后，运行自动化初始化工具安装依赖并执行首次构建：

```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd
pnpm onboard
```

如需将本地 `docmd` 命令全局链接以在其他项目中测试：

```bash
pnpm onboard --link
```

### 本地开发

在监听核心引擎变更的同时运行文档网站：

```bash
pnpm run dev
```

若要同时监听内部源文件（引擎、模板和插件），请设置 `DOCMD_DEV` 环境变量：

```bash
DOCMD_DEV=true pnpm run dev
```

## 代码质量标准

请确保你的代码符合 ESLint 配置的要求。如有格式问题，可运行：
```bash
pnpm lint:fix
```

在提交 Pull Request 之前，请验证分支能否正常编译：

```bash
pnpm prep
```
*（该命令会依次执行 `pnpm reset`、安装依赖、代码检查、E2E 测试和安全审计。）*

### 提交信息规范

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。请在提交信息前加上以下前缀：
- `feat:`（新功能）
- `fix:`（Bug 修复）
- `docs:`（文档变更）
- `refactor:`（代码重构，不涉及 Bug 修复或新功能）

### 源文件头部注释

`packages/` 目录下所有新文件**必须**包含标准版权头部注释，以保持一致性和合规性。

```javascript
/**
 * --------------------------------------------------------------------
 * docmd : the zero-config documentation engine.
 *
 * @package     @docmd/core (and ecosystem)
 * @website     https://docmd.io
 * @repository  https://github.com/docmd-io/docmd
 * @license     MIT
 * @copyright   Copyright (c) 2025-present docmd.io
 *
 * [docmd-source] - Please do not remove this header.
 * --------------------------------------------------------------------
 */
```

## GitHub 工作流

1. **Fork 并创建分支**：从最新的 `main` 分支创建功能分支。
2. **验证**：确保 `pnpm verify` 返回 `🛡️ docmd is ready for production!`。
3. **提交 Pull Request**：清晰描述所解决的问题或新增的功能。