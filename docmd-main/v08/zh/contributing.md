---
title: "参与贡献"
description: "参与 docmd 项目贡献的指南和环境设置说明。"
---

感谢您对 `docmd` 项目的关注。我们非常欢迎各种形式的贡献，包括修复错误、改进文档、开发新功能以及提出设计建议。

## 开发环境

`docmd` 是一个使用 [pnpm](https://pnpm.io/) 管理的 Monorepo 项目。

### 前提条件

- **Node.js**: v22.x 或更高版本 (推荐 LTS)
- **pnpm**: v10.x 或更高版本

### 项目设置

克隆仓库并运行初始设置以安装依赖并构建项目：

```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd
pnpm install
pnpm build
```

要在全局范围内链接本地 `docmd` 命令以便在其他项目中进行测试：

```bash
pnpm verify --link
```

### 本地开发

我们提供了一个主代理命令，可以直接针对内部的 `_playground` 目录运行任何 `docmd` 命令。这使得开发体验与用户 CLI 完全一致：

```bash
pnpm docmd dev    # 启动 Playground 开发服务器 (也可直接运行 pnpm dev)
pnpm docmd build  # 构建 Playground 文档
```

如需开启热重载监控内部源码文件（引擎、模板和插件），请设置 `DOCMD_DEV` 环境变量：

```bash
DOCMD_DEV=true pnpm dev
```

## 质量标准

### 代码检查 (Linting)
确保您的代码符合我们的 ESLint 配置。要自动修复格式问题，请运行：
```bash
pnpm lint --fix
```

### 验证
在提交 Pull Request 之前，您 **必须** 确保整个 Monorepo 通过我们的强化验证流水线。该流水线会模拟一个全新的发布环境，审核安全漏洞，并验证 Monorepo 的完整性：

```bash
pnpm prep
```
*(该命令会链式执行 `pnpm reset`、依赖安装、代码检查、7 项端到端测试，以及最终的发布预演。)*

## GitHub 工作流

1.  **Fork 和 分支**: 从最新的 `main` 分支创建一个特性分支。
2.  **验证**: 确保 `pnpm prep` 返回 `🛡️ docmd is ready for production!`。
3.  **提交 PR**: 提交预览时请清晰地描述所解决的问题或新增的功能。

### 提交规范 (Commit Guidelines)

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。请为您的提交消息添加以下前缀：
- `feat:` (新增功能)
- `fix:` (错误修复)
- `docs:` (文档更改)
- `refactor:` (内部重构)

### 源码头部 (Source Headers)

所有在 `packages/` 目录下的新文件必须包含标准的项目版权声明头部：

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