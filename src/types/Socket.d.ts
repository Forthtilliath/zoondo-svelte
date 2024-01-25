declare global {
	interface ServerToClientEvents {
		serverNotice: (msg: string) => void;
		lastMessages: (messages: Array<DB.Message>) => void;
		newMessage: (msg: DB.Message) => void;
	}

	interface ClientToServerEvents {
		joinRoom: (room: string) => void;
		message: (content: string, user_id: string) => void;
	}
}

export {};
