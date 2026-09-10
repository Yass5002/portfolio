type Falsy = false | null | undefined | 0 | "";

export function cn(...classes: (string | Falsy)[]): string {
  return classes.filter(Boolean).join(" ");
}
