import { useEffect, useState } from "react";
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
import { ClubLogo } from "../components/ClubLogo";
import { EmptyState } from "../components/EmptyState";
import { FixtureList } from "../components/FixtureList";
import { MatchDetail } from "../components/MatchDetail";
import { StandingsTable } from "../components/StandingsTable";
import { MATCH_TEAMS } from "../data/teams";
import { useFipav } from "../hooks/useFipav";
import { MONTH_NAMES, buildMonthGrid, seasonLabel } from "../lib/calendar";
import {
  FIPAV_CLASSIFICA_URL,
  FIPAV_GIRONE_URL,
  OUTCOME_LABELS,
  nextFixture,
  opponentLogo,
  opponentName,
  opponentShortName,
  outcome,
} from "../lib/fipav";

const GARA_LABEL = (teamId) =>
  MATCH_TEAMS.find((team) => team.id === teamId)?.gara || "PARTITA";

function OutcomeLegend() {
  return (
    <div className="outcome-legend" aria-label="Legenda calendario">
      {["won", "lost", "scheduled"].map((key) => (
        <span className={"outcome-" + key} key={key}>
          {OUTCOME_LABELS[key]}
        </span>
      ))}
    </div>
  );
}

export function MatchesPage({ openContact, openSponsors }) {
  const { fixtures, standings, updatedAt, live } = useFipav();
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
  const [selectedId, setSelectedId] = useState(null);
  const selectedTeam = MATCH_TEAMS.find((team) => team.id === teamFilter);
  const teamFixtures = fixtures.filter(
    (fixture) => teamFilter === "tutte" || fixture.team === teamFilter,
  );
  const dateKey = (day) =>
    `${visibleMonth.getFullYear()}-${String(visibleMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const monthFixtures = teamFixtures.filter(
    (fixture) =>
      fixture.date?.startsWith(dateKey(1).slice(0, 7)) &&
      (!selectedDay || fixture.date === dateKey(selectedDay)),
  );
  const focusFixture =
    monthFixtures.find((fixture) => fixture.id === selectedId) ||
    monthFixtures.find((fixture) => fixture.status !== "played") ||
    monthFixtures[0] ||
    null;
  const listFixtures =
    view === "risultati"
      ? teamFixtures.filter((fixture) => fixture.status === "played")
      : monthFixtures;
  useEffect(() => {
    const query = new URLSearchParams();
    if (teamFilter !== "tutte") query.set("squadra", teamFilter);
    if (view !== "calendario") query.set("vista", view);
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
    setSelectedId(null);
  };
  const selectTeam = (teamId) => {
    setTeamFilter(teamId);
    setSelectedDay(null);
    setSelectedId(null);
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
            <span /> Serie C · Girone A
          </span>
        </div>
        <div className="headline-matches">
          {MATCH_TEAMS.slice(0, 2).map((team, index) => {
            const next = nextFixture(fixtures, team.id);
            return (
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
                  <strong>
                    FOIANO
                    <small>
                      {next
                        ? next.home.includes("FOIANO")
                          ? " · IN CASA"
                          : " · TRASFERTA"
                        : ""}
                    </small>
                  </strong>
                  <span>VS</span>
                  <div className="headline-opponent">
                    <ClubLogo src={opponentLogo(next)} />
                    {next ? opponentName(next) : "Avversario da confermare"}
                  </div>
                </div>
                <div className="headline-match-meta">
                  <span>
                    <CalendarBlankIcon />{" "}
                    {next?.date.split("-").reverse().join("/") ||
                      "Data da confermare"}
                  </span>
                  <span>
                    <ClockIcon /> {next?.time || "Orario da confermare"}
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
            );
          })}
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
          ].map(([id, label, Icon]) => (
            <button
              key={id}
              aria-pressed={view === id}
              onClick={() => setView(id)}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>
        <div className="match-center-context">
          <span>{selectedTeam?.name || "Tutte le squadre"}</span>
          <span>STAGIONE {seasonLabel()}</span>
        </div>
        {view === "calendario" ? (
          <>
            <div className="match-center-split">
              <aside className="match-focus-column">
                <MatchDetail fixture={focusFixture} />
                {selectedDay && monthFixtures.length > 1 && (
                  <div className="match-focus-options">
                    {monthFixtures.map((fixture) => (
                      <button
                        key={fixture.id}
                        aria-pressed={focusFixture?.id === fixture.id}
                        onClick={() => setSelectedId(fixture.id)}
                      >
                        {
                          MATCH_TEAMS.find((team) => team.id === fixture.team)
                            ?.short
                        }
                        {" · "}
                        {fixture.time}
                      </button>
                    ))}
                  </div>
                )}
              </aside>
              <div className="match-calendar-column">
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
                    key={
                      visibleMonth.getFullYear() + "-" + visibleMonth.getMonth()
                    }
                    className="match-month-grid"
                    aria-label={
                      "Calendario di " +
                      MONTH_NAMES[visibleMonth.getMonth()] +
                      " " +
                      visibleMonth.getFullYear()
                    }
                  >
                    {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map(
                      (day) => (
                        <span key={day} className="match-weekday">
                          {day}
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
                          onClick={() => {
                            const first = teamFixtures.find(
                              (fixture) => fixture.date === dateKey(item),
                            );
                            setSelectedDay(selectedDay === item ? null : item);
                            setSelectedId(first?.id || null);
                            if (
                              first &&
                              matchMedia("(max-width:850px)").matches
                            )
                              requestAnimationFrame(() =>
                                document
                                  .querySelector(".match-focus-column")
                                  ?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                  }),
                              );
                          }}
                        >
                          <span>{item}</span>
                          {teamFixtures
                            .filter((fixture) => fixture.date === dateKey(item))
                            .map((fixture) => (
                              <small
                                key={fixture.id}
                                className={
                                  "calendar-team-label outcome-" +
                                  outcome(fixture)
                                }
                              >
                                <span>{GARA_LABEL(fixture.team)}</span>
                                <span
                                  className="calendar-opponent"
                                  title={opponentName(fixture)}
                                >
                                  {opponentShortName(fixture)}
                                </span>
                                <span className="calendar-fixture-score">
                                  {OUTCOME_LABELS[outcome(fixture)]}
                                  {fixture.score ? " · " + fixture.score : ""}
                                </span>
                              </small>
                            ))}
                        </button>
                      ) : (
                        <div key={index} className="match-blank-day" />
                      ),
                    )}
                  </div>
                )}
                <OutcomeLegend />
                <p className="calendar-order-note">
                  Risultati nell’ordine casa–trasferta. Colori riferiti a
                  Foiano.
                </p>
              </div>
            </div>
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
              onSelect={(fixture) => {
                setSelectedId(fixture.id);
                setSelectedDay(Number(fixture.date.slice(8)));
                document
                  .querySelector("#calendario")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
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
            {(teamFilter === "c" || teamFilter === "tutte") &&
            standings.c?.length ? (
              <StandingsTable
                rows={standings.c}
                updatedAt={updatedAt}
                live={live}
              />
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
        <p className="fipav-links">
          <a href={FIPAV_GIRONE_URL} target="_blank" rel="noreferrer">
            Calendario FIPAV ↗
          </a>
          {" · "}
          <a href={FIPAV_CLASSIFICA_URL} target="_blank" rel="noreferrer">
            Classifica FIPAV ↗
          </a>
        </p>
        <div className="match-data-note">
          <ShieldCheckIcon />
          <p>
            Serie C · Fonte FIPAV Toscana.{" "}
            {live ? "Collegamento aggiornato" : "Copia disponibile"}:{" "}
            {new Date(updatedAt).toLocaleString("it-IT")}. Le altre squadre
            attendono i calendari ufficiali.
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
