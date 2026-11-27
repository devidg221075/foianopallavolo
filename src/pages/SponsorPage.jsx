import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { PageHero } from "../components/PageHero";

export function SponsorPage({ openContact }) {
  return (
    <div className="teams-page sc-page">
      <PageHero
        title={["INSIEME.", "PER LO SPORT.", "PER FOIANO."]}
        sub="Il tuo marchio al fianco della nostra passione."
        image="story"
        crumb="SPONSOR"
      />
      <section className="sc-intro teams-wrap">
        <div>
          <div className="teams-kicker">DIVENTA PARTNER</div>
          <h2>
            La squadra si costruisce <em>anche fuori dal campo.</em>
          </h2>
        </div>
        <div>
          <p>
            Sostenere Foiano Pallavolo significa affiancare un progetto sportivo
            che dal 1976 unisce atleti, famiglie e territorio. Dalle prime
            squadre al Minivolley, ogni contributo aiuta a far crescere la
            nostra comunità.
          </p>
          <button
            className="button primary"
            onClick={() => openContact("Sponsorizzazione Foiano Pallavolo")}
          >
            Parliamo di partnership <ArrowRightIcon />
          </button>
        </div>
      </section>
      <section className="sc-benefits teams-wrap">
        <div className="teams-kicker">IL VALORE DI FARE SQUADRA</div>
        <h2>Una passione condivisa.</h2>
        <div className="sc-grid">
          {[
            [
              "01",
              "Territorio",
              "Sostieni una realtà sportiva radicata a Foiano della Chiana.",
            ],
            [
              "02",
              "Comunità",
              "Affianca le attività di atleti, atlete e famiglie.",
            ],
            [
              "03",
              "Visibilità",
              "Valuta con la società gli spazi disponibili e le opportunità di presenza.",
            ],
          ].map(([x, O, h]) => (
            <article key={x}>
              <span>{x}</span>
              <h3>{O}</h3>
              <p>{h}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="sc-package">
        <div className="teams-wrap">
          <div className="teams-kicker">OPPORTUNITÀ DI COLLABORAZIONE</div>
          <h2>Il tuo sostegno. La nostra squadra.</h2>
          <p>
            Le fasce riportate nel materiale della società partono da € 200.
            Importi IVA esclusa; condizioni, disponibilità e contenuti sono da
            confermare con la società.
          </p>
          <div className="sc-tiers">
            {[200, 300, 350, 500, 1e3].map((item) => (
              <div key={item}>
                <span>FASCIA SPONSOR</span>
                <strong>€ {item.toLocaleString("it-IT")}</strong>
                <small>IVA esclusa · da confermare</small>
              </div>
            ))}
          </div>
          <div className="sc-package-note">
            <strong>Pacchetto visibilità · + € 50</strong>
            <p>
              Maglia da gioco, post social dedicato e pubblicità sul TV
              segnapunti: dettagli e disponibilità da verificare con il club.
            </p>
            <button
              className="text-link"
              onClick={() => openContact("Richiesta pacchetto sponsor")}
            >
              Richiedi informazioni <ArrowUpRightIcon />
            </button>
          </div>
        </div>
      </section>
      <section className="sc-partners teams-wrap">
        <div className="teams-kicker">I PARTNER DEL CLUB</div>
        <h2>Al nostro fianco, in campo.</h2>
        <p>Spazi dedicati ai marchi che sostengono Foiano Pallavolo.</p>
        <div className="sc-logos">
          {[
            "MAIN PARTNER",
            "OFFICIAL PARTNER",
            "OFFICIAL PARTNER",
            "OFFICIAL PARTNER",
          ].map((item, index) => (
            <div key={index}>
              <strong>{item}</strong>
              <span>Spazio riservato al logo</span>
            </div>
          ))}
        </div>
      </section>
      <section className="teams-join on-red">
        <div className="teams-wrap">
          <div>
            <h2>FACCIAMO SQUADRA.</h2>
            <p>Costruiamo insieme la collaborazione più adatta.</p>
          </div>
          <button
            className="button white"
            onClick={() => openContact("Sponsorizzazione Foiano Pallavolo")}
          >
            Diventa sponsor <ArrowRightIcon />
          </button>
        </div>
      </section>
    </div>
  );
}
