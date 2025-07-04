import { Layout } from "@/components/Layout";
import { readTheme } from "@/theme/read-theme";
import { type Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Erin Millard-Wright",
    default: "Erin Millard-Wright - Making software for the love of it 💝",
  },
  description:
    "Hi! I'm Erin, and I've been making software for 20+ years. I have a proven track record of building and leading outstanding dev teams. My passion, dedication to quality, technical knowledge, and people skills have helped produce software that is both loved by users, and a joy to work on for the devs I work with.",
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const theme = await readTheme();

  return (
    <html lang="en" data-theme={theme}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
