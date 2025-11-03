<p><strong><em>Iteración y refinamiento de código: El arte de mejorar progresivamente</em></strong></p>

## Introducción: El código no se hace perfecto a la primera

¿Alguna vez escribiste un ensayo para la escuela? Probablemente no lo entregaste en el primer intento. Leíste, corregiste errores, mejoraste frases, reorganizaste párrafos. Tal vez lo hiciste 3 o 4 veces hasta que quedó bien.

El código funciona exactamente igual. Los programadores profesionales NO escriben código perfecto a la primera. Lo que hacen es escribir una versión que funciona, luego la mejoran, luego la vuelven a mejorar. Esto se llama **iteración**, y es el proceso más importante en desarrollo de software.

La buena noticia es que con Claude Code, iterar es facilísimo. No tienes que reescribir todo desde cero. Simplemente le dices: "Esto está bien, pero mejora esta parte" o "Funciona, pero hazlo más claro". Claude entiende perfectamente este proceso.

En esta lección aprenderás a trabajar con Claude como lo hacen los profesionales: en ciclos de mejora continua.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Iterar código con Claude**: Sabrás cómo pedirle mejoras específicas sin empezar de cero
2. **Identificar qué mejorar**: Reconocerás qué partes del código necesitan refinamiento
3. **Hacer cambios incrementales**: Aprenderás a mejorar de a poco, no todo de golpe
4. **Mantener lo que funciona**: Sabrás cómo conservar las partes buenas mientras mejoras las demás

---

## ¿Por qué iterar es mejor que buscar perfección inmediata?

Imagina que estás aprendiendo a cocinar. ¿Intentarías hacer un platillo de chef con 20 ingredientes en tu primer intento? Probablemente no. Empezarías con algo simple, lo probarías, ajustarías la sal, mejorarías la presentación, y poco a poco llegarías a algo delicioso.

El código es igual. Empiezas con algo que funciona (aunque sea simple), lo pruebas, identificas qué mejorar, haces ese cambio, pruebas de nuevo. Cada ciclo te acerca más a la solución perfecta.

### 📊 Un dato interesante

Los desarrolladores senior pasan en promedio 6 iteraciones antes de considerar su código "terminado". No es porque sean lentos, es porque saben que cada iteración hace el código mejor, más claro, más confiable.

---

## Concepto 1: El ciclo de iteración básico

El proceso de iterar tiene cuatro pasos simples. Los repetirás una y otra vez.

### Los 4 pasos del ciclo

1. **Obtener código inicial** (funcional pero básico)
2. **Probar y observar** (¿funciona? ¿qué le falta?)
3. **Identificar UNA mejora** (solo una cosa a la vez)
4. **Pedirle a Claude esa mejora** (específicamente)

Luego vuelves al paso 2. Es un ciclo continuo.

### Ejemplo: Mejorar una calculadora simple

**Iteración 1: Código inicial**

**Lo que pides**:
```
Necesito una función que sume dos números
```

**Código que recibes**:
```javascript
function sumar(a, b) {
  return a + b;
}
```

**Explicación**:
- **Línea 1** (`function sumar(a, b)`): Función que recibe dos números
- **Línea 2** (`return a + b`): Devuelve la suma

**Probar**: Funciona perfectamente. Pero... ¿y si alguien pone texto en lugar de números?

---

**Iteración 2: Añadir validación**

**Lo que pides**:
```
El código anterior funciona bien, pero mejóralo para validar que
a y b sean números. Si no lo son, mostrar un mensaje de error.
```

**Código mejorado**:
```javascript
function sumar(a, b) {
  // Validar que sean números
  if (typeof a !== 'number' || typeof b !== 'number') {
    console.log("Error: Ambos valores deben ser números");
    return null;
  }

  return a + b;
}
```

**¿Qué cambió?**:
- ✨ **Línea 3**: Agregamos validación con `typeof` que verifica el tipo de dato
- ✨ **Línea 4**: Mensaje de error claro
- ✨ **Línea 5**: Devolvemos `null` (nada) si hay error
- 📝 **Por qué**: Ahora el código no rompe con datos incorrectos

**Explicación de lo nuevo**:
- **`typeof a !== 'number'`**: Pregunta "¿a NO es un número?". El `!==` significa "diferente de"
- **`||`**: Significa "o". La condición es verdadera si a NO es número O b NO es número

---

**Iteración 3: Hacer el mensaje más amigable**

**Probar**: Funciona, pero el mensaje es muy técnico. Vamos a mejorarlo.

**Lo que pides**:
```
Mejora el mensaje de error para que sea más amigable y muestre
qué valores recibió que no son números
```

**Código mejorado**:
```javascript
function sumar(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    console.log("No puedo sumar estos valores:");
    console.log("Primer valor:", a, "- Tipo:", typeof a);
    console.log("Segundo valor:", b, "- Tipo:", typeof b);
    console.log("Ambos deben ser números");
    return null;
  }

  return a + b;
}
```

**¿Qué cambió?**:
- ✨ Mensajes más claros y amigables
- ✨ Muestra exactamente qué valores recibió
- ✨ Muestra qué tipo de dato es cada uno
- 📝 **Por qué**: Ayuda al usuario a entender qué hizo mal

**Checkpoint**: Prueba con `sumar("hola", 5)` y verás un mensaje super claro de qué está mal.

---

## Concepto 2: Tipos de mejoras que puedes pedir

No todas las mejoras son iguales. Aquí están las categorías principales que puedes usar.

### Tipo 1: Mejoras de funcionalidad

**Qué es**: Añadir características nuevas que el código no tenía.

**Ejemplo**:
```
El código suma bien, pero añade una función resta también
```

### Tipo 2: Mejoras de claridad

**Qué es**: Hacer el código más fácil de entender.

**Ejemplo**:
```
Este código funciona pero no entiendo qué hace cada parte.
Añade comentarios explicativos en cada línea
```

### Tipo 3: Mejoras de robustez

**Qué es**: Hacer que el código maneje mejor casos problemáticos.

**Ejemplo**:
```
¿Qué pasa si alguien pone números muy grandes?
Añade validación para números mayores a 1000000
```

### Tipo 4: Mejoras de eficiencia

**Qué es**: Hacer que el código sea más rápido o use menos recursos.

**Ejemplo**:
```
Este código funciona pero es lento con listas grandes.
¿Hay una forma más rápida de hacer lo mismo?
```

### Tipo 5: Mejoras estéticas

**Qué es**: Mejorar la presentación o los mensajes al usuario.

**Ejemplo**:
```
Los resultados se ven bien pero muy planos.
Hazlos más visuales con líneas separadoras y emojis
```

---

## Concepto 3: Cómo pedir mejoras específicas

La clave para iterar bien es ser específico. Aquí está la fórmula.

### Fórmula para pedir mejoras

```
[Reconoce lo que funciona]

Mejora específica:
[Describe exactamente QUÉ cambiar]

Razón:
[Por qué quieres ese cambio]
```

### Ejemplo: Mejorar validación de edad

**Código actual**:
```javascript
function validarEdad(edad) {
  if (edad >= 18) {
    return true;
  } else {
    return false;
  }
}
```

**Forma vaga de pedir mejora** (NO hagas esto):
```
Mejora esto
```

**Forma específica** (SÍ haz esto):
```
Este código funciona bien para validar edad.

Mejora específica:
Añade validación para que la edad esté entre 0 y 120.
Si está fuera de ese rango, mostrar mensaje de error específico.

Razón:
Nadie tiene edad negativa o mayor a 120, esos son errores de entrada.
```

**Código mejorado que recibirías**:
```javascript
function validarEdad(edad) {
  // Verificar que la edad esté en rango válido
  if (edad < 0) {
    console.log("Error: La edad no puede ser negativa");
    return null;
  }

  if (edad > 120) {
    console.log("Error: La edad no puede ser mayor a 120");
    return null;
  }

  // Verificar si es mayor de edad
  if (edad >= 18) {
    return true;
  } else {
    return false;
  }
}
```

**Explicación línea por línea**:
- **Líneas 2-5**: Validamos edad no negativa
- **Líneas 7-10**: Validamos edad no mayor a 120
- **Líneas 13-17**: Lógica original de validar mayoría de edad

**¿Qué ganaste?**:
- ✨ Código más robusto
- ✨ Mensajes de error específicos
- ✨ Prevención de datos absurdos

---

## Práctica guiada: Refinando una función paso a paso

Vamos a tomar una función simple y mejorarla en 4 iteraciones. Verás el proceso completo.

### Iteración 0: El pedido inicial

**Lo que pides**:
```
Necesito una función que busque un nombre en una lista de nombres
y diga si está o no está
```

**Código inicial**:
```javascript
function buscarNombre(nombre, lista) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] === nombre) {
      return true;
    }
  }
  return false;
}

// Ejemplo:
const nombres = ["Ana", "Juan", "María"];
console.log(buscarNombre("Juan", nombres)); // true
console.log(buscarNombre("Pedro", nombres)); // false
```

**Explicación**:
- **Línea 2**: Recorremos cada nombre de la lista
- **Línea 3**: Si encontramos el nombre, devolvemos true
- **Línea 7**: Si terminamos sin encontrarlo, devolvemos false

**Funciona**, pero vamos a mejorarlo.

---

### Iteración 1: Mensajes más claros

**Lo que pides**:
```
Funciona bien, pero en lugar de devolver true/false,
muestra mensajes claros como "Juan está en la lista"
o "Pedro no está en la lista"
```

**Código mejorado**:
```javascript
function buscarNombre(nombre, lista) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] === nombre) {
      console.log(nombre + " está en la lista");
      return true;
    }
  }

  console.log(nombre + " no está en la lista");
  return false;
}
```

**¿Qué cambió?**:
- ✨ **Línea 4**: Mensaje cuando lo encuentra
- ✨ **Línea 9**: Mensaje cuando no lo encuentra
- ✨ Ahora es mucho más claro qué pasó

---

### Iteración 2: Búsqueda sin importar mayúsculas

**Probar**: Funciona, pero si buscas "juan" (minúscula) no lo encuentra aunque esté "Juan" (mayúscula).

**Lo que pides**:
```
Mejora la búsqueda para que no importe si está en mayúsculas o minúsculas.
"juan", "JUAN", "Juan" deberían funcionar igual.
```

**Código mejorado**:
```javascript
function buscarNombre(nombre, lista) {
  // Convertir el nombre buscado a minúsculas
  const nombreBuscado = nombre.toLowerCase();

  for (let i = 0; i < lista.length; i++) {
    // Convertir cada nombre de la lista a minúsculas para comparar
    if (lista[i].toLowerCase() === nombreBuscado) {
      console.log(nombre + " está en la lista");
      return true;
    }
  }

  console.log(nombre + " no está en la lista");
  return false;
}
```

**Explicación de lo nuevo**:
- **Línea 3** (`toLowerCase()`): Convierte texto a minúsculas ("JUAN" → "juan")
- **Línea 7**: Comparamos ambos nombres en minúsculas

**Checkpoint**: Ahora buscar "juan", "JUAN" o "Juan" funciona igual.

---

### Iteración 3: Mostrar en qué posición está

**Lo que pides**:
```
Funciona excelente. Ahora mejóralo para que cuando encuentre el nombre,
también diga en qué posición de la lista está (primera, segunda, tercera...)
```

**Código mejorado**:
```javascript
function buscarNombre(nombre, lista) {
  const nombreBuscado = nombre.toLowerCase();

  for (let i = 0; i < lista.length; i++) {
    if (lista[i].toLowerCase() === nombreBuscado) {
      // Mostrar posición (i + 1 porque las posiciones empiezan en 1 para usuarios)
      const posicion = i + 1;
      console.log(nombre + " está en la lista");
      console.log("Posición: " + posicion + " de " + lista.length);
      return true;
    }
  }

  console.log(nombre + " no está en la lista");
  return false;
}
```

**Explicación**:
- **Línea 7** (`const posicion = i + 1`): Sumamos 1 porque para usuarios la primera posición es 1, no 0
- **Línea 9**: Mostramos posición y total de elementos

**Resultado final**: Una función simple se convirtió en una herramienta poderosa con búsqueda flexible, mensajes claros, y mucha información útil. ¡Todo en 3 iteraciones!

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: Pedir demasiados cambios a la vez

**Te pasa cuando**: Dices "mejora esto, aquello, y también lo otro" todo junto

**Por qué es problema**: El código cambia tanto que no sabes qué mejora causó qué resultado

**Cómo se soluciona**:
Una mejora a la vez. Prueba. Otra mejora. Prueba. Así.

**Ejemplo malo**:
```
Añade validación, mejora los mensajes, cambia el nombre de las variables,
optimiza el rendimiento, y añade manejo de errores
```

**Ejemplo bueno**:
```
Primero solo añade validación básica de entrada.
Después haremos las otras mejoras.
```

---

### Error #2: No probar entre iteraciones

**Te pasa cuando**: Pides mejora tras mejora sin ejecutar el código

**Por qué es problema**: Puedes introducir errores y no sabrás en qué iteración apareció

**Cómo se soluciona**:
Después de CADA iteración:
1. Guarda el archivo
2. Ejecuta el código
3. Verifica que funciona
4. Solo entonces pide la siguiente mejora

---

### Error #3: Perder de vista el objetivo

**Te pasa cuando**: Mejoras tanto que el código se vuelve complejo para lo que necesitas

**Por qué es problema**: Código más complejo es más difícil de entender y mantener

**Cómo se soluciona**:
Antes de cada mejora pregúntate: "¿Realmente necesito esto?"

**Ejemplo de sobre-ingeniería**:
Empezaste queriendo sumar dos números. Después de 10 iteraciones tienes una calculadora científica con 500 líneas. ¿Realmente lo necesitabas?

**Regla de oro**: Si el código hace lo que necesitas, considera si realmente necesitas más mejoras.

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: Los estudiantes que mejor aprenden son los que NO intentan hacer todo perfecto de una vez. Hacen algo simple que funciona, lo mejoran un poco, lo vuelven a mejorar. En 5 iteraciones pequeñas llegan más lejos que intentando hacer todo perfecto desde el principio.

> **Otro tip importante**: Guarda cada versión en archivos separados: `calculadora_v1.js`, `calculadora_v2.js`, etc. Así puedes comparar cómo evolucionó tu código. Es increíblemente educativo ver tu progreso.

> **Un secreto profesional**: Los programadores senior no tienen vergüenza de su código inicial. Saben que el código "feo pero funcional" es el primer paso hacia el código "hermoso y funcional". El secreto no es escribir código perfecto, es saber cómo mejorarlo.

---

## Tu turno: Ejercicio guiado

**Objetivo Simple**: Iterar sobre una función de calificaciones mejorándola en 3 pasos

**Tiempo**: 30-35 minutos

**Lo que necesitas antes de empezar**:
- [ ] Claude Code abierto
- [ ] Editor de código (VS Code o similar)
- [ ] Crear un archivo llamado `calificaciones.js`

### Instrucciones paso a paso

**Iteración 0: Código inicial** (8 min)

1. Pídele a Claude:
```
Necesito una función que reciba una calificación numérica (0-100)
y devuelva si está aprobada (60 o más) o reprobada (menos de 60)
```

2. Copia el código que te da
3. Guárdalo en `calificaciones.js`
4. Ejecútalo con Node.js para verificar que funciona
5. Prueba con varios números: 75, 50, 60, 100, 0

**Checkpoint**: Debe funcionar correctamente con números normales.

---

**Iteración 1: Añadir categorías** (8 min)

6. Ahora pídele a Claude:
```
El código funciona bien. Ahora mejóralo para que además de decir
aprobado/reprobado, también diga la categoría:
- 90-100: Excelente
- 80-89: Muy bien
- 70-79: Bien
- 60-69: Suficiente
- 0-59: Reprobado
```

7. Guarda el código mejorado
8. Prueba con números de cada categoría
9. Verifica que los mensajes sean correctos

**Checkpoint**: Ahora debe mostrar categorías específicas.

---

**Iteración 2: Validar entrada** (8 min)

10. Pídele esta mejora:
```
Funciona excelente, pero añade validación para:
- Que la calificación esté entre 0 y 100
- Que sea un número (no texto)
- Mostrar mensajes de error claros si algo está mal
```

11. Guarda y prueba con datos problemáticos:
    - Número negativo: -10
    - Número muy grande: 150
    - Texto: "hola"
    - Sin parámetro: ejecuta sin darle número

**Checkpoint**: Debe manejar elegantemente todos los casos problemáticos.

---

**Iteración 3: Mejorar presentación** (8 min)

12. Última mejora:
```
El código es muy robusto. Ahora mejora la presentación:
- Usa líneas separadoras para organizar la información
- Muestra la calificación numérica al inicio
- Usa el formato "Calificación: XX/100"
- Haz los mensajes más amigables
```

13. Guarda la versión final
14. Prueba con diferentes calificaciones
15. Disfruta cómo evolucionó tu código

**Criterio de éxito**:
- [ ] Tienes al menos 3 versiones guardadas
- [ ] Cada versión añade UNA mejora clara
- [ ] Probaste cada versión antes de continuar
- [ ] La versión final maneja todos los casos correctamente
- [ ] Entiendes qué hace cada parte del código

**Desafío extra**:
¿Se te ocurre otra mejora? Implementa una iteración 4 por tu cuenta.
Ideas: colores en la consola, cálculo de promedio de varias calificaciones, etc.

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **El ciclo de iteración**: Código inicial → probar → identificar mejora → implementar → repetir. Este es el proceso profesional de desarrollo
2. **Una mejora a la vez**: Los mejores resultados vienen de cambios incrementales, no de intentar hacer todo perfecto de golpe
3. **Tipos de mejoras**: Funcionalidad, claridad, robustez, eficiencia, estética. Cada una tiene su lugar y momento apropiado

---

## Siguiente paso

En la próxima lección: Aprenderás a **manejar proyectos complejos** con Claude. Descubrirás cómo dividir un proyecto grande en pedazos pequeños manejables, y cómo mantener todo organizado cuando trabajas en algo que tiene muchas partes.

---

**¿Dudas?** Iterar puede parecer lento al principio, pero es infinitamente más rápido que intentar hacer todo perfecto de una vez y fallar. La perfección es un destino, la iteración es el camino.

---

## PARTE 2: Control Avanzado de Contexto en Claude Code

Ahora que dominas la iteración básica, es momento de aprender técnicas avanzadas de control de contexto que te darán mayor control sobre cómo Claude Code trabaja.

## Modos de permisos (Permission Modes)

Claude Code tiene tres modos que controlan cómo aplica cambios al código:

### Modo Normal (por defecto)

**Qué hace**: Pide confirmación antes de aplicar cambios

```bash
# Usar modo normal explícitamente
claude --permission-mode normal
```

**Cuándo usar**:
- Cuando estás aprendiendo
- Proyectos importantes en producción
- Quieres revisar cada cambio antes de aplicarlo

**Ejemplo:**
```
You: Refactoriza este componente React

Claude Code:
Propongo estos cambios:
[muestra diff]

¿Aplicar cambios? [Y/n]
```

### Modo Auto-Accept

**Qué hace**: Aplica cambios automáticamente sin pedir confirmación

```bash
# Activar con flag
claude --permission-mode auto

# O dentro de sesión interactiva con Shift+Tab
```

**Cuándo usar**:
- Cambios simples (formateo, renombrado)
- Proyectos personales/experimentales
- Confías plenamente en los cambios

**⚠️ Precaución**: Siempre ten tu código en Git antes de usar auto-accept

**Ejemplo:**
```
You: Formatea todos los archivos con Prettier

Claude Code:
✓ Formateando src/app.js
✓ Formateando src/utils.js
✓ Formateando src/index.js
Completado: 3 archivos formateados
```

### Modo Plan (Solo lectura)

**Qué hace**: Solo analiza y planea, NO hace cambios

```bash
# Activar modo plan
claude --permission-mode plan
```

**Cuándo usar**:
- Explorar código desconocido
- Entender arquitectura sin riesgo
- Revisar cambios antes de aplicarlos
- Aprender de código existente

**Ejemplo:**
```
You: Analiza este código y sugiere refactorings

Claude Code:
[Modo Plan - Solo lectura]

Análisis del código:
1. El componente UserProfile tiene 3 responsabilidades mezcladas
2. Lógica de negocio está en el componente (debería estar en hook)
3. No hay manejo de errores en las llamadas API

Refactorings sugeridos:
a) Extraer lógica a useUserProfile hook
b) Crear ErrorBoundary component
c) Separar presentación de lógica

¿Quieres que implemente alguno? (cambia a modo normal primero)
```

### Cambiar de modo dentro de sesión

```
# Dentro de Claude Code
You: /mode plan      # Cambiar a plan mode
You: /mode normal    # Cambiar a normal
You: /mode auto      # Cambiar a auto-accept
```

## Extended Thinking (Pensamiento Profundo)

Para problemas complejos, activa el modo de pensamiento profundo.

### Activar Extended Thinking

**Método 1: Tecla Tab**
```
You: [presiona Tab antes de escribir]
     Diseña arquitectura completa de microservicios para e-commerce
```

**Método 2: Palabra clave**
```
You: think hard sobre la mejor estructura de base de datos para este sistema
```

**Método 3: Prompt explícito**
```
You: Necesito que pienses profundamente sobre este problema antes de responder:
     ¿Cómo optimizar queries con millones de registros?
```

### Cuándo usar Extended Thinking

**Úsalo para:**
- Decisiones de arquitectura complejas
- Debugging de problemas difíciles
- Optimizaciones de performance
- Diseño de APIs completas
- Resolución de bugs oscuros

**NO lo uses para:**
- Tareas simples (formateo, renombrado)
- Cambios obvios
- Consultas rápidas

**Comparación:**

Sin Extended Thinking:
```
You: ¿Qué patrón de diseño usar para este caso?

Claude Code: [responde en 2 segundos]
Te recomiendo el patrón Factory
```

Con Extended Thinking:
```
You: [Tab] ¿Qué patrón de diseño usar para este caso?

Claude Code: [piensa 5-10 segundos]

Analicemos las opciones:

1. Factory Pattern
   Pros: Centraliza creación, fácil extender
   Cons: Complejidad innecesaria para pocos tipos

2. Strategy Pattern
   Pros: Mejor para tu caso, muy flexible
   Cons: Más archivos

3. Builder Pattern
   Pros: Construcción paso a paso
   Cons: Overkill para objetos simples

Recomendación: Strategy Pattern porque:
- Tienes múltiples algoritmos intercambiables
- Los objetos son simples
- Necesitas cambiar comportamiento en runtime
```

## Gestión de Conversaciones

### Continuar última conversación

```bash
# Retomar donde lo dejaste
claude --continue
# o
claude -c
```

**Ejemplo de uso:**
```bash
# Sesión 1 (ayer)
You: Implementa sistema de auth con JWT
Claude Code: [implementa auth]

# Sesión 2 (hoy)
$ claude -c
You: Ahora agrega refresh tokens
# Claude Code recuerda el contexto de auth de ayer
```

### Seleccionar conversación anterior

```bash
# Ver lista de conversaciones
claude --list

# Salida:
# 1. [2024-01-15 10:30] Implementar auth JWT
# 2. [2024-01-15 09:15] Debugging error DB
# 3. [2024-01-14 16:45] Refactor componentes

# Resumir conversación específica
claude --resume
# Selecciona de la lista interactiva
```

### Exportar conversación

```bash
# Exportar para documentación
claude --export-conversation 1 > docs/auth-implementation.md
```

## Control de Output (Salida)

### Formatos de salida

**Texto plano (por defecto):**
```bash
claude "lista archivos del proyecto"
```

**JSON estructurado:**
```bash
claude --output-format json "lista archivos del proyecto"
```

Salida:
```json
{
  "files": [
    {"path": "src/app.js", "type": "javascript"},
    {"path": "src/utils.js", "type": "javascript"}
  ],
  "total": 2
}
```

**Stream JSON (para procesamiento en tiempo real):**
```bash
claude --output-format stream-json "analiza código" | jq '.events[] | select(.type=="file_analyzed")'
```

### Uso práctico con pipes

```bash
# Obtener solo nombres de archivos
claude --output-format json "lista archivos" | jq -r '.files[].path'

# Filtrar por tipo
claude --output-format json "lista archivos" | jq '.files[] | select(.type=="javascript")'

# Contar archivos por tipo
claude --output-format json "lista archivos" | jq 'group_by(.type) | map({type: .[0].type, count: length})'
```

## Gestión de Contexto y Memoria

### Limpiar contexto

```
# Dentro de sesión interactiva
You: /clear

# Reinicia conversación, útil cuando:
# - Cambias de tarea completamente
# - Claude parece confundido
# - Quieres empezar de cero
```

### Guardar checkpoint

```
You: /checkpoint "antes de refactor grande"

# Guarda estado actual para poder volver
```

### Restaurar checkpoint

```
You: /restore-checkpoint

# Vuelve al último checkpoint guardado
```

### Context window management

Claude Code maneja automáticamente el contexto, pero puedes optimizarlo:

**Ver uso de contexto:**
```
You: /context-stats

# Muestra:
# - Tokens usados: 45,234 / 200,000
# - Archivos en contexto: 12
# - Conversaciones: 8 mensajes
```

**Optimizar contexto:**
```
You: /context-optimize

# Claude Code:
# - Elimina mensajes antiguos menos relevantes
# - Mantiene archivos importantes
# - Comprime historial
```

## Combinando técnicas avanzadas

### Ejemplo 1: Análisis seguro con plan mode

```bash
# Explorar código legacy sin riesgo
claude --permission-mode plan

You: Analiza toda la carpeta src/ y dame reporte de:
     - Patrones anti-pattern detectados
     - Código duplicado
     - Posibles bugs
     - Oportunidades de refactor

# Claude analiza sin modificar nada
# Recibes reporte completo
# Decides qué cambiar
```

### Ejemplo 2: Refactor complejo con extended thinking

```bash
claude --permission-mode normal

You: [Tab] Necesito refactorizar UserController.
     Tiene 500 líneas y 15 métodos.
     Piensa cómo dividirlo mejor manteniendo coherencia.

# Claude piensa profundamente
# Propone arquitectura detallada
# Pide confirmación antes de cada cambio
```

### Ejemplo 3: Automatización con auto-accept y JSON

```bash
# Script que actualiza dependencias automáticamente
claude --permission-mode auto --output-format json \
  "actualiza todas las dependencias en package.json a últimas versiones" \
  | jq '.changes'
```

## Ejercicio práctico: Dominar control de contexto

**Objetivo**: Usar todos los modos en un workflow real

### Paso 1: Explorar con Plan Mode
```bash
claude --permission-mode plan

You: Analiza el código en src/ y sugiere mejoras de seguridad
```

### Paso 2: Implementar con Normal Mode + Extended Thinking
```bash
# Cambiar a normal mode
You: /mode normal

# Usar extended thinking para decisión compleja
You: [Tab] Implementa las mejoras de seguridad más críticas
```

### Paso 3: Formateo con Auto-Accept
```bash
You: /mode auto
You: Formatea todo el código con Prettier y ESLint
```

### Paso 4: Guardar checkpoint y exportar
```bash
You: /checkpoint "después de mejoras de seguridad"
You: /export docs/security-improvements.md
```

## Checklist de completitud - Parte 2

- [ ] Entiendo los 3 permission modes (normal, auto, plan)
- [ ] Sé usar extended thinking con Tab
- [ ] Puedo continuar conversaciones anteriores
- [ ] Sé exportar conversaciones
- [ ] Entiendo formatos de output (text, json, stream-json)
- [ ] Uso /clear, /checkpoint, /restore efectivamente
- [ ] Combino técnicas según necesidad

## Resumen completo de la lección

Has dominado:

**Parte 1 - Iteración:**
- Ciclo de iteración (código → probar → mejorar → repetir)
- Una mejora a la vez
- Tipos de mejoras

**Parte 2 - Control Avanzado:**
- Permission modes (normal/auto/plan)
- Extended thinking para problemas complejos
- Gestión de conversaciones
- Control de output
- Memoria y checkpoints

Ahora tienes control total sobre cómo Claude Code trabaja contigo.

---

**Módulo 3 - Lección 3 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
