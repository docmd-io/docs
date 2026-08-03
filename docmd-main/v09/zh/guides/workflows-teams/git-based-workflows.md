---
title: "基于 Git 的工作流"
description: "如何借助 Git、Pull Request 以及自动化 CI/CD 检查，有效管理文档贡献。"
---

## 问题

允许直接向 main 分支推送会导致链接失效、信息未经核验。但若摩擦过大 —— 例如要求单独的 CMS 账号 —— 又会打击社区贡献者与内部开发者的参与热情。

## 为什么重要

协作是优秀文档的生命线。如果开发者发现了一个错别字，他应该能在几分钟内提交修复。基于 Git 的工作流为贡献提供熟悉、透明且安全的环节。它确保每一处变更在上线前都经过评审与校验。

## 方法

采用由自动化校验与预览环境支撑的"Pull Request (PR)"模型。docmd 正是围绕这一工作流设计的：它处理标准 Markdown 文件，使用熟悉的 Git 工具即可轻松 diff、评审与合并。

## 实现

### 1. 启用"编辑此页面"链接

您可以通过 [Git 插件](../../plugins/git.md) 让 docmd 生成"编辑此页面"链接。用户可以从文档页面直接跳转到仓库中对应的源文件。

```json "docmd.config.json"
{
  "plugins": {
    "git": {
      "repo": "https://github.com/my-org/my-repo",
      "branch": "main",
      "editLink": true
    }
  }
}
```

### 2. 使用 Threads 进行上下文式评审

对于需要详细反馈的复杂更新，可使用 [Threads 插件](../../plugins/threads.md)。作者与评审者可以在评审阶段，于 Markdown 正文里直接留下内联评论，让讨论始终贴近上下文。

```markdown
::: thread "评审人姓名"
这里是否应附一段新鉴权流程的代码示例？
:::
```

### 3. 在 CI 中自动化校验

将 docmd 集成到您的 CI/CD 流水线（例如 [GitHub Actions](../../guides/integrations/github-actions-cicd.md)），以便对每个 PR 进行校验。流水线至少应执行构建命令，确保不会引入语法错误或配置错误。

```bash
# 在 CI 流水线中
npm install
npx @docmd/core build
```

## 取舍

严格的 Git 工作流偶尔会拖慢小更新，例如改个错别字或更新服务状态公告。对于追求高节奏的团队，我们建议指定若干"文档负责人 (Documentation Owners)"，授权他们对小改动快速放行，同时对重大更新保持严谨的评审标准。