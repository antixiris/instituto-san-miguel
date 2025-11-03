<p><strong><em>Lección 1: Ideación y Definición de Tu Proyecto</em></strong></p>

## Introducción

Has completado 8 módulos de formación y el proyecto guiado TaskMaster Pro. En el Módulo 9 aplicarás todo lo aprendido en **tu propio proyecto personal**, desde la ideación hasta el deployment.

**Diferencia clave:**
- Módulo 8, Lección 5: Proyecto guiado (TaskMaster Pro)
- Módulo 9: Tu proyecto propio (tu idea, tu diseño, tu implementación)

Claude Code será tu asistente técnico, pero tú tomarás todas las decisiones de arquitectura y desarrollo.

## Objetivos de Esta Lección

Al finalizar esta lección, habrás logrado:

✅ Identificar y validar una idea de proyecto viable y motivante
✅ Definir el alcance (scope) realista de tu proyecto
✅ Crear un documento de especificación completo con ayuda de Claude Code
✅ Establecer criterios de éxito claros y medibles
✅ Tener un plan de acción inicial para comenzar tu desarrollo

## ¿En Qué Punto Estás?

Tómate un momento para reflexionar:

**Ya sabes:**
- Cómo usar Claude Code para generar código, debugging, testing
- Cómo estructurar proyectos profesionales
- Cómo trabajar con bases de datos, APIs, autenticación
- Cómo deployar aplicaciones

**Ahora necesitas:**
- Elegir QUÉ vas a construir
- Asegurarte de que es viable en el tiempo disponible
- Definir EXACTAMENTE qué features tendrá
- Planificar cómo lo desarrollarás con Claude Code

**Esta lección te guía en esas decisiones cruciales.**

## Actividad 1: Brainstorming de Ideas con Claude Code

**Tiempo estimado**: 1-2 horas

**Qué vas a hacer**: Generar ideas de proyectos y explorar diferentes opciones con ayuda de Claude Code.

**Cómo Claude Code te ayuda**: Claude Code es excelente para brainstorming. Puede analizar tus intereses, sugerir ideas, evaluar viabilidad y ayudarte a elegir.

### Paso 1.1: Identifica Tus Intereses y Habilidades

Antes de hablar con Claude Code, reflexiona sobre estas preguntas:

**Sobre tus intereses:**
- ¿Qué tipo de aplicaciones usas diariamente?
- ¿Qué problemas has enfrentado que podrían resolverse con software?
- ¿Qué industrias o áreas te apasionan? (finanzas, educación, salud, entretenimiento, etc.)

**Sobre tus habilidades:**
- ¿Prefieres frontend, backend o fullstack?
- ¿Te sientes cómodo con bases de datos?
- ¿Quieres explorar APIs de terceros?
- ¿Te interesa trabajar con IA/ML?

**Sobre tu tiempo disponible:**
- ¿Cuántas horas por semana puedes dedicar?
- ¿Cuánto tiempo tienes hasta completar el proyecto? (ideal: 4-6 semanas)

### Paso 1.2: Conversación de Brainstorming con Claude Code

Abre Claude Code en tu terminal y comienza esta conversación (adaptada a TUS respuestas):

**TÚ escribes:**
```
Hola Claude, estoy en el Módulo 9 del curso "Especialista en Desarrollo con Claude Code"
y necesito elegir mi proyecto final personal.

MIS INTERESES:
- Me gusta [tu interés 1]
- Me apasiona [tu interés 2]
- He notado que [problema que quieres resolver]

MIS HABILIDADES:
- Me siento fuerte en [tu fortaleza]
- Quiero mejorar en [área a desarrollar]
- He trabajado con [tecnologías que conoces]

MI TIEMPO DISPONIBLE:
- [X] horas por semana
- [X] semanas totales

¿Puedes ayudarme a generar 5 ideas de proyectos que:
1. Sean viables para mi nivel y tiempo
2. Me permitan demostrar lo que aprendí en el curso
3. Sean lo suficientemente interesantes para mantenerme motivado
4. Tengan aplicación práctica real

Para cada idea, explícame qué construiría y por qué podría ser buena opción.
```

**Claude Code responderá** con algo como:

```
¡Excelente iniciativa! Basándome en tus intereses y habilidades, aquí tienes
5 ideas de proyectos perfectamente adaptadas para ti:

IDEA 1: Sistema de Gestión Personal de Finanzas
==============================================
QUÉ CONSTRUIRÍAS:
- Aplicación para trackear gastos e ingresos
- Categorización automática de transacciones
- Dashboard con gráficos de gastos
- Alertas de presupuesto
- Reportes mensuales

POR QUÉ ES BUENA OPCIÓN:
✅ Problema real que muchos enfrentan
✅ Scope controlable (puedes empezar simple y agregar features)
✅ Involucra backend (API), frontend (dashboard), base de datos
✅ Puedes usar lo aprendido: autenticación, CRUD, estadísticas
✅ Útil para tu vida personal

TECNOLOGÍAS:
- Backend: Node.js + Express
- Base de datos: PostgreSQL
- Frontend: React o vanilla JS
- Charts: Chart.js

TIEMPO ESTIMADO: 4-5 semanas

---

IDEA 2: Plataforma de Recetas y Planificación de Comidas
=========================================================
QUÉ CONSTRUIRÍAS:
- CRUD de recetas con ingredientes
- Sistema de planificación semanal de comidas
- Generador automático de lista de compras
- Búsqueda y filtros (por ingredientes, tiempo de preparación, dieta)
- Sistema de favoritos

POR QUÉ ES BUENA OPCIÓN:
✅ Combina varias entidades (recetas, ingredientes, planes)
✅ Permite explorar relaciones de base de datos
✅ Features interesantes: búsqueda, filtros, generación automática
✅ Visualmente atractivo
✅ Proyecto para mostrar en portfolio

TECNOLOGÍAS:
- Backend: Node.js + Express
- Base de datos: PostgreSQL
- API para imágenes: Cloudinary
- Frontend: React

TIEMPO ESTIMADO: 5-6 semanas

---

IDEA 3: Sistema de Reservas para Pequeño Negocio
=================================================
QUÉ CONSTRUIRÍAS:
- Sistema de reservas (citas/turnos)
- Calendario de disponibilidad
- Confirmaciones automáticas por email
- Panel de administración
- Vista pública para clientes

POR QUÉ ES BUENA OPCIÓN:
✅ Aplicación real con valor comercial
✅ Lógica interesante (manejo de horarios, conflictos)
✅ Integración con servicios externos (email)
✅ Dos tipos de usuarios (admin, cliente)
✅ Puedes adaptarlo a diferentes industrias

TECNOLOGÍAS:
- Backend: Node.js + Express
- Base de datos: PostgreSQL
- Email: Nodemailer
- Frontend: React o EJS templates

TIEMPO ESTIMADO: 4-5 semanas

---

IDEA 4: API de Gestión de Biblioteca Personal
==============================================
QUÉ CONSTRUIRÍAS:
- Sistema para trackear libros leídos
- Rating y reseñas personales
- Listas de lectura (wish list, leyendo, terminados)
- Estadísticas de lectura
- Integración con API de libros (Google Books API)
- Recomendaciones basadas en géneros

POR QUÉ ES BUENA OPCIÓN:
✅ Enfocado en backend y API design
✅ Integración con API externa
✅ Features de estadísticas y analytics
✅ Base de datos con relaciones interesantes
✅ Escalable (puedes agregar social features después)

TECNOLOGÍAS:
- Backend: Node.js + Express
- Base de datos: PostgreSQL
- API externa: Google Books API
- Documentación: Swagger

TIEMPO ESTIMADO: 4 semanas

---

IDEA 5: Dashboard de Productividad Personal
============================================
QUÉ CONSTRUIRÍAS:
- Sistema de tareas con Pomodoro timer
- Tracking de hábitos diarios
- Diario/journal con entradas
- Dashboard con métricas de productividad
- Sistema de metas y seguimiento de progreso

POR QUÉ ES BUENA OPCIÓN:
✅ Múltiples módulos integrados
✅ Features avanzadas: timers, tracking, analytics
✅ Combina diferentes tipos de datos
✅ Muy útil personalmente
✅ Visualmente atractivo con charts

TECNOLOGÍAS:
- Backend: Node.js + Express
- Base de datos: PostgreSQL
- Frontend: React
- Charts: Chart.js
- Notificaciones: Web Push

TIEMPO ESTIMADO: 5-6 semanas

---

ANÁLISIS COMPARATIVO:
====================

COMPLEJIDAD:
Más simple: Ideas 1 y 4
Media: Ideas 2 y 3
Más compleja: Idea 5

VALOR PRÁCTICO:
Ideas 1, 3 y 5 tienen aplicación inmediata

IMPACTO EN PORTFOLIO:
Ideas 2, 3 y 5 son más visuales e impresionantes

OPORTUNIDAD DE APRENDIZAJE:
Ideas 2 y 5 tienen mayor variedad de features

¿Cuál de estas ideas te llama más la atención? ¿O quieres que exploremos
una dirección diferente basada en algo específico que tengas en mente?
```

### Paso 1.3: Explora Más Ideas Si Es Necesario

Si ninguna de esas ideas te entusiasma completamente, continúa la conversación:

**TÚ:**
```
Gracias Claude. La idea [X] me interesa, pero me gustaría algo más relacionado
con [tu interés específico]. ¿Puedes darme variaciones de esa idea o algo
completamente diferente en esa dirección?
```

**O si tienes tu propia idea:**
```
Claude, tengo mi propia idea: [describe tu idea].
¿Puedes ayudarme a evaluarla? Necesito saber:
1. ¿Es viable para 4-6 semanas de desarrollo?
2. ¿Qué tecnologías necesitaría?
3. ¿Qué desafíos técnicos podría enfrentar?
4. ¿Cómo podría simplificarla si es muy compleja?
```

### Checklist de Completitud - Actividad 1:

- [ ] He reflexionado sobre mis intereses y habilidades
- [ ] He conversado con Claude Code sobre ideas de proyectos
- [ ] Tengo al menos 3-5 ideas posibles en mente
- [ ] Entiendo qué construiría en cada idea
- [ ] Sé aproximadamente cuánto tiempo tomaría cada una

## 10+ Ejemplos de Proyectos Exitosos

Para inspirarte, aquí hay ejemplos de proyectos que otros alumnos han completado exitosamente:

### Proyectos de Gestión y Productividad

1. **TaskFlow Pro**: Sistema de gestión de tareas con kanban board, etiquetas, prioridades y estadísticas
2. **StudyMate**: Plataforma para estudiantes con calendario de estudio, flashcards, tracking de progreso
3. **HabitTracker Plus**: App de seguimiento de hábitos con streaks, recordatorios y analytics

### Proyectos de E-commerce y Negocios

4. **MiniShop**: E-commerce básico con carrito, checkout, gestión de inventario
5. **BookingSystem**: Sistema de reservas para servicios (salones, consultorios, etc.)
6. **InvoiceGenerator**: Generador de facturas y cotizaciones con PDF export

### Proyectos de Contenido y Social

7. **MyBlog CMS**: Sistema de blog con editor Markdown, categorías, comentarios
8. **RecipeBox**: Colección de recetas con búsqueda, filtros, planificador de comidas
9. **FitJournal**: Diario de ejercicios con tracking de workouts y progreso

### Proyectos de APIs y Data

10. **WeatherDashboard**: Dashboard que consume Weather API con historial y predicciones
11. **CryptoTracker**: Monitor de criptomonedas con alertas de precio y gráficos
12. **NewsAggregator**: Agregador de noticias con múltiples fuentes y personalización

### Proyectos Creativos

13. **PortfolioBuilder**: Generador de portfolios personales con templates
14. **QuizMaster**: Plataforma de quizzes con timer, scores, leaderboards
15. **LinkShortener**: Acortador de URLs con analytics de clicks

**Todos estos proyectos son viables en 4-6 semanas y demuestran dominio de Claude Code.**

## Actividad 2: Validar y Elegir Tu Proyecto

**Tiempo estimado**: 1 hora

**Qué vas a hacer**: Evaluar las ideas y elegir la mejor para TI usando una matriz de decisión.

**Cómo Claude Code te ayuda**: Te ayudará a analizar objetivamente cada opción.

### Paso 2.1: Matriz de Evaluación

Usa esta matriz para evaluar cada idea (puntúa del 1 al 5):

| Criterio | Idea 1 | Idea 2 | Idea 3 |
|----------|--------|--------|--------|
| **Interés personal** (¿me emociona?) | | | |
| **Viabilidad técnica** (¿puedo hacerlo?) | | | |
| **Tiempo realista** (¿cabe en mi calendario?) | | | |
| **Utilidad práctica** (¿lo usaré/servirá?) | | | |
| **Valor de portfolio** (¿impresiona?) | | | |
| **Oportunidad de aprendizaje** (¿aprenderé cosas nuevas?) | | | |
| **TOTAL** | | | |

### Paso 2.2: Validación con Claude Code

**TÚ:**
```
Claude, he evaluado mis ideas y estas son mis top 3:

1. [Idea 1]: Puntuación total [X]
2. [Idea 2]: Puntuación total [X]
3. [Idea 3]: Puntuación total [X]

Me inclino más por [la idea con mayor puntuación], pero tengo dudas sobre:
- [Duda 1]
- [Duda 2]

¿Puedes ayudarme a validar si esta idea es la mejor elección considerando que:
- Tengo [X] semanas
- Mi nivel técnico es [nivel]
- Quiero que sea [objetivo: útil/impresionante/educativo]

Si ves algún red flag, dímelo honestamente.
```

**Claude Code** te dará un análisis honesto y te alertará de posibles problemas.

### Paso 2.3: El Test de la Pasión

Antes de decidir, hazte estas preguntas:

1. **¿Me imagino trabajando en esto todos los días durante 4-6 semanas?**
   - Si la respuesta es "no", reconsidera

2. **¿Estaría orgulloso de mostrar esto a amigos, familia, empleadores?**
   - Tu proyecto será parte de tu portfolio

3. **¿Me frustraré si encuentro problemas técnicos o seguiré motivado?**
   - Los proyectos complejos tienen obstáculos

4. **¿Usaría esta aplicación yo mismo o la recomendaría a otros?**
   - Los mejores proyectos resuelven problemas reales

**Si respondiste "sí" a las 4 preguntas, ¡tienes tu proyecto!**

### Checklist de Completitud - Actividad 2:

- [ ] He evaluado mis ideas con la matriz de decisión
- [ ] He validado mi elección con Claude Code
- [ ] Pasé el test de la pasión con mi idea elegida
- [ ] Estoy seguro y emocionado por mi elección

## Actividad 3: Definir el Scope de Tu Proyecto

**Tiempo estimado**: 2 horas

**Qué vas a hacer**: Definir EXACTAMENTE qué construirás, con qué features, y qué quedará fuera.

**Cómo Claude Code te ayuda**: Te ayudará a dividir tu proyecto en features esenciales y opcionales.

### Paso 3.1: Features Esenciales vs Opcionales

**La clave del éxito: NO intentar hacer TODO.**

Usa el método MoSCoW con Claude Code:

**TÚ:**
```
Claude, mi proyecto elegido es: [nombre y descripción breve]

Ayúdame a definir el scope usando el método MoSCoW:

MUST HAVE (Obligatorio - sin esto no funciona):
- ¿Qué features son absolutamente esenciales?

SHOULD HAVE (Importante - mejora la experiencia):
- ¿Qué features son muy valiosas pero no críticas?

COULD HAVE (Nice to have - si hay tiempo):
- ¿Qué features serían geniales pero no urgentes?

WON'T HAVE (Fuera de scope - para versión 2.0):
- ¿Qué ideas debo dejar para el futuro?

Recuerda que tengo [X] semanas. Sé realista y conservador.
```

**Claude Code** te dará una lista priorizada. Por ejemplo:

```
Proyecto: Sistema de Gestión Personal de Finanzas

MUST HAVE (Esenciales - Semanas 1-3):
===================================
✅ Autenticación (registro, login, JWT)
✅ CRUD de transacciones (ingreso/gasto)
✅ Categorías predefinidas
✅ Vista de lista de transacciones
✅ Balance actual
✅ Base de datos funcional
✅ API REST básica

SHOULD HAVE (Importantes - Semana 4):
====================================
⭐ Dashboard con gráficos básicos (gastos por categoría)
⭐ Filtros por fecha y categoría
⭐ Estadísticas mensuales
⭐ Export a CSV

COULD HAVE (Opcionales - Semana 5-6 si hay tiempo):
===================================================
💡 Presupuestos mensuales
💡 Alertas de gastos
💡 Gráficos avanzados de tendencias
💡 Múltiples cuentas bancarias
💡 Frontend con React

WON'T HAVE (Versión 2.0 - Fuera de scope):
==========================================
❌ Aplicación móvil
❌ Sincronización automática con bancos
❌ Machine learning para predicciones
❌ Multi-usuario con compartir finanzas
❌ Integración con APIs de inversiones
```

### Paso 3.2: Regla de Oro del Scope

**EMPIEZA PEQUEÑO. EXPANDE SI HAY TIEMPO.**

Es MUCHO mejor tener:
- ✅ Un proyecto pequeño pero COMPLETO y PULIDO
- Que un proyecto grande pero INCOMPLETO y CON BUGS

**Claude Code te recordará esto si te estás sobrepasando.**

### Paso 3.3: Definir User Stories

Con Claude Code, convierte tus features en user stories:

**TÚ:**
```
Claude, ayúdame a escribir user stories para los MUST HAVE de mi proyecto.
Usa el formato: "Como [tipo de usuario], quiero [acción] para [beneficio]"
```

**Ejemplo de respuesta:**

```
USER STORIES - Sistema de Gestión de Finanzas

1. Como usuario nuevo, quiero registrarme con email y contraseña para tener mi cuenta personal
2. Como usuario registrado, quiero hacer login para acceder a mis datos
3. Como usuario autenticado, quiero agregar una transacción de gasto para trackear en qué gasto dinero
4. Como usuario autenticado, quiero agregar una transacción de ingreso para saber cuánto dinero recibo
5. Como usuario autenticado, quiero ver una lista de todas mis transacciones para revisar mi historial
6. Como usuario autenticado, quiero ver mi balance actual para saber cuánto dinero tengo
7. Como usuario autenticado, quiero categorizar mis transacciones para organizar mis finanzas
8. Como usuario autenticado, quiero editar una transacción para corregir errores
9. Como usuario autenticado, quiero eliminar una transacción para quitar registros incorrectos
10. Como usuario autenticado, quiero cerrar sesión para proteger mi información
```

### Checklist de Completitud - Actividad 3:

- [ ] Definí features MUST HAVE (esenciales)
- [ ] Definí features SHOULD HAVE (importantes)
- [ ] Definí features COULD HAVE (opcionales)
- [ ] Definí features WON'T HAVE (fuera de scope)
- [ ] Escribí user stories para MUST HAVE
- [ ] Mi scope es realista para mi tiempo disponible

## Actividad 4: Crear Tu Documento de Especificación

**Tiempo estimado**: 2 horas

**Qué vas a hacer**: Crear un documento completo que defina tu proyecto de principio a fin.

**Cómo Claude Code te ayuda**: Generará la estructura y te ayudará a completar cada sección.

### Paso 4.1: Generar Template de Especificación

**TÚ:**
```
Claude, ayúdame a crear un documento de especificación completo para mi proyecto.

PROYECTO: [Nombre]
DESCRIPCIÓN: [Descripción breve]

Genera un template en Markdown con estas secciones:
1. Resumen del Proyecto
2. Objetivos y Motivación
3. Usuarios Objetivo
4. Funcionalidades (divididas por MoSCoW)
5. Stack Tecnológico
6. Esquema de Base de Datos
7. Arquitectura del Sistema
8. Plan de Desarrollo por Fases
9. Criterios de Éxito
10. Riesgos y Mitigaciones

Llena las secciones que puedas inferir de mi descripción, y déjame placeholders
para lo que necesito decidir.
```

### Paso 4.2: Template de Especificación (Ejemplo)

Claude Code generará algo como esto (adapta a TU proyecto):

```markdown
# Especificación del Proyecto: FinanzasPro

## 1. Resumen del Proyecto

**FinanzasPro** es una aplicación web de gestión personal de finanzas que permite
a usuarios individuales trackear sus ingresos y gastos, categorizarlos, y visualizar
su salud financiera a través de dashboards y estadísticas.

**Problema que resuelve:**
Muchas personas no tienen visibilidad clara de a dónde va su dinero cada mes.
Las apps existentes son complejas o de pago. FinanzasPro ofrece una solución
simple, gratuita y enfocada en lo esencial.

**Valor único:**
- Interfaz simple y directa
- Enfoque en categorización inteligente
- Dashboard visual claro
- Gratis y de código abierto

## 2. Objetivos y Motivación

### Objetivos del Proyecto:
✅ Crear una aplicación full-stack funcional y deployada
✅ Demostrar dominio de Node.js, Express, PostgreSQL
✅ Implementar autenticación segura con JWT
✅ Crear API REST bien documentada
✅ Aplicar testing completo (>80% coverage)
✅ Tener un proyecto destacable para mi portfolio

### Motivación Personal:
Quiero tener control de mis finanzas personales y aprender a construir aplicaciones
con datos financieros que luego pueda aplicar a proyectos profesionales.

## 3. Usuarios Objetivo

**Usuario Principal:**
Persona entre 20-40 años que quiere control básico de sus finanzas personales sin
complejidad. No necesita features avanzadas de inversiones, solo tracking simple.

**Casos de Uso Típicos:**
- Registrar gastos diarios del supermercado, transporte, restaurantes
- Ver cuánto gasté este mes en cada categoría
- Saber si estoy gastando más de lo que gano
- Revisar historial de transacciones pasadas

## 4. Funcionalidades

### MUST HAVE (Versión 1.0 - 3 semanas)

**Autenticación:**
- Registro de usuarios con email y contraseña
- Login con JWT
- Logout
- Validación de inputs

**Gestión de Transacciones:**
- Crear transacción (tipo: ingreso/gasto, monto, categoría, descripción, fecha)
- Listar todas las transacciones del usuario
- Editar transacción
- Eliminar transacción
- Ver balance actual (suma de ingresos - suma de gastos)

**Categorías:**
- Categorías predefinidas (Alimentación, Transporte, Salud, Entretenimiento, etc.)
- Asignar categoría a cada transacción

**Base de Datos:**
- Persistencia en PostgreSQL
- Relaciones correctas entre usuarios y transacciones

### SHOULD HAVE (Versión 1.5 - Semana 4)

**Dashboard Básico:**
- Gráfico de gastos por categoría (pie chart)
- Estadísticas del mes actual (total ingresos, gastos, balance)
- Comparativa mes actual vs anterior

**Filtros y Búsqueda:**
- Filtrar transacciones por fecha (rango)
- Filtrar por categoría
- Filtrar por tipo (ingreso/gasto)

**Export:**
- Exportar transacciones a CSV

### COULD HAVE (Si hay tiempo - Semanas 5-6)

- Presupuestos mensuales por categoría con alertas
- Gráficos de tendencias en el tiempo
- Múltiples cuentas (efectivo, banco, tarjeta)
- Transacciones recurrentes
- Frontend con React

### WON'T HAVE (Versión 2.0)

- Aplicación móvil nativa
- Sincronización con bancos
- Machine Learning
- Multi-usuario
- Criptomonedas/inversiones

## 5. Stack Tecnológico

### Backend:
- **Runtime:** Node.js 18+
- **Framework:** Express 4.x
- **Base de Datos:** PostgreSQL 15
- **ORM/Query:** pg (raw queries)

### Autenticación:
- **JWT:** jsonwebtoken
- **Hashing:** bcrypt

### Validación:
- **Joi** para validación de inputs

### Logging:
- **Winston** con daily rotate

### Testing:
- **Jest** (unit tests)
- **Supertest** (integration tests)

### Documentación:
- **Swagger/OpenAPI** para documentar API

### Deployment:
- **Heroku** o **Railway** (backend + DB)

### Extras:
- **Helmet** (seguridad)
- **CORS**
- **Express Rate Limit**
- **Dotenv**

## 6. Esquema de Base de Datos

```sql
-- Tabla users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla categories (predefinidas)
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  type VARCHAR(20) NOT NULL, -- 'expense' o 'income'
  color VARCHAR(7),
  icon VARCHAR(50)
);

-- Tabla transactions
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id),
  type VARCHAR(20) NOT NULL, -- 'income' o 'expense'
  amount DECIMAL(12, 2) NOT NULL,
  description TEXT,
  transaction_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT amount_positive CHECK (amount > 0)
);

-- Índices para performance
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_transactions_category ON transactions(category_id);
```

**Relaciones:**
- Un usuario tiene muchas transacciones (1:N)
- Una transacción pertenece a un usuario
- Una transacción tiene una categoría
- Las categorías son compartidas (predefinidas en seed data)

## 7. Arquitectura del Sistema

**Patrón:** MVC + Services

```
src/
├── config/
│   ├── database.js          # Conexión PostgreSQL
│   └── swagger.js            # Config Swagger
├── models/
│   ├── User.js               # Modelo Usuario
│   ├── Transaction.js        # Modelo Transacción
│   └── Category.js           # Modelo Categoría
├── services/
│   ├── authService.js        # Lógica de autenticación
│   ├── transactionService.js # Lógica de transacciones
│   └── statsService.js       # Lógica de estadísticas
├── controllers/
│   ├── authController.js     # Controlador de auth
│   ├── transactionController.js
│   └── statsController.js
├── routes/
│   ├── auth.routes.js
│   ├── transaction.routes.js
│   └── stats.routes.js
├── middleware/
│   ├── auth.middleware.js    # Verificación JWT
│   ├── validation.middleware.js
│   └── error.middleware.js
├── utils/
│   ├── logger.js             # Winston config
│   └── response.js           # Helpers de respuesta
├── app.js                     # Express app
└── server.js                  # Entry point
```

**Flujo de Request:**
```
Client → Route → Middleware (auth, validation) → Controller → Service → Model → Database
```

## 8. Plan de Desarrollo por Fases

### FASE 1: Setup (3 días)
- [ ] Inicializar proyecto Node.js
- [ ] Configurar estructura de carpetas
- [ ] Instalar dependencias
- [ ] Configurar PostgreSQL
- [ ] Crear esquema de BD
- [ ] Setup Git y primer commit

### FASE 2: Autenticación (4 días)
- [ ] Modelo de User
- [ ] Service de autenticación
- [ ] Controller de auth
- [ ] Routes de auth
- [ ] Middleware de autenticación
- [ ] Validación de inputs
- [ ] Testing de auth

### FASE 3: Gestión de Transacciones (7 días)
- [ ] Modelo de Transaction
- [ ] Modelo de Category
- [ ] Seed de categorías predefinidas
- [ ] Service de transacciones (CRUD)
- [ ] Controller de transacciones
- [ ] Routes de transacciones
- [ ] Validaciones
- [ ] Testing

### FASE 4: Estadísticas y Dashboard (4 días)
- [ ] Service de estadísticas
- [ ] Cálculo de balance
- [ ] Agregaciones por categoría
- [ ] Controller de stats
- [ ] Routes de stats
- [ ] Testing

### FASE 5: Filtros y Búsqueda (3 días)
- [ ] Implementar filtros en service
- [ ] Queries con WHERE dinámico
- [ ] Paginación
- [ ] Testing

### FASE 6: Documentación (2 días)
- [ ] Configurar Swagger
- [ ] Documentar todos los endpoints
- [ ] Crear README completo
- [ ] Documentación de arquitectura

### FASE 7: Testing Completo (3 días)
- [ ] Tests unitarios de services
- [ ] Tests de integración de routes
- [ ] Coverage >80%
- [ ] Fix de bugs encontrados

### FASE 8: Polish y Optimización (3 días)
- [ ] Logging completo
- [ ] Manejo de errores robusto
- [ ] Optimizaciones de queries
- [ ] Validaciones finales

### FASE 9: Deploy (2 días)
- [ ] Configurar Heroku/Railway
- [ ] Variables de entorno en producción
- [ ] Migrar base de datos
- [ ] Deploy y testing en producción

### FASE 10: Presentación (2 días)
- [ ] Crear video demo
- [ ] Documentación de usuario
- [ ] Reflexión final
- [ ] Preparar presentación

**TOTAL: ~33 días (5 semanas trabajando 5-6 horas/día)**

## 9. Criterios de Éxito

### Técnicos:
✅ Aplicación funciona sin errores críticos
✅ Todos los MUST HAVE implementados y funcionando
✅ API REST completa y documentada con Swagger
✅ Autenticación segura implementada correctamente
✅ Base de datos con datos persistentes
✅ Tests con coverage >80%
✅ Código limpio y bien estructurado
✅ Deploy exitoso y aplicación accesible online

### Funcionales:
✅ Usuario puede registrarse y hacer login
✅ Usuario puede crear, ver, editar y eliminar transacciones
✅ Balance se calcula correctamente
✅ Filtros funcionan correctamente
✅ Dashboard muestra estadísticas correctas

### Personales:
✅ Aprendí nuevas técnicas y tecnologías
✅ Puedo explicar cada parte del código
✅ Estoy orgulloso del resultado
✅ Lo incluiría en mi portfolio

## 10. Riesgos y Mitigaciones

### Riesgo 1: Quedarme sin tiempo
**Probabilidad:** Media
**Impacto:** Alto
**Mitigación:**
- Priorización estricta (MUST HAVE primero)
- Checkpoints semanales de progreso
- Disposición a eliminar SHOULD HAVE si es necesario

### Riesgo 2: Bugs complejos en cálculos financieros
**Probabilidad:** Media
**Impacto:** Alto
**Mitigación:**
- Testing exhaustivo de cálculos
- Validación de datos en múltiples niveles
- Usar Decimal/Numeric en BD para precisión

### Riesgo 3: Problemas de deployment
**Probabilidad:** Media
**Impacto:** Medio
**Mitigación:**
- Deployar temprano (no esperar al final)
- Seguir guías oficiales de Heroku/Railway
- Pedir ayuda a Claude Code ante errores

### Riesgo 4: Scope creep (agregar features no planificadas)
**Probabilidad:** Alta
**Impacto:** Alto
**Mitigación:**
- Referirme constantemente a este documento
- Recordar: mejor proyecto pequeño completo que grande incompleto
- Guardar ideas nuevas para versión 2.0

### Riesgo 5: Bloqueo técnico en feature específica
**Probabilidad:** Media
**Impacto:** Medio
**Mitigación:**
- Usar Claude Code para debugging y ayuda
- Buscar documentación oficial
- Simplificar la feature si es muy compleja
```

### Paso 4.3: Guardar Tu Especificación

Crea un archivo `PROJECT_SPEC.md` en la raíz de tu proyecto (lo crearás en la próxima lección).

Por ahora, guárdalo en un lugar seguro. **Este documento es tu BIBLIA del proyecto.**

### Checklist de Completitud - Actividad 4:

- [ ] Creé mi documento de especificación completo
- [ ] Definí objetivos claros
- [ ] Especifiqué mi stack tecnológico
- [ ] Diseñé mi esquema de base de datos
- [ ] Creé un plan de desarrollo por fases
- [ ] Definí criterios de éxito
- [ ] Identifiqué riesgos y mitigaciones

## Checkpoint: Autoevaluación

Antes de pasar a la siguiente lección, verifica:

**Sobre tu idea:**
- [ ] Tengo una idea de proyecto clara y definida
- [ ] Estoy emocionado y motivado por mi proyecto
- [ ] La idea es viable para mi tiempo y nivel

**Sobre el scope:**
- [ ] Sé exactamente qué features son MUST HAVE
- [ ] Sé qué features son opcionales
- [ ] Mi scope es realista y alcanzable

**Sobre la especificación:**
- [ ] Tengo un documento completo de especificación
- [ ] Sé qué tecnologías usaré
- [ ] Tengo un esquema de base de datos definido
- [ ] Tengo un plan de desarrollo por fases

**Sobre mi preparación:**
- [ ] Sé cómo Claude Code me ayudará en cada fase
- [ ] Tengo claro mis criterios de éxito
- [ ] Identifiqué riesgos potenciales

**Si marcaste TODAS las casillas, estás listo para la Lección 2.**

## Problemas Comunes en Esta Fase

### Problema 1: "Tengo demasiadas ideas y no puedo elegir"

**Solución:**
- Usa la matriz de evaluación objetivamente
- Pregunta a Claude Code: "¿Cuál de estas 3 ideas tiene mejor costo-beneficio?"
- Establece un deadline para decidir

### Problema 2: "Mi idea es demasiado compleja"

**Solución:**
- Pregunta a Claude Code: "Ayúdame a simplificar este proyecto a su MVP mínimo"
- Aplica la regla 80/20: ¿qué 20% de features da el 80% del valor?
- Divide en versiones: 1.0 (ahora), 2.0 (futuro)

### Problema 3: "Mi idea es demasiado simple"

**Solución:**
- Agrega features de SHOULD HAVE a MUST HAVE
- Enfócate en calidad: tests exhaustivos, documentación completa
- Agrega integraciones: APIs externas, email, notificaciones

### Problema 4: "No sé si podré hacerlo técnicamente"

**Solución:**
- Consulta con Claude Code sobre dudas técnicas específicas
- Revisa el proyecto TaskMaster Pro como referencia
- Empieza con lo que sabes, aprende lo nuevo sobre la marcha

### Problema 5: "Quiero hacer todo perfecto desde el inicio"

**Solución:**
- La especificación no tiene que ser perfecta (80% es suficiente)
- Es mejor empezar y adaptar que planificar indefinidamente
- Límite de tiempo para esta lección: máximo 1-2 días

## Recursos y Referencias

### Para Inspiración:
- **Product Hunt**: Ideas de productos exitosos
- **GitHub Trending**: Proyectos populares open source
- **Indie Hackers**: Proyectos de desarrolladores individuales

### Para Validación:
- **Tech Stack Decisions**: Stack Overflow Trends, npm trends
- **Database Design**: dbdiagram.io para diseñar esquemas visuales

### Templates Útiles:
- **User Story Mapping**: Miro, Mural
- **Project Management**: Notion, Trello (para trackear tu progreso)

## Preparación para la Siguiente Lección

Para estar listo para **Lección 2: Planificación y Arquitectura**:

### Debes tener:
✅ Tu proyecto elegido definitivamente
✅ Documento de especificación completo
✅ Lista de features priorizadas (MoSCoW)
✅ Esquema de base de datos definido
✅ Motivación y emoción por empezar

### Próximos pasos (Lección 2):
En la siguiente lección trabajarás con Claude Code para:
- Diseñar la arquitectura técnica detallada
- Elegir tecnologías específicas y versiones
- Crear un plan de desarrollo granular
- Diseñar la API REST completa
- Crear diagramas técnicos

## Conversaciones Finales con Claude Code para Esta Lección

### Para Validar Tu Especificación:

**TÚ:**
```
Claude, he completado mi especificación de proyecto. ¿Puedes revisarla y decirme:

1. ¿Hay algo crítico que esté olvidando?
2. ¿El scope parece realista para [X] semanas?
3. ¿El stack tecnológico tiene sentido para este proyecto?
4. ¿Ves algún red flag o problema potencial?
5. ¿Qué me recomendarías ajustar antes de empezar?

[Pega tu especificación completa]
```

### Para Generar Entusiasmo:

**TÚ:**
```
Claude, estoy a punto de empezar mi proyecto personal: [nombre del proyecto].
Dame un mensaje motivacional y recuérdame por qué este proyecto es importante
para mi carrera como desarrollador.
```

**Claude Code** te dará el impulso que necesitas para comenzar con confianza.

## Reflexión Final de la Lección

Tómate 10 minutos para reflexionar por escrito:

**¿Qué aprendí en esta lección?**
- [Tu respuesta]

**¿Cómo me siento sobre mi proyecto elegido?**
- [Tu respuesta]

**¿Qué es lo que más me emociona de este proyecto?**
- [Tu respuesta]

**¿Qué es lo que más me preocupa?**
- [Tu respuesta]

**¿Cómo planeo usar Claude Code en este proyecto?**
- [Tu respuesta]

**Mi compromiso para este proyecto:**
- [Tu respuesta]

---

## Resumen

Has completado la definición de tu proyecto con:
- Idea clara y validada
- Scope definido y realista (MUST HAVE/SHOULD HAVE/COULD HAVE/WON'T HAVE)
- Especificación completa
- Plan de acción

En la Lección 2 diseñarás la arquitectura técnica, API REST y esquema de base de datos.

---

**Módulo 9 - Lección 1 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
