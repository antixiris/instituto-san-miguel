"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Servidor principal de Express
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Cargar variables de entorno
dotenv_1.default.config();
// Importar rutas
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const courses_routes_1 = __importDefault(require("./routes/courses.routes"));
const articles_routes_1 = __importDefault(require("./routes/articles.routes"));
const tickets_routes_1 = __importDefault(require("./routes/tickets.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
// Importar middleware
const errorHandler_1 = require("./middleware/errorHandler");
const prisma_1 = require("./utils/prisma");
// Configuración
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
// Middleware de seguridad
app.use((0, helmet_1.default)());
// CORS
app.use((0, cors_1.default)({
    origin: FRONTEND_URL,
    credentials: true,
}));
// Body parsers
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Logging
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
else {
    app.use((0, morgan_1.default)('combined'));
}
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
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
app.use('/api/auth', auth_routes_1.default);
app.use('/api/courses', courses_routes_1.default);
app.use('/api/articles', articles_routes_1.default);
app.use('/api/tickets', tickets_routes_1.default);
app.use('/api/users', users_routes_1.default);
app.use('/api/analytics', analytics_routes_1.default);
// Middleware de error 404
app.use(errorHandler_1.notFoundHandler);
// Middleware de manejo de errores
app.use(errorHandler_1.errorHandler);
// Iniciar servidor
async function startServer() {
    try {
        // Verificar conexión a la base de datos
        await prisma_1.prisma.$connect();
        console.log('✓ Conectado a la base de datos');
        app.listen(PORT, () => {
            console.log(`✓ Servidor corriendo en http://localhost:${PORT}`);
            console.log(`✓ Entorno: ${process.env.NODE_ENV || 'development'}`);
        });
    }
    catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
}
// Manejo de cierre graceful
process.on('SIGTERM', async () => {
    console.log('SIGTERM recibido, cerrando servidor...');
    await (0, prisma_1.disconnectPrisma)();
    process.exit(0);
});
process.on('SIGINT', async () => {
    console.log('SIGINT recibido, cerrando servidor...');
    await (0, prisma_1.disconnectPrisma)();
    process.exit(0);
});
// Iniciar
startServer();
//# sourceMappingURL=index.js.map