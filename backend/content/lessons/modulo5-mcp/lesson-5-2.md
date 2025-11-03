# Lección 5.2: Arquitectura y Componentes de MCP

> 📘 **En esta lección aprenderás:**
> - La arquitectura en capas de MCP (Datos y Transporte)
> - Protocolo JSON-RPC 2.0 que alimenta MCP
> - Los 6 primitivos fundamentales de MCP
> - Flujo completo de inicialización y comunicación
> - Tipos de transporte: Stdio vs HTTP
> - Sistema de capacidades y negociación

---

## 🏗️ Vista General de la Arquitectura

MCP utiliza una **arquitectura en capas** que separa la lógica de comunicación del mecanismo de transporte:

```
┌─────────────────────────────────────────────────┐
│          MCP HOST (Claude Code)                 │
│  ┌───────────────────────────────────────────┐  │
│  │         APPLICATION LAYER                 │  │
│  │  (Lógica de negocio, UI, orchestration)  │  │
│  └─────────────────┬─────────────────────────┘  │
│  ┌─────────────────▼─────────────────────────┐  │
│  │         DATA LAYER (JSON-RPC 2.0)        │  │
│  │  • Lifecycle management                   │  │
│  │  • Server features (tools, resources)     │  │
│  │  • Client features (sampling, logging)    │  │
│  │  • Notifications & progress              │  │
│  └─────────────────┬──────────────────────────┘  │
│  ┌─────────────────▼──────────────────────────┐  │
│  │         TRANSPORT LAYER                    │  │
│  │  • Stdio (local processes)                 │  │
│  │  • HTTP (remote servers)                   │  │
│  │  • Authentication & channels               │  │
│  └────────────────────────────────────────────┘  │
└──────────────────┬──────────────────────────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
    ┌───▼───┐  ┌──▼───┐  ┌──▼───┐
    │Server1│  │Server2│  │Server3│
    └───────┘  └──────┘  └──────┘
```

---

## 📊 Capa de Datos (Data Layer)

La capa de datos implementa el **protocolo JSON-RPC 2.0** y define toda la lógica de comunicación.

### ¿Qué es JSON-RPC 2.0?

**JSON-RPC** es un protocolo de llamada a procedimientos remotos (RPC) ligero que usa JSON.

**Estructura básica:**
```json
// Solicitud (Request)
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {}
}

// Respuesta (Response)
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [
      {
        "name": "create_file",
        "description": "Create a new file",
        "inputSchema": { ... }
      }
    ]
  }
}

// Notificación (sin respuesta esperada)
{
  "jsonrpc": "2.0",
  "method": "notifications/tools/list_changed",
  "params": {}
  // Sin campo "id"
}
```

### Características de la Capa de Datos

#### 1. **Gestión del Ciclo de Vida (Lifecycle Management)**

Controla la inicialización y terminación de conexiones.

**Flujo de inicialización:**
```
Client                              Server
  │                                   │
  │  initialize ─────────────────────>│
  │  {                                │
  │    "protocolVersion": "2025-06-18",│
  │    "capabilities": {              │
  │      "roots": { "listChanged": true }│
  │    },                             │
  │    "clientInfo": {                │
  │      "name": "claude-code",       │
  │      "version": "1.0.0"           │
  │    }                              │
  │  }                                │
  │                                   │
  │  <───────────────────── result   │
  │                         {         │
  │                           "protocolVersion": "2025-06-18",│
  │                           "capabilities": {│
  │                             "tools": {},  │
  │                             "resources": {}│
  │                           },              │
  │                           "serverInfo": { │
  │                             "name": "my-server",│
  │                             "version": "1.0.0"  │
  │                           }               │
  │                         }                 │
  │                                   │
  │  notifications/initialized ──────>│
  │                                   │
  ✓ Conexión establecida             │
```

**Código de ejemplo (Client):**
```typescript
// Iniciar conexión
const initResponse = await client.request({
  method: 'initialize',
  params: {
    protocolVersion: '2025-06-18',
    capabilities: {
      roots: { listChanged: true }
    },
    clientInfo: {
      name: 'claude-code',
      version: '1.0.0'
    }
  }
});

// Verificar compatibilidad
if (initResponse.protocolVersion !== '2025-06-18') {
  throw new Error('Protocol version mismatch');
}

// Notificar inicialización completa
await client.notify({
  method: 'notifications/initialized'
});
```

---

#### 2. **Características del Servidor (Server Features)**

Exponen capacidades que el servidor ofrece al cliente.

##### **Tools (Herramientas)**

Funciones ejecutables que el LLM puede llamar.

**Descubrimiento:**
```
Client → tools/list → Server

Server responde:
{
  "tools": [
    {
      "name": "create_file",
      "description": "Creates a new file with given content",
      "inputSchema": {
        "type": "object",
        "properties": {
          "path": {
            "type": "string",
            "description": "File path"
          },
          "content": {
            "type": "string",
            "description": "File content"
          }
        },
        "required": ["path", "content"]
      }
    },
    {
      "name": "read_file",
      "description": "Reads content of a file",
      "inputSchema": {
        "type": "object",
        "properties": {
          "path": { "type": "string" }
        },
        "required": ["path"]
      }
    }
  ]
}
```

**Ejecución:**
```
Client → tools/call → Server
{
  "name": "create_file",
  "arguments": {
    "path": "/tmp/test.txt",
    "content": "Hello MCP!"
  }
}

Server responde:
{
  "content": [
    {
      "type": "text",
      "text": "File created successfully at /tmp/test.txt"
    }
  ]
}
```

---

##### **Resources (Recursos)**

Fuentes de datos que proporcionan contexto.

**Descubrimiento:**
```
Client → resources/list → Server

Server responde:
{
  "resources": [
    {
      "uri": "file:///home/user/project/README.md",
      "name": "Project README",
      "description": "Project documentation",
      "mimeType": "text/markdown"
    },
    {
      "uri": "postgres://schema/users",
      "name": "Users Table Schema",
      "mimeType": "application/json"
    }
  ]
}
```

**Lectura:**
```
Client → resources/read → Server
{
  "uri": "file:///home/user/project/README.md"
}

Server responde:
{
  "contents": [
    {
      "uri": "file:///home/user/project/README.md",
      "mimeType": "text/markdown",
      "text": "# My Project\n\nThis is a demo..."
    }
  ]
}
```

---

##### **Prompts (Plantillas)**

Templates reutilizables para el LLM.

**Descubrimiento:**
```
Client → prompts/list → Server

Server responde:
{
  "prompts": [
    {
      "name": "code_review",
      "description": "Perform code review",
      "arguments": [
        {
          "name": "file_path",
          "description": "Path to file to review",
          "required": true
        }
      ]
    }
  ]
}
```

**Obtención:**
```
Client → prompts/get → Server
{
  "name": "code_review",
  "arguments": {
    "file_path": "src/app.ts"
  }
}

Server responde:
{
  "messages": [
    {
      "role": "user",
      "content": {
        "type": "text",
        "text": "Please review this code for:\n1. Security issues\n2. Performance\n3. Best practices\n\n[Contenido del archivo aquí]"
      }
    }
  ]
}
```

---

#### 3. **Características del Cliente (Client Features)**

Capacidades que el cliente expone al servidor.

##### **Sampling (Solicitudes de LLM)**

Permite a servidores solicitar completaciones del modelo de lenguaje.

**Útil cuando:** El servidor necesita acceso al LLM sin incluir SDK de Anthropic.

**Flujo:**
```
Server → sampling/createMessage → Client
{
  "messages": [
    {
      "role": "user",
      "content": {
        "type": "text",
        "text": "Analyze this log and identify errors"
      }
    }
  ],
  "maxTokens": 1000
}

Client (ejecuta Claude API) responde:
{
  "model": "claude-3-5-sonnet-20241022",
  "stopReason": "end_turn",
  "content": {
    "type": "text",
    "text": "I found 3 errors: ..."
  }
}
```

---

##### **Elicitation (Solicitud de Input del Usuario)**

El servidor pide confirmación o información adicional al usuario.

**Ejemplo:**
```
Server → sampling/elicitInput → Client
{
  "prompt": "This action will delete 100 files. Confirm?",
  "options": ["Yes", "No", "Cancel"]
}

Client muestra al usuario y responde:
{
  "selected": "Yes"
}
```

---

##### **Logging (Mensajes de Debug)**

Servidores envían logs al cliente para debugging.

**Niveles:** debug, info, warning, error

```
Server → notifications/log → Client
{
  "level": "info",
  "message": "Processing file: data.json",
  "data": {
    "size": 1024,
    "timestamp": "2025-10-27T10:30:00Z"
  }
}

// Cliente muestra en consola:
// [INFO] my-server: Processing file: data.json
```

---

#### 4. **Características de Utilidad**

##### **Notificaciones en Tiempo Real**

Servidores notifican cambios sin esperar solicitud.

**Ejemplo:** Lista de herramientas cambió
```
Server → notifications/tools/list_changed → Client

// Cliente responde automáticamente:
Client → tools/list → Server
```

##### **Seguimiento de Progreso**

Para operaciones de larga duración.

```
Server → notifications/progress → Client
{
  "token": "operation-123",
  "progress": 45,
  "total": 100,
  "message": "Processing file 45 of 100"
}

// Cliente muestra:
// [███████████░░░░░░░░░] 45% Processing...
```

---

## 🚀 Capa de Transporte (Transport Layer)

La capa de transporte gestiona **cómo** se envían los mensajes JSON-RPC.

### 1. Stdio Transport (Local)

**Uso:** Servidores que ejecutan como procesos locales.

**Características:**
- Comunicación via stdin/stdout
- **Sin overhead de red** (máximo performance)
- Ideal para herramientas del sistema (filesystem, git)

**Configuración:**
```bash
claude mcp add --transport stdio filesystem -- npx -y @modelcontextprotocol/server-filesystem ~/Documents
```

**Proceso:**
```
Claude Code (proceso padre)
        │
        │ spawn process
        ▼
┌─────────────────────┐
│  MCP Server         │
│  (Node.js process)  │
│                     │
│  stdin  ◄───────────┼─── write JSON-RPC
│  stdout ────────────┼───► read JSON-RPC
│  stderr ────────────┼───► logs (NO JSON-RPC)
└─────────────────────┘
```

**⚠️ Regla crítica:** NUNCA escribir a stdout en servidor stdio.
```javascript
// ❌ INCORRECTO - Rompe JSON-RPC
console.log('Procesando archivo...');

// ✅ CORRECTO - Usar stderr o logging library
console.error('Procesando archivo...');
// o
import logging;
logging.info('Procesando archivo...');
```

---

### 2. HTTP Transport (Remoto)

**Uso:** Servidores que ejecutan en la nube o servidores remotos.

**Características:**
- Comunicación via HTTP POST
- Soporte para **autenticación estándar** (Bearer tokens, OAuth)
- Opcional: **Server-Sent Events** (SSE) para notificaciones en tiempo real

**Configuración:**
```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

**Flujo HTTP:**
```
Claude Code                          Notion MCP Server
     │                                      │
     │  POST /mcp                           │
     │  Authorization: Bearer <token>       │
     │  Content-Type: application/json      │
     │  {                                   │
     │    "jsonrpc": "2.0",                │
     │    "method": "tools/list",          │
     │    "id": 1                          │
     │  }                                  │
     ├──────────────────────────────────────>│
     │                                      │
     │                   200 OK             │
     │                   {                  │
     │                     "jsonrpc": "2.0",│
     │                     "id": 1,         │
     │                     "result": {...}  │
     │                   }                  │
     │<──────────────────────────────────────┤
     │                                      │
```

**Con Server-Sent Events (opcional):**
```
// Cliente establece conexión SSE para notificaciones
GET /mcp/events
Accept: text/event-stream

// Servidor envía notificaciones push
data: {"jsonrpc":"2.0","method":"notifications/tools/list_changed"}

data: {"jsonrpc":"2.0","method":"notifications/progress","params":{...}}
```

---

### Comparación de Transportes

| Aspecto | Stdio | HTTP |
|---------|-------|------|
| **Latencia** | ~0ms | ~50-200ms |
| **Network** | No requiere | Sí |
| **Autenticación** | Sistema operativo | Tokens, OAuth |
| **Firewall** | No afectado | Puede requerir config |
| **Escalabilidad** | 1 proceso por conexión | Múltiples clientes |
| **Debugging** | Logs a stderr | Logs HTTP estándar |
| **Uso típico** | Tools locales | Servicios cloud |

---

## 🎯 Primitivos Fundamentales de MCP

MCP define **6 primitivos** que son los building blocks de cualquier integración:

### Expuestos por Servidores

#### 1. **Tools** - Acciones ejecutables
```typescript
interface Tool {
  name: string;                    // Identificador único
  description: string;             // Para el LLM
  inputSchema: JSONSchema;         // Parámetros requeridos
}

// Ejemplo
{
  name: "send_email",
  description: "Send email via SMTP",
  inputSchema: {
    type: "object",
    properties: {
      to: { type: "string", format: "email" },
      subject: { type: "string" },
      body: { type: "string" }
    },
    required: ["to", "subject", "body"]
  }
}
```

---

#### 2. **Resources** - Fuentes de datos
```typescript
interface Resource {
  uri: string;                     // URI único
  name: string;                    // Nombre legible
  description?: string;            // Descripción opcional
  mimeType?: string;               // Tipo de contenido
}

// Ejemplo
{
  uri: "github://issues/123",
  name: "Issue #123",
  description: "Bug in authentication flow",
  mimeType: "application/json"
}
```

---

#### 3. **Prompts** - Templates de conversación
```typescript
interface Prompt {
  name: string;
  description: string;
  arguments?: PromptArgument[];
}

interface PromptArgument {
  name: string;
  description: string;
  required: boolean;
}

// Ejemplo
{
  name: "debug_error",
  description: "Debug an error log",
  arguments: [
    {
      name: "error_log",
      description: "Content of error log",
      required: true
    },
    {
      name: "context",
      description: "Additional context",
      required: false
    }
  ]
}
```

---

### Expuestos por Clientes

#### 4. **Sampling** - Acceso al LLM
```typescript
interface SamplingRequest {
  messages: Message[];
  maxTokens?: number;
  temperature?: number;
  stopSequences?: string[];
  metadata?: Record<string, unknown>;
}

// Servidor solicita al cliente
await client.request('sampling/createMessage', {
  messages: [
    {
      role: 'user',
      content: { type: 'text', text: 'Summarize this log' }
    }
  ],
  maxTokens: 1000
});
```

---

#### 5. **Elicitation** - Input del usuario
```typescript
interface ElicitInputRequest {
  prompt: string;
  options?: string[];
  defaultValue?: string;
}

// Servidor pide confirmación
await client.request('elicitInput', {
  prompt: 'Delete all files in /tmp?',
  options: ['Yes', 'No']
});
```

---

#### 6. **Logging** - Mensajes de debug
```typescript
type LogLevel = 'debug' | 'info' | 'warning' | 'error';

interface LogMessage {
  level: LogLevel;
  message: string;
  data?: unknown;
}

// Servidor envía log
await client.notify('notifications/log', {
  level: 'info',
  message: 'Processed 100 records',
  data: { duration: 1234, errors: 0 }
});
```

---

## 🔄 Flujo Completo de Comunicación

Veamos un ejemplo end-to-end de crear un issue en GitHub:

```
[1] Usuario en Claude Code:
    "Crea un issue en GitHub: Bug en login"

[2] Claude Code analiza:
    - Necesita herramienta del servidor GitHub
    - Debe llamar a "create_issue"

[3] Claude Code → MCP Client (GitHub):
    tools/call
    {
      "name": "create_issue",
      "arguments": {
        "repo": "myorg/myrepo",
        "title": "Bug en login",
        "body": "Usuario reporta error al iniciar sesión",
        "labels": ["bug"]
      }
    }

[4] MCP Client → Servidor GitHub (HTTP):
    POST https://api.githubcopilot.com/mcp/call
    Authorization: Bearer <token>
    {
      "jsonrpc": "2.0",
      "method": "tools/call",
      "id": 42,
      "params": { ... }
    }

[5] Servidor GitHub:
    - Valida token
    - Llama a GitHub API
    - POST /repos/myorg/myrepo/issues

[6] GitHub API responde:
    {
      "id": 12345,
      "number": 123,
      "title": "Bug en login",
      "url": "https://github.com/myorg/myrepo/issues/123"
    }

[7] Servidor GitHub → MCP Client:
    {
      "jsonrpc": "2.0",
      "id": 42,
      "result": {
        "content": [
          {
            "type": "text",
            "text": "Issue created: #123\nURL: https://github.com/myorg/myrepo/issues/123"
          }
        ]
      }
    }

[8] MCP Client → Claude Code:
    Retorna resultado estructurado

[9] Claude Code procesa y responde:
    "✅ Issue creado exitosamente:
     - Número: #123
     - Título: Bug en login
     - URL: https://github.com/myorg/myrepo/issues/123"

[10] Usuario ve respuesta natural
```

---

## 📋 Sistema de Capacidades (Capabilities)

Durante la inicialización, cliente y servidor **negocian capacidades**.

### Ejemplo de Capacidades

**Cliente declara:**
```json
{
  "capabilities": {
    "roots": {
      "listChanged": true  // Puede notificar cambios en roots
    },
    "sampling": {}         // Soporta sampling requests
  }
}
```

**Servidor declara:**
```json
{
  "capabilities": {
    "tools": {
      "listChanged": true  // Notificará cambios en herramientas
    },
    "resources": {
      "subscribe": true,   // Soporta suscripciones a recursos
      "listChanged": true
    },
    "prompts": {
      "listChanged": false // No notifica cambios en prompts
    }
  }
}
```

**Ventaja:** Ambas partes conocen qué features están disponibles antes de usarlas.

---

## 💡 Mejores Prácticas

### Para Servidores

✅ **Implementar versionado:**
```typescript
{
  protocolVersion: "2025-06-18",
  serverInfo: {
    name: "my-server",
    version: "1.2.3"  // Semantic versioning
  }
}
```

✅ **Validar inputs con JSON Schema:**
```typescript
const schema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" }
  },
  required: ["email"]
};
```

✅ **Logging apropiado:**
- Stdio servers: solo stderr
- HTTP servers: logs estructurados JSON

✅ **Error handling robusto:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32602,
    "message": "Invalid params",
    "data": {
      "param": "email",
      "reason": "Invalid email format"
    }
  }
}
```

---

### Para Clientes

✅ **Verificar compatibilidad de protocolo:**
```typescript
if (serverVersion !== clientVersion) {
  throw new Error('Protocol version mismatch');
}
```

✅ **Manejar notificaciones asíncronas:**
```typescript
client.on('notification', (notification) => {
  if (notification.method === 'tools/list_changed') {
    refreshToolsList();
  }
});
```

✅ **Timeouts apropiados:**
```typescript
const response = await client.request(
  'tools/call',
  { name: 'expensive_operation' },
  { timeout: 60000 }  // 60 segundos
);
```

---

## 📝 Resumen

**Puntos clave:**

- **Arquitectura en capas:** Data Layer (JSON-RPC) + Transport Layer (Stdio/HTTP)
- **JSON-RPC 2.0:** Protocolo subyacente para todas las comunicaciones
- **Lifecycle:** initialize → initialized → operaciones → shutdown
- **Primitivos:**
  - Servidor: Tools, Resources, Prompts
  - Cliente: Sampling, Elicitation, Logging
- **Transportes:**
  - Stdio: procesos locales, máximo performance
  - HTTP: servidores remotos, OAuth, SSE
- **Capacidades:** Negociación de features al inicializar
- **Notificaciones:** Comunicación asíncrona sin solicitud

**Arquitectura robusta y extensible** que permite ecosistema de herramientas interoperables.

---

## 🚀 Próximos Pasos

En la **Lección 5.3** aprenderás:
- Configuración práctica de MCP en Claude Code
- Comandos CLI completos
- Scopes (local, project, user)
- Autenticación y seguridad
- Ejemplos de configuración reales

**¡Prepárate para conectar tu primer servidor MCP!**

---

**Duración estimada:** 2 horas
**Dificultad:** ⭐⭐⭐ Avanzada (arquitectura detallada)
