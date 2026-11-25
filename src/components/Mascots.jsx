// Mascotte del club: civetta maschio per Serie C e giovanili maschili,
// civetta femmina per Prima Divisione e giovanili femminili, entrambe per il Minivolley.
const MASCOT_BY_TEAM = {
  c: ["maschio"],
  gm: ["maschio"],
  f: ["femmina"],
  gf: ["femmina"],
  mini: ["femmina", "maschio"],
};

export function Mascots({ teamId, className = "" }) {
  const list = MASCOT_BY_TEAM[teamId] || ["femmina", "maschio"];
  return (
    <span className={"mascots " + className} aria-hidden="true">
      {list.map((kind) => (
        <img
          key={kind}
          src={"/assets/mascotte-" + kind + ".webp"}
          alt=""
          width="945"
          height="1430"
        />
      ))}
    </span>
  );
}
