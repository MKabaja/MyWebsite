import { ArrowUpLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { FacebookIcon, GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { LanguageSwitch } from "@/components/shell/LanguageSwitch";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { CodeTag } from "@/components/ui/CodeTag";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import styles from "./ContactView.module.css";

export function ContactView() {
  const t = useTranslations();

  const socials = [
    { href: site.social.github, label: "GitHub", Icon: GithubIcon },
    { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
  ];

  return (
    <div className={`container-xxxl ${styles.container}`}>
      <div className="row mt-0 justify-end lg:mt-16">
        <div className="mb-6 md:w-8/12 lg:w-7/12 xl:w-5/12 2xl:w-4/12">
          <TransitionLink href="/" className={`back-link mouse-md ${styles.backLink} mt-6 lg:mt-0`}>
            <ArrowUpLeft size={30} className="pe-2" aria-hidden />
            {t("contact.back")}
          </TransitionLink>
          <CodeTag className="mt-12 mb-4">contact</CodeTag>
          <h1 className="mb-6">{t("contact.title")}</h1>
          <p className="mb-6">{t("contact.intro")}</p>
          <ContactForm />
          <hr className="mt-12 mb-16" />
          <h3 className="mb-4">{t("contact.altHeading")}</h3>
          <dl className={styles.details}>
            <dt>{t("contact.email")}</dt>
            <dd>
              <a href={`mailto:${site.email}`} className={`${styles.accentLink} mouse-md`}>
                {site.email}
              </a>
            </dd>
            <dt>{t("contact.phone")}</dt>
            <dd>
              <a href={site.phoneHref} className="mouse-sm">
                {site.phone}
              </a>
            </dd>
            <dt>{t("contact.location")}</dt>
            <dd>
              <a href={site.locationHref} target="_blank" rel="noopener noreferrer" className="mouse-sm">
                {t("contact.locationValue")}
              </a>
            </dd>
          </dl>
          <p className="mt-6 mb-3">{t("contact.socials")}</p>
          <ul className={styles.socials}>
            {socials.map(({ href, label, Icon }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={`${styles.social} mouse-sm`}>
                  <Icon size={18} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitch className={`${styles.language} mt-12 mb-16`} />
        </div>
        <div className="hidden w-1/12 xl:block" />
      </div>
    </div>
  );
}
