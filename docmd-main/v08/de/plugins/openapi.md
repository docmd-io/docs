---
title: "OpenAPI-Plugin"
description: "Statische API-Referenzdokumentation, die direkt aus OpenAPI 3.x-Spezifikationen zur Build-Zeit gerendert wird."
---

Das `@docmd/plugin-openapi`-Plugin konvertiert OpenAPI 3.x-Spezifikationsdateien in strukturierte, durchsuchbare API-Referenzseiten. Es folgt der docmd-„Zero-JS"-Philosophie — rendert jeden Endpunkt, Parameter und jede Antwort in semantische HTML-Tabellen während des Build-Prozesses, was maximale Leistung und SEO gewährleistet.

## Konfiguration

Das OpenAPI-Plugin ist standardmäßig in `@docmd/core` enthalten. Sie können globale Rendering-Optionen in Ihrer `docmd.config.json` konfigurieren.

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `info` | `boolean` | `true` | Zeigt API-Titel, Version und Beschreibung aus dem `info`-Objekt der Spezifikation an. |
| `download` | `boolean` | `false` | Wenn true, wird oben in der Spezifikation ein Link zum Herunterladen der rohen JSON/YAML-Datei hinzugefügt. |
| `summaryOnly` | `boolean` | `false` | Wenn true, werden nur Methode, Pfad und Zusammenfassung gerendert. Nützlich für große API-Indizes. |
| `allowRawHtml` | `boolean` | `false` | Wenn true, wird das Escapen von HTML-Tags in Beschreibungen verhindert. |

### Beispiel

```json "docmd.config.json"
{
  "plugins": {
    "openapi": {
      "info": true,
      "download": true,
      "summaryOnly": false
    }
  }
}
```

## Verwendung

Betten Sie eine OpenAPI-Spezifikation überall in Ihrem Markdown mit einem umzäunten Codeblock und dem `openapi`-Tag ein. Der Pfad wird relativ zu Ihrer Projektquelle aufgelöst.

````markdown
```openapi
assets/openapi.json
```
````

### Rendering-Ergebnis

```openapi
assets/docmd-api.json
```

## Was gerendert wird

Für jeden Pfad und jede HTTP-Methode in der Spezifikation rendert das Plugin:

- **Methoden-Badge** - farbcodiert (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- **Pfad** - der vollständige Endpunktpfad mit hervorgehobenen Parametern
- **Zusammenfassung und Beschreibung** - aus dem Operation-Objekt
- **Parameter-Tabelle** - Name, Ort (`path`, `query`, `header`, `cookie`), Typ, Pflicht-Flag, Beschreibung
- **Request-Body-Tabelle** - Schema-Eigenschaften mit Typen und Standardwerten
- **Responses-Tabelle** - Status-Codes mit Beschreibungen und Response-Schema-Typen
- **Deprecated-Hinweis** - als `deprecated: true` markierte Operationen werden inline markiert

::: callout tip "Rendering zur Build-Zeit"
Das gesamte Rendering findet zur Build-Zeit statt. Die generierten Seiten sind statisch und benötigen kein clientseitiges JavaScript zur Anzeige. Dies bietet schnelle Seitenladung, vollständige Suchindizierung und SEO-freundliches HTML.
:::

## Funktionsunterstützung

| Funktion | Unterstützung |
| :--- | :--- |
| OpenAPI 3.x | ✓ (JSON & YAML*) |
| Swagger 2.x | ✗ (Zuerst auf 3.x konvertieren) |
| `$ref`-Auflösung | ✓ (Interne Schemas) |
| `oneOf` / `anyOf` | ✓ (Als Union-Typen dargestellt) |
| `deprecated`-Flag | ✓ |

*\*YAML-Unterstützung erfordert die Installation des Pakets `js-yaml` in Ihrem Projekt.*
