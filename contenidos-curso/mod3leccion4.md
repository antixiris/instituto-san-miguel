<p><strong><em>Manejo de proyectos complejos: Cómo dividir lo grande en pequeño</em></strong></p>

## Introducción: El elefante en pedazos

Hay un dicho popular: "¿Cómo te comes un elefante? De a un bocado a la vez."

Los proyectos de programación son como elefantes. Cuando ves el proyecto completo, parece imposible: "Tengo que hacer una aplicación web con usuarios, base de datos, autenticación, interfaz bonita, y que funcione en el celular". Es abrumador, ¿verdad?

Pero aquí está el secreto que todo programador profesional conoce: **nadie hace proyectos grandes de golpe**. Lo que hacen es dividir el elefante en bocados del tamaño correcto, y luego comerlo de a uno a la vez.

Con Claude Code, esta habilidad es aún más poderosa. Claude puede ayudarte con cada "bocado" del proyecto, pero tú necesitas saber cómo dividir el elefante. Eso es exactamente lo que aprenderás hoy.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Descomponer proyectos grandes**: Convertir un proyecto intimidante en pasos pequeños y manejables
2. **Priorizar funcionalidades**: Saber qué hacer primero y qué puede esperar
3. **Mantener el contexto con Claude**: Organizar conversaciones largas sin perderte
4. **Crear un plan de proyecto**: Diseñar una hoja de ruta clara antes de escribir código

---

## ¿Por qué los proyectos grandes son difíciles?

Imagina que te piden construir una casa. Si piensas en "construir una casa completa", es aterrador. Pero si piensas en:
1. Primero hacer los cimientos
2. Luego levantar las paredes
3. Después poner el techo
4. Luego instalar ventanas
5. Finalmente pintar y decorar

Cada paso individual es manejable. Y cuando terminas todos los pasos, ¡tienes una casa!

El código es idéntico.

### 📊 Un dato interesante

El 60% de los proyectos de software que fallan, no fallan por problemas técnicos. Fallan porque intentaron hacer demasiado a la vez sin un plan claro. Aprender a dividir y planear es más importante que saber programar.

---

## Concepto 1: La pirámide de descomposición

Todo proyecto grande se puede dividir en niveles. Vamos a llamarle "la pirámide de descomposición".

### Los 4 niveles de la pirámide

```
Nivel 1 (arriba): PROYECTO COMPLETO
         ↓
Nivel 2: MÓDULOS PRINCIPALES
         ↓
Nivel 3: FUNCIONALIDADES
         ↓
Nivel 4 (abajo): TAREAS ESPECÍFICAS
```

Solo programas en el Nivel 4. Los otros niveles son planeación.

### Ejemplo: Sistema de biblioteca escolar

Vamos a descomponer un proyecto real paso a paso.

**Nivel 1: Proyecto completo**
```
Sistema de gestión de biblioteca escolar
```

Demasiado grande. Bajemos un nivel.

**Nivel 2: Módulos principales**
```
1. Gestión de libros
2. Gestión de usuarios
3. Sistema de préstamos
4. Reportes
```

Mejor, pero aún son piezas grandes. Bajemos otro nivel.

**Nivel 3: Funcionalidades (tomemos "Gestión de libros")**
```
1.1. Agregar libro nuevo
1.2. Buscar libros
1.3. Editar información de libro
1.4. Eliminar libro
1.5. Ver lista de todos los libros
```

Mucho mejor. Ahora bajemos al nivel donde realmente programamos.

**Nivel 4: Tareas específicas (tomemos "Agregar libro nuevo")**
```
1.1.1. Crear función que reciba datos del libro (título, autor, ISBN, año)
1.1.2. Validar que todos los datos estén completos
1.1.3. Validar que el ISBN tenga formato correcto
1.1.4. Guardar el libro en la lista
1.1.5. Mostrar mensaje de confirmación
```

¡Ahora sí! Estas tareas específicas son perfectas para pedirle a Claude.

---

## Concepto 2: El método de la funcionalidad mínima viable

Hay un concepto profesional llamado MVP (Minimum Viable Product, Producto Mínimo Viable). Es la versión más simple de tu proyecto que todavía es útil.

### La regla del MVP

No hagas todas las funcionalidades a la vez. Haz primero:
1. Lo absolutamente esencial
2. Lo que te permite probar que funciona
3. Lo que es la base para todo lo demás

### Ejemplo: Lista de tareas (TODO list)

**Si intentas hacerlo todo**:
```
- Agregar tareas
- Editar tareas
- Eliminar tareas
- Marcar como completadas
- Categorías de tareas
- Prioridades (alta, media, baja)
- Fechas límite
- Recordatorios
- Colores personalizados
- Exportar a PDF
- Compartir con otros usuarios
- Sincronizar en la nube
```

¡Son 12 funcionalidades! Te tomaría semanas.

**Versión MVP (lo esencial)**:
```
FASE 1 (MVP):
- Agregar tareas
- Ver lista de tareas
- Marcar como completadas

Después puedes añadir:
FASE 2:
- Eliminar tareas
- Editar tareas

FASE 3:
- Categorías
- Prioridades

FASE 4:
- Todo lo demás
```

Con el MVP puedes tener algo funcionando en horas, no semanas.

### Cómo pedir el MVP a Claude

**Pedido para FASE 1**:
```
Necesito un sistema simple de lista de tareas.

Solo necesito lo básico para empezar:
1. Agregar una tarea (solo el texto de la tarea)
2. Ver todas las tareas en una lista
3. Marcar una tarea como completada

Usa estructuras de datos simples (un array de objetos).
No necesito base de datos ni nada complejo, solo que funcione.

Soy principiante, así que usa código claro y comentado.
```

**Código que recibirías**:
```javascript
// Lista para guardar todas las tareas
let tareas = [];

// Función para agregar una tarea nueva
function agregarTarea(texto) {
  const tarea = {
    id: tareas.length + 1,
    texto: texto,
    completada: false
  };

  tareas.push(tarea);
  console.log("Tarea agregada: " + texto);
}

// Función para ver todas las tareas
function verTareas() {
  console.log("\n--- LISTA DE TAREAS ---");

  for (let i = 0; i < tareas.length; i++) {
    const estado = tareas[i].completada ? "[✓]" : "[ ]";
    console.log(estado + " " + tareas[i].texto);
  }
}

// Función para marcar tarea como completada
function completarTarea(id) {
  for (let i = 0; i < tareas.length; i++) {
    if (tareas[i].id === id) {
      tareas[i].completada = true;
      console.log("Tarea completada: " + tareas[i].texto);
      return;
    }
  }
  console.log("No se encontró la tarea con id " + id);
}

// Ejemplo de uso:
agregarTarea("Estudiar JavaScript");
agregarTarea("Hacer ejercicio");
verTareas();
completarTarea(1);
verTareas();
```

**Explicación línea por línea**:
- **Línea 2** (`let tareas = []`): Array vacío donde guardaremos las tareas
- **Líneas 5-13**: Función para agregar. Creamos un objeto con id, texto y estado de completada
- **Línea 12** (`tareas.push(tarea)`): Añadimos la tarea al array
- **Líneas 16-22**: Función para mostrar todas las tareas
- **Línea 20** (`const estado = ...`): Si está completada mostramos ✓, si no un espacio vacío
- **Líneas 25-36**: Función para marcar como completada buscando por id

**Esto es MVP**: Funciona perfectamente, hace lo esencial, y es una base sólida para añadir más funcionalidades después.

---

## Concepto 3: Mantener el contexto en conversaciones largas

Cuando trabajas en un proyecto grande, tendrás conversaciones largas con Claude. Aquí está cómo mantener todo organizado.

### Técnica 1: Recordatorios de contexto

Cada 5-7 intercambios con Claude, recuérdale el contexto general.

**Ejemplo**:
```
Seguimos trabajando en el sistema de biblioteca escolar.
Hasta ahora tenemos:
- Módulo de libros: agregar y listar libros funciona
- Módulo de usuarios: aún no empezamos

Ahora necesito la función de buscar libros por título.
```

### Técnica 2: Archivos separados por módulo

No pongas todo el código en un solo archivo. Organiza por módulos.

**Estructura de carpetas**:
```
mi-proyecto/
  ├── libros.js      (funciones relacionadas con libros)
  ├── usuarios.js    (funciones de usuarios)
  ├── prestamos.js   (funciones de préstamos)
  └── main.js        (archivo principal que usa los demás)
```

Cuando le pidas a Claude trabajar en algo, especifica el archivo:

```
Estoy trabajando en el archivo libros.js que maneja todo lo relacionado con libros.

Ahora necesito añadirle la función de editar un libro existente...
```

### Técnica 3: Documentar decisiones

Cuando Claude te sugiera algo y lo aceptes, documéntalo.

**Ejemplo de documentación simple**:
```javascript
/* DECISIONES DEL PROYECTO:
 *
 * 1. Cada libro tiene: id, titulo, autor, isbn, año
 * 2. Los IDs empiezan en 1 y van incrementando
 * 3. Los libros se guardan en un array (no base de datos aún)
 * 4. Las búsquedas no distinguen mayúsculas/minúsculas
 *
 * Última actualización: [fecha]
 */
```

Esto te ayuda a ti y a Claude a recordar cómo funciona todo.

---

## Práctica guiada: Planificando un proyecto desde cero

Vamos a planear un proyecto completo usando todo lo que aprendiste. No escribiremos código aún, solo el plan.

### Paso 1 de 4: Definir el proyecto

**Proyecto**: Sistema de registro de asistencia para un salón de clases

**Descripción en una frase**:
```
El profesor puede registrar qué estudiantes asistieron cada día
y ver estadísticas de asistencia.
```

**Para qué es**: Ayudar al profesor a llevar control de asistencias sin usar papel.

**Usuarios**: Un profesor que no es muy técnico.

---

### Paso 2 de 4: Identificar módulos principales

Pregúntate: ¿Qué partes grandes tiene este sistema?

**Módulos identificados**:
```
1. Gestión de estudiantes (agregar, ver lista)
2. Registro de asistencias (marcar quién vino hoy)
3. Reportes (ver estadísticas)
```

Solo 3 módulos. Perfecto, es manejable.

---

### Paso 3 de 4: Definir el MVP

De esos 3 módulos, ¿cuál es lo mínimo que necesitas para que sea útil?

**MVP (Fase 1)**:
```
1. Poder agregar estudiantes a la lista
2. Poder ver la lista de estudiantes
3. Poder marcar asistencia de hoy
4. Poder ver la asistencia de hoy
```

**Fase 2** (después del MVP):
```
5. Ver asistencias de días anteriores
6. Calcular porcentaje de asistencia por estudiante
```

**Fase 3** (si hay tiempo):
```
7. Exportar reporte a archivo
8. Buscar estudiante específico
```

---

### Paso 4 de 4: Desglosar el MVP en tareas

Tomemos la función 3 del MVP: "Marcar asistencia de hoy"

**Tareas específicas**:
```
3.1. Crear función que muestre lista de estudiantes con números
3.2. Pedir al usuario qué números están presentes (ej: "1,3,4,5")
3.3. Validar que los números sean válidos
3.4. Marcar esos estudiantes como presentes
3.5. Guardar la fecha de hoy
3.6. Mostrar confirmación de cuántos asistieron
```

**Ahora sí puedes pedirle a Claude** la tarea 3.1:

```
Necesito una función para mi sistema de asistencias.

Contexto:
- Tengo un array de estudiantes, cada uno con: id, nombre
- Estoy trabajando en la parte de registrar asistencia del día

Tarea específica:
Crea una función que muestre la lista de todos los estudiantes
con un número al lado para que el profesor pueda identificarlos.

Formato esperado:
1. Juan Pérez
2. María García
3. Pedro López
...

Usa código simple y claro, soy principiante.
```

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: Empezar a programar sin planear

**Te pasa cuando**: Ves el proyecto y empiezas a escribir código inmediatamente

**Por qué es problema**: Terminas con código desorganizado que tienes que reescribir

**Cómo se soluciona**:
1. Dedica 20-30 minutos a planear ANTES de escribir código
2. Descompón en módulos
3. Define el MVP
4. Identifica las primeras 3 tareas
5. AHORA sí, empieza a programar

**Regla de oro**: Por cada hora de programación, dedica 15 minutos a planear.

---

### Error #2: Hacer todo en un solo archivo gigante

**Te pasa cuando**: Pones todas las funciones en un solo archivo que crece y crece

**Por qué es problema**: Se vuelve imposible encontrar cosas, el código es un desastre

**Cómo se soluciona**:
Desde el inicio, separa en archivos:
```
estudiantes.js  → Todo sobre estudiantes
asistencias.js  → Todo sobre asistencias
reportes.js     → Todo sobre reportes
main.js         → Conecta todo
```

Cada archivo debe tener un solo propósito claro.

---

### Error #3: Agregar funcionalidades antes de terminar el MVP

**Te pasa cuando**: Estás al 80% del MVP y piensas "sería genial si también pudiera..."

**Por qué es problema**: Nunca terminas nada, siempre estás añadiendo "una cosita más"

**Cómo se soluciona**:
Disciplina férrea:
1. Termina el MVP completamente
2. Pruébalo a fondo
3. Asegúrate que funciona bien
4. SOLO ENTONCES considera añadir más

**Mantra**: "Primero que funcione, después que sea bonito, finalmente que sea completo"

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: Los proyectos que los estudiantes terminan son SIEMPRE los que empezaron con un plan claro y un MVP bien definido. Los proyectos que abandonan son los que empezaron programando sin saber exactamente qué construir. La planeación no es opcional, es lo que separa el éxito del fracaso.

> **Otro tip importante**: Cuando planees, escríbelo. Usa papel, un documento, lo que sea. Planear "en la cabeza" no funciona. Tu cerebro olvida, un documento no. Yo uso un simple archivo `PLAN.md` en cada proyecto.

> **Un secreto profesional**: Los mejores programadores pasan más tiempo planeando y leyendo código que escribiendo código nuevo. La velocidad no está en teclear rápido, está en saber exactamente qué teclear porque ya lo planeaste.

> **Consejo de oro**: Antes de pedirle cualquier cosa a Claude en un proyecto grande, pregúntate: "¿En qué módulo va esto? ¿Es parte del MVP? ¿Ya tengo la base para esto?" Si no puedes responder, detente y planea más.

---

## Tu turno: Ejercicio guiado

**Objetivo Simple**: Planear completamente un proyecto pequeño y empezar a implementar el MVP

**Tiempo**: 35-40 minutos

**Proyecto**: Sistema de registro de gastos personales

**Lo que necesitas antes de empezar**:
- [ ] Un documento para escribir tu plan (puede ser .txt, .md, o papel)
- [ ] Claude Code abierto (para cuando empieces a programar)

### Instrucciones paso a paso

**Parte 1: Definición del proyecto** (5 min)

1. Escribe una descripción de una frase del proyecto:
   ```
   [Tu descripción aquí]
   ```

2. Define para qué es y quién lo usará:
   ```
   Para qué: [completar]
   Usuario: [completar]
   ```

---

**Parte 2: Identificar módulos** (7 min)

3. Haz una lista de módulos principales. Guía:
   - ¿Qué necesitas registrar? (gastos)
   - ¿Qué cálculos necesitas? (totales, promedios)
   - ¿Qué consultas harás? (ver por fecha, por categoría)

4. Escribe tus módulos:
   ```
   1. [Módulo 1]
   2. [Módulo 2]
   3. [Módulo 3]
   ```

---

**Parte 3: Definir MVP** (8 min)

5. De todos esos módulos, elige solo lo esencial para que sea útil:
   ```
   MVP (Fase 1):
   - [Funcionalidad esencial 1]
   - [Funcionalidad esencial 2]
   - [Funcionalidad esencial 3]
   - [Funcionalidad esencial 4]
   ```

6. Planea Fase 2 (lo que añadirás después):
   ```
   Fase 2:
   - [Mejora 1]
   - [Mejora 2]
   ```

---

**Parte 4: Desglosar primera funcionalidad** (10 min)

7. Toma la primera funcionalidad de tu MVP (probablemente "agregar gasto")

8. Desglósala en tareas específicas:
   ```
   Funcionalidad: [Agregar gasto]

   Tareas específicas:
   1. [Tarea 1]
   2. [Tarea 2]
   3. [Tarea 3]
   4. [Tarea 4]
   5. [Tarea 5]
   ```

---

**Parte 5: Implementar primera tarea** (15 min)

9. Crea un archivo `gastos.js`

10. Toma la primera tarea de tu lista y conviértela en un prompt para Claude:
    ```
    Necesito una función para [tu proyecto].

    Contexto:
    [Descripción breve del proyecto]

    Tarea específica:
    [La primera tarea que desglosaste]

    [Cualquier detalle adicional necesario]
    ```

11. Pide el código a Claude

12. Guárdalo y pruébalo

13. Verifica que funciona antes de continuar

**Criterio de éxito**:
- [ ] Tienes un plan escrito completo
- [ ] El MVP está claramente definido (3-5 funcionalidades máximo)
- [ ] Desglosaste al menos una funcionalidad en tareas específicas
- [ ] Implementaste y probaste al menos UNA tarea
- [ ] Entiendes el camino completo del plan al código

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **La pirámide de descomposición**: Proyecto → Módulos → Funcionalidades → Tareas. Solo programas en el nivel de tareas, los demás son planeación
2. **El poder del MVP**: No hagas todo a la vez. Define lo mínimo útil, impleméntalo, pruébalo, y solo entonces añade más
3. **Organización y contexto**: Archivos separados por módulo, recordatorios de contexto a Claude, documentación de decisiones. Esto mantiene proyectos grandes manejables

---

## Siguiente paso

En la próxima lección: Explorarás **patrones de diseño con Claude**. Aprenderás patrones comunes que los profesionales usan para resolver problemas recurrentes, y cómo pedirle a Claude que los implemente de forma clara y entendible.

---

**¿Dudas?** Los proyectos grandes intimidan a todos, incluso a programadores senior. La diferencia es que ellos saben que el secreto no está en ser más inteligente, está en dividir mejor y planear más. Ahora tú también conoces ese secreto.
