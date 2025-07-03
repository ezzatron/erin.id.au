import { cookies } from "next/headers";
import { normalizeTheme } from "./normalize-theme";
import type { Theme } from "./theme";

export async function readTheme(): Promise<Theme> {
  const cookieStore = await cookies();

  return normalizeTheme(cookieStore.get("theme")?.value);
}
