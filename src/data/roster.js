// Rose delle prime squadre, mostrate come "figurine" nelle pagine Serie C maschile e Prima Divisione femminile.
// Le foto (già con il nome stampato) stanno in public/assets/rosa/<squadra>/<file>.webp (720 × 720 px).
// Per aggiungere o togliere un atleta basta una riga: file (senza .webp) e nome (usato per chi non vede l'immagine).
export const ROSTERS = {
  c: {
    folder: "serie-c",
    title: "I nostri atleti.",
    players: [
      ["ademi", "Amil Ademi"],
      ["amorevoli", "Simone Amorevoli"],
      ["bonucci", "Francesco Bonucci"],
      ["bracciali", "Filippo Bracciali"],
      ["capocchi", "Diego Capocchi"],
      ["casini", "Dante Casini"],
      ["donnini", "Guglielmo Donnini"],
      ["dorini", "Manuele Dorini"],
      ["felci", "David Felci"],
      ["manerchia", "Niccolò Manerchia Maserà"],
      ["milloni", "Davide Milloni"],
      ["moretti", "Luigi Moretti"],
      ["tanci-f", "Francesco Natali Tanci"],
      ["tanci-l", "Lorenzo Natali Tanci"],
      ["tiezzi", "Tommaso Tiezzi"],
    ],
  },
  f: {
    folder: "prima-femminile",
    title: "Le nostre atlete.",
    players: [
      ["barbi", "Giulia Barbi"],
      ["biagiotti", "Alessia Biagiotti"],
      ["bindi", "Martina Bindi"],
      ["brini", "Margherita Brini"],
      ["capitoni", "Noemi Capitoni"],
      ["cencini", "Sara Cencini"],
      ["censini", "Valentina Censini"],
      ["dragoni", "Giulia Dragoni"],
      ["grilli", "Livia Grilli"],
      ["mannelli", "Giulia Mannelli"],
      ["melzi", "Chiara Melzi"],
      ["monti", "Eleonora Monti"],
      ["redentori", "Debora Redentori"],
      ["soraj", "Klea Soraj"],
      ["tonini", "Martina Tonini"],
    ],
  },
};
