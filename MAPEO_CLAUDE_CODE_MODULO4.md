# Mapeo Claude Code - Módulo 4: Desarrollo Frontend

## Información Extraída de Documentación Oficial

### Capacidades Principales de Claude Code

Claude Code es la herramienta oficial de Anthropic que funciona en la terminal y ayuda a convertir ideas en código rápidamente. Capacidades principales:

1. **Feature Building**: Describe lo que quieres en lenguaje natural; Claude crea un plan, escribe código y se asegura de que funcione
2. **Debugging**: Pega mensajes de error o describe bugs; Claude analiza el código base e implementa correcciones
3. **Codebase Navigation**: Haz preguntas sobre la estructura del proyecto; Claude mantiene conocimiento de todo el proyecto
4. **Task Automation**: Maneja problemas de lint, conflictos de merge, y genera release notes con comandos simples

### Workflows Identificados

**Patrón de Comprensión del Código Base**:
1. Comenzar amplio: "dame una vista general de este código base"
2. Estrechar: Preguntar sobre patrones específicos, modelos de datos, autenticación
3. Profundizar: Solicitar trazas de flujo de ejecución e interacciones de componentes

**Workflow de Corrección de Bugs**:
- Compartir mensajes de error → Solicitar recomendaciones de corrección → Aplicar soluciones → Verificar cambios
- Claude funciona mejor cuando proporcionas pasos de reproducción y stack traces

**Patrones de Iteración y Refinamiento**:
- Comenzar con preguntas de alto nivel, luego enfocarse en áreas específicas
- Usar lenguaje específico del dominio de tu proyecto
- Solicitar explicaciones junto con cambios de código
- Verificar implementaciones antes de hacer commits

**Workflow de Refactorización**:
- Identificar patrones legacy → Obtener recomendaciones de modernización → Aplicar cambios → Ejecutar tests para verificar que el comportamiento se preserva
- Pedir a Claude que explique los beneficios de los nuevos enfoques

**Generación de Documentación**:
- Encontrar funciones sin documentar → Generar comentarios apropiados (JSDoc, docstrings) → Revisar cumplimiento de estándares del proyecto

**Testing**:
- Identificar código sin tests → Generar scaffolding de tests → Añadir cobertura de casos extremos → Ejecutar y corregir fallos

### Comandos Slash Disponibles

**Comandos Core**:
- `/clear` - Eliminar historial de conversación
- `/help` - Mostrar información de uso
- `/status` - Mostrar versión, modelo, detalles de cuenta
- `/cost` - Mostrar estadísticas de uso de tokens

**Herramientas de Desarrollo**:
- `/review` - Solicitar revisión de código
- `/sandbox` - Habilitar ejecución bash aislada
- `/mcp` - Gestionar servidores de Model Context Protocol

**Gestión de Proyecto**:
- `/init` - Inicializar proyecto con CLAUDE.md
- `/add-dir` - Incluir directorios de trabajo adicionales
- `/agents` - Gestionar subagentes de IA personalizados
- `/rewind` - Revertir cambios de conversación/código

**Comandos Personalizados**:
- Los usuarios pueden crear comandos personalizados como archivos Markdown en `.claude/commands/`
- Soportan argumentos con `$ARGUMENTS` o `$1`, `$2` para parámetros específicos
- Pueden ejecutar comandos bash con prefijo `!`
- Pueden incluir contenido de archivos con prefijo `@`

### Mejores Prácticas Identificadas

1. **Plan Mode**: Usar `--permission-mode plan` para análisis de solo lectura antes de hacer cambios (ideal para refactorizaciones multi-archivo)
2. **Extended Thinking**: Habilitar con `Tab` o prompts como "piensa profundamente sobre..." para debugging intrincado y decisiones arquitecturales
3. **Subagents**: Delegar tareas automáticamente describiéndolas; crear agentes específicos del proyecto en `.claude/agents/`
4. **Referencia explícita de archivos**: Usar `@file` para contexto explícito sin esperar análisis
5. **Iteración incremental**: Mantener refactorizaciones en incrementos pequeños y testeables
6. **Especificar estándares**: Definir estilos de documentación y requisitos por adelantado

### Prompts Efectivos Generales

**Para comprender código**:
```
Dame una vista general de este código base
```

**Para modificaciones**:
```
Añade una función [descripción específica] al archivo principal
```

**Para debugging**:
```
Hay un bug donde [descripción específica del problema] - corrígelo
```

**Para refactorización**:
```
Refactoriza el módulo [nombre] para usar [patrón/tecnología] en lugar de [patrón antiguo]
```

**Para testing**:
```
Escribe tests unitarios para las funciones [nombre]
```

---

## Lección 1: HTML Semántico y Accesibilidad

### Funcionalidades Relevantes de Claude Code

1. **Generación de estructura HTML semántica**: Claude Code puede generar estructuras HTML completas usando etiquetas semánticas apropiadas basándose en descripciones del contenido
2. **Análisis y mejora de accesibilidad**: Puede analizar HTML existente y sugerir mejoras de accesibilidad (atributos ARIA, etiquetas semánticas, etc.)
3. **Validación de estándares**: Verifica que el HTML cumpla con estándares modernos y mejores prácticas
4. **Navegación de código base**: Ayuda a entender la estructura de páginas HTML existentes

### Prompts Efectivos Documentados

**Prompt 1: Estructura de página completa**
```
Genera la estructura HTML semántica para una landing page de [producto/servicio].
Incluye:
- Header con navegación
- Hero section
- Sección de características (3 items)
- Footer con links sociales

Usa etiquetas semánticas apropiadas y buenas prácticas de accesibilidad.
```

**Prompt 2: Análisis de accesibilidad**
```
Analiza este código HTML y sugiere mejoras de accesibilidad:
[pegar código HTML]

Enfócate en:
- Atributos ARIA donde sean necesarios
- Etiquetas semánticas apropiadas
- Alternativas de texto para imágenes
- Navegación por teclado
```

**Prompt 3: Conversión de HTML no semántico**
```
Refactoriza este HTML para usar etiquetas semánticas HTML5 en lugar de divs genéricos:
[pegar código]

Reemplaza divs por <article>, <section>, <nav>, <aside>, <header>, <footer> donde sea apropiado.
```

### Workflows Recomendados

**Workflow: Crear página semántica desde cero**
1. Describir la estructura y propósito de la página
2. Claude genera HTML con etiquetas semánticas
3. Revisar y solicitar ajustes específicos
4. Pedir análisis de accesibilidad para validar

**Workflow: Mejorar HTML existente**
1. Pegar código HTML actual
2. Solicitar análisis de semántica y accesibilidad
3. Revisar sugerencias
4. Aplicar cambios incrementalmente

### Comandos Slash Aplicables

- `/review` - Para revisar la calidad del HTML generado
- Comandos personalizados: Podrías crear `/html-semantic` para generación rápida de estructuras

---

## Lección 2: CSS Moderno y Diseño Responsive

### Funcionalidades Relevantes de Claude Code

1. **Generación de CSS moderno**: Flexbox, Grid, Variables CSS, transiciones
2. **Conversión de CSS legacy**: Refactorizar CSS antiguo a técnicas modernas
3. **Diseño responsive**: Generar media queries y estilos adaptativos
4. **Debugging de layout**: Analizar y corregir problemas de diseño CSS

### Prompts Efectivos Documentados

**Prompt 1: Layout responsive con Grid**
```
Crea un layout de galería de productos usando CSS Grid que sea responsive:
- 1 columna en móvil (< 640px)
- 2 columnas en tablet (640px - 1024px)
- 3 columnas en desktop (> 1024px)
- Gap de 20px entre elementos
- Usa variables CSS para colores
```

**Prompt 2: Refactorizar CSS a técnicas modernas**
```
Refactoriza este CSS para usar Flexbox o Grid en lugar de floats y position:
[pegar CSS antiguo]

Mejora la legibilidad y mantenibilidad del código.
```

**Prompt 3: Componente con estados hover y transiciones**
```
Crea CSS para una card de producto con:
- Borde y sombra base
- Efecto de elevación al hover (transform y box-shadow)
- Transiciones suaves (300ms)
- Estados de focus para accesibilidad
- Variables CSS para colores y espaciado
```

### Workflows Recomendados

**Workflow: Diseñar componente responsive**
1. Describir el componente y sus variaciones por pantalla
2. Claude genera CSS base + media queries
3. Probar en diferentes tamaños
4. Iterar ajustes específicos

**Workflow: Modernizar CSS legacy**
1. Identificar patrones antiguos (floats, tablas para layout)
2. Solicitar refactorización a Grid/Flexbox
3. Revisar compatibilidad
4. Testear layouts en navegadores

### Comandos Slash Aplicables

- `/review` - Revisar calidad del CSS
- `/sandbox` - Probar CSS en entorno aislado

---

## Lección 3: JavaScript Esencial para Frontend

### Funcionalidades Relevantes de Claude Code

1. **Generación de código JavaScript moderno**: ES6+, arrow functions, destructuring
2. **Refactorización a sintaxis moderna**: Convertir callbacks a async/await, var a const/let
3. **Debugging de JavaScript**: Analizar errores y comportamientos inesperados
4. **Manipulación del DOM**: Generar código para interacciones con elementos HTML

### Prompts Efectivos Documentados

**Prompt 1: Funcionalidad interactiva del DOM**
```
Crea código JavaScript para un sistema de tabs:
- Múltiples tabs con contenido diferente
- Solo un tab activo a la vez
- Añadir clase 'active' al tab seleccionado
- Usar event delegation para eficiencia
- Código ES6+ moderno
```

**Prompt 2: Refactorizar a sintaxis moderna**
```
Refactoriza este código JavaScript a ES6+:
[pegar código con var, callbacks, function tradicionales]

Usa:
- const/let en lugar de var
- Arrow functions donde sea apropiado
- Template literals para strings
- Destructuring de objetos/arrays
- async/await en lugar de callbacks
```

**Prompt 3: Validación de formulario**
```
Crea un sistema de validación de formulario en JavaScript vanilla:
- Validar email, longitud mínima, campos requeridos
- Mostrar mensajes de error específicos por campo
- Prevenir submit si hay errores
- Usar eventos modernos y sintaxis ES6+
```

### Workflows Recomendados

**Workflow: Añadir interactividad a página**
1. Describir la interacción deseada (clicks, hover, submit)
2. Claude genera código JavaScript
3. Integrar con HTML existente
4. Probar y refinar comportamiento

**Workflow: Debugging de comportamiento**
1. Describir el problema ("el botón no responde cuando...")
2. Pegar código relevante
3. Claude identifica el issue
4. Aplicar corrección sugerida
5. Verificar solución

### Comandos Slash Aplicables

- `/review` - Revisar calidad y mejores prácticas del JS
- Custom `/debug-js` - Comando personalizado para debugging común

---

## Lección 4: React - Componentes y JSX

### Funcionalidades Relevantes de Claude Code

1. **Generación de componentes React**: Componentes funcionales con props, TypeScript
2. **Refactorización de componentes**: De class a functional, separación de lógica
3. **Debugging de componentes**: Props incorrectas, rendering issues
4. **Estructura de proyecto**: Organización de carpetas y archivos

### Prompts Efectivos Documentados

**Prompt 1: Componente funcional con props**
```
Crea un componente React llamado [NombreComponente] que:
- Reciba props: [listar props con tipos]
- Use TypeScript para definir la interface de props
- Renderice [descripción del JSX]
- Incluya PropTypes o validación TypeScript
- Siga convenciones modernas de React
```

**Prompt 2: Refactorizar componente existente**
```
Refactoriza este componente React:
[pegar código]

Mejoras a aplicar:
- Extraer lógica a funciones helper separadas
- Mejorar nombres de variables
- Simplificar el JSX
- Añadir comentarios donde necesario
```

**Prompt 3: Sistema de componentes reutilizables**
```
Diseña una arquitectura de componentes para [descripción del feature]:
- Componente padre que gestiona estado
- Componentes hijos que reciben props
- Define interfaces TypeScript para cada uno
- Muestra ejemplo de uso
```

### Workflows Recomendados

**Workflow: Crear feature completo**
1. Describir el feature en lenguaje natural
2. Claude diseña arquitectura de componentes
3. Generar componentes uno por uno
4. Integrar componentes hijos en padre
5. Testear funcionamiento completo

**Workflow: Debugging de componente**
1. Describir el comportamiento inesperado
2. Pegar código del componente
3. Claude identifica el problema
4. Aplicar corrección
5. Verificar con `/review`

### Comandos Slash Aplicables

- `/review` - Revisar componentes antes de commit
- Custom `/component` - Generar boilerplate de componente

---

## Lección 5: Estados y Hooks en React

### Funcionalidades Relevantes de Claude Code

1. **Implementación de hooks**: useState, useEffect, custom hooks
2. **Gestión de estado complejo**: Múltiples estados, estado derivado
3. **Debugging de hooks**: Dependencias incorrectas, loops infinitos
4. **Patrones de estado**: Lifting state up, composición de estado

### Prompts Efectivos Documentados

**Prompt 1: Componente con useState básico**
```
Crea un componente React que gestione [descripción del estado]:
- Use useState para [variables de estado necesarias]
- Incluya funciones handler para [acciones]
- Renderice UI que refleje el estado actual
- TypeScript con tipos apropiados para el estado
```

**Prompt 2: useEffect para datos de API**
```
Crea un componente que:
- Use useEffect para cargar datos de [API endpoint]
- Gestione estados de: loading, data, error
- Use async/await para la petición fetch
- Muestre UI condicional según el estado (loading/error/success)
- Limpie efectos si el componente se desmonta
```

**Prompt 3: Custom hook reutilizable**
```
Crea un custom hook llamado use[Nombre] que:
- Encapsule la lógica de [funcionalidad específica]
- Retorne [valores y funciones necesarios]
- Gestione [estados internos necesarios]
- Sea reutilizable en múltiples componentes
- Incluya TypeScript types
```

### Workflows Recomendados

**Workflow: Añadir interactividad a componente**
1. Identificar qué datos deben ser estado
2. Describir los cambios que el estado debe provocar
3. Claude genera useState + handlers
4. Integrar con UI existente
5. Probar interacciones

**Workflow: Integrar API con useEffect**
1. Describir qué datos necesitas de la API
2. Claude genera useEffect con fetch
3. Añadir manejo de loading/error
4. Integrar datos en el componente
5. Testear casos de éxito y error

**Workflow: Debugging de loops infinitos**
1. Describir el comportamiento (renders infinitos)
2. Pegar código del useEffect
3. Claude identifica dependencias incorrectas
4. Corregir array de dependencias
5. Verificar comportamiento correcto

### Comandos Slash Aplicables

- `/review` - Revisar hooks y sus dependencias
- Custom `/hook` - Generar boilerplate de custom hook
- `/debug` - Para debugging de comportamiento inesperado

---

## Patrones de Prompting Efectivos para Frontend

### Estructura de Prompt Efectivo

```
[Contexto]: Descripción breve del proyecto/componente
[Objetivo]: Lo que quieres lograr específicamente
[Requisitos]: Lista de funcionalidades o restricciones
[Tecnologías]: React, TypeScript, [otras tecnologías relevantes]
[Formato]: Cómo quieres recibir el output
```

### Ejemplos de Prompts Bien Estructurados

**Para componentes nuevos**:
```
Contexto: Estoy construyendo una app de e-commerce
Objetivo: Crear un componente de carrito de compras
Requisitos:
- Mostrar lista de productos añadidos
- Calcular total dinámicamente
- Permitir eliminar items
- Mostrar cantidad por producto
- Persistir en localStorage
Tecnologías: React, TypeScript, hooks
Formato: Componente funcional con custom hooks si es necesario
```

**Para debugging**:
```
Contexto: Tengo un componente que carga usuarios de una API
Problema: El componente se re-renderiza infinitamente
Código:
[pegar código]
¿Qué está causando el loop infinito y cómo lo corrijo?
```

**Para refactorización**:
```
Contexto: Este componente creció mucho y es difícil de mantener
Objetivo: Refactorizar en componentes más pequeños
Código actual:
[pegar código]
Sugerencias:
- Separar en componentes lógicos
- Extraer lógica a custom hooks
- Mantener la funcionalidad actual
- Mejorar nombres de variables
```

---

## Consejos para Maximizar la Efectividad de Claude Code en Frontend

### 1. Iteración Incremental
- No pidas todo el feature completo de una vez
- Comienza con el componente base, luego añade funcionalidad
- Valida cada incremento antes de continuar

### 2. Contexto Específico
- Menciona las tecnologías exactas (React 18, TypeScript 5, etc.)
- Especifica convenciones de tu proyecto (naming, estructura)
- Referencia patrones que ya usas en el código base

### 3. Validación y Testing
- Pide a Claude que genere tests junto con componentes
- Usa `/review` antes de commits importantes
- Solicita explicaciones de decisiones de diseño

### 4. Documentación Inline
- Pide comentarios JSDoc para funciones complejas
- Solicita comentarios que expliquen "por qué", no "qué"
- Incluye ejemplos de uso en componentes reutilizables

### 5. Aprovecha Plan Mode
- Usa para análisis de arquitectura antes de implementar
- Ideal para decisiones sobre estructura de componentes
- No hace cambios, solo analiza y sugiere

### 6. Custom Commands para Tareas Repetitivas
Crea comandos en `.claude/commands/` para:
- `/component-new` - Genera boilerplate de componente
- `/add-test` - Añade tests a componente existente
- `/add-types` - Añade tipos TypeScript a código JS
- `/review-accessibility` - Revisa accesibilidad de componente

---

## Recursos Adicionales

### Documentación Oficial
- Claude Code Docs: https://docs.claude.com/en/docs/claude-code/overview
- Claude Code Common Workflows: https://docs.claude.com/en/docs/claude-code/common-workflows
- Claude Code Quickstart: https://docs.claude.com/en/docs/claude-code/quickstart

### Instalación
```bash
# macOS/Linux con Homebrew
brew install --cask claude-code

# macOS/Linux/WSL con curl
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
```

### Comandos Básicos
```bash
# Iniciar Claude Code
claude

# Modo interactivo con contexto previo
claude -c

# Ejecutar tarea única
claude "task description"

# Ver ayuda
claude --help
```
