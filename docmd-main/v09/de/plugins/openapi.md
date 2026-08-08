---
title: "OpenAPI-Plugin"
description: "Statische API-Referenzdokumentation, die während des Builds direkt aus OpenAPI 3.x-Spezifikationen gerendert wird."
---

Das `@docmd/plugin-openapi`-Plugin konvertiert OpenAPI 3.x-Spezifikationsdateien (JSON oder YAML) in strukturierte, durchsuchbare API-Referenzseiten. Gemäß der Zero-JS-Laufzeitphilosophie von Docmd wird jeder Endpunkt, jede Parametertabelle und jedes Schemamodell während der Build-Verarbeitung in statisches HTML kompiliert.

## Konfigurationsoptionen

Konfigurieren Sie globale OpenAPI-Rendering-Parameter in `docmd.config.json`:

| Option | Typ | Standard | Technische Beschreibung |
| :--- | :--- | :--- | :--- |
| `info` | `boolean` | `true` | Zeigt API-Titel, Version und Beschreibung aus dem `info`-Block der Spezifikation an. |
| `download` | `boolean` | `false` | Fügt einen direkten Download-Link für die rohe JSON/YAML-Spezifikationsdatei hinzu. |
| `summaryOnly` | `boolean` | `false` | Rendert Methoden- und Pfadzusammenfassungen auf hoher Ebene ohne vollständige Parameterschemas. |
| `allowRawHtml` | `boolean` | `false` | Erlaubt unmaskiertes rohes HTML in Spezifikationsbeschreibungszeichenfolgen. |

### Globales Konfigurationsbeispiel

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

## Verwendung & Syntax

Betten Sie OpenAPI-Spezifikationen mithilfe von umzäunten Codeblöcken ein, die mit `openapi` versehen sind. Geben Sie relative Dateipfade an, die von Ihrem Dokumentationsquellstamm aus gehen:

````markdown
```openapi
assets/openapi.json
```
````

### Spezifikationsausgabe

Das Plugin parst und rendert:

* **HTTP-Methoden-Badges**: Farbcodierte Badges (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
* **Endpunkt-Pfade**: Parametrisierte Pfadzeichenfolgen.
* **Parameter-Tabellen**: Name, Position (`path`, `query`, `header`, `cookie`), Datentyp, Pflichtfeld-Flag und Beschreibungen.
* **Anfrage- & Antwort-Modelle**: Strukturierte Schematabellen mit Feldtypen und Standardwerten.
* **Deprecation-Banner**: Inline-Warnungen für Endpunkte, die mit `deprecated: true` gekennzeichnet sind.

::: callout tip "Zero-JS-Ausführung zur Build-Zeit" icon:zap
Alle OpenAPI-Spezifikationen werden während der Kompilierung in statisches HTML geparst. Zur Laufzeit werden keine schweren clientseitigen JavaScript-Bibliotheken geladen, was die Seitenladezeiten minimal hält und eine vollständige Suchindizierbarkeit gewährleistet.
:::

## Technische Kompatibilität

| Spezifikationsfunktion | Kompatibilitätsstufe |
| :--- | :--- |
| OpenAPI 3.x (JSON) | Native Unterstützung |
| OpenAPI 3.x (YAML) | Unterstützt (`js-yaml`-Abhängigkeit) |
| Swagger 2.0 | Veraltet (Vor dem Build auf OpenAPI 3.x konvertieren) |
| Interne `$ref`-Schemas | Vollständige Auflösung |
| Polymorphe `oneOf` / `anyOf` | Werden als Union-Typen gerendert |
| Veraltete Operationen | Inline unterstützt |