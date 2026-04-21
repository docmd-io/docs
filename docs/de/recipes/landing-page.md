---
title: "Rezept: Eigene Landingpages entwerfen"
description: "Meistern Sie den noStyle-Modus, um wirkungsvolle Marketing-Seiten und Produkt-Einstiegspunkte zu erstellen."
---

Während `docmd` bei strukturierter technischer Dokumentation glänzt, können Sie die Standard-UI-Logik leicht umgehen, um maßgeschneiderte Landingpages, Produktpräsentationen oder Marketing-Screens mit **No-Style Pages** zu erstellen.

## Das architektonische Konzept

Durch Aktivieren von `noStyle: true` im Frontmatter einer Seite entfernt die Engine die Standard-Seitenleiste, den Header und das Standard-CSS-Framework. Dies bietet eine „leere Leinwand“, während der Zugriff auf die SEO-Meta-Tags und die Markdown-Parsing-Fähigkeiten der Dokumentations-Engine erhalten bleibt.

## Implementierungs-Workflow

Erstellen oder verfeinern Sie den Root-Einstiegspunkt Ihres Projekts unter `docs/index.md`.

```html
---
title: "Dokumentation der nächsten Generation"
description: "Die Zero-Config, isomorphe und KI-bereite Dokumentations-Engine."
noStyle: true
components:
  meta: true      # Strukturierte SEO- und OpenGraph-Tags beibehalten
  favicon: true   # Projekt-Branding beibehalten
  scripts: false  # SPA-Router für diese Seite deaktivieren (optional)
customHead: |
  <style>
    body { font-family: 'Inter', sans-serif; margin: 0; background: #000; color: #fff; }
    .hero { height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .btn { background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
  </style>
---

<div class="hero">
  <h1>Architektur trifft Dokumentation.</h1>
  <p>Isomorphe Ausführung. KI-optimierter Kontext. Navigation ohne Neuladen.</p>
  <br>
  <a href="/getting-started/" class="btn">Dokumentation starten →</a>
</div>

<div class="feature-grid">
   <!-- Fügen Sie hier benutzerdefiniertes Landingpage-HTML oder spezielle Markdown-Cards ein -->
</div>
```

## Technische Ergebnisse

Wenn das Projekt mittels `docmd build` kompiliert wird, wird die `index.html` im Root-Verzeichnis als maßgeschneiderte Landingpage gerendert. Diese Seite dient als hochwertiger Einstiegspunkt, der die Benutzer nahtlos in die standardisierte Dokumentationsumgebung leitet.
