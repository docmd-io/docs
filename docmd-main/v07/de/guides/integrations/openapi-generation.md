---
title: "OpenAPI-Generierung"
description: "So integrieren Sie OpenAPI/Swagger-Schemas in Ihren docmd-Workflow für eine automatisierte und synchronisierte API-Referenzdokumentation."
---

## Problem

Die manuelle Pflege einer REST-API-Dokumentation stellt ein erhebliches betriebliches Risiko dar. In dem Moment, in dem ein Entwickler einen Endpunkt ändert oder ein Schema im Code aktualisiert, veraltet die Dokumentation. Diese manuell synchron zu halten, ist mühsam, fehleranfällig und führt häufig zu Integrationsfehlern bei Ihren API-Konsumenten.

## Warum es wichtig ist

Ungenaue API-Referenzen sind eine Hauptursache für Frustration bei Entwicklern und erhöhte Support-Tickets. Die Automatisierung stellt sicher, dass Ihre Dokumentation die "Source of Truth" (einzige Quelle der Wahrheit) bleibt und den tatsächlichen Zustand Ihrer API in Echtzeit (oder bei jedem Build) widerspiegelt. Dies ermöglicht es Entwicklern, sich auf das Erstellen von Funktionen zu konzentrieren, anstatt Dokumentationstabellen manuell zu aktualisieren.

## Ansatz

Implementieren Sie eine asynchrone Build-Pipeline, die Ihr `openapi.json`- oder `swagger.yaml`-Schema in Standard-Markdown-Dateien konvertiert. Da `docmd` hervorragend darin ist, Markdown mit komplexen [Containern](../../content/containers/index.md) zu rendern, fühlt sich die resultierende API-Referenz integriert und visuell konsistent mit dem Rest Ihrer Dokumentation an.

## Implementierung

### 1. Build-Pipeline-Integration

Sie können ein Tool wie `widdershins` oder ein benutzerdefiniertes Skript verwenden, um Markdown aus Ihrem OpenAPI-Schema als Pre-Build-Schritt in Ihrer CI/CD-Pipeline zu generieren.

```json
// package.json
{
  "scripts": {
    "docs:generate-api": "npx widdershins --search false openapi.yaml -o docs/api/reference.md",
    "docs:build": "npm run docs:generate-api && npx @docmd/core build"
  }
}
```

### 2. Optimierung von API-Layouts

API-Referenzen sind oft inhaltsdicht, mit großen Tabellen für Parameter und verschachtelten Schemas. Verwenden Sie [Frontmatter](../../content/frontmatter.md), um das Seitenlayout für eine bessere Lesbarkeit zu optimieren.

```markdown
---
title: "REST-API-Referenz"
layout: "full"  # Maximiert den horizontalen Platz für dichte Tabellen
---
```

Durch das Setzen von `layout: "full"` wird die rechte Seitenleiste mit dem Inhaltsverzeichnis entfernt, wodurch mehr Platz für breite Codeblöcke und Antwortbeispiele entsteht.

### 3. Erweiterung mit docmd-Containern

Sie können das generierte Markdown nachbearbeiten, um `docmd`-Funktionen wie [Tabs](../../content/containers/tabs.md) für mehrsprachige Codebeispiele oder [Callouts](../../content/containers/callouts.md) für Authentifizierungswarnungen einzufügen.

````markdown
::: tabs

  == tab "cURL"
    ```bash
    curl -X GET "https://api.example.com/v1/users"
    ```

  == tab "Node.js"
    ```javascript
    const users = await client.getUsers();
    ```

:::
````

## Abwägungen

Maschinell generierte Dokumentationen eignen sich hervorragend für technische Genauigkeit, lassen aber oft die "menschliche Note" vermissen, die für effektives Lernen erforderlich ist. Wir empfehlen, die OpenAPI-Generierung für die **technische Referenz** (Endpunkte, Parameter, Schemas) zu verwenden, während Sie handgeschriebene **Tutorials** und **konzeptionelle Leitfäden** bereitstellen, um den Kontext und die Anwendungsfälle für Ihre API zu erläutern.
