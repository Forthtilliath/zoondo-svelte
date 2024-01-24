/*
  Warnings:

  - You are about to drop the `_playersInGame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `from` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `result` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `victory` on the `Game` table. All the data in the column will be lost.
  - Added the required column `type` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_playersInGame_B_index";

-- DropIndex
DROP INDEX "_playersInGame_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_playersInGame";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GameDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "game_id" TEXT NOT NULL,
    "first_player" TEXT NOT NULL,
    "victory" TEXT,
    CONSTRAINT "GameDetail_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GameDetail_first_player_fkey" FOREIGN KEY ("first_player") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameDetail_victory_fkey" FOREIGN KEY ("victory") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ActionMove" (
    "action_id" INTEGER NOT NULL,
    "target" TEXT NOT NULL,
    "move" TEXT NOT NULL,
    "result" INTEGER NOT NULL,
    CONSTRAINT "ActionMove_action_id_fkey" FOREIGN KEY ("action_id") REFERENCES "Action" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ActionCard" (
    "action_id" INTEGER NOT NULL,
    "card_id" INTEGER NOT NULL,
    "target" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "result" INTEGER NOT NULL,
    CONSTRAINT "ActionCard_action_id_fkey" FOREIGN KEY ("action_id") REFERENCES "Action" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_games_played_by_user" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_games_played_by_user_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_games_played_by_user_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Action" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "game_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "Action_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "GameDetail" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Action_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Action" ("game_id", "id", "player_id") SELECT "game_id", "id", "player_id" FROM "Action";
DROP TABLE "Action";
ALTER TABLE "new_Action" RENAME TO "Action";
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    CONSTRAINT "Game_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("created_at", "id", "name") SELECT "created_at", "id", "name" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_id_key" ON "Game"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "GameDetail_id_key" ON "GameDetail"("id");

-- CreateIndex
CREATE INDEX "GameDetail_game_id_idx" ON "GameDetail"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "ActionMove_action_id_key" ON "ActionMove"("action_id");

-- CreateIndex
CREATE INDEX "ActionMove_action_id_idx" ON "ActionMove"("action_id");

-- CreateIndex
CREATE UNIQUE INDEX "ActionCard_action_id_key" ON "ActionCard"("action_id");

-- CreateIndex
CREATE INDEX "ActionCard_action_id_idx" ON "ActionCard"("action_id");

-- CreateIndex
CREATE UNIQUE INDEX "_games_played_by_user_AB_unique" ON "_games_played_by_user"("A", "B");

-- CreateIndex
CREATE INDEX "_games_played_by_user_B_index" ON "_games_played_by_user"("B");
