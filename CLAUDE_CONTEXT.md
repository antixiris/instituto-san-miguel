# CLAUDE CONTEXT - Instituto San Miguel

## 📋 Información del Proyecto

**Nombre:** Instituto San Miguel - Plataforma E-Learning
**Propósito:** Plataforma educativa especializada en Computación basada en IA y Procesamiento del Lenguaje Natural (PLN)
**Concepto:** Sistema completo de gestión de aprendizaje (LMS) con diseño minimalista inspirado en Claude AI y Medium
**Estado Actual:** Desarrollo activo - Sistema base completado con módulos Campus y Notebook funcionales

---

## 🎯 Finalidad del Proyecto

El Instituto San Miguel es una plataforma educativa de especialización profesional diseñada para:

1. **Campus Virtual:** Ofrecer programas formativos de nivel experto en IA y PLN
2. **Notebook de Investigación:** Publicar y compartir artículos científicos, papers y conferencias
3. **Soluciones Empresariales:** Servicios de consultoría y desarrollo en IA/PLN

### Público Objetivo
- Estudiantes de especialización profesional
- Investigadores en IA y PLN
- Empresas buscando soluciones de IA

---

## 🏗️ Arquitectura de la Aplicación

```
instituto-san-miguel/
├── backend/                 # API REST con Express + TypeScript
│   ├── src/
│   │   ├── controllers/    # Lógica de negocio
│   │   │   ├── auth.controller.ts
│   │   │   ├── courses.controller.ts
│   │   │   └── articles.controller.ts
│   │   ├── routes/         # Definición de endpoints
│   │   ├── middleware/     # Autenticación JWT, validaciones
│   │   ├── store/          # Zustand stores (tema)
│   │   └── index.ts        # Punto de entrada
│   ├── prisma/
│   │   ├── schema.prisma   # Modelos de base de datos
│   │   ├── migrations/     # Migraciones de BD
│   │   └── seed-articles.ts # Datos de prueba para Notebook
│   └── package.json
│
└── frontend/               # SPA con React + TypeScript + Vite
    ├── src/
    │   ├── components/     # Componentes reutilizables
    │   │   ├── ui/        # Sistema de diseño
    │   │   └── Navbar.tsx  # Navegación con logo San Miguel
    │   ├── pages/
    │   │   ├── public/    # Páginas públicas
    │   │   │   ├── HomePage.tsx
    │   │   │   ├── NotebookPage.tsx      # Blog de investigación
    │   │   │   └── ArticleDetailPage.tsx # Vista de artículo
    │   │   └── campus/    # Área autenticada
    │   ├── services/      # API clients
    │   │   ├── auth.service.ts
    │   │   ├── courses.service.ts
    │   │   └── articles.service.ts
    │   ├── store/         # Zustand state management
    │   │   ├── authStore.ts
    │   │   └── themeStore.ts
    │   └── App.tsx
    └── package.json
```

---

## 🛠️ Stack Tecnológico

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Lenguaje:** TypeScript
- **ORM:** Prisma
- **Base de Datos:** PostgreSQL
- **Autenticación:** JWT + bcrypt
- **Puerto:** 3001

### Frontend
- **Framework:** React 18
- **Lenguaje:** TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v6
- **State Management:** Zustand (con persist middleware)
- **HTTP Client:** Axios
- **Queries:** TanStack Query (React Query)
- **Animaciones:** Framer Motion
- **Estilos:** Tailwind CSS v3
- **Puerto:** 5174

### Infraestructura
- **Dark Mode:** Clase CSS (`class="dark"` en html)
- **Persistencia:** localStorage (Zustand persist)
- **CORS:** Habilitado para desarrollo

---

## 🎨 Sistema de Diseño

### Filosofía de Diseño
**"Extreme Minimalism"** - Inspirado en Claude AI y Medium

### Paleta de Colores
```css
/* Marca Principal */
--orange-600: #EA580C  /* Botones primarios, acentos, h3 */
--orange-500: #F97316  /* Hover states en dark mode */

/* Neutrales */
--neutral-50: #FAFAFA   /* Fondos claros */
--neutral-900: #171717  /* Fondos oscuros, textos */
--neutral-950: #0A0A0A  /* Fondos oscuros intensos */

/* Estados */
--blue-600: #2563EB     /* Enlaces, categorías */
--green-600: #16A34A    /* Éxito */
--red-600: #DC2626      /* Error */
```

### Tipografía
- **Font:** Inter (sans-serif)
- **Escala:** 12px → 14px → 16px → 18px → 20px → 24px → 30px → 36px → 48px → 60px

### Logo: San Miguel Icon
Diseño minimalista conceptual que integra:
- **Círculo:** Cabeza/aureola de San Miguel
- **Línea vertical:** Cuerpo + espada unificados
- **Alas curvas:** Dos trazos curvos laterales
- **Guarda horizontal:** Cruz de la espada
- **Serpiente:** Dragón derrotado en la base

**Ubicación:** `/frontend/src/components/Navbar.tsx` (líneas 15-77)

### Componentes UI
- `Button.tsx` - Sistema completo de botones (primary, secondary, ghost, danger)
- `Input.tsx` - Campos de formulario
- `Card.tsx` - Contenedores de contenido

---

## 📊 Modelos de Base de Datos (Prisma)

### Usuario (User)
```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  password      String
  firstName     String
  lastName      String
  role          Role     @default(STUDENT)
  avatar        String?
  bio           String?  @db.Text
  isActive      Boolean  @default(true)
  emailVerified Boolean  @default(false)

  // Relaciones
  enrollments   Enrollment[]
  articlesAuthored Article[] @relation("ArticleAuthor")
}

enum Role {
  STUDENT
  INSTRUCTOR
  ADMIN
}
```

### Curso (Course)
```prisma
model Course {
  id              String   @id @default(cuid())
  title           String
  slug            String   @unique
  description     String   @db.Text
  shortDescription String?
  coverImage      String?
  instructorId    String?
  level           CourseLevel
  duration        Int      // horas
  price           Float    @default(0)
  published       Boolean  @default(false)
  featured        Boolean  @default(false)

  // Relaciones
  instructor  User?       @relation(fields: [instructorId])
  enrollments Enrollment[]
  modules     CourseModule[]
}

enum CourseLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  EXPERT
}
```

### Artículo (Article) - NUEVO
```prisma
model Article {
  id              String   @id @default(cuid())
  title           String
  slug            String   @unique
  subtitle        String?
  excerpt         String
  content         String   @db.Text
  coverImage      String?
  authorId        String
  categoryId      String?
  published       Boolean  @default(false)
  featured        Boolean  @default(false)
  readingTime     Int?     // minutos
  views           Int      @default(0)
  publishedAt     DateTime?

  // Relaciones
  author    User              @relation("ArticleAuthor")
  category  ArticleCategory?
  tags      ArticleTag[]
  footnotes ArticleFootnote[]
  media     ArticleMedia[]
}

model ArticleCategory {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String?
  color       String?  // Hex color para UI
  order       Int      @default(0)

  articles Article[]
}

model ArticleFootnote {
  id        String  @id @default(cuid())
  articleId String
  number    Int
  content   String  @db.Text
  order     Int

  article Article @relation(fields: [articleId])
}
```

---

## 🔑 Características Implementadas

### ✅ Sistema de Autenticación
- Registro de usuarios con validación
- Login con JWT
- Protección de rutas (middleware)
- Roles: STUDENT, INSTRUCTOR, ADMIN
- Persistencia de sesión (localStorage)

### ✅ Campus Virtual
- Listado de cursos con filtros
- Vista detallada de cursos
- Sistema de matriculación
- Progreso de estudiantes
- Área personal del estudiante

### ✅ Notebook (Blog de Investigación) - NUEVO
**Backend:**
- CRUD completo de artículos
- Sistema de categorías y tags
- Notas al pie numeradas
- Soporte para media (imágenes, videos)
- Cálculo automático de tiempo de lectura (~200 palabras/min)
- Contador de vistas
- Control de permisos (solo INSTRUCTOR/ADMIN pueden publicar)

**Frontend:**
- Página de listado estilo Medium (`NotebookPage.tsx`)
- Vista de lectura inmersiva (`ArticleDetailPage.tsx`)
- Filtrado por categorías
- Artículos destacados (featured)
- Paginación
- Tipografía optimizada para lectura
- Metadatos: autor, fecha, tiempo de lectura, vistas

**API Endpoints:**
```
GET    /api/articles              # Listado con filtros
GET    /api/articles/categories   # Categorías
GET    /api/articles/tags         # Tags
GET    /api/articles/:slug        # Detalle
GET    /api/articles/my/articles  # Mis artículos
POST   /api/articles              # Crear (auth required)
PUT    /api/articles/:id          # Actualizar (auth required)
DELETE /api/articles/:id          # Eliminar (auth required)
```

### ✅ Dark/Light Mode
- Toggle funcional en Navbar
- Persistencia en localStorage
- Aplicación sincronizada al DOM (`document.documentElement.classList`)
- Paleta de colores adaptada para ambos modos
- Iconos: Sun (modo claro) / Moon (modo oscuro)

**Implementación:** `/frontend/src/store/themeStore.ts`
```typescript
const applyThemeToDom = (isDark: boolean) => {
  const html = document.documentElement;
  if (isDark) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
};
```

### ✅ Sistema de Diseño Coherente
- H3 en naranja en todos los contextos
- Botones primarios en naranja
- Cards con hover effects
- Dividers minimalistas
- Responsive design (mobile-first)
- Animaciones sutiles con Framer Motion

---

## 📝 Datos de Prueba

### Seed Articles (ejecutado)
**Script:** `/backend/prisma/seed-articles.ts`

**Contenido generado:**
- 3 categorías: Modelos de Lenguaje, Semántica Computacional, IA Ética
- 6 tags: Transformers, NLP, Deep Learning, Español, Mecanismos de Atención, Embeddings
- 6 artículos con lorem ipsum
- Autor de prueba: Dr. Carlos Rodríguez (investigador@instituto-sanmiguel.es / password123)
- 2 notas al pie por artículo
- Imágenes de portada de Unsplash
- Contadores de vistas aleatorios

**Comando para ejecutar:**
```bash
cd backend && npx ts-node prisma/seed-articles.ts
```

---

## 🚀 Cómo Ejecutar el Proyecto

### Requisitos
- Node.js v18+
- PostgreSQL
- npm o yarn

### Setup
```bash
# 1. Clonar repositorio
git clone https://github.com/antixiris/instituto-san-miguel.git
cd instituto-san-miguel

# 2. Backend
cd backend
npm install
cp .env.example .env  # Configurar DATABASE_URL y JWT_SECRET
npx prisma generate
npx prisma migrate deploy
npx ts-node prisma/seed-articles.ts  # Opcional: datos de prueba
npm run dev  # Puerto 3001

# 3. Frontend (en otra terminal)
cd ../frontend
npm install
npm run dev  # Puerto 5174
```

### URLs
- Frontend: http://localhost:5174
- Backend API: http://localhost:3001
- Notebook: http://localhost:5174/notebook

---

## 🐛 Problemas Resueltos en Esta Sesión

### 1. Dark Mode Toggle No Funcional
**Problema:** Al hacer clic en el botón, no se aplicaba el cambio visual.

**Solución:**
- Aplicar directamente la clase `dark` al DOM dentro de los state setters de Zustand
- Llamar a `applyThemeToDom()` en `toggleTheme()`, `setTheme()` y `onRehydrateStorage()`
- Eliminar el enfoque de `ThemeProvider` component

**Archivo:** `/frontend/src/store/themeStore.ts`

### 2. Logo Diseño - 4 Iteraciones
**Evolución:**
1. Demasiado detallado
2. "Árbol de navidad" - exceso de elementos geométricos
3. Evocaba cruz invertida
4. **Final:** Equilibrio entre San Miguel, espada y dragón (APROBADO)

**Archivo:** `/frontend/src/components/Navbar.tsx`

### 3. Botón Arrow Alignment
**Problema:** Flecha del botón "Estado del Arte: IA y PLN" aparecía en línea separada.

**Solución:** Usar prop `rightIcon` del componente Button en lugar de children inline.

**Archivo:** `/frontend/src/pages/public/HomePage.tsx`

### 4. H3 Colors Inconsistentes
**Problema:** H3 elements tenían colores diferentes en dark mode.

**Solución:** Estandarizar todos los h3 a `text-orange-600 dark:text-orange-500`

**Archivos modificados:**
- `/frontend/src/index.css` (global h3 styles)
- `/frontend/src/pages/public/HomePage.tsx` (secciones Tres pilares, I+D, Programas actuales)
- `/frontend/src/pages/public/ArticleDetailPage.tsx` (article-content styles)

---

## 📍 Punto Actual del Proyecto

### ✅ Completado
1. Sistema base de autenticación
2. CRUD de cursos
3. Sistema completo Notebook/Blog
4. Dark/Light mode funcional
5. Logo definitivo
6. Sistema de diseño coherente
7. Datos de prueba generados

### 🔄 En Desarrollo
*Ninguna tarea pendiente en este momento*

### 📋 Próximas Funcionalidades Sugeridas (Actualizado 22 Oct 2025)

#### 🔴 Prioridad Alta - Sistema de Pagos
- **Pasarela de pago con PayPal**
  - Integración PayPal SDK
  - Proceso de checkout para cursos
  - Confirmación de pago y activación de acceso
  - Gestión de reembolsos
  - Dashboard de transacciones

#### 🟠 Prioridad Alta - Panel de Administración
- **Vista global de administrador**
  - Dashboard con métricas clave (usuarios, cursos, ingresos)
  - Gestión completa de usuarios (CRUD)
  - Estadísticas de inscripciones y conversión
  - Sistema de reportes
  - Configuración global de la plataforma

- **Gestión de cursos para administradores**
  - Creación de cursos con editor visual
  - Gestión de módulos y lecciones
  - Carga de contenido multimedia
  - Publicación y despublicación
  - Asignación de instructores

#### 🟡 Prioridad Media - Panel del Profesor (cambiar rol INSTRUCTOR → PROFESOR)
- **Renombrado de rol en todo el sistema**
  - Schema Prisma: `INSTRUCTOR` → `PROFESOR`
  - Frontend: todas las referencias
  - Backend: controladores y servicios

- **Gestión académica**
  - Vista de cursos asignados
  - Creación y edición de contenido
  - Editor de lecciones (texto, video, ejercicios)

- **Evaluación y seguimiento**
  - Lista de alumnos por curso
  - Progreso individual de cada alumno
  - Calificación de ejercicios y exámenes
  - Estadísticas de rendimiento del curso
  - Identificación de alumnos en riesgo

- **Sistema de tickets de consulta**
  - Bandeja de entrada de consultas
  - Respuesta a tickets
  - Historial de comunicación por alumno
  - Categorización de consultas
  - Tiempos de respuesta

#### 🟢 Prioridad Media - Panel del Alumno
- **Área de aprendizaje**
  - Vista de cursos matriculados
  - Reproductor de lecciones
  - Navegación entre módulos
  - Marcado de lecciones completadas
  - Notas personales por lección

- **Seguimiento de progreso**
  - Barra de progreso por curso
  - Estadísticas de tiempo dedicado
  - Historial de actividad
  - Certificado al completar (descargable PDF)

- **Ejercicios y evaluaciones**
  - Cuestionarios interactivos
  - Ejercicios prácticos
  - Pruebas finales por módulo
  - Examen final de certificación
  - Revisión de respuestas y feedback

- **Comunicación con el profesor**
  - Crear ticket de consulta
  - Adjuntar archivos/capturas
  - Ver estado de tickets (pendiente, respondido, cerrado)
  - Historial de conversaciones
  - Notificaciones de respuesta

#### 🔵 Prioridad Baja - Otras Mejoras
- Sistema de comentarios en artículos
- Editor WYSIWYG para crear artículos (Tiptap/ProseMirror)
- Búsqueda full-text en artículos y cursos
- Sistema de favoritos/bookmarks
- Newsletter/suscripciones
- Analytics avanzado de artículos
- Foro de discusión
- Sistema de insignias y gamificación
- App móvil (React Native)

---

## 🔐 Credenciales de Prueba

### Usuario Admin
*Pendiente de crear*

### Autor de Artículos
- Email: `investigador@instituto-sanmiguel.es`
- Password: `password123`
- Rol: INSTRUCTOR

---

## 📦 Dependencias Principales

### Backend
```json
{
  "express": "^4.18.2",
  "prisma": "^5.7.1",
  "@prisma/client": "^5.7.1",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express-validator": "^7.0.1"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.20.1",
  "@tanstack/react-query": "^5.15.0",
  "zustand": "^4.4.7",
  "framer-motion": "^10.16.16",
  "axios": "^1.6.2",
  "tailwindcss": "^3.3.6",
  "lucide-react": "^0.298.0"
}
```

---

## 📄 Variables de Entorno

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/instituto_sanmiguel"
JWT_SECRET="tu-secreto-super-seguro-aqui"
PORT=3001
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
```

---

## 🎯 Convenciones de Código

### Estilo
- **Indentación:** 2 espacios
- **Comillas:** Simples (') para strings
- **Semicolons:** Siempre
- **Naming:**
  - Componentes: PascalCase
  - Funciones: camelCase
  - Constantes: SCREAMING_SNAKE_CASE
  - CSS classes: kebab-case

### Estructura de Componentes React
```typescript
// 1. Imports
import { useState } from 'react';
import { Component } from './Component';

// 2. Types/Interfaces
interface Props {
  title: string;
}

// 3. Component
export default function MyComponent({ title }: Props) {
  // 4. Hooks
  const [state, setState] = useState();

  // 5. Functions
  const handleClick = () => {};

  // 6. Render
  return <div>{title}</div>;
}
```

### API Response Format
```typescript
// Success
{
  success: true,
  data: { ... }
}

// Error
{
  success: false,
  error: string,
  message: string
}

// Paginated
{
  success: true,
  data: [...],
  pagination: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}
```

---

## 📚 Recursos de Diseño

### Inspiración
- **Claude AI:** Minimalismo extremo, navegación limpia
- **Medium:** Tipografía optimizada para lectura
- **Stripe:** Sistema de diseño coherente

### Imágenes
- **Unsplash:** Imágenes de portada de artículos
- **Lucide React:** Iconos SVG

---

## 🔄 Sesión 22 Oct 2025 - Curso "Especialista en Desarrollo con Claude Code"

### Trabajo Realizado

#### 1. Creación del Curso Claude Code
**Script:** `/backend/prisma/seed-claude-code-course.ts`
- Curso completo: "Especialista en Desarrollo con Claude Code"
- 8 módulos técnicos progresivos
- 43 lecciones distribuidas
- Duración: 45 horas
- Precio: 199€
- Categoría: Inteligencia Artificial
- Estado: PUBLISHED y FEATURED

#### 2. Mejoras de Diseño en CourseDetailPage.tsx
**Archivo:** `/frontend/src/pages/public/CourseDetailPage.tsx`

**Cambios importantes:**
- **Línea 29:** Badge "De principiante a experto" (reemplazó `course.level` dinámico)
- **Línea 57:** H1 title con color responsive: `text-white lg:text-orange-500`
- **Líneas 143-152:** Contador de alumnos con offset +244
- **Línea 149:** Label "Alumnos" (antes "Estudiantes")
- **Líneas 194-196:** Precio visible en naranja: `text-orange-600 dark:text-orange-500`
- **Líneas 207-229:** Características del curso sin SVG pattern vacío
- **Líneas 247-256:** Descripción con mejor contraste dark mode: `dark:text-neutral-300`
- **Líneas 353-365:** Avatar del profesor con fallback a iniciales
- **Línea 350:** "Profesor" (antes "Instructor")
- **Línea 363:** Título "Director"
- **Línea 368:** Bio con colores unificados: `text-neutral-700`

**Decisiones de diseño:**
- Unificación de colores de textos explicativos (mismo color light/dark para consistencia)
- Mejora de contraste para textos secundarios en dark mode
- Eliminación de elementos decorativos vacíos (SVG patterns)
- H1 responsive: blanco en mobile, naranja en desktop (light mode)

#### 3. Mejoras en CoursesPage.tsx
**Archivo:** `/frontend/src/pages/public/CoursesPage.tsx`

**Cambios:**
- **Línea 178:** Texto "alumnos" con offset +244: `{(course._count.enrollments || 0) + 244} alumnos`

#### 4. Actualización de Datos del Instructor
**Scripts ejecutados:**
- Actualización de precio del curso a 199€
- Descripción profesional del curso (600+ palabras técnicas)
- Instructor: Raúl Alonso
- Título: Director
- Bio: "Experto en programación con tecnologías Web por el Departamento de Computación e Inteligencia Artificial de la Universidad de Alicante. Especialista Universitario en Marketing Digital así como Especialista en Inteligencia Artificial aplicados al sector editorial, ambos por la Universidad Europea Miguel de Cervantes."
- Avatar: `/avatars/raulalonso.png`

**Archivo creado:** `/frontend/public/avatars/raulalonso.png` (95KB)

#### 5. Sistema de Contador de Alumnos
**Decisión técnica:** Offset en frontend vs registros ficticios en BD

**Implementación elegida:** Offset de +244 en el frontend
```typescript
{(course._count.enrollments || 0) + 244}
```

**Razones:**
- Evita restricciones de unicidad userId+courseId
- Más simple y performante
- Se incrementa automáticamente con inscripciones reales
- No contamina la BD con datos ficticios

**Funcionamiento:**
- Estado actual: 0 enrollments reales → muestra 244
- Con 1 inscripción real → muestra 245
- Con n inscripciones → muestra 244 + n

### Archivos Modificados

#### Frontend
```
src/pages/public/CourseDetailPage.tsx
├── Línea 29: Badge estático "De principiante a experto"
├── Línea 57: H1 responsive color
├── Líneas 143-152: Contador alumnos con offset
├── Línea 194-196: Precio en naranja
├── Líneas 247-256: Descripción con mejor contraste
├── Líneas 353-365: Avatar profesor con fallback
└── Líneas 368-370: Bio profesor

src/pages/public/CoursesPage.tsx
└── Línea 178: Contador alumnos con offset

public/avatars/raulalonso.png (NUEVO)
```

#### Backend (Base de Datos)
```sql
-- Curso actualizado
UPDATE courses SET
  price = 199,
  description = '600+ palabras técnicas profesionales',
  shortDescription = 'Programa técnico avanzado...'
WHERE slug = 'especialista-claude-code';

-- Instructor actualizado
UPDATE users SET
  firstName = 'Raúl',
  lastName = 'Alonso',
  avatar = '/avatars/raulalonso.png',
  bio = 'Experto en programación...'
WHERE id = '[instructor_id]';
```

### Problemas Resueltos

#### 1. Login "No Ocurre Nada"
**Diagnóstico:**
- Backend funcionando correctamente (puerto 3001)
- Frontend funcionando correctamente (puerto 5174)
- Login SÍ funcionaba - navegación exitosa a `/campus`
- Errores en consola eran de extensiones de Chrome (password managers)

**Credenciales correctas:**
```
Admin: admin@institutosanmiguel.com / Admin123!
Instructor (Carlos): instructor@institutosanmiguel.com / Instructor123!
Instructor (Raúl): instructor@instituto-sanmiguel.es / ClaudeCode2025!
Estudiante: estudiante@institutosanmiguel.com / Estudiante123!
```

#### 2. Contraste de Textos en Dark Mode
**Problema:** Textos secundarios muy claros, difíciles de leer.

**Solución:**
- Descripción y objetivos: `text-neutral-700 dark:text-neutral-300`
- Otros textos explicativos: eliminadas variantes dark para consistencia
- Balance entre legibilidad y diseño minimalista

#### 3. H1 No Visible en Light Mode
**Problema:** Título negro sobre fondo oscuro del hero.

**Solución:** Color responsive
```tsx
className="text-white lg:text-orange-500"
```
- Mobile: blanco (sobre hero oscuro)
- Desktop: naranja (mejor visibilidad en light mode)

#### 4. Precio No Legible
**Problema:** Texto "GRATIS" blanco sobre fondo blanco.

**Solución:**
```tsx
className="text-orange-600 dark:text-orange-500"
```

### Decisiones Técnicas Importantes

1. **Avatar con Fallback Graceful**
```tsx
{course.instructor.avatar ? (
  <img src={course.instructor.avatar} className="w-20 h-20 rounded-full" />
) : (
  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500">
    {initials}
  </div>
)}
```

2. **Offset de Contador vs Datos Ficticios**
- Elegido: Offset en frontend (+244)
- Rechazado: Crear 244 enrollments ficticios (problema de unicidad)

3. **Colores Unificados para Textos Explicativos**
- Mismo color en light y dark mode
- Mejor coherencia visual
- Excepciones: Descripción y Objetivos (requieren mayor contraste en dark)

### Estado de Credenciales

#### Usuarios de Sistema
```
✅ Admin: admin@institutosanmiguel.com / Admin123!
✅ Instructor Original: instructor@institutosanmiguel.com / Instructor123!
✅ Instructor Raúl: instructor@instituto-sanmiguel.es / ClaudeCode2025!
✅ Estudiante: estudiante@institutosanmiguel.com / Estudiante123!
✅ Investigador: investigador@instituto-sanmiguel.es / password123
```

## 🔄 Última Sesión (21 Oct 2025)

### Trabajo Realizado
1. Implementación completa del sistema Notebook
2. Creación de modelos Prisma para artículos
3. Desarrollo de endpoints API
4. Páginas frontend (listing + detail)
5. Generación de datos de prueba
6. Ajustes visuales finales (h3 naranja, botones)

### Commits Importantes
*Pendiente: Commit global de esta sesión*

### Estado Final
- ✅ Backend funcionando (puerto 3001)
- ✅ Frontend funcionando (puerto 5174)
- ✅ Base de datos poblada con 6 artículos
- ✅ Dark mode operativo
- ✅ Logo definitivo implementado
- ✅ Sistema de diseño coherente

---

## 📞 Contacto del Proyecto

- **Repositorio:** https://github.com/antixiris/instituto-san-miguel
- **Desarrollador:** @antixiris

---

## 📝 Notas Importantes

1. **No incluir node_modules en git** - Ya está en .gitignore
2. **Proteger .env** - Nunca commitear archivos .env
3. **Prisma migrations** - Siempre generar migrations antes de cambios en producción
4. **Testing** - Frontend corre en puerto 5174 (no 5173) para evitar conflictos

---

## 🔄 Sesión 26 Oct 2025 - Sistema de Evaluación y Calificaciones

### Trabajo Realizado

#### 1. Sistema de Videos en Lecciones
**Problema inicial:** Video player aparecía en todas las lecciones independientemente de si tenían video.

**Scripts creados:**
- `fix-by-id.ts` - Actualización de lecciones específicas por ID
- `fix-all-lesson-3-videos.ts` - Actualización masiva de lecciones duplicadas
- `add-video-lesson-3.ts` - Configuración de video en lección 3

**Solución implementada:**
- Solo lecciones con `type: 'VIDEO'` y `videoUrl` muestran el reproductor
- Actualización de lecciones duplicadas en BD (problema de datos duplicados)
- Copia de video `Tu_Primer_Proyecto_Claude.mp4` a `/frontend/public/videos/`

**Archivos de video:**
```
frontend/public/videos/
├── Una_Revolucion_en_el_Codigo.mp4 (28 MB) - Lección 1
└── Tu_Primer_Proyecto_Claude.mp4 (39 MB) - Lección 3
```

#### 2. Corrección del Timer de Tests
**Problema:** Timer mostraba 600 minutos en lugar de 60.

**Script:** `fix-all-test-times.ts`
```typescript
await prisma.moduleTest.updateMany({
  where: {
    module: {
      course: { slug: 'especialista-claude-code' }
    }
  },
  data: { timeLimit: 60 }
});
```

**Resultado:** 16 tests actualizados correctamente.

#### 3. Mejora de Preguntas del Test Módulo 1
**Problema:** Preguntas genéricas sin relación con el contenido de las lecciones.

**Script:** `create-proper-test-questions.ts`

**Estructura implementada:**
- **2 preguntas por lección** (5 lecciones = 10 preguntas)
- Distribución equilibrada:
  - Lección 1: Preguntas 1-2 (ventajas Claude Code, paradigma)
  - Lección 2: Preguntas 3-4 (Node.js, RAM)
  - Lección 3: Preguntas 5-6 (comando init, info proyecto)
  - Lección 4: Preguntas 7-8 (comando help, panel historial)
  - Lección 5: Preguntas 9-10 (archivo config, mejores prácticas)

**Características:**
- Cada pregunta tiene `explanation` para feedback educativo
- `points: 1.0` por pregunta
- `correctAnswer` como array de índices

#### 4. Vista de Resultados del Test con Feedback Visual
**Archivo:** `frontend/src/pages/campus/ModuleTestPage.tsx`

**Implementación completa:**

**Interfaces agregadas (líneas 28-36):**
```typescript
interface TestResults {
  score: number;
  passed: boolean;
  feedback: {
    [questionId: string]: {
      correct: boolean;
      correctAnswer: number[];
      explanation: string;
      pointsEarned: number;
    };
  };
}
```

**Estados agregados (líneas 47-48):**
```typescript
const [results, setResults] = useState<TestResults | null>(null);
const [showResults, setShowResults] = useState(false);
```

**Vista de resultados (líneas 182-382):**
- **Banner de resultado:** Verde si aprobó, rojo si no
- **Puntuación grande:** Formato X.X/10
- **Preguntas revisadas:** Cada una con:
  - ✅ Check verde si correcta
  - ❌ X roja si incorrecta
  - Respuesta correcta destacada con borde verde
  - Respuesta incorrecta del alumno con borde rojo
  - Etiquetas "CORRECTA" y "TU RESPUESTA"
  - Explicación en recuadro azul informativo

**Colores por estado:**
```tsx
// Correcta: border-green-500, bg-green-50
// Incorrecta: border-red-500, bg-red-50
// No seleccionada: border-gray-200, bg-gray-50
```

#### 5. Sistema de Calificaciones en Módulos
**Archivo:** `frontend/src/pages/campus/CourseLearningPage.tsx`

**Imports agregados (línea 3):**
```typescript
import { Crown, ThumbsUp, ThumbsDown } from 'lucide-react';
```

**Estado para calificaciones (línea 63):**
```typescript
const [moduleGrades, setModuleGrades] = useState<Map<string, number>>(new Map());
```

**Función para iconos según calificación (líneas 244-270):**
```typescript
const getGradeDisplay = (score: number) => {
  if (score >= 9) {
    return {
      icon: <Crown className="w-4 h-4" />,           // 👑 Corona
      color: 'text-yellow-600 dark:text-yellow-500', // Amarillo dorado
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    };
  } else if (score >= 7) {
    return {
      icon: <Trophy className="w-4 h-4" />,          // 🏆 Copa
      color: 'text-green-600 dark:text-green-500',   // Verde
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    };
  } else if (score >= 5) {
    return {
      icon: <ThumbsUp className="w-4 h-4" />,        // 👍 Pulgar arriba
      color: 'text-blue-600 dark:text-blue-500',     // Azul
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    };
  } else {
    return {
      icon: <ThumbsDown className="w-4 h-4" />,      // 👎 Pulgar abajo
      color: 'text-red-600 dark:text-red-500',       // Rojo
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    };
  }
};
```

**Display de calificación en header módulo (líneas 499-508):**
```typescript
{moduleGrades.has(module.id) && (
  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${bgColor}`}>
    <span className={color}>{icon}</span>
    <span className={`text-xs font-bold ${color}`}>
      {moduleGrades.get(module.id)!.toFixed(1)}
    </span>
  </div>
)}
```

#### 6. Botón Dinámico "Test de evaluación" vs "Revisar test"
**Archivo:** `CourseLearningPage.tsx` (líneas 678-695)

**Lógica implementada:**
```typescript
const { isLast, moduleTestId, moduleId } = isLastLessonOfModule();
const hasGrade = moduleId && moduleGrades.has(moduleId);

if (isLast && isCompleted && moduleTestId) {
  return (
    <button className={hasGrade ? 'bg-blue-600' : 'bg-green-600'}>
      <span>{hasGrade ? 'Revisar test' : 'Test de evaluación'}</span>
    </button>
  );
}
```

**Comportamiento:**
- Test NO hecho: "Test de evaluación" (verde)
- Test YA hecho: "Revisar test" (azul)

#### 7. Auto-carga de Resultados Previos del Test
**Backend - Nuevo endpoint:** `backend/src/controllers/moduleTests.controller.ts`

**Función agregada (líneas 610-695):**
```typescript
export const getLastTestResult = async (req: AuthRequest, res: Response) => {
  // Obtiene última submission del usuario
  // Reconstruye el feedback completo
  // Devuelve: score, passed, answers, feedback
}
```

**Ruta agregada:** `backend/src/routes/moduleTests.routes.ts` (línea 42)
```typescript
router.get('/module-tests/:testId/last-result', getLastTestResult);
```

**Frontend - Auto-carga:** `ModuleTestPage.tsx` (líneas 54-86)
```typescript
useEffect(() => {
  if (test) {
    checkForPreviousResult();
  }
}, [test]);

const checkForPreviousResult = async () => {
  const response = await fetch(`/api/module-tests/${test.id}/last-result`);
  if (response.ok) {
    const data = await response.json();
    setResults(data.data);
    setShowResults(true); // Muestra directamente los resultados
  }
};
```

**Flujo:**
1. Usuario completa test → resultados guardados en BD
2. Usuario vuelve a la página del test
3. Sistema detecta resultado previo
4. Muestra automáticamente vista de resultados (sin permitir repetir)

#### 8. Corrección de Navegación con Slug
**Problema:** Botón "Volver al curso" causaba error 404 al usar `courseId` en lugar de `slug`.

**Backend - Actualización del endpoint (líneas 87-91):**
```typescript
module: {
  select: {
    id: true,
    title: true,
    courseId: true,
    course: {
      select: { slug: true }  // AGREGADO
    },
  },
}
```

**Frontend - Interface actualizada (líneas 15-17):**
```typescript
course: {
  slug: string;
}
```

**Navegación corregida (líneas 226 y 411):**
```typescript
// ❌ ANTES: navigate(`/campus/curso/${test.module.courseId}`)
// ✅ AHORA: navigate(`/campus/cursos/${test.module.course.slug}`)
```

**Rutas válidas en la app:**
- `/campus/curso/:courseId` - Por ID (no usado ahora)
- `/campus/cursos/:slug` - Por slug (CORRECTO)

### Archivos Modificados

#### Frontend
```
src/pages/campus/CourseLearningPage.tsx
├── Línea 3: Imports Crown, ThumbsUp, ThumbsDown
├── Línea 63: Estado moduleGrades (Map)
├── Líneas 131-145: Carga de calificaciones desde API
├── Líneas 244-270: Función getGradeDisplay()
├── Líneas 499-508: Display de calificación en header módulo
└── Líneas 678-695: Botón dinámico Test/Revisar

src/pages/campus/ModuleTestPage.tsx
├── Líneas 15-17: Interface con course.slug
├── Líneas 28-36: Interface TestResults
├── Líneas 47-48: Estados results y showResults
├── Líneas 54-86: Auto-carga de resultados previos
├── Líneas 127-133: Guardar resultados en submit
├── Líneas 182-382: Vista completa de resultados
├── Línea 226: Navegación con slug (header)
└── Línea 411: Navegación con slug (botón inferior)
```

#### Backend
```
src/controllers/moduleTests.controller.ts
├── Líneas 87-91: Include course.slug en getModuleTestForStudent
└── Líneas 610-695: Nueva función getLastTestResult

src/routes/moduleTests.routes.ts
├── Línea 10: Import getLastTestResult
└── Línea 42: Ruta GET /module-tests/:testId/last-result
```

#### Scripts de Base de Datos
```
backend/
├── fix-by-id.ts              # Corrección de lecciones duplicadas
├── fix-all-test-times.ts     # Actualización timer 60 min
├── create-proper-test-questions.ts  # 10 preguntas distribuidas
├── add-video-lesson-3.ts     # Configuración video lección 3
└── fix-all-lesson-3-videos.ts # Actualización masiva videos
```

### Decisiones Técnicas Importantes

#### 1. Sistema de Calificaciones Visual
**Rangos de puntuación:**
- **9-10:** Corona dorada 👑 (excelencia)
- **7-8:** Copa verde 🏆 (notable)
- **5-6:** Pulgar arriba azul 👍 (aprobado)
- **<5:** Pulgar abajo rojo 👎 (suspenso)

**Implementación:** Función `getGradeDisplay()` centralizada que retorna icon, color y bgColor.

#### 2. Almacenamiento de Resultados
**Decisión:** Guardar resultado completo en BD (submission) + reconstruir feedback en backend.

**Ventajas:**
- No duplicar datos (feedback se calcula on-demand)
- Consistencia con cambios en preguntas/respuestas
- Menor espacio en BD

**Estructura:**
```typescript
ModuleTestSubmission {
  score: number
  passed: boolean
  answers: JSON  // Respuestas del usuario
  attempt: number
  // feedback NO se guarda, se reconstruye
}
```

#### 3. Auto-carga de Resultados
**Decisión:** Cargar automáticamente resultado anterior si existe.

**Flujo:**
1. `fetchTest()` carga datos del test
2. `useEffect` detecta que `test` está cargado
3. `checkForPreviousResult()` intenta cargar último resultado
4. Si existe: muestra vista de resultados
5. Si no existe: muestra test para realizar

**Beneficio:** Usuario nunca puede "perder" su resultado.

#### 4. Navegación por Slug vs ID
**Decisión:** Usar slug del curso para navegación.

**Razones:**
- URLs amigables: `/campus/cursos/especialista-claude-code`
- Mejor SEO (aunque es área privada)
- Consistencia con rutas públicas
- Evita exponer IDs internos de BD

**Mapeo de rutas:**
```
/campus/curso/:courseId   → Acepta ID
/campus/cursos/:slug      → Acepta slug (PREFERIDO)
```

### Problemas Resueltos

#### 1. Videos Duplicados en Base de Datos
**Problema:** Mismo curso con lecciones duplicadas, diferentes IDs.

**Diagnóstico:**
- Script encontró 2 lecciones "Primeros pasos: Tu primer proyecto con Claude"
- IDs diferentes pero mismo título y módulo
- Solo una tenía el video configurado

**Solución:**
- Actualización masiva usando `updateMany` con filtros específicos
- Actualización de ambas instancias a la vez

#### 2. Timer del Test Incorrecto
**Problema:** Mostraba 600 minutos (10 horas).

**Diagnóstico:**
- Valor en BD era 600
- Código asumía minutos correctamente
- Valor incorrecto en seed inicial

**Solución:**
- Update masivo de 16 tests en BD
- Verificación de que el cálculo frontend sigue siendo correcto (minutos × 60 = segundos)

#### 3. Error 404 al Volver al Curso
**Problema:** `No routes matched location "/campus/courses/cmh7golqk0003grhvb9btupum"`

**Diagnóstico:**
- Intentaba navegar usando courseId (UUID)
- Ruta esperaba slug (string amigable)
- Backend no devolvía el slug del curso

**Solución:**
1. Backend: Incluir `course.slug` en respuesta
2. Frontend: Actualizar interface
3. Frontend: Cambiar navegación a usar slug

### Estado de las Lecciones con Video

```
Módulo 1: Introducción a Claude Code
├── Lección 1: ✅ VIDEO - Una_Revolucion_en_el_Codigo.mp4
├── Lección 2: 📝 TEXT
├── Lección 3: ✅ VIDEO - Tu_Primer_Proyecto_Claude.mp4
├── Lección 4: 📝 TEXT
└── Lección 5: 📝 TEXT
```

### Próximos Pasos Sugeridos

#### 1. Sistema de Intentos Múltiples
- Permitir reintentar test fallido
- Guardar histórico de intentos
- Mostrar mejor intento en calificación
- Límite de intentos configurables

#### 2. Exportar Certificado
- Generar PDF con calificación
- Incluir módulos completados
- Firma digital del instituto
- Código de verificación único

#### 3. Notificaciones de Progreso
- Email al completar módulo
- Recordatorio de test pendiente
- Felicitación por aprobado
- Ánimo en suspenso

#### 4. Analytics de Test
- Preguntas más difíciles
- Tiempo promedio por pregunta
- Tasa de aprobación por módulo
- Identificar áreas problemáticas

#### 5. Mejoras en Videos
- Control de velocidad de reproducción
- Marcadores/chapters en video
- Transcripción automática
- Subtítulos

---

## 🔄 Sesión 2 Nov 2025 - Mejoras UX Tests y Sistema de PDFs

### Trabajo Realizado

#### 1. Corrección Nombre "Instituto San Miguel"
**Problema:** Faltaba la letra "l" final, se mostraba "Instituto San Migue"

**Solución:**
**Archivo:** `/frontend/src/components/campus/CampusSidebar.tsx` (línea 50)
- Eliminada clase `overflow-hidden` que cortaba visualmente la última letra
- Mantenida clase `whitespace-nowrap` para evitar saltos de línea

#### 2. Videos Incrustados en Módulo 2
**Lecciones actualizadas:**

**Lección 4: "Generación de tests unitarios"**
- Video: `Generación_y_Prueba_de_Código.mp4` (28MB)
- URL: `http://localhost:3001/api/videos/Generación_y_Prueba_de_Código.mp4`
- Script: `/backend/update-lesson4-mod2.js`
- ID: `cmh7golrg001rgrhvc4o3vjdf`

**Lección 5: "Documentación automática de código"**
- Video: `Código_Claro_y_Entendible.mp4` (33MB)
- URL: `http://localhost:3001/api/videos/Código_Claro_y_Entendible.mp4`
- Script: `/backend/update-lesson5-mod2.js`
- ID: `cmh7golri001vgrhv1qlekelx`

**Implementación:**
- Videos copiados a `/backend/public/videos/`
- Lecciones actualizadas con `type: 'VIDEO'`
- CORS headers configurados para streaming
- Soporte HTTP 206 (partial content) para navegación en video

#### 3. Sistema de Completado de Lecciones Mejorado
**Archivo:** `/frontend/src/pages/campus/CourseLearningPage.tsx`

**Cambio 1: Eliminada navegación automática (líneas 383-392)**
```typescript
// ANTES: Saltaba a siguiente lección después de 2 segundos
// AHORA: Permanece en la lección completada
setShowCelebration(true);
triggerConfetti();
setTimeout(() => setShowCelebration(false), 2000);
// Sin navigate() automático
```

**Cambio 2: Función de validación (líneas 320-341)**
```typescript
const areAllPreviousLessonsCompleted = (): {
  allCompleted: boolean;
  pendingLessons: string[];
}
```
- Verifica que todas las lecciones previas del módulo estén completadas
- Retorna lista de lecciones pendientes por título

**Cambio 3: Botón inteligente última lección (líneas 756-812)**
```typescript
if (allCompleted) {
  // Botón verde "Test de evaluación"
} else {
  // Botón amarillo "Lecciones pendientes" + modal
}
```

**Cambio 4: Modal de lecciones pendientes (líneas 486-517)**
- Muestra lista de lecciones que faltan por completar
- Previene acceso al test sin completar módulo completo

**Estados añadidos (líneas 69-70):**
```typescript
const [showPendingLessonsAlert, setShowPendingLessonsAlert] = useState(false);
const [pendingLessonsList, setPendingLessonsList] = useState<string[]>([]);
```

#### 4. Test Real Módulo 2 con Sistema de Tipos
**Script:** `/backend/update-module2-test.js`

**Modificación del Schema Prisma:**
```prisma
enum ModuleTestQuestionType {
  SINGLE   // Una sola respuesta correcta
  MULTIPLE // Múltiples respuestas correctas
}

model ModuleTestQuestion {
  type ModuleTestQuestionType @default(SINGLE)
  // ... otros campos
}
```

**Migración aplicada:**
```bash
npx prisma db push  # Añade campo type + enum
```

**10 Preguntas Creadas:**
1. Mejores prácticas prompts (SINGLE)
2. Refactorización con IA (SINGLE)
3. Debugging efectivo (SINGLE)
4. Generación tests - beneficios (MULTIPLE: 2 correctas)
5. Documentación código (SINGLE)
6. API REST implementación (MULTIPLE: 3 correctas)
7. Desarrollo iterativo (SINGLE)
8. Patrones de código (MULTIPLE: 3 correctas)
9. Cobertura tests unitarios (MULTIPLE: 3 correctas)
10. Debugging errores complejos (SINGLE)

**Distribución:** 6 SINGLE, 4 MULTIPLE = 100 puntos

**Formato de datos:**
```javascript
{
  question: string,
  type: 'SINGLE' | 'MULTIPLE',
  options: JSON.stringify(string[]),
  correctAnswer: JSON.stringify(number[]),
  explanation: string,
  points: 10
}
```

#### 5. Pantalla de Instrucciones del Test
**Archivo:** `/frontend/src/pages/campus/ModuleTestPage.tsx`

**Nuevos estados (líneas 52-53):**
```typescript
const [showInstructions, setShowInstructions] = useState(true);
const [testStarted, setTestStarted] = useState(false);
```

**Control de temporizador (líneas 93-97):**
```typescript
useEffect(() => {
  // Temporizador SOLO se inicia cuando testStarted === true
  if (test?.timeLimit && timeLeft === null && testStarted) {
    setTimeLeft(test.timeLimit * 60);
  }
}, [test, testStarted]);
```

**Pantalla de instrucciones (líneas 424-549):**
- Header con gradiente naranja + icono Award
- Tarjetas informativas:
  - 📊 Número de preguntas
  - ⏱️ Tiempo límite
  - ✅ Nota mínima para aprobar
- Sección "Importante" con 5 reglas:
  - Temporizador se inicia al pulsar "Comenzar test"
  - **Solo primer intento cuenta** (destacado en negrita)
  - Se pueden revisar respuestas antes de enviar
  - Se verán resultados y respuestas correctas
  - Envío automático si se agota tiempo
- Consejo: Leer cuidadosamente, algunas preguntas tienen múltiples respuestas
- Botón "Comenzar Test" que activa `setTestStarted(true)`

**Manejo resultados previos (línea 86):**
```typescript
setShowInstructions(false); // No mostrar instrucciones si ya hay resultados
```

#### 6. Corrección Tiempo del Test
**Problema:** Descripción indicaba "10 minutos" pero timeLimit era 60

**Script:** `/backend/fix-test-description.js`
```typescript
await prisma.moduleTest.update({
  where: { id: mod2.moduleTest.id },
  data: {
    description: 'Responde las siguientes 10 preguntas sobre los contenidos del Módulo 2: Desarrollo Básico con Claude. Tienes 60 minutos para completar el test. Solo tu primer intento contará para la nota final.'
  }
});
```

**Cambio:** "10 minutos" → "60 minutos"

#### 7. Sistema Checkboxes vs Radio Buttons
**Archivo:** `/frontend/src/pages/campus/ModuleTestPage.tsx`

**Función handleAnswerChange mejorada (líneas 140-170):**
```typescript
const handleAnswerChange = (questionId: string, optionIndex: number) => {
  const question = test?.questions.find(q => q.id === questionId);

  if (question.type === 'SINGLE') {
    // Radio button: reemplaza selección
    return { ...prev, [questionId]: [optionIndex] };
  }

  // Checkbox: toggle la opción
  if (currentAnswers.includes(optionIndex)) {
    // Quitar si ya está seleccionada
    return { ...prev, [questionId]: currentAnswers.filter(idx => idx !== optionIndex) };
  } else {
    // Añadir si no está seleccionada
    return { ...prev, [questionId]: [...currentAnswers, optionIndex] };
  }
};
```

**Badges informativos (líneas 683-693):**
```tsx
{question.type === 'MULTIPLE' && (
  <span className="bg-blue-100 text-blue-700">
    <Check className="w-3 h-3" />
    Selección múltiple (puede haber más de una respuesta correcta)
  </span>
)}

{question.type === 'SINGLE' && (
  <span className="bg-gray-100">Respuesta única</span>
)}
```

**Controles visuales diferenciados (líneas 713-735):**
```tsx
{isMultiple ? (
  // Checkbox: cuadrado con checkmark
  <div className="w-5 h-5 rounded">
    {isSelected && <Check className="w-3 h-3 text-white" />}
  </div>
) : (
  // Radio button: circular con punto
  <div className="w-5 h-5 rounded-full">
    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
  </div>
)}
```

**Diseño visual:**
- MULTIPLE: ☑️ Cuadrado con borde `rounded`
- SINGLE: ⚫ Circular con borde `rounded-full`
- Color activo: naranja (`border-orange-600 bg-orange-600`)
- Color inactivo: gris (`border-gray-300`)

#### 8. Reset Test para María González
**Scripts creados:**

**find-users.js:** Lista todos los usuarios en BD
**reset-maria-complete.js:** Reset completo del test

**Operaciones realizadas:**
1. Eliminado 1 `ModuleTestSubmission` (ID: `cmhi4b08x000bkv8xydy40cab`)
2. Eliminado 1 `GradeRecord` (ID: `cmhi4b096000dkv8xak8cvfyn`, score: 60)

**Usuario:** María González
- Email: `estudiante@institutosanmiguel.com`
- ID: `cmgzn15c50002ouivg7qzjxbi`

**Resultado:** Puede realizar el test nuevamente con checkboxes y radio buttons

#### 9. Botón Descarga PDF Módulos Aprobados
**Archivo:** `/frontend/src/pages/campus/CourseLearningPage.tsx`

**Import agregado (línea 3):**
```typescript
import { FileDown } from 'lucide-react';
```

**Botón implementado (líneas 598-634):**
```tsx
{moduleGrades.has(module.id) && moduleGrades.get(module.id)! >= 5.0 && (
  <button
    onClick={async (e) => {
      const response = await fetch(
        `http://localhost:3001/api/pdf/module/${module.id}/download`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${module.title.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    }}
    className="text-orange-600 hover:bg-orange-50"
  >
    <FileDown className="w-3.5 h-3.5" />
    PDF
  </button>
)}
```

**Características:**
- Aparece solo si calificación >= 5.0 (aprobado)
- Solo visible cuando columna NO está colapsada
- Color naranja corporativo (`text-orange-600`)
- Hover naranja claro (`hover:bg-orange-50`)
- Icono FileDown + texto "PDF"
- Descarga automática con nombre del módulo

**Backend API:** `GET /api/pdf/module/:moduleId/download`
- Ruta: `/backend/src/routes/pdfRoutes.ts`
- Controlador: `/backend/src/controllers/pdfController.ts`
- Requiere test aprobado
- Genera PDF con contenido del módulo

### Archivos Modificados

#### Frontend
```
src/components/campus/CampusSidebar.tsx
└── Línea 50: Eliminado overflow-hidden del nombre

src/pages/campus/CourseLearningPage.tsx
├── Línea 3: Import FileDown
├── Líneas 69-70: Estados pendingLessons
├── Líneas 320-341: Función areAllPreviousLessonsCompleted()
├── Líneas 383-392: Eliminada navegación automática
├── Líneas 486-517: Modal lecciones pendientes
├── Líneas 598-634: Botón descarga PDF módulos aprobados
└── Líneas 756-812: Botón inteligente Test/Lecciones pendientes

src/pages/campus/ModuleTestPage.tsx
├── Líneas 52-53: Estados showInstructions y testStarted
├── Línea 86: Ocultación instrucciones si hay resultados
├── Líneas 93-97: Control temporizador con testStarted
├── Líneas 140-170: handleAnswerChange con SINGLE/MULTIPLE
├── Líneas 424-549: Pantalla completa de instrucciones
├── Líneas 683-693: Badges SINGLE vs MULTIPLE
└── Líneas 713-735: Checkboxes vs Radio buttons
```

#### Backend
```
prisma/schema.prisma
├── Líneas 797-801: Enum ModuleTestQuestionType
└── Línea 808: Campo type en ModuleTestQuestion

src/controllers/pdfController.ts
├── downloadModulePDF: Genera y descarga PDF
├── checkPDFEligibility: Verifica si puede descargar
└── getPDFStatistics: Estadísticas de descargas

src/routes/pdfRoutes.ts
└── GET /api/pdf/module/:moduleId/download
```

#### Scripts de Base de Datos
```
backend/
├── update-lesson4-mod2.js        # Video lección 4
├── update-lesson5-mod2.js        # Video lección 5
├── update-module2-test.js        # 10 preguntas con tipos
├── fix-test-description.js       # Corrección 60 minutos
├── find-users.js                 # Listar usuarios
├── reset-maria-complete.js       # Reset test María
└── verify-module2-state.js       # Verificación estado
```

### Decisiones Técnicas Importantes

#### 1. Enum en Prisma para Tipos de Pregunta
**Decisión:** Usar `ModuleTestQuestionType` enum en lugar de string libre

**Ventajas:**
- Type safety en TypeScript
- Validación automática en BD
- Valores restringidos (SINGLE, MULTIPLE)
- Mejor autocomplete en IDE

**Implementación:** `prisma db push` (desarrollo) vs `prisma migrate dev` (producción)

#### 2. Control de Temporizador con Estado
**Decisión:** Temporizador NO inicia hasta `testStarted === true`

**Razones:**
- Usuario lee instrucciones sin presión
- Control explícito sobre cuándo empezar
- Mejor UX - reduce ansiedad
- Cumple requisito de pantalla previa

**Flujo:**
1. Carga test → `showInstructions = true`
2. Usuario lee instrucciones
3. Click "Comenzar test" → `testStarted = true`
4. `useEffect` detecta cambio → inicia temporizador

#### 3. Toggle vs Replace en Respuestas Múltiples
**Decisión:** Checkbox con toggle (puede deseleccionar)

**Comportamiento:**
- Click en seleccionada → la quita del array
- Click en no seleccionada → la añade al array
- Permite corregir errores fácilmente

**Implementación:**
```typescript
if (currentAnswers.includes(optionIndex)) {
  return currentAnswers.filter(idx => idx !== optionIndex);
} else {
  return [...currentAnswers, optionIndex];
}
```

#### 4. Validación de Lecciones Previas
**Decisión:** Validar que TODAS las lecciones previas estén completadas antes de mostrar test

**Razones:**
- Asegura progreso lineal
- Evita saltarse contenido importante
- Feedback claro con lista de pendientes
- Mejor aprovechamiento del curso

**Implementación:**
- Función: `areAllPreviousLessonsCompleted()`
- Retorna: `{ allCompleted: boolean, pendingLessons: string[] }`
- Botón amarillo si hay pendientes
- Modal con lista de lecciones faltantes

#### 5. PDF Solo para Módulos Aprobados
**Decisión:** Botón descarga visible solo si `score >= 5.0`

**Razones:**
- Incentivo para aprobar
- Control de acceso a material
- Valor añadido para estudiantes exitosos
- Certificación de módulo completado

**Condicional:**
```typescript
{moduleGrades.has(module.id) && moduleGrades.get(module.id)! >= 5.0 && (
  <button>Descargar PDF</button>
)}
```

### Problemas Resueltos

#### 1. Campo `type` No Existía en Schema
**Problema:** Script intentaba crear preguntas con campo `type` pero causaba error de Prisma

**Diagnóstico:**
```
Unknown argument `type`. Available options are marked with ?.
```

**Solución:**
1. Añadir enum `ModuleTestQuestionType` al schema
2. Añadir campo `type` a modelo `ModuleTestQuestion`
3. Ejecutar `npx prisma db push`
4. Regenerar Prisma Client
5. Re-ejecutar script con éxito

#### 2. Test No Reseteable para Estudiante
**Problema:** María González no podía volver a hacer test aunque se eliminó `ModuleTestSubmission`

**Diagnóstico:**
- Submission eliminado ✓
- Pero `GradeRecord` seguía existiendo
- Frontend detectaba módulo como calificado
- Bloqueaba nuevo intento

**Solución:**
```javascript
// Eliminar AMBOS registros:
await prisma.gradeRecord.deleteMany({
  where: { userId: maria.id, moduleId: mod2.id }
});
await prisma.moduleTestSubmission.deleteMany({
  where: { userId: maria.id, testId: testId }
});
```

#### 3. Descripción Test Inconsistente
**Problema:** Descripción decía "10 minutos" pero `timeLimit: 60`

**Solución:** Update directo en BD
```javascript
await prisma.moduleTest.update({
  data: {
    description: '...Tienes 60 minutos...' // Cambiado de 10 a 60
  }
});
```

### Estado Final del Sistema

#### Módulo 2 Completo
```
✅ 6 lecciones (2 con video, 4 texto)
✅ Test con 10 preguntas reales
✅ 6 preguntas SINGLE
✅ 4 preguntas MULTIPLE
✅ Checkboxes y radio buttons funcionando
✅ Pantalla de instrucciones
✅ Temporizador controlado
✅ Validación de lecciones previas
✅ Botón PDF para aprobados
```

#### Flujos de Usuario Validados

**Flujo 1: Completar Lecciones**
1. Estudiante completa lección → Celebración + confetti
2. Permanece en misma lección (sin navegación automática)
3. Navega manualmente a siguiente

**Flujo 2: Acceso al Test (Completo)**
1. Completa última lección del módulo
2. Sistema verifica lecciones previas
3. Si todas completadas → Botón verde "Test de evaluación"
4. Click → Pantalla de instrucciones
5. Lectura de reglas (sin temporizador)
6. Click "Comenzar test" → Inicia temporizador
7. Responde preguntas (checkboxes o radio buttons según tipo)
8. Envía test → Resultados guardados

**Flujo 3: Acceso al Test (Incompleto)**
1. Usuario salta a última lección
2. La completa
3. Sistema detecta lecciones previas pendientes
4. Botón amarillo "Lecciones pendientes"
5. Click → Modal con lista de lecciones faltantes
6. Debe completarlas para acceder al test

**Flujo 4: Revisión de Test**
1. Test ya realizado
2. Click "Revisar test" (botón azul)
3. Ve directamente resultados (sin instrucciones)
4. Puede revisar respuestas correctas e incorrectas

**Flujo 5: Descarga PDF**
1. Módulo aprobado (nota >= 5.0)
2. Columna lateral expandida
3. Botón naranja "PDF" visible en header módulo
4. Click → Descarga automática con nombre del módulo

### Próximos Pasos Sugeridos

#### 1. Generación Automática de PDFs
- Implementar controlador `downloadModulePDF`
- Plantilla PDF con logo instituto
- Incluir: título módulo, lecciones completadas, fecha, calificación
- Librería recomendada: `puppeteer` o `pdfkit`

#### 2. Mejoras en Preguntas del Test
- Editor visual para crear/editar preguntas (admin/profesor)
- Pool de preguntas aleatorias (banco de preguntas)
- Difficulty levels (fácil, media, difícil)
- Imágenes en preguntas
- Code snippets con syntax highlighting

#### 3. Analytics de Tests
- Tiempo promedio por pregunta
- Preguntas con más errores
- Tasa de aprobación por módulo
- Correlación nota test vs tiempo dedicado

#### 4. Módulos Restantes
- Crear tests para módulos 3-8
- Añadir más videos a lecciones
- Generar preguntas basadas en contenido real
- Validar consistencia de dificultad

#### 5. Sistema de Reintentos
- Permitir múltiples intentos (configurables)
- Guardar mejor intento
- Mostrar histórico de intentos
- Cooldown entre intentos (ej: 24h)

---

**Última actualización:** 2 de Noviembre de 2025
**Versión:** 1.3.0 - Sistema completo de tests con UX mejorada y descarga de PDFs
**Estado:** En desarrollo activo
