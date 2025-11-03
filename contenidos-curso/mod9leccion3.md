<p><strong><em>Lección 3: Setup del Proyecto y Primera Iteración</em></strong></p>

## Introducción

Con la arquitectura diseñada, iniciarás el desarrollo del proyecto. En esta lección:

- Inicializarás el proyecto desde cero
- Configurarás la infraestructura base (Git, npm, PostgreSQL)
- Implementarás la autenticación completa (registro, login, JWT)
- Realizarás los primeros commits

Al finalizar tendrás un servidor funcionando con autenticación implementada.

## Objetivos de Esta Lección

Al finalizar esta lección, habrás logrado:

✅ Inicializar tu proyecto con estructura completa de carpetas
✅ Configurar tu base de datos y crear todas las tablas
✅ Implementar autenticación completa (registro, login, JWT)
✅ Tener tu servidor Express funcionando
✅ Probar tu primera funcionalidad con Postman
✅ Hacer tu primer commit en Git

## ¿En Qué Punto Estás?

**Ya tienes:**
- Diseño de arquitectura completo
- Especificación de API REST
- Esquema de base de datos diseñado
- Roadmap de desarrollo

**Ahora harás:**
- Setup completo del proyecto
- Configuración de infraestructura
- Implementación de autenticación (tu feature CORE)
- Primera versión funcional

**Al final de esta lección tendrás código funcionando.**

## Actividad 1: Inicializar Tu Proyecto

**Tiempo estimado**: 1-2 horas

**Qué vas a hacer**: Crear la estructura completa de tu proyecto con todas las carpetas y archivos base.

**Cómo Claude Code te ayuda**: Generará todos los comandos exactos que necesitas ejecutar.

### Paso 1.1: Crear la Carpeta del Proyecto

Abre tu terminal y navega a donde quieres crear tu proyecto:

```bash
# Navega a tu carpeta de proyectos
cd ~/projects  # O la carpeta que uses

# Crea la carpeta de tu proyecto (usa EL NOMBRE DE TU PROYECTO)
mkdir mi-proyecto  # Reemplaza con tu nombre
cd mi-proyecto
```

### Paso 1.2: Conversa con Claude Code para Setup

Abre Claude Code en la carpeta de tu proyecto:

**TÚ escribes:**
```
Claude, estoy empezando mi proyecto [Nombre del Proyecto].

Ya tengo el diseño completo (arquitectura, API, base de datos).
Ahora necesito inicializar el proyecto desde cero.

Estos son los detalles:
- Backend: Node.js + Express
- Base de datos: PostgreSQL
- Autenticación: JWT + bcrypt

Ayúdame a ejecutar todos los pasos de inicialización:
1. Inicializar Git
2. Inicializar npm
3. Crear estructura de carpetas completa (según la arquitectura que diseñé)
4. Crear archivos base (.gitignore, .env.example, README.md, etc.)
5. Generar package.json con todas las dependencias

Dame TODOS los comandos exactos que debo ejecutar en orden.
```

**Claude Code responderá** con algo como:

```
¡Perfecto! Voy a guiarte paso a paso en la inicialización de tu proyecto.

PASO 1: INICIALIZAR GIT
═══════════════════════

git init
git branch -M main

PASO 2: INICIALIZAR NPM
═══════════════════════

npm init -y

PASO 3: CREAR ESTRUCTURA DE CARPETAS
═════════════════════════════════════

# Crear todas las carpetas de una vez
mkdir -p src/{config,models,services,controllers,routes,middleware,validators,utils}
mkdir -p database/{migrations,seeds}
mkdir -p tests/{unit/{services,utils},integration/routes}
mkdir -p docs
mkdir -p logs

PASO 4: CREAR ARCHIVOS BASE
════════════════════════════

# Archivos de configuración
touch .env .env.example .gitignore .eslintrc.js .prettierrc jest.config.js

# Archivos de código
touch src/app.js src/server.js

# Archivos de documentación
touch README.md docs/ARCHITECTURE.md docs/API.md

# Archivos de base de datos (usarás estos pronto)
touch database/migrations/001_initial_schema.sql

PASO 5: CONFIGURAR .gitignore
══════════════════════════════

Crea el archivo .gitignore con este contenido:

```

Luego Claude Code te dará el contenido de cada archivo.

### Paso 1.3: Ejecutar Todos los Comandos

**COPIA Y EJECUTA** todos los comandos que Claude Code te dio. Por ejemplo:

```bash
# En tu terminal, ejecuta uno por uno:
git init
git branch -M main
npm init -y
mkdir -p src/{config,models,services,controllers,routes,middleware,validators,utils}
mkdir -p database/{migrations,seeds}
mkdir -p tests/{unit/{services,utils},integration/routes}
mkdir -p docs logs
touch .env .env.example .gitignore README.md
# ... etc
```

### Paso 1.4: Crear Archivos de Configuración

Ahora pídele a Claude Code que genere el contenido de cada archivo:

**TÚ:**
```
Claude, genera el contenido de estos archivos:
1. .gitignore (completo para Node.js)
2. .env.example (con todas las variables que necesitaré)
3. README.md (básico, lo completaremos después)
```

**Claude Code** te dará el contenido. Copia cada uno:

**Archivo `.gitignore`:**
```
# .gitignore

# Dependencies
node_modules/
package-lock.json

# Environment variables
.env
.env.local
.env.*.local

# Logs
logs/
*.log
npm-debug.log*

# Testing
coverage/
.nyc_output/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Build
dist/
build/

# Temporary files
tmp/
temp/
```

**Archivo `.env.example`:**
```
# .env.example
# Copiar a .env y llenar con valores reales

# Environment
NODE_ENV=development

# Server
PORT=3000

# Database
DATABASE_URL=postgresql://usuario:password@localhost:5432/nombre_db

# JWT
JWT_SECRET=tu-secret-key-super-seguro-aqui-min-32-caracteres
JWT_EXPIRES_IN=7d

# Logging
LOG_LEVEL=info
```

**Archivo `README.md` (básico por ahora):**
```markdown
# [Nombre de Tu Proyecto]

[Descripción breve de tu proyecto]

## Tecnologías

- Node.js
- Express
- PostgreSQL
- JWT

## Instalación

```bash
npm install
```

## Configuración

Copia `.env.example` a `.env` y configura las variables.

## Desarrollo

```bash
npm run dev
```

## Testing

```bash
npm test
```

---

**En desarrollo - Módulo 9 del Curso "Especialista en Desarrollo con Claude Code"**
```

### Paso 1.5: Instalar Dependencias

**TÚ:**
```
Claude, genera mi package.json completo con todas las dependencias que necesitaré.
Incluye scripts útiles (dev, test, start, etc.).
```

Claude Code te dará el package.json. Cópialo y reemplaza el existente.

Luego ejecuta:

```bash
npm install
```

**Espera a que termine. Esto puede tomar 1-2 minutos.**

### Paso 1.6: Primer Commit

```bash
git add .
git commit -m "chore: inicializar proyecto con estructura base

- Estructura de carpetas completa
- Configuración de dependencias
- Archivos de configuración (.gitignore, .env.example)

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Checklist de Completitud - Actividad 1:

- [ ] Proyecto inicializado con Git y npm
- [ ] Estructura de carpetas completa creada
- [ ] Archivos de configuración creados
- [ ] Dependencias instaladas correctamente
- [ ] Primer commit realizado

## Actividad 2: Configurar Base de Datos

**Tiempo estimado**: 1 hora

**Qué vas a hacer**: Configurar PostgreSQL, crear la base de datos, ejecutar migraciones.

**Cómo Claude Code te ayuda**: Te guiará en la configuración completa de BD.

### Paso 2.1: Crear Base de Datos

Asegúrate de que PostgreSQL esté corriendo:

```bash
# Verificar que PostgreSQL está instalado y corriendo
psql --version

# Si no está corriendo, inícialo (depende del OS)
# macOS con Homebrew:
brew services start postgresql@15

# Linux:
sudo service postgresql start

# Windows: Inicia el servicio desde Servicios
```

Ahora crea tu base de datos:

```bash
# Accede a PostgreSQL como superuser
psql postgres

# Dentro de psql:
CREATE DATABASE nombre_de_tu_bd;  -- Reemplaza con el nombre de tu proyecto
\c nombre_de_tu_bd
\q
```

### Paso 2.2: Crear Script de Migración

**TÚ:**
```
Claude, necesito crear el script de migración completo para mi base de datos.

Ya diseñamos el esquema en la Lección 2. Necesito que generes el archivo
database/migrations/001_initial_schema.sql con:

- Creación de todas las tablas
- Constraints completos
- Índices
- Comentarios
- DROP TABLE IF EXISTS (para poder re-ejecutar)

Usa el esquema que diseñamos: [pega el esquema de tu Lección 2]
```

Claude Code generará el SQL completo. Guárdalo en `database/migrations/001_initial_schema.sql`.

**Ejemplo:**
```sql
-- database/migrations/001_initial_schema.sql
-- Migración inicial: Crear esquema completo

-- Eliminar tablas si existen (orden inverso por foreign keys)
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Tabla users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- [Continúa con todas tus tablas...]

-- Índices
CREATE INDEX idx_users_email ON users(email);
-- [Continúa con todos tus índices...]

-- Comentarios
COMMENT ON TABLE users IS 'Usuarios del sistema';
-- [Continúa con comentarios...]
```

### Paso 2.3: Crear Script de Seed Data

Si tu proyecto necesita datos iniciales (ej: categorías predefinidas):

**TÚ:**
```
Claude, genera el script de seed data para database/seeds/001_seed_data.sql
con [descripción de qué datos necesitas inicialmente].
```

### Paso 2.4: Ejecutar Migraciones

```bash
# Ejecutar migración
psql -U tu_usuario -d nombre_de_tu_bd -f database/migrations/001_initial_schema.sql

# Si tienes seed data:
psql -U tu_usuario -d nombre_de_tu_bd -f database/seeds/001_seed_data.sql

# Verificar que las tablas se crearon
psql -U tu_usuario -d nombre_de_tu_bd
\dt  # Listar tablas
\d users  # Ver estructura de tabla users
\q
```

### Paso 2.5: Configurar Conexión en Código

**TÚ:**
```
Claude, genera src/config/database.js para conectar a PostgreSQL usando pg.
Debe:
- Usar variables de entorno
- Manejar errores de conexión
- Logging de eventos (connect, error)
```

**Claude Code generará:**

```javascript
// src/config/database.js
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

// Función para probar la conexión
async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Test de conexión exitoso:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('❌ Error en test de conexión:', error.message);
    return false;
  }
}

module.exports = { pool, testConnection };
```

Guarda este archivo y actualiza tu `.env`:

```
DATABASE_URL=postgresql://tu_usuario:tu_password@localhost:5432/nombre_de_tu_bd
```

### Paso 2.6: Probar la Conexión

Crea un archivo temporal para probar:

```javascript
// test-db.js (temporal)
const { testConnection } = require('./src/config/database');

testConnection().then(() => {
  console.log('Base de datos lista!');
  process.exit(0);
}).catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
```

```bash
node test-db.js
# Deberías ver: ✅ Test de conexión exitoso: ...
```

Si funciona, borra `test-db.js`.

### Paso 2.7: Commit de Base de Datos

```bash
git add database/ src/config/database.js .env.example
git commit -m "feat: configurar base de datos PostgreSQL

- Script de migración inicial con todas las tablas
- Script de seed data
- Configuración de conexión con pg pool
- Test de conexión exitoso

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Checklist de Completitud - Actividad 2:

- [ ] Base de datos PostgreSQL creada
- [ ] Script de migración ejecutado correctamente
- [ ] Tablas creadas con constraints e índices
- [ ] Seed data cargado (si aplica)
- [ ] Archivo database.js configurado
- [ ] Conexión probada exitosamente
- [ ] Commit realizado

## Actividad 3: Implementar Autenticación Completa

**Tiempo estimado**: 4-6 horas

**Qué vas a hacer**: Implementar registro, login y middleware de autenticación. Esta es tu feature CORE.

**Cómo Claude Code te ayuda**: Generará cada archivo completo, explicará decisiones de diseño.

### Paso 3.1: Crear Utilidades Base

Primero necesitas logger y helpers.

**TÚ:**
```
Claude, genera src/utils/logger.js usando Winston con:
- Logs en consola (colorizado en dev)
- Logs en archivo (daily rotate)
- Niveles: error, warn, info, http, debug
- Formato con timestamp
```

**Claude Code generará el logger completo. Guárdalo.**

### Paso 3.2: Modelo de User

**TÚ:**
```
Claude, genera src/models/User.js con estos métodos:
- create({ name, email, password }): Crear usuario con password hasheado
- findByEmail(email): Buscar usuario por email
- findById(id): Buscar usuario por ID
- verifyPassword(plainPassword, hashedPassword): Comparar passwords

Usa bcrypt para hashing. Retorna usuarios SIN el password en respuestas.
```

**Claude Code generará:**

```javascript
// src/models/User.js
const { pool } = require('../config/database');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

class User {
  /**
   * Crear nuevo usuario
   */
  static async create({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    `;

    const result = await pool.query(query, [name, email, hashedPassword]);
    return result.rows[0];
  }

  /**
   * Buscar usuario por email (incluye password para login)
   */
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  /**
   * Buscar usuario por ID (sin password)
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

### Paso 3.3: Servicio de Autenticación

**TÚ:**
```
Claude, genera src/services/authService.js con:
- register({ name, email, password }): Registrar nuevo usuario
- login({ email, password }): Autenticar usuario
- generateToken(userId): Generar JWT
- verifyToken(token): Verificar JWT

Incluye validaciones:
- Email no duplicado en register
- Credenciales válidas en login
- Token válido en verifyToken
```

**Claude Code generará:**

```javascript
// src/services/authService.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

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
    logger.info(`Usuario registrado: ${email}`);

    // Generar token
    const token = this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.created_at
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

    logger.info(`Login exitoso: ${email}`);

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
      throw new Error('Token inválido o expirado');
    }
  }
}

module.exports = new AuthService();
```

### Paso 3.4: Validadores

**TÚ:**
```
Claude, genera src/validators/authValidator.js con esquemas Joi para:
- register: name (2-100 chars), email válido, password (min 8 chars, con mayúscula, minúscula, número, símbolo)
- login: email válido, password requerido
```

Claude Code generará los esquemas Joi completos.

### Paso 3.5: Middleware de Validación

**TÚ:**
```
Claude, genera src/middleware/validation.middleware.js que:
- Recibe un schema Joi
- Valida req.body contra el schema
- Si hay errores, responde 400 con lista de errores
- Si es válido, continúa con next()
```

### Paso 3.6: Controller de Autenticación

**TÚ:**
```
Claude, genera src/controllers/authController.js con:
- register(req, res, next): Manejar registro
- login(req, res, next): Manejar login
- getMe(req, res, next): Obtener perfil del usuario autenticado

Usa try-catch y pasa errores a next(error).
Responde con formato: { success: true/false, message, data }
```

### Paso 3.7: Middleware de Autenticación

**TÚ:**
```
Claude, genera src/middleware/auth.middleware.js con función authenticate que:
- Extrae token del header Authorization: Bearer <token>
- Verifica el token con authService
- Busca el usuario por ID
- Agrega req.user con los datos del usuario
- Si falla, responde 401 Unauthorized
```

### Paso 3.8: Routes de Autenticación

**TÚ:**
```
Claude, genera src/routes/auth.routes.js con:
- POST /register (con validación)
- POST /login (con validación)
- GET /me (con autenticación)
```

**Claude Code generará:**

```javascript
// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate } = require('../middleware/validation.middleware');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const { authenticate } = require('../middleware/auth.middleware');

// POST /api/v1/auth/register
router.post('/register', validate(registerSchema), authController.register);

// POST /api/v1/auth/login
router.post('/login', validate(loginSchema), authController.login);

// GET /api/v1/auth/me
router.get('/me', authenticate, authController.getMe);

module.exports = router;
```

### Paso 3.9: Middleware de Manejo de Errores

**TÚ:**
```
Claude, genera src/middleware/error.middleware.js con función errorHandler que:
- Logea el error
- Responde con formato consistente
- Maneja diferentes tipos de errores (validación, autenticación, etc.)
- En producción, no expone stack traces
```

### Paso 3.10: Configurar Express App

**TÚ:**
```
Claude, genera src/app.js que:
- Configure Express
- Use middleware: helmet, cors, express.json, rate limiting
- Monte las rutas de auth en /api/v1/auth
- Use el error handler al final
- Tenga ruta GET /health
```

**Claude Code generará:**

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
  max: 100,
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

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Rutas
app.use('/api/v1/auth', authRoutes);

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

### Paso 3.11: Server Entry Point

**TÚ:**
```
Claude, genera src/server.js que:
- Importe app.js
- Verifique conexión a BD antes de iniciar
- Inicie el servidor en process.env.PORT
- Maneje graceful shutdown
```

### Paso 3.12: Agregar JWT_SECRET a .env

**IMPORTANTE:** Genera un secreto seguro:

```bash
# Generar secreto aleatorio
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copia el output y agrégalo a tu `.env`:

```
JWT_SECRET=el-secreto-que-generaste-aqui
JWT_EXPIRES_IN=7d
```

### Paso 3.13: Probar Tu Autenticación

Inicia el servidor:

```bash
npm run dev
# Deberías ver:
# ✅ Conectado a PostgreSQL
# 🚀 Servidor corriendo en puerto 3000
```

**Test 1: Health Check**

```bash
curl http://localhost:3000/health
# Debería responder: {"status":"OK","timestamp":"..."}
```

**Test 2: Registro**

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tu Nombre",
    "email": "tu@email.com",
    "password": "Password123!"
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
      "name": "Tu Nombre",
      "email": "tu@email.com",
      "createdAt": "..."
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**COPIA EL TOKEN para los siguientes tests.**

**Test 3: Login**

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "tu@email.com",
    "password": "Password123!"
  }'
```

**Test 4: Obtener Perfil (con autenticación)**

```bash
curl http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

**Si TODOS los tests funcionan: ¡FELICITACIONES! Tu autenticación funciona perfectamente.**

### Paso 3.14: Commit de Autenticación

```bash
git add src/
git commit -m "feat: implementar autenticación completa

- Modelo User con bcrypt hashing
- Servicio de autenticación con JWT
- Validadores Joi para registro y login
- Middleware de autenticación
- Controller y routes de auth
- Manejo centralizado de errores
- Tests manuales exitosos

Features completadas:
✅ Registro de usuarios
✅ Login con JWT
✅ Endpoint protegido /me
✅ Validaciones robustas

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Checklist de Completitud - Actividad 3:

- [ ] Modelo User implementado y probado
- [ ] Servicio de autenticación completo
- [ ] Validadores Joi funcionando
- [ ] Middleware de autenticación funcionando
- [ ] Controller de auth implementado
- [ ] Routes de auth configuradas
- [ ] Error handler centralizado
- [ ] Express app configurado
- [ ] Servidor iniciando correctamente
- [ ] Tests manuales todos exitosos
- [ ] Commit realizado

## Checkpoint: Autoevaluación

Verifica que tengas TODO funcionando:

**Infraestructura:**
- [ ] Proyecto inicializado con Git
- [ ] Estructura de carpetas completa
- [ ] Dependencias instaladas
- [ ] Variables de entorno configuradas

**Base de Datos:**
- [ ] PostgreSQL corriendo
- [ ] Base de datos creada
- [ ] Tablas creadas correctamente
- [ ] Conexión desde código funcionando

**Autenticación:**
- [ ] Puedo registrar usuarios nuevos
- [ ] Puedo hacer login con credenciales válidas
- [ ] Recibo JWT al registrarme/hacer login
- [ ] Puedo acceder a /me con el token
- [ ] Validaciones rechazan datos inválidos
- [ ] Contraseñas se hashean correctamente

**Código:**
- [ ] Código limpio y bien organizado
- [ ] Sin errores de sintaxis
- [ ] Sin warnings importantes
- [ ] Logs aparecen correctamente

**Git:**
- [ ] Al menos 2 commits realizados
- [ ] Mensajes de commit claros

**Si marcaste TODO, estás listo para la siguiente lección.**

## Problemas Comunes en Esta Fase

### Problema 1: "Error: Cannot find module 'bcrypt'"

❌ **Causa:** Dependencia no instalada correctamente.

✅ **Solución:**
```bash
npm install bcrypt
# Si falla (problemas de compilación):
npm install bcryptjs  # Alternativa en JS puro
```

### Problema 2: "Error: connect ECONNREFUSED"

❌ **Causa:** PostgreSQL no está corriendo o credenciales incorrectas.

✅ **Solución:**
```bash
# Verificar que PostgreSQL esté corriendo
psql postgres
# Si falla, iniciarlo
brew services start postgresql@15  # macOS
sudo service postgresql start  # Linux
```

### Problema 3: "Error: secret or public key must be provided"

❌ **Causa:** JWT_SECRET no está en .env o no se está leyendo.

✅ **Solución:**
- Verifica que .env existe y tiene JWT_SECRET
- Verifica que estás ejecutando `require('dotenv').config()` ANTES de usar variables
- Verifica que .env NO está en .gitignore accidentalmente

### Problema 4: "ValidationError: password fails to match..."

❌ **Causa:** Password no cumple requisitos de Joi.

✅ **Solución:**
- Verifica el schema de validación
- Asegúrate que el password de prueba tenga: mayúscula, minúscula, número, símbolo
- Mínimo 8 caracteres

### Problema 5: "El servidor no inicia / puerto en uso"

❌ **Causa:** Puerto 3000 ya está siendo usado.

✅ **Solución:**
```bash
# Ver qué está usando el puerto
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Matar el proceso o cambiar puerto en .env
PORT=3001
```

## Recursos y Referencias

### Testing Manual:
- **Postman**: Descargar colección de requests
- **curl**: Herramienta de línea de comandos
- **REST Client** (VS Code extension): Crear archivos .http

### Debugging:
- **console.log**: Logging básico
- **VS Code Debugger**: Breakpoints en código
- **Postman Console**: Ver requests/responses completos

### Documentación:
- Express.js docs
- PostgreSQL docs
- JWT.io (decodificar tokens)
- Joi validation docs

## Preparación para la Siguiente Lección

Para estar listo para **Lección 4: Desarrollo de Features y Funcionalidades**:

### Debes tener:
✅ Proyecto inicializado y corriendo
✅ Base de datos configurada
✅ Autenticación completa funcionando
✅ Al menos 2 commits en Git
✅ Todos los tests manuales pasando

### Próximos pasos (Lección 4):
En la siguiente lección implementarás:
- Todas las features MUST HAVE restantes
- CRUD completo de tus entidades principales
- Filtros y búsqueda
- Relaciones entre entidades
- Validaciones avanzadas

### Prepara:
✅ Lista de features MUST HAVE pendientes
✅ Diseño de API (de Lección 2) a mano
✅ Postman o similar para testing
✅ Energía y motivación (viene lo mejor!)

## Conversación Final con Claude Code para Esta Lección

**TÚ:**
```
Claude, he completado el setup de mi proyecto y tengo la autenticación funcionando.

Antes de pasar a la siguiente lección, revisa mi progreso:

1. ¿Mi código de autenticación sigue mejores prácticas?
2. ¿Hay vulnerabilidades de seguridad evidentes?
3. ¿La estructura de archivos es apropiada?
4. ¿Qué debería mejorar antes de continuar?
5. ¿Estoy listo para implementar las siguientes features?

[Opcional: pega fragmentos de código para review]
```

Claude Code te dará feedback y confirmará si estás listo.

## Reflexión Final de la Lección

Tómate 10 minutos para reflexionar:

**¿Cómo me siento después de ver mi proyecto funcionando por primera vez?**
- [Tu respuesta]

**¿Qué fue lo más desafiante de esta lección?**
- [Tu respuesta]

**¿Qué aprendí sobre setup de proyectos?**
- [Tu respuesta]

**¿Qué mejoré en mi habilidad de trabajar con Claude Code?**
- [Tu respuesta]

**¿Qué haré diferente en la próxima lección?**
- [Tu respuesta]

---

## Resumen

Has completado el setup del proyecto con:
- Proyecto inicializado (Git + npm)
- Base de datos PostgreSQL configurada
- Autenticación completa implementada (registro, login, JWT)
- Servidor funcionando correctamente
- Primeros commits realizados

En la Lección 4 implementarás todas las features MUST HAVE de tu proyecto.

---

**Módulo 9 - Lección 3 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
