"use client";

import type { ComponentProps, MouseEvent } from "react";
import { Link } from "@/i18n/navigation";
import { usePageTransition } from "./TransitionProvider";

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** Internal link that plays the page leave animation before navigating. */
export function TransitionLink({ href, onClick, locale, ...props }: TransitionLinkProps) {
  const { navigate } = usePageTransition();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    navigate(href, { locale: locale || undefined });
  };

  return <Link href={href} locale={locale} onClick={handleClick} {...props} />;
}
