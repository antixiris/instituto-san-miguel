const { PrismaClient } = require('@prisma/client');
const fs = require('fs').promises;
const path = require('path');

const prisma = new PrismaClient();

// Palabras que siempre van en mayúscula
const properNouns = ['Claude', 'Code', 'JavaScript', 'TypeScript', 'Node.js', 'Express',
  'React', 'API', 'REST', 'JWT', 'HTML', 'CSS', 'SQL', 'GitHub',
  'JSON', 'Prisma', 'PostgreSQL', 'Jest', 'Vitest', 'VSCode',
  'MCP', 'IA', 'AI', 'CI/CD', 'AWS', 'Docker'];

function fixTitle(title) {
  // Dividir por dos puntos si los hay
  if (title.includes(':')) {
    const [before, ...after] = title.split(':');
    const afterText = after.join(':').trim();

    return fixPart(before.trim()) + ': ' +
           afterText.charAt(0).toUpperCase() +
           fixPart(afterText.substring(1));
  } else {
    return fixPart(title);
  }
}

function fixPart(text) {
  const words = text.split(' ');

  return words.map((word, index) => {
    // Primera palabra: mayúscula inicial
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    }

    // Buscar si es nombre propio
    const properNoun = properNouns.find(pn =>
      word.toLowerCase() === pn.toLowerCase()
    );

    if (properNoun) {
      return properNoun;
    }

    // Resto: minúscula
    return word.toLowerCase();
  }).join(' ');
}

async function main() {
  console.log('🔧 CORRECCIÓN SIMPLE DE MAYÚSCULAS\n');

  // Correcciones manuales para la BD
  const corrections = [
    {
      oldTitle: "Primeros pasos: TU primer proyecto con Claude",
      newTitle: "Primeros pasos: Tu primer proyecto con Claude"
    },
    {
      oldTitle: "Primeros pasos: T primer proyecto con Claude",
      newTitle: "Primeros pasos: Tu primer proyecto con Claude"
    },
    {
      oldTitle: "Escribir código con Claude: MEjores prácticas",
      newTitle: "Escribir código con Claude: Mejores prácticas"
    },
    {
      oldTitle: "Escribir código con Claude: Mjores prácticas",
      newTitle: "Escribir código con Claude: Mejores prácticas"
    },
    {
      oldTitle: "Ejercicio práctico: APi REST básica",
      newTitle: "Ejercicio práctico: API REST básica"
    },
    {
      oldTitle: "Ejercicio práctico: Ai REST básica",
      newTitle: "Ejercicio práctico: API REST básica"
    }
  ];

  console.log('🗄️  Corrigiendo base de datos...\n');

  for (const { oldTitle, newTitle } of corrections) {
    const lesson = await prisma.lesson.findFirst({
      where: { title: oldTitle }
    });

    if (lesson) {
      await prisma.lesson.update({
        where: { id: lesson.id },
        data: { title: newTitle }
      });
      console.log(`✓ "${oldTitle}"`);
      console.log(`  → "${newTitle}"\n`);
    }
  }

  // Corregir archivos Markdown
  console.log('📝 Corrigiendo archivos Markdown...\n');

  const contentDir = '/Users/cantico/PROGRAMACIÓN/instituto-san-miguel/contenidos-curso';
  const files = ['mod2leccion1.md', 'mod2leccion2.md', 'mod2leccion3.md',
                 'mod2leccion4.md', 'mod2leccion5.md', 'mod2leccion6.md'];

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    let content = await fs.readFile(filePath, 'utf-8');

    // Corregir títulos (líneas que empiezan con #)
    content = content.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, titleText) => {
      const fixed = fixTitle(titleText);
      return `${hashes} ${fixed}`;
    });

    await fs.writeFile(filePath, content, 'utf-8');
    console.log(`✓ ${file}`);
  }

  console.log('\n✅ Corrección completada\n');

  await prisma.$disconnect();
}

main().catch(console.error);
