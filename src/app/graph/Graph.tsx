import React, { useState, useRef, useEffect } from 'react';
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d';
import data from './data';

interface GraphNode {
  id: string;
  label: string;
  title?: string;
  info?: string;
  category?: string;
  proficiency?: number;
  x?: number;
  y?: number;
}

interface GraphLink {
  source: string;
  target: string;
  type?: string;
}

const categoryColors: Record<string, string> = {
  Backend: '#1f77b4',
  Frontend: '#ff7f0e',
  DevOps: '#2ca02c',
  Database: '#9467bd',
  Tooling: '#8c564b',
  Language: '#a0a0ff',
  IDE: '#17becf',
  Default: '#7f7f7f',
};

const Graph: React.FC = () => {
  const [hoverNode, setHoverNode] = useState<GraphNode | null>(null);
  const fgRef = useRef<ForceGraphMethods>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto zoom after a delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (fgRef.current) {
        fgRef.current.zoomToFit(400, 50);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  // Clamp nodes inside bounds
  useEffect(() => {
    const padding = 40;
    const width = 500;
    const height = 500;

    const simulation =
      (fgRef.current as any)?.d3Force('link')?.simulation ||
      (fgRef.current as any)?.d3Force('charge')?.simulation;

    if (!simulation) return;

    function ticked() {
      const nodes = fgRef.current!.graphData().nodes as GraphNode[];
      nodes.forEach((node) => {
        node.x = Math.max(padding, Math.min(width - padding, node.x!));
        node.y = Math.max(padding, Math.min(height - padding, node.y!));
      });
      fgRef.current!.refresh();
    }

    simulation.on('tick', ticked);
    return () => simulation.on('tick', null);
  }, []);

  // Cursor styling
  useEffect(() => {
    const canvas = containerRef.current?.querySelector('canvas');
    if (canvas) {
      canvas.style.cursor = hoverNode ? 'pointer' : 'default';
    }
  }, [hoverNode]);

  const renderTooltipInfo = (info?: string) =>
    info?.split('\n').map((line, idx) => (
      <div key={idx} style={{ marginTop: idx === 0 ? 0 : 6 }}>
        {line}
      </div>
    )) ?? null;

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: '#fff000',
      }}
    >
      <ForceGraph2D
        ref={fgRef}
        graphData={data as { nodes: GraphNode[]; links: GraphLink[] }}
        backgroundColor="#ffff00"
        nodeRelSize={8}
        onNodeHover={(node) => setHoverNode(node as GraphNode)}
        enableNodeDrag={true}
        enableZoomPanInteraction={false}
        cooldownTicks={100}
        nodeCanvasObject={(nodeObj, ctx, globalScale) => {
          const node = nodeObj as GraphNode;
          const size = 2 + (node.proficiency || 5) * 2;
          const fontSize = (size * 3) / globalScale;
          ctx.font = `${fontSize}px "AbelNF-Regular"`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle =
            node === hoverNode
              ? '#0505ef'
              : categoryColors[node.category || 'Default'] || categoryColors.Default;
          ctx.fillText(node.label, node.x!, node.y!);
        }}
        nodePointerAreaPaint={(nodeObj, color, ctx) => {
          const node = nodeObj as GraphNode;
          const radius = 4 + (node.proficiency || 5);
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
        linkColor={(link: GraphLink) => {
          switch (link.type) {
            case 'dependency':
              return '#17becf';
            case 'related':
              return '#bcbd22';
            case 'tool':
              return '#ff9896';
            default:
              return '#ccc';
          }
        }}
        linkDirectionalParticleColor={(link: GraphLink) => {
          switch (link.type) {
            case 'dependency':
              return '#17becf';
            case 'related':
              return '#bcbd22';
            case 'tool':
              return '#ff9896';
            default:
              return '#aaa';
          }
        }}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleSpeed={0.005}
        zoom={1}
        minZoom={0.8}
        maxZoom={2.5}
        panSpeed={0.5}
      />

      {hoverNode && fgRef.current && (
        <div
          style={{
            position: 'absolute',
            top:
              fgRef.current.graph2ScreenCoords(hoverNode.x!, hoverNode.y!).y + 32,
            left:
              fgRef.current.graph2ScreenCoords(hoverNode.x!, hoverNode.y!).x + 32,
            background: '#fff',
            color: '#333',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '12px 16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
            fontFamily: '"AbelNF-Regular", monospace',
            fontSize: '14px',
            pointerEvents: 'none',
            maxWidth: '280px',
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '8px',
              color:
                categoryColors[hoverNode.category || 'Default'] ||
                categoryColors.Default,
            }}
          >
            {hoverNode.label} &nbsp; {hoverNode.title}
          </div>
          <div>{renderTooltipInfo(hoverNode.info)}</div>
        </div>
      )}
    </div>
  );
};

export default Graph;
