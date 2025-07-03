export function normalizeTheme(theme: unknown): "dark" | "light" | "system" {
  return theme === "dark" || theme === "light" ? theme : "system";
}
