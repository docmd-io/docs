---
title: "Docker"
description: "Bereitstellen von docmd mittels Docker-Container"
---

Da `docmd` eine hochperformante statische Website generiert, lässt sie sich äuẞerst effizient innerhalb eines Docker-Containers ausliefern.

## Automatisierte Bereitstellungskonfiguration

::: callout warning "Versionsvorgabe"
Der Befehl `docmd deploy` wurde mit **v0.7.2** eingeführt. Stellen Sie sicher, dass Sie `@docmd/core` aktualisiert haben, bevor Sie diese Funktion nutzen.
:::

Sie können automatisch ein produktionsreifes `Dockerfile` und eine `.dockerignore` für Ihr Projekt über die Core-CLI generieren:

```bash
docmd deploy --docker
```

Dies erstellt ein produktionsreifes `Dockerfile` und eine `.dockerignore` in Ihrem Projekt-Root. Sie können auch das `--force`-Flag verwenden, um bestehende Dateien zu überschreiben, oder `--all`, wenn Sie zusätzlich Nginx- und Caddy-Konfigurationen generieren möchten.

Das generierte Dockerfile verwendet einen optimierten mehrstufigen (multi-stage) Build:
1. **Layer-Caching**: Kopiert zuerst die `package.json`, um die Installation der Abhängigkeiten im Cache zu speichern.
2. **Deterministische Builds**: Installiert dynamisch die **exakte** Version der `@docmd/core`-Engine, die Sie gerade verwenden.
3. **Optimierte Größe**: Verwendet Alpine Linux als Basis für einen minimalen Platzbedarf.
4. **Sicherheitshärtung**: Legt die gebaute statische Website in einen sicheren Nginx-Container ab.

::: callout tip "Benutzerdefiniertes Nginx mit Docker"
Wenn Sie vor der Generierung des Dockerfiles eine `nginx.conf` (via `--nginx`) erstellen, wird `docmd` dies automatisch erkennen und das Dockerfile so konfigurieren, dass Ihre benutzerdefinierte Nginx-Konfiguration verwendet wird.
:::

## Manuelle Konfiguration

Wenn Sie das `Dockerfile` lieber manuell schreiben möchten, können Sie die folgende Vorlage verwenden:

```dockerfile
# Stage 1: Build-Phase
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Manifeste zuerst kopieren für optimales Layer-Caching
COPY package*.json ./
RUN if [ -f package.json ]; then npm install --ignore-scripts; fi

# 2. Quelle kopieren und Engine installieren
COPY . .
RUN npm install -g @docmd/core@0.7.2

# 3. Website bauen
RUN docmd build

# Stage 2: Serve-Phase
FROM nginx:alpine
# Optional: COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/site /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Container ausführen

Sobald Ihr `Dockerfile` vorhanden ist, können Sie es lokal oder auf Ihrem VPS bauen und ausführen:

```bash
docker build -t docmd-site .
docker run -p 8080:80 docmd-site
```

Ihre Dokumentation ist nun unter `http://localhost:8080` erreichbar.