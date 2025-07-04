import avatarImage from "@/images/avatar.jpg";
import Image from "next/image";
import Link from "next/link";

export function Avatar() {
  return (
    <div className="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10">
      <Link href="/" aria-label="Home" className="pointer-events-auto">
        <Image
          src={avatarImage}
          alt="Avatar of Erin Millard-Wright"
          sizes="2.25rem"
          className="size-9 rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
          priority
        />
      </Link>
    </div>
  );
}
