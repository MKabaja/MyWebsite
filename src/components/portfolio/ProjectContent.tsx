import Image from "next/image";
import { Info } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { ContentBlock } from "@/content/projects";

const TEXT_COLUMN = "max-w-[68ch]";

/** Case study body: headings, paragraphs and framed images, each revealed on scroll. */
export function ProjectContent({ blocks, locale }: { blocks: ContentBlock[]; locale: Locale }) {
  return (
    <div className="flex flex-col">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={index}
                className={`${TEXT_COLUMN} mt-14 mb-5 text-[clamp(1.8rem,3vw,2.4rem)] font-semibold first:mt-0`}
                data-fade
              >
                {block.text[locale]}
              </h2>
            );
          case "paragraph":
            return (
              <p
                key={index}
                className={`${TEXT_COLUMN} mb-5 text-[1.2rem] leading-relaxed text-on-dark-muted last:mb-0`}
                data-fade
              >
                {block.text[locale]}
              </p>
            );
          case "image":
            return (
              <figure key={index} className="my-10 lg:my-16" data-fade>
                <div className="border border-dashed border-guide p-2">
                  <Image
                    src={block.src}
                    alt={block.alt[locale]}
                    width={1974}
                    height={1110}
                    className="mouse-sm block h-auto w-full"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-3 flex items-center gap-2 font-mono text-[0.78rem] text-on-dark-muted">
                    <Info size={14} aria-hidden />
                    {block.caption[locale]}
                  </figcaption>
                )}
              </figure>
            );
        }
      })}
    </div>
  );
}
