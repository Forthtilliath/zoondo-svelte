## Todo

- check src/hooks.server.ts
- check src/app.d.ts

## Structure

<!-- ============================ -->
- hooks.server
  - auth : session logged
  - user : user logged
<!-- ============================ -->
- /api
  - /api/games
    - GET : get all games
  - /api/users
    - GET : get all users
<!-- ============================ -->
- root
  - load layout
    - user : user logged
  - load
    - games : all games
  - actions
    - /logout
      - delete session
      - redirect to /
    - /newgame
      - create a new game
<!-- ============================ -->
- (auth)
  - /signin
    - load
      - redirect to / if already signed in
    - actions
      - default
        - create account
        - create a session
        - redirect to /
  - /signup
    - load
      - redirect to / if already signed in
    - actions
      - default
        - create a session
        - redirect to /
<!-- ============================ -->
- /game
  - load
    - game : specific game

