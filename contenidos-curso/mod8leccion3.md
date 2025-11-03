<p><strong><em>Lección 3: Arquitectura de Proyectos Complejos con Claude Code</em></strong></p>

## Introducción

¡Bienvenido a la tercera lección del módulo final! Hasta ahora has aprendido a monitorear tu aplicación y a optimizar costos. Hoy vamos a hablar de algo que marca la diferencia entre un desarrollador junior y uno senior: **arquitectura de software**.

¿Qué es arquitectura? Imagina que estás construyendo una casa. No empiezas poniendo ladrillos al azar. Primero haces un plano: dónde va la cocina, cuántos cuartos tendrá, dónde van las tuberías, la electricidad. La **arquitectura de software** es exactamente eso, pero para tu código.

Cuando tu proyecto es pequeño (10-20 archivos), la organización no importa tanto. Pero cuando crece a cientos de archivos, miles de líneas de código, múltiples desarrolladores trabajando juntos... ahí es donde una buena arquitectura es la diferencia entre el éxito y el caos.

Y aquí viene lo increíble: **Claude Code puede ser tu arquitecto de software**. Puedes pedirle que diseñe la estructura de tu proyecto, que te sugiera patrones de diseño, que te ayude a refactorizar código desorganizado. Es como tener un arquitecto senior a tu lado guiándote en cada decisión. ¡Vamos a descubrir cómo!

## ¿Qué es Arquitectura de Software? (Explicación Simple)

Imagina dos escenarios:

**Escenario A: Casa sin planos (código desorganizado)**
- Tienes un archivo gigante de 3000 líneas llamado "app.js"
- Todo está mezclado: base de datos, lógica de negocio, rutas, validaciones
- Cuando quieres cambiar algo, tienes que buscar entre 3000 líneas
- Si otro desarrollador llega, tarda semanas en entender qué hace cada cosa
- Cada nuevo feature rompe algo existente

**Escenario B: Casa con planos (código bien arquitecturado)**
- Tu proyecto tiene carpetas lógicas: /controllers, /models, /routes, /services
- Cada archivo tiene UNA responsabilidad clara
- Si quieres cambiar cómo se guardan usuarios, sabes exactamente dónde ir
- Un nuevo desarrollador entiende la estructura en horas
- Los cambios son localizados y no rompen todo

La **arquitectura** es el plan, la organización, la estructura de tu código.

### Componentes de una Buena Arquitectura

1. **Separación de responsabilidades**: Cada parte hace UNA cosa
2. **Modularidad**: Piezas independientes que se pueden cambiar fácilmente
3. **Escalabilidad**: Fácil agregar nuevas funcionalidades
4. **Mantenibilidad**: Fácil de entender y modificar
5. **Testabilidad**: Fácil de probar cada componente

Claude Code puede ayudarte con TODOS estos aspectos.

## Cómo Claude Code te Ayuda con Arquitectura

### Tu Primera Conversación con Claude Code sobre Arquitectura

Vamos a pedirle a Claude Code que nos diseñe la arquitectura de un proyecto desde cero.

**Tú escribes en Claude Code**:
```
Hola Claude, voy a empezar un proyecto nuevo: una API REST para un sistema
de gestión de tareas (TODO app). Va a tener usuarios, autenticación, tareas,
categorías. Nunca he organizado un proyecto grande. ¿Me ayudas a diseñar
la estructura de carpetas y archivos? Usa Node.js con Express.
```

**Claude Code responde**:
```
¡Excelente! Voy a diseñarte una arquitectura profesional y escalable.
Te voy a explicar cada parte.

ARQUITECTURA RECOMENDADA: MVC + Servicios
==========================================

MVC significa Model-View-Controller. Es uno de los patrones más usados.

ESTRUCTURA DE CARPETAS:
=======================

```
todo-api/
│
├── src/
│   ├── config/           # Configuraciones
│   │   ├── database.js   # Configuración de BD
│   │   └── env.js        # Variables de entorno
│   │
│   ├── models/           # Modelos (estructura de datos)
│   │   ├── User.js
│   │   ├── Task.js
│   │   └── Category.js
│   │
│   ├── controllers/      # Controladores (manejan requests)
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── taskController.js
│   │   └── categoryController.js
│   │
│   ├── services/         # Lógica de negocio
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── taskService.js
│   │   └── categoryService.js
│   │
│   ├── routes/           # Definición de rutas
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── task.routes.js
│   │   └── category.routes.js
│   │
│   ├── middleware/       # Middlewares
│   │   ├── auth.middleware.js
│   │   ├── validation.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── utils/            # Utilidades
│   │   ├── logger.js
│   │   ├── validator.js
│   │   └── response.js
│   │
│   └── app.js            # Configuración de Express
│
├── tests/                # Tests
│   ├── unit/
│   └── integration/
│
├── docs/                 # Documentación
├── .env.example          # Ejemplo de variables de entorno
├── .gitignore
├── package.json
└── server.js             # Punto de entrada
```

EXPLICACIÓN DE CADA CARPETA:
=============================

1. CONFIG - Configuraciones
   ¿Qué va aquí? Conexiones a BD, variables de entorno, configuraciones generales
   ¿Por qué separado? Para cambiar configuraciones sin tocar lógica

2. MODELS - Modelos
   ¿Qué va aquí? La estructura de tus datos (esquemas)
   Ejemplo: Cómo se ve un User (tiene name, email, password)

3. CONTROLLERS - Controladores
   ¿Qué va aquí? Funciones que reciben requests HTTP
   Responsabilidad: Recibir datos, llamar servicios, devolver respuestas
   NO contiene lógica de negocio compleja

4. SERVICES - Servicios
   ¿Qué va aquí? La lógica de negocio
   Ejemplo: Validar que el email no exista, hashear contraseña, enviar email
   Esta es la "inteligencia" de tu app

5. ROUTES - Rutas
   ¿Qué va aquí? Definición de endpoints
   Ejemplo: POST /api/auth/login → authController.login

6. MIDDLEWARE - Middlewares
   ¿Qué va aquí? Funciones que se ejecutan antes de los controladores
   Ejemplo: Verificar que el usuario esté autenticado

7. UTILS - Utilidades
   ¿Qué va aquí? Funciones auxiliares reutilizables
   Ejemplo: Logger, validador de emails, formateador de respuestas

FLUJO DE UNA PETICIÓN:
======================

Request → Route → Middleware → Controller → Service → Model → DB
                                               ↓
Response ← Controller ← Service ← Model ← DB

Ejemplo concreto: POST /api/tasks

1. Request llega a Express
2. Route: "POST /api/tasks" → taskController.create
3. Middleware: Verificar que el usuario esté autenticado
4. Controller: Extrae datos del body
5. Service: Valida datos, crea la tarea
6. Model: Define cómo guardar en BD
7. DB: Guarda la tarea
8. Respuesta: Regresa al usuario

¿VENTAJAS DE ESTA ARQUITECTURA?
================================

✅ Separación clara de responsabilidades
✅ Fácil de testear (cada capa se prueba independiente)
✅ Fácil de mantener (sabes dónde está cada cosa)
✅ Escalable (puedes agregar features sin romper todo)
✅ Múltiples desarrolladores pueden trabajar sin pisarse

¿Quieres que te genere el código de ejemplo para cada capa?
```

**¿Ves lo valioso que es esto?**

Claude Code:
- Te diseñó una arquitectura profesional completa
- Te explicó QUÉ va en cada carpeta
- Te explicó POR QUÉ está organizado así
- Te mostró el flujo de una petición
- Te dio las ventajas de esta arquitectura

Ahora tienes un plano claro para construir tu proyecto.

## Paso 1: Generar la Estructura con Claude Code

Ahora vamos a pedirle a Claude Code que genere código de ejemplo.

**Tú**:
```
Claude, ¿puedes generarme código de ejemplo para esta arquitectura?
Empieza con un feature completo: autenticación (registro y login).
```

**Claude Code**:
```
¡Claro! Te voy a generar un ejemplo completo de autenticación siguiendo
la arquitectura que diseñamos.

1. MODEL - User.js
==================

```javascript
// src/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Hashear contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
```

EXPLICACIÓN:
- Define cómo se ve un User en la base de datos
- Método para comparar contraseñas (login)
- Hook para hashear contraseña automáticamente

2. SERVICE - authService.js
===========================

```javascript
// src/services/authService.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthService {
  // Registrar nuevo usuario
  async register(userData) {
    const { name, email, password } = userData;

    // Verificar si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Crear usuario
    const user = new User({ name, email, password });
    await user.save();

    // Generar token
    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    };
  }

  // Login
  async login(credentials) {
    const { email, password } = credentials;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token
    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    };
  }

  // Generar JWT
  generateToken(userId) {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
  }

  // Verificar token
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}

module.exports = new AuthService();
```

EXPLICACIÓN:
- Toda la lógica de autenticación está aquí
- Validaciones, hashing, generación de tokens
- NO maneja HTTP, solo lógica pura

3. CONTROLLER - authController.js
==================================

```javascript
// src/controllers/authController.js

const authService = require('../services/authService');
const logger = require('../utils/logger');

class AuthController {
  // POST /api/auth/register
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      logger.info('Intento de registro:', email);

      const result = await authService.register({
        name,
        email,
        password
      });

      logger.info('Usuario registrado exitosamente:', email);

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: result
      });

    } catch (error) {
      logger.error('Error en registro:', error.message);
      next(error);
    }
  }

  // POST /api/auth/login
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      logger.info('Intento de login:', email);

      const result = await authService.login({
        email,
        password
      });

      logger.info('Login exitoso:', email);

      res.json({
        success: true,
        message: 'Login exitoso',
        data: result
      });

    } catch (error) {
      logger.error('Error en login:', error.message);
      next(error);
    }
  }
}

module.exports = new AuthController();
```

EXPLICACIÓN:
- Maneja requests HTTP
- Extrae datos del body
- Llama al service
- Devuelve respuesta HTTP
- Maneja errores pasándolos al middleware

4. ROUTES - auth.routes.js
==========================

```javascript
// src/routes/auth.routes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validationMiddleware = require('../middleware/validation.middleware');

// POST /api/auth/register
router.post(
  '/register',
  validationMiddleware.validateRegister,
  (req, res, next) => authController.register(req, res, next)
);

// POST /api/auth/login
router.post(
  '/login',
  validationMiddleware.validateLogin,
  (req, res, next) => authController.login(req, res, next)
);

module.exports = router;
```

EXPLICACIÓN:
- Define los endpoints
- Aplica validaciones antes del controller
- Conecta ruta → validación → controller

5. MIDDLEWARE - validation.middleware.js
=========================================

```javascript
// src/middleware/validation.middleware.js

const Joi = require('joi');

class ValidationMiddleware {
  validateRegister(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Datos de registro inválidos',
        errors: error.details.map(d => d.message)
      });
    }

    next();
  }

  validateLogin(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Datos de login inválidos',
        errors: error.details.map(d => d.message)
      });
    }

    next();
  }
}

module.exports = new ValidationMiddleware();
```

6. APP.JS - Configuración de Express
=====================================

```javascript
// src/app.js

const express = require('express');
const authRoutes = require('./routes/auth.routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);

// Error handling (debe ir al final)
app.use(errorMiddleware.handleError);

module.exports = app;
```

7. SERVER.JS - Punto de entrada
================================

```javascript
// server.js

require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 3000;

// Conectar a base de datos
connectDB();

// Iniciar servidor
app.listen(PORT, () => {
  logger.info(`Servidor corriendo en puerto ${PORT}`);
});
```

¿VES LA ARQUITECTURA EN ACCIÓN?
================================

Cada archivo tiene UNA responsabilidad:
- Model: Define estructura de datos
- Service: Lógica de negocio
- Controller: Maneja HTTP
- Routes: Define endpoints
- Middleware: Validaciones
- App: Configuración
- Server: Punto de entrada

Si quieres cambiar cómo se hashea la contraseña → authService.js
Si quieres cambiar la validación → validation.middleware.js
Si quieres cambiar la respuesta HTTP → authController.js

TODO está en su lugar lógico.

¿Quieres que continúe con otro feature (tareas)?
```

## Paso 2: Patrones de Diseño con Claude Code

Ahora vamos a pedirle a Claude Code que nos explique patrones de diseño comunes.

**Tú**:
```
Claude, he oído hablar de "patrones de diseño" pero no entiendo qué son.
¿Me puedes explicar los más importantes para Node.js con ejemplos?
```

**Claude Code**:
```
¡Claro! Los patrones de diseño son como "recetas" probadas para resolver
problemas comunes. Te voy a explicar los 5 más útiles.

1. SINGLETON - Una sola instancia
==================================

PROBLEMA: Quieres que una clase tenga solo UNA instancia en toda la app.
Ejemplo: Conexión a base de datos, logger.

❌ SIN SINGLETON:
```javascript
// Cada vez que importas, creas una nueva conexión
const db1 = new Database();
const db2 = new Database(); // ← ¡Dos conexiones!
```

✅ CON SINGLETON:
```javascript
// database.js

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.connection = null;
    Database.instance = this;
  }

  connect() {
    if (!this.connection) {
      this.connection = createConnection(); // Solo una vez
      console.log('Conectado a BD');
    }
    return this.connection;
  }
}

module.exports = new Database(); // ← Exportar instancia única
```

VENTAJA: Una sola conexión, eficiente, consistente.

2. FACTORY - Crear objetos
===========================

PROBLEMA: Quieres crear diferentes tipos de objetos sin especificar
la clase exacta.

EJEMPLO: Crear diferentes tipos de notificaciones.

```javascript
// notificationFactory.js

class EmailNotification {
  send(message) {
    console.log(`📧 Enviando email: ${message}`);
  }
}

class SMSNotification {
  send(message) {
    console.log(`📱 Enviando SMS: ${message}`);
  }
}

class PushNotification {
  send(message) {
    console.log(`🔔 Enviando push: ${message}`);
  }
}

class NotificationFactory {
  create(type) {
    switch (type) {
      case 'email':
        return new EmailNotification();
      case 'sms':
        return new SMSNotification();
      case 'push':
        return new PushNotification();
      default:
        throw new Error(`Tipo desconocido: ${type}`);
    }
  }
}

// USO:
const factory = new NotificationFactory();

const emailNotif = factory.create('email');
emailNotif.send('Hola!'); // 📧 Enviando email: Hola!

const smsNotif = factory.create('sms');
smsNotif.send('Hola!'); // 📱 Enviando SMS: Hola!
```

VENTAJA: Centralizado, fácil agregar nuevos tipos.

3. MIDDLEWARE PATTERN - Cadena de funciones
============================================

PROBLEMA: Quieres ejecutar múltiples funciones en secuencia, donde
cada una puede decidir si continúa o no.

EJEMPLO: Express usa este patrón.

```javascript
// middleware.js

class MiddlewareChain {
  constructor() {
    this.middlewares = [];
  }

  use(fn) {
    this.middlewares.push(fn);
  }

  execute(context) {
    let index = 0;

    const next = () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++];
        middleware(context, next);
      }
    };

    next();
  }
}

// USO:
const chain = new MiddlewareChain();

// Middleware 1: Logging
chain.use((context, next) => {
  console.log(`📝 Request: ${context.url}`);
  next(); // Continuar a siguiente middleware
});

// Middleware 2: Autenticación
chain.use((context, next) => {
  if (context.isAuthenticated) {
    next(); // Usuario autenticado, continuar
  } else {
    console.log('❌ No autenticado');
    // NO llamar next() = detener cadena
  }
});

// Middleware 3: Handler
chain.use((context, next) => {
  console.log('✅ Procesando request');
});

chain.execute({ url: '/api/users', isAuthenticated: true });
```

VENTAJA: Flexible, modular, fácil agregar/quitar pasos.

4. REPOSITORY PATTERN - Acceso a datos
=======================================

PROBLEMA: Quieres abstraer cómo accedes a datos (BD, API, caché).

```javascript
// userRepository.js

class UserRepository {
  constructor(database) {
    this.db = database;
  }

  async findById(id) {
    return await this.db.users.findOne({ _id: id });
  }

  async findByEmail(email) {
    return await this.db.users.findOne({ email });
  }

  async create(userData) {
    return await this.db.users.create(userData);
  }

  async update(id, userData) {
    return await this.db.users.updateOne({ _id: id }, userData);
  }

  async delete(id) {
    return await this.db.users.deleteOne({ _id: id });
  }
}

// USO en service:
class UserService {
  constructor(userRepository) {
    this.userRepo = userRepository;
  }

  async getUser(id) {
    return await this.userRepo.findById(id);
  }
}
```

VENTAJA: Puedes cambiar la BD sin tocar el service.

5. DEPENDENCY INJECTION - Inyección de dependencias
====================================================

PROBLEMA: Quieres que tus clases NO dependan directamente de otras.

❌ SIN DI (acoplamiento fuerte):
```javascript
class UserService {
  constructor() {
    this.userRepo = new UserRepository(); // ← Acoplado
  }
}
```

✅ CON DI (acoplamiento débil):
```javascript
class UserService {
  constructor(userRepository) {
    this.userRepo = userRepository; // ← Inyectado
  }
}

// Al crear:
const userRepo = new UserRepository(db);
const userService = new UserService(userRepo);
```

VENTAJA: Fácil de testear, flexible.

RESUMEN DE PATRONES:
====================

- Singleton: Una sola instancia
- Factory: Crear objetos dinámicamente
- Middleware: Cadena de funciones
- Repository: Abstraer acceso a datos
- Dependency Injection: Desacoplar clases

¿Quieres ejemplos más detallados de alguno?
```

## Paso 3: Refactorizar Código Desorganizado con Claude Code

Ahora el escenario contrario: ya tienes código pero está desorganizado.

**Tú**:
```
Claude, tengo un archivo app.js de 800 líneas con todo mezclado.
¿Me ayudas a refactorizarlo siguiendo una arquitectura limpia?

Aquí está parte del código:

[pegar código desorganizado]
```

**Claude Code**:
```
¡Por supuesto! Refactorizar código desorganizado es mi especialidad.
Te voy a mostrar cómo dividirlo en una arquitectura limpia.

PASO 1: Análisis del código actual
===================================

Veo que tu app.js tiene:
- Configuración de Express
- Rutas (30+ endpoints)
- Lógica de negocio
- Queries a base de datos
- Validaciones
- Todo mezclado

Voy a reorganizarlo en capas.

PASO 2: Crear estructura de carpetas
=====================================

```bash
mkdir -p src/{config,models,controllers,services,routes,middleware,utils}
```

PASO 3: Extraer rutas
======================

ANTES (todo en app.js):
```javascript
app.post('/api/users', async (req, res) => {
  // Validación
  if (!req.body.email) {
    return res.status(400).json({ error: 'Email requerido' });
  }

  // Lógica de negocio
  const existingUser = await db.query('SELECT * FROM users WHERE email = ?', [req.body.email]);
  if (existingUser.length > 0) {
    return res.status(409).json({ error: 'Email ya existe' });
  }

  // Crear usuario
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [req.body.email, hashedPassword]);

  res.json({ message: 'Usuario creado' });
});
```

DESPUÉS (arquitectura limpia):

```javascript
// src/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser } = require('../middleware/validation');

router.post('/', validateUser, userController.create);

module.exports = router;
```

```javascript
// src/middleware/validation.js
const Joi = require('joi');

exports.validateUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
```

```javascript
// src/controllers/userController.js
const userService = require('../services/userService');
const logger = require('../utils/logger');

exports.create = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

    logger.info('Usuario creado:', user.id);

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error('Error creando usuario:', error);
    next(error);
  }
};
```

```javascript
// src/services/userService.js
const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

class UserService {
  async createUser(userData) {
    const { email, password } = userData;

    // Verificar si existe
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new Error('Email ya existe');
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await userRepository.create({
      email,
      password: hashedPassword
    });

    // NO devolver contraseña
    delete user.password;

    return user;
  }
}

module.exports = new UserService();
```

```javascript
// src/repositories/userRepository.js
const db = require('../config/database');

class UserRepository {
  async findByEmail(email) {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  async create(userData) {
    const [result] = await db.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [userData.email, userData.password]
    );

    return {
      id: result.insertId,
      email: userData.email
    };
  }
}

module.exports = new UserRepository();
```

```javascript
// src/app.js (ahora limpio)
const express = require('express');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use(errorHandler);

module.exports = app;
```

COMPARACIÓN:
============

ANTES:
- 1 archivo de 800 líneas
- Todo mezclado
- Difícil de testear
- Difícil de mantener

DESPUÉS:
- 7 archivos organizados
- Separación clara de responsabilidades
- Cada archivo se puede testear independiente
- Fácil de entender y modificar

PASOS PARA REFACTORIZAR TU CÓDIGO:
===================================

1. Identifica grupos lógicos (autenticación, usuarios, tareas)
2. Crea estructura de carpetas
3. Extrae validaciones → middleware
4. Extrae lógica de negocio → services
5. Extrae queries → repositories
6. Crea controllers
7. Crea routes
8. Limpia app.js

¿Quieres que te ayude a refactorizar una sección específica de tu código?
```

## Paso 4: Documentar Arquitectura con Claude Code

**Tú**:
```
Claude, tengo mi proyecto bien arquitecturado. ¿Me ayudas a crear
documentación para que otros desarrolladores entiendan la estructura?
```

**Claude Code**:
```
¡Excelente! La documentación es crucial. Te voy a generar documentación
completa de arquitectura.

ARCHIVO: docs/ARCHITECTURE.md
==============================

```markdown
# Arquitectura del Proyecto

## Resumen

Este proyecto sigue una arquitectura en capas basada en MVC + Servicios,
con separación clara de responsabilidades.

## Estructura de Carpetas

```
src/
├── config/         # Configuraciones y conexiones
├── models/         # Esquemas de datos (Mongoose/Sequelize)
├── repositories/   # Acceso a datos (queries)
├── services/       # Lógica de negocio
├── controllers/    # Manejadores de HTTP
├── routes/         # Definición de endpoints
├── middleware/     # Funciones intermedias
└── utils/          # Utilidades y helpers
```

## Capas y Responsabilidades

### 1. Models (Modelos)

**Responsabilidad:** Definir la estructura de datos.

**Ejemplos:**
- `User.js` - Esquema de usuario
- `Task.js` - Esquema de tarea

**Reglas:**
- NO contienen lógica de negocio compleja
- Solo definen estructura y validaciones básicas
- Métodos de instancia permitidos (ej: `comparePassword`)

### 2. Repositories (Repositorios)

**Responsabilidad:** Acceso a datos, queries.

**Ejemplos:**
- `userRepository.js` - CRUD de usuarios
- `taskRepository.js` - CRUD de tareas

**Reglas:**
- Solo operaciones de BD
- NO lógica de negocio
- Abstraen la tecnología de BD (puedes cambiar de MySQL a Postgres sin tocar services)

### 3. Services (Servicios)

**Responsabilidad:** Lógica de negocio.

**Ejemplos:**
- `authService.js` - Autenticación, generación de tokens
- `userService.js` - Operaciones con usuarios

**Reglas:**
- Contienen la "inteligencia" de la app
- Validaciones complejas
- Coordinan múltiples repositorios si es necesario
- NO manejan HTTP (no reciben req/res)

### 4. Controllers (Controladores)

**Responsabilidad:** Manejar requests HTTP.

**Ejemplos:**
- `authController.js` - Login, registro
- `userController.js` - CRUD de usuarios

**Reglas:**
- Extraen datos de req
- Llaman a services
- Devuelven respuestas HTTP
- NO contienen lógica de negocio

### 5. Routes (Rutas)

**Responsabilidad:** Definir endpoints.

**Ejemplos:**
- `auth.routes.js` - Rutas de autenticación
- `user.routes.js` - Rutas de usuarios

**Reglas:**
- Solo definición de rutas
- Aplicar middlewares
- Conectar con controllers

### 6. Middleware

**Responsabilidad:** Funciones que se ejecutan antes de controllers.

**Ejemplos:**
- `auth.middleware.js` - Verificar JWT
- `validation.middleware.js` - Validar datos

**Reglas:**
- Una responsabilidad por middleware
- Llamar next() para continuar
- Enviar error si no pasa validación

## Flujo de Datos

```
Request
  ↓
Route (define endpoint)
  ↓
Middleware (auth, validación)
  ↓
Controller (extrae datos)
  ↓
Service (lógica de negocio)
  ↓
Repository (query a BD)
  ↓
Model (estructura de datos)
  ↓
Database
  ↓
Response (camino inverso)
```

## Ejemplo Completo

POST /api/tasks

1. **Route:** Define que POST /api/tasks → taskController.create
2. **Middleware auth:** Verifica JWT
3. **Middleware validation:** Valida body
4. **Controller:** Extrae title, description del body
5. **Service:** Valida que el título no esté duplicado
6. **Repository:** INSERT en tabla tasks
7. **Model:** Define cómo se guarda
8. **Response:** 201 Created con la tarea creada

## Convenciones

### Nombres de Archivos
- PascalCase para clases: `User.js`, `Task.js`
- camelCase para instancias: `userService.js`, `taskController.js`
- Plural para carpetas: `controllers/`, `services/`

### Nombres de Funciones
- Controllers: `create`, `findAll`, `findOne`, `update`, `delete`
- Services: `createUser`, `findUserByEmail`, `updateUserPassword`
- Repositories: `create`, `findById`, `findByEmail`, `update`, `delete`

### Manejo de Errores
- Services lanzan errores: `throw new Error('...')`
- Controllers los capturan y pasan a middleware: `next(error)`
- Middleware de error los formatea y devuelve

## Testing

Cada capa se testea independientemente:

- **Models:** Tests de validación
- **Repositories:** Tests con BD de prueba
- **Services:** Tests unitarios (mockear repositorios)
- **Controllers:** Tests de integración
- **Routes:** Tests end-to-end

## Agregar Nuevo Feature

Checklist para agregar un nuevo feature (ej: "Comments"):

1. ✅ Crear modelo: `src/models/Comment.js`
2. ✅ Crear repositorio: `src/repositories/commentRepository.js`
3. ✅ Crear servicio: `src/services/commentService.js`
4. ✅ Crear controller: `src/controllers/commentController.js`
5. ✅ Crear rutas: `src/routes/comment.routes.js`
6. ✅ Registrar rutas en `app.js`
7. ✅ Agregar tests
8. ✅ Actualizar documentación

## Recursos

- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Node.js Design Patterns](https://www.nodejsdesignpatterns.com/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
```

ARCHIVO: docs/CONTRIBUTING.md
==============================

```markdown
# Guía de Contribución

## Setup del Proyecto

```bash
# Clonar repositorio
git clone <repo-url>

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Ejecutar migraciones
npm run migrate

# Iniciar en modo desarrollo
npm run dev
```

## Estructura de Commits

Usamos Conventional Commits:

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `refactor:` Refactorización
- `test:` Agregar tests

Ejemplo:
```
feat(auth): agregar login con Google
fix(users): corregir validación de email
docs(api): actualizar endpoints de tareas
```

## Proceso de Desarrollo

1. Crear rama desde `develop`:
   ```bash
   git checkout -b feat/nueva-funcionalidad
   ```

2. Desarrollar siguiendo la arquitectura

3. Agregar tests

4. Ejecutar tests localmente:
   ```bash
   npm test
   ```

5. Hacer commit:
   ```bash
   git commit -m "feat(tasks): agregar filtro por categoría"
   ```

6. Push y crear Pull Request

7. Esperar revisión

## Estándares de Código

### ESLint
```bash
npm run lint
```

### Prettier
```bash
npm run format
```

### Tests
```bash
npm test
```

Todo debe pasar antes de hacer merge.

## Arquitectura

Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para entender la estructura.

SIEMPRE seguir el patrón:
Route → Middleware → Controller → Service → Repository → Model

## Preguntas

Si tienes dudas sobre la arquitectura, pregunta en el canal de Slack
o abre un issue con la etiqueta `question`.
```

¿Te ayuda esta documentación?
```

## Problemas Comunes y Soluciones

### Error 1: No sé dónde poner mi código

❌ **Problema**: Tengo una función pero no sé si va en controller o service

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, tengo esta función que envía un email de bienvenida cuando se
registra un usuario. ¿Va en el controller o en el service?

async function sendWelcomeEmail(user) {
  // código para enviar email
}
```

**Claude Code**:
```
¡Buena pregunta! Vamos a aplicar la regla de responsabilidades.

ANÁLISIS:
=========

¿Es lógica de negocio? SÍ
¿Maneja HTTP? NO
¿Accede a la BD? NO

RESPUESTA: Va en el SERVICE

IMPLEMENTACIÓN CORRECTA:
========================

```javascript
// src/services/userService.js

const emailService = require('./emailService');

class UserService {
  async createUser(userData) {
    // 1. Crear usuario en BD
    const user = await userRepository.create(userData);

    // 2. Enviar email de bienvenida (lógica de negocio)
    await emailService.sendWelcome(user.email, user.name);

    return user;
  }
}
```

```javascript
// src/services/emailService.js

class EmailService {
  async sendWelcome(email, name) {
    // Lógica para enviar email
    console.log(`Enviando email de bienvenida a ${email}`);
  }
}

module.exports = new EmailService();
```

REGLA GENERAL:
==============

Controller: Si toca req/res
Service: Si es lógica de negocio
Repository: Si hace query a BD
Middleware: Si valida/autentica
Util: Si es función auxiliar reutilizable

¿Tiene sentido?
```

## 🎮 Ejercicios Gamificados

### Ejercicio 1: Arquitectura desde Cero (150 XP)

**Objetivo**: Diseñar arquitectura completa para un proyecto nuevo.

**Instrucciones**:
1. Pídele a Claude Code que diseñe arquitectura para un blog
2. Implementa la estructura de carpetas
3. Crea un feature completo (posts) con todas las capas
4. Documenta la arquitectura

**Entregable**: Repositorio con estructura completa.

**Bonus (75 XP)**: Agregar diagrams de flujo de datos.

### Ejercicio 2: Refactorización (200 XP)

**Objetivo**: Refactorizar código desorganizado.

**Instrucciones**:
1. Claude Code te dará un archivo monolítico de 500 líneas
2. Refactorízalo en arquitectura limpia
3. Documenta qué mejoraste
4. Compara antes/después

**Entregable**: Pull request mostrando cambios.

**Bonus (100 XP)**: Agregar tests para el código refactorizado.

### Ejercicio 3: Implementar Patrón de Diseño (175 XP)

**Objetivo**: Aplicar un patrón de diseño.

**Instrucciones**:
1. Elige un patrón (Singleton, Factory, Repository)
2. Pídele ejemplos a Claude Code
3. Implementa el patrón en tu proyecto
4. Explica por qué lo elegiste

**Entregable**: Código + documento explicativo.

**Bonus (85 XP)**: Implementar 3 patrones diferentes.

### Ejercicio 4: Documentación de Arquitectura (150 XP)

**Objetivo**: Crear documentación completa.

**Instrucciones**:
1. Toma un proyecto existente
2. Pídele a Claude Code que genere documentación
3. Crea ARCHITECTURE.md y CONTRIBUTING.md
4. Agrega diagramas

**Entregable**: Documentación completa.

**Bonus (75 XP)**: Video explicando la arquitectura.

### Ejercicio 5: Arquitectura Escalable (300 XP)

**Objetivo**: Diseñar arquitectura para aplicación grande.

**Requisitos**:
- Mínimo 5 features
- Arquitectura en capas
- Patrones de diseño aplicados
- Tests en todas las capas
- Documentación completa
- CI/CD configurado

**Entregable**: Aplicación completa funcionando.

**Bonus (150 XP)**: Microservicios (dividir en múltiples apps).

## Resumen de Esta Lección

¡Felicidades! Completaste la lección de arquitectura. Esto es lo que aprendiste:

✅ **Qué es arquitectura de software** y por qué es crucial para proyectos grandes

✅ **Diseñar estructura de carpetas profesional** con separación clara de responsabilidades

✅ **Arquitectura MVC + Servicios** con capas bien definidas (models, services, controllers, routes)

✅ **Patrones de diseño comunes** (Singleton, Factory, Middleware, Repository, Dependency Injection)

✅ **Refactorizar código desorganizado** en arquitectura limpia con ayuda de Claude Code

✅ **Documentar arquitectura** para que otros desarrolladores entiendan el proyecto

✅ **Usar Claude Code como arquitecto** para diseñar, implementar y mantener buena estructura

Lo más importante: **Una buena arquitectura es la diferencia entre un proyecto mantenible y un desastre**. Claude Code puede ser tu mentor en arquitectura, guiándote en cada decisión de diseño.

Proyectos bien arquitecturados son:
- Más fáciles de entender
- Más fáciles de modificar
- Más fáciles de testear
- Más fáciles de escalar
- Más fáciles de trabajar en equipo

En la próxima lección, vamos a aprender sobre **Memory y Knowledge Management con Claude Code**: cómo hacer que Claude Code "recuerde" información importante de tu proyecto, configurar contexto persistente, y usar RAG para mejorar las respuestas. ¡Nos vemos ahí!
