// Servidor principal de Express
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Cargar variables de entorno
dotenv.config();

// Importar rutas
import authRoutes from './routes/auth.routes';
import coursesRoutes from './routes/courses.routes';
import articlesRoutes from './routes/articles.routes';
import ticketsRoutes from './routes/tickets.routes';
import usersRoutes from './routes/users.routes';
import analyticsRoutes from './routes/analytics.routes';
import categoriesRoutes from './routes/categories.routes';
import modulesRoutes from './routes/modules.routes';
import gameExercisesRoutes from './routes/gameExercises.routes';
import moduleTestsRoutes from './routes/moduleTests.routes';
import gradesRoutes from './routes/grades.routes';
import enrollmentsRoutes from './routes/enrollments.routes';

// Importar middleware
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { prisma, disconnectPrisma } from './utils/prisma';

// Configuración
const app: Application = express();
const PORT = process.env.PORT || 3001;

// En desarrollo, permitir ambos puertos comunes de Vite
const isDevelopment = process.env.NODE_ENV !== 'production';
const ALLOWED_ORIGINS = isDevelopment
  ? ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000']
  : process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : [];

// Middleware de seguridad
app.use(helmet());

// CORS - Configuración más permisiva para desarrollo
app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (como Postman, curl, etc.)
      if (!origin) return callback(null, true);

      if (ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`CORS: Origin "${origin}" not allowed`);
        callback(null, false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600,
  })
);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api', modulesRoutes); // Incluye rutas de módulos y lecciones
app.use('/api', gameExercisesRoutes); // Ejercicios gamificados
app.use('/api', moduleTestsRoutes); // Tests de módulo
app.use('/api', gradesRoutes); // Calificaciones y progreso
app.use('/api/tickets', ticketsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/enrollments', enrollmentsRoutes);

// Middleware de error 404
app.use(notFoundHandler);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar servidor
async function startServer() {
  try {
    // Verificar conexión a la base de datos
    await prisma.$connect();
    console.log('✓ Conectado a la base de datos');

    app.listen(PORT, () => {
      console.log(`✓ Servidor corriendo en http://localhost:${PORT}`);
      console.log(`✓ Entorno: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

// Manejo de cierre graceful
process.on('SIGTERM', async () => {
  console.log('SIGTERM recibido, cerrando servidor...');
  await disconnectPrisma();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT recibido, cerrando servidor...');
  await disconnectPrisma();
  process.exit(0);
});

// Iniciar
startServer();
