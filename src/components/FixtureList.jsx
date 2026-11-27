import { ArrowUpRightIcon, ClockIcon, MapPinIcon } from "@phosphor-icons/react";
import { ClubLogo } from "./ClubLogo";
import { EmptyState } from "./EmptyState";
import { MATCH_TEAMS } from "../data/teams";
import { OUTCOME_LABELS, outcome } from "../lib/fipav";

// Elenco delle partite. Sopra ogni gara c'è l'etichetta "Gara": di quale squadra del club è
// (SERIE C MASCHILE, PRIMA DIV. FEMMINILE…), con la giornata se nota.
export function FixtureList({ fixtures, emptyTitle, emptyText, onSelect }) {
  if (!fixtures.length)
    return <EmptyState title={emptyTitle} text={emptyText} />;
  return (
    <div className="fixture-list">
      {fixtures.map((fixture) => {
        const result = outcome(fixture);
        return (
          <article className={"fixture-outcome-" + result} key={fixture.id}>
            <time dateTime={fixture.date}>
              {new Intl.DateTimeFormat("it-IT", {
                day: "numeric",
                month: "short",
              }).format(new Date(fixture.date + "T12:00:00"))}
            </time>
            <div>
              <span>
                {MATCH_TEAMS.find((team) => team.id === fixture.team)?.gara}
                {fixture.round ? " · " + fixture.round : ""}
              </span>
              <h3 className="fixture-clubs">
                <span>
                  <ClubLogo src={fixture.homeLogo} name={fixture.home} />
                  {fixture.home}
                </span>{" "}
                <b>{fixture.status === "played" ? fixture.score : "VS"}</b>{" "}
                <span>
                  <ClubLogo src={fixture.awayLogo} name={fixture.away} />
                  {fixture.away}
                </span>
              </h3>
              <span className={"fixture-status outcome-" + result}>
                {OUTCOME_LABELS[result]}
              </span>
              <p>
                <ClockIcon /> {fixture.time || "Orario da confermare"}{" "}
                <MapPinIcon /> {fixture.venue || "Campo da confermare"}
              </p>
              {fixture.status === "played" && (
                <p>
                  Set: {fixture.sets} ·{" "}
                  {fixture.official
                    ? "Risultato ufficiale"
                    : "In attesa di omologazione"}
                </p>
              )}
              {onSelect && (
                <button
                  className="fixture-detail-button"
                  onClick={() => onSelect(fixture)}
                >
                  Dettaglio partita <ArrowUpRightIcon />
                </button>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
