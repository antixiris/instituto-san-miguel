#!/usr/bin/env python3
"""
Script de integración automática para actualizar lecciones 3, 4 y 5
en el archivo lesson-contents.ts

Este script:
1. Lee las lecciones mejoradas de los archivos MD
2. Escapa correctamente los backticks para TypeScript
3. Actualiza/agrega las lecciones en lesson-contents.ts
4. Preserva la estructura del archivo
"""

import re
import os

print("🚀 Iniciando integración de lecciones mejoradas...")

# Verificar que estamos en el directorio correcto
if not os.path.exists('lesson-contents.ts'):
    print("❌ Error: No se encontró lesson-contents.ts")
    print(f"📂 Directorio actual: {os.getcwd()}")
    exit(1)

# Leer las lecciones mejoradas
print("\n📖 Leyendo lecciones mejoradas...")

try:
    with open('lesson-3-improved.md', 'r', encoding='utf-8') as f:
        lesson3 = f.read()
    print("  ✓ Lesson 3 leída")
except FileNotFoundError:
    print("  ❌ No se encontró lesson-3-improved.md")
    exit(1)

try:
    with open('lesson-4-improved.md', 'r', encoding='utf-8') as f:
        lesson4 = f.read()
    print("  ✓ Lesson 4 leída")
except FileNotFoundError:
    print("  ❌ No se encontró lesson-4-improved.md")
    exit(1)

try:
    with open('lesson-5-improved.md', 'r', encoding='utf-8') as f:
        lesson5 = f.read()
    print("  ✓ Lesson 5 leída")
except FileNotFoundError:
    print("  ❌ No se encontró lesson-5-improved.md")
    exit(1)

# Función para escapar backticks para uso en template literals de TypeScript
def escape_for_template_literal(content):
    """
    Escapa backticks y otros caracteres especiales para usar en template literals de TypeScript.
    En TypeScript, dentro de template literals (entre `) necesitamos escapar:
    - Backticks sueltos como \\`
    - ${  como \\${
    - \\ como \\\\
    """
    # Primero, escapar backslashes existentes (pero no los que ya están escapando algo)
    # Esto es complicado, así que usaremos un enfoque más seguro

    # Reemplazar \\ por \\\\
    content = content.replace('\\', '\\\\')

    # Escapar ${ (interpolación de template literal)
    content = content.replace('${', '\\${')

    # Escapar backticks
    content = content.replace('`', '\\`')

    return content

print("\n🔧 Escapando backticks y caracteres especiales...")
lesson3_escaped = escape_for_template_literal(lesson3)
lesson4_escaped = escape_for_template_literal(lesson4)
lesson5_escaped = escape_for_template_literal(lesson5)
print("  ✓ Contenido escapado correctamente")

# Leer el archivo lesson-contents.ts actual
print("\n📖 Leyendo lesson-contents.ts...")
with open('lesson-contents.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

# Buscar el final de la lección 0-2 (que ya existe)
# Buscar el patrón que cierra la lección 0-2
print("\n🔍 Buscando ubicación de lección 0-2...")

# Patrón para encontrar el final de '0-2'
pattern_02_end = r"(\s+'0-2': `.*?)`,"

match_02 = re.search(pattern_02_end, ts_content, re.DOTALL)

if match_02:
    print("  ✓ Encontrada lección 0-2 existente")
    # Reemplazar el contenido de 0-2
    new_02 = f"    '0-2': `{lesson3_escaped}`,"
    ts_content = re.sub(pattern_02_end, new_02, ts_content, count=1, flags=re.DOTALL)
    print("  ✓ Lección 0-2 actualizada")
else:
    print("  ⚠️  No se encontró lección 0-2 existente, se agregará")

# Ahora necesitamos agregar las lecciones 0-3 y 0-4
# Buscar donde termina el objeto contents (antes del cierre };)
print("\n🔍 Buscando ubicación para agregar lecciones 0-3 y 0-4...")

# Buscar el patrón del cierre del objeto contents
# El patrón es "  };" que cierra el objeto contents
pattern_contents_end = r'(\s+)(\}\;\s+const key)'

match_end = re.search(pattern_contents_end, ts_content)

if match_end:
    print("  ✓ Encontrado cierre del objeto contents")

    # Verificar si ya existen 0-3 y 0-4
    has_03 = "'0-3'" in ts_content
    has_04 = "'0-4'" in ts_content

    if has_03:
        print("  ⚠️  Lección 0-3 ya existe, se actualizará")
        pattern_03 = r"(\s+'0-3': `.*?)`,"
        new_03 = f"    '0-3': `{lesson4_escaped}`,"
        ts_content = re.sub(pattern_03, new_03, ts_content, count=1, flags=re.DOTALL)
    else:
        print("  ➕ Agregando lección 0-3...")
        # Insertar antes del cierre del objeto
        insertion_point = match_end.start()
        new_03 = f"\n    '0-3': `{lesson4_escaped}`,\n"
        ts_content = ts_content[:insertion_point] + new_03 + ts_content[insertion_point:]

    # Refrescar el match después de la inserción
    match_end = re.search(pattern_contents_end, ts_content)

    if has_04:
        print("  ⚠️  Lección 0-4 ya existe, se actualizará")
        pattern_04 = r"(\s+'0-4': `.*?)`,"
        new_04 = f"    '0-4': `{lesson5_escaped}`,"
        ts_content = re.sub(pattern_04, new_04, ts_content, count=1, flags=re.DOTALL)
    else:
        print("  ➕ Agregando lección 0-4...")
        insertion_point = match_end.start()
        new_04 = f"\n    '0-4': `{lesson5_escaped}`,\n"
        ts_content = ts_content[:insertion_point] + new_04 + ts_content[insertion_point:]

    print("  ✓ Lecciones 0-3 y 0-4 integradas")
else:
    print("  ❌ No se pudo encontrar el cierre del objeto contents")
    exit(1)

# Guardar el archivo actualizado
print("\n💾 Guardando archivo actualizado...")
with open('lesson-contents.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)
print("  ✓ Archivo guardado exitosamente")

print("\n✅ Integración completada con éxito!")
print("\n📋 Próximos pasos:")
print("  1. Verificar sintaxis TypeScript: npx tsc --noEmit lesson-contents.ts")
print("  2. Ejecutar seed: npx ts-node seed-claude-course.ts")
print("  3. Verificar en la aplicación web")
