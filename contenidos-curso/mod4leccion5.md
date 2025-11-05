<p><strong><em>Diseño responsive con Tailwind CSS</em></strong></p>

## Introducción: De código funcional a interfaces hermosas

Hasta ahora te has enfocado en que tus componentes funcionen correctamente: que carguen datos, respondan a eventos, muestren la información correcta. Pero seamos honestos: tus componentes probablemente no se ven muy atractivos. El CSS que has escrito es básico y funcional, pero no profesional.

En esta lección descubrirás **Tailwind CSS**, un framework moderno que revolucionó la forma en que se escribe CSS. En lugar de escribir archivos CSS separados con clases inventadas, escribirás clases de utilidad directamente en tus componentes JSX. Suena raro al principio, pero cuando veas lo rápido que puedes crear interfaces hermosas y responsive, no querrás volver atrás.

Aprenderás a hacer que tus apps se vean increíbles en cualquier dispositivo (móvil, tablet, desktop) sin escribir CSS complejo. Es cuando tus proyectos pasan de "esto funciona" a "¡wow, esto se ve profesional!".

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Entender qué es Tailwind CSS**: Comprenderás la filosofía "utility-first" y por qué Tailwind es tan popular entre desarrolladores modernos.
2. **Instalar y configurar Tailwind**: Sabrás cómo añadir Tailwind a tu proyecto React existente en minutos.
3. **Usar clases de utilidad**: Aprenderás las clases más importantes de Tailwind para diseño, colores, espaciado, tipografía y más.
4. **Crear diseños responsive**: Harás que tus componentes se adapten perfectamente a móviles, tablets y escritorio usando prefijos responsive de Tailwind.

---

## ¿Por qué es importante Tailwind CSS?

Imagina que quieres pintar una casa. Hay dos enfoques:

**Enfoque tradicional (CSS normal)**:
1. Mezclas pintura personalizada para cada habitación
2. Inventas nombres para cada mezcla ("azul-sala", "verde-cocina")
3. Guardas las mezclas en botes separados
4. Cada vez que pintas, buscas el bote correcto

**Enfoque Tailwind**:
1. Tienes una paleta con todos los colores posibles ya listos
2. Aplicas el color directamente donde lo necesitas
3. No inventas nombres, usas nombres estándar que todos entienden
4. Trabajas mucho más rápido porque todo está a mano

**Tailwind funciona igual**: en lugar de inventar clases CSS y escribir archivos `.css` separados, usas clases predefinidas directamente en tu HTML/JSX. Es más rápido, más consistente, y más fácil de mantener.

### 📊 Un dato interesante

Tailwind CSS pasó de 0% a más del 30% de adopción en proyectos web en solo 5 años (2019-2024). Empresas como GitHub, Netflix, NASA, y Shopify lo usan en producción. Adam Wathan, su creador, transformó el desarrollo frontend con una idea simple: "¿Y si las clases de CSS fueran tan pequeñas que hicieran solo una cosa?". Funcionó.

---

## Concepto 1: ¿Qué es Tailwind CSS?

**Tailwind CSS es un framework de CSS "utility-first"** que proporciona clases de bajo nivel para construir diseños personalizados directamente en tu HTML.

### Utility-first: ¿Qué significa?

Significa que en lugar de tener clases que representan componentes completos (`class="card"`), tienes clases diminutas que hacen una sola cosa (`class="p-4 bg-blue-500 rounded"`).

**CSS tradicional**:
```css
/* archivo: styles.css */
.card {
  padding: 1rem;
  background-color: #3b82f6;
  border-radius: 0.5rem;
}
```

```html
<div class="card">Contenido</div>
```

**Tailwind CSS**:
```html
<!-- Sin archivo CSS separado, todo en el HTML -->
<div class="p-4 bg-blue-500 rounded">Contenido</div>
```

**Explicación de las clases Tailwind**:
- `p-4`: Padding de 1rem (16px) en todos los lados
- `bg-blue-500`: Background color azul (tono 500 de la paleta)
- `rounded`: Border radius (esquinas redondeadas)

### Ventajas de Tailwind

1. **Más rápido**: No pierdes tiempo inventando nombres de clases ni saltando entre archivos HTML y CSS.
2. **Consistente**: Todos los colores, espaciados y tamaños están predefinidos en una escala coherente.
3. **Responsive fácil**: Hacer diseño responsive es trivial (lo verás pronto).
4. **CSS pequeño en producción**: Tailwind elimina automáticamente las clases que no usas.
5. **Documentación excelente**: Puedes buscar cualquier propiedad CSS y encontrar su clase Tailwind.

### Desventaja (honesta)

Al principio, tu HTML se ve "feo" y lleno de clases. Esto es normal y vale la pena. Después de una semana, preferirás este enfoque.

**Ejemplo de "muchas clases"**:
```tsx
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
  {/* Sí, son muchas clases, pero cada una hace exactamente una cosa clara */}
</div>
```

---

## Concepto 2: Instalar Tailwind en tu proyecto

Vamos a instalar Tailwind en un proyecto React + Vite paso a paso.

### Paso 1: Instalar dependencias

Abre tu terminal en la carpeta de tu proyecto y ejecuta:

```bash
npm install -D tailwindcss postcss autoprefixer
```

**Qué hace esto**: Instala Tailwind CSS y las herramientas necesarias como dependencias de desarrollo.

### Paso 2: Inicializar configuración

Ejecuta:

```bash
npx tailwindcss init -p
```

**Qué hace esto**: Crea dos archivos:
- `tailwind.config.js`: Configuración de Tailwind
- `postcss.config.js`: Configuración de PostCSS (procesador de CSS)

### Paso 3: Configurar rutas de contenido

Abre `tailwind.config.js` y reemplaza su contenido con:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Qué hace esto**: Le dice a Tailwind en qué archivos buscar clases para no incluir CSS innecesario en el build final.

### Paso 4: Añadir directivas de Tailwind al CSS

Abre `src/index.css` y **reemplaza todo su contenido** con:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Qué hace esto**: Importa todos los estilos de Tailwind.

### Paso 5: Verificar que funciona

Abre `src/App.tsx` y cambia el contenido a:

```tsx
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">
        ¡Tailwind funciona!
      </h1>
    </div>
  );
}

export default App;
```

Guarda y mira el navegador. Deberías ver un título azul grande centrado en un fondo gris claro.

**Si funciona**: ¡Felicidades! Tailwind está instalado correctamente.

**Si no funciona**: Asegúrate de haber reiniciado el servidor de desarrollo (`npm run dev`).

---

## Concepto 3: Clases esenciales de Tailwind

Tailwind tiene cientos de clases, pero vamos a enfocarnos en las más importantes.

### Espaciado: Padding y Margin

**Padding** (`p-{tamaño}`):
- `p-0`: Sin padding
- `p-4`: Padding 1rem (16px) en todos los lados
- `px-4`: Padding horizontal (izquierda y derecha)
- `py-4`: Padding vertical (arriba y abajo)
- `pt-4`, `pb-4`, `pl-4`, `pr-4`: Padding específico (top, bottom, left, right)

**Margin** (igual que padding pero con `m-`):
- `m-4`, `mx-4`, `my-4`, `mt-4`, etc.

**Escala de tamaños**:
- `0`: 0px
- `1`: 0.25rem (4px)
- `2`: 0.5rem (8px)
- `4`: 1rem (16px)
- `8`: 2rem (32px)
- `16`: 4rem (64px)

### Colores: Background y Text

**Background** (`bg-{color}-{tono}`):
```tsx
<div className="bg-blue-500">Fondo azul</div>
<div className="bg-red-600">Fondo rojo</div>
<div className="bg-gray-100">Fondo gris claro</div>
```

**Text** (`text-{color}-{tono}`):
```tsx
<p className="text-blue-500">Texto azul</p>
<p className="text-green-600">Texto verde</p>
```

**Colores disponibles**: gray, red, yellow, green, blue, indigo, purple, pink

**Tonos**: 50 (muy claro) a 950 (muy oscuro). Los más usados: 100, 300, 500, 700, 900.

### Tipografía

**Tamaño de fuente** (`text-{tamaño}`):
```tsx
<p className="text-xs">Muy pequeño</p>
<p className="text-sm">Pequeño</p>
<p className="text-base">Normal (16px)</p>
<p className="text-lg">Grande</p>
<p className="text-xl">Muy grande</p>
<p className="text-2xl">Título</p>
<p className="text-4xl">Título grande</p>
```

**Peso de fuente** (`font-{peso}`):
```tsx
<p className="font-normal">Normal</p>
<p className="font-bold">Negrita</p>
<p className="font-semibold">Semi-negrita</p>
```

**Alineación** (`text-{align}`):
```tsx
<p className="text-left">Izquierda</p>
<p className="text-center">Centro</p>
<p className="text-right">Derecha</p>
```

### Bordes y sombras

**Bordes**:
```tsx
<div className="border">Borde de 1px</div>
<div className="border-2">Borde de 2px</div>
<div className="border-blue-500">Borde azul</div>
<div className="rounded">Esquinas redondeadas</div>
<div className="rounded-lg">Esquinas más redondeadas</div>
<div className="rounded-full">Círculo/píldora</div>
```

**Sombras** (`shadow-{tamaño}`):
```tsx
<div className="shadow">Sombra pequeña</div>
<div className="shadow-md">Sombra media</div>
<div className="shadow-lg">Sombra grande</div>
```

### Flexbox (layout)

**Crear un contenedor flex**:
```tsx
<div className="flex">
  {/* Elementos hijos se colocan horizontalmente */}
</div>
```

**Dirección**:
```tsx
<div className="flex flex-col">Columna (vertical)</div>
<div className="flex flex-row">Fila (horizontal, default)</div>
```

**Justificación** (eje principal):
```tsx
<div className="flex justify-start">Inicio</div>
<div className="flex justify-center">Centro</div>
<div className="flex justify-between">Espacio entre</div>
<div className="flex justify-end">Final</div>
```

**Alineación** (eje cruzado):
```tsx
<div className="flex items-start">Inicio</div>
<div className="flex items-center">Centro</div>
<div className="flex items-end">Final</div>
```

**Combinadas** (muy común):
```tsx
<div className="flex items-center justify-center">
  {/* Centra vertical y horizontalmente */}
  Contenido centrado
</div>
```

---

## Concepto 4: Diseño responsive

**Tailwind hace el diseño responsive increíblemente fácil** usando prefijos de breakpoints.

### Breakpoints de Tailwind

- **Sin prefijo**: Aplica en todos los tamaños (móvil primero)
- `sm:`: Pantallas ≥ 640px (tablets pequeñas)
- `md:`: Pantallas ≥ 768px (tablets)
- `lg:`: Pantallas ≥ 1024px (laptops)
- `xl:`: Pantallas ≥ 1280px (escritorios)
- `2xl:`: Pantallas ≥ 1536px (pantallas grandes)

### Cómo funcionan los prefijos

```tsx
<div className="text-sm md:text-lg lg:text-2xl">
  {/*
    Móvil: text-sm (pequeño)
    Tablet (md): text-lg (grande)
    Desktop (lg): text-2xl (muy grande)
  */}
  Texto responsive
</div>
```

**Filosofía "mobile-first"**: Las clases sin prefijo se aplican primero a móviles, luego añades prefijos para pantallas más grandes.

### Ejemplo completo: Tarjeta responsive

```tsx
<div className="w-full md:w-1/2 lg:w-1/3 p-4">
  {/*
    Móvil: Ancho completo (100%)
    Tablet: Mitad del ancho (50%)
    Desktop: Un tercio del ancho (33%)
  */}
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-bold mb-4">Título</h3>
    <p className="text-gray-600">Contenido de la tarjeta</p>
  </div>
</div>
```

---

## 🤖 Claude Code en Acción: Diseño rápido con Tailwind CSS

Ahora que comprendes los fundamentos de Tailwind CSS, es momento de maximizar tu productividad con Claude Code. Diseñar interfaces responsive con Tailwind puede implicar recordar cientos de clases, configurar temas personalizados, y estructurar layouts complejos. Claude Code te ayuda a crear interfaces profesionales describiendo lo que quieres en lenguaje natural.

### ¿Por qué usar Claude Code para Tailwind CSS?

**El problema sin Claude Code**:
- Memorizar cientos de clases de Tailwind y sus variantes responsive
- Configurar manualmente `tailwind.config.js` con temas personalizados
- Estructurar grids y layouts complejos desde cero
- Recordar la sintaxis exacta de transiciones, animaciones, y estados hover
- Crear componentes responsive perfectos para todos los tamaños de pantalla

**Con Claude Code**:
- Describes la interfaz que quieres y Claude genera las clases correctas
- Obtienes configuraciones de Tailwind completas y optimizadas
- Generas componentes responsive con todas las variantes necesarias
- Implementas diseños complejos sin consultar documentación constantemente

---

### Prompt 1: Configurar Tailwind con tema personalizado

**Contexto**: La paleta de colores predeterminada de Tailwind es genérica. Los proyectos profesionales necesitan temas personalizados que reflejen su marca.

**Prompt para Claude Code**:
```
Configura Tailwind CSS en mi proyecto React con un tema personalizado que incluya:
- Paleta de colores de marca: primary (azul #3B82F6), secondary (púrpura #8B5CF6),
  accent (verde #10B981), neutral (grises)
- Tipografía personalizada: fuente Inter para textos, Poppins para títulos
- Espaciado adicional: contenedor máximo de 1400px
- Breakpoints personalizados: xs (480px), tablet (960px)
- Sombras personalizadas para elevation
- Animaciones personalizadas: fadeIn, slideUp

Genera el archivo tailwind.config.js completo y actualiza index.css con @import de fonts.
```

**Lo que Claude Code hará por ti**:
1. Generará `tailwind.config.js` con todas las personalizaciones
2. Añadirá imports de Google Fonts en `index.css`
3. Configurará theme.extend correctamente
4. Creará animaciones keyframes personalizadas
5. Documentará cómo usar cada extensión

**Código generado** (`tailwind.config.js`):
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colores personalizados de marca
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3B82F6', // Color principal
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#8B5CF6', // Color secundario
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10B981', // Color de acento
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },

      // Tipografía personalizada
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },

      // Contenedor máximo personalizado
      maxWidth: {
        'container': '1400px',
      },

      // Breakpoints personalizados
      screens: {
        'xs': '480px',
        'tablet': '960px',
      },

      // Sombras personalizadas para elevation
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'elevation-2': '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
        'elevation-3': '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)',
        'elevation-4': '0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05)',
      },

      // Animaciones personalizadas
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
```

**Código actualizado** (`src/index.css`):
```css
/* Importar fuentes de Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Estilos base opcionales */
@layer base {
  body {
    @apply font-sans text-gray-900 antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display;
  }
}
```

**Ejemplo de uso del tema personalizado**:
```tsx
function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-primary-500 to-secondary-500 py-20">
      <div className="max-w-container mx-auto px-4">
        <h1 className="font-display text-5xl text-white mb-6 animate-slide-up">
          Bienvenido a Nuestra Plataforma
        </h1>
        <p className="text-xl text-white/90 mb-8 animate-fade-in">
          Diseñada con Tailwind CSS y tema personalizado
        </p>
        <button className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg shadow-elevation-3 transition-all transform hover:scale-105">
          Comenzar Ahora
        </button>
      </div>
    </section>
  );
}
```

**Por qué es mejor**:
- Colores de marca consistentes en todo el proyecto
- Tipografía profesional con Google Fonts
- Animaciones predefinidas fáciles de usar
- Sombras con niveles de elevation (Material Design)
- Breakpoints adaptados a tu diseño específico

---

### Prompt 2: Crear componente Card responsive y reutilizable

**Contexto**: Las tarjetas (cards) son uno de los componentes más usados. Un diseño reutilizable y responsive ahorra tiempo.

**Prompt para Claude Code**:
```
Crea un componente Card reutilizable en src/components/Card.tsx que:
- Acepte props: title, description, image, badge, footer
- Sea completamente responsive (adapte layout en móvil)
- Tenga variantes: default, featured, minimal
- Incluya efectos hover profesionales
- Use Tailwind con clases optimizadas
- Esté tipado con TypeScript
- Incluya ejemplos de uso

En móvil: imagen arriba, contenido abajo (columna)
En desktop: imagen a la izquierda, contenido a la derecha (fila) - opcional con prop
```

**Código generado** (`src/components/Card.tsx`):
```typescript
import { ReactNode } from 'react';

interface CardProps {
  title: string;
  description: string;
  image?: string;
  badge?: string;
  footer?: ReactNode;
  variant?: 'default' | 'featured' | 'minimal';
  horizontal?: boolean; // En desktop, layout horizontal
  onClick?: () => void;
}

function Card({
  title,
  description,
  image,
  badge,
  footer,
  variant = 'default',
  horizontal = false,
  onClick
}: CardProps) {
  // Clases base según variante
  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-sm hover:shadow-md',
    featured: 'bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-300 shadow-elevation-2 hover:shadow-elevation-3',
    minimal: 'bg-white border-l-4 border-primary-500 hover:border-primary-600',
  };

  // Layout responsive: columna por defecto, fila en desktop si horizontal=true
  const layoutClasses = horizontal
    ? 'flex flex-col md:flex-row'
    : 'flex flex-col';

  return (
    <div
      className={`
        ${variantClasses[variant]}
        ${layoutClasses}
        rounded-lg overflow-hidden
        transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      {/* Imagen */}
      {image && (
        <div className={`
          ${horizontal ? 'md:w-1/3' : 'w-full'}
          relative overflow-hidden
        `}>
          <img
            src={image}
            alt={title}
            className="w-full h-48 md:h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          {badge && (
            <span className="absolute top-3 right-3 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Contenido */}
      <div className={`
        ${horizontal && image ? 'md:w-2/3' : 'w-full'}
        p-6 flex flex-col justify-between
      `}>
        <div>
          <h3 className={`
            font-display font-bold mb-3
            ${variant === 'featured' ? 'text-2xl text-primary-700' : 'text-xl text-gray-800'}
          `}>
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Footer opcional */}
        {footer && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
```

**Ejemplos de uso**:

```tsx
// 1. Card básica vertical
<Card
  title="Introducción a React"
  description="Aprende los fundamentos de React desde cero"
  image="https://via.placeholder.com/400x300"
  badge="Nuevo"
/>

// 2. Card destacada horizontal
<Card
  title="Curso Premium"
  description="Acceso completo a todos los módulos avanzados"
  image="https://via.placeholder.com/400x300"
  variant="featured"
  horizontal={true}
  footer={
    <div className="flex justify-between items-center">
      <span className="text-2xl font-bold text-primary-600">$49.99</span>
      <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded">
        Comprar
      </button>
    </div>
  }
/>

// 3. Card minimal sin imagen
<Card
  title="Notificación Importante"
  description="Tu cuenta ha sido verificada exitosamente"
  variant="minimal"
  footer={
    <button className="text-primary-600 hover:text-primary-700 font-semibold">
      Ver detalles →
    </button>
  }
/>

// 4. Grid de cards responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {courses.map(course => (
    <Card
      key={course.id}
      title={course.title}
      description={course.description}
      image={course.image}
      badge={course.isNew ? 'Nuevo' : undefined}
      onClick={() => navigate(`/course/${course.id}`)}
    />
  ))}
</div>
```

**Por qué es mejor**:
- Reutilizable en todo el proyecto con diferentes variantes
- Completamente responsive con layouts adaptativos
- Efectos hover profesionales incluidos
- TypeScript completo para props seguras
- Fácil de extender con nuevas variantes

---

### Prompt 3: Generar landing page responsive completa

**Contexto**: Las landing pages requieren múltiples secciones responsive: hero, features, testimonials, CTA. Crearlas desde cero toma horas.

**Prompt para Claude Code**:
```
Crea una landing page completa y responsive en src/pages/Landing.tsx que incluya:
1. Hero section con título grande, subtítulo, CTA button, imagen hero
2. Features section con 6 características en grid (2 cols móvil, 3 desktop)
3. Testimonials section con 3 testimonios en carousel
4. Pricing section con 3 planes (Basic, Pro, Enterprise) en cards
5. CTA final con fondo degradado
6. Footer con links y redes sociales

Requisitos:
- Completamente responsive (móvil, tablet, desktop)
- Uso de tema personalizado (primary, secondary, accent)
- Animaciones al hacer scroll (animate-slide-up)
- Efectos hover en todos los elementos interactivos
- TypeScript
- Comentarios explicativos en cada sección
```

**Claude Code generará una landing page completa. Aquí están las secciones principales**:

**Archivo: `src/pages/Landing.tsx`**
```typescript
import { useState } from 'react';

// Datos de ejemplo
const features = [
  { icon: '🚀', title: 'Rápido', description: 'Carga instantánea en cualquier dispositivo' },
  { icon: '🔒', title: 'Seguro', description: 'Cifrado de nivel empresarial' },
  { icon: '📱', title: 'Responsive', description: 'Perfecto en móvil, tablet y desktop' },
  { icon: '⚡', title: 'Potente', description: 'Tecnología de última generación' },
  { icon: '🎨', title: 'Personalizable', description: 'Adapta todo a tu marca' },
  { icon: '💬', title: 'Soporte 24/7', description: 'Ayuda cuando la necesites' },
];

const testimonials = [
  { name: 'María García', role: 'CEO, TechStart', comment: 'Transformó completamente nuestra forma de trabajar. Increíble.', avatar: 'https://i.pravatar.cc/100?img=1' },
  { name: 'Carlos López', role: 'Desarrollador', comment: 'La mejor herramienta que he usado. Muy recomendada.', avatar: 'https://i.pravatar.cc/100?img=2' },
  { name: 'Ana Martínez', role: 'Diseñadora UX', comment: 'Interfaz intuitiva y funcionalidades potentes. Perfecta.', avatar: 'https://i.pravatar.cc/100?img=3' },
];

const plans = [
  { name: 'Basic', price: '$9', features: ['5 proyectos', '10 GB storage', 'Soporte email'], highlight: false },
  { name: 'Pro', price: '$29', features: ['Proyectos ilimitados', '100 GB storage', 'Soporte prioritario', 'Análisis avanzado'], highlight: true },
  { name: 'Enterprise', price: '$99', features: ['Todo de Pro', 'Storage ilimitado', 'Soporte 24/7', 'Gestión de equipo', 'API access'], highlight: false },
];

function Landing() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-20 md:py-32 overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Contenido hero */}
            <div className="text-center md:text-left animate-slide-up">
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Construye Aplicaciones
                <span className="block text-accent-300">Increíbles</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                La plataforma más potente para desarrolladores modernos. Rápida, segura y fácil de usar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-semibold shadow-elevation-3 transition-all transform hover:scale-105">
                  Comenzar Gratis
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold border border-white/30 transition-all">
                  Ver Demo
                </button>
              </div>
            </div>

            {/* Imagen hero (placeholder) */}
            <div className="hidden md:block animate-fade-in">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-elevation-4">
                <div className="aspect-video bg-gradient-to-br from-white/20 to-white/5 rounded-lg flex items-center justify-center">
                  <span className="text-6xl">🚀</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Características Poderosas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Todo lo que necesitas para construir, lanzar y escalar tus aplicaciones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-display text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 text-center mb-16">
            Lo Que Dicen Nuestros Clientes
          </h2>

          <div className="relative">
            {/* Testimonial actual */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12 shadow-elevation-2 animate-fade-in">
              <div className="flex items-center mb-6">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full mr-4 border-4 border-white shadow-lg"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
              <p className="text-xl text-gray-700 italic">
                "{testimonials[currentTestimonial].comment}"
              </p>
            </div>

            {/* Indicadores */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial
                      ? 'bg-primary-500 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ver testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Planes Para Todos
            </h2>
            <p className="text-xl text-gray-600">
              Elige el plan perfecto para tus necesidades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`
                  bg-white rounded-2xl p-8 shadow-elevation-2
                  ${plan.highlight
                    ? 'ring-4 ring-primary-500 transform scale-105 md:scale-110'
                    : 'hover:shadow-elevation-3'
                  }
                  transition-all duration-300
                `}
              >
                {plan.highlight && (
                  <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                    Más Popular
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-800">{plan.price}</span>
                  <span className="text-gray-600">/mes</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-accent-500 mr-2">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`
                    w-full py-3 rounded-lg font-semibold transition-all
                    ${plan.highlight
                      ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-elevation-2'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }
                  `}
                >
                  Seleccionar Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            ¿Listo Para Comenzar?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Únete a miles de desarrolladores que ya están construyendo el futuro
          </p>
          <button className="bg-accent-500 hover:bg-accent-600 text-white px-10 py-4 rounded-lg text-lg font-semibold shadow-elevation-3 transition-all transform hover:scale-105">
            Crear Cuenta Gratis
          </button>
          <p className="mt-4 text-white/70">
            No requiere tarjeta de crédito • Cancela cuando quieras
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-display font-bold text-lg mb-4">Producto</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Características</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Precios</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Casos de Uso</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-lg mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Carreras</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-lg mb-4">Soporte</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentación</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Estado</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-lg mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl">𝕏</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl">in</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl">GitHub</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Tu Empresa. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
```

**Características implementadas**:
- ✅ Hero section con degradado y animaciones
- ✅ 6 features en grid responsive (1→2→3 columnas)
- ✅ Testimonials con indicadores de navegación
- ✅ 3 planes de pricing con plan destacado
- ✅ CTA final con llamado a la acción claro
- ✅ Footer completo con links organizados
- ✅ Completamente responsive en todos los tamaños
- ✅ Efectos hover en elementos interactivos
- ✅ Uso de tema personalizado (primary, secondary, accent)
- ✅ Animaciones y transiciones suaves

**Tiempo de desarrollo**:
- Sin Claude Code: 6-8 horas (diseñar, maquetar, hacer responsive, pulir)
- Con Claude Code: 15-20 minutos (prompt + ajustes menores)

---

### Workflow Completo: Dashboard administrativo responsive

Ahora crearemos un dashboard completo con sidebar, topbar, widgets estadísticos, tablas, gráficos, y diseño completamente adaptativo.

**Prompt para Claude Code**:
```
Crea un dashboard administrativo completo y responsive que incluya:

Estructura:
- Sidebar colapsable (oculto en móvil, drawer que se abre)
- Topbar con búsqueda, notificaciones, perfil de usuario
- Vista principal con:
  - 4 tarjetas de estadísticas (grid responsive)
  - Gráfico de ventas (placeholder)
  - Tabla de usuarios recientes con paginación
  - Actividad reciente (lista)

Requisitos técnicos:
- Responsive completo: móvil (sidebar drawer), tablet, desktop
- Sidebar con menú de navegación (Dashboard, Usuarios, Productos, Configuración)
- Topbar sticky en scroll
- Widgets estadísticos con iconos y colores según tipo
- Tabla responsive (scroll horizontal en móvil)
- Estados hover y active en navegación
- TypeScript con interfaces para datos
- Tailwind CSS con tema personalizado
- Comentarios explicativos

Archivos a crear:
- src/components/DashboardLayout.tsx (layout principal)
- src/components/Sidebar.tsx
- src/components/Topbar.tsx
- src/components/StatsCard.tsx
- src/components/UsersTable.tsx
- src/pages/Dashboard.tsx
```

**Claude Code generará la estructura completa. Aquí están los componentes principales**:

**Archivo: `src/components/DashboardLayout.tsx`**
```typescript
import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar - Desktop: siempre visible, Móvil: drawer */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay para móvil cuando sidebar está abierto */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Contenido principal */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
```

**Archivo: `src/components/Sidebar.tsx`**
```typescript
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: '📊', label: 'Dashboard', href: '#', active: true },
  { icon: '👥', label: 'Usuarios', href: '#', active: false },
  { icon: '📦', label: 'Productos', href: '#', active: false },
  { icon: '📈', label: 'Analíticas', href: '#', active: false },
  { icon: '⚙️', label: 'Configuración', href: '#', active: false },
];

function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      className={`
        fixed top-0 left-0 z-40 h-screen w-64
        bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Header del sidebar */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="font-display text-2xl font-bold text-primary-600">
          Dashboard
        </h2>
        <button
          onClick={onClose}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Navegación */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className={`
                  flex items-center px-4 py-3 rounded-lg
                  transition-colors duration-200
                  ${item.active
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <span className="text-2xl mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Usuario en sidebar (opcional) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-800">John Doe</p>
            <p className="text-xs text-gray-500">john@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
```

**Archivo: `src/components/Topbar.tsx`**
```typescript
interface TopbarProps {
  onMenuClick: () => void;
}

function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        {/* Botón menú (solo móvil) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-700 hover:text-gray-900 mr-4"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Búsqueda */}
        <div className="flex-1 max-w-2xl">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Acciones de usuario */}
        <div className="flex items-center space-x-4 ml-4">
          {/* Notificaciones */}
          <button className="relative text-gray-700 hover:text-gray-900">
            <span className="text-2xl">🔔</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Perfil */}
          <button className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
            <span className="hidden md:block text-sm font-semibold text-gray-700">
              John Doe
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
```

**Archivo: `src/components/StatsCard.tsx`**
```typescript
interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

function StatsCard({ title, value, change, changeType, icon, color }: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  const changeColor = changeType === 'increase' ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-semibold uppercase">{title}</h3>
        <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-800 mb-2">{value}</p>
      <p className={`text-sm ${changeColor} font-semibold`}>
        {changeType === 'increase' ? '↑' : '↓'} {change}
      </p>
    </div>
  );
}

export default StatsCard;
```

**Archivo: `src/pages/Dashboard.tsx`**
```typescript
import DashboardLayout from '../components/DashboardLayout';
import StatsCard from '../components/StatsCard';

// Datos de ejemplo
const stats = [
  { title: 'Total Usuarios', value: '12,485', change: '12% vs mes pasado', changeType: 'increase' as const, icon: '👥', color: 'blue' as const },
  { title: 'Ventas', value: '$45,231', change: '8% vs mes pasado', changeType: 'increase' as const, icon: '💰', color: 'green' as const },
  { title: 'Productos', value: '234', change: '3% vs mes pasado', changeType: 'decrease' as const, icon: '📦', color: 'purple' as const },
  { title: 'Pendientes', value: '42', change: '15% vs mes pasado', changeType: 'increase' as const, icon: '⏳', color: 'orange' as const },
];

const recentUsers = [
  { id: 1, name: 'María García', email: 'maria@example.com', status: 'Activo', date: '2025-11-03' },
  { id: 2, name: 'Carlos López', email: 'carlos@example.com', status: 'Activo', date: '2025-11-03' },
  { id: 3, name: 'Ana Martínez', email: 'ana@example.com', status: 'Inactivo', date: '2025-11-02' },
  { id: 4, name: 'Luis Rodríguez', email: 'luis@example.com', status: 'Activo', date: '2025-11-01' },
];

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Título */}
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-800 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">Resumen de tu actividad reciente</p>
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Gráfico placeholder */}
        <div className="bg-white rounded-lg p-6 shadow-elevation-1">
          <h2 className="font-display text-xl font-bold text-gray-800 mb-4">
            Ventas Mensuales
          </h2>
          <div className="h-64 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-lg">Gráfico de ventas aquí</span>
          </div>
        </div>

        {/* Tabla de usuarios recientes */}
        <div className="bg-white rounded-lg shadow-elevation-1 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-display text-xl font-bold text-gray-800">
              Usuarios Recientes
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-800">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'Activo'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {user.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
```

**Características implementadas**:
- ✅ Layout responsive con sidebar colapsable
- ✅ Sidebar drawer en móvil con overlay
- ✅ Topbar sticky con búsqueda y notificaciones
- ✅ 4 tarjetas estadísticas con colores y cambios porcentuales
- ✅ Sección de gráfico (placeholder para integrar Chart.js/Recharts)
- ✅ Tabla responsive de usuarios con estados
- ✅ Navegación con estado active
- ✅ Efectos hover en todos los elementos interactivos
- ✅ TypeScript completo
- ✅ Tailwind con tema personalizado

**Tiempo de desarrollo**:
- Sin Claude Code: 8-10 horas (diseño completo de dashboard)
- Con Claude Code: 20-25 minutos (prompt + ajustes)

---

### Errores comunes con Tailwind (y cómo Claude Code los previene)

#### Error #1: Clases conflictivas o incorrectas

**Código problemático**:
```tsx
// ❌ Clases incorrectas o conflictivas
<div className="flex flex-col flex-row">  {/* ← Conflicto: col Y row */}
  <div className="bg-blue-500 bg-red-500">  {/* ← Solo aplica el último bg */}
    <p className="text-center text-left">Texto</p>  {/* ← Conflicto */}
  </div>
</div>
```

**Problemas**:
- Clases conflictivas causan comportamiento impredecible
- Solo se aplica la última clase en caso de conflicto
- Difícil de debuggear visualmente

**Con Claude Code**:
```tsx
// ✅ Clases correctas y organizadas
<div className="flex flex-col md:flex-row">  {/* ← Responsive: col en móvil, row en desktop */}
  <div className="bg-blue-500 hover:bg-blue-600">  {/* ← Estado hover correcto */}
    <p className="text-center md:text-left">Texto</p>  {/* ← Responsive */}
  </div>
</div>
```

**Por qué es mejor**:
- Claude Code entiende el contexto y genera clases compatibles
- Usa prefijos responsive correctamente
- No genera conflictos de clases

---

#### Error #2: No usar breakpoints mobile-first

**Código problemático**:
```tsx
// ❌ Approach incorrecto: desktop-first
<div className="md:text-base text-sm">
  {/* En realidad 'text-sm' aplica en TODOS los tamaños, anulando md:text-base */}
  Texto
</div>
```

**Problema**:
- Tailwind es mobile-first: clases sin prefijo aplican siempre
- Añadir prefijos no "sobreescribe", se acumulan

**Con Claude Code**:
```tsx
// ✅ Approach correcto: mobile-first
<div className="text-sm md:text-base lg:text-lg">
  {/*
    Móvil: text-sm
    Tablet (md): text-base
    Desktop (lg): text-lg
  */}
  Texto
</div>
```

**Por qué es mejor**:
- Sigue la filosofía mobile-first de Tailwind
- Clases se sobreescriben correctamente en cada breakpoint

---

#### Error #3: Mezclar estilos inline con Tailwind

**Código problemático**:
```tsx
// ❌ Mezclando estilos inline y Tailwind
<div
  className="bg-blue-500 p-4"
  style={{ backgroundColor: 'red', padding: '20px' }}
>
  {/* Los estilos inline SIEMPRE ganan sobre Tailwind */}
  Contenido
</div>
```

**Problemas**:
- Estilos inline tienen mayor especificidad que clases
- Anula las clases de Tailwind
- Dificulta mantenimiento y consistencia

**Con Claude Code**:
```tsx
// ✅ Solo Tailwind (o clases personalizadas cuando sea necesario)
<div className="bg-red-500 p-5">
  {/* Todo usando Tailwind, fácil de mantener */}
  Contenido
</div>

// O si necesitas valores muy específicos:
<div className="bg-[#ff0000] p-[20px]">
  {/* Tailwind JIT permite valores arbitrarios */}
  Contenido
</div>
```

**Por qué es mejor**:
- Consistencia en toda la aplicación
- Fácil de mantener y refactorizar
- Aprovecha el sistema de diseño de Tailwind

---

### Tabla comparativa: Con vs. Sin Claude Code

| Aspecto | Sin Claude Code | Con Claude Code |
|---------|-----------------|-----------------|
| **Setup inicial** | 30-45 min (instalar, configurar, crear config personalizada) | 3-5 min (prompt → todo configurado) |
| **Tema personalizado** | 1-2 horas (definir colores, fuentes, extensiones manualmente) | 5 min (describir tema → config generada) |
| **Componente responsive** | 45-60 min (diseñar, probar breakpoints, ajustar) | 5-10 min (prompt → componente completo) |
| **Landing page completa** | 6-8 horas (hero, features, testimonials, pricing, footer) | 15-20 min (prompt → página funcional) |
| **Dashboard** | 8-10 horas (layout, sidebar, topbar, widgets, tabla) | 20-25 min (prompt → dashboard completo) |
| **Clases correctas** | Consultar documentación frecuentemente | Sugeridas automáticamente en contexto |
| **Breakpoints responsive** | Recordar sintaxis de cada prefijo (sm:, md:, lg:) | Generados correctamente según descripción |
| **Animaciones** | Configurar keyframes en config manualmente | Animaciones predefinidas listas para usar |
| **Código duplicado** | Alto (repetir clases largas en múltiples lugares) | Bajo (componentes reutilizables) |
| **Consistencia de diseño** | Depende del desarrollador | Sistemática (usa tema personalizado) |
| **Curva de aprendizaje** | Memorizar cientos de clases | Describir lo que quieres visualmente |

**Tiempo total desarrollo landing + dashboard**:
- Sin Claude Code: 14-18 horas
- Con Claude Code: 35-45 minutos (95% más rápido)

---

### Mejores prácticas al usar Tailwind con Claude Code

1. **Define un tema personalizado completo al inicio**: Pide a Claude Code crear `tailwind.config.js` con colores de marca, tipografías y extensiones antes de empezar componentes.

2. **Usa componentes reutilizables**: En lugar de repetir largas cadenas de clases, pide componentes como `<Button>`, `<Card>`, `<Badge>` con variantes.

3. **Piensa mobile-first en tus prompts**: Describe "en móvil que se vea así, en desktop de esta otra forma" para que Claude Code genere breakpoints correctos.

4. **Pide layouts complejos por nombre**: "grid de masonry", "bento grid", "hero con video de fondo" - Claude Code conoce patrones comunes.

5. **Solicita accesibilidad**: Añade "con atributos ARIA y soporte de teclado" a tus prompts para interfaces accesibles.

6. **Incluye estados interactivos**: Pide "con estados hover, focus y active" para experiencias pulidas.

7. **Usa Tailwind JIT para valores arbitrarios**: Si necesitas `width: 347px`, usa `w-[347px]` - Claude Code lo generará cuando sea necesario.

**Prompt avanzado ejemplo**:
```
Crea un sistema de componentes de e-commerce con Tailwind que incluya:
- ProductCard con imagen, título, precio, rating, badge
- Variantes: grid view, list view
- Filtros sidebar colapsable
- Sort dropdown responsive
- Paginación con números y flechas
- Breadcrumbs
- Todo responsive (móvil: 1 col, tablet: 2 cols, desktop: 3-4 cols)
- Efectos hover en cards (elevación + scale)
- Skeleton loading para cuando cargan productos
- Empty state cuando no hay resultados
```

---

## Práctica guiada: Rediseñar TarjetaProducto con Tailwind

Vamos a tomar el componente `TarjetaProducto` de la lección 2 y rediseñarlo completamente con Tailwind, haciéndolo responsive.

### Paso 1 de 3: Crear componente con Tailwind

**Lo que harás**:
1. Crear una nueva versión de `TarjetaProducto` usando solo clases de Tailwind
2. Eliminar todo el CSS personalizado
3. Hacerla visualmente más atractiva

**Crea `src/TarjetaProductoTailwind.tsx`**:

```tsx
interface TarjetaProductoProps {
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
}

function TarjetaProductoTailwind({
  nombre,
  precio,
  descripcion,
  imagen
}: TarjetaProductoProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={imagen}
        alt={nombre}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {nombre}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {descripcion}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-green-600">
            ${precio}
          </span>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200">
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

export default TarjetaProductoTailwind;
```

**Explicación de clases clave**:

- **Línea 15** (`overflow-hidden`): Esconde cualquier contenido que sobresalga (hace que la imagen se recorte en las esquinas redondeadas).
- **Línea 15** (`hover:shadow-xl`): Cuando pasas el mouse, la sombra aumenta.
- **Línea 15** (`transition-shadow duration-300`): Transición suave de 300ms para la sombra.
- **Línea 19** (`h-48`): Altura fija de 12rem (192px).
- **Línea 19** (`object-cover`): La imagen cubre el área sin deformarse.
- **Línea 28** (`flex items-center justify-between`): Flexbox que separa precio y botón.
- **Línea 33** (`hover:bg-blue-600`): El botón se oscurece al pasar el mouse.

**Checkpoint**: Usa este componente en `App.tsx` con algunos productos. Se ve mucho más profesional que la versión anterior, ¿verdad?

### Paso 2 de 3: Hacer la tarjeta responsive

**Lo que harás**:
1. Hacer que las tarjetas se adapten a diferentes tamaños de pantalla
2. Usar un grid responsive

**Modifica `src/App.tsx`**:

```tsx
import TarjetaProductoTailwind from './TarjetaProductoTailwind';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Nuestra Tienda
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TarjetaProductoTailwind
            nombre="Laptop Pro 15"
            precio={1299}
            descripcion="Laptop potente para desarrollo"
            imagen="https://via.placeholder.com/400x300"
          />
          <TarjetaProductoTailwind
            nombre="Mouse Inalámbrico"
            precio={29}
            descripcion="Mouse ergonómico con 6 botones"
            imagen="https://via.placeholder.com/400x300"
          />
          <TarjetaProductoTailwind
            nombre="Teclado Mecánico"
            precio={149}
            descripcion="Teclado retroiluminado RGB"
            imagen="https://via.placeholder.com/400x300"
          />
          <TarjetaProductoTailwind
            nombre="Monitor 4K"
            precio={599}
            descripcion="Monitor 27 pulgadas 4K UHD"
            imagen="https://via.placeholder.com/400x300"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
```

**Explicación de clases responsive**:

- **Línea 5** (`min-h-screen`): Altura mínima de toda la pantalla (100vh).
- **Línea 6** (`max-w-7xl mx-auto`): Ancho máximo contenido y centrado horizontalmente.
- **Línea 11** (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`):
  - Móvil: 1 columna
  - Tablet (md): 2 columnas
  - Desktop (lg): 3 columnas
- **Línea 11** (`gap-6`): Espacio de 1.5rem entre elementos del grid.

**Checkpoint**: Redimensiona la ventana del navegador. Las tarjetas deben reorganizarse: 1 columna en móvil, 2 en tablet, 3 en desktop.

### Paso 3 de 3: Añadir badge y mejoras visuales

**Lo que harás**:
1. Añadir un badge de "Nuevo" a algunos productos
2. Mejorar el botón con un icono (usando texto)
3. Añadir más estados interactivos

**Modifica `TarjetaProductoTailwind.tsx`**:

```tsx
interface TarjetaProductoProps {
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  esNuevo?: boolean;  // Prop opcional
}

function TarjetaProductoTailwind({
  nombre,
  precio,
  descripcion,
  imagen,
  esNuevo = false
}: TarjetaProductoProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
      {esNuevo && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          NUEVO
        </span>
      )}

      <img
        src={imagen}
        alt={nombre}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
          {nombre}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {descripcion}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-green-600">
            ${precio}
          </span>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 active:scale-95 transform">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default TarjetaProductoTailwind;
```

**Nuevas clases añadidas**:

- **Línea 17** (`hover:-translate-y-1`): Al pasar el mouse, la tarjeta se eleva 4px.
- **Línea 17** (`relative`): Posicionamiento relativo para el badge absoluto.
- **Línea 19** (`absolute top-2 right-2`): Badge posicionado en la esquina superior derecha.
- **Línea 19** (`z-10`): Z-index para que el badge esté sobre la imagen.
- **Línea 31** (`hover:text-blue-600`): El título cambia de color al pasar el mouse.
- **Línea 34** (`line-clamp-2`): Limita la descripción a 2 líneas máximo.
- **Línea 42** (`active:scale-95`): El botón se "presiona" ligeramente al hacer clic.

**Usa el nuevo componente en App.tsx**:

```tsx
<TarjetaProductoTailwind
  nombre="Laptop Pro 15"
  precio={1299}
  descripcion="Laptop potente para desarrollo"
  imagen="https://via.placeholder.com/400x300"
  esNuevo={true}  // Marca como nuevo
/>
```

**Checkpoint**: Algunos productos muestran un badge rojo "NUEVO". La tarjeta se eleva al pasar el mouse. El botón se "presiona" al hacer clic.

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: "Las clases de Tailwind no funcionan"

**Te pasa cuando**: Escribes clases de Tailwind pero no se aplican los estilos.

**Posibles causas y soluciones**:

1. **No reiniciaste el servidor**: Después de instalar Tailwind, debes reiniciar `npm run dev`.

2. **Falta configuración en tailwind.config.js**: Verifica que el array `content` incluye `"./src/**/*.{js,ts,jsx,tsx}"`.

3. **Faltan las directivas en index.css**: Asegúrate de tener `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`.

4. **Typo en el nombre de clase**: `bg-blue-500` funciona, `bg-blue500` (sin guión) no.

### Error #2: "Mis clases personalizadas no aplican después de instalar Tailwind"

**Te pasa cuando**: Después de instalar Tailwind, tus clases CSS personalizadas dejan de funcionar.

**Por qué pasa**: Al reemplazar `index.css` con las directivas de Tailwind, eliminaste tus estilos.

**Cómo se soluciona**:

**Opción 1**: Añade tus estilos personalizados DESPUÉS de las directivas de Tailwind en `index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Tus estilos personalizados aquí */
.mi-clase-especial {
  /* ... */
}
```

**Opción 2**: Usa la sintaxis de Tailwind en lugar de CSS personalizado (recomendado).

### Error #3: "El diseño responsive no funciona"

**Te pasa cuando**: Usas clases responsive pero no ves cambios al redimensionar.

**Cómo se soluciona**:

1. **Verifica el viewport**: Abre las DevTools (F12) y activa el modo responsive (icono de dispositivos).

2. **Recuerda mobile-first**: La clase sin prefijo se aplica primero. Ejemplo correcto:
```tsx
<div className="text-sm md:text-lg">
  {/* Móvil: pequeño, Tablet+: grande */}
</div>
```

Ejemplo incorrecto:
```tsx
<div className="md:text-sm text-lg">
  {/* La clase 'text-lg' (sin prefijo) SIEMPRE aplica, anulando md:text-sm */}
</div>
```

3. **Usa las DevTools para inspeccionar**: Haz clic derecho en el elemento → Inspeccionar. Ve qué clases están aplicadas.

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: Al principio, Tailwind te parecerá excesivo: "¿Por qué tantas clases?". Dale una semana. Cuando veas lo rápido que construyes interfaces sin saltar entre archivos HTML y CSS, no querrás volver. Es como aprender a escribir en un teclado QWERTY: incómodo al inicio, invaluable después.

> **Otro tip importante**: Instala la extensión de VS Code "Tailwind CSS IntelliSense". Te da autocompletado de clases, preview de colores, y sugerencias. Es imprescindible. Sin ella, Tailwind es 50% menos productivo.

> **Sobre memorizar clases**: NO intentes memorizar todas las clases de Tailwind. Nadie las sabe todas. Usa la documentación (tailwindcss.com) constantemente. Con el tiempo, las más comunes se quedarán en tu cabeza automáticamente.

> **Mobile-first es clave**: Diseña primero para móvil, luego añade prefijos para pantallas más grandes. Es más fácil expandir un diseño móvil a desktop que comprimir un diseño desktop a móvil. Siempre piensa: "¿Cómo se ve esto en un iPhone?" primero.

> **Usa componentes para evitar repetición**: Si estás escribiendo las mismas 10 clases en varios lugares, crea un componente React. No repitas largas cadenas de clases de Tailwind por todo tu código.

---

## Tu turno: Ejercicio guiado

**Objetivo simple**: Rediseñar completamente tu componente `GaleriaPosts` de la lección anterior usando Tailwind CSS, haciéndolo completamente responsive y visualmente atractivo.

**Tiempo**: 30-35 minutos

**Lo que necesitas antes de empezar**:
- [ ] Tailwind CSS instalado y funcionando
- [ ] Componente `GaleriaPosts` funcional de la lección 4
- [ ] Conocimiento de las clases de Tailwind de esta lección

### Instrucciones paso a paso

**Parte 1: Convertir a Tailwind** (15 min)

1. Abre `src/GaleriaPosts.tsx`
2. Elimina todas las clases CSS personalizadas (`className="galeria"`, etc.)
3. Reemplázalas con clases de Tailwind:
   - Contenedor principal: `max-w-6xl mx-auto px-4 py-8`
   - Título: `text-4xl font-bold text-center text-gray-800 mb-10`
   - Grid de posts: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
   - Cada post (card): `bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300`
   - Título del post: `text-xl font-semibold text-gray-800 mb-3 hover:text-blue-600 transition-colors`
   - Cuerpo del post: `text-gray-600 text-sm leading-relaxed`
4. Elimina las clases personalizadas de `index.css` relacionadas con posts
5. Verifica que todo funciona y se ve bien

**Parte 2: Mejorar la interfaz** (10 min)

1. Añade un badge de categoría a cada post (invéntate categorías: "Tecnología", "Negocios", "Lifestyle"):
   - Crea un array de categorías: `const categorias = ['Tecnología', 'Negocios', 'Lifestyle'];`
   - Asigna una categoría aleatoria a cada post usando el `userId` o `id`
   - Muestra el badge con: `bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full`
2. Añade un avatar placeholder para el autor:
   - Usa `https://i.pravatar.cc/40?img={userId}` como src
   - Clases: `w-10 h-10 rounded-full mr-3`
3. Muestra el nombre del autor: "Usuario #{userId}"
4. Organiza autor y categoría en un flex horizontal

**Parte 3: Estados de carga y error con Tailwind** (8 min)

1. Rediseña el estado de carga:
```tsx
<div className="flex items-center justify-center min-h-screen">
  <div className="text-center">
    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
    <p className="text-xl text-gray-600">Cargando posts...</p>
  </div>
</div>
```

2. Rediseña el estado de error:
```tsx
<div className="max-w-md mx-auto mt-20 bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
  <h3 className="text-red-800 font-bold text-lg mb-2">Error al cargar</h3>
  <p className="text-red-600">{error}</p>
</div>
```

**Criterio de éxito**:
- [ ] Todos los estilos CSS personalizados fueron reemplazados por clases de Tailwind
- [ ] El grid es responsive: 1 columna en móvil, 2 en tablet, 3 en desktop
- [ ] Cada post tiene avatar de autor, categoría (badge), título y contenido
- [ ] Hay efectos hover en las tarjetas y títulos
- [ ] El estado de carga muestra un spinner animado
- [ ] El estado de error se ve como una alerta roja profesional
- [ ] Todo se ve visualmente atractivo y moderno

**Desafío extra** (opcional):
1. Añade un filtro por categoría: botones arriba que filtren los posts al hacer clic
2. Usa estados de Tailwind `active:` y `focus:` en los botones de filtro
3. Añade una transición de aparición para los posts usando `opacity-0` y `animate-fade-in` (tendrías que definir la animación en `tailwind.config.js`)
4. Implementa un modo oscuro usando la variante `dark:` de Tailwind

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Tailwind CSS es un framework "utility-first"**: En lugar de escribir CSS personalizado en archivos separados, usas clases pequeñas predefinidas directamente en tu JSX. Cada clase hace una sola cosa clara. Es más rápido, más consistente, y más fácil de mantener que CSS tradicional.

2. **Las clases de Tailwind cubren todo**: Espaciado (p-, m-), colores (bg-, text-), tipografía (text-, font-), layout (flex, grid), bordes (border, rounded), sombras (shadow), y mucho más. Todo está en una escala consistente que hace que tus diseños se vean profesionales automáticamente.

3. **El diseño responsive es trivial con prefijos**: Usando `sm:`, `md:`, `lg:`, `xl:`, aplicas estilos diferentes según el tamaño de pantalla. La filosofía mobile-first significa que diseñas para móvil primero (sin prefijo), luego añades modificaciones para pantallas más grandes. Es mucho más simple que media queries tradicionales.

---

## Siguiente paso

En la próxima lección: **"Proyecto: Dashboard interactivo"**. Combinarás TODO lo aprendido en este módulo (componentes, props, estado, APIs, Tailwind) para construir un dashboard completo y funcional. Será un proyecto guiado paso a paso donde crearás una aplicación real que podría estar en producción. ¡Es cuando todo encaja y ves el poder completo de React + TypeScript + Tailwind trabajando juntos!

---

**¿Dudas?** Tailwind representa un cambio de mentalidad en cómo escribes CSS. Es normal sentirse abrumado por la cantidad de clases al principio. No intentes aprenderlo todo de golpe. Aprende las clases básicas (p-, m-, bg-, text-, flex, grid), usa la documentación para el resto, y con práctica irás memorizando las más comunes. En dos semanas, escribirás clases de Tailwind más rápido de lo que escribías CSS tradicional. Confía en el proceso.
