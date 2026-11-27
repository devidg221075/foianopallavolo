import { ArrowRightIcon } from "@phosphor-icons/react";
import { Eyebrow } from "../../components/Eyebrow";
import { ASSET_BASE } from "../../config";

export function HistorySection() {
  return (
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
  );
}
