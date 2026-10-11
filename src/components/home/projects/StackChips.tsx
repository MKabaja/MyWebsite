import { TechIcon } from "@/components/icons/TechIcon";
import { toolbox } from "@/content/stack";

const techByName = new Map(toolbox.map((tech) => [tech.name, tech]));

/** Technology list as small mono chips, with the brand logo when we have one. */
export function StackChips({ stack, className = "" }: { stack: string[]; className?: string }) {
  return (
    <ul className={`m-0 flex list-none flex-wrap gap-2 p-0 ${className}`}>
      {stack.map((name) => {
        const tech = techByName.get(name);
        return (
          <li
            key={name}
            className="inline-flex items-center gap-1.5 border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[0.72rem] leading-none text-on-dark-muted"
          >
            {tech && <TechIcon icon={tech.icon} className="size-3.5 text-on-dark/80" />}
            {name}
          </li>
        );
      })}
    </ul>
  );
}
