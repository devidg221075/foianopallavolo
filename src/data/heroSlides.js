import { featuredNews } from "./news";

export const HERO_SLIDES = [
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
  HERO_SLIDES.push({
    k: "news",
    news: featuredNews,
    ...featuredNews.hero,
    label: featuredNews.title,
    href: "/dal-1976.html#" + featuredNews.id,
  });
}
