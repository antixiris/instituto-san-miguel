const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true
      },
      orderBy: { email: 'asc' }
    });

    console.log('Usuarios en la base de datos:', users.length);
    console.log('');
    
    users.forEach((user, index) => {
      console.log((index + 1) + '.', user.firstName, user.lastName);
      console.log('   Email:', user.email);
      console.log('   Rol:', user.role);
      console.log('   ID:', user.id);
      console.log('');
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

findUsers();
