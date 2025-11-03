***Encontrar y arreglar errores: SR un detective de código***


> "Los errores no son fracasos, son pistas que te dicen dónde mejorar" - Anónimo

## Introducción: Cuando el código no funciona

Imagina que estás armando un mueble siguiendo las instrucciones. De repente, una pieza no encaja. ¿Qué haces? Vuelves a revisar los pasos, buscas dónde te equivocaste, y lo corriges.

Con el código pasa exactamente lo mismo. A veces escribes algo y no funciona. Aparece un mensaje de error que parece estar en otro idioma. **¡No te preocupes!** Esto le pasa a TODOS los programadores, incluso a los que llevan 20 años programando.

En esta lección aprenderás a **leer los mensajes de error**, **encontrar dónde está el problema**, y **pedirle ayuda a Claude para arreglarlo**.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Entender los mensajes de error**: Aprenderás a leer qué te dicen los errores (en español simple)
2. **Encontrar dónde está el problema**: Sabrás cómo buscar la línea de código que causa el error
3. **Pedir ayuda a Claude**: Aprenderás la mejor forma de mostrarle el error a Claude
4. **Arreglar los errores más comunes**: Conocerás los 5 errores que todos los principiantes cometen

---

## ¿Por qué aparecen los errores?

Los errores NO significan que eres mal programador. Significan que:
- Escribiste algo de una forma que la computadora no entiende
- Olvidaste algo pequeño pero importante (como un punto y coma)
- Usaste algo que no existe (como una variable que no creaste)

Es como escribir en español: si escribes "Yo comer manzana", técnicamente se entiende, pero no está bien escrito. La computadora es más estricta: si no está perfecto, no funciona.

### 📊 Un dato que te hará sentir mejor

Los programadores profesionales pasan entre 30-50% de su tiempo arreglando errores. No es algo que desaparezca con la experiencia. Lo que cambia es que se vuelven más rápidos encontrándolos y arreglándolos.

---

## Concepto 1: Los 3 tipos de errores

Hay tres tipos principales de errores. Cada uno se comporta diferente.

### Tipo 1: Errores de escritura (syntax errors)

Estos son como errores de ortografía. Escribiste algo que la computadora no entiende.

**Ejemplo**:
```javascript
const nombre = "Ana"
console.log(nombre)
```

**El error que ves**:
```
SyntaxError: Unexpected identifier
```

**¿Qué significa?**: "Encontré algo que no esperaba"

**El problema**: Falta el punto y coma (`;`) al final de la primera línea

**Código arreglado**:
```javascript
const nombre = "Ana";
console.log(nombre);
```

**Explicación**:
- **Línea 1**: Antes decía `"Ana"` sin punto y coma al final. JavaScript esperaba un `;` para saber que terminaste esa instrucción
- **Línea 2**: Esta línea está bien
- **La solución**: Agregar `;` al final de la línea 1

---

### Tipo 2: Errores de cosas que no existen (reference errors)

Estos errores pasan cuando usas algo que no creaste antes.

**Ejemplo**:
```javascript
const nombre = "Ana";
console.log(edad);
```

**El error que ves**:
```
ReferenceError: edad is not defined
```

**¿Qué significa en español?**: "edad no está definida" (no existe)

**El problema**: Intentamos usar `edad` pero nunca la creamos

**Código arreglado**:
```javascript
const nombre = "Ana";
const edad = 25;
console.log(edad);
```

**Explicación línea por línea**:
- **Línea 1**: Creamos la variable `nombre`
- **Línea 2**: NUEVO - Creamos la variable `edad` (esto faltaba)
- **Línea 3**: Ahora sí podemos mostrar `edad` porque ya existe

**En resumen**: Antes de usar algo, tienes que crearlo.

---

### Tipo 3: Errores de lógica (logic errors)

Estos son los más difíciles porque el código funciona, pero hace algo incorrecto.

**Ejemplo**:
```javascript
const precio = 100;
const descuento = 20;
const precioFinal = precio + descuento;

console.log(precioFinal);  // Muestra: 120
```

**El error**: No da error de computadora, pero el resultado está mal. Sumamos (+) cuando deberíamos restar (-).

**Código arreglado**:
```javascript
const precio = 100;
const descuento = 20;
const precioFinal = precio - descuento;

console.log(precioFinal);  // Muestra: 80
```

**¿Qué cambió?**:
- **Línea 3**: Cambiamos `+` (sumar) por `-` (restar)
- Ahora el precio final es correcto

---

## Concepto 2: Cómo leer un mensaje de error

Los mensajes de error parecen complicados, pero siguen siempre el mismo formato.

### Anatomía de un error

**Este es un error típico**:
```
ReferenceError: edad is not defined
    at Object.<anonymous> (/Users/tu/codigo.js:3:13)
```

**Vamos a dividirlo en partes**:

1. **`ReferenceError`**: El TIPO de error (qué salió mal)
2. **`edad is not defined`**: El MENSAJE (qué específicamente está mal)
3. **`codigo.js:3:13`**: DÓNDE está el error (archivo: codigo.js, línea: 3, columna: 13)

**Lo más importante**: Siempre mira la **línea** donde dice que está el error. Esa es tu primera pista.

---

## Práctica guiada: Encontrar y arreglar errores

Vamos a practicar con errores reales, paso a paso.

### Paso 1 de 3: Tu primer error

**Este código tiene un error**:
```javascript
const nombre = "Juan"
const edad = 25
console.log(nombre, edad)
```

**Lo que harás**:
1. Copia el código en un archivo llamado `error1.js`
2. Trata de ejecutarlo: `node error1.js`
3. Lee el error que aparece

**El error que verás**:
```
SyntaxError: Unexpected identifier 'edad'
```

**Checkpoint**: ¿Ves que dice "línea 2"? Esa es tu pista.

### Paso 2 de 3: Pedirle ayuda a Claude

Ahora vamos a pedirle ayuda a Claude de la forma correcta.

**Lo que le dirás a Claude**:
```
Tengo este código:
[pega el código completo]

Cuando lo ejecuto, me sale este error:
SyntaxError: Unexpected identifier 'edad'

¿Qué significa y cómo lo arreglo?
```

**La respuesta de Claude será algo como**:
"El error dice 'identificador inesperado'. Esto significa que JavaScript no esperaba encontrar 'edad' ahí. El problema es que falta un punto y coma (;) al final de la línea 1."

**Código arreglado**:
```javascript
const nombre = "Juan";
const edad = 25;
console.log(nombre, edad);
```

### Paso 3 de 3: Verificar que funciona

**Lo que harás**:
1. Arregla el código
2. Guarda el archivo
3. Ejecútalo otra vez: `node error1.js`
4. **Checkpoint**: Deberías ver `Juan 25` sin errores

---

## ⚠️ Los 5 errores más comunes de principiantes

### Error #1: Olvidar el punto y coma

**Código con error**:
```javascript
const nombre = "Ana"
const edad = 25
```

**Mensaje de error**:
```
SyntaxError: Unexpected identifier
```

**Qué significa**: JavaScript esperaba que terminaras la línea con `;`

**Cómo se arregla**:
```javascript
const nombre = "Ana";
const edad = 25;
```

**Explicación**: Añadir `;` al final de cada línea es como poner un punto al final de una oración.

---

### Error #2: Usar una variable antes de crearla

**Código con error**:
```javascript
console.log(mensaje);
const mensaje = "Hola";
```

**Mensaje de error**:
```
ReferenceError: Cannot access 'mensaje' before initialization
```

**Qué significa en español**: "No puedes usar 'mensaje' antes de crearlo"

**Cómo se arregla**:
```javascript
const mensaje = "Hola";
console.log(mensaje);
```

**Explicación**:
- **Línea 1**: PRIMERO creamos la variable
- **Línea 2**: DESPUÉS la usamos
- **Regla**: Siempre crea las cosas antes de usarlas

---

### Error #3: Comillas que no coinciden

**Código con error**:
```javascript
const nombre = "Ana';
console.log(nombre);
```

**Mensaje de error**:
```
SyntaxError: Unexpected token
```

**El problema**: Empezamos con comilla doble (`"`) pero terminamos con comilla simple (`'`)

**Cómo se arregla**:
```javascript
const nombre = "Ana";
console.log(nombre);
```

**Explicación**: Si empiezas con `"`, debes terminar con `"`. Si empiezas con `'`, terminas con `'`.

---

### Error #4: Escribir mal el nombre de una variable

**Código con error**:
```javascript
const nombreCompleto = "Ana García";
console.log(nombrecompleto);
```

**Mensaje de error**:
```
ReferenceError: nombrecompleto is not defined
```

**El problema**: Escribimos `nombreCompleto` (con C mayúscula) pero usamos `nombrecompleto` (todo minúsculas)

**Cómo se arregla**:
```javascript
const nombreCompleto = "Ana García";
console.log(nombreCompleto);
```

**Explicación**: JavaScript diferencia entre mayúsculas y minúsculas. `nombreCompleto` y `nombrecompleto` son cosas DIFERENTES.

---

### Error #5: Olvidar los paréntesis en una función

**Código con error**:
```javascript
console.log "Hola";
```

**Mensaje de error**:
```
SyntaxError: Unexpected string
```

**El problema**: `console.log` necesita paréntesis: `console.log()`

**Cómo se arregla**:
```javascript
console.log("Hola");
```

**Explicación**: Las funciones SIEMPRE llevan paréntesis, así no tengan nada adentro.

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: Cuando veas un error, NO entres en pánico. Lee el mensaje con calma. El 80% de las veces te dice exactamente qué línea tiene el problema.

> **Tip importante**: Si un error dice "línea 5" pero no ves nada malo ahí, revisa la línea 4. A veces el error está en la línea anterior.

> **Último tip**: Copia el mensaje de error COMPLETO cuando le pidas ayuda a Claude. Necesita ver todo el mensaje para ayudarte mejor.

---

## Tu turno: Ejercicio de detective

**Objetivo**: Encontrar y arreglar 3 errores en un código

**Tiempo**: 20 minutos

**Código con errores para arreglar**:
```javascript
const precioOriginal = 100
const descuento = 20;
const precioFinal = precioOriginal - descu

console.log("El precio final es: " + precioFinal);
```

### Instrucciones paso a paso

**Parte 1: Identificar los Errores** (5 min)

1. Copia el código en un archivo `ejercicio-errores.js`
2. Intenta ejecutarlo
3. Anota qué error aparece PRIMERO (solo el primero)

**Parte 2: Arreglar el Primer Error** (5 min)

4. Pídele ayuda a Claude mostrándole el error
5. Arregla lo que Claude te indique
6. Vuelve a ejecutar

**Parte 3: Arreglar el Resto** (10 min)

7. Si aparece otro error, repite el paso 4-6
8. Continúa hasta que el código funcione sin errores

**Pista**: Hay 3 errores en total:
- Un punto y coma que falta
- Un nombre de variable incompleto
- (Busca el tercero)

**Criterio de éxito**:
- [ ] El código se ejecuta sin errores
- [ ] Muestra: "El precio final es: 80"
- [ ] Entiendes qué estaba mal en cada error

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Los 3 tipos de errores**: Escritura, referencias, y lógica
2. **Cómo leer mensajes de error**: Tipo, mensaje, y línea donde está
3. **Los 5 errores más comunes**: Y cómo arreglar cada uno

---

## Siguiente paso

En la próxima lección: Aprenderás a **probar que tu código funciona correctamente** antes de usarlo en serio. Como un control de calidad para tu código.

---

**¿Dudas?** Recuerda: los errores son normales y son oportunidades de aprender. Cada error que arreglas te hace mejor programador.