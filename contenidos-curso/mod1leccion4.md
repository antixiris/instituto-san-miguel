***Lección 4: Interfaz y comandos básicos***


## Introducción

Claude Code ofrece una interfaz rica en comandos y opciones. En esta lección dominarás la interfaz, aprenderás los comandos esenciales y descubrirás trucos para ser más productivo.

## La interfaz de Claude Code

### Modos de operación

Claude Code tiene dos modos principales:

#### 1. Modo Interactivo

```bash
claude
```

Inicia una sesión conversacional:
```
╭─ Claude Code v2.0.0 ─────────────────────────────╮
│ Modelo: claude-sonnet-4.5                         │
│ Proyecto: /Users/tu-usuario/mi-proyecto          │
╰───────────────────────────────────────────────────╯

You:
```

**Características**:
- Conversación continua
- Historial de mensajes
- Contexto mantenido durante toda la sesión
- Puedes hacer múltiples preguntas relacionadas

#### 2. Modo de Comando Único

```bash
claude "tu pregunta aquí"
```

Ejecuta una tarea y sale:
```bash
claude "analiza el archivo src/app.js y sugiere mejoras"
```

**Cuándo usar cada modo:**
- **Interactivo**: Desarrollo iterativo, debugging, exploración
- **Comando único**: Scripts, automatización, tareas simples

## Comandos slash (/) integrados

Dentro de una sesión interactiva, usa comandos slash:

### /help - Ayuda

```
You: /help
```

Muestra todos los comandos disponibles y su uso.

### /clear - Limpiar contexto

```
You: /clear
```

Resetea la conversación y limpia el contexto. Útil cuando:
- Cambias de tarea completamente
- Claude Code parece confundido
- Quieres empezar de cero

### /exit - Salir

```
You: /exit
```

Cierra la sesión interactiva. También puedes usar Ctrl+C o Ctrl+D.

### /agents - Ver agentes disponibles

```
You: /agents
```

Muestra agentes especializados que puedes usar para delegar tareas específicas.

### /mcp - Gestionar servidores MCP

```
You: /mcp
```

Lista servidores MCP instalados y disponibles.

### /install-github-app - Integración GitHub

```
You: /install-github-app
```

Inicia el proceso de instalación de Claude en GitHub.

## Flags y opciones del comando claude

### --model - Seleccionar modelo

```bash
# Usar Sonnet (balance)
claude --model sonnet "implementa feature X"

# Usar Opus (máxima capacidad)
claude --model opus "arquitectura compleja del sistema"

# Usar Haiku (velocidad)
claude --model haiku "formatea este código"
```

### --continue / -c - Continuar conversación

```bash
# Continuar última conversación
claude --continue
claude -c

# Útil para retomar el trabajo donde lo dejaste
```

### --resume - Seleccionar conversación anterior

```bash
claude --resume
```

Muestra lista de conversaciones pasadas para elegir cuál retomar.

### --output-format - Formato de salida

```bash
# Texto plano (default)
claude --output-format text "lista archivos"

# JSON (para scripts)
claude --output-format json "lista archivos" | jq .

# Stream JSON (para procesamiento en tiempo real)
claude --output-format stream-json "genera código"
```

### --permission-mode - Control de permisos

```bash
# Plan mode (solo lectura, no ejecuta cambios)
claude --permission-mode plan "analiza mi código"

# Normal mode (pide confirmación)
claude --permission-mode normal

# Auto-accept mode (acepta cambios automáticamente)
# ⚠️ Usa con precaución
```

### --verbose / -v - Modo verboso

```bash
claude -v "crea archivo test.js"
```

Muestra información adicional sobre lo que Claude Code está haciendo.

## Atajos de teclado

### En modo interactivo

| Atajo | Acción |
|-------|--------|
| `Tab` | Activar extended thinking (pensamiento profundo) |
| `Shift + Tab` | Cambiar permission mode |
| `Ctrl + C` | Cancelar operación actual |
| `Ctrl + D` | Salir de Claude Code |
| `↑` / `↓` | Navegar historial de comandos |

### Extended thinking (Tab)

```
You: [Tab] diseña arquitectura de microservicios completa
```

Claude Code pensará más profundamente antes de responder. Útil para:
- Arquitectura compleja
- Debugging difícil
- Decisiones de diseño
- Optimizaciones

## Menciones especiales con @

### @file - Referenciar archivo

```
You: Analiza @src/app.js y sugiere refactorings
```

Claude Code incluirá automáticamente el contenido del archivo.

### @directory - Referenciar directorio

```
You: Explícame la estructura de @src/components
```

Incluye listado de archivos del directorio.

### @url - Incluir URL

```
You: Implementa esta API documentada en @https://api.ejemplo.com/docs
```

Claude Code hará fetch del contenido de la URL.

### @server:resource - Recurso MCP

```
You: Trae información de @github:repos/usuario/proyecto/issues
```

Accede a recursos de servidores MCP instalados.

## Pipes y composición Unix

Claude Code se integra perfectamente con comandos Unix:

### Enviar salida a Claude Code

```bash
# Analizar logs
tail -f app.log | claude "detecta errores y anomalías"

# Procesar JSON
curl https://api.ejemplo.com/data | claude "resume estos datos"

# Git diff a changelog
git diff | claude "genera changelog descriptivo"
```

### Usar salida de Claude Code

```bash
# Guardar código generado
claude "crea función de validación email" > utils/email.js

# Procesar con otras herramientas
claude --output-format json "lista tareas" | jq '.tasks[0]'
```

## Gestión de conversaciones

### Listar conversaciones

```bash
claude --list
```

Muestra:
```
Recent conversations:
1. [2024-01-15 10:30] Implementar auth JWT
2. [2024-01-15 09:15] Debugging error DB
3. [2024-01-14 16:45] Refactor componentes React
```

### Borrar conversación

```bash
claude --delete-conversation <id>
```

### Exportar conversación

```bash
claude --export-conversation <id> > conversacion.md
```

## Configuración avanzada

### Ver todas las configuraciones

```bash
claude config list
```

### Configuraciones útiles

```bash
# Modelo por defecto
claude config set model claude-sonnet-4.5

# Auto-accept para ciertos tipos de cambios
claude config set auto-accept-formatting true

# Límite de tokens de contexto
claude config set max-context-tokens 100000

# Output por defecto
claude config set default-output-format text
```

### Resetear configuración

```bash
claude config reset
```

## Trabajando con múltiples proyectos

### Configuración por proyecto

Crea `.claude/config.json` en la raíz del proyecto:

```json
{
  "model": "claude-opus-4",
  "defaultPermissionMode": "plan",
  "autoAcceptFormatting": true,
  "customInstructions": "Siempre usa TypeScript. Prefiere programación funcional."
}
```

### Custom instructions

Guía permanente para Claude Code en tu proyecto:

```bash
# Crear .claude/instructions.md
cat > .claude/instructions.md << EOF
# Instrucciones del proyecto

## Stack tecnológico
- Node.js + Express
- PostgreSQL
- React + TypeScript

## Convenciones de código
- Usar async/await (no callbacks)
- Errores con try/catch
- Tests con Jest
- Nombrado camelCase

## Estructura
- Controladores en /src/controllers
- Modelos en /src/models
- Rutas en /src/routes
EOF
```

Claude Code leerá estas instrucciones automáticamente.

## Tips de productividad

### 1. Alias útiles

```bash
# En ~/.zshrc o ~/.bashrc
alias c='claude'
alias cc='claude --continue'
alias ca='claude --permission-mode auto'
```

### 2. Scripts con Claude Code

```bash
#!/bin/bash
# review.sh - Script de code review

git diff main...HEAD | claude --output-format json "
Analiza estos cambios y responde en JSON con:
{
  \"issues\": [\"problema1\", \"problema2\"],
  \"suggestions\": [\"mejora1\", \"mejora2\"],
  \"approved\": true/false
}
" | jq
```

### 3. Git hooks con Claude Code

```bash
# .git/hooks/pre-commit
#!/bin/bash

git diff --cached | claude "
Revisa estos cambios antes de commit.
Si hay problemas graves, responde ERROR: descripción
Si está ok, responde OK
" | grep -q "ERROR" && exit 1

exit 0
```

## Ejercicio práctico

### Objetivo: Dominar comandos básicos

Realiza estas tareas usando diferentes comandos:

1. **Iniciar sesión interactiva**
   ```bash
   claude
   ```

2. **Crear archivo con código único**
   ```bash
   claude "crea utils/logger.js con función de logging" > utils/logger.js
   ```

3. **Analizar con modo plan**
   ```bash
   claude --permission-mode plan "revisa toda la carpeta src/"
   ```

4. **Continuar conversación**
   ```bash
   claude -c
   ```

5. **Exportar conversación**
   ```bash
   claude --export-conversation 1 > docs/session.md
   ```

## Checklist de completitud

- [ ] Inicié sesión interactiva exitosamente
- [ ] Usé comandos slash (/help, /clear, /exit)
- [ ] Probé diferentes flags (--model, --continue, --output-format)
- [ ] Usé menciones @ para referenciar archivos
- [ ] Probé extended thinking con Tab
- [ ] Creé configuración de proyecto
- [ ] Usé pipes con comandos Unix
- [ ] Exporté una conversación

## Resumen

Has aprendido:
- Modos de operación (interactivo vs comando único)
- Comandos slash integrados
- Flags y opciones principales
- Atajos de teclado
- Menciones @ para contexto
- Integración con Unix
- Gestión de conversaciones
- Configuración avanzada
- Tips de productividad

En la Lección 5 configurarás preferencias avanzadas y personalizarás Claude Code completamente.

---

**Módulo 1 - Lección 4 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
