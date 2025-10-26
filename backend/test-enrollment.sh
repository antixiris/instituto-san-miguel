#!/bin/bash

# Login and get token
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"estudiante@institutosanmiguel.com","password":"Estudiante123!"}')

echo "Login response:"
echo "$LOGIN_RESPONSE" | python3 -m json.tool
echo ""

# Extract token
TOKEN=$(echo "$LOGIN_RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data.get('data', {}).get('accessToken', ''))")

if [ -z "$TOKEN" ]; then
  echo "ERROR: No token received"
  exit 1
fi

echo "Token obtained: ${TOKEN:0:50}..."
echo ""

# Test enrollments endpoint
echo "Testing /api/enrollments/my-courses:"
curl -s http://localhost:3001/api/enrollments/my-courses \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
