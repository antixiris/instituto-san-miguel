<p><strong><em>Lección 4: Memory y Knowledge Management con Claude Code</em></strong></p>

## Introducción

¡Bienvenido a la penúltima lección del curso! Estás a un paso de completar tu formación como especialista en Claude Code. Hoy vamos a aprender algo que lleva tu uso de Claude Code al siguiente nivel: **hacer que Claude Code "recuerde" cosas**.

Imagina trabajar en un proyecto grande durante meses. Cada vez que abres Claude Code, tienes que explicarle desde cero: "Este proyecto usa Express, la base de datos es PostgreSQL, las rutas están organizadas así...". Es tedioso y desperdicias tiempo (y tokens) repitiendo lo mismo.

¿Y si Claude Code pudiera "recordar" tu proyecto? ¿Y si ya supiera tu stack tecnológico, tus convenciones de código, tus reglas de negocio? Eso es exactamente lo que vamos a aprender hoy: **configurar memoria y knowledge bases para que Claude Code tenga contexto persistente de tu proyecto**.

Es como la diferencia entre hablar con un extraño cada vez versus hablar con un colega que ya conoce el proyecto. Mucho más eficiente, respuestas más precisas, menos repetición. ¡Vamos a descubrirlo!

## ¿Qué es Memory en IA? (Explicación Simple)

Imagina dos escenarios de trabajo:

**Escenario A: Sin memoria (como es ahora)**
- Tú: "Claude, ayúdame con esta función de login"
- Claude: "Claro, ¿qué tecnologías usas?"
- Tú: "Express con PostgreSQL y JWT"
- Claude: "OK, aquí está el código..."

Al día siguiente:
- Tú: "Claude, ayúdame con registro de usuarios"
- Claude: "Claro, ¿qué tecnologías usas?"
- Tú: "Express con PostgreSQL y JWT" (repitiendo lo mismo)
- Claude: "OK, aquí está el código..."

¿Ves el problema? Estás repitiendo contexto constantemente.

**Escenario B: Con memoria (lo que vamos a lograr)**
- Tú: "Claude, ayúdame con esta función de login"
- Claude lee memoria: "Veo que usas Express, PostgreSQL y JWT. Tu estructura es MVC. Aquí está el código siguiendo tus convenciones..."

Al día siguiente:
- Tú: "Claude, ayúdame con registro de usuarios"
- Claude lee memoria: "Usando tu stack (Express, PostgreSQL, JWT) y tu arquitectura MVC..."

¡Mucho mejor! Claude ya sabe el contexto.

### Tipos de Memoria/Contexto

1. **Project Context**: Información sobre el proyecto
   - Stack tecnológico
   - Arquitectura
   - Convenciones de código
   - Reglas de negocio

2. **Session Context**: Conversación actual
   - Lo que acabas de preguntarle
   - Código que acabas de mostrarle

3. **Knowledge Base**: Documentación externa
   - READMEs
   - Documentación de APIs
   - Especificaciones
   - Ejemplos de código

## Cómo Claude Code te Ayuda con Memory Management

### Tu Primera Conversación con Claude Code sobre Memoria

**Tú escribes en Claude Code**:
```
Hola Claude, trabajo en un proyecto grande y me gustaría que "recordaras"
información importante para no tener que explicarte el contexto cada vez.
¿Cómo puedo configurar esto?
```

**Claude Code responde**:
```
¡Excelente idea! Hay varias formas de darme "memoria" persistente.
Te voy a explicar las opciones desde la más simple a la más avanzada.

OPCIÓN 1: Archivos .md de Contexto (MÁS SIMPLE)
================================================

Crear archivos Markdown con información del proyecto que puedo leer.

Ventajas:
✅ Muy fácil de implementar
✅ Versionado con Git
✅ Editable por humanos

Cómo funciona:
1. Creas archivo PROJECT_CONTEXT.md
2. Cuando me preguntas algo, me dices: "Lee PROJECT_CONTEXT.md primero"
3. Leo el archivo y ya tengo contexto

OPCIÓN 2: .claudecode/context/ (RECOMENDADO)
=============================================

Usar la carpeta especial .claudecode/ para contexto automático.

Ventajas:
✅ Claude Code lo lee automáticamente
✅ Organizado en archivos temáticos
✅ Fácil de mantener

Estructura:
```
.claudecode/
├── context/
│   ├── tech-stack.md
│   ├── architecture.md
│   ├── conventions.md
│   └── business-rules.md
└── knowledge/
    ├── api-docs.md
    └── examples.md
```

OPCIÓN 3: RAG (Retrieval Augmented Generation) - AVANZADO
==========================================================

Crear una base de conocimiento con embeddings para búsqueda semántica.

Ventajas:
✅ Búsqueda inteligente
✅ Escalable para proyectos GRANDES
✅ Respuestas muy precisas

Cómo funciona:
1. Conviertes documentación en embeddings (vectores)
2. Cuando preguntas algo, se buscan documentos relevantes
3. Se envían esos documentos como contexto

OPCIÓN 4: Usar system prompts personalizados
=============================================

Configurar un prompt del sistema con tu contexto.

Ventajas:
✅ Contexto siempre presente
✅ No necesitas repetir

Ejemplo:
```
Eres un asistente especializado en el proyecto "TaskMaster".

Contexto del proyecto:
- Stack: Node.js + Express + PostgreSQL
- Arquitectura: MVC con servicios
- Autenticación: JWT
- Convención: camelCase para variables, PascalCase para clases

Siempre sigue estas convenciones al generar código.
```

MI RECOMENDACIÓN PARA EMPEZAR:
===============================

1. Usa archivos .md para contexto (OPCIÓN 1 o 2)
2. Si tu proyecto crece mucho, implementa RAG (OPCIÓN 3)

¿Por cuál quieres empezar? Te guío paso a paso.
```

## Paso 1: Crear Archivos de Contexto

Vamos a empezar con lo más simple: archivos Markdown.

### Pidiendo Ayuda a Claude Code

**Tú**:
```
Claude, ayúdame a crear archivos de contexto para mi proyecto.
Es una API de gestión de tareas con Node.js, Express, PostgreSQL.
```

**Claude Code**:
```
¡Perfecto! Te voy a crear una estructura completa de archivos de contexto.

PASO 1: Crear la carpeta
=========================

```bash
mkdir -p .claudecode/context
```

PASO 2: Archivo de Tech Stack
==============================

Crea: .claudecode/context/tech-stack.md

```markdown
# Tech Stack del Proyecto

## Backend
- **Runtime:** Node.js 18+
- **Framework:** Express 4.18
- **Base de Datos:** PostgreSQL 15
- **ORM:** Prisma / Sequelize / pg (elige uno)

## Autenticación
- **Estrategia:** JWT (JSON Web Tokens)
- **Librería:** jsonwebtoken
- **Almacenamiento:** Tokens en headers (Authorization: Bearer)

## Validación
- **Librería:** Joi
- **Dónde:** Middleware antes de controllers

## Logging
- **Librería:** Winston
- **Niveles:** error, warn, info, http, debug

## Testing
- **Framework:** Jest
- **Tipos:** Unit, Integration, E2E

## Dependencias Principales
```json
{
  "express": "^4.18.2",
  "pg": "^8.11.0",
  "jsonwebtoken": "^9.0.0",
  "bcrypt": "^5.1.0",
  "joi": "^17.9.1",
  "winston": "^3.8.2",
  "dotenv": "^16.0.3"
}
```

## Variables de Entorno Necesarias
- DATABASE_URL
- JWT_SECRET
- PORT
- NODE_ENV
```

PASO 3: Archivo de Arquitectura
================================

Crea: .claudecode/context/architecture.md

```markdown
# Arquitectura del Proyecto

## Patrón: MVC + Servicios

## Estructura de Carpetas
```
src/
├── config/         # Configuraciones
├── models/         # Modelos de datos
├── repositories/   # Acceso a datos
├── services/       # Lógica de negocio
├── controllers/    # Manejadores HTTP
├── routes/         # Definición de endpoints
├── middleware/     # Middlewares
└── utils/          # Utilidades
```

## Flujo de Datos
Request → Route → Middleware → Controller → Service → Repository → DB

## Capas y Responsabilidades

### Controllers
- Reciben requests HTTP
- Extraen datos de req.body, req.params, req.query
- Llaman a services
- Devuelven respuestas JSON
- NO contienen lógica de negocio

### Services
- Contienen lógica de negocio
- Validaciones complejas
- Coordinan múltiples repositorios
- NO manejan HTTP

### Repositories
- Acceso a base de datos
- CRUD operations
- Queries específicas
- NO lógica de negocio

### Models
- Definen estructura de datos
- Validaciones básicas
- Relaciones entre entidades
```

PASO 4: Archivo de Convenciones
================================

Crea: .claudecode/context/conventions.md

```markdown
# Convenciones de Código

## Naming

### Variables y Funciones
- **Estilo:** camelCase
- **Ejemplos:** `getUserById`, `totalCount`, `isAuthenticated`

### Clases y Constructores
- **Estilo:** PascalCase
- **Ejemplos:** `UserService`, `TaskController`, `DatabaseConnection`

### Constantes
- **Estilo:** UPPER_SNAKE_CASE
- **Ejemplos:** `MAX_RETRIES`, `DEFAULT_TIMEOUT`, `API_VERSION`

### Archivos
- **Controllers:** `userController.js`
- **Services:** `userService.js`
- **Routes:** `user.routes.js`
- **Models:** `User.js` (PascalCase)

## Estructura de Archivos

### Controllers
```javascript
class UserController {
  async create(req, res, next) {
    try {
      // Lógica
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) { }
  async findOne(req, res, next) { }
  async update(req, res, next) { }
  async delete(req, res, next) { }
}

module.exports = new UserController();
```

### Services
```javascript
class UserService {
  async createUser(userData) {
    // Lógica de negocio
  }

  async findUserById(id) { }
  async updateUser(id, data) { }
  async deleteUser(id) { }
}

module.exports = new UserService();
```

## Manejo de Errores

### En Services
```javascript
if (!user) {
  throw new Error('Usuario no encontrado');
}
```

### En Controllers
```javascript
try {
  // ...
} catch (error) {
  next(error); // Pasar al middleware de error
}
```

## Respuestas HTTP

### Éxito
```javascript
res.status(200).json({
  success: true,
  data: result
});
```

### Error
```javascript
res.status(400).json({
  success: false,
  message: 'Mensaje de error',
  errors: ['detalle1', 'detalle2']
});
```

## Commits
- **Formato:** Conventional Commits
- **Ejemplos:**
  - `feat(auth): agregar login con Google`
  - `fix(users): corregir validación de email`
  - `docs(readme): actualizar instrucciones de setup`
```

PASO 5: Archivo de Reglas de Negocio
=====================================

Crea: .claudecode/context/business-rules.md

```markdown
# Reglas de Negocio

## Usuarios

### Registro
- Email debe ser único
- Password mínimo 8 caracteres
- Debe incluir: mayúscula, minúscula, número, símbolo
- Email de confirmación enviado automáticamente

### Login
- Máximo 5 intentos fallidos
- Después de 5 intentos: bloqueo temporal de 15 minutos
- Token JWT expira en 7 días
- Refresh token expira en 30 días

## Tareas

### Creación
- Usuario debe estar autenticado
- Título obligatorio (max 100 caracteres)
- Descripción opcional (max 1000 caracteres)
- Fecha de vencimiento opcional
- Categoría opcional

### Estados Posibles
- pending (default)
- in_progress
- completed
- cancelled

### Permisos
- Solo el creador puede editar/eliminar
- Admin puede ver todas las tareas
- Usuario regular solo ve sus propias tareas

## Categorías

### Creación
- Nombre único por usuario
- Color opcional (hex code)
- Máximo 20 categorías por usuario

## Límites
- Máximo 1000 tareas por usuario
- Máximo 100 peticiones por minuto por IP
- Upload de archivos: máximo 5MB
```

CÓMO USAR ESTOS ARCHIVOS:
==========================

Cuando me preguntes algo, di:

"Claude, lee los archivos de .claudecode/context/ y luego ayúdame a..."

Yo leeré todos los archivos y ya tendré el contexto completo de tu proyecto.

VENTAJA ENORME:
===============

Antes:
Tú: "Crea un controller para usuarios"
Yo: "¿Qué convenciones usas? ¿Qué arquitectura? ¿Qué framework?"

Después:
Tú: "Lee .claudecode/context/ y crea un controller para usuarios"
Yo: [LEE CONTEXTO] "Aquí está el controller siguiendo tu arquitectura MVC,
    usando tus convenciones de naming, y tu formato de respuestas..."

¿Ves la diferencia?
```

**¿Qué acabamos de lograr?**

Claude Code te ayudó a crear una "base de conocimiento" de tu proyecto. Ahora tiene acceso a:
- Tu stack tecnológico
- Tu arquitectura
- Tus convenciones
- Tus reglas de negocio

## Paso 2: Usar el Contexto en Conversaciones

Ahora vamos a ver cómo usar estos archivos en la práctica.

**Tú**:
```
Lee .claudecode/context/ y ayúdame a crear un controller para gestión de
categorías de tareas.
```

**Claude Code**:
```
[LEE tech-stack.md, architecture.md, conventions.md, business-rules.md]

¡Perfecto! Veo que usas:
- Express con PostgreSQL
- Arquitectura MVC + Servicios
- Convenciones: camelCase para funciones, PascalCase para clases
- Máximo 20 categorías por usuario

Voy a crear el controller completo siguiendo tu arquitectura.

```javascript
// src/controllers/categoryController.js

const categoryService = require('../services/categoryService');
const logger = require('../utils/logger');

class CategoryController {
  /**
   * Crear nueva categoría
   * POST /api/categories
   */
  async create(req, res, next) {
    try {
      const { name, color } = req.body;
      const userId = req.user.id; // Del middleware de auth

      logger.info(`Usuario ${userId} creando categoría: ${name}`);

      const category = await categoryService.createCategory({
        name,
        color,
        userId
      });

      res.status(201).json({
        success: true,
        data: category
      });

    } catch (error) {
      logger.error('Error creando categoría:', error);
      next(error);
    }
  }

  /**
   * Obtener todas las categorías del usuario
   * GET /api/categories
   */
  async findAll(req, res, next) {
    try {
      const userId = req.user.id;

      const categories = await categoryService.findUserCategories(userId);

      res.status(200).json({
        success: true,
        data: categories
      });

    } catch (error) {
      logger.error('Error obteniendo categorías:', error);
      next(error);
    }
  }

  /**
   * Obtener una categoría por ID
   * GET /api/categories/:id
   */
  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const category = await categoryService.findCategoryById(id, userId);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Categoría no encontrada'
        });
      }

      res.status(200).json({
        success: true,
        data: category
      });

    } catch (error) {
      logger.error('Error obteniendo categoría:', error);
      next(error);
    }
  }

  /**
   * Actualizar categoría
   * PUT /api/categories/:id
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, color } = req.body;
      const userId = req.user.id;

      const category = await categoryService.updateCategory(id, userId, {
        name,
        color
      });

      res.status(200).json({
        success: true,
        data: category
      });

    } catch (error) {
      logger.error('Error actualizando categoría:', error);
      next(error);
    }
  }

  /**
   * Eliminar categoría
   * DELETE /api/categories/:id
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      await categoryService.deleteCategory(id, userId);

      res.status(200).json({
        success: true,
        message: 'Categoría eliminada exitosamente'
      });

    } catch (error) {
      logger.error('Error eliminando categoría:', error);
      next(error);
    }
  }
}

module.exports = new CategoryController();
```

NOTAS:
======

✅ Seguí tu convención: PascalCase para la clase
✅ Métodos: create, findAll, findOne, update, delete (como defines)
✅ Formato de respuesta: { success, data } o { success, message, errors }
✅ Logging con Winston
✅ Manejo de errores: next(error)
✅ userId obtenido de req.user (tu middleware de auth)
✅ Validaciones delegadas al service

Ahora necesitas el service. ¿Lo genero?
```

**¿Ves lo que pasó?**

Claude Code:
1. Leyó TODOS tus archivos de contexto
2. Entendió tu stack, arquitectura y convenciones
3. Generó código que sigue EXACTAMENTE tus estándares
4. No tuviste que explicar nada

## Paso 3: Implementar RAG Básico con Claude Code

Ahora vamos a un nivel más avanzado: RAG (Retrieval Augmented Generation).

**Tú**:
```
Claude, mi proyecto ha crecido mucho y tengo mucha documentación.
¿Puedes ayudarme a implementar un sistema RAG básico para buscar
documentación relevante automáticamente?
```

**Claude Code**:
```
¡Claro! RAG es perfecto para proyectos grandes con mucha documentación.
Te voy a crear un sistema básico.

¿QUÉ ES RAG?
============

RAG = Retrieval Augmented Generation

En lugar de enviar TODA tu documentación en cada pregunta (caro y lento),
RAG:
1. Busca solo los documentos relevantes
2. Envía solo esos (más barato y rápido)
3. Obtienes respuestas más precisas

SISTEMA RAG BÁSICO:
===================

```javascript
// rag/documentLoader.js

const fs = require('fs');
const path = require('path');

class DocumentLoader {
  constructor(docsPath = './docs') {
    this.docsPath = docsPath;
    this.documents = [];
  }

  // Cargar todos los archivos .md
  loadDocuments() {
    const files = this.getMarkdownFiles(this.docsPath);

    this.documents = files.map(file => {
      const content = fs.readFileSync(file, 'utf-8');
      const filename = path.basename(file, '.md');

      return {
        id: filename,
        path: file,
        content: content,
        // Metadata que podemos usar para búsqueda
        wordCount: content.split(/\s+/).length,
        lines: content.split('\n').length
      };
    });

    console.log(`📚 ${this.documents.length} documentos cargados`);

    return this.documents;
  }

  // Obtener todos los archivos .md recursivamente
  getMarkdownFiles(dir) {
    const files = [];

    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...this.getMarkdownFiles(fullPath));
      } else if (item.endsWith('.md')) {
        files.push(fullPath);
      }
    }

    return files;
  }
}

module.exports = new DocumentLoader();
```

```javascript
// rag/searcher.js

class SimpleSearcher {
  // Buscar documentos relevantes (búsqueda por keywords)
  search(query, documents, topK = 3) {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/);

    // Calcular score de relevancia para cada documento
    const scored = documents.map(doc => {
      const contentLower = doc.content.toLowerCase();
      let score = 0;

      // Contar cuántas palabras del query aparecen
      for (const word of queryWords) {
        if (word.length < 3) continue; // Ignorar palabras muy cortas

        // Contar ocurrencias
        const regex = new RegExp(word, 'gi');
        const matches = contentLower.match(regex);

        if (matches) {
          score += matches.length;

          // Bonus si aparece en el título/filename
          if (doc.id.toLowerCase().includes(word)) {
            score += 5;
          }
        }
      }

      return { ...doc, score };
    });

    // Ordenar por score descendente
    scored.sort((a, b) => b.score - a.score);

    // Retornar top K
    return scored.slice(0, topK).filter(d => d.score > 0);
  }
}

module.exports = new SimpleSearcher();
```

```javascript
// rag/ragSystem.js

const documentLoader = require('./documentLoader');
const searcher = require('./searcher');

class RAGSystem {
  constructor() {
    this.documents = [];
  }

  // Inicializar: cargar documentos
  initialize(docsPath = './docs') {
    console.log('🚀 Inicializando sistema RAG...');

    documentLoader.docsPath = docsPath;
    this.documents = documentLoader.loadDocuments();

    console.log('✅ Sistema RAG listo');
  }

  // Obtener contexto relevante para una pregunta
  getRelevantContext(query, topK = 3) {
    console.log(`🔍 Buscando documentos relevantes para: "${query}"`);

    const results = searcher.search(query, this.documents, topK);

    console.log(`📄 ${results.length} documentos encontrados`);

    // Combinar contenido de documentos relevantes
    const context = results.map(doc => {
      return `
=== ${doc.id} ===
${doc.content}
`;
    }).join('\n\n');

    return {
      context: context,
      sources: results.map(r => r.id)
    };
  }

  // Generar prompt con contexto
  buildPromptWithContext(userQuery) {
    const { context, sources } = this.getRelevantContext(userQuery);

    const prompt = `
Basándote en la siguiente documentación del proyecto:

${context}

Responde a esta pregunta del usuario:
${userQuery}

Usa solo información de la documentación proporcionada.
Si la respuesta no está en la documentación, dilo claramente.
`;

    return {
      prompt: prompt,
      sources: sources
    };
  }
}

module.exports = new RAGSystem();
```

USO DEL SISTEMA RAG:
====================

```javascript
// Ejemplo de uso

const ragSystem = require('./rag/ragSystem');
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Inicializar (una vez al arrancar)
ragSystem.initialize('./docs');

// Cuando usuario hace pregunta
async function askWithRAG(userQuestion) {
  // 1. Obtener contexto relevante
  const { prompt, sources } = ragSystem.buildPromptWithContext(userQuestion);

  console.log('📚 Usando documentos:', sources);

  // 2. Enviar a Claude con contexto
  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      { role: 'user', content: prompt }
    ],
  });

  return {
    answer: message.content[0].text,
    sources: sources
  };
}

// Uso:
const result = await askWithRAG('¿Cómo funciona la autenticación en este proyecto?');

console.log('Respuesta:', result.answer);
console.log('Fuentes:', result.sources);
```

VENTAJAS DE ESTE SISTEMA:
=========================

✅ Solo busca documentos relevantes
✅ No envía toda la documentación (ahorro de tokens)
✅ Respuestas basadas en documentación real
✅ Muestra fuentes (sabes de dónde viene la info)

MEJORAS POSIBLES:
=================

1. Usar embeddings en lugar de búsqueda por keywords
   (más preciso, requiere OpenAI Embeddings o similar)

2. Cachear búsquedas (si preguntas lo mismo, no re-buscar)

3. Índice invertido para búsquedas más rápidas

4. Chunking de documentos grandes

¿Quieres que implemente alguna de estas mejoras?
```

## Paso 4: System Prompts Personalizados

**Tú**:
```
Claude, ¿cómo puedo configurar un system prompt que siempre tenga mi contexto?
```

**Claude Code**:
```
¡Buena pregunta! Los system prompts son prompts que se envían SIEMPRE,
definiendo cómo debo comportarme.

IMPLEMENTACIÓN:
===============

```javascript
// config/systemPrompt.js

const fs = require('fs');
const path = require('path');

class SystemPromptBuilder {
  constructor() {
    this.contextPath = path.join(process.cwd(), '.claudecode', 'context');
  }

  // Leer todos los archivos de contexto
  loadContext() {
    const files = [
      'tech-stack.md',
      'architecture.md',
      'conventions.md',
      'business-rules.md'
    ];

    let context = '';

    for (const file of files) {
      const filePath = path.join(this.contextPath, file);

      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        context += `\n\n=== ${file} ===\n${content}`;
      }
    }

    return context;
  }

  // Construir system prompt completo
  build() {
    const projectContext = this.loadContext();

    return `
Eres un asistente experto en desarrollo de software, especializado en este proyecto.

${projectContext}

INSTRUCCIONES:
1. Siempre sigue las convenciones de código definidas
2. Usa el stack tecnológico especificado
3. Respeta la arquitectura del proyecto
4. Aplica las reglas de negocio
5. Genera código listo para producción
6. Incluye comentarios cuando sea necesario
7. Menciona si hay alguna mejor práctica que podría aplicarse

Cuando generes código:
- Sigue la estructura de carpetas establecida
- Usa los patrones de diseño del proyecto
- Incluye manejo de errores apropiado
- Agrega logging relevante
- Considera seguridad y rendimiento
`;
  }
}

module.exports = new SystemPromptBuilder();
```

USAR EL SYSTEM PROMPT:
=======================

```javascript
// services/claudeService.js

const Anthropic = require('@anthropic-ai/sdk');
const systemPromptBuilder = require('../config/systemPrompt');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function askClaude(userMessage) {
  // Construir system prompt con contexto del proyecto
  const systemPrompt = systemPromptBuilder.build();

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2048,
    system: systemPrompt, // ← Aquí va el contexto
    messages: [
      { role: 'user', content: userMessage }
    ],
  });

  return message.content[0].text;
}

module.exports = { askClaude };
```

EJEMPLO DE USO:
===============

```javascript
// Antes (sin system prompt):
const response = await askClaude('Crea un controller para productos');
// Claude no sabe tus convenciones, pregunta muchas cosas

// Después (con system prompt):
const response = await askClaude('Crea un controller para productos');
// Claude YA SABE: Express, MVC, tus convenciones, tu arquitectura
// Genera código que sigue EXACTAMENTE tus estándares
```

VENTAJA ENORME:
===============

No tienes que repetir contexto en cada mensaje.
Claude siempre "sabe" sobre tu proyecto.

CACHÉ DEL SYSTEM PROMPT:
=========================

El system prompt puede cachearse para ahorrar tokens:

```javascript
const message = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 2048,
  system: [
    {
      type: 'text',
      text: systemPrompt,
      cache_control: { type: 'ephemeral' } // Cachear por 5 minutos
    }
  ],
  messages: [
    { role: 'user', content: userMessage }
  ],
});
```

Esto cachea el system prompt. Si haces múltiples preguntas en 5 minutos,
el contexto se reutiliza (no pagas por él cada vez).

¿Listo para implementarlo?
```

## Problemas Comunes y Soluciones

### Error 1: El contexto es demasiado largo

❌ **Problema**: Mis archivos de contexto son muy largos y exceden el límite de tokens

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, mi PROJECT_CONTEXT.md tiene 10,000 líneas. ¿Cómo manejo contexto tan grande?
```

**Claude Code**:
```
10,000 líneas es MUCHO. Varias estrategias:

ESTRATEGIA 1: Dividir por temas
================================

En lugar de un archivo gigante, divide en archivos temáticos:

```
.claudecode/context/
├── backend/
│   ├── api.md
│   ├── database.md
│   └── auth.md
├── frontend/
│   ├── components.md
│   └── state-management.md
└── infrastructure/
    ├── deployment.md
    └── monitoring.md
```

Cuando preguntes algo específico, solo carga el archivo relevante:

"Lee .claudecode/context/backend/auth.md y ayúdame con login"

ESTRATEGIA 2: Resúmenes
=======================

Crea una versión resumida para contexto general:

```markdown
# PROJECT_CONTEXT_SUMMARY.md

[Versión corta con solo lo esencial]
```

Y archivos detallados para consultas específicas.

ESTRATEGIA 3: RAG (Retrieval)
==============================

Usa el sistema RAG que te mostré. Solo carga secciones relevantes.

ESTRATEGIA 4: Caché de Prompts
===============================

Usa prompt caching para no pagar por el mismo contexto múltiples veces.

MI RECOMENDACIÓN:
=================

1. Divide contexto en archivos temáticos
2. Crea un SUMMARY.md corto
3. Implementa RAG para proyectos MUY grandes

¿Te ayudo a reorganizar tu contexto?
```

### Error 2: El contexto no se actualiza

❌ **Problema**: Cambié mis archivos de contexto pero Claude sigue usando la versión vieja

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, actualicé mis archivos de contexto pero parece que sigues usando
información vieja.
```

**Claude Code**:
```
Esto puede pasar por caché. Soluciones:

SOLUCIÓN 1: Forzar recarga
===========================

```javascript
// systemPromptBuilder.js

class SystemPromptBuilder {
  constructor() {
    this.cache = null;
    this.cacheTime = null;
    this.cacheDuration = 5 * 60 * 1000; // 5 minutos
  }

  build(forceReload = false) {
    const now = Date.now();

    // Si no hay caché o es viejo o forceReload
    if (!this.cache ||
        (now - this.cacheTime > this.cacheDuration) ||
        forceReload) {

      console.log('🔄 Recargando contexto...');
      this.cache = this.loadContext();
      this.cacheTime = now;
    }

    return this.buildPrompt(this.cache);
  }

  // Forzar recarga
  reload() {
    console.log('♻️  Forzando recarga de contexto');
    return this.build(true);
  }
}
```

USO:
```javascript
// Cuando actualizas contexto
systemPromptBuilder.reload();
```

SOLUCIÓN 2: Watcher de archivos
================================

Detectar cambios automáticamente:

```javascript
const chokidar = require('chokidar');

// Observar cambios en archivos de contexto
chokidar.watch('.claudecode/context/**/*.md')
  .on('change', (path) => {
    console.log(`📝 Archivo cambiado: ${path}`);
    console.log('🔄 Recargando contexto...');

    systemPromptBuilder.reload();
  });
```

SOLUCIÓN 3: Timestamp en archivos
==================================

Agregar timestamp para saber si cambió:

```javascript
loadContext() {
  const files = this.getContextFiles();
  let latestMTime = 0;

  for (const file of files) {
    const stat = fs.statSync(file);
    if (stat.mtimeMs > latestMTime) {
      latestMTime = stat.mtimeMs;
    }
  }

  // Si algún archivo cambió, recargar
  if (latestMTime > this.lastLoadTime) {
    console.log('🔄 Contexto actualizado detectado');
    this.lastLoadTime = latestMTime;
    // Recargar...
  }
}
```

Usa la opción que prefieras.
```

## 🎮 Ejercicios Gamificados

### Ejercicio 1: Crear Context Files (100 XP)

**Objetivo**: Crear estructura completa de archivos de contexto.

**Instrucciones**:
1. Crea .claudecode/context/
2. Genera archivos: tech-stack.md, architecture.md, conventions.md
3. Llena cada archivo con información real de un proyecto
4. Prueba preguntándole a Claude Code que los lea

**Entregable**: Estructura de archivos + screenshot de Claude usándolos.

**Bonus (50 XP)**: Agregar business-rules.md y api-docs.md.

### Ejercicio 2: Sistema RAG Básico (200 XP)

**Objetivo**: Implementar búsqueda de documentación.

**Instrucciones**:
1. Implementa DocumentLoader y Searcher
2. Carga al menos 5 archivos de documentación
3. Prueba búsquedas con diferentes queries
4. Mide precisión de resultados

**Entregable**: Código + ejemplos de búsquedas.

**Bonus (100 XP)**: Implementar búsqueda con embeddings.

### Ejercicio 3: System Prompt Dinámico (175 XP)

**Objetivo**: Configurar system prompt que se auto-actualiza.

**Instrucciones**:
1. Implementa SystemPromptBuilder
2. Agrega caché con expiración
3. Implementa file watcher
4. Prueba que se actualiza al cambiar archivos

**Entregable**: Sistema funcionando + demo.

**Bonus (85 XP)**: Agregar múltiples perfiles (dev, prod, test).

### Ejercicio 4: Knowledge Base Completa (250 XP)

**Objetivo**: Crear knowledge base profesional.

**Requisitos**:
- Archivos de contexto organizados
- Sistema RAG implementado
- System prompt con caché
- File watchers activos
- Documentación de cómo usarlo

**Entregable**: Sistema completo funcionando.

**Bonus (125 XP)**: Interfaz web para búsqueda de documentación.

### Ejercicio 5: RAG Avanzado con Embeddings (300 XP)

**Objetivo**: Implementar RAG con búsqueda semántica.

**Requisitos**:
- Usar OpenAI Embeddings o similar
- Base de datos vectorial (Pinecone, Weaviate, o local)
- Chunking inteligente de documentos
- Búsqueda híbrida (keywords + embeddings)
- Métricas de precisión

**Entregable**: Sistema RAG avanzado + benchmarks.

**Bonus (150 XP)**: Re-ranking de resultados con modelo de relevancia.

## Resumen de Esta Lección

¡Felicidades! Completaste la lección de Memory y Knowledge Management. Esto es lo que aprendiste:

✅ **Qué es "memoria" en IA** y por qué es crucial para proyectos grandes

✅ **Crear archivos de contexto** organizados en .claudecode/context/

✅ **Tipos de contexto**: tech stack, arquitectura, convenciones, reglas de negocio

✅ **Implementar RAG básico** para búsqueda inteligente de documentación

✅ **System prompts personalizados** que siempre tienen tu contexto de proyecto

✅ **Caché de contexto** para no recargar archivos constantemente

✅ **File watchers** para detectar cambios automáticamente

✅ **Usar Claude Code como experto en TU proyecto** con todo el contexto necesario

Lo más importante: **Claude Code puede convertirse en un experto específico de tu proyecto**. No es solo un asistente genérico. Con el contexto correcto, es como tener un desarrollador senior que conoce a la perfección tu código, tu arquitectura, tus convenciones.

Esto transforma completamente la experiencia:
- Respuestas más precisas y relevantes
- Código que sigue TUS estándares
- Menos explicaciones repetitivas
- Mayor productividad
- Menos tokens desperdiciados

Proyectos que implementan buenas prácticas de knowledge management pueden aumentar su productividad en 2-3x simplemente porque Claude Code ya "sabe" todo sobre el proyecto.

En la próxima lección (la FINAL del curso), vamos a poner en práctica TODO lo que has aprendido en un **Proyecto Final Completo**: construirás una aplicación real usando Claude Code como tu compañero de desarrollo. ¡Es el momento de brillar! ¡Nos vemos en el gran final!
