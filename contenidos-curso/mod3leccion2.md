<p><strong><em>Contexto y especificación de requisitos: El poder de dar información completa</em></strong></p>

## Introducción: La historia de dos programadores

Imagina a dos estudiantes pidiendo ayuda a Claude para el mismo proyecto:

**Estudiante A dice**: "Necesito guardar datos de usuarios"

**Estudiante B dice**: "Necesito guardar datos de usuarios para una aplicación de biblioteca escolar. Los usuarios son estudiantes y profesores. Necesito guardar: nombre, email, tipo de usuario (estudiante/profesor), y fecha de registro. Esto será parte de un sistema más grande donde luego podrán pedir libros prestados."

¿Cuál crees que recibirá mejor código? Obviamente el Estudiante B. Pero ¿por qué? La respuesta es simple: **contexto**.

El contexto es toda la información que rodea tu problema. No solo qué necesitas, sino para qué lo necesitas, quién lo usará, cómo se conecta con otras cosas. El contexto transforma un pedido vago en una solución perfecta.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Identificar qué contexto dar**: Sabrás exactamente qué información adicional necesita Claude para ayudarte mejor
2. **Estructurar requisitos completos**: Aprenderás a desglosar un proyecto en requisitos claros y específicos
3. **Anticipar problemas**: Darás información que evitará errores antes de que ocurran
4. **Comunicar restricciones**: Sabrás cómo explicar limitaciones, dependencias y requisitos técnicos

---

## ¿Por qué el contexto es fundamental?

Piensa en ir al médico. Si dices "me duele", el médico te preguntará: ¿Dónde? ¿Desde cuándo? ¿Es constante o va y viene? ¿Qué estabas haciendo cuando empezó? Toda esa información adicional (el contexto) es lo que le permite diagnosticar correctamente.

Con Claude es igual. Dos palabras de contexto pueden cambiar completamente la solución.

### 📊 Un dato interesante

En desarrollo de software profesional, el 70% de los errores en proyectos ocurren por "requisitos mal entendidos". Dar buen contexto no es un "extra bonito", es la diferencia entre éxito y fracaso.

---

## Concepto 1: Los tipos de contexto que debes dar

El contexto tiene varias dimensiones. Vamos a ver cada una con ejemplos concretos.

### Tipo 1: Contexto de propósito

**Qué es**: Para qué vas a usar el código, cuál es el objetivo final.

**Ejemplo sin contexto de propósito**:
```
Necesito una función que valide emails
```

**Ejemplo con contexto de propósito**:
```
Necesito una función que valide emails para un formulario de registro.
Los usuarios son adultos mayores que a veces cometen errores al escribir.
La validación debe ser permisiva pero asegurar que el formato básico sea correcto.
```

**Código sin contexto**:
```javascript
function validarEmail(email) {
  return email.includes('@');
}
```

**Explicación**:
- **Línea 1**: Función que recibe un email
- **Línea 2**: Solo verifica que tenga un `@`

**Por qué es limitado**: Es demasiado simple, aceptaría emails como "@@@@" o "a@"

**Código con contexto**:
```javascript
function validarEmail(email) {
  // Patrón permisivo pero seguro
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Verificar patrón básico
  if (!patron.test(email)) {
    return false;
  }

  // Verificar longitud razonable
  if (email.length < 5 || email.length > 100) {
    return false;
  }

  return true;
}
```

**Explicación línea por línea**:
- **Línea 2** (`const patron = ...`): Patrón que verifica formato básico: algo@algo.algo
- **Línea 5** (`if (!patron.test(email))`): Si no cumple el patrón, es inválido
- **Línea 10** (`if (email.length < 5 || email.length > 100)`): Verificamos longitud razonable (ni muy corto ni muy largo)
- **Línea 14** (`return true`): Si pasó todas las validaciones, es válido

**¿Qué cambió?**:
- ✨ Validación real de formato (no solo buscar @)
- ✨ Verificación de longitud razonable
- ✨ Comentarios explicativos para principiantes
- 📝 **Por qué**: Al saber que es para adultos mayores propensos a errores, Claude añadió validaciones más robustas pero comprensibles

---

## Concepto 2: Contexto técnico

**Qué es**: Información sobre qué tecnologías usas, qué limitaciones tienes, con qué debe ser compatible.

### Ejemplo: Leer un archivo

**Sin contexto técnico**:
```
Necesito leer un archivo de texto
```

**Con contexto técnico**:
```
Necesito leer un archivo de texto.

Contexto técnico:
- Estoy usando Node.js versión 18
- Es mi segundo programa, soy principiante
- Necesito código con manejo de errores simple
- El archivo está en la misma carpeta que mi código
```

**Código sin contexto**:
```javascript
const fs = require('fs').promises;
const data = await fs.readFile('archivo.txt', 'utf8');
```

**Código con contexto**:
```javascript
// Importar módulo para leer archivos
const fs = require('fs');

// Función para leer archivo con manejo de errores
function leerArchivo() {
  try {
    const contenido = fs.readFileSync('archivo.txt', 'utf8');
    console.log("Archivo leído correctamente:");
    console.log(contenido);
  } catch (error) {
    console.log("Error al leer el archivo:");
    console.log("Asegúrate de que archivo.txt existe en esta carpeta");
  }
}

// Llamar la función
leerArchivo();
```

**Explicación línea por línea**:
- **Línea 2** (`const fs = require('fs')`): Importamos el módulo de archivos de Node.js
- **Línea 5** (`function leerArchivo()`): Creamos una función para organizar el código
- **Línea 6** (`try {`): Empezamos un bloque "try" que intenta ejecutar código que podría fallar
- **Línea 7** (`const contenido = fs.readFileSync(...)`): Leemos el archivo. "Sync" significa "sincrónico" (espera a terminar)
- **Línea 8-9**: Mostramos el contenido si todo salió bien
- **Línea 10** (`} catch (error) {`): Si algo falló, entramos aquí
- **Línea 11-12**: Mostramos mensaje de error amigable

**¿Qué cambió?**:
- ✨ Usa `readFileSync` (más simple para principiantes) en lugar de `promises`
- ✨ Incluye manejo de errores con mensajes claros
- ✨ Todo en una función organizada
- ✨ Comentarios explicativos en cada parte

---

## Concepto 3: Contexto de audiencia

**Qué es**: Quién usará el código, qué nivel de experiencia tienen, qué esperan.

### Ejemplo: Sistema de puntuación

**Sin contexto de audiencia**:
```
Necesito un sistema que sume puntos
```

**Con contexto de audiencia**:
```
Necesito un sistema de puntuación para un juego educativo infantil.

Audiencia:
- Niños de 8 a 10 años
- Debe ser visual y motivante
- Los puntos se ganan por respuestas correctas
- Debe mostrar mensajes de ánimo

Contexto: Esto va dentro de una aplicación más grande de matemáticas
```

**Código sin contexto**:
```javascript
let puntos = 0;
puntos = puntos + 10;
```

**Código con contexto**:
```javascript
// Sistema de puntuación motivante para niños
let puntosJugador = 0;

function ganarPuntos(cantidad) {
  puntosJugador = puntosJugador + cantidad;

  console.log("¡Muy bien! Ganaste " + cantidad + " puntos");
  console.log("Puntos totales: " + puntosJugador);

  // Mensajes de ánimo según puntos
  if (puntosJugador >= 100) {
    console.log("¡Eres un campeón!");
  }
}

// Ejemplo de uso: respuesta correcta
ganarPuntos(10);
```

**Explicación línea por línea**:
- **Línea 2** (`let puntosJugador = 0`): Variable para guardar los puntos, empieza en cero
- **Línea 4** (`function ganarPuntos(cantidad)`): Función que recibe cuántos puntos dar
- **Línea 5**: Sumamos los puntos nuevos al total
- **Línea 7-8**: Mostramos mensajes motivantes
- **Línea 11** (`if (puntosJugador >= 100)`): Si llegó a 100 puntos, damos mensaje especial
- **Línea 17**: Ejemplo de cómo usar la función

**¿Qué cambió?**:
- ✨ Mensajes motivantes y amigables para niños
- ✨ Retroalimentación visual inmediata
- ✨ Sistema de "recompensas" al llegar a ciertos puntos
- ✨ Código organizado en función reutilizable

---

## Práctica guiada: Construyendo contexto completo

Vamos a tomar un pedido simple y añadirle contexto progresivamente, viendo cómo mejora el resultado en cada paso.

### Paso 1 de 3: Pedido básico sin contexto

**Prompt inicial**:
```
Necesito una función que calcule descuentos
```

**Lo que Claude podría dar**:
```javascript
function calcularDescuento(precio, descuento) {
  return precio - (precio * descuento / 100);
}
```

**Explicación**:
- **Línea 1**: Función que recibe precio y porcentaje de descuento
- **Línea 2**: Resta el descuento del precio

**Funciona, pero**: Es muy básico. No maneja casos especiales, no tiene validaciones, no sabemos si es suficiente para nuestro caso real.

### Paso 2 de 3: Añadiendo contexto de propósito

**Prompt mejorado**:
```
Necesito una función que calcule descuentos para una tienda online.

Contexto:
- Los descuentos son por promociones especiales
- Los clientes VIP reciben 5% adicional
- Debe mostrar cuánto ahorraron en pesos
```

**Código que recibirías**:
```javascript
function calcularDescuento(precio, descuentoPorcentaje, esVIP) {
  // Calcular descuento base
  let descuento = descuentoPorcentaje;

  // Clientes VIP reciben 5% extra
  if (esVIP) {
    descuento = descuento + 5;
  }

  // Calcular ahorro en pesos
  const ahorro = precio * descuento / 100;
  const precioFinal = precio - ahorro;

  console.log("Precio original: $" + precio);
  console.log("Ahorraste: $" + ahorro);
  console.log("Precio final: $" + precioFinal);

  return precioFinal;
}
```

**Explicación línea por línea**:
- **Línea 3** (`let descuento = descuentoPorcentaje`): Copiamos el descuento a una variable que podemos modificar
- **Línea 6-8**: Si es VIP, sumamos 5% más
- **Línea 11** (`const ahorro = precio * descuento / 100`): Calculamos cuánto se ahorra
- **Línea 12** (`const precioFinal = precio - ahorro`): Precio después del descuento
- **Líneas 14-16**: Mostramos información detallada

**¿Qué mejoró?**:
- ✨ Manejo del caso VIP
- ✨ Muestra el ahorro en pesos (motivante para el cliente)
- ✨ Información clara de antes y después

### Paso 3 de 3: Contexto completo (técnico + audiencia)

**Prompt perfecto**:
```
Necesito una función que calcule descuentos para una tienda online.

Contexto de propósito:
- Los descuentos son por promociones especiales
- Los clientes VIP reciben 5% adicional
- Debe mostrar cuánto ahorraron en pesos

Contexto técnico:
- Soy principiante, necesito código simple
- Debe validar que el descuento no sea mayor a 100%
- Los precios son en pesos mexicanos

Contexto de audiencia:
- Lo usarán operadores de tienda con poca experiencia técnica
- Debe ser obvio cuando algo está mal
- Mensajes de error claros en español
```

**Código final que recibirías**:
```javascript
function calcularDescuento(precio, descuentoPorcentaje, esVIP) {
  // Validar que los datos sean correctos
  if (precio <= 0) {
    console.log("Error: El precio debe ser mayor a cero");
    return null;
  }

  if (descuentoPorcentaje < 0 || descuentoPorcentaje > 100) {
    console.log("Error: El descuento debe estar entre 0% y 100%");
    return null;
  }

  // Calcular descuento total
  let descuentoTotal = descuentoPorcentaje;

  if (esVIP === true) {
    descuentoTotal = descuentoTotal + 5;
    console.log("Cliente VIP: +5% de descuento extra");
  }

  // Asegurar que el descuento no supere 100%
  if (descuentoTotal > 100) {
    descuentoTotal = 100;
  }

  // Realizar cálculos
  const ahorro = precio * descuentoTotal / 100;
  const precioFinal = precio - ahorro;

  // Mostrar información clara
  console.log("--- Detalle de compra ---");
  console.log("Precio original: $" + precio.toFixed(2) + " MXN");
  console.log("Descuento aplicado: " + descuentoTotal + "%");
  console.log("Ahorraste: $" + ahorro.toFixed(2) + " MXN");
  console.log("Precio final: $" + precioFinal.toFixed(2) + " MXN");

  return precioFinal;
}

// Ejemplo de uso:
calcularDescuento(1000, 20, true);
```

**Explicación de las nuevas partes**:
- **Líneas 2-6**: Validamos que el precio sea válido
- **Líneas 8-11**: Validamos que el descuento esté en rango correcto
- **Líneas 22-24**: Nos aseguramos que el descuento nunca supere 100%
- **Línea 32** (`toFixed(2)`): Formatea a dos decimales (20.00 en lugar de 20.0032)
- **Línea 32** (`MXN`): Especifica la moneda claramente

**¿Qué ganamos con el contexto completo?**:
- ✅ Código robusto que no rompe con datos malos
- ✅ Mensajes de error claros en español
- ✅ Formato de moneda apropiado
- ✅ Validaciones que protegen el negocio
- ✅ Fácil de entender para operadores sin experiencia técnica

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: Asumir que Claude sabe tu situación

**Te pasa cuando**: Das por hecho que Claude sabe en qué proyecto trabajas o qué hiciste antes

**Por qué es problema**: Cada conversación con Claude es independiente. No recuerda contexto de ayer o de otra ventana

**Cómo se soluciona**:
Siempre da contexto completo, incluso si sientes que lo repites

**Ejemplo malo**:
```
Ahora necesito la parte de validación
```
(Claude no sabe validación de qué)

**Ejemplo bueno**:
```
Estoy trabajando en un formulario de registro de usuarios.
Anteriormente creamos campos para email y contraseña.

Ahora necesito validación para:
- Email con formato correcto
- Contraseña mínimo 8 caracteres
```

---

### Error #2: Dar contexto ambiguo

**Te pasa cuando**: Usas palabras que tienen múltiples significados

**Por qué es problema**: Claude puede interpretar de forma diferente a lo que pensabas

**Cómo se soluciona**:
Usa ejemplos concretos en lugar de descripciones generales

**Ejemplo malo**:
```
Necesito que el sistema sea rápido
```
(¿Qué es "rápido"? ¿1 segundo? ¿100 milisegundos?)

**Ejemplo bueno**:
```
Necesito que el sistema responda en menos de 2 segundos.
Los usuarios esperan ver resultados casi inmediatamente después de hacer clic.

Por "rápido" me refiero a:
- Búsquedas: menos de 1 segundo
- Guardado de datos: menos de 2 segundos
- Carga inicial: menos de 3 segundos
```

---

### Error #3: No mencionar restricciones críticas

**Te pasa cuando**: Olvidas decir limitaciones importantes de tu proyecto

**Por qué es problema**: Claude podría sugerir soluciones que no puedes usar

**Cómo se soluciona**:
Siempre menciona: qué NO puedes usar, qué NO puedes cambiar, qué límites tienes

**Ejemplo malo**:
```
Necesito guardar datos de 1000 usuarios
```

**Ejemplo bueno**:
```
Necesito guardar datos de 1000 usuarios.

Restricciones:
- NO puedo usar bases de datos externas (aún no sé usarlas)
- Debe ser con archivos locales solamente
- Mi computadora tiene memoria limitada (4GB RAM)
- Necesito que sea código simple que pueda entender
```

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: He visto estudiantes luchar durante horas con código que "casi funciona". Cuando les pregunto "¿qué contexto diste?", la respuesta suele ser "ninguno". Cinco minutos dando contexto ahorra horas de correcciones.

> **Otro tip importante**: Crea una "plantilla de contexto" personal. Antes de pedir código, llena tu plantilla: ¿Para qué es? ¿Quién lo usará? ¿Qué tecnologías uso? ¿Qué restricciones tengo? ¿Qué nivel de complejidad necesito? Esto te convertirá en un profesional.

> **Un secreto de oro**: Cuando no sepas qué contexto dar, pregúntale a Claude: "¿Qué información adicional necesitas para darme la mejor solución?". Claude te dirá exactamente qué falta.

---

## Tu turno: Ejercicio guiado

**Objetivo Simple**: Transformar un pedido sin contexto en uno con contexto completo y obtener código superior

**Tiempo**: 25-30 minutos

**Lo que necesitas antes de empezar**:
- [ ] Claude Code abierto
- [ ] Documento para escribir tu análisis (puede ser un .txt)
- [ ] Los tres tipos de contexto en mente: propósito, técnico, audiencia

### Instrucciones paso a paso

**Parte 1: Analizar el pedido básico** (5 min)

Este es tu pedido básico:
```
Necesito una función que busque productos
```

1. Escribe qué información falta:
   - ¿Buscar dónde? ¿En una lista? ¿En un archivo?
   - ¿Buscar por qué? ¿Por nombre? ¿Por precio?
   - ¿Qué hacer con los resultados?

**Parte 2: Construir contexto de propósito** (7 min)

2. Responde estas preguntas y añádelas a tu prompt:
   - ¿Para qué sistema es esto?
   - ¿Quién buscará productos?
   - ¿Qué harán con los resultados?

Ejemplo de cómo agregarlo:
```
Necesito una función que busque productos.

Contexto de propósito:
[Tu respuesta aquí]
```

**Parte 3: Añadir contexto técnico** (7 min)

3. Añade información técnica:
   - ¿Qué nivel de programación tienes?
   - ¿Qué tecnologías usas?
   - ¿Qué limitaciones técnicas tienes?

**Parte 4: Completar con contexto de audiencia** (6 min)

4. Define la audiencia:
   - ¿Quién ejecutará este código?
   - ¿Qué esperan ver?
   - ¿Qué errores podrían cometer?

**Parte 5: Probar con Claude** (10 min)

5. Pega tu prompt completo en Claude
6. Compara el código que recibes con lo que hubiera sido sin contexto
7. Identifica al menos 3 mejoras que solo aparecen gracias al contexto

**Criterio de éxito**:
- [ ] Tu prompt tiene los tres tipos de contexto claramente identificados
- [ ] Es específico y sin ambigüedades
- [ ] El código resultante es significativamente mejor que el básico
- [ ] Incluiste restricciones y limitaciones

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Los tres tipos de contexto críticos**: Propósito (para qué), técnico (con qué) y audiencia (para quién). Dar los tres transforma código básico en código profesional
2. **Contexto es información que previene problemas**: No es "extra", es esencial. Dos minutos de contexto ahorran horas de correcciones
3. **Cómo estructurar contexto efectivamente**: Usando secciones claras que Claude puede entender y aplicar directamente al código

---

## Siguiente paso

En la próxima lección: Dominarás la **iteración y refinamiento de código**. Aprenderás cómo trabajar con Claude en ciclos: pedir, revisar, mejorar, repetir. Es el proceso que usan los profesionales para crear software excepcional.

---

**¿Dudas?** El contexto puede parecer "mucho trabajo" al inicio, pero se vuelve automático rápidamente. Piensa en ello como una inversión: gastas un poco más de tiempo al principio para ahorrar muchísimo tiempo después.
