import { writeTheme } from "@/theme/write-theme";
import { MoonIcon } from "./icon/MoonIcon";
import { SunIcon } from "./icon/SunIcon";

export function ThemeToggle() {
  return (
    <form action={writeTheme}>
      <button
        name="theme"
        value="dark"
        aria-label="Switch to dark theme"
        className="group rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:hidden dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      >
        <SunIcon className="size-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600" />
      </button>

      <button
        name="theme"
        value="light"
        aria-label="Switch to light theme"
        className="group hidden rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:block dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      >
        <MoonIcon className="size-6 fill-zinc-700 stroke-zinc-500 transition not-[@media_(prefers-color-scheme:dark)]:fill-teal-400/10 not-[@media_(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400" />
      </button>
    </form>
  );
}
