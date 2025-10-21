# PROYECTO: Instituto San Miguel de Computación e IA

## Contexto del Proyecto
Plataforma e-learning completa con:
- Área pública (landing, servicios, equipo)
- Campus virtual (LMS completo)
- Sistema de autenticación
- Gestión de cursos modulares
- Gamificación y seguimiento

## Stack Tecnológico Recomendado
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express
- **Base de datos**: PostgreSQL + Prisma ORM
- **Autenticación**: JWT + bcrypt
- **Video**: integración con Vimeo/YouTube
- **Deployment**: Vercel (frontend) + Railway (backend)

## Prioridades
1. Arquitectura escalable y mantenible
2. UX excepcional para estudiantes
3. Accesibilidad WCAG 2.1 AA
4. SEO optimizado
5. Performance (Core Web Vitals)
6. Seguridad en autenticación
7. Entorno Firebase

# Arquitectura del Instituto San Miguel

## Estructura del Sistema

### Área Pública
- Landing page
- Sobre nosotros
- Servicios/Cursos ofrecidos
- Equipo/Director
- Blog/Noticias
- Contacto

### Campus Virtual (LMS)
- Dashboard del estudiante
- Catálogo de cursos
- Vista de curso individual
  - Módulos
  - Unidades didácticas
  - Contenido (texto + video)
  - Mapas conceptuales
  - Ejercicios gamificados
  - Cuestionarios de evaluación
- Progreso y estadísticas
- Mensajería con tutores
- Tablón de anuncios
- Perfil del estudiante

## Modelo de Datos

### Usuarios
- Estudiantes
- Tutores
- Administradores

### Contenido
- Cursos
- Módulos
- Unidades didácticas
- Recursos (videos, textos)
- Ejercicios
- Cuestionarios

### Seguimiento
- Progreso por curso/módulo
- Puntuaciones
- Tiempo dedicado
- Certificaciones