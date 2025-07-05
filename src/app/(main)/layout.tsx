import { Layout } from "@/components/Layout";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return <Layout>{children}</Layout>;
}
