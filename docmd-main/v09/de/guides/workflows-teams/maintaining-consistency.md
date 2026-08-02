---
title: "Konsistenz wahren"
description: "Wie Sie mit Linting und standardisierten Mustern eine einheitliche Stimme und professionelle Qualität in großen Dokumentationsteams sicherstellen."
---

## Problem

In großen Teams hat jeder technische Autor einen anderen Stil. Manche nutzen Fettdruck zur Hervorhebung, andere Kursivschrift. Manche bevorzugen "Klicken Sie auf den Button", andere "Wählen Sie die Option". Mit der Zeit wird die Dokumentation zu einem Flickwerk aus konfliktierenden Stilen. Das erschwert es Benutzern, Informationen zu verarbeiten, und mindert das professionelle Vertrauen.

## Warum es wichtig ist

Konsistenz erzeugt Vertrautheit. Wenn Benutzer komplexe APIs oder Workflows erlernen, verlassen sie sich auf konsistente Vokabulare und strukturelle Muster, um sich effektiv zurechtzufinden. Eine einheitliche Stimme lässt Dokumentation wie ein kohärentes, hochwertiges Produkt wirken und stärkt das Vertrauen in die Software selbst.

## Ansatz

Erzwingen Sie Konsistenz mechanisch durch [standardisierte Container](../../content/containers/index.md) und automatisierte Linting-Tools. Die Automatisierung niedrigstufiger Stil- und Syntax-Prüfungen befreit menschliche Editoren, sich auf die übergeordnete Qualität, Genauigkeit und Klarheit der Inhalte zu konzentrieren.

## Implementierung

### 1. Standardisierte docmd-Muster verwenden

Ermutigen Sie alle Mitwirkenden, die eingebauten thematischen Container von docmd anstelle manueller Markdown-Formatierung zu verwenden. Das stellt sicher, dass jede Warnung, jeder Tipp und jede Notiz über die gesamte Site hinweg identisch aussieht und sich identisch verhält.

```markdown
<!-- ❌ Vermeiden: inkonsistent und ungestaltet -->
**Hinweis:** Bitte starten Sie den Service neu.

<!-- ✅ Verwenden: konsistent, barrierefrei und thematisch -->
::: callout info
Bitte starten Sie den Service neu.
:::
```

Die Verwendung von [Callouts](../../content/containers/callouts.md) stellt sicher, dass Ihre Dokumentation ohne zusätzlichen Aufwand ein professionelles Erscheinungsbild bewahrt und Accessibility-Standards erfüllt.

### 2. Prose-Linting implementieren

Integrieren Sie Tools wie **Vale** oder **Markdownlint**, um Marken-Terminologie, Ton und Grammatik durchzusetzen. Diese Tools prüfen automatisch auf passive Formulierungen, voreingenommene Sprache oder fehlerhafte Produkt-Schreibweisen.

```ini ".vale.ini"
# .vale.ini example
MinAlertLevel = suggestion
Packages = Google, Microsoft
[*]
BasedOnStyles = Vale, Google
```

### 3. Automatisierte Durchsetzung in CI/CD

Beziehen Sie Konsistenz-Prüfungen in Ihre [GitHub Actions](../../guides/integrations/github-actions-cicd.md) oder andere CI/CD-Pipelines ein. Das stellt sicher, dass jeder Pull Request auf Stil und strukturelle Konsistenz auditiert wird, bevor er gemergt werden kann.

```bash
# Beispiel-CI-Schritt zum Linten
- name: Lint Documentation
  run: vale docs/
```

## Abwägungen

Strenges Linting kann Community-Mitwirkende entmutigen, wenn sie für eine einfache Tippfehler-Korrektur mit mehreren "Stilfehlern" konfrontiert werden. Wir empfehlen, die Linter-Sensitivität für externe Beiträge auf `warning` zu setzen und den Status `error` nur für interne Team-Updates zu reservieren. Das balanciert Konsistenz mit Inklusivität.