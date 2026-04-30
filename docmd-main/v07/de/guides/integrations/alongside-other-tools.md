---
title: "Neben anderen Tools"
description: "Strategien zur Integration von docmd in ein Multi-Tool-Dokumentations-Ökosystem, um eine nahtlose User Experience zu schaffen."
---

## Problem

Große Organisationen nutzen selten ein einziges Tool für all ihre Dokumentationsanforderungen. Ihr Unternehmen verwendet vielleicht Confluence für interne Spezifikationen, Stoplight für das API-Design und GitHub für Codebeispiele. Die Integration dieser unterschiedlichen Quellen in eine einheitliche User Journey ist eine große Herausforderung, da sich Benutzer oft zwischen getrennten Portalen mit unterschiedlichen Stilen und Navigationsstrukturen wiederfinden.

## Warum es wichtig ist

Eine fragmentierte Dokumentationserfahrung schadet dem Vertrauen der Entwickler und erhöht die kognitive Belastung. Wenn ein Benutzer gezwungen ist, zwischen völlig unterschiedlichen Oberflächen zu wechseln, nur um einem Tutorial zu folgen, verliert er eher den Kontext oder gibt Ihr Produkt ganz auf. Die Vereinheitlichung Ihrer Tools gewährleistet eine professionelle, zusammenhängende Erfahrung, die zum Erkunden und Lernen einlädt.

## Ansatz

Nutzen Sie `docmd` als Ihren primären Dokumentations-Hub oder "Single Pane of Glass". Durch die Verwendung des [Menübars](../../configuration/menubar) für eine einheitliche Navigation und von [Embed-Containern](../../content/containers/embed) für Drittanbieter-Inhalte können Sie eine nahtlose Oberfläche schaffen, welche die Komplexität Ihrer Multi-Tool-Infrastruktur verbirgt.

## Implementierung

### 1. Einheitliche globale Navigation

Verwenden Sie die `menubar`-Konfiguration, um Ihre verschiedenen Dokumentationsportale miteinander zu verknüpfen. Dies stellt sicher, dass Benutzer immer den Weg zurück zu den Hauptanleitungen finden, unabhängig davon, auf welcher Subdomain sie sich gerade befinden.

```javascript
// docmd.config.js
export default {
  layout: {
    menubar: {
      left: [
        { text: 'Anleitungen', url: '/' }, // docmd-Seite
        { text: 'API-Referenz', url: 'https://api.example.com' }, // Externes Tool
        { text: 'Community', url: 'https://forum.example.com', external: true }
      ]
    }
  }
};
```

### 2. Nahtloses Embedding

Für Tools, die eine Weboberfläche bieten (wie interaktive API-Explorer oder Dashboard-Vorschauen), verwenden Sie den `::: embed`-Container, um diese direkt in Ihren `docmd`-Seiten anzuzeigen. Dies hält die Benutzer innerhalb Ihrer markengerechten Umgebung.

```markdown
# Interaktiver API-Explorer

::: embed "https://api.example.com/v1/explorer"
:::
```
Weitere Informationen finden Sie in der [Embed-Referenz](../../content/containers/embed).

### 3. Inhaltsaggregation

Für externe Inhalte, die zusammen mit Ihrer Kerndokumentation durchsuchbar sein müssen, sollten Sie einen Build-Schritt in Betracht ziehen, der Daten aus anderen Quellen abruft und in Markdown umwandelt. Dies ermöglicht es `docmd`, all Ihre Informationen in einem einzigen, einheitlichen [Suchindex](../../plugins/search) zu erfassen.

## Abwägungen

Während das Einbetten einen einheitlichen Look bietet, kann es gelegentlich Performance-Overhead oder Probleme mit verschachtelten Scrollbalken auf mobilen Geräten verursachen. Zudem werden Inhalte innerhalb eines Iframes nicht nativ von der `docmd`-Suchmaschine indiziert. Wenn die Durchsuchbarkeit aller Inhalte kritisch ist, wird die Priorisierung von [OpenAPI-Generierung](./openapi-generation) oder anderen Markdown-basierten Ingestion-Methoden empfohlen.
