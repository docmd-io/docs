---
title: "Neben anderen Tools"
description: "Strategien zur Integration von docmd in ein Multi-Tool-Dokumentations-Ökosystem, um eine nahtlose User Experience zu schaffen."
---

## Problem

Große Organisationen verwenden selten ein einziges Tool für Dokumentation. Möglicherweise nutzen Sie Confluence für interne Specs, Stoplight für APIs und GitHub für Code. Die Integration unterschiedlicher Quellen in eine einheitliche User Journey ist eine Herausforderung. Benutzer springen häufig zwischen unverbundenen Portalen mit unterschiedlichen Stilen und Navigationen hin und her.

## Warum es wichtig ist

Ein fragmentiertes Dokumentations-Erlebnis ruiniert das Vertrauen von Entwicklern und erhöht die kognitive Last. Wechselt ein Benutzer zwischen völlig unterschiedlichen Oberflächen, um einem Tutorial zu folgen, verliert er den Kontext oder verlässt Ihr Produkt. Das Vereinen Ihrer Tools gewährleistet eine professionelle, kohärente Erfahrung, die zum Erkunden ermutigt.

## Ansatz

Verwenden Sie docmd als Ihren primären Dokumentations-Hub. Durch Nutzung der [Menüleiste](../../configuration/menubar.md) für vereinte Navigation und [Embed-Container](../../content/containers/embed.md) für Drittanbieter-Inhalte können Sie eine nahtlose Oberfläche schaffen, die die Multi-Tool-Komplexität verbirgt.

## Implementierung

### 1. Vereinte globale Navigation

Verwenden Sie die `menubar`-Konfiguration, um Ihre verschiedenen Dokumentations-Portale miteinander zu verknüpfen. So finden Benutzer unabhängig von der Subdomain stets den Weg zurück zu den Hauptleitfäden.

```json "docmd.config.json"
{
  "layout": {
    "menubar": {
      "left": [
        { "text": "Leitfäden", "url": "/" },
        { "text": "API-Referenz", "url": "https://api.example.com" },
        { "text": "Community", "url": "https://forum.example.com" }
      ]
    }
  }
}
```

### 2. Nahtloses Einbetten

Für Tools, die eine Web-Oberfläche bereitstellen (wie interaktive API-Explorer oder Dashboard-Vorschauen), verwenden Sie den Container `::: embed`. Diese werden direkt innerhalb Ihrer docmd-Seiten angezeigt und halten Benutzer in Ihrer Marken-Umgebung.

```markdown
# Interaktiver API-Explorer

::: embed "https://api.example.com/v1/explorer"
:::
```
Weitere Informationen finden Sie in der [Embed-Referenz](../../content/containers/embed.md).

### 3. Content-Aggregation

Für externe Inhalte, die zusammen mit der Kern-Dokumentation durchsuchbar sein müssen, erwägen Sie einen Build-Schritt, der Daten aus anderen Quellen abruft und in Markdown konvertiert. Dadurch kann docmd alle Informationen in einem einzigen, vereinten [Suchindex](../../plugins/search.md) indizieren.

## Abwägungen

Während Embedding ein einheitliches Erscheinungsbild bietet, kann es Performance-Overhead oder "Scroll-Nesting"-Probleme auf mobilen Geräten verursachen. Inhalte innerhalb eines iframe werden von docmds Such-Engine nicht nativ indexiert. Ist Such-Parität entscheidend, wird empfohlen, [OpenAPI-Generierung](openapi-generation.md) oder andere Markdown-basierte Ingestion-Methoden zu priorisieren.