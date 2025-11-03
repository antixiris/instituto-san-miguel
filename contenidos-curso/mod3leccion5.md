<p><strong><em>Patrones de diseño con Claude: Soluciones probadas para problemas comunes</em></strong></p>

## Introducción: No reinventes la rueda

Imagina que estás construyendo una bicicleta. ¿Diseñarías las ruedas desde cero, inventando una forma completamente nueva? Probablemente no. Usarías ruedas redondas porque funcionan perfectamente, han sido probadas millones de veces, y todos saben cómo usarlas.

En programación existe el mismo concepto. Hay problemas que aparecen una y otra vez: mostrar listas, validar datos, organizar código, manejar errores. Y para cada uno de estos problemas comunes, existen **patrones de diseño**: soluciones probadas que funcionan bien y que todos los programadores conocen.

La belleza de trabajar con Claude Code es que no necesitas memorizar estos patrones. Solo necesitas saber que existen, cuándo usarlos, y cómo pedirle a Claude que los implemente de forma clara para principiantes.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Reconocer patrones comunes**: Identificarás situaciones donde un patrón específico es útil
2. **Pedirle patrones a Claude**: Sabrás exactamente cómo solicitar la implementación de cada patrón
3. **Adaptar patrones a tu nivel**: Entenderás cómo pedir versiones simples o avanzadas según tu experiencia
4. **Combinar patrones**: Aprenderás cómo usar varios patrones juntos en un proyecto

---

## ¿Por qué los patrones de diseño son importantes?

Piensa en recetas de cocina. Cuando haces un pastel, no inventas el proceso desde cero. Sigues una receta probada: mezclar ingredientes secos, batir huevos, combinar todo, hornear a cierta temperatura. Esta "receta" es un patrón.

Los patrones de diseño en programación son lo mismo: recetas probadas para situaciones comunes.

### 📊 Un dato interesante

Los 5 patrones que aprenderás hoy aparecen en el 80% del código profesional. No necesitas conocer 100 patrones, necesitas dominar estos 5 básicos y los usarás en casi todos tus proyectos.

---

## Patrón 1: Lista con operaciones CRUD

**CRUD** significa: **C**reate (Crear), **R**ead (Leer), **U**pdate (Actualizar), **D**elete (Eliminar).

### Cuándo usarlo

Cada vez que necesites manejar una colección de cosas: estudiantes, productos, tareas, usuarios, libros, etc.

### El patrón básico

Tendrás:
1. Un array para guardar los elementos
2. Una función para agregar (Create)
3. Una función para ver/buscar (Read)
4. Una función para editar (Update)
5. Una función para eliminar (Delete)

### Cómo pedírselo a Claude

**Prompt efectivo**:
```
Necesito implementar el patrón CRUD para manejar una lista de productos.

Cada producto tiene:
- id (número único)
- nombre
- precio
- cantidad en stock

Necesito las 4 operaciones básicas:
- Agregar producto nuevo
- Buscar producto por id
- Editar producto existente
- Eliminar producto

Usa código simple para principiantes con comentarios explicativos.
```

**Código que recibirías**:
```javascript
// Array para guardar todos los productos
let productos = [];
let siguienteId = 1;

// CREATE: Agregar un producto nuevo
function agregarProducto(nombre, precio, cantidad) {
  const producto = {
    id: siguienteId,
    nombre: nombre,
    precio: precio,
    cantidad: cantidad
  };

  productos.push(producto);
  siguienteId++;

  console.log("Producto agregado: " + nombre);
  return producto;
}

// READ: Buscar un producto por ID
function buscarProducto(id) {
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id === id) {
      return productos[i];
    }
  }
  console.log("Producto no encontrado");
  return null;
}

// UPDATE: Editar un producto existente
function editarProducto(id, nuevosDatos) {
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id === id) {
      // Actualizar solo los campos que vengan
      if (nuevosDatos.nombre) {
        productos[i].nombre = nuevosDatos.nombre;
      }
      if (nuevosDatos.precio) {
        productos[i].precio = nuevosDatos.precio;
      }
      if (nuevosDatos.cantidad !== undefined) {
        productos[i].cantidad = nuevosDatos.cantidad;
      }

      console.log("Producto actualizado");
      return productos[i];
    }
  }
  console.log("Producto no encontrado");
  return null;
}

// DELETE: Eliminar un producto
function eliminarProducto(id) {
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id === id) {
      const eliminado = productos[i];
      productos.splice(i, 1);
      console.log("Producto eliminado: " + eliminado.nombre);
      return true;
    }
  }
  console.log("Producto no encontrado");
  return false;
}

// Ejemplo de uso:
agregarProducto("Laptop", 15000, 5);
agregarProducto("Mouse", 250, 20);

const producto = buscarProducto(1);
console.log(producto);

editarProducto(1, { precio: 14000 });

eliminarProducto(2);
```

**Explicación línea por línea de las partes clave**:

- **Línea 2** (`let productos = []`): Array que contendrá todos los productos
- **Línea 3** (`let siguienteId = 1`): Variable para generar IDs únicos automáticamente
- **Líneas 6-18** (CREATE): Creamos un objeto producto, lo añadimos al array, incrementamos el ID
- **Líneas 21-29** (READ): Buscamos recorriendo el array hasta encontrar el ID correcto
- **Líneas 32-51** (UPDATE): Actualizamos solo los campos que vengan en nuevosDatos
- **Línea 43** (`!== undefined`): Verificamos así porque cantidad puede ser 0, que es válido
- **Líneas 54-65** (DELETE): Buscamos y eliminamos con `splice` que quita elementos del array

**Por qué es un patrón**: Esta misma estructura funcionaría para estudiantes, libros, usuarios, o cualquier cosa que manejes como lista.

---

## Patrón 2: Validador de datos

### Cuándo usarlo

Cada vez que recibas información del usuario y necesites verificar que sea correcta antes de usarla.

### El patrón básico

Tendrás una función dedicada que:
1. Recibe los datos a validar
2. Verifica cada regla de validación
3. Devuelve si es válido o no
4. Opcionalmente, devuelve lista de errores

### Cómo pedírselo a Claude

**Prompt efectivo**:
```
Necesito un validador para datos de registro de usuario.

Datos a validar:
- Email: debe tener formato correcto
- Contraseña: mínimo 8 caracteres, al menos un número
- Edad: debe ser número entre 18 y 100

La función debe devolver un objeto con:
- esValido: true/false
- errores: array con mensajes de qué está mal

Usa código simple para principiantes.
```

**Código que recibirías**:
```javascript
function validarRegistro(email, password, edad) {
  // Array para acumular errores
  const errores = [];

  // Validar email
  if (!email || email.trim() === "") {
    errores.push("El email es obligatorio");
  } else if (!email.includes("@") || !email.includes(".")) {
    errores.push("El email debe tener formato válido (ejemplo@dominio.com)");
  }

  // Validar contraseña
  if (!password || password.length < 8) {
    errores.push("La contraseña debe tener al menos 8 caracteres");
  } else {
    // Verificar que tenga al menos un número
    const tieneNumero = /\d/.test(password);
    if (!tieneNumero) {
      errores.push("La contraseña debe contener al menos un número");
    }
  }

  // Validar edad
  if (typeof edad !== 'number') {
    errores.push("La edad debe ser un número");
  } else if (edad < 18 || edad > 100) {
    errores.push("La edad debe estar entre 18 y 100 años");
  }

  // Construir resultado
  const resultado = {
    esValido: errores.length === 0,
    errores: errores
  };

  return resultado;
}

// Ejemplo de uso:
const resultado1 = validarRegistro("juan@email.com", "pass1234", 25);
console.log(resultado1);
// { esValido: true, errores: [] }

const resultado2 = validarRegistro("email-malo", "123", 15);
console.log(resultado2);
// { esValido: false, errores: ["El email debe...", "La contraseña...", "La edad..."] }
```

**Explicación línea por línea**:

- **Línea 3** (`const errores = []`): Array vacío que iremos llenando con mensajes de error
- **Líneas 6-10**: Validación de email, primero verificamos que exista, luego el formato básico
- **Línea 8** (`!email.includes("@")`): El `!` significa "no", preguntamos "¿no tiene @?"
- **Líneas 13-21**: Validación de contraseña en dos pasos: longitud y contenido
- **Línea 17** (`/\d/.test(password)`): Expresión regular que busca dígitos
- **Líneas 24-28**: Validación de edad verificando tipo y rango
- **Líneas 31-34**: Creamos objeto de resultado. Es válido solo si no hay errores

**Por qué es un patrón**: Este mismo enfoque funciona para validar productos, formularios, configuraciones, cualquier dato de entrada.

---

## Patrón 3: Menú interactivo

### Cuándo usarlo

Cuando tu programa necesite que el usuario elija entre varias opciones: menús de aplicaciones, sistemas de navegación, etc.

### El patrón básico

Tendrás:
1. Una función que muestra las opciones
2. Una función que recibe la elección del usuario
3. Una estructura que ejecuta la acción correspondiente
4. Un loop que mantiene el menú hasta que el usuario salga

### Cómo pedírselo a Claude

**Prompt efectivo**:
```
Necesito un menú interactivo simple para una aplicación de calculadora.

Opciones del menú:
1. Sumar
2. Restar
3. Multiplicar
4. Dividir
5. Salir

El menú debe:
- Mostrarse claramente
- Ejecutar la operación elegida
- Volver a mostrar el menú después de cada operación
- Permitir salir con la opción 5

Por ahora solo muestra console.log en cada opción (sin hacer las operaciones reales aún).
Usa código simple para principiantes.
```

**Código que recibirías**:
```javascript
// Función para mostrar el menú
function mostrarMenu() {
  console.log("\n=== CALCULADORA ===");
  console.log("1. Sumar");
  console.log("2. Restar");
  console.log("3. Multiplicar");
  console.log("4. Dividir");
  console.log("5. Salir");
  console.log("==================");
}

// Función para ejecutar la opción elegida
function ejecutarOpcion(opcion) {
  if (opcion === 1) {
    console.log("Ejecutando suma...");
    // Aquí irá la lógica de sumar
  } else if (opcion === 2) {
    console.log("Ejecutando resta...");
    // Aquí irá la lógica de restar
  } else if (opcion === 3) {
    console.log("Ejecutando multiplicación...");
    // Aquí irá la lógica de multiplicar
  } else if (opcion === 4) {
    console.log("Ejecutando división...");
    // Aquí irá la lógica de dividir
  } else if (opcion === 5) {
    console.log("Saliendo del programa...");
    return false; // Indica que debe salir
  } else {
    console.log("Opción no válida");
  }

  return true; // Continuar mostrando menú
}

// Función principal que controla todo
function iniciarCalculadora() {
  let continuar = true;

  while (continuar) {
    mostrarMenu();

    // Simulación de elección del usuario (en realidad usarías readline o similar)
    const opcionElegida = 1; // Aquí irá la lectura real

    continuar = ejecutarOpcion(opcionElegida);
  }

  console.log("Programa terminado");
}

// Iniciar la aplicación
iniciarCalculadora();
```

**Explicación línea por línea**:

- **Líneas 2-10**: Función dedicada solo a mostrar el menú visualmente
- **Líneas 13-34**: Función que recibe un número y ejecuta la acción correspondiente
- **Línea 28** (`return false`): Si elige salir, devolvemos false para terminar el loop
- **Línea 33** (`return true`): En otros casos devolvemos true para continuar
- **Líneas 37-50**: Función principal con un `while` que se repite mientras `continuar` sea true
- **Línea 40** (`while (continuar)`): El loop continúa hasta que `continuar` sea false

**Por qué es un patrón**: Esta misma estructura funciona para menús de restaurante, sistemas de gestión, videojuegos, cualquier aplicación con opciones.

---

## Patrón 4: Separación de responsabilidades

### Cuándo usarlo

Siempre. Este patrón dice: cada función debe hacer UNA sola cosa y hacerla bien.

### El patrón básico

En lugar de tener funciones gigantes que hacen muchas cosas, tienes funciones pequeñas especializadas.

### Ejemplo: De código malo a código con patrón

**Código malo (todo mezclado)**:
```javascript
function procesarCompra(productoId, cantidad) {
  // Buscar el producto
  let producto = null;
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id === productoId) {
      producto = productos[i];
    }
  }

  // Verificar stock
  if (producto.stock < cantidad) {
    console.log("No hay suficiente stock");
    return false;
  }

  // Calcular total
  const total = producto.precio * cantidad;

  // Actualizar stock
  producto.stock = producto.stock - cantidad;

  // Mostrar resumen
  console.log("Compra realizada");
  console.log("Total: $" + total);
  return true;
}
```

**Problema**: Esta función hace 4 cosas diferentes: buscar, validar, calcular, actualizar.

**Código bueno (separado por responsabilidades)**:

**Cómo pedírselo a Claude**:
```
Tengo una función que procesa compras pero hace demasiadas cosas.

Necesito separarla en funciones pequeñas, cada una con UNA responsabilidad:
- Una función para buscar productos
- Una función para validar stock
- Una función para calcular total
- Una función para actualizar stock
- Una función principal que coordina todo

Usa el patrón de separación de responsabilidades.
Código simple para principiantes.
```

**Código mejorado**:
```javascript
// Responsabilidad 1: Buscar producto
function buscarProducto(id) {
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id === id) {
      return productos[i];
    }
  }
  return null;
}

// Responsabilidad 2: Validar stock
function tieneStock(producto, cantidad) {
  return producto.stock >= cantidad;
}

// Responsabilidad 3: Calcular total
function calcularTotal(precio, cantidad) {
  return precio * cantidad;
}

// Responsabilidad 4: Actualizar stock
function reducirStock(producto, cantidad) {
  producto.stock = producto.stock - cantidad;
}

// Responsabilidad 5: Mostrar resumen
function mostrarResumen(total) {
  console.log("Compra realizada");
  console.log("Total: $" + total);
}

// Función coordinadora (usa todas las anteriores)
function procesarCompra(productoId, cantidad) {
  // Paso 1: Buscar
  const producto = buscarProducto(productoId);
  if (!producto) {
    console.log("Producto no encontrado");
    return false;
  }

  // Paso 2: Validar
  if (!tieneStock(producto, cantidad)) {
    console.log("No hay suficiente stock");
    return false;
  }

  // Paso 3: Calcular
  const total = calcularTotal(producto.precio, cantidad);

  // Paso 4: Actualizar
  reducirStock(producto, cantidad);

  // Paso 5: Mostrar
  mostrarResumen(total);

  return true;
}
```

**Ventajas de este patrón**:
- ✅ Cada función es fácil de entender (hace una sola cosa)
- ✅ Fácil de probar (puedes probar cada función por separado)
- ✅ Fácil de modificar (cambiar cómo calculas total no afecta cómo buscas)
- ✅ Puedes reutilizar funciones (`buscarProducto` sirve en muchos lugares)

---

## Patrón 5: Objeto de configuración

### Cuándo usarlo

Cuando una función necesita muchos parámetros o cuando quieres valores por defecto.

### El patrón básico

En lugar de pasar 10 parámetros individuales, pasas un objeto con todas las configuraciones.

### Ejemplo: De muchos parámetros a objeto de configuración

**Sin el patrón (difícil de usar)**:
```javascript
function crearUsuario(nombre, email, edad, pais, ciudad, telefono, activo, rol, notificaciones) {
  // ...
}

// Usar la función es confuso:
crearUsuario("Juan", "juan@email.com", 25, "México", "CDMX", "5551234567", true, "admin", false);
// ¿Cuál era cuál? Es fácil equivocarse en el orden
```

**Con el patrón (mucho más claro)**:

**Cómo pedírselo a Claude**:
```
Tengo una función crearUsuario que recibe muchos parámetros.

Mejórala usando el patrón de objeto de configuración donde:
- En lugar de parámetros individuales, recibe un objeto con todas las propiedades
- Incluye valores por defecto para propiedades opcionales
- Debe ser claro qué representa cada valor

Usa código simple para principiantes.
```

**Código mejorado**:
```javascript
function crearUsuario(config) {
  // Establecer valores por defecto
  const usuario = {
    nombre: config.nombre,
    email: config.email,
    edad: config.edad || 18,
    pais: config.pais || "México",
    ciudad: config.ciudad || "",
    telefono: config.telefono || "",
    activo: config.activo !== undefined ? config.activo : true,
    rol: config.rol || "usuario",
    notificaciones: config.notificaciones !== undefined ? config.notificaciones : true
  };

  console.log("Usuario creado:", usuario.nombre);
  return usuario;
}

// Usar la función es mucho más claro:
const nuevoUsuario = crearUsuario({
  nombre: "Juan",
  email: "juan@email.com",
  edad: 25,
  rol: "admin",
  notificaciones: false
  // No necesito especificar país, ciudad, etc. Usarán valores por defecto
});
```

**Explicación línea por línea**:

- **Línea 1** (`config`): Recibimos UN solo parámetro que es un objeto con todo
- **Líneas 3-13**: Creamos el usuario final usando valores de config o por defecto
- **Línea 6** (`config.edad || 18`): Si edad no viene, usa 18. El `||` significa "o"
- **Línea 10** (`config.activo !== undefined ? config.activo : true`): Para booleanos usamos esto porque false es válido
- **Líneas 20-27**: Al llamar la función, queda super claro qué es cada valor

**Ventajas**:
- ✅ Código más legible
- ✅ Fácil añadir nuevas propiedades sin romper código existente
- ✅ Valores por defecto automáticos
- ✅ No importa el orden de las propiedades

---

## Práctica guiada: Combinando patrones

Vamos a crear un pequeño sistema que usa 3 patrones juntos.

### Proyecto: Sistema de calificaciones

**Objetivo**: Manejar calificaciones de estudiantes con validación y menú.

**Patrones que usaremos**:
1. CRUD (para manejar estudiantes)
2. Validador (para validar calificaciones)
3. Menú interactivo (para la interfaz)

### Paso 1 de 3: El validador

**Prompt para Claude**:
```
Necesito un validador para calificaciones de estudiantes.

Debe validar:
- Nombre: no vacío, solo letras y espacios
- Calificación: número entre 0 y 100

Devuelve objeto con esValido y errores.
Código simple para principiantes.
```

**Código base del validador**:
```javascript
function validarEstudiante(nombre, calificacion) {
  const errores = [];

  // Validar nombre
  if (!nombre || nombre.trim() === "") {
    errores.push("El nombre es obligatorio");
  }

  // Validar calificación
  if (typeof calificacion !== 'number') {
    errores.push("La calificación debe ser un número");
  } else if (calificacion < 0 || calificacion > 100) {
    errores.push("La calificación debe estar entre 0 y 100");
  }

  return {
    esValido: errores.length === 0,
    errores: errores
  };
}
```

### Paso 2 de 3: El CRUD

**Prompt para Claude**:
```
Necesito CRUD básico para estudiantes.

Cada estudiante tiene: id, nombre, calificacion

Solo necesito:
- Agregar estudiante (usa el validador antes de agregar)
- Ver todos los estudiantes
- Buscar estudiante por id

Código simple para principiantes.
```

**Código CRUD integrado con validador**:
```javascript
let estudiantes = [];
let siguienteId = 1;

function agregarEstudiante(nombre, calificacion) {
  // Primero validar
  const validacion = validarEstudiante(nombre, calificacion);

  if (!validacion.esValido) {
    console.log("No se pudo agregar el estudiante:");
    validacion.errores.forEach(error => console.log("- " + error));
    return null;
  }

  // Si es válido, agregar
  const estudiante = {
    id: siguienteId,
    nombre: nombre,
    calificacion: calificacion
  };

  estudiantes.push(estudiante);
  siguienteId++;

  console.log("Estudiante agregado: " + nombre);
  return estudiante;
}

function verEstudiantes() {
  console.log("\n=== LISTA DE ESTUDIANTES ===");
  if (estudiantes.length === 0) {
    console.log("No hay estudiantes registrados");
    return;
  }

  estudiantes.forEach(est => {
    console.log(`ID: ${est.id} | ${est.nombre} | Calificación: ${est.calificacion}`);
  });
}
```

### Paso 3 de 3: Combinar todo

Ahora tienes validador + CRUD funcionando. Puedes usar todo esto de forma organizada:

```javascript
// Ejemplos de uso del sistema completo:

// Agregar estudiantes válidos
agregarEstudiante("Ana García", 95);
agregarEstudiante("Pedro López", 87);

// Intentar agregar estudiante inválido
agregarEstudiante("", 150); // Mostrará errores

// Ver la lista
verEstudiantes();
```

**¿Qué logramos?**:
- ✅ Código modular y organizado
- ✅ Validación automática
- ✅ Fácil de extender (puedes añadir editar y eliminar)
- ✅ Cada parte se puede probar independientemente

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: Copiar patrones sin entenderlos

**Te pasa cuando**: Le pides un patrón a Claude y lo usas sin entender cómo funciona

**Por qué es problema**: No podrás modificarlo o arreglar errores

**Cómo se soluciona**:
Después de recibir el código, pide explicación:
```
Explícame este código línea por línea como si tuviera 10 años
```

---

### Error #2: Usar patrones complejos siendo principiante

**Te pasa cuando**: Pides versiones avanzadas de patrones cuando aún eres principiante

**Cómo se soluciona**:
Siempre añade a tus prompts:
```
Usa la versión más simple posible de este patrón.
Soy principiante, prioriza claridad sobre optimización.
```

---

### Error #3: Mezclar demasiados patrones de golpe

**Te pasa cuando**: Intentas usar 5 patrones juntos en tu primer intento

**Cómo se soluciona**:
Implementa un patrón a la vez:
1. Primero solo CRUD básico
2. Luego añade validación
3. Después añade el menú
4. Finalmente mejora la separación de responsabilidades

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: Los patrones no se memorizan, se reconocen con la práctica. No intentes aprender los 5 de memoria. Usa esta lección como referencia, vuelve a ella cada vez que necesites uno de estos patrones.

> **Otro tip importante**: Guarda tus implementaciones de patrones en una carpeta "plantillas". Cuando necesites CRUD otra vez, copia tu implementación anterior y adáptala. Los profesionales hacen esto todo el tiempo.

> **Un secreto profesional**: El verdadero poder de los patrones aparece cuando los combinas. CRUD + Validador es más poderoso que cada uno por separado. Menú + CRUD + Validador es aún mejor. Aprende a ensamblarlos como bloques de LEGO.

---

## Tu turno: Ejercicio guiado

**Objetivo**: Implementar un sistema de biblioteca simple usando 3 patrones

**Tiempo**: 35-40 minutos

**Patrones a usar**: CRUD, Validador, Separación de responsabilidades

**Lo que necesitas antes de empezar**:
- [ ] Claude Code abierto
- [ ] Archivo `biblioteca.js` creado

### Instrucciones paso a paso

**Parte 1: El validador** (10 min)

1. Pídele a Claude un validador para libros:
```
Necesito un validador para libros de biblioteca.

Validar:
- Título: no vacío
- Autor: no vacío
- ISBN: exactamente 13 caracteres
- Año: número entre 1900 y 2025

Devuelve objeto con esValido y errores.
```

2. Guarda el código
3. Prueba con datos buenos y malos

**Parte 2: El CRUD básico** (15 min)

4. Pide el CRUD:
```
Necesito CRUD para libros de biblioteca.

Cada libro: id, titulo, autor, isbn, año

Operaciones:
- Agregar (usando validador)
- Buscar por id
- Ver todos

Integra con el validador que ya tengo.
Código simple.
```

5. Guarda y prueba agregando 3 libros

**Parte 3: Separación de responsabilidades** (10 min)

6. Mejora la separación:
```
Tengo este código CRUD. Mejóralo separando mejor las responsabilidades:
- Una función solo para generar IDs
- Una función solo para formatear libros al mostrarlos
- Una función solo para verificar si existe un libro

Mantenlo simple.
```

7. Compara el antes y después

**Criterio de éxito**:
- [ ] El validador funciona correctamente
- [ ] Puedes agregar libros válidos
- [ ] Rechaza libros inválidos con mensajes claros
- [ ] Puedes ver la lista completa
- [ ] El código está bien separado por responsabilidades
- [ ] Entiendes qué hace cada función

**Desafío extra**:
Añade la función de eliminar libro usando el patrón CRUD completo.

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Los 5 patrones fundamentales**: CRUD (manejo de datos), Validador (verificación), Menú (interfaz), Separación de responsabilidades (organización), Objeto de configuración (claridad). Estos cubren el 80% de situaciones comunes
2. **Cómo pedirle patrones a Claude**: Especificando el patrón por nombre, dando contexto, y pidiendo versión simple para principiantes
3. **Los patrones se combinan**: El poder real aparece cuando usas varios patrones juntos. CRUD + Validador + Menú = aplicación completa y robusta

---

## Siguiente paso

¡Felicidades! Completaste el Módulo 3. En el próximo módulo: **Depuración y manejo de errores con Claude**. Aprenderás cómo encontrar y arreglar errores, cómo pedirle ayuda a Claude cuando algo no funciona, y cómo escribir código que maneje errores elegantemente.

---

**¿Dudas?** Los patrones pueden parecer abstractos al principio, pero después de usarlos 2-3 veces se vuelven segunda naturaleza. No intentes memorizarlos, enfócate en reconocer cuándo los necesitas. Esa es la verdadera habilidad.
