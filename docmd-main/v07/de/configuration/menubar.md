---
title: "Menüleiste"
description: "Strukturieren und positionieren Sie Ihre Menüleiste, verwalten Sie Navigationslinks und konfigurieren Sie Dropdown-Menüs."
---

Die `menubar` ist eine Navigationsschicht, die globalen Kontext über Ihre gesamte Dokumentationsseite hinweg bietet. Sie kann als fixierte Leiste am oberen Rand des Ansichtsbereichs oder als relatives Element über dem Seiten-Header positioniert werden.

## Konfiguration

Die Menüleiste wird im Bereich `layout` Ihrer `docmd.config.js` konfiguriert.

```javascript
export default defineConfig({
  layout: {
    menubar: {
      enabled: true,
      position: 'top', // 'top' (fixiert) oder 'header' (inline)
      left: [
        { type: 'title', text: 'Marke', url: '/', icon: 'home' },
        { text: 'Dokumentation', url: '/docs' },
        { 
          type: 'dropdown', 
          text: 'Ökosystem', 
          items: [
            { text: 'GitHub', url: 'https://github.com/docmd-io/docmd', external: true },
            { text: 'Live Editor', url: 'https://live.docmd.io' }
          ]
        }
      ],
      right: [
        { text: 'Support', url: '/support', icon: 'help-circle' }
      ]
    }
  }
});
```

### Optionen

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `Boolean` | `false` | Schaltet die Sichtbarkeit der Menüleiste ein/aus. |
| `position` | `String` | `'top'` | `'top'` (fixiert ganz oben) oder `'header'` (über dem Seitentitel positioniert). |
| `left` | `Array` | `[]` | Navigationselemente, die links ausgerichtet sind. |
| `right` | `Array` | `[]` | Navigationselemente, die rechts ausgerichtet sind. |

## Element-Typen

Die Arrays `left` und `right` unterstützen verschiedene Element-Typen, um Ihre Navigation effektiv zu strukturieren:

### 1. Standard-Link
Der am häufigsten verwendete Element-Typ.
- `text`: Anzeigename.
- `url`: Pfad oder externe URL.
- `icon`: Optionaler Name eines Lucide-Icons.
- `external`: Auf `true` setzen, um in einem neuen Tab zu öffnen.

### 2. Titel (Marke)
Setzen Sie `type: 'title'`, um Branding-Styles (normalerweise fett oder mit einer spezifischen Schriftstärke) auf den Link anzuwenden.

### 3. Dropdown-Menü
Setzen Sie `type: 'dropdown'` und geben Sie ein `items`-Array an, um ein verschachteltes Menü zu erstellen.

## Werkzeug-Integration

Sie können die globale Suche und den Theme-Umschalter in der Menüleiste unterbringen, indem Sie `optionsMenu.position` auf `'menubar'` setzen.

```javascript
layout: {
  optionsMenu: {
    position: 'menubar'
  }
}
```

Bei der Integration wird das Optionsmenü automatisch im **rechten Bereich** der Menüleiste ausgerichtet und erscheint nach allen im `right`-Array definierten Links.

::: callout info
Wenn die `menubar` deaktiviert ist, fallen alle ihr zugewiesenen Werkzeugkomponenten automatisch auf die Position `sidebar-top` zurück.
:::

## Benutzerdefiniertes Styling

Sie können das Erscheinungsbild der Menüleiste mithilfe von CSS-Variablen in Ihren `customCss`-Dateien anpassen:

```css
:root {
  --menubar-height: 56px;
  --menubar-bg: var(--docmd-bg-secondary);
  --menubar-border: var(--docmd-border-color);
  --menubar-text: var(--docmd-text-primary);
}
```