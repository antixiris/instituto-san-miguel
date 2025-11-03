<p><strong><em>Lección 1: Monitorización y Analytics con Claude Code</em></strong></p>

## Introducción

¡Bienvenido al Módulo 8, el módulo final de este increíble curso! Has llegado muy lejos. Empezaste desde cero, aprendiendo qué es Claude Code, cómo usarlo para tareas simples, y ahora estás en el nivel de maestría. Este último módulo está diseñado para convertirte en un verdadero profesional del desarrollo con Claude Code.

Hoy vamos a hablar de algo que suena técnico pero que es absolutamente esencial: **monitorización y analytics**. En español simple: cómo saber qué está pasando con tu aplicación cuando está en producción (siendo usada por gente real). Es como tener cámaras de seguridad en tu casa que te avisan si algo va mal, o sensores en tu auto que te alertan cuando el motor se sobrecalienta.

Lo mejor de todo es que **Claude Code va a ser tu asistente personal para configurar toda esta monitorización**. No necesitas ser un experto en DevOps ni en sistemas complejos. Simplemente le pides a Claude Code: "Necesito monitorear mi aplicación" y él te guía paso a paso. ¡Vamos a descubrir cómo!

## ¿Qué es Monitorización? (Explicación Simple)

Imagina que has creado una aplicación increíble. La subiste a producción (está en internet, funcionando). Todo parece estar bien. Pero de repente:
- Usuarios empiezan a quejarse de que es lenta
- Alguien reporta un error raro
- La aplicación se cae a las 3 AM y nadie se da cuenta hasta las 9 AM
- Se está gastando muchísimo dinero en el servidor y no sabes por qué

Sin **monitorización**, estás volando a ciegas. No sabes:
- ¿Está funcionando mi app ahora mismo?
- ¿Cuántos usuarios hay conectados?
- ¿Hay errores ocurriendo?
- ¿Qué tan rápido responde mi aplicación?
- ¿Dónde está el cuello de botella?

**Monitorización** es tener instrumentos que te digan todo esto en tiempo real. Es como el panel de control de un avión: te muestra velocidad, altitud, combustible, temperatura... todo lo que necesitas saber para volar seguro.

### ¿Qué Incluye Monitorización?

1. **Logs (Registros)**: Archivos que guardan todo lo que pasa
   - "Usuario X hizo login a las 10:30 AM"
   - "Error al conectar con la base de datos"
   - "API respondió en 200ms"

2. **Métricas**: Números que miden el rendimiento
   - Tiempo de respuesta promedio
   - Cantidad de peticiones por segundo
   - Uso de memoria y CPU
   - Cantidad de errores

3. **Alertas**: Notificaciones cuando algo va mal
   - "¡Error crítico! La aplicación se cayó"
   - "Advertencia: Uso de CPU al 90%"
   - "Info: 1000 usuarios conectados simultáneamente"

4. **Dashboards**: Paneles visuales que muestran todo de un vistazo
   - Gráficos de uso en tiempo real
   - Mapa de errores
   - Estadísticas de rendimiento

Y adivina qué: **Claude Code puede ayudarte a configurar todo esto**.

## Cómo Claude Code te Ayuda con Monitorización

### Tu Primera Conversación con Claude Code sobre Monitorización

Vamos a empezar con lo básico. Abre Claude Code en tu terminal y haz esta pregunta simple:

**Tú escribes en Claude Code**:
```
Hola Claude, tengo una aplicación Node.js con Express en producción.
Me gustaría poder monitorearla para saber si hay errores o si está lenta.
Nunca he configurado monitorización. ¿Por dónde empiezo?
```

**Claude Code responde**:
```
¡Excelente pregunta! Monitorear tu aplicación es super importante.
Te voy a explicar las opciones desde lo más simple hasta lo más avanzado.

NIVEL 1: LOGGING BÁSICO (Empezar AQUÍ)
=======================================

Lo primero es tener logs (registros) de lo que pasa en tu app.

Herramienta recomendada: Winston (librería de logging para Node.js)

¿Qué hace Winston?
- Guarda logs en archivos
- Categoriza logs por nivel (info, error, warning)
- Puede enviar logs a servicios externos
- Formato customizable

NIVEL 2: MONITORING DE ERRORES
===============================

Herramientas que capturan errores automáticamente:
- Sentry (gratis hasta 5,000 eventos/mes) - RECOMENDADO
- Rollbar
- LogRocket

¿Qué hacen?
- Capturan TODOS los errores
- Te envían email/Slack cuando hay un error
- Muestran el stack trace completo
- Agrupan errores similares

NIVEL 3: MÉTRICAS Y PERFORMANCE
================================

Herramientas que miden rendimiento:
- New Relic (tiene plan gratuito)
- Datadog
- Prometheus + Grafana (open source)

¿Qué miden?
- Tiempo de respuesta de tu API
- Uso de CPU y memoria
- Peticiones por segundo
- Consultas lentas a la base de datos

MI RECOMENDACIÓN PARA EMPEZAR:
===============================

1. Implementar Winston para logs básicos (HOY)
2. Agregar Sentry para captura de errores (ESTA SEMANA)
3. Más adelante: New Relic o similar para métricas

¿Te parece? Puedo ayudarte a implementar cada uno paso a paso.
```

**Explicación de lo que acaba de pasar**:

Claude Code:
- Entendió que eres principiante en monitorización
- Dividió las opciones en niveles (de simple a avanzado)
- Te recomendó herramientas específicas (con nombres)
- Explicó qué hace cada tipo de herramienta
- Te dio un plan de acción claro

Esto es exactamente lo que necesitas: una guía clara sin abrumarte.

## Paso 1: Configurar Logging Básico con Winston y Claude Code

Vamos a empezar con lo más básico: **guardar logs de tu aplicación**. Vamos a pedirle a Claude Code que nos ayude.

### Pidiendo Ayuda a Claude Code

**Tú**:
```
Claude, ayúdame a configurar Winston en mi aplicación Express.
Necesito guardar logs de:
- Errores que ocurran
- Peticiones que lleguen
- Eventos importantes

Dame el código completo con explicaciones.
```

**Claude Code**:
```
¡Perfecto! Te voy a crear un sistema de logging completo con Winston.
Voy a explicarte cada parte.

PASO 1: Instalar Winston
=========================

```bash
npm install winston winston-daily-rotate-file
```

winston-daily-rotate-file crea un archivo nuevo cada día (para no tener
archivos enormes).

PASO 2: Crear archivo de configuración de logs
===============================================

Crea un archivo llamado logger.js en tu proyecto:

```javascript
// logger.js - Configuración de Winston

const winston = require('winston');
const path = require('path');

// Definir niveles de log
const levels = {
  error: 0,   // Errores críticos
  warn: 1,    // Advertencias
  info: 2,    // Información general
  http: 3,    // Peticiones HTTP
  debug: 4    // Información de debugging
};

// Definir colores para cada nivel (para la consola)
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
};

winston.addColors(colors);

// Formato de cómo se ven los logs
const format = winston.format.combine(
  // Agregar timestamp (fecha y hora)
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),

  // Agregar colores (solo para consola)
  winston.format.colorize({ all: true }),

  // Formato final
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Configurar dónde se guardan los logs
const transports = [
  // Consola (para que los veas mientras desarrollas)
  new winston.transports.Console(),

  // Archivo de errores (solo errores)
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }),

  // Archivo de todo (todos los niveles)
  new winston.transports.File({
    filename: 'logs/all.log'
  })
];

// Crear el logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  levels,
  format,
  transports
});

module.exports = logger;
```

EXPLICACIÓN DETALLADA:
======================

**Niveles de log**: Van de más grave (error) a menos grave (debug).
- error: Cuando algo se rompió
- warn: Algo extraño pero no crítico
- info: Información útil
- http: Peticiones que llegan
- debug: Info técnica para debugging

**Formato**: Es cómo se ve cada línea del log.
Ejemplo: "2024-01-15 10:30:45 info: Usuario creado exitosamente"

**Transports**: Son los "destinos" de los logs.
- Console: Los ves en la terminal
- File: Se guardan en archivos

PASO 3: Usar el logger en tu aplicación
========================================

En tu app.js (o index.js):

```javascript
const express = require('express');
const logger = require('./logger'); // ← Importar el logger

const app = express();
app.use(express.json());

// Middleware para loggear TODAS las peticiones
app.use((req, res, next) => {
  logger.http(`${req.method} ${req.url}`);
  next();
});

// Ejemplo de ruta con logs
app.post('/api/users', (req, res) => {
  logger.info('Creando nuevo usuario');

  try {
    const { username, email } = req.body;

    // Validación
    if (!username || !email) {
      logger.warn('Intento de crear usuario sin datos completos');
      return res.status(400).json({ error: 'Faltan datos' });
    }

    // Crear usuario (ejemplo)
    logger.info(`Usuario creado: ${username}`);
    res.json({ message: 'Usuario creado' });

  } catch (error) {
    logger.error(`Error creando usuario: ${error.message}`);
    res.status(500).json({ error: 'Error interno' });
  }
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  logger.error(`Error no manejado: ${err.message}`);
  logger.error(`Stack trace: ${err.stack}`);

  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor iniciado en puerto ${PORT}`);
});
```

PASO 4: Crear la carpeta de logs
=================================

```bash
mkdir logs
```

PASO 5: Agregar logs al .gitignore
===================================

No quieres subir los archivos de logs a Git:

```gitignore
# .gitignore
logs/
*.log
```

¿QUÉ VAS A VER?
===============

Cuando ejecutes tu app, en la consola verás:

```
2024-01-15 10:30:45 info: Servidor iniciado en puerto 3000
2024-01-15 10:31:02 http: POST /api/users
2024-01-15 10:31:02 info: Creando nuevo usuario
2024-01-15 10:31:02 info: Usuario creado: juan
```

Y en el archivo logs/all.log verás lo mismo guardado.

VENTAJAS DE ESTO:
=================

✅ Tienes registro de TODO lo que pasa
✅ Si hay un error a las 3 AM, puedes revisar los logs después
✅ Los logs están organizados por tipo (errores en un archivo separado)
✅ Puedes buscar en los logs para debugging

¿Tiene sentido? ¿Quieres que agregue algo más?
```

**¿Ves cuán útil es esto?**

Claude Code te dio:
- Código completo listo para copiar/pegar
- Explicación de cada sección
- Ejemplos de uso en rutas reales
- Best practices (como ignorar logs en Git)

### Probando tu Sistema de Logs

Ahora implementa lo que Claude Code te dio y pruébalo. Pero ¿qué pasa si encuentras un error?

**Tú**:
```
Claude, configuré Winston pero me sale este error:
Error: ENOENT: no such file or directory, open 'logs/error.log'
```

**Claude Code**:
```
¡Ah, entiendo el problema! Winston está tratando de escribir en la carpeta
logs/, pero esa carpeta no existe.

SOLUCIÓN RÁPIDA:
================

Crea la carpeta manualmente:
```bash
mkdir logs
```

SOLUCIÓN MEJOR (automática):
============================

Modifica tu logger.js para que cree la carpeta automáticamente si no existe:

```javascript
// logger.js (agregar al inicio)
const winston = require('winston');
const path = require('path');
const fs = require('fs'); // ← Agregar esto

// Crear carpeta de logs si no existe
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// ... resto de tu código ...
```

EXPLICACIÓN:
============

fs.existsSync(logDir) → Verifica si la carpeta existe
fs.mkdirSync(logDir) → Crea la carpeta si no existe

Así no tienes que recordar crear la carpeta manualmente.

¿Funcionó?
```

## Paso 2: Monitoreo de Errores con Sentry y Claude Code

Ahora vamos a subir de nivel: capturar errores automáticamente con **Sentry**.

**Tú**:
```
Claude, quiero usar Sentry para capturar errores. ¿Cómo lo configuro?
```

**Claude Code**:
```
¡Excelente elección! Sentry es INCREÍBLE para monitorear errores.
Te voy a guiar paso a paso.

PASO 1: Crear cuenta en Sentry
===============================

1. Ve a https://sentry.io
2. Regístrate (es gratis hasta 5,000 eventos/mes)
3. Crea un nuevo proyecto
4. Selecciona "Node.js/Express"
5. Copia tu DSN (una URL que Sentry te da)

El DSN se ve así:
https://abc123@o123456.ingest.sentry.io/7890123

PASO 2: Instalar Sentry SDK
============================

```bash
npm install @sentry/node @sentry/profiling-node
```

PASO 3: Configurar Sentry en tu app
====================================

Al INICIO de tu app.js (antes de cualquier otra cosa):

```javascript
// app.js
const Sentry = require("@sentry/node");
const { ProfilingIntegration } = require("@sentry/profiling-node");
const express = require('express');

const app = express();

// ✅ IMPORTANTE: Configurar Sentry AL INICIO
Sentry.init({
  dsn: process.env.SENTRY_DSN, // Tu DSN de Sentry
  integrations: [
    // Integración con Express
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Qué porcentaje de transacciones enviar (1.0 = 100%)
  tracesSampleRate: 1.0,
  // Qué porcentaje de perfiles enviar
  profilesSampleRate: 1.0,
  // Ambiente (development, production)
  environment: process.env.NODE_ENV || 'development'
});

// Middleware de Sentry (debe ir ANTES de tus rutas)
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// ---- Aquí van tus middlewares normales ----
app.use(express.json());

// ---- Aquí van tus rutas ----
app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

// Endpoint de prueba para generar un error
app.get('/debug-sentry', (req, res) => {
  throw new Error('¡Error de prueba para Sentry!');
});

// ✅ IMPORTANTE: Error handler de Sentry (DESPUÉS de tus rutas)
app.use(Sentry.Handlers.errorHandler());

// Tu error handler normal (va al final)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
```

PASO 4: Agregar DSN a .env
===========================

```env
# .env
SENTRY_DSN=https://tu-dsn-aqui@o123456.ingest.sentry.io/7890123
NODE_ENV=development
```

PASO 5: Probar que funciona
============================

Inicia tu servidor y visita:
http://localhost:3000/debug-sentry

Esto generará un error a propósito.

Ve a tu dashboard de Sentry (sentry.io) y deberías ver el error ahí!

¿QUÉ INFORMACIÓN TE DA SENTRY?
===============================

Cuando ocurre un error, Sentry te muestra:
- Stack trace completo (dónde falló)
- Valor de variables en ese momento
- Información del request (URL, headers, body)
- Navegador/OS del usuario
- Cuántas veces ha ocurrido ese error
- Gráficos de frecuencia

USO AVANZADO: Capturar errores manualmente
===========================================

Puedes capturar errores específicos:

```javascript
try {
  // Código que podría fallar
  const result = await algunaOperacionRiesgosa();
} catch (error) {
  // Enviar a Sentry con contexto adicional
  Sentry.captureException(error, {
    tags: {
      section: 'payment',
      user_type: 'premium'
    },
    extra: {
      orderId: 12345
    }
  });
}
```

ALERTAS:
========

En Sentry, puedes configurar alertas:
- Email cuando hay un nuevo error
- Slack notification
- Webhook a cualquier servicio

¿Tiene sentido? Prueba la ruta /debug-sentry y dime si ves el error en Sentry.
```

**¿Qué acabamos de lograr?**

Con la ayuda de Claude Code:
- Configuraste Sentry en minutos
- Ahora TODOS los errores se capturan automáticamente
- Recibes notificaciones cuando algo falla
- Puedes ver exactamente qué causó cada error

## Paso 3: Creando un Dashboard Simple con Claude Code

Ahora vamos a crear un dashboard básico para visualizar métricas.

**Tú**:
```
Claude, quiero crear un endpoint en mi API que me dé estadísticas básicas
de mi aplicación (cantidad de peticiones, errores, tiempo de respuesta promedio).
¿Cómo lo hago?
```

**Claude Code**:
```
¡Buena idea! Te voy a crear un sistema simple de métricas.

PASO 1: Crear un módulo de métricas
====================================

Crea un archivo metrics.js:

```javascript
// metrics.js - Sistema simple de métricas

class Metrics {
  constructor() {
    this.startTime = Date.now();
    this.requestCount = 0;
    this.errorCount = 0;
    this.responseTimes = [];
    this.endpoints = {};
  }

  // Registrar una petición
  recordRequest(endpoint, responseTime, hadError = false) {
    this.requestCount++;
    this.responseTimes.push(responseTime);

    if (hadError) {
      this.errorCount++;
    }

    // Estadísticas por endpoint
    if (!this.endpoints[endpoint]) {
      this.endpoints[endpoint] = {
        count: 0,
        errors: 0,
        responseTimes: []
      };
    }

    this.endpoints[endpoint].count++;
    this.endpoints[endpoint].responseTimes.push(responseTime);

    if (hadError) {
      this.endpoints[endpoint].errors++;
    }

    // Mantener solo las últimas 1000 mediciones
    if (this.responseTimes.length > 1000) {
      this.responseTimes.shift();
    }
  }

  // Obtener estadísticas generales
  getStats() {
    const uptime = Date.now() - this.startTime;
    const avgResponseTime = this.calculateAverage(this.responseTimes);

    return {
      uptime: this.formatUptime(uptime),
      uptimeMs: uptime,
      totalRequests: this.requestCount,
      totalErrors: this.errorCount,
      errorRate: this.requestCount > 0
        ? ((this.errorCount / this.requestCount) * 100).toFixed(2) + '%'
        : '0%',
      averageResponseTime: avgResponseTime.toFixed(2) + 'ms',
      requestsPerMinute: this.requestCount / (uptime / 60000),
      endpoints: this.getEndpointStats()
    };
  }

  // Estadísticas por endpoint
  getEndpointStats() {
    const stats = {};

    for (const [endpoint, data] of Object.entries(this.endpoints)) {
      stats[endpoint] = {
        totalRequests: data.count,
        totalErrors: data.errors,
        errorRate: ((data.errors / data.count) * 100).toFixed(2) + '%',
        averageResponseTime: this.calculateAverage(data.responseTimes).toFixed(2) + 'ms'
      };
    }

    return stats;
  }

  // Calcular promedio
  calculateAverage(arr) {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum / arr.length;
  }

  // Formatear uptime de manera legible
  formatUptime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }
}

// Exportar una instancia única (singleton)
module.exports = new Metrics();
```

PASO 2: Crear middleware para capturar métricas
================================================

```javascript
// metricsMiddleware.js

const metrics = require('./metrics');

function metricsMiddleware(req, res, next) {
  const startTime = Date.now();

  // Capturar cuando la respuesta se envía
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    const endpoint = `${req.method} ${req.route?.path || req.path}`;
    const hadError = res.statusCode >= 400;

    metrics.recordRequest(endpoint, responseTime, hadError);
  });

  next();
}

module.exports = metricsMiddleware;
```

PASO 3: Usar el middleware en tu app
=====================================

```javascript
// app.js

const express = require('express');
const metricsMiddleware = require('./metricsMiddleware');
const metrics = require('./metrics');

const app = express();

app.use(express.json());

// ✅ Agregar middleware de métricas
app.use(metricsMiddleware);

// Tus rutas normales
app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.post('/api/users', (req, res) => {
  res.json({ message: 'Usuario creado' });
});

// ✅ Endpoint para ver estadísticas
app.get('/metrics', (req, res) => {
  res.json(metrics.getStats());
});

app.listen(3000, () => {
  console.log('Servidor en puerto 3000');
});
```

PASO 4: Ver tus métricas
=========================

Haz algunas peticiones a tu API:

```bash
curl http://localhost:3000/api/users
curl http://localhost:3000/api/users -X POST
```

Luego visita: http://localhost:3000/metrics

Verás algo así:

```json
{
  "uptime": "5m 32s",
  "uptimeMs": 332000,
  "totalRequests": 24,
  "totalErrors": 2,
  "errorRate": "8.33%",
  "averageResponseTime": "12.45ms",
  "requestsPerMinute": 4.3,
  "endpoints": {
    "GET /api/users": {
      "totalRequests": 15,
      "totalErrors": 0,
      "errorRate": "0.00%",
      "averageResponseTime": "8.23ms"
    },
    "POST /api/users": {
      "totalRequests": 9,
      "totalErrors": 2,
      "errorRate": "22.22%",
      "averageResponseTime": "15.67ms"
    }
  }
}
```

¿QUÉ TE DICEN ESTAS MÉTRICAS?
==============================

- uptime: Cuánto tiempo lleva tu app corriendo
- totalRequests: Cuántas peticiones has recibido
- errorRate: Qué porcentaje son errores (quieres que sea bajo)
- averageResponseTime: Qué tan rápido respondes (menor = mejor)
- requestsPerMinute: Tráfico que estás manejando

BONUS: Dashboard HTML simple
=============================

Puedes crear una página HTML que muestre esto bonito:

```javascript
app.get('/dashboard', (req, res) => {
  const stats = metrics.getStats();

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Dashboard de Métricas</title>
      <style>
        body { font-family: Arial; padding: 20px; background: #f5f5f5; }
        .card { background: white; padding: 20px; margin: 10px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .metric { font-size: 32px; font-weight: bold; color: #333; }
        .label { color: #666; font-size: 14px; }
        .error { color: #e74c3c; }
        .success { color: #27ae60; }
      </style>
    </head>
    <body>
      <h1>📊 Dashboard de Métricas</h1>

      <div class="card">
        <div class="label">Uptime</div>
        <div class="metric">${stats.uptime}</div>
      </div>

      <div class="card">
        <div class="label">Total Peticiones</div>
        <div class="metric">${stats.totalRequests}</div>
      </div>

      <div class="card">
        <div class="label">Tasa de Error</div>
        <div class="metric ${parseFloat(stats.errorRate) > 5 ? 'error' : 'success'}">
          ${stats.errorRate}
        </div>
      </div>

      <div class="card">
        <div class="label">Tiempo de Respuesta Promedio</div>
        <div class="metric">${stats.averageResponseTime}</div>
      </div>

      <h2>Por Endpoint:</h2>
      ${Object.entries(stats.endpoints).map(([endpoint, data]) => `
        <div class="card">
          <h3>${endpoint}</h3>
          <p>Peticiones: ${data.totalRequests}</p>
          <p>Errores: ${data.totalErrors} (${data.errorRate})</p>
          <p>Tiempo promedio: ${data.averageResponseTime}</p>
        </div>
      `).join('')}

      <script>
        // Auto-refresh cada 5 segundos
        setTimeout(() => location.reload(), 5000);
      </script>
    </body>
    </html>
  `);
});
```

Ahora visita: http://localhost:3000/dashboard

¡Tendrás un dashboard en vivo que se actualiza cada 5 segundos!

¿Genial, verdad?
```

## Ejemplo Práctico Completo: Debugging en Producción con Claude Code

Imagina este escenario real: Tu aplicación está en producción y los usuarios reportan que a veces reciben errores. Vamos a usar Claude Code y las herramientas de monitorización para encontrar el problema.

**Tú**:
```
Claude, mi app está en producción y algunos usuarios dicen que obtienen
errores al crear posts. Pero yo no veo nada mal cuando lo pruebo.
¿Cómo uso los logs y métricas para encontrar el problema?
```

**Claude Code**:
```
¡Buen momento para usar tu monitorización! Te guío paso a paso.

PASO 1: Revisar los logs de errores
====================================

Busca en tu archivo logs/error.log:

```bash
cat logs/error.log | grep "post"
```

O si tienes muchos logs:

```bash
tail -100 logs/error.log
```

Busca patrones:
- ¿El error ocurre a una hora específica?
- ¿Hay un mensaje de error recurrente?
- ¿Menciona algún usuario o ID específico?

PASO 2: Ver métricas del endpoint
==================================

Ve a tu /metrics y busca el endpoint de posts:

```bash
curl http://tu-app.com/metrics | json_pp
```

Mira:
- errorRate del endpoint POST /api/posts
- Si es alto (>5%), hay un problema real
- averageResponseTime: ¿Es mucho más lento que otros endpoints?

PASO 3: Revisar Sentry
=======================

Ve a sentry.io y:
1. Busca errores relacionados con "post"
2. Mira la frecuencia: ¿Cuándo empezaron?
3. Haz click en un error para ver:
   - Stack trace completo
   - Valor de las variables
   - Request que causó el error

PASO 4: Agregar más logging
============================

Si no tienes suficiente información, agrega logs temporales:

```javascript
app.post('/api/posts', async (req, res) => {
  logger.info('=== Iniciando creación de post ===');
  logger.info('Body recibido:', JSON.stringify(req.body));
  logger.info('Usuario:', req.user?.id);

  try {
    const { title, content } = req.body;

    logger.info('Validando datos...');
    if (!title || !content) {
      logger.warn('Validación falló: faltan campos');
      return res.status(400).json({ error: 'Faltan campos' });
    }

    logger.info('Guardando en base de datos...');
    const post = await db.posts.create({ title, content });
    logger.info('Post creado exitosamente:', post.id);

    res.json({ post });

  } catch (error) {
    logger.error('ERROR en creación de post:', error.message);
    logger.error('Stack:', error.stack);
    logger.error('Body que causó el error:', JSON.stringify(req.body));

    Sentry.captureException(error, {
      tags: { endpoint: 'create_post' },
      extra: { body: req.body }
    });

    res.status(500).json({ error: 'Error creando post' });
  }
});
```

PASO 5: Reproducir el error
============================

Intenta recrear el escenario del usuario:
- Mismo navegador
- Mismos datos
- Misma hora del día

Mientras lo haces, observa los logs en tiempo real:

```bash
tail -f logs/all.log
```

Verás cada paso que tu código está ejecutando.

PASO 6: Identificar el patrón
==============================

Ejemplo de lo que podrías encontrar en los logs:

```
2024-01-15 14:23:10 info: === Iniciando creación de post ===
2024-01-15 14:23:10 info: Body recibido: {"title":"Mi post","content":"..."}
2024-01-15 14:23:10 info: Usuario: undefined
2024-01-15 14:23:10 info: Validando datos...
2024-01-15 14:23:10 info: Guardando en base de datos...
2024-01-15 14:23:11 error: ERROR en creación de post: Cannot read property 'id' of undefined
```

¡AJÁ! El problema es que req.user es undefined.

Esto significa que el middleware de autenticación no está corriendo
correctamente.

SOLUCIÓN:
=========

Verificar que el middleware de auth está ANTES de la ruta:

```javascript
// ❌ MAL
app.post('/api/posts', createPost);
app.use(authMiddleware);

// ✅ BIEN
app.use(authMiddleware);
app.post('/api/posts', createPost);
```

¿Ves el proceso? Logs → Métricas → Debugging → Solución
```

## Problemas Comunes y Soluciones

### Error 1: Los logs crecen demasiado

❌ **Problema**: El archivo logs/all.log ya tiene 2GB y tu disco se está llenando

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, mis archivos de logs están creciendo muchísimo. ¿Cómo los manejo?
```

**Claude Code**:
```
¡Buen problema de tener! Significa que tu app está siendo usada.
La solución es "log rotation" (rotación de logs).

SOLUCIÓN: Winston Daily Rotate
===============================

```bash
npm install winston-daily-rotate-file
```

Modifica tu logger.js:

```javascript
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const transport = new DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,      // Comprimir logs viejos
  maxSize: '20m',           // Máximo 20MB por archivo
  maxFiles: '14d'           // Mantener solo 14 días
});

const logger = winston.createLogger({
  transports: [
    transport,
    new winston.transports.Console()
  ]
});

module.exports = logger;
```

¿QUÉ HACE ESTO?
===============

- Crea un archivo nuevo cada día: application-2024-01-15.log
- Si un archivo llega a 20MB, crea uno nuevo
- Los archivos viejos se comprimen (application-2024-01-01.log.gz)
- Borra automáticamente archivos de más de 14 días

¡Nunca más problemas de espacio!
```

### Error 2: Sentry envía demasiadas notificaciones

❌ **Problema**: Sentry te envía 100 emails por hora

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, Sentry me está bombardeando con notificaciones. ¿Cómo lo controlo?
```

**Claude Code**:
```
Hay varias formas de controlar esto:

SOLUCIÓN 1: Configurar alertas en Sentry
=========================================

En sentry.io:
1. Ve a Settings > Alerts
2. Cambia de "Every new issue" a "Only critical"
3. O configura: "Only when error rate exceeds 10%"

SOLUCIÓN 2: Agrupar errores similares
======================================

En tu código, agrega fingerprints para agrupar errores:

```javascript
Sentry.captureException(error, {
  fingerprint: ['database-connection-error'] // Agrupa todos estos juntos
});
```

SOLUCIÓN 3: Filtrar errores conocidos
======================================

```javascript
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  beforeSend(event, hint) {
    // Ignorar errores conocidos/no importantes
    const error = hint.originalException;

    if (error && error.message) {
      // Ignorar errores de timeout menores a 5 segundos
      if (error.message.includes('timeout') && error.timeout < 5000) {
        return null; // No enviar a Sentry
      }
    }

    return event;
  }
});
```

SOLUCIÓN 4: Rate limiting en Sentry
====================================

```javascript
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  sampleRate: 0.5, // Solo enviar 50% de los errores
});
```

Útil cuando tienes MUCHO tráfico.
```

## 🎮 Ejercicios Gamificados

### Ejercicio 1: Tu Primer Sistema de Logs (100 XP)

**Objetivo**: Implementar Winston en una aplicación existente.

**Instrucciones**:
1. Toma una aplicación Express que ya tengas (o crea una simple)
2. Pídele a Claude Code: "Ayúdame a agregar Winston a mi aplicación"
3. Implementa logs en al menos 3 endpoints
4. Genera logs y revísalos

**Entregable**: Screenshot de tu archivo de logs con al menos 10 líneas.

**Bonus (50 XP)**: Configura diferentes niveles (info, warn, error) y úsalos correctamente.

### Ejercicio 2: Sentry Detective (150 XP)

**Objetivo**: Configurar Sentry y usarlo para debugging.

**Instrucciones**:
1. Configura Sentry en tu aplicación
2. Crea un endpoint que INTENCIONALMENTE genere 3 tipos diferentes de errores
3. Captura estos errores en Sentry
4. Documenta qué información te da Sentry para cada error

**Entregable**: Screenshots de tu dashboard de Sentry mostrando los 3 errores.

**Bonus (75 XP)**: Configura una alerta que te envíe email cuando ocurra un error.

### Ejercicio 3: Dashboard de Métricas (200 XP)

**Objetivo**: Crear un sistema completo de métricas.

**Instrucciones**:
1. Implementa el sistema de métricas que Claude Code te enseñó
2. Crea al menos 5 endpoints en tu API
3. Genera tráfico (usa un script para hacer peticiones automáticas)
4. Crea el dashboard HTML

**Entregable**: Video de 1 minuto mostrando tu dashboard en acción.

**Bonus (100 XP)**: Agregar gráficos en tiempo real usando Chart.js o similar.

### Ejercicio 4: Debugging Real (175 XP)

**Objetivo**: Resolver un bug usando monitorización.

**Escenario**: Claude Code te dará un código con un bug difícil de detectar.

**Instrucciones**:
1. Pídele a Claude Code: "Dame un código con un bug intermitente para practicar debugging"
2. Implementa logs y métricas
3. Encuentra el bug usando SOLO los logs (sin debugger)
4. Documenta cómo lo encontraste

**Entregable**: Documento explicando el proceso de debugging.

**Bonus (85 XP)**: Grabar un video explicando tu proceso.

### Ejercicio 5: Sistema de Monitorización Completo (300 XP)

**Objetivo**: Implementar un sistema profesional de monitorización.

**Requisitos**:
- Winston con log rotation
- Sentry para errores
- Sistema de métricas custom
- Dashboard HTML con auto-refresh
- Al menos 10 endpoints monitoreados
- Alertas configuradas

**Entregable**: Repositorio completo + video de 3 minutos demostrando todas las funcionalidades.

**Bonus (150 XP)**: Integrarlo con Slack para recibir notificaciones.

## Resumen de Esta Lección

¡Felicidades! Completaste la primera lección del módulo final. Esto es lo que aprendiste:

✅ **Qué es monitorización** y por qué es esencial para aplicaciones en producción

✅ **Configurar Winston** para logging profesional con ayuda de Claude Code

✅ **Implementar Sentry** para captura automática de errores y notificaciones

✅ **Crear un sistema de métricas** que registre tiempo de respuesta, cantidad de peticiones y tasa de errores

✅ **Construir un dashboard simple** para visualizar métricas en tiempo real

✅ **Usar logs y métricas para debugging** de problemas en producción

✅ **Manejar problemas comunes** como logs que crecen mucho o demasiadas notificaciones

✅ **Aprovechar Claude Code como tu guía** para cada paso de la configuración

Lo más importante: **Ahora sabes qué está pasando con tu aplicación en todo momento**. Ya no estás volando a ciegas. Si hay un error a las 3 AM, lo sabrás. Si tu app está lenta, verás las métricas. Si algo se rompe, Sentry te avisará.

Esto es lo que separa a un desarrollador amateur de uno profesional: **observabilidad**.

En la próxima lección, vamos a aprender sobre **Optimización de Costos y Tokens con Claude Code**: cómo ahorrar dinero usando Claude Code inteligentemente, técnicas de caché, y estrategias para reducir llamadas a la API. ¡Nos vemos ahí!
