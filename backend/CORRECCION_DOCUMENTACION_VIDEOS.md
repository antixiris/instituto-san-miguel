# Corrección de Documentación: Incrustación de Videos

**Fecha:** 2025-11-03
**Tipo:** Corrección de contradicciones en documentación

---

## 🎯 Resumen

Se identificaron y corrigieron contradicciones importantes entre los documentos de guía de incrustación de videos. La documentación original contenía información conflictiva sobre el uso de URLs relativas vs absolutas.

---

## 🔴 Problema Identificado

### Contradicción en la Documentación

**`GUIA_INCRUSTACION_VIDEOS.md`:**
- ✅ Recomendaba URLs relativas `/videos/...`
- ✅ Explicaba la necesidad del proxy de Vite

**`SOLUCION_PROBLEMA_VIDEOS_MODULO3.md`:**
- ❌ Recomendaba URLs absolutas `http://localhost:3001/videos/...`
- ❌ Decía que las URLs relativas eran incorrectas
- ❌ Los scripts de ejemplo usaban URLs absolutas

### Scripts Obsoletos

Los siguientes scripts contenían URLs absolutas con `localhost`:
- `fix-module1-video-urls.js`
- `fix-module3-video-urls.js`

---

## ✅ Solución Aplicada

### 1. Documentación Actualizada

#### `SOLUCION_PROBLEMA_VIDEOS_MODULO3.md`

**Cambios principales:**

1. **Causa raíz actualizada:**
   - Antes: "URLs relativas son incorrectas"
   - Después: "URLs relativas necesitan proxy de Vite configurado"

2. **Solución corregida:**
   - Eliminadas referencias a URLs absolutas
   - Añadida explicación del proxy de Vite
   - Actualizado checklist de verificación

3. **Proceso para futuros módulos:**
   - Regla de oro: URLs relativas `/videos/...`
   - Template actualizado con URLs relativas
   - Explicación de por qué URLs relativas (desarrollo + producción)

4. **Estado final:**
   - Todos los módulos (1, 2, 3) marcados como funcionando
   - 12 videos totales usando URLs relativas

#### `GUIA_INCRUSTACION_VIDEOS.md`

**Cambios principales:**

1. **Solución de problemas:**
   - Añadida verificación del proxy de Vite como primera causa
   - Instrucciones para reiniciar frontend tras cambios en `vite.config.ts`

2. **Checklist de incrustación:**
   - Añadida verificación del proxy de Vite
   - Confirmado uso de URLs relativas

### 2. Scripts Actualizados

#### `fix-module1-video-urls.js`

**Cambio:** Ahora normaliza URLs a formato relativo
```javascript
// Antes: Convertía relativas → absolutas
const newUrl = `http://localhost:3001${lesson.videoUrl}`;

// Después: Normaliza absolutas → relativas
newUrl = lesson.videoUrl.replace('http://localhost:3001', '');
```

#### `fix-module3-video-urls.js`

**Cambio:** URLs en videoMapping actualizadas
```javascript
// Antes:
videoUrl: 'http://localhost:3001/videos/Prompting_Efectivo.mp4'

// Después:
videoUrl: '/videos/Prompting_Efectivo.mp4'
```

---

## 📊 Estado Final

### Documentación Consistente

Toda la documentación ahora recomienda el mismo enfoque:

**Formato de URL:** Relativo `/videos/...`

**Configuración necesaria:**
1. Backend sirve archivos estáticos desde `/videos/`
2. Frontend tiene proxy configurado en `vite.config.ts`:
   ```typescript
   proxy: {
     '/videos': {
       target: 'http://localhost:3001',
       changeOrigin: true
     }
   }
   ```

### Ventajas de URLs Relativas

1. ✅ Funcionan en desarrollo (con proxy de Vite)
2. ✅ Funcionan en producción (sin cambios)
3. ✅ No hardcodean `localhost:3001`
4. ✅ Portabilidad entre entornos
5. ✅ Sin modificaciones al deployar

---

## 📚 Archivos Modificados

1. `backend/SOLUCION_PROBLEMA_VIDEOS_MODULO3.md`
   - Secciones actualizadas: Causa Raíz, Diagnóstico, Solución Aplicada, Proceso para Futuros Módulos, Estado Final, Lecciones Aprendidas

2. `backend/GUIA_INCRUSTACION_VIDEOS.md`
   - Secciones actualizadas: Solución de Problemas, Checklist de Incrustación

3. `backend/fix-module1-video-urls.js`
   - Lógica de conversión invertida (absoluta → relativa)

4. `backend/fix-module3-video-urls.js`
   - videoMapping actualizado con URLs relativas

---

## 🎓 Lecciones Aprendadas

1. **Documentación contradictoria** puede causar confusión y errores al implementar nuevos módulos
2. **Scripts de ejemplo** deben reflejar las mejores prácticas documentadas
3. **La solución correcta** es URLs relativas + proxy de Vite configurado
4. **URLs absolutas con localhost** causan problemas en producción

---

## ✅ Verificación

Para verificar que todo esté correcto:

```bash
# 1. Verificar que vite.config.ts tiene el proxy configurado
cat frontend/vite.config.ts | grep -A 3 '/videos'

# 2. Verificar que los videos en DB usan URLs relativas
cd backend && node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.lesson.findMany({ where: { type: 'VIDEO' } }).then(lessons => {
  lessons.forEach(l => console.log(l.title, '→', l.videoUrl));
  prisma.\$disconnect();
});
"
```

**Resultado esperado:**
- Proxy `/videos` presente en `vite.config.ts`
- Todas las URLs de videos con formato `/videos/Nombre.mp4`

---

**Estado:** ✅ CORRECCIÓN COMPLETADA - Documentación ahora consistente y correcta
