export const NEWS = [
  {
    id: "cinquanta-anni",
    iso: "2026-09-28",
    hero: {
      eyebrow: "Dal club · Speciale 50 anni",
      lines: ["50 ANNI.", "UNA SOLA", "PASSIONE."],
      shortLabel: "50 anni di Foiano Pallavolo",
      cta: "Rivivi il cinquantesimo",
      word: "50 ANNI",
      dateLabel: "La festa del 26 settembre 2026",
    },
    heroUntil: "2026-12-31",
    date: "28 settembre 2026",
    tag: "50 ANNI",
    title: "Una festa che attraversa le generazioni.",
    text: "La serata del 26 settembre ha ripercorso cinquant’anni di pallavolo foianese, a conclusione della Giornata dello Sport.",
    source: "La Nazione",
    url: "https://www.lanazione.it/arezzo/cronaca/foiano-lo-sport-riempie-il-centro-storico-un-grande-successo-lagiornata-dello-sport-p4vqq2eg",
  },
  {
    id: "palazzetto-vannuccini",
    iso: "2026-09-25",
    date: "25 settembre 2026",
    tag: "LA NOSTRA CASA",
    title: "Il palazzetto porta il nome di Caronte.",
    text: "L’intitolazione a Loredano Vannuccini lega il ricordo del fondatore al luogo in cui continuano a crescere i nostri ragazzi.",
    source: "La Nazione",
    url: "https://www.lanazione.it/arezzo/cronaca/palazzetto-intitolato-a-vannuccini-91ae8d50",
  },
  {
    id: "ricordo-vannuccini",
    iso: "2025-10-08",
    date: "8 ottobre 2025",
    tag: "IL RICORDO",
    title: "L’abbraccio di Foiano a Loredano.",
    text: "La comunità saluta il suo storico presidente: una vita dedicata alla società, allo sport e alle nuove generazioni.",
    source: "La Nazione",
    url: "https://www.lanazione.it/arezzo/cronaca/laddio-a-vannuccini-oggi-i-3db8a234",
  },
];

function getFeaturedNews(date = new Date()) {
  const today = date.toISOString().slice(0, 10);
  return NEWS.find(
    (item) => item.hero && (!item.heroUntil || item.heroUntil >= today),
  );
}

export const featuredNews = getFeaturedNews();
