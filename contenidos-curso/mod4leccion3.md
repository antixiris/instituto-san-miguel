<p><strong><em>Estado y hooks: Haciendo componentes interactivos</em></strong></p>

## Introducción: De estático a dinámico

Hasta ahora has creado componentes que muestran información, pero son completamente estáticos. Es como tener una revista impresa: puedes leerla, pero no puedes interactuar con ella. ¿Qué pasaría si quisieras crear un contador que aumenta al hacer clic en un botón? ¿O un formulario donde el texto que escribes aparece en tiempo real en otro lugar? ¿O un botón que cambia de color al presionarlo?

Aquí es donde entra el **estado** (state en inglés). El estado es la memoria de tu componente, la forma en que React recuerda información que puede cambiar con el tiempo. Y para manejar el estado, usaremos nuestro primer **hook**: `useState`.

En esta lección transformarás tus componentes estáticos en aplicaciones interactivas que responden a las acciones del usuario. Es el momento en que tus componentes cobran vida.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Entender qué es el estado**: Comprenderás el concepto de estado como la "memoria" de un componente que puede cambiar con el tiempo.
2. **Usar el hook useState**: Aprenderás a declarar estado en tus componentes usando el hook `useState` de React.
3. **Actualizar el estado**: Sabrás cómo modificar el estado en respuesta a eventos del usuario (clics, cambios en inputs, etc.).
4. **Crear componentes interactivos**: Construirás contadores, toggles y formularios simples que reaccionan a las acciones del usuario.

---

## ¿Por qué es importante el estado?

Imagina que estás jugando un videojuego. El juego necesita recordar tu puntuación, tu nivel, tu vida restante, qué items tienes en el inventario. Si el juego no pudiera recordar nada, cada vez que tocaras un botón todo volvería a cero. ¡Sería imposible jugar!

**El estado en React funciona igual**: es la memoria del componente. Le permite recordar información importante y actualizar la interfaz cuando esa información cambia.

### La analogía del semáforo

Piensa en un semáforo:
- **Estado actual**: Verde, amarillo o rojo
- **Evento**: Pasa el tiempo
- **Cambio de estado**: Verde → Amarillo → Rojo → Verde

El semáforo necesita "recordar" en qué color está para saber cuál mostrar a continuación. Esa memoria es el estado.

```
Estado: "verde"  →  Usuario hace clic  →  Estado: "amarillo"  →  La interfaz se actualiza
```

### 📊 Un dato interesante

El hook `useState` se introdujo en React en 2019 con los "Hooks". Antes de eso, manejar estado era mucho más complicado y requería clases en lugar de funciones. Los hooks revolucionaron React haciéndolo más simple y accesible. Hoy, el 95% de los desarrolladores React usan hooks en lugar del sistema antiguo.

---

## Concepto 1: ¿Qué es el estado?

**El estado es información que un componente recuerda y que puede cambiar con el tiempo**. Cuando el estado cambia, React automáticamente vuelve a renderizar (redibujar) el componente para reflejar el nuevo estado en la pantalla.

### Estado vs. Props: ¿Cuál es la diferencia?

Es importante entender la diferencia:

| **Props** | **Estado** |
|-----------|-----------|
| Vienen del componente padre | Viven dentro del componente |
| Son de solo lectura (no se pueden modificar) | Se pueden modificar |
| Como argumentos de una función | Como variables que puedes cambiar |
| Ejemplo: `<Saludo nombre="Ana" />` | Ejemplo: Contador que aumenta |

**Analogía simple**:
- **Props**: Son como los ingredientes que te dan para cocinar (no los puedes cambiar, solo usarlos).
- **Estado**: Es como el progreso de tu receta (va cambiando conforme cocinas).

### Visualización: Componente con estado

```
┌──────── Componente Contador ────────┐
│                                      │
│  Estado: contador = 5                │  ← Memoria del componente
│                                      │
│  Interfaz: "Has hecho clic 5 veces"  │  ← Lo que se muestra
│                                      │
│  [Botón: Incrementar]                │  ← Usuario hace clic
│                                      │
│         ↓ (evento clic)              │
│                                      │
│  Estado: contador = 6                │  ← Estado actualizado
│  Interfaz se actualiza automática-   │
│  mente a: "Has hecho clic 6 veces"   │
│                                      │
└──────────────────────────────────────┘
```

---

## Concepto 2: El hook useState

**Un hook es una función especial de React que te da superpoderes**. El hook `useState` es el más básico y te permite añadir estado a tus componentes.

### ¿Por qué se llama "hook"?

En inglés, "hook" significa gancho. Los hooks "enganchan" funcionalidades de React a tus componentes. `useState` engancha la capacidad de recordar información.

**Todos los hooks empiezan con "use"**: `useState`, `useEffect`, `useContext`, etc. Es fácil identificarlos.

### Sintaxis básica de useState

```tsx
const [variable, setVariable] = useState(valorInicial);
```

Esto puede verse raro al principio. Vamos a desglosarlo:

**Ejemplo concreto**:
```tsx
const [contador, setContador] = useState(0);
```

**Explicación parte por parte**:

1. **`useState(0)`**: Llamas a la función `useState` con el valor inicial (en este caso `0`). Este es el valor que tendrá la variable al inicio.

2. **`[contador, setContador]`**: `useState` retorna un array con DOS cosas:
   - **Posición 0** (`contador`): La variable que contiene el valor actual del estado.
   - **Posición 1** (`setContador`): Una función que usas para actualizar el estado.

3. **`const [contador, setContador] =`**: Esto es "desestructuración de array". Extraes las dos cosas que retorna `useState` y les das nombres.

**Analogía del cajón con candado**:
- `contador`: Es mirar dentro del cajón para ver qué hay.
- `setContador`: Es la ÚNICA llave que puede abrir el cajón y cambiar su contenido.
- `useState(0)`: Crea el cajón con un valor inicial de `0` dentro.

### Ejemplo completo: Contador simple

Crea un archivo `src/Contador.tsx`:

```tsx
import { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Has hecho clic {contador} veces</p>
      <button onClick={() => setContador(contador + 1)}>
        Incrementar
      </button>
    </div>
  );
}

export default Contador;
```

**Explicación línea por línea**:

- **Línea 1** (`import { useState } from 'react';`): Importa el hook `useState` desde React. Las llaves `{}` indican que importas una exportación nombrada (no es el export default).

- **Línea 4** (`const [contador, setContador] = useState(0);`): Crea una variable de estado llamada `contador` con valor inicial `0`, y una función `setContador` para actualizarla.

- **Línea 8** (`<p>Has hecho clic {contador} veces</p>`): Muestra el valor actual de `contador`.

- **Línea 9** (`onClick={() => setContador(contador + 1)}`): Cuando se hace clic en el botón:
  - `onClick`: Prop especial que ejecuta una función cuando se hace clic.
  - `() => ...`: Arrow function (función flecha) que se ejecuta al hacer clic.
  - `setContador(contador + 1)`: Actualiza el estado sumándole 1 al valor actual.

**Resultado**: Cada vez que haces clic en el botón, el número aumenta en 1. React automáticamente actualiza la interfaz.

---

## Concepto 3: Actualizar el estado correctamente

Hay reglas importantes al actualizar el estado. Romper estas reglas puede causar bugs difíciles de encontrar.

### Regla #1: NUNCA modifiques el estado directamente

**INCORRECTO** (esto NO funciona):
```tsx
const [contador, setContador] = useState(0);

// ❌ MAL: Intentar cambiar el estado directamente
contador = contador + 1;  // ¡No funciona! React no se entera del cambio
```

**CORRECTO**:
```tsx
const [contador, setContador] = useState(0);

// ✅ BIEN: Usar la función set para actualizar
setContador(contador + 1);  // React detecta el cambio y actualiza la interfaz
```

**Por qué**: React necesita que uses la función `set` para saber que el estado cambió. Si modificas la variable directamente, React no se entera y no actualiza la pantalla.

### Regla #2: El estado es asíncrono

Cuando actualizas el estado, el cambio no es inmediato. React lo programa para después.

**Ejemplo que confunde**:
```tsx
const [contador, setContador] = useState(0);

function incrementar() {
  setContador(contador + 1);
  console.log(contador);  // ¡Todavía muestra el valor VIEJO!
}
```

**Por qué**: `console.log` se ejecuta inmediatamente después de llamar `setContador`, pero React aún no ha actualizado el valor. El nuevo valor estará disponible en el siguiente renderizado.

**No te preocupes por esto ahora**: Solo recuerda que el estado se actualiza "eventualmente", no al instante.

### Regla #3: Usa la forma funcional para actualizar basándote en el valor anterior

Si el nuevo estado depende del estado anterior, usa una función:

**Forma básica** (funciona en casos simples):
```tsx
setContador(contador + 1);
```

**Forma funcional** (más segura, especialmente para múltiples actualizaciones):
```tsx
setContador(prevContador => prevContador + 1);
```

La forma funcional recibe el valor anterior como parámetro y retorna el nuevo valor.

**Cuándo usar cuál**: Para este curso, la forma básica es suficiente. La forma funcional es importante en casos avanzados que veremos más adelante.

---

## Práctica guiada: Componentes interactivos

Vamos a crear tres componentes interactivos diferentes para practicar `useState` en distintas situaciones.

### Paso 1 de 3: Contador con incremento y decremento

**Lo que harás**:
1. Crear un componente que tenga un contador
2. Añadir botones para incrementar, decrementar y resetear
3. Verificar que funciona correctamente

**Crea el archivo `src/ContadorCompleto.tsx`**:

```tsx
import { useState } from 'react';

function ContadorCompleto() {
  const [contador, setContador] = useState(0);

  return (
    <div className="contador">
      <h2>Contador: {contador}</h2>
      <button onClick={() => setContador(contador + 1)}>
        + Incrementar
      </button>
      <button onClick={() => setContador(contador - 1)}>
        - Decrementar
      </button>
      <button onClick={() => setContador(0)}>
        Resetear
      </button>
    </div>
  );
}

export default ContadorCompleto;
```

**Explicación**:
- **Línea 4**: Estado inicial en `0`.
- **Línea 8**: Muestra el valor actual del contador.
- **Líneas 9-11**: Botón que suma 1.
- **Líneas 12-14**: Botón que resta 1.
- **Líneas 15-17**: Botón que resetea a 0.

**Checkpoint**: Importa este componente en `App.tsx` y úsalo. Los tres botones deben funcionar correctamente.

### Paso 2 de 3: Toggle (mostrar/ocultar contenido)

**Lo que harás**:
1. Crear un componente con un estado booleano (verdadero/falso)
2. Un botón que alterna entre mostrar y ocultar contenido
3. Usar renderizado condicional

**Crea el archivo `src/Toggle.tsx`**:

```tsx
import { useState } from 'react';

function Toggle() {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div className="toggle">
      <button onClick={() => setMostrar(!mostrar)}>
        {mostrar ? 'Ocultar' : 'Mostrar'} contenido
      </button>

      {mostrar && (
        <div className="contenido">
          <p>¡Este contenido se puede mostrar y ocultar!</p>
          <p>Presiona el botón de nuevo para ocultarme.</p>
        </div>
      )}
    </div>
  );
}

export default Toggle;
```

**Explicación línea por línea**:

- **Línea 4** (`const [mostrar, setMostrar] = useState(false);`): Estado booleano que empieza en `false` (oculto).

- **Línea 8** (`onClick={() => setMostrar(!mostrar)}`): Al hacer clic, invierte el valor. Si era `true` se vuelve `false`, y viceversa. El operador `!` significa "NOT" (lo contrario).

- **Línea 9** (`{mostrar ? 'Ocultar' : 'Mostrar'}`): Operador ternario. Si `mostrar` es `true`, muestra "Ocultar", si no, muestra "Mostrar".

- **Líneas 12-17** (`{mostrar && ( ... )}`): Renderizado condicional. Solo renderiza el contenido si `mostrar` es `true`. El operador `&&` significa "Y": si `mostrar` es verdadero, renderiza lo que sigue.

**Checkpoint**: El botón debe cambiar su texto entre "Mostrar" y "Ocultar", y el contenido debe aparecer/desaparecer al hacer clic.

### Paso 3 de 3: Input controlado (formulario simple)

**Lo que harás**:
1. Crear un input donde el usuario puede escribir
2. El estado guarda lo que el usuario escribe
3. Mostrar el texto en tiempo real en otro lugar

**Crea el archivo `src/Formulario.tsx`**:

```tsx
import { useState } from 'react';

function Formulario() {
  const [nombre, setNombre] = useState('');

  return (
    <div className="formulario">
      <h3>Escribe tu nombre:</h3>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Escribe aquí..."
      />
      <p>Hola, {nombre || 'desconocido'}!</p>
    </div>
  );
}

export default Formulario;
```

**Explicación línea por línea**:

- **Línea 4** (`const [nombre, setNombre] = useState('');`): Estado inicial es una cadena vacía `''`.

- **Línea 11** (`value={nombre}`): El valor del input está controlado por el estado. Esto lo convierte en un "componente controlado".

- **Línea 12** (`onChange={(e) => setNombre(e.target.value)}`):
  - `onChange`: Se ejecuta cada vez que el usuario escribe algo.
  - `e`: Objeto evento que contiene información sobre el cambio.
  - `e.target.value`: El nuevo valor del input (lo que el usuario escribió).
  - `setNombre(e.target.value)`: Actualiza el estado con el nuevo valor.

- **Línea 15** (`{nombre || 'desconocido'}`): Si `nombre` está vacío, muestra "desconocido". El operador `||` significa "O": usa `nombre` si existe, si no usa `'desconocido'`.

**Checkpoint**: Mientras escribes en el input, el texto "Hola, [tu nombre]!" debe actualizarse en tiempo real.

**Añade estilos en `src/index.css`**:

```css
.contador, .toggle, .formulario {
  border: 2px solid #3498db;
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
  max-width: 400px;
}

.contador h2 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.contador button, .toggle button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.contador button:hover, .toggle button:hover {
  background-color: #2980b9;
}

.toggle .contenido {
  margin-top: 15px;
  padding: 15px;
  background-color: #ecf0f1;
  border-radius: 5px;
}

.formulario input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #bdc3c7;
  border-radius: 5px;
  margin: 10px 0;
}

.formulario input:focus {
  outline: none;
  border-color: #3498db;
}

.formulario p {
  font-size: 18px;
  color: #27ae60;
  font-weight: bold;
}
```

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: "Too many re-renders. React limits the number of renders to prevent an infinite loop"

**Te pasa cuando**: Llamas a la función de actualización del estado directamente en el render (sin un evento).

**El mensaje de error que ves**:
```
Too many re-renders. React limits the number of renders to prevent an infinite loop
```

**Ejemplo que causa error**:
```tsx
function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <button onClick={setContador(contador + 1)}>
        {/* ❌ ERROR: Esto ejecuta setContador inmediatamente */}
        Incrementar
      </button>
    </div>
  );
}
```

**Por qué pasa**: Estás llamando a `setContador(contador + 1)` inmediatamente, no cuando se hace clic. Esto crea un bucle infinito: actualiza estado → componente se re-renderiza → actualiza estado → componente se re-renderiza → infinitamente.

**Cómo se soluciona**:
Envuelve la actualización en una función:
```tsx
<button onClick={() => setContador(contador + 1)}>
  {/* ✅ CORRECTO: Arrow function que se ejecuta al hacer clic */}
  Incrementar
</button>
```

### Error #2: "Cannot read property 'value' of undefined"

**Te pasa cuando**: Intentas acceder a `e.target.value` pero el evento no existe o está mal escrito.

**El mensaje de error que ves**:
```
Cannot read property 'value' of undefined
```

**Ejemplo que causa error**:
```tsx
<input onChange={(event) => setNombre(e.target.value)} />
{/* ❌ ERROR: El parámetro se llama 'event' pero usas 'e' */}
```

**Cómo se soluciona**:
Asegúrate de que el nombre del parámetro coincide:
```tsx
<input onChange={(e) => setNombre(e.target.value)} />
{/* ✅ CORRECTO: Usas el mismo nombre 'e' */}
```

### Error #3: "React Hook 'useState' is called conditionally"

**Te pasa cuando**: Usas `useState` dentro de un `if`, loop, o función anidada.

**El mensaje de error que ves**:
```
React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render
```

**Ejemplo que causa error**:
```tsx
function MiComponente() {
  if (algunaCondicion) {
    const [estado, setEstado] = useState(0);  // ❌ ERROR
  }
}
```

**Por qué pasa**: Los hooks DEBEN llamarse siempre en el mismo orden en cada render. No pueden estar dentro de condiciones o loops.

**Cómo se soluciona**:
Llama a los hooks en el nivel superior de la función:
```tsx
function MiComponente() {
  const [estado, setEstado] = useState(0);  // ✅ CORRECTO

  if (algunaCondicion) {
    // Usa el estado aquí si es necesario
  }
}
```

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: El error más común es escribir `onClick={setContador(contador + 1)}` sin las llaves de arrow function. Recuerda: `onClick` espera una FUNCIÓN, no el resultado de ejecutar una función. Usa `onClick={() => setContador(contador + 1)}` para darle una función que se ejecutará después, no ahora.

> **Otro tip importante**: Nombra tus funciones `set` de forma consistente. Si el estado se llama `contador`, la función debe ser `setContador`. Si el estado es `nombre`, la función es `setNombre`. Esta convención hace que el código sea más fácil de leer.

> **Sobre inputs controlados**: Un input controlado (donde `value={estado}`) siempre refleja el estado de React, no el DOM del navegador. Esto te da control total sobre el input. Si no pones `onChange`, el input será de solo lectura porque el estado nunca cambia.

> **Debugging del estado**: Si no sabes por qué el estado no se actualiza, añade un `console.log` justo después de llamar la función set, pero recuerda que el valor NO habrá cambiado aún (es asíncrono). Para ver el nuevo valor, usa `console.log(nuevoValor)` antes de pasarlo a la función set.

---

## Tu turno: Ejercicio guiado

**Objetivo simple**: Crear un componente "ListaTareas" donde puedas añadir tareas a una lista, marcarlas como completadas y eliminarlas.

**Tiempo**: 30-35 minutos

**Lo que necesitas antes de empezar**:
- [ ] Proyecto React funcionando
- [ ] Conocimiento de `useState` de esta lección
- [ ] Conocimiento de arrays en JavaScript (módulo 2)

### Instrucciones paso a paso

**Parte 1: Estructura básica** (12 min)

1. Crea un archivo `src/ListaTareas.tsx`
2. Importa `useState`
3. Define DOS estados:
   - `tareas`: Un array de strings (empieza vacío: `[]`)
   - `nuevaTarea`: Un string (empieza vacío: `''`)
4. Crea un formulario con:
   - Un input controlado conectado a `nuevaTarea`
   - Un botón que añada la tarea al array `tareas` (usa `setTareas([...tareas, nuevaTarea])`)
   - Después de añadir, resetea `nuevaTarea` a cadena vacía
5. Muestra la lista de tareas usando `.map()`:
```tsx
<ul>
  {tareas.map((tarea, index) => (
    <li key={index}>{tarea}</li>
  ))}
</ul>
```

**Parte 2: Funcionalidad de eliminar** (10 min)

1. Añade un botón "Eliminar" al lado de cada tarea
2. Cuando se haga clic, elimina esa tarea del array
3. Pista: Usa `filter` para crear un nuevo array sin ese elemento:
```tsx
const eliminarTarea = (indexEliminar) => {
  setTareas(tareas.filter((_, index) => index !== indexEliminar));
};
```
4. Conecta el botón: `onClick={() => eliminarTarea(index)}`

**Parte 3: Mejorar UX** (10 min)

1. Evita que se añadan tareas vacías (usa un `if` para verificar que `nuevaTarea.trim() !== ''`)
2. Añade un mensaje cuando no hay tareas: "No hay tareas. ¡Añade una!"
3. Cambia el botón "Añadir" por un formulario real que funcione con Enter:
```tsx
<form onSubmit={(e) => { e.preventDefault(); añadirTarea(); }}>
  {/* input y botón aquí */}
</form>
```
4. Estiliza la lista para que se vea bien (bordes, padding, colores)

**Criterio de éxito**:
- [ ] Puedes escribir una tarea y añadirla a la lista (con botón o Enter)
- [ ] Las tareas aparecen en una lista
- [ ] Cada tarea tiene un botón "Eliminar" que funciona
- [ ] No se pueden añadir tareas vacías
- [ ] Muestra un mensaje cuando la lista está vacía
- [ ] La interfaz se ve limpia y ordenada

**Desafío extra** (opcional):
1. Añade una tercera variable de estado para llevar la cuenta de cuántas tareas has completado en total (no solo las actuales)
2. Cambia el array de strings por un array de objetos: `{ texto: string, completada: boolean }`
3. Añade un checkbox que marque la tarea como completada (y cambie el estilo del texto a tachado)
4. Muestra contadores: "X tareas pendientes, Y tareas completadas"

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **El estado es la memoria del componente**: Con `useState` puedes hacer que tus componentes recuerden información que cambia con el tiempo. El estado permite crear interfaces interactivas que responden a las acciones del usuario.

2. **useState retorna un par: [valor, setValor]**: La primera posición es el valor actual del estado, la segunda es la función para actualizarlo. NUNCA modifiques el estado directamente, siempre usa la función `set`. React detecta los cambios y actualiza automáticamente la interfaz.

3. **Eventos conectan acciones del usuario con cambios de estado**: Usas `onClick`, `onChange`, `onSubmit` para responder a acciones del usuario. Estos eventos ejecutan funciones que actualizan el estado, lo que hace que la interfaz se actualice. Es el ciclo básico de interactividad en React.

---

## Siguiente paso

En la próxima lección: **"Integración con APIs"**. Aprenderás a conectar tu aplicación React con servicios externos para obtener datos reales (usuarios, productos, posts, etc.). Usarás el hook `useEffect` para cargar datos cuando el componente se monta, y mostrarás estados de carga mientras esperas la respuesta. Es cuando tu app pasa de usar datos inventados a datos reales de internet.

---

**¿Dudas?** El estado es uno de los conceptos más importantes de React, y `useState` es el primer hook que todo desarrollador React debe dominar. Es normal que al principio te confundas con cuándo usar llaves, cómo actualizar el estado correctamente, o por qué el estado no cambia inmediatamente. La práctica es clave: crea componentes simples con estado (contadores, formularios, toggles) hasta que te sientas cómodo. En una semana, usar `useState` será tan natural como declarar variables.

