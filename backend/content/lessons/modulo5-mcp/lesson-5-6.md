# Lección 5.6: Creando Clientes MCP Personalizados

> 📘 **En esta lección aprenderás:**
> - Qué es un cliente MCP y cuándo crearlo
> - Arquitectura de un cliente MCP
> - Integración con Anthropic API
> - Manejo del ciclo request-response
> - Interfaces interactivas (CLI, web)

---

## 🎯 ¿Qué es un Cliente MCP?

Un **cliente MCP** es una aplicación que:
1. Se conecta a uno o más servidores MCP
2. Presenta sus herramientas al modelo de lenguaje (Claude)
3. Orquesta la ejecución de tools basándose en las respuestas del LLM
4. Proporciona interfaz al usuario final

```
Usuario ←→ Cliente MCP ←→ Claude API
                ↓
         Servidores MCP
        (tools, resources)
```

---

## 🏗️ Arquitectura de un Cliente

```python
class MCPClient:
    def __init__(self):
        self.anthropic_client = Anthropic()
        self.mcp_sessions = {}  # Un session por servidor
        self.available_tools = []

    async def connect_server(self, server_path):
        """Conectar a servidor MCP"""
        # 1. Iniciar proceso del servidor
        # 2. Establecer transporte (stdio/http)
        # 3. Enviar 'initialize'
        # 4. Obtener capabilities y tools
        pass

    async def process_query(self, user_message):
        """Procesar consulta del usuario"""
        # 1. Enviar mensaje a Claude con tools disponibles
        # 2. Si Claude quiere usar tool, ejecutarlo via MCP
        # 3. Enviar resultado de tool de vuelta a Claude
        # 4. Repetir hasta tener respuesta final
        pass
```

---

## 🐍 Cliente Python Completo

```python
import asyncio
from anthropic import Anthropic
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from typing import List, Dict, Any

class TaskManagerClient:
    def __init__(self, api_key: str):
        self.anthropic = Anthropic(api_key=api_key)
        self.session = None
        self.available_tools = []

    async def connect_to_server(self, server_path: str):
        """Conectar al servidor MCP de tareas"""
        server_params = StdioServerParameters(
            command="python",
            args=[server_path]
        )

        # Usar context manager para mantener conexión
        read, write = await stdio_client(server_params).__aenter__()
        self.session = await ClientSession(read, write).__aenter__()

        # Inicializar conexión
        await self.session.initialize()

        # Obtener herramientas disponibles
        tools_response = await self.session.list_tools()
        self.available_tools = tools_response.tools

        print(f"✓ Conectado a servidor")
        print(f"✓ {len(self.available_tools)} herramientas disponibles")

    async def process_query(self, user_message: str) -> str:
        """Procesar consulta del usuario"""
        messages = [
            {"role": "user", "content": user_message}
        ]

        # Preparar tools en formato Anthropic
        tools_for_claude = [
            {
                "name": tool.name,
                "description": tool.description,
                "input_schema": tool.inputSchema
            }
            for tool in self.available_tools
        ]

        while True:
            # Llamar a Claude con herramientas
            response = self.anthropic.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=4096,
                tools=tools_for_claude,
                messages=messages
            )

            # Si Claude no quiere usar tools, retornamos respuesta
            if response.stop_reason != "tool_use":
                final_text = next(
                    (block.text for block in response.content if hasattr(block, "text")),
                    ""
                )
                return final_text

            # Claude quiere usar herramientas
            # Agregar respuesta de Claude al contexto
            messages.append({
                "role": "assistant",
                "content": response.content
            })

            # Ejecutar cada tool que Claude solicitó
            tool_results = []

            for content_block in response.content:
                if content_block.type == "tool_use":
                    print(f"  Ejecutando: {content_block.name}...")

                    # Llamar al servidor MCP
                    result = await self.session.call_tool(
                        content_block.name,
                        content_block.input
                    )

                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": content_block.id,
                        "content": result.content
                    })

            # Agregar resultados de tools al contexto
            messages.append({
                "role": "user",
                "content": tool_results
            })

            # Continuar el loop para que Claude procese los resultados

    async def run(self):
        """Loop interactivo principal"""
        print("\n🎯 Task Manager MCP Client")
        print("Escribe 'quit' para salir\n")

        while True:
            try:
                query = input("Tú: ")

                if query.lower() in ['quit', 'exit', 'q']:
                    print("¡Adiós!")
                    break

                if not query.strip():
                    continue

                # Procesar consulta
                response = await self.process_query(query)
                print(f"\nClaude: {response}\n")

            except KeyboardInterrupt:
                print("\n¡Adiós!")
                break
            except Exception as e:
                print(f"\n❌ Error: {e}\n")

async def main():
    import os

    # Obtener API key
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        print("❌ Set ANTHROPIC_API_KEY environment variable")
        return

    # Crear cliente
    client = TaskManagerClient(api_key)

    # Conectar al servidor
    server_path = os.path.expanduser("~/task-manager-mcp/server.py")
    await client.connect_to_server(server_path)

    # Ejecutar loop interactivo
    await client.run()

if __name__ == "__main__":
    asyncio.run(main())
```

---

## 💻 Cliente TypeScript

```typescript
import { Anthropic } from "@anthropic-ai/sdk";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import * as readline from "readline/promises";

class TaskManagerClient {
  private anthropic: Anthropic;
  private client: Client | null = null;
  private availableTools: any[] = [];

  constructor(apiKey: string) {
    this.anthropic = new Anthropic({ apiKey });
  }

  async connectToServer(command: string, args: string[]) {
    // Crear transporte
    const transport = new StdioClientTransport({
      command,
      args
    });

    // Crear cliente
    this.client = new Client({
      name: "task-manager-client",
      version: "1.0.0"
    }, {
      capabilities: {}
    });

    // Conectar
    await this.client.connect(transport);

    // Obtener herramientas
    const response = await this.client.listTools();
    this.availableTools = response.tools;

    console.log(`✓ Conectado a servidor`);
    console.log(`✓ ${this.availableTools.length} herramientas disponibles`);
  }

  async processQuery(userMessage: string): Promise<string> {
    const messages: any[] = [
      { role: "user", content: userMessage }
    ];

    const toolsForClaude = this.availableTools.map(tool => ({
      name: tool.name,
      description: tool.description,
      input_schema: tool.inputSchema
    }));

    while (true) {
      const response = await this.anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 4096,
        tools: toolsForClaude,
        messages
      });

      if (response.stop_reason !== "tool_use") {
        const textBlock = response.content.find(
          (block): block is Anthropic.TextBlock => block.type === "text"
        );
        return textBlock?.text || "";
      }

      // Agregar respuesta de Claude
      messages.push({
        role: "assistant",
        content: response.content
      });

      // Ejecutar tools
      const toolResults = [];

      for (const block of response.content) {
        if (block.type === "tool_use") {
          console.log(`  Ejecutando: ${block.name}...`);

          const result = await this.client!.callTool({
            name: block.name,
            arguments: block.input
          });

          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: result.content
          });
        }
      }

      // Agregar resultados
      messages.push({
        role: "user",
        content: toolResults
      });
    }
  }

  async run() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log("\n🎯 Task Manager MCP Client");
    console.log("Escribe 'quit' para salir\n");

    while (true) {
      try {
        const query = await rl.question("Tú: ");

        if (["quit", "exit", "q"].includes(query.toLowerCase())) {
          console.log("¡Adiós!");
          break;
        }

        if (!query.trim()) continue;

        const response = await this.processQuery(query);
        console.log(`\nClaude: ${response}\n`);

      } catch (error) {
        console.error(`\n❌ Error: ${error}\n`);
      }
    }

    rl.close();
  }
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("❌ Set ANTHROPIC_API_KEY");
    return;
  }

  const client = new TaskManagerClient(apiKey);

  await client.connectToServer("node", [
    "./dist/server.js"
  ]);

  await client.run();
}

main().catch(console.error);
```

---

## 🌐 Cliente Web (React)

Para interfaces web:

```typescript
// src/hooks/useMCPClient.ts
import { useState, useEffect } from 'react';
import { Anthropic } from '@anthropic-ai/sdk';

export function useMCPClient(serverUrl: string) {
  const [tools, setTools] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Conectar al servidor MCP via HTTP
    fetch(`${serverUrl}/tools/list`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method: 'tools/list', id: 1 })
    })
      .then(res => res.json())
      .then(data => {
        setTools(data.result.tools);
        setConnected(true);
      });
  }, [serverUrl]);

  const callTool = async (name: string, args: any) => {
    const response = await fetch(`${serverUrl}/tools/call`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'tools/call',
        params: { name, arguments: args },
        id: Date.now()
      })
    });

    const data = await response.json();
    return data.result.content;
  };

  return { tools, connected, callTool };
}
```

---

## ⚠️ Mejores Prácticas

### 1. Manejo de Errores

```python
async def process_query(self, user_message: str) -> str:
    try:
        # ... código ...
    except Exception as e:
        logger.error(f"Error procesando query: {e}")
        return f"❌ Error: {str(e)}"
```

### 2. Timeouts

```python
import asyncio

async def process_query_with_timeout(self, message: str, timeout: int = 60):
    try:
        return await asyncio.wait_for(
            self.process_query(message),
            timeout=timeout
        )
    except asyncio.TimeoutError:
        return "⏱️ La operación tomó demasiado tiempo"
```

### 3. Retry Logic

```python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10)
)
async def call_tool_with_retry(self, name: str, args: dict):
    return await self.session.call_tool(name, args)
```

### 4. Logging Detallado

```python
import logging

logger = logging.getLogger(__name__)

async def process_query(self, message: str):
    logger.info(f"Processing query: {message[:50]}...")

    response = await self.anthropic.messages.create(...)
    logger.info(f"Claude response: stop_reason={response.stop_reason}")

    if response.stop_reason == "tool_use":
        for block in response.content:
            if block.type == "tool_use":
                logger.info(f"Calling tool: {block.name}")
                result = await self.session.call_tool(...)
                logger.info(f"Tool result: {len(str(result))} chars")
```

---

## 🎯 Casos de Uso de Clientes Personalizados

### 1. CLI Empresarial

Cliente que integra múltiples servidores MCP internos.

### 2. Chatbot Web

Interfaz web con backend que orquesta servidores MCP.

### 3. Aplicación Móvil

App que usa MCP servers para acceder a servicios backend.

### 4. Integración en IDEs

Plugin para VS Code/JetBrains con MCP.

### 5. Workflows Automatizados

Scripts que usan MCP para automatizar tareas complejas.

---

## 📝 Resumen

- **Cliente MCP:** Orquesta comunicación entre usuario, Claude y servidores
- **Componentes:** Anthropic client + MCP sessions + UI
- **Flujo:** Usuario → Cliente → Claude → MCP Server → Cliente → Usuario
- **Implementaciones:** Python, TypeScript, web (React)
- **Best practices:** Error handling, timeouts, retry, logging

---

## 🚀 Próximos Pasos

**Lección 5.7:** Integración avanzada de MCP con Claude Code (referencias @, prompts como slash commands, enterprise).

---

**Duración estimada:** 2 horas
**Dificultad:** ⭐⭐⭐⭐ Avanzada
