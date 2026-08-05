import type { Tone } from '~/components/ui/Band.astro';

/**
 * Per-product band rhythm.
 *
 * Every product page renders the same sections from the same components; what
 * makes them scan as different pages is the sequence of band tones they are
 * dropped into. A page that goes white → orange → white → near-black does not
 * look like one that opens on full-bleed colour, even though the markup is
 * identical.
 *
 * Assigned by the product's position in the family rather than stored in the
 * YAML: the point is that adjacent products differ, which is a property of the
 * set, not of any one product. A sixth product picks up the first rhythm again,
 * by which point it is five pages away from its twin.
 */
export interface Rhythm {
  hero: Tone;
  features: Tone;
  how: Tone;
  integrations: Tone;
  pricing: Tone;
  faq: Tone;
  family: Tone;
  cta: Tone;
  /** Whether the hero carries the mosaic slab beneath it. */
  heroMosaic: boolean;
}

const RHYTHMS: Rhythm[] = [
  // Opens quiet, warms through the middle, closes dark.
  {
    hero: 'page',
    features: 'tint',
    how: 'page',
    integrations: 'paper',
    pricing: 'page',
    faq: 'paper',
    family: 'page',
    cta: 'ink',
    heroMosaic: true,
  },
  // Opens on near-black — the most abrupt of the five.
  {
    hero: 'ink',
    features: 'page',
    how: 'accent',
    integrations: 'page',
    pricing: 'paper',
    faq: 'page',
    family: 'paper',
    cta: 'accent',
    heroMosaic: false,
  },
  // Saturated block early, near-black late.
  {
    hero: 'page',
    features: 'accent',
    how: 'page',
    integrations: 'ink',
    pricing: 'page',
    faq: 'paper',
    family: 'page',
    cta: 'ink',
    heroMosaic: true,
  },
  // Muted open, single dark statement in the middle.
  {
    hero: 'paper',
    features: 'page',
    how: 'ink',
    integrations: 'page',
    pricing: 'page',
    faq: 'tint',
    family: 'paper',
    cta: 'accent',
    heroMosaic: false,
  },
  // Full-bleed colour from the first pixel.
  {
    hero: 'accent',
    features: 'page',
    how: 'paper',
    integrations: 'page',
    pricing: 'page',
    faq: 'page',
    family: 'paper',
    cta: 'ink',
    heroMosaic: false,
  },
];

export const rhythmFor = (index: number): Rhythm =>
  RHYTHMS[index % RHYTHMS.length]!;
