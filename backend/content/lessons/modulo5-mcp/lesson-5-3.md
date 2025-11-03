# Lección 5.3: Configuración de MCP en Claude Code

> 📘 **En esta lección aprenderás:**
> - Comandos CLI completos para gestionar servidores MCP
> - Los 3 scopes de configuración (local, project, user)
> - Tipos de transporte y cuándo usar cada uno
> - Autenticación (Bearer tokens, OAuth, API keys)
> - Archivo `.mcp.json` y variables de entorno
> - Mejores prácticas de seguridad

---

## 🎯 Comandos CLI de MCP

Claude Code incluye comandos integrados para gestionar servidores MCP:

### Comandos Básicos

```bash
# Ver ayuda completa
claude mcp --help

# Agregar servidor
claude mcp add [opciones] <nombre> <comando/url>

# Listar todos los servidores configurados
claude mcp list

# Ver detalles de un servidor específico
claude mcp get <nombre-servidor>

# Eliminar servidor
claude mcp remove <nombre-servidor>

# Resetear aprobaciones de proyecto
claude mcp reset-project-choices

# Importar desde Claude Desktop
claude mcp add-from-claude-desktop
```

---

## 🔌 Tipos de Transporte

### 1. HTTP Transport (Recomendado para servicios cloud)

**Uso:**
```bash
claude mcp add --transport http <nombre> <url>
```

**Ejemplos:**
```bash
# Notion
claude mcp add --transport http notion https://mcp.notion.com/mcp

# GitHub
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# Stripe
claude mcp add --transport http stripe https://mcp.stripe.com

# Con headers personalizados
claude mcp add --transport http api https://api.example.com/mcp \
  --header "Authorization: Bearer sk_live_..."
```

---

### 2. Stdio Transport (Para procesos locales)

**Uso:**
```bash
claude mcp add --transport stdio <nombre> -- <comando>
```

**⚠️ Importante:** El separador `--` es **obligatorio** antes del comando del servidor.

**Ejemplos:**
```bash
# Filesystem (con npx)
claude mcp add --transport stdio filesystem -- npx -y @modelcontextprotocol/server-filesystem ~/Documents

# Con variables de entorno
claude mcp add --transport stdio database \
  --env DB_URL="postgresql://localhost/mydb" \
  --env DB_USER="admin" \
  -- npx -y postgres-mcp-server

# Servidor Python con uv
claude mcp add --transport stdio myserver \
  -- uv --directory ~/my-mcp-server run server.py

# Windows (requiere cmd /c)
claude mcp add --transport stdio myserver -- cmd /c npx -y @some/package
```

---

### 3. SSE Transport (Legacy - No recomendado)

**Uso:**
```bash
claude mcp add --transport sse <nombre> <url>
```

**Nota:** SSE está deprecado en favor de HTTP con Server-Sent Events opcional.

---

## 📁 Scopes de Configuración

Los servidores MCP pueden configurarse en **3 niveles** con diferente alcance:

```
┌─────────────────────────────────────────┐
│  USER SCOPE (Mayor alcance)            │
│  ~/.claude/mcp-servers.json            │
│  • Disponible en TODOS los proyectos   │
│  • Config personal del desarrollador    │
├─────────────────────────────────────────┤
│  PROJECT SCOPE                          │
│  .mcp.json (en raíz del proyecto)      │
│  • Compartido via Git con el equipo    │
│  • Específico del proyecto              │
├─────────────────────────────────────────┤
│  LOCAL SCOPE (Menor alcance)           │
│  User settings (no versionado)         │
│  • Solo para proyecto actual            │
│  • No se comparte                       │
└─────────────────────────────────────────┘

Precedencia: Local > Project > User
```

### Local Scope (Por defecto)

**Uso:** Servidores personales o con credenciales sensibles.

```bash
# Sin --scope, por defecto es local
claude mcp add --transport http personal-api https://my-api.com/mcp
```

**Almacenamiento:** Settings de usuario (no versionado)

**Cuándo usar:**
- Servidores de desarrollo personal
- Configuraciones con credenciales que no deben compartirse
- Experimentación temporal

---

### Project Scope

**Uso:** Herramientas compartidas del equipo.

```bash
claude mcp add --scope project --transport http github https://api.githubcopilot.com/mcp/
```

**Almacenamiento:** `.mcp.json` en la raíz del proyecto

**Ejemplo de `.mcp.json`:**
```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": {
        "Authorization": "Bearer ${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@bytebase/dbhub"],
      "env": {
        "DB_URL": "${DATABASE_URL}"
      }
    }
  }
}
```

**Cuándo usar:**
- Herramientas que todo el equipo necesita
- Configuración consistente entre desarrolladores
- Versionado en Git (sin credenciales)

**⚠️ Seguridad:**
- NO incluir tokens directamente
- Usar variables de entorno (`${VAR_NAME}`)
- Primera vez que abres proyecto, Claude Code pedirá aprobación

---

### User Scope

**Uso:** Utilidades cross-project.

```bash
claude mcp add --scope user --transport http hubspot https://mcp.hubspot.com/mcp
```

**Almacenamiento:** `~/.claude/mcp-servers.json`

**Cuándo usar:**
- Herramientas que usas en todos tus proyectos
- Servicios personales (email, calendario)
- CLIs favoritos

---

## 🔐 Autenticación

### 1. Bearer Tokens

**Uso:**
```bash
claude mcp add --transport http api https://api.example.com/mcp \
  --header "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Mejor práctica:**
```bash
# En .env
echo "API_TOKEN=sk_live_abc123..." >> .env

# En configuración usar variable
claude mcp add --transport http api https://api.example.com/mcp \
  --header "Authorization: Bearer ${API_TOKEN}"
```

---

### 2. API Keys

**Configuración:**
```bash
claude mcp add --transport http service https://api.service.com/mcp \
  --header "X-API-Key: ${SERVICE_API_KEY}"
```

---

### 3. OAuth 2.0 (Servidores HTTP)

**Flujo:**
```bash
# 1. Agregar servidor
claude mcp add --transport http notion https://mcp.notion.com/mcp

# 2. Autenticar interactivamente
# En Claude Code:
/mcp

# 3. Seleccionar servidor y autenticar en navegador
# Claude Code almacena tokens de forma segura
# Refresh automático cuando expiran
```

**Servidores con OAuth:**
- Notion
- GitHub
- Google (Calendar, Drive)
- Microsoft (Outlook, Teams)
- Slack

---

### 4. Credenciales en Variables de Entorno

**Para Stdio servers:**
```bash
claude mcp add --transport stdio db \
  --env DB_HOST="localhost" \
  --env DB_PORT="5432" \
  --env DB_USER="${POSTGRES_USER}" \
  --env DB_PASS="${POSTGRES_PASSWORD}" \
  -- npx -y postgres-mcp-server
```

**Archivo `.env`:**
```bash
POSTGRES_USER=admin
POSTGRES_PASSWORD=super_secret_pass
```

---

## ⚙️ Configuración Avanzada con `.mcp.json`

### Expansión de Variables

Soporta sintaxis de fallback:

```json
{
  "mcpServers": {
    "api-server": {
      "type": "http",
      "url": "${API_BASE_URL:-https://api.example.com}/mcp",
      "headers": {
        "Authorization": "Bearer ${API_KEY}"
      }
    }
  }
}
```

**Sintaxis:**
- `${VAR}` - Expande a valor de `VAR`, error si no existe
- `${VAR:-default}` - Usa `default` si `VAR` no está definida

---

### Servidor Stdio Completo

```json
{
  "mcpServers": {
    "project-manager": {
      "type": "stdio",
      "command": "/usr/local/bin/python3",
      "args": [
        "-m",
        "project_manager.server",
        "--config",
        "./config.json"
      ],
      "env": {
        "LOG_LEVEL": "info",
        "DATA_DIR": "${PROJECT_ROOT}/data"
      }
    }
  }
}
```

---

### Múltiples Servidores

```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": {
        "Authorization": "Bearer ${GITHUB_TOKEN}"
      }
    },
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "~/Projects"]
    },
    "postgres": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@bytebase/dbhub", "--dsn", "${DATABASE_URL}"]
    }
  }
}
```

---

## 🔍 Comandos de Inspección

### Listar Servidores

```bash
$ claude mcp list

Connected MCP Servers:
┌────────────┬──────────┬─────────┬────────────────────────────┐
│ Name       │ Scope    │ Type    │ Details                    │
├────────────┼──────────┼─────────┼────────────────────────────┤
│ github     │ project  │ http    │ api.githubcopilot.com      │
│ filesystem │ local    │ stdio   │ @mcp/server-filesystem     │
│ notion     │ user     │ http    │ mcp.notion.com (OAuth)     │
│ postgres   │ project  │ stdio   │ @bytebase/dbhub            │
└────────────┴──────────┴─────────┴────────────────────────────┘

4 servers connected
```

---

### Ver Detalles de Servidor

```bash
$ claude mcp get github

Server: github
Scope: project
Type: http
URL: https://api.githubcopilot.com/mcp/
Authentication: OAuth 2.0 (authenticated)

Capabilities:
  - tools (15 available)
  - resources (5 types)
  - prompts (3 templates)

Tools:
  - list_repositories
  - create_issue
  - create_pull_request
  - list_pull_requests
  ... (11 more)

Resources:
  - github://repos/*
  - github://issues/*
  - github://pulls/*
  ... (2 more)

Status: ✓ Connected and operational
Last used: 2 hours ago
```

---

## 🛠️ Gestión de Servidores

### Eliminar Servidor

```bash
claude mcp remove github
```

**Confirmación:**
```
Remove MCP server 'github'?
This will disconnect the server but won't delete any data.
[y/N]: y

✓ Server 'github' removed successfully
```

---

### Resetear Aprobaciones de Proyecto

Cuando `.mcp.json` cambia, Claude Code pide aprobación. Si quieres resetear:

```bash
claude mcp reset-project-choices

✓ Project MCP choices reset
You'll be asked to approve servers again when you start Claude Code
```

---

## 📊 Límites y Configuración

### Límite de Output

Por defecto, Claude Code alerta si output de MCP excede 10,000 tokens.

**Ajustar límite:**
```bash
export MAX_MCP_OUTPUT_TOKENS=50000
claude
```

**Máximo:** 25,000 tokens

---

### Timeout de Inicialización

Por defecto: 5 segundos

**Ajustar:**
```bash
MCP_TIMEOUT=10000 claude  # 10 segundos
```

---

## 🌐 Importar desde Claude Desktop

Si ya tienes servidores configurados en Claude Desktop:

```bash
claude mcp add-from-claude-desktop

Importing MCP servers from Claude Desktop...
Found 3 servers in ~/Library/Application Support/Claude/claude_desktop_config.json

✓ github → github
✓ filesystem → filesystem_1 (name conflict, renamed)
✓ notion → notion

3 servers imported successfully
```

---

## 💻 Uso Interactivo en Claude Code

### Comando `/mcp`

Dentro de Claude Code:

```
/mcp

┌─────────────── MCP Servers ───────────────┐
│                                            │
│ Connected Servers: 4                       │
│                                            │
│ github (project)                [OAuth] ⚙  │
│ filesystem (local)              [Active] ✓ │
│ notion (user)            [Not auth'd] 🔒   │
│ postgres (project)              [Active] ✓ │
│                                            │
│ Commands:                                  │
│ • Authenticate                             │
│ • View details                             │
│ • Refresh connections                      │
│ • Configure                                │
└────────────────────────────────────────────┘
```

**Opciones:**
- Autenticar servidores OAuth
- Ver estado de conexiones
- Refrescar lista de herramientas
- Configurar permisos

---

### Referencias con `@`

```
# Referenciar recursos MCP directamente
"Analiza este issue: @github:issue://123"

"Compara estos schemas:
 @postgres:schema://users
 @postgres:schema://orders"

"Resume esta página: @notion:page://project-roadmap"
```

---

### Prompts MCP como Slash Commands

Los prompts de servidores MCP se exponen automáticamente:

```
/mcp__github__create_pr

/mcp__jira__bug_report "Login fails" high

/mcp__postgres__analyze_performance
```

---

## 🔒 Mejores Prácticas de Seguridad

### ✅ DO - Hacer

**1. Usar variables de entorno para credenciales:**
```json
{
  "api-server": {
    "type": "http",
    "url": "https://api.example.com",
    "headers": {
      "Authorization": "Bearer ${API_KEY}"  // ✓
    }
  }
}
```

**2. Agregar `.env` a `.gitignore`:**
```bash
echo ".env" >> .gitignore
```

**3. Verificar fuente de servidores de terceros:**
- Revisar código fuente en GitHub
- Verificar maintainers
- Leer documentación de seguridad

**4. Auditar conexiones regularmente:**
```bash
claude mcp list
```

**5. Usar scope apropiado:**
- Project: solo si todo el equipo necesita
- Local: para experimentación o credenciales sensibles

---

### ❌ DON'T - Evitar

**1. Nunca incluir tokens directamente:**
```json
{
  "api-server": {
    "headers": {
      "Authorization": "Bearer sk_live_abc123..."  // ✗ NO
    }
  }
}
```

**2. No commitear archivos `.mcp.json` con credenciales**

**3. No dar acceso filesystem sin restricciones:**
```bash
# ✗ Peligroso - acceso a todo el sistema
claude mcp add --transport stdio fs -- npx -y @mcp/server-filesystem /

# ✓ Mejor - solo directorio específico
claude mcp add --transport stdio fs -- npx -y @mcp/server-filesystem ~/Documents
```

**4. No ignorar alertas de seguridad de Claude Code**

---

## 📋 Checklist de Configuración

**Antes de agregar un servidor MCP:**

- [ ] Verificar que el servidor es de fuente confiable
- [ ] Leer documentación del servidor
- [ ] Preparar variables de entorno necesarias
- [ ] Decidir scope apropiado (local/project/user)
- [ ] Elegir tipo de transporte (HTTP/Stdio)
- [ ] Configurar autenticación correctamente
- [ ] Probar conexión básica
- [ ] Documentar en README del proyecto (si es project scope)

---

## 🎯 Ejercicio Práctico

**Configura estos 3 servidores MCP:**

1. **Filesystem** (local, stdio):
```bash
claude mcp add --transport stdio filesystem -- npx -y @modelcontextprotocol/server-filesystem ~/Documents
```

2. **GitHub** (project, http):
```bash
claude mcp add --scope project --transport http github https://api.githubcopilot.com/mcp/
/mcp  # Autenticar
```

3. **Servidor custom** (project, stdio con variables):
```bash
echo 'DB_URL=postgresql://localhost/mydb' >> .env
claude mcp add --scope project --transport stdio db \
  --env DB_URL="${DB_URL}" \
  -- npx -y @bytebase/dbhub
```

**Verificar:**
```bash
claude mcp list
claude mcp get filesystem
```

---

## 📝 Resumen

- **Comandos CLI:** `add`, `list`, `get`, `remove`, `reset-project-choices`
- **Transportes:** HTTP (cloud), Stdio (local), SSE (legacy)
- **Scopes:** Local (personal) > Project (equipo) > User (cross-project)
- **Autenticación:** Bearer, API keys, OAuth, variables de entorno
- **`.mcp.json`:** Configuración versionable con expansión de variables
- **Seguridad:** Variables de entorno, scope apropiado, verificar fuentes
- **Uso:** `/mcp`, referencias `@`, prompts como slash commands

---

## 🚀 Próximos Pasos

**Lección 5.4:** Exploraremos los **100+ servidores MCP disponibles**, categorías, casos de uso y cómo elegir el servidor correcto para tu proyecto.

---

**Duración estimada:** 2 horas
**Dificultad:** ⭐⭐⭐ Intermedia-Avanzada
