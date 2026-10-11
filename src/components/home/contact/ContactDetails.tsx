"use client";

import type { ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tile } from "@/components/grid/Tile";
import { LineNumbers } from "@/components/grid/LineNumbers";
import { FacebookIcon, GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { site } from "@/lib/site";

type SocialKey = keyof typeof site.social;

const SOCIALS: Array<{ key: SocialKey; Icon: ComponentType<{ size?: number }> }> = [
  { key: "github", Icon: GithubIcon },
  { key: "linkedin", Icon: LinkedinIcon },
  { key: "facebook", Icon: FacebookIcon },
];

const LINK = "mouse-sm group inline-flex items-center gap-1.5 py-1 text-white transition-colors hover:text-accent";

/** Side column of the contact section: direct contacts, socials and a shader window. */
export function ContactDetails() {
  const t = useTranslations("contact");
  const tSocial = useTranslations("social");

  const details = [
    { term: t("email"), value: site.email, href: `mailto:${site.email}` },
    { term: t("phone"), value: site.phone, href: site.phoneHref },
    { term: t("location"), value: t("locationValue"), href: site.locationHref, external: true },
  ];

  return (
    <div className="flex flex-col lg:col-span-4">
      <Tile mode="solid" lines={["top", "left"]} className="px-5 py-12 sm:px-10 lg:px-10 lg:pt-24">
        <dl data-fade className="space-y-6">
          {details.map(({ term, value, href, external }) => (
            <div key={term}>
              <dt className="font-mono text-[0.75rem] tracking-[0.12em] text-on-dark-muted uppercase">{term}</dt>
              <dd className="m-0 mt-1 text-[1.25rem] break-words">
                <a
                  href={href}
                  className={LINK}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {value}
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <ul data-fade className="mt-10 flex gap-3">
          {SOCIALS.map(({ key, Icon }) => (
            <li key={key}>
              <a
                href={site.social[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tSocial(key)}
                className="mouse-sm flex size-12 items-center justify-center border border-dashed border-guide text-on-dark-muted transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent"
              >
                <Icon size={20} />
              </a>
            </li>
          ))}
        </ul>
      </Tile>

      <div aria-hidden className="grid min-h-40 flex-1 grid-cols-[1fr_2fr]">
        <Tile mode="grain" lines={["left"]} className="flex justify-center overflow-hidden pt-4">
          <LineNumbers count={10} className="hidden lg:block" />
        </Tile>
        <Tile mode="window" data-speed="clamp(1.05)" />
      </div>
    </div>
  );
}
