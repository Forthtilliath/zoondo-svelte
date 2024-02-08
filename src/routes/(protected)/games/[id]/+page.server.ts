import { generateBoard } from '$lib/methods/generateBoard.js';

export const load = async ({ params, parent }) => {
	await parent();

	return {
		board: generateBoard(params.id)
	};
};
