import { ArrowUpRightIcon } from "@phosphor-icons/react";

export function PartnerRibbon() {
  return (
    <aside
      className="partner-ribbon section-wrap"
      aria-label="Spazi sponsor in evidenza"
    >
      <div className="partner-ribbon-label">
        <span>
          CON NOI
          <br />
          IN CAMPO.
        </span>
        <small>I nostri partner</small>
      </div>
      <div className="ribbon-spaces">
        <div className="partner-slot main-slot">
          <span>MAIN PARTNER</span>
          <small>Spazio riservato al logo</small>
        </div>
        {[1, 2, 3].map((item) => (
          <div key={item} className="partner-slot">
            <span>OFFICIAL PARTNER</span>
            <small>Spazio riservato al logo</small>
          </div>
        ))}
      </div>
      <button
        aria-label="Informazioni per diventare partner"
        onClick={() => location.assign("/sponsor.html")}
      >
        <ArrowUpRightIcon />
        <span>
          Diventa
          <br />
          partner
        </span>
      </button>
    </aside>
  );
}
