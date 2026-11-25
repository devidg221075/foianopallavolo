import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarBlankIcon,
  ClockIcon,
  MapPinIcon,
  PlusIcon,
  VolleyballIcon,
} from "@phosphor-icons/react";
import { Mascots } from "../components/Mascots";
import { ASSET_BASE } from "../config";
import { TEAM_PAGES } from "../data/teamPages";
import { matchesUrl } from "../lib/routes";

export function TeamPage({ team, teams, teamHref, openContact, openSponsors }) {
  const content = TEAM_PAGES[team.id];
  const isFirstTeam = ["c", "f"].includes(team.id);
  const isMini = team.id === "mini";
  const sectionId = isFirstTeam ? "la-stagione" : "il-percorso";
  const askInfo = () => openContact("Informazioni " + team.name);
  return (
    <div className={"teams-page team-detail detail-" + team.id}>
      <section className="teams-hero on-red" aria-labelledby="team-title">
        <img
          className="teams-hero-photo"
          src={ASSET_BASE + (isMini ? "youth" : team.image) + ".webp"}
          alt={
            isMini
              ? "Bambini e bambine durante un allenamento"
              : team.name + " in palestra"
          }
          fetchPriority="high"
        />
        <div className="teams-hero-red" />
        <div className="teams-hero-copy">
          <div className="teams-breadcrumb">
            <a href="/">HOME</a>
            <span>/</span>
            <a href="/squadre.html">SQUADRE</a>
          </div>
          <div className="detail-category">{team.tag}</div>
          <h1 id="team-title">
            {content.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p>{content.motto}</p>
          <a
            className="detail-hero-link"
            href={"#" + (isFirstTeam ? sectionId : "informazioni")}
          >
            {isFirstTeam ? "Segui la squadra" : content.cta}
            <ArrowUpRightIcon />
          </a>
        </div>
        <span className="teams-photo-note">FOTO DIMOSTRATIVE</span>
      </section>
      <nav
        className="teams-section-nav"
        aria-label={"In questa pagina: " + team.name}
      >
        <a href="#il-gruppo">
          {isFirstTeam ? "La squadra" : isMini ? "Il Minivolley" : "Il settore"}
        </a>
        <a href={"#" + sectionId}>
          {isFirstTeam
            ? "Partite e stagione"
            : isMini
              ? "Giocare e crescere"
              : "Il percorso"}
        </a>
        <a href="#informazioni">
          {isMini ? "Per le famiglie" : "Informazioni"}
        </a>
      </nav>
      <section className="detail-intro teams-wrap" id="il-gruppo">
        <div data-reveal>
          <div className="teams-kicker">{team.name.toUpperCase()}</div>
          <h2>{content.title}</h2>
        </div>
        <div className="detail-intro-copy" data-reveal>
          <p className="detail-lead">{content.intro}</p>
          <p>{content.body}</p>
          <div className="detail-location">
            <MapPinIcon size={17} />
            Foiano della Chiana<span>Dal 1976</span>
          </div>
        </div>
      </section>
      {isFirstTeam ? (
        <section className="detail-season" id={sectionId}>
          <div className="teams-wrap">
            <div className="teams-heading" data-reveal>
              <div className="teams-kicker">
                LA STAGIONE · {team.short.toUpperCase()}
              </div>
              <h2>IL PROSSIMO PUNTO.</h2>
              <p>Segui ogni appuntamento della nostra {team.name}.</p>
            </div>
            <div className="detail-match-grid">
              <article
                className="detail-match on-red"
                aria-label={"Prossima partita " + team.name}
              >
                <div className="detail-match-label">
                  PROSSIMA PARTITA<span>{team.short}</span>
                </div>
                <div className="detail-match-clubs">
                  <div>
                    <img
                      src={ASSET_BASE + "logo-bianco.png"}
                      alt="Foiano Pallavolo"
                    />
                    <strong>FOIANO</strong>
                  </div>
                  <b>VS</b>
                  <div>
                    <VolleyballIcon weight="thin" />
                    <span>
                      Avversario
                      <br />
                      da confermare
                    </span>
                  </div>
                </div>
                <p>Il calendario ufficiale è in aggiornamento.</p>
                <div className="detail-match-meta">
                  <span>
                    <CalendarBlankIcon />
                    Data da confermare
                  </span>
                  <span>
                    <ClockIcon />
                    Orario da confermare
                  </span>
                  <span>
                    <MapPinIcon />
                    Campo da confermare
                  </span>
                </div>
                <a className="button white" href={matchesUrl(team.id)}>
                  Calendario della squadra <ArrowRightIcon />
                </a>
              </article>
              <div className="detail-season-side">
                <a href={matchesUrl(team.id)}>
                  <CalendarBlankIcon />
                  <span>
                    <strong>Calendario</strong>
                    <small>Tutti gli appuntamenti della squadra.</small>
                  </span>
                  <ArrowUpRightIcon />
                </a>
                <a href={matchesUrl(team.id, "risultati")}>
                  <VolleyballIcon />
                  <span>
                    <strong>Risultati</strong>
                    <small>I punteggi dopo la pubblicazione ufficiale.</small>
                  </span>
                  <ArrowUpRightIcon />
                </a>
                <div className="detail-official-note">
                  <span className="teams-kicker">ROSA E STAFF</span>
                  <h3>Le persone, al centro.</h3>
                  <p>
                    {team.id === "f" ? "Atlete" : "Atleti"}, allenatori e staff
                    saranno presentati qui dopo la conferma dei nominativi
                    ufficiali.
                  </p>
                  <button className="text-link" onClick={askInfo}>
                    Chiedi informazioni <ArrowUpRightIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="detail-path teams-wrap" id={sectionId}>
          <div className="teams-heading" data-reveal>
            <div className="teams-kicker">
              {isMini
                ? "IL PIACERE DI COMINCIARE"
                : "CRESCERE CON LA PALLAVOLO"}
            </div>
            <h2>{content.focus}</h2>
          </div>
          <div className="detail-values">
            {content.values.map(([Z, U], index) => (
              <article key={Z} data-reveal>
                <span className="detail-step">0{index + 1}</span>
                <h3>{Z}</h3>
                <p>{U}</p>
              </article>
            ))}
          </div>
          <div className="detail-path-note">
            <p>
              {isMini
                ? "Età, gruppi e modalità di partecipazione vengono confermati dalla società."
                : "Categorie e composizione dei gruppi vengono definite dalla società: chiedi le informazioni per il percorso più adatto."}
            </p>
            <button className="text-link" onClick={askInfo}>
              {content.cta} <ArrowUpRightIcon />
            </button>
          </div>
        </section>
      )}
      <section className="detail-editorial teams-wrap">
        <div className="detail-editorial-photo" data-reveal>
          <img
            src={ASSET_BASE + content.photo + ".webp"}
            alt={content.photoAlt}
            loading="lazy"
          />
          <span>FOTO DIMOSTRATIVA</span>
        </div>
        <div className="detail-editorial-copy" data-reveal>
          <div className="teams-kicker">
            {isFirstTeam
              ? "LA NOSTRA IDENTITÀ"
              : isMini
                ? "UNA NUOVA AVVENTURA"
                : "DENTRO IL GRUPPO"}
          </div>
          <h2>
            {isFirstTeam
              ? content.focus
              : isMini
                ? "Un pallone. Tanti nuovi amici."
                : "Il valore di esserci."}
          </h2>
          <p>
            {isFirstTeam
              ? content.values[0][1]
              : isMini
                ? "Scoprire un gioco nuovo significa anche incontrare altre persone, imparare a condividere e trovare il proprio spazio. Il Minivolley è un invito a cominciare insieme."
                : "Allenarsi con gli altri, rispettare le regole e affrontare una sfida: la pallavolo offre occasioni per mettersi in gioco, dentro e fuori dal campo."}
          </p>
          <button className="button primary" onClick={askInfo}>
            {content.cta} <ArrowRightIcon />
          </button>
        </div>
      </section>
      <aside
        className="detail-sponsor teams-wrap"
        aria-label={"Sponsor " + team.name}
      >
        <div>
          <span className="teams-kicker">AL FIANCO DELLA SQUADRA</span>
          <h2>Il tuo marchio. La nostra passione.</h2>
        </div>
        <button className="detail-sponsor-space" onClick={openSponsors}>
          PARTNER<small>Spazio riservato al logo</small>
        </button>
        <button className="text-link" onClick={openSponsors}>
          Sostieni il club <ArrowUpRightIcon />
        </button>
      </aside>
      <section className="detail-info" id="informazioni">
        <div className="teams-wrap detail-info-grid">
          <div data-reveal>
            <div className="teams-kicker">
              {isMini ? "PER LE FAMIGLIE" : "INFORMAZIONI UTILI"}
            </div>
            <h2>
              {isMini
                ? "Cominciamo dalle tue domande."
                : "Tutto parte da un contatto."}
            </h2>
            <p>
              {isFirstTeam
                ? "Partite, squadra e vita del club: la società è il riferimento per tutte le informazioni aggiornate."
                : "Raccontaci l’anno di nascita e l’eventuale esperienza sportiva. La società ti aiuterà a conoscere il gruppo e le modalità di partecipazione."}
            </p>
            <button className="button primary" onClick={askInfo}>
              Scrivi alla società <ArrowRightIcon />
            </button>
          </div>
          <div className="detail-faqs">
            {content.faqs.map(([Z, U]) => (
              <details key={Z}>
                <summary>
                  {Z}
                  <PlusIcon />
                </summary>
                <p>{U}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="teams-join on-red">
        <div className="teams-wrap">
          <div>
            <h2>{content.join}</h2>
            <p>{content.joinText}</p>
          </div>
          <Mascots teamId={team.id} className="mascots-join" />
          <button className="button white" onClick={askInfo}>
            {isFirstTeam ? "Contatta il club" : "Chiedi informazioni"}{" "}
            <ArrowRightIcon />
          </button>
        </div>
      </section>
      <nav
        className="detail-more teams-wrap"
        aria-label="Scopri le altre squadre"
      >
        <div className="teams-kicker">TANTE SQUADRE. UNA SOLA IDENTITÀ.</div>
        <div>
          {teams
            .filter((teamItem) => teamItem.id !== team.id)
            .map((teamItem) => (
              <a key={teamItem.id} href={teamHref(teamItem)}>
                {teamItem.name}
                <ArrowUpRightIcon />
              </a>
            ))}
          <a href="/squadre.html">
            Tutte le squadre
            <ArrowRightIcon />
          </a>
        </div>
      </nav>
    </div>
  );
}
