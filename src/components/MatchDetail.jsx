import {
  CalendarBlankIcon,
  ClockIcon,
  MapPinIcon,
  VolleyballIcon,
} from "@phosphor-icons/react";
import { ClubLogo } from "./ClubLogo";
import { Referees } from "./Referees";
import { MATCH_TEAMS } from "../data/teams";
import { OUTCOME_LABELS, outcome } from "../lib/fipav";

// Pannello con il dettaglio di una partita: squadre, risultato, parziali, luogo e arbitri.
export function MatchDetail({ fixture }) {
  if (!fixture)
    return (
      <article className="match-focus on-red">
        <span className="focus-kicker">LA PARTITA</span>
        <VolleyballIcon size={70} weight="thin" />
        <h3>Nessuna gara in questa selezione.</h3>
        <p>
          Scegli un altro giorno, mese o squadra per consultare gli incontri
          disponibili.
        </p>
      </article>
    );
  const played = fixture.status === "played";
  return (
    <article
      className="match-focus on-red"
      aria-label="Dettaglio partita"
      aria-live="polite"
    >
      <div className="focus-kicker">
        {played ? "RISULTATO PARTITA" : "PROSSIMO APPUNTAMENTO"}
      </div>
      <h3>{MATCH_TEAMS.find((team) => team.id === fixture.team)?.name}</h3>
      <span className="focus-round">{fixture.round}</span>
      <div className="focus-clubs">
        <div>
          <ClubLogo src={fixture.homeLogo} name={fixture.home} />
          <strong>{fixture.home}</strong>
          <small>CASA</small>
        </div>
        <b className="focus-score">{fixture.score || "VS"}</b>
        <div>
          <ClubLogo src={fixture.awayLogo} name={fixture.away} />
          <strong>{fixture.away}</strong>
          <small>TRASFERTA</small>
        </div>
      </div>
      <div className="focus-outcome">
        {OUTCOME_LABELS[outcome(fixture)]}
        {played ? " · Foiano" : ""}
      </div>
      {played && (
        <div className="focus-sets">
          <strong>PARZIALI DEI SET</strong>
          <p>{fixture.sets}</p>
          <small>
            {fixture.official
              ? "Risultato ufficiale"
              : "In attesa di omologazione"}
          </small>
        </div>
      )}
      <div className="focus-meta">
        <span>
          <CalendarBlankIcon />
          {fixture.date.split("-").reverse().join("/")}
        </span>
        <span>
          <ClockIcon />
          {fixture.time}
        </span>
        <span>
          <MapPinIcon />
          {fixture.venue}
        </span>
      </div>
      <Referees fixture={fixture} />
    </article>
  );
}
