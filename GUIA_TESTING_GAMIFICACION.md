# Guía de Testing - Sistema de Gamificación Fase 1

**Fecha:** 4 de Noviembre de 2025
**Usuario de prueba:** `estudiante@institutosanmiguel.com` (María González)
**Contraseña:** (la que esté configurada en tu sistema)

---

## 🧪 Métodos de Testing

Hay **3 formas** de probar el sistema de gamificación:

1. **Frontend UI** - Probar desde la interfaz web (Recomendado)
2. **curl/Postman** - Probar endpoints directamente
3. **Script de Testing Automático** - Simular acciones programáticamente

---

## 1️⃣ Testing desde Frontend UI (Más Visual)

### Paso 1: Acceder a la Plataforma

1. Abre tu navegador en `http://localhost:5173`
2. Haz login con:
   - **Email:** `estudiante@institutosanmiguel.com`
   - **Contraseña:** (tu contraseña configurada)

### Paso 2: Navegar al Dashboard de Progreso

Una vez logueado, verás el sidebar del campus. Haz clic en:

```
📊 Aprendizaje
   └─ 📈 Mi Progreso
```

O navega directamente a: `http://localhost:5173/campus/mi-progreso`

### Paso 3: Verificar Datos Iniciales

Deberías ver:

- **Header con Nivel**: "🌱 Aprendiz - Nivel 1"
- **XP Total**: 0 XP
- **Barra de Progreso**: 0% al siguiente nivel
- **Estadísticas**:
  - Lecciones completadas: 0
  - Ejercicios completados: 0
  - Tests aprobados: 0
  - Racha actual: 0 días
- **Achievements**: "Aún no has desbloqueado ningún logro"
- **Próximos Logros**: 3 logros bloqueados en gris

### Paso 4: Simular Completar una Lección

**Opción A: Desde el UI (si tienes lecciones en el curso)**
1. Ve a "Mis Cursos"
2. Entra a una lección
3. Complétala (marca como completada)
4. Vuelve a "Mi Progreso"
5. Deberías ver **+50 XP**

**Opción B: Simular con curl (más rápido)**

```bash
# 1. Obtener tu token de autenticación
# (Lo obtienes al hacer login, o desde las DevTools del navegador)

# 2. Obtener el ID de una lección
cd /Users/cantico/PROGRAMACIÓN/instituto-san-miguel/backend
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function getLessons() {
  const lessons = await prisma.lesson.findMany({ take: 1 });
  console.log('Lesson ID:', lessons[0].id);
  await prisma.\$disconnect();
}
getLessons();
"

# 3. Llamar al endpoint (reemplaza TOKEN y LESSON_ID)
curl -X POST http://localhost:3001/api/gamification/lesson-complete \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"lessonId": "LESSON_ID_HERE"}'
```

### Paso 5: Verificar Cambios en el Dashboard

Refresca la página de "Mi Progreso" y verifica:

- ✅ **XP aumentó a 60** (50 lección + 10 racha)
- ✅ **Lecciones completadas: 1**
- ✅ **Racha actual: 1 día**
- ✅ **Barra de progreso**: ~12% al siguiente nivel
- ✅ **Achievement desbloqueado**: "🌟 🎬 Primer Paso" (+10 XP)

---

## 2️⃣ Testing con curl/Postman (Testing de API)

### Paso 1: Obtener Token de Autenticación

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "estudiante@institutosanmiguel.com",
    "password": "TU_CONTRASEÑA_AQUI"
  }'
```

**Respuesta esperada:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "cmgzn15bv0000ouivh8lxkfi5",
    "email": "estudiante@institutosanmiguel.com",
    "role": "STUDENT"
  }
}
```

**Copia el token** para los siguientes comandos.

---

### Paso 2: Obtener Dashboard Inicial

```bash
# Reemplaza YOUR_TOKEN con el token obtenido
TOKEN="YOUR_TOKEN_HERE"

curl -X GET http://localhost:3001/api/gamification/dashboard \
  -H "Authorization: Bearer $TOKEN"
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "progress": {
      "id": "...",
      "totalXP": 0,
      "currentLevel": 1,
      "currentStreak": 0,
      "longestStreak": 0,
      "totalLessonsCompleted": 0,
      "totalExercisesCompleted": 0,
      "totalTestsPassed": 0
    },
    "level": {
      "currentLevel": 1,
      "currentLevelName": "🌱 Aprendiz",
      "totalXP": 0,
      "progressToNextLevel": 0,
      "nextLevelName": "💻 Desarrollador Junior"
    },
    "achievements": {
      "unlocked": [],
      "total": 15,
      "unlockedCount": 0,
      "totalCount": 15
    }
  }
}
```

---

### Paso 3: Completar una Lección (Simular)

```bash
# Obtener ID de una lección primero
cd /Users/cantico/PROGRAMACIÓN/instituto-san-miguel/backend
LESSON_ID=$(node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function get() {
  const lesson = await prisma.lesson.findFirst();
  console.log(lesson.id);
  await prisma.\$disconnect();
}
get();
")

# Completar lección
curl -X POST http://localhost:3001/api/gamification/lesson-complete \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"lessonId\": \"$LESSON_ID\"}"
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "alreadyCompleted": false,
    "xpGained": 60,
    "leveledUp": false,
    "previousLevel": 1,
    "newLevel": 1,
    "reason": "Lección completada",
    "streak": {
      "streakContinued": false,
      "currentStreak": 1,
      "longestStreak": 1,
      "streakBonus": 10
    }
  },
  "message": "¡Lección completada! +60 XP"
}
```

---

### Paso 4: Completar un Ejercicio (Simular)

```bash
# Obtener ID de un ejercicio
EXERCISE_ID=$(node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function get() {
  const ex = await prisma.gameExercise.findFirst();
  console.log(ex?.id || 'FAKE_EXERCISE_ID');
  await prisma.\$disconnect();
}
get();
")

# Completar ejercicio con score 8/10
curl -X POST http://localhost:3001/api/gamification/exercise-complete \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"exerciseId\": \"$EXERCISE_ID\", \"score\": 8}"
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "xpGained": 40,
    "leveledUp": false,
    "reason": "Ejercicio completado"
  },
  "message": "¡Ejercicio completado! +40 XP"
}
```

---

### Paso 5: Aprobar un Test (Simular)

```bash
# Obtener ID de un test
TEST_ID=$(node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function get() {
  const test = await prisma.moduleTest.findFirst();
  console.log(test?.id || 'FAKE_TEST_ID');
  await prisma.\$disconnect();
}
get();
")

# Aprobar test con 10/10 (perfecto)
curl -X POST http://localhost:3001/api/gamification/test-pass \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"testId\": \"$TEST_ID\", \"score\": 10}"
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "xpGained": 150,
    "leveledUp": true,
    "previousLevel": 1,
    "newLevel": 2,
    "reason": "Test perfecto"
  },
  "message": "¡Test perfecto! +150 XP"
}
```

---

### Paso 6: Ver Dashboard Actualizado

```bash
curl -X GET http://localhost:3001/api/gamification/dashboard \
  -H "Authorization: Bearer $TOKEN"
```

**Deberías ver:**
```json
{
  "progress": {
    "totalXP": 250,
    "currentLevel": 2,
    "currentStreak": 1,
    "totalLessonsCompleted": 1,
    "totalExercisesCompleted": 1,
    "totalTestsPassed": 1
  },
  "level": {
    "currentLevel": 2,
    "currentLevelName": "💻 Desarrollador Junior",
    "totalXP": 250,
    "progressToNextLevel": 0
  },
  "achievements": {
    "unlockedCount": 3,
    "achievements": [
      "🌟 🎬 Primer Paso",
      "✅ 🎯 Primera Victoria",
      "⭐ 💯 Perfección"
    ]
  }
}
```

---

### Paso 7: Ver Leaderboard

```bash
curl -X GET http://localhost:3001/api/gamification/leaderboard \
  -H "Authorization: Bearer $TOKEN"
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "user": {
          "name": "María González",
          "avatar": null
        },
        "totalXP": 250,
        "level": 2,
        "levelName": "💻 Desarrollador Junior",
        "currentStreak": 1
      }
    ],
    "userRank": {
      "rank": 1,
      "totalXP": 250
    }
  }
}
```

---

## 3️⃣ Script de Testing Automático

He creado un script que simula un estudiante completando el curso completo:

```bash
cd /Users/cantico/PROGRAMACIÓN/instituto-san-miguel/backend
node test-gamification-complete.js
```

Este script:
1. ✅ Crea progreso para María González
2. ✅ Completa 5 lecciones (+250 XP)
3. ✅ Completa 3 ejercicios (+120 XP)
4. ✅ Aprueba 2 tests (+200 XP)
5. ✅ Simula 7 días de racha (+70 XP con multiplicador)
6. ✅ Desbloquea achievements automáticamente
7. ✅ Muestra progreso final

---

## 📊 Escenarios de Testing Completos

### Escenario 1: Estudiante Nuevo (0 XP)

```bash
# Dashboard inicial
curl -X GET http://localhost:3001/api/gamification/dashboard \
  -H "Authorization: Bearer $TOKEN"
```

**Esperado:**
- Nivel 1: 🌱 Aprendiz
- 0 XP
- 0 achievements
- Todo en ceros

---

### Escenario 2: Estudiante Activo (500-1500 XP)

```bash
# Simular 10 lecciones
for i in {1..10}; do
  curl -X POST http://localhost:3001/api/gamification/lesson-complete \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"lessonId\": \"lesson_$i\"}"
  sleep 1
done
```

**Esperado:**
- Nivel 2-3: 💻 Desarrollador Junior o ⚡ Desarrollador
- 500-600 XP (10 lecciones + rachas + achievements)
- 3-5 achievements desbloqueados

---

### Escenario 3: Estudiante Avanzado (3000+ XP)

Para alcanzar este nivel necesitas:
- ~54 lecciones completadas
- ~20 ejercicios
- ~9 tests aprobados

**Esperado:**
- Nivel 4-5: 🚀 Desarrollador Senior o 🎓 Experto
- 8-12 achievements desbloqueados
- Racha larga (14+ días)

---

### Escenario 4: Completación del Curso (5000+ XP)

**Esperado:**
- Nivel 6-7: 💎 Maestro Claude Code o 👑 Leyenda
- 13-15 achievements desbloqueados
- Achievement final: "💎 Maestro Claude Code" (+300 XP)

---

## 🐛 Troubleshooting

### Problema: "Token de autenticación no proporcionado"

**Solución:**
```bash
# Verifica que el token esté en el header
curl -X GET http://localhost:3001/api/gamification/dashboard \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -v  # Modo verbose para ver headers
```

---

### Problema: "Error al obtener el dashboard de gamificación"

**Solución:**
```bash
# Verifica que el servidor backend esté corriendo
curl http://localhost:3001/health

# Esperado: {"status":"ok","timestamp":"..."}
```

---

### Problema: "alreadyCompleted: true" al completar lección

**Solución:** Es correcto. Si intentas completar la misma lección 2 veces, no obtienes XP adicional.

```bash
# Para probar con lecciones diferentes, usa IDs distintos
curl -X POST http://localhost:3001/api/gamification/lesson-complete \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"lessonId": "OTRA_LECCION_ID"}'
```

---

### Problema: No se desbloquean achievements

**Solución:** Verifica los criterios:

```bash
cd /Users/cantico/PROGRAMACIÓN/instituto-san-miguel/backend
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function check() {
  const achievements = await prisma.achievement.findMany();
  achievements.forEach(a => {
    console.log(\`\${a.icon} \${a.name}\`);
    console.log(\`  Criterios: \${a.criteria}\`);
    console.log(\`  Puntos: \${a.points} XP\`);
    console.log('');
  });
  await prisma.\$disconnect();
}
check();
"
```

---

## ✅ Checklist de Testing

Marca cada item al completar el test:

### API Endpoints

- [ ] `GET /api/gamification/dashboard` - Dashboard completo
- [ ] `GET /api/gamification/progress` - Progreso y nivel
- [ ] `GET /api/gamification/achievements` - Achievements
- [ ] `POST /api/gamification/lesson-complete` - Completar lección
- [ ] `POST /api/gamification/exercise-complete` - Completar ejercicio
- [ ] `POST /api/gamification/test-pass` - Aprobar test
- [ ] `GET /api/gamification/leaderboard` - Ranking

### Funcionalidades

- [ ] Usuario nuevo empieza en Nivel 1 con 0 XP
- [ ] Completar lección otorga 50 XP
- [ ] Racha otorga +10 XP por día
- [ ] Multiplicador x1.5 a partir de 7 días de racha
- [ ] Test aprobado otorga 100 XP
- [ ] Test perfecto (10/10) otorga 150 XP
- [ ] Achievements se desbloquean automáticamente
- [ ] Subir de nivel actualiza `currentLevel`
- [ ] Leaderboard muestra ranking correcto
- [ ] Dashboard muestra toda la información

### Frontend UI

- [ ] Página `/campus/mi-progreso` carga correctamente
- [ ] Dashboard muestra nivel y XP
- [ ] Barra de progreso visual funciona
- [ ] Stats cards muestran números correctos
- [ ] Achievements recientes se listan
- [ ] Próximos logros aparecen en gris
- [ ] Loading spinner funciona
- [ ] Error state funciona si falla el API

---

## 🎯 Test Completo Paso a Paso (Recomendado)

### 1. Preparación (2 minutos)

```bash
# Verificar servidores corriendo
curl http://localhost:3001/health
curl http://localhost:5173

# Ambos deben responder 200 OK
```

### 2. Login y Obtener Token (1 minuto)

```bash
# Hacer login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "estudiante@institutosanmiguel.com",
    "password": "password123"
  }' | jq -r '.token'

# Copiar el token
export TOKEN="token_copiado_aqui"
```

### 3. Ver Estado Inicial (30 segundos)

```bash
curl -X GET http://localhost:3001/api/gamification/dashboard \
  -H "Authorization: Bearer $TOKEN" | jq
```

### 4. Simular Actividad (3 minutos)

```bash
# Completar 3 lecciones
cd /Users/cantico/PROGRAMACIÓN/instituto-san-miguel/backend

for i in 1 2 3; do
  LESSON_ID=$(node -e "
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    async function get() {
      const lessons = await prisma.lesson.findMany({ skip: $i, take: 1 });
      console.log(lessons[0]?.id || 'cmh7golqp0007grhvht5zaq8z');
      await prisma.\$disconnect();
    }
    get();
  ")

  echo "Completando lección $i..."
  curl -X POST http://localhost:3001/api/gamification/lesson-complete \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"lessonId\": \"$LESSON_ID\"}"

  sleep 1
done
```

### 5. Verificar Progreso (30 segundos)

```bash
curl -X GET http://localhost:3001/api/gamification/dashboard \
  -H "Authorization: Bearer $TOKEN" | jq '.data.progress'
```

### 6. Abrir Frontend y Verificar (1 minuto)

1. Abre `http://localhost:5173/campus/mi-progreso`
2. Verifica que veas:
   - XP: ~180 (3 lecciones × 50 + rachas + achievements)
   - Lecciones completadas: 3
   - Achievement "🎬 Primer Paso" desbloqueado

---

## 📝 Resultados Esperados

Al completar todos los tests, deberías tener:

- ✅ **7 endpoints funcionando** correctamente
- ✅ **Sistema de XP** otorgando puntos correctamente
- ✅ **Sistema de niveles** calculando correctamente
- ✅ **Achievements** desbloqueándose automáticamente
- ✅ **Rachas** funcionando con multiplicador
- ✅ **Dashboard frontend** mostrando toda la información
- ✅ **Leaderboard** rankando correctamente

---

**¿Listo para empezar?**

Comienza con el **Método 1 (Frontend UI)** para ver el sistema visualmente, o usa el **Método 2 (curl)** si prefieres testing de API directo.

¡Buena suerte! 🚀
