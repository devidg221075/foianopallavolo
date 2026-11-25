// Calendario delle partite.
//
// Ogni partita è un oggetto con questi campi:
//   id      identificativo unico, es. "c-2026-10-18"
//   date    "AAAA-MM-GG"
//   team    squadra del club a cui appartiene la gara (decide l'etichetta
//           "Gara" nel calendario): "c" Serie C maschile, "f" Prima Div.
//           femminile, "gm" Giovanili M, "gf" Giovanili F, "mini" Minivolley
//   home    squadra di casa
//   away    squadra ospite
//   status  "played" per le gare giocate (mostra il punteggio), altro per le future
//   score   es. "3-1" (solo se status è "played")
//   time    es. "21:00" (facoltativo)
//   venue   palestra (facoltativo)
//   round   es. "Giornata 5" (facoltativo, appare accanto all'etichetta della gara)
//
// Finché l'elenco è vuoto le pagine mostrano "calendario in aggiornamento".
export const FIXTURES = [];

export const TEAM_ROSTERS = {};
