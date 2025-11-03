***Mejorar código existente: E arte de hacer las cosas más simples***


> "El código simple es mejor que el código complicado" - Proverbio de programadores

## Introducción: Cuando el código funciona pero puede ser mejor

Imagina que escribiste una receta que funciona: la comida sale rica. Pero la receta tiene 50 pasos cuando podría tener solo 10. O usa palabras muy complicadas que nadie entiende. La comida sigue siendo buena, pero hacer la receta es un dolor de cabeza.

Con el código pasa lo mismo. A veces funciona, pero es difícil de entender o de cambiar. En esta lección aprenderás a **reconocer cuándo el código necesita mejorarse** y **cómo pedirle a Claude que lo haga mejor**.

No te preocupes: no necesitas ser un experto para mejorar código. Solo necesitas saber reconocer las señales de que algo podría estar mejor.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Reconocer código que puede mejorar**: Identificarás las señales de que el código está confuso o complicado
2. **Pedir mejoras a Claude**: Sabrás exactamente qué decirle a Claude para que mejore tu código
3. **Entender por qué algo es mejor**: Comprenderás por qué el código mejorado es más fácil de usar
4. **Hacerlo tú mismo**: Aplicarás lo aprendido a tu propio código

---

## ¿Por qué es importante mejorar el código?

Piensa en tu cuarto. Puedes vivir con ropa tirada en el suelo, pero es más difícil encontrar las cosas y el espacio es menos agradable. Cuando lo ordenas, todo es más fácil.

El código es igual. Código desordenado funciona, pero es difícil de entender y de modificar. Código ordenado es un placer de leer y fácil de cambiar cuando lo necesites.

### 📊 Un dato interesante

Los programadores leen código 10 veces más de lo que lo escriben. Eso significa que es MÁS importante que el código sea fácil de leer que fácil de escribir.

---

## Concepto 1: La primera señal - código repetido

La primera señal de que el código puede mejorar es cuando ves **lo mismo escrito varias veces**.

### Ejemplo: Código que se repite

**Código que puede mejorar**:
```javascript
const precio1 = 100;
const descuento1 = precio1 * 0.20;
const precioFinal1 = precio1 - descuento1;

const precio2 = 150;
const descuento2 = precio2 * 0.20;
const precioFinal2 = precio2 - descuento2;

const precio3 = 200;
const descuento3 = precio3 * 0.20;
const precioFinal3 = precio3 - descuento3;
```

**¿Ves el problema?**: Estamos haciendo lo mismo 3 veces. Si queremos cambiar el descuento a 30%, tendríamos que cambiarlo en 3 lugares.

**Explicación**:
- **Líneas 1-3**: Calculamos el precio con descuento para un producto de 100
- **Líneas 5-7**: Lo mismo pero para un producto de 150
- **Líneas 9-11**: Lo mismo pero para un producto de 200
- **El problema**: Código repetido = más trabajo y más posibilidad de errores

---

## Concepto 2: Cómo mejorar código repetido

Ahora vamos a pedirle a Claude que mejore ese código creando una "función" (una máquina reutilizable).

### Tu primer mejora: Crear una función

**Lo que le pedirás a Claude**:
```
Tengo este código que se repite 3 veces:
[copias el código de arriba]

Mejóralo creando una función que pueda reutilizar
```

**Código mejorado**:
```javascript
function calcularPrecioConDescuento(precio) {
  const descuento = precio * 0.20;
  const precioFinal = precio - descuento;
  return precioFinal;
}

const precioFinal1 = calcularPrecioConDescuento(100);
const precioFinal2 = calcularPrecioConDescuento(150);
const precioFinal3 = calcularPrecioConDescuento(200);
```

**¿Qué cambió?**:
- ✨ **Nuevo**: Creamos una función `calcularPrecioConDescuento` que hace el cálculo una sola vez
- ✨ **Mejor**: Ahora solo llamamos a la función 3 veces en lugar de repetir todo el código
- 📝 **Ventaja**: Si queremos cambiar el descuento, solo lo cambiamos en UN lugar (línea 2)

**Explicación línea por línea**:
- **Línea 1** (`function calcularPrecioConDescuento(precio)`): Creamos una "máquina" que recibe un precio
- **Línea 2**: Calculamos el descuento (20% del precio)
- **Línea 3**: Calculamos el precio final (precio menos descuento)
- **Línea 4** (`return precioFinal`): La máquina devuelve el resultado
- **Líneas 7-9**: Usamos la máquina 3 veces con diferentes precios

**En resumen**: En lugar de escribir el mismo código 3 veces, lo escribimos una vez y lo reutilizamos.

---

## Concepto 3: La segunda señal - nombres confusos

Otra señal de que el código puede mejorar es cuando las variables tienen **nombres que no dicen qué son**.

### Ejemplo: Nombres que no ayudan

**Código confuso**:
```javascript
const x = 100;
const y = 20;
const z = x - (x * y / 100);

console.log(z);
```

**¿Ves el problema?**: No sabemos qué significan `x`, `y`, o `z`. Alguien que lea esto tendrá que adivinar.

**Explicación del problema**:
- **`x`**: No sabemos qué es (¿precio? ¿cantidad?)
- **`y`**: Tampoco (¿descuento? ¿impuesto?)
- **`z`**: Menos todavía (¿el resultado?)
- Hay que leer TODO el código para entender qué hace

### Mejorándolo con buenos nombres

**Lo que le pedirás a Claude**:
```
Este código funciona pero no entiendo qué hace cada variable:
[copias el código de arriba]

Mejóralo usando nombres que expliquen qué es cada cosa
```

**Código mejorado**:
```javascript
const precioOriginal = 100;
const porcentajeDescuento = 20;
const precioConDescuento = precioOriginal - (precioOriginal * porcentajeDescuento / 100);

console.log(precioConDescuento);
```

**¿Qué cambió?**:
- `x` → `precioOriginal` (ahora sabemos que es el precio inicial)
- `y` → `porcentajeDescuento` (ahora sabemos que es el descuento en porcentaje)
- `z` → `precioConDescuento` (ahora sabemos que es el precio después del descuento)

**En resumen**: Ahora cualquiera que lea el código entiende inmediatamente qué hace, sin tener que adivin ar.

---

## Práctica guiada: Mejoremos código juntos

Vamos a tomar un código real que tiene varios problemas y mejorarlo paso a paso.

### Paso 1 de 3: Identificar los problemas

**Este es el código problemático**:
```javascript
const n1 = 10;
const n2 = 20;
const n3 = 30;

const s = n1 + n2 + n3;
const p = s / 3;

console.log(p);
```

**Preguntas para ti** (piensa antes de seguir):
- ¿Qué hacen n1, n2, n3?
- ¿Qué es s?
- ¿Qué es p?
- ¿Podríamos hacerlo más claro?

### Paso 2 de 3: Pedir mejoras a Claude

**Lo que le dirás a Claude**:
```
Tengo este código que calcula el promedio de tres números:
[copias el código de arriba]

Problemas que veo:
1. Los nombres de variables no son claros
2. No muestra un mensaje explicando qué es el resultado

Mejóralo para que sea más fácil de entender
```

**Código mejorado**:
```javascript
const nota1 = 10;
const nota2 = 20;
const nota3 = 30;

const sumaDeNotas = nota1 + nota2 + nota3;
const promedio = sumaDeNotas / 3;

console.log("El promedio de las notas es: " + promedio);
```

**Checkpoint**: Ejecuta ambos códigos. Hacen lo mismo, pero el segundo es mucho más claro.

### Paso 3 de 3: Hacerlo aún mejor con una función

Ahora vamos a mejorarlo todavía más creando una función reutilizable.

**Lo que le pedirás a Claude**:
```
Mejora el código anterior creando una función que pueda calcular el promedio de cualquier conjunto de notas
```

**Código final**:
```javascript
function calcularPromedio(nota1, nota2, nota3) {
  const suma = nota1 + nota2 + nota3;
  const promedio = suma / 3;
  return promedio;
}

// Ahora podemos usarla con diferentes notas
const promedioEstudiante1 = calcularPromedio(10, 20, 30);
const promedioEstudiante2 = calcularPromedio(15, 18, 22);

console.log("Estudiante 1: " + promedioEstudiante1);
console.log("Estudiante 2: " + promedioEstudiante2);
```

**¿Qué ganamos?**:
- Podemos calcular el promedio de cualquier estudiante
- El código está organizado y es fácil de entender
- Si queremos cambiar cómo se calcula, solo lo hacemos en un lugar

**Checkpoint**: Ahora puedes calcular promedios para 100 estudiantes sin repetir código.

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: Cambiar demasiadas cosas a la vez

**Te pasa cuando**: Intentas mejorar TODO el código de una sola vez

**Ves este problema**:
- El código deja de funcionar
- No sabes qué cambio causó el problema
- Te confundes y pierdes el código original

**Cómo se soluciona**:
1. **GUARDA** una copia del código original
2. Mejora UNA cosa a la vez
3. Prueba que funcione después de cada cambio
4. Si algo se rompe, vuelve atrás

**Ejemplo del orden correcto**:
```
Paso 1: Mejorar los nombres de variables → Probar
Paso 2: Eliminar código repetido → Probar
Paso 3: Agregar comentarios → Probar
```

---

### Error #2: Pedir mejoras sin explicar el contexto

**Te pasa cuando**: Le dices a Claude "mejora este código" sin explicar qué hace

**Por qué es problema**: Claude puede hacer cambios que técnicamente son "mejores" pero cambian lo que el código hace

**Cómo se soluciona**:
Siempre explica qué hace el código y qué quieres mantener igual.

**Ejemplo malo**:
```
Mejora este código:
const x = 100;
const y = x * 0.20;
```

**Ejemplo bueno**:
```
Este código calcula un descuento del 20% sobre un precio de 100.
Quiero que funcione igual pero con nombres más claros.
Mejóralo sin cambiar la lógica.
```

---

### Error #3: No verificar que sigue funcionando igual

**Te pasa cuando**: Mejoras el código pero no verificas que hace lo mismo que antes

**Cómo se soluciona**:
1. Antes de mejorar, anota qué resultado da el código original
2. Mejora el código
3. Verifica que el código mejorado da el MISMO resultado
4. Si el resultado es diferente, algo salió mal

**Ejemplo**:
```javascript
// Código original - da resultado: 80
const precio = 100;
const final = precio - 20;
console.log(final);  // 80

// Código mejorado - DEBE dar el mismo resultado
function calcularPrecioFinal(precio) {
  return precio - 20;
}
console.log(calcularPrecioFinal(100));  // Debe ser 80
```

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: El mejor momento para mejorar código es justo después de que funcione por primera vez. En ese momento todavía lo tienes fresco en la mente y es más fácil organizarlo.

> **Otro tip importante**: Si tienes que explicarle a alguien qué hace tu código y te cuesta trabajo, es señal de que necesita mejorarse. El código claro se explica solo.

> **Un último tip**: Cuando cambies nombres de variables, usa nombres que expliquen QUÉ ES la cosa, no cómo la usas. Por ejemplo: `nombreDelEstudiante` es mejor que `texto1`.

---

## Tu turno: Ejercicio guiado

**Objetivo Simple**: Mejorar un código que calcula el área de un rectángulo

**Tiempo**: 20-25 minutos

**Código problemático para mejorar**:
```javascript
const a = 10;
const b = 5;
const r = a * b;
console.log(r);
```

### Instrucciones paso a paso

**Parte 1: Identificar Problemas** (5 min)

1. Copia el código en un archivo llamado `rectangulo.js`
2. Ejecútalo para ver qué hace
3. Haz una lista de los problemas que ves:
   - ¿Los nombres son claros?
   - ¿El mensaje de salida es útil?
   - ¿Podrías reutilizarlo para otros rectángulos?

**Parte 2: Mejorar Nombres** (5 min)

4. Pídele a Claude:
```
Este código calcula el área de un rectángulo:
[pega el código]

Mejóralo usando nombres de variables que expliquen qué representan
```

5. Prueba el código mejorado
6. Verifica que da el mismo resultado (50)

**Parte 3: Hacerlo Reutilizable** (10 min)

7. Pídele a Claude:
```
Ahora conviértelo en una función que pueda calcular el área de cualquier rectángulo
```

8. Prueba la función con diferentes valores:
   - Rectángulo de 10 x 5
   - Rectángulo de 20 x 3
   - Rectángulo de 7 x 7

**Parte 4: Agregar Validaciones** (5 min)

9. Pídele a Claude:
```
Mejora la función para que muestre un error si los números son negativos
(porque un rectángulo no puede tener lados negativos)
```

10. Prueba con números negativos para ver el mensaje de error

**Criterio de éxito**:
- [ ] El código tiene nombres claros
- [ ] Funciona como función reutilizable
- [ ] Muestra errores cuando los valores no tienen sentido
- [ ] Da los mismos resultados que el código original

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Reconocer código que puede mejorar**: Código repetido y nombres confusos son las señales principales
2. **Pedirle mejoras a Claude**: Sé específico sobre qué problema quieres resolver
3. **Mejorar paso a paso**: Una cosa a la vez, probando después de cada cambio

---

## Siguiente paso

En la próxima lección: Aprenderás a **encontrar y arreglar errores** cuando el código no funciona. Es como ser un detective que busca pistas.

---

**¿Dudas?** Recuerda: mejorar código es una habilidad que se desarrolla con práctica. Cada vez que mejores algo, estarás más cerca de escribir código profesional desde el principio.