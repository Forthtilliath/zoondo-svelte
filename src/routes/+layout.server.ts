import db from "$lib/data/db";

//? NOTE this is only used for developement
export function load() {
  return {
    lastGameId: db.games.getLastId(),
  };
}