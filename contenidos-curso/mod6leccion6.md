<p><strong><em>Confianza en tu código: testing de backend con Vitest</em></strong></p>

## Introducción: De esperar que funcione a saber que funciona

Has construido un backend completo: servidor con Express, base de datos con Prisma, autenticación con JWT, validación con Zod. Tu código funciona... o al menos, funcionaba la última vez que lo probaste manualmente. Pero:

- ¿Qué pasa si cambias algo y rompes una funcionalidad que antes funcionaba?
- ¿Cómo sabes que tu autenticación realmente bloquea usuarios no autorizados?
- ¿Estás seguro de que tu validación rechaza datos inválidos en TODOS los casos?
- ¿Puedes dormir tranquilo sabiendo que tu API maneja correctamente 20 escenarios diferentes?

Probar manualmente con Thunder Client cada cambio que haces es tedioso, propenso a errores y simplemente no escala. Imagina tener que probar 50 rutas diferentes cada vez que modificas una línea de código.

**Los tests automatizados son tu red de seguridad**. Son como tener un asistente incansable que verifica que todo sigue funcionando después de cada cambio. Hoy aprenderás a escribir tests para tu backend que te darán la confianza para hacer cambios sin miedo.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Entender por qué testear el backend**: Comprender los beneficios de los tests automatizados y cuándo escribirlos
2. **Configurar Vitest para backend**: Instalar y configurar un framework de testing moderno para Node.js
3. **Testear rutas API**: Escribir tests que simulan peticiones HTTP y verifican respuestas
4. **Testear con base de datos en memoria**: Usar SQLite en memoria para tests rápidos e independientes

---

## ¿Por qué necesitas tests automatizados?

**Analogía del piloto de avión**:

Antes de cada vuelo, los pilotos hacen un **checklist** exhaustivo: verifican combustible, sistemas hidráulicos, instrumentos de navegación, etc. No confían en la memoria ni en "probablemente todo está bien". Siguen el checklist SIEMPRE, incluso después de miles de vuelos.

Los tests automatizados son tu checklist: una lista verificable de que todo funciona correctamente.

**Beneficios de testear**:

1. **Confianza para hacer cambios**: Puedes refactorizar código sabiendo que los tests te alertarán si rompes algo
2. **Documentación viva**: Los tests muestran cómo se supone que funciona tu código
3. **Detectar bugs temprano**: Es más fácil arreglar un bug cuando acabas de escribir el código
4. **Menos debugging**: Los tests fallan en el lugar exacto del problema
5. **Dormir tranquilo**: Sabes que tu código funciona, no solo esperas que funcione

**Cuándo NO necesitas tests**:
- Prototipos rápidos que vas a tirar
- Scripts de una sola vez
- Proyectos personales pequeños donde eres el único usuario

**Cuándo SÍ necesitas tests**:
- Código que otras personas usarán
- Funcionalidades críticas (autenticación, pagos, etc.)
- Código que cambiarás frecuentemente
- Aplicaciones en producción

### 📊 Un dato interesante

Empresas como Google, Facebook y Amazon tienen **millones de tests automatizados** que corren miles de veces al día. Google ejecuta más de 4 mil millones de tests por día. Los tests no son opcionales en desarrollo profesional, son la norma.

---

## Concepto 1: Introducción a Vitest

**Vitest** es un framework de testing moderno, rápido y fácil de usar, diseñado específicamente para aplicaciones JavaScript/TypeScript modernas.

**¿Por qué Vitest y no Jest?**

- **Más rápido**: Usa Vite bajo el capó, que es super rápido
- **Más moderno**: Soporte nativo de ES modules
- **Compatible con Jest**: La API es casi idéntica, fácil de aprender
- **Mejor experiencia de desarrollo**: Watch mode inteligente

**Anatomía de un test**:

```javascript
import { describe, it, expect } from 'vitest';

describe('Calculadora', () => {
  it('suma dos números correctamente', () => {
    const resultado = 2 + 2;
    expect(resultado).toBe(4);
  });

  it('resta dos números correctamente', () => {
    const resultado = 5 - 3;
    expect(resultado).toBe(2);
  });
});
```

**Explicación de la estructura**:
- `describe()`: Agrupa tests relacionados (como una carpeta)
- `it()` o `test()`: Define un test individual
- `expect()`: Define lo que esperas que pase
- `.toBe()`: Matcher que verifica igualdad

**Concepto clave**: Un test tiene 3 partes (patrón AAA):
1. **Arrange** (Preparar): Configura el escenario
2. **Act** (Actuar): Ejecuta la acción que quieres testear
3. **Assert** (Afirmar): Verifica que el resultado es el esperado

---

## Concepto 2: Configurando Vitest para backend

Vamos a configurar Vitest para testear un servidor Express.

### Ejemplo: Configuración inicial

**Lo que vamos a crear**: Un proyecto con Vitest configurado y listo para testear.

**Instalación**:

```bash
mkdir api-testing
cd api-testing
npm init -y
npm install express
npm install prisma --save-dev
npm install @prisma/client
npm install vitest supertest --save-dev
```

**Explicación de las dependencias**:
- `vitest`: Framework de testing
- `supertest`: Librería para testear APIs HTTP (simula peticiones)

**Configura el package.json**:

Añade este script en la sección `"scripts"`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run"
  }
}
```

**Explicación de los scripts**:
- `npm test`: Corre tests en modo watch (se re-ejecutan al cambiar archivos)
- `npm run test:ui`: Abre una interfaz visual de los tests
- `npm run test:run`: Corre tests una sola vez y termina

**Estructura de carpetas recomendada**:

```
api-testing/
├── src/
│   ├── server.js          # Tu servidor Express
│   └── app.js             # App Express sin .listen()
├── tests/
│   └── api.test.js        # Tus tests
├── package.json
└── prisma/
    └── schema.prisma
```

**Checkpoint**: Ejecuta `npm test`. Aunque no haya tests todavía, Vitest debería arrancar sin errores.

---

## Concepto 3: Testear rutas API con Supertest

**Supertest** te permite simular peticiones HTTP a tu servidor sin tener que arrancarlo en un puerto real.

### Ejemplo: Test simple de una ruta GET

**Lo que vamos a crear**: Tests para una API simple de tareas.

**Primero, crea el servidor** (`src/app.js`):

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Datos en memoria (para simplificar)
let tasks = [
  { id: 1, title: 'Aprender testing', completed: false },
  { id: 2, title: 'Crear tests', completed: false }
];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  res.json(task);
});

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Título requerido' });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Exporta la app, NO hagas .listen() aquí
module.exports = app;
```

**Ahora crea el archivo de tests** (`tests/api.test.js`):

```javascript
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('API de Tareas', () => {
  describe('GET /api/tasks', () => {
    it('devuelve todas las tareas', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('devuelve una tarea existente', async () => {
      const response = await request(app)
        .get('/api/tasks/1')
        .expect(200);

      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('completed');
    });

    it('devuelve 404 para tarea inexistente', async () => {
      const response = await request(app)
        .get('/api/tasks/999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/tasks', () => {
    it('crea una nueva tarea', async () => {
      const newTask = { title: 'Nueva tarea de test' };

      const response = await request(app)
        .post('/api/tasks')
        .send(newTask)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newTask.title);
      expect(response.body.completed).toBe(false);
    });

    it('rechaza tarea sin título', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });
});
```

**Explicación línea por línea**:
- **Línea 2** (`import request from 'supertest'`): Importa Supertest
- **Línea 3** (`import app from '../src/app.js'`): Importa tu app Express
- **Línea 8** (`await request(app)`): Crea una petición simulada a tu app
- **Línea 9** (`.get('/api/tasks')`): Simula GET a esa ruta
- **Línea 10** (`.expect(200)`): Verifica que el código de estado sea 200
- **Línea 12** (`expect(response.body).toBeInstanceOf(Array)`): Verifica que la respuesta sea un array
- **Línea 41** (`.send(newTask)`): Envía datos en el body (para POST)
- **Línea 44** (`expect(response.body).toHaveProperty('id')`): Verifica que el objeto tenga la propiedad 'id'

**Cómo ejecutar los tests**:

```bash
npm test
```

**Resultado esperado**:
```
✓ tests/api.test.js (6)
  ✓ API de Tareas (6)
    ✓ GET /api/tasks (1)
      ✓ devuelve todas las tareas
    ✓ GET /api/tasks/:id (2)
      ✓ devuelve una tarea existente
      ✓ devuelve 404 para tarea inexistente
    ✓ POST /api/tasks (2)
      ✓ crea una nueva tarea
      ✓ rechaza tarea sin título

Test Files  1 passed (1)
Tests  6 passed (6)
```

---

## Concepto 4: Testear con base de datos en memoria

Testear con una base de datos real es problemático: los tests son lentos, dejan datos sucios y pueden interferir entre sí. La solución: **base de datos en memoria**.

### Ejemplo: Tests con SQLite en memoria

**Lo que vamos a crear**: Tests que usan una base de datos temporal que se crea y destruye en cada test.

**Configura Prisma para testing** (`prisma/schema.prisma`):

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Task {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

**Crea un setup de testing** (`tests/setup.js`):

```javascript
import { PrismaClient } from '@prisma/client';
import { beforeEach, afterAll } from 'vitest';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file::memory:?cache=shared'
    }
  }
});

// Antes de cada test, limpia la base de datos
beforeEach(async () => {
  await prisma.task.deleteMany();
});

// Después de todos los tests, cierra la conexión
afterAll(async () => {
  await prisma.$disconnect();
});

export { prisma };
```

**Explicación**:
- **Línea 7** (`'file::memory:?cache=shared'`): URL de SQLite en memoria
  - La base de datos solo existe en RAM
  - Se destruye al cerrar la conexión
  - Super rápida (milisegundos vs segundos)
- **Líneas 13-15** (`beforeEach`): Hook que se ejecuta antes de cada test
  - Limpia todas las tareas para que cada test empiece limpio
- **Líneas 18-20** (`afterAll`): Hook que se ejecuta después de todos los tests
  - Cierra la conexión a Prisma

**Actualiza tu app para usar Prisma** (`src/app.js`):

```javascript
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

app.get('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tarea' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Título requerido' });
    }

    const task = await prisma.task.create({
      data: { title }
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tarea' });
  }
});

module.exports = app;
```

**Tests actualizados** (`tests/api.test.js`):

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { prisma } from './setup.js';

describe('API de Tareas con Base de Datos', () => {
  beforeEach(async () => {
    // Crear datos de prueba
    await prisma.task.create({
      data: { title: 'Tarea de prueba 1' }
    });
    await prisma.task.create({
      data: { title: 'Tarea de prueba 2', completed: true }
    });
  });

  describe('GET /api/tasks', () => {
    it('devuelve todas las tareas de la base de datos', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('title', 'Tarea de prueba 1');
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('devuelve una tarea específica', async () => {
      // Primero obtenemos todas para saber un ID válido
      const tasks = await prisma.task.findMany();
      const taskId = tasks[0].id;

      const response = await request(app)
        .get(`/api/tasks/${taskId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', taskId);
      expect(response.body).toHaveProperty('title');
    });

    it('devuelve 404 si la tarea no existe', async () => {
      await request(app)
        .get('/api/tasks/99999')
        .expect(404);
    });
  });

  describe('POST /api/tasks', () => {
    it('crea una nueva tarea en la base de datos', async () => {
      const newTask = { title: 'Nueva tarea desde test' };

      const response = await request(app)
        .post('/api/tasks')
        .send(newTask)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newTask.title);

      // Verifica que realmente se guardó en la DB
      const taskInDb = await prisma.task.findUnique({
        where: { id: response.body.id }
      });

      expect(taskInDb).not.toBeNull();
      expect(taskInDb.title).toBe(newTask.title);
    });

    it('rechaza tarea sin título', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');

      // Verifica que NO se creó en la DB
      const tasksCount = await prisma.task.count();
      expect(tasksCount).toBe(2); // Solo las 2 de beforeEach
    });
  });
});
```

**Explicación de mejoras**:
- **Líneas 7-15** (`beforeEach`): Crea datos de prueba antes de cada test
- **Línea 30-31**: Obtiene un ID válido dinámicamente (no hardcodeado)
- **Líneas 61-64**: Verifica en la base de datos que el dato se guardó realmente
- **Líneas 75-77**: Verifica que NO se creó un registro inválido

**Cómo ejecutar**:

```bash
# Primero, crea la migración
npx prisma migrate dev --name init

# Luego ejecuta los tests
npm test
```

---

## Concepto 5: Testear autenticación y rutas protegidas

Vamos a testear rutas que requieren autenticación JWT.

### Ejemplo: Tests de autenticación

**Lo que vamos a crear**: Tests que verifican registro, login y acceso a rutas protegidas.

**Setup de autenticación en tests** (`tests/auth.test.js`):

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { prisma } from './setup.js';

describe('Autenticación', () => {
  beforeEach(async () => {
    // Limpia usuarios antes de cada test
    await prisma.user.deleteMany();
  });

  describe('POST /api/auth/signup', () => {
    it('registra un nuevo usuario', async () => {
      const newUser = {
        email: 'test@email.com',
        password: 'Password123',
        name: 'Usuario Test'
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(newUser)
        .expect(201);

      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(newUser.email);
      expect(response.body.user).not.toHaveProperty('password'); // No debe devolver el password
    });

    it('rechaza email duplicado', async () => {
      const user = {
        email: 'duplicate@email.com',
        password: 'Password123'
      };

      // Crea el usuario una vez
      await request(app)
        .post('/api/auth/signup')
        .send(user)
        .expect(201);

      // Intenta crear el mismo usuario de nuevo
      await request(app)
        .post('/api/auth/signup')
        .send(user)
        .expect(400);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Crea un usuario para testear login
      await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'login@email.com',
          password: 'Password123'
        });
    });

    it('hace login con credenciales correctas', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@email.com',
          password: 'Password123'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('login@email.com');
    });

    it('rechaza password incorrecto', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@email.com',
          password: 'PasswordIncorrecto'
        })
        .expect(401);
    });

    it('rechaza email inexistente', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          email: 'noexiste@email.com',
          password: 'Password123'
        })
        .expect(401);
    });
  });

  describe('GET /api/profile (ruta protegida)', () => {
    let token;

    beforeEach(async () => {
      // Registra y obtiene token
      const signupResponse = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'protected@email.com',
          password: 'Password123',
          name: 'Usuario Protegido'
        });

      token = signupResponse.body.token;
    });

    it('permite acceso con token válido', async () => {
      const response = await request(app)
        .get('/api/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('email', 'protected@email.com');
      expect(response.body).toHaveProperty('name', 'Usuario Protegido');
    });

    it('rechaza acceso sin token', async () => {
      await request(app)
        .get('/api/profile')
        .expect(401);
    });

    it('rechaza token inválido', async () => {
      await request(app)
        .get('/api/profile')
        .set('Authorization', 'Bearer token-falso-invalido')
        .expect(401);
    });
  });
});
```

**Explicación de técnicas avanzadas**:
- **Líneas 100-111** (`beforeEach`): Crea un usuario y obtiene su token antes de cada test
  - Guarda el token en una variable `let token` accesible en todos los tests del describe
- **Línea 115** (`.set('Authorization', ...)`): Añade header a la petición
- **Línea 123**: Test sin token (debe fallar)
- **Línea 128**: Test con token inválido (debe fallar)

**Cómo ejecutar**:

```bash
npm test auth.test.js
```

---

## Práctica guiada: Suite de tests completa

Vamos a crear una API de productos con una suite completa de tests.

### Paso 1 de 3: Configurar proyecto con testing

**Lo que harás**:

1. Crea el proyecto:
   ```bash
   mkdir api-productos-testing
   cd api-productos-testing
   npm init -y
   npm install express zod
   npm install prisma --save-dev
   npm install @prisma/client vitest supertest
   npx prisma init --datasource-provider sqlite
   ```

2. Añade scripts de testing al `package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "dev": "node src/server.js"
  }
}
```

3. Crea la estructura de carpetas:
```
api-productos-testing/
├── src/
│   ├── app.js
│   └── server.js
├── tests/
│   ├── setup.js
│   └── products.test.js
└── prisma/
    └── schema.prisma
```

**Checkpoint**: Estructura de carpetas creada correctamente.

### Paso 2 de 3: Crear la aplicación

**Lo que harás**:

1. Define el modelo en `prisma/schema.prisma`:

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  price       Float
  stock       Int      @default(0)
  category    String
  createdAt   DateTime @default(now())
}
```

2. Ejecuta: `npx prisma migrate dev --name init`

3. Crea `src/app.js` con las rutas:

```javascript
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const productSchema = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  category: z.string().min(3)
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const result = productSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ error: 'Datos inválidos', details: result.error.errors });
    }

    const product = await prisma.product.create({
      data: result.data
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

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
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = app;
```

4. Crea `src/server.js`:

```javascript
const app = require('./app');

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

**Checkpoint**: Ejecuta `npm run dev` y verifica que el servidor arranca.

### Paso 3 de 3: Escribir la suite de tests

**Lo que harás**:

1. Crea `tests/setup.js`:

```javascript
import { PrismaClient } from '@prisma/client';
import { beforeEach, afterAll } from 'vitest';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file::memory:?cache=shared'
    }
  }
});

beforeEach(async () => {
  await prisma.product.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

export { prisma };
```

2. Crea `tests/products.test.js`:

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { prisma } from './setup.js';

describe('API de Productos', () => {
  beforeEach(async () => {
    // Crear productos de prueba
    await prisma.product.create({
      data: {
        name: 'Laptop HP',
        price: 799.99,
        stock: 10,
        category: 'Electrónica'
      }
    });

    await prisma.product.create({
      data: {
        name: 'Mouse Inalámbrico',
        price: 29.99,
        stock: 50,
        category: 'Electrónica'
      }
    });
  });

  describe('GET /api/products', () => {
    it('devuelve todos los productos', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('price');
    });

    it('devuelve array vacío si no hay productos', async () => {
      await prisma.product.deleteMany();

      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body).toHaveLength(0);
    });
  });

  describe('GET /api/products/:id', () => {
    it('devuelve un producto existente', async () => {
      const products = await prisma.product.findMany();
      const productId = products[0].id;

      const response = await request(app)
        .get(`/api/products/${productId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', productId);
      expect(response.body).toHaveProperty('name', 'Laptop HP');
    });

    it('devuelve 404 para producto inexistente', async () => {
      await request(app)
        .get('/api/products/99999')
        .expect(404);
    });

    it('devuelve 400 para ID inválido', async () => {
      await request(app)
        .get('/api/products/abc')
        .expect(400);
    });
  });

  describe('POST /api/products', () => {
    it('crea un nuevo producto', async () => {
      const newProduct = {
        name: 'Teclado Mecánico',
        price: 89.99,
        stock: 25,
        category: 'Electrónica'
      };

      const response = await request(app)
        .post('/api/products')
        .send(newProduct)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newProduct.name);

      // Verifica en la base de datos
      const productInDb = await prisma.product.findUnique({
        where: { id: response.body.id }
      });

      expect(productInDb).not.toBeNull();
      expect(productInDb.name).toBe(newProduct.name);
    });

    it('rechaza producto con precio negativo', async () => {
      const invalidProduct = {
        name: 'Producto inválido',
        price: -10,
        stock: 5,
        category: 'Test'
      };

      await request(app)
        .post('/api/products')
        .send(invalidProduct)
        .expect(400);
    });

    it('rechaza producto sin nombre', async () => {
      const invalidProduct = {
        price: 50,
        stock: 5,
        category: 'Test'
      };

      await request(app)
        .post('/api/products')
        .send(invalidProduct)
        .expect(400);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('elimina un producto existente', async () => {
      const products = await prisma.product.findMany();
      const productId = products[0].id;

      await request(app)
        .delete(`/api/products/${productId}`)
        .expect(204);

      // Verifica que ya no existe
      const productInDb = await prisma.product.findUnique({
        where: { id: productId }
      });

      expect(productInDb).toBeNull();
    });

    it('devuelve 404 al eliminar producto inexistente', async () => {
      await request(app)
        .delete('/api/products/99999')
        .expect(404);
    });
  });
});
```

**Checkpoint**:

Ejecuta: `npm test`

Deberías ver todos los tests pasando:
```
✓ tests/products.test.js (11)
  ✓ API de Productos (11)
    ✓ GET /api/products (2)
    ✓ GET /api/products/:id (3)
    ✓ POST /api/products (3)
    ✓ DELETE /api/products/:id (2)

Test Files  1 passed (1)
Tests  11 passed (11)
```

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: Tests interdependientes

**Te pasa cuando**: Un test modifica datos que afectan a otros tests

**El problema**:
```javascript
// ❌ Test A crea un producto
it('crea producto', async () => {
  await request(app).post('/api/products').send(product);
});

// ❌ Test B asume que hay 3 productos (incluyendo el de Test A)
it('cuenta productos', async () => {
  const response = await request(app).get('/api/products');
  expect(response.body).toHaveLength(3); // Falla si Test A no corrió
});
```

**Cómo se soluciona**:
Usa `beforeEach` para crear un estado limpio antes de cada test:
```javascript
beforeEach(async () => {
  await prisma.product.deleteMany();
  // Crea datos de prueba frescos
});
```

### Error #2: No esperar operaciones asíncronas

**Te pasa cuando**: Olvidas `await` en operaciones asíncronas

**El código problemático**:
```javascript
it('crea producto', async () => {
  request(app).post('/api/products').send(product); // ❌ Falta await
  expect(...); // Se ejecuta antes de que termine la petición
});
```

**Cómo se soluciona**:
```javascript
it('crea producto', async () => {
  await request(app).post('/api/products').send(product); // ✅ Con await
  expect(...); // Ahora espera correctamente
});
```

### Error #3: No cerrar conexiones

**Te pasa cuando**: No cierras Prisma después de los tests

**El problema**: Los tests terminan pero el proceso sigue corriendo.

**Cómo se soluciona**:
```javascript
afterAll(async () => {
  await prisma.$disconnect(); // ✅ Cierra la conexión
});
```

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: Al principio escribir tests parece lento ("podría probar esto manualmente en 30 segundos"), pero cuando tienes 50 rutas diferentes y haces un cambio que podría afectar cualquiera de ellas, ejecutar 200 tests en 5 segundos te salva horas de testing manual.

> **Otro tip importante**: Escribe los tests MIENTRAS desarrollas, no al final. Es mucho más fácil escribir un test cuando acabas de escribir el código y lo tienes fresco en la mente. Además, los tests te ayudan a diseñar mejor tu código.

> **Herramientas útiles**: Usa `npm run test:ui` para ver una interfaz visual de tus tests. Puedes ver cuáles pasaron, cuáles fallaron, y el tiempo de ejecución de cada uno. Es súper útil para debuggear tests que fallan.

---

## Tu turno: Ejercicio guiado

**Objetivo simple**: Crear tests completos para una API de blog con posts y comentarios

**Tiempo**: 50-60 minutos

**Parte 1: Configuración** (10 min)

1. Crea el proyecto con Vitest y Supertest
2. Define dos modelos:

```prisma
model Post {
  id        Int       @id @default(autoincrement())
  title     String
  content   String
  published Boolean   @default(false)
  comments  Comment[]
  createdAt DateTime  @default(now())
}

model Comment {
  id        Int      @id @default(autoincrement())
  content   String
  author    String
  postId    Int
  post      Post     @relation(fields: [postId], references: [id])
  createdAt DateTime @default(now())
}
```

**Parte 2: Implementar la API** (20 min)

Crea rutas para:
- GET `/api/posts` - Todos los posts
- GET `/api/posts/:id` - Un post con sus comentarios
- POST `/api/posts` - Crear post
- POST `/api/posts/:postId/comments` - Añadir comentario a un post
- DELETE `/api/comments/:id` - Eliminar comentario

**Parte 3: Escribir tests** (20 min)

Escribe tests para verificar:

1. **Posts**:
   - Crear un post
   - Obtener todos los posts
   - Obtener un post con sus comentarios incluidos
   - Rechazar post sin título

2. **Comentarios**:
   - Añadir comentario a un post existente
   - Rechazar comentario a post inexistente
   - Eliminar un comentario
   - Verificar que al obtener un post, incluya sus comentarios

**Criterio de éxito**:
- [ ] Todos los tests pasan
- [ ] Tienes mínimo 8 tests diferentes
- [ ] Los tests usan base de datos en memoria
- [ ] Los tests son independientes (cada uno limpia después)
- [ ] Verificas tanto la respuesta HTTP como los datos en la DB

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Por qué testear es esencial**: Los tests automatizados son tu red de seguridad que te da confianza para hacer cambios sin romper funcionalidades existentes. No es opcional en desarrollo profesional.

2. **Cómo testear APIs con Vitest y Supertest**: Vitest proporciona el framework de testing, Supertest simula peticiones HTTP. Combínalos para testear rutas verificando códigos de estado, respuestas y datos en la base de datos.

3. **Base de datos en memoria para tests**: Usa SQLite en memoria (`file::memory:`) para tests rápidos e independientes. Cada test empieza con un estado limpio gracias a `beforeEach` que limpia la base de datos.

---

## Siguiente paso

¡Felicitaciones! Has completado el Módulo 6 de desarrollo backend. Ahora sabes crear servidores, trabajar con bases de datos, implementar autenticación, diseñar APIs REST, validar datos y testear todo tu código.

El siguiente paso es el **Módulo 7: Proyecto integrador**, donde combinarás todo lo aprendido (frontend con React + backend con Node.js + base de datos + autenticación) para crear una aplicación full-stack completa de principio a fin.

---

**¿Dudas?** Testing puede parecer un lujo cuando empiezas ("mi código funciona, ¿para qué testear?"), pero es una inversión que paga enormes dividendos. La primera vez que refactorices código y todos tus tests sigan pasando, entenderás el valor. O cuando un test falle y te salve de subir un bug a producción. Los tests no son para "ahora", son para el "tú del futuro" que agradecerá tener esa red de seguridad.
