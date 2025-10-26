#!/bin/bash

# Primero obtenemos un token de autenticación
echo "=== Obteniendo token de autenticación ==="
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@institutosanmiguel.com","password":"admin123"}')

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ No se pudo obtener el token"
  echo "Response: $LOGIN_RESPONSE"
  exit 1
fi

echo "✅ Token obtenido"

# Ahora consultamos la lección 1
echo -e "\n=== Consultando Lección 1 ==="
LESSON_ID="cmh6umvth0005shc3n9jyw3f1"

curl -s http://localhost:3001/api/lessons/$LESSON_ID \
  -H "Authorization: Bearer $TOKEN" \
  | python3 -m json.tool | grep -A 5 -B 5 "video"

echo -e "\n=== Datos completos de la lección ==="
curl -s http://localhost:3001/api/lessons/$LESSON_ID \
  -H "Authorization: Bearer $TOKEN" \
  | python3 -m json.tool | grep -E "(title|type|videoUrl|videoDuration)"
