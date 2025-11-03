***Lección 3: Primeros pasos - Tu primer proyecto con Claude***


## Introducción

Con Claude Code instalado y configurado, es momento de crear tu primer proyecto completo. En esta lección aprenderás a trabajar con Claude Code en un proyecto real, desde la creación hasta la implementación de features.

## Proyecto de esta lección: Task Manager CLI

Crearás una aplicación de línea de comandos para gestionar tareas, implementando:
- Crear, listar, completar y eliminar tareas
- Persistencia en archivo JSON
- Interfaz amigable en terminal

## Actividad 1: Inicializar el proyecto

### Paso 1.1: Crear estructura del proyecto

```bash
# Crear directorio
mkdir task-manager-cli
cd task-manager-cli

# Inicializar git
git init

# Crear estructura básica
mkdir src
touch src/index.js
touch README.md
```

### Paso 1.2: Iniciar Claude Code

```bash
claude
```

### Paso 1.3: Primera conversación con contexto

```
You: Estoy creando un Task Manager CLI en Node.js.
Necesito que me ayudes a estructurar el proyecto.

El proyecto debe:
- Gestionar tareas (crear, listar, completar, eliminar)
- Guardar tareas en un archivo JSON
- Tener una interfaz CLI amigable

¿Qué archivos y estructura me recomiendas?
```

Claude Code analizará tu proyecto y sugerirá una estructura completa.

## Actividad 2: Generar configuración inicial

### Paso 2.1: Inicializar package.json

```
You: Crea un package.json para este proyecto con las dependencias necesarias
```

Claude Code generará:
```json
{
  "name": "task-manager-cli",
  "version": "1.0.0",
  "description": "CLI para gestionar tareas",
  "main": "src/index.js",
  "bin": {
    "task": "./src/index.js"
  },
  "scripts": {
    "start": "node src/index.js"
  },
  "dependencies": {
    "commander": "^11.0.0",
    "chalk": "^5.3.0"
  }
}
```

### Paso 2.2: Aceptar cambios

Claude Code te mostrará los cambios propuestos. Revísalos y acepta con:
- **Enter**: Aceptar
- **e**: Editar antes de aceptar
- **r**: Rechazar

### Paso 2.3: Instalar dependencias

```bash
npm install
```

## Actividad 3: Implementar funcionalidad core

### Paso 3.1: Pedir implementación del gestor de tareas

```
You: Implementa un módulo TaskManager en src/taskManager.js con métodos para:
- addTask(description): agregar tarea
- listTasks(): listar todas las tareas
- completeTask(id): marcar como completada
- deleteTask(id): eliminar tarea
- Guardar y cargar desde tasks.json
```

### Paso 3.2: Revisar código generado

Claude Code creará `src/taskManager.js`:

```javascript
const fs = require('fs');
const path = require('path');

class TaskManager {
  constructor(filePath = 'tasks.json') {
    this.filePath = path.join(__dirname, '..', filePath);
    this.tasks = this.loadTasks();
  }

  loadTasks() {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading tasks:', error.message);
    }
    return [];
  }

  saveTasks() {
    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(this.tasks, null, 2),
        'utf8'
      );
    } catch (error) {
      console.error('Error saving tasks:', error.message);
    }
  }

  addTask(description) {
    const task = {
      id: Date.now(),
      description,
      completed: false,
      createdAt: new Date().toISOString()
    };
    this.tasks.push(task);
    this.saveTasks();
    return task;
  }

  listTasks() {
    return this.tasks;
  }

  completeTask(id) {
    const task = this.tasks.find(t => t.id === parseInt(id));
    if (task) {
      task.completed = true;
      task.completedAt = new Date().toISOString();
      this.saveTasks();
      return task;
    }
    return null;
  }

  deleteTask(id) {
    const index = this.tasks.findIndex(t => t.id === parseInt(id));
    if (index !== -1) {
      const deleted = this.tasks.splice(index, 1)[0];
      this.saveTasks();
      return deleted;
    }
    return null;
  }
}

module.exports = TaskManager;
```

### Paso 3.3: Implementar CLI

```
You: Ahora implementa src/index.js usando Commander.js para crear la interfaz CLI con los comandos:
- task add "descripción"
- task list
- task complete <id>
- task delete <id>

Usa chalk para colorear la salida
```

Claude Code generará la interfaz CLI completa.

## Actividad 4: Testing manual

### Paso 4.1: Probar la aplicación

```bash
# Agregar tareas
node src/index.js add "Comprar leche"
node src/index.js add "Estudiar Claude Code"
node src/index.js add "Hacer ejercicio"

# Listar tareas
node src/index.js list

# Completar una tarea
node src/index.js complete 1

# Eliminar una tarea
node src/index.js delete 2

# Listar de nuevo
node src/index.js list
```

### Paso 4.2: Pedir mejoras iterativas

Si encuentras algo que mejorar:

```
You: Las tareas completadas no se ven diferente de las pendientes.
Agrega un indicador visual [✓] para completadas y [ ] para pendientes
```

Claude Code ajustará el código automáticamente.

## Actividad 5: Agregar documentación

### Paso 5.1: Generar README

```
You: Crea un README.md completo para este proyecto con:
- Descripción del proyecto
- Instalación
- Uso (ejemplos de todos los comandos)
- Características
```

### Paso 5.2: Agregar comentarios al código

```
You: Agrega comentarios JSDoc a todos los métodos de TaskManager
```

## Actividad 6: Control de versiones

### Paso 6.1: Crear .gitignore

```
You: Crea un .gitignore apropiado para este proyecto Node.js
```

### Paso 6.2: Hacer commit

```bash
# Revisar cambios
git status

# Agregar todo
git add .

# Commit
git commit -m "feat: implementar Task Manager CLI completo

- TaskManager class con CRUD de tareas
- Persistencia en JSON
- CLI con Commander.js
- Interfaz colorizada con Chalk
- Documentación completa

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

## Mejores prácticas aprendidas

### 1. Ser específico en las peticiones

**❌ Mal:**
```
You: Haz una app de tareas
```

**✅ Bien:**
```
You: Crea un Task Manager CLI en Node.js con las siguientes features:
[lista detallada]
```

### 2. Iterar progresivamente

No pidas todo de una vez. Construye en pasos:
1. Estructura del proyecto
2. Configuración básica
3. Funcionalidad core
4. Interfaz CLI
5. Documentación
6. Mejoras

### 3. Revisar siempre el código generado

Antes de aceptar cambios:
- Lee el código
- Entiende qué hace
- Verifica que cumple tus requisitos
- Prueba que funciona

### 4. Dar contexto sobre el proyecto

Cuanto más sepa Claude Code sobre tu proyecto, mejores sugerencias dará.

## Uso de comandos útiles en Claude Code

### Ver archivos del proyecto

```
You: ¿Qué archivos tengo en este proyecto?
```

### Leer un archivo específico

```
You: Muéstrame el contenido de src/taskManager.js
```

### Buscar en el código

```
You: Busca dónde se usa la función saveTasks
```

### Explicar código

```
You: Explícame cómo funciona el método completeTask
```

## Ejercicio adicional: Extender funcionalidad

Ahora que tienes la base, extiende el proyecto:

### Opción 1: Agregar prioridades

```
You: Agrega un sistema de prioridades (alta, media, baja) a las tareas
```

### Opción 2: Filtros

```
You: Implementa comando "task list --pending" para ver solo pendientes
```

### Opción 3: Fechas límite

```
You: Agrega fechas límite a las tareas y alerta si están vencidas
```

## Troubleshooting

### Problema: "Cannot find module 'commander'"

**Solución**:
```bash
npm install
```

### Problema: Claude Code no ve los archivos nuevos

**Solución**:
```
You: /clear
You: Analiza todos los archivos del proyecto actual
```

### Problema: Cambios no se guardan

**Solución**: Verifica que aceptaste los cambios cuando Claude Code los propuso.

## Verificación de completitud

- [ ] Proyecto inicializado con git
- [ ] package.json creado con dependencias
- [ ] TaskManager implementado y funcionando
- [ ] CLI funcionando con todos los comandos
- [ ] README documentado
- [ ] Código comentado
- [ ] .gitignore configurado
- [ ] Commit realizado
- [ ] App probada manualmente

## Resumen

Has aprendido a:
- Crear un proyecto desde cero con Claude Code
- Pedir implementaciones específicas
- Iterar y mejorar código progresivamente
- Revisar y aceptar cambios sugeridos
- Documentar código automáticamente
- Hacer commits con ayuda de IA

En la Lección 4 explorarás la interfaz de Claude Code más a fondo y aprenderás comandos avanzados.

---

**Módulo 1 - Lección 3 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
