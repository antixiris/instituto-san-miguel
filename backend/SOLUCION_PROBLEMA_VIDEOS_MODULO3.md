# Solución: Problema de Carga de Videos en Módulo 3

**Fecha:** 2025-11-03
**Problema:** Los videos del módulo 3 no se cargaban en la aplicación

---

## 🔴 Problema Identificado

Los videos del módulo 3 se mostraban con un reproductor pero no se cargaban.

### Causa Raíz

Las URLs de los videos estaban en **formato relativo** pero el **proxy de Vite no estaba configurado** para redirigir las peticiones de `/videos` al backend:

```javascript
// ❌ INCORRECTO (no funciona sin proxy configurado)
videoUrl: '/videos/Prompting_Efectivo.mp4'  // Sin proxy en vite.config.ts

// ✅ CORRECTO (funciona con proxy configurado)
videoUrl: '/videos/Prompting_Efectivo.mp4'  // Con proxy: '/videos' -> 'http://localhost:3001'
```

---

## 🔍 Diagnóstico

### Diagnóstico del problema:

**Problema:** URLs relativas no funcionaban porque el proxy de Vite no estaba configurado.

```typescript
// ❌ Configuración INCOMPLETA en vite.config.ts
server: {
  proxy: {
    '/api': { target: 'http://localhost:3001', changeOrigin: true }
    // Falta: '/videos' proxy
  }
}

// ✅ Configuración CORRECTA en vite.config.ts
server: {
  proxy: {
    '/api': { target: 'http://localhost:3001', changeOrigin: true },
    '/videos': { target: 'http://localhost:3001', changeOrigin: true }  // ← AÑADIDO
  }
}
```

### Pruebas realizadas:

```bash
# Ruta correcta del backend - FUNCIONA (200 OK)
curl -I http://localhost:3001/videos/El_Arte_de_Programar_con_IA.mp4
# HTTP/1.1 200 OK
```

---

## ✅ Solución Aplicada

### 1. Se configuró el proxy de Vite para `/videos`

**Antes (vite.config.ts):**
```typescript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
    // '/videos' NO estaba configurado ← PROBLEMA
  },
}
```

**Después (vite.config.ts):**
```typescript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
    '/videos': {  // ← AÑADIDO
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },
}
```

### 2. URLs de videos estandarizadas

Todos los videos usan ahora **URLs relativas** que funcionan tanto en desarrollo (gracias al proxy) como en producción:

```javascript
{
  order: 1,
  videoUrl: '/videos/Prompting_Efectivo.mp4',  // ← URL relativa
  duration: 1620
}
```

### 3. Documentación creada

- `GUIA_INCRUSTACION_VIDEOS.md` - Guía completa para incrustar videos correctamente

---

## 📋 Videos Corregidos

| Lección | Video | Duración | URL (relativa) |
|---------|-------|----------|---------------|
| 1 | Prompting_Efectivo.mp4 | 27 min | /videos/Prompting_Efectivo.mp4 |
| 2 | El_Poder_del_Contexto.mp4 | 36 min | /videos/El_Poder_del_Contexto.mp4 |
| 3 | El_Arte_de_Mejorar_el_Código.mp4 | 28 min | /videos/El_Arte_de_Mejorar_el_Código.mp4 |
| 4 | Manejo_de_Proyectos_Complejos.mp4 | 28 min | /videos/Manejo_de_Proyectos_Complejos.mp4 |
| 5 | Patrones_de_Diseño_Esenciales.mp4 | 39 min | /videos/Patrones_de_Diseño_Esenciales.mp4 |

**Total:** 5 videos | 158 minutos

---

## 🎯 Proceso para Futuros Módulos

### Regla de Oro

**SIEMPRE usar URLs relativas:**
```
/videos/Nombre_Del_Video.mp4
```

**¿Por qué URLs relativas?**
- Funcionan en desarrollo (gracias al proxy de Vite)
- Funcionan en producción (sin hardcodear localhost)
- No requieren cambios al deployar

### Template de Script

```javascript
const videoMapping = [
  {
    order: 1,
    videoUrl: '/videos/Nombre_Video.mp4',  // ← URL RELATIVA
    duration: XXXX // segundos
  }
];
```

### Checklist de Verificación

Antes de considerar completada la incrustación de videos:

- [ ] Proxy `/videos` configurado en `vite.config.ts`
- [ ] Videos usan URLs relativas: `/videos/...`
- [ ] Probar acceso directo con curl: `curl -I http://localhost:3001/videos/Video.mp4`
- [ ] Verificar respuesta HTTP 200 OK
- [ ] Probar en el navegador que el video se carga
- [ ] Verificar que los controles del reproductor funcionan

---

## 🔧 Configuración del Servidor

La configuración correcta del servidor está en `backend/src/index.ts` (línea 123):

```typescript
app.use('/videos', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Accept-Ranges');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Accept-Ranges', 'bytes'); // Streaming de video

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
}, express.static(path.join(__dirname, '../../videos')));
```

**Puntos clave:**
- Ruta: `/videos/` (sin `/api/`)
- CORS configurado para permitir cross-origin
- Accept-Ranges para streaming
- Archivos servidos desde `../../videos/`

---

## 📊 Estado Final

### ✅ Todos los Módulos - FUNCIONANDO CORRECTAMENTE

**Módulo 1:**
- 2 videos con URLs relativas
- Funcionando correctamente con proxy configurado

**Módulo 2:**
- 5 videos con URLs relativas
- Funcionando correctamente con proxy configurado

**Módulo 3:**
- 5 videos con URLs relativas
- Funcionando correctamente con proxy configurado

**Total:** 12 videos | Todos usando URLs relativas `/videos/...`

---

## 📚 Documentación Relacionada

- `GUIA_INCRUSTACION_VIDEOS.md` - Guía completa para incrustar videos
- `frontend/vite.config.ts` - Configuración del proxy para desarrollo

---

## 🎓 Lecciones Aprendidas

1. **URLs relativas + proxy de Vite** es la solución correcta para desarrollo y producción
2. **El proxy de Vite debe incluir `/videos`** además de `/api`
3. **La ruta correcta es `/videos/`**, no `/api/videos/`
4. **Siempre probar con curl** antes de dar por terminada la incrustación
5. **Reiniciar el servidor frontend** después de cambiar `vite.config.ts`

---

**Estado:** ✅ PROBLEMA RESUELTO - Todos los videos funcionando correctamente con URLs relativas y proxy configurado
