"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { LineNumbers } from "@/components/grid/LineNumbers";
import { Marquee } from "@/components/grid/Marquee";
import { Tile } from "@/components/grid/Tile";
import { projects } from "@/content/projects";
import { ProjectCard } from "./projects/ProjectCard";

/** Home "Projects": accent console.log marquee, intro column, line-number gutter and the project tiles. */
export function ProjectsSection() {
  const t = useTranslations("home.projects");

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div aria-hidden className="bg-accent py-[1.125rem] font-mono text-[0.85rem] font-semibold tracking-[0.12em] text-ink uppercase">
        <Marquee repeat={16} duration={87}>
          <span className="px-5">{t("marquee")}</span>
          <X size={14} strokeWidth={3} />
        </Marquee>
      </div>

      <div className="grid-frame grid grid-cols-1 lg:grid-cols-[30%_auto_minmax(0,1fr)]">
        <Tile lines={["bottom"]} className="px-8 pt-16 pb-12 lg:border-b-0 lg:px-12 lg:pt-20">
          <h2 id="projects-heading" className="text-[2.4rem] font-semibold lg:text-[2.6rem]">
            {t("heading")}
          </h2>
          <p className="mt-5 max-w-[32ch] text-[1.15rem] leading-snug text-on-dark-muted">{t("text")}</p>
        </Tile>

        <div aria-hidden className="hidden lg:flex">
          <Tile lines={["left", "right"]} className="relative w-16 overflow-hidden">
            <LineNumbers count={60} className="absolute inset-x-0 top-20 text-center" />
          </Tile>
          <Tile mode="grain" lines={["right"]} className="w-[clamp(2.5rem,7vw,9rem)]" />
        </div>

        <Tile className="px-5 py-12 sm:px-8 lg:px-12 lg:pt-20 lg:pb-24">
          <ul className="m-0 grid list-none grid-cols-1 gap-x-10 gap-y-14 p-0 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </ul>
        </Tile>
      </div>
    </section>
  );
}
