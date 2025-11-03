<p><strong><em>Protegiendo tu API: autenticación y autorización con JWT</em></strong></p>

## Introducción: De APIs abiertas a APIs seguras

Hasta ahora has creado un servidor que responde a peticiones y una base de datos que guarda información. Pero hay un problema gigante: ¡cualquier persona puede acceder a todo! Imagina que creas una app de tareas personales y cualquier extraño puede ver, crear o eliminar TUS tareas privadas. O peor aún, imagina que alguien puede borrar todos los datos de tu base de datos con una simple petición.

Piensa en un evento con conciertos: sin pulseras de identificación, cualquiera podría entrar a cualquier área (backstage, VIP, zonas restringidas). Las pulseras te identifican y determinan a qué áreas puedes acceder.

Hoy aprenderás a implementar **autenticación** (verificar quién eres) y **autorización** (verificar qué puedes hacer) usando tokens JWT. Al final de esta lección, tu API tendrá un sistema de registro, login y rutas protegidas que solo usuarios autenticados pueden usar.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Entender autenticación vs autorización**: Distinguir entre verificar identidad (autenticación) y verificar permisos (autorización)
2. **Implementar registro y login con JWT**: Crear rutas para que usuarios se registren, hagan login y reciban un token de acceso
3. **Proteger rutas con middleware**: Crear un "guardia de seguridad" que verifica el token antes de permitir acceso a ciertas rutas

---

## ¿Por qué necesitas autenticación en tu API?

Imagina un evento musical con diferentes áreas:

- **Área general** (acceso público): Cualquiera puede entrar sin pulsera
- **Área VIP** (acceso restringido): Solo con pulsera VIP
- **Backstage** (acceso ultra restringido): Solo con pulsera de staff

**Autenticación** es el proceso de **darte una pulsera** cuando demuestras quién eres (mostrando tu entrada/DNI).

**Autorización** es cuando el **guardia verifica tu pulsera** antes de dejarte pasar a cada área.

En tu API:
- **Rutas públicas**: Cualquiera puede acceder (ej: ver productos en una tienda online)
- **Rutas autenticadas**: Solo usuarios con cuenta (ej: ver tu perfil, tus pedidos)
- **Rutas autorizadas**: Solo usuarios con roles especiales (ej: panel de administrador)

Sin autenticación, tu API es como un edificio sin puertas: cualquiera entra y hace lo que quiere.

### 📊 Un dato interesante

El 81% de las brechas de seguridad en aplicaciones web ocurren por credenciales débiles o robadas. Implementar autenticación correcta no es opcional, es fundamental. Empresas pierden millones por no proteger adecuadamente sus APIs.

---

## Concepto 1: ¿Qué es un token JWT?

**JWT** significa "JSON Web Token". Es un código largo y encriptado que funciona como una pulsera digital de identificación.

**Analogía de la pulsera de evento**:

Cuando entras a un festival de música:
1. Muestras tu entrada en la puerta (login con email y password)
2. Te dan una **pulsera** con un código único (el token JWT)
3. Cada vez que quieres entrar a una zona, el guardia **verifica tu pulsera** (el servidor verifica el token)
4. Si la pulsera es válida, pasas; si no, te rechazan

**Un token JWT se ve así** (es un texto largo):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYW5hQGVtYWlsLmNvbSJ9.Kl3tZd_xN2F5qK8wR7yH3mP9nL2sA4vB
```

Aunque parezca un galimatías, tiene tres partes separadas por puntos:
1. **Header** (cabecera): Tipo de token y algoritmo de encriptación
2. **Payload** (carga útil): Los datos del usuario (id, email, rol, etc.)
3. **Signature** (firma): Una firma secreta que verifica que el token no fue modificado

**¿Por qué es seguro?**
- Solo tu servidor conoce la "clave secreta" para crear tokens válidos
- Si alguien intenta modificar el token, la firma no coincidirá y será rechazado
- Los tokens pueden expirar después de cierto tiempo (ej: 7 días)

---

## Concepto 2: Hashear passwords (nunca guardes passwords en texto plano)

Antes de crear usuarios, necesitas entender algo crítico: **nunca, NUNCA guardes passwords en texto plano** en la base de datos.

**Analogía del batido**:
Imagina que metes una fresa, plátano y leche en una licuadora. Sale un batido. Puedes tomar el batido, pero **no puedes separarlo de nuevo** en fresa, plátano y leche. Eso es "hashear": convertir algo en otra cosa de forma irreversible.

**Hashear un password** es como licuarlo: la password "MiPassword123" se convierte en algo como:
```
$2b$10$KZnX3V2.kF8jL9mP4qR2sO3tH6yJ8wE9nL5mA7vB2cD1fG3hI4jK
```

Si un hacker roba tu base de datos, solo ve el "batido" (el hash), no puede obtener la password original.

Usaremos una librería llamada **bcrypt** que hace esto automáticamente.

---

## Concepto 3: Crear el sistema de registro (signup)

Vamos a crear una ruta donde usuarios nuevos puedan registrarse.

### Ejemplo: Ruta de registro

**Lo que vamos a crear**: Una ruta `/api/auth/signup` que recibe email y password, hashea el password y guarda el usuario.

**Primero, instala las dependencias necesarias**:

```bash
npm install bcryptjs jsonwebtoken dotenv
```

**Explicación de las librerías**:
- `bcryptjs`: Para hashear passwords
- `jsonwebtoken`: Para crear y verificar tokens JWT
- `dotenv`: Para guardar secretos (como la clave JWT) en variables de entorno

**Configura las variables de entorno**:

Crea un archivo `.env` en la raíz del proyecto:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="mi-super-secreto-cambia-esto-en-produccion"
```

**Crea el modelo User en Prisma**:

Abre `prisma/schema.prisma` y añade:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
}
```

Ejecuta la migración:
```bash
npx prisma migrate dev --name add-users
```

**Código de la ruta de registro** (`server.js`):

```javascript
require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(express.json());

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hashear el password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    });

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

**Explicación línea por línea**:
- **Línea 1** (`require('dotenv').config();`): Carga las variables del archivo `.env`
- **Líneas 2-5**: Imports necesarios (Prisma, bcrypt, JWT)
- **Líneas 13-15** (`const { email, password, name } = req.body;`): Extrae los datos del body
- **Líneas 18-20**: Busca si ya existe un usuario con ese email
- **Líneas 22-24**: Si existe, devuelve error 400 (Bad Request)
- **Línea 27** (`await bcrypt.hash(password, 10);`): Hashea el password
  - `password`: El password en texto plano
  - `10`: El "costo" del hash (más alto = más seguro pero más lento)
- **Líneas 30-35**: Crea el usuario con el password hasheado
- **Líneas 37-44**: Devuelve el usuario creado (¡sin incluir el password!)

**Cómo probarlo**:

Usa Thunder Client para hacer POST a `/api/auth/signup`:
```json
{
  "email": "ana@email.com",
  "password": "MiPassword123",
  "name": "Ana García"
}
```

**Resultado esperado**:
```json
{
  "message": "Usuario creado exitosamente",
  "user": {
    "id": 1,
    "email": "ana@email.com",
    "name": "Ana García"
  }
}
```

Si abres Prisma Studio, verás el usuario con el password hasheado (no el original).

---

## Concepto 4: Crear el sistema de login (signin)

Ahora que los usuarios pueden registrarse, necesitan poder hacer login y recibir su "pulsera" (token JWT).

### Ejemplo: Ruta de login

**Lo que vamos a crear**: Una ruta `/api/auth/login` que verifica email y password, y devuelve un token JWT.

**Añade esta ruta a tu `server.js`**:

```javascript
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar el password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Crear el token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al hacer login' });
  }
});
```

**Explicación línea por línea**:
- **Líneas 1-3**: Define la ruta POST `/api/auth/login`
- **Líneas 6-8**: Busca el usuario por email
- **Líneas 10-12**: Si no existe, devuelve error 401 (Unauthorized)
- **Línea 15** (`await bcrypt.compare(password, user.password);`): Compara el password ingresado con el hash guardado
  - `bcrypt.compare()` es la única forma de verificar un password hasheado
  - Devuelve `true` si coinciden, `false` si no
- **Líneas 17-19**: Si el password no coincide, error 401
- **Líneas 22-26** (`jwt.sign(...)`): Crea el token JWT
  - Primer parámetro: Los datos que quieres incluir en el token (payload)
  - Segundo parámetro: La clave secreta (de `.env`)
  - Tercer parámetro: Opciones (aquí, expira en 7 días)
- **Líneas 28-37**: Devuelve el token y los datos del usuario

**Cómo probarlo**:

Usa Thunder Client para hacer POST a `/api/auth/login`:
```json
{
  "email": "ana@email.com",
  "password": "MiPassword123"
}
```

**Resultado esperado**:
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "ana@email.com",
    "name": "Ana García"
  }
}
```

¡Guarda ese token! Lo necesitarás para acceder a rutas protegidas.

---

## Concepto 5: Proteger rutas con middleware de autenticación

Ahora viene la parte importante: crear un "guardia" que verifique el token antes de permitir acceso a ciertas rutas.

### Ejemplo: Middleware de autenticación

**Lo que vamos a crear**: Un middleware que verifica el token JWT y permite o rechaza el acceso.

**Crea este middleware antes de tus rutas**:

```javascript
// Middleware de autenticación
const authMiddleware = async (req, res, next) => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    // El formato es "Bearer TOKEN", extraemos solo el token
    const token = authHeader.split(' ')[1];

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Añadir los datos del usuario al request
    req.user = decoded;

    next(); // Continúa a la siguiente función (la ruta)
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
```

**Explicación línea por línea**:
- **Línea 2** (`const authMiddleware = async (req, res, next) => {`): Define un middleware
  - `next`: Función que llama para pasar al siguiente middleware o ruta
- **Línea 5** (`req.headers.authorization`): Obtiene el header Authorization de la petición
- **Líneas 7-9**: Si no hay token, rechaza con error 401
- **Línea 12** (`authHeader.split(' ')[1]`): Extrae el token
  - El cliente envía: `"Bearer eyJhbGc..."`
  - Hacemos split por espacio: `["Bearer", "eyJhbGc..."]`
  - Tomamos el segundo elemento `[1]`: `"eyJhbGc..."`
- **Línea 15** (`jwt.verify(token, process.env.JWT_SECRET)`): Verifica que el token sea válido
  - Si es válido, devuelve los datos (payload)
  - Si es inválido o expiró, lanza un error
- **Línea 18** (`req.user = decoded`): Guarda los datos del usuario en `req` para usar en la ruta
- **Línea 20** (`next()`): Permite que la petición continúe a la ruta

**Ahora crea una ruta protegida**:

```javascript
// Ruta protegida - solo usuarios autenticados
app.get('/api/profile', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }
    });

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
});
```

**Explicación**:
- **Línea 2** (`app.get('/api/profile', authMiddleware, ...)`): La ruta usa el middleware
  - Express ejecuta `authMiddleware` primero
  - Si el middleware llama `next()`, entonces ejecuta la función de la ruta
  - Si el middleware devuelve un error, la ruta nunca se ejecuta
- **Línea 4-5**: Accede a `req.user.userId` (que el middleware añadió)

**Cómo probarlo**:

1. Primero, haz login y copia el token que recibes
2. En Thunder Client, haz GET a `/api/profile`
3. En la pestaña "Headers", añade:
   - **Key**: `Authorization`
   - **Value**: `Bearer TU_TOKEN_AQUI` (reemplaza con tu token real)
4. Deberías recibir tu perfil de usuario

**Si NO envías el token o es inválido**:
```json
{
  "error": "Token no proporcionado"
}
```

**Si envías un token válido**:
```json
{
  "id": 1,
  "email": "ana@email.com",
  "name": "Ana García",
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```

---

## Práctica guiada: Sistema de autenticación completo

Vamos a crear un sistema completo con registro, login y rutas protegidas.

### Paso 1 de 3: Configurar el proyecto

**Lo que harás**:

1. Crea un proyecto nuevo:
   ```bash
   mkdir api-auth
   cd api-auth
   npm init -y
   ```

2. Instala las dependencias:
   ```bash
   npm install express
   npm install prisma --save-dev
   npm install @prisma/client bcryptjs jsonwebtoken dotenv
   ```

3. Inicializa Prisma:
   ```bash
   npx prisma init --datasource-provider sqlite
   ```

4. Crea el archivo `.env` con:
   ```
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="tu-clave-secreta-super-segura-cambiala"
   ```

**Checkpoint**: Verifica que tienes la carpeta `prisma/` y el archivo `.env`.

### Paso 2 de 3: Crear el modelo y migraciones

**Lo que harás**:

1. Abre `prisma/schema.prisma` y añade el modelo User:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
}
```

2. Ejecuta la migración:
   ```bash
   npx prisma migrate dev --name create-users
   ```

**Explicación del modelo**:
- `email String @unique`: El email debe ser único (no puede haber dos usuarios con el mismo email)
- `password String`: El password hasheado
- `name String?`: Nombre opcional (el `?` significa que puede ser null)

**Checkpoint**: Ejecuta `npx prisma studio` y verifica que existe la tabla "User" vacía.

### Paso 3 de 3: Crear el servidor completo

**Lo que harás**:

Crea un archivo `server.js` con el código completo:

```javascript
require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(express.json());

// Middleware de autenticación
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

// Ruta de registro
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    });

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

// Ruta de login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al hacer login' });
  }
});

// Ruta protegida - perfil del usuario
app.get('/api/profile', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }
    });

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
});

// Ruta pública - no requiere autenticación
app.get('/api/public', (req, res) => {
  res.json({ message: 'Esta ruta es pública, cualquiera puede acceder' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

**Checkpoint final**:

1. Inicia el servidor: `node server.js`

2. **Prueba el registro** (POST `/api/auth/signup`):
   ```json
   {
     "email": "test@email.com",
     "password": "Password123",
     "name": "Usuario Test"
   }
   ```

3. **Prueba el login** (POST `/api/auth/login`):
   ```json
   {
     "email": "test@email.com",
     "password": "Password123"
   }
   ```
   Copia el `token` de la respuesta.

4. **Prueba la ruta protegida** (GET `/api/profile`):
   - Añade el header: `Authorization: Bearer TU_TOKEN`
   - Deberías ver tu perfil

5. **Prueba la ruta pública** (GET `/api/public`):
   - No necesitas token
   - Cualquiera puede acceder

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: "Token no proporcionado"

**Te pasa cuando**: Intentas acceder a una ruta protegida sin enviar el token

**El mensaje de error que ves**:
```json
{
  "error": "Token no proporcionado"
}
```

**Por qué pasa**: Olvidaste añadir el header `Authorization` en tu petición.

**Cómo se soluciona**:
1. En Thunder Client, ve a la pestaña "Headers"
2. Añade un nuevo header:
   - **Key**: `Authorization`
   - **Value**: `Bearer tu_token_aqui` (con espacio después de Bearer)
3. Asegúrate de que el token esté pegado correctamente sin espacios extra

### Error #2: "jwt malformed" o "Token inválido"

**Te pasa cuando**: El token que envías está corrupto o mal formado

**El mensaje de error que ves**:
```json
{
  "error": "Token inválido o expirado"
}
```

**Por qué pasa**: El token está mal copiado, le faltan caracteres o tiene espacios extra.

**Cómo se soluciona**:
1. Verifica que copiaste el token completo (son muy largos, fácil cortar caracteres)
2. Asegúrate de no tener espacios antes o después del token
3. Si el problema persiste, haz login de nuevo para obtener un token nuevo

### Error #3: "El email ya está registrado"

**Te pasa cuando**: Intentas registrar un email que ya existe en la base de datos

**El mensaje de error que ves**:
```json
{
  "error": "El email ya está registrado"
}
```

**Por qué pasa**: Ya existe un usuario con ese email (recuerda que el campo `email` es `@unique`).

**Cómo se soluciona**:
1. Usa un email diferente para registrar un nuevo usuario
2. O haz login con las credenciales existentes
3. Si estás probando, puedes eliminar la base de datos y empezar de cero:
   ```bash
   rm prisma/dev.db
   npx prisma migrate dev
   ```

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: El concepto de tokens puede ser confuso al principio. Piensa en ello como un pase de eventos: cuando haces login (muestras tu entrada), te dan un pase (token). Cada vez que quieres acceder a algo, muestras tu pase. El guardia (middleware) verifica que sea válido y te deja pasar. Cuando expira (después de 7 días en nuestro caso), necesitas un pase nuevo (hacer login de nuevo).

> **Otro tip importante**: NUNCA compartas tu `JWT_SECRET` en el código. Siempre debe estar en el archivo `.env`, y ese archivo NUNCA debe subirse a GitHub (añádelo al `.gitignore`). Si alguien obtiene tu secret, puede crear tokens falsos y hacerse pasar por cualquier usuario.

> **Herramientas útiles**: Usa la página [jwt.io](https://jwt.io) para "decodificar" tus tokens y ver qué datos contienen. Pega tu token ahí y verás el payload (userId, email, etc.). Esto es útil para entender qué información estás incluyendo en el token.

---

## Tu turno: Ejercicio guiado

**Objetivo simple**: Crear un sistema de autenticación para una app de notas privadas donde solo usuarios autenticados pueden crear y ver sus propias notas

**Tiempo**: 40-50 minutos

**Lo que necesitas antes de empezar**:
- [ ] Node.js instalado
- [ ] Editor de código (VS Code)
- [ ] Thunder Client o Postman instalado

### Instrucciones paso a paso

**Parte 1: Configuración** (10 min)

1. Crea el proyecto:
   ```bash
   mkdir app-notas-privadas
   cd app-notas-privadas
   npm init -y
   ```

2. Instala dependencias:
   ```bash
   npm install express
   npm install prisma --save-dev
   npm install @prisma/client bcryptjs jsonwebtoken dotenv
   ```

3. Inicializa Prisma:
   ```bash
   npx prisma init --datasource-provider sqlite
   ```

4. Crea `.env` con:
   ```
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="mi-secreto-de-notas-privadas-2024"
   ```

**Parte 2: Modelos de datos** (10 min)

1. Abre `prisma/schema.prisma` y añade dos modelos:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  notes     Note[]
  createdAt DateTime @default(now())
}

model Note {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}
```

2. Ejecuta la migración:
   ```bash
   npx prisma migrate dev --name init
   ```

**Explicación de la relación**:
- `notes Note[]` en User: Un usuario puede tener muchas notas
- `userId Int` en Note: Cada nota pertenece a un usuario (guarda el id del usuario)
- `user User @relation(...)`: Define la relación (clave foránea)

**Parte 3: Implementar autenticación** (15 min)

1. Crea `server.js` con:
   - Imports y configuración
   - Middleware de autenticación
   - Ruta POST `/api/auth/signup`
   - Ruta POST `/api/auth/login`

(Usa el código de los ejemplos anteriores)

**Parte 4: Rutas de notas protegidas** (15 min)

1. Añade estas rutas al servidor:

```javascript
// Crear nota (solo usuarios autenticados)
app.post('/api/notes', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId: req.user.userId
      }
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la nota' });
  }
});

// Obtener MIS notas (solo las del usuario autenticado)
app.get('/api/notes', authMiddleware, async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las notas' });
  }
});
```

**Parte 5: Probar el sistema completo** (10 min)

1. Registra dos usuarios diferentes
2. Haz login con el primer usuario y guarda su token
3. Crea 2 notas con ese usuario (usando su token)
4. Haz login con el segundo usuario y guarda su token
5. Crea 1 nota con el segundo usuario
6. Obtén las notas del primer usuario (GET `/api/notes` con su token)
7. Obtén las notas del segundo usuario (GET `/api/notes` con su token)

**Criterio de éxito**:
- [ ] Puedes registrar usuarios nuevos
- [ ] Puedes hacer login y recibir un token
- [ ] Puedes crear notas solo si estás autenticado
- [ ] Cada usuario solo ve SUS propias notas, no las de otros
- [ ] Si intentas acceder sin token, recibes error 401
- [ ] Si intentas acceder con token expirado/inválido, recibes error 401

**Resultado esperado**:

Usuario 1 crea notas → Solo ve sus notas
Usuario 2 crea notas → Solo ve sus notas

Ningún usuario puede ver las notas de otros. ¡Sistema de privacidad funcionando!

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Autenticación vs autorización**: Autenticación es verificar quién eres (login), autorización es verificar qué puedes hacer. Los tokens JWT funcionan como pulseras de identificación digital.

2. **Hashear passwords con bcrypt**: Nunca guardes passwords en texto plano. Bcrypt convierte passwords en hashes irreversibles que son seguros incluso si roban tu base de datos. Usas `bcrypt.hash()` al registrar y `bcrypt.compare()` al hacer login.

3. **Proteger rutas con middleware**: Un middleware es como un guardia que verifica el token JWT antes de permitir acceso. Si el token es válido, añade los datos del usuario a `req.user` y llama `next()`. Si no, rechaza con error 401.

---

## Siguiente paso

En la próxima lección: **API RESTful: mejores prácticas**. Aprenderás a estructurar tus APIs de forma profesional siguiendo el estándar REST. Verás cómo organizar tus rutas, usar los métodos HTTP correctos (GET, POST, PUT, DELETE), devolver códigos de estado apropiados y crear una API que cualquier desarrollador pueda entender y usar fácilmente. ¡Tu backend empezará a verse como una API profesional de empresas reales!

---

**¿Dudas?** La autenticación es uno de los temas más confusos para principiantes porque involucra muchos conceptos nuevos a la vez (hashing, tokens, middleware, headers HTTP). No te preocupes si necesitas releer esta lección varias veces. Lo importante es entender el flujo: 1) Registro → hasheo password, 2) Login → verifico password y doy token, 3) Acceso a ruta protegida → verifico token. Todo lo demás son detalles de implementación que irás dominando con la práctica.
