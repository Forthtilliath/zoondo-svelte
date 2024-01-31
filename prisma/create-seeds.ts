import { log } from 'console';

export const availableCards = {
	cloboulon: {
		slug: 'cloboulon',
		name: 'Cloboulon',
		type: 'chief',
		corners: [4, 5, '*', 2],
		power:
			'Le combat se solde par une égalité. Si tu viens de déplacer Cloboulon, tu déplaces un Grognard.',
		resolver: () => {
			console.log('ARBIIIIIIIIITRE !!!!!!!');
			console.log('Cloboulon says: Si tu viens de déplacer Cloboulon, tu déplaces un Grognard.');
			return 0;
		},
		value: 20,
		moves: [[[-1, 0]], [[-1, 1]], [[0, 1]], [[1, 1]], [[1, 0]], [[1, -1]], [[0, -1]], [[-1, -1]]]
	},
	'gold-hure': {
		slug: 'gold-hure',
		name: 'Gold-Hure',
		type: 'hero',
		corners: [4, 4, 2, '*'],
		power:
			'Le combat se solde par une égalité. Si tu viens de déplacer Gold-Hure, tu le déplaces à nouveau.',
		resolver: () => {
			console.log('ARBIIIIIIIIITRE !!!!!!!');
			console.log('Gold-Hure says: Si tu viens de déplacer Cloboulon, tu déplaces un Grognard.');

			return 0;
		},
		value: 24,
		moves: [
			[[-1, 0]],
			[
				[-1, 1],
				[-2, 2]
			],
			[
				[0, 1],
				[0, 2]
			],
			[
				[1, 1],
				[2, 2]
			],
			[[1, 0]],
			[[1, -1]],
			[
				[0, -1],
				[0, -2]
			],
			[[-1, -1]]
		]
	},
	bouclefeuille: {
		slug: 'bouclefeuille',
		name: 'Bouclefeuille',
		type: 'priest',
		corners: [2, 0, 0, '*'],
		resolver: () => {
			console.log('ARBIIIIIIIIITRE !!!!!!!');
			console.log(
				'Bouclefeuille says: Si tu viens de déplacer Cloboulon, tu déplaces un Grognard.'
			);

			return 0;
		},
		power:
			'Le combat se solde par une égalité. Tu déplaces Bouclefeuille dans une case libre du champ de bataille.',
		value: 2,
		moves: [[[-1, 0]], [[1, 0]]]
	},
	'grognard:0': {
		slug: 'grognard',
		name: 'Grognard',
		type: 'elite',
		corners: [3, 4, 2, 1],
		value: 16,
		moves: [
			[[-1, 0]],
			[
				[-1, 1],
				[-2, 2]
			],
			[[0, 1]],
			[
				[1, 1],
				[2, 2]
			],
			[[1, 0]]
		]
	},
	'grognard:1': {
		slug: 'grognard',
		name: 'Grognard',
		type: 'elite',
		corners: [4, 3, 1, 2],
		value: 16,
		moves: [
			[[-1, 0]],
			[
				[-1, 1],
				[-2, 2]
			],
			[[0, 1]],
			[
				[1, 1],
				[2, 2]
			],
			[[1, 0]]
		]
	},
	'kassin:0': {
		slug: 'kassin:0',
		name: 'Kassin',
		type: 'soldier',
		corners: [1, 2, 0, 0],
		value: 7,
		moves: [[[-1, 0]], [[0, 1]], [[1, 0]], [[0, -1]]]
	},
	'kassin:1': {
		slug: 'kassin:1',
		name: 'Kassin',
		type: 'soldier',
		corners: [2, 1, 0, 0],
		value: 7,
		moves: [[[-1, 0]], [[0, 1]], [[1, 0]], [[0, -1]]]
	},
	sacrechene: {
		slug: 'sacrechene',
		name: 'Sacrechêne',
		type: 'emblem',
		corners: [4, 2, 0, 0],
		value: 12,
		moves: []
	}
};

for (const card of Object.values(availableCards)) {
	const seedling = {
		where: {
			card_id: card.slug
		},
		update: {},
		create: {
			card_id: card.slug,
			moves: '[[0;1][1;1]]',
			name: card.name,
			stats: '2/4/3/*'
		}
	};
	log(`await prisma.card.upsert(${JSON.stringify(seedling)});`);
}
