---
title: "OpenAPI-Generierung"
description: "Wie Sie OpenAPI/Swagger-Schemata in Ihren docmd-Workflow integrieren, um automatisierte und synchronisierte API-Referenz-Dokumentation zu erhalten."
---

## Problem

REST-API-Dokumentation manuell zu pflegen ist ein operatives Risiko. Wenn ein Ingenieur einen Endpoint modifiziert oder ein Schema im Code aktualisiert, veraltet die Dokumentation. Sie manuell synchron zu halten ist mühsam, fehleranfällig und führt häufig zu Integrations-Fehlern bei Konsumenten.

## Warum es wichtig ist

Fehlerhafte API-Referenzen verursachen Frustration bei Entwicklern und erhöhen die Anzahl an Support-Tickets. Automatisierung stellt sicher, dass Ihre Dokumentation die "Source of Truth" bleibt und bei jedem Build den tatsächlichen Zustand Ihrer API widerspiegelt. Das erlaubt Ingenieuren, sich auf das Bauen von Features zu konzentrieren, anstatt Tabellen manuell zu aktualisieren.

## Ansatz

Implementieren Sie eine asynchrone Build-Pipeline, die Ihr `openapi.json`- oder `swagger.yaml`-Schema in Standard-Markdown-Dateien konvertiert. Da docmd exzellent Markdown mit komplexen [Containern](../../content/containers/index.md) rendert, fühlt sich die resultierende API-Referenz integriert und visuell konsistent mit dem Rest Ihrer Dokumentation an.

## Implementierung

### 1. Build-Pipeline-Integration

Verwenden Sie ein Tool wie `widdershins` oder ein benutzerdefiniertes Skript, um Markdown aus Ihrem OpenAPI-Schema als Pre-Build-Schritt in Ihrer CI/CD-Pipeline zu generieren.

```json "package.json"
// package.json
{
  "scripts": {
    "docs:generate-api": "npx widdershins --search false openapi.yaml -o docs/api/reference.md",
    "docs:build": "npm run docs:generate-api && npx @docmd/core build"
  }
}
```

### 2. API-Layouts optimieren

API-Referenzen sind oft inhaltsdicht mit großen Tabellen für Parameter und verschachtelte Schemata. Verwenden Sie [Frontmatter](../../content/frontmatter.md), um das Seitenlayout für Lesbarkeit zu optimieren.

```markdown
---
title: "REST API-Referenz"
layout: "full"  # Maximiert horizontalen Platz für dichte Tabellen
---
```

`layout: "full"` zu setzen entfernt das rechte Inhaltsverzeichnis und bietet mehr Raum für breite Code-Blöcke und Response-Beispiele.

### 3. Mit docmd-Containern erweitern

Post-Processen Sie das generierte Markdown, um docmd-Features wie [Tabs](../../content/containers/tabs.md) für mehrsprachige Code-Samples oder [Callouts](../../content/containers/callouts.md) für Authentifizierungs-Warnungen zu injizieren.

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

Maschinell generierte Dokumentation ist exzellent für technische Genauigkeit, es fehlt ihr jedoch der "menschliche Touch", der für effektives Lernen erforderlich ist. Wir empfehlen, OpenAPI-Generierung für die **technische Referenz** (Endpoints, Parameter, Schemata) zu verwenden und handgeschriebene **Tutorials** und **konzeptionelle Leitfäden** bereitzustellen, um Kontext und Anwendungsfälle zu erklären.
