---
title: "重定向与 404"
description: "为静态部署配置基于元数据的重定向以及自定义品牌的 404 错误页面。"
---

静态托管环境缺少类似 Nginx 规则那样的服务端逻辑来进行动态路由。docmd 会生成原生的 HTML 兜底机制，自动处理重定向与错误状态。

## 无服务端重定向

通过在 `redirects` 对象中定义映射，将流量从旧 URL 转发到新目的地。

```json "docmd.config.json"
{
  "redirects": {
    "/setup": "/getting-started/installation", 
    "/v1/api": "/api-reference"                  
  }
}
```

### 技术实现

当您定义一条重定向时，引擎会在旧路径创建一个 `index.html` 文件，其中包含一个 `<meta http-equiv="refresh">` 标签。此策略确保：

1.  **无缝重定向**：用户瞬间被转发到新目的地。
2.  **SEO 保持**：搜索引擎识别该重定向以保持链接权重。
3.  **分析追踪**：页面浏览量在重定向发生前被记录。

## 品牌化 404 页面

当用户请求缺失的 URL 时，静态托管会自动加载根目录下的 `404.html` 文件。docmd 默认会生成该文件。它完美继承您站点的主题、侧边栏和 SPA 功能。

### 自定义错误内容

在配置中个性化 404 错误消息：

```json "docmd.config.json"
{
  "notFound": {
    "title": "404: Page Not Found",
    "content": "We couldn't find the page you're looking for. Use the sidebar to find your way back."
  }
}
```

::: callout tip "本地开发" icon:lightbulb
开发服务器会自动为缺失的文件提供您的自定义 404 页面。可在本地测试错误体验。
:::