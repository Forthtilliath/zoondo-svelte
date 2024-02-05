import db from '$lib/data/db';
import { generateBoard } from '$lib/game.js';
import { fail } from '@sveltejs/kit';

export const load = async ({ params, parent }) => {
	await parent();
	const rawData = await db.games.get(params.id);
	if (!rawData) return fail(404);

	const board: Game.Square[] = generateBoard(rawData);
	// TODO obfuscation selon le user

	return {
		board
	};
};
