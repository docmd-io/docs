---
title: "CDN- & Edge-Deployment"
description: "Wie Sie die globale Latenz minimieren, indem Sie Ihre statische Dokumentation auf einem Content Delivery Network (CDN) oder Edge Network bereitstellen."
---

## Problem

Dokumentation auf einem einzelnen Server in einer geografischen Region (z. B. US-East) zu hosten erzeugt für Benutzer an anderen Standorten erhebliche Netzwerklatenz. Jeder Seitenaufruf, jedes Bild und jedes Skript legt Tausende von Kilometern zurück. Das lässt Ihre Dokumentation für ein globales Publikum träge wirken.

## Warum es wichtig ist

Hohe Latenz beeinträchtigt die Developer Experience direkt. Selbst wenn Ihre Dokumentation gut geschrieben und leichtgewichtig ist, ist die "Time to First Byte" (TTFB) physikalisch begrenzt. Wenn Ihre Site langsam wirkt, verlieren Entwickler den Fokus oder greifen stattdessen zu schnelleren Alternativen.

## Ansatz

Die optimale Lösung ist die Bereitstellung Ihrer Site auf einem Edge-CDN. docmd generiert rein statische Assets (HTML, CSS, JS), was sie perfekt für Edge-Distribution geeignet macht. CDNs replizieren Dateien über global verteilte "Edge-Nodes", um Benutzer aus dem nächstgelegenen Rechenzentrum zu bedienen.

## Implementierung

### 1. Plattform wählen

docmd unterstützt nativ alle modernen Static-Hosting- und Edge-Plattformen. Wir empfehlen die folgenden aufgrund ihrer globalen Performance und Benutzerfreundlichkeit:
*   **Cloudflare Pages**: Extrem schnelles globales Edge-Network mit integriertem DDoS-Schutz.
*   **Vercel**: Auf Performance optimiert, mit ausgezeichneter Developer-Workflow-Integration.
*   **Netlify**: Leistungsstarke Automatisierungsfunktionen und ein zuverlässiges globales CDN.

### 2. Build automatisieren

Verwenden Sie eine CI/CD-Pipeline, um Ihre Site automatisch zu bauen und bereitzustellen, wann immer Sie Änderungen pushen. Detaillierte Beispiele finden Sie im [GitHub-Actions-Leitfaden](../../guides/integrations/github-actions-cicd.md).

```yaml ".github/workflows/deploy.yml"
# .github/workflows/deploy.yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      
      # Site ins Standard-Verzeichnis 'site/' bauen
      - run: npm install && npx @docmd/core build
      
      # Beispiel: Deployment zu Cloudflare Pages
      - name: Deploy
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: my-docs
          directory: site
```

### 3. Verifikation

Verifizieren Sie nach dem Deployment die globale Performance mit Tools wie PageSpeed Insights oder globalen Ping-Tests. Sie sollten aus nahezu jedem weltweiten Standort Antwortzeiten unter 100 ms sehen.

## Abwägungen

Globale Edge-Netzwerke abstrahieren das Server-Management, was Dokumentationsteams zugutekommt. Allerdings kann die Fehlersuche bei regionalen Caching-Problemen gelegentlich komplexer sein als die Durchsicht eines einzelnen Server-Logs. Plattformen mit zuverlässiger "Instant Cache Invalidation" stellen sicher, dass Benutzer stets unmittelbar nach einem Deployment die aktuellste Version sehen.
