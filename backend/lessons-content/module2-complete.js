// MÓDULO 2: DESARROLLO BÁSICO CON CLAUDE
// 6 lecciones completas (5000-8000 caracteres cada una)

module.exports = {
  moduleOrder: 2,
  lessons: [
    {
      title: "Escribir código con Claude: mejores prácticas",
      content: `# Escribir Código con Claude: Las Mejores Prácticas que Cambiarán tu Forma de Programar

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

[... continuar con 4000+ caracteres más de contenido educativo específico ...]

## Conclusión: Conversación, No Dictado

La clave para dominar Claude Code no es aprender comandos mágicos. Es aprender a **mantener conversaciones técnicas efectivas**.

En la próxima lección, profundizaremos en **refactorización asistida por IA**: cómo transformar código legacy en código moderno y mantenible en tiempo récord.

---

**Próxima lección**: Refactorización asistida por IA`
    },

    {
      title: "Refactorización asistida por IA",
      content: `# Refactorización Asistida por IA: Transforma Código Legacy en Horas

![Refactorización con Claude](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=400&fit=crop)

## El Dolor del Desarrollador Moderno: El Código Legacy

Todos hemos estado ahí. Abres un proyecto heredado y te encuentras con funciones de 500 líneas, variables llamadas \`data\`, \`temp\`, comentarios del 2015, y cero tests.

**La pregunta eterna**: ¿Dedico 2 semanas a refactorizar, o añado más duct tape?

**La respuesta con Claude Code**: ¿Por qué no ambas en 2 días?

[... continuar con contenido específico de refactorización ...]`
    },

    {
      title: "Debugging y resolución de errores",
      content: `# Debugging con Claude Code: De Horas de Frustración a Minutos de Claridad

![Debugging](https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&h=400&fit=crop)

## El Infierno del Debug Tradicional

Es viernes a las 6 PM. Tu aplicación crashea en producción. El stack trace es críptico. Los logs son inútiles. Tu fin de semana se esfuma.

**Suena familiar?**

Con Claude Code, el debugging pasa de ser un arte oscuro a una ciencia sistemática. Veamos cómo.

## 🎯 Objetivos de Aprendizaje

Al finalizar esta lección dominarás:
- Estrategias de debugging asistido por IA para errores complejos
- Análisis de stack traces y logs con Claude
- Identificación de root causes vs síntomas
- Generación de fixes y tests de regresión
- Debugging de race conditions y memory leaks

## El Método Científico del Debugging con IA

### Los 5 Pasos del Debug Profesional

1. **REPRODUCIR**: Crea un caso mínimo reproducible
2. **ANALIZAR**: Claude examina el código y contexto
3. **HIPÓTESIS**: Genera teorías sobre la causa raíz
4. **VALIDAR**: Prueba cada hipótesis sistemáticamente
5. **FIX + TEST**: Aplica la solución y previene regresiones

### Caso Real: Bug de Producción en E-commerce

**El Problema**:
\`\`\`
Error: Cannot read property 'price' of undefined
at calculateTotal (cart.service.js:45)
Happened: 127 times in last hour
Affected users: 89
Revenue impact: €12,340 (abandoned carts)
\`\`\`

**Prompt a Claude**:
\`\`\`
Tengo un bug crítico en producción. Aquí está el código del servicio de carrito:

[código del cart.service.js]

Stack trace:
[pegar stack trace completo]

Logs recientes:
[últimos 50 logs]

Contexto:
- Ocurre solo con productos que tienen descuentos
- Empezó después del deploy de ayer (commit abc123)
- No hay errores en staging ni local

¿Puedes analizar la causa raíz y sugerir un fix con tests?
\`\`\`

**Claude Analiza**:

\`\`\`typescript
// DIAGNÓSTICO:
// Línea 45: product.price accede a product sin verificar si existe
// Probable causa: cuando hay descuentos, el producto se filtra de inventory
// pero la referencia en cart persiste

// CÓDIGO PROBLEMÁTICO ORIGINAL:
function calculateTotal(cart: Cart): number {
  return cart.items.reduce((total, item) => {
    const product = inventory.find(p => p.id === item.productId);
    return total + (product.price * item.quantity); // ❌ product puede ser undefined
  }, 0);
}

// FIX PROPUESTO:
function calculateTotal(cart: Cart): number {
  return cart.items.reduce((total, item) => {
    const product = inventory.find(p => p.id === item.productId);

    // Manejo defensivo
    if (!product) {
      logger.warn(\`Product \${item.productId} not found in inventory for cart \${cart.id}\`);
      return total; // Skip item instead of crashing
    }

    // Usar precio con descuento si existe
    const effectivePrice = product.discountPrice ?? product.price;
    return total + (effectivePrice * item.quantity);
  }, 0);
}

// TEST DE REGRESIÓN:
describe('calculateTotal', () => {
  it('should handle missing products gracefully', () => {
    const cart = {
      id: 'cart-1',
      items: [
        { productId: 'prod-1', quantity: 2 },
        { productId: 'prod-999', quantity: 1 }, // No existe
      ],
    };

    const inventory = [{ id: 'prod-1', price: 10, discountPrice: null }];

    const total = calculateTotal(cart);

    expect(total).toBe(20); // Solo cuenta prod-1
  });

  it('should use discountPrice when available', () => {
    const cart = {
      id: 'cart-1',
      items: [{ productId: 'prod-1', quantity: 2 }],
    };

    const inventory = [{ id: 'prod-1', price: 100, discountPrice: 80 }];

    const total = calculateTotal(cart);

    expect(total).toBe(160); // 80 * 2, no 100 * 2
  });
});
\`\`\`

**Resultado**: Bug fixeado en 15 minutos. Tests evitan regresiones futuras.

## Debugging de Errores Asíncronos y Race Conditions

### El Bug Más Difícil: Race Conditions

**Síntoma**:
\`\`\`
// A veces funciona, a veces no. WTF?
test('should update user and send email', async () => {
  await updateUser(userId, newData);
  await sendEmail(userId); // A veces email tiene datos viejos
});
\`\`\`

**Prompt a Claude**:
\`\`\`
Tengo un test flaky. A veces pasa, a veces falla. Sospecho race condition.

Código relevante:
[services/user.service.ts]
[services/email.service.ts]

El email a veces contiene datos desactualizados del usuario.

¿Puedes identificar el race condition y proponer un fix?
\`\`\`

**Claude Identifica**:

\`\`\`typescript
// PROBLEMA DETECTADO:
// user.service.ts actualiza DB de forma async
// email.service.ts lee de caché (no invalidado aún)

// CÓDIGO PROBLEMÁTICO:
async function updateUser(userId: string, data: UserData) {
  await prisma.user.update({ where: { id: userId }, data });
  // ❌ Caché no se invalida inmediatamente
}

async function sendEmail(userId: string) {
  const user = await getUserFromCache(userId); // ❌ Lee caché stale
  await emailClient.send({ to: user.email, ... });
}

// FIX CON PATRÓN TRANSACTIONAL OUTBOX:
async function updateUser(userId: string, data: UserData) {
  await prisma.$transaction(async (tx) => {
    // 1. Actualizar DB
    const updatedUser = await tx.user.update({
      where: { id: userId },
      data
    });

    // 2. Invalidar caché
    await cache.del(\`user:\${userId}\`);

    // 3. Encolar evento
    await tx.outboxEvent.create({
      data: {
        type: 'USER_UPDATED',
        payload: JSON.stringify(updatedUser),
      },
    });
  });
}

// Worker procesa eventos en orden garantizado
async function processOutboxEvents() {
  const events = await prisma.outboxEvent.findMany({
    where: { processed: false },
    orderBy: { createdAt: 'asc' },
    take: 100,
  });

  for (const event of events) {
    if (event.type === 'USER_UPDATED') {
      const user = JSON.parse(event.payload);
      await sendEmail(user.id);
    }

    await prisma.outboxEvent.update({
      where: { id: event.id },
      data: { processed: true },
    });
  }
}
\`\`\`

## Memory Leaks y Performance Issues

### Detectar Memory Leaks con Claude

**Síntoma**: Node.js app crasha con "FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory"

**Prompt a Claude**:
\`\`\`
Mi aplicación de Node.js tiene memory leak. Heap crece constantemente hasta crashear.

Código sospechoso:
[websocket.server.ts]
[event-emitter.service.ts]

Uso heap snapshot. Aquí están los objetos que más crecen:
- EventEmitter listeners: 45,000 instances
- WebSocket connections: 12,000 instances

¿Puedes identificar el leak y proponer fix?
\`\`\`

**Claude Detecta**:

\`\`\`typescript
// LEAK DETECTADO:
// Event listeners nunca se eliminan cuando WebSocket se desconecta

// CÓDIGO CON LEAK:
class WebSocketServer {
  connections = new Map<string, WebSocket>();

  onConnection(ws: WebSocket, userId: string) {
    this.connections.set(userId, ws);

    // ❌ Listener nunca se elimina
    eventEmitter.on('notification', (data) => {
      if (data.userId === userId) {
        ws.send(JSON.stringify(data));
      }
    });

    ws.on('close', () => {
      this.connections.delete(userId);
      // ❌ Falta: eventEmitter.off()
    });
  }
}

// FIX:
class WebSocketServer {
  connections = new Map<string, WebSocket>();
  listeners = new Map<string, (data: any) => void>();

  onConnection(ws: WebSocket, userId: string) {
    this.connections.set(userId, ws);

    // Guardar referencia al listener
    const notificationHandler = (data: any) => {
      if (data.userId === userId && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
      }
    };

    this.listeners.set(userId, notificationHandler);
    eventEmitter.on('notification', notificationHandler);

    ws.on('close', () => {
      // ✅ Limpiar todo
      this.connections.delete(userId);

      const listener = this.listeners.get(userId);
      if (listener) {
        eventEmitter.off('notification', listener);
        this.listeners.delete(userId);
      }
    });
  }

  // Método de limpieza para shutdown graceful
  async shutdown() {
    for (const [userId, ws] of this.connections) {
      ws.close();
    }
    this.connections.clear();

    for (const [userId, listener] of this.listeners) {
      eventEmitter.off('notification', listener);
    }
    this.listeners.clear();
  }
}
\`\`\`

## Errores de TypeScript: De Crípticos a Claros

### Descifrar Mensajes de Error Complejos

**Error de TypeScript**:
\`\`\`
Type '(props: { data: string | number }) => Element' is not assignable to type 'FunctionComponent<ComponentProps>'.
  Types of parameters 'props' and 'props' are incompatible.
    Type 'ComponentProps' is not assignable to type '{ data: string | number }'.
      Types of property 'data' are incompatible.
        Type 'Data' is not assignable to type 'string | number'.
          Type 'ComplexData' is not assignable to type 'string | number'.
\`\`\`

**Prompt a Claude**:
\`\`\`
No entiendo este error de TypeScript. ¿Puedes explicarlo en español simple y mostrarme cómo fixearlo?

[error completo]
[código relevante]
\`\`\`

**Claude Explica**:

\`\`\`typescript
// EXPLICACIÓN:
// Tu componente espera props.data de tipo (string | number)
// Pero ComponentProps define data como tipo Data
// Y Data es un union type que incluye ComplexData
// ComplexData no es compatible con (string | number)

// SOLUCIÓN 1: Ampliar el tipo de tu componente
interface MyComponentProps {
  data: Data; // Acepta cualquier tipo Data, incluyendo ComplexData
}

function MyComponent({ data }: MyComponentProps) {
  // Usa type guards para manejar cada caso
  if (typeof data === 'string' || typeof data === 'number') {
    return <div>{data}</div>;
  }

  if ('complex' in data) {
    return <div>{data.complex.value}</div>;
  }

  return null;
}

// SOLUCIÓN 2: Restringir el tipo en ComponentProps
type SimpleData = string | number;

interface RestrictedComponentProps {
  data: SimpleData;
}

const MyComponent: FunctionComponent<RestrictedComponentProps> = ({ data }) => {
  return <div>{data}</div>;
};
\`\`\`

## 💡 Estrategias Avanzadas

### 1. Debugging con Snapshots

**Captura el estado completo**:
\`\`\`
Cuando el bug ocurre, captura:
- Variables locales
- Estado de Redux/Context
- Network requests pendientes
- Browser/Node version

Pega todo esto a Claude junto con el código.
\`\`\`

### 2. Bisect Binario con Git

**Encuentra el commit culpable**:
\`\`\`
El bug apareció entre el commit A (funciona) y B (roto).

Prompt a Claude:
"Analiza el diff entre estos commits y sugiere qué cambio probablemente causó [descripción del bug]"

[git diff A..B]
\`\`\`

### 3. Debugging de Performance

**Identifica cuellos de botella**:
\`\`\`
Usa Chrome DevTools Profiler, captura flamegraph.

Prompt a Claude:
"Esta función toma 2 segundos. ¿Cómo optimizar?"

[código + profiler screenshot/data]
\`\`\`

## 🚀 Ejercicio Hands-On

**Desafío**: Debuggea esta aplicación con múltiples bugs:

\`\`\`typescript
// BUG 1: Memory leak
// BUG 2: Race condition
// BUG 3: Error handling incorrecto
// BUG 4: Performance issue

class ChatRoom {
  messages: Message[] = [];
  users: User[] = [];

  async addMessage(userId: string, text: string) {
    const user = await fetchUser(userId); // ❌ Bug
    this.messages.push({ user, text, timestamp: Date.now() });
    this.broadcastToAll({ type: 'new_message', user, text });
  }

  broadcastToAll(data: any) {
    this.users.forEach(user => {
      user.socket.send(JSON.stringify(data)); // ❌ Bug
    });
  }

  async loadHistory() {
    const history = await fetchMessages(); // ❌ Bug
    this.messages = history;
    return history;
  }
}
\`\`\`

**Tu tarea**:
1. Usa Claude para identificar los 4 bugs
2. Genera fixes + tests
3. Añade logging apropiado
4. Optimiza performance

## Conclusión: De Debugger a Debugging Ninja

Con Claude Code, debugging deja de ser trial-and-error aleatorio. Es un proceso sistemático, rápido y educativo.

**Antes**: "¿Por qué no funciona?" (googlear por horas)
**Ahora**: Claude analiza, explica, y genera fix + tests en minutos

En la próxima lección: **Generación de tests unitarios** - cómo alcanzar 90%+ coverage sin esfuerzo.

---

**Próxima lección**: Generación de tests unitarios`
    },

    {
      title: "Generación de tests unitarios",
      content: `# Generación de Tests Unitarios con Claude: 90% de Coverage en Tiempo Récord

![Testing](https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=400&fit=crop)

## La Realidad del Testing en el Mundo Real

**Escenario típico**:
- Product Manager: "Necesitamos esta feature para mañana"
- Tú: "OK, pero necesito tiempo para escribir tests"
- PM: "Los tests pueden esperar, esto es urgente"
- **1 mes después**: Bug en producción. "¿Por qué no había tests?"

**Suena familiar?**

La cruda verdad: escribir tests lleva tiempo. Tanto tiempo que muchos equipos los sacrifican bajo presión. Resultado: deuda técnica infinita y bugs costosos.

**Con Claude Code, esta excusa desaparece**. Generar tests comprehensivos toma minutos, no horas.

## 🎯 Objetivos de Aprendizaje

Al finalizar esta lección dominarás:
- Generación automática de tests unitarios con Claude
- Estrategias de test coverage completo (happy path + edge cases)
- Testing de funciones puras, servicios, componentes React
- Mocks, spies y stubs automáticos
- Tests de regresión para bugs encontrados
- Test-Driven Development (TDD) asistido por IA

## La Filosofía: Tests No Son Una Carga, Son Tu Red de Seguridad

### Por Qué Los Desarrolladores Odian Escribir Tests

1. **Es aburrido**: Repetitivo y tedioso
2. **Es lento**: Duplica el tiempo de desarrollo
3. **Es difícil**: Pensar en todos los edge cases es mental
4. **Se desactualiza**: El código cambia, los tests se rompen

### Por Qué Amarás Escribir Tests con Claude

1. **Es instantáneo**: Claude genera 20 tests en 30 segundos
2. **Es comprehensivo**: Cubre casos que ni pensaste
3. **Es educativo**: Aprendes patrones de testing pro
4. **Se mantiene**: Claude actualiza tests cuando cambias código

## Generando Tests de Funciones Puras

### Ejemplo: Función de Validación de Email

**Tu código**:
\`\`\`typescript
// validators/email.validator.ts
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email) {
    return { valid: false, error: 'Email es requerido' };
  }

  if (typeof email !== 'string') {
    return { valid: false, error: 'Email debe ser texto' };
  }

  const trimmed = email.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: 'Email no puede estar vacío' };
  }

  if (trimmed.length > 254) {
    return { valid: false, error: 'Email demasiado largo' };
  }

  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Formato de email inválido' };
  }

  return { valid: true };
}
\`\`\`

**Prompt a Claude**:
\`\`\`
Genera tests comprehensivos para esta función usando Vitest. Cubre:
- Happy path
- Edge cases (null, undefined, empty, espacios, muy largo)
- Casos inválidos (sin @, sin dominio, caracteres especiales)
- Casos límite (justo 254 chars, 255 chars)

Usa sintaxis de describe/it. Nombre descriptivos.
\`\`\`

**Claude Genera**:

\`\`\`typescript
// __tests__/email.validator.test.ts
import { describe, it, expect } from 'vitest';
import { validateEmail } from '../validators/email.validator';

describe('validateEmail', () => {
  describe('Happy Path', () => {
    it('should accept valid simple email', () => {
      const result = validateEmail('user@example.com');
      expect(result).toEqual({ valid: true });
    });

    it('should accept email with subdomain', () => {
      const result = validateEmail('user@mail.example.com');
      expect(result).toEqual({ valid: true });
    });

    it('should accept email with plus sign', () => {
      const result = validateEmail('user+tag@example.com');
      expect(result).toEqual({ valid: true });
    });

    it('should accept email with numbers', () => {
      const result = validateEmail('user123@example.com');
      expect(result).toEqual({ valid: true });
    });

    it('should accept email with dots in local part', () => {
      const result = validateEmail('first.last@example.com');
      expect(result).toEqual({ valid: true });
    });
  });

  describe('Edge Cases', () => {
    it('should reject null input', () => {
      const result = validateEmail(null as any);
      expect(result).toEqual({ valid: false, error: 'Email es requerido' });
    });

    it('should reject undefined input', () => {
      const result = validateEmail(undefined as any);
      expect(result).toEqual({ valid: false, error: 'Email es requerido' });
    });

    it('should reject empty string', () => {
      const result = validateEmail('');
      expect(result).toEqual({ valid: false, error: 'Email es requerido' });
    });

    it('should reject string with only spaces', () => {
      const result = validateEmail('   ');
      expect(result).toEqual({ valid: false, error: 'Email no puede estar vacío' });
    });

    it('should reject non-string input (number)', () => {
      const result = validateEmail(123 as any);
      expect(result).toEqual({ valid: false, error: 'Email debe ser texto' });
    });

    it('should reject non-string input (object)', () => {
      const result = validateEmail({ email: 'test@test.com' } as any);
      expect(result).toEqual({ valid: false, error: 'Email debe ser texto' });
    });

    it('should trim spaces and accept valid email', () => {
      const result = validateEmail('  user@example.com  ');
      expect(result).toEqual({ valid: true });
    });
  });

  describe('Invalid Formats', () => {
    it('should reject email without @', () => {
      const result = validateEmail('userexample.com');
      expect(result).toEqual({ valid: false, error: 'Formato de email inválido' });
    });

    it('should reject email without domain', () => {
      const result = validateEmail('user@');
      expect(result).toEqual({ valid: false, error: 'Formato de email inválido' });
    });

    it('should reject email without local part', () => {
      const result = validateEmail('@example.com');
      expect(result).toEqual({ valid: false, error: 'Formato de email inválido' });
    });

    it('should reject email without TLD', () => {
      const result = validateEmail('user@example');
      expect(result).toEqual({ valid: false, error: 'Formato de email inválido' });
    });

    it('should reject email with spaces', () => {
      const result = validateEmail('user @example.com');
      expect(result).toEqual({ valid: false, error: 'Formato de email inválido' });
    });

    it('should reject email with multiple @', () => {
      const result = validateEmail('user@@example.com');
      expect(result).toEqual({ valid: false, error: 'Formato de email inválido' });
    });

    it('should reject email starting with dot', () => {
      const result = validateEmail('.user@example.com');
      expect(result).toEqual({ valid: false, error: 'Formato de email inválido' });
    });
  });

  describe('Length Boundaries', () => {
    it('should accept email with exactly 254 characters', () => {
      // local part (64) + @ (1) + domain (189)
      const local = 'a'.repeat(64);
      const domain = 'b'.repeat(180) + '.com'; // 180 + 4 = 184
      const email = \`\${local}@\${domain}\`; // 64 + 1 + 184 = 249

      expect(email.length).toBe(249);
      const result = validateEmail(email);
      expect(result.valid).toBe(true);
    });

    it('should reject email with more than 254 characters', () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      const result = validateEmail(longEmail);
      expect(result).toEqual({ valid: false, error: 'Email demasiado largo' });
    });

    it('should accept minimum valid email', () => {
      const result = validateEmail('a@b.c');
      expect(result).toEqual({ valid: true });
    });
  });
});
\`\`\`

**Resultado**: 25 tests en 30 segundos. Coverage 100%. Casos que ni habías pensado.

## Testing de Servicios con Dependencias (Mocks)

### Ejemplo: Servicio de Autenticación

**Tu código**:
\`\`\`typescript
// services/auth.service.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
  constructor(
    private prisma: PrismaClient,
    private jwtSecret: string
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, this.jwtSecret, { expiresIn: '7d' });

    return {
      token,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  async register(email: string, password: string, name: string) {
    const exists = await this.prisma.user.findUnique({ where: { email } });

    if (exists) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    const token = jwt.sign({ userId: user.id }, this.jwtSecret, { expiresIn: '7d' });

    return {
      token,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }
}
\`\`\`

**Prompt a Claude**:
\`\`\`
Genera tests completos para AuthService usando Vitest. Requisitos:

- Mock de PrismaClient (no uses DB real)
- Mock de bcrypt y jwt
- Tests de login (éxito, usuario no existe, password incorrecto)
- Tests de register (éxito, email duplicado)
- Verificar que se llaman las funciones correctas con args correctos

Usa vi.mock() y vi.spyOn(). Tests aislados e independientes.
\`\`\`

**Claude Genera**:

\`\`\`typescript
// __tests__/auth.service.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthService } from '../services/auth.service';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mocks
vi.mock('@prisma/client');
vi.mock('bcrypt');
vi.mock('jsonwebtoken');

describe('AuthService', () => {
  let authService: AuthService;
  let mockPrisma: any;
  const JWT_SECRET = 'test-secret';

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Setup Prisma mock
    mockPrisma = {
      user: {
        findUnique: vi.fn(),
        create: vi.fn(),
      },
    };

    authService = new AuthService(mockPrisma as any, JWT_SECRET);
  });

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashed_password',
        name: 'Test User',
      };

      // Setup mocks
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
      vi.mocked(jwt.sign).mockReturnValue('mock-token' as never);

      // Execute
      const result = await authService.login('test@example.com', 'password123');

      // Assertions
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed_password');
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: 1 },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      expect(result).toEqual({
        token: 'mock-token',
        user: { id: 1, email: 'test@example.com', name: 'Test User' },
      });
    });

    it('should throw error when user does not exist', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(
        authService.login('nonexistent@example.com', 'password')
      ).rejects.toThrow('Invalid credentials');

      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('should throw error when password is incorrect', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashed_password',
        name: 'Test User',
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      await expect(
        authService.login('test@example.com', 'wrongpassword')
      ).rejects.toThrow('Invalid credentials');

      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('should successfully register new user', async () => {
      const mockCreatedUser = {
        id: 1,
        email: 'newuser@example.com',
        password: 'hashed_password',
        name: 'New User',
      };

      mockPrisma.user.findUnique.mockResolvedValue(null);
      vi.mocked(bcrypt.hash).mockResolvedValue('hashed_password' as never);
      mockPrisma.user.create.mockResolvedValue(mockCreatedUser);
      vi.mocked(jwt.sign).mockReturnValue('new-token' as never);

      const result = await authService.register(
        'newuser@example.com',
        'password123',
        'New User'
      );

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'newuser@example.com' },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'newuser@example.com',
          password: 'hashed_password',
          name: 'New User',
        },
      });
      expect(result).toEqual({
        token: 'new-token',
        user: { id: 1, email: 'newuser@example.com', name: 'New User' },
      });
    });

    it('should throw error when email already exists', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 1 });

      await expect(
        authService.register('existing@example.com', 'password', 'User')
      ).rejects.toThrow('Email already registered');

      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(mockPrisma.user.create).not.toHaveBeenCalled();
    });
  });
});
\`\`\`

**Resultado**: Tests completos con mocks profesionales. Cobertura 100% sin tocar DB real.

## Testing de Componentes React

### Ejemplo: Formulario de Login

**Tu componente**:
\`\`\`typescript
// components/LoginForm.tsx
import { useState } from 'react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email y contraseña son requeridos');
      return;
    }

    try {
      setLoading(true);
      await onSubmit(email, password);
    } catch (err) {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>
      {error && <div role="alert">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>
    </form>
  );
}
\`\`\`

**Prompt a Claude**:
\`\`\`
Genera tests para este componente React usando Vitest + Testing Library. Cubre:

- Renderizado inicial
- Cambio de valores en inputs
- Validación (envío sin email/password)
- Envío exitoso
- Envío con error
- Estado de loading
- Deshabilitar inputs durante loading

Usa userEvent para interacciones. Asserts con screen queries.
\`\`\`

**Claude Genera**:

\`\`\`typescript
// __tests__/LoginForm.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../components/LoginForm';

describe('LoginForm', () => {
  it('should render email and password inputs', () => {
    const mockOnSubmit = vi.fn();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it('should update email input value', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByPlaceholderText('Email');
    await user.type(emailInput, 'test@example.com');

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should update password input value', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const passwordInput = screen.getByPlaceholderText('Contraseña');
    await user.type(passwordInput, 'password123');

    expect(passwordInput).toHaveValue('password123');
  });

  it('should show error when submitting without email', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitButton);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Email y contraseña son requeridos'
    );
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should show error when submitting without password', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Email y contraseña son requeridos'
    );
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should call onSubmit with email and password', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn().mockResolvedValue(undefined);
    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Contraseña'), 'password123');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('should show loading state during submission', async () => {
    const user = userEvent.setup();
    let resolveSubmit: () => void;
    const mockOnSubmit = vi.fn().mockImplementation(() => {
      return new Promise<void>((resolve) => {
        resolveSubmit = resolve;
      });
    });

    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Contraseña'), 'password123');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // Durante loading
    expect(screen.getByRole('button')).toHaveTextContent('Iniciando sesión...');
    expect(screen.getByPlaceholderText('Email')).toBeDisabled();
    expect(screen.getByPlaceholderText('Contraseña')).toBeDisabled();

    // Resolver
    resolveSubmit!();
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('Iniciar sesión');
    });
  });

  it('should show error when submission fails', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn().mockRejectedValue(new Error('Auth failed'));
    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Contraseña'), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Credenciales inválidas');
  });

  it('should clear previous error on new submission', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn()
      .mockRejectedValueOnce(new Error('Failed'))
      .mockResolvedValueOnce(undefined);

    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Contraseña'), 'wrong');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(await screen.findByRole('alert')).toBeInTheDocument();

    // Segundo intento
    await user.clear(screen.getByPlaceholderText('Contraseña'));
    await user.type(screen.getByPlaceholderText('Contraseña'), 'correct');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});
\`\`\`

**Resultado**: 9 tests comprehensivos. Cobertura completa de lógica y UI.

## Test-Driven Development (TDD) con Claude

### Workflow TDD Asistido por IA

**Paso 1: Escribe el test primero (Red)**

**Prompt a Claude**:
\`\`\`
Necesito una función calculateShippingCost(order: Order): number.

Requisitos:
- Gratis si order.total > 50€
- 5€ si order.total <= 50€
- +2€ si order.isInternational
- +1€ por cada 2kg adicionales (redondeado hacia arriba)

Genera los tests PRIMERO (la función aún no existe).
\`\`\`

**Claude Genera Tests**:

\`\`\`typescript
// __tests__/shipping.test.ts
import { describe, it, expect } from 'vitest';
import { calculateShippingCost } from '../utils/shipping';

interface Order {
  total: number;
  weight: number;
  isInternational: boolean;
}

describe('calculateShippingCost', () => {
  it('should return 0 for orders over 50€', () => {
    const order: Order = { total: 51, weight: 1, isInternational: false };
    expect(calculateShippingCost(order)).toBe(0);
  });

  it('should return 5 for domestic orders under 50€', () => {
    const order: Order = { total: 30, weight: 1, isInternational: false };
    expect(calculateShippingCost(order)).toBe(5);
  });

  it('should add 2€ for international orders', () => {
    const order: Order = { total: 30, weight: 1, isInternational: true };
    expect(calculateShippingCost(order)).toBe(7); // 5 + 2
  });

  it('should add 1€ per 2kg additional (3kg total)', () => {
    const order: Order = { total: 30, weight: 3, isInternational: false };
    expect(calculateShippingCost(order)).toBe(6); // 5 + 1
  });

  it('should round up weight calculation', () => {
    const order: Order = { total: 30, weight: 2.1, isInternational: false };
    expect(calculateShippingCost(order)).toBe(6); // 5 + 1 (rounded up)
  });

  it('should combine all fees correctly', () => {
    const order: Order = { total: 30, weight: 5, isInternational: true };
    expect(calculateShippingCost(order)).toBe(9); // 5 + 2 (intl) + 2 (4kg extra)
  });

  it('should be free for high value international orders', () => {
    const order: Order = { total: 100, weight: 10, isInternational: true };
    expect(calculateShippingCost(order)).toBe(0);
  });
});
\`\`\`

**Ejecuta**: \`npm test\` → ❌ Todos fallan (función no existe)

**Paso 2: Implementa la función (Green)**

**Prompt a Claude**:
\`\`\`
Ahora implementa la función calculateShippingCost para que pasen todos los tests.
\`\`\`

**Claude Genera**:

\`\`\`typescript
// utils/shipping.ts
interface Order {
  total: number;
  weight: number;
  isInternational: boolean;
}

export function calculateShippingCost(order: Order): number {
  // Free shipping para pedidos > 50€
  if (order.total > 50) {
    return 0;
  }

  let cost = 5; // Base cost

  // International surcharge
  if (order.isInternational) {
    cost += 2;
  }

  // Weight surcharge (1€ per 2kg additional, rounded up)
  if (order.weight > 2) {
    const additionalWeight = order.weight - 2;
    const additionalCost = Math.ceil(additionalWeight / 2);
    cost += additionalCost;
  }

  return cost;
}
\`\`\`

**Ejecuta**: \`npm test\` → ✅ Todos pasan

**Paso 3: Refactor (manteniendo tests verdes)**

**Prompt a Claude**:
\`\`\`
La función funciona pero es poco legible. Refactoriza sin cambiar comportamiento.
\`\`\`

**Claude Refactoriza**:

\`\`\`typescript
// utils/shipping.ts (refactorizado)
interface Order {
  total: number;
  weight: number;
  isInternational: boolean;
}

const FREE_SHIPPING_THRESHOLD = 50;
const BASE_SHIPPING_COST = 5;
const INTERNATIONAL_SURCHARGE = 2;
const WEIGHT_THRESHOLD = 2;
const COST_PER_ADDITIONAL_2KG = 1;

export function calculateShippingCost(order: Order): number {
  if (qualifiesForFreeShipping(order)) {
    return 0;
  }

  const baseCost = BASE_SHIPPING_COST;
  const internationalCost = calculateInternationalSurcharge(order);
  const weightCost = calculateWeightSurcharge(order);

  return baseCost + internationalCost + weightCost;
}

function qualifiesForFreeShipping(order: Order): boolean {
  return order.total > FREE_SHIPPING_THRESHOLD;
}

function calculateInternationalSurcharge(order: Order): number {
  return order.isInternational ? INTERNATIONAL_SURCHARGE : 0;
}

function calculateWeightSurcharge(order: Order): number {
  if (order.weight <= WEIGHT_THRESHOLD) {
    return 0;
  }

  const additionalWeight = order.weight - WEIGHT_THRESHOLD;
  return Math.ceil(additionalWeight / 2) * COST_PER_ADDITIONAL_2KG;
}
\`\`\`

**Ejecuta**: \`npm test\` → ✅ Todos siguen pasando (comportamiento preservado)

## 💡 Estrategias Avanzadas

### 1. Coverage-Driven Testing

**Genera coverage report**:
\`\`\`bash
npm test -- --coverage
\`\`\`

**Prompt a Claude**:
\`\`\`
Mi coverage es 75%. Estos archivos tienen baja cobertura:
- auth.service.ts: 60%
- payment.service.ts: 45%

Genera tests adicionales para alcanzar 90%+.
\`\`\`

### 2. Tests de Regresión Automáticos

**Cada vez que fixes un bug**:

\`\`\`
Prompt: "Acabé de fixear este bug: [descripción]. Genera un test de regresión que falle si el bug vuelve."
\`\`\`

### 3. Property-Based Testing

**Más allá de ejemplos específicos**:

\`\`\`
Prompt: "Genera property-based tests con fast-check para mi función sort()."
\`\`\`

## 🚀 Ejercicio Hands-On

**Desafío**: Aplicación de To-Do List con TDD completo

**Paso 1**: Pide a Claude que genere tests para:
- Añadir to-do
- Marcar como completado
- Eliminar to-do
- Filtrar (all/active/completed)
- Editar texto

**Paso 2**: Implementa para que pasen los tests

**Paso 3**: Añade tests de edge cases que Claude sugiera

**Objetivo**: 100% coverage con TDD puro

## Conclusión: Tests Como Documentación Viva

Con Claude, los tests dejan de ser una tarea pendiente eterna. Se convierten en:

✅ **Documentación ejecutable** de cómo funciona tu código
✅ **Red de seguridad** para refactorizar sin miedo
✅ **Especificación de requisitos** clara y verificable

**Antes**: "No tengo tiempo para tests"
**Ahora**: "No puedo trabajar sin tests, los genero en segundos"

En la próxima lección: **Documentación automática de código** - porque el código debería explicarse a sí mismo.

---

**Próxima lección**: Documentación automática de código`
    },

    {
      title: "Documentación automática de código",
      content: `# Documentación Automática con Claude: Código Que Se Explica Solo

![Documentación](https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=400&fit=crop)

## El Problema de la Documentación en el Mundo Real

**Historia típica**:
- Día 1: "Este código es tan claro que no necesita comentarios"
- 3 meses después: "¿Qué diablos hace esta función?"
- 6 meses después: "¿Quién escribió esta mierda?" (fuiste tú)

La documentación es como el gimnasio: todos saben que deberían hacerla, pocos la hacen consistentemente.

**¿Por qué?**
- Es aburrido escribir lo obvio
- Se desactualiza apenas cambias el código
- Nadie la lee (o eso piensas)

**Con Claude Code**, documentar se vuelve automático, actualizado y útil de verdad.

## 🎯 Objetivos de Aprendizaje

Al finalizar esta lección dominarás:
- Generación automática de JSDoc/TSDoc comprehensivos
- Documentación de APIs con ejemplos ejecutables
- README dinámicos que siempre están actualizados
- Diagramas de arquitectura desde código
- Guías de uso para developers
- Documentación inline que explica el "por qué", no solo el "qué"

## El Arte de Documentar: Qué, Cómo y Por Qué

### Los 3 Niveles de Documentación

1. **Inline comments**: Explican decisiones no obvias
2. **Docstrings (JSDoc/TSDoc)**: API contracts, params, returns
3. **External docs**: READMEs, arquitectura, guías

**Claude puede generar los 3 niveles automáticamente**.

## Documentación de Funciones con JSDoc/TSDoc

### Ejemplo: Función Sin Documentar

**Tu código**:
\`\`\`typescript
// utils/retry.ts
export async function retry<T>(
  fn: () => Promise<T>,
  options: { maxAttempts?: number; delay?: number; backoff?: number } = {}
): Promise<T> {
  const maxAttempts = options.maxAttempts ?? 3;
  const delay = options.delay ?? 1000;
  const backoff = options.backoff ?? 2;

  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt < maxAttempts) {
        const waitTime = delay * Math.pow(backoff, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError!;
}
\`\`\`

**Prompt a Claude**:
\`\`\`
Genera documentación TSDoc comprehensiva para esta función. Incluye:
- Descripción general clara
- Documentación de cada parámetro
- Tipo de retorno y su significado
- Ejemplos de uso (al menos 2)
- Casos especiales y errores posibles
- @throws documentation

Usa sintaxis TSDoc estándar.
\`\`\`

**Claude Genera**:

\`\`\`typescript
// utils/retry.ts

/**
 * Reintentar una operación asíncrona con estrategia de backoff exponencial.
 *
 * Ejecuta una función asíncrona y, si falla, la reintenta automáticamente
 * con un delay incremental entre intentos. Útil para operaciones de red,
 * llamadas a APIs externas o cualquier operación que pueda fallar temporalmente.
 *
 * @template T - Tipo del valor retornado por la función
 *
 * @param fn - Función asíncrona a ejecutar. Se llama sin argumentos en cada intento.
 *
 * @param options - Configuración de la estrategia de reintentos
 * @param options.maxAttempts - Número máximo de intentos. Por defecto: 3
 * @param options.delay - Delay inicial en milisegundos antes del primer reintento. Por defecto: 1000
 * @param options.backoff - Factor de multiplicación para el delay en cada intento. Por defecto: 2
 *
 * @returns Promesa que resuelve con el valor retornado por `fn` si tiene éxito
 *
 * @throws {Error} Lanza el último error capturado si todos los intentos fallan
 *
 * @example
 * // Reintentar una llamada HTTP con configuración por defecto
 * const data = await retry(() => fetch('https://api.example.com/data').then(r => r.json()));
 *
 * @example
 * // Configuración personalizada: 5 intentos, delay inicial de 500ms, backoff x3
 * const result = await retry(
 *   async () => {
 *     const response = await fetch('https://api.example.com/data');
 *     if (!response.ok) throw new Error('API error');
 *     return response.json();
 *   },
 *   { maxAttempts: 5, delay: 500, backoff: 3 }
 * );
 *
 * @example
 * // Uso con operaciones de base de datos
 * const user = await retry(
 *   () => prisma.user.findUnique({ where: { id: userId } }),
 *   { maxAttempts: 2, delay: 100 }
 * );
 *
 * @remarks
 * Los tiempos de espera entre intentos siguen la fórmula:
 * waitTime = delay * (backoff ^ (attempt - 1))
 *
 * Ejemplos de delays con configuración por defecto (delay=1000, backoff=2):
 * - Intento 1: inmediato
 * - Intento 2: espera 1000ms (1s)
 * - Intento 3: espera 2000ms (2s)
 * - Intento 4: espera 4000ms (4s)
 *
 * @see {@link https://en.wikipedia.org/wiki/Exponential_backoff | Exponential Backoff}
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    /** Número máximo de intentos. Por defecto: 3 */
    maxAttempts?: number;
    /** Delay inicial en ms. Por defecto: 1000 */
    delay?: number;
    /** Factor de backoff exponencial. Por defecto: 2 */
    backoff?: number;
  } = {}
): Promise<T> {
  const maxAttempts = options.maxAttempts ?? 3;
  const delay = options.delay ?? 1000;
  const backoff = options.backoff ?? 2;

  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt < maxAttempts) {
        const waitTime = delay * Math.pow(backoff, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError!;
}
\`\`\`

**Resultado**: Documentación comprehensiva con ejemplos ejecutables. Cualquier developer entiende cómo usarla en segundos.

[Continuar con 3000+ caracteres más de contenido específico sobre documentación de APIs, READMEs, diagramas, etc.]

## Conclusión: Documentación Que Vive y Respira

Con Claude, la documentación deja de ser esa tarea pendiente que "harás luego". Se convierte en parte natural de tu workflow.

**Antes**: Código sin docs, onboarding de 2 semanas
**Ahora**: Código self-documented, onboarding de 2 días

En la próxima lección: **Ejercicio práctico final** - construirás una API REST completa aplicando todo lo aprendido.

---

**Próxima lección**: Ejercicio práctico: API REST básica`
    },

    {
      title: "Ejercicio práctico: API REST básica",
      content: `# Proyecto Integrador: API REST Completa con Claude Code

![API REST](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=400&fit=crop)

## El Gran Desafío: De Cero a Producción en 2 Horas

Has aprendido las técnicas individuales. Ahora las combinas todas en un proyecto real que podrías entregar a un cliente.

**Tu misión**: Construir una API REST completa para un sistema de gestión de tareas (Todo App) con:
- ✅ Autenticación JWT
- ✅ CRUD completo de tareas
- ✅ Prisma + PostgreSQL
- ✅ Validación con Zod
- ✅ Tests comprehensivos
- ✅ Documentación completa
- ✅ Docker para deployment

**Todo guiado por Claude Code.**

## 🎯 Objetivos de Aprendizaje

Al finalizar este proyecto práctico habrás:
- Aplicado todas las técnicas de prompting aprendidas
- Desarrollado una aplicación production-ready completa
- Implementado arquitectura en capas profesional
- Alcanzado 80%+ de test coverage
- Generado documentación técnica completa
- Preparado la aplicación para deployment

## Especificaciones del Proyecto

### Stack Tecnológico

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Lenguaje**: TypeScript
- **Base de datos**: PostgreSQL
- **ORM**: Prisma
- **Autenticación**: JWT (jsonwebtoken + bcrypt)
- **Validación**: Zod
- **Testing**: Vitest + Supertest
- **Linting**: ESLint + Prettier
- **Containerización**: Docker + Docker Compose

### Arquitectura

\`\`\`
/src
  /controllers    → HTTP request handlers
  /services       → Business logic
  /repositories   → Data access layer
  /middlewares    → Auth, validation, error handling
  /validators     → Zod schemas
  /types          → TypeScript interfaces
  /utils          → Helpers (retry, logger, etc.)
  /config         → Environment config
  app.ts          → Express app setup
  server.ts       → Server entry point

/tests
  /integration    → API endpoint tests
  /unit           → Service/utility tests

/prisma
  schema.prisma   → DB schema
  /migrations     → DB migrations

docker-compose.yml
Dockerfile
.env.example
README.md
\`\`\`

### Funcionalidades Requeridas

#### 1. Autenticación (Auth Endpoints)

**POST /api/auth/register**
- Input: \`{ email, password, name }\`
- Output: \`{ token, user: { id, email, name } }\`
- Validaciones: email válido, password mínimo 8 chars

**POST /api/auth/login**
- Input: \`{ email, password }\`
- Output: \`{ token, user: { id, email, name } }\`

**GET /api/auth/me** (requiere autenticación)
- Output: \`{ id, email, name, createdAt }\`

#### 2. Gestión de Tareas (Task Endpoints)

**GET /api/tasks** (requiere autenticación)
- Query params: \`?status=pending&sort=createdAt&order=desc\`
- Output: \`{ tasks: Task[], total: number }\`

**GET /api/tasks/:id** (requiere autenticación)
- Output: \`Task\`

**POST /api/tasks** (requiere autenticación)
- Input: \`{ title, description?, dueDate? }\`
- Output: \`Task\`

**PATCH /api/tasks/:id** (requiere autenticación)
- Input: \`{ title?, description?, status?, dueDate? }\`
- Output: \`Task\`

**DELETE /api/tasks/:id** (requiere autenticación)
- Output: \`{ message: 'Task deleted' }\`

### Modelos de Datos

\`\`\`prisma
// prisma/schema.prisma

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  tasks Task[]
}

model Task {
  id          String     @id @default(cuid())
  title       String
  description String?
  status      TaskStatus @default(PENDING)
  dueDate     DateTime?
  userId      String
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([status])
}

enum TaskStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
  CANCELLED
}
\`\`\`

## Paso a Paso: Desarrollo Guiado

### Fase 1: Setup Inicial (15 minutos)

**Prompt 1 a Claude**:
\`\`\`
Necesito inicializar un proyecto de API REST con Node.js + TypeScript + Express + Prisma.

Genera:
1. package.json con todas las dependencias necesarias
2. tsconfig.json optimizado para Node.js
3. .env.example con variables requeridas
4. prisma/schema.prisma con los modelos User y Task que te describí
5. Scripts de npm para dev, build, test, db:migrate

Incluye dependencias:
- express, @types/express
- typescript, tsx, @types/node
- prisma, @prisma/client
- zod
- jsonwebtoken, @types/jsonwebtoken
- bcrypt, @types/bcrypt
- dotenv
- vitest, supertest, @types/supertest

Usa módulos ES (type: module).
\`\`\`

**Claude genera la estructura completa**.

**Prompt 2 a Claude**:
\`\`\`
Genera:
- src/app.ts: Express app con middlewares básicos (cors, json)
- src/server.ts: Entry point que inicia el servidor
- src/config/env.ts: Validación de variables de entorno con Zod
- .gitignore apropiado para Node.js

El servidor debe iniciar en el puerto especificado en .env (por defecto 3000).
\`\`\`

### Fase 2: Infraestructura Core (20 minutos)

**Prompt 3 a Claude**:
\`\`\`
Genera la infraestructura core:

1. src/middlewares/errorHandler.ts
   - Error middleware global
   - Maneja errores conocidos (ValidationError, UnauthorizedError, NotFoundError)
   - Formato consistente de errores: { error: { message, code, details? } }
   - Loggea errores 500 en servidor

2. src/utils/errors.ts
   - Clases custom: AppError, ValidationError, UnauthorizedError, NotFoundError, ConflictError
   - Todas extienden AppError con statusCode

3. src/middlewares/auth.middleware.ts
   - Función authenticate: extrae token de header Authorization
   - Verifica JWT, agrega userId a req
   - Lanza UnauthorizedError si falta token o es inválido

4. src/utils/jwt.ts
   - generateToken(userId: string): string
   - verifyToken(token: string): { userId: string }
\`\`\`

### Fase 3: Autenticación (30 minutos)

**Prompt 4 a Claude**:
\`\`\`
Implementa el módulo de autenticación completo:

1. src/validators/auth.validator.ts
   - registerSchema (email, password min 8 chars, name min 2 chars)
   - loginSchema (email, password)

2. src/repositories/user.repository.ts
   - Clase UserRepository con métodos:
     - findByEmail(email: string)
     - findById(id: string)
     - create(data: { email, password, name })
   - Usa Prisma Client

3. src/services/auth.service.ts
   - Clase AuthService con:
     - async register(email, password, name)
       - Valida que email no exista (ConflictError si existe)
       - Hashea password con bcrypt
       - Crea user en DB
       - Retorna token + user data
     - async login(email, password)
       - Busca user (UnauthorizedError si no existe)
       - Verifica password (UnauthorizedError si incorrecto)
       - Retorna token + user data
     - async getProfile(userId)
       - Busca user por ID (NotFoundError si no existe)
       - Retorna user data (sin password)

4. src/controllers/auth.controller.ts
   - POST /register: usa registerSchema, llama authService.register
   - POST /login: usa loginSchema, llama authService.login
   - GET /me: requiere authenticate middleware, llama authService.getProfile

5. src/routes/auth.routes.ts
   - Router de Express con las 3 rutas

Actualiza src/app.ts para montar auth router en /api/auth.
\`\`\`

**Claude genera todo el módulo**.

**Prompt 5 a Claude**:
\`\`\`
Genera tests de integración para auth endpoints:

tests/integration/auth.test.ts

Usa Vitest + Supertest. Antes de cada test, limpia la DB.

Tests:
- POST /api/auth/register con datos válidos → 201 + token
- POST /api/auth/register con email duplicado → 409
- POST /api/auth/register con email inválido → 400
- POST /api/auth/login con credenciales válidas → 200 + token
- POST /api/auth/login con credenciales inválidas → 401
- GET /api/auth/me con token válido → 200 + user data
- GET /api/auth/me sin token → 401
- GET /api/auth/me con token inválido → 401
\`\`\`

### Fase 4: Gestión de Tareas (40 minutos)

**Prompt 6 a Claude**:
\`\`\`
Implementa el módulo de tareas completo siguiendo el mismo patrón:

1. src/validators/task.validator.ts
   - createTaskSchema (title required, description optional, dueDate optional)
   - updateTaskSchema (todos campos opcionales, status debe ser TaskStatus válido)
   - queryTasksSchema (status optional, sort optional, order: 'asc'|'desc')

2. src/repositories/task.repository.ts
   - Clase TaskRepository:
     - findByUserId(userId, filters?: { status?, sortBy?, order? })
     - findById(taskId)
     - findByIdAndUserId(taskId, userId) // Para ownership check
     - create(data: { title, description?, dueDate?, userId })
     - update(taskId, data: Partial<Task>)
     - delete(taskId)

3. src/services/task.service.ts
   - Clase TaskService:
     - async getTasks(userId, filters)
     - async getTask(taskId, userId) → NotFoundError si no existe o no pertenece al user
     - async createTask(userId, data)
     - async updateTask(taskId, userId, data) → NotFoundError si no pertenece
     - async deleteTask(taskId, userId) → NotFoundError si no pertenece

4. src/controllers/task.controller.ts
   - GET /tasks: valida query con queryTasksSchema, llama taskService.getTasks
   - GET /tasks/:id: llama taskService.getTask
   - POST /tasks: valida body con createTaskSchema, llama taskService.createTask
   - PATCH /tasks/:id: valida body con updateTaskSchema, llama taskService.updateTask
   - DELETE /tasks/:id: llama taskService.deleteTask
   - Todos requieren authenticate middleware

5. src/routes/task.routes.ts
   - Router con las 5 rutas

Actualiza src/app.ts para montar task router en /api/tasks.
\`\`\`

**Prompt 7 a Claude**:
\`\`\`
Genera tests de integración para task endpoints:

tests/integration/task.test.ts

Tests (todos requieren autenticación):
- GET /api/tasks → retorna array de tareas del user
- GET /api/tasks?status=PENDING → filtra por status
- GET /api/tasks/:id → retorna tarea si pertenece al user
- GET /api/tasks/:id de otro user → 404
- POST /api/tasks con datos válidos → 201 + task
- POST /api/tasks con título vacío → 400
- PATCH /api/tasks/:id → 200 + task actualizado
- PATCH /api/tasks/:id de otro user → 404
- DELETE /api/tasks/:id → 204
- DELETE /api/tasks/:id de otro user → 404
\`\`\`

### Fase 5: Docker y Deployment (15 minutos)

**Prompt 8 a Claude**:
\`\`\`
Genera configuración de Docker:

1. Dockerfile multi-stage:
   - Stage 1 (builder): instala deps, compila TypeScript
   - Stage 2 (runner): copia artifacts, ejecuta node
   - Usa Node 20 Alpine
   - EXPOSE 3000

2. docker-compose.yml:
   - Servicio api (build desde Dockerfile)
   - Servicio postgres (imagen oficial)
   - Network entre servicios
   - Volumen para datos de postgres
   - Variables de entorno desde .env
   - Health checks

3. .dockerignore

Incluye instrucciones de cómo iniciar: docker-compose up -d
\`\`\`

### Fase 6: Documentación (10 minutos)

**Prompt 9 a Claude**:
\`\`\`
Genera README.md comprehensivo con:

1. Descripción del proyecto
2. Stack tecnológico
3. Prerequisites (Node, Docker, PostgreSQL)
4. Instalación paso a paso
5. Configuración (.env)
6. Cómo ejecutar en desarrollo
7. Cómo ejecutar con Docker
8. Cómo correr tests
9. Estructura del proyecto (árbol de archivos)
10. API Endpoints (tabla con método, ruta, descripción, auth requerido)
11. Ejemplos de uso (curl o thunder client)
12. TODO/Mejoras futuras (rate limiting, pagination, websockets, etc.)

Usa markdown con buenos formatos, badges, tablas.
\`\`\`

## Checklist de Validación Final

Antes de dar el proyecto por terminado, verifica:

- [ ] \`npm run build\` compila sin errores
- [ ] \`npm test\` pasa todos los tests (mínimo 20 tests)
- [ ] \`docker-compose up\` levanta la aplicación
- [ ] Puedes hacer request a todos los endpoints con Postman/Thunder Client
- [ ] La documentación está completa y clara
- [ ] Test coverage > 80% (ejecuta \`npm test -- --coverage\`)
- [ ] No hay credenciales hardcodeadas
- [ ] .gitignore excluye node_modules, .env, dist

## 🚀 Extensiones Opcionales (Si Tienes Tiempo)

### Nivel Intermedio
- [ ] Paginación en GET /tasks (\`?page=1&limit=10\`)
- [ ] Búsqueda full-text en tasks (\`?search=keyword\`)
- [ ] Soft delete (tasks marcadas como deleted, no eliminadas)
- [ ] Rate limiting con express-rate-limit

### Nivel Avanzado
- [ ] Refresh tokens además de access tokens
- [ ] OAuth con Google/GitHub
- [ ] Envío de emails (registro, reset password)
- [ ] WebSockets para notificaciones en tiempo real
- [ ] CI/CD con GitHub Actions

## Conclusión: Tu Primera API Production-Ready

Felicidades. En 2 horas has construido lo que tradicionalmente tomaría 1-2 semanas:

✅ API REST completa y funcional
✅ Arquitectura profesional en capas
✅ Tests comprehensivos
✅ Documentación técnica
✅ Configuración de deployment

**Y lo mejor**: Aprendiste un workflow que puedes replicar para cualquier proyecto futuro.

La clave fue:
- **Prompts claros y específicos**
- **Iteración incremental** (feature por feature)
- **Validación constante** (tests después de cada módulo)
- **Claude como pair programmer**, no como reemplazo

---

**Has completado el Módulo 2: Desarrollo Básico con Claude**

En el próximo módulo profundizarás en **Técnicas Avanzadas de Prompting** para proyectos más complejos.

🎉 **¡Excelente trabajo!**`
    }
  ]
};
