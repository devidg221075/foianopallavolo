import { useState } from "react";
import {
  ArrowUpRightIcon,
  CalendarBlankIcon,
  CaretLeftIcon,
  CaretRightIcon,
  MapPinIcon,
  ShieldCheckIcon,
  VolleyballIcon,
} from "@phosphor-icons/react";
import { ClubLogo } from "../../components/ClubLogo";
import { Referees } from "../../components/Referees";
import { SectionHeading } from "../../components/SectionHeading";
import { StandingTeaser } from "../../components/StandingsTable";
import { ASSET_BASE } from "../../config";
import { TEAMS } from "../../data/teams";
import { useFipav } from "../../hooks/useFipav";
import { MONTH_NAMES, WEEKDAYS } from "../../lib/calendar";
import {
  OUTCOME_LABELS,
  nextFixture,
  opponentLogo,
  opponentName,
  opponentShortName,
  outcome,
} from "../../lib/fipav";

export function MatchCenter({ openContact, openStandings }) {
  const { fixtures, standings } = useFipav();
  const [matchTeamId, setMatchTeamId] = useState(
    () => new URLSearchParams(location.search).get("squadra") || "c",
  );
  const [matchView, setMatchView] = useState(() =>
    new URLSearchParams(location.search).get("vista") === "risultati"
      ? "risultati"
      : "calendario",
  );
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const featuredTeam =
    TEAMS.find((item) => item.id === matchTeamId) || TEAMS[0];
  // Partita mostrata nel tabellone: l'ultima giocata (Risultati) oppure la prossima (Calendario).
  const featured =
    matchView === "risultati"
      ? fixtures
          .filter((f) => f.team === matchTeamId && f.status === "played")
          .at(-1)
      : nextFixture(fixtures, matchTeamId);
  const changeMonth = (delta) => {
    let nextMonth = month + delta;
    let nextYear = year;
    if (nextMonth < 0) {
      nextMonth = 11;
      nextYear--;
    }
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear++;
    }
    setMonth(nextMonth);
    setYear(nextYear);
    setSelectedDay(null);
  };
  const firstWeekdayOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayKey = (day) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const fixturesOn = (day) =>
    fixtures.filter((f) => f.team === matchTeamId && f.date === dayKey(day));
  const featuredScore =
    featured?.status === "played"
      ? featured.home.includes("FOIANO")
        ? featured.score
        : featured.score.split("–").reverse().join("–")
      : "VS";
  return (
    <section className="match-section" id="partite">
      <div className="section-wrap">
        <SectionHeading
          aside={
            <span className="season-label">
              <span /> STAGIONE 2026 / 2027
            </span>
          }
        >
          Il volley della settimana.
        </SectionHeading>
        <div className="match-toolbar">
          <div
            className="team-tabs"
            role="tablist"
            aria-label="Seleziona squadra"
          >
            {[
              ["c", "Serie C maschile"],
              ["f", "1ª Divisione femminile"],
              ["gm", "Giovanili"],
              ["mini", "Minivolley"],
            ].map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={matchTeamId === id}
                onClick={() => setMatchTeamId(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="view-tabs" aria-label="Visualizzazione">
            <button
              className={matchView === "calendario" ? "active" : ""}
              onClick={() => setMatchView("calendario")}
            >
              <CalendarBlankIcon /> Calendario
            </button>
            <button
              className={matchView === "risultati" ? "active" : ""}
              onClick={() => setMatchView("risultati")}
            >
              <VolleyballIcon /> Risultati
            </button>
          </div>
        </div>
        <StandingTeaser rows={standings.c} onOpen={openStandings} />
        <div key={matchTeamId + matchView} className="match-layout">
          <div className="scoreboard">
            <div className="scoreboard-top">
              <span>
                {matchView === "calendario"
                  ? "PROSSIMA PARTITA"
                  : "ULTIMO RISULTATO"}
              </span>
              <span className="outlined-label">
                {featuredTeam.short || featuredTeam.name}
              </span>
            </div>
            <div className="match-clubs">
              <div>
                <img
                  src={ASSET_BASE + "logo-bianco.png"}
                  alt="Foiano Pallavolo"
                />
                <strong>FOIANO</strong>
              </div>
              <div className="score-digits">
                <span>{featuredScore}</span>
              </div>
              <div className="opponent">
                <ClubLogo src={opponentLogo(featured)} />
                <strong>
                  {featured ? opponentName(featured) : "DA DEFINIRE"}
                </strong>
              </div>
            </div>
            <div className="scoreboard-status">
              <span className="status-line" />
              <p>
                {featured
                  ? featured.status === "played"
                    ? featured.home + " – " + featured.away
                    : featured.round
                  : matchView === "calendario"
                    ? "Il prossimo appuntamento sta arrivando."
                    : "Pronti a raccontare ogni punto."}
                <small>
                  {featured
                    ? featured.status === "played"
                      ? "Set: " +
                        featured.sets +
                        (featured.official
                          ? " · Ufficiale"
                          : " · In attesa di omologazione")
                      : "Fonte FIPAV · " + featured.time
                    : matchView === "calendario"
                      ? "Calendario ufficiale in aggiornamento."
                      : "Risultati ufficiali non ancora pubblicati."}
                </small>
              </p>
            </div>
            <Referees fixture={featured} />
            <div className="scoreboard-bottom">
              <CalendarBlankIcon />{" "}
              {featured?.date.split("-").reverse().join("/") ||
                "Data da confermare"}{" "}
              <span />
              <MapPinIcon /> {featured?.venue || "Campo da confermare"}
            </div>
          </div>
          <div className="calendar-panel">
            <div className="calendar-heading">
              <div>
                <span className="red-label">IN AGENDA</span>
                <h3>
                  {MONTH_NAMES[month]} <b>{year}</b>
                </h3>
              </div>
              <div>
                <button
                  aria-label="Mese precedente"
                  onClick={() => changeMonth(-1)}
                >
                  <CaretLeftIcon />
                </button>
                <button
                  aria-label="Mese successivo"
                  onClick={() => changeMonth(1)}
                >
                  <CaretRightIcon />
                </button>
              </div>
            </div>
            <div className="calendar-grid">
              {WEEKDAYS.map((item, index) => (
                <span key={"n" + index} className="day-name">
                  {item}
                </span>
              ))}
              {Array.from({ length: firstWeekdayOffset }, (_, index) => (
                <span key={"b" + index} />
              ))}
              {Array.from({ length: daysInMonth }, (_, index) => {
                const day = index + 1;
                const isToday =
                  year === new Date().getFullYear() &&
                  month === new Date().getMonth() &&
                  day === new Date().getDate();
                return (
                  <button
                    key={day}
                    aria-label={`${day} ${MONTH_NAMES[month]} ${year}`}
                    aria-pressed={selectedDay === day}
                    className={
                      (selectedDay === day ? "selected " : "") +
                      (isToday ? "today" : "")
                    }
                    onClick={() => setSelectedDay(day)}
                  >
                    {day}
                    {fixturesOn(day).map((f) => (
                      <small
                        key={f.id}
                        className={"home-calendar-result outcome-" + outcome(f)}
                      >
                        <span
                          className="home-event-opponent"
                          title={opponentName(f)}
                        >
                          {opponentShortName(f)}
                        </span>
                        <b>{f.score || f.time}</b>
                        <span className="home-event-status">
                          {OUTCOME_LABELS[outcome(f)]}
                        </span>
                      </small>
                    ))}
                  </button>
                );
              })}
            </div>
            <div className="outcome-legend">
              <span className="outcome-won">Vinta</span>
              <span className="outcome-lost">Persa</span>
              <span className="outcome-scheduled">Da giocare</span>
            </div>
            <div className="day-detail" aria-live="polite">
              {selectedDay ? (
                <>
                  <strong>
                    {selectedDay} {MONTH_NAMES[month].toLowerCase()}
                  </strong>
                  <div className="home-day-fixtures">
                    {fixturesOn(selectedDay).map((f) => (
                      <div key={f.id}>
                        <ClubLogo src={f.homeLogo} name={f.home} />
                        <span>
                          {f.home}{" "}
                          <b>{f.status === "played" ? f.score : "VS"}</b>{" "}
                          {f.away}
                          <small>
                            {f.time} · {OUTCOME_LABELS[outcome(f)]}
                          </small>
                        </span>
                        <ClubLogo src={f.awayLogo} name={f.away} />
                      </div>
                    ))}
                    {!fixturesOn(selectedDay).length && (
                      <span>Nessuna gara pubblicata per questa data.</span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <strong>Il tuo prossimo appuntamento.</strong>
                  <span>Seleziona un giorno per consultare il calendario.</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="match-notice">
          <ShieldCheckIcon size={18} />
          <span>
            Qui troverai date, risultati e classifiche ufficiali di tutte le
            nostre squadre.
          </span>
          <button
            onClick={() => openContact("Informazioni partite e calendari")}
          >
            Chiedi informazioni <ArrowUpRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
