<p><strong><em>Lección 5: Creando tu Primer Servidor MCP</em></strong></p>

## Introducción

Los servidores públicos cubren muchos casos de uso, pero a veces necesitas crear uno personalizado para tu API interna, base de datos específica o herramienta propietaria. En esta lección crearás tu primer servidor MCP desde cero.

## ¿Cuándo crear un servidor MCP personalizado?

Crea un servidor MCP cuando:
- Tienes una API interna que Claude Code debe consultar
- Usas una herramienta propietaria sin servidor público
- Necesitas lógica de negocio específica
- Quieres exponer datos de forma controlada

**Ejemplos:**
- Servidor para tu CRM interno
- API de inventario de tu empresa
- Sistema de tickets propietario
- Base de datos legacy

## Estructura de un servidor MCP

Un servidor MCP mínimo tiene:

```
my-mcp-server/
├── package.json
├── src/
│   ├── index.ts          # Punto de entrada
│   ├── server.ts         # Lógica del servidor
│   ├── resources.ts      # Definición de resources
│   ├── tools.ts          # Definición de tools
│   └── prompts.ts        # Definición de prompts
└── README.md
```

## Proyecto: Servidor MCP para API de Tareas

Crearás un servidor MCP que expone una API simple de gestión de tareas.

### Paso 1: Inicializar proyecto

```bash
# Crear directorio
mkdir tasks-mcp-server
cd tasks-mcp-server

# Inicializar npm
npm init -y

# Instalar dependencias
npm install @modelcontextprotocol/sdk
npm install --save-dev typescript @types/node

# Configurar TypeScript
npx tsc --init
```

### Paso 2: Configurar package.json

```json
{
  "name": "tasks-mcp-server",
  "version": "1.0.0",
  "description": "MCP Server para gestión de tareas",
  "main": "dist/index.js",
  "bin": {
    "tasks-mcp-server": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.5.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "ts-node": "^10.9.0"
  }
}
```

### Paso 3: Implementar el servidor

**src/index.ts**:
```typescript
#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { TasksServer } from './server.js';

async function main() {
  const transport = new StdioServerTransport();
  const server = new TasksServer();

  await server.connect(transport);
  console.error('Tasks MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
```

**src/server.ts**:
```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Simula base de datos de tareas
interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
}

let tasks: Task[] = [
  {
    id: 1,
    title: 'Setup MCP Server',
    description: 'Create first MCP server',
    status: 'completed',
    created_at: new Date().toISOString(),
  },
];

export class TasksServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'tasks-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupResourceHandlers();
    this.setupToolHandlers();
  }

  private setupResourceHandlers() {
    // Listar recursos disponibles
    this.server.setRequestHandler(
      ListResourcesRequestSchema,
      async () => ({
        resources: [
          {
            uri: 'tasks://all',
            name: 'All Tasks',
            mimeType: 'application/json',
            description: 'Lista de todas las tareas',
          },
          {
            uri: 'tasks://pending',
            name: 'Pending Tasks',
            mimeType: 'application/json',
            description: 'Tareas pendientes',
          },
        ],
      })
    );

    // Leer recurso específico
    this.server.setRequestHandler(
      ReadResourceRequestSchema,
      async (request) => {
        const { uri } = request.params;

        if (uri === 'tasks://all') {
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(tasks, null, 2),
              },
            ],
          };
        }

        if (uri === 'tasks://pending') {
          const pending = tasks.filter(t => t.status === 'pending');
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(pending, null, 2),
              },
            ],
          };
        }

        throw new Error(`Unknown resource: ${uri}`);
      }
    );
  }

  private setupToolHandlers() {
    // Listar herramientas disponibles
    this.server.setRequestHandler(
      ListToolsRequestSchema,
      async () => ({
        tools: [
          {
            name: 'create-task',
            description: 'Crea una nueva tarea',
            inputSchema: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  description: 'Título de la tarea',
                },
                description: {
                  type: 'string',
                  description: 'Descripción detallada',
                },
              },
              required: ['title'],
            },
          },
          {
            name: 'update-task-status',
            description: 'Actualiza el estado de una tarea',
            inputSchema: {
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                  description: 'ID de la tarea',
                },
                status: {
                  type: 'string',
                  enum: ['pending', 'in_progress', 'completed'],
                  description: 'Nuevo estado',
                },
              },
              required: ['id', 'status'],
            },
          },
        ],
      })
    );

    // Ejecutar herramienta
    this.server.setRequestHandler(
      CallToolRequestSchema,
      async (request) => {
        const { name, arguments: args } = request.params;

        if (name === 'create-task') {
          const newTask: Task = {
            id: tasks.length + 1,
            title: args.title as string,
            description: (args.description as string) || '',
            status: 'pending',
            created_at: new Date().toISOString(),
          };
          tasks.push(newTask);

          return {
            content: [
              {
                type: 'text',
                text: `Tarea creada: ${JSON.stringify(newTask, null, 2)}`,
              },
            ],
          };
        }

        if (name === 'update-task-status') {
          const { id, status } = args;
          const task = tasks.find(t => t.id === id);

          if (!task) {
            return {
              content: [
                {
                  type: 'text',
                  text: `Error: Tarea ${id} no encontrada`,
                },
              ],
              isError: true,
            };
          }

          task.status = status as Task['status'];

          return {
            content: [
              {
                type: 'text',
                text: `Tarea ${id} actualizada a ${status}`,
              },
            ],
          };
        }

        throw new Error(`Unknown tool: ${name}`);
      }
    );
  }

  async connect(transport: any) {
    await this.server.connect(transport);
  }
}
```

### Paso 4: Compilar el servidor

```bash
# Compilar TypeScript
npm run build

# Verificar que se creó dist/
ls dist/
```

### Paso 5: Probar localmente

```bash
# Ejecutar servidor directamente
npm start

# Debería esperar input en stdin (es normal)
```

En otra terminal:
```bash
# Prueba manual enviando JSON-RPC
echo '{"jsonrpc":"2.0","method":"resources/list","id":1}' | npm start
```

### Paso 6: Instalar en Claude Code

```bash
# Instalar tu servidor local
claude mcp add tasks \
  --transport stdio \
  --command node \
  --args "$(pwd)/dist/index.js"

# Verificar instalación
claude mcp get tasks
```

### Paso 7: Probar con Claude Code

```bash
# Iniciar Claude Code
claude
```

```
You: Lista todas las tareas en @tasks:all

Claude Code: [Consultando tasks MCP server]

Tareas disponibles:
1. Setup MCP Server - completed
   Descripción: Create first MCP server
   Creada: 2024-01-15

You: Crea una nueva tarea: "Implementar autenticación"

Claude Code: [Ejecutando create-task]

✓ Tarea creada:
  ID: 2
  Título: Implementar autenticación
  Estado: pending
  Creada: 2024-01-15T10:30:00Z

You: Actualiza tarea 2 a in_progress

Claude Code: [Ejecutando update-task-status]

✓ Tarea 2 actualizada a in_progress
```

## Agregar prompts personalizados

Extiende el servidor con prompts útiles.

**Agregar a src/server.ts**:
```typescript
import { ListPromptsRequestSchema, GetPromptRequestSchema } from '@modelcontextprotocol/sdk/types.js';

// En el constructor, agregar:
this.setupPromptHandlers();

private setupPromptHandlers() {
  // Listar prompts
  this.server.setRequestHandler(
    ListPromptsRequestSchema,
    async () => ({
      prompts: [
        {
          name: 'daily-summary',
          description: 'Resumen diario de tareas',
          arguments: [],
        },
        {
          name: 'task-report',
          description: 'Reporte de tarea específica',
          arguments: [
            {
              name: 'task_id',
              description: 'ID de la tarea',
              required: true,
            },
          ],
        },
      ],
    })
  );

  // Obtener prompt
  this.server.setRequestHandler(
    GetPromptRequestSchema,
    async (request) => {
      const { name, arguments: args } = request.params;

      if (name === 'daily-summary') {
        const pending = tasks.filter(t => t.status === 'pending');
        const inProgress = tasks.filter(t => t.status === 'in_progress');
        const completed = tasks.filter(t => t.status === 'completed');

        return {
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `Genera resumen diario:
Pendientes: ${pending.length}
En progreso: ${inProgress.length}
Completadas: ${completed.length}

Tareas: ${JSON.stringify(tasks, null, 2)}`,
              },
            },
          ],
        };
      }

      throw new Error(`Unknown prompt: ${name}`);
    }
  );
}
```

**Usar prompt:**
```
You: /mcp__tasks__daily-summary
```

## Publicar tu servidor

### Opción 1: npm package

```bash
# Publicar a npm
npm publish

# Instalación para otros:
claude mcp add tasks \
  --transport stdio \
  --command npx \
  --args "tasks-mcp-server"
```

### Opción 2: GitHub repository

```bash
# Subir a GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/tasks-mcp-server
git push -u origin main

# Instalación para otros:
claude mcp add tasks \
  --transport stdio \
  --command npx \
  --args "https://github.com/tu-usuario/tasks-mcp-server"
```

## Mejores prácticas

### 1. Validación de inputs

```typescript
if (!args.title || args.title.length === 0) {
  return {
    content: [{ type: 'text', text: 'Error: título requerido' }],
    isError: true,
  };
}
```

### 2. Manejo de errores robusto

```typescript
try {
  // Lógica del tool
} catch (error) {
  return {
    content: [
      {
        type: 'text',
        text: `Error: ${error.message}`,
      },
    ],
    isError: true,
  };
}
```

### 3. Logging

```typescript
console.error(`[tasks-mcp] Tool called: ${name}`);
console.error(`[tasks-mcp] Args:`, args);
```

### 4. Documentación

Incluye README completo:
```markdown
# Tasks MCP Server

Servidor MCP para gestión de tareas.

## Instalación

\`\`\`bash
claude mcp add tasks --transport stdio --command npx --args "tasks-mcp-server"
\`\`\`

## Recursos

- `tasks://all` - Todas las tareas
- `tasks://pending` - Solo pendientes

## Tools

- `create-task` - Crear tarea
- `update-task-status` - Actualizar estado

## Prompts

- `/mcp__tasks__daily-summary` - Resumen diario
```

## Ejercicio adicional

Extiende el servidor con:

1. **Filtros avanzados**
   ```
   tasks://by-date/{date}
   tasks://by-status/{status}
   ```

2. **Más tools**
   ```
   delete-task
   search-tasks
   assign-task
   ```

3. **Persistencia**
   - Guardar en archivo JSON
   - O conectar a PostgreSQL

## Checklist de completitud

- [ ] Creé estructura del proyecto
- [ ] Implementé resources
- [ ] Implementé tools
- [ ] Implementé prompts (opcional)
- [ ] Compilé y probé localmente
- [ ] Instalé en Claude Code
- [ ] Probé todas las funcionalidades
- [ ] Documenté el servidor

## Resumen

Has aprendido a:
- Estructurar un servidor MCP
- Implementar resources, tools y prompts
- Usar SDK de MCP
- Manejar JSON-RPC
- Probar y depurar servidor
- Instalar servidor local
- Publicar para otros

En la Lección 6 aprenderás a crear clientes MCP personalizados.

---

**Módulo 5 - Lección 5 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
