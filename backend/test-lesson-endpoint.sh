#!/bin/bash

# Login
TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"estudiante@institutosanmiguel.com","password":"Estudiante123!"}' \
  | python3 -c "import sys, json; data=json.load(sys.stdin); print(data.get('data', {}).get('accessToken', ''))")

echo "Token obtenido: ${TOKEN:0:50}..."
echo ""

# Obtener primera lección del curso
LESSON_ID=$(curl -s "http://localhost:3001/api/courses/especialista-desarrollo-claude-code" \
  | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['data']['modules'][0]['lessons'][0]['id'])")

echo "ID de la primera lección: $LESSON_ID"
echo ""

# Obtener contenido de la lección
echo "Obteniendo contenido de la lección..."
curl -s "http://localhost:3001/api/lessons/$LESSON_ID" \
  -H "Authorization: Bearer $TOKEN" \
  | python3 -c "import sys, json; data=json.load(sys.stdin); lesson=data['data']; print(f\"Título: {lesson['title']}\"); print(f\"Tiene contenido: {bool(lesson.get('content'))}\"); print(f\"Longitud del contenido: {len(lesson.get('content', ''))} caracteres\"); print(f\"\\nPrimeros 300 caracteres del contenido:\\n{lesson.get('content', '')[:300]}...\")"
