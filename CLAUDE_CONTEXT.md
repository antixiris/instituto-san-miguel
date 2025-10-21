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

### 📋 Próximas Funcionalidades Sugeridas
- Sistema de comentarios en artículos
- Editor WYSIWYG para crear artículos (Tiptap/ProseMirror)
- Búsqueda full-text en artículos
- Sistema de favoritos/bookmarks
- Newsletter/suscripciones
- Analytics de artículos
- Sistema de certificados para cursos
- Pagos integrados (Stripe)
- Foro de discusión

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

**Última actualización:** 21 de Octubre de 2025
**Versión:** 1.0.0
**Estado:** En desarrollo activo
