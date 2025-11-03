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

## ¿Por qué necesitas diseñar APIs RESTful?

**REST** no es algo que instalas o configuras, es una forma de pensar y organizar tu API. Es como las reglas de tránsito: todos las siguen para que conducir sea predecible y seguro.

**Analogía del restaurante bien organizado**:

Imagina dos restaurantes:

**Restaurante caótico** (API no RESTful):
- Para pedir comida, a veces hablas con el mesero, a veces gritas a la cocina
- Para pagar, a veces es en la mesa, a veces en la caja, a veces en la puerta
- No hay menú estándar, cada día es diferente
- Los meseros no entienden si dices "quiero la orden #5" porque no hay números

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

## Concepto 2: Estructura de URLs RESTful

Las URLs en REST siguen un patrón muy específico y predecible.

**Patrón estándar**:
```
/api/{recurso}         → Colección completa
/api/{recurso}/{id}    → Recurso individual
```

**Ejemplos correctos** (RESTful):
```
GET    /api/users           → Obtener todos los usuarios
GET    /api/users/5         → Obtener el usuario con id 5
POST   /api/users           → Crear un nuevo usuario
PUT    /api/users/5         → Actualizar el usuario 5
DELETE /api/users/5         → Eliminar el usuario 5
```

**Ejemplos incorrectos** (NO RESTful):
```
❌ GET  /api/getAllUsers        → Demasiado verboso, el GET ya indica "obtener"
❌ POST /api/createUser         → El POST ya indica "crear"
❌ GET  /api/user/delete/5      → Usar GET para borrar es incorrecto
❌ POST /api/users/5/update     → Usar POST para actualizar, debería ser PUT
```

**Reglas para URLs limpias**:

1. **Usa sustantivos plurales**: `/users`, `/products`, `/orders` (no `/user`, `/product`)
2. **No uses verbos**: El método HTTP ya indica la acción
3. **Usa IDs para recursos individuales**: `/users/5`, `/products/42`
4. **Sé consistente**: Si usas `/users`, no mezcles con `/user` en otro lugar
5. **Usa kebab-case para nombres compuestos**: `/order-items`, `/user-profiles`

---

## Concepto 3: Códigos de estado HTTP

Los códigos de estado son como emojis que tu servidor envía para decir "todo bien" 😊, "no encontré eso" 😕, "algo salió mal" 😱.

**Los códigos más comunes en REST**:

| Código | Nombre | Cuándo usarlo | Ejemplo |
|--------|--------|---------------|---------|
| **200** | OK | Operación exitosa | GET, PUT, DELETE exitosos |
| **201** | Created | Recurso creado exitosamente | POST de un nuevo usuario |
| **204** | No Content | Exitoso pero sin contenido | DELETE exitoso |
| **400** | Bad Request | Datos inválidos del cliente | Email con formato incorrecto |
| **401** | Unauthorized | No autenticado | Token faltante o inválido |
| **403** | Forbidden | Autenticado pero sin permiso | Usuario normal intentando acceso de admin |
| **404** | Not Found | Recurso no existe | Buscaste el usuario con id 999 que no existe |
| **500** | Internal Server Error | Error del servidor | Error de base de datos, excepción no manejada |

**Familias de códigos**:
- **2xx** (200-299): Éxito ✅
- **4xx** (400-499): Error del cliente (el cliente envió algo mal) ⚠️
- **5xx** (500-599): Error del servidor (algo falló en el backend) 🔥

### Ejemplo: Uso correcto de códigos de estado

**Operación exitosa**:
```javascript
// Crear usuario exitosamente
res.status(201).json({ id: 1, email: 'ana@email.com' });
```

**Recurso no encontrado**:
```javascript
// Intentaron obtener usuario que no existe
res.status(404).json({ error: 'Usuario no encontrado' });
```

**Datos inválidos**:
```javascript
// Email sin formato válido
res.status(400).json({ error: 'El email es inválido' });
```

**Error del servidor**:
```javascript
// Error de base de datos
res.status(500).json({ error: 'Error interno del servidor' });
```

---

## Concepto 4: Diseñando un CRUD completo REST

**CRUD** significa Create, Read, Update, Delete. Es el conjunto de operaciones básicas para cualquier recurso.

### Ejemplo: CRUD completo de tareas (Tasks)

**Lo que vamos a crear**: Una API RESTful completa para gestionar tareas.

**Código completo**:

```javascript
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(express.json());

// CREATE - Crear nueva tarea
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'El título es requerido' });
    }

    const task = await prisma.task.create({
      data: { title, description }
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
});

// READ ALL - Obtener todas las tareas
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
});

// READ ONE - Obtener una tarea específica
app.get('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la tarea' });
  }
});

// UPDATE - Actualizar tarea completa
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, description, completed }
    });

    res.status(200).json(task);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
});

// DELETE - Eliminar tarea
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
});

app.listen(PORT, () => {
  console.log(`API RESTful corriendo en http://localhost:${PORT}`);
});
```

**Explicación de cada operación**:

**CREATE (POST)**:
- **Línea 11** (`app.post('/api/tasks', ...)`): Ruta para crear
- **Línea 15-17**: Validación básica (título requerido)
- **Línea 19-21**: Crea la tarea con Prisma
- **Línea 23** (`res.status(201)`): Código 201 porque creamos algo nuevo

**READ ALL (GET colección)**:
- **Línea 29** (`app.get('/api/tasks', ...)`): Ruta sin ID = todos los recursos
- **Línea 31-33**: Obtiene todas las tareas ordenadas
- **Línea 35** (`res.status(200)`): Código 200 porque fue exitoso

**READ ONE (GET individual)**:
- **Línea 42** (`app.get('/api/tasks/:id', ...)`): Ruta con ID = un recurso específico
- **Línea 46-48**: Busca la tarea por ID
- **Línea 50-52**: Si no existe, devuelve 404
- **Línea 54** (`res.status(200)`): Si existe, devuelve 200

**UPDATE (PUT)**:
- **Línea 61** (`app.put('/api/tasks/:id', ...)`): Ruta con ID para actualizar
- **Línea 65-68**: Actualiza la tarea con los nuevos datos
- **Línea 72** (`error.code === 'P2025'`): Código de Prisma cuando no encuentra el registro
- **Línea 70** (`res.status(200)`): Devuelve la tarea actualizada con 200

**DELETE (DELETE)**:
- **Línea 81** (`app.delete('/api/tasks/:id', ...)`): Ruta con ID para eliminar
- **Línea 85-87**: Elimina la tarea
- **Línea 89** (`res.status(204).send()`): Código 204 (No Content) porque se eliminó exitosamente sin respuesta

**Cómo probarlo**:

1. **Crear tarea**: POST `/api/tasks` con body `{"title": "Aprender REST", "description": "Estudiar arquitectura RESTful"}`
2. **Ver todas**: GET `/api/tasks`
3. **Ver una**: GET `/api/tasks/1`
4. **Actualizar**: PUT `/api/tasks/1` con body `{"title": "REST dominado", "completed": true}`
5. **Eliminar**: DELETE `/api/tasks/1`

---

## Concepto 5: Paginación y filtrado

Las APIs profesionales no devuelven todos los datos de golpe. Imagina una tabla con 10,000 usuarios: enviar todo sería lentísimo.

### Ejemplo: Paginación simple

**Lo que vamos a crear**: Una ruta que devuelve resultados paginados.

**Código**:

```javascript
app.get('/api/tasks', async (req, res) => {
  try {
    // Obtener parámetros de query: ?page=1&limit=10
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const tasks = await prisma.task.findMany({
      skip: skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.task.count();

    res.status(200).json({
      data: tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
});
```

**Explicación línea por línea**:
- **Línea 4** (`req.query.page`): Lee el parámetro `?page=1` de la URL
- **Línea 5** (`req.query.limit`): Lee el parámetro `?limit=10` de la URL
- **Líneas 4-5** (`|| 1`, `|| 10`): Valores por defecto si no se proporcionan
- **Línea 6** (`(page - 1) * limit`): Calcula cuántos registros saltar
  - Página 1: skip = 0 (primeros 10)
  - Página 2: skip = 10 (segundos 10)
  - Página 3: skip = 20 (terceros 10)
- **Línea 9** (`skip: skip`): Le dice a Prisma cuántos saltar
- **Línea 10** (`take: limit`): Le dice a Prisma cuántos tomar
- **Línea 14** (`prisma.task.count()`): Cuenta el total de tareas
- **Líneas 16-23**: Devuelve datos + información de paginación

**Cómo probarlo**:
- `GET /api/tasks?page=1&limit=5` → Primeros 5 resultados
- `GET /api/tasks?page=2&limit=5` → Siguientes 5 resultados

**Resultado esperado**:
```json
{
  "data": [
    { "id": 1, "title": "Tarea 1" },
    { "id": 2, "title": "Tarea 2" }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "totalPages": 5
  }
}
```

---

## Práctica guiada: API RESTful de productos

Vamos a crear una API completa de productos con todas las mejores prácticas REST.

### Paso 1 de 3: Configurar proyecto y modelo

**Lo que harás**:

1. Crea el proyecto:
   ```bash
   mkdir api-productos-rest
   cd api-productos-rest
   npm init -y
   npm install express
   npm install prisma --save-dev
   npm install @prisma/client
   npx prisma init --datasource-provider sqlite
   ```

2. Abre `prisma/schema.prisma` y añade el modelo:

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  price       Float
  stock       Int      @default(0)
  category    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

3. Ejecuta la migración:
   ```bash
   npx prisma migrate dev --name create-products
   ```

**Explicación del modelo**:
- `price Float`: Número decimal para precios (ej: 19.99)
- `stock Int @default(0)`: Cantidad en inventario, por defecto 0
- `updatedAt DateTime @updatedAt`: Se actualiza automáticamente cuando modificas el producto

**Checkpoint**: Verifica con `npx prisma studio` que existe la tabla Product.

### Paso 2 de 3: Implementar CRUD completo

**Lo que harás**:

Crea un archivo `server.js` con todas las operaciones CRUD:

```javascript
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(express.json());

// CREATE - Crear producto
app.post('/api/products', async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // Validaciones
    if (!name || !price || !category) {
      return res.status(400).json({
        error: 'Nombre, precio y categoría son requeridos'
      });
    }

    if (price < 0) {
      return res.status(400).json({
        error: 'El precio no puede ser negativo'
      });
    }

    const product = await prisma.product.create({
      data: { name, description, price, stock, category }
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

// READ ALL - Obtener todos los productos (con paginación)
app.get('/api/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const skip = (page - 1) * limit;

    const where = category ? { category } : {};

    const products = await prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.product.count({ where });

    res.status(200).json({
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// READ ONE - Obtener un producto
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// UPDATE - Actualizar producto
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;

    if (price !== undefined && price < 0) {
      return res.status(400).json({
        error: 'El precio no puede ser negativo'
      });
    }

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price, stock, category }
    });

    res.status(200).json(product);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// DELETE - Eliminar producto
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

app.listen(PORT, () => {
  console.log(`API RESTful de productos en http://localhost:${PORT}`);
});
```

**Explicación de características adicionales**:
- **Líneas 16-20**: Validación de campos requeridos
- **Líneas 22-26**: Validación de lógica de negocio (precio no negativo)
- **Línea 46** (`const where = category ? { category } : {};`): Filtrado opcional por categoría
- **Línea 97** (`price !== undefined`): Solo valida precio si se está actualizando

**Checkpoint**: Ejecuta `node server.js` y verifica que el servidor arranca sin errores.

### Paso 3 de 3: Probar la API completa

**Lo que harás**:

1. **Crear 3 productos** (POST `/api/products`):

Producto 1:
```json
{
  "name": "Laptop HP",
  "description": "Laptop 15 pulgadas, 8GB RAM",
  "price": 799.99,
  "stock": 10,
  "category": "Electrónica"
}
```

Producto 2:
```json
{
  "name": "Mouse Inalámbrico",
  "description": "Mouse ergonómico Bluetooth",
  "price": 29.99,
  "stock": 50,
  "category": "Electrónica"
}
```

Producto 3:
```json
{
  "name": "Cuaderno A4",
  "description": "100 hojas rayadas",
  "price": 5.99,
  "stock": 100,
  "category": "Papelería"
}
```

2. **Obtener todos los productos** (GET `/api/products`)

3. **Filtrar por categoría** (GET `/api/products?category=Electrónica`)

4. **Paginación** (GET `/api/products?page=1&limit=2`)

5. **Obtener un producto** (GET `/api/products/1`)

6. **Actualizar stock** (PUT `/api/products/1`):
```json
{
  "stock": 8
}
```

7. **Intentar crear producto con precio negativo** (POST `/api/products`):
```json
{
  "name": "Producto inválido",
  "price": -10,
  "category": "Test"
}
```
Debería devolver error 400.

8. **Eliminar producto** (DELETE `/api/products/3`)

9. **Intentar obtener producto eliminado** (GET `/api/products/3`)
Debería devolver error 404.

**Criterio de éxito**:
- [ ] Puedes crear productos con POST y recibes código 201
- [ ] Puedes ver todos los productos con GET
- [ ] Puedes filtrar por categoría con query params
- [ ] La paginación funciona correctamente
- [ ] Puedes ver un producto individual con GET /:id
- [ ] Puedes actualizar con PUT y recibes código 200
- [ ] Puedes eliminar con DELETE y recibes código 204
- [ ] Las validaciones funcionan (precio negativo da error 400)
- [ ] Los errores 404 aparecen cuando buscar recursos inexistentes

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: Usar GET para operaciones que modifican datos

**Te pasa cuando**: Creas rutas como `GET /api/tasks/delete/5` para borrar

**Por qué está mal**: GET es solo para lectura, nunca debe modificar datos. Los navegadores y proxies cachean peticiones GET, podrías borrar cosas sin querer.

**Cómo se soluciona**:
Usa el método HTTP correcto:
```javascript
// ❌ Incorrecto
app.get('/api/tasks/delete/:id', ...)

// ✅ Correcto
app.delete('/api/tasks/:id', ...)
```

### Error #2: No devolver códigos de estado apropiados

**Te pasa cuando**: Todas tus rutas devuelven 200, incluso cuando hay errores

**El código que ves**:
```javascript
// ❌ Incorrecto - siempre devuelve 200
res.json({ error: 'Usuario no encontrado' });
```

**Por qué está mal**: El cliente (navegador, app móvil) no puede distinguir éxito de error. La aplicación pensará que todo salió bien.

**Cómo se soluciona**:
```javascript
// ✅ Correcto - código 404 indica "no encontrado"
res.status(404).json({ error: 'Usuario no encontrado' });
```

### Error #3: URLs verbosas con acciones

**Te pasa cuando**: Creas URLs como `/api/getUserById/5` o `/api/createNewUser`

**Por qué está mal**: No es RESTful, el verbo HTTP ya indica la acción.

**Cómo se soluciona**:
```javascript
// ❌ Incorrecto
GET  /api/getUserById/5
POST /api/createNewUser

// ✅ Correcto
GET  /api/users/5
POST /api/users
```

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: Al principio parece que REST tiene demasiadas reglas, pero créeme: cuando trabajes en equipo o uses APIs de terceros, agradecerás estas convenciones. Es como aprender a conducir: al principio piensas "¿por qué tantas reglas?", pero luego entiendes que hacen el tráfico predecible y seguro.

> **Otro tip importante**: Usa herramientas como Thunder Client para documentar tu API mientras la desarrollas. Crea una "colección" con ejemplos de cada endpoint. Esto te servirá de documentación instantánea y podrás compartirla con otros desarrolladores.

> **Herramientas útiles**: Instala la extensión "REST Client" en VS Code. Te permite crear archivos `.http` donde escribes tus peticiones y las ejecutas directamente desde el editor. Es súper cómodo para testear APIs rápidamente.

---

## Tu turno: Ejercicio guiado

**Objetivo simple**: Crear una API RESTful completa para gestionar una biblioteca de libros con autores

**Tiempo**: 50-60 minutos

**Lo que necesitas antes de empezar**:
- [ ] Node.js instalado
- [ ] Editor de código (VS Code)
- [ ] Thunder Client instalado

### Instrucciones paso a paso

**Parte 1: Configuración y modelos** (15 min)

1. Crea el proyecto:
   ```bash
   mkdir api-biblioteca-rest
   cd api-biblioteca-rest
   npm init -y
   npm install express
   npm install prisma --save-dev
   npm install @prisma/client
   npx prisma init --datasource-provider sqlite
   ```

2. Define dos modelos en `prisma/schema.prisma`:

```prisma
model Author {
  id        Int      @id @default(autoincrement())
  name      String
  country   String
  books     Book[]
  createdAt DateTime @default(now())
}

model Book {
  id          Int      @id @default(autoincrement())
  title       String
  isbn        String   @unique
  pages       Int
  publishYear Int
  authorId    Int
  author      Author   @relation(fields: [authorId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

3. Ejecuta la migración:
   ```bash
   npx prisma migrate dev --name init
   ```

**Parte 2: Implementar CRUD de autores** (15 min)

Crea `server.js` e implementa:
- POST `/api/authors` - Crear autor (requiere name y country)
- GET `/api/authors` - Obtener todos los autores
- GET `/api/authors/:id` - Obtener un autor con sus libros incluidos
- PUT `/api/authors/:id` - Actualizar autor
- DELETE `/api/authors/:id` - Eliminar autor

**Pista para incluir libros en GET /:id**:
```javascript
const author = await prisma.author.findUnique({
  where: { id: parseInt(id) },
  include: { books: true }
});
```

**Parte 3: Implementar CRUD de libros** (15 min)

Añade estas rutas:
- POST `/api/books` - Crear libro (requiere title, isbn, pages, publishYear, authorId)
- GET `/api/books` - Obtener todos los libros con paginación
- GET `/api/books/:id` - Obtener un libro con su autor incluido
- PUT `/api/books/:id` - Actualizar libro
- DELETE `/api/books/:id` - Eliminar libro

**Parte 4: Validaciones y mejoras** (10 min)

Añade validaciones:
- ISBN debe ser único (Prisma lo valida automáticamente)
- Pages no puede ser negativo
- PublishYear debe estar entre 1000 y el año actual
- Al crear un libro, verifica que el autor existe

**Parte 5: Probar todo** (10 min)

1. Crea 2 autores
2. Crea 3 libros (2 del primer autor, 1 del segundo)
3. Obtén todos los autores
4. Obtén un autor con sus libros incluidos
5. Obtén todos los libros paginados (?page=1&limit=2)
6. Actualiza un libro
7. Intenta crear un libro con ISBN duplicado (debe dar error 400)
8. Elimina un libro

**Criterio de éxito**:
- [ ] CRUD completo de autores funciona
- [ ] CRUD completo de libros funciona
- [ ] GET de autor incluye sus libros
- [ ] GET de libro incluye su autor
- [ ] Paginación funciona en libros
- [ ] Validaciones funcionan correctamente
- [ ] Todos los códigos de estado son apropiados
- [ ] Las URLs siguen convenciones REST

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Principios de arquitectura REST**: REST es un conjunto de convenciones que hace tu API predecible y profesional. Usa sustantivos plurales en URLs, métodos HTTP apropiados y códigos de estado correctos.

2. **Métodos HTTP y sus usos**: GET para leer, POST para crear, PUT para actualizar, DELETE para eliminar. Cada método comunica la intención de la operación. Las URLs solo contienen sustantivos, no verbos.

3. **Códigos de estado HTTP**: 2xx para éxito, 4xx para errores del cliente, 5xx para errores del servidor. Usa 201 al crear, 404 cuando no encuentras, 400 para datos inválidos, 500 para errores internos.

---

## Siguiente paso

En la próxima lección: **Manejo de errores y validación con Zod**. Aprenderás a validar datos de entrada de forma robusta usando Zod, un sistema de validación que detecta errores antes de que lleguen a la base de datos. También verás cómo manejar errores de forma centralizada y devolver mensajes claros al cliente. ¡Tu API será mucho más segura y profesional!

---

**¿Dudas?** REST puede parecer "solo convenciones" al principio, y es tentador pensar "mi forma también funciona". Pero créeme: cuando trabajes en equipo, cuando consumas APIs de terceros, o cuando vuelvas a tu código después de 6 meses, agradecerás haber seguido estándares. REST es el idioma común que todos los desarrolladores backend hablan.
