#!/usr/bin/env python3
"""
Script de integración FINAL CORREGIDO
El problema era que re.sub() trata \ como carácter especial en el replacement string
"""

import re
import os

print("🚀 Iniciando integración de lecciones (versión FINAL corregida)...")

if not os.path.exists('lesson-contents.ts'):
    print("❌ Error: No se encontró lesson-contents.ts")
    exit(1)

# Leer las lecciones mejoradas
print("\n📖 Leyendo lecciones mejoradas...")
with open('lesson-3-improved.md', 'r', encoding='utf-8') as f:
    lesson3 = f.read()
with open('lesson-4-improved.md', 'r', encoding='utf-8') as f:
    lesson4 = f.read()
with open('lesson-5-improved.md', 'r', encoding='utf-8') as f:
    lesson5 = f.read()
print("  ✓ Lecciones leídas")

def escape_for_template_literal(content):
    """
    Escapa para template literals de TypeScript.
    """
    content = content.replace('${', r'\${')
    content = content.replace('`', r'\`')
    return content

def escape_for_regex_replacement(content):
    """
    Escapa backslashes para que re.sub() los trate literalmente.
    En re.sub(), los backslashes en el replacement string son especiales,
    así que necesitamos duplicarlos.
    """
    # Duplicar todos los backslashes para que re.sub() los trate como literales
    return content.replace('\\', '\\\\')

print("\n🔧 Escapando caracteres especiales...")
lesson3_escaped = escape_for_template_literal(lesson3)
lesson4_escaped = escape_for_template_literal(lesson4)
lesson5_escaped = escape_for_template_literal(lesson5)

# Ahora escapar para el regex replacement
lesson3_final = escape_for_regex_replacement(lesson3_escaped)
lesson4_final = escape_for_regex_replacement(lesson4_escaped)
lesson5_final = escape_for_regex_replacement(lesson5_escaped)

print("  ✓ Contenido escapado correctamente")

# Leer el archivo lesson-contents.ts actual
print("\n📖 Leyendo lesson-contents.ts...")
with open('lesson-contents.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

# Actualizar lección 0-2
print("\n🔍 Actualizando lección 0-2...")
pattern_02 = r"(\s+'0-2': `)([^`]*(?:\\`[^`]*)*)`,\""

def replace_02(match):
    return match.group(1) + lesson3_final + "`,\""

ts_content = re.sub(pattern_02, replace_02, ts_content, count=1, flags=re.DOTALL)
print("  ✓ Lección 0-2 actualizada")

# Buscar el cierre del objeto contents
print("\n🔍 Buscando ubicación para lecciones 0-3 y 0-4...")
pattern_contents_end = r'(\s+)(};\s+const key)'

match_end = re.search(pattern_contents_end, ts_content)

if match_end:
    print("  ✓ Encontrado cierre del objeto contents")

    has_03 = "'0-3':" in ts_content
    has_04 = "'0-4':" in ts_content

    if has_03:
        print("  🔄 Actualizando lección 0-3...")
        pattern_03 = r"(\s+'0-3': `)([^`]*(?:\\`[^`]*)*)`,\""
        def replace_03(match):
            return match.group(1) + lesson4_final + "`,\""
        ts_content = re.sub(pattern_03, replace_03, ts_content, count=1, flags=re.DOTALL)
    else:
        print("  ➕ Agregando lección 0-3...")
        insertion_point = match_end.start()
        new_03 = f"\n    '0-3': `{lesson4_final}`,\n"
        ts_content = ts_content[:insertion_point] + new_03 + ts_content[insertion_point:]
        match_end = re.search(pattern_contents_end, ts_content)

    if has_04:
        print("  🔄 Actualizando lección 0-4...")
        pattern_04 = r"(\s+'0-4': `)([^`]*(?:\\`[^`]*)*)`,\""
        def replace_04(match):
            return match.group(1) + lesson5_final + "`,\""
        ts_content = re.sub(pattern_04, replace_04, ts_content, count=1, flags=re.DOTALL)
    else:
        print("  ➕ Agregando lección 0-4...")
        insertion_point = match_end.start()
        new_04 = f"\n    '0-4': `{lesson5_final}`,\n"
        ts_content = ts_content[:insertion_point] + new_04 + ts_content[insertion_point:]

    print("  ✓ Lecciones integradas")
else:
    print("  ❌ No se pudo encontrar el cierre del objeto contents")
    exit(1)

# Guardar el archivo actualizado
print("\n💾 Guardando archivo actualizado...")
with open('lesson-contents.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)
print("  ✓ Archivo guardado")

print("\n✅ Integración completada con éxito!")
print("\n📋 Próximos pasos:")
print("  1. Verificar sintaxis: npx tsc --noEmit lesson-contents.ts")
print("  2. Ejecutar seed: npx ts-node seed-claude-course.ts")
