import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MousePointerClick, X } from "lucide-react";
import { BRANCHES, type Branch } from "../data/mindmap";
import { BranchHeader, ItemList } from "./BranchContent";
import { Formula } from "./Formula";

type Pt = { x: number; y: number };

const toRad = (deg: number) => (deg * Math.PI) / 180;

function connector(from: Pt, to: Pt, bend: number) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * len * bend;
  const cy = my + (dx / len) * len * bend;
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
}

export function RadialMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const activeIdx = BRANCHES.findIndex((b) => b.id === activeId);
  const active: Branch | null = activeIdx >= 0 ? BRANCHES[activeIdx] : null;

  const { w, h } = size;
  const cx = w / 2;
  const cy = h / 2 - h * 0.045;
  const R = Math.min(w, h) * 0.3;

  const nodes = BRANCHES.map((b, i) => {
    const a = toRad(-90 + i * 60);
    const p = { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
    const lp = {
      x: cx + (R + 58) * Math.cos(a),
      y: cy + (R + 58) * Math.sin(a),
    };
    const d = connector({ x: cx, y: cy }, p, i % 2 === 0 ? 0.16 : -0.16);
    return { b, i, p, lp, d };
  });

  const cycle = (dir: 1 | -1) => {
    const next =
      activeIdx < 0
        ? dir === 1
          ? 0
          : BRANCHES.length - 1
        : (activeIdx + dir + BRANCHES.length) % BRANCHES.length;
    setActiveId(BRANCHES[next].id);
  };

  return (
    <div ref={wrapRef} className="relative h-full w-full select-none">
      {w > 0 && (
        <>
          {/* ---------- connectors ---------- */}
          <svg className="absolute inset-0 h-full w-full" style={{ overflow: "visible" }}>
            {/* orbit ring */}
            <motion.circle
              cx={cx}
              cy={cy}
              r={R}
              fill="none"
              stroke="rgba(148,190,233,0.10)"
              strokeWidth="1"
              strokeDasharray="1 7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
            />
            <motion.circle
              cx={cx}
              cy={cy}
              r={R * 0.62}
              fill="none"
              stroke="rgba(148,190,233,0.05)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 1 }}
            />
            {nodes.map(({ b, i, d }) => {
              const isActive = activeId === b.id;
              return (
                <g key={b.id}>
                  {isActive && (
                    <path
                      d={d}
                      fill="none"
                      stroke={b.color}
                      strokeWidth="7"
                      strokeLinecap="round"
                      opacity="0.28"
                      style={{ filter: "blur(7px)" }}
                    />
                  )}
                  <motion.path
                    d={d}
                    fill="none"
                    stroke={b.color}
                    strokeOpacity={activeId && !isActive ? 0.14 : isActive ? 0.95 : 0.4}
                    strokeWidth={isActive ? 2.2 : 1.3}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.35 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {isActive && (
                    <circle r="3.2" fill={b.color}>
                      <animateMotion dur="2.2s" repeatCount="indefinite" path={d} />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* ---------- center node ---------- */}
          <motion.div
            className="absolute z-10"
            style={{ left: cx, top: cy, transform: "translate(-50%, -50%)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.1 }}
          >
            <div className="relative grid h-40 w-40 place-items-center rounded-full glass xl:h-44 xl:w-44">
              <div
                className="absolute inset-0 -z-10 rounded-full"
                style={{
                  boxShadow:
                    "0 0 70px rgba(45,212,191,0.22), inset 0 0 34px rgba(45,212,191,0.10)",
                }}
              />
              {[0, 1].map((k) => (
                <motion.span
                  key={k}
                  className="absolute inset-0 rounded-full border border-teal-300/25"
                  animate={{ scale: [1, 1.45], opacity: [0.5, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, delay: k * 1.6, ease: "easeOut" }}
                />
              ))}
              <div className="text-center">
                <p className="font-display text-[22px] font-bold tracking-tight text-white xl:text-2xl">
                  <Formula s="NaHCO3" />
                </p>
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-300/80">
                  питьевая сода
                </p>
              </div>
            </div>
          </motion.div>

          {/* ---------- branch nodes ---------- */}
          {nodes.map(({ b, i, p, lp }) => {
            const isActive = activeId === b.id;
            const dimmed = activeId !== null && !isActive;
            const Icon = b.icon;
            return (
              <div key={b.id}>
                <motion.div
                  className="absolute z-10"
                  style={{ left: p.x, top: p.y }}
                  initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
                  animate={{ scale: 1, opacity: dimmed ? 0.22 : 1, x: "-50%", y: "-50%" }}
                  transition={{
                    scale: { type: "spring", stiffness: 160, damping: 15, delay: 0.5 + i * 0.12 },
                    opacity: { duration: 0.35, delay: dimmed ? 0 : 0.5 + i * 0.12 },
                  }}
                >
                  <motion.button
                    onClick={() => setActiveId(isActive ? null : b.id)}
                    className="relative grid h-16 w-16 cursor-pointer place-items-center rounded-full border-2 outline-none transition-shadow xl:h-[72px] xl:w-[72px]"
                    style={{
                      borderColor: b.color,
                      background: `radial-gradient(circle at 35% 30%, ${b.color}${isActive ? "40" : "22"}, rgba(10,15,22,0.9) 72%)`,
                      boxShadow: isActive
                        ? `0 0 42px ${b.color}59, inset 0 0 18px ${b.color}33`
                        : `0 0 18px ${b.color}26`,
                      color: b.color,
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.93 }}
                    aria-label={b.title}
                  >
                    {isActive && (
                      <motion.span
                        className="absolute inset-[-7px] rounded-full border"
                        style={{ borderColor: `${b.color}66` }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                      />
                    )}
                    <Icon size={24} strokeWidth={1.9} />
                  </motion.button>
                </motion.div>

                <motion.span
                  className="pointer-events-none absolute z-10 whitespace-nowrap rounded-full border border-white/10 bg-[#0a1018]/85 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em]"
                  style={{ left: lp.x, top: lp.y, color: b.color }}
                  initial={{ opacity: 0, x: "-50%", y: "-50%" }}
                  animate={{ opacity: dimmed ? 0 : 1, x: "-50%", y: "-50%" }}
                  transition={{
                    duration: 0.45,
                    delay: dimmed ? 0 : 0.75 + i * 0.12,
                  }}
                >
                  {b.title}
                </motion.span>
              </div>
            );
          })}

          {/* ---------- dock panel / hint ---------- */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-1">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  className="glass pointer-events-auto w-full max-w-3xl rounded-2xl px-5 py-4"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 16, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 210, damping: 24 }}
                >
                  <div className="mb-3.5 flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <BranchHeader branch={active} />
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        onClick={() => cycle(-1)}
                        className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-white/10 text-mist transition-colors hover:bg-white/5 hover:text-white"
                        aria-label="Предыдущая ветвь"
                      >
                        <ChevronLeft size={15} />
                      </button>
                      <button
                        onClick={() => cycle(1)}
                        className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-white/10 text-mist transition-colors hover:bg-white/5 hover:text-white"
                        aria-label="Следующая ветвь"
                      >
                        <ChevronRight size={15} />
                      </button>
                      <button
                        onClick={() => setActiveId(null)}
                        className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-white/10 text-mist transition-colors hover:bg-white/5 hover:text-white"
                        aria-label="Закрыть"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>
                  <ItemList branch={active} compact />
                </motion.div>
              ) : (
                <motion.div
                  key="hint"
                  className="pointer-events-none flex items-center gap-2 rounded-full border border-white/10 bg-[#0a1018]/80 px-4 py-2 text-[11.5px] font-semibold tracking-wide text-mist"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: 1.4 }}
                >
                  <MousePointerClick size={14} className="text-teal-300" />
                  Нажмите на узел, чтобы раскрыть ветвь
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}
