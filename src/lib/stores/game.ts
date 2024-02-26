import { writable } from 'svelte/store';

export const currentFocus = writable<Game.Square | null>(null);
export const currentBoard = writable<Game.Board>([]);
