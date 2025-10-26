import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🖼️  Actualizando avatar del instructor...');

  const updated = await prisma.user.updateMany({
    where: {
      email: 'raul@institutosanmiguel.com',
    },
    data: {
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces',
    },
  });

  console.log(`✅ Avatar del instructor actualizado (${updated.count} registros)`);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
