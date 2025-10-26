#!/usr/bin/env python3
"""
Script para actualizar la lección 1 con contenido motivacional
"""

import re

print("🔄 Actualizando lección 1 con contenido motivacional...")

# Leer el nuevo contenido
with open('lesson-1-motivational.md', 'r', encoding='utf-8') as f:
    new_content = f.read()

# Escapar para TypeScript template literals
def escape_for_ts(content):
    """Escapa contenido para TypeScript template literals"""
    # Escapar ${ primero
    content = content.replace('${', '\\${')
    # Escapar backticks
    content = content.replace('`', '\\`')
    # Escapar backslashes que no sean de escape
    return content

new_content_escaped = escape_for_ts(new_content)

# Leer archivo actual
with open('lesson-contents.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

# Patrón para encontrar la lección '0-0'
pattern = r"('0-0':\s*`)[^`]*(?:\\`[^`]*)*`,"

# Reemplazar
replacement = f"'0-0': `{new_content_escaped}`,"

ts_content_updated = re.sub(
    pattern,
    replacement,
    ts_content,
    count=1,
    flags=re.DOTALL
)

# Guardar
with open('lesson-contents.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content_updated)

print("✅ Lección 1 actualizada exitosamente!")
print("📝 Contenido nuevo:")
print(f"   - {len(new_content)} caracteres")
print(f"   - Altamente motivador y persuasivo")
print(f"   - Casos de éxito y datos del mercado incluidos")
