<p><strong><em>Prompting efectivo: Cómo hablar con Claude para obtener código de calidad</em></strong></p>

## Introducción: La diferencia entre un buen y un mal pedido

¿Alguna vez pediste algo y recibiste exactamente lo contrario de lo que querías? Tal vez en un restaurante pediste "algo ligero" y te trajeron una ensalada enorme con pollo frito. O pediste "ayuda con la computadora" y alguien te dio una explicación tan técnica que quedaste más confundido.

Con Claude Code pasa lo mismo. La forma en que pides las cosas determina completamente el resultado que obtienes. Un prompt (así llamamos a lo que le escribes a Claude) bien hecho te dará código limpio, claro y que funciona. Un prompt vago o confuso... bueno, te dará algo, pero probablemente no lo que esperabas.

En esta lección aprenderás **el arte de pedir bien**. No es difícil, pero marca una diferencia enorme. Es como la diferencia entre decir "quiero un café" y decir "quiero un café americano, grande, sin azúcar". El segundo pedido es claro, específico, y te aseguras de recibir exactamente lo que quieres.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Escribir prompts claros y específicos**: Sabrás exactamente qué información incluir para que Claude entienda lo que necesitas
2. **Identificar prompts malos**: Reconocerás qué hace que un prompt no funcione bien
3. **Transformar prompts vagos en prompts efectivos**: Tomarás un pedido confuso y lo convertirás en uno claro
4. **Estructurar tus pedidos**: Aprenderás una fórmula simple para escribir buenos prompts siempre

---

## ¿Por qué es importante pedir bien?

Imagina que eres arquitecto y le pides a un constructor que te construya "una casa bonita". ¿Qué pasaría? Probablemente el constructor te hará mil preguntas: ¿De cuántos pisos? ¿Cuántos cuartos? ¿Qué estilo? ¿En qué presupuesto?

Ahora imagina que dices: "Necesito una casa de dos pisos, tres habitaciones, dos baños, estilo moderno, con jardín pequeño, para una familia de cuatro personas". Mucho mejor, ¿verdad?

Con Claude es igual. Mientras más claro seas, mejor será el código que recibas. Y lo mejor: **ahorrarás tiempo**. No tendrás que estar pidiendo correcciones una y otra vez.

### 📊 Un dato interesante

Los desarrolladores profesionales pasan el 60% de su tiempo entendiendo y arreglando código confuso. Un buen prompt desde el inicio reduce este tiempo a la mitad. Aprender a pedir bien es aprender a trabajar de forma inteligente.

---

## Concepto 1: Los ingredientes de un buen prompt

Un prompt efectivo tiene tres ingredientes básicos, como una buena receta de cocina:

1. **Qué quieres** (el objetivo)
2. **Cómo lo quieres** (los detalles)
3. **Para qué lo quieres** (el contexto)

Vamos a verlo con ejemplos reales.

### Ejemplo: Crear una función de suma

**Prompt malo**:
```
Haz una función de suma
```

**Por qué no funciona bien**:
Es muy vago. ¿Suma de dos números? ¿De tres? ¿De cuántos? ¿Qué hace con el resultado? Claude tendrá que adivinar, y puede que no adivine lo que tú querías.

**Prompt mejorado**:
```
Necesito una función que:
- Se llame "sumar"
- Reciba dos números como entrada
- Devuelva la suma de esos números
- Incluya un ejemplo de cómo usarla
```

**El código que Claude daría**:
```javascript
function sumar(numero1, numero2) {
  return numero1 + numero2;
}

// Ejemplo de uso:
console.log(sumar(5, 3)); // Resultado: 8
```

**Explicación línea por línea**:
- **Línea 1** (`function sumar(numero1, numero2)`): Creamos una función llamada "sumar" que recibe dos valores (numero1 y numero2)
- **Línea 2** (`return numero1 + numero2`): Sumamos los dos números y devolvemos el resultado
- **Línea 3** (`}`): Cerramos la función
- **Línea 5-6** (comentario): Es un texto explicativo que no se ejecuta, solo informa
- **Línea 6** (`console.log(sumar(5, 3))`): Llamamos a la función con los números 5 y 3, y mostramos el resultado

**¿Qué cambió?**:
- ✨ **Nuevo**: Especificamos el nombre exacto de la función
- ✨ **Nuevo**: Dijimos cuántos números (dos)
- ✨ **Nuevo**: Pedimos un ejemplo de uso
- 📝 **Por qué**: Al ser específicos, Claude sabe exactamente qué hacer y nos da código completo y usable

---

## Concepto 2: La estructura de un prompt efectivo

Ahora que entiendes los ingredientes, vamos a ver cómo organizarlos. Piensa en esto como una plantilla que puedes usar siempre.

### La fórmula mágica

```
[Tipo de código que necesitas]

Necesito que:
1. [Requisito específico 1]
2. [Requisito específico 2]
3. [Requisito específico 3]

Contexto: [Para qué lo vas a usar]
```

### Ejemplo: Validar una contraseña

Vamos a aplicar la fórmula a algo un poco más complejo.

**Prompt usando la fórmula**:
```
Crear una función que valide contraseñas

Necesito que:
1. Verifique que la contraseña tenga al menos 8 caracteres
2. Verifique que tenga al menos un número
3. Devuelva true si es válida, false si no lo es

Contexto: Es para un formulario de registro de usuarios
```

**Código que Claude daría**:
```javascript
function validarPassword(password) {
  const tieneNumero = /\d/.test(password);
  const largoCorrecto = password.length >= 8;

  return largoCorrecto && tieneNumero;
}
```

**Explicación línea por línea**:
- **Línea 1** (`function validarPassword(password)`): Creamos una función que recibe una contraseña como texto
- **Línea 2** (`const tieneNumero = /\d/.test(password)`): Verificamos si hay al menos un número. El `/\d/` es un patrón que busca dígitos
- **Línea 3** (`const largoCorrecto = password.length >= 8`): Verificamos si tiene 8 o más caracteres
- **Línea 5** (`return largoCorrecto && tieneNumero`): Devolvemos true solo si ambas condiciones son verdaderas. El `&&` significa "y"

**Por qué funciona bien**: Dimos instrucciones numeradas claras, y Claude pudo crear código que cumple exactamente esos requisitos.

---

## Concepto 3: Especificar el nivel de complejidad

A veces quieres código simple para aprender. Otras veces quieres código más completo. ¡Díselo a Claude!

### Ejemplo: Código simple vs código completo

**Situación**: Necesitas calcular el área de un círculo.

**Para aprender (código simple)**:
```
Necesito una función que calcule el área de un círculo.

Hazlo lo más simple posible, soy principiante.
Incluye comentarios explicando cada paso.
```

**Código simple que recibirías**:
```javascript
function calcularArea(radio) {
  // Pi es aproximadamente 3.14159
  const pi = 3.14159;

  // El área de un círculo es pi * radio * radio
  const area = pi * radio * radio;

  return area;
}

// Ejemplo: círculo con radio 5
console.log(calcularArea(5)); // Resultado: 78.53975
```

**Explicación**:
- **Línea 2** (`const pi = 3.14159`): Guardamos el valor de pi en una variable
- **Línea 5** (`const area = pi * radio * radio`): Multiplicamos pi por el radio dos veces (radio al cuadrado)
- **Línea 7** (`return area`): Devolvemos el resultado
- **Línea 11**: Probamos con un círculo de radio 5

**Para producción (código completo)**:
```
Necesito una función que calcule el área de un círculo.

Debe ser código profesional con:
- Validación de entrada (radio debe ser positivo)
- Uso de Math.PI en lugar de 3.14159
- Mensaje de error si el radio es inválido
```

**Código completo que recibirías**:
```javascript
function calcularArea(radio) {
  if (radio <= 0) {
    throw new Error("El radio debe ser mayor a 0");
  }

  return Math.PI * Math.pow(radio, 2);
}
```

**¿Qué cambió?**:
- ✨ **Nuevo**: Validación con `if` que revisa si el radio es válido
- ✨ **Nuevo**: Uso de `Math.PI` (valor exacto de pi) en lugar de 3.14159
- ✨ **Nuevo**: `Math.pow(radio, 2)` calcula radio al cuadrado de forma más profesional
- 📝 **Por qué**: Al especificar "código profesional", Claude añade validaciones y usa funciones matemáticas estándar

---

## Práctica guiada: Mejorando prompts paso a paso

Vamos a tomar un prompt malo y mejorarlo progresivamente. Aprenderás el proceso de refinamiento.

### Paso 1 de 3: El prompt original (malo)

**Prompt inicial**:
```
Haz algo que filtre una lista
```

**Por qué es malo**:
- No dice qué tipo de lista
- No dice cómo filtrar
- No dice qué hacer con el resultado

**Tu tarea ahora**: Piensa qué información falta. ¿Qué le preguntarías a alguien que te dice esto?

### Paso 2 de 3: Primera mejora

**Prompt mejorado (versión 1)**:
```
Necesito filtrar una lista de números para quedarme solo con los números pares
```

**Mejor, pero aún falta**:
- ¿Qué hacer con la lista filtrada?
- ¿Cómo debe ser el código?

**Código que podrías recibir**:
```javascript
const numeros = [1, 2, 3, 4, 5, 6];
const pares = numeros.filter(num => num % 2 === 0);
```

**Explicación**:
- **Línea 1**: Creamos una lista de ejemplo
- **Línea 2**: Filtramos (`filter`) quedándonos solo con números donde `num % 2 === 0` (el resto al dividir entre 2 es cero, o sea, es par)

**Checkpoint**: Esto funciona, pero es muy compacto. Si eres principiante, puede que no entiendas el `=>` o el `%`.

### Paso 3 de 3: Prompt perfecto

**Prompt final (versión 2)**:
```
Necesito una función que filtre números pares de una lista.

Requisitos:
1. Recibe una lista de números como parámetro
2. Devuelve solo los números pares
3. Usa código simple que un principiante pueda entender
4. Incluye ejemplo de uso

Contexto: Estoy aprendiendo programación
```

**Código que recibirías**:
```javascript
function filtrarPares(numeros) {
  const pares = [];

  for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2 === 0) {
      pares.push(numeros[i]);
    }
  }

  return pares;
}

// Ejemplo de uso:
const miLista = [1, 2, 3, 4, 5, 6];
const resultado = filtrarPares(miLista);
console.log(resultado); // [2, 4, 6]
```

**Explicación línea por línea**:
- **Línea 1** (`function filtrarPares(numeros)`): Creamos la función que recibe una lista
- **Línea 2** (`const pares = []`): Creamos una lista vacía donde guardaremos los pares
- **Línea 4** (`for (let i = 0; i < numeros.length; i++)`): Recorremos cada número de la lista
- **Línea 5** (`if (numeros[i] % 2 === 0)`): Verificamos si el número es par
- **Línea 6** (`pares.push(numeros[i])`): Si es par, lo agregamos a nuestra lista de pares
- **Línea 10** (`return pares`): Devolvemos la lista de pares

**¿Qué cambió?**:
- ✨ Código mucho más fácil de entender para principiantes
- ✨ Explicación clara con ejemplo incluido
- ✨ Usa estructura simple (for e if) en lugar de métodos avanzados

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: Prompts de una sola línea

**Te pasa cuando**: Escribes algo como "crea un login"

**Por qué no funciona**: Es demasiado vago. "Login" puede significar mil cosas diferentes

**Cómo se soluciona**:
1. Pregúntate: ¿Qué partes tiene esto?
2. Enumera cada requisito
3. Especifica qué debe pasar en cada caso

**Ejemplo malo**:
```
Crea un login
```

**Ejemplo bueno**:
```
Necesito una función de login simple:

1. Recibe usuario y contraseña
2. Verifica que el usuario sea "admin"
3. Verifica que la contraseña sea "1234"
4. Devuelve true si ambos son correctos, false si no

Nota: Es solo para practicar, no es para producción real
```

---

### Error #2: No especificar el formato de salida

**Te pasa cuando**: Pides que "muestre algo" sin decir cómo

**Por qué es problema**: Claude no sabe si quieres console.log, un alert, un return, o qué

**Cómo se soluciona**:
Siempre especifica cómo quieres ver el resultado

**Ejemplo malo**:
```
Calcula el promedio de tres números y muéstralo
```

**Ejemplo bueno**:
```
Calcula el promedio de tres números y muéstralo usando console.log
con un mensaje claro como "El promedio es: 7.5"
```

**Código que recibirías**:
```javascript
function calcularPromedio(num1, num2, num3) {
  const suma = num1 + num2 + num3;
  const promedio = suma / 3;

  console.log("El promedio es: " + promedio);
}

calcularPromedio(5, 7, 11); // Muestra: El promedio es: 7.666...
```

---

### Error #3: Mezclar múltiples peticiones en un solo prompt

**Te pasa cuando**: Pides varias cosas diferentes al mismo tiempo

**Por qué es problema**: El código resultante será confuso y difícil de entender

**Cómo se soluciona**:
Pide una cosa a la vez. Primero lo básico, luego añade más

**Ejemplo malo**:
```
Crea una función que sume, reste, multiplique, divida, calcule porcentajes,
verifique números primos, y formatee el resultado con dos decimales
```

**Ejemplo bueno**:
```
PASO 1:
Crea una función simple que sume dos números

Después podemos añadirle más funcionalidades
```

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: El error más común que veo es que los estudiantes no quieren "molestar" a Claude con detalles. Piensa al revés: mientras más detalles des, mejor será el resultado. Claude no se molesta ni se cansa, así que sé todo lo específico que necesites.

> **Otro tip importante**: Cuando un prompt no funcione bien, no lo borres. Guárdalo y mejóralo. Es una gran forma de aprender. Yo tengo una carpeta de "prompts mejorados" donde guardo antes y después. Es fascinante ver cómo pequeños cambios hacen gran diferencia.

> **Un secreto profesional**: Los mejores prompts empiezan con "Necesito..." en lugar de "Haz...". "Necesito" te obliga a pensar en qué necesitas realmente. "Haz" es demasiado imperativo y vago.

---

## Tu turno: Ejercicio guiado

**Objetivo Simple**: Transformar tres prompts malos en prompts efectivos

**Tiempo**: 20-25 minutos

**Lo que necesitas antes de empezar**:
- [ ] Claude Code abierto
- [ ] Un archivo de texto para escribir tus prompts (puede ser un .txt o directamente en Claude)
- [ ] Papel y lápiz para planear (opcional pero recomendado)

### Instrucciones paso a paso

**Parte 1: Analiza el prompt malo** (5 min)

1. Lee este prompt malo:
```
Haz una calculadora
```

2. Haz una lista de preguntas que harías:
   - ¿Qué operaciones debe tener?
   - ¿Cómo se ingresan los números?
   - ¿Qué hace con el resultado?
   - ¿Qué nivel de complejidad?

**Parte 2: Escribe tu versión mejorada** (7 min)

3. Usando la fórmula que aprendiste, escribe un prompt mejorado
4. Debe incluir:
   - Qué quieres (calculadora)
   - Requisitos específicos (operaciones, entradas, salidas)
   - Nivel de complejidad (principiante)
   - Ejemplo de uso esperado

**Parte 3: Pruébalo con Claude** (8 min)

5. Copia tu prompt mejorado
6. Pégalo en Claude Code
7. Observa el código que te da
8. Pregúntate: ¿Es lo que esperabas? ¿Falta algo?

**Parte 4: Refina si es necesario** (5 min)

9. Si el código no es exactamente lo que querías, identifica qué falta
10. Mejora tu prompt añadiendo esa información
11. Pídelo de nuevo

**Criterio de éxito**:
- [ ] Tu prompt tiene al menos 4 requisitos específicos
- [ ] Especifica el nivel de complejidad
- [ ] El código que recibes es claro y entendible
- [ ] Incluye un ejemplo de uso

**Desafío extra**: Mejora también estos dos prompts:
```
Haz algo que ordene una lista
```
```
Necesito validar emails
```

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **La anatomía de un buen prompt**: Debe incluir qué quieres, cómo lo quieres, y para qué lo necesitas. Mientras más específico, mejor
2. **La fórmula para estructurar prompts**: Tipo de código + requisitos numerados + contexto = prompt efectivo
3. **Cómo mejorar prompts malos**: Identificar qué falta, añadir especificidad, aclarar el nivel de complejidad

---

## Siguiente paso

En la próxima lección: Aprenderás sobre **contexto y especificación de requisitos**. Descubrirás por qué dar contexto a Claude puede cambiar completamente el código que recibes, y cómo convertirte en un experto dando ese contexto.

---

**¿Dudas?** Recuerda: escribir buenos prompts es una habilidad que se desarrolla con práctica. No esperes ser perfecto de inmediato. Cada prompt que escribas te acerca más a dominar esta habilidad fundamental.
