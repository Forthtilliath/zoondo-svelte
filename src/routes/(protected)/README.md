# (protected)

Regroup all routes that require authentication.

``+layout.server.ts`` verifies that the user is authenticated, if not, redirect to login page, else pass user data to children.
``+layout.svelte`` add a sub navigation to protected routes.

## `/` (profile)

``+page.svelte`` display user profile with logout button.
``+page.server.ts`` contains the logout action.

## `/games`

Contains all functionalities related to games, which are :
- create a new game
- list all games created
- list all games joined
- join a game
- play a game

``+page.svelte`` list all games created. The user can join or open a game.
``+page.server.ts`` load the list of games and contains the action to create a new game

#### `/games/[id]`

Contains all functionalities related to play or replay a game.

``+page.server.ts`` loads the game with all actions done.
``+page.svelte`` display the game, the sample card and the chat.

#### `/games/current`

List all games in progress of the current user.

``+page.server.ts`` loads the current games with all actions done.
``+page.svelte`` display the list of games in progress.