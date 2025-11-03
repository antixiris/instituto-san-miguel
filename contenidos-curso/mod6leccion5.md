<p><strong><em>Haciendo tu API robusta: manejo de errores y validación</em></strong></p>

## Introducción: De código optimista a código realista

Hasta ahora has asumido que todo sale bien: los usuarios siempre envían los datos correctos, la base de datos siempre responde, no hay errores de conexión. Pero en el mundo real, todo puede salir mal:

- Un usuario envía un email sin formato válido
- Alguien intenta crear un producto con precio "-500"
- La base de datos se cae justo cuando intentas guardar datos
- Un cliente envía una petición con campos que no existen en tu modelo

Imagina un cajero de banco que acepta cualquier cheque sin verificar firmas, montos o fondos disponibles. Sería un desastre, ¿verdad? Tu API necesita ser igual de cuidadosa: **validar todo antes de procesarlo** y **manejar errores gracefully** (de forma elegante).

Hoy aprenderás a blindar tu API con validación robusta usando Zod y a crear un sistema profesional de manejo de errores que hace tu aplicación confiable y fácil de debuggear.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Validar datos de entrada con Zod**: Definir esquemas de validación que verifican tipos, formatos y reglas de negocio automáticamente
2. **Manejar errores con try-catch**: Capturar errores de forma efectiva y evitar que tu servidor se caiga
3. **Devolver respuestas de error claras**: Comunicar al cliente exactamente qué salió mal y cómo solucionarlo

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

### 📊 Un dato interesante

El 60% de las vulnerabilidades de seguridad en aplicaciones web provienen de **falta de validación de entrada**. Validar correctamente no es opcional, es tu primera línea de defensa contra ataques y bugs.

---

## Concepto 1: Introducción a Zod

**Zod** es una librería de validación de datos para TypeScript y JavaScript. Es como un "guardia de seguridad" que verifica que los datos cumplan ciertas reglas antes de procesarlos.

**¿Por qué Zod y no validación manual?**

Validación manual (frágil y repetitiva):
```javascript
if (!email) {
  return res.status(400).json({ error: 'Email requerido' });
}
if (!email.includes('@')) {
  return res.status(400).json({ error: 'Email inválido' });
}
if (password.length < 6) {
  return res.status(400).json({ error: 'Password muy corto' });
}
// ... 20 líneas más de validaciones
```

Con Zod (declarativo y conciso):
```javascript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const result = schema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ errors: result.error.errors });
}
```

**Ventajas de Zod**:
- **Declarativo**: Describes qué forma deben tener los datos
- **TypeScript nativo**: Te da autocompletado y tipos automáticos
- **Mensajes claros**: Los errores son fáciles de entender
- **Composable**: Puedes reutilizar esquemas y combinarlos

---

## Concepto 2: Validación básica con Zod

Vamos a validar datos de un formulario de registro de usuario.

### Ejemplo: Validar registro de usuario

**Lo que vamos a crear**: Una ruta de registro que valida email, password y nombre antes de crear el usuario.

**Primero, instala Zod**:

```bash
npm install zod
```

**Código de validación**:

```javascript
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(express.json());

// Esquema de validación para registro
const signupSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'Password debe tener mínimo 6 caracteres' }),
  name: z.string().min(2, { message: 'Nombre debe tener mínimo 2 caracteres' }).optional()
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    // Validar datos de entrada
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: result.error.errors
      });
    }

    // Si la validación pasó, los datos están en result.data
    const { email, password, name } = result.data;

    // Aquí iría el código para crear el usuario
    res.status(201).json({ message: 'Usuario creado', email, name });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

**Explicación línea por línea**:
- **Línea 3** (`const { z } = require('zod');`): Importa Zod
- **Líneas 12-16**: Define el esquema de validación
  - **Línea 13** (`z.string().email()`): Debe ser string con formato de email
  - `{ message: 'Email inválido' }`: Mensaje personalizado si falla
  - **Línea 14** (`z.string().min(6)`): String con mínimo 6 caracteres
  - **Línea 15** (`.optional()`): El campo es opcional
- **Línea 21** (`signupSchema.safeParse(req.body)`): Valida los datos
  - `safeParse()`: Valida sin lanzar error (devuelve un objeto resultado)
  - Si es válido: `result.success = true` y `result.data` contiene los datos
  - Si es inválido: `result.success = false` y `result.error` contiene los errores
- **Líneas 23-27**: Si la validación falla, devuelve error 400 con detalles
- **Línea 31**: Si pasó, usa los datos validados de `result.data`

**Cómo probarlo**:

**Caso 1: Datos válidos** (POST `/api/auth/signup`):
```json
{
  "email": "ana@email.com",
  "password": "MiPassword123",
  "name": "Ana García"
}
```

Respuesta (201):
```json
{
  "message": "Usuario creado",
  "email": "ana@email.com",
  "name": "Ana García"
}
```

**Caso 2: Email inválido**:
```json
{
  "email": "esto-no-es-un-email",
  "password": "MiPassword123"
}
```

Respuesta (400):
```json
{
  "error": "Datos inválidos",
  "details": [
    {
      "code": "invalid_string",
      "validation": "email",
      "path": ["email"],
      "message": "Email inválido"
    }
  ]
}
```

**Caso 3: Password muy corto**:
```json
{
  "email": "ana@email.com",
  "password": "123"
}
```

Respuesta (400):
```json
{
  "error": "Datos inválidos",
  "details": [
    {
      "code": "too_small",
      "minimum": 6,
      "path": ["password"],
      "message": "Password debe tener mínimo 6 caracteres"
    }
  ]
}
```

---

## Concepto 3: Validaciones avanzadas con Zod

Zod tiene muchos tipos de validación más allá de string y email.

### Ejemplo: Validar creación de producto

**Lo que vamos a crear**: Un esquema que valida todos los campos de un producto con reglas de negocio.

**Código**:

```javascript
const productSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
  price: z.number().positive({ message: 'El precio debe ser positivo' }),
  stock: z.number().int().min(0, { message: 'El stock no puede ser negativo' }),
  category: z.enum(['Electrónica', 'Ropa', 'Alimentos', 'Libros'], {
    errorMap: () => ({ message: 'Categoría inválida' })
  }),
  discount: z.number().min(0).max(100).optional()
});

app.post('/api/products', async (req, res) => {
  try {
    const result = productSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: result.error.errors
      });
    }

    const product = await prisma.product.create({
      data: result.data
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});
```

**Explicación de validaciones avanzadas**:
- **Línea 2** (`z.string().min(3).max(100)`): String entre 3 y 100 caracteres
- **Línea 3** (`.optional()`): Campo opcional
- **Línea 4** (`z.number().positive()`): Número mayor que 0
- **Línea 5** (`z.number().int()`): Número entero (no decimales)
- **Líneas 6-8** (`z.enum([...])`): Solo permite valores de la lista
- **Línea 9** (`z.number().min(0).max(100)`): Número entre 0 y 100

**Tipos comunes en Zod**:

| Validación | Ejemplo | Qué valida |
|------------|---------|------------|
| `z.string()` | `z.string()` | Debe ser texto |
| `z.number()` | `z.number()` | Debe ser número |
| `z.boolean()` | `z.boolean()` | Debe ser true o false |
| `z.date()` | `z.date()` | Debe ser una fecha |
| `z.array(z.string())` | `z.array(z.string())` | Array de strings |
| `z.object({...})` | `z.object({ name: z.string() })` | Objeto con forma específica |
| `.email()` | `z.string().email()` | String con formato email |
| `.url()` | `z.string().url()` | String con formato URL |
| `.min(n)` | `z.string().min(5)` | Longitud mínima |
| `.max(n)` | `z.number().max(100)` | Valor máximo |
| `.optional()` | `z.string().optional()` | Campo opcional |
| `.nullable()` | `z.string().nullable()` | Puede ser null |

---

## Concepto 4: Manejo de errores con try-catch

El bloque `try-catch` es tu red de seguridad: captura errores antes de que crasheen el servidor.

**Analogía del trapecista con red**:

Un trapecista se lanza al aire sabiendo que si falla, hay una red que lo atrapa. Sin la red, una caída sería fatal. Lo mismo pasa con tu código:

```javascript
// Sin red de seguridad (peligroso)
const user = await prisma.user.findUnique({ where: { id: 999 } });
console.log(user.email); // Si user es null, CRASH!

// Con red de seguridad (seguro)
try {
  const user = await prisma.user.findUnique({ where: { id: 999 } });
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  console.log(user.email); // Seguro ejecutar esto
} catch (error) {
  res.status(500).json({ error: 'Error al buscar usuario' });
}
```

### Ejemplo: Manejo robusto de errores

**Lo que vamos a crear**: Una ruta que maneja diferentes tipos de errores apropiadamente.

**Código**:

```javascript
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validar que el ID sea un número
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID debe ser un número' });
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
```

**Explicación línea por línea**:
- **Línea 2** (`try {`): Inicia el bloque protegido
- **Líneas 6-8**: Validación manual del parámetro
- **Líneas 10-12**: Operación de base de datos (puede fallar)
- **Líneas 14-16**: Verificación de existencia (error lógico, no excepción)
- **Línea 18** (`res.json(user)`): Si llegamos aquí, todo salió bien
- **Línea 19** (`catch (error) {`): Captura cualquier error que ocurra en el try
- **Línea 20** (`console.error(...)`): Log del error para debugging
- **Línea 21**: Respuesta genérica al cliente (no reveles detalles internos)

**Errores comunes que catch atrapa**:
- Error de conexión a la base de datos
- Error de sintaxis en la query de Prisma
- Error de tipo (intentaste parsear texto como número)
- Cualquier excepción inesperada

---

## Concepto 5: Middleware de validación reutilizable

En lugar de validar en cada ruta, puedes crear un middleware reutilizable.

### Ejemplo: Middleware de validación

**Lo que vamos a crear**: Un middleware que valida el body usando cualquier esquema de Zod.

**Código**:

```javascript
// Middleware de validación genérico
const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: result.error.errors
      });
    }

    req.validatedData = result.data;
    next();
  };
};

// Esquemas
const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).optional()
});

const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  completed: z.boolean().default(false)
});

// Usar el middleware en rutas
app.post('/api/users', validate(createUserSchema), async (req, res) => {
  try {
    // Los datos validados están en req.validatedData
    const user = await prisma.user.create({
      data: req.validatedData
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

app.post('/api/tasks', validate(createTaskSchema), async (req, res) => {
  try {
    const task = await prisma.task.create({
      data: req.validatedData
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tarea' });
  }
});
```

**Explicación del middleware**:
- **Líneas 2-16**: Define una función que devuelve un middleware
  - `schema`: Recibe el esquema de Zod como parámetro
  - `return (req, res, next) => {...}`: Devuelve el middleware real
- **Línea 4** (`schema.safeParse(req.body)`): Valida el body con el esquema recibido
- **Líneas 6-11**: Si falla, devuelve error 400
- **Línea 13** (`req.validatedData = result.data`): Guarda los datos validados en el request
- **Línea 14** (`next()`): Pasa al siguiente middleware (la ruta)
- **Líneas 32 y 45** (`validate(createUserSchema)`): Usa el middleware con diferentes esquemas

**Ventajas de este approach**:
- **DRY**: No repites código de validación
- **Declarativo**: Solo defines el esquema, el middleware hace el resto
- **Reutilizable**: El mismo middleware funciona para cualquier esquema
- **Limpio**: Tus rutas se enfocan en la lógica de negocio, no en validación

---

## Práctica guiada: API con validación completa

Vamos a crear una API de gestión de eventos con validación robusta.

### Paso 1 de 3: Configurar proyecto y modelo

**Lo que harás**:

1. Crea el proyecto:
   ```bash
   mkdir api-eventos-validacion
   cd api-eventos-validacion
   npm init -y
   npm install express zod
   npm install prisma --save-dev
   npm install @prisma/client
   npx prisma init --datasource-provider sqlite
   ```

2. Define el modelo en `prisma/schema.prisma`:

```prisma
model Event {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  date        DateTime
  location    String
  capacity    Int
  price       Float    @default(0)
  category    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

3. Ejecuta la migración:
   ```bash
   npx prisma migrate dev --name create-events
   ```

**Checkpoint**: Verifica con `npx prisma studio` que existe la tabla Event.

### Paso 2 de 3: Crear esquemas de validación

**Lo que harás**:

Crea `server.js` y define los esquemas de Zod:

```javascript
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(express.json());

// Middleware de validación genérico
const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: result.error.errors
      });
    }

    req.validatedData = result.data;
    next();
  };
};

// Esquemas de validación
const createEventSchema = z.object({
  title: z.string().min(5, { message: 'El título debe tener mínimo 5 caracteres' }),
  description: z.string().max(500).optional(),
  date: z.string().refine((val) => {
    const eventDate = new Date(val);
    return eventDate > new Date();
  }, { message: 'La fecha debe ser en el futuro' }),
  location: z.string().min(3),
  capacity: z.number().int().positive({ message: 'La capacidad debe ser positiva' }),
  price: z.number().min(0, { message: 'El precio no puede ser negativo' }).default(0),
  category: z.enum(['Conferencia', 'Taller', 'Concierto', 'Deportivo', 'Social'], {
    errorMap: () => ({ message: 'Categoría inválida' })
  })
});

const updateEventSchema = z.object({
  title: z.string().min(5).optional(),
  description: z.string().max(500).optional(),
  date: z.string().refine((val) => {
    const eventDate = new Date(val);
    return eventDate > new Date();
  }, { message: 'La fecha debe ser en el futuro' }).optional(),
  location: z.string().min(3).optional(),
  capacity: z.number().int().positive().optional(),
  price: z.number().min(0).optional(),
  category: z.enum(['Conferencia', 'Taller', 'Concierto', 'Deportivo', 'Social']).optional()
});
```

**Explicación de validaciones especiales**:
- **Líneas 32-35** (`.refine()`): Validación personalizada
  - `refine()` permite crear reglas custom
  - Aquí verifica que la fecha sea en el futuro
  - Si la función devuelve `false`, la validación falla
- **Línea 38** (`.default(0)`): Si no se proporciona, usa valor por defecto
- **Líneas 44-54**: Esquema para actualización (todos los campos opcionales)

**Checkpoint**: El servidor no arranca todavía porque faltan las rutas, pero no debe haber errores de sintaxis.

### Paso 3 de 3: Implementar rutas con validación

**Lo que harás**:

Añade las rutas CRUD al `server.js`:

```javascript
// CREATE - Crear evento
app.post('/api/events', validate(createEventSchema), async (req, res) => {
  try {
    const event = await prisma.event.create({
      data: {
        ...req.validatedData,
        date: new Date(req.validatedData.date)
      }
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('Error al crear evento:', error);
    res.status(500).json({ error: 'Error al crear el evento' });
  }
});

// READ ALL - Obtener todos los eventos
app.get('/api/events', async (req, res) => {
  try {
    const category = req.query.category;
    const where = category ? { category } : {};

    const events = await prisma.event.findMany({
      where,
      orderBy: { date: 'asc' }
    });

    res.json(events);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).json({ error: 'Error al obtener eventos' });
  }
});

// READ ONE - Obtener un evento
app.get('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) }
    });

    if (!event) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    res.json(event);
  } catch (error) {
    console.error('Error al obtener evento:', error);
    res.status(500).json({ error: 'Error al obtener el evento' });
  }
});

// UPDATE - Actualizar evento
app.put('/api/events/:id', validate(updateEventSchema), async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const dataToUpdate = { ...req.validatedData };
    if (dataToUpdate.date) {
      dataToUpdate.date = new Date(dataToUpdate.date);
    }

    const event = await prisma.event.update({
      where: { id: parseInt(id) },
      data: dataToUpdate
    });

    res.json(event);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    console.error('Error al actualizar evento:', error);
    res.status(500).json({ error: 'Error al actualizar el evento' });
  }
});

// DELETE - Eliminar evento
app.delete('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    await prisma.event.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    console.error('Error al eliminar evento:', error);
    res.status(500).json({ error: 'Error al eliminar el evento' });
  }
});

app.listen(PORT, () => {
  console.log(`API de eventos corriendo en http://localhost:${PORT}`);
});
```

**Checkpoint**:

1. Inicia el servidor: `node server.js`

2. **Prueba crear evento válido** (POST `/api/events`):
```json
{
  "title": "Conferencia de JavaScript",
  "description": "Aprende las últimas novedades de JS",
  "date": "2025-12-01T18:00:00Z",
  "location": "Auditorio Central",
  "capacity": 100,
  "price": 25,
  "category": "Conferencia"
}
```

3. **Prueba validación: fecha en el pasado**:
```json
{
  "title": "Evento pasado",
  "date": "2020-01-01T10:00:00Z",
  "location": "Lugar",
  "capacity": 50,
  "category": "Taller"
}
```
Debe dar error 400 con mensaje "La fecha debe ser en el futuro".

4. **Prueba validación: capacidad negativa**:
```json
{
  "title": "Evento inválido",
  "date": "2025-12-01T18:00:00Z",
  "location": "Lugar",
  "capacity": -10,
  "category": "Taller"
}
```
Debe dar error 400.

5. **Prueba validación: categoría inválida**:
```json
{
  "title": "Evento categoría mala",
  "date": "2025-12-01T18:00:00Z",
  "location": "Lugar",
  "capacity": 50,
  "category": "CategoríaInventada"
}
```
Debe dar error 400 con mensaje "Categoría inválida".

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: Usar parse() en lugar de safeParse()

**Te pasa cuando**: Usas `schema.parse(data)` directamente

**El código que ves**:
```javascript
const data = schema.parse(req.body); // Si falla, lanza excepción
```

**Por qué está mal**: `parse()` lanza una excepción si la validación falla, lo cual puede crashear tu servidor si no lo manejas en try-catch.

**Cómo se soluciona**:
```javascript
// ✅ Correcto - safeParse no lanza excepciones
const result = schema.safeParse(req.body);
if (!result.success) {
  // Maneja el error
}
```

### Error #2: No validar parámetros de URL

**Te pasa cuando**: Solo validas el body, pero no los params o query

**El código vulnerable**:
```javascript
app.get('/api/users/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) } // Si id no es número, parseInt da NaN
  });
});
```

**Por qué está mal**: Si alguien hace GET `/api/users/abc`, el `parseInt('abc')` da `NaN` y Prisma da error.

**Cómo se soluciona**:
```javascript
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(id) || parseInt(id) <= 0) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  // Ahora es seguro usar parseInt(id)
});
```

### Error #3: Revelar información sensible en mensajes de error

**Te pasa cuando**: Devuelves el error completo al cliente

**El código inseguro**:
```javascript
catch (error) {
  res.status(500).json({ error: error.message }); // ❌ Puede revelar estructura de DB
}
```

**Por qué está mal**: Los mensajes de error de Prisma o del sistema pueden revelar información sensible (nombres de tablas, estructura de DB, rutas de archivos).

**Cómo se soluciona**:
```javascript
catch (error) {
  console.error('Error interno:', error); // ✅ Log para ti
  res.status(500).json({ error: 'Error interno del servidor' }); // ✅ Mensaje genérico al cliente
}
```

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: Al principio puede parecer tedioso validar todo, pero créeme: la primera vez que un bug se detecta en validación antes de llegar a la base de datos, agradecerás haberlo hecho. Es como usar cinturón de seguridad: molesta un poco, pero el día que lo necesitas, te salva la vida.

> **Otro tip importante**: Crea un archivo separado `schemas.js` donde definas todos tus esquemas de Zod. Mantén las validaciones organizadas en un solo lugar. Esto hace que sea fácil encontrarlas, reutilizarlas y modificarlas.

> **Herramientas útiles**: Usa `console.log(result.error.errors)` cuando una validación falle durante desarrollo. Zod te da información super detallada sobre qué campo falló y por qué. Esto hace el debugging muchísimo más fácil.

---

## Tu turno: Ejercicio guiado

**Objetivo simple**: Crear una API de gestión de recetas de cocina con validación exhaustiva

**Tiempo**: 45-55 minutos

**Lo que necesitas antes de empezar**:
- [ ] Node.js instalado
- [ ] Editor de código (VS Code)
- [ ] Thunder Client instalado

### Instrucciones paso a paso

**Parte 1: Configuración** (10 min)

1. Crea el proyecto:
   ```bash
   mkdir api-recetas-validacion
   cd api-recetas-validacion
   npm init -y
   npm install express zod
   npm install prisma --save-dev
   npm install @prisma/client
   npx prisma init --datasource-provider sqlite
   ```

2. Define el modelo en `prisma/schema.prisma`:

```prisma
model Recipe {
  id            Int      @id @default(autoincrement())
  title         String
  description   String?
  ingredients   String
  instructions  String
  prepTime      Int
  cookTime      Int
  servings      Int
  difficulty    String
  cuisine       String
  isVegetarian  Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

3. Ejecuta: `npx prisma migrate dev --name init`

**Parte 2: Crear esquemas de validación** (15 min)

1. Crea `server.js` con el middleware de validación
2. Define el esquema `createRecipeSchema` con estas reglas:
   - `title`: String mínimo 5 caracteres
   - `description`: String opcional, máximo 500 caracteres
   - `ingredients`: String mínimo 10 caracteres (lista de ingredientes)
   - `instructions`: String mínimo 20 caracteres
   - `prepTime`: Número entero positivo (minutos de preparación)
   - `cookTime`: Número entero positivo (minutos de cocción)
   - `servings`: Número entero entre 1 y 20
   - `difficulty`: Enum de ['Fácil', 'Media', 'Difícil']
   - `cuisine`: String mínimo 3 caracteres
   - `isVegetarian`: Boolean con default false

3. Define `updateRecipeSchema` (todos los campos opcionales)

**Parte 3: Implementar rutas** (15 min)

Implementa:
- POST `/api/recipes` con validación
- GET `/api/recipes` (con filtro opcional `?difficulty=Fácil`)
- GET `/api/recipes/:id` con validación de ID
- PUT `/api/recipes/:id` con validación
- DELETE `/api/recipes/:id` con validación de ID

**Parte 4: Validaciones custom** (10 min)

Añade estas validaciones personalizadas al esquema:

1. El tiempo total (`prepTime + cookTime`) no puede superar 300 minutos:
```javascript
.refine((data) => (data.prepTime + data.cookTime) <= 300, {
  message: 'El tiempo total no puede superar 5 horas'
})
```

2. Si es vegetariana, no puede tener ciertos ingredientes:
```javascript
.refine((data) => {
  if (data.isVegetarian) {
    const lowerIngredients = data.ingredients.toLowerCase();
    return !lowerIngredients.includes('carne') && !lowerIngredients.includes('pollo');
  }
  return true;
}, {
  message: 'Una receta vegetariana no puede contener carne o pollo'
})
```

**Parte 5: Probar todas las validaciones** (10 min)

1. Crea una receta válida
2. Intenta crear con título muy corto (debe fallar)
3. Intenta crear con servings = 25 (debe fallar)
4. Intenta crear con difficulty = "Super Difícil" (debe fallar)
5. Intenta crear receta vegetariana con "pollo" en ingredientes (debe fallar)
6. Intenta crear con prepTime + cookTime > 300 (debe fallar)
7. Actualiza una receta
8. Elimina una receta

**Criterio de éxito**:
- [ ] Todas las validaciones de campos requeridos funcionan
- [ ] Validaciones de rango funcionan (servings entre 1-20)
- [ ] Validación de enum funciona (difficulty)
- [ ] Validación custom de tiempo total funciona
- [ ] Validación custom de vegetariana funciona
- [ ] Los mensajes de error son claros y útiles
- [ ] Todos los errores devuelven código 400 apropiado

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Validar con Zod**: Zod te permite definir esquemas de validación declarativos que verifican tipos, formatos y reglas de negocio. Usa `safeParse()` para validar sin lanzar excepciones y obtener errores detallados.

2. **Manejo de errores con try-catch**: Envuelve operaciones riesgosas en try-catch para capturar errores y evitar que tu servidor crashee. Loguea errores detallados para debugging pero devuelve mensajes genéricos al cliente.

3. **Middleware de validación reutilizable**: Crea un middleware genérico que recibe un esquema de Zod y valida automáticamente. Esto hace tu código DRY y mantiene las rutas limpias y enfocadas en lógica de negocio.

---

## Siguiente paso

En la próxima lección: **Testing de backend con Vitest**. Aprenderás a escribir tests automatizados para tus rutas API, validar que tu lógica de negocio funciona correctamente y crear una suite de tests que te da confianza para hacer cambios sin romper nada. ¡Tu backend será profesional, robusto y testeado!

---

**¿Dudas?** La validación puede sentirse como trabajo extra al principio, pero es una inversión que paga dividendos enormes. Cada validación que escribes es un bug menos que tendrás que debuggear a las 3 AM cuando tu app esté en producción. Piensa en la validación como el control de calidad de una fábrica: detectar defectos temprano es infinitamente más barato que solucionarlos después.
