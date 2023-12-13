declare global {
	namespace Game {
		type Corner = number | '*';

		type Move = [X: number, Y: number];

		type Card = {
			slug: string;
			name: string;
			type: Type;
			corners: [NW: Corner, NE: Corner, SE: Corner, SW: Corner];
			value: number;
			moves: Array<Array<Move>>;
			power?: string;
			resolver?: function;
		};

		type Position = {
			x: number;
			y: number;
		};

		type Square = Position & {
			card?: Card;
		};

		type Board = Array<Square>;
	}
}
export {};
