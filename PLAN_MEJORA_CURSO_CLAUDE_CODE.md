# 📋 PLAN DE MEJORA DEL CURSO "ESPECIALISTA EN DESARROLLO CON CLAUDE CODE"

**Fecha de elaboración:** 27 de octubre de 2025
**Objetivo:** Transformar el curso en una experiencia educativa de alta calidad con contenidos actualizados, enriquecidos pedagógicamente, ejercicios gamificados completos y funcionalidades avanzadas.

---

## 📊 RESUMEN EJECUTIVO

### Estado Actual del Curso
- **Módulos:** 8 (completos)
- **Lecciones:** 43 (todas con contenido)
- **Tests:** 8 (uno por módulo, funcionando)
- **Ejercicios gamificados:** Solo Módulo 1
- **Sistema PDF:** ❌ No implementado
- **Cobertura de características de Claude Code:** ~60%
- **MCP (Model Context Protocol):** ❌ No cubierto

### Objetivos del Plan
1. ✅ Enriquecer contenidos con información actualizada de documentación oficial
2. ✅ Implementar módulo completo sobre MCP
3. ✅ Crear ejercicios gamificados para todos los módulos
4. ✅ Implementar sistema de descarga de PDFs
5. ✅ Eliminar redundancias y unificar estilo
6. ✅ Agregar características avanzadas no cubiertas

---

## 🎯 FASE 1: RESTRUCTURACIÓN DEL CURSO (Prioridad: CRÍTICA)

### 1.1 Nueva Estructura de Módulos (9 módulos en total)

```
MÓDULO 1: Fundamentos de Claude Code [MANTENER - MEJORAR]
├── Duración: 6 horas
└── Estado: ✅ Bien estructurado, requiere enriquecimiento

MÓDULO 2: Workflows Profesionales [EXPANDIR]
├── Duración: 8 horas → 10 horas
└── Estado: ⚠️ Requiere ejemplos de código reales

MÓDULO 3: Personalización y Comandos [CONSOLIDAR]
├── Duración: 6 horas → 7 horas
└── Estado: ⚠️ Eliminar redundancias con Módulo 1

MÓDULO 4: Herramientas Avanzadas [MEJORAR]
├── Duración: 8 horas → 10 horas
└── Estado: ⚠️ Agregar ejemplos prácticos de Subagents y Hooks

MÓDULO 5: Model Context Protocol (MCP) [NUEVO - CRÍTICO]
├── Duración: 12 horas
├── Lecciones: 8 nuevas
└── Estado: ❌ Módulo completamente nuevo

MÓDULO 6: Extensibilidad y Ecosistema [REORGANIZAR]
├── Duración: 8 horas → 10 horas
└── Estado: ⚠️ Actualizar con información de plugins y skills

MÓDULO 7: Integración Profesional [EXPANDIR]
├── Duración: 8 horas → 12 horas
└── Estado: ⚠️ Agregar CI/CD avanzado y ejemplos reales

MÓDULO 8: Desarrollo Empresarial [ENRIQUECER]
├── Duración: 8 horas → 10 horas
└── Estado: ⚠️ Actualizar con features enterprise 2025

MÓDULO 9: Maestría y Proyecto Final [MANTENER - MEJORAR]
├── Duración: 8 horas → 12 horas
└── Estado: ⚠️ Agregar proyecto integrador con MCP
```

**Duración total:** 45 horas → **88 horas** (curso profesional completo)

---

## 📚 FASE 2: CONTENIDO DEL NUEVO MÓDULO 5 - MCP (CRÍTICO)

### Estructura del Módulo MCP

#### **Lección 5.1: Introducción al Model Context Protocol**
**Duración:** 90 minutos | **Tipo:** TEXT + VIDEO

**Contenido:**
- ¿Qué es MCP? La analogía del "USB-C para IA"
- Problemas que resuelve MCP en el desarrollo
- Arquitectura fundamental: Hosts, Clients, Servers
- Beneficios para desarrolladores, aplicaciones y usuarios
- Casos de uso reales documentados:
  - Asistentes de IA con acceso a Google Calendar y Notion
  - Claude Code generando apps desde diseños Figma
  - Chatbots empresariales con múltiples bases de datos
  - Modelos de IA creando diseños 3D en Blender

**Ejemplos prácticos:**
- Diagrama de arquitectura MCP completo
- Comparación: Desarrollo sin MCP vs. con MCP
- Timeline de adopción de MCP en la industria

**Ejercicio gamificado:**
- **Tipo:** MULTIPLE_CHOICE + TRUE_FALSE
- **Tema:** Conceptos fundamentales de MCP
- **Puntos:** 15

---

#### **Lección 5.2: Arquitectura y Componentes de MCP**
**Duración:** 2 horas | **Tipo:** TEXT

**Contenido:**
- **Capa de Datos (Data Layer):**
  - Protocolo JSON-RPC 2.0
  - Gestión del ciclo de vida (initialize, initialized)
  - Características del servidor (tools, resources, prompts)
  - Características del cliente (sampling, elicitation, logging)
  - Features de utilidad (notificaciones, progreso)

- **Capa de Transporte (Transport Layer):**
  - Stdio Transport (procesos locales)
  - HTTP Transport (servidores remotos)
  - Autenticación (Bearer tokens, OAuth 2.0, API keys)

- **Primitivos de MCP:**
  - **Tools:** Funciones ejecutables (file operations, API calls, DB queries)
  - **Resources:** Fuentes de datos contextuales
  - **Prompts:** Templates reutilizables
  - **Sampling:** Solicitudes de LLM completion
  - **Elicitation:** Confirmaciones de usuario
  - **Logging:** Debugging y monitoreo

**Diagramas:**
```
MCP Host (Claude Code)
├── MCP Client 1 ←→ MCP Server (Filesystem)
├── MCP Client 2 ←→ MCP Server (GitHub)
├── MCP Client 3 ←→ MCP Server (PostgreSQL)
└── MCP Client 4 ←→ MCP Server (Custom API)
```

**Ejercicio gamificado:**
- **Tipo:** MATCHING_PAIRS + SEQUENCE_ORDER
- **Tema:** Flujo de comunicación MCP (inicialización → descubrimiento → ejecución)
- **Puntos:** 20

---

#### **Lección 5.3: Configuración de MCP en Claude Code**
**Duración:** 2 horas | **Tipo:** TEXT + PRACTICE

**Contenido:**
- **Comandos CLI de MCP:**
  ```bash
  claude mcp add                   # Agregar servidor
  claude mcp list                  # Listar servidores
  claude mcp get <name>            # Detalles de servidor
  claude mcp remove <name>         # Eliminar servidor
  claude mcp reset-project-choices # Resetear aprobaciones
  ```

- **Tipos de Transporte:**
  - HTTP (recomendado para servicios cloud)
  - SSE (legacy, soporte limitado)
  - Stdio (procesos locales)

- **Scopes de Configuración:**
  | Scope | Almacenamiento | Acceso | Uso |
  |-------|---------------|--------|-----|
  | **Local** | User settings | Solo proyecto actual | Servidores de desarrollo personal |
  | **Project** | `.mcp.json` | Todo el equipo via Git | Herramientas compartidas del equipo |
  | **User** | User account | Todos los proyectos | Utilidades cross-project |

- **Ejemplos de Configuración:**
  ```bash
  # HTTP server con autenticación
  claude mcp add --transport http notion https://mcp.notion.com/mcp

  # Stdio server local
  claude mcp add --transport stdio filesystem -- npx -y @modelcontextprotocol/server-filesystem ~/Documents

  # Con variables de entorno
  claude mcp add --transport stdio db \
    --env DB_URL="postgresql://localhost/mydb" \
    -- npx -y @bytebase/dbhub

  # Scope específico
  claude mcp add --scope project --transport http stripe https://mcp.stripe.com
  ```

- **Archivo `.mcp.json`:**
  ```json
  {
    "mcpServers": {
      "database-tools": {
        "command": "/usr/local/bin/db-server",
        "args": ["--config", "./config.json"],
        "env": {
          "DB_URL": "${DATABASE_URL:-postgresql://localhost/default}",
          "API_KEY": "${DB_API_KEY}"
        }
      }
    }
  }
  ```

**Ejercicio gamificado:**
- **Tipo:** CODE_CHALLENGE
- **Tema:** Configurar 3 servidores MCP (filesystem, GitHub, custom)
- **Puntos:** 25

---

#### **Lección 5.4: Servidores MCP Disponibles y Casos de Uso**
**Duración:** 2 horas | **Tipo:** TEXT + DEMO

**Contenido:**

**Servidores Oficiales de Referencia:**
1. **Filesystem** - Operaciones seguras de archivos con control de acceso
2. **Git** - Lectura, búsqueda y manipulación de repositorios
3. **Memory** - Sistema de memoria persistente con grafos de conocimiento
4. **Fetch** - Obtención y conversión de contenido web
5. **Time** - Conversión de tiempos y zonas horarias
6. **Sequential Thinking** - Resolución dinámica de problemas

**Servidores de Producción (Populares):**

*Desarrollo & Monitoreo:*
- **Sentry** - Error tracking y debugging
- **Jam** - Recordings, logs, network data
- **Socket** - Análisis de seguridad de dependencias

*Project Management:*
- **Linear** - Issue tracking y project management
- **Notion** - Documentación y gestión de tareas
- **Asana** - Workspace y coordinación de proyectos
- **Atlassian** - Jira tickets y Confluence docs
- **Monday** - Board management y automatización

*Bases de Datos:*
- **PostgreSQL** - Inspección de schemas y queries
- **SQLite** - Business intelligence y consultas
- **Airtable** - Read/write records y tablas

*Pagos & Commerce:*
- **Stripe** - Payment processing y subscriptions
- **PayPal** - Commerce capabilities
- **Square** - Payments, inventory, orders
- **Plaid** - Banking data y cuentas financieras

*Diseño & Media:*
- **Figma** - Integración directa de diseños
- **Cloudinary** - Media management
- **Canva** - Design browsing y generación

*Infraestructura:*
- **Vercel** - Project y deployment management
- **Netlify** - Site creation y deployment
- **Cloudflare** - Traffic analysis y security

**Casos de Uso Detallados:**
- Desarrollo full-stack con filesystem + GitHub + PostgreSQL
- Monitoring y debugging con Sentry + Jam
- Project management integrado con Linear + Notion
- E-commerce con Stripe + Airtable + Cloudinary

**Ejercicio gamificado:**
- **Tipo:** MULTIPLE_CHOICE + MATCHING_PAIRS
- **Tema:** Seleccionar servidores MCP apropiados para escenarios específicos
- **Puntos:** 15

---

#### **Lección 5.5: Creando tu Primer Servidor MCP**
**Duración:** 3 horas | **Tipo:** PRACTICE + CODE

**Contenido:**

**Proyecto Guiado: Servidor MCP de Tareas (Task Manager)**

**Paso 1: Setup del Proyecto (Python)**
```bash
uv init task-manager-mcp
cd task-manager-mcp
uv venv
source .venv/bin/activate
uv add "mcp[cli]" pydantic
```

**Paso 2: Estructura del Servidor**
```python
from typing import Any, List
from mcp.server.fastmcp import FastMCP
from pydantic import BaseModel
import json

# Inicializar servidor
mcp = FastMCP("task-manager")

# Modelo de datos
class Task(BaseModel):
    id: int
    title: str
    description: str
    completed: bool = False

# Almacenamiento simple
tasks: List[Task] = []

@mcp.tool()
async def create_task(title: str, description: str) -> str:
    """Crear una nueva tarea.

    Args:
        title: Título de la tarea
        description: Descripción detallada
    """
    new_id = len(tasks) + 1
    task = Task(id=new_id, title=title, description=description)
    tasks.append(task)
    return f"Tarea creada: {task.title} (ID: {task.id})"

@mcp.tool()
async def list_tasks(show_completed: bool = False) -> str:
    """Listar todas las tareas.

    Args:
        show_completed: Incluir tareas completadas
    """
    filtered = [t for t in tasks if show_completed or not t.completed]
    if not filtered:
        return "No hay tareas"

    result = "\\n".join([
        f"{t.id}. {'✅' if t.completed else '⬜'} {t.title}"
        for t in filtered
    ])
    return result

@mcp.tool()
async def complete_task(task_id: int) -> str:
    """Marcar una tarea como completada.

    Args:
        task_id: ID de la tarea a completar
    """
    for task in tasks:
        if task.id == task_id:
            task.completed = True
            return f"Tarea {task_id} completada: {task.title}"
    return f"Tarea {task_id} no encontrada"

@mcp.resource("tasks://all")
def get_all_tasks() -> str:
    """Obtener todas las tareas como recurso"""
    return json.dumps([t.dict() for t in tasks], indent=2)

def main():
    mcp.run(transport='stdio')

if __name__ == "__main__":
    main()
```

**Paso 3: Configuración en Claude Code**
```bash
claude mcp add --transport stdio task-manager \\
  -- uv --directory ~/task-manager-mcp run task-manager-mcp
```

**Paso 4: Pruebas**
```
# En Claude Code:
"Crea una tarea para revisar el código del backend"
"Lista todas mis tareas"
"Marca la tarea 1 como completada"
```

**Variante Node.js/TypeScript:**
```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const tasks: Task[] = [];

const server = new McpServer({
  name: "task-manager",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "create_task",
  "Crear una nueva tarea",
  {
    title: z.string().describe("Título de la tarea"),
    description: z.string().describe("Descripción detallada")
  },
  async ({ title, description }) => {
    const newId = tasks.length + 1;
    tasks.push({ id: newId, title, description, completed: false });
    return {
      content: [{
        type: "text",
        text: `Tarea creada: ${title} (ID: ${newId})`
      }]
    };
  }
);

// ... más tools

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
```

**Mejores Prácticas:**
- ✅ Logging a stderr (NUNCA stdout en stdio)
- ✅ Validación de inputs con schemas
- ✅ Manejo de errores robusto
- ✅ Documentación clara de parámetros
- ✅ Naming conventions consistentes
- ✅ Versionado semántico

**Ejercicio gamificado:**
- **Tipo:** CODE_CHALLENGE
- **Tema:** Extender el servidor con features adicionales (actualizar, eliminar, buscar tareas)
- **Puntos:** 30

---

#### **Lección 5.6: Creando Clientes MCP Personalizados**
**Duración:** 2 horas | **Tipo:** TEXT + CODE

**Contenido:**

**¿Qué es un Cliente MCP?**
- Aplicación que se conecta a servidores MCP
- Intermediario entre Claude/LLM y servidores
- Gestiona el ciclo de vida de conexiones

**Estructura de un Cliente:**
```python
from anthropic import Anthropic
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

class TaskManagerClient:
    def __init__(self):
        self.anthropic = Anthropic()
        self.session = None
        self.available_tools = []

    async def connect_to_server(self, server_path: str):
        """Conectar al servidor MCP"""
        server_params = StdioServerParameters(
            command="python",
            args=[server_path]
        )

        async with stdio_client(server_params) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()
                self.session = session

                # Obtener herramientas disponibles
                tools_response = await session.list_tools()
                self.available_tools = tools_response.tools

    async def process_query(self, user_message: str):
        """Procesar consulta del usuario"""
        messages = [{"role": "user", "content": user_message}]

        # Enviar a Claude con herramientas disponibles
        response = self.anthropic.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=4096,
            tools=self.available_tools,
            messages=messages
        )

        # Manejar llamadas a herramientas
        while response.stop_reason == "tool_use":
            for content in response.content:
                if content.type == "tool_use":
                    # Ejecutar herramienta via MCP
                    result = await self.session.call_tool(
                        content.name,
                        content.input
                    )

                    # Agregar resultado al contexto
                    messages.append({
                        "role": "assistant",
                        "content": response.content
                    })
                    messages.append({
                        "role": "user",
                        "content": [{
                            "type": "tool_result",
                            "tool_use_id": content.id,
                            "content": result.content
                        }]
                    })

            # Nueva llamada a Claude con resultados
            response = self.anthropic.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=4096,
                tools=self.available_tools,
                messages=messages
            )

        return response.content[0].text
```

**Uso del Cliente:**
```python
async def main():
    client = TaskManagerClient()
    await client.connect_to_server("./task-manager.py")

    while True:
        query = input("Tu consulta (o 'quit'): ")
        if query.lower() == 'quit':
            break

        response = await client.process_query(query)
        print(f"\\n{response}\\n")

asyncio.run(main())
```

**Componentes Clave:**
- Inicialización de sesión MCP
- Descubrimiento de herramientas (`list_tools()`)
- Ejecución de herramientas (`call_tool()`)
- Integración con Anthropic API
- Manejo de ciclo request-response

**Ejercicio gamificado:**
- **Tipo:** CODE_CHALLENGE
- **Tema:** Crear cliente MCP con interfaz de chat interactiva
- **Puntos:** 25

---

#### **Lección 5.7: Integración Avanzada: MCP + Claude Code**
**Duración:** 2 horas | **Tipo:** ADVANCED

**Contenido:**

**Features Avanzadas de MCP en Claude Code:**

**1. Referencias a Recursos con @**
```
# Referenciar recursos MCP directamente
"Analiza @github:issue://123 y sugiere soluciones"
"Compara @postgres:schema://users con @docs:file://models/user"
"Resume @notion:page://project-roadmap"
```

**2. Prompts MCP como Slash Commands**
```bash
/mcp__github__list_prs
/mcp__jira__create_issue "Bug en login" high
/mcp__stripe__check_balance
```

**3. Gestión de Output**
```bash
# Configurar límite de tokens de output MCP
export MAX_MCP_OUTPUT_TOKENS=50000

# Configurar timeout de inicialización
MCP_TIMEOUT=10000 claude  # 10 segundos
```

**4. Plugins con MCP Integrado**
```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "mcpServers": {
    "plugin-api": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/api-server",
      "args": ["--port", "8080"],
      "env": {
        "API_KEY": "${PLUGIN_API_KEY}"
      }
    }
  }
}
```

**5. Claude Code como Servidor MCP**
```bash
# Exponer herramientas de Claude Code a otras apps
claude mcp serve

# Configurar en Claude Desktop
{
  "mcpServers": {
    "claude-code": {
      "type": "stdio",
      "command": "claude",
      "args": ["mcp", "serve"]
    }
  }
}
```

**6. Configuración Enterprise**
```json
// /Library/Application Support/ClaudeCode/managed-mcp.json
{
  "mcpServers": {
    "company-github": {
      "type": "http",
      "url": "https://github-mcp.company.com",
      "headers": {
        "Authorization": "Bearer ${COMPANY_GITHUB_TOKEN}"
      }
    }
  }
}

// managed-settings.json
{
  "allowedMcpServers": [
    { "serverName": "company-github" },
    { "serverName": "company-jira" }
  ],
  "deniedMcpServers": [
    { "serverName": "filesystem" }
  ]
}
```

**Patrones Avanzados:**
- Multi-server orchestration
- Error handling y retry logic
- Caching de resultados MCP
- Security best practices
- Performance optimization

**Ejercicio gamificado:**
- **Tipo:** MULTIPLE_CHOICE + CODE_CHALLENGE
- **Tema:** Configurar workflow empresarial con múltiples servidores MCP
- **Puntos:** 30

---

#### **Lección 5.8: Proyecto Final MCP: Sistema de Gestión de Proyectos**
**Duración:** 3 horas | **Tipo:** PROJECT

**Descripción del Proyecto:**
Crear un sistema completo de gestión de proyectos que integre:
- Servidor MCP personalizado para gestión de proyectos
- Integración con GitHub (issues y PRs)
- Integración con Notion (documentación)
- Base de datos PostgreSQL (métricas y análisis)

**Requisitos:**
1. **Servidor MCP "project-manager"** con herramientas:
   - `create_project(name, description)`
   - `add_task(project_id, title, assignee)`
   - `update_status(task_id, status)`
   - `generate_report(project_id)`
   - `sync_with_github(project_id, repo)`

2. **Integración de 3 servidores MCP:**
   - Servidor personalizado (project-manager)
   - GitHub oficial
   - PostgreSQL

3. **Workflows Automatizados:**
   - "Crear proyecto nuevo con setup inicial de GitHub repo"
   - "Generar reporte semanal de progreso"
   - "Sincronizar issues de GitHub con tareas del proyecto"

4. **Dashboard en Terminal:**
   - Visualización de proyectos activos
   - Estadísticas de tareas (completadas/pendientes)
   - Alertas de deadlines

**Entregables:**
- Código del servidor MCP (Python o TypeScript)
- Archivo `.mcp.json` con configuración
- README con instrucciones de instalación
- Demo en video (5 minutos)
- Tests unitarios básicos

**Criterios de Evaluación:**
- Funcionalidad completa (40%)
- Código limpio y documentado (25%)
- Integración exitosa de múltiples servidores (20%)
- Creatividad y features adicionales (15%)

**Ejercicio gamificado:**
- **Tipo:** FINAL_PROJECT (requiere revisión manual)
- **Puntos:** 50

---

### Test Final del Módulo 5 (MCP)

**Formato:** 20 preguntas
**Tiempo límite:** 90 minutos
**Nota mínima:** 7.0/10

**Distribución de Preguntas:**
- Conceptos fundamentales de MCP (4 preguntas)
- Arquitectura y componentes (4 preguntas)
- Configuración y comandos CLI (4 preguntas)
- Servidores disponibles y casos de uso (3 preguntas)
- Desarrollo de servidores/clientes (3 preguntas)
- Integración avanzada (2 preguntas)

---

## 🎮 FASE 3: EJERCICIOS GAMIFICADOS POR MÓDULO

### Estrategia de Gamificación

**Tipos de Ejercicios por Complejidad:**
- **Básico:** MULTIPLE_CHOICE, TRUE_FALSE (10-15 puntos)
- **Intermedio:** FILL_BLANKS, MATCHING_PAIRS (15-20 puntos)
- **Avanzado:** SEQUENCE_ORDER, CODE_CHALLENGE (20-30 puntos)

**Distribución Recomendada:**
- Módulos 1-2: 3-4 ejercicios (básico → intermedio)
- Módulos 3-5: 4-5 ejercicios (intermedio → avanzado)
- Módulos 6-9: 5-6 ejercicios (avanzado + proyectos)

---

### Módulo 2: Workflows Profesionales

#### Ejercicio 2.1: Debugging con Claude Code (Lección 2.2)
**Tipo:** CODE_CHALLENGE
**Puntos:** 25
**Descripción:** Dado un código con 3 bugs, usa Claude Code para identificarlos y corregirlos.

**Setup:**
```javascript
// Bug 1: Variable no definida
function calculateTotal(items) {
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    sum += price; // Bug: debería ser items[i].price
  }
  return sum;
}

// Bug 2: Async/await faltante
async function fetchUserData(userId) {
  const response = fetch(`/api/users/${userId}`); // Bug: falta await
  return response.json();
}

// Bug 3: Comparación incorrecta
function isValidEmail(email) {
  return email.includes('@') & email.includes('.'); // Bug: & en vez de &&
}
```

**Criterios de Aprobación:**
- Identificar los 3 bugs (33% cada uno)
- Proporcionar la corrección exacta
- Explicar por qué es un bug

---

#### Ejercicio 2.2: Refactorización Inteligente (Lección 2.3)
**Tipo:** SEQUENCE_ORDER + CODE_CHALLENGE
**Puntos:** 30
**Descripción:** Ordena los pasos para refactorizar un componente React legacy.

**Pasos (desordenados):**
1. Escribir tests para comportamiento actual
2. Ejecutar tests para confirmar que pasan
3. Identificar code smells (duplicación, complejidad)
4. Extraer funciones auxiliares
5. Reemplazar props drilling con Context
6. Actualizar imports y exportaciones
7. Ejecutar tests de nuevo
8. Commit de cambios

**Orden correcto:** 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

**Parte 2:** Refactorizar el siguiente código
```jsx
// Código legacy con múltiples problemas
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
    fetch(`/api/users/${userId}/posts`)
      .then(res => res.json())
      .then(data => setPosts(data));
    fetch(`/api/users/${userId}/comments`)
      .then(res => res.json())
      .then(data => setComments(data));
    setLoading(false);
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user?.name}</h1>
      <div>{posts.map(p => <div key={p.id}>{p.title}</div>)}</div>
      <div>{comments.map(c => <div key={c.id}>{c.text}</div>)}</div>
    </div>
  );
}
```

**Mejoras esperadas:**
- Custom hook `useUserData`
- Manejo correcto de loading con Promise.all
- Error handling
- Componentes separados para Posts y Comments

---

#### Ejercicio 2.3: Testing con Jest y Claude Code (Lección 2.5)
**Tipo:** CODE_CHALLENGE
**Puntos:** 25
**Descripción:** Escribir suite completa de tests para función de autenticación.

**Código a testear:**
```typescript
export async function authenticateUser(
  email: string,
  password: string
): Promise<{ token: string; user: User } | null> {
  // Validar formato de email
  if (!email.includes('@')) {
    throw new Error('Invalid email format');
  }

  // Validar longitud de contraseña
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  // Simular llamada a API
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}
```

**Tests requeridos:**
1. Email válido con contraseña válida → retorna token y usuario
2. Email inválido → lanza error "Invalid email format"
3. Contraseña corta → lanza error "Password must be at least 8 characters"
4. API retorna 401 → retorna null
5. API retorna error de red → maneja gracefully

**Puntuación:**
- 5 tests correctos (100%)
- 4 tests correctos (80%)
- 3 tests correctos (60%)
- <3 tests (0%)

---

### Módulo 3: Personalización y Comandos

#### Ejercicio 3.1: Slash Commands Built-in (Lección 3.1)
**Tipo:** FILL_BLANKS + MULTIPLE_CHOICE
**Puntos:** 15
**Descripción:** Completar la tabla de slash commands con su funcionalidad.

**Tabla:**
| Comando | Descripción | Atajo de teclado |
|---------|-------------|------------------|
| _______ | Limpia la conversación actual | N/A |
| /resume | _______________________ | N/A |
| /rewind | _______________________ | Esc Esc |
| _______ | Lista todos los subagents activos | N/A |
| /hooks  | _______________________ | N/A |
| _______ | Cambia el estilo de output | N/A |

**Respuestas:**
- /clear
- Continúa la última sesión guardada
- Deshace cambios recientes
- /agents
- Configura hooks de evento
- /output-style

---

#### Ejercicio 3.2: Crear Comando Personalizado (Lección 3.2)
**Tipo:** CODE_CHALLENGE
**Puntos:** 30
**Descripción:** Crear un slash command `/analyze-performance` que analice métricas de performance.

**Requisitos:**
1. Crear archivo `.claude/commands/analyze-performance.md`
2. El comando debe:
   - Leer archivos `lighthouse-report.json` o similares
   - Identificar Core Web Vitals (LCP, FID, CLS)
   - Generar reporte con recomendaciones
   - Guardar summary en `performance-summary.md`

**Template del comando:**
```markdown
---
description: Analiza métricas de performance y genera reporte
---

Analiza los siguientes archivos de performance:
- lighthouse-report.json
- webpack-stats.json

Para cada métrica de Core Web Vitals:
1. LCP (Largest Contentful Paint)
2. FID (First Input Delay)
3. CLS (Cumulative Layout Shift)

Identifica:
- ✅ Métricas en "good" range
- ⚠️ Métricas que necesitan mejora
- ❌ Métricas en "poor" range

Genera recomendaciones accionables para cada problema.

Guarda el resumen en `performance-summary.md` con:
- Score general (0-100)
- Top 3 problemas críticos
- Pasos de solución priorizados
```

**Criterios:**
- Comando funcional (40%)
- Análisis correcto de métricas (30%)
- Recomendaciones útiles (20%)
- Formato de output (10%)

---

### Módulo 4: Herramientas Avanzadas

#### Ejercicio 4.1: Subagents en Acción (Lección 4.3)
**Tipo:** CODE_CHALLENGE + MATCHING_PAIRS
**Puntos:** 35
**Descripción:** Crear 3 subagents especializados para un proyecto de e-commerce.

**Parte 1: Matching** (15 puntos)
Emparejar cada subagent con su caso de uso óptimo:

| Subagent | Caso de Uso |
|----------|-------------|
| 1. `code-reviewer` | A. Generar seed data para PostgreSQL |
| 2. `test-generator` | B. Analizar código y sugerir mejoras |
| 3. `data-seeder` | C. Crear suite de tests E2E con Cypress |
| 4. `doc-writer` | D. Generar documentación API con OpenAPI |
| 5. `security-auditor` | E. Identificar vulnerabilidades en dependencias |

**Respuestas:** 1-B, 2-C, 3-A, 4-D, 5-E

**Parte 2: Creación de Subagent** (20 puntos)

Crear subagent `e-commerce-analyzer` en `.claude/agents/e-commerce-analyzer.md`:

```markdown
---
name: E-commerce Analyzer
description: Analiza performance y UX de tiendas e-commerce
---

Eres un experto en optimización de e-commerce. Cuando analices un proyecto:

1. **Performance Analysis**
   - Tiempo de carga del catálogo
   - Optimización de imágenes de productos
   - Lazy loading de componentes

2. **UX Review**
   - Flujo de checkout (cuántos pasos)
   - Claridad de CTAs
   - Mobile responsiveness

3. **Conversion Optimization**
   - Ubicación de elementos de confianza (reviews, badges)
   - Visibilidad de opciones de pago
   - Urgencia y escasez implementadas

4. **SEO & Metadata**
   - Meta descriptions de productos
   - Schema.org markup
   - URLs amigables

Genera reporte con:
- Score de 0-100 por categoría
- Top 3 recomendaciones de mayor impacto
- Ejemplos de código para implementar mejoras
```

**Testing:**
Probar el subagent con un proyecto e-commerce real y validar que el reporte incluya:
- Análisis de todas las categorías
- Recomendaciones accionables
- Ejemplos de código

---

#### Ejercicio 4.2: Hooks para Automatización (Lección 4.4)
**Tipo:** CODE_CHALLENGE
**Puntos:** 30
**Descripción:** Configurar 3 hooks para automatizar workflow de desarrollo.

**Hook 1: Pre-tool-call** (Validación de seguridad)
```json
{
  "hooks": {
    "pre-tool-call": {
      "command": "bash",
      "args": ["-c", "./scripts/validate-tool-call.sh"]
    }
  }
}
```

**Script `validate-tool-call.sh`:**
```bash
#!/bin/bash
# Validar que no se ejecuten comandos peligrosos
TOOL_NAME=$1

if [[ "$TOOL_NAME" == *"rm -rf"* ]] || [[ "$TOOL_NAME" == *"sudo"* ]]; then
  echo "❌ Comando peligroso bloqueado: $TOOL_NAME"
  exit 1
fi

echo "✅ Comando validado: $TOOL_NAME"
exit 0
```

**Hook 2: Post-tool-call** (Logging)
```json
{
  "hooks": {
    "post-tool-call": {
      "command": "node",
      "args": ["./scripts/log-tool-call.js"]
    }
  }
}
```

**Hook 3: User-prompt-submit** (Auto-tests)
```json
{
  "hooks": {
    "user-prompt-submit": {
      "command": "npm",
      "args": ["run", "test:quick"]
    }
  }
}
```

**Criterios:**
- 3 hooks configurados correctamente (60%)
- Scripts funcionan sin errores (30%)
- Documentación de uso (10%)

---

### Módulo 6: Extensibilidad y Ecosistema

#### Ejercicio 6.1: Plugin Development (Lección 6.2)
**Tipo:** CODE_CHALLENGE
**Puntos:** 40
**Descripción:** Crear un plugin completo para integración con Jira.

**Estructura del Plugin:**
```
jira-integration-plugin/
├── plugin.json
├── index.ts
├── src/
│   ├── commands/
│   │   ├── create-issue.ts
│   │   └── list-issues.ts
│   ├── hooks/
│   │   └── auto-link-commits.ts
│   └── skills/
│       └── jira-search.ts
└── README.md
```

**plugin.json:**
```json
{
  "name": "jira-integration",
  "version": "1.0.0",
  "description": "Integración completa con Jira para gestión de issues",
  "main": "dist/index.js",
  "commands": {
    "/jira-create": {
      "description": "Crear issue en Jira",
      "file": "commands/create-issue"
    },
    "/jira-list": {
      "description": "Listar issues del proyecto",
      "file": "commands/list-issues"
    }
  },
  "hooks": {
    "post-tool-call": "./hooks/auto-link-commits"
  },
  "skills": {
    "jira-search": "./skills/jira-search"
  },
  "config": {
    "JIRA_URL": {
      "type": "string",
      "required": true,
      "description": "URL de tu instancia de Jira"
    },
    "JIRA_API_TOKEN": {
      "type": "string",
      "required": true,
      "sensitive": true,
      "description": "API Token de Jira"
    }
  }
}
```

**Funcionalidades Requeridas:**
1. Crear issues desde Claude Code
2. Listar issues con filtros
3. Auto-linkear commits a issues (via hook)
4. Buscar issues por texto (skill)

---

### Módulo 7: Integración Profesional

#### Ejercicio 7.1: CI/CD con GitHub Actions (Lección 7.1)
**Tipo:** CODE_CHALLENGE
**Puntos:** 35
**Descripción:** Crear workflow de CI/CD que use Claude Code para code review automático.

**Archivo `.github/workflows/claude-code-review.yml`:**
```yaml
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  code-review:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Setup Claude Code
        run: |
          npm install -g @anthropic-ai/claude-code
          echo "${{ secrets.ANTHROPIC_API_KEY }}" > ~/.claude/credentials

      - name: Get Changed Files
        id: changed-files
        run: |
          git diff --name-only origin/${{ github.base_ref }}...HEAD > changed-files.txt
          echo "files=$(cat changed-files.txt | tr '\n' ' ')" >> $GITHUB_OUTPUT

      - name: Claude Code Review
        run: |
          claude --permission-mode plan << EOF
          Analiza los siguientes archivos modificados en este PR:
          ${{ steps.changed-files.outputs.files }}

          Para cada archivo:
          1. Identifica potenciales bugs
          2. Sugiere mejoras de performance
          3. Revisa adherencia a mejores prácticas
          4. Verifica cobertura de tests

          Genera reporte en formato Markdown.
          EOF
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}

      - name: Post Review Comment
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('claude-review.md', 'utf8');

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## 🤖 Claude Code Review\n\n${review}`
            });
```

**Criterios:**
- Workflow funcional (40%)
- Review completo y útil (30%)
- Integración con GitHub API (20%)
- Documentación (10%)

---

### Módulo 8: Desarrollo Empresarial

#### Ejercicio 8.1: Configuración Enterprise (Lección 8.4)
**Tipo:** CODE_CHALLENGE + MULTIPLE_CHOICE
**Puntos:** 35
**Descripción:** Configurar entorno enterprise con seguridad y compliance.

**Parte 1: Multiple Choice** (15 puntos)

1. ¿Qué archivo se usa para forzar configuración MCP a nivel enterprise?
   - a) `claude-config.json`
   - b) `managed-mcp.json` ✓
   - c) `enterprise-settings.json`
   - d) `mcp-policy.json`

2. ¿Cuál es la prioridad de configuración de scopes?
   - a) User > Project > Local
   - b) Project > User > Local
   - c) Local > Project > User ✓
   - d) Todas tienen igual prioridad

3. Para restringir acceso a filesystem en toda la organización:
   - a) Usar `allowedMcpServers: []`
   - b) Usar `deniedMcpServers: [{ "serverName": "filesystem" }]` ✓
   - c) Eliminar permiso de filesystem
   - d) No es posible

**Parte 2: Configuración** (20 puntos)

Crear configuración enterprise completa:

**Archivo: `/etc/claude-code/managed-settings.json`**
```json
{
  "organization": "Acme Corporation",
  "version": "1.0.0",
  "mcpServers": {
    "company-github": {
      "type": "http",
      "url": "https://github-mcp.acme.com",
      "headers": {
        "Authorization": "Bearer ${ACME_GITHUB_TOKEN}"
      }
    },
    "company-jira": {
      "type": "http",
      "url": "https://jira-mcp.acme.com",
      "oauth": {
        "clientId": "${JIRA_CLIENT_ID}",
        "scopes": ["read:issue", "write:issue"]
      }
    },
    "company-postgres": {
      "type": "stdio",
      "command": "/usr/local/bin/postgres-mcp-server",
      "args": ["--readonly"],
      "env": {
        "DB_URL": "${COMPANY_DB_URL}"
      }
    }
  },
  "allowedMcpServers": [
    { "serverName": "company-github" },
    { "serverName": "company-jira" },
    { "serverName": "company-postgres" }
  ],
  "deniedMcpServers": [
    { "serverName": "filesystem" },
    { "serverName": "puppeteer" }
  ],
  "security": {
    "requireApproval": true,
    "auditLog": "/var/log/claude-code/audit.log",
    "sensitiveDataMasking": true
  },
  "limits": {
    "maxMcpOutputTokens": 25000,
    "mcpTimeout": 30000,
    "maxConcurrentConnections": 10
  }
}
```

**Criterios:**
- Configuración completa y válida (50%)
- Security best practices (30%)
- Documentación de políticas (20%)

---

### Módulo 9: Maestría y Proyecto Final

#### Ejercicio 9.1: Proyecto Final Integrador (Lección 9.5)
**Tipo:** FINAL_PROJECT
**Puntos:** 100
**Duración:** 2 semanas
**Descripción:** Crear aplicación full-stack completa usando Claude Code con MCP.

**Opciones de Proyecto:**

**Opción A: Sistema de Gestión de Contenidos (CMS)**
- Backend: Node.js + PostgreSQL
- Frontend: React + Tailwind
- MCP Servers: PostgreSQL, filesystem, GitHub
- Features:
  - CRUD de artículos con Markdown
  - Sistema de usuarios y roles
  - Generación automática de sitemap
  - Backup automático a GitHub
  - Búsqueda full-text

**Opción B: Dashboard de Analytics en Tiempo Real**
- Backend: Python + FastAPI + Redis
- Frontend: Vue.js + Chart.js
- MCP Servers: PostgreSQL, custom analytics server, Sentry
- Features:
  - Ingesta de eventos en tiempo real
  - Visualización de métricas
  - Alertas configurables
  - Exportación de reportes
  - Integración con Sentry para errores

**Opción C: Herramienta de Automatización DevOps**
- Backend: Go + gRPC
- Frontend: Svelte
- MCP Servers: GitHub, GitLab, Kubernetes, custom deployment server
- Features:
  - Gestión de pipelines CI/CD
  - Deploys automatizados
  - Monitoreo de health checks
  - Rollback automático en caso de errores
  - Dashboard de métricas de deployment

**Requisitos Obligatorios:**
1. **Uso de Claude Code en todo el desarrollo**
   - Al menos 20 commits con mensajes descriptivos
   - Evidencia de uso de subagents (screenshots o logs)
   - Configuración de hooks personalizada

2. **Integración de MCP (mínimo 3 servidores)**
   - Al menos 1 servidor personalizado
   - Configuración en `.mcp.json`
   - Documentación de cada servidor usado

3. **Calidad de Código**
   - Tests unitarios (cobertura >70%)
   - Tests de integración
   - Linting configurado (ESLint/Pylint)
   - Code review automatizado con GitHub Actions

4. **Documentación Completa**
   - README con instrucciones de instalación
   - Documentación API (OpenAPI/Swagger)
   - Diagramas de arquitectura
   - Video demo (5-10 minutos)

5. **Deployment**
   - Aplicación desplegada en producción (Vercel/Netlify/Railway)
   - CI/CD configurado
   - Variables de entorno manejadas correctamente

**Entregables:**
1. Repositorio Git público
2. Aplicación en producción (URL)
3. Video demo
4. Presentación (PDF o slides)
5. Postmortem document (qué funcionó, qué no, lecciones aprendidas)

**Criterios de Evaluación:**
| Criterio | Peso | Descripción |
|----------|------|-------------|
| Funcionalidad | 30% | La aplicación cumple todos los requisitos funcionales |
| Uso de Claude Code | 20% | Evidencia clara de uso extensivo y efectivo |
| Integración MCP | 20% | Servidores MCP bien implementados e integrados |
| Calidad de Código | 15% | Código limpio, tests, linting |
| Documentación | 10% | Docs completas y claras |
| Innovación | 5% | Features adicionales creativos |

**Puntuación:**
- 90-100: Excelente - Proyecto production-ready
- 75-89: Notable - Proyecto bien ejecutado
- 60-74: Aprobado - Cumple requisitos básicos
- <60: Insuficiente - Requiere mejoras significativas

---

## 📄 FASE 4: SISTEMA DE DESCARGA DE PDFs

### Arquitectura del Sistema PDF

**Stack Tecnológico:**
- **Backend:** Puppeteer (Node.js) para generación de PDFs
- **Storage:** Filesystem local `/backend/uploads/pdfs/`
- **Seguridad:** Solo usuarios con test aprobado pueden descargar

### Implementación Backend

#### Controlador `pdfs.controller.ts`

```typescript
import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

export const generateLessonPDF = async (req: AuthRequest, res: Response) => {
  const { lessonId } = req.params;
  const userId = req.user!.id;

  try {
    // 1. Verificar que el usuario haya completado el módulo
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            moduleTest: {
              include: {
                submissions: {
                  where: {
                    userId,
                    passed: true,
                    isFirstAttempt: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!lesson) {
      return res.status(404).json({ success: false, error: 'Lección no encontrada' });
    }

    // Verificar que aprobó el test
    const passedTest = lesson.module.moduleTest?.submissions.length > 0;
    if (!passedTest) {
      return res.status(403).json({
        success: false,
        error: 'Debes aprobar el test del módulo para descargar el PDF'
      });
    }

    // 2. Generar HTML con estilo
    const htmlContent = generateLessonHTML(lesson, req.user!);

    // 3. Crear PDF con Puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Directorio de usuario
    const userPdfDir = path.join(__dirname, '../../uploads/pdfs', userId);
    if (!fs.existsSync(userPdfDir)) {
      fs.mkdirSync(userPdfDir, { recursive: true });
    }

    const filename = `${lesson.slug}-${Date.now()}.pdf`;
    const filepath = path.join(userPdfDir, filename);

    await page.pdf({
      path: filepath,
      format: 'A4',
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      printBackground: true
    });

    await browser.close();

    // 4. Enviar PDF
    res.download(filepath, `${lesson.title}.pdf`, (err) => {
      if (err) {
        console.error('Error al enviar PDF:', err);
      }
      // Opcional: eliminar archivo después de envío
      // fs.unlinkSync(filepath);
    });

  } catch (error) {
    console.error('Error al generar PDF:', error);
    res.status(500).json({ success: false, error: 'Error al generar PDF' });
  }
};

function generateLessonHTML(lesson: any, user: any): string {
  const markdownContent = typeof lesson.content === 'string'
    ? lesson.content
    : JSON.stringify(lesson.content);

  // Convertir Markdown a HTML (usar librería como marked o remark)
  const htmlBody = convertMarkdownToHTML(markdownContent);

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>${lesson.title}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          color: #171717;
          line-height: 1.6;
        }

        .header {
          background: linear-gradient(135deg, #EA580C 0%, #F97316 100%);
          color: white;
          padding: 40px 30px;
          margin-bottom: 30px;
        }

        .header h1 {
          font-size: 28px;
          margin-bottom: 10px;
        }

        .header .module {
          font-size: 14px;
          opacity: 0.9;
        }

        .content {
          padding: 0 30px;
        }

        .content h2 {
          color: #EA580C;
          margin-top: 30px;
          margin-bottom: 15px;
        }

        .content h3 {
          color: #EA580C;
          margin-top: 25px;
          margin-bottom: 12px;
        }

        .content p {
          margin-bottom: 15px;
        }

        .content code {
          background: #F5F5F5;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
          font-size: 14px;
        }

        .content pre {
          background: #0A0A0A;
          color: #FAFAFA;
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 20px 0;
        }

        .content pre code {
          background: none;
          padding: 0;
          color: inherit;
        }

        .footer {
          margin-top: 50px;
          padding: 30px;
          background: #FAFAFA;
          border-top: 2px solid #EA580C;
        }

        .footer .info {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #737373;
        }

        .footer .signature {
          margin-top: 20px;
          text-align: center;
        }

        .footer .logo {
          font-weight: 700;
          color: #EA580C;
          font-size: 16px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="module">${lesson.module.title}</div>
        <h1>${lesson.title}</h1>
      </div>

      <div class="content">
        ${htmlBody}
      </div>

      <div class="footer">
        <div class="info">
          <div>
            <strong>Alumno:</strong> ${user.firstName} ${user.lastName}<br>
            <strong>Email:</strong> ${user.email}
          </div>
          <div>
            <strong>Fecha:</strong> ${new Date().toLocaleDateString('es-ES')}<br>
            <strong>Código:</strong> ${generateVerificationCode(user.id, lessonId)}
          </div>
        </div>
        <div class="signature">
          <div class="logo">Instituto San Miguel</div>
          <div>Plataforma de E-Learning</div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateVerificationCode(userId: string, lessonId: string): string {
  // Generar código de verificación único
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256')
    .update(`${userId}-${lessonId}-${process.env.PDF_SECRET}`)
    .digest('hex');
  return hash.substring(0, 12).toUpperCase();
}

function convertMarkdownToHTML(markdown: string): string {
  // Implementar con librería marked o remark
  const marked = require('marked');
  return marked.parse(markdown);
}
```

#### Ruta `pdfs.routes.ts`

```typescript
import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { generateLessonPDF, generateModulePDF } from '../controllers/pdfs.controller';

const router = express.Router();

router.get('/lessons/:lessonId/pdf', authenticateToken, generateLessonPDF);
router.get('/modules/:moduleId/pdf', authenticateToken, generateModulePDF);

export default router;
```

#### Integrar en `index.ts`

```typescript
import pdfRoutes from './routes/pdfs.routes';

app.use('/api', pdfRoutes);
```

### Implementación Frontend

#### Componente `CourseLearningPage.tsx` (actualización)

```typescript
const [canDownloadPDF, setCanDownloadPDF] = useState(false);
const [downloadingPDF, setDownloadingPDF] = useState(false);

// En useEffect que carga las calificaciones
useEffect(() => {
  if (course && selectedLesson) {
    const moduleId = getModuleIdForLesson(selectedLesson.id);
    if (moduleId && moduleGrades.has(moduleId)) {
      const grade = moduleGrades.get(moduleId)!;
      setCanDownloadPDF(grade >= 5.0);
    }
  }
}, [selectedLesson, moduleGrades]);

const handleDownloadPDF = async () => {
  if (!selectedLesson) return;

  setDownloadingPDF(true);
  try {
    const response = await fetch(
      `${API_URL}/lessons/${selectedLesson.id}/pdf`,
      {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }
    );

    if (!response.ok) {
      const error = await response.json();
      alert(error.error || 'Error al generar PDF');
      return;
    }

    // Descargar el blob
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedLesson.title}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

  } catch (error) {
    console.error('Error:', error);
    alert('Error al descargar PDF');
  } finally {
    setDownloadingPDF(false);
  }
};

// En el JSX, agregar botón de descarga
{canDownloadPDF && (
  <button
    onClick={handleDownloadPDF}
    disabled={downloadingPDF}
    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
  >
    {downloadingPDF ? (
      <>
        <Loader2 className="w-4 h-4 animate-spin" />
        Generando PDF...
      </>
    ) : (
      <>
        <Download className="w-4 h-4" />
        Descargar PDF
      </>
    )}
  </button>
)}

{!canDownloadPDF && selectedLesson && (
  <div className="text-sm text-neutral-600 dark:text-neutral-400">
    <Lock className="w-4 h-4 inline mr-1" />
    Aprueba el test del módulo para descargar el PDF
  </div>
)}
```

### Testing del Sistema PDF

```typescript
// backend/test-pdf-generation.ts
import { generateLessonPDF } from './src/controllers/pdfs.controller';

async function testPDFGeneration() {
  const mockReq = {
    params: { lessonId: 'lesson-id-here' },
    user: {
      id: 'user-id-here',
      firstName: 'María',
      lastName: 'García',
      email: 'maria@example.com'
    }
  };

  const mockRes = {
    status: (code: number) => mockRes,
    json: (data: any) => console.log('Response:', data),
    download: (path: string, filename: string, callback: Function) => {
      console.log(`PDF generado: ${filename} en ${path}`);
      callback(null);
    }
  };

  await generateLessonPDF(mockReq as any, mockRes as any);
}

testPDFGeneration();
```

---

## 🔍 FASE 5: DEDUPLICACIÓN Y UNIFICACIÓN DE CONTENIDOS

### Redundancias Identificadas

#### 1. Slash Commands (Lecciones 1.4 y 3.1)

**Problema:** Comandos básicos explicados en 1.4 se repiten en 3.1

**Solución:**
- **Lección 1.4:** Mantener solo comandos esenciales (`/help`, `/clear`, `/resume`)
- **Lección 3.1:** Profundizar en comandos avanzados y crear custom commands

**Lección 1.4 Actualizada:**
```markdown
## Comandos Esenciales

Los slash commands básicos que necesitas conocer:

### `/help` - Ayuda Completa
Muestra lista de todos los comandos disponibles.

### `/clear` - Limpiar Conversación
Reinicia la conversación actual sin perder configuración.

### `/resume` - Continuar Sesión
Recupera la última conversación guardada automáticamente.

> 💡 **Tip:** En el Módulo 3 aprenderás sobre comandos avanzados y cómo crear los tuyos propios.
```

---

#### 2. Configuración Settings (Lecciones 1.2 y 3.3)

**Problema:** Settings básicos en 1.2, avanzados en 3.3, pero con overlap

**Solución:**
- **Lección 1.2:** Settings mínimos necesarios para empezar
- **Lección 3.3:** Configuración avanzada con jerarquía completa

**Lección 1.2 Actualizada:**
```markdown
## Configuración Inicial Mínima

Para empezar a usar Claude Code, solo necesitas:

1. **Autenticación:**
   ```bash
   claude login
   ```

2. **Configuración básica** (opcional):
   ```json
   // ~/.claude/settings.json
   {
     "theme": "dark",
     "editor": "code"
   }
   ```

> 📚 **Nota:** Para configuración avanzada (hooks, output styles, permisos granulares),
> consulta la Lección 3.3: Configuración Avanzada de Settings.
```

---

#### 3. Plan Mode (Lecciones 1.6 y 3.4)

**Mantener:** Esta duplicación es intencional y pedagógicamente válida
- **Lección 1.6:** Introducción conceptual a Plan Mode
- **Lección 3.4:** Uso avanzado con casos de uso complejos

**Justificación:** Refuerzo progresivo del concepto

---

### Unificación de Estilo y Tono

#### Guía de Estilo Unificada

**Tono:** Profesional pero accesible, tuteo informal español

**Ejemplos correctos:**
- ✅ "Ahora vamos a explorar cómo Claude Code..."
- ✅ "Imagina que estás desarrollando una API REST..."
- ✅ "¡Genial! Has completado el ejercicio"

**Ejemplos incorrectos:**
- ❌ "El usuario debe ejecutar el comando..."
- ❌ "Se procederá a analizar el código..."
- ❌ "A continuación, véase el ejemplo..."

#### Estructura Consistente de Lecciones

**Template Estándar:**
```markdown
# [Número.Título]: Título de la Lección

> 📘 **En esta lección aprenderás:**
> - Punto clave 1
> - Punto clave 2
> - Punto clave 3

## [Emoji] Introducción

[Hook inicial que capte atención]

## [Emoji] Concepto Principal 1

[Explicación detallada]

### Ejemplo Práctico

\`\`\`[lenguaje]
// Código ejemplo
\`\`\`

**Explicación:**
[Desglose línea por línea si es complejo]

## [Emoji] Concepto Principal 2

[Sigue mismo patrón]

## [Emoji] Mejores Prácticas

- ✅ **Hacer:** [Buena práctica]
- ❌ **Evitar:** [Anti-patrón]

## [Emoji] Ejercicio de Reflexión

> 💭 **Piensa:** [Pregunta que invite a reflexionar]

## 📝 Resumen

- **Punto clave 1**
- **Punto clave 2**
- **Punto clave 3**

## 🚀 Próximos Pasos

En la siguiente lección verás: [Preview de próxima lección]
```

#### Emojis Estandarizados por Sección

| Sección | Emoji | Uso |
|---------|-------|-----|
| Introducción | 👋 | Saludo inicial |
| Concepto fundamental | 🎯 | Ideas principales |
| Ejemplo práctico | 💡 | Demos y código |
| Mejores prácticas | ⭐ | Tips profesionales |
| Advertencias | ⚠️ | Precauciones |
| Recursos | 📚 | Links y lecturas |
| Ejercicios | 🎮 | Práctica gamificada |
| Resumen | 📝 | Recap de lección |
| Proyecto | 🚀 | Trabajo práctico |

---

## 📈 FASE 6: MÉTRICAS Y SISTEMA DE PROGRESO

### Dashboard de Estudiante Mejorado

**Nuevas métricas a agregar:**

```typescript
// backend/src/controllers/analytics.controller.ts

export const getStudentDashboard = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  const stats = await prisma.$transaction([
    // Cursos activos
    prisma.enrollment.count({
      where: { userId, status: 'ACTIVE' }
    }),

    // Lecciones completadas
    prisma.progress.count({
      where: { userId, completed: true }
    }),

    // Ejercicios completados
    prisma.exerciseSubmission.count({
      where: { userId, score: { gte: 5.0 } }
    }),

    // Puntos totales ganados
    prisma.exerciseSubmission.aggregate({
      where: { userId },
      _sum: { totalPoints: true }
    }),

    // Racha de días consecutivos
    getRachaConsecutiva(userId),

    // Módulos completados (tests aprobados)
    prisma.moduleTestSubmission.count({
      where: { userId, passed: true, isFirstAttempt: true }
    }),

    // Ranking general (posición)
    getRankingPosition(userId)
  ]);

  res.json({
    success: true,
    data: {
      activeCourses: stats[0],
      completedLessons: stats[1],
      completedExercises: stats[2],
      totalPoints: stats[3]._sum.totalPoints || 0,
      streakDays: stats[4],
      completedModules: stats[5],
      ranking: stats[6]
    }
  });
};

async function getRachaConsecutiva(userId: string): Promise<number> {
  const actividades = await prisma.progress.findMany({
    where: { userId, completed: true },
    select: { completedAt: true },
    orderBy: { completedAt: 'desc' }
  });

  let racha = 0;
  let fechaActual = new Date();
  fechaActual.setHours(0, 0, 0, 0);

  for (const actividad of actividades) {
    const fechaActividad = new Date(actividad.completedAt!);
    fechaActividad.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (fechaActual.getTime() - fechaActividad.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === racha) {
      racha++;
    } else if (diffDays > racha) {
      break;
    }
  }

  return racha;
}

async function getRankingPosition(userId: string): Promise<number> {
  const allUsers = await prisma.user.findMany({
    include: {
      exerciseSubmissions: {
        select: { totalPoints: true }
      }
    }
  });

  const rankings = allUsers.map(user => ({
    userId: user.id,
    points: user.exerciseSubmissions.reduce((sum, sub) => sum + sub.totalPoints, 0)
  })).sort((a, b) => b.points - a.points);

  const position = rankings.findIndex(r => r.userId === userId) + 1;
  return position;
}
```

### Sistema de Badges/Logros

**Badges a Implementar:**

```typescript
export const BADGES = {
  FIRST_LESSON: {
    id: 'first-lesson',
    name: 'Primer Paso',
    description: 'Completaste tu primera lección',
    icon: '🎓',
    condition: (stats: any) => stats.completedLessons >= 1
  },
  MODULE_MASTER: {
    id: 'module-master',
    name: 'Maestro del Módulo',
    description: 'Aprobaste un módulo completo',
    icon: '🏆',
    condition: (stats: any) => stats.completedModules >= 1
  },
  PERFECT_SCORE: {
    id: 'perfect-score',
    name: 'Puntuación Perfecta',
    description: 'Obtuviste 10/10 en un test',
    icon: '💯',
    condition: async (userId: string) => {
      const perfectScore = await prisma.moduleTestSubmission.findFirst({
        where: { userId, score: 10 }
      });
      return !!perfectScore;
    }
  },
  WEEK_STREAK: {
    id: 'week-streak',
    name: 'Racha Semanal',
    description: 'Estudiaste 7 días consecutivos',
    icon: '🔥',
    condition: (stats: any) => stats.streakDays >= 7
  },
  CODE_WARRIOR: {
    id: 'code-warrior',
    name: 'Guerrero del Código',
    description: 'Completaste 10 ejercicios de código',
    icon: '⚔️',
    condition: async (userId: string) => {
      const codeExercises = await prisma.exerciseSubmission.count({
        where: {
          userId,
          exercise: { type: 'CODE_CHALLENGE' }
        }
      });
      return codeExercises >= 10;
    }
  },
  MCP_EXPERT: {
    id: 'mcp-expert',
    name: 'Experto en MCP',
    description: 'Completaste el Módulo 5: MCP',
    icon: '🔌',
    condition: async (userId: string) => {
      const mcpModule = await prisma.module.findFirst({
        where: { title: { contains: 'MCP' } }
      });
      if (!mcpModule) return false;

      const passed = await prisma.moduleTestSubmission.findFirst({
        where: {
          userId,
          test: { moduleId: mcpModule.id },
          passed: true
        }
      });
      return !!passed;
    }
  },
  COURSE_COMPLETED: {
    id: 'course-completed',
    name: 'Curso Finalizado',
    description: 'Completaste todos los módulos',
    icon: '🎉',
    condition: async (userId: string) => {
      const totalModules = await prisma.module.count();
      const completedModules = await prisma.moduleTestSubmission.count({
        where: { userId, passed: true, isFirstAttempt: true }
      });
      return completedModules >= totalModules;
    }
  }
};
```

---

## ⏱️ CRONOGRAMA DE IMPLEMENTACIÓN

### Semana 1: Fundamentos y MCP (40 horas)
**Días 1-2:** Restructuración de módulos existentes
- Eliminar redundancias
- Unificar estilo
- Actualizar contenidos con docs oficial

**Días 3-5:** Crear Módulo 5 (MCP)
- Escribir 8 lecciones completas
- Crear ejemplos de código
- Preparar materiales de referencia

**Días 6-7:** Ejercicios gamificados MCP
- 6 ejercicios para Módulo 5
- Test final de 20 preguntas
- Proyecto integrador

---

### Semana 2: Ejercicios Gamificados (40 horas)
**Días 1-3:** Módulos 2, 3, 4
- Crear 12-15 ejercicios
- Implementar en base de datos
- Testing de cada ejercicio

**Días 4-5:** Módulos 6, 7, 8
- Crear 15 ejercicios avanzados
- Integrar con sistema de puntos
- Configurar prerequisites

**Días 6-7:** Módulo 9
- Proyecto final completo
- Criterios de evaluación
- Rúbricas detalladas

---

### Semana 3: Sistema PDF y Testing (30 horas)
**Días 1-3:** Implementación Backend PDF
- Setup Puppeteer
- Controladores y rutas
- Sistema de verificación

**Días 4-5:** Frontend PDF
- Botones de descarga
- Estados de loading
- UX de permisos

**Días 6-7:** Testing Integral
- Tests unitarios
- Tests de integración
- Tests E2E con Cypress

---

### Semana 4: Mejoras UX y Deployment (20 horas)
**Días 1-2:** Dashboard mejorado
- Nuevas métricas
- Sistema de badges
- Ranking

**Días 3-4:** Optimizaciones
- Performance
- SEO
- Accesibilidad

**Días 5:** Documentación
- Actualizar CLAUDE_CONTEXT.md
- README para instructores
- Guías de uso

**Días 6-7:** Deployment y Validación
- Deploy a producción
- Testing post-deploy
- Corrección de bugs

---

## 📋 CHECKLIST DE COMPLETITUD

### Módulos de Contenido
- [ ] Módulo 1: Enriquecido con ejemplos reales
- [ ] Módulo 2: Ejemplos de código actualizados
- [ ] Módulo 3: Redundancias eliminadas
- [ ] Módulo 4: Hooks y Subagents con demos
- [ ] Módulo 5: MCP creado completo (8 lecciones)
- [ ] Módulo 6: Actualizado con plugins 2025
- [ ] Módulo 7: CI/CD avanzado agregado
- [ ] Módulo 8: Features enterprise actualizadas
- [ ] Módulo 9: Proyecto integrador con MCP

### Ejercicios Gamificados
- [ ] Módulo 1: ✅ Ya implementado
- [ ] Módulo 2: 4 ejercicios creados
- [ ] Módulo 3: 4 ejercicios creados
- [ ] Módulo 4: 4 ejercicios creados
- [ ] Módulo 5: 6 ejercicios creados (MCP)
- [ ] Módulo 6: 5 ejercicios creados
- [ ] Módulo 7: 5 ejercicios creados
- [ ] Módulo 8: 5 ejercicios creados
- [ ] Módulo 9: Proyecto final configurado

### Sistema PDF
- [ ] Backend: Puppeteer configurado
- [ ] Backend: Controlador de PDFs
- [ ] Backend: Rutas protegidas
- [ ] Backend: Verificación de tests aprobados
- [ ] Frontend: Botón de descarga
- [ ] Frontend: Estados de carga
- [ ] Frontend: Mensajes de permisos
- [ ] Testing: PDFs se generan correctamente
- [ ] Testing: Seguridad verificada

### Calidad y UX
- [ ] Estilo unificado en todas las lecciones
- [ ] Tono consistente (tuteo profesional)
- [ ] Emojis estandarizados
- [ ] Ejemplos de código verificados
- [ ] Links internos funcionando
- [ ] Dashboard mejorado
- [ ] Sistema de badges implementado
- [ ] Métricas de progreso completas

### Testing
- [ ] Tests unitarios backend (>70%)
- [ ] Tests integración API
- [ ] Tests E2E Cypress
- [ ] Tests de PDFs
- [ ] Tests de ejercicios gamificados
- [ ] Performance testing

### Deployment
- [ ] Backend desplegado
- [ ] Frontend desplegado
- [ ] Base de datos migrada
- [ ] Variables de entorno configuradas
- [ ] Backups automáticos
- [ ] Monitoreo activado

---

## 🎓 MEJORAS PEDAGÓGICAS ADICIONALES

### Videos Tutoriales
- [ ] Video intro Módulo 5 (MCP)
- [ ] Screencasts de configuración MCP
- [ ] Demos de servidores MCP en acción
- [ ] Walkthrough de proyecto final

### Recursos Complementarios
- [ ] Cheatsheets descargables (comandos MCP, hooks, etc.)
- [ ] Templates de proyectos
- [ ] Ejemplos de código en GitHub
- [ ] FAQs por módulo

### Interactividad
- [ ] Quizzes rápidos en lecciones largas
- [ ] Pausas de reflexión con preguntas abiertas
- [ ] Foros de discusión por módulo
- [ ] Sesiones de Q&A en vivo (opcional)

---

## 📊 KPIs DE ÉXITO

| Métrica | Objetivo | Medición |
|---------|----------|----------|
| Tasa de completitud | >70% | % estudiantes que terminan curso |
| Satisfacción | >4.5/5 | Encuesta post-curso |
| Tiempo promedio | 85-95 horas | Analytics de sesiones |
| Tasa de aprobación tests | >80% | % que aprueban al 1er intento |
| Ejercicios completados | >90% | % que completan gamificación |
| Proyectos finales | >60% | % que entregan proyecto |
| Recomendación NPS | >50 | Encuesta NPS |

---

## 📞 SOPORTE Y MANTENIMIENTO

### Plan de Actualización Continua
- Revisión trimestral de contenidos
- Actualización con nuevas features de Claude Code
- Incorporación de feedback de estudiantes
- Añadir nuevos servidores MCP populares

### Canal de Feedback
- Formulario de feedback por lección
- Tickets de soporte integrados
- Encuestas periódicas
- Análisis de métricas de abandono

---

## 🏁 CONCLUSIÓN

Este plan transforma el curso "Especialista en Desarrollo con Claude Code" en un **programa profesional de nivel mundial** que:

✅ Cubre **100% de las características** documentadas de Claude Code
✅ Incluye módulo completo sobre **MCP** (crítico para 2025)
✅ Ofrece **40+ ejercicios gamificados** con evaluación automática
✅ Provee **sistema de certificación** con PDFs descargables
✅ Mantiene **calidad pedagógica** de nivel universitario
✅ Proporciona **proyecto integrador real** con portfolio

**Duración total:** 88 horas (vs. 45 actuales)
**Inversión de desarrollo:** ~130 horas en 4 semanas
**ROI esperado:** Curso premium posicionado como referencia en el mercado hispanohablante

---

**Fecha de finalización estimada:** 24 de noviembre de 2025
**Siguiente paso:** Aprobación del plan y asignación de recursos
