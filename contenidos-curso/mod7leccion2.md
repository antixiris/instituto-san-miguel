<p><strong><em>Lección 2: Claude Code y Amazon Bedrock</em></strong></p>

## Introducción

¡Bienvenido a una de las lecciones más emocionantes del curso! Hoy vas a aprender a trabajar con **Amazon Bedrock**, un servicio super potente que te permite usar inteligencia artificial de última generación en tus aplicaciones. Y lo mejor de todo: **Claude Code va a ser tu profesor y asistente personal en cada paso del camino**.

¿Por qué es esto emocionante? Porque Amazon Bedrock te da acceso a modelos de IA increíbles (incluyendo Claude, GPT, y muchos más) sin necesidad de entrenar tus propios modelos. Imagina poder agregar capacidades de IA a cualquier aplicación que construyas, y hacerlo con la ayuda de Claude Code explicándote cada paso.

No te preocupes si nunca has trabajado con AWS (Amazon Web Services) o si términos como "API key" te suenan a chino. Vamos a ir paso a paso, con un lenguaje super sencillo, y Claude Code estará ahí para aclarar cualquier duda. Al final de esta lección, tendrás tu propia aplicación conectada a Amazon Bedrock. ¡Vamos allá!

## ¿Qué es Amazon Bedrock? (Explicación Simple)

Imagina que quieres construir un robot inteligente, pero entrenar a un robot desde cero es carísimo y toma años. Amazon Bedrock es como un "supermercado de robots inteligentes ya entrenados" donde puedes:

- **Elegir el robot que necesitas**: ¿Quieres uno que escriba textos? ¿Uno que analice imágenes? ¿Uno que programe? Hay opciones.
- **Usar el robot sin comprarlo**: Solo pagas por el tiempo que lo uses.
- **No preocuparte por el mantenimiento**: Amazon se encarga de que todo funcione.

**En términos técnicos**, Amazon Bedrock es un servicio de AWS que te da acceso a modelos de IA (Large Language Models o LLMs) a través de una API. Pero no necesitas entender todos esos términos ahora. Solo necesitas saber que es una forma fácil de agregar superpoderes de IA a tus aplicaciones.

### Modelos Disponibles en Bedrock

Amazon Bedrock te da acceso a varios modelos:

1. **Claude** (de Anthropic) - El mismo modelo que estás usando ahora
   - Excelente para conversaciones, escritura, análisis
   - Muy seguro y confiable

2. **Titan** (de Amazon) - Modelos propios de Amazon
   - Buenos para embeddings y búsqueda semántica

3. **Jurassic** (de AI21 Labs) - Especializado en generación de texto

4. **Stable Diffusion** (de Stability AI) - Para generar imágenes

No te preocupes por memorizar todo esto. Lo importante es que tienes opciones, y Claude Code te va a ayudar a elegir la correcta para tu proyecto.

## ¿Por Qué Usar Bedrock en Lugar de Otras Opciones?

Buena pregunta. Hay muchas formas de usar IA en tus aplicaciones. ¿Por qué elegir Bedrock?

**Ventajas**:
- **Empresarial**: Si trabajas para una empresa que ya usa AWS, Bedrock se integra perfectamente
- **Seguridad**: Tus datos no se usan para entrenar modelos
- **Escalabilidad**: Puede manejar desde 10 hasta 10 millones de peticiones
- **Variedad**: Múltiples modelos en un solo lugar

**Desventajas**:
- Puede ser más caro que usar APIs directamente
- Requiere configuración de AWS (pero Claude Code te ayuda con esto)

## Cómo Claude Code te Ayuda con Amazon Bedrock

Aquí es donde la magia comienza. En lugar de leer documentación árida de AWS que puede tener cientos de páginas, vas a tener una conversación natural con Claude Code. Vamos a ver cómo.

### Tu Primera Conversación con Claude Code sobre Bedrock

Abre Claude Code en tu terminal. Vamos a empezar con una pregunta super básica:

**Tú escribes en Claude Code**:
```
Hola Claude, quiero usar Amazon Bedrock en mi aplicación pero nunca lo he
hecho. Ni siquiera tengo una cuenta de AWS. ¿Puedes guiarme desde cero?
Explícamelo como si tuviera 10 años.
```

**Claude Code responde**:
```
¡Hola! Claro que sí, te voy a guiar paso a paso. Vamos a hacerlo súper simple.

RESUMEN DE LO QUE VAMOS A HACER:
---------------------------------
1. Crear una cuenta de AWS (gratis)
2. Conseguir acceso a Bedrock
3. Crear "credenciales" (como una llave para entrar)
4. Escribir código que use Bedrock
5. Probar que funciona

No te preocupes, te explico cada paso con mucho detalle.

PASO 1: CREAR CUENTA DE AWS
----------------------------
¿Qué es AWS? Es como un "supermercado de servicios en la nube" de Amazon.
Bedrock es uno de esos servicios.

1. Ve a: https://aws.amazon.com
2. Click en "Create an AWS Account" (Crear cuenta)
3. Te va a pedir:
   - Un email
   - Una contraseña
   - Información de tarjeta de crédito

¡IMPORTANTE! Amazon te va a cobrar $1 para verificar tu tarjeta, pero te
lo devuelven. Bedrock tiene "free tier" (capa gratuita) así que si solo
estás probando, NO te van a cobrar.

4. Elige el plan "Basic Support - Free"

¿Ya tienes cuenta de AWS o necesitas que te explique este paso con más detalle?
```

**¿Qué notas en esta respuesta?**

Claude Code:
- No asumió que ya tienes cuenta de AWS
- Explicó qué es AWS en términos simples
- Te advirtió sobre el cargo de $1 (para que no te asustes)
- Te tranquilizó sobre los costos
- Te preguntó si necesitas más ayuda

Esto es **exactamente** lo que hace Claude Code tan valioso: se adapta a tu nivel y no da nada por sentado.

## Paso 1: Configurando AWS con Ayuda de Claude Code

Vamos a asumir que ya creaste tu cuenta de AWS (si seguiste las instrucciones de Claude Code arriba). Ahora viene la parte de conseguir acceso a Bedrock.

### Solicitando Acceso a Bedrock

**Tú**:
```
Claude, ya tengo mi cuenta de AWS. ¿Cómo consigo acceso a Bedrock?
```

**Claude Code**:
```
¡Perfecto! Ahora viene un paso importante: Bedrock NO está disponible
automáticamente. Tienes que "solicitar acceso" a los modelos.

¿POR QUÉ? Amazon quiere asegurarse de que no uses los modelos para cosas
malas. Es como cuando pides permiso para usar algo poderoso.

PASO A PASO PARA SOLICITAR ACCESO:
-----------------------------------

1. Inicia sesión en la consola de AWS: https://console.aws.amazon.com

2. En la barra de búsqueda arriba, escribe: "Bedrock"

3. Click en "Amazon Bedrock"

4. En el menú lateral izquierdo, busca "Model access" (Acceso a modelos)

5. Click en "Manage model access" (Administrar acceso a modelos)

6. Verás una lista de modelos. Para empezar, marca estos:
   ✅ Anthropic - Claude 3 Sonnet
   ✅ Amazon - Titan Text Express

7. Click en "Request model access" (Solicitar acceso)

8. IMPORTANTE: La aprobación es casi instantánea (30 segundos a 2 minutos)
   Vas a ver el estado cambiar de "Pending" a "Access granted"

NOTA: Si dice "Available to request", tienes que llenar un formulario corto
explicando para qué vas a usar Bedrock. Sé honesto: "Aprendiendo a usar IA
en mis aplicaciones". ¡Eso es suficiente!

¿Listo? Cuéntame cuando veas "Access granted" y continuamos.
```

**Explicación de lo que acabamos de hacer**:

Claude Code te guió por la consola de AWS, que puede ser intimidante con tantos menús y opciones. Te dijo exactamente dónde hacer click y qué esperar. También te advirtió sobre el formulario, para que no te sorprendas.

### Creando Credenciales de Acceso

Ahora que tienes acceso a Bedrock, necesitas crear "credenciales". ¿Qué son esas? Piensa en ellas como un usuario y contraseña que tu código va a usar para conectarse a AWS.

**Tú**:
```
Claude, ya tengo "Access granted" en Claude 3 Sonnet. ¿Ahora qué?
```

**Claude Code**:
```
¡Genial! Ahora necesitamos crear credenciales para que tu código pueda
conectarse. Te explico el concepto primero:

¿QUÉ SON LAS CREDENCIALES?
--------------------------
Son como un usuario y contraseña para tu programa. Tienen dos partes:
- Access Key ID: Es como el nombre de usuario
- Secret Access Key: Es como la contraseña

IMPORTANTE: Estas credenciales son SUPER SECRETAS. NUNCA las compartas ni
las subas a GitHub.

PASOS PARA CREAR CREDENCIALES:
-------------------------------

1. En la consola de AWS, busca tu nombre arriba a la derecha

2. Click en tu nombre → "Security credentials"

3. Baja hasta "Access keys" (Llaves de acceso)

4. Click en "Create access key" (Crear llave de acceso)

5. Te pregunta "Use case" (caso de uso). Elige:
   "Command Line Interface (CLI)"

6. Marca la casilla que dice "I understand..." (Entiendo...)

7. Click en "Next"

8. (Opcional) Ponle una descripción: "Bedrock development"

9. Click en "Create access key"

10. ¡IMPORTANTE! Vas a ver dos cosas:
    - Access key ID: Cópialo en un lugar seguro
    - Secret access key: CÓPIALO AHORA (solo lo verás una vez)

11. Click en "Download .csv file" para tener un respaldo

GUARDA ESTAS CREDENCIALES EN UN LUGAR SEGURO. Las vamos a usar en el
siguiente paso.

¿Las tienes guardadas? ¿Listo para usarlas en el código?
```

**Lo que Claude Code hizo por ti**:

- Te explicó qué son las credenciales en términos simples
- Te advirtió sobre la seguridad (¡super importante!)
- Te guió paso a paso por la consola de AWS
- Te recordó descargar el CSV (porque la gente se olvida)
- Verificó que estés listo para el siguiente paso

## Paso 2: Configurando tu Proyecto para Usar Bedrock

Ahora que tienes las credenciales, vamos a configurar un proyecto de Node.js para usar Bedrock. Y por supuesto, Claude Code va a ayudarte.

### Creando el Proyecto

**Tú**:
```
Claude, tengo mis credenciales de AWS. ¿Cómo creo un proyecto de Node.js
que use Bedrock? Hazlo paso a paso para principiantes.
```

**Claude Code**:
```
¡Perfecto! Vamos a crear un proyecto desde cero. Te voy a explicar cada
comando que ejecutes.

PASO 1: Crear carpeta del proyecto
-----------------------------------
```bash
mkdir mi-proyecto-bedrock
cd mi-proyecto-bedrock
```

¿Qué hicimos?
- mkdir: "make directory" = crear carpeta
- cd: "change directory" = entrar a la carpeta

PASO 2: Inicializar proyecto Node.js
-------------------------------------
```bash
npm init -y
```

¿Qué hace este comando?
- npm init: Crea un archivo package.json (configuración del proyecto)
- -y: Dice "sí" a todas las preguntas automáticamente

PASO 3: Instalar las librerías necesarias
------------------------------------------
```bash
npm install @aws-sdk/client-bedrock-runtime dotenv
```

¿Qué son estas librerías?
- @aws-sdk/client-bedrock-runtime: La librería oficial de AWS para Bedrock
- dotenv: Para manejar variables de entorno (donde guardaremos las credenciales)

Verás que npm descarga cosas. Es normal. Toma unos segundos.

PASO 4: Crear archivo de variables de entorno
----------------------------------------------
```bash
touch .env
```

Este comando crea un archivo llamado ".env" (punto env)

Ahora abre ese archivo .env con tu editor favorito y escribe:
```
AWS_ACCESS_KEY_ID=tu_access_key_aqui
AWS_SECRET_ACCESS_KEY=tu_secret_key_aqui
AWS_REGION=us-east-1
```

Reemplaza "tu_access_key_aqui" y "tu_secret_key_aqui" con las credenciales
que guardaste antes.

¿Qué es AWS_REGION? Es la ubicación geográfica del servidor. us-east-1
es Virginia, USA. Es donde Bedrock está disponible.

PASO 5: Crear archivo .gitignore
---------------------------------
```bash
touch .gitignore
```

Abre .gitignore y escribe:
```
node_modules/
.env
```

¿Por qué hacemos esto? Para que Git NO suba tus credenciales a internet.
Es una medida de seguridad.

PASO 6: Crear tu archivo principal
-----------------------------------
```bash
touch index.js
```

¡Ya estamos listos! Ahora vamos a escribir código. ¿Quieres que te muestre
cómo hacer una llamada a Bedrock?
```

**Análisis de esta interacción**:

Claude Code te creó un proyecto completo, explicando:
- Cada comando en español
- Por qué usamos cada librería
- Qué son las variables de entorno
- La importancia del .gitignore

Un principiante que nunca ha visto estos comandos ahora entiende qué hace cada uno.

### Escribiendo el Primer Código

**Tú**:
```
Sí Claude, muéstrame cómo hacer una llamada a Bedrock. Explícame cada línea.
```

**Claude Code**:
```
¡Perfecto! Te voy a dar el código completo y luego lo explico línea por línea.

Abre tu archivo index.js y escribe (o copia) esto:

```javascript
// PASO 1: Importar las librerías necesarias
require('dotenv').config();
const {
  BedrockRuntimeClient,
  InvokeModelCommand
} = require('@aws-sdk/client-bedrock-runtime');

// PASO 2: Configurar el cliente de Bedrock
const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// PASO 3: Crear una función para hablar con Claude
async function preguntarAClaude(pregunta) {
  // Preparar el mensaje en el formato que Claude espera
  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: pregunta
      }
    ]
  };

  // Crear el comando para invocar el modelo
  const command = new InvokeModelCommand({
    modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify(payload)
  });

  try {
    // Enviar la petición a Bedrock
    console.log("Enviando pregunta a Claude...");
    const response = await client.send(command);

    // Procesar la respuesta
    const responseBody = JSON.parse(
      new TextDecoder().decode(response.body)
    );

    // Extraer y mostrar la respuesta
    const respuesta = responseBody.content[0].text;
    console.log("\n--- Respuesta de Claude ---");
    console.log(respuesta);
    console.log("---------------------------\n");

    return respuesta;
  } catch (error) {
    console.error("Error al llamar a Bedrock:", error);
    throw error;
  }
}

// PASO 4: Probar la función
async function main() {
  const pregunta = "¿Qué es la inteligencia artificial? Responde en 50 palabras.";
  await preguntarAClaude(pregunta);
}

// Ejecutar la función principal
main();
```

EXPLICACIÓN DETALLADA LÍNEA POR LÍNEA:
=======================================

```javascript
require('dotenv').config();
```
Esta línea carga las variables de tu archivo .env (tus credenciales).
Sin esto, process.env.AWS_ACCESS_KEY_ID estaría vacío.

```javascript
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
```
Importamos dos cosas de la librería de AWS:
- BedrockRuntimeClient: El "cliente" que se conecta a Bedrock
- InvokeModelCommand: El comando para llamar a un modelo de IA

```javascript
const client = new BedrockRuntimeClient({...});
```
Creamos una conexión a Bedrock con tus credenciales. Es como hacer
"login" en AWS desde tu código.

```javascript
async function preguntarAClaude(pregunta) {...}
```
Creamos una función que puedes llamar cada vez que quieras preguntarle
algo a Claude. "async" significa que esta función puede esperar respuestas
que toman tiempo (como llamadas a internet).

```javascript
const payload = {...};
```
"payload" es la información que le enviamos a Claude:
- anthropic_version: La versión de la API
- max_tokens: Máximo de palabras en la respuesta (1000 es razonable)
- messages: Tu pregunta

```javascript
const command = new InvokeModelCommand({...});
```
Creamos el comando que vamos a enviar. Especificamos:
- modelId: Qué modelo queremos usar (Claude 3 Sonnet)
- body: El payload convertido a texto

```javascript
const response = await client.send(command);
```
¡Esta es la línea mágica! Enviamos la petición a Bedrock y esperamos
la respuesta. "await" significa "espera a que esto termine".

```javascript
const responseBody = JSON.parse(new TextDecoder().decode(response.body));
```
La respuesta viene en un formato binario. Esta línea la convierte a
un objeto de JavaScript que podemos usar.

```javascript
const respuesta = responseBody.content[0].text;
```
Extraemos solo el texto de la respuesta (es lo que Claude escribió).

PARA EJECUTAR EL CÓDIGO:
-------------------------
```bash
node index.js
```

Si todo está bien, verás la respuesta de Claude en tu terminal.

¿Listo para probarlo? ¿Tienes alguna duda sobre el código?
```

**¿Qué hizo Claude Code aquí?**

- Te dio el código completo funcionando
- Lo dividió en pasos lógicos (con comentarios)
- Explicó CADA línea con lenguaje simple
- Te dijo cómo ejecutarlo
- Te preguntó si tienes dudas

Esto es oro puro para un principiante. En lugar de copiar código sin entender, ahora sabes exactamente qué hace cada parte.

## Paso 3: Probando y Debugging con Claude Code

Ahora que tienes el código, vamos a ejecutarlo. Y si algo sale mal (que probablemente saldrá, porque así funciona la programación), Claude Code te va a ayudar a resolverlo.

### Ejecutando por Primera Vez

**Tú ejecutas en la terminal**:
```bash
node index.js
```

**Si todo sale bien**, verás:
```
Enviando pregunta a Claude...

--- Respuesta de Claude ---
La inteligencia artificial (IA) es la capacidad de las máquinas de realizar
tareas que normalmente requieren inteligencia humana, como aprender,
razonar y resolver problemas...
---------------------------
```

¡Felicidades! Acabas de hacer tu primera llamada a Amazon Bedrock.

**Pero... ¿y si algo sale mal?** Aquí es donde Claude Code brilla.

### Escenario de Error 1: Credenciales Incorrectas

Imagina que ejecutas `node index.js` y ves:

```
Error al llamar a Bedrock: UnrecognizedClientException:
The security token included in the request is invalid.
```

No entres en pánico. Vamos a preguntarle a Claude Code:

**Tú**:
```
Claude, me sale este error al ejecutar el código:
UnrecognizedClientException: The security token included in the request is invalid.

¿Qué significa y cómo lo arreglo?
```

**Claude Code**:
```
Este error significa que las credenciales que pusiste en .env no son válidas.
Puede ser por varias razones. Vamos a revisar paso a paso:

CAUSA 1: Credenciales copiadas incorrectamente
-----------------------------------------------
Las credenciales NO pueden tener espacios ni saltos de línea.

Abre tu archivo .env y verifica que se vea EXACTAMENTE así:
```
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
```

Nota:
- Sin comillas ("")
- Sin espacios alrededor del =
- Las credenciales en una sola línea

CAUSA 2: Credenciales antiguas o desactivadas
----------------------------------------------
Si cambiaste tus credenciales en AWS o las desactivaste, tendrás que
generar nuevas.

Ve a AWS Console → Security Credentials → Access Keys
Verifica que la Access Key que estás usando esté "Active"

CAUSA 3: El archivo .env no se está cargando
---------------------------------------------
Verifica que tengas esta línea AL INICIO de tu index.js:
```javascript
require('dotenv').config();
```

PARA VERIFICAR:
---------------
Agrega estas líneas temporalmente después de require('dotenv').config():
```javascript
console.log("Access Key:", process.env.AWS_ACCESS_KEY_ID);
console.log("Region:", process.env.AWS_REGION);
```

Si ves "undefined", el archivo .env no se está cargando.

¿Puedes verificar estos puntos y decirme qué encuentras?
```

**Análisis**:
Claude Code no solo te dijo "credenciales incorrectas". Te dio:
- Múltiples causas posibles
- Cómo verificar cada una
- Código para debuggear
- Formato exacto esperado

### Escenario de Error 2: Región Incorrecta

Otro error común:

```
Error: Could not resolve the foundation model from the model identifier
```

**Tú**:
```
Claude, ahora me sale este error: Could not resolve the foundation model
from the model identifier
```

**Claude Code**:
```
Este error tiene dos causas comunes:

CAUSA 1: La región no tiene acceso a Bedrock
--------------------------------------------
Bedrock NO está disponible en todas las regiones de AWS.

Regiones donde SÍ está disponible:
- us-east-1 (Virginia) ✅ RECOMENDADA
- us-west-2 (Oregon) ✅
- eu-central-1 (Frankfurt) ✅
- ap-southeast-1 (Singapur) ✅

En tu archivo .env, cambia AWS_REGION a:
```
AWS_REGION=us-east-1
```

CAUSA 2: El ID del modelo está mal escrito
-------------------------------------------
El modelId debe ser EXACTAMENTE:
```
anthropic.claude-3-sonnet-20240229-v1:0
```

Verifica en tu index.js que esté escrito así, sin errores de tipeo.

CÓMO VERIFICAR QUÉ MODELOS ESTÁN DISPONIBLES:
----------------------------------------------
Puedes verificar qué modelos tienes disponibles en tu región:

1. Ve a AWS Console
2. Servicios → Bedrock
3. Model access
4. Verás una lista de modelos con "Access granted"

El nombre del modelo debe coincidir EXACTAMENTE con lo que pones en modelId.

¿Funcionó el cambio de región?
```

## Ejemplo Práctico Completo: Chatbot con Bedrock

Ahora que ya sabes lo básico, vamos a crear algo más interesante: un chatbot simple que mantiene conversación. Y por supuesto, Claude Code nos va a guiar.

**Tú**:
```
Claude, quiero crear un chatbot que pueda mantener una conversación,
recordando lo que hablamos antes. ¿Cómo lo hago con Bedrock?
```

**Claude Code**:
```
¡Excelente idea! Vamos a crear un chatbot con memoria. Te voy a dar el
código completo y explicar cómo funciona.

Crea un nuevo archivo llamado chatbot.js:

```javascript
require('dotenv').config();
const readline = require('readline');
const {
  BedrockRuntimeClient,
  InvokeModelCommand
} = require('@aws-sdk/client-bedrock-runtime');

// Configurar cliente de Bedrock
const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Array para guardar el historial de la conversación
const historialConversacion = [];

// Función para hablar con Claude
async function chatConClaude(mensajeUsuario) {
  // Agregar el mensaje del usuario al historial
  historialConversacion.push({
    role: "user",
    content: mensajeUsuario
  });

  // Preparar el payload con TODO el historial
  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 2000,
    messages: historialConversacion
  };

  const command = new InvokeModelCommand({
    modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify(payload)
  });

  try {
    const response = await client.send(command);
    const responseBody = JSON.parse(
      new TextDecoder().decode(response.body)
    );

    const respuestaClaude = responseBody.content[0].text;

    // Agregar la respuesta de Claude al historial
    historialConversacion.push({
      role: "assistant",
      content: respuestaClaude
    });

    return respuestaClaude;
  } catch (error) {
    console.error("Error:", error.message);
    return "Lo siento, hubo un error. Inténtalo de nuevo.";
  }
}

// Interfaz de línea de comandos
async function iniciarChat() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("=================================");
  console.log("  Chatbot con Claude (Bedrock)  ");
  console.log("=================================");
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

      // Obtener respuesta de Claude
      const respuesta = await chatConClaude(mensaje);
      console.log(`\nClaude: ${respuesta}\n`);

      // Continuar la conversación
      preguntarUsuario();
    });
  };

  preguntarUsuario();
}

// Iniciar el chatbot
iniciarChat();
```

EXPLICACIÓN DEL CÓDIGO:
========================

**historialConversacion = []**
Este array guarda TODA la conversación. Cada vez que hablas con Claude,
se agrega al array. Así Claude "recuerda" lo que dijiste antes.

**role: "user" y role: "assistant"**
Distingue quién dijo qué:
- "user": Tú
- "assistant": Claude

**readline**
Es una librería de Node.js que permite leer input del usuario desde
la terminal. Como un "prompt" interactivo.

**La función preguntarUsuario()**
Es recursiva: se llama a sí misma después de cada respuesta. Así la
conversación continúa indefinidamente hasta que escribas "salir".

PARA EJECUTARLO:
----------------
```bash
node chatbot.js
```

Verás algo como:
```
=================================
  Chatbot con Claude (Bedrock)
=================================
Escribe 'salir' para terminar

Tú: _
```

EJEMPLO DE CONVERSACIÓN:
-------------------------
```
Tú: Hola, me llamo Juan
Claude: ¡Hola Juan! Es un placer conocerte. ¿En qué puedo ayudarte hoy?

Tú: ¿Cuál es mi nombre?
Claude: Tu nombre es Juan, me lo acabas de decir.

Tú: salir
¡Hasta luego!
```

¿Ves cómo Claude recordó tu nombre? Eso es gracias al historialConversacion.

¿Quieres probarlo?
```

**Lo que acabamos de aprender**:

Claude Code te creó un chatbot funcional completo con:
- Memoria de conversación
- Interfaz interactiva
- Manejo de errores
- Código limpio y comentado

Todo explicado de forma que un principiante lo puede entender y modificar.

## Optimizando Costos con Ayuda de Claude Code

Usar Bedrock cuesta dinero (aunque la capa gratuita es generosa). Claude Code puede ayudarte a optimizar costos.

**Tú**:
```
Claude, ¿cómo puedo reducir los costos al usar Bedrock? No quiero gastar
mucho dinero mientras aprendo.
```

**Claude Code**:
```
¡Excelente pregunta! Te doy estrategias concretas para ahorrar:

ESTRATEGIA 1: Controlar max_tokens
-----------------------------------
Cada "token" cuesta dinero. Un token es aproximadamente 4 caracteres.

En tu código, cambia max_tokens según necesites:
```javascript
// Para respuestas cortas (más barato)
max_tokens: 500  // ~125 palabras

// Para respuestas medianas
max_tokens: 1000  // ~250 palabras

// Para respuestas largas
max_tokens: 2000  // ~500 palabras
```

CONSEJO: Usa max_tokens bajo si solo necesitas respuestas breves.

ESTRATEGIA 2: Limitar el historial de conversación
---------------------------------------------------
Cada mensaje en el historial CUENTA en los tokens de entrada.

En el chatbot, limita el historial a las últimas N interacciones:
```javascript
// Mantener solo las últimas 10 interacciones
function limitarHistorial(historial, maxInteracciones = 10) {
  if (historial.length > maxInteracciones * 2) {
    // * 2 porque cada interacción tiene user + assistant
    return historial.slice(-maxInteracciones * 2);
  }
  return historial;
}

// Antes de enviar a Bedrock:
const historialLimitado = limitarHistorial(historialConversacion);
const payload = {
  ...
  messages: historialLimitado
};
```

ESTRATEGIA 3: Usar caché de respuestas
---------------------------------------
Si haces las mismas preguntas repetidamente, guárdalas:
```javascript
const cache = {};

async function chatConCache(pregunta) {
  // Si ya hicimos esta pregunta, devolver respuesta guardada
  if (cache[pregunta]) {
    console.log("(Respuesta desde caché - gratis!)");
    return cache[pregunta];
  }

  // Si no, llamar a Bedrock
  const respuesta = await chatConClaude(pregunta);
  cache[pregunta] = respuesta;
  return respuesta;
}
```

ESTRATEGIA 4: Elegir el modelo correcto
----------------------------------------
Diferentes modelos tienen diferentes precios:

- Claude 3 Haiku: MÁS BARATO (bueno para tareas simples)
- Claude 3 Sonnet: PRECIO MEDIO (balance calidad/precio)
- Claude 3 Opus: MÁS CARO (máxima calidad)

Para aprender, usa Haiku:
```javascript
modelId: "anthropic.claude-3-haiku-20240307-v1:0"
```

ESTRATEGIA 5: Monitorear uso
-----------------------------
Crea un contador simple:
```javascript
let contadorLlamadas = 0;
let tokensUsados = 0;

async function chatConMonitoreo(mensaje) {
  contadorLlamadas++;
  console.log(`Llamada #${contadorLlamadas}`);

  const respuesta = await chatConClaude(mensaje);

  // Bedrock retorna el uso de tokens
  console.log(`Tokens de entrada: ${responseBody.usage.input_tokens}`);
  console.log(`Tokens de salida: ${responseBody.usage.output_tokens}`);

  tokensUsados += responseBody.usage.input_tokens + responseBody.usage.output_tokens;
  console.log(`Total acumulado: ${tokensUsados} tokens`);

  return respuesta;
}
```

PRESUPUESTO DE EJEMPLO:
-----------------------
Con la capa gratuita de AWS, tienes aproximadamente:
- Claude 3 Sonnet: Primeros 3 meses gratis (con límites)
- Después: ~$0.003 por 1000 tokens de entrada
            ~$0.015 por 1000 tokens de salida

Para contexto: Una conversación típica usa 500-1000 tokens.
100 conversaciones ≈ $1.50

¿Quieres que te ayude a implementar alguna de estas estrategias?
```

## Problemas Comunes y Soluciones

### Error 1: "ModelStreamErrorException"

❌ **Error**:
```
ModelStreamErrorException: The model returned the following errors
```

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, me sale ModelStreamErrorException. ¿Qué significa?
```

**Claude Code**:
```
Este error generalmente significa que algo en tu "payload" (los datos que
envías) está mal formado. Vamos a revisar:

VERIFICACIÓN 1: Estructura del mensaje
---------------------------------------
Tu payload debe tener EXACTAMENTE esta estructura:
```javascript
const payload = {
  anthropic_version: "bedrock-2023-05-31",  // Versión correcta
  max_tokens: 1000,  // Debe ser número, no string
  messages: [  // Debe ser un array
    {
      role: "user",  // Solo "user" o "assistant"
      content: "texto aquí"  // Debe ser string no vacío
    }
  ]
};
```

ERRORES COMUNES:
- Poner role: "system" (no existe en esta API)
- Dejar content vacío
- Olvidar poner messages como array []

VERIFICACIÓN 2: Alternancia de roles
-------------------------------------
Los mensajes deben alternar entre "user" y "assistant".
NO PUEDES tener dos "user" seguidos.

Correcto:
```
[
  { role: "user", content: "Hola" },
  { role: "assistant", content: "Hola" },
  { role: "user", content: "¿Cómo estás?" }
]
```

Incorrecto:
```
[
  { role: "user", content: "Hola" },
  { role: "user", content: "¿Cómo estás?" }  ❌
]
```

VERIFICACIÓN 3: Validar antes de enviar
----------------------------------------
Agrega esta función de validación:
```javascript
function validarPayload(payload) {
  if (!payload.messages || !Array.isArray(payload.messages)) {
    throw new Error("messages debe ser un array");
  }

  if (payload.messages.length === 0) {
    throw new Error("messages no puede estar vacío");
  }

  for (let i = 0; i < payload.messages.length; i++) {
    const msg = payload.messages[i];

    if (!msg.role || !msg.content) {
      throw new Error(`Mensaje ${i} está incompleto`);
    }

    if (msg.role !== "user" && msg.role !== "assistant") {
      throw new Error(`Role inválido en mensaje ${i}: ${msg.role}`);
    }

    if (typeof msg.content !== "string" || msg.content.trim() === "") {
      throw new Error(`Content inválido en mensaje ${i}`);
    }
  }

  return true;
}

// Usar antes de enviar:
validarPayload(payload);
const command = new InvokeModelCommand({...});
```

Prueba esto y dime si el error persiste.
```

### Error 2: Límite de Tokens Excedido

❌ **Error**:
```
ValidationException: max_tokens must be at most 4096
```

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, me dice que max_tokens debe ser máximo 4096
```

**Claude Code**:
```
Este error es simple: estás pidiendo más tokens de los permitidos.

LÍMITES POR MODELO:
-------------------
- Claude 3 Haiku: hasta 4096 tokens de salida
- Claude 3 Sonnet: hasta 4096 tokens de salida
- Claude 3 Opus: hasta 4096 tokens de salida

SOLUCIÓN:
---------
Cambia max_tokens en tu payload:
```javascript
const payload = {
  ...
  max_tokens: 4096  // Máximo permitido
};
```

NOTA: 4096 tokens ≈ 1000-1200 palabras. Es bastante texto.

Si necesitas respuestas más largas, tienes dos opciones:

OPCIÓN 1: Dividir la tarea
```javascript
// En lugar de pedir "Escribe un ensayo de 5000 palabras"
// Pide:
"Escribe la introducción del ensayo"
"Ahora el desarrollo del primer argumento"
"Ahora el segundo argumento"
...
```

OPCIÓN 2: Streaming (avanzado)
Usa streaming para recibir la respuesta en partes. Te enseño si lo necesitas.

¿Con qué opción quieres continuar?
```

## 🎮 Ejercicios Gamificados

### Ejercicio 1: Primera Conexión (100 XP)

**Objetivo**: Conectarte exitosamente a Amazon Bedrock.

**Tareas**:
1. Crear cuenta de AWS
2. Solicitar acceso a Claude 3 Sonnet
3. Generar credenciales
4. Ejecutar el código de ejemplo
5. Obtener una respuesta de Claude

**Entregable**: Screenshot de la respuesta en tu terminal.

**Bonus (+50 XP)**: Hacer 5 preguntas diferentes y guardar las respuestas en un archivo.

### Ejercicio 2: Chatbot Personalizado (200 XP)

**Objetivo**: Modificar el chatbot para que tenga una personalidad específica.

**Tareas**:
1. Tomar el código del chatbot
2. Agregar un "system prompt" al inicio que le dé personalidad
3. Ejemplos: Chef italiano, Profesor de matemáticas, Comediante
4. Probar con una conversación de al menos 10 intercambios

**Pista**: Pregúntale a Claude Code: "¿Cómo agrego un system prompt a mi chatbot de Bedrock?"

**Entregable**: Código modificado + transcript de una conversación divertida.

**Bonus (+100 XP)**: Hacer que el chatbot recuerde información entre sesiones (guardar historial en un archivo).

### Ejercicio 3: Optimización de Costos (150 XP)

**Objetivo**: Implementar al menos 3 estrategias de optimización de costos.

**Tareas**:
1. Implementar caché de respuestas
2. Limitar historial de conversación
3. Agregar contador de tokens
4. Documentar cuánto ahorras

**Entregable**: Código con las optimizaciones + reporte de ahorro.

**Bonus (+75 XP)**: Crear un dashboard simple que muestre estadísticas de uso.

### Ejercicio 4: Manejador de Errores Robusto (175 XP)

**Objetivo**: Crear un sistema que maneje todos los errores posibles.

**Tareas**:
1. Implementar try-catch en todas las funciones
2. Dar mensajes de error claros al usuario
3. Implementar reintentos automáticos (si falla, intenta 3 veces)
4. Guardar log de errores en un archivo

**Pista**: Pregunta a Claude Code sobre "retry logic" y "error handling best practices".

**Entregable**: Código con manejo robusto de errores.

**Bonus (+85 XP)**: Enviar notificación cuando haya un error crítico.

### Ejercicio 5: Aplicación Completa (300 XP)

**Objetivo**: Crear una aplicación útil usando Bedrock.

**Ideas**:
- Asistente de estudio que explica conceptos
- Generador de ideas para proyectos
- Corrector de gramática y estilo
- Traductor conversacional
- Generador de historias interactivas

**Requisitos**:
- Interfaz (puede ser terminal)
- Manejo de errores
- Optimización de costos
- Documentación (README)
- Al menos 100 líneas de código

**Entregable**: Repositorio en GitHub + video de 2 minutos demostrando la app.

**Bonus (+200 XP)**: Deploy de la app en Heroku o similar.

## Resumen de Esta Lección

¡Felicidades! Has completado la lección de Amazon Bedrock con Claude Code. Esto es lo que aprendiste:

✅ **Qué es Amazon Bedrock** y por qué es útil para desarrolladores

✅ **Cómo configurar una cuenta de AWS** y obtener acceso a Bedrock con la guía de Claude Code

✅ **Crear y manejar credenciales de AWS** de forma segura

✅ **Escribir código que se conecta a Bedrock** con explicaciones línea por línea de Claude Code

✅ **Crear un chatbot con memoria** que mantiene conversaciones coherentes

✅ **Optimizar costos** usando estrategias que Claude Code te enseñó

✅ **Resolver errores comunes** preguntándole a Claude Code en lugar de buscar en Google

✅ **Validar payloads** antes de enviarlos para evitar errores

Lo más importante: **Aprendiste a usar Claude Code como tu mentor personal** para todo el proceso. No tuviste que leer documentación técnica aburrida ni ver tutoriales de YouTube de 2 horas. Solo tuviste conversaciones naturales con Claude Code, que te explicó todo en lenguaje sencillo y te dio código funcionando.

En la próxima lección, vamos a aprender sobre **Google Vertex AI**, otra plataforma poderosa de IA. Y por supuesto, Claude Code estará ahí para guiarte. ¡Nos vemos!
