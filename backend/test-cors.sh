#!/bin/bash

echo "Testing CORS preflight..."
curl -v -X OPTIONS http://localhost:3001/api/auth/login \
  -H "Origin: http://localhost:5174" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" 2>&1 | grep -i "access-control"
