import { useState, useEffect } from "react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarBlankIcon,
  CaretLeftIcon,
  CaretRightIcon,
  ClockIcon,
  ListBulletsIcon,
  RankingIcon,
  ShieldCheckIcon,
  VolleyballIcon,
} from "@phosphor-icons/react";
import { EmptyState } from "../components/EmptyState";
import { FixtureList } from "../components/FixtureList";
import { FIXTURES, TEAM_ROSTERS } from "../data/fixtures";
import { MATCH_TEAMS } from "../data/teams";
import { MONTH_NAMES, buildMonthGrid, seasonLabel } from "../lib/calendar";

// Etichetta del giorno nel calendario: di quale squadra è la gara.
function garaBadge(dayFixtures) {
  if (!dayFixtures.length) return null;
  const teamIds = [...new Set(dayFixtures.map((fixture) => fixture.team))];
  const first = MATCH_TEAMS.find((team) => team.id === teamIds[0]);
  return (
    <small>
      {first?.badge || "GARA"}
      {teamIds.length > 1 ? " +" + (teamIds.length - 1) : ""}
    </small>
  );
}

export function MatchesPage({ openContact, openSponsors }) {
  var We;
  const today = new Date();
  const params = new URLSearchParams(location.search);
  const [teamFilter, setTeamFilter] = useState(
    MATCH_TEAMS.some((team) => team.id === params.get("squadra"))
      ? params.get("squadra")
      : "tutte",
  );
  const [view, setView] = useState(
    ["risultati", "classifiche"].includes(params.get("vista"))
      ? params.get("vista")
      : "calendario",
  );
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDay, setSelectedDay] = useState(null);
  const [layout, setLayout] = useState("mese");
  const selectedTeam = MATCH_TEAMS.find((team) => team.id === teamFilter);
  const teamFixtures = FIXTURES.filter(
    (item) => teamFilter === "tutte" || item.team === teamFilter,
  );
  const dateKey = (day) =>
    `${visibleMonth.getFullYear()}-${String(visibleMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const monthFixtures = teamFixtures.filter((teamFixture) => {
    return (
      teamFixture.date?.startsWith(dateKey(1).slice(0, 7)) &&
      (!selectedDay || teamFixture.date === dateKey(selectedDay))
    );
  });
  const listFixtures =
    view === "risultati"
      ? teamFixtures.filter((teamFixture) => teamFixture.status === "played")
      : monthFixtures.filter(
          (monthFixture) => monthFixture.status !== "played",
        );
  useEffect(() => {
    const query = new URLSearchParams();
    if (teamFilter !== "tutte") {
      query.set("squadra", teamFilter);
    }
    if (view !== "calendario") {
      query.set("vista", view);
    }
    history.replaceState(
      null,
      "",
      location.pathname + (query.size ? "?" + query : "") + location.hash,
    );
  }, [teamFilter, view]);
  const changeMonth = (delta) => {
    setVisibleMonth(
      (month) => new Date(month.getFullYear(), month.getMonth() + delta, 1),
    );
    setSelectedDay(null);
  };
  const selectTeam = (teamId) => {
    setTeamFilter(teamId);
    setSelectedDay(null);
  };
  return (
    <div className="matches-page">
      <section className="match-page-hero on-red">
        <div className="teams-wrap match-page-hero-inner">
          <div>
            <div className="teams-breadcrumb">
              <a href="/">HOME</a>
              <span>/</span>PARTITE E RISULTATI
            </div>
            <div className="teams-kicker">STAGIONE {seasonLabel()}</div>
            <h1>
              OGNI PUNTO.
              <br />
              TUTTI INSIEME.
            </h1>
            <p>
              Le nostre squadre. La nostra stagione.
              <br />
              Il prossimo appuntamento comincia qui.
            </p>
            <a href="#calendario" className="button white">
              Segui la stagione <ArrowRightIcon />
            </a>
          </div>
          <div className="match-hero-mark" aria-hidden="true">
            <img src="/assets/logo-bianco.png" alt="" />
            <span>FOIANO</span>
            <strong>
              GAME
              <br />
              TIME<span>.</span>
            </strong>
            <small>DAL 1976 · SEMPRE IN CAMPO</small>
          </div>
        </div>
      </section>
      <section
        className="match-headliners teams-wrap"
        aria-labelledby="first-match-title"
      >
        <div className="page-heading">
          <div>
            <div className="teams-kicker">LE PRIME SQUADRE IN CAMPO</div>
            <h2 id="first-match-title">
              Due squadre.
              <br />
              La stessa voglia di esserci.
            </h2>
          </div>
          <span className="data-pending">
            <span /> Calendari in aggiornamento
          </span>
        </div>
        <div className="headline-matches">
          {MATCH_TEAMS.slice(0, 2).map((team, index) => (
            <article
              key={team.id}
              className={"headline-match " + (index === 0 ? "on-red" : "")}
            >
              <div className="headline-match-label">
                <span>0{index + 1} / PROSSIMO INCONTRO</span>
                <VolleyballIcon size={26} />
              </div>
              <h3>{team.name}</h3>
              <div className="headline-clubs">
                <img
                  src={
                    "/assets/logo-" +
                    (index === 0 ? "bianco" : "rosso") +
                    ".png"
                  }
                  alt="Foiano Pallavolo"
                />
                <strong>FOIANO</strong>
                <span>VS</span>
                <div>
                  Avversario
                  <br />
                  <b>da confermare</b>
                </div>
              </div>
              <div className="headline-match-meta">
                <span>
                  <CalendarBlankIcon /> Data da confermare
                </span>
                <span>
                  <ClockIcon /> Orario da confermare
                </span>
              </div>
              <a
                href="#calendario"
                onClick={() => {
                  selectTeam(team.id);
                  setView("calendario");
                }}
              >
                Segui {team.short} <ArrowRightIcon />
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="match-center teams-wrap" id="calendario">
        <div className="page-heading">
          <div>
            <div className="teams-kicker">MATCH CENTER</div>
            <h2>La stagione, a portata di mano.</h2>
          </div>
        </div>
        <div className="match-team-filter" aria-label="Filtra per squadra">
          <button
            aria-pressed={teamFilter === "tutte"}
            onClick={() => selectTeam("tutte")}
          >
            Tutte le squadre
          </button>
          {MATCH_TEAMS.map((team) => (
            <button
              key={team.id}
              aria-pressed={teamFilter === team.id}
              onClick={() => selectTeam(team.id)}
            >
              {team.name}
            </button>
          ))}
        </div>
        <div className="match-center-tabs" aria-label="Sezione della stagione">
          {[
            ["calendario", "Calendario", CalendarBlankIcon],
            ["risultati", "Risultati", VolleyballIcon],
            ["classifiche", "Classifiche", RankingIcon],
          ].map(([D, Q, Icon]) => (
            <button
              key={D}
              aria-pressed={view === D}
              onClick={() => setView(D)}
            >
              <Icon />
              {Q}
            </button>
          ))}
        </div>
        <div className="match-center-context">
          <span>{selectedTeam?.name || "Tutte le squadre"}</span>
          <span>STAGIONE {seasonLabel()}</span>
        </div>
        {view === "calendario" ? (
          <>
            <div className="match-month-toolbar">
              <div className="match-month-nav">
                <button
                  onClick={() => changeMonth(-1)}
                  aria-label="Mese precedente"
                >
                  <CaretLeftIcon />
                </button>
                <h3>
                  {MONTH_NAMES[visibleMonth.getMonth()]}{" "}
                  <span>{visibleMonth.getFullYear()}</span>
                </h3>
                <button
                  onClick={() => changeMonth(1)}
                  aria-label="Mese successivo"
                >
                  <CaretRightIcon />
                </button>
              </div>
              <div className="match-layout-control">
                <button
                  onClick={() => {
                    setVisibleMonth(
                      new Date(today.getFullYear(), today.getMonth(), 1),
                    );
                    setSelectedDay(null);
                  }}
                >
                  Oggi
                </button>
                <button
                  aria-pressed={layout === "mese"}
                  aria-label="Vista mensile"
                  onClick={() => setLayout("mese")}
                >
                  <CalendarBlankIcon />
                </button>
                <button
                  aria-pressed={layout === "lista"}
                  aria-label="Vista elenco"
                  onClick={() => setLayout("lista")}
                >
                  <ListBulletsIcon />
                </button>
              </div>
            </div>
            {layout === "mese" && (
              <div
                key={visibleMonth.getFullYear() + "-" + visibleMonth.getMonth()}
                className="match-month-grid"
                aria-label={
                  "Calendario di " +
                  MONTH_NAMES[visibleMonth.getMonth()] +
                  " " +
                  visibleMonth.getFullYear()
                }
              >
                {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map(
                  (item) => (
                    <span key={item} className="match-weekday">
                      {item}
                    </span>
                  ),
                )}
                {buildMonthGrid(
                  visibleMonth.getFullYear(),
                  visibleMonth.getMonth(),
                ).map((item, index) =>
                  item ? (
                    <button
                      key={index}
                      aria-pressed={selectedDay === item}
                      aria-label={
                        item +
                        " " +
                        MONTH_NAMES[visibleMonth.getMonth()] +
                        " " +
                        visibleMonth.getFullYear()
                      }
                      aria-current={
                        today.getDate() === item &&
                        today.getMonth() === visibleMonth.getMonth() &&
                        today.getFullYear() === visibleMonth.getFullYear()
                          ? "date"
                          : undefined
                      }
                      onClick={() =>
                        setSelectedDay(selectedDay === item ? null : item)
                      }
                    >
                      <span>{item}</span>
                      {garaBadge(
                        teamFixtures.filter(
                          (teamFixture) => teamFixture.date === dateKey(item),
                        ),
                      )}
                    </button>
                  ) : (
                    <div key={index} className="match-blank-day" />
                  ),
                )}
              </div>
            )}
            <div className="match-selection" aria-live="polite">
              <strong>
                {selectedDay
                  ? `${selectedDay} ${MONTH_NAMES[visibleMonth.getMonth()].toLowerCase()} ${visibleMonth.getFullYear()}`
                  : `${MONTH_NAMES[visibleMonth.getMonth()]} ${visibleMonth.getFullYear()}`}
              </strong>
              {selectedDay && (
                <button onClick={() => setSelectedDay(null)}>
                  Mostra tutto il mese <ArrowRightIcon />
                </button>
              )}
            </div>
            <FixtureList
              fixtures={listFixtures}
              emptyTitle={
                selectedDay
                  ? "Nessuna gara pubblicata per questo giorno."
                  : "Il prossimo appuntamento è in arrivo."
              }
              emptyText="Date, orari, avversari e campi saranno disponibili dopo la conferma del calendario ufficiale."
            />
          </>
        ) : view === "risultati" ? (
          <FixtureList
            fixtures={listFixtures}
            emptyTitle="Ogni punto ha la sua storia."
            emptyText="I risultati ufficiali non sono ancora pubblicati. Qui troverai i punteggi delle gare concluse, suddivisi per squadra."
          />
        ) : (
          <div className="match-standings">
            {selectedTeam &&
            (We = TEAM_ROSTERS[teamFilter]) != null &&
            We.length ? (
              <div className="standings-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Pos.</th>
                      <th>Squadra</th>
                      <th>Punti</th>
                      <th>Gare</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TEAM_ROSTERS[teamFilter].map((item, index) => (
                      <tr key={item.name}>
                        <td>{index + 1}</td>
                        <th scope="row">{item.name}</th>
                        <td>{item.points}</td>
                        <td>{item.played}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState
                icon={RankingIcon}
                title="Il campionato, punto dopo punto."
                text={
                  teamFilter === "tutte"
                    ? "Seleziona una squadra per consultare la sua classifica. Gironi e classifiche saranno inseriti dopo la conferma dei dati ufficiali."
                    : "La classifica ufficiale di " +
                      selectedTeam.name +
                      " non è ancora pubblicata."
                }
              />
            )}
          </div>
        )}
        <div className="match-data-note">
          <ShieldCheckIcon />
          <p>
            Dati ufficiali, appena confermati. Un campo vuoto indica un dato non
            ancora pubblicato.
          </p>
          <button
            onClick={() => openContact("Informazioni partite e calendari")}
          >
            Chiedi informazioni <ArrowUpRightIcon />
          </button>
        </div>
        {selectedTeam && (
          <a
            className="text-link match-team-page"
            href={"/" + selectedTeam.path + ".html"}
          >
            Scopri {selectedTeam.name} <ArrowRightIcon />
          </a>
        )}
      </section>
      <section
        className="match-committees teams-wrap"
        aria-labelledby="committees-title"
      >
        <h2 id="committees-title">Campionati organizzati da</h2>
        <div className="match-committees-logos">
          <img
            src="/assets/fipav-comitato-etruria.webp"
            alt="FIPAV, Comitato Territoriale Etruria"
            loading="lazy"
          />
          <img
            src="/assets/fipav-comitato-toscana.webp"
            alt="FIPAV, Comitato Regionale Toscana"
            loading="lazy"
          />
        </div>
        <p>
          Calendari e risultati ufficiali dei campionati sono pubblicati dai
          comitati FIPAV.
        </p>
      </section>
      <aside className="match-sponsor teams-wrap">
        <div>
          <div className="teams-kicker">CON NOI, OGNI PARTITA</div>
          <h2>Il sostegno fa squadra.</h2>
        </div>
        <button onClick={openSponsors}>
          <strong>MATCH PARTNER</strong>
          <span>Spazio riservato al logo</span>
          <ArrowUpRightIcon />
        </button>
      </aside>
      <section className="teams-join on-red">
        <div className="teams-wrap">
          <div>
            <h2>IL CAMPO CI UNISCE.</h2>
            <p>Informazioni sulle partite e sulle nostre squadre.</p>
          </div>
          <button
            className="button white"
            onClick={() => openContact("Informazioni partite e calendari")}
          >
            Contatta il club <ArrowRightIcon />
          </button>
        </div>
      </section>
    </div>
  );
}
