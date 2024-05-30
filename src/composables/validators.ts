import * as mdiIcons from "@mdi/js";

export function isValidMdiIcon(iconname: string): boolean {
  return Object.keys(mdiIcons).includes(iconname);
}
