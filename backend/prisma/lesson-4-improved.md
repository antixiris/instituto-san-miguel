# Navegando la interfaz de Claude Code

![Interface Navigation](https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=400&fit=crop)

## Introducción

Imagina que acabas de comprar un coche deportivo de última generación. Tienes las llaves, el motor ruge con potencia, pero solo conoces el acelerador y el freno. Podrías conducirlo, sí, pero estarías desperdiciando el 90% de sus capacidades.

Así es como muchos desarrolladores usan Claude Code: conocen `claude init` y `claude chat`, y se quedan ahí. Funciona, pero se pierden un universo de funcionalidades que podrían multiplicar su productividad por diez.

En esta lección vamos a explorar cada rincón de la interfaz de Claude Code. No solo aprenderás los comandos, entenderás cuándo usarlos, cómo combinarlos, y qué patrones de trabajo te convertirán en un maestro de esta herramienta.

## La filosofía de la interfaz de Claude

Antes de sumergirnos en comandos específicos, necesitas entender el diseño filosófico detrás de Claude Code.

### Conversacional, no imperativo

La mayoría de las CLIs funcionan con comandos imperativos:
```bash
git commit -m "mensaje" --amend --no-verify
```

Claude Code adopta un enfoque conversacional:
```bash
claude chat
> Haz un commit con el mensaje "mensaje"
> pero omite los hooks de pre-commit
```

¿Ves la diferencia? No memorizas flags, describes lo que quieres.

### Contextual, no aislado

Cada comando de Claude entiende el contexto de tu proyecto. Sabe qué framework usas, qué dependencias tienes, qué archivos cambiaste recientemente.

### Inteligente, no literal

Cuando pides "mejora la performance", Claude no te pide que especifiques qué métrica. Analiza tu código, identifica cuellos de botella, y propone mejoras específicas.

## Tu panel de control: `claude help`

Este es tu punto de partida siempre que olvides algo o quieras descubrir funcionalidades nuevas.

```bash
claude help
```

Verás una salida organizada por categorías.

## Comandos esenciales que usarás diariamente

Vamos a profundizar en los comandos que se volverán parte de tu rutina.

### `claude status`: Tu radar de situación

Este comando te da una vista completa del estado actual.

### `claude ask`: Respuestas rápidas sin conversación

Cuando solo necesitas una respuesta rápida sin entrar en modo conversacional.

### `claude generate`: Creación rápida de código

Este comando es tu generador de código bajo demanda.

### `claude review`: Tu code reviewer personal

Este comando analiza tu código y te da feedback constructivo.

### `claude refactor`: Mejora código existente

Cuando heredas código legacy o necesitas mejorar algo que funciona pero está mal estructurado.

### `claude debug`: Tu compañero de debugging

Cuando encuentras un bug frustrante.

## El arte de la comunicación efectiva con Claude

Ahora que conoces los comandos, hablemos de cómo usarlos efectivamente.

## Tips de productividad avanzados

### Tip 1: Aliases de comandos

Crea aliases en tu `.bashrc` o `.zshrc`.

### Tip 2: Aprovecha el historial

Claude recuerda conversaciones recientes.

## Ejercicio práctico: Workflow completo

Vamos a simular un día completo de desarrollo usando todos los comandos.

## Reflexión final

La interfaz de Claude Code es tu taller digital. Cada comando es una herramienta especializada. Al principio usarás martillos y destornilladores (init, chat). Con el tiempo incorporarás herramientas de precisión (review, refactor, debug).

La maestría no viene de memorizar comandos, viene de entender cuándo usar cada uno.

En la siguiente lección hablaremos de mejores prácticas desde el inicio. Cómo estructurar proyectos, escribir prompts efectivos, mantener calidad, y desarrollar con Claude de forma profesional desde el día uno.
