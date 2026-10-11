import Image from "next/image";
import { Info } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { ContentBlock } from "@/content/projects";
import styles from "./ProjectContent.module.css";

const TEXT_COLUMN = "w-full lg:w-11/12 xl:w-9/12 2xl:w-8/12";

export function ProjectContent({ blocks, locale }: { blocks: ContentBlock[]; locale: Locale }) {
  return (
    <section className={styles.content}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={index} className={`${TEXT_COLUMN} mt-12 mb-6`} data-aos="fade-up">
                {block.text[locale]}
              </h2>
            );
          case "paragraph":
            return (
              <div key={index} className={TEXT_COLUMN}>
                <p data-aos="fade-up">{block.text[locale]}</p>
              </div>
            );
          case "image":
            return (
              <figure key={index} className="my-6 w-full lg:my-12" data-aos="fade-up">
                <Image src={block.src} alt={block.alt[locale]} width={1974} height={1110} className="my-6 mouse-sm" />
                {block.caption && (
                  <figcaption>
                    <Info size={14} className="me-2 inline" aria-hidden />
                    {block.caption[locale]}
                  </figcaption>
                )}
              </figure>
            );
        }
      })}
    </section>
  );
}
