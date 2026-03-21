import { signal } from "@preact/signals";

export const selectedTab = signal(window.innerWidth < 768 ? "fixture":"principal");