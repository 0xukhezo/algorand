export function displayKeys(string: string) {
  const words = string.split(/(?=[A-Z])/);
  const result = words
    .map((string: string) => string.charAt(0).toUpperCase() + string.slice(1))
    .join(" ");
  return result;
}
