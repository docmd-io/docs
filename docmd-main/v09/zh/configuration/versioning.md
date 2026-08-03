---
title: "版本管理"
description: "启用多版本文档，支持无缝切换、粘性路径保留与隔离的构建目录。"
---

docmd 具备原生的版本管理引擎。可同时管理和提供项目的多个版本。引擎自动处理 URL 路由、侧边栏更新和切换逻辑。

## 目录组织

将文档组织到带版本号的源文件夹中。一种常见的模式是将当前版本放在 `docs/` 中，归档版本放在以 `docs-` 为前缀的目录中。

```text
my-project/
├── docs/           # 最新版本（主）
├── docs-v1/        # 旧版本
├── docmd.config.json
```

## 配置

<img width="500" class="with-border" src="/assets/previews/menu-versioning.webp">

在 `versions` 对象中定义您的版本：

```json "docmd.config.json"
{
  "versions": {
    "current": "v2",           
    "position": "sidebar-top", 
    "all": [
      { "id": "v2", "dir": "docs",    "label": "v2.x (Latest)" },
      { "id": "v1", "dir": "docs-v1", "label": "v1.x" }
    ]
  }
}
```

## 核心功能

### 1. 根 SEO（"当前"版本）
`current` 版本会直接在您的输出根目录下生成（例如 `mysite.com/`）。这确保搜索流量始终落到您最新的文档上。

### 2. 隔离的子目录
非当前版本会自动构建到与其 `id` 匹配的子文件夹中。
*   `v2 (Current)` → `mysite.com/`
*   `v1` → `mysite.com/v1/`

### 3. 粘性切换（路径保留）

docmd 在用户切换版本时会保留相对路径。如果用户正在阅读 `mysite.com/getting-started` 并切换到 **v1**，会自动重定向到 `mysite.com/v1/getting-started`（如果该页面存在）。

### 4. 资源隔离
每个版本都会继承您的全局 `assets/` 目录。docmd 在构建期间会隔离它们，以防止样式泄漏或冲突。

### 5. 版本化导航

每个版本可以维护独立的导航结构。docmd 使用级联优先级系统来解析侧边栏。

详情请参阅 [导航配置](navigation.md) 中关于解析层级的说明。

## 最佳实践

1.  **语义化 ID**：使用简洁、对 URL 友好的 ID，例如 `v1`、`v2` 或 `beta`。
2.  **导航一致性**：在各版本之间保持一致的目录结构，以最大化"粘性切换"的效果。
3.  **统一配置**：不要为每个版本创建单独的配置文件。docmd 在单次处理中处理所有版本。