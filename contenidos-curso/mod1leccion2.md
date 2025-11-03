***Lección 2: Instalación y configuración del entorno***


## Introducción

En esta lección instalarás Claude Code en tu sistema y configurarás tu entorno de desarrollo para comenzar a trabajar. Al finalizar tendrás Claude Code completamente funcional y listo para usar.

## Prerequisitos

Antes de comenzar, verifica que tienes:

### 1. Sistema operativo compatible
- macOS (recomendado)
- Linux
- Windows con WSL (Windows Subsystem for Linux)

### 2. Acceso a terminal
Abre tu terminal y verifica que funciona correctamente:
```bash
echo "Terminal funcionando correctamente"
```

### 3. Cuenta de Claude

Necesitas una de estas opciones:
- **Claude.ai** (recomendado para principiantes)
  - Ve a https://claude.ai
  - Crea una cuenta gratuita o de pago

- **Claude Console** (para uso empresarial)
  - Requiere API key con créditos pre-pagados
  - Ve a https://console.anthropic.com

## Métodos de instalación

Claude Code ofrece tres métodos de instalación. Elige el que mejor se adapte a tu sistema.

### Método 1: Homebrew (macOS/Linux - Recomendado)

**Ventajas**: Instalación simple, actualizaciones automáticas

```bash
# Instalar Homebrew si no lo tienes
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Claude Code
brew install --cask claude-code
```

### Método 2: Script de instalación

**Para macOS/Linux:**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Para Windows (PowerShell):**
```powershell
irm https://claude.ai/install.ps1 | iex
```

### Método 3: npm (Node.js)

**Requisito**: Node.js 18 o superior

```bash
# Verificar versión de Node.js
node --version

# Instalar globalmente con npm
npm install -g @anthropic-ai/claude-code
```

## Verificar instalación

Después de instalar, verifica que Claude Code esté disponible:

```bash
# Verificar que el comando funciona
claude --version

# Deberías ver algo como:
# claude version 2.0.0
```

Si recibes un error "command not found", reinicia tu terminal o verifica la configuración de PATH.

## Primera autenticación

### Paso 1: Iniciar Claude Code

```bash
claude
```

La primera vez que ejecutes Claude Code, verás una pantalla de bienvenida.

### Paso 2: Elegir método de autenticación

Se te presentarán dos opciones:

**Opción A: Claude.ai (Recomendado para principiantes)**
1. Selecciona esta opción
2. Se abrirá tu navegador automáticamente
3. Inicia sesión en Claude.ai
4. Autoriza la conexión
5. Vuelve a tu terminal

**Opción B: Claude Console (API Key)**
1. Ve a https://console.anthropic.com
2. Genera una API key
3. Pégala cuando Claude Code la solicite

### Paso 3: Confirmar autenticación

Una vez autenticado, verás:
```
✓ Autenticación exitosa
✓ Conectado como: tu-email@ejemplo.com
```

Las credenciales se guardan localmente y no necesitarás volver a autenticarte.

## Configuración inicial

### Configurar directorio de trabajo

Claude Code funciona mejor cuando tienes un proyecto activo. Navega a tu proyecto:

```bash
# Ejemplo: navegar a un proyecto
cd ~/proyectos/mi-app

# Iniciar Claude Code en este directorio
claude
```

### Configuración de preferencias básicas

Claude Code se puede personalizar. Algunas configuraciones útiles:

**Ver configuración actual:**
```bash
claude config list
```

**Configurar modelo por defecto:**
```bash
# Usar Sonnet (balance velocidad/capacidad)
claude config set model claude-sonnet-4.5

# Usar Opus (máxima capacidad)
claude config set model claude-opus-4

# Usar Haiku (máxima velocidad)
claude config set model claude-haiku-4
```

**Configurar salida:**
```bash
# Formato de salida (text, json, markdown)
claude config set output-format text
```

## Comandos básicos esenciales

### Modo interactivo

```bash
# Iniciar sesión interactiva
claude

# Una vez dentro, verás el prompt:
You:
```

Escribe tu primera pregunta:
```
You: ¿Qué archivos hay en este directorio?
```

### Modo de comando único

```bash
# Ejecutar una tarea y salir
claude "analiza la estructura de este proyecto"
```

### Ver ayuda

```bash
# Ayuda general
claude --help

# Ayuda de un comando específico
claude analyze --help
```

### Continuar conversación anterior

```bash
# Continuar la última conversación
claude --continue

# Ver lista de conversaciones pasadas
claude --list
```

## Ejercicio práctico: Tu primera interacción

Vamos a hacer tu primera interacción real con Claude Code:

### Paso 1: Crear un proyecto de prueba

```bash
# Crear directorio
mkdir ~/claude-test
cd ~/claude-test

# Crear un archivo de ejemplo
echo "console.log('Hola Claude Code');" > index.js
```

### Paso 2: Iniciar Claude Code

```bash
claude
```

### Paso 3: Hacer tu primera pregunta

En el prompt de Claude Code escribe:
```
You: Analiza el archivo index.js y sugiere mejoras
```

Claude Code leerá el archivo y te dará sugerencias.

### Paso 4: Pedir que haga cambios

```
You: Agrega comentarios explicativos al código
```

Claude Code te mostrará los cambios propuestos. Puedes aceptarlos o rechazarlos.

### Paso 5: Salir

```
You: /exit
```

## Integración con VS Code (Opcional)

Si usas VS Code, puedes instalar la extensión de Claude Code:

### Instalación de extensión

1. Abre VS Code
2. Ve a Extensions (Cmd+Shift+X)
3. Busca "Claude Code"
4. Click en "Install"

### Uso básico en VS Code

- Abre el Command Palette (Cmd+Shift+P)
- Escribe "Claude"
- Selecciona "Claude Code: New Chat"

La extensión te permite usar Claude Code sin salir del editor.

## Configuración de archivos .claudeignore

Similar a `.gitignore`, puedes crear `.claudeignore` para excluir archivos:

```bash
# En la raíz de tu proyecto
cat > .claudeignore << EOF
node_modules/
.git/
dist/
*.log
.env
EOF
```

Esto evita que Claude Code procese archivos innecesarios.

## Troubleshooting común

### Problema: "Command not found: claude"

**Solución**:
```bash
# Agregar al PATH (macOS/Linux)
echo 'export PATH="$HOME/.claude/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Problema: "Authentication failed"

**Solución**:
```bash
# Re-autenticar
claude auth login
```

### Problema: "Cannot connect to API"

**Solución**:
- Verifica tu conexión a internet
- Verifica que Claude.ai no esté en mantenimiento
- Revisa tu firewall

### Problema: Instalación lenta con npm

**Solución**:
```bash
# Usar otro método de instalación (Homebrew o script)
brew install --cask claude-code
```

## Verificación de instalación completa

Ejecuta este checklist para verificar que todo funciona:

```bash
# 1. Verificar versión
claude --version

# 2. Verificar autenticación
claude auth status

# 3. Test simple
echo "test" | claude "qué contiene esta entrada"

# 4. Verificar configuración
claude config list
```

Si todos estos comandos funcionan, ¡estás listo!

## Próximos pasos

En la Lección 3:
- Crearás tu primer proyecto guiado con Claude Code
- Aprenderás a pedirle tareas específicas
- Practicarás los comandos esenciales

## Resumen

Has aprendido a:
- Instalar Claude Code usando diferentes métodos
- Autenticarte correctamente
- Configurar preferencias básicas
- Ejecutar comandos básicos
- Resolver problemas comunes de instalación
- Verificar que todo funcione correctamente

Tu entorno está listo para comenzar a desarrollar con Claude Code.

---

**Módulo 1 - Lección 2 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
