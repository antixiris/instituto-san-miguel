<p><strong><em>Lección 3: Configuración de MCP en Claude Code</em></strong></p>

## Introducción

Con los fundamentos de MCP claros, es momento de configurar tu primer servidor MCP en Claude Code. En esta lección instalarás servidores, configurarás autenticación y harás tus primeras consultas con MCP.

## Verificar que MCP está disponible

Primero, verifica que tu instalación de Claude Code soporta MCP:

```bash
# Verificar versión de Claude Code
claude --version

# Debe ser 2.0.0 o superior para MCP
```

```bash
# Verificar comando mcp disponible
claude mcp --help
```

Si ves la ayuda de MCP, estás listo para continuar.

## Instalar tu primer servidor MCP

### Paso 1: Listar servidores disponibles

```bash
# Ver servidores MCP disponibles públicamente
claude mcp catalog
```

Verás una lista como:
```
Servidores MCP disponibles:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Nombre      Categoría        Descripción
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 github      Project Mgmt     GitHub issues, PRs, repos
 stripe      Payments         Stripe payments, customers
 figma       Design           Figma designs, components
 linear      Project Mgmt     Linear issues, projects
 notion      Content          Notion pages, databases
 postgres    Database         PostgreSQL queries
 ...
```

### Paso 2: Instalar GitHub MCP Server

```bash
# Instalar con transporte HTTP (recomendado)
claude mcp add github --transport http
```

**Output esperado:**
```
Installing GitHub MCP server...
✓ Server registered: github
✓ Transport: HTTP
⚠ Authentication required

To authenticate:
1. Run: claude mcp auth github
2. Or use it and authenticate on first use

Server installed successfully!
```

### Paso 3: Autenticar con GitHub

```bash
# Iniciar autenticación OAuth
claude mcp auth github
```

**Flujo de autenticación:**

1. **Se abre navegador automáticamente**
   ```
   Opening browser for GitHub authentication...
   ```

2. **Login en GitHub**
   - Inicia sesión en GitHub si no lo estás

3. **Autorizar permisos**
   ```
   Claude Code MCP está solicitando permisos:

   ✓ Read repositories
   ✓ Read and write issues
   ✓ Read and write pull requests

   [Authorize] [Cancel]
   ```

4. **Click en Authorize**

5. **Volver a terminal**
   ```
   ✓ Authentication successful!
   ✓ Token saved securely
   ✓ GitHub MCP server is ready to use
   ```

### Paso 4: Verificar instalación

```bash
# Listar servidores instalados
claude mcp list
```

**Output:**
```
Installed MCP Servers:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Name     Status      Transport    Scope
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 github   ✓ Ready     HTTP         user
```

### Paso 5: Probar el servidor

```bash
# Iniciar Claude Code
claude
```

```
You: Lista los repositorios de mi organización en @github:orgs/mi-org/repos
```

**Claude Code responde:**
```
Consultando GitHub MCP server...

Repositorios en mi-org:
1. api-backend (Node.js) - 156 stars
2. frontend-app (React) - 89 stars
3. mobile-ios (Swift) - 45 stars
4. docs (Markdown) - 23 stars

¿Quieres que explore algún repositorio específico?
```

¡Felicitaciones! MCP está funcionando.

## Instalar servidor con Stdio (local)

Algunos servidores se ejecutan como procesos locales.

### Ejemplo: PostgreSQL Server

```bash
# Instalar servidor PostgreSQL MCP
claude mcp add postgres \
  --transport stdio \
  --command npx \
  --args "@modelcontextprotocol/server-postgres" \
  --env DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"
```

**Verificar:**
```bash
claude mcp get postgres
```

**Output:**
```
Server: postgres
Transport: stdio
Command: npx @modelcontextprotocol/server-postgres
Environment:
  DATABASE_URL: postgresql://***:***@localhost:5432/mydb
Status: ✓ Ready
```

**Uso:**
```
You: ¿Cuántos usuarios hay en @postgres:users?
```

## Configuración avanzada

### Scopes de instalación

#### User scope (global)

```bash
# Disponible en todos los proyectos
claude mcp add github --scope user
```

Configuración guardada en: `~/.claude/mcp/config.json`

#### Project scope (compartido)

```bash
# Solo en este proyecto, compartible con equipo
cd mi-proyecto
claude mcp add linear --scope project
```

Configuración guardada en: `.mcp.json` (puedes hacer commit)

#### Local scope (privado)

```bash
# Solo en este proyecto, no compartido
claude mcp add stripe --scope local
```

Configuración guardada en: `.mcp.local.json` (agregar a .gitignore)

### Configurar variables de entorno

Algunos servidores necesitan variables de entorno:

```bash
# Método 1: Durante instalación
claude mcp add stripe \
  --transport http \
  --env STRIPE_API_KEY="sk_test_xxx"

# Método 2: Usar variable de sistema
export STRIPE_API_KEY="sk_test_xxx"
claude mcp add stripe --transport http
```

### Editar configuración manual

```bash
# Abrir configuración en editor
claude mcp config edit

# O editar archivo directamente
vim ~/.claude/mcp/config.json
```

**Ejemplo de configuración manual:**

```json
{
  "mcpServers": {
    "github": {
      "transport": "http",
      "url": "https://mcp.github.com/mcp",
      "enabled": true,
      "auth": {
        "type": "oauth2",
        "credentialPath": "~/.claude/mcp/credentials/github.json"
      }
    },
    "postgres": {
      "transport": "stdio",
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      },
      "enabled": true
    }
  }
}
```

## Gestión de servidores

### Ver detalles de un servidor

```bash
claude mcp get github
```

### Deshabilitar temporalmente

```bash
# Deshabilitar sin desinstalar
claude mcp disable github

# Habilitar de nuevo
claude mcp enable github
```

### Desinstalar servidor

```bash
# Desinstalar completamente
claude mcp remove github

# Confirmación
Are you sure you want to remove github? (y/N): y
✓ Server removed
✓ Credentials deleted
```

### Actualizar servidor

```bash
# Actualizar a última versión
claude mcp update github
```

### Ver logs de servidor

```bash
# Ver logs del servidor
claude mcp logs github

# Logs en tiempo real
claude mcp logs github --follow
```

## Troubleshooting

### Problema: "Authentication failed"

**Solución:**
```bash
# Re-autenticar
claude mcp auth github --force

# O eliminar y volver a agregar
claude mcp remove github
claude mcp add github
```

### Problema: "Server not responding"

**Solución:**
```bash
# Ver estado del servidor
claude mcp get github

# Reiniciar servidor
claude mcp restart github

# Ver logs para debugging
claude mcp logs github
```

### Problema: "Permission denied"

**Causa**: Scopes insuficientes en OAuth

**Solución:**
```bash
# Re-autenticar con scopes correctos
claude mcp auth github --force

# En el navegador, asegúrate de autorizar TODOS los permisos
```

### Problema: Servidor stdio no inicia

**Causa**: Comando o argumentos incorrectos

**Solución:**
```bash
# Verificar que el comando funciona manualmente
npx @modelcontextprotocol/server-postgres

# Si funciona, verificar configuración
claude mcp get postgres
```

## Configuración de equipo

Para compartir configuración MCP con tu equipo:

### Paso 1: Crear .mcp.json en proyecto

```json
{
  "mcpServers": {
    "github": {
      "transport": "http",
      "scope": "project",
      "required": true
    },
    "linear": {
      "transport": "http",
      "scope": "project",
      "required": true
    },
    "postgres": {
      "transport": "stdio",
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      },
      "required": false
    }
  }
}
```

### Paso 2: Documentar en README

```markdown
## Configuración MCP

Este proyecto usa los siguientes servidores MCP:

### Requeridos:
- **GitHub**: `claude mcp add github`
- **Linear**: `claude mcp add linear`

### Opcionales:
- **PostgreSQL**: `claude mcp add postgres --transport stdio --command npx --args "@modelcontextprotocol/server-postgres"`

### Variables de entorno:
```bash
export DATABASE_URL="postgresql://localhost/mydb"
```

### Instalación rápida:
```bash
claude mcp install-from-project
```
```

### Paso 3: Script de setup

```bash
#!/bin/bash
# setup-mcp.sh

echo "Instalando servidores MCP del proyecto..."

# Instalar desde .mcp.json
claude mcp install-from-project

# Verificar instalación
claude mcp list

echo "✓ MCP configurado. Autentica los servicios:"
echo "  claude mcp auth github"
echo "  claude mcp auth linear"
```

## Ejercicio práctico

### Objetivo: Configurar 3 servidores MCP

1. **GitHub (HTTP)**
   ```bash
   claude mcp add github --transport http
   claude mcp auth github
   ```

2. **PostgreSQL (Stdio)**
   ```bash
   export DATABASE_URL="postgresql://localhost/testdb"
   claude mcp add postgres --transport stdio --command npx --args "@modelcontextprotocol/server-postgres"
   ```

3. **Notion (HTTP, opcional)**
   ```bash
   claude mcp add notion --transport http
   claude mcp auth notion
   ```

4. **Probar cada servidor:**
   ```
   You: @github:repos/tu-usuario
   You: @postgres:users
   You: @notion:pages
   ```

## Checklist de completitud

- [ ] Verifiqué versión de Claude Code soporta MCP
- [ ] Instalé GitHub MCP server
- [ ] Autentiqué exitosamente con OAuth
- [ ] Probé hacer consultas con @github
- [ ] Instalé servidor stdio (PostgreSQL u otro)
- [ ] Entiendo diferencia entre scopes (user/project/local)
- [ ] Configuré variables de entorno
- [ ] Sé troubleshootear problemas comunes

## Resumen

Has aprendido a:
- Instalar servidores MCP (HTTP y Stdio)
- Autenticar con OAuth 2.0
- Configurar scopes y variables de entorno
- Gestionar servidores (habilitar, deshabilitar, actualizar)
- Solucionar problemas comunes
- Compartir configuración con equipo

En la Lección 4 explorarás el catálogo completo de servidores MCP disponibles y sus capacidades.

---

**Módulo 5 - Lección 3 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
