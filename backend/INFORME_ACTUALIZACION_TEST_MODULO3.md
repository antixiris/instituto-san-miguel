# Actualización Test Módulo 3 - Preguntas Reales

**Fecha:** 3 de Noviembre de 2025
**Módulo:** Módulo 3: Técnicas Avanzadas de Prompting
**Tipo:** Reemplazo de preguntas genéricas por preguntas basadas en contenido

---

## 🎯 Objetivo

Reemplazar las preguntas genéricas de plantilla del test del Módulo 3 por preguntas reales basadas en el contenido específico de las 5 lecciones principales del módulo.

---

## 🔴 Problema Identificado

El test del Módulo 3 contenía 10 preguntas genéricas de plantilla:

```
❌ "Pregunta 1: ¿Cuál de las siguientes afirmaciones sobre Módulo 3: Técnicas Avanzadas de Prompting es correcta?"
❌ "Pregunta 2: ¿Cuál de las siguientes afirmaciones sobre Módulo 3: Técnicas Avanzadas de Prompting es correcta?"
...
```

Estas preguntas no evaluaban conocimientos reales sobre el contenido de las lecciones.

---

## ✅ Solución Implementada

### Script Creado

**Archivo:** `/backend/update-module3-test.js`

**Funcionalidad:**
1. Elimina las 10 preguntas genéricas existentes
2. Crea 10 preguntas nuevas basadas en el contenido real
3. Distribuye preguntas entre los 5 temas principales del módulo

### Distribución de Preguntas por Lección

#### Lección 1: Prompting Efectivo (2 preguntas)
1. **Característica principal de un prompt efectivo** [SINGLE]
   - Respuesta correcta: Ser claro, específico y proporcionar contexto completo
   - Analogía: "Un café" vs "Café americano, grande, sin azúcar"

2. **Analogía para explicar la importancia** [SINGLE]
   - Respuesta correcta: Arquitecto explicando cómo construir una casa
   - Concepto: Especificaciones completas vs pedido vago

#### Lección 2: Contexto y Especificación (2 preguntas)
3. **Importancia de dar contexto** [SINGLE]
   - Respuesta correcta: Para que Claude entienda propósito, usuarios y conexiones
   - Analogía: Ir al médico y explicar todos los síntomas

4. **Elementos del contexto completo** [MULTIPLE - 3 correctas]
   - ✅ Para qué se usará el código
   - ✅ Quién lo usará
   - ✅ Cómo se conecta con otras partes
   - ❌ Solo la funcionalidad básica

#### Lección 3: Iteración y Refinamiento (2 preguntas)
5. **Significado de "iterar"** [SINGLE]
   - Respuesta correcta: Mejorar el código progresivamente en ciclos
   - Analogía: Escribir un ensayo y corregirlo 3 o 4 veces

6. **Ventajas de iterar** [MULTIPLE - 3 correctas]
   - ✅ Empiezas con algo funcional aunque simple
   - ✅ Puedes probar y ajustar progresivamente
   - ✅ Mantienes lo que funciona mientras mejoras lo demás
   - ❌ Es más rápido llegar a la perfección de golpe

#### Lección 4: Proyectos Complejos (2 preguntas)
7. **Cómo abordar un proyecto complejo** [SINGLE]
   - Respuesta correcta: Dividirlo en tareas pequeñas (bocados del elefante)
   - Dicho: "¿Cómo te comes un elefante? De a un bocado a la vez"

8. **Habilidades clave para proyectos complejos** [MULTIPLE - 3 correctas]
   - ✅ Descomponer proyectos grandes en pasos pequeños
   - ✅ Priorizar funcionalidades
   - ✅ Mantener el contexto en conversaciones largas
   - ❌ Memorizar todo el código generado

#### Lección 5: Patrones de Diseño (2 preguntas)
9. **Qué son los patrones de diseño** [SINGLE]
   - Respuesta correcta: Soluciones probadas para problemas comunes
   - Analogía: Ruedas redondas de bicicleta, recetas de cocina

10. **Ventaja de usar patrones con Claude** [SINGLE]
    - Respuesta correcta: No necesitas memorizarlos, solo saber cuándo pedirlos
    - Concepto: Claude adapta patrones a tu nivel

---

## 📊 Estadísticas del Test

```
Total preguntas: 10
Distribución por tipo:
  - SINGLE: 7 preguntas (70%)
  - MULTIPLE: 3 preguntas (30%)

Puntuación:
  - Por pregunta: 10 puntos
  - Total: 100 puntos
  - Aprobado: ≥ 50 puntos (5 o más correctas)

Tiempo límite: 60 minutos
```

---

## 🎓 Conceptos Clave Evaluados

### 1. Prompting Efectivo
- Claridad y especificidad en los prompts
- Importancia del contexto completo
- Analogías para explicar buenos vs malos prompts

### 2. Contexto y Especificación
- Elementos del contexto (propósito, usuarios, conexiones)
- Diferencia entre prompt con y sin contexto
- Anticipación de problemas mediante información completa

### 3. Iteración y Refinamiento
- Proceso de mejora progresiva
- Ventajas de iterar vs buscar perfección inmediata
- Mantener lo que funciona mientras se mejora

### 4. Proyectos Complejos
- Descomposición en tareas manejables
- Priorización de funcionalidades
- Mantenimiento de contexto en proyectos largos

### 5. Patrones de Diseño
- Concepto de soluciones probadas
- No necesidad de memorización
- Adaptación al nivel del usuario

---

## 🔧 Ejecución del Script

```bash
cd backend
node update-module3-test.js
```

**Salida esperada:**
```
🎬 Actualizando test del Módulo 3 con preguntas reales...

📦 Módulo: Módulo 3: Técnicas Avanzadas de Prompting
📝 Test: Test de Módulo 3: Técnicas Avanzadas de Prompting
❓ Preguntas actuales: 10

🗑️  Eliminando preguntas antiguas...

✨ Creando preguntas reales basadas en el contenido...

✅ Pregunta 1: ¿Cuál es la característica principal de un prompt efectivo?...
   Tipo: SINGLE
...
✅ Pregunta 10: ¿Cuál es la ventaja de usar patrones de diseño con Claude Co...
   Tipo: SINGLE

═══════════════════════════════════════════
✅ TEST MÓDULO 3 ACTUALIZADO
═══════════════════════════════════════════
📊 Total preguntas: 10
📝 Distribución:
   - SINGLE: 7
   - MULTIPLE: 3
💯 Puntuación total: 100 puntos
═══════════════════════════════════════════

🎉 Proceso completado con éxito
```

---

## ✅ Verificación

Comando para verificar las preguntas creadas:

```bash
cd backend && node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// ... (script de verificación)
"
```

**Resultado:**
- 10 preguntas creadas correctamente
- 7 SINGLE + 3 MULTIPLE
- Todas con explicaciones educativas
- Total: 100 puntos

---

## 📝 Ejemplos de Preguntas

### Pregunta SINGLE (Respuesta Única)
```
¿Cuál es la característica principal de un prompt efectivo?

A. Ser lo más corto posible
B. ✅ Ser claro, específico y proporcionar contexto completo
C. Usar lenguaje técnico avanzado
D. Incluir múltiples tareas en un solo prompt

💡 Explicación: Un prompt efectivo debe ser claro, específico y
proporcionar contexto completo. Es como la diferencia entre pedir
"un café" y pedir "un café americano, grande, sin azúcar" - la
especificidad asegura que recibas exactamente lo que necesitas.
```

### Pregunta MULTIPLE (Respuestas Múltiples)
```
¿Cuáles elementos deben incluirse al proporcionar contexto completo?
(Selecciona todas las correctas)

A. ✅ Para qué se usará el código
B. ✅ Quién lo usará
C. ✅ Cómo se conecta con otras partes
D. Solo la funcionalidad básica

💡 Explicación: Un contexto completo incluye: para qué se usará,
quién lo usará, y cómo se conecta con otras partes del sistema.
Dar solo la funcionalidad básica sin contexto es insuficiente.
```

---

## 🎯 Características de las Preguntas

### 1. Basadas en Contenido Real
- Cada pregunta evalúa conceptos específicos de las lecciones
- Referencias a analogías usadas en el material educativo
- Terminología consistente con las lecciones

### 2. Explicaciones Educativas
- Todas las preguntas incluyen explicaciones detalladas
- Las explicaciones refuerzan el aprendizaje
- Se mencionan las analogías clave de las lecciones

### 3. Opciones Distractoras Realistas
- Las opciones incorrectas son errores comunes
- Ayudan a identificar malentendidos conceptuales
- No son obviamente falsas

### 4. Distribución Equilibrada
- 2 preguntas por cada lección principal
- Mezcla de SINGLE y MULTIPLE
- Cubre todos los objetivos de aprendizaje del módulo

---

## 🔄 Estado de Submissions

**Verificación:** 0 submissions previas

No hay intentos previos del test, por lo que no se requiere reset de calificaciones.

---

## 📋 Próximos Pasos

### Módulos Pendientes de Actualización

Los siguientes módulos tienen tests de plantilla que requieren actualización:

1. **Módulo 1**: ✅ Ya tiene preguntas reales
2. **Módulo 2**: ✅ Ya tiene preguntas reales
3. **Módulo 3**: ✅ **ACTUALIZADO HOY**
4. **Módulo 4**: ⚠️ Requiere actualización
5. **Módulo 5**: ⚠️ Requiere actualización
6. **Módulo 6**: ⚠️ Requiere actualización
7. **Módulo 7**: ⚠️ Requiere actualización
8. **Módulo 8**: ⚠️ Requiere actualización

### Recomendaciones

1. Seguir el mismo patrón para módulos 4-8
2. Crear 2 preguntas por lección principal
3. Mantener distribución 70% SINGLE / 30% MULTIPLE
4. Incluir explicaciones educativas en todas las preguntas
5. Usar analogías y ejemplos del material original

---

## 📚 Archivos Relacionados

- `/backend/update-module3-test.js` - Script de actualización
- `/contenidos-curso/mod3leccion1.md` - Prompting efectivo
- `/contenidos-curso/mod3leccion2.md` - Contexto y especificación
- `/contenidos-curso/mod3leccion3.md` - Iteración y refinamiento
- `/contenidos-curso/mod3leccion4.md` - Proyectos complejos
- `/contenidos-curso/mod3leccion5.md` - Patrones de diseño

---

**Estado:** ✅ COMPLETADO - Test del Módulo 3 actualizado con preguntas reales basadas en contenido
