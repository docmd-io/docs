---
title: "OpenAPI-Generierung"
description: "So integrieren Sie OpenAPI/Swagger-Schemas in Ihren docmd-Workflow für eine automatisierte und synchronisierte API-Referenzdokumentation."
---

## Problem

Die manuelle Pflege von REST-API-Dokumentation ist ein erhebliches operatives Risiko. In dem Moment, in dem ein Entwickler einen Endpunkt ändert oder ein Schema im Code aktualisiert, veraltet die Dokumentation. Der manuelle Abgleich ist mühsam, fehleranfällig und führt häufig zu Integrationsfehlern bei Ihren API-Nutzern.

## Warum es wichtig ist

Ungenaue API-Referenzen sind eine Hauptursache für Frustration bei Entwicklern und ein erhöhtes Aufkommen an Support-Tickets. Die Automatisierung stellt sicher, dass Ihre Dokumentation die "Single Source of Truth" bleibt und den tatsächlichen Zustand Ihrer API in Echtzeit (oder bei jedem Build) widerspiegelt. So können sich Entwickler auf die Erstellung von Features konzentrieren, anstatt manuell Tabellen in der Dokumentation zu aktualisieren.

## Ansatz

Implementieren Sie eine asynchrone Build-Pipeline, die Ihr `openapi.json`- oder `swagger.yaml`-Schema in Standard-Markdown-Dateien konvertiert. Da `docmd` hervorragend darin ist, Markdown mit komplexen [Containern](../../content/containers) zu rendern, fühlt sich die resultierende API-Referenz integriert und visuell konsistent mit der restlichen Dokumentation an.

## Implementierung

### 1. Integration in die Build-Pipeline

Sie können ein Tool wie `widdershins` oder ein eigenes Skript verwenden, um als Pre-Build-Schritt in Ihrer CI/CD-Pipeline Markdown aus Ihrem OpenAPI-Schema zu generieren.

```json
// package.json
{
  "scripts": {
    "docs:generate-api": "npx widdershins --search false openapi.yaml -o docs/api/reference.md",
    "docs:build": "npm run docs:generate-api && npx docmd build"
  }
}
```

### 2. API-Layouts optimieren

API-Referenzen sind oft inhaltlich sehr dicht, mit großen Tabellen für Parameter und verschachtelten Schemas. Verwenden Sie [Frontmatter](../../content/frontmatter), um das Seitenlayout für eine bessere Lesbarkeit zu optimieren.

```markdown
---
title: "REST-API-Referenz"
layout: "full"  # Maximiert den horizontalen Platz für dichte Tabellen
---
```

Die Einstellung `layout: "full"` entfernt die rechte Sidebar (Inhaltsverzeichnis) und bietet so mehr Platz für breite Code-Blöcke und Response-Beispiele.

### 3. Erweiterung mit docmd-Containern

Sie können das generierte Markdown nachbearbeiten, um `docmd`-Funktionen wie [Tabs](../../content/containers/tabs) für mehrsprachige Code-Beispiele oder [Callouts](../../content/containers/callouts) für Authentifizierungswarnungen einzufügen.

```markdown
::: tabs
::: tab "cURL"
```bash
curl -X GET "https://api.example.com/v1/users"
```
:::
::: tab "Node.js"
```javascript
const users = await client.getUsers();
```
:::
:::
```

## Abwägungen

Maschinell generierte Dokumentation ist hervorragend für die technische Genauigkeit, lässt aber oft die "menschliche Note" vermissen, die für effektives Lernen erforderlich ist. Wir empfehlen, die OpenAPI-Generierung rein für die **technische Referenz** (Endpunkte, Parameter, Schemas) zu nutzen, während handgeschriebene **Tutorials** und **konzeptionelle Anleitungen** den Kontext und die Anwendungsfälle für Ihre API erklären.
