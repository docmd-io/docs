---
title: "Iconify-Icons-Plugin"
description: "On-Demand-Vektor-Icon-Integration für über 200.000+ Open-Source-Icons ohne clientseitigen Laufzeit-Overhead."
---

Das `@docmd/plugin-iconify`-Plugin erweitert das Icon-System von `docmd` über die integrierten Lucide-Icons hinaus und bietet Ihnen On-Demand-Zugriff auf über 200.000+ Open-Source-Vektor-Icons aus mehr als 100 beliebten Icon-Sets, darunter Material Design Icons, IBM Carbon, Tabler, FontAwesome, Solar und Simple Icons.

Icons werden zur Build-Zeit direkt als saubere SVGs abgerufen und eingebettet, lokal auf der Festplatte zwischengespeichert und verursachen keinerlei clientseitigen JavaScript-Overhead.

::: callout success title:"Kein Client-Overhead" icon:zap
Da SVGs während der statischen Build-Phase aufgelöst und eingebettet werden, entstehen auf Ihrer Website keine zusätzlichen Client-Bundle-Größen oder Verzögerungen beim Laden von Webfonts – unabhängig davon, wie viele verschiedene Icon-Sets Sie verwenden.
:::

## Installation & Einrichtung

Installieren Sie das Plugin über die CLI:

```bash
npx @docmd/core add iconify
```

Aktivieren Sie das Plugin in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "iconify": {
      "enabled": true
    }
  }
}
```

::: callout tip title:"Automatische Installation" icon:sparkles
Wenn `@docmd/plugin-iconify` in `docmd.config.json` deklariert ist, bevor es lokal installiert wurde, lädt `docmd` es beim nächsten Build automatisch herunter und installiert es.
:::

## Plugin-Konfiguration

Konfigurieren Sie die Optionen in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "iconify": {
      "enabled": true
    }
  }
}
```

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Aktiviert oder deaktiviert die On-Demand-Iconauflösung über Iconify global. |

## Hauptmerkmale

* **Über 200.000 Icons**: Zugriff auf praktisch jedes Open-Source-Icon-Set ohne separate Bibliotheken oder Font-Stylesheets.
* **SVG-Inlining zur Build-Zeit**: SVGs werden während der Kompilierung direkt in das HTML eingebettet, wodurch blitzschnelle Seitenladezeiten erhalten bleiben.
* **Lokales Disk-Caching**: Heruntergeladene Icons werden unter `.docmd/cache/icons/` zwischengespeichert, was nachfolgende Builds beschleunigt und Offline-Entwicklung ermöglicht.
* **Offline-Fallback**: Wenn ein Icon nicht über das Netzwerk geladen werden kann, sorgt ein klarer SVG-Platzhalter für Layout-Stabilität.
* **Nahtlose Container-Unterstützung**: Funktioniert in allen `docmd`-Containern wie Callouts, Buttons, Karten, Tabs und Tags.
* **Doctor-Diagnose**: Integrierter Gesundheitscheck mit `docmd doctor` prüft den Cache-Status und die Integrität des Resolvers.

## Verwendung & Icon-Syntax

Verwenden Sie die Eigenschaft `icon:` an jeder beliebigen Container-Komponente. Der Resolver unterstützt sowohl Doppelpunkt- als auch Bindestrich-Schreibweisen:

| Syntax-Format | Beispiel | Beschreibung |
| :--- | :--- | :--- |
| `iconify:<sammlung>:<icon>` | `icon:iconify:mdi:home` | Standardformat mit Doppelpunkt |
| `iconify:<sammlung>-<icon>` | `icon:iconify:carbon-logo-github` | Doppelpunkt-Präfix mit Bindestrich-Name |
| `iconify-<sammlung>:<icon>` | `icon:iconify-solar:shield-check-bold` | Bindestrich-Präfix mit Doppelpunkt |
| `iconify-<sammlung>-<icon>` | `icon:iconify-tabler-brand-docker` | Vollständig mit Bindestrichen |

::: callout info title:"Lucide-Fallback" icon:info
Standard-Icon-Namen ohne das Präfix `iconify:` oder `iconify-` (z. B. `icon:rocket` oder `icon:shield-check`) werden weiterhin über `docmd`-Core als integrierte Lucide-Icons aufgelöst.
:::

### Beispiele in Containern

#### Callouts

```markdown
::: callout icon:iconify:mdi:home title:"Willkommen"
Willkommen auf unserem Dokumentationsportal.
:::

::: callout success title:"Sicherheit bestätigt" icon:iconify-solar:shield-check-bold
Ende-zu-Ende-Verschlüsselung und Überwachung sind aktiv.
:::
```

#### Buttons

```markdown
::: button "GitHub Repository" external:https://github.com/docmd-io/docmd icon:iconify:carbon:logo-github
::: button "Discord beitreten" external:https://discord.gg/docmd icon:iconify:simple-icons:discord
```

#### Karten (Cards)

```markdown
::: card title:"Docker Bereitstellung" icon:iconify:tabler:brand-docker
Containerisierte Dokumentationsseiten mit leichtgewichtigen Alpine-Linux-Images bereitstellen.
:::

::: card title:"Google Cloud Platform" icon:iconify:simple-icons:googlecloud
Statische Assets und Serverless-Runtimes auf Cloud Storage und Cloud Run hosten.
:::
```

#### Tabs

```markdown
== tab "Docker Compose" icon:iconify:tabler:brand-docker
```yaml
services:
  docs:
    image: ghcr.io/docmd-io/docmd:latest
    ports:
      - "3000:3000"
```

== tab "Kubernetes" icon:iconify:simple-icons:kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: docmd-site
```
```

#### Tags

```markdown
::: tag "Produktionsreif" icon:iconify:solar:verified-check-bold color:green
::: tag "npm Paket" icon:iconify:simple-icons:npm color:red
```

## Beliebte Icon-Sammlungen

Nachfolgend finden Sie gängige Icon-Sammlungen, die über Iconify verfügbar sind:

| Sammlungs-ID | Name der Sammlung | Beispiel-Syntax | Anwendungsfall |
| :--- | :--- | :--- | :--- |
| `mdi` | Material Design Icons | `icon:iconify:mdi:home` | Allgemeine Benutzeroberfläche und Material Design |
| `carbon` | IBM Carbon Design | `icon:iconify:carbon:logo-github` | Entwicklertools, Cloud-Architektur und Systeme |
| `tabler` | Tabler Icons | `icon:iconify:tabler:brand-docker` | Moderne, klare Konturlinien |
| `solar` | Solar Icons | `icon:iconify-solar:shield-check-bold` | Moderne fette und Duotone-Icons |
| `simple-icons` | Simple Icons | `icon:iconify:simple-icons:googlecloud` | Logos von Marken, Sprachen, Datenbanken und Tech-Plattformen |
| `fa6-solid` | FontAwesome 6 Solid | `icon:iconify:fa6-solid:server` | Klassische solide Icons und Infrastruktursymbole |
| `fa6-brands` | FontAwesome 6 Brands | `icon:iconify:fa6-brands:aws` | Beliebte Firmen- und Markenlogos |
| `ph` | Phosphor Icons | `icon:iconify:ph:lightning-bold` | Flexible geometrische Icon-Bibliothek |

::: button "Über 200.000 Iconify-Icons durchsuchen" external:https://icon-sets.iconify.design/ icon:external-link

## Benutzerdefiniertes CSS-Styling

Icons, die über `@docmd/plugin-iconify` gerendert werden, enthalten die CSS-Klasse `.iconify-icon` sowie eine sammlungsspezifische Klasse `.icon-<sammlung>-<name>`.

Passen Sie Icons in Ihrem `customCss` an:

```css
/* Alle Iconify-Icons anpassen */
.iconify-icon {
  vertical-align: middle;
  transition: transform 0.15s ease;
}

/* Bestimmte Sammlungen ansprechen */
.iconify-icon[class*="icon-mdi-"] {
  fill: currentColor;
}

/* Einzelne Icons ansprechen */
.icon-simple-icons-googlecloud {
  color: #4285f4;
}

.icon-carbon-logo-github {
  color: var(--text-color, #24292f);
}
```

## Vorflug-Diagnose

Überprüfen Sie den Status von `@docmd/plugin-iconify` mit `docmd doctor`:

```bash
npx @docmd/core doctor
```

```text
  Plugins
  ────────────────────────────────────────────────────────────
  ✓ Iconify Integration: Active with support for 200,000+ open-source icons (cached: 14)
```
