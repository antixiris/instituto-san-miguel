***Lección 5: Configuración de preferencias y ajustes***


## Introducción

Claude Code es altamente personalizable. En esta lección aprenderás a configurar el entorno según tus preferencias, crear workflows personalizados y optimizar tu experiencia de desarrollo.

## Sistema de configuración

Claude Code tiene tres niveles de configuración:

### 1. Configuración Global (Usuario)

Aplicable a todos los proyectos.

**Ubicación**: `~/.claude/config.json`

```bash
# Ver configuración global
claude config list --global
```

### 2. Configuración de Proyecto

Específica para un proyecto, compartida con el equipo.

**Ubicación**: `.claude/config.json` (en raíz del proyecto)

```bash
# Ver configuración del proyecto
claude config list
```

### 3. Variables de Entorno

Configuración temporal para una sesión específica.

```bash
CLAUDE_MODEL=opus claude "tarea compleja"
```

## Configuraciones esenciales

### Modelo por defecto

```bash
# Configurar modelo global
claude config set model claude-sonnet-4.5

# Por proyecto
cd mi-proyecto
claude config set --local model claude-opus-4
```

**Modelos disponibles:**
- `claude-sonnet-4.5`: Balance perfecto (recomendado)
- `claude-opus-4`: Máxima capacidad
- `claude-haiku-4`: Máxima velocidad

### Permission modes

```bash
# Normal (pide confirmación)
claude config set defaultPermissionMode normal

# Plan (solo análisis, sin cambios)
claude config set defaultPermissionMode plan

# Auto-accept (avanzado)
claude config set defaultPermissionMode auto
```

### Auto-aceptar formateo

```bash
# Auto-aceptar cambios de formato de código
claude config set autoAcceptFormatting true
```

### Output format

```bash
# Formato de salida por defecto
claude config set defaultOutputFormat text  # text | json | markdown
```

### Context window

```bash
# Máximo de tokens de contexto
claude config set maxContextTokens 200000
```

## Archivo .claude/instructions.md

Instrucciones permanentes que Claude Code siempre seguirá en tu proyecto.

### Crear instrucciones del proyecto

```bash
mkdir -p .claude
cat > .claude/instructions.md << 'EOF'
# Instrucciones del Proyecto

## Stack Tecnológico
- **Backend**: Node.js 20 + Express
- **Base de datos**: PostgreSQL 15
- **ORM**: Prisma
- **Testing**: Jest
- **Linting**: ESLint + Prettier

## Convenciones de Código

### Nombrado
- Archivos: kebab-case (user-controller.js)
- Variables/funciones: camelCase (getUserById)
- Clases: PascalCase (UserService)
- Constantes: UPPER_SNAKE_CASE (MAX_RETRIES)

### Estructura
```
src/
  ├── controllers/   # Lógica HTTP
  ├── services/      # Lógica de negocio
  ├── models/        # Modelos Prisma
  ├── routes/        # Definición de rutas
  ├── middleware/    # Middleware Express
  └── utils/         # Utilidades
```

### Patrones Requeridos
- **Async/await**: Nunca usar callbacks
- **Error handling**: Siempre try/catch en async
- **Validación**: Joi para validar inputs
- **Tests**: Coverage mínimo 80%

### Seguridad
- Nunca hardcodear secrets
- Usar variables de entorno
- Sanitizar inputs de usuario
- Prepared statements en SQL

### Commits
- Conventional commits (feat:, fix:, docs:)
- Mensajes descriptivos en español
- Incluir "Co-Authored-By: Claude"

## Estilo de Respuesta
- Explicar decisiones de arquitectura
- Incluir comentarios en código complejo
- Sugerir mejoras proactivamente
- Alertar sobre posibles bugs
EOF
```

### Ejemplo de uso

Ahora cuando uses Claude Code:

```
You: Crea un endpoint para crear usuarios
```

Claude Code automáticamente:
- Usará la estructura de carpetas correcta
- Aplicará convenciones de nombrado
- Incluirá validación con Joi
- Agregará error handling
- Creará tests
- Seguirá patrones de seguridad

## Archivo .claudeignore

Similar a `.gitignore`, excluye archivos del contexto.

### Crear .claudeignore

```bash
cat > .claudeignore << 'EOF'
# Dependencias
node_modules/
vendor/

# Build output
dist/
build/
.next/
out/

# Logs
*.log
logs/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# Test coverage
coverage/

# OS
.DS_Store
Thumbs.db

# Large files
*.mp4
*.mov
*.zip
*.tar.gz

# Database
*.sqlite
*.db

# Secrets
secrets/
*.pem
*.key
EOF
```

### Verificar qué archivos ve Claude Code

```
You: Lista los archivos que puedes ver en este proyecto
```

## Configuración de Status Line

Personaliza la barra de estado en el terminal.

### Habilitar status line

```bash
claude config set statusLine.enabled true
```

### Personalizar información mostrada

```bash
# Mostrar modelo actual
claude config set statusLine.showModel true

# Mostrar uso de tokens
claude config set statusLine.showTokens true

# Mostrar modo de permisos
claude config set statusLine.showPermissionMode true
```

## Memory y Checkpointing

Claude Code puede recordar información entre sesiones.

### Habilitar memory

```bash
claude config set memory.enabled true
```

### Guardar checkpoint manual

```
You: /checkpoint "antes de refactor grande"
```

### Restaurar checkpoint

```
You: /restore-checkpoint
```

## Configuración de Terminal

### Color scheme

```bash
# Personalizar colores
claude config set theme.primary "#6366f1"
claude config set theme.success "#10b981"
claude config set theme.error "#ef4444"
```

### Formato de código

```bash
# Syntax highlighting
claude config set syntaxHighlighting true

# Line numbers en diff
claude config set showLineNumbers true
```

## Integración con editores

### VS Code Extension

**Instalación:**
1. Abre VS Code
2. Extensiones (Cmd+Shift+X)
3. Busca "Claude Code"
4. Instala

**Configuración en VS Code:**

```json
// settings.json
{
  "claude.defaultModel": "claude-sonnet-4.5",
  "claude.autoSuggest": true,
  "claude.inlineCompletions": true,
  "claude.keybindings": {
    "chat": "cmd+shift+c",
    "explain": "cmd+shift+e",
    "refactor": "cmd+shift+r"
  }
}
```

### JetBrains IDEs

**Instalación:**
1. Settings → Plugins
2. Busca "Claude Code"
3. Install y restart

## Configuración avanzada

### Network settings

Si estás detrás de un proxy:

```bash
claude config set network.proxy "http://proxy.empresa.com:8080"
claude config set network.proxyAuth "user:pass"
```

### Rate limiting

```bash
# Requests por minuto
claude config set rateLimit.requestsPerMinute 20

# Cooldown entre requests largos
claude config set rateLimit.cooldownSeconds 5
```

### Logging

```bash
# Nivel de log (debug, info, warn, error)
claude config set logLevel info

# Guardar logs en archivo
claude config set logFile "~/.claude/logs/claude.log"
```

## Templates de proyecto

Crea templates reutilizables para inicializar proyectos.

### Crear template

```bash
mkdir -p ~/.claude/templates/express-api

cat > ~/.claude/templates/express-api/template.json << 'EOF'
{
  "name": "Express API Template",
  "description": "API REST con Express, Prisma y Jest",
  "files": [
    {
      "path": "src/index.js",
      "prompt": "Crea servidor Express básico con cors y helmet"
    },
    {
      "path": "prisma/schema.prisma",
      "prompt": "Schema Prisma con User model básico"
    },
    {
      "path": "package.json",
      "content": "{...}"
    }
  ],
  "instructions": "API siguiendo convenciones REST, async/await, tests con Jest"
}
EOF
```

### Usar template

```bash
claude init --template express-api
```

## Scripts personalizados

Crea scripts que usen Claude Code:

### Code review script

```bash
#!/bin/bash
# scripts/review.sh

echo "🔍 Ejecutando code review con Claude Code..."

git diff main...HEAD | claude --output-format json "
Analiza estos cambios:

Responde JSON:
{
  \"security_issues\": [...],
  \"bugs\": [...],
  \"improvements\": [...],
  \"approved\": true/false
}
" | jq '.'
```

### Documentation generator

```bash
#!/bin/bash
# scripts/gen-docs.sh

claude "
Genera documentación en docs/API.md para todos los archivos en src/routes/

Incluye:
- Descripción de cada endpoint
- Parámetros
- Responses
- Ejemplos de uso
"
```

### Test generator

```bash
#!/bin/bash
# scripts/gen-tests.sh

for file in src/**/*.js; do
  test_file="tests/${file#src/}"
  test_file="${test_file%.js}.test.js"

  claude "Genera tests Jest completos para @$file" > "$test_file"
done
```

## Hooks de proyecto

Automatiza tareas en eventos específicos.

### Pre-commit hook

```bash
# .claude/hooks/pre-commit
#!/bin/bash

# Revisar que no haya secrets
git diff --cached | claude "
Busca secretos, API keys, passwords.
Si encuentras algo, responde ERROR: descripción
Si está limpio, responde OK
" | grep -q "ERROR" && exit 1

# Verificar estilo de código
git diff --cached | claude "
Verifica que siga nuestras convenciones de código
(ver .claude/instructions.md)
Responde OK o ERROR: descripción
" | grep -q "ERROR" && exit 1

exit 0
```

Hacer ejecutable:
```bash
chmod +x .claude/hooks/pre-commit
```

## Ejercicio práctico: Configuración completa

### Objetivo: Configurar proyecto profesional

1. **Crear estructura de configuración**
   ```bash
   mkdir -p .claude/hooks
   ```

2. **Instrucciones del proyecto**
   ```bash
   # Crear .claude/instructions.md con tus convenciones
   ```

3. **Ignorar archivos innecesarios**
   ```bash
   # Crear .claudeignore
   ```

4. **Configurar modelo**
   ```bash
   claude config set --local model claude-sonnet-4.5
   ```

5. **Habilitar auto-accept formateo**
   ```bash
   claude config set --local autoAcceptFormatting true
   ```

6. **Crear script de review**
   ```bash
   # Crear scripts/review.sh
   ```

7. **Probar configuración**
   ```bash
   claude "crea un nuevo controller siguiendo nuestras convenciones"
   ```

## Checklist de completitud

- [ ] Entiendo niveles de configuración (global/proyecto/env)
- [ ] Creé .claude/instructions.md
- [ ] Configuré .claudeignore
- [ ] Configuré modelo y permisos
- [ ] Habilité status line
- [ ] Instalé extensión de VS Code (opcional)
- [ ] Creé al menos un script personalizado
- [ ] Configuré hooks de proyecto
- [ ] Probé que la configuración funciona

## Troubleshooting

### Configuración no se aplica

```bash
# Ver configuración efectiva
claude config list --effective
```

### Resetear configuración

```bash
# Global
claude config reset --global

# Proyecto
claude config reset
```

### Conflicto de configuraciones

Orden de precedencia:
1. Variables de entorno
2. Configuración de proyecto
3. Configuración global

## Resumen

Has aprendido a:
- Configurar Claude Code en diferentes niveles
- Crear instrucciones de proyecto
- Usar .claudeignore efectivamente
- Personalizar la interfaz
- Integrar con editores
- Crear scripts personalizados
- Configurar hooks de proyecto
- Optimizar el flujo de trabajo

Has completado el **Módulo 1: Introducción a Claude Code**. Ahora tienes las bases para comenzar a desarrollar profesionalmente con Claude Code.

En el Módulo 2 aprenderás técnicas avanzadas de conversación y prompting.

---

**Módulo 1 - Lección 5 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
