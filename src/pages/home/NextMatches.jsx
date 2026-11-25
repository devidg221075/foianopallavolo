import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ClockIcon,
  MapPinIcon,
} from "@phosphor-icons/react";
import { ClubLogo } from "../../components/ClubLogo";
import { Eyebrow } from "../../components/Eyebrow";
import { SiteLink } from "../../components/SiteLink";
import { ASSET_BASE } from "../../config";
import { TEAMS } from "../../data/teams";
import { useFipav } from "../../hooks/useFipav";
import { nextFixture, opponentLogo, opponentName } from "../../lib/fipav";

export function NextMatches({ gotoCalendar }) {
  const { fixtures } = useFipav();
  return (
    <section
      className="next-matches"
      id="prossime-partite"
      aria-labelledby="next-matches-title"
    >
      <div className="section-wrap">
        <div className="next-matches-heading">
          <div>
            <Eyebrow>Le nostre prime squadre</Eyebrow>
            <h2 id="next-matches-title">
              Il prossimo punto.<em> Insieme.</em>
            </h2>
          </div>
          <SiteLink to="partite" className="text-link">
            Tutte le partite <ArrowRightIcon />
          </SiteLink>
        </div>
        <div className="next-matches-grid">
          {TEAMS.slice(0, 2).map((item, index) => {
            const next = nextFixture(fixtures, item.id);
            return (
              <article key={item.id} className="next-match-card">
                <div className="next-card-heading">
                  <span className="match-order">0{index + 1}</span>
                  <div>
                    <span className="red-label">PROSSIMA PARTITA</span>
                    <h3>{item.name}</h3>
                  </div>
                  <button
                    aria-label={"Calendario " + item.name}
                    className="next-match-arrow"
                    onClick={() => gotoCalendar(item.id)}
                  >
                    <ArrowUpRightIcon />
                  </button>
                </div>
                <div className="next-match-body">
                  <div className="next-club">
                    <img
                      src={ASSET_BASE + "logo-rosso.png"}
                      alt="Foiano Pallavolo"
                    />
                    <strong>FOIANO</strong>
                  </div>
                  <span className="next-versus">VS</span>
                  <div className="next-opponent">
                    <ClubLogo src={opponentLogo(next)} />
                    <span>
                      {next ? opponentName(next) : "Avversario da confermare"}
                    </span>
                  </div>
                  <div className="next-kickoff">
                    <span>IN AGENDA</span>
                    <strong>{next?.date.slice(8) || "—"}</strong>
                    <small>
                      {next?.date.split("-").reverse().join("/") ||
                        "Data da confermare"}
                    </small>
                  </div>
                </div>
                <div className="next-match-bottom">
                  <span>
                    <ClockIcon size={13} />
                    {next?.time || "Orario da confermare"}
                  </span>
                  <span>
                    <MapPinIcon size={13} />
                    {next?.venue || "Campo da confermare"}
                  </span>
                  <button onClick={() => gotoCalendar(item.id)}>
                    Calendario <ArrowRightIcon size={16} />
                  </button>
                </div>
                <p className="fixture-pending">
                  {item.id === "c"
                    ? next?.home.includes("FOIANO")
                      ? "In casa · Fonte FIPAV"
                      : "In trasferta · Fonte FIPAV"
                    : "Calendario ufficiale in aggiornamento"}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
