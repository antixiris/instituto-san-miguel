***Tu primer proyecto: Lista de tareas con Claude***


> "La práctica no hace al maestro. La práctica PERFECTA hace al maestro" - Vince Lombardi

## Introducción: Juntando todo lo que aprendiste

Imagina que has estado aprendiendo a tocar acordes en una guitarra. Cada acorde por separado está bien, pero ¿cuándo tocas tu primera canción completa? Eso es diferente. Esa es la emoción de crear algo real.

En esta lección vas a crear tu **primer proyecto completo**: una aplicación de lista de tareas (To-Do List). No es solo un ejercicio: es algo que funciona de verdad y que puedes usar.

Usarás TODO lo que aprendiste en las lecciones anteriores:
- Pedirle ayuda a Claude
- Mejorar código
- Arreglar errores
- Documentar tu trabajo

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, habrás:

1. **Creado tu primer proyecto real**: Una aplicación funcionando desde cero
2. **Usado Claude como tu asistente**: Para todas las partes del proyecto
3. **Aplicado buenas prácticas**: Código limpio, con tests y documentación
4. **Demostrado que puedes**: Construir software real

---

## El proyecto: Lista de tareas simple

### ¿Qué vas a construir?

Una aplicación donde puedes:
- Añadir tareas nuevas
- Ver todas tus tareas
- Marcar tareas como completadas
- Eliminar tareas

**Tecnologías**: JavaScript simple (Node.js) - nada complicado

### 📊 Un dato motivador

La mayoría de la gente que aprende a programar NUNCA termina un proyecto completo. El solo hecho de terminarlo te pone en el top 20% de estudiantes. Esta es tu oportunidad.

---

## Fase 1: Preparación (10 minutos)

Antes de escribir código, necesitamos preparar el proyecto.

### Paso 1: Crear la carpeta del proyecto

**Lo que harás**:
1. Abre tu terminal
2. Crea una carpeta para el proyecto:
```bash
mkdir lista-tareas
cd lista-tareas
```

**Explicación**:
- **`mkdir`**: significa "make directory" (crear carpeta)
- **`lista-tareas`**: es el nombre de nuestra carpeta
- **`cd`**: significa "change directory" (entrar a la carpeta)

**Checkpoint**: Si escribes `pwd` (print working directory), deberías ver que estás en la carpeta `lista-tareas`.

### Paso 2: Inicializar el proyecto

**Lo que harás**:
```bash
npm init -y
```

**Explicación**:
- **`npm init`**: crea un archivo `package.json` que guarda información del proyecto
- **`-y`**: dice "sí a todo" automáticamente (nos ahorra responder preguntas)

**Checkpoint**: Ahora deberías tener un archivo llamado `package.json` en tu carpeta.

### Paso 3: Crear los archivos iniciales

**Lo que harás**:
1. Crea un archivo llamado `tareas.js`
2. Crea un archivo llamado `README.md`

**En la terminal**:
```bash
touch tareas.js README.md
```

**Checkpoint**: Escribe `ls` para ver los archivos. Deberías ver `tareas.js` y `README.md`.

---

## Fase 2: Construyendo la aplicación (60 minutos)

Ahora viene la parte divertida: escribir el código.

### Paso 1: La estructura básica (10 min)

**Lo que le pedirás a Claude**:
```
Necesito ayuda para empezar un proyecto de lista de tareas en JavaScript (Node.js).

Quiero:
1. Un array (lista) para guardar las tareas
2. Cada tarea debe tener: un id único, una descripción, y un estado (completada o no)

Ayúdame a crear la estructura básica. Empieza simple.
```

**Código que Claude te dará**:
```javascript
// Array para guardar todas las tareas
const tareas = [];

// Contador para dar IDs únicos a cada tarea
let contadorId = 1;

console.log('Sistema de tareas iniciado');
console.log('Tareas actuales:', tareas);
```

**Explicación línea por línea**:
- **Línea 2**: Creamos un array vacío llamado `tareas` donde guardaremos todas las tareas
- **Línea 5**: Variable que cuenta cuántas tareas hemos creado (para darles IDs únicos)
- **Líneas 7-8**: Mostramos mensajes en consola para saber que el programa inició

**Pruébalo**:
1. Copia el código en `tareas.js`
2. En la terminal: `node tareas.js`
3. Deberías ver: "Sistema de tareas iniciado"

**Checkpoint**: Si ves los mensajes, todo está funcionando.

---

### Paso 2: Añadir tareas (15 min)

Ahora vamos a crear una función para añadir tareas nuevas.

**Lo que le pedirás a Claude**:
```
Tengo este código:
[pega el código anterior]

Necesito una función llamada "agregarTarea" que:
1. Reciba la descripción de una tarea
2. Cree un objeto con: id, descripcion, completada (false por defecto)
3. Añada ese objeto al array de tareas
4. Muestre un mensaje confirmando que se añadió

Hazlo paso a paso y explícame cada parte
```

**Código que Claude te dará**:
```javascript
// Array para guardar todas las tareas
const tareas = [];
let contadorId = 1;

// Función para añadir una nueva tarea
function agregarTarea(descripcion) {
  // Crear el objeto de la tarea
  const nuevaTarea = {
    id: contadorId,
    descripcion: descripcion,
    completada: false
  };

  // Añadir la tarea al array
  tareas.push(nuevaTarea);

  // Incrementar el contador para la próxima tarea
  contadorId++;

  // Confirmar que se añadió
  console.log('✅ Tarea añadida:', descripcion);
}

// Probar la función
agregarTarea('Comprar leche');
agregarTarea('Estudiar JavaScript');

// Ver todas las tareas
console.log('Todas las tareas:', tareas);
```

**Explicación línea por línea de la función**:
- **Línea 6**: Definimos la función `agregarTarea` que recibe la `descripcion`
- **Líneas 8-12**: Creamos un objeto con tres propiedades: id, descripcion, completada
- **Línea 15**: `push()` añade la nueva tarea al final del array
- **Línea 18**: Aumentamos el contador para que la próxima tarea tenga un id diferente
- **Línea 21**: Mostramos un mensaje de confirmación

**Pruébalo**:
1. Reemplaza el código en `tareas.js`
2. Ejecuta: `node tareas.js`
3. Deberías ver las dos tareas añadidas

**Checkpoint**: Si ves "✅ Tarea añadida" dos veces y luego el array con las tareas, funciona perfecto.

---

### Paso 3: Ver todas las tareas (10 min)

Ahora creamos una función que muestre todas las tareas de forma bonita.

**Lo que le pedirás a Claude**:
```
Necesito una función "mostrarTareas" que:
1. Si no hay tareas, muestre "No hay tareas pendientes"
2. Si hay tareas, las muestre de forma ordenada con su id y estado (✓ si está completada, ○ si no)

Añádela al código anterior
```

**Código que Claude añadirá**:
```javascript
// Función para mostrar todas las tareas
function mostrarTareas() {
  // Si no hay tareas
  if (tareas.length === 0) {
    console.log('No hay tareas pendientes');
    return;
  }

  // Mostrar todas las tareas
  console.log('\n=== LISTA DE TAREAS ===');
  tareas.forEach(tarea => {
    const estado = tarea.completada ? '✓' : '○';
    console.log(`${estado} [${tarea.id}] ${tarea.descripcion}`);
  });
  console.log('=======================\n');
}
```

**Explicación**:
- **Línea 4**: `tareas.length === 0` verifica si el array está vacío
- **Línea 5-6**: Si está vacío, mostramos mensaje y salimos con `return`
- **Línea 11**: `forEach` recorre cada tarea del array
- **Línea 12**: El `?` es un "if" corto: si está completada muestra ✓, si no muestra ○
- **Línea 13**: Mostramos el estado, id y descripción de cada tarea

**Pruébalo**:
```javascript
// Al final del archivo
agregarTarea('Comprar leche');
agregarTarea('Estudiar JavaScript');
mostrarTareas();
```

**Checkpoint**: Deberías ver una lista bonita con círculos (○) al lado de cada tarea.

---

### Paso 4: Completar tareas (15 min)

Ahora añadimos la capacidad de marcar tareas como completadas.

**Lo que le pedirás a Claude**:
```
Necesito una función "completarTarea" que:
1. Reciba el id de la tarea
2. Busque esa tarea en el array
3. Cambie su estado a completada = true
4. Si no encuentra la tarea, muestre un error

Añádela al código
```

**Código que Claude añadirá**:
```javascript
// Función para marcar una tarea como completada
function completarTarea(id) {
  // Buscar la tarea por id
  const tarea = tareas.find(t => t.id === id);

  // Si no existe
  if (!tarea) {
    console.log('❌ Error: No existe una tarea con ese ID');
    return;
  }

  // Marcarla como completada
  tarea.completada = true;
  console.log('✓ Tarea completada:', tarea.descripcion);
}
```

**Explicación**:
- **Línea 4**: `find()` busca en el array una tarea donde el id coincida
- **Línea 7**: Si `tarea` es `null` (no se encontró), mostramos error
- **Línea 13**: Cambiamos `completada` a `true`

**Pruébalo**:
```javascript
agregarTarea('Comprar leche');
agregarTarea('Estudiar JavaScript');
mostrarTareas();

completarTarea(1);  // Completar la primera tarea
mostrarTareas();    // Ver el cambio
```

**Checkpoint**: Ahora la primera tarea debería tener una ✓ en lugar de ○.

---

### Paso 5: Eliminar tareas (10 min)

Por último, añadamos la capacidad de eliminar tareas.

**Lo que le pedirás a Claude**:
```
Necesito una función "eliminarTarea" que:
1. Reciba el id de la tarea
2. La elimine del array
3. Confirme que se eliminó o muestre error si no existe

Añádela al código
```

**Código final**:
```javascript
// Función para eliminar una tarea
function eliminarTarea(id) {
  // Buscar el índice de la tarea
  const indice = tareas.findIndex(t => t.id === id);

  // Si no existe
  if (indice === -1) {
    console.log('❌ Error: No existe una tarea con ese ID');
    return;
  }

  // Obtener la tarea antes de eliminarla (para mostrar el nombre)
  const tareaEliminada = tareas[indice];

  // Eliminarla del array
  tareas.splice(indice, 1);

  console.log('🗑️  Tarea eliminada:', tareaEliminada.descripcion);
}
```

**Explicación**:
- **Línea 4**: `findIndex()` busca la posición de la tarea en el array
- **Línea 7**: Si devuelve -1, significa que no se encontró
- **Línea 16**: `splice()` elimina 1 elemento en la posición `indice`

---

## Fase 3: Probando y documentando (30 minutos)

### Paso 1: Probar que todo funciona (15 min)

Ahora vamos a probar todas las funciones juntas.

**Código de prueba** (al final de `tareas.js`):
```javascript
console.log('=== PRUEBA DE LA APLICACIÓN ===\n');

// Añadir algunas tareas
agregarTarea('Comprar leche');
agregarTarea('Estudiar JavaScript');
agregarTarea('Hacer ejercicio');

// Ver todas
mostrarTareas();

// Completar una tarea
completarTarea(2);

// Ver el cambio
mostrarTareas();

// Eliminar una tarea
eliminarTarea(1);

// Ver el resultado final
mostrarTareas();

// Intentar eliminar una que no existe
eliminarTarea(99);
```

**Ejecuta**: `node tareas.js`

**Checkpoint**:
- [ ] Se añaden 3 tareas
- [ ] La tarea 2 se marca como completada
- [ ] La tarea 1 se elimina
- [ ] Muestra error al intentar eliminar la tarea 99

---

### Paso 2: Escribir el readme (15 min)

Ahora documenta tu proyecto.

**Lo que le pedirás a Claude**:
```
Necesito un archivo README.md para mi proyecto de lista de tareas.

El proyecto tiene estas funciones:
- agregarTarea(descripcion)
- mostrarTareas()
- completarTarea(id)
- eliminarTarea(id)

Crea un README que explique:
1. Qué hace el proyecto
2. Cómo usarlo
3. Ejemplos de cada función

Hazlo simple y claro para principiantes
```

**README que Claude creará**:
```markdown
# Lista de tareas

Una aplicación simple de línea de comandos para gestionar tareas.

## Qué hace

Te permite:
- Añadir tareas nuevas
- Ver todas tus tareas
- Marcar tareas como completadas
- Eliminar tareas

## Cómo usar

### 1. ejecutar la aplicación

```bash
node tareas.js
```

### 2. funciones disponibles

#### Añadir una tarea
```javascript
agregarTarea('Descripción de la tarea');
```
Ejemplo:
```javascript
agregarTarea('Comprar leche');
```

#### Ver todas las tareas
```javascript
mostrarTareas();
```
Muestra una lista con todas las tareas y su estado.

#### Completar una tarea
```javascript
completarTarea(id);
```
Ejemplo:
```javascript
completarTarea(1);  // Completa la tarea con ID 1
```

#### Eliminar una tarea
```javascript
eliminarTarea(id);
```
Ejemplo:
```javascript
eliminarTarea(2);  // Elimina la tarea con ID 2
```

## Ejemplo completo

```javascript
// Añadir tareas
agregarTarea('Comprar leche');
agregarTarea('Estudiar JavaScript');

// Ver todas
mostrarTareas();

// Completar una
completarTarea(1);

// Ver el resultado
mostrarTareas();
```

## Autor

[Tu nombre aquí]

## Creado con

Este proyecto fue creado como ejercicio del curso "Especialista en Desarrollo con Claude Code" del Instituto San Miguel.
```

**Guarda esto en `README.md`**

---

## Fase 4: MJoras opcionales (si tienes tiempo)

### Mejora 1: GArdar en un archivo

**Desafío**: Haz que las tareas se guarden en un archivo `tareas.json` para que no se pierdan al cerrar el programa.

**Pista para Claude**:
```
Ayúdame a:
1. Guardar el array de tareas en un archivo JSON al añadir/eliminar/completar
2. Cargar las tareas del archivo cuando inicie el programa
```

### Mejora 2: MNú interactivo

**Desafío**: Crea un menú donde el usuario pueda elegir qué hacer.

**Pista para Claude**:
```
Necesito un menú interactivo usando readline que muestre:
1. Añadir tarea
2. Ver tareas
3. Completar tarea
4. Eliminar tarea
5. Salir

Y que ejecute la función correspondiente según la elección
```

---

## Resumen: L que lograste

Felicidades. Acabas de:
- ✅ Crear tu primer proyecto completo
- ✅ Usar funciones, arrays y objetos
- ✅ Trabajar con Claude como tu asistente
- ✅ Documentar tu código
- ✅ Probar que todo funciona

**Esto no es poca cosa**. Muchas personas que dicen "quiero aprender a programar" nunca llegan a este punto. Tú sí.

---

## Siguientes pasos

### Comparte tu proyecto

1. Sube tu código a GitHub
2. Compártelo con amigos o en redes
3. Añádelo a tu portafolio

### Continúa aprendiendo

Este proyecto es solo el principio. Puedes:
- Añadir más funciones (prioridad, fecha límite)
- Crear una versión web con HTML
- Conectarlo a una base de datos real

---

## 💡 reflexión final

> "No importa cuán lento vayas, siempre y cuando no te detengas" - Confucio

Has completado el Módulo 2. Has aprendido a:
1. Hablar con Claude efectivamente
2. Mejorar código existente
3. Encontrar y arreglar errores
4. Probar tu código
5. Documentar tu trabajo
6. **Construir proyectos reales**

Estas son las habilidades fundamentales de todo programador. Con Claude como tu asistente, puedes ir mucho más lejos.

El próximo paso es construir cosas más grandes y más complejas. Pero recuerda: todo proyecto grande es solo una colección de piezas pequeñas bien hechas.

**¡Sigue construyendo!**

---

**¿Completaste el proyecto?** Guárdalo bien. Es la prueba de que puedes crear software real.