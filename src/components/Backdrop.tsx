import { useMemo } from "react";
import type { CSSProperties } from "react";

export function Bubbles({ count = 16 }: { count?: number }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const rnd = (a: number, b: number) => a + ((i * 7919) % 1000) / 1000 * (b - a);
        const size = rnd(4, 15);
        return {
          left: `${rnd(2, 98)}%`,
          width: size,
          height: size,
          animationDuration: `${rnd(11, 26)}s`,
          animationDelay: `${-rnd(0, 26)}s`,
          ["--dx" as string]: `${rnd(-7, 7)}vw`,
          ["--bo" as string]: rnd(0.18, 0.5),
        } as CSSProperties;
      }),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {bubbles.map((style, i) => (
        <span key={i} className="bubble" style={style} />
      ))}
    </div>
  );
}

export function Glows() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div
        className="absolute -top-40 left-[8%] h-[480px] w-[620px] rounded-full opacity-25 blur-[130px]"
        style={{ background: "radial-gradient(closest-side, #0e7490, transparent)" }}
      />
      <div
        className="absolute top-[30%] right-[-10%] h-[520px] w-[560px] rounded-full opacity-20 blur-[140px]"
        style={{ background: "radial-gradient(closest-side, #6d28d9, transparent)" }}
      />
      <div
        className="absolute bottom-[-15%] left-[20%] h-[420px] w-[560px] rounded-full opacity-[0.13] blur-[120px]"
        style={{ background: "radial-gradient(closest-side, #b45309, transparent)" }}
      />
    </div>
  );
}
