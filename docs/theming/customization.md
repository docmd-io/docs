---
title: "Customization & Variables"
description: "Master the look of your docs by overriding CSS variables and targeting component classes."
---

`docmd` uses a "CSS Variable First" architecture. Instead of writing complex CSS rules, you can change the look of your entire site by redefining a few core variables in your `customCss`.

## Variables Reference

### Core Colors
| Variable | Usage |
| :--- | :--- |
| `--bg-color` | The main page background. |
| `--text-color` | Standard paragraph text color. |
| `--text-heading` | Contrast color for H1, H2, etc. |
| `--link-color` | Color for hyperlinks and active states. |
| `--border-color` | Standard divider and border color. |

### Visual Polish
| Variable | Usage |
| :--- | :--- |
| `--ui-element-size` | Height and width for utility buttons (32px). |
| `--ui-radius` | Corner rounding for buttons and cards (6px). |
| `--sidebar-width` | Width of the navigation column (260px). |

## CSS Class Reference

For advanced styling, you can target these classes in your `customCss`:

| Class | Target Element |
| :--- | :--- |
| `.page-header` | The sticky top bar. |
| `.sidebar-nav` | The navigation tree container. |
| `.nav-category-label`| Non-clickable menu headers. |
| `.main-content` | The wrapper for your Markdown content. |
| `.docmd-heading` | Container for H2-H4 (includes permalink anchor). |
| `.heading-anchor` | The permalink chain icon. |
| `.footer-complete` | The advanced multi-column footer. |

## Plugin Component Styling
Plugins inject their own classes for targeting:
*   **Search:** `.docmd-search-modal`, `.search-result-item`.
*   **Containers:** `.callout`, `.card`, `.docmd-tabs`, `.steps`.

## Adding Custom CSS

1.  Create a file in your project: `assets/css/brand.css`.
2.  Add your overrides:
    ```css
    :root { --link-color: #ff5733; }
    ```
3.  Register it in `docmd.config.js`:
    ```javascript
    theme: {
      customCss: ['assets/css/brand.css']
    }
    ```