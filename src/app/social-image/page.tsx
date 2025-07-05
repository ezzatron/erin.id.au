import avatarImage from "@/images/avatar.jpg";
import portraitImage from "@/images/portrait.jpg";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function SocialImagePage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <div className="flex h-[100vh] items-stretch justify-between overflow-clip px-18 py-18">
      <div className="flex flex-col justify-between">
        <h1 className="text-6xl/16 font-bold tracking-tight text-zinc-800">
          Making software
          <br />
          for the love of it 💝
        </h1>

        <div className="flex items-center gap-5">
          <Image
            src={avatarImage}
            alt=""
            className="size-16 rounded-full object-cover"
            priority
          />

          <p className="text-3xl font-medium tracking-tight text-zinc-600">
            Erin Millard-Wright
          </p>
        </div>
      </div>

      <div className="flex-shrink-0">
        <Image
          src={portraitImage}
          alt=""
          className="aspect-square size-full rotate-3 rounded-2xl bg-zinc-800 object-cover shadow-2xl"
          priority
        />
      </div>
    </div>
  );
}
