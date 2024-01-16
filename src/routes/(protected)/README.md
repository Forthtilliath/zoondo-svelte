# (protected)

Regroup all routes that require authentication. If not authenticated, redirect to login page, else pass user data to children.

The layout add a sub navigation to protected routes.

## (profile) `/`

``+page.svelte`` display user profile with logout button.
``+page.server.ts`` contains the logout action.

## games `/games`

Contains all functionalities related to games, which are :
- create a new game
- list all games created
- list all games joined
- join a game
- play a game

``+layout.server.ts`` verifies that the user is authenticated, if not, redirect to login page.
``+layout.svelte`` add a button to create a new game.
``+page.svelte`` list all games created.
``+page.server.ts`` fetch the list of games and contains the action to create a new game