import { writable } from 'svelte/store';

export const currentToasts = writable<Array<Toast.Item>>([]);

export const addToast = ({ msg, type }: Toast.Options): void => {
	const newId = crypto.randomUUID();
	currentToasts.update((old) => [...old, { msg, type, id: newId }]);
	setTimeout(() => {
		currentToasts.update((old) => old.filter((toast) => toast.id !== newId));
	}, 3000);
};
