import { writable } from 'svelte/store';

export const isDark = writable(false);

export function toggleDark() {
    if (isDark) {
        isDark.set(false);
    } else {
        isDark.set(true);
    }
}