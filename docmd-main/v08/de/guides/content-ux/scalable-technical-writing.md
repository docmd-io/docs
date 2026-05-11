---
title: "Skalierbares technisches Schreiben"
description: "Wie Sie Progressive Disclosure (schrittweise Offenlegung) und strukturelle Container nutzen, um wachsende Dokumentationskomplexität zu bewältigen, ohne Ihre Benutzer zu überfordern."
---

## Problem

In der Anfangsphase eines Produkts kann die Dokumentation einer Funktion nur wenige Absätze umfassen. Wenn sich das Produkt jedoch zu einer Unternehmensplattform entwickelt, können diese Absätze zu einem Meer aus Grenzfällen, plattformspezifischen Variationen (Docker, Kubernetes, Cloud) und komplexen Konfigurationsoptionen explodieren. Dies führt zu einem "vertikalen Aufblähen", bei dem eine einzelne Seite zu einer unlesbaren Textwüste wird, die schwer zu navigieren und zu warten ist.

## Warum es wichtig ist

Vertikales Aufblähen zerstört das Verständnis und erhöht die kognitive Belastung. Wenn Benutzer gezwungen sind, durch seitenlange Inhalte zu scrollen, die für ihre spezifische Umgebung oder ihren Anwendungsfall irrelevant sind, werden sie überfordert und nehmen oft an, dass das Produkt komplexer ist, als es tatsächlich ist. Skalierbares Schreiben stellt sicher, dass Benutzer in jedem Moment nur die Informationen sehen, die sie benötigen, und bewahrt so einen klaren Weg zum Erfolg.

## Ansatz

Implementieren Sie **Progressive Disclosure**. Diese Technik beinhaltet, nur die kritischsten Informationen vorab zu präsentieren (den "Happy Path") und komplexere, technische oder spezifischere Details hinter interaktiven UI-Strukturen zu verbergen. `docmd` bietet mehrere integrierte Container, die speziell entwickelt wurden, um Ihnen zu helfen, diese Komplexität effektiv und elegant zu bewältigen.

## Implementierung

### 1. Umgang mit Variationen durch Tabs

Anstatt Anweisungen für mehrere Paketmanager, Betriebssysteme oder Cloud-Anbieter nacheinander aufzulisten, verwenden Sie den [Tabs-Container](../../content/containers/tabs.md). Dies ermöglicht es dem Benutzer, seine spezifische Umgebung auszuwählen, wodurch irrelevante Befehle sofort ausgeblendet und visuelles Rauschen reduziert wird.

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

### 2. Bewältigung von Grenzfällen mit Collapsibles

Wenn ein Schritt zur Fehlerbehebung oder ein spezifischer Grenzfall nur für einen kleinen Prozentsatz der Benutzer gilt, lassen Sie ihn nicht den logischen Fluss Ihres Haupt-Tutorials unterbrechen. Verwenden Sie den [Collapsible-Container](../../content/containers/collapsible.md), um diese Details zu verbergen, während sie bei Bedarf leicht zugänglich bleiben.

```markdown
1. Starten Sie den Entwicklungsserver durch Ausführen von `npx @docmd/core dev`.

::: collapsible "Fehlerbehebung: Port wird bereits verwendet"
Wenn Sie einen `EADDRINUSE`-Fehler erhalten, können Sie einen benutzerdefinierten Port mit dem `--port`-Flag angeben: `npx @docmd/core dev --port 4000`.
:::
```

### 3. Progressive Details mit Callouts

Verwenden Sie [Callouts](../../content/containers/callouts.md), um ergänzende Informationen bereitzustellen, die für die Hauptaufgabe nicht erforderlich sind, aber wertvollen Kontext für fortgeschrittene Benutzer bieten.

## Abwägungen

Das Verbergen von Inhalten in Tabs oder Collapsibles kann es für Benutzer gelegentlich schwieriger machen, Informationen mithilfe der nativen `Strg+F`-Suche des Browsers zu finden. Die integrierte [Suchmaschine](../../plugins/search.md) von `docmd` indiziert jedoch alle Inhalte innerhalb dieser Container. So wird sichergestellt, dass Benutzer über die primäre Suchoberfläche der Website immer noch genau das finden, was sie brauchen, während sie gleichzeitig ein viel saubereres Leseerlebnis genießen.
