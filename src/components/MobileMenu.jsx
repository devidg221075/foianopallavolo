import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { Eyebrow } from "./Eyebrow";
import { SiteLink } from "./SiteLink";
import { MobileTeamLinks } from "./TeamMenu";
import { TEAMS } from "../data/teams";
import { currentTeamId, teamHref } from "../lib/routes";

export function MobileMenu({ openContact, setMobileMenuOpen }) {
  return (
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
  );
}
