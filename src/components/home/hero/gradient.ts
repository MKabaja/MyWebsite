// Dark teal → umber base shared by the hero block and the about gutter below it, so the two meet
// without a seam; each adds its own cyan / accent glows on top.
const BASE = "linear-gradient(100deg, #0c4a54 0%, #14262e 55%, #2b1a12 100%)";

export const HERO_GRADIENT = [
  "radial-gradient(120% 140% at 0% 100%, #00d4cc 0%, rgb(0 212 204 / 0) 60%)",
  "radial-gradient(90% 120% at 100% 0%, #ff8c32 0%, rgb(255 107 0 / 0.35) 35%, rgb(255 107 0 / 0) 70%)",
  BASE,
].join(", ");

export const GUTTER_GRADIENT = [
  "radial-gradient(140% 60% at 100% 100%, #00d4cc 0%, rgb(0 212 204 / 0) 75%)",
  "radial-gradient(120% 45% at 0% 55%, rgb(255 140 50 / 0.55) 0%, rgb(255 140 50 / 0) 70%)",
  BASE,
].join(", ");
