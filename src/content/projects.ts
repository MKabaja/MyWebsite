import type { Locale } from "@/i18n/routing";

type Localized = Record<Locale, string>;

export type ContentBlock =
  | { type: "heading"; text: Localized }
  | { type: "paragraph"; text: Localized }
  | { type: "image"; src: string; alt: Localized; caption?: Localized };

export type Project = {
  slug: string;
  title: string;
  type: Localized;
  lead: Localized;
  role?: Localized;
  client?: Localized;
  completed?: string;
  stack: string[];
  video?: { mp4: string; webm?: string; poster?: string };
  links?: { live?: string; repo?: string };
  content: ContentBlock[];
  /** Placeholder entries render a "coming soon" cover instead of media. */
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    slug: "powertask",
    title: "PowerTask",
    type: { pl: "Aplikacja webowa", en: "Web app" },
    lead: {
      pl: "Aplikacja To-Do z roadmapą projektów, oparta o Firebase.",
      en: "A to-do app with a project roadmap, powered by Firebase.",
    },
    role: { pl: "Projekt i implementacja", en: "Design & development" },
    stack: ["JavaScript", "Firebase"],
    video: { mp4: "/video/powertask.mp4" },
    content: [
      {
        type: "paragraph",
        text: {
          pl: "PowerTask pozwala planować zadania i układać je w roadmapę projektu. Dane użytkownika są przechowywane w Firebase, dzięki czemu lista jest dostępna z każdego urządzenia.",
          en: "PowerTask lets you plan tasks and arrange them into a project roadmap. User data is stored in Firebase, so the list is available on any device.",
        },
      },
    ],
  },
  {
    slug: "shiftflow",
    title: "ShiftFlow",
    type: { pl: "Aplikacja webowa · Laravel", en: "Web app · Laravel" },
    lead: {
      pl: "Aplikacja do planowania grafików i zarządzania zmianami w pracy.",
      en: "An app for planning work schedules and managing shifts.",
    },
    stack: ["Laravel", "React", "Inertia.js"],
    content: [],
    placeholder: true,
  },
  {
    slug: "printforge",
    title: "PrintForge",
    type: { pl: "Aplikacja webowa · Laravel", en: "Web app · Laravel" },
    lead: {
      pl: "Aplikacja do obsługi zleceń druku — od zamówienia po realizację.",
      en: "An app for handling print orders — from order to delivery.",
    },
    stack: ["Laravel", "React", "Inertia.js"],
    content: [],
    placeholder: true,
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
