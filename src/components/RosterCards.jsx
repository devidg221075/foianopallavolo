import { ROSTERS } from "../data/roster";

// "La rosa": le figurine degli atleti della prima squadra (solo Serie C e Prima Divisione femminile).
export function RosterCards({ team }) {
  const roster = ROSTERS[team.id];
  if (!roster) return null;
  return (
    <section
      className="roster teams-wrap"
      id="rosa"
      aria-labelledby="rosa-title"
    >
      <div className="teams-heading" data-reveal>
        <div className="teams-kicker">LA ROSA · {team.short.toUpperCase()}</div>
        <h2 id="rosa-title">{roster.title}</h2>
        <p>{team.name}: tutti i volti di chi scende in campo per Foiano.</p>
      </div>
      <ul className="roster-grid">
        {roster.players.map(([file, name], index) => (
          <li className="roster-card" key={file} style={{ "--i": index % 5 }}>
            <img
              src={"/assets/rosa/" + roster.folder + "/" + file + ".webp"}
              alt={name + ", " + team.name}
              width="720"
              height="720"
              loading="lazy"
            />
            <span className="roster-tag">{team.short}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
