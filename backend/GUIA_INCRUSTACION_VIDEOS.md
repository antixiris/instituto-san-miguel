# Guía para Incrustar Videos en Lecciones

**Última actualización:** 2025-11-03

---

## 🎯 Formato Correcto de URL

Para que los videos se carguen correctamente en la aplicación **tanto en desarrollo como en producción**, **SIEMPRE** usa URLs relativas:

```
/videos/Nombre_Del_Video.mp4
```

### ❌ INCORRECTO
```javascript
videoUrl: 'http://localhost:3001/videos/Nombre_Del_Video.mp4'  // URL absoluta - NO funcionará en producción
videoUrl: '/api/videos/Nombre_Del_Video.mp4'  // Ruta incorrecta - NO funciona
```

### ✅ CORRECTO
```javascript
videoUrl: '/videos/Nombre_Del_Video.mp4'  // URL relativa - FUNCIONA en desarrollo Y producción
```

---

## 📋 Proceso Paso a Paso

### 1. Verificar que el video existe

```bash
ls -lh /Users/cantico/PROGRAMACIÓN/instituto-san-miguel/videos/Nombre_Del_Video.mp4
```

### 2. Probar que el video es accesible

```bash
curl -I http://localhost:3001/videos/Nombre_Del_Video.mp4
```

Deberías ver: `HTTP/1.1 200 OK`

### 3. Calcular la duración del video (en segundos)

Para un video de X minutos:
```
Duración en segundos = X * 60
```

Ejemplos:
- 27 minutos = 1620 segundos
- 36 minutos = 2160 segundos
- 28 minutos = 1680 segundos

---

## 🔧 Script de Incrustación (Template)

Crea un archivo `update-moduloX-videos.js`:

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateModuleXVideos() {
  console.log('🎬 Actualizando videos del Módulo X...\n');

  // Obtener el módulo X (cambiar el número según corresponda)
  const course = await prisma.course.findFirst({
    where: { slug: 'especialista-claude-code' },
    include: {
      modules: {
        where: { order: X }, // ← CAMBIAR X por el número de módulo
        include: {
          lessons: {
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  });

  if (!course || !course.modules[0]) {
    console.log('❌ No se encontró el módulo X');
    return;
  }

  const module = course.modules[0];
  console.log('📦 Módulo encontrado:', module.title, '\n');

  // Mapeo de lecciones y videos
  const videoMapping = [
    {
      order: 1,
      videoUrl: '/videos/Nombre_Video_1.mp4',
      duration: XXXX // segundos
    },
    {
      order: 2,
      videoUrl: '/videos/Nombre_Video_2.mp4',
      duration: XXXX
    },
    // ... más videos según sea necesario
  ];

  let updated = 0;

  for (const mapping of videoMapping) {
    const lesson = module.lessons.find(l => l.order === mapping.order);

    if (lesson) {
      await prisma.lesson.update({
        where: { id: lesson.id },
        data: {
          type: 'VIDEO',
          videoUrl: mapping.videoUrl,
          videoDuration: mapping.duration
        }
      });

      console.log(\`✅ Lección \${mapping.order}: \${lesson.title}\`);
      console.log(\`   Video: \${mapping.videoUrl}\`);
      console.log(\`   Duración: \${Math.round(mapping.duration / 60)} minutos\n\`);
      updated++;
    }
  }

  console.log('═══════════════════════════════════════════');
  console.log('✅ ACTUALIZACIÓN COMPLETADA');
  console.log('═══════════════════════════════════════════');
  console.log(\`🎬 Videos incrustados: \${updated}\`);
  console.log('═══════════════════════════════════════════');

  await prisma.$disconnect();
}

updateModuleXVideos()
  .then(() => {
    console.log('\n🎉 Proceso completado con éxito');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
```

### 4. Ejecutar el script

```bash
cd backend
node update-moduloX-videos.js
```

---

## 🧪 Verificación Post-Incrustación

### Script de verificación

```bash
cd backend && node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verify() {
  const course = await prisma.course.findFirst({
    where: { slug: 'especialista-claude-code' },
    include: {
      modules: {
        where: { order: X }, // ← CAMBIAR X
        include: {
          lessons: {
            where: { type: 'VIDEO' },
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  });

  const module = course.modules[0];

  console.log('📹 VIDEOS DEL MÓDULO X:\n');

  module.lessons.forEach(lesson => {
    console.log('Lección', lesson.order + ':', lesson.title);
    console.log('  Video:', lesson.videoUrl);
    console.log('  Duración:', Math.round(lesson.videoDuration / 60), 'min\n');
  });

  await prisma.\$disconnect();
}

verify();
"
```

---

## 📁 Estructura de Archivos

```
instituto-san-miguel/
├── videos/                          ← Carpeta con todos los videos
│   ├── Video_Modulo1_Leccion1.mp4
│   ├── Video_Modulo2_Leccion1.mp4
│   └── ...
├── backend/
│   ├── src/
│   │   └── index.ts                 ← Configuración del servidor para servir videos
│   └── update-moduloX-videos.js     ← Scripts de incrustación
```

---

## ⚙️ Configuración Necesaria

### Backend (Express)

El servidor backend ya está configurado para servir videos desde la ruta `/videos/`:

```typescript
// backend/src/index.ts (línea 123)
app.use('/videos', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Accept-Ranges');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Accept-Ranges', 'bytes');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
}, express.static(path.join(__dirname, '../../videos')));
```

### Frontend (Vite Proxy)

**IMPORTANTE:** El frontend debe tener configurado el proxy para `/videos` en `vite.config.ts`:

```typescript
// frontend/vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/videos': {  // ← NECESARIO para que los videos funcionen
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
```

**Sin esta configuración del proxy, los videos NO se cargarán en desarrollo.**

---

## 🔍 Solución de Problemas

### Problema: El video no se carga

**Síntomas:**
- Se muestra el reproductor pero el video no carga
- Error en la consola del navegador

**Causas comunes:**
1. Proxy `/videos` no configurado en `vite.config.ts`
2. Archivo de video no existe
3. Servidor backend no está corriendo
4. CORS no configurado correctamente

**Solución:**
1. Verificar que el proxy está configurado en `vite.config.ts`:
   ```typescript
   proxy: {
     '/videos': { target: 'http://localhost:3001', changeOrigin: true }
   }
   ```
2. Reiniciar el servidor frontend después de cambiar `vite.config.ts`
3. Verificar que el archivo existe: `ls videos/Nombre_Video.mp4`
4. Verificar que el servidor está corriendo: `curl -I http://localhost:3001/videos/Nombre_Video.mp4`
5. Si el servidor no está corriendo: `cd backend && npm run dev`

### Problema: Error 401 Unauthorized

**Síntoma:**
- HTTP 401 al intentar acceder al video

**Causa:**
- Usando `/api/videos/` en lugar de `/videos/`

**Solución:**
- Cambiar todas las URLs a usar `/videos/` sin el prefijo `/api/`

---

## 📝 Checklist de Incrustación

Antes de incrustar videos en un nuevo módulo:

- [ ] Verificar que todos los videos existen en `/videos/`
- [ ] Verificar que el proxy `/videos` está configurado en `vite.config.ts`
- [ ] Calcular la duración de cada video en segundos
- [ ] Crear script de actualización basado en el template
- [ ] Usar URLs relativas: `/videos/...`
- [ ] Ejecutar el script
- [ ] Verificar en la base de datos que se actualizaron correctamente
- [ ] Probar en el navegador que los videos se cargan
- [ ] Documentar qué videos se añadieron y a qué lecciones

---

## 🎓 Ejemplo Completo: Módulo 3

```javascript
const videoMapping = [
  {
    order: 1,
    videoUrl: '/videos/Prompting_Efectivo.mp4',
    duration: 1620 // 27 minutos
  },
  {
    order: 2,
    videoUrl: '/videos/El_Poder_del_Contexto.mp4',
    duration: 2160 // 36 minutos
  },
  {
    order: 3,
    videoUrl: '/videos/El_Arte_de_Mejorar_el_Código.mp4',
    duration: 1680 // 28 minutos
  },
  {
    order: 4,
    videoUrl: '/videos/Manejo_de_Proyectos_Complejos.mp4',
    duration: 1680 // 28 minutos
  },
  {
    order: 5,
    videoUrl: '/videos/Patrones_de_Diseño_Esenciales.mp4',
    duration: 2340 // 39 minutos
  }
];
```

---

## ✅ Resumen

**Regla de oro:** Siempre usa URLs relativas con el formato:
```
/videos/Nombre_Del_Video.mp4
```

Este formato funciona tanto en desarrollo (localhost) como en producción, ya que el servidor sirve los archivos estáticos desde la ruta `/videos/`.
