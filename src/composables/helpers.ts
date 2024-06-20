import { useAuthStore } from "../stores/auth";

const auth_store = useAuthStore();

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

  export function dateStringToCalendarDate(date: Date): string {
    return `${new Date(date).toISOString().split("T")[0]} ${
      new Date(date).toISOString().split("T")[1].split(".")[0]
    }`;
  }

  export function timeToHours(date: Date): string {
    return `${new Date(date).getHours().toString().padStart(2, "0")}:${new Date(
      date
    )
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }

  export function timeToDateString(date: Date): string {
    return `${new Date(date).toLocaleDateString("nl")}`;
  }

  export function statsLabelsPastWeek(): string[] {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toLocaleDateString(
        auth_store.user?.language ? auth_store.user.language : "en",
        { weekday: "long" }
      );
    }).reverse();
  }

  export function normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
