---
title: "OpenAPI-Plugin"
description: "Rendert OpenAPI 3.x API-Referenzdokumentation direkt aus JSON- oder YAML-Spezifikationsdateien in Ihren Markdown-Seiten."
---

Das **OpenAPI-Plugin** wandelt OpenAPI 3.x Spezifikationsdateien in strukturierte API-Referenzseiten um - zur Build-Zeit gerendert, ohne clientseitiges JavaScript und ohne Drittanbieter-Abhängigkeiten. Jeder Endpunkt, Parameter, Request-Body und jede Response wird in semantische HTML-Tabellen konvertiert.

::: callout info "Kern-Plugin"
Das OpenAPI-Plugin ist jetzt standardmäßig in `@docmd/core` **enthalten**. Eine separate Installation ist nicht erforderlich. Es folgt der Docmd-Philosophie des Build-Zeit-Renderings - das Plugin liest Ihre Spezifikation und gibt saubere, zugängliche HTML-Tabellen ohne clientseitiges JavaScript aus.
:::

## Installation

```bash
docmd add openapi
# oder manuell:
npm install @docmd/plugin-openapi
```

In Ihrer Konfiguration aktivieren:

```javascript
export default defineConfig({
  plugins: {
    openapi: {}
  }
});
```

## Verwendung

Betten Sie eine OpenAPI-Spezifikation in jede Markdown-Seite ein, indem Sie einen umzäunten Codeblock mit dem `openapi`-Sprach-Tag verwenden:

````markdown
### Live-Beispiel

```openapi
assets/docmd-api.json
```
````

### Ergebnis

```openapi
assets/docmd-api.json
```

Der Pfad wird relativ zu Ihrem `src`-Verzeichnis aufgelöst. Sowohl **JSON** als auch **YAML**-Formate werden unterstützt. YAML erfordert die Installation von `js-yaml`:

```bash
npm install js-yaml
```

## Was gerendert wird

Für jeden Pfad und jede HTTP-Methode in der Spezifikation rendert das Plugin:

- **Methoden-Badge** - farbkodiert (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- **Pfad** - der vollständige Endpunkt-Pfad
- **Zusammenfassung und Beschreibung** - aus dem Operationsobjekt
- **Parameter-Tabelle** - Name, Position (`path`, `query`, `header`, `cookie`), Typ, Pflichtfeld, Beschreibung
- **Request-Body-Tabelle** - Schema-Eigenschaften mit Typen und Standardwerten
- **Response-Tabelle** - Status-Codes mit Beschreibungen und Response-Schema-Typen
- **Veraltungshinweis** - als `deprecated: true` markierte Operationen werden inline gekennzeichnet

::: callout tip "Build-Zeit-Rendering"
Alles Rendering erfolgt zur Build-Zeit. Die generierten Seiten sind vollständig statisch - kein JavaScript ist erforderlich, um die API-Dokumentation anzuzeigen, was schnelle Seitenladevorgänge und vollständige Suchindexierung bedeutet.
:::

## Unterstützte OpenAPI-Funktionen

| Funktion | Unterstützung |
| :--- | :--- |
| OpenAPI 3.x | ✓ |
| Swagger 2.x | ✗ (zuerst in 3.x konvertieren) |
| JSON-Format | ✓ |
| YAML-Format | ✓ (erfordert `js-yaml`) |
| `$ref`-Auflösung | ✓ (interne `#/components/schemas/`-Refs) |
| `oneOf` / `anyOf`-Typen | ✓ (als Union-Type-Strings angezeigt) |
| Verschachtelte Schema-Tabellen | ✓ |
| `deprecated`-Flag | ✓ |
| Externe `$ref` (Remote-URLs) | ✗ (nur lokale Refs) |

## Konfiguration

Das OpenAPI-Plugin kann in Ihrer `docmd.config.js` konfiguriert werden:

```javascript
export default defineConfig({
  plugins: {
    openapi: {
      info: true,           // API-Titel und Versions-Header anzeigen
      download: true,       // 'Download JSON/YAML'-Link in der Benutzeroberfläche bereitstellen
      summaryOnly: false,    // Nur Zusammenfassungen anzeigen, Parameter/Antworten ausblenden
      allowRawHtml: false    // HTML in Beschreibungen zulassen (mit Vorsicht verwenden)
    }
  }
});
```

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `info` | `boolean` | `true` | Zeigt API-Titel, Version und Beschreibung aus dem `info`-Objekt der Spezifikation an. |
| `download` | `boolean` | `false` | Wenn wahr, wird ein Link im Header der Spezifikation hinzugefügt, um die rohe JSON/YAML-Datei herunterzuladen/anzusehen. **Empfohlen für KI-Barrierefreiheit.** |
| `summaryOnly` | `boolean` | `false` | Wenn wahr, werden nur Methode, Pfad und Zusammenfassung gerendert. Nützlich für große API-Indizes. |
| `allowRawHtml` | `boolean` | `false` | Wenn wahr, wird das Escaping von HTML-Tags in Beschreibungen verhindert. |

## Seitenspezifische Steuerung

Plugin für bestimmte Seiten über Frontmatter deaktivieren:

```markdown
---
title: "Interne Notizen"
plugins:
  openapi: false
---
```