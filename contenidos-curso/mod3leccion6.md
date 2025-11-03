<p><strong><em>Lección 6: Comandos Personalizados (Slash Commands)</em></strong></p>

## Introducción

Los comandos slash (slash commands) te permiten crear atajos personalizados para workflows repetitivos en Claude Code. En lugar de escribir instrucciones largas cada vez, puedes ejecutar `/mi-comando` y Claude Code ejecutará automáticamente un prompt predefinido.

**¿Qué aprenderás?**
- Crear comandos personalizados con prompts reutilizables
- Usar argumentos dinámicos en comandos
- Organizar comandos con namespacing
- Ejecutar scripts Bash desde comandos
- Mejores prácticas para comandos productivos

**Caso de uso real:**

Imagina que frecuentemente necesitas:
```
You: Revisa el código en busca de bugs de seguridad, verifica que no haya SQL injection, XSS, o credenciales hardcodeadas. Genera un reporte detallado.
```

Con un comando personalizado:
```
You: /security-audit
```

## Anatomía de un slash command

Un comando slash es un archivo Markdown en `.claude/commands/`:

```
proyecto/
└── .claude/
    ├── instructions.md
    └── commands/
        ├── security-audit.md
        ├── review-pr.md
        └── deploy/
            ├── staging.md
            └── production.md
```

**Estructura básica:**

```markdown
---
description: Breve descripción del comando
allowed-tools: Bash(*), Read(*)
model: sonnet
---

# Mi Comando

Instrucciones detalladas que Claude Code ejecutará cuando invoques /mi-comando.

Puedes usar:
- Markdown completo
- Referencias a archivos con @
- Variables como $ARGUMENTS
- Scripts Bash con !comando
```

## Crear tu primer comando

### Paso 1: Crear directorio de comandos

```bash
# En tu proyecto
cd mi-proyecto
mkdir -p .claude/commands

# Crear primer comando
touch .claude/commands/review-code.md
```

### Paso 2: Definir el comando

**.claude/commands/review-code.md**:
```markdown
---
description: Revisa el código en busca de mejoras
allowed-tools: Read(*), Grep(*)
---

# Code Review

Por favor realiza una revisión exhaustiva del código:

1. **Calidad del código:**
   - ¿Sigue las mejores prácticas?
   - ¿Hay código duplicado?
   - ¿Nombres descriptivos?

2. **Performance:**
   - ¿Operaciones O(n²) evitables?
   - ¿Caching apropiado?

3. **Seguridad:**
   - ¿Validación de inputs?
   - ¿Manejo seguro de datos sensibles?

4. **Testing:**
   - ¿Cobertura adecuada?
   - ¿Casos edge cubiertos?

Genera reporte con prioridades: 🔴 Crítico, 🟡 Mejorable, 🟢 Bien.
```

### Paso 3: Usar el comando

```bash
claude
```

```
You: /review-code

Claude Code: [Ejecutando comando review-code]

Realizando revisión exhaustiva del código...

🔍 REPORTE DE CODE REVIEW

1. CALIDAD DEL CÓDIGO
🟢 Nombres descriptivos y consistentes
🟡 Función `processData()` muy larga (150 líneas) - considerar refactorizar
🟡 Código duplicado en user-service.ts:45-67 y admin-service.ts:89-112

2. PERFORMANCE
🔴 Loop O(n²) en src/utils/array.ts:23 - usar Map para O(n)
🟢 Caching implementado correctamente

3. SEGURIDAD
🔴 Input sin validar en api/users.ts:34 - riesgo SQL injection
🟡 Passwords logueadas en error handler (debug mode)

...
```

## Comandos con argumentos

Los comandos pueden recibir argumentos dinámicos:

**.claude/commands/review-pr.md**:
```markdown
---
description: Revisa un Pull Request específico
allowed-tools: Bash(gh:*), Read(*)
---

# Review Pull Request

Por favor revisa el Pull Request $1:

!gh pr view $1 --json title,body,files

Analiza:
1. Cambios propuestos
2. Impacto en el sistema
3. Tests necesarios
4. Posibles riesgos

Argumentos recibidos completos: $ARGUMENTS
```

**Uso:**
```
You: /review-pr 123

Claude Code: [Revisando PR #123]

Pull Request #123: "Add user authentication"
...
```

**Variables disponibles:**
- `$ARGUMENTS` - Todos los argumentos como string
- `$1`, `$2`, `$3`, ... - Argumentos individuales
- `$@` - Todos los argumentos como array

**Ejemplo con múltiples argumentos:**

**.claude/commands/deploy.md**:
```markdown
---
description: Deploy a un entorno específico
---

# Deploy

Deploying to environment: $1
Version: $2

!git tag v$2
!npm run build
!./scripts/deploy.sh $1 $2

Verifica deployment en: https://$1.example.com
```

```
You: /deploy staging 2.1.0

Claude Code: Deploying to environment: staging
Version: 2.1.0
...
```

## Namespacing con subdirectorios

Organiza comandos relacionados en subdirectorios:

```
.claude/commands/
├── deploy/
│   ├── staging.md       → /deploy/staging
│   ├── production.md    → /deploy/production
│   └── rollback.md      → /deploy/rollback
├── test/
│   ├── unit.md          → /test/unit
│   ├── integration.md   → /test/integration
│   └── e2e.md           → /test/e2e
└── db/
    ├── backup.md        → /db/backup
    ├── migrate.md       → /db/migrate
    └── seed.md          → /db/seed
```

**.claude/commands/deploy/staging.md**:
```markdown
---
description: Deploy to staging environment
allowed-tools: Bash(*)
---

# Deploy to Staging

!npm run build
!npm run test
!vercel deploy --env staging

Verificando health checks...
!curl https://staging.example.com/health
```

**Uso:**
```
You: /deploy/staging
```

## Ejecutar scripts Bash

Usa `!` para ejecutar comandos Bash directamente:

**.claude/commands/fix-lint.md**:
```markdown
---
description: Ejecuta linter y aplica fixes automáticos
allowed-tools: Bash(*)
---

# Fix Linting Issues

Ejecutando ESLint con auto-fix:

!npm run lint -- --fix

Si hay errores que no se pueden auto-fixar, los analizaré y sugeriré soluciones.
```

**Comandos Bash útiles:**

```markdown
# Git operations
!git status
!git diff
!git log --oneline -5

# Package management
!npm install $1
!npm run test

# File operations
!cat package.json
!ls -la src/

# CI/CD
!gh pr create --title "$1" --body "$2"
!vercel deploy --prod
```

## Referencias a archivos con @

Incluye archivos específicos en el contexto:

**.claude/commands/refactor-component.md**:
```markdown
---
description: Refactoriza un componente React
allowed-tools: Read(*), Edit(*)
---

# Refactor Component

Analizando componente: @$1

Por favor refactoriza considerando:

1. **Hooks modernos:**
   - Usar useState, useEffect apropiadamente
   - Custom hooks para lógica reutilizable

2. **Performance:**
   - useMemo, useCallback donde necesario
   - React.memo para componentes puros

3. **TypeScript:**
   - Tipos explícitos para props
   - Interfaces bien definidas

Archivos relacionados a considerar:
@src/types/
@src/hooks/

Genera versión refactorizada y explica mejoras.
```

**Uso:**
```
You: /refactor-component src/components/UserProfile.tsx
```

## Frontmatter options

El frontmatter YAML controla el comportamiento del comando:

```yaml
---
# Descripción que aparece en /help
description: Breve descripción del comando

# Herramientas permitidas (por seguridad)
allowed-tools: Bash(*), Read(*), Edit(*), Grep(*)

# Modelo específico a usar
model: sonnet  # o haiku, opus

# Deshabilitar edición de archivos
disable-edit: true

# Timeout personalizado (ms)
timeout: 30000
---
```

**Ejemplos:**

```yaml
# Comando read-only (no puede modificar archivos)
---
description: Analiza arquitectura del proyecto
allowed-tools: Read(*), Grep(*), Glob(*)
disable-edit: true
---

# Comando que requiere Opus (tareas complejas)
---
description: Diseña arquitectura completa de sistema
model: opus
---

# Comando rápido con Haiku
---
description: Genera changelog desde commits
model: haiku
allowed-tools: Bash(git:*)
---
```

## Comandos de proyecto vs globales

**Comandos de proyecto** (`.claude/commands/`):
- Específicos al proyecto actual
- Versionados en git
- Compartidos con el equipo

**Comandos globales** (`~/.config/claude/commands/`):
- Disponibles en todos los proyectos
- Personales (no en git)
- Útiles para workflows generales

**Ejemplo de comando global:**

**~/.config/claude/commands/commit.md**:
```markdown
---
description: Crea commit con mensaje conventional
allowed-tools: Bash(git:*)
---

# Smart Commit

Analizando cambios:
!git status
!git diff --staged

Basándome en los cambios, sugiero mensaje conventional commits:

Formato: `<type>(<scope>): <subject>`

Tipos: feat, fix, docs, style, refactor, test, chore

¿Qué mensaje prefieres? (o acepta sugerencia)
```

## Ejemplos prácticos

### 1. Comando de CI Check

**.claude/commands/ci-check.md**:
```markdown
---
description: Ejecuta todos los checks de CI localmente
allowed-tools: Bash(*)
---

# CI Checks Local

Ejecutando checks que correría CI:

## 1. Linting
!npm run lint

## 2. Type checking
!npm run typecheck

## 3. Tests
!npm run test

## 4. Build
!npm run build

Resumen:
- ✅ Todo OK → Safe to push
- ❌ Hay errores → Fix antes de commit
```

### 2. Comando de Security Audit

**.claude/commands/security-audit.md**:
```markdown
---
description: Auditoría de seguridad completa
allowed-tools: Read(*), Grep(*), Bash(npm:*)
---

# Security Audit

## 1. Dependencias vulnerables
!npm audit

## 2. Secrets hardcoded
Buscando posibles secretos:
!grep -r "API_KEY\|SECRET\|PASSWORD" src/ --include="*.ts" --include="*.js"

## 3. SQL Injection
Buscando queries sin parametrizar:
!grep -r "db.query.*\${" src/

## 4. XSS vulnerabilities
Buscando innerHTML sin sanitize:
!grep -r "innerHTML\|dangerouslySetInnerHTML" src/

Generando reporte de vulnerabilidades encontradas...
```

### 3. Comando de Documentación

**.claude/commands/document-api.md**:
```markdown
---
description: Genera documentación de API endpoints
allowed-tools: Read(*), Grep(*), Write(*)
---

# Document API

Analizando endpoints:
@src/routes/
@src/controllers/

Generando documentación OpenAPI 3.0:

1. Extrayendo rutas y métodos
2. Identificando request/response schemas
3. Documentando autenticación
4. Ejemplos de uso

Guardando en docs/api.md
```

### 4. Comando de Testing

**.claude/commands/test/generate.md**:
```markdown
---
description: Genera tests para archivo especificado
allowed-tools: Read(*), Write(*)
---

# Generate Tests

Archivo a testear: @$1

Analizando funciones y métodos...

Generando tests con:
- ✅ Happy path cases
- ❌ Error cases
- 🔄 Edge cases
- 🎯 Mocks necesarios

Framework: Jest + Testing Library

Creando archivo: $1.test.ts
```

**Uso:**
```
You: /test/generate src/utils/validation.ts
```

## Best practices

### 1. Nombres descriptivos

```
❌ /r               → No claro
✅ /review-code     → Claro

❌ /d prod          → Ambiguo
✅ /deploy/production → Explícito
```

### 2. Documentación en el comando

```markdown
---
description: Deploy to production with safety checks
---

# Deploy Production

Este comando ejecuta:
1. Tests completos
2. Build optimizado
3. Deploy a Vercel
4. Smoke tests
5. Notificación a Slack

Requiere: VERCEL_TOKEN en env
```

### 3. Validación de argumentos

```markdown
# Deploy

${if [ -z "$1" ]; then
  echo "Error: Debes especificar entorno (staging|production)"
  exit 1
fi}

Deploying to: $1
```

### 4. Comandos composables

```markdown
# Full CI/CD Pipeline

Ejecutando pipeline completo:

!/ci-check
!/test/e2e
!/deploy/staging

Si todo pasa, proceder con:
!/deploy/production
```

### 5. Seguridad con allowed-tools

```yaml
# Comando de análisis (solo lectura)
---
allowed-tools: Read(*), Grep(*), Glob(*)
---

# Comando de deploy (necesita Bash)
---
allowed-tools: Bash(npm:*, git:*, vercel:*)
---

# Comando completo (todas las herramientas)
---
allowed-tools: Bash(*), Read(*), Edit(*), Write(*)
---
```

## Listar y descubrir comandos

```bash
# Ver todos los comandos disponibles
claude
```

```
You: /help

Claude Code:
Comandos disponibles:

PROJECT COMMANDS (.claude/commands/):
/review-code         - Revisa el código en busca de mejoras
/security-audit      - Auditoría de seguridad completa
/deploy/staging      - Deploy to staging environment
/deploy/production   - Deploy to production with safety checks
/test/generate       - Genera tests para archivo especificado

GLOBAL COMMANDS (~/.config/claude/commands/):
/commit              - Crea commit con mensaje conventional
```

## Ejercicio práctico

Crea estos comandos para tu proyecto:

### 1. /setup-env

Configura entorno de desarrollo:
```markdown
---
description: Setup development environment
---

# Setup Environment

!cp .env.example .env
!npm install
!npx prisma generate
!npx prisma db push

¿Necesitas seed data?
```

### 2. /pr-ready

Verifica que el código está listo para PR:
```markdown
---
description: Verifica que código está listo para PR
---

# PR Ready Check

✓ Linting
✓ Tests
✓ Type checking
✓ No console.logs
✓ Branch updated with main

!git diff main...HEAD --stat
```

### 3. /analyze-bundle

Analiza tamaño del bundle:
```markdown
---
description: Analiza tamaño del bundle
---

# Bundle Analysis

!npm run build
!ls -lh dist/

Archivos grandes (>500kb):
!find dist -size +500k -exec ls -lh {} \;

Recomendaciones para optimizar...
```

## Comandos avanzados: Multiarchivo

**.claude/commands/migrate-api.md**:
```markdown
---
description: Migra endpoints de API v1 a v2
---

# API Migration v1 → v2

Archivos a migrar:
@src/api/v1/

Aplicando transformaciones:

1. **Rutas:** `/api/v1/*` → `/api/v2/*`
2. **Response format:** Añadir `meta` object
3. **Error handling:** Usar nuevos códigos
4. **Auth:** Migrar a JWT

Por cada archivo:
- Crear versión v2
- Mantener v1 (deprecated)
- Añadir tests v2

¿Proceder con migración?
```

## Comandos con IA avanzada

Usa `model: opus` para tareas complejas:

**.claude/commands/architect-feature.md**:
```markdown
---
description: Diseña arquitectura completa de feature
model: opus
---

# Architecture Design

Feature solicitada: $ARGUMENTS

Diseñando arquitectura completa:

## 1. Análisis de Requisitos
- Funcionales
- No funcionales (performance, security, scalability)

## 2. Diseño de Sistema
- Componentes necesarios
- Interacciones
- Data flow

## 3. Schema de DB
- Modelos nuevos
- Relaciones
- Indices

## 4. API Design
- Endpoints
- Request/Response schemas
- Autenticación

## 5. Frontend Components
- Component tree
- State management
- Routing

## 6. Testing Strategy
- Unit tests
- Integration tests
- E2E scenarios

Generando diagramas y documentación...
```

## Checklist de completitud

- [ ] Creé directorio `.claude/commands/`
- [ ] Creé al menos 3 comandos personalizados
- [ ] Usé argumentos con `$1`, `$2`, `$ARGUMENTS`
- [ ] Organicé comandos con namespacing (subdirectorios)
- [ ] Incluí comandos que ejecutan scripts Bash con `!`
- [ ] Configuré `allowed-tools` apropiadamente
- [ ] Documenté cada comando con descripción clara
- [ ] Probé todos los comandos creados
- [ ] Compartí comandos útiles con el equipo (git)

## Resumen

Has aprendido a:
- Crear comandos slash personalizados en `.claude/commands/`
- Usar argumentos dinámicos (`$1`, `$ARGUMENTS`)
- Organizar comandos con namespacing (subdirectorios)
- Ejecutar scripts Bash directamente con `!`
- Referenciar archivos con `@`
- Configurar comandos con frontmatter (allowed-tools, model)
- Diferenciar entre comandos de proyecto y globales
- Crear comandos composables y seguros
- Aplicar mejores prácticas para comandos productivos

Los comandos personalizados transforman workflows repetitivos en ejecuciones de un solo comando, multiplicando tu productividad con Claude Code.

**Próximos pasos:**
- Identifica workflows repetitivos en tu día a día
- Créalos como comandos slash
- Compártelos con tu equipo via git
- Evoluciónalos basándote en feedback

---

**Módulo 3 - Lección 6 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
