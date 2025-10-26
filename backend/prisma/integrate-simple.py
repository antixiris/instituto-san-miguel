#!/usr/bin/env python3
"""
Script simplificado de integración - Sin double escaping
"""

import re
import os

print("🚀 Iniciando integración (versión simplificada)...")

if not os.path.exists('lesson-contents.ts'):
    print("❌ Error: No se encontró lesson-contents.ts")
    exit(1)

# Leer las lecciones
print("\n📖 Leyendo lecciones...")
with open('lesson-3-improved.md', 'r', encoding='utf-8') as f:
    lesson3 = f.read()
with open('lesson-4-improved.md', 'r', encoding='utf-8') as f:
    lesson4 = f.read()
with open('lesson-5-improved.md', 'r', encoding='utf-8') as f:
    lesson5 = f.read()

def escape_for_ts(content):
    """Escapa SOLO para TypeScript template literals"""
    # Escapar ${ primero
    content = content.replace('${', '\\${')
    # Escapar backticks
    content = content.replace('`', '\\`')
    return content

lesson3_esc = escape_for_ts(lesson3)
lesson4_esc = escape_for_ts(lesson4)
lesson5_esc = escape_for_ts(lesson5)

print("  ✓ Lecciones procesadas")

# Leer archivo actual
with open('lesson-contents.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

# Actualizar 0-2
print("\n🔍 Actualizando lecciones...")
pattern = r"'0-2':\s*`[^`]*(?:\\`[^`]*)*`,"

ts_content = re.sub(
    pattern,
    f"'0-2': `{lesson3_esc}`,",
    ts_content,
    count=1,
    flags=re.DOTALL
)

# Agregar 0-3 y 0-4 si no existen
if "'0-3':" not in ts_content:
    # Buscar el cierre del objeto contents
    match = re.search(r'(\s+)};\s+const key', ts_content)
    if match:
        pos = match.start()
        ts_content = ts_content[:pos] + f"\n    '0-3': `{lesson4_esc}`,\n" + ts_content[pos:]

if "'0-4':" not in ts_content:
    match = re.search(r'(\s+)};\s+const key', ts_content)
    if match:
        pos = match.start()
        ts_content = ts_content[:pos] + f"\n    '0-4': `{lesson5_esc}`,\n" + ts_content[pos:]

print("  ✓ Lecciones actualizadas")

# Guardar
print("\n💾 Guardando...")
with open('lesson-contents.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("✅ Integración completada!")
