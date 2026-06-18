---
title: "Cookie 同意"
description: "默认 UI 自带的 Opt-in Cookie 同意对话框。选择会保存到 localStorage，支持多语言，并通过 docmd:cookie-consent CustomEvent 让插件和模板作出响应。"
---

# Cookie 同意

> **0.8.7 新增。** Cookie 同意对话框是默认 `@docmd/ui` 包内置的功能。无需安装插件。**Opt-in（按需启用）** —— 只有设置了 `config.cookie` 才会渲染。

一个轻量、无障碍的 GDPR 风格同意对话框。用户的选择会持久化到 `localStorage`，TTL 可配置。用户作出选择后，`window` 上会触发 `docmd:cookie-consent` `CustomEvent`，便于插件和模板作出响应（例如开启 analytics、加载第三方脚本）。

## 30 秒启用

```json "docmd.config.json"
{
  "cookie": {
    "enabled": true,
    "message": "We use cookies to ensure you get the best experience.",
    "policyUrl": "/privacy",
    "position": "bottom-right"
  }
}
```

构建后，对话框会在首次访问时出现。之后的访问会读取已保存的选择。

## 配置参考

| 字段 | 默认值 | 说明 |
|---|---|---|
| `enabled` | `true`（当 `cookie` 对象存在时） | 总开关。 |
| `message` | 翻译键 `cookieMessage` | 对话框正文。可通过 `t()` helper 使用内联 HTML。 |
| `acceptText` | 翻译键 `cookieAccept` | 接受按钮文本。 |
| `declineText` | 翻译键 `cookieDecline` | 拒绝按钮文本。 |
| `policyUrl` | `null` | 可选，链接到您的隐私政策。 |
| `position` | `"bottom"` | `"bottom"` \| `"bottom-left"` \| `"bottom-right"` \| `"center"` |
| `dismissible` | `true` | 显示关闭 (X) 按钮。 |
| `expiryDays` | `180` | 选择在 `localStorage` 中的保留时长。 |

### position 取值

| 取值 | 效果 |
|---|---|
| `bottom` | 水平居中贴底。 |
| `bottom-left` | 锚定左下角。 |
| `bottom-right` | 锚定右下角。 |
| `center` | 居中模态框。 |

## 本地化

所有面向用户的字符串都支持现有的 `t(key)` 翻译系统。可在 `translations/<locale>.json` 文件中覆盖：

```json "translations/fr.json"
{
  "cookieMessage": "Cette page utilise des cookies pour vous offrir la meilleure expérience.",
  "cookieAccept": "Accepter",
  "cookieDecline": "Refuser",
  "cookiePolicy": "Politique de confidentialité",
  "cookieConsent": "Consentement aux cookies"
}
```


## 响应选择

用户接受、拒绝或关闭后，`window` 上会派发名为 `docmd:cookie-consent` 的 `CustomEvent`：

```js
window.addEventListener('docmd:cookie-consent', (e) => {
  if (e.detail.value === 'accept') {
    // 加载 analytics、营销脚本等
  }
});
```

`detail.value` 是 `"accept"`、`"decline"` 或 `"dismissed"` 之一。如需同步读取选择（例如在任何其他脚本运行之前），可使用 `localStorage.getItem('docmd-cookie-consent')`，返回值与上面相同。

## 重新定义样式

对话框以 BEM 风格的类构建在 `.docmd-cookie-banner` 根节点上。可通过 `customCss`（始终以优先级 15 胜出）重新设置皮肤：

```css
.docmd-cookie-banner {
  --accent-color: #ff5a5f;
  border-radius: 16px;
}
.docmd-cookie-banner__btn--accept {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}
```


## 禁用

如需完全移除对话框，只需在 config 中删除 `cookie` 字段即可。无需禁用插件。

::: callout tip "GDPR 最佳实践"
如果您受 GDPR 约束，请将对话框**默认启用**并通过 `policyUrl` 链接到一份真实的隐私政策。默认 message 故意写得通用，便于您通过 `message` 或翻译系统提供自定义内容。
:::