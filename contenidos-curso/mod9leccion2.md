<p><strong><em>Lección 2: Planificación y Arquitectura de Tu Proyecto</em></strong></p>

## Introducción

Con tu proyecto definido, ahora diseñarás la arquitectura técnica completa antes de escribir código. Esta planificación previa te permitirá:

- Desarrollar de forma consistente y organizada
- Evitar refactorizaciones mayores
- Tomar decisiones técnicas informadas
- Facilitar la colaboración con Claude Code

En esta lección diseñarás el plano técnico completo: arquitectura, API REST, esquema de base de datos y roadmap de desarrollo.

## Objetivos de Esta Lección

Al finalizar esta lección, habrás logrado:

✅ Diseñar la arquitectura completa de tu aplicación
✅ Elegir las tecnologías específicas y sus versiones
✅ Diseñar tu API REST con todos sus endpoints
✅ Crear un esquema detallado de base de datos con relaciones
✅ Planificar la estructura de carpetas y archivos
✅ Tener un roadmap de desarrollo granular semana por semana

## ¿En Qué Punto Estás?

**Ya tienes:**
- Tu proyecto elegido y especificado
- Features priorizadas (MUST/SHOULD/COULD/WON'T HAVE)
- Stack tecnológico general (Node.js, PostgreSQL, etc.)
- Plan de desarrollo por fases

**Ahora necesitas:**
- Arquitectura técnica DETALLADA
- Decisiones específicas de implementación
- Diseño completo de API
- Esquema de BD con todas las tablas y relaciones
- Estructura de proyecto completa

**Vamos a diseñarlo TODO con Claude Code.**

## Actividad 1: Diseñar la Arquitectura de Tu Aplicación

**Tiempo estimado**: 2-3 horas

**Qué vas a hacer**: Definir el patrón arquitectónico y la estructura de capas de tu aplicación.

**Cómo Claude Code te ayuda**: Claude Code es experto en patrones de arquitectura y te recomendará el mejor para TU proyecto.

### Paso 1.1: Conversación de Arquitectura con Claude Code

Abre Claude Code y comienza esta conversación (adaptada a TU proyecto):

**TÚ escribes:**
```
Claude, voy a diseñar la arquitectura de mi proyecto.

PROYECTO: [Nombre de tu proyecto]
TIPO: [Web app, API, Full-stack, etc.]
ESCALA: [Pequeño/Mediano - número estimado de usuarios]

FEATURES PRINCIPALES:
- [Feature 1]
- [Feature 2]
- [Feature 3]

STACK DECIDIDO:
- Backend: Node.js + Express
- Base de datos: PostgreSQL
- [Otros componentes]

Necesito que me ayudes a diseñar la arquitectura completa:

1. ¿Qué patrón arquitectónico me recomiendas? (MVC, MVC+Services, Clean Architecture, etc.)
2. ¿Qué capas debería tener mi aplicación?
3. ¿Cómo deberían comunicarse esas capas?
4. ¿Qué responsabilidad tiene cada capa?

Dame una explicación clara y un diagrama de la arquitectura.
```

**Claude Code responderá** con algo como:

```
Excelente, voy a diseñarte la arquitectura perfecta para tu proyecto.

ARQUITECTURA RECOMENDADA: MVC + Services Pattern
================================================

Para un proyecto de tu escala, te recomiendo una arquitectura en capas con
separación clara de responsabilidades. Es simple, escalable, y perfecta para
trabajar con Express.

CAPAS DE LA ARQUITECTURA:
========================

1. PRESENTATION LAYER (Capa de Presentación)
   - Routes: Define los endpoints de la API
   - Controllers: Manejan HTTP requests/responses
   - Middleware: Autenticación, validación, manejo de errores

2. BUSINESS LOGIC LAYER (Capa de Lógica de Negocio)
   - Services: Contienen toda la lógica de negocio
   - Validators: Reglas de validación complejas

3. DATA ACCESS LAYER (Capa de Acceso a Datos)
   - Models: Representación de entidades de BD
   - Repositories (opcional): Abstracción de queries

4. CROSS-CUTTING LAYER (Capa Transversal)
   - Utils: Funciones auxiliares
   - Config: Configuraciones
   - Logger: Sistema de logging

DIAGRAMA DE ARQUITECTURA:
=========================

┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Postman, Frontend, etc.)      │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP Request
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │  Routes  │─▶│Controller│◀─│    Middleware        │  │
│  │          │  │          │  │ (Auth, Validation,   │  │
│  └──────────┘  └─────┬────┘  │  Error Handling)     │  │
│                      │        └──────────────────────┘  │
└──────────────────────┼─────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                BUSINESS LOGIC LAYER                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Services                            │   │
│  │  - Lógica de negocio                             │   │
│  │  - Orquestación de operaciones                   │   │
│  │  - Validaciones complejas                        │   │
│  └────────────────────┬─────────────────────────────┘   │
└───────────────────────┼──────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                  DATA ACCESS LAYER                       │
│  ┌──────────┐                ┌──────────────────────┐  │
│  │  Models  │────────────────│   Repositories       │  │
│  │          │                │   (Query Builders)   │  │
│  └─────┬────┘                └──────────┬───────────┘  │
└────────┼────────────────────────────────┼───────────────┘
         │                                │
         ▼                                ▼
┌─────────────────────────────────────────────────────────┐
│                    DATABASE (PostgreSQL)                 │
└─────────────────────────────────────────────────────────┘

         ┌──────────────────────────────────────┐
         │      CROSS-CUTTING CONCERNS          │
         │  (Logger, Config, Utils, etc.)       │
         │  ← Usados por todas las capas        │
         └──────────────────────────────────────┘


FLUJO DE UNA REQUEST:
====================

Request llega → Route → Middleware → Controller → Service → Model/Repository → Database
                                                     ↓
                                              Business Logic
                                                     ↓
Response ← Controller ← Service ← Model/Repository ← Database


RESPONSABILIDADES DE CADA CAPA:
===============================

ROUTES (routes/):
- Definir endpoints y métodos HTTP
- Asociar middleware apropiado
- Delegar a controllers
- NO contener lógica de negocio

CONTROLLERS (controllers/):
- Recibir request HTTP
- Extraer datos del request (body, params, query)
- Llamar al service apropiado
- Formatear response HTTP
- Manejar errores de HTTP
- NO contener lógica de negocio

SERVICES (services/):
- Contener TODA la lógica de negocio
- Orquestar operaciones complejas
- Validaciones de reglas de negocio
- Transacciones que involucran múltiples modelos
- Independientes de HTTP (pueden usarse en CLI, workers, etc.)

MODELS (models/):
- Representar entidades de la base de datos
- Métodos para CRUD básico
- Queries específicas de la entidad
- NO contener lógica de negocio compleja

MIDDLEWARE (middleware/):
- Autenticación y autorización
- Validación de inputs
- Logging de requests
- Manejo centralizado de errores
- Rate limiting

UTILS (utils/):
- Funciones auxiliares reutilizables
- Helpers de formateo
- Constantes
- NO depender de modelos o services

CONFIG (config/):
- Configuración de base de datos
- Configuración de servicios externos
- Variables de entorno
- Inicialización de librerías


EJEMPLO PRÁCTICO PARA TU PROYECTO:
==================================

Supongamos que tu app tiene "Transacciones". Así se vería el flujo:

1. USER: POST /api/transactions
   Body: { amount: 100, category_id: 5, description: "Compra" }

2. ROUTE (routes/transaction.routes.js):
   router.post('/', authenticate, validateTransaction, transactionController.create)

3. MIDDLEWARE:
   - authenticate: Verifica JWT, agrega req.user
   - validateTransaction: Valida que amount > 0, category_id existe, etc.

4. CONTROLLER (controllers/transactionController.js):
   - Extrae datos: const { amount, category_id, description } = req.body
   - Obtiene user: const userId = req.user.id
   - Llama service: const transaction = await transactionService.create({ userId, amount, category_id, description })
   - Responde: res.status(201).json({ success: true, data: transaction })

5. SERVICE (services/transactionService.js):
   - Valida reglas de negocio (ej: usuario no excedió límite de transacciones del día)
   - Llama al modelo: const transaction = await Transaction.create({ ... })
   - Actualiza balance: await UserService.updateBalance(userId, amount)
   - Retorna: return transaction

6. MODEL (models/Transaction.js):
   - Ejecuta query SQL: INSERT INTO transactions...
   - Retorna el registro creado

7. RESPONSE al usuario: { success: true, data: { id: 123, amount: 100, ... } }


¿Te queda claro? Ahora diseñemos TU arquitectura específica.
```

### Paso 1.2: Adaptar la Arquitectura a TU Proyecto

Ahora que entiendes el patrón, adáptalo a tu proyecto:

**TÚ:**
```
Perfecto Claude, entiendo la arquitectura. Ahora ayúdame a aplicarla
específicamente a mi proyecto [Nombre].

Mis entidades principales son:
- [Entidad 1: ej. User]
- [Entidad 2: ej. Transaction]
- [Entidad 3: ej. Category]

¿Puedes generar la lista completa de archivos que necesitaré crear organizados
por capa? Dame la estructura de carpetas completa.
```

**Claude Code** te generará algo como:

```
ESTRUCTURA DE CARPETAS COMPLETA: FinanzasPro
============================================

finanzas-pro/
│
├── src/
│   │
│   ├── config/                        # Configuraciones
│   │   ├── database.js                # Conexión PostgreSQL
│   │   ├── swagger.js                 # Config Swagger
│   │   └── constants.js               # Constantes de la app
│   │
│   ├── models/                        # Data Access Layer
│   │   ├── User.js                    # Modelo Usuario
│   │   ├── Transaction.js             # Modelo Transacción
│   │   └── Category.js                # Modelo Categoría
│   │
│   ├── services/                      # Business Logic Layer
│   │   ├── authService.js             # Lógica de autenticación
│   │   ├── userService.js             # Lógica de usuarios
│   │   ├── transactionService.js      # Lógica de transacciones
│   │   ├── categoryService.js         # Lógica de categorías
│   │   └── statsService.js            # Lógica de estadísticas
│   │
│   ├── controllers/                   # Presentation Layer
│   │   ├── authController.js          # Controller de auth
│   │   ├── userController.js          # Controller de usuarios
│   │   ├── transactionController.js   # Controller de transacciones
│   │   ├── categoryController.js      # Controller de categorías
│   │   └── statsController.js         # Controller de stats
│   │
│   ├── routes/                        # Presentation Layer
│   │   ├── index.js                   # Agregador de rutas
│   │   ├── auth.routes.js             # Rutas de autenticación
│   │   ├── user.routes.js             # Rutas de usuarios
│   │   ├── transaction.routes.js      # Rutas de transacciones
│   │   ├── category.routes.js         # Rutas de categorías
│   │   └── stats.routes.js            # Rutas de estadísticas
│   │
│   ├── middleware/                    # Middleware
│   │   ├── auth.middleware.js         # Autenticación JWT
│   │   ├── validation.middleware.js   # Validaciones Joi
│   │   ├── error.middleware.js        # Manejo de errores
│   │   └── logger.middleware.js       # Logging de requests
│   │
│   ├── validators/                    # Esquemas de validación
│   │   ├── authValidator.js           # Validaciones de auth
│   │   ├── transactionValidator.js    # Validaciones de transactions
│   │   └── categoryValidator.js       # Validaciones de categories
│   │
│   ├── utils/                         # Utilidades
│   │   ├── logger.js                  # Configuración Winston
│   │   ├── response.js                # Helpers de respuesta
│   │   ├── tokenManager.js            # Manejo de JWT
│   │   └── dateUtils.js               # Helpers de fechas
│   │
│   ├── app.js                         # Configuración Express
│   └── server.js                      # Entry point
│
├── database/                          # Scripts de BD
│   ├── migrations/                    # Migraciones
│   │   └── 001_initial_schema.sql
│   └── seeds/                         # Datos de prueba
│       └── 001_seed_categories.sql
│
├── tests/                             # Tests
│   ├── unit/                          # Tests unitarios
│   │   ├── services/
│   │   │   ├── authService.test.js
│   │   │   ├── transactionService.test.js
│   │   │   └── statsService.test.js
│   │   └── utils/
│   │       └── dateUtils.test.js
│   │
│   ├── integration/                   # Tests de integración
│   │   └── routes/
│   │       ├── auth.test.js
│   │       ├── transaction.test.js
│   │       └── stats.test.js
│   │
│   └── setup.js                       # Setup de tests
│
├── docs/                              # Documentación
│   ├── API.md                         # Documentación de API
│   ├── ARCHITECTURE.md                # Documentación de arquitectura
│   └── DEPLOYMENT.md                  # Guía de deployment
│
├── logs/                              # Logs (gitignored)
│
├── .env                               # Variables de entorno (gitignored)
├── .env.example                       # Template de variables
├── .gitignore                         # Git ignore
├── .eslintrc.js                       # ESLint config
├── .prettierrc                        # Prettier config
├── jest.config.js                     # Jest config
├── package.json                       # Dependencias
├── package-lock.json                  # Lock file
└── README.md                          # Documentación principal

TOTAL: ~40 archivos principales
```

### Paso 1.3: Guardar Tu Arquitectura

Crea un archivo `docs/ARCHITECTURE.md` (lo crearás en Lección 3) y guarda todo el diseño de arquitectura que Claude Code te dio.

### Checklist de Completitud - Actividad 1:

- [ ] Entiendo el patrón arquitectónico de mi proyecto
- [ ] Conozco la responsabilidad de cada capa
- [ ] Tengo la estructura completa de carpetas
- [ ] Sé qué archivos necesitaré crear
- [ ] Guardé la documentación de arquitectura

## Actividad 2: Diseñar Tu API REST Completa

**Tiempo estimado**: 2-3 horas

**Qué vas a hacer**: Diseñar todos los endpoints de tu API con métodos, rutas, request/response.

**Cómo Claude Code te ayuda**: Te ayudará a diseñar una API RESTful correcta y completa.

### Paso 2.1: Conversación de Diseño de API

**TÚ:**
```
Claude, necesito diseñar todos los endpoints de mi API REST.

MIS ENTIDADES:
- Users (autenticación y perfil)
- Transactions (CRUD completo con filtros)
- Categories (solo lectura para usuarios, predefinidas)
- Stats (estadísticas y dashboard)

FEATURES QUE NECESITO CUBRIR:
- Registro y login
- CRUD de transacciones
- Filtrado de transacciones por fecha, categoría, tipo
- Ver categorías disponibles
- Obtener estadísticas (balance, gastos por categoría, etc.)

Ayúdame a diseñar TODOS los endpoints siguiendo mejores prácticas REST:
- Métodos HTTP correctos
- Rutas claras y consistentes
- Request body/params/query esperados
- Response esperado
- Códigos de estado HTTP
- Qué endpoints requieren autenticación
```

**Claude Code responderá** con una especificación completa de API:

```
API REST COMPLETA: FinanzasPro
==============================

BASE URL: /api/v1
Formato de respuesta: JSON
Autenticación: JWT en header "Authorization: Bearer <token>"


═══════════════════════════════════════════════════════════════════
AUTENTICACIÓN (/api/v1/auth)
═══════════════════════════════════════════════════════════════════

1. REGISTRO
───────────
Endpoint:  POST /api/v1/auth/register
Auth:      No requerida
Body:
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "Password123!"
}

Success Response (201 Created):
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "createdAt": "2025-10-30T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

Error Response (400 Bad Request):
{
  "success": false,
  "message": "Datos de registro inválidos",
  "errors": [
    "El email ya está registrado",
    "La contraseña debe tener al menos 8 caracteres"
  ]
}

─────────────────────────────────────────────────────────────────

2. LOGIN
────────
Endpoint:  POST /api/v1/auth/login
Auth:      No requerida
Body:
{
  "email": "juan@example.com",
  "password": "Password123!"
}

Success Response (200 OK):
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "user": {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

Error Response (401 Unauthorized):
{
  "success": false,
  "message": "Credenciales inválidas"
}

─────────────────────────────────────────────────────────────────

3. OBTENER PERFIL
─────────────────
Endpoint:  GET /api/v1/auth/me
Auth:      Requerida (JWT)
Headers:   Authorization: Bearer <token>

Success Response (200 OK):
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "createdAt": "2025-10-30T10:00:00.000Z"
  }
}


═══════════════════════════════════════════════════════════════════
TRANSACCIONES (/api/v1/transactions)
═══════════════════════════════════════════════════════════════════

4. CREAR TRANSACCIÓN
────────────────────
Endpoint:  POST /api/v1/transactions
Auth:      Requerida
Body:
{
  "type": "expense",                    // "income" o "expense"
  "amount": 50.75,
  "categoryId": 3,
  "description": "Compra en supermercado",
  "transactionDate": "2025-10-30"       // Formato YYYY-MM-DD
}

Success Response (201 Created):
{
  "success": true,
  "message": "Transacción creada exitosamente",
  "data": {
    "id": 123,
    "userId": 1,
    "type": "expense",
    "amount": 50.75,
    "categoryId": 3,
    "categoryName": "Alimentación",
    "description": "Compra en supermercado",
    "transactionDate": "2025-10-30",
    "createdAt": "2025-10-30T14:30:00.000Z"
  }
}

─────────────────────────────────────────────────────────────────

5. LISTAR TRANSACCIONES (con filtros y paginación)
───────────────────────────────────────────────────
Endpoint:  GET /api/v1/transactions
Auth:      Requerida
Query Params (todos opcionales):
  - type: "income" | "expense"
  - categoryId: number
  - startDate: YYYY-MM-DD
  - endDate: YYYY-MM-DD
  - page: number (default: 1)
  - limit: number (default: 20, max: 100)
  - sortBy: "date" | "amount" (default: "date")
  - order: "asc" | "desc" (default: "desc")

Ejemplo: GET /api/v1/transactions?type=expense&startDate=2025-10-01&endDate=2025-10-30&page=1&limit=20

Success Response (200 OK):
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": 125,
        "type": "expense",
        "amount": 30.00,
        "categoryId": 5,
        "categoryName": "Transporte",
        "description": "Taxi",
        "transactionDate": "2025-10-29",
        "createdAt": "2025-10-29T18:00:00.000Z"
      },
      {
        "id": 123,
        "type": "expense",
        "amount": 50.75,
        "categoryId": 3,
        "categoryName": "Alimentación",
        "description": "Compra en supermercado",
        "transactionDate": "2025-10-28",
        "createdAt": "2025-10-28T14:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalTransactions": 87,
      "limit": 20,
      "hasNext": true,
      "hasPrev": false
    }
  }
}

─────────────────────────────────────────────────────────────────

6. OBTENER TRANSACCIÓN POR ID
──────────────────────────────
Endpoint:  GET /api/v1/transactions/:id
Auth:      Requerida

Success Response (200 OK):
{
  "success": true,
  "data": {
    "id": 123,
    "userId": 1,
    "type": "expense",
    "amount": 50.75,
    "categoryId": 3,
    "categoryName": "Alimentación",
    "description": "Compra en supermercado",
    "transactionDate": "2025-10-30",
    "createdAt": "2025-10-30T14:30:00.000Z",
    "updatedAt": "2025-10-30T14:30:00.000Z"
  }
}

Error Response (404 Not Found):
{
  "success": false,
  "message": "Transacción no encontrada"
}

─────────────────────────────────────────────────────────────────

7. ACTUALIZAR TRANSACCIÓN
──────────────────────────
Endpoint:  PUT /api/v1/transactions/:id
Auth:      Requerida
Body (todos los campos opcionales):
{
  "type": "income",
  "amount": 100.00,
  "categoryId": 1,
  "description": "Salario",
  "transactionDate": "2025-10-30"
}

Success Response (200 OK):
{
  "success": true,
  "message": "Transacción actualizada exitosamente",
  "data": {
    "id": 123,
    "userId": 1,
    "type": "income",
    "amount": 100.00,
    "categoryId": 1,
    "categoryName": "Salario",
    "description": "Salario",
    "transactionDate": "2025-10-30",
    "updatedAt": "2025-10-30T15:00:00.000Z"
  }
}

─────────────────────────────────────────────────────────────────

8. ELIMINAR TRANSACCIÓN
────────────────────────
Endpoint:  DELETE /api/v1/transactions/:id
Auth:      Requerida

Success Response (200 OK):
{
  "success": true,
  "message": "Transacción eliminada exitosamente"
}

Error Response (404 Not Found):
{
  "success": false,
  "message": "Transacción no encontrada"
}


═══════════════════════════════════════════════════════════════════
CATEGORÍAS (/api/v1/categories)
═══════════════════════════════════════════════════════════════════

9. LISTAR CATEGORÍAS
────────────────────
Endpoint:  GET /api/v1/categories
Auth:      Requerida
Query Params (opcional):
  - type: "income" | "expense" (filtrar por tipo)

Success Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Salario",
      "type": "income",
      "color": "#4CAF50",
      "icon": "💰"
    },
    {
      "id": 2,
      "name": "Freelance",
      "type": "income",
      "color": "#2196F3",
      "icon": "💼"
    },
    {
      "id": 3,
      "name": "Alimentación",
      "type": "expense",
      "color": "#FF9800",
      "icon": "🍔"
    },
    {
      "id": 4,
      "name": "Transporte",
      "type": "expense",
      "color": "#9C27B0",
      "icon": "🚗"
    }
  ]
}


═══════════════════════════════════════════════════════════════════
ESTADÍSTICAS (/api/v1/stats)
═══════════════════════════════════════════════════════════════════

10. OBTENER BALANCE ACTUAL
───────────────────────────
Endpoint:  GET /api/v1/stats/balance
Auth:      Requerida
Query Params (opcional):
  - startDate: YYYY-MM-DD (default: inicio del mes actual)
  - endDate: YYYY-MM-DD (default: hoy)

Success Response (200 OK):
{
  "success": true,
  "data": {
    "totalIncome": 3500.00,
    "totalExpense": 2150.75,
    "balance": 1349.25,
    "period": {
      "startDate": "2025-10-01",
      "endDate": "2025-10-30"
    }
  }
}

─────────────────────────────────────────────────────────────────

11. ESTADÍSTICAS POR CATEGORÍA
───────────────────────────────
Endpoint:  GET /api/v1/stats/by-category
Auth:      Requerida
Query Params (opcional):
  - startDate: YYYY-MM-DD
  - endDate: YYYY-MM-DD
  - type: "income" | "expense"

Success Response (200 OK):
{
  "success": true,
  "data": {
    "byCategory": [
      {
        "categoryId": 3,
        "categoryName": "Alimentación",
        "total": 850.50,
        "transactionCount": 23,
        "percentage": 39.5
      },
      {
        "categoryId": 4,
        "categoryName": "Transporte",
        "total": 450.25,
        "transactionCount": 15,
        "percentage": 20.9
      },
      {
        "categoryId": 5,
        "categoryName": "Entretenimiento",
        "total": 350.00,
        "transactionCount": 8,
        "percentage": 16.3
      }
    ],
    "total": 2150.75,
    "period": {
      "startDate": "2025-10-01",
      "endDate": "2025-10-30"
    }
  }
}

─────────────────────────────────────────────────────────────────

12. RESUMEN MENSUAL (Dashboard)
────────────────────────────────
Endpoint:  GET /api/v1/stats/monthly-summary
Auth:      Requerida
Query Params (opcional):
  - month: number (1-12, default: mes actual)
  - year: number (default: año actual)

Success Response (200 OK):
{
  "success": true,
  "data": {
    "month": 10,
    "year": 2025,
    "totalIncome": 3500.00,
    "totalExpense": 2150.75,
    "balance": 1349.25,
    "transactionCount": 46,
    "topExpenseCategory": {
      "name": "Alimentación",
      "total": 850.50
    },
    "dailyAverage": 71.69,
    "comparedToPreviousMonth": {
      "incomeChange": 5.2,      // Porcentaje
      "expenseChange": -3.1,
      "balanceChange": 12.8
    }
  }
}


═══════════════════════════════════════════════════════════════════
RESUMEN DE ENDPOINTS
═══════════════════════════════════════════════════════════════════

TOTAL: 12 endpoints

Autenticación (3):
  POST   /api/v1/auth/register
  POST   /api/v1/auth/login
  GET    /api/v1/auth/me

Transacciones (5):
  POST   /api/v1/transactions
  GET    /api/v1/transactions
  GET    /api/v1/transactions/:id
  PUT    /api/v1/transactions/:id
  DELETE /api/v1/transactions/:id

Categorías (1):
  GET    /api/v1/categories

Estadísticas (3):
  GET    /api/v1/stats/balance
  GET    /api/v1/stats/by-category
  GET    /api/v1/stats/monthly-summary


CÓDIGOS DE ESTADO HTTP USADOS:
════════════════════════════════

200 OK: Request exitoso (GET, PUT, DELETE)
201 Created: Recurso creado exitosamente (POST)
400 Bad Request: Datos inválidos
401 Unauthorized: No autenticado o token inválido
403 Forbidden: Autenticado pero sin permisos
404 Not Found: Recurso no encontrado
500 Internal Server Error: Error del servidor


HEADERS ESTÁNDAR:
═══════════════════

Request:
  Content-Type: application/json
  Authorization: Bearer <token>  (para endpoints autenticados)

Response:
  Content-Type: application/json
```

### Paso 2.2: Documentar Tu API

Guarda toda esta especificación en `docs/API.md` (lo crearás en Lección 3).

**Esta es tu referencia de oro. Cuando implementes en Lecciones 3-4, seguirás EXACTAMENTE este diseño.**

### Checklist de Completitud - Actividad 2:

- [ ] Diseñé todos los endpoints necesarios para mis features MUST HAVE
- [ ] Cada endpoint tiene método HTTP correcto
- [ ] Definí request body/params/query para cada uno
- [ ] Definí response esperado (success y error)
- [ ] Sé qué endpoints requieren autenticación
- [ ] Guardé la documentación de API completa

## Actividad 3: Diseñar Tu Esquema de Base de Datos Detallado

**Tiempo estimado**: 2 horas

**Qué vas a hacer**: Diseñar TODAS las tablas, columnas, tipos de datos, relaciones, índices y constraints.

**Cómo Claude Code te ayuda**: Te ayudará a optimizar el esquema y detectar problemas de diseño.

### Paso 3.1: Conversación de Diseño de BD

**TÚ:**
```
Claude, necesito diseñar el esquema completo de mi base de datos PostgreSQL.

MIS ENTIDADES:
- Users (usuarios del sistema)
- Transactions (transacciones financieras)
- Categories (categorías predefinidas)

RELACIONES:
- Un usuario tiene muchas transacciones
- Una transacción pertenece a un usuario
- Una transacción pertenece a una categoría
- Las categorías son compartidas (no por usuario)

FEATURES QUE AFECTAN EL DISEÑO:
- Filtrado rápido por fecha, categoría, usuario
- Cálculos de balances y estadísticas
- Soft delete opcional (para auditoría)

Ayúdame a diseñar:
1. Todas las tablas con columnas completas
2. Tipos de datos correctos
3. Constraints (PK, FK, UNIQUE, CHECK, NOT NULL)
4. Índices para optimizar queries
5. Triggers si son necesarios
6. Consideraciones de performance
```

**Claude Code** te dará un esquema completo:

```
ESQUEMA DE BASE DE DATOS: FinanzasPro (PostgreSQL)
==================================================

═══════════════════════════════════════════════════════════════════
TABLA: users
═══════════════════════════════════════════════════════════════════

CREATE TABLE users (
  -- Primary Key
  id SERIAL PRIMARY KEY,

  -- Datos personales
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,  -- Hash bcrypt

  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Constraints
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Índices
CREATE INDEX idx_users_email ON users(email);

-- Comentarios
COMMENT ON TABLE users IS 'Usuarios del sistema';
COMMENT ON COLUMN users.password IS 'Password hasheado con bcrypt (nunca plano)';


═══════════════════════════════════════════════════════════════════
TABLA: categories
═══════════════════════════════════════════════════════════════════

CREATE TABLE categories (
  -- Primary Key
  id SERIAL PRIMARY KEY,

  -- Datos de categoría
  name VARCHAR(50) NOT NULL UNIQUE,
  type VARCHAR(20) NOT NULL,       -- 'income' o 'expense'
  color VARCHAR(7) DEFAULT '#CCCCCC',  -- Hex color
  icon VARCHAR(50),                -- Emoji o nombre de ícono

  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Constraints
  CONSTRAINT category_type_check CHECK (type IN ('income', 'expense')),
  CONSTRAINT color_format_check CHECK (color ~* '^#[0-9A-Fa-f]{6}$')
);

-- Índices
CREATE INDEX idx_categories_type ON categories(type);

-- Comentarios
COMMENT ON TABLE categories IS 'Categorías predefinidas de transacciones';
COMMENT ON COLUMN categories.type IS 'Tipo: income (ingreso) o expense (gasto)';


═══════════════════════════════════════════════════════════════════
TABLA: transactions
═══════════════════════════════════════════════════════════════════

CREATE TABLE transactions (
  -- Primary Key
  id SERIAL PRIMARY KEY,

  -- Foreign Keys
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,

  -- Datos de transacción
  type VARCHAR(20) NOT NULL,       -- 'income' o 'expense'
  amount DECIMAL(12, 2) NOT NULL,  -- Hasta 9,999,999,999.99
  description TEXT,
  transaction_date DATE NOT NULL,

  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Soft delete (opcional)
  deleted_at TIMESTAMP DEFAULT NULL,

  -- Constraints
  CONSTRAINT transaction_type_check CHECK (type IN ('income', 'expense')),
  CONSTRAINT amount_positive CHECK (amount > 0)
);

-- Índices (IMPORTANTE para performance)
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_category_id ON transactions(category_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date DESC);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_user_date ON transactions(user_id, transaction_date DESC);

-- Índice compuesto para queries comunes
CREATE INDEX idx_transactions_filters ON transactions(user_id, type, category_id, transaction_date DESC);

-- Comentarios
COMMENT ON TABLE transactions IS 'Transacciones financieras de usuarios';
COMMENT ON COLUMN transactions.amount IS 'Monto siempre positivo, el tipo indica si es ingreso o gasto';
COMMENT ON COLUMN transactions.deleted_at IS 'NULL = activo, timestamp = eliminado (soft delete)';


═══════════════════════════════════════════════════════════════════
TRIGGERS (Opcional pero recomendado)
═══════════════════════════════════════════════════════════════════

-- Trigger para updated_at en users
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger para updated_at en transactions
CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


═══════════════════════════════════════════════════════════════════
DIAGRAMA DE RELACIONES (ER Diagram)
═══════════════════════════════════════════════════════════════════

┌─────────────────────┐
│       users         │
├─────────────────────┤
│ PK  id              │
│     name            │
│ UQ  email           │
│     password        │
│     created_at      │
│     updated_at      │
└──────────┬──────────┘
           │
           │ 1
           │
           │
           │ N
┌──────────┴──────────┐          ┌─────────────────────┐
│   transactions      │          │    categories       │
├─────────────────────┤          ├─────────────────────┤
│ PK  id              │    N     │ PK  id              │
│ FK  user_id         ├──────────┤ UQ  name            │
│ FK  category_id     │    1     │     type            │
│     type            │          │     color           │
│     amount          │          │     icon            │
│     description     │          │     created_at      │
│     transaction_date│          └─────────────────────┘
│     created_at      │
│     updated_at      │
│     deleted_at      │
└─────────────────────┘

Relaciones:
- users 1:N transactions (un usuario tiene muchas transacciones)
- categories 1:N transactions (una categoría se usa en muchas transacciones)


═══════════════════════════════════════════════════════════════════
SEED DATA: Categorías Predefinidas
═══════════════════════════════════════════════════════════════════

-- database/seeds/001_seed_categories.sql

INSERT INTO categories (name, type, color, icon) VALUES
  -- Categorías de INCOME
  ('Salario', 'income', '#4CAF50', '💰'),
  ('Freelance', 'income', '#2196F3', '💼'),
  ('Inversiones', 'income', '#009688', '📈'),
  ('Bonos', 'income', '#8BC34A', '🎁'),
  ('Otros Ingresos', 'income', '#CDDC39', '💵'),

  -- Categorías de EXPENSE
  ('Alimentación', 'expense', '#FF9800', '🍔'),
  ('Transporte', 'expense', '#9C27B0', '🚗'),
  ('Salud', 'expense', '#F44336', '⚕️'),
  ('Entretenimiento', 'expense', '#E91E63', '🎬'),
  ('Educación', 'expense', '#3F51B5', '📚'),
  ('Hogar', 'expense', '#795548', '🏠'),
  ('Ropa', 'expense', '#00BCD4', '👕'),
  ('Servicios', 'expense', '#607D8B', '💡'),
  ('Otros Gastos', 'expense', '#9E9E9E', '📦');


═══════════════════════════════════════════════════════════════════
QUERIES COMUNES OPTIMIZADAS
═══════════════════════════════════════════════════════════════════

-- 1. Obtener balance de un usuario en un período
SELECT
  SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
  SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expense,
  SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as balance
FROM transactions
WHERE user_id = $1
  AND transaction_date BETWEEN $2 AND $3
  AND deleted_at IS NULL;

-- 2. Gastos por categoría
SELECT
  c.id as category_id,
  c.name as category_name,
  c.color,
  c.icon,
  SUM(t.amount) as total,
  COUNT(t.id) as transaction_count,
  ROUND((SUM(t.amount) / total_expenses.total * 100)::numeric, 2) as percentage
FROM transactions t
JOIN categories c ON t.category_id = c.id
CROSS JOIN (
  SELECT SUM(amount) as total
  FROM transactions
  WHERE user_id = $1 AND type = 'expense' AND deleted_at IS NULL
) as total_expenses
WHERE t.user_id = $1
  AND t.type = 'expense'
  AND t.deleted_at IS NULL
GROUP BY c.id, c.name, c.color, c.icon, total_expenses.total
ORDER BY total DESC;

-- 3. Transacciones con filtros (para la API)
SELECT
  t.id,
  t.type,
  t.amount,
  t.description,
  t.transaction_date,
  t.created_at,
  c.id as category_id,
  c.name as category_name,
  c.color as category_color,
  c.icon as category_icon
FROM transactions t
JOIN categories c ON t.category_id = c.id
WHERE t.user_id = $1
  AND t.deleted_at IS NULL
  AND ($2::varchar IS NULL OR t.type = $2)
  AND ($3::integer IS NULL OR t.category_id = $3)
  AND ($4::date IS NULL OR t.transaction_date >= $4)
  AND ($5::date IS NULL OR t.transaction_date <= $5)
ORDER BY t.transaction_date DESC, t.id DESC
LIMIT $6 OFFSET $7;


═══════════════════════════════════════════════════════════════════
CONSIDERACIONES DE PERFORMANCE
═══════════════════════════════════════════════════════════════════

1. ÍNDICES:
   ✅ Índice en user_id (queries filtran por usuario siempre)
   ✅ Índice en transaction_date DESC (ordenamiento frecuente)
   ✅ Índice compuesto en (user_id, transaction_date) para queries más comunes
   ✅ Índice en category_id para JOINs

2. TIPOS DE DATOS:
   ✅ DECIMAL(12,2) para amounts (precisión monetaria)
   ✅ DATE para transaction_date (no necesitamos hora)
   ✅ VARCHAR con límites razonables (no TEXT innecesarios)

3. CONSTRAINTS:
   ✅ CHECK constraints validan datos a nivel de BD
   ✅ ON DELETE CASCADE en user_id (eliminar usuario elimina sus transacciones)
   ✅ ON DELETE RESTRICT en category_id (no eliminar categorías en uso)

4. SOFT DELETE:
   ✅ deleted_at permite mantener historial
   ✅ Agregar "AND deleted_at IS NULL" en queries

5. TRIGGERS:
   ✅ Actualización automática de updated_at
   ✅ Evita tener que hacerlo manualmente en código


═══════════════════════════════════════════════════════════════════
ESTIMACIÓN DE TAMAÑO
═══════════════════════════════════════════════════════════════════

Para 1,000 usuarios con promedio de 100 transacciones/mes:

users table:
  1,000 registros × ~500 bytes = ~500 KB

categories table:
  ~15 registros × ~200 bytes = ~3 KB

transactions table:
  100,000 transacciones/mes × ~300 bytes = ~30 MB/mes
  En 1 año: ~360 MB
  Con índices: ~540 MB

TOTAL para 1 año: ~550 MB (muy manejable)
```

### Paso 3.2: Validar el Diseño

**TÚ:**
```
Claude, revisa este esquema de BD y dime:
1. ¿Hay problemas de normalización?
2. ¿Faltan índices importantes?
3. ¿Los tipos de datos son apropiados?
4. ¿Hay riesgo de problemas de performance?
5. ¿Qué mejorarías?
```

Claude Code te dará feedback honesto y sugerencias.

### Checklist de Completitud - Actividad 3:

- [ ] Definí todas las tablas necesarias
- [ ] Cada tabla tiene columnas completas con tipos de datos
- [ ] Definí Primary Keys, Foreign Keys, Constraints
- [ ] Creé índices para optimizar queries comunes
- [ ] Tengo script SQL completo de creación de esquema
- [ ] Tengo script de seed data si es necesario
- [ ] Guardé todo en database/migrations/

## Actividad 4: Elegir Tecnologías Específicas y Versiones

**Tiempo estimado**: 1 hora

**Qué vas a hacer**: Especificar versiones exactas de todas las dependencias que usarás.

**Cómo Claude Code te ayuda**: Te recomendará versiones estables y compatibles.

### Paso 4.1: Definir Dependencias

**TÚ:**
```
Claude, necesito crear mi package.json con TODAS las dependencias necesarias
para mi proyecto.

STACK:
- Node.js + Express
- PostgreSQL
- JWT + bcrypt
- Joi
- Winston
- Jest + Supertest
- Swagger

Dame un package.json completo con:
1. Scripts útiles (dev, test, start, etc.)
2. Versiones estables y compatibles
3. Dependencias de producción y desarrollo separadas
4. Configuración básica
```

**Claude Code** generará:

```json
{
  "name": "finanzas-pro",
  "version": "1.0.0",
  "description": "Sistema de gestión personal de finanzas",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest --coverage",
    "test:watch": "jest --watch",
    "test:unit": "jest tests/unit",
    "test:integration": "jest tests/integration",
    "lint": "eslint src/**/*.js",
    "lint:fix": "eslint src/**/*.js --fix",
    "format": "prettier --write \"src/**/*.js\"",
    "db:migrate": "node database/migrate.js",
    "db:seed": "node database/seed.js"
  },
  "keywords": ["finanzas", "api", "express", "postgresql"],
  "author": "Tu Nombre",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.3",
    "dotenv": "^16.3.1",
    "jsonwebtoken": "^9.0.2",
    "bcrypt": "^5.1.1",
    "joi": "^17.11.0",
    "winston": "^3.11.0",
    "winston-daily-rotate-file": "^4.7.1",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "swagger-ui-express": "^5.0.0",
    "swagger-jsdoc": "^6.2.8"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "eslint": "^8.55.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-plugin-import": "^2.29.1",
    "prettier": "^3.1.1"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### Checklist de Completitud - Actividad 4:

- [ ] Tengo package.json completo con todas las dependencias
- [ ] Las versiones son estables y compatibles
- [ ] Tengo scripts útiles definidos
- [ ] Separé dependencias de producción y desarrollo

## Actividad 5: Crear Tu Roadmap de Desarrollo Granular

**Tiempo estimado**: 1-2 horas

**Qué vas a hacer**: Dividir tu plan de desarrollo en tareas específicas semana por semana.

**Cómo Claude Code te ayuda**: Te ayudará a crear un roadmap realista y balanceado.

### Paso 5.1: Planificación Detallada

**TÚ:**
```
Claude, ayúdame a crear un roadmap de desarrollo detallado para mi proyecto.

TENGO: [X] semanas de tiempo
TRABAJO: [X] horas por semana

FASES DEFINIDAS:
- Fase 1: Setup
- Fase 2: Autenticación
- Fase 3: CRUD Transacciones
- Fase 4: Estadísticas
- Fase 5: Testing
- Fase 6: Deploy

Ayúdame a dividir cada fase en TAREAS ESPECÍFICAS con:
1. Descripción clara de la tarea
2. Tiempo estimado
3. Dependencias (qué debe estar listo antes)
4. Criterio de completitud (cómo sé que está terminado)

Sé realista con los tiempos. Prefiero sobrestimar que subestimar.
```

**Claude Code** te dará un roadmap detallado:

```
ROADMAP DE DESARROLLO: FinanzasPro
==================================

Duración total: 6 semanas
Horas por semana: 20 horas
Total: 120 horas

═══════════════════════════════════════════════════════════════════
SEMANA 1: SETUP Y FUNDACIONES (20 horas)
═══════════════════════════════════════════════════════════════════

DÍA 1-2 (6 horas): Inicialización del Proyecto
─────────────────────────────────────────────
□ Crear repositorio Git
□ Inicializar npm (npm init)
□ Crear estructura de carpetas completa
□ Instalar todas las dependencias
□ Configurar .gitignore, .env.example
□ Configurar ESLint y Prettier
□ Primer commit

CRITERIO DE ÉXITO: "npm install" funciona sin errores, estructura de carpetas lista

DÍA 3-4 (8 horas): Base de Datos
────────────────────────────────
□ Instalar y configurar PostgreSQL local
□ Crear base de datos "finanzas_pro"
□ Crear archivo de migración (001_initial_schema.sql)
□ Crear script de seed (001_seed_categories.sql)
□ Ejecutar migraciones
□ Configurar conexión en src/config/database.js
□ Probar conexión con query simple

CRITERIO DE ÉXITO: Conexión a BD funciona, tablas creadas, seed data cargado

DÍA 5-6 (6 horas): Configuración Base de Express
─────────────────────────────────────────────────
□ Crear src/app.js con configuración básica
□ Crear src/server.js
□ Configurar middleware (cors, helmet, express.json)
□ Configurar Winston logger (src/utils/logger.js)
□ Crear ruta /health
□ Probar servidor: "npm run dev"

CRITERIO DE ÉXITO: Servidor inicia correctamente, /health responde 200

═══════════════════════════════════════════════════════════════════
SEMANA 2: AUTENTICACIÓN COMPLETA (20 horas)
═══════════════════════════════════════════════════════════════════

DÍA 1-2 (6 horas): Modelo y Service de User
────────────────────────────────────────────
□ Crear src/models/User.js con métodos: create, findByEmail, findById
□ Crear src/services/authService.js con: register, login, generateToken, verifyToken
□ Implementar bcrypt hashing de passwords
□ Implementar JWT generation y verification

CRITERIO DE ÉXITO: Puedo crear usuario y generar JWT programáticamente

DÍA 3 (4 horas): Controller y Routes de Auth
─────────────────────────────────────────────
□ Crear src/controllers/authController.js con: register, login
□ Crear src/routes/auth.routes.js
□ Integrar routes en src/app.js
□ Probar con Postman/curl

CRITERIO DE ÉXITO: POST /api/v1/auth/register y /login funcionan

DÍA 4 (4 horas): Validaciones
──────────────────────────────
□ Crear src/validators/authValidator.js con Joi schemas
□ Crear src/middleware/validation.middleware.js
□ Agregar validaciones a routes
□ Probar inputs inválidos

CRITERIO DE ÉXITO: Validaciones rechazan datos inválidos con mensajes claros

DÍA 5-6 (6 horas): Middleware de Autenticación
───────────────────────────────────────────────
□ Crear src/middleware/auth.middleware.js
□ Implementar verificación de JWT
□ Crear endpoint GET /api/v1/auth/me (protegido)
□ Probar con token válido e inválido

CRITERIO DE ÉXITO: Endpoints protegidos requieren token válido

═══════════════════════════════════════════════════════════════════
SEMANA 3: CRUD DE TRANSACCIONES (20 horas)
═══════════════════════════════════════════════════════════════════

DÍA 1-2 (8 horas): Modelos y Services
──────────────────────────────────────
□ Crear src/models/Transaction.js con CRUD methods
□ Crear src/models/Category.js con getAll, getById
□ Crear src/services/transactionService.js con lógica de negocio
□ Crear src/services/categoryService.js

CRITERIO DE ÉXITO: Puedo hacer CRUD de transacciones programáticamente

DÍA 3-4 (8 horas): Controllers y Routes
────────────────────────────────────────
□ Crear src/controllers/transactionController.js (create, getAll, getById, update, delete)
□ Crear src/controllers/categoryController.js (getAll)
□ Crear src/routes/transaction.routes.js
□ Crear src/routes/category.routes.js
□ Crear src/validators/transactionValidator.js
□ Integrar en app.js

CRITERIO DE ÉXITO: Todos los endpoints CRUD funcionan en Postman

DÍA 5-6 (4 horas): Filtros y Paginación
────────────────────────────────────────
□ Implementar filtros en transactionService (type, category, dates)
□ Implementar paginación (page, limit)
□ Probar diferentes combinaciones de filtros

CRITERIO DE ÉXITO: GET /transactions con filtros funciona correctamente

═══════════════════════════════════════════════════════════════════
SEMANA 4: ESTADÍSTICAS Y DASHBOARD (18 horas)
═══════════════════════════════════════════════════════════════════

DÍA 1-2 (8 horas): Service de Estadísticas
───────────────────────────────────────────
□ Crear src/services/statsService.js
□ Implementar getBalance
□ Implementar getByCategory
□ Implementar getMonthlySummary
□ Optimizar queries SQL

CRITERIO DE ÉXITO: Cálculos de estadísticas son correctos

DÍA 3-4 (6 horas): Controller y Routes de Stats
────────────────────────────────────────────────
□ Crear src/controllers/statsController.js
□ Crear src/routes/stats.routes.js
□ Probar todos los endpoints
□ Validar que porcentajes suman 100%

CRITERIO DE ÉXITO: Todos los endpoints de stats funcionan

DÍA 5 (4 horas): Manejo de Errores
───────────────────────────────────
□ Crear src/middleware/error.middleware.js
□ Implementar manejo centralizado de errores
□ Agregar logging de errores
□ Probar diferentes tipos de errores

CRITERIO DE ÉXITO: Errores se manejan consistentemente

═══════════════════════════════════════════════════════════════════
SEMANA 5: TESTING Y DOCUMENTACIÓN (22 horas)
═══════════════════════════════════════════════════════════════════

DÍA 1-2 (8 horas): Tests Unitarios
───────────────────────────────────
□ Configurar Jest (jest.config.js)
□ Crear tests/setup.js
□ Tests de authService
□ Tests de transactionService
□ Tests de statsService

CRITERIO DE ÉXITO: Tests unitarios pasan, coverage >70%

DÍA 3-4 (8 horas): Tests de Integración
────────────────────────────────────────
□ Tests de routes de auth
□ Tests de routes de transactions
□ Tests de routes de stats
□ Tests de validaciones

CRITERIO DE ÉXITO: Tests de integración pasan, coverage >80%

DÍA 5-6 (6 horas): Documentación
─────────────────────────────────
□ Configurar Swagger (src/config/swagger.js)
□ Documentar todos los endpoints con JSDoc
□ Crear README.md completo
□ Crear docs/ARCHITECTURE.md
□ Crear docs/API.md

CRITERIO DE ÉXITO: Swagger UI funciona, documentación completa

═══════════════════════════════════════════════════════════════════
SEMANA 6: DEPLOY Y PRESENTACIÓN (20 horas)
═══════════════════════════════════════════════════════════════════

DÍA 1-2 (8 horas): Preparación para Deploy
───────────────────────────────────────────
□ Crear cuenta en Heroku/Railway
□ Configurar variables de entorno en plataforma
□ Crear base de datos PostgreSQL en la nube
□ Ejecutar migraciones en producción
□ Ajustar configuraciones para producción

DÍA 3-4 (6 horas): Deploy y Testing en Producción
──────────────────────────────────────────────────
□ Deploy de la aplicación
□ Probar todos los endpoints en producción
□ Configurar logging en producción
□ Fix de bugs de deployment

CRITERIO DE ÉXITO: App funciona en producción sin errores

DÍA 5-6 (6 horas): Presentación y Documentación Final
──────────────────────────────────────────────────────
□ Crear video demo (5-10 minutos)
□ Crear documentación de usuario
□ Actualizar README con link de producción
□ Preparar presentación del proyecto
□ Reflexión final y aprendizajes

CRITERIO DE ÉXITO: Proyecto completo, presentable y deployado


═══════════════════════════════════════════════════════════════════
RESUMEN POR SEMANA
═══════════════════════════════════════════════════════════════════

Semana 1: Setup, BD, Express básico
Semana 2: Autenticación completa
Semana 3: CRUD de transacciones
Semana 4: Estadísticas y manejo de errores
Semana 5: Testing y documentación
Semana 6: Deploy y presentación

TOTAL: 120 horas


═══════════════════════════════════════════════════════════════════
BUFFER TIME
═══════════════════════════════════════════════════════════════════

Este plan incluye ~10% de buffer time para:
- Bugs inesperados
- Aprendizaje de tecnologías nuevas
- Refactorización
- Descansos necesarios

Si vas más rápido: agrega features de SHOULD HAVE
Si vas más lento: elimina features de COULD HAVE
```

### Checklist de Completitud - Actividad 5:

- [ ] Tengo roadmap semana por semana
- [ ] Cada tarea tiene descripción clara
- [ ] Cada tarea tiene tiempo estimado
- [ ] Sé qué criterios usar para marcar tareas como completas
- [ ] El plan total cabe en mi tiempo disponible

## Checkpoint: Autoevaluación

Antes de pasar a la Lección 3 (empezar a codear), verifica:

**Sobre arquitectura:**
- [ ] Entiendo el patrón arquitectónico de mi proyecto
- [ ] Sé qué responsabilidad tiene cada capa
- [ ] Tengo la estructura de carpetas completa definida

**Sobre API:**
- [ ] Diseñé todos los endpoints necesarios
- [ ] Sé qué request y response espera cada endpoint
- [ ] Tengo documentación completa de mi API

**Sobre base de datos:**
- [ ] Tengo todas las tablas diseñadas
- [ ] Definí relaciones, constraints e índices
- [ ] Tengo scripts SQL listos

**Sobre tecnologías:**
- [ ] Elegí todas las dependencias que necesito
- [ ] Tengo package.json completo

**Sobre planificación:**
- [ ] Tengo un roadmap semana por semana
- [ ] El plan es realista para mi tiempo
- [ ] Sé exactamente qué haré en Semana 1

**Si marcaste TODAS las casillas, estás LISTO para empezar a codear en Lección 3.**

## Problemas Comunes en Esta Fase

### Problema 1: "El diseño de API no sigue REST correctamente"

❌ **Síntoma:** Rutas como `/getTransactions`, `/createUser`, verbos en las URLs.

✅ **Solución:**
- Pregunta a Claude Code: "¿Mi diseño de API es RESTful?"
- Usa sustantivos en rutas, no verbos
- Usa métodos HTTP apropiados (GET, POST, PUT, DELETE)

### Problema 2: "No sé si mi esquema de BD está normalizado"

❌ **Síntoma:** Datos duplicados, muchas columnas NULL, difícil de actualizar.

✅ **Solución:**
- Pregunta a Claude Code: "¿Mi esquema está en 3NF (Tercera Forma Normal)?"
- Revisa si hay redundancia de datos
- Divide tablas si una tabla tiene responsabilidades múltiples

### Problema 3: "El roadmap parece muy optimista"

❌ **Síntoma:** Plan de 3 semanas para un proyecto complejo.

✅ **Solución:**
- Multiplica tus estimaciones por 1.5x
- Agrega buffer time explícito
- Recuerda: mejor sobrestimar que fallar deadlines

### Problema 4: "No sé qué índices crear en BD"

❌ **Síntoma:** No tienes índices o tienes demasiados.

✅ **Solución:**
- Crea índices para columnas en WHERE clauses
- Crea índices para Foreign Keys
- Crea índices compuestos para queries frecuentes
- Pregunta a Claude Code: "¿Qué índices debería crear para esta query?"

## Recursos y Referencias

### Herramientas de Diseño:
- **dbdiagram.io**: Diseñar esquemas de BD visualmente
- **draw.io**: Diagramas de arquitectura
- **Postman**: Documentar y testear APIs
- **Swagger Editor**: Diseñar APIs con OpenAPI spec

### Lecturas Recomendadas:
- REST API Best Practices
- Database Normalization (1NF, 2NF, 3NF)
- Software Architecture Patterns
- PostgreSQL Performance Tips

## Preparación para la Siguiente Lección

Para estar listo para **Lección 3: Setup del Proyecto y Primera Iteración**:

### Debes tener:
✅ Arquitectura diseñada completamente
✅ API REST especificada con todos los endpoints
✅ Esquema de BD con scripts SQL
✅ Package.json con dependencias
✅ Roadmap de desarrollo detallado

### Asegúrate de tener instalado:
✅ Node.js 18+ (`node --version`)
✅ PostgreSQL 15+ (`psql --version`)
✅ Git (`git --version`)
✅ Editor de código (VS Code recomendado)
✅ Postman o similar para probar APIs

### Próximos pasos (Lección 3):
En la siguiente lección EMPEZARÁS A CODEAR:
- Inicializar el proyecto
- Configurar base de datos
- Crear la estructura de archivos
- Implementar tu primera funcionalidad (autenticación)
- Hacer tu primer commit

## Conversación Final con Claude Code para Esta Lección

**TÚ:**
```
Claude, he completado mi planificación y arquitectura. Antes de empezar a codear,
revisa todo lo que diseñamos y dime:

1. ¿Hay algún problema arquitectónico que deba resolver antes de empezar?
2. ¿El diseño de API tiene inconsistencias?
3. ¿El esquema de BD tiene problemas?
4. ¿El roadmap parece realista?
5. ¿Qué me recomiendas hacer primero en la Lección 3?

[Pega tu arquitectura, diseño de API, esquema de BD y roadmap]
```

Claude Code te dará una revisión final y luz verde para empezar.

## Reflexión Final de la Lección

Tómate 10 minutos para reflexionar:

**¿Cómo me siento ahora que tengo todo planificado?**
- [Tu respuesta]

**¿Qué parte del diseño fue más desafiante?**
- [Tu respuesta]

**¿Qué aprendí sobre arquitectura de software?**
- [Tu respuesta]

**¿Estoy listo para empezar a codear?**
- [Tu respuesta]

**¿Qué es lo primero que haré en la próxima lección?**
- [Tu respuesta]

---

## Resumen

Has completado la planificación arquitectónica con:
- Arquitectura MVC + Services definida
- API REST especificada (todos los endpoints documentados)
- Esquema de base de datos diseñado
- Stack tecnológico seleccionado
- Roadmap de desarrollo semana por semana

En la Lección 3 inicializarás el proyecto e implementarás la autenticación.

---

**Módulo 9 - Lección 2 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
