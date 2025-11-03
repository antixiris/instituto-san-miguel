<p><strong><em>Lección 2: Arquitectura y Componentes de MCP</em></strong></p>

## Introducción

Ahora que conoces qué es MCP, es momento de entender cómo funciona internamente. En esta lección aprenderás la arquitectura completa del protocolo, sus componentes y cómo interactúan entre sí.

## Arquitectura general de MCP

MCP sigue una arquitectura cliente-servidor con tres capas principales:

```
┌──────────────────────────────────────────┐
│         CAPA DE APLICACIÓN               │
│      (Claude Code, IDEs, etc.)           │
└──────────────┬───────────────────────────┘
               │
┌──────────────▼───────────────────────────┐
│       CAPA DE PROTOCOLO MCP              │
│  - Transport Layer (HTTP/SSE/Stdio)      │
│  - Message Format (JSON-RPC 2.0)         │
│  - Authentication (OAuth 2.0)            │
└──────────────┬───────────────────────────┘
               │
┌──────────────▼───────────────────────────┐
│      CAPA DE SERVIDORES MCP              │
│  - Resources (datos)                     │
│  - Tools (funciones)                     │
│  - Prompts (plantillas)                  │
└──────────────┬───────────────────────────┘
               │
┌──────────────▼───────────────────────────┐
│     SERVICIOS EXTERNOS / APIs            │
│  (GitHub, Stripe, Figma, DBs, etc.)      │
└──────────────────────────────────────────┘
```

## Componentes principales

### 1. Cliente MCP (Claude Code)

El cliente MCP es la aplicación que consume servicios. En nuestro caso, **Claude Code**.

**Responsabilidades:**
- Descubrir servidores MCP disponibles
- Establecer conexiones con servidores
- Solicitar recursos y ejecutar herramientas
- Manejar autenticación
- Procesar respuestas

**Flujo básico:**
```javascript
// Pseudo-código de cómo Claude Code usa MCP
const client = new MCPClient();

// Conectar a servidor
await client.connect('github', {
  transport: 'http',
  url: 'https://mcp.github.com'
});

// Solicitar recurso
const issues = await client.getResource('repos/usuario/proyecto/issues');

// Ejecutar herramienta
const pr = await client.executeTool('create-pr', {
  title: 'Fix bug',
  body: 'Descripción',
  branch: 'fix/bug-123'
});
```

### 2. Servidor MCP

Un servidor MCP expone capacidades de un servicio externo mediante un protocolo estandarizado.

**Componentes de un servidor:**

#### A. Resources (Recursos)

Datos que pueden ser leídos.

**Ejemplo - GitHub Server:**
```json
{
  "resources": [
    {
      "uri": "repos/{owner}/{repo}/issues",
      "name": "Repository Issues",
      "mimeType": "application/json",
      "description": "Lista de issues del repositorio"
    },
    {
      "uri": "repos/{owner}/{repo}/pulls",
      "name": "Pull Requests",
      "mimeType": "application/json"
    }
  ]
}
```

**Uso:**
```
You: @github:repos/anthropics/claude-code/issues
```

#### B. Tools (Herramientas)

Funciones que pueden ejecutarse.

**Ejemplo - GitHub Server:**
```json
{
  "tools": [
    {
      "name": "create-pr",
      "description": "Crea un Pull Request",
      "inputSchema": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "body": { "type": "string" },
          "head": { "type": "string" },
          "base": { "type": "string" }
        },
        "required": ["title", "head"]
      }
    }
  ]
}
```

**Uso:**
```
You: Crea un PR para la rama feature/auth
```

#### C. Prompts (Plantillas)

Prompts predefinidos optimizados.

**Ejemplo - GitHub Server:**
```json
{
  "prompts": [
    {
      "name": "review-pr",
      "description": "Revisa un Pull Request",
      "arguments": [
        {
          "name": "pr_number",
          "description": "Número del PR",
          "required": true
        }
      ]
    }
  ]
}
```

**Uso:**
```
You: /mcp__github__review-pr 234
```

### 3. Transport Layer (Capa de Transporte)

MCP soporta tres transportes:

#### HTTP (Recomendado para servicios cloud)

```
Cliente → HTTP Request → Servidor
Cliente ← HTTP Response ← Servidor
```

**Características:**
- Stateless
- Escalable
- Compatible con CDN/Load Balancers
- Fácil de cachear

**Configuración:**
```bash
claude mcp add github \
  --transport http \
  --url https://mcp.github.com/mcp
```

#### SSE (Server-Sent Events)

```
Cliente → HTTP Connection → Servidor
Cliente ← Stream Events ← Servidor
```

**Características:**
- Conexión persistente
- Actualizaciones en tiempo real
- Unidireccional (servidor → cliente)

**Configuración:**
```bash
claude mcp add notifications \
  --transport sse \
  --url https://mcp.ejemplo.com/sse
```

#### Stdio (Standard Input/Output)

```
Cliente → Stdin → Proceso Local
Cliente ← Stdout ← Proceso Local
```

**Características:**
- Para servidores locales
- Rápido (sin red)
- Útil para desarrollo

**Configuración:**
```bash
claude mcp add postgres \
  --transport stdio \
  -- npx @modelcontextprotocol/server-postgres
```

## Protocolo de mensajes

MCP usa **JSON-RPC 2.0** para comunicación.

### Request (Solicitud)

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "resources/read",
  "params": {
    "uri": "repos/anthropics/claude-code/issues"
  }
}
```

### Response (Respuesta exitosa)

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "contents": [
      {
        "uri": "repos/anthropics/claude-code/issues",
        "mimeType": "application/json",
        "text": "[{\"id\": 1, \"title\": \"Bug en auth\"}, ...]"
      }
    ]
  }
}
```

### Error

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32602,
    "message": "Invalid params",
    "data": {
      "detail": "Missing required field: uri"
    }
  }
}
```

## Autenticación y seguridad

### OAuth 2.0 Flow

MCP usa OAuth 2.0 para autenticación segura:

```
1. Cliente solicita autorización
   ↓
2. Servidor redirige a login del servicio
   ↓
3. Usuario autoriza permisos
   ↓
4. Servicio devuelve authorization code
   ↓
5. Cliente intercambia code por access token
   ↓
6. Cliente usa token en requests
```

**Ejemplo con GitHub:**

```bash
# Instalar servidor GitHub
claude mcp add github

# Primera vez: te redirige a GitHub
# Autorizas la aplicación
# Token se guarda automáticamente

# Uso posterior: token auto-refresh
You: @github:repos/mi-org/proyecto/issues
```

### Scopes y permisos

Los tokens tienen scopes limitados:

```json
{
  "scopes": [
    "repo:read",
    "issues:write",
    "pull_requests:write"
  ]
}
```

**Ventajas:**
- Principio de privilegio mínimo
- Fácil de revocar
- Auditable

### Almacenamiento seguro

Claude Code guarda tokens encriptados:

```
~/.claude/
  └── mcp/
      └── credentials/
          ├── github.json.enc
          ├── stripe.json.enc
          └── figma.json.enc
```

## Descubrimiento de capacidades

Los servidores MCP exponen sus capacidades mediante metadata:

### Capabilities (Capacidades del servidor)

```json
{
  "capabilities": {
    "resources": {
      "subscribe": true,
      "listChanged": true
    },
    "tools": {
      "listChanged": false
    },
    "prompts": {
      "listChanged": false
    },
    "logging": {}
  }
}
```

### List Resources

```bash
# Cliente solicita lista de recursos
→ resources/list

← {
    "resources": [
      {"uri": "repos/{owner}/{repo}/issues", ...},
      {"uri": "repos/{owner}/{repo}/pulls", ...}
    ]
  }
```

### List Tools

```bash
# Cliente solicita herramientas disponibles
→ tools/list

← {
    "tools": [
      {"name": "create-pr", "inputSchema": {...}},
      {"name": "close-issue", "inputSchema": {...}}
    ]
  }
```

## Ciclo de vida de una conexión MCP

### 1. Inicialización

```
Claude Code inicia
  ↓
Lee configuración MCP (~/.claude/mcp/config.json)
  ↓
Conecta a servidores configurados
  ↓
Descubre capacidades de cada servidor
  ↓
Carga tokens de autenticación
  ↓
Servidor listo para usar
```

### 2. Uso normal

```
Usuario hace pregunta con @resource
  ↓
Claude Code identifica servidor necesario
  ↓
Envía request al servidor MCP
  ↓
Servidor consulta API externa
  ↓
Devuelve datos a Claude Code
  ↓
Claude Code procesa y responde al usuario
```

### 3. Cierre

```
Usuario cierra Claude Code
  ↓
Cierra conexiones a servidores MCP
  ↓
Guarda estado si necesario
  ↓
Libera recursos
```

## Configuración de servidores

### Scopes de configuración

#### 1. User Scope (Global)

```bash
# Disponible en todos los proyectos
claude mcp add github --scope user
```

Guardado en: `~/.claude/mcp/config.json`

#### 2. Project Scope

```bash
# Solo en este proyecto, compartido con equipo
claude mcp add github --scope project
```

Guardado en: `.mcp.json` (se puede versionar con Git)

#### 3. Local Scope

```bash
# Solo en este proyecto, no compartido
claude mcp add github --scope local
```

Guardado en: `.mcp.local.json` (en .gitignore)

### Archivo de configuración

**Ejemplo `.mcp.json`:**

```json
{
  "mcpServers": {
    "github": {
      "transport": "http",
      "url": "https://mcp.github.com/mcp",
      "enabled": true,
      "credentials": "user"
    },
    "stripe": {
      "transport": "http",
      "url": "https://mcp.stripe.com/mcp",
      "enabled": true,
      "credentials": "env:STRIPE_TOKEN"
    },
    "postgres": {
      "transport": "stdio",
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://localhost/mydb"
      }
    }
  }
}
```

## Manejo de errores

MCP define códigos de error estándar:

| Código | Nombre | Descripción |
|--------|--------|-------------|
| -32700 | Parse error | JSON inválido |
| -32600 | Invalid Request | Request mal formado |
| -32601 | Method not found | Método no existe |
| -32602 | Invalid params | Parámetros incorrectos |
| -32603 | Internal error | Error del servidor |

**Ejemplo de error handling:**

```javascript
try {
  const data = await client.getResource('invalid-uri');
} catch (error) {
  if (error.code === -32602) {
    console.log('Parámetros inválidos:', error.data);
  } else if (error.code === -32603) {
    console.log('Error del servidor:', error.message);
  }
}
```

## Resumen

Has aprendido:
- Arquitectura completa de MCP (3 capas)
- Componentes principales (Cliente, Servidor, Transport)
- Tipos de componentes del servidor (Resources, Tools, Prompts)
- Protocolos de transporte (HTTP, SSE, Stdio)
- Formato de mensajes (JSON-RPC 2.0)
- Autenticación con OAuth 2.0
- Descubrimiento de capacidades
- Ciclo de vida de conexiones
- Configuración y scopes
- Manejo de errores

En la Lección 3 configurarás MCP en Claude Code y harás tu primera instalación de un servidor.

---

**Módulo 5 - Lección 2 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
