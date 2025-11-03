<p><strong><em>Lección 6: Creando Clientes MCP Personalizados</em></strong></p>

## Introducción

Aunque Claude Code es el cliente MCP principal que usarás, a veces necesitas crear scripts o aplicaciones que también consuman servidores MCP. En esta lección aprenderás a crear clientes MCP personalizados.

## ¿Cuándo crear un cliente MCP?

Crea un cliente MCP personalizado cuando:
- Necesitas automatizar tareas programáticamente
- Quieres integrar MCP en tu aplicación
- Necesitas un dashboard que consuma servidores MCP
- Quieres crear herramientas CLI personalizadas

**Ejemplos:**
- Script de CI/CD que usa GitHub MCP
- Dashboard que muestra métricas de Stripe
- CLI tool que consulta múltiples servidores
- Bot que automatiza tareas usando MCP

## Proyecto: Cliente CLI para múltiples servidores

Crearás un cliente que consulta GitHub, PostgreSQL y Stripe simultáneamente.

### Paso 1: Setup del proyecto

```bash
# Crear proyecto
mkdir mcp-multi-client
cd mcp-multi-client

# Inicializar
npm init -y

# Instalar dependencias
npm install @modelcontextprotocol/sdk
npm install commander chalk
npm install --save-dev typescript @types/node

# TypeScript config
npx tsc --init
```

### Paso 2: Estructura básica del cliente

**src/client.ts**:
```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

export class MCPMultiClient {
  private clients: Map<string, Client> = new Map();

  async connectServer(
    name: string,
    command: string,
    args: string[]
  ): Promise<void> {
    const transport = new StdioClientTransport({
      command,
      args,
    });

    const client = new Client(
      {
        name: `multi-client-${name}`,
        version: '1.0.0',
      },
      {
        capabilities: {},
      }
    );

    await client.connect(transport);
    this.clients.set(name, client);
    console.log(`✓ Connected to ${name}`);
  }

  async listResources(serverName: string): Promise<any> {
    const client = this.clients.get(serverName);
    if (!client) {
      throw new Error(`Server ${serverName} not connected`);
    }

    return await client.request(
      {
        method: 'resources/list',
      },
      { result: { resources: [] } }
    );
  }

  async readResource(serverName: string, uri: string): Promise<any> {
    const client = this.clients.get(serverName);
    if (!client) {
      throw new Error(`Server ${serverName} not connected`);
    }

    return await client.request(
      {
        method: 'resources/read',
        params: { uri },
      },
      { result: { contents: [] } }
    );
  }

  async callTool(
    serverName: string,
    toolName: string,
    args: any
  ): Promise<any> {
    const client = this.clients.get(serverName);
    if (!client) {
      throw new Error(`Server ${serverName} not connected`);
    }

    return await client.request(
      {
        method: 'tools/call',
        params: {
          name: toolName,
          arguments: args,
        },
      },
      { result: { content: [] } }
    );
  }

  async disconnect(): Promise<void> {
    for (const [name, client] of this.clients) {
      await client.close();
      console.log(`✓ Disconnected from ${name}`);
    }
  }
}
```

### Paso 3: CLI con Commander.js

**src/cli.ts**:
```typescript
#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { MCPMultiClient } from './client.js';

const program = new Command();

program
  .name('mcp-cli')
  .description('CLI for interacting with multiple MCP servers')
  .version('1.0.0');

// Comando: dashboard
program
  .command('dashboard')
  .description('Show multi-server dashboard')
  .action(async () => {
    const client = new MCPMultiClient();

    try {
      console.log(chalk.blue('Connecting to servers...'));

      // Conectar a múltiples servidores
      await client.connectServer('github', 'npx', [
        '@modelcontextprotocol/server-github',
      ]);
      await client.connectServer('postgres', 'npx', [
        '@modelcontextprotocol/server-postgres',
      ]);

      console.log(chalk.green('\n✓ All servers connected\n'));

      // Dashboard
      console.log(chalk.bold('=== MULTI-SERVER DASHBOARD ===\n'));

      // GitHub stats
      console.log(chalk.cyan('GitHub:'));
      const ghRepos = await client.readResource(
        'github',
        'repos/anthropics/claude-code'
      );
      console.log(`  Repos: ${ghRepos.result.contents.length}`);

      // PostgreSQL stats
      console.log(chalk.cyan('\nPostgreSQL:'));
      const tables = await client.listResources('postgres');
      console.log(`  Tables: ${tables.result.resources.length}`);

      await client.disconnect();
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

// Comando: query
program
  .command('query <server> <uri>')
  .description('Query resource from specific server')
  .action(async (server, uri) => {
    const client = new MCPMultiClient();

    try {
      // Determinar comando según servidor
      const serverConfigs = {
        github: ['npx', ['@modelcontextprotocol/server-github']],
        postgres: ['npx', ['@modelcontextprotocol/server-postgres']],
      };

      const [command, args] = serverConfigs[server];
      await client.connectServer(server, command, args);

      const result = await client.readResource(server, uri);

      console.log(chalk.green('Result:'));
      console.log(JSON.stringify(result.result.contents, null, 2));

      await client.disconnect();
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

// Comando: execute
program
  .command('execute <server> <tool> [args...]')
  .description('Execute tool on specific server')
  .action(async (server, tool, args) => {
    const client = new MCPMultiClient();

    try {
      const serverConfigs = {
        github: ['npx', ['@modelcontextprotocol/server-github']],
        tasks: ['node', ['../tasks-mcp-server/dist/index.js']],
      };

      const [command, cmdArgs] = serverConfigs[server];
      await client.connectServer(server, command, cmdArgs);

      // Parse args como JSON
      const toolArgs = args.length > 0 ? JSON.parse(args.join(' ')) : {};

      const result = await client.callTool(server, tool, toolArgs);

      console.log(chalk.green('Result:'));
      console.log(JSON.stringify(result.result.content, null, 2));

      await client.disconnect();
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program.parse();
```

### Paso 4: Compilar y probar

```bash
# Compilar
npm run build

# Hacer ejecutable
chmod +x dist/cli.js

# Probar dashboard
node dist/cli.js dashboard

# Probar query
node dist/cli.js query github repos/anthropics/claude-code

# Probar execute
node dist/cli.js execute tasks create-task '{"title":"Test task"}'
```

## Cliente para aplicación web

Puedes crear un cliente MCP para tu aplicación web.

### Backend con Express

**src/server.ts**:
```typescript
import express from 'express';
import { MCPMultiClient } from './client.js';

const app = express();
const client = new MCPMultiClient();

// Conectar servidores al inicio
async function initializeServers() {
  await client.connectServer('github', 'npx', [
    '@modelcontextprotocol/server-github',
  ]);
  await client.connectServer('stripe', 'npx', [
    '@modelcontextprotocol/server-stripe',
  ]);
}

// API endpoints
app.get('/api/github/repos', async (req, res) => {
  try {
    const result = await client.readResource(
      'github',
      'repos/anthropics/claude-code'
    );
    res.json(result.result.contents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/stripe/customers', async (req, res) => {
  try {
    const result = await client.readResource('stripe', 'customers');
    res.json(result.result.contents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/github/create-pr', async (req, res) => {
  try {
    const result = await client.callTool('github', 'create-pr', req.body);
    res.json(result.result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
const PORT = 3000;
initializeServers().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

// Cleanup al cerrar
process.on('SIGTERM', async () => {
  await client.disconnect();
  process.exit(0);
});
```

### Frontend React

```typescript
// components/Dashboard.tsx
import { useEffect, useState } from 'react';

interface GitHubStats {
  repos: number;
  issues: number;
}

interface StripeStats {
  customers: number;
  revenue: number;
}

export function Dashboard() {
  const [github, setGithub] = useState<GitHubStats | null>(null);
  const [stripe, setStripe] = useState<StripeStats | null>(null);

  useEffect(() => {
    // Fetch GitHub data
    fetch('/api/github/repos')
      .then(res => res.json())
      .then(data => {
        setGithub({
          repos: data.length,
          issues: data.reduce((acc, r) => acc + r.open_issues, 0),
        });
      });

    // Fetch Stripe data
    fetch('/api/stripe/customers')
      .then(res => res.json())
      .then(data => {
        setStripe({
          customers: data.length,
          revenue: data.reduce((acc, c) => acc + c.lifetime_value, 0),
        });
      });
  }, []);

  return (
    <div className="dashboard">
      <h1>Multi-Server Dashboard</h1>

      <div className="stats">
        <div className="card">
          <h2>GitHub</h2>
          <p>Repos: {github?.repos}</p>
          <p>Open Issues: {github?.issues}</p>
        </div>

        <div className="card">
          <h2>Stripe</h2>
          <p>Customers: {stripe?.customers}</p>
          <p>Revenue: ${stripe?.revenue}</p>
        </div>
      </div>
    </div>
  );
}
```

## Cliente para automatización

Script de CI/CD que usa MCP:

**scripts/ci-check.ts**:
```typescript
import { MCPMultiClient } from '../src/client.js';

async function ciCheck() {
  const client = new MCPMultiClient();

  try {
    // Conectar a GitHub
    await client.connectServer('github', 'npx', [
      '@modelcontextprotocol/server-github',
    ]);

    // Verificar que no hay issues críticos abiertos
    const issues = await client.readResource(
      'github',
      'repos/mi-org/mi-app/issues'
    );

    const criticalIssues = JSON.parse(
      issues.result.contents[0].text
    ).filter(
      (i: any) => i.labels.some((l: any) => l.name === 'critical')
    );

    if (criticalIssues.length > 0) {
      console.error('❌ Critical issues found:');
      criticalIssues.forEach((i: any) => {
        console.error(`  - #${i.number}: ${i.title}`);
      });
      process.exit(1);
    }

    console.log('✓ No critical issues');

    // Crear tag de release
    await client.callTool('github', 'create-tag', {
      tag: `v${process.env.VERSION}`,
      message: 'Release via CI',
    });

    console.log('✓ Release tag created');

    await client.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await client.disconnect();
    process.exit(1);
  }
}

ciCheck();
```

Usar en GitHub Actions:

```yaml
# .github/workflows/release.yml
name: Release
on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3

      - name: Install dependencies
        run: npm install

      - name: Run CI checks with MCP
        run: ts-node scripts/ci-check.ts
        env:
          VERSION: ${{ github.ref_name }}
```

## Manejo de múltiples servidores

Gestionar conexiones eficientemente:

```typescript
export class MCPConnectionPool {
  private connections: Map<string, Client> = new Map();
  private config: Map<string, { command: string; args: string[] }> = new Map();

  registerServer(name: string, command: string, args: string[]) {
    this.config.set(name, { command, args });
  }

  async getClient(name: string): Promise<Client> {
    // Reusar conexión existente
    if (this.connections.has(name)) {
      return this.connections.get(name)!;
    }

    // Crear nueva conexión
    const config = this.config.get(name);
    if (!config) {
      throw new Error(`Server ${name} not registered`);
    }

    const transport = new StdioClientTransport(config);
    const client = new Client(
      { name: `pool-${name}`, version: '1.0.0' },
      { capabilities: {} }
    );

    await client.connect(transport);
    this.connections.set(name, client);

    return client;
  }

  async closeAll() {
    for (const [name, client] of this.connections) {
      await client.close();
    }
    this.connections.clear();
  }
}

// Uso:
const pool = new MCPConnectionPool();
pool.registerServer('github', 'npx', ['@modelcontextprotocol/server-github']);
pool.registerServer('stripe', 'npx', ['@modelcontextprotocol/server-stripe']);

const github = await pool.getClient('github');
const stripe = await pool.getClient('stripe');
```

## Checklist de completitud

- [ ] Creé cliente básico MCP
- [ ] Implementé CLI con múltiples comandos
- [ ] Conecté a múltiples servidores
- [ ] Creé dashboard que consulta varios servidores
- [ ] Implementé pool de conexiones
- [ ] Creé script de automatización
- [ ] Probé todo funcionando

## Resumen

Has aprendido a:
- Crear clientes MCP personalizados
- Conectar a múltiples servidores simultáneamente
- Construir CLI tools con MCP
- Integrar MCP en aplicaciones web
- Crear scripts de automatización
- Gestionar conexiones eficientemente

En la Lección 7 integrarás MCP avanzadamente con Claude Code.

---

**Módulo 5 - Lección 6 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
