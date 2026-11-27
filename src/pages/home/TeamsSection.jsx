import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import { SectionHeading } from "../../components/SectionHeading";
import { ASSET_BASE } from "../../config";
import { TEAMS } from "../../data/teams";

export function TeamsSection({ openTeam }) {
  return (
    <section className="team-section section-wrap" id="squadre">
      <SectionHeading>Tante squadre. Una sola identità.</SectionHeading>
      <div className="team-grid">
        {[
          {
            name: "Maschile",
            image: "squadre-home/maschile",
            desc: "Serie C e settore giovanile",
            team: TEAMS[0],
          },
          {
            name: "Femminile",
            image: "squadre-home/femminile",
            desc: "Prima Divisione e settore giovanile",
            team: TEAMS[1],
          },
          {
            name: "Minivolley",
            image: "squadre-home/minivolley",
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
  );
}
