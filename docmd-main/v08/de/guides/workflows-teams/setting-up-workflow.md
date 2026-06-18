---
title: "Einen Workflow einrichten"
description: "Wie Sie mit docmd und Docs-as-Code-Prinzipien einen hochgeschwindigen Workflow für mehrere Autoren etablieren."
---

## Problem

Wenn Teams keinen strukturierten Workflow haben, werden Updates verzögert oder vergessen. Ohne klaren Prozess werden Inhalte fragmentiert und Formatierung inkonsistent. Technische Autoren verbringen mehr Zeit mit Merge-Konflikten als mit dem Schreiben hochwertiger Inhalte.

## Warum es wichtig ist

Ohne formalen Prozess veraltet Dokumentation schnell. Wenn das Aktualisieren der Dokumentation das Warten auf einen langsamen Software-Release-Zyklus erfordert, bleiben Leitfäden asynchron zu den Produkt-Features. Das führt zu Benutzer-Frustration und erhöhtem Support-Aufkommen.

## Ansatz

Entkoppeln Sie Dokumentations-Deployments von Software-Release-Zyklen. Übernehmen Sie dieselben zuverlässigen Prozesse, die auch in der Software-Entwicklung genutzt werden (Branches → Pull Requests → CI/CD Previews). Die leichtgewichtige Natur von docmd erlaubt es Teams, "Dokumentation als Code" mit minimalem Overhead zu behandeln.

## Implementierung

### 1. Repository-Strategie

Wählen Sie die Strategie, die am besten zu Ihrer Organisationsstruktur passt:
*   **Monorepo-Strategie**: Behalten Sie einen `/docs`-Ordner in Ihrem Hauptanwendungs-Repository. Das stellt sicher, dass Dokumentations-Änderungen im selben Pull Request gemergt werden wie der Code, den sie beschreiben.
*   **Separate-Repository-Strategie**: Am besten für große Organisationen oder Open-Source-Projekte, in denen ein dediziertes Team die Dokumentation unabhängig verwaltet.

### 2. Validierung mit CI/CD

Integrieren Sie docmd in Ihre CI/CD-Pipeline, um sicherzustellen, dass jedes Update technisch einwandfrei ist. Ihre Pipeline sollte mindestens den Build-Befehl ausführen, um Syntax-Fehler und Konfigurations-Probleme zu prüfen.

```bash
# Beispiel-Validierungsschritt in GitHub Actions
- name: Validate Documentation
  run: npm install && npx @docmd/core build
```
Detaillierte Setup-Anweisungen finden Sie im [GitHub-Actions-Leitfaden](../../guides/integrations/github-actions-cicd.md).

### 3. Kollaborativer Review-Prozess

Etablieren Sie eine Kultur der Peer-Reviews für alle Dokumentations-Updates. Verwenden Sie Pull Requests, um Änderungen zu diskutieren, die Formatierung zu verifizieren und die technische Genauigkeit sicherzustellen. Verwenden Sie das [Threads-Plugin](../../plugins/threads.md), um Diskussionen direkt am gerenderten Inhalt zu ermöglichen.

## Abwägungen

Einen "Docs-as-Code"-Workflow zu übernehmen kann für nicht-technische Mitwirkende eine Hürde darstellen, da ihnen Git und Markdown möglicherweise einschüchternd erscheinen. Um dem zu begegnen, erwägen Sie die Verwendung des integrierten Web-Editors von GitHub für kleinere Korrekturen. Alternativ bietet das [Live-Vorschau](../../content/live-preview.md)-Feature eine visuelle und intuitive Authoring-Erfahrung.