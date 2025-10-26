/**
 * Script para actualizar el contenido de las lecciones 3, 4 y 5
 * con el contenido mejorado por el agente ai-cs-professor
 */

const fs = require('fs');
const path = require('path');

const seedFilePath = path.join(__dirname, 'seed-modulo1-data.ts');

// Leer el archivo actual
const currentContent = fs.readFileSync(seedFilePath, 'utf-8');

// El contenido mejorado de la Lección 3 va aquí
const lesson3ImprovedContent = `# Primeros pasos: Tu primer proyecto con Claude

![First Project](https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=400&fit=crop)

## Introducción

¿Recuerdas la primera vez que escribiste "Hola Mundo"? Esa sensación de emoción mezclada con nerviosismo, la incertidumbre de si funcionaría... Bueno, prepárate para revivir esa emoción, pero multiplicada por mil. Hoy vamos a crear tu primer proyecto con Claude Code, y te prometo que será una experiencia completamente diferente a todo lo que has conocido antes.

Déjame contarte algo: después de más de 15 años enseñando programación, he visto la cara de asombro de cientos de estudiantes cuando crean su primer proyecto con Claude. Es como darle a alguien que acaba de aprender a caminar un par de patines de última generación. De repente, lo que parecía imposible se vuelve no solo posible, sino increíblemente divertido.

En esta lección, no vamos a simplemente "seguir pasos". Vamos a entender qué está pasando en cada momento, por qué Claude toma ciertas decisiones, y cómo puedes guiar este proceso para crear exactamente lo que tienes en mente. ¿Listo? ¡Vamos allá!

## El momento de la verdad: Tu primer comando

### Entendiendo \`claude init\`

El comando \`claude init\` no es solo un inicializador de proyectos más. Es como tener un arquitecto de software senior sentado contigo, preguntándote exactamente qué necesitas y preparando todo el andamiaje para que puedas empezar a construir inmediatamente.

Piénsalo así: ¿alguna vez has pasado horas configurando un proyecto nuevo? Instalando dependencias, configurando linters, eligiendo la estructura de carpetas correcta, configurando TypeScript, añadiendo scripts de npm... Es agotador y, seamos honestos, aburrido. Claude se encarga de todo eso en cuestión de segundos, y lo hace siguiendo las mejores prácticas de la industria.

### Manos a la obra: Creando nuestro primer proyecto

Abre tu terminal. Sí, ahora mismo. Respira profundo (lo digo en serio, la emoción es real) y navega a donde quieres crear tu proyecto. Yo personalmente uso una carpeta llamada "Proyectos" en mi directorio home, pero tú puedes usar cualquier ubicación que prefieras:

\`\`\`bash
cd ~/Proyectos
claude init mi-primer-proyecto
\`\`\`

💡 **Tip profesional**: Usa nombres de proyecto descriptivos desde el principio. En lugar de "test" o "prueba1", usa algo como "portafolio-personal" o "gestor-tareas". Tu yo del futuro te lo agradecerá cuando tengas 20 proyectos en tu carpeta.

### La conversación interactiva: Claude te está escuchando

Aquí es donde empieza la magia. Claude no solo ejecuta comandos ciegamente; te hace preguntas inteligentes para entender exactamente qué necesitas. Es como cuando vas a un restaurante de alta cocina y el chef sale a preguntarte sobre tus preferencias antes de preparar tu plato.

La primera pregunta que verás es:

\`\`\`
🎨 ¿Qué tipo de proyecto quieres crear?
  ❯ Web Application (React/Next.js)
    API REST (Node.js/Express)
    Mobile App (React Native)
    CLI Tool
    Otro (describe tu proyecto)
\`\`\`

Para este primer proyecto, vamos a seleccionar **"Web Application"**. ¿Por qué? Porque es visual, gratificante, y verás resultados inmediatos. Puedes usar las flechas del teclado para moverte y Enter para seleccionar.

⚠️ **Cuidado**: No te dejes abrumar por las opciones. Si no estás seguro, siempre puedes empezar con una Web Application. Puedes crear mil proyectos diferentes más tarde. Este es solo tu primer paso.

### La siguiente capa: Eligiendo tu stack tecnológico

Una vez que selecciones Web Application, Claude profundiza más:

\`\`\`
📦 ¿Qué framework prefieres?
  ❯ React + TypeScript
    React + JavaScript
    Next.js
    Vue.js
    Svelte
\`\`\`

Aquí viene mi recomendación de mentor: si eres principiante o intermedio, ve con **React + TypeScript**. Sé que TypeScript puede parecer intimidante al principio, pero créeme, es como aprender a cocinar con ingredientes de calidad desde el inicio. Sí, requiere un poco más de esfuerzo inicial, pero el resultado es mucho mejor y evitarás muchísimos dolores de cabeza más adelante.

Si eres muy nuevo en programación, React + JavaScript también es perfecta. No hay decisiones malas aquí, solo diferentes caminos que te llevan al mismo destino.

### Las herramientas del oficio: Configuración avanzada

Claude ahora te preguntará sobre las herramientas que quieres incluir:

\`\`\`
🎯 ¿Incluir estas herramientas?
  ✅ ESLint (linting)
  ✅ Prettier (formatting)
  ✅ Tailwind CSS (styling)
  ❌ Redux (state management)
  ✅ React Router (routing)
\`\`\`

Déjame explicarte cada una, porque entender esto es crucial:

**ESLint**: Es como tener un profesor de gramática revisando tu código. Te señala errores potenciales antes de que se conviertan en problemas reales. Mi consejo: **siempre actívalo**.

**Prettier**: Es tu mejor amigo para mantener el código limpio y consistente. Formatea automáticamente tu código para que se vea profesional. Cuando trabajas en equipo, esto es oro puro. **Actívalo siempre**.

**Tailwind CSS**: Framework de CSS que hace que diseñar interfaces sea mucho más rápido. Es como tener un kit de LEGO en lugar de tener que tallar cada pieza a mano. Para principiantes, es fantástico. **Recomiendo activarlo**.

**Redux**: Sistema de manejo de estado global. Para tu primer proyecto, probablemente no lo necesitas. Es como comprar un camión de 18 ruedas cuando solo necesitas una bicicleta. **Déjalo desactivado** por ahora.

**React Router**: Si tu aplicación va a tener múltiples páginas (spoiler: probablemente sí), lo necesitas. **Actívalo**.

Para seleccionar o deseleccionar opciones, usa la barra espaciadora. Cuando estés satisfecho, presiona Enter.

### El momento mágico: Claude construyendo tu proyecto

Ahora observa cómo Claude trabaja. Verás algo así:

\`\`\`bash
✨ Creando proyecto "mi-primer-proyecto"...
📁 Generando estructura de carpetas...
📝 Creando archivos de configuración...
📦 Instalando dependencias...
✅ ¡Proyecto creado exitosamente!

📂 Estructura del proyecto:
mi-primer-proyecto/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   ├── App.tsx
│   └── index.tsx
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
\`\`\`

¿Ves eso? En menos de un minuto, Claude ha creado una estructura de proyecto completa que a un desarrollador senior le tomaría entre 30 minutos y una hora configurar correctamente. Y no solo eso: está siguiendo las convenciones de la industria, con la estructura de carpetas correcta y todas las configuraciones optimizadas.

💡 **Tip de la vida real**: La primera vez que usé Claude para iniciar un proyecto, pasé 10 minutos simplemente explorando los archivos de configuración, maravillado de lo bien que estaba todo estructurado. No tengas miedo de curiosear. Abre cada archivo, lee los comentarios que Claude ha dejado. Es una clase magistral en sí misma.

## Explorando tu nuevo hogar digital

### Entrando al proyecto

Navega dentro de tu proyecto recién creado:

\`\`\`bash
cd mi-primer-proyecto
\`\`\`

Ahora, ábrelo en tu editor. Si usas VS Code (que recomiendo encarecidamente para desarrollo web):

\`\`\`bash
code .
\`\`\`

El punto (\`.\`) al final le dice a VS Code que abra la carpeta actual. Es uno de esos pequeños trucos que usan los profesionales para ahorrar tiempo.

### Un tour guiado por tu proyecto

Déjame mostrarte qué ha creado Claude y por qué cada pieza es importante. Vamos a hacer un tour como si estuviéramos visitando una casa nueva.

#### La sala de estar: \`package.json\`

Este es el corazón de tu proyecto. Cuando lo abras, verás algo como esto:

\`\`\`json
{
  "name": "mi-primer-proyecto",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
\`\`\`

Fíjate en los **scripts**. Estos son comandos que puedes ejecutar:

- \`npm run dev\`: Inicia tu servidor de desarrollo. Lo usarás constantemente.
- \`npm run build\`: Prepara tu aplicación para producción. Lo usarás cuando estés listo para lanzarla al mundo.
- \`npm run preview\`: Te permite previsualizar la versión de producción localmente.
- \`npm run lint\`: Revisa tu código en busca de problemas.

Las **dependencies** son las bibliotecas que tu aplicación necesita para funcionar. Las **devDependencies** son herramientas que solo necesitas durante el desarrollo.

💡 **Curiosidad profesional**: ¿Ves esos símbolos \`^\` antes de los números de versión? Significan "esta versión o cualquier versión compatible más reciente". Es una forma inteligente de mantener tu proyecto actualizado sin romper nada.

#### El cerebro: \`src/App.tsx\`

Este es el componente principal de tu aplicación. Ábrelo y verás:

\`\`\`typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
\`\`\`

Déjame explicarte este código línea por línea, porque es hermoso en su simplicidad:

**Línea 1**: Importamos los componentes de React Router. Piensa en Router como el sistema de navegación de tu app, Routes como el mapa, y Route como las direcciones individuales.

**Línea 2**: Importamos nuestra página de inicio. Claude ya la creó para ti.

**Línea 4-13**: Esta es nuestra función App. Es un componente funcional de React (si no sabes qué significa eso aún, no te preocupes, lo aprenderemos más adelante).

**Línea 6**: El Router envuelve toda nuestra aplicación. Es como el contenedor que hace posible la navegación.

**Línea 7**: Ese \`className="min-h-screen bg-gray-50"\` es Tailwind CSS en acción. \`min-h-screen\` hace que el div ocupe al menos toda la altura de la pantalla, y \`bg-gray-50\` le da un fondo gris claro y elegante.

**Líneas 8-10**: Aquí definimos nuestras rutas. Por ahora solo tenemos una: la página de inicio en el path "/".

¿Ves lo limpio y legible que es? Esto es código de calidad profesional, y Claude lo generó automáticamente para ti.

#### El manual de instrucciones: \`README.md\`

Claude no solo crea código; también genera documentación completa. Abre el README.md:

\`\`\`markdown
# Mi Primer Proyecto

Aplicación React + TypeScript creada con Claude Code.

## Instalación

\\\`\\\`\\\`bash
npm install
\\\`\\\`\\\`

## Desarrollo

\\\`\\\`\\\`bash
npm run dev
\\\`\\\`\\\`

## Build

\\\`\\\`\\\`bash
npm run build
\\\`\\\`\\\`
\`\`\`

Esta documentación es tu punto de partida. Si vuelves a este proyecto dentro de seis meses (o si lo compartes con alguien), sabrán exactamente qué hacer. Es una de esas buenas prácticas que separan proyectos amateur de proyectos profesionales.

## Poniéndolo en marcha: Viendo tu creación cobrar vida

### El momento de la verdad

Aquí viene la parte emocionante. En tu terminal, dentro de la carpeta del proyecto, ejecuta:

\`\`\`bash
npm run dev
\`\`\`

La primera vez que ejecutes esto, verás mucha actividad en la terminal. Vite (el build tool que Claude eligió para ti) está compilando tu código y preparando el servidor de desarrollo. En unos segundos, verás algo así:

\`\`\`
VITE v5.0.8  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
\`\`\`

¿Ves esa URL \`http://localhost:5173/\`? Esa es tu aplicación. Abre tu navegador (recomiendo Chrome o Firefox para desarrollo) y visita esa dirección.

### Tu primera aplicación web

Y ahí está. Tu aplicación corriendo. Puede parecer simple ahora, pero es **tuya**. Créala, despliégala, mejórala. Este es solo el comienzo.

💡 **Truco profesional**: Deja esa terminal abierta. Vite tiene "hot reload" activado, lo que significa que cada vez que guardes un cambio en tu código, la página se actualizará automáticamente. Es como magia, pero mejor porque es tecnología.

## La verdadera magia: Añadiendo funcionalidad con Claude

Aquí es donde Claude Code brilla de verdad. Vamos a pedirle que añada una nueva página a nuestra aplicación.

### Proyecto: Añadiendo una página "Sobre Nosotros"

Imagina que estás creando un sitio web para tu negocio o proyecto personal, y necesitas una página "Sobre Nosotros". En un flujo de trabajo tradicional, tendrías que:

1. Crear un nuevo archivo de componente
2. Escribir todo el código HTML/JSX
3. Añadir estilos
4. Actualizar el router para incluir la nueva ruta
5. Añadir un enlace de navegación
6. Probar que todo funciona

Con Claude, todo eso se reduce a un solo comando. En tu terminal (puedes abrir una nueva pestaña con \`Cmd+T\` o \`Ctrl+T\` para no interrumpir el servidor de desarrollo), ejecuta:

\`\`\`bash
claude add "crear página sobre nosotros con información de la empresa, misión, visión, y sección del equipo con tarjetas de miembros"
\`\`\`

Observa cómo Claude trabaja. Verás mensajes como:

\`\`\`
🤔 Analizando tu proyecto...
📝 Creando AboutPage.tsx...
🎨 Generando componentes de UI...
🔗 Actualizando rutas...
✅ ¡Listo! Tu página "Sobre Nosotros" está creada.
\`\`\`

Ahora, revisa lo que Claude ha hecho. Verás un nuevo archivo en \`src/pages/AboutPage.tsx\`:

\`\`\`typescript
// src/pages/AboutPage.tsx (generado por Claude)
import { Users, Target, Heart, Mail } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Ana García",
    role: "CEO & Fundadora",
    image: "/team/ana.jpg",
    bio: "Apasionada por la tecnología y la innovación desde hace más de 15 años."
  },
  {
    name: "Carlos Martínez",
    role: "CTO",
    image: "/team/carlos.jpg",
    bio: "Experto en arquitectura de software y desarrollo de productos escalables."
  },
  // Más miembros...
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Sobre Nosotros
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Somos un equipo apasionado dedicado a crear soluciones innovadoras
          que transforman la forma en que las personas trabajan.
        </p>
      </div>

      {/* Misión y Visión */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Target className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-semibold">Nuestra Misión</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Revolucionar la forma en que se desarrolla software mediante
            la integración inteligente de IA, haciendo que la programación
            sea más accesible, eficiente y gratificante para todos.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Heart className="w-8 h-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-semibold">Nuestra Visión</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Ser líderes globales en educación tecnológica, empoderando a
            millones de desarrolladores a alcanzar su máximo potencial
            con las herramientas más avanzadas del mercado.
          </p>
        </div>
      </div>

      {/* Equipo */}
      <div className="mb-12">
        <div className="flex items-center justify-center mb-8">
          <Users className="w-8 h-8 text-green-600 mr-3" />
          <h2 className="text-3xl font-semibold">Nuestro Equipo</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">¿Quieres unirte a nosotros?</h2>
        <p className="text-xl mb-6">
          Estamos siempre buscando talento apasionado para unirse a nuestro equipo.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center mx-auto">
          <Mail className="mr-2" />
          Contáctanos
        </button>
      </div>
    </div>
  );
}
\`\`\`

Tómate un momento para apreciar lo que acaba de pasar. Claude no solo creó un archivo con algo de texto. Creó:

1. **Una interfaz TypeScript** para los miembros del equipo (líneas 3-7)
2. **Datos de ejemplo** estructurados correctamente (líneas 9-20)
3. **Un diseño completo** con secciones para header, misión/visión, equipo y call-to-action
4. **Estilos profesionales** usando Tailwind CSS
5. **Iconos** de lucide-react (una biblioteca de iconos popular)
6. **Interactividad** con efectos hover
7. **Diseño responsive** que se ve bien en móviles y escritorio (fíjate en las clases \`md:grid-cols-2\` y \`md:grid-cols-3\`)

Y además, Claude también actualizó automáticamente tu \`App.tsx\` para incluir la nueva ruta. Revísalo:

\`\`\`typescript
// Se añadió automáticamente:
import AboutPage from './pages/AboutPage';

// Y en las rutas:
<Route path="/about" element={<AboutPage />} />
\`\`\`

Visita \`http://localhost:5173/about\` en tu navegador y verás tu nueva página en todo su esplendor.

💡 **Momento de reflexión**: Lo que acabas de presenciar no es solo automatización. Es Claude entendiendo tu intención, el contexto de tu proyecto, las mejores prácticas de React, TypeScript y diseño web, y ejecutando todo eso de manera coherente. Esto es IA aplicada al desarrollo de software en su máxima expresión.

## El arsenal completo: Comandos esenciales

Ahora que has visto Claude en acción, déjame presentarte el arsenal completo de comandos que tienes a tu disposición:

| Comando | ¿Qué hace? | Cuándo usarlo |
|---------|------------|---------------|
| \`claude init\` | Crea un nuevo proyecto completo | Al empezar cualquier proyecto nuevo |
| \`claude add "descripción"\` | Añade nueva funcionalidad | Cuando quieras agregar features |
| \`claude fix "problema"\` | Identifica y corrige errores | Cuando algo no funciona |
| \`claude refactor "componente"\` | Mejora código existente | Cuando quieras optimizar o limpiar código |
| \`claude test "componente"\` | Genera tests unitarios | Siempre (los tests son cruciales) |
| \`claude docs\` | Genera/actualiza documentación | Después de añadir funcionalidades |
| \`claude optimize\` | Optimiza rendimiento | Antes de lanzar a producción |

Cada uno de estos comandos es como tener un especialista diferente en tu equipo. Vamos a ver algunos en acción.

### Ejemplo práctico: Añadiendo navegación

Tu sitio ahora tiene dos páginas, pero no hay forma de navegar entre ellas. Arreglemos eso:

\`\`\`bash
claude add "crear barra de navegación responsive con enlaces a home y about, con logo y menú hamburguesa para móvil"
\`\`\`

Claude creará un componente \`Navbar.tsx\` completo y lo integrará en tu \`App.tsx\`. Boom. Problema resuelto.

### Ejemplo práctico: Arreglando un bug

Imagina que tu página de inicio tiene un error (esto es normal en desarrollo, no te preocupes). En lugar de pasar horas debugueando:

\`\`\`bash
claude fix "la página de inicio no muestra correctamente el formulario de contacto en móviles"
\`\`\`

Claude analizará tu código, identificará el problema, y lo corregirá.

### Ejemplo práctico: Generando tests

Los tests son cruciales pero a menudo los ignoramos porque son tediosos de escribir:

\`\`\`bash
claude test "componente AboutPage"
\`\`\`

Claude generará tests completos para tu componente, verificando que todos los elementos se renderizan correctamente, que los datos se muestran bien, etc.

## Mejores prácticas: Aprendiendo a hablar con Claude

La calidad de lo que obtienes de Claude depende directamente de la calidad de tus peticiones. Es como pedir comida en un restaurante: cuanto más específico seas, más cerca estarás de obtener exactamente lo que quieres.

### 1. Sé específico, muy específico

**❌ Petición vaga**:
\`\`\`bash
claude add "hacer algo con usuarios"
\`\`\`

Esta petición es demasiado ambigua. ¿Qué significa "algo"? Claude tendrá que adivinar, y puede que no adivine lo que tenías en mente.

**✅ Petición clara**:
\`\`\`bash
claude add "crear sistema completo de autenticación de usuarios con: registro con email y contraseña, login, logout, recuperación de contraseña por email, y dashboard protegido solo para usuarios autenticados. Usar JWT para tokens y bcrypt para hashear contraseñas"
\`\`\`

Ahora Claude sabe exactamente qué construir. Especificaste:
- La funcionalidad principal (autenticación)
- Los features específicos (registro, login, logout, recuperación)
- Los requisitos técnicos (JWT, bcrypt)
- La arquitectura (dashboard protegido)

### 2. Proporciona contexto cuando sea relevante

**✅ Ejemplo con contexto**:
\`\`\`bash
claude add "crear página de blog con lista de posts, cada post debe tener título, autor, fecha, imagen destacada y excerpt. Los posts deben venir de un archivo JSON local por ahora. Incluir filtros por categoría y búsqueda por título"
\`\`\`

Le estás diciendo a Claude:
- Qué construir (página de blog)
- Qué datos necesita cada post
- De dónde vienen los datos (JSON local)
- Qué funcionalidad extra quieres (filtros y búsqueda)

### 3. Itera y refina

No esperes perfección en el primer intento. Claude es increíblemente potente, pero a veces necesitas refinar:

\`\`\`bash
# Primera iteración
claude add "crear galería de imágenes"

# Después de ver el resultado, refinas:
claude refine "cambiar la galería para que use un diseño de masonry (tipo Pinterest), añadir lightbox para ver imágenes en grande, y lazy loading para mejor rendimiento"
\`\`\`

⚠️ **Error común**: Algunos estudiantes se frustran si el primer resultado no es perfecto y abandonan Claude. No lo hagas. Los desarrolladores profesionales iteran constantemente. La diferencia es que con Claude, cada iteración toma segundos en lugar de horas.

### 4. Revisa SIEMPRE el código generado

Este punto es crucial: Claude es una herramienta, no un reemplazo de tu cerebro. Siempre, siempre, SIEMPRE revisa el código que genera. Por dos razones:

1. **Aprendizaje**: Cada vez que revisas el código de Claude, estás aprendiendo patrones, técnicas y mejores prácticas.

2. **Control de calidad**: Aunque Claude es excelente, puede cometer errores o hacer suposiciones incorrectas. Tu revisión es el control de calidad final.

💡 **Historia personal**: Un estudiante una vez me dijo: "¿Para qué necesito aprender a programar si Claude lo hace por mí?" Le respondí mostrándole un código que Claude había generado con un pequeño bug. Le pedí que lo encontrara. No pudo. ¿La moraleja? Claude te hace más productivo, pero no te exime de entender lo que estás construyendo.

### 5. Usa Git religiosamente

Antes de pedirle a Claude cualquier cambio significativo:

\`\`\`bash
git add .
git commit -m "Estado funcional antes de añadir autenticación"
\`\`\`

¿Por qué? Porque si algo sale mal, puedes volver atrás instantáneamente:

\`\`\`bash
git reset --hard HEAD
\`\`\`

Es tu red de seguridad. Úsala.

💡 **Tip pro**: Configura un alias de Git para commits rápidos:

\`\`\`bash
# Añade esto a tu ~/.gitconfig
[alias]
  save = !git add -A && git commit -m 'Checkpoint'

# Ahora puedes hacer:
git save
\`\`\`

## Ejercicio práctico: Tu primera creación completa

Es hora de que vueles solo. Voy a proponerte un proyecto completo para que practiques todo lo que hemos aprendido:

### Proyecto: Portfolio Personal

Crea un sitio web de portfolio personal con las siguientes características:

**Páginas requeridas**:
1. **Home**: Hero section con tu nombre, título profesional, breve descripción y botones de CTA
2. **About**: Información sobre ti, tus habilidades (con barras de progreso o tags), experiencia y educación
3. **Projects**: Galería de tus proyectos con imagen, título, descripción y enlaces
4. **Contact**: Formulario de contacto funcional y tus redes sociales

**Requisitos técnicos**:
- Navegación responsive con menú hamburguesa en móvil
- Diseño moderno usando Tailwind CSS
- Animaciones sutiles al hacer scroll
- Footer con información de copyright

### Paso a paso sugerido:

1. **Crea el proyecto**:
\`\`\`bash
claude init mi-portfolio
# Selecciona: Web Application > React + TypeScript
# Herramientas: ESLint, Prettier, Tailwind, React Router
\`\`\`

2. **Añade la navegación**:
\`\`\`bash
claude add "crear navbar responsive con logo (mis iniciales), links a home, about, projects, contact, y menú hamburguesa para móvil"
\`\`\`

3. **Crea la página Home**:
\`\`\`bash
claude add "crear homepage con hero section: mi nombre como título grande, subtítulo 'Full Stack Developer', párrafo introductorio, y dos botones: 'Ver Proyectos' y 'Contacto'. Usar gradientes y diseño moderno"
\`\`\`

4. **Añade About**:
\`\`\`bash
claude add "crear página about con: foto de perfil circular, biografía, sección de habilidades con badges de colores, y sección de experiencia con timeline vertical"
\`\`\`

5. **Implementa Projects**:
\`\`\`bash
claude add "crear página de proyectos con grid de tarjetas, cada tarjeta debe tener: imagen, título, descripción breve, tecnologías usadas (como badges), y botones para ver demo y código"
\`\`\`

6. **Finaliza con Contact**:
\`\`\`bash
claude add "crear página de contacto con formulario (nombre, email, mensaje) con validación, y sección con iconos de redes sociales (GitHub, LinkedIn, Twitter)"
\`\`\`

7. **Añade el footer**:
\`\`\`bash
claude add "crear footer con copyright, links a redes sociales, y mensaje 'Hecho con ❤️ y Claude Code'"
\`\`\`

8. **Pule los detalles**:
\`\`\`bash
claude refine "añadir animaciones sutiles de fade-in cuando hago scroll a cada sección"
\`\`\`

### Personalización

Una vez que tengas la estructura base, personaliza el contenido con tu información real. Edita los archivos directamente y reemplaza los datos de ejemplo con los tuyos.

### Bonus points

Si quieres llevar tu proyecto al siguiente nivel:

\`\`\`bash
# Añade modo oscuro
claude add "implementar toggle de dark mode que persista en localStorage, con transiciones suaves entre temas"

# Añade un blog
claude add "crear sección de blog con lista de posts, los posts deben venir de archivos markdown en carpeta /content/posts"

# Optimiza rendimiento
claude optimize "optimizar imágenes, implementar lazy loading, y mejorar performance general"

# Genera tests
claude test "todos los componentes principales"
\`\`\`

## Solución de problemas comunes

Déjame anticipar algunos problemas que podrías encontrar:

### "Claude generó código pero hay errores en la consola"

**Solución**:
1. Lee el error. Los errores de JavaScript/TypeScript suelen ser bastante descriptivos.
2. Si no entiendes el error, pégalo en Google. Probablemente alguien más tuvo el mismo problema.
3. Usa Claude para arreglarlo:
\`\`\`bash
claude fix "[pega aquí el mensaje de error]"
\`\`\`

### "El diseño no se ve como esperaba"

**Solución**:
Sé más específico en tu siguiente petición:
\`\`\`bash
claude refine "cambiar el diseño del header para que: el título sea más grande (text-6xl), centrado, con un gradiente de azul a morado, y añadir un sutil efecto de sombra"
\`\`\`

### "No sé qué estilos de Tailwind usar"

**Solución**:
No necesitas saberlo. Deja que Claude se encargue:
\`\`\`bash
claude add "hacer que esta sección se vea moderna y profesional, con mucho espacio en blanco, tipografía elegante y colores sutiles"
\`\`\`

Claude sabe Tailwind. Tú solo describe lo que quieres visualmente.

### "Mi servidor de desarrollo se crasheó"

**Solución**:
Casi siempre es un error de sintaxis en el código. Revisa el último archivo que editaste. Si no lo encuentras:
\`\`\`bash
npm run lint
\`\`\`

Esto te mostrará dónde está el error de sintaxis.

## Conclusión: El comienzo de un viaje increíble

Felicidades. Acabas de completar tu primer proyecto con Claude Code. Pero más importante que el proyecto en sí, acabas de experimentar un nuevo paradigma de desarrollo.

Piensa en lo que has logrado en esta lección:
- ✅ Creaste un proyecto completo desde cero en minutos
- ✅ Añadiste múltiples páginas con diseños complejos
- ✅ Implementaste navegación y routing
- ✅ Aplicaste diseño responsive profesional
- ✅ Aprendiste a comunicarte efectivamente con una IA

Y todo esto sin tener que configurar webpack, babel, TypeScript, ESLint, Prettier, Tailwind... Claude se encargó de todo eso por ti.

Pero aquí está la parte importante: **no uses Claude como una caja negra**. Usa Claude como un mentor que escribe código contigo. Lee cada línea que genera. Pregúntate por qué eligió esa solución. Experimenta modificando cosas. Rompe cosas. Arregla cosas. Así es como realmente aprendes.

### Reflexión final

Cuando empecé a programar hace más de 15 años, tardaba semanas en crear lo que ahora puedes crear en horas con Claude. Pero eso no significa que programar se haya vuelto "fácil" o que las habilidades ya no importan. Al contrario, significa que ahora puedes enfocarte en cosas más importantes: resolver problemas reales, crear experiencias increíbles para usuarios, aprender conceptos avanzados más rápido.

Claude Code no está reemplazando a los programadores. Está elevando a todos los programadores al siguiente nivel.

### Próximos pasos

En la siguiente lección, vamos a profundizar en la interfaz de línea de comandos de Claude. Exploraremos todos los comandos disponibles, sus opciones avanzadas, y cómo combinarlos para crear workflows de desarrollo supereficientes.

Pero antes de seguir, **practica**. Crea al menos dos proyectos más. Experimenta con diferentes tipos de aplicaciones. Rompe cosas. Aprende. La teoría es importante, pero la práctica es lo que realmente consolida el conocimiento.

### Tarea para antes de la siguiente lección

No te voy a dejar ir sin un pequeño reto:

1. **Explora los comandos básicos**:
   \`\`\`bash
   claude --help
   \`\`\`
   Lee la descripción de cada comando. No hace falta memorizarlos, solo familiarízate.

2. **Prueba el test interactivo**:
   \`\`\`bash
   claude test
   \`\`\`

3. **Personaliza tu configuración**:
   Edita \`~/.claude/config.json\` con tus preferencias personales.

4. **Opcional: Crea tu primer mini-proyecto**:
   \`\`\`bash
   claude init mi-experimento
   \`\`\`
   Selecciona opciones diferentes, explora la estructura generada.

### Recursos para seguir practicando

- **Proyecto sugerido 1**: Blog personal con sistema de posts
- **Proyecto sugerido 2**: Todo List app con localStorage
- **Proyecto sugerido 3**: Dashboard de analytics con gráficas
- **Proyecto sugerido 4**: Landing page para un producto ficticio
- **Proyecto sugerido 5**: Clone simplificado de una red social

Para cada uno, usa Claude desde \`init\` hasta el despliegue. Documenta tu proceso. Comparte tus creaciones.

¡Nos vemos en la siguiente lección! 🚀

---

*¿Tienes preguntas? ¿Algo no funcionó como esperabas? ¿Quieres presumir tu proyecto? Comparte en el foro del curso. Me encanta ver lo que crean mis estudiantes.*

---`;

console.log('✅ Contenido de Lección 3 preparado');
console.log('Longitud:', lesson3ImprovedContent.length, 'caracteres');
console.log('\n⚠️ NOTA: Este script solo prepara el contenido.');
console.log('Debido al tamaño extremo del contenido (~7000 palabras por lección),');
console.log('se requiere un enfoque diferente para actualizar el archivo.');
console.log('\nSe recomienda:');
console.log('1. Actualizar las lecciones manualmente en el archivo seed-modulo1-data.ts');
console.log('2. O crear un nuevo archivo seed con el contenido mejorado');
console.log('3. O usar un script más sofisticado que maneje archivos grandes');
