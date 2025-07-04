import { Card } from "@/components/Card";
import { SimpleLayout } from "@/components/SimpleLayout";
import logoAnimaginary from "@/images/logos/animaginary.svg";
import logoCosmos from "@/images/logos/cosmos.svg";
import logoHelioStream from "@/images/logos/helio-stream.svg";
import logoOpenShuttle from "@/images/logos/open-shuttle.svg";
import logoPlanetaria from "@/images/logos/planetaria.svg";
import { LinkIcon } from "lucide-react";
import { type Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I’ve made trying to put my dent in the universe.",
};

export default function ProjectsPage() {
  return (
    <SimpleLayout
      title="Things I’ve made trying to put my dent in the universe."
      intro="I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Project
          name="Planetaria"
          description="Creating technology to empower civilians to explore space on their own terms."
          link={{ href: "http://planetaria.tech", label: "planetaria.tech" }}
          logo={logoPlanetaria}
        />
        <Project
          name="Animaginary"
          description="High performance web animation library, hand-written in optimized WASM."
          link={{ href: "#", label: "github.com" }}
          logo={logoAnimaginary}
        />
        <Project
          name="HelioStream"
          description="Real-time video streaming library, optimized for interstellar transmission."
          link={{ href: "#", label: "github.com" }}
          logo={logoHelioStream}
        />
        <Project
          name="cosmOS"
          description="The operating system that powers our Planetaria space shuttles."
          link={{ href: "#", label: "github.com" }}
          logo={logoCosmos}
        />
        <Project
          name="OpenShuttle"
          description="The schematics for the first rocket I designed that successfully made it to orbit."
          link={{ href: "#", label: "github.com" }}
          logo={logoOpenShuttle}
        />
      </ul>
    </SimpleLayout>
  );
}

function Project({
  name,
  description,
  link,
  logo,
}: {
  name: string;
  description: string;
  link: { href: string; label: string };
  logo: string;
}) {
  return (
    <Card as="li">
      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={logo} alt={`${name} logo`} className="size-8" unoptimized />
      </div>

      <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
        <Card.Link href={link.href}>{name}</Card.Link>
      </h2>

      <Card.Description>{description}</Card.Description>

      <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
        <LinkIcon strokeWidth={2.5} className="m-1 size-4 flex-none" />
        <span className="ml-2">{link.label}</span>
      </p>
    </Card>
  );
}
