import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Eyebrow } from "../../components/Eyebrow";

export function PartnersWall() {
  return (
    <section
      className="partners-wall section-wrap"
      id="partner"
      aria-labelledby="partner-title"
    >
      <div className="partners-heading">
        <div>
          <Eyebrow>Al fianco di Foiano Pallavolo</Eyebrow>
          <h2 id="partner-title">
            Una squadra,<em> anche fuori dal campo.</em>
          </h2>
        </div>
        <p>Uno spazio dedicato alle realtà che sostengono il nostro volley.</p>
      </div>
      <div className="partners-wall-grid">
        <div className="partner-wall-main">
          <span className="red-label">MAIN PARTNER</span>
          <strong>
            Il tuo marchio.
            <br />
            La nostra passione.
          </strong>
          <span className="partner-space-note">Spazio riservato al logo</span>
        </div>
        <div className="partner-wall-official">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="partner-wall-slot">
              <span>OFFICIAL PARTNER</span>
              <small>Spazio riservato al logo</small>
            </div>
          ))}
        </div>
      </div>
      <div className="partners-wall-foot">
        <span>Loghi partner da inserire.</span>
        <button onClick={() => location.assign("/sponsor.html")}>
          Scopri gli spazi di sponsorizzazione <ArrowUpRightIcon size={17} />
        </button>
      </div>
    </section>
  );
}
