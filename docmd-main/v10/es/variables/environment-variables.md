---
title: Referencia de Variables de Entorno
description: Cómo inyectar variables de entorno de CI/CD y del sistema en la documentación y configuración de docmd mediante env.* y DOCMD_VAR_*.
---

# Referencia de Variables de Entorno

docmd permite inyectar variables de entorno del sistema directamente en su documentación, facilitando la integración fluida con pipelines de CI/CD como GitHub Actions, GitLab CI, Vercel o Netlify.

## Acceso mediante `env.*`

Cualquier variable de entorno disponible durante la compilación puede consultarse utilizando el prefijo `env.`:

```markdown
Desplegado en entorno: **\{{ env.ENVIRONMENT || 'development' }}**.
ID de Compilación: `\{{ env.GITHUB_RUN_ID || 'local' }}`
Rama: `\{{ env.GITHUB_REF_NAME || 'main' }}`
```

### Valores por Defecto (Fallbacks)

Dado que las variables de entorno pueden no estar presentes localmente, especifique siempre un fallback mediante `||`:

```markdown
Punto de conexión de pruebas:
`\{{ env.STAGING_GATEWAY_URL || "https://sandbox.gateway.io" }}`
```

## Promoción Zero-Prefix vía `DOCMD_VAR_*`

Para evitar escribir el prefijo `env.` en documentos Markdown, las variables con prefijo `DOCMD_VAR_` se promueven automáticamente al nivel superior:

```bash
# En su pipeline o archivo .env:
export DOCMD_VAR_API_HOST="https://api.production.internal"
export DOCMD_VAR_RELEASE_CHANNEL="beta"
```

En sus documentos Markdown:

```markdown
El servidor es `\{{ API_HOST }}`.
Canal de publicación: **\{{ RELEASE_CHANNEL }}**.
```

::: callout info "Acceso Dual" icon:layers
Ambas variables también pueden seguir referenciándose mediante su nombre completo (`\{{ DOCMD_VAR_API_HOST }}`).
:::

::: callout warning "Credenciales y Secretos Confidenciales" icon:shield-alert
¡Nunca exponga claves secretas o contraseñas en variables de compilación! Todo lo resuelto durante `docmd build` queda visible en el código HTML generado. Para credenciales privadas de usuario, utilice la personalización en cliente (`window.docmd.var.set`).
:::

## Integración con Pipelines CI/CD

Siga estos pasos para suministrar metadatos dinámicos a su documentación:

::: steps
::: step "Declarar Variables en la Pipeline" icon:settings
Configure su pipeline para exportar las variables necesarias (por ejemplo, con prefijo `DOCMD_VAR_`).
:::

::: step "Ejecutar el Compilador" icon:terminal
Ejecute `docmd build`. El compilador lee automáticamente `process.env`.
:::

::: step "Publicar la Documentación" icon:cloud
El directorio de salida contiene HTML estático con todos los valores integrados.
:::
::: /steps

### Ejemplos de Pipeline

::: tabs
::: tab "GitHub Actions" icon:github
```yaml
name: Deploy Documentation

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Compilar Documentación
        run: npx @docmd/core build
        env:
          DOCMD_VAR_DEPLOYED_AT: ${{ github.event.head_commit.timestamp }}
          DOCMD_VAR_BUILD_ID: ${{ github.run_id }}
          DOCMD_VAR_COMMIT_SHA: ${{ github.sha }}
          ENVIRONMENT: production
```
::: /tab

::: tab "GitLab CI" icon:gitlab
```yaml
deploy_docs:
  image: node:22
  stage: deploy
  script:
    - npx @docmd/core build
  variables:
    DOCMD_VAR_DEPLOYED_AT: $CI_PIPELINE_CREATED_AT
    DOCMD_VAR_BUILD_ID: $CI_PIPELINE_ID
    ENVIRONMENT: production
  artifacts:
    paths:
      - site/
```
::: /tab
::: /tabs
