"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { TransitionLink } from "@/components/transition/TransitionLink";
import type { Project } from "@/content/projects";
import styles from "./ProjectCover.module.css";

type ProjectCoverProps = {
  project: Project;
  type: string;
  lead: string;
  /** Repeated copies used only to fill the infinite slider. */
  isDuplicate?: boolean;
};

export function ProjectCover({ project, type, lead, isDuplicate = false }: ProjectCoverProps) {
  const t = useTranslations("explore");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsActive(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <article
      className={styles.cover}
      data-active={isActive}
      aria-label={`${project.title} — ${lead}`}
      aria-hidden={isDuplicate || undefined}
    >
      <TransitionLink
        href={`/portfolio/${project.slug}`}
        tabIndex={isDuplicate ? -1 : undefined}
        onClick={() => setIsActive(false)}
        draggable={false}
      >
        <div className={styles.mediaContainer}>
          {project.video ? (
            <video
              className={`${styles.media} mouse-md`}
              loop
              muted
              autoPlay
              playsInline
              poster={project.video.poster}
            >
              {project.video.webm && <source src={project.video.webm} type="video/webm" />}
              <source src={project.video.mp4} type="video/mp4" />
            </video>
          ) : (
            <div className={`${styles.media} ${styles.placeholder} mouse-md`}>
              <span className={styles.placeholderTitle}>{project.title}</span>
              <span className={styles.placeholderTag}>&lt; {t("comingSoon")} &#47; &gt;</span>
            </div>
          )}
        </div>
      </TransitionLink>

      <div className={styles.titleBar}>
        <h3 className={`${styles.title} mb-0`}>{project.title}</h3>
        <span className={`${styles.type} text-small mb-0 block`}>{type}</span>
      </div>
    </article>
  );
}
