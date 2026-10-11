import { Marquee } from "@/components/grid/Marquee";
import { TechIcon } from "@/components/icons/TechIcon";
import { toolbox } from "@/content/stack";

/** Light strip with an endless row of the tools I use. */
export function ToolboxMarquee({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center bg-[#f2eeea] text-ink ${className}`}>
      <Marquee repeat={2} duration={45} className="w-full">
        {toolbox.map((tech) => (
          <span key={tech.name} className="flex items-center gap-3 px-7 lg:px-9">
            <TechIcon icon={tech.icon} className="size-7 text-ink" />
            <span className="text-[1.35rem] font-semibold whitespace-nowrap text-ink/80">{tech.name}</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
