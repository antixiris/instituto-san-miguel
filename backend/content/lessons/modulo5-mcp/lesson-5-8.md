# Lección 5.8: Proyecto Final MCP - Sistema de Gestión de Proyectos

> 📘 **En esta lección:**
> - Crearás un sistema completo de gestión de proyectos
> - Integrarás múltiples servidores MCP (custom + oficiales)
> - Implementarás workflows automatizados complejos
> - Desplegarás una solución production-ready
> - Demostrarás maestría en MCP

---

## 🎯 Descripción del Proyecto

**Nombre:** ProjectHub MCP

**Objetivo:** Sistema que integra gestión de proyectos, control de código, seguimiento de issues y comunicación de equipo usando MCP como capa de integración.

---

## 🏗️ Arquitectura del Sistema

```
         Claude Code (Orchestrator)
                 │
     ┌───────────┼───────────┐
     │           │           │
┌────▼────┐ ┌───▼───┐ ┌────▼────┐
│ Custom  │ │GitHub │ │PostgreSQL│
│  MCP    │ │  MCP  │ │   MCP   │
│ Server  │ │       │ │         │
└─────────┘ └───────┘ └─────────┘
     │
┌────▼────────────────────────┐
│  ProjectHub Database        │
│  • Projects                 │
│  • Tasks                    │
│  • Team Members             │
│  • Metrics                  │
└─────────────────────────────┘
```

---

## 📋 Requisitos del Proyecto

### Funcionales

**1. Gestión de Proyectos**
- Crear/editar/eliminar proyectos
- Asignar miembros del equipo
- Establecer deadlines
- Tracking de progreso

**2. Integración con GitHub**
- Sincronizar issues de GitHub con tareas
- Crear PRs desde ProjectHub
- Status checks automáticos

**3. Base de Datos de Métricas**
- Almacenar historial de tareas
- Generar reportes de productividad
- Analytics de team performance

**4. Workflows Automatizados**
- "Setup proyecto" → crear repo, board, DB schema
- "Deploy nueva versión" → tests, build, deploy, notify
- "Reporte semanal" → agregar métricas, generar PDF, enviar

---

### Técnicos

**1. Servidor MCP Custom (Python/TypeScript)**
- Mínimo 8 tools
- 3 resources
- 2 prompts

**2. Integración de 3+ Servidores MCP**
- Servidor custom (ProjectHub)
- GitHub (oficial)
- PostgreSQL (oficial)
- Opcional: Slack/Notion

**3. Cliente MCP (Opcional)**
- CLI interactivo
- O interfaz web

**4. Tests**
- Unit tests para tools
- Integration tests para workflows

**5. Documentación**
- README completo
- API documentation
- Video demo (5-10 min)

---

## 🛠️ Parte 1: Servidor MCP Custom "ProjectHub"

### Setup

```bash
mkdir projecthub-mcp && cd projecthub-mcp

# Python
uv init
uv add "mcp[cli]" pydantic sqlalchemy asyncpg

# O TypeScript
npm init -y
npm install @modelcontextprotocol/sdk zod pg
```

---

### Modelo de Datos

```python
# models.py
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(String(500))
    github_repo = Column(String(200))
    status = Column(String(20))  # planning, active, completed
    created_at = Column(DateTime, default=datetime.utcnow)
    deadline = Column(DateTime)

class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey('projects.id'))
    title = Column(String(200), nullable=False)
    description = Column(String(1000))
    assignee = Column(String(100))
    status = Column(String(20))  # todo, in_progress, review, done
    github_issue_number = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime)

class TeamMember(Base):
    __tablename__ = 'team_members'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True)
    github_username = Column(String(100))
    role = Column(String(50))
```

---

### Tools Requeridos

**1. create_project**
```python
@mcp.tool()
async def create_project(
    name: str,
    description: str,
    github_repo: str = None,
    deadline: str = None
) -> str:
    """Crear nuevo proyecto.

    Args:
        name: Nombre del proyecto
        description: Descripción detallada
        github_repo: Repositorio GitHub (formato: owner/repo)
        deadline: Fecha límite (ISO format: 2025-12-31)
    """
    # Implementación
    pass
```

**2. add_task**
```python
@mcp.tool()
async def add_task(
    project_id: int,
    title: str,
    description: str = "",
    assignee: str = None
) -> str:
    """Agregar tarea a proyecto."""
    pass
```

**3. update_task_status**
```python
@mcp.tool()
async def update_task_status(
    task_id: int,
    status: str  # todo, in_progress, review, done
) -> str:
    """Actualizar estado de tarea."""
    pass
```

**4. sync_github_issues**
```python
@mcp.tool()
async def sync_github_issues(
    project_id: int
) -> str:
    """Sincronizar issues de GitHub con tareas del proyecto.

    Requiere que proyecto tenga github_repo configurado.
    """
    pass
```

**5. assign_task**
```python
@mcp.tool()
async def assign_task(
    task_id: int,
    assignee: str  # nombre o email
) -> str:
    """Asignar tarea a miembro del equipo."""
    pass
```

**6. generate_project_report**
```python
@mcp.tool()
async def generate_project_report(
    project_id: int,
    period: str = "week"  # day, week, month
) -> str:
    """Generar reporte de progreso del proyecto."""
    pass
```

**7. add_team_member**
```python
@mcp.tool()
async def add_team_member(
    name: str,
    email: str,
    github_username: str = None,
    role: str = "developer"
) -> str:
    """Agregar miembro al equipo."""
    pass
```

**8. get_team_workload**
```python
@mcp.tool()
async def get_team_workload() -> str:
    """Obtener carga de trabajo actual por miembro."""
    pass
```

---

### Resources Requeridos

**1. projects://all**
```python
@mcp.resource("projects://all")
async def all_projects() -> str:
    """Lista de todos los proyectos en JSON."""
    pass
```

**2. project://{id}/tasks**
```python
@mcp.resource("project://{project_id}/tasks")
async def project_tasks(project_id: str) -> str:
    """Tareas de un proyecto específico."""
    pass
```

**3. team://members**
```python
@mcp.resource("team://members")
async def team_members() -> str:
    """Información de miembros del equipo."""
    pass
```

---

### Prompts Requeridos

**1. sprint_planning**
```python
@mcp.prompt()
async def sprint_planning(project_id: int) -> str:
    """Template para planificación de sprint."""
    tasks = await get_pending_tasks(project_id)
    team = await get_team_members()

    return f"""
# Sprint Planning - Proyecto {project_id}

## Tareas Pendientes:
{tasks}

## Equipo Disponible:
{team}

## Tu trabajo:
1. Prioriza tareas por impacto/urgencia
2. Asigna tareas balanceadamente
3. Identifica bloqueadores
4. Sugiere tareas que pueden hacerse en paralelo
5. Estima duración del sprint

Proporciona plan de sprint estructurado.
"""
```

**2. code_review_checklist**
```python
@mcp.prompt()
async def code_review_checklist(task_id: int) -> str:
    """Checklist de code review para una tarea."""
    task = await get_task(task_id)

    return f"""
# Code Review Checklist - Task #{task_id}

**Task:** {task.title}
**Assignee:** {task.assignee}

## Checklist:
- [ ] Código sigue style guide del proyecto
- [ ] Tests escritos y pasando
- [ ] Sin vulnerabilidades de seguridad
- [ ] Performance optimizado
- [ ] Documentación actualizada
- [ ] No hay código comentado/debug
- [ ] Nombres de variables descriptivos
- [ ] Funciones < 50 líneas
- [ ] Manejo de errores apropiado
- [ ] Sin TODOs pendientes

## Próximos pasos:
1. Revisar PR asociado en GitHub
2. Ejecutar tests localmente
3. Aprobar o solicitar cambios
"""
```

---

## 🔗 Parte 2: Integración de Servidores MCP

### Configuración `.mcp.json`

```json
{
  "mcpServers": {
    "projecthub": {
      "type": "stdio",
      "command": "python",
      "args": ["-m", "projecthub_mcp.server"],
      "env": {
        "DB_URL": "${PROJECT_DB_URL}"
      }
    },
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": {
        "Authorization": "Bearer ${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@bytebase/dbhub", "--dsn", "${PROJECT_DB_URL}"]
    }
  }
}
```

---

## 🔄 Parte 3: Workflows Automatizados

### Workflow 1: Nuevo Proyecto

```
Comando: "Setup proyecto: Dashboard de Analytics"

Claude Code orquesta:
1. projecthub.create_project(
     name="Dashboard de Analytics",
     description="Panel de métricas en tiempo real"
   )
   → Proyecto ID: 5

2. github.create_repository(
     name="analytics-dashboard",
     description="Dashboard de Analytics"
   )
   → Repo: company/analytics-dashboard

3. projecthub.update_project(
     project_id=5,
     github_repo="company/analytics-dashboard"
   )

4. postgres.execute_sql(
     "CREATE TABLE metrics (...)"
   )
   → Schema creado

5. projecthub.add_task(
     project_id=5,
     title="Setup proyecto base",
     assignee="lead-dev"
   )

Respuesta: "✅ Proyecto 'Dashboard de Analytics' creado:
            - ID: 5
            - Repo: company/analytics-dashboard
            - DB schema: ✓
            - Primera tarea asignada"
```

---

### Workflow 2: Sincronización GitHub

```
Comando: "Sincroniza issues de GitHub con proyecto 5"

1. github.list_issues(
     repo="company/analytics-dashboard",
     state="open"
   )
   → 15 issues encontrados

2. Para cada issue:
   projecthub.add_task(
     project_id=5,
     title=issue.title,
     description=issue.body,
     github_issue_number=issue.number
   )

3. projecthub.generate_project_report(project_id=5)

Respuesta: "✅ Sincronización completa:
            - 15 issues importados
            - 12 nuevas tareas creadas
            - 3 tareas ya existían"
```

---

### Workflow 3: Reporte Semanal

```
Comando: "Genera reporte semanal del proyecto 5"

1. projecthub.generate_project_report(
     project_id=5,
     period="week"
   )
   → Estadísticas generadas

2. postgres.query(
     "SELECT * FROM task_completions WHERE project_id=5 AND week=CURRENT_WEEK"
   )
   → Métricas de DB

3. github.list_pull_requests(
     repo="company/analytics-dashboard",
     merged_since="7 days ago"
   )
   → PRs mergeados

4. Generar documento Markdown con todos los datos

Respuesta: [Reporte completo en Markdown]
```

---

## 🧪 Parte 4: Testing

### Unit Tests

```python
# tests/test_tools.py
import pytest
from projecthub_mcp.server import create_project, add_task

@pytest.mark.asyncio
async def test_create_project():
    result = await create_project(
        name="Test Project",
        description="Test description"
    )

    assert "Test Project" in result
    assert "created" in result.lower()

@pytest.mark.asyncio
async def test_add_task():
    # Primero crear proyecto
    project_result = await create_project("Test", "Test")
    project_id = extract_id(project_result)

    # Agregar tarea
    result = await add_task(
        project_id=project_id,
        title="Test Task",
        description="Test"
    )

    assert "Test Task" in result
```

---

### Integration Tests

```python
# tests/test_workflows.py
@pytest.mark.asyncio
async def test_project_setup_workflow():
    """Test completo de setup de proyecto nuevo."""

    # 1. Crear proyecto
    project = await create_project("Integration Test", "Test")
    project_id = extract_id(project)

    # 2. Agregar miembros
    await add_team_member("Test Dev", "test@example.com")

    # 3. Crear tareas
    task1 = await add_task(project_id, "Setup", "Initial setup")
    task2 = await add_task(project_id, "Tests", "Write tests")

    # 4. Asignar tareas
    await assign_task(extract_id(task1), "test@example.com")

    # 5. Generar reporte
    report = await generate_project_report(project_id)

    # Verificaciones
    assert "Setup" in report
    assert "Tests" in report
    assert "test@example.com" in report
```

---

## 📹 Parte 5: Demo en Video

### Estructura del Video (5-10 minutos)

**1. Introducción (30 seg)**
- Presentación personal
- Descripción del proyecto

**2. Arquitectura (1 min)**
- Diagrama de componentes
- Explicar integración MCP

**3. Demo del Servidor Custom (2 min)**
- Mostrar código del servidor
- Explicar tools principales
- Mostrar configuración MCP

**4. Demo de Workflows (4 min)**
- **Workflow 1:** Setup proyecto nuevo (1.5 min)
- **Workflow 2:** Sincronización GitHub (1.5 min)
- **Workflow 3:** Reporte semanal (1 min)

**5. Features Avanzados (1.5 min)**
- Prompts personalizados
- Resources en acción
- Enterprise configuration

**6. Conclusión (30 seg)**
- Resumen de lo logrado
- Aprendizajes clave

---

## 📊 Criterios de Evaluación

| Criterio | Peso | Excelente (9-10) | Notable (7-8) | Aprobado (5-6) | Insuficiente (<5) |
|----------|------|------------------|---------------|----------------|-------------------|
| **Funcionalidad** | 40% | Todos los requisitos + extras | Todos los requisitos | Mayoría de requisitos | Funcionalidad incompleta |
| **Código** | 25% | Clean code, tests, docs | Código bueno, algunas tests | Código funcional | Código problemático |
| **Integración MCP** | 20% | 4+ servidores, workflows complejos | 3 servidores, workflows básicos | 2 servidores | Integración limitada |
| **Documentación** | 10% | README completo, API docs, video claro | README bueno, video aceptable | README básico | Documentación pobre |
| **Innovación** | 5% | Features únicos, creatividad | Algunas mejoras | Cumple lo básico | Sin extras |

---

## 🎁 Features Opcionales (Bonus)

- **+5%** Interfaz web (React/Vue)
- **+5%** Cliente MCP custom
- **+3%** CI/CD configurado
- **+3%** Docker Compose setup
- **+3%** Slack/Notion integration
- **+3%** Analytics dashboard
- **+2%** Plugins para Claude Code

---

## 📝 Entregables

1. **Código fuente** (GitHub repo público)
2. **README.md** con setup instructions
3. **Video demo** (YouTube/Loom link)
4. **.mcp.json** configuración completa
5. **Tests** (unit + integration)
6. **Documentación API** (Markdown o generada)
7. **Postmortem document**:
   - Qué funcionó bien
   - Desafíos encontrados
   - Lecciones aprendidas
   - Próximos pasos

---

## ⏰ Tiempo Estimado

- **Planificación:** 2 horas
- **Desarrollo servidor:** 6-8 horas
- **Integración MCP:** 3-4 horas
- **Testing:** 2-3 horas
- **Documentación:** 2 horas
- **Video:** 2 horas

**Total:** ~20-25 horas (2 semanas con dedicación parcial)

---

## 🚀 Entrega

**Formato:**
- Crear issue en repositorio del curso
- Título: "Proyecto Final M5 - [Tu Nombre]"
- Incluir todos los links requeridos
- Tag: `modulo-5-proyecto-final`

**Deadline:** 2 semanas desde el inicio de la lección

---

## 📚 Recursos de Ayuda

- [Documentación MCP](https://modelcontextprotocol.io)
- [Ejemplos de Servidores](https://github.com/modelcontextprotocol/servers)
- [Claude Code Docs](https://docs.claude.com/en/docs/claude-code)
- [Foro de la Comunidad](https://github.com/orgs/modelcontextprotocol/discussions)

---

## 🎓 Conclusión del Módulo

**¡Felicitaciones!** Has completado el Módulo 5: Model Context Protocol.

**Lo que has logrado:**
- ✅ Comprender arquitectura completa de MCP
- ✅ Configurar servidores MCP en Claude Code
- ✅ Crear servidores MCP personalizados
- ✅ Desarrollar clientes MCP
- ✅ Implementar workflows empresariales
- ✅ Dominar integración avanzada

**Estás preparado para:**
- Construir aplicaciones de IA conectadas al mundo real
- Integrar múltiples servicios mediante protocolo estándar
- Extender capacidades de Claude Code
- Desarrollar soluciones enterprise con MCP

---

**¡Éxito en tu proyecto final!** 🚀

---

**Duración estimada:** 3 horas (solo lección) + 20-25 horas (proyecto)
**Dificultad:** ⭐⭐⭐⭐⭐ Expert (Proyecto integrador)
