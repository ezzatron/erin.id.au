import { Container } from "@/components/Container";
import { GitHubIcon } from "@/components/icon/GitHubIcon";
import { LinkButton } from "@/components/LinkButton";
import clsx from "clsx";
import {
  DownloadIcon,
  LinkIcon,
  MailIcon,
  MapPinIcon,
  PhoneCallIcon,
  SkipForwardIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Hi! I'm Erin, and I've been making software for 20+ years. I have a proven track record of building and leading outstanding dev teams. My passion, dedication to quality, technical knowledge, and people skills have helped produce software that is both loved by users, and a joy to work on for the devs I work with.",
};

export default function ResumePage() {
  const phone = process.env.RESUME_PHONE ?? "";

  return (
    <Container className="mt-16 sm:mt-32 print:mt-5">
      <header>
        <h1 className="text-4xl/[1.2em] font-bold tracking-tight text-zinc-800 sm:text-5xl/[1.2em] dark:text-zinc-100 print:text-[30pt]/[1.2em]">
          Erin Millard-Wright
        </h1>

        <p className="text-xl/[1.2em] font-medium sm:text-2xl/[1.2em] print:text-[16pt]/[1.2em]">
          Senior Software Engineer
        </p>
      </header>

      <div className="mt-18 flex flex-col gap-18 lg:flex-row lg:gap-24 print:mt-10 print:flex-row print:gap-18">
        <div className="mt-1 flex flex-none flex-col lg:w-64 print:w-46">
          <div className="flex flex-col gap-2">
            {phone && (
              <ContactInfo href={`tel:${phone}`} icon={PhoneCallIcon}>
                {phone}
              </ContactInfo>
            )}

            <ContactInfo href="mailto:contact@erin.id.au" icon={MailIcon}>
              contact@erin.id.au
            </ContactInfo>
            <ContactInfo href="https://erin.id.au" icon={LinkIcon}>
              erin.id.au
            </ContactInfo>
            <ContactInfo icon={MapPinIcon}>Brisbane, Australia</ContactInfo>
          </div>

          <div className="mt-8 flex flex-col gap-4 print:hidden">
            <LinkButton
              download
              primary
              href="/Resume%20-%20Erin%20Millard-Wright.pdf"
              className="group w-full"
            >
              Resume PDF
              <DownloadIcon
                aria-label="download"
                strokeWidth={2}
                className="size-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
              />
            </LinkButton>

            <LinkButton href="#experience" className="w-full lg:hidden">
              Jump to experience
              <SkipForwardIcon
                strokeWidth={2}
                className="size-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
              />
            </LinkButton>
          </div>

          <div className="mt-8 space-y-2 text-zinc-700 dark:text-zinc-400 print:text-[8pt]/[1.2em]">
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
          </div>

          <div className="mt-8 space-y-2 border-t-1 border-zinc-300 pt-8 text-zinc-700 dark:border-zinc-700 dark:text-zinc-400 print:text-[8pt]/[1.2em]">
            <p>
              I&apos;ve built things with TypeScript, JavaScript, React.js,
              Next.js, App Router, Webpack, Node.js, Electron, HTML, CSS,
              Tailwind, Go, gRPC, OpenAPI, JWTs, and Mapbox.
            </p>

            <p>
              I&apos;ve used Terraform, Docker, Kubernetes, AWS, EKS, GitHub
              Actions, Playwright, Vitest, Jest, Git and Make to test, build,
              and deploy software.
            </p>

            <p>
              I&apos;ve worked on web apps, PWAs, web-based desktop apps,
              message-based apps, real-time apps, event-driven apps, APIs,
              microservices, and geolocation systems.
            </p>

            <p>
              I have skills in team leadership, technical leadership, strategic
              planning, user experience, user interface design, developer
              experience, system architecture, library design, protocol design,
              test-driven development, mob programming, mentoring, code review,
              presentations, and software documentation.
            </p>
          </div>

          <div className="mt-8 hidden space-y-2 border-t-1 border-zinc-300 pt-8 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400 print:block print:text-[8pt]/[1.2em]">
            <p>Open-source projects</p>

            <ContactInfo href="https://github.com/ezzatron" icon={GitHubIcon}>
              github.com/ezzatron
            </ContactInfo>
          </div>
        </div>

        <div
          id="experience"
          className="flex scroll-mt-10 flex-col gap-10 print:gap-5"
        >
          <h2 className="text-3xl/[1.2em] font-bold tracking-tight text-zinc-800 sm:text-4xl/[1.2em] lg:hidden dark:text-zinc-100 print:hidden">
            Experience
          </h2>

          <Work
            role="Principal Software Engineer"
            employer="BetSecure"
            endYear={2025}
            startYear={2021}
            duration="3 years 7 months"
          >
            <li>
              Shared responsibility for designing, hiring, and leading
              high-functioning dev teams to build an ambitious
              software-as-a-service platform in the regulatory compliance space.
            </li>
            <li>
              Guided product and technical direction, designed processes and
              team structures, and enabled teams to be effective within company
              goals.
            </li>
            <li>
              Championed processes and ideas that created highly collaborative,
              autonomous, and effective cross-functional teams. Drove the
              adoption of mob programming, which drastically improved quality,
              reduced rework, eliminated siloing, and accelerated onboarding,
              enabling new hires to make legitimate contributions on day one.
            </li>
            <li>
              Worked directly with teams to bootstrap projects and guide the
              implementation of new features. Provided guidance and solutions to
              overcome challenges as projects evolved.
            </li>
            <li>
              Personally wrote the majority of the public-facing documentation
              for the BetSecure platform, and developed content and style
              guidelines and custom tooling to ensure a world-class experience
              for customers integrating with the platform.
            </li>
            <li>
              Fostered a culture of excellence and collaboration, enabling teams
              to frequently and consistently deliver high-quality results.
            </li>
          </Work>

          <Work
            role="Software Team Lead"
            employer="Codeworx"
            endYear={2021}
            startYear={2016}
            duration="5 years 10 months"
          >
            <li>
              Led a team to modernize and maintain white-labelled web-based
              poker and sports betting products, including the transition from a
              legacy Java client to Electron-based desktop clients and PWAs.
            </li>
            <li>
              Provided technical leadership through mentoring, code reviews, and
              the development of internal tools, streamlining branding asset
              production and release processes.
            </li>
            <li>
              Spearheaded the migration from jQuery and CoffeeScript to React
              and vanilla JavaScript, accelerating feature delivery and
              maintainability. Designed a custom WebSocket protocol for
              real-time backend communication.
            </li>
          </Work>

          <Work
            role="Senior Software Engineer"
            employer="Codeworx"
            endYear={2016}
            startYear={2011}
            duration="5 years 1 month"
          >
            <li>
              Collaborated with PHP teams to architect and deliver an internal
              framework powering multiple high-traffic web applications, and
              prototyped Angular-based apps that launched new product lines.
            </li>
            <li>
              Standardized deployment processes by developing Capistrano-like
              tooling and establishing Vagrant-based development environments,
              both adopted company-wide.
            </li>
            <li>
              Drove adoption of automated testing, achieving 100% test coverage
              for the internal framework and creating a widely used PHP test
              mock library.
            </li>
            <li>
              Enhanced security by designing a custom PBKDF2-based binary
              protocol for password hashing, implemented in both PHP and Java.
            </li>
          </Work>

          <Work
            role="Systems Analyst"
            employer="I-Nex Corp"
            endYear={2010}
            startYear={2006}
            duration="4 years 7 months"
          >
            <li>
              Collaborated with PHP teams to architect and deliver an internal
              framework powering multiple high-traffic web applications, and
              prototyped Angular-based apps that launched new product lines.
            </li>
            <li>
              Standardized deployment processes by developing Capistrano-like
              tooling and establishing Vagrant-based development environments,
              both adopted company-wide.
            </li>
            <li>
              Drove adoption of automated testing, achieving 100% test coverage
              for the internal framework and creating a widely used PHP test
              mock library.
            </li>
            <li>
              Enhanced security by designing a custom PBKDF2-based binary
              protocol for password hashing, implemented in both PHP and Java.
            </li>
          </Work>
        </div>
      </div>
    </Container>
  );
}

function ContactInfo({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string;
  href?: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  const content = (
    <>
      <Icon className="size-4 flex-none text-zinc-500 transition group-hover:text-teal-500 print:size-3" />
      <span className="ml-2">{children}</span>
    </>
  );

  return (
    <li
      className={clsx(
        className,
        "flex items-center text-sm font-medium text-zinc-800 transition dark:text-zinc-200 print:text-[8pt]/[1.2em]",
        { "hover:text-teal-500 dark:hover:text-teal-500": href },
      )}
    >
      {href ? (
        <Link href={href} className="group flex items-center">
          {content}
        </Link>
      ) : (
        content
      )}
    </li>
  );
}

function Work({
  role,
  employer,
  endYear,
  startYear,
  duration,
  children,
}: {
  role: string;
  employer: string;
  endYear: number;
  duration: string;
  startYear: number;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xl/[1.4em] font-medium text-zinc-800 dark:text-zinc-100 print:text-[12pt]/[1.4em]">
        {role}
        <span className="tracking-widest"> — </span>
        {employer}
      </h3>

      <p className="text-md/[1.2em] text-zinc-600 dark:text-zinc-400 print:text-[10pt]/[1.2em]">
        {duration} ({startYear} — {endYear})
      </p>

      <div className="mt-6 space-y-2 print:mt-4 print:text-[8pt]/[1.2em]">
        <ul className="list-['–'] space-y-2 pl-2 text-zinc-700 *:pl-1 dark:text-zinc-400 print:space-y-0">
          {children}
        </ul>
      </div>
    </div>
  );
}
