---
title: "Menüleiste"
description: "Strukturieren und positionieren Sie Ihre Menüleiste, verwalten Sie Navigationslinks und konfigurieren Sie Dropdown-Menüs."
---

Die `menubar` ist eine hochwertige Navigationsebene. Sie bietet globalen Kontext auf Ihrer gesamten Site. Positionieren Sie sie als feste Leiste am oberen Rand des Viewports oder relativ über dem Seiten-Header.

## Konfiguration

Konfigurieren Sie die Menüleiste im `layout`-Abschnitt Ihrer `docmd.config.json`.

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

### Optionen

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `Boolean` | `false` | Schaltet die Sichtbarkeit der Menüleiste um. |
| `position` | `String` | `'top'` | `'top'` (fest am absoluten oberen Rand) oder `'header'` (über dem Seitentitel positioniert). |
| `left` | `Array` | `[]` | Linksbündige Navigationselemente. |
| `right` | `Array` | `[]` | Rechtsbündige Navigationselemente. |

## Elementtypen

Die `left`- und `right`-Arrays unterstützen verschiedene Elementtypen.

### 1. Standard-Link
Der häufigste Elementtyp.
- `text`: Anzeigetext.
- `url`: Pfad oder externe URL.
- `icon`: Optionaler Lucide-Iconname.
- `external`: Auf `true` setzen, um in einem neuen Tab zu öffnen.

### 2. Titel (Marke)
Setzen Sie `type: 'title'`, um Markenstile anzuwenden (z. B. fette Schrift).

### 3. Dropdown-Menü
Setzen Sie `type: 'dropdown'` und stellen Sie ein `items`-Array bereit, um ein verschachteltes Menü zu erstellen.

## Utility-Integration

Hosten Sie die globale Suche und den Theme-Toggle in der Menüleiste. Setzen Sie `optionsMenu.position` auf `'menubar'`.

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "menubar"
    }
  }
}
```

Das Optionsmenü richtet sich automatisch am **rechten Bereich** aus. Es erscheint nach allen in `right` definierten Links.

::: callout info "Automatischer Fallback"
Wenn die `menubar` deaktiviert ist, fallen zugewiesene Utilities automatisch auf die Position `sidebar-top` zurück.
:::

## Eigene Gestaltung

Verwenden Sie CSS-Variablen in Ihren eigenen Stylesheets, um das Erscheinungsbild der Menüleiste anzupassen. Details finden Sie unter [Eigene CSS & JS](../theming/custom-css-js.md).

```css
:root {
  --menubar-h: 56px;
  --menubar-bg: var(--bg-color);
  --menubar-border: var(--border-color);
  --menubar-text: var(--text-color);
}
```