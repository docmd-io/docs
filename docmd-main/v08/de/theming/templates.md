---
title: "Templates"
description: "Installieren Sie alternative Site-Layouts aus npm-Paketen. Jedes Template legt ein komplettes HTML/CSS/JS-Bündel über das Standard-Theme."
---

# Templates

::: callout info
**Neu in 0.8.7.** Mit Templates können Sie ein komplettes alternatives Layout (HTML-Struktur, Partials, CSS, JS) als eigenständiges Plugin ausliefern. Sie bauen auf dem bestehenden `theme`- + `customCss`-System auf — sie ersetzen es nicht.
:::

Ein **Template** ist ein npm-Paket, das `capabilities: ['template']` deklariert und einen Satz von `.ejs`-Partial-Überschreibungen sowie ein eigenes CSS- und JS-Bündel mitliefert. Der Resolver in `@docmd/ui` durchläuft eine feste Prioritätskette, um den richtigen Partial für jeden Slot zu finden, und fällt auf den Standard zurück, wenn etwas schiefgeht. **Der Build schlägt nie wegen eines Template-Problems fehl.**

## Schnellstart

### 1. Template installieren

```bash
# Das erste offizielle Template erscheint mit 0.8.7 — Installation über die docmd-Add-Pipeline:
npx @docmd/core add summer
```

### 2. In Ihrer Konfiguration aktivieren

Setzen Sie **einen Schlüssel** — `theme.name`. docmd erkennt automatisch, ob der Name auf ein reserviertes CSS-Theme (`default`, `sky`, `ruby`, `retro`) oder auf ein Template-Paket (`summer`, …) verweist.

```json "docmd.config.json"
{
  "theme": {
    "name": "summer"
  }
}
```

Jede Seite verwendet nun das `layout.ejs` des `summer`-Templates. Slots, die Sie nicht überschrieben haben (Sidebar, Footer usw.), verwenden automatisch die Standard-Versionen von `@docmd/ui`.

::: callout info
**Möchten Sie ein Template über einem CSS-Theme legen?** Verwenden Sie den expliziten Schlüssel `theme.template`. Er hat immer Vorrang vor `theme.name`:
```json "docmd.config.json"
{
  "theme": {
    "name": "sky",
    "template": "summer"
  }
}
```
↑ die **summer**-Struktur mit der **sky**-Farbpalette.
:::

### 3. Pro Seite überschreiben

Ein einziger Frontmatter-Schlüssel wechselt das Template nur für diese Seite:

```markdown
---
title: "Changelog"
template: "template-changelog"
---

# Changelog
…
```

## Auflösungs-Kette

Wenn eine Seite gerendert wird, durchläuft der Resolver diese Kette von oben nach unten und verwendet den ersten Treffer:

| # | Quelle | Beispiel |
|---|---|---|
| 1 | `frontmatter.template` | `template: "template-changelog"` |
| 2 | `config.templates[glob]` | `"blog/*": "template-blog"` |
| 3 | `config.theme.template` *(explizit)* | `"template": "summer"` |
| 4 | `config.theme.name` *(automatisch zum Template befördert, falls kein bekanntes CSS-Theme)* | `"name": "summer"` |
| 5 | Eingebauter Standard | Die mit `@docmd/ui` ausgelieferten `.ejs`-Dateien |

Die CSS-Themes `default`, `sky`, `ruby` und `retro` sind reserviert — wenn `theme.name` mit einem davon übereinstimmt, bleibt es ein CSS-Theme. Jeder andere Wert wird als Template-Name behandelt und das entsprechende `@docmd/template-*`-Paket wird automatisch geladen.

Fehlt die aufgelöste Datei auf der Festplatte, protokolliert der Resolver eine einzelne TUI-Warnung und fällt auf den Standard zurück.

## Unterstützte Template-Slots

Ein Template kann jeden dieser 12 Slots überschreiben. Jeder Slot, den Sie nicht überschreiben, fällt auf den Standard zurück:

| Slot | Standard-Datei | Zweck |
|---|---|---|
| `layout` | `templates/layout.ejs` | Die vollständige HTML-Seite |
| `404` | `templates/404.ejs` | Not-Found-Seite |
| `toc` | `templates/toc.ejs` | Inhaltsverzeichnis-Sidebar |
| `navigation` | `templates/navigation.ejs` | Der Sidebar-Navigationsbaum |
| `footer` | `templates/partials/footer.ejs` | Seiten-Footer |
| `menubar` | `templates/partials/menubar.ejs` | Obere Navigationsleiste |
| `options-menu` | `templates/partials/options-menu.ejs` | Suche/Theme/Profil-Menü |
| `project-switcher` | `templates/partials/project-switcher.ejs` | Multi-Projekt-Switcher |
| `version-dropdown` | `templates/partials/version-dropdown.ejs` | Versions-Auswahl |
| `language-switcher` | `templates/partials/language-switcher.ejs` | Sprach-Auswahl |
| `banner` | `templates/partials/banner.ejs` | Site-weite Ankündigung |
| `cookie-consent` | `templates/partials/cookie-consent.ejs` | Cookie-Zustimmungsdialog |

::: callout info
`no-style`-Seiten haben keine Template-spezifische Kopie. Sie verwenden immer den Standard `templates/no-style.ejs`, unabhängig vom aktiven Template.
:::

## Asset-Priorität

Wenn mehrere Templates und Ihr `customCss` CSS oder JS ausliefern, laden sie in dieser Reihenfolge (niedriger lädt zuerst, höher gewinnt Kaskaden-Konflikte):

| Priorität | Schicht |
|---|---|
| 0 | Basis (`docmd-main.css`, `docmd-main.js`) |
| 5 | Theme-Farb-Overlay (z. B. `docmd-theme-sky.css`) |
| 10 | **Template-Struktur** (Standard für Templates) |
| 15 | Benutzer-`customCss` / `customJs` — gewinnt immer |
| 20 | Plugin-CSS/JS |
| 25+ | Höher priorisierte Templates (Summer verwendet z. B. 25) |

Wenn Sie die Stile eines Templates überschreiben möchten, legen Sie sie im `customCss` Ihres Projekts mit Priorität 15 ab. Vermeiden Sie `!important` im Template-CSS, damit Benutzer ohne Fork überschreiben können.

## Template-Lokalisierung

Die aktive Locale wird Ihrem Template als normale Local übergeben. Übersetzungen werden wie in den Standard-Templates über den `t(key)`-Helper nachgeschlagen — Ihre bestehenden `assets/i18n/<locale>.json`-Dateien funktionieren weiterhin.

## Nächste Schritte

- [Templates entwickeln](/development/building-templates) — schreiben Sie Ihr eigenes Template-Paket.
- [Theming](/theming/custom-css-js) — legen Sie `customCss` über ein beliebiges Template.
- [Eigene Landing-Pages gestalten](/theming/landing-pages) — machen Sie die Startseite eines Templates zu Ihrer eigenen.
