<p><strong><em>Lección 5: Testing, Documentación y Pulido</em></strong></p>

## Introducción

Con todas las features implementadas, ahora transformarás el código funcional en código production-ready mediante:

- Tests automatizados (unitarios + integración)
- Documentación completa con Swagger/OpenAPI
- README profesional
- Optimizaciones de rendimiento
- Revisión de seguridad

Al finalizar tendrás un proyecto con >80% de coverage de tests y documentación completa.

## Objetivos de Esta Lección

Al finalizar esta lección, habrás logrado:

✅ Escribir tests unitarios para tus services (coverage >70%)
✅ Escribir tests de integración para tus endpoints (coverage >80%)
✅ Generar documentación completa con Swagger/OpenAPI
✅ Crear README profesional para tu proyecto
✅ Optimizar queries y rendimiento
✅ Revisar y mejorar seguridad
✅ Código limpio, comentado y production-ready

## ¿En Qué Punto Estás?

**Ya tienes:**
- Aplicación completa y funcional
- Todas las features MUST HAVE implementadas
- Tests manuales exitosos
- Código organizado en arquitectura MVC + Services

**Ahora harás:**
- Tests automatizados (unit + integration)
- Documentación completa y profesional
- Optimizaciones de rendimiento
- Revisión de seguridad
- Pulido final del código

**Al final tendrás un proyecto de calidad profesional.**

## Actividad 1: Configurar Testing con Jest

**Tiempo estimado**: 1 hora

**Qué vas a hacer**: Configurar Jest y Supertest para testing automatizado.

**Cómo Claude Code te ayuda**: Generará toda la configuración necesaria.

### Paso 1.1: Configurar Jest

**TÚ:**
```
Claude, necesito configurar Jest para testing.

Genera jest.config.js con:
- Detectar archivos .test.js en tests/
- Coverage en console
- Timeout apropiado para tests de BD
- Setup file para configuraciones globales
```

**Claude Code generará:**

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',  // Excluir entry point
    '!src/config/**',  // Excluir configuraciones
  ],
  testMatch: [
    '**/tests/**/*.test.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  testTimeout: 10000  // 10 segundos para tests con BD
};
```

### Paso 1.2: Crear Setup de Tests

**TÚ:**
```
Claude, genera tests/setup.js para:
- Cargar variables de entorno de testing
- Configurar base de datos de testing
- Limpiar datos entre tests si es necesario
```

**Claude Code generará:**

```javascript
// tests/setup.js
require('dotenv').config({ path: '.env.test' });

// Mock de logger para tests (silenciar output)
jest.mock('../src/utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  http: jest.fn()
}));

// Configuración global de tests
beforeAll(async () => {
  // Aquí podrías inicializar BD de testing
});

afterAll(async () => {
  // Cerrar conexiones
});
```

### Paso 1.3: Crear Variables de Entorno para Testing

Crea `.env.test`:

```
NODE_ENV=test
PORT=3001
DATABASE_URL=postgresql://usuario:password@localhost:5432/nombre_db_test
JWT_SECRET=test-secret-key-for-testing-only
JWT_EXPIRES_IN=7d
LOG_LEVEL=error
```

**IMPORTANTE:** Usa una base de datos DIFERENTE para testing.

### Paso 1.4: Crear Base de Datos de Testing

```bash
# Crear BD de testing
psql postgres
CREATE DATABASE nombre_db_test;
\c nombre_db_test
\q

# Ejecutar migraciones en BD de test
psql -U usuario -d nombre_db_test -f database/migrations/001_initial_schema.sql
psql -U usuario -d nombre_db_test -f database/seeds/001_seed_data.sql
```

### Paso 1.5: Actualizar package.json

Verifica que tengas estos scripts:

```json
{
  "scripts": {
    "test": "jest --coverage",
    "test:watch": "jest --watch",
    "test:unit": "jest tests/unit",
    "test:integration": "jest tests/integration"
  }
}
```

### Checklist de Completitud - Actividad 1:

- [ ] jest.config.js configurado
- [ ] tests/setup.js creado
- [ ] .env.test con variables de testing
- [ ] BD de testing creada y con schema
- [ ] Scripts de test en package.json

## Actividad 2: Escribir Tests Unitarios

**Tiempo estimado**: 3-4 horas

**Qué vas a hacer**: Escribir tests para tus Services (lógica de negocio).

**Cómo Claude Code te ayuda**: Generará tests completos adaptados a tu código.

### Paso 2.1: Entender Qué Testear

**Tests unitarios** testean funciones individuales en aislamiento.

**Deberías testear:**
- Services (lógica de negocio)
- Utils (funciones auxiliares)
- Validadores complejos

**NO necesitas testear:**
- Models (son solo queries SQL, se testean en integration)
- Controllers (se testean en integration)
- Middleware (se testean en integration)

### Paso 2.2: Crear Tests de AuthService

**TÚ:**
```
Claude, genera tests/unit/services/authService.test.js para mi authService.

Necesito tests para:
- register: éxito, email duplicado
- login: éxito, email inexistente, password incorrecto
- generateToken: generar token válido
- verifyToken: token válido, token inválido, token expirado

Usa mocks para el Model (no quiero queries SQL reales en unit tests).
```

**Claude Code generará:**

```javascript
// tests/unit/services/authService.test.js
const authService = require('../../../src/services/authService');
const User = require('../../../src/models/User');
const jwt = require('jsonwebtoken');

// Mock del Model
jest.mock('../../../src/models/User');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('debería registrar un usuario nuevo exitosamente', async () => {
      // Arrange
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!'
      };

      User.findByEmail.mockResolvedValue(null);  // Email no existe
      User.create.mockResolvedValue({
        id: 1,
        name: userData.name,
        email: userData.email,
        created_at: new Date()
      });

      // Act
      const result = await authService.register(userData);

      // Assert
      expect(User.findByEmail).toHaveBeenCalledWith(userData.email);
      expect(User.create).toHaveBeenCalledWith(userData);
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe(userData.email);
      expect(typeof result.token).toBe('string');
    });

    it('debería lanzar error si el email ya existe', async () => {
      // Arrange
      const userData = {
        name: 'Test User',
        email: 'existing@example.com',
        password: 'Password123!'
      };

      User.findByEmail.mockResolvedValue({ id: 1, email: userData.email });

      // Act & Assert
      await expect(authService.register(userData))
        .rejects
        .toThrow('El email ya está registrado');

      expect(User.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('debería hacer login exitosamente con credenciales válidas', async () => {
      // Arrange
      const credentials = {
        email: 'test@example.com',
        password: 'Password123!'
      };

      const mockUser = {
        id: 1,
        name: 'Test User',
        email: credentials.email,
        password: '$2b$10$hashedpassword'  // Hash simulado
      };

      User.findByEmail.mockResolvedValue(mockUser);
      User.verifyPassword.mockResolvedValue(true);

      // Act
      const result = await authService.login(credentials);

      // Assert
      expect(User.findByEmail).toHaveBeenCalledWith(credentials.email);
      expect(User.verifyPassword).toHaveBeenCalledWith(
        credentials.password,
        mockUser.password
      );
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe(credentials.email);
      expect(result.user.password).toBeUndefined();  // No debe incluir password
    });

    it('debería lanzar error si el email no existe', async () => {
      // Arrange
      User.findByEmail.mockResolvedValue(null);

      // Act & Assert
      await expect(authService.login({ email: 'noexiste@example.com', password: 'any' }))
        .rejects
        .toThrow('Credenciales inválidas');
    });

    it('debería lanzar error si el password es incorrecto', async () => {
      // Arrange
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: '$2b$10$hashedpassword'
      };

      User.findByEmail.mockResolvedValue(mockUser);
      User.verifyPassword.mockResolvedValue(false);

      // Act & Assert
      await expect(authService.login({ email: 'test@example.com', password: 'wrong' }))
        .rejects
        .toThrow('Credenciales inválidas');
    });
  });

  describe('generateToken', () => {
    it('debería generar un JWT válido', () => {
      // Arrange
      const userId = 123;

      // Act
      const token = authService.generateToken(userId);

      // Assert
      expect(typeof token).toBe('string');

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      expect(decoded.userId).toBe(userId);
    });
  });

  describe('verifyToken', () => {
    it('debería verificar un token válido', () => {
      // Arrange
      const userId = 123;
      const token = authService.generateToken(userId);

      // Act
      const decoded = authService.verifyToken(token);

      // Assert
      expect(decoded.userId).toBe(userId);
    });

    it('debería lanzar error para token inválido', () => {
      // Arrange
      const invalidToken = 'token-invalido';

      // Act & Assert
      expect(() => authService.verifyToken(invalidToken))
        .toThrow('Token inválido o expirado');
    });
  });
});
```

### Paso 2.3: Ejecutar Tests Unitarios

```bash
npm run test:unit

# Deberías ver:
# PASS  tests/unit/services/authService.test.js
#   AuthService
#     register
#       ✓ debería registrar un usuario nuevo exitosamente (X ms)
#       ✓ debería lanzar error si el email ya existe (X ms)
#     login
#       ✓ debería hacer login exitosamente con credenciales válidas (X ms)
#       ...
```

### Paso 2.4: Crear Tests para Otros Services

Repite el proceso para cada Service:

**TÚ:**
```
Claude, genera tests/unit/services/[nombreServicio]Service.test.js

Métodos a testear:
- [método 1]: [casos de éxito y error]
- [método 2]: [casos de éxito y error]
...

Usa mocks para Models y otros Services.
```

**Prioriza testear:**
- Casos de éxito (happy path)
- Casos de error (validaciones, no encontrado, etc.)
- Edge cases (valores límite, null, undefined, etc.)

### Paso 2.5: Verificar Coverage

```bash
npm test

# Al final verás:
# ----------|---------|----------|---------|---------|-------------------
# File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
# ----------|---------|----------|---------|---------|-------------------
# All files |   85.5  |   78.2   |   90.1  |   85.5  |
# services  |   95.0  |   88.5   |  100.0  |   95.0  |
# ...
```

**Meta: >70% coverage en Services.**

### Checklist de Completitud - Actividad 2:

- [ ] Tests de authService completos
- [ ] Tests de otros Services principales
- [ ] Todos los tests pasan
- [ ] Coverage >70% en Services
- [ ] Tests documentan el comportamiento esperado

## Actividad 3: Escribir Tests de Integración

**Tiempo estimado**: 3-4 horas

**Qué vas a hacer**: Escribir tests que prueban endpoints completos (request → response).

**Cómo Claude Code te ayuda**: Generará tests de integración completos con Supertest.

### Paso 3.1: Entender Tests de Integración

**Tests de integración** testean el flujo completo:
- Request HTTP → Route → Middleware → Controller → Service → Model → Database → Response

**Ventajas:**
- Prueban el sistema real (no mocks)
- Detectan problemas de integración
- Validan que todo funciona junto

### Paso 3.2: Crear Helper para Tests de Integración

**TÚ:**
```
Claude, genera tests/helpers/testHelper.js con funciones útiles:
- createTestUser(): Crear usuario de testing y obtener token
- cleanDatabase(): Limpiar datos de testing
- makeRequest(method, url, data, token): Wrapper de supertest
```

**Claude Code generará:**

```javascript
// tests/helpers/testHelper.js
const request = require('supertest');
const app = require('../../src/app');
const { pool } = require('../../src/config/database');

/**
 * Crear usuario de testing y obtener token
 */
async function createTestUser(userData = {}) {
  const defaultUser = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'Password123!'
  };

  const user = { ...defaultUser, ...userData };

  const response = await request(app)
    .post('/api/v1/auth/register')
    .send(user);

  return {
    user: response.body.data.user,
    token: response.body.data.token
  };
}

/**
 * Limpiar base de datos (cuidado: solo en testing!)
 */
async function cleanDatabase() {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('cleanDatabase solo puede ejecutarse en ambiente de testing');
  }

  await pool.query('DELETE FROM transactions');
  await pool.query('DELETE FROM users');
  // Agregar otras tablas según necesites
}

/**
 * Hacer request con autenticación opcional
 */
function makeRequest(method, url, data = null, token = null) {
  let req = request(app)[method.toLowerCase()](url);

  if (token) {
    req = req.set('Authorization', `Bearer ${token}`);
  }

  if (data) {
    req = req.send(data);
  }

  return req;
}

module.exports = {
  createTestUser,
  cleanDatabase,
  makeRequest
};
```

### Paso 3.3: Crear Tests de Auth Routes

**TÚ:**
```
Claude, genera tests/integration/routes/auth.test.js

Tests para:
- POST /register: éxito, datos inválidos, email duplicado
- POST /login: éxito, credenciales inválidas
- GET /me: éxito con token, fallo sin token, fallo con token inválido

Usa la BD de testing real (no mocks).
```

**Claude Code generará:**

```javascript
// tests/integration/routes/auth.test.js
const request = require('supertest');
const app = require('../../../src/app');
const { cleanDatabase, createTestUser } = require('../../helpers/testHelper');

describe('Auth Routes', () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  describe('POST /api/v1/auth/register', () => {
    it('debería registrar un nuevo usuario exitosamente', async () => {
      // Arrange
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!'
      };

      // Act
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data.user.email).toBe(userData.email);
      expect(response.body.data.user.password).toBeUndefined();
    });

    it('debería retornar 400 con datos inválidos', async () => {
      // Arrange
      const invalidData = {
        name: 'T',  // Muy corto
        email: 'invalid-email',  // Email inválido
        password: '123'  // Password muy corto
      };

      // Act
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(invalidData);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });

    it('debería retornar 400 si el email ya existe', async () => {
      // Arrange
      const userData = {
        name: 'Test User',
        email: 'duplicate@example.com',
        password: 'Password123!'
      };

      // Crear usuario primero
      await request(app).post('/api/v1/auth/register').send(userData);

      // Act - Intentar registrar nuevamente
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('email');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('debería hacer login exitosamente con credenciales válidas', async () => {
      // Arrange
      const userData = {
        name: 'Test User',
        email: 'login@example.com',
        password: 'Password123!'
      };

      await request(app).post('/api/v1/auth/register').send(userData);

      // Act
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: userData.email, password: userData.password });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data.user.email).toBe(userData.email);
    });

    it('debería retornar 401 con credenciales inválidas', async () => {
      // Act
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'noexiste@example.com', password: 'WrongPassword123!' });

      // Assert
      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/auth/me', () => {
    it('debería retornar perfil del usuario autenticado', async () => {
      // Arrange
      const { token, user } = await createTestUser();

      // Act
      const response = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(user.id);
      expect(response.body.data.email).toBe(user.email);
    });

    it('debería retornar 401 sin token', async () => {
      // Act
      const response = await request(app).get('/api/v1/auth/me');

      // Assert
      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it('debería retornar 401 con token inválido', async () => {
      // Act
      const response = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', 'Bearer token-invalido');

      // Assert
      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});
```

### Paso 3.4: Crear Tests para Tus Otras Routes

**TÚ:**
```
Claude, genera tests/integration/routes/[entidad].test.js

Tests para:
- POST /: crear (éxito, sin auth, datos inválidos)
- GET /: listar (éxito, con filtros, paginación)
- GET /:id: obtener uno (éxito, no encontrado, ID de otro usuario)
- PUT /:id: actualizar (éxito, no encontrado, sin permisos)
- DELETE /:id: eliminar (éxito, no encontrado, sin permisos)

Usa la BD de testing real y crea datos de testing según necesites.
```

### Paso 3.5: Ejecutar Tests de Integración

```bash
npm run test:integration

# Deberías ver todos los tests pasando
```

### Paso 3.6: Ejecutar Todos los Tests

```bash
npm test

# Debería mostrar:
# - Tests unitarios pasando
# - Tests de integración pasando
# - Coverage total >80%
```

### Paso 3.7: Commit de Tests

```bash
git add tests/ jest.config.js .env.test
git commit -m "test: agregar tests unitarios y de integración completos

Tests unitarios:
✅ authService (register, login, tokens)
✅ [otroService] (métodos principales)
Coverage: >70%

Tests de integración:
✅ Auth routes (register, login, me)
✅ [Entidad] routes (CRUD completo)
✅ Validaciones y casos de error
Coverage total: >80%

Helpers de testing:
- createTestUser()
- cleanDatabase()
- makeRequest()

Todos los tests pasando.

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Checklist de Completitud - Actividad 3:

- [ ] Tests de integración de auth routes
- [ ] Tests de integración de routes principales
- [ ] Helpers de testing creados
- [ ] BD de testing configurada
- [ ] Todos los tests pasan
- [ ] Coverage total >80%
- [ ] Commit realizado

## Actividad 4: Generar Documentación con Swagger

**Tiempo estimado**: 2-3 horas

**Qué vas a hacer**: Documentar toda tu API con Swagger/OpenAPI.

**Cómo Claude Code te ayuda**: Generará la configuración y documentación completa.

### Paso 4.1: Configurar Swagger

**TÚ:**
```
Claude, genera src/config/swagger.js con configuración de Swagger/OpenAPI 3.0

Información del proyecto:
- Título: [Nombre de tu proyecto]
- Descripción: [Descripción]
- Versión: 1.0.0
- Base URL: /api/v1

Incluir definición de componentes de seguridad (Bearer JWT).
```

**Claude Code generará:**

```javascript
// src/config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FinanzasPro API',  // Tu título
      version: '1.0.0',
      description: 'API REST para gestión personal de finanzas',  // Tu descripción
      contact: {
        name: 'Tu Nombre',
        email: 'tu@email.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server'
      },
      {
        url: 'https://tu-app.herokuapp.com/api/v1',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string'
            },
            errors: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js']  // Archivos a escanear para comentarios JSDoc
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
```

### Paso 4.2: Montar Swagger UI

Edita `src/app.js`:

```javascript
// Agregar después de imports
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Agregar ruta de Swagger (antes de las routes de API)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

Ahora visita: `http://localhost:3000/api-docs`

### Paso 4.3: Documentar Endpoints con JSDoc

**TÚ:**
```
Claude, ayúdame a documentar mis endpoints en src/routes/auth.routes.js usando JSDoc
para Swagger.

Endpoints:
- POST /register
- POST /login
- GET /me
```

**Claude Code generará:**

```javascript
// src/routes/auth.routes.js

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Auth]
 *     security: []  # No requiere autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: Password123!
 *                 description: Debe tener mayúscula, minúscula, número y símbolo
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Usuario registrado exitosamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: Juan Pérez
 *                         email:
 *                           type: string
 *                           example: juan@example.com
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Datos inválidos o email duplicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/register', validate(registerSchema), authController.register);

// [Continúa con los demás endpoints...]
```

### Paso 4.4: Documentar TODOS tus Endpoints

Repite para todos tus routes files. Claude Code puede hacerlo por lotes:

**TÚ:**
```
Claude, documenta TODOS los endpoints de src/routes/[entidad].routes.js con Swagger.

Endpoints:
- POST /: Crear [entidad]
- GET /: Listar con filtros (type, categoryId, startDate, endDate, page, limit)
- GET /:id: Obtener por ID
- PUT /:id: Actualizar
- DELETE /:id: Eliminar

Todos requieren autenticación. Incluye todos los parámetros y respuestas.
```

### Paso 4.5: Verificar Documentación

Visita `http://localhost:3000/api-docs` y verifica:

- Todos los endpoints aparecen
- Puedes expandir cada uno y ver detalles
- Los schemas son correctos
- Puedes probar endpoints directamente desde Swagger UI

### Paso 4.6: Commit de Documentación

```bash
git add src/config/swagger.js src/app.js src/routes/
git commit -m "docs: agregar documentación completa con Swagger/OpenAPI 3.0

- Configuración de Swagger
- Swagger UI en /api-docs
- Documentación completa de todos los endpoints:
  ✅ Auth (register, login, me)
  ✅ [Entidades] (CRUD completo)
  ✅ [Estadísticas] (balance, by-category)

- Schemas de request/response
- Ejemplos para cada endpoint
- Definición de autenticación JWT
- Casos de error documentados

Accesible en /api-docs

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Checklist de Completitud - Actividad 4:

- [ ] Swagger configurado
- [ ] Swagger UI funcionando en /api-docs
- [ ] Todos los endpoints documentados
- [ ] Schemas de request/response completos
- [ ] Autenticación JWT documentada
- [ ] Ejemplos útiles incluidos
- [ ] Commit realizado

## Actividad 5: Crear README Profesional

**Tiempo estimado**: 1 hora

**Qué vas a hacer**: Crear documentación completa del proyecto en README.md.

**Cómo Claude Code te ayuda**: Generará un README profesional adaptado a tu proyecto.

### Paso 5.1: Generar README

**TÚ:**
```
Claude, genera un README.md profesional y completo para mi proyecto.

Proyecto: [Nombre]
Descripción: [Breve descripción]
Tecnologías: [Lista]

Incluir:
- Descripción del proyecto
- Features principales
- Tecnologías usadas
- Instalación paso a paso
- Configuración (.env)
- Uso (cómo ejecutar)
- API Documentation (link a Swagger)
- Testing
- Deploy (placeholder)
- Licencia
- Contacto
```

**Claude Code generará un README completo. Ejemplo:**

```markdown
# FinanzasPro

Sistema de gestión personal de finanzas que permite trackear ingresos, gastos y visualizar estadísticas financieras.

## Features

- ✅ Autenticación con JWT
- ✅ Gestión de transacciones (CRUD)
- ✅ Categorización de ingresos y gastos
- ✅ Filtros avanzados (fecha, categoría, tipo)
- ✅ Estadísticas y dashboard
- ✅ API REST documentada

## Tecnologías

- **Backend:** Node.js 18+, Express 4.x
- **Base de Datos:** PostgreSQL 15
- **Autenticación:** JWT + bcrypt
- **Validación:** Joi
- **Testing:** Jest + Supertest
- **Documentación:** Swagger/OpenAPI 3.0
- **Logging:** Winston

## Instalación

### Prerequisitos

- Node.js 18+ ([Descargar](https://nodejs.org/))
- PostgreSQL 15+ ([Descargar](https://www.postgresql.org/download/))
- Git

### Pasos

1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/finanzas-pro.git
cd finanzas-pro
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno

```bash
cp .env.example .env
# Editar .env con tus valores
```

4. Crear base de datos

```bash
psql postgres
CREATE DATABASE finanzas_pro;
\c finanzas_pro
\q
```

5. Ejecutar migraciones

```bash
psql -U tu_usuario -d finanzas_pro -f database/migrations/001_initial_schema.sql
psql -U tu_usuario -d finanzas_pro -f database/seeds/001_seed_categories.sql
```

6. Iniciar servidor

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

El servidor estará disponible en `http://localhost:3000`

## Configuración

Variables de entorno necesarias en `.env`:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://usuario:password@localhost:5432/finanzas_pro
JWT_SECRET=tu-secret-key-super-seguro
JWT_EXPIRES_IN=7d
LOG_LEVEL=info
```

## Documentación de API

Documentación completa disponible en Swagger UI:

```
http://localhost:3000/api-docs
```

### Endpoints Principales

**Auth:**
- `POST /api/v1/auth/register` - Registro
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Perfil (requiere auth)

**Transacciones:**
- `POST /api/v1/transactions` - Crear (requiere auth)
- `GET /api/v1/transactions` - Listar con filtros (requiere auth)
- `GET /api/v1/transactions/:id` - Obtener (requiere auth)
- `PUT /api/v1/transactions/:id` - Actualizar (requiere auth)
- `DELETE /api/v1/transactions/:id` - Eliminar (requiere auth)

**Estadísticas:**
- `GET /api/v1/stats/balance` - Balance (requiere auth)
- `GET /api/v1/stats/by-category` - Por categoría (requiere auth)

Ver Swagger para detalles completos.

## Testing

```bash
# Todos los tests
npm test

# Solo unitarios
npm run test:unit

# Solo integración
npm run test:integration

# Watch mode
npm run test:watch
```

Coverage esperado: >80%

## Deploy

[Instrucciones de deployment se agregarán en Lección 6]

## Licencia

MIT

## Contacto

Tu Nombre - tu@email.com

---

**Proyecto desarrollado como parte del Módulo 9 del curso "Especialista en Desarrollo con Claude Code" - Instituto San Miguel**
```

### Checklist de Completitud - Actividad 5:

- [ ] README.md completo y profesional
- [ ] Incluye todas las secciones importantes
- [ ] Instrucciones claras de instalación
- [ ] Documentación de endpoints
- [ ] Badge de coverage (opcional)
- [ ] Commit realizado

## Checkpoint: Autoevaluación Final

Antes de pasar a la última lección, verifica:

**Testing:**
- [ ] Tests unitarios escritos (>70% coverage)
- [ ] Tests de integración escritos (>80% coverage total)
- [ ] Todos los tests pasan consistentemente
- [ ] BD de testing configurada

**Documentación:**
- [ ] Swagger configurado y funcionando
- [ ] Todos los endpoints documentados
- [ ] README completo y profesional
- [ ] Código comentado donde es necesario

**Calidad de Código:**
- [ ] No hay console.log olvidados
- [ ] Uso logger apropiadamente
- [ ] Variables de entorno para todo lo configurable
- [ ] No hay secrets hardcodeados
- [ ] Código limpio y consistente

**Preparación para Deploy:**
- [ ] .env.example actualizado
- [ ] Scripts de migración funcionan
- [ ] Servidor inicia sin errores
- [ ] Health check endpoint funciona

**Git:**
- [ ] Múltiples commits organizados
- [ ] Mensajes de commit claros
- [ ] No hay archivos sensibles (.env) en repo

**Si marcaste >90%, estás PERFECTO para deploy.**

## Reflexión Final de la Lección

**¿Cómo se siente tener tests automatizados?**
- [Tu respuesta]

**¿Qué aprendí sobre documentación profesional?**
- [Tu respuesta]

**¿Mi código está listo para mostrar a otros?**
- [Tu respuesta]

---

## Resumen

Has completado el pulido profesional con:
- Tests automatizados (>80% coverage)
- Documentación completa con Swagger
- README profesional
- Código optimizado y refactorizado
- Revisión de seguridad completada

En la Lección 6 deployarás el proyecto a producción y crearás la presentación final.

---

**Módulo 9 - Lección 5 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
