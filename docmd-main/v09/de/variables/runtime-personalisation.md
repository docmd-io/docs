---
title: Client-Laufzeit & Personalisierung
description: Nutzen Sie das clientseitige docmd-runtime.js SDK und window.docmd für Live-Benutzersitzungen, interaktive Code-Blöcke und dynamische Personalisierung ohne Neuladen.
---

# Client-Laufzeit & Personalisierung

docmd enthält ein headless Client-Laufzeitskript, `docmd-runtime.js`, das automatisch in jedes Vorlagen-Layout (einschließlich des Standard-Layouts und Themes wie `summer`) eingebunden wird.

Die Laufzeit stellt die Browser-API `window.docmd` bereit, mit der Sie Variablen basierend auf Benutzerauthentifizierung, gewählten Umgebungen oder Formulareingaben in Echtzeit aktualisieren können, ohne die Seite neu laden zu müssen.

## Variablen als dynamisch markieren

Deklarieren Sie in Ihrer `docmd.config.json`, welche Variablenschlüssel dynamisch sind:

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

Wenn docmd Ihre Seiten erstellt, wird jede als dynamisch markierte Variable (oder mit dem Präfix `user.`) in einen reaktiven Marker gehüllt:

```html
<span data-docmd-var="user.apiKey" class="docmd-var">pk_test_sample</span>
```

## Browser-JavaScript-API: `window.docmd`

Die Client-Laufzeit bietet eine ergonomische API:

### Variablen setzen: `docmd.var.set()`

Aktualisieren Sie eine Variable in Echtzeit auf der aktuellen Seite und in allen Code-Snippets:

```javascript
// Einzelne Variable setzen
window.docmd.var.set('user.apiKey', 'sk_live_99882244');

// Mehrere Variablen gleichzeitig setzen
window.docmd.var.set({
  'user.name': 'Sarah Connor',
  'activeRegion': 'eu-central-1'
});
```

Alle `<span data-docmd-var="...">`-Elemente und Code-Block-Tokens im DOM werden sofort aktualisiert.

### Variablen abrufen: `docmd.var.get()`

Den aktuellen Wert einer Variable abfragen:

```javascript
const key = window.docmd.var.get('user.apiKey');
console.log('Aktiver API-Schlüssel:', key);
```

### Variablen auflisten: `docmd.var.list()`

Alle registrierten Laufzeitvariablen einsehen:

```javascript
const allVars = window.docmd.var.list();
console.table(allVars);
```

### DOM synchronisieren: `docmd.var.sync()`

Wenn Sie HTML dynamisch nachladen oder clientseitiges Routing verwenden, rufen Sie `docmd.sync()` auf, um die Variablenmarker zu rehydrieren:

```javascript
window.docmd.var.sync();
```

## Beispiel für interaktive Code-Snippets

Ein Anwendungsfall für Personalisierung ist das direkte Testen von Endpunkten mit eigenen API-Schlüsseln:

```markdown
### Authentifizierung mit der API

Führen Sie folgenden Befehl in Ihrem Terminal aus:

```bash
curl -X GET https://api.acme.com/v1/profile \
  -H "Authorization: Bearer {{ user.apiKey || 'YOUR_API_KEY' }}"
```
```

Sie können ein Eingabefeld in Ihr Dokumentationsportal einbetten:

```html
<input 
  type="text" 
  id="apiKeyInput" 
  placeholder="API-Schlüssel hier einfügen..."
  oninput="window.docmd.var.set('user.apiKey', this.value || 'YOUR_API_KEY')"
/>
```

Sobald der Leser seinen Schlüssel eingibt, aktualisiert sich das curl-Snippet in Echtzeit!

## Auf Variablenänderungen reagieren

Sie können auf Events des Laufzeit-Eventbusses hören:

```javascript
window.addEventListener('docmd:variable-change', (event) => {
  const { key, value } = event.detail;
  console.log(`Variable ${key} geändert zu:`, value);
});
```

## Cross-Frame-Synchronisierung (iFrames & Portale)

Wenn Ihre Dokumentation in einem Portal-iFrame eingebettet ist, kann das übergeordnete Fenster Dokumentationsvariablen via `postMessage` aktualisieren:

```javascript
// Aus dem Elternfenster:
const docIframe = document.getElementById('docs-frame');
docIframe.contentWindow.postMessage({
  type: 'docmd:set-variables',
  variables: {
    'user.name': 'Alex',
    'user.apiKey': 'sk_live_449911'
  }
}, '*');
```

Der Listener in `docmd-runtime.js` verarbeitet die Nachricht und aktualisiert alle Seitenvariablen automatisch.

## Architektur: Warum `docmd-runtime.js` universell ist

`docmd-runtime.js` ist bewusst von Stylings, Themes und UI-Animationen entkoppelt. Es enthält ausschließlich den Zustandsautomaten, die Variablen-Registry, den Eventbus und die Hydrierungslogik.

Da es headless arbeitet, kann es sicher in jedes Template-Layout eingebunden werden, ohne bestehende Skripte zu beeinträchtigen.
