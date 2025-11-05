# Módulo 6 - Lección 5: Manejo de Errores y Validación en Backend

## Introducción: De código optimista a código realista

Hasta ahora has asumido que todo sale bien: los usuarios siempre envían los datos correctos, la base de datos siempre responde, no hay errores de conexión. Pero en el mundo real, todo puede salir mal:

- Un usuario envía un email sin formato válido
- Alguien intenta crear un producto con precio "-500"
- La base de datos se cae justo cuando intentas guardar datos
- Un cliente envía una petición con campos que no existen en tu modelo

Imagina un cajero de banco que acepta cualquier cheque sin verificar firmas, montos o fondos disponibles. Sería un desastre, ¿verdad? Tu API necesita ser igual de cuidadosa: **validar todo antes de procesarlo** y **manejar errores gracefully** (de forma elegante).

Hoy aprenderás a blindar tu API con validación robusta usando Zod y a crear un sistema profesional de manejo de errores que hace tu aplicación confiable y fácil de debuggear.

---

## Objetivos de Aprendizaje

Al terminar esta lección, podrás:

1. **Validar datos de entrada con Zod**: Definir esquemas de validación que verifican tipos, formatos y reglas de negocio automáticamente
2. **Manejar errores con try-catch**: Capturar errores de forma efectiva y evitar que tu servidor se caiga
3. **Devolver respuestas de error claras**: Comunicar al cliente exactamente qué salió mal y cómo solucionarlo
4. **Implementar clases de error personalizadas**: Crear una jerarquía de errores tipados para mejor control
5. **Integrar logging profesional**: Usar Winston para registrar errores y eventos del sistema
6. **Implementar middleware de error global**: Centralizar el manejo de errores en toda la aplicación

---

## ¿Por qué validar datos de entrada?

**Nunca, NUNCA confíes en los datos que envía el cliente**. Puede ser:
- Un error honesto del usuario (escribió mal el email)
- Un bug en tu frontend (envía un campo con nombre incorrecto)
- Un ataque malicioso (alguien intentando romper tu API)

**Analogía del control de seguridad en el aeropuerto**:

Antes de subir al avión, pasas por seguridad donde verifican:
- Tu identificación (autenticación)
- Que no lleves objetos peligrosos (validación)
- Que tu equipaje cumpla las reglas (validación de datos)

Si intentas subir con una botella de 2 litros de agua, **te la rechazan antes de que subas al avión**, no cuando ya estás en el aire. De la misma forma, debes validar datos **antes de que lleguen a tu base de datos**, no después.

**Consecuencias de NO validar**:
- Datos corruptos en tu base de datos
- Errores inesperados que crashean el servidor
- Vulnerabilidades de seguridad (inyecciones SQL, XSS)
- Experiencia de usuario terrible (errores crípticos)

### Un dato interesante

El 60% de las vulnerabilidades de seguridad en aplicaciones web provienen de **falta de validación de entrada**. Validar correctamente no es opcional, es tu primera línea de defensa contra ataques y bugs.

---

## 🤖 Claude Code en Acción

En esta lección aprenderás a pedirle a Claude Code que implemente sistemas profesionales de manejo de errores y validación. Verás 3 prompts específicos y 1 workflow completo que transformarán tu API en una fortaleza robusta.

### Por qué Claude Code es ideal para esto

**Complejidad reducida**: Implementar un sistema completo de errores tipados, validación con Zod, logging con Winston y middleware de error puede tomar días. Claude Code lo hace en minutos con las mejores prácticas.

**Patrones enterprise**: Claude Code conoce los patrones de manejo de errores usados en empresas (clases de error custom, códigos de estado HTTP correctos, logging estructurado) y los implementa automáticamente.

**Cobertura completa**: No solo valida campos requeridos, también implementa validaciones complejas (refine), custom error messages, middleware reutilizables y tests.

---

## 📝 Prompt 1: Sistema de Errores Tipados con Clases Personalizadas

### El Prompt

```
Crea un sistema completo de manejo de errores para Express con:

1. Clases de error personalizadas:
   - AppError: Clase base con statusCode y isOperational
   - ValidationError (400): Para errores de validación
   - AuthError (401): Para errores de autenticación
   - NotFoundError (404): Para recursos no encontrados
   - DatabaseError (500): Para errores de base de datos

2. Middleware de error global que:
   - Capture todos los errores de la aplicación
   - Envíe respuestas apropiadas según el tipo de error
   - Loguee errores con detalles (stack trace) en desarrollo
   - Oculte detalles sensibles en producción

3. Helper functions para lanzar errores:
   - throwValidationError()
   - throwNotFoundError()
   - throwAuthError()

Estructura: /src/errors/classes.js, /src/middleware/errorHandler.js
```

### El Código Generado

**Archivo: src/errors/classes.js**

```javascript
/**
 * Sistema de clases de error personalizadas
 * Proporciona errores tipados con códigos de estado HTTP
 */

// Clase base para todos los errores de la aplicación
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Indica que es un error esperado, no un bug
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error de validación (400 Bad Request)
class ValidationError extends AppError {
  constructor(message = 'Datos de entrada inválidos', details = []) {
    super(message, 400);
    this.details = details; // Array de errores específicos de validación
  }
}

// Error de autenticación (401 Unauthorized)
class AuthError extends AppError {
  constructor(message = 'No autorizado') {
    super(message, 401);
  }
}

// Error de recurso no encontrado (404 Not Found)
class NotFoundError extends AppError {
  constructor(resource = 'Recurso', id = '') {
    const message = id
      ? `${resource} con ID ${id} no encontrado`
      : `${resource} no encontrado`;
    super(message, 404);
    this.resource = resource;
    this.resourceId = id;
  }
}

// Error de base de datos (500 Internal Server Error)
class DatabaseError extends AppError {
  constructor(message = 'Error de base de datos', originalError = null) {
    super(message, 500);
    this.originalError = originalError;
  }
}

// Helper functions para lanzar errores fácilmente
const throwValidationError = (message, details) => {
  throw new ValidationError(message, details);
};

const throwNotFoundError = (resource, id) => {
  throw new NotFoundError(resource, id);
};

const throwAuthError = (message) => {
  throw new AuthError(message);
};

const throwDatabaseError = (message, originalError) => {
  throw new DatabaseError(message, originalError);
};

module.exports = {
  AppError,
  ValidationError,
  AuthError,
  NotFoundError,
  DatabaseError,
  throwValidationError,
  throwNotFoundError,
  throwAuthError,
  throwDatabaseError
};
```

**Archivo: src/middleware/errorHandler.js**

```javascript
/**
 * Middleware global de manejo de errores
 * Captura todos los errores y envía respuestas apropiadas
 */

const { AppError } = require('../errors/classes');

// Middleware de error global (debe ir al final de todas las rutas)
const errorHandler = (err, req, res, next) => {
  // Si el error no es operacional, es un bug inesperado
  if (!(err instanceof AppError)) {
    console.error('ERROR NO ESPERADO:', err);

    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: process.env.NODE_ENV === 'development'
        ? err.message
        : 'Algo salió mal'
    });
  }

  // Error operacional esperado
  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    error: err.message
  };

  // Añadir detalles adicionales según el tipo de error
  if (err.details) {
    response.details = err.details;
  }

  if (err.resource) {
    response.resource = err.resource;
  }

  // En desarrollo, incluir stack trace
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  // Log del error para debugging
  console.error(`[${statusCode}] ${err.message}`);
  if (err.originalError) {
    console.error('Error original:', err.originalError);
  }

  res.status(statusCode).json(response);
};

// Middleware para capturar rutas no encontradas (404)
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
};
```

### Cómo Usar el Sistema de Errores

**En tus rutas:**

```javascript
const express = require('express');
const { throwNotFoundError, throwValidationError } = require('./errors/classes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

// Ruta de ejemplo
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validación simple
    if (isNaN(id)) {
      throwValidationError('ID debe ser un número');
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!user) {
      throwNotFoundError('Usuario', id);
    }

    res.json({ success: true, data: user });
  } catch (error) {
    next(error); // Pasa el error al middleware de error global
  }
});

// Middleware de 404 (después de todas las rutas)
app.use(notFoundHandler);

// Middleware de error global (debe ir al final)
app.use(errorHandler);

app.listen(3001, () => console.log('Server running on port 3001'));
```

### Por Qué Este Código Es Excelente

**1. Errores tipados y semánticos**
- Cada tipo de error tiene su propia clase con código HTTP correcto
- Fácil de entender qué tipo de error ocurrió solo viendo la clase

**2. Separación de errores operacionales vs bugs**
- `isOperational: true` marca errores esperados (usuario envía datos malos)
- Errores no operacionales son bugs en el código (null pointer, typos)

**3. Información contextual**
- NotFoundError incluye el recurso y ID
- ValidationError incluye detalles de qué campos fallaron
- DatabaseError preserva el error original para debugging

**4. Respuestas consistentes**
- Todos los errores siguen el mismo formato JSON
- El cliente siempre sabe qué esperar: `{ success: false, error: "mensaje" }`

**5. Seguridad por defecto**
- En producción, oculta stack traces y detalles sensibles
- En desarrollo, muestra toda la información para debugging

---

## 📝 Prompt 2: Validación Completa con Esquemas Zod

### El Prompt

```
Implementa validación robusta con Zod para una API de e-commerce:

1. Esquemas de validación para:
   - Registro de usuario (email, password, nombre)
   - Creación de producto (name, price, stock, category, description)
   - Creación de orden (items, shippingAddress, paymentMethod)

2. Validaciones avanzadas:
   - Email con formato válido
   - Password mínimo 8 caracteres, con mayúscula, minúscula y número
   - Precio positivo y con máximo 2 decimales
   - Stock entero no negativo
   - Category enum con valores específicos
   - Items array no vacío con products válidos

3. Middleware de validación reutilizable que:
   - Valide req.body, req.params o req.query según se especifique
   - Devuelva errores claros con detalles de qué falló
   - Use las clases de error del sistema anterior

Estructura: /src/validation/schemas.js, /src/middleware/validate.js
```

### El Código Generado

**Archivo: src/validation/schemas.js**

```javascript
/**
 * Esquemas de validación con Zod
 * Define la forma y reglas de los datos de entrada
 */

const { z } = require('zod');

// Esquema de registro de usuario
const signupSchema = z.object({
  email: z
    .string({ required_error: 'Email es requerido' })
    .email({ message: 'Formato de email inválido' })
    .toLowerCase()
    .trim(),

  password: z
    .string({ required_error: 'Password es requerido' })
    .min(8, { message: 'Password debe tener mínimo 8 caracteres' })
    .regex(/[A-Z]/, { message: 'Password debe contener al menos una mayúscula' })
    .regex(/[a-z]/, { message: 'Password debe contener al menos una minúscula' })
    .regex(/[0-9]/, { message: 'Password debe contener al menos un número' }),

  name: z
    .string({ required_error: 'Nombre es requerido' })
    .min(2, { message: 'Nombre debe tener mínimo 2 caracteres' })
    .max(100, { message: 'Nombre no puede exceder 100 caracteres' })
    .trim()
});

// Esquema de login
const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }).toLowerCase().trim(),
  password: z.string({ required_error: 'Password es requerido' })
});

// Esquema de producto
const productSchema = z.object({
  name: z
    .string({ required_error: 'Nombre del producto es requerido' })
    .min(3, { message: 'Nombre debe tener mínimo 3 caracteres' })
    .max(200, { message: 'Nombre no puede exceder 200 caracteres' })
    .trim(),

  description: z
    .string()
    .max(1000, { message: 'Descripción no puede exceder 1000 caracteres' })
    .optional(),

  price: z
    .number({ required_error: 'Precio es requerido' })
    .positive({ message: 'Precio debe ser positivo' })
    .refine(
      (val) => {
        // Verificar máximo 2 decimales
        const decimalPart = val.toString().split('.')[1];
        return !decimalPart || decimalPart.length <= 2;
      },
      { message: 'Precio puede tener máximo 2 decimales' }
    ),

  stock: z
    .number({ required_error: 'Stock es requerido' })
    .int({ message: 'Stock debe ser un número entero' })
    .min(0, { message: 'Stock no puede ser negativo' }),

  category: z.enum(
    ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Other'],
    {
      errorMap: () => ({ message: 'Categoría inválida' })
    }
  ),

  imageUrl: z
    .string()
    .url({ message: 'URL de imagen inválida' })
    .optional()
});

// Esquema para actualizar producto (todos los campos opcionales)
const updateProductSchema = productSchema.partial();

// Esquema de dirección de envío
const shippingAddressSchema = z.object({
  street: z.string().min(5, { message: 'Calle debe tener mínimo 5 caracteres' }),
  city: z.string().min(2, { message: 'Ciudad es requerida' }),
  state: z.string().min(2, { message: 'Estado/Provincia es requerido' }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, {
    message: 'Código postal inválido (formato: 12345 o 12345-6789)'
  }),
  country: z.string().min(2, { message: 'País es requerido' })
});

// Esquema de item de orden
const orderItemSchema = z.object({
  productId: z.number().int().positive({ message: 'Product ID inválido' }),
  quantity: z
    .number()
    .int()
    .positive({ message: 'Cantidad debe ser positiva' })
    .max(100, { message: 'Cantidad máxima es 100 por producto' })
});

// Esquema de orden
const orderSchema = z.object({
  items: z
    .array(orderItemSchema)
    .min(1, { message: 'La orden debe tener al menos un producto' })
    .max(50, { message: 'Máximo 50 productos por orden' }),

  shippingAddress: shippingAddressSchema,

  paymentMethod: z.enum(
    ['credit_card', 'paypal', 'bank_transfer'],
    {
      errorMap: () => ({ message: 'Método de pago inválido' })
    }
  )
}).refine(
  (data) => {
    // Validación cross-field: verificar que no haya productos duplicados
    const productIds = data.items.map(item => item.productId);
    const uniqueIds = new Set(productIds);
    return productIds.length === uniqueIds.size;
  },
  {
    message: 'No puede haber productos duplicados en la orden',
    path: ['items']
  }
);

// Esquema de parámetros de ID
const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: 'ID debe ser un número' })
    .transform((val) => parseInt(val))
});

// Esquema de query params de paginación
const paginationQuerySchema = z.object({
  page: z
    .string()
    .regex(/^\d+$/, { message: 'page debe ser un número' })
    .transform((val) => parseInt(val))
    .optional()
    .default('1'),

  limit: z
    .string()
    .regex(/^\d+$/, { message: 'limit debe ser un número' })
    .transform((val) => Math.min(parseInt(val), 100)) // Máximo 100
    .optional()
    .default('10')
});

module.exports = {
  signupSchema,
  loginSchema,
  productSchema,
  updateProductSchema,
  orderSchema,
  idParamSchema,
  paginationQuerySchema
};
```

**Archivo: src/middleware/validate.js**

```javascript
/**
 * Middleware de validación con Zod
 * Valida diferentes partes del request (body, params, query)
 */

const { ValidationError } = require('../errors/classes');

/**
 * Crea un middleware de validación para un esquema específico
 * @param {ZodSchema} schema - Esquema de Zod a validar
 * @param {string} source - De dónde leer los datos ('body', 'params', 'query')
 * @returns {Function} Middleware de Express
 */
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    // Obtener los datos de la fuente especificada
    const dataToValidate = req[source];

    // Validar con Zod
    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      // Formatear los errores de Zod para respuesta
      const errors = result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code
      }));

      // Lanzar ValidationError con detalles
      return next(new ValidationError('Errores de validación', errors));
    }

    // Si la validación pasó, reemplazar los datos con los validados y transformados
    req[source] = result.data;

    // Si validamos params o query, guardar también en validatedData
    if (source !== 'body') {
      req.validatedData = req.validatedData || {};
      req.validatedData[source] = result.data;
    } else {
      req.validatedData = result.data;
    }

    next();
  };
};

/**
 * Middleware para validar múltiples fuentes a la vez
 * @param {Object} schemas - Objeto con schemas para body, params, query
 * @returns {Function} Middleware de Express
 */
const validateMultiple = (schemas) => {
  return async (req, res, next) => {
    try {
      const validatedData = {};

      // Validar cada fuente especificada
      for (const [source, schema] of Object.entries(schemas)) {
        const dataToValidate = req[source];
        const result = schema.safeParse(dataToValidate);

        if (!result.success) {
          const errors = result.error.errors.map(err => ({
            source,
            field: err.path.join('.'),
            message: err.message,
            code: err.code
          }));

          return next(new ValidationError('Errores de validación', errors));
        }

        validatedData[source] = result.data;
        req[source] = result.data;
      }

      req.validatedData = validatedData;
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  validate,
  validateMultiple
};
```

### Cómo Usar la Validación

**Ejemplo completo de rutas con validación:**

```javascript
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { validate, validateMultiple } = require('./middleware/validate');
const {
  signupSchema,
  loginSchema,
  productSchema,
  updateProductSchema,
  orderSchema,
  idParamSchema,
  paginationQuerySchema
} = require('./validation/schemas');
const { throwNotFoundError } = require('./errors/classes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// AUTENTICACIÓN
app.post('/api/auth/signup', validate(signupSchema), async (req, res, next) => {
  try {
    const { email, password, name } = req.validatedData;

    // Aquí iría el hash del password y creación del usuario
    const user = await prisma.user.create({
      data: { email, password, name }
    });

    res.status(201).json({
      success: true,
      data: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.validatedData;
    // Aquí iría la lógica de login
    res.json({ success: true, token: 'jwt-token-here' });
  } catch (error) {
    next(error);
  }
});

// PRODUCTOS
app.get(
  '/api/products',
  validate(paginationQuerySchema, 'query'),
  async (req, res, next) => {
    try {
      const { page, limit } = req.validatedData;
      const skip = (page - 1) * limit;

      const products = await prisma.product.findMany({
        skip,
        take: limit
      });

      const total = await prisma.product.count();

      res.json({
        success: true,
        data: products,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  '/api/products/:id',
  validate(idParamSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.validatedData;

      const product = await prisma.product.findUnique({
        where: { id }
      });

      if (!product) {
        throwNotFoundError('Producto', id);
      }

      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  }
);

app.post('/api/products', validate(productSchema), async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: req.validatedData
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

app.put(
  '/api/products/:id',
  validateMultiple({ params: idParamSchema, body: updateProductSchema }),
  async (req, res, next) => {
    try {
      const { id } = req.validatedData.params;
      const updateData = req.validatedData.body;

      const product = await prisma.product.update({
        where: { id },
        data: updateData
      });

      res.json({ success: true, data: product });
    } catch (error) {
      if (error.code === 'P2025') {
        return next(throwNotFoundError('Producto', id));
      }
      next(error);
    }
  }
);

// ÓRDENES
app.post('/api/orders', validate(orderSchema), async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.validatedData;

    // Verificar que todos los productos existen
    const productIds = items.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    if (products.length !== productIds.length) {
      throwValidationError('Algunos productos no existen');
    }

    // Crear la orden (simplificado)
    const order = await prisma.order.create({
      data: {
        // ... lógica de creación
      }
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
});

// Middleware de 404 y error global
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3001, () => console.log('Server running on port 3001'));
```

### Por Qué Este Código Es Excelente

**1. Validaciones declarativas y legibles**
- Los esquemas son auto-documentantes: leer el schema es entender qué datos espera la API
- Fácil de mantener: cambiar reglas solo requiere modificar el schema

**2. Validaciones avanzadas con refine()**
- Precio con máximo 2 decimales
- Password con requisitos complejos (mayúscula, minúscula, número)
- Validación cross-field (no productos duplicados en orden)

**3. Transformaciones automáticas**
- `.toLowerCase()` y `.trim()` limpian los datos automáticamente
- `transform()` convierte strings a números en params y query
- `.default()` proporciona valores por defecto

**4. Mensajes de error claros y específicos**
- Cada validación tiene un mensaje personalizado
- El cliente sabe exactamente qué campo falló y por qué

**5. Middleware flexible**
- `validate(schema, 'body')` - Valida body
- `validate(schema, 'params')` - Valida params
- `validateMultiple({ params: schema1, body: schema2 })` - Valida múltiples fuentes

**6. Integración perfecta con sistema de errores**
- Lanza ValidationError con detalles estructurados
- El middleware de error global los maneja consistentemente

---

## 📝 Prompt 3: Logging Profesional con Winston y Monitoreo

### El Prompt

```
Implementa sistema completo de logging y monitoreo de errores:

1. Logging con Winston:
   - Console transport para desarrollo
   - File transport con rotación (error.log, combined.log)
   - JSON format para logs estructurados
   - Niveles apropiados (error, warn, info, debug)

2. Middleware de logging de requests:
   - Loguear cada request (método, ruta, IP, user agent)
   - Loguear tiempo de respuesta
   - Loguear errores con stack trace completo

3. Integración con Sentry (opcional):
   - Capturar errores en producción
   - Enviar stack traces y contexto
   - Tracking de usuarios afectados

4. Health check endpoints:
   - GET /health - Status básico del servidor
   - GET /health/db - Status de conexión a base de datos

Estructura: /src/utils/logger.js, /src/middleware/requestLogger.js, /src/routes/health.js
```

### El Código Generado

**Archivo: src/utils/logger.js**

```javascript
/**
 * Sistema de logging con Winston
 * Registra eventos, errores y debugging info
 */

const winston = require('winston');
const path = require('path');

// Definir niveles de log personalizados
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

// Colores para los niveles en consola
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue'
};

winston.addColors(colors);

// Formato para logs en archivos (JSON estructurado)
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Formato para logs en consola (colorizado y legible)
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => {
      const { timestamp, level, message, ...meta } = info;
      const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
      return `${timestamp} [${level}]: ${message} ${metaStr}`;
    }
  )
);

// Crear el logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  levels,
  transports: [
    // Console transport (siempre activo)
    new winston.transports.Console({
      format: consoleFormat
    }),

    // File transport para errores
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error',
      format: fileFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),

    // File transport para todos los logs
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/combined.log'),
      format: fileFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
});

// Helpers para facilitar el logging
const logInfo = (message, meta = {}) => {
  logger.info(message, meta);
};

const logError = (message, error = null) => {
  if (error) {
    logger.error(message, {
      error: error.message,
      stack: error.stack,
      ...error
    });
  } else {
    logger.error(message);
  }
};

const logWarn = (message, meta = {}) => {
  logger.warn(message, meta);
};

const logDebug = (message, meta = {}) => {
  logger.debug(message, meta);
};

const logHttp = (message, meta = {}) => {
  logger.http(message, meta);
};

module.exports = {
  logger,
  logInfo,
  logError,
  logWarn,
  logDebug,
  logHttp
};
```

**Archivo: src/middleware/requestLogger.js**

```javascript
/**
 * Middleware para loguear requests HTTP
 * Registra cada petición con detalles útiles para debugging
 */

const { logHttp, logError } = require('../utils/logger');

// Middleware de logging de requests
const requestLogger = (req, res, next) => {
  // Guardar el tiempo de inicio
  const startTime = Date.now();

  // Capturar el método write original de res
  const originalSend = res.send;

  // Override res.send para capturar cuando se envía la respuesta
  res.send = function (data) {
    const duration = Date.now() - startTime;

    // Información del request
    const logData = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent'),
      userId: req.user?.id || 'anonymous'
    };

    // Log con nivel apropiado según status code
    if (res.statusCode >= 500) {
      logError('Server Error', logData);
    } else if (res.statusCode >= 400) {
      logHttp('Client Error', logData);
    } else {
      logHttp('Request completed', logData);
    }

    // Llamar al método original
    originalSend.call(this, data);
  };

  next();
};

module.exports = requestLogger;
```

**Archivo: src/middleware/errorLogger.js**

```javascript
/**
 * Middleware para loguear errores detallados
 * Se ejecuta antes del errorHandler
 */

const { logError } = require('../utils/logger');

const errorLogger = (err, req, res, next) => {
  // Información detallada del error
  const errorInfo = {
    message: err.message,
    statusCode: err.statusCode || 500,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userId: req.user?.id || 'anonymous',
    body: req.body,
    params: req.params,
    query: req.query
  };

  // Si hay error original (ej: de Prisma), incluirlo
  if (err.originalError) {
    errorInfo.originalError = {
      message: err.originalError.message,
      stack: err.originalError.stack
    };
  }

  // Log del error
  logError('Application Error', errorInfo);

  // Pasar al siguiente middleware (errorHandler)
  next(err);
};

module.exports = errorLogger;
```

**Archivo: src/utils/sentry.js** (Opcional)

```javascript
/**
 * Integración con Sentry para monitoreo de errores en producción
 * npm install @sentry/node
 */

const Sentry = require('@sentry/node');
const { logInfo } = require('./logger');

// Inicializar Sentry solo en producción
const initSentry = (app) => {
  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0, // Capturar 100% de transacciones

      // Filtrar información sensible
      beforeSend(event, hint) {
        // No enviar passwords ni tokens
        if (event.request) {
          delete event.request.headers?.authorization;
          if (event.request.data) {
            delete event.request.data.password;
            delete event.request.data.token;
          }
        }
        return event;
      }
    });

    // Request handler (debe ir primero)
    app.use(Sentry.Handlers.requestHandler());

    // Tracing handler
    app.use(Sentry.Handlers.tracingHandler());

    logInfo('Sentry initialized successfully');
  }
};

// Error handler de Sentry (debe ir después de todas las rutas)
const sentryErrorHandler = () => {
  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    return Sentry.Handlers.errorHandler({
      shouldHandleError(error) {
        // Solo enviar errores 5xx a Sentry
        return error.statusCode >= 500 || !error.statusCode;
      }
    });
  }

  // Middleware vacío si Sentry no está configurado
  return (err, req, res, next) => next(err);
};

module.exports = {
  initSentry,
  sentryErrorHandler,
  Sentry
};
```

**Archivo: src/routes/health.js**

```javascript
/**
 * Endpoints de health check
 * Permiten monitorear el estado del servidor y sus dependencias
 */

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Health check básico
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// Health check de base de datos
router.get('/health/db', async (req, res) => {
  try {
    // Intentar hacer una query simple
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Health check detallado (incluye métricas)
router.get('/health/detailed', async (req, res) => {
  const memoryUsage = process.memoryUsage();

  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      database: 'connected',
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`
      },
      node: process.version
    });
  } catch (error) {
    res.status(503).json({
      status: 'degraded',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
```

### Integración Completa

**Archivo: src/index.js** (Servidor principal con todo integrado)

```javascript
const express = require('express');
const { PrismaClient } = require('@prisma/client');

// Importar sistema de errores
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const errorLogger = require('./middleware/errorLogger');

// Importar sistema de logging
const requestLogger = require('./middleware/requestLogger');
const { logInfo, logError } = require('./utils/logger');
const { initSentry, sentryErrorHandler } = require('./utils/sentry');

// Importar rutas
const healthRoutes = require('./routes/health');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Inicializar Sentry (producción)
initSentry(app);

// Middleware básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging de requests
app.use(requestLogger);

// Rutas
app.use(healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Middleware de error de Sentry (antes de 404 y errorHandler)
app.use(sentryErrorHandler());

// Middleware de 404
app.use(notFoundHandler);

// Middleware de logging de errores (antes de errorHandler)
app.use(errorLogger);

// Middleware de manejo de errores global (debe ir al final)
app.use(errorHandler);

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  logError('Unhandled Promise Rejection', {
    reason,
    promise
  });
  // En producción, considera hacer shutdown graceful
});

process.on('uncaughtException', (error) => {
  logError('Uncaught Exception', error);
  // Shutdown graceful
  process.exit(1);
});

// Iniciar servidor
app.listen(PORT, () => {
  logInfo(`Server running on port ${PORT}`, {
    environment: process.env.NODE_ENV,
    nodeVersion: process.version
  });
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  logInfo(`${signal} received, starting graceful shutdown`);

  // Cerrar servidor
  server.close(async () => {
    logInfo('HTTP server closed');

    // Cerrar conexión a base de datos
    await prisma.$disconnect();
    logInfo('Database connection closed');

    process.exit(0);
  });

  // Forzar cierre después de 10 segundos
  setTimeout(() => {
    logError('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
```

### Por Qué Este Código Es Excelente

**1. Logging estructurado con Winston**
- Logs en JSON para fácil parsing y análisis
- Rotación automática de archivos (max 5MB, mantiene 5 archivos)
- Diferentes niveles para diferentes entornos (debug en dev, info en prod)

**2. Información contextual rica**
- Cada log incluye timestamp, método, URL, IP, user ID
- Errores incluyen stack trace completo
- Tiempo de respuesta para cada request

**3. Integración con Sentry**
- Captura errores en producción automáticamente
- Filtra información sensible (passwords, tokens)
- Solo envía errores 5xx (no 4xx client errors)

**4. Health checks completos**
- `/health` - Status básico (uptime, environment)
- `/health/db` - Verifica conexión a base de datos
- `/health/detailed` - Métricas completas (memoria, uptime, etc.)

**5. Graceful shutdown**
- Cierra el servidor ordenadamente al recibir señales
- Espera que requests activos terminen
- Cierra conexiones (DB) antes de salir
- Forzado después de timeout (10s)

**6. Manejo de errores no capturados**
- `unhandledRejection` - Promesas sin catch
- `uncaughtException` - Excepciones no manejadas
- Loguea y hace shutdown seguro

---

## 🔄 Workflow Completo: Sistema Enterprise de Error Handling

### El Prompt

```
Crea un sistema completo enterprise-grade de manejo de errores integrando:

1. Clases de error tipadas con jerarquía completa
2. Validación exhaustiva con Zod para todos los endpoints
3. Logging con Winston + file rotation
4. Integración con Sentry para producción
5. Request ID tracking con UUID para trazabilidad
6. Rate limiting para prevenir abuso
7. Health checks y métricas
8. Tests para todos los componentes

Estructura completa del proyecto con:
- /src/errors/ (clases de error)
- /src/middleware/ (validación, logging, error handling)
- /src/validation/ (schemas de Zod)
- /src/routes/ (rutas con validación completa)
- /src/utils/ (logger, helpers)
- /tests/ (tests unitarios y de integración)

Implementa una API de e-commerce completa (auth, products, orders) con todos los sistemas integrados.
```

### El Workflow Paso a Paso

Claude Code generará:

**1. Estructura del proyecto**

```
ecommerce-api/
├── src/
│   ├── errors/
│   │   ├── classes.js              # Clases de error tipadas
│   │   └── codes.js                # Códigos de error para cliente
│   ├── middleware/
│   │   ├── errorHandler.js         # Middleware de error global
│   │   ├── errorLogger.js          # Logging de errores
│   │   ├── requestLogger.js        # Logging de requests
│   │   ├── validate.js             # Middleware de validación
│   │   ├── auth.js                 # Middleware de autenticación
│   │   ├── rateLimiter.js          # Rate limiting
│   │   └── requestId.js            # UUID tracking
│   ├── validation/
│   │   ├── auth.schemas.js         # Schemas de autenticación
│   │   ├── product.schemas.js      # Schemas de productos
│   │   ├── order.schemas.js        # Schemas de órdenes
│   │   └── common.schemas.js       # Schemas reutilizables
│   ├── routes/
│   │   ├── auth.routes.js          # Rutas de autenticación
│   │   ├── product.routes.js       # Rutas de productos
│   │   ├── order.routes.js         # Rutas de órdenes
│   │   └── health.routes.js        # Health checks
│   ├── controllers/
│   │   ├── auth.controller.js      # Lógica de autenticación
│   │   ├── product.controller.js   # Lógica de productos
│   │   └── order.controller.js     # Lógica de órdenes
│   ├── services/
│   │   ├── auth.service.js         # Servicios de auth
│   │   ├── product.service.js      # Servicios de productos
│   │   └── order.service.js        # Servicios de órdenes
│   ├── utils/
│   │   ├── logger.js               # Winston logger
│   │   ├── sentry.js               # Sentry integration
│   │   ├── jwt.js                  # JWT helpers
│   │   └── password.js             # Password hashing
│   └── index.js                    # Entry point
├── tests/
│   ├── unit/
│   │   ├── errors.test.js          # Tests de clases de error
│   │   ├── validation.test.js      # Tests de validación
│   │   └── logger.test.js          # Tests de logger
│   ├── integration/
│   │   ├── auth.test.js            # Tests de autenticación
│   │   ├── products.test.js        # Tests de productos
│   │   └── orders.test.js          # Tests de órdenes
│   └── setup.js                    # Setup de tests
├── logs/                           # Logs generados
├── prisma/
│   └── schema.prisma               # Schema de base de datos
├── .env.example                    # Variables de entorno
├── package.json
└── README.md
```

**2. Características del sistema completo**

**Request ID tracking:**

```javascript
// src/middleware/requestId.js
const { v4: uuidv4 } = require('uuid');

const requestIdMiddleware = (req, res, next) => {
  // Generar o usar request ID existente
  const requestId = req.headers['x-request-id'] || uuidv4();

  // Añadir al request y response
  req.requestId = requestId;
  res.setHeader('X-Request-ID', requestId);

  next();
};

module.exports = requestIdMiddleware;
```

**Rate limiting:**

```javascript
// src/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');
const { logWarn } = require('../utils/logger');

// Rate limiter general
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por ventana
  message: {
    success: false,
    error: 'Demasiadas peticiones, intenta de nuevo más tarde'
  },
  handler: (req, res) => {
    logWarn('Rate limit exceeded', {
      ip: req.ip,
      path: req.path,
      requestId: req.requestId
    });

    res.status(429).json({
      success: false,
      error: 'Demasiadas peticiones, intenta de nuevo más tarde'
    });
  }
});

// Rate limiter estricto para auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Solo 5 intentos de login
  skipSuccessfulRequests: true
});

// Rate limiter para creación de recursos
const createLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10 // 10 creaciones por minuto
});

module.exports = {
  generalLimiter,
  authLimiter,
  createLimiter
};
```

**Códigos de error para cliente:**

```javascript
// src/errors/codes.js
/**
 * Códigos de error consistentes para el cliente
 * Facilitan el manejo de errores en el frontend
 */

const ERROR_CODES = {
  // Autenticación (1xxx)
  AUTH_INVALID_CREDENTIALS: 'AUTH_1001',
  AUTH_TOKEN_EXPIRED: 'AUTH_1002',
  AUTH_TOKEN_INVALID: 'AUTH_1003',
  AUTH_USER_NOT_FOUND: 'AUTH_1004',
  AUTH_EMAIL_ALREADY_EXISTS: 'AUTH_1005',

  // Validación (2xxx)
  VALIDATION_FAILED: 'VAL_2001',
  VALIDATION_EMAIL_INVALID: 'VAL_2002',
  VALIDATION_PASSWORD_WEAK: 'VAL_2003',
  VALIDATION_REQUIRED_FIELD: 'VAL_2004',

  // Recursos (3xxx)
  RESOURCE_NOT_FOUND: 'RES_3001',
  RESOURCE_ALREADY_EXISTS: 'RES_3002',
  RESOURCE_CONFLICT: 'RES_3003',

  // Base de datos (4xxx)
  DATABASE_ERROR: 'DB_4001',
  DATABASE_CONNECTION_FAILED: 'DB_4002',
  DATABASE_CONSTRAINT_VIOLATION: 'DB_4003',

  // Servidor (5xxx)
  INTERNAL_SERVER_ERROR: 'SRV_5001',
  SERVICE_UNAVAILABLE: 'SRV_5002'
};

module.exports = ERROR_CODES;
```

**Clases de error mejoradas con códigos:**

```javascript
// src/errors/classes.js (versión mejorada)
const ERROR_CODES = require('./codes');

class AppError extends Error {
  constructor(message, statusCode, code = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message = 'Datos de entrada inválidos', details = []) {
    super(message, 400, ERROR_CODES.VALIDATION_FAILED);
    this.details = details;
  }
}

class AuthError extends AppError {
  constructor(message = 'No autorizado', code = ERROR_CODES.AUTH_TOKEN_INVALID) {
    super(message, 401, code);
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Recurso', id = '') {
    const message = id
      ? `${resource} con ID ${id} no encontrado`
      : `${resource} no encontrado`;
    super(message, 404, ERROR_CODES.RESOURCE_NOT_FOUND);
    this.resource = resource;
    this.resourceId = id;
  }
}

// ... resto de clases

module.exports = {
  AppError,
  ValidationError,
  AuthError,
  NotFoundError,
  DatabaseError,
  ERROR_CODES
};
```

**3. Ejemplo de ruta completa con todos los sistemas integrados**

```javascript
// src/routes/product.routes.js
const express = require('express');
const { validate } = require('../middleware/validate');
const { authenticate } = require('../middleware/auth');
const { createLimiter } = require('../middleware/rateLimiter');
const {
  productSchema,
  updateProductSchema,
  idParamSchema,
  paginationQuerySchema
} = require('../validation/product.schemas');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller');

const router = express.Router();

// GET /api/products - Listar productos (público)
router.get(
  '/',
  validate(paginationQuerySchema, 'query'),
  getProducts
);

// GET /api/products/:id - Obtener producto (público)
router.get(
  '/:id',
  validate(idParamSchema, 'params'),
  getProduct
);

// POST /api/products - Crear producto (autenticado + rate limited)
router.post(
  '/',
  authenticate,
  createLimiter,
  validate(productSchema),
  createProduct
);

// PUT /api/products/:id - Actualizar producto (autenticado)
router.put(
  '/:id',
  authenticate,
  validate(idParamSchema, 'params'),
  validate(updateProductSchema),
  updateProduct
);

// DELETE /api/products/:id - Eliminar producto (autenticado)
router.delete(
  '/:id',
  authenticate,
  validate(idParamSchema, 'params'),
  deleteProduct
);

module.exports = router;
```

**4. Logger mejorado con request ID**

```javascript
// src/middleware/requestLogger.js (versión mejorada)
const { logHttp, logError } = require('../utils/logger');

const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  const originalSend = res.send;

  res.send = function (data) {
    const duration = Date.now() - startTime;

    const logData = {
      requestId: req.requestId,  // UUID tracking
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      userId: req.user?.id || 'anonymous'
    };

    if (res.statusCode >= 500) {
      logError('Server Error', logData);
    } else if (res.statusCode >= 400) {
      logHttp('Client Error', logData);
    } else {
      logHttp('Request completed', logData);
    }

    originalSend.call(this, data);
  };

  next();
};

module.exports = requestLogger;
```

### Resultado Final

Un sistema **enterprise-grade** que:

- ✅ Valida **todos** los inputs con Zod
- ✅ Maneja **todos** los errores con clases tipadas
- ✅ Loguea **todo** con Winston (files + console + rotation)
- ✅ Trackea **cada request** con UUID
- ✅ Protege contra **abuso** con rate limiting
- ✅ Monitorea **producción** con Sentry
- ✅ Proporciona **health checks** para monitoring
- ✅ Hace **shutdown graceful** sin perder requests
- ✅ Tiene **códigos de error** consistentes para el cliente
- ✅ **Testeado** completamente

### Comando para iniciar

```bash
# Instalación
npm install express prisma @prisma/client zod winston express-rate-limit uuid @sentry/node

# Desarrollo
npm run dev

# Producción
npm start

# Tests
npm test
```

---

## ⚠️ Errores Comunes y Soluciones

### Error 1: Usar parse() en lugar de safeParse()

**Síntoma**: El servidor crashea cuando hay datos inválidos

**Código problemático:**
```javascript
const data = schema.parse(req.body); // Lanza excepción si falla
```

**Solución:**
```javascript
const result = schema.safeParse(req.body);
if (!result.success) {
  // Manejar error sin crashear
  return res.status(400).json({ errors: result.error.errors });
}
```

### Error 2: No validar params y query

**Síntoma**: El servidor crashea con `NaN` o valores inesperados

**Código vulnerable:**
```javascript
app.get('/api/users/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) } // Si id='abc', parseInt da NaN
  });
});
```

**Solución:**
```javascript
app.get(
  '/api/users/:id',
  validate(idParamSchema, 'params'),
  async (req, res) => {
    const { id } = req.validatedData; // Ya está validado y convertido a número
    const user = await prisma.user.findUnique({ where: { id } });
  }
);
```

### Error 3: Revelar información sensible en errores

**Síntoma**: Los errores muestran estructura de DB o stack traces al cliente

**Código inseguro:**
```javascript
catch (error) {
  res.status(500).json({ error: error.message }); // Puede revelar secretos
}
```

**Solución:**
```javascript
catch (error) {
  console.error('Error interno:', error); // Log para ti
  res.status(500).json({
    error: 'Error interno del servidor' // Mensaje genérico al cliente
  });
}
```

### Error 4: No cerrar conexiones en tests

**Síntoma**: Tests terminan pero el proceso sigue corriendo

**Solución:**
```javascript
import { afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

afterAll(async () => {
  await prisma.$disconnect(); // Cierra la conexión
});
```

---

## 📊 Tabla Comparativa: Validación Manual vs Zod

| Aspecto | Validación Manual | Validación con Zod |
|---------|-------------------|-------------------|
| **Código necesario** | 50-100 líneas por endpoint | 5-15 líneas por schema |
| **Mensajes de error** | Debes escribir cada uno | Generados automáticamente |
| **Validaciones complejas** | Difícil de mantener | Fácil con `.refine()` |
| **Type safety** | No (manual) | Sí (automático con TypeScript) |
| **Transformaciones** | Manual con if/else | Automático con `.transform()` |
| **Reutilización** | Difícil (copy-paste) | Fácil (componer schemas) |
| **Testing** | Muchos tests necesarios | Menos tests (Zod ya está testeado) |
| **Documentación** | Comentarios manuales | El schema es auto-documentante |
| **Mantenimiento** | Alto (cambios en múltiples lugares) | Bajo (cambios centralizados) |

---

## 🎯 Mejores Prácticas: Manejo de Errores y Validación

### 1. Valida TODO (body, params, query)

```javascript
// ❌ Malo - Solo valida body
app.post('/api/products', validate(productSchema), createProduct);

// ✅ Bueno - Valida body y params
app.put(
  '/api/products/:id',
  validateMultiple({ params: idParamSchema, body: updateProductSchema }),
  updateProduct
);
```

### 2. Usa clases de error específicas

```javascript
// ❌ Malo - Error genérico
throw new Error('Usuario no encontrado');

// ✅ Bueno - Error tipado
throwNotFoundError('Usuario', id);
```

### 3. Loguea con niveles apropiados

```javascript
// ❌ Malo - Todo con console.log
console.log('Usuario creado');
console.log('Error de validación');
console.log('Servidor iniciado');

// ✅ Bueno - Niveles semánticos
logInfo('Usuario creado', { userId: user.id });
logWarn('Error de validación', { errors });
logError('Error de base de datos', error);
```

### 4. Incluye contexto en logs

```javascript
// ❌ Malo - Log sin contexto
logError('Error al crear usuario');

// ✅ Bueno - Log con contexto completo
logError('Error al crear usuario', {
  requestId: req.requestId,
  email: req.body.email,
  ip: req.ip,
  error: error.message,
  stack: error.stack
});
```

### 5. Responde con formato consistente

```javascript
// ❌ Malo - Formatos inconsistentes
res.json({ user: data });
res.json({ error: 'Algo malo' });
res.json({ result: 'ok', data: user });

// ✅ Bueno - Formato uniforme
res.json({ success: true, data: user });
res.status(400).json({ success: false, error: 'Mensaje', details: [] });
```

### 6. Usa middleware de error global

```javascript
// ❌ Malo - Manejo de error en cada ruta
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno' });
  }
});

// ✅ Bueno - Delega al middleware global
app.get('/api/users', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ success: true, data: users });
  } catch (error) {
    next(error); // Middleware global lo maneja
  }
});
```

### 7. Transforma datos al validar

```javascript
// ❌ Malo - Transformación manual
const email = req.body.email.toLowerCase().trim();
const price = parseFloat(req.body.price);

// ✅ Bueno - Transformación automática en schema
const schema = z.object({
  email: z.string().email().toLowerCase().trim(),
  price: z.string().transform((val) => parseFloat(val))
});
```

---

## 🎓 Resumen Ejecutivo

### Conceptos Clave

1. **Errores tipados con clases personalizadas**: Crea una jerarquía de errores (AppError, ValidationError, AuthError, NotFoundError, DatabaseError) con códigos HTTP apropiados para manejo consistente

2. **Validación declarativa con Zod**: Define schemas que validan automáticamente tipos, formatos y reglas de negocio. Usa `safeParse()` para validar sin excepciones

3. **Middleware de error global**: Centraliza el manejo de errores en un solo lugar que captura todos los errores y envía respuestas apropiadas

4. **Logging estructurado con Winston**: Registra eventos con niveles (error, warn, info, debug), rotación de archivos y contexto completo para debugging

5. **Request tracking con UUID**: Asigna un ID único a cada request para trazabilidad completa en logs y debugging

6. **Rate limiting**: Protege tu API contra abuso limitando requests por IP y endpoint

7. **Graceful shutdown**: Cierra el servidor ordenadamente cuando recibe señales (SIGTERM, SIGINT), esperando que requests activos terminen

### Lo Más Importante

- **Nunca confíes en datos del cliente**: Valida SIEMPRE body, params y query antes de procesarlos
- **Errores operacionales vs bugs**: Distingue errores esperados (usuario envía datos malos) de bugs en tu código
- **Log con contexto**: Cada log debe incluir requestId, userId, timestamp y detalles relevantes
- **Respuestas consistentes**: Usa el mismo formato JSON para todas las respuestas (éxito y error)
- **Seguridad por defecto**: Oculta detalles sensibles en producción, muestra todo en desarrollo

### Próximos Pasos

Ahora que dominas el manejo de errores y validación, en la siguiente lección aprenderás a testear tu backend completamente con Vitest y Supertest, creando una suite de tests que verifica que todo funciona correctamente y te da confianza para hacer cambios sin romper nada.

---

## 📚 Recursos Adicionales

- **Documentación oficial de Zod**: https://zod.dev
- **Winston Logging**: https://github.com/winstonjs/winston
- **Sentry Error Tracking**: https://docs.sentry.io/platforms/node/
- **Express Error Handling**: https://expressjs.com/en/guide/error-handling.html
- **HTTP Status Codes**: https://httpstatuses.com

---

**¿Dudas?** La validación puede sentirse como trabajo extra al principio, pero es una inversión que paga dividendos enormes. Cada validación que escribes es un bug menos que tendrás que debuggear a las 3 AM cuando tu app esté en producción. Piensa en la validación como el control de calidad de una fábrica: detectar defectos temprano es infinitamente más barato que solucionarlos después.
