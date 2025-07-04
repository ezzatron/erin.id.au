import { Container } from "@/components/Container";
import { BlueskyIcon } from "@/components/icon/BlueskyIcon";
import { GitHubIcon } from "@/components/icon/GitHubIcon";
import { LinkedInIcon } from "@/components/icon/LinkedInIcon";
import { LinkButton } from "@/components/LinkButton";
import portraitImage from "@/images/portrait.jpg";
import clsx from "clsx";
import { ArrowDownIcon, MailIcon } from "lucide-react";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hi! I'm Erin, and I've been making software for 20+ years. I have a proven track record of building and leading outstanding dev teams. My passion, dedication to quality, technical knowledge, and people skills have helped produce software that is both loved by users, and a joy to work on for the devs I work with.",
};

export default function AboutPage() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt="Portrait of Erin Millard-Wright"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              priority
            />
          </div>
        </div>

        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Making software for the love of it 💝
          </h1>

          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              Hi! I&apos;m Erin, and I&apos;ve been making software for 20+
              years.
            </p>
            <p>
              I have a proven track record of building and leading outstanding
              dev teams. My passion, dedication to quality, technical knowledge,
              and people skills have helped produce software that is both loved
              by users, and a joy to work on for the devs I work with.
            </p>
            <p>
              I have a broad range of experience, particularly focused around
              front-end technologies, web apps, and user experience design, but
              also library, SDK, and tool development. I&apos;m also very
              passionate about the way in which software gets made — team
              structures, processes, tooling, and developer experience.
            </p>
            <p>
              In addition to my professional work, I keep my own skills sharp by
              creating and contributing to a large variety of open-source{" "}
              <Link
                href="/projects"
                className="font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
              >
                projects
              </Link>
              . This allows me to hone my craft, keep up-to-date with the latest
              tech, and bring a wealth of fresh ideas to the table.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-16 lg:pl-20">
          <div className="flex flex-col gap-4">
            <LinkButton href="#TODO" variant="primary" className="group w-full">
              Download CV
              <ArrowDownIcon
                strokeWidth={2}
                className="size-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
              />
            </LinkButton>

            <LinkButton
              download
              href="/Erin%20Millard-Wright.vcf"
              variant="secondary"
              className="group w-full"
            >
              Download contact
              <ArrowDownIcon
                strokeWidth={2}
                className="size-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
              />
            </LinkButton>
          </div>

          <ul role="list">
            <SocialLink href="mailto:contact@erin.id.au" icon={MailIcon}>
              contact@erin.id.au
            </SocialLink>

            <SocialLink
              href="https://github.com/ezzatron"
              icon={GitHubIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://linkedin.com/in/ezzatron"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="https://bsky.app/profile/ezzatron.bsky.social"
              icon={BlueskyIcon}
              className="mt-4"
            >
              Follow on Bluesky
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  );
}

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <li className={clsx(className, "flex")}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="size-6 flex-none text-zinc-500 transition group-hover:text-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  );
}
