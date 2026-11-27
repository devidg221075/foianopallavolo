// Partite delle squadre che non hanno (ancora) un collegamento FIPAV automatico:
// la Prima Divisione femminile e le altre. I dati stanno in fixtures.json e si aggiornano con
//   python3 scripts/calendario/importa-xlsx.py calendario_gare.xlsx
// (la Serie C maschile invece arriva da FIPAV, vedi src/lib/fipav.js).
//
// Campi di una partita: id, team ("c", "f", "gm", "gf", "mini"), date "AAAA-MM-GG", time, home, away,
// venue, round (es. "Giornata 9"), status ("scheduled" o "played"), score ("3–1"), sets, official.
import fixtures from "./fixtures.json";

export const FIXTURES = fixtures;

export const TEAM_ROSTERS = {};
