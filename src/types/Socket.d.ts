declare global {
	interface ServerToClientEvents {
		serverNotice: (msg: string) => void;
		lastMessages: (messages: Array<DB.Message>) => void;
		newMessage: (msg: DB.Message) => void;
		syncAction: ({
			board,
			nextActionRestrictions
		}: {
			board: Game.Board;
			nextActionRestrictions: object | null;
		}) => void;
	}

	interface ClientToServerEvents {
		joinRoom: (room: string) => void;
		message: (content: string, author_id: string) => void;
		pushAction: (action: DB.Action) => void;
	}
}

export {};
