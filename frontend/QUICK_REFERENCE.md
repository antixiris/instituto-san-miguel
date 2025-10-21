# Quick Reference Guide
## Minimalist Design System - Instituto San Miguel

---

## 🎨 Color Tokens

```css
/* Neutral (Foundation) */
neutral-50   /* #FAFAF9 - Almost white */
neutral-100  /* #F5F5F4 - Very light */
neutral-200  /* #E7E5E4 - Borders */
neutral-600  /* #57534E - Secondary text */
neutral-900  /* #1C1917 - Primary text */

/* Accent (Highlights) */
accent       /* #EA580C - Orange */
accent-50    /* #FFF7ED - Backgrounds */
accent-600   /* #EA580C - Default */

/* Semantic (Information) */
semantic     /* #6366F1 - Blue */
semantic-50  /* #EEF2FF - Backgrounds */
semantic-600 /* #4F46E5 - Default */

/* System */
success      /* #10B981 - Green */
warning      /* #F59E0B - Yellow */
error        /* #EF4444 - Red */
```

---

## 📝 Typography

```tsx
// Headings (all Inter, semibold)
<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
  Main headline
</h1>

<h2 className="text-3xl md:text-4xl font-semibold">
  Section title
</h2>

<h3 className="text-2xl md:text-3xl font-semibold">
  Card title
</h3>

// Body text
<p className="text-base text-neutral-700">
  Body text, 16px, neutral-700
</p>

// Lead paragraph
<p className="text-lg md:text-xl text-neutral-600">
  Larger intro text
</p>

// Small text
<p className="text-sm text-neutral-600">
  Secondary info
</p>
```

---

## 🔘 Button Variants

```tsx
import Button from '@/components/ui/Button';

// Primary (dark background)
<Button variant="primary" size="lg">
  Get started
</Button>

// Secondary (white with border)
<Button variant="secondary" size="md">
  Learn more
</Button>

// Accent (orange)
<Button variant="accent" size="md">
  Highlight action
</Button>

// Ghost (transparent)
<Button variant="ghost" size="sm">
  Subtle action
</Button>

// Link style
<Button variant="link" size="sm">
  Text link
</Button>
```

---

## 📦 Card Variants

```tsx
import Card, { CardBody } from '@/components/ui/Card';

// Basic card
<Card variant="base">
  <CardBody>
    Content
  </CardBody>
</Card>

// Interactive card with hover
<Card variant="hover">
  <CardBody>
    Clickable content
  </CardBody>
</Card>

// Custom styling
<div className="card-hover">
  <div className="card-body">
    Manual card structure
  </div>
</div>
```

---

## 🏷️ Badge Variants

```tsx
import Badge from '@/components/ui/Badge';

// Neutral (gray)
<Badge variant="neutral">Standard</Badge>

// Accent (orange)
<Badge variant="accent">Important</Badge>

// Semantic (blue)
<Badge variant="semantic">Information</Badge>

// Success (green)
<Badge variant="success">Completed</Badge>

// With icons
<Badge variant="accent" leftIcon={<Icon />}>
  With icon
</Badge>
```

---

## ✨ Token Animations

```tsx
import {
  TokenAnimation,
  SemanticShift,
  FadeInWords,
  LetterByLetter
} from '@/components/TokenAnimation';

// Words appearing as tokens
<TokenAnimation
  text="Research destroys ignorance"
  speed={50}
  delay={0}
/>

// Words transforming semantically
<SemanticShift
  words={['ignorance', 'uncertainty', 'confusion']}
  interval={3000}
/>

// Words fading in sequentially
<FadeInWords
  text="The word as unit, language as system"
  stagger={100}
  delay={200}
/>

// Typing effect
<LetterByLetter
  text="Natural Language Processing"
  speed={30}
/>
```

---

## 📐 Spacing

```tsx
// Section spacing
<section className="section">           {/* py-12 md:py-16 lg:py-20 */}
<section className="section-sm">        {/* py-8 md:py-12 */}
<section className="section-lg">        {/* py-16 md:py-24 lg:py-32 */}

// Container widths
<div className="container-custom">      {/* max-w-7xl */}
<div className="container-narrow">      {/* max-w-3xl */}
<div className="container-wide">        {/* max-w-[1400px] */}

// Common gaps
<div className="space-y-4">   {/* 16px vertical gap */}
<div className="space-y-6">   {/* 24px vertical gap */}
<div className="space-y-8">   {/* 32px vertical gap */}

<div className="gap-3">       {/* 12px gap in flex/grid */}
<div className="gap-6">       {/* 24px gap in flex/grid */}
```

---

## 🎭 Common Patterns

### Hero Section
```tsx
<section className="section-lg bg-white border-b border-neutral-100">
  <div className="container-narrow text-center">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 mb-6">
      Main headline
    </h1>
    <p className="text-lg md:text-xl text-neutral-600 mb-10">
      Supporting text
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button variant="primary" size="lg">Primary CTA</Button>
      <Button variant="secondary" size="lg">Secondary CTA</Button>
    </div>
  </div>
</section>
```

### Three Column Grid
```tsx
<div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
  <Card variant="hover">
    <CardBody>
      <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">Title</h3>
      <p className="text-sm text-neutral-600">Description</p>
    </CardBody>
  </Card>
</div>
```

### List Item Card
```tsx
<div className="space-y-4">
  <div className="card-hover group cursor-pointer">
    <div className="p-6 flex items-start justify-between">
      <div className="flex-1">
        <h3 className="text-base font-medium text-neutral-900 mb-1 group-hover:text-accent transition-colors">
          Item title
        </h3>
        <p className="text-sm text-neutral-600">
          Metadata
        </p>
      </div>
      <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
    </div>
  </div>
</div>
```

---

## 🎨 Shadow Utilities

```css
.shadow-minimal  /* 0 1px 3px rgba(0, 0, 0, 0.08) */
.shadow-soft     /* 0 2px 8px rgba(0, 0, 0, 0.06) */
.shadow-sm       /* Tailwind default small */
.shadow-md       /* Tailwind default medium */
```

---

## ⚡ Animation Classes

```css
/* Reveal animations */
.reveal          /* Fade + slide up */
.fade-reveal     /* Fade only */

/* Usage */
<div className="reveal">
  {/* Add 'revealed' class via JS when in viewport */}
</div>

/* Token delays */
.token-1         /* 50ms delay */
.token-2         /* 100ms delay */
...
.token-10        /* 500ms delay */

/* Element delays */
.delay-100       /* 100ms */
.delay-200       /* 200ms */
.delay-300       /* 300ms */
```

---

## 🔍 Focus States

```tsx
// All interactive elements automatically get:
focus:outline-none
focus:ring-2
focus:ring-accent-600
focus:ring-offset-2
```

---

## 📱 Responsive Utilities

```css
/* Hide on mobile */
.hide-mobile

/* Show only on mobile */
.show-mobile

/* Responsive text */
<h1 className="text-3xl md:text-4xl lg:text-5xl">

/* Responsive spacing */
<div className="p-4 md:p-6 lg:p-8">
```

---

## 🎯 Common Color Combinations

```tsx
// Primary text on white
className="text-neutral-900 bg-white"

// Secondary text on white
className="text-neutral-600 bg-white"

// Interactive element
className="text-neutral-700 hover:text-neutral-900"

// Accent highlight
className="text-accent-600"

// Subtle background
className="bg-neutral-50"

// Border
className="border border-neutral-200"

// Hover border
className="border border-neutral-200 hover:border-neutral-300"
```

---

## ⚙️ Custom CSS Variables

```css
:root {
  --header-height: 4rem;
  --color-accent: #EA580C;
  --color-semantic: #6366F1;
  --transition-fast: 150ms;
  --transition-base: 250ms;
  --transition-slow: 400ms;
}
```

---

## 📊 Grid Layouts

```tsx
// Two columns
<div className="grid md:grid-cols-2 gap-6">

// Three columns (equal)
<div className="grid md:grid-cols-3 gap-6">

// Responsive columns (1 on mobile, 2 on tablet, 3 on desktop)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Asymmetric (1-2 ratio)
<div className="grid md:grid-cols-3 gap-8">
  <div className="md:col-span-1">Sidebar</div>
  <div className="md:col-span-2">Main content</div>
</div>
```

---

## 🚀 Performance Tips

```tsx
// Lazy load animations
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}  // Only animate once
  transition={{ duration: 0.4 }}
>
  Content
</motion.div>

// Respect reduced motion
@media (prefers-reduced-motion: reduce) {
  // All animations automatically disabled
}
```

---

## 🎨 Design Tokens Summary

| Token | Value | Usage |
|-------|-------|-------|
| **Text Colors** |
| `neutral-900` | #1C1917 | Primary text |
| `neutral-700` | #44403C | Body text |
| `neutral-600` | #57534E | Secondary text |
| `neutral-400` | #A8A29E | Disabled text |
| **Backgrounds** |
| `white` | #FFFFFF | Primary bg |
| `neutral-50` | #FAFAF9 | Secondary bg |
| `neutral-100` | #F5F5F4 | Tertiary bg |
| **Borders** |
| `neutral-200` | #E7E5E4 | Default border |
| `neutral-300` | #D6D3D1 | Hover border |
| **Accents** |
| `accent-600` | #EA580C | Primary accent |
| `semantic-600` | #6366F1 | Information |
| **Spacing** |
| `2` | 8px | Tight |
| `4` | 16px | Base |
| `6` | 24px | Comfortable |
| `8` | 32px | Loose |

---

**Quick Tip:** When in doubt, use neutral colors, generous white space, and subtle interactions. Less is more in this design system.

---

End of Quick Reference
