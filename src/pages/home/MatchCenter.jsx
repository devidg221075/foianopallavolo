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
import { SectionHeading } from "../../components/SectionHeading";
import { ASSET_BASE } from "../../config";
import { TEAMS } from "../../data/teams";
import { MONTH_NAMES, WEEKDAYS } from "../../lib/calendar";

export function MatchCenter({ openContact }) {
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
            ].map(([E, _]) => (
              <button
                key={E}
                role="tab"
                aria-selected={matchTeamId === E}
                onClick={() => setMatchTeamId(E)}
              >
                {_}
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
                <span>–</span>
                <i>{matchView === "calendario" ? "VS" : "—"}</i>
                <span>–</span>
              </div>
              <div className="opponent">
                <VolleyballIcon weight="thin" />
                <strong>DA DEFINIRE</strong>
              </div>
            </div>
            <div className="scoreboard-status">
              <span className="status-line" />
              <p>
                {matchView === "calendario"
                  ? "Il prossimo appuntamento sta arrivando."
                  : "Pronti a raccontare ogni punto."}
                <small>
                  {matchView === "calendario"
                    ? "Calendario ufficiale in aggiornamento."
                    : "Risultati ufficiali non ancora pubblicati."}
                </small>
              </p>
            </div>
            <div className="scoreboard-bottom">
              <CalendarBlankIcon /> Data da confermare <span />
              <MapPinIcon /> Campo da confermare
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
              {Array.from(
                {
                  length: firstWeekdayOffset,
                },
                (_, index) => (
                  <span key={"b" + index} />
                ),
              )}
              {Array.from(
                {
                  length: daysInMonth,
                },
                (_, index) => {
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
                      {isToday && <span />}
                    </button>
                  );
                },
              )}
            </div>
            <div className="day-detail" aria-live="polite">
              {selectedDay ? (
                <>
                  <strong>
                    {selectedDay} {MONTH_NAMES[month].toLowerCase()}
                  </strong>
                  <span>Nessuna gara pubblicata per questa data.</span>
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
