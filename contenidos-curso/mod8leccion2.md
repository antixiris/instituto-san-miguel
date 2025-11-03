<p><strong><em>Lección 2: Optimización de Costos y Tokens con Claude Code</em></strong></p>

## Introducción

¡Bienvenido a una de las lecciones más prácticas del curso! Hoy vamos a hablar de algo que TODOS los desarrolladores necesitan entender: **cómo usar Claude Code sin que te cueste una fortuna**.

Aquí está la realidad: Claude Code (y las APIs de IA en general) cuestan dinero. Cada vez que le haces una pregunta, cada vez que generas código, cada vez que procesas un documento, estás usando **tokens**, y esos tokens se cobran. Es como el combustible de un auto: cuanto más manejes, más gastas.

Pero no te preocupes. Con las estrategias correctas, puedes usar Claude Code de manera inteligente y eficiente, ahorrando MUCHO dinero. Y lo mejor: **Claude Code mismo puede ayudarte a optimizar tus costos**. Es como tener un asesor financiero que te dice: "Hey, esta forma es más barata" o "Puedes cachear esto para no pagar dos veces".

Al final de esta lección, sabrás exactamente cómo maximizar el valor que obtienes de Claude Code mientras minimizas los gastos. ¡Vamos allá!

## ¿Qué son los Tokens? (Explicación Simple)

Imagina que cada vez que hablas con Claude Code, tienes que "pagar" con moneditas. Cada palabra que escribes y cada palabra que Claude responde cuesta un cierto número de moneditas. Esas "moneditas" se llaman **tokens**.

**Tokens** no son exactamente palabras. Son pedazos de texto. Por ejemplo:
- La palabra "hola" = 1 token
- La palabra "extraordinario" = probablemente 2-3 tokens
- Un emoji = 1-2 tokens
- Código = cada línea usa varios tokens

### Ejemplo Real de Costos

Veamos cuánto cuestan las cosas:

```
Pregunta simple (50 tokens): "¿Cómo creo una función en JavaScript?"
Respuesta de Claude (200 tokens): [Explicación con ejemplo de código]

TOTAL: 250 tokens ≈ $0.0075 USD (menos de un centavo)
```

Parece poco, ¿verdad? Pero ahora imagina:

```
Pregunta con mucho código (2000 tokens): "Claude, aquí está mi archivo completo de 500 líneas, optimízalo"
Respuesta de Claude (3000 tokens): [Código optimizado + explicaciones]

TOTAL: 5000 tokens ≈ $0.15 USD
```

Si haces esto 100 veces al día = $15 USD por día = $450 USD por mes.

¿Ves cómo se acumula? Por eso es importante optimizar.

### ¿Cuánto Cuesta Cada Modelo?

Claude tiene diferentes modelos con diferentes precios:

- **Claude 3.5 Sonnet** (el más común):
  - Input: ~$3 por millón de tokens
  - Output: ~$15 por millón de tokens

- **Claude 3 Haiku** (el más barato):
  - Input: ~$0.25 por millón de tokens
  - Output: ~$1.25 por millón de tokens

**Traducción**: Claude Haiku es 12 veces más barato que Sonnet.

## Cómo Claude Code te Ayuda a Optimizar Costos

### Tu Primera Conversación con Claude Code sobre Optimización

Vamos a pedirle ayuda a Claude Code para entender cómo optimizar.

**Tú escribes en Claude Code**:
```
Hola Claude, estoy usando tu API en mi aplicación y quiero minimizar costos.
¿Qué estrategias me recomiendas para usar menos tokens?
```

**Claude Code responde**:
```
¡Excelente pregunta! Voy a darte las 8 estrategias MÁS efectivas para
optimizar costos.

8 ESTRATEGIAS DE OPTIMIZACIÓN:
================================

1. USA EL MODELO CORRECTO
   - Haiku: Tareas simples (clasificación, respuestas cortas)
   - Sonnet: Tareas complejas (generación de código, razonamiento)

   Ejemplo: No uses Sonnet para traducir "Hola" a inglés. Usa Haiku.

2. IMPLEMENTA CACHÉ
   - Si haces la misma pregunta varias veces, guarda la respuesta
   - Ahorro: 100% (no pagas por la segunda vez)

3. REDUCE EL CONTEXTO
   - No envíes archivos completos si solo necesitas una parte
   - Envía solo las líneas relevantes

   ❌ MAL: Enviar 1000 líneas de código
   ✅ BIEN: Enviar las 50 líneas que tienen el problema

4. USA PROMPTS MÁS CORTOS
   - Sé específico pero conciso
   - Evita repetir contexto innecesario

   ❌ MAL: "Hola Claude, como sabes soy desarrollador y trabajo con..."
   ✅ BIEN: "Crea función JavaScript que sume dos números"

5. PIDE RESPUESTAS MÁS CORTAS
   - Especifica: "Responde en 100 palabras o menos"
   - O: "Solo dame el código, sin explicaciones"

6. BATCH PROCESSING
   - Agrupa múltiples tareas en una sola llamada
   - En lugar de 5 llamadas, haz 1

7. ESTABLECE LÍMITES DE TOKENS
   - Usa max_tokens en tu API call
   - Previene respuestas muy largas

8. MONITOREA TU USO
   - Revisa cuántos tokens usas por día
   - Identifica qué llamadas son más caras

¿Quieres que profundice en alguna de estas estrategias?
```

**¿Ves lo útil que es esto?**

Claude Code te dio 8 estrategias concretas. Ahora vamos a implementar cada una con ejemplos prácticos.

## Paso 1: Implementar Caché para Ahorrar Costos

La estrategia #1 más efectiva es **cachear** (guardar) respuestas que ya obtuviste.

### Pidiendo Ayuda a Claude Code

**Tú**:
```
Claude, necesito implementar un sistema de caché para guardar tus respuestas
y no tener que pagar dos veces por la misma pregunta. ¿Cómo lo hago?
```

**Claude Code**:
```
¡Perfecto! El caché puede ahorrarte MUCHO dinero. Te voy a crear un
sistema simple pero efectivo.

CONCEPTO:
=========

Caché es como una "memoria" que guarda respuestas anteriores.

Flujo:
1. Usuario hace pregunta
2. Verificar si ya respondimos esa pregunta antes
3. Si SÍ → devolver respuesta guardada (GRATIS)
4. Si NO → llamar a Claude API (PAGA) y guardar la respuesta

IMPLEMENTACIÓN SIMPLE CON NODE.JS:
===================================

```javascript
// cache.js - Sistema simple de caché

const crypto = require('crypto');

class Cache {
  constructor() {
    this.cache = {}; // En memoria (para desarrollo)
    this.hits = 0;   // Contador de aciertos
    this.misses = 0; // Contador de fallos
  }

  // Generar clave única para cada prompt
  generateKey(prompt, model = 'default') {
    const hash = crypto
      .createHash('md5')
      .update(`${model}:${prompt}`)
      .digest('hex');
    return hash;
  }

  // Obtener respuesta del caché
  get(prompt, model) {
    const key = this.generateKey(prompt, model);

    if (this.cache[key]) {
      this.hits++;
      console.log(`✅ Cache HIT (ahorraste dinero)`);
      return this.cache[key];
    }

    this.misses++;
    console.log(`❌ Cache MISS (llamada a API necesaria)`);
    return null;
  }

  // Guardar respuesta en caché
  set(prompt, model, response) {
    const key = this.generateKey(prompt, model);
    this.cache[key] = {
      response: response,
      timestamp: Date.now(),
      prompt: prompt
    };
  }

  // Obtener estadísticas
  getStats() {
    const total = this.hits + this.misses;
    const hitRate = total > 0 ? (this.hits / total * 100).toFixed(2) : 0;

    return {
      hits: this.hits,
      misses: this.misses,
      total: total,
      hitRate: `${hitRate}%`,
      cacheSize: Object.keys(this.cache).length,
      estimatedSavings: this.hits * 0.01 // Estimación: $0.01 por hit
    };
  }

  // Limpiar caché viejo (>24 horas)
  cleanup(maxAge = 24 * 60 * 60 * 1000) {
    const now = Date.now();
    let removed = 0;

    for (const [key, value] of Object.entries(this.cache)) {
      if (now - value.timestamp > maxAge) {
        delete this.cache[key];
        removed++;
      }
    }

    console.log(`🧹 Limpieza: ${removed} entradas removidas`);
  }
}

module.exports = new Cache();
```

USAR EL CACHÉ CON CLAUDE API:
==============================

```javascript
// claudeService.js

const Anthropic = require('@anthropic-ai/sdk');
const cache = require('./cache');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function askClaude(prompt, model = 'claude-3-5-sonnet-20241022') {
  // 1. Verificar caché primero
  const cached = cache.get(prompt, model);

  if (cached) {
    return cached.response;
  }

  // 2. Si no está en caché, llamar a la API
  console.log(`💰 Llamando a Claude API (esto cuesta dinero)`);

  const message = await anthropic.messages.create({
    model: model,
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const response = message.content[0].text;

  // 3. Guardar en caché para futuras llamadas
  cache.set(prompt, model, response);

  return response;
}

// Endpoint para ver estadísticas
function getCacheStats() {
  return cache.getStats();
}

module.exports = { askClaude, getCacheStats };
```

EJEMPLO DE USO EN EXPRESS:
===========================

```javascript
// app.js

const express = require('express');
const { askClaude, getCacheStats } = require('./claudeService');

const app = express();
app.use(express.json());

// Endpoint para hablar con Claude
app.post('/api/ask', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await askClaude(prompt);

    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para ver estadísticas de caché
app.get('/api/cache-stats', (req, res) => {
  res.json(getCacheStats());
});

app.listen(3000, () => {
  console.log('Servidor en puerto 3000');
});
```

¿CUÁNTO AHORRAS?
================

Ejemplo real:

SIN CACHÉ:
- 1000 preguntas/día
- Promedio: 500 tokens por pregunta
- Costo: ~$0.015 por pregunta
- TOTAL: $15/día = $450/mes

CON CACHÉ (30% de preguntas repetidas):
- 700 llamadas reales a la API
- 300 respuestas del caché (gratis)
- TOTAL: $10.50/día = $315/mes

AHORRO: $135/mes (30%)

Y si el % de repetición es mayor, ahorras más!

IMPORTANTE:
===========

Este caché es "en memoria" (se pierde al reiniciar el servidor).
Para producción, usa Redis o una base de datos.

¿Quieres que te muestre cómo implementar caché con Redis?
```

**¿Ves el valor de esto?**

Claude Code te dio:
- Sistema completo de caché
- Código listo para usar
- Estadísticas para medir el ahorro
- Cálculo de cuánto ahorras en dinero real

### Mejorando el Caché con Redis

**Tú**:
```
Sí Claude, muéstrame cómo usar Redis para el caché en producción.
```

**Claude Code**:
```
¡Excelente! Redis es perfecto para caché en producción.

PASO 1: Instalar Redis
=======================

En tu computadora (desarrollo):

Mac:
```bash
brew install redis
brew services start redis
```

Ubuntu/Debian:
```bash
sudo apt-get install redis-server
sudo service redis-server start
```

Windows:
Descarga desde: https://github.com/microsoftarchive/redis/releases

PASO 2: Instalar cliente de Redis para Node.js
===============================================

```bash
npm install redis
```

PASO 3: Crear servicio de caché con Redis
==========================================

```javascript
// redisCache.js

const redis = require('redis');

class RedisCache {
  constructor() {
    this.client = redis.createClient({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
    });

    this.client.on('error', (err) => {
      console.error('Redis error:', err);
    });

    this.client.on('connect', () => {
      console.log('✅ Conectado a Redis');
    });

    this.hits = 0;
    this.misses = 0;
  }

  // Conectar a Redis
  async connect() {
    await this.client.connect();
  }

  // Generar clave
  generateKey(prompt, model) {
    const crypto = require('crypto');
    return crypto
      .createHash('md5')
      .update(`${model}:${prompt}`)
      .digest('hex');
  }

  // Obtener del caché
  async get(prompt, model) {
    const key = this.generateKey(prompt, model);

    try {
      const cached = await this.client.get(key);

      if (cached) {
        this.hits++;
        console.log(`✅ Redis Cache HIT`);
        return JSON.parse(cached);
      }

      this.misses++;
      console.log(`❌ Redis Cache MISS`);
      return null;

    } catch (error) {
      console.error('Error obteniendo del caché:', error);
      return null;
    }
  }

  // Guardar en caché
  async set(prompt, model, response, ttl = 86400) {
    const key = this.generateKey(prompt, model);

    try {
      const data = JSON.stringify({
        response: response,
        timestamp: Date.now(),
        prompt: prompt
      });

      // ttl = Time To Live (segundos)
      // 86400 = 24 horas
      await this.client.setEx(key, ttl, data);

      console.log(`💾 Guardado en caché (expira en ${ttl/3600} horas)`);

    } catch (error) {
      console.error('Error guardando en caché:', error);
    }
  }

  // Estadísticas
  async getStats() {
    const total = this.hits + this.misses;
    const hitRate = total > 0 ? (this.hits / total * 100).toFixed(2) : 0;

    // Obtener tamaño del caché
    const keys = await this.client.keys('*');

    return {
      hits: this.hits,
      misses: this.misses,
      total: total,
      hitRate: `${hitRate}%`,
      cacheSize: keys.length,
      estimatedSavings: `$${(this.hits * 0.01).toFixed(2)}`
    };
  }

  // Limpiar todo el caché
  async flush() {
    await this.client.flushAll();
    console.log('🧹 Caché limpiado completamente');
  }
}

module.exports = new RedisCache();
```

USAR EL CACHÉ DE REDIS:
========================

```javascript
// claudeService.js

const Anthropic = require('@anthropic-ai/sdk');
const cache = require('./redisCache');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function askClaude(prompt, model = 'claude-3-5-sonnet-20241022') {
  // Verificar caché
  const cached = await cache.get(prompt, model);

  if (cached) {
    return cached.response;
  }

  // Llamar a API
  console.log(`💰 Llamando a Claude API`);

  const message = await anthropic.messages.create({
    model: model,
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const response = message.content[0].text;

  // Guardar en caché por 24 horas
  await cache.set(prompt, model, response, 86400);

  return response;
}

module.exports = { askClaude };
```

INICIALIZAR REDIS AL ARRANCAR:
===============================

```javascript
// app.js

const express = require('express');
const cache = require('./redisCache');
const { askClaude } = require('./claudeService');

const app = express();

// Conectar a Redis antes de iniciar el servidor
async function start() {
  await cache.connect();

  app.use(express.json());

  app.post('/api/ask', async (req, res) => {
    const { prompt } = req.body;
    const response = await askClaude(prompt);
    res.json({ response });
  });

  app.get('/api/cache-stats', async (req, res) => {
    const stats = await cache.getStats();
    res.json(stats);
  });

  app.listen(3000, () => {
    console.log('Servidor en puerto 3000');
  });
}

start();
```

VENTAJAS DE REDIS:
==================

✅ Persiste entre reinicios del servidor
✅ Súper rápido (microsegundos)
✅ TTL automático (expira cache viejo)
✅ Puede usarse por múltiples servidores
✅ Escalable

¿Listo para implementarlo?
```

## Paso 2: Elegir el Modelo Correcto con Claude Code

Otra estrategia clave es usar el modelo apropiado para cada tarea.

**Tú**:
```
Claude, ¿cuándo debo usar Haiku (barato) vs Sonnet (caro)?
Dame ejemplos específicos.
```

**Claude Code**:
```
¡Excelente pregunta! Elegir el modelo correcto puede ahorrarte 90% de costos.

USA CLAUDE HAIKU (barato) CUANDO:
==================================

1. CLASIFICACIÓN DE TEXTO
   ```javascript
   // Clasificar un email como spam o no spam
   prompt: "¿Este email es spam? Responde solo 'sí' o 'no': [email]"
   Modelo: claude-3-haiku
   ```

2. RESPUESTAS CORTAS
   ```javascript
   // Traducción simple
   prompt: "Traduce al inglés: Hola, ¿cómo estás?"
   Modelo: claude-3-haiku
   ```

3. EXTRACCIÓN DE DATOS
   ```javascript
   // Extraer nombre de un texto
   prompt: "Del siguiente texto, extrae solo el nombre: 'Mi nombre es Juan'"
   Modelo: claude-3-haiku
   ```

4. VALIDACIÓN
   ```javascript
   // Validar formato de email
   prompt: "¿Es este un email válido? test@example.com"
   Modelo: claude-3-haiku
   ```

5. SENTIMIENTO ANALYSIS
   ```javascript
   // Detectar si un review es positivo o negativo
   prompt: "¿Este review es positivo o negativo? 'Me encantó el producto'"
   Modelo: claude-3-haiku
   ```

USA CLAUDE SONNET (caro pero poderoso) CUANDO:
===============================================

1. GENERACIÓN DE CÓDIGO COMPLEJO
   ```javascript
   // Crear una aplicación completa
   prompt: "Crea una API REST completa con autenticación JWT"
   Modelo: claude-3-5-sonnet
   ```

2. RAZONAMIENTO COMPLEJO
   ```javascript
   // Debugging difícil
   prompt: "Aquí hay un bug en mi código de 200 líneas, encuéntralo y explica por qué falla"
   Modelo: claude-3-5-sonnet
   ```

3. CREATIVIDAD
   ```javascript
   // Escritura creativa
   prompt: "Escribe un artículo de blog sobre IA, 1000 palabras"
   Modelo: claude-3-5-sonnet
   ```

4. ANÁLISIS PROFUNDO
   ```javascript
   // Revisar arquitectura
   prompt: "Revisa esta arquitectura de sistema y sugiere mejoras"
   Modelo: claude-3-5-sonnet
   ```

IMPLEMENTACIÓN CON SELECCIÓN AUTOMÁTICA:
=========================================

```javascript
// modelSelector.js

function selectModel(taskType, promptLength) {
  // Tareas simples → Haiku
  const simpleTasks = [
    'classify',
    'translate',
    'extract',
    'validate',
    'sentiment'
  ];

  if (simpleTasks.includes(taskType)) {
    return 'claude-3-haiku-20240307';
  }

  // Prompts cortos (<100 tokens) → Haiku
  if (promptLength < 100) {
    return 'claude-3-haiku-20240307';
  }

  // Tareas complejas → Sonnet
  return 'claude-3-5-sonnet-20241022';
}

// Uso:
async function askClaude(prompt, taskType = 'general') {
  const model = selectModel(taskType, prompt.length);

  console.log(`📊 Usando modelo: ${model}`);

  const message = await anthropic.messages.create({
    model: model,
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  return message.content[0].text;
}
```

EJEMPLO DE AHORRO:
==================

Escenario: Sistema que clasifica 10,000 emails/día

CON SONNET:
- 10,000 llamadas/día
- ~100 tokens por llamada
- Costo: ~$3/día = $90/mes

CON HAIKU:
- 10,000 llamadas/día
- ~100 tokens por llamada
- Costo: ~$0.25/día = $7.50/mes

AHORRO: $82.50/mes (92%)

¿Ves la diferencia? ¡Usar el modelo correcto es CRUCIAL!
```

## Paso 3: Reducir el Contexto Enviado

**Tú**:
```
Claude, a veces necesito que revises un archivo grande. ¿Cómo evito enviar
todo el archivo y pagar por tokens innecesarios?
```

**Claude Code**:
```
¡Muy buena pregunta! Enviar archivos completos es uno de los errores más
caros que la gente comete.

ESTRATEGIA 1: Extraer solo lo relevante
========================================

En lugar de enviar todo el archivo, extrae la parte relevante.

```javascript
// fileProcessor.js

const fs = require('fs');

function extractRelevantLines(filePath, keyword, contextLines = 5) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const relevantSections = [];
  let currentSection = [];

  lines.forEach((line, index) => {
    // Si la línea contiene la keyword
    if (line.includes(keyword)) {
      // Extraer líneas antes y después
      const start = Math.max(0, index - contextLines);
      const end = Math.min(lines.length, index + contextLines + 1);

      currentSection = lines.slice(start, end);
      relevantSections.push({
        lineNumber: index + 1,
        content: currentSection.join('\n')
      });
    }
  });

  return relevantSections;
}

// Uso:
const relevantCode = extractRelevantLines('app.js', 'function login', 5);

// Ahora envía solo esto a Claude en lugar del archivo completo
const prompt = `
Revisa esta función y optimízala:

${relevantCode[0].content}
`;
```

AHORRO REAL:
============

Archivo completo: 1000 líneas = ~3000 tokens = $0.009
Solo sección relevante: 50 líneas = ~150 tokens = $0.0005

AHORRO: 95%

ESTRATEGIA 2: Chunks (pedazos)
===============================

Si DEBES procesar un archivo grande, divídelo en pedazos.

```javascript
// chunker.js

function chunkFile(content, maxChunkSize = 2000) {
  const chunks = [];
  let currentChunk = '';
  const lines = content.split('\n');

  for (const line of lines) {
    if ((currentChunk + line).length > maxChunkSize) {
      chunks.push(currentChunk);
      currentChunk = line + '\n';
    } else {
      currentChunk += line + '\n';
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

// Procesar en paralelo o secuencialmente
async function processLargeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const chunks = chunkFile(content);

  console.log(`📄 Archivo dividido en ${chunks.length} chunks`);

  const results = [];

  for (let i = 0; i < chunks.length; i++) {
    console.log(`Procesando chunk ${i + 1}/${chunks.length}`);

    const result = await askClaude(
      `Revisa este código:\n\n${chunks[i]}`,
      'haiku' // Usar modelo barato para chunks
    );

    results.push(result);
  }

  return results;
}
```

ESTRATEGIA 3: Resumir primero
==============================

Si el archivo es muy grande, pídele a Haiku (barato) que lo resuma primero.

```javascript
async function analyzeLargeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // PASO 1: Resumen con Haiku (barato)
  console.log('Paso 1: Generando resumen...');

  const summary = await askClaude(
    `Resume este código en 200 palabras:\n\n${content}`,
    'haiku'
  );

  // PASO 2: Análisis profundo con Sonnet (solo del resumen)
  console.log('Paso 2: Análisis profundo...');

  const analysis = await askClaude(
    `Basándote en este resumen, dame recomendaciones:\n\n${summary}`,
    'sonnet'
  );

  return { summary, analysis };
}
```

AHORRO:
=======

SIN optimización:
- Enviar archivo completo a Sonnet: 10,000 tokens = $0.03

CON optimización:
- Resumen con Haiku: 5,000 tokens = $0.00125
- Análisis con Sonnet: 500 tokens = $0.0015
- TOTAL: $0.00275

AHORRO: 90%

¿Tiene sentido? La clave es: NO envíes más de lo necesario.
```

## Paso 4: Monitorear Uso y Costos

**Tú**:
```
Claude, ¿cómo puedo monitorear cuánto estoy gastando en tu API?
```

**Claude Code**:
```
¡Excelente pregunta! Monitorear tus gastos es CRÍTICO.

SOLUCIÓN 1: Contador de tokens local
=====================================

```javascript
// tokenCounter.js

class TokenCounter {
  constructor() {
    this.dailyUsage = {};
  }

  // Estimar tokens (aproximado)
  estimateTokens(text) {
    // Regla simple: ~4 caracteres = 1 token
    return Math.ceil(text.length / 4);
  }

  // Registrar uso
  record(prompt, response, model) {
    const today = new Date().toISOString().split('T')[0];

    if (!this.dailyUsage[today]) {
      this.dailyUsage[today] = {
        totalTokens: 0,
        totalCalls: 0,
        byModel: {}
      };
    }

    const promptTokens = this.estimateTokens(prompt);
    const responseTokens = this.estimateTokens(response);
    const totalTokens = promptTokens + responseTokens;

    // Acumular
    this.dailyUsage[today].totalTokens += totalTokens;
    this.dailyUsage[today].totalCalls++;

    if (!this.dailyUsage[today].byModel[model]) {
      this.dailyUsage[today].byModel[model] = {
        tokens: 0,
        calls: 0
      };
    }

    this.dailyUsage[today].byModel[model].tokens += totalTokens;
    this.dailyUsage[today].byModel[model].calls++;
  }

  // Calcular costo estimado
  calculateCost(model, tokens) {
    const prices = {
      'claude-3-5-sonnet-20241022': {
        input: 3 / 1000000,
        output: 15 / 1000000
      },
      'claude-3-haiku-20240307': {
        input: 0.25 / 1000000,
        output: 1.25 / 1000000
      }
    };

    const price = prices[model] || prices['claude-3-5-sonnet-20241022'];

    // Asumimos 50/50 input/output
    return (tokens * (price.input + price.output) / 2);
  }

  // Obtener reporte
  getReport(date = new Date().toISOString().split('T')[0]) {
    const usage = this.dailyUsage[date];

    if (!usage) {
      return { message: 'No hay datos para esta fecha' };
    }

    let totalCost = 0;
    const modelBreakdown = {};

    for (const [model, data] of Object.entries(usage.byModel)) {
      const cost = this.calculateCost(model, data.tokens);
      totalCost += cost;

      modelBreakdown[model] = {
        calls: data.calls,
        tokens: data.tokens,
        cost: `$${cost.toFixed(4)}`
      };
    }

    return {
      date: date,
      totalCalls: usage.totalCalls,
      totalTokens: usage.totalTokens,
      estimatedCost: `$${totalCost.toFixed(4)}`,
      projectedMonthlyCost: `$${(totalCost * 30).toFixed(2)}`,
      byModel: modelBreakdown
    };
  }
}

module.exports = new TokenCounter();
```

INTEGRAR CON TU SERVICIO:
==========================

```javascript
// claudeService.js

const Anthropic = require('@anthropic-ai/sdk');
const tokenCounter = require('./tokenCounter');

async function askClaude(prompt, model = 'claude-3-5-sonnet-20241022') {
  const message = await anthropic.messages.create({
    model: model,
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const response = message.content[0].text;

  // Registrar uso
  tokenCounter.record(prompt, response, model);

  return response;
}
```

ENDPOINT PARA VER COSTOS:
=========================

```javascript
// app.js

app.get('/api/usage-report', (req, res) => {
  const date = req.query.date || new Date().toISOString().split('T')[0];
  const report = tokenCounter.getReport(date);

  res.json(report);
});
```

EJEMPLO DE REPORTE:
===================

```json
{
  "date": "2024-01-15",
  "totalCalls": 245,
  "totalTokens": 125000,
  "estimatedCost": "$2.1250",
  "projectedMonthlyCost": "$63.75",
  "byModel": {
    "claude-3-5-sonnet-20241022": {
      "calls": 45,
      "tokens": 75000,
      "cost": "$1.6875"
    },
    "claude-3-haiku-20240307": {
      "calls": 200,
      "tokens": 50000,
      "cost": "$0.4375"
    }
  }
}
```

ALERTAS DE COSTO:
=================

```javascript
// costAlerts.js

function checkCostAlert(dailyCost, threshold = 5) {
  if (dailyCost > threshold) {
    console.warn(`⚠️  ALERTA: Costo diario ($${dailyCost}) excede el límite ($${threshold})`);

    // Enviar email o notificación
    sendAlert(`Gastos altos detectados: $${dailyCost}`);
  }
}

// Ejecutar cada hora
setInterval(() => {
  const report = tokenCounter.getReport();
  const cost = parseFloat(report.estimatedCost.replace('$', ''));

  checkCostAlert(cost);
}, 60 * 60 * 1000); // Cada hora
```

¿Te ayuda esto a controlar tus gastos?
```

## Problemas Comunes y Soluciones

### Error 1: El Caché no está funcionando

❌ **Problema**: Hago la misma pregunta dos veces pero me cobra ambas veces

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, implementé el caché pero parece que no funciona. ¿Qué puede estar mal?
```

**Claude Code**:
```
Vamos a debuggear el caché paso a paso.

CAUSA 1: Espacios o capitalización diferente
==============================================

El problema más común:

"Hola mundo" ≠ "hola mundo" ≠ "Hola mundo "

Cada una genera un hash diferente, por lo que no se cachean.

SOLUCIÓN: Normalizar el prompt

```javascript
function normalizePrompt(prompt) {
  return prompt
    .toLowerCase()           // Todo a minúsculas
    .trim()                  // Eliminar espacios al inicio/final
    .replace(/\s+/g, ' ');   // Múltiples espacios → un espacio
}

// En tu caché:
generateKey(prompt, model) {
  const normalized = normalizePrompt(prompt);
  return crypto.createHash('md5').update(`${model}:${normalized}`).digest('hex');
}
```

CAUSA 2: El caché expira muy rápido
====================================

Si tu TTL (Time To Live) es muy bajo:

```javascript
// ❌ Expira en 1 minuto
await cache.set(prompt, model, response, 60);

// ✅ Expira en 24 horas
await cache.set(prompt, model, response, 86400);
```

CAUSA 3: Redis no está conectado
=================================

Verifica la conexión:

```javascript
const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => {
  console.log('✅ Redis conectado');
});

client.on('error', (err) => {
  console.error('❌ Redis error:', err);
});
```

DEBUGGING:
==========

Agrega logs para ver qué está pasando:

```javascript
async function get(prompt, model) {
  const key = this.generateKey(prompt, model);

  console.log(`🔍 Buscando en caché: ${key.substring(0, 10)}...`);

  const cached = await this.client.get(key);

  if (cached) {
    console.log(`✅ ENCONTRADO en caché`);
    return JSON.parse(cached);
  }

  console.log(`❌ NO encontrado en caché`);
  return null;
}
```

¿Ayuda esto?
```

### Error 2: Los costos siguen siendo altos

❌ **Problema**: Implementé todas las optimizaciones pero sigo gastando mucho

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, ya implementé caché, estoy usando Haiku cuando puedo, pero mis
costos siguen altos. ¿Qué más puedo hacer?
```

**Claude Code**:
```
Vamos a hacer una auditoría de costos.

PASO 1: Identificar las llamadas más caras
===========================================

Agrega logging para rastrear cada llamada:

```javascript
async function askClaude(prompt, model) {
  const promptTokens = estimateTokens(prompt);

  console.log(`
    📊 LLAMADA A API:
    - Modelo: ${model}
    - Prompt tokens: ~${promptTokens}
    - Costo estimado: ~$${calculateCost(model, promptTokens)}
  `);

  // ... resto del código
}
```

Revisa los logs y encuentra:
- ¿Qué llamadas usan más tokens?
- ¿Hay llamadas que se repiten mucho?

PASO 2: Implementar límites de tokens
======================================

No dejes que Claude genere respuestas infinitas:

```javascript
const message = await anthropic.messages.create({
  model: model,
  max_tokens: 500, // ← LIMITAR respuesta
  messages: [{ role: 'user', content: prompt }],
});
```

Ajusta max_tokens según la tarea:
- Clasificación: 10-50 tokens
- Respuesta corta: 100-200 tokens
- Código simple: 500-1000 tokens
- Análisis completo: 2000-4000 tokens

PASO 3: Batch processing
=========================

En lugar de llamar a Claude 100 veces, haz 1 llamada:

❌ MAL (100 llamadas):
```javascript
for (const email of emails) {
  const result = await askClaude(`¿Es spam? ${email}`);
}
```

✅ BIEN (1 llamada):
```javascript
const batch = emails.join('\n---\n');
const result = await askClaude(`
  Clasifica cada email como spam o no spam:

  ${batch}

  Responde en formato: email1: spam, email2: no spam, ...
`);
```

AHORRO: 95% en overhead de llamadas

PASO 4: Usar modelos más baratos estratégicamente
==================================================

```javascript
// Sistema de "try cheap first"
async function smartAsk(prompt) {
  // 1. Intentar con Haiku (barato)
  const quickAnswer = await askClaude(prompt, 'haiku');

  // 2. Si la respuesta es muy corta o insatisfactoria, usar Sonnet
  if (quickAnswer.length < 50 || quickAnswer.includes('no estoy seguro')) {
    console.log('⬆️  Escalando a Sonnet para mejor respuesta');
    return await askClaude(prompt, 'sonnet');
  }

  return quickAnswer;
}
```

PASO 5: Establecer presupuestos
================================

```javascript
class BudgetManager {
  constructor(dailyLimit = 5) {
    this.dailyLimit = dailyLimit; // $5/día
    this.spent = 0;
  }

  async canMakeCall(estimatedCost) {
    if (this.spent + estimatedCost > this.dailyLimit) {
      throw new Error(`Presupuesto diario excedido ($${this.dailyLimit})`);
    }

    return true;
  }

  recordSpending(cost) {
    this.spent += cost;
  }
}
```

¿Esto te ayuda a reducir costos?
```

## 🎮 Ejercicios Gamificados

### Ejercicio 1: Implementar Caché Básico (100 XP)

**Objetivo**: Crear un sistema de caché en memoria.

**Instrucciones**:
1. Implementa el sistema de caché que Claude Code te mostró
2. Crea 3 endpoints que usen caché
3. Haz 10 llamadas (5 diferentes, repetidas)
4. Muestra las estadísticas de hit rate

**Entregable**: Screenshot de las estadísticas mostrando >50% hit rate.

**Bonus (50 XP)**: Implementar TTL (expiración) customizable.

### Ejercicio 2: Optimización de Modelo (150 XP)

**Objetivo**: Reducir costos usando el modelo apropiado.

**Instrucciones**:
1. Crea una app con 5 tareas diferentes
2. Implementa selector automático de modelos
3. Compara costos: todo con Sonnet vs. optimizado
4. Calcula el ahorro porcentual

**Entregable**: Reporte comparativo de costos.

**Bonus (75 XP)**: Sistema que aprende qué modelo usar según resultados.

### Ejercicio 3: Token Counter Dashboard (200 XP)

**Objetivo**: Monitorear uso y costos en tiempo real.

**Instrucciones**:
1. Implementa el TokenCounter
2. Crea dashboard HTML que muestre:
   - Uso de hoy
   - Proyección mensual
   - Desglose por modelo
   - Gráfico de tendencia
3. Auto-refresh cada 10 segundos

**Entregable**: Video mostrando dashboard funcionando.

**Bonus (100 XP)**: Alertas por Slack cuando se excede presupuesto.

### Ejercicio 4: Cache con Redis (175 XP)

**Objetivo**: Implementar caché persistente con Redis.

**Instrucciones**:
1. Instala y configura Redis
2. Implementa RedisCache
3. Compara rendimiento: caché en memoria vs Redis
4. Documenta diferencias

**Entregable**: Benchmarks de ambos sistemas.

**Bonus (85 XP)**: Implementar caché distribuido (multi-servidor).

### Ejercicio 5: Sistema Completo de Optimización (300 XP)

**Objetivo**: Aplicación con todas las optimizaciones.

**Requisitos**:
- Caché con Redis
- Selector automático de modelos
- Chunking para archivos grandes
- Token counter con alertas
- Dashboard de costos
- Presupuesto diario configurable
- Batch processing

**Entregable**: Repositorio completo + documentación de ahorro logrado.

**Bonus (150 XP)**: Demostrar ahorro >80% en un caso de uso real.

## Resumen de Esta Lección

¡Felicidades! Completaste la lección de optimización de costos. Esto es lo que aprendiste:

✅ **Qué son los tokens** y cómo impactan en los costos de usar Claude Code

✅ **Implementar sistemas de caché** tanto en memoria como con Redis para evitar pagar dos veces por lo mismo

✅ **Elegir el modelo correcto** (Haiku vs Sonnet) según el tipo de tarea, ahorrando hasta 90%

✅ **Reducir el contexto** enviado a Claude para usar menos tokens

✅ **Chunking de archivos grandes** para procesarlos eficientemente

✅ **Monitorear uso y costos** con sistemas de tracking y alertas

✅ **Establecer presupuestos** para no gastar más de lo planeado

✅ **Batch processing** para agrupar múltiples tareas en una sola llamada

✅ **Usar Claude Code como asesor** para optimizar cada aspecto de tus gastos

Lo más importante: **Puedes usar Claude Code de forma profesional sin quebrar el banco**. Con las estrategias correctas, es perfectamente viable usar IA en producción con costos controlados.

Un desarrollador que implementa estas optimizaciones puede ahorrar fácilmente $500-$1000 al mes en costos de API. Eso es mucho dinero que puedes usar para escalar tu proyecto o invertir en otras áreas.

En la próxima lección, vamos a aprender sobre **Arquitectura de Proyectos Complejos con Claude Code**: cómo organizar aplicaciones grandes, patrones de diseño, y cómo pedirle a Claude Code que te ayude a estructurar proyectos de nivel empresarial. ¡Nos vemos ahí!
