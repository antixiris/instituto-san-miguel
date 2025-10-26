# Estructura Completa del Curso: Especialista en desarrollo de software con Claude Code

## Información General
- **Título**: Especialista en desarrollo de software con Claude Code
- **Duración total**: 45 horas
- **Nivel**: Principiante a Experto
- **Módulos**: 9 módulos
- **Lecciones totales**: 45 lecciones (5 por módulo)
- **Enfoque**: Progresivo, práctico, con casos reales

---

## MÓDULO 1: Fundamentos de Claude Code (5 horas) ✅ COMPLETADO
**Estado**: Implementado completamente en curso-claude-code-completo.json

### Lección 1.1: Introducción a Claude Code (45min)
### Lección 1.2: Instalación en diferentes sistemas operativos (60min)
### Lección 1.3: Autenticación y configuración inicial (50min)
### Lección 1.4: Tu primera sesión interactiva (70min)
### Lección 1.5: Comandos básicos y flujo de trabajo fundamental (65min)

---

## MÓDULO 2: Modo Interactivo Avanzado (5 horas)

### Lección 2.1: Atajos de teclado y productividad (45min)
**Contenido**:
- Todos los shortcuts esenciales
- Configuración de terminal para Shift+Enter
- Entrada multilínea efectiva
- Navegación de historial con Ctrl+R
- Extended thinking toggle
- Permission modes toggle

**Ejercicio**: MATCHING_PAIRS - Emparejar shortcuts con funciones

### Lección 2.2: Sistema de permisos y seguridad (60min)
**Contenido**:
- Permisos granulares por herramienta
- Standard mode vs Auto-accept vs Plan mode
- Configuración de allowedTools/disallowedTools
- Sandboxing y aislamiento
- Mejores prácticas de seguridad

**Ejercicio**: MULTIPLE_CHOICE - Escenarios de seguridad

### Lección 2.3: Gestión avanzada del contexto (55min)
**Contenido**:
- Comando /compact y estrategias
- Manejo de conversaciones largas
- Referencias con @ y autocompletado
- --add-dir para múltiples directorios
- Optimización de tokens

**Ejercicio**: TRUE_FALSE - Conceptos de gestión de contexto

### Lección 2.4: Background tasks y ejecución asíncrona (50min)
**Contenido**:
- Ejecutar comandos en background
- BashOutput tool para monitoreo
- Ctrl+B para background
- Casos de uso: builds, tests, servers
- Gestión de múltiples procesos

**Ejercicio**: CODE_CHALLENGE - Script con background tasks

### Lección 2.5: Debugging y troubleshooting con Claude Code (70min)
**Contenido**:
- Estrategias de debugging efectivas
- Análisis de stack traces
- Debugging interactivo
- /doctor para diagnóstico
- Solución de problemas comunes

**Ejercicio**: CODE_CHALLENGE - Depurar aplicación con errores

---

## MÓDULO 3: Comandos Slash y Personalización (5 horas)

### Lección 3.1: Comandos slash built-in (50min)
**Contenido**:
- /help, /clear, /status, /config
- /model, /permissions, /memory
- /compact, /rewind
- /terminal-setup, /sandbox
- /doctor, /cost, /usage

**Ejercicio**: FILL_BLANKS - Completar comandos slash apropiados

### Lección 3.2: Crear tus propios comandos slash (70min)
**Contenido**:
- Estructura de .claude/commands/
- Sintaxis Markdown + frontmatter
- Argumentos: $ARGUMENTS, $1, $2
- argument-hint y description
- Project vs User commands
- Namespacing con subdirectorios

**Ejercicio**: CODE_CHALLENGE - Crear 3 comandos personalizados

### Lección 3.3: Comandos slash avanzados con bash (60min)
**Contenido**:
- Ejecución de bash en comandos con !
- Referencias a archivos con @
- Comandos dinámicos
- Integración con tools del sistema
- Casos de uso avanzados

**Ejercicio**: CODE_CHALLENGE - Comando slash con lógica compleja

### Lección 3.4: SlashCommand tool y automatización (55min)
**Contenido**:
- SlashCommand tool para agentes
- description frontmatter obligatorio
- allowed-tools restriction
- Budget de 15,000 caracteres
- Deshabilitar con /permissions

**Ejercicio**: MULTIPLE_CHOICE - SlashCommand tool concepts

### Lección 3.5: Plugins y comandos de marketplace (50min)
**Contenido**:
- Instalar plugins de marketplace
- Formato /plugin-name:command-name
- Crear y distribuir plugins
- Mejores prácticas de plugins
- Comunidad y compartir comandos

**Ejercicio**: TRUE_FALSE - Plugins y marketplace

---

## MÓDULO 4: Skills - Capacidades Modulares (5 horas)

### Lección 4.1: Introducción a Skills (45min)
**Contenido**:
- Qué son Skills vs Slash Commands
- Invocación automática basada en contexto
- Ubicaciones: ~/.claude/skills/, .claude/skills/
- Casos de uso ideales
- Ventajas de modularidad

**Ejercicio**: MATCHING_PAIRS - Skills vs Slash Commands

### Lección 4.2: Crear tu primer Skill (70min)
**Contenido**:
- Estructura de SKILL.md
- Frontmatter: name, description
- Writing effective descriptions
- Instrucciones paso a paso
- Testing y refinamiento

**Ejercicio**: CODE_CHALLENGE - Crear Skill básico

### Lección 4.3: Skills avanzados con múltiples archivos (60min)
**Contenido**:
- Estructura de carpetas
- Archivos de referencia, scripts, templates
- Imports y referencias
- allowed-tools para restricción
- Organización y mantenimiento

**Ejercicio**: CODE_CHALLENGE - Skill multi-archivo

### Lección 4.4: Skills para equipos y proyectos (55min)
**Contenido**:
- Project Skills en .claude/skills/
- Versionado con Git
- Documentación para el equipo
- Convenciones y estándares
- Review y mejora continua

**Ejercicio**: SEQUENCE_ORDER - Workflow de Skills en equipo

### Lección 4.5: Skills especializados: ejemplos reales (50min)
**Contenido**:
- Code Reviewer Skill
- Test Generator Skill
- Documentation Writer Skill
- Security Auditor Skill
- Performance Optimizer Skill

**Ejercicio**: MULTIPLE_CHOICE - Seleccionar Skill apropiado

---

## MÓDULO 5: Sub-agents - Delegación Inteligente (5 horas)

### Lección 5.1: Fundamentos de Sub-agents (50min)
**Contenido**:
- Qué son y por qué usarlos
- Context window separado
- System prompts especializados
- Tool access configurable
- Casos de uso principales

**Ejercicio**: TRUE_FALSE - Conceptos de Sub-agents

### Lección 5.2: Crear tu primer Sub-agent (70min)
**Contenido**:
- Comando /agents interactivo
- Estructura Markdown con frontmatter
- name, description, tools, model
- System prompt efectivo
- Testing y validación

**Ejercicio**: CODE_CHALLENGE - Crear Sub-agent especializado

### Lección 5.3: Sub-agents avanzados (60min)
**Contenido**:
- Project-level vs User-level
- Model selection por agent
- Tool restriction strategies
- Delegation patterns
- Performance considerations

**Ejercicio**: MULTIPLE_CHOICE - Configuración avanzada

### Lección 5.4: Librería de Sub-agents útiles (55min)
**Contenido**:
- Code Reviewer agent
- Debugger agent
- Data Scientist agent (SQL/BigQuery)
- DevOps agent
- Documentation agent

**Ejercicio**: MATCHING_PAIRS - Agents con casos de uso

### Lección 5.5: Arquitectura multi-agent (50min)
**Contenido**:
- Orquestación de múltiples agents
- Delegation strategies
- Communication patterns
- Best practices
- Casos de uso complejos

**Ejercicio**: SEQUENCE_ORDER - Flujo multi-agent

---

## MÓDULO 6: MCP - Model Context Protocol (6 horas)

### Lección 6.1: Introducción a MCP (50min)
**Contenido**:
- Qué es MCP y por qué importa
- Arquitectura: servers, resources, tools
- Transport types: HTTP, SSE, stdio
- Ecosistema de MCP servers
- Casos de uso principales

**Ejercicio**: MULTIPLE_CHOICE - Fundamentos MCP

### Lección 6.2: Conectar MCP servers (70min)
**Contenido**:
- claude mcp add commands
- HTTP servers (recomendado)
- SSE servers (deprecated)
- Stdio local servers
- Environment variables y secrets

**Ejercicio**: CODE_CHALLENGE - Configurar MCP server

### Lección 6.3: MCP servers populares (65min)
**Contenido**:
- Development: Sentry, Socket, Hugging Face
- PM: Asana, Atlassian, Linear, Notion
- Databases: Airtable, PostgreSQL
- Payments: Stripe, Square, PayPal
- Infrastructure: Vercel, Netlify, Cloudflare

**Ejercicio**: MATCHING_PAIRS - Servers con casos de uso

### Lección 6.4: Crear tu propio MCP server (75min)
**Contenido**:
- MCP SDK (TypeScript/Python)
- Definir resources y tools
- Implementar handlers
- Testing local
- Deployment y distribución

**Ejercicio**: CODE_CHALLENGE - MCP server básico

### Lección 6.5: MCP avanzado y enterprise (60min)
**Contenido**:
- OAuth 2.0 authentication
- Managed configs con allowlists
- MAX_MCP_OUTPUT_TOKENS tuning
- Security best practices
- Enterprise deployment

**Ejercicio**: MULTIPLE_CHOICE - MCP enterprise

---

## MÓDULO 7: Sistema de Memoria y Configuración (4 horas)

### Lección 7.1: CLAUDE.md y jerarquía de memoria (50min)
**Contenido**:
- 4 niveles: Enterprise, Project, User, Local
- Precedencia y override
- File imports con @
- Recursive imports (max 5 hops)
- Best practices de organización

**Ejercicio**: SEQUENCE_ORDER - Jerarquía de memoria

### Lección 7.2: Memory efectiva para proyectos (60min)
**Contenido**:
- /init para bootstrap
- Coding conventions
- Architecture decisions
- Frequently used commands
- Project-specific context

**Ejercicio**: CODE_CHALLENGE - Crear CLAUDE.md completo

### Lección 7.3: Quick memory shortcuts (45min)
**Contenido**:
- # prefix para añadir rápido
- /memory para editar
- Organización con markdown
- Review y mantenimiento
- Memory evolution con proyecto

**Ejercicio**: TRUE_FALSE - Memory shortcuts

### Lección 7.4: Configuración avanzada (65min)
**Contenido**:
- Settings file completo
- Model configuration
- Auto-update settings
- Telemetry options
- Custom defaults

**Ejercicio**: FILL_BLANKS - Archivo de configuración

---

## MÓDULO 8: Integraciones y CI/CD (5 horas)

### Lección 8.1: Claude Code en VS Code (55min)
**Contenido**:
- VS Code extension (beta)
- Setup y configuración
- Sidebar panel y workflows
- Auto-edit mode
- Limitaciones actuales

**Ejercicio**: MULTIPLE_CHOICE - VS Code integration

### Lección 8.2: Claude Code en JetBrains IDEs (50min)
**Contenido**:
- Setup para IntelliJ, PyCharm, etc.
- Terminal integration
- Troubleshooting WSL2
- Workflow recommendations
- Keyboard shortcuts

**Ejercicio**: TRUE_FALSE - JetBrains setup

### Lección 8.3: GitHub Actions integration (70min)
**Contenido**:
- /install-github-app
- @claude mentions en PRs
- Automated workflows
- Secrets management
- OIDC con AWS/GCP

**Ejercicio**: CODE_CHALLENGE - GitHub Action workflow

### Lección 8.4: GitLab CI y otros CI/CD (60min)
**Contenido**:
- GitLab CI integration
- Jenkins pipelines
- CircleCI configuration
- Generic CI/CD patterns
- Cost optimization

**Ejercicio**: CODE_CHALLENGE - GitLab CI pipeline

### Lección 8.5: Development containers y sandbox (45min)
**Contenido**:
- devcontainer setup
- /sandbox mode
- Isolation strategies
- Security considerations
- Production best practices

**Ejercicio**: MATCHING_PAIRS - Isolation methods

---

## MÓDULO 9: Casos de Uso Profesionales y Mejores Prácticas (5 horas)

### Lección 9.1: Desarrollo full-stack con Claude Code (70min)
**Contenido**:
- Feature development end-to-end
- Frontend + Backend + Database
- Testing strategies
- Documentation generation
- Deployment automation

**Ejercicio**: CODE_CHALLENGE - Feature completa

### Lección 9.2: Refactoring y mantenimiento de código legacy (60min)
**Contenido**:
- Análisis de código legacy
- Refactoring incremental
- Test coverage antes de refactor
- Migration strategies
- Documentation updates

**Ejercicio**: CODE_CHALLENGE - Refactorizar código legacy

### Lección 9.3: Security auditing y code review (65min)
**Contenido**:
- Security vulnerability scanning
- Code review automation
- OWASP Top 10 checks
- Dependency auditing
- Automated reporting

**Ejercicio**: CODE_CHALLENGE - Security audit completo

### Lección 9.4: Performance optimization (60min)
**Contenido**:
- Profiling y análisis
- Database query optimization
- Frontend performance
- Backend optimization
- Monitoring integration

**Ejercicio**: MULTIPLE_CHOICE - Optimization strategies

### Lección 9.5: Proyecto final integrador (65min)
**Contenido**:
- Especificación de proyecto completo
- Implementación guiada
- Best practices aplicadas
- Presentación y documentación
- Deployment y CI/CD

**Ejercicio**: CODE_CHALLENGE - Proyecto final completo

---

## Resumen de Distribución

### Por Módulo:
1. **Fundamentos** (5h): Instalación, setup, básicos ✅
2. **Modo Interactivo Avanzado** (5h): Shortcuts, permisos, debugging
3. **Comandos Slash** (5h): Built-in y custom commands
4. **Skills** (5h): Capacidades modulares
5. **Sub-agents** (5h): Delegación especializada
6. **MCP** (6h): Integraciones externas
7. **Memoria y Config** (4h): CLAUDE.md y settings
8. **Integraciones** (5h): IDEs y CI/CD
9. **Casos Profesionales** (5h): Real-world applications

**Total: 45 horas**

### Por Tipo de Ejercicio:
- MULTIPLE_CHOICE: 10 ejercicios
- TRUE_FALSE: 8 ejercicios
- MATCHING_PAIRS: 7 ejercicios
- SEQUENCE_ORDER: 4 ejercicios
- CODE_CHALLENGE: 14 ejercicios
- FILL_BLANKS: 2 ejercicios

**Total: 45 ejercicios (1 por lección)**

### Tests de Módulo:
- 9 tests (1 por módulo)
- 10 preguntas cada uno
- Total: 90 preguntas de evaluación

---

## Siguiente Paso

El Módulo 1 está completamente implementado en `curso-claude-code-completo.json`.

Para completar el curso, necesito generar los módulos 2-9 con el mismo nivel de detalle:
- Contenido Markdown extenso (3000-5000 palabras/lección)
- 3-4 imágenes Unsplash por lección
- Ejemplos de código reales
- Casos de uso prácticos
- Ejercicios gamificados únicos
- Tests comprensivos de módulo

Debido al límite de tokens, recomiendo generar los módulos en batches o crear un script automatizado.
