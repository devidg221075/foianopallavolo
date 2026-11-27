import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  EnvelopeSimpleIcon,
  HeartIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  UsersThreeIcon,
  VolleyballIcon,
} from "@phosphor-icons/react";

export function ClubPage({ teams, teamHref, openContact, openSponsors }) {
  return (
    <div className="club-page teams-page">
      <section className="teams-hero on-red club-master-hero">
        <img
          className="teams-hero-photo"
          src="/assets/youth.webp"
          alt="Allenatore con ragazzi e ragazze in palestra, fotografia dimostrativa"
          fetchPriority="high"
        />
        <div className="teams-hero-red" />
        <div className="teams-hero-copy">
          <div className="teams-breadcrumb">
            <a href="/">HOME</a>
            <span>/</span>IL CLUB
          </div>
          <h1>
            <span>IL NOSTRO</span>
            <span>CLUB.</span>
            <span>LA TUA</span>
            <span>SQUADRA.</span>
          </h1>
          <p>Una comunità. Una passione.</p>
        </div>
        <span className="teams-photo-note">FOTO DIMOSTRATIVA</span>
      </section>
      <nav className="teams-section-nav" aria-label="Scopri il club">
        <a href="#identita">La nostra identità</a>
        <a href="#percorsi">I nostri percorsi</a>
        <a href="#in-palestra">In palestra</a>
      </nav>
      <section className="club-intro teams-wrap" id="identita">
        <div>
          <div className="teams-kicker">FOIANO PALLAVOLO</div>
          <h2>
            La forza di una società.
            <br />
            <em>Il calore di una famiglia.</em>
          </h2>
        </div>
        <div>
          <p>
            Da Foiano della Chiana, una passione che dal 1976 mette in movimento
            generazioni di atleti e atlete. Siamo una società sportiva di
            pallavolo affiliata alla FIPAV, con percorsi maschili e femminili
            dal Minivolley alle prime squadre.
          </p>
          <p>
            Ogni allenamento è un’occasione per imparare. Ogni partita, per
            ritrovarsi. Al centro ci sono le persone: chi gioca, chi insegna,
            chi accompagna e chi sostiene il nostro volley.
          </p>
          <a className="text-link" href="/dal-1976.html">
            Conosci la nostra storia <ArrowRightIcon />
          </a>
        </div>
      </section>
      <section
        className="club-facts teams-wrap"
        aria-label="L’identità del club"
      >
        <div>
          <strong>1976</strong>
          <span>L’ANNO DELLA FONDAZIONE</span>
        </div>
        <div>
          <strong>02</strong>
          <span>PRIME SQUADRE</span>
          <p>Serie C maschile · 1ª Divisione femminile</p>
        </div>
        <div>
          <VolleyballIcon weight="thin" />
          <span>UNA SOLA IDENTITÀ</span>
          <p>Dal primo palleggio alla prima squadra.</p>
        </div>
      </section>
      <section className="club-values teams-wrap">
        <div className="page-heading">
          <div>
            <div className="teams-kicker">IL NOSTRO MODO DI FARE SPORT</div>
            <h2>Valori che entrano in campo.</h2>
          </div>
        </div>
        <div className="club-values-grid">
          {[
            [
              UsersThreeIcon,
              "Insieme",
              "Il gruppo è il luogo in cui imparare a collaborare, condividere gli obiettivi e dare valore al contributo di ciascuno.",
            ],
            [
              ShieldCheckIcon,
              "Con rispetto",
              "Per i compagni, gli avversari, le regole e sé stessi. Il rispetto accompagna ogni gesto, dentro e fuori dalla palestra.",
            ],
            [
              HeartIcon,
              "Per crescere",
              "Lo sport è educazione, socialità e voglia di mettersi in gioco. Il percorso conta quanto il risultato.",
            ],
          ].map(([C, H, q], index) => (
            <article key={H}>
              <span className="club-value-index">0{index + 1}</span>
              <C weight="light" />
              <h3>{H}</h3>
              <p>{q}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="club-paths" id="percorsi">
        <div className="teams-wrap">
          <div className="page-heading">
            <div>
              <div className="teams-kicker">
                TANTE SQUADRE. UNA SOLA IDENTITÀ.
              </div>
              <h2>C’è un percorso per la tua passione.</h2>
            </div>
            <a href="/squadre.html" className="text-link">
              Tutte le squadre <ArrowRightIcon />
            </a>
          </div>
          <div className="club-paths-grid">
            {teams.map((team, index) => (
              <a
                key={team.id}
                href={teamHref(team)}
                className={"club-path " + (index === 4 ? "club-path-mini" : "")}
              >
                <img
                  src={"/assets/" + team.image + ".webp"}
                  alt=""
                  loading="lazy"
                />
                <div>
                  <span>{team.tag}</span>
                  <h3>{team.name}</h3>
                  <span className="club-path-action">
                    Scopri il percorso <ArrowUpRightIcon />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="club-venue teams-wrap" id="in-palestra">
        <div className="club-venue-photo">
          <img
            src="/assets/squadre-hero.webp"
            alt="Vita di squadra in palestra, fotografia dimostrativa"
            loading="lazy"
          />
          <span>FOTO DIMOSTRATIVA</span>
        </div>
        <div>
          <div className="teams-kicker">LA NOSTRA CASA SPORTIVA</div>
          <h2>
            Ci vediamo
            <br />
            <em>in palestra.</em>
          </h2>
          <h3>
            Palazzetto dello Sport
            <br />
            Loredano Vannuccini
          </h3>
          <p>
            Via Foro Boario, Foiano della Chiana (AR). Un luogo di incontro per
            le nostre squadre e per le famiglie che le accompagnano.
          </p>
          <p>
            Prima di venire, contatta la società per confermare il gruppo, la
            sede e l’orario dell’attività che ti interessa.
          </p>
          <div className="club-venue-actions">
            <button
              className="button primary"
              onClick={() => openContact("Gruppi e orari di allenamento")}
            >
              Chiedi gruppi e orari <ArrowRightIcon />
            </button>
            <a
              href={
                "https://www.google.com/maps/search/?api=1&query=Palazzetto+dello+Sport+Via+Foro+Boario+Foiano+della+Chiana"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              <MapPinIcon />
              Apri la mappa <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </section>
      <section className="club-start teams-wrap">
        <div>
          <div className="teams-kicker">PER ATLETI E FAMIGLIE</div>
          <h2>
            Il primo passo?
            <br />
            Facciamolo insieme.
          </h2>
          <p>
            Scrivici indicando anno di nascita ed eventuale esperienza sportiva.
            Ti aiuteremo a conoscere il percorso più adatto.
          </p>
          <button
            className="button primary"
            onClick={() => openContact("Vieni a giocare")}
          >
            Vieni a giocare <ArrowRightIcon />
          </button>
        </div>
        <div className="club-faq">
          {[
            [
              "Come posso iniziare?",
              "Contatta la società per conoscere i gruppi disponibili e le modalità del primo incontro. Età, categorie e disponibilità vengono confermate direttamente dal club.",
            ],
            [
              "Dove trovo orari e quote?",
              "La società comunica orari, sede, quote e documentazione necessaria per il gruppo scelto. Chiedi conferma prima di partecipare.",
            ],
            [
              "Chi sono i referenti del club?",
              "Per informazioni sportive e organizzative usa i recapiti della società. I nominativi di dirigenti, allenatori e staff saranno pubblicati dopo la conferma ufficiale.",
            ],
            [
              "Come posso dare una mano?",
              "Puoi contattare la società per proporti come sostenitore, collaboratore o sponsor. Anche fotografie e ricordi possono contribuire all’archivio storico.",
            ],
          ].map(([C, H]) => (
            <details key={C}>
              <summary>{C}</summary>
              <p>{H}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="club-contact-band on-red">
        <div className="teams-wrap">
          <div>
            <div className="teams-kicker">PARLIAMONE</div>
            <h2>Il club ti ascolta.</h2>
          </div>
          <div>
            <a href="tel:+393339331480">
              <PhoneIcon />
              333 9331480 <ArrowUpRightIcon />
            </a>
            <a href="mailto:marketing.foianopallavolo@gmail.com">
              <EnvelopeSimpleIcon />
              marketing.foianopallavolo@gmail.com <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </section>
      <aside className="match-sponsor teams-wrap">
        <div>
          <div className="teams-kicker">LA SQUADRA OLTRE IL CAMPO</div>
          <h2>Insieme al territorio.</h2>
          <p>Sostieni il progetto sportivo di Foiano Pallavolo.</p>
        </div>
        <button onClick={openSponsors}>
          <strong>DIVENTA PARTNER</strong>
          <span>Scopri gli spazi per il tuo marchio</span>
          <ArrowUpRightIcon />
        </button>
      </aside>
    </div>
  );
}
