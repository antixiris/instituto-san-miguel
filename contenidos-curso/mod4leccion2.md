<p><strong><em>Componentes reutilizables: El poder de las props</em></strong></p>

## Introducción: De una tarjeta a mil tarjetas

En la lección anterior creaste tu primer componente React. Pero había un problema: el componente `TarjetaPresentacion` siempre mostraba la misma información (el nombre "Juan Pérez"). ¿Qué pasaría si quisieras mostrar 10 tarjetas diferentes con 10 nombres diferentes? ¿Tendrías que crear 10 componentes distintos?

¡Por supuesto que no! Aquí es donde React muestra su verdadero poder. En esta lección aprenderás a crear componentes que funcionan como plantillas: escribes el componente una sola vez, y luego lo usas mil veces con información diferente cada vez.

Piensa en las props como los ingredientes de una receta: la receta (el componente) siempre es la misma, pero puedes usar diferentes ingredientes cada vez que cocinas. Así puedes hacer la misma pizza con diferentes sabores.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Entender qué son las props**: Comprenderás cómo pasar información de un componente padre a un componente hijo usando props (propiedades).
2. **Crear componentes reutilizables**: Construirás componentes que aceptan datos dinámicos y se adaptan a diferentes situaciones.
3. **Usar TypeScript con props**: Aprenderás a definir interfaces que especifican qué props debe recibir un componente, haciendo tu código más seguro.
4. **Reutilizar componentes múltiples veces**: Usarás el mismo componente varias veces con diferentes datos, comprendiendo el verdadero poder de React.

---

## ¿Por qué son importantes las props?

Imagina que trabajas en una imprenta. Tienes una plantilla para tarjetas de presentación con espacios en blanco para el nombre, cargo y teléfono. Cada cliente te da sus datos, tú los colocas en la plantilla, imprimes la tarjeta y listo. No necesitas diseñar una plantilla nueva para cada cliente.

**Las props funcionan exactamente así en React**: son los datos que le pasas a un componente para que se personalice. El componente es la plantilla, las props son la información específica que quieres mostrar.

### La analogía de la máquina de café

Piensa en un componente como una máquina de café:
- **El componente** es la máquina (siempre la misma)
- **Las props** son los botones que presionas (expreso, capuchino, latte)
- **El resultado** es diferente según qué botón presiones, pero la máquina sigue siendo la misma

```
Componente Tarjeta + Props (nombre: "Ana") = Tarjeta de Ana
Componente Tarjeta + Props (nombre: "Luis") = Tarjeta de Luis
Componente Tarjeta + Props (nombre: "María") = Tarjeta de María
```

### 📊 Un dato interesante

El concepto de props es tan fundamental en React que absolutamente todas las aplicaciones profesionales lo usan. Sin props, React sería solo un sistema de plantillas estáticas sin ninguna ventaja. Las props son lo que permite que Netflix muestre miles de tarjetas de películas usando un solo componente de tarjeta.

---

## Concepto 1: ¿Qué son las props?

**Props** es la abreviatura de "properties" (propiedades en inglés). Son la forma en que pasas información de un componente padre a un componente hijo.

### Visualización: Componente padre e hijo

```
┌─────────────────── App (padre) ───────────────────┐
│                                                    │
│  "Quiero mostrar una tarjeta con el nombre Ana"   │
│                                                    │
│          ↓ (pasa props)                            │
│                                                    │
│   ┌────── Tarjeta (hijo) ──────┐                  │
│   │                             │                  │
│   │  Recibe: nombre = "Ana"     │                  │
│   │  Muestra: "Hola, soy Ana"   │                  │
│   │                             │                  │
│   └─────────────────────────────┘                  │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Ejemplo: Componente sin props vs. con props

**Sin props** (información fija, no reutilizable):
```tsx
function Saludo() {
  return <h1>Hola, Ana</h1>;
}

// Solo puedes mostrar "Hola, Ana" siempre
```

**Con props** (información dinámica, súper reutilizable):
```tsx
function Saludo(props) {
  return <h1>Hola, {props.nombre}</h1>;
}

// Ahora puedes usarlo así:
<Saludo nombre="Ana" />     // Muestra: "Hola, Ana"
<Saludo nombre="Luis" />    // Muestra: "Hola, Luis"
<Saludo nombre="María" />   // Muestra: "Hola, María"
```

**Nota importante**: Ves las llaves `{}` alrededor de `{props.nombre}`? Esas llaves le dicen a JSX: "Aquí viene código JavaScript, no texto literal". Es como decir "evalúa esta variable" en lugar de escribir literalmente "props.nombre".

---

## Concepto 2: Pasar y recibir props

Vamos a ver cómo se pasan props de padre a hijo paso a paso.

### Ejemplo: Componente Tarjeta con props

**Paso 1**: Crear el componente hijo que recibe props

Crea un archivo `src/TarjetaUsuario.tsx`:

```tsx
function TarjetaUsuario(props) {
  return (
    <div className="tarjeta">
      <h2>{props.nombre}</h2>
      <p>Edad: {props.edad} años</p>
      <p>Ciudad: {props.ciudad}</p>
    </div>
  );
}

export default TarjetaUsuario;
```

**Explicación línea por línea**:

- **Línea 1** (`function TarjetaUsuario(props) {`): El componente recibe un parámetro llamado `props`. Este parámetro es un objeto que contiene todas las propiedades que le pases.

- **Línea 3** (`<h2>{props.nombre}</h2>`): Accede a la propiedad `nombre` del objeto `props` y la muestra. Las llaves `{}` indican que es JavaScript, no texto.

- **Línea 4** (`<p>Edad: {props.edad} años</p>`): Muestra la prop `edad`. Puedes mezclar texto normal ("Edad: ") con props (`{props.edad}`).

- **Línea 5** (`<p>Ciudad: {props.ciudad}</p>`): Muestra la prop `ciudad`.

**En resumen**: `props` es un objeto con todas las propiedades. Si le pasas `nombre="Ana"`, entonces `props.nombre` será `"Ana"`.

**Paso 2**: Usar el componente hijo desde el padre

En `src/App.tsx`:

```tsx
import TarjetaUsuario from './TarjetaUsuario';

function App() {
  return (
    <div>
      <h1>Listado de usuarios</h1>
      <TarjetaUsuario
        nombre="Ana García"
        edad={28}
        ciudad="Madrid"
      />
    </div>
  );
}

export default App;
```

**Explicación línea por línea**:

- **Líneas 7-11** (`<TarjetaUsuario ... />`): Usas el componente como una etiqueta HTML. Cada atributo que pones (`nombre="Ana García"`, `edad={28}`, etc.) se convierte en una propiedad dentro del objeto `props`.

- **Línea 8** (`nombre="Ana García"`): Pasas una prop llamada `nombre` con el valor `"Ana García"` (texto).

- **Línea 9** (`edad={28}`): Pasas una prop llamada `edad` con el valor numérico `28`. Nota las llaves: se usan para valores que NO son texto (números, booleanos, variables, etc.).

- **Línea 10** (`ciudad="Madrid"`): Pasas una prop llamada `ciudad` con el valor `"Madrid"`.

**Resultado**: Verás en el navegador una tarjeta que muestra "Ana García", "Edad: 28 años" y "Ciudad: Madrid".

---

## Concepto 3: TypeScript e interfaces para props

Hasta ahora usamos `props` sin especificar qué propiedades debe tener. TypeScript nos permite ser más específicos y evitar errores.

### ¿Por qué usar interfaces con props?

Sin especificar el tipo de `props`, podrías cometer errores como:
- Olvidar pasar una prop necesaria
- Pasar una prop con el tipo equivocado (texto en lugar de número)
- Tener un typo en el nombre de la prop (`nomre` en lugar de `nombre`)

**Las interfaces son como contratos**: definen exactamente qué props debe recibir el componente y de qué tipo.

### Ejemplo: TarjetaUsuario con TypeScript

**Modifica `src/TarjetaUsuario.tsx`** para usar TypeScript:

```tsx
interface TarjetaUsuarioProps {
  nombre: string;
  edad: number;
  ciudad: string;
}

function TarjetaUsuario(props: TarjetaUsuarioProps) {
  return (
    <div className="tarjeta">
      <h2>{props.nombre}</h2>
      <p>Edad: {props.edad} años</p>
      <p>Ciudad: {props.ciudad}</p>
    </div>
  );
}

export default TarjetaUsuario;
```

**Explicación línea por línea**:

- **Líneas 1-4** (`interface TarjetaUsuarioProps { ... }`): Define una interface (un contrato) que especifica qué propiedades debe tener el objeto `props`:
  - `nombre` debe ser un `string` (texto)
  - `edad` debe ser un `number` (número)
  - `ciudad` debe ser un `string` (texto)

- **Línea 7** (`function TarjetaUsuario(props: TarjetaUsuarioProps)`): Especifica que el parámetro `props` debe cumplir con la interface `TarjetaUsuarioProps`. Ahora TypeScript verificará que recibas las props correctas.

**Beneficio**: Si en `App.tsx` te olvidas de pasar una prop, o pasas un tipo incorrecto, VS Code te mostrará un error ANTES de ejecutar el código:

```tsx
// ¡Error! Falta la prop 'ciudad'
<TarjetaUsuario nombre="Ana" edad={28} />

// ¡Error! 'edad' debe ser number, no string
<TarjetaUsuario nombre="Ana" edad="28" ciudad="Madrid" />
```

### Desestructuración de props (forma más limpia)

Hay una forma más elegante de trabajar con props usando **desestructuración**:

**En lugar de esto**:
```tsx
function TarjetaUsuario(props: TarjetaUsuarioProps) {
  return <h2>{props.nombre}</h2>;
}
```

**Puedes escribir esto** (más limpio):
```tsx
function TarjetaUsuario({ nombre, edad, ciudad }: TarjetaUsuarioProps) {
  return (
    <div className="tarjeta">
      <h2>{nombre}</h2>
      <p>Edad: {edad} años</p>
      <p>Ciudad: {ciudad}</p>
    </div>
  );
}
```

**Qué cambió**: En lugar de escribir `props.nombre`, `props.edad`, etc., extraes directamente las propiedades en los parámetros de la función. Ahora usas `nombre`, `edad`, `ciudad` directamente sin el `props.` delante.

Es como abrir una caja y sacar directamente lo que necesitas, en lugar de tener que decir "la caja punto nombre", "la caja punto edad".

---

## Práctica guiada: Componente de tarjeta de producto

Vamos a crear un componente reutilizable para mostrar productos de una tienda online. Lo usaremos 3 veces con diferentes productos.

### Paso 1 de 3: Crear el componente TarjetaProducto

**Lo que harás**:
1. Crear un nuevo archivo `src/TarjetaProducto.tsx`
2. Definir la interface para las props
3. Crear el componente que muestra la información del producto

**Tu código debería verse así** (`src/TarjetaProducto.tsx`):

```tsx
interface TarjetaProductoProps {
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
}

function TarjetaProducto({ nombre, precio, descripcion, imagen }: TarjetaProductoProps) {
  return (
    <div className="tarjeta-producto">
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p className="descripcion">{descripcion}</p>
      <p className="precio">${precio}</p>
    </div>
  );
}

export default TarjetaProducto;
```

**Explicación**:
- **Líneas 1-5**: Interface que define las 4 props necesarias (nombre, precio, descripción, imagen).
- **Línea 8**: Función componente con desestructuración de props.
- **Línea 11**: Etiqueta `<img>` que usa la prop `imagen` como `src` y `nombre` como texto alternativo.
- **Líneas 12-14**: Muestran nombre, descripción y precio usando las props.

**Checkpoint**: El componente está creado pero aún no se usa. Vamos al siguiente paso.

### Paso 2 de 3: Usar el componente múltiples veces

**Lo que harás**:
1. Importar `TarjetaProducto` en `App.tsx`
2. Usar el componente 3 veces con diferentes productos
3. Verificar que los 3 productos se muestran

**Modifica `src/App.tsx`**:

```tsx
import TarjetaProducto from './TarjetaProducto';

function App() {
  return (
    <div className="app">
      <h1>Nuestra tienda</h1>

      <TarjetaProducto
        nombre="Laptop Pro 15"
        precio={1299}
        descripcion="Laptop potente para desarrollo"
        imagen="https://via.placeholder.com/300x200"
      />

      <TarjetaProducto
        nombre="Mouse Inalámbrico"
        precio={29}
        descripcion="Mouse ergonómico con 6 botones"
        imagen="https://via.placeholder.com/300x200"
      />

      <TarjetaProducto
        nombre="Teclado Mecánico"
        precio={149}
        descripcion="Teclado retroiluminado RGB"
        imagen="https://via.placeholder.com/300x200"
      />
    </div>
  );
}

export default App;
```

**Explicación**:
- **Líneas 8-13**: Primer uso del componente con datos de una laptop.
- **Líneas 15-20**: Segundo uso del componente con datos de un mouse.
- **Líneas 22-27**: Tercer uso del componente con datos de un teclado.
- **Nota**: Usamos `https://via.placeholder.com/300x200` como imagen temporal (es un servicio que genera imágenes placeholder).

**Checkpoint**: Guarda y mira el navegador. Deberías ver 3 tarjetas, una debajo de la otra, cada una con información diferente.

### Paso 3 de 3: Añadir estilos atractivos

**Lo que harás**:
1. Añadir CSS para que las tarjetas se vean profesionales
2. Usar un layout de cuadrícula para que estén una al lado de la otra

**Añade esto a `src/index.css`**:

```css
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.app h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.tarjeta-producto {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 15px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.tarjeta-producto:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.tarjeta-producto img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 15px;
}

.tarjeta-producto h3 {
  color: #2c3e50;
  margin: 10px 0;
}

.tarjeta-producto .descripcion {
  color: #666;
  font-size: 14px;
  margin: 10px 0;
}

.tarjeta-producto .precio {
  color: #27ae60;
  font-size: 24px;
  font-weight: bold;
  margin-top: 15px;
}
```

**Explicación de estilos clave**:
- **`.tarjeta-producto:hover`**: Cuando pasas el mouse sobre la tarjeta, se eleva ligeramente (`transform: translateY(-5px)`). Esto crea un efecto interactivo moderno.
- **`transition: transform 0.2s`**: Hace que el efecto de elevación sea suave, no brusco.
- **`object-fit: cover`**: Asegura que las imágenes se ajusten bien al contenedor sin deformarse.

**Checkpoint**: Las tarjetas ahora tienen bordes, sombras, y un efecto de elevación cuando pasas el mouse. Se ven profesionales.

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: "Property 'nombre' does not exist on type '{}'"

**Te pasa cuando**: Defines props en TypeScript pero no especificas el tipo correctamente.

**El mensaje de error que ves**:
```
Property 'nombre' does not exist on type '{}'
```

**Por qué pasa**: TypeScript no sabe qué propiedades tiene `props` porque no definiste una interface o no la aplicaste.

**Cómo se soluciona**:
1. Define una interface con todas las props:
```tsx
interface MisProps {
  nombre: string;
  edad: number;
}
```
2. Aplica la interface al parámetro `props`:
```tsx
function MiComponente(props: MisProps) { ... }
// O con desestructuración:
function MiComponente({ nombre, edad }: MisProps) { ... }
```

### Error #2: "Type 'string' is not assignable to type 'number'"

**Te pasa cuando**: Pasas una prop con el tipo incorrecto.

**El mensaje de error que ves**:
```
Type 'string' is not assignable to type 'number'
```

**Por qué pasa**: La interface dice que la prop debe ser un `number`, pero le pasaste un `string` (texto).

**Ejemplo que causa error**:
```tsx
// La interface dice: edad: number
<TarjetaUsuario nombre="Ana" edad="28" ciudad="Madrid" />
//                                    ^^^^
// Error: "28" es string, no number
```

**Cómo se soluciona**:
Usa llaves `{}` para valores numéricos:
```tsx
<TarjetaUsuario nombre="Ana" edad={28} ciudad="Madrid" />
//                                 ^^^^
// Correcto: 28 sin comillas es un number
```

**Regla general**:
- Texto: `nombre="Ana"` (con comillas, sin llaves)
- Números: `edad={28}` (sin comillas, con llaves)
- Booleanos: `activo={true}` (con llaves)
- Variables: `nombre={nombreVariable}` (con llaves)

### Error #3: "Missing props: 'ciudad'"

**Te pasa cuando**: Olvidas pasar una prop requerida.

**El mensaje de error que ves**:
```
Type '{ nombre: string; edad: number; }' is missing the following properties from type 'TarjetaUsuarioProps': ciudad
```

**Por qué pasa**: La interface dice que `ciudad` es obligatoria, pero no la pasaste.

**Cómo se soluciona**:

**Opción 1**: Pasa la prop que falta:
```tsx
<TarjetaUsuario nombre="Ana" edad={28} ciudad="Madrid" />
```

**Opción 2**: Si la prop es opcional, márcala como tal en la interface:
```tsx
interface TarjetaUsuarioProps {
  nombre: string;
  edad: number;
  ciudad?: string;  // El signo ? la hace opcional
}
```

Ahora puedes usarla sin esa prop:
```tsx
<TarjetaUsuario nombre="Ana" edad={28} />
```

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: Al principio es común confundir cuándo usar comillas y cuándo usar llaves. Memoriza esto: texto entre comillas sin llaves (`nombre="Ana"`), todo lo demás con llaves (`edad={28}`, `activo={true}`, `datos={miVariable}`).

> **Otro tip importante**: Las props fluyen en UNA sola dirección: de padre a hijo. Un componente hijo NO puede modificar las props que recibe. Las props son como un mensaje de solo lectura. Si necesitas que el hijo afecte al padre, lo veremos en lecciones futuras con funciones callback.

> **Sobre los nombres de interfaces**: Es convención nombrar las interfaces de props con el patrón `NombreComponenteProps`. Por ejemplo: `TarjetaUsuarioProps`, `BotonProps`, `ListaProductosProps`. Esto hace que sea obvio para qué sirve cada interface.

> **Desestructuración vs props**: Ambas formas funcionan igual. `props.nombre` es más explícito (ves claramente que viene de props). `{ nombre }` es más conciso (menos texto). En proyectos profesionales se usa más la desestructuración porque es más limpio.

---

## Tu turno: Ejercicio guiado

**Objetivo simple**: Crear un componente `TarjetaPelicula` que muestre información de películas y usarlo para crear una lista de 4 películas.

**Tiempo**: 25-30 minutos

**Lo que necesitas antes de empezar**:
- [ ] Proyecto React funcionando (`npm run dev`)
- [ ] VS Code abierto
- [ ] Conocimiento de props y interfaces de la lección

### Instrucciones paso a paso

**Parte 1: Crear el componente** (10 min)

1. Crea un archivo `src/TarjetaPelicula.tsx`
2. Define una interface `TarjetaPeliculaProps` con estas propiedades:
   - `titulo` (string): Título de la película
   - `director` (string): Nombre del director
   - `año` (number): Año de estreno
   - `genero` (string): Género de la película
   - `calificacion` (number): Calificación de 1 a 10
3. Crea el componente `TarjetaPelicula` que:
   - Use desestructuración de props
   - Muestre toda la información en un `<div>` con clase `tarjeta-pelicula`
   - Incluya un `<h3>` para el título
   - Muestre el resto de información en párrafos `<p>`
   - La calificación debe mostrarse como "Calificación: 8.5/10"
4. Exporta el componente

**Parte 2: Usar el componente** (8 min)

1. Abre `src/App.tsx`
2. Importa `TarjetaPelicula`
3. Crea un `<div>` con clase `galeria-peliculas`
4. Dentro, usa el componente 4 veces con estas películas (o inventa las tuyas):
   - Inception (Christopher Nolan, 2010, Ciencia ficción, 8.8)
   - El Padrino (Francis Ford Coppola, 1972, Drama, 9.2)
   - Parasite (Bong Joon-ho, 2019, Thriller, 8.5)
   - Toy Story (John Lasseter, 1995, Animación, 8.3)

**Parte 3: Estilizar** (10 min)

1. Abre `src/index.css`
2. Añade estilos para `.galeria-peliculas` que:
   - Use `display: flex` y `flex-wrap: wrap` para crear un grid
   - Tenga `gap: 20px` para separar las tarjetas
   - Tenga `padding: 20px`
3. Añade estilos para `.tarjeta-pelicula` que:
   - Tenga `border`, `border-radius`, `padding` y `background-color`
   - Tenga `width: calc(50% - 10px)` para que quepan 2 por fila
   - Tenga un efecto hover que cambie el color de fondo
4. Estiliza el `.tarjeta-pelicula h3` con un color distintivo
5. Estiliza los elementos para que la calificación se vea destacada (color verde, negrita)

**Criterio de éxito**:
- [ ] Se muestran 4 tarjetas de películas en el navegador
- [ ] Cada tarjeta muestra título, director, año, género y calificación
- [ ] Las tarjetas están organizadas en 2 columnas
- [ ] Al pasar el mouse sobre una tarjeta, cambia visualmente
- [ ] La calificación se ve destacada (color verde y negrita)
- [ ] No hay errores en la consola ni errores de TypeScript en VS Code

**Desafío extra** (opcional):
1. Añade una prop `poster` (string con URL de imagen) a la interface
2. Muestra una imagen del poster en cada tarjeta (usa `https://via.placeholder.com/200x300` como placeholder)
3. Añade una prop opcional `visto` (boolean) que, si es `true`, muestre una etiqueta "Ya vista" en la esquina de la tarjeta

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Las props son datos que pasas a componentes**: Las props permiten que un componente sea reutilizable con diferentes datos. Son como ingredientes que le pasas a una receta. El componente padre pasa props al hijo, y el hijo las recibe como un objeto.

2. **TypeScript hace las props más seguras**: Usando interfaces, defines exactamente qué props debe recibir un componente y de qué tipo. TypeScript te avisa si olvidas una prop o pasas el tipo incorrecto, evitando errores antes de ejecutar el código.

3. **Un componente, mil usos**: Con props, escribes un componente una sola vez y lo usas cuantas veces quieras con datos diferentes. Esto es el corazón de React: reutilización eficiente de código. Netflix usa un solo componente de tarjeta de película para mostrar miles de películas diferentes.

---

## Siguiente paso

En la próxima lección: **"Estado y hooks en React"**. Aprenderás a hacer que tus componentes sean interactivos y puedan "recordar" información. Crearás botones que responden a clics, contadores que aumentan y disminuyen, y formularios que actualizan su contenido mientras escribes. Es cuando tus componentes cobran vida y dejan de ser estáticos.

---

**¿Dudas?** Las props son uno de los conceptos más importantes de React, así que es normal que tome tiempo dominarlas completamente. Si algo no te quedó claro, crea componentes simples y practica pasándoles diferentes props. Cambia los valores, añade nuevas props, experimenta. La mejor forma de aprender props es usándolas en la práctica. En unos días te parecerá tan natural como respirar.
