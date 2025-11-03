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
