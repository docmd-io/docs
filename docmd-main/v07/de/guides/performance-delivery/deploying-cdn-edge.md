---
title: "CDN- & Edge-Deployment"
description: "So minimieren Sie die globale Latenz, indem Sie Ihre statische Dokumentation auf einem Content Delivery Network (CDN) oder Edge-Netzwerk bereitstellen."
---

## Problem

Das Hosting Ihrer Dokumentation auf einem einzelnen Server in einer geografischen Region (z. B. US-East) bedeutet, dass Benutzer in anderen Teilen der Welt (z. B. Europa oder Asien) eine erhebliche Netzwerklatenz erfahren. Jeder Seitenaufruf, jedes Bild und jedes Skript muss Tausende von Kilometern zurücklegen, wodurch sich Ihre Dokumentation für ein globales Publikum träge und langsam anfühlt.

## Warum es wichtig ist

Hohe Latenz schadet direkt der Developer Experience. Selbst wenn Ihre Dokumentation gut geschrieben und leichtgewichtig ist, wird die "Time to First Byte" (TTFB) durch die Gesetze der Physik begrenzt. Wenn sich Ihre Website langsam anfühlt, verlieren Entwickler eher den Fokus oder geben Ihr Tool ganz zugunsten eines anderen mit schnellerer, besser zugänglicher Dokumentation auf.

## Ansatz

Die optimale Lösung besteht darin, Ihre Website auf einem Edge-CDN bereitzustellen. Da `docmd` rein statische Assets generiert (HTML, CSS, JS), ist es perfekt für die Verteilung über Edge-Netzwerke geeignet. CDNs replizieren Ihre Dateien auf Hunderte von weltweit verteilten "Edge-Nodes" und bedienen Ihre Benutzer vom nächstgelegenen Rechenzentrum aus.

## Implementierung

### 1. Plattform wählen

`docmd` ist nativ kompatibel mit allen modernen statischen Hosting- und Edge-Plattformen. Wir empfehlen die folgenden aufgrund ihrer globalen Performance und einfachen Handhabung:
*   **Cloudflare Pages**: Extrem schnelles globales Edge-Netzwerk mit integriertem DDoS-Schutz.
*   **Vercel**: Optimiert für Performance mit exzellenter Integration in den Entwickler-Workflow.
*   **Netlify**: Leistungsstarke Automatisierungsfunktionen und ein robustes globales CDN.

### 2. Build automatisieren

Verwenden Sie eine CI/CD-Pipeline, um Ihre Website automatisch zu erstellen und bereitzustellen, wann immer Sie Änderungen pushen. Detaillierte Beispiele finden Sie im [GitHub Actions Leitfaden](../../guides/integrations/github-actions-cicd).

```yaml
# .github/workflows/deploy.yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      
      # Buildet die Website in das Standard-Verzeichnis 'site/'
      - run: npm install && npx @docmd/core build
      
      # Beispiel: Deployment auf Cloudflare Pages
      - name: Deploy
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: mein-projekt
          directory: site
```

### 3. Verifizierung

Nach dem Deployment können Sie Ihre globale Performance mit Tools wie PageSpeed Insights oder globalen Ping-Tests überprüfen. Sie sollten Antwortzeiten unter 100 ms von fast jedem Standort weltweit sehen.

## Abwägungen

Globale Edge-Netzwerke nehmen Ihnen das Server-Management ab, was ein großer Vorteil für Dokumentationsteams ist. Das Debuggen regionaler Caching-Probleme kann jedoch gelegentlich komplexer sein als das Überprüfen eines einzelnen Server-Logs. Die Verwendung von Plattformen mit robuster "sofortiger Cache-Invalidierung" stellt sicher, dass Ihre Benutzer unmittelbar nach einem Deployment immer die neueste Version Ihrer Dokumentation sehen.
