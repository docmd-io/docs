---
title: "基于 Git 的工作流"
description: "如何使用 Git、拉取请求 (Pull Request) 和自动化的 CI/CD 检查来有效地管理文档贡献。"
---

## 问题

允许直接向主文档分支推送更改通常会导致链接失效、格式不一致以及未经核实的各种技术信息。然而，如果增加过多的摩擦——例如要求单独的 CMS 帐户——会阻碍社区成员和内部开发人员贡献有价值的更新。

## 为什么重要

协作是优秀文档的生命线。如果开发人员发现了一个拼写错误或过时的示例，他们应该能够在几分钟内提交修复。基于 Git 的工作流提供了一个熟悉、透明且安全的环境来进行贡献，确保每一项更改在发布前都经过审查和验证。

## 方法

实施一种由自动化验证和预览环境支持的“拉取请求 (Pull Request, PR)”模式。`docmd` 专为这种工作流设计，因为它运行在标准的 Markdown 文件上，这些文件易于使用熟悉的 Git 工具进行差异对比、审查和合并。

## 实施

### 1. 启用“编辑此页”链接

您可以配置 `docmd` 在页脚或侧边栏中自动生成“编辑此页”链接。这允许用户直接从文档页面跳转到存储库中对应的源文件。

```javascript
// docmd.config.js
export default {
  editLink: {
    enabled: true,
    baseUrl: 'https://github.com/my-org/my-docs/edit/main/docs',
    text: '建议修改'
  }
};
```
有关更多详细信息，请参阅 [编辑链接配置](../../configuration/general#editlink)。

### 2. 利用 Threads 插件进行上下文审查

对于需要详细反馈的复杂更新，请使用 [Threads 插件](../../plugins/usage)。这允许作者和审查人员在审查阶段直接在 Markdown 内容中留下行内评论，保持讨论的上下文一致性。

```markdown
::: thread "审查人姓名"
我们是否应该在这里添加一个关于新身份验证流程的代码示例？
:::
```

### 3. CI 中的自动化验证

将 `docmd` 集成到您的 CI/CD 流水线（例如 [GitHub Actions](../../guides/integrations/github-actions-cicd)）中以验证每个 PR。至少，您的流水线应运行构建命令，以确保没有引入语法错误或损坏的配置。

```bash
# 在您的 CI 流水线中
npm install
npx @docmd/core build
```

## 权衡

严格的 Git 工作流偶尔会减慢微小更新的速度，例如修复关键的拼写错误或更新服务状态通知。对于高产出的团队，我们建议指定“文档负责人”，他们有权快速处理小的更改，同时对重大技术更新保持严格的审查标准。
