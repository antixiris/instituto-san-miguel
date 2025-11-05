const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateModule7And8Tests() {
  console.log('🎬 Actualizando tests de Módulos 7 y 8 con preguntas reales...\n');

  const course = await prisma.course.findFirst({
    where: { slug: 'especialista-claude-code' },
    include: {
      modules: {
        where: { order: { in: [7, 8] } },
        orderBy: { order: 'asc' },
        include: {
          moduleTest: {
            include: {
              questions: true
            }
          }
        }
      }
    }
  });

  // MÓDULO 7: Full Stack con Claude
  const module7 = course.modules.find(m => m.order === 7);
  if (module7 && module7.moduleTest) {
    console.log('═══════════════════════════════════════════');
    console.log('📦 MÓDULO 7: Full Stack con Claude');
    console.log('═══════════════════════════════════════════\n');

    await prisma.moduleTestQuestion.deleteMany({
      where: { testId: module7.moduleTest.id }
    });

    const module7Questions = [
      {
        question: '¿Qué es una arquitectura full stack y qué roles cumple?',
        type: 'SINGLE',
        options: JSON.stringify([
          'Solo desarrollo de frontend',
          'Frontend (interfaz) + Backend (servidor) + Base de datos trabajando juntos',
          'Solo bases de datos',
          'Un framework de JavaScript'
        ]),
        correctAnswer: JSON.stringify([1]),
        explanation: 'Full stack es la combinación de Frontend (interfaz que ve el usuario), Backend (servidor que procesa lógica) y Base de datos (almacena información). Todo trabajando coordinadamente.',
        points: 10,
        order: 1
      },
      {
        question: '¿Cómo se comunica el frontend con el backend según la lección?',
        type: 'SINGLE',
        options: JSON.stringify([
          'No se comunican directamente',
          'Mediante peticiones HTTP (GET, POST, PUT, DELETE) a endpoints API',
          'Solo con WebSockets',
          'Mediante cables físicos'
        ]),
        correctAnswer: JSON.stringify([1]),
        explanation: 'El frontend se comunica con el backend mediante peticiones HTTP a endpoints API. Por ejemplo: GET /api/users para obtener usuarios, POST /api/login para autenticación.',
        points: 10,
        order: 2
      },
      {
        question: '¿Qué es el state management y por qué es importante en apps full stack?',
        type: 'SINGLE',
        options: JSON.stringify([
          'Una base de datos especial',
          'Gestión del estado (datos) de la aplicación para sincronizar frontend con backend',
          'Un tipo de CSS',
          'Una librería de testing'
        ]),
        correctAnswer: JSON.stringify([1]),
        explanation: 'State management es gestionar el estado (datos) de la aplicación. Es crítico en full stack para mantener sincronizados los datos del frontend con el backend (ej: Zustand, Redux).',
        points: 10,
        order: 3
      },
      {
        question: '¿Qué es CI/CD en el contexto de deployment?',
        type: 'SINGLE',
        options: JSON.stringify([
          'Un lenguaje de programación',
          'Continuous Integration / Continuous Deployment: automatización de testing y deployment',
          'Una base de datos',
          'Un framework frontend'
        ]),
        correctAnswer: JSON.stringify([1]),
        explanation: 'CI/CD es Continuous Integration (integración continua) y Continuous Deployment (deployment continuo). Automatiza el proceso de testing y despliegue cada vez que hay cambios en el código.',
        points: 10,
        order: 4
      },
      {
        question: '¿Qué herramientas se usan para monitoreo y logging en producción?',
        type: 'MULTIPLE',
        options: JSON.stringify([
          'Winston (logging estructurado)',
          'Sentry (tracking de errores)',
          'Prometheus/Grafana (métricas y dashboards)',
          'React (frontend)'
        ]),
        correctAnswer: JSON.stringify([0, 1, 2]),
        explanation: 'Para monitoreo se usan: Winston (logs), Sentry (errores), Prometheus/Grafana (métricas y visualización). React es solo frontend, no herramienta de monitoreo.',
        points: 10,
        order: 5
      },
      {
        question: 'En el proyecto E-commerce completo, ¿qué módulos integra el sistema full stack?',
        type: 'MULTIPLE',
        options: JSON.stringify([
          'Frontend con React + TypeScript',
          'Backend con Node.js + Express + Prisma',
          'Autenticación JWT + RBAC',
          'Solo HTML estático'
        ]),
        correctAnswer: JSON.stringify([0, 1, 2]),
        explanation: 'El proyecto e-commerce integra: Frontend React+TypeScript, Backend Node+Express+Prisma, Autenticación JWT+RBAC, Payments, Email, etc. HTML estático no es full stack.',
        points: 10,
        order: 6
      },
      {
        question: '¿Qué es Docker y por qué se usa en deployment?',
        type: 'SINGLE',
        options: JSON.stringify([
          'Un lenguaje de programación',
          'Contenedores que empaquetan la app con todas sus dependencias para deployment consistente',
          'Una base de datos',
          'Un editor de código'
        ]),
        correctAnswer: JSON.stringify([1]),
        explanation: 'Docker empaqueta tu aplicación con todas sus dependencias en contenedores, asegurando que funcione igual en desarrollo, staging y producción ("works on my machine" → "works everywhere").',
        points: 10,
        order: 7
      },
      {
        question: '¿Cómo ayuda Claude Code con deployment según la lección?',
        type: 'MULTIPLE',
        options: JSON.stringify([
          'Genera Dockerfiles optimizados',
          'Crea scripts de deployment automatizados',
          'Configura CI/CD con GitHub Actions',
          'Reemplaza completamente a DevOps engineers'
        ]),
        correctAnswer: JSON.stringify([0, 1, 2]),
        explanation: 'Claude Code ayuda generando Dockerfiles, scripts de deployment, y configuración CI/CD. No reemplaza a DevOps engineers, sino que asiste y acelera el proceso.',
        points: 10,
        order: 8
      },
      {
        question: '¿Qué es WebSocket y cuándo se usa en apps full stack?',
        type: 'SINGLE',
        options: JSON.stringify([
          'Un tipo de base de datos',
          'Protocolo de comunicación bidireccional en tiempo real (chat, notifications)',
          'Un framework de CSS',
          'Una librería de testing'
        ]),
        correctAnswer: JSON.stringify([1]),
        explanation: 'WebSocket es un protocolo de comunicación bidireccional en tiempo real. Se usa para features que necesitan updates instantáneos: chat, notifications, dashboards en vivo, juegos multiplayer.',
        points: 10,
        order: 9
      },
      {
        question: '¿Qué métricas son importantes monitorear en una app full stack en producción?',
        type: 'MULTIPLE',
        options: JSON.stringify([
          'Tiempo de respuesta de API',
          'Tasa de errores (error rate)',
          'Uso de CPU y memoria',
          'Color favorito de los usuarios'
        ]),
        correctAnswer: JSON.stringify([0, 1, 2]),
        explanation: 'Métricas críticas: tiempo de respuesta API, tasa de errores, uso de recursos (CPU/memoria), throughput, disponibilidad. El color favorito de usuarios no es métrica técnica relevante.',
        points: 10,
        order: 10
      }
    ];

    for (const q of module7Questions) {
      await prisma.moduleTestQuestion.create({
        data: { testId: module7.moduleTest.id, ...q }
      });
      console.log(`✅ Pregunta ${q.order}: ${q.question.substring(0, 50)}...`);
    }

    console.log('\n✅ MÓDULO 7 ACTUALIZADO - 10 preguntas creadas\n');
  }

  // MÓDULO 8: Productividad y Workflows
  const module8 = course.modules.find(m => m.order === 8);
  if (module8 && module8.moduleTest) {
    console.log('═══════════════════════════════════════════');
    console.log('📦 MÓDULO 8: Productividad y Workflows');
    console.log('═══════════════════════════════════════════\n');

    await prisma.moduleTestQuestion.deleteMany({
      where: { testId: module8.moduleTest.id }
    });

    const module8Questions = [
      {
        question: '¿Cómo ayuda Claude Code con Git y control de versiones?',
        type: 'MULTIPLE',
        options: JSON.stringify([
          'Genera mensajes de commit descriptivos automáticamente',
          'Resuelve conflictos de merge explicando diferencias',
          'Crea branch strategies (gitflow, trunk-based)',
          'Elimina la necesidad de usar Git'
        ]),
        correctAnswer: JSON.stringify([0, 1, 2]),
        explanation: 'Claude Code ayuda con Git generando commits descriptivos, resolviendo conflictos, y sugiriendo branch strategies. No elimina Git, lo hace más accesible y eficiente.',
        points: 10,
        order: 1
      },
      {
        question: '¿Qué es un code review y cómo lo asiste Claude Code?',
        type: 'SINGLE',
        options: JSON.stringify([
          'Un tipo de test automatizado',
          'Revisión de código por otro desarrollador, Claude sugiere mejoras y detecta bugs',
          'Una base de datos de código',
          'Un framework de JavaScript'
        ]),
        correctAnswer: JSON.stringify([1]),
        explanation: 'Code review es cuando otro desarrollador revisa tu código. Claude Code asiste sugiriendo mejoras, detectando bugs potenciales, y explicando código complejo.',
        points: 10,
        order: 2
      },
      {
        question: '¿Qué tareas repetitivas puede automatizar Claude Code?',
        type: 'MULTIPLE',
        options: JSON.stringify([
          'Generación de boilerplate code (configuraciones, schemas)',
          'Creación de tests unitarios',
          'Actualización de documentación',
          'Tomar café por ti'
        ]),
        correctAnswer: JSON.stringify([0, 1, 2]),
        explanation: 'Claude Code automatiza: generación de boilerplate, tests, documentación, migrations, scripts de deploy. No puede tomar café físicamente (aún).',
        points: 10,
        order: 3
      },
      {
        question: '¿Qué son los scripts CLI y para qué sirven?',
        type: 'SINGLE',
        options: JSON.stringify([
          'Un lenguaje de programación',
          'Scripts de línea de comandos para automatizar tareas (migrations, seeds, deploys)',
          'Una base de datos',
          'Un framework frontend'
        ]),
        correctAnswer: JSON.stringify([1]),
        explanation: 'Scripts CLI son programas de línea de comandos para automatizar tareas: migrations de DB, seed de datos, deployment, generación de reportes, limpieza de archivos, etc.',
        points: 10,
        order: 4
      },
      {
        question: '¿Cómo se integra Claude Code con IDEs como VS Code?',
        type: 'SINGLE',
        options: JSON.stringify([
          'No se puede integrar con IDEs',
          'Mediante extensión oficial que permite chat y edición de código dentro del IDE',
          'Solo funciona en terminal',
          'Requiere instalar un nuevo sistema operativo'
        ]),
        correctAnswer: JSON.stringify([1]),
        explanation: 'Claude Code tiene extensión oficial para VS Code que permite chat inline, edición de código, y todas las features directamente en el IDE.',
        points: 10,
        order: 5
      },
      {
        question: '¿Qué mejores prácticas de equipo menciona la lección?',
        type: 'MULTIPLE',
        options: JSON.stringify([
          'Commits atómicos y descriptivos',
          'Pull Requests con descripción clara',
          'Documentación de decisiones técnicas',
          'Programar solo de noche'
        ]),
        correctAnswer: JSON.stringify([0, 1, 2]),
        explanation: 'Mejores prácticas: commits atómicos, PRs descriptivos, documentación de decisiones. Programar solo de noche no es best practice, cada quien tiene su horario óptimo.',
        points: 10,
        order: 6
      },
      {
        question: '¿Qué es un "slash command" en Claude Code?',
        type: 'SINGLE',
        options: JSON.stringify([
          'Un bug del sistema',
          'Comando personalizado que empieza con / para ejecutar acciones específicas',
          'Una forma de dividir números',
          'Un tipo de base de datos'
        ]),
        correctAnswer: JSON.stringify([1]),
        explanation: 'Slash commands (ej: /commit, /test, /docs) son comandos personalizados que ejecutan acciones específicas. Permiten crear workflows customizados para tu equipo.',
        points: 10,
        order: 7
      },
      {
        question: '¿Cómo ayuda Claude Code a mantener la productividad del equipo?',
        type: 'MULTIPLE',
        options: JSON.stringify([
          'Onboarding rápido de nuevos developers',
          'Documentación automática y actualizada',
          'Resolución rápida de bugs comunes',
          'Elimina la necesidad de reuniones de equipo'
        ]),
        correctAnswer: JSON.stringify([0, 1, 2]),
        explanation: 'Claude Code aumenta productividad con: onboarding rápido, documentación auto-generada, debugging acelerado. Las reuniones de equipo siguen siendo importantes para comunicación.',
        points: 10,
        order: 8
      },
      {
        question: '¿Qué es pair programming con Claude Code?',
        type: 'SINGLE',
        options: JSON.stringify([
          'Programar con dos computadoras',
          'Trabajar con Claude como "copiloto" que sugiere, revisa y mejora código en tiempo real',
          'Una técnica de bases de datos',
          'Un framework de testing'
        ]),
        correctAnswer: JSON.stringify([1]),
        explanation: 'Pair programming con Claude es trabajar con Claude como copiloto que sugiere código, revisa en tiempo real, explica decisiones, y acelera el desarrollo.',
        points: 10,
        order: 9
      },
      {
        question: '¿Qué ventaja principal tiene automatizar workflows con Claude Code?',
        type: 'SINGLE',
        options: JSON.stringify([
          'El código se ejecuta más rápido',
          'Reduce tiempo en tareas repetitivas, aumenta consistencia y permite enfocarse en lógica compleja',
          'Elimina todos los bugs automáticamente',
          'Hace que el café sepa mejor'
        ]),
        correctAnswer: JSON.stringify([1]),
        explanation: 'Automatizar workflows reduce tiempo en tareas repetitivas (tests, docs, migrations), aumenta consistencia en el equipo, y libera tiempo para resolver problemas complejos.',
        points: 10,
        order: 10
      }
    ];

    for (const q of module8Questions) {
      await prisma.moduleTestQuestion.create({
        data: { testId: module8.moduleTest.id, ...q }
      });
      console.log(`✅ Pregunta ${q.order}: ${q.question.substring(0, 50)}...`);
    }

    console.log('\n✅ MÓDULO 8 ACTUALIZADO - 10 preguntas creadas\n');
  }

  console.log('═══════════════════════════════════════════');
  console.log('✅ TODOS LOS TESTS ACTUALIZADOS');
  console.log('═══════════════════════════════════════════');
  console.log('📊 Módulo 7: 10 preguntas (6 SINGLE, 4 MULTIPLE)');
  console.log('📊 Módulo 8: 10 preguntas (6 SINGLE, 4 MULTIPLE)');
  console.log('💯 Total: 200 puntos');
  console.log('═══════════════════════════════════════════');

  await prisma.$disconnect();
}

updateModule7And8Tests()
  .then(() => {
    console.log('\n🎉 Proceso completado con éxito');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
