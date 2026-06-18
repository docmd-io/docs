---
title: "Navigation für große Sites"
description: "Wie Sie komplexe Dokumentations-Sets mit docmds Layout-Tools in eine intuitive, skalierbare Navigations-Struktur organisieren."
---

## Problem

Wenn eine Site auf Hunderte Seiten anwächst, wird eine einfache Sidebar schnell zum Labyrinth tief verschachtelter Ordner. Müssen Benutzer mehrere Ebenen aufklappen, um eine Referenz zu finden, verlieren sie den Kontext. Frustrierte Benutzer verlassen die Dokumentation und stochern lieber durch Trial-and-Error.

## Warum es wichtig ist

Navigation ist die "Karte" der Fähigkeiten Ihres Produkts. Ist Navigation schwierig, verlassen sich Benutzer ausschließlich auf die Suchleiste, was zu fragmentiertem Wissen führt. Ein gut strukturierte Navigations-System vermittelt Benutzern die Taxonomie Ihres Produkts und hilft ihnen, mit der Zeit selbstständig zu werden.

## Ansatz

Priorisieren Sie **Top-Level Context Switching** gegenüber tiefer Verschachtelung. Halten Sie Ihre linke Sidebar auf zwei bis drei Tiefen-Ebenen begrenzt. Verwenden Sie die horizontale [Menüleiste](../../configuration/menubar.md), um unterschiedliche Dokumentations-"Domänen" zu trennen (z. B. Leitfäden, API-Referenz, Community). So bleibt jede Sidebar fokussiert und überschaubar.

## Implementierung

### 1. Domänen-basierte Trennung

Verwenden Sie in Ihrer `docmd.config.json` die [Menüleiste](../../configuration/menubar.md), um Ihre Inhalte in übergeordnete Kategorien zu gliedern. Dieser Ansatz erlaubt es Ihnen, für jede Domäne eine völlig andere Sidebar darzustellen und zu verhindern, dass ein einzelner Navigations-Baum überwältigend wird.

### 2. Hierarchie abflachen

Statt ein einzelnes Konzept über viele winzige Seiten zu verteilen, konsolidieren Sie verwandte Informationen in umfassenden übergeordneten Seiten. Verwenden Sie eine klare [Header-Hierarchie](../../content/syntax/index.md), damit Benutzer innerhalb der Seite über das automatisch generierte rechte Inhaltsverzeichnis (TOC) navigieren können.

*   **❌ Schlechte IA**: Ein Ordner namens "Security", der zehn separate, ein-Absatz-Dateien für unterschiedliche Protokolle enthält.
*   **✅ Bessere IA**: Eine einzelne, gut strukturierte "Security Overview"-Seite, die alle Protokolle abdeckt und Header verwendet, um ein sauberes Inhaltsverzeichnis zu liefern.

### 3. Collapsible-Sections verwenden

Für große Gruppen verwandter Inhalte, auf die selten zugegriffen wird, verwenden Sie die Eigenschaft `collapsible` in Ihrer [Navigationskonfiguration](../../configuration/navigation.md). Das hält die Oberfläche sauber, indem es sekundäre Informationen verbirgt, bis sie vom Benutzer explizit angefordert werden.

```json "navigation.json"
// navigation.json
{
  "title": "API-Referenz",
  "collapsible": true,
  "collapsed": true,
  "children": [
    { "title": "Authentifizierung", "path": "api/auth" },
    { "title": "Endpoints", "path": "api/endpoints" }
  ]
}
```

## Abwägungen

Inhalte auf weniger, dafür längeren Seiten zu konsolidieren erfordert Disziplin der Autoren in Bezug auf strukturelle Klarheit und Header-Verwendung. Wird eine Seite zu lang ohne angemessene interne Navigation, wird sie selbst zur "Wortwand". Die signifikante Reduktion von "Klick-Müdigkeit" und die verbesserte Auffindbarkeit machen jedoch eine flachere, domänen-basierte Hierarchie für große Dokumentations-Sets besser.
