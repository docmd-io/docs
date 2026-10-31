---
title: Konfigurations- & Benutzerdefinierte Variablen
description: So definieren Sie benutzerdefinierte Variablen in docmd.config.json, binden externe Dateien ein und verwenden Variablen in Konfigurationsstrings und Dokumenten.
---

# Konfigurations- & Benutzerdefinierte Variablen

Sie können benutzerdefinierte Variablen direkt in der `docmd.config.json` definieren, sie aus externen JSON-Dateien oder JavaScript-Modulen laden und überall in Ihrer Dokumentation verwenden.

## Variablen in `docmd.config.json` definieren

Fügen Sie Ihrer `docmd.config.json` einen `variables`-Block hinzu:

```json
{
  "title": "Acme Cloud Dokumentation",
  "variables": {
    "companyName": "Acme Technologies",
    "supportEmail": "support@acme.com",
    "cloud": {
      "apiEndpoint": "https://api.acme.cloud/v2",
      "region": "eu-central-1",
      "maxInstances": 50
    }
  }
}
```

### Zugriff in Markdown

Auf verschachtelte Objekte kann mit der Standard-Punktnotation zugegriffen werden:

```markdown
Wenden Sie sich an unser Team unter [{{ supportEmail }}](mailto:{{ supportEmail }}).

Alle Anfragen sollten an unseren Produktionsendpunkt gerichtet werden:
```bash
curl -X GET {{ cloud.apiEndpoint }}/status \
  -H "X-Region: {{ cloud.region }}"
```
```

Während des Builds wird dies wie folgt ausgegeben:

```bash
curl -X GET https://api.acme.cloud/v2/status \
  -H "X-Region: eu-central-1"
```

## Variablen in Konfigurationsfeldern verwenden

docmd führt **vor** dem Rendern von Layouts, Fußzeilen und Bannern einen Registrierungsdurchlauf für Variablen durch.

Dadurch können Sie integrierte Variablen (wie `{{ docmd.buildYear }}`) sowie Ihre eigenen benutzerdefinierten Variablen direkt in Konfigurationsfeldern referenzieren:

```json
{
  "title": "Acme Docs",
  "variables": {
    "companyName": "Acme Cloud Systems"
  },
  "footer": {
    "copyright": "Copyright © {{ docmd.buildYear }} {{ companyName }}. Alle Rechte vorbehalten."
  },
  "layout": {
    "banners": {
      "top": {
        "content": "Läuft auf {{ title }} v{{ docmd.version }} in Region {{ env.DEPLOY_REGION || 'global' }}."
      }
    }
  }
}
```

### So funktioniert der Auflösungszyklus

1. **Registrierung**: Zu Beginn von `docmd build` registriert die `VariableRegistry` alle integrierten Variablen (`docmd.buildYear`, `docmd.version` usw.), Umgebungsvariablen und in der Konfiguration deklarierte `variables`.
2. **Konfigurations-Interpolation**: docmd durchläuft rekursiv die `docmd.config.json` (wie `footer.copyright`, `layout.banners`, `title`) und ersetzt alle `{{ variable }}`-Tokens.
3. **Markdown-Rendering**: Markdown-Prozessoren nutzen dieselben registrierten Variablen, um Seiteninhalte zu rendern.
4. **Ergebnis**: Sowohl Ihre Fußzeile als auch Ihre Markdown-Seiten spiegeln exakt dieselben aufgelösten Werte wider – ohne manuelle Duplizierung.

## Externe Variablendateien

Für größere Projekte oder gemeinsame Teamdaten können Sie unter `"variables"` auf eine externe JSON- oder JavaScript-Datei verweisen:

### Externe JSON-Datei

```json
{
  "variables": "./data/variables.json"
}
```

Wobei `./data/variables.json` Folgendes enthält:

```json
{
  "auth": {
    "oauthUrl": "https://auth.acme.com/oauth2/token"
  }
}
```

### Dynamische JavaScript-Datei

Sie können auch ein JavaScript-Modul verwenden, um Variablen dynamisch zu berechnen:

```json
{
  "variables": "./data/variables.js"
}
```

Wobei `./data/variables.js` ein Objekt oder eine Funktion exportiert:

```javascript
module.exports = {
  dynamicTimestamp: new Date().toLocaleDateString(),
  sdkVersion: require('./package.json').version
};
```
