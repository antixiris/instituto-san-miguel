<p><strong><em>Tu primer servidor: Node.js y Express con Claude</em></strong></p>

## Introducción: Del frontend al backend

Hasta ahora has trabajado con React, creando interfaces bonitas que los usuarios ven y con las que interactúan. Pero, ¿alguna vez te has preguntado de dónde vienen los datos que muestra tu aplicación? ¿O dónde se guardan las tareas que creas en tu lista de pendientes?

La respuesta está en el **backend**: la parte invisible pero fundamental de cualquier aplicación web. Si el frontend es la cara visible de un restaurante (el comedor, la decoración, el menú), el backend es la cocina donde se prepara todo.

Hoy darás tu primer paso en el mundo del backend creando tu propio servidor web desde cero. No te preocupes si esto suena intimidante, vamos a ir paso a paso, y descubrirás que es más sencillo de lo que parece.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Entender qué es un servidor y el backend**: Comprender la diferencia entre frontend y backend usando analogías del mundo real
2. **Crear tu primer servidor con Node.js y Express**: Configurar un proyecto backend desde cero y hacer que tu servidor escuche peticiones
3. **Crear rutas API simples**: Hacer que tu servidor responda a diferentes peticiones con datos en formato JSON

---

## ¿Por qué es importante el desarrollo backend?

Imagina que entras a un restaurante (esto es como entrar a una aplicación web). Te sientas en una mesa bonita, ves un menú bien diseñado y un mesero amable te atiende. Esto es el **frontend**: lo que ves y con lo que interactúas.

Pero cuando pides una hamburguesa, ¿quién la cocina? ¿Dónde están guardados los ingredientes? ¿Quién verifica que tienes dinero para pagar? Todo eso ocurre en la **cocina** (el backend) donde hay:

- **Cocineros** que preparan los platos (el servidor procesa peticiones)
- **Una despensa** donde se guardan los ingredientes (la base de datos)
- **Un chef** que verifica las órdenes (autenticación y validación)

Sin backend, tu aplicación React sería como un restaurante sin cocina: bonito por fuera, pero incapaz de hacer nada útil.

### 📊 Un dato interesante

El 80% de la lógica de negocio de aplicaciones empresariales está en el backend. Empresas como Netflix, Spotify o Instagram procesan millones de peticiones por segundo en sus servidores. Dominar el backend te abre las puertas a ser un desarrollador full-stack completo.

---

## Concepto 1: ¿Qué es Node.js?

**Node.js** es un entorno que te permite ejecutar JavaScript fuera del navegador. Hasta ahora, JavaScript solo podía correr en el navegador (para hacer páginas web interactivas). Pero en 2009, Node.js cambió todo: ahora puedes usar JavaScript para crear servidores, trabajar con archivos, conectarte a bases de datos y mucho más.

**Analogía**: Si JavaScript en el navegador es como cocinar solo en un microondas, Node.js es como tener una cocina completa con estufa, horno y todos los utensilios profesionales.

**¿Por qué es genial para ti?**
- Ya sabes JavaScript del Módulo 2 y del Módulo 4 con React
- No necesitas aprender un nuevo lenguaje para el backend
- Puedes usar el mismo código tanto en frontend como en backend

---

## Concepto 2: ¿Qué es Express?

**Express** es un framework (conjunto de herramientas) que hace súper fácil crear servidores web con Node.js. Sin Express, crear un servidor sería como construir una casa desde cero cortando los árboles tú mismo. Con Express, ya tienes las paredes, el techo y las puertas listas, solo necesitas decorar.

**Analogía**: Node.js es el idioma que hablas (JavaScript), y Express es el libro de frases útiles que te ayuda a decir las cosas correctas sin tener que inventar cada palabra.

Express te permite:
- Crear rutas (URLs) fácilmente
- Recibir y enviar datos
- Manejar errores de forma simple
- Organizar tu código de manera profesional

---

## Concepto 3: Tu primer servidor "Hola Mundo"

Vamos a crear el servidor más simple posible: uno que responda "Hola Mundo" cuando alguien lo visite.

### Ejemplo: Servidor básico con Express

**Lo que vamos a crear**: Un servidor que corre en tu computadora (localhost) en el puerto 3001 y responde un mensaje de bienvenida.

**Primero, configuremos el proyecto**:

Abre tu terminal y ejecuta estos comandos:

```bash
mkdir mi-primer-servidor
cd mi-primer-servidor
npm init -y
npm install express
```

**Explicación de los comandos**:
- `mkdir mi-primer-servidor`: Crea una carpeta para tu proyecto
- `cd mi-primer-servidor`: Entra a esa carpeta
- `npm init -y`: Crea un archivo `package.json` (configuración del proyecto)
- `npm install express`: Descarga e instala Express en tu proyecto

**Código del servidor** (crea un archivo llamado `server.js`):

```javascript
const express = require('express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.send('¡Hola Mundo desde mi primer servidor!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

**Explicación línea por línea**:
- **Línea 1** (`const express = require('express');`): Importa Express para poder usarlo
- **Línea 2** (`const app = express();`): Crea tu aplicación/servidor Express
- **Línea 3** (`const PORT = 3001;`): Define en qué puerto va a escuchar tu servidor (como el número de canal de TV)
- **Línea 5** (`app.get('/', ...)`): Crea una ruta que responde a peticiones GET en la URL raíz `/`
- **Línea 6** (`res.send(...)`): Envía la respuesta "¡Hola Mundo..." al cliente que pidió esta página
- **Línea 9** (`app.listen(PORT, ...)`): Arranca el servidor y lo pone a escuchar en el puerto 3001
- **Línea 10** (`console.log(...)`): Muestra un mensaje en la terminal confirmando que el servidor arrancó

**Cómo probarlo**:

1. En la terminal, ejecuta: `node server.js`
2. Abre tu navegador y ve a: `http://localhost:3001`
3. Deberías ver el mensaje: "¡Hola Mundo desde mi primer servidor!"

**Resultado**: Tu navegador hace una petición GET a tu servidor, y tu servidor responde con el mensaje. ¡Acabas de crear tu primer servidor!

---

## Concepto 4: Entendiendo rutas y peticiones

Una **ruta** es como una dirección específica en tu servidor. Es el equivalente a las diferentes secciones de un restaurante: la entrada, la barra, el comedor, los baños. Cada ruta hace algo diferente.

**Analogía de restaurante**:
- Ruta `/` → La entrada principal
- Ruta `/menu` → El mesero te trae el menú
- Ruta `/pedido` → Haces un pedido
- Ruta `/cuenta` → Pides la cuenta

### Ejemplo: Servidor con múltiples rutas

**Lo que vamos a crear**: Un servidor con 3 rutas diferentes que responden cosas distintas.

**Código**:

```javascript
const express = require('express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Bienvenido a mi API');
});

app.get('/about', (req, res) => {
  res.send('Esta es una API hecha con Express y Node.js');
});

app.get('/time', (req, res) => {
  const horaActual = new Date().toLocaleTimeString();
  res.send(`La hora del servidor es: ${horaActual}`);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

**Explicación línea por línea**:
- **Líneas 1-3**: Configuración inicial (igual que antes)
- **Líneas 5-7**: Ruta `/` que da la bienvenida
- **Líneas 9-11**: Ruta `/about` que explica qué es la API
- **Líneas 13-16**: Ruta `/time` que calcula la hora actual y la envía
  - `new Date()` crea un objeto con la fecha y hora actual
  - `.toLocaleTimeString()` la convierte a formato de texto legible
  - `res.send()` envía la respuesta con la hora
- **Líneas 18-20**: Arranca el servidor

**Cómo probarlo**:

1. Ejecuta: `node server.js`
2. Prueba estas URLs en tu navegador:
   - `http://localhost:3001/` → "Bienvenido a mi API"
   - `http://localhost:3001/about` → "Esta es una API hecha con Express..."
   - `http://localhost:3001/time` → "La hora del servidor es: 14:30:45"

**Resultado**: Ahora tienes un servidor con múltiples "habitaciones", cada una con una función diferente.

---

## Concepto 5: Enviando datos en formato JSON

Hasta ahora hemos enviado texto simple. Pero las aplicaciones modernas necesitan enviar **datos estructurados** (como objetos de JavaScript). Aquí es donde entra **JSON**.

**JSON** (JavaScript Object Notation) es el formato estándar para enviar datos entre el frontend y el backend. Es básicamente un objeto de JavaScript convertido a texto.

### Ejemplo: Ruta que devuelve JSON

**Lo que vamos a crear**: Una ruta que devuelve información de un usuario en formato JSON (como lo haría una API real).

**Código**:

```javascript
const express = require('express');
const app = express();
const PORT = 3001;

app.get('/api/user', (req, res) => {
  const usuario = {
    id: 1,
    nombre: 'Ana García',
    email: 'ana@email.com',
    rol: 'estudiante'
  };
  res.json(usuario);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

**Explicación línea por línea**:
- **Líneas 1-3**: Configuración inicial
- **Línea 5** (`app.get('/api/user', ...)`): Crea una ruta API (nota la convención `/api/...`)
- **Líneas 6-11**: Crea un objeto JavaScript con datos de un usuario
- **Línea 12** (`res.json(usuario)`): Convierte el objeto a JSON y lo envía como respuesta
- **Líneas 15-17**: Arranca el servidor

**Cómo probarlo**:

1. Ejecuta: `node server.js`
2. Visita: `http://localhost:3001/api/user`
3. Verás:
   ```json
   {
     "id": 1,
     "nombre": "Ana García",
     "email": "ana@email.com",
     "rol": "estudiante"
   }
   ```

**Resultado**: Tu navegador recibe datos estructurados que tu aplicación React podría consumir fácilmente con `fetch()`.

---

## 🤖 Claude Code en Acción: Acelerando tu desarrollo backend desde cero

Ahora que entiendes los fundamentos de Node.js y Express, es momento de descubrir cómo Claude Code puede **multiplicar tu velocidad de desarrollo** y ayudarte a crear servidores profesionales en minutos, no horas.

Claude Code no solo genera código: entiende arquitectura backend, aplica mejores prácticas automáticamente, configura herramientas profesionales y te explica cada decisión. Es como tener un desarrollador senior backend a tu lado mientras aprendes.

### Prompts Efectivos para Tu Primer Servidor

#### **Prompt 1: Crear servidor Express con estructura profesional**

```
Crea un servidor Express con TypeScript y estructura profesional que incluya:
- Configuración de TypeScript con tipos estrictos
- Middleware esenciales (cors, helmet, morgan para logs)
- Manejo de errores centralizado
- Variables de entorno con dotenv
- Scripts npm para desarrollo y producción
- Puerto configurable desde .env
```

**Explicación:**
Este prompt le dice a Claude Code que quieres más que un "hola mundo": quieres un servidor production-ready desde el inicio. Claude creará:
- `tsconfig.json` configurado para Node.js
- Middleware de seguridad (helmet protege contra vulnerabilidades comunes)
- Logging automático de peticiones (morgan)
- CORS configurado para que tu frontend pueda comunicarse
- Gestión profesional de variables de entorno

**Código generado:**

```typescript
// server.ts
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de seguridad
app.use(helmet());

// Middleware para parsear JSON
app.use(express.json());

// Middleware de CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Middleware de logging
app.use(morgan('dev'));

// Ruta de health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Ruta raíz
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'API funcionando correctamente',
    version: '1.0.0',
    endpoints: ['/health', '/api/users', '/api/tasks']
  });
});

// Manejo de errores centralizado
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Manejo de rutas no encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📝 Modo: ${process.env.NODE_ENV || 'development'}`);
});
```

```json
// package.json (scripts)
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "lint": "eslint src --ext .ts"
  }
}
```

```env
# .env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Por qué esto es mejor que empezar de cero:**
- Helmet añade 11 cabeceras de seguridad automáticamente
- Morgan loguea cada petición (útil para debugging)
- CORS evita errores de "blocked by CORS policy"
- El manejo de errores previene que tu servidor crashee
- TypeScript atrapa bugs antes de que ejecutes el código

---

#### **Prompt 2: Crear API de blog completa con CRUD**

```
Crea una API RESTful para un blog con estas funcionalidades:
- Modelo Post con: id, title, content, author, createdAt, updatedAt
- CRUD completo (Create, Read All, Read One, Update, Delete)
- Validación de datos con Zod
- Respuestas consistentes con códigos HTTP apropiados
- Almacenamiento en memoria con TypeScript para empezar
- Tipos TypeScript estrictos para todo
```

**Explicación:**
Claude Code creará una API completa con todas las operaciones de un blog, validación robusta y tipos seguros. Perfecto para aprender CRUD antes de añadir una base de datos real.

**Código generado:**

```typescript
// types/post.ts
import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(5, 'El título debe tener mínimo 5 caracteres').max(200),
  content: z.string().min(20, 'El contenido debe tener mínimo 20 caracteres'),
  author: z.string().min(2, 'El autor debe tener mínimo 2 caracteres')
});

export const updatePostSchema = createPostSchema.partial();

export type CreatePost = z.infer<typeof createPostSchema>;
export type UpdatePost = z.infer<typeof updatePostSchema>;

export interface Post extends CreatePost {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
```

```typescript
// routes/posts.ts
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createPostSchema, updatePostSchema, Post } from '../types/post';

const router = express.Router();

// Almacenamiento en memoria
let posts: Post[] = [];

// CREATE - Crear post
router.post('/', (req: Request, res: Response) => {
  try {
    // Validar datos de entrada
    const result = createPostSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: result.error.errors
      });
    }

    const newPost: Post = {
      id: uuidv4(),
      ...result.data,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    posts.push(newPost);

    res.status(201).json({
      message: 'Post creado exitosamente',
      data: newPost
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el post' });
  }
});

// READ ALL - Obtener todos los posts
router.get('/', (req: Request, res: Response) => {
  try {
    // Ordenar por fecha de creación descendente
    const sortedPosts = [...posts].sort((a, b) =>
      b.createdAt.getTime() - a.createdAt.getTime()
    );

    res.json({
      data: sortedPosts,
      total: sortedPosts.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
});

// READ ONE - Obtener post por ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.json({ data: post });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el post' });
  }
});

// UPDATE - Actualizar post
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const postIndex = posts.findIndex(p => p.id === id);

    if (postIndex === -1) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    // Validar datos
    const result = updatePostSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: result.error.errors
      });
    }

    // Actualizar post
    posts[postIndex] = {
      ...posts[postIndex],
      ...result.data,
      updatedAt: new Date()
    };

    res.json({
      message: 'Post actualizado exitosamente',
      data: posts[postIndex]
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el post' });
  }
});

// DELETE - Eliminar post
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const postIndex = posts.findIndex(p => p.id === id);

    if (postIndex === -1) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    posts.splice(postIndex, 1);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
});

export default router;
```

```typescript
// server.ts (integración)
import postsRouter from './routes/posts';

app.use('/api/posts', postsRouter);
```

**Cómo probar:**
```bash
# Crear post
curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi primer post","content":"Este es el contenido de mi primer post en el blog","author":"Ana García"}'

# Obtener todos los posts
curl http://localhost:3001/api/posts

# Obtener post específico
curl http://localhost:3001/api/posts/[ID]

# Actualizar post
curl -X PUT http://localhost:3001/api/posts/[ID] \
  -H "Content-Type: application/json" \
  -d '{"title":"Post actualizado"}'

# Eliminar post
curl -X DELETE http://localhost:3001/api/posts/[ID]
```

---

#### **Prompt 3: Añadir sistema de comentarios relacionados**

```
Amplía la API de blog añadiendo:
- Modelo Comment con: id, postId, author, content, createdAt
- Rutas para crear comentario en un post específico
- Ruta para obtener todos los comentarios de un post
- Validación de que el post existe antes de crear comentario
- Eliminación en cascada (borrar post también borra sus comentarios)
```

**Explicación:**
Claude Code entenderá la relación entre posts y comentarios y creará una arquitectura consistente con la API existente.

**Código generado:**

```typescript
// types/comment.ts
import { z } from 'zod';

export const createCommentSchema = z.object({
  author: z.string().min(2, 'El autor debe tener mínimo 2 caracteres'),
  content: z.string().min(5, 'El comentario debe tener mínimo 5 caracteres').max(500)
});

export type CreateComment = z.infer<typeof createCommentSchema>;

export interface Comment extends CreateComment {
  id: string;
  postId: string;
  createdAt: Date;
}
```

```typescript
// routes/comments.ts
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createCommentSchema, Comment } from '../types/comment';

const router = express.Router({ mergeParams: true });

// Almacenamiento en memoria
let comments: Comment[] = [];

// Obtener comentarios de un post
router.get('/', (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const postComments = comments.filter(c => c.postId === postId);

    res.json({
      data: postComments,
      total: postComments.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
});

// Crear comentario en un post
router.post('/', (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    // Validar que el post existe (importar posts desde routes/posts.ts)
    // En producción, esto vendría de la base de datos

    const result = createCommentSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: result.error.errors
      });
    }

    const newComment: Comment = {
      id: uuidv4(),
      postId,
      ...result.data,
      createdAt: new Date()
    };

    comments.push(newComment);

    res.status(201).json({
      message: 'Comentario creado exitosamente',
      data: newComment
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el comentario' });
  }
});

// Eliminar comentario
router.delete('/:commentId', (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const commentIndex = comments.findIndex(c => c.id === commentId);

    if (commentIndex === -1) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    comments.splice(commentIndex, 1);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el comentario' });
  }
});

// Función helper para eliminar comentarios de un post
export function deleteCommentsByPostId(postId: string): void {
  comments = comments.filter(c => c.postId !== postId);
}

export default router;
```

```typescript
// server.ts (integración)
import commentsRouter from './routes/comments';

app.use('/api/posts/:postId/comments', commentsRouter);
```

**Ejemplo de uso:**
```bash
# Crear comentario en un post
curl -X POST http://localhost:3001/api/posts/[POST_ID]/comments \
  -H "Content-Type: application/json" \
  -d '{"author":"Luis Pérez","content":"Excelente post, muy informativo"}'

# Obtener comentarios de un post
curl http://localhost:3001/api/posts/[POST_ID]/comments
```

---

### Workflow Completo: API de Blog Profesional con Claude Code

Vamos a ver cómo Claude Code te ayuda a construir una API de blog completa desde cero, paso a paso.

**Objetivo:** Crear una API de blog con posts, comentarios, búsqueda y estadísticas.

**Paso 1: Configuración inicial**

```
Claude Code, inicializa un proyecto backend para una API de blog con:
- TypeScript configurado
- Express con middleware esenciales
- ESLint y Prettier para código limpio
- Estructura de carpetas profesional (src/routes, src/types, src/utils, src/middleware)
- Scripts npm para desarrollo con hot reload
```

Claude creará:

```
blog-api/
├── src/
│   ├── server.ts
│   ├── routes/
│   ├── types/
│   ├── middleware/
│   └── utils/
├── .env
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
└── package.json
```

**Paso 2: Añadir funcionalidad de búsqueda**

```
Añade una ruta GET /api/posts/search que permita:
- Buscar por título (query param: q)
- Filtrar por autor (query param: author)
- Ordenar por fecha o título (query param: sort)
- Búsqueda case-insensitive
- Devolver resultados con paginación (limit y offset)
```

**Código generado:**

```typescript
// routes/posts.ts (nueva ruta)
router.get('/search', (req: Request, res: Response) => {
  try {
    const { q, author, sort = 'date', limit = '10', offset = '0' } = req.query;

    let results = [...posts];

    // Filtrar por búsqueda en título
    if (q && typeof q === 'string') {
      const searchTerm = q.toLowerCase();
      results = results.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm)
      );
    }

    // Filtrar por autor
    if (author && typeof author === 'string') {
      results = results.filter(post =>
        post.author.toLowerCase() === author.toLowerCase()
      );
    }

    // Ordenar
    if (sort === 'date') {
      results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (sort === 'title') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Paginación
    const limitNum = parseInt(limit as string);
    const offsetNum = parseInt(offset as string);
    const paginatedResults = results.slice(offsetNum, offsetNum + limitNum);

    res.json({
      data: paginatedResults,
      total: results.length,
      limit: limitNum,
      offset: offsetNum,
      hasMore: offsetNum + limitNum < results.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en la búsqueda' });
  }
});
```

**Paso 3: Añadir estadísticas**

```
Crea una ruta GET /api/stats que devuelva:
- Total de posts
- Total de comentarios
- Post con más comentarios
- Autores más activos (con conteo de posts)
- Posts recientes (últimos 5)
```

**Código generado:**

```typescript
// routes/stats.ts
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  try {
    // Importar posts y comments desde almacenamiento
    // En producción, estas queries vendrían de la base de datos

    const totalPosts = posts.length;
    const totalComments = comments.length;

    // Post con más comentarios
    const postCommentCounts = posts.map(post => ({
      post,
      commentCount: comments.filter(c => c.postId === post.id).length
    }));

    const mostCommentedPost = postCommentCounts.reduce((max, current) =>
      current.commentCount > max.commentCount ? current : max
    , postCommentCounts[0]);

    // Autores más activos
    const authorCounts = posts.reduce((acc, post) => {
      acc[post.author] = (acc[post.author] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topAuthors = Object.entries(authorCounts)
      .map(([author, count]) => ({ author, postCount: count }))
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 5);

    // Posts recientes
    const recentPosts = [...posts]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5)
      .map(post => ({
        id: post.id,
        title: post.title,
        author: post.author,
        createdAt: post.createdAt
      }));

    res.json({
      summary: {
        totalPosts,
        totalComments,
        averageCommentsPerPost: totalPosts > 0 ? (totalComments / totalPosts).toFixed(2) : 0
      },
      mostCommentedPost: mostCommentedPost ? {
        title: mostCommentedPost.post.title,
        commentCount: mostCommentedPost.commentCount
      } : null,
      topAuthors,
      recentPosts
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

export default router;
```

**Paso 4: Añadir middleware de logging personalizado**

```
Crea un middleware que loguee cada petición con:
- Método HTTP
- Ruta
- Tiempo de respuesta
- Código de estado
- IP del cliente
Formato: [timestamp] METHOD /ruta - STATUS (XXms) from IP
```

**Código generado:**

```typescript
// middleware/logger.ts
import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Capturar el end original de la respuesta
  const originalEnd = res.end;

  // Override del método end
  res.end = function(...args: any[]) {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    const ip = req.ip || req.socket.remoteAddress;

    console.log(
      `[${timestamp}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms) from ${ip}`
    );

    // Llamar al end original
    return originalEnd.apply(res, args);
  };

  next();
};
```

```typescript
// server.ts
import { requestLogger } from './middleware/logger';

app.use(requestLogger);
```

**Resultado completo del workflow:**

Tu API de blog ahora tiene:
1. CRUD completo de posts con validación Zod
2. Sistema de comentarios relacionados
3. Búsqueda avanzada con filtros y paginación
4. Estadísticas en tiempo real
5. Logging personalizado de peticiones
6. Estructura profesional con TypeScript
7. Manejo de errores centralizado
8. Código limpio y bien tipado

**Tiempo de desarrollo:**
- Sin Claude Code: 6-8 horas
- Con Claude Code: 30-45 minutos

---

### Errores Comunes que Claude Code Previene

#### **Error #1: No validar variables de entorno**

❌ **Código problemático:**

```javascript
const PORT = process.env.PORT; // ¿Y si PORT no está definido?
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
```

**Problema:** Si `PORT` no está en `.env`, será `undefined` y tu servidor fallará silenciosamente.

✅ **Con Claude Code:**

```typescript
const PORT = parseInt(process.env.PORT || '3001', 10);

if (isNaN(PORT) || PORT < 1024 || PORT > 65535) {
  throw new Error('PORT debe ser un número válido entre 1024 y 65535');
}

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
```

💡 **Explicación:** Claude valida que el puerto sea un número válido, con valor por defecto y rango apropiado.

---

#### **Error #2: Exponer aplicación a vulnerabilidades CORS**

❌ **Código problemático:**

```javascript
app.use(cors()); // Permite TODAS las origins
```

**Problema:** Cualquier sitio web puede hacer peticiones a tu API, abriendo la puerta a ataques CSRF.

✅ **Con Claude Code:**

```typescript
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.ALLOWED_ORIGINS?.split(',') || []
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

💡 **Explicación:** CORS configurado específicamente: solo origins permitidas, métodos explícitos, headers controlados.

---

#### **Error #3: No manejar errores async correctamente**

❌ **Código problemático:**

```javascript
app.get('/api/users', async (req, res) => {
  const users = await database.getUsers(); // Si falla, crashea el servidor
  res.json(users);
});
```

**Problema:** Si `database.getUsers()` lanza un error, Express no lo captura y el servidor puede crashear.

✅ **Con Claude Code:**

```typescript
// Utility wrapper para rutas async
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/api/users', asyncHandler(async (req: Request, res: Response) => {
  try {
    const users = await database.getUsers();
    res.json({ data: users });
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
}));
```

💡 **Explicación:** El wrapper `asyncHandler` captura errores asíncronos y los pasa al error handler de Express. Try-catch adicional para manejo específico.

---

#### **Error #4: Puerto hardcodeado vs dinámico**

❌ **Código problemático:**

```javascript
app.listen(3001, () => { // Puerto hardcodeado
  console.log('Servidor en puerto 3001');
});
```

**Problema:** En producción (Heroku, Railway, Vercel), el puerto es asignado dinámicamente por la plataforma.

✅ **Con Claude Code:**

```typescript
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📝 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
});

// Manejo graceful de shutdown
process.on('SIGTERM', () => {
  console.log('📴 Señal SIGTERM recibida, cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});
```

💡 **Explicación:** Puerto configurable desde variable de entorno, con shutdown graceful para cerrar conexiones correctamente.

---

### Comparación: Con vs Sin Claude Code

| Aspecto | Sin Claude Code | Con Claude Code |
|---------|----------------|-----------------|
| **Tiempo setup inicial** | 45-60 min configurando TypeScript, ESLint, estructura | 3-5 min con un prompt |
| **Calidad del código** | Depende de tu experiencia, errores comunes | Mejores prácticas desde el inicio |
| **Manejo de errores** | A menudo olvidado o incompleto | Manejo robusto en todas las rutas |
| **Validación de datos** | Manual y propensa a bugs | Zod integrado automáticamente |
| **Seguridad** | CORS abierto, sin helmet, variables sin validar | Helmet, CORS restrictivo, validación de env |
| **TypeScript** | Tipos básicos, muchos `any` | Tipos estrictos, interfaces completas |
| **Estructura** | A menudo monolítica (todo en server.js) | Modular: routes, types, middleware separados |
| **Logging** | `console.log` básico | Morgan + logger personalizado |
| **Documentación** | Comentarios mínimos | Código auto-documentado con tipos |
| **Testing** | Difícil de testear código acoplado | Estructura testeable desde el inicio |
| **Deployment** | Configuración manual de entornos | Variables de entorno bien estructuradas |
| **Aprendizaje** | Aprende de tutoriales fragmentados | Aprende viendo código profesional completo |

---

### Mejores Prácticas con Claude Code para Backend

1. **Sé específico con la arquitectura deseada**
   - ❌ "Crea un servidor Express"
   - ✅ "Crea un servidor Express con TypeScript, arquitectura en capas (routes, controllers, services), validación Zod, y middleware de autenticación JWT"

2. **Pide explicaciones de decisiones técnicas**
   - Después de generar código: "Explica por qué usaste helmet y qué protecciones específicas añade"
   - Claude te dará contexto educativo que refuerza tu aprendizaje

3. **Solicita validación de seguridad**
   - "Revisa este código y señala vulnerabilidades potenciales"
   - Claude identificará: inyecciones SQL, XSS, CSRF, exposición de datos sensibles

4. **Aprovecha para refactorizar**
   - "Refactoriza esta función para que sea más testeable y siga principios SOLID"
   - Claude separará responsabilidades y mejorará la arquitectura

5. **Genera tests mientras desarrollas**
   - "Crea tests unitarios con Vitest para esta ruta, cubriendo casos de éxito y error"
   - Tendrás tests desde el inicio, no como deuda técnica

6. **Pide optimizaciones específicas**
   - "Optimiza esta query para reducir el tiempo de respuesta"
   - "Añade caché en memoria para esta ruta que se consulta frecuentemente"

7. **Aprende patrones profesionales**
   - "Implementa el patrón Repository para abstraer el acceso a datos"
   - "Añade un service layer entre routes y database"
   - Claude te enseñará arquitecturas escalables

---

## Práctica guiada: Servidor de información personal

Vamos a crear un servidor que tenga rutas para compartir información tuya: tu nombre, tus hobbies y tu canción favorita.

### Paso 1 de 3: Configurar el proyecto

**Lo que harás**:
1. Crea una carpeta llamada `servidor-personal`
2. Entra a la carpeta: `cd servidor-personal`
3. Inicializa el proyecto: `npm init -y`
4. Instala Express: `npm install express`
5. Crea un archivo llamado `server.js`

**Tu archivo `server.js` debería empezar así**:

```javascript
const express = require('express');
const app = express();
const PORT = 3001;

// Aquí irán tus rutas

app.listen(PORT, () => {
  console.log(`Mi servidor personal corriendo en http://localhost:${PORT}`);
});
```

**Explicación**:
- **Líneas 1-3**: Importa Express, crea la app y define el puerto
- **Línea 5**: Comentario donde añadiremos las rutas
- **Líneas 7-9**: Arranca el servidor

**Checkpoint**: Ejecuta `node server.js`. Deberías ver el mensaje "Mi servidor personal corriendo en...". Si ves esto, ¡vas bien!

### Paso 2 de 3: Añadir rutas de información

**Lo que harás**:
Añade 3 rutas diferentes antes del `app.listen()`.

**Tu código completo debería verse así**:

```javascript
const express = require('express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Bienvenido a mi servidor personal. Visita /nombre, /hobbies o /cancion');
});

app.get('/nombre', (req, res) => {
  res.json({ nombre: 'Tu Nombre Aquí', edad: 25, ciudad: 'Tu Ciudad' });
});

app.get('/hobbies', (req, res) => {
  res.json({ hobbies: ['Programar', 'Leer', 'Viajar'] });
});

app.get('/cancion', (req, res) => {
  res.json({
    titulo: 'Tu Canción Favorita',
    artista: 'Nombre del Artista',
    año: 2023
  });
});

app.listen(PORT, () => {
  console.log(`Mi servidor personal corriendo en http://localhost:${PORT}`);
});
```

**Explicación**:
- **Líneas 5-7**: Ruta raíz que da instrucciones al usuario
- **Líneas 9-11**: Ruta `/nombre` que devuelve un objeto JSON con tu información
- **Líneas 13-15**: Ruta `/hobbies` que devuelve un array de hobbies en JSON
- **Líneas 17-23**: Ruta `/cancion` que devuelve un objeto con información de una canción

**Checkpoint**: Ejecuta `node server.js` y prueba cada ruta:
- `http://localhost:3001/` → Mensaje de bienvenida
- `http://localhost:3001/nombre` → Tu información personal en JSON
- `http://localhost:3001/hobbies` → Lista de hobbies
- `http://localhost:3001/cancion` → Información de la canción

### Paso 3 de 3: Personalizar con tus datos

**Lo que harás**:
1. Cambia `'Tu Nombre Aquí'` por tu nombre real
2. Cambia la edad y ciudad por tus datos
3. Cambia los hobbies por 3 hobbies reales tuyos
4. Cambia la canción por tu canción favorita real

**Checkpoint final**: Cuando visites cada ruta, deberías ver TUS datos personalizados en formato JSON.

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: "Cannot GET /"

**Te pasa cuando**: Visitas una ruta que no existe en tu servidor

**El mensaje de error que ves**:
```
Cannot GET /ruta-inexistente
```

**Por qué pasa**: Tu servidor solo responde a las rutas que definiste con `app.get()`. Si pides una ruta diferente, no sabe qué hacer.

**Cómo se soluciona**:
1. Verifica que escribiste la URL correctamente (sin errores de escritura)
2. Asegúrate de que la ruta esté definida en tu código antes de `app.listen()`
3. Reinicia el servidor después de añadir nuevas rutas (Ctrl+C y luego `node server.js` de nuevo)

### Error #2: "Port 3001 is already in use"

**Te pasa cuando**: Intentas arrancar el servidor pero el puerto 3001 ya está ocupado

**El mensaje de error que ves**:
```
Error: listen EADDRINUSE: address already in use :::3001
```

**Por qué pasa**: Ya tienes otro servidor corriendo en el puerto 3001 (quizás olvidaste cerrar el anterior).

**Cómo se soluciona**:
1. **Opción 1**: Cierra el servidor anterior (busca la terminal donde está corriendo y presiona Ctrl+C)
2. **Opción 2**: Cambia el puerto en tu código (usa 3002, 3003, etc.):
   ```javascript
   const PORT = 3002; // Cambia el número
   ```

### Error #3: "Cannot find module 'express'"

**Te pasa cuando**: Intentas ejecutar el servidor pero Express no está instalado

**El mensaje de error que ves**:
```
Error: Cannot find module 'express'
```

**Por qué pasa**: Olvidaste ejecutar `npm install express` en la carpeta del proyecto.

**Cómo se soluciona**:
1. Asegúrate de estar en la carpeta correcta del proyecto (usa `pwd` en Mac/Linux o `cd` en Windows para verificar)
2. Ejecuta: `npm install express`
3. Verifica que se creó una carpeta `node_modules` y un archivo `package.json`
4. Intenta ejecutar el servidor de nuevo: `node server.js`

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: El backend puede parecer abstracto al principio porque no ves una interfaz visual como en React. Mi recomendación es que siempre pruebes cada ruta inmediatamente después de crearla usando tu navegador o Thunder Client. Ver la respuesta te ayuda a entender que tu código realmente funciona.

> **Otro tip importante**: Usa `console.log()` generosamente dentro de tus rutas para ver qué está pasando. Por ejemplo:
> ```javascript
> app.get('/test', (req, res) => {
>   console.log('Alguien visitó la ruta /test');
>   res.send('Hola');
> });
> ```
> Cada vez que visites esa ruta, verás el mensaje en la terminal.

> **Herramientas útiles**: Instala la extensión **Thunder Client** en VS Code. Es como Postman pero integrado en tu editor. Te permite probar tus rutas API sin salir de VS Code. Busca "Thunder Client" en las extensiones de VS Code e instálala.

---

## Tu turno: Ejercicio guiado

**Objetivo simple**: Crear un servidor de información de películas con 3 rutas diferentes que devuelvan JSON

**Tiempo**: 20-30 minutos

**Lo que necesitas antes de empezar**:
- [ ] Node.js instalado (verifica con `node --version` en la terminal)
- [ ] Editor de código (VS Code recomendado)
- [ ] Thunder Client instalado en VS Code (opcional pero recomendado)

### Instrucciones paso a paso

**Parte 1: Configuración inicial** (5 min)

1. Crea una carpeta llamada `servidor-peliculas` en tu escritorio o carpeta de proyectos
2. Abre la terminal y navega a esa carpeta: `cd ruta/a/servidor-peliculas`
3. Ejecuta: `npm init -y`
4. Ejecuta: `npm install express`
5. Crea un archivo `server.js` en esa carpeta

**Parte 2: Crear el servidor base** (5 min)

1. En `server.js`, escribe el código base:
   - Importa Express
   - Crea la aplicación
   - Define el puerto 3001
   - Añade la ruta raíz `/` que envíe un mensaje de bienvenida
   - Arranca el servidor con `app.listen()`

2. Prueba que funciona:
   - Ejecuta: `node server.js`
   - Visita: `http://localhost:3001`
   - Deberías ver tu mensaje de bienvenida

**Parte 3: Añadir rutas de películas** (10-15 min)

1. Crea una ruta `GET /api/pelicula-favorita` que devuelva JSON con:
   - `titulo`: El título de tu película favorita
   - `director`: El nombre del director
   - `año`: El año de estreno
   - `genero`: El género de la película

2. Crea una ruta `GET /api/actores` que devuelva JSON con:
   - `actores`: Un array con los nombres de 3 actores que te gusten

3. Crea una ruta `GET /api/proximas` que devuelva JSON con:
   - `peliculas`: Un array de 2 objetos, cada uno con `titulo` y `estreno` de películas que quieras ver

**Parte 4: Probar todo** (5 min)

1. Reinicia tu servidor (Ctrl+C y luego `node server.js`)
2. Prueba cada ruta en tu navegador o Thunder Client
3. Verifica que cada ruta devuelve el JSON esperado

**Criterio de éxito**:
- [ ] El servidor arranca sin errores en el puerto 3001
- [ ] La ruta `/api/pelicula-favorita` devuelve un objeto JSON con la información correcta
- [ ] La ruta `/api/actores` devuelve un array de 3 nombres de actores
- [ ] La ruta `/api/proximas` devuelve un array de 2 objetos con películas próximas
- [ ] Todas las respuestas están en formato JSON válido (se ven estructuradas en el navegador)

**Ejemplo de cómo debería verse una respuesta**:

Cuando visites `http://localhost:3001/api/pelicula-favorita`, deberías ver algo así:
```json
{
  "titulo": "Inception",
  "director": "Christopher Nolan",
  "año": 2010,
  "genero": "Ciencia ficción"
}
```

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Qué es el backend y Node.js**: El backend es la "cocina" de tu aplicación donde se procesa la lógica y se almacenan datos. Node.js te permite usar JavaScript para crear servidores.

2. **Cómo crear un servidor con Express**: Express es un framework que simplifica la creación de servidores. Con pocas líneas de código puedes tener un servidor funcionando que escucha peticiones.

3. **Cómo crear rutas API que devuelven JSON**: Las rutas son como direcciones en tu servidor. Puedes crear múltiples rutas con `app.get()` y devolver datos estructurados en formato JSON con `res.json()`.

---

## Siguiente paso

En la próxima lección: **Base de datos con Prisma ORM**. Aprenderás a guardar datos de forma permanente en una base de datos. Ya no tendrás que escribir los datos a mano en tu código, podrás crear, leer, actualizar y eliminar información que persiste incluso cuando apagas el servidor. ¡Es como pasar de tener notas en papelitos a tener un archivo Excel súper organizado!

---

**¿Dudas?** Es completamente normal sentirse un poco perdido al principio con el backend. A diferencia de React donde ves inmediatamente los resultados en la pantalla, aquí trabajas con cosas "invisibles" (servidores, peticiones, respuestas). Tómate tu tiempo, prueba cada ejemplo y no tengas miedo de experimentar. ¡Romper cosas y arreglarlas es la mejor manera de aprender! Si un error aparece, léelo con calma: los mensajes de error casi siempre te dicen exactamente qué está mal y en qué línea.
