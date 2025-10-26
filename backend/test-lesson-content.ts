import { getLessonContent } from './prisma/lesson-contents';

const content = getLessonContent(0, 0, 'Qué es Claude Code y por qué usarlo');

console.log('📊 Longitud del contenido:', content.length);
console.log('');
console.log('🔍 Primeros 1000 caracteres:');
console.log(content.substring(0, 1000));
console.log('');
console.log('🔍 Verificaciones:');
console.log(`   - Contiene "Bienvenido a la Revolución": ${content.includes('Bienvenido a la Revolución')}`);
console.log(`   - Contiene "Sofía García": ${content.includes('Sofía García')}`);
console.log(`   - Contiene "€65k - €95k": ${content.includes('€65k - €95k')}`);
