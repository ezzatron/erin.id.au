import { Container } from "@/components/Container";
import { GitHubIcon } from "@/components/icon/GitHubIcon";
import { DogmatiqLogo } from "@/components/logo/DogmatiqLogo";
import { GhalacticLogo } from "@/components/logo/GhalacticLogo";
import {
  ArchiveIcon,
  ContainerIcon,
  GlobeIcon,
  LinkIcon,
  LocateFixedIcon,
  UserCheckIcon,
  VenetianMaskIcon,
} from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Projects",
  description: "Some pretty cool things I've made (or helped make).",
};

export default function ProjectsPage() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Some pretty cool things I&apos;ve made (or helped make).
        </h1>

        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          I&apos;ve been making and contributing to open-source projects for 10+
          years. This is a small selection of some of my favorites — in various
          stages of completeness.
        </p>
      </header>

      <div className="mt-16 sm:mt-20">
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          <Project
            name="Ghalactic Actions"
            logo={<GhalacticLogo />}
            period="2021 — Present"
            link={{
              href: "https://ghalactic.github.io",
              label: "ghalactic.github.io",
            }}
            linkIcon={<LinkIcon strokeWidth={2.5} />}
          >
            <p>
              GitHub actions designed to feel like natural extensions of the
              GitHub experience.
            </p>
          </Project>

          <Project
            name="Dogma"
            period="2021 — 2022 (Contributor)"
            logo={<DogmatiqLogo />}
            link={{
              href: "https://github.com/dogmatiq/dogma",
              label: "dogmatiq/dogma",
            }}
            linkIcon={<GitHubIcon />}
          >
            <p>
              A comprehensive suite of tools for building robust message-driven
              applications.
            </p>
          </Project>

          <Project
            name="Austenite"
            period="2022 — Present"
            logo={<ContainerIcon strokeWidth={1.5} />}
            link={{
              href: "https://github.com/ezzatron/austenite",
              label: "ezzatron/austenite",
            }}
            linkIcon={<GitHubIcon />}
          >
            <p>
              Allows TypeScript micro-services to use code to declare the
              environment variables they consume.
            </p>
          </Project>

          <Project
            name="nvector-js"
            period="2023 — Present"
            logo={<LocateFixedIcon strokeWidth={1.5} />}
            link={{
              href: "https://github.com/ezzatron/nvector-js",
              label: "ezzatron/nvector-js",
            }}
            linkIcon={<GitHubIcon />}
          >
            <p>
              Lightweight TypeScript library for dealing with n-vectors, an
              alternative system for geographical positioning.
            </p>
          </Project>

          <Project
            name="nvector-go"
            period="2023 — Present"
            logo={<LocateFixedIcon strokeWidth={1.5} />}
            link={{
              href: "https://github.com/ezzatron/nvector-go",
              label: "ezzatron/nvector-go",
            }}
            linkIcon={<GitHubIcon />}
          >
            <p>
              Lightweight Go library for dealing with n-vectors, an alternative
              system for geographical positioning.
            </p>
          </Project>

          <Project
            name="fake-geolocation"
            period="2023 — Present"
            logo={<GlobeIcon strokeWidth={1.5} />}
            link={{
              href: "https://github.com/ezzatron/fake-geolocation",
              label: "ezzatron/fake-geolocation",
            }}
            linkIcon={<GitHubIcon />}
          >
            <p>
              Testing library that allows you to simulate real-world W3C
              Geolocation API interactions.
            </p>
          </Project>

          <Project
            name="fake-permissions"
            period="2023 — Present"
            logo={<UserCheckIcon strokeWidth={1.5} />}
            link={{
              href: "https://github.com/ezzatron/fake-permissions",
              label: "ezzatron/fake-permissions",
            }}
            linkIcon={<GitHubIcon />}
          >
            <p>
              Testing library that allows you to simulate real-world W3C
              Permissions API interactions.
            </p>
          </Project>

          <Project
            name="Phony"
            period="2014 — 2023"
            logo={<VenetianMaskIcon strokeWidth={1.5} />}
            link={{
              href: "https://web.archive.org/web/20220318071151/https:/eloquent-software.com/phony/latest/",
              label: "Documentation (archive)",
            }}
            linkIcon={<ArchiveIcon strokeWidth={2.5} />}
          >
            <p>Mocks, stubs, and spies for PHP.</p>
          </Project>
        </ul>
      </div>
    </Container>
  );
}

function Project({
  name,
  children,
  logo,
  period,
  link,
  linkIcon,
}: {
  name: string;
  children: ReactNode;
  logo: ReactNode;
  period: string;
  link: { href: string; label: string };
  linkIcon: ReactNode;
}) {
  return (
    <li className="group relative flex flex-col items-start">
      <div className="relative z-10 flex size-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <div className="flex size-9 items-center justify-center">{logo}</div>
      </div>

      <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
        <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />

        <Link href={link.href}>
          <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
          <span className="relative z-10">{name}</span>
        </Link>
      </h2>

      <div className="relative z-10 -mt-1 text-xs text-zinc-400 dark:text-zinc-500">
        {period}
      </div>

      <div className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {children}
      </div>

      <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
        <span className="m-1 flex size-4 flex-none items-center justify-center">
          {linkIcon}
        </span>
        <span className="ml-2">{link.label}</span>
      </p>
    </li>
  );
}
