import { seededRandom } from "./rng";
import {
  TITLE_TEMPLATES,
  META_DESCRIPTION_TEMPLATES,
  H1_TEMPLATES,
  INTRO_PARAGRAPHS,
  PROCESS_PARAGRAPHS,
  CONDITION_PARAGRAPHS,
  LOCAL_ANGLE_PARAGRAPHS,
  CTA_PARAGRAPHS,
  WHY_US_BULLETS,
  FAQ_POOL,
  GENERIC_LOCAL_HOOKS,
  fill,
  type TokenMap,
} from "./content-tokens";
import { SITE } from "./site";

export type CityPageContent = {
  title: string;
  metaDescription: string;
  h1: string;
  tokens: TokenMap;
  intro: string;
  process: string;
  condition: string;
  localAngle: string;
  cta: string;
  whyUs: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  sectionOrder: SectionKey[];
};

export type SectionKey = "process" | "condition" | "whyUs" | "localAngle" | "faqs" | "cta";

const ALL_SECTIONS: SectionKey[] = ["process", "condition", "whyUs", "localAngle", "faqs", "cta"];

export function buildCityContent(opts: {
  city: string;
  state: string;
  nearestYardCity?: string;
  nearestYardState?: string;
  nearestYardMiles?: number;
}): CityPageContent {
  const { city, state } = opts;
  const rng = seededRandom(`${city}-${state}`.toLowerCase());

  const nearestYard = opts.nearestYardCity
    ? `${opts.nearestYardCity}, ${opts.nearestYardState ?? state}`
    : `our nearest Speedy's yard`;
  const miles = opts.nearestYardMiles ? String(Math.round(opts.nearestYardMiles)) : "a short drive";
  const localHook = rng.pick(GENERIC_LOCAL_HOOKS);

  const tokens: TokenMap = {
    CITY: city,
    STATE: state,
    PHONE: SITE.phone,
    EMAIL: SITE.email,
    NEAREST_YARD: nearestYard,
    MILES: miles,
    LOCAL_HOOK: fill(localHook, { CITY: city, STATE: state }),
  };

  const apply = (tpl: string) => fill(tpl, tokens);

  const title = apply(rng.pick(TITLE_TEMPLATES));
  const metaDescription = apply(rng.pick(META_DESCRIPTION_TEMPLATES));
  const h1 = apply(rng.pick(H1_TEMPLATES));

  const intro = apply(rng.pick(INTRO_PARAGRAPHS));
  const process = apply(rng.pick(PROCESS_PARAGRAPHS));
  const condition = apply(rng.pick(CONDITION_PARAGRAPHS));
  const localAngle = apply(rng.pick(LOCAL_ANGLE_PARAGRAPHS));
  const cta = apply(rng.pick(CTA_PARAGRAPHS));

  const whyUs = rng
    .sample(WHY_US_BULLETS, 4)
    .map((b) => ({ title: apply(b.title), body: apply(b.body) }));

  const faqs = rng
    .sample(FAQ_POOL, 4)
    .map((f) => ({ q: apply(f.q), a: apply(f.a) }));

  const middle = rng.shuffle(ALL_SECTIONS.filter((s) => s !== "cta"));
  const sectionOrder: SectionKey[] = [...middle, "cta"];

  return {
    title, metaDescription, h1, tokens,
    intro, process, condition, localAngle, cta,
    whyUs, faqs, sectionOrder,
  };
}
