---
title: "Seiten ohne Stil (No-Style Pages)"
description: "Erstellen Sie benutzerdefinierte Landingpages und einzigartige Layouts, indem Sie das Standard-Theme von docmd deaktivieren."
---

`docmd` ermöglicht es Ihnen, das Standard-Dokumentationslayout (Seitenleiste, Header und Footer) auf einer pro-Seite-Basis zu umgehen. Dies ist ideal für die Erstellung von Produkt-Landingpages, benutzerdefinierten Dashboards oder Marketing-Splash-Screens, während der Zugriff auf die Komponenten der Dokumentations-Engine erhalten bleibt.

## Aktivierung des No-Style-Modus

Um die globale Benutzeroberfläche zu deaktivieren, fügen Sie `noStyle: true` zum Frontmatter der Seite hinzu.

```yaml
---
title: "Produkt-Showcase"
noStyle: true
components:
  meta: true      # SEO- und OpenGraph-Tags beibehalten
  favicon: true   # Website-Favicon beibehalten
  css: true       # docmd-main.css für Typografie einfügen
---

<!-- Reines HTML oder spezielles Markdown folgt hier -->
<div class="hero">
  <h1>Dokumentation der nächsten Generation</h1>
  <p>Zero-config. Isomorph. KI-bereit.</p>
</div>

::: callout info "Unterstützung für unbegrenzte Verschachtelung"
Auch bei `noStyle: true` werden alle Standard-`docmd`-Container wie `::: card`, `::: tabs` und `::: hero` vollständig unterstützt und können in jeder Tiefe verschachtelt werden.
:::
```

## Komponenten-Auswahl (Opt-In)

Wenn `noStyle` aktiv ist, beginnen Sie mit einer leeren Leinwand. Aktivieren Sie die Kernkomponenten des Systems gezielt nach Bedarf:

| Komponente | Beschreibung |
| :--- | :--- |
| `meta` | Fügt `<title>`, SEO-Meta-Tags und strukturierte OpenGraph-Daten ein. |
| `favicon` | Fügt das projektweite Favicon ein. |
| `css` | Fügt `docmd-main.css` ein. Dringend empfohlen für grundlegendes Raster und Typografie. |
| `menubar` | Fügt die obere Menüleiste der Website ein. |
| `theme` | Fügt die CSS-Variablen und Design-Überschreibungen des aktiven Themes ein. |
| `scripts` | Fügt die interaktive Komponentenlogik ein (erfordert `mainScripts: true`). |
| `spa` | Aktiviert den Single-Page-Application-Router (erfordert `scripts: true`). |

## Komponierbare Landingpages

Die Hauptstärke von `noStyle` liegt darin, dass Sie die gesamte Suite der `docmd`-Komponenten als hochwertige „Widgets“ auf einer leeren Leinwand verwenden können. Sie sind nicht auf reines HTML beschränkt; Sie können komplexe, strukturelle Designs rein in Markdown erstellen.

### Erstellung eines modernen Einstiegspunkts

```yaml
---
title: "Willkommen"
noStyle: true
components:
  meta: true
  css: true
  menubar: true    # Verwenden Sie die obere Navigation der Website
  scripts: true    # Interaktive Komponenten aktivieren
  mainScripts: true
---

::: hero layout:split glow:true
# Dokumentation, die begeistert.
Die Zero-Config-Engine für moderne Entwicklerteams.

::: button "Erste Schritte" /introduction color:blue
::: button "GitHub" github:docmd-io/docmd color:gray

== side
::: embed [https://www.youtube.com/watch?v=dQw4w9WgXcQ]
:::
:::

::: grids
  ::: card "Zero Configuration"
  Schreiben Sie einfach Markdown. Keine komplexe React-Logik oder Build-Skripte.
  :::
  ::: card "KI-optimiert"
  Strukturbewusstes Parsing für die Ära der LLMs.
  :::
  ::: card "Schnell ohne Framework-Last"
  Statische Generierung mit isomorpher SPA-Navigation.
  :::
:::
```

::: callout tip "KI-generierte Layouts"
Da `noStyle`-Seiten sowohl reines HTML als auch `docmd`-Container unterstützen, eignen sie sich perfekt für **KI-gesteuertes UI-Design**. Sie können einer KI den Befehl geben: *"Entwirf eine moderne Hero-Sektion mit Tailwind-ähnlichen Utility-Klassen und docmd-Buttons, gehüllt in einen noStyle: true-Container."* Die KI kann das Design innerhalb Ihrer statischen Website-Pipeline ohne zusätzliche Konfiguration iterieren.
:::

## String-Ersetzung (i18n für noStyle)

Wenn Ihre Website für [i18n konfiguriert](/configuration/localisation/) ist, erhalten gewöhnliche Dokumentationsseiten automatisch serverseitige Übersetzungen — jede Sprache hat ihre eigenen Markdown-Dateien in separaten Verzeichnissen. Aber noStyle-Seiten verwenden benutzerdefiniertes HTML statt Markdown, weshalb dieser Ansatz dort nicht greift. Stattdessen bietet docmd eine **String-Ersetzung** an — die Übersetzung Ihres HTML über `data-i18n`-Attribute und JSON-Übersetzungsdateien.

::: callout info "Warum dies nur für noStyle-Seiten funktioniert"
Die String-Ersetzung findet Elemente mit `data-i18n`-Attributen im gerenderten HTML und tauscht deren Textinhalt aus. Standard-Markdown-Inhalte werden in einfache `<p>`, `<h2>`, `<li>` Tags gerendert — dort gibt es keine `data-i18n`-Attribute, die der Ersetzer finden könnte. Für die Übersetzung von in Markdown verfassten Dokumentationen verwenden Sie den [Verzeichnis-Modus](/configuration/localisation/translated-content/) — separate Markdown-Dateien pro Sprache.
:::

### Wie es funktioniert

Es gibt zwei Modi für die String-Ersetzung:

- **Serverseitig (empfohlen)**: Mit [`stringMode: true`](/configuration/localisation/#string-mode-nostyle-pages-only) in Ihrer i18n-Konfiguration löst docmd `data-i18n`-Attribute **zur Build-Zeit** auf und generiert vollständig übersetztes HTML in den Verzeichnissen `/{locale}/`. Jede Sprache erhält ihre eigene URL — vollständig indexierbar für Suchmaschinen.
- **Clientseitig**: Das Skript `docmd-i18n-strings.js` lädt Übersetzungen zur Laufzeit via XHR. Dies wird auf noStyle-Seiten automatisch eingefügt, wenn i18n konfiguriert ist. Nützlich für den Austausch an Ort und Stelle ohne Neuladen der Seite (z. B. SPAs, Dashboards).

Beide Modi verwenden dieselbe Syntax für `data-i18n`-Attribute und dasselbe JSON-Dateiformat.

1. Platzieren Sie JSON-Übersetzungsdateien in `assets/i18n/` — eine pro Sprache:

```
assets/
  i18n/
    en.json
    hi.json
    zh.json
```

2. Jede JSON-Datei ist eine flache Schlüssel-Wert-Zuordnung:

```json
{
  "hero.title": "Markdown → Produktions-Docs",
  "hero.subtitle": "Die Zero-Config-Dokumentations-Engine.",
  "nav.docs": "Dokumentation",
  "nav.editor": "Live-Editor",
  "cta.getStarted": "Erste Schritte",
  "cta.install": "npm i @docmd/core"
}
```

3. Verwenden Sie `data-i18n`-Attribute in Ihren HTML-Elementen:

```html
<h1 data-i18n="hero.title">Markdown → Produktions-Docs</h1>
<p data-i18n="hero.subtitle">Die Zero-Config-Dokumentations-Engine.</p>
<a data-i18n="nav.docs" href="/docs">Dokumentation</a>
```

Der Text in der Standardsprache wird direkt in das HTML geschrieben (fungiert als Fallback). Wenn eine andere Sprache aktiv ist, lädt das Skript das entsprechende JSON und ersetzt den Text.

### Attribut-Übersetzung

Um Elementattribute wie `placeholder`, `title` oder `aria-label` zu übersetzen, verwenden Sie `data-i18n-{attr}`:

```html
<input data-i18n-placeholder="search.placeholder" placeholder="Suche...">
<button data-i18n-aria-label="nav.menuLabel" aria-label="Menü öffnen">☰</button>
<a data-i18n-title="nav.tooltip" title="Zu den Docs">Docs</a>
```

### HTML-Inhalt

Für Schlüssel, die HTML-Markup enthalten, verwenden Sie `data-i18n-html` anstelle von `data-i18n`:

```html
<p data-i18n-html="hero.desc">Statisches HTML für SEO. <br>SPA für Geschwindigkeit.</p>
```

### Sprachwechsel

Das Modul für i18n-Strings stellt eine globale API unter `window.DOCMD_I18N_STRINGS` bereit:

```js
// Zu Hindi wechseln
DOCMD_I18N_STRINGS.switchLocale('hi');

// Aktuelle Sprache abrufen
console.log(DOCMD_I18N_STRINGS.locale); // 'en'

// Alle konfigurierten Sprachen abrufen
console.log(DOCMD_I18N_STRINGS.locales);
// [{ id: 'en', label: 'English' }, { id: 'hi', label: 'हिन्दी' }]
```

Mit dieser API können Sie einen benutzerdefinierten Sprachumschalter erstellen:

```html
<select onchange="DOCMD_I18N_STRINGS.switchLocale(this.value)">
  <option value="en">English</option>
  <option value="hi">हिन्दी</option>
</select>
```

### Ereignisse (Events)

Hören Sie auf das Ereignis `docmd:i18n-applied`, um benutzerdefinierte Logik auszuführen, nachdem die Strings angewendet wurden:

```js
document.addEventListener('docmd:i18n-applied', function(e) {
  console.log('Sprache:', e.detail.locale);
  console.log('Strings:', e.detail.strings);
});
```

::: callout info "Automatische Erkennung"
Das Skript erkennt die aktive Sprache anhand des URL-Pfad-Präfixes (z. B. `/hi/` → Hindi). Für die Standardsprache (gerendert unter `/`) prüft es den `localStorage` auf eine zuvor gespeicherte Präferenz. Die Funktion `switchLocale()` übernimmt die URL-Navigation automatisch.
:::

### In-Place-Modus (An Ort und Stelle)

Für One-Page-Websites (wie Landingpages) möchten Sie beim Sprachwechsel nicht zu einer anderen URL navigieren. Setzen Sie `inPlace: true` in Ihrer i18n-Konfiguration, um Strings ohne URL-Weiterleitung auszutauschen:

```js
// docmd.config.js
i18n: {
  defaultLocale: "en",
  locales: [
    { id: "en", label: "English" },
    { id: "zh", label: "中文" }
  ],
  inPlace: true
}
```

Mit `inPlace: true` lädt der Aufruf von `switchLocale()` das JSON für die neue Sprache neu und ersetzt alle `data-i18n`-Strings auf der aktuellen Seite — es findet keine Navigation statt.