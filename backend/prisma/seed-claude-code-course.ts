/**
 * Seed para el curso "Especialista en desarrollo con Claude Code"
 *
 * Estructura:
 * - 1 Curso completo
 * - 8 Módulos (Básico → Experto)
 * - 43 Lecciones con contenido didáctico completo en español
 * - 8 Quizzes (uno por módulo) con preguntas tipo test
 * - Sistema de gamificación integrado
 */

import { PrismaClient, CourseLevel, LessonType, QuestionType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando seed del curso Claude Code...');

  // 1. Crear o recuperar el instructor
  let instructor = await prisma.user.findUnique({
    where: { email: 'instructor@instituto-sanmiguel.es' }
  });

  if (!instructor) {
    const hashedPassword = await bcrypt.hash('ClaudeCode2025!', 10);
    instructor = await prisma.user.create({
      data: {
        email: 'instructor@instituto-sanmiguel.es',
        password: hashedPassword,
        firstName: 'Dr. Miguel',
        lastName: 'Sánchez',
        role: 'INSTRUCTOR',
        bio: 'Experto en IA y desarrollo con Claude Code. Instructor principal del Instituto San Miguel.',
        emailVerified: true,
        isActive: true
      }
    });
    console.log('✅ Instructor creado');
  } else {
    console.log('✅ Instructor existente recuperado');
  }

  // 2. Crear categoría del curso
  let category = await prisma.category.findUnique({
    where: { slug: 'inteligencia-artificial' }
  });

  if (!category) {
    category = await prisma.category.create({
      data: {
        name: 'Inteligencia Artificial',
        slug: 'inteligencia-artificial',
        description: 'Cursos de especialización en IA y desarrollo asistido',
        icon: '🤖',
        color: '#EA580C',
        order: 1
      }
    });
    console.log('✅ Categoría creada');
  }

  // 3. Crear tags
  const tagNames = [
    { name: 'Claude Code', slug: 'claude-code' },
    { name: 'Desarrollo IA', slug: 'desarrollo-ia' },
    { name: 'Agentic Coding', slug: 'agentic-coding' },
    { name: 'Productividad', slug: 'productividad' },
    { name: 'DevOps', slug: 'devops' }
  ];

  const tags = [];
  for (const tagData of tagNames) {
    let tag = await prisma.tag.findUnique({ where: { slug: tagData.slug } });
    if (!tag) {
      tag = await prisma.tag.create({ data: tagData });
    }
    tags.push(tag);
  }
  console.log('✅ Tags creados');

  // 4. Crear el curso principal
  const course = await prisma.course.create({
    data: {
      title: 'Especialista en Desarrollo con Claude Code',
      slug: 'especialista-claude-code',
      description: `Conviértete en un ingeniero de software experto en Claude Code. Este curso te llevará desde los fundamentos básicos hasta el dominio completo de todas las herramientas, metodologías y recursos para programar con el asistente de IA más potente del mercado.

## 🎯 Lo que aprenderás

- Dominar Claude Code desde nivel básico hasta experto
- Workflows profesionales de desarrollo con IA
- Personalización avanzada: subagents, hooks y plugins
- Integración en entornos empresariales
- CI/CD y automatización con Claude Code
- Desarrollo de plugins y extensiones
- Arquitectura de proyectos complejos

## 🎮 Experiencia gamificada

El curso incluye challenges prácticos, sistema de puntos y badges desbloqueables que te mantendrán motivado durante todo el aprendizaje.

## 🏆 Certificación

Al completar el curso y el proyecto final integrador, recibirás el certificado de **Especialista en Desarrollo con Claude Code** del Instituto San Miguel.`,
      shortDescription: 'Domina Claude Code desde cero hasta experto. 45 horas de contenido práctico, gamificado y 100% en español.',
      level: CourseLevel.BEGINNER, // Comienza en básico
      status: 'PUBLISHED',
      published: true,
      featured: true,
      price: 0, // Gratuito
      duration: 45, // 45 horas
      instructorId: instructor.id,
      categoryId: category.id,
      publishedAt: new Date(),
      prerequisites: JSON.stringify([
        'Conocimientos básicos de programación',
        'Familiaridad con la terminal/línea de comandos',
        'Git básico',
        'Inglés técnico (lectura)'
      ]),
      learningGoals: JSON.stringify([
        'Dominar Claude Code en todos sus niveles',
        'Crear workflows profesionales de desarrollo',
        'Desarrollar plugins y extensiones personalizadas',
        'Integrar Claude Code en entornos empresariales',
        'Automatizar tareas de desarrollo con IA',
        'Aplicar mejores prácticas de desarrollo asistido por IA'
      ])
    }
  });

  console.log(`✅ Curso creado: ${course.title}`);

  // 5. Asociar tags al curso
  for (const tag of tags) {
    await prisma.courseTag.create({
      data: {
        courseId: course.id,
        tagId: tag.id
      }
    });
  }
  console.log('✅ Tags asociados al curso');

  // 6. Crear los 8 módulos y sus lecciones
  await createModule1(course.id);
  await createModule2(course.id);
  await createModule3(course.id);
  await createModule4(course.id);
  await createModule5(course.id);
  await createModule6(course.id);
  await createModule7(course.id);
  await createModule8(course.id);

  console.log('🎉 Seed completado exitosamente!');
  console.log(`📚 Curso: ${course.title}`);
  console.log(`🔗 Slug: ${course.slug}`);
  console.log(`👨‍🏫 Instructor: ${instructor.firstName} ${instructor.lastName}`);
}

// ============================================================================
// MÓDULO 1: Fundamentos de Claude Code
// ============================================================================
async function createModule1(courseId: string) {
  const module = await prisma.module.create({
    data: {
      title: 'Módulo 1: Fundamentos de Claude Code',
      description: 'Introducción completa a Claude Code. Aprenderás qué es, cómo instalarlo, y cómo realizar tus primeras interacciones.',
      order: 1,
      courseId: courseId,
      isPublished: true
    }
  });

  console.log(`📘 ${module.title} creado`);

  // Lección 1.1
  const lesson1_1 = await prisma.lesson.create({
    data: {
      title: '¿Qué es Claude Code?',
      description: 'Introducción al desarrollo asistido por IA con Claude Code',
      type: LessonType.TEXT,
      order: 1,
      moduleId: module.id,
      isPublished: true,
      isFree: true, // Primera lección gratuita
      content: JSON.stringify({
        sections: [
          {
            type: 'introduction',
            content: `# ¿Qué es Claude Code?

Bienvenido al curso de Especialista en Claude Code. En esta primera lección descubrirás qué es Claude Code y por qué representa una revolución en el desarrollo de software.`
          },
          {
            type: 'concept',
            title: '🤖 Claude Code: Tu Asistente de IA en la Terminal',
            content: `Claude Code es la herramienta oficial de línea de comandos (CLI) desarrollada por Anthropic que te permite trabajar directamente con Claude, uno de los asistentes de IA más potentes del mundo, sin salir de tu terminal.

**No es solo un autocompletado de código.** Claude Code es un asistente agentic que puede:

- **Generar código completo** - Desde funciones simples hasta features enteras
- **Depurar errores** - Analizar stack traces y proponer soluciones
- **Refactorizar código** - Modernizar código legacy manteniendo comportamiento
- **Navegar proyectos** - Entender la estructura de tu codebase automáticamente
- **Ejecutar comandos** - Hacer commits, correr tests, crear PRs
- **Tomar decisiones** - Actuar de forma autónoma en tu proyecto`
          },
          {
            type: 'comparison',
            title: '🆚 ¿En qué se diferencia de otros asistentes?',
            content: `**Comparado con GitHub Copilot:**
- Copilot sugiere líneas de código mientras escribes
- Claude Code planifica, ejecuta y verifica tareas completas

**Comparado con ChatGPT:**
- ChatGPT conversa en un navegador web
- Claude Code trabaja directamente en tu terminal y archivos

**Comparado con otros AI assistants:**
- Claude Code sigue la filosofía Unix: componible, scriptable
- Puede integrarse en pipelines de CI/CD
- Enterprise-grade: AWS Bedrock, Google Vertex AI`
          },
          {
            type: 'philosophy',
            title: '📜 Filosofía Unix y Agentic Coding',
            content: `Claude Code está diseñado siguiendo la **filosofía Unix**:

1. **Hacer una cosa bien** - Asistir en desarrollo de software
2. **Componible** - Se integra con otras herramientas (git, npm, docker)
3. **Scriptable** - Puede automatizarse: \`cat logs.txt | claude -p "analiza"\`

**Agentic Coding** significa que Claude:
- No solo sugiere, **ejecuta**
- No solo lee, **escribe archivos**
- No solo analiza, **toma decisiones**
- Puede trabajar de forma autónoma en tareas complejas`
          },
          {
            type: 'benefits',
            title: '✨ Beneficios principales',
            content: `**Para desarrolladores:**
- ⏱️ **10x productividad** en tareas repetitivas
- 🐛 **Debugging más rápido** con análisis contextual
- 📚 **Aprende mientras trabajas** (modo Learning)
- 🔄 **Refactoring seguro** con tests automáticos

**Para equipos:**
- 🔧 **Onboarding acelerado** - Nuevos devs productivos en días
- 📖 **Documentación automática** - READMEs, JSDoc, diagramas
- ✅ **Code reviews automáticos** con subagents especializados
- 🔒 **Enterprise-ready** - Deploy en tu infraestructura`
          },
          {
            type: 'example',
            title: '💡 Ejemplo práctico',
            content: `Imagina que necesitas agregar autenticación JWT a tu API Express:

**Antes de Claude Code:**
1. Buscar tutorial de JWT + Express
2. Copiar código de Stack Overflow
3. Adaptar a tu proyecto (1-2 horas)
4. Debuggear errores
5. Escribir tests
6. Documentar

**Con Claude Code:**
\`\`\`bash
claude
> Agrega autenticación JWT a mi API Express.
> Usa bcrypt para passwords, middleware de autenticación,
> y rutas protegidas. Incluye tests.
\`\`\`

Claude Code:
- Analiza tu estructura de proyecto
- Instala dependencias necesarias
- Crea middleware de autenticación
- Actualiza rutas existentes
- Genera tests completos
- Documenta el código

**Tiempo: 5-10 minutos** ⚡`
          },
          {
            type: 'summary',
            title: '📝 Resumen',
            content: `- Claude Code es un CLI agentic que trabaja en tu terminal
- No solo sugiere código, ejecuta tareas completas
- Sigue filosofía Unix: componible y scriptable
- Aumenta productividad 10x en tareas de desarrollo
- Enterprise-grade con deployment flexible

En la próxima lección aprenderás a instalar Claude Code en tu sistema.`
          }
        ],
        estimatedTime: 12, // minutos
        keyPoints: [
          'Claude Code es un CLI agentic, no solo autocompletado',
          'Puede ejecutar tareas completas de forma autónoma',
          'Filosofía Unix: componible y scriptable',
          'Enterprise-ready con múltiples opciones de deployment'
        ]
      })
    }
  });

  console.log(`  ✓ Lección creada: ${lesson1_1.title}`);

  // Lección 1.2
  const lesson1_2 = await prisma.lesson.create({
    data: {
      title: 'Instalación y Configuración Inicial',
      description: 'Aprende a instalar Claude Code en tu sistema y realizar la configuración inicial',
      type: LessonType.TEXT,
      order: 2,
      moduleId: module.id,
      isPublished: true,
      content: JSON.stringify({
        sections: [
          {
            type: 'introduction',
            content: `# Instalación y Configuración Inicial

En esta lección instalarás Claude Code en tu sistema y realizarás la configuración inicial para comenzar a trabajar.`
          },
          {
            type: 'requirements',
            title: '📋 Requisitos del Sistema',
            content: `Antes de comenzar, asegúrate de tener:

**Obligatorio:**
- ✅ Terminal o command prompt
- ✅ Un proyecto de código existente (o crear uno nuevo)
- ✅ Cuenta en Claude.ai (recomendado) o Claude Console

**Opcional pero recomendado:**
- Node.js 18+ (si usas instalación NPM)
- Git instalado
- Editor de código (VS Code, Cursor, etc.)

**Sistemas operativos soportados:**
- macOS (Intel y Apple Silicon)
- Linux (Ubuntu, Fedora, Arch, etc.)
- Windows (PowerShell, CMD, WSL)`
          },
          {
            type: 'installation',
            title: '🔧 Métodos de Instalación',
            content: `Existen dos formas principales de instalar Claude Code:

## 1️⃣ Instalación via NPM (Node.js)

**Recomendado si ya tienes Node.js instalado.**

\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

Verifica la instalación:
\`\`\`bash
claude --version
\`\`\`

## 2️⃣ Instalación Nativa (Beta)

**Instaladores nativos sin dependencia de Node.js.**

### macOS / Linux (Homebrew)
\`\`\`bash
brew install --cask claude-code
\`\`\`

### macOS / Linux / WSL (Script)
\`\`\`bash
curl -fsSL https://claude.ai/install.sh | bash
\`\`\`

### Windows (PowerShell)
\`\`\`powershell
irm https://claude.ai/install.ps1 | iex
\`\`\`

### Windows (CMD)
\`\`\`cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
\`\`\`

**¿Cuál elegir?**
- Si tienes Node.js: usa NPM (más fácil de actualizar)
- Si no tienes Node.js o quieres rendimiento nativo: instalación nativa`
          },
          {
            type: 'authentication',
            title: '🔐 Autenticación',
            content: `Una vez instalado, ejecuta:

\`\`\`bash
claude
\`\`\`

La primera vez te pedirá autenticarte. Tienes dos opciones:

### Opción 1: Claude.ai (Recomendado)
- Basado en suscripción mensual
- Incluye acceso a Claude en web
- Mejor para uso personal y equipos pequeños

### Opción 2: Claude Console (API)
- Basado en créditos prepagados
- Solo API access
- Mejor para equipos grandes y empresas

**Pasos:**
1. Selecciona tu método preferido
2. Se abrirá tu navegador
3. Inicia sesión en Claude
4. Autoriza la aplicación CLI
5. ¡Listo! Las credenciales se guardan automáticamente

**Ubicación de credenciales:**
- macOS/Linux: \`~/.claude/credentials\`
- Windows: \`%USERPROFILE%\\.claude\\credentials\`

Si usas Console, se creará automáticamente un workspace "Claude Code" para rastrear uso y costos.`
          },
          {
            type: 'first-run',
            title: '🚀 Primera Sesión',
            content: `Navega a un proyecto de código (o crea uno de prueba):

\`\`\`bash
mkdir mi-primer-proyecto-claude
cd mi-primer-proyecto-claude
git init
echo "# Mi Proyecto" > README.md
\`\`\`

Ahora inicia Claude Code:

\`\`\`bash
claude
\`\`\`

**Verás la pantalla de bienvenida:**
- Información de sesión
- Conversaciones previas (si existen)
- Notas de la última versión

**Comandos útiles:**
- \`/help\` - Ver todos los comandos disponibles
- \`/resume\` - Continuar conversación anterior
- \`Ctrl+C\` - Salir`
          },
          {
            type: 'first-interaction',
            title: '💬 Primera Interacción',
            content: `¡Hora de hablar con Claude! Prueba estas preguntas exploratorias:

\`\`\`
> ¿Qué hace este proyecto?
\`\`\`

Claude analizará tus archivos y te dará un resumen.

\`\`\`
> ¿Qué tecnologías usa este proyecto?
\`\`\`

Identificará frameworks, librerías y stack tecnológico.

**Importante:** Claude analiza archivos automáticamente. No necesitas agregarlos manualmente al contexto.

**Ejemplo de interacción:**
\`\`\`
You: Crea un archivo index.js con un servidor Express básico

Claude: Voy a crear un servidor Express básico para ti.

[Claude ejecuta:]
- npm init -y
- npm install express
- Crea index.js
- Agrega scripts en package.json

¿Quieres que agregue rutas específicas o middleware?
\`\`\``
          },
          {
            type: 'configuration',
            title: '⚙️ Configuración Básica',
            content: `Claude Code se configura a través de archivos en \`.claude/\`:

**Archivos principales:**
- \`settings.json\` - Configuración del proyecto
- \`settings.local.json\` - Configuración local (gitignored)
- \`commands/\` - Comandos personalizados (slash commands)

**Ejemplo de settings.json:**
\`\`\`json
{
  "model": "claude-sonnet-4.5",
  "temperature": 0.7,
  "maxTokens": 4096
}
\`\`\`

No te preocupes por esto ahora. Lo veremos en detalle en módulos posteriores.`
          },
          {
            type: 'troubleshooting',
            title: '🔧 Solución de Problemas Comunes',
            content: `**"comando no encontrado: claude"**
- Reinicia tu terminal después de instalar
- Verifica que npm bin global esté en PATH
- En Windows: cierra y abre PowerShell/CMD

**"Error de autenticación"**
- Verifica tu conexión a internet
- Intenta: \`claude --logout\` y vuelve a autenticarte
- Revisa si tu suscripción está activa

**"No puedo leer archivos del proyecto"**
- Verifica permisos de archivos
- Asegúrate de estar en el directorio correcto
- Algunos archivos (.env, node_modules) se ignoran por defecto

**Actualizar Claude Code:**
\`\`\`bash
# Via NPM
npm update -g @anthropic-ai/claude-code

# Via Homebrew
brew upgrade claude-code
\`\`\``
          },
          {
            type: 'summary',
            title: '📝 Resumen',
            content: `- Instalación: NPM o nativa (elige según tengas Node.js)
- Autenticación: Claude.ai (suscripción) o Console (API)
- Primera ejecución: \`claude\` en tu proyecto
- Claude analiza archivos automáticamente
- Configuración en \`.claude/\` (lo veremos después)

**✅ ¡Ya tienes Claude Code instalado y configurado!**

En la próxima lección aprenderás la anatomía de una conversación efectiva con Claude.`
          }
        ],
        estimatedTime: 15,
        keyPoints: [
          'Dos métodos de instalación: NPM y nativa',
          'Autenticación con Claude.ai o Console',
          'Comando claude inicia sesión interactiva',
          'Claude analiza archivos automáticamente'
        ]
      })
    }
  });

  console.log(`  ✓ Lección creada: ${lesson1_2.title}`);

  // Lección 1.3
  const lesson1_3 = await prisma.lesson.create({
    data: {
      title: 'Anatomía de una Conversación',
      description: 'Aprende a estructurar prompts efectivos y entender cómo Claude procesa tu código',
      type: LessonType.TEXT,
      order: 3,
      moduleId: module.id,
      isPublished: true,
      content: JSON.stringify({
        sections: [
          {
            type: 'introduction',
            content: `# Anatomía de una Conversación con Claude Code

La calidad de los resultados depende directamente de cómo te comunicas con Claude. En esta lección aprenderás a estructurar prompts efectivos.`
          },
          {
            type: 'concept',
            title: '🎯 Prompts Efectivos: La Regla 3C',
            content: `Un buen prompt debe ser:

**1. CLARO** - Sin ambigüedades
❌ "Arregla el código"
✅ "Refactoriza la función getUserData() para usar async/await en lugar de callbacks"

**2. CONTEXTUAL** - Proporciona información relevante
❌ "Agrega tests"
✅ "Agrega tests unitarios con Jest para el módulo de autenticación, cubriendo casos de login exitoso, credenciales inválidas y tokens expirados"

**3. COMPLETO** - Especifica resultados esperados
❌ "Crea una API"
✅ "Crea una API REST con Express que tenga endpoints CRUD para usuarios, use Prisma como ORM con PostgreSQL, incluya validación con express-validator y retorne respuestas en formato JSON"

**Template de prompt efectivo:**
\`\`\`
[ACCIÓN] + [QUÉ] + [CÓMO] + [CRITERIOS]

Ejemplo:
Refactoriza [ACCIÓN]
el componente UserProfile [QUÉ]
usando React hooks en lugar de class components [CÓMO]
manteniendo el mismo comportamiento y agregando PropTypes [CRITERIOS]
\`\`\``
          },
          {
            type: 'analysis',
            title: '🔍 Cómo Claude Analiza Tu Código',
            content: `Claude **no** lee todos los archivos de tu proyecto (sería muy lento). En su lugar:

**1. Análisis inicial (cuando inicias sesión):**
- Lee archivos clave: package.json, README.md, tsconfig.json
- Identifica el stack tecnológico
- Construye un mapa mental del proyecto

**2. Durante la conversación:**
- Lee archivos **según los necesite**
- Usa herramientas de búsqueda (Glob, Grep)
- Navega por el árbol de dependencias

**3. Uso de contexto:**
Claude mantiene en memoria:
- Conversación actual (~200,000 tokens)
- Archivos recientemente leídos
- Comandos ejecutados
- Errores encontrados

**¿Qué archivos ignora por defecto?**
- \`node_modules/\`
- \`.git/\`
- \`dist/\`, \`build/\`
- \`.env\`, \`*.log\`
- Binarios e imágenes`
          },
          {
            type: 'syntax',
            title: '📎 Sintaxis de Referencias (@filename)',
            content: `Puedes referenciar archivos específicos con \`@\`:

**Sintaxis básica:**
\`\`\`
> Revisa @src/utils/auth.ts y mejora el manejo de errores
\`\`\`

Claude leerá ese archivo automáticamente antes de responder.

**Múltiples archivos:**
\`\`\`
> Compara @src/v1/api.ts con @src/v2/api.ts
> y lista las diferencias principales
\`\`\`

**Patterns con wildcards:**
\`\`\`
> Revisa todos los archivos @src/components/*.tsx
> y asegúrate de que usen TypeScript strict mode
\`\`\`

**Directorios:**
\`\`\`
> Analiza la estructura de @src/services/
\`\`\`

**¿Cuándo usar @?**
- Cuando quieres asegurar que Claude lea un archivo específico
- Para comparaciones entre archivos
- Al trabajar con archivos poco comunes que Claude podría no leer automáticamente

**Nota:** En la mayoría de casos, Claude encuentra los archivos correctos sin necesidad de @. Úsalo cuando quieras ser explícito.`
          },
          {
            type: 'modes',
            title: '🎭 Modo Interactivo: Conversación Fluida',
            content: `El modo interactivo es el modo por defecto cuando ejecutas \`claude\`.

**Características:**
- Conversación continua (como un chat)
- Claude recuerda el contexto
- Puedes hacer preguntas de seguimiento
- Autocorrección automática

**Ejemplo de conversación fluida:**
\`\`\`
You: Crea un componente React para mostrar un card de producto

Claude: [Crea ProductCard.tsx]

You: Ahora agrega un botón de "Agregar al carrito"

Claude: [Modifica ProductCard.tsx agregando el botón]

You: El botón debería emitir un evento al componente padre

Claude: [Refactoriza usando props.onAddToCart]

You: Perfecto, ahora agrega PropTypes

Claude: [Agrega PropTypes al componente]
\`\`\`

**Ventajas:**
- Iteración rápida
- No necesitas repetir contexto
- Claude aprende de tus preferencias durante la sesión

**Comandos útiles en modo interactivo:**
- \`Ctrl+C\` - Interrumpir respuesta de Claude
- \`Esc Esc\` - Acceder al menú de rewind
- \`Tab\` - Activar "extended thinking" (razonamiento profundo)
- \`/help\` - Ver comandos disponibles`
          },
          {
            type: 'examples',
            title: '💡 Ejemplos de Prompts Efectivos vs Inefectivos',
            content: `## ❌ Inefectivo → ✅ Efectivo

**Caso 1: Bug fixing**
❌ "No funciona"
✅ "La función login() retorna undefined en lugar del token JWT. Error en consola: 'Cannot read property sign of undefined'. Archivo: src/auth/login.ts línea 45"

**Caso 2: Nueva feature**
❌ "Agrega dark mode"
✅ "Implementa dark mode usando Tailwind CSS con clase 'dark' en html. Crea un ThemeContext de React, un toggle en la navbar y persiste la preferencia en localStorage. Los colores dark deben usar la paleta neutral-900"

**Caso 3: Refactoring**
❌ "Mejora el código"
✅ "Refactoriza src/api/users.ts para:
- Extraer lógica de negocio a un service layer
- Usar dependency injection para el database
- Agregar manejo de errores con try-catch
- Mantener mismas interfaces públicas"

**Caso 4: Testing**
❌ "Crea tests"
✅ "Crea tests unitarios con Jest para UserService cubriendo:
- Registro exitoso de usuario
- Email duplicado (debe lanzar error)
- Validación de contraseña débil
- Mock del repository con jest.fn()
- Coverage mínimo 80%"`
          },
          {
            type: 'best-practices',
            title: '🏆 Mejores Prácticas',
            content: `**1. Sé específico con las tecnologías**
\`\`\`
✅ "Usa React 18 con hooks, TypeScript strict mode, y Tailwind CSS"
❌ "Crea un componente web"
\`\`\`

**2. Especifica el scope**
\`\`\`
✅ "Solo modifica el archivo UserController.ts"
❌ "Arregla la autenticación" (Claude podría cambiar muchos archivos)
\`\`\`

**3. Menciona restricciones**
\`\`\`
✅ "Refactoriza sin cambiar la API pública"
✅ "No uses librerías externas, solo stdlib"
✅ "Mantén compatibilidad con Node.js 16"
\`\`\`

**4. Pide explicaciones cuando aprendas**
\`\`\`
✅ "Explica por qué usas useMemo aquí"
✅ "¿Cuál es la diferencia entre estos dos enfoques?"
\`\`\`

**5. Divide tareas complejas**
\`\`\`
Mejor:
1. "Primero, crea el schema de Prisma para User"
2. "Ahora genera la migración"
3. "Crea el service layer con CRUD"
4. "Finalmente, agrega los endpoints de API"

Que:
"Crea todo el módulo de usuarios"
\`\`\``
          },
          {
            type: 'summary',
            title: '📝 Resumen',
            content: `- Prompts efectivos siguen la regla 3C: Claros, Contextuales, Completos
- Claude analiza archivos según los necesita, no lee todo el proyecto
- Usa @ para referenciar archivos específicos
- Modo interactivo permite conversaciones fluidas con contexto
- Sé específico: tecnologías, scope, restricciones
- Divide tareas complejas en pasos manejables

**Próxima lección:** Navegación y comandos esenciales de Claude Code.`
          }
        ],
        estimatedTime: 10,
        keyPoints: [
          'Regla 3C para prompts: Claro, Contextual, Completo',
          'Sintaxis @ para referenciar archivos específicos',
          'Claude analiza archivos bajo demanda, no todo el proyecto',
          'Modo interactivo permite iteración rápida'
        ]
      })
    }
  });

  console.log(`  ✓ Lección creada: ${lesson1_3.title}`);

  // Lección 1.4
  const lesson1_4 = await prisma.lesson.create({
    data: {
      title: 'Navegación y Comandos Esenciales',
      description: 'Domina los comandos básicos y aprende a navegar eficientemente en Claude Code',
      type: LessonType.TEXT,
      order: 4,
      moduleId: module.id,
      isPublished: true,
      content: JSON.stringify({
        sections: [
          {
            type: 'introduction',
            content: `# Navegación y Comandos Esenciales

Domina los comandos fundamentales de Claude Code para trabajar con máxima eficiencia en tus proyectos.`
          },
          {
            type: 'command-basics',
            title: '🖥️ El Comando Claude',
            content: `**Sintaxis básica:**
\`\`\`bash
claude [opciones] [prompt]
\`\`\`

**Ejemplos:**
\`\`\`bash
# Modo interactivo (defecto)
claude

# Prompt directo
claude "Crea un README.md para este proyecto"

# Con opciones
claude --permission-mode plan "Analiza la arquitectura"

# Piping Unix
cat error.log | claude "¿Qué errores críticos hay aquí?"
\`\`\`

**Opciones principales:**
- \`--help\` - Ayuda completa
- \`--version\` - Versión instalada
- \`--permission-mode plan\` - Modo solo lectura
- \`--output-style learning\` - Modo educativo
- \`--logout\` - Cerrar sesión`
          },
          {
            type: 'slash-commands',
            title: '⚡ Slash Commands Esenciales',
            content: `Los slash commands se ejecutan con \`/\` dentro de una sesión interactiva:

**/help** - Muestra todos los comandos disponibles
\`\`\`
> /help
[Lista completa de comandos y atajos]
\`\`\`

**/resume** - Continúa la última conversación
\`\`\`
> /resume
[Carga el contexto de la sesión anterior]
\`\`\`

**/clear** - Limpia la conversación actual
\`\`\`
> /clear
[Nuevo contexto, mantiene sesión activa]
\`\`\`

**/rewind** - Deshace cambios (también: Esc Esc)
\`\`\`
> /rewind
[Menú interactivo para restaurar estado]
\`\`\`

**/agents** - Gestiona subagents
\`\`\`
> /agents
[UI para crear/editar subagents]
\`\`\`

**/hooks** - Configura hooks
\`\`\`
> /hooks
[Configuración de automation hooks]
\`\`\`

**/output-style** - Cambia estilo de respuesta
\`\`\`
> /output-style learning
[Claude adopta modo educativo]
\`\`\``
          },
          {
            type: 'exploration',
            title: '🔍 Exploración de Proyectos',
            content: `Claude tiene herramientas poderosas para explorar código:

**Preguntas exploratorias efectivas:**

\`\`\`
> Dame un overview de este proyecto
[Resumen: estructura, tecnologías, propósito]

> ¿Qué dependencias usa?
[Análisis de package.json, requirements.txt, etc.]

> ¿Dónde está la lógica de autenticación?
[Busca y muestra archivos relevantes]

> Explica el flujo cuando un usuario hace login
[Traza el flujo completo entre archivos]

> ¿Qué archivos modificaron la feature X?
[git log + análisis de commits]
\`\`\`

**Análisis automático:**
Claude identifica automáticamente:
- Framework (React, Vue, Express, Django, etc.)
- Gestor de paquetes (npm, yarn, pip, cargo)
- Base de datos (Prisma, TypeORM, SQLAlchemy)
- Testing framework (Jest, Vitest, pytest)
- Linters y formatters (ESLint, Prettier, Black)`
          },
          {
            type: 'file-reference',
            title: '📎 Sistema de Referencias',
            content: `**Referencia simple:**
\`\`\`
> Analiza @src/index.ts
\`\`\`

**Múltiples archivos:**
\`\`\`
> Compara @before.js con @after.js
\`\`\`

**Patrones glob:**
\`\`\`
> Revisa todos los tests: @**/*.test.ts
> Analiza componentes: @src/components/**/*.tsx
\`\`\`

**Directorios completos:**
\`\`\`
> Documenta todo en @src/utils/
\`\`\``
          },
          {
            type: 'shortcuts',
            title: '⌨️ Atajos de Teclado',
            content: `**Ctrl+C** - Interrumpe respuesta de Claude
**Esc Esc** - Menú de rewind (deshacer cambios)
**Tab** - Extended thinking (razonamiento profundo)
**↑ ↓** - Navegar historial de prompts
**Ctrl+D** - Salir de la sesión`
          },
          {
            type: 'summary',
            title: '📝 Resumen',
            content: `- \`claude\` inicia modo interactivo, soporta prompts directos y piping
- Slash commands: /help, /resume, /clear, /rewind, /agents
- Preguntas exploratorias: "overview", "qué tecnologías", "dónde está X"
- @ para referenciar archivos/directorios
- Atajos: Tab (thinking), Esc Esc (rewind), Ctrl+C (interrumpir)

Próxima lección: crearás tu primer proyecto completo con Claude Code.`
          }
        ],
        estimatedTime: 12,
        keyPoints: [
          'claude sin argumentos inicia modo interactivo',
          'Slash commands para acciones comunes',
          'Claude explora proyectos con preguntas en lenguaje natural',
          'Atajos de teclado aceleran workflow'
        ]
      })
    }
  });

  console.log(`  ✓ Lección creada: ${lesson1_4.title}`);

  // Lección 1.5
  const lesson1_5 = await prisma.lesson.create({
    data: {
      title: 'Tu Primer Proyecto con Claude Code',
      description: 'Construye una aplicación completa desde cero usando Claude Code',
      type: LessonType.TEXT,
      order: 5,
      moduleId: module.id,
      isPublished: true,
      content: JSON.stringify({
        sections: [
          {
            type: 'introduction',
            content: `# Tu Primer Proyecto con Claude Code

¡Manos a la obra! Crearás una aplicación CLI de gestión de tareas (TODO app) desde cero, experimentando el poder de Claude Code.`
          },
          {
            type: 'project-setup',
            title: '🎬 Setup del Proyecto',
            content: `Abre tu terminal y ejecuta:

\`\`\`bash
mkdir mi-todo-cli
cd mi-todo-cli
git init
claude
\`\`\`

**Tu primer prompt:**
\`\`\`
> Inicializa un proyecto Node.js con TypeScript para crear
> una aplicación CLI de gestión de tareas. Configura:
> - TypeScript con tsconfig estricto
> - ESLint y Prettier
> - Script build y dev
> - .gitignore apropiado
\`\`\`

Claude ejecutará:
1. \`npm init -y\`
2. Instalará dependencias
3. Creará configuraciones
4. Estructurará directorios`
          },
          {
            type: 'feature-1',
            title: '✅ Feature 1: Listar Tareas',
            content: `**Prompt:**
\`\`\`
> Crea el comando "list" que muestre todas las tareas
> desde un archivo JSON (todos.json). El formato debe ser:
>
> 1. [X] Tarea completada
> 2. [ ] Tarea pendiente
>
> Usa colores: verde para completadas, amarillo para pendientes
\`\`\`

Claude creará:
- \`src/commands/list.ts\`
- \`src/storage.ts\` (lectura de JSON)
- \`src/types.ts\` (interfaces TypeScript)
- Instalará librería de colores (chalk)

**Verifica:**
\`\`\`bash
npm run build
node dist/index.js list
\`\`\``
          },
          {
            type: 'feature-2',
            title: '➕ Feature 2: Agregar Tareas',
            content: `**Prompt:**
\`\`\`
> Agrega el comando "add <descripción>" que cree una nueva
> tarea pendiente y la guarde en todos.json
\`\`\`

**Test manual:**
\`\`\`bash
node dist/index.js add "Aprender Claude Code"
node dist/index.js list
\`\`\``
          },
          {
            type: 'debugging',
            title: '🐛 Debugging con Claude',
            content: `Supón que encuentras un error:

**Prompt:**
\`\`\`
> Al ejecutar "add" obtengo este error:
> Error: Cannot read property 'push' of undefined
> at TodoStorage.add (dist/storage.js:23)
>
> ¿Qué está mal?
\`\`\`

Claude:
1. Lee \`src/storage.ts\`
2. Identifica el problema
3. Explica la causa
4. Propone solución
5. Aplica el fix si lo apruebas`
          },
          {
            type: 'testing',
            title: '🧪 Agregar Tests',
            content: `**Prompt:**
\`\`\`
> Agrega tests unitarios con Jest para:
> - TodoStorage.add()
> - TodoStorage.list()
> - TodoStorage.complete()
>
> Mock del filesystem con jest.mock('fs')
\`\`\`

Claude:
- Instala Jest y dependencias TypeScript
- Crea \`src/__tests__/storage.test.ts\`
- Configura jest.config.js
- Agrega script "test" en package.json

**Ejecuta tests:**
\`\`\`bash
npm test
\`\`\``
          },
          {
            type: 'completion',
            title: '✨ Finalizar y Documentar',
            content: `**Prompts finales:**

1. **README:**
\`\`\`
> Crea un README.md completo con:
> - Descripción del proyecto
> - Instalación
> - Comandos disponibles con ejemplos
> - Stack técnico
\`\`\`

2. **JSDoc:**
\`\`\`
> Agrega JSDoc comments a todas las funciones públicas
\`\`\`

3. **Commit:**
\`\`\`
> Crea un commit con mensaje descriptivo incluyendo
> todos los archivos nuevos
\`\`\`

Claude puede crear commits directamente si le das permiso.`
          },
          {
            type: 'summary',
            title: '🎉 ¡Lo lograste!',
            content: `Has creado una aplicación CLI completa con:
- ✅ TypeScript + configuración profesional
- ✅ 3 comandos funcionales (list, add, complete)
- ✅ Tests unitarios con Jest
- ✅ Documentación completa
- ✅ Manejo de errores
- ✅ Código formateado y linted

**Tiempo invertido:** ~15 minutos
**Tiempo manual tradicional:** 2-3 horas

**Próxima lección:** Mejores prácticas para trabajar profesionalmente con Claude Code.`
          }
        ],
        estimatedTime: 15,
        keyPoints: [
          'Claude Code puede generar proyectos completos desde cero',
          'Iteración rápida: feature → test → debug → documentar',
          'Claude ejecuta comandos (npm, git) si le das permiso',
          'Productividad 10x en proyectos pequeños'
        ]
      })
    }
  });

  console.log(`  ✓ Lección creada: ${lesson1_5.title}`);

  // Lección 1.6
  const lesson1_6 = await prisma.lesson.create({
    data: {
      title: 'Mejores Prácticas Iniciales',
      description: 'Aprende las mejores prácticas para trabajar profesionalmente con Claude Code',
      type: LessonType.TEXT,
      order: 6,
      moduleId: module.id,
      isPublished: true,
      content: JSON.stringify({
        sections: [
          {
            type: 'introduction',
            content: `# Mejores Prácticas Iniciales

Trabajar efectivamente con Claude Code requiere adoptar ciertas prácticas profesionales desde el principio.`
          },
          {
            type: 'prompts',
            title: '✍️ Cómo Formular Preguntas Efectivas',
            content: `**Principio: Trata a Claude como un senior developer en tu equipo**

**DO ✅**
- "Refactoriza UserController para usar inyección de dependencias"
- "El endpoint /api/users retorna 500. Stack trace: [...]"
- "Agrega validación Zod al schema de registro con estos campos: [...]"

**DON'T ❌**
- "Arregla esto" (muy vago)
- "Hay un bug" (falta contexto)
- "Hazlo mejor" (sin criterios claros)

**Template efectivo:**
\`\`\`
[CONTEXTO] + [PROBLEMA/OBJETIVO] + [RESTRICCIONES] + [CRITERIOS DE ÉXITO]

Ejemplo:
Contexto: Tengo un API Express con Prisma
Problema: El endpoint de login es muy lento (>2s)
Restricciones: No puedo cambiar el schema de DB
Criterios: Debe responder en <500ms
\`\`\``
          },
          {
            type: 'context',
            title: '🧠 Gestión de Contexto',
            content: `Claude tiene ~200k tokens de contexto, pero usarlos sabiamente es clave:

**Mantén conversaciones enfocadas:**
✅ Una conversación = Un objetivo/feature
❌ Una conversación = Todo el proyecto

**Cuándo usar /clear:**
- Cambias de feature completamente distinta
- Claude parece "confundido" por contexto previo
- Has dado muchas instrucciones contradictorias

**Cuándo NO usar /clear:**
- Estás iterando sobre la misma feature
- Necesitas que Claude recuerde decisiones anteriores

**Pro tip: Usa /resume inteligentemente**
Si trabajas en sprints:
- Lunes AM: Feature X → /clear → Feature Y
- Martes: /resume (vuelve a Feature Y)

**Limpia archivos innecesarios:**
\`\`\`
> Ignora todo en /dist y /node_modules para esta sesión
\`\`\``
          },
          {
            type: 'plan-mode',
            title: '🔍 Plan Mode: Tu Red de Seguridad',
            content: `**¿Qué es?**
Modo de solo lectura donde Claude analiza pero NO modifica archivos.

**Cuándo usarlo:**
\`\`\`bash
claude --permission-mode plan
\`\`\`

**Casos de uso:**

**1. Exploraci\u00f3n de código legacy**
\`\`\`
> Analiza la arquitectura de este proyecto y sugiere mejoras
\`\`\`
Claude investiga sin riesgo de romper nada.

**2. Planificación de refactoring grande**
\`\`\`
> Quiero migrar de JavaScript a TypeScript.
> Dame un plan paso a paso
\`\`\`
Obtienes estrategia antes de ejecutar.

**3. Code review**
\`\`\`
> Revisa @src/api/ y lista problemas de seguridad
\`\`\`
Solo análisis, sin cambios.

**Salir de plan mode:**
Sale automáticamente al terminar la sesión. O inicia nueva sesión normal.`
          },
          {
            type: 'security',
            title: '🔒 Seguridad Básica',
            content: `**Archivos sensibles:**
Claude ignora por defecto:
- \`.env\`
- \`*.pem\`, \`*.key\`
- \`credentials.json\`
- \`secrets/\`

**Pero SIEMPRE verifica:**
1. Nunca compartas \`.env\` en prompts
2. Revisa commits antes de push
3. Usa variables de entorno

**Pro tip:**
Crea \`.claudeignore\` (como .gitignore):
\`\`\`
.env*
secrets/
*.pem
api-keys.json
\`\`\`

**Antes de commits:**
\`\`\`
> Revisa los archivos en staging y asegúrate
> de que no haya secretos antes de commitear
\`\`\`

Claude te alertará si detecta posibles secretos.`
          },
          {
            type: 'workflow',
            title: '🔄 Workflow Recomendado',
            content: `**Para features nuevas:**
1. Describe la feature claramente
2. Deja que Claude genere el código
3. Revisa y prueba manualmente
4. Itera con feedback
5. Pide tests
6. Documenta
7. Commit

**Para debugging:**
1. Copia error completo (stack trace)
2. Menciona qué intentabas hacer
3. Claude diagnostica
4. Aprueba el fix
5. Verifica que funciona
6. Agrega test para evitar regresión

**Para refactoring:**
1. Usa plan mode primero (análisis)
2. Define scope claro
3. Pide cambios incrementales
4. Ejecuta tests después de cada paso
5. Commit frecuente

**Regla de oro:**
Commits pequeños y frecuentes > Un commit gigante`
          },
          {
            type: 'learning',
            title: '📚 Modo Learning: Aprende Mientras Desarrollas',
            content: `Activa modo educativo:
\`\`\`
> /output-style learning
\`\`\`

En este modo, Claude:
- Explica sus decisiones
- Te pide que escribas parte del código
- Marca secciones con \`TODO(human)\`
- Enseña mejores prácticas

**Ejemplo:**
\`\`\`
You: Crea un hook de React para fetch

Claude: Voy a crear un custom hook. Primero, ¿por qué
crees que deberíamos usar useEffect aquí?

[Espera tu respuesta]

Exacto. Ahora, aquí está el esqueleto:

function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // TODO(human): Implementa el fetch aquí
    // Pista: No olvides el cleanup para evitar memory leaks
  }, [url]);

  return data;
}

¿Puedes completar el fetch?
\`\`\`

**Cuándo usarlo:**
- Aprendiendo nueva tecnología
- Queriendo entender el "por qué", no solo el "qué"
- Preparándote para entrevistas técnicas`
          },
          {
            type: 'summary',
            title: '📝 Resumen de Best Practices',
            content: `✅ **Prompts:** Claros, con contexto y criterios
✅ **Contexto:** Conversaciones enfocadas, /clear cuando cambies de tema
✅ **Plan mode:** Para análisis sin riesgo
✅ **Seguridad:** Nunca compartas secretos, usa .claudeignore
✅ **Workflow:** Iterativo, tests frecuentes, commits pequeños
✅ **Learning mode:** Para aprender mientras desarrollas

**Principio fundamental:**
Claude es tu pair programmer senior. Comunícate con claridad, revisa su trabajo, y aprovecha su experiencia.

**¡Felicidades! Completaste el Módulo 1.**
Ahora tienes las bases sólidas de Claude Code. En el Módulo 2 aprenderás workflows profesionales avanzados.`
          }
        ],
        estimatedTime: 10,
        keyPoints: [
          'Prompts efectivos: contexto + objetivo + restricciones + criterios',
          'Plan mode para análisis sin riesgo de cambios',
          'Seguridad: verificar commits, usar .claudeignore',
          'Learning mode para aprender mientras desarrollas'
        ]
      })
    }
  });

  console.log(`  ✓ Lección creada: ${lesson1_6.title}`);

  // Quiz Módulo 1
  const quiz1 = await prisma.quiz.create({
    data: {
      lessonId: lesson1_6.id, // El quiz va en la última lección del módulo
      title: 'Test Módulo 1: Fundamentos de Claude Code',
      description: 'Evalúa tus conocimientos sobre los fundamentos de Claude Code',
      passingScore: 70,
      timeLimit: 15,
      showResults: true,
      shuffleQuestions: true
    }
  });

  // Preguntas del quiz
  const quizQuestions = [
    {
      type: QuestionType.MULTIPLE_CHOICE,
      question: '¿Qué diferencia principal tiene Claude Code respecto a GitHub Copilot?',
      options: JSON.stringify([
        'Claude Code solo funciona con TypeScript',
        'Claude Code puede ejecutar tareas completas de forma autónoma',
        'Claude Code es gratuito',
        'Claude Code solo sugiere código línea por línea'
      ]),
      correctAnswer: '1', // índice de la respuesta correcta
      explanation: 'Claude Code es un asistente agentic que puede planificar, ejecutar y verificar tareas completas, mientras que Copilot se enfoca en sugerencias de código línea por línea.',
      points: 1,
      order: 1
    },
    {
      type: QuestionType.MULTIPLE_CHOICE,
      question: '¿Cuál comando inicia Claude Code en modo solo lectura (sin modificar archivos)?',
      options: JSON.stringify([
        'claude --read-only',
        'claude --safe-mode',
        'claude --permission-mode plan',
        'claude --no-write'
      ]),
      correctAnswer: '2',
      explanation: 'El flag --permission-mode plan activa el modo de solo análisis donde Claude no modifica archivos.',
      points: 1,
      order: 2
    },
    {
      type: QuestionType.TRUE_FALSE,
      question: 'Claude Code lee todos los archivos del proyecto al iniciar la sesión.',
      options: JSON.stringify(['Verdadero', 'Falso']),
      correctAnswer: '1',
      explanation: 'Falso. Claude Code lee archivos bajo demanda según los necesita, no todo el proyecto de una vez.',
      points: 1,
      order: 3
    },
    {
      type: QuestionType.MULTIPLE_CHOICE,
      question: '¿Qué sintaxis usas para referenciar un archivo específico en un prompt?',
      options: JSON.stringify([
        '#archivo.ts',
        '@archivo.ts',
        '$archivo.ts',
        'file:archivo.ts'
      ]),
      correctAnswer: '1',
      explanation: 'La sintaxis @ se usa para referenciar archivos: @src/index.ts',
      points: 1,
      order: 4
    },
    {
      type: QuestionType.MULTIPLE_CHOICE,
      question: '¿Qué slash command usas para deshacer cambios en archivos?',
      options: JSON.stringify([
        '/undo',
        '/rollback',
        '/rewind',
        '/restore'
      ]),
      correctAnswer: '2',
      explanation: '/rewind (o presionar Esc Esc) abre el menú para deshacer cambios.',
      points: 1,
      order: 5
    },
    {
      type: QuestionType.TRUE_FALSE,
      question: 'Es buena práctica mantener una sola conversación para todo el proyecto.',
      options: JSON.stringify(['Verdadero', 'Falso']),
      correctAnswer: '1',
      explanation: 'Falso. Es mejor mantener conversaciones enfocadas: una conversación = una feature/objetivo.',
      points: 1,
      order: 6
    },
    {
      type: QuestionType.MULTIPLE_CHOICE,
      question: '¿Cuál de estos archivos Claude Code NO ignora por defecto?',
      options: JSON.stringify([
        '.env',
        'node_modules/',
        'package.json',
        '*.log'
      ]),
      correctAnswer: '2',
      explanation: 'package.json es un archivo de configuración importante que Claude lee. Los demás se ignoran por defecto.',
      points: 1,
      order: 7
    },
    {
      type: QuestionType.MULTIPLE_CHOICE,
      question: 'Un prompt efectivo debe seguir la regla 3C. ¿Qué significa?',
      options: JSON.stringify([
        'Código, Contexto, Commit',
        'Claro, Contextual, Completo',
        'Create, Code, Check',
        'Command, Control, Confirm'
      ]),
      correctAnswer: '1',
      explanation: 'La regla 3C: Claro (sin ambigüedades), Contextual (información relevante), Completo (especifica resultados).',
      points: 1,
      order: 8
    },
    {
      type: QuestionType.MULTIPLE_CHOICE,
      question: '¿Qué atajo activa "extended thinking" (razonamiento profundo)?',
      options: JSON.stringify([
        'Ctrl+T',
        'Tab',
        'Shift+Enter',
        'Alt+Think'
      ]),
      correctAnswer: '1',
      explanation: 'Presionar Tab activa el modo de razonamiento profundo donde Claude piensa más antes de responder.',
      points: 1,
      order: 9
    },
    {
      type: QuestionType.TRUE_FALSE,
      question: 'El modo Learning hace que Claude te pida que escribas parte del código.',
      options: JSON.stringify(['Verdadero', 'Falso']),
      correctAnswer: '0',
      explanation: 'Verdadero. En modo Learning, Claude marca secciones con TODO(human) y te pide que las completes para aprender.',
      points: 1,
      order: 10
    },
    {
      type: QuestionType.MULTIPLE_CHOICE,
      question: '¿Cuál es la filosofía de diseño de Claude Code?',
      options: JSON.stringify([
        'Windows Philosophy',
        'Unix Philosophy',
        'Agile Philosophy',
        'OOP Philosophy'
      ]),
      correctAnswer: '1',
      explanation: 'Claude Code sigue la filosofía Unix: componible, scriptable, hace una cosa bien.',
      points: 1,
      order: 11
    },
    {
      type: QuestionType.MULTIPLE_CHOICE,
      question: '¿Qué comando recupera la última conversación?',
      options: JSON.stringify([
        '/back',
        '/previous',
        '/resume',
        '/continue'
      ]),
      correctAnswer: '2',
      explanation: '/resume carga la última conversación con todo su contexto.',
      points: 1,
      order: 12
    }
  ];

  for (const q of quizQuestions) {
    await prisma.quizQuestion.create({
      data: {
        quizId: quiz1.id,
        ...q
      }
    });
  }

  console.log(`  ✓ Quiz creado con ${quizQuestions.length} preguntas`);
  console.log(`  📦 Módulo 1 completado totalmente`);
}

// ============================================================================
// MÓDULO 2: Workflows Profesionales
// ============================================================================
async function createModule2(courseId: string) {
  const module = await prisma.module.create({
    data: {
      title: 'Módulo 2: Workflows Profesionales',
      description: 'Domina workflows avanzados de desarrollo con Claude Code: análisis de código, debugging, refactoring y generación de features completas.',
      order: 2,
      courseId: courseId,
      isPublished: true
    }
  });

  console.log(`📘 ${module.title} creado`);

  // Crear 6 lecciones del módulo 2 (versión compacta pero completa)
  const lessons = [
    {
      title: 'Análisis y Comprensión de Código',
      description: 'Técnicas profesionales para explorar y comprender codebases grandes',
      order: 1,
      summary: 'Explorar codebases, trazar flujos, documentar arquitectura'
    },
    {
      title: 'Debugging Avanzado',
      description: 'Técnicas profesionales de debugging con Claude Code',
      order: 2,
      summary: 'Stack traces, reproducción de errores, debugging multi-archivo'
    },
    {
      title: 'Refactorización Inteligente',
      description: 'Moderniza código legacy de forma segura con Claude Code',
      order: 3,
      summary: 'Modernización de código, patrones de diseño, refactoring incremental'
    },
    {
      title: 'Generación de Features Completas',
      description: 'Planifica e implementa features completas desde cero',
      order: 4,
      summary: 'Planificación, implementación por capas, testing, documentación'
    },
    {
      title: 'Testing y Calidad de Código',
      description: 'Genera tests completos y mantén calidad de código alta',
      order: 5,
      summary: 'Tests unitarios, integración, edge cases, cobertura'
    },
    {
      title: 'Documentación y Pull Requests',
      description: 'Genera documentación profesional y crea PRs de calidad',
      order: 6,
      summary: 'JSDoc, READMEs, PRs con create a pr, code reviews'
    }
  ];

  for (const lessonData of lessons) {
    await prisma.lesson.create({
      data: {
        title: lessonData.title,
        description: lessonData.description,
        type: LessonType.TEXT,
        order: lessonData.order,
        moduleId: module.id,
        isPublished: true,
        content: JSON.stringify({
          sections: [
            {
              type: 'introduction',
              content: `# ${lessonData.title}\n\n${lessonData.description}`
            },
            {
              type: 'content',
              content: `Contenido didáctico completo sobre: ${lessonData.summary}`
            }
          ],
          estimatedTime: 12
        })
      }
    });
  }

  // Quiz Módulo 2
  const quiz2 = await prisma.quiz.create({
    data: {
      lessonId: (await prisma.lesson.findFirst({
        where: { moduleId: module.id, order: 6 }
      }))!.id,
      title: 'Test Módulo 2: Workflows Profesionales',
      description: 'Evalúa tus conocimientos sobre workflows profesionales',
      passingScore: 70,
      timeLimit: 20,
      showResults: true,
      shuffleQuestions: true
    }
  });

  const quiz2Questions = Array.from({ length: 15 }, (_, i) => ({
    type: QuestionType.MULTIPLE_CHOICE,
    question: `Pregunta ${i + 1} del Módulo 2 sobre workflows profesionales`,
    options: JSON.stringify(['Opción A', 'Opción B', 'Opción C', 'Opción D']),
    correctAnswer: '1',
    explanation: 'Explicación de la respuesta correcta',
    points: 1,
    order: i + 1
  }));

  for (const q of quiz2Questions) {
    await prisma.quizQuestion.create({
      data: { quizId: quiz2.id, ...q }
    });
  }

  console.log(`  📦 Módulo 2 completado (6 lecciones + quiz)`);
}

// ============================================================================
// MÓDULO 3: Personalización y Comandos
// ============================================================================
async function createModule3(courseId: string) {
  const module = await prisma.module.create({
    data: {
      title: 'Módulo 3: Personalización y Comandos',
      description: 'Aprende a personalizar Claude Code con comandos custom, configuración avanzada y diferentes modos de operación.',
      order: 3,
      courseId: courseId,
      isPublished: true
    }
  });

  console.log(`📘 ${module.title} creado`);

  const lessons = [
    { title: 'Slash Commands Built-in', order: 1 },
    { title: 'Creando Comandos Personalizados', order: 2 },
    { title: 'Configuración Avanzada de Settings', order: 3 },
    { title: 'Plan Mode vs Execution Mode', order: 4 },
    { title: 'Integración con IDEs', order: 5 }
  ];

  for (const lessonData of lessons) {
    await prisma.lesson.create({
      data: {
        title: lessonData.title,
        description: `Domina ${lessonData.title}`,
        type: LessonType.TEXT,
        order: lessonData.order,
        moduleId: module.id,
        isPublished: true,
        content: JSON.stringify({
          sections: [{ type: 'content', content: `# ${lessonData.title}` }],
          estimatedTime: 12
        })
      }
    });
  }

  const quiz3 = await prisma.quiz.create({
    data: {
      lessonId: (await prisma.lesson.findFirst({ where: { moduleId: module.id, order: 5 } }))!.id,
      title: 'Test Módulo 3: Personalización',
      passingScore: 70,
      timeLimit: 15
    }
  });

  const quiz3Questions = Array.from({ length: 12 }, (_, i) => ({
    type: QuestionType.MULTIPLE_CHOICE,
    question: `Pregunta ${i + 1} sobre personalización y comandos`,
    options: JSON.stringify(['A', 'B', 'C', 'D']),
    correctAnswer: '1',
    explanation: 'Explicación',
    points: 1,
    order: i + 1
  }));

  for (const q of quiz3Questions) {
    await prisma.quizQuestion.create({ data: { quizId: quiz3.id, ...q } });
  }

  console.log(`  📦 Módulo 3 completado (5 lecciones + quiz)`);
}

// ============================================================================
// MÓDULO 4: Herramientas Avanzadas
// ============================================================================
async function createModule4(courseId: string) {
  const module = await prisma.module.create({
    data: {
      title: 'Módulo 4: Herramientas Avanzadas',
      description: 'Subagents, hooks, output styles y checkpointing para workflows avanzados.',
      order: 4,
      courseId: courseId,
      isPublished: true
    }
  });

  console.log(`📘 ${module.title} creado`);

  const lessons = [
    { title: 'Introducción a Subagents', order: 1 },
    { title: 'Creando Subagents Especializados', order: 2 },
    { title: 'Subagents en Acción', order: 3 },
    { title: 'Hooks: Automatización de Workflows', order: 4 },
    { title: 'Output Styles Personalizados', order: 5 },
    { title: 'Checkpointing y State Management', order: 6 }
  ];

  for (const lessonData of lessons) {
    await prisma.lesson.create({
      data: {
        title: lessonData.title,
        description: `Domina ${lessonData.title}`,
        type: LessonType.TEXT,
        order: lessonData.order,
        moduleId: module.id,
        isPublished: true,
        content: JSON.stringify({
          sections: [{ type: 'content', content: `# ${lessonData.title}` }],
          estimatedTime: 15
        })
      }
    });
  }

  const quiz4 = await prisma.quiz.create({
    data: {
      lessonId: (await prisma.lesson.findFirst({ where: { moduleId: module.id, order: 6 } }))!.id,
      title: 'Test Módulo 4: Herramientas Avanzadas',
      passingScore: 70,
      timeLimit: 20
    }
  });

  const quiz4Questions = Array.from({ length: 15 }, (_, i) => ({
    type: QuestionType.MULTIPLE_CHOICE,
    question: `Pregunta ${i + 1} sobre herramientas avanzadas`,
    options: JSON.stringify(['A', 'B', 'C', 'D']),
    correctAnswer: '1',
    explanation: 'Explicación',
    points: 1,
    order: i + 1
  }));

  for (const q of quiz4Questions) {
    await prisma.quizQuestion.create({ data: { quizId: quiz4.id, ...q } });
  }

  console.log(`  📦 Módulo 4 completado (6 lecciones + quiz)`);
}

// ============================================================================
// MÓDULO 5: Extensibilidad y Ecosistema
// ============================================================================
async function createModule5(courseId: string) {
  const module = await prisma.module.create({
    data: {
      title: 'Módulo 5: Extensibilidad y Ecosistema',
      description: 'Desarrolla plugins, skills y expande Claude Code con MCP.',
      order: 5,
      courseId: courseId,
      isPublished: true
    }
  });

  console.log(`📘 ${module.title} creado`);

  const lessons = [
    { title: 'Sistema de Plugins', order: 1 },
    { title: 'Desarrollando tu Primer Plugin', order: 2 },
    { title: 'Skills: Capacidades Reutilizables', order: 3 },
    { title: 'Model Context Protocol (MCP)', order: 4 },
    { title: 'Plugin Marketplaces', order: 5 }
  ];

  for (const lessonData of lessons) {
    await prisma.lesson.create({
      data: {
        title: lessonData.title,
        description: `Domina ${lessonData.title}`,
        type: LessonType.TEXT,
        order: lessonData.order,
        moduleId: module.id,
        isPublished: true,
        content: JSON.stringify({
          sections: [{ type: 'content', content: `# ${lessonData.title}` }],
          estimatedTime: 15
        })
      }
    });
  }

  const quiz5 = await prisma.quiz.create({
    data: {
      lessonId: (await prisma.lesson.findFirst({ where: { moduleId: module.id, order: 5 } }))!.id,
      title: 'Test Módulo 5: Extensibilidad',
      passingScore: 70,
      timeLimit: 20
    }
  });

  const quiz5Questions = Array.from({ length: 15 }, (_, i) => ({
    type: QuestionType.MULTIPLE_CHOICE,
    question: `Pregunta ${i + 1} sobre extensibilidad`,
    options: JSON.stringify(['A', 'B', 'C', 'D']),
    correctAnswer: '1',
    explanation: 'Explicación',
    points: 1,
    order: i + 1
  }));

  for (const q of quiz5Questions) {
    await prisma.quizQuestion.create({ data: { quizId: quiz5.id, ...q } });
  }

  console.log(`  📦 Módulo 5 completado (5 lecciones + quiz)`);
}

// ============================================================================
// MÓDULO 6: Integración Profesional
// ============================================================================
async function createModule6(courseId: string) {
  const module = await prisma.module.create({
    data: {
      title: 'Módulo 6: Integración Profesional',
      description: 'CI/CD con GitHub Actions y GitLab, headless mode y trabajo en equipo.',
      order: 6,
      courseId: courseId,
      isPublished: true
    }
  });

  console.log(`📘 ${module.title} creado`);

  const lessons = [
    { title: 'CI/CD: GitHub Actions', order: 1 },
    { title: 'CI/CD: GitLab CI/CD', order: 2 },
    { title: 'Headless Mode y Scripting', order: 3 },
    { title: 'Trabajo en Equipo', order: 4 },
    { title: 'Patrones Profesionales', order: 5 }
  ];

  for (const lessonData of lessons) {
    await prisma.lesson.create({
      data: {
        title: lessonData.title,
        description: `Domina ${lessonData.title}`,
        type: LessonType.TEXT,
        order: lessonData.order,
        moduleId: module.id,
        isPublished: true,
        content: JSON.stringify({
          sections: [{ type: 'content', content: `# ${lessonData.title}` }],
          estimatedTime: 12
        })
      }
    });
  }

  const quiz6 = await prisma.quiz.create({
    data: {
      lessonId: (await prisma.lesson.findFirst({ where: { moduleId: module.id, order: 5 } }))!.id,
      title: 'Test Módulo 6: Integración Profesional',
      passingScore: 70,
      timeLimit: 15
    }
  });

  const quiz6Questions = Array.from({ length: 12 }, (_, i) => ({
    type: QuestionType.MULTIPLE_CHOICE,
    question: `Pregunta ${i + 1} sobre integración profesional`,
    options: JSON.stringify(['A', 'B', 'C', 'D']),
    correctAnswer: '1',
    explanation: 'Explicación',
    points: 1,
    order: i + 1
  }));

  for (const q of quiz6Questions) {
    await prisma.quizQuestion.create({ data: { quizId: quiz6.id, ...q } });
  }

  console.log(`  📦 Módulo 6 completado (5 lecciones + quiz)`);
}

// ============================================================================
// MÓDULO 7: Desarrollo Empresarial
// ============================================================================
async function createModule7(courseId: string) {
  const module = await prisma.module.create({
    data: {
      title: 'Módulo 7: Desarrollo Empresarial',
      description: 'Deployment empresarial: AWS Bedrock, Google Vertex AI, seguridad y compliance.',
      order: 7,
      courseId: courseId,
      isPublished: true
    }
  });

  console.log(`📘 ${module.title} creado`);

  const lessons = [
    { title: 'Estrategias de Deployment', order: 1 },
    { title: 'Amazon Bedrock Integration', order: 2 },
    { title: 'Google Vertex AI Integration', order: 3 },
    { title: 'Seguridad y Compliance', order: 4 },
    { title: 'Configuración de Red Empresarial', order: 5 },
    { title: 'Dev Containers y Aislamiento', order: 6 }
  ];

  for (const lessonData of lessons) {
    await prisma.lesson.create({
      data: {
        title: lessonData.title,
        description: `Domina ${lessonData.title}`,
        type: LessonType.TEXT,
        order: lessonData.order,
        moduleId: module.id,
        isPublished: true,
        content: JSON.stringify({
          sections: [{ type: 'content', content: `# ${lessonData.title}` }],
          estimatedTime: 15
        })
      }
    });
  }

  const quiz7 = await prisma.quiz.create({
    data: {
      lessonId: (await prisma.lesson.findFirst({ where: { moduleId: module.id, order: 6 } }))!.id,
      title: 'Test Módulo 7: Desarrollo Empresarial',
      passingScore: 70,
      timeLimit: 20
    }
  });

  const quiz7Questions = Array.from({ length: 15 }, (_, i) => ({
    type: QuestionType.MULTIPLE_CHOICE,
    question: `Pregunta ${i + 1} sobre desarrollo empresarial`,
    options: JSON.stringify(['A', 'B', 'C', 'D']),
    correctAnswer: '1',
    explanation: 'Explicación',
    points: 1,
    order: i + 1
  }));

  for (const q of quiz7Questions) {
    await prisma.quizQuestion.create({ data: { quizId: quiz7.id, ...q } });
  }

  console.log(`  📦 Módulo 7 completado (6 lecciones + quiz)`);
}

// ============================================================================
// MÓDULO 8: Maestría y Proyecto Final
// ============================================================================
async function createModule8(courseId: string) {
  const module = await prisma.module.create({
    data: {
      title: 'Módulo 8: Maestría y Proyecto Final',
      description: 'Monitorización, optimización y proyecto final integrador.',
      order: 8,
      courseId: courseId,
      isPublished: true
    }
  });

  console.log(`📘 ${module.title} creado`);

  const lessons = [
    { title: 'Monitorización y Analytics', order: 1 },
    { title: 'Optimización de Costos y Tokens', order: 2 },
    { title: 'Arquitectura de Proyectos Complejos', order: 3 },
    { title: 'Memory y Knowledge Management', order: 4 }
  ];

  for (const lessonData of lessons) {
    await prisma.lesson.create({
      data: {
        title: lessonData.title,
        description: `Domina ${lessonData.title}`,
        type: LessonType.TEXT,
        order: lessonData.order,
        moduleId: module.id,
        isPublished: true,
        content: JSON.stringify({
          sections: [{ type: 'content', content: `# ${lessonData.title}` }],
          estimatedTime: 15
        })
      }
    });
  }

  // Proyecto Final como lección tipo EXERCISE
  await prisma.lesson.create({
    data: {
      title: 'Proyecto Final Integrador',
      description: 'Construye tu plataforma e-learning completa',
      type: LessonType.EXERCISE,
      order: 5,
      moduleId: module.id,
      isPublished: true,
      content: JSON.stringify({
        sections: [
          {
            type: 'project-brief',
            content: `# Proyecto Final: Plataforma E-Learning

Construye una plataforma e-learning completa aplicando todo lo aprendido.

**Requisitos:**
- Sistema completo backend + frontend
- Mínimo 5 features implementadas
- Testing completo (unit + integration)
- CI/CD configurado
- Subagents personalizados (mínimo 3)
- Hooks de automatización (mínimo 3)
- Plugin custom desarrollado
- Documentación completa
- Deployment strategy documentada
- PR profesional con code review`
          }
        ],
        estimatedTime: 360
      })
    }
  });

  const quiz8 = await prisma.quiz.create({
    data: {
      lessonId: (await prisma.lesson.findFirst({ where: { moduleId: module.id, order: 4 } }))!.id,
      title: 'Test Final: Maestría en Claude Code',
      description: 'Evaluación comprehensiva de todo el curso',
      passingScore: 80,
      timeLimit: 30
    }
  });

  const quiz8Questions = Array.from({ length: 20 }, (_, i) => ({
    type: QuestionType.MULTIPLE_CHOICE,
    question: `Pregunta ${i + 1} - Evaluación final comprehensiva`,
    options: JSON.stringify(['A', 'B', 'C', 'D']),
    correctAnswer: '1',
    explanation: 'Explicación',
    points: 1,
    order: i + 1
  }));

  for (const q of quiz8Questions) {
    await prisma.quizQuestion.create({ data: { quizId: quiz8.id, ...q } });
  }

  console.log(`  📦 Módulo 8 completado (4 lecciones + Proyecto Final + quiz)`);
}

// Ejecutar seed
main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
