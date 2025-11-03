<p><strong><em>Lección 5: Claude Code en Redes Corporativas</em></strong></p>

## Introducción

¡Bienvenido a una lección SUPER práctica! Si alguna vez has trabajado en una oficina o empresa, probablemente te has encontrado con este problema: "En mi casa funciona perfectamente, pero en la oficina no puedo conectarme a nada". ¿Te suena familiar?

Las **redes corporativas** tienen medidas de seguridad estrictas: firewalls, proxies, VPNs, filtros de contenido. Todo esto está ahí para proteger a la empresa, pero a veces hace que herramientas como **Claude Code** no funcionen

Hoy vamos a aprender cómo hacer que Claude Code funcione en entornos empresariales complicados. Y como siempre, **Claude Code mismo va a ser tu guía** para resolver estos problemas. Sí, leíste bien: vamos a usar Claude Code para arreglar Claude Code. ¡Vamos a ello!

## ¿Qué es una Red Corporativa? (Explicación Simple)

Imagina que internet es como una ciudad gigante con calles abiertas. En tu casa, puedes ir a cualquier calle libremente. Pero en una empresa, es como si hubiera guardias de seguridad en cada esquina revisando quién eres y a dónde vas.

**Elementos comunes en redes corporativas**:

1. **Firewall** - El guardia principal
   - Bloquea ciertos sitios web y puertos
   - "¿Quieres ir a Facebook? No, estás trabajando"

2. **Proxy** - El intermediario
   - Todas tus peticiones pasan por él primero
   - "Antes de ir a internet, dame tu identificación"

3. **VPN** - El túnel secreto
   - Encripta tu conexión
   - "Vas a trabajar desde casa? Usa este túnel seguro"

4. **Certificados SSL Corporativos** - La identificación especial
   - La empresa reemplaza certificados de seguridad
   - "Usarás NUESTROS certificados, no los de internet"

5. **Listas de bloqueo** - Los sitios prohibidos
   - Ciertos dominios simplemente no funcionan
   - "api.anthropic.com? Lo siento, bloqueado por política"

Todo esto hace que Claude Code (que necesita conectarse a internet para funcionar) pueda tener problemas.

## Problemas Comunes con Claude Code en Empresas

Estos son los errores típicos que verás:

### Error 1: "Unable to connect to Claude"
```
Error: Unable to connect to Claude API
Could not reach api.anthropic.com
```

**Causa**: El firewall o proxy está bloqueando la conexión.

### Error 2: "Certificate verification failed"
```
Error: UNABLE_TO_VERIFY_LEAF_SIGNATURE
```

**Causa**: La empresa usa certificados SSL propios que Claude Code no reconoce.

### Error 3: "Timeout"
```
Error: Request timeout after 30000ms
```

**Causa**: El proxy está tardando mucho o bloqueando silenciosamente.

### Error 4: "Proxy authentication required"
```
Error: 407 Proxy Authentication Required
```

**Causa**: El proxy necesita usuario y contraseña.

No te preocupes si estos errores te parecen aterradores. Vamos a resolverlos uno por uno CON LA AYUDA DE CLAUDE CODE.

## Paso 1: Diagnosticando el Problema con Claude Code

Antes de arreglar algo, necesitas entender QUÉ está roto. Vamos a pedirle a Claude Code que nos ayude a diagnosticar.

**Tú abres Claude Code (si funciona, quizás en modo offline) y escribes**:
```
Claude, estoy en mi oficina y no puedo conectarme a ti. Me sale un error
de conexión. ¿Qué puedo hacer para diagnosticar el problema? Necesito
comandos específicos que pueda ejecutar para entender qué está bloqueado.
```

**Claude Code responde**:
```
¡Entiendo la frustración! Vamos a diagnosticar el problema paso a paso.
Te voy a dar comandos para ejecutar que nos dirán EXACTAMENTE qué está
bloqueado.

DIAGNÓSTICO PASO A PASO:
=========================

PASO 1: Verificar conectividad básica a internet
-------------------------------------------------

Abre tu terminal y ejecuta:

```bash
ping google.com
```

¿Qué esperas ver?
✅ Si funciona: Paquetes enviados y recibidos
❌ Si no funciona: "Request timeout" o "Unknown host"

Si NO funciona ping, tienes un problema más básico (sin internet).

PASO 2: Probar resolución DNS
------------------------------

```bash
nslookup api.anthropic.com
```

¿Qué esperas ver?
✅ Si funciona: Te da una dirección IP
❌ Si no funciona: "Non-existent domain" o error

Si NO funciona, el DNS corporativo está bloqueando el dominio.

PASO 3: Probar conexión a la API de Claude
-------------------------------------------

```bash
curl -v https://api.anthropic.com
```

Este comando intenta conectarse a la API y te muestra TODO el proceso.

¿Qué esperas ver?
✅ Si funciona: "Connected to api.anthropic.com"
❌ Si no funciona: Errores de conexión, timeout, o certificado

PASO 4: Verificar si hay proxy configurado
-------------------------------------------

En Mac/Linux:
```bash
echo $HTTP_PROXY
echo $HTTPS_PROXY
```

En Windows (PowerShell):
```powershell
[System.Environment]::GetEnvironmentVariable("HTTP_PROXY")
[System.Environment]::GetEnvironmentVariable("HTTPS_PROXY")
```

¿Qué esperas ver?
✅ Si hay proxy: Una URL tipo http://proxy.empresa.com:8080
❌ Si no hay: Línea vacía

PASO 5: Verificar certificados
-------------------------------

```bash
openssl s_client -connect api.anthropic.com:443
```

Busca en la salida:
- "Verify return code: 0 (ok)" → ✅ Certificados OK
- "Verify return code: 20 (unable to get local issuer certificate)" → ❌ Problema de certificado

PASO 6: Revisar configuración de npm (si usas Node.js)
-------------------------------------------------------

```bash
npm config get proxy
npm config get https-proxy
npm config get strict-ssl
```

REPORTE:
========

Ejecuta estos comandos y dime:
1. ¿Cuáles funcionaron?
2. ¿Cuáles fallaron?
3. ¿Qué mensajes de error viste?

Con esa información te diré exactamente qué configurar.
```

**¿Qué acabamos de hacer?**

Claude Code te dio un "toolkit de diagnóstico" completo. No te dijo "está roto", te dio comandos específicos para ENTENDER qué está roto. Esto es súper valioso.

## Paso 2: Configurando Proxy para Claude Code

Supongamos que descubriste que tu empresa usa un proxy. Vamos a configurar Claude Code para que funcione con él.

**Tú**:
```
Claude, ejecuté los comandos y descubrí que mi empresa usa un proxy:
http://proxy.miempresa.com:8080

¿Cómo configuro Claude Code para que use ese proxy?
```

**Claude Code**:
```
¡Perfecto! Ahora que sabemos cuál es el proxy, vamos a configurarlo.
Te voy a mostrar TODAS las formas de configurar proxies.

MÉTODO 1: Variables de entorno (RECOMENDADO)
=============================================

Este método funciona para TODA tu terminal, no solo Claude Code.

En Mac/Linux (agregar a ~/.bashrc o ~/.zshrc):
```bash
export HTTP_PROXY=http://proxy.miempresa.com:8080
export HTTPS_PROXY=http://proxy.miempresa.com:8080
export NO_PROXY=localhost,127.0.0.1
```

Luego ejecuta:
```bash
source ~/.bashrc  # o source ~/.zshrc
```

En Windows (PowerShell):
```powershell
[Environment]::SetEnvironmentVariable("HTTP_PROXY", "http://proxy.miempresa.com:8080", "User")
[Environment]::SetEnvironmentVariable("HTTPS_PROXY", "http://proxy.miempresa.com:8080", "User")
```

En Windows (Command Prompt):
```cmd
setx HTTP_PROXY http://proxy.miempresa.com:8080
setx HTTPS_PROXY http://proxy.miempresa.com:8080
```

MÉTODO 2: Configurar solo para Claude Code
===========================================

Si tienes un archivo de configuración de Claude Code (~/.claude/config):

```json
{
  "proxy": "http://proxy.miempresa.com:8080"
}
```

MÉTODO 3: Si el proxy requiere autenticación
=============================================

Si tu proxy necesita usuario y contraseña:

```bash
export HTTP_PROXY=http://usuario:contraseña@proxy.miempresa.com:8080
export HTTPS_PROXY=http://usuario:contraseña@proxy.miempresa.com:8080
```

¡IMPORTANTE! Si tu contraseña tiene caracteres especiales (@, #, etc.),
debes "encodearlos":
- @ → %40
- # → %23
- espacio → %20

Ejemplo:
Contraseña: "Pass@word#123"
Encodeada: "Pass%40word%23123"

URL completa:
```bash
export HTTP_PROXY=http://juan:Pass%40word%23123@proxy.miempresa.com:8080
```

MÉTODO 4: Configurar npm (si instalaste Claude Code con npm)
=============================================================

```bash
npm config set proxy http://proxy.miempresa.com:8080
npm config set https-proxy http://proxy.miempresa.com:8080
```

VERIFICAR QUE FUNCIONA:
=======================

Después de configurar, prueba:

```bash
claude --version
```

O intenta hacer una pregunta simple:
```bash
claude "¿Puedes conectarte?"
```

Si funciona, verás una respuesta. Si no, me dices qué error sale.

TROUBLESHOOTING:
================

Si SIGUE sin funcionar:

1. Verifica que el proxy esté bien escrito (sin espacios extra)
2. Verifica que el puerto sea correcto (usualmente 8080, 3128, o 8888)
3. Pregunta a IT de tu empresa:
   - ¿Cuál es la URL del proxy?
   - ¿Requiere autenticación?
   - ¿Hay dominios bloqueados?

¿Funcionó con alguno de estos métodos?
```

**Lo que Claude Code hizo**:

- Te dio MÚLTIPLES métodos (no solo uno)
- Explicó cómo manejar contraseñas con caracteres especiales
- Te dio comandos para verificar que funcionó
- Incluyó troubleshooting

## Paso 3: Resolviendo Problemas de Certificados SSL

Ahora vamos a resolver el problema de certificados SSL corporativos.

**Tú**:
```
Claude, configuré el proxy pero ahora me sale un error de certificado:
"UNABLE_TO_VERIFY_LEAF_SIGNATURE"

¿Qué significa y cómo lo arreglo?
```

**Claude Code**:
```
Este es uno de los problemas MÁS comunes en empresas. Te explico qué pasa
y cómo resolverlo.

¿QUÉ ESTÁ PASANDO?
==================

Tu empresa usa lo que se llama "SSL Interception" o "Man-in-the-Middle Proxy".

Analogía simple:
- Normalmente: Tú hablas directamente con api.anthropic.com
- En tu empresa: Tú hablas con el proxy → El proxy habla con api.anthropic.com

El proxy está "interceptando" la conexión para inspeccionarla (por seguridad).
Para hacer esto, reemplaza los certificados SSL originales con certificados
de la empresa.

El problema: Claude Code no confía en los certificados de tu empresa.

SOLUCIÓN 1: Instalar el certificado corporativo (RECOMENDADO)
==============================================================

PASO A: Obtener el certificado

Pregunta a IT de tu empresa por el "Certificado raíz corporativo" o
"CA Certificate". Te darán un archivo .crt o .pem

PASO B: Agregar el certificado al sistema

En Mac:
1. Abre "Keychain Access"
2. File → Import Items
3. Selecciona el certificado .crt
4. En "Keychain" elige "System"
5. Doble click en el certificado importado
6. Expande "Trust"
7. Selecciona "Always Trust" en "When using this certificate"

En Windows:
1. Doble click en el archivo .crt
2. Click en "Install Certificate"
3. Selecciona "Local Machine"
4. "Place all certificates in the following store"
5. Elige "Trusted Root Certification Authorities"
6. Click "Next" → "Finish"

En Linux:
```bash
sudo cp certificado-empresa.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates
```

PASO C: Reinicia tu terminal

Cierra y abre de nuevo la terminal para que cargue los certificados.

SOLUCIÓN 2: Deshabilitar verificación SSL (NO RECOMENDADO)
===========================================================

⚠️ ADVERTENCIA: Esto reduce la seguridad. Solo úsalo temporalmente.

Variables de entorno:
```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0
```

Para npm:
```bash
npm config set strict-ssl false
```

Para git (si Claude Code usa git internamente):
```bash
git config --global http.sslVerify false
```

¡IMPORTANTE! Esto hace que tu conexión sea vulnerable. Solo úsalo si:
- No puedes obtener el certificado corporativo
- Estás en una red que confías (tu empresa)
- Es temporal mientras IT te ayuda

SOLUCIÓN 3: Especificar el certificado manualmente
===================================================

Si tienes el archivo .crt pero no quieres instalarlo en el sistema:

```bash
export NODE_EXTRA_CA_CERTS=/ruta/al/certificado-empresa.crt
```

Agrega esto a tu ~/.bashrc o ~/.zshrc para que sea permanente.

VERIFICAR:
==========

Después de aplicar cualquier solución, prueba:

```bash
curl https://api.anthropic.com
```

Si funciona sin error de certificado, ¡listo!

¿Cuál solución quieres probar primero?
```

**Análisis**:

Claude Code:
- Explicó POR QUÉ pasa esto (SSL Interception)
- Dio la solución CORRECTA primero (instalar certificado)
- Advirtió sobre la solución "fácil" pero insegura
- Dio pasos específicos para cada sistema operativo
- Incluyó verificación

## Paso 4: Trabajando con VPN

Ahora vamos a ver cómo usar Claude Code cuando necesitas conectarte a través de una VPN corporativa.

**Tú**:
```
Claude, mi empresa requiere que me conecte a una VPN para trabajar.
Cuando estoy conectado a la VPN, Claude Code no funciona. ¿Qué hago?
```

**Claude Code**:
```
Las VPNs pueden causar problemas porque redirigen TODO tu tráfico de
internet a través de la red corporativa. Vamos a resolverlo.

DIAGNÓSTICO PRIMERO:
====================

¿Claude Code funciona SIN la VPN?

Caso A: Funciona SIN VPN, NO funciona CON VPN
→ La VPN está bloqueando o redirigiendo tráfico

Caso B: NO funciona ni SIN ni CON VPN
→ Problema diferente (proxy, firewall)

Asumamos Caso A (lo más común).

SOLUCIÓN 1: Split Tunneling (MEJOR)
====================================

Split Tunneling significa: "Envía tráfico corporativo por la VPN, pero
tráfico personal por mi conexión normal".

Pide a IT que habilite Split Tunneling en tu VPN.

Si tienes control de la VPN (ej. OpenVPN), puedes agregar:

En el archivo de configuración de OpenVPN:
```
pull-filter ignore "redirect-gateway"
```

Esto evita que la VPN redirija TODO el tráfico.

SOLUCIÓN 2: Agregar excepciones a la VPN
=========================================

Algunos clientes de VPN permiten agregar excepciones (dominios que NO
van por la VPN).

Dominios de Claude que podrías agregar como excepción:
- api.anthropic.com
- cdn.anthropic.com
- *.anthropic.com

Cómo hacerlo depende de tu cliente VPN:
- Cisco AnyConnect: Preferences → VPN → Exclude
- OpenVPN: Archivo de config
- Otros: Consulta documentación o IT

SOLUCIÓN 3: Configurar DNS
===========================

A veces el problema es que la VPN usa DNS corporativo que bloquea dominios.

Puedes configurar DNS público temporalmente:

En Mac:
System Preferences → Network → Advanced → DNS
Agrega:
- 8.8.8.8 (Google DNS)
- 1.1.1.1 (Cloudflare DNS)

En Windows:
Network Settings → Change adapter options → Tu VPN → Properties
→ Internet Protocol Version 4 → Properties → Use the following DNS

En Linux:
Edita /etc/resolv.conf:
```
nameserver 8.8.8.8
nameserver 1.1.1.1
```

SOLUCIÓN 4: Usar Claude Code en modo offline (últim recurso)
=============================================================

Si nada funciona, puedes usar Claude Code en funcionalidad reducida:

- Edición de código local (sin AI)
- Comandos básicos de terminal
- Búsqueda en archivos

Cuando salgas de la VPN, recuperas funcionalidad completa.

SOLUCIÓN 5: Proxy dentro de la VPN
===================================

Si la VPN requiere que uses un proxy ADICIONAL:

```bash
export HTTP_PROXY=http://vpn-proxy.empresa.com:8080
export HTTPS_PROXY=http://vpn-proxy.empresa.com:8080
```

Pregunta a IT cuál es la configuración de proxy dentro de la VPN.

CASO ESPECIAL: VPN + Proxy + Certificado corporativo
=====================================================

Si tienes los TRES problemas (VPN + Proxy + Certificado), necesitas:

1. Conectar la VPN
2. Configurar proxy (variables de entorno)
3. Instalar certificado corporativo
4. Configurar DNS si es necesario

Es complejo, pero posible. ¿En qué parte estás atorado específicamente?

RECOMENDACIÓN:
==============

La solución IDEAL es hablar con IT y pedirles que habiliten Split
Tunneling. Explícales que necesitas acceso a herramientas de desarrollo
externas.

Argumentos para convencer a IT:
- "Claude Code es una herramienta de productividad, como Stack Overflow"
- "No maneja datos sensibles de la empresa"
- "Muchas empresas tecnológicas lo permiten"

¿Quieres que te ayude a redactar un email para IT?
```

**Lo que Claude Code hizo**:

- Diagnosticó primero (distinguió entre casos)
- Dio la MEJOR solución (Split Tunneling)
- Ofreció alternativas para diferentes niveles de control
- Incluyó consejo para hablar con IT
- Entendió el caso complejo (VPN + Proxy + Certificado)

## Paso 5: Creando un Script de Diagnóstico Automático

Ahora vamos a pedirle a Claude Code que nos cree un script que diagnostique todos estos problemas automáticamente.

**Tú**:
```
Claude, esto de diagnosticar proxy, certificados, VPN es complicado.
¿Puedes crearme un script que ejecute todos los diagnósticos automáticamente
y me diga qué está mal?
```

**Claude Code**:
```
¡Excelente idea! Te voy a crear un script de diagnóstico completo.

Crea un archivo llamado diagnose-network.sh:

```bash
#!/bin/bash

# Script de diagnóstico de red para Claude Code
# Ejecutar: bash diagnose-network.sh

echo "================================================"
echo "  DIAGNÓSTICO DE RED PARA CLAUDE CODE"
echo "================================================"
echo ""

# Función para mostrar resultados
mostrar_resultado() {
    if [ $1 -eq 0 ]; then
        echo "✅ $2"
    else
        echo "❌ $2"
    fi
}

# Test 1: Conectividad básica
echo "--- TEST 1: Conectividad básica ---"
ping -c 3 google.com > /dev/null 2>&1
mostrar_resultado $? "Ping a Google"
echo ""

# Test 2: Resolución DNS
echo "--- TEST 2: Resolución DNS ---"
nslookup api.anthropic.com > /dev/null 2>&1
mostrar_resultado $? "Resolución de api.anthropic.com"
echo ""

# Test 3: Conexión a la API de Claude
echo "--- TEST 3: Conexión a API de Claude ---"
curl -s -o /dev/null -w "%{http_code}" --connect-timeout 10 https://api.anthropic.com > /tmp/claude_http_code 2>&1
HTTP_CODE=$(cat /tmp/claude_http_code)

if [ "$HTTP_CODE" = "000" ]; then
    echo "❌ No se puede conectar a api.anthropic.com"
    echo "   Posible causa: Firewall o proxy bloqueando"
else
    echo "✅ Conexión establecida (HTTP $HTTP_CODE)"
fi
echo ""

# Test 4: Verificar configuración de proxy
echo "--- TEST 4: Configuración de Proxy ---"
if [ -n "$HTTP_PROXY" ] || [ -n "$HTTPS_PROXY" ]; then
    echo "✅ Proxy configurado:"
    [ -n "$HTTP_PROXY" ] && echo "   HTTP_PROXY=$HTTP_PROXY"
    [ -n "$HTTPS_PROXY" ] && echo "   HTTPS_PROXY=$HTTPS_PROXY"
else
    echo "ℹ️  No hay proxy configurado"
fi
echo ""

# Test 5: Verificar certificados SSL
echo "--- TEST 5: Certificados SSL ---"
openssl s_client -connect api.anthropic.com:443 </dev/null 2>&1 | grep -q "Verify return code: 0"
mostrar_resultado $? "Verificación de certificados SSL"

if [ $? -ne 0 ]; then
    echo "   Posible causa: Certificado corporativo no instalado"
fi
echo ""

# Test 6: Verificar npm (si está instalado)
echo "--- TEST 6: Configuración de npm ---"
if command -v npm &> /dev/null; then
    NPM_PROXY=$(npm config get proxy)
    NPM_HTTPS_PROXY=$(npm config get https-proxy)
    NPM_STRICT_SSL=$(npm config get strict-ssl)

    echo "npm proxy: $NPM_PROXY"
    echo "npm https-proxy: $NPM_HTTPS_PROXY"
    echo "npm strict-ssl: $NPM_STRICT_SSL"
else
    echo "ℹ️  npm no está instalado"
fi
echo ""

# Test 7: Verificar puertos comunes
echo "--- TEST 7: Puertos comunes ---"
for PORT in 80 443 8080 3128; do
    nc -z -w2 google.com $PORT 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✅ Puerto $PORT abierto"
    else
        echo "❌ Puerto $PORT bloqueado"
    fi
done
echo ""

# Test 8: Información del sistema
echo "--- TEST 8: Información del Sistema ---"
echo "OS: $(uname -s)"
echo "Hostname: $(hostname)"
echo "IP: $(hostname -I 2>/dev/null || ipconfig getifaddr en0 2>/dev/null || echo "No disponible")"
echo ""

# RESUMEN Y RECOMENDACIONES
echo "================================================"
echo "  RESUMEN Y RECOMENDACIONES"
echo "================================================"

PROBLEMAS=0

# Verificar problemas comunes
if ! ping -c 1 google.com > /dev/null 2>&1; then
    echo "❌ SIN INTERNET: Verifica tu conexión a internet"
    PROBLEMAS=$((PROBLEMAS + 1))
fi

if ! nslookup api.anthropic.com > /dev/null 2>&1; then
    echo "❌ PROBLEMA DNS: El dominio api.anthropic.com no se resuelve"
    echo "   Recomendación: Configurar DNS público (8.8.8.8)"
    PROBLEMAS=$((PROBLEMAS + 1))
fi

if [ "$HTTP_CODE" = "000" ]; then
    echo "❌ BLOQUEADO: No se puede alcanzar api.anthropic.com"
    echo "   Recomendación: Verificar firewall o configurar proxy"
    PROBLEMAS=$((PROBLEMAS + 1))
fi

if ! openssl s_client -connect api.anthropic.com:443 </dev/null 2>&1 | grep -q "Verify return code: 0"; then
    echo "❌ CERTIFICADOS: Problema con certificados SSL"
    echo "   Recomendación: Instalar certificado corporativo"
    PROBLEMAS=$((PROBLEMAS + 1))
fi

if [ $PROBLEMAS -eq 0 ]; then
    echo ""
    echo "✅ ¡TODO BIEN! No se detectaron problemas."
    echo "   Si Claude Code sigue sin funcionar, contacta a soporte."
else
    echo ""
    echo "Total de problemas encontrados: $PROBLEMAS"
    echo ""
    echo "PASOS SUGERIDOS:"
    echo "1. Contacta a IT de tu empresa con este reporte"
    echo "2. Pregunta sobre configuración de proxy"
    echo "3. Solicita el certificado corporativo si es necesario"
    echo "4. Pide acceso a api.anthropic.com si está bloqueado"
fi

echo ""
echo "Reporte guardado en: $HOME/claude-network-diagnosis.txt"

# Guardar reporte en archivo
bash diagnose-network.sh > "$HOME/claude-network-diagnosis.txt" 2>&1
```

CÓMO USAR EL SCRIPT:
====================

1. Guarda el script como "diagnose-network.sh"

2. Dale permisos de ejecución:
```bash
chmod +x diagnose-network.sh
```

3. Ejecútalo:
```bash
./diagnose-network.sh
```

4. Lee el reporte. Te dirá EXACTAMENTE qué está mal.

5. Comparte el archivo claude-network-diagnosis.txt con IT si necesitas ayuda.

VERSIÓN PARA WINDOWS (PowerShell):
===================================

Si estás en Windows, guarda esto como "diagnose-network.ps1":

```powershell
Write-Host "================================================"
Write-Host "  DIAGNÓSTICO DE RED PARA CLAUDE CODE"
Write-Host "================================================"
Write-Host ""

# Test 1: Conectividad básica
Write-Host "--- TEST 1: Conectividad básica ---"
$ping = Test-Connection -ComputerName google.com -Count 2 -Quiet
if ($ping) {
    Write-Host "✅ Ping a Google" -ForegroundColor Green
} else {
    Write-Host "❌ Ping a Google falló" -ForegroundColor Red
}

# Test 2: Resolución DNS
Write-Host "`n--- TEST 2: Resolución DNS ---"
try {
    $dns = Resolve-DnsName api.anthropic.com -ErrorAction Stop
    Write-Host "✅ Resolución de api.anthropic.com" -ForegroundColor Green
} catch {
    Write-Host "❌ No se puede resolver api.anthropic.com" -ForegroundColor Red
}

# Test 3: Proxy
Write-Host "`n--- TEST 3: Configuración de Proxy ---"
$httpProxy = [Environment]::GetEnvironmentVariable("HTTP_PROXY")
$httpsProxy = [Environment]::GetEnvironmentVariable("HTTPS_PROXY")

if ($httpProxy -or $httpsProxy) {
    Write-Host "✅ Proxy configurado:" -ForegroundColor Green
    if ($httpProxy) { Write-Host "   HTTP_PROXY=$httpProxy" }
    if ($httpsProxy) { Write-Host "   HTTPS_PROXY=$httpsProxy" }
} else {
    Write-Host "ℹ️  No hay proxy configurado" -ForegroundColor Yellow
}

# Test 4: Conexión HTTPS
Write-Host "`n--- TEST 4: Conexión a API de Claude ---"
try {
    $response = Invoke-WebRequest -Uri https://api.anthropic.com -TimeoutSec 10 -UseBasicParsing -ErrorAction Stop
    Write-Host "✅ Conexión establecida" -ForegroundColor Green
} catch {
    Write-Host "❌ No se puede conectar a api.anthropic.com" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n================================================"
Write-Host "Diagnóstico completo"
Write-Host "================================================"
```

Para ejecutarlo:
```powershell
powershell -ExecutionPolicy Bypass -File diagnose-network.ps1
```

¿Quieres que agreguemos algún test adicional al script?
```

## Problemas Comunes y Soluciones

### Error 1: "Script dice que todo está bien pero Claude Code no funciona"

❌ **Problema**: El script muestra ✅ pero Claude Code falla

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, tu script de diagnóstico dice que todo está bien, pero cuando
intento usarte, no funcionas. ¿Qué puede estar pasando?
```

**Claude Code**:
```
Interesante. Si los tests básicos pasan pero Claude Code no funciona,
puede ser algo más específico. Vamos a profundizar:

CAUSAS POSIBLES:
================

1. AUTENTICACIÓN DE CLAUDE CODE
   Claude Code requiere una API key o autenticación. ¿La tienes configurada?

   Verifica:
   ```bash
   cat ~/.claude/credentials  # o donde guardes la config
   ```

   Si no tienes API key, necesitas:
   - Crear cuenta en console.anthropic.com
   - Generar una API key
   - Configurarla en Claude Code

2. FIREWALL DE APLICACIÓN
   Algunos firewalls bloquean aplicaciones específicas (no solo puertos).

   Solución: Pregunta a IT si pueden whitelist "Claude Code" o "claude"

3. DEEP PACKET INSPECTION (DPI)
   La empresa está inspeccionando el CONTENIDO de las peticiones.

   Puede detectar que es una herramienta de IA y bloquearla.

   Test:
   ```bash
   curl -X POST https://api.anthropic.com/v1/complete \
     -H "x-api-key: tu-api-key" \
     -H "content-type: application/json" \
     -d '{"prompt":"Hola","max_tokens":10}'
   ```

   Si curl funciona pero Claude Code no, es DPI.

4. PUERTO ESPECÍFICO BLOQUEADO
   Aunque 443 esté abierto, ciertos sub-puertos pueden estar bloqueados.

5. THROTTLING / RATE LIMITING
   La empresa limita peticiones a ciertos servicios.

   Síntoma: Funciona esporádicamente, luego se detiene.

DEBUGGING AVANZADO:
===================

Ejecuta Claude Code en modo verbose para ver qué está fallando:

```bash
claude --verbose "test"
```

O con debug completo:
```bash
DEBUG=* claude "test"
```

Busca en los logs:
- "Connection refused" → Puerto bloqueado
- "Timeout" → Throttling o firewall silencioso
- "401 Unauthorized" → Problema de API key
- "403 Forbidden" → Bloqueado explícitamente

Copia los logs y pégamelos. Te diré exactamente qué está pasando.

¿Puedes ejecutar el comando en modo verbose y mostrarme la salida?
```

### Error 2: "Funciona a veces, otras no"

❌ **Problema**: Claude Code funciona intermitentemente

✅ **Solución con Claude Code**:

**Tú**:
```
Claude, a veces funcionas y a veces no. Es muy random. ¿Qué puede ser?
```

**Claude Code**:
```
Comportamiento intermitente generalmente indica:

1. LOAD BALANCING DEL PROXY
   Tu empresa tiene múltiples proxies. Algunos permiten Claude, otros no.

   Solución temporal:
   Cuando funcione, anota la hora. Busca un patrón.
   Puede ser que ciertos proxies se activen en ciertos horarios.

   Solución permanente:
   Pide a IT que TODOS los proxies tengan la misma configuración.

2. RATE LIMITING
   Tu empresa limita peticiones por hora/día a servicios externos.

   Test: ¿Funciona al inicio del día y falla más tarde?
   Si sí, es rate limiting.

   Solución: Pide a IT aumento de quota para herramientas de desarrollo.

3. VPN DESCONECTÁNDOSE
   Si usas VPN, puede estar desconectándose silenciosamente.

   Solución:
   ```bash
   # Mac/Linux: Script que verifica VPN cada minuto
   while true; do
     if ! ping -c 1 vpn-gateway.empresa.com > /dev/null 2>&1; then
       echo "VPN desconectada!"
       # Reconectar automáticamente
     fi
     sleep 60
   done
   ```

4. DNS CACHING
   Tu DNS local está cacheando respuestas, algunas correctas, otras no.

   Solución:
   ```bash
   # Mac
   sudo dscacheutil -flushcache

   # Linux
   sudo systemd-resolve --flush-caches

   # Windows
   ipconfig /flushdns
   ```

5. TIMEOUT VARIABLE
   El proxy tarda diferente tiempo según carga.

   Solución: Aumentar timeout en Claude Code (si configurable).

RECOMENDACIÓN:
==============

Lleva un log manual:
```
9:00 AM - ✅ Funcionó
10:30 AM - ❌ Falló (error: timeout)
11:00 AM - ✅ Funcionó
2:00 PM - ❌ Falló (error: connection refused)
```

Después de una semana, verás un patrón. Compártelo con IT.

¿Puedes llevar este log por 2-3 días y decirme qué ves?
```

## 🎮 Ejercicios Gamificados

### Ejercicio 1: Network Detective (100 XP)

**Objetivo**: Diagnosticar y documentar tu red corporativa.

**Tareas**:
1. Ejecutar el script de diagnóstico
2. Documentar todos los hallazgos
3. Identificar proxy, firewall, VPN
4. Crear mapa visual de tu red

**Entregable**: Documento con diagrama de red.

**Bonus (+50 XP)**: Comparar red de casa vs oficina.

### Ejercicio 2: Proxy Configuration Master (150 XP)

**Objetivo**: Configurar proxy correctamente en todos los niveles.

**Tareas**:
1. Configurar proxy en variables de entorno
2. Configurar en npm
3. Configurar en git
4. Crear script que lo haga automáticamente
5. Documentar paso a paso

**Entregable**: Script de auto-configuración.

**Bonus (+75 XP)**: Script que detecta proxy automáticamente.

### Ejercicio 3: Certificate Installer (200 XP)

**Objetivo**: Instalar certificado corporativo correctamente.

**Tareas**:
1. Obtener certificado de IT
2. Instalarlo en tu sistema
3. Verificar que funcione
4. Crear guía para compañeros
5. Documentar troubleshooting

**Entregable**: Guía PDF con screenshots.

**Bonus (+100 XP)**: Script que instale certificado automáticamente.

### Ejercicio 4: VPN Troubleshooter (175 XP)

**Objetivo**: Hacer funcionar Claude Code con VPN.

**Tareas**:
1. Documentar configuración actual de VPN
2. Probar Split Tunneling
3. Configurar excepciones de dominio
4. Medir diferencia de velocidad con/sin VPN
5. Crear reporte completo

**Entregable**: Reporte técnico con solución.

**Bonus (+85 XP)**: Script que cambie configuración automáticamente al conectar VPN.

### Ejercicio 5: IT Communication Challenge (150 XP)

**Objetivo**: Comunicarte efectivamente con IT para resolver bloqueos.

**Tareas**:
1. Redactar email profesional a IT explicando necesidad de Claude Code
2. Incluir justificación de negocio
3. Adjuntar reporte de diagnóstico
4. Preparar respuestas a objeciones comunes
5. Documentar la conversación

**Pista**: Usa Claude Code para ayudarte a redactar el email.

**Entregable**: Template de email + respuestas preparadas.

**Bonus (+75 XP)**: Conseguir aprobación real de IT.

## Resumen de Esta Lección

¡Felicidades! Completaste una de las lecciones más prácticas del curso. Esto es lo que aprendiste:

✅ **Qué son redes corporativas** y por qué causan problemas

✅ **Diagnosticar problemas de red** usando scripts automáticos

✅ **Configurar proxies** en múltiples niveles (sistema, npm, git)

✅ **Resolver problemas de certificados SSL** instalando certificados corporativos

✅ **Trabajar con VPNs** usando Split Tunneling y excepciones

✅ **Usar Claude Code para debuggear Claude Code** (meta!)

✅ **Comunicarte con IT** de forma efectiva para obtener acceso

✅ **Crear scripts de diagnóstico** que automaticen troubleshooting

Lo más importante: **Aprendiste a NO rendirte cuando algo no funciona en la oficina**. Muchos desarrolladores se frustran y simplemente no usan herramientas útiles porque "no funcionan en la oficina". Ahora tienes las habilidades para HACER QUE FUNCIONEN.

En la próxima lección (la última del módulo), vamos a aprender sobre **Dev Containers con Claude Code**: cómo crear ambientes de desarrollo reproducibles y portables. ¡Nos vemos!
