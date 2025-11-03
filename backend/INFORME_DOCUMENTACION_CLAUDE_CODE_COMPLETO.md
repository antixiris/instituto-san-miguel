# INFORME EXHAUSTIVO: DOCUMENTACIÓN OFICIAL DE CLAUDE CODE

**Fecha de revisión:** 27 de octubre de 2025
**Fuente:** https://docs.claude.com/en/docs/claude-code/overview
**Revisión realizada por:** Claude Code Assistant

---

## TABLA DE CONTENIDOS

1. [Visión General](#1-visión-general)
2. [Instalación y Configuración Inicial](#2-instalación-y-configuración-inicial)
3. [Primeros Pasos y Workflows Comunes](#3-primeros-pasos-y-workflows-comunes)
4. [Características Principales](#4-características-principales)
5. [Subagentes](#5-subagentes)
6. [Agent Skills y Plugins](#6-agent-skills-y-plugins)
7. [Output Styles](#7-output-styles)
8. [Hooks Sistema](#8-hooks-sistema)
9. [Modo Headless y Automatización](#9-modo-headless-y-automatización)
10. [Model Context Protocol (MCP)](#10-model-context-protocol-mcp)
11. [Slash Commands](#11-slash-commands)
12. [Memoria y CLAUDE.md](#12-memoria-y-claudemd)
13. [Modo Interactivo](#13-modo-interactivo)
14. [Checkpointing](#14-checkpointing)
15. [Configuración y Settings](#15-configuración-y-settings)
16. [Integraciones IDE](#16-integraciones-ide)
17. [Seguridad](#17-seguridad)
18. [CI/CD Integration](#18-cicd-integration)
19. [Características Avanzadas](#19-características-avanzadas)
20. [Deployment Enterprise](#20-deployment-enterprise)
21. [Modelos y Capacidades](#21-modelos-y-capacidades)
22. [Mejores Prácticas](#22-mejores-prácticas)
23. [Troubleshooting](#23-troubleshooting)
24. [Características NO Incluidas en Nuestro Curso](#24-características-no-incluidas-en-nuestro-curso)

---

## 1. VISIÓN GENERAL

**URL:** https://docs.claude.com/en/docs/claude-code/overview

### ¿Qué es Claude Code?

Claude Code es la herramienta CLI oficial de Anthropic que transforma los flujos de desarrollo al proporcionar asistencia de IA directamente en la terminal.

### Características Clave

- **Desarrollo desde descripciones**: Los usuarios describen requisitos en lenguaje natural; Claude planifica, escribe y prueba el código
- **Capacidades de debugging**: Analiza codebases e implementa correcciones basándose en descripciones de errores
- **Navegación de codebase**: Mantiene conciencia de la estructura del proyecto y puede acceder a fuentes de datos externas vía MCP
- **Automatización de tareas**: Maneja trabajo repetitivo como correcciones de linting y resolución de conflictos de merge

### Filosofía de Diseño

- Opera dentro de flujos de trabajo de terminal existentes
- Puede modificar archivos directamente, ejecutar comandos y crear commits
- Sigue principios de filosofía Unix, haciéndolo componible para operaciones de piping
- Integración con CI/CD

### Opciones de Deployment Enterprise

- AWS Bedrock
- Google Vertex AI
- Características integradas de seguridad, privacidad y compliance

---

## 2. INSTALACIÓN Y CONFIGURACIÓN INICIAL

**URL:** https://docs.claude.com/en/docs/claude-code/quickstart

### Requisitos del Sistema

- **Node.js 18+** (requerido)
- Cuenta de Claude.ai o Claude Console

### Métodos de Instalación

#### 1. Instalación NPM (Multiplataforma)
```bash
npm install -g @anthropic-ai/claude-code
```

#### 2. Homebrew (macOS, Linux)
```bash
brew install --cask claude-code
```

#### 3. Script nativo (macOS/Linux/WSL)
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

#### 4. Windows PowerShell
```powershell
irm https://claude.ai/install.ps1 | iex
```

#### 5. Windows CMD
```cmd
curl -fsSL https://claude.ai/install.cmd
```

### Autenticación

Durante la primera sesión interactiva, se requiere login. Dos tipos de cuenta soportados:

- **Claude.ai**: Planes de suscripción (recomendado)
- **Claude Console**: Acceso API con créditos prepagos

**Nota:** Las credenciales se almacenan localmente y no es necesario volver a autenticarse.

### Primera Sesión

```bash
# Navegar al directorio del proyecto
cd /path/to/project

# Iniciar Claude Code
claude
```

La pantalla de bienvenida muestra:
- Información de la sesión
- Conversaciones recientes
- Actualizaciones

### Comandos Esenciales Iniciales

| Comando | Función |
|---------|----------|
| `claude` | Iniciar modo interactivo |
| `claude "tarea"` | Ejecutar tarea única |
| `claude -p "query"` | Ejecutar query y salir |
| `claude -c` | Continuar conversación reciente |
| `/clear` | Limpiar historial de conversación |
| `/help` | Mostrar comandos disponibles |

### Pro Tips para Principiantes

- Ser específico con las solicitudes (evitar vaguedad)
- Dividir tareas complejas en pasos secuenciales
- Dejar que Claude analice el código antes de solicitar cambios
- Usar Tab para autocompletado de comandos
- Usar `?` para atajos de teclado

---

## 3. PRIMEROS PASOS Y WORKFLOWS COMUNES

**URL:** https://docs.claude.com/en/docs/claude-code/common-workflows

### 1. Entender Codebases Nuevas

#### Overview Rápido
```bash
cd /path/to/project
claude
> give me an overview of this codebase
```

**Preguntas de seguimiento:**
- `> how is the architecture structured?`
- `> what are the main data models?`
- `> how does authentication work?`

#### Buscar Código Relevante
```bash
> find the files that handle user authentication
> how do these authentication files work together?
> trace the login process from front-end to database
```

**Mejores Prácticas:**
- Empezar amplio, luego afinar
- Usar lenguaje específico del dominio
- Ser explícito sobre lo que se busca

---

### 2. Arreglar Bugs Eficientemente

```bash
> I'm seeing an error when I run npm test
> suggest a few ways to fix the @ts-ignore in user.ts
> update user.ts to add the null check you suggested
```

**Mejores Prácticas:**
- Proporcionar stack traces y pasos de reproducción
- Clarificar si los errores son intermitentes o consistentes

---

### 3. Refactorizar Código

```bash
> find deprecated API usage in our codebase
> suggest how to refactor utils.js to use modern JavaScript features
> refactor utils.js to use ES2024 features while maintaining the same behavior
> run tests for the refactored code
```

**Mejores Prácticas:**
- Hacer cambios incrementales y probables
- Mantener compatibilidad hacia atrás cuando sea necesario

---

### 4. Usar Subagentes Especializados

```bash
# Ver subagentes disponibles
/agents

# Delegar explícitamente
> use the code-reviewer subagent to check the auth module
```

**Mejores Prácticas:**
- Almacenar subagentes del proyecto en `.claude/agents/` para compartir con el equipo
- Limitar el acceso a herramientas apropiadamente

---

### 5. Plan Mode para Análisis Seguro

**Cuándo usar:**
- Implementaciones multi-archivo
- Exploración de código
- Refinamiento interactivo

**Cómo usar:**
```bash
# Toggle durante sesión
Shift+Tab

# Iniciar en Plan Mode
claude --permission-mode plan

# Headless query
claude --permission-mode plan -p "Analyze authentication system"
```

**Configuración por defecto:**
```json
// .claude/settings.json
{
  "permissions": {
    "defaultMode": "plan"
  }
}
```

---

### 6. Trabajar con Tests

```bash
> find functions in NotificationsService.swift not covered by tests
> add tests for the notification service
> add test cases for edge conditions
> run the new tests and fix any failures
```

**Mejores Prácticas:**
- Cubrir casos edge y condiciones de error
- Usar tanto tests unitarios como de integración

---

### 7. Crear Pull Requests

```bash
> summarize the changes I've made to the authentication module
> create a pr
> enhance the PR description with more context about security improvements
> add information about how these changes were tested
```

**Mejores Prácticas:**
- Revisar PRs generados antes de enviar
- Destacar riesgos y consideraciones

---

### 8. Manejar Documentación

```bash
> find functions without proper JSDoc comments in the auth module
> add JSDoc comments to the undocumented functions in auth.js
> improve the generated documentation with more context and examples
> check if the documentation follows our project standards
```

---

### 9. Trabajar con Imágenes

**Métodos de entrada:**
- Drag and drop en la ventana de Claude Code
- Pegar con Ctrl+V (no Cmd+V)
- Proporcionar ruta de archivo: `"Analyze this image: /path/to/image.png"`

**Ejemplos de prompts:**
```bash
> What does this image show?
> Describe the UI elements in this screenshot
> Generate CSS to match this design mockup
```

---

### 10. Referenciar Archivos y Directorios

**Sintaxis:** Usar prefijo `@`

**Ejemplos:**
```bash
# Archivo único
> Explain the logic in @src/utils/auth.js

# Directorio
> What's the structure of @src/components?

# Recursos MCP
> Show me the data from @github:repos/owner/repo/issues
```

**Mejores Prácticas:**
- Las rutas pueden ser relativas o absolutas
- Las referencias a directorios muestran listados, no contenidos

---

### 11. Usar Extended Thinking

**Métodos de activación:**
- Presionar **Tab** durante sesión
- Usar prompts como "think" o "think hard"
- Configurar variable de entorno `MAX_THINKING_TOKENS`

**Ejemplo:**
```bash
> I need to implement OAuth2 for our API. Think deeply about the best approach for implementing this in our codebase.
```

**Mejores casos de uso:**
- Decisiones arquitectónicas complejas
- Debugging intrincado
- Implementaciones multi-paso
- Comprensión de codebase

---

### 12. Reanudar Conversaciones Previas

**Opciones:**
```bash
# Continuar la más reciente
claude --continue

# Continuar con prompt
claude --continue --print "Continue with my task"

# Mostrar selector
claude --resume
```

**Cómo funciona:**
- Conversaciones almacenadas localmente con historial completo de mensajes
- Estado de herramientas y contexto preservado

---

### 13. Ejecutar Sesiones Paralelas con Git Worktrees

```bash
# Crear worktree
git worktree add ../project-feature-a -b feature-a

# Navegar y ejecutar Claude
cd ../project-feature-a && claude

# Gestión
git worktree list
git worktree remove ../project-feature-a
```

**Mejores Prácticas:**
- Cada worktree tiene estado de archivo aislado
- Inicializar entorno de desarrollo por requisitos del proyecto

---

### 14. Usar Claude como Utilidad Estilo Unix

#### Añadir al Proceso de Verificación
```json
// package.json
{
  "scripts": {
    "lint:claude": "claude -p 'you are a linter...'"
  }
}
```

#### Piping de Datos a través de Claude
```bash
cat build-error.txt | claude -p 'concisely explain the root cause' > output.txt
```

#### Controlar Formato de Salida
```bash
# Text (por defecto)
cat data.txt | claude -p 'summarize' --output-format text

# JSON
cat code.py | claude -p 'analyze for bugs' --output-format json

# Streaming JSON
cat log.txt | claude -p 'parse for errors' --output-format stream-json
```

---

### 15. Crear Slash Commands Personalizados

#### Comandos Específicos del Proyecto
```bash
mkdir -p .claude/commands
echo "Analyze the performance of this code and suggest three specific optimizations:" > .claude/commands/optimize.md
```

**Uso:**
```bash
> /optimize
```

#### Con Argumentos
Crear `.claude/commands/fix-issue.md`:
```markdown
Find and fix issue #$ARGUMENTS. Follow these steps:
1. Understand the issue
2. Locate relevant code
3. Implement solution
4. Add tests
5. Prepare PR description
```

**Uso:**
```bash
> /fix-issue 123
```

#### Comandos Personales
```bash
mkdir -p ~/.claude/commands
echo "Review this code for security vulnerabilities, focusing on:" > ~/.claude/commands/security-review.md
```

**Mejores Prácticas:**
- Organizar comandos en subdirectorios
- Usar nombres descriptivos
- Compartir comandos del proyecto con el equipo

---

### 16. Preguntar a Claude sobre sus Propias Capacidades

**Ejemplos de preguntas:**
```bash
> can Claude Code create pull requests?
> how does Claude Code handle permissions?
> what slash commands are available?
> how do I use MCP with Claude Code?
> what are the limitations of Claude Code?
```

Claude proporciona respuestas basadas en la documentación con acceso a los últimos docs.

---

## 4. CARACTERÍSTICAS PRINCIPALES

### Desarrollo Basado en Conversación

Claude Code permite desarrollo mediante conversación natural:
- Describir features en lenguaje natural
- Claude planifica, implementa y prueba
- Revisión iterativa de cambios

### Awareness del Codebase

- Comprende estructura del proyecto
- Mantiene contexto entre sesiones
- Navega y analiza múltiples archivos
- Puede acceder a recursos externos vía MCP

### Capacidades de Ejecución

- **Bash Tool**: Ejecuta comandos del sistema
- **File Operations**: Read, Write, Edit archivos
- **Web Tools**: WebFetch, WebSearch
- **Glob y Grep**: Búsqueda de archivos y contenido

### Integración con Git

- Crear commits con mensajes descriptivos
- Crear y gestionar branches
- Crear pull requests
- Revisar cambios y diffs

### Composibilidad Unix

- Puede usarse en pipelines
- Soporte para stdin/stdout
- Múltiples formatos de salida (text, json, stream-json)
- Integración con CI/CD

---

## 5. SUBAGENTES

**URL:** https://docs.claude.com/en/docs/claude-code/subagents

### ¿Qué son los Subagentes?

Los subagentes son asistentes de IA especializados a los que Claude Code puede delegar tareas. Cada uno opera con:
- Su propia ventana de contexto
- System prompt personalizado
- Acceso a herramientas configurable

### Beneficios Clave

- **Preservación de contexto**: Ventanas de contexto independientes mantienen la conversación principal enfocada
- **Expertise especializado**: Configuraciones específicas de dominio mejoran las tasas de éxito
- **Reusabilidad**: Compartir entre proyectos y equipos para workflows consistentes
- **Permisos flexibles**: Otorgar diferentes niveles de acceso a herramientas por subagente

---

### Crear Subagentes

#### Quick Start

1. Ejecutar comando `/agents` en Claude Code
2. Seleccionar "Create New Agent"
3. Elegir alcance: project-level o user-level
4. Definir el subagente con guía de Claude, luego personalizar
5. Seleccionar herramientas y guardar

---

### Estructura de Archivos

Los subagentes usan Markdown con frontmatter YAML:

```markdown
---
name: your-sub-agent-name
description: When this subagent should be invoked
tools: tool1, tool2, tool3
model: sonnet
---

Your system prompt here. Define role, capabilities,
and specific instructions for the subagent.
```

### Campos de Configuración

| Campo | Requerido | Notas |
|-------|----------|-------|
| `name` | Sí | Minúsculas con guiones |
| `description` | Sí | Propósito en lenguaje natural |
| `tools` | No | Omitir para heredar todas las herramientas |
| `model` | No | Usar alias o 'inherit' |

---

### Ubicaciones de Archivos

- **Project-level**: `.claude/agents/` (prioridad más alta)
- **User-level**: `~/.claude/agents/` (disponible entre proyectos)
- **CLI-defined**: Vía flag `--agents` (específico de sesión)

---

### Ejemplos de Subagentes

#### Code Reviewer
Revisa código por calidad, seguridad y mantenibilidad. Ejecuta git diff, verifica duplicados, valida manejo de errores, y asegura que no haya secretos expuestos.

#### Debugger
Se especializa en análisis de causa raíz: captura mensajes de error, identifica pasos de reproducción, aísla fallos, implementa correcciones, y verifica soluciones.

#### Data Scientist
Maneja queries SQL y operaciones BigQuery. Escribe queries optimizadas, formatea resultados claramente, y proporciona recomendaciones basadas en datos.

---

### Usar Subagentes

**Delegación automática**: Claude Code reconoce tareas coincidentes basándose en descripciones de subagentes

**Invocación explícita**:
```bash
> Use the code-reviewer subagent to check my recent changes
```

---

### Mejores Prácticas

- Empezar generando con Claude, luego personalizar
- Diseñar subagentes enfocados con responsabilidades únicas
- Escribir system prompts detallados con instrucciones específicas
- Limitar acceso a herramientas solo a funciones necesarias
- Control de versiones de subagentes del proyecto para colaboración en equipo

---

### Consideraciones Importantes

Los subagentes empiezan con contexto limpio en cada invocación, lo que puede añadir latencia ya que recopilan información requerida. Sin embargo, esto permite sesiones generales más largas al preservar el contexto de la conversación principal.

---

## 6. AGENT SKILLS Y PLUGINS

### Agent Skills

**URL:** https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview

#### ¿Qué son los Agent Skills?

Los Agent Skills son capacidades modulares que extienden la funcionalidad de Claude empaquetando instrucciones, metadata y recursos opcionales. Proporcionan a Claude experiencia específica de dominio: workflows, contexto y mejores prácticas que transforman agentes de propósito general en especialistas.

#### Beneficios Clave

- **Especialización**: Adaptar capacidades para dominios específicos
- **Reusabilidad**: Crear una vez, desplegar automáticamente entre conversaciones
- **Composición**: Combinar múltiples Skills para construir workflows complejos

---

#### Cómo Funcionan los Skills

Los Skills operan mediante una **arquitectura de divulgación progresiva** con tres niveles de carga:

**Nivel 1 - Metadata (Siempre Cargado)**
Frontmatter YAML conteniendo nombre y descripción se carga al inicio (~100 tokens por Skill). Este enfoque ligero permite instalar muchos Skills sin penalizaciones de contexto.

**Nivel 2 - Instructions (Triggered)**
El archivo principal SKILL.md conteniendo guía procedimental se carga cuando el Skill es activado (<5k tokens).

**Nivel 3 - Resources (As Needed)**
Archivos de soporte, scripts de código y materiales de referencia se cargan solo cuando se referencian. Ya que los archivos no consumen contexto hasta que se acceden, "los Skills pueden incluir docenas de archivos de referencia" sin costos de tokens para contenido no usado.

---

#### Estructura del Skill

Cada Skill requiere este frontmatter YAML:

```yaml
---
name: skill-name
description: What it does and when to use it
---
```

**Requisitos:**
- **name**: Máx 64 caracteres, solo letras minúsculas/números/guiones
- **description**: Máx 1024 caracteres, no vacío

---

#### Skills Pre-Construidos Disponibles

Anthropic proporciona cuatro Skills de documentos enterprise:
- **PowerPoint (pptx)**: Crear y editar presentaciones
- **Excel (xlsx)**: Generar hojas de cálculo con análisis y gráficos
- **Word (docx)**: Producir y formatear documentos
- **PDF (pdf)**: Generar reportes PDF formateados

---

#### Dónde Funcionan los Skills

| Plataforma | Custom Skills | Pre-Built Skills |
|----------|--------------|-----------------|
| Claude API | Sí | Sí |
| Claude Code | Sí (filesystem) | No |
| Agent SDK | Sí | No |
| Claude.ai | Sí (individual) | Sí |

---

#### Crear Custom Skills

El [Skills Cookbook](https://github.com/anthropics/claude-cookbooks/tree/main/skills) proporciona ejemplos completos. Los Skills pueden empaquetar:
- Archivos de instrucciones Markdown
- Scripts Python/ejecutables
- Documentación de referencia
- Templates y schemas

---

#### Consideraciones de Seguridad

**ADVERTENCIA CRÍTICA**: "Los Skills proporcionan a Claude nuevas capacidades mediante instrucciones y código, y aunque esto los hace poderosos, también significa que un Skill malicioso puede dirigir a Claude a invocar herramientas o ejecutar código de maneras que no coinciden con el propósito declarado del Skill."

**Recomendaciones:**
- Solo usar Skills de fuentes confiables
- Auditar exhaustivamente todos los archivos empaquetados
- Tener precaución con Skills que obtienen datos externos
- Tratar la instalación de Skills como instalación de software

---

#### Limitaciones

**Acceso a Red**: Deshabilitado—Los Skills no pueden hacer llamadas API externas

**Instalación de Paquetes**: Restringida a dependencias preinstaladas; no hay instalación de paquetes en runtime disponible

**Sincronización Cross-Surface**: Los Skills no se sincronizan automáticamente entre Claude.ai, API y Claude Code

**Alcance de Compartir**:
- Claude.ai: Solo usuario individual
- API: Todo el workspace
- Claude Code: Personal o basado en proyecto

---

#### Agent Skills Quickstart

**URL:** https://docs.claude.com/en/docs/agents-and-tools/agent-skills/quickstart

##### Paso 1: Listar Skills Disponibles
```python
import anthropic

client = anthropic.Anthropic()
skills = client.beta.skills.list(
    source="anthropic",
    betas=["skills-2025-10-02"]
)
```

##### Paso 2: Crear una Presentación
```python
response = client.beta.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=4096,
    betas=["code-execution-2025-08-25", "skills-2025-10-02"],
    container={
        "skills": [{
            "type": "anthropic",
            "skill_id": "pptx",
            "version": "latest"
        }]
    },
    messages=[{
        "role": "user",
        "content": "Create a presentation about renewable energy with 5 slides"
    }],
    tools=[{
        "type": "code_execution_20250825",
        "name": "code_execution"
    }]
)
```

##### Paso 3: Descargar Archivos Generados
Extraer el ID del archivo y descargar usando la API de Files para guardar localmente.

---

#### Agent Skills Best Practices

**URL:** https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices

##### Principios de Diseño Core

**Concisión**: Los Skills comparten la ventana de contexto con el historial de conversación y otras herramientas. Mantener SKILL.md bajo 500 líneas, asumiendo que Claude ya posee conocimiento fundacional. "Asunción por defecto: Claude ya es muy inteligente."

**Niveles de Libertad Apropiados**: Igualar especificidad de instrucción a fragilidad de tarea:
- Alta libertad (instrucciones de texto) para enfoques flexibles
- Media libertad (pseudocódigo) para patrones preferidos con variaciones
- Baja libertad (scripts exactos) para operaciones frágiles propensas a errores

**Testing Cross-Model**: Verificar que los Skills funcionen en Claude Haiku, Sonnet y Opus, ya que la efectividad varía por capacidad del modelo.

---

##### Estructura y Nomenclatura del Skill

**Requisitos de Metadata**:
- `name`: Máx 64 caracteres, solo letras minúsculas/números/guiones
- `description`: Máx 1024 caracteres, debe especificar qué hace el Skill y cuándo usarlo

**Convención de Nomenclatura**: Usar forma gerundio (verbo + -ing) como `processing-pdfs`, `analyzing-spreadsheets`. Evitar términos vagos ("helper," "tools") y palabras reservadas conteniendo "anthropic" o "claude."

**Descripciones Efectivas**: Escribir en tercera persona e incluir tanto funcionalidad como triggers de uso. Ejemplo: "Extract text and tables from PDFs. Use when working with PDF files or document extraction."

---

##### Patrones de Divulgación Progresiva

**Referencias de Un Nivel de Profundidad**: Todos los archivos de referencia deben enlazar directamente desde SKILL.md para asegurar que Claude lea contenido completo cuando sea necesario.

**Organización de Archivos**:
- Patrón 1: Guía de alto nivel con referencias a FORMS.md, REFERENCE.md, EXAMPLES.md
- Patrón 2: Organización específica de dominio (ej., finance.md, sales.md dentro de reference/)
- Patrón 3: Detalles condicionales con contenido básico enlazando a recursos avanzados

**Archivos de Referencia Largos**: Incluir tabla de contenidos para archivos que excedan 100 líneas para asegurar que Claude capte la información disponible.

---

##### Workflows y Loops de Retroalimentación

**Gestión de Tareas Complejas**: Dividir operaciones en pasos secuenciales claros con checklists copiables para seguimiento de progreso.

**Loops de Validación**: Implementar patrones validador → corregir errores → repetir. Ejemplo: Analizar formulario → crear mapeo de campos → validar → llenar → verificar.

**Manejo de Errores**: Los scripts deben resolver problemas en lugar de delegar decisiones a Claude. Proporcionar manejo de errores explícito y valores de configuración justificados.

---

##### Directrices de Contenido

**Evitar Información Sensible al Tiempo**: Usar secciones colapsables de "Old Patterns" para enfoques obsoletos en lugar de condicionales basados en fecha.

**Terminología Consistente**: Elegir un término y usarlo a lo largo (ej., siempre "API endpoint," nunca mezclar con "URL" o "path").

---

##### Patrones Comunes

**Patrón de Template**: Proporcionar templates estructurales exactos para requisitos estrictos; guía flexible para tareas dependientes del contexto.

**Patrón de Ejemplos**: Incluir pares de entrada/salida demostrando estilo deseado y nivel de detalle.

**Workflows Condicionales**: Guiar a Claude a través de puntos de decisión, dirigiendo a secciones apropiadas basadas en tipo de tarea.

---

##### Evaluación e Iteración

**Construir Evaluaciones Primero**: Crear escenarios de prueba antes de documentación extensa para asegurar que los Skills resuelvan problemas reales.

**Desarrollo Iterativo**: Trabajar con Claude para crear Skills, probar con instancias frescas, observar comportamiento, y refinar basándose en patrones de uso real.

**Observación**: Monitorear cómo Claude navega tu Skill—rutas de exploración inesperadas, conexiones perdidas, o contenido ignorado indican mejoras estructurales.

---

##### Mejores Prácticas de Código y Scripts

**Resolver, No Delegar**: Manejar errores explícitamente en lugar de pedir a Claude que recupere. Documentar números mágicos y elecciones de configuración.

**Scripts de Utilidad**: Los scripts pre-construidos son más confiables que el código generado, ahorran tokens, y aseguran consistencia.

**Análisis Visual**: Convertir PDFs a imágenes cuando el análisis de layout ayuda a entender la estructura.

**Salidas Verificables**: Usar patrones planear-validar-ejecutar para operaciones batch (crear plan → validar → ejecutar).

**Dependencias**: Listar paquetes requeridos y verificar disponibilidad en el entorno de ejecución de código.

---

##### Anti-Patrones a Evitar

- Rutas estilo Windows (`\`) en lugar de estilo Unix (`/`)
- Abrumar con múltiples opciones cuando una por defecto con vía de escape es suficiente
- Referencias de archivo profundamente anidadas (preferir estructura de un nivel de profundidad)
- Nombres de archivo vagos (`doc2.md` en lugar de `form_validation_rules.md`)

---

##### Checklist de Calidad

**Calidad Core**: Descripción específica, bajo 500 líneas, divulgación progresiva, workflows claros

**Código**: Manejo de errores, sin constantes mágicas, dependencias listadas, paquetes verificados, rutas con barra diagonal

**Testing**: Al menos tres evaluaciones, probado en Haiku/Sonnet/Opus, escenarios de uso real

---

### Skills en Claude Code

**URL:** https://docs.claude.com/en/docs/claude-code/skills

#### Características de Skills Específicas de Claude Code

Los Skills en Claude Code son **model-invoked**—Claude decide autónomamente cuándo usarlos basándose en tu solicitud y la descripción del Skill (a diferencia de los slash commands que son user-invoked).

---

#### Ubicaciones de Almacenamiento

**Personal Skills** (`~/.claude/skills/`): Disponibles en todos los proyectos para workflows individuales

**Project Skills** (`.claude/skills/`): Compartidos con miembros del equipo vía git

**Plugin Skills**: Empaquetados con plugins instalados

---

#### Crear un Skill

##### Estructura SKILL.md
Cada Skill requiere un archivo `SKILL.md` con frontmatter YAML:

```yaml
---
name: your-skill-name
description: Brief description of what this Skill does and when to use it
---
```

**Requisitos de Campos:**
- `name`: Solo letras minúsculas, números, guiones (máx 64 caracteres)
- `description`: Debe incluir tanto qué hace el Skill como cuándo Claude debería usarlo (máx 1024 caracteres)

---

##### Archivos de Soporte
Junto a SKILL.md, puedes añadir:
- Documentación de referencia
- Archivos de ejemplo
- Scripts y utilidades
- Templates

Claude carga archivos adicionales solo cuando es necesario.

---

#### Control de Acceso a Herramientas

Usar el campo `allowed-tools` para restringir qué herramientas puede usar Claude:

```yaml
---
name: safe-file-reader
description: Read files without making changes
allowed-tools: Read, Grep, Glob
---
```

Esto es útil para Skills de solo lectura o workflows sensibles a seguridad.

---

#### Mejores Prácticas

**Mantener Skills Enfocados:**
Cada Skill debe abordar una capacidad. Evitar categorías amplias como "Document processing"—dividir en Skills específicos.

**Escribir Descripciones Específicas:**
Incluir triggers y casos de uso. En lugar de "Helps with documents," escribir: "Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDFs."

**Probar Exhaustivamente:**
Hacer preguntas coincidentes con tu descripción para verificar que Claude active el Skill automáticamente. Hacer que compañeros de equipo prueben y proporcionen feedback.

**Documentar Versiones:**
Rastrear cambios en tu contenido SKILL.md con secciones de historial de versiones.

---

#### Compartir con Equipos

**Recomendado:** Distribuir a través de plugins vía Claude Code plugin marketplaces

**Enfoque directo:**
1. Crear project Skill en `.claude/skills/`
2. Commit a git y push
3. Los miembros del equipo hacen pull de cambios—Skills se vuelven disponibles inmediatamente

---

#### Troubleshooting

**¿Claude no usa tu Skill?**
- Hacer descripciones específicas con términos de trigger concretos
- Verificar sintaxis YAML (`---` de apertura/cierre, indentación apropiada)
- Verificar que el archivo existe en la ruta correcta
- Ejecutar con modo debug: `claude --debug`

**¿Múltiples Skills conflictivos?**
Usar lenguaje distinto en descripciones. En lugar de genérico "For data analysis," especificar: "Analyze sales data in Excel files" vs. "Analyze log files for system metrics."

---

#### Ejemplo: Skill Simple

```
commit-helper/
└── SKILL.md

---
name: generating-commit-messages
description: Generates clear commit messages from git diffs.
Use when writing commit messages or reviewing staged changes.
---

# Generating Commit Messages

## Instructions
1. Run `git diff --staged`
2. Suggest messages with summaries under 50 characters
```

---

### Plugins

**URL:** https://docs.claude.com/en/docs/claude-code/plugins

#### ¿Qué son los Plugins?

Los plugins extienden Claude Code con funcionalidad personalizada incluyendo comandos, agentes, hooks, Skills, y servidores MCP. Son "compartibles entre proyectos y equipos" a través de un sistema de marketplace centralizado.

---

#### Componentes Core

Los plugins siguen esta estructura:
- **Plugin manifest** (`.claude-plugin/plugin.json`) - metadata describiendo el plugin
- **Commands directory** - comandos slash personalizados en formato markdown
- **Agents directory** - definiciones de agentes especializados
- **Skills directory** - Agent Skills que Claude invoca autónomamente
- **Hooks** - manejadores de eventos para automatización
- **MCP servers** - integración de herramientas externas

---

#### Métodos de Instalación

**Descubrimiento Interactivo:**
```bash
/plugin
```
Navegar opciones disponibles con descripciones e instalar vía menú.

**Instalación Directa:**
```bash
/plugin install formatter@your-org
```

**Comandos de Gestión:**
- Habilitar/deshabilitar: `/plugin enable|disable plugin-name@marketplace`
- Desinstalar: `/plugin uninstall plugin-name@marketplace`

---

#### Crear Tu Primer Plugin

1. Crear estructura de marketplace con directorio de plugin
2. Añadir `.claude-plugin/plugin.json` con metadata
3. Crear `commands/hello.md` definiendo comandos personalizados
4. Configurar marketplace local con `.claude-plugin/marketplace.json`
5. Añadir marketplace vía `/plugin marketplace add ./path`
6. Instalar y reiniciar Claude Code

---

#### Workflows de Equipo

Configurar plugins a nivel de repositorio en `.claude/settings.json`. Cuando los miembros del equipo confían en la carpeta, los marketplaces y plugins especificados se instalan automáticamente—asegurando tooling consistente entre equipos.

---

#### Características Avanzadas

- **Testing Local**: Usar marketplaces de desarrollo para iterar en plugins
- **Integración de Skills**: Extender capacidades de Claude con Skills invocados por modelo
- **Distribución**: Empaquetar vía marketplaces para compartir con equipo
- **Debugging**: Validar estructura y probar componentes individualmente

---

#### Comandos Clave

| Tarea | Comando |
|------|---------|
| Navegar plugins | `/plugin` |
| Verificar nuevos comandos | `/help` |
| Gestionar marketplaces | `/plugin marketplace add` |
| Ver instalación | `/plugin` → "Manage Plugins" |

---

## 7. OUTPUT STYLES

**URL:** https://docs.claude.com/en/docs/claude-code/output-styles

### ¿Qué son los Output Styles?

Los Output Styles permiten adaptar Claude Code más allá de ingeniería de software modificando su system prompt. Habilitan usar Claude como diferentes tipos de agentes mientras preservan capacidades core como ejecución de scripts, gestión de archivos y seguimiento de tareas.

---

### Built-in Styles

Claude Code incluye tres output styles:

1. **Default** - El system prompt estándar optimizado para tareas de ingeniería de software
2. **Explanatory** - Proporciona insights educacionales entre tareas de codificación para ayudarte a entender elecciones de implementación y patrones del codebase
3. **Learning** - Un modo colaborativo de aprender-haciendo donde Claude comparte insights y te pide implementar secciones estratégicas de código, marcadas con comentarios `TODO(human)`

---

### Cómo Funcionan

Los Output Styles modifican directamente el system prompt de Claude Code:
- Excluyendo instrucciones específicas de generación de código normalmente incorporadas
- Reemplazándolas con instrucciones personalizadas adaptadas al estilo seleccionado

---

### Configuración

**Cambiar estilos usando:**
```bash
# Abre menú para seleccionar estilos disponibles
/output-style

# Cambia directamente a estilo específico
/output-style explanatory

# Acceso alternativo
/config
```

Los cambios se aplican a nivel de proyecto y guardan en `.claude/settings.local.json`.

---

### Custom Styles

Crear nuevos estilos con:
```bash
/output-style:new I want an output style that ...
```

**Estructura de archivo:**
```markdown
---
name: My Custom Style
description: Brief description for display
---

# Custom Style Instructions

[Your custom instructions here...]

## Specific Behaviors

[Define assistant behavior...]
```

Los estilos se guardan en `~/.claude/output-styles` (user-level, cross-project) o `.claude/output-styles` (project-level).

---

### Comparación de Características Relacionadas

| Característica | Efecto |
|---------|--------|
| **Output Styles** | Reemplazan completamente secciones del system prompt por defecto |
| **CLAUDE.md** | Añade contenido como mensaje de usuario después del system prompt |
| **--append-system-prompt** | Añade al system prompt existente |
| **Agents** | Invocados para tareas específicas con sus propios settings y herramientas |
| **Custom Slash Commands** | Prompts almacenados en lugar de system prompts almacenados |

---

## 8. HOOKS SISTEMA

**URL:** https://docs.claude.com/en/docs/claude-code/hooks

### ¿Qué son los Hooks?

Los Hooks son scripts automatizados que se ejecutan en puntos específicos del workflow de Claude Code. Habilitan interceptar, validar y controlar uso de herramientas, entrada del usuario y eventos del ciclo de vida de sesión.

---

### Tipos de Hooks y Eventos

Claude Code soporta nueve tipos de eventos de hook:

#### Operaciones de Herramientas:
- **PreToolUse**: Se ejecuta después de que Claude crea parámetros de herramienta pero antes de procesar la llamada
- **PostToolUse**: Se ejecuta inmediatamente después de completarse exitosamente la herramienta

#### Interacciones de Usuario:
- **UserPromptSubmit**: Se activa cuando los usuarios envían prompts, habilitando validación e inyección de contexto
- **Notification**: Se dispara cuando Claude solicita permisos o después de 60+ segundos de tiempo inactivo de entrada

#### Gestión de Sesión:
- **SessionStart**: Se ejecuta al inicializar o reanudar sesión, ideal para cargar contexto de desarrollo
- **SessionEnd**: Se ejecuta durante terminación de sesión para tareas de limpieza
- **Stop/SubagentStop**: Se activa cuando los agentes terminan de responder

#### Compaction:
- **PreCompact**: Se ejecuta antes de compactación de ventana de contexto (manual o automática)

---

### Estructura de Configuración

Los hooks viven en archivos de settings (`~/.claude/settings.json`, `.claude/settings.json`, o `.claude/settings.local.json`):

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolPattern",
        "hooks": [
          {
            "type": "command",
            "command": "your-script-path",
            "timeout": 60
          }
        ]
      }
    ]
  }
}
```

**Elementos clave:**
- **Matcher**: Patrón coincidente con nombres de herramientas (case-sensitive, soporta regex como `Edit|Write`)
- **Type**: Actualmente solo "command" soportado
- **Timeout**: Límite de ejecución opcional en segundos (por defecto: 60)

---

### Mecanismos de Input y Output

#### Input
Los hooks reciben JSON vía stdin conteniendo:
- `session_id`, `transcript_path`, `cwd`, `permission_mode`
- Campos específicos del evento (nombre de herramienta, input, respuesta, texto de prompt)

#### Opciones de Output

**1. Códigos de salida** (enfoque simple):
- `0`: Éxito; stdout mostrado al usuario
- `2`: Error bloqueante; stderr alimentado a Claude
- Otros códigos: Error no bloqueante mostrado al usuario

**2. Output JSON** (control avanzado):
```json
{
  "continue": true,
  "decision": "allow|deny|ask|block",
  "hookSpecificOutput": {
    "additionalContext": "string"
  }
}
```

---

### Casos de Uso Comunes

- **Calidad de código**: Auto-formatear archivos o lint antes de ejecución de herramienta
- **Seguridad**: Bloquear acceso a archivos sensibles o comandos peligrosos
- **Validación**: Hacer cumplir convenciones de nomenclatura o prevenir coincidencias de patrón
- **Inyección de contexto**: Añadir tiempo actual, estado del proyecto, o notas de desarrollo
- **Workflows de aprobación**: Solicitar confirmación para operaciones riesgosas
- **Monitoreo**: Registrar uso de herramientas para auditoría

---

### Variables de Entorno

- `$CLAUDE_PROJECT_DIR`: Ruta del directorio raíz del proyecto
- `$CLAUDE_CODE_REMOTE`: Indica entorno web ("true") vs. local
- `$CLAUDE_ENV_FILE`: Disponible en hooks SessionStart para persistir variables de entorno entre sesión

---

### Consideraciones de Seguridad

La documentación enfatiza: "USE AT YOUR OWN RISK — Los hooks de Claude Code ejecutan comandos shell arbitrarios en tu sistema automáticamente." Mejores prácticas críticas incluyen:

- Siempre citar variables shell (`"$VAR"`)
- Validar y sanitizar todas las entradas
- Bloquear intentos de path traversal (`..`)
- Usar rutas de archivo absolutas
- Evitar archivos sensibles (`.env`, `.git/`, credenciales)

---

### Integración de Hooks de Plugin

Los plugins pueden proporcionar hooks vía `hooks/hooks.json`, automáticamente fusionados con hooks de usuario/proyecto. Los hooks de plugin usan `${CLAUDE_PLUGIN_ROOT}` para referenciar archivos del plugin.

---

### Debugging

Habilitar logging detallado de ejecución con `claude --debug` para monitorear ejecución de hooks, coincidencias y output a lo largo del ciclo de vida de la sesión.

---

## 9. MODO HEADLESS Y AUTOMATIZACIÓN

**URL:** https://docs.claude.com/en/docs/claude-code/headless

### ¿Qué es el Modo Headless?

El modo headless permite ejecutar Claude Code programáticamente sin UI interactiva, habilitando integración en scripts y workflows de automatización.

---

### Casos de Uso Clave

- **Respuesta a Incidentes SRE**: Automatizar diagnóstico y evaluación de impacto de problemas de producción
- **Auditorías de Seguridad**: Revisar cambios de código por vulnerabilidades y problemas de compliance
- **Workflows Multi-turn**: Mantener contexto de conversación entre operaciones secuenciales
- **Integración CI/CD**: Embeber Claude en pipelines de deployment y testing

---

### Comando Principal

La interfaz principal usa el comando `claude` con el flag `--print` (o `-p`) para ejecución no interactiva:

```bash
claude -p "Your query" --allowedTools "Bash,Read"
```

---

### Opciones de Configuración Esenciales

| Flag | Propósito |
|------|---------|
| `--output-format` | Establecer tipo de salida (text, json, stream-json) |
| `--resume` | Continuar conversación específica por ID de sesión |
| `--continue` | Reanudar conversación más reciente |
| `--allowedTools` | Restringir qué herramientas puede acceder Claude |
| `--mcp-config` | Cargar servidores Model Context Protocol |
| `--verbose` | Habilitar logging detallado |

---

### Flexibilidad de Formato de Salida

**Text Output (Default)**: Respuesta string simple adecuada para scripts shell

**JSON Output**: "Devuelve datos estructurados incluyendo metadata" como costos, duración, e IDs de sesión para parsing programático

**Streaming JSON**: Emite mensajes según llegan vía formato jsonl, habilitando procesamiento en tiempo real

---

### Manejo de Input

Soporta tanto argumentos de texto directo como input stdin. El input Streaming JSON habilita conversaciones multi-turn sin relanzar el binario.

---

### Mejores Prácticas

- Parsear respuestas JSON con herramientas como `jq` para automatización confiable
- Manejar errores verificando códigos de salida y stderr
- Usar gestión de sesión para preservar contexto entre múltiples turnos
- Implementar timeouts para operaciones de larga duración
- Respetar límites de tasa con delays apropiados entre solicitudes

---

## 10. MODEL CONTEXT PROTOCOL (MCP)

**URL:** https://docs.claude.com/en/docs/claude-code/mcp

### ¿Qué es MCP?

MCP es un estándar open-source que habilita a Claude Code integrarse con cientos de herramientas externas y fuentes de datos. Permite a desarrolladores conectar Claude a APIs personalizadas, bases de datos y servicios a través de un protocolo estandarizado.

---

### Capacidades Core

Con servidores MCP conectados, Claude Code puede:

- **Implementar features de issue trackers**: Trabajar con JIRA, Linear y plataformas similares para implementar features descritas y crear pull requests
- **Analizar datos de monitoreo**: Acceder a Sentry y plataformas de analytics para verificar patrones de uso y debuggear problemas de producción
- **Query databases**: Ejecutar queries contra PostgreSQL y otras fuentes de datos para recuperar información específica
- **Integrar diseños**: Obtener e implementar actualizaciones de diseño de Figma y herramientas de diseño similares
- **Automatizar workflows**: Crear borradores y automatizar creación de tareas entre múltiples plataformas

---

### Métodos de Instalación

Tres opciones de transporte disponibles:

#### HTTP Servers (recomendado para servicios cloud):
```bash
claude mcp add --transport http <name> <url>
```

#### SSE Servers (Server-Sent Events, deprecated):
```bash
claude mcp add --transport sse <name> <url>
```

#### Local Stdio Servers (para procesos locales):
```bash
claude mcp add --transport stdio <name> -- <command>
```

---

### Servidores MCP Populares

**Desarrollo y Testing**: Sentry, Hugging Face, Socket, Jam

**Gestión de Proyectos**: Asana, Atlassian (Jira/Confluence), Linear, Notion, ClickUp, Intercom

**Bases de Datos**: Airtable, PostgreSQL, HubSpot

**Pagos**: Stripe, PayPal, Square, Plaid

**Diseño**: Figma, Canva, Cloudinary

**Infraestructura**: Cloudflare, Netlify, Vercel

**Automatización**: Workato, Zapier

---

### Alcances de Configuración

- **Local scope**: Servidores personales, específicos del proyecto (por defecto)
- **Project scope**: Servidores compartidos con equipo vía archivo `.mcp.json` en control de versiones
- **User scope**: Utilidades personales cross-project disponibles en todos los proyectos

**Jerarquía de precedencia**: local > project > user

---

### Características Clave

#### Autenticación
Soporte OAuth 2.0 vía comando `/mcp` dentro de Claude Code

#### Integración de Recursos
Referenciar recursos usando sintaxis "@server:protocol://path" para inclusión automática como adjuntos

#### MCP Prompts
Conectarse a comandos slash proporcionados por MCP para workflows especializados

#### Variables de Entorno
Soporte para expansión de variables en `.mcp.json` usando sintaxis `${VAR}` y `${VAR:-default}`

#### Gestión de Output
Límite por defecto de 25,000 tokens para outputs MCP (configurable vía `MAX_MCP_OUTPUT_TOKENS`)

---

### Configuración Enterprise

Los administradores pueden desplegar `managed-mcp.json` para controlar centralmente servidores aprobados y usar restricciones allowlist/denylist en `managed-settings.json` para hacer cumplir políticas organizacionales.

---

### Ejemplos de Integración Práctica

- Monitorear errores de producción con integración Sentry
- Revisar PRs de GitHub y gestionar repositorios
- Query PostgreSQL para analytics de clientes
- Automatizar workflows de contenido entre múltiples plataformas

---

## 11. SLASH COMMANDS

**URL:** https://docs.claude.com/en/docs/claude-code/slash-commands

### Built-in Commands

Claude Code incluye aproximadamente 20 comandos slash incorporados para operaciones comunes:

- `/help` - Mostrar información de uso
- `/clear` - Resetear historial de conversación
- `/model` - Cambiar modelos AI
- `/config` - Acceder a settings
- `/cost` - Ver estadísticas de uso de tokens
- `/mcp` - Gestionar conexiones Model Context Protocol
- `/memory` - Editar archivos CLAUDE.md
- `/review` - Solicitar revisión de código
- `/sandbox` - Habilitar entorno de ejecución aislado

---

### Custom Slash Commands

#### Crear Comandos Personalizados

Almacenar comandos como archivos Markdown en dos ubicaciones:

**Project-level**: `.claude/commands/` (compartido con equipo vía git)

**Personal-level**: `~/.claude/commands/` (específico de usuario en todos los proyectos)

---

### Sintaxis Básica

```bash
/<command-name> [arguments]
```

---

### Usar Argumentos

Acceder argumentos a través de placeholders:

- `$ARGUMENTS` captura todos los argumentos pasados
- `$1`, `$2`, etc. referencian argumentos posicionales específicos

**Ejemplo:**
```markdown
---
description: Review code changes
---

Review PR #$1 with priority $2 and assign to $3.
```

---

### Características Avanzadas

#### Ejecución Bash
Prefijar comandos con `!` para ejecutar antes de procesar:
```markdown
---
allowed-tools: Bash(git status:*)
---

Current status: !`git status`
```

#### Referencias de Archivo
Usar prefijo `@` para incluir contenidos de archivo:
```markdown
Review the implementation in @src/utils/helpers.js
```

---

#### Opciones de Frontmatter
- `description` - Texto de ayuda del comando
- `allowed-tools` - Permisos de herramientas
- `argument-hint` - Guía de parámetros
- `model` - Override de modelo específico
- `disable-model-invocation` - Prevenir que Claude llame este comando

---

### Comandos de Plugin y MCP

**Plugin Commands**: Distribuidos a través de marketplaces de plugin, usan formato `/plugin-name:command-name`

**MCP Commands**: Descubiertos dinámicamente de servidores conectados, siguen patrón `/mcp__<server>__<prompt>`

---

### SlashCommand Tool

Claude puede ejecutar comandos personalizados programáticamente vía la herramienta SlashCommand. Deshabilitarla con:
```bash
/permissions
# Añadir regla deny: SlashCommand
```

---

### Skills vs Slash Commands

**Usar slash commands para**: Prompts simples, frecuentemente usados en archivos únicos

**Usar Agent Skills para**: Workflows complejos requiriendo múltiples archivos, scripts, y conocimiento organizado

---

## 12. MEMORIA Y CLAUDE.md

**URL:** https://docs.claude.com/en/docs/claude-code/memory

### ¿Qué son los Archivos de Memoria?

Los archivos de memoria son documentos de configuración que permiten a Claude Code retener contexto y preferencias entre sesiones. Almacenan instrucciones del proyecto, directrices del equipo y preferencias personales en un sistema jerárquico.

---

### Tipos de Memoria y Ubicaciones

Claude Code soporta cuatro niveles de memoria:

| Tipo | Ubicación | Propósito | Alcance |
|------|----------|---------|-------|
| **Enterprise Policy** | `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS); `/etc/claude-code/CLAUDE.md` (Linux); `C:\ProgramData\ClaudeCode\CLAUDE.md` (Windows) | "Instrucciones de toda la organización gestionadas por IT/DevOps" | Todos los usuarios de la organización |
| **Project Memory** | `./CLAUDE.md` o `./.claude/CLAUDE.md` | "Instrucciones compartidas con equipo para el proyecto" | Equipo vía control de código fuente |
| **User Memory** | `~/.claude/CLAUDE.md` | Preferencias personales entre todos los proyectos | Desarrollador individual |
| **Project Local** | `./CLAUDE.local.md` | Deprecated—usar imports en su lugar | Individual (proyecto actual) |

Los archivos de nivel más alto tienen precedencia y cargan primero, creando una fundación para memorias más específicas.

---

### Sintaxis de Archivo y Características

#### Estructura Básica
Los archivos de memoria usan formato Markdown con secciones organizadas:
- Usar bullet points para memorias individuales
- Agrupar items relacionados bajo headings descriptivos
- Mantener instrucciones específicas y accionables

---

#### Importar Archivos
"Los archivos CLAUDE.md pueden importar archivos adicionales usando sintaxis `@path/to/import`." Tanto rutas relativas como absolutas funcionan:

```markdown
See @README for project overview and @package.json for commands.

# Individual Preferences
- @~/.claude/my-project-instructions.md
```

**Importante:** Los imports no evalúan dentro de code spans o bloques, y los imports recursivos soportan una profundidad máxima de 5 hops.

---

### Métodos de Configuración Rápida

#### Método 1: Atajo #
Empezar input con `#` para añadir rápidamente una memoria:
```bash
# Always use descriptive variable names
```
Seleccionarás en qué archivo de memoria almacenarla.

#### Método 2: Comando /memory
Usar `/memory` durante una sesión para abrir archivos de memoria en tu editor para adiciones o organización extensas.

#### Método 3: Bootstrap Projects
Inicializar memoria de proyecto con:
```bash
> /init
```

---

### Mejores Prácticas

- **Ser específico:** "Use 2-space indentation" supera "Format code properly"
- **Organizar con estructura:** Usar headings y bullets de markdown para claridad
- **Mantener actual:** Revisar y actualizar memorias según evolucionan los proyectos
- **Incluir comandos frecuentemente usados:** Documentar comandos build, test y lint
- **Documentar convenciones:** Registrar preferencias de estilo de código y patrones de nomenclatura
- **Notar arquitectura:** Añadir patrones arquitectónicos específicos del proyecto

---

### Comportamiento de Lookup de Memoria

Claude Code busca recursivamente desde el directorio de trabajo actual hacia arriba (excluyendo raíz `/`), leyendo cualquier archivo `CLAUDE.md` o `CLAUDE.local.md` descubierto. También descubre archivos anidados en subdirectorios bajo tu ubicación actual, cargándolos solo cuando Claude accede a esos subárboles.

---

### Deployment Enterprise

Las organizaciones pueden gestionar centralmente archivos CLAUDE.md creándolos en la ubicación apropiada del OS y desplegando vía MDM, Group Policy, Ansible, o herramientas similares de gestión de configuración.

---

## 13. MODO INTERACTIVO

**URL:** https://docs.claude.com/en/docs/claude-code/interactive-mode

### Atajos de Teclado Clave

#### Controles Generales:
- `Ctrl+C` - Cancelar input o generación actual
- `Ctrl+D` - Salir de sesión Claude Code
- `Ctrl+L` - Limpiar pantalla de terminal
- `Ctrl+O` - Toggle verbose output
- `Ctrl+R` - Búsqueda reversa en historial de comandos
- `Ctrl+V`/`Alt+V` - Pegar imágenes desde portapapeles
- `Esc+Esc` - Rebobinar código/conversación a punto anterior

---

### Opciones de Input Multilinea
- `\ + Enter` - Método de escape rápido
- `Option+Enter` (macOS por defecto)
- `Shift+Enter` - Después de configuración `/terminal-setup`
- `Ctrl+J` - Carácter line feed

---

### Comandos Rápidos
- `#` prefix - Atajo de memoria (añade a CLAUDE.md)
- `/` prefix - Acceso a slash command
- `!` prefix - Modo Bash para ejecución directa de comandos
- `@` symbol - Autocompletado de ruta de archivo

---

### Modo Editor Vim
Accesible vía comando `/vim`. Incluye:

#### Cambio de Modo:
- `Esc` entra en modo NORMAL
- `i`, `I`, `a`, `A`, `o`, `O` - Modos de inserción

#### Navegación:
Teclas de movimiento (`h/j/k/l`), navegación de palabra (`w/e/b`), operaciones de línea (`0/$`), y navegación de buffer (`gg/G`)

#### Edición:
Operaciones de borrar, cambiar y repetir con sintaxis estándar vim

---

### Ejecución de Comandos en Background

Claude Code soporta ejecución asíncrona de comandos. Usar `Ctrl+B` para poner comandos en background, permitiendo trabajo continuo mientras los procesos ejecutan. Las características incluyen recuperación de output bufferizado y limpieza automática al salir.

---

### Historial de Comandos
- Navegar con teclas de flecha
- Historial es específico de sesión y directorio
- Limpiado con comando `/clear`
- `Ctrl+R` habilita búsqueda reversa interactiva con highlighting

---

## 14. CHECKPOINTING

**URL:** https://docs.claude.com/en/docs/claude-code/checkpointing

### ¿Qué son los Checkpoints?

Los checkpoints son snapshots automáticos de tu estado de código en Claude Code. El sistema "rastrea automáticamente las ediciones de archivo de Claude mientras trabajas, permitiéndote deshacer cambios rápidamente y rebobinar a estados previos si algo sale mal."

---

### Cómo Funciona el Checkpointing

#### Rastreo Automático:
- Cada prompt de usuario crea un nuevo checkpoint
- Todos los cambios hechos por herramientas de edición de archivos de Claude son capturados
- Los checkpoints persisten entre sesiones por 30 días (configurable)
- Los cambios de comandos bash **no** son rastreados

---

#### Rebobinar Cambios:
Presionar `Esc` dos veces o usar comando `/rewind` para acceder al menú de rewind con tres opciones:
- Conversation only (mantener cambios de código)
- Code only (mantener conversación)
- Both code and conversation

---

### Casos de Uso Ideales

Los checkpoints destacan cuando:
- Probar diferentes estrategias de implementación sin perder tu línea base
- Recuperarse de bugs o funcionalidad rota rápidamente
- Iterar en features con seguridad para experimentar

---

### Limitaciones Clave

El checkpointing **no** rastrea:
- Modificaciones de archivo de comandos bash (`rm`, `mv`, `cp`, etc.)
- Ediciones manuales hechas fuera de Claude Code
- Cambios de sesiones concurrentes

El sistema está intencionalmente diseñado como "undo local" complementando—no reemplazando—sistemas de control de versiones como Git.

---

### Mejores Prácticas

Usar checkpoints para recuperación a nivel de sesión, pero mantener commits Git para historial permanente y colaboración.

---

## 15. CONFIGURACIÓN Y SETTINGS

**URL:** https://docs.claude.com/en/docs/claude-code/settings

### Ubicaciones de Archivos de Settings

**User-level**: `~/.claude/settings.json` (aplica globalmente)

**Project-level**:
- `.claude/settings.json` (compartido con equipo, bajo control de versiones)
- `.claude/settings.local.json` (personal, git-ignored)

**Enterprise-level**:
- macOS: `/Library/Application Support/ClaudeCode/managed-settings.json`
- Linux/WSL: `/etc/claude-code/managed-settings.json`
- Windows: `C:\ProgramData\ClaudeCode\managed-settings.json`

---

### Categorías de Configuración Core

#### Sistema de Permisos
La estructura de permisos incluye tres arrays:
- **allow**: Operaciones de herramientas pre-aprobadas
- **ask**: Operaciones requiriendo confirmación
- **deny**: Operaciones bloqueadas (previene acceso a archivos sensibles)

**Ejemplos de patrones deny** protegen contra exposición: `"Read(.env)"`, `"Read(./secrets/**)"`, `"Bash(curl:*)"`

---

#### Variables de Entorno
Configurar API keys, settings de proxy, selección de modelo, y feature flags a través de variables de entorno o el objeto `env` en settings.json. Variables críticas incluyen `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, y overrides específicos de modelo.

---

#### Configuración de Herramientas
Claude tiene acceso a: Bash, Edit, Glob, Grep, Read, Write, WebFetch, WebSearch, Task, y comandos slash personalizados. Los permisos controlan qué herramientas operan y en qué recursos.

---

#### Settings de Sandbox
Aislamiento opcional para comandos bash (macOS/Linux) con controles para comandos excluidos, restricciones de red, y acceso a Unix socket.

---

### Precedencia de Configuración (Más Alta a Más Baja)

1. Políticas enterprise gestionadas
2. Argumentos de línea de comandos
3. Settings de proyecto local
4. Settings de proyecto compartido
5. Settings de usuario

---

### Opciones de Settings Clave

| Opción | Propósito |
|--------|---------|
| `model` | Override modelo AI por defecto |
| `outputStyle` | Ajustar comportamiento del system prompt |
| `cleanupPeriodDays` | Retención de transcripts de chat (por defecto: 30) |
| `disableAllHooks` | Deshabilitar ejecución de comandos personalizados |
| `forceLoginMethod` | Restringir a cuentas "claudeai" o "console" |
| `enableAllProjectMcpServers` | Auto-aprobar servidores MCP |

---

### Configuración de Plugin

Definir plugins habilitados y marketplaces adicionales:
```json
{
  "enabledPlugins": {
    "formatter@company-tools": true
  },
  "extraKnownMarketplaces": {
    "company-tools": {
      "source": "github",
      "repo": "company/claude-plugins"
    }
  }
}
```

---

### Restricciones Importantes

"El system prompt no está publicado en documentación; usar archivos CLAUDE.md o `--append-system-prompt` para personalizar comportamiento." Los archivos sensibles permanecen completamente invisibles cuando coinciden con reglas deny—no meramente restringidos.

---

## 16. INTEGRACIONES IDE

### Integración VS Code

**URL:** https://docs.claude.com/en/docs/claude-code/vs-code

#### Extensión VS Code (Beta)

**Instalación:** Descargar del [Visual Studio Code Extension Marketplace](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code)

**Requisitos:** VS Code 1.98.0 o superior

---

#### Características Clave

La extensión proporciona un panel lateral dedicado accedido vía icono Spark, habilitando a usuarios:

- Ver cambios propuestos de Claude en tiempo real a través de una interfaz gráfica nativa
- Revisar y editar planes antes de aceptarlos
- Habilitar modo auto-accept para aplicación automática de cambios
- Adjuntar archivos e imágenes usando el selector de archivos del sistema
- Acceder a historial de conversación y ejecutar múltiples sesiones simultáneamente
- Usar servidores Model Context Protocol (MCP) configurados a través del CLI
- Soportar atajos de teclado y la mayoría de comandos slash del CLI

---

#### Cómo Funciona

1. Hacer clic en el icono Spark en la barra lateral para abrir Claude Code
2. Ingresar prompts como lo harías en la terminal
3. Revisar diffs inline ampliando la barra lateral
4. Aceptar o rechazar ediciones sugeridas directamente en la interfaz

---

#### Configuración de Third-Party Provider

La extensión soporta Amazon Bedrock y Google Vertex AI. Configurar variables de entorno en settings de VS Code bajo "Claude Code: Environment Variables":

**Variables clave:**
- `CLAUDE_CODE_USE_BEDROCK` o `CLAUDE_CODE_USE_VERTEX` (habilitar integración)
- `ANTHROPIC_API_KEY` (requerido)
- `AWS_REGION`, `AWS_PROFILE` (para Bedrock)
- `CLOUD_ML_REGION`, `ANTHROPIC_VERTEX_PROJECT_ID` (para Vertex AI)

---

#### Aún No Implementado

- Configuración de servidor MCP directamente en la extensión
- Setup de subagentes dentro de VS Code
- Checkpoints para recuperación de estado de conversación
- Atajos avanzados (#, !, tab completion)

---

#### Integración CLI Legacy

La integración original se activa automáticamente al ejecutar `claude` desde la terminal integrada de VS Code, proporcionando:

- Compartir contexto de selección (selección del editor actual se comparte auto con Claude)
- Visualización de diff basada en IDE en lugar de output de terminal
- Atajos de referencia de archivo (Cmd+Option+K en Mac; Alt+Ctrl+K en Windows/Linux)
- Compartir diagnóstico automático de herramientas de linting

Para terminales externas, usar el comando `/ide` para conectar Claude Code a VS Code.

---

#### Consideraciones de Seguridad

"Cuando Claude Code ejecuta en VS Code con permisos auto-edit habilitados, puede ser capaz de modificar archivos de configuración IDE que pueden ser ejecutados automáticamente por tu IDE." Considerar habilitar Modo Restringido de VS Code para workspaces no confiables o usar aprobación manual para ediciones.

---

#### Troubleshooting

**Problemas de instalación de extensión:** Verificar compatibilidad de versión de VS Code (1.98.0+), verificar permisos de extensión, o instalar directamente desde el marketplace.

**Integración legacy no funciona:** Asegurar ejecutar Claude desde la terminal integrada de VS Code; verificar que el comando CLI apropiado (`code`, `cursor`, `windsurf`, o `codium`) esté disponible en tu PATH.

---

### Integración JetBrains

**URL:** https://docs.claude.com/en/docs/claude-code/jetbrains

#### IDEs Soportados
Claude Code funciona con la mayoría de IDEs JetBrains incluyendo IntelliJ IDEA, PyCharm, Android Studio, WebStorm, PhpStorm, y GoLand.

---

#### Métodos de Instalación

**Instalación desde Marketplace:** Encontrar e instalar el plugin Claude Code directamente desde el marketplace de JetBrains, luego reiniciar tu IDE completamente.

**Auto-Instalación:** El plugin puede instalarse automáticamente al ejecutar `claude` en la terminal integrada, aunque se requiere un reinicio completo del IDE para activarlo.

---

#### Características Clave

- **Lanzamiento Rápido:** Usar `Cmd+Esc` (Mac) o `Ctrl+Esc` (Windows/Linux) para abrir Claude Code directamente
- **Visualización de Diff:** "Los cambios de código pueden mostrarse directamente en el visor de diff del IDE en lugar de la terminal"
- **Contexto de Selección:** Las selecciones actuales del IDE se comparten automáticamente con Claude Code
- **Referencias de Archivo:** `Cmd+Option+K` (Mac) o `Alt+Ctrl+K` (Linux/Windows) inserta referencias de archivo
- **Compartir Diagnóstico:** Los errores del IDE se comparten automáticamente con Claude durante desarrollo

---

#### Configuración

**Settings de Claude Code:**
1. Ejecutar `claude` e ingresar comando `/config`
2. Establecer herramienta diff a `auto` para detección automática de IDE

**Settings del Plugin** (Settings → Tools → Claude Code):
- Especificar ruta de comando Claude personalizada
- Habilitar Option+Enter para prompts multi-línea (macOS)
- Configurar actualizaciones automáticas

**Fix de Tecla ESC:** Si ESC no interrumpe operaciones, ir a Settings → Tools → Terminal y desmarcar "Move focus to the editor with Escape" o eliminar el atajo.

---

#### Configuraciones Especiales

**Desarrollo Remoto:** Instalar el plugin en el host remoto vía Settings → Plugin (Host), no en el cliente local.

**Usuarios WSL:** Establecer comando Claude como `wsl -d Ubuntu -- bash -lic "claude"` (reemplazar Ubuntu con tu nombre de distribución).

---

#### Checklist de Troubleshooting

- Ejecutar Claude desde directorio raíz del proyecto
- Asegurar que el plugin esté habilitado en settings del IDE
- Reiniciar IDE completamente (múltiples veces si es necesario)
- Para Desarrollo Remoto, verificar instalación del plugin en host remoto
- Verificar instalación de Claude: `npm list -g @anthropic-ai/claude-code`

---

#### Consideración de Seguridad

Cuando auto-edit está habilitado en JetBrains, Claude Code puede modificar archivos de configuración IDE que se ejecutan automáticamente, potencialmente bypasseando prompts de permiso. Considerar usar modo de aprobación manual para ediciones cuando se trabaja con prompts no confiables.

---

## 17. SEGURIDAD

**URL:** https://docs.claude.com/en/docs/claude-code/security

### Características de Seguridad Core

#### Arquitectura Basada en Permisos
Claude Code emplea "permisos estrictos de solo lectura por defecto" y requiere aprobación explícita para operaciones sensibles como edición de archivos y ejecución de comandos. Los usuarios mantienen control directo sobre allowlisting de permisos.

---

#### Protecciones Incorporadas
- Comandos bash en sandbox con aislamiento de filesystem y red
- Restricción de acceso de escritura limitada a la carpeta del proyecto y subcarpetas
- Blocklisting de comandos para operaciones riesgosas como `curl` y `wget`
- Prompts de permiso para solicitudes de red y comandos sospechosos

---

### Salvaguardas de Prompt Injection

El sistema implementa múltiples defensas incluyendo un sistema de permisos requiriendo aprobación explícita para operaciones sensibles, "análisis consciente del contexto" detectando instrucciones dañinas, sanitización de input previniendo inyección de comandos, y "coincidencia fail-closed" donde comandos no coincidentes por defecto a aprobación manual.

---

### Privacidad de Datos

"Períodos de retención limitados para información sensible" son aplicados, con acceso restringido a datos de sesión de usuario. Los usuarios consumer pueden ajustar settings de privacidad; todos los usuarios deben revisar los Términos de Servicio Comerciales o Consumer de Anthropic y Política de Privacidad para detalles completos.

---

### Seguridad de Ejecución en Cloud

Claude Code basado en web incluye máquinas virtuales aisladas por sesión, acceso de red limitado, manejo seguro de credenciales a través de una "credencial scoped dentro del sandbox," operaciones git restringidas a branch, logging de auditoría, y limpieza automática de entorno.

---

### Mejores Prácticas

Los usuarios deben revisar todos los cambios sugeridos antes de aprobación, usar permisos específicos de proyecto para repositorios sensibles, considerar contenedores de desarrollo para aislamiento, y auditar settings regularmente. Las organizaciones deben hacer cumplir políticas gestionadas y monitorear uso a través de métricas OpenTelemetry.

---

### Reportar Problemas de Seguridad

Las vulnerabilidades deben reportarse a través del programa HackerOne de Anthropic en lugar de divulgación pública.

---

## 18. CI/CD INTEGRATION

### GitHub Actions

**URL:** https://docs.claude.com/en/docs/claude-code/github-actions

#### Quick Setup Overview

Claude Code GitHub Actions habilita automatización impulsada por IA en tu workflow de GitHub. El enfoque más rápido es usar el comando `/install-github-app` en Claude Code, que te guía a través de setup automáticamente.

---

#### Métodos de Setup Clave

**Quick Setup (Recomendado)**
Ejecutar `/install-github-app` en Claude para automatizar instalación de app GitHub y configuración de secretos. Este enfoque requiere acceso de administrador del repositorio.

**Setup Manual**
Si el comando automatizado falla:
1. Instalar la app GitHub Claude desde github.com/apps/claude
2. Añadir `ANTHROPIC_API_KEY` a secretos del repositorio
3. Copiar el archivo workflow del directorio de ejemplos a `.github/workflows/`

---

#### Configuración Esencial

La action acepta estos parámetros primarios:

- `prompt`: Instrucciones para Claude (opcional para menciones @claude)
- `claude_args`: Argumentos CLI como `--max-turns 5` o `--model claude-sonnet-4-5-20250929`
- `anthropic_api_key`: Tus credenciales API
- `github_token`: Para acceso API
- `use_bedrock` / `use_vertex`: Alternativas de cloud provider

---

#### Ejemplo de Workflow Básico

```yaml
name: Claude Code
on:
  issue_comment:
    types: [created]

jobs:
  claude:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

Esto responde automáticamente a menciones `@claude` en comentarios.

---

#### Casos de Uso Comunes

- Revisión de código PR con `/review`
- Implementación de feature desde issues
- Correcciones automáticas de bugs
- Tareas programadas personalizadas vía triggers cron

---

#### Mejores Prácticas

1. **Crear CLAUDE.md** en la raíz del repositorio definiendo estándares de codificación y directrices del proyecto
2. **Nunca hardcodear API keys** — siempre usar GitHub Secrets
3. **Establecer `--max-turns` apropiado** para controlar profundidad de iteración y costos
4. **Usar autenticación de GitHub App** en lugar de tokens de acceso personal para mejor seguridad
5. **Revisar sugerencias de Claude** antes de mergear código generado

---

#### Integración de Cloud Provider

Para AWS Bedrock o Google Vertex AI, configurar autenticación OIDC en lugar de API keys. Crear una GitHub App personalizada para automatización branded, luego autenticar de manera segura sin almacenar credenciales.

---

#### Breaking Changes (Actualizando desde Beta)

v1.0 remueve el parámetro `mode` (ahora auto-detectado), renombra `direct_prompt` a `prompt`, y mueve opciones CLI a `claude_args` usando formato: `--max-turns 10 --model claude-sonnet-4-5-20250929`

---

#### Consideraciones de Costo

Monitorear tanto minutos de GitHub Actions (para uso de runner) como consumo de tokens API. Optimizar usando comandos específicos, configurando límites de turn apropiados, y aprovechando controles de concurrency de GitHub para prevenir ejecuciones paralelas excesivas.

---

### GitLab CI/CD

**URL:** https://docs.claude.com/en/docs/claude-code/gitlab-ci-cd

#### Quick Overview

Claude Code se integra con GitLab CI/CD para habilitar automatización impulsada por IA directamente en tus pipelines. La integración permite automatizar generación de código, correcciones de bugs, y creación de merge requests a través de jobs CI/CD.

---

#### Opciones de Setup

**Quick Setup:**
Añadir un job mínimo a `.gitlab-ci.yml` con una variable `ANTHROPIC_API_KEY` enmascarada. La ruta más rápida requiere solo estos componentes más la instalación del CLI de Claude.

**Setup de Producción:**
Para uso enterprise, configurar acceso de provider (Claude API, AWS Bedrock, o Google Vertex AI), luego configurar credenciales del proyecto usando `CI_JOB_TOKEN` o un Project Access Token.

---

#### Capacidades Clave

- Transformar issues en merge requests con implementaciones completas
- Analizar código y proponer optimizaciones automáticamente
- Arreglar bugs identificados a través de tests o solicitudes manuales
- Iterar en cambios de código a través de discusiones en hilos
- Mantener seguridad a través de protección de branch y workflows de aprobación

---

#### Ejemplos de Configuración

**Job básico de Claude API:**
```yaml
claude:
  stage: ai
  image: node:24-alpine3.21
  script:
    - npm install -g @anthropic-ai/claude-code
    - claude -p "Review and implement changes" --permission-mode acceptEdits
```

**AWS Bedrock con OIDC:**
Intercambiar tokens OIDC de GitLab por credenciales AWS temporales, eliminando gestión de claves estáticas.

**Google Vertex AI con WIF:**
Usar Workload Identity Federation para autenticación sin credenciales a servicios GCP.

---

#### Mejores Prácticas

- Crear un archivo `CLAUDE.md` definiendo estándares de codificación y convenciones del proyecto que Claude sigue
- Nunca commitear API keys; usar variables CI/CD enmascaradas exclusivamente
- Implementar timeouts de job para prevenir ejecuciones fuera de control
- Revisar todos los cambios generados por IA a través de procesos estándar de revisión de código
- Considerar implicaciones de costo: minutos de compute del runner más consumo de tokens API

---

#### Triggers Comunes

- Ejecución manual de pipeline
- Eventos de merge request
- Triggers Web/API activados por menciones `@claude` en comentarios de issue o MR

---

#### Troubleshooting

Si Claude no responde: verificar ejecución de pipeline, confirmar que las variables CI/CD estén configuradas apropiadamente, y verificar que las menciones usen `@claude` (no `/claude`). Para operaciones MR, asegurar que el job tenga permisos API y la herramienta `mcp__gitlab` esté habilitada.

---

## 19. CARACTERÍSTICAS AVANZADAS

### Extended Thinking

**URL:** https://docs.claude.com/en/docs/build-with-claude/extended-thinking

#### ¿Qué es?

Extended thinking habilita a Claude a generar bloques de razonamiento interno antes de entregar respuestas finales. "Cuando extended thinking está activado, Claude crea bloques de contenido `thinking` donde emite su razonamiento interno."

---

#### Cómo Funciona

La API devuelve respuestas con dos componentes: bloques thinking mostrando razonamiento paso a paso, seguidos de bloques de texto con la respuesta final. Para modelos Claude 4, thinking está resumido para prevenir mal uso mientras mantiene calidad. Claude Sonnet 3.7 devuelve output thinking completo.

---

#### Modelos Soportados

- Claude Sonnet 4.5
- Claude Sonnet 4
- Claude Sonnet 3.7
- Claude Haiku 4.5
- Claude Opus 4.1
- Claude Opus 4

---

#### Cuándo Usarlo

Desplegar extended thinking para "tareas complejas que se benefician de razonamiento paso a paso como matemáticas, codificación, y análisis." La característica se empareja bien con uso de herramientas y prompt caching para workflows sofisticados.

---

#### Detalles de Implementación Clave

**Activación:** Establecer `"type": "enabled"` con un parámetro `budget_tokens` (mínimo 1,024). Budget representa tokens thinking máximos; uso real varía por complejidad de tarea.

**Costos de Tokens:** Se te cobran tokens thinking completos generados internamente, no output resumido. Los conteos de tokens visibles no coincidirán con montos facturados para modelos Claude 4.

---

#### Mejores Prácticas

1. Empezar con budgets más grandes (16k+) para tareas complejas; ajustar basándose en resultados
2. Usar batch processing para budgets excediendo 32k para evitar problemas de timeout
3. Monitorear uso de tokens para optimizar costos
4. Siempre pasar bloques thinking de vuelta durante uso de herramientas para mantener continuidad de razonamiento
5. Estar preparado para tiempos de respuesta más largos debido a procesamiento adicional

---

#### Compatibilidad de Características

- Incompatible con modificaciones de `temperature`, `top_k`, y uso forzado de herramientas
- Funciona con `top_p` (rango 0.95–1.0)
- Soporta streaming vía eventos server-sent
- Funciona con prompt caching y thinking intercalado (Claude 4 con beta header)

---

#### Limitaciones Importantes

- No puede usar settings restrictivos de elección de herramienta con thinking habilitado
- Cambios a parámetros thinking invalidan cachés de mensajes
- Bloques thinking de turnos previos se eliminan del contexto pero deben preservarse durante uso de herramientas multi-turn

---

### Sandboxing

**URL:** https://docs.claude.com/en/docs/claude-code/sandboxing

#### Overview
Claude Code incluye sandboxing nativo que crea límites de seguridad definidos, permitiendo al agente trabajar más autónomamente mientras reduce prompts de permiso constantes. La herramienta bash sandboxed usa primitivos a nivel de OS tanto para aislamiento de filesystem como de red.

---

#### Características de Seguridad

**Protección de Filesystem:**
- Acceso read/write restringido al directorio de trabajo actual por defecto
- Acceso de solo lectura al resto del sistema (con deny lists configurables)
- No puede modificar archivos fuera del directorio de trabajo sin permiso explícito
- Bloquea acceso a ubicaciones de sistema sensibles automáticamente

**Aislamiento de Red:**
- "Solo dominios aprobados pueden accederse" a través de un servidor proxy
- Nuevas solicitudes de dominio activan prompts de permiso
- Todos los subprocesos heredan los mismos límites de seguridad
- Previene exfiltración de datos no autorizada

**Enforcement a Nivel de OS:**
- Linux usa bubblewrap para aislamiento
- macOS usa enforcement de sandbox Seatbelt

---

#### Habilitar Sandboxing

**Quick Start:**
Ejecutar el comando slash `/sandbox` para activar sandboxing con settings por defecto.

**Configuración:**
Personalizar comportamiento a través de archivo `settings.json`. Notas clave:
- Muchas herramientas CLI requieren acceso al host; otorgar permiso habilita acceso futuro
- `watchman` es incompatible; usar `jest --no-watchman` como alternativa
- `docker` es incompatible; especificar en `excludedCommands` para ejecutar fuera del sandbox

---

#### Beneficios de Seguridad Clave

1. **Protección de Prompt Injection:** Incluso si manipulado, el agente no puede modificar archivos de configuración críticos, binarios de sistema, o exfiltrar datos a servidores no autorizados

2. **Superficie de Ataque Reducida:** Limita daño de dependencias maliciosas, scripts comprometidos, y ataques de ingeniería social

3. **Operación Transparente:** Intentos de acceso no autorizado son bloqueados a nivel de OS con notificaciones inmediatas

---

#### Limitaciones Importantes

- Filtrado de red opera a nivel de dominio sin inspección de tráfico
- Dominios amplios como `github.com` podrían habilitar exfiltración de datos
- Domain fronting puede bypassear filtrado de red
- Acceso a Unix socket (`allowUnixSockets`) puede crear bypasses de sandbox
- Permisos de escritura excesivamente amplios habilitan escalación de privilegios
- La implementación Linux incluye un modo sandbox anidado más débil para entornos Docker

---

#### Características Avanzadas

Los usuarios pueden implementar proxies personalizados para inspección de tráfico cifrado, reglas de filtrado personalizadas, e integración con infraestructura de seguridad existente. El sandbox runtime está disponible como open-source vía npm para proyectos de agentes comunitarios.

---

### LLM Gateway

**URL:** https://docs.claude.com/en/docs/claude-code/llm-gateway

#### ¿Qué es?

Un LLM gateway proporciona una capa de proxy centralizada entre Claude Code y proveedores de modelo. Ofrece "autenticación centralizada," "seguimiento de uso," "controles de costo," "logging de auditoría," y "enrutamiento de modelo."

---

#### Gateway Soportado: LiteLLM

La documentación cubre LiteLLM, un servicio proxy de terceros. Anthropic explícitamente declara que "no respalda, mantiene, o audita la seguridad o funcionalidad de LiteLLM" y recomienda "usar bajo tu propia discreción."

---

#### Requisitos de Setup

- Claude Code actualizado a la última versión
- LiteLLM Proxy Server desplegado que sea accesible
- Acceso a modelos Claude a través de tu proveedor elegido

---

#### Métodos de Configuración

**Enfoques de autenticación:**
1. API key estática vía variable de entorno
2. API key dinámica usando helper scripts para credenciales rotativas o autenticación por usuario

**Opciones de endpoint:**
- Endpoint unificado (recomendado): `ANTHROPIC_BASE_URL=https://litellm-server:4000`
- Endpoints pass-through específicos de proveedor para Anthropic API, Amazon Bedrock, y Google Vertex AI

---

#### Casos de Uso Primarios

- **Gestión centralizada de claves** entre equipos y proyectos
- **Monitoreo de uso** y seguimiento de costos a nivel organizacional
- **Enforcement de presupuesto** y límite de tasa
- **Compliance** a través de logging de auditoría
- **Flexibilidad de proveedor** sin modificaciones de código

La documentación dirige a usuarios a los docs oficiales de LiteLLM para instrucciones detalladas de configuración.

---

### Analytics y Monitoreo

**URL:** https://docs.claude.com/en/docs/claude-code/analytics

#### Métricas Disponibles

El dashboard de analytics rastrea varios indicadores clave de rendimiento:

**Lines of Code Accepted**: "Total de líneas de código escritas por Claude Code que los usuarios han aceptado en sus sesiones," excluyendo sugerencias rechazadas y eliminaciones subsecuentes.

**Suggestion Accept Rate**: Porcentaje de uso de herramientas de edición de código aceptado, incluyendo operaciones Edit, Write, y NotebookEdit.

**Activity Tracking**: Monitorea tanto usuarios activos como sesiones diariamente, mostrado en ejes Y duales para análisis comparativo.

**Spend Analytics**: "Número de usuarios activos en un día dado" y dólares totales gastados diariamente, ayudando a organizaciones a entender costos.

**Team Insights**: Muestra métricas por usuario incluyendo:
- Estado de autenticación de miembro (identificadores de API key o direcciones de email)
- Gasto mensual por usuario
- Líneas de código aceptadas mensualmente por usuario

---

#### Acceder a Analytics

Analytics están disponibles exclusivamente a través de [console.anthropic.com/claude-code](https://console.anthropic.com/claude-code) para organizaciones usando Claude Code con la API de Claude.

---

#### Acceso Requerido

Los usuarios con roles **Primary Owner**, **Owner**, **Billing**, **Admin**, o **Developer** pueden acceder analytics. Los usuarios con roles **User**, **Claude Code User**, o **Membership Admin** no pueden.

---

#### Monitoreo y Optimización

Las organizaciones pueden usar analytics para:
- Identificar desarrolladores activos y tendencias de adopción
- Medir efectividad de aceptación de herramientas
- Rastrear productividad de generación de código
- Identificar oportunidades de capacitación

Para monitoreo avanzado, la documentación referencia integración OpenTelemetry para métricas personalizadas y alertas.

---

### Capacidades de Visión

**URL:** https://docs.claude.com/en/docs/build-with-claude/vision

Claude Code puede aprovechar capacidades de visión de Claude para procesamiento y análisis de imágenes. Aquí están las características relevantes clave:

#### Soporte de Procesamiento de Imágenes

Claude acepta imágenes en múltiples formatos: **"JPEG, PNG, GIF, y WebP"**. Puedes proporcionar imágenes a través de tres métodos:

1. **Imágenes codificadas en Base64** - Embeber datos de imagen directamente en solicitudes API
2. **Imágenes basadas en URL** - Referenciar imágenes hospedadas online
3. **Files API** - Subir imágenes una vez para reuso en múltiples solicitudes

---

#### Análisis de Screenshot

Claude puede analizar screenshots y contenido visual. La documentación enfatiza: **"Claude analizará todas las imágenes proporcionadas al formular su respuesta,"** haciéndolo adecuado para tareas como comparar múltiples screenshots o extraer información de interfaces visuales.

---

#### Límites de Uso y Rendimiento

- Hasta 100 imágenes por solicitud API
- Imágenes más grandes de 8000x8000 píxeles son rechazadas
- Para rendimiento óptimo, mantener imágenes bajo 1568 píxeles en el borde largo
- Imágenes muy pequeñas bajo 200 píxeles pueden degradar rendimiento

---

#### Aplicaciones Prácticas

Claude Code puede usar visión para:
- Extraer texto y datos de screenshots
- Analizar layouts UI y diseños
- Comparar diferencias visuales entre imágenes
- Procesar datos de formulario o gráfico desde imágenes

---

#### Limitaciones Importantes

Claude no puede identificar personas por nombre en imágenes y tiene razonamiento espacial limitado para tareas de localización precisa. Siempre verificar interpretaciones de imagen de Claude, especialmente para aplicaciones críticas.

---

## 20. DEPLOYMENT ENTERPRISE

### Identity and Access Management (IAM)

**URL:** https://docs.claude.com/en/docs/claude-code/iam

#### Métodos de Autenticación

Claude Code soporta tres enfoques de autenticación:

1. **Claude API** - Vía Claude Console con soporte SSO
2. **Amazon Bedrock** - Autenticación de cloud provider
3. **Google Vertex AI** - Autenticación de cloud provider

A los usuarios se les pueden asignar roles como "Claude Code" (solo API keys) o "Developer" (cualquier tipo de API key).

---

#### Sistema de Permisos

Claude Code implementa una estructura de permisos escalonada:

- **Herramientas de solo lectura** (lecturas de archivo, LS, grep) - Sin aprobación necesaria
- **Comandos Bash** - Requiere aprobación por proyecto/comando
- **Modificaciones de archivo** - Requiere aprobación hasta que termina la sesión

---

#### Reglas de Permiso

Tres tipos de regla gobiernan acceso a herramientas:

- **Allow** - Permite uso de herramienta sin aprobación manual
- **Ask** - Solicita confirmación de usuario cada vez (tiene precedencia sobre Allow)
- **Deny** - Bloquea uso de herramienta (precedencia más alta)

---

#### Modos de Permiso

Cuatro modos operacionales disponibles:

| Modo | Función |
|------|----------|
| `default` | Prompts en primer uso de herramienta |
| `acceptEdits` | Auto-acepta ediciones de archivo |
| `plan` | Solo análisis, sin modificaciones |
| `bypassPermissions` | Salta todos los prompts |

---

#### Controles Específicos de Herramienta

Reglas finas soportan patrones como `Bash(npm run test:*)` o `WebFetch(domain:github.com)`. Las herramientas MCP usan formato `mcp__servername__toolname`.

---

#### Políticas Enterprise

Las organizaciones pueden hacer cumplir settings de todo el sistema vía:
- macOS: `/Library/Application Support/ClaudeCode/managed-settings.json`
- Linux/WSL: `/etc/claude-code/managed-settings.json`
- Windows: `C:\ProgramData\ClaudeCode\managed-settings.json`

---

#### Precedencia de Settings (Más Alta a Más Baja)

1. Políticas enterprise
2. Argumentos de línea de comandos
3. Settings de proyecto local
4. Settings de proyecto compartido
5. Settings de usuario

---

#### Gestión de Credenciales

Las credenciales se almacenan de manera segura en macOS Keychain. Intervalos de refresh personalizados pueden establecerse vía la variable de entorno `CLAUDE_CODE_API_KEY_HELPER_TTL_MS`.

---

### Network Configuration

**URL:** https://docs.claude.com/en/docs/claude-code/network-config

#### Settings de Proxy

Claude Code soporta variables de entorno de proxy estándar para enrutar tráfico a través de servidores corporativos:

**HTTPS Proxy (Recomendado):**
```bash
export HTTPS_PROXY=https://proxy.example.com:8080
```

**HTTP Proxy (Alternativo):**
```bash
export HTTP_PROXY=http://proxy.example.com:8080
```

**Configuración de Bypass:**
La herramienta acepta formatos tanto separados por espacio como por coma para la variable `NO_PROXY` para excluir dominios específicos o direcciones IP del enrutamiento de proxy.

**Limitación Importante:** "Claude Code no soporta proxies SOCKS."

---

#### Métodos de Autenticación

**Basic Authentication:** Incluir credenciales directamente en la URL del proxy (aunque hardcodear passwords se desaconseja—usar variables de entorno o almacenamiento seguro de credenciales en su lugar).

**Advanced Authentication:** Para proxies requiriendo NTLM, Kerberos, o métodos similares, considerar usar un servicio LLM Gateway que soporte tus requisitos de autenticación específicos.

---

#### Configuración de Certificado

**Custom CA Certificates:**
```bash
export NODE_EXTRA_CA_CERTS=/path/to/ca-cert.pem
```

**mTLS Authentication:**
```bash
export CLAUDE_CODE_CLIENT_CERT=/path/to/client-cert.pem
export CLAUDE_CODE_CLIENT_KEY=/path/to/client-key.pem
export CLAUDE_CODE_CLIENT_KEY_PASSPHRASE="your-passphrase"
```

---

#### Requisitos de Acceso a Red

Claude Code requiere allowlisting estas URLs en configuraciones de firewall y proxy:

- `api.anthropic.com` (endpoints de Claude API)
- `claude.ai` (salvaguardas WebFetch)
- `statsig.anthropic.com` (Telemetría y métricas)
- `sentry.io` (Reporte de errores)

Estos requisitos son especialmente críticos en entornos containerizados o de red restringida.

---

### Data Usage y Privacy

**URL:** https://docs.claude.com/en/docs/claude-code/data-usage

#### Recolección de Datos

Claude Code recolecta prompts de usuario, outputs de modelo, y código durante sesiones. Para sesiones basadas en cloud, los repositorios se clonan a VMs aisladas y automáticamente se eliminan post-sesión.

**Servicios de telemetría:**
- Statsig registra métricas operacionales (latencia, confiabilidad, patrones de uso) sin capturar código o rutas de archivo
- Sentry maneja logging de errores
- Ambos usan cifrado TLS en tránsito y cifrado AES de 256 bits en reposo

---

#### Uso de Datos y Entrenamiento

**Usuarios consumer (Free, Pro, Max):** A partir del 28 de agosto de 2025, puedes optar por permitir uso de datos para entrenar futuros modelos Claude. Esto aplica solo a sesiones nuevas o reanudadas.

**Usuarios comerciales (Team, Enterprise, API):** Anthropic no entrena en tu código o prompts a menos que participes explícitamente en el "Development Partner Program."

---

#### Retención de Datos

**Usuarios consumer:**
- Opt-in a entrenamiento: 5 años de retención
- Opt-out: 30 días de retención

**Usuarios comerciales:**
- Estándar: 30 días de retención
- Zero data retention: Disponible vía API keys configuradas
- Caché local: Hasta 30 días (configurable)

---

#### Controles de Privacy

Puedes gestionar settings en `claude.ai/settings/data-privacy-controls`. El feedback del comando `/bug` se retiene por 5 años. Puedes deshabilitar telemetría, reporte de errores, y reporte de bugs vía variables de entorno (`DISABLE_TELEMETRY`, `DISABLE_ERROR_REPORTING`, `DISABLE_BUG_COMMAND`).

---

## 21. MODELOS Y CAPACIDADES

**URL:** https://docs.claude.com/en/docs/about-claude/models

### Modelos de Producción Actuales

#### Claude Sonnet 4.5 (Recomendado)
- Mejor balance de inteligencia, velocidad y costo
- Excelente para codificación y tareas agénticas
- API ID: `claude-sonnet-4-5-20250929`
- Pricing: $3/input MTok, $15/output MTok
- Context: 200K tokens (1M beta disponible)
- Max output: 64K tokens

#### Claude Haiku 4.5 (Más Rápido)
- Inteligencia casi-frontier con optimización de velocidad
- API ID: `claude-haiku-4-5-20251001`
- Pricing: $1/input MTok, $5/output MTok
- Context: 200K tokens
- Max output: 64K tokens

#### Claude Opus 4.1 (Razonamiento Especializado)
- Excepcional para tareas de razonamiento complejo
- API ID: `claude-opus-4-1-20250805`
- Pricing: $15/input MTok, $75/output MTok
- Context: 200K tokens
- Max output: 32K tokens

---

### Capacidades Clave
Todos los modelos actuales soportan:
- Input de texto e imagen
- Extended thinking
- Acceso de priority tier
- Soporte multilingüe
- Ventanas de contexto de 200K tokens

---

### Guía de Selección
Empezar con **Claude Sonnet 4.5** a menos que necesites razonamiento especializado (Opus) o velocidad máxima (Haiku). La documentación enfatiza que los modelos Claude 4.5 muestran "inteligencia mejorada y capacidades aumentadas" sobre generaciones previas.

---

## 22. MEJORES PRÁCTICAS

### Prompt Engineering

**URL:** https://docs.claude.com/en/docs/build-with-claude/prompt-engineering

#### Principios Core

**Ser Claro y Directo**
Los prompts efectivos "deben tener una definición clara de los criterios de éxito" para tu caso de uso. La especificidad importa—las solicitudes vagas producen resultados mediocres.

**Proporcionar Ejemplos**
"Usar ejemplos (multishot prompting)" mejora significativamente el rendimiento. Mostrar a Claude cómo se ve un buen output le ayuda a entender tus requisitos mejor que solo instrucciones.

**Dejar Pensar a Claude**
Los enfoques "chain of thought" funcionan bien. Cuando pides a Claude que explique su razonamiento paso a paso, produce respuestas más precisas y reflexivas.

---

#### Formateo Estructurado

**Usar Etiquetas XML**
Organizar información jerárquicamente con etiquetas estilo XML. Esto ayuda a Claude a parsear solicitudes complejas y mantener contexto a lo largo de interacciones más largas.

**System Prompts**
Asignar a Claude un rol específico o contexto ("Give Claude a role") establece el tono para respuestas y asegura consistencia en estilo y enfoque de output.

---

#### Técnicas Avanzadas

**Prefill Responses**
Empezar la respuesta de Claude escribiendo la apertura tú mismo puede guiar la dirección y formato de lo que sigue.

**Chain Complex Prompts**
Para tareas sofisticadas, dividir problemas en prompts secuenciales en lugar de intentar todo en una solicitud.

**Aprovechar Ventanas de Contexto**
Usar la capacidad de contexto extendido de Claude para trabajar con documentos más largos y proporcionar material de referencia comprensivo por adelantado.

---

#### Testing e Iteración

Antes de optimizar prompts, establecer "casos de prueba empíricos" contra tus criterios de éxito. Esto previene perseguir mejoras que realmente no importan para tu caso de uso.

---

### Testing y Evaluación

**URL:** https://docs.claude.com/en/docs/test-and-evaluate

#### Framework Clave: Definir Criterios de Éxito Primero

El principio fundacional es establecer criterios de éxito claros y medibles antes de construir. Según la documentación, "buenos criterios de éxito son: **Específicos**: Definir claramente qué quieres lograr. En lugar de 'buen rendimiento,' especificar 'clasificación de sentimiento precisa.'"

---

#### Características de Criterios de Éxito

La evaluación efectiva requiere criterios que sean:

1. **Medibles** - Usar métricas cuantitativas o escalas cualitativas aplicadas consistentemente
2. **Alcanzables** - Basar objetivos en benchmarks de la industria y capacidades realistas de modelos frontier
3. **Relevantes** - Alinearse con el propósito real de tu aplicación y necesidades del usuario

---

#### Categorías de Métricas de Evaluación

**Enfoques cuantitativos** incluyen:
- Métricas específicas de tarea (F1 score, BLEU, perplexity)
- Métricas genéricas (accuracy, precision, recall)
- Métricas operacionales (tiempo de respuesta en ms, uptime %)

**Métodos de medición** abarcan:
- Testing A/B contra modelos baseline
- Feedback implícito de usuario (tasas de completación de tarea)
- Análisis de tracking de casos edge

**Evaluación cualitativa** usa:
- Escalas Likert con anclas definidas
- Rúbricas de experto con criterios estandarizados

---

#### Evaluación Multi-Dimensional

La mayoría de aplicaciones requieren evaluar múltiples dimensiones simultáneamente. La documentación ilustra esto con análisis de sentimiento requiriendo: F1 score ≥0.85, 99.5% outputs no tóxicos, clasificación de errores, y objetivos de latencia de respuesta.

---

#### Áreas Comunes de Criterios de Éxito

- Fidelidad de tarea y manejo de casos edge
- Consistencia de output entre inputs similares
- Relevancia y coherencia a necesidades del usuario
- Apropiación de tone/estilo
- Preservación de privacidad
- Efectividad de utilización de contexto
- Requisitos de latencia
- Restricciones de costo

---

## 23. TROUBLESHOOTING

**URL:** https://docs.claude.com/en/docs/claude-code/troubleshooting

### Problemas de Instalación

#### Problemas Windows/WSL:
- Establecer `npm config set os linux` antes de instalación si WSL usa npm de Windows
- Instalar con `npm install -g @anthropic-ai/claude-code --force --no-os-check`
- Errores "Node not found" indican que WSL está usando Node.js de Windows; verificar con `which npm` y `which node`
- Instalar Node vía gestor de paquetes Linux o nvm para resolver conflictos PATH

#### Errores de Permiso Linux/Mac:
- Instalador nativo disponible: `curl -fsSL https://claude.ai/install.sh | bash`
- Alternativa: Ejecutar `claude migrate-installer` para mover a instalación local en `~/.claude/local/`

---

### Autenticación y Permisos

- Usar `/logout`, cerrar Claude Code, reiniciar y re-autenticar si persisten problemas
- Remover caché de auth: `rm -rf ~/.config/claude-code/auth.json`
- Usar comando `/permissions` para permitir herramientas específicas sin aprobación repetida

---

### Problemas de Rendimiento

#### Alto Uso CPU/Memoria:
- Usar `/compact` regularmente para reducir tamaño de contexto
- Cerrar y reiniciar entre tareas mayores
- Añadir directorios de build grandes a `.gitignore`

#### Problemas de Búsqueda:
- Instalar ripgrep del sistema para herramienta Search y menciones @file
- En WSL: Mover proyectos a filesystem Linux (`/home/`) para mejor rendimiento
- Enviar búsquedas más específicas para reducir escaneo de archivos

---

### Integración IDE

#### JetBrains en WSL2:
- Configurar Windows Firewall para permitir tráfico interno WSL2, o
- Cambiar a networking en espejo en `.wslconfig`: `networkingMode=mirrored`

#### Tecla ESC No Funciona en JetBrains:
- Settings → Tools → Terminal → desmarcar "Move focus to editor with Escape"

---

### Problemas de Markdown

El markdown generado puede carecer de tags de lenguaje en bloques de código. Las soluciones incluyen solicitar a Claude añadir tags, usar hooks de post-procesamiento, o establecer preferencias de formateo en archivos de memoria del proyecto.

---

### Obtener Ayuda

- Usar comando `/bug` para reportar problemas directamente
- Ejecutar `/doctor` para verificar salud de instalación
- Verificar repositorio GitHub para problemas conocidos

---

## 24. CARACTERÍSTICAS NO INCLUIDAS EN NUESTRO CURSO

Después de esta revisión exhaustiva de la documentación oficial, identifico las siguientes características que **NO están incluidas** en nuestro curso actual del Instituto San Miguel:

### 1. Model Context Protocol (MCP)
- Integración con herramientas externas (Sentry, JIRA, Linear, PostgreSQL, etc.)
- Configuración de servidores MCP
- OAuth 2.0 para MCP
- Referencias de recursos MCP con sintaxis `@server:protocol://path`

### 2. Plugins System
- Creación de plugins personalizados
- Marketplaces de plugins
- Distribución de plugins en equipo
- Instalación y gestión de plugins

### 3. Agent Skills Avanzados
- Agent Skills pre-construidos (PowerPoint, Excel, Word, PDF)
- Progressive disclosure architecture (3 niveles de carga)
- Skills API para Claude API
- Container y code execution para Skills

### 4. Hooks System
- PreToolUse y PostToolUse hooks
- UserPromptSubmit hooks
- SessionStart/SessionEnd hooks
- Notification hooks
- PreCompact hooks
- JSON output avanzado de hooks
- Plugin hooks integration

### 5. Output Styles
- Custom output styles
- Explanatory style
- Learning style
- Creación de output styles personalizados

### 6. Extended Thinking
- Budget tokens para thinking
- Thinking blocks en API
- Interleaved thinking
- Configuración avanzada de thinking

### 7. Sandboxing
- Sandbox nativo con bubblewrap/Seatbelt
- Network isolation con proxy
- Filesystem isolation
- Custom proxy para inspección de tráfico
- Unix socket controls

### 8. LLM Gateway
- Integración con LiteLLM
- Enrutamiento de modelo centralizado
- API key rotation con helper scripts
- OIDC authentication para gateways

### 9. Enterprise Features Avanzadas
- Managed settings deployment (MDM, Group Policy)
- Enterprise policy CLAUDE.md
- Allowlist/denylist MCP servers
- OpenTelemetry integration
- Advanced IAM con SSO
- Cost management avanzado con analytics

### 10. Advanced CI/CD
- GitLab CI/CD integration completa
- OIDC authentication para GitHub Actions
- AWS Bedrock integration en CI/CD
- Google Vertex AI con Workload Identity Federation
- Custom GitHub Apps

### 11. Características de Deployment
- Development containers (devcontainers)
- Custom installation avanzada
- Network configuration compleja (mTLS, NTLM, Kerberos)
- Proxy HTTPS con autenticación avanzada

### 12. API y SDK
- Claude Agent SDK (TypeScript y Python)
- Messages API con Skills
- Batch API
- Files API
- Streaming avanzado con stream-json

### 13. Características Avanzadas de Visión
- Base64-encoded images en API
- Files API para imágenes
- Processing de múltiples imágenes (hasta 100)
- Custom image processing workflows

### 14. Citations
- Native citations feature
- Document chunking
- Block-based citations
- Citations con PDFs

### 15. Checkpointing Avanzado
- Configuración de retention period
- Rewind de código vs conversación selectivo
- Integration con Git worktrees

### 16. Terminal Avanzado
- Vim mode completo
- Background command execution con Ctrl+B
- Advanced multiline input configuration
- Terminal setup personalizado

### 17. Características de Testing
- Evaluations framework
- Multi-dimensional evaluation
- Quantitative metrics (F1, BLEU, perplexity)
- Qualitative assessment con Likert scales

### 18. Analytics Avanzado
- Suggestion accept rate
- Per-user spending analytics
- Lines of code tracking
- Team insights dashboard
- OpenTelemetry custom metrics

### 19. Características Web
- Web-based Claude Code
- Browser-based execution
- Cloud VM isolation
- Web-specific security features

### 20. Advanced Model Features
- Model aliases configuration
- Custom model selection
- Priority tier access
- Model-specific optimizations

---

## CONCLUSIONES Y RECOMENDACIONES

### Cobertura del Curso Actual

Nuestro curso del Instituto San Miguel cubre muy bien:
- Conceptos básicos de Claude Code
- Instalación y configuración inicial
- Workflows comunes
- Subagentes básicos
- Slash commands
- Memoria (CLAUDE.md)
- Modo interactivo básico
- Integración IDE básica
- Checkpointing básico

---

### Gaps Identificados

Las áreas principales que podrían añadirse al curso para hacerlo más completo son:

**Prioridad Alta:**
1. Model Context Protocol (MCP) - Fundamental para integraciones
2. Hooks System - Automatización y validación
3. Agent Skills avanzados - Capacidades especializadas
4. Extended Thinking - Tareas complejas
5. CI/CD Integration - GitHub Actions y GitLab

**Prioridad Media:**
6. Plugins System - Extensibilidad
7. Output Styles - Personalización
8. Sandboxing - Seguridad
9. Enterprise Features - Deployment corporativo

**Prioridad Baja:**
10. LLM Gateway - Casos enterprise específicos
11. Advanced Analytics - Monitoreo avanzado
12. Citations - Casos específicos

---

### Recomendaciones para el Curso

1. **Módulo de MCP**: Crear módulo completo sobre integración con herramientas externas
2. **Módulo de Automatización**: Cubrir Hooks y CI/CD integration
3. **Módulo de Skills**: Expandir Skills con ejemplos prácticos
4. **Módulo de Seguridad**: Cubrir Sandboxing y mejores prácticas
5. **Módulo Enterprise**: Para estudiantes avanzados, cubrir deployment corporativo

---

## RECURSOS ADICIONALES

### Documentación Oficial
- Documentación principal: https://docs.claude.com/en/docs/claude-code/overview
- Skills Cookbook: https://github.com/anthropics/claude-cookbooks/tree/main/skills
- GitHub Actions: https://github.com/anthropics/claude-code-action
- Console: https://console.anthropic.com/claude-code

### Comunidad y Soporte
- Support Center: https://support.claude.com/
- Discord Community: Enlace en documentación
- HackerOne Program: Para reportar vulnerabilidades

---

**FIN DEL INFORME**

*Este informe exhaustivo cubre todas las secciones principales de la documentación oficial de Claude Code disponible al 27 de octubre de 2025.*
