<p><strong><em>Lección 4: Seguridad con Claude Code</em></strong></p>

## Introducción

¡Bienvenido a una de las lecciones MÁS importantes del curso! Hoy vamos a hablar de **seguridad en el desarrollo de aplicaciones**. Y no, no es un tema aburrido lleno de reglas. Es súper práctico y esencial para que no pierdas tu trabajo (o peor, termines en las noticias por filtrar datos de clientes).

La seguridad puede parecer intimidante. Hay mil cosas que recordar, mil formas de meter la pata. Pero aquí viene la buena noticia: **Claude Code puede ser tu asesor de seguridad personal**. Puede revisar tu código, detectar vulnerabilidades, sugerir mejoras y explicarte POR QUÉ algo es inseguro, no solo decirte "está mal".

Imagina tener un experto en seguridad mirando por encima de tu hombro, pero sin juzgarte, con paciencia infinita, disponible 24/7, y explicándote todo en español sencillo. Eso es Claude Code para seguridad. Al final de esta lección, sabrás cómo construir aplicaciones seguras y, lo más importante, **cómo pedirle ayuda a Claude Code cuando no estés seguro de si algo es seguro**. ¡Vamos allá!

## ¿Qué es Seguridad en Desarrollo? (Explicación Simple)

Imagina que estás construyendo una casa. La seguridad sería:
- Poner cerraduras en las puertas (autenticación)
- No dejar las llaves debajo del tapete (no hardcodear secretos)
- Instalar alarmas (logging y monitoring)
- No dejar ventanas abiertas (cerrar vulnerabilidades)

En desarrollo de software, **seguridad** significa proteger:
1. **Datos de usuarios**: Contraseñas, información personal, datos bancarios
2. **Tus credenciales**: API keys, tokens, contraseñas de bases de datos
3. **La aplicación misma**: Que nadie pueda hackearla o romperla

### Los Errores de Seguridad Más Comunes (que vamos a evitar)

Claude Code te va a ayudar a NO cometer estos errores:

❌ **Hardcodear secretos en el código**
```javascript
const API_KEY = "sk-1234567890abcdef"; // MAL
```

❌ **No validar input del usuario**
```javascript
const query = `SELECT * FROM users WHERE id = ${userId}`; // SQL Injection
```

❌ **Exponer información sensible en mensajes de error**
```javascript
console.log("Error: Invalid password for user john@email.com"); // MAL
```

❌ **No usar HTTPS**
```javascript
http://mi-app.com/login // Sin cifrado
```

❌ **Subir credenciales a GitHub**
```javascript
// .env subido a Git - ¡Todos pueden ver tus secretos!
```

No te preocupes si algunos de estos no tienen sentido todavía. Claude Code te va a explicar cada uno con ejemplos.

## Cómo Claude Code te Ayuda con Seguridad

### Tu Primera Conversación con Claude Code sobre Seguridad

Vamos a empezar con algo super práctico. Abre Claude Code y pregúntale:

**Tú escribes en Claude Code**:
```
Claude, estoy desarrollando una aplicación web con Node.js y Express.
Nunca me han enseñado sobre seguridad. ¿Cuáles son las cosas MÁS
importantes que debo hacer para que mi app sea segura? Dame una lista
simple para principiantes.
```

**Claude Code responde**:
```
¡Excelente pregunta! La seguridad puede parecer abrumadora, pero te voy
a dar las 7 reglas de oro que DEBES seguir. Estas cubren el 80% de los
problemas de seguridad comunes.

7 REGLAS DE ORO DE SEGURIDAD:
==============================

1. NUNCA HARDCODEES SECRETOS
   ❌ MAL: const API_KEY = "sk-12345"
   ✅ BIEN: const API_KEY = process.env.API_KEY

2. SIEMPRE VALIDA INPUT DE USUARIOS
   ❌ MAL: Confiar en lo que el usuario envía
   ✅ BIEN: Validar, sanitizar, verificar todo input

3. USA HTTPS, SIEMPRE
   ❌ MAL: http://mi-app.com
   ✅ BIEN: https://mi-app.com (con SSL)

4. NUNCA SUBAS SECRETOS A GIT
   ✅ Usa .gitignore para excluir .env, credenciales, etc.

5. HASHEA CONTRASEÑAS
   ❌ MAL: Guardar contraseñas en texto plano
   ✅ BIEN: Usar bcrypt para hashear

6. IMPLEMENTA RATE LIMITING
   ✅ Limita peticiones para evitar ataques de fuerza bruta

7. MANTÉN DEPENDENCIAS ACTUALIZADAS
   ✅ npm audit regularmente para detectar vulnerabilidades

¿Quieres que profundice en alguna? Te puedo dar código de ejemplo para
cada una.
```

**¿Ves lo útil que es esto?**

Claude Code:
- No te abrumó con teoría compleja
- Te dio reglas concretas y accionables
- Mostró ejemplos de qué NO hacer (y qué SÍ hacer)
- Ofreció profundizar según tu interés

Esto es exactamente lo que necesita un principiante.

## Paso 1: Manejo Seguro de Secretos con Ayuda de Claude Code

Vamos a empezar con la regla #1: NUNCA hardcodear secretos. Claude Code te va a mostrar cómo hacerlo bien.

### El Problema: Código Inseguro

Imagina que tienes este código:

```javascript
// app.js - CÓDIGO INSEGURO
const express = require('express');
const app = express();

// ❌ SECRETOS HARDCODEADOS - ¡MUY MALO!
const DATABASE_URL = "postgresql://admin:password123@db.example.com:5432/mydb";
const API_KEY = "sk-1234567890abcdef";
const JWT_SECRET = "mi-secreto-super-secreto";

app.listen(3000);
```

Vamos a preguntarle a Claude Code qué está mal con este código.

**Tú**:
```
Claude, tengo este código:

const DATABASE_URL = "postgresql://admin:password123@db.example.com:5432/mydb";
const API_KEY = "sk-1234567890abcdef";
const JWT_SECRET = "mi-secreto-super-secreto";

¿Qué tiene de malo? ¿Cómo lo arreglo?
```

**Claude Code**:
```
¡Buen instinto al preguntar! Este código tiene un problema GRAVE de seguridad.

¿QUÉ ESTÁ MAL?
==============

Tienes secretos hardcodeados directamente en el código. Esto es peligroso porque:

1. Si subes este código a GitHub, TODOS pueden ver tus secretos
2. Si alguien hackea tu repositorio, tiene acceso a tu base de datos
3. No puedes cambiar los secretos sin modificar el código
4. Los secretos quedan en el historial de Git para siempre

CÓMO ARREGLARLO (PASO A PASO):
===============================

PASO 1: Crear un archivo .env
------------------------------

Crea un archivo llamado .env en la raíz de tu proyecto:

```env
# .env - Este archivo NUNCA se sube a Git
DATABASE_URL=postgresql://admin:password123@db.example.com:5432/mydb
API_KEY=sk-1234567890abcdef
JWT_SECRET=mi-secreto-super-secreto
```

PASO 2: Instalar dotenv
------------------------

```bash
npm install dotenv
```

PASO 3: Modificar tu código
----------------------------

```javascript
// app.js - CÓDIGO SEGURO
require('dotenv').config(); // ← Carga las variables de .env

const express = require('express');
const app = express();

// ✅ Ahora usa variables de entorno
const DATABASE_URL = process.env.DATABASE_URL;
const API_KEY = process.env.API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ MEJOR AÚN: Valida que existan
if (!DATABASE_URL || !API_KEY || !JWT_SECRET) {
  console.error('ERROR: Faltan variables de entorno necesarias');
  process.exit(1); // Detener la app si faltan secretos
}

app.listen(3000);
```

PASO 4: Agregar .env al .gitignore
-----------------------------------

Crea o modifica tu .gitignore:

```gitignore
# .gitignore
node_modules/
.env
.env.local
.env.*.local
```

PASO 5: Crear un archivo .env.example
--------------------------------------

Para que otros desarrolladores sepan qué variables necesitan:

```env
# .env.example - ESTE SÍ se sube a Git
DATABASE_URL=postgresql://usuario:password@host:5432/dbname
API_KEY=tu_api_key_aqui
JWT_SECRET=tu_secreto_jwt_aqui
```

POR QUÉ ESTO ES MEJOR:
=======================

✅ Los secretos NO están en el código
✅ Puedes tener diferentes secretos en dev, staging, producción
✅ Si se compromete un secreto, lo cambias en .env (no en el código)
✅ No subes secretos a Git
✅ Otros desarrolladores saben qué variables necesitan (.env.example)

¿Tiene sentido? ¿Quieres que te ayude a implementarlo en tu proyecto?
```

**Análisis de esta respuesta**:

Claude Code:
- Explicó POR QUÉ es peligroso (no solo "está mal")
- Dio una solución paso a paso COMPLETA
- Incluyó validación (verificar que existan las variables)
- Agregó .env.example (best practice que muchos olvidan)
- Explicó las ventajas de hacerlo así

### Verificando que No Hay Secretos en tu Código

Ahora vamos a pedirle a Claude Code que revise tu código en busca de secretos.

**Tú**:
```
Claude, ¿puedes revisar mi archivo app.js y decirme si tengo algún
secreto hardcodeado? Aquí está el código:

[pegar tu código]
```

**Claude Code**:
```
¡Claro! Voy a revisar tu código línea por línea buscando posibles secretos.

ANÁLISIS DE SEGURIDAD:
======================

✅ BIEN: Veo que usas process.env para las variables sensibles
✅ BIEN: Tienes validación de variables de entorno
✅ BIEN: Usas dotenv correctamente

⚠️ ADVERTENCIA: Encontré esto:

Línea 23:
```javascript
const adminPassword = "admin123"; // ← Posible secreto
```

RECOMENDACIÓN: Mueve esto a .env:
```env
ADMIN_PASSWORD=admin123
```

Y en el código:
```javascript
const adminPassword = process.env.ADMIN_PASSWORD;
```

📋 CHECKLIST COMPLETO:
======================

¿Tienes .gitignore con .env? → ✅
¿Usas dotenv? → ✅
¿Validas variables de entorno? → ✅
¿Hay contraseñas hardcodeadas? → ⚠️ Una encontrada
¿Hay API keys hardcodeadas? → ✅ No
¿Hay tokens hardcodeados? → ✅ No

SCORE DE SEGURIDAD: 85/100

Para llegar a 100: Mueve adminPassword a variables de entorno.

¿Quieres que revise algún otro archivo?
```

**¿Ves el valor de esto?**

Claude Code hizo una auditoría completa de tu código, encontró un problema que quizás no habías visto, y te dio la solución exacta. Es como tener un code review automático enfocado en seguridad.

## Paso 2: Validación de Input del Usuario con Claude Code

Ahora vamos con la regla #2: SIEMPRE validar input de usuarios.

### El Problema: SQL Injection

**Tú**:
```
Claude, ¿qué es SQL Injection? He oído que es peligroso pero no entiendo
qué es exactamente.
```

**Claude Code**:
```
¡Excelente pregunta! SQL Injection es uno de los ataques más comunes.
Te lo explico con una analogía simple.

¿QUÉ ES SQL INJECTION?
=======================

Imagina que tienes un sistema de biblioteca automatizado. Le dices:
"Dame todos los libros de [AUTOR]"

El sistema construye un comando:
"Buscar libros donde autor = [AUTOR]"

SQL Injection es cuando un atacante, en lugar de poner un autor normal,
pone algo malicioso como:

"Shakespeare' OR '1'='1"

Y el comando queda:
"Buscar libros donde autor = 'Shakespeare' OR '1'='1'"

Como '1'='1' siempre es verdadero, ¡te da TODOS los libros!

EJEMPLO CON CÓDIGO:
===================

❌ CÓDIGO VULNERABLE:

```javascript
app.get('/user', (req, res) => {
  const userId = req.query.id;

  // ❌ Concatenar input del usuario directamente en SQL
  const query = `SELECT * FROM users WHERE id = ${userId}`;

  db.query(query, (err, result) => {
    res.json(result);
  });
});
```

¿Qué pasa si un atacante hace:
GET /user?id=1 OR 1=1

La query queda:
SELECT * FROM users WHERE id = 1 OR 1=1

¡Devuelve TODOS los usuarios!

Peor aún, podría hacer:
GET /user?id=1; DROP TABLE users;

Y BORRA toda tu tabla de usuarios. 😱

✅ CÓDIGO SEGURO:

```javascript
app.get('/user', (req, res) => {
  const userId = req.query.id;

  // ✅ Usar prepared statements (consultas parametrizadas)
  const query = 'SELECT * FROM users WHERE id = ?';

  db.query(query, [userId], (err, result) => {
    res.json(result);
  });
});
```

¿QUÉ CAMBIÓ?
============

En lugar de:
`SELECT * FROM users WHERE id = ${userId}`

Usamos:
'SELECT * FROM users WHERE id = ?'

Y pasamos userId como parámetro: [userId]

Esto hace que la librería de base de datos ESCAPE automáticamente cualquier
cosa peligrosa. El atacante podría intentar inyectar código, pero la
librería lo convierte en texto inofensivo.

REGLA GENERAL:
==============

NUNCA concatenes input de usuario en queries SQL.
SIEMPRE usa prepared statements / consultas parametrizadas.

¿Quieres que revise tu código en busca de posibles SQL Injections?
```

**Lo que Claude Code hizo**:

- Explicó SQL Injection con una analogía (biblioteca)
- Mostró código vulnerable vs código seguro
- Explicó CÓMO funciona el ataque con un ejemplo real
- Dio la solución (prepared statements)
- Ofreció revisar tu código

### Validando Input con Librerías

**Tú**:
```
Claude, además de evitar SQL Injection, ¿qué más debo validar del input
del usuario? Y ¿hay alguna librería que me ayude?
```

**Claude Code**:
```
¡Sí! Hay mucho que validar. Te voy a dar una guía completa.

QUÉ VALIDAR:
============

1. TIPO DE DATO
   ¿Es un número cuando esperas número?
   ¿Es un email válido?
   ¿Es una fecha válida?

2. RANGO
   ¿La edad está entre 0 y 150?
   ¿El precio es positivo?

3. LONGITUD
   ¿El username tiene entre 3 y 20 caracteres?
   ¿La descripción no excede 500 caracteres?

4. FORMATO
   ¿El email tiene formato correcto?
   ¿El teléfono tiene el formato esperado?

5. CONTENIDO
   ¿No tiene caracteres peligrosos (<script>, etc.)?
   ¿No tiene palabras prohibidas?

LIBRERÍA RECOMENDADA: Joi
==========================

Joi es una librería de validación super poderosa.

INSTALACIÓN:
```bash
npm install joi
```

EJEMPLO DE USO:

```javascript
const Joi = require('joi');

// Definir el esquema de validación
const userSchema = Joi.object({
  username: Joi.string()
    .alphanum()      // Solo letras y números
    .min(3)          // Mínimo 3 caracteres
    .max(20)         // Máximo 20 caracteres
    .required(),     // Obligatorio

  email: Joi.string()
    .email()         // Debe ser email válido
    .required(),

  age: Joi.number()
    .integer()       // Número entero
    .min(13)         // Mínimo 13 años
    .max(120),       // Máximo 120 años

  password: Joi.string()
    .min(8)          // Mínimo 8 caracteres
    .pattern(/[A-Z]/)  // Al menos una mayúscula
    .pattern(/[0-9]/)  // Al menos un número
    .required()
});

// Usar en tu ruta de Express
app.post('/register', (req, res) => {
  // Validar el body con el schema
  const { error, value } = userSchema.validate(req.body);

  if (error) {
    // Si hay error de validación, responder con 400
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  // Si pasa la validación, continuar
  const { username, email, age, password } = value;

  // Crear usuario en la base de datos
  // ...

  res.json({ message: 'Usuario creado exitosamente' });
});
```

VENTAJAS DE JOI:
================

✅ Valida tipos de datos automáticamente
✅ Mensajes de error claros
✅ Muy flexible (puedes crear reglas complejas)
✅ Sanitiza el input (elimina campos extra)

EJEMPLO DE ERROR:

Si alguien envía:
```json
{
  "username": "ab",
  "email": "no-es-email",
  "age": 5
}
```

Joi responde:
```json
{
  "error": "username length must be at least 3 characters long"
}
```

OTRAS LIBRERÍAS POPULARES:
==========================

- validator.js: Para validaciones específicas (email, URL, etc.)
- express-validator: Integrado con Express
- yup: Similar a Joi, más usado con React

MI RECOMENDACIÓN:
=================

Para backend con Node.js: Usa Joi
Para frontend (React, etc.): Usa yup

¿Quieres que te ayude a implementar validación en tu proyecto?
```

## Paso 3: Hashing de Contraseñas con Claude Code

Vamos a ver cómo almacenar contraseñas de forma segura.

**Tú**:
```
Claude, necesito guardar contraseñas de usuarios en mi base de datos.
¿Cómo lo hago de forma segura? Explícamelo como si tuviera 10 años.
```

**Claude Code**:
```
¡Buena pregunta! Voy a explicarte con una analogía super simple.

ANALOGÍA:
=========

Imagina que guardas secretos en una caja. Tienes dos opciones:

1. Escribir el secreto en un papel → ❌ Cualquiera que abra la caja lo lee
2. Escribir el secreto en código secreto → ✅ Aunque abran la caja, no lo entienden

"Hashear" es convertir la contraseña en "código secreto" que NO se puede
descifrar.

EJEMPLO:

Contraseña original: "miPerro123"
Hasheada: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36"

Si un hacker roba tu base de datos, ve el hash, NO la contraseña original.

¿CÓMO FUNCIONA?
===============

Cuando un usuario se registra:
1. Toma la contraseña: "miPerro123"
2. La hashea: "$2b$10$EixZaYVK..."
3. Guarda el HASH en la base de datos (no la contraseña)

Cuando el usuario hace login:
1. Toma la contraseña que escribió: "miPerro123"
2. La hashea de nuevo
3. Compara los dos hashes
4. Si coinciden → contraseña correcta

LO MÁGICO: No puedes "des-hashear". Si tienes el hash, NO puedes obtener
la contraseña original.

IMPLEMENTACIÓN CON BCRYPT:
==========================

bcrypt es la librería estándar para hashear contraseñas.

INSTALACIÓN:
```bash
npm install bcrypt
```

CÓDIGO COMPLETO:

```javascript
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();

app.use(express.json());

// Simular una base de datos
const users = [];

// REGISTRO DE USUARIO
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // ✅ PASO 1: Hashear la contraseña
  const saltRounds = 10; // Nivel de seguridad (10 es bueno)
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // ✅ PASO 2: Guardar el usuario con la contraseña HASHEADA
  users.push({
    username: username,
    password: hashedPassword  // ← El hash, NO la contraseña original
  });

  res.json({ message: 'Usuario registrado exitosamente' });
});

// LOGIN DE USUARIO
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Buscar el usuario
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ error: 'Usuario no encontrado' });
  }

  // ✅ COMPARAR la contraseña con el hash
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  res.json({ message: 'Login exitoso' });
});

app.listen(3000);
```

EXPLICACIÓN LÍNEA POR LÍNEA:
=============================

```javascript
const saltRounds = 10;
```
Esto controla qué tan "fuerte" es el hash. Más alto = más seguro pero más lento.
10 es un buen balance.

```javascript
const hashedPassword = await bcrypt.hash(password, saltRounds);
```
Esto toma la contraseña y la convierte en un hash.
Es async porque toma tiempo (eso es intencional, para hacerlo más seguro).

```javascript
const passwordMatch = await bcrypt.compare(password, user.password);
```
Esto compara la contraseña ingresada con el hash guardado.
Retorna true si coinciden, false si no.

ERRORES COMUNES A EVITAR:
==========================

❌ Guardar contraseñas en texto plano
```javascript
users.push({ username, password }); // MAL
```

❌ Usar algoritmos débiles (MD5, SHA1)
```javascript
const hash = md5(password); // NO HACER ESTO
```

❌ No usar await con bcrypt
```javascript
const hash = bcrypt.hash(password, 10); // Esto retorna una Promise, no el hash
```

✅ Siempre usar bcrypt con await o .then()

¿Tiene sentido? ¿Quieres que te ayude a implementar esto en tu app?
```

**Lo que acabamos de aprender**:

Claude Code:
- Explicó hashing con una analogía super simple (caja de secretos)
- Mostró el flujo completo (registro + login)
- Dio código funcional que puedes copiar/pegar
- Explicó cada parámetro (saltRounds)
- Advirtió sobre errores comunes

## Paso 4: Auditoría de Seguridad con Claude Code

Ahora vamos a aprender cómo pedirle a Claude Code que haga una auditoría completa de seguridad de tu código.

**Tú**:
```
Claude, tengo una aplicación de Express completa. ¿Puedes hacer una
auditoría de seguridad y decirme qué cosas están mal? Aquí está mi código:

[pegar código de app.js completo]
```

**Claude Code**:
```
¡Por supuesto! Voy a hacer una auditoría completa de seguridad. Te voy a
dar un reporte detallado con prioridades.

AUDITORÍA DE SEGURIDAD - REPORTE
=================================

🔴 CRÍTICO (arreglar INMEDIATAMENTE)
====================================

1. API Key hardcodeada (Línea 15)
   ```javascript
   const API_KEY = "sk-12345"; // ← CRÍTICO
   ```
   RIESGO: Si subes esto a GitHub, expones tu API key.
   SOLUCIÓN: Moverlo a .env
   ```javascript
   const API_KEY = process.env.API_KEY;
   ```

2. SQL Injection vulnerable (Línea 45)
   ```javascript
   db.query(`SELECT * FROM users WHERE id = ${req.params.id}`)
   ```
   RIESGO: Atacante puede inyectar SQL malicioso y robar/borrar datos.
   SOLUCIÓN: Usar prepared statements
   ```javascript
   db.query('SELECT * FROM users WHERE id = ?', [req.params.id])
   ```

3. Contraseñas en texto plano (Línea 78)
   ```javascript
   users.push({ username, password }) // ← Guardando sin hashear
   ```
   RIESGO: Si roban tu DB, tienen todas las contraseñas.
   SOLUCIÓN: Usar bcrypt
   ```javascript
   const hashedPassword = await bcrypt.hash(password, 10);
   users.push({ username, password: hashedPassword });
   ```

🟠 ALTO (arreglar pronto)
=========================

4. No hay validación de input (Línea 32)
   ```javascript
   const username = req.body.username; // Sin validar
   ```
   RIESGO: Usuarios pueden enviar datos maliciosos.
   SOLUCIÓN: Usar Joi o express-validator

5. CORS sin configurar (todo el archivo)
   RIESGO: Cualquier sitio web puede hacer peticiones a tu API.
   SOLUCIÓN: Configurar CORS
   ```javascript
   const cors = require('cors');
   app.use(cors({
     origin: 'https://tu-frontend.com'
   }));
   ```

6. No hay rate limiting (todo el archivo)
   RIESGO: Ataques de fuerza bruta en login.
   SOLUCIÓN: Instalar express-rate-limit
   ```javascript
   const rateLimit = require('express-rate-limit');
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutos
     max: 100 // 100 peticiones por IP
   });
   app.use(limiter);
   ```

🟡 MEDIO (mejorar cuando puedas)
================================

7. Logs con información sensible (Línea 56)
   ```javascript
   console.log('Login attempt:', username, password); // ← Loggea contraseña
   ```
   SOLUCIÓN: NUNCA loggear contraseñas
   ```javascript
   console.log('Login attempt:', username);
   ```

8. No hay headers de seguridad
   SOLUCIÓN: Usar helmet
   ```javascript
   const helmet = require('helmet');
   app.use(helmet());
   ```

9. Mensajes de error muy detallados (Línea 89)
   ```javascript
   res.status(500).json({ error: error.stack }); // ← Expone código
   ```
   SOLUCIÓN: Mensajes genéricos en producción
   ```javascript
   res.status(500).json({ error: 'Internal server error' });
   ```

SCORE DE SEGURIDAD: 40/100
===========================

Para llegar a 80/100: Arregla todos los 🔴 CRÍTICOS
Para llegar a 100/100: Arregla TODOS

PLAN DE ACCIÓN RECOMENDADO:
============================

Día 1:
- Mover API keys a .env
- Arreglar SQL Injection
- Implementar bcrypt para contraseñas

Día 2:
- Agregar validación con Joi
- Configurar CORS
- Instalar helmet

Día 3:
- Implementar rate limiting
- Limpiar logs
- Mejorar mensajes de error

¿Quieres que te ayude a implementar alguno de estos fixes?
```

**¿Ves el valor de esto?**

Claude Code hizo una auditoría profesional:
- Categorizó problemas por severidad (crítico, alto, medio)
- Identificó la línea exacta de cada problema
- Explicó el riesgo de cada uno
- Dio la solución con código
- Creó un plan de acción con timeline

Esto es exactamente lo que hace un consultor de seguridad que cobraría miles de dólares.

## Paso 5: Implementando Mejores Prácticas de Seguridad

Ahora vamos a pedirle a Claude Code que nos ayude a implementar todas las mejoras.

**Tú**:
```
Claude, ayúdame a implementar todas las mejoras de seguridad críticas.
Dame un código completo y seguro que pueda usar.
```

**Claude Code**:
```
¡Perfecto! Te voy a crear una aplicación de ejemplo COMPLETA y SEGURA
que implementa todas las best practices. Puedes usarla como template.

```javascript
// app.js - APLICACIÓN SEGURA

// ===== PASO 1: Imports =====
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const app = express();

// ===== PASO 2: Seguridad Middleware =====

// Helmet: Agrega headers de seguridad
app.use(helmet());

// CORS: Controla qué dominios pueden acceder
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate Limiting: Previene ataques de fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 peticiones por IP
  message: 'Demasiadas peticiones, intenta de nuevo más tarde'
});
app.use('/api/', limiter);

// Login rate limiting más estricto
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Solo 5 intentos de login
  message: 'Demasiados intentos de login, intenta en 15 minutos'
});

// Body parser
app.use(express.json({ limit: '10mb' })); // Limitar tamaño de payload

// ===== PASO 3: Base de datos simulada =====
const users = [];

// ===== PASO 4: Schemas de validación con Joi =====

const registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/)  // Al menos una mayúscula
    .pattern(/[a-z]/)  // Al menos una minúscula
    .pattern(/[0-9]/)  // Al menos un número
    .pattern(/[@$!%*?&]/)  // Al menos un símbolo
    .required()
    .messages({
      'string.pattern.base': 'La contraseña debe tener mayúscula, minúscula, número y símbolo'
    })
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

// ===== PASO 5: Middleware de validación =====

function validateRequest(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message
      });
    }

    next();
  };
}

// ===== PASO 6: Rutas =====

// Registro
app.post('/api/register',
  validateRequest(registerSchema),
  async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Verificar si el usuario ya existe
      if (users.find(u => u.username === username)) {
        return res.status(409).json({ error: 'Usuario ya existe' });
      }

      // Hashear contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Guardar usuario
      const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword,
        createdAt: new Date()
      };

      users.push(newUser);

      // NO devolver la contraseña
      const { password: _, ...userWithoutPassword } = newUser;

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: userWithoutPassword
      });

    } catch (error) {
      console.error('Error en registro:', error.message);
      // NO exponer detalles del error al cliente
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
);

// Login
app.post('/api/login',
  loginLimiter,
  validateRequest(loginSchema),
  async (req, res) => {
    try {
      const { username, password } = req.body;

      // Buscar usuario
      const user = users.find(u => u.username === username);

      // Mensaje genérico para no revelar si el usuario existe
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Comparar contraseñas
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        // Mismo mensaje que arriba (no revelar qué está mal)
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Login exitoso
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        message: 'Login exitoso',
        user: userWithoutPassword
      });

    } catch (error) {
      console.error('Error en login:', error.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
);

// ===== PASO 7: Error handling global =====

app.use((err, req, res, next) => {
  console.error(err.stack);

  // En producción, NO exponer stack trace
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({ error: 'Error interno del servidor' });
  } else {
    // En desarrollo, mostrar más detalles
    res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
});

// ===== PASO 8: Iniciar servidor =====

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);

  // Verificar variables de entorno críticas
  if (!process.env.NODE_ENV) {
    console.warn('⚠️  NODE_ENV no está definido');
  }
});
```

ARCHIVO .env NECESARIO:
=======================

```env
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:3000
```

ARCHIVO package.json:
=====================

```json
{
  "name": "secure-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "helmet": "^7.0.0",
    "cors": "^2.8.5",
    "express-rate-limit": "^6.7.0",
    "joi": "^17.9.1",
    "bcrypt": "^5.1.0",
    "dotenv": "^16.0.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

PARA INSTALAR TODO:
===================

```bash
npm install
```

LO QUE ESTA APP TIENE:
======================

✅ Helmet para headers de seguridad
✅ CORS configurado correctamente
✅ Rate limiting (general y específico para login)
✅ Validación de input con Joi
✅ Contraseñas hasheadas con bcrypt
✅ Mensajes de error genéricos (no revelan info)
✅ NO devuelve contraseñas en las respuestas
✅ Manejo de errores centralizado
✅ Variables de entorno
✅ Límite de tamaño de payload

SCORE DE SEGURIDAD: 95/100
==========================

Para llegar a 100:
- Agregar HTTPS (requiere certificado SSL)
- Implementar JWT para autenticación
- Agregar logs con rotación

¿Quieres que te ayude con alguno de esos?
```

## Problemas Comunes y Soluciones

### Error 1: bcrypt no compila en Windows

❌ **Error**:
```
node-gyp rebuild failed
```

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, bcrypt no se instala en mi Windows. Sale error de node-gyp.
```

**Claude Code**:
```
Este es un problema común en Windows. bcrypt requiere herramientas de
compilación de C++ que Windows no tiene por defecto.

SOLUCIÓN 1: Instalar windows-build-tools
=========================================

Abre PowerShell COMO ADMINISTRADOR y ejecuta:

```powershell
npm install --global windows-build-tools
```

Esto instala Python y Visual Studio Build Tools. Toma 10-15 minutos.

Después:
```bash
npm install bcrypt
```

SOLUCIÓN 2: Usar bcryptjs (más fácil)
======================================

bcryptjs es una alternativa 100% JavaScript (no requiere compilación).

```bash
npm uninstall bcrypt
npm install bcryptjs
```

En tu código, cambia:
```javascript
const bcrypt = require('bcryptjs'); // Solo cambia esto

// Todo lo demás es IGUAL
const hash = await bcrypt.hash(password, 10);
const match = await bcrypt.compare(password, hash);
```

¿Diferencia? bcryptjs es un poco más lento, pero para aprender es perfecto.

MI RECOMENDACIÓN:
=================

Para desarrollo en Windows: Usa bcryptjs
Para producción en Linux: Usa bcrypt (más rápido)

¿Cuál prefieres probar?
```

### Error 2: CORS sigue bloqueando peticiones

❌ **Error**:
```
Access to fetch has been blocked by CORS policy
```

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, instalé cors pero sigo teniendo errores de CORS cuando hago
peticiones desde mi frontend React.
```

**Claude Code**:
```
CORS puede ser confuso. Vamos a resolverlo paso a paso.

PRIMERO: Verificar que cors esté configurado
=============================================

En tu backend (Express):

```javascript
const cors = require('cors');

// Configuración básica (permite TODO - solo para desarrollo)
app.use(cors());

// O configuración específica (recomendado)
app.use(cors({
  origin: 'http://localhost:3000', // URL de tu React app
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

¡IMPORTANTE! cors() debe ir ANTES de tus rutas.

SEGUNDO: Verificar el orden del middleware
===========================================

```javascript
const app = express();

// ✅ ORDEN CORRECTO:
app.use(cors());           // 1. CORS primero
app.use(express.json());   // 2. Body parser
app.get('/api/users', ...); // 3. Rutas después

// ❌ ORDEN INCORRECTO:
app.get('/api/users', ...); // Rutas primero
app.use(cors());           // CORS después - ¡NO FUNCIONA!
```

TERCERO: Si usas credenciales (cookies)
========================================

En el backend:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true  // ← IMPORTANTE
}));
```

En el frontend (fetch):
```javascript
fetch('http://localhost:4000/api/users', {
  method: 'GET',
  credentials: 'include'  // ← IMPORTANTE
})
```

CUARTO: Problemas con múltiples orígenes
=========================================

Si tu frontend puede venir de varios dominios:

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://mi-app.com'
];

app.use(cors({
  origin: function(origin, callback) {
    // Permitir peticiones sin origin (como Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('No permitido por CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
```

DEBUGGING:
==========

Agrega esto temporalmente para ver qué está pasando:

```javascript
app.use((req, res, next) => {
  console.log('Origin:', req.headers.origin);
  console.log('Method:', req.method);
  next();
});
```

Verás en los logs desde dónde vienen las peticiones.

¿Sigue sin funcionar? Muéstrame tu código y el error exacto.
```

## 🎮 Ejercicios Gamificados

### Ejercicio 1: Hardcoded Secrets Hunter (100 XP)

**Objetivo**: Encontrar y arreglar todos los secretos hardcodeados.

**Tareas**:
1. Claude Code te dará un código con 10 secretos hardcodeados
2. Encuéntralos todos
3. Muévelos a variables de entorno
4. Crea .env y .gitignore correctos

**Pista**: Pregunta a Claude Code: "Dame un código con secretos hardcodeados para practicar"

**Entregable**: Código arreglado + .env.example

**Bonus (+50 XP)**: Crear un script que verifique automáticamente que no haya secretos.

### Ejercicio 2: SQL Injection Challenge (150 XP)

**Objetivo**: Hackear tu propia aplicación vulnerable y luego arreglarla.

**Tareas**:
1. Crear una app con SQL Injection vulnerable
2. Demostrar el ataque (extraer datos)
3. Arreglar el código con prepared statements
4. Documentar el antes y después

**Entregable**: Video de 2 minutos demostrando el hack y el fix.

**Bonus (+75 XP)**: Implementar un WAF (Web Application Firewall) básico.

### Ejercicio 3: Secure Authentication System (200 XP)

**Objetivo**: Crear un sistema de autenticación completo y seguro.

**Requisitos**:
- Registro con validación
- Login con rate limiting
- Contraseñas hasheadas
- JWT para sesiones
- Logout

**Pista**: Pregunta a Claude Code sobre implementación de JWT.

**Entregable**: API funcionando + tests de seguridad.

**Bonus (+100 XP)**: Agregar autenticación de dos factores (2FA).

### Ejercicio 4: Security Audit Bot (175 XP)

**Objetivo**: Crear un script que audite código automáticamente.

**Tareas**:
1. Script que lea archivos .js
2. Busque patrones inseguros (hardcoded secrets, SQL injection, etc.)
3. Genere reporte con score
4. Use Claude Code para mejorar las reglas

**Entregable**: Script + ejemplos de reportes.

**Bonus (+85 XP)**: Integrarlo como pre-commit hook en Git.

### Ejercicio 5: Secure Full-Stack App (300 XP)

**Objetivo**: Crear una aplicación completa con todas las best practices.

**Requisitos**:
- Backend seguro (Express + todas las mejoras)
- Frontend (React o similar)
- HTTPS configurado
- Autenticación JWT
- Validación en frontend y backend
- Rate limiting
- Logging seguro
- Deploy en producción

**Entregable**: Repositorio completo + URL de la app funcionando.

**Bonus (+200 XP)**: Pasar un penetration test con herramienta como OWASP ZAP.

## Resumen de Esta Lección

¡Felicidades! Completaste la lección más importante del curso: Seguridad. Esto es lo que aprendiste:

✅ **Las 7 reglas de oro de seguridad** que todo desarrollador debe seguir

✅ **Cómo manejar secretos de forma segura** usando variables de entorno y NUNCA hardcodeando

✅ **Prevenir SQL Injection** usando prepared statements

✅ **Validar input del usuario** con librerías como Joi

✅ **Hashear contraseñas** correctamente con bcrypt

✅ **Implementar rate limiting** para prevenir ataques de fuerza bruta

✅ **Usar Claude Code como auditor de seguridad** para revisar tu código

✅ **Crear aplicaciones completas y seguras** siguiendo best practices

Lo más importante: **Aprendiste a usar Claude Code como tu consultor de seguridad personal**. Cada vez que no estés seguro si algo es seguro, simplemente pregunta. Claude Code te explicará los riesgos y te dará soluciones concretas.

La seguridad NO es algo que haces al final. Es algo que integras desde el principio. Y con Claude Code a tu lado, no tienes excusa para construir aplicaciones inseguras.

En la próxima lección, vamos a aprender sobre **Claude Code en Redes Corporativas**: cómo configurar proxies, trabajar con VPNs, y resolver problemas de conectividad en entornos empresariales. ¡Nos vemos!
