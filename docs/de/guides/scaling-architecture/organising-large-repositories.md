---
title: "Organisation großer Repositories"
description: "So bewahren Sie Navigationsklarheit und Benutzerfreundlichkeit in komplexen Dokumentationsstrukturen durch Hub-Pages und hierarchische Navigation."
---

## Problem

Wenn ein Dokumentations-Repository auf Hunderte von Seiten anwächst, macht die Anzeige jedes Themas in einer einzigen, riesigen Sidebar die Website unbrauchbar. Benutzer leiden unter "Entscheidungsparalyse", wenn das Finden eines bestimmten Moduls das Scrollen durch Dutzende irrelevanter, ausgeklappter Kategorien erfordert.

## Warum es wichtig ist

Navigation ist eine kritische Komponente der User Experience. Ein überladenes Interface mindert die wahrgenommene Qualität Ihres Produkts und erschwert es Entwicklern, die benötigten Antworten zu finden. Wenn sich die Navigation chaotisch anfühlt, gehen Benutzer oft davon aus, dass die Software selbst ebenso schwierig zu bedienen ist.

## Ansatz

Implementieren Sie eine hierarchische Gruppierungsstrategie mithilfe der [Navigationskonfiguration](../../configuration/navigation) von `docmd`. Das Grundprinzip besteht darin, Komplexität zu verbergen, bis sie benötigt wird. Verwenden Sie ausklappbare Gruppen und "Hub-Pages", um die Sidebar sauber zu halten und sicherzustellen, dass sich Benutzer auf ihre aktuelle Aufgabe konzentrieren können, ohne überfordert zu werden.

## Implementierung

### 1. Hierarchische Gruppierung

Verwenden Sie die Eigenschaft `collapsible` in Ihrer `navigation.json` oder Konfigurationsdatei, um verwandte Seiten zu gruppieren. Dies hält die Sidebar übersichtlich und ermöglicht es Benutzern, nur die Abschnitte auszuklappen, die sie interessieren.

```json
// docs/navigation.json
[
  {
    "title": "Advanced API",
    "icon": "braces",
    "collapsible": true,
    "children": [
      { "title": "Authentifizierung", "path": "/api/auth" },
      { "title": "Webhooks", "path": "/api/webhooks" },
      { "title": "Rate Limiting", "path": "/api/rate-limiting" }
    ]
  }
]
```

### 2. Implementierung von Hub-Pages

Anstatt jede einzelne Seite in der Sidebar zu exponieren, erstellen Sie zentrale "Hub-Pages", die als Verzeichnisse für spezifische Subsysteme fungieren. Nutzen Sie [Grids und Cards](../../content/containers/grids-cards), um eine visuelle Übersicht über die verfügbaren Inhalte auf hoher Ebene zu geben.

```markdown
# Integrations-Hub

::: grids
::: grid
::: card "Datenbank-Integrationen" icon:database
Verbinden Sie Ihre Anwendung mit populären Datenbanken wie Postgres und MongoDB.
[Datenbank-Anleitungen ansehen](/integrations/databases)
:::
:::
::: grid
::: card "Payment Gateways" icon:credit-card
Erfahren Sie, wie Sie Stripe, PayPal und mehr implementieren.
[Payment-Anleitungen ansehen](/integrations/payments)
:::
:::
:::
```

### 3. Nutzung von Breadcrumbs

`docmd` generiert automatisch [Breadcrumbs](../../content/syntax/advanced#breadcrumbs) für jede Seite basierend auf Ihrer Ordnerstruktur und Navigationshierarchie. Durch die Verwendung von Hub-Pages können Sie die Sidebar fokussiert halten, während Breadcrumbs den notwendigen Kontext liefern und Benutzern eine einfache Möglichkeit bieten, in der Hierarchie wieder nach oben zu navigieren.

## Abwägungen

Die Verwendung von Hub-Pages kann einen zusätzlichen "Klick" erfordern, um tiefergehende Inhalte zu erreichen. Dies ist jedoch in der Regel einem überladenen Seitenmenü vorzuziehen, das das Auffinden von Informationen erschwert. Das Ergebnis ist ein saubereres, professionelleres Interface, das die allgemeine Durchsuchbarkeit und den Fokus Ihrer Dokumentation erheblich verbessert.
