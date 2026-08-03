---
title: "Wahl der Deployment-Methode"
description: "Ein praktischer Leitfaden zur Wahl zwischen docmd GitHub App, GitHub Action, Starter-Template und Deployer-Paket — mit Entscheidungsmatrix und realen Szenarien."
---

# Wahl Ihrer Deployment-Methode

docmd bietet vier Wege, Ihre Dokumentation live zu schalten. Sie alle erzeugen dieselbe Ausgabe — eine statische Site, bereitgestellt auf GitHub Pages oder einem Hosting-Provider Ihrer Wahl — unterscheiden sich aber darin, wie viel Kontrolle Sie wünschen und wo Sie starten.

## Schnelle Entscheidungsmatrix

| | [GitHub App](../../integrations/github-app.md) | [Starter-Template](../../integrations/starter-template.md) | [GitHub Action](../../integrations/github-action.md) | [Deployer-Paket](../../deployment/deployer-package.md) |
|---|---|---|---|---|
| **Ausgangspunkt** | Bestehendes Repo | Neues Repo | Beliebig | Beliebig |
| **Setup-Aufwand** | Ein Klick | Zwei Klicks | YAML schreiben | Befehl ausführen |
| **Workflow-Datei** | Automatisch generiert | Enthalten | Sie schreiben sie | Automatisch generiert |
| **Anpassbar** | Nach Generierung | Von Anfang an | Vollständig | Vollständig |
| **Hosting-Ziel** | GitHub Pages | GitHub Pages | GitHub Pages | Beliebiger Provider |
| **Monorepo-Unterstützung** | ✓ Automatisch erkannt | — | Manuell `--cwd` | ✓ |
| **Non-GitHub-Hosting** | ✗ | ✗ | Anpassbar | ✓ Docker, Nginx, Vercel, Netlify… |

## Szenario-Leitfaden

### "Ich will Docs in unter zwei Minuten live, ohne Setup"

Verwenden Sie die **[GitHub App](../../integrations/github-app.md)**. Installieren, Repository wählen, fertig. Sie erkennt Ihre Konfiguration, generiert den Workflow, aktiviert GitHub Pages und stellt bereit — ohne dass Sie eine einzige Datei anfassen.

::: button "GitHub App installieren" external:https://github.com/apps/docmd/installations/new icon:github color:#2ea44f

### "Ich starte eine brandneue Dokumentations-Site"

Verwenden Sie das **[Starter-Template](../../integrations/starter-template.md)**. Klicken Sie auf GitHub auf "Use this template", aktualisieren Sie `docmd.config.json` mit Ihrem Titel und Ihrer URL, aktivieren Sie GitHub Pages einmalig und pushen Sie. Alles ist vorverkabelt.

::: button "Starter-Template verwenden" external:https://github.com/docmd-io/docmd-template/generate icon:github

### "Ich habe eine bestehende CI/CD-Pipeline und möchte Docs hinzufügen"

Verwenden Sie die **[GitHub Action](../../integrations/github-action.md)**. Fügen Sie `docmd-io/deploy@v1` in Ihren bestehenden Workflow ein. Sie komponiert sich sauber mit anderen Schritten — Tests laufen lassen, Ihre App bauen, dann Docs bauen, alles in einem Job.

### "Ich deploye zu Vercel, Netlify, Docker oder meinem eigenen Server"

Verwenden Sie das **[Deployer-Paket](../../deployment/deployer-package.md)**. Führen Sie `npx @docmd/core deploy --vercel` (oder `--netlify`, `--docker`, `--nginx`) aus, um anbieterspezifische Konfigurationsdateien zu generieren, die auf Ihre `docmd.config.json` zugeschnitten sind.

### "Ich bin in einem Monorepo mit Docs in einem Unterverzeichnis"

Sowohl die **GitHub App** als auch das **Deployer-Paket** handhaben dies automatisch. Die App erkennt Konfigurationen überall im Repository-Baum und fügt das korrekte `--cwd`-Flag ein. Das Deployer-Paket liest Ihre Konfiguration aus dem aktuellen Arbeitsverzeichnis.

Bevorzugen Sie die GitHub Action, übergeben Sie `--cwd` manuell:

```yaml
- run: npx @docmd/core build --cwd packages/docs
```

### "Ich möchte Docs bei jedem Pull Request in der Vorschau sehen"

Verwenden Sie die **GitHub Action** in Kombination mit einem PR-Preview-Service (z. B. Cloudflare Pages Preview-Deployments oder einer selbstgehosteten Preview-Umgebung). Eine vollständige Anleitung finden Sie unter [Änderungen in der Vorschau anzeigen](../workflows-teams/previewing-changes.md).

## Wie sie zusammenpassen

Diese Methoden schließen sich nicht gegenseitig aus. Eine häufige Entwicklung sieht so aus:

```
Start mit der GitHub App (schnellster Weg ins Live)
  ↓
Generierte Workflow-Datei anpassen, wenn die Anforderungen wachsen
  ↓
Deployer-Paket hinzufügen, um Nginx/Docker-Konfigurationen für Self-Hosting zu generieren
  ↓
Action in eine umfassendere CI/CD-Pipeline integrieren
```

Sie können sie auch mischen: Verwenden Sie das Starter-Template für ein neues Projekt und fügen Sie später das Deployer-Paket hinzu, um ein Docker-Image für Ihre Staging-Umgebung zu generieren.

## Build-Trigger im Vergleich

| Methode | Triggert bei Push | Manueller Trigger | PR-Vorschau |
|---|---|---|---|
| GitHub App | ✓ (automatisch konfiguriert) | ✓ `workflow_dispatch` | Erfordert Extra-Schritt |
| Starter-Template | ✓ `main` / `master` | ✓ `workflow_dispatch` | Erfordert Extra-Schritt |
| GitHub Action | Sie konfigurieren | Sie konfigurieren | Sie konfigurieren |
| Deployer-Paket | Generiert die Datei; Trigger hängen von Ihrem Workflow ab | — | — |

## Weiterführende Lektüre

- [GitHub-Action-Referenz](../../integrations/github-action.md)
- [GitHub-App-Referenz](../../integrations/github-app.md)
- [Starter-Template-Referenz](../../integrations/starter-template.md)
- [Deployer-Paket-Referenz](../../deployment/deployer-package.md)
- [GitHub-Actions-CI/CD-Leitfaden](./github-actions-cicd.md)
- [Änderungen in der Vorschau anzeigen](../workflows-teams/previewing-changes.md)