***Documentar tu código: Explicar qué hace cada parte***


> "El código sin explicación es un misterio sin resolver" - Anónimo

## Introducción: El código que nadie entiende

Imagina que encuentras una receta que dice:
```
1. Mezcla
2. Hornea
3. Decora
```

¿Mezclar qué? ¿Por cuánto tiempo hornear? ¿Cómo decorar? Sin instrucciones claras, no puedes hacer la receta.

El código sin **documentación** (explicaciones) es igual. Puede funcionar, pero nadie entiende qué hace o cómo usarlo.

En esta lección aprenderás a **escribir explicaciones claras** para tu código, para que tú y otros puedan entenderlo fácilmente.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Escribir comentarios útiles**: Aprenderás a explicar qué hace tu código
2. **Crear documentación simple**: Escribir archivos README que expliquen tu proyecto
3. **Usar Claude para documentar**: Pedirle ayuda a Claude para generar explicaciones
4. **Saber qué documentar**: Entender qué partes necesitan explicación y cuáles no

---

## ¿Por qué documentar es importante?

Piensa en esto: en 6 meses, vas a volver a tu código. ¿Vas a recordar por qué hiciste las cosas de cierta manera? Probablemente no.

La documentación es como dejarle notas a tu "yo del futuro". O a cualquier persona que vea tu código.

### 📊 Un dato interesante

Los programadores pasan 60% de su tiempo LEYENDO código y solo 40% escribiéndolo. Por eso es tan importante que el código esté bien explicado.

---

## Concepto 1: Comentarios simples

Los **comentarios** son notas que escribes en tu código para explicar qué hace algo.

### Tu primer comentario

**Código sin comentarios**:
```javascript
const precio = 100;
const descuento = 20;
const final = precio - (precio * descuento / 100);
```

**¿Qué hace esto?** Tienes que leer todo y pensarlo.

**Código CON comentarios**:
```javascript
// Precio original del producto
const precio = 100;

// Descuento en porcentaje (20 significa 20%)
const descuento = 20;

// Calcular precio final después del descuento
const final = precio - (precio * descuento / 100);
```

**¿Qué cambió?**:
- Ahora cada línea tiene una explicación
- Es MUCHO más fácil de entender
- Si alguien más lee el código, sabe inmediatamente qué hace

**Explicación**:
- Los comentarios empiezan con `//` (dos barras diagonales)
- Todo lo que va después de `//` es un comentario (no es código que se ejecuta)
- Los comentarios son para humanos, no para la computadora

---

## Concepto 2: Comentarios útiles vs. inútiles

No todos los comentarios ayudan. Algunos solo repiten lo obvio.

### Ejemplo de comentario inútil

**❌ Mal**:
```javascript
// Suma a y b
const resultado = a + b;
```

**¿Por qué es malo?**: El comentario solo repite lo que el código ya dice. No añade información nueva.

### Ejemplo de comentario útil

**✅ Bueno**:
```javascript
// Sumamos el precio base más impuestos (15%)
const resultado = precioBase + (precioBase * 0.15);
```

**¿Por qué es bueno?**: Explica el PORQUÉ (necesitamos añadir impuestos del 15%).

**Regla simple**: Los comentarios deben explicar el "por qué", no el "qué".

---

## Concepto 3: Documentar funciones

Cuando creas una función, es útil explicar:
- Qué hace la función
- Qué información necesita (parámetros)
- Qué devuelve

### Ejemplo: Función sin documentar

**Código sin explicación**:
```javascript
function calcular(p, d) {
  return p - (p * d / 100);
}
```

**Problemas**:
- ¿Qué significa "p"?
- ¿Qué significa "d"?
- ¿Qué devuelve?

### Ejemplo: Función bien documentada

**Código con explicación**:
```javascript
/**
 * Calcula el precio final después de aplicar un descuento
 *
 * Recibe:
 * - precio: El precio original del producto (número)
 * - descuento: El descuento en porcentaje, por ejemplo 20 para 20% (número)
 *
 * Devuelve:
 * - El precio final después del descuento (número)
 *
 * Ejemplo:
 * calcularPrecioConDescuento(100, 20) devuelve 80
 */
function calcularPrecioConDescuento(precio, descuento) {
  return precio - (precio * descuento / 100);
}
```

**Explicación del formato**:
- **`/**`** y **`*/`**: Marcan el inicio y fin de un comentario largo
- **Qué hace**: Primera línea explica el propósito
- **Recibe**: Lista los parámetros y qué representa cada uno
- **Devuelve**: Explica qué resultado da la función
- **Ejemplo**: Muestra cómo usarla

**En resumen**: Ahora cualquiera puede usar esta función sin tener que leer todo el código interno.

---

## Práctica guiada: Documentar tu código

Vamos a tomar código sin documentar y añadirle explicaciones paso a paso.

### Paso 1 de 3: Código sin documentar

**Este es el código original**:
```javascript
function cp(n, e) {
  if (e < 18) {
    return n * 0.5;
  } else if (e >= 65) {
    return n * 0.7;
  } else {
    return n;
  }
}
```

**Problema**: No sabemos qué hace, qué significan las variables, ni para qué sirve.

### Paso 2 de 3: Pedirle ayuda a Claude

**Lo que le dirás a Claude**:
```
Tengo esta función pero no tiene documentación:
[pega el código]

Por el código parece que calcula precios con descuentos según la edad.
Ayúdame a:
1. Ponerle un nombre claro a la función
2. Ponerle nombres claros a las variables
3. Agregar comentarios que expliquen qué hace
```

### Paso 3 de 3: Código documentado

**Claude te dará algo como**:
```javascript
/**
 * Calcula el precio de una entrada según la edad del comprador
 *
 * Aplicamos descuentos especiales:
 * - Menores de 18 años: 50% de descuento
 * - Mayores de 65 años: 30% de descuento
 * - Adultos (18-64): Precio completo
 *
 * Recibe:
 * - precioBase: El precio normal de la entrada (número)
 * - edad: La edad del comprador (número)
 *
 * Devuelve:
 * - El precio final con descuento aplicado (número)
 *
 * Ejemplos:
 * - calcularPrecioEntrada(100, 15) devuelve 50 (menor de edad)
 * - calcularPrecioEntrada(100, 70) devuelve 70 (adulto mayor)
 * - calcularPrecioEntrada(100, 30) devuelve 100 (adulto)
 */
function calcularPrecioEntrada(precioBase, edad) {
  // Descuento para menores de 18
  if (edad < 18) {
    return precioBase * 0.5;  // 50% de descuento
  }
  // Descuento para adultos mayores
  else if (edad >= 65) {
    return precioBase * 0.7;  // 30% de descuento
  }
  // Precio completo para adultos
  else {
    return precioBase;
  }
}
```

**Checkpoint**: Ahora el código es MUCHO más fácil de entender. Sin siquiera leer el código interno, sabes exactamente qué hace.

---

## Concepto 4: E archivo readme

Un archivo **README** es como la portada de tu proyecto. Explica:
- Qué hace el proyecto
- Cómo usarlo
- Cómo instalarlo

### Ejemplo de readme simple

**Archivo: README.md**
```markdown
# Calculadora de descuentos

## Qué hace

Este proyecto es una calculadora simple que calcula precios con descuentos.

## Cómo usar

1. Descarga el archivo `calculadora.js`
2. Abre la terminal
3. Ejecuta: `node calculadora.js`

## Ejemplo

Si tienes un producto de $100 con 20% de descuento:
```javascript
const precioFinal = calcularDescuento(100, 20);
console.log(precioFinal);  // Muestra: 80
```

## Autor

Tu nombre aquí
```

**Explicación del formato**:
- **`# Título`**: El nombre de tu proyecto (el `#` hace títulos grandes)
- **`## Sección`**: Diferentes secciones (`##` hace títulos medianos)
- **Código dentro**: Usa ``` para mostrar código
- Es como un documento de Word, pero en texto simple

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: CMentar cosas obvias

**❌ Mal**:
```javascript
// Incrementa i en 1
i = i + 1;
```

**Por qué es malo**: El código ya dice que incrementa i. El comentario no añade información nueva.

**✅ Mejor**: Solo comenta si hay algo no obvio
```javascript
// Saltamos al siguiente elemento del array
i = i + 1;
```

**Explicación**: Ahora el comentario explica el PROPÓSITO (saltar elementos), no solo la acción.

---

### Error #2: Comentarios desactualizados

**Te pasa cuando**: Cambias el código pero olvidas actualizar el comentario

**Ejemplo problemático**:
```javascript
// Aplicamos descuento del 20%
const precioFinal = precio * 0.8;  // Esto es 20% de descuento
```

Luego cambias a 30% pero olvidas el comentario:
```javascript
// Aplicamos descuento del 20%  ← ¡Esto ya no es verdad!
const precioFinal = precio * 0.7;  // Ahora es 30%
```

**Cómo se soluciona**: Cuando cambies código, actualiza los comentarios también.

---

### Error #3: N documentar funciones complejas

**Te pasa cuando**: Tienes una función complicada pero no explicas qué hace

**Ejemplo sin documentar**:
```javascript
function x(a, b, c) {
  let r = a * b;
  if (c > 10) r = r * 0.9;
  if (c > 20) r = r * 0.8;
  return r;
}
```

**Por qué es problema**: Nadie (ni tu yo del futuro) sabrá qué hace esta función

**Cómo se soluciona**: Documenta especialmente las funciones complejas
```javascript
/**
 * Calcula el precio total con descuentos por cantidad
 *
 * Aplicamos descuentos progresivos:
 * - Más de 10 unidades: 10% de descuento
 * - Más de 20 unidades: 20% de descuento (acumulativo)
 *
 * Recibe:
 * - precio: Precio por unidad
 * - cantidad: Número de unidades
 * - unidadesCompradas: Total de unidades en el pedido
 *
 * Devuelve:
 * - Precio total con descuentos aplicados
 */
function calcularPrecioConDescuentoPorCantidad(precio, cantidad, unidadesCompradas) {
  let total = precio * cantidad;
  if (unidadesCompradas > 10) total = total * 0.9;
  if (unidadesCompradas > 20) total = total * 0.8;
  return total;
}
```

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: Documenta mientras escribes el código, no después. Si esperas al final, probablemente olvidarás detalles importantes.

> **Tip importante**: Pregúntate: "Si alguien que nunca ha visto este código lo lee, ¿lo entendería?" Si la respuesta es no, necesitas más documentación.

> **Último tip**: README es lo PRIMERO que la gente ve en tu proyecto. Invierte 10 minutos en hacer un buen README y ahorrarás horas respondiendo preguntas.

---

## Tu turno: Ejercicio guiado

**Objetivo Simple**: Documentar una función existente

**Tiempo**: 20 minutos

**Código para documentar**:
```javascript
function calc(n) {
  let s = 0;
  for (let i = 1; i <= n; i++) {
    s = s + i;
  }
  return s;
}
```

### Instrucciones paso a paso

**Parte 1: Entender el Código** (5 min)

1. Copia el código en un archivo
2. Prueba ejecutándolo con diferentes números:
   - `calc(5)` devuelve ¿qué?
   - `calc(10)` devuelve ¿qué?
3. Descubre qué hace la función

**Pista**: Suma todos los números desde 1 hasta n

**Parte 2: Mejorar Nombres** (5 min)

4. Pídele a Claude:
```
Esta función suma todos los números desde 1 hasta n:
[pega el código]

Ayúdame a ponerle mejores nombres a la función y las variables
```

5. Deberías obtener algo como:
```javascript
function sumarHastaN(numero) {
  let suma = 0;
  for (let i = 1; i <= numero; i++) {
    suma = suma + i;
  }
  return suma;
}
```

**Parte 3: Agregar Documentación** (10 min)

6. Añade comentarios explicativos:
```javascript
/**
 * Suma todos los números enteros desde 1 hasta el número dado
 *
 * Por ejemplo, si el número es 5, suma: 1 + 2 + 3 + 4 + 5 = 15
 *
 * Recibe:
 * - numero: El número hasta donde sumar (número entero positivo)
 *
 * Devuelve:
 * - La suma de todos los números desde 1 hasta numero
 *
 * Ejemplos:
 * - sumarHastaN(5) devuelve 15
 * - sumarHastaN(10) devuelve 55
 */
function sumarHastaN(numero) {
  let suma = 0;

  // Recorremos desde 1 hasta el número dado
  for (let i = 1; i <= numero; i++) {
    suma = suma + i;  // Vamos sumando cada número
  }

  return suma;
}
```

**Criterio de éxito**:
- [ ] La función tiene un nombre claro
- [ ] Las variables tienen nombres descriptivos
- [ ] Hay un comentario explicando qué hace la función
- [ ] Hay ejemplos de uso
- [ ] Los comentarios explican el "por qué", no solo el "qué"

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Comentarios útiles**: Explicar el "por qué", no solo el "qué"
2. **Documentar funciones**: Explicar qué hace, qué recibe, qué devuelve
3. **Crear archivos README**: La portada de tu proyecto

---

## Siguiente paso

En la próxima lección: Tu **PROYECTO FINAL** del módulo. Vas a crear una mini-aplicación usando todo lo que has aprendido.

---

**¿Dudas?** La documentación parece trabajo extra, pero es una inversión. Cada minuto que inviertes documentando te ahorra 10 minutos después.