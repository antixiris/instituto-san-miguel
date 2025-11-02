const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixDescription() {
  try {
    const modules = await prisma.module.findMany({
      where: { course: { slug: 'especialista-claude-code' } },
      include: { moduleTest: true },
      orderBy: { order: 'asc' }
    });

    const mod2 = modules.find(m => m.order === 2);
    
    if (mod2 && mod2.moduleTest) {
      console.log('Actualizando descripción del test...');
      
      const updated = await prisma.moduleTest.update({
        where: { id: mod2.moduleTest.id },
        data: {
          description: 'Responde las siguientes 10 preguntas sobre los contenidos del Módulo 2: Desarrollo Básico con Claude. Tienes 60 minutos para completar el test. Solo tu primer intento contará para la nota final.'
        }
      });
      
      console.log('\n✅ Descripción actualizada exitosamente:');
      console.log('Antes: Tienes 10 minutos para completar el test');
      console.log('Ahora: Tienes 60 minutos para completar el test');
      console.log('\nDescripción completa:', updated.description);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixDescription();
