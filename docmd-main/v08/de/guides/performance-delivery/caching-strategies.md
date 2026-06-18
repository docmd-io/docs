---
title: "Caching-Strategien"
description: "Wie Sie die Performance Ihrer Dokumentations-Site mit Immutable Caching, Etag-Revalidation und produktionsreifen Server-Konfigurationen optimieren."
---

## Problem

Wenn eine Dokumentations-Site ohne korrekte Cache-Control-Header ausgeliefert wird, laden Browser unnötig Bilder, CSS und JavaScript-Bundles erneut herunter. Das führt zu visuellem Ruckeln, erhöhter Bandbreitennutzung und einer schlechten Erfahrung für wiederkehrende Benutzer.

## Warum es wichtig ist

Effektives Caching hat eine hohe Wirkung auf die wahrgenommene Performance. Statische Assets lokal im Browser des Benutzers zu speichern eliminiert die Latenz wiederholter Netzwerk-Anfragen. Das lässt die Navigation flüssig und zuverlässig wirken, selbst bei instabilen Verbindungen.

## Ansatz

Implementieren Sie eine zweistufige Caching-Strategie: **Immutable Caching** für statische Assets (CSS, JS, Bilder) und **Etag-Revalidation** für dynamische Inhalte (HTML, JSON). docmd unterstützt dies, indem produktionsreife Konfigurationen generiert werden, die Cache-Busting automatisch handhaben.

## Implementierung

### 1. Produktionsreife Server-Konfigurationen

Der einfachste Weg, optimales Caching zu implementieren, ist die Verwendung des [Deploy-Befehls](../../deployment/index.md) zur Generierung Ihrer Server-Konfiguration.

```bash
# Eine optimierte Nginx-Konfiguration generieren
npx @docmd/core deploy --nginx
```

### 2. Immutable Assets

Für Assets, die sich selten ändern (wie Theme-Styles und Kern-Skripte), verwenden Sie langfristiges Caching. docmd hängt Versions-Hashes an diese Assets an, um sicherzustellen, dass Benutzer neue Versionen nur herunterladen, wenn Sie Ihre Dokumentation aktualisieren.

```nginx
# Beispiel-Nginx-Regel für immutable Assets
location ~* \.(?:css|js|webp|png|svg|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

### 3. HTML- & Navigations-Revalidation

Ihre HTML-Dateien und `navigation.json` sollten stets auf Aktualisierungen überprüft werden. Das stellt sicher, dass Benutzer neueste Inhalte sofort sehen. Verwenden Sie die Direktive `no-cache`, um den Browser zu zwingen, mit dem Server anhand von Etags zu revalidieren.

```nginx
# Beispiel-Nginx-Regel für HTML-Dateien
location ~* \.html$ {
    add_header Cache-Control "no-cache, must-revalidate";
}
```

## Abwägungen

### Veraltete Inhalte vs. Performance

Lange Cache-Zeiten für Assets zu setzen ist hochperformant, erfordert aber eine zuverlässige "Cache-Busting"-Strategie. Für Kerndateien übernimmt docmd das automatisch. Wenn Sie manuell Assets zu Ihrem `static/`-Verzeichnis hinzufügen, müssen Sie deren Referenzen aktualisieren (z. B. durch Änderung des Dateinamens oder Hinzufügen eines Query-Parameters), wenn sich der Inhalt ändert.

### CDN-Integration

Wenn Sie ein CDN verwenden (wie Cloudflare oder AWS CloudFront), stellen Sie sicher, dass es die `Cache-Control`-Header Ihres Servers respektiert. Die meisten modernen CDNs bieten "Instant Purge"-Funktionen. Wir empfehlen, dies als Teil Ihrer CI/CD-Pipeline auszulösen, wann immer Sie eine neue Version deployen.