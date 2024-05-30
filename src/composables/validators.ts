import * as mdiIcons from "@mdi/js";

export function isValidMdiIcon(iconname: string): boolean {
  return Object.keys(mdiIcons).includes(iconname);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8 && password.length <= 30;
}
