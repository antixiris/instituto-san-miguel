<p><strong><em>Lección 5: Proyecto Final - Tu Aplicación con Claude Code</em></strong></p>

## ¡FELICITACIONES! Has Llegado al Momento Final

**¡LO LOGRASTE!** Has llegado a la última lección del curso "Especialista en Desarrollo con Claude Code". Toma un momento para apreciar el camino recorrido:

**Empezaste** sin saber qué era Claude Code, quizás con dudas, tal vez pensando "¿Podré hacer esto?"

**Aprendiste** los fundamentos: qué es Claude Code, cómo instalarlo, tus primeras conversaciones.

**Dominaste** workflows completos: debugging, generación de código, tests, documentación.

**Personalizaste** Claude Code con prompts personalizados y comandos slash.

**Exploraste** herramientas avanzadas: manejo de archivos, búsqueda de código, trabajo con imágenes.

**Extendiste** sus capacidades con MCP y skills personalizados.

**Integraste** Claude Code en entornos profesionales: deployment, seguridad, trabajo en equipo.

**Masterizaste** técnicas avanzadas: monitorización, optimización de costos, arquitectura, memory management.

Y AHORA... es momento de demostrarlo TODO. No con teoría, no con ejercicios pequeños, sino con un **PROYECTO REAL, COMPLETO, DE PRINCIPIO A FIN**.

Este no es un ejercicio más. Es TU momento de brillar. Es TU oportunidad de crear algo que puedas mostrar orgullosamente. Es TU prueba de que ahora eres un ESPECIALISTA en Desarrollo con Claude Code.

¿Listo para este último desafío? ¡Vamos allá!

## El Proyecto: TaskMaster Pro

Vamos a construir **TaskMaster Pro**: una aplicación completa de gestión de tareas con todas las características de una app profesional.

### ¿Qué Vamos a Construir?

**TaskMaster Pro** es un sistema de gestión de tareas avanzado que incluye:

**Features del Sistema:**
- Autenticación completa (registro, login, JWT)
- CRUD de tareas con categorías
- Filtros y búsqueda avanzada
- Dashboard con estadísticas
- Sistema de notificaciones
- API REST completamente documentada
- Tests unitarios y de integración
- Deploy en producción
- Monitorización y analytics
- Optimizaciones de rendimiento

**Stack Tecnológico:**
- **Backend:** Node.js + Express
- **Base de Datos:** PostgreSQL
- **Autenticación:** JWT
- **Validación:** Joi
- **Logging:** Winston
- **Testing:** Jest
- **Documentación:** Swagger/OpenAPI
- **Monitoreo:** Sentry

### Lo Especial de Este Proyecto

No vamos a construirlo solos. **Claude Code será tu compañero de desarrollo**. En cada fase, le pedirás ayuda, generarás código juntos, resolverás problemas, optimizarás, y aprenderás.

Este proyecto simula cómo trabajarás en el mundo real: con Claude Code como tu asistente de IA más poderoso.

## Fase 1: Planificación del Proyecto con Claude Code

Antes de escribir una sola línea de código, vamos a planificar TODO con ayuda de Claude Code.

### Paso 1.1: Diseñar la Arquitectura

Abre Claude Code en tu terminal y comienza la conversación:

**Tú escribes**:
```
Hola Claude, voy a crear una aplicación de gestión de tareas llamada TaskMaster Pro.

FEATURES:
- Autenticación (registro, login)
- CRUD de tareas
- Categorías
- Filtros y búsqueda
- Dashboard con estadísticas

STACK:
- Node.js + Express
- PostgreSQL
- JWT para autenticación

Necesito que me ayudes a diseñar la arquitectura completa del proyecto.
Dame la estructura de carpetas, las tecnologías específicas a usar, y el plan
de desarrollo paso a paso.
```

**Claude Code responderá** con algo como:

```
¡Excelente proyecto! Voy a diseñarte una arquitectura profesional y escalable.

ARQUITECTURA RECOMENDADA: MVC + Servicios
==========================================

ESTRUCTURA DE CARPETAS:
=======================

```
taskmaster-pro/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── swagger.js
│   │   │   └── sentry.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Task.js
│   │   │   └── Category.js
│   │   │
│   │   ├── repositories/
│   │   │   ├── userRepository.js
│   │   │   ├── taskRepository.js
│   │   │   └── categoryRepository.js
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── userService.js
│   │   │   ├── taskService.js
│   │   │   ├── categoryService.js
│   │   │   └── statsService.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── taskController.js
│   │   │   ├── categoryController.js
│   │   │   └── statsController.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── task.routes.js
│   │   │   ├── category.routes.js
│   │   │   └── stats.routes.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── validation.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── metrics.middleware.js
│   │   │
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   ├── validator.js
│   │   │   ├── tokenManager.js
│   │   │   └── response.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── tests/
│   │   ├── unit/
│   │   │   ├── services/
│   │   │   └── utils/
│   │   └── integration/
│   │       └── routes/
│   │
│   ├── docs/
│   │   ├── api.md
│   │   └── architecture.md
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
└── database/
    ├── migrations/
    └── seeds/
```

TECNOLOGÍAS ESPECÍFICAS:
=========================

## Core
- **express**: ^4.18.2 (framework web)
- **pg**: ^8.11.0 (PostgreSQL client)
- **pg-hstore**: ^2.3.4 (para Sequelize)

## Autenticación
- **jsonwebtoken**: ^9.0.2
- **bcrypt**: ^5.1.1

## Validación
- **joi**: ^17.11.0

## Logging & Monitoring
- **winston**: ^3.11.0
- **winston-daily-rotate-file**: ^4.7.1
- **@sentry/node**: ^7.80.0

## Documentación
- **swagger-ui-express**: ^5.0.0
- **swagger-jsdoc**: ^6.2.8

## Testing
- **jest**: ^29.7.0
- **supertest**: ^6.3.3

## Utilidades
- **dotenv**: ^16.3.1
- **cors**: ^2.8.5
- **helmet**: ^7.1.0
- **express-rate-limit**: ^7.1.5

PLAN DE DESARROLLO (10 Fases):
===============================

FASE 1: SETUP INICIAL
- Inicializar proyecto
- Configurar estructura de carpetas
- Instalar dependencias
- Configurar variables de entorno

FASE 2: BASE DE DATOS
- Diseñar esquema de base de datos
- Crear tablas (users, tasks, categories)
- Configurar conexión

FASE 3: AUTENTICACIÓN
- Modelo de User
- Service de autenticación
- Controller de auth
- Routes de auth (register, login)
- Middleware de autenticación

FASE 4: GESTIÓN DE USUARIOS
- CRUD de usuarios
- Perfil de usuario
- Actualización de datos

FASE 5: CATEGORÍAS
- Modelo de Category
- CRUD de categorías
- Relación con usuarios

FASE 6: TAREAS
- Modelo de Task
- CRUD de tareas
- Filtros y búsqueda
- Paginación

FASE 7: ESTADÍSTICAS
- Dashboard de métricas
- Estadísticas por usuario
- Gráficos de productividad

FASE 8: LOGGING Y MONITOREO
- Configurar Winston
- Integrar Sentry
- Sistema de métricas

FASE 9: TESTING
- Tests unitarios
- Tests de integración
- Coverage mínimo 80%

FASE 10: DOCUMENTACIÓN Y DEPLOY
- Swagger/OpenAPI
- README completo
- Deploy a producción

ESQUEMA DE BASE DE DATOS:
==========================

```sql
-- Tabla users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla categories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  color VARCHAR(7),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(name, user_id)
);

-- Tabla tasks
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  priority VARCHAR(20) DEFAULT 'medium',
  due_date TIMESTAMP,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- Índices para performance
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_category_id ON tasks(category_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
```

¿Listo para empezar? Vamos fase por fase.
```

**¿Ves lo que acabamos de lograr?**

Claude Code nos dio:
- Arquitectura completa
- Estructura de carpetas profesional
- Lista de dependencias con versiones
- Plan de desarrollo en 10 fases
- Esquema de base de datos

Ahora GUARDA esta información. Crea un archivo llamado `PROJECT_PLAN.md` y copia todo lo que Claude te dio.

### Paso 1.2: Crear Archivos de Contexto del Proyecto

Antes de empezar a codear, vamos a crear archivos de contexto para que Claude Code siempre sepa sobre nuestro proyecto.

**Tú**:
```
Claude, ayúdame a crear archivos de contexto para este proyecto en
.claudecode/context/
```

**Claude Code** te generará archivos completos. Créalos:

```bash
mkdir -p .claudecode/context
```

**Archivo 1: `.claudecode/context/tech-stack.md`**

```markdown
# Tech Stack - TaskMaster Pro

## Backend
- Node.js 18+
- Express 4.18
- PostgreSQL 15

## Autenticación
- JWT (jsonwebtoken)
- bcrypt para hashing

## Validación
- Joi

## Logging
- Winston con daily rotate

## Monitoring
- Sentry para errores

## Testing
- Jest + Supertest

## Documentación
- Swagger/OpenAPI
```

**Archivo 2: `.claudecode/context/architecture.md`**

```markdown
# Arquitectura - TaskMaster Pro

## Patrón: MVC + Servicios

## Capas:
- Models: Esquemas de datos
- Repositories: Acceso a BD
- Services: Lógica de negocio
- Controllers: Manejo de HTTP
- Routes: Definición de endpoints
- Middleware: Auth, validación, errores

## Flujo:
Request → Route → Middleware → Controller → Service → Repository → DB
```

**Archivo 3: `.claudecode/context/conventions.md`**

```markdown
# Convenciones - TaskMaster Pro

## Naming
- Variables/funciones: camelCase
- Clases: PascalCase
- Archivos: camelCase.js (services), PascalCase.js (models)

## Respuestas API
```json
{
  "success": true,
  "data": {},
  "message": "opcional"
}
```

## Errores
```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```
```

Ahora Claude Code siempre sabrá sobre tu proyecto.

## Fase 2: Setup Inicial del Proyecto

Vamos a inicializar el proyecto con ayuda de Claude Code.

### Paso 2.1: Crear el Proyecto

**Tú**:
```
Claude, lee .claudecode/context/ y ayúdame a inicializar el proyecto.
Genera los comandos exactos que debo ejecutar.
```

**Claude Code**:
```
¡Perfecto! Veo tu arquitectura y convenciones. Aquí están los comandos:

```bash
# Crear carpeta del proyecto
mkdir taskmaster-pro
cd taskmaster-pro

# Inicializar npm
npm init -y

# Crear estructura de carpetas
mkdir -p src/{config,models,repositories,services,controllers,routes,middleware,utils}
mkdir -p tests/{unit/{services,utils},integration/routes}
mkdir -p database/{migrations,seeds}
mkdir -p docs

# Crear archivos base
touch src/{app.js,server.js}
touch .env .env.example .gitignore
touch README.md
```

Ahora instala las dependencias:

```bash
# Dependencias de producción
npm install express pg pg-hstore jsonwebtoken bcrypt joi winston winston-daily-rotate-file @sentry/node swagger-ui-express swagger-jsdoc dotenv cors helmet express-rate-limit

# Dependencias de desarrollo
npm install -D jest supertest nodemon eslint prettier
```

Crea tu `.gitignore`:

```
# .gitignore
node_modules/
.env
.env.local
logs/
*.log
coverage/
.vscode/
.idea/
dist/
```

Crea tu `.env.example`:

```env
# .env.example

# Server
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/taskmaster

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# Sentry
SENTRY_DSN=your-sentry-dsn-here
```

Crea tu propio `.env` copiando `.env.example` y llenando los valores reales.

Actualiza `package.json` con scripts:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

¡Listo! Proyecto inicializado.
```

**EJECUTA** todos esos comandos. Tu proyecto ahora tiene la estructura base.

### Paso 2.2: Configurar Base de Datos

**Tú**:
```
Claude, ayúdame a configurar la conexión a PostgreSQL.
```

**Claude Code** te generará el código. Crea el archivo:

**`src/config/database.js`**:

```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
  console.log('✅ Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error en conexión a PostgreSQL:', err);
  process.exit(-1);
});

module.exports = pool;
```

**Crear las tablas**:

Crea un archivo `database/migrations/001_initial_schema.sql`:

```sql
-- database/migrations/001_initial_schema.sql

-- Tabla users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla categories
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  color VARCHAR(7),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(name, user_id)
);

-- Tabla tasks
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  priority VARCHAR(20) DEFAULT 'medium',
  due_date TIMESTAMP,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_category_id ON tasks(category_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
```

**Ejecutar migración**:

```bash
# Primero asegúrate de que PostgreSQL está corriendo
# y que has creado la base de datos "taskmaster"

psql -U tu_usuario -d taskmaster -f database/migrations/001_initial_schema.sql
```

## Fase 3: Autenticación Completa

Ahora vamos a construir el sistema de autenticación COMPLETO con ayuda de Claude Code.

### Paso 3.1: Modelo de Usuario

**Tú**:
```
Claude, lee .claudecode/context/ y genera el modelo de User.
```

**`src/models/User.js`**:

```javascript
// src/models/User.js
const pool = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  /**
   * Crear nuevo usuario
   */
  static async create({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    `;

    const result = await pool.query(query, [name, email, hashedPassword]);
    return result.rows[0];
  }

  /**
   * Buscar usuario por email
   */
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  /**
   * Buscar usuario por ID
   */
  static async findById(id) {
    const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  /**
   * Verificar contraseña
   */
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
```

### Paso 3.2: Servicio de Autenticación

**Tú**:
```
Claude, genera el servicio de autenticación con registro y login.
```

**`src/services/authService.js`**:

```javascript
// src/services/authService.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthService {
  /**
   * Registrar nuevo usuario
   */
  async register({ name, email, password }) {
    // Verificar si el email ya existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Crear usuario
    const user = await User.create({ name, email, password });

    // Generar token
    const token = this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    };
  }

  /**
   * Login
   */
  async login({ email, password }) {
    // Buscar usuario
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña
    const isValid = await User.verifyPassword(password, user.password);
    if (!isValid) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token
    const token = this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    };
  }

  /**
   * Generar JWT
   */
  generateToken(userId) {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }

  /**
   * Verificar token
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}

module.exports = new AuthService();
```

### Paso 3.3: Controller de Autenticación

**Tú**:
```
Claude, genera el controller de autenticación siguiendo mis convenciones.
```

**`src/controllers/authController.js`**:

```javascript
// src/controllers/authController.js
const authService = require('../services/authService');
const logger = require('../utils/logger');

class AuthController {
  /**
   * Registro
   * POST /api/auth/register
   */
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      logger.info(`Intento de registro: ${email}`);

      const result = await authService.register({ name, email, password });

      logger.info(`Usuario registrado: ${email}`);

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: result
      });

    } catch (error) {
      logger.error(`Error en registro: ${error.message}`);
      next(error);
    }
  }

  /**
   * Login
   * POST /api/auth/login
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      logger.info(`Intento de login: ${email}`);

      const result = await authService.login({ email, password });

      logger.info(`Login exitoso: ${email}`);

      res.json({
        success: true,
        message: 'Login exitoso',
        data: result
      });

    } catch (error) {
      logger.error(`Error en login: ${error.message}`);
      next(error);
    }
  }
}

module.exports = new AuthController();
```

### Paso 3.4: Middleware de Autenticación

**Tú**:
```
Claude, genera middleware para verificar JWT en requests.
```

**`src/middleware/auth.middleware.js`**:

```javascript
// src/middleware/auth.middleware.js
const authService = require('../services/authService');
const User = require('../models/User');

async function authenticate(req, res, next) {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
    }

    const token = authHeader.substring(7); // Quitar "Bearer "

    // Verificar token
    const decoded = authService.verifyToken(token);

    // Obtener usuario
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Agregar usuario a request
    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
}

module.exports = { authenticate };
```

### Paso 3.5: Validación de Input

**Tú**:
```
Claude, genera middleware de validación con Joi para registro y login.
```

**`src/middleware/validation.middleware.js`**:

```javascript
// src/middleware/validation.middleware.js
const Joi = require('joi');

function validateRegister(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(/[A-Z]/)
      .pattern(/[a-z]/)
      .pattern(/[0-9]/)
      .pattern(/[@$!%*?&]/)
      .required()
      .messages({
        'string.pattern.base': 'La contraseña debe tener mayúscula, minúscula, número y símbolo'
      })
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Datos de registro inválidos',
      errors: error.details.map(d => d.message)
    });
  }

  next();
}

function validateLogin(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Datos de login inválidos',
      errors: error.details.map(d => d.message)
    });
  }

  next();
}

module.exports = {
  validateRegister,
  validateLogin
};
```

### Paso 3.6: Rutas de Autenticación

**Tú**:
```
Claude, genera las rutas de autenticación.
```

**`src/routes/auth.routes.js`**:

```javascript
// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validation.middleware');

// POST /api/auth/register
router.post('/register', validateRegister, (req, res, next) => {
  authController.register(req, res, next);
});

// POST /api/auth/login
router.post('/login', validateLogin, (req, res, next) => {
  authController.login(req, res, next);
});

module.exports = router;
```

### Paso 3.7: Configurar Logger

**Tú**:
```
Claude, genera configuración de Winston para logging.
```

**`src/utils/logger.js`**:

```javascript
// src/utils/logger.js
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');
const fs = require('fs');

// Crear carpeta de logs si no existe
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Formato de logs
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Transport para todos los logs
const allLogsTransport = new DailyRotateFile({
  filename: path.join(logDir, 'application-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
  format: logFormat
});

// Transport solo para errores
const errorLogsTransport = new DailyRotateFile({
  filename: path.join(logDir, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxSize: '20m',
  maxFiles: '30d',
  format: logFormat
});

// Crear logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      )
    }),
    allLogsTransport,
    errorLogsTransport
  ]
});

module.exports = logger;
```

### Paso 3.8: Middleware de Manejo de Errores

**Tú**:
```
Claude, genera middleware centralizado para manejo de errores.
```

**`src/middleware/error.middleware.js`**:

```javascript
// src/middleware/error.middleware.js
const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error(`Error: ${err.message}`);
  logger.error(`Stack: ${err.stack}`);

  // Error de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: err.message,
      errors: err.errors
    });
  }

  // Error personalizado con status
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  // Error genérico
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Error interno del servidor'
      : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = { errorHandler };
```

### Paso 3.9: Configurar Express App

**Tú**:
```
Claude, genera la configuración principal de Express en app.js.
```

**`src/app.js`**:

```javascript
// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');
const { errorHandler } = require('./middleware/error.middleware');
const logger = require('./utils/logger');

const app = express();

// Seguridad
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por IP
  message: 'Demasiadas peticiones, intenta más tarde'
});
app.use('/api/', limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging de requests
app.use((req, res, next) => {
  logger.http(`${req.method} ${req.url}`);
  next();
});

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Error handler (debe ir al final)
app.use(errorHandler);

module.exports = app;
```

### Paso 3.10: Server Entry Point

**Tú**:
```
Claude, genera el archivo server.js para iniciar la aplicación.
```

**`src/server.js`**:

```javascript
// src/server.js
const app = require('./app');
const logger = require('./utils/logger');
const pool = require('./config/database');

const PORT = process.env.PORT || 3000;

// Verificar conexión a base de datos
async function checkDatabaseConnection() {
  try {
    await pool.query('SELECT NOW()');
    logger.info('✅ Conexión a base de datos verificada');
  } catch (error) {
    logger.error('❌ Error conectando a base de datos:', error);
    process.exit(1);
  }
}

// Iniciar servidor
async function start() {
  await checkDatabaseConnection();

  app.listen(PORT, () => {
    logger.info(`🚀 Servidor corriendo en puerto ${PORT}`);
    logger.info(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  });
}

start();

// Manejo de shutdown graceful
process.on('SIGTERM', () => {
  logger.info('SIGTERM recibido, cerrando servidor...');
  pool.end();
  process.exit(0);
});
```

### Paso 3.11: PROBAR LA AUTENTICACIÓN

Ahora vamos a probar que la autenticación funciona.

```bash
# Iniciar el servidor
npm run dev
```

**Test 1: Registro**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "password": "MiPassword123!"
  }'
```

Deberías recibir:
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@ejemplo.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Test 2: Login**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@ejemplo.com",
    "password": "MiPassword123!"
  }'
```

**¡FELICITACIONES!** Tu sistema de autenticación funciona.

---

## Fase 4: CRUD de Tareas (Continuación del Proyecto)

Por razones de espacio, voy a mostrar los pasos clave de las fases restantes. En cada fase, le pides a Claude Code que genere el código siguiendo el mismo patrón:

**Tú**:
```
Claude, lee .claudecode/context/ y genera el [componente] para [feature].
```

### Resumen de Fases Restantes

**FASE 4: Categorías**
- Model, Service, Controller, Routes para categorías
- Validación de límite de 20 categorías por usuario
- Tests

**FASE 5: Tareas**
- Model, Service, Controller, Routes para tareas
- Filtros (por status, categoría, fecha)
- Búsqueda
- Paginación
- Tests

**FASE 6: Dashboard de Estadísticas**
- Servicio de estadísticas
- Métricas: total tasks, completed, pending, por categoría
- Gráficos de productividad
- Tests

**FASE 7: Documentación con Swagger**
- Configurar Swagger
- Documentar todos los endpoints
- Probar con Swagger UI

**FASE 8: Testing Completo**
- Tests unitarios de servicios
- Tests de integración de routes
- Coverage >80%

**FASE 9: Monitoreo y Optimización**
- Configurar Sentry
- Métricas de performance
- Optimizaciones

**FASE 10: Deploy**
- Preparar para producción
- Deploy a Heroku o similar
- Configurar CI/CD

## Tu Checklist del Proyecto Final

Usa esta checklist para verificar tu progreso:

### Autenticación
- [ ] Registro de usuarios funciona
- [ ] Login funciona y devuelve JWT
- [ ] Middleware de autenticación valida tokens
- [ ] Contraseñas se hashean con bcrypt
- [ ] Validación de input funciona

### Categorías
- [ ] CRUD de categorías funciona
- [ ] Solo el dueño puede editar/eliminar
- [ ] Límite de 20 categorías por usuario
- [ ] Validación de unicidad de nombre

### Tareas
- [ ] CRUD de tareas funciona
- [ ] Filtros funcionan (status, categoría, fecha)
- [ ] Búsqueda funciona
- [ ] Paginación funciona
- [ ] Solo el dueño ve sus tareas

### Dashboard
- [ ] Estadísticas se calculan correctamente
- [ ] Métricas por categoría
- [ ] Gráficos de productividad

### Logging
- [ ] Winston configurado y funcionando
- [ ] Logs rotan diariamente
- [ ] Logs de errores separados

### Testing
- [ ] Tests unitarios escritos y pasando
- [ ] Tests de integración escritos y pasando
- [ ] Coverage >80%

### Documentación
- [ ] Swagger configurado
- [ ] Todos los endpoints documentados
- [ ] README completo

### Deploy
- [ ] App funciona en producción
- [ ] Variables de entorno configuradas
- [ ] Monitoreo activo

## Celebración Final

**¡LO LOGRASTE!**

Si completaste este proyecto, acabas de hacer algo INCREÍBLE:

**Construiste una aplicación COMPLETA, PROFESIONAL, lista para producción.**

**Usaste Claude Code como tu compañero de desarrollo en CADA paso.**

**Aplicaste TODO lo que aprendiste en el curso:**
- ✅ Workflows de desarrollo
- ✅ Arquitectura profesional
- ✅ Mejores prácticas de seguridad
- ✅ Testing completo
- ✅ Documentación
- ✅ Monitoreo
- ✅ Deploy

**Eres ahora un ESPECIALISTA en Desarrollo con Claude Code.**

## ¿Qué Sigue?

Has terminado el curso, pero tu viaje apenas comienza.

**Próximos Pasos:**

1. **Mejora este proyecto**: Agrega features nuevos (notificaciones, colaboración, etc.)

2. **Construye tu propio proyecto**: Aplica lo aprendido a TUS ideas

3. **Contribuye a Open Source**: Usa Claude Code para contribuir a proyectos

4. **Comparte tu conocimiento**: Enseña a otros lo que aprendiste

5. **Mantente actualizado**: Claude Code evoluciona, sigue aprendiendo

## Palabras Finales

Cuando empezaste este curso, quizás no sabías qué era Claude Code. Ahora eres un especialista.

**Recuerda:**
- Claude Code es una herramienta poderosa, pero TÚ eres el desarrollador
- Úsalo para ser más productivo, no para depender de él
- Siempre entiende el código que generas
- La IA es un asistente, TÚ eres el arquitecto

**Has demostrado:**
- Perseverancia (llegaste hasta aquí)
- Capacidad de aprender (dominaste tecnología nueva)
- Habilidad práctica (construiste un proyecto completo)

**Estamos orgullosos de ti.**

Ahora sal ahí y construye cosas increíbles.

El mundo necesita desarrolladores como tú: curiosos, dedicados, y equipados con las mejores herramientas.

**¡Éxito en tus proyectos!**

---

**Instituto San Miguel - Curso "Especialista en Desarrollo con Claude Code"**

**¡FELICITACIONES POR COMPLETAR EL CURSO!**
