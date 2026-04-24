---
title: "Caching-Strategien"
description: "So optimieren Sie die Performance Ihrer Dokumentations-Website durch Immutable Caching, Etag-Revalidierung und produktionsreife Serverkonfigurationen."
---

## Problem

Wenn eine Dokumentations-Website ohne ordnungsgemäße `Cache-Control`-Header bereitgestellt wird, laden Browser bei jedem Besuch unnötigerweise Bilder, CSS- und JavaScript-Bundles erneut herunter. Dies führt zu visuellem Ruckeln, erhöhtem Bandbreitenverbrauch und einer schlechten Erfahrung für wiederkehrende Benutzer, die erwarten, dass die Dokumentation sofort geladen wird.

## Warum es wichtig ist

Effektives Caching ist einer der wirkungsvollsten Wege, um die "gefühlte Performance" Ihrer Website zu verbessern. Indem Sie sicherstellen, dass statische Assets lokal im Browser des Benutzers gespeichert werden, eliminieren Sie die Latenz wiederholter Netzwerkanfragen. Dadurch fühlt sich das Navigieren in Ihrer Dokumentation flüssig und zuverlässig an, selbst bei instabilen Netzwerkverbindungen.

## Ansatz

Implementieren Sie eine zweistufige Caching-Strategie: **Immutable Caching** für statische Assets (CSS, JS, Bilder) und **Etag-Revalidierung** für dynamische Inhalte (HTML, JSON). `docmd` erleichtert dies durch die Generierung produktionsreifer Konfigurationen, die das Cache-Busting automatisch über Versions-Hashes abwickeln.

## Implementierung

### 1. Produktionsreife Server-Konfigurationen

Der einfachste Weg, optimales Caching zu implementieren, ist die Verwendung des [Deploy-Befehls](../../deployment) zur Generierung Ihrer Serverkonfiguration.

```bash
# Generieren einer optimierten Nginx-Konfiguration
npx docmd deploy --nginx
```

### 2. Immutable Assets

Für Assets, die sich nicht häufig ändern (wie Theme-Styles und Kern-Skripte), verwenden Sie langfristiges Caching. `docmd` fügt diesen Assets Versions-Hashes hinzu, um sicherzustellen, dass Benutzer neue Versionen nur dann herunterladen, wenn Sie Ihre Dokumentation aktualisieren.

```nginx
# Beispiel einer Nginx-Regel für Immutable Assets
location ~* \.(?:css|js|webp|png|svg|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

### 3. HTML- & Navigations-Revalidierung

Ihre HTML-Dateien und die `navigation.json` sollten immer auf Updates geprüft werden, damit Benutzer sofort den neuesten Inhalt und die aktuelle Struktur sehen. Verwenden Sie die Anweisung `no-cache`, um den Browser zu zwingen, die Gültigkeit beim Server mittels Etags zu validieren.

```nginx
# Beispiel einer Nginx-Regel für HTML-Dateien
location ~* \.html$ {
    add_header Cache-Control "no-cache, must-revalidate";
}
```

## Abwägungen

### Veralteter Inhalt vs. Performance
Die Einstellung langer Cache-Zeiten für Assets ist hochperformant, erfordert jedoch eine robuste "Cache-Busting"-Strategie. `docmd` übernimmt dies automatisch für seine Kerndateien. Wenn Sie jedoch manuell Assets zu Ihrem `static/`-Verzeichnis hinzufügen, müssen Sie sicherstellen, dass Sie deren Referenzen aktualisieren (z. B. durch Ändern des Dateinamens oder Hinzufügen eines Query-Parameters), wenn sich der Inhalt ändert.

### CDN-Integration
Wenn Sie ein CDN (wie Cloudflare oder AWS CloudFront) verwenden, stellen Sie sicher, dass dieses so konfiguriert ist, dass es die `Cache-Control`-Header Ihres Servers berücksichtigt. Die meisten modernen CDNs bieten "Instant Purge"-Funktionen an. Wir empfehlen, diese als Teil Ihrer CI/CD-Pipeline auszulösen, wann immer Sie eine neue Version Ihrer Dokumentation bereitstellen.
