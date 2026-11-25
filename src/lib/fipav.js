// Dati FIPAV della Serie C maschile (girone A): normalizzazione, esiti, nomi e loghi.
// I dati arrivano da /api/fipav.php (vedi public/api/fipav.php); se non è raggiungibile
// si usa la copia salvata in src/data/fipav-snapshot.json.

export const FIPAV_GIRONE_URL = "https://public.fipavonline.it/gironi/63592";
export const FIPAV_CLASSIFICA_URL = FIPAV_GIRONE_URL + "/classifica";

// Id FIPAV della nostra squadra (NORCINERIA TOSCANA FOIANO).
export const FOIANO_ID = "226262";

// Loghi delle società salvati in public/assets/clubs (id squadra FIPAV → file).
export const CLUB_LOGOS = {
  225959: "/assets/clubs/225959.jpg",
  226016: "/assets/clubs/226016.jpg",
  226034: "/assets/clubs/226034.jpg",
  226127: "/assets/clubs/226127.png",
  226215: "/assets/clubs/226215.png",
  226240: "/assets/clubs/226240.jpg",
  226262: "/assets/clubs/226262.jpg",
  226394: "/assets/clubs/226394.png",
  226485: "/assets/clubs/226485.jpg",
  226514: "/assets/clubs/226514.jpg",
  226609: "/assets/clubs/226609.jpg",
  226653: "/assets/clubs/226653.jpg",
  226662: "/assets/clubs/226662.png",
  226666: "/assets/clubs/226666.png",
};

// Nomi brevi degli avversari per le celle del calendario.
export const SHORT_NAMES = {
  "COLLEVOLLEY ASD": "ColleVolley",
  "GRANDI TURRIS PISA": "Turris Pisa",
  "TOSCANA GARDEN ARNO VOLLEY": "Arno Volley",
  "M.C. CARRARA CARNI VOLLEY": "Carrara Carni Volley",
  "POL. REMO MASI": "Pol. Remo Masi",
  "BAGLINI GROUP MIGLIARINO VOLLEY": "Migliarino Volley",
  "POLISPORTIVA SAVINESE": "Polisportiva Savinese",
  "CORTONA VOLLEY VITTORINI COSTRUZIONI": "Cortona Volley",
  "PALLAVOLO CASCINA": "Pallavolo Cascina",
  "INVICTA VOLLEYBALL": "Invicta Volleyball",
  "FIRENZE  PALLAVOLO 2026": "Firenze Pallavolo",
};

// Logo di una società a partire dal nome in tabella (serve per le gare che non arrivano da FIPAV).
const LOGO_BY_NAME = {
  "POLISPORTIVA SAVINESE": CLUB_LOGOS[225959],
  "POL. REMO MASI": CLUB_LOGOS[226016],
  "COLLEVOLLEY ASD": CLUB_LOGOS[226034],
  "CORTONA VOLLEY VITTORINI COSTRUZIONI": CLUB_LOGOS[226127],
  "TOSCANA GARDEN ARNO VOLLEY": CLUB_LOGOS[226215],
  "PALLAVOLO CASCINA": CLUB_LOGOS[226240],
  "NORCINERIA TOSCANA FOIANO": CLUB_LOGOS[226262],
  "MDT FOIANO PALLAVOLO": CLUB_LOGOS[226262],
  "FIRENZE VOLLEY": CLUB_LOGOS[226394],
  "BAGLINI GROUP MIGLIARINO VOLLEY": CLUB_LOGOS[226485],
  "ASD PALLAVOLO ROSIGNANO": CLUB_LOGOS[226514],
  "FIRENZE PALLAVOLO 2026": CLUB_LOGOS[226609],
  "M.C. CARRARA CARNI VOLLEY": CLUB_LOGOS[226653],
  "INVICTA VOLLEYBALL": CLUB_LOGOS[226662],
  "GRANDI TURRIS PISA": CLUB_LOGOS[226666],
};

// Completa le gare inserite a mano (src/data/fixtures.json) con loghi e campi mancanti.
export const withLogos = (fixtures) =>
  fixtures.map((fixture) => ({
    firstReferee: null,
    secondReferee: null,
    ...fixture,
    homeLogo:
      fixture.homeLogo ||
      LOGO_BY_NAME[fixture.home.replace(/\s+/g, " ").trim()],
    awayLogo:
      fixture.awayLogo ||
      LOGO_BY_NAME[fixture.away.replace(/\s+/g, " ").trim()],
  }));

export const OUTCOME_LABELS = {
  won: "Vinta",
  lost: "Persa",
  scheduled: "Da giocare",
  pending: "Risultato da confermare",
};

const toNumber = (value) =>
  value != null && String(value).trim() !== "" && Number.isFinite(Number(value))
    ? Number(value)
    : null;

// Nome dell'arbitro, oppure null se la FIPAV non lo ha ancora indicato.
const referee = (value) => {
  if (typeof value !== "string") return null;
  const name = value.trim();
  return name &&
    !/^(?:-|–|0|n\/?d|da (?:definire|designare|assegnare))$/i.test(name)
    ? name
    : null;
};

// Trasforma la risposta grezza FIPAV ({ calendar, tables, updatedAt }) in partite e classifica.
export function normalizeFipav(raw) {
  const matches = raw.calendar?.data?.matches;
  const teams = (
    Array.isArray(raw.tables) ? raw.tables[0]?.data : raw.tables?.data
  )?.teams;
  if (
    !Array.isArray(matches) ||
    !Array.isArray(teams) ||
    !teams.some((team) => String(team.id) === FOIANO_ID)
  )
    throw new Error("Dati FIPAV incompleti");
  return {
    updatedAt: raw.updatedAt,
    fixtures: matches
      .filter(
        (match) =>
          String(match.team1?.id) === FOIANO_ID ||
          String(match.team2?.id) === FOIANO_ID,
      )
      .map((match) => ({
        id: match.id,
        team: "c",
        date: match.date.split("/").reverse().join("-"),
        time: match.time.replace(".", ":"),
        home: match.team1.title.trim(),
        away: match.team2.title.trim(),
        homeLogo: CLUB_LOGOS[match.team1.id] || match.team1.logo,
        awayLogo: CLUB_LOGOS[match.team2.id] || match.team2.logo,
        venue: match.stadium,
        firstReferee: referee(match["1referee"]),
        secondReferee: referee(match["2referee"]),
        status: match.played ? "played" : "scheduled",
        score: match.played
          ? `${match["team1-setwin"]}–${match["team2-setwin"]}`
          : null,
        official: match.ris_ufficiale === "1",
        sets: match.pt_a.map((a, i) => `${a}–${match.pt_b[i]}`).join(", "),
        round: match.day,
      }))
      .sort(
        (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time),
      ),
    standings: {
      c: teams.map((team) => ({
        id: team.id,
        name: team.title.trim(),
        points: Number(team.p),
        played: Number(team.g),
        won: Number(team.gv),
        lost: Number(team.gp),
        setsWon: Number(team.sv),
        setsLost: Number(team.sp),
        setQuotient: toNumber(team.qs),
        pointsFor: toNumber(team.pf),
        pointsAgainst: toNumber(team.ps),
        pointQuotient: toNumber(team.qp),
        position: Number(team.pos),
      })),
    },
  };
}

// Prossima partita (non ancora giocata, da oggi in poi) di una squadra.
export function nextFixture(fixtures, teamId = "c") {
  const today = new Date().toLocaleDateString("sv-SE", {
    timeZone: "Europe/Rome",
  });
  return fixtures.find(
    (fixture) =>
      fixture.team === teamId &&
      fixture.status !== "played" &&
      fixture.date >= today,
  );
}

const isFoianoHome = (fixture) => fixture.home.includes("FOIANO");

// Esito dal punto di vista di Foiano: "won", "lost", "scheduled" o "pending".
export function outcome(fixture) {
  if (fixture.status !== "played") return "scheduled";
  const score = (fixture.score || "").split(/[–−-]/).map(Number);
  if (
    score.length !== 2 ||
    score.some((n) => !Number.isFinite(n)) ||
    score[0] === score[1]
  )
    return "pending";
  const ours = isFoianoHome(fixture) ? 0 : 1;
  return score[ours] > score[1 - ours] ? "won" : "lost";
}

export const opponentLogo = (fixture) =>
  fixture
    ? isFoianoHome(fixture)
      ? fixture.awayLogo
      : fixture.homeLogo
    : null;

export const opponentName = (fixture) =>
  fixture ? (isFoianoHome(fixture) ? fixture.away : fixture.home) : "";

export const opponentShortName = (fixture) => {
  const name = opponentName(fixture);
  return SHORT_NAMES[name] || name;
};

export const formatQuotient = (value) =>
  value != null && Number.isFinite(value)
    ? value.toLocaleString("it-IT", {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      })
    : "—";
