---
title: "Skalierbares technisches Schreiben"
description: "So nutzen Sie Progressive Disclosure und strukturelle Container, um die wachsende Komplexität der Dokumentation zu bewältigen, ohne Ihre Benutzer zu überfordern."
---

## Problem

In der Anfangsphase eines Produkts reicht es oft aus, eine Funktion in wenigen Absätzen zu beschreiben. Wenn sich das Produkt jedoch zu einer Enterprise-Plattform entwickelt, können diese Absätze zu einer Flut von Edge-Cases, plattformspezifischen Variationen (Docker, Kubernetes, Cloud) und komplexen Konfigurationsoptionen anwachsen. Dies führt zu "vertikalem Bloat", bei dem eine einzelne Seite zu einer unlesbaren Textwand wird, die schwer zu navigieren und zu warten ist.

## Warum es wichtig ist

Vertikaler Bloat zerstört das Verständnis und erhöht die kognitive Belastung. Wenn Benutzer gezwungen sind, durch seitenlange Inhalte zu scrollen, die für ihre spezifische Umgebung oder ihren Anwendungsfall irrelevant sind, fühlen sie sich überfordert und nehmen das Produkt oft als komplexer wahr, als es tatsächlich ist. Skalierbares Schreiben stellt sicher, dass Benutzer in jedem Moment nur die Informationen sehen, die sie benötigen, und behält so einen klaren Weg zum Erfolg bei.

## Ansatz

Implementieren Sie **Progressive Disclosure**. Bei dieser Technik werden nur die kritischsten Informationen vorab präsentiert (der "Happy Path"), während komplexere, technische oder spezifische Details hinter interaktiven UI-Strukturen verborgen werden. `docmd` bietet mehrere integrierte Container an, die speziell dafür entwickelt wurden, Ihnen zu helfen, diese Komplexität effektiv und elegant zu verwalten.

## Implementierung

### 1. Umgang mit Variationen durch Tabs

Anstatt Anweisungen für mehrere Paketmanager, Betriebssysteme oder Cloud-Anbieter nacheinander aufzulisten, verwenden Sie den [Tabs-Container](../../content/containers/tabs). Dies ermöglicht es dem Benutzer, seine spezifische Umgebung auszuwählen, wodurch irrelevante Befehle sofort ausgeblendet und das visuelle Rauschen reduziert wird.

```markdown
::: tabs
::: tab "npm"
```bash
npm install docmd
```
:::
::: tab "pnpm"
```bash
pnpm add docmd
```
:::
:::
```

### 2. Verwaltung von Edge-Cases mit Collapsibles

Wenn ein Troubleshooting-Schritt oder ein spezifischer Edge-Case nur für einen kleinen Prozentsatz der Benutzer relevant ist, sollte er den logischen Fluss Ihres Haupt-Tutorials nicht unterbrechen. Verwenden Sie den [Collapsible-Container](../../content/containers/collapsible), um diese Details zu verbergen, während sie bei Bedarf leicht zugänglich bleiben.

```markdown
1. Starten Sie den Entwicklungsserver mit dem Befehl `npx docmd dev`.

::: collapsible "Troubleshooting: Port bereits belegt"
Wenn Sie den Fehler `EADDRINUSE` erhalten, können Sie einen benutzerdefinierten Port mit dem Flag `--port` angeben: `npx docmd dev --port 4000`.
:::
```

### 3. Progressive Details mit Callouts

Verwenden Sie [Callouts](../../content/containers/callouts), um ergänzende Informationen bereitzustellen, die für die Hauptaufgabe nicht zwingend erforderlich sind, aber wertvollen Kontext für fortgeschrittene Benutzer bieten.

## Abwägungen

Das Verbergen von Inhalten in Tabs oder Collapsibles kann es Benutzern gelegentlich erschweren, Informationen über die browsernative Suche (`Strg+F`) zu finden. Die integrierte [Suchmaschine](../../plugins/search) von `docmd` indiziert jedoch alle Inhalte innerhalb dieser Container. So wird sichergestellt, dass Benutzer über die primäre Suchoberfläche der Website immer genau das finden, was sie benötigen, während sie gleichzeitig ein deutlich saubereres Leseerlebnis genießen.
