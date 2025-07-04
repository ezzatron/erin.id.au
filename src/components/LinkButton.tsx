import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  primary?: boolean;
  children: ReactNode;
  className?: string;
  download?: boolean;
};

export function LinkButton({
  href,
  primary,
  children,
  className,
  download,
}: Props) {
  className = clsx(
    className,
    "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none",
    primary
      ? "bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70"
      : "bg-zinc-100 font-medium text-zinc-900 hover:bg-zinc-200 active:bg-zinc-200 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70",
  );

  return (
    <Link download={download} href={href} className={className}>
      {children}
    </Link>
  );
}
