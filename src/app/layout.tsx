import { Layout } from "@/components/Layout";
import { readTheme } from "@/theme/read-theme";
import { type Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Spencer Sharp",
    default:
      "Spencer Sharp - Software designer, founder, and amateur astronaut",
  },
  description:
    "I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms.",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const theme = await readTheme();

  return (
    <html lang="en" data-theme={theme}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
