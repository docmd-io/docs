---
title: "如何选择部署方式"
description: "一份实用指南，帮助您在 docmd GitHub App、GitHub Action、入门模板 (Starter Template) 与 Deployer 包之间作出选择 —— 含决策矩阵与真实场景。"
---

# 如何选择部署方式

docmd 提供四种让文档上线的方式。它们产出相同的结果 —— 一个部署到 GitHub Pages 或您所选托管服务的静态站点 —— 区别只在于您希望拥有多少控制权，以及您当前的起点。

## 快速决策矩阵

| | [GitHub App](../../integrations/github-app.md) | [入门模板 (Starter Template)](../../integrations/starter-template.md) | [GitHub Action](../../integrations/github-action.md) | [Deployer 包](../../deployment/deployer-package.md) |
|---|---|---|---|---|
| **起点** | 已有仓库 | 新仓库 | 任意 | 任意 |
| **搭建成本** | 一次点击 | 两次点击 | 编写 YAML | 执行命令 |
| **工作流文件** | 自动生成 | 已包含 | 由您编写 | 自动生成 |
| **可定制性** | 生成后可改 | 从一开始就可改 | 完全可定制 | 完全可定制 |
| **托管目标** | GitHub Pages | GitHub Pages | GitHub Pages | 任意平台 |
| **Monorepo 支持** | ✓ 自动检测 | — | 手动 `--cwd` | ✓ |
| **非 GitHub 托管** | ✗ | ✗ | 可改造 | ✓ Docker、Nginx、Vercel、Netlify… |

## 场景指南

### "我想不到两分钟就让文档上线，零配置"

使用 **[GitHub App](../../integrations/github-app.md)**。安装它、选择您的仓库，即可完成。它会自动识别配置、生成工作流、启用 GitHub Pages 并部署 —— 您无需改动任何文件。

::: button "安装 GitHub App" external:https://github.com/apps/docmd/installations/new icon:github color:#2ea44f

---

### "我要从零搭建一个全新的文档站点"

使用 **[入门模板 (Starter Template)](../../integrations/starter-template.md)**。在 GitHub 上点击 "Use this template"，更新 `docmd.config.json` 填入标题与 URL，启用一次 GitHub Pages，然后推送。所有环节都已预先连接好。

::: button "使用入门模板" external:https://github.com/docmd-io/docmd-template/generate icon:github

---

### "我已经有 CI/CD 流水线，希望把文档加入进去"

使用 **[GitHub Action](../../integrations/github-action.md)**。在现有工作流中加入 `docmd-io/deploy@v1`。它能与其它步骤干净组合 —— 运行测试、构建应用、再构建文档，全部放在同一个 Job 里。

---

### "我要部署到 Vercel、Netlify、Docker 或自己的服务器"

使用 **[Deployer 包](../../deployment/deployer-package.md)**。运行 `npx @docmd/core deploy --vercel`（或 `--netlify`、`--docker`、`--nginx`），即可生成与您 `docmd.config.json` 匹配的平台专属配置文件。

---

### "我在 Monorepo 中，文档位于子目录"

**GitHub App** 与 **Deployer 包** 都能自动处理这种情况：前者能在仓库目录树任意位置识别配置，并自动注入正确的 `--cwd` 参数；后者会从当前工作目录读取配置。

如果您倾向使用 GitHub Action，请手动传入 `--cwd`：

```yaml
- run: npx @docmd/core build --cwd packages/docs
```

---

### "我想在每个 Pull Request 上预览文档"

将 **GitHub Action** 与 PR 预览服务结合使用（例如 Cloudflare Pages 的 Preview 部署，或自托管的预览环境）。完整的操作步骤请参阅 [预览变更](../workflows-teams/previewing-changes.md)。

---

## 它们如何配合

这些方式并非互斥。常见的演进路径如下：

```
从 GitHub App 起步（最快的上线路径）
  ↓
随需求增长，定制自动生成的工作流文件
  ↓
加入 Deployer 包，生成用于自托管的 Nginx/Docker 配置
  ↓
把 Action 接入更宏观的 CI/CD 流水线
```

您也可以混搭使用：先用入门模板开启新项目，稍后再用 Deployer 包为 Staging 环境生成 Docker 镜像。

## 构建触发方式对比

| 方式 | 推送触发 | 手动触发 | PR 预览 |
|---|---|---|---|
| GitHub App | ✓（自动配置） | ✓ `workflow_dispatch` | 需额外步骤 |
| 入门模板 (Starter Template) | ✓ `main` / `master` | ✓ `workflow_dispatch` | 需额外步骤 |
| GitHub Action | 由您配置 | 由您配置 | 由您配置 |
| Deployer 包 | 仅生成文件；触发由您的工作流决定 | — | — |

## 延伸阅读

- [GitHub Action 参考](../../integrations/github-action.md)
- [GitHub App 参考](../../integrations/github-app.md)
- [入门模板 (Starter Template) 参考](../../integrations/starter-template.md)
- [Deployer 包参考](../../deployment/deployer-package.md)
- [GitHub Actions CI/CD 指南](./github-actions-cicd.md)
- [预览变更](../workflows-teams/previewing-changes.md)
