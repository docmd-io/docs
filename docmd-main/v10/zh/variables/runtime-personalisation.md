---
title: 客户端运行时与个性化
description: 使用轻量级 docmd-runtime.js SDK 与 window.docmd 实现无刷新用户会话、响应式交互代码块与动态个性化。
---

# 客户端运行时与个性化

docmd 包含一个轻量级的通用客户端无头运行时脚本 `docmd-runtime.js`，该脚本已被自动整合至全部页面布局模板中（包括默认模板以及 `summer` 等扩展主题）。

运行时会在浏览器全局暴露 `window.docmd` 对象，使您能够在不刷新页面的情况下，根据登录状态、用户选择的地区或表单输入实时更新整站变量。

## 声明动态变量

在 `docmd.config.json` 中配置动态变量列表：

```json
{
  "variables": {
    "dynamic": [
      "user.name",
      "user.apiKey",
      "selectedProject",
      "activeRegion"
    ]
  }
}
```

在执行构建时，所有声明为 dynamic（或以 `user.` 开头）的变量，均会被标记为响应式元素：

```html
<span data-docmd-var="user.apiKey" class="docmd-var">pk_test_sample</span>
```

## 浏览器端 JavaScript API: `window.docmd`

客户端运行时提供了直观友好的 API：

::: grids
    ::: grid
        ::: card "设置变量" icon:sliders
        `window.docmd.var.set(key, val)`
        实时更新 DOM 节点、文本内容与代码块中的变量值。
        :::
    :::
    ::: grid
        ::: card "读取变量" icon:search
        `window.docmd.var.get(key)`
        获取指定运行时变量的当前活跃值。
        :::
    :::
::: /grids

::: grids
    ::: grid
        ::: card "列出所有变量" icon:list
        `window.docmd.var.list()`
        返回一个包含全部已注册动态变量及其当前值的对象。
        :::
    :::
    ::: grid
        ::: card "同步 DOM 节点" icon:refresh-cw
        `window.docmd.var.sync()`
        重新扫描新注入的 HTML 片段并完成变量水合。
        :::
    :::
::: /grids

### 代码示例：动态更新变量

```javascript
// 设置单个变量
window.docmd.var.set('user.apiKey', 'sk_live_99882244');

// 同时更新多个变量
window.docmd.var.set({
  'user.name': 'Sarah Connor',
  'activeRegion': 'cn-north-1'
});
```

页面中所有对应的 `<span data-docmd-var="...">` 节点与代码块高亮标记即刻完成更新。

## 交互式代码块实例

运行时个性化最直观的应用之一，是让开发者直接在文档中调试包含个人密钥的 API 指令：

````markdown
### 调用认证接口

在终端中执行以下命令：

```bash
curl -X GET https://api.acme.com/v1/profile \
  -H "Authorization: Bearer \{{ user.apiKey || 'YOUR_API_KEY' }}"
```
````

### 交互式变量在线实时演示

使用下方 Playground 沙箱直接在浏览器运行时中变更 `user.apiKey`。点击“运行”或调整代码，`docmd-runtime` 将实时同步更新页面中引用的变量：

::: playground title="变量交互测试沙箱" icon:braces live
```js
// 在浏览器运行时中动态更新响应式变量 user.apiKey
const demoKey = "sk_live_" + Math.random().toString(36).substring(2, 10);
docmd.var.set("user.apiKey", demoKey);

console.log("已更新 user.apiKey 为:", docmd.var.get("user.apiKey"));
return `当前生效密钥: ${demoKey}`;
```
:::

下方的代码块将根据变量变化实时重渲染：

```bash
curl -X GET https://api.acme.com/v1/profile \
  -H "Authorization: Bearer {{ user.apiKey || 'YOUR_API_KEY' }}"
```

::: callout tip "DOM XSS 免疫特性" icon:shield-check
`docmd-runtime.js` 引擎严格通过 DOM `.textContent` 更新响应式元素。变量值绝不会被当作 HTML 或可执行脚本解析，即使变量值来源于动态用户输入，也能杜绝基于 DOM 的代码注入攻击。
:::

## 现代前端框架集成

::: tabs
::: tab "原生 JavaScript" icon:code
```javascript
function onUserLogin(session) {
  window.docmd.var.set({
    'user.name': session.fullName,
    'user.apiKey': session.activeToken,
    'user.orgId': session.organisationId
  });
}
```
::: /tab

::: tab "React / Next.js" icon:atom
```tsx
import { useEffect } from 'react';

export function DocsPersonaliser({ user }: { user: any }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).docmd) {
      (window as any).docmd.var.set({
        'user.name': user.name,
        'user.apiKey': user.apiKey
      });
    }
  }, [user]);

  return null;
}
```
::: /tab

::: tab "Vue / Nuxt" icon:feather
```vue
<script setup>
import { watchEffect } from 'vue';

const props = defineProps(['currentUser']);

watchEffect(() => {
  if (typeof window !== 'undefined' && window.docmd) {
    window.docmd.var.set({
      'user.name': props.currentUser?.name,
      'user.apiKey': props.currentUser?.token
    });
  }
});
</script>
```
::: /tab
::: /tabs

## 监听变量变化事件

可通过系统事件总线监听变量修改：

```javascript
window.addEventListener('docmd:variable-change', (event) => {
  const { key, value } = event.detail;
  console.log(`变量 ${key} 已变更为：`, value);
});
```

## 跨窗口同步 (iFrame 与宿主门户)

若文档以 iFrame 形式嵌入在业务系统中，父级页面可通过 `postMessage` 向文档传递变量：

```javascript
const docIframe = document.getElementById('docs-frame');
docIframe.contentWindow.postMessage({
  type: 'docmd:set-variables',
  variables: {
    'user.name': 'Alex',
    'user.apiKey': 'sk_live_449911'
  }
}, '*');
```

::: callout tip "轻量级无头解耦设计" icon:cpu
`docmd-runtime.js` 仅依赖数据属性选择器（`data-docmd-var`），不依赖任何特定的 CSS 类或特定 DOM 层次结构，因此在复杂的 SPA 单页路由和多样化的深浅色主题下均能稳定运行。
:::
