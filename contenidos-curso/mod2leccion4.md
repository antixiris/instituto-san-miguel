***Probar tu código: Asegurarte que todo funciona bien***


> "Probar el código es como revisar tu tarea antes de entregarla" - Anónimo

## Introducción: ¿Por qué probar el código?

Imagina que construyes un puente. Antes de que pasen autos, ¿no querrías probarlo para asegurarte de que es seguro? Con el código es igual.

**Probar el código** (o hacer "tests") significa escribir código especial que verifica que tu código normal funciona correctamente. Es como tener un ayudante que revisa tu trabajo automáticamente.

En esta lección aprenderás a **escribir pruebas simples** para tu código, para estar seguro de que funciona bien.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Entender qué son los tests**: Aprenderás por qué son importantes y cómo te ayudan
2. **Escribir tu primer test**: Crearás una prueba simple para una función
3. **Usar Claude para crear tests**: Pedirle ayuda a Claude para generar pruebas
4. **Interpretar resultados**: Entender cuando un test pasa o falla

---

## ¿Por qué necesito probar mi código?

Aquí hay un ejemplo real: imagina que escribiste una función que suma dos números.

**Tu función**:
```javascript
function sumar(a, b) {
  return a + b;
}
```

Parece simple, ¿verdad? Pero ¿qué pasa si:
- Le pasas textos en lugar de números?
- Le pasas números negativos?
- Le pasas cero?

Un **test** verifica todos estos casos automáticamente. En lugar de probar manualmente cada vez, el test lo hace por ti.

### 📊 Un dato importante

El código con tests tiene 40-60% menos errores que el código sin tests. Los tests atrapan problemas ANTES de que los usuarios los vean.

---

## Concepto 1: Tu primer test simple

Vamos a empezar con lo más básico: probar una función que suma.

### La función que vamos a probar

**Código**:
```javascript
function sumar(a, b) {
  return a + b;
}
```

**Explicación línea por línea**:
- **Línea 1**: Creamos una función llamada `sumar` que recibe dos cosas: `a` y `b`
- **Línea 2**: La función devuelve la suma de `a` + `b`

**En resumen**: Esta función toma dos números y los suma.

---

### El test más simple

Ahora vamos a crear código que PRUEBA si la función funciona:

**Código del test**:
```javascript
// Probar que 2 + 3 = 5
const resultado = sumar(2, 3);

if (resultado === 5) {
  console.log("✅ Test pasó: la suma funciona");
} else {
  console.log("❌ Test falló: algo está mal");
}
```

**Explicación línea por línea**:
- **Línea 2**: Llamamos a la función `sumar` con 2 y 3, guardamos el resultado
- **Línea 4**: Verificamos si el resultado es 5 (que es lo correcto)
- **Línea 5**: Si es correcto, mostramos un mensaje de éxito
- **Líneas 6-7**: Si NO es correcto, mostramos que falló

**En resumen**: Este test verifica que 2 + 3 realmente da 5.

---

## Concepto 2: Probar varios casos

No basta con probar UN caso. Necesitamos probar varios para estar seguros.

### Ejemplo: Probar más casos

**Tests múltiples**:
```javascript
// Test 1: Números positivos
if (sumar(2, 3) === 5) {
  console.log("✅ Test 1 pasó");
} else {
  console.log("❌ Test 1 falló");
}

// Test 2: Con un cero
if (sumar(5, 0) === 5) {
  console.log("✅ Test 2 pasó");
} else {
  console.log("❌ Test 2 falló");
}

// Test 3: Números negativos
if (sumar(-2, -3) === -5) {
  console.log("✅ Test 3 pasó");
} else {
  console.log("❌ Test 3 falló");
}
```

**¿Qué estamos probando?**:
- **Test 1**: Números normales positivos
- **Test 2**: Cuando uno de los números es cero
- **Test 3**: Números negativos

**Checkpoint**: Si corres este código y todos dicen "✅", tu función funciona bien en todos los casos.

---

## Concepto 3: Usar una herramienta de tests (jest)

Escribir todos esos `if` es tedioso. Por suerte hay herramientas que lo hacen más fácil. La más común se llama **Jest**.

### Tu primer test con Jest

**Código del test**:
```javascript
test('sumar dos números positivos', () => {
  expect(sumar(2, 3)).toBe(5);
});

test('sumar con cero', () => {
  expect(sumar(5, 0)).toBe(5);
});

test('sumar números negativos', () => {
  expect(sumar(-2, -3)).toBe(-5);
});
```

**Explicación línea por línea**:
- **Línea 1**: `test()` dice "esto es un test" y le ponemos un nombre
- **Línea 2**: `expect(...).toBe(...)` significa "espero que el resultado sea..."
- Se lee como: "Espero que sumar(2, 3) sea 5"

**¿Qué cambió?**:
- Es más corto y más claro
- Jest muestra automáticamente qué tests pasaron y cuáles fallaron
- No necesitamos escribir los `if` manualmente

---

## Práctica guiada: Crear tests para tu código

Vamos a crear una función y sus tests paso a paso.

### Paso 1 de 3: La función a probar

Vamos a crear una función que calcula el área de un rectángulo.

**Código**:
```javascript
function calcularArea(ancho, alto) {
  return ancho * alto;
}
```

**Explicación**:
- Recibe el ancho y el alto del rectángulo
- Multiplica ancho por alto para obtener el área
- Devuelve el resultado

**Checkpoint**: Si tienes un rectángulo de 5 x 3, el área debería ser 15.

### Paso 2 de 3: Escribir los tests

Ahora vamos a escribir tests para varios casos.

**Lo que le pedirás a Claude**:
```
Tengo esta función que calcula el área de un rectángulo:
[pega la función]

Ayúdame a escribir 3 tests usando Jest para probar:
1. Un rectángulo de 5 x 3 (debería dar 15)
2. Un rectángulo de 10 x 10 (debería dar 100)
3. Un rectángulo de 0 x 5 (debería dar 0, porque si un lado es 0 no hay área)
```

**Tests que Claude te dará**:
```javascript
test('calcular área de rectángulo 5x3', () => {
  expect(calcularArea(5, 3)).toBe(15);
});

test('calcular área de cuadrado 10x10', () => {
  expect(calcularArea(10, 10)).toBe(100);
});

test('calcular área cuando un lado es 0', () => {
  expect(calcularArea(0, 5)).toBe(0);
});
```

### Paso 3 de 3: Ejecutar los tests

**Lo que harás**:
1. Guarda el código en un archivo llamado `area.test.js`
2. En la terminal, ejecuta: `npm test`
3. Verás algo como:

```
PASS  ./area.test.js
✓ calcular área de rectángulo 5x3 (2ms)
✓ calcular área de cuadrado 10x10 (1ms)
✓ calcular área cuando un lado es 0 (1ms)

Tests: 3 passed, 3 total
```

**Checkpoint**: Si todos muestran ✓, tus tests pasaron y la función funciona correctamente.

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: El test espera un resultado incorrecto

**Te pasa cuando**: Escribes el test con el resultado equivocado

**Ejemplo con error**:
```javascript
test('sumar 2 + 3', () => {
  expect(sumar(2, 3)).toBe(6);  // ❌ Debería ser 5, no 6
});
```

**Mensaje que verás**:
```
Expected: 6
Received: 5
```

**Qué significa**: El test esperaba 6 pero la función devolvió 5 (que es lo correcto)

**Cómo se arregla**:
```javascript
test('sumar 2 + 3', () => {
  expect(sumar(2, 3)).toBe(5);  // ✅ Ahora sí es correcto
});
```

**Explicación**: Cambiamos el `6` por `5` porque ese es el resultado correcto de 2 + 3.

---

### Error #2: Olvidar instalar Jest

**Te pasa cuando**: Intentas correr tests sin haber instalado Jest primero

**Mensaje de error**:
```
'jest' is not recognized as a command
```

**Cómo se soluciona**:
1. Abre la terminal
2. Ejecuta: `npm install --save-dev jest`
3. En el archivo `package.json`, agrega:
```json
{
  "scripts": {
    "test": "jest"
  }
}
```
4. Ahora sí puedes correr `npm test`

---

### Error #3: Probar solo el caso "feliz"

**Te pasa cuando**: Solo pruebas el caso normal y olvidas los casos raros

**Ejemplo insuficiente**:
```javascript
// Solo pruebo números positivos
test('sumar', () => {
  expect(sumar(2, 3)).toBe(5);
});
```

**Por qué es problema**: No sabemos qué pasa con negativos, ceros, o números grandes

**Cómo se soluciona**: Prueba varios casos:
```javascript
test('sumar números positivos', () => {
  expect(sumar(2, 3)).toBe(5);
});

test('sumar con cero', () => {
  expect(sumar(5, 0)).toBe(5);
});

test('sumar números negativos', () => {
  expect(sumar(-2, -3)).toBe(-5);
});

test('sumar números grandes', () => {
  expect(sumar(1000, 2000)).toBe(3000);
});
```

**Explicación**: Ahora tenemos 4 tests que cubren diferentes situaciones.

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: Los tests son como un seguro. No los necesitas hasta que los necesitas. Cuando tu código se rompe, los tests te dicen EXACTAMENTE qué se rompió y dónde.

> **Tip importante**: Escribe tests para las partes importantes de tu código, no para TODO. Enfócate en las funciones que hacen cálculos o toman decisiones importantes.

> **Último tip**: Si cambias una función y los tests fallan, eso es BUENO. Los tests te están avisando que algo cambió y necesitas revisarlo.

---

## Tu turno: Ejercicio guiado

**Objetivo Simple**: Crear una función con sus tests

**Tiempo**: 25 minutos

**Tu misión**:
Crear una función que determine si un número es par o impar, y escribir tests para ella.

### Instrucciones paso a paso

**Parte 1: La Función** (5 min)

1. Crea un archivo `numero.js`
2. Pídele a Claude:
```
Necesito una función en JavaScript que reciba un número y devuelva:
- "par" si el número es par
- "impar" si el número es impar

Usa el operador % (módulo) para verificar si es divisible por 2
```

3. Claude te dará algo como:
```javascript
function esPar(numero) {
  if (numero % 2 === 0) {
    return "par";
  } else {
    return "impar";
  }
}
```

**Parte 2: Los Tests** (15 min)

4. Crea un archivo `numero.test.js`
5. Escribe tests para:
   - El número 4 (debería ser "par")
   - El número 7 (debería ser "impar")
   - El número 0 (debería ser "par")
   - El número -3 (debería ser "impar")

6. Tu código debería verse así:
```javascript
test('4 es par', () => {
  expect(esPar(4)).toBe("par");
});

test('7 es impar', () => {
  expect(esPar(7)).toBe("impar");
});

test('0 es par', () => {
  expect(esPar(0)).toBe("par");
});

test('-3 es impar', () => {
  expect(esPar(-3)).toBe("impar");
});
```

**Parte 3: Ejecutar** (5 min)

7. Ejecuta: `npm test`
8. Todos los tests deberían pasar (mostrar ✓)

**Criterio de éxito**:
- [ ] La función funciona correctamente
- [ ] Los 4 tests pasan
- [ ] Entiendes qué hace cada test

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Qué son los tests**: Código que verifica que tu código funciona bien
2. **Cómo escribir tests simples**: Usar Jest para probar funciones
3. **Probar varios casos**: No solo el caso normal, también casos especiales

---

## Siguiente paso

En la próxima lección: Aprenderás a **documentar tu código** para que otros (y tu yo del futuro) entiendan qué hace cada parte.

---

**¿Dudas?** Los tests parecen trabajo extra al principio, pero te ahorran MUCHO tiempo después. Es una inversión que vale la pena.