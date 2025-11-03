<p><strong><em>Guardando datos: base de datos con Prisma ORM</em></strong></p>

## Introducción: Del código efímero a los datos permanentes

En la lección anterior creaste tu primer servidor y aprendiste a devolver datos con rutas API. Pero había un problema: todos los datos estaban "escritos a mano" en el código. Cada vez que reiniciabas el servidor, los datos volvían a ser exactamente los mismos. Si un usuario creaba una cuenta o guardaba una tarea, esa información desaparecía en cuanto apagabas el servidor.

Imagina un restaurante donde cada mañana el chef tiene que recordar de memoria todos los platillos del menú, todos los ingredientes del almacén y todas las reservas del día. Sería imposible, ¿verdad? Por eso los restaurantes tienen libretas, inventarios y sistemas de reservas: necesitan **guardar información de forma permanente**.

Hoy aprenderás a usar una **base de datos** para que tu servidor pueda guardar, leer, actualizar y eliminar información que persiste en el tiempo. Y lo harás de la forma más sencilla posible usando Prisma ORM.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Entender qué es una base de datos**: Comprender cómo funciona una base de datos usando la analogía de hojas de cálculo de Excel
2. **Configurar Prisma ORM en tu proyecto**: Instalar y configurar Prisma para trabajar con bases de datos de forma sencilla
3. **Crear y usar modelos de datos**: Definir la estructura de tus datos y realizar operaciones básicas de creación y lectura

---

## ¿Por qué necesitas una base de datos?

Una **base de datos** es como un archivo Excel gigante súper organizado que vive en tu computadora (o en un servidor) y puede guardar millones de datos de forma estructurada.

**Analogía del Excel**:
- **Base de datos** → El archivo Excel completo
- **Tabla** → Cada hoja dentro del Excel (Hoja1, Hoja2, etc.)
- **Registro (row)** → Cada fila en la hoja
- **Campo (column)** → Cada columna en la hoja (Nombre, Email, Edad, etc.)

Por ejemplo, imagina una hoja de Excel llamada "Usuarios":

| id | nombre      | email              | edad |
|----|-------------|--------------------|------|
| 1  | Ana García  | ana@email.com      | 25   |
| 2  | Luis Pérez  | luis@email.com     | 30   |
| 3  | María López | maria@email.com    | 28   |

Cada fila es un usuario diferente (un **registro**), y cada columna es una propiedad de ese usuario (un **campo**).

### 📊 Un dato interesante

Las empresas más grandes del mundo (Google, Facebook, Amazon) manejan bases de datos con petabytes de información (1 petabyte = 1 millón de gigabytes). Pero no te preocupes, empezarás con bases de datos pequeñitas que caben en tu computadora y son perfectas para aprender.

---

## Concepto 1: ¿Qué es un ORM y por qué Prisma?

**ORM** significa "Object-Relational Mapping" (Mapeo Objeto-Relacional). Suena complicado, pero es súper simple de entender.

**Analogía del traductor**:
Imagina que quieres pedirle a la base de datos que te dé todos los usuarios. La base de datos habla un idioma llamado **SQL** que se ve así:

```sql
SELECT * FROM usuarios WHERE edad > 25;
```

Tú podrías aprender SQL (y eventualmente lo harás), pero como principiante sería como tener que aprender alemán solo para pedir una cerveza en un bar de Berlín.

**Prisma es tu traductor personal**: tú le dices en JavaScript normal lo que quieres, y Prisma lo traduce a SQL automáticamente:

```javascript
// Esto en JavaScript con Prisma
const usuarios = await prisma.usuario.findMany({
  where: { edad: { gt: 25 } }
});

// Prisma lo traduce a SQL por ti
```

**¿Por qué Prisma es genial?**
- **Fácil de aprender**: Escribes código JavaScript normal, nada de SQL complejo
- **Autocompletado**: Tu editor te ayuda sugiriendo código (gracias a TypeScript)
- **Seguro**: Previene errores comunes de seguridad automáticamente
- **Visual**: Tiene una herramienta llamada Prisma Studio donde ves tus datos como en Excel

---

## Concepto 2: Instalando y configurando Prisma

Vamos a configurar Prisma paso a paso en un proyecto nuevo.

### Ejemplo: Configuración inicial de Prisma

**Lo que vamos a crear**: Un proyecto con Prisma configurado y listo para usar.

**Primero, crea el proyecto**:

Abre tu terminal y ejecuta:

```bash
mkdir proyecto-tareas
cd proyecto-tareas
npm init -y
npm install express
npm install prisma --save-dev
npm install @prisma/client
```

**Explicación de los comandos**:
- `npm install prisma --save-dev`: Instala Prisma como herramienta de desarrollo
- `npm install @prisma/client`: Instala el cliente de Prisma que usarás en tu código

**Ahora, inicializa Prisma**:

```bash
npx prisma init --datasource-provider sqlite
```

**Explicación del comando**:
- `npx prisma init`: Crea la configuración inicial de Prisma
- `--datasource-provider sqlite`: Le dice que use SQLite (una base de datos que es solo un archivo, perfecta para aprender)

**Resultado**: Se crearon dos cosas:
1. Una carpeta `prisma/` con un archivo `schema.prisma` (donde defines la estructura de tus datos)
2. Un archivo `.env` (donde se guarda la conexión a la base de datos)

**Tu archivo `prisma/schema.prisma` debería verse así**:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

**Explicación línea por línea**:
- **Líneas 1-3** (`generator client`): Le dice a Prisma que genere código JavaScript para trabajar con la base de datos
- **Líneas 5-8** (`datasource db`): Define qué tipo de base de datos usarás (SQLite) y dónde encontrarla

**Cómo probarlo**: Si ejecutaste todo correctamente, deberías tener esta estructura de carpetas:
```
proyecto-tareas/
├── node_modules/
├── prisma/
│   └── schema.prisma
├── .env
└── package.json
```

---

## Concepto 3: Creando tu primer modelo de datos

Un **modelo** es como definir las columnas de tu hoja de Excel antes de empezar a escribir datos. Le dices a Prisma: "Quiero guardar tareas, y cada tarea tiene un id, un título y un estado de completado".

### Ejemplo: Modelo de tareas simple

**Lo que vamos a crear**: Un modelo `Task` (tarea) con tres campos.

**Abre `prisma/schema.prisma` y añade este modelo al final**:

```prisma
model Task {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

**Explicación línea por línea**:
- **Línea 1** (`model Task {`): Crea un modelo llamado "Task" (esto creará una tabla llamada "Task" en la base de datos)
- **Línea 2** (`id Int @id @default(autoincrement())`):
  - `id`: El nombre del campo
  - `Int`: Tipo de dato (número entero)
  - `@id`: Este campo es el identificador único (como el número de DNI)
  - `@default(autoincrement())`: Se incrementa automáticamente (1, 2, 3...)
- **Línea 3** (`title String`): Campo de texto para el título de la tarea
- **Línea 4** (`completed Boolean @default(false)`): Campo verdadero/falso, por defecto es `false`
- **Línea 5** (`createdAt DateTime @default(now())`): Fecha de creación, por defecto la fecha actual

**Ahora, crea la base de datos con ese modelo**:

```bash
npx prisma migrate dev --name init
```

**Explicación del comando**:
- `npx prisma migrate dev`: Crea la base de datos y las tablas según tu modelo
- `--name init`: Le da un nombre a esta "migración" (cambio en la base de datos)

**Resultado**: Se creó un archivo `dev.db` en la carpeta `prisma/`. ¡Esa es tu base de datos! Es solo un archivo, como un documento de Word, pero con una estructura especial para guardar datos.

**Cómo probarlo**: Ejecuta este comando para abrir Prisma Studio (una herramienta visual):

```bash
npx prisma studio
```

Se abrirá una página en tu navegador donde puedes ver tu tabla "Task" vacía, como una hoja de Excel sin datos todavía.

---

## Concepto 4: Crear datos (operación CREATE)

Ahora que tienes la base de datos configurada, es momento de guardar tu primera tarea.

### Ejemplo: Crear tareas desde el servidor

**Lo que vamos a crear**: Una ruta API que crea una tarea nueva en la base de datos.

**Crea un archivo `server.js` con este código**:

```javascript
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(express.json());

app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;

  const newTask = await prisma.task.create({
    data: { title }
  });

  res.json(newTask);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

**Explicación línea por línea**:
- **Línea 1** (`const express = require('express');`): Importa Express
- **Línea 2** (`const { PrismaClient } = require('@prisma/client');`): Importa Prisma Client para trabajar con la base de datos
- **Línea 5** (`const prisma = new PrismaClient();`): Crea una conexión a la base de datos
- **Línea 8** (`app.use(express.json());`): Middleware que permite recibir datos JSON en las peticiones
- **Línea 10** (`app.post('/api/tasks', ...)`): Ruta POST (para crear cosas nuevas)
- **Línea 11** (`const { title } = req.body;`): Extrae el título que el cliente envió
- **Líneas 13-15** (`await prisma.task.create(...)`): Le dice a Prisma "crea una tarea nueva con este título"
  - `await`: Espera a que la operación termine (guardar en la base de datos toma tiempo)
  - `prisma.task`: Accede al modelo Task
  - `.create()`: Método para crear un nuevo registro
  - `data: { title }`: Los datos de la nueva tarea
- **Línea 17** (`res.json(newTask);`): Devuelve la tarea creada como respuesta

**Cómo probarlo**:

1. Ejecuta: `node server.js`
2. Usa Thunder Client o Postman para hacer una petición POST:
   - **Método**: POST
   - **URL**: `http://localhost:3001/api/tasks`
   - **Body** (JSON):
     ```json
     {
       "title": "Aprender Prisma"
     }
     ```
3. Deberías recibir como respuesta:
   ```json
   {
     "id": 1,
     "title": "Aprender Prisma",
     "completed": false,
     "createdAt": "2024-01-15T10:30:00.000Z"
   }
   ```

**Resultado**: La tarea se guardó en la base de datos. Si ejecutas `npx prisma studio`, verás la tarea en la tabla Task.

---

## Concepto 5: Leer datos (operación READ)

Ahora vamos a crear una ruta que lee todas las tareas guardadas en la base de datos.

### Ejemplo: Leer todas las tareas

**Lo que vamos a crear**: Una ruta GET que devuelve todas las tareas.

**Añade esta ruta a tu `server.js` (antes del `app.listen()`)**:

```javascript
app.get('/api/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' }
  });

  res.json(tasks);
});
```

**Explicación línea por línea**:
- **Línea 1** (`app.get('/api/tasks', ...)`): Ruta GET para leer tareas
- **Líneas 2-4** (`await prisma.task.findMany(...)`): Le dice a Prisma "dame todas las tareas"
  - `findMany()`: Método para encontrar múltiples registros
  - `orderBy: { createdAt: 'desc' }`: Ordena por fecha de creación, más recientes primero
- **Línea 6** (`res.json(tasks);`): Devuelve el array de tareas

**Cómo probarlo**:

1. Reinicia el servidor (Ctrl+C y luego `node server.js`)
2. Crea 2-3 tareas usando la ruta POST del ejemplo anterior
3. Visita en tu navegador: `http://localhost:3001/api/tasks`
4. Deberías ver un array con todas tus tareas:
   ```json
   [
     {
       "id": 3,
       "title": "Practicar backend",
       "completed": false,
       "createdAt": "2024-01-15T11:00:00.000Z"
     },
     {
       "id": 2,
       "title": "Crear API",
       "completed": false,
       "createdAt": "2024-01-15T10:45:00.000Z"
     },
     {
       "id": 1,
       "title": "Aprender Prisma",
       "completed": false,
       "createdAt": "2024-01-15T10:30:00.000Z"
     }
   ]
   ```

**Resultado**: Ahora puedes leer todas las tareas guardadas en la base de datos. ¡Esto es lo que tu aplicación React haría para mostrar la lista de tareas!

---

## Práctica guiada: Sistema de tareas completo

Vamos a crear una API simple para gestionar tareas con operaciones de crear y leer.

### Paso 1 de 3: Configurar el proyecto con Prisma

**Lo que harás**:
1. Crea una carpeta: `mkdir mi-lista-tareas`
2. Entra a la carpeta: `cd mi-lista-tareas`
3. Inicializa el proyecto: `npm init -y`
4. Instala las dependencias:
   ```bash
   npm install express
   npm install prisma --save-dev
   npm install @prisma/client
   ```
5. Inicializa Prisma: `npx prisma init --datasource-provider sqlite`

**Tu estructura de carpetas debería verse así**:
```
mi-lista-tareas/
├── node_modules/
├── prisma/
│   └── schema.prisma
├── .env
└── package.json
```

**Checkpoint**: Verifica que tienes la carpeta `prisma/` con el archivo `schema.prisma` dentro.

### Paso 2 de 3: Crear el modelo y la base de datos

**Lo que harás**:

1. Abre `prisma/schema.prisma`
2. Añade este modelo al final del archivo (después del `datasource db`):

```prisma
model Task {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

3. Guarda el archivo
4. Ejecuta: `npx prisma migrate dev --name crear-tareas`

**Explicación**:
- **Línea 1**: Crea un modelo llamado "Task"
- **Línea 2**: Campo `id` que se incrementa automáticamente
- **Línea 3**: Campo `title` de tipo texto
- **Línea 4**: Campo `completed` booleano, por defecto `false`
- **Línea 5**: Campo `createdAt` con la fecha actual por defecto

**Checkpoint**: Ejecuta `npx prisma studio`. Deberías ver una tabla "Task" vacía. Si la ves, ¡todo está bien!

### Paso 3 de 3: Crear el servidor con rutas API

**Lo que harás**:

Crea un archivo `server.js` con el código completo:

```javascript
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

// Middleware para parsear JSON
app.use(express.json());

// Ruta para crear una tarea
app.post('/api/tasks', async (req, res) => {
  try {
    const { title } = req.body;

    const newTask = await prisma.task.create({
      data: { title }
    });

    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
});

// Ruta para obtener todas las tareas
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
});

// Ruta para obtener una tarea por ID
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
    res.status(500).json({ error: 'Error al obtener la tarea' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

**Explicación de las secciones**:
- **Líneas 1-6**: Imports y configuración inicial
- **Línea 9**: Middleware para recibir JSON
- **Líneas 12-24**: Ruta POST para crear tareas (con manejo de errores)
- **Líneas 27-36**: Ruta GET para obtener todas las tareas
- **Líneas 39-54**: Ruta GET para obtener una tarea específica por su ID
  - `req.params.id`: Extrae el ID de la URL (ej: `/api/tasks/1` → id es "1")
  - `parseInt(id)`: Convierte el ID de texto a número
  - `findUnique()`: Busca un único registro por un campo único
- **Líneas 56-58**: Arranca el servidor

**Checkpoint**:
1. Ejecuta: `node server.js`
2. Crea algunas tareas con Thunder Client (POST a `/api/tasks` con body `{"title": "Mi tarea"}`)
3. Visita `http://localhost:3001/api/tasks` en tu navegador
4. Deberías ver un array con todas las tareas creadas

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: "PrismaClient is unable to be run in the browser"

**Te pasa cuando**: Intentas usar Prisma en el frontend (React)

**El mensaje de error que ves**:
```
PrismaClient is unable to be run in the browser
```

**Por qué pasa**: Prisma solo funciona en el backend (Node.js), nunca en el navegador. La base de datos debe estar en el servidor, no en la computadora del usuario.

**Cómo se soluciona**:
1. Asegúrate de usar Prisma solo en archivos del backend (`server.js`, rutas API, etc.)
2. En React, usa `fetch()` para pedirle datos al backend, no intentes acceder a Prisma directamente

### Error #2: "Invalid `prisma.task.create()` invocation"

**Te pasa cuando**: Intentas crear un registro sin proporcionar todos los campos requeridos

**El mensaje de error que ves**:
```
Invalid `prisma.task.create()` invocation:
Argument `data.title` is missing
```

**Por qué pasa**: Tu modelo requiere el campo `title`, pero no lo estás enviando en el `req.body` o está vacío.

**Cómo se soluciona**:
1. Verifica que estás enviando el campo en el body de la petición:
   ```json
   { "title": "Mi tarea" }
   ```
2. Asegúrate de tener `app.use(express.json())` en tu servidor
3. Verifica que el `Content-Type` de la petición sea `application/json` en Thunder Client

### Error #3: "Can't reach database server"

**Te pasa cuando**: Prisma no puede encontrar tu base de datos

**El mensaje de error que ves**:
```
Can't reach database server at `file:./dev.db`
```

**Por qué pasa**: Probablemente olvidaste ejecutar `npx prisma migrate dev` para crear la base de datos.

**Cómo se soluciona**:
1. Ejecuta: `npx prisma migrate dev --name init`
2. Verifica que se creó el archivo `prisma/dev.db`
3. Si el problema persiste, elimina la carpeta `prisma/migrations` y el archivo `dev.db`, y ejecuta la migración de nuevo

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: La base de datos es como guardar un archivo de Word: no lo ves cambiar en tiempo real, pero confía en que está ahí. Usa `npx prisma studio` frecuentemente para ver visualmente los datos que estás guardando. Es como abrir el archivo de Word para ver qué escribiste.

> **Otro tip importante**: Siempre usa `async/await` con Prisma. Todas las operaciones de base de datos tardan un poco (aunque sean milisegundos), así que debes esperar a que terminen antes de continuar. Si olvidas el `await`, tu código seguirá ejecutándose antes de que los datos se guarden o se lean, causando errores raros.

> **Herramientas útiles**: Mantén Prisma Studio abierto en una pestaña del navegador mientras desarrollas. Cada vez que crees, actualices o elimines datos desde tu API, refresca Prisma Studio para ver los cambios. Es como tener un inspector de base de datos en vivo.

---

## Tu turno: Ejercicio guiado

**Objetivo simple**: Crear una API de libros donde puedas guardar tus libros favoritos y consultarlos

**Tiempo**: 30-40 minutos

**Lo que necesitas antes de empezar**:
- [ ] Node.js instalado
- [ ] Editor de código (VS Code)
- [ ] Thunder Client o Postman instalado

### Instrucciones paso a paso

**Parte 1: Configuración del proyecto** (10 min)

1. Crea una carpeta: `mkdir api-libros`
2. Navega a la carpeta: `cd api-libros`
3. Inicializa el proyecto: `npm init -y`
4. Instala las dependencias:
   ```bash
   npm install express
   npm install prisma --save-dev
   npm install @prisma/client
   ```
5. Inicializa Prisma: `npx prisma init --datasource-provider sqlite`

**Parte 2: Crear el modelo de datos** (10 min)

1. Abre `prisma/schema.prisma`
2. Añade un modelo `Book` con estos campos:
   - `id`: Int, autoincremental, clave primaria
   - `title`: String (título del libro)
   - `author`: String (autor del libro)
   - `pages`: Int (número de páginas)
   - `read`: Boolean con valor por defecto `false` (si ya lo leíste)
   - `createdAt`: DateTime con valor por defecto `now()`

3. Ejecuta la migración: `npx prisma migrate dev --name crear-libros`
4. Verifica en Prisma Studio que la tabla se creó: `npx prisma studio`

**Parte 3: Crear las rutas API** (15 min)

1. Crea un archivo `server.js`
2. Configura Express y Prisma (imports, app, prisma, PORT)
3. Añade el middleware `express.json()`
4. Crea estas rutas:
   - **POST `/api/books`**: Crear un libro nuevo (recibe `title`, `author`, `pages` en el body)
   - **GET `/api/books`**: Obtener todos los libros, ordenados por fecha de creación descendente
   - **GET `/api/books/:id`**: Obtener un libro específico por ID

**Parte 4: Probar la API** (5-10 min)

1. Inicia el servidor: `node server.js`
2. Crea 3 libros con Thunder Client usando POST `/api/books`:
   ```json
   {
     "title": "Cien años de soledad",
     "author": "Gabriel García Márquez",
     "pages": 432
   }
   ```
3. Obtén todos los libros: GET `/api/books`
4. Obtén un libro específico: GET `/api/books/1`
5. Abre Prisma Studio y verifica que los 3 libros estén en la base de datos

**Criterio de éxito**:
- [ ] La migración de Prisma se ejecutó sin errores
- [ ] Puedes crear libros con POST y recibes el libro creado con su ID
- [ ] Puedes ver todos los libros con GET `/api/books`
- [ ] Puedes ver un libro específico con GET `/api/books/:id`
- [ ] Los libros aparecen en Prisma Studio
- [ ] El campo `read` es `false` por defecto (sin que lo envíes en el body)

**Ejemplo de respuesta esperada**:

Cuando hagas GET a `/api/books`, deberías ver algo así:
```json
[
  {
    "id": 3,
    "title": "El principito",
    "author": "Antoine de Saint-Exupéry",
    "pages": 96,
    "read": false,
    "createdAt": "2024-01-15T12:30:00.000Z"
  },
  {
    "id": 2,
    "title": "1984",
    "author": "George Orwell",
    "pages": 328,
    "read": false,
    "createdAt": "2024-01-15T12:20:00.000Z"
  },
  {
    "id": 1,
    "title": "Cien años de soledad",
    "author": "Gabriel García Márquez",
    "pages": 432,
    "read": false,
    "createdAt": "2024-01-15T12:10:00.000Z"
  }
]
```

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Qué es una base de datos y por qué usarla**: Una base de datos es como un Excel súper organizado donde guardas datos de forma permanente. Sin ella, tus datos desaparecen cada vez que apagas el servidor.

2. **Qué es Prisma ORM y cómo configurarlo**: Prisma es un "traductor" que te permite trabajar con bases de datos usando JavaScript normal en lugar de SQL. Se configura con `npx prisma init` y defines tus modelos en `schema.prisma`.

3. **Cómo crear y leer datos con Prisma**: Usas `prisma.model.create()` para guardar nuevos registros y `prisma.model.findMany()` para leer múltiples registros. Todas las operaciones requieren `async/await` porque acceder a la base de datos toma tiempo.

---

## Siguiente paso

En la próxima lección: **Autenticación y autorización con JWT**. Aprenderás a crear un sistema de registro y login para que solo usuarios autenticados puedan acceder a ciertas rutas de tu API. Es como añadir un sistema de pulseras en un evento: solo quien tenga la pulsera correcta puede entrar a ciertas áreas. ¡Tu aplicación empezará a sentirse como una aplicación real con usuarios y seguridad!

---

**¿Dudas?** Trabajar con bases de datos puede sentirse abstracto al principio porque no ves físicamente dónde se guardan los datos (es solo un archivo `.db`). Mi consejo: usa Prisma Studio constantemente. Es como tener una ventana a tu base de datos donde puedes ver, editar y eliminar datos manualmente. Esto te ayuda a entender que los datos realmente están ahí, guardados de forma permanente, esperando a que tu código los lea o modifique.
