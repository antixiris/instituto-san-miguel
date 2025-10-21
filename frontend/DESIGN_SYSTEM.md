# Sistema de Diseño Celestial - Instituto San Miguel

## Narrativa Filosófica: "La Batalla de San Miguel"

> **San Miguel = Superinteligencia que domina el lenguaje**
>
> El lenguaje es la espada/lanza que vence la confusión y la ignorancia.
> Este diseño representa la batalla entre la luz del conocimiento y la oscuridad de la ignorancia.

---

## Paleta de Colores Celestial

### Colores Primarios

```css
--gold: #D4AF37;           /* Oro bizantino - halo, excelencia */
--ultramarine: #1E3A8A;    /* Azul profundo - conocimiento, cielo */
```

### Colores de Acción

```css
--azure: #3B82F6;          /* Azul brillante - CTAs secundarios */
--amber: #F59E0B;          /* Ámbar - advertencias, atención */
--success: #10B981;        /* Verde - victoria, conocimiento adquirido */
```

### Neutrales

```css
--light: #F8FAFC;          /* Casi blanco - luz, claridad */
--slate-50 a slate-900     /* Escala de grises equilibrada */
```

**PROHIBIDO usar:**
- Terracota (#DA7756) - color de Claude.ai
- Beige (#F5F0EB) - color de Claude.ai
- Cualquier combinación similar

---

## Tipografía Protagonista

### Sistema de Fuentes

```css
/* Serif principal - Headlines dramáticas */
font-family: 'Spectral', Georgia, serif;

/* Sans-serif - Body, UI */
font-family: 'Inter', system-ui, sans-serif;

/* Monospace - Código */
font-family: 'JetBrains Mono', monospace;
```

### Escala Tipográfica

```css
--text-7xl: 4.5rem;   /* 72px - Hero display */
--text-6xl: 3.75rem;  /* 60px - Hero titles */
--text-5xl: 3rem;     /* 48px */
--text-4xl: 2.25rem;  /* 36px - Section headings */
--text-3xl: 1.875rem; /* 30px - h2 */
--text-2xl: 1.5rem;   /* 24px - h3 */
--text-xl: 1.25rem;   /* 20px - subheadings */
--text-lg: 1.125rem;  /* 18px - intro paragraphs */
--text-base: 1rem;    /* 16px - body */
```

### Uso Correcto

```tsx
// Headlines - Spectral (dramáticas, serif)
<h1 className="font-display text-6xl font-bold">Título Principal</h1>

// Body - Inter (legible, sans-serif)
<p className="text-base leading-relaxed">Texto de cuerpo</p>

// Intro/Lead - Inter, tamaño mayor
<p className="lead">Párrafo introductorio destacado</p>
```

---

## Componentes UI Rediseñados

### Button

```tsx
import { Button } from '@/components/ui/Button';

// Variantes disponibles
<Button variant="primary">CTA Dorado</Button>
<Button variant="secondary">Azure</Button>
<Button variant="outline">Borde Dorado</Button>
<Button variant="ghost">Sutil</Button>
<Button variant="dark">Oscuro</Button>

// Tamaños
<Button size="sm">Pequeño</Button>
<Button size="md">Mediano (default)</Button>
<Button size="lg">Grande</Button>
<Button size="xl">Extra grande</Button>

// Con iconos
<Button leftIcon={<BookOpen />}>Con icono izquierdo</Button>
<Button rightIcon={<ArrowRight />}>Con icono derecho</Button>
```

### Card

```tsx
import Card, { CardHeader, CardBody, CardFooter } from '@/components/ui/Card';

// Variantes
<Card variant="base">Card básica</Card>
<Card variant="illuminated">Con efecto glow dorado al hover</Card>
<Card variant="elevated">Con sombra celestial</Card>

// Estructura semántica
<Card variant="illuminated">
  <CardHeader title="Título" subtitle="Subtítulo" />
  <CardBody>
    Contenido principal
  </CardBody>
  <CardFooter>
    Footer opcional
  </CardFooter>
</Card>
```

### Badge

```tsx
import { Badge } from '@/components/ui/Badge';

<Badge variant="gold">Excelencia</Badge>
<Badge variant="azure">Información</Badge>
<Badge variant="success">Completado</Badge>
<Badge variant="amber">Advertencia</Badge>
<Badge variant="slate">Neutral</Badge>

// Con iconos
<Badge variant="gold" leftIcon={<Award />}>Destacado</Badge>
```

### Input

```tsx
import { Input } from '@/components/ui/Input';

<Input
  label="Email"
  placeholder="tu@email.com"
  error="Campo requerido"
  leftIcon={<Mail />}
/>
```

---

## Red Neuronal Celestial

Componente de fondo animado que representa la arquitectura de IA como constelación celestial.

```tsx
import NeuralNetwork from '@/components/NeuralNetwork';

// En Hero sections
<section className="relative">
  <NeuralNetwork className="absolute inset-0 opacity-40" nodeCount={60} animate />
  <div className="relative z-10">
    {/* Contenido sobre la red neuronal */}
  </div>
</section>
```

**Parámetros:**
- `nodeCount`: Número de nodos (default: 50)
- `connectionDistance`: Distancia máxima de conexión (default: 150)
- `animate`: Activar animación (default: true)

**Colores:**
- Nodos core (20%): Dorados con glow
- Nodos normales: Azure/Ultramarine
- Conexiones: Gold (core-core), Azure (core-normal), Ultramarine (normal-normal)

---

## Animaciones "Momentos de Iluminación"

### Scroll Reveal - "Emergiendo de la oscuridad"

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Contenido que aparece al hacer scroll
</motion.div>
```

### Hover States - "Iluminación al contacto"

Ya implementado en componentes Button y Card.

```css
.card-illuminated:hover {
  border-color: var(--gold);
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.3); /* Gold glow */
  transform: translateY(-4px);
}
```

### Enlaces de Navegación con Underline Dorado

```tsx
<Link to="/academia" className="nav-link">
  Academia
</Link>
```

Automáticamente incluye underline dorado animado al hover.

---

## Layout y Estructura

### Navegación - "La Espada Superior"

```tsx
import Navbar from '@/components/Navbar';

// Ya incluye:
// - Logo conceptual (triángulo ascendente + circuito neural)
// - Links con underline dorado animado
// - CTA "Aplica Ahora" con icono de espada
// - Scroll detection (backdrop blur cuando scrolled)
```

### Footer - "La Fundación Oscura"

```tsx
import Footer from '@/components/Footer';

// Background slate-900, texto slate-300
// Secciones: Academia | I+D | Soluciones | Newsletter
// Social links con hover dorado
```

### Containers

```tsx
// Container estándar (max-w-7xl)
<div className="container-custom">...</div>

// Container estrecho (max-w-4xl)
<div className="container-narrow">...</div>

// Container ancho (max-w-[1400px])
<div className="container-wide">...</div>
```

### Sections

```tsx
<section className="section">...</section>        // py-16 md:py-20 lg:py-24
<section className="section-sm">...</section>     // py-12 md:py-16
<section className="section-lg">...</section>     // py-20 md:py-28 lg:py-32
```

---

## Tres Pilares - Grid Especializado

```tsx
<div className="three-pillars-grid">
  <div>Academia</div>
  <div>I+D</div>
  <div>Soluciones</div>
</div>
```

Automáticamente responsive: 1 columna (mobile) → 3 columnas (desktop)

---

## Gradientes Celestiales

```tsx
// Background gradientes
<div className="bg-gradient-celestial">...</div>     // Ultramarine → Slate-900
<div className="bg-gradient-hero">...</div>          // Slate-900 → Slate-700
<div className="bg-gradient-gold">...</div>          // Gold → Gold-600
<div className="bg-gradient-azure">...</div>         // Azure → Ultramarine

// Gradientes de texto
<span className="text-gradient-gold">Texto dorado</span>
<span className="text-gradient-azure">Texto azure</span>
```

---

## Sombras con Glow

```tsx
// Glow dorado
<div className="shadow-glow-gold">...</div>       // 20px blur
<div className="shadow-glow-gold-sm">...</div>    // 10px blur
<div className="shadow-glow-gold-lg">...</div>    // 30px blur

// Glow azure
<div className="shadow-glow-azure">...</div>

// Sombras celestiales (combinadas)
<div className="shadow-celestial">...</div>       // Ultramarine + Gold sutil
<div className="shadow-elevated">...</div>        // Ultramarine + Gold más intenso
```

---

## Iconografía Abstracta "Miguel"

**Evitar iconos genéricos de Font Awesome/Heroicons.**

Usar elementos geométricos abstractos:
1. **Ala estilizada** → Triángulos expansivos
2. **Espada/Lanza** → Líneas verticales potentes (`<Sword />` de Lucide)
3. **Balanza** → Simetría con tensión
4. **Luz radiante** → Gradientes radiales sutiles

---

## Accesibilidad WCAG AAA

### Focus States

```css
*:focus-visible {
  outline: none;
  ring: 2px solid var(--gold);
  ring-offset: 2px;
}
```

### Contraste de Color

- Texto oscuro (slate-900) sobre fondo claro (white/light)
- Texto claro (white/slate-300) sobre fondo oscuro (slate-900)
- Todos los CTAs tienen ratio de contraste >7:1

### Reducción de Movimiento

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance

### Optimizaciones Implementadas

1. **Fuentes optimizadas**: Google Fonts con `display=swap`
2. **Lazy loading**: Componente NeuralNetwork solo renderiza cuando visible
3. **Animaciones eficientes**: Uso de `transform` y `opacity` (GPU-accelerated)
4. **CSS Custom Properties**: Variables para temas reutilizables

### Core Web Vitals Targets

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

---

## Próximos Pasos

Para completar la transformación, se recomienda:

1. **Actualizar páginas de autenticación** (Login/Register) con estética celestial
2. **Rediseñar catálogo de cursos** con filtros y cards illuminated
3. **Crear página de detalle de curso** con sidebar sticky y accordion
4. **Implementar páginas de I+D** (líneas de investigación, publicaciones, equipo)
5. **Crear páginas de Soluciones B2B** (servicios, casos de éxito, partners)
6. **Añadir animaciones de página** con Framer Motion
7. **Implementar dark mode** (opcional, preparado en CSS)

---

## Recursos

- **Paleta de colores**: Tailwind config extendido
- **Componentes**: `/src/components/ui/`
- **Estilos globales**: `/src/index.css`
- **Ejemplos de uso**: `/src/pages/public/HomePage.tsx`

---

## Contacto

Para preguntas sobre el sistema de diseño, contacta al equipo de desarrollo.

**Última actualización**: Enero 2025
