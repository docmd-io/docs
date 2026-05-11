---
title: "Aufgabe vs. Konzept"
description: "So wenden Sie das Diátaxis-Framework an, um \"How-To\"-Anleitungen von konzeptionellen Erklärungen zu trennen und eine effektivere Dokumentationsstruktur aufzubauen."
---

## Problem

Ein häufiger Fehler beim technischen Schreiben ist die Vermischung der Frage, *warum* etwas funktioniert, mit der Frage, *wie* man es tatsächlich umsetzt. Ein Tutorial zur "Konfiguration von SSO" kann beispielsweise leicht durch seitenlange Erklärungen zur Geschichte des SAML-Protokolls überladen werden, was den Benutzer von seinem unmittelbaren Ziel ablenkt, die Funktion zum Laufen zu bringen.

## Warum es wichtig ist

Die Absicht des Benutzers variiert je nach aktuellem Kontext erheblich. Ein Entwickler, der nachts um 2 Uhr ein Problem in der Produktion beheben muss, sucht nach konkreten, umsetzbaren Schritten und nicht nach Architekturphilosophie. Umgekehrt muss ein technischer Leiter, der Ihre Plattform evaluiert, die zugrunde liegende Logik verstehen, bevor er sich auf eine Implementierung festlegt. Die Trennung dieser Aspekte stellt sicher, dass beide Personas die benötigten Informationen ohne unnötige Reibung finden.

## Ansatz

Nutzen Sie das **Diátaxis-Framework**, das Dokumentation in vier Quadranten unterteilt: Tutorials, How-To-Anleitungen, Erklärungen (Konzepte) und technische Referenz. In diesem Leitfaden konzentrieren wir uns auf die kritische Trennung zwischen **aufgabenorientierten Inhalten** (umsetzbare Schritte) und **konzeptorientierten Inhalten** (tieferes Verständnis).

## Implementierung

### 1. Die aufgabenorientierte Anleitung (How-To)

Konzentrieren Sie sich ganz auf ein spezifisches, eng gefasstes Ziel. Verzichten Sie auf langatmige theoretische Erklärungen und fokussieren Sie sich auf die minimalen Schritte, die zum Erreichen des Ziels erforderlich sind. Verwenden Sie den [Steps-Container](../../content/containers/steps), um einen klaren, unmissverständlichen Pfad aufzuzeigen.

*   **Titel-Beispiel**: "So konfigurieren Sie Webhooks"
*   **Struktur**: 
    *   Voraussetzungen
    *   Direkte, umsetzbare Anweisungen
    *   Verifizierungsschritte (Woran erkenne ich, dass es funktioniert hat?)

### 2. Die konzeptorientierte Anleitung (Erklärung)

Konzentrieren Sie sich auf das "Big Picture", einschließlich Architektur, Designphilosophie und dem "Warum" hinter bestimmten Entscheidungen. Vermeiden Sie es, in diesen Abschnitten direkte Anweisungen oder Befehle zu geben.

*   **Titel-Beispiel**: "Die Webhook-Delivery-Architektur verstehen"
*   **Struktur**:
    *   High-Level Architektur-Diagramme
    *   Retry-Logik und Reliability-Philosophie
    *   Sicherheitsaspekte

### 3. Effektive Querverweise

Anstatt beide Inhaltsarten zu vermischen, nutzen Sie die Verlinkungs-Tools von `docmd`, um eine Brücke für Benutzer zu schlagen, die mehr Kontext benötigen oder bereit für die Implementierung sind.

*   **In einer How-To-Anleitung**: "Für tiefere Einblicke in unsere Retry-Logik lesen Sie [Webhook-Architektur](../../guides/performance-delivery/caching-strategies)."
*   **In einer konzeptionellen Anleitung**: "Bereit für den Start? Folgen Sie unserer [Anleitung zur Webhook-Konfiguration](../../guides/integrations/alongside-other-tools)."

## Abwägungen

Die Trennung von Aufgaben und Konzepten erhöht die Anzahl der Seiten in Ihrer Navigation und erfordert eine konsequentere Verlinkung. Diese modulare Struktur verbessert jedoch die langfristige Wartbarkeit, Durchsuchbarkeit und die allgemeine Professionalität Ihrer Dokumentation erheblich.
