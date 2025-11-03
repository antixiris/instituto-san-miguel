<p><strong><em>Integración con APIs: Conectando con el mundo real</em></strong></p>

## Introducción: De datos inventados a datos reales

Hasta ahora has trabajado con datos que tú mismo escribiste en el código: nombres, edades, productos inventados. Pero en el mundo real, las aplicaciones obtienen información de servicios externos a través de internet. Cuando abres Instagram, no tiene tus fotos guardadas en el código de la app; las pide a un servidor. Cuando buscas en Google, los resultados vienen de una base de datos gigante, no del código de la página.

En esta lección aprenderás a conectar tu aplicación React con APIs (servicios que proveen datos a través de internet). Usarás el hook `useEffect` para cargar datos cuando el componente se monta en la pantalla, mostrarás un mensaje de "Cargando..." mientras esperas la respuesta, y manejarás errores si algo sale mal.

Es el momento en que tu aplicación deja de ser un proyecto de práctica y empieza a comportarse como una aplicación real que consume datos en vivo.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Entender qué es una API**: Comprenderás el concepto de API REST y cómo las aplicaciones web se comunican con servidores para obtener datos.
2. **Usar el hook useEffect**: Aprenderás a ejecutar código cuando el componente se monta, ideal para cargar datos al inicio.
3. **Hacer peticiones HTTP con fetch**: Sabrás cómo pedir datos a una API usando la función `fetch` de JavaScript.
4. **Manejar estados de carga y error**: Mostrarás indicadores de carga mientras esperas datos y mensajes de error si algo falla.

---

## ¿Por qué es importante trabajar con APIs?

Imagina que tienes un restaurante. Tú cocinas (tu frontend React), pero los ingredientes no los produces tú; los pides a proveedores (APIs). Cuando necesitas tomates, llamas al proveedor, esperas la entrega, y cuando llegan, cocinas con ellos.

**Las APIs funcionan igual**: tu app React es la cocina, las APIs son los proveedores de ingredientes (datos). Tu app hace pedidos (peticiones HTTP), espera la respuesta, y cuando llegan los datos, los muestra en la interfaz.

### La analogía del restaurante y el menú

Piensa en una API como el menú de un restaurante:
- **Menú (API)**: Lista de platos (endpoints) disponibles
- **Pedir un plato (HTTP request)**: Haces un pedido específico
- **Esperar (loading)**: El chef cocina (el servidor procesa)
- **Recibir el plato (response)**: Te traen la comida (los datos)
- **Si falta un ingrediente (error)**: Te avisan que no pueden prepararlo

```
Tu app React → Hace pedido: "Dame la lista de usuarios"
     ↓
API (servidor) → "Ok, aquí está la lista"
     ↓
Tu app React → Recibe datos y los muestra en pantalla
```

### 📊 Un dato interesante

El 99% de las aplicaciones web modernas consumen APIs. Ninguna app almacena todos sus datos en el código frontend; sería imposible de mantener y actualizar. Las APIs permiten que miles de apps (web, móvil, smartwatches) accedan a los mismos datos actualizados en tiempo real. Netflix tiene una sola API que sirve datos a su app web, sus apps de iOS/Android, sus apps de Smart TV, etc.

---

## Concepto 1: ¿Qué es una API?

**API significa "Application Programming Interface"** (Interfaz de Programación de Aplicaciones). En términos simples: es un servicio que provee datos en un formato que las computadoras pueden entender.

### Tipos de datos que proveen las APIs

Las APIs pueden dar cualquier tipo de información:
- Usuarios (nombres, emails, fotos)
- Productos (precios, descripciones, stock)
- Posts de redes sociales
- Clima actual
- Información de películas
- Noticias
- Datos financieros

### API REST y endpoints

La mayoría de APIs modernas son **REST APIs**. Esto significa que tienes diferentes URLs (llamadas endpoints) para diferentes tipos de datos.

**Ejemplo con una API de tienda online**:
```
https://api.mitienda.com/productos       → Lista de todos los productos
https://api.mitienda.com/productos/5     → Producto con ID 5
https://api.mitienda.com/usuarios        → Lista de usuarios
https://api.mitienda.com/usuarios/10     → Usuario con ID 10
```

Cada URL es un endpoint que retorna datos diferentes.

### Formato JSON

Las APIs retornan datos en formato **JSON** (JavaScript Object Notation). Es como un objeto de JavaScript pero en formato de texto.

**Ejemplo de respuesta JSON**:
```json
{
  "id": 1,
  "nombre": "Ana García",
  "email": "ana@email.com",
  "edad": 28
}
```

Parece familiar, ¿verdad? Es prácticamente un objeto JavaScript. Por eso JavaScript y las APIs se llevan tan bien.

---

## Concepto 2: El hook useEffect

Cuando quieres que algo suceda cuando el componente aparece en pantalla por primera vez (como cargar datos), usas el hook **useEffect**.

### ¿Qué es useEffect?

**`useEffect` ejecuta código en momentos específicos del ciclo de vida del componente**:
- Cuando el componente se monta (aparece) en la pantalla
- Cuando ciertos datos cambian
- Cuando el componente se desmonta (desaparece)

### Sintaxis básica de useEffect

```tsx
useEffect(() => {
  // Código que se ejecuta
}, []);
```

**Partes del useEffect**:

1. **Primer argumento**: Una función que contiene el código a ejecutar
2. **Segundo argumento**: Un array de dependencias (si está vacío `[]`, se ejecuta solo UNA VEZ al montar el componente)

**Analogía**: Piensa en `useEffect` como instrucciones que le das a tu componente sobre "cuándo hacer algo especial":
- Array vacío `[]`: "Hazlo solo cuando naces (te montas)"
- Con dependencias `[contador]`: "Hazlo cuando naces Y cada vez que `contador` cambie"
- Sin array: "Hazlo en cada render" (rara vez se usa así)

### Ejemplo simple: Mensaje al montar

```tsx
import { useEffect } from 'react';

function Saludo() {
  useEffect(() => {
    console.log('¡El componente se montó!');
  }, []);

  return <h1>Hola Mundo</h1>;
}
```

**Explicación**:
- **Línea 1**: Importa `useEffect` de React.
- **Líneas 4-6**: Define un efecto que imprime un mensaje en la consola.
- **Línea 6** (`[]`): Array vacío significa "ejecuta esto SOLO una vez, cuando el componente se monte".

Cuando este componente aparece en pantalla, verás el mensaje en la consola del navegador.

---

## Concepto 3: Fetch - Pedir datos a una API

**`fetch` es la función de JavaScript que usamos para hacer peticiones HTTP** (pedir datos a una API).

### Sintaxis básica de fetch

```tsx
fetch('https://api.ejemplo.com/datos')
  .then(response => response.json())
  .then(datos => console.log(datos))
  .catch(error => console.error(error));
```

**Explicación paso a paso**:

1. **`fetch('URL')`**: Inicia la petición a la URL especificada. Retorna una **Promise** (promesa).

2. **`.then(response => response.json())`**: Cuando llega la respuesta, la convierte de JSON (texto) a un objeto JavaScript.

3. **`.then(datos => console.log(datos))`**: Cuando la conversión termina, hace algo con los datos (en este caso, imprimirlos).

4. **`.catch(error => ...)`**: Si algo sale mal en cualquier paso, captura el error.

### Usando async/await (forma más moderna y legible)

En lugar de `.then`, puedes usar `async/await`, que es más fácil de leer:

```tsx
async function obtenerDatos() {
  try {
    const response = await fetch('https://api.ejemplo.com/datos');
    const datos = await response.json();
    console.log(datos);
  } catch (error) {
    console.error(error);
  }
}
```

**Por qué es más fácil**: Se lee de arriba a abajo, como código normal. `await` significa "espera a que esto termine antes de continuar".

---

## Concepto 4: Cargar datos de una API real

Vamos a usar **JSONPlaceholder**, una API pública gratuita para practicar. Provee datos falsos de usuarios, posts, comentarios, etc.

**URL de ejemplo**: `https://jsonplaceholder.typicode.com/users`

### Ejemplo completo: Lista de usuarios

Crea un archivo `src/ListaUsuarios.tsx`:

```tsx
import { useState, useEffect } from 'react';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(datos => {
        setUsuarios(datos);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>{usuario.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListaUsuarios;
```

**Explicación línea por línea**:

- **Línea 4** (`const [usuarios, setUsuarios] = useState([]);`): Estado para guardar la lista de usuarios. Empieza como array vacío.

- **Línea 5** (`const [cargando, setCargando] = useState(true);`): Estado booleano para saber si estamos esperando datos. Empieza en `true`.

- **Líneas 7-14** (`useEffect(...)`): Cuando el componente se monta:
  - **Línea 8**: Hace la petición a la API.
  - **Línea 9**: Convierte la respuesta a JSON.
  - **Líneas 10-13**: Cuando llegan los datos, actualiza el estado `usuarios` y pone `cargando` en `false`.

- **Líneas 16-18** (renderizado condicional): Si está cargando, muestra "Cargando usuarios...". Esto se llama "early return": sales de la función antes de llegar al final.

- **Líneas 20-28**: Si NO está cargando, muestra la lista. Usa `.map()` para convertir cada usuario en un `<li>`.

- **Línea 25** (`key={usuario.id}`): React requiere una prop `key` única para cada elemento de una lista. Ayuda a React a identificar qué elementos cambiaron.

**Resultado**: Al cargar el componente, verás "Cargando usuarios..." por un momento, y luego aparecerá una lista con 10 nombres.

---

## Práctica guiada: Galería de posts de blog

Vamos a crear un componente que muestre posts de un blog, con título, autor y contenido. Incluiremos manejo de carga y errores.

### Paso 1 de 3: Estructura básica y carga de datos

**Lo que harás**:
1. Crear el componente con estados para posts, cargando y error
2. Usar `useEffect` para cargar los posts al montar
3. Mostrar estado de carga

**Crea `src/GaleriaPosts.tsx`**:

```tsx
import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function GaleriaPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(datos => {
        setPosts(datos.slice(0, 6));
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <div className="cargando">
        <p>Cargando posts...</p>
      </div>
    );
  }

  return (
    <div className="galeria">
      <h1>Posts del Blog</h1>
      {posts.map(post => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default GaleriaPosts;
```

**Explicación**:

- **Líneas 3-8**: Interface TypeScript que define la estructura de un post. Esto ayuda a VS Code a autocompletar y detectar errores.

- **Línea 11** (`useState<Post[]>([])`): Estado tipado como array de `Post`. El `<Post[]>` es sintaxis de TypeScript para especificar el tipo.

- **Línea 18** (`datos.slice(0, 6)`): Solo toma los primeros 6 posts (la API retorna 100, que es demasiado para este ejemplo).

**Checkpoint**: Importa este componente en `App.tsx`. Deberías ver "Cargando posts..." brevemente, luego 6 posts con títulos y contenido.

### Paso 2 de 3: Añadir manejo de errores

**Lo que harás**:
1. Añadir estado para errores
2. Usar try/catch para capturar errores
3. Mostrar mensaje si algo falla

**Modifica el componente**:

```tsx
function GaleriaPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar');
        return res.json();
      })
      .then(datos => {
        setPosts(datos.slice(0, 6));
        setCargando(false);
      })
      .catch(err => {
        setError('No se pudieron cargar los posts');
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <div className="cargando">Cargando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    // ... resto del código
  );
}
```

**Explicación de lo nuevo**:

- **Línea 4** (`const [error, setError] = useState('');`): Estado para guardar mensajes de error.

- **Líneas 9-10**: Verifica que la respuesta sea exitosa (`res.ok`). Si no, lanza un error.

- **Líneas 16-19** (`.catch`): Captura cualquier error que ocurra en la cadena de promesas y actualiza el estado de error.

- **Líneas 26-28**: Si hay un error, muestra el mensaje de error.

**Checkpoint**: El componente ahora maneja errores. Para probarlo, cambia temporalmente la URL a una inválida y verás el mensaje de error.

### Paso 3 de 3: Mejorar la interfaz

**Lo que harás**:
1. Añadir información del autor (nombre de usuario)
2. Limitar la longitud del contenido
3. Estilizar las tarjetas de posts

**Modifica el JSX del return**:

```tsx
return (
  <div className="galeria">
    <h1>Posts Recientes del Blog</h1>
    <div className="posts-grid">
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <h3>{post.title}</h3>
          <p className="post-body">
            {post.body.substring(0, 100)}...
          </p>
          <p className="post-info">
            Autor: Usuario #{post.userId}
          </p>
        </div>
      ))}
    </div>
  </div>
);
```

**Añade estilos en `src/index.css`**:

```css
.galeria {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.galeria h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.post-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.post-card h3 {
  color: #3498db;
  margin-bottom: 10px;
  font-size: 18px;
}

.post-body {
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

.post-info {
  color: #7f8c8d;
  font-size: 14px;
  font-style: italic;
}

.cargando {
  text-align: center;
  padding: 50px;
  font-size: 18px;
  color: #3498db;
}

.error {
  text-align: center;
  padding: 50px;
  font-size: 18px;
  color: #e74c3c;
  background-color: #fadbd8;
  border-radius: 8px;
  margin: 20px;
}
```

**Explicación de estilos clave**:

- **`.posts-grid`**: Usa CSS Grid para crear una cuadrícula responsive. `repeat(auto-fill, minmax(300px, 1fr))` significa: "crea tantas columnas como quepan, cada una de mínimo 300px".

- **`.post-card:hover`**: Efecto de elevación al pasar el mouse, igual que en lecciones anteriores.

- **`.cargando` y `.error`**: Estilos específicos para los estados de carga y error.

**Checkpoint**: Los posts ahora se muestran en una cuadrícula responsive (2-3 columnas dependiendo del ancho de pantalla), con efectos hover y estilos profesionales.

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: "useEffect Hook has missing dependency"

**Te pasa cuando**: ESLint (el linter) detecta que usas una variable dentro de `useEffect` pero no la incluyes en el array de dependencias.

**El mensaje de error que ves**:
```
React Hook useEffect has a missing dependency: 'algo'. Either include it or remove the dependency array
```

**Por qué pasa**: React quiere asegurarse de que el efecto se re-ejecute si cambian las variables que usa.

**Cómo se soluciona**:

**Opción 1**: Si realmente solo quieres que se ejecute al montar, ignora el warning (en este curso está bien):
```tsx
useEffect(() => {
  // código
}, []); // eslint-disable-line react-hooks/exhaustive-deps
```

**Opción 2**: Añade las dependencias que faltan:
```tsx
useEffect(() => {
  // usa 'contador'
}, [contador]); // Ahora se ejecuta cuando 'contador' cambia
```

### Error #2: "Cannot read property 'map' of undefined"

**Te pasa cuando**: Intentas usar `.map()` en un array que aún no se ha cargado.

**El mensaje de error que ves**:
```
Cannot read property 'map' of undefined
```

**Por qué pasa**: Al inicio, `usuarios` es `undefined` (antes de que se cargue), y `undefined.map()` causa error.

**Cómo se soluciona**:

**Opción 1**: Inicializa el estado como array vacío:
```tsx
const [usuarios, setUsuarios] = useState([]); // ✅ Empieza como []
```

**Opción 2**: Verifica antes de mapear:
```tsx
{usuarios && usuarios.map(...)}
// O
{usuarios?.map(...)}  // Optional chaining
```

### Error #3: "Warning: Each child in a list should have a unique 'key' prop"

**Te pasa cuando**: Usas `.map()` para renderizar una lista pero olvidas añadir la prop `key`.

**El mensaje de error que ves**:
```
Warning: Each child in a list should have a unique "key" prop
```

**Por qué pasa**: React usa `key` para identificar elementos en listas y optimizar el renderizado.

**Cómo se soluciona**:
Añade una prop `key` única a cada elemento:
```tsx
{usuarios.map(usuario => (
  <li key={usuario.id}>{usuario.name}</li>
  //  ^^^^^^^^^^ Usa un ID único
))}
```

**IMPORTANTE**: No uses el índice del array como key si la lista puede cambiar de orden. Usa un ID único de los datos.

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: El error más común es olvidar inicializar el estado como array vacío y luego intentar usar `.map()`. Recuerda: si vas a mapear sobre algo, ese algo debe ser un array desde el inicio, no `undefined` o `null`.

> **Otro tip importante**: Siempre muestra un estado de carga. Los usuarios odian ver pantallas en blanco sin saber si la app está funcionando. Un simple "Cargando..." mejora muchísimo la experiencia de usuario. Es mejor ser explícito sobre lo que está pasando.

> **Sobre async/await vs .then**: Ambas formas funcionan igual. `.then()` es más tradicional, `async/await` es más moderna y legible. Cuando te sientas cómodo con `.then()`, investiga `async/await` para escribir código más limpio.

> **Debugging de APIs**: Si una petición no funciona, abre la consola del navegador (F12) y ve a la pestaña "Network". Ahí verás todas las peticiones HTTP que hace tu app, sus respuestas, y cualquier error. Es invaluable para debugging.

> **JSONPlaceholder es tu amigo**: Mientras aprendes, usa JSONPlaceholder para practicar. Tiene endpoints para usuarios, posts, comentarios, fotos, todos, y más. Es perfecto para aprender sin tener que configurar tu propio backend.

---

## Tu turno: Ejercicio guiado

**Objetivo simple**: Crear un componente "GaleriaFotos" que muestre fotos de la API JSONPlaceholder en una cuadrícula, con título y thumbnail.

**Tiempo**: 25-30 minutos

**Lo que necesitas antes de empezar**:
- [ ] Proyecto React funcionando
- [ ] Conocimiento de `useState` y `useEffect`
- [ ] Conocimiento de fetch y manejo de APIs

**Endpoint a usar**: `https://jsonplaceholder.typicode.com/photos`

**Estructura de cada foto en la API**:
```json
{
  "albumId": 1,
  "id": 1,
  "title": "accusamus beatae ad facilis cum similique qui sunt",
  "url": "https://via.placeholder.com/600/92c952",
  "thumbnailUrl": "https://via.placeholder.com/150/92c952"
}
```

### Instrucciones paso a paso

**Parte 1: Crear el componente base** (10 min)

1. Crea `src/GaleriaFotos.tsx`
2. Define una interface `Foto` con las propiedades: `id`, `title`, `thumbnailUrl`
3. Crea tres estados:
   - `fotos`: Array de `Foto` (vacío al inicio)
   - `cargando`: Boolean (`true` al inicio)
   - `error`: String (vacío al inicio)
4. Usa `useEffect` para:
   - Hacer fetch a `https://jsonplaceholder.typicode.com/photos`
   - Convertir a JSON
   - Guardar solo las primeras 12 fotos (`.slice(0, 12)`)
   - Poner `cargando` en `false`
   - Manejar errores con `.catch()`
5. Renderiza condicionalmente:
   - Si `cargando`: Mostrar "Cargando fotos..."
   - Si `error`: Mostrar el mensaje de error
   - Si todo ok: Mostrar las fotos (próximo paso)

**Parte 2: Mostrar las fotos** (8 min)

1. En el return (cuando no hay error ni carga), crea:
   - Un `<div>` con clase `galeria-fotos`
   - Un `<h1>` con título "Galería de Fotos"
   - Un `<div>` con clase `fotos-grid`
2. Dentro de `fotos-grid`, mapea el array `fotos`:
   - Por cada foto, renderiza un `<div>` con clase `foto-card`
   - Dentro, una `<img>` con `src={foto.thumbnailUrl}` y `alt={foto.title}`
   - Debajo, un `<p>` con el título (limitado a 50 caracteres: `foto.title.substring(0, 50) + '...'`)
3. No olvides la prop `key={foto.id}` en el div de cada foto

**Parte 3: Estilizar la galería** (10 min)

1. Abre `src/index.css` y añade:
```css
.galeria-fotos {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.galeria-fotos h1 {
  text-align: center;
  margin-bottom: 30px;
}

.fotos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.foto-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  transition: transform 0.2s;
}

.foto-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.foto-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
}

.foto-card p {
  font-size: 14px;
  color: #555;
  margin: 0;
}
```

**Criterio de éxito**:
- [ ] Se cargan 12 fotos de la API JSONPlaceholder
- [ ] Las fotos se muestran en una cuadrícula responsive (3-4 columnas)
- [ ] Cada foto muestra su thumbnail y título (limitado a 50 caracteres)
- [ ] Hay un efecto hover que agranda ligeramente la tarjeta
- [ ] Se muestra "Cargando fotos..." mientras se cargan los datos
- [ ] Si hay un error, se muestra un mensaje apropiado

**Desafío extra** (opcional):
1. Añade un botón "Cargar más" que cargue 12 fotos adicionales cada vez que se presiona
2. Añade filtros: botones para filtrar por `albumId` (mostrar solo fotos del álbum 1, 2, o 3)
3. Implementa un modal: al hacer clic en una foto, muestra la imagen completa (`url` en lugar de `thumbnailUrl`) en un overlay grande
4. Añade un input de búsqueda que filtre las fotos por título en tiempo real

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Las APIs son proveedores de datos externos**: En lugar de escribir todos los datos en tu código, las aplicaciones reales piden información a APIs (servidores) a través de internet. Las APIs retornan datos en formato JSON que puedes usar en tu app.

2. **useEffect ejecuta código en momentos específicos**: Con `useEffect` y un array de dependencias vacío `[]`, ejecutas código una vez cuando el componente se monta. Es ideal para cargar datos al inicio. Sin `useEffect`, intentar hacer fetch directamente en el componente causaría bucles infinitos.

3. **Siempre maneja estados de carga y error**: Las peticiones HTTP toman tiempo y pueden fallar. Usa estados separados para `cargando` y `error`, y muestra mensajes apropiados en cada caso. Esto hace que tu app se sienta profesional y comunique claramente qué está pasando al usuario.

---

## Siguiente paso

En la próxima lección: **"Diseño responsive con Tailwind CSS"**. Aprenderás a usar Tailwind CSS, un framework de CSS moderno que te permite diseñar interfaces hermosas sin salir del HTML. Verás cómo hacer que tus componentes se vean bien en móviles, tablets y escritorio usando clases de utilidad. Es cuando tus apps pasan de funcionales a visualmente impresionantes.

---

**¿Dudas?** Trabajar con APIs puede parecer mágico al principio: haces una petición y aparecen datos de internet. Es normal confundirse con Promises, `.then()`, async/await, y los estados de carga. No te preocupes, con práctica se vuelve segunda naturaleza. Crea componentes que consuman diferentes endpoints de JSONPlaceholder (users, posts, photos, todos, comments) para ganar confianza. Cada petición que hagas te hará sentir más cómodo con el proceso.

