"use client";

import type { MouseEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/transition/TransitionLink";
import type { Project } from "@/content/projects";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
  /** Repeated copies only fill the infinite loop: hidden from assistive tech and the tab order. */
  isDuplicate: boolean;
  /** Returns true when the press that ended in this click was a drag. */
  wasDragged: () => boolean;
};

const pad = (value: number) => String(value).padStart(2, "0");

export function ProjectCard({ project, index, total, isDuplicate, wasDragged }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations("home.portfolio");
  const tExplore = useTranslations("explore");

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (wasDragged()) event.preventDefault();
  };

  return (
    <li className={styles.slide} aria-hidden={isDuplicate || undefined}>
      <div className={styles.lift}>
        <span className={styles.counter} aria-hidden>
          {pad(index + 1)}/{pad(total)}
        </span>

        <TransitionLink
          href={`/portfolio/${project.slug}`}
          className={`${styles.card} mouse-md`}
          aria-label={`${project.title} — ${project.lead[locale]}`}
          tabIndex={isDuplicate ? -1 : undefined}
          draggable={false}
          onClick={onClick}
        >
          <div className={styles.media}>
            {project.video ? (
              <video
                className={styles.video}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                poster={project.video.poster}
                draggable={false}
              >
                {project.video.webm && <source src={project.video.webm} type="video/webm" />}
                <source src={project.video.mp4} type="video/mp4" />
              </video>
            ) : (
              <div className={styles.cover}>
                <span className={styles.coverIndex} aria-hidden>
                  {pad(index + 1)}
                </span>
                <span className={styles.badge}>
                  <span className={styles.badgeDot} aria-hidden />
                  {tExplore("comingSoon")}
                </span>
                <span className={styles.coverTitle}>{project.title}</span>
                <ul className={styles.chips}>
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className={styles.bar}>
            <span className={styles.barTitle}>{project.title}</span>
            <span className={styles.barType}>{project.type[locale]}</span>
            <span className={styles.barOpen}>
              {t("open")}
              <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden />
            </span>
          </div>
        </TransitionLink>
      </div>
    </li>
  );
}
