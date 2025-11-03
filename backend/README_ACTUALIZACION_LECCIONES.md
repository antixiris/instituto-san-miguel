# Sistema de Actualización de Lecciones - Instituto San Miguel

## Resumen del Proyecto

Sistema modular para actualizar contenido educativo de alta calidad en el curso **"Especialista en Desarrollo con Claude Code"**.

### Estado Actual

✅ **Módulo 2 completado**: 6/6 lecciones actualizadas
⏳ **Módulos pendientes**: 3, 4, 6, 7, 8, 9 (37 lecciones)

---

## Estructura del Proyecto

```
/backend
├── lessons-content/
│   └── module2-demo.json           ← Contenido del Módulo 2
├── update-claude-course-lessons.js ← Script principal
├── INFORME_ACTUALIZACION_LECCIONES.md ← Documentación detallada
└── README_ACTUALIZACION_LECCIONES.md  ← Este archivo
```

---

## Cómo Usar Este Sistema

### 1. Crear Contenido Nuevo

Crea un archivo JSON en `lessons-content/` siguiendo esta estructura:

```json
{
  "moduleOrder": 3,
  "lessons": [
    {
      "title": "Título exacto de la lección en DB",
      "content": "# Título\n\n![Imagen](url)\n\n## Contenido...\n\n[5000-8000 caracteres]"
    },
    {
      "title": "Segunda lección...",
      "content": "..."
    }
  ]
}
```

**Ejemplo**: Crea `module3-demo.json` para el Módulo 3.

### 2. Ejecutar Actualización

```bash
cd /Users/cantico/PROGRAMACIÓN/instituto-san-miguel/backend
node update-claude-course-lessons.js
```

El script:
- Busca el curso "Especialista en Desarrollo con Claude Code"
- Lee archivos JSON de `lessons-content/`
- Actualiza lecciones en PostgreSQL vía Prisma
- Genera reporte detallado

### 3. Verificar Resultados

```bash
# Consultar lecciones actualizadas
node check-current-lessons.js

# Ver contenido de una lección específica
node get-full-lesson.js
```

---

## Template de Contenido

Cada lección debe seguir esta estructura (5000-8000 caracteres):

```markdown
# [Título Inspirador]

![Imagen](https://images.unsplash.com/photo-ID?w=1200&h=400&fit=crop)

## [Introducción Cálida - 2-3 párrafos]

[Conecta emocionalmente, explica el valor, motiva al estudiante]

## 🎯 Objetivos de Aprendizaje

Al finalizar esta lección, habrás dominado:
- [Objetivo específico 1]
- [Objetivo específico 2]
- [Objetivo específico 3]
- [Objetivo específico 4]

## [Sección 1: Fundamentos]

[Explicación didáctica con ejemplos]

### Ejemplo Práctico

```typescript
// Código real y funcional (NO placeholders)
// Con comentarios explicativos detallados
```

## [Sección 2: Implementación Práctica]

[Contenido educativo específico]

### 💡 Tip del Instructor

> [Consejo valioso y específico]

## [Sección 3: Casos de Uso Reales]

### 🏢 Caso de Estudio: [Empresa/Proyecto específico]

[Historia real de implementación]

## Ejercicio Hands-On

**Tu desafío**: [Descripción específica]

1. [Paso específico 1]
2. [Paso específico 2]
3. [Paso específico 3]

## Errores Comunes y Soluciones

### ❌ Error: [Nombre específico]

**El problema**: [Explicación]

**Solución**:
```typescript
// Código correcto específico
```

## 🚀 Siguientes Pasos

[Conexión con próxima lección]

## Conclusión

[Resumen inspirador]

---

**Próxima lección**: [Título]
```

---

## Checklist de Calidad

Antes de crear contenido, asegúrate de:

### Contenido
- [ ] Sin placeholders genéricos ("Concepto A", "[Nombre del error]")
- [ ] Código real, funcional, production-ready
- [ ] Ejemplos específicos con tecnologías concretas (React, TypeScript, etc.)
- [ ] Casos de estudio del mundo real
- [ ] Ejercicios prácticos con requisitos claros

### Tono y Estilo
- [ ] Cálido y conversacional (como el Módulo 1)
- [ ] Motivador y entusiasta
- [ ] Usa storytelling
- [ ] Conecta emocionalmente con el estudiante

### Estructura
- [ ] Imagen de Unsplash al inicio
- [ ] Objetivos de aprendizaje claros (🎯)
- [ ] Secciones bien organizadas
- [ ] Tips del instructor (💡)
- [ ] Ejercicios hands-on (🚀)
- [ ] Conexión con próxima lección

### Técnico
- [ ] 5000-8000 caracteres por lección
- [ ] Ejemplos de código con sintaxis highlighting
- [ ] Tecnologías específicas mencionadas
- [ ] Comandos y código ejecutable

---

## Módulos Pendientes

### Prioridad Alta

#### **Módulo 3: Técnicas Avanzadas de Prompting** (5 lecciones)
```
Lecciones en DB:
1. Prompting efectivo para desarrollo
2. Contexto y especificación de requisitos
3. Iteración y refinamiento de código
4. Manejo de proyectos complejos
5. Patrones de diseño con Claude
```

**Crear**: `lessons-content/module3-demo.json`

#### **Módulo 4: Desarrollo Frontend con Claude** (6 lecciones)
```
Lecciones en DB:
1. React + TypeScript con Claude
2. Componentes reutilizables
3. Estado y hooks en React
4. Integración con APIs
5. Diseño responsive con Tailwind CSS
6. Proyecto: Dashboard interactivo
```

**Crear**: `lessons-content/module4-demo.json`

### Prioridad Media

#### **Módulo 6: Desarrollo Backend con Claude** (6 lecciones)
```
Lecciones en DB:
1. Node.js y Express con Claude
2. Base de datos con Prisma ORM
3. Autenticación y autorización JWT
4. API RESTful: mejores prácticas
5. Manejo de errores y validación
6. Testing de backend
```

**Crear**: `lessons-content/module6-demo.json`

#### **Módulo 7: Full Stack con Claude** (6 lecciones)
```
Lecciones en DB:
1. Arquitectura de aplicaciones full stack
2. Comunicación cliente-servidor
3. State management avanzado
4. Deployment y CI/CD
5. Monitoreo y logging
6. Proyecto: E-commerce completo
```

**Crear**: `lessons-content/module7-demo.json`

#### **Módulo 8: Productividad y Workflows** (6 lecciones)
```
Lecciones en DB:
1. Git y control de versiones con Claude
2. Code review asistido por IA
3. Automatización de tareas repetitivas
4. Scripts y herramientas CLI
5. Integración con IDEs y editores
6. Mejores prácticas de equipo
```

**Crear**: `lessons-content/module8-demo.json`

#### **Módulo 9: Proyecto Final** (6 lecciones)
```
Lecciones en DB:
1. Planificación del proyecto final
2. Arquitectura y diseño del sistema
3. Desarrollo iterativo con Claude
4. Testing y quality assurance
5. Deployment en producción
6. Presentación y documentación del proyecto
```

**Crear**: `lessons-content/module9-demo.json`

---

## Workflow Recomendado

### Para Cada Módulo:

1. **Investigación** (30 min)
   - Revisar títulos de lecciones en DB
   - Identificar tecnologías clave del módulo
   - Buscar casos de uso reales

2. **Creación de Contenido** (4-6 horas)
   - Escribir 5-6 lecciones siguiendo template
   - Incluir código real y testeado
   - Añadir ejercicios prácticos
   - Usar tono cálido y profesional

3. **Formato JSON** (30 min)
   - Escapar caracteres especiales correctamente
   - Verificar sintaxis JSON válida
   - Guardar en `lessons-content/moduleX-demo.json`

4. **Actualización** (5 min)
   ```bash
   node update-claude-course-lessons.js
   ```

5. **Verificación** (15 min)
   - Revisar logs de actualización
   - Consultar contenido en DB
   - Verificar en plataforma web

### Tiempo Total Estimado por Módulo: 5-7 horas

---

## Tecnologías a Cubrir

### Frontend
- React 18+ con TypeScript
- Hooks personalizados
- Context API / Zustand
- React Query / TanStack Query
- Tailwind CSS
- Framer Motion (animaciones)
- React Testing Library

### Backend
- Node.js 20+
- Express.js
- Prisma ORM + PostgreSQL
- JWT + bcrypt (autenticación)
- Zod (validación)
- Winston (logging)
- Bull (job queues)

### Testing
- Vitest
- Jest
- Supertest (integration tests)
- React Testing Library
- Playwright (E2E)

### DevOps
- Docker + Docker Compose
- GitHub Actions (CI/CD)
- Vercel / Railway (deployment)
- Sentry (monitoring)
- Prometheus + Grafana (métricas)

---

## Tips para Contenido de Calidad

### ✅ Hacer

- **Usar casos reales**: "Sofía García, desarrolladora de Madrid, redujo su tiempo de desarrollo en 70%"
- **Código funcional**: Ejemplos que los estudiantes puedan copiar y ejecutar
- **Storytelling**: Cuenta historias de éxito, fracasos aprendidos
- **Comparaciones**: Antes vs Después, Malo vs Bueno
- **Ejercicios específicos**: "Crea una API REST con estos 5 endpoints exactos"

### ❌ Evitar

- **Placeholders**: "Descripción del concepto", "[Ejemplo aquí]"
- **Código genérico**: `function foo() { /* TODO */ }`
- **Tono académico frío**: "En esta sección se abordará..."
- **Vagedad**: "Optimiza el código" → Especifica cómo
- **Sin contexto**: Explica el "por qué", no solo el "qué"

---

## Recursos Útiles

### Imágenes
- **Unsplash**: https://unsplash.com/s/photos/coding
- **Formato**: `?w=1200&h=400&fit=crop`

### Referencias Técnicas
- **React Docs**: https://react.dev
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Prisma Docs**: https://www.prisma.io/docs
- **Node.js Best Practices**: https://github.com/goldbergyoni/nodebestpractices

### Inspiración de Tono
- **Referencia**: Leer Módulo 1 del curso (ejemplo perfecto del tono)
- **Archivo**: `/backend/module1-example.txt`

---

## Contacto y Soporte

**Desarrollador**: ProfesorIA-DevAdvanced
**Proyecto**: Instituto San Miguel - Plataforma E-Learning
**Ubicación**: `/Users/cantico/PROGRAMACIÓN/instituto-san-miguel/backend`

### Comandos Útiles

```bash
# Ver estructura completa del curso
node get-full-lesson.js

# Verificar lecciones actuales
node check-current-lessons.js

# Actualizar lecciones
node update-claude-course-lessons.js

# Ver informe completo
cat INFORME_ACTUALIZACION_LECCIONES.md
```

---

## Estado del Proyecto

| Módulo | Lecciones | Estado | Archivo JSON |
|--------|-----------|--------|--------------|
| 1 | 5 | ✅ Completo (no tocar) | N/A |
| 2 | 6 | ✅ Actualizado | `module2-demo.json` |
| 3 | 5 | ⏳ Pendiente | Crear `module3-demo.json` |
| 4 | 6 | ⏳ Pendiente | Crear `module4-demo.json` |
| 5 | 8 | ✅ Completo (no tocar) | N/A |
| 6 | 6 | ⏳ Pendiente | Crear `module6-demo.json` |
| 7 | 6 | ⏳ Pendiente | Crear `module7-demo.json` |
| 8 | 6 | ⏳ Pendiente | Crear `module8-demo.json` |
| 9 | 6 | ⏳ Pendiente | Crear `module9-demo.json` |

**Total**: 6/43 lecciones actualizadas (14%)

---

## Próximos Pasos

1. ✅ Módulo 2 completado
2. ⏳ Expandir lecciones 3-6 del Módulo 2 si es necesario
3. ⏳ Crear contenido para Módulo 3 (5 lecciones)
4. ⏳ Crear contenido para Módulo 4 (6 lecciones)
5. ⏳ Continuar con Módulos 6, 7, 8, 9

**Estimación de tiempo restante**: 30-35 horas de trabajo

---

**🎓 Instituto San Miguel - Educación Digital de Excelencia**

*Última actualización: 27 de octubre de 2025*
