import { Container } from "@/components/Container";
import { Avatar } from "./Avatar";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <>
      <header className="pointer-events-none relative z-50 flex flex-none flex-col">
        <div className="top-0 z-10 h-16 pt-6">
          <Container className="w-full">
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                <Avatar />
              </div>

              <div className="flex flex-1 justify-end md:justify-center">
                <MobileNavigation />
                <DesktopNavigation />
              </div>

              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
    </>
  );
}
