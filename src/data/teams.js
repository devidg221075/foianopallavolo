export const TEAM_SLUGS = {
  c: "serie-c-maschile",
  f: "prima-divisione-femminile",
  gm: "giovanili-maschili",
  gf: "giovanili-femminili",
  mini: "minivolley",
};

export const MATCH_TEAMS = [
  {
    id: "c",
    gara: "SERIE C MASCHILE",
    badge: "SERIE C",
    name: "Serie C maschile",
    short: "Serie C",
    label: "Prima squadra maschile",
    path: "serie-c-maschile",
  },
  {
    id: "f",
    gara: "PRIMA DIV. FEMMINILE",
    badge: "1ª DIV. F",
    name: "Prima Divisione femminile",
    short: "1ª Divisione",
    label: "Prima squadra femminile",
    path: "prima-divisione-femminile",
  },
  {
    id: "gm",
    gara: "GIOVANILI MASCHILI",
    badge: "GIOV. M",
    name: "Giovanili maschili",
    short: "Giovanili M",
    label: "Settore giovanile",
    path: "giovanili-maschili",
  },
  {
    id: "gf",
    gara: "GIOVANILI FEMMINILI",
    badge: "GIOV. F",
    name: "Giovanili femminili",
    short: "Giovanili F",
    label: "Settore giovanile",
    path: "giovanili-femminili",
  },
  {
    id: "mini",
    gara: "MINIVOLLEY",
    badge: "MINI",
    name: "Minivolley",
    short: "Minivolley",
    label: "Bambini e bambine",
    path: "minivolley",
  },
];

export const TEAM_LABELS = {
  c: "Prima squadra maschile",
  f: "Prima squadra femminile",
  gm: "Giovanili maschili",
  gf: "Giovanili femminili",
  mini: "Minivolley",
};

export const TEAMS = [
  {
    id: "c",
    name: "Serie C maschile",
    tag: "Prima squadra · Maschile",
    image: "men",
    short: "Serie C",
    text: "Il nostro gioco. La nostra passione. La prima squadra maschile di Foiano Pallavolo.",
    group: "maschile",
  },
  {
    id: "f",
    name: "Prima Divisione femminile",
    tag: "Prima squadra · Femminile",
    image: "women",
    short: "1ª Divisione",
    text: "Energia, carattere e spirito di squadra. La nostra prima squadra femminile.",
    group: "femminile",
  },
  {
    id: "gm",
    name: "Giovanili maschili",
    tag: "Settore giovanile",
    image: "giovanili-maschili",
    text: "Un percorso di crescita, in palestra e in squadra. Per conoscere categorie e orari, contatta la società.",
    group: "giovanili",
  },
  {
    id: "gf",
    name: "Giovanili femminili",
    tag: "Settore giovanile",
    image: "giovanili-femminili",
    text: "La passione si allena, ogni giorno. Chiedi informazioni sui gruppi giovanili femminili.",
    group: "giovanili",
  },
  {
    id: "mini",
    name: "Minivolley",
    tag: "Bambini e bambine",
    image: "mini",
    text: "Il primo punto è divertirsi. Scopri come avvicinarti alla pallavolo e chiedi gli orari alla società.",
    group: "mini",
  },
];

// Nome con cui il club compare nelle tabelle ufficiali FIPAV (serve per riconoscere "la nostra" squadra
// quando si importano calendari e classifiche).
export const OFFICIAL_CLUB_NAMES = {
  c: "NORCINERIA TOSCANA FOIANO",
  f: "MDT FOIANO PALLAVOLO",
};
