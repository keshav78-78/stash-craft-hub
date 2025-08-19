import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';

interface Node {
  id: string;
  x: number;
  y: number;
  active: boolean;
  files: number;
  peers: string[];
}

interface Connection {
  from: string;
  to: string;
  active: boolean;
}

const NetworkVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes] = useState<Node[]>([
    { id: 'node-1', x: 150, y: 100, active: true, files: 42, peers: ['node-2', 'node-3'] },
    { id: 'node-2', x: 350, y: 180, active: true, files: 28, peers: ['node-1', 'node-3', 'node-4'] },
    { id: 'node-3', x: 250, y: 280, active: true, files: 35, peers: ['node-1', 'node-2'] },
    { id: 'node-4', x: 450, y: 120, active: false, files: 0, peers: ['node-2'] },
    { id: 'node-5', x: 200, y: 350, active: true, files: 19, peers: ['node-3'] },
  ]);

  const [connections] = useState<Connection[]>([
    { from: 'node-1', to: 'node-2', active: true },
    { from: 'node-1', to: 'node-3', active: true },
    { from: 'node-2', to: 'node-3', active: true },
    { from: 'node-2', to: 'node-4', active: false },
    { from: 'node-3', to: 'node-5', active: true },
  ]);

  const [animationFrame, setAnimationFrame] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      connections.forEach((conn) => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        
        if (fromNode && toNode) {
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          
          if (conn.active) {
            const gradient = ctx.createLinearGradient(fromNode.x, fromNode.y, toNode.x, toNode.y);
            gradient.addColorStop(0, 'hsl(186, 100%, 50%)');
            gradient.addColorStop(1, 'hsl(266, 83%, 50%)');
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            
            // Animated dash for active connections
            ctx.setLineDash([10, 5]);
            ctx.lineDashOffset = -animationFrame * 0.5;
          } else {
            ctx.strokeStyle = 'hsl(0, 0%, 50%)';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
          }
          
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
        
        if (node.active) {
          // Glowing effect for active nodes
          const glowIntensity = 0.5 + 0.3 * Math.sin(animationFrame * 0.03);
          ctx.fillStyle = `hsla(120, 100%, 50%, ${glowIntensity})`;
          ctx.shadowColor = 'hsl(120, 100%, 50%)';
          ctx.shadowBlur = 20;
        } else {
          ctx.fillStyle = 'hsl(0, 0%, 50%)';
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        
        // Node border
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
        ctx.strokeStyle = node.active ? 'hsl(186, 100%, 50%)' : 'hsl(0, 0%, 30%)';
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.stroke();
        
        // Node label
        ctx.fillStyle = 'hsl(210, 40%, 98%)';
        ctx.font = '12px system-ui';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 0;
        ctx.fillText(node.id.split('-')[1], node.x, node.y - 35);
        
        if (node.active) {
          ctx.fillText(`${node.files} files`, node.x, node.y + 40);
        }
      });
      
      setAnimationFrame(prev => prev + 1);
      requestAnimationFrame(animate);
    };

    animate();
  }, [nodes, connections, animationFrame]);

  return (
    <Card className="card-tech p-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gradient">Network Status</h3>
        <p className="text-muted-foreground">Real-time P2P node visualization</p>
      </div>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={500}
          height={400}
          className="w-full max-w-lg mx-auto rounded-lg bg-background/50"
        />
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-node-active rounded-full animate-pulse"></div>
            <span>Active Nodes: {nodes.filter(n => n.active).length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-node-inactive rounded-full"></div>
            <span>Offline: {nodes.filter(n => !n.active).length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-connection-line rounded-full"></div>
            <span>Connections: {connections.filter(c => c.active).length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Total Files: {nodes.reduce((sum, n) => sum + n.files, 0)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NetworkVisualization;