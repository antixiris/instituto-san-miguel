<p><strong><em>Lección 1: Usando Claude Code para Deployment Empresarial</em></strong></p>

## Introducción

¡Bienvenido a una de las lecciones más emocionantes del curso! Hoy vamos a aprender algo que suena muy técnico pero que, con la ayuda de Claude Code, se vuelve increíblemente sencillo: el **deployment empresarial**.

¿Qué significa "deployment"? Es simplemente el proceso de llevar tu aplicación desde tu computadora (donde la desarrollaste) hasta un servidor en internet donde otras personas puedan usarla. Piensa en ello como "mudarse de casa": tienes que empacar todo, llevarlo al nuevo lugar, y asegurarte de que todo funcione correctamente en su nueva ubicación.

Lo mejor de todo es que **Claude Code será tu asistente personal durante todo este proceso**. No estarás solo. Claude Code puede generar scripts, crear configuraciones, explicarte cada paso y ayudarte a solucionar problemas. Es como tener a un experto a tu lado que te guía en cada momento. ¡Vamos a descubrir cómo!

## ¿Qué es el Deployment Empresarial? (Explicación Simple)

Imagina que has creado una aplicación increíble en tu computadora. Funciona perfectamente cuando la ejecutas localmente. Pero ahora quieres que tu jefe, tus compañeros de trabajo, o tus clientes puedan usarla. ¿Cómo lo haces? Necesitas subirla a un servidor.

**Deployment empresarial** es ese proceso, pero pensado para empresas, lo que significa:
- **Seguridad**: Debe ser seguro y proteger datos sensibles
- **Automatización**: Debe hacerse de forma automática, no manual cada vez
- **Confiabilidad**: Si algo sale mal, debe poder revertirse fácilmente
- **Escalabilidad**: Debe funcionar bien con 10 usuarios o con 10,000

Y aquí viene la magia: **Claude Code puede ayudarte con cada uno de estos aspectos**. No necesitas ser un experto en DevOps (las personas que se especializan en esto). Claude Code puede generar configuraciones, explicarte conceptos y guiarte paso a paso.

## Cómo Claude Code te Ayuda con Deployment

### Tu Primera Conversación con Claude Code sobre Deployment

Vamos a empezar con algo muy simple. Abre Claude Code en tu terminal y hagamos una pregunta básica. No te preocupes por sonar "tonto" o poco técnico. Claude Code está aquí para ayudarte, sin importar tu nivel.

**Tú escribes en Claude Code**:
```
Hola Claude, necesito subir mi aplicación web a un servidor para que otros
puedan usarla. Nunca he hecho esto antes. ¿Puedes explicarme qué opciones
tengo y cuál me recomiendas para empezar?
```

**Claude Code responde**:
```
¡Hola! Claro que sí, es más sencillo de lo que parece. Te explico las opciones
principales:

1. **Servicios en la nube (recomendado para empezar)**:
   - AWS (Amazon Web Services)
   - Google Cloud Platform
   - Microsoft Azure
   - Heroku (más simple para principiantes)

2. **Contenedores**:
   - Docker (empaqueta tu aplicación con todo lo que necesita)

3. **Servidores tradicionales**:
   - VPS (servidor virtual privado)

Para empezar, te recomiendo Heroku porque es el más amigable. ¿Qué tipo de
aplicación tienes? (Node.js, Python, etc.) Te ayudo a crear el plan de
deployment paso a paso.
```

**Explicación de lo que acaba de pasar**:
- Claude Code entendió que eres principiante (nunca lo has hecho antes)
- Te dio opciones sin usar demasiada jerga técnica
- Te recomendó la opción más simple para comenzar
- Te ofreció ayuda personalizada según tu tipo de aplicación

Esto es súper importante: **Claude Code se adapta a tu nivel**. No te va a abrumar con términos técnicos que no entiendes.

## Paso 1: Planificando tu Deployment con Claude Code

Antes de hacer cualquier cosa técnica, vamos a pedirle a Claude Code que nos ayude a crear un plan. Esto es como hacer un mapa antes de salir de viaje.

### Conversación con Claude Code para Planear

**Tú**:
```
Claude, tengo una aplicación Node.js con Express y una base de datos PostgreSQL.
Quiero subirla a producción. ¿Qué pasos debo seguir?
```

**Claude Code**:
```
Perfecto, te voy a crear un plan paso a paso para deployment de tu aplicación:

📋 PLAN DE DEPLOYMENT

FASE 1: PREPARACIÓN (Lo que haremos HOY)
✅ Paso 1: Verificar que tu aplicación funciona localmente
✅ Paso 2: Crear variables de entorno
✅ Paso 3: Preparar tu base de datos para producción
✅ Paso 4: Crear un archivo .dockerignore

FASE 2: CONFIGURACIÓN
✅ Paso 5: Crear un Dockerfile
✅ Paso 6: Configurar scripts de inicio
✅ Paso 7: Configurar el puerto dinámico

FASE 3: DEPLOYMENT
✅ Paso 8: Elegir plataforma (Heroku, AWS, etc.)
✅ Paso 9: Subir tu código
✅ Paso 10: Configurar la base de datos en producción

FASE 4: VERIFICACIÓN
✅ Paso 11: Hacer pruebas
✅ Paso 12: Configurar monitoring básico

¿Quieres que empecemos con el Paso 1? Te voy a guiar en cada uno.
```

**¿Ves lo que hizo Claude Code?** Te dio un plan completo, dividido en fases manejables, con pasos claros. No tienes que adivinar qué hacer después. ¡Simplemente sigues la lista!

## Paso 2: Generar Scripts de Deployment con Claude Code

Ahora viene una de las partes más poderosas: **Claude Code puede escribir scripts por ti**. Un script es simplemente un archivo con comandos que automatizan tareas. En lugar de escribir estos scripts manualmente (y arriesgarte a cometer errores), Claude Code los genera por ti.

### Pidiendo a Claude Code que Cree un Script de Deployment

**Tú**:
```
Claude, necesito un script que automatice el deployment de mi app.
Debería:
1. Ejecutar tests
2. Construir la aplicación
3. Subir a Heroku

¿Puedes crear un script bash que haga esto?
```

**Claude Code**:
```
¡Claro! Te voy a crear un script de deployment automatizado. Te explico
línea por línea qué hace cada parte:

```bash
#!/bin/bash
# Este script automatiza el deployment de tu aplicación a Heroku

# Colores para mensajes (para que sea más fácil leer)
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sin color

# Función para mostrar mensajes
echo_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

echo_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

echo_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# PASO 1: Verificar que estamos en la rama correcta
echo_info "Verificando rama de Git..."
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
    echo_error "No estás en la rama 'main'. Cambia de rama primero."
    exit 1
fi
echo_info "✓ Estás en la rama correcta"

# PASO 2: Ejecutar tests
echo_info "Ejecutando tests..."
npm test
if [ $? -ne 0 ]; then
    echo_error "Los tests fallaron. No se puede hacer deployment."
    exit 1
fi
echo_info "✓ Todos los tests pasaron"

# PASO 3: Construir la aplicación
echo_info "Construyendo la aplicación..."
npm run build
if [ $? -ne 0 ]; then
    echo_error "Error al construir la aplicación."
    exit 1
fi
echo_info "✓ Aplicación construida exitosamente"

# PASO 4: Hacer commit de los cambios (si hay alguno)
echo_info "Verificando cambios..."
if [ -n "$(git status --porcelain)" ]; then
    echo_warning "Hay cambios sin commitear. Haciéndolo ahora..."
    git add .
    git commit -m "Deployment automático - $(date)"
fi

# PASO 5: Push a Heroku
echo_info "Subiendo a Heroku..."
git push heroku main
if [ $? -ne 0 ]; then
    echo_error "Error al subir a Heroku."
    exit 1
fi
echo_info "✓ Código subido a Heroku exitosamente"

# PASO 6: Ejecutar migraciones de base de datos
echo_info "Ejecutando migraciones de base de datos..."
heroku run npm run migrate
echo_info "✓ Migraciones ejecutadas"

# PASO 7: Verificar que la app está corriendo
echo_info "Verificando estado de la aplicación..."
heroku ps
echo_info "Abriendo tu aplicación en el navegador..."
heroku open

echo_info "======================================="
echo_info "🎉 ¡DEPLOYMENT COMPLETADO EXITOSAMENTE!"
echo_info "======================================="
```

**EXPLICACIÓN DETALLADA DEL SCRIPT:**

1. **Las primeras líneas (colores)**: Son solo para hacer el script más
   bonito y fácil de leer. Los mensajes aparecerán en verde, rojo o amarillo.

2. **Funciones echo_info, echo_error**: Son como "atajos" para imprimir
   mensajes con colores. Así es más fácil ver qué está pasando.

3. **Verificación de rama**: Este script verifica que estés en la rama
   'main' de Git. Es una medida de seguridad para no hacer deployment
   desde una rama equivocada.

4. **npm test**: Ejecuta tus tests. Si alguno falla, el script se detiene.
   ¡No queremos subir código roto!

5. **npm run build**: Compila tu aplicación (si es necesario).

6. **git push heroku main**: Este es el comando mágico que sube tu código
   a Heroku.

7. **heroku run npm run migrate**: Ejecuta migraciones de base de datos
   en el servidor.

8. **heroku open**: Abre tu aplicación en el navegador para que la veas.

¿Quieres que te explique alguna parte con más detalle?
```

**¿Qué acaba de pasar aquí?**

Claude Code te generó un script COMPLETO, profesional, con:
- Comentarios que explican cada sección
- Manejo de errores (si algo falla, el script se detiene)
- Mensajes bonitos con colores
- Verificaciones de seguridad

Y lo mejor: **te explicó línea por línea qué hace cada parte**. No tienes que adivinar o buscar en Google. Todo está ahí.

### Guardando y Usando el Script

Ahora vamos a guardar este script. Sigue estos pasos:

**Paso 2.1**: Crea un archivo llamado `deploy.sh` en la raíz de tu proyecto.

**Paso 2.2**: Copia el script que Claude Code te generó y pégalo en ese archivo.

**Paso 2.3**: Dale permisos de ejecución al script. En tu terminal escribe:
```bash
chmod +x deploy.sh
```

**¿Qué hace este comando?** `chmod +x` le dice a tu computadora: "Este archivo es ejecutable, puede correr como un programa".

**Paso 2.4**: Ahora, cada vez que quieras hacer deployment, simplemente escribe:
```bash
./deploy.sh
```

¡Y listo! El script hará todo automáticamente. No tienes que recordar todos los comandos.

## Paso 3: Configuración de CI/CD con Ayuda de Claude Code

Ahora vamos a hablar de algo que suena muy técnico pero que Claude Code hace súper simple: **CI/CD**.

### ¿Qué es CI/CD? (Explicación Simple)

**CI** significa **Continuous Integration** (Integración Continua)
**CD** significa **Continuous Deployment** (Deployment Continuo)

Traducido al español simple: Es hacer que cada vez que subes código nuevo a GitHub, automáticamente se ejecuten tests y, si todo está bien, se suba a producción SIN QUE TENGAS QUE HACER NADA.

Es como tener un robot que, cada vez que subes código:
1. Verifica que funcione
2. Lo prueba
3. Si todo está bien, lo sube a producción automáticamente

¡Suena complicado, verdad? Con Claude Code, no lo es.

### Pidiendo a Claude Code que Configure CI/CD

**Tú**:
```
Claude, quiero configurar GitHub Actions para que automáticamente haga
deployment cada vez que hago push a la rama main. Nunca he usado GitHub
Actions. ¿Me puedes guiar paso a paso?
```

**Claude Code**:
```
¡Perfecto! GitHub Actions es más fácil de lo que parece. Te voy a guiar
paso a paso. Lo primero es crear un archivo de configuración.

PASO 1: Crear la estructura de carpetas
---------------------------------------
En tu proyecto, crea esta estructura:
.github/
  workflows/
    deploy.yml

PASO 2: Crear el archivo deploy.yml
------------------------------------
Te voy a crear el contenido de ese archivo. Lo voy a explicar sección
por sección para que entiendas qué hace cada parte.

```yaml
# Nombre de tu workflow (aparecerá en GitHub)
name: Deploy a Producción

# ¿Cuándo se ejecuta este workflow?
on:
  push:
    branches:
      - main  # Solo cuando haces push a la rama 'main'

# Definir los "jobs" (trabajos que se van a ejecutar)
jobs:
  # Este job se llama "deploy"
  deploy:
    # Se ejecuta en una máquina virtual con Ubuntu
    runs-on: ubuntu-latest

    # Pasos que se ejecutan en orden
    steps:
      # Paso 1: Descargar tu código
      - name: Checkout código
        uses: actions/checkout@v3
        # "checkout" significa "descargar" en este contexto

      # Paso 2: Configurar Node.js
      - name: Configurar Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'  # Usa la versión que tengas en tu proyecto
          cache: 'npm'  # Esto hace que sea más rápido

      # Paso 3: Instalar dependencias
      - name: Instalar dependencias
        run: npm ci
        # 'npm ci' es como 'npm install' pero más rápido y confiable

      # Paso 4: Ejecutar tests
      - name: Ejecutar tests
        run: npm test
        # Si los tests fallan, el workflow se detiene aquí

      # Paso 5: Construir la aplicación
      - name: Construir aplicación
        run: npm run build

      # Paso 6: Deploy a Heroku
      - name: Deploy a Heroku
        uses: akhileshns/heroku-deploy@v3.12.14
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "tu-app-nombre"
          heroku_email: "tu-email@ejemplo.com"
        # Esta acción se encarga de subir tu código a Heroku

      # Paso 7: Notificación de éxito
      - name: Notificar éxito
        if: success()
        run: echo "✅ Deployment exitoso!"

      # Paso 8: Notificación de fallo
      - name: Notificar fallo
        if: failure()
        run: echo "❌ Deployment falló. Revisa los logs."
```

EXPLICACIÓN DETALLADA:
----------------------

**¿Qué es YAML?**: Es el formato del archivo. Es como JSON pero más
fácil de leer. Se basa en indentación (espacios al inicio de cada línea).

**'on: push: branches: - main'**: Esto dice "ejecuta este workflow cada
vez que alguien haga push a la rama main".

**'runs-on: ubuntu-latest'**: GitHub va a crear una computadora virtual
con Ubuntu (Linux) y ejecutar todo ahí.

**'steps'**: Son los pasos que se ejecutan EN ORDEN, uno después del otro.

**'uses: actions/checkout@v3'**: Esto usa una "acción" predefinida. Es
como usar una función que alguien más ya creó. Esta en particular
descarga tu código.

**'run: npm test'**: Ejecuta un comando en la terminal.

**'${{ secrets.HEROKU_API_KEY }}'**: Esto es una variable secreta. La
vamos a configurar en GitHub para que no expongas tu API key.

PASO 3: Configurar el secreto HEROKU_API_KEY
--------------------------------------------
1. Ve a tu repositorio en GitHub
2. Click en "Settings" (arriba a la derecha)
3. En el menú lateral, click en "Secrets and variables" → "Actions"
4. Click en "New repository secret"
5. Nombre: HEROKU_API_KEY
6. Valor: Tu API key de Heroku (la obtienes con: heroku auth:token)
7. Click en "Add secret"

PASO 4: Cambiar datos en el archivo
------------------------------------
En el archivo deploy.yml, cambia:
- "tu-app-nombre" por el nombre real de tu app en Heroku
- "tu-email@ejemplo.com" por tu email de Heroku

PASO 5: Subir el archivo a GitHub
----------------------------------
```bash
git add .github/workflows/deploy.yml
git commit -m "Configurar CI/CD con GitHub Actions"
git push origin main
```

¡Y listo! Ahora, cada vez que hagas push a main, GitHub Actions hará
deployment automáticamente.

¿Quieres que te ayude a probar que funciona?
```

**¿Qué acabamos de aprender?**

Claude Code no solo te dio el archivo de configuración, sino que:
1. Te explicó la estructura de carpetas
2. Te dio el archivo completo con comentarios
3. Te explicó cada sección en lenguaje simple
4. Te guió para configurar secretos en GitHub
5. Te dio los comandos para subir todo

Todo esto sin que tengas que leer documentación técnica confusa o buscar tutoriales en YouTube.

## Paso 4: Troubleshooting con Claude Code

Inevitablemente, algo va a salir mal. Es parte del proceso. Lo importante es saber cómo pedir ayuda a Claude Code cuando eso pasa.

### Ejemplo Real de Troubleshooting

Imagina que ejecutaste tu script de deployment y obtuviste este error:

```
Error: Cannot find module 'dotenv'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:636:15)
    at Function.Module._load (internal/modules/cjs/loader.js:562:25)
```

No te preocupes si este error te parece chino. Vamos a pedirle ayuda a Claude Code.

**Tú**:
```
Claude, estoy tratando de hacer deployment y me sale este error:

Error: Cannot find module 'dotenv'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:636:15)

¿Qué significa y cómo lo soluciono?
```

**Claude Code**:
```
¡No te preocupes! Este es un error muy común y fácil de solucionar.

¿QUÉ SIGNIFICA EL ERROR?
------------------------
Tu aplicación está buscando un módulo llamado 'dotenv' (que se usa para
cargar variables de entorno) pero no lo encuentra. Esto pasa generalmente
porque 'dotenv' no está instalado en el servidor.

¿POR QUÉ PASA ESTO?
-------------------
Probablemente instalaste 'dotenv' como "devDependency" (dependencia de
desarrollo) en lugar de "dependency" (dependencia normal). En producción,
solo se instalan las dependencias normales.

SOLUCIÓN PASO A PASO:
---------------------

Opción 1: Mover dotenv a dependencies
1. Abre tu archivo package.json
2. Busca la sección "devDependencies"
3. Si ves "dotenv" ahí, córtalo (Ctrl+X)
4. Pégalo en la sección "dependencies"
5. Guarda el archivo
6. Ejecuta: npm install
7. Haz commit y push de nuevo

Opción 2: Reinstalar dotenv correctamente
```bash
npm uninstall dotenv
npm install dotenv --save
```
El flag --save lo pone en dependencies automáticamente.

Opción 3: Usar variables de entorno nativas de Heroku
Si estás en Heroku, puedes no usar dotenv en producción y configurar
las variables directamente:
```bash
heroku config:set DATABASE_URL=tu_url_aqui
heroku config:set API_KEY=tu_api_key_aqui
```

Y en tu código, cambiar:
```javascript
// En lugar de:
require('dotenv').config();

// Usa esto en producción:
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
```

¿Cuál opción prefieres? Te recomiendo la Opción 3 porque es la más
profesional para producción.
```

**¿Ves cómo Claude Code te ayuda?**
- Te explica QUÉ es el error
- Te dice POR QUÉ pasó
- Te da MÚLTIPLES soluciones
- Te recomienda la mejor opción
- Te da los comandos exactos

No tienes que pasar horas buscando en StackOverflow o leyendo documentación.

## Ejemplo Práctico Completo: Deployment de Principio a Fin con Claude Code

Vamos a hacer un ejemplo COMPLETO desde cero. Imagina que tienes una aplicación simple de Express y quieres subirla a Heroku. Vamos a usar Claude Code en cada paso.

### Paso A: Preparar la Aplicación

**Tú abres Claude Code y escribes**:
```
Claude, tengo una app de Express muy simple. ¿Qué necesito verificar antes
de hacer deployment? Dame una checklist.
```

**Claude Code**:
```
¡Perfecto! Aquí está tu checklist de pre-deployment:

✅ CHECKLIST DE PRE-DEPLOYMENT
==============================

CONFIGURACIÓN BÁSICA:
[ ] Tu app tiene un package.json con scripts de start
[ ] Tienes un archivo .gitignore que excluye node_modules
[ ] Tu app escucha en un puerto dinámico (process.env.PORT)
[ ] Tienes un archivo README.md

VARIABLES DE ENTORNO:
[ ] Identificaste todas las variables de entorno que usas
[ ] Creaste un archivo .env.example con ejemplos
[ ] NO subiste tu archivo .env a Git

BASE DE DATOS:
[ ] Tu conexión de BD usa variables de entorno
[ ] Tienes scripts de migración (si usas BD)

SEGURIDAD:
[ ] No tienes API keys hardcodeadas en el código
[ ] Tienes configurado CORS correctamente
[ ] Usas HTTPS en producción

¿Quieres que revisemos cada punto juntos?
```

### Paso B: Configurar el Puerto Dinámico

**Tú**:
```
Claude, mi app actualmente usa el puerto 3000 fijo. ¿Cómo lo hago dinámico
para Heroku?
```

**Claude Code**:
```
¡Muy bien! Heroku asigna un puerto dinámicamente. Aquí está el cambio:

ANTES (código antiguo):
```javascript
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
```

DESPUÉS (código actualizado):
```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
```

EXPLICACIÓN:
- process.env.PORT: En producción, Heroku pone el puerto aquí
- || 3000: El "||" significa "o". Si no hay PORT en las variables
  de entorno (cuando trabajas local), usa 3000
- Esto hace que tu app funcione tanto local como en producción

Copia este código, reemplaza tu línea de app.listen, y ¡listo!
```

### Paso C: Crear el Procfile

**Tú**:
```
Claude, ¿qué es un Procfile y cómo lo creo?
```

**Claude Code**:
```
¡Buena pregunta! Un Procfile le dice a Heroku cómo iniciar tu aplicación.

¿QUÉ ES UN PROCFILE?
-------------------
Es un archivo de texto simple llamado "Procfile" (sin extensión) que
contiene instrucciones para ejecutar tu app.

CÓMO CREARLO:
-------------
1. En la raíz de tu proyecto, crea un archivo llamado "Procfile"
   (con P mayúscula, sin .txt ni nada)

2. Escribe esto dentro:
```
web: node src/index.js
```

EXPLICACIÓN:
- "web": Es el tipo de proceso (web significa que responde a HTTP)
- "node src/index.js": Es el comando para iniciar tu app
  - Cambia "src/index.js" por la ruta a tu archivo principal
  - Si tu archivo principal es "server.js", pon "node server.js"

ALTERNATIVA:
Si usas npm scripts, puedes poner:
```
web: npm start
```

Y en tu package.json tener:
```json
"scripts": {
  "start": "node src/index.js"
}
```

¿Cuál es la ruta a tu archivo principal? Te ayudo a escribir tu Procfile.
```

### Paso D: Inicializar Heroku

**Tú**:
```
Claude, nunca he usado Heroku. ¿Cómo creo una app ahí?
```

**Claude Code**:
```
¡No te preocupes! Es muy sencillo. Te guío paso a paso.

PRERREQUISITO: Instalar Heroku CLI
-----------------------------------
Primero necesitas instalar la herramienta de línea de comandos de Heroku.

En Mac (con Homebrew):
```bash
brew tap heroku/brew && brew install heroku
```

En Windows:
Descarga el instalador de: https://devcenter.heroku.com/articles/heroku-cli

En Linux:
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

PASO 1: Login en Heroku
------------------------
```bash
heroku login
```
Esto abrirá tu navegador. Inicia sesión con tu cuenta de Heroku.
(Si no tienes cuenta, créala gratis en heroku.com)

PASO 2: Crear una app en Heroku
--------------------------------
Desde la carpeta de tu proyecto:
```bash
heroku create nombre-de-tu-app
```

Cambia "nombre-de-tu-app" por un nombre único. Por ejemplo:
- mi-primera-app-express
- app-tareas-juan
- api-clima-2024

Si no pones nombre, Heroku genera uno aleatorio (como "fierce-ocean-12345").

PASO 3: Verificar que se creó
------------------------------
```bash
git remote -v
```
Deberías ver algo como:
```
heroku  https://git.heroku.com/tu-app.git (fetch)
heroku  https://git.heroku.com/tu-app.git (push)
```

¡Eso significa que está conectado! ¿Quieres continuar con el deployment?
```

### Paso E: Hacer el Deployment

**Tú**:
```
Sí Claude, ¿cómo subo mi código a Heroku?
```

**Claude Code**:
```
¡Perfecto! Ahora viene la parte emocionante. Te voy a guiar paso a paso.

PASO 1: Asegurarte de que todo está commiteado
-----------------------------------------------
```bash
git status
```

Si ves archivos en rojo (sin commitear), haz:
```bash
git add .
git commit -m "Preparar para deployment"
```

PASO 2: Push a Heroku
----------------------
Este es el momento mágico:
```bash
git push heroku main
```

¿QUÉ VA A PASAR?
Verás MUCHO texto en la terminal. No te asustes. Heroku está:
1. Recibiendo tu código
2. Detectando que es una app de Node.js
3. Instalando dependencias (npm install)
4. Construyendo tu aplicación
5. Iniciándola

Si todo va bien, al final verás:
```
remote: -----> Launching...
remote:        Released v1
remote:        https://tu-app.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
```

PASO 3: Abrir tu aplicación
----------------------------
```bash
heroku open
```

Esto abrirá tu navegador con tu app en vivo. ¡Felicidades! 🎉

PASO 4: Ver logs (si algo sale mal)
------------------------------------
Si tu app no carga, revisa los logs:
```bash
heroku logs --tail
```

Esto muestra lo que está pasando en el servidor. Si ves errores,
cópialos y mándamelos. Te ayudo a solucionarlos.

¿Funcionó? ¿Necesitas ayuda con algún error?
```

## Problemas Comunes y Soluciones

Aquí están los errores más comunes que vas a encontrar, y cómo resolverlos con ayuda de Claude Code.

### Error 1: "Application Error" al Abrir la App

❌ **Error**: Cuando abres tu app en Heroku, ves "Application Error"

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, mi app se subió a Heroku pero cuando la abro dice "Application Error"
```

**Claude Code**:
```
Este error significa que tu app no está iniciándose correctamente. Vamos
a investigar:

PASO 1: Ver los logs
```bash
heroku logs --tail
```

Busca líneas que digan "Error" o que mencionen por qué falló.

PROBLEMAS COMUNES:

1. Puerto incorrecto:
   - Tu app debe escuchar en process.env.PORT
   - Verifica tu código: app.listen(process.env.PORT || 3000)

2. Falta el script de start:
   - En package.json, verifica que tengas:
   ```json
   "scripts": {
     "start": "node tu-archivo-principal.js"
   }
   ```

3. Variable de entorno faltante:
   - Si usas BD o APIs, configura las variables:
   ```bash
   heroku config:set DATABASE_URL=tu_url
   ```

Muéstrame los logs y te digo exactamente qué está pasando.
```

### Error 2: "Cannot find module"

❌ **Error**: Los logs muestran "Cannot find module 'express'" o similar

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, los logs dicen: Cannot find module 'express'
```

**Claude Code**:
```
Este error significa que las dependencias no se instalaron. Causas comunes:

CAUSA 1: package.json incorrecto
---------------------------------
Verifica que 'express' esté en "dependencies", no en "devDependencies".

Abre package.json y verifica:
```json
"dependencies": {
  "express": "^4.18.2",
  ...
}
```

Si está en "devDependencies", muévelo a "dependencies":
```bash
npm uninstall express
npm install express --save
git add package.json package-lock.json
git commit -m "Fix dependencies"
git push heroku main
```

CAUSA 2: package-lock.json no subido
-------------------------------------
Verifica que package-lock.json esté en tu repositorio:
```bash
git add package-lock.json
git commit -m "Add package-lock"
git push heroku main
```

CAUSA 3: Problema con el build
-------------------------------
Fuerza una reinstalación:
```bash
heroku repo:purge_cache -a tu-app-nombre
git commit --allow-empty -m "Rebuild"
git push heroku main
```

Intenta una de estas y me cuentas qué pasa.
```

### Error 3: Base de Datos No Conecta

❌ **Error**: Tu app se inicia pero no puede conectarse a la base de datos

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, mi app se abre pero dice "Error conectando a base de datos"
```

**Claude Code**:
```
Vamos a configurar tu base de datos en Heroku paso a paso.

PASO 1: Agregar el addon de PostgreSQL
---------------------------------------
```bash
heroku addons:create heroku-postgresql:mini
```

Esto crea una base de datos PostgreSQL gratuita y automáticamente
pone la URL en la variable DATABASE_URL.

PASO 2: Verificar que se creó
------------------------------
```bash
heroku config
```

Deberías ver:
```
DATABASE_URL: postgres://usuario:password@host:5432/database
```

PASO 3: Actualizar tu código de conexión
-----------------------------------------
En tu archivo de conexión a la base de datos, usa:
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false  // Necesario para Heroku
  }
});
```

¡IMPORTANTE! Ese ssl: { rejectUnauthorized: false } es necesario para
Heroku. Sin eso, la conexión falla.

PASO 4: Ejecutar migraciones
-----------------------------
Si tienes un script de migración:
```bash
heroku run npm run migrate
```

PASO 5: Verificar
-----------------
```bash
heroku run psql
```

Esto abre una consola de PostgreSQL donde puedes hacer queries y
verificar que tus tablas existen.

¿Te ayuda? ¿Necesitas ayuda con algún paso específico?
```

## 🎮 Ejercicios Gamificados

### Ejercicio 1: Tu Primer Deployment (100 XP)

**Objetivo**: Subir una aplicación simple a Heroku usando Claude Code como guía.

**Instrucciones**:
1. Crea una aplicación Express ultra-simple (solo un endpoint que responda "Hello World")
2. Abre Claude Code y pídele: "Ayúdame a hacer deployment de esta app a Heroku paso a paso"
3. Sigue las instrucciones de Claude Code
4. Comparte la URL de tu app funcionando

**Bonus (50 XP adicionales)**: Agrega un endpoint que responda con la fecha/hora actual.

### Ejercicio 2: Script de Deployment Automático (150 XP)

**Objetivo**: Crear un script que automatice tu deployment.

**Instrucciones**:
1. Pídele a Claude Code: "Crea un script bash que ejecute tests y haga deployment a Heroku"
2. Implementa el script que Claude Code te genere
3. Ejecútalo y documenta qué hace cada parte

**Bonus (75 XP adicionales)**: Agregar al script que envíe una notificación a Slack cuando el deployment sea exitoso.

### Ejercicio 3: CI/CD con GitHub Actions (200 XP)

**Objetivo**: Configurar deployment automático con GitHub Actions.

**Instrucciones**:
1. Pídele a Claude Code: "Ayúdame a configurar GitHub Actions para deployment automático"
2. Crea el archivo de workflow que Claude Code te indique
3. Haz un cambio en tu código y verifica que se despliegue automáticamente

**Bonus (100 XP adicionales)**: Agregar un paso que ejecute tests de integración antes del deployment.

### Ejercicio 4: Troubleshooting Challenge (175 XP)

**Objetivo**: Aprender a resolver errores con ayuda de Claude Code.

**Escenario**: Intencionalmente vas a romper tu aplicación y luego arreglarla.

**Instrucciones**:
1. Cambia el puerto de tu app a un número fijo (ejemplo: 3000)
2. Haz deployment
3. Cuando falle, copia el error y pídele ayuda a Claude Code
4. Implementa la solución que Claude Code sugiera
5. Documenta el proceso

**Bonus (85 XP adicionales)**: Rompe la app de una forma diferente (por ejemplo, elimina una dependencia) y resuélvelo.

### Ejercicio 5: Deployment de Aplicación Completa (300 XP)

**Objetivo**: Hacer deployment de una app con base de datos.

**Instrucciones**:
1. Crea (o usa) una aplicación que use PostgreSQL
2. Pídele a Claude Code: "Necesito hacer deployment de una app con PostgreSQL a Heroku"
3. Sigue el proceso completo: app, base de datos, migraciones
4. Verifica que todo funcione

**Bonus (150 XP adicionales)**: Agrega un endpoint que muestre estadísticas de uso de la base de datos.

## Resumen de Esta Lección

¡Felicidades! Has completado la lección de Deployment Empresarial con Claude Code. Aquí está lo que aprendiste:

✅ **Qué es deployment empresarial** y por qué es importante automatizarlo

✅ **Cómo usar Claude Code como tu guía personal** para planificar y ejecutar deployments

✅ **Generar scripts automáticos de deployment** pidiendo ayuda a Claude Code en lugar de escribirlos manualmente

✅ **Configurar CI/CD con GitHub Actions** usando las instrucciones detalladas que Claude Code te proporciona

✅ **Resolver errores de deployment** preguntándole a Claude Code en lugar de buscar en Google por horas

✅ **Hacer deployment a Heroku paso a paso**, con Claude Code explicándote cada comando

✅ **Trabajar con bases de datos en producción** configurándolas con ayuda de Claude Code

✅ **Crear checklist de pre-deployment** para no olvidar ningún paso importante

Lo más importante que debes recordar: **Nunca estás solo en el proceso**. Claude Code está ahí para explicarte, guiarte y ayudarte a resolver problemas. No necesitas memorizar comandos ni ser un experto en DevOps. Solo necesitas saber hacer las preguntas correctas a Claude Code.

En la próxima lección, vamos a aprender cómo usar Claude Code para integrarte con **Amazon Bedrock**, uno de los servicios de IA más poderosos de AWS. ¡Nos vemos ahí!
