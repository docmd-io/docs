---
title: "保持一致性"
description: "如何借助 Lint 工具与统一规范，确保大型文档团队的统一调性与专业质量。"
---

## 问题

在大团队中，每位技术作者都有自己的风格。有人用粗体表示强调，有人用斜体；有人偏好"点击按钮"，有人偏好"选择选项"。久而久之，文档会变成一床风格互相冲突的"百家布"。这会增加用户的理解难度，也削弱文档的专业可信度。

## 为什么重要

一致性带来熟悉感。当用户学习复杂的 API 或工作流时，会依赖统一的词汇和结构模式来高效地导航。统一的调性能让文档感觉像一款完整且高质量的产品，从而强化用户对软件本身的信心。

## 方法

通过 [标准化容器](../../content/containers/index.md) 与自动化 Lint 工具，以机械化方式强制一致性。把低层级的风格与语法检查自动化，可以让人工编辑腾出精力，专注在内容的高层质量、准确性与清晰度上。

## 实现

### 1. 使用 docmd 的标准化模式

鼓励所有贡献者使用 docmd 内置的主题容器，而非手写的 Markdown 排版。这能确保全站范围内的每条警告、提示或注释在外观与行为上都完全一致。

```markdown
<!-- ❌ 应避免：风格不统一且无样式 -->
**提示：** 请重启服务。

<!-- ✅ 应采用：统一、可访问、带主题样式 -->
::: callout info
请重启服务。
:::
```

使用 [标注 (Callout)](../../content/containers/callouts.md) 可以让您的文档在零额外投入的情况下保持专业外观，并满足无障碍标准。

### 2. 引入正文 Lint

集成 **Vale** 或 **Markdownlint** 等工具来强制品牌术语、行文口吻与语法规范。这些工具会自动检查被动语态、偏见性语言或产品名拼写错误。

```ini ".vale.ini"
# .vale.ini example
MinAlertLevel = suggestion
Packages = Google, Microsoft
[*]
BasedOnStyles = Vale, Google
```

### 3. 在 CI/CD 中强制执行

将一致性检查纳入 [GitHub Actions](../../guides/integrations/github-actions-cicd.md) 或其他 CI/CD 流水线。这样每个 Pull Request 在合并前都会经过风格与结构一致性的审计。

```bash
# CI 中进行 Lint 的示例步骤
- name: Lint Documentation
  run: vale docs/
```

## 取舍

严格的 Lint 可能让社区贡献者望而却步 —— 仅仅修一个错别字就要面对一堆"风格错误"。我们建议对外部贡献把 Lint 敏感度设为 `warning`，仅对内部团队的更新使用 `error` 级别。如此可在"一致性"与"包容性"之间取得平衡。