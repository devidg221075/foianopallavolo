import { featuredNews } from "./news";

const ALL_HERO_SLIDES = [
  {
    k: "man",
    eyebrow: "Foiano Pallavolo · Dal 1976",
    lines: ["IL NOSTRO", "GIOCO.", "LA NOSTRA", "PASSIONE."],
    image: "giocatore-schiacciata",
    small: "squadra-serie-c",
    label: "Serie C maschile",
    cta: "Le nostre squadre",
    target: "squadre",
  },
  {
    k: "woman",
    eyebrow: "Prima Divisione femminile",
    lines: ["LA NOSTRA", "FORZA.", "ESSERE", "SQUADRA."],
    image: "hero-woman",
    small: "women",
    label: "Prima Divisione femminile",
    cta: "Scopri il femminile",
    target: "squadre",
  },
  {
    k: "young",
    eyebrow: "Minivolley · Settore giovanile",
    lines: ["PICCOLI", "PASSI.", "GRANDI", "EMOZIONI."],
    image: "hero-man",
    small: "youth",
    label: "Il futuro comincia qui",
    cta: "Vieni a giocare",
    target: "inizia",
  },
];

if (featuredNews) {
  ALL_HERO_SLIDES.push({
    k: "news",
    news: featuredNews,
    ...featuredNews.hero,
    label: featuredNews.title,
    href: "/dal-1976.html#" + featuredNews.id,
  });
}

// Slide mostrate oggi nella hero. Per ora c'è solo la foto di squadra della Serie C ("man").
// Quando ci saranno le foto di Prima Divisione femminile, giovanili e Minivolley, aggiungi qui
// i loro codici: "woman" (femminile), "young" (giovanili e Minivolley), "news" (notizia in evidenza).
// Con più di una slide tornano da soli frecce, pausa e scorrimento automatico.
const ENABLED_HERO_SLIDES = ["man"];

export const HERO_SLIDES = ALL_HERO_SLIDES.filter((slide) =>
  ENABLED_HERO_SLIDES.includes(slide.k),
);
