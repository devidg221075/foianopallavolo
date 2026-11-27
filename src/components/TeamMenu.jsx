import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CaretDownIcon,
} from "@phosphor-icons/react";
import { TEAM_LABELS } from "../data/teams";

function TeamMenuLinks({ items, teamHref, active }) {
  return items.map((item) => (
    <a
      key={item.id}
      className="team-menu-link"
      href={teamHref(item)}
      aria-current={active === item.id ? "page" : undefined}
    >
      <span>
        <strong>{TEAM_LABELS[item.id]}</strong>
        <small>
          {item.id === "c"
            ? "Serie C"
            : item.id === "f"
              ? "Prima Divisione"
              : item.id === "mini"
                ? "Bambini e bambine"
                : "Scopri il percorso e i gruppi"}
        </small>
      </span>
      <ArrowUpRightIcon />
    </a>
  ));
}

export function TeamMegaMenu({ teams, teamHref, active, close }) {
  return (
    <nav
      id="squadre-mega-menu"
      className="team-mega-panel"
      aria-label="Squadre e settori"
    >
      <div className="team-mega-intro on-red">
        <span>FOIANO PALLAVOLO · DAL 1976</span>
        <h2>
          Tante squadre.
          <br />
          Una sola identità.
        </h2>
        <a href="/squadre.html" onClick={close}>
          Tutte le squadre <ArrowRightIcon />
        </a>
      </div>
      <div className="team-mega-group">
        <h2>Prime squadre</h2>
        <TeamMenuLinks
          items={teams.slice(0, 2)}
          teamHref={teamHref}
          active={active}
        />
      </div>
      <div className="team-mega-group">
        <h2>Settore giovanile</h2>
        <TeamMenuLinks
          items={teams.slice(2, 4)}
          teamHref={teamHref}
          active={active}
        />
      </div>
      <div className="team-mega-mini">
        <a
          href={teamHref(teams[4])}
          aria-current={active === "mini" ? "page" : undefined}
        >
          <img
            src="/assets/mini.webp"
            alt="Minivolley, il primo incontro con la pallavolo"
          />
          <strong>
            Minivolley <ArrowUpRightIcon />
          </strong>
          <span>Il primo punto è divertirsi.</span>
        </a>
      </div>
    </nav>
  );
}

export function MobileTeamLinks({ teams, teamHref, active }) {
  return (
    <details className="mobile-team-links">
      <summary>
        Esplora le squadre <CaretDownIcon />
      </summary>
      <div className="mobile-team-group">
        <h3>Prime squadre</h3>
        <TeamMenuLinks
          items={teams.slice(0, 2)}
          teamHref={teamHref}
          active={active}
        />
        <h3>Settore giovanile</h3>
        <TeamMenuLinks
          items={teams.slice(2, 4)}
          teamHref={teamHref}
          active={active}
        />
        <h3>Per i più piccoli</h3>
        <TeamMenuLinks
          items={teams.slice(4)}
          teamHref={teamHref}
          active={active}
        />
      </div>
    </details>
  );
}
