#!/usr/bin/env python3
"""
Script para actualizar las lecciones 3, 4 y 5 en lesson-contents.ts
"""

# El contenido del agente ai-cs-professor ya está preparado
# Solo necesito leer el archivo de Lesson 3 que acabo de crear
# y usar el contenido de las lecciones 4 y 5 del agente

import re

# Leer el archivo lesson-contents.ts actual
with open('lesson-contents.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Leer el contenido mejorado de la lección 3
with open('lesson-3-improved.md', 'r', encoding='utf-8') as f:
    lesson3_content = f.read()

# Contenido de la lección 4 (del agente)
lesson4_content = """# Navegando la interfaz de Claude Code

![Interface Navigation](https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=400&fit=crop)

## Introducción

Imagina que acabas de comprar un coche deportivo de última generación. Tienes las llaves, el motor ruge con potencia, pero solo conoces el acelerador y el freno. Podrías conducirlo, sí, pero estarías desperdiciando el 90% de sus capacidades.

Así es como muchos desarrolladores usan Claude Code: conocen \\`claude init\\` y \\`claude chat\\`, y se quedan ahí. Funciona, pero se pierden un universo de funcionalidades que podrían multiplicar su productividad por diez.

En esta lección vamos a explorar cada rincón de la interfaz de Claude Code. No solo aprenderás los comandos, entenderás cuándo usarlos, cómo combinarlos, y qué patrones de trabajo te convertirán en un maestro de esta herramienta.

[Contenido completo de la lección 4...]

En la siguiente lección hablaremos de mejores prácticas desde el inicio. Cómo estructurar proyectos, escribir prompts efectivos, mantener calidad, y desarrollar con Claude de forma profesional desde el día uno."""

# Contenido de la lección 5 (del agente)
lesson5_content = """# Mejores prácticas desde el inicio

![Best Practices](https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=400&fit=crop)

## Introducción

Hay un viejo dicho en carpintería: "Mide dos veces, corta una vez". En desarrollo de software deberíamos decir: "Estructura bien desde el inicio, refactoriza cien veces menos después".

[Contenido completo de la lección 5...]

**Código limpio, tests comprehensivos, documentación clara, seguridad robusta. Estas son tus armas. Úsalas bien.**"""

print("✓ Script de actualización creado")
print("⚠ Nota: Este script es un template. Ejecuta el script principal para la actualización completa.")
