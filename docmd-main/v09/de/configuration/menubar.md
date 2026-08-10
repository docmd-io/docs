---
title: "Menubar-Konfiguration"
description: "Konfigurieren Sie die obere Navigations-Menubar, Dropdown-Links, Brand-Logos und Utility-Menüs in docmd."
---

Die `menubar` ist eine primäre obere Navigationsleiste, die einen globalen Kontext über Ihre Dokumentations-Subsites hinweg bietet. Positionieren Sie sie als feste Leiste am absoluten oberen Rand des Viewports oder inline über dem Seiten-Header.

## Konfigurationsschema

Konfigurieren Sie Menubar-Elemente im `layout.menubar`-Block von `docmd.config.json`:

```json "docmd.config.json"
{
  "layout": {
    "menubar": {
      "enabled": true,
      "position": "top", 
      "left": [
        { "type": "title", "text": "Brand", "url": "/", "icon": "home" },
        { "text": "Documentation", "url": "/docs" },
        { 
          "type": "dropdown", 
          "text": "Ecosystem", 
          "items": [
            { "text": "GitHub", "url": "https://github.com/docmd-io/docmd" },
            { "text": "Live Editor", "url": "https://live.docmd.io" }
          ]
        }
      ],
      "right": [
        { "text": "Support", "url": "/support", "icon": "help-circle" }
      ]
    }
  }
}
```

### Konfigurationsoptionen

| Eigenschaft | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `Boolean` | `false` | Hauptschalter für die Sichtbarkeit der Menubar. |
| `position` | `String` | `'top'` | `'top'` (fest am absoluten oberen Rand des Viewports) oder `'header'` (inline über dem Seitentitel). |
| `left` | `Array` | `[]` | Linksbündige Navigationselemente der Menubar. |
| `right` | `Array` | `[]` | Rechtsbündige Navigationselemente der Menubar. |

## Unterstützte Elementtypen

Die `left`- und `right`-Arrays unterstützen drei primäre Elementtypen:

### 1. Standard-Link
Rendert einen Textlink mit optionalem Icon und Verhalten für neue Tabs:
- `text`: Text der Link-Beschriftung.
- `url`: Relativer Pfad oder externe URL.
- `icon`: Optionaler Lucide-Iconname.
- `external`: Bei `true` wird der Link in einem neuen Browser-Tab geöffnet.

### 2. Marken-Titel (Brand Title)
Setzen Sie `"type": "title"`, um gestaltete Marken-Header zu rendern (z. B. fette Schriftgewichte mit Home-Icon-Triggern).

### 3. Verschachteltes Dropdown-Menü
Setzen Sie `"type": "dropdown"` und stellen Sie ein `items`-Array bereit, um interaktive Flyout-Dropdown-Untermenüs zu rendern.

## Integration von Utility-Menüs

Um globale Utilities (wie Volltextsuche, Dunkel-/Hell-Theme-Umschalter und Sponsoring-Links) in der Menubar zu positionieren, setzen Sie `optionsMenu.position` auf `'menubar'`:

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "menubar"
    }
  }
}
```

Utilities richten sich automatisch am **rechten Bereich** aus und werden nach allen in `right` definierten benutzerdefinierten Links gerendert.

::: callout info title:"Neupositionierungs-Fallback" icon:sparkles
Wenn die `menubar` deaktiviert ist, während `optionsMenu.position` auf `'menubar'` gesetzt ist, fallen Utilities automatisch auf die Position `sidebar-top` zurück.
::: /callout

## Benutzerdefinierte Stile

Passen Sie das Menubar-Styling an, indem Sie benutzerdefinierte CSS-Eigenschaften in Ihren eigenen Stylesheets überschreiben. Siehe [Benutzerdefiniertes CSS & JS](../theming/custom-css-js.md):

```css
:root {
  --menubar-h: 56px;
  --menubar-bg: var(--bg-color);
  --menubar-border: var(--border-color);
  --menubar-text: var(--text-color);
}
```