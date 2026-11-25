import {
  ArrowRightIcon,
  CaretDownIcon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react";
import { SiteLink } from "./SiteLink";
import { TeamMegaMenu } from "./TeamMenu";
import { ASSET_BASE } from "../config";
import { TEAMS } from "../data/teams";
import {
  currentTeamId,
  isClubPage,
  isContactPage,
  isGalleryPage,
  isHistoryPage,
  isInnerPage,
  isMatchesPage,
  isSponsorPage,
  isTeamsPage,
  teamHref,
} from "../lib/routes";

export function SiteHeader({
  mobileMenuOpen,
  openContact,
  scrolled,
  setMobileMenuOpen,
  setTeamsMenuOpen,
  teamsMenuOpen,
}) {
  return (
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
                return document.querySelector("#squadre-mega-menu a")?.focus();
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
            onClick={() => setTeamsMenuOpen((open) => !open)}
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
        <SiteLink to="storia" aria-current={isHistoryPage ? "page" : undefined}>
          Dal 1976
        </SiteLink>
        <SiteLink
          to="prossime-partite"
          aria-current={isMatchesPage ? "page" : undefined}
        >
          Partite e risultati
        </SiteLink>
        <SiteLink
          to="galleria"
          aria-current={isGalleryPage ? "page" : undefined}
        >
          Galleria
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
        onClick={() => setMobileMenuOpen((open) => !open)}
      >
        {mobileMenuOpen ? <XIcon /> : <ListIcon />}
      </button>
    </header>
  );
}
