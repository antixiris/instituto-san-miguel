<p><strong><em>Lección 8: Proyecto Final - Sistema ProjectHub con MCP</em></strong></p>

## Introducción

Esta es la lección integradora del Módulo 5. Crearás **ProjectHub**: un sistema completo que integra GitHub, Linear, Vercel y Stripe mediante MCP para gestionar proyectos end-to-end.

## Descripción del proyecto

**ProjectHub** es un dashboard unificado que:
- Sincroniza issues entre GitHub y Linear
- Gestiona deploys de Vercel
- Monitorea pagos de Stripe
- Automatiza workflows completos
- Provee analytics y reportes

### Stack tecnológico

**Backend:**
- Node.js + Express
- MCP SDK
- PostgreSQL (para cache y logs)

**Frontend:**
- React + TypeScript
- TailwindCSS
- Recharts (gráficos)

**MCP Servers:**
- GitHub
- Linear
- Vercel
- Stripe

## Arquitectura del proyecto

```
project-hub/
├── backend/
│   ├── src/
│   │   ├── mcp/
│   │   │   ├── client.ts           # Cliente MCP unificado
│   │   │   ├── sync.ts             # Sincronización GitHub-Linear
│   │   │   ├── deploy.ts           # Gestión de deploys
│   │   │   └── analytics.ts        # Agregación de métricas
│   │   ├── api/
│   │   │   ├── projects.ts         # CRUD de proyectos
│   │   │   ├── dashboard.ts        # Datos del dashboard
│   │   │   └── webhooks.ts         # Webhooks de GitHub, Stripe
│   │   ├── db/
│   │   │   └── schema.sql          # Esquema PostgreSQL
│   │   └── server.ts               # Servidor Express
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx       # Dashboard principal
│   │   │   ├── IssueSync.tsx       # Sincronización issues
│   │   │   ├── DeployPanel.tsx     # Panel de deploys
│   │   │   └── Analytics.tsx       # Gráficos y métricas
│   │   ├── hooks/
│   │   │   └── useMCPData.ts       # Hook para datos MCP
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## Fase 1: Setup e infraestructura

### Paso 1.1: Inicializar proyecto

```bash
# Crear estructura
mkdir project-hub
cd project-hub
mkdir -p backend/src/{mcp,api,db} frontend/src/{components,hooks}

# Inicializar backend
cd backend
npm init -y
npm install express @modelcontextprotocol/sdk pg dotenv cors
npm install --save-dev typescript @types/node @types/express

# Inicializar frontend
cd ../frontend
npm create vite@latest . -- --template react-ts
npm install axios recharts @tanstack/react-query
npm install -D tailwindcss postcss autoprefixer
```

### Paso 1.2: Configurar MCP servers

```bash
# GitHub
claude mcp add github --scope project --transport http

# Linear
claude mcp add linear --scope project --transport http

# Vercel
claude mcp add vercel --scope project --transport http

# Stripe
claude mcp add stripe --scope project --transport http

# Autenticar todos
claude mcp auth github
claude mcp auth linear
claude mcp auth vercel
claude mcp auth stripe
```

### Paso 1.3: Configurar base de datos

**backend/src/db/schema.sql**:
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  github_repo VARCHAR(255),
  linear_team VARCHAR(255),
  vercel_project VARCHAR(255),
  stripe_product VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sync_logs (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  source VARCHAR(50),
  action VARCHAR(100),
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cache (
  key VARCHAR(255) PRIMARY KEY,
  value JSONB,
  expires_at TIMESTAMP
);

CREATE INDEX idx_cache_expires ON cache(expires_at);
```

```bash
# Crear base de datos
createdb projecthub

# Aplicar schema
psql projecthub < src/db/schema.sql
```

## Fase 2: Cliente MCP unificado

**backend/src/mcp/client.ts**:
```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

export class ProjectHubMCP {
  private clients: Map<string, Client> = new Map();

  async initialize() {
    await this.connectGitHub();
    await this.connectLinear();
    await this.connectVercel();
    await this.connectStripe();
  }

  private async connectGitHub() {
    const transport = new StdioClientTransport({
      command: 'npx',
      args: ['@modelcontextprotocol/server-github'],
    });

    const client = new Client(
      { name: 'projecthub-github', version: '1.0.0' },
      { capabilities: {} }
    );

    await client.connect(transport);
    this.clients.set('github', client);
  }

  // Similar para Linear, Vercel, Stripe...

  async getGitHubIssues(repo: string) {
    const github = this.clients.get('github')!;
    return await github.request({
      method: 'resources/read',
      params: { uri: `repos/${repo}/issues` },
    });
  }

  async getLinearIssues(team: string) {
    const linear = this.clients.get('linear')!;
    return await linear.request({
      method: 'resources/read',
      params: { uri: `teams/${team}/issues` },
    });
  }

  async createGitHubPR(repo: string, data: any) {
    const github = this.clients.get('github')!;
    return await github.request({
      method: 'tools/call',
      params: {
        name: 'create-pr',
        arguments: { repo, ...data },
      },
    });
  }

  async deployToVercel(project: string, branch: string) {
    const vercel = this.clients.get('vercel')!;
    return await vercel.request({
      method: 'tools/call',
      params: {
        name: 'deploy',
        arguments: { project, gitSource: { ref: branch } },
      },
    });
  }

  async getStripeRevenue(period: string) {
    const stripe = this.clients.get('stripe')!;
    return await stripe.request({
      method: 'resources/read',
      params: { uri: `revenue/${period}` },
    });
  }
}
```

## Fase 3: Sincronización GitHub-Linear

**backend/src/mcp/sync.ts**:
```typescript
import { ProjectHubMCP } from './client.js';
import { db } from '../db/index.js';

export class IssueSync {
  constructor(private mcp: ProjectHubMCP) {}

  async syncProject(projectId: number) {
    const project = await db.getProject(projectId);

    // Obtener issues de ambas fuentes
    const [githubIssues, linearIssues] = await Promise.all([
      this.mcp.getGitHubIssues(project.github_repo),
      this.mcp.getLinearIssues(project.linear_team),
    ]);

    const ghIssues = JSON.parse(githubIssues.result.contents[0].text);
    const linIssues = JSON.parse(linearIssues.result.contents[0].text);

    // Detectar diferencias
    const toCreateInLinear = this.findMissing(ghIssues, linIssues, 'github_id');
    const toCreateInGitHub = this.findMissing(linIssues, ghIssues, 'linear_id');
    const toUpdate = this.findUpdates(ghIssues, linIssues);

    // Aplicar cambios
    for (const issue of toCreateInLinear) {
      await this.createLinearFromGitHub(issue, project.linear_team);
      await this.logSync(projectId, 'github→linear', 'create', issue);
    }

    for (const issue of toCreateInGitHub) {
      await this.createGitHubFromLinear(issue, project.github_repo);
      await this.logSync(projectId, 'linear→github', 'create', issue);
    }

    for (const [ghIssue, linIssue] of toUpdate) {
      await this.updateBoth(ghIssue, linIssue);
      await this.logSync(projectId, 'bidirectional', 'update', {ghIssue, linIssue});
    }

    return {
      created: toCreateInLinear.length + toCreateInGitHub.length,
      updated: toUpdate.length,
    };
  }

  private findMissing(source: any[], target: any[], idField: string) {
    const targetIds = new Set(target.map(t => t[idField]));
    return source.filter(s => !targetIds.has(s.id));
  }

  private findUpdates(ghIssues: any[], linIssues: any[]) {
    const updates: [any, any][] = [];

    for (const ghIssue of ghIssues) {
      const linIssue = linIssues.find(l => l.github_id === ghIssue.id);
      if (linIssue && this.needsUpdate(ghIssue, linIssue)) {
        updates.push([ghIssue, linIssue]);
      }
    }

    return updates;
  }

  private needsUpdate(ghIssue: any, linIssue: any): boolean {
    return (
      ghIssue.state !== this.mapLinearStatus(linIssue.status) ||
      ghIssue.title !== linIssue.title
    );
  }

  private async createLinearFromGitHub(ghIssue: any, team: string) {
    await this.mcp.createLinearIssue(team, {
      title: ghIssue.title,
      description: `From GitHub: ${ghIssue.html_url}\n\n${ghIssue.body}`,
      labels: ghIssue.labels.map((l: any) => l.name),
      github_id: ghIssue.id,
    });
  }

  private async logSync(projectId: number, source: string, action: string, details: any) {
    await db.logSync(projectId, source, action, details);
  }
}
```

## Fase 4: API Backend

**backend/src/api/dashboard.ts**:
```typescript
import { Router } from 'express';
import { ProjectHubMCP } from '../mcp/client.js';
import { db } from '../db/index.js';

const router = Router();
const mcp = new ProjectHubMCP();

// Inicializar MCP al arrancar
mcp.initialize();

// Dashboard principal
router.get('/api/dashboard/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await db.getProject(parseInt(projectId));

    // Obtener datos en paralelo
    const [github, linear, vercel, stripe] = await Promise.all([
      mcp.getGitHubIssues(project.github_repo),
      mcp.getLinearIssues(project.linear_team),
      mcp.getVercelDeploys(project.vercel_project),
      mcp.getStripeRevenue('7d'),
    ]);

    res.json({
      project,
      development: {
        github: JSON.parse(github.result.contents[0].text),
        linear: JSON.parse(linear.result.contents[0].text),
      },
      deployment: JSON.parse(vercel.result.contents[0].text),
      business: JSON.parse(stripe.result.contents[0].text),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sincronizar issues
router.post('/api/sync/:projectId', async (req, res) => {
  try {
    const sync = new IssueSync(mcp);
    const result = await sync.syncProject(parseInt(req.params.projectId));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deploy manual
router.post('/api/deploy/:projectId', async (req, res) => {
  try {
    const { branch } = req.body;
    const project = await db.getProject(parseInt(req.params.projectId));

    const deployment = await mcp.deployToVercel(
      project.vercel_project,
      branch
    );

    res.json(deployment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

## Fase 5: Frontend Dashboard

**frontend/src/components/Dashboard.tsx**:
```typescript
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';

interface Project {
  id: number;
  name: string;
}

interface DashboardData {
  project: Project;
  development: {
    github: any[];
    linear: any[];
  };
  deployment: any[];
  business: any;
}

export function Dashboard({ projectId }: { projectId: number }) {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', projectId],
    queryFn: async () => {
      const response = await axios.get(`/api/dashboard/${projectId}`);
      return response.data as DashboardData;
    },
    refetchInterval: 60000, // Refresh cada minuto
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  const githubOpen = data.development.github.filter(i => i.state === 'open').length;
  const linearInProgress = data.development.linear.filter(i => i.status === 'in_progress').length;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{data.project.name}</h1>

      {/* Development stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">GitHub</h2>
          <p className="text-3xl">{githubOpen}</p>
          <p className="text-gray-600">Open Issues</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Linear</h2>
          <p className="text-3xl">{linearInProgress}</p>
          <p className="text-gray-600">In Progress</p>
        </div>
      </div>

      {/* Deployment chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Deploys (7 days)</h2>
        <BarChart width={600} height={300} data={data.deployment.slice(0, 7)}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Revenue */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Revenue (7 days)</h2>
        <p className="text-3xl text-green-600">${data.business.total}</p>
        <p className="text-gray-600">
          {data.business.customers} customers
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => syncIssues(projectId)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Sync Issues
        </button>

        <button
          onClick={() => deployProject(projectId, 'main')}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Deploy to Production
        </button>
      </div>
    </div>
  );
}

async function syncIssues(projectId: number) {
  await axios.post(`/api/sync/${projectId}`);
  alert('Issues synced!');
}

async function deployProject(projectId: number, branch: string) {
  await axios.post(`/api/deploy/${projectId}`, { branch });
  alert('Deployment started!');
}
```

## Fase 6: Automatización con webhooks

**backend/src/api/webhooks.ts**:
```typescript
import { Router } from 'express';
import { ProjectHubMCP } from '../mcp/client.js';

const router = Router();
const mcp = new ProjectHubMCP();

// Webhook de GitHub
router.post('/webhooks/github', async (req, res) => {
  const { action, issue, pull_request, repository } = req.body;

  // Issue abierto → crear en Linear
  if (action === 'opened' && issue) {
    const project = await db.getProjectByRepo(repository.full_name);

    await mcp.createLinearIssue(project.linear_team, {
      title: issue.title,
      description: `From GitHub #${issue.number}\n${issue.html_url}\n\n${issue.body}`,
      github_id: issue.id,
    });
  }

  // PR merged → deploy automático
  if (action === 'closed' && pull_request?.merged) {
    const project = await db.getProjectByRepo(repository.full_name);

    if (pull_request.base.ref === 'main') {
      await mcp.deployToVercel(project.vercel_project, 'main');
    }
  }

  res.json({ received: true });
});

// Webhook de Stripe
router.post('/webhooks/stripe', async (req, res) => {
  const { type, data } = req.body;

  // Nueva suscripción → actualizar analytics
  if (type === 'customer.subscription.created') {
    await db.recordRevenue({
      amount: data.object.plan.amount,
      customer_id: data.object.customer,
      subscription_id: data.object.id,
    });
  }

  res.json({ received: true });
});

export default router;
```

## Checklist de completitud

- [ ] Backend con MCP client unificado
- [ ] Sincronización GitHub-Linear funcionando
- [ ] API endpoints para dashboard
- [ ] Frontend Dashboard con métricas
- [ ] Webhooks GitHub y Stripe configurados
- [ ] Deploy automático funcionando
- [ ] Tests manuales de todo el flujo
- [ ] Documentación del proyecto
- [ ] README con instrucciones de setup

## Resultado esperado

Al completar el proyecto tendrás:

1. **Dashboard unificado** mostrando métricas de 4 servicios
2. **Sincronización automática** de issues GitHub-Linear
3. **Deploy con un click** a Vercel
4. **Analytics en tiempo real** de revenue
5. **Automatizaciones** mediante webhooks
6. **Experiencia completa** de desarrollo con MCP

## Resumen del Módulo 5

Has dominado:
- Conceptos fundamentales de MCP
- Arquitectura y componentes
- Configuración de servidores
- Catálogo completo de servers
- Creación de servidores personalizados
- Creación de clientes personalizados
- Integración avanzada
- Proyecto completo end-to-end

**¡Felicitaciones!** Ahora eres un experto en Model Context Protocol y puedes extender Claude Code de formas ilimitadas.

---

**Módulo 5 - Lección 8 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
