---
title: "Deployment-Methode wählen"
description: "Ein praktischer Leitfaden zur Auswahl zwischen GitHub App, GitHub Action, Starter-Vorlage und Deployer-Paket – mit Entscheidungsmatrix und realen Szenarien."
---

# Deployment-Methode wählen

docmd bietet vier Wege, Ihre Dokumentation live zu schalten. Alle produzieren dasselbe Ergebnis — eine statische Website, die auf GitHub Pages oder einem Hosting-Anbieter Ihrer Wahl bereitgestellt wird — unterscheiden sich jedoch im gewünschten Kontrollgrad und Ausgangspunkt.

## Schnelle Entscheidungsmatrix

| | [GitHub App](../../integrations/github-app.md) | [Starter-Vorlage](../../integrations/starter-template.md) | [GitHub Action](../../integrations/github-action.md) | [Deployer-Paket](../../deployment/deployer-package.md) |
|---|---|---|---|---|
| **Ausgangspunkt** | Bestehendes Repo | Neues Repo | Beliebig | Beliebig |
| **Einrichtungsaufwand** | Ein Klick | Zwei Schritte | YAML schreiben | Befehl ausführen |
| **Workflow-Datei** | Auto-generiert | Enthalten | Selbst schreiben | Auto-generiert |
| **Anpassbarkeit** | Nach Generierung | Von Anfang an | Vollständig | Vollständig |
| **Hosting-Ziel** | GitHub Pages | GitHub Pages | GitHub Pages | Beliebiger Anbieter |
| **Monorepo-Support** | ✓ Auto-erkannt | — | Manuell `--cwd` | ✓ |
| **Kein GitHub-Hosting** | ✗ | ✗ | Anpassbar | ✓ Docker, Nginx, Vercel, Netlify… |

## Szenario-Leitfaden

### „Ich möchte in unter zwei Minuten live gehen, ohne Konfiguration"

Verwenden Sie die **[GitHub App](../../integrations/github-app.md)**. Installieren, Repository auswählen, fertig. Sie erkennt Ihre Konfiguration, generiert den Workflow, aktiviert GitHub Pages und stellt bereit — ohne dass Sie eine einzige Datei anfassen.

::: button "GitHub App installieren" external:https://github.com/apps/docmd/installations/new icon:github color:#2ea44f

---

### „Ich starte eine brandneue Dokumentationswebsite"

Verwenden Sie die **[Starter-Vorlage](../../integrations/starter-template.md)**. Klicken Sie auf „Vorlage verwenden", aktualisieren Sie `docmd.config.json` mit Titel und URL, aktivieren Sie GitHub Pages einmalig und pushen. Alles ist bereits vorkonfiguriert.

::: button "Starter-Vorlage verwenden" external:https://github.com/docmd-io/docmd-template/generate icon:github

---

### „Ich habe eine bestehende CI/CD-Pipeline und möchte Docs hinzufügen"

Verwenden Sie die **[GitHub Action](../../integrations/github-action.md)**. Fügen Sie `docmd-io/deploy@v1` in Ihren bestehenden Workflow ein. Sie lässt sich sauber mit anderen Schritten kombinieren — Tests ausführen, App bauen, dann Docs bauen, alles in einem Job.

---

### „Ich deploye auf Vercel, Netlify, Docker oder meinen eigenen Server"

Verwenden Sie das **[Deployer-Paket](../../deployment/deployer-package.md)**. Führen Sie `npx @docmd/core deploy --vercel` (oder `--netlify`, `--docker`, `--nginx`) aus, um anbieterspezifische Konfigurationsdateien zu generieren, die auf Ihre `docmd.config.json` zugeschnitten sind.

---

### „Ich bin in einem Monorepo mit Docs in einem Unterverzeichnis"

Sowohl die **GitHub App** als auch das **Deployer-Paket** behandeln dies automatisch. Die App erkennt Konfigurationen im gesamten Repository-Baum und injiziert das korrekte `--cwd`-Flag.

Bei Verwendung der GitHub Action übergeben Sie `--cwd` manuell:

```yaml
- run: npx @docmd/core build --cwd packages/docs
```

---

### „Ich möchte Docs bei jedem Pull Request in der Vorschau sehen"

Kombinieren Sie die **GitHub Action** mit einem PR-Vorschau-Dienst (z. B. Cloudflare Pages Preview Deployments oder einer selbst gehosteten Vorschauumgebung). Siehe [Änderungen in der Vorschau anzeigen](../workflows-teams/previewing-changes.md) für eine vollständige Anleitung.

---

## Wie die Methoden zusammenwirken

Diese Methoden schließen sich nicht gegenseitig aus. Ein typischer Entwicklungspfad sieht so aus:

```
Mit der GitHub App beginnen (schnellster Weg zu Live)
  ↓
Die generierte Workflow-Datei nach Bedarf anpassen
  ↓
Deployer-Paket hinzufügen für Nginx/Docker-Konfigurationen
  ↓
Action in eine umfassendere CI/CD-Pipeline integrieren
```

## Weiterführende Links

- [GitHub Action Referenz](../../integrations/github-action.md)
- [GitHub App Referenz](../../integrations/github-app.md)
- [Starter-Vorlage Referenz](../../integrations/starter-template.md)
- [Deployer-Paket Referenz](../../deployment/deployer-package.md)
- [GitHub Actions CI/CD Leitfaden](./github-actions-cicd.md)
- [Änderungen in der Vorschau anzeigen](../workflows-teams/previewing-changes.md)