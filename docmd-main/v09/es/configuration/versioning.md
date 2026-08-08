---
title: "Motor de control de versiones"
description: "Sirva documentación de múltiples versiones con cambio de versión fluido, preservación de rutas URL fijas y salidas de compilación aisladas en docmd."
---

`docmd` cuenta con un motor de control de versiones nativo que le permite administrar y servir múltiples versiones de lanzamientos simultáneamente. El compilador gestiona automáticamente el enrutamiento de URL, los menús de selección de versiones y la preservación del estado de navegación fija.

## Organización de directorios

Organice la documentación en directorios fuente versionados. La convención estándar mantiene la versión activa actual en `docs/` y los lanzamientos heredados o de vista previa en directorios con el prefijo `docs-`:

```text
mi-proyecto/
├── docs/           # Lanzamiento activo actual (Principal)
├── docs-v1/        # Lanzamiento heredado
├── docmd.config.json
```

## Esquema de configuración

<img width="500" class="with-border" src="/assets/previews/menu-versioning.webp">

Configure las versiones en el bloque `versions` de `docmd.config.json`:

```json "docmd.config.json"
{
  "versions": {
    "current": "v2",           
    "position": "sidebar-top", 
    "all": [
      { "id": "v2", "dir": "docs",    "label": "v2.x (Última)" },
      { "id": "v1", "dir": "docs-v1", "label": "v1.x" }
    ]
  }
}
```

## Características principales del motor

### 1. Ruta SEO raíz (Versión activa)
La versión `current` se compila directamente en la raíz de su sitio (por ejemplo, `ejemplo.com/`). Esto garantiza que el tráfico de búsqueda orgánica y los enlaces externos lleguen a su documentación más reciente.

### 2. Subdirectorios de versión aislados
Los lanzamientos que no son actuales se compilan en subcarpetas dedicadas nombradas según su `id`:
- `v2` (Lanzamiento activo) → `ejemplo.com/`
- `v1` (Lanzamiento heredado) → `ejemplo.com/v1/`

### 3. Preservación de ruta fija
Cuando los lectores cambian entre versiones usando el selector desplegable, `docmd` conserva las ubicaciones de rutas relativas. Si un usuario está leyendo `ejemplo.com/getting-started` y cambia a **v1**, es redirigido automáticamente a `ejemplo.com/v1/getting-started` (si existe el documento de destino).

### 4. Aislamiento de recursos estáticos
Cada versión hereda los recursos compartidos del directorio global `assets/`. El compilador aísla los recursos compilados durante la compilación para evitar conflictos de estilos o scripts entre versiones.

### 5. Barras laterales de navegación específicas por versión
Cada versión puede mantener un manifiesto `navigation.json` independiente. Consulte la [Configuración de navegación](./navigation.md) para conocer los detalles de la resolución en cascada.

## Directrices para el control de versiones

1. **ID amigables con URL**: Utilice identificadores alfanuméricos concisos como `v1`, `v2` o `beta`.
2. **Jerarquías de archivos consistentes**: Mantenga estructuras de directorio paralelas entre versiones para maximizar la precisión del cambio de ruta fija.
3. **Archivo de configuración único**: No cree manifiestos de configuración separados para cada versión; `docmd` procesa todas las versiones en una sola pasada de compilación unificada.