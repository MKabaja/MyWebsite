import { ArrowUpLeft, ExternalLink, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { ActionButton } from "@/components/ui/ActionButton";
import { CodeLine } from "@/components/ui/CodeLine";
import { CodeTag } from "@/components/ui/CodeTag";
import { Logo } from "@/components/ui/Logo";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/projects";
import { ProjectContent } from "./ProjectContent";
import styles from "./ProjectView.module.css";

export function ProjectView({ project, locale }: { project: Project; locale: Locale }) {
  const t = useTranslations();

  return (
    <div className="container-xxxl">
      <div className="row mt-12">
        <div className="col-auto">
          <Logo height={34} label={t("person.homeLink")} />
        </div>
      </div>

      <div className="row gx-6 mt-12 lg:mt-16">
        <div className="lg:w-4/12">
          <CodeTag className={`${styles.onDark} mb-2 lg:mb-4`}>{project.type[locale]}</CodeTag>
          <h1 className={`${styles.name} mb-12 lg:mb-32`}>{project.title}</h1>
          <TransitionLink href="/explore" className={`back-link mouse-md ${styles.backLink} mb-12 lg:mb-0`}>
            <ArrowUpLeft size={30} className="pe-2" aria-hidden />
            {t("portfolio.back")}
          </TransitionLink>
        </div>
        <div className="col lg:basis-0">
          {project.video ? (
            <video
              className={`${styles.video} mouse-md`}
              loop
              muted
              autoPlay
              playsInline
              poster={project.video.poster}
              data-aos="zoom-in-down"
            >
              {project.video.webm && <source src={project.video.webm} type="video/webm" />}
              <source src={project.video.mp4} type="video/mp4" />
            </video>
          ) : (
            <div className={`${styles.video} ${styles.placeholder}`} data-aos="zoom-in-down">
              <span>&lt; {t("explore.comingSoon")} &#47; &gt;</span>
            </div>
          )}
        </div>
      </div>

      <div className="row gx-6 gx-xl-8 mt-12 pb-4 lg:mt-32 xl:mt-24">
        <div className="order-2 pt-16 lg:order-1 lg:w-4/12 lg:pt-0">
          <aside className="sticky top-[60px] mb-12 ps-0 lg:mb-0 lg:ps-16">
            <h3 className="mb-12" data-aos="fade-up">
              {project.title}
            </h3>
            <dl className={`${styles.details} mb-12 block`} data-aos="fade-up">
              {project.client && (
                <>
                  <dt>{t("portfolio.client")}</dt>
                  <dd>{project.client[locale]}</dd>
                </>
              )}
              {project.role && (
                <>
                  <dt>{t("portfolio.role")}</dt>
                  <dd>{project.role[locale]}</dd>
                </>
              )}
              {project.completed && (
                <>
                  <dt>{t("portfolio.completed")}</dt>
                  <dd>{project.completed}</dd>
                </>
              )}
              <dt>{t("portfolio.stack")}</dt>
              <dd>{project.stack.join(" · ")}</dd>
              {project.links && (
                <>
                  <dt>{t("portfolio.links")}</dt>
                  <dd className="flex flex-col gap-1">
                    {project.links.live && (
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="mouse-sm">
                        <ExternalLink size={14} className="me-2 inline" aria-hidden />
                        {t("portfolio.live")}
                      </a>
                    )}
                    {project.links.repo && (
                      <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="mouse-sm">
                        <GithubIcon size={14} className="me-2 inline" />
                        {t("portfolio.repo")}
                      </a>
                    )}
                  </dd>
                </>
              )}
            </dl>
            <ActionButton href="/contact" className="mb-16">
              <Send size={16} aria-hidden />
              {t("portfolio.cta")}
            </ActionButton>
          </aside>
        </div>
        <div className="order-1 lg:order-2 lg:w-8/12">
          <div className="lg:w-11/12 xl:w-10/12">
            <CodeLine number="//" className="mb-12 lg:mb-6">
              <span className="code--yellow">npm</span>
              <span className="code--green">&nbsp;run</span>
              <span className="code--white">&nbsp;case_study</span>
            </CodeLine>
            <h1 className="mb-6 lg:mb-12" data-aos="fade-up">
              {project.lead[locale]}
            </h1>
          </div>
          {project.placeholder || project.content.length === 0 ? (
            <p className={styles.note} data-aos="fade-up">
              {t("portfolio.placeholderNote")}
            </p>
          ) : (
            <ProjectContent blocks={project.content} locale={locale} />
          )}
          <p className={`${styles.copyright} text-small mt-24 hidden text-end lg:block 2xl:mt-32`}>
            {t("portfolio.copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </div>
  );
}
