// Galleria fotografica, divisa in categorie e album.
//
// Per aggiungere un album:
//   1. crea la cartella public/assets/galleria/<id-album>/
//   2. per ogni foto metti due file .webp: "01.webp" (grande, ~1600 px sul lato lungo)
//      e "01-t.webp" (miniatura, ~800 px)
//   3. aggiungi l'album qui sotto, con una riga per foto.
//
// Una categoria compare nella pagina solo se ha almeno un album.

export const GALLERY_CATEGORIES = [
  { id: "formazione", label: "Formazione" },
  { id: "squadre", label: "Squadre" },
  { id: "partite", label: "Partite" },
  { id: "eventi", label: "Eventi e feste" },
  { id: "storia", label: "Dal 1976" },
];

export const ALBUMS = [
  {
    id: "fipav-3g",
    title: "FIPAV 3G",
    category: "formazione",
    description:
      "Le foto del corso FIPAV 3G, al Centro di Preparazione Olimpica di Roma.",
    cover: "03",
    photos: [
      {
        file: "01",
        width: 1130,
        height: 1500,
        alt: "Tre persone in posa davanti a una parete di mattoni, con le maglie del corso",
      },
      {
        file: "02",
        width: 1314,
        height: 1745,
        alt: "Tre persone sorridenti in posa in un'aula, con le maglie del corso",
      },
      {
        file: "03",
        width: 1153,
        height: 1531,
        alt: "Due persone in maglia rossa Foiano Pallavolo davanti all'insegna del Centro di Preparazione Olimpica di Roma",
      },
      {
        file: "04",
        width: 1600,
        height: 424,
        alt: "Foto di gruppo dei partecipanti al corso, in aula",
      },
    ],
  },
];

export const albumPhotoSrc = (album, photo) =>
  "/assets/galleria/" + album.id + "/" + photo.file + ".webp";

export const albumThumbSrc = (album, photo) =>
  "/assets/galleria/" + album.id + "/" + photo.file + "-t.webp";
