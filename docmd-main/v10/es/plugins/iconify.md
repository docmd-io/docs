---
title: "Plugin de iconos Iconify"
description: "Integración de iconos vectoriales bajo demanda con soporte para más de 200.000 iconos de código abierto y cero sobrecarga en el cliente."
---

El plugin `@docmd/plugin-iconify` amplía el sistema de iconos de `docmd` más allá de los iconos integrados de Lucide, proporcionando acceso bajo demanda a más de 200.000 iconos vectoriales procedentes de más de 100 colecciones populares como Material Design Icons, IBM Carbon, Tabler, FontAwesome, Solar y Simple Icons.

Los iconos se obtienen e incrustan directamente como SVG limpios en tiempo de compilación, se guardan en una caché local en disco y no generan ninguna carga de ejecución JavaScript en el cliente.

::: callout success title:"Cero sobrecarga en el cliente" icon:zap
Dado que los SVG se resuelven e incrustan durante la fase de compilación estática, su sitio web no experimenta incremento en el tamaño de los paquetes del cliente ni retrasos en la carga de fuentes web, sin importar cuántas colecciones distintas utilice.
:::

## Instalación y configuración

Instale el plugin a través de la CLI:

```bash
npx @docmd/core add iconify
```

Active el plugin en `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "iconify": {
      "enabled": true
    }
  }
}
```

::: callout tip title:"Instalación automática" icon:sparkles
Si declara `@docmd/plugin-iconify` en su `docmd.config.json` antes de haberlo instalado localmente, `docmd` lo descargará e instalará automáticamente durante la siguiente compilación.
:::

## Opciones de configuración

Configure las opciones en `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "iconify": {
      "enabled": true
    }
  }
}
```

| Opción | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Activa o desactiva globalmente la resolución de iconos bajo demanda mediante Iconify. |

## Capacidades principales

* **Más de 200.000 iconos**: Acceso a prácticamente cualquier colección de código abierto sin instalar dependencias de fuentes o paquetes individuales.
* **Incrustación SVG en compilación**: Los iconos se resuelven e insertan como elementos SVG puros en el HTML final, preservando la velocidad de carga.
* **Caché en disco local**: Los iconos descargados se almacenan en `.docmd/cache/icons/`, acelerando compilaciones posteriores y facilitando el trabajo sin conexión.
* **Marcador de posición sin conexión**: Si un icono no puede descargarse de la red, se inserta un SVG de respaldo para no romper la maquetación.
* **Integración total con contenedores**: Compatible con todos los contenedores de `docmd` (llamadas de atención, botones, tarjetas, pestañas y etiquetas).
* **Diagnóstico con docmd doctor**: Comprobación de salud integrada para auditar el estado de la caché y la integridad del resolvedor.

## Uso y sintaxis de iconos

Utilice la propiedad `icon:` en cualquier componente contenedor. El resolvedor admite sintaxis separada por dos puntos o por guiones:

| Formato de sintaxis | Ejemplo | Descripción |
| :--- | :--- | :--- |
| `iconify:<colección>:<icono>` | `icon:iconify:mdi:home` | Formato estándar separado por dos puntos |
| `iconify:<colección>-<icono>` | `icon:iconify:carbon-logo-github` | Prefijo con dos puntos y nombre con guión |
| `iconify-<colección>:<icono>` | `icon:iconify-solar:shield-check-bold` | Prefijo con guión y separador de dos puntos |
| `iconify-<colección>-<icono>` | `icon:iconify-tabler-brand-docker` | Abreviatura completamente con guiones |

::: callout info title:"Fallback a Lucide" icon:info
Los nombres de iconos estándar sin el prefijo `iconify:` o `iconify-` (como `icon:rocket` o `icon:shield-check`) continúan resolviéndose como iconos nativos de Lucide mediante el núcleo de `docmd`.
:::

### Ejemplos en contenedores

#### Llamadas de atención (Callouts)

```markdown
::: callout icon:iconify:mdi:home title:"Bienvenido"
Bienvenido a nuestro portal de documentación.
:::

::: callout success title:"Seguridad verificada" icon:iconify-solar:shield-check-bold
El cifrado de extremo a extremo y los registros de auditoría están activos.
:::
```

::: callout icon:iconify:mdi:home title:"Bienvenido"
Bienvenido a nuestro portal de documentación.
:::

::: callout success title:"Seguridad verificada" icon:iconify-solar:shield-check-bold
El cifrado de extremo a extremo y los registros de auditoría están activos.
:::

#### Botones

```markdown
::: button "Repositorio en GitHub" external:https://github.com/docmd-io/docmd icon:iconify:carbon:logo-github
::: button "Comunidad en Discord" external:https://discord.gg/docmd icon:iconify:simple-icons:discord
```

::: button "Repositorio en GitHub" external:https://github.com/docmd-io/docmd icon:iconify:carbon:logo-github
::: button "Comunidad en Discord" external:https://discord.gg/docmd icon:iconify:simple-icons:discord

#### Tarjetas (Cards)

```markdown
::: card title:"Despliegue con Docker" icon:iconify:tabler:brand-docker
Despliegue sitios de documentación en contenedores con imágenes ligeras de Alpine Linux.
:::

::: card title:"Google Cloud Platform" icon:iconify:simple-icons:googlecloud
Aloje activos estáticos y entornos sin servidor en Cloud Storage y Cloud Run.
:::
```

::: card title:"Despliegue con Docker" icon:iconify:tabler:brand-docker
Despliegue sitios de documentación en contenedores con imágenes ligeras de Alpine Linux.
:::

::: card title:"Google Cloud Platform" icon:iconify:simple-icons:googlecloud
Aloje activos estáticos y entornos sin servidor en Cloud Storage y Cloud Run.
:::

#### Pestañas (Tabs)

````markdown
::: tabs
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
:::
````

::: tabs
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
:::

#### Etiquetas (Tags)

```markdown
::: tag "Listo para producción" icon:iconify:solar:verified-check-bold color:green
::: tag "Paquete npm" icon:iconify:simple-icons:npm color:red
```

::: tag "Listo para producción" icon:iconify:solar:verified-check-bold color:green
::: tag "Paquete npm" icon:iconify:simple-icons:npm color:red

## Colecciones populares disponibles

A continuación se muestran algunas de las colecciones más utilizadas en Iconify:

| ID de colección | Nombre de la colección | Sintaxis de ejemplo | Caso de uso recomendado |
| :--- | :--- | :--- | :--- |
| `mdi` | Material Design Icons | `icon:iconify:mdi:home` | Interfaces generales, utilidades y diseño Material |
| `carbon` | IBM Carbon Design | `icon:iconify:carbon:logo-github` | Herramientas de desarrollo, arquitectura cloud y sistemas |
| `tabler` | Tabler Icons | `icon:iconify:tabler:brand-docker` | Trazos claros y estética moderna |
| `solar` | Solar Icons | `icon:iconify-solar:shield-check-bold` | Iconos gruesos modernos y variantes bitono |
| `simple-icons` | Simple Icons | `icon:iconify:simple-icons:googlecloud` | Logotipos de marcas, lenguajes, bases de datos y plataformas |
| `fa6-solid` | FontAwesome 6 Solid | `icon:iconify:fa6-solid:server` | Iconos sólidos tradicionales e infraestructura |
| `fa6-brands` | FontAwesome 6 Brands | `icon:iconify:fa6-brands:aws` | Marcas de proveedores y empresas |
| `ph` | Phosphor Icons | `icon:iconify:ph:lightning-bold` | Biblioteca geométrica y versátil |

::: button "Explorar más de 200.000 iconos en Iconify" external:https://icon-sets.iconify.design/ icon:external-link

## Estilos CSS personalizados

Los iconos generados mediante `@docmd/plugin-iconify` incluyen la clase CSS `.iconify-icon` y una clase específica por colección `.icon-<colección>-<nombre>`.

Personalice sus iconos en `customCss`:

```css
/* Estilo general para iconos Iconify */
.iconify-icon {
  vertical-align: middle;
  transition: transform 0.15s ease;
}

/* Selección por colección */
.iconify-icon[class*="icon-mdi-"] {
  fill: currentColor;
}

/* Selección de iconos individuales */
.icon-simple-icons-googlecloud {
  color: #4285f4;
}

.icon-carbon-logo-github {
  color: var(--text-color, #24292f);
}
```

## Diagnóstico previo al despliegue

Verifique el estado operativo de `@docmd/plugin-iconify` y la cantidad de iconos en caché con `docmd doctor`:

```bash
npx @docmd/core doctor
```

```text
  Plugins
  ────────────────────────────────────────────────────────────
  ✓ Iconify Integration: Active with support for 200,000+ open-source icons (cached: 14)
```
