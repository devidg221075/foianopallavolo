import { ArrowUpRightIcon, PlusIcon } from "@phosphor-icons/react";
import { Eyebrow } from "../../components/Eyebrow";

export function SponsorSection({ openContact }) {
  return (
    <section className="sponsor-section" id="sponsor">
      <div className="section-wrap">
        <div data-reveal>
          <Eyebrow light>Facciamo squadra</Eyebrow>
          <h2>
            Sostieni lo sport.
            <br />
            <em>Sostieni il territorio.</em>
          </h2>
        </div>
        <div className="sponsor-copy" data-reveal>
          <p>
            Porta il tuo marchio al fianco di Foiano Pallavolo e del suo
            progetto sportivo.
          </p>
          <div className="sponsor-buttons">
            <button
              className="button white"
              onClick={() => openContact("Sponsorizzazione Foiano Pallavolo")}
            >
              Diventa sponsor <ArrowUpRightIcon />
            </button>
            <button
              className="sponsor-discover"
              onClick={() => location.assign("/sponsor.html")}
            >
              Scopri le opportunità <PlusIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="sponsor-word" aria-hidden="true">
        INSIEME.
      </div>
    </section>
  );
}
