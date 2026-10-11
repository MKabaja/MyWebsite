import {
  siCss,
  siFigma,
  siFirebase,
  siGit,
  siGsap,
  siHtml5,
  siInertia,
  siJavascript,
  siLaravel,
  siNextdotjs,
  siPhp,
  siReact,
  siSass,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

export type Tech = { name: string; icon: SimpleIcon; url: string };

const tech = (name: string, icon: SimpleIcon, url: string): Tech => ({ name, icon, url });

/** Main stack — hero logo row and the "core stack" list. */
export const coreStack: Tech[] = [
  tech("React", siReact, "https://react.dev"),
  tech("Next.js", siNextdotjs, "https://nextjs.org"),
  tech("TypeScript", siTypescript, "https://www.typescriptlang.org"),
  tech("Laravel", siLaravel, "https://laravel.com"),
  tech("Tailwind CSS", siTailwindcss, "https://tailwindcss.com"),
  tech("GSAP", siGsap, "https://gsap.com"),
];

/** Everything else I work with — logo marquee. */
export const toolbox: Tech[] = [
  ...coreStack,
  tech("JavaScript", siJavascript, "https://developer.mozilla.org/docs/Web/JavaScript"),
  tech("PHP", siPhp, "https://www.php.net"),
  tech("Inertia.js", siInertia, "https://inertiajs.com"),
  tech("Firebase", siFirebase, "https://firebase.google.com"),
  tech("HTML", siHtml5, "https://developer.mozilla.org/docs/Web/HTML"),
  tech("CSS", siCss, "https://developer.mozilla.org/docs/Web/CSS"),
  tech("SCSS", siSass, "https://sass-lang.com"),
  tech("Figma", siFigma, "https://www.figma.com"),
  tech("Git", siGit, "https://git-scm.com"),
];
