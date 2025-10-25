import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Limpiando cursos duplicados...');

  // Eliminar todos los cursos con el slug 'especialista-claude-code'
  const deleted = await prisma.course.deleteMany({
    where: {
      slug: 'especialista-claude-code',
    },
  });

  console.log(`✅ Eliminados ${deleted.count} curso(s) con slug 'especialista-claude-code'`);
  console.log('✨ Base de datos limpia. Ahora puedes ejecutar el seed.');
}

main()
  .catch((e) => {
    console.error('❌ Error al limpiar:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
