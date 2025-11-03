const fs = require('fs').promises;
const path = require('path');

// Mapeo de correcciones comunes
const corrections = [
  // Palabras truncadas comunes
  { from: /\bCAndo\b/g, to: 'Cuando' },
  { from: /\bCMo\b/g, to: 'Cómo' },
  { from: /\bCDigo\b/g, to: 'Código' },
  { from: /\bCEar\b/g, to: 'Crear' },
  { from: /\bCMbiar\b/g, to: 'Cambiar' },
  { from: /\bPDir\b/g, to: 'Pedir' },
  { from: /\bPDirle\b/g, to: 'Pedirle' },
  { from: /\bHCerlo\b/g, to: 'Hacerlo' },
  { from: /\bMJorarlo\b/g, to: 'Mejorarlo' },
  { from: /\bMJoremos\b/g, to: 'Mejoremos' },
  { from: /\bIEntificar\b/g, to: 'Identificar' },
  { from: /\bNMbres\b/g, to: 'Nombres' },
  { from: /\bAAdiendo\b/g, to: 'Añadiendo' },
  { from: /\bEErcicio\b/g, to: 'Ejercicio' },
  { from: /\bHGámoslo\b/g, to: 'Hagámoslo' },
  { from: /\bIAgina\b/g, to: 'Imagina' },
  { from: /\bERores\b/g, to: 'Errores' },
  { from: /\bEContrar\b/g, to: 'Encontrar' },
  { from: /\bVRificar\b/g, to: 'Verificar' },
  { from: /\bOVidar\b/g, to: 'Olvidar' },
  { from: /\bUAr\b/g, to: 'Usar' },
  { from: /\bCMillas\b/g, to: 'Comillas' },
  { from: /\bECribir\b/g, to: 'Escribir' },
  { from: /\bPObar\b/g, to: 'Probar' },
  { from: /\bPObando\b/g, to: 'Probando' },
  { from: /\bEEcutar\b/g, to: 'Ejecutar' },
  { from: /\bCMentarios\b/g, to: 'Comentarios' },
  { from: /\bDCumentar\b/g, to: 'Documentar' },
  { from: /\bFNción\b/g, to: 'Función' },
  { from: /\bJNtando\b/g, to: 'Juntando' },
  { from: /\bLSta\b/g, to: 'Lista' },
  { from: /\bPEparación\b/g, to: 'Preparación' },
  { from: /\bIIcializar\b/g, to: 'Inicializar' },
  { from: /\bCNstruyendo\b/g, to: 'Construyendo' },
  { from: /\bAAdir\b/g, to: 'Añadir' },
  { from: /\bVR todas\b/g, to: 'Ver todas' },
  { from: /\bCMpletar\b/g, to: 'Completar' },
  { from: /\bEIminar\b/g, to: 'Eliminar' },
  { from: /: E código/g, to: ': El código' },
  { from: /: ¿Or qué/g, to: ': ¿Por qué' },
  { from: /: L función/g, to: ': La función' },
  { from: /: L estructura/g, to: ': La estructura' },
  { from: /: E test/g, to: ': El test' },
  { from: /: LS /g, to: ': Los ' },
  { from: /: T primer/g, to: ': Tu primer' },
  { from: /^### ¿qué/gm, to: '### ¿Qué' },

  // Palabras al inicio de título
  { from: /^## T primera/gm, to: '## Tu primera' },
  { from: /^### T primer/gm, to: '### Tu primer' },
  { from: /: L primera/g, to: ': La primera' },
  { from: /: L segunda/g, to: ': La segunda' },
  { from: /: L tercera/g, to: ': La tercera' },
  { from: /^## L primera/gm, to: '## La primera' },
  { from: /^## L segundo/gm, to: '## La segunda' },
  { from: /^## L tercera/gm, to: '## La tercera' },
  { from: /^### L /gm, to: '### La ' },

  // Artículos y palabras comunes truncadas
  { from: /\b N probar\b/g, to: ' No probar' },
  { from: /\b N hacer\b/g, to: ' No hacer' },
  { from: /\b N verificar\b/g, to: ' No verificar' },

  // Corrección de minúsculas incorrectas en títulos con emojis
  { from: /^## 🎯 lo que/gm, to: '## 🎯 Lo que' },
  { from: /^### 📊 un dato/gm, to: '### 📊 Un dato' },
  { from: /^## ⚠️ errores/gm, to: '## ⚠️ Errores' },
  { from: /^## ⚠️ los/gm, to: '## ⚠️ Los' },
  { from: /^## 💡 tips/gm, to: '## 💡 Tips' },
  { from: /^## ✨ buenas/gm, to: '## ✨ Buenas' },
  { from: /^## 🚀 siguiente/gm, to: '## 🚀 Siguiente' },
  { from: /^## ¿por qué/gm, to: '## ¿Por qué' },
];

async function fixFile(filePath) {
  console.log(`\n📝 Procesando: ${path.basename(filePath)}`);

  let content = await fs.readFile(filePath, 'utf-8');
  let fixed = 0;

  for (const { from, to } of corrections) {
    const matches = content.match(from);
    if (matches) {
      content = content.replace(from, to);
      fixed += matches.length;
    }
  }

  if (fixed > 0) {
    await fs.writeFile(filePath, content, 'utf-8');
    console.log(`  ✓ ${fixed} correcciones aplicadas`);
  } else {
    console.log(`  • Sin cambios necesarios`);
  }

  return fixed;
}

async function main() {
  console.log('🔧 CORRECCIÓN DE PROBLEMAS DE CODIFICACIÓN\n');
  console.log('='.repeat(60));

  const contentDir = '/Users/cantico/PROGRAMACIÓN/instituto-san-miguel/contenidos-curso';
  const files = [
    'mod2leccion1.md',
    'mod2leccion2.md',
    'mod2leccion3.md',
    'mod2leccion4.md',
    'mod2leccion5.md',
    'mod2leccion6.md'
  ];

  let totalFixed = 0;

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const count = await fixFile(filePath);
    totalFixed += count;
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n✅ Proceso completado: ${totalFixed} correcciones en total\n`);
}

main().catch(console.error);
