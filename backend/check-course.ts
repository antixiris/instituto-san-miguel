import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const course = await prisma.course.findUnique({
    where: { slug: 'especialista-claude-code' },
    include: {
      instructor: true,
      modules: {
        include: {
          lessons: { select: { id: true, title: true } }
        }
      }
    }
  });

  if (!course) {
    console.log('❌ Course not found');
    return;
  }

  console.log('✅ Course found:');
  console.log('  Title:', course.title);
  console.log('  Price:', course.price);
  console.log('  Level:', course.level);
  console.log('  Duration:', course.duration);
  console.log('  Modules:', course.modules.length);
  console.log('  Total Lessons:', course.modules.reduce((sum, m) => sum + m.lessons.length, 0));
  console.log('');
  console.log('✅ Instructor:');
  console.log('  Name:', course.instructor.firstName, course.instructor.lastName);
  console.log('  Avatar:', course.instructor.avatar);
  console.log('  Bio length:', course.instructor.bio?.length || 0, 'chars');
  console.log('');
  console.log('✅ Learning Goals:', course.learningGoals ? JSON.parse(course.learningGoals).length : 0);
  console.log('✅ Prerequisites:', course.prerequisites ? JSON.parse(course.prerequisites).length : 0);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
