<p><strong><em>Lección 6: Dev Containers con Claude Code</em></strong></p>

## Introducción

¡Bienvenido a la última lección del Módulo 7! Hoy vamos a aprender sobre algo que va a cambiar completamente la forma en que trabajas: **Dev Containers** (Contenedores de Desarrollo).

¿Alguna vez has tenido este problema? Descargas un proyecto de GitHub, intentas ejecutarlo, y te sale: "Error: Node version incompatible" o "Missing dependencies" o el clásico "Works on my machine" (funciona en mi máquina). Frustrante, ¿verdad?

Los **Dev Containers** resuelven este problema de raíz. Imagina poder empaquetar TODA tu ambiente de desarrollo (Node.js, Python, librerías, configuración, extensiones de VS Code, TODO) en una "caja mágica" que funciona EXACTAMENTE igual en cualquier computadora. Eso es un Dev Container.

Y lo mejor de todo: **Claude Code puede ayudarte a crear, configurar y debuggear Dev Containers**. No necesitas ser un experto en Docker ni memorizar sintaxis compleja. Simplemente le describes a Claude Code qué necesitas, y él te guía paso a paso. ¡Vamos a explorar este súper poder!

## ¿Qué es un Dev Container? (Explicación Simple)

### Analogía: La Caja de LEGO

Imagina que tienes un set de LEGO increíble. Has construido algo asombroso. Quieres llevarlo a casa de un amigo para trabajar juntos en él. Tienes dos opciones:

**Opción A (sin contenedor)**:
- Desarmas todo el LEGO
- Lo metes en una bolsa
- Le dices a tu amigo: "Necesitas estas piezas específicas, ármalas en este orden, asegúrate de tener la mesa del tamaño correcto..."
- Tu amigo intenta rearmarlo pero le faltan piezas, la mesa es diferente, y nada funciona igual

**Opción B (con contenedor)**:
- Metes TODO (LEGO armado + mesa + herramientas) en una caja mágica
- Le das la caja a tu amigo
- Tu amigo abre la caja y TODO está exactamente como en tu casa
- Funciona instantáneamente

Un **Dev Container** es la Opción B para tu ambiente de desarrollo.

### ¿Qué Incluye un Dev Container?

Un Dev Container empaqueta:

1. **Sistema operativo base** (Ubuntu Linux, generalmente)
2. **Lenguajes de programación** (Node.js 18, Python 3.11, etc.)
3. **Dependencias del sistema** (git, curl, etc.)
4. **Librerías del proyecto** (npm packages, pip packages)
5. **Configuración de VS Code** (extensiones, settings)
6. **Variables de entorno**
7. **Scripts de inicialización**

TODO en un solo paquete que funciona idéntico en:
- Tu laptop
- La laptop de tu compañero
- El servidor de CI/CD
- La computadora de producción

## ¿Por Qué Usar Dev Containers?

### Problemas que Resuelven

❌ **Problema 1**: "En mi computadora funciona"
```
Desarrollador A: "El proyecto corre perfecto"
Desarrollador B: "A mí me sale error de dependencias"
```
✅ **Solución**: Con Dev Container, ambos tienen EXACTAMENTE el mismo ambiente.

❌ **Problema 2**: Onboarding lento de nuevos desarrolladores
```
Nuevo dev: "Tardé 3 días configurando mi ambiente"
```
✅ **Solución**: Con Dev Container, está listo en 10 minutos.

❌ **Problema 3**: "Rompí mi ambiente local"
```
Dev: "Instalé una librería y ahora nada funciona"
```
✅ **Solución**: Borra el contenedor, crea uno nuevo, listo.

❌ **Problema 4**: Trabajar en múltiples proyectos con requisitos conflictivos
```
Proyecto A necesita Node 14
Proyecto B necesita Node 18
```
✅ **Solución**: Cada proyecto tiene su propio contenedor con su versión.

## Cómo Claude Code te Ayuda con Dev Containers

### Tu Primera Conversación con Claude Code sobre Dev Containers

Abre Claude Code y vamos a empezar desde lo más básico.

**Tú escribes en Claude Code**:
```
Claude, he oído hablar de Dev Containers pero nunca los he usado.
Tengo un proyecto de Node.js con Express y PostgreSQL. ¿Puedes ayudarme
a crear un Dev Container para este proyecto? Explícamelo paso a paso
como si tuviera 10 años.
```

**Claude Code responde**:
```
¡Perfecto! Te voy a guiar paso a paso. Vamos a crear un Dev Container
para tu proyecto. Es más fácil de lo que parece.

REQUISITOS PREVIOS:
===================

Necesitas tener instalado:

1. Docker Desktop (es gratis)
   - Mac: https://www.docker.com/products/docker-desktop
   - Windows: https://www.docker.com/products/docker-desktop
   - Linux: sudo apt install docker.io (Ubuntu)

2. VS Code (Visual Studio Code)

3. Extensión "Dev Containers" para VS Code
   - Abre VS Code
   - Ve a Extensions (Ctrl+Shift+X)
   - Busca "Dev Containers"
   - Click en Install

¿Ya tienes todo esto? Si no, instálalo y me avisas cuando estés listo.

PASO 1: Crear la estructura de archivos
========================================

En tu proyecto, necesitamos crear una carpeta especial:

```bash
mkdir .devcontainer
cd .devcontainer
```

Esta carpeta le dice a VS Code: "Aquí está la configuración del contenedor"

PASO 2: Crear el archivo de configuración
==========================================

Dentro de .devcontainer, crea un archivo llamado "devcontainer.json":

```json
{
  "name": "Mi Proyecto Node + PostgreSQL",

  // Qué imagen de Docker usar (Node.js 18 en este caso)
  "image": "mcr.microsoft.com/devcontainers/javascript-node:18",

  // Extensiones de VS Code que se instalarán automáticamente
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "ms-azuretools.vscode-docker"
      ]
    }
  },

  // Puertos que queremos exponer (3000 para Express)
  "forwardPorts": [3000, 5432],

  // Comandos que se ejecutan DESPUÉS de crear el contenedor
  "postCreateCommand": "npm install",

  // Características adicionales
  "features": {
    "ghcr.io/devcontainers/features/node:1": {
      "version": "18"
    },
    "ghcr.io/devcontainers/features/git:1": {}
  }
}
```

EXPLICACIÓN LÍNEA POR LÍNEA:
=============================

```json
"name": "Mi Proyecto Node + PostgreSQL"
```
Es solo un nombre descriptivo. Ponle lo que quieras.

```json
"image": "mcr.microsoft.com/devcontainers/javascript-node:18"
```
Esta es la "caja base". Dice: "Usa una imagen que ya tiene Node.js 18".
Microsoft mantiene estas imágenes pre-configuradas.

```json
"extensions": [...]
```
Extensiones de VS Code que se instalan automáticamente cuando abres
el contenedor. Así todos los devs tienen las mismas herramientas.

```json
"forwardPorts": [3000, 5432]
```
Puerto 3000: Para tu app de Express
Puerto 5432: Para PostgreSQL

Esto hace que puedas acceder a http://localhost:3000 desde tu navegador
aunque la app esté corriendo dentro del contenedor.

```json
"postCreateCommand": "npm install"
```
Después de crear el contenedor, ejecuta "npm install" automáticamente.

```json
"features": {...}
```
Características adicionales. En este caso, Node 18 y Git.

PASO 3: Agregar PostgreSQL
===========================

Para incluir PostgreSQL, vamos a usar "docker-compose". Crea otro archivo
en .devcontainer llamado "docker-compose.yml":

```yaml
version: '3.8'

services:
  app:
    build:
      context: ..
      dockerfile: .devcontainer/Dockerfile
    volumes:
      - ..:/workspace:cached
    command: sleep infinity

  db:
    image: postgres:15
    restart: unless-stopped
    environment:
      POSTGRES_USER: devuser
      POSTGRES_PASSWORD: devpassword
      POSTGRES_DB: devdb
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

Y actualiza devcontainer.json para usar docker-compose:

```json
{
  "name": "Mi Proyecto Node + PostgreSQL",
  "dockerComposeFile": "docker-compose.yml",
  "service": "app",
  "workspaceFolder": "/workspace",

  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "ms-azuretools.vscode-docker",
        "ckolkman.vscode-postgres"
      ]
    }
  },

  "forwardPorts": [3000, 5432],

  "postCreateCommand": "npm install",

  "remoteEnv": {
    "DATABASE_URL": "postgresql://devuser:devpassword@db:5432/devdb"
  }
}
```

PASO 4: Abrir en Contenedor
============================

1. En VS Code, presiona F1 (o Cmd+Shift+P en Mac)

2. Escribe: "Dev Containers: Reopen in Container"

3. Click en esa opción

4. VS Code se reiniciará dentro del contenedor

5. Espera 1-2 minutos mientras se construye (primera vez es más lento)

6. Cuando termine, verás "Dev Container: Mi Proyecto..." en la esquina
   inferior izquierda

¡Y LISTO! Ahora estás trabajando dentro del contenedor.

VERIFICAR QUE TODO FUNCIONA:
============================

Abre una terminal en VS Code (Ctrl+`) y ejecuta:

```bash
node --version  # Debería decir v18.x.x
npm --version
psql -h db -U devuser -d devdb  # Conectar a PostgreSQL
```

Si todo muestra las versiones correctas, ¡funciona!

¿Llegaste hasta aquí? ¿Algún paso te causó problemas?
```

**¿Qué hizo Claude Code?**

- Te dio prerequisitos claros
- Explicó cada archivo necesario
- Comentó CADA línea de configuración
- Te guió para verificar que funciona
- Te preguntó si tuviste problemas

Esto es exactamente lo que necesita un principiante.

## Paso 1: Creando tu Primer Dev Container con Ayuda de Claude Code

Vamos a hacer esto en tiempo real. Supongamos que tienes un proyecto y quieres "containerizarlo".

### Proyecto de Ejemplo

Imagina que tienes esta estructura:

```
mi-proyecto/
├── package.json
├── server.js
├── .env
└── README.md
```

**Tú**:
```
Claude, tengo un proyecto simple de Express. ¿Puedes generarme TODO lo
que necesito para crear un Dev Container? Dame archivos completos listos
para copiar y pegar.
```

**Claude Code**:
```
¡Claro! Te voy a dar TODOS los archivos que necesitas. Solo copia y pega.

ARCHIVO 1: .devcontainer/devcontainer.json
===========================================

Crea la carpeta .devcontainer y dentro crea devcontainer.json:

```json
{
  "name": "Express Dev Container",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:1-18-bullseye",

  "customizations": {
    "vscode": {
      "settings": {
        "terminal.integrated.defaultProfile.linux": "bash",
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      },
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "ms-azuretools.vscode-docker",
        "christian-kohler.npm-intellisense",
        "eamodio.gitlens"
      ]
    }
  },

  "forwardPorts": [3000],

  "portsAttributes": {
    "3000": {
      "label": "Express App",
      "onAutoForward": "notify"
    }
  },

  "postCreateCommand": "npm install",

  "postStartCommand": "npm run dev",

  "features": {
    "ghcr.io/devcontainers/features/node:1": {
      "version": "18"
    },
    "ghcr.io/devcontainers/features/git:1": {},
    "ghcr.io/devcontainers/features/github-cli:1": {}
  },

  "remoteUser": "node",

  "mounts": [
    "source=${localEnv:HOME}/.ssh,target=/home/node/.ssh,readonly,type=bind"
  ]
}
```

EXPLICACIÓN DE LAS PARTES NUEVAS:
==================================

```json
"portsAttributes": {
  "3000": {
    "label": "Express App",
    "onAutoForward": "notify"
  }
}
```
Esto hace que cuando el puerto 3000 esté activo, VS Code te muestre una
notificación con un link para abrir tu app.

```json
"postStartCommand": "npm run dev"
```
Cada vez que el contenedor se inicia, ejecuta "npm run dev" automáticamente.
Cambia esto según tu script de desarrollo.

```json
"remoteUser": "node"
```
Ejecuta todo como usuario "node" (no root). Es más seguro.

```json
"mounts": [...]
```
Esto monta tu carpeta .ssh dentro del contenedor para que puedas hacer
git push/pull sin reconfigurar claves SSH.

ARCHIVO 2: .devcontainer/Dockerfile (OPCIONAL)
===============================================

Si necesitas instalar cosas adicionales, crea un Dockerfile:

```dockerfile
FROM mcr.microsoft.com/devcontainers/javascript-node:1-18-bullseye

# Instalar herramientas adicionales
RUN apt-get update && apt-get install -y \
    postgresql-client \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Instalar dependencias globales de npm
RUN npm install -g nodemon
```

Y actualiza devcontainer.json:

```json
{
  "name": "Express Dev Container",
  "build": {
    "dockerfile": "Dockerfile"
  },
  ...resto igual
}
```

ARCHIVO 3: .devcontainer/docker-compose.yml (SI USAS BASE DE DATOS)
====================================================================

Para incluir PostgreSQL, Redis, etc.:

```yaml
version: '3.8'

services:
  app:
    build:
      context: ..
      dockerfile: .devcontainer/Dockerfile

    volumes:
      - ../..:/workspaces:cached

    command: sleep infinity

    network_mode: service:db

  db:
    image: postgres:15-alpine
    restart: unless-stopped
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: devuser
      POSTGRES_DB: devdb
      POSTGRES_PASSWORD: devpass

  redis:
    image: redis:7-alpine
    restart: unless-stopped

volumes:
  postgres-data:
```

Y actualiza devcontainer.json:

```json
{
  "name": "Express + Postgres + Redis",
  "dockerComposeFile": "docker-compose.yml",
  "service": "app",
  "workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}",

  "customizations": { ...igual... },

  "forwardPorts": [3000, 5432, 6379],

  "postCreateCommand": "npm install",

  "remoteEnv": {
    "DATABASE_URL": "postgresql://devuser:devpass@localhost:5432/devdb",
    "REDIS_URL": "redis://localhost:6379"
  }
}
```

ARCHIVO 4: .vscode/settings.json (OPCIONAL)
============================================

Configuración de VS Code específica del proyecto:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "javascript.preferences.quoteStyle": "single",
  "typescript.preferences.quoteStyle": "single"
}
```

CÓMO USAR:
==========

1. Copia todos estos archivos en tu proyecto

2. Abre VS Code en la carpeta del proyecto

3. F1 → "Dev Containers: Reopen in Container"

4. Espera (primera vez toma ~3-5 minutos)

5. Cuando termine, abre la terminal y verás que estás dentro del contenedor

6. Tu app debería estar corriendo automáticamente

COMANDOS ÚTILES:
================

Dentro del contenedor:

```bash
# Ver logs de npm run dev
npm run dev

# Conectar a PostgreSQL
psql $DATABASE_URL

# Ver variables de entorno
env | grep DATABASE

# Reiniciar el servidor
npm run dev
```

TROUBLESHOOTING:
================

Si algo sale mal:

1. F1 → "Dev Containers: Rebuild Container"
   (Borra todo y empieza de cero)

2. Revisa los logs:
   F1 → "Dev Containers: Show Container Log"

¿Funcionó? ¿Necesitas ayuda con algún paso?
```

**Lo que acabamos de hacer**:

Claude Code te dio:
- Archivos completos listos para usar
- Múltiples variantes (simple, con DB, con Redis)
- Explicación de cada parte
- Comandos útiles
- Troubleshooting

Esto es ORO puro para alguien que nunca ha usado contenedores.

## Paso 2: Personalizando tu Dev Container

Ahora vamos a aprender a personalizar el contenedor para necesidades específicas.

**Tú**:
```
Claude, mi proyecto necesita:
- Python 3.11 (además de Node.js)
- MongoDB
- AWS CLI
- Extensión de VS Code para Python

¿Cómo modifico mi devcontainer.json para incluir todo esto?
```

**Claude Code**:
```
¡Perfecto! Te voy a mostrar cómo agregar TODO eso.

OPCIÓN 1: Usando Features (MÁS FÁCIL)
======================================

Actualiza tu devcontainer.json:

```json
{
  "name": "Node + Python + MongoDB + AWS",

  "image": "mcr.microsoft.com/devcontainers/javascript-node:1-18-bullseye",

  "features": {
    // Node.js 18
    "ghcr.io/devcontainers/features/node:1": {
      "version": "18"
    },

    // Python 3.11
    "ghcr.io/devcontainers/features/python:1": {
      "version": "3.11"
    },

    // AWS CLI
    "ghcr.io/devcontainers/features/aws-cli:1": {
      "version": "latest"
    },

    // Docker (para ejecutar contenedores desde dentro)
    "ghcr.io/devcontainers/features/docker-in-docker:2": {},

    // Git
    "ghcr.io/devcontainers/features/git:1": {}
  },

  "customizations": {
    "vscode": {
      "extensions": [
        // Node.js
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",

        // Python
        "ms-python.python",
        "ms-python.vscode-pylance",
        "ms-python.black-formatter",

        // MongoDB
        "mongodb.mongodb-vscode",

        // AWS
        "amazonwebservices.aws-toolkit-vscode",

        // General
        "eamodio.gitlens",
        "ms-azuretools.vscode-docker"
      ]
    }
  },

  "forwardPorts": [3000, 27017],

  "postCreateCommand": "npm install && pip install -r requirements.txt",

  "remoteEnv": {
    "MONGODB_URI": "mongodb://localhost:27017/mydb"
  }
}
```

ARCHIVO: docker-compose.yml
============================

Para incluir MongoDB:

```yaml
version: '3.8'

services:
  app:
    image: mcr.microsoft.com/devcontainers/javascript-node:1-18-bullseye

    volumes:
      - ../..:/workspaces:cached

    command: sleep infinity

    network_mode: service:mongodb

  mongodb:
    image: mongo:7
    restart: unless-stopped
    volumes:
      - mongodb-data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password

volumes:
  mongodb-data:
```

Actualiza devcontainer.json para usar docker-compose:

```json
{
  "name": "Node + Python + MongoDB + AWS",
  "dockerComposeFile": "docker-compose.yml",
  "service": "app",
  "workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}",

  ...resto igual...

  "remoteEnv": {
    "MONGODB_URI": "mongodb://admin:password@localhost:27017/mydb?authSource=admin"
  }
}
```

OPCIÓN 2: Usando Dockerfile personalizado (MÁS CONTROL)
========================================================

Si Features no es suficiente, crea un Dockerfile:

```dockerfile
FROM mcr.microsoft.com/devcontainers/javascript-node:1-18-bullseye

# Instalar Python 3.11
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
       python3.11 \
       python3-pip \
       python3.11-venv

# Instalar AWS CLI
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm -rf awscliv2.zip aws

# Instalar MongoDB tools
RUN wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add - \
    && echo "deb http://repo.mongodb.org/apt/debian bullseye/mongodb-org/7.0 main" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list \
    && apt-get update \
    && apt-get install -y mongodb-mongosh

# Instalar dependencias Python globales
RUN pip3 install \
    black \
    pylint \
    pytest \
    boto3

# Limpiar
RUN apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*
```

VERIFICAR QUE TODO ESTÁ INSTALADO:
===================================

Después de abrir en contenedor, ejecuta:

```bash
node --version       # Node.js 18
python3 --version    # Python 3.11
aws --version        # AWS CLI
mongosh --version    # MongoDB Shell
```

ESTRUCTURA FINAL:
=================

```
mi-proyecto/
├── .devcontainer/
│   ├── devcontainer.json
│   ├── docker-compose.yml
│   └── Dockerfile
├── .vscode/
│   └── settings.json
├── src/
├── package.json
├── requirements.txt
└── README.md
```

¿Necesitas agregar algo más? ¿Rust, Go, Java? Dime y te muestro cómo.
```

## Paso 3: Compartiendo Dev Containers con tu Equipo

Ahora vamos a aprender a compartir tu Dev Container con otros desarrolladores.

**Tú**:
```
Claude, ya tengo mi Dev Container funcionando perfecto. ¿Cómo lo comparto
con mi equipo para que todos tengan el mismo ambiente?
```

**Claude Code**:
```
¡Excelente pregunta! Compartir es súper fácil. Te voy a mostrar cómo.

PASO 1: Subir a Git
===================

Los archivos de .devcontainer DEBEN estar en tu repositorio de Git.

```bash
git add .devcontainer/
git add .vscode/
git commit -m "Add Dev Container configuration"
git push
```

¡IMPORTANTE! NO subas credenciales. Si tienes secretos, usa variables
de entorno.

PASO 2: Crear README para el equipo
====================================

Crea un archivo DEVCONTAINER_SETUP.md:

```markdown
# Configuración del Dev Container

## Prerequisitos

1. Instalar Docker Desktop: https://www.docker.com/products/docker-desktop
2. Instalar VS Code: https://code.visualstudio.com/
3. Instalar extensión "Dev Containers" en VS Code

## Cómo empezar

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-org/tu-proyecto.git
   cd tu-proyecto
   ```

2. Abre en VS Code:
   ```bash
   code .
   ```

3. Cuando VS Code abra, verás una notificación:
   "Folder contains a Dev Container configuration file"

4. Click en "Reopen in Container"

5. Espera 3-5 minutos (primera vez)

6. ¡Listo! Todo está configurado automáticamente.

## Qué incluye este contenedor

- Node.js 18
- Python 3.11
- MongoDB
- AWS CLI
- Todas las extensiones necesarias de VS Code

## Variables de entorno

Crea un archivo .env en la raíz con:

```env
DATABASE_URL=...
API_KEY=...
```

(Pide estas credenciales al líder del equipo)

## Problemas comunes

### "Docker daemon not running"
Inicia Docker Desktop.

### "Container build failed"
Ejecuta: Dev Containers: Rebuild Container

### "Port already in use"
Detén otros proyectos que usen el mismo puerto.

## Soporte

Si tienes problemas, contacta a [tu nombre] o abre un issue en GitHub.
```

PASO 3: Crear un script de setup automático
============================================

Crea .devcontainer/setup.sh:

```bash
#!/bin/bash

echo "🚀 Configurando proyecto..."

# Instalar dependencias de Node
echo "📦 Instalando dependencias de Node..."
npm install

# Instalar dependencias de Python
if [ -f "requirements.txt" ]; then
    echo "🐍 Instalando dependencias de Python..."
    pip install -r requirements.txt
fi

# Configurar Git
echo "⚙️  Configurando Git..."
git config --global core.autocrlf input

# Crear .env si no existe
if [ ! -f ".env" ]; then
    echo "📝 Creando archivo .env..."
    cp .env.example .env
    echo "⚠️  Recuerda llenar las variables en .env"
fi

# Seed de base de datos (si existe script)
if [ -f "scripts/seed-db.sh" ]; then
    echo "🌱 Poblando base de datos..."
    bash scripts/seed-db.sh
fi

echo "✅ ¡Setup completo!"
echo "Ejecuta 'npm run dev' para iniciar el servidor"
```

Y actualiza postCreateCommand en devcontainer.json:

```json
{
  ...
  "postCreateCommand": "bash .devcontainer/setup.sh"
}
```

PASO 4: Versionado de configuraciones
======================================

Usa comentarios en devcontainer.json para documentar cambios:

```json
{
  "name": "Mi Proyecto",
  // Versión: 1.2.0
  // Cambios en 1.2.0:
  // - Agregado Python 3.11
  // - Actualizado Node a 18
  // - Agregado AWS CLI

  "image": "...",
  ...
}
```

PASO 5: CI/CD con Dev Containers
=================================

Puedes usar el MISMO contenedor en CI/CD (GitHub Actions):

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Build Dev Container
        uses: devcontainers/ci@v0.3
        with:
          runCmd: npm test
```

Esto asegura que los tests corren en el MISMO ambiente que desarrollo.

MEJORES PRÁCTICAS PARA COMPARTIR:
==================================

✅ DO:
- Subir .devcontainer/ a Git
- Documentar prerequisitos claramente
- Incluir .env.example (sin secretos)
- Usar versiones específicas de imágenes
- Crear script de setup

❌ DON'T:
- Subir secretos o credenciales
- Asumir que todos tienen Docker
- Cambiar configuración sin avisar al equipo
- Usar "latest" en producción (usa versiones específicas)

COMUNICACIÓN CON EL EQUIPO:
============================

Cuando actualices el contenedor, avisa al equipo:

```
📢 Actualización de Dev Container (v1.2.0)

Cambios:
- Agregado Python 3.11
- Actualizado PostgreSQL a 15
- Nueva extensión de VS Code para testing

Cómo actualizar:
1. git pull
2. Dev Containers: Rebuild Container

Si tienes problemas, avísame.
```

¿Te ayudo a escribir la documentación para tu equipo específicamente?
```

## Problemas Comunes y Soluciones

### Error 1: "Container build failed"

❌ **Error**:
```
Error: failed to solve: process "/bin/sh -c npm install" did not complete successfully
```

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, me sale error "Container build failed" cuando intento abrir
mi Dev Container. ¿Qué hago?
```

**Claude Code**:
```
Este error significa que algo falló durante la construcción del contenedor.
Vamos a debuggearlo paso a paso.

PASO 1: Ver los logs completos
===============================

En VS Code:
- F1 → "Dev Containers: Show Container Log"

Lee los últimos 20-30 líneas. Busca palabras como:
- "Error"
- "Failed"
- "Permission denied"

CAUSAS COMUNES:
===============

CAUSA 1: package.json corrupto o dependencias rotas
----------------------------------------------------

Solución:
```bash
# Borra node_modules y package-lock.json
rm -rf node_modules package-lock.json

# Reintenta
npm install
```

Actualiza postCreateCommand en devcontainer.json:
```json
"postCreateCommand": "rm -rf node_modules && npm install"
```

CAUSA 2: Problema de permisos
------------------------------

Si ves "Permission denied", agrega a devcontainer.json:
```json
"remoteUser": "node",
"containerUser": "node",
"updateRemoteUserUID": true
```

CAUSA 3: Dockerfile con errores
--------------------------------

Si usas Dockerfile personalizado, verifica:

```dockerfile
# ❌ MAL
RUN npm install  # No hay package.json en el contexto

# ✅ BIEN
COPY package*.json ./
RUN npm install
COPY . .
```

CAUSA 4: Timeout
----------------

Si la build toma mucho tiempo y falla, aumenta el timeout.

Crea .devcontainer/devcontainer.json:
```json
{
  ...
  "build": {
    "dockerfile": "Dockerfile",
    "options": ["--memory=4g", "--cpus=2"]
  }
}
```

CAUSA 5: Cache corrupto
-----------------------

Borra el cache de Docker:

```bash
docker system prune -a
```

⚠️ Esto borra TODOS los contenedores e imágenes. Úsalo con cuidado.

SOLUCIÓN NUCLEAR (última opción):
==================================

Si NADA funciona:

1. Cierra VS Code completamente

2. Abre Docker Desktop → Settings → Resources → Advanced
   - Aumenta RAM a 4GB
   - Aumenta CPUs a 2

3. Borra todo:
   ```bash
   docker system prune -a --volumes
   ```

4. Reinicia Docker Desktop

5. Abre VS Code y vuelve a intentar

DEBUGGING AVANZADO:
===================

Construye el contenedor manualmente para ver errores:

```bash
cd .devcontainer
docker build -t my-test-container .
```

Si esto falla, verás el error exacto.

Copia el error completo y muéstramelo. Te diré exactamente qué está mal.
```

### Error 2: "Python extension not working"

❌ **Problema**: Extensión de Python instalada pero no funciona

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, instalé la extensión de Python en devcontainer.json pero cuando
abro un archivo .py, no funciona el autocompletado ni nada.
```

**Claude Code**:
```
Este es un problema común. La extensión está instalada pero no está
configurada correctamente. Vamos a arreglarlo.

SOLUCIÓN 1: Especificar el intérprete de Python
================================================

En devcontainer.json, agrega:

```json
{
  ...
  "customizations": {
    "vscode": {
      "settings": {
        "python.defaultInterpreterPath": "/usr/local/bin/python3",
        "python.linting.enabled": true,
        "python.linting.pylintEnabled": true,
        "python.formatting.provider": "black"
      },
      "extensions": [
        "ms-python.python",
        "ms-python.vscode-pylance"
      ]
    }
  }
}
```

SOLUCIÓN 2: Instalar herramientas de Python en postCreateCommand
=================================================================

```json
{
  ...
  "postCreateCommand": "pip install pylint black pytest && npm install"
}
```

SOLUCIÓN 3: Crear un virtual environment
=========================================

Si usas venv, agrega:

```json
{
  ...
  "postCreateCommand": "python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt && npm install",

  "customizations": {
    "vscode": {
      "settings": {
        "python.defaultInterpreterPath": "${workspaceFolder}/venv/bin/python"
      }
    }
  }
}
```

VERIFICAR:
==========

Después de rebuild:

1. Abre un archivo .py

2. Abajo a la derecha verás la versión de Python

3. Click ahí → "Select Interpreter"

4. Elige el intérprete correcto

Si sigue sin funcionar, envíame un screenshot de la esquina inferior
derecha de VS Code.
```

## 🎮 Ejercicios Gamificados

### Ejercicio 1: Mi Primer Dev Container (100 XP)

**Objetivo**: Crear un Dev Container básico funcional.

**Tareas**:
1. Instalar Docker Desktop y extensión de VS Code
2. Crear devcontainer.json para proyecto Node.js
3. Abrirlo en contenedor
4. Verificar que funciona
5. Documentar el proceso

**Entregable**: Screenshot dentro del contenedor + devcontainer.json

**Bonus (+50 XP)**: Agregar 3 extensiones útiles de VS Code.

### Ejercicio 2: Full Stack Dev Container (200 XP)

**Objetivo**: Crear contenedor con frontend y backend.

**Requisitos**:
- Node.js para backend
- React para frontend
- PostgreSQL
- Redis
- Todas las extensiones necesarias

**Entregable**: Repositorio completo funcionando.

**Bonus (+100 XP)**: Agregar script de seed de datos.

### Ejercicio 3: Multi-Language Container (250 XP)

**Objetivo**: Crear contenedor que soporte múltiples lenguajes.

**Requisitos**:
- Node.js 18
- Python 3.11
- Go 1.21
- Rust latest
- Scripts de hello world en cada lenguaje

**Entregable**: Dev Container + demos en cada lenguaje.

**Bonus (+125 XP)**: Agregar benchmarks comparando velocidad de cada lenguaje.

### Ejercicio 4: Team Onboarding Package (175 XP)

**Objetivo**: Crear paquete completo de onboarding.

**Tareas**:
1. Dev Container configuration
2. README detallado
3. Video tutorial (3-5 min)
4. Script de setup automático
5. Troubleshooting guide

**Entregable**: Repositorio listo para nuevos devs.

**Bonus (+85 XP)**: Obtener feedback real de 3 personas usándolo.

### Ejercicio 5: Production-Ready Dev Container (300 XP)

**Objetivo**: Crear Dev Container de nivel producción.

**Requisitos**:
- Multi-stage Dockerfile optimizado
- Docker Compose con múltiples servicios
- CI/CD integration
- Security scanning
- Documentación completa
- Versioning strategy

**Entregable**: Repositorio enterprise-ready.

**Bonus (+200 XP)**: Presentación de 10 minutos para tu equipo.

## Resumen de Esta Lección

¡Felicidades! Completaste el Módulo 7 completo. En esta última lección aprendiste:

✅ **Qué son Dev Containers** y por qué revolucionan el desarrollo

✅ **Cómo crear Dev Containers** con ayuda de Claude Code paso a paso

✅ **Configurar ambientes complejos** (múltiples lenguajes, bases de datos, herramientas)

✅ **Personalizar VS Code** dentro de contenedores con extensiones y settings

✅ **Compartir configuraciones** con tu equipo para onboarding instantáneo

✅ **Resolver problemas comunes** de construcción y configuración

✅ **Integrar con CI/CD** para consistencia total

✅ **Usar Claude Code como consultor** para configuraciones de contenedores

Lo más importante: **Aprendiste a crear ambientes de desarrollo reproducibles**. Nunca más escucharás "funciona en mi máquina". Nunca más perderás días configurando ambientes. Simplemente clonas, abres, y trabajas.

## Resumen del Módulo 7 Completo

Has completado el **Módulo 7: Desarrollo Empresarial**. Aquí está TODO lo que aprendiste:

### Lección 1: Deployment Empresarial con Claude Code
- Planificar deployments con ayuda de Claude Code
- Generar scripts automáticos de deployment
- Configurar CI/CD con GitHub Actions
- Troubleshooting de deployments con Claude Code

### Lección 2: Claude Code y Amazon Bedrock
- Configurar AWS y solicitar acceso a Bedrock
- Escribir código que usa Claude vía Bedrock
- Crear chatbots con memoria
- Optimizar costos

### Lección 3: Claude Code y Google Vertex AI
- Comparar Bedrock vs Vertex AI
- Configurar Google Cloud y Service Accounts
- Integrar Gemini Pro en aplicaciones
- Manejar diferencias entre plataformas

### Lección 4: Seguridad con Claude Code
- Implementar las 7 reglas de oro de seguridad
- Manejar secretos correctamente
- Prevenir SQL Injection y otras vulnerabilidades
- Usar Claude Code como auditor de seguridad

### Lección 5: Claude Code en Redes Corporativas
- Diagnosticar problemas de red automáticamente
- Configurar proxies y certificados SSL
- Trabajar con VPNs corporativas
- Comunicarse efectivamente con IT

### Lección 6: Dev Containers con Claude Code (esta lección)
- Crear ambientes reproducibles con contenedores
- Compartir configuraciones con equipos
- Integrar múltiples tecnologías en un contenedor
- Resolver problemas de construcción

**Estás listo para trabajar en entornos empresariales profesionales usando Claude Code como tu asistente personal en cada paso del camino.**

¡Felicidades por llegar hasta aquí! 🎉
