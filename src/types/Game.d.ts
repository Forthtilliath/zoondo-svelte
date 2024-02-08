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
			// card: Card;
			card: DB.CardInstance;
			owner: number;
		};
		type OpponentCard = {
			card: null;
			owner: number;
		};
		type NoCard = {
			card: null;
		};
		type SquareContent = OpponentCard | PlayerCard | NoCard;

		type Position = {
			x: number;
			y: number;
		};

		type Square = Position & SquareContent;
		// type Board = Array<BoardSquare>;

		type Transition = [Position, Position];
	}
}
export {};
