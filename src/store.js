import { derived, writable } from 'svelte/store';

export const ladder = writable([]);

// localStorage.setItem('klyric_selected', null);
const storedSelection = localStorage.getItem('klyric_selected');
export const selected = writable(storedSelection);
selected.subscribe((value) => {
    localStorage.setItem('klyric_selected', value === null ? 0 : value);
});

export const isDark = derived(selected, ($sel) => deriveDark($sel));

function deriveDark(sel) {
    if (sel == 0) {
        return false;
    } else return true;
}

export function toggleDark(val) {
    if (val == 0) {
        selected.set(1);
        return 'Light';
    } else if (val == 1) {
        selected.set(0);
        return 'Dark';
    } else {
        console.log(
            `error toggling dark/light mode from value: ${val} of type ${typeof val}`
        );
    }
}
