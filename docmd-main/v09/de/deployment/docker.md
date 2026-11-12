---
title: "Docker-Containerisierung"
description: "Führen Sie docmd in containerisierten Umgebungen unter Verwendung offizieller Images oder generierter Dockerfiles aus."
---

`docmd` gibt statische Assets aus, was es ideal für containerisierte Bereitstellungen macht. Sie können das offizielle vorgefertigte Image ziehen oder ein benutzerdefiniertes `Dockerfile` über die Deployer-CLI kompilieren.

## Offizielles Container-Image

Das vorgefertigte Container-Image erstellt und serviert Ihre Website ohne lokale Node.js-Umgebung. Der Standardbefehl ist [`docmd serve --host 0.0.0.0`](./docmd-serve): ein Produktions-Build, ausgeliefert auf Port 3000, mit einem Health-Check unter `/healthz`. Images werden für die Architekturen `linux/amd64` und `linux/arm64` veröffentlicht.

### Schnellstart-Befehle

```bash
# Pinned Release Image ziehen
docker pull ghcr.io/docmd-io/docmd:0.9.0

# Statische Ausgabe kompilieren (mountet lokales Docs-Verzeichnis)
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:0.9.0 build

# Dokumentation im Produktionsmodus bereitstellen (Standardbefehl)
docker run -v $(pwd):/docs -p 3000:3000 ghcr.io/docmd-io/docmd:0.9.0

# Entwicklungsserver mit Live-Reload beim Schreiben
docker run -v $(pwd):/docs -p 3000:3000 ghcr.io/docmd-io/docmd:0.9.0 dev --host 0.0.0.0
```

::: callout info "Standardbefehl" icon:info
Container-Images vor Einführung von `docmd serve` führten standardmäßig `dev --host 0.0.0.0` aus. Falls Sie sich ohne expliziten Befehl auf Live-Reload verlassen haben, übergeben Sie bitte `dev --host 0.0.0.0` explizit.
:::

::: callout tip "Releases pinnen" icon:pin
Pinnen Sie spezifische Versions-Tags (z. B. `0.9.0`) in Produktions-CI-Pipelines, um die Reproduzierbarkeit von Builds zu gewährleisten.
:::

### Docker Compose Workflow

```yaml "docker-compose.yml"
version: '3.8'
services:
  docs:
    image: ghcr.io/docmd-io/docmd:0.9.0
    command: build
    volumes:
      - ./docs:/docs
      - ./site:/site
      - ./docmd.config.json:/docmd.config.json:ro

  serve:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./site:/usr/share/nginx/html:ro
    depends_on:
      - docs
```

### Health-Check und Port

Der `HEALTHCHECK` des Images fragt `GET /healthz` auf `${PORT:-3000}` ab. `docmd serve` antwortet mit `200`, sobald die Website erstellt ist, und mit `503`, während der erste Build läuft. Setzen Sie `PORT`, um Server und Health-Check gemeinsam umzukonfigurieren:

```bash
docker run -e PORT=8080 -p 8080:8080 ghcr.io/docmd-io/docmd:0.9.0
```

In Kubernetes richten Sie die Startup- und Readiness-Probes auf `/healthz`. Da `serve` die Website unter `/docs` kompiliert, mounten Sie dieses Verzeichnis von einem beschreibbaren Volume und nicht direkt aus einer ConfigMap.

### Image-Spezifikationen

| Eigenschaft | Spezifikationen |
| :--- | :--- |
| **Basis-Betriebssystem** | Alpine Linux |
| **Benutzeridentitäts-Zuordnung** | Ordnet die Container-Root-Identität automatisch über `su-exec` der Host-UID/GID zu. |
| **Standard-Arbeitsverzeichnis** | `/docs` (Überschreibung über `-w`-Flag). |
| **Architekturen** | `linux/amd64`, `linux/arm64` |

### Benutzerdefiniertes Arbeitsverzeichnis & Berechtigungen

Der Einstiegspunkt erkennt automatisch die Eigentümer-UID und -GID für eingehängte Volumes und reduziert die Berechtigungen vor der Ausführung von `init`-, `build`-, `serve`- oder `dev`-Befehlen. Dateien, die auf Host-Mounts geschrieben werden, behalten den Host-Benutzerbesitz.

```bash
docker run -v $(pwd):/workspace -w /workspace ghcr.io/docmd-io/docmd:0.9.0 init
```

## Generiertes Multi-Stage-Dockerfile

Generieren Sie ein benutzerdefiniertes `Dockerfile` über die [Deployer-CLI](./deployer):

```bash
npx @docmd/core deploy --docker
```

Das generierte Multi-Stage-`Dockerfile`:
1. **Build-Stufe**: Installiert die festgelegte `@docmd/core`-Version und kompiliert statische HTML/CSS/JS-Assets.
2. **Serve-Stufe**: Kopiert kompilierte Ausgaben in ein leichtgewichtiges `nginx:alpine`-Image.

Um Docker- und NGINX-Konfigurationen zusammen zu generieren:

```bash
npx @docmd/core deploy --docker --nginx
```

### Build & Container-Ausführung

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

Greifen Sie unter `http://localhost:8080` auf die bereitgestellte Website zu.