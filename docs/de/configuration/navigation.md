---
title: "Navigations-Konfiguration"
description: "Strukturieren Sie Ihre Seitenleiste, kategorisieren Sie Links und weisen Sie Icons für menschliche Leser und LLMs zu."
---

`docmd` bietet Ihnen die volle Kontrolle über die Struktur Ihrer Website. Durch die Definition Ihrer `navigation` in der `docmd.config.js` erstellen Sie eine logische Hierarchie, die das Single Page Application (SPA) Erlebnis optimiert und eine klare Kontext-Map für KI-Modelle und Suchmaschinen bereitstellt.

## Das Navigations-Array

<!-- SCREENSHOT: Seitenleisten-Navigation, die eine zweistufige Hierarchie mit Icons, eine hervorgehobene aktive Seite und eine ausklappbare Gruppe zeigt. -->

Jedes Objekt im Array definiert einen **Link** oder eine **Kategorie-Gruppe**.

```javascript
export default defineConfig({
  navigation: [
    { title: 'Home', path: '/', icon: 'home' },
    { title: 'Installation', path: '/getting-started/installation', icon: 'download' }
  ]
});
```

## Verfügbare Eigenschaften

| Eigenschaft | Typ | Erforderlich | Beschreibung |
| :--- | :--- | :--- | :--- |
| **`title`** | `String` | Ja | Der Anzeigetext für den Link oder die Kategorie. |
| **`path`** | `String` | Nein | Ziel-URL. Muss für lokale Pfade mit `/` beginnen. |
| **`icon`** | `String` | Nein | Name eines [Lucide Icons](https://lucide.dev/icons) (z. B. `rocket`). |
| **`children`** | `Array` | Nein | Verschachtelte Elemente zum Erstellen eines Untermenüs oder einer Gruppe. |
| **`collapsible`**| `Boolean` | Nein | Wenn `true`, kann die Gruppe vom Benutzer aus- oder eingeklappt werden. |
| **`external`** | `Boolean` | Nein | Wenn `true`, wird der Link in einem neuen Browser-Tab geöffnet. |

## Gruppen organisieren

Sie können Navigationselemente verschachteln, um tiefe Hierarchien zu erstellen. Es gibt zwei Hauptwege, Gruppen zu organisieren:

### 1. Klickbare Gruppe (Verzeichnis mit Index)
Wenn das übergeordnete Element einen `path` hat, navigiert ein Klick auf das Label zu dieser Seite und klappt automatisch die untergeordneten Elemente in der Seitenleiste aus.

```javascript
{
  title: 'Cloud-Einrichtung',
  path: '/cloud/overview', 
  children: [
    { title: 'AWS', path: '/cloud/aws' },
    { title: 'GCP', path: '/cloud/gcp' }
  ]
}
```

### 2. Statisches Label (Kategorie-Überschrift)
Wenn Sie den **`path` weglassen**, wird das Element zu einer statischen Kategorie-Überschrift. Dies ist der empfohlene Ansatz für die Gruppierung verwandter technischer Abschnitte, die keine gemeinsame Landingpage haben.

```javascript
{
  title: 'Inhalt & Formatierung',
  icon: 'layout',
  children: [
    { title: 'Syntax-Leitfaden', path: '/content/syntax' },
    { title: 'Container', path: '/content/containers' }
  ]
}
```

## Automatische Breadcrumbs

<!-- SCREENSHOT: Breadcrumb-Leiste über dem Seitentitel, die „Home > Erste Schritte > Installation“ mit klickbaren Links zeigt. -->

`docmd` generiert automatisch Breadcrumbs für jede Seite basierend auf Ihrer Navigationshierarchie. Diese Pfadnavigation wird über dem Hauptseitentitel gerendert, um die Orientierung und Navigationsgeschwindigkeit zu verbessern.

### Verhalten
*   **Auto-Auflösung**: Die Engine verfolgt den Pfad durch Ihren `navigation`-Baum, um die Vorfahren der aktuellen Seite zu identifizieren.
*   **Aktiver Status**: Die aktuelle Seite wird als letztes, nicht verlinktes Element aufgeführt.
*   **Mobile Unterstützung**: Breadcrumbs werden auf kleineren Bildschirmen intelligent angepasst oder ausgeblendet, um Platz im Header zu sparen.

### Breadcrumbs deaktivieren
Breadcrumbs sind standardmäßig aktiviert. Um sie website-weit zu deaktivieren, aktualisieren Sie Ihre `docmd.config.js`:

```javascript
layout: {
  breadcrumbs: false
}
```

## Priorität der Navigationsauflösung

`docmd` bietet ein flexibles, kaskadierendes Auflösungssystem. Dies ermöglicht es Ihnen, eine zentrale Navigationskonfiguration beizubehalten, während Sie spezifische Teile für verschiedene Sprachen oder Versionen überschreiben.

Die Auflösung folgt einer „Die am nächsten liegende Datei gewinnt“-Logik, basierend auf der Ordnerverschachtelung. Die Hierarchie ist wie folgt aufgebaut (von der höchsten zur niedrigsten Priorität):

```text
mein-projekt/
├── docmd.config.js           [Ebene 3: Globale Konfig. Navigation] - Niedrigste Priorität
├── docs-v1/ 
│   ├── navigation.json       [Ebene 2: Versions-Navigation] - Mittlere Priorität
│   └── zh/
│       └── navigation.json   [Ebene 1: Sprach-Navigation] - Höchste Priorität
```

1. **Ebene 1: Sprachspezifisch** (`docs-v1/zh/navigation.json`): Überschreibt alles für das spezifische Locale und die Version.
2. **Ebene 2: Versionsspezifisch** (`docs-v1/navigation.json`): Überschreibt die globale Konfiguration für alle Sprachen in dieser Version.
3. **Ebene 3: Globale Konfiguration** (`config.navigation`): Der endgültige Fallback, der in Ihrer Stammkonfigurationsdatei definiert ist.

### Intelligente Fehlerkorrektur (Smart Broken-Link Filtering)
Selbst wenn auf eine übergeordnete Konfiguration zurückgegriffen wird (Ebene 2 oder 3), filtert `docmd` automatisch Seitenleistenelemente heraus, die auf Dateien verweisen, welche im Quellordner der aktuellen Version nicht existieren. Dies garantiert, dass keine defekten Links entstehen, wenn Benutzer eine ältere Version auswählen.

### JSON-Struktur
Jede `navigation.json` muss der Standard-Array-Struktur folgen:

```json
[
  { "title": "Home", "path": "/" },
  { "title": "Versionshinweise", "path": "/release-notes" }
]
```

## Integration von Icons

`docmd` wird mit der gesamten **Lucide** Icon-Bibliothek ausgeliefert. Verwenden Sie einfach den Icon-Namen in Kebab-Case (z. B. `brain-circuit`, `terminal`, `settings`).

::: callout tip
Verwenden Sie aussagekräftige `title`-Schlüssel, auch wenn der Seiteninhalt mit einer Überschrift beginnt. Klare, konsistente Navigations-Titel ermöglichen es KI-Agenten (die `llms-full.txt` nutzen), mühelos eine genaue mentale Karte Ihrer Projektstruktur aufzubauen.
:::