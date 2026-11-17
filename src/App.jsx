import { useState, useEffect, useRef } from "react";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  CalendarBlankIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CheckIcon,
  ClockIcon,
  EnvelopeSimpleIcon,
  ListIcon,
  MapPinIcon,
  PauseIcon,
  PhoneIcon,
  PlayIcon,
  PlusIcon,
  ShieldCheckIcon,
  VolleyballIcon,
  XIcon,
} from "@phosphor-icons/react";
import { CountUp } from "./components/CountUp";
import { Eyebrow } from "./components/Eyebrow";
import { NewsSection } from "./components/NewsSection";
import { SectionHeading } from "./components/SectionHeading";
import { SiteLink } from "./components/SiteLink";
import { MobileTeamLinks, TeamMegaMenu } from "./components/TeamMenu";
import { ASSET_BASE } from "./config";
import { HERO_SLIDES } from "./data/heroSlides";
import { featuredNews } from "./data/news";
import { TEAMS } from "./data/teams";
import { MONTH_NAMES, WEEKDAYS } from "./lib/calendar";
import {
  currentTeamId,
  isClubPage,
  isContactPage,
  isHistoryPage,
  isInnerPage,
  isMatchesPage,
  isSponsorPage,
  isTeamsPage,
  matchesUrl,
  teamHref,
} from "./lib/routes";
import { ClubPage } from "./pages/ClubPage";
import { ContactPage } from "./pages/ContactPage";
import { HistoryPage } from "./pages/HistoryPage";
import { MatchesPage } from "./pages/MatchesPage";
import { SponsorPage } from "./pages/SponsorPage";
import { TeamPage } from "./pages/TeamPage";
import { TeamsPage } from "./pages/TeamsPage";

export function App() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [teamsMenuOpen, setTeamsMenuOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [matchTeamId, setMatchTeamId] = useState(
    () => new URLSearchParams(location.search).get("squadra") || "c",
  );
  const [matchView, setMatchView] = useState(() =>
    new URLSearchParams(location.search).get("vista") === "risultati"
      ? "risultati"
      : "calendario",
  );
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [timelineTab, setTimelineTab] = useState(0);
  const [motionOff, setMotionOff] = useState(
    () =>
      localStorage.getItem("foiano-motion") === "off" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [scrolled, setScrolled] = useState(false);
  const [contactInterest, setContactInterest] = useState("Vieni a giocare");
  const [contactName, setContactName] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [emailPrepared, setEmailPrepared] = useState(false);
  const heroRef = useRef();
  const dialogRef = useRef();
  const slide = HERO_SLIDES[slideIndex];
  const featuredTeam =
    TEAMS.find((item) => item.id === matchTeamId) || TEAMS[0];
  const openContact = (E = "Vieni a giocare") => {
    setContactInterest(E);
    setEmailPrepared(false);
    setDialog({
      type: "contact",
    });
  };
  const openTeam = (E) => {
    location.assign(teamHref(E));
  };
  const closeDialog = () => {
    setDialog(null);
    setLightbox(null);
  };
  useEffect(() => {
    const E = matchMedia("(min-width:1101px)");
    const _ = () => {
      if (E.matches) {
        setMobileMenuOpen(false);
      }
    };
    E.addEventListener("change", _);
    return () => E.removeEventListener("change", _);
  }, []);
  useEffect(() => {
    if (!teamsMenuOpen) return;
    const E = (event) => {
      if (!event.target.closest(".nav-with-menu")) {
        setTeamsMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", E);
    return () => document.removeEventListener("pointerdown", E);
  }, [teamsMenuOpen]);
  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => {
        return document
          .getElementById(decodeURIComponent(location.hash.slice(1)))
          ?.scrollIntoView({
            behavior: "instant",
          });
      });
    }
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = motionOff ? "off" : "on";
    localStorage.setItem("foiano-motion", motionOff ? "off" : "on");
  }, [motionOff]);
  useEffect(() => {
    if (isInnerPage || heroPaused || motionOff || dialog || lightbox) return;
    const E = setInterval(
      () => setSlideIndex((_) => (_ + 1) % HERO_SLIDES.length),
      8e3,
    );
    return () => clearInterval(E);
  }, [heroPaused, motionOff, dialog, lightbox]);
  useEffect(() => {
    const E = () => setScrolled(scrollY > 35);
    window.addEventListener("scroll", E, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", E);
  }, []);
  useEffect(() => {
    const E = new IntersectionObserver(
      (_) =>
        _.forEach((item) => {
          if (item.isIntersecting) {
            item.target.classList.add("is-visible");
            E.unobserve(item.target);
          }
        }),
      {
        threshold: 0.08,
      },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((item) => E.observe(item));
    return () => E.disconnect();
  }, []);
  useEffect(() => {
    const E = !!dialog || !!lightbox || mobileMenuOpen;
    document.body.style.overflow = E ? "hidden" : "";
    function _(event) {
      if (
        (event.key === "Escape" &&
          (closeDialog(), setMobileMenuOpen(false), setTeamsMenuOpen(false)),
        event.key === "Tab" && dialogRef.current)
      ) {
        const ma = dialogRef.current.querySelectorAll(
          "button,a,input,textarea,select",
        );
        const Fi = ma[0];
        const Ft = ma[ma.length - 1];
        if (event.shiftKey && document.activeElement === Fi) {
          event.preventDefault();
          Ft.focus();
        } else {
          if (!event.shiftKey && document.activeElement === Ft) {
            event.preventDefault();
            Fi.focus();
          }
        }
      }
    }
    window.addEventListener("keydown", _);
    if (dialog || lightbox) {
      requestAnimationFrame(() => {
        return dialogRef.current?.querySelector("button")?.focus();
      });
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", _);
    };
  }, [dialog, lightbox, mobileMenuOpen]);
  const changeMonth = (E) => {
    let _ = month + E;
    let ce = year;
    if (_ < 0) {
      _ = 11;
      ce--;
    }
    if (_ > 11) {
      _ = 0;
      ce++;
    }
    setMonth(_);
    setYear(ce);
    setSelectedDay(null);
  };
  const gotoCalendar = (E) => location.assign(matchesUrl(E));
  function onHeroPointerMove(event) {
    if (motionOff || innerWidth < 900) return;
    const _ = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--mx",
      ((event.clientX - _.left) / _.width - 0.5) * 12 + "px",
    );
    event.currentTarget.style.setProperty(
      "--my",
      ((event.clientY - _.top) / _.height - 0.5) * 9 + "px",
    );
  }
  const firstWeekdayOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  function prepareEmail() {
    const E = `Ciao Foiano Pallavolo,
sono ${contactName}.

${contactMessage}

Interesse: ${contactInterest}`;
    const _ = `mailto:marketing.foianopallavolo@gmail.com?subject=${encodeURIComponent(contactInterest + " - " + contactName)}&body=${encodeURIComponent(E)}`;
    window.location.href = _;
    setEmailPrepared(true);
  }
  return (
    <>
      <a href="#contenuto" className="skip-link">
        Vai al contenuto
      </a>
      <header className={"site-header " + (scrolled ? "scrolled" : "")}>
        <a
          href="/"
          className="brand"
          aria-label="Foiano Pallavolo, torna alla home"
        >
          <img
            src={ASSET_BASE + "logo-ufficiale-fondo-rosso.png"}
            alt="Logo ufficiale Foiano Pallavolo"
          />
          <div className="brand-copy">
            <strong>FOIANO PALLAVOLO</strong>
            <span>DAL 1976</span>
          </div>
        </a>
        <nav aria-label="Menu principale" className="desktop-nav">
          <SiteLink to="home" aria-current={isInnerPage ? undefined : "page"}>
            Home
          </SiteLink>
          <div
            className="nav-with-menu"
            onMouseEnter={(event) => {
              if (!event.target.closest(".mega-toggle")) {
                setTeamsMenuOpen(true);
              }
            }}
            onMouseLeave={() => setTeamsMenuOpen(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setTeamsMenuOpen(false);
              }
            }}
            onKeyDown={(event) => {
              var _;
              if (event.key === "Escape") {
                event.preventDefault();
                setTeamsMenuOpen(false);
                if (
                  !(
                    (_ = event.currentTarget.querySelector(".mega-toggle")) ==
                    null
                  )
                ) {
                  _.focus();
                }
              }
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setTeamsMenuOpen(true);
                requestAnimationFrame(() => {
                  return document
                    .querySelector("#squadre-mega-menu a")
                    ?.focus();
                });
              }
            }}
          >
            <SiteLink
              to="squadre"
              aria-current={isTeamsPage || currentTeamId ? "page" : undefined}
            >
              Squadre
            </SiteLink>
            <button
              className="mega-toggle"
              aria-label={
                teamsMenuOpen ? "Chiudi menu Squadre" : "Apri menu Squadre"
              }
              aria-expanded={teamsMenuOpen}
              aria-controls="squadre-mega-menu"
              onClick={() => setTeamsMenuOpen((E) => !E)}
            >
              <CaretDownIcon size={14} />
            </button>
            {teamsMenuOpen && (
              <TeamMegaMenu
                teams={TEAMS}
                teamHref={teamHref}
                active={currentTeamId}
                close={() => setTeamsMenuOpen(false)}
              />
            )}
          </div>
          <SiteLink
            to="storia"
            aria-current={isHistoryPage ? "page" : undefined}
          >
            Dal 1976
          </SiteLink>
          <SiteLink
            to="prossime-partite"
            aria-current={isMatchesPage ? "page" : undefined}
          >
            Partite e risultati
          </SiteLink>
          <SiteLink to="club" aria-current={isClubPage ? "page" : undefined}>
            Il club
          </SiteLink>
          <SiteLink
            to="partner"
            aria-current={isSponsorPage ? "page" : undefined}
          >
            Sponsor
          </SiteLink>
          <SiteLink
            to="contatti"
            aria-current={isContactPage ? "page" : undefined}
          >
            Contatti
          </SiteLink>
        </nav>
        <button
          className="button primary header-cta"
          onClick={() => openContact()}
        >
          Vieni a giocare <ArrowRightIcon size={20} />
        </button>
        <button
          className="menu-button"
          aria-label={mobileMenuOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((E) => !E)}
        >
          {mobileMenuOpen ? <XIcon /> : <ListIcon />}
        </button>
      </header>
      <div className="header-spacer" aria-hidden="true" />
      {mobileMenuOpen && (
        <nav className="mobile-menu" aria-label="Menu mobile">
          <Eyebrow>Foiano Pallavolo</Eyebrow>
          {[
            ["home", "Home"],
            ["squadre", "Squadre"],
            ["storia", "Dal 1976"],
            ["prossime-partite", "Partite e risultati"],
            ["club", "Il club"],
            ["partner", "Sponsor"],
            ["contatti", "Contatti"],
          ].map(([E, _], index) =>
            E === "squadre" ? (
              <div key={E} className="mobile-squadre-entry">
                <SiteLink to={E} onClick={() => setMobileMenuOpen(false)}>
                  <small>0{index + 1}</small>
                  {_}
                  <ArrowUpRightIcon />
                </SiteLink>
                <MobileTeamLinks
                  teams={TEAMS}
                  teamHref={teamHref}
                  active={currentTeamId}
                />
              </div>
            ) : (
              <SiteLink key={E} to={E} onClick={() => setMobileMenuOpen(false)}>
                <small>0{index + 1}</small>
                {_}
                <ArrowUpRightIcon />
              </SiteLink>
            ),
          )}
          <button
            className="button primary"
            onClick={() => {
              setMobileMenuOpen(false);
              openContact();
            }}
          >
            Vieni a giocare <ArrowRightIcon />
          </button>
          <span className="mobile-menu-bottom">
            Una passione che continua. Dal 1976.
          </span>
        </nav>
      )}
      <main id="contenuto">
        {isSponsorPage ? (
          <SponsorPage openContact={openContact} />
        ) : isContactPage ? (
          <ContactPage />
        ) : isMatchesPage ? (
          <MatchesPage
            openContact={openContact}
            openSponsors={() => location.assign("/sponsor.html")}
          />
        ) : isClubPage ? (
          <ClubPage
            teams={TEAMS}
            teamHref={teamHref}
            openContact={openContact}
            openSponsors={() => location.assign("/sponsor.html")}
          />
        ) : isHistoryPage ? (
          <HistoryPage openContact={openContact} />
        ) : currentTeamId ? (
          <TeamPage
            team={TEAMS.find((item) => item.id === currentTeamId)}
            teams={TEAMS}
            teamHref={teamHref}
            openContact={openContact}
            openSponsors={() => location.assign("/sponsor.html")}
          />
        ) : isTeamsPage ? (
          <TeamsPage
            teams={TEAMS}
            openTeam={openTeam}
            openContact={openContact}
            gotoCalendar={gotoCalendar}
            openSponsors={() => location.assign("/sponsor.html")}
            motionOff={motionOff}
          />
        ) : (
          <>
            <section
              id="home"
              className={
                "hero slide-" + slide.k + (motionOff ? " no-motion" : "")
              }
              ref={heroRef}
              onPointerMove={onHeroPointerMove}
              onPointerLeave={(event) => {
                event.currentTarget.style.setProperty("--mx", "0px");
                event.currentTarget.style.setProperty("--my", "0px");
              }}
              aria-roledescription="carosello"
              aria-label="In evidenza"
            >
              <div className="hero-red" />
              <div className="hero-court" />
              <div key={"text" + slideIndex} className="hero-copy">
                <Eyebrow light>{slide.eyebrow}</Eyebrow>
                <h1>
                  {slide.lines.map((line, index) => (
                    <span
                      key={index}
                      style={{
                        "--i": index,
                      }}
                    >
                      <b>{line}</b>
                    </span>
                  ))}
                </h1>
                {slide.news ? (
                  <>
                    <a href={slide.href} className="hero-link">
                      {slide.cta}
                      <ArrowUpRightIcon weight="bold" />
                    </a>
                    <span className="hero-news-date">{slide.dateLabel}</span>
                  </>
                ) : (
                  <SiteLink to={slide.target} className="hero-link">
                    {slide.cta}
                    <ArrowUpRightIcon weight="bold" />
                  </SiteLink>
                )}
              </div>
              <div className="hero-word" aria-hidden="true">
                {slide.news ? slide.word : "FOIANO"}
              </div>
              {slide.news ? (
                <img
                  className="hero-news-photo"
                  src="/assets/story.webp"
                  alt="Atleti e atlete festeggiano in campo, fotografia dimostrativa"
                />
              ) : (
                <>
                  {" "}
                  <div key={"athlete" + slideIndex} className="athlete-layer">
                    <img
                      className="hero-athlete"
                      src={ASSET_BASE + slide.image + ".webp"}
                      alt={
                        slide.k === "woman"
                          ? "Atleta di pallavolo in maglia rossa in azione"
                          : "Atleta in maglia rossa in salto per la schiacciata"
                      }
                      fetchPriority="high"
                    />
                  </div>
                  <div key={"inset" + slideIndex} className="hero-inset">
                    <img
                      src={ASSET_BASE + slide.small + ".webp"}
                      alt={
                        slide.k === "young"
                          ? "Allenamento del settore giovanile"
                          : "Pallavolo femminile, energia in campo"
                      }
                    />
                    <span>{slide.label}</span>
                  </div>
                </>
              )}
              <div className="hero-controls">
                <span className="slide-number">
                  <strong>{String(slideIndex + 1).padStart(2, "0")}</strong>
                  <i>/{String(HERO_SLIDES.length).padStart(2, "0")}</i>
                </span>
                <div className="slide-track">
                  {HERO_SLIDES.map((slideItem, index) => (
                    <button
                      key={slideItem.k}
                      className={slideIndex === index ? "active" : ""}
                      aria-label={
                        slideItem.news
                          ? "Vai alla notizia in evidenza"
                          : "Vai alla foto " + (index + 1)
                      }
                      aria-current={slideIndex === index ? "true" : undefined}
                      onClick={() => setSlideIndex(index)}
                    >
                      <span
                        key={
                          slideIndex === index ? slideIndex + "active" : index
                        }
                        style={{
                          animationPlayState:
                            heroPaused || motionOff ? "paused" : "running",
                        }}
                      />
                    </button>
                  ))}
                </div>
                <button
                  aria-label="Foto precedente"
                  onClick={() =>
                    setSlideIndex(
                      (slideIndex + HERO_SLIDES.length - 1) %
                        HERO_SLIDES.length,
                    )
                  }
                >
                  <CaretLeftIcon weight="bold" />
                </button>
                <button
                  aria-label={
                    heroPaused
                      ? "Riprendi slideshow"
                      : "Metti in pausa slideshow"
                  }
                  onClick={() => setHeroPaused((E) => !E)}
                >
                  {heroPaused ? (
                    <PlayIcon weight="fill" size={16} />
                  ) : (
                    <PauseIcon weight="fill" size={16} />
                  )}
                </button>
                <button
                  aria-label="Foto successiva"
                  onClick={() =>
                    setSlideIndex((slideIndex + 1) % HERO_SLIDES.length)
                  }
                >
                  <CaretRightIcon weight="bold" />
                </button>
              </div>
              {featuredNews && !slide.news && (
                <a
                  className="hero-news-shortcut"
                  href={"/dal-1976.html#" + featuredNews.id}
                >
                  <span>
                    <small>IN EVIDENZA · DAL CLUB</small>
                    {featuredNews.hero.shortLabel || featuredNews.title}
                  </span>
                  <ArrowUpRightIcon />
                </a>
              )}
              <span className="photo-note">FOTO DIMOSTRATIVE</span>
              <span className="hero-index">
                SCORRI PER SCOPRIRE <ArrowRightIcon />
              </span>
            </section>
            <section
              className="next-matches"
              id="prossime-partite"
              aria-labelledby="next-matches-title"
            >
              <div className="section-wrap">
                <div className="next-matches-heading">
                  <div>
                    <Eyebrow>Le nostre prime squadre</Eyebrow>
                    <h2 id="next-matches-title">
                      Il prossimo punto.<em> Insieme.</em>
                    </h2>
                  </div>
                  <SiteLink to="partite" className="text-link">
                    Tutte le partite <ArrowRightIcon />
                  </SiteLink>
                </div>
                <div className="next-matches-grid">
                  {TEAMS.slice(0, 2).map((item, index) => (
                    <article key={item.id} className="next-match-card">
                      <div className="next-card-heading">
                        <span className="match-order">0{index + 1}</span>
                        <div>
                          <span className="red-label">PROSSIMA PARTITA</span>
                          <h3>{item.name}</h3>
                        </div>
                        <button
                          aria-label={"Calendario " + item.name}
                          className="next-match-arrow"
                          onClick={() => gotoCalendar(item.id)}
                        >
                          <ArrowUpRightIcon />
                        </button>
                      </div>
                      <div className="next-match-body">
                        <div className="next-club">
                          <img
                            src={ASSET_BASE + "logo-rosso.png"}
                            alt="Foiano Pallavolo"
                          />
                          <strong>FOIANO</strong>
                        </div>
                        <span className="next-versus">VS</span>
                        <div className="next-opponent">
                          <VolleyballIcon weight="thin" />
                          <span>
                            Avversario
                            <br />
                            da confermare
                          </span>
                        </div>
                        <div className="next-kickoff">
                          <span>IN AGENDA</span>
                          <strong>—</strong>
                          <small>Data da confermare</small>
                        </div>
                      </div>
                      <div className="next-match-bottom">
                        <span>
                          <ClockIcon size={13} />
                          Orario da confermare
                        </span>
                        <span>
                          <MapPinIcon size={13} />
                          Campo da confermare
                        </span>
                        <button onClick={() => gotoCalendar(item.id)}>
                          Calendario <ArrowRightIcon size={16} />
                        </button>
                      </div>
                      <p className="fixture-pending">
                        Calendario ufficiale in aggiornamento
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
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
            <section className="team-section section-wrap" id="squadre">
              <SectionHeading>Tante squadre. Una sola identità.</SectionHeading>
              <div className="team-grid">
                {[
                  {
                    name: "Maschile",
                    image: "men",
                    desc: "Serie C e settore giovanile",
                    team: TEAMS[0],
                  },
                  {
                    name: "Femminile",
                    image: "women",
                    desc: "Prima Divisione e settore giovanile",
                    team: TEAMS[1],
                  },
                  {
                    name: "Minivolley",
                    image: "mini",
                    desc: "Il primo passo, per bambini e bambine",
                    team: TEAMS[4],
                  },
                ].map((item, index) => (
                  <button
                    key={item.name}
                    className="team-tile"
                    data-reveal
                    onClick={() => openTeam(item.team)}
                  >
                    <img
                      src={ASSET_BASE + item.image + ".webp"}
                      alt={"Foiano Pallavolo " + item.name}
                      loading="lazy"
                    />
                    <div className="team-tile-bar">
                      <span>{item.name}</span>
                      <ArrowRightIcon />
                    </div>
                    <div className="team-tile-hover">
                      <span>{item.desc}</span>
                      <ArrowUpRightIcon />
                    </div>
                    <span className="tile-no">0{index + 1}</span>
                  </button>
                ))}
              </div>
              <div className="section-foot">
                <span>DAL MINIVOLLEY ALLA SERIE C</span>
                <button onClick={() => location.assign("/squadre.html")}>
                  Scopri tutti i gruppi <PlusIcon size={16} />
                </button>
              </div>
            </section>
            <NewsSection />
            <section className="numbers-section" aria-label="I numeri del club">
              <div className="numbers-intro" data-reveal>
                <Eyebrow>Le nostre radici</Eyebrow>
                <h2>
                  La passione
                  <br />
                  si tramanda.
                </h2>
                <SiteLink to="storia">
                  La nostra storia <ArrowUpRightIcon />
                </SiteLink>
              </div>
              <div className="number-cell" data-reveal>
                <div className="number">
                  <CountUp value={1976} />
                  <small>DAL</small>
                </div>
                <span>L'anno del primo palleggio.</span>
              </div>
              <div className="number-cell" data-reveal>
                <div className="number">
                  <CountUp value={new Date().getFullYear() - 1976} />
                  <small>ANNI</small>
                </div>
                <span>Generazioni, una stessa passione.</span>
              </div>
              <div className="number-cell" data-reveal>
                <div className="number">
                  <CountUp value={2} pad />
                  <small>PRIME SQUADRE</small>
                </div>
                <span>Serie C maschile · 1ª Divisione femminile.</span>
              </div>
            </section>
            <section className="club-section section-wrap" id="club">
              <SectionHeading
                aside={
                  <SiteLink to="club" className="text-link">
                    Scopri il club <ArrowRightIcon />
                  </SiteLink>
                }
              >
                Foiano Pallavolo, dal 1976.
              </SectionHeading>
              <div className="editorial-grid">
                <button
                  className="editorial-main editorial-photo"
                  data-reveal
                  onClick={() => location.assign("/il-club.html")}
                >
                  <div className="photo-frame">
                    <img
                      src={ASSET_BASE + "women.webp"}
                      alt="La squadra femminile riunita in campo"
                      loading="lazy"
                    />
                    <span className="image-expand">
                      <PlusIcon />
                    </span>
                  </div>
                  <div className="editorial-caption">
                    <span className="red-label">IL CLUB</span>
                    <h3>
                      Squadre maschili e femminili.
                      <br />
                      Una sola società.
                    </h3>
                    <ArrowUpRightIcon />
                  </div>
                </button>
                <div className="editorial-stack">
                  <button
                    className="editorial-side"
                    data-reveal
                    onClick={() => openTeam(TEAMS[0])}
                  >
                    <div className="photo-frame">
                      <img
                        src={ASSET_BASE + "men.webp"}
                        alt="La squadra maschile"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <span className="red-label">LE NOSTRE SQUADRE</span>
                      <h3>
                        Dal Minivolley
                        <br />
                        alla Serie C.
                      </h3>
                      <ArrowUpRightIcon />
                    </div>
                  </button>
                  <button
                    className="editorial-side"
                    data-reveal
                    onClick={() => openContact()}
                  >
                    <div className="photo-frame">
                      <img
                        src={ASSET_BASE + "mini.webp"}
                        alt="Minivolley, i primi palleggi"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <span className="red-label">IL FUTURO È QUI</span>
                      <h3>
                        Insieme per lo sport,
                        <br />
                        per i nostri ragazzi!
                      </h3>
                      <ArrowUpRightIcon />
                    </div>
                  </button>
                </div>
              </div>
            </section>
            <section className="match-section" id="partite">
              <div className="section-wrap">
                <SectionHeading
                  aside={
                    <span className="season-label">
                      <span /> STAGIONE 2026 / 2027
                    </span>
                  }
                >
                  Il volley della settimana.
                </SectionHeading>
                <div className="match-toolbar">
                  <div
                    className="team-tabs"
                    role="tablist"
                    aria-label="Seleziona squadra"
                  >
                    {[
                      ["c", "Serie C maschile"],
                      ["f", "1ª Divisione femminile"],
                      ["gm", "Giovanili"],
                      ["mini", "Minivolley"],
                    ].map(([E, _]) => (
                      <button
                        key={E}
                        role="tab"
                        aria-selected={matchTeamId === E}
                        onClick={() => setMatchTeamId(E)}
                      >
                        {_}
                      </button>
                    ))}
                  </div>
                  <div className="view-tabs" aria-label="Visualizzazione">
                    <button
                      className={matchView === "calendario" ? "active" : ""}
                      onClick={() => setMatchView("calendario")}
                    >
                      <CalendarBlankIcon /> Calendario
                    </button>
                    <button
                      className={matchView === "risultati" ? "active" : ""}
                      onClick={() => setMatchView("risultati")}
                    >
                      <VolleyballIcon /> Risultati
                    </button>
                  </div>
                </div>
                <div key={matchTeamId + matchView} className="match-layout">
                  <div className="scoreboard">
                    <div className="scoreboard-top">
                      <span>
                        {matchView === "calendario"
                          ? "PROSSIMA PARTITA"
                          : "ULTIMO RISULTATO"}
                      </span>
                      <span className="outlined-label">
                        {featuredTeam.short || featuredTeam.name}
                      </span>
                    </div>
                    <div className="match-clubs">
                      <div>
                        <img
                          src={ASSET_BASE + "logo-bianco.png"}
                          alt="Foiano Pallavolo"
                        />
                        <strong>FOIANO</strong>
                      </div>
                      <div className="score-digits">
                        <span>–</span>
                        <i>{matchView === "calendario" ? "VS" : "—"}</i>
                        <span>–</span>
                      </div>
                      <div className="opponent">
                        <VolleyballIcon weight="thin" />
                        <strong>DA DEFINIRE</strong>
                      </div>
                    </div>
                    <div className="scoreboard-status">
                      <span className="status-line" />
                      <p>
                        {matchView === "calendario"
                          ? "Il prossimo appuntamento sta arrivando."
                          : "Pronti a raccontare ogni punto."}
                        <small>
                          {matchView === "calendario"
                            ? "Calendario ufficiale in aggiornamento."
                            : "Risultati ufficiali non ancora pubblicati."}
                        </small>
                      </p>
                    </div>
                    <div className="scoreboard-bottom">
                      <CalendarBlankIcon /> Data da confermare <span />
                      <MapPinIcon /> Campo da confermare
                    </div>
                  </div>
                  <div className="calendar-panel">
                    <div className="calendar-heading">
                      <div>
                        <span className="red-label">IN AGENDA</span>
                        <h3>
                          {MONTH_NAMES[month]} <b>{year}</b>
                        </h3>
                      </div>
                      <div>
                        <button
                          aria-label="Mese precedente"
                          onClick={() => changeMonth(-1)}
                        >
                          <CaretLeftIcon />
                        </button>
                        <button
                          aria-label="Mese successivo"
                          onClick={() => changeMonth(1)}
                        >
                          <CaretRightIcon />
                        </button>
                      </div>
                    </div>
                    <div className="calendar-grid">
                      {WEEKDAYS.map((item, index) => (
                        <span key={"n" + index} className="day-name">
                          {item}
                        </span>
                      ))}
                      {Array.from(
                        {
                          length: firstWeekdayOffset,
                        },
                        (E, _) => (
                          <span key={"b" + _} />
                        ),
                      )}
                      {Array.from(
                        {
                          length: daysInMonth,
                        },
                        (E, _) => {
                          const ce = _ + 1;
                          const ma =
                            year === new Date().getFullYear() &&
                            month === new Date().getMonth() &&
                            ce === new Date().getDate();
                          return (
                            <button
                              key={ce}
                              aria-label={`${ce} ${MONTH_NAMES[month]} ${year}`}
                              aria-pressed={selectedDay === ce}
                              className={
                                (selectedDay === ce ? "selected " : "") +
                                (ma ? "today" : "")
                              }
                              onClick={() => setSelectedDay(ce)}
                            >
                              {ce}
                              {ma && <span />}
                            </button>
                          );
                        },
                      )}
                    </div>
                    <div className="day-detail" aria-live="polite">
                      {selectedDay ? (
                        <>
                          <strong>
                            {selectedDay} {MONTH_NAMES[month].toLowerCase()}
                          </strong>
                          <span>Nessuna gara pubblicata per questa data.</span>
                        </>
                      ) : (
                        <>
                          <strong>Il tuo prossimo appuntamento.</strong>
                          <span>
                            Seleziona un giorno per consultare il calendario.
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="match-notice">
                  <ShieldCheckIcon size={18} />
                  <span>
                    Qui troverai date, risultati e classifiche ufficiali di
                    tutte le nostre squadre.
                  </span>
                  <button
                    onClick={() =>
                      openContact("Informazioni partite e calendari")
                    }
                  >
                    Chiedi informazioni <ArrowUpRightIcon />
                  </button>
                </div>
              </div>
            </section>
            <div className="home-match-center-link section-wrap">
              <a className="text-link" href="/partite-risultati.html">
                Apri Partite e risultati <ArrowRightIcon />
              </a>
            </div>
            <section className="history-section" id="storia">
              <div className="history-red" />
              <img
                className="history-photo"
                src={ASSET_BASE + "story.webp"}
                alt="Atleti e atlete in maglia rossa festeggiano in campo"
                loading="lazy"
              />
              <div className="history-copy" data-reveal>
                <Eyebrow light>La nostra storia</Eyebrow>
                <h2>
                  DAL 1976.
                  <br />
                  SEMPRE
                  <br />
                  IN CAMPO.
                </h2>
                <p>
                  Una passione che unisce generazioni.
                  <br />
                  Squadre maschili e femminili,
                  <br />
                  dal Minivolley alla Serie C.
                </p>
                <button
                  className="button white-outline"
                  onClick={() => location.assign("/dal-1976.html")}
                >
                  La nostra storia <ArrowRightIcon />
                </button>
              </div>
              <span className="history-year" aria-hidden="true">
                1976
              </span>
            </section>
            <section className="legacy-section section-wrap">
              <div className="legacy-top" data-reveal>
                <Eyebrow>Le radici. Il futuro.</Eyebrow>
                <h2>
                  Da Foiano, verso
                  <br />
                  <em>i grandi campi.</em>
                </h2>
                <p>
                  Una storia attraversata da atleti arrivati in Nazionale e in
                  Serie A. Un patrimonio di persone, passione e pallavolo da
                  raccontare.
                </p>
              </div>
              <div className="history-timeline">
                <div
                  className="timeline-tabs"
                  role="tablist"
                  aria-label="Il percorso della società"
                >
                  {["1976", "Oggi", "Domani"].map((item, index) => (
                    <button
                      key={item}
                      className={timelineTab === index ? "active" : ""}
                      role="tab"
                      aria-selected={timelineTab === index}
                      onClick={() => setTimelineTab(index)}
                    >
                      <span>{item}</span>
                      <i />
                    </button>
                  ))}
                </div>
                <div key={timelineTab} className="timeline-content">
                  <span className="timeline-number">
                    {["1976", "OGGI", "FUTURO"][timelineTab]}
                  </span>
                  <div>
                    <span className="red-label">
                      {
                        [
                          "LE ORIGINI",
                          "LA NOSTRA ENERGIA",
                          "LE NUOVE GENERAZIONI",
                        ][timelineTab]
                      }
                    </span>
                    <h3>
                      {
                        [
                          "Una storia che comincia a Foiano.",
                          "La stessa passione. Ogni giorno.",
                          "Il futuro è il prossimo palleggio.",
                        ][timelineTab]
                      }
                    </h3>
                    <p>
                      {
                        [
                          "Dal 1976 Foiano Pallavolo fa parte della vita sportiva del territorio. Una storia che continua attraverso le sue persone.",
                          "La Serie C maschile, la Prima Divisione femminile e i percorsi giovanili: tante squadre, una sola identità.",
                          "Bambini e bambine, ragazzi e ragazze. Il Minivolley e il settore giovanile sono il cuore di ciò che verrà.",
                        ][timelineTab]
                      }
                    </p>
                    <button
                      className="text-link"
                      onClick={() =>
                        openContact("Storia e archivio Foiano Pallavolo")
                      }
                    >
                      Condividi un ricordo <ArrowUpRightIcon />
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section className="youth-section section-wrap" id="inizia">
              <button
                className="youth-photo"
                onClick={() =>
                  setLightbox({
                    src: "youth",
                    title: "Insieme per lo sport, per i nostri ragazzi!",
                  })
                }
              >
                <img
                  src={ASSET_BASE + "youth.webp"}
                  alt="Allenatore con ragazzi e ragazze durante un allenamento"
                  loading="lazy"
                />
                <span className="image-expand">
                  <PlusIcon />
                </span>
                <span className="youth-photo-caption">
                  IL PRIMO PUNTO È DIVERTIRSI.
                </span>
              </button>
              <div className="youth-copy" data-reveal>
                <Eyebrow>Minivolley e settore giovanile</Eyebrow>
                <h2>
                  Insieme per lo sport,
                  <br />
                  <em>per i nostri ragazzi!</em>
                </h2>
                <p>
                  Il primo palleggio, una nuova amicizia, la gioia di fare
                  squadra. Un percorso per bambini e bambine, ragazzi e ragazze.
                </p>
                <div className="youth-details">
                  <span>
                    <VolleyballIcon /> Dal Minivolley alla Serie C
                  </span>
                  <span>
                    <MapPinIcon /> Foiano della Chiana
                  </span>
                </div>
                <button
                  className="button primary"
                  onClick={() => openContact()}
                >
                  Vieni a giocare <ArrowRightIcon />
                </button>
                <span className="small-note">
                  Chiedi informazioni su gruppi, orari e modalità di prova.
                </span>
              </div>
            </section>
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
                <p>
                  Uno spazio dedicato alle realtà che sostengono il nostro
                  volley.
                </p>
              </div>
              <div className="partners-wall-grid">
                <div className="partner-wall-main">
                  <span className="red-label">MAIN PARTNER</span>
                  <strong>
                    Il tuo marchio.
                    <br />
                    La nostra passione.
                  </strong>
                  <span className="partner-space-note">
                    Spazio riservato al logo
                  </span>
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
                  Scopri gli spazi di sponsorizzazione{" "}
                  <ArrowUpRightIcon size={17} />
                </button>
              </div>
            </section>
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
                      onClick={() =>
                        openContact("Sponsorizzazione Foiano Pallavolo")
                      }
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
          </>
        )}
      </main>
      <footer id="contatti">
        <div className="footer-main section-wrap">
          <a href="/" className="footer-brand">
            <img
              src={ASSET_BASE + "logo-ufficiale-fondo-rosso.png"}
              alt="Foiano Pallavolo dal 1976"
            />
          </a>
          <div className="footer-contact">
            <span className="red-label">FOIANO PALLAVOLO · DAL 1976</span>
            <h2>
              Restiamo
              <br />
              in contatto.
            </h2>
            <a href="tel:+393339331480">
              333 9331480 <ArrowUpRightIcon />
            </a>
            <a href="mailto:marketing.foianopallavolo@gmail.com">
              marketing.foianopallavolo@gmail.com <ArrowUpRightIcon />
            </a>
            <p>
              Via Foro Boario
              <br />
              Foiano della Chiana (AR)
              <br />
              Matricola FIPAV 100460024
            </p>
          </div>
          <div className="footer-links">
            <span>IL CLUB</span>
            <SiteLink to="home">Home</SiteLink>
            <SiteLink to="squadre">Squadre</SiteLink>
            <SiteLink
              to="storia"
              aria-current={isHistoryPage ? "page" : undefined}
            >
              Dal 1976
            </SiteLink>
            <SiteLink to="partite">Partite e risultati</SiteLink>
            <SiteLink to="club">Il club</SiteLink>
            <a href="/#news">News</a>
            <SiteLink to="sponsor">Sponsor</SiteLink>
            <SiteLink to="contatti">Contatti</SiteLink>
            <button onClick={() => openContact()}>Vieni a giocare</button>
          </div>
          <div className="footer-links">
            <span>IN CAMPO</span>
            {TEAMS.map((item) => (
              <button key={item.id} onClick={() => openTeam(item)}>
                {item.name}
              </button>
            ))}
            <span className="fipav">Matricola FIPAV 100460024</span>
          </div>
        </div>
        <div className="footer-bottom section-wrap">
          <span>
            © {new Date().getFullYear()} Foiano Pallavolo · Tutti i diritti
            riservati
          </span>
          <span className="footer-version">
            Versione sito 1.5{" "}
            <details>
              <summary>Changelog</summary>
              <div>
                <strong>Versione 1.5</strong>
                <p>Regole di contrasto consolidate e verifiche mobile.</p>
                <strong>Versione 1.4</strong>
                <p>Contrasto verificato su tutte le pagine desktop e mobile.</p>
                <strong>Versione 1.3</strong>
                <p>Testi e footer più leggibili.</p>
                <strong>Versione 1.2</strong>
                <p>Aggiunte le pagine Sponsor e Contatti.</p>
                <strong>Versione 1.1</strong>
                <p>Footer, crediti e leggibilità mobile aggiornati.</p>
                <strong>Versione 1.0</strong>
                <p>Home, squadre, storia, club, partite e notizie.</p>
              </div>
            </details>
          </span>
          <span className="footer-credit">
            {"Powered & Design by "}
            <a
              href="https://www.keyidea.it/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Keyidea di David Felci ↗
            </a>
          </span>
          <span className="footer-disclaimer">
            Foto dimostrative · Calendari in aggiornamento
          </span>
          <button onClick={() => setMotionOff((E) => !E)}>
            {motionOff ? <PlayIcon /> : <PauseIcon />}{" "}
            {motionOff ? "Attiva animazioni" : "Riduci animazioni"}
          </button>
          <button
            className="back-top"
            aria-label="Torna in cima"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: motionOff ? "instant" : "smooth",
              })
            }
          >
            <ArrowUpIcon />
          </button>
        </div>
      </footer>
      {(dialog || lightbox) && (
        <div className="modal-backdrop" onClick={closeDialog}>
          <section
            className={"dialog " + (lightbox ? "lightbox" : "")}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox?.title || "Foiano Pallavolo"}
            ref={dialogRef}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="dialog-close"
              aria-label="Chiudi finestra"
              onClick={closeDialog}
            >
              <XIcon />
            </button>
            {lightbox ? (
              <>
                <img
                  src={ASSET_BASE + lightbox.src + ".webp"}
                  alt={lightbox.title}
                />
                <div className="lightbox-caption">
                  <h2>{lightbox.title}</h2>
                  <span>Foto dimostrativa</span>
                </div>
              </>
            ) : dialog.type === "team" ? (
              <>
                <img
                  className="dialog-cover"
                  src={ASSET_BASE + dialog.team.image + ".webp"}
                  alt={dialog.team.name}
                />
                <div className="dialog-body">
                  <Eyebrow>{dialog.team.tag}</Eyebrow>
                  <h2>{dialog.team.name}</h2>
                  <p>{dialog.team.text}</p>
                  <div className="team-facts">
                    <span>
                      <MapPinIcon /> Foiano della Chiana
                    </span>
                    <span>
                      <VolleyballIcon /> Foiano Pallavolo · Dal 1976
                    </span>
                  </div>
                  <p className="muted">
                    Per conoscere rosa, staff, orari di allenamento e modalità
                    di partecipazione, contatta la società.
                  </p>
                  <div className="dialog-actions">
                    <button
                      className="button primary"
                      onClick={() =>
                        openContact("Informazioni " + dialog.team.name)
                      }
                    >
                      Chiedi informazioni <ArrowUpRightIcon />
                    </button>
                    <button
                      className="text-link"
                      onClick={() => gotoCalendar(dialog.team.id)}
                    >
                      Calendario <ArrowRightIcon />
                    </button>
                  </div>
                </div>
              </>
            ) : dialog.type === "teams" ? (
              <div className="dialog-body">
                <Eyebrow>Tante squadre. Una sola identità.</Eyebrow>
                <h2>Trova la tua squadra.</h2>
                <div className="team-list">
                  {TEAMS.map((item) => (
                    <button key={item.id} onClick={() => openTeam(item)}>
                      <img src={ASSET_BASE + item.image + ".webp"} alt="" />
                      <span>
                        <strong>{item.name}</strong>
                        <small>{item.tag}</small>
                      </span>
                      <ArrowUpRightIcon />
                    </button>
                  ))}
                </div>
              </div>
            ) : dialog.type === "history" ? (
              <div className="dialog-body">
                <Eyebrow>Dal 1976</Eyebrow>
                <h2>
                  Una passione
                  <br />
                  che continua.
                </h2>
                <p>
                  Foiano Pallavolo nasce nel 1976. Da allora la sua storia
                  attraversa generazioni di atleti e atlete, fino a percorsi in
                  Nazionale e in Serie A.
                </p>
                <p>
                  Oggi la società riunisce la Serie C maschile, la Prima
                  Divisione femminile, il settore giovanile e il Minivolley.
                </p>
                <div className="history-callout">
                  Hai una foto, una storia o un ricordo?
                  <br />
                  <strong>Aiutaci a raccontare la nostra storia.</strong>
                </div>
                <button
                  className="button primary"
                  onClick={() =>
                    openContact("Storia e archivio Foiano Pallavolo")
                  }
                >
                  Condividi un ricordo <ArrowUpRightIcon />
                </button>
              </div>
            ) : dialog.type === "sponsor" ? (
              <div className="dialog-body">
                <Eyebrow>Insieme per lo sport</Eyebrow>
                <h2>
                  Il tuo marchio.
                  <br />
                  La nostra squadra.
                </h2>
                <p>
                  Scopri gli spazi sulle divise e le opportunità di
                  sponsorizzazione di Foiano Pallavolo.
                </p>
                <div className="sponsor-tiers">
                  {[200, 300, 350, 500, 1e3].map((item) => (
                    <span key={item}>€ {item.toLocaleString("it-IT")}</span>
                  ))}
                </div>
                <span className="small-note">
                  Fasce previste dal materiale della società. Importi IVA
                  esclusa.
                </span>
                <div className="history-callout">
                  <strong>Pacchetto visibilità · + € 50</strong>
                  <br />
                  Maglia da gioco, post social dedicato e pubblicità sul TV
                  segnapunti. Condizioni e disponibilità da confermare con la
                  società.
                </div>
                <button
                  className="button primary"
                  onClick={() => openContact("Richiesta pacchetto sponsor")}
                >
                  Richiedi il pacchetto <ArrowUpRightIcon />
                </button>
              </div>
            ) : (
              <div className="dialog-body">
                <Eyebrow>Facciamo squadra</Eyebrow>
                <h2>
                  {contactInterest.includes("sponsor") ||
                  contactInterest.includes("Sponsorizzazione")
                    ? "Sostieni il territorio."
                    : "Il prossimo passo è tuo."}
                </h2>
                <p>Scrivi alla società per ricevere tutte le informazioni.</p>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    prepareEmail();
                  }}
                >
                  <label>
                    Il tuo nome
                    <input
                      value={contactName}
                      onChange={(event) => setContactName(event.target.value)}
                      required
                      autoComplete="name"
                      placeholder="Nome e cognome"
                    />
                  </label>
                  <label>
                    Mi interessa
                    <select
                      value={contactInterest}
                      onChange={(event) =>
                        setContactInterest(event.target.value)
                      }
                    >
                      {[
                        ...new Set([
                          contactInterest,
                          "Vieni a giocare",
                          "Serie C maschile",
                          "Prima Divisione femminile",
                          "Giovanili maschili",
                          "Giovanili femminili",
                          "Minivolley",
                          "Sponsorizzazione Foiano Pallavolo",
                          "Storia e archivio Foiano Pallavolo",
                        ]),
                      ].map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Il tuo messaggio
                    <textarea
                      value={contactMessage}
                      onChange={(event) =>
                        setContactMessage(event.target.value)
                      }
                      required
                      rows={3}
                      placeholder="Raccontaci cosa vorresti sapere…"
                    />
                  </label>
                  <button type="submit" className="button primary">
                    Prepara l'email <EnvelopeSimpleIcon />
                  </button>
                  <span className="small-note">
                    Si apre la tua app email. Potrai controllare il messaggio
                    prima di inviarlo.
                  </span>
                  {emailPrepared && (
                    <p className="form-status" role="status">
                      <CheckIcon /> Email preparata. Se l'app non si apre,
                      scrivi a marketing.foianopallavolo@gmail.com.
                    </p>
                  )}
                </form>
                <div className="contact-alternatives">
                  <a href="tel:+393339331480">
                    <PhoneIcon />
                    333 9331480
                  </a>
                  <a href="mailto:marketing.foianopallavolo@gmail.com">
                    <EnvelopeSimpleIcon />
                    Scrivi direttamente
                  </a>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
