"use client";

import { PopoverButton } from "@headlessui/react";
import Link from "next/link";
import { type ReactNode } from "react";

export function MobileNavItem({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <li>
      <PopoverButton as={Link} href={href} className="block py-2">
        {children}
      </PopoverButton>
    </li>
  );
}
