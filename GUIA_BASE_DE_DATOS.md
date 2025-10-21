# Guía de Configuración de Base de Datos PostgreSQL

## Opción 1: PostgreSQL con Docker (RECOMENDADO) ⭐

Esta es la forma más fácil y rápida de tener PostgreSQL funcionando.

### Paso 1: Levantar la base de datos

Desde la raíz del proyecto, ejecuta:

```bash
docker-compose up -d
```

Esto creará y ejecutará un contenedor PostgreSQL en segundo plano.

### Paso 2: Verificar que está funcionando

```bash
docker-compose ps
```

Deberías ver algo como:
```
NAME                        STATUS
instituto-san-miguel-db     Up (healthy)
```

### Paso 3: Configurar el backend

El archivo `.env` ya está creado en `/backend/.env` con la configuración correcta:
```
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/instituto_san_miguel?schema=public"
```

### Paso 4: Ejecutar migraciones de Prisma

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
```

### Paso 5: Poblar la base de datos con datos de prueba

```bash
npm run seed
```

### Comandos útiles de Docker:

```bash
# Ver logs de la base de datos
docker-compose logs -f postgres

# Detener la base de datos
docker-compose down

# Detener y eliminar datos (¡cuidado!)
docker-compose down -v

# Reiniciar la base de datos
docker-compose restart

# Conectarse a la consola de PostgreSQL
docker exec -it instituto-san-miguel-db psql -U postgres -d instituto_san_miguel
```

---

## Opción 2: PostgreSQL Local (macOS)

Si prefieres instalar PostgreSQL directamente en tu Mac:

### Paso 1: Instalar con Homebrew

```bash
brew install postgresql@15
brew services start postgresql@15
```

### Paso 2: Crear la base de datos

```bash
createdb instituto_san_miguel
```

### Paso 3: Actualizar .env

Edita `/backend/.env`:
```
DATABASE_URL="postgresql://tu_usuario@localhost:5432/instituto_san_miguel?schema=public"
```

### Paso 4: Continuar con migraciones

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npm run seed
```

---

## Opción 3: PostgreSQL en la Nube (para desarrollo)

### Opción 3A: Supabase (Gratis)

1. Ve a https://supabase.com
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Copia el "Connection String" de la sección "Database Settings"
5. Pégalo en `/backend/.env` como `DATABASE_URL`

### Opción 3B: Railway (Gratis)

1. Ve a https://railway.app
2. Crea una cuenta
3. New Project → Provision PostgreSQL
4. Copia el "PostgreSQL Connection URL"
5. Pégalo en `/backend/.env` como `DATABASE_URL`

### Opción 3C: Neon (Gratis)

1. Ve a https://neon.tech
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Copia la connection string
5. Pégalo en `/backend/.env` como `DATABASE_URL`

---

## Verificar que todo funciona

Después de configurar la base de datos por cualquier método:

```bash
# 1. Probar conexión con Prisma
cd backend
npx prisma db push

# 2. Ver los datos en Prisma Studio
npx prisma studio
# Se abrirá en http://localhost:5555

# 3. Iniciar el servidor backend
npm run dev
```

Si ves el mensaje:
```
🚀 Server is running on http://localhost:3001
✅ Database connected successfully
```

¡Todo está funcionando correctamente! 🎉

---

## Solución de Problemas

### Error: "Can't reach database server"

- **Docker**: Asegúrate de que el contenedor está corriendo con `docker-compose ps`
- **Local**: Verifica que PostgreSQL esté activo con `brew services list`
- **Nube**: Verifica que la URL de conexión sea correcta

### Error: "Port 5432 already in use"

Ya tienes algo corriendo en ese puerto. Opciones:
```bash
# Ver qué está usando el puerto
lsof -i :5432

# Cambiar el puerto en docker-compose.yml
ports:
  - "5433:5432"  # Usar 5433 en lugar de 5432

# Y actualizar .env
DATABASE_URL="postgresql://postgres:postgres123@localhost:5433/..."
```

### Resetear la base de datos completamente

```bash
cd backend
npx prisma migrate reset  # ¡Elimina todos los datos!
npm run seed              # Volver a poblar
```

---

## Resumen Rápido (Docker - RECOMENDADO)

```bash
# Desde la raíz del proyecto
docker-compose up -d

# Desde /backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

¡Listo! 🚀
