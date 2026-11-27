import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import { SectionHeading } from "../../components/SectionHeading";
import { SiteLink } from "../../components/SiteLink";
import { ASSET_BASE } from "../../config";
import { TEAMS } from "../../data/teams";

export function ClubSection({ openContact, openTeam }) {
  return (
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
  );
}
