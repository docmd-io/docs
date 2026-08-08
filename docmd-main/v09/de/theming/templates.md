---
title: "Templates & Themes"
description: "Konfigurieren Sie Website-Layout-Templates und integrierte CSS-Farbschemata in docmd. Schichten Sie HTML-Strukturen, EJS-Partials und visuelle Paletten."
---

In `docmd` definieren **Templates** die grundlegende HTML-Struktur, Layout-Architektur, EJS-Partials und Komponenten-Slots Ihrer Dokumentations-Website.

::: callout info "Strukturelle Layouts vs. Farbschemata" icon:info
* **Templates**: Steuern die strukturelle HTML-Architektur (Header, Seitenleiste, Inhaltsverzeichnis, Fußzeile, Banner, EJS-Partials).
* **Farbschemata**: Bieten visuelle CSS-Themes (`default`, `sky`, `ruby`, `retro`), die direkt auf Templates geschichtet werden.
:::

Ein **Template** ist ein npm-Paket, das `capabilities: ['template']` deklariert und benutzerdefinierte `.ejs`-Layoutdateien sowie Asset-Bundles ausliefert. Der `@docmd/ui`-Resolver verwendet eine Fallback-Prioritätskette, die sicherstellt, dass fehlende Slots nahtlos auf Standard-Layouts zurückgreifen.

## Schnellstart-Leitfaden

### 1. Template-Paket installieren

```bash
npx @docmd/core add summer
```

### 2. Template in Konfiguration aktivieren

Setzen Sie `theme.name` in `docmd.config.json`. `docmd` erkennt automatisch, ob der Name einem integrierten CSS-Farbschema (`default`, `sky`, `ruby`, `retro`) oder einem strukturellen Template-Paket (`summer` usw.) entspricht:

```json "docmd.config.json"
{
  "theme": {
    "name": "summer"
  }
}
```

Jede Seite wird nun unter Verwendung des strukturellen Layouts `summer` gerendert. Nicht angegebene Slots fallen automatisch auf Standard-Partials von `@docmd/ui` zurück.

## Integrierte Farbschemata (Standard-Template)

Das standardmäßige integrierte Template enthält vier kuratierte CSS-Farbpaletten, die durch Setzen von `theme.name` aktiviert werden können:

| Farbschema | Am besten für | Visuelle Ästhetik |
| :--- | :--- | :--- |
| `default` | Unaufdringliche Dokumentation | Saubere, leichte, neutrale Palette |
| `sky` | Produktdokumentation | Moderner, kontrastreicher Unternehmensstandard |
| `ruby` | Markenidentität | Anspruchsvolle Serif-Header, lebendige Akzente |
| `retro` | Entwickler-Tools | Monospace-Typografie, grüne Phosphor-Akzente |

::: callout info "Schichten von Farbschemata auf externe Templates" icon:info
Um ein bestimmtes CSS-Farbschema (`sky`, `ruby`, `retro`) auf ein benutzerdefiniertes strukturelles Template anzuwenden, setzen Sie `theme.template` neben `theme.name`:
```json "docmd.config.json"
{
  "theme": {
    "name": "sky",
    "template": "summer"
  }
}
```
Dies rendert das strukturelle Layout **summer**, gestylt mit der Farbpalette **sky**.
:::

### 3. Template-Überschreibungen auf Seitenebene

Wechseln Sie Templates für einzelne Seiten mithilfe von Seiten-Frontmatter:

```markdown
---
title: "Release-Historie"
template: "template-changelog"
---

# Release-Historie
```

## Auflösungs-Prioritätskette

Beim Rendern einer Seite wertet `docmd` Template-Pfade von oben nach unten aus:

| Priorität | Quelle | Syntaxbeispiel |
| :--- | :--- | :--- |
| **1** | `frontmatter.template` | `template: "template-changelog"` |
| **2** | `config.templates[glob]` | `"blog/*": "template-blog"` |
| **3** | `config.theme.template` *(Explizit)* | `"template": "summer"` |
| **4** | `config.theme.name` *(Automatisch befördert)* | `"name": "summer"` |
| **5** | Eingebauter Fallback | Standard-`.ejs`-Templates, die mit `@docmd/ui` ausgeliefert werden |

Die CSS-Theme-Namen `default`, `sky`, `ruby` und `retro` sind reservierte Farbschemata. Jeder andere Bezeichner in `theme.name` wird als Template-Paketname behandelt.

## Unterstützte Layout-Slots

Templates können jeden der 12 UI-Layout-Slots überschreiben:

| Slot | Standard-Partial-Pfad | Technischer Zweck |
| :--- | :--- | :--- |
| `layout` | `templates/layout.ejs` | Haupt-HTML-Dokumentenhülle |
| `404` | `templates/404.ejs` | Nicht-Gefunden-Fehlerseite |
| `toc` | `templates/toc.ejs` | Inhaltsverzeichnis-Seitenleistennavigation |
| `navigation` | `templates/navigation.ejs` | Haupt-Seitenleistennavigationsbaum |
| `footer` | `templates/partials/footer.ejs` | Website-Fußzeilen-Partial |
| `menubar` | `templates/partials/menubar.ejs` | Obere Navigationsleiste (Menüleiste) |
| `options-menu` | `templates/partials/options-menu.ejs` | Such-, Theme- und Profil-Steuerungsmenü |
| `project-switcher` | `templates/partials/project-switcher.ejs` | Multi-Projekt-Monorepo-Umschalter |
| `version-dropdown` | `templates/partials/version-dropdown.ejs` | Versionsauswahl-Dropdown |
| `language-switcher` | `templates/partials/language-switcher.ejs` | Locale-Sprachauswahl |
| `banner` | `templates/partials/banner.ejs` | Website-weite Ankündigungsleiste |
| `cookie-consent` | `templates/partials/cookie-consent.ejs` | Cookie-Zustimmungs-Datenschutzdialog |

::: callout alert "No-Style-Seitenisolation" icon:alert-circle
Seiten, die mit `noStyle: true` konfiguriert sind, umgehen aktive Templates vollständig und werden unter Verwendung des Standard-Layouts `templates/no-style.ejs` gerendert.
:::

## Asset-Prioritätsreihenfolge

Wenn mehrere Templates und Benutzer-Stylesheets CSS- oder JS-Assets injizieren, ordnet die Engine diese nach Prioritätsgewicht an:

| Prioritätsgewicht | Schicht | Verhalten |
| :--- | :--- | :--- |
| `0` | Basis-Kern (`docmd-main.css`, `docmd-main.js`) | Grundlegende Stile |
| `5` | Theme-Palette (`docmd-theme-sky.css` usw.) | Visuelles Farbschema |
| `10` | Strukturelle Template-Stile | Strukturelle Layout-Regeln |
| `15` | Benutzer-`customCss` / `customJs` | **Hat immer Vorrang** vor Templates |
| `20` | Plugin-Assets | Lightbox-, Such- und Analytics-Assets |
| `25+` | Spezialisierte Template-Überschreibungen | Benutzerdefinierte Template-Erweiterungen |

Um Standard-CSS-Regeln eines Templates zu überschreiben, fügen Sie benutzerdefinierte Deklarationen zu `theme.customCss` hinzu (Priorität `15`).

## Template-Lokalisierung

Templates erhalten während des Renders den aktiven Locale-String. Lokalisierte Text-Strings werden über die `t(key)`-Hilfsfunktion unter Verwendung bestehender `assets/i18n/<locale>.json`-Übersetzungskarten aufgelöst.

## Verwandte Ressourcen

- [Eigene Styles & Skripte](custom-css-js.md) — Schichten Sie benutzerdefiniertes CSS über aktive Templates.
- [Gestaltung benutzerdefinierter Landing-Pages](landing-pages.md) — Passen Sie Homepage-Layouts mit Markdown-Containern an.
- [Konfigurationsreferenz](../configuration/overview.md) — Übersicht über globale Website-Optionen.
