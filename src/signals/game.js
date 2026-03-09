import { signal } from "@preact/signals";

export const selectedTab = signal(0);
export const invertLines = signal(false);
export const showFlags = signal(false);
export const showNumbers = signal(true);
export const showSubPlayers = signal(true);