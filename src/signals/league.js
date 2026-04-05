import { signal } from "@preact/signals";

export const selectedRound = signal({key:"latest"});
export const selectedTab = signal(window.innerWidth < 768 ? "fixture":"principal");