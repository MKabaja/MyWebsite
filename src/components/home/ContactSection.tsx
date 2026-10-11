"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact/ContactForm";
import { Scribble } from "@/components/grid/Scribble";
import { Tile } from "@/components/grid/Tile";
import { useSplitReveal } from "@/components/grid/useSplitReveal";
import { ContactDetails } from "./contact/ContactDetails";
import { SiteFooter } from "./contact/SiteFooter";

/** Last section of the home page: contact form, direct contacts and the footer. */
export function ContactSection() {
  const t = useTranslations("home.contact");
  const headingRef = useRef<HTMLHeadingElement>(null);
  useSplitReveal(headingRef, { delay: 0, onScroll: true });

  return (
    <section id="contact" aria-labelledby="contact-heading" className="grid-frame">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <Tile
          mode="solid"
          lines={["top"]}
          data-m-expand
          className="px-5 pt-16 pb-16 sm:px-10 lg:col-span-8 lg:px-14 lg:pt-24 lg:pb-24 2xl:px-20"
        >
          <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
            <h2
              id="contact-heading"
              ref={headingRef}
              className="text-[3.2rem] leading-none font-medium text-white md:text-[4.8rem] xl:text-[5.6rem]"
            >
              {t("heading")}
            </h2>
            <Scribble variant="underline" className="mb-2 -rotate-3 text-accent-soft" strokeClassName="text-accent">
              {t("note")}
            </Scribble>
          </div>
          <p data-fade className="mt-8 max-w-[34em] text-[1.15rem] text-on-dark-muted">
            {t("text")}
          </p>

          <div data-fade className="mt-12 max-w-3xl md:mt-16">
            <ContactForm />
          </div>
        </Tile>

        <ContactDetails />
      </div>

      <SiteFooter />
    </section>
  );
}
