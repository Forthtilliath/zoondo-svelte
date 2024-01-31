-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "active_expires" BIGINT NOT NULL,
    "idle_expires" BIGINT NOT NULL,
    CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Key" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hashed_password" TEXT,
    "user_id" TEXT NOT NULL,
    "expires" BIGINT,
    CONSTRAINT "Key_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Game" (
    "game_id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "current_turn" INTEGER NOT NULL DEFAULT 0,
    "game_status" TEXT NOT NULL DEFAULT 'Ongoing',
    "player1_id" TEXT NOT NULL,
    "player2_id" TEXT NOT NULL,
    CONSTRAINT "Game_player1_id_fkey" FOREIGN KEY ("player1_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_player2_id_fkey" FOREIGN KEY ("player2_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Action" (
    "action_id" TEXT NOT NULL PRIMARY KEY,
    "game_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "cardinstance_id" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    CONSTRAINT "Action_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("game_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Action_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Action_cardinstance_id_fkey" FOREIGN KEY ("cardinstance_id") REFERENCES "CardInstance" ("cardinstance_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Card" (
    "card_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "stats" TEXT NOT NULL,
    "moves" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CardInstance" (
    "cardinstance_id" TEXT NOT NULL PRIMARY KEY,
    "position" TEXT NOT NULL,
    "card_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    CONSTRAINT "CardInstance_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Card" ("card_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CardInstance_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("game_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CardInstance_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "room" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Message_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE INDEX "Session_user_id_idx" ON "Session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Key_id_key" ON "Key"("id");

-- CreateIndex
CREATE INDEX "Key_user_id_idx" ON "Key"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Game_game_id_key" ON "Game"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "Action_action_id_key" ON "Action"("action_id");

-- CreateIndex
CREATE UNIQUE INDEX "Card_card_id_key" ON "Card"("card_id");

-- CreateIndex
CREATE UNIQUE INDEX "CardInstance_cardinstance_id_key" ON "CardInstance"("cardinstance_id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");
