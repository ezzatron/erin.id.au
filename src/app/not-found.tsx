import { Container } from "@/components/Container";

export default function NotFoundPage() {
  return (
    <Container className="flex h-full items-center pt-16 sm:pt-32">
      <div className="flex flex-col items-center">
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Not found
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
      </div>
    </Container>
  );
}
