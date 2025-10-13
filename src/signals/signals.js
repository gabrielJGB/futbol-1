import { signal } from "@preact/signals";

export const selectedDate = signal(new Date());
export const selectedButton = signal(-1);
export const showMenu = signal(false);
