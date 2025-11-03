<p><strong><em>Tu primera aplicación con React y TypeScript</em></strong></p>

## Introducción: Bienvenido al mundo del desarrollo frontend

Hasta ahora has aprendido JavaScript y cómo comunicarte efectivamente con Claude para generar código. Ahora llega el momento emocionante: crear aplicaciones web con interfaces visuales que los usuarios pueden ver y con las que pueden interactuar.

En esta lección darás tu primer paso en el desarrollo frontend moderno. Aprenderás qué es React, qué es TypeScript, y lo más importante: crearás tu primera aplicación funcional desde cero con la ayuda de Claude. No te preocupes si estos términos te suenan completamente nuevos, al final de esta lección tendrás tu primera app corriendo en tu navegador.

Piensa en esta lección como tu primer día en un taller de carpintería: primero conocerás las herramientas (React y TypeScript), luego aprenderás a usarlas, y finalmente construirás tu primer proyecto simple pero funcional.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Entender qué es React**: Comprenderás por qué React es la biblioteca más popular para crear interfaces de usuario y cómo funciona el concepto de componentes.
2. **Conocer TypeScript**: Sabrás qué es TypeScript, por qué añade tipos a JavaScript y cómo esto te ayuda a escribir código más seguro.
3. **Crear tu primer proyecto**: Configurarás un proyecto React con TypeScript desde cero usando comandos simples y con ayuda de Claude.
4. **Construir tu primer componente**: Escribirás y comprenderás un componente React simple que muestra contenido en el navegador.

---

## ¿Por qué es importante aprender React y TypeScript?

Imagina que quieres construir una casa. Podrías hacerlo colocando ladrillo por ladrillo desde cero, pero sería mucho más eficiente si tuvieras piezas prefabricadas: paredes completas, ventanas, puertas que solo tienes que ensamblar.

**React funciona exactamente así para las aplicaciones web**: te permite construir interfaces de usuario usando "componentes" (piezas reutilizables) en lugar de escribir todo desde cero cada vez. Un botón es un componente, una tarjeta de usuario es un componente, un menú de navegación es un componente.

**TypeScript es como tener etiquetas claras en todas tus herramientas**: si JavaScript es un martillo sin marcar, TypeScript es ese mismo martillo con una etiqueta que dice "MARTILLO - Solo para clavos". Te ayuda a evitar errores antes de que ocurran.

### 📊 Un dato interesante

Según la encuesta de Stack Overflow 2024, React es usado por más del 40% de los desarrolladores web profesionales en todo el mundo. Las empresas más grandes (Facebook, Netflix, Airbnb, Instagram) construyen sus aplicaciones con React. Aprender React no solo te enseña una herramienta, te abre puertas laborales reales.

---

## Concepto 1: ¿Qué es React?

**React es una biblioteca de JavaScript creada por Facebook** (ahora Meta) que te permite construir interfaces de usuario de forma eficiente usando componentes reutilizables.

### La analogía del LEGO

Piensa en React como un sistema de construcción con bloques LEGO:

- **Componente**: Es una pieza de LEGO. Puede ser simple (un bloque 2x4) o compleja (una ventana completa con marco).
- **Aplicación**: Es la construcción final que haces juntando muchas piezas LEGO.
- **Reutilización**: Una vez que diseñas una pieza, puedes usarla cuantas veces quieras en diferentes partes de tu construcción.

### Ejemplo visual: Una página web como componentes

```
┌─────────────────────────────┐
│      Header (componente)     │  ← Barra superior
├─────────────────────────────┤
│  ┌──────────┐  ┌──────────┐ │
│  │  Card    │  │  Card    │ │  ← Tarjetas reutilizables
│  │ (comp.)  │  │ (comp.)  │ │
│  └──────────┘  └──────────┘ │
│  ┌──────────┐  ┌──────────┐ │
│  │  Card    │  │  Card    │ │
│  └──────────┘  └──────────┘ │
├─────────────────────────────┤
│      Footer (componente)     │  ← Pie de página
└─────────────────────────────┘
```

Cada caja es un componente separado que puedes crear una vez y reutilizar mil veces.

### ¿Qué es JSX?

JSX es la "lengua especial" que habla React. Te permite escribir código que parece HTML pero vive dentro de JavaScript.

**Sin JSX** (JavaScript puro, difícil de leer):
```javascript
createElement('div', null,
  createElement('h1', null, 'Hola Mundo')
)
```

**Con JSX** (mucho más fácil de entender):
```jsx
<div>
  <h1>Hola Mundo</h1>
</div>
```

Es mucho más natural, ¿verdad? Por eso React usa JSX.

---

## Concepto 2: ¿Qué es TypeScript?

**TypeScript es JavaScript con superpoderes**. Es JavaScript normal pero con la capacidad de decirle al código qué tipo de información debe esperar.

### La analogía del restaurante

Imagina que trabajas en un restaurante:

**JavaScript** (sin tipos):
- Chef: "Tráeme un ingrediente"
- Tú: ¿Qué ingrediente? ¿Tomate? ¿Sal? ¿Pollo?
- Chef: "No sé, cualquier cosa"
- **Resultado**: Confusión y posibles errores

**TypeScript** (con tipos):
- Chef: "Tráeme un ingrediente de tipo 'verdura'"
- Tú: Aquí está un tomate
- Chef: "Perfecto, es exactamente lo que necesitaba"
- **Resultado**: Claridad y menos errores

### Ejemplo simple: Con y sin tipos

**JavaScript normal**:
```javascript
function saludar(nombre) {
  return "Hola, " + nombre;
}

saludar(123);  // ¿Qué pasará? ¡Nadie lo sabe hasta que lo ejecutes!
// Resultado: "Hola, 123" (probablemente no es lo que querías)
```

**TypeScript**:
```typescript
function saludar(nombre: string) {
  return "Hola, " + nombre;
}

saludar(123);  // ¡ERROR! TypeScript te avisa ANTES de ejecutar
// El editor te dice: "Oye, esperaba texto (string), no un número"
```

### Los tipos básicos más importantes

```typescript
let edad: number = 25;          // Número
let nombre: string = "Ana";     // Texto
let activo: boolean = true;     // Verdadero o falso
let hobbies: string[] = ["leer", "nadar"];  // Lista de textos
```

**Beneficio principal**: Tu editor de código (VS Code) te avisará de errores ANTES de que ejecutes el programa. Es como tener un profesor revisando tu código mientras escribes.

---

## Concepto 3: Tu primer proyecto React + TypeScript

Vamos a crear tu primer proyecto paso a paso. Usaremos **Vite**, una herramienta moderna que configura todo por ti en segundos.

### ¿Qué es Vite?

Vite es como un "asistente de configuración". En lugar de configurar manualmente 20 cosas diferentes, Vite te pregunta qué quieres hacer y lo prepara todo automáticamente.

Piensa en Vite como un chef que te prepara todos los ingredientes y utensilios antes de que empieces a cocinar.

### Paso a paso: Crear el proyecto

**Paso 1**: Abre tu terminal y navega a la carpeta donde quieres crear tu proyecto:

```bash
cd ~/Documentos/mis-proyectos
```

**Paso 2**: Ejecuta el comando mágico de Vite:

```bash
npm create vite@latest mi-primera-app-react -- --template react-ts
```

**Explicación del comando**:
- `npm create vite@latest`: Le dice a npm que cree un nuevo proyecto con Vite (la versión más reciente)
- `mi-primera-app-react`: El nombre de tu proyecto (puedes cambiarlo)
- `--template react-ts`: Usa la plantilla de React con TypeScript

**Paso 3**: Entra a la carpeta del proyecto:

```bash
cd mi-primera-app-react
```

**Paso 4**: Instala las dependencias (las bibliotecas que necesita React):

```bash
npm install
```

Este comando descarga React, TypeScript y todas las herramientas necesarias. Puede tardar 1-2 minutos.

**Paso 5**: Inicia el servidor de desarrollo:

```bash
npm run dev
```

**¡Felicidades!** Verás algo como esto en tu terminal:

```
  VITE v5.0.0  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Abre tu navegador y ve a `http://localhost:5173/`. Deberías ver una página con el logo de Vite y React.

---

## Concepto 4: Anatomía de un componente React

Abre tu proyecto en VS Code:

```bash
code .
```

Busca el archivo `src/App.tsx`. Este es tu primer componente React. Vamos a entenderlo.

### Ejemplo: El componente más simple posible

Vamos a simplificar el archivo `App.tsx` para entenderlo mejor. Reemplaza todo su contenido con esto:

```tsx
function App() {
  return (
    <div>
      <h1>¡Hola desde React!</h1>
      <p>Este es mi primer componente.</p>
    </div>
  );
}

export default App;
```

**Explicación línea por línea**:

- **Línea 1** (`function App() {`): Define una función llamada `App`. En React, los componentes son funciones. El nombre empieza con mayúscula (importante: siempre mayúscula para componentes).

- **Línea 2** (`return (`): La función devuelve (retorna) lo que queremos mostrar en la pantalla.

- **Líneas 3-6** (el contenido dentro de `return`): Esto es JSX. Parece HTML pero es código JavaScript disfrazado. Define lo que se verá en el navegador.

- **Línea 3** (`<div>`): Un contenedor. En React, el `return` debe devolver UN SOLO elemento padre (por eso lo envolvemos todo en un `<div>`).

- **Línea 4** (`<h1>¡Hola desde React!</h1>`): Un título grande.

- **Línea 5** (`<p>Este es mi primer componente.</p>`): Un párrafo de texto.

- **Línea 8** (`export default App;`): Exporta el componente para que otros archivos puedan usarlo. El archivo `main.tsx` importa este componente y lo muestra en la página.

**Resultado**: Si guardas el archivo, verás inmediatamente en tu navegador el título "¡Hola desde React!" y el párrafo debajo. Vite actualiza automáticamente el navegador (esto se llama "hot reload").

---

## Práctica guiada: Tu primer componente personalizado

Vamos a crear un componente de "Tarjeta de presentación" que muestre tu información personal. Lo haremos paso a paso.

### Paso 1 de 3: Crear un componente simple

**Lo que harás**:
1. Crea un nuevo archivo en la carpeta `src` llamado `TarjetaPresentacion.tsx`
2. Escribe el código del componente
3. Verifica que funciona

**Tu código debería verse así** (`src/TarjetaPresentacion.tsx`):

```tsx
function TarjetaPresentacion() {
  return (
    <div>
      <h2>Juan Pérez</h2>
      <p>Estudiante de Desarrollo Web</p>
      <p>Aprendiendo React con Claude</p>
    </div>
  );
}

export default TarjetaPresentacion;
```

**Explicación**:
- **Línea 1**: Definimos una función componente llamada `TarjetaPresentacion` (sin espacios, usando CamelCase).
- **Líneas 3-6**: El JSX que describe la estructura visual: un título con el nombre y dos párrafos.
- **Línea 10**: Exportamos el componente para poder usarlo en otros archivos.

**Checkpoint**: El archivo está creado, pero aún no lo verás en el navegador. Necesitamos importarlo y usarlo.

### Paso 2 de 3: Usar el componente en App.tsx

**Lo que harás**:
1. Abre `src/App.tsx`
2. Importa tu nuevo componente
3. Úsalo dentro del componente `App`

**Modifica `App.tsx` para que se vea así**:

```tsx
import TarjetaPresentacion from './TarjetaPresentacion';

function App() {
  return (
    <div>
      <h1>Mi Aplicación React</h1>
      <TarjetaPresentacion />
    </div>
  );
}

export default App;
```

**Explicación**:
- **Línea 1** (`import TarjetaPresentacion from './TarjetaPresentacion';`): Importa el componente que creaste. `./` significa "en la misma carpeta". Nota que no necesitas poner `.tsx` al final.

- **Línea 6** (`<TarjetaPresentacion />`): Así es como usas un componente. Es como una etiqueta HTML personalizada. El `/>` al final significa que es una etiqueta auto-cerrada (como `<img />`).

**Checkpoint**: Guarda el archivo y mira el navegador. Deberías ver:
- El título "Mi Aplicación React"
- Debajo, tu tarjeta de presentación con el nombre "Juan Pérez" y los dos párrafos

### Paso 3 de 3: Añadir estilos simples con CSS

**Lo que harás**:
1. Añade clases CSS a tu componente
2. Crea estilos básicos para que se vea mejor

**Modifica `TarjetaPresentacion.tsx`**:

```tsx
function TarjetaPresentacion() {
  return (
    <div className="tarjeta">
      <h2>Juan Pérez</h2>
      <p>Estudiante de Desarrollo Web</p>
      <p>Aprendiendo React con Claude</p>
    </div>
  );
}

export default TarjetaPresentacion;
```

**Añade estilos en `src/index.css`** (al final del archivo):

```css
.tarjeta {
  border: 2px solid #333;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  background-color: #f5f5f5;
  max-width: 400px;
}
```

**Nota importante sobre `className`**: En JSX usamos `className` en lugar de `class` (como en HTML normal) porque `class` es una palabra reservada en JavaScript.

**Checkpoint**: Ahora tu tarjeta tiene un borde, fondo gris claro, esquinas redondeadas y espacio interno. Se ve mucho mejor, ¿verdad?

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: "Cannot find module './TarjetaPresentacion'"

**Te pasa cuando**: Intentas importar un componente pero React no lo encuentra.

**El mensaje de error que ves**:
```
Cannot find module './TarjetaPresentacion' or its corresponding type declarations
```

**Por qué pasa**:
- El archivo no existe en la ubicación que especificaste
- El nombre del archivo está mal escrito
- Olvidaste el `./` antes del nombre

**Cómo se soluciona**:
1. Verifica que el archivo `TarjetaPresentacion.tsx` existe en la carpeta `src`
2. Asegúrate de que el nombre en el `import` coincide EXACTAMENTE con el nombre del archivo (incluyendo mayúsculas/minúsculas)
3. No olvides el `./` antes del nombre: `import TarjetaPresentacion from './TarjetaPresentacion';`

### Error #2: "Adjacent JSX elements must be wrapped in an enclosing tag"

**Te pasa cuando**: Intentas retornar múltiples elementos sin un contenedor padre.

**El mensaje de error que ves**:
```
Adjacent JSX elements must be wrapped in an enclosing tag
```

**Por qué pasa**: React requiere que el `return` devuelva UN SOLO elemento padre. No puedes devolver dos elementos hermanos directamente.

**Ejemplo que causa error**:
```tsx
return (
  <h1>Título</h1>
  <p>Párrafo</p>  // ¡Error! Dos elementos sin contenedor
);
```

**Cómo se soluciona**:
Envuelve todo en un `<div>` o usa un fragmento `<>`:

```tsx
return (
  <div>
    <h1>Título</h1>
    <p>Párrafo</p>
  </div>
);
```

O con fragmento (cuando no quieres un `div` extra):
```tsx
return (
  <>
    <h1>Título</h1>
    <p>Párrafo</p>
  </>
);
```

### Error #3: "Module not found: Can't resolve 'react'"

**Te pasa cuando**: Las dependencias no están instaladas.

**El mensaje de error que ves**:
```
Module not found: Can't resolve 'react'
```

**Por qué pasa**: Olvidaste ejecutar `npm install` después de crear el proyecto, o se borró la carpeta `node_modules`.

**Cómo se soluciona**:
1. Abre la terminal en la carpeta de tu proyecto
2. Ejecuta: `npm install`
3. Espera a que termine (1-2 minutos)
4. Reinicia el servidor de desarrollo: `npm run dev`

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: Al principio, la diferencia entre JavaScript y JSX puede confundir. Recuerda: si parece HTML pero está dentro de una función de React, es JSX. Con una semana de práctica se volverá natural.

> **Otro tip importante**: Guarda todos tus archivos con frecuencia (Ctrl+S o Cmd+S). Vite actualiza el navegador automáticamente al guardar, así que verás los cambios al instante. Es una de las mejores características del desarrollo moderno.

> **Sobre los nombres**: Los componentes SIEMPRE empiezan con mayúscula (`TarjetaPresentacion`, `App`, `Boton`). Las variables y funciones normales empiezan con minúscula (`nombre`, `edad`, `calcularTotal`). Esto no es opcional, React lo requiere para distinguir componentes de elementos HTML normales.

---

## Tu turno: Ejercicio guiado

**Objetivo simple**: Crear un componente "MiPerfil" que muestre tu nombre, edad, ciudad y una breve descripción sobre ti.

**Tiempo**: 20-25 minutos

**Lo que necesitas antes de empezar**:
- [ ] Proyecto React creado y funcionando (`npm run dev` ejecutándose)
- [ ] VS Code abierto con tu proyecto
- [ ] Navegador abierto en `http://localhost:5173/`

### Instrucciones paso a paso

**Parte 1: Crear el componente** (8 min)

1. Crea un nuevo archivo llamado `MiPerfil.tsx` en la carpeta `src`
2. Escribe la estructura básica del componente (función que retorna JSX)
3. Incluye en el JSX:
   - Un `<h2>` con tu nombre
   - Un `<p>` con tu edad (ej: "Edad: 22 años")
   - Un `<p>` con tu ciudad (ej: "Ciudad: Madrid")
   - Un `<p>` con una descripción de 2-3 líneas sobre ti
4. No olvides el `export default MiPerfil;` al final

**Parte 2: Integrar en la aplicación** (5 min)

1. Abre `src/App.tsx`
2. Importa tu componente `MiPerfil` al inicio del archivo
3. Usa el componente dentro del `return` de `App` (añádelo debajo de cualquier otro contenido)
4. Guarda y verifica que aparece en el navegador

**Parte 3: Darle estilo** (10 min)

1. Añade `className="perfil"` al `<div>` principal de tu componente `MiPerfil`
2. Abre `src/index.css` y añade al final:
```css
.perfil {
  border: 3px solid #4a90e2;
  border-radius: 15px;
  padding: 25px;
  margin: 20px auto;
  background-color: #e8f4f8;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.perfil h2 {
  color: #2c5aa0;
  margin-bottom: 15px;
}

.perfil p {
  line-height: 1.6;
  color: #333;
}
```
3. Guarda y observa cómo cambia la apariencia

**Criterio de éxito**:
- [ ] El componente `MiPerfil` se muestra correctamente en el navegador
- [ ] Muestra tu nombre, edad, ciudad y descripción
- [ ] Tiene un borde azul, fondo celeste claro y esquinas redondeadas
- [ ] El texto es legible y está bien espaciado
- [ ] No hay errores en la consola del navegador (presiona F12 para verla)

**Desafío extra** (opcional): Crea otro componente llamado `MisHobbies` que muestre una lista de tus 3 hobbies favoritos usando una lista `<ul>` y varios `<li>`. Añádelo a `App.tsx` debajo de `MiPerfil`.

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **React y componentes**: React es una biblioteca de JavaScript que te permite construir interfaces de usuario usando componentes reutilizables. Los componentes son como piezas de LEGO que puedes combinar para crear aplicaciones completas.

2. **TypeScript y tipos**: TypeScript es JavaScript con tipos que te ayudan a evitar errores. Es como poner etiquetas claras en tus variables y funciones para saber qué tipo de información deben manejar (texto, número, verdadero/falso, etc.).

3. **Tu primer proyecto**: Aprendiste a crear un proyecto React con TypeScript usando Vite, a escribir componentes simples, a importarlos y usarlos en otros componentes, y a aplicar estilos CSS básicos.

---

## Siguiente paso

En la próxima lección: **"Componentes reutilizables con props"**. Aprenderás a crear componentes que pueden cambiar su contenido según la información que les pases, como una plantilla que se rellena con diferentes datos. Crearás un componente de tarjeta que podrás usar 10 veces con información diferente en cada una. ¡Es cuando React empieza a mostrar su verdadero poder!

---

**¿Dudas?** Es completamente normal sentirse un poco abrumado en tu primer contacto con React y TypeScript. Estos son conceptos nuevos que toman tiempo para asentarse. Si algo no te quedó claro, vuelve a leer la sección correspondiente, experimenta con el código cambiando cosas, y sobre todo: practica creando componentes simples. La práctica hace al maestro. En una semana, lo que hoy parece complicado te parecerá natural.
