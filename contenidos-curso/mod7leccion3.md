<p><strong><em>Lección 3: Claude Code y Google Vertex AI</em></strong></p>

## Introducción

¡Bienvenido a otra lección emocionante! En la lección anterior aprendiste a usar Amazon Bedrock con la ayuda de Claude Code. Hoy vamos a explorar **Google Vertex AI**, que es la plataforma de inteligencia artificial de Google.

¿Por qué aprender Vertex AI si ya sabes Bedrock? Buena pregunta. En el mundo empresarial, diferentes compañías usan diferentes proveedores de nube. Algunas usan AWS (Amazon), otras usan Google Cloud, y otras Microsoft Azure. Saber trabajar con múltiples plataformas te hace un desarrollador mucho más valioso. Además, cada plataforma tiene sus ventajas, y **Claude Code te va a ayudar a entender cuál usar en cada situación**.

Lo mejor de todo es que ya tienes una base sólida de la lección anterior. Muchos conceptos son similares (APIs, credenciales, modelos), solo cambia la forma de configurarlos. Y como siempre, **Claude Code será tu guía paso a paso**, explicándote cada detalle en lenguaje sencillo. ¡Vamos a empezar!

## ¿Qué es Google Vertex AI? (Explicación Simple)

Imagina que Google tiene un laboratorio gigante lleno de robots inteligentes (modelos de IA). Vertex AI es la forma en que Google te permite "alquilar" esos robots para tu aplicación.

**Analogía simple**: Si Amazon Bedrock es como una tienda de robots de Amazon, Vertex AI es la tienda de robots de Google. Ambas te dan acceso a IA poderosa, pero cada una tiene sus propios robots (modelos) y su propia forma de funcionar.

### Características de Vertex AI

**Ventajas**:
- Integración perfecta con otros servicios de Google (Gmail, Drive, etc.)
- Modelos propios de Google muy poderosos (Gemini, PaLM 2)
- Herramientas visuales para entrenar tus propios modelos
- Muy bueno para proyectos de Machine Learning personalizados

**Desventajas**:
- Configuración inicial puede ser confusa (pero Claude Code te ayuda)
- Documentación muy técnica (por eso usamos Claude Code)
- Requiere Google Cloud Account

### Modelos Disponibles en Vertex AI

Google Vertex AI te da acceso a:

1. **Gemini Pro** - El modelo más avanzado de Google
   - Excelente para razonamiento complejo
   - Puede analizar código, texto, imágenes

2. **Gemini Pro Vision** - Gemini con capacidad de visión
   - Puede "ver" y analizar imágenes
   - Útil para apps que trabajan con fotos

3. **PaLM 2** - Generación de texto
   - Rápido y eficiente
   - Bueno para chatbots y contenido

4. **Codey** - Especializado en código
   - Ayuda a programar
   - Completa código automáticamente

No te preocupes por memorizar todo esto. Claude Code te va a ayudar a elegir el modelo correcto para tu proyecto.

## Comparando Bedrock vs Vertex AI con Ayuda de Claude Code

Antes de empezar con la configuración, vamos a preguntarle a Claude Code cuál deberíamos usar.

**Tú abres Claude Code y escribes**:
```
Claude, aprendí a usar Amazon Bedrock en la lección anterior. Ahora estoy
aprendiendo Vertex AI. ¿Cuándo debería usar uno u otro? Explícamelo con
ejemplos concretos para que pueda decidir.
```

**Claude Code responde**:
```
¡Excelente pregunta! Te voy a dar una comparación práctica y clara.

CUÁNDO USAR AMAZON BEDROCK:
============================

✅ Úsalo si:
- Tu empresa ya usa AWS para todo
- Quieres acceso a Claude (Anthropic) - que solo está en Bedrock
- Necesitas integrar con servicios AWS (S3, Lambda, etc.)
- Tu equipo ya conoce AWS

Ejemplo real:
"Estoy construyendo una app que guarda archivos en AWS S3 y ya uso
AWS Lambda. Para mantener todo en el mismo ecosistema, uso Bedrock."

CUÁNDO USAR GOOGLE VERTEX AI:
==============================

✅ Úsalo si:
- Tu empresa ya usa Google Cloud
- Necesitas los modelos Gemini de Google
- Quieres integrar con Google Workspace (Gmail, Docs, Drive)
- Necesitas herramientas de ML personalizadas (entrenar modelos)

Ejemplo real:
"Estoy construyendo un asistente que lee emails de Gmail y genera
respuestas automáticas. Como ya uso Gmail API, Vertex AI se integra
perfectamente."

COMPARACIÓN DE PRECIOS:
=======================
(Aproximados, verificar precios actuales)

Bedrock (Claude 3 Sonnet):
- Input: ~$0.003 por 1K tokens
- Output: ~$0.015 por 1K tokens

Vertex AI (Gemini Pro):
- Input: ~$0.00025 por 1K caracteres
- Output: ~$0.0005 por 1K caracteres

Gemini Pro tiende a ser más barato para volúmenes altos.

COMPARACIÓN DE FACILIDAD:
=========================

Para principiantes:
- Bedrock: ★★★★☆ (4/5) - Configuración más simple
- Vertex AI: ★★★☆☆ (3/5) - Configuración más compleja

Para expertos:
- Bedrock: ★★★☆☆ (3/5) - Menos opciones de personalización
- Vertex AI: ★★★★★ (5/5) - Máxima flexibilidad

MI RECOMENDACIÓN:
=================

Si estás empezando: Usa Bedrock (más simple)
Si ya tienes experiencia: Aprende ambos (más oportunidades laborales)
Si trabajas para Google/usas Google Cloud: Usa Vertex AI
Si trabajas para Amazon/usas AWS: Usa Bedrock

Para este curso: ¡Aprende ambos! Te hace mucho más valioso.

¿Quieres que te ayude a configurar Vertex AI paso a paso?
```

**¿Qué acabamos de aprender?**

Claude Code te dio una comparación práctica, no solo técnica. Te explicó:
- Cuándo usar cada uno (con ejemplos reales)
- Diferencias de precio
- Nivel de dificultad
- Recomendación personalizada

Esto es justo lo que necesitas para tomar decisiones informadas.

## Paso 1: Configurando Google Cloud con Ayuda de Claude Code

Vamos a configurar Google Cloud desde cero. Esto suena intimidante, pero con Claude Code es muy manejable.

### Creando una Cuenta de Google Cloud

**Tú**:
```
Claude, necesito crear una cuenta de Google Cloud para usar Vertex AI.
Nunca lo he hecho. Guíame desde cero como si tuviera 10 años.
```

**Claude Code**:
```
¡Perfecto! Te voy a guiar paso a paso. Es más fácil de lo que parece.

PASO 1: Crear cuenta de Google Cloud
=====================================

1. Ve a: https://cloud.google.com

2. Click en "Get Started for Free" (Empezar gratis)

3. Inicia sesión con tu cuenta de Gmail
   (Si no tienes Gmail, créate uno primero en gmail.com)

4. Selecciona tu país

5. Acepta los términos de servicio

6. Click en "Continue" (Continuar)

PASO 2: Configurar información de pago
=======================================

Google te va a pedir una tarjeta de crédito, PERO:

✅ Te dan $300 de crédito GRATIS
✅ NO te cobran automáticamente al terminar el trial
✅ Tienes que activar manualmente los cobros después

Llena:
- Tipo de cuenta: Individual (a menos que representes una empresa)
- Información de pago: Tu tarjeta

Google va a hacer un cargo de $1 para verificar. Te lo devuelven.

PASO 3: Crear un proyecto
==========================

Después de registrarte, verás el "Cloud Console". Es como el panel de control.

1. Arriba a la izquierda verás: "Select a project"

2. Click ahí → "NEW PROJECT"

3. Nombre del proyecto: "mi-proyecto-vertex-ai"
   (puede ser el nombre que quieras)

4. Click en "CREATE"

Toma 10-20 segundos crear el proyecto.

PASO 4: Habilitar Vertex AI API
================================

Ahora tenemos que "activar" Vertex AI (viene desactivado por defecto).

1. En el buscador de arriba, escribe: "Vertex AI API"

2. Click en "Vertex AI API"

3. Click en "ENABLE" (Habilitar)

Verás una barra de progreso. Toma 1-2 minutos.

Cuando diga "API enabled", ¡estamos listos!

¿Llegaste hasta aquí? ¿Algún paso te causó problemas?
```

**Análisis**:

Claude Code:
- No asumió que ya tienes cuenta de Google Cloud
- Te advirtió sobre el cargo de $1 (para que no te asustes)
- Te dijo exactamente dónde hacer click
- Te dio tiempos estimados ("10-20 segundos") para que no pienses que algo está roto

### Creando Credenciales (Service Account)

Ahora viene una parte que puede ser confusa: las credenciales. En Google Cloud se llaman "Service Accounts".

**Tú**:
```
Claude, ya habilité Vertex AI API. ¿Ahora qué? ¿Cómo obtengo credenciales
para mi código?
```

**Claude Code**:
```
¡Muy bien! Ahora vamos a crear un "Service Account".

¿QUÉ ES UN SERVICE ACCOUNT?
===========================
Es como crear un "usuario robot" que tu código va a usar para conectarse
a Google Cloud. Es la forma segura de dar permisos a tu aplicación.

Piénsalo así:
- Tú = tu cuenta de Gmail personal
- Service Account = cuenta especial para que tu código se conecte

PASO A PASO PARA CREAR SERVICE ACCOUNT:
========================================

1. En el menú de hamburguesa (☰) arriba a la izquierda, busca:
   "IAM & Admin" → "Service Accounts"

2. Click en "CREATE SERVICE ACCOUNT" (Crear cuenta de servicio)

3. Llena los datos:
   - Service account name: "vertex-ai-access"
   - Service account ID: (se llena automático)
   - Description: "Para acceder a Vertex AI desde mi app"

4. Click en "CREATE AND CONTINUE"

5. En "Grant this service account access to project":
   Busca y selecciona: "Vertex AI User"

   ¿Qué hace esto? Le da permiso al Service Account para usar Vertex AI.

6. Click en "CONTINUE"

7. En "Grant users access": Déjalo en blanco

8. Click en "DONE"

AHORA CREAR LA "KEY" (LLAVE):
==============================

Todavía no terminamos. Necesitamos descargar un archivo con las credenciales.

1. En la lista de Service Accounts, verás el que acabas de crear

2. Click en los tres puntitos (⋮) a la derecha → "Manage keys"

3. Click en "ADD KEY" → "Create new key"

4. Tipo de key: JSON (ya viene seleccionado)

5. Click en "CREATE"

Se descargará un archivo .json automáticamente. Ejemplo:
"mi-proyecto-123456-abc123.json"

¡IMPORTANTE! 🔒
===============
Este archivo es SUPER SECRETO. Contiene todo lo necesario para acceder
a tu proyecto de Google Cloud.

- NUNCA lo subas a GitHub
- NUNCA lo compartas con nadie
- Guárdalo en un lugar seguro

Lo vamos a usar en el siguiente paso.

¿Descargaste el archivo JSON? Dime cómo se llama.
```

**Lo que Claude Code hizo por ti**:

- Te explicó qué es un Service Account con una analogía simple
- Te guió por el proceso confuso de la consola de Google
- Te dijo exactamente qué rol elegir ("Vertex AI User")
- Te advirtió sobre la seguridad del archivo JSON
- Verificó que completaste el paso antes de continuar

## Paso 2: Configurando tu Proyecto Node.js para Vertex AI

Ahora que tienes las credenciales, vamos a configurar un proyecto de Node.js. Esto es similar a lo que hicimos con Bedrock, pero con algunas diferencias que Claude Code va a explicar.

**Tú**:
```
Claude, tengo mi archivo JSON descargado. Se llama "mi-proyecto-123456-abc123.json".
¿Cómo lo uso en un proyecto de Node.js?
```

**Claude Code**:
```
¡Perfecto! Vamos a crear un proyecto desde cero y configurarlo para usar
Vertex AI.

PASO 1: Crear carpeta del proyecto
===================================
```bash
mkdir mi-proyecto-vertex
cd mi-proyecto-vertex
```

PASO 2: Inicializar Node.js
============================
```bash
npm init -y
```

PASO 3: Instalar las librerías de Google Cloud
===============================================
```bash
npm install @google-cloud/aiplatform dotenv
```

¿Qué son estas librerías?
- @google-cloud/aiplatform: Cliente oficial de Google para Vertex AI
- dotenv: Para variables de entorno (igual que en Bedrock)

PASO 4: Mover el archivo JSON a tu proyecto
============================================

1. Copia el archivo JSON que descargaste

2. Pégalo en la carpeta de tu proyecto

3. Renómbralo a algo más simple: "google-credentials.json"

Tu estructura debería verse así:
```
mi-proyecto-vertex/
  ├── google-credentials.json
  ├── package.json
  └── node_modules/
```

PASO 5: Crear archivo .env
===========================
```bash
touch .env
```

Abre .env y escribe:
```
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json
PROJECT_ID=tu-proyecto-id
LOCATION=us-central1
```

¿Cómo obtener tu PROJECT_ID?
- Abre el archivo google-credentials.json
- Busca la línea que dice "project_id"
- Copia ese valor

Ejemplo:
```json
{
  "type": "service_account",
  "project_id": "mi-proyecto-123456",  ← Este es tu PROJECT_ID
  ...
}
```

LOCATION es la región donde va a correr. "us-central1" es Iowa, USA.
Es donde Vertex AI está disponible.

PASO 6: Crear .gitignore
=========================
```bash
touch .gitignore
```

Abre .gitignore y escribe:
```
node_modules/
.env
google-credentials.json
*.json
```

¡IMPORTANTE! Agregamos *.json para asegurar que NINGÚN archivo JSON
se suba a Git. Esto protege tus credenciales.

PASO 7: Verificar que todo está listo
======================================

Tu carpeta debe verse así:
```
mi-proyecto-vertex/
  ├── google-credentials.json  ← Archivo con credenciales
  ├── .env                      ← Variables de entorno
  ├── .gitignore                ← Para proteger secretos
  ├── package.json
  ├── package-lock.json
  └── node_modules/
```

¿Todo listo? Ahora escribimos código. ¿Quieres que te muestre cómo
hacer tu primera llamada a Gemini Pro?
```

**¿Qué hizo Claude Code?**

- Te guió en la instalación de librerías específicas de Google
- Te explicó cómo renombrar el archivo JSON (más fácil de manejar)
- Te enseñó a extraer el PROJECT_ID del archivo JSON
- Te dio una estructura visual de cómo debe verse tu proyecto
- Agregó protección extra en .gitignore (*.json)

## Paso 3: Tu Primer Código con Vertex AI

Ahora viene lo emocionante: escribir código que se conecta a Gemini Pro.

**Tú**:
```
Sí Claude, muéstrame cómo hacer mi primera llamada a Gemini Pro.
Explícame línea por línea.
```

**Claude Code**:
```
¡Perfecto! Te voy a dar el código completo y luego lo explico en detalle.

Crea un archivo llamado index.js:

```javascript
// PASO 1: Cargar variables de entorno
require('dotenv').config();

// PASO 2: Importar librerías de Google Cloud
const { PredictionServiceClient } = require('@google-cloud/aiplatform');
const { helpers } = require('@google-cloud/aiplatform');

// PASO 3: Configurar las credenciales y el proyecto
const clientOptions = {
  apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
};

// PASO 4: Crear el cliente
const predictionClient = new PredictionServiceClient(clientOptions);

// PASO 5: Función para hablar con Gemini Pro
async function preguntarAGemini(pregunta) {
  // Configuración del proyecto y modelo
  const projectId = process.env.PROJECT_ID;
  const location = process.env.LOCATION;
  const model = 'gemini-pro';

  // Construir el endpoint completo
  const endpoint = `projects/${projectId}/locations/${location}/publishers/google/models/${model}`;

  // Preparar el prompt
  const prompt = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: pregunta
          }
        ]
      }
    ]
  };

  // Configuración de generación
  const parameters = helpers.toValue({
    temperature: 0.7,
    maxOutputTokens: 1024,
    topP: 0.8,
    topK: 40
  });

  const request = {
    endpoint,
    instances: [helpers.toValue(prompt)],
    parameters
  };

  try {
    console.log('Enviando pregunta a Gemini Pro...');

    // Llamar a Vertex AI
    const [response] = await predictionClient.predict(request);

    // Extraer la respuesta
    const predictions = response.predictions;
    const respuesta = predictions[0].structValue.fields.candidates
      .listValue.values[0].structValue.fields.content
      .structValue.fields.parts.listValue.values[0]
      .structValue.fields.text.stringValue;

    console.log('\n--- Respuesta de Gemini ---');
    console.log(respuesta);
    console.log('---------------------------\n');

    return respuesta;
  } catch (error) {
    console.error('Error al llamar a Vertex AI:', error.message);
    throw error;
  }
}

// PASO 6: Probar la función
async function main() {
  const pregunta = '¿Qué es JavaScript? Responde en 50 palabras.';
  await preguntarAGemini(pregunta);
}

main();
```

EXPLICACIÓN LÍNEA POR LÍNEA:
=============================

```javascript
require('dotenv').config();
```
Igual que en Bedrock: carga las variables del archivo .env

```javascript
const { PredictionServiceClient } = require('@google-cloud/aiplatform');
const { helpers } = require('@google-cloud/aiplatform');
```
Importamos dos cosas de la librería de Google:
- PredictionServiceClient: El cliente para hacer predicciones (llamadas al modelo)
- helpers: Funciones auxiliares para formatear datos

```javascript
const clientOptions = {
  apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
};
```
Configuramos:
- apiEndpoint: La URL del servidor de Vertex AI en la región us-central1
- keyFilename: Ruta al archivo JSON con las credenciales

```javascript
const predictionClient = new PredictionServiceClient(clientOptions);
```
Creamos el cliente. Es como hacer "login" en Google Cloud desde el código.

```javascript
const endpoint = `projects/${projectId}/locations/${location}/publishers/google/models/${model}`;
```
Esto es específico de Google Cloud. Es una ruta que identifica:
- Tu proyecto
- La ubicación (región)
- El publicador (google)
- El modelo (gemini-pro)

```javascript
const prompt = {
  contents: [...]
};
```
Google usa un formato diferente a Amazon. Aquí definimos:
- contents: Un array de mensajes
- role: 'user' (quien habla)
- parts: Las partes del mensaje (puede ser texto, imágenes, etc.)

```javascript
const parameters = helpers.toValue({
  temperature: 0.7,
  maxOutputTokens: 1024,
  topP: 0.8,
  topK: 40
});
```
Parámetros que controlan la generación:
- temperature: Creatividad (0 = preciso, 1 = creativo)
- maxOutputTokens: Longitud máxima de respuesta
- topP y topK: Control de aleatoriedad (no te preocupes mucho por estos)

```javascript
const [response] = await predictionClient.predict(request);
```
Esta es la llamada real a Vertex AI. Enviamos la petición y esperamos respuesta.

```javascript
const respuesta = predictions[0].structValue.fields...
```
Esta línea se ve complicada, ¿verdad? Es porque Google devuelve los datos
en un formato muy anidado. Básicamente estamos "navegando" por el objeto
para encontrar el texto de la respuesta.

PARA EJECUTAR:
==============
```bash
node index.js
```

Si todo está bien, verás la respuesta de Gemini.

NOTA IMPORTANTE:
================
La extracción de la respuesta (esa línea larga) es la parte más confusa
de trabajar con Vertex AI. En la próxima versión, voy a crear una función
helper para que no tengas que escribir eso cada vez.

¿Quieres que ejecutemos el código juntos y veamos qué pasa?
```

**Análisis de esta explicación**:

Claude Code:
- Te dio código funcional completo
- Explicó CADA línea con lenguaje simple
- Reconoció la parte confusa (extracción de respuesta) y te advirtió
- Comparó con Bedrock donde apropiado
- Ofreció ayuda para ejecutar

### Simplificando la Extracción de Respuesta

**Tú**:
```
Claude, esa línea de extracción de respuesta se ve súper complicada.
¿Hay una forma más simple de hacerlo?
```

**Claude Code**:
```
¡Sí! Vamos a crear una función helper que hace esto más fácil.

Agrega esta función a tu código:

```javascript
// Función helper para extraer texto de la respuesta de Vertex AI
function extraerTextoRespuesta(response) {
  try {
    const predictions = response.predictions;

    // Navegar por la estructura anidada
    const candidato = predictions[0].structValue.fields.candidates
      .listValue.values[0].structValue.fields;

    const partes = candidato.content.structValue.fields.parts
      .listValue.values;

    // Extraer el texto del primer "part"
    const texto = partes[0].structValue.fields.text.stringValue;

    return texto;
  } catch (error) {
    console.error('Error extrayendo texto:', error.message);

    // Si hay error, mostrar toda la respuesta para debugging
    console.log('Respuesta completa:', JSON.stringify(response, null, 2));

    return 'Error: No se pudo extraer el texto de la respuesta';
  }
}
```

Ahora tu función preguntarAGemini se ve así:

```javascript
async function preguntarAGemini(pregunta) {
  // ... (código anterior igual)

  try {
    console.log('Enviando pregunta a Gemini Pro...');

    const [response] = await predictionClient.predict(request);

    // ¡Ahora es mucho más simple!
    const respuesta = extraerTextoRespuesta(response);

    console.log('\n--- Respuesta de Gemini ---');
    console.log(respuesta);
    console.log('---------------------------\n');

    return respuesta;
  } catch (error) {
    console.error('Error al llamar a Vertex AI:', error.message);
    throw error;
  }
}
```

¿Ves? Mucho más limpio. Y si cambia el formato de la respuesta en el
futuro, solo tienes que modificar la función helper.

VENTAJAS DE USAR UNA FUNCIÓN HELPER:
=====================================
✅ Código más legible
✅ Más fácil de debuggear
✅ Reutilizable en diferentes partes de tu app
✅ Manejo de errores centralizado

¿Mejor ahora?
```

## Ejemplo Práctico: Chatbot con Vertex AI

Ahora vamos a crear algo más interesante: un chatbot similar al que hicimos con Bedrock, pero usando Vertex AI.

**Tú**:
```
Claude, ¿puedes ayudarme a crear un chatbot con Vertex AI como el que
hicimos con Bedrock?
```

**Claude Code**:
```
¡Por supuesto! El concepto es el mismo (mantener historial de conversación),
pero la implementación es un poco diferente porque Google usa otro formato.

Crea un archivo llamado chatbot.js:

```javascript
require('dotenv').config();
const readline = require('readline');
const { PredictionServiceClient } = require('@google-cloud/aiplatform');
const { helpers } = require('@google-cloud/aiplatform');

// Configurar cliente
const clientOptions = {
  apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
};

const predictionClient = new PredictionServiceClient(clientOptions);

// Historial de conversación
const historialConversacion = [];

// Helper para extraer respuesta
function extraerTextoRespuesta(response) {
  try {
    const predictions = response.predictions;
    const candidato = predictions[0].structValue.fields.candidates
      .listValue.values[0].structValue.fields;
    const partes = candidato.content.structValue.fields.parts
      .listValue.values;
    const texto = partes[0].structValue.fields.text.stringValue;
    return texto;
  } catch (error) {
    return 'Error: No se pudo extraer el texto';
  }
}

// Función para chatear con Gemini
async function chatConGemini(mensajeUsuario) {
  // Agregar mensaje del usuario al historial
  historialConversacion.push({
    role: 'user',
    parts: [{ text: mensajeUsuario }]
  });

  const projectId = process.env.PROJECT_ID;
  const location = process.env.LOCATION;
  const model = 'gemini-pro';
  const endpoint = `projects/${projectId}/locations/${location}/publishers/google/models/${model}`;

  // Preparar prompt con historial completo
  const prompt = {
    contents: historialConversacion
  };

  const parameters = helpers.toValue({
    temperature: 0.9,
    maxOutputTokens: 2048,
    topP: 0.95,
    topK: 40
  });

  const request = {
    endpoint,
    instances: [helpers.toValue(prompt)],
    parameters
  };

  try {
    const [response] = await predictionClient.predict(request);
    const respuestaGemini = extraerTextoRespuesta(response);

    // Agregar respuesta de Gemini al historial
    historialConversacion.push({
      role: 'model',  // En Google se llama 'model', no 'assistant'
      parts: [{ text: respuestaGemini }]
    });

    return respuestaGemini;
  } catch (error) {
    console.error('Error:', error.message);
    return 'Lo siento, hubo un error. Inténtalo de nuevo.';
  }
}

// Interfaz de chat
async function iniciarChat() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("===================================");
  console.log("  Chatbot con Gemini Pro (Vertex) ");
  console.log("===================================");
  console.log("Escribe 'salir' para terminar\n");

  const preguntarUsuario = () => {
    rl.question("Tú: ", async (input) => {
      const mensaje = input.trim();

      if (mensaje.toLowerCase() === 'salir') {
        console.log("\n¡Hasta luego!");
        rl.close();
        return;
      }

      if (!mensaje) {
        preguntarUsuario();
        return;
      }

      const respuesta = await chatConGemini(mensaje);
      console.log(`\nGemini: ${respuesta}\n`);

      preguntarUsuario();
    });
  };

  preguntarUsuario();
}

iniciarChat();
```

DIFERENCIAS CLAVE CON EL CHATBOT DE BEDROCK:
=============================================

1. **Nombre del rol**:
   - Bedrock: 'assistant'
   - Vertex: 'model'

2. **Estructura de mensajes**:
   - Bedrock: { role, content }
   - Vertex: { role, parts: [{ text }] }

3. **Temperature más alto**:
   - Gemini funciona mejor con temperature: 0.9
   - Claude funciona bien con 0.7

4. **Extracción de respuesta**:
   - Bedrock: Más directo
   - Vertex: Requiere el helper

TODO LO DEMÁS ES IGUAL:
- Historial de conversación
- Interfaz de readline
- Lógica del chat

PARA EJECUTAR:
==============
```bash
node chatbot.js
```

EJEMPLO DE CONVERSACIÓN:
=========================
```
Tú: Hola, soy María
Gemini: ¡Hola María! Es un placer conocerte. ¿En qué puedo ayudarte hoy?

Tú: ¿Cuál es mi nombre?
Gemini: Tu nombre es María, acabas de decírmelo.

Tú: salir
¡Hasta luego!
```

¿Quieres probarlo?
```

## Problemas Comunes y Soluciones

### Error 1: "PERMISSION_DENIED"

❌ **Error**:
```
Error: 7 PERMISSION_DENIED: Permission 'aiplatform.endpoints.predict' denied
```

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, me sale un error de PERMISSION_DENIED. ¿Qué hago?
```

**Claude Code**:
```
Este error significa que tu Service Account no tiene los permisos necesarios.

SOLUCIÓN PASO A PASO:
=====================

1. Ve a la consola de Google Cloud

2. Menú (☰) → IAM & Admin → IAM

3. Busca tu Service Account en la lista
   (el que creamos antes, vertex-ai-access@...)

4. Click en el ícono de lápiz (editar) a la derecha

5. Click en "ADD ANOTHER ROLE"

6. Busca y selecciona: "Vertex AI User"
   (Si ya lo tiene, agrega también "Vertex AI Admin")

7. Click en "SAVE"

8. Espera 1-2 minutos para que los cambios se propaguen

9. Intenta ejecutar tu código de nuevo

ALTERNATIVA SI NO FUNCIONA:
============================

Recrea el archivo de credenciales:

1. IAM & Admin → Service Accounts

2. Click en tu Service Account

3. Tab "KEYS"

4. Delete la key antigua

5. "ADD KEY" → "Create new key" → JSON

6. Descarga el nuevo archivo

7. Reemplaza google-credentials.json con el nuevo

¿Funcionó?
```

### Error 2: "Model not found"

❌ **Error**:
```
Error: Model gemini-pro not found
```

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, dice que no encuentra el modelo gemini-pro
```

**Claude Code**:
```
Hay dos causas probables:

CAUSA 1: La región no tiene Gemini Pro
=======================================

Gemini Pro solo está disponible en ciertas regiones.

Regiones confirmadas:
- us-central1 ✅
- us-east4 ✅
- europe-west1 ✅
- asia-southeast1 ✅

En tu archivo .env, cambia:
```
LOCATION=us-central1
```

Y en tu código, actualiza el apiEndpoint:
```javascript
const clientOptions = {
  apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  ...
};
```

CAUSA 2: Nombre del modelo incorrecto
======================================

Verifica que el nombre sea exactamente:
```javascript
const model = 'gemini-pro';
```

Otros modelos disponibles:
- 'gemini-pro-vision' (para imágenes)
- 'text-bison' (PaLM 2)
- 'chat-bison' (PaLM 2 chat)

CÓMO VERIFICAR QUÉ MODELOS ESTÁN DISPONIBLES:
==============================================

1. Ve a: https://console.cloud.google.com/vertex-ai/model-garden

2. Verás todos los modelos disponibles en tu región

3. Click en uno para ver su nombre exacto

¿Te funcionó con us-central1?
```

### Error 3: "Quota exceeded"

❌ **Error**:
```
Error: 8 RESOURCE_EXHAUSTED: Quota exceeded
```

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, me dice que excedí la quota
```

**Claude Code**:
```
Este error significa que usaste todo tu límite gratuito. Vamos a revisarlo.

¿QUÉ SON LAS QUOTAS?
====================
Google te da un límite de peticiones por minuto/día para evitar abusos.

En el free tier:
- ~60 peticiones por minuto
- ~1000 peticiones por día

SOLUCIÓN 1: Esperar
===================
Si es por peticiones por minuto, espera 60 segundos y vuelve a intentar.

SOLUCIÓN 2: Implementar rate limiting
======================================

Agrega esta función a tu código:

```javascript
// Esperar entre peticiones
function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Modificar la función de chat:
async function chatConGemini(mensaje) {
  // Esperar 1 segundo entre peticiones
  await esperar(1000);

  // ... resto del código
}
```

SOLUCIÓN 3: Verificar tu quota
===============================

1. Google Cloud Console

2. Menú → IAM & Admin → Quotas

3. Busca "Vertex AI API"

4. Verás tus límites y cuánto has usado

5. Puedes solicitar aumento (si ya pagaste)

SOLUCIÓN 4: Optimizar llamadas
===============================

- No hagas llamadas en loops sin delay
- Implementa caché para preguntas repetidas
- Agrupa peticiones si es posible

¿Es la primera vez que te pasa o sucede constantemente?
```

## 🎮 Ejercicios Gamificados

### Ejercicio 1: Primera Conexión a Vertex AI (100 XP)

**Objetivo**: Conectarte exitosamente a Google Vertex AI.

**Tareas**:
1. Crear cuenta de Google Cloud
2. Crear Service Account con permisos
3. Ejecutar el código de ejemplo
4. Obtener respuesta de Gemini Pro

**Entregable**: Screenshot de la respuesta.

**Bonus (+50 XP)**: Probar con Gemini Pro Vision (analizar una imagen).

### Ejercicio 2: Comparar Bedrock vs Vertex (150 XP)

**Objetivo**: Hacer la misma pregunta a ambos servicios y comparar.

**Tareas**:
1. Crear un script que haga la misma pregunta a Claude (Bedrock) y Gemini (Vertex)
2. Comparar las respuestas
3. Medir tiempos de respuesta
4. Documentar diferencias

**Entregable**: Reporte con comparación.

**Bonus (+75 XP)**: Hacer 10 preguntas y generar estadísticas.

### Ejercicio 3: Chatbot Bilingüe (200 XP)

**Objetivo**: Crear un chatbot que pueda conversar en inglés y español.

**Tareas**:
1. Modificar el chatbot de Vertex AI
2. Agregar detección de idioma
3. Responder en el idioma detectado
4. Probar con conversaciones mixtas

**Pista**: Pregunta a Claude Code sobre language detection.

**Entregable**: Código + video de demostración.

**Bonus (+100 XP)**: Agregar tercer idioma (francés, alemán, etc.).

### Ejercicio 4: Rate Limiter Inteligente (175 XP)

**Objetivo**: Implementar sistema de rate limiting para no exceder quotas.

**Tareas**:
1. Crear función que rastree peticiones por minuto
2. Implementar delay automático si te acercas al límite
3. Mostrar warnings al usuario
4. Guardar log de uso

**Entregable**: Código con rate limiting funcional.

**Bonus (+85 XP)**: Dashboard que muestre uso en tiempo real.

### Ejercicio 5: Aplicación Completa con Vertex AI (300 XP)

**Objetivo**: Crear una aplicación útil usando Vertex AI.

**Ideas**:
- Analizador de sentimientos de tweets
- Generador de resúmenes de artículos
- Asistente de estudio con Gemini
- Corrector de gramática
- Generador de ideas de negocio

**Requisitos**:
- Usar Gemini Pro
- Interfaz (terminal o web simple)
- Manejo de errores robusto
- Rate limiting
- Documentación

**Entregable**: Repositorio en GitHub + demo en video.

**Bonus (+200 XP)**: Comparar resultados con Bedrock en la misma app.

## Resumen de Esta Lección

¡Felicidades! Completaste la lección de Google Vertex AI con Claude Code. Esto es lo que aprendiste:

✅ **Qué es Google Vertex AI** y cuándo usarlo en lugar de Bedrock

✅ **Configurar Google Cloud** desde cero con la guía de Claude Code

✅ **Crear y usar Service Accounts** para acceso seguro

✅ **Escribir código que se conecta a Gemini Pro** con explicaciones detalladas

✅ **Crear un chatbot con memoria** usando el formato de Google

✅ **Resolver errores comunes** de permisos, quotas y configuración

✅ **Comparar Bedrock y Vertex AI** para tomar decisiones informadas

✅ **Optimizar uso** para no exceder límites gratuitos

Lo más importante: **Ahora sabes trabajar con DOS plataformas de IA empresarial**. Esto te hace mucho más valioso como desarrollador. Y todo gracias a Claude Code guiándote paso a paso.

En la próxima lección, vamos a aprender sobre **Seguridad con Claude Code**: cómo construir aplicaciones seguras, manejar secretos, y proteger datos sensibles. ¡Nos vemos ahí!
