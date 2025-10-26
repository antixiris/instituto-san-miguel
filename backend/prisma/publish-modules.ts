import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('📢 Publicando todos los módulos del curso Claude Code...');

  const updated = await prisma.module.updateMany({
    where: {
      course: {
        slug: 'especialista-claude-code',
      },
    },
    data: {
      isPublished: true,
    },
  });

  console.log(`✅ ${updated.count} módulos publicados correctamente`);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
