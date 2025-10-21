import React, { useEffect, useRef } from 'react';

/**
 * NeuralNetwork - Componente de Red Neuronal Celestial Animada
 *
 * Representa la arquitectura de IA como constelación celestial
 * Combina geometría de circuitos neuronales con estética de estrellas conectadas
 * Colores: Ultramarine + Gold con opacity variable
 *
 * Uso: <NeuralNetwork /> como background en Hero sections
 */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isCore: boolean;
}

interface NeuralNetworkProps {
  className?: string;
  nodeCount?: number;
  connectionDistance?: number;
  animate?: boolean;
}

const NeuralNetwork: React.FC<NeuralNetworkProps> = ({
  className = '',
  nodeCount = 50,
  connectionDistance = 150,
  animate = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar tamaño del canvas
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Inicializar nodos
    const initNodes = () => {
      const nodes: Node[] = [];
      const rect = canvas.getBoundingClientRect();

      for (let i = 0; i < nodeCount; i++) {
        // 20% de nodos son "core" (más brillantes, dorados)
        const isCore = Math.random() < 0.2;

        nodes.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: isCore ? 3 : 2,
          isCore,
        });
      }

      nodesRef.current = nodes;
    };

    initNodes();

    // Colores de la paleta celestial
    const ULTRAMARINE = 'rgba(30, 58, 138, ';
    const GOLD = 'rgba(212, 175, 55, ';
    const AZURE = 'rgba(59, 130, 246, ';

    // Función de renderizado
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const nodes = nodesRef.current;

      // Actualizar posiciones si animate está activado
      if (animate) {
        nodes.forEach((node) => {
          node.x += node.vx;
          node.y += node.vy;

          // Rebotar en los bordes
          if (node.x < 0 || node.x > rect.width) node.vx *= -1;
          if (node.y < 0 || node.y > rect.height) node.vy *= -1;

          // Mantener dentro del canvas
          node.x = Math.max(0, Math.min(rect.width, node.x));
          node.y = Math.max(0, Math.min(rect.height, node.y));
        });
      }

      // Dibujar conexiones primero (debajo de los nodos)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];

          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // Opacidad basada en distancia
            const opacity = (1 - distance / connectionDistance) * 0.3;

            // Color de línea: dorado si ambos son core, azure si uno es core, ultramarine si ninguno
            let lineColor = ULTRAMARINE;
            if (nodeA.isCore && nodeB.isCore) {
              lineColor = GOLD;
            } else if (nodeA.isCore || nodeB.isCore) {
              lineColor = AZURE;
            }

            ctx.beginPath();
            ctx.strokeStyle = lineColor + opacity + ')';
            ctx.lineWidth = nodeA.isCore || nodeB.isCore ? 1.5 : 0.8;
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      // Dibujar nodos
      nodes.forEach((node) => {
        // Nodo principal
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        if (node.isCore) {
          // Nodos core: dorados con glow
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.radius * 3
          );
          gradient.addColorStop(0, GOLD + '0.9)');
          gradient.addColorStop(0.5, GOLD + '0.4)');
          gradient.addColorStop(1, GOLD + '0)');

          ctx.fillStyle = gradient;
          ctx.fill();

          // Punto central sólido
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = GOLD + '1)';
          ctx.fill();
        } else {
          // Nodos normales: azure/ultramarine con glow sutil
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.radius * 2
          );
          gradient.addColorStop(0, AZURE + '0.8)');
          gradient.addColorStop(0.5, ULTRAMARINE + '0.3)');
          gradient.addColorStop(1, ULTRAMARINE + '0)');

          ctx.fillStyle = gradient;
          ctx.fill();

          // Punto central
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = AZURE + '0.9)';
          ctx.fill();
        }
      });

      if (animate) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    render();

    // Si no está animado, re-renderizar solo en resize
    if (!animate) {
      const handleResize = () => {
        initNodes();
        render();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('resize', handleResize);
      };
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [nodeCount, connectionDistance, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default NeuralNetwork;
