# Primeros pasos: Tu primer proyecto con Claude

![First Project](https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=400&fit=crop)

## Introducción

¿Recuerdas la primera vez que montaste en bicicleta? Ese momento en que las rueditas de apoyo salieron y de repente estabas pedaleando solo. El desarrollo con Claude Code tiene algo de esa misma magia. Hoy vamos a crear tu primer proyecto real, y te aseguro que será mucho más fácil (y con menos rodillas raspadas) que aprender a andar en bici.

En esta lección no vamos a construir "Hola Mundo". Vamos a crear algo real, algo que puedas mostrar, algo que realmente funcione. Y lo más importante: vamos a entender cada paso del proceso para que nunca más te sientas perdido al iniciar un proyecto.

## El momento de la verdad: \`claude init\`

Este comando de tres palabras es, probablemente, el más poderoso que aprenderás en todo el curso. \`claude init\` no solo crea carpetas y archivos, transforma una idea en estructura, el caos en orden, la parálisis en acción.

### Por qué es tan especial

Cuando trabajas con frameworks tradicionales, ejecutas comandos como \`create-react-app\`, \`django-admin startproject\`, o \`cargo new\`. Todos crean estructuras predefinidas que muchas veces traen cosas que no necesitas y carecen de lo que sí necesitas.

\`claude init\` es diferente. Es como tener un arquitecto de software personal que te pregunta qué quieres construir y luego diseña la estructura perfecta para ese proyecto específico.

### Tu primer \`claude init\`

Abre tu terminal. Respira profundo. Vamos a crear algo increíble.

\`\`\`bash
# Navega a tu carpeta de proyectos
cd ~/Proyectos

# Crea una carpeta para tu nuevo proyecto
mkdir mi-primer-proyecto-claude
cd mi-primer-proyecto-claude

# Aquí viene la magia
claude init
\`\`\`

💡 **Tip profesional**: Siempre crea la carpeta del proyecto antes de ejecutar \`claude init\`. Esto te da control total sobre el nombre y ubicación del proyecto.

## El diálogo interactivo: Claude te conoce

Después de ejecutar \`claude init\`, Claude iniciará una conversación contigo. No es un formulario frío de preguntas y respuestas. Es un diálogo inteligente que se adapta a tus respuestas.

### Primera pregunta: ¿Qué vas a construir?

\`\`\`
Claude: ¡Hola! Voy a ayudarte a configurar tu proyecto.
¿Qué tipo de aplicación quieres crear?

1. Aplicación web
2. API/Backend
3. Herramienta de línea de comandos
4. Aplicación móvil
5. Script de automatización
6. Otro (describe tu proyecto)
\`\`\`

**Elige siempre la opción que mejor describa tu intención**. No hay respuestas incorrectas, pero tu elección determinará la estructura inicial.

Para nuestro primer proyecto, vamos a elegir "Aplicación web" porque es visual, interactiva y perfecta para aprender.

### Segunda pregunta: El stack tecnológico

\`\`\`
Claude: Perfecto, una aplicación web. ¿Qué stack prefieres?

1. React + TypeScript + Vite
2. Next.js (React con SSR)
3. Vue.js + TypeScript
4. Vanilla JavaScript (sin framework)
5. Python + Flask
6. Node.js + Express
7. No estoy seguro, recomiéndame
\`\`\`

Aquí viene mi consejo más importante de esta lección:

⚠️ **No elijas tecnologías por moda o por lo que está en las ofertas de empleo. Elige por lo que necesita tu proyecto y por lo que quieres aprender.**

Para este tutorial, voy a elegir **React + TypeScript + Vite** porque es moderno, rápido, y te enseña conceptos que aplicarás en cualquier framework.

### Tercera pregunta: Características adicionales

\`\`\`
Claude: ¿Qué características necesitas en tu proyecto?

□ Autenticación de usuarios
□ Base de datos
□ Estilos (CSS framework)
□ Testing
□ Despliegue automático
□ Internacionalización
\`\`\`

Aquí muchos principiantes cometen el error de marcar todo. "Total, si viene incluido, mejor tenerlo", piensan. Error.

💡 **Regla de oro**: Empieza simple. Siempre puedes agregar features después. Es mucho más difícil remover complejidad que añadirla.

Para nuestro proyecto inicial, seleccionemos solo:
- ✅ Estilos (Tailwind CSS)
- ✅ Testing

### La configuración final

\`\`\`
Claude: Resumen de tu proyecto:
- Tipo: Aplicación web
- Stack: React + TypeScript + Vite
- Estilos: Tailwind CSS
- Testing: Vitest + React Testing Library

¿Procedo con esta configuración? (s/n)
\`\`\`

Escribe \`s\` y observa la magia.

## La creación: Viendo a Claude en acción

Cuando presionas Enter, Claude comienza a trabajar. Y aquí es donde apreciarás la verdadera diferencia con otras herramientas.

\`\`\`
Creating project structure...
✓ Created directory structure
✓ Generated package.json with optimized dependencies
✓ Configured TypeScript with strict mode
✓ Set up Vite with hot module replacement
✓ Configured Tailwind CSS with custom design system
✓ Created component structure
✓ Set up Vitest and testing utilities
✓ Generated .gitignore with sensible defaults
✓ Created README with setup instructions
✓ Initialized Git repository

Project created successfully! 🎉

Next steps:
1. cd mi-primer-proyecto-claude
2. npm install
3. npm run dev

Need help? Just ask: claude help
\`\`\`

Cada checkmark representa decisiones inteligentes que Claude tomó por ti. Veamos algunas:

### TypeScript en modo estricto

Claude configuró TypeScript con \`"strict": true\`. Esto puede parecer duro para un proyecto de principiantes, pero créeme: es un regalo. Los errores de tipo que detectes ahora son bugs que no enfrentarás en producción.

### Vite con HMR optimizado

Hot Module Replacement significa que cuando edites un archivo, solo ese módulo se recarga, no toda la aplicación. Claude configuró Vite para maximizar esta velocidad.

### Tailwind con design system personalizado

No solo instaló Tailwind. Claude creó un archivo de configuración con tu paleta de colores, fuentes, y espaciados. Consistencia desde el día uno.

## Tu primera ejecución

Ahora viene el momento de la verdad:

\`\`\`bash
# Instala las dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
\`\`\`

En segundos verás algo como:

\`\`\`
  VITE v5.0.0  ready in 324 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
\`\`\`

Abre tu navegador en \`http://localhost:5173/\` y...

¡Wow! No es una página en blanco con "Hello World". Es una aplicación funcional, con navegación, componentes bien estructurados, estilos consistentes. Claude no te dio un esqueleto, te dio un punto de partida profesional.

## Anatomía del proyecto: Entendiendo lo que Claude creó

Abre el proyecto en tu editor de código favorito (VS Code, si me preguntas). Verás una estructura como esta:

\`\`\`
mi-primer-proyecto-claude/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Button.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── About.tsx
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   └── helpers.ts
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   └── components/
│       └── Button.test.tsx
├── public/
│   └── assets/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
\`\`\`

### El archivo \`src/App.tsx\`

Ábrelo. Este es el corazón de tu aplicación:

\`\`\`typescript
import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={setCurrentPage} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {currentPage === 'home' ? <Home /> : <About />}
      </main>
      <Footer />
    </div>
  )
}

export default App
\`\`\`

Fíjate en los detalles profesionales:
- **Gestión de estado** con \`useState\` para la navegación
- **Estructura semántica** con \`header\`, \`main\`, \`footer\`
- **Clases de Tailwind** para layout responsivo
- **Importaciones limpias** y organizadas

### Un componente de ejemplo: \`Button.tsx\`

\`\`\`typescript
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false
}: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-all'
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`\${baseClasses} \${variantClasses[variant]}
        \${disabled ? 'opacity-50 cursor-not-allowed' : ''}\`}
    >
      {children}
    </button>
  )
}
\`\`\`

Este componente te enseña:
- **TypeScript interfaces** para props tipadas
- **Composición** de clases CSS
- **Valores por defecto** para props opcionales
- **Estados visuales** (hover, disabled)

### El archivo de configuración \`vite.config.ts\`

\`\`\`typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  server: {
    port: 5173,
    open: true
  }
})
\`\`\`

Claude configuró **aliases de importación**. Esto significa que en lugar de escribir:

\`\`\`typescript
import Button from '../../../components/Button'
\`\`\`

Puedes escribir:

\`\`\`typescript
import Button from '@components/Button'
\`\`\`

Mucho más limpio y menos propenso a errores.

## Tu primera modificación con Claude

Ahora que entiendes la estructura, vamos a hacer cambios. Y aquí es donde Claude brilla de verdad.

Abre una nueva ventana de terminal (deja el servidor corriendo en la otra) y ejecuta:

\`\`\`bash
claude chat
\`\`\`

Esto abre una sesión interactiva con Claude. Ahora escribe:

\`\`\`
Quiero agregar una sección de testimonios en la página Home.
Debe mostrar 3 testimonios con foto, nombre y comentario.
\`\`\`

Claude responderá algo como:

\`\`\`
Perfecto, voy a crear un componente Testimonials y agregarlo
a la página Home. ¿Prefieres que los testimonios sean datos
hardcodeados o que vengan de un archivo JSON?
\`\`\`

Esta es la conversación que mencionamos en lecciones anteriores. Claude no solo ejecuta órdenes, dialoga contigo.

Responde:

\`\`\`
Por ahora hardcodeados, después los moveremos a JSON
\`\`\`

En segundos, Claude:

1. **Crea el archivo** \`src/components/Testimonials.tsx\`
2. **Escribe el componente** con TypeScript y Tailwind
3. **Importa y agrega** el componente a \`Home.tsx\`
4. **Actualiza los estilos** si es necesario

Revisa el archivo que creó:

\`\`\`typescript
const testimonials = [
  {
    id: 1,
    name: "María García",
    role: "Frontend Developer",
    image: "/avatars/maria.jpg",
    comment: "Esta herramienta transformó mi forma de desarrollar. Increíble."
  },
  // ... más testimonios
]

export default function Testimonials() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Lo que dicen nuestros usuarios
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mb-4"
            />
            <p className="text-gray-600 mb-4">{testimonial.comment}</p>
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
\`\`\`

Guarda y mira tu navegador. El cambio ya está ahí, gracias al hot reload.

## Tips profesionales para tus primeros proyectos

### 💡 Tip 1: Mantén conversaciones contextuales

Cuando uses \`claude chat\`, no cierres la sesión entre peticiones relacionadas. Claude mantiene el contexto y puede hacer cambios más coherentes.

### 💡 Tip 2: Pide explicaciones

Después de cada cambio, pregunta "¿Por qué elegiste este enfoque?" Las respuestas te convertirán en mejor desarrollador.

### 💡 Tip 3: Experimenta sin miedo

Todo está en Git (Claude inicializó el repositorio). Si algo sale mal:

\`\`\`bash
git checkout .  # Descarta todos los cambios
\`\`\`

### ⚠️ Advertencia importante

No aceptes código a ciegas. Claude es increíblemente bueno, pero no infalible. Lee y entiende cada línea que agregues a tu proyecto.

## Ejercicio práctico: Construye tu portafolio

Ahora es tu turno. Vamos a crear un proyecto real que puedes usar:

### Instrucciones paso a paso

**Paso 1**: Crea un nuevo proyecto con \`claude init\`
- Tipo: Aplicación web
- Stack: El que prefieras (recomiendo React + TypeScript + Vite)
- Features: Estilos, Testing

**Paso 2**: Usando \`claude chat\`, pide:
\`\`\`
Transforma este proyecto en un portafolio personal con:
- Sección Hero con mi nombre y título profesional
- Sección Sobre mí
- Galería de proyectos (3 proyectos de ejemplo)
- Sección de skills con iconos
- Formulario de contacto
- Footer con redes sociales
\`\`\`

**Paso 3**: Personaliza con tus datos reales:
\`\`\`
Actualiza la sección Sobre mí con mi información: [tu bio aquí]
\`\`\`

**Paso 4**: Mejora el diseño:
\`\`\`
Mejora los estilos para que sea más moderno y profesional.
Usa una paleta de colores azul y gris.
\`\`\`

### Criterios de éxito

Al terminar, debes tener:
- ✅ Un sitio web funcional con todas las secciones
- ✅ Código TypeScript sin errores
- ✅ Tests que pasan
- ✅ Diseño responsivo
- ✅ Listo para desplegar

## Conclusión

Hoy diste el paso más importante: pasaste de la teoría a la práctica. Creaste un proyecto real, entendiste su estructura, hiciste modificaciones, y aprendiste a dialogar con Claude para conseguir resultados profesionales.

\`claude init\` no es solo un comando. Es tu compañero de confianza que transformará cada idea en un punto de partida sólido. La próxima vez que pienses "esto es demasiado complejo para empezar", recuerda: no estás solo. Claude está ahí para ayudarte a iniciar correctamente.

En la próxima lección, profundizaremos en la interfaz de Claude Code. Aprenderás todos los comandos disponibles, cómo comunicarte efectivamente, y cómo aprovechar al máximo cada interacción.