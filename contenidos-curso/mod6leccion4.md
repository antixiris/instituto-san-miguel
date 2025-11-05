<p><strong><em>Diseñando APIs profesionales: arquitectura RESTful</em></strong></p>

## Introducción: De código funcional a código profesional

Ya sabes crear servidores, guardar datos en bases de datos y proteger rutas con autenticación. Tu código funciona, pero... ¿es profesional? ¿Otro desarrollador podría entender tu API sin preguntarte cómo usarla? ¿Estás siguiendo estándares que toda la industria reconoce?

Imagina que entras a una biblioteca donde los libros están colocados al azar: novelas junto a manuales técnicos, sin categorías, sin orden alfabético. Técnicamente, todos los libros están ahí, pero encontrar lo que buscas sería una pesadilla.

**REST** (Representational State Transfer) es un conjunto de convenciones que organizan tu API como una biblioteca bien estructurada. No es una tecnología ni un framework: es una **filosofía de diseño** que hace que tu API sea predecible, fácil de entender y escalable.

Hoy aprenderás a diseñar APIs RESTful profesionales que siguen los estándares de la industria. Al final, tu backend se verá y se sentirá como las APIs de empresas como GitHub, Stripe o Twitter.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Entender los principios REST**: Comprender qué hace que una API sea "RESTful" y por qué es importante
2. **Usar métodos HTTP correctamente**: Aplicar GET, POST, PUT y DELETE según la operación que realizas
3. **Diseñar URLs claras y consistentes**: Estructurar rutas que sean intuitivas y sigan convenciones de la industria
4. **Devolver códigos de estado apropiados**: Comunicar el resultado de cada operación con los códigos HTTP correctos

---

## 🤖 Claude Code en Acción

En esta lección, Claude Code se convierte en tu **arquitecto de APIs RESTful**. Mientras que escribir rutas básicas es simple, diseñar una API completa con paginación cursor-based, versionado v1/v2, documentación Swagger automática, rate limiting y HATEOAS es donde Claude Code realmente brilla.

**Lo que Claude Code hace por ti en esta lección:**

1. **Genera arquitecturas API completas** con separación de concerns (controllers, services, routes)
2. **Implementa paginación avanzada** (cursor-based + offset) con metadata completa
3. **Crea versionado de API** manejando breaking changes entre v1 y v2
4. **Genera documentación Swagger** auto-sincronizada con JSDoc annotations
5. **Implementa HATEOAS** con hypermedia links en respuestas
6. **Configura rate limiting** con Redis y headers informativos
7. **Añade caching** con ETags y validación condicional

**Por qué esto es poderoso:**

Una API profesional moderna no es "solo rutas". Necesitas:
- Paginación eficiente para datasets grandes
- Versionado para evolucionar sin romper clientes existentes
- Documentación sincronizada automáticamente
- Rate limiting para prevenir abuso
- Caching para reducir carga del servidor
- HATEOAS para discoverability

Implementar todo esto manualmente te llevaría días y es fácil cometer errores. Claude Code genera código production-ready en minutos siguiendo mejores prácticas de la industria.

---

## Prompt 1: API con paginación cursor-based y filtros avanzados

**Tu prompt a Claude Code:**

```
Necesito una API RESTful de productos con:

1. Paginación cursor-based + offset (usuario elige)
2. Filtros multi-campo: category, priceMin, priceMax, inStock
3. Sorting: name, price, createdAt (asc/desc)
4. Búsqueda full-text en nombre y descripción
5. Metadata completa: totalCount, hasNext, hasPrev, cursors

Modelo Product: name, description, price, stock, category, createdAt

Usa Prisma y devuelve respuestas con esta estructura:
{
  "data": [...],
  "pagination": { /* metadata completa */ },
  "filters": { /* filtros aplicados */ }
}
```

**Lo que Claude Code genera:**

```javascript
// src/controllers/productController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Construye el objeto where de Prisma basado en filtros
 */
function buildWhereClause(filters) {
  const where = {};

  if (filters.category) {
    where.category = filters.category;
  }

  if (filters.inStock === 'true') {
    where.stock = { gt: 0 };
  }

  if (filters.priceMin || filters.priceMax) {
    where.price = {};
    if (filters.priceMin) where.price.gte = parseFloat(filters.priceMin);
    if (filters.priceMax) where.price.lte = parseFloat(filters.priceMax);
  }

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } }
    ];
  }

  return where;
}

/**
 * Construye el objeto orderBy de Prisma basado en sorting
 */
function buildOrderBy(sortBy, sortOrder) {
  const validSortFields = ['name', 'price', 'createdAt'];
  const field = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
  const order = sortOrder === 'asc' ? 'asc' : 'desc';

  return { [field]: order };
}

/**
 * GET /api/products - Lista productos con paginación y filtros
 */
async function getProducts(req, res) {
  try {
    const {
      // Paginación
      page = '1',
      limit = '10',
      cursor,
      paginationType = 'offset', // 'offset' | 'cursor'

      // Sorting
      sortBy = 'createdAt',
      sortOrder = 'desc',

      // Filtros
      category,
      priceMin,
      priceMax,
      inStock,
      search
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    // Validaciones
    if (limitNum > 100) {
      return res.status(400).json({
        error: 'El límite máximo es 100 productos'
      });
    }

    const filters = { category, priceMin, priceMax, inStock, search };
    const where = buildWhereClause(filters);
    const orderBy = buildOrderBy(sortBy, sortOrder);

    // Paginación offset-based
    if (paginationType === 'offset') {
      const skip = (pageNum - 1) * limitNum;

      const [products, totalCount] = await Promise.all([
        prisma.product.findMany({
          where,
          orderBy,
          skip,
          take: limitNum
        }),
        prisma.product.count({ where })
      ]);

      const totalPages = Math.ceil(totalCount / limitNum);
      const hasNext = pageNum < totalPages;
      const hasPrev = pageNum > 1;

      return res.json({
        data: products,
        pagination: {
          type: 'offset',
          page: pageNum,
          limit: limitNum,
          totalCount,
          totalPages,
          hasNext,
          hasPrev,
          nextPage: hasNext ? pageNum + 1 : null,
          prevPage: hasPrev ? pageNum - 1 : null
        },
        filters: {
          applied: Object.entries(filters)
            .filter(([, value]) => value !== undefined)
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
          sortBy,
          sortOrder
        }
      });
    }

    // Paginación cursor-based
    if (paginationType === 'cursor') {
      const cursorObj = cursor ? { id: parseInt(cursor) } : undefined;

      const products = await prisma.product.findMany({
        where,
        orderBy,
        take: limitNum + 1, // +1 para saber si hay más
        cursor: cursorObj,
        skip: cursorObj ? 1 : 0 // Skip el cursor actual
      });

      const hasNext = products.length > limitNum;
      const productsToReturn = hasNext ? products.slice(0, -1) : products;

      const nextCursor = hasNext
        ? productsToReturn[productsToReturn.length - 1].id
        : null;

      const prevCursor = cursorObj ? cursorObj.id : null;

      // Contar total (puede ser costoso, hacer opcional)
      const totalCount = await prisma.product.count({ where });

      return res.json({
        data: productsToReturn,
        pagination: {
          type: 'cursor',
          limit: limitNum,
          hasNext,
          hasPrev: !!prevCursor,
          nextCursor,
          prevCursor,
          totalCount // Opcional: puede ser costoso con datasets grandes
        },
        filters: {
          applied: Object.entries(filters)
            .filter(([, value]) => value !== undefined)
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
          sortBy,
          sortOrder
        }
      });
    }

    return res.status(400).json({
      error: 'Tipo de paginación inválido. Usa "offset" o "cursor"'
    });

  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}

module.exports = { getProducts };
```

```javascript
// src/routes/productRoutes.js
const express = require('express');
const { getProducts } = require('../controllers/productController');

const router = express.Router();

/**
 * @route GET /api/products
 * @desc Obtener lista de productos con paginación y filtros
 * @query {string} [paginationType=offset] - Tipo: "offset" o "cursor"
 * @query {number} [page=1] - Página (solo offset)
 * @query {number} [limit=10] - Productos por página (max 100)
 * @query {number} [cursor] - Cursor ID (solo cursor-based)
 * @query {string} [sortBy=createdAt] - Campo: name, price, createdAt
 * @query {string} [sortOrder=desc] - Orden: asc, desc
 * @query {string} [category] - Filtrar por categoría
 * @query {number} [priceMin] - Precio mínimo
 * @query {number} [priceMax] - Precio máximo
 * @query {boolean} [inStock] - Solo productos en stock
 * @query {string} [search] - Búsqueda en nombre y descripción
 */
router.get('/', getProducts);

module.exports = router;
```

**Ejemplos de uso:**

```bash
# Paginación offset básica
GET /api/products?page=1&limit=20

# Con filtros
GET /api/products?category=Electronics&priceMin=100&priceMax=500&inStock=true

# Con búsqueda
GET /api/products?search=laptop&sortBy=price&sortOrder=asc

# Paginación cursor-based
GET /api/products?paginationType=cursor&limit=10

# Siguiente página con cursor
GET /api/products?paginationType=cursor&limit=10&cursor=42
```

**Respuesta ejemplo:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Laptop Pro 15",
      "description": "Laptop profesional",
      "price": 1299.99,
      "stock": 15,
      "category": "Electronics",
      "createdAt": "2025-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "type": "offset",
    "page": 1,
    "limit": 20,
    "totalCount": 156,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false,
    "nextPage": 2,
    "prevPage": null
  },
  "filters": {
    "applied": {
      "category": "Electronics",
      "inStock": "true"
    },
    "sortBy": "createdAt",
    "sortOrder": "desc"
  }
}
```

---

## Prompt 2: Versionado de API (v1/v2) con breaking changes

**Tu prompt a Claude Code:**

```
Necesito implementar versionado de API para manejar breaking changes:

API v1 (legacy):
- GET /api/v1/users - devuelve { id, email, fullName }
- fullName es un string único

API v2 (nueva):
- GET /api/v2/users - devuelve { id, email, firstName, lastName }
- fullName se divide en firstName + lastName

Ambas versiones deben funcionar simultáneamente.
Usa el mismo modelo de DB (firstName, lastName).
En v1, concatena firstName + lastName para simular fullName.

Incluye middleware para versión por defecto.
```

**Lo que Claude Code genera:**

```javascript
// src/middleware/apiVersion.js

/**
 * Middleware para detectar versión de API
 * Soporta versión en URL: /api/v1/... o /api/v2/...
 * También soporta header: API-Version: 1 o API-Version: 2
 */
function apiVersion(req, res, next) {
  // Detectar versión de la URL
  const urlMatch = req.path.match(/^\/api\/v(\d+)\//);

  if (urlMatch) {
    req.apiVersion = parseInt(urlMatch[1]);
    return next();
  }

  // Detectar versión del header
  const headerVersion = req.get('API-Version');
  if (headerVersion) {
    req.apiVersion = parseInt(headerVersion);
    return next();
  }

  // Versión por defecto: v2 (última)
  req.apiVersion = 2;
  next();
}

module.exports = { apiVersion };
```

```javascript
// src/controllers/userController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Transforma usuario según versión de API
 */
function transformUser(user, apiVersion) {
  if (apiVersion === 1) {
    // API v1: fullName único
    return {
      id: user.id,
      email: user.email,
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      createdAt: user.createdAt
    };
  }

  // API v2: firstName y lastName separados
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt // Solo en v2
  };
}

/**
 * GET /api/v1/users o /api/v2/users
 */
async function getUsers(req, res) {
  try {
    const { apiVersion } = req;

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true
      }
    });

    const transformedUsers = users.map(user => transformUser(user, apiVersion));

    res.json({
      version: apiVersion,
      data: transformedUsers,
      meta: {
        count: transformedUsers.length,
        ...(apiVersion === 1 && {
          deprecation: {
            message: 'API v1 está deprecada. Migra a v2 antes del 2026-01-01',
            upgradeUrl: 'https://docs.example.com/api/v2-migration'
          }
        })
      }
    });

  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
}

/**
 * POST /api/v1/users - Crea usuario con fullName
 */
async function createUserV1(req, res) {
  try {
    const { email, fullName, password } = req.body;

    if (!email || !fullName || !password) {
      return res.status(400).json({
        error: 'email, fullName y password son requeridos'
      });
    }

    // Separar fullName en firstName y lastName
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password // En producción: hash con bcrypt
      }
    });

    res.status(201).json({
      version: 1,
      data: transformUser(user, 1),
      meta: {
        deprecation: {
          message: 'API v1 está deprecada. Usa POST /api/v2/users con firstName y lastName',
          upgradeUrl: 'https://docs.example.com/api/v2-migration'
        }
      }
    });

  } catch (error) {
    console.error('Error al crear usuario v1:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
}

/**
 * POST /api/v2/users - Crea usuario con firstName y lastName
 */
async function createUserV2(req, res) {
  try {
    const { email, firstName, lastName, password } = req.body;

    if (!email || !firstName || !password) {
      return res.status(400).json({
        error: 'email, firstName y password son requeridos'
      });
    }

    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName: lastName || '',
        password // En producción: hash con bcrypt
      }
    });

    res.status(201).json({
      version: 2,
      data: transformUser(user, 2)
    });

  } catch (error) {
    console.error('Error al crear usuario v2:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
}

module.exports = { getUsers, createUserV1, createUserV2 };
```

```javascript
// src/routes/userRoutes.js
const express = require('express');
const { getUsers, createUserV1, createUserV2 } = require('../controllers/userController');

// Rutas API v1
const routerV1 = express.Router();
routerV1.get('/users', getUsers);
routerV1.post('/users', createUserV1);

// Rutas API v2
const routerV2 = express.Router();
routerV2.get('/users', getUsers);
routerV2.post('/users', createUserV2);

module.exports = { routerV1, routerV2 };
```

```javascript
// src/index.js
const express = require('express');
const { apiVersion } = require('./middleware/apiVersion');
const { routerV1, routerV2 } = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(apiVersion);

// Montar versiones de API
app.use('/api/v1', routerV1);
app.use('/api/v2', routerV2);

// Ruta de información de versiones
app.get('/api', (req, res) => {
  res.json({
    versions: {
      v1: {
        status: 'deprecated',
        sunsetDate: '2026-01-01',
        baseUrl: '/api/v1',
        docs: 'https://docs.example.com/api/v1'
      },
      v2: {
        status: 'current',
        baseUrl: '/api/v2',
        docs: 'https://docs.example.com/api/v2'
      }
    },
    current: 'v2'
  });
});

app.listen(3001, () => {
  console.log('API con versionado corriendo en http://localhost:3001');
});
```

**Comparación de respuestas:**

```javascript
// API v1 - GET /api/v1/users
{
  "version": 1,
  "data": [
    {
      "id": 1,
      "email": "ana@email.com",
      "fullName": "Ana García",
      "createdAt": "2025-01-15T10:00:00Z"
    }
  ],
  "meta": {
    "count": 1,
    "deprecation": {
      "message": "API v1 está deprecada. Migra a v2 antes del 2026-01-01",
      "upgradeUrl": "https://docs.example.com/api/v2-migration"
    }
  }
}

// API v2 - GET /api/v2/users
{
  "version": 2,
  "data": [
    {
      "id": 1,
      "email": "ana@email.com",
      "firstName": "Ana",
      "lastName": "García",
      "createdAt": "2025-01-15T10:00:00Z",
      "updatedAt": "2025-01-15T10:00:00Z"
    }
  ],
  "meta": {
    "count": 1
  }
}
```

---

## Prompt 3: Swagger docs auto-generadas con ejemplos

**Tu prompt a Claude Code:**

```
Necesito documentación Swagger/OpenAPI automática para mi API de productos.

Rutas a documentar:
- GET /api/products - Lista con paginación
- GET /api/products/:id - Detalle de producto
- POST /api/products - Crear producto
- PUT /api/products/:id - Actualizar producto
- DELETE /api/products/:id - Eliminar producto

Usa swagger-jsdoc para generar docs desde JSDoc comments.
Usa swagger-ui-express para servir la UI en /api-docs.

Incluye:
- Schemas de request/response
- Códigos de estado posibles
- Ejemplos de payloads
- Parámetros de query para filtros/paginación
```

**Lo que Claude Code genera:**

```javascript
// swagger.config.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Products API',
      version: '1.0.0',
      description: 'API RESTful para gestión de productos con paginación, filtros y búsqueda',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server'
      },
      {
        url: 'https://api.example.com',
        description: 'Production server'
      }
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'price', 'category'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID auto-generado',
              example: 1
            },
            name: {
              type: 'string',
              description: 'Nombre del producto',
              minLength: 3,
              maxLength: 100,
              example: 'Laptop Pro 15'
            },
            description: {
              type: 'string',
              description: 'Descripción detallada',
              maxLength: 500,
              example: 'Laptop profesional con 16GB RAM'
            },
            price: {
              type: 'number',
              format: 'float',
              description: 'Precio en USD',
              minimum: 0,
              example: 1299.99
            },
            stock: {
              type: 'integer',
              description: 'Cantidad en inventario',
              minimum: 0,
              default: 0,
              example: 15
            },
            category: {
              type: 'string',
              description: 'Categoría del producto',
              example: 'Electronics'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
              example: '2025-01-15T10:00:00Z'
            }
          }
        },
        ProductInput: {
          type: 'object',
          required: ['name', 'price', 'category'],
          properties: {
            name: {
              type: 'string',
              minLength: 3,
              maxLength: 100,
              example: 'Mouse Inalámbrico'
            },
            description: {
              type: 'string',
              maxLength: 500,
              example: 'Mouse ergonómico con Bluetooth'
            },
            price: {
              type: 'number',
              format: 'float',
              minimum: 0,
              example: 29.99
            },
            stock: {
              type: 'integer',
              minimum: 0,
              default: 0,
              example: 50
            },
            category: {
              type: 'string',
              example: 'Electronics'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Producto no encontrado'
            }
          }
        },
        ValidationError: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Datos inválidos'
            },
            details: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                    example: 'price'
                  },
                  message: {
                    type: 'string',
                    example: 'El precio debe ser positivo'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'] // Archivos con JSDoc annotations
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
```

```javascript
// src/routes/productRoutes.js con documentación

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener lista de productos
 *     description: Retorna lista paginada de productos con opciones de filtrado y ordenamiento
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           maximum: 100
 *         description: Productos por página
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrar por categoría
 *       - in: query
 *         name: priceMin
 *         schema:
 *           type: number
 *         description: Precio mínimo
 *       - in: query
 *         name: priceMax
 *         schema:
 *           type: number
 *         description: Precio máximo
 *       - in: query
 *         name: inStock
 *         schema:
 *           type: boolean
 *         description: Solo productos en stock
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Búsqueda en nombre y descripción
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, price, createdAt]
 *           default: createdAt
 *         description: Campo para ordenar
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Orden de sorting
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalCount:
 *                       type: integer
 *                       example: 156
 *                     totalPages:
 *                       type: integer
 *                       example: 16
 *                     hasNext:
 *                       type: boolean
 *                       example: true
 *                     hasPrev:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Parámetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     description: Retorna un producto específico
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Producto no encontrado"
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear nuevo producto
 *     description: Crea un producto con validación de datos
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Error del servidor
 */
router.post('/', createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar producto
 *     description: Actualiza un producto existente
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar producto
 *     description: Elimina un producto permanentemente
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       204:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', deleteProduct);
```

```javascript
// src/index.js - Montar Swagger UI
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.config');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Products API Docs'
}));

// JSON raw de la spec
app.get('/api-docs.json', (req, res) => {
  res.json(swaggerSpec);
});

// Rutas de la API
app.use('/api/products', productRoutes);

app.listen(3001, () => {
  console.log('Server: http://localhost:3001');
  console.log('API Docs: http://localhost:3001/api-docs');
});
```

**Instalar dependencias:**

```bash
npm install swagger-jsdoc swagger-ui-express
```

---

## Workflow Completo: Products API v1 & v2 con Todas las Features

Este workflow integra todo lo aprendido en un sistema production-ready:

**Estructura del proyecto:**

```
products-api/
├── src/
│   ├── index.js                 # Entry point
│   ├── swagger.config.js        # Config Swagger
│   ├── middleware/
│   │   ├── apiVersion.js        # Versionado
│   │   ├── rateLimit.js         # Rate limiting
│   │   └── etag.js              # Caching con ETag
│   ├── controllers/
│   │   └── productController.js # Lógica de negocio
│   ├── services/
│   │   └── productService.js    # Acceso a datos
│   └── routes/
│       ├── v1/
│       │   └── productRoutes.js # Rutas v1
│       └── v2/
│           └── productRoutes.js # Rutas v2
├── prisma/
│   └── schema.prisma
└── package.json
```

**(Debido a límites de espacio, continúo en la siguiente sección con errores comunes, tabla comparativa y mejores prácticas)**

---

## ¿Por qué necesitas diseñar APIs RESTful?

**REST** no es algo que instalas o configuras, es una forma de pensar y organizar tu API. Es como las reglas de tránsito: todos las siguen para que conducir sea predecible y seguro.

**Analogía del restaurante bien organizado**:

Imagina dos restaurantes:

**Restaurante caótico** (API no RESTful):
- Para pedir comida, a veces hablas con el mesero, a veces gritas a la cocina
- Para pagar, a veces es en la mesa, a veces en la caja, a veces en la puerta
- No hay menú estándar, cada día es diferente
- Los meseros no entienden si dices "quiero la orden 5" porque no hay números

**Restaurante organizado** (API RESTful):
- Siempre pides al mesero (método estándar)
- El menú tiene categorías claras: Entradas, Platos principales, Postres (recursos organizados)
- Cada platillo tiene un número único (identificadores consistentes)
- Pagar siempre es en la caja al salir (flujo predecible)

REST hace que tu API sea el "restaurante organizado": cualquier desarrollador puede usarla sin confusión.

### 📊 Un dato interesante

El 70% de las APIs públicas más populares del mundo (Google Maps, Twitter, GitHub, Stripe) siguen arquitectura REST. No es casualidad: REST ha demostrado ser escalable, mantenible y fácil de documentar. Dominar REST te permite trabajar en prácticamente cualquier empresa de tecnología moderna.

---

## Concepto 1: Los verbos HTTP (GET, POST, PUT, DELETE)

HTTP define diferentes **métodos** (también llamados verbos) que indican la **intención** de tu petición. Son como verbos en español: "leer", "crear", "actualizar", "borrar".

**Analogía de acciones en una biblioteca**:

| Verbo HTTP | Acción en biblioteca | Qué hace | Ejemplo de ruta |
|------------|---------------------|----------|-----------------|
| **GET** | Consultar el catálogo | **Lee** datos sin modificarlos | `GET /api/books` |
| **POST** | Donar un libro nuevo | **Crea** un nuevo recurso | `POST /api/books` |
| **PUT** | Actualizar info de un libro | **Actualiza** un recurso completo | `PUT /api/books/5` |
| **DELETE** | Retirar un libro | **Elimina** un recurso | `DELETE /api/books/5` |

**Reglas de oro**:

1. **GET** = Solo lectura, nunca modifica datos
   - Puede llamarse mil veces y siempre da el mismo resultado
   - Es seguro y cacheable (el navegador puede guardar la respuesta)
   - Ejemplo: Ver una lista de productos, ver detalles de un usuario

2. **POST** = Crear algo nuevo
   - Cada llamada crea un nuevo recurso
   - No es seguro llamarlo múltiples veces (crearías duplicados)
   - Ejemplo: Registrar un usuario, crear una orden de compra

3. **PUT** = Actualizar algo existente (reemplaza TODO)
   - Actualiza un recurso completo
   - Es "idempotente": llamarlo 10 veces da el mismo resultado que llamarlo 1 vez
   - Ejemplo: Actualizar el perfil completo de un usuario

4. **DELETE** = Eliminar algo
   - Borra un recurso permanentemente
   - Es "idempotente": borrar algo que ya no existe sigue dando el mismo resultado
   - Ejemplo: Eliminar una tarea, borrar un comentario

---

## ⚠️ Errores Comunes al Diseñar APIs REST

### Error 1: No implementar paginación (devolver todo el dataset)

**Código problemático:**

```javascript
// ❌ MAL: Devuelve 10,000 productos sin paginación
app.get('/api/products', async (req, res) => {
  const products = await prisma.product.findMany(); // Todos!
  res.json(products); // Respuesta de 5MB, tarda 10 segundos
});
```

**Por qué es malo:**
- Respuestas enormes que tardan en transferir
- Consume mucha memoria del servidor
- El cliente no puede navegar eficientemente
- Timeout en conexiones lentas

**Solución correcta:**

```javascript
// ✅ BIEN: Paginación con metadata
app.get('/api/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 20, 100); // Max 100
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    prisma.product.findMany({ skip, take: limit }),
    prisma.product.count()
  ]);

  res.json({
    data: products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1
    }
  });
});
```

---

### Error 2: No versionar la API (breaking changes rompen clientes)

**Código problemático:**

```javascript
// ❌ MAL: Cambio directo que rompe clientes existentes
// Antes: { id, email, fullName }
// Ahora: { id, email, firstName, lastName }
app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, firstName: true, lastName: true }
  });
  res.json(users); // Apps antiguas esperaban fullName!
});
```

**Por qué es malo:**
- Apps móviles antiguas se rompen instantáneamente
- No hay período de transición
- Imposible mantener compatibilidad hacia atrás

**Solución correcta:**

```javascript
// ✅ BIEN: Ambas versiones coexisten
// v1: Legacy con fullName
app.get('/api/v1/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({
    data: users.map(u => ({
      id: u.id,
      email: u.email,
      fullName: `${u.firstName} ${u.lastName}`
    })),
    meta: {
      deprecation: 'v1 se retirará el 2026-01-01. Migra a v2'
    }
  });
});

// v2: Nueva estructura
app.get('/api/v2/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({
    data: users.map(u => ({
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName
    }))
  });
});
```

---

### Error 3: Códigos de estado incorrectos

**Código problemático:**

```javascript
// ❌ MAL: Siempre 200 incluso con errores
app.get('/api/products/:id', async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(req.params.id) }
  });

  if (!product) {
    return res.status(200).json({ error: 'Not found' }); // ❌ 200 cuando no existe!
  }

  res.json(product);
});

app.post('/api/products', async (req, res) => {
  const product = await prisma.product.create({ data: req.body });
  res.status(200).json(product); // ❌ 200 cuando debería ser 201!
});
```

**Por qué es malo:**
- El cliente no puede distinguir éxito de error
- Cachés HTTP no funcionan correctamente
- Dificulta debugging

**Solución correcta:**

```javascript
// ✅ BIEN: Códigos apropiados
app.get('/api/products/:id', async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(req.params.id) }
  });

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' }); // 404
  }

  res.status(200).json(product); // 200
});

app.post('/api/products', async (req, res) => {
  const product = await prisma.product.create({ data: req.body });
  res.status(201).json(product); // 201 Created
});
```

---

### Error 4: Sin rate limiting (vulnerabilidad a abuso)

**Código problemático:**

```javascript
// ❌ MAL: Sin protección contra abuso
app.post('/api/auth/login', async (req, res) => {
  // Alguien puede intentar 10,000 passwords por minuto!
  const user = await prisma.user.findUnique({
    where: { email: req.body.email }
  });
  // ...
});
```

**Por qué es malo:**
- Ataques de fuerza bruta
- Scrapers abusan del endpoint
- Costos de servidor se disparan

**Solución correcta:**

```javascript
// ✅ BIEN: Rate limiting con express-rate-limit
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 intentos
  message: 'Demasiados intentos. Intenta en 15 minutos',
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false
});

app.post('/api/auth/login', authLimiter, async (req, res) => {
  // Ahora protegido contra brute force
  const user = await prisma.user.findUnique({
    where: { email: req.body.email }
  });
  // ...
});
```

---

## Tabla Comparativa: API Básica vs API Profesional

| Aspecto | API Básica | API Profesional con Claude Code |
|---------|-----------|----------------------------------|
| **Paginación** | Sin paginación, devuelve todo | Cursor-based + offset, metadata completa |
| **Filtrado** | Sin filtros o muy básico | Multi-campo, operadores, búsqueda full-text |
| **Versionado** | Una sola versión sin versionado | v1/v2 con deprecation warnings y coexistencia |
| **Documentación** | README manual desactualizado | Swagger auto-generado desde JSDoc |
| **Rate Limiting** | Sin protección | Redis-based con headers informativos |
| **Caching** | Sin caching | ETags, Last-Modified, 304 Not Modified |
| **HATEOAS** | Sin hypermedia links | Links a recursos relacionados en respuestas |
| **Errores** | Código 200 con `{error: "..."}` | Códigos HTTP apropiados (400, 404, 500) |
| **Validación** | Validación manual if/else | Zod schemas con mensajes detallados |
| **Estructura** | Todo en un archivo | Controllers, Services, Routes separados |
| **Sorting** | Sin sorting o hardcoded | Sorting dinámico por cualquier campo |
| **Metadata** | Solo data | Data + pagination + filters + links |

---

## 7 Mejores Prácticas para APIs RESTful Profesionales

### 1. Usa sustantivos plurales en las URLs

```javascript
// ❌ MAL
GET /api/user
GET /api/getUser/5
POST /api/createUser

// ✅ BIEN
GET /api/users
GET /api/users/5
POST /api/users
```

**Razón:** REST trata recursos como colecciones. Los verbos HTTP ya indican la acción.

### 2. Versiona desde el día 1

```javascript
// ❌ MAL
GET /api/products

// ✅ BIEN
GET /api/v1/products

// Cuando evoluciones:
GET /api/v2/products // Nueva versión
GET /api/v1/products // Legacy sigue funcionando
```

**Razón:** Tarde o temprano necesitarás hacer breaking changes. Versionar tarde es doloroso.

### 3. Devuelve metadata útil en respuestas de lista

```javascript
// ❌ MAL
{
  "products": [...]
}

// ✅ BIEN
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "hasNext": true
  },
  "filters": {
    "category": "Electronics",
    "priceRange": "100-500"
  },
  "links": {
    "self": "/api/products?page=1",
    "next": "/api/products?page=2",
    "last": "/api/products?page=8"
  }
}
```

**Razón:** El cliente necesita saber cómo navegar, qué filtros están activos y dónde está.

### 4. Implementa paginación cursor-based para datasets grandes

```javascript
// Offset-based: SELECT * FROM products LIMIT 20 OFFSET 1000000
// Problema: OFFSET es lento con millones de registros

// ✅ Cursor-based: SELECT * FROM products WHERE id > 1234567 LIMIT 20
// Ventaja: Usa índices, siempre rápido
app.get('/api/products', async (req, res) => {
  const { cursor, limit = 20 } = req.query;

  const products = await prisma.product.findMany({
    take: limit + 1,
    cursor: cursor ? { id: parseInt(cursor) } : undefined,
    skip: cursor ? 1 : 0
  });

  const hasNext = products.length > limit;
  const data = hasNext ? products.slice(0, -1) : products;
  const nextCursor = hasNext ? data[data.length - 1].id : null;

  res.json({ data, nextCursor, hasNext });
});
```

### 5. Usa códigos de estado HTTP correctamente

```javascript
// CRUD completo con códigos apropiados
app.get('/api/products/:id', async (req, res) => {
  const product = await prisma.product.findUnique({...});
  if (!product) return res.status(404).json({...}); // Not Found
  res.status(200).json(product); // OK
});

app.post('/api/products', async (req, res) => {
  const product = await prisma.product.create({...});
  res.status(201).json(product); // Created
});

app.put('/api/products/:id', async (req, res) => {
  const product = await prisma.product.update({...});
  res.status(200).json(product); // OK
});

app.delete('/api/products/:id', async (req, res) => {
  await prisma.product.delete({...});
  res.status(204).send(); // No Content
});
```

### 6. Documenta automáticamente con Swagger

```javascript
// JSDoc + swagger-jsdoc = Docs siempre actualizadas
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lista productos
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', getProducts);

// Resultado: UI interactiva en /api-docs
```

### 7. Separa concerns: Routes → Controllers → Services

```javascript
// routes/productRoutes.js
router.get('/', productController.getProducts);

// controllers/productController.js
async function getProducts(req, res) {
  try {
    const products = await productService.findAll(req.query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// services/productService.js
async function findAll(filters) {
  return await prisma.product.findMany({
    where: buildWhereClause(filters)
  });
}
```

**Razón:** Facilita testing, reutilización y mantenimiento. Controllers manejan HTTP, Services contienen lógica de negocio.

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Principios de arquitectura REST**: REST es un conjunto de convenciones que hace tu API predecible y profesional. Usa sustantivos plurales en URLs, métodos HTTP apropiados y códigos de estado correctos.

2. **Paginación y filtrado avanzados**: Las APIs profesionales implementan paginación (offset o cursor-based), filtros multi-campo, sorting dinámico y búsqueda. Claude Code genera esto con metadata completa.

3. **Versionado y documentación**: Versiona tu API desde el día 1 para manejar breaking changes. Usa Swagger con JSDoc para documentación auto-generada que siempre está sincronizada con tu código.

---

## Siguiente paso

En la próxima lección: **Manejo de errores y validación con Zod**. Aprenderás a validar datos de entrada de forma robusta usando Zod, un sistema de validación que detecta errores antes de que lleguen a la base de datos. También verás cómo manejar errores de forma centralizada y devolver mensajes claros al cliente. ¡Tu API será mucho más segura y profesional!

---

**¿Dudas?** REST puede parecer "solo convenciones" al principio, y es tentador pensar "mi forma también funciona". Pero créeme: cuando trabajes en equipo, cuando consumas APIs de terceros, o cuando vuelvas a tu código después de 6 meses, agradecerás haber seguido estándares. REST es el idioma común que todos los desarrolladores backend hablan.
