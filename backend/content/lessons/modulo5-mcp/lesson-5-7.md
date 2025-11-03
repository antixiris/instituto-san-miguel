# Lección 5.7: Integración Avanzada MCP + Claude Code

> 📘 **En esta lección aprenderás:**
> - Referencias a recursos con `@`
> - Prompts MCP como slash commands
> - Claude Code como servidor MCP
> - Plugins con servidores MCP integrados
> - Configuración enterprise
> - Gestión de output y performance

---

## 🔗 Referencias a Recursos con `@`

Claude Code permite referenciar recursos MCP directamente en conversaciones:

### Sintaxis

```
@<servidor>:<tipo>://<identificador>
```

### Ejemplos

```
# GitHub issues
"Analiza @github:issue://123 y sugiere soluciones"

# PostgreSQL schemas
"Compara estos schemas:
 @postgres:schema://users
 @postgres:schema://orders"

# Archivos
"Resume @filesystem:file:///home/user/report.md"

# Notion pages
"Convierte @notion:page://project-roadmap en checklist"
```

### Cómo Funciona

1. Claude Code detecta el patrón `@servidor:...`
2. Identifica el servidor MCP correcto
3. Llama a `resources/read` con el URI
4. Incluye el contenido en el contexto de Claude
5. Claude procesa con el recurso disponible

---

## 🎯 Prompts MCP como Slash Commands

Los prompts de servidores MCP se exponen automáticamente como slash commands.

### Formato

```
/mcp__<servidor>__<prompt-name>
```

### Ejemplos

**Servidor GitHub:**
```
/mcp__github__list_prs
/mcp__github__create_issue "Bug en login" high
/mcp__github__code_review main feature/auth
```

**Servidor Jira:**
```
/mcp__jira__sprint_report
/mcp__jira__bug_triage
```

**Servidor PostgreSQL:**
```
/mcp__postgres__analyze_performance
/mcp__postgres__schema_migration
```

### Crear Prompts en tu Servidor

```python
@mcp.prompt(name="code_review")
async def code_review_prompt(file_path: str) -> str:
    """Template de code review."""
    content = await read_file(file_path)

    return f"""
Revisa este código para:

1. **Seguridad:**
   - Vulnerabilidades conocidas
   - Validación de inputs
   - Manejo de secretos

2. **Performance:**
   - Queries ineficientes
   - N+1 problems
   - Caching opportunities

3. **Mejores Prácticas:**
   - Código DRY
   - Separación de concerns
   - Error handling

**Código:**
```
{content}
```

Proporciona recomendaciones accionables.
"""
```

Luego en Claude Code:

```
/mcp__myserver__code_review src/auth.ts
```

---

## 🚀 Claude Code como Servidor MCP

Puedes exponer herramientas de Claude Code a otras aplicaciones.

### Habilitar Modo Servidor

```bash
claude mcp serve
```

Esto inicia Claude Code en modo servidor MCP por stdio.

### Configurar en Claude Desktop

**Archivo:** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "claude-code": {
      "type": "stdio",
      "command": "claude",
      "args": ["mcp", "serve"]
    }
  }
}
```

### Herramientas Expuestas

Claude Code expone:

**1. read_file**
```
Leer contenido de archivos del proyecto actual
```

**2. write_file**
```
Crear o modificar archivos
```

**3. list_directory**
```
Listar contenidos de directorios
```

**4. execute_command**
```
Ejecutar comandos shell
```

**5. search_code**
```
Buscar texto en código
```

**6. git_operations**
```
Operaciones Git (status, diff, commit)
```

### Caso de Uso

Claude Desktop puede usar Claude Code como "backend" para operaciones de archivos y Git.

```
# En Claude Desktop:
"Lee el archivo src/App.tsx del proyecto ~/myapp"

→ Claude Desktop llama a claude-code (MCP server)
→ claude-code.read_file("~/myapp/src/App.tsx")
→ Contenido regresa a Claude Desktop
```

---

## 🔌 Plugins con Servidores MCP

Los plugins pueden incluir servidores MCP integrados.

### Estructura de Plugin

```
my-plugin/
├── plugin.json
├── .mcp.json           # Servidores MCP del plugin
├── src/
│   ├── index.ts
│   └── servers/
│       └── plugin-api-server.ts
└── README.md
```

### plugin.json

```json
{
  "name": "jira-integration",
  "version": "1.0.0",
  "description": "Plugin con servidor MCP de Jira",
  "main": "dist/index.js",

  "mcpServers": {
    "jira-api": {
      "type": "stdio",
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/jira-server.py",
      "env": {
        "JIRA_URL": "${JIRA_URL}",
        "JIRA_TOKEN": "${JIRA_API_TOKEN}"
      }
    }
  },

  "commands": {
    "/jira-create": {
      "description": "Crear issue en Jira",
      "handler": "createIssueCommand"
    }
  }
}
```

### Variables Especiales

- `${CLAUDE_PLUGIN_ROOT}` - Directorio del plugin
- `${CLAUDE_PROJECT_ROOT}` - Directorio del proyecto actual
- Variables de entorno definidas por usuario

### Beneficios

- **Distribución simple:** Plugin + servidor en un paquete
- **Versionado unificado:** Plugin y servidor se actualizan juntos
- **Configuración automática:** Se instala con el plugin
- **Lifecycle management:** Claude Code gestiona inicio/fin

---

## 🏢 Configuración Enterprise

Para organizaciones, configurar servidores MCP centralmente.

### Managed MCP Config

**macOS:** `/Library/Application Support/ClaudeCode/managed-mcp.json`
**Windows:** `C:\ProgramData\ClaudeCode\managed-mcp.json`
**Linux:** `/etc/claude-code/managed-mcp.json`

```json
{
  "version": "1.0",
  "mcpServers": {
    "company-github": {
      "type": "http",
      "url": "https://github-mcp.company.com",
      "headers": {
        "Authorization": "Bearer ${COMPANY_GITHUB_TOKEN}"
      }
    },
    "company-jira": {
      "type": "http",
      "url": "https://jira-mcp.company.com",
      "oauth": {
        "clientId": "${JIRA_CLIENT_ID}",
        "scopes": ["read:issue", "write:issue"]
      }
    },
    "company-database": {
      "type": "stdio",
      "command": "/usr/local/bin/db-mcp-server",
      "args": ["--readonly"],
      "env": {
        "DB_URL": "${COMPANY_DB_URL}"
      }
    }
  }
}
```

### Managed Settings (Control de Acceso)

**Archivo:** `managed-settings.json` (mismo directorio)

```json
{
  "allowedMcpServers": [
    { "serverName": "company-github" },
    { "serverName": "company-jira" },
    { "serverName": "company-database" }
  ],
  "deniedMcpServers": [
    { "serverName": "filesystem" },
    { "serverName": "puppeteer" }
  ],
  "security": {
    "requireApproval": true,
    "auditLog": "/var/log/claude-code/mcp-audit.log",
    "sensitiveDataMasking": true
  }
}
```

### Políticas de Seguridad

**Allowlist:**
- `undefined` = Sin restricciones
- `[]` = Lockdown completo
- `[{serverName: "X"}]` = Solo servidores listados

**Denylist:**
- Tiene precedencia absoluta sobre allowlist
- Bloquea servidores específicos sin importar otras configs

---

## 📊 Gestión de Output y Performance

### Límites de Output

Por defecto, Claude Code alerta si output MCP > 10,000 tokens.

```bash
# Configurar límite
export MAX_MCP_OUTPUT_TOKENS=50000
claude
```

**Máximo:** 25,000 tokens

**Recomendaciones:**
- Implementar paginación en servidores
- Filtrar datos antes de retornar
- Usar streaming cuando sea posible

### Timeout de Inicialización

```bash
# Timeout de 30 segundos (default: 5)
MCP_TIMEOUT=30000 claude
```

### Performance Best Practices

**1. Caching de conexiones:**
```python
class MCPServerManager:
    def __init__(self):
        self._connections = {}  # Cache de sesiones

    async def get_connection(self, server_id: str):
        if server_id not in self._connections:
            self._connections[server_id] = await self._connect(server_id)
        return self._connections[server_id]
```

**2. Parallel tool execution:**
```python
# Ejecutar múltiples tools en paralelo
import asyncio

results = await asyncio.gather(
    session1.call_tool("fetch_data", {}),
    session2.call_tool("process_data", {}),
    session3.call_tool("send_notification", {})
)
```

**3. Lazy loading de recursos:**
```python
@mcp.resource("data://{id}")
async def get_data(id: str):
    # Solo cargar cuando se solicite
    return await database.fetch_by_id(id)
```

---

## 🔍 Debugging de Integraciones MCP

### Ver Status de Servidores

```
# En Claude Code:
/mcp

┌─── MCP Servers Status ───┐
│ github      ✓ Connected  │
│ postgres    ✓ Connected  │
│ filesystem  ✗ Error      │
│ notion      ⏸ Not auth  │
└──────────────────────────┘
```

### Logs de MCP

```bash
# macOS
tail -f ~/Library/Logs/Claude/mcp.log

# Estructura del log
[2025-10-27 10:30:15] [github] Tool called: create_issue
[2025-10-27 10:30:16] [github] Result: Issue #123 created
[2025-10-27 10:30:17] [postgres] Connection error: timeout
```

### Modo Debug

```bash
# Activar logs verbosos
CLAUDE_LOG_LEVEL=debug claude

# Logs incluirán:
# - JSON-RPC messages completos
# - Tiempos de respuesta
# - Stack traces de errores
```

---

## 🎨 Workflows Avanzados

### Workflow 1: Deploy Automatizado

```
Usuario: "Deploy rama feature-auth a staging"

Claude Code (orquesta):
1. @github:branch://feature-auth
   → Verificar tests pasaron
2. /mcp__vercel__deploy feature-auth staging
   → Iniciar deploy
3. /mcp__slack__notify #deployments "Deploy iniciado"
   → Notificar equipo
4. Poll Vercel hasta completar
5. /mcp__slack__notify #deployments "✅ Deploy completo"
```

---

### Workflow 2: Incident Response

```
Usuario: "Investigar error en producción"

Claude Code:
1. /mcp__sentry__latest_errors production
   → Top 5 errores
2. Para cada error:
   - @sentry:stacktrace://error-id
   - @github:code://file:line
   - Analizar código relacionado
3. /mcp__linear__create_issue "Bug: [descripción]" high
   → Crear issues
4. /mcp__notion__create_page "Incident Report"
   → Documentar
5. /mcp__slack__notify #incidents "Incident tracked"
```

---

### Workflow 3: Código Review Automatizado

```
Usuario: "Review PR #456"

Claude Code:
1. @github:pr://456
   → Obtener diff completo
2. Para cada archivo modificado:
   - /mcp__myserver__code_review <file>
   - Analizar cambios
3. /mcp__github__comment_pr 456 "Review findings: ..."
   → Comentar en PR
4. /mcp__linear__update_issue <related-issue> "PR ready"
```

---

## 📝 Resumen

**Features avanzados:**
- **Referencias @:** Incluir recursos MCP en conversaciones
- **Prompts → Slash commands:** Automatización con templates
- **Claude Code como servidor:** Exponer tools a otras apps
- **Plugins con MCP:** Distribución unificada
- **Enterprise config:** Gestión centralizada, políticas de seguridad
- **Performance:** Límites, timeouts, caching
- **Debugging:** Status, logs, modo debug
- **Workflows:** Orquestación de múltiples servidores

---

## 🚀 Próximos Pasos

**Lección 5.8:** Proyecto final integrador que combina todo lo aprendido en un sistema real de gestión de proyectos.

---

**Duración estimada:** 2 horas
**Dificultad:** ⭐⭐⭐⭐⭐ Expert
