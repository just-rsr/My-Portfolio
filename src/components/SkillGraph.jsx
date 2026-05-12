import { useEffect, useRef, useState, useCallback } from 'react';

// ── Graph data ────────────────────────────────────────────────────────────────
const NODES = [
  // Languages
  { id: 'rust',        label: 'Rust',             group: 'lang',    r: 36 },
  { id: 'python',      label: 'Python',            group: 'lang',    r: 36 },
  { id: 'java',        label: 'Java',              group: 'lang',    r: 32 },
  { id: 'typescript',  label: 'TypeScript',        group: 'lang',    r: 30 },
  { id: 'javascript',  label: 'JavaScript',        group: 'lang',    r: 30 },

  // Frontend
  { id: 'react',       label: 'React',             group: 'web',     r: 34 },
  { id: 'css',         label: 'CSS3',              group: 'web',     r: 26 },
  { id: 'html',        label: 'HTML5',             group: 'web',     r: 26 },

  // Backend / infra
  { id: 'nodejs',      label: 'Node.js',           group: 'backend', r: 32 },
  { id: 'express',     label: 'Express',           group: 'backend', r: 26 },
  { id: 'springboot',  label: 'Spring Boot',       group: 'backend', r: 28 },
  { id: 'flask',       label: 'Flask',             group: 'backend', r: 26 },

  // Data / DB
  { id: 'mongodb',     label: 'MongoDB',           group: 'data',    r: 30 },
  { id: 'postgresql',  label: 'PostgreSQL',        group: 'data',    r: 28 },
  { id: 'redis',       label: 'Redis',             group: 'data',    r: 26 },

  // ML / AI
  { id: 'ml',          label: 'Machine Learning',  group: 'ai',      r: 34 },
  { id: 'sklearn',     label: 'Scikit-learn',      group: 'ai',      r: 28 },
  { id: 'pandas',      label: 'Pandas',            group: 'ai',      r: 26 },
  { id: 'llm',         label: 'LLM Engineering',   group: 'ai',      r: 30 },
  { id: 'rag',         label: 'RAG Pipelines',     group: 'ai',      r: 28 },

  // Systems
  { id: 'compiler',    label: 'Compiler Design',   group: 'systems', r: 32 },
  { id: 'llvm',        label: 'LLVM',              group: 'systems', r: 28 },
  { id: 'distributed', label: 'Distributed Sys',   group: 'systems', r: 30 },
  { id: 'kafka',       label: 'Kafka',             group: 'systems', r: 26 },
  { id: 'systemdesign',label: 'System Design',     group: 'systems', r: 32 },

  // Infra
  { id: 'docker',      label: 'Docker',            group: 'infra',   r: 28 },
  { id: 'aws',         label: 'AWS',               group: 'infra',   r: 28 },
  { id: 'git',         label: 'Git',               group: 'infra',   r: 26 },

  // Security
  { id: 'jwt',         label: 'JWT / Auth',        group: 'security',r: 26 },
  { id: 'aes',         label: 'AES Encryption',    group: 'security',r: 26 },
];

// Edges = skills used together in the same project / context
const EDGES = [
  // CruxLang
  { source: 'rust',       target: 'compiler',    project: 'CruxLang' },
  { source: 'rust',       target: 'llvm',        project: 'CruxLang' },
  { source: 'compiler',   target: 'llvm',        project: 'CruxLang' },

  // Recipe Recommendation
  { source: 'python',     target: 'ml',          project: 'Recipe Rec' },
  { source: 'python',     target: 'sklearn',     project: 'Recipe Rec' },
  { source: 'python',     target: 'flask',       project: 'Recipe Rec' },
  { source: 'ml',         target: 'sklearn',     project: 'Recipe Rec' },
  { source: 'flask',      target: 'react',       project: 'Recipe Rec' },

  // Carbon Emission Predictor
  { source: 'python',     target: 'pandas',      project: 'CEP' },
  { source: 'ml',         target: 'pandas',      project: 'CEP' },
  { source: 'sklearn',    target: 'pandas',      project: 'CEP' },

  // Fintrek
  { source: 'react',      target: 'nodejs',      project: 'Fintrek' },
  { source: 'nodejs',     target: 'mongodb',     project: 'Fintrek' },
  { source: 'nodejs',     target: 'express',     project: 'Fintrek' },
  { source: 'express',    target: 'mongodb',     project: 'Fintrek' },
  { source: 'react',      target: 'javascript',  project: 'Fintrek' },

  // Secure Notes
  { source: 'java',       target: 'springboot',  project: 'Secure Notes' },
  { source: 'java',       target: 'jwt',         project: 'Secure Notes' },
  { source: 'java',       target: 'aes',         project: 'Secure Notes' },
  { source: 'springboot', target: 'jwt',         project: 'Secure Notes' },
  { source: 'springboot', target: 'postgresql',  project: 'Secure Notes' },

  // Systems design work
  { source: 'systemdesign', target: 'distributed', project: 'Systems' },
  { source: 'systemdesign', target: 'redis',        project: 'Systems' },
  { source: 'systemdesign', target: 'kafka',        project: 'Systems' },
  { source: 'distributed',  target: 'kafka',        project: 'Systems' },
  { source: 'distributed',  target: 'redis',        project: 'Systems' },

  // LLM / AI work
  { source: 'llm',        target: 'rag',         project: 'AI Work' },
  { source: 'llm',        target: 'python',      project: 'AI Work' },
  { source: 'rag',        target: 'python',      project: 'AI Work' },

  // General infra
  { source: 'docker',     target: 'aws',         project: 'Infra' },
  { source: 'git',        target: 'docker',      project: 'Infra' },
  { source: 'typescript', target: 'react',       project: 'Web' },
  { source: 'typescript', target: 'nodejs',      project: 'Web' },
  { source: 'css',        target: 'html',        project: 'Web' },
  { source: 'css',        target: 'react',       project: 'Web' },
];

const GROUP_COLORS = {
  lang:     '#DEA584',
  web:      '#61DAFB',
  backend:  '#339933',
  data:     '#47A248',
  ai:       '#a78bfa',
  systems:  '#26d0ce',
  infra:    '#FF9900',
  security: '#F05032',
};

const PROJECT_COLORS = {
  'CruxLang':    '#DEA584',
  'Recipe Rec':  '#47A248',
  'CEP':         '#00A67E',
  'Fintrek':     '#61DAFB',
  'Secure Notes':'#F05032',
  'Systems':     '#26d0ce',
  'AI Work':     '#a78bfa',
  'Infra':       '#FF9900',
  'Web':         '#3178C6',
};

// ── Force-directed simulation (no d3 needed) ─────────────────────────────────
function useForceGraph(width, height) {
  const nodesRef = useRef(null);
  const edgesRef = useRef(EDGES);
  const rafRef   = useRef(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!width || !height) return;

    // Init positions in a circle
    const n = NODES.length;
    nodesRef.current = NODES.map((node, i) => ({
      ...node,
      x: width  / 2 + (width  * 0.35) * Math.cos((2 * Math.PI * i) / n),
      y: height / 2 + (height * 0.35) * Math.sin((2 * Math.PI * i) / n),
      vx: 0,
      vy: 0,
    }));

    const IDEAL_EDGE  = 145;
    const REPULSION   = 4000;
    const SPRING_K    = 0.04;
    const DAMPING     = 0.82;
    const CENTER_K    = 0.012;
    const PADDING     = 48;

    let alpha = 1;

    function step() {
      if (alpha < 0.005) return;
      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      // Repulsion between all pairs
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = (REPULSION * alpha) / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          nodes[i].vx -= fx;
          nodes[i].vy -= fy;
          nodes[j].vx += fx;
          nodes[j].vy += fy;
        }
      }

      // Spring attraction along edges
      const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
      for (const edge of edges) {
        const a = nodeMap[edge.source];
        const b = nodeMap[edge.target];
        if (!a || !b) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const stretch = dist - IDEAL_EDGE;
        const force = SPRING_K * stretch * alpha;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        a.vx += fx; a.vy += fy;
        b.vx -= fx; b.vy -= fy;
      }

      // Gravity toward center
      for (const node of nodes) {
        node.vx += (width  / 2 - node.x) * CENTER_K * alpha;
        node.vy += (height / 2 - node.y) * CENTER_K * alpha;
      }

      // Integrate + damp + clamp to bounds
      for (const node of nodes) {
        node.vx *= DAMPING;
        node.vy *= DAMPING;
        node.x  += node.vx;
        node.y  += node.vy;
        node.x   = Math.max(PADDING + node.r, Math.min(width  - PADDING - node.r, node.x));
        node.y   = Math.max(PADDING + node.r, Math.min(height - PADDING - node.r, node.y));
      }

      alpha *= 0.994;
      setTick(t => t + 1);
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height]);

  return { nodes: nodesRef.current, edges: edgesRef.current };
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function SkillGraph() {
  const containerRef = useRef(null);
  const [dims, setDims]         = useState({ width: 0, height: 0 });
  const [hovered, setHovered]   = useState(null); // node id
  const [dragging, setDragging] = useState(null); // node id
  const dragOffset              = useRef({ x: 0, y: 0 });

  // Measure container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect;
      setDims({ width, height: Math.min(width * 0.75, 520) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { nodes, edges } = useForceGraph(dims.width, dims.height);

  // Build adjacency for highlight
  const adjacentIds = useCallback((id) => {
    if (!id || !edges) return new Set();
    const s = new Set([id]);
    for (const e of edges) {
      if (e.source === id) s.add(e.target);
      if (e.target === id) s.add(e.source);
    }
    return s;
  }, [edges]);

  const highlighted = hovered ? adjacentIds(hovered) : null;

  // Drag handlers
  const onMouseDown = useCallback((e, nodeId) => {
    e.preventDefault();
    const node = nodes?.find(n => n.id === nodeId);
    if (!node) return;
    const rect = containerRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left - node.x,
      y: e.clientY - rect.top  - node.y,
    };
    setDragging(nodeId);
  }, [nodes]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || !nodes) return;
      const node = nodes.find(n => n.id === dragging);
      if (!node) return;
      node.x = e.clientX - rect.left - dragOffset.current.x;
      node.y = e.clientY - rect.top  - dragOffset.current.y;
      node.vx = 0; node.vy = 0;
    };
    const onUp = () => setDragging(null);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging, nodes]);

  if (!nodes || dims.width === 0) {
    return (
      <div
        ref={containerRef}
        style={{ width: '100%', height: 400, minWidth: 0 }}
      />
    );
  }

  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

  // Tooltip for hovered node
  const hoveredNode = hovered ? nodes.find(n => n.id === hovered) : null;
  const hoveredEdges = hovered
    ? edges.filter(e => e.source === hovered || e.target === hovered)
    : [];
  const projects = [...new Set(hoveredEdges.map(e => e.project))];

  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative', userSelect: 'none', minWidth: 0, overflow: 'hidden' }}>
      <svg
        width="100%"
        height={dims.height}
        viewBox={`0 0 ${dims.width} ${dims.height}`}
        style={{ display: 'block', cursor: dragging ? 'grabbing' : 'default' }}
      >
        <defs>
          {Object.entries(GROUP_COLORS).map(([group, color]) => (
            <radialGradient key={group} id={`grad-${group}`} cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor={color} stopOpacity="0.95" />
              <stop offset="100%" stopColor={color} stopOpacity="0.55" />
            </radialGradient>
          ))}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {edges.map((edge, i) => {
          const a = nodeMap[edge.source];
          const b = nodeMap[edge.target];
          if (!a || !b) return null;
          const isActive = highlighted
            ? highlighted.has(edge.source) && highlighted.has(edge.target)
            : false;
          const projColor = PROJECT_COLORS[edge.project] || '#ffffff';
          return (
            <line
              key={i}
              x1={a.x} y1={a.y}
              x2={b.x} y2={b.y}
              stroke={isActive ? projColor : 'rgba(255,255,255,0.07)'}
              strokeWidth={isActive ? 2 : 1}
              strokeOpacity={highlighted ? (isActive ? 0.85 : 0.04) : 0.12}
              style={{ transition: 'stroke-opacity 0.2s, stroke-width 0.2s' }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const isHovered  = hovered === node.id;
          const isAdjacent = highlighted ? highlighted.has(node.id) : false;
          const dimmed     = highlighted && !isAdjacent;
          const color      = GROUP_COLORS[node.group] || '#ffffff';

          return (
            <g
              key={node.id}
              transform={`translate(${node.x},${node.y})`}
              style={{ cursor: 'grab' }}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              onMouseDown={(e) => onMouseDown(e, node.id)}
            >
              {/* Glow ring on hover */}
              {isHovered && (
                <circle
                  r={node.r + 8}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  strokeOpacity={0.5}
                  filter="url(#glow)"
                />
              )}
              {/* Node circle */}
              <circle
                r={node.r}
                fill={`url(#grad-${node.group})`}
                stroke={color}
                strokeWidth={isHovered ? 2 : 1}
                strokeOpacity={dimmed ? 0.15 : 0.7}
                fillOpacity={dimmed ? 0.15 : 1}
                style={{ transition: 'fill-opacity 0.2s, stroke-opacity 0.2s' }}
              />
              {/* Label */}
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={node.r > 22 ? 12 : 10.5}
                fontWeight={isHovered ? 700 : 500}
                fill="#fff"
                fillOpacity={dimmed ? 0.2 : 1}
                style={{
                  pointerEvents: 'none',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  transition: 'fill-opacity 0.2s',
                }}
              >
                {node.label.length > 12
                  ? node.label.split(' ').map((word, wi) => (
                      <tspan key={wi} x={0} dy={wi === 0 ? (node.label.split(' ').length > 1 ? -6 : 0) : 13}>
                        {word}
                      </tspan>
                    ))
                  : node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredNode && (
        <div
          style={{
            position: 'absolute',
            left: Math.min(hoveredNode.x + hoveredNode.r + 12, dims.width - 180),
            top: Math.max(hoveredNode.y - 40, 8),
            background: 'rgba(22, 22, 30, 0.95)',
            border: `1px solid ${GROUP_COLORS[hoveredNode.group]}44`,
            borderRadius: 10,
            padding: '10px 14px',
            pointerEvents: 'none',
            zIndex: 10,
            minWidth: 140,
            maxWidth: 200,
            backdropFilter: 'blur(12px)',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 13, color: GROUP_COLORS[hoveredNode.group], marginBottom: 4 }}>
            {hoveredNode.label}
          </div>
          {projects.length > 0 && (
            <>
              <div style={{ fontSize: 10, color: '#7a7a8a', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Used in
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {projects.map(p => (
                  <span key={p} style={{
                    fontSize: 10, fontWeight: 600,
                    color: PROJECT_COLORS[p] || '#fff',
                    background: (PROJECT_COLORS[p] || '#fff') + '18',
                    border: `1px solid ${(PROJECT_COLORS[p] || '#fff')}33`,
                    borderRadius: 4, padding: '2px 6px',
                  }}>
                    {p}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Legend */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '8px 16px',
        justifyContent: 'center', marginTop: 16, padding: '0 8px',
      }}>
        {Object.entries(GROUP_COLORS).map(([group, color]) => (
          <span key={group} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#a8a8a8' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />
            {group.charAt(0).toUpperCase() + group.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
}
