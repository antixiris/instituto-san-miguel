<p><strong><em>Lección 4: Catálogo de Servidores MCP Disponibles</em></strong></p>

## Introducción

Con más de 40 servidores MCP disponibles, es importante conocer qué opciones tienes y cuál usar para cada caso. En esta lección explorarás el catálogo completo, aprenderás las capacidades de cada servidor y descubrirás casos de uso prácticos.

## Servidores por categoría

### Project Management & Development

#### 1. GitHub
**URL**: `https://mcp.github.com/mcp`
**Instalación**: `claude mcp add github --transport http`

**Capacidades:**
- **Resources**: Repos, issues, PRs, commits, branches
- **Tools**: create-pr, close-issue, merge-pr, create-branch
- **Prompts**: review-pr, analyze-repo, generate-changelog

**Casos de uso:**
```
You: @github:repos/anthropics/claude-code/issues - Ver issues
You: Crea un PR para la rama feature/auth
You: /mcp__github__review-pr 234
```

**Permisos OAuth:**
- repo (lectura/escritura repositorios)
- issues (lectura/escritura issues)
- pull_requests (lectura/escritura PRs)

#### 2. GitLab
**Instalación**: `claude mcp add gitlab --transport http`

**Capacidades:**
- Pipelines CI/CD
- Merge requests
- Issues y epics
- Container registry

**Casos de uso:**
```
You: Estado de pipeline en @gitlab:projects/123/pipelines/latest
You: Crea merge request de feature/new-api a main
```

#### 3. Linear
**Instalación**: `claude mcp add linear --transport http`

**Capacidades:**
- Issues y proyectos
- Ciclos de desarrollo
- Roadmaps
- Integración con GitHub

**Casos de uso:**
```
You: @linear:issues asignados a mí con prioridad alta
You: Crea issue en Linear: "Implementar auth JWT"
You: Actualiza estado de LIN-123 a "In Progress"
```

#### 4. Jira
**Instalación**: `claude mcp add jira --transport http`

**Capacidades:**
- Tickets, epics, sprints
- Boards y workflows
- Reportes y dashboards

**Casos de uso:**
```
You: @jira:issues del sprint actual
You: Mueve PROJ-456 a Done
You: Crea subtarea en PROJ-123
```

#### 5. Asana
**Instalación**: `claude mcp add asana --transport http`

**Capacidades:**
- Tareas y proyectos
- Secciones y columnas
- Colaboradores y asignaciones

### Design & Content

#### 6. Figma
**Instalación**: `claude mcp add figma --transport http`

**Capacidades:**
- **Resources**: Files, components, styles
- **Tools**: export-component, get-styles, list-files
- **Prompts**: implement-component

**Casos de uso:**
```
You: @figma:files/ABC123/components - Ver componentes
You: Implementa Button según @figma:design-system/button
You: Exporta iconos de @figma:files/XYZ789
```

**Permisos:**
- file_read
- file_write (opcional)

#### 7. Notion
**Instalación**: `claude mcp add notion --transport http`

**Capacidades:**
- Pages y databases
- Bloques de contenido
- Propiedades y relaciones

**Casos de uso:**
```
You: @notion:pages con tag "documentation"
You: Crea página en Notion con estos requisitos
You: Actualiza database de tasks con nuevos items
```

#### 8. Google Drive
**Instalación**: `claude mcp add gdrive --transport http`

**Capacidades:**
- Docs, Sheets, Slides
- Archivos y carpetas
- Permisos compartidos

**Casos de uso:**
```
You: @gdrive:docs en carpeta "Proyectos 2024"
You: Crea Google Doc con esta documentación
You: Resume el contenido de @gdrive:sheet/ABC123
```

#### 9. Canva
**Instalación**: `claude mcp add canva --transport http`

**Capacidades:**
- Diseños y templates
- Exportación de assets
- Edición programática

### Payments & Business

#### 10. Stripe
**Instalación**: `claude mcp add stripe --transport http`

**Capacidades:**
- **Resources**: Customers, payments, subscriptions, products
- **Tools**: create-payment, refund, create-customer
- **Prompts**: analyze-revenue, check-failed-payments

**Casos de uso:**
```
You: @stripe:customers creados esta semana
You: ¿Cuántos pagos fallidos hay?
You: Crea refund para payment_id ch_xxx
You: Analiza revenue del último mes
```

**Permisos:**
- read_customers
- read_payments
- write_refunds

#### 11. PayPal
**Instalación**: `claude mcp add paypal --transport http`

**Capacidades:**
- Transacciones
- Órdenes
- Payouts

#### 12. Square
**Instalación**: `claude mcp add square --transport http`

**Capacidades:**
- Ventas y pagos
- Inventario
- Clientes

### Databases

#### 13. PostgreSQL
**Instalación**:
```bash
claude mcp add postgres --transport stdio \
  --command npx \
  --args "@modelcontextprotocol/server-postgres" \
  --env DATABASE_URL="postgresql://localhost/mydb"
```

**Capacidades:**
- **Resources**: Tables, schemas, queries
- **Tools**: execute-query, describe-table, list-tables
- **Prompts**: analyze-schema, optimize-query

**Casos de uso:**
```
You: @postgres:tables - Listar tablas
You: ¿Cuántos usuarios hay en @postgres:users?
You: Describe estructura de tabla orders
You: Ejecuta query: SELECT * FROM users WHERE created_at > NOW() - INTERVAL '7 days'
```

**Variables requeridas:**
- `DATABASE_URL`

#### 14. MongoDB
**Instalación**:
```bash
claude mcp add mongodb --transport stdio \
  --command npx \
  --args "@modelcontextprotocol/server-mongodb" \
  --env MONGODB_URI="mongodb://localhost/mydb"
```

**Capacidades:**
- Collections y documentos
- Aggregation pipelines
- Índices

#### 15. Airtable
**Instalación**: `claude mcp add airtable --transport http`

**Capacidades:**
- Bases y tablas
- Records y campos
- Views y filtros

**Casos de uso:**
```
You: @airtable:base/appXXX/table/Tasks
You: Agrega record a tabla de Customers
You: Filtra records con status "Active"
```

#### 16. HubSpot
**Instalación**: `claude mcp add hubspot --transport http`

**Capacidades:**
- CRM: Contacts, Companies, Deals
- Marketing: Emails, campaigns
- Sales: Pipelines, quotes

### Infrastructure & Deployment

#### 17. Vercel
**Instalación**: `claude mcp add vercel --transport http`

**Capacidades:**
- **Resources**: Deployments, projects, domains
- **Tools**: deploy, rollback, view-logs
- **Prompts**: analyze-performance, check-errors

**Casos de uso:**
```
You: @vercel:deployments del último día
You: Deploy rama feature/new-ui a preview
You: Rollback a deployment anterior
You: Analiza errores en @vercel:projects/my-app
```

#### 18. Netlify
**Instalación**: `claude mcp add netlify --transport http`

**Capacidades:**
- Sites y builds
- Forms y functions
- Analytics

#### 19. Cloudflare
**Instalación**: `claude mcp add cloudflare --transport http`

**Capacidades:**
- DNS y dominios
- Workers
- Analytics y seguridad

**Casos de uso:**
```
You: @cloudflare:zones/example.com/dns
You: Crea registro DNS A para api.example.com
You: Ver analytics de últimas 24h
```

#### 20. AWS (S3, Lambda, EC2)
**Instalación**: `claude mcp add aws --transport http`

**Capacidades:**
- S3 buckets y objetos
- Lambda functions
- EC2 instances

### Monitoring & Analytics

#### 21. Datadog
**Instalación**: `claude mcp add datadog --transport http`

**Capacidades:**
- Logs y métricas
- Dashboards
- Alertas

**Casos de uso:**
```
You: @datadog:logs con error en últimas 2 horas
You: Analiza métricas de CPU de servidor api-prod
You: ¿Hay alertas activas críticas?
```

#### 22. Sentry
**Instalación**: `claude mcp add sentry --transport http`

**Capacidades:**
- Errores y excepciones
- Performance monitoring
- Releases

#### 23. Google Analytics
**Instalación**: `claude mcp add ga4 --transport http`

**Capacidades:**
- Tráfico y usuarios
- Eventos y conversiones
- Reportes personalizados

### Communication

#### 24. Slack
**Instalación**: `claude mcp add slack --transport http`

**Capacidades:**
- Canales y mensajes
- Usuarios y threads
- Files y reactions

**Casos de uso:**
```
You: Envía mensaje a #dev: "Deploy completado"
You: @slack:messages en #support últimas 24h
You: Crea channel #proyecto-nuevo
```

#### 25. Discord
**Instalación**: `claude mcp add discord --transport http`

**Capacidades:**
- Servidores y canales
- Mensajes y webhooks

#### 26. Email (Gmail, Outlook)
**Instalación**: `claude mcp add gmail --transport http`

**Capacidades:**
- Leer y enviar emails
- Labels y filtros
- Attachments

## Tabla comparativa de servidores

| Servidor | Categoría | Transport | OAuth | Casos de uso principales |
|----------|-----------|-----------|-------|--------------------------|
| GitHub | Dev | HTTP | ✓ | Issues, PRs, repos |
| GitLab | Dev | HTTP | ✓ | CI/CD, MRs |
| Linear | Dev | HTTP | ✓ | Issue tracking |
| Jira | Dev | HTTP | ✓ | Project mgmt |
| Figma | Design | HTTP | ✓ | Design to code |
| Notion | Content | HTTP | ✓ | Docs, knowledge base |
| Stripe | Payments | HTTP | ✓ | Payments, refunds |
| PostgreSQL | Database | Stdio | ✗ | SQL queries |
| MongoDB | Database | Stdio | ✗ | NoSQL queries |
| Vercel | Infra | HTTP | ✓ | Deployments |
| Slack | Comm | HTTP | ✓ | Team messages |

## Elegir el servidor correcto

### Por tipo de proyecto

**Web App Full Stack:**
- GitHub (código)
- PostgreSQL (datos)
- Vercel/Netlify (deploy)
- Sentry (errores)

**E-commerce:**
- GitHub (código)
- Stripe/PayPal (pagos)
- MongoDB (productos)
- Google Analytics (analytics)

**Design System:**
- Figma (diseños)
- GitHub (código)
- Notion (documentación)
- Vercel (Storybook)

**SaaS B2B:**
- Linear/Jira (roadmap)
- HubSpot (CRM)
- Stripe (billing)
- Slack (support)

## Ejercicio práctico

### Objetivo: Instalar stack completo para proyecto

Según tu tipo de proyecto, instala servidores relevantes:

**Ejemplo - Web App:**
```bash
# 1. Code & Tasks
claude mcp add github --transport http

# 2. Database
claude mcp add postgres --transport stdio \
  --env DATABASE_URL="postgresql://localhost/myapp"

# 3. Deploy
claude mcp add vercel --transport http

# 4. Monitoring
claude mcp add sentry --transport http

# Autenticar
claude mcp auth github
claude mcp auth vercel
claude mcp auth sentry

# Verificar
claude mcp list
```

**Probar integración:**
```
You: Resume estado del proyecto:
- Issues abiertos en @github
- Registros en @postgres:users
- Últimos deployments en @vercel
- Errores en @sentry últimas 24h
```

## Checklist de completitud

- [ ] Exploré catálogo completo de servidores
- [ ] Entiendo categorías principales
- [ ] Instalé al menos 3 servidores de categorías diferentes
- [ ] Probé recursos, tools y prompts de cada uno
- [ ] Identifiqué cuáles son relevantes para mis proyectos
- [ ] Sé elegir servidor según tipo de proyecto

## Resumen

Has aprendido:
- Catálogo completo de 40+ servidores MCP
- Servidores por categoría (Dev, Design, Payments, etc.)
- Capacidades de cada servidor principal
- Casos de uso prácticos
- Cómo elegir servidores según proyecto

En la Lección 5 aprenderás a crear tu propio servidor MCP personalizado.

---

**Módulo 5 - Lección 4 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
