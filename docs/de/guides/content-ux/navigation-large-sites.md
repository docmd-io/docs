---
title: "Navigation für große Sites"
description: "So organisieren Sie komplexe Dokumentations-Sets in einer intuitiven, skalierbaren Navigationsstruktur unter Verwendung der Layout-Tools von docmd."
---

## Problem

Wenn eine Dokumentations-Website von ein paar Dutzend Seiten auf Hunderte oder Tausende anwächst, verwandelt sich eine einfache Sidebar oft in ein verwirrendes Labyrinth aus tief verschachtelten Ordnern. Wenn Benutzer gezwungen sind, mehrere Hierarchieebenen aufzuklappen, nur um eine bestimmte Referenz zu finden, verlieren sie den Kontext, werden frustriert und geben die Dokumentation oft zugunsten von "Trial-and-Error" auf.

## Warum es wichtig ist

Die Navigation ist die "Landkarte" der Funktionen Ihres Produkts. Wenn die Navigation schwer zu bedienen ist, verlassen sich die Benutzer ausschließlich auf die Suchleiste, was zu fragmentiertem Wissen führen kann. Ein gut strukturiertes Navigationssystem vermittelt dem Benutzer beim Durchsuchen die Logik und Taxonomie Ihres Produkts und hilft ihm, mit der Zeit kompetenter und eigenständiger zu werden.

## Ansatz

Priorisieren Sie **Top-Level Context Switching** gegenüber tiefer Verschachtelung. Versuchen Sie, Ihre linke Sidebar auf maximal zwei oder drei Ebenen Tiefe zu beschränken. Nutzen Sie den horizontalen [Menübar](../../configuration/menubar), um verschiedene Dokumentations-"Domänen" (z. B. Anleitungen, API-Referenz und Community) voneinander zu trennen. Dies ermöglicht es jeder einzelnen Sidebar, fokussiert, relevant und übersichtlich zu bleiben.

## Implementierung

### 1. Domänenbasierte Trennung

Verwenden Sie in Ihrer `docmd.config.js` den [Menübar](../../configuration/menubar), um Ihre Inhalte in übergeordnete Kategorien zu unterteilen. Dieser Ansatz ermöglicht es Ihnen, für jede Domäne eine völlig andere Sidebar anzuzeigen, was verhindert, dass ein einzelner Navigationsbaum überladen wird.

### 2. Flachhalten der Hierarchie

Anstatt ein einzelnes Konzept auf viele winzige Markdown-Seiten aufzuteilen, sollten Sie verwandte Informationen in umfassenden übergeordneten Seiten konsolidieren. Verwenden Sie eine klare [Überschriften-Hierarchie](../../content/syntax), damit Benutzer innerhalb der Seite mithilfe des automatisch generierten Inhaltsverzeichnisses (TOC) auf der rechten Seite navigieren können.

*   **❌ Schlechte IA**: Ein Ordner namens "Sicherheit", der zehn separate Dateien mit jeweils nur einem Absatz für verschiedene Protokolle enthält.
*   **✅ Bessere IA**: Eine einzige, gut strukturierte Seite "Sicherheitsübersicht", die alle Protokolle abdeckt und Überschriften für ein sauberes Inhaltsverzeichnis nutzt.

### 3. Nutzung von einklappbaren Abschnitten

Für große Gruppen verwandter Inhalte, auf die nicht ständig zugegriffen wird, verwenden Sie die Eigenschaft `collapsible` in Ihrer [Navigations-Konfiguration](../../configuration/navigation). Dies hält die Benutzeroberfläche sauber, indem sekundäre Informationen ausgeblendet werden, bis sie vom Benutzer explizit angefordert werden.

```json
// navigation.json
{
  "title": "API-Referenz",
  "collapsible": true,
  "collapsed": true,
  "children": [
    { "title": "Authentifizierung", "path": "api/auth" },
    { "title": "Endpunkte", "path": "api/endpoints" }
  ]
}
```

## Abwägungen

Das Konsolidieren von Inhalten in weniger, längeren Seiten erfordert von den Autoren Disziplin in Bezug auf strukturelle Klarheit und die Verwendung von Überschriften. Wenn eine Seite ohne ordentliche interne Navigation (TOC) zu lang wird, kann sie selbst zu einer "Textwand" werden. Die deutliche Reduzierung von "Klick-Ermüdung" und das bessere Auffinden verwandter Inhalte machen eine flachere, domänenbasierte Hierarchie für große Dokumentations-Sets jedoch deutlich überlegen.
