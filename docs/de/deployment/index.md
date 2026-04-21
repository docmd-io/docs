---
title: "Bereitstellung (Deployment)"
description: "Hosten Sie Ihre docmd-Dokumentation auf Plattformen wie GitHub Pages, Vercel, Netlify und Cloudflare Pages."
---

Da `docmd` eine hochperformante statische Website generiert, kann sie in jeder Umgebung gehostet werden, die HTML ausliefert. Führen Sie einfach den Basis-Build-Befehl aus, um das `site/`-Verzeichnis zu erstellen:

```bash
docmd build
```

## Automatisierte Bereitstellungskonfigurationen

::: callout warning "Versionsvorgabe"
Der Befehl `docmd deploy` wurde mit **v0.7.2** eingeführt.
:::

Während `docmd build` Ihnen die reinen Dateien liefert, erfordert die eigentliche Bereitstellung auf einem selbst gehosteten Server oder in einem Container normalerweise das Schreiben mühsamer Konfigurationsdateien. `docmd` löst dies drastisch, indem es automatisch produktionsreife Umgebungen für Sie vorbereitet.

Führen Sie den nativen Kernbefehl in Ihrem Terminal aus, um ein Konfigurationsprofil zu erstellen:

```bash
docmd deploy [target]
```

### Unterstützte Offline-Ziele
Aktuell unterstützen wir die Generierung von Konfigurationsdateien für die folgenden gängigen Offline- und selbst gehosteten Umgebungen:

*   [`docmd deploy --docker`](./docker) - Generiert ein optimiertes, mehrstufiges (multi-stage) `Dockerfile` und eine `.dockerignore`.
*   [`docmd deploy --nginx`](./nginx) - Generiert eine `nginx.conf` mit Sicherheits-Headern, GZIP und Caching-Richtlinien.
*   [`docmd deploy --caddy`](./caddy) - Generiert ein `Caddyfile` für automatisiertes Routing.

Verwenden Sie das `--force`-Flag, falls Sie bestehende Bereitstellungsdateien überschreiben müssen:

```bash
docmd deploy --docker --force
```

Bitte klicken Sie auf das jeweilige oben genannte Ziel für eine detaillierte, service-spezifische Dokumentation.

*(Hinweis: Cloud-API-Bereitstellungsbefehle wie `--vercel` und `--netlify` befinden sich derzeit für Phase 2 in der Entwicklung).*

## Cloud-Hosting & CI/CD
Wenn Sie Ihre eigenen Server (Docker, Nginx) nicht selbst verwalten möchten, können Sie Ihren `site/`-Ordner direkt auf Cloud-Plattformen wie GitHub Pages, Vercel, Netlify oder Cloudflare bereitstellen.

Detaillierte Anweisungen zur Konfiguration automatisierter GitHub Actions oder zum Importieren in Cloud-Dashboards finden Sie in unserem [CI/CD-Bereitstellungsleitfaden](./ci-cd).

## Erwägungen zum SPA-Routing

`docmd` implementiert einen Mikro-SPA-Router, der die interne Navigation reibungslos handhabt. Im Gegensatz zu React-basierten SPAs wird jede Seite in `docmd` als eigene `index.html`-Datei im Dateisystem generiert. Das bedeutet:

- **Keine Rewrite-Regeln**: Sie müssen auf Ihrem Server für die meisten Plattformen keine `index.html`-Rewrites konfigurieren.
- **Deep Linking**: Der direkte Zugriff auf URLs wie `/guide/setup` funktioniert sofort, da der Server die Datei `/guide/setup/index.html` findet.

## Produktions-Checkliste

1.  **Website-URL**: Stellen Sie sicher, dass die Eigenschaft `url` in Ihrer `docmd.config.js` gesetzt ist. Dies ist entscheidend für die Generierung korrekter kanonischer Tags, Sitemaps und Social-Preview-Bilder.
2.  **Weiterleitungen**: Wenn Sie von einem anderen Tool migrieren, nutzen Sie die `redirects`-Konfiguration, um Ihre SEO-Rankings zu erhalten.
3.  **Analytics**: Aktivieren Sie das `analytics`-Plugin, um das Benutzerengagement und Suchanfragen zu verfolgen.
4.  **KI-Eingang**: Aktivieren Sie das `llms`-Plugin, um die `llms.txt` zu generieren. Dies ermöglicht es KI-Agenten, Ihre Dokumentation effizienter einzulesen und Ihren Benutzern bessere Antworten zu geben.

::: callout tip "Benutzerdefinierte 404-Seiten"
`docmd` generiert automatisch eine `404.html` in Ihrem Ausgabe-Verzeichnis. Die meisten Hosting-Anbieter (GitHub Pages, Netlify, Vercel) verwenden diese Datei automatisch, wenn ein Benutzer eine fehlende Route aufruft.
:::