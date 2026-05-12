import { useEffect, useState, useRef } from 'react';

const TEAL   = '#26d0ce';
const INDIGO = '#6366f1';
const DIM    = 'rgba(255,255,255,0.08)';
const LINE   = 'rgba(255,255,255,0.12)';
const TEXT   = 'rgba(255,255,255,0.35)';
const LABEL  = 'rgba(255,255,255,0.5)';

// ── Shared node glow ─────────────────────────────────────────────────────────
function Node({ cx, cy, r = 14, active, color = TEAL, label }) {
  return (
    <g>
      {active && (
        <circle cx={cx} cy={cy} r={r + 7} fill="none"
          stroke={color} strokeWidth={1.5} strokeOpacity={0.35}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      )}
      <circle cx={cx} cy={cy} r={r}
        fill={active ? color + '22' : DIM}
        stroke={active ? color : 'rgba(255,255,255,0.15)'}
        strokeWidth={active ? 1.5 : 1}
        style={{ transition: 'all 0.3s', filter: active ? `drop-shadow(0 0 8px ${color})` : 'none' }} />
      {label && (
        <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
          fontSize={13} fontWeight={600} fill={active ? color : TEXT}
          style={{ fontFamily: 'Inter, monospace', transition: 'fill 0.3s' }}>
          {label}
        </text>
      )}
    </g>
  );
}

function Edge({ x1, y1, x2, y2, active, color = TEAL }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={active ? color : LINE}
      strokeWidth={active ? 1.5 : 1}
      strokeOpacity={active ? 0.8 : 1}
      style={{ transition: 'all 0.3s', filter: active ? `drop-shadow(0 0 4px ${color})` : 'none' }} />
  );
}

function Arrow({ x1, y1, x2, y2, active, color = TEAL }) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / len, uy = dy / len;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const ax = mx + uy * 5, ay = my - ux * 5;
  const bx = mx - uy * 5, by = my + ux * 5;
  const tip = { x: mx + ux * 7, y: my + uy * 7 };
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={active ? color : LINE} strokeWidth={active ? 1.5 : 1}
        style={{ transition: 'all 0.3s' }} />
      <polygon points={`${ax},${ay} ${bx},${by} ${tip.x},${tip.y}`}
        fill={active ? color : LINE}
        style={{ transition: 'all 0.3s' }} />
    </g>
  );
}

// ── 1. Array ──────────────────────────────────────────────────────────────────
function ArrayViz() {
  const vals = [3, 7, 1, 9, 4, 6, 2];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % vals.length), 600);
    return () => clearInterval(id);
  }, []);
  const W = 300, bw = 34, gap = 6, total = vals.length * (bw + gap) - gap;
  const startX = (W - total) / 2;
  return (
    <svg width={W} height={110}>
      <text x={W / 2} y={14} textAnchor="middle" fontSize={12} fill={LABEL} fontFamily="Inter,monospace">Array — Linear Scan</text>
      {vals.map((v, i) => {
        const x = startX + i * (bw + gap);
        const isActive = i === active;
        return (
          <g key={i}>
            <rect x={x} y={28} width={bw} height={bw}
              rx={4} fill={isActive ? TEAL + '22' : DIM}
              stroke={isActive ? TEAL : 'rgba(255,255,255,0.15)'}
              strokeWidth={isActive ? 1.5 : 1}
              style={{ transition: 'all 0.3s', filter: isActive ? `drop-shadow(0 0 6px ${TEAL})` : 'none' }} />
            <text x={x + bw / 2} y={44} textAnchor="middle" dominantBaseline="middle"
              fontSize={13} fontWeight={600} fill={isActive ? TEAL : TEXT}
              fontFamily="Inter,monospace" style={{ transition: 'fill 0.3s' }}>{v}</text>
            <text x={x + bw / 2} y={74} textAnchor="middle" fontSize={12} fill={TEXT} fontFamily="Inter,monospace">{i}</text>
          </g>
        );
      })}
      {/* cursor */}
      <polygon
        points={`${startX + active * (bw + gap) + bw / 2 - 5},${26} ${startX + active * (bw + gap) + bw / 2 + 5},${26} ${startX + active * (bw + gap) + bw / 2},${30}`}
        fill={TEAL} style={{ transition: 'all 0.3s ease', filter: `drop-shadow(0 0 4px ${TEAL})` }} />
    </svg>
  );
}

// ── 2. Linked List ────────────────────────────────────────────────────────────
function LinkedListViz() {
  const vals = [12, 7, 3, 19, 5];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % vals.length), 700);
    return () => clearInterval(id);
  }, []);
  const W = 280, r = 18, gap = 22, total = vals.length * (r * 2) + (vals.length - 1) * gap;
  const startX = (W - total) / 2 + r;
  const cy = 52;
  return (
    <svg width={W} height={120}>
      <text x={W / 2} y={14} textAnchor="middle" fontSize={12} fill={LABEL} fontFamily="Inter,monospace">Linked List — Traversal</text>
      {vals.map((v, i) => {
        const cx = startX + i * (r * 2 + gap);
        const isActive = i === active;
        return (
          <g key={i}>
            {i < vals.length - 1 && (
              <Arrow x1={cx + r} y1={cy} x2={cx + r * 2 + gap - r} y2={cy} active={isActive} color={TEAL} />
            )}
            <Node cx={cx} cy={cy} r={r} active={isActive} label={v} />
          </g>
        );
      })}
      {/* NULL */}
      <text x={startX + (vals.length - 1) * (r * 2 + gap) + r + 8} y={cy + 4}
        fontSize={12} fill={TEXT} fontFamily="Inter,monospace">NULL</text>
    </svg>
  );
}

// ── 3. Stack ──────────────────────────────────────────────────────────────────
function StackViz() {
  const maxSize = 4;
  const [stack, setStack] = useState([1, 2, 3]);
  const [phase, setPhase] = useState('push'); // push | pop
  useEffect(() => {
    const id = setInterval(() => {
      setStack(s => {
        if (phase === 'push' && s.length < maxSize) {
          const next = [...s, s.length + 1];
          if (next.length === maxSize) setPhase('pop');
          return next;
        } else {
          const next = s.slice(0, -1);
          if (next.length === 0) setPhase('push');
          return next;
        }
      });
    }, 700);
    return () => clearInterval(id);
  }, [phase]);
  const W = 280, bw = 80, bh = 22, gap = 4;
  const baseY = 118, cx = W / 2;
  return (
    <svg width={W} height={140}>
      <text x={cx} y={14} textAnchor="middle" fontSize={12} fill={LABEL} fontFamily="Inter,monospace">Stack — Push / Pop</text>
      {/* base line */}
      <line x1={cx - 46} y1={baseY + 2} x2={cx + 46} y2={baseY + 2} stroke={LINE} strokeWidth={1} />
      {stack.map((v, i) => {
        const y = baseY - i * (bh + gap) - bh;
        const isTop = i === stack.length - 1;
        return (
          <g key={i}>
            <rect x={cx - bw / 2} y={y} width={bw} height={bh} rx={4}
              fill={isTop ? INDIGO + '22' : DIM}
              stroke={isTop ? INDIGO : 'rgba(255,255,255,0.15)'}
              strokeWidth={isTop ? 1.5 : 1}
              style={{ filter: isTop ? `drop-shadow(0 0 6px ${INDIGO})` : 'none' }} />
            <text x={cx} y={y + bh / 2 + 1} textAnchor="middle" dominantBaseline="middle"
              fontSize={13} fontWeight={600} fill={isTop ? INDIGO : TEXT} fontFamily="Inter,monospace">{v}</text>
          </g>
        );
      })}
      {/* TOP label */}
      {stack.length > 0 && (
        <text x={cx + bw / 2 + 6} y={baseY - (stack.length - 1) * (bh + gap) - bh / 2 + 1}
          fontSize={11} fill={INDIGO} fontFamily="Inter,monospace">← TOP</text>
      )}
    </svg>
  );
}

// ── 4. Queue ──────────────────────────────────────────────────────────────────
function QueueViz() {
  const maxSize = 4;
  const [queue, setQueue] = useState([10, 20, 30]);
  const [counter, setCounter] = useState(4);
  useEffect(() => {
    const id = setInterval(() => {
      setQueue(q => {
        if (q.length < maxSize) {
          setCounter(c => c + 10);
          return [...q, counter];
        } else {
          return q.slice(1);
        }
      });
    }, 700);
    return () => clearInterval(id);
  }, [counter]);
  const W = 280, bw = 42, bh = 28, gap = 5;
  const cy = 54, total = maxSize * (bw + gap) - gap;
  const startX = (W - total) / 2;
  return (
    <svg width={W} height={120}>
      <text x={W / 2} y={12} textAnchor="middle" fontSize={12} fill={LABEL} fontFamily="Inter,monospace">Queue — FIFO</text>
      {/* slots */}
      {Array.from({ length: maxSize }).map((_, i) => (
        <rect key={i} x={startX + i * (bw + gap)} y={cy - bh / 2}
          width={bw} height={bh} rx={4}
          fill="none" stroke={LINE} strokeWidth={1} strokeDasharray="3,3" />
      ))}
      {queue.map((v, i) => {
        const isFront = i === 0, isBack = i === queue.length - 1;
        const color = isFront ? TEAL : isBack ? INDIGO : 'rgba(255,255,255,0.25)';
        return (
          <g key={v}>
            <rect x={startX + i * (bw + gap)} y={cy - bh / 2}
              width={bw} height={bh} rx={4}
              fill={color + '22'} stroke={color} strokeWidth={1.5}
              style={{ filter: (isFront || isBack) ? `drop-shadow(0 0 5px ${color})` : 'none' }} />
            <text x={startX + i * (bw + gap) + bw / 2} y={cy + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={13} fontWeight={600} fill={color} fontFamily="Inter,monospace">{v}</text>
          </g>
        );
      })}
      <text x={startX - 2} y={cy + bh / 2 + 10} fontSize={12} fill={TEAL} fontFamily="Inter,monospace" textAnchor="middle">OUT</text>
      <text x={startX + (maxSize - 1) * (bw + gap) + bw + 2} y={cy + bh / 2 + 10} fontSize={12} fill={INDIGO} fontFamily="Inter,monospace" textAnchor="middle">IN</text>
    </svg>
  );
}

// ── 5. Binary Tree (BFS) ──────────────────────────────────────────────────────
function BinaryTreeViz() {
  // nodes: id, val, parent, x, y
  const nodes = [
    { id: 0, val: 8,  x: 140, y: 30 },
    { id: 1, val: 4,  x: 84,  y: 58 },
    { id: 2, val: 12, x: 196, y: 58 },
    { id: 3, val: 2,  x: 52,  y: 86 },
    { id: 4, val: 6,  x: 116, y: 86 },
    { id: 5, val: 10, x: 164, y: 86 },
    { id: 6, val: 14, x: 228, y: 86 },
  ];
  const edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];
  const bfsOrder = [0,1,2,3,4,5,6];
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % bfsOrder.length), 600);
    return () => clearInterval(id);
  }, []);
  const activeId = bfsOrder[step];
  const visitedIds = new Set(bfsOrder.slice(0, step + 1));
  return (
    <svg width={280} height={130}>
      <text x={140} y={10} textAnchor="middle" fontSize={12} fill={LABEL} fontFamily="Inter,monospace">Binary Tree — BFS</text>
      {edges.map(([a, b], i) => {
        const na = nodes[a], nb = nodes[b];
        const edgeActive = visitedIds.has(a) && visitedIds.has(b);
        return <Edge key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} active={edgeActive} color={TEAL} />;
      })}
      {nodes.map(n => (
        <Node key={n.id} cx={n.x} cy={n.y} r={15}
          active={n.id === activeId}
          color={visitedIds.has(n.id) ? TEAL : undefined}
          label={n.val} />
      ))}
    </svg>
  );
}

// ── 6. Graph (BFS wave) ───────────────────────────────────────────────────────
function GraphViz() {
  const nodes = [
    { id: 0, x: 140, y: 48, label: 'A' },
    { id: 1, x: 77,  y: 30, label: 'B' },
    { id: 2, x: 203, y: 30, label: 'C' },
    { id: 3, x: 42,  y: 70, label: 'D' },
    { id: 4, x: 112, y: 80, label: 'E' },
    { id: 5, x: 168, y: 80, label: 'F' },
    { id: 6, x: 238, y: 70, label: 'G' },
  ];
  const edges = [[0,1],[0,2],[0,4],[0,5],[1,3],[2,6],[4,5],[1,4],[2,5]];
  // BFS from node 0
  const bfsLevels = [[0],[1,2],[3,4,5,6]];
  const bfsFlat = bfsLevels.flat();
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % (bfsFlat.length + 2)), 550);
    return () => clearInterval(id);
  }, []);
  const visitedIds = new Set(bfsFlat.slice(0, step));
  const activeId = bfsFlat[step - 1] ?? -1;
  return (
    <svg width={280} height={130}>
      <text x={140} y={10} textAnchor="middle" fontSize={12} fill={LABEL} fontFamily="Inter,monospace">Graph — BFS Wave</text>
      {edges.map(([a, b], i) => {
        const na = nodes[a], nb = nodes[b];
        const active = visitedIds.has(a) && visitedIds.has(b);
        return <Edge key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} active={active} color={INDIGO} />;
      })}
      {nodes.map(n => (
        <Node key={n.id} cx={n.x} cy={n.y} r={15}
          active={n.id === activeId}
          color={visitedIds.has(n.id) ? INDIGO : undefined}
          label={n.label} />
      ))}
    </svg>
  );
}

// ── Main panel ────────────────────────────────────────────────────────────────
export default function DSAVisualizer() {
  const panels = [
    { title: null, component: <ArrayViz /> },
    { title: null, component: <LinkedListViz /> },
    { title: null, component: <StackViz /> },
    { title: null, component: <QueueViz /> },
    { title: null, component: <BinaryTreeViz /> },
    { title: null, component: <GraphViz /> },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      width: '100%',
      maxWidth: 700,
    }}>
      {panels.map((p, i) => (
        <div key={i} style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16,
          padding: '18px 14px 14px',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 160,
        }}>
          {p.component}
        </div>
      ))}
    </div>
  );
}

