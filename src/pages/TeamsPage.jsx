import { useState, useEffect } from "react";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { ASSET_BASE } from "../config";
import { TEAM_SLUGS } from "../data/teams";

export function TeamsPage({
  teams,
  openTeam,
  openContact,
  gotoCalendar,
  openSponsors,
  motionOff,
}) {
  const [activeSection, setActiveSection] = useState("prime-squadre");
  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const nav = document.querySelector(".teams-section-nav");
      const threshold = (nav?.getBoundingClientRect().bottom || 150) + 60;
      let current = "prime-squadre";
      for (const id of ["prime-squadre", "settore-giovanile", "minivolley"]) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= threshold) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    const onScrollOrResize = () => {
      if (!frame) {
        frame = requestAnimationFrame(updateActiveSection);
      }
    };
    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, {
      passive: true,
    });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);
  return (
    <div className={"teams-page " + (motionOff ? "teams-motion-off" : "")}>
      <section className="teams-hero on-red" aria-labelledby="teams-title">
        <img
          className="teams-hero-photo"
          src={ASSET_BASE + "squadre-hero.webp"}
          alt="Atleti e atlete in maglia rossa festeggiano insieme in palestra"
          fetchPriority="high"
        />
        <div className="teams-hero-red" />
        <div className="teams-hero-copy">
          <div className="teams-breadcrumb">
            <a href="/">HOME</a>
            <span>/</span>SQUADRE
          </div>
          <h1 id="teams-title">
            <span>TANTE</span>
            <span>SQUADRE.</span>
            <span>UNA SOLA</span>
            <span>IDENTITÀ.</span>
          </h1>
          <p>Dal primo palleggio alla prima squadra.</p>
        </div>
        <span className="teams-photo-note">FOTO DIMOSTRATIVE</span>
      </section>
      <nav className="teams-section-nav" aria-label="Categorie squadre">
        {[
          ["prime-squadre", "Prime squadre"],
          ["settore-giovanile", "Settore giovanile"],
          ["minivolley", "Minivolley"],
        ].map(([b, A]) => (
          <a
            key={b}
            href={"#" + b}
            aria-current={activeSection === b ? "location" : undefined}
            onClick={() => setActiveSection(b)}
          >
            {A}
          </a>
        ))}
      </nav>
      <section className="teams-first teams-wrap" id="prime-squadre">
        <div className="teams-heading" data-reveal>
          <div className="teams-kicker">LE NOSTRE SQUADRE</div>
          <h2>LE NOSTRE PRIME SQUADRE.</h2>
          <p>Due squadre. La stessa passione.</p>
        </div>
        <div className="teams-first-grid">
          {teams.slice(0, 2).map((team, index) => (
            <article
              key={team.id}
              className="teams-feature"
              id={TEAM_SLUGS[team.id]}
              data-reveal
            >
              <button
                className="teams-feature-photo"
                onClick={() => openTeam(team)}
                aria-label={"Scopri " + team.name}
              >
                <img
                  src={ASSET_BASE + team.image + ".webp"}
                  alt={team.name + " riunita in campo"}
                  loading="lazy"
                />
                <span className="teams-image-action">
                  <ArrowUpRightIcon />
                </span>
              </button>
              <div className="teams-feature-copy">
                <div className="teams-kicker">PRIMA SQUADRA</div>
                <h3>{team.name}</h3>
                <p>
                  La nostra prima squadra{" "}
                  {index === 0 ? "maschile" : "femminile"}.
                </p>
                <div className="teams-card-actions">
                  <button
                    className="button primary"
                    onClick={() => openTeam(team)}
                  >
                    Scopri la squadra <ArrowRightIcon />
                  </button>
                  <button
                    className="button teams-outline"
                    onClick={() => gotoCalendar(team.id)}
                  >
                    Calendario <ArrowRightIcon />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <aside
        className="teams-partners teams-wrap"
        aria-label="Partner delle nostre squadre"
      >
        <h2>
          AL FIANCO
          <br />
          DEL NOSTRO
          <br />
          VOLLEY<span>.</span>
        </h2>
        <div className="teams-partner-grid">
          {["MAIN PARTNER", "OFFICIAL PARTNER", "OFFICIAL PARTNER"].map(
            (item, index) => (
              <button
                key={index}
                onClick={openSponsors}
                aria-label={item + " — scopri gli spazi sponsor"}
              >
                {item}
                <small>Spazio riservato al logo</small>
              </button>
            ),
          )}
        </div>
      </aside>
      <section className="teams-youth teams-wrap" id="settore-giovanile">
        <div className="teams-heading" data-reveal>
          <div className="teams-kicker">SETTORE GIOVANILE</div>
          <h2>IL FUTURO SI ALLENA QUI.</h2>
        </div>
        <div className="teams-youth-grid">
          {teams
            .filter((team) => team.group === "giovanili")
            .map((team) => (
              <article
                key={team.id}
                className="teams-junior"
                id={TEAM_SLUGS[team.id]}
                data-reveal
              >
                <button
                  className="teams-junior-photo"
                  onClick={() => openTeam(team)}
                  aria-label={"Scopri " + team.name}
                >
                  <img
                    src={ASSET_BASE + TEAM_SLUGS[team.id] + ".webp"}
                    alt={"Allenamento " + team.name.toLowerCase()}
                    loading="lazy"
                  />
                </button>
                <div className="teams-junior-copy">
                  <h3>{team.name}</h3>
                  <p>Crescere insieme, in campo e fuori.</p>
                  <button
                    className="button primary"
                    onClick={() => openTeam(team)}
                  >
                    Scopri i gruppi <ArrowRightIcon />
                  </button>
                </div>
              </article>
            ))}
        </div>
      </section>
      <section className="teams-mini" id="minivolley">
        <div className="teams-wrap teams-mini-grid">
          <button
            className="teams-mini-photo"
            onClick={() => openTeam(teams[4])}
            aria-label="Scopri il Minivolley"
          >
            <img
              src={ASSET_BASE + "youth.webp"}
              alt="Allenatore con bambini e bambine durante un allenamento di pallavolo"
              loading="lazy"
            />
          </button>
          <div className="teams-mini-copy" data-reveal>
            <div className="teams-kicker">MINIVOLLEY</div>
            <h2>
              IL PRIMO PUNTO
              <br />È DIVERTIRSI.
            </h2>
            <p>Per bambini e bambine. Un primo passo nello sport, insieme.</p>
            <button
              className="button primary"
              onClick={() => openContact("Minivolley")}
            >
              Chiedi informazioni <ArrowRightIcon />
            </button>
            <button
              className="teams-mini-link"
              onClick={() => openContact("Gruppi, orari e modalità di prova")}
            >
              Gruppi, orari e modalità di prova <ArrowRightIcon />
            </button>
          </div>
        </div>
      </section>
      <section className="teams-join on-red">
        <div className="teams-wrap">
          <div>
            <h2>FACCIAMO SQUADRA.</h2>
            <p>Trova il tuo posto in campo.</p>
          </div>
          <button className="button white" onClick={() => openContact()}>
            Vieni a giocare <ArrowRightIcon />
          </button>
        </div>
      </section>
    </div>
  );
}
