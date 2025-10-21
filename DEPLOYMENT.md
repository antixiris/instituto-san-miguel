# Guía de Deployment - Instituto San Miguel

Esta guía detalla cómo desplegar la plataforma en Vercel (frontend) y Railway (backend + base de datos).

## Preparación

### Prerrequisitos
- Cuenta en [Vercel](https://vercel.com)
- Cuenta en [Railway](https://railway.app)
- Repositorio de GitHub con el código

## Paso 1: Desplegar Base de Datos en Railway

1. **Crear nuevo proyecto en Railway**
   - Ve a [railway.app](https://railway.app)
   - Click en "New Project"
   - Selecciona "Provision PostgreSQL"

2. **Obtener URL de conexión**
   - En el panel de PostgreSQL, ve a "Variables"
   - Copia el valor de `DATABASE_URL`
   - Guarda esta URL para usarla en el backend

## Paso 2: Desplegar Backend en Railway

1. **Agregar servicio desde GitHub**
   - En el mismo proyecto de Railway
   - Click en "New"
   - Selecciona "GitHub Repo"
   - Autoriza Railway y selecciona tu repositorio
   - Configura:
     - Root Directory: `backend`
     - Build Command: `npm install && npx prisma generate && npm run build`
     - Start Command: `npm start`

2. **Configurar variables de entorno**
   En la sección "Variables" del servicio backend, añade:

   ```
   DATABASE_URL=<valor-copiado-del-postgres>
   JWT_SECRET=<generar-una-clave-segura-aleatoria>
   JWT_EXPIRES_IN=7d
   JWT_REFRESH_EXPIRES_IN=30d
   NODE_ENV=production
   PORT=3001
   FRONTEND_URL=<se-configurará-después-del-deploy-frontend>
   ```

   Para generar JWT_SECRET seguro:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Ejecutar migraciones de Prisma**
   - Una vez desplegado el backend
   - Ve a la pestaña "Deployments"
   - Click en el deployment activo
   - Click en "View Logs"
   - Verifica que las migraciones se ejecutaron correctamente

4. **Ejecutar seed (datos iniciales)**
   - En Railway CLI o desde el dashboard:
   ```bash
   railway run npm run seed
   ```

5. **Obtener URL del backend**
   - En "Settings" del servicio
   - Copia la URL pública (ej: https://tu-backend.up.railway.app)

## Paso 3: Desplegar Frontend en Vercel

1. **Importar proyecto desde GitHub**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "Add New Project"
   - Importa tu repositorio desde GitHub
   - Configura:
     - Framework Preset: Vite
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `dist`

2. **Configurar variables de entorno**
   En la sección "Environment Variables":

   ```
   VITE_API_URL=<url-backend-railway>/api
   VITE_APP_NAME=Instituto San Miguel
   ```

   Ejemplo:
   ```
   VITE_API_URL=https://tu-backend.up.railway.app/api
   ```

3. **Desplegar**
   - Click en "Deploy"
   - Espera a que finalice el build
   - Obtén la URL de tu aplicación (ej: https://tu-app.vercel.app)

## Paso 4: Actualizar CORS en el Backend

1. **Actualizar variable FRONTEND_URL en Railway**
   - Ve al servicio backend en Railway
   - En "Variables", actualiza:
   ```
   FRONTEND_URL=https://tu-app.vercel.app
   ```

2. **Redesplegar backend**
   - Railway lo hará automáticamente al cambiar variables

## Paso 5: Verificar Deployment

### Backend
Accede a: `https://tu-backend.up.railway.app/health`

Deberías ver:
```json
{
  "status": "ok",
  "timestamp": "2025-10-20T...",
  "uptime": 123.456
}
```

### Frontend
Accede a: `https://tu-app.vercel.app`

Verifica:
- La landing page carga correctamente
- Puedes navegar entre páginas
- El login funciona
- El registro funciona

## Usuarios de Prueba

Después del seed, puedes usar:

**Administrador:**
- Email: admin@institutosanmiguel.com
- Password: Admin123!

**Instructor:**
- Email: instructor@institutosanmiguel.com
- Password: Instructor123!

**Estudiante:**
- Email: estudiante@institutosanmiguel.com
- Password: Estudiante123!

## Troubleshooting

### Error: "Cannot connect to database"
- Verifica que `DATABASE_URL` esté correctamente configurada
- Asegúrate de que el servicio PostgreSQL esté activo

### Error: "CORS policy error"
- Verifica que `FRONTEND_URL` en el backend coincida con tu URL de Vercel
- Asegúrate de no incluir "/" al final de la URL

### Error: "Failed to fetch"
- Verifica que `VITE_API_URL` en el frontend sea correcta
- Asegúrate de incluir "/api" al final

### Prisma migrations fail
- Ejecuta manualmente:
  ```bash
  railway run npx prisma migrate deploy
  ```

## Actualizaciones Futuras

### Actualizar Backend
1. Push cambios a GitHub
2. Railway detectará los cambios y redesplegar automáticamente

### Actualizar Frontend
1. Push cambios a GitHub
2. Vercel detectará los cambios y redesplegar automáticamente

## Configuración de Dominio Personalizado (Opcional)

### En Vercel (Frontend)
1. Ve a Project Settings > Domains
2. Agrega tu dominio personalizado
3. Configura DNS según las instrucciones

### En Railway (Backend)
1. Ve a Settings > Domains
2. Agrega tu dominio personalizado
3. Configura DNS según las instrucciones
4. Actualiza `FRONTEND_URL` y `VITE_API_URL` con los nuevos dominios

## Monitoreo

### Railway
- Revisa logs en tiempo real desde el dashboard
- Configura alertas en Settings > Alerts

### Vercel
- Revisa Analytics en la pestaña Analytics
- Configura Vercel Speed Insights para Core Web Vitals

## Backup de Base de Datos

Railway no incluye backups automáticos en el plan gratuito. Considera:

1. **Backup manual periódico:**
   ```bash
   railway run pg_dump $DATABASE_URL > backup.sql
   ```

2. **Migrar a plan con backups automáticos**

3. **Usar servicio externo de backup**

## Seguridad

### Checklist de Seguridad
- ✅ JWT_SECRET es aleatorio y seguro
- ✅ Variables de entorno no están en el código
- ✅ CORS configurado correctamente
- ✅ Rate limiting activado
- ✅ Helmet.js configurado
- ✅ Validación de inputs en backend
- ✅ Contraseñas hasheadas con bcrypt

## Costos Estimados

### Plan Gratuito
- **Railway**: $5 de crédito mensual (suficiente para desarrollo)
- **Vercel**: Ilimitado para proyectos personales

### Plan Recomendado para Producción
- **Railway**: ~$20/mes (Pro plan con mejor performance)
- **Vercel**: ~$20/mes (Pro plan con analytics avanzados)

## Soporte

Para problemas de deployment:
- Railway: https://railway.app/help
- Vercel: https://vercel.com/support

Para problemas de la aplicación:
- Revisa los logs en Railway y Vercel
- Verifica las variables de entorno
- Consulta la documentación del proyecto
