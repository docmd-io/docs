---
title: "Konsistenz wahren"
description: "So gewährleisten Sie eine einheitliche Stimme und professionelle Qualität in großen Dokumentationsteams durch Linting und standardisierte Muster."
---

## Problem

In großen Teams hat jeder technische Redakteur einen anderen Stil und eigene Vorlieben. Einige verwenden Fettdruck zur Hervorhebung, andere Kursivschrift. Einige bevorzugen "Klicken Sie auf die Schaltfläche", während andere "Wählen Sie die Option" verwenden. Mit der Zeit kann Ihre Dokumentation zu einem "Flickenteppich" aus widersprüchlichen Stilen werden, was es für Benutzer erschwert, Informationen schnell zu erfassen, und das professionelle Vertrauen in Ihr Produkt mindert.

## Warum es wichtig ist

Konsistenz schafft Vertrautheit. Wenn Benutzer komplexe APIs oder Workflows erlernen, verlassen sie sich auf ein konsistentes Vokabular und strukturelle Muster, um effektiv durch die Inhalte zu navigieren. Eine einheitliche Stimme sorgt dafür, dass sich Ihre Dokumentation wie ein zusammenhängendes, hochwertiges Produkt anfühlt, was wiederum das Vertrauen in die Software selbst stärkt.

## Ansatz

Setzen Sie Konsistenz mechanisch durch [standardisierte Container](../../content/containers) und automatisierte Linting-Tools durch. Indem Sie Low-Level-Stil- und Syntaxprüfungen automatisieren, geben Sie Ihren Redakteuren den Freiraum, sich auf die High-Level-Qualität, Genauigkeit und Klarheit der Inhalte zu konzentrieren.

## Implementierung

### 1. Standardisierte docmd-Muster nutzen

Ermutigen Sie alle Mitwirkenden, die integrierten thematischen Container von `docmd` zu verwenden, anstatt mit manueller Markdown-Formatierung zu improvisieren. Dies stellt sicher, dass jede Warnung, jeder Tipp oder Hinweis auf der gesamten Website identisch aussieht und funktioniert.

```markdown
<!-- ❌ Vermeiden: inkonsistent und ohne Styling -->
**Hinweis:** Bitte starten Sie den Dienst neu.

<!-- ✅ Empfohlen: konsistent, barrierefrei und thematisch passend -->
::: callout info
Bitte starten Sie den Dienst neu.
:::
```

Die Verwendung von [Callouts](../../content/containers/callouts) stellt sicher, dass Ihre Dokumentation ein professionelles Erscheinungsbild behält und Barrierefreiheitsstandards erfüllt, ohne dass der Autor zusätzlichen Aufwand betreiben muss.

### 2. Prose-Linting implementieren

Integrieren Sie Tools wie **Vale** oder **Markdownlint**, um Markenterminologie, Tonfall und Grammatik durchzusetzen. Diese Tools können so konfiguriert werden, dass sie automatisch auf Passiv, voreingenommene Sprache oder falsche Schreibweisen von Produktnamen prüfen.

```ini
# Beispiel für .vale.ini
MinAlertLevel = suggestion
Packages = Google, Microsoft
[*]
BasedOnStyles = Vale, Google
```

### 3. Automatisierte Durchsetzung in der CI/CD

Integrieren Sie Konsistenzprüfungen in Ihre [GitHub Actions](../../guides/integrations/github-actions-cicd) oder andere CI/CD-Pipelines. Dies stellt sicher, dass jeder Pull Request automatisch auf Stil- und Strukturkonsistenz geprüft wird, bevor er gemergt werden kann.

```bash
# Beispiel für einen CI-Schritt zum Linting
- name: Dokumentation prüfen
  run: vale docs/
```

## Abwägungen

Striktes Linting kann Community-Mitglieder entmutigen, wenn sie bei einer einfachen Tippfehler-Korrektur mit mehreren "Stilfehlern" konfrontiert werden. Wir empfehlen, die Empfindlichkeit Ihres Linters für externe Beiträge auf `warning` zu stellen und den `error`-Status für interne Team-Updates zu reservieren, um ein Gleichgewicht zwischen Konsistenz und Inklusivität zu finden.
