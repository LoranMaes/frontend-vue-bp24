export namespace Helpers {
  export function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function hexToRgb(hex: string) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    const result = regex.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  export function getContrastingColor(hex: string): "dark" | "light" {
    // Convert hex to rgb
    const rgb = hexToRgb(hex);
    if (!rgb) return "light";

    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? "light" : "dark";
  }
}
