import clsx from "clsx";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: Props) {
  return (
    <ContainerOuter className={className}>
      <ContainerInner>{children}</ContainerInner>
    </ContainerOuter>
  );
}

export function ContainerOuter({ className, children }: Props) {
  return (
    <div className={clsx("sm:px-8", className)}>
      <div className="mx-auto w-full max-w-7xl lg:px-8">{children}</div>
    </div>
  );
}

export function ContainerInner({ className, children }: Props) {
  return (
    <div className={clsx("relative px-4 sm:px-8 lg:px-12", className)}>
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  );
}
