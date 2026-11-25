import { ArrowUpRightIcon, RankingIcon } from "@phosphor-icons/react";
import { FIPAV_CLASSIFICA_URL, FOIANO_ID, formatQuotient } from "../lib/fipav";

const HEADERS = [
  ["G", "Gare giocate"],
  ["V", "Gare vinte"],
  ["P", "Gare perse"],
  ["SV", "Set vinti"],
  ["SP", "Set persi"],
];

// Riquadro riassuntivo per la home: posizione, punti e quozienti della nostra squadra.
export function StandingTeaser({ rows = [], onOpen }) {
  const ours = rows.find((row) => row.id === FOIANO_ID);
  return (
    <div className="home-standing-teaser">
      <div className="standing-teaser-title">
        <RankingIcon size={27} />
        <div>
          <span>SERIE C MASCHILE · GIRONE A</span>
          <strong>La nostra classifica</strong>
        </div>
      </div>
      {ours && (
        <div className="standing-teaser-stats">
          <span>
            <b>{ours.position}ª</b> posizione
          </span>
          <span>
            <b>{ours.points}</b> punti
          </span>
          <span>
            Q. set <b>{formatQuotient(ours.setQuotient)}</b>
          </span>
          <span>
            Q. punti <b>{formatQuotient(ours.pointQuotient)}</b>
          </span>
        </div>
      )}
      <button onClick={onOpen}>
        Classifica completa <ArrowUpRightIcon />
      </button>
    </div>
  );
}

// Classifica completa del girone, con la nostra squadra evidenziata.
export function StandingsTable({ rows = [], updatedAt, live = false }) {
  return (
    <section
      className="official-standing"
      aria-label="Classifica Serie C maschile"
    >
      <div className="standing-title">
        <span className="teams-kicker">SERIE C MASCHILE · GIRONE A</span>
        <h2>La classifica del campionato.</h2>
        <p>NORCINERIA TOSCANA FOIANO evidenziata in rosso.</p>
      </div>
      <p className="standing-scroll-hint">
        Scorri la tabella orizzontalmente per vedere tutte le statistiche.
      </p>
      <div
        className="standings-scroll"
        tabIndex={0}
        role="region"
        aria-label="Classifica completa, tabella scorrevole"
      >
        <table>
          <caption>
            Classifica FIPAV · Serie C Regionale Maschile, Girone A
          </caption>
          <thead>
            <tr>
              <th scope="col">Pos.</th>
              <th scope="col">Squadra</th>
              <th scope="col">Punti</th>
              {HEADERS.map(([short, long]) => (
                <th scope="col" key={short}>
                  <abbr title={long}>{short}</abbr>
                </th>
              ))}
              <th scope="col">Q. set</th>
              <th scope="col">
                <abbr title="Punti fatti">PF</abbr>
              </th>
              <th scope="col">
                <abbr title="Punti subiti">PS</abbr>
              </th>
              <th scope="col">Q. punti</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                className={row.id === FOIANO_ID ? "foiano-standing" : ""}
                key={row.id}
              >
                <td>{row.position}</td>
                <th scope="row">{row.name}</th>
                <td>
                  <strong>{row.points}</strong>
                </td>
                <td>{row.played}</td>
                <td>{row.won}</td>
                <td>{row.lost}</td>
                <td>{row.setsWon}</td>
                <td>{row.setsLost}</td>
                <td>{formatQuotient(row.setQuotient)}</td>
                <td>{row.pointsFor ?? "—"}</td>
                <td>{row.pointsAgainst ?? "—"}</td>
                <td>{formatQuotient(row.pointQuotient)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <p>Classifica temporaneamente non disponibile.</p>}
      </div>
      <p className="standing-legend">
        <strong>Legenda:</strong> G giocate · V vinte · P perse · SV/SP set
        vinti/persi · PF/PS punti fatti/subiti.
        <br />
        Q. set = set vinti ÷ set persi. Q. punti = punti fatti ÷ punti subiti.
        Quozienti riportati dalla fonte FIPAV.
      </p>
      <div className="standing-source">
        <p>
          {live ? "Dati aggiornati da FIPAV" : "Copia disponibile FIPAV"}
          {updatedAt
            ? " · " +
              new Date(updatedAt).toLocaleString("it-IT", {
                timeZone: "Europe/Rome",
              })
            : ""}
        </p>
        <a href={FIPAV_CLASSIFICA_URL} target="_blank" rel="noreferrer">
          Classifica ufficiale FIPAV <ArrowUpRightIcon />
        </a>
      </div>
    </section>
  );
}
