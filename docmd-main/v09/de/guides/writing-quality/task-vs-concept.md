---
title: "Aufgabe vs. Konzept"
description: "Wie Sie das Diátaxis-Framework anwenden, um 'How-To'-Leitfäden von konzeptionellen Erklärungen zu trennen und so eine effektivere Dokumentations-Struktur zu schaffen."
---

## Problem

Ein häufiger Fehler beim technischen Schreiben ist es, das *Warum* etwas funktioniert mit dem *Wie* es zu tun ist zu vermischen. Ein Tutorial zu "SSO konfigurieren" kann sich beispielsweise in Seiten verlieren, die die Geschichte des SAML-Protokolls erklären. Das lenkt den Benutzer von seinem unmittelbaren Ziel ab, das Feature zum Laufen zu bringen.

## Warum es wichtig ist

Die Benutzerabsicht variiert erheblich. Ein Ingenieur, der um 2 Uhr nachts ein Produktionsproblem behebt, braucht spezifische, umsetzbare Schritte — keine Architektur-Philosophie. Umgekehrt muss ein technischer Leiter, der Ihre Plattform evaluiert, die zugrunde liegende Logik verstehen, bevor er sich committen kann. Diese Anliegen zu trennen stellt sicher, dass beide Personas die Informationen finden, die sie benötigen, ohne unnötige Reibung.

## Ansatz

Übernehmen Sie das **Diátaxis-Framework**, das Dokumentation in vier Quadranten kategorisiert: Tutorials, How-To-Leitfäden, Erklärungen (Konzepte) und technische Referenz. Für diesen Leitfaden konzentrieren wir uns auf die kritische Trennung zwischen **aufgaben-orientierten Inhalten** (umsetzbare Schritte) und **konzept-orientierten Inhalten** (tieferes Verständnis).

## Implementierung

### 1. Der aufgaben-orientierte Leitfaden (How-To)

Konzentrieren Sie sich vollständig auf ein spezifisches, enges Ziel. Streifen Sie ausführliche theoretische Erklärungen und konzentrieren Sie sich auf die minimal erforderlichen Schritte zur Erreichung des Ziels. Verwenden Sie den [Steps-Container](../../content/containers/steps.md), um einen klaren, eindeutigen Pfad nach vorn zu bieten.

*   **Titel-Beispiel**: "So konfigurieren Sie Webhooks"
*   **Struktur**: 
    *   Voraussetzungen
    *   Direkte, umsetzbare Anweisungen
    *   Verifikations-Schritte (wie Sie wissen, dass es funktioniert hat)

### 2. Der konzept-orientierte Leitfaden (Erklärung)

Konzentrieren Sie sich auf das "Big Picture", einschließlich Architektur, Design-Philosophie und das "Warum" hinter spezifischen Entscheidungen. Vermeiden Sie direkte Anweisungen oder Befehle in diesen Abschnitten.

*   **Titel-Beispiel**: "Webhook-Delivery-Architektur verstehen"
*   **Struktur**:
    *   Hochrangige Architektur-Diagramme
    *   Retry-Logik und Zuverlässigkeits-Philosophie
    *   Sicherheits-Überlegungen

### 3. Effektives Cross-Referencing

Statt die beiden Inhaltstypen zu verschmelzen, nutzen Sie docmds Linking-Tools, um eine Brücke für Benutzer zu bieten, die mehr Kontext benötigen oder bereit sind zu implementieren.

*   **In einem How-To-Leitfaden**: "Für eine tiefere Erkundung unserer Retry-Logik siehe [Webhook-Architektur](../../guides/performance-delivery/caching-strategies.md)."
*   **In einem konzeptionellen Leitfaden**: "Bereit loszulegen? Folgen Sie unserem [Webhook-Konfigurations-Leitfaden](../../guides/integrations/alongside-other-tools.md)."

## Abwägungen

Aufgaben und Konzepte zu trennen erhöht die Anzahl der Seiten in Ihrer Navigation und erfordert rigoroses Cross-Linking. Diese modulare Struktur verbessert jedoch signifikant die langfristige Wartbarkeit, Auffindbarkeit und allgemeine Professionalität Ihrer Dokumentations-Suite.