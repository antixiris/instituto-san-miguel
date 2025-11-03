const { PrismaClient } = require('@prisma/client');
const fs = require('fs').promises;
const path = require('path');

const prisma = new PrismaClient();

/**
 * Convierte títulos del estilo anglosajón al español
 * Ejemplo: "Tu Primera Conversación" → "Tu primera conversación"
 */
function fixSpanishCapitalization(text) {
  if (!text) return text;

  // Lista de palabras que siempre van en mayúscula (nombres propios, siglas, etc.)
  const alwaysCapitalized = [
    'Claude', 'Code', 'JavaScript', 'TypeScript', 'Node.js', 'Express',
    'React', 'API', 'REST', 'JWT', 'HTML', 'CSS', 'SQL', 'GitHub',
    'JSON', 'Prisma', 'PostgreSQL', 'Jest', 'Vitest', 'VSCode',
    'MCP', 'IA', 'AI', 'CI/CD', 'AWS', 'Docker'
  ];

  // Mantener mayúscula después de dos puntos
  const hasColon = text.includes(':');

  if (hasColon) {
    const parts = text.split(':');
    parts[0] = fixPart(parts[0].trim(), alwaysCapitalized);
    // Después de los dos puntos, también aplicar capitalización española
    if (parts[1]) {
      const secondPart = parts[1].trim();
      parts[1] = ' ' + secondPart.charAt(0).toUpperCase() +
                 secondPart.substring(1).split(' ').map((word, idx) => {
                   if (idx === 0) return word.substring(1).toLowerCase();
                   const capitalizedMatch = alwaysCapitalized.find(
                     cap => word.toLowerCase() === cap.toLowerCase()
                   );
                   return capitalizedMatch || word.toLowerCase();
                 }).join(' ');
    }
    return parts.join(':');
  } else {
    return fixPart(text, alwaysCapitalized);
  }
}

function fixPart(text, alwaysCapitalized) {
  const words = text.split(' ');

  return words.map((word, index) => {
    // Primera palabra siempre con mayúscula inicial
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    }

    // Verificar si es una palabra que siempre va en mayúscula
    const capitalizedMatch = alwaysCapitalized.find(
      cap => word.toLowerCase() === cap.toLowerCase()
    );

    if (capitalizedMatch) {
      return capitalizedMatch;
    }

    // Resto de palabras en minúscula
    return word.toLowerCase();
  }).join(' ');
}

async function fixMarkdownFiles() {
  console.log('📝 Corrigiendo mayúsculas en archivos Markdown...\n');

  const contentDir = '/Users/cantico/PROGRAMACIÓN/instituto-san-miguel/contenidos-curso';
  const files = [
    'mod2leccion1.md',
    'mod2leccion2.md',
    'mod2leccion3.md',
    'mod2leccion4.md',
    'mod2leccion5.md',
    'mod2leccion6.md'
  ];

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    let content = await fs.readFile(filePath, 'utf-8');

    // Reemplazar títulos (líneas que empiezan con #)
    content = content.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, title) => {
      const fixed = fixSpanishCapitalization(title);
      return `${hashes} ${fixed}`;
    });

    await fs.writeFile(filePath, content, 'utf-8');
    console.log(`✓ ${file} corregido`);
  }

  console.log('\n✅ Archivos Markdown corregidos\n');
}

async function fixDatabaseTitles() {
  console.log('🗄️  Corrigiendo títulos en la base de datos...\n');

  // Obtener todas las lecciones de los módulos 1 y 2
  const modules = await prisma.module.findMany({
    where: {
      OR: [
        { title: { contains: 'Módulo 1' } },
        { title: { contains: 'Módulo 2' } }
      ]
    },
    include: {
      lessons: true
    }
  });

  let corrected = 0;

  for (const module of modules) {
    console.log(`\n📚 Módulo: ${module.title}`);

    for (const lesson of module.lessons) {
      const originalTitle = lesson.title;
      const fixedTitle = fixSpanishCapitalization(originalTitle);

      if (originalTitle !== fixedTitle) {
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: { title: fixedTitle }
        });

        console.log(`  ✓ "${originalTitle}"`);
        console.log(`    → "${fixedTitle}"`);
        corrected++;
      } else {
        console.log(`  • "${originalTitle}" (ya correcto)`);
      }
    }
  }

  console.log(`\n✅ ${corrected} títulos corregidos en la base de datos\n`);
}

async function main() {
  try {
    console.log('🔧 CORRECCIÓN DE MAYÚSCULAS AL ESTILO ESPAÑOL\n');
    console.log('='.repeat(60) + '\n');

    // 1. Corregir archivos Markdown
    await fixMarkdownFiles();

    // 2. Corregir base de datos
    await fixDatabaseTitles();

    console.log('='.repeat(60));
    console.log('\n✨ PROCESO COMPLETADO\n');
    console.log('Todos los títulos ahora siguen las normas ortográficas del español:');
    console.log('- Mayúscula inicial');
    console.log('- Mayúsculas en nombres propios (Claude, JavaScript, etc.)');
    console.log('- Resto en minúsculas\n');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
