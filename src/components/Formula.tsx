import type { ReactNode } from "react";

/**
 * Renders a plain-text chemical formula with typographic sub/superscripts.
 *  - digits right after a letter or ")" become subscripts: "NaHCO3" → NaHCO₃
 *  - "^+ / ^-" become superscripts: "HCO3^-" → HCO₃⁻
 *  - leading coefficients and decimals ("2NaHCO3", "8,3") stay on the baseline
 */
export function Formula({ s, className }: { s: string; className?: string }) {
  const out: ReactNode[] = [];
  let buf = "";
  let key = 0;

  const flush = () => {
    if (buf) {
      out.push(<span key={key++}>{buf}</span>);
      buf = "";
    }
  };

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    if (ch === "^") {
      let j = i + 1;
      let sup = "";
      while (j < s.length && /[+\-−0-9]/.test(s[j])) {
        sup += s[j];
        j++;
      }
      flush();
      out.push(
        <sup key={key++} className="text-[0.62em]">
          {sup}
        </sup>,
      );
      i = j - 1;
      continue;
    }

    if (/\d/.test(ch)) {
      let j = i;
      let num = "";
      while (j < s.length && /[\d.,]/.test(s[j])) {
        num += s[j];
        j++;
      }
      const prev = s[i - 1];
      const isSub = !!prev && /[A-Za-zА-Яа-яё)\]]/.test(prev);
      flush();
      out.push(
        isSub ? (
          <sub key={key++} className="text-[0.65em]">
            {num}
          </sub>
        ) : (
          <span key={key++}>{num}</span>
        ),
      );
      i = j - 1;
      continue;
    }

    buf += ch;
  }
  flush();

  return <span className={className}>{out}</span>;
}
