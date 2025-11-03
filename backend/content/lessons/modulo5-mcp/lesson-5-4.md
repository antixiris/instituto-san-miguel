# Lección 5.4: Servidores MCP Disponibles y Casos de Uso

> 📘 **En esta lección aprenderás:**
> - Los 100+ servidores MCP disponibles organizados por categoría
> - Servidores oficiales vs terceros
> - Casos de uso por industria y tipo de proyecto
> - Cómo elegir servidores para tu stack tecnológico
> - Configuración rápida de servidores populares

---

## 🏛️ Servidores Oficiales de Referencia

Mantenidos por Model Context Protocol:

### 1. **Filesystem**
```bash
claude mcp add --transport stdio filesystem -- npx -y @modelcontextprotocol/server-filesystem ~/Documents
```
**Capacidades:**
- Leer/escribir archivos
- Listar directorios
- Crear/eliminar archivos
- Permisos configurables

**Caso de uso:** Acceso seguro a archivos locales.

---

### 2. **Git**
```bash
claude mcp add --transport stdio git -- npx -y @modelcontextprotocol/server-git ~/Projects
```
**Capacidades:**
- Log, diff, status
- Crear commits
- Branches y merges
- Búsqueda en historial

**Caso de uso:** Operaciones Git automatizadas.

---

### 3. **Memory**
```bash
claude mcp add --transport stdio memory -- npx -y @modelcontextprotocol/server-memory
```
**Capacidades:**
- Almacena entidades y relaciones
- Knowledge graph persistente
- Búsqueda semántica
- Contexto entre sesiones

**Caso de uso:** Claude "recuerda" información de sesiones anteriores.

---

### 4. **Fetch**
```bash
claude mcp add --transport stdio fetch -- npx -y @modelcontextprotocol/server-fetch
```
**Capacidades:**
- Obtener contenido web
- Conversión HTML → Markdown
- Parsing de metadatos
- Rate limiting automático

**Caso de uso:** Web scraping y análisis de contenido.

---

### 5. **Time**
```bash
claude mcp add --transport stdio time -- npx -y @modelcontextprotocol/server-time
```
**Capacidades:**
- Conversión de zonas horarias
- Formateo de fechas
- Cálculos temporales
- Holidays internacionales

**Caso de uso:** Operaciones con fechas y tiempo.

---

### 6. **Sequential Thinking**
```bash
claude mcp add --transport stdio thinking -- npx -y @modelcontextprotocol/server-sequentialthinking
```
**Capacidades:**
- Razonamiento paso a paso
- Resolución dinámica de problemas
- Reflexión sobre resultados
- Debugging de lógica

**Caso de uso:** Problemas complejos que requieren múltiples pasos.

---

## 🚀 Desarrollo & Monitoreo

### **Sentry**
```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```
**Features:**
- Consultar errores en tiempo real
- Crear/actualizar issues
- Estadísticas de estabilidad
- Stack traces y contexto

**Use case:**
```
"Muéstrame los errores más frecuentes de las últimas 24 horas"
"Crea issue para error EXC_BAD_ACCESS en iOS"
```

---

### **Jam**
```bash
claude mcp add --transport http jam https://mcp.jam.dev/mcp
```
**Features:**
- Acceso a session recordings
- Network logs
- Console logs
- Device info

**Use case:**
```
"Analiza el recording del usuario que reportó el bug"
"Revisa network logs de la sesión fallida"
```

---

### **Socket**
```bash
claude mcp add --transport http socket https://mcp.socket.dev/mcp
```
**Features:**
- Análisis de seguridad de dependencias
- Detección de vulnerabilidades
- Licencias de paquetes
- Supply chain risk

**Use case:**
```
"Analiza seguridad de mi package.json"
"¿Hay vulnerabilidades en las dependencias?"
```

---

## 📋 Project Management

### **Linear**
```bash
claude mcp add --transport http linear https://mcp.linear.app/mcp
```
**Features:**
- Gestión de issues
- Projects y roadmaps
- Asignaciones automáticas
- SLA tracking

**Use case:**
```
"Crea issue de prioridad alta: Bug en checkout"
"Lista todos mis issues asignados"
"Genera reporte de sprint actual"
```

---

### **Notion**
```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
```
**Features:**
- Leer/escribir páginas
- Gestión de databases
- Templates
- Búsqueda en workspace

**Use case:**
```
"Crea página de documentación en Notion"
"Actualiza tabla de roadmap con estas tareas"
"Resume reunión y guarda en Notion"
```

---

### **Asana**
```bash
claude mcp add --transport http asana https://mcp.asana.com/sse
```
**Features:**
- Tasks y subtasks
- Projects y sections
- Custom fields
- Automatizaciones

**Use case:**
```
"Crea proyecto con template de migración DB"
"Actualiza status de tareas en progreso"
```

---

### **Atlassian (Jira + Confluence)**
```bash
claude mcp add --transport http atlassian https://mcp.atlassian.com/mcp
```
**Features:**
- Issues de Jira
- Confluence pages
- Boards y sprints
- JQL queries

**Use case:**
```
"Busca issues con label 'security' sin asignar"
"Crea página de Confluence con arquitectura del sistema"
```

---

## 🗄️ Bases de Datos

### **PostgreSQL**
```bash
claude mcp add --transport stdio postgres \
  --env DB_URL="postgresql://user:pass@localhost/db" \
  -- npx -y @bytebase/dbhub
```
**Features:**
- Queries SQL
- Inspección de schemas
- Explicar query plans
- Estadísticas de tablas

**Use case:**
```
"Lista tablas y sus relaciones"
"Optimiza esta query lenta"
"Genera migration para agregar campo 'avatar'"
```

---

### **SQLite**
```bash
claude mcp add --transport stdio sqlite \
  -- npx -y @modelcontextprotocol/server-sqlite ~/data/app.db
```
**Features:**
- Queries locales
- Business intelligence
- Análisis de datos
- Backup/restore

**Use case:**
```
"Analiza patrones de uso en la tabla 'events'"
"Genera reporte de usuarios activos por mes"
```

---

### **Airtable**
```bash
claude mcp add --transport stdio airtable \
  --env AIRTABLE_API_KEY="${AIRTABLE_KEY}" \
  -- npx -y airtable-mcp-server
```
**Features:**
- CRUD en bases y tables
- Views y filtros
- Attachments
- Linked records

**Use case:**
```
"Agrega estos datos a la tabla 'Customers'"
"Filtra registros con status 'pending'"
```

---

## 💳 Pagos & Commerce

### **Stripe**
```bash
claude mcp add --transport http stripe https://mcp.stripe.com
```
**Features:**
- Pagos y subscripciones
- Customers y productos
- Invoices
- Analytics de revenue

**Use case:**
```
"Crea plan de subscripción Pro: $49/mes"
"Lista pagos fallidos de esta semana"
"Genera reporte de MRR"
```

---

### **PayPal**
```bash
claude mcp add --transport http paypal https://mcp.paypal.com/mcp
```
**Features:**
- Pagos y checkouts
- Orders tracking
- Refunds
- Disputes

---

### **Square**
```bash
claude mcp add --transport http square https://mcp.square.com/mcp
```
**Features:**
- Payments e inventory
- Orders y customers
- Locations
- Reports

---

## 🎨 Diseño & Media

### **Figma**
```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```
**Features:**
- Acceso a diseños
- Componentes y estilos
- Exportar assets
- Comentarios

**Use case:**
```
"Convierte este diseño de Figma en React component"
"Lista todos los componentes del design system"
"Exporta iconos como SVG"
```

---

### **Canva**
```bash
claude mcp add --transport http canva https://mcp.canva.com/mcp
```
**Features:**
- Diseños y templates
- Brand kit
- Folders
- Exportación

**Use case:**
```
"Crea post de Instagram con template de marca"
"Genera thumbnail de YouTube para este video"
```

---

### **Cloudinary**
```bash
claude mcp add --transport http cloudinary https://mcp.cloudinary.com/mcp
```
**Features:**
- Upload de media
- Transformaciones
- Optimización automática
- Video processing

**Use case:**
```
"Sube estas imágenes y optimiza para web"
"Genera thumbnail de 300x200 del video"
"Convierte PNGs a WebP"
```

---

## ☁️ Infraestructura & Cloud

### **Vercel**
```bash
claude mcp add --transport http vercel https://mcp.vercel.com/mcp
```
**Features:**
- Deployments
- Projects y domains
- Environment variables
- Logs y analytics

**Use case:**
```
"Deploy rama 'feature-auth' a preview"
"Lista deployments de producción de esta semana"
"Configura variable STRIPE_KEY en production"
```

---

### **Netlify**
```bash
claude mcp add --transport http netlify https://mcp.netlify.com/mcp
```
**Features:**
- Sites y deploys
- Forms submissions
- Functions
- Analytics

---

### **Cloudflare**
```bash
claude mcp add --transport http cloudflare https://mcp.cloudflare.com/mcp
```
**Features:**
- DNS management
- Workers y KV
- Cache purging
- Security analytics

---

## 📧 Comunicación

### **Slack**
```bash
claude mcp add --transport http slack https://mcp.slack.com/mcp
```
**Features:**
- Enviar mensajes
- Gestionar canales
- Files upload
- Reactions

**Use case:**
```
"Envía mensaje a #engineering: Deploy completado"
"Crea canal #proyecto-nuevo con estos miembros"
```

---

### **Gmail (Google)**
```bash
claude mcp add --transport http gmail https://mcp.google.com/gmail
```
**Features:**
- Enviar/leer emails
- Labels y filtros
- Search
- Attachments

---

## 🏢 Casos de Uso por Industria

### E-Commerce
```bash
Stripe + Cloudinary + Airtable + Slack
```
**Workflow:**
```
"Usuario completó orden #1234"
→ Stripe: procesar pago
→ Cloudinary: optimizar imágenes de productos
→ Airtable: registrar orden
→ Slack: notificar a #orders
```

---

### SaaS B2B
```bash
Stripe + Linear + Notion + Sentry + Vercel
```
**Workflow:**
```
"Nuevo cliente signup"
→ Stripe: crear subscripción
→ Linear: crear issue de onboarding
→ Notion: agregar a CRM
→ Sentry: monitorear errores
→ Vercel: deploy personalizado
```

---

### Agencia de Diseño
```bash
Figma + Canva + Cloudinary + Asana
```
**Workflow:**
```
"Cliente aprobó diseño"
→ Figma: exportar assets finales
→ Canva: generar materials de marketing
→ Cloudinary: upload y optimize
→ Asana: marcar tarea completa
```

---

### Startup de IA
```bash
PostgreSQL + Sentry + GitHub + Linear + Notion
```
**Workflow:**
```
"Error en modelo de ML"
→ Sentry: capturar stack trace
→ PostgreSQL: analizar data
→ GitHub: crear issue con fix
→ Linear: trackear progress
→ Notion: documentar incident
```

---

## 🎯 Cómo Elegir Servidores MCP

### 1. Identifica tu Stack

**Backend:**
- Node.js → Filesystem, Git, PostgreSQL
- Python → Memory, SQLite, filesystem
- Go → Git, filesystem

**Frontend:**
- React/Vue → Figma, Cloudinary, Vercel
- Móvil → Cloudinary, Stripe

**Infraestructura:**
- AWS → (servidor custom)
- Vercel → Vercel MCP
- Cloudflare → Cloudflare MCP

---

### 2. Define Workflows Críticos

**Pregúntate:**
- ¿Qué tareas repito manualmente?
- ¿Qué servicios consulto frecuentemente?
- ¿Qué integraciones me ahorrarían más tiempo?

---

### 3. Prioriza por ROI

**Alta prioridad:**
- Servicios que usas diariamente
- Tareas repetitivas automatizables
- Integraciones que cruzan múltiples herramientas

**Baja prioridad:**
- Servicios que usas raramente
- Tareas simples que son rápidas manual

---

## 📝 Resumen

- **100+ servidores** disponibles en múltiples categorías
- **Oficiales:** filesystem, git, memory, fetch, time
- **Desarrollo:** Sentry, Jam, Socket, GitHub, GitLab
- **PM:** Linear, Notion, Asana, Atlassian
- **Databases:** PostgreSQL, MySQL, SQLite, Airtable
- **Pagos:** Stripe, PayPal, Square
- **Diseño:** Figma, Canva, Cloudinary
- **Cloud:** Vercel, Netlify, Cloudflare
- **Comunicación:** Slack, Gmail

**Estrategia:** Empieza con 3-5 servidores clave, expande según necesidad.

---

## 🚀 Próximos Pasos

**Lección 5.5:** Crearás tu **primer servidor MCP personalizado** desde cero con un proyecto guiado (Task Manager).

---

**Duración estimada:** 2 horas
**Dificultad:** ⭐⭐ Intermedia
