<p><strong><em>Lección 4: Desarrollo de Features y Funcionalidades</em></strong></p>

## Introducción

Con la autenticación implementada, desarrollarás las features principales de tu proyecto. En esta lección:

- Implementarás todas las features MUST HAVE
- Crearás CRUD completo de tus entidades principales
- Implementarás filtros, búsqueda y paginación
- Refinarás y optimizarás el código

Trabajarás iterativamente: implementar → testear → commit, feature por feature.

## Objetivos de Esta Lección

Al finalizar esta lección, habrás logrado:

✅ Implementar TODAS las features MUST HAVE de tu proyecto
✅ Crear CRUD completo de tus entidades principales
✅ Implementar filtros, búsqueda y paginación
✅ Manejar relaciones entre entidades correctamente
✅ Validar exhaustivamente todos los inputs
✅ Testear cada feature manualmente antes de continuar
✅ Tener tu aplicación funcional al 80%+

## ¿En Qué Punto Estás?

**Ya tienes:**
- Proyecto funcionando con servidor Express
- Base de datos con todas las tablas
- Autenticación completa (registro, login, JWT)
- Middleware de validación y manejo de errores
- Primera feature funcionando al 100%

**Ahora construirás:**
- Tu feature principal (ej: gestión de transacciones, posts, productos, etc.)
- Features secundarias relacionadas
- Filtros y búsqueda avanzada
- Dashboard o estadísticas
- Toda la lógica de negocio de tu app

**Al final tendrás una aplicación FUNCIONAL y COMPLETA.**

## Estrategia de Desarrollo Iterativo

**NO intentes hacer todo a la vez.** Usa este enfoque:

1. **Elige una feature**
2. **Impleméntala COMPLETAMENTE** (Model → Service → Controller → Routes → Validación)
3. **PRUÉBALA exhaustivamente**
4. **Haz commit**
5. **Repite con la siguiente feature**

Este enfoque te permite:
- Ver progreso constante
- Detectar bugs temprano
- Tener código funcional siempre
- No sentirte abrumado

## Actividad 1: Identificar Tu Lista de Features a Desarrollar

**Tiempo estimado**: 30 minutos

**Qué vas a hacer**: Crear una lista priorizada de features para desarrollar en orden.

### Paso 1.1: Revisar Tu Especificación

Abre tu documento de especificación (de Lección 1) y lista las features MUST HAVE.

**Ejemplo (para app de finanzas):**
- CRUD de transacciones
- CRUD de categorías (opcional si son predefinidas)
- Filtros de transacciones (fecha, categoría, tipo)
- Cálculo de balance
- Estadísticas por categoría

### Paso 1.2: Ordenar por Dependencias

Organiza las features en orden de implementación según dependencias:

**TÚ (conversación con Claude Code):**
```
Claude, estas son mis features MUST HAVE:
- [Feature 1]
- [Feature 2]
- [Feature 3]
- [Feature 4]

¿En qué orden debería implementarlas considerando dependencias?
¿Cuál es la más importante (core feature)?
```

**Claude Code** te ayudará a priorizar.

**Ejemplo de orden:**
1. Categories (lectura) - si otras features dependen
2. Transactions CRUD - feature principal
3. Filtros y búsqueda en Transactions
4. Estadísticas y dashboard
5. Features opcionales si hay tiempo

### Paso 1.3: Crear Tu Checklist de Features

Crea un archivo temporal `FEATURES_TODO.md`:

```markdown
# Features TODO - [Nombre Proyecto]

## MUST HAVE (Esta lección)

### Feature 1: [Nombre]
- [ ] Model
- [ ] Service
- [ ] Validator
- [ ] Controller
- [ ] Routes
- [ ] Tests manuales
- [ ] Commit

### Feature 2: [Nombre]
- [ ] Model
- [ ] Service
- [ ] Validator
- [ ] Controller
- [ ] Routes
- [ ] Tests manuales
- [ ] Commit

[Continúa con todas...]

## SHOULD HAVE (Si hay tiempo)
- [ ] [Feature opcional 1]
- [ ] [Feature opcional 2]
```

### Checklist de Completitud - Actividad 1:

- [ ] Tengo lista clara de features a implementar
- [ ] Las ordené por dependencias
- [ ] Creé checklist de progreso
- [ ] Sé cuál es mi próxima feature a desarrollar

## Actividad 2: Implementar Tu Feature Principal

**Tiempo estimado**: 4-6 horas

**Qué vas a hacer**: Implementar COMPLETAMENTE tu feature más importante (ej: CRUD de tu entidad principal).

**Cómo Claude Code te ayuda**: Generará cada capa de código (Model, Service, Controller, etc.) adaptada a TU proyecto.

### Paso 2.1: Definir La Feature con Claude Code

**TÚ:**
```
Claude, voy a implementar mi feature principal: [Nombre de la feature, ej: "CRUD de Transacciones"]

DESCRIPCIÓN:
[Describe qué hace esta feature]

ENDPOINTS QUE NECESITO:
[Lista los endpoints del diseño de API de Lección 2]

VALIDACIONES IMPORTANTES:
[Lista reglas de negocio]

Ayúdame a implementar esto siguiendo mi arquitectura (MVC + Services).
Generemos el código paso a paso, empezando por el Model.
```

### Paso 2.2: Crear El Modelo

**TÚ:**
```
Claude, genera src/models/[NombreEntidad].js con estos métodos:

- create(data): Crear nuevo registro
- findAll(filters, pagination): Listar con filtros opcionales
- findById(id): Buscar por ID
- update(id, data): Actualizar
- delete(id): Eliminar (soft delete si aplica)

Usa prepared statements ($1, $2...) para prevenir SQL injection.
Retorna objetos completos con joins si es necesario.
```

**Claude Code generará algo como:**

```javascript
// src/models/Transaction.js (EJEMPLO)
const { pool } = require('../config/database');

class Transaction {
  /**
   * Crear nueva transacción
   */
  static async create({ userId, categoryId, type, amount, description, transactionDate }) {
    const query = `
      INSERT INTO transactions (user_id, category_id, type, amount, description, transaction_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [userId, categoryId, type, amount, description, transactionDate];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Listar transacciones con filtros
   */
  static async findAll({ userId, type, categoryId, startDate, endDate, page = 1, limit = 20 }) {
    let query = `
      SELECT
        t.*,
        c.name as category_name,
        c.color as category_color,
        c.icon as category_icon
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.user_id = $1
        AND t.deleted_at IS NULL
    `;

    const values = [userId];
    let paramIndex = 2;

    // Filtros dinámicos
    if (type) {
      query += ` AND t.type = $${paramIndex}`;
      values.push(type);
      paramIndex++;
    }

    if (categoryId) {
      query += ` AND t.category_id = $${paramIndex}`;
      values.push(categoryId);
      paramIndex++;
    }

    if (startDate) {
      query += ` AND t.transaction_date >= $${paramIndex}`;
      values.push(startDate);
      paramIndex++;
    }

    if (endDate) {
      query += ` AND t.transaction_date <= $${paramIndex}`;
      values.push(endDate);
      paramIndex++;
    }

    // Ordenamiento
    query += ` ORDER BY t.transaction_date DESC, t.id DESC`;

    // Paginación
    const offset = (page - 1) * limit;
    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);

    // Contar total para paginación
    const countQuery = `
      SELECT COUNT(*) as total
      FROM transactions t
      WHERE t.user_id = $1
        AND t.deleted_at IS NULL
        ${type ? `AND t.type = $2` : ''}
        ${categoryId ? `AND t.category_id = $${type ? 3 : 2}` : ''}
    `;

    const countValues = [userId];
    if (type) countValues.push(type);
    if (categoryId) countValues.push(categoryId);

    const countResult = await pool.query(countQuery, countValues);
    const total = parseInt(countResult.rows[0].total);

    return {
      transactions: result.rows,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalTransactions: total,
        limit,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    };
  }

  /**
   * Buscar por ID
   */
  static async findById(id, userId) {
    const query = `
      SELECT
        t.*,
        c.name as category_name,
        c.color as category_color,
        c.icon as category_icon
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.id = $1 AND t.user_id = $2 AND t.deleted_at IS NULL
    `;

    const result = await pool.query(query, [id, userId]);
    return result.rows[0];
  }

  /**
   * Actualizar transacción
   */
  static async update(id, userId, data) {
    const { type, amount, categoryId, description, transactionDate } = data;

    const query = `
      UPDATE transactions
      SET
        type = COALESCE($1, type),
        amount = COALESCE($2, amount),
        category_id = COALESCE($3, category_id),
        description = COALESCE($4, description),
        transaction_date = COALESCE($5, transaction_date),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $6 AND user_id = $7 AND deleted_at IS NULL
      RETURNING *
    `;

    const values = [type, amount, categoryId, description, transactionDate, id, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Eliminar (soft delete)
   */
  static async delete(id, userId) {
    const query = `
      UPDATE transactions
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL
      RETURNING id
    `;

    const result = await pool.query(query, [id, userId]);
    return result.rows[0];
  }
}

module.exports = Transaction;
```

**Adapta este ejemplo a TU entidad.**

### Paso 2.3: Crear El Service

**TÚ:**
```
Claude, genera src/services/[nombreEntidad]Service.js con:

- create({ userId, ...data }): Validar reglas de negocio y crear
- getAll({ userId, ...filters }): Listar con filtros
- getById({ userId, id }): Obtener uno
- update({ userId, id, ...data }): Actualizar
- delete({ userId, id }): Eliminar

Incluye validaciones de lógica de negocio (ej: verificar que categoría existe,
que el usuario es dueño, etc.).
```

**Claude Code generará:**

```javascript
// src/services/transactionService.js (EJEMPLO)
const Transaction = require('../models/Transaction');
const Category = require('../models/Category');
const logger = require('../utils/logger');

class TransactionService {
  /**
   * Crear transacción
   */
  async create({ userId, categoryId, type, amount, description, transactionDate }) {
    // Validar que la categoría existe
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error('Categoría no encontrada');
    }

    // Validar que el tipo coincide con el tipo de categoría
    if (category.type !== type) {
      throw new Error(`La categoría ${category.name} es de tipo ${category.type}, no ${type}`);
    }

    // Crear transacción
    const transaction = await Transaction.create({
      userId,
      categoryId,
      type,
      amount,
      description,
      transactionDate: transactionDate || new Date().toISOString().split('T')[0]
    });

    logger.info(`Transacción creada: ${transaction.id} para user ${userId}`);

    return transaction;
  }

  /**
   * Listar transacciones
   */
  async getAll({ userId, type, categoryId, startDate, endDate, page, limit }) {
    return await Transaction.findAll({
      userId,
      type,
      categoryId,
      startDate,
      endDate,
      page: page || 1,
      limit: limit || 20
    });
  }

  /**
   * Obtener transacción por ID
   */
  async getById({ userId, id }) {
    const transaction = await Transaction.findById(id, userId);

    if (!transaction) {
      throw new Error('Transacción no encontrada');
    }

    return transaction;
  }

  /**
   * Actualizar transacción
   */
  async update({ userId, id, ...data }) {
    // Verificar que existe y pertenece al usuario
    const existing = await Transaction.findById(id, userId);
    if (!existing) {
      throw new Error('Transacción no encontrada');
    }

    // Si se cambia categoría, validar
    if (data.categoryId && data.categoryId !== existing.category_id) {
      const category = await Category.findById(data.categoryId);
      if (!category) {
        throw new Error('Categoría no encontrada');
      }

      // Validar tipo
      const newType = data.type || existing.type;
      if (category.type !== newType) {
        throw new Error(`La categoría ${category.name} no es compatible con tipo ${newType}`);
      }
    }

    const updated = await Transaction.update(id, userId, data);
    logger.info(`Transacción actualizada: ${id}`);

    return updated;
  }

  /**
   * Eliminar transacción
   */
  async delete({ userId, id }) {
    const deleted = await Transaction.delete(id, userId);

    if (!deleted) {
      throw new Error('Transacción no encontrada');
    }

    logger.info(`Transacción eliminada: ${id}`);
    return { message: 'Transacción eliminada exitosamente' };
  }
}

module.exports = new TransactionService();
```

### Paso 2.4: Crear Validadores

**TÚ:**
```
Claude, genera src/validators/[nombreEntidad]Validator.js con esquemas Joi para:
- create: todos los campos requeridos con validaciones
- update: campos opcionales
- query filters: validación de parámetros de búsqueda
```

### Paso 2.5: Crear Controller

**TÚ:**
```
Claude, genera src/controllers/[nombreEntidad]Controller.js con métodos:
- create, getAll, getById, update, delete

Cada método debe:
- Extraer datos de req (body, params, query, user)
- Llamar al service
- Manejar respuesta con formato consistente
- Usar try-catch y pasar errores a next()
```

### Paso 2.6: Crear Routes

**TÚ:**
```
Claude, genera src/routes/[nombreEntidad].routes.js con:
- POST / (crear) - autenticado + validación
- GET / (listar) - autenticado
- GET /:id (obtener uno) - autenticado
- PUT /:id (actualizar) - autenticado + validación
- DELETE /:id (eliminar) - autenticado

Todos los endpoints requieren autenticación.
```

### Paso 2.7: Montar Routes en App

Edita `src/app.js`:

```javascript
// Agregar después de authRoutes
const transactionRoutes = require('./routes/transaction.routes');
app.use('/api/v1/transactions', transactionRoutes);
```

### Paso 2.8: Testear EXHAUSTIVAMENTE

**IMPORTANTE: No pases a la siguiente feature hasta que esta funcione 100%.**

Crea una colección de tests manuales:

**Test 1: Crear**
```bash
curl -X POST http://localhost:3000/api/v1/transactions \
  -H "Authorization: Bearer TU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "expense",
    "amount": 50.00,
    "categoryId": 3,
    "description": "Test",
    "transactionDate": "2025-10-30"
  }'
```

**Test 2: Listar**
```bash
curl http://localhost:3000/api/v1/transactions \
  -H "Authorization: Bearer TU_TOKEN"
```

**Test 3: Filtrar**
```bash
curl "http://localhost:3000/api/v1/transactions?type=expense&startDate=2025-10-01&endDate=2025-10-30" \
  -H "Authorization: Bearer TU_TOKEN"
```

**Test 4: Obtener por ID**
```bash
curl http://localhost:3000/api/v1/transactions/1 \
  -H "Authorization: Bearer TU_TOKEN"
```

**Test 5: Actualizar**
```bash
curl -X PUT http://localhost:3000/api/v1/transactions/1 \
  -H "Authorization: Bearer TU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 75.00,
    "description": "Actualizado"
  }'
```

**Test 6: Eliminar**
```bash
curl -X DELETE http://localhost:3000/api/v1/transactions/1 \
  -H "Authorization: Bearer TU_TOKEN"
```

**Test 7: Casos de error**
- Sin token (401)
- Datos inválidos (400)
- ID inexistente (404)
- ID de otro usuario (404 o 403)

### Paso 2.9: Commit de Feature

```bash
git add src/
git commit -m "feat: implementar CRUD completo de [Entidad]

- Model con queries optimizadas y filtros dinámicos
- Service con validaciones de lógica de negocio
- Validator con esquemas Joi completos
- Controller con manejo consistente de errores
- Routes con autenticación y validación

Features:
✅ Crear [entidad]
✅ Listar con filtros (tipo, categoría, fechas)
✅ Paginación
✅ Obtener por ID
✅ Actualizar
✅ Eliminar (soft delete)
✅ Validaciones exhaustivas
✅ Solo el dueño puede acceder

Todos los tests manuales pasando.

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Checklist de Completitud - Actividad 2:

- [ ] Model implementado y funcionando
- [ ] Service con lógica de negocio completa
- [ ] Validadores Joi configurados
- [ ] Controller manejando todos los casos
- [ ] Routes montadas en app.js
- [ ] TODOS los endpoints probados manualmente
- [ ] Casos de error validados
- [ ] Commit realizado
- [ ] Feature 100% funcional

## Actividad 3: Implementar Features Secundarias

**Tiempo estimado**: 3-5 horas (dependiendo de cuántas features tengas)

**Qué vas a hacer**: Implementar el resto de features MUST HAVE usando el mismo patrón.

### Paso 3.1: Repetir El Proceso

Para CADA feature restante:

1. **Conversa con Claude Code**
2. **Genera Model**
3. **Genera Service**
4. **Genera Validator**
5. **Genera Controller**
6. **Genera Routes**
7. **Monta en app.js**
8. **TESTEA exhaustivamente**
9. **Haz commit**

**Ejemplo de conversación para cada feature:**

**TÚ:**
```
Claude, ahora voy a implementar [Nombre de la feature].

DESCRIPCIÓN: [...]
ENDPOINTS: [...]
RELACIONES CON OTRAS ENTIDADES: [...]

Ayúdame siguiendo el mismo patrón que usamos para [feature anterior].
```

### Features Comunes a Implementar

Dependiendo de tu proyecto, podrías tener:

**Si tu app tiene contenido generado por usuarios:**
- CRUD de posts/artículos/productos
- Comentarios
- Likes/favoritos
- Categorías/etiquetas

**Si tu app tiene datos relacionales:**
- Entities con foreign keys
- Queries con JOINs
- Agregaciones

**Si tu app tiene features de solo-lectura:**
- Categories (listar)
- Stats (cálculos)
- Dashboard (múltiples queries)

### Ejemplo: Feature de Solo-Lectura (Categories)

**TÚ:**
```
Claude, necesito implementar lectura de Categories.

Los usuarios solo pueden VER categorías (están predefinidas en seed data).

Endpoint:
- GET /api/v1/categories (opcionalmente filtrar por type)

Genera solo lo necesario (no necesito CRUD completo).
```

**Claude Code** generará solo Model (con `getAll`), Service simple, Controller y Routes.

### Ejemplo: Feature de Estadísticas

**TÚ:**
```
Claude, necesito implementar estadísticas.

Endpoints:
- GET /api/v1/stats/balance (total ingresos, gastos, balance)
- GET /api/v1/stats/by-category (agregación por categoría)

Esto involucra queries con SUM, GROUP BY, etc.

Genera Service con queries optimizadas y Controller.
```

**Claude Code** generará queries SQL complejas optimizadas.

### Paso 3.2: Ir Feature por Feature

**NO intentes hacer todo a la vez.**

Feature 1 → Testear → Commit → Feature 2 → Testear → Commit → ...

Este ritmo te mantiene:
- Productivo (ves progreso constante)
- Seguro (siempre tienes código funcional)
- Motivado (cada commit es una victoria)

### Checklist de Completitud - Actividad 3:

- [ ] Implementé TODAS las features MUST HAVE
- [ ] Cada feature tiene tests manuales exitosos
- [ ] Cada feature tiene su commit
- [ ] No quedaron features críticas sin implementar

## Actividad 4: Refinar y Optimizar

**Tiempo estimado**: 2-3 horas

**Qué vas a hacer**: Mejorar el código existente, agregar validaciones faltantes, optimizar queries.

### Paso 4.1: Revisar Con Claude Code

**TÚ:**
```
Claude, he implementado todas mis features principales. Ahora necesito refinar.

Revisa mi código y dime:

1. ¿Hay validaciones importantes que faltan?
2. ¿Hay queries SQL que puedan optimizarse?
3. ¿Hay código duplicado que debería refactorizar?
4. ¿Hay edge cases que no estoy manejando?
5. ¿Mis mensajes de error son claros?

[Pega fragmentos de código relevante]
```

### Paso 4.2: Agregar Validaciones Faltantes

**Ejemplos comunes:**

- **Verificar ownership**: Usuario solo puede editar/eliminar sus propios recursos
- **Validar foreign keys**: Categoría/entidad relacionada existe
- **Validar rangos**: Fechas válidas, montos positivos, límites
- **Validar unicidad**: No duplicar registros

**TÚ:**
```
Claude, quiero asegurarme de que un usuario no pueda editar transacciones
de otro usuario, incluso si conoce el ID.

¿Mi código actual lo previene? Si no, cómo lo agrego?
```

### Paso 4.3: Optimizar Queries SQL

**TÚ:**
```
Claude, esta query me parece lenta cuando hay muchos registros:

[Pega la query]

¿Cómo puedo optimizarla? ¿Necesito índices adicionales?
```

Claude Code te sugerirá:
- Índices faltantes
- JOINs más eficientes
- Evitar N+1 queries
- Usar EXISTS en lugar de JOIN si es apropiado

### Paso 4.4: Refactorizar Código Duplicado

Si tienes código repetido en múltiples controllers/services:

**TÚ:**
```
Claude, tengo este código repetido en 3 controllers:

[Pega el código]

¿Debería extraerlo a una función helper? ¿Dónde la pondría?
```

Claude Code te ayudará a crear helpers en `src/utils/`.

### Paso 4.5: Mejorar Mensajes de Error

Los mensajes de error deben ser:
- Claros y específicos
- Útiles para debugging
- NO exponer información sensible

**TÚ:**
```
Claude, mis mensajes de error son muy genéricos ("Error al procesar").
Ayúdame a mejorarlos para que sean más informativos sin comprometer seguridad.
```

### Paso 4.6: Agregar Logs Estratégicos

Agrega logging en puntos clave:

```javascript
// En Service, logea operaciones importantes
logger.info(`Usuario ${userId} creó transacción ${transaction.id}`);
logger.warn(`Intento de acceso no autorizado: user ${userId} -> resource ${id}`);
logger.error(`Error al calcular estadísticas: ${error.message}`);
```

### Paso 4.7: Commit de Refinamientos

```bash
git add src/
git commit -m "refactor: optimizar y refinar features existentes

Mejoras:
- Validaciones adicionales de ownership
- Queries SQL optimizadas con índices
- Refactorización de código duplicado
- Mensajes de error más claros
- Logging estratégico agregado

Preparando para fase de testing.

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Checklist de Completitud - Actividad 4:

- [ ] Revisé el código con Claude Code
- [ ] Agregué validaciones faltantes
- [ ] Optimicé queries lentas
- [ ] Refactoricé código duplicado
- [ ] Mejoré mensajes de error
- [ ] Agregué logs estratégicos
- [ ] Commit realizado

## Checkpoint: Autoevaluación Mid-Project

Toma un momento para evaluar tu progreso:

**Funcionalidad:**
- [ ] Implementé TODAS las features MUST HAVE
- [ ] Cada endpoint de mi API funciona correctamente
- [ ] Los filtros y búsqueda funcionan
- [ ] Las relaciones entre entidades son correctas
- [ ] Las validaciones previenen datos inválidos

**Calidad del Código:**
- [ ] El código está bien organizado
- [ ] No hay código duplicado significativo
- [ ] Los nombres de variables/funciones son claros
- [ ] Hay comentarios donde el código es complejo
- [ ] No hay console.log olvidados (uso logger)

**Seguridad:**
- [ ] Todos los endpoints requieren autenticación apropiada
- [ ] Los usuarios solo acceden a sus propios recursos
- [ ] Uso prepared statements (no concatenación de SQL)
- [ ] Los passwords nunca se exponen en responses
- [ ] Los errores no revelan información sensible

**Testing:**
- [ ] Probé cada endpoint manualmente
- [ ] Probé casos de éxito y de error
- [ ] Probé filtros y paginación
- [ ] Probé con múltiples usuarios
- [ ] No encontré bugs críticos

**Git:**
- [ ] Tengo múltiples commits (al menos 1 por feature)
- [ ] Los mensajes de commit son claros
- [ ] El código en cada commit funciona

**Si marcaste 80%+ de las casillas, estás EN EXCELENTE CAMINO.**

## Problemas Comunes en Esta Fase

### Problema 1: "Mi query SQL con filtros opcionales no funciona"

❌ **Síntoma:** Error de sintaxis SQL cuando algunos filtros están undefined.

✅ **Solución:**
```javascript
// MAL:
const query = `SELECT * FROM table WHERE field = ${filter}`;  // SQL injection!

// BIEN:
let query = 'SELECT * FROM table WHERE 1=1';
const values = [];
let paramIndex = 1;

if (filter1) {
  query += ` AND field1 = $${paramIndex}`;
  values.push(filter1);
  paramIndex++;
}

if (filter2) {
  query += ` AND field2 = $${paramIndex}`;
  values.push(filter2);
  paramIndex++;
}

const result = await pool.query(query, values);
```

### Problema 2: "No puedo acceder a req.user en el controller"

❌ **Causa:** Olvidaste agregar middleware `authenticate` en la ruta.

✅ **Solución:**
```javascript
// Agregar authenticate a TODAS las rutas protegidas
router.get('/', authenticate, controller.getAll);
router.post('/', authenticate, validate(schema), controller.create);
```

### Problema 3: "La paginación retorna datos incorrectos"

❌ **Causa:** Cálculo de offset incorrecto o límite no aplicado.

✅ **Solución:**
```javascript
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 20;
const offset = (page - 1) * limit;

// En query SQL:
query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
values.push(limit, offset);
```

### Problema 4: "Los JOINs retornan datos duplicados"

❌ **Causa:** JOIN mal estructurado o múltiples JOINs one-to-many.

✅ **Solución:**
- Usa LEFT JOIN apropiadamente
- Considera hacer queries separadas si hay múltiples one-to-many
- Pregunta a Claude Code: "Mi JOIN retorna duplicados, ayúdame a optimizarlo"

### Problema 5: "Feature muy compleja, no sé por dónde empezar"

❌ **Síntoma:** Una feature tiene demasiada lógica, te sientes abrumado.

✅ **Solución:**
- Divide en sub-features más pequeñas
- Implementa la versión más simple primero
- Agrega complejidad iterativamente
- Pregunta a Claude Code: "Ayúdame a dividir esta feature en pasos manejables"

## Recursos y Referencias

### Testing Manual:
- **Postman Collections**: Organizar requests
- **HTTPie**: Alternativa a curl más amigable
- **Insomnia**: Cliente REST alternativo

### SQL:
- **PostgreSQL EXPLAIN**: Analizar performance de queries
- **pgAdmin**: GUI para PostgreSQL

### Debugging:
- **VS Code Debugger**: Breakpoints en Node.js
- **console.table()**: Visualizar arrays/objects

## Preparación para la Siguiente Lección

Para estar listo para **Lección 5: Testing, Documentación y Pulido**:

### Debes tener:
✅ TODAS las features MUST HAVE implementadas
✅ Cada feature probada y funcionando
✅ Commits organizados en Git
✅ Código limpio y refactorizado
✅ Sin bugs críticos conocidos

### Próximos pasos (Lección 5):
En la siguiente lección:
- Escribirás tests automatizados (unit + integration)
- Generarás documentación completa con Swagger
- Harás el código production-ready
- Optimizarás rendimiento
- Revisarás seguridad

### Prepara:
✅ Lista de posibles bugs encontrados
✅ Lista de mejoras opcionales (SHOULD HAVE)
✅ Tiempo para testing exhaustivo

## Conversación Final con Claude Code para Esta Lección

**TÚ:**
```
Claude, he completado la implementación de todas mis features principales.

Antes de pasar a testing y documentación, necesito una revisión final:

1. ¿Mi código tiene bugs evidentes?
2. ¿Hay features MUST HAVE que olvidé implementar?
3. ¿Estoy listo para la fase de testing?
4. ¿Qué debería arreglar URGENTEMENTE antes de continuar?
5. ¿Qué funcionalidad debería testear más exhaustivamente?

[Opcional: comparte un resumen de tus features implementadas]
```

Claude Code te dará luz verde o te alertará de problemas críticos.

## Reflexión Final de la Lección

Tómate 10 minutos para reflexionar:

**¿Cómo me siento ahora que implementé todas las features?**
- [Tu respuesta]

**¿Cuál fue la feature más desafiante y por qué?**
- [Tu respuesta]

**¿Qué aprendí sobre desarrollo iterativo?**
- [Tu respuesta]

**¿Cómo me ayudó Claude Code en esta lección?**
- [Tu respuesta]

**¿Qué mejoraría si empezara de nuevo?**
- [Tu respuesta]

---

## Resumen

Has completado el desarrollo de features con:
- Todas las features MUST HAVE implementadas
- CRUD completo de entidades principales
- Filtros, búsqueda y paginación funcionando
- Código refactorizado y optimizado
- Validaciones exhaustivas

En la Lección 5 escribirás tests automatizados y documentación profesional.

---

**Módulo 9 - Lección 4 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
