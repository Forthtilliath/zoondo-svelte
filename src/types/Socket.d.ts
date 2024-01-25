declare global {
	interface ServerToClientEvents {
		serverNotice: (msg: string) => void;
		joinRoom: (room: string) => void;
		lastMessages: (messages: Array<DB.Message>) => void;
		message: (content: string, user_id: string) => void;
		newMessage: (msg: DB.MessageCreate) => void;
	}
}

export {};
