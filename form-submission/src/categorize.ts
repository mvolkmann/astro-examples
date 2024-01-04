export function categorizeByAge(age: number): string {
  if (age <= 12) return "a child";
  if (age <= 19) return "a teenager";
  if (age <= 65) return "an adult";
  return "a senior";
}
