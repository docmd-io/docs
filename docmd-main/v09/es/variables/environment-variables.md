---
title: Referencia de Variables de Entorno
description: Cómo transmitir variables de entorno de CI/CD y del sistema a la documentación y configuración de docmd mediante env.* y DOCMD_VAR_*.
---

# Referencia de Variables de Entorno

docmd le permite inyectar variables de entorno del sistema directamente en su documentación, facilitando la integración con flujos de trabajo de CI/CD (como GitHub Actions, GitLab CI, Vercel o Netlify).

## Acceso a Variables de Entorno mediante `env.*`

Cualquier variable de entorno disponible durante el proceso de compilación puede ser referenciada utilizando el prefijo `env.`:

```markdown
Desplegado en el entorno: **{{ env.ENVIRONMENT || 'desarrollo' }}**.
Identificador de Build: `{{ env.GITHUB_RUN_ID || 'local' }}`
Rama: `{{ env.GITHUB_REF_NAME || 'main' }}`
```

### Valores Alternativos (Fallbacks)

Es posible que las variables de entorno no existan durante el desarrollo en local. Especifique siempre un valor predeterminado con `||`:

```markdown
Conexión con el entorno de pruebas:
`{{ env.STAGING_GATEWAY_URL || "https://sandbox.gateway.io" }}`
```

## Promoción Directa mediante `DOCMD_VAR_*`

Para no tener que escribir el prefijo `env.` en los documentos Markdown, cualquier variable de entorno con el prefijo `DOCMD_VAR_` se promueve automáticamente al nivel principal:

```bash
# En su flujo de CI/CD o archivo .env:
export DOCMD_VAR_API_HOST="https://api.produccion.internal"
export DOCMD_VAR_RELEASE_CHANNEL="beta"
```

En sus documentos Markdown:

```markdown
El punto de acceso a nuestra API es `{{ API_HOST }}`.
Canal de publicación: **{{ RELEASE_CHANNEL }}**.
```

Ambas variables también pueden ser referenciadas mediante su nombre completo original (`{{ DOCMD_VAR_API_HOST }}`).

## Ejemplo: Flujo de Trabajo en GitHub Actions

Ejemplo de configuración en `.github/workflows/deploy.yml`:

```yaml
name: Desplegar Documentación

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
          DOCMD_VAR_DEPLOYED_AT: ${{ steps.date.outputs.date }}
          DOCMD_VAR_PR_NUMBER: ${{ github.event.number }}
          DEPLOY_ENV: production
```
