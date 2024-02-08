declare global {
	interface ServerToClientEvents {
		serverNotice: (msg: string) => void;
		lastMessages: (messages: Array<DB.Message>) => void;
		newMessage: (msg: DB.Message) => void;
		newAction: (act: DB.Action) => void;
	}

	interface ClientToServerEvents {
		joinRoom: (room: string) => void;
		message: (content: string, author_id: string) => void;
		gameAction: (action: DB.Action) => void;
	}
}

export {};
