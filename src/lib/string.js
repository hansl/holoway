
export function snakeCase(str: String): String {
  return str
    .replace(/^[A-Z]/, (x) => x.toLowerCase())
    .replace(/^[^a-z_]/, (x) => '_' + x)
    .replace(/([A-Z]+)/g, (x) => '_' + x.toLowerCase());
}

