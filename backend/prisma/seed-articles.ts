import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const loremIpsum = `
<h2>Introducción</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<h3>Marco Teórico</h3>
<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

<blockquote>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</blockquote>

<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>

<h3>Metodología</h3>
<p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>

<ul>
  <li>At vero eos et accusamus et iusto odio dignissimos</li>
  <li>Ducimus qui blanditiis praesentium voluptatum deleniti</li>
  <li>Atque corrupti quos dolores et quas molestias excepturi</li>
  <li>Sint occaecati cupiditate non provident</li>
</ul>

<p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>

<h3>Resultados</h3>
<p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>

<p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.</p>

<h2>Conclusiones</h2>
<p>Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

<p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
`;

async function main() {
  console.log('🌱 Seeding articles...');

  // Verificar que exista al menos un usuario con rol INSTRUCTOR o ADMIN
  let author = await prisma.user.findFirst({
    where: {
      OR: [
        { role: 'INSTRUCTOR' },
        { role: 'ADMIN' }
      ]
    }
  });

  // Si no existe, crear un usuario de prueba
  if (!author) {
    console.log('Creating test author...');
    author = await prisma.user.create({
      data: {
        email: 'investigador@instituto-sanmiguel.es',
        password: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u', // password123
        firstName: 'Dr. Carlos',
        lastName: 'Rodríguez',
        role: 'INSTRUCTOR',
        bio: 'Doctor en Inteligencia Artificial y Procesamiento del Lenguaje Natural. Investigador principal en el Instituto San Miguel.',
        isActive: true,
        emailVerified: true,
      },
    });
    console.log('✓ Test author created');
  }

  // Crear categorías
  console.log('Creating categories...');
  const categories = await Promise.all([
    prisma.articleCategory.upsert({
      where: { slug: 'modelos-de-lenguaje' },
      update: {},
      create: {
        name: 'Modelos de Lenguaje',
        slug: 'modelos-de-lenguaje',
        description: 'Investigación sobre arquitecturas de modelos de lenguaje',
        color: '#3B82F6',
        order: 1,
      },
    }),
    prisma.articleCategory.upsert({
      where: { slug: 'semantica-computacional' },
      update: {},
      create: {
        name: 'Semántica Computacional',
        slug: 'semantica-computacional',
        description: 'Estudios sobre representación y comprensión semántica',
        color: '#EA580C',
        order: 2,
      },
    }),
    prisma.articleCategory.upsert({
      where: { slug: 'ia-etica' },
      update: {},
      create: {
        name: 'IA Ética',
        slug: 'ia-etica',
        description: 'Consideraciones éticas en sistemas de IA',
        color: '#6366F1',
        order: 3,
      },
    }),
  ]);
  console.log('✓ Categories created');

  // Crear tags
  console.log('Creating tags...');
  const tags = await Promise.all([
    prisma.articleTagName.upsert({
      where: { slug: 'transformers' },
      update: {},
      create: { name: 'Transformers', slug: 'transformers' },
    }),
    prisma.articleTagName.upsert({
      where: { slug: 'nlp' },
      update: {},
      create: { name: 'NLP', slug: 'nlp' },
    }),
    prisma.articleTagName.upsert({
      where: { slug: 'deep-learning' },
      update: {},
      create: { name: 'Deep Learning', slug: 'deep-learning' },
    }),
    prisma.articleTagName.upsert({
      where: { slug: 'espanol' },
      update: {},
      create: { name: 'Español', slug: 'espanol' },
    }),
    prisma.articleTagName.upsert({
      where: { slug: 'atencion' },
      update: {},
      create: { name: 'Mecanismos de Atención', slug: 'atencion' },
    }),
    prisma.articleTagName.upsert({
      where: { slug: 'embeddings' },
      update: {},
      create: { name: 'Embeddings', slug: 'embeddings' },
    }),
  ]);
  console.log('✓ Tags created');

  // Crear artículos
  console.log('Creating articles...');

  const articles = [
    {
      title: 'Mecanismos de Atención en Modelos Transformer para Español',
      slug: 'mecanismos-atencion-transformer-espanol',
      subtitle: 'Un análisis profundo de las arquitecturas de atención aplicadas al procesamiento del español',
      excerpt: 'Este estudio examina cómo los mecanismos de atención en modelos Transformer pueden optimizarse específicamente para el idioma español, considerando sus características morfosintácticas únicas.',
      categoryId: categories[0].id,
      featured: true,
      tags: [tags[0].id, tags[1].id, tags[3].id, tags[4].id],
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
    },
    {
      title: 'Embeddings Contextuales y Representación Semántica Distribuida',
      slug: 'embeddings-contextuales-representacion-semantica',
      subtitle: 'Explorando las propiedades geométricas del espacio semántico',
      excerpt: 'Una investigación sobre cómo las representaciones distribuidas capturan relaciones semánticas complejas en espacios vectoriales de alta dimensión.',
      categoryId: categories[1].id,
      featured: true,
      tags: [tags[1].id, tags[2].id, tags[5].id],
      coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=600&fit=crop',
    },
    {
      title: 'Consideraciones Éticas en el Desarrollo de Sistemas de PLN',
      slug: 'etica-desarrollo-sistemas-pln',
      subtitle: 'Hacia una IA responsable y centrada en el ser humano',
      excerpt: 'Un marco teórico para abordar los desafíos éticos en el diseño, desarrollo y despliegue de sistemas de procesamiento del lenguaje natural.',
      categoryId: categories[2].id,
      featured: true,
      tags: [tags[1].id],
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
    },
    {
      title: 'Aprendizaje por Transferencia para Lenguas de Bajos Recursos',
      slug: 'aprendizaje-transferencia-lenguas-bajos-recursos',
      subtitle: 'Técnicas de preentrenamiento y adaptación de dominio',
      excerpt: 'Estrategias efectivas para aplicar modelos preentrenados en lenguas con recursos limitados, maximizando el rendimiento con datos mínimos.',
      categoryId: categories[0].id,
      featured: false,
      tags: [tags[0].id, tags[1].id, tags[2].id],
      coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop',
    },
    {
      title: 'Análisis de Sentimientos en Redes Sociales: Retos y Oportunidades',
      slug: 'analisis-sentimientos-redes-sociales',
      subtitle: 'Procesamiento de lenguaje informal y emociones complejas',
      excerpt: 'Un estudio sobre los desafíos únicos del análisis de sentimientos en textos de redes sociales, incluyendo ironía, sarcasmo y expresiones multilingües.',
      categoryId: categories[1].id,
      featured: false,
      tags: [tags[1].id, tags[3].id],
      coverImage: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&h=600&fit=crop',
    },
    {
      title: 'Generación de Texto Neural: De GPT a Modelos Multimodales',
      slug: 'generacion-texto-neural-gpt-multimodal',
      subtitle: 'La evolución de los modelos generativos de lenguaje',
      excerpt: 'Revisión de la literatura sobre modelos generativos, desde las primeras RNN hasta los sistemas multimodales actuales capaces de procesar texto, imagen y audio.',
      categoryId: categories[0].id,
      featured: false,
      tags: [tags[0].id, tags[1].id, tags[2].id],
      coverImage: 'https://images.unsplash.com/photo-1676299081847-c0326a1c2e94?w=1200&h=600&fit=crop',
    },
  ];

  for (const articleData of articles) {
    const { tags: articleTags, ...data } = articleData;

    await prisma.article.create({
      data: {
        ...data,
        content: loremIpsum,
        authorId: author.id,
        published: true,
        publishedAt: new Date(),
        readingTime: 8,
        views: Math.floor(Math.random() * 1000) + 100,
        tags: {
          create: articleTags.map(tagId => ({
            tag: { connect: { id: tagId } }
          }))
        },
        footnotes: {
          create: [
            {
              number: 1,
              content: 'Referencia: Vaswani, A., et al. (2017). "Attention is All You Need". NeurIPS.',
              order: 0,
            },
            {
              number: 2,
              content: 'Para más detalles, véase el trabajo seminal de Bengio et al. sobre representaciones distribuidas.',
              order: 1,
            },
          ]
        }
      },
    });
  }

  console.log('✓ Articles created');
  console.log('✨ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding articles:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
