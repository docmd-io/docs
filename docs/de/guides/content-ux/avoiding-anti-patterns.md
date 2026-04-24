---
title: "Anti-Patterns vermeiden"
description: "So identifizieren und eliminieren Sie häufige Dokumentationsfehler, welche die User Experience verschlechtern und \"Content Debt\" erhöhen."
---

## Problem

Im Laufe der Zeit sammeln sich in Dokumentations-Repositories oft "Quick Fixes" für Content-Probleme an, welche die User Experience ungewollt verschlechtern. Diese Anti-Patterns – wie vage Linktexte oder überladene Codebeispiele – verfestigen sich im Projekt, was die Dokumentation schwerer wartbar und für Entwickler weniger nützlich macht.

## Warum es wichtig ist

Anti-Patterns tragen zur "Content Debt" (Inhaltsschulden) bei. Sie verschlechtern das Ranking in Suchmaschinen (SEO), verringern die Barrierefreiheit für Menschen mit Behinderungen und erhöhen die kognitive Belastung für Leser erheblich, die lediglich eine schnelle Lösung für ein technisches Problem suchen. Eine qualitativ hochwertige Dokumentation erfordert ständige Wachsamkeit, um sie sauber, prägnant und professionell zu halten.

## Ansatz

Identifizieren und eliminieren Sie gängige Anti-Patterns konsequent während des [Peer-Review-Prozesses](../workflows-teams/git-based-workflows). Nutzen Sie automatisierte Prose-Linter wie Vale sowie manuelle Reviews, um sicherzustellen, dass Ihre Inhalte auf allen Seiten hochwertig, zugänglich und konsistent bleiben.

## Implementierung

### 1. Nicht-descriptive Hyperlinks

Vermeiden Sie generische Texte wie "hier klicken" oder "mehr lesen" für Links. Dies schadet der SEO und macht die Dokumentation unzugänglich für Nutzer von Screenreadern, die oft navigieren, indem sie von Link zu Link springen.

*   **❌ Schlecht**: Um Ihren Server zu konfigurieren, [klicken Sie hier](../../configuration/general).
*   **✅ Gut**: Lesen Sie die [globale Konfiguration](../../configuration/general), um Ihren Produktionsserver einzurichten.

### 2. Die "Wand aus Boilerplate"

Das Einfügen dutzender Zeilen von Standard-Imports und Boilerplate-Konfiguration vor der eigentlichen Logik in Codebeispielen lenkt den Leser vom eigentlichen Punkt des Beispiels ab.

*   **Lösung**: Konzentrieren Sie sich auf das relevante Code-Snippet. Wenn Boilerplate für den Kontext notwendig ist, verwenden Sie Kommentare, um darauf hinzuweisen, dass Standard-Imports aus Gründen der Kürze weggelassen wurden, oder nutzen Sie [Callouts](../../content/containers/callouts), um das erforderliche Setup zu erläutern.

### 3. FAQs als "Müllhalde" nutzen

"Häufig gestellte Fragen" (FAQ) werden oft zu einem Sammelbecken für Informationen, die zu schwierig in die Hauptanleitungen zu integrieren waren. Wenn eine Frage tatsächlich "häufig gestellt" wird, ist dies ein klares Zeichen dafür, dass Ihre Kerndokumentation dieses Konzept nicht effektiv erklärt hat.

*   **Lösung**: Anstatt die FAQ zu erweitern, sollten Sie das entsprechende Tutorial oder die konzeptionelle Anleitung überarbeiten, um die Unklarheit direkt dort zu beseitigen, wo der Benutzer sie zuerst bemerkt. Verwenden Sie einen [wichtigen Callout](../../content/containers/callouts), wenn die Information kritisch für den Erfolg ist.

## Abwägungen

Das Eliminieren von FAQs erfordert von den Autoren, bestehende Dokumentationshierarchien ständig zu überarbeiten und zu verbessern, sobald neue Support-Themen auftauchen. Dies verursacht zwar mehr initialen Wartungsaufwand als das einfache Hinzufügen eines Stichpunkts zu einer FAQ-Liste, führt aber zu einer deutlich konsistenteren, professionelleren und nützlicheren Dokumentationsseite für Ihre Benutzer.
