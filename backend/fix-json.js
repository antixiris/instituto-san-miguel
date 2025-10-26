const fs = require('fs');

console.log('🔧 Corrigiendo archivo JSON...');

// Leer el archivo
let content = fs.readFileSync('curso-claude-code-completo.json', 'utf-8');

// Reemplazar saltos de línea literales con \\n en strings
// Esto es un poco hacky pero debería funcionar para nuestro caso
const lines = content.split('\n');
let inString = false;
let fixedLines = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  let newLine = '';

  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    const prevChar = j > 0 ? line[j - 1] : '';

    if (char === '"' && prevChar !== '\\') {
      inString = !inString;
    }

    newLine += char;
  }

  // Si estamos en medio de un string al final de la línea,
  // necesitamos escapar el salto de línea
  if (inString && i < lines.length - 1) {
    // Agregar \\n en lugar del salto de línea
    fixedLines.push(newLine + '\\n');
  } else {
    fixedLines.push(newLine);
    if (i < lines.length - 1) {
      fixedLines.push('\n');
    }
  }
}

const fixedContent = fixedLines.join('');

// Intentar parsear
try {
  JSON.parse(fixedContent);
  console.log('✅ JSON corregido y válido');

  // Guardar el archivo corregido
  fs.writeFileSync('curso-claude-code-completo-fixed.json', fixedContent, 'utf-8');
  console.log('📝 Guardado en: curso-claude-code-completo-fixed.json');
} catch (e) {
  console.error('❌ Error todavía presente:', e.message);

  // Intentar una estrategia más agresiva: usar JSON5 o limpieza manual
  console.log('\n🔄 Intentando estrategia alternativa...');

  // Leer el JSON línea por línea y construir uno nuevo limpio
  // Esta vez vamos a usar una regex más agresiva
  let cleaned = content
    .replace(/\n/g, '\\n')  // Reemplazar TODOS los \n con \\n
    .replace(/\\n"/g, '\n"')  // Restaurar los que están antes de comillas (fin de valor)
    .replace(/\\n\s*}/g, '\n}')  // Restaurar los que están antes de }
    .replace(/\\n\s*]/g, '\n]')  // Restaurar los que están antes de ]
    .replace(/\\n\s*,/g, '\n,');  // Restaurar los que están antes de comas

  try {
    JSON.parse(cleaned);
    console.log('✅ JSON limpiado correctamente con estrategia alternativa');
    fs.writeFileSync('curso-claude-code-completo-fixed.json', cleaned, 'utf-8');
    console.log('📝 Guardado en: curso-claude-code-completo-fixed.json');
  } catch (e2) {
    console.error('❌ No se pudo corregir automáticamente');
    console.error('Error:', e2.message);
  }
}
