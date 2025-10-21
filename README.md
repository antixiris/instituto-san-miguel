# Instituto San Miguel - Plataforma E-Learning

Plataforma e-learning completa con LMS (Learning Management System) para el Instituto San Miguel de Computación e IA.

## Características Principales

- **Área Pública**: Landing page, información de cursos, equipo, blog
- **Campus Virtual**: LMS completo con gestión de cursos modulares
- **Autenticación**: Sistema seguro con JWT y roles (estudiante, instructor, admin)
- **Gamificación**: Sistema de puntos, logros y seguimiento de progreso
- **Evaluaciones**: Cuestionarios interactivos y ejercicios prácticos
- **Mensajería**: Sistema de comunicación entre estudiantes e instructores
- **Panel Admin**: Gestión completa de usuarios, cursos y contenido

## Stack Tecnológico

### Frontend
- React 18 + TypeScript
- Tailwind CSS para estilos
- Vite como build tool
- React Router para navegación
- Axios para peticiones HTTP
- Zustand para gestión de estado
- React Query para caché y sincronización

### Backend
- Node.js + Express
- TypeScript
- PostgreSQL como base de datos
- Prisma ORM
- JWT para autenticación
- bcrypt para encriptación de contraseñas
- Express Validator para validación

### DevOps
- Vercel para frontend
- Railway para backend y base de datos
- GitHub Actions para CI/CD

## Estructura del Proyecto

```
/
├── frontend/          # Aplicación React
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas de la aplicación
│   │   ├── layouts/       # Layouts (Public, Campus)
│   │   ├── services/      # Servicios API
│   │   ├── hooks/         # Custom hooks
│   │   ├── store/         # Estado global (Zustand)
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Utilidades
│   │   └── assets/        # Imágenes, iconos
│   ├── public/
│   └── package.json
│
├── backend/           # API Node.js
│   ├── src/
│   │   ├── controllers/   # Controladores
│   │   ├── routes/        # Rutas de la API
│   │   ├── middleware/    # Middleware (auth, validation)
│   │   ├── services/      # Lógica de negocio
│   │   ├── utils/         # Utilidades
│   │   └── types/         # TypeScript types
│   ├── prisma/
│   │   └── schema.prisma  # Schema de base de datos
│   └── package.json
│
└── shared/            # Código compartido
    └── types/         # Tipos compartidos
```

## Instalación y Configuración

### Prerrequisitos

- Node.js 18+ y npm
- PostgreSQL 14+
- Git

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd instituto-san-miguel
```

### 2. Configurar Backend

```bash
cd backend
npm install

# Copiar archivo de variables de entorno
cp .env.example .env

# Editar .env con tus credenciales de base de datos
# DATABASE_URL="postgresql://user:password@localhost:5432/instituto_san_miguel"
# JWT_SECRET="your-super-secret-jwt-key"
# PORT=3001

# Generar cliente de Prisma y ejecutar migraciones
npx prisma generate
npx prisma migrate dev

# Seed de datos iniciales (opcional)
npm run seed
```

### 3. Configurar Frontend

```bash
cd ../frontend
npm install

# Copiar archivo de variables de entorno
cp .env.example .env

# Editar .env con la URL de tu backend
# VITE_API_URL=http://localhost:3001/api
```

### 4. Ejecutar en Desarrollo

En una terminal, ejecutar el backend:

```bash
cd backend
npm run dev
```

En otra terminal, ejecutar el frontend:

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## Deployment

### Frontend (Vercel)

1. Conectar el repositorio con Vercel
2. Configurar:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Variables de entorno:
   - `VITE_API_URL`: URL de tu backend en Railway

### Backend (Railway)

1. Crear nuevo proyecto en Railway
2. Agregar PostgreSQL database
3. Conectar repositorio de GitHub
4. Configurar:
   - Root Directory: `backend`
   - Build Command: `npm install && npx prisma generate && npm run build`
   - Start Command: `npm start`
5. Variables de entorno:
   - `DATABASE_URL`: Auto-configurada por Railway
   - `JWT_SECRET`: Generar una clave segura
   - `NODE_ENV`: production
   - `FRONTEND_URL`: URL de tu frontend en Vercel

## Scripts Disponibles

### Backend
- `npm run dev`: Ejecutar en modo desarrollo
- `npm run build`: Compilar TypeScript
- `npm start`: Ejecutar en producción
- `npm run seed`: Poblar base de datos con datos iniciales
- `npx prisma studio`: Abrir interfaz visual de la base de datos

### Frontend
- `npm run dev`: Ejecutar en modo desarrollo
- `npm run build`: Compilar para producción
- `npm run preview`: Previsualizar build de producción
- `npm run lint`: Ejecutar linter

## Usuarios de Prueba

Después de ejecutar el seed, puedes usar:

**Administrador:**
- Email: admin@institutosanmiguel.com
- Password: Admin123!

**Instructor:**
- Email: instructor@institutosanmiguel.com
- Password: Instructor123!

**Estudiante:**
- Email: estudiante@institutosanmiguel.com
- Password: Estudiante123!

## Características de Seguridad

- Autenticación basada en JWT con refresh tokens
- Contraseñas encriptadas con bcrypt (10 rounds)
- Validación de datos en backend
- Protección CSRF
- Rate limiting en endpoints sensibles
- Sanitización de inputs
- Headers de seguridad (Helmet.js)
- CORS configurado correctamente

## Accesibilidad

- Cumple con WCAG 2.1 Level AA
- Navegación por teclado completa
- Etiquetas ARIA apropiadas
- Contraste de colores accesible
- Textos alternativos en imágenes
- Focus visible en elementos interactivos

## Performance

- Lazy loading de componentes
- Optimización de imágenes
- Code splitting
- Caché de API con React Query
- Core Web Vitals optimizados

## SEO

- Meta tags optimizados
- Open Graph tags
- Sitemap.xml
- Robots.txt
- Schema.org markup
- URLs semánticas

## Soporte

Para reportar problemas o sugerencias:
- Email: soporte@institutosanmiguel.com
- GitHub Issues: <repository-url>/issues

## Licencia

Propiedad del Instituto San Miguel de Computación e IA - Todos los derechos reservados.
