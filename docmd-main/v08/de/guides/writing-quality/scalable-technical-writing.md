---
title: "Skalierbares technisches Schreiben"
description: "Wie Sie Progressive Disclosure und strukturelle Container nutzen, um wachsende Dokumentations-Komplexität zu managen, ohne Benutzer zu überwältigen."
---

## Problem

In frühen Stadien lässt sich ein Feature in wenigen Absätzen dokumentieren. Während sich das Produkt weiterentwickelt, explodieren diese Absätze in ein Meer von Edge-Cases, Plattform-Variationen und komplexen Optionen. Das führt zu "vertikalem Bloat", bei dem eine Seite zu einer unlesbaren Textwand wird.

## Warum es wichtig ist

Vertikaler Bloat zerstört Verständnis und erhöht die kognitive Last. Scrollen Benutzer durch Seiten irrelevanten Inhalts, fühlen sie sich überwältigt. Sie nehmen häufig an, dass das Produkt komplexer ist, als es tatsächlich ist. Skalierbares Schreiben stellt sicher, dass Benutzer zu jedem Zeitpunkt nur die Informationen sehen, die sie benötigen.

## Ansatz

Implementieren Sie **Progressive Disclosure**. Diese Technik beinhaltet, nur die kritischsten Informationen vorab darzustellen (den "Happy Path"). Komplexe, technische oder spezifische Details verstecken Sie hinter interaktiven UI-Strukturen. docmd bietet eingebaute Container, die speziell darauf ausgelegt sind, diese Komplexität effektiv zu managen.

## Implementierung

### 1. Variationen mit Tabs handhaben

Statt Anweisungen für mehrere Paket-Manager sequenziell aufzulisten, verwenden Sie den [Tabs-Container](../../content/containers/tabs.md). Damit kann der Benutzer seine spezifische Umgebung auswählen. Irrelevante Befehle werden sofort ausgeblendet und visuelle Unordnung reduziert.

````markdown
::: tabs

    == tab "npm"
        ```bash
        npm install docmd
        ```

    == tab "pnpm"
        ```bash
        pnpm add docmd
        ```
:::
````

### 2. Edge-Cases mit Collapsibles managen

Trifft ein Troubleshooting-Schritt nur auf einen kleinen Prozentsatz von Benutzern zu, lassen Sie ihn nicht den logischen Fluss des Haupttutorials unterbrechen. Verwenden Sie den [Collapsible-Container](../../content/containers/collapsible.md), um diese Details zu vergraben, während sie zugänglich bleiben.

```markdown
1. Starten Sie den Development-Server, indem Sie `npx @docmd/core dev` ausführen.

::: collapsible "Troubleshooting: Port bereits belegt"
Wenn Sie einen `EADDRINUSE`-Fehler erhalten, können Sie mit dem Flag `--port` einen benutzerdefinierten Port angeben: `npx @docmd/core dev --port 4000`.
:::
```

### 3. Progressive Details mit Callouts

Verwenden Sie [Callouts](../../content/containers/callouts.md), um ergänzende Informationen bereitzustellen, die nicht für die primäre Aufgabe erforderlich sind, aber wertvollen Kontext für fortgeschrittene Benutzer bieten.

## Abwägungen

Inhalte in Tabs oder Collapsibles zu verbergen kann es gelegentlich erschweren, Informationen über die native `Ctrl+F`-Suche des Browsers zu finden. Allerdings indexiert docmds integrierte [Such-Engine](../../plugins/search.md) alle Inhalte innerhalb dieser Container. Das stellt sicher, dass Benutzer genau das finden, was sie benötigen, während sie ein saubereres Lese-Erlebnis genießen.