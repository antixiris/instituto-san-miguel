***Tu primera conversación con Claude: Cómo pedirle lo que necesitas***


## Introducción: Imagina tener un compañero que siempre está disponible

¿Alguna vez has querido preguntarle a alguien cómo hacer algo en programación, pero no había nadie disponible? ¿O tal vez te daba vergüenza preguntar algo que creías "muy básico"?

Claude Code es como tener un compañero de programación que nunca duerme, nunca se cansa de responder preguntas, y jamás te juzga por no saber algo. Está aquí para ayudarte a escribir código, entender errores, y aprender mientras construyes.

En esta lección aprenderás **cómo hablar con Claude** para que te ayude de la mejor manera posible. No necesitas ser un experto en programación. Solo necesitas saber explicar qué quieres hacer, igual que se lo explicarías a un amigo.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Explicar lo que quieres construir**: Aprenderás a describir tus ideas de forma que Claude las entienda
2. **Hacer preguntas útiles**: Sabrás qué preguntar cuando estés atascado
3. **Mejorar el código que Claude te da**: Entenderás cómo pedir cambios o mejoras
4. **Evitar errores comunes**: Conocerás los errores que cometen los principiantes y cómo evitarlos

---

## ¿Por qué es importante saber pedir ayuda?

Imagina que vas a un restaurante y le dices al mesero: "Quiero comida". Probablemente te traiga algo, pero puede que no sea lo que esperabas. Ahora imagina que dices: "Quiero pasta con salsa de tomate, sin carne, y que no esté muy picante". Mucho mejor, ¿verdad?

Con Claude pasa lo mismo. Cuanto mejor expliques lo que necesitas, mejor será el resultado.

### 📊 Un dato interesante

Estudios muestran que los programadores que aprenden a colaborar con IA desde el principio avanzan 3 veces más rápido que quienes aprenden solo de forma tradicional. Estás aprendiendo una habilidad clave y fundamental para el desarrollo de software.

---

## Concepto 1: Tu primera petición simple

Vamos a empezar con lo más básico: pedirle a Claude que cree algo pequeño.

### Ejemplo: Crear una variable con tu nombre

**Lo que le pedirás a Claude**:
```
Crea una variable que guarde mi nombre
```

**El código que Claude podría dar**:
```javascript
const miNombre = "Juan";
```

**Explicación línea por línea**:
- **`const`**: Es una palabra especial que significa "constante". Indica que este valor no va a cambiar
- **`miNombre`**: Es el nombre que le damos a nuestra "caja" donde guardamos información
- **`=`**: Es como una flecha que dice "guarda esto aquí"
- **`"Juan"`**: Es el texto (tu nombre) que guardamos. Las comillas indican que es texto
- **`;`**: Es como un punto al final de una oración. Indica que terminamos esta instrucción

**En resumen**: Creamos una "caja" llamada `miNombre` donde guardamos el texto "Juan".

---

## Concepto 2: Añadiendo más detalles a tu petición

Ahora que sabes lo básico, vamos a ser más específicos con lo que pedimos.

### Tu primer ejemplo mejorado

Recuerda el ejemplo anterior. Ahora vamos a añadirle UNA cosa más:

**Lo que le pedirás a Claude**:
```
Crea una variable con mi nombre y otra con mi edad, luego muéstralas en la pantalla
```

**Código**:
```javascript
const miNombre = "Juan";
const miEdad = 25;

console.log(miNombre);
console.log(miEdad);
```

**¿Qué cambió?**:
- ✨ **Nuevo**: Añadimos `const miEdad = 25;` - otra variable para la edad
- ✨ **Nuevo**: Añadimos `console.log()` dos veces - para mostrar los valores
- 📝 **Por qué**: `console.log()` es como un "print" que muestra cosas en pantalla

**Explicación de las nuevas líneas**:
- **Línea 2** (`const miEdad = 25`): Igual que antes, pero ahora guardamos un número (sin comillas porque no es texto)
- **Línea 4** (`console.log(miNombre)`): "console" es la consola (pantalla), "log" significa "escribe", y entre paréntesis va lo que quieres mostrar
- **Línea 5**: Lo mismo pero mostrando la edad

---

## Concepto 3: Cómo pedir explicaciones

A veces Claude te dará código que no entiendes completamente. ¡Está bien! Puedes pedirle que te explique.

### Ejemplo real: Pedir explicación

**Situación**: Claude te dio este código y no lo entiendes:
```javascript
const saludar = (nombre) => {
  return `Hola, ${nombre}!`;
};
```

**Lo que le pedirás a Claude**:
```
Explícame este código línea por línea como si tuviera 10 años
```

**La explicación que Claude daría**:

Esta es una función (una "máquina" que hace algo):

- **`const saludar =`**: Creamos una "máquina" llamada `saludar`
- **`(nombre) =>`**: La flecha `=>` dice "esto es lo que hace la máquina". Entre paréntesis está el "ingrediente" que necesita: un nombre
- **`return`**: Es la "salida" de la máquina, lo que te da de vuelta
- **`` `Hola, ${nombre}!` ``**: Es un texto especial (con comillas raras `` ` ``) que puede incluir variables. El `${nombre}` se reemplaza por el nombre que le des

**Ejemplo de uso**:
```javascript
saludar("Ana");  // Resultado: "Hola, Ana!"
```

---

## Práctica guiada: Hagámoslo juntos

Vamos a crear algo útil paso a paso: un programa que calcule tu edad en días.

### Paso 1 de 3: Pedirle a Claude el código base

**Lo que escribirás**:
```
Necesito un programa que:
1. Guarde mi edad en años
2. Calcule cuántos días he vivido (multiplicando por 365)
3. Muestre el resultado en pantalla
```

**Tu código debería verse así**:
```javascript
const edadEnAnios = 25;
const edadEnDias = edadEnAnios * 365;

console.log(edadEnDias);
```

**Explicación**:
- **Línea 1**: Guardamos tu edad en años
- **Línea 2**: Multiplicamos (`*` significa multiplicar) la edad por 365 (días del año)
- **Línea 4**: Mostramos el resultado

**Checkpoint**: Si ejecutas esto con edad 25, deberías ver: `9125`

### Paso 2 de 3: Mejorarlo con un mensaje

Ahora que funciona, vamos a hacerlo más claro añadiendo un mensaje.

**Lo que le pedirás a Claude**:
```
Mejora el código anterior para que muestre un mensaje claro como "Has vivido X días"
```

**Código mejorado**:
```javascript
const edadEnAnios = 25;
const edadEnDias = edadEnAnios * 365;

console.log("Has vivido " + edadEnDias + " días");
```

**¿Qué cambió?**:
- En lugar de mostrar solo el número, ahora mostramos un texto completo
- El `+` une (concatena) textos y números

**Checkpoint**: Ahora deberías ver: `Has vivido 9125 días`

### Paso 3 de 3: Hacerlo más preciso

Los años bisiestos tienen 366 días. Vamos a ser más precisos.

**Lo que le pedirás**:
```
Ajusta el código para usar 365.25 días (que es más preciso considerando años bisiestos)
```

**Código final**:
```javascript
const edadEnAnios = 25;
const edadEnDias = edadEnAnios * 365.25;

console.log("Has vivido aproximadamente " + edadEnDias + " días");
```

**Checkpoint**: Ahora verás: `Has vivido aproximadamente 9131.25 días`

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: Pedir algo muy vago

**Te pasa cuando**: Le dices a Claude "Haz un programa"

**Por qué no funciona**: Es como decir "quiero comida" en un restaurante. ¿Qué tipo de comida? ¿Dulce? ¿Salada?

**Cómo se soluciona**: Sé específico. En lugar de "haz un programa", di "haz un programa que sume dos números"

**Ejemplo malo**:
```
Crea un programa
```

**Ejemplo bueno**:
```
Crea un programa que:
1. Guarde dos números
2. Los sume
3. Muestre el resultado
```

---

### Error #2: No probar el código que te dan

**Te pasa cuando**: Copias el código de Claude pero no lo ejecutas para ver si funciona

**Por qué es problema**: Puede que el código tenga un error o no haga exactamente lo que esperabas

**Cómo se soluciona**:
1. Copia el código
2. **Guarda el archivo** (muy importante)
3. Ejecútalo en tu computadora
4. Ve qué pasa
5. Si no funciona o no es lo que esperabas, díselo a Claude

---

### Error #3: No hacer preguntas cuando no entiendes

**Te pasa cuando**: Ves código que no entiendes y lo dejas pasar

**Por qué es problema**: Si no entiendes lo que hace el código, no podrás modificarlo o arreglar errores después

**Cómo se soluciona**:
Siempre que veas algo que no entiendes, pregunta:
```
¿Qué hace esta línea?
¿Para qué sirve este símbolo?
¿Por qué se usa esta palabra?
```

Claude nunca se cansará de explicar.

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: Los estudiantes que más aprenden son los que hacen MÁS preguntas, no los que hacen menos. Si algo no tiene sentido, pregunta. Es normal no entender todo a la primera.

> **Otro tip importante**: Cuando copies código de Claude, escríbelo tú mismo en lugar de hacer copy-paste. Aunque sea más lento, aprenderás mucho más. Es como aprender a tocar guitarra: no basta con ver a alguien tocar, tienes que practicar tú.

---

## Tu turno: Ejercicio guiado

**Objetivo Simple**: Crear un programa que calcule el precio final de un producto con descuento

**Tiempo**: 15-20 minutos

**Lo que necesitas antes de empezar**:
- [ ] Tener Claude Code abierto
- [ ] Un lugar donde escribir código (VS Code u otro editor)

### Instrucciones paso a paso

**Parte 1: El Código Básico** (5 min)

1. Abre tu editor de código
2. Crea un archivo nuevo llamado `descuento.js`
3. Pídele a Claude:

```
Necesito un programa que:
1. Guarde el precio de un producto (por ejemplo, 100)
2. Guarde el descuento en porcentaje (por ejemplo, 20 que significa 20%)
3. Calcule el precio final después del descuento
4. Muestre el precio final
```

**Parte 2: Prueba tu Código** (5 min)

4. Guarda el archivo (Ctrl+S o Cmd+S en Mac)
5. Abre la terminal
6. Ejecuta: `node descuento.js`
7. Deberías ver el precio final (con precio 100 y descuento 20%, debería ser 80)

**Parte 3: Mejóralo** (5 min)

8. Pídele a Claude que mejore el código para mostrar también:
   - El precio original
   - Cuánto dinero ahorraste
   - El precio final

9. Vuelve a probar

**Parte 4: Hazlo Tuyo** (5 min)

10. Cambia los números (precio y descuento)
11. Prueba con diferentes valores
12. Observa cómo cambian los resultados

**Criterio de éxito**:
- [ ] El programa calcula correctamente el precio con descuento
- [ ] Muestra toda la información pedida
- [ ] Funciona con diferentes números

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Cómo pedir código a Claude**: Sé claro y específico sobre lo que quieres
2. **Cómo entender el código**: Pide explicaciones línea por línea cuando no entiendas algo
3. **Cómo mejorar paso a paso**: No necesitas hacer todo perfecto de una vez, ve mejorando poco a poco

---

## Siguiente paso

En la próxima lección: Aprenderás a **mejorar código que ya existe** (tuyo o de Claude). Es como ser un "doctor de código" que encuentra problemas y los arregla.

---

**¿Dudas?** Es completamente normal al empezar. Recuerda: hacer preguntas es señal de que estás aprendiendo, no de que no sabes.