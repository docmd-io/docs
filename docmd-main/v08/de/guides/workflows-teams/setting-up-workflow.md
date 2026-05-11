---
title: "Workflow einrichten"
description: "So etablieren Sie einen hocheffizienten Dokumentations-Workflow für mehrere Autoren unter Verwendung von docmd und Docs-as-Code-Prinzipien."
---

## Problem

Wenn Teams kein strukturiertes Dokumentations-Workflow haben, werden Aktualisierungen oft verzögert, vergessen oder nur über Ad-hoc-Nachrichten geteilt. Ohne einen klaren Prozess werden Inhalte fragmentiert, die Formatierung wird inkonsistent und technische Redakteure verbringen mehr Zeit damit, Merge-Konflikte zu lösen, als hochwertige Inhalte zu schreiben.

## Warum es wichtig ist

Ohne einen formalen Prozess veraltet die Dokumentation schnell und verliert ihren Wert. Wenn die Aktualisierung der Dokumentation das Warten auf einen langsamen Software-Release-Zyklus erfordert, bleiben Ihre Anleitungen permanent asynchron zu den tatsächlichen Produktfunktionen, was zu Frustration bei den Benutzern und einem erhöhten Supportaufkommen führt.

## Ansatz

Entkoppeln Sie das Deployment der Dokumentation von den Software-Release-Zyklen und übernehmen Sie gleichzeitig dieselben robusten Prozesse, die in der Softwareentwicklung verwendet werden (Branches → Pull Requests → CI/CD-Previews). Die Leichtigkeit von `docmd` ermöglicht es Teams, "Documentation as Code" mit minimalem Overhead zu praktizieren und sicherzustellen, dass Ihre Anleitungen so zuverlässig und aktuell sind wie Ihre Software.

## Implementierung

### 1. Repository-Strategie

Wählen Sie die Strategie, die am besten zu Ihrer Organisationsstruktur passt:
*   **Monorepo-Strategie**: Behalten Sie einen `/docs`-Ordner innerhalb Ihres Haupt-Anwendungs-Repositorys. Dies ist ideal, um sicherzustellen, dass Dokumentationsänderungen im selben Pull Request wie der beschriebene Code gemergt werden, was eine perfekte Synchronisation gewährleistet.
*   **Separate Repository-Strategie**: Am besten geeignet für große Organisationen oder Open-Source-Projekte, bei denen ein dediziertes Team die Dokumentation unabhängig von der Build-Pipeline der Hauptanwendung verwaltet.

### 2. Validierung mit CI/CD

Integrieren Sie `docmd` in Ihre CI/CD-Pipeline, um sicherzustellen, dass jedes Update technisch einwandfrei ist. Ihre Pipeline sollte mindestens den Build-Befehl ausführen, um auf Syntaxfehler und Konfigurationsprobleme zu prüfen.

```bash
# Beispiel für einen Validierungsschritt in GitHub Actions
- name: Dokumentation validieren
  run: npm install && npx @docmd/core build
```
Detaillierte Setup-Anweisungen finden Sie im [GitHub Actions Leitfaden](../../guides/integrations/github-actions-cicd).

### 3. Kollaborativer Review-Prozess

Etablieren Sie eine Kultur des Peer-Reviews für alle Dokumentations-Updates. Nutzen Sie Pull Requests, um Änderungen zu diskutieren, die Formatierung zu überprüfen und die technische Genauigkeit sicherzustellen. Sie können das [Threads-Plugin](../../plugins/usage) nutzen, um detaillierte Diskussionen direkt am gerenderten Inhalt zu führen.

## Abwägungen

Die Einführung eines "Docs-as-Code"-Workflows kann eine Hürde für nicht-technische Mitarbeiter (z. B. Produktmanager oder Rechtsabteilung) darstellen, die Git und Markdown möglicherweise einschüchternd finden. Um dies abzumildern, sollten Sie den integrierten Web-Editor von GitHub für kleinere Korrekturen in Betracht ziehen oder die [Live-Preview](../../content/live-preview)-Funktion nutzen, um ein visuelles und intuitiveres Authoring-Erlebnis zu bieten.
