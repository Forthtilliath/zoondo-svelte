export async function load({ fetch }) {
	const response = await fetch('/api/boards');
	const board: Game.Board = await response.json();

	const resChat = await fetch('/api/chat');
	const chat: Chat.Message[] = await resChat.json();

	return {
		board,
		chat
	};
}
