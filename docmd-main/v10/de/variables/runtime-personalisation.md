---
title: Client-Laufzeit & Personalisierung
description: Nutzen Sie das docmd-runtime.js SDK und window.docmd für reaktive Benutzersitzungen, interaktive Codebeispiele und Personalisierung ohne Neuladen.
---

# Client-Laufzeit & Personalisierung

docmd enthält ein schlankes, headless Client-Laufzeitskript namens `docmd-runtime.js`, das automatisch in jedes Layout-Template eingebunden wird (inklusive des Standard-Templates und externer Themes wie `summer`).

Die Laufzeit stellt die Browser-API `window.docmd` bereit, mit der Variablen basierend auf Benutzeranmeldung, gewählten Umgebungen oder Formulareingaben in Echtzeit aktualisiert werden können — ganz ohne Neuladen der Seite.

## Variablen als dynamisch deklarieren

Legen Sie in Ihrer `docmd.config.json` fest, welche Variablenschlüssel dynamisch sind:

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

Beim Kompilieren umschließt docmd jede dynamische Variable (oder mit `user.` beginnende Variable) mit einem reaktiven Markierungs-Element:

```html
<span data-docmd-var="user.apiKey" class="docmd-var">pk_test_sample</span>
```

## Browser JavaScript-API: `window.docmd`

Die Client-Laufzeit bietet ein ergonomisches API:

::: grids
    ::: grid
        ::: card "Variablen setzen" icon:sliders
        `window.docmd.var.set(key, val)`
        Aktualisiert Variablenwerte im gesamten DOM und in allen Codeblöcken in Echtzeit.
        :::
    :::
    ::: grid
        ::: card "Variable abfragen" icon:search
        `window.docmd.var.get(key)`
        Gibt den aktiven Wert einer registrierten Laufzeitvariable zurück.
        :::
    :::
::: /grids

::: grids
    ::: grid
        ::: card "Alle auflisten" icon:list
        `window.docmd.var.list()`
        Liefert ein Objekt mit allen aktuell registrierten dynamischen Variablen.
        :::
    :::
    ::: grid
        ::: card "DOM synchronisieren" icon:refresh-cw
        `window.docmd.var.sync()`
        Scannt neu eingefügte HTML-Fragmente und rehydriert Variablenmarker.
        :::
    :::
::: /grids

### Code-Beispiel: Variablen aktualisieren

```javascript
// Einzelne Variable setzen
window.docmd.var.set('user.apiKey', 'sk_live_99882244');

// Mehrere Variablen gleichzeitig setzen
window.docmd.var.set({
  'user.name': 'Sarah Connor',
  'activeRegion': 'eu-central-1'
});
```

Alle `<span data-docmd-var="...">`-Elemente und Codeblock-Token im Dokument aktualisieren sich augenblicklich.

## Interaktives Codeblock-Beispiel

Ein überzeugender Anwendungsfall ist das Testen von API-Endpunkten mit benutzerdefinierten Schlüsseln:

````markdown
### API-Authentifizierung

Führen Sie folgenden Befehl im Terminal aus:

```bash
curl -X GET https://api.acme.com/v1/profile \
  -H "Authorization: Bearer \{{ user.apiKey || 'IHR_API_SCHLUESSEL' }}"
```
````

### Interaktive Variablen-Live-Demonstration

Nutzen Sie den folgenden Playground, um `user.apiKey` direkt in der Browser-Laufzeitumgebung anzupassen. Beim Ausführen oder Ändern des Codes aktualisiert `docmd-runtime` alle Variablen im Dokument in Echtzeit:

::: playground title="Interaktiver Variablen-Tester" icon:braces live
```js
// Reaktive Variable user.apiKey in der Browser-Laufzeitumgebung anpassen
const demoKey = "sk_live_" + Math.random().toString(36).substring(2, 10);
docmd.var.set("user.apiKey", demoKey);

console.log("Aktualisierter user.apiKey:", docmd.var.get("user.apiKey"));
return `Aktiver API-Schlüssel: ${demoKey}`;
```
:::

Der folgende Codeblock rendert dynamisch und reagiert sofort auf Variablenänderungen:

```bash
curl -X GET https://api.acme.com/v1/profile \
  -H "Authorization: Bearer {{ user.apiKey || 'IHR_API_SCHLUESSEL' }}"
```

::: callout tip "DOM-XSS-Immunität" icon:shield-check
Die `docmd-runtime.js`-Engine aktualisiert reaktive DOM-Elemente ausschließlich über `.textContent`. Variablenwerte werden niemals als HTML oder ausführbares Skript geparst, was DOM-basierte Injektionsangriffe selbst bei Werten aus dynamischen Benutzereingaben wirksam verhindert.
:::

## Framework-Integration

::: tabs
::: tab "Vanilla JavaScript" icon:code
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

## Auf Variablenänderungen reagieren

Über den Event-Bus können Sie Änderungen abfangen:

```javascript
window.addEventListener('docmd:variable-change', (event) => {
  const { key, value } = event.detail;
  console.log(`Variable ${key} geändert zu:`, value);
});
```

## Cross-Frame-Synchronisation (iFrames & Portale)

Wird die Dokumentation in einem iFrame eingebunden, kann das übergeordnete Portal Variablen via `postMessage` übertragen:

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

::: callout tip "Headless Engine-Architektur" icon:cpu
`docmd-runtime.js` arbeitet völlig unabhängig von UI-Logik ausschließlich über Daten-Marker (`data-docmd-var`) und harmoniert perfekt mit SPA-Routern und Custom-Themes.
:::
