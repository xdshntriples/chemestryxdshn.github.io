import type { Branch } from "../data/mindmap";
import { Formula } from "./Formula";
import { cn } from "../utils/cn";

export function ItemList({
  branch,
  compact = false,
}: {
  branch: Branch;
  compact?: boolean;
}) {
  return (
    <ul className={cn("grid gap-x-7", compact ? "gap-y-3 sm:grid-cols-2" : "gap-y-3.5")}>
      {branch.items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span
            className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: branch.color, boxShadow: `0 0 8px ${branch.color}66` }}
          />
          <div className="min-w-0">
            <p className="text-[13px] leading-snug text-paper/85">{item.text}</p>
            {item.eq && (
              <p
                className="eq mt-1.5 inline-block rounded-md border border-white/[0.07] bg-white/[0.04] px-2 py-1 text-[11.5px] tracking-wide"
                style={{ color: branch.color }}
              >
                <Formula s={item.eq} />
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function BranchHeader({ branch, index }: { branch: Branch; index?: number }) {
  const Icon = branch.icon;
  return (
    <div className="flex items-center gap-3">
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
        style={{
          background: `${branch.color}1c`,
          border: `1px solid ${branch.color}45`,
          boxShadow: `0 0 18px ${branch.color}30`,
          color: branch.color,
        }}
      >
        <Icon size={18} strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <h3 className="truncate font-display text-[13px] font-semibold tracking-wide text-white">
          {branch.title}
        </h3>
        <p className="truncate text-[11.5px] text-mist">{branch.subtitle}</p>
      </div>
      {index !== undefined && (
        <span className="ml-auto select-none font-display text-2xl font-bold text-white/[0.06]">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}
