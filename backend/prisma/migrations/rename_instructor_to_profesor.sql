-- Migración manual: Renombrar INSTRUCTOR a PROFESOR en enum UserRole
-- Ejecutar este script cuando la base de datos esté disponible

-- Renombrar el valor del enum
ALTER TYPE "UserRole" RENAME VALUE 'INSTRUCTOR' TO 'PROFESOR';

-- Nota: Esta migración es segura porque solo renombra un valor del enum.
-- Todos los registros existentes con rol 'INSTRUCTOR' automáticamente tendrán 'PROFESOR'
