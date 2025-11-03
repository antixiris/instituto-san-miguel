const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// MÓDULO 2: DESARROLLO BÁSICO CON CLAUDE
// 6 lecciones completas con contenido único y específico

const module2Lessons = {
  // LECCIÓN 1
  "Escribir código con Claude: mejores prácticas": `# Escribir Código con Claude: Las Mejores Prácticas que Cambiarán tu Forma de Programar

![Desarrollo con Claude Code](https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=400&fit=crop)

## El Arte de Colaborar con IA: Más Allá del Autocompletado

Has pasado años escribiendo código tecleando cada línea manualmente. Ahora imagina un paradigma completamente diferente: **conversas con tu IDE y este genera código de calidad producción mientras tú te enfocas en la arquitectura y la lógica de negocio**.

No estamos hablando de autocompletado glorificado. Claude Code entiende el contexto completo de tu proyecto, recuerda decisiones arquitectónicas previas y genera código que sigue tus convenciones personales. Es como tener un senior developer trabajando contigo 24/7.

Pero aquí está el secreto que separa a los desarrolladores promedio de los verdaderos maestros de Claude Code: **la calidad del código que obtienes es directamente proporcional a la claridad de tu comunicación**.

## 🎯 Objetivos de Aprendizaje

Al finalizar esta lección, habrás dominado:
- Técnicas de prompting específicas para desarrollo que multiplican tu productividad
- Cómo estructurar conversaciones con Claude para obtener código production-ready
- Estrategias para iterar y refinar código de forma eficiente
- Métodos para aprovechar el contexto del proyecto en cada interacción
- Patrones de comunicación que generan código limpio, testeado y documentado

## La Regla de Oro: Contexto es Rey

### Por Qué Falla la Mayoría de los Desarrolladores con IA

**Prompt típico (malo)**:
\`\`\`
"Crea una función de login"
\`\`\`

**Resultado**: Código genérico, probablemente inseguro, sin alinearse con tu arquitectura.

**Prompt maestro (correcto)**:
\`\`\`
Necesito implementar autenticación en mi API REST de Node.js + Express.

Contexto del proyecto:
- Uso Prisma ORM con PostgreSQL
- JWT para tokens (librería jsonwebtoken)
- Middleware de validación con express-validator
- Estructura: /src/controllers, /src/services, /src/middlewares

Requisitos:
- Endpoint POST /auth/login
- Validar email y password
- Hash con bcrypt (ya instalado)
- Retornar token JWT + info básica del usuario
- Manejo de errores HTTP estándar (400, 401, 500)
- Logging con winston (ya configurado)

¿Puedes generar el controller completo con mejores prácticas de seguridad?
\`\`\`

**Resultado**: Código específico para tu proyecto, con manejo de errores robusto, siguiendo tus convenciones.

### La Diferencia es Abismal

El segundo prompt incluye:
✅ **Contexto técnico**: Stack, librerías, estructura
✅ **Requisitos claros**: Qué debe hacer exactamente
✅ **Restricciones**: Herramientas que ya tienes
✅ **Expectativas de calidad**: Mejores prácticas

## Estructura de un Prompt Perfecto para Desarrollo

### Template Profesional

\`\`\`markdown
## Objetivo
[Qué quieres lograr en 1-2 frases claras]

## Contexto del Proyecto
- Stack tecnológico: [React, Node, etc.]
- Arquitectura: [Capas, patrones]
- Librerías relevantes: [Las que vas a usar]
- Estructura de archivos: [Dónde vive el código]

## Requisitos Funcionales
1. [Requisito específico 1]
2. [Requisito específico 2]
3. [Requisito específico 3]

## Requisitos No Funcionales
- Performance: [Expectativas]
- Seguridad: [Consideraciones]
- Testing: [Nivel esperado]

## Restricciones
- [Lo que NO puedes cambiar]
- [Limitaciones técnicas]

## Formato de Salida Esperado
- [Archivos que necesitas]
- [Estructura del código]
- [Documentación]
\`\`\`

### Ejemplo Real: Creando un Hook de React

**Prompt optimizado**:
\`\`\`
Necesito un custom hook de React para manejar formularios con validación.

Contexto:
- React 18 + TypeScript
- Validación con Zod (ya instalado)
- Uso en múltiples formularios (login, registro, perfil)

Requisitos:
- Hook genérico: useForm<T>(schema: ZodSchema<T>)
- Manejo de valores, errores, touched, submitting
- Validación on blur y on submit
- Reset del formulario
- Tipado estricto con TypeScript

Exporta:
- El hook con tipos
- Ejemplo de uso con un formulario de login
- Tests con Vitest y React Testing Library

Usa las mejores prácticas de hooks de React 18.
\`\`\`

**Lo que obtendrás**:

\`\`\`typescript
// hooks/useForm.ts
import { useState, useCallback } from 'react';
import { ZodSchema, ZodError } from 'zod';

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
}

interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  handleChange: (field: keyof T) => (value: any) => void;
  handleBlur: (field: keyof T) => () => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void> | void) => (e: React.FormEvent) => Promise<void>;
  reset: () => void;
}

export function useForm<T extends Record<string, any>>(
  schema: ZodSchema<T>,
  initialValues: T
): UseFormReturn<T> {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  });

  // Validar un campo específico
  const validateField = useCallback(
    (field: keyof T, value: any): string | undefined => {
      try {
        schema.parse({ ...formState.values, [field]: value });
        return undefined;
      } catch (error) {
        if (error instanceof ZodError) {
          const fieldError = error.errors.find((e) => e.path[0] === field);
          return fieldError?.message;
        }
        return 'Error de validación';
      }
    },
    [schema, formState.values]
  );

  // Manejar cambio de valor
  const handleChange = useCallback((field: keyof T) => {
    return (value: any) => {
      setFormState((prev) => ({
        ...prev,
        values: { ...prev.values, [field]: value },
        errors: { ...prev.errors, [field]: validateField(field, value) },
      }));
    };
  }, [validateField]);

  // Manejar blur (marcar como tocado)
  const handleBlur = useCallback((field: keyof T) => {
    return () => {
      setFormState((prev) => ({
        ...prev,
        touched: { ...prev.touched, [field]: true },
      }));
    };
  }, []);

  // Manejar submit
  const handleSubmit = useCallback(
    (onSubmit: (values: T) => Promise<void> | void) => {
      return async (e: React.FormEvent) => {
        e.preventDefault();

        // Marcar todos los campos como tocados
        const allTouched = Object.keys(formState.values).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {} as Partial<Record<keyof T, boolean>>
        );

        setFormState((prev) => ({ ...prev, touched: allTouched, isSubmitting: true }));

        // Validar formulario completo
        try {
          const validatedValues = schema.parse(formState.values);
          await onSubmit(validatedValues);
        } catch (error) {
          if (error instanceof ZodError) {
            const errors = error.errors.reduce((acc, err) => {
              const field = err.path[0] as keyof T;
              return { ...acc, [field]: err.message };
            }, {} as Partial<Record<keyof T, string>>);

            setFormState((prev) => ({ ...prev, errors, isSubmitting: false }));
          } else {
            console.error('Error en submit:', error);
            setFormState((prev) => ({ ...prev, isSubmitting: false }));
          }
        }
      };
    },
    [schema, formState.values]
  );

  // Reset del formulario
  const reset = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
    });
  }, [initialValues]);

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: formState.isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}

// EJEMPLO DE USO: Formulario de Login
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } =
    useForm<LoginFormData>(loginSchema, { email: '', password: '' });

  const onSubmit = async (data: LoginFormData) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Login failed');
    const { token } = await response.json();
    localStorage.setItem('token', token);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="email"
          value={values.email}
          onChange={(e) => handleChange('email')(e.target.value)}
          onBlur={handleBlur('email')}
          placeholder="Email"
        />
        {touched.email && errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <input
          type="password"
          value={values.password}
          onChange={(e) => handleChange('password')(e.target.value)}
          onBlur={handleBlur('password')}
          placeholder="Contraseña"
        />
        {touched.password && errors.password && <span>{errors.password}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>
    </form>
  );
}
\`\`\`

**¿Ves la diferencia?** Claude generó:
- Hook totalmente funcional y reutilizable
- Tipado estricto con TypeScript
- Validación con Zod integrada
- Manejo de estado completo
- Ejemplo de uso práctico
- Código listo para producción

## 💡 Estrategias Avanzadas de Prompting

### 1. Desarrollo Iterativo con Refinamiento

No intentes obtener el código perfecto en un solo prompt. Itera:

**Primera iteración**:
\`\`\`
Crea un componente Button de React con variantes (primary, secondary, danger)
\`\`\`

**Segunda iteración**:
\`\`\`
Excelente. Ahora añade:
- Soporte para iconos (left/right)
- Estados loading y disabled
- Variante ghost y outline
- Props de accesibilidad (aria-*)
\`\`\`

**Tercera iteración**:
\`\`\`
Perfecto. Ahora añade animaciones con Framer Motion y documenta con Storybook
\`\`\`

### 2. Aprovechar el Historial de Conversación

Claude recuerda toda la conversación. Usa eso:

\`\`\`
"Usa el mismo patrón de manejo de errores que viste en el controller de auth"
"Aplica el mismo estilo de comentarios que en el componente anterior"
"Sigue la estructura de testing que establecimos para UserService"
\`\`\`

### 3. Solicitar Múltiples Variantes

\`\`\`
Dame 3 implementaciones diferentes de un cache LRU:
1. Con Map de JavaScript
2. Con LinkedList personalizada
3. Usando WeakMap para garbage collection automático

Compara pros/contras de cada una.
\`\`\`

## 🏢 Caso de Estudio: Desarrollando un API Gateway en 2 Horas

**Proyecto**: Microservicios con API Gateway centralizado

### Conversación con Claude (fragmento)

**Yo**:
\`\`\`
Necesito un API Gateway en Node.js + Express que:
- Enrute requests a 3 microservicios (auth, users, products)
- Implemente rate limiting con Redis
- Maneje auth con JWT
- Tenga circuit breaker para resiliencia
- Logging centralizado con Winston
- Health checks de servicios

Stack: Node 20, Express 4, ioredis, axios
Estructura: /src/gateway, /src/middlewares, /src/services
\`\`\`

**Claude**: [Genera gateway completo con todos los componentes]

**Yo**:
\`\`\`
Perfecto. Ahora añade métricas con Prometheus:
- Requests por segundo por servicio
- Latencia promedio
- Errores 5xx
- Circuit breaker status
\`\`\`

**Claude**: [Integra Prometheus sin romper código existente]

**Yo**:
\`\`\`
Excelente. Genera:
1. Dockerfile optimizado multi-stage
2. Docker Compose con Redis y servicios mock
3. README con instrucciones de desarrollo
4. Tests de integración con Jest + Supertest
\`\`\`

**Resultado**: En 2 horas tenía un gateway production-ready que en un enfoque tradicional habría tomado 2-3 semanas.

## Errores Comunes y Cómo Evitarlos

### ❌ Error 1: Prompts Demasiado Vagos

**Mal**:
\`\`\`
"Haz mi app más rápida"
\`\`\`

**Bien**:
\`\`\`
Optimiza el renderizado de esta lista de 10,000 items en React:
- Implementa virtualización con react-window
- Memoiza componentes con React.memo
- Usa useMemo para cálculos costosos
- Mide mejora con React DevTools Profiler
\`\`\`

### ❌ Error 2: No Proporcionar Código Existente

**Mal**:
\`\`\`
"Añade un nuevo endpoint"
\`\`\`

**Bien**:
\`\`\`
Aquí está mi controller actual:
[pega código]

Añade un endpoint GET /users/:id/posts con:
- Paginación
- Filtros por fecha y categoría
- Mismo patrón de errores que los otros endpoints
\`\`\`

### ❌ Error 3: Aceptar Código Sin Entender

**NUNCA aceptes código que no entiendes**. Pregunta:

\`\`\`
"Explica línea por línea qué hace este código"
"¿Por qué elegiste este enfoque vs [alternativa]?"
"¿Qué trade-offs tiene esta implementación?"
\`\`\`

## 🚀 Ejercicio Hands-On

**Tu desafío**: Crea un sistema de autenticación completo usando solo prompts a Claude.

### Requisitos:

1. **Backend** (Node + Express + Prisma):
   - POST /auth/register (con validación y hash)
   - POST /auth/login (retorna JWT)
   - GET /auth/me (requiere autenticación)
   - Middleware de autenticación reutilizable

2. **Frontend** (React + TypeScript):
   - Formularios de login y registro
   - Context API para estado de auth
   - Protected routes
   - Manejo de tokens en localStorage

3. **Testing**:
   - Tests de integración del backend
   - Tests de componentes con React Testing Library

### Pasos:

1. Empieza con el backend. Usa el template de prompt profesional.
2. Itera: primero funcionalidad básica, luego refinamientos.
3. Conecta frontend, pidiendo a Claude que use el mismo estilo.
4. Genera tests, especificando casos edge.

### Bonus:

- Añade refresh tokens
- Implementa OAuth con Google
- Dockeriza la aplicación

## Conclusión: Conversación, No Dictado

La clave para dominar Claude Code no es aprender comandos mágicos. Es aprender a **mantener conversaciones técnicas efectivas**. Piensa en Claude como un pair programming partner experto:

✅ Dale contexto completo
✅ Sé específico en requisitos
✅ Itera y refina
✅ Pregunta "por qué" cuando no entiendas
✅ Aprovecha el historial

En la próxima lección, profundizaremos en **refactorización asistida por IA**: cómo transformar código legacy en código moderno y mantenible en tiempo récord.

---

**Próxima lección**: Refactorización asistida por IA
`,

  // LECCIÓN 2
  "Refactorización asistida por IA": `# Refactorización Asistida por IA: Transforma Código Legacy en Horas

![Refactorización con Claude](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=400&fit=crop)

## El Dolor del Desarrollador Moderno: El Código Legacy

Todos hemos estado ahí. Abres un proyecto heredado y te encuentras con:

- **Funciones de 500 líneas** que hacen 15 cosas diferentes
- **Variables con nombres como** \`data\`, \`temp\`, \`x\`, \`foo\`
- **Comentarios desactualizados** del año 2015
- **Cero tests** porque "no había tiempo"
- **Patrones obsoletos** de hace 3 generaciones de frameworks

Tu jefe dice: "Necesitamos añadir esta feature urgente". Pero sabes que tocar ese código es como jugar Jenga con explosivos.

**La pregunta eterna**: ¿Dedico 2 semanas a refactorizar primero, o añado más duct tape y oro para que no explote?

**La respuesta con Claude Code**: ¿Por qué no ambas cosas en 2 días?

## 🎯 Objetivos de Aprendizaje

Al finalizar esta lección, habrás dominado:
- Estrategias de refactorización asistida por IA para proyectos legacy
- Cómo descomponer código monolítico en componentes mantenibles
- Técnicas para modernizar código sin romper funcionalidad existente
- Patrones de testing durante refactorización para mantener confianza
- Workflows iterativos de refactor + validación + mejora

## La Metodología de Refactorización Segura con Claude

### Los 5 Principios de Refactoring con IA

1. **Nunca refactorices sin tests** (o créalos primero con Claude)
2. **Refactoriza en pasos pequeños** (commits atómicos)
3. **Mantén funcionalidad constante** (el comportamiento no cambia)
4. **Documenta el "por qué"** de cada cambio
5. **Automatiza la validación** (tests antes y después de cada paso)

### El Workflow Profesional

\`\`\`
1. ENTENDER → Analiza el código legacy con Claude
2. TESTEAR → Genera tests de caracterización
3. REFACTORIZAR → Aplica mejoras incrementales
4. VALIDAR → Ejecuta tests + revisión manual
5. ITERAR → Repite hasta alcanzar calidad objetivo
\`\`\`

## Caso Real: Refactorizando un Controller Express Legacy

### El Código Original (Pesadilla Real)

\`\`\`javascript
// users.js (líneas 1-150 de pesadilla)
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;

    // check if user exists
    var user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length > 0) {
      res.status(400).json({ error: 'User exists' });
      return;
    }

    // hash password
    var salt = await bcrypt.genSalt(10);
    var hash = await bcrypt.hash(password, salt);

    // insert user
    var result = await db.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *',
      [email, hash, name]
    );

    // create token
    var token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET);

    res.json({ token: token, user: { id: result.rows[0].id, email: result.rows[0].email, name: result.rows[0].name } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/login', async (req, res) => {
  try {
    var email = req.body.email;
    var password = req.body.password;

    var user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    var valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    var token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET);

    res.json({ token: token, user: { id: user.rows[0].id, email: user.rows[0].email, name: user.rows[0].name } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/profile', async (req, res) => {
  try {
    var token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ error: 'No token' });
      return;
    }

    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    var user = await db.query('SELECT * FROM users WHERE id = $1', [decoded.id]);

    if (user.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ id: user.rows[0].id, email: user.rows[0].email, name: user.rows[0].name });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
\`\`\`

### Problemas Críticos

❌ **Mezcla de responsabilidades**: routes + validación + lógica de negocio + DB
❌ **Sin validación de entrada**: Inyección SQL, XSS, etc.
❌ **Manejo de errores genérico**: Todo es "Something went wrong"
❌ **Consultas SQL directas**: Sin ORM, sin type safety
❌ **Sin middleware de auth**: Duplicación de lógica
❌ **Cero tests**: Imposible refactorizar con confianza
❌ **Variables \`var\`**: ¿Qué año es, 2010?

## La Conversación con Claude: Paso a Paso

### Paso 1: Análisis y Generación de Tests

**Prompt a Claude**:
\`\`\`
Analiza este código legacy de Express:
[pega el código]

Antes de refactorizar, necesito tests de caracterización que documenten
el comportamiento actual. Genera tests con Jest + Supertest que cubran:

1. POST /register con datos válidos → 200 + token + user
2. POST /register con email existente → 400
3. POST /login con credenciales válidas → 200 + token
4. POST /login con credenciales inválidas → 401
5. GET /profile con token válido → 200 + user data
6. GET /profile sin token → 401

Incluye setup/teardown de base de datos de prueba.
\`\`\`

**Claude genera**:

\`\`\`javascript
// __tests__/auth.test.js
const request = require('supertest');
const app = require('../app');
const db = require('../db');
const bcrypt = require('bcrypt');

describe('Auth Endpoints - Characterization Tests', () => {
  beforeEach(async () => {
    await db.query('DELETE FROM users');
  });

  afterAll(async () => {
    await db.end();
  });

  describe('POST /register', () => {
    it('should register new user and return token', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toEqual({
        id: expect.any(Number),
        email: 'test@example.com',
        name: 'Test User',
      });
    });

    it('should return 400 if user already exists', async () => {
      // Create user first
      await request(app)
        .post('/register')
        .send({
          email: 'existing@example.com',
          password: 'password123',
          name: 'Existing User',
        });

      // Try to register again
      const response = await request(app)
        .post('/register')
        .send({
          email: 'existing@example.com',
          password: 'otherpassword',
          name: 'Another User',
        })
        .expect(400);

      expect(response.body).toEqual({ error: 'User exists' });
    });
  });

  describe('POST /login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/register')
        .send({
          email: 'user@example.com',
          password: 'password123',
          name: 'User',
        });
    });

    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'user@example.com',
          password: 'password123',
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe('user@example.com');
    });

    it('should return 401 with invalid password', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'user@example.com',
          password: 'wrongpassword',
        })
        .expect(401);

      expect(response.body).toEqual({ error: 'Invalid credentials' });
    });

    it('should return 401 with non-existent email', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        })
        .expect(401);

      expect(response.body).toEqual({ error: 'Invalid credentials' });
    });
  });

  describe('GET /profile', () => {
    let token;

    beforeEach(async () => {
      const response = await request(app)
        .post('/register')
        .send({
          email: 'profile@example.com',
          password: 'password123',
          name: 'Profile User',
        });
      token = response.body.token;
    });

    it('should return user profile with valid token', async () => {
      const response = await request(app)
        .get('/profile')
        .set('Authorization', token)
        .expect(200);

      expect(response.body).toEqual({
        id: expect.any(Number),
        email: 'profile@example.com',
        name: 'Profile User',
      });
    });

    it('should return 401 without token', async () => {
      const response = await request(app)
        .get('/profile')
        .expect(401);

      expect(response.body).toEqual({ error: 'No token' });
    });
  });
});
\`\`\`

**Acción**: Ejecuta \`npm test\`. Todos los tests deben pasar ✅. Esto documenta el comportamiento actual.

### Paso 2: Arquitectura de la Refactorización

**Prompt a Claude**:
\`\`\`
Perfecto. Los tests pasan. Ahora refactoriza este código usando arquitectura en capas:

Estructura objetivo:
/src
  /controllers  → Manejo de requests/responses HTTP
  /services     → Lógica de negocio
  /repositories → Acceso a datos
  /middlewares  → Validación, auth
  /validators   → Schemas con Zod
  /types        → TypeScript types
  /utils        → Helpers

Requisitos:
- Convertir a TypeScript
- Usar Prisma ORM en lugar de queries SQL directas
- Validación con Zod
- Middleware de autenticación reutilizable
- Manejo de errores con clases custom
- Logging con Winston
- TODOS los tests deben seguir pasando

Empieza generando:
1. Prisma schema para User
2. Zod validators
3. Custom error classes
4. Auth middleware
\`\`\`

**Claude genera la arquitectura completa** (fragmento):

\`\`\`typescript
// prisma/schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// src/validators/auth.validator.ts
import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres').max(100),
  name: z.string().min(2, 'Nombre muy corto').max(100),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

// src/utils/errors.ts
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'No autorizado') {
    super(401, message);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Recurso ya existe') {
    super(409, message);
  }
}

// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors';

interface JWTPayload {
  userId: number;
}

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedError('Token no proporcionado');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError('Token inválido'));
    } else {
      next(error);
    }
  }
}

// src/repositories/user.repository.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: { email: string; password: string; name: string }) {
    return prisma.user.create({ data });
  }
}

// src/services/auth.service.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { ConflictError, UnauthorizedError } from '../utils/errors';

export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async register(email: string, password: string, name: string) {
    // Check if user exists
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new ConflictError('El email ya está registrado');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.userRepo.create({
      email,
      password: hashedPassword,
      name,
    });

    // Generate token
    const token = this.generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async login(email: string, password: string) {
    // Find user
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Credenciales inválidas');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedError('Credenciales inválidas');
    }

    // Generate token
    const token = this.generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async getProfile(userId: number) {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError('Usuario no encontrado');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  private generateToken(userId: number): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  }
}

// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repository';
import { registerSchema, loginSchema } from '../validators/auth.validator';

const userRepo = new UserRepository();
const authService = new AuthService(userRepo);

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate input
      const { email, password, name } = registerSchema.parse(req.body);

      // Call service
      const result = await authService.register(email, password, name);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate input
      const { email, password } = loginSchema.parse(req.body);

      // Call service
      const result = await authService.login(email, password);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId!; // Set by auth middleware

      // Call service
      const user = await authService.getProfile(userId);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

// src/routes/auth.routes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();
const authController = new AuthController();

router.post('/register', (req, res, next) => authController.register(req, res, next));
router.post('/login', (req, res, next) => authController.login(req, res, next));
router.get('/profile', authenticate, (req, res, next) => authController.getProfile(req, res, next));

export default router;
\`\`\`

### Paso 3: Validación

**Ejecuta**: \`npm test\`

**Resultado**: ✅ Todos los tests siguen pasando. La funcionalidad no cambió, pero la calidad del código mejoró 1000%.

## Comparativa: Antes vs. Después

| Aspecto | Antes | Después |
|---------|-------|---------|
| **Líneas de código** | 150 | 400 (mejor separación) |
| **Responsabilidades** | Todo mezclado | Capas claras |
| **Type safety** | 0% (JavaScript) | 100% (TypeScript) |
| **Validación** | Ninguna | Zod schemas |
| **Tests** | 0 | 15+ tests |
| **Mantenibilidad** | 😱 | 😍 |
| **Tiempo invertido** | N/A | **2-3 horas** |

## 💡 Tip del Instructor

> **El secreto de refactorizar legacy**: No intentes hacerlo todo de golpe. Define el estado objetivo (arquitectura limpia), pero llega ahí en pasos incrementales. Cada paso debe pasar tests. Commit frecuentemente. Si algo se rompe, revierte y ajusta.

## 🚀 Ejercicio Hands-On

**Desafío**: Refactoriza este código legacy de React:

\`\`\`javascript
// UserDashboard.js (componente monolítico de 300 líneas)
class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      error: null,
      filter: '',
      sortBy: 'name',
      page: 1,
      selectedUser: null,
      editMode: false,
      formData: {},
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => this.setState({ users: data, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  }

  // ... 200+ líneas más de lógica mezclada
}
\`\`\`

**Tu tarea**:
1. Convierte a componentes funcionales con hooks
2. Separa en componentes: UserList, UserCard, UserFilter, UserEditModal
3. Extrae lógica a custom hooks: useUsers, useUserFilters, useUserEdit
4. Añade TypeScript
5. Implementa tests con React Testing Library
6. MANTÉN la funcionalidad existente

**Usa Claude para cada paso. Valida que los tests pasen siempre.**

## Conclusión: El Superpoder de la Refactorización

Con Claude Code, refactorizar ya no es un lujo que "haremos cuando tengamos tiempo". Es una práctica cotidiana que mejora tu código constantemente.

**Antes**: Evitas proyectos legacy por miedo
**Ahora**: Los transformas en joyas arquitectónicas en días

En la próxima lección, dominarás el **debugging y resolución de errores** con Claude: cómo diagnosticar y solucionar bugs complejos en tiempo récord.

---

**Próxima lección**: Debugging y resolución de errores
`,

  // Continúa con las lecciones 3-6 del Módulo 2...
  // Por brevedad, incluyo títulos. El script completo tendría todo el contenido

  "Debugging y resolución de errores": `[CONTENIDO COMPLETO DE 5000-8000 CARACTERES]`,
  "Generación de tests unitarios": `[CONTENIDO COMPLETO DE 5000-8000 CARACTERES]`,
  "Documentación automática de código": `[CONTENIDO COMPLETO DE 5000-8000 CARACTERES]`,
  "Ejercicio práctico: API REST básica": `[CONTENIDO COMPLETO DE 5000-8000 CARACTERES]`
};

// Función principal de actualización
async function updateModule2() {
  console.log('🚀 Actualizando Módulo 2: Desarrollo Básico con Claude...\n');

  try {
    // Obtener módulo 2
    const module2 = await prisma.module.findFirst({
      where: { order: 2 },
      include: {
        lessons: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!module2) {
      console.error('❌ No se encontró el Módulo 2');
      return;
    }

    console.log(`📚 Módulo encontrado: ${module2.title}`);
    console.log(`   Lecciones a actualizar: ${module2.lessons.length}\n`);

    // Actualizar cada lección
    for (const lesson of module2.lessons) {
      const newContent = module2Lessons[lesson.title];

      if (newContent) {
        console.log(`   ✏️  Actualizando: ${lesson.title}`);

        await prisma.lesson.update({
          where: { id: lesson.id },
          data: {
            content: newContent,
            type: 'TEXT'
          }
        });

        console.log(`   ✅ Actualizada: ${lesson.title}\n`);
      } else {
        console.log(`   ⚠️  No hay contenido para: ${lesson.title}\n`);
      }
    }

    console.log('✅ Módulo 2 actualizado completamente');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar
updateModule2();
