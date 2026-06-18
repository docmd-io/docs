---
title: "Seiten ohne Stil"
description: "Erstellen Sie benutzerdefinierte Landingpages und einzigartige Layouts durch Deaktivieren des docmd-Standard-Themes."
---

docmd erlaubt es Ihnen, das Standard-Dokumentationslayout (Sidebar, Header, Footer) seitenweise zu umgehen. Dies ist ideal zum Erstellen von Landingpages oder benutzerdefinierten Dashboards und behält gleichzeitig den Zugriff auf die Komponenten der Engine.

## No-Style-Modus aktivieren

Um die globale UI zu deaktivieren, fügen Sie `noStyle: true` zum Frontmatter der Seite hinzu.

```yaml
---
title: "Product Showcase"
noStyle: true
components:
  meta: true      # SEO- und OpenGraph-Tags behalten
  favicon: true   # Site-Favicon behalten
  css: true       # docmd-main.css für Typografie injizieren
---

<!-- Hier kommt roher HTML- oder spezialisierter Markdown-Inhalt -->
<div class="hero">
  <h1>Next-Gen Documentation</h1>
  <p>Zero-config. Isomorphic. AI-Ready.</p>
</div>

::: callout info "Unendliche Verschachtelung unterstützt" icon:info
Auch mit `noStyle: true` werden alle Standard-docmd-Container wie `::: card`, `::: tabs` und `::: hero` vollständig unterstützt und können unendlich verschachtelt werden.
:::
```

## Komponenten-Opt-in

Wenn `noStyle` aktiv ist, starten Sie mit einer leeren Leinwand. Aktivieren Sie Kern-Systemkomponenten bei Bedarf selektiv neu:

| Komponente | Beschreibung |
| :--- | :--- |
| `meta` | Injiziert `<title>`, SEO-Meta-Tags und strukturierte OpenGraph-Daten. |
| `favicon` | Injiziert das projektweite Favicon. |
| `css` | Injiziert `docmd-main.css`. Sehr empfehlenswert für grundlegendes Grid und Typografie. |
| `menubar` | Injiziert die obere Menubar der Site. |
| `theme` | Injiziert die CSS-Variablen und Erscheinungs-Overrides des aktiven Themes. |
| `scripts` | Injiziert interaktive Komponentenlogik (erfordert `mainScripts: true`). |
| `spa` | Aktiviert den SPA-Router (erfordert `scripts: true`). |

## Komponierbare Landingpages

Die Hauptstärke von `noStyle` liegt darin, docmd-Komponenten als hochwertige "Widgets" auf einer leeren Leinwand zu verwenden. Sie sind nicht auf rohen HTML-Code beschränkt; Sie können komplexe strukturelle Designs rein in Markdown erstellen.

### Einen modernen Einstiegspunkt bauen

```yaml
---
title: "Welcome"
noStyle: true
components:
  meta: true
  css: true
  menubar: true    # Top-Navigation der Site verwenden
  scripts: true    # Interaktive Komponenten aktivieren
  mainScripts: true
---

::: hero layout:split glow:true
# Build Documentation that Wows.
The zero-config engine for modern engineering teams.

::: button "Get Started" ../getting-started/quick-start.md color:blue
::: button "GitHub" github:docmd-io/docmd color:gray

== side
::: embed "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
:::
:::

::: grids
  ::: card "Zero Configuration"
  Just write markdown. No complex React logic or build scripts.
  :::
  ::: card "AI Optimised"
  Structure-aware parsing for the LLM era.
  :::
  ::: card "Fast Without the Framework Tax"
  Static generation with isomorphic SPA navigation.
  :::
:::
```

::: callout tip "KI-generierte Layouts" icon:lightbulb
Da `noStyle`-Seiten rohen HTML-Code neben docmd-Containern unterstützen, eignen sie sich perfekt für **KI-gesteuertes UI-Design**. Prompten Sie eine KI: *"Entwerfe einen modernen Hero-Bereich mit Utility-Klassen und docmd-Buttons, eingebettet in einen noStyle-Container."* Die KI kann in Ihrer statischen Site-Pipeline ohne Konfiguration iterieren.
:::

## String-Ersetzung (i18n für noStyle)

Wenn Ihre Site [i18n konfiguriert](../configuration/localisation/index.md) hat, erhalten themenbasierte Dokumentationsseiten automatisch vollständige serverseitige Übersetzungen. `noStyle`-Seiten verwenden jedoch benutzerdefinierten HTML-Code. docmd bietet **String-Ersetzung**, um HTML über `data-i18n`-Attribute und JSON-Übersetzungsdateien zu übersetzen.

::: callout info "Warum dies nur für noStyle-Seiten funktioniert" icon:info
Die String-Ersetzung sucht Elemente mit `data-i18n`-Attributen und ersetzt deren Textinhalt. Standard-Markdown-Inhalte rendern zu reinen `<p>`-, `<h2>`-, `<li>`-Tags ohne diese Attribute. Für Standard-Markdown verwenden Sie den [Verzeichnismodus](../configuration/localisation/translated-content.md).
:::

### Funktionsweise

Es gibt zwei Modi für die String-Ersetzung:

- **Serverseitig (empfohlen)**: Mit `stringMode: true` in Ihrer i18n-Konfiguration löst docmd `data-i18n`-Attribute **zur Build-Zeit** auf. Es erzeugt vollständig übersetztes HTML in `/{locale}/`-Verzeichnissen für Suchmaschinen.
- **Clientseitig**: Das `docmd-i18n-strings.js`-Skript lädt Übersetzungen zur Laufzeit per XHR. Dies ist nützlich für In-Place-Wechsel ohne Seiten-Neuladen.

Beide Modi verwenden dieselbe `data-i18n`-Attributsyntax und dasselbe JSON-Dateiformat.

1. Platzieren Sie JSON-Übersetzungsdateien in `assets/i18n/` — eine pro Locale:

```text
assets/
  i18n/
    en.json
    hi.json
    zh.json
```

2. Jede JSON-Datei ist eine flache Key-Value-Map:

```json "assets/i18n/en.json"
{
  "hero.title": "Markdown → Production Docs",
  "hero.subtitle": "The zero-config documentation engine.",
  "nav.docs": "Documentation",
  "nav.editor": "Live Editor",
  "cta.getStarted": "Get Started",
  "cta.install": "npm i @docmd/core"
}
```

3. Verwenden Sie `data-i18n`-Attribute auf Ihren HTML-Elementen:

```html
<h1 data-i18n="hero.title">Markdown → Production Docs</h1>
<p data-i18n="hero.subtitle">The zero-config documentation engine.</p>
<a data-i18n="nav.docs" href="/docs">Documentation</a>
```

Der Standardsprachentext dient als Fallback. Wenn eine Nicht-Standard-Locale aktiv ist, ersetzt die Engine den Text.

### Attribut-Übersetzung

Um Attribute wie `placeholder`, `title` oder `aria-label` zu übersetzen, verwenden Sie `data-i18n-{attr}`:

```html
<input data-i18n-placeholder="search.placeholder" placeholder="Search...">
<button data-i18n-aria-label="nav.menuLabel" aria-label="Open menu">☰</button>
<a data-i18n-title="nav.tooltip" title="Go to docs">Docs</a>
```

### HTML-Inhalt

Für Schlüssel, die HTML-Markup enthalten, verwenden Sie `data-i18n-html` statt `data-i18n`:

```html
<p data-i18n-html="hero.desc">Static HTML for SEO. <br>SPA for speed.</p>
```

### Sprachen wechseln

Das i18n-Strings-Modul stellt eine globale API unter `window.DOCMD_I18N_STRINGS` bereit:

```javascript
// Sprache wechseln
DOCMD_I18N_STRINGS.switchLocale("hi");

// Aktive Sprache abrufen
console.log(DOCMD_I18N_STRINGS.locale);

// Alle Sprachen abrufen
console.log(DOCMD_I18N_STRINGS.locales);
```

Sie können mit dieser API einen benutzerdefinierten Sprachwechsler bauen:

```html
<select onchange="DOCMD_I18N_STRINGS.switchLocale(this.value)">
  <option value="en">English</option>
  <option value="hi">हिन्दी</option>
</select>
```

### Ereignisse

Hören Sie auf das `docmd:i18n-applied`-Ereignis, um benutzerdefinierte Logik nach der String-Anwendung auszuführen:

```javascript
document.addEventListener("docmd:i18n-applied", function(e) {
  console.log("Locale:", e.detail.locale);
  console.log("Strings:", e.detail.strings);
});
```

::: callout info "Automatische Erkennung" icon:info
Das Skript erkennt die aktive Locale aus dem URL-Pfad-Präfix. Für die Standard-Locale prüft es `localStorage` auf eine zuvor gespeicherte Präferenz. Die Funktion `switchLocale()` behandelt die URL-Navigation automatisch.
:::

### In-Place-Modus

Für Single-Page-Sites setzen Sie `inPlace: true` in Ihrer i18n-Konfiguration, um Strings ohne URL-Weiterleitungen auszutauschen:

```json "docmd.config.json"
{
  "i18n": {
    "default": "en",
    "locales": [
      { "id": "en", "label": "English" },
      { "id": "zh", "label": "中文" }
    ],
    "inPlace": true
  }
}
```

Mit `inPlace: true` lädt der Aufruf von `switchLocale()` die JSON-Datei für die neue Locale neu und ersetzt sofort alle `data-i18n`-Strings. Es erfolgt keine Navigation.