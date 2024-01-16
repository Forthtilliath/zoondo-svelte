-- CreateTable
CREATE TABLE "Action" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "game_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "result" INTEGER NOT NULL,
    CONSTRAINT "Action_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Action_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
