import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  FlaskConical,
  Map as MapIcon,
  NotebookText,
  Sparkles,
} from "lucide-react";
import { BRANCHES, STATS } from "./data/mindmap";
import { Formula } from "./components/Formula";
import { RadialMap } from "./components/RadialMap";
import { BranchHeader, ItemList } from "./components/BranchContent";
import { Bubbles, Glows } from "./components/Backdrop";
import { cn } from "./utils/cn";

/* ------------------------------ header ------------------------------ */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled ? "border-b border-white/[0.07] bg-[#070a10]/80 backdrop-blur-md" : "",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-teal-300/30 bg-teal-400/10 text-teal-300 shadow-[0_0_16px_rgba(45,212,191,0.25)]">
            <FlaskConical size={17} />
          </span>
          <span className="font-display text-[13px] font-bold tracking-wide text-white">
            NaHCO<sub>3</sub>
            <span className="ml-2 hidden text-[10px] font-medium uppercase tracking-[0.2em] text-mist sm:inline">
              интерактивный конспект
            </span>
          </span>
        </a>
        <nav className="flex items-center gap-1 text-[12.5px] font-semibold text-mist">
          <a
            href="#map"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 transition-colors hover:bg-white/5 hover:text-white"
          >
            <MapIcon size={14} /> Карта
          </a>
          <a
            href="#cards"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 transition-colors hover:bg-white/5 hover:text-white"
          >
            <NotebookText size={14} /> Конспект
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------- hero ------------------------------- */

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
};

function Hero() {
  return (
    <section id="top" className="relative z-10 overflow-hidden pt-28 pb-14 lg:pt-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        {/* left */}
        <div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-400/[0.07] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-teal-300"
          >
            <Sparkles size={12} />
            Карта вещества · кислотные соли
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance font-display text-[clamp(1.8rem,4.6vw,3.4rem)] font-black leading-[1.12] text-white"
          >
            Гидрокарбонат натрия —{" "}
            <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
              сода, которая умеет всё
            </span>
          </motion.h1>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-5 flex flex-wrap items-center gap-2 text-[11.5px] font-semibold text-mist"
          >
            {["Питьевая сода", "Бикарбонат натрия", "Двуглекислая сода"].map((s) => (
              <span key={s} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
                {s}
              </span>
            ))}
            <span className="eq rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] text-white/80">
              <Formula s="NaHCO3" />
            </span>
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-mist"
          >
            Кислая соль угольной кислоты и натрия. Её получают методом Сольве,
            она шипит в лимонаде, гасит изжогу, тушит пожары и держит
            кислотно-щелочной баланс нашей крови. Ниже — вся химия вещества
            в одной интерактивной карте.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#0a0f17] px-4 py-3.5">
                <p className="font-display text-[15px] font-bold text-white">{s.value}</p>
                <p className="mt-0.5 text-[10.5px] leading-tight text-mist">{s.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.38 }} className="mt-8">
            <a
              href="#map"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 px-6 py-3 text-[13px] font-bold text-[#04211d] transition-transform hover:scale-[1.03] active:scale-95"
            >
              Открыть карту вещества
              <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-teal-400/25 via-transparent to-violet-500/20 blur-xl" />
          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10">
            <img
              src="images/crystals.jpg"
              alt="Кристаллы питьевой соды крупным планом"
              className="aspect-[4/3.4] w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070a10]/85 via-transparent to-[#070a10]/20" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-300">
                кристаллическая решётка
              </p>
              <p className="eq mt-1 text-[13px] text-white/85">
                <Formula s="Na^+ + HCO3^- → NaHCO3" />
              </p>
            </div>
          </div>

          {[
            { t: "нетоксичен", c: "left-[-6%] top-8", d: "0s" },
            { t: "pH ≈ 8,3", c: "right-[-4%] top-1/3", d: "1.6s" },
            { t: "t° разл. > 60 °C", c: "bottom-16 left-[-8%]", d: "3s" },
          ].map((chip) => (
            <span
              key={chip.t}
              className={cn(
                "glass absolute hidden rounded-full px-3.5 py-1.5 text-[11px] font-bold text-white/90 shadow-lg animate-float sm:block",
                chip.c,
              )}
              style={{ animationDelay: chip.d }}
            >
              {chip.t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------- map section --------------------------- */

function MapSection() {
  return (
    <section id="map" className="relative z-10 scroll-mt-20 py-10">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-2 flex items-end justify-between"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-teal-300">
              6 ветвей · 26 фактов
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.3rem,2.6vw,2rem)] font-bold text-white">
              Интерактивная карта
            </h2>
          </div>
          <p className="hidden max-w-[240px] text-right text-[12px] leading-snug text-mist lg:block">
            Кликайте по узлам — ветви раскрываются с формулами и реакциями
          </p>
        </motion.div>

        {/* desktop radial map */}
        <div className="relative hidden h-[min(86vh,780px)] min-h-[640px] lg:block">
          <RadialMap />
        </div>

        {/* mobile hint */}
        <p className="glass mt-4 rounded-xl px-4 py-3 text-center text-[12px] text-mist lg:hidden">
          Радиальная карта доступна на широком экране — весь конспект собран ниже
        </p>
      </div>
    </section>
  );
}

/* --------------------------- cards section -------------------------- */

function CardsSection() {
  return (
    <section id="cards" className="relative z-10 scroll-mt-20 py-16">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-teal-300">
            Краткий конспект
          </p>
          <h2 className="mt-2 font-display text-[clamp(1.3rem,2.6vw,2rem)] font-bold text-white">
            Вся сода — по полочкам
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {BRANCHES.map((b, i) => (
            <motion.article
              key={b.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group glass relative overflow-hidden rounded-2xl p-5 transition-colors duration-300 hover:border-white/20"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-[0.09] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.18]"
                style={{ background: b.color }}
              />
              <BranchHeader branch={b} index={i} />
              <div className="mt-4 border-t border-white/[0.06] pt-4">
                <ItemList branch={b} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- footer ------------------------------ */

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.07] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-[12px] text-mist sm:flex-row">
        <p className="flex items-center gap-2">
          <FlaskConical size={13} className="text-teal-300" />
          Гидрокарбонат натрия · интерактивный конспект
        </p>
        <p className="eq text-[12px] text-white/60">
          <Formula s="2NaHCO3 → знания + CO2 + H2O" />
        </p>
        <p>Справочный материал по химии</p>
      </div>
    </footer>
  );
}

/* -------------------------------- app -------------------------------- */

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Glows />
      <Bubbles />
      <div className="grain" />
      <Header />
      <main>
        <Hero />
        <MapSection />
        <CardsSection />
      </main>
      <Footer />
    </div>
  );
}
