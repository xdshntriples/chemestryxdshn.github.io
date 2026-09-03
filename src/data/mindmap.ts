import {
  Snowflake,
  Factory,
  FlaskConical,
  Stethoscope,
  Home,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export interface MapItem {
  text: string;
  eq?: string;
}

export interface Branch {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  items: MapItem[];
}

export const BRANCHES: Branch[] = [
  {
    id: "phys",
    title: "Физические свойства",
    subtitle: "Внешний вид, растворимость, константы",
    icon: Snowflake,
    color: "#38bdf8",
    items: [
      { text: "Белый кристаллический порошок, без запаха" },
      { text: "Вкус солоновато-мыльный" },
      { text: "Растворимость 96 г/л при 20 °C" },
      { text: "Слабощелочной раствор, pH ≈ 8,3" },
      { text: "M = 84,01 г/моль · ρ = 2,16 г/см³ · нетоксичен" },
    ],
  },
  {
    id: "synth",
    title: "Получение",
    subtitle: "Промышленность и лаборатория",
    icon: Factory,
    color: "#fbbf24",
    items: [
      {
        text: "Промышленный способ — метод Сольве",
        eq: "NaCl + NH3 + CO2 + H2O → NaHCO3 + NH4Cl",
      },
      {
        text: "Карбонатизация соды",
        eq: "Na2CO3 + CO2 + H2O → 2NaHCO3",
      },
      {
        text: "Из щёлочи избытком CO₂",
        eq: "NaOH + CO2 → NaHCO3",
      },
    ],
  },
  {
    id: "chem",
    title: "Химические свойства",
    subtitle: "С чем и как реагирует",
    icon: FlaskConical,
    color: "#a78bfa",
    items: [
      {
        text: "Разлагается при нагревании (> 60 °C)",
        eq: "2NaHCO3 → Na2CO3 + CO2 + H2O",
      },
      {
        text: "С кислотами — бурное выделение газа",
        eq: "NaHCO3 + HCl → NaCl + H2O + CO2",
      },
      {
        text: "Со щелочами — переходит в карбонат",
        eq: "NaHCO3 + NaOH → Na2CO3 + H2O",
      },
      { text: "Кислая соль: реагирует и с кислотами, и со щелочами" },
    ],
  },
  {
    id: "med",
    title: "В медицине",
    subtitle: "Где помогает",
    icon: Stethoscope,
    color: "#fb7185",
    items: [
      { text: "Антацид — быстро снимает изжогу" },
      { text: "Полоскания при ангине и стоматите" },
      { text: "Ингаляции — разжижают мокроту" },
      { text: "Раствор в/в — коррекция ацидоза" },
      { text: "Мягкий абразив в зубных пастах" },
    ],
  },
  {
    id: "home",
    title: "Быт и промышленность",
    subtitle: "Кухня, уборка, производство",
    icon: Home,
    color: "#34d399",
    items: [
      { text: "Разрыхлитель теста — добавка E500" },
      { text: "Чистка поверхностей без царапин" },
      { text: "Дезодорант — поглощает запахи" },
      { text: "Наполнитель порошковых огнетушителей" },
      { text: "Производство пенопластов и красителей" },
    ],
  },
  {
    id: "bonus",
    title: "Бонус",
    subtitle: "Сода внутри и вокруг нас",
    icon: Lightbulb,
    color: "#facc15",
    items: [
      { text: "Бикарбонатный буфер — главный буфер крови" },
      { text: "Удерживает pH крови в узких рамках: 7,36–7,42", eq: "CO2 + H2O ⇌ H^+ + HCO3^-" },
      { text: "CO₂ выводится лёгкими — так дышит наш pH" },
      { text: "В природе — минералы трона и нахколит" },
    ],
  },
];

export const STATS = [
  { value: "84,01", label: "г/моль · молярная масса" },
  { value: "144-55-8", label: "номер CAS" },
  { value: "≈ 8,3", label: "pH раствора" },
  { value: "E500", label: "пищевая добавка" },
];
