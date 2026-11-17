import {
  ArrowRightIcon,
  MapPinIcon,
  PlusIcon,
  VolleyballIcon,
} from "@phosphor-icons/react";
import { Eyebrow } from "../../components/Eyebrow";
import { ASSET_BASE } from "../../config";

export function YouthSection({ openContact, setLightbox }) {
  return (
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
          Il primo palleggio, una nuova amicizia, la gioia di fare squadra. Un
          percorso per bambini e bambine, ragazzi e ragazze.
        </p>
        <div className="youth-details">
          <span>
            <VolleyballIcon /> Dal Minivolley alla Serie C
          </span>
          <span>
            <MapPinIcon /> Foiano della Chiana
          </span>
        </div>
        <button className="button primary" onClick={() => openContact()}>
          Vieni a giocare <ArrowRightIcon />
        </button>
        <span className="small-note">
          Chiedi informazioni su gruppi, orari e modalità di prova.
        </span>
      </div>
    </section>
  );
}
