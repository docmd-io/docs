---
title: "Anti-Patterns vermeiden"
description: "Wie Sie häufige Dokumentations-Fehler erkennen und beseitigen, die die User Experience verschlechtern und Content Debt verursachen."
---

## Problem

In Dokumentations-Repositories sammeln sich "Quick Fixes" an, die ungewollt die User Experience erodieren. Anti-Patterns — wie vage Link-Texte oder aufgeblähte Code-Beispiele — verfestigen sich. Das macht Dokumentation schwerer wartbar und weniger nützlich für Entwickler.

## Warum es wichtig ist

Anti-Patterns tragen zu "Content Debt" bei. Sie verschlechtern SEO-Rankings, reduzieren Barrierefreiheit und erhöhen die kognitive Last für Leser, die schnelle Lösungen suchen. Hochwertige Dokumentation erfordert ständige Wachsamkeit, um sie sauber, prägnant und professionell zu halten.

## Ansatz

Identifizieren und beseitigen Sie häufige Anti-Patterns rigoros während des [Peer-Review-Prozesses](../workflows-teams/git-based-workflows.md). Verwenden Sie automatisierte Prose-Linter wie Vale sowie manuelle Reviews, um sicherzustellen, dass Inhalte hochwertig, barrierefrei und konsistent bleiben.

## Implementierung

### 1. Nicht-beschreibende Hyperlinks

Vermeiden Sie generische Texte wie "hier klicken" oder "weiterlesen" für Links. Das schadet SEO und macht Dokumentation für Screenreader-Benutzer unzugänglich, die zwischen Links navigieren.

*   **❌ Schlecht**: Um Ihren Server zu konfigurieren, [klicken Sie hier](../../configuration/overview.md).
*   **✅ Gut**: Überprüfen Sie die [Allgemeine Konfiguration](../../configuration/overview.md), um Ihren Produktionsserver einzurichten.

### 2. Die "Wall of Boilerplate"

In Code-Beispielen lenken Dutzende Zeilen von Standard-Imports und Boilerplate den Leser von der Kernlogik ab.

*   **Lösung**: Konzentrieren Sie sich auf das relevante Code-Snippet. Ist Boilerplate notwendig, verwenden Sie Kommentare, um Auslassungen zu kennzeichnen, oder nutzen Sie [Callouts](../../content/containers/callouts.md), um das erforderliche Setup zu erklären.

### 3. FAQs als "Abladeplatz" verwenden

"Frequently Asked Questions" (FAQ)-Seiten werden oft zum Ablageort für Informationen, die nicht in die Hauptleitfäden integriert wurden. Wird eine Frage tatsächlich "häufig gestellt", deutet das darauf hin, dass Ihre Kern-Dokumentation das Konzept nicht effektiv erklärt hat.

*   **Lösung**: Statt eine FAQ zu erweitern, refaktorieren Sie das relevante Tutorial oder den konzeptionellen Leitfaden, um die Verwirrung dort zu adressieren, wo der Benutzer ihr zum ersten Mal begegnet. Verwenden Sie einen [Important Callout](../../content/containers/callouts.md), falls die Information kritisch ist.

## Abwägungen

FAQs zu eliminieren erfordert, dass Autoren bestehende Dokumentations-Hierarchien ständig refaktorieren und verbessern. Auch wenn dies initialen Wartungs-Overhead mit sich bringt, führt es zu einer deutlich kohärenteren, professionelleren und nützlicheren Dokumentations-Site.