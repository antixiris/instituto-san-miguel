const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function getFullLesson() {
  try {
    // Buscar el curso específico
    const course = await prisma.course.findFirst({
      where: {
        title: {
          contains: 'Claude Code'
        }
      },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    });

    if (course) {
      console.log(`✅ Curso encontrado: ${course.title}\n`);

      // Guardar info del Módulo 1
      const module1 = course.modules.find(m => m.order === 1);
      if (module1 && module1.lessons.length > 0) {
        console.log(`📚 Módulo 1: ${module1.title}`);
        console.log(`   Lecciones: ${module1.lessons.length}\n`);

        // Guardar primera lección como ejemplo
        const lesson = module1.lessons[0];
        const exampleContent = `MÓDULO 1 - LECCIÓN EJEMPLO
===============================
Título: ${lesson.title}
Tipo: ${lesson.type}

CONTENIDO:
${lesson.content}

===============================
`;

        fs.writeFileSync('/Users/cantico/PROGRAMACIÓN/instituto-san-miguel/backend/module1-example.txt', exampleContent);
        console.log('✅ Contenido guardado en module1-example.txt');
      }

      // Listar todos los módulos y sus lecciones
      console.log('\n📋 ESTRUCTURA COMPLETA DEL CURSO:\n');
      course.modules.forEach(module => {
        console.log(`\nMÓDULO ${module.order}: ${module.title}`);
        console.log(`ID: ${module.id}`);
        console.log(`Lecciones: ${module.lessons.length}`);
        module.lessons.forEach((lesson, idx) => {
          console.log(`  ${idx + 1}. ${lesson.title} (${lesson.id})`);
        });
      });
    }
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

getFullLesson();
