---
title: "OpenAPI-Generierung"
description: "Integrieren Sie OpenAPI- und Swagger-REST-Schemas in docmd-Workflows für automatisierte API-Dokumentations-Renderings."
---

Das manuelle Pflegen von REST-API-Dokumentationen ist anfällig für Abweichungen, wenn sich Code-Endpunkte weiterentwickeln. Automatisierung stellt sicher, dass Ihre Dokumentation die einzige Quelle der Wahrheit bleibt, die während der Build-Schritte automatisch aktualisiert wird.

docmd bietet natives Rendering für OpenAPI- / Swagger-Spezifikationen über `@docmd/plugin-openapi` oder automatisierte Pre-Build-Markdown-Generierung.

## Konfiguration

Aktivieren Sie das OpenAPI-Rendering in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "openapi": {
      "spec": "./schemas/openapi.json",
      "route": "/api/reference"
    }
  }
}
```

## Automatisiertes Pre-Build-Markdown-Pipeline

Alternativ kompilieren Sie Schemas vor der Ausführung von `docmd build` zu Markdown:

```json "package.json"
{
  "scripts": {
    "docs:generate-api": "npx widdershins --search false openapi.yaml -o docs/api/reference.md",
    "docs:build": "npm run docs:generate-api && npx @docmd/core build"
  }
}
```

## API-Layouts optimieren

API-Referenzen enthalten breite Parametertabellen und Antwort-Payloads. Verwenden Sie `layout: "full"` im Seiten-Frontmatter, um die maximale horizontale Breite zu gewähren:

```markdown
---
title: "REST API Referenz"
layout: "full"
---
```

::: callout tip "Mehrsprachige Anfragebeispiele" icon:code
Verbessern Sie generierte Endpunkt-Seiten, indem Sie mehrsprachige Code-Snippets in [Tabs-Container](../../content/containers/tabs.md) für cURL-, JavaScript-, Python- und Go-Beispiele einbetten.
:::
