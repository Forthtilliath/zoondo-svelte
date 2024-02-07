/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Card_card_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Card";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CardInstance" (
    "cardinstance_id" TEXT NOT NULL PRIMARY KEY,
    "position" TEXT NOT NULL,
    "card_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    CONSTRAINT "CardInstance_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("game_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CardInstance_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CardInstance" ("card_id", "cardinstance_id", "game_id", "owner_id", "position") SELECT "card_id", "cardinstance_id", "game_id", "owner_id", "position" FROM "CardInstance";
DROP TABLE "CardInstance";
ALTER TABLE "new_CardInstance" RENAME TO "CardInstance";
CREATE UNIQUE INDEX "CardInstance_cardinstance_id_key" ON "CardInstance"("cardinstance_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
