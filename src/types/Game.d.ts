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
			resolver?: () => void;
		};
		type PlayerCard = {
			card: Card;
			owner: number;
		};
		type OpponentCard = {
			card: null;
			owner: number;
		};
		type CardInstance = OpponentCard | PlayerCard;

		type Position = {
			x: number;
			y: number;
		};

		type Square = Position & CardInstance;

		type Board = Array<Square>;

		type Transition = [Position, Position];
	}
}
export {};
