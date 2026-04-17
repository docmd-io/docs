---
title: "重定向与 404"
description: "为静态部署配置基于元数据的重定向和自定义品牌化 404 错误页面。"
---

在静态托管环境中，没有服务端逻辑（如 Nginx 规则或 `.htaccess` 文件）来处理动态路由。`docmd` 通过自动生成原生 HTML 回退机制来解决重定向和错误状态问题。

## 无服务器重定向

在 `redirects` 对象中定义映射规则，即可将旧 URL 的流量转发到新目标地址。

```javascript
export default defineConfig({
  redirects: {
    '/setup': '/getting-started/installation', // 短 URL 跳转到深层链接
    '/v1/api': '/api-reference'                  // 旧版本路径映射到新路径
  }
});
```

### 技术实现

定义重定向后，`docmd` 会在旧路径下创建一个包含 `<meta http-equiv="refresh">` 标签的 `index.html` 文件。这种方式可确保：

1. **无缝跳转**：页面加载后立即将用户转发到新目标地址。
2. **SEO 保护**：搜索引擎识别跳转关系，有助于保留链接权重。
3. **统计追踪**：在跳转发生前完成页面浏览统计，保留流量数据。

## 品牌化 404 页面

当用户访问不存在的 URL 时，大多数静态托管服务（Netlify、Vercel、GitHub Pages）都会自动查找根目录下的 `404.html` 文件。`docmd` 默认生成该文件，并继承网站的主题、侧边栏和 SPA 功能。

### 自定义错误页面内容

可在配置中自定义 404 错误信息：

```javascript
export default defineConfig({
  notFound: {
    title: '404：页面不存在',
    content: '找不到您请求的页面，请使用侧边栏导航返回。'
  }
});
```

::: callout tip "本地开发调试"
`docmd dev` 服务器会在找不到请求文件时自动提供自定义 404 页面，方便你在本地测试错误页面的效果。
:::