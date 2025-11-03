<p><strong><em>Lección 7: Integración Avanzada MCP + Claude Code</em></strong></p>

## Introducción

Ahora que dominas los fundamentos de MCP, es momento de aprender técnicas avanzadas de integración que multiplican la productividad. En esta lección explorarás patrones avanzados, optimizaciones y casos de uso complejos.

## Patrones avanzados de integración

### Patrón 1: Workflow multi-servidor

Combina datos de múltiples servidores en un solo workflow:

**Ejemplo: Deploy completo desde issue**

```
You: Implementa solución para @github:repos/mi-org/api/issues/234 y deploya a @vercel

Claude Code:
1. Lee issue #234 de GitHub
2. Analiza código relacionado
3. Implementa solución
4. Ejecuta tests locales
5. Crea branch feature/fix-234
6. Hace commit
7. Crea PR en GitHub
8. Deploy a Vercel preview
9. Actualiza issue con link de preview

¿Procedo con todos los pasos?
```

### Patrón 2: Sincronización bidireccional

Mantén sincronizados múltiples sistemas:

```
You: Sincroniza @linear:issues con @github:issues del proyecto

Claude Code:
Analizando ambos sistemas...

Cambios detectados:
- 3 issues nuevos en Linear → crear en GitHub
- 2 issues cerrados en GitHub → cerrar en Linear
- 1 issue actualizado en Linear → actualizar GitHub

¿Aplicar sincronización?
```

**Implementación con script:**

```typescript
import { MCPMultiClient } from './client.js';

async function syncLinearGitHub() {
  const client = new MCPMultiClient();

  await client.connectServer('linear', 'npx', ['@modelcontextprotocol/server-linear']);
  await client.connectServer('github', 'npx', ['@modelcontextprotocol/server-github']);

  // Obtener issues de ambos
  const linearIssues = await client.readResource('linear', 'issues');
  const githubIssues = await client.readResource('github', 'repos/org/proj/issues');

  // Comparar y sincronizar
  // ... lógica de sync ...

  await client.disconnect();
}
```

### Patrón 3: Aggregated dashboard

Crea vistas agregadas de múltiples fuentes:

```
You: Dame resumen ejecutivo del proyecto:
- Issues de @linear
- PRs de @github
- Errors de @sentry
- Métricas de @vercel
- Revenue de @stripe

Claude Code: [Consultando 5 servidores MCP]

RESUMEN EJECUTIVO - Proyecto API
================================

DESARROLLO:
- Linear: 23 issues activos (8 high priority)
- GitHub: 5 PRs pendientes de review
  * 2 PRs > 3 días sin actividad

CALIDAD:
- Sentry: 12 errores nuevos últimas 24h
  * Error crítico: DB connection timeout (15 ocurrencias)
- Tests: 94% coverage (build #456)

INFRAESTRUCTURA:
- Vercel: 3 deploys hoy
  * Prod: Build exitoso (12min)
  * Preview: 2 branches activas
- Uptime: 99.8% (7 días)

NEGOCIO:
- Stripe: $12,450 revenue (7 días)
  * 23 nuevos clientes
  * 2 churns
  * MRR: $8,900 (+12%)

ACCIONES RECOMENDADAS:
1. Revisar PRs pendientes >3 días
2. Investigar DB timeout en Sentry
3. Resolver 8 issues high priority de Linear
```

## Técnicas de optimización

### 1. Caching de recursos

Cachea datos que no cambian frecuentemente:

```typescript
class MCPCachedClient {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private ttl: number = 5 * 60 * 1000; // 5 minutos

  async readResourceCached(server: string, uri: string): Promise<any> {
    const cacheKey = `${server}:${uri}`;
    const cached = this.cache.get(cacheKey);

    // Verificar cache válido
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      console.log(`Cache hit: ${cacheKey}`);
      return cached.data;
    }

    // Fetch fresco
    const data = await this.readResource(server, uri);
    this.cache.set(cacheKey, { data, timestamp: Date.now() });

    return data;
  }

  invalidateCache(server?: string, uri?: string) {
    if (server && uri) {
      this.cache.delete(`${server}:${uri}`);
    } else {
      this.cache.clear();
    }
  }
}
```

### 2. Paralelización de consultas

Consulta múltiples servidores en paralelo:

```typescript
async function getDashboardData() {
  const client = new MCPMultiClient();

  const [github, linear, stripe, sentry] = await Promise.all([
    client.readResource('github', 'repos/org/proj/issues'),
    client.readResource('linear', 'issues'),
    client.readResource('stripe', 'revenue/week'),
    client.readResource('sentry', 'errors/recent'),
  ]);

  return {
    development: { github, linear },
    business: stripe,
    quality: sentry,
  };
}
```

### 3. Streaming de respuestas

Para datos grandes, usa streaming:

```typescript
async function streamLargeResource(server: string, uri: string) {
  const client = await pool.getClient(server);

  // Request con streaming
  const stream = await client.requestStream({
    method: 'resources/read',
    params: { uri, stream: true },
  });

  for await (const chunk of stream) {
    // Procesar chunk por chunk
    console.log('Chunk received:', chunk);
  }
}
```

## Integración con custom instructions

Combina MCP con instrucciones del proyecto:

**.claude/instructions.md**:
```markdown
# Instrucciones del Proyecto

## MCP Servers Configurados

### GitHub
- Org: mi-org
- Repos principales: api, frontend, mobile

### Linear
- Team: Engineering
- Labels: bug, feature, enhancement

### Stripe
- Modo: test (usar test keys)
- Productos: subscription, one-time

## Workflows Automáticos

### Al crear feature:
1. Crear issue en Linear
2. Crear branch en GitHub
3. Abrir PR draft
4. Deploy preview en Vercel

### Al completar feature:
1. Actualizar issue en Linear a "Done"
2. Merge PR en GitHub
3. Deploy a producción
4. Notificar en Slack

### Monitoring:
- Revisar @sentry cada hora
- Alertar si errores > 10/hora
- Auto-rollback si error crítico
```

**Uso:**
```
You: Crea feature "dark mode"

Claude Code: [Siguiendo workflow automático]

✓ Created Linear issue: ENG-234 "Implement dark mode"
✓ Created branch: feature/dark-mode
✓ Created draft PR #456
✓ Deployed preview: https://preview-456.vercel.app

Listo para comenzar desarrollo.
Siguiente: Implementar componentes con dark mode.
```

## Webhooks y eventos en tiempo real

Configurar webhooks para actuar en eventos:

```typescript
// webhook-handler.ts
import express from 'express';
import { MCPMultiClient } from './client.js';

const app = express();
const client = new MCPMultiClient();

// Webhook de GitHub
app.post('/webhooks/github', async (req, res) => {
  const { action, pull_request } = req.body;

  if (action === 'opened' && pull_request) {
    // PR abierto → crear en Linear
    await client.callTool('linear', 'create-issue', {
      title: `Review PR: ${pull_request.title}`,
      description: `${pull_request.html_url}\n\n${pull_request.body}`,
      labels: ['code-review'],
    });

    // Deploy preview en Vercel
    await client.callTool('vercel', 'deploy', {
      project: 'my-app',
      branch: pull_request.head.ref,
    });

    res.json({ success: true });
  }
});

// Webhook de Stripe
app.post('/webhooks/stripe', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'customer.subscription.created') {
    // Nuevo cliente → notificar en Slack
    await client.callTool('slack', 'send-message', {
      channel: '#sales',
      text: `🎉 New subscription: $${data.object.plan.amount / 100}/mo`,
    });

    // Actualizar dashboard
    await client.callTool('analytics', 'track-event', {
      event: 'subscription_created',
      properties: data.object,
    });

    res.json({ received: true });
  }
});

app.listen(3000);
```

## Comandos compuestos personalizados

Crea comandos slash que ejecutan workflows complejos:

**.claude/commands/deploy-full.md**:
```markdown
---
description: Deploy completo con validaciones
allowed-tools: Bash(*), SlashCommand(/*)
---

# Deploy Full

Ejecuta deploy completo:

1. Verificar que no hay issues críticos en @linear
2. Ejecutar tests locales
3. Verificar build exitoso
4. Crear tag de versión en @github
5. Deploy a @vercel producción
6. Verificar health checks
7. Actualizar @notion release notes
8. Notificar en @slack

Si algún paso falla, rollback automático.
```

**Uso:**
```
You: /deploy-full

Claude Code:
[1/8] Verificando issues críticos en Linear...
✓ No hay issues críticos bloqueadores

[2/8] Ejecutando tests...
✓ 234/234 tests passed

[3/8] Building...
✓ Build exitoso (2m 34s)

[4/8] Creando tag v2.5.0 en GitHub...
✓ Tag creado y pusheado

[5/8] Deploying a Vercel...
✓ Deploy completado: https://app.example.com

[6/8] Health checks...
✓ API responding (200ms avg)
✓ Database connected
✓ Cache warmed

[7/8] Actualizando release notes en Notion...
✓ Página creada: https://notion.so/v2.5.0-release

[8/8] Notificando en Slack...
✓ Mensaje enviado a #deployments

🎉 Deploy v2.5.0 completado exitosamente
```

## Monitoreo continuo

Script que monitorea constantemente:

```typescript
// monitor.ts
import { MCPMultiClient } from './client.js';

const client = new MCPMultiClient();

async function checkHealth() {
  try {
    // Verificar errores en Sentry
    const errors = await client.readResource('sentry', 'errors/recent');
    const criticalErrors = JSON.parse(errors.result.contents[0].text).filter(
      (e: any) => e.level === 'error'
    );

    if (criticalErrors.length > 10) {
      // Crear issue en Linear
      await client.callTool('linear', 'create-issue', {
        title: `High error rate detected: ${criticalErrors.length} errors`,
        priority: 'urgent',
        labels: ['incident'],
      });

      // Notificar en Slack
      await client.callTool('slack', 'send-message', {
        channel: '#alerts',
        text: `🚨 ALERT: ${criticalErrors.length} errors in last hour`,
      });
    }

    // Verificar performance en Vercel
    const metrics = await client.readResource('vercel', 'metrics/p95');
    if (metrics.result.p95 > 500) {
      console.warn('⚠️ High latency detected');
    }

    // Verificar failed payments en Stripe
    const failedPayments = await client.readResource('stripe', 'payments/failed/today');
    if (failedPayments.result.count > 5) {
      console.warn('⚠️ Unusual failed payment rate');
    }
  } catch (error) {
    console.error('Monitor error:', error);
  }
}

// Ejecutar cada 5 minutos
setInterval(checkHealth, 5 * 60 * 1000);
```

## Seguridad y mejores prácticas

### 1. Limitar scopes

Solo solicita permisos necesarios:

```bash
# Malo: scopes muy amplios
claude mcp add github  # Todos los permisos

# Bueno: scopes específicos
claude mcp add github --scopes repo:read,issues:write
```

### 2. Secrets management

No hardcodear credentials:

```typescript
// Malo
const apiKey = 'sk_live_xxx';

// Bueno
const apiKey = process.env.STRIPE_API_KEY;
```

### 3. Rate limiting

Implementa rate limiting:

```typescript
class RateLimitedClient {
  private lastRequest: number = 0;
  private minInterval: number = 1000; // 1 request/segundo

  async readResource(server: string, uri: string) {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequest;

    if (timeSinceLastRequest < this.minInterval) {
      await new Promise(resolve =>
        setTimeout(resolve, this.minInterval - timeSinceLastRequest)
      );
    }

    this.lastRequest = Date.now();
    return await super.readResource(server, uri);
  }
}
```

### 4. Error handling robusto

```typescript
async function safeReadResource(server: string, uri: string) {
  try {
    return await client.readResource(server, uri);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error(`Server ${server} not available`);
      return { fallback: true, data: [] };
    }

    if (error.code === 401) {
      console.error(`Authentication failed for ${server}`);
      // Re-autenticar automáticamente
      await client.reconnect(server);
      return await client.readResource(server, uri);
    }

    throw error;
  }
}
```

## Checklist de completitud

- [ ] Implementé workflow multi-servidor
- [ ] Creé dashboard agregado
- [ ] Apliqué técnicas de optimización (cache, paralelización)
- [ ] Integré con custom instructions
- [ ] Configuré webhooks para eventos
- [ ] Creé comandos compuestos personalizados
- [ ] Implementé monitoreo continuo
- [ ] Apliqué mejores prácticas de seguridad

## Resumen

Has aprendido:
- Patrones avanzados de integración multi-servidor
- Técnicas de optimización (caching, paralelización, streaming)
- Integración con custom instructions
- Webhooks y manejo de eventos
- Comandos compuestos personalizados
- Monitoreo continuo automatizado
- Seguridad y mejores prácticas

En la Lección 8 aplicarás todo lo aprendido en un proyecto final completo.

---

**Módulo 5 - Lección 7 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
