"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { normalizeTheme } from "./normalize-theme";

export async function writeTheme(data: FormData): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    path: "/",
    name: "theme",
    value: normalizeTheme(data.get("theme")),
  });

  revalidatePath("/", "layout");
}
