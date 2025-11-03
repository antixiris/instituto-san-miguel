<p><strong><em>Lección 1: Introducción al Model Context Protocol (MCP)</em></strong></p>

## Introducción

El Model Context Protocol (MCP) es un estándar abierto que permite a las aplicaciones de IA conectarse con fuentes de datos externas y herramientas. En esta lección descubrirás qué es MCP, por qué existe y cómo transforma las capacidades de Claude Code.

## ¿Qué es MCP?

**Model Context Protocol (MCP)** es un protocolo estandarizado creado por Anthropic que permite a los modelos de IA acceder a:

- **Bases de datos** (PostgreSQL, MongoDB, Airtable)
- **APIs** (GitHub, Jira, Slack, Stripe)
- **Herramientas externas** (Figma, Notion, Google Drive)
- **Sistemas empresariales** (CRM, ERP, Analytics)

### Analogía: MCP como USB universal

Antes de USB, cada dispositivo necesitaba su propio cable y conector. USB estandarizó la conexión.

**Sin MCP:**
- Cada herramienta requiere integración personalizada
- Claude Code no puede acceder a tus sistemas
- Integración manual compleja

**Con MCP:**
- Protocolo estándar para todas las integraciones
- Claude Code se conecta a +40 servicios
- Instalación simple y uniforme

## ¿Por qué necesitas MCP?

### Problema: Claude Code aislado

Claude Code es poderoso, pero limitado a:
- Archivos locales
- Comandos de terminal
- Información en su base de conocimientos

No puede (sin MCP):
- Leer issues de GitHub
- Consultar tu base de datos
- Actualizar documentos de Figma
- Crear tickets en Jira
- Obtener métricas de analíticas

### Solución: MCP extiende capacidades

Con MCP, Claude Code puede:

```
You: Trae los issues abiertos de GitHub con prioridad alta

Claude Code: [Consultando @github:repos/tu-org/proyecto/issues]

Issues con prioridad alta:
1. #234 - Auth bug en producción
2. #189 - Performance en dashboard
3. #156 - Migration de PostgreSQL

¿Quieres que cree PRs para alguno?
```

## Conceptos clave de MCP

### 1. Servidores MCP

Un servidor MCP expone capacidades de un servicio externo:

- **GitHub Server**: Issues, PRs, repositorios
- **Stripe Server**: Pagos, clientes, suscripciones
- **Figma Server**: Diseños, componentes
- **PostgreSQL Server**: Queries, schemas

### 2. Clientes MCP

Claude Code actúa como cliente MCP:
- Descubre servidores disponibles
- Invoca funciones de servidores
- Recibe datos estructurados

### 3. Recursos MCP

Datos que puedes referenciar:

```
@github:repos/usuario/proyecto/issues
@stripe:customers
@notion:pages
@database:users
```

### 4. Prompts MCP

Comandos predefinidos del servidor:

```
/mcp__github__create-pr
/mcp__figma__export-component
/mcp__stripe__refund-payment
```

## Casos de uso de MCP

### Caso 1: Desarrollo desde issues

```
You: Implementa solución para @github:repos/mi-org/api/issues/234

Claude Code:
- Lee el issue de GitHub
- Analiza el código relacionado
- Implementa el fix
- Crea PR automáticamente
- Linkea el PR al issue
```

### Caso 2: Query de base de datos

```
You: ¿Cuántos usuarios se registraron esta semana?

Claude Code: [Consultando @database:users]

Registros esta semana: 147 usuarios
- Lunes: 32
- Martes: 28
- Miércoles: 31
- Jueves: 29
- Viernes: 27
```

### Caso 3: Integración de diseño

```
You: Implementa el componente Button según @figma:design-system/buttons

Claude Code:
- Obtiene specs de Figma
- Genera componente React
- Aplica estilos correctos
- Crea Storybook stories
```

### Caso 4: Monitoreo y alertas

```
You: Revisa @datadog:errors últimas 24h y sugiere fixes

Claude Code:
- Analiza logs de Datadog
- Identifica errores frecuentes
- Encuentra código relacionado
- Sugiere soluciones
```

## Arquitectura de MCP

```
┌─────────────────┐
│  Claude Code    │ ← Cliente MCP
│  (Cliente)      │
└────────┬────────┘
         │ MCP Protocol
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐ ┌────▼───┐
│GitHub │ │Stripe │ │ Figma  │ ← Servidores MCP
│Server │ │Server │ │ Server │
└───┬───┘ └──┬────┘ └────┬───┘
    │        │           │
┌───▼───┐ ┌──▼────┐ ┌────▼───┐
│GitHub │ │Stripe │ │ Figma  │ ← Servicios reales
│  API  │ │  API  │ │  API   │
└───────┘ └───────┘ └────────┘
```

## Servidores MCP populares

### Project Management
- **GitHub**: Issues, PRs, repositorios, actions
- **GitLab**: Pipelines, merge requests
- **Jira**: Tickets, sprints, epics
- **Linear**: Issues, proyectos
- **Asana**: Tareas, proyectos

### Design & Content
- **Figma**: Diseños, componentes, estilos
- **Notion**: Pages, databases, workspace
- **Google Drive**: Docs, Sheets, archivos
- **Canva**: Diseños, templates

### Payments & Business
- **Stripe**: Pagos, clientes, suscripciones
- **PayPal**: Transacciones, cuentas
- **Square**: Ventas, inventario

### Data & Analytics
- **PostgreSQL**: Queries SQL, schemas
- **MongoDB**: Collections, queries
- **Airtable**: Bases, records
- **HubSpot**: CRM, contacts, deals

### Infrastructure
- **Vercel**: Deployments, proyectos
- **Netlify**: Sites, builds
- **Cloudflare**: DNS, workers, analytics
- **AWS**: EC2, S3, Lambda

## Transporte MCP

MCP soporta tres métodos de conexión:

### 1. HTTP (Recomendado para servicios cloud)

```bash
claude mcp add github --transport http https://mcp.github.com/mcp
```

### 2. SSE (Server-Sent Events)

```bash
claude mcp add asana --transport sse https://mcp.asana.com/sse
```

### 3. Stdio (Procesos locales)

```bash
claude mcp add postgres --transport stdio -- psql-mcp-server
```

## Ventajas de usar MCP

### 1. Estandarización

Un protocolo para todas las integraciones:
- No reinventar la rueda
- Compatibilidad garantizada
- Actualizaciones centralizadas

### 2. Seguridad

- OAuth 2.0 para autenticación
- Tokens con scopes limitados
- Refresh automático
- Sin credenciales en código

### 3. Simplicidad

```bash
# Instalar servidor = 1 comando
claude mcp add github

# Usar en conversación
You: @github:repos/mi-org/proyecto/issues
```

### 4. Extensibilidad

- Crea tus propios servidores MCP
- Publica en el marketplace
- Comparte con la comunidad

## MCP vs Integraciones tradicionales

| Aspecto | Sin MCP | Con MCP |
|---------|---------|---------|
| Setup | Código personalizado | 1 comando |
| Auth | Manual compleja | OAuth automático |
| Actualizaciones | Cada servicio por separado | Centralizadas |
| Compatibilidad | Breaks frecuentes | Garantizada |
| Desarrollo | Semanas | Minutos |

## Requisitos previos

Para usar MCP necesitas:
- Claude Code instalado
- Cuenta en servicios que quieres integrar (GitHub, etc.)
- Permisos de OAuth (te guiarán en instalación)

## Preparación para la siguiente lección

En la Lección 2 explorarás la arquitectura interna de MCP y entenderás cómo funcionan los servidores, recursos y prompts.

## Resumen

Has aprendido:
- Qué es MCP y por qué existe
- Problemas que resuelve
- Conceptos clave (servidores, recursos, prompts)
- Casos de uso reales
- Arquitectura básica
- Servidores populares disponibles
- Ventajas sobre integraciones tradicionales

En la siguiente lección profundizarás en la arquitectura y componentes de MCP.

---

**Módulo 5 - Lección 1 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
