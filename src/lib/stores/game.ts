import { writable } from 'svelte/store';

export const currentFocus = writable<Game.Card | null>(null);
