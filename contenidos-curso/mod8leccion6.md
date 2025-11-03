<p><strong><em>Lección 6: Mejores Prácticas de Equipo con Claude Code</em></strong></p>

## Introducción

¡Felicidades! Has llegado a la última lección del Módulo 8, y con ella, al cierre de toda la formación técnica del curso. Has aprendido a usar Claude Code de forma individual, pero en el mundo real, el desarrollo es casi siempre un trabajo en **equipo**.

Hoy aprenderás cómo integrar Claude Code en los workflows de un equipo de desarrollo. No estamos hablando solo de compartir código, sino de crear una forma de trabajar donde todos aprovechen Claude Code de manera coordinada, eficiente y sin pisar se los pies unos a otros.

Lo fascinante es que **Claude Code mismo puede ayudarte a establecer estas prácticas**. Puedes pedirle que genere guías de equipo, scripts de automatización compartidos, y hasta que te explique cómo resolver conflictos de integración. Es como tener un consultor de productividad disponible 24/7. ¡Vamos a descubrir cómo trabajar en equipo con Claude Code!

## ¿Por qué son Importantes las Prácticas de Equipo?

Imagina esto: en tu equipo hay 5 desarrolladores. Cada uno usa Claude Code a su manera:
- Ana le pide a Claude que genere código sin tests
- Carlos usa prompts largos y específicos, genera tests exhaustivos
- María usa Claude para refactorizar pero no documenta los cambios
- Jorge genera código con Claude pero no lo revisa antes de hacer commit
- Luis no usa Claude en absoluto porque "prefiere hacerlo manual"

Resultado: El código del proyecto es inconsistente, difícil de mantener, y hay constantes conflictos cuando intentan integrar cambios. La productividad cae en lugar de subir.

**Mejores prácticas de equipo** significa establecer:
1. **Convenciones**: Cómo todos deberían usar Claude Code
2. **Estándares**: Qué tipo de código es aceptable (con tests, documentado, etc.)
3. **Workflows**: Cuándo y cómo usar Claude en el proceso de desarrollo
4. **Revisión**: Cómo revisar código generado por IA
5. **Comunicación**: Cómo el equipo comparte aprendizajes sobre Claude Code

### El Efecto Multiplicador

Cuando un equipo coordina bien el uso de Claude Code, no solo suman productividades individuales, las **multiplican**. Un desarrollador aprende un prompt útil y lo comparte. Otro crea un comando personalizado que todos usan. El equipo genera una librería de prompts reutilizables.

Resultado: El equipo avanza 10x más rápido que individuos trabajando de forma descoordinada.

## Práctica 1: Establecer Convenciones de Equipo

### Crear un Documento de Guías

Lo primero es documentar cómo el equipo usará Claude Code.

**Pídele a Claude Code que te ayude**:
```
Hola Claude, nuestro equipo de 6 desarrolladores va a empezar a usar Claude Code.
Necesitamos crear un documento de "Guías de Uso de Claude Code para el Equipo"
que establezca mejores prácticas y convenciones.

El documento debe incluir:
- Cuándo usar Claude Code (y cuándo no)
- Estándares de calidad del código generado
- Proceso de revisión de código asistido por IA
- Cómo documentar que algo fue generado con Claude
- Seguridad y privacidad (qué NO compartir con Claude)

Genera el documento en Markdown, listo para añadir a nuestro repositorio.
```

**Claude Code generará algo como**:
```markdown
# Guías de Uso de Claude Code - Equipo [Nombre]

## Cuándo Usar Claude Code

### ✅ SÍ usar Claude Code para:
- Generar boilerplate y código repetitivo
- Escribir tests unitarios e integración
- Refactorizar código existente
- Documentar funciones y módulos
- Resolver bugs con contexto específico
- Aprender nuevas tecnologías y APIs
- Generar scripts de automatización

### ❌ NO usar Claude Code para:
- Decisiones de arquitectura críticas (sin revisión humana)
- Código que maneja datos sensibles sin revisión
- Merge de conflictos complejos (Claude puede ayudar, pero revisar manual)
- Producción directa (siempre revisar antes de mergear)

## Estándares de Código Generado

Todo código generado por Claude Code debe:
1. **Tener tests**: Mínimo cobertura del 80%
2. **Estar documentado**: JSDoc/TSDoc para funciones públicas
3. **Seguir el style guide**: Ejecutar linter antes de commit
4. **Ser revisado**: Nunca hacer merge sin code review
5. **Tener sentido**: Entender el código antes de aceptarlo

## Proceso de Revisión

### Código Generado por IA
- Marcar en el PR: "Generado/Asistido por Claude Code"
- Explicar el prompt usado (opcional pero recomendado)
- Revisar especialmente: lógica de negocio, edge cases, seguridad
- No asumir que está correcto solo porque lo generó IA

### Template de PR
\`\`\`markdown
## Descripción
[Descripción de los cambios]

## IA Assistance
- [ ] Este código fue generado/asistido por Claude Code
- [ ] He revisado y entiendo el código generado
- [ ] Agregué/actualicé tests
- [ ] Actualicé documentación

## Prompt Usado (opcional)
\`\`\`
[El prompt que usaste con Claude]
\`\`\`
\`\`\`

## Seguridad y Privacidad

**NUNCA compartir con Claude Code:**
- Credenciales (API keys, passwords, tokens)
- Datos personales de usuarios
- Información financiera sensible
- Secretos empresariales

**Usar `.claud eignore` para excluir:**
- Archivos `.env`
- Carpetas con datos sensibles
- Configuraciones de producción

## Compartir Conocimiento

- **Canal de Slack**: #claude-code-tips
- **Wiki del equipo**: Sección "Prompts Útiles"
- **Reuniones semanales**: Compartir aprendizajes

---
Última actualización: [Fecha]
Mantenido por: [Responsable]
```

### Guardar en el Repositorio

```bash
# Crear archivo en el repo
touch docs/CLAUDE_CODE_GUIDELINES.md

# Editarlo con el contenido generado
# Luego commit
git add docs/CLAUDE_CODE_GUIDELINES.md
git commit -m "docs: Add Claude Code team guidelines"
git push
```

Ahora todos en el equipo tienen una referencia clara.

## Práctica 2: Comandos Personalizados Compartidos

Recuerda los comandos slash de `.claude/commands/`? Puedes crear comandos que todo el equipo use.

### Comando: `/team/code-review`

Crea un comando que estandariza las revisiones de código.

**. claude/commands/team/code-review.md**:
```markdown
---
description: Code review checklist según estándares del equipo
allowed-tools: Read(*), Grep(*)
---

# Code Review Estandarizado

Por favor revisa el código siguiendo nuestros estándares de equipo:

## 1. Calidad de Código
- [ ] ¿Sigue nuestro style guide?
- [ ] ¿Nombres de variables descriptivos?
- [ ] ¿Funciones menores a 50 líneas?
- [ ] ¿Sin código duplicado?

## 2. Testing
- [ ] ¿Tiene tests unitarios?
- [ ] ¿Cobertura mínima 80%?
- [ ] ¿Tests para edge cases?

## 3. Documentación
- [ ] ¿Funciones públicas documentadas?
- [ ] ¿README actualizado si es necesario?
- [ ] ¿Comentarios en lógica compleja?

## 4. Seguridad
- [ ] ¿Validación de inputs?
- [ ] ¿Sin credenciales hardcodeadas?
- [ ] ¿Sanitización de datos de usuario?

## 5. Performance
- [ ] ¿Sin operaciones O(n²) evitables?
- [ ] ¿Queries de DB optimizadas?
- [ ] ¿Manejo adecuado de memoria?

Genera reporte indicando qué cumple (✅) y qué necesita mejorar (❌).
```

**Uso**:
```
You: /team/code-review

Claude Code: [Ejecutando code review estandarizado]

📋 CODE REVIEW REPORT

1. CALIDAD DE CÓDIGO
✅ Style guide: Cumple con ESLint config
✅ Nombres descriptivos
❌ Función `processUserData()` tiene 87 líneas (límite: 50)
✅ Sin duplicación

2. TESTING
✅ Tests unitarios presentes
❌ Cobertura: 65% (mínimo requerido: 80%)
✅ Edge cases cubiertos

...
```

### Comando: `/team/pr-ready`

Verifica que el código está listo para PR.

**.claude/commands/team/pr-ready.md**:
```markdown
---
description: Verifica que el código cumple estándares para PR
allowed-tools: Bash(*), Read(*), Grep(*)
---

# PR Ready Checklist

Verificando que el código está listo para Pull Request...

## 1. Linting
!npm run lint

## 2. Tests
!npm run test

## 3. Type Checking
!npm run typecheck

## 4. Build
!npm run build

## 5. Commits
!git log --oneline -5

Verificando:
- ¿Mensajes de commit descriptivos?
- ¿Formato conventional commits?

## 6. Branch Updated
!git fetch origin main
!git log HEAD..origin/main --oneline

¿Tu branch está actualizado con main?

## Resultado Final
[Checklist de qué está OK y qué falta]
```

### Compartir Comandos

```bash
# Los comandos en .claude/commands/ se versionan en git
git add .claude/commands/team/
git commit -m "feat: Add team shared commands"
git push

# Ahora todo el equipo los tiene al hacer pull
```

## Práctica 3: Configuración de Proyecto Compartida

### `.claude/instructions.md` del Proyecto

Este archivo define cómo Claude Code debe comportarse en este proyecto específico. Todo el equipo lo comparte.

**.claude/instructions.md**:
```markdown
# Instrucciones de Claude Code para [Nombre del Proyecto]

## Stack Tecnológico
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Frontend**: React + TypeScript + Tailwind CSS
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions

## Convenciones de Código

### Naming
- `camelCase` para variables y funciones
- `PascalCase` para clases y componentes
- `UPPER_SNAKE_CASE` para constantes
- Archivos: `kebab-case.ts`

### Estructura
```
src/
├── controllers/    # Lógica de negocio
├── services/       # Servicios externos
├── models/         # Modelos Prisma
├── routes/         # Definición de rutas
├── middleware/     # Express middleware
├── utils/          # Utilidades
└── types/          # TypeScript types
```

### Testing
- Todo controller debe tener tests
- Cobertura mínima: 80%
- Usar mocks para servicios externos

### Documentación
- JSDoc para funciones públicas
- README para cada módulo importante
- Comentarios solo para lógica no obvia

## Patrones Requeridos

### Manejo de Errores
```typescript
// Usar AppError personalizado
throw new AppError('User not found', 404);

// Async/await con try-catch
try {
  const user = await userService.findById(id);
} catch (error) {
  throw new AppError('Failed to fetch user', 500);
}
```

### Validación
```typescript
// Usar zod para validación
const userSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18)
});
```

### Autenticación
- JWT tokens en header Authorization
- Middleware `authenticateUser` en rutas protegidas

## Patrones Prohibidos

❌ No usar `any` en TypeScript
❌ No hacer queries directas, usar Prisma
❌ No console.log en producción (usar logger)
❌ No catch vacíos sin manejo

## Ejemplos de Código Correcto

### Controller Típico
```typescript
export class UserController {
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userService.findById(id);

      if (!user) {
        throw new AppError('User not found', 404);
      }

      res.json({ data: user });
    } catch (error) {
      throw error;
    }
  }
}
```

## Comandos Útiles
- `/team/code-review`: Code review estandarizado
- `/team/pr-ready`: Verifica que código está listo para PR
- `/test/generate`: Genera tests para archivo

---
Cuando generes código, SIEMPRE sigue estas convenciones.
Si necesitas desviarte, explica por qué.
```

**Versionarlo**:
```bash
git add .claude/instructions.md
git commit -m "docs: Add project-specific Claude Code instructions"
git push
```

## Práctica 4: Revisión de Código Generado por IA

### Checklist Específico para IA

Cuando revisas un PR con código generado por Claude:

**Pregunta 1**: ¿Entiendes el código?
- Si no → Rechazar hasta que esté claro
- Código mágico que "funciona pero no sé por qué" es técnica debt

**Pregunta 2**: ¿El código maneja edge cases?
- IA a veces solo cubre el happy path
- Revisar: `null`, `undefined`, arrays vacíos, strings vacíos

**Pregunta 3**: ¿Hay tests?
- Código sin tests no se mergea, ni aunque lo haya generado IA

**Pregunta 4**: ¿Es seguro?
- Validación de inputs
- Sanitización de outputs
- Manejo seguro de autenticación

**Pregunta 5**: ¿Es eficiente?
- IA a veces genera código correcto pero ineficiente
- Revisar queries N+1, loops innecesarios

### Template de Review Comment

Cuando encuentres un problema:
```markdown
## ⚠️ Código Generado por IA - Revisión Necesaria

**Archivo**: `src/services/user-service.ts:45`

**Problema**: Este código no maneja el caso cuando `users` es un array vacío.

**Código actual**:
\`\`\`typescript
const firstUser = users[0];
return firstUser.id;
\`\`\`

**Sugerencia**:
\`\`\`typescript
if (users.length === 0) {
  throw new AppError('No users found', 404);
}
const firstUser = users[0];
return firstUser.id;
\`\`\`

**Razón**: Claude Code generó el happy path, pero no consideró el edge case.
```

## Práctica 5: Biblioteca de Prompts del Equipo

### Crear Wiki de Prompts Útiles

Usa la wiki de GitHub / Notion / Confluence para documentar prompts que funcionan bien.

**Sección "Prompts Útiles"**:

#### Generar Controller CRUD
```
Genera un controller CRUD completo para la entidad [ENTIDAD].

Requisitos:
- TypeScript con tipos estrictos
- Usar Prisma para DB
- Validación con zod
- Manejo de errores con AppError
- Tests con Jest (cobertura 80%+)
- JSDoc en todas las funciones públicas

Entidad:
[Pegar schema de Prisma]
```

#### Refactorizar Función Compleja
```
Esta función es muy larga y compleja. Refactorízala siguiendo estos principios:
- Funciones pequeñas (<20 líneas)
- Single Responsibility Principle
- Nombres descriptivos
- Comentarios solo si la lógica es compleja

Mantén la funcionalidad exacta.

[Pegar función]
```

#### Generar Tests
```
Genera tests completos para este archivo usando Jest.

Requisitos:
- Test unitarios para todas las funciones públicas
- Mocks para dependencias externas
- Tests para edge cases (null, undefined, arrays vacíos)
- Coverage 100% del archivo
- Nombres de tests descriptivos (formato: "should ...")

[Pegar código]
```

### Mantener Actualizado

- Cada vez que alguien encuentre un prompt útil, lo añade
- Reunión mensual: revisar y actualizar prompts
- Votar los mejores prompts

## Práctica 6: Onboarding de Nuevos Miembros

### Guía de Onboarding para Claude Code

Cuando un nuevo desarrollador se une al equipo:

**Documento: `docs/ONBOARDING_CLAUDE_CODE.md`**:
```markdown
# Bienvenido al Equipo - Guía de Claude Code

## Día 1: Setup

### 1. Instalar Claude Code
\`\`\`bash
# Mac
brew install --cask claude-code

# Verificar
claude --version
\`\`\`

### 2. Autenticarse
\`\`\`bash
claude auth login
# Seguir instrucciones en el navegador
\`\`\`

### 3. Clonar el Proyecto
\`\`\`bash
git clone [repo-url]
cd [proyecto]

# Verificar que .claude/instructions.md existe
cat .claude/instructions.md
\`\`\`

### 4. Probar Claude Code
\`\`\`bash
claude

# Dentro de Claude Code
You: Explícame la arquitectura de este proyecto

# Claude Code leerá .claude/instructions.md y te explicará
\`\`\`

## Día 2-3: Familiarización

### Ejercicio 1: Generar un Feature Pequeño
\`\`\`
Task: Añade un endpoint GET /health que retorne { status: "ok", timestamp: [ahora] }

1. Pídele a Claude que genere el controller
2. Pídele que genere los tests
3. Pídele que actualice las rutas
4. Revisa el código generado
5. Ejecuta los tests
6. Crea un PR
\`\`\`

### Ejercicio 2: Code Review con Claude
\`\`\`
1. Encuentra un PR abierto
2. Usa: /team/code-review
3. Compara el análisis de Claude con tu propio análisis
4. Añade comentarios de review
\`\`\`

### Ejercicio 3: Refactorizar Código Legacy
\`\`\`
1. Encuentra una función compleja en el código
2. Pídele a Claude que la refactorice
3. Compara el antes/después
4. Asegúrate de que los tests pasen
\`\`\`

## Semana 2: Comandos Avanzados

### Aprende los Comandos del Equipo
- `/team/code-review`: Code review estandarizado
- `/team/pr-ready`: Verificación pre-PR
- `/test/generate`: Generar tests

### Crea tu Primer Comando Personal
\`\`\`bash
# Carpeta personal (no versionada)
mkdir -p ~/.config/claude/commands

# Tu primer comando
touch ~/.config/claude/commands/my-workflow.md
\`\`\`

## Recursos

- Guías del equipo: `docs/CLAUDE_CODE_GUIDELINES.md`
- Wiki de prompts útiles: [enlace]
- Canal de Slack: #claude-code-tips
- Mentor asignado: [nombre]

## Preguntas Frecuentes

**P: ¿Puedo confiar ciegamente en el código de Claude?**
R: No. Siempre revisa y entiende el código antes de hacer commit.

**P: ¿Qué hago si Claude genera algo incorrecto?**
R: Refina tu prompt. Sé más específico. Proporciona más contexto.

**P: ¿Debo decirle al equipo cuando uso Claude?**
R: Sí, en el PR marca "Asistido por Claude Code" y opcionalmente comparte el prompt.
```

## Práctica 7: Métricas y Mejora Continua

### Medir el Impacto de Claude Code

Track estas métricas (mensualmente):

1. **Velocidad de desarrollo**
   - Tiempo promedio para completar features
   - Cantidad de PRs por semana

2. **Calidad de código**
   - Bugs encontrados en QA
   - Cobertura de tests
   - Deuda técnica

3. **Satisfacción del equipo**
   - Encuesta: "Claude Code me hace más productivo" (1-10)
   - "Claude Code genera código de calidad" (1-10)

### Retrospectiva Mensual

En cada retro, dedicar 15 minutos a:
- ¿Qué funcionó bien con Claude Code este mes?
- ¿Qué no funcionó?
- ¿Qué prompts/comandos nuevos descubrimos?
- ¿Qué actualizar en las guías?

## Práctica 8: Cultura de Aprendizaje

### "Show & Tell" Semanal

Cada viernes, 15 minutos:
- Un miembro del equipo comparte algo que aprendió sobre Claude Code
- Puede ser un prompt útil, un truco, un comando nuevo
- Demo en vivo si es posible

### Canal de Slack #claude-code-tips

Fomenta compartir en tiempo real:
```
Ana: Descubrí que si le pides a Claude "Genera tests con casos edge"
genera mucho mejor que solo "genera tests" 🎯

Carlos: Pro tip: Usar /team/pr-ready antes de crear PR me ahorra
tiempo en reviews. Encuentra problemas antes.

María: Alguien sabe cómo hacer que Claude genere código más
funcional y menos imperativo?

Jorge: @María prueba este prompt: "Genera usando functional
programming, evita mutations, usa map/filter/reduce"
```

## Resumen: Checklist de Prácticas de Equipo

- [ ] Creamos `docs/CLAUDE_CODE_GUIDELINES.md`
- [ ] Definimos `.claude/instructions.md` del proyecto
- [ ] Creamos comandos compartidos en `.claude/commands/team/`
- [ ] Establecimos proceso de code review para código generado por IA
- [ ] Creamos wiki de prompts útiles
- [ ] Documentamos onboarding para nuevos miembros
- [ ] Implementamos métricas de impacto
- [ ] Establecimos cultura de aprendizaje (Show & Tell, canal Slack)
- [ ] Todos en el equipo entienden cuándo usar (y cuándo NO usar) Claude Code
- [ ] Tenemos proceso claro para seguridad y privacidad

## Conclusión

Has completado el Módulo 8 y con él, toda la formación técnica del curso. Ahora no solo eres un experto individual en Claude Code, sino que sabes cómo llevar esa expertise a un equipo completo.

**Recuerda**: El valor de Claude Code se multiplica cuando todo un equipo lo usa de forma coordinada. Las mejores prácticas de equipo no son restricciones, son **catalizadores** que permiten que cada miembro del equipo alcance su máximo potencial.

En el Módulo 9, aplicarás todo lo aprendido en el proyecto final del curso. ¡Prepárate para crear algo increíble!

---

**Módulo 8 - Lección 6 - "Especialista en Desarrollo con Claude Code"**
**Instituto San Miguel**
