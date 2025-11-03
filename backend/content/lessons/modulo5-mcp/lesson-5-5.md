# Lección 5.5: Creando tu Primer Servidor MCP

> 📘 **En esta lección aprenderás:**
> - Estructura básica de un servidor MCP
> - Implementación en Python (FastMCP)
> - Implementación en TypeScript/Node.js
> - Tools, Resources y Prompts en acción
> - Testing local del servidor
> - Mejores prácticas de desarrollo

---

## 🎯 Proyecto: Task Manager MCP Server

Vamos a crear un servidor completo para gestionar tareas con:
- ✅ 4 tools (create, list, complete, delete)
- ✅ 1 resource (todas las tareas como JSON)
- ✅ 1 prompt (template de análisis)
- ✅ Almacenamiento en memoria

---

## 🐍 Implementación en Python (FastMCP)

### Paso 1: Setup del Proyecto

```bash
# Crear proyecto
uv init task-manager-mcp
cd task-manager-mcp

# Crear virtualenv
uv venv
source .venv/bin/activate  # Linux/Mac
# o
.venv\Scripts\activate  # Windows

# Instalar dependencias
uv add "mcp[cli]" pydantic
```

---

### Paso 2: Estructura del Servidor

**Archivo:** `task_manager_mcp/server.py`

```python
from typing import Any, List, Optional
from mcp.server.fastmcp import FastMCP
from pydantic import BaseModel
from datetime import datetime
import json

# Inicializar servidor
mcp = FastMCP("task-manager")

# Modelo de datos
class Task(BaseModel):
    id: int
    title: str
    description: str
    completed: bool = False
    created_at: str
    completed_at: Optional[str] = None

# Almacenamiento en memoria
tasks: List[Task] = []
next_id: int = 1

# ===== TOOLS =====

@mcp.tool()
async def create_task(title: str, description: str = "") -> str:
    """Crear una nueva tarea.

    Args:
        title: Título de la tarea (requerido)
        description: Descripción detallada (opcional)

    Returns:
        Mensaje de confirmación con ID de la tarea
    """
    global next_id

    task = Task(
        id=next_id,
        title=title,
        description=description,
        created_at=datetime.now().isoformat()
    )

    tasks.append(task)
    next_id += 1

    return f"✅ Tarea creada: '{task.title}' (ID: {task.id})"


@mcp.tool()
async def list_tasks(show_completed: bool = False, limit: int = 10) -> str:
    """Listar tareas.

    Args:
        show_completed: Incluir tareas completadas (default: False)
        limit: Número máximo de tareas a mostrar (default: 10)

    Returns:
        Lista formateada de tareas
    """
    filtered = [
        t for t in tasks
        if show_completed or not t.completed
    ]

    if not filtered:
        return "📭 No hay tareas"

    # Limitar resultados
    filtered = filtered[:limit]

    result = f"📋 Tareas ({len(filtered)}):\n\n"
    for task in filtered:
        status = "✅" if task.completed else "⬜"
        result += f"{status} [{task.id}] {task.title}\n"
        if task.description:
            result += f"    {task.description}\n"
        result += "\n"

    return result.strip()


@mcp.tool()
async def complete_task(task_id: int) -> str:
    """Marcar una tarea como completada.

    Args:
        task_id: ID de la tarea a completar

    Returns:
        Mensaje de confirmación o error
    """
    for task in tasks:
        if task.id == task_id:
            if task.completed:
                return f"ℹ️ La tarea {task_id} ya estaba completada"

            task.completed = True
            task.completed_at = datetime.now().isoformat()
            return f"✅ Tarea {task_id} completada: '{task.title}'"

    return f"❌ Tarea {task_id} no encontrada"


@mcp.tool()
async def delete_task(task_id: int) -> str:
    """Eliminar una tarea permanentemente.

    Args:
        task_id: ID de la tarea a eliminar

    Returns:
        Mensaje de confirmación o error
    """
    global tasks

    initial_len = len(tasks)
    tasks = [t for t in tasks if t.id != task_id]

    if len(tasks) < initial_len:
        return f"🗑️ Tarea {task_id} eliminada"
    else:
        return f"❌ Tarea {task_id} no encontrada"


# ===== RESOURCES =====

@mcp.resource("tasks://all")
async def get_all_tasks() -> str:
    """Obtener todas las tareas como recurso JSON."""
    tasks_dict = [t.dict() for t in tasks]
    return json.dumps(tasks_dict, indent=2, ensure_ascii=False)


# ===== PROMPTS =====

@mcp.prompt()
async def analyze_tasks_prompt() -> str:
    """Template para análisis de productividad."""
    tasks_json = await get_all_tasks()

    return f"""Analiza estas tareas y proporciona:

1. **Resumen de productividad:**
   - Total de tareas
   - Completadas vs pendientes
   - Tasa de completitud (%)

2. **Insights:**
   - Tareas que llevan más tiempo abiertas
   - Patrones en las descripciones
   - Recomendaciones de priorización

3. **Próximos pasos sugeridos:**
   - Tareas que deberían completarse primero
   - Tareas que podrían eliminarse

**Datos:**
{tasks_json}
"""


# ===== MAIN =====

def main():
    """Punto de entrada del servidor."""
    # Agregar algunas tareas de ejemplo
    import asyncio
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    loop.run_until_complete(create_task(
        "Configurar servidor MCP",
        "Instalar dependencias y crear estructura"
    ))
    loop.run_until_complete(create_task(
        "Escribir documentación",
        "README con ejemplos de uso"
    ))

    # Iniciar servidor en modo stdio
    mcp.run(transport='stdio')


if __name__ == "__main__":
    main()
```

---

### Paso 3: Configuración en Claude Code

```bash
# Agregar servidor MCP
claude mcp add --transport stdio task-manager \
  -- uv --directory ~/task-manager-mcp run task_manager_mcp/server.py
```

---

### Paso 4: Testing

```
# En Claude Code:
"Lista todas mis tareas"

→ Claude llama a list_tasks()
→ Respuesta: "📋 Tareas (2): ..."

"Crea tarea: Revisar código del backend"

→ Claude llama a create_task(title="Revisar código del backend")
→ Respuesta: "✅ Tarea creada: 'Revisar código del backend' (ID: 3)"

"Marca tarea 1 como completada"

→ Claude llama a complete_task(task_id=1)
→ Respuesta: "✅ Tarea 1 completada: 'Configurar servidor MCP'"

"Analiza mi productividad"

→ Claude usa prompt analyze_tasks_prompt()
→ Genera análisis completo
```

---

## 💻 Implementación en TypeScript/Node.js

### Paso 1: Setup

```bash
mkdir task-manager-mcp-ts
cd task-manager-mcp-ts

# Inicializar proyecto
npm init -y

# Instalar dependencias
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node

# Configurar TypeScript
npx tsc --init
```

---

### Paso 2: Servidor TypeScript

**Archivo:** `src/server.ts`

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Modelo de datos
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

// Almacenamiento
const tasks: Task[] = [];
let nextId = 1;

// Inicializar servidor
const server = new McpServer({
  name: "task-manager",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
    prompts: {}
  },
});

// ===== TOOLS =====

server.tool(
  "create_task",
  "Crear una nueva tarea",
  {
    title: z.string().describe("Título de la tarea"),
    description: z.string().optional().describe("Descripción detallada")
  },
  async ({ title, description = "" }) => {
    const task: Task = {
      id: nextId++,
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString()
    };

    tasks.push(task);

    return {
      content: [{
        type: "text",
        text: `✅ Tarea creada: '${task.title}' (ID: ${task.id})`
      }]
    };
  }
);

server.tool(
  "list_tasks",
  "Listar tareas",
  {
    showCompleted: z.boolean().optional().describe("Incluir completadas"),
    limit: z.number().optional().describe("Número máximo de tareas")
  },
  async ({ showCompleted = false, limit = 10 }) => {
    let filtered = tasks.filter(t => showCompleted || !t.completed);
    filtered = filtered.slice(0, limit);

    if (filtered.length === 0) {
      return {
        content: [{
          type: "text",
          text: "📭 No hay tareas"
        }]
      };
    }

    const lines = filtered.map(t => {
      const status = t.completed ? "✅" : "⬜";
      return `${status} [${t.id}] ${t.title}${t.description ? `\n    ${t.description}` : ''}`;
    });

    return {
      content: [{
        type: "text",
        text: `📋 Tareas (${filtered.length}):\n\n${lines.join('\n\n')}`
      }]
    };
  }
);

server.tool(
  "complete_task",
  "Marcar tarea como completada",
  {
    taskId: z.number().describe("ID de la tarea")
  },
  async ({ taskId }) => {
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
      return {
        content: [{
          type: "text",
          text: `❌ Tarea ${taskId} no encontrada`
        }]
      };
    }

    if (task.completed) {
      return {
        content: [{
          type: "text",
          text: `ℹ️ La tarea ${taskId} ya estaba completada`
        }]
      };
    }

    task.completed = true;
    task.completedAt = new Date().toISOString();

    return {
      content: [{
        type: "text",
        text: `✅ Tarea ${taskId} completada: '${task.title}'`
      }]
    };
  }
);

server.tool(
  "delete_task",
  "Eliminar tarea permanentemente",
  {
    taskId: z.number().describe("ID de la tarea")
  },
  async ({ taskId }) => {
    const initialLength = tasks.length;
    const index = tasks.findIndex(t => t.id === taskId);

    if (index === -1) {
      return {
        content: [{
          type: "text",
          text: `❌ Tarea ${taskId} no encontrada`
        }]
      };
    }

    tasks.splice(index, 1);

    return {
      content: [{
        type: "text",
        text: `🗑️ Tarea ${taskId} eliminada`
      }]
    };
  }
);

// ===== RESOURCES =====

server.resource(
  "tasks://all",
  "Todas las tareas en formato JSON",
  async () => {
    return {
      contents: [{
        uri: "tasks://all",
        mimeType: "application/json",
        text: JSON.stringify(tasks, null, 2)
      }]
    };
  }
);

// ===== PROMPTS =====

server.prompt(
  "analyze_tasks",
  "Analizar productividad de tareas",
  async () => {
    const tasksJson = JSON.stringify(tasks, null, 2);

    return {
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Analiza estas tareas y proporciona insights de productividad:\n\n${tasksJson}`
        }
      }]
    };
  }
);

// ===== MAIN =====

async function main() {
  // Tareas de ejemplo
  tasks.push(
    {
      id: nextId++,
      title: "Configurar servidor MCP",
      description: "Setup completo",
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: nextId++,
      title: "Escribir tests",
      description: "",
      completed: false,
      createdAt: new Date().toISOString()
    }
  );

  // Conectar transporte stdio
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("Task Manager MCP Server iniciado");
}

main().catch(console.error);
```

---

### Paso 3: Compilar y Configurar

```bash
# Compilar
npx tsc

# Agregar a Claude Code
claude mcp add --transport stdio task-manager-ts \
  -- node ~/task-manager-mcp-ts/dist/server.js
```

---

## ⚠️ Mejores Prácticas

### 1. Logging Correcto

```python
# ❌ INCORRECTO (stdio servers)
print("Procesando tarea...")

# ✅ CORRECTO
import logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    stream=sys.stderr  # Importante: stderr, no stdout
)
logger = logging.getLogger(__name__)
logger.info("Procesando tarea...")
```

---

### 2. Validación de Inputs

```python
@mcp.tool()
async def create_task(title: str, description: str = "") -> str:
    # Validar inputs
    if not title or len(title.strip()) == 0:
        raise ValueError("El título no puede estar vacío")

    if len(title) > 100:
        raise ValueError("El título debe tener máximo 100 caracteres")

    # ... resto del código
```

---

### 3. Error Handling Robusto

```typescript
server.tool(
  "complete_task",
  "...",
  { taskId: z.number() },
  async ({ taskId }) => {
    try {
      const task = tasks.find(t => t.id === taskId);

      if (!task) {
        throw new Error(`Tarea ${taskId} no encontrada`);
      }

      task.completed = true;

      return {
        content: [{ type: "text", text: `✅ Completada` }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `❌ Error: ${error.message}`
        }],
        isError: true
      };
    }
  }
);
```

---

### 4. Documentación Clara

```python
@mcp.tool()
async def search_tasks(query: str, case_sensitive: bool = False) -> str:
    """Buscar tareas por texto.

    Busca en títulos y descripciones de tareas.

    Args:
        query: Texto a buscar (mínimo 3 caracteres)
        case_sensitive: Si la búsqueda distingue mayúsculas/minúsculas
                       (default: False)

    Returns:
        Lista de tareas que coinciden con la búsqueda

    Raises:
        ValueError: Si query tiene menos de 3 caracteres

    Examples:
        search_tasks("backend")  # Busca "backend"
        search_tasks("API", case_sensitive=True)  # Busca "API" exacto
    """
    # Implementación...
```

---

### 5. Testing del Servidor

```python
# test_server.py
import pytest
from task_manager_mcp.server import create_task, list_tasks, tasks

@pytest.mark.asyncio
async def test_create_task():
    tasks.clear()
    result = await create_task("Test Task", "Test Description")
    assert "Test Task" in result
    assert len(tasks) == 1

@pytest.mark.asyncio
async def test_list_tasks():
    tasks.clear()
    await create_task("Task 1", "")
    await create_task("Task 2", "")

    result = await list_tasks()
    assert "Task 1" in result
    assert "Task 2" in result
```

---

## 📊 Estructura de Servidor Complejo

Para servidores de producción:

```
my-mcp-server/
├── src/
│   ├── server.ts               # Punto de entrada
│   ├── tools/
│   │   ├── index.ts
│   │   ├── tasks.ts
│   │   ├── projects.ts
│   │   └── users.ts
│   ├── resources/
│   │   ├── index.ts
│   │   └── data.ts
│   ├── prompts/
│   │   ├── index.ts
│   │   └── templates.ts
│   ├── storage/
│   │   ├── database.ts
│   │   └── cache.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── validator.ts
│   │   └── errors.ts
│   └── types/
│       └── index.ts
├── tests/
│   ├── tools.test.ts
│   ├── resources.test.ts
│   └── integration.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📝 Resumen

**Aprendiste a:**
- Crear servidor MCP en Python (FastMCP) y TypeScript
- Implementar tools, resources y prompts
- Configurar transporte stdio
- Logging y error handling correctos
- Testing básico del servidor
- Estructura para servidores complejos

**Próximo:** Crear **clientes MCP personalizados**.

---

## 🚀 Próximos Pasos

**Lección 5.6:** Aprenderás a crear **clientes MCP** que se conectan a servidores y se integran con la API de Claude.

---

**Duración estimada:** 3 horas
**Dificultad:** ⭐⭐⭐⭐ Avanzada (programación)
