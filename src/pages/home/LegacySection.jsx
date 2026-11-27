import { useState } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Eyebrow } from "../../components/Eyebrow";

export function LegacySection({ openContact }) {
  const [timelineTab, setTimelineTab] = useState(0);
  return (
    <section className="legacy-section section-wrap">
      <div className="legacy-top" data-reveal>
        <Eyebrow>Le radici. Il futuro.</Eyebrow>
        <h2>
          Da Foiano, verso
          <br />
          <em>i grandi campi.</em>
        </h2>
        <p>
          Una storia attraversata da atleti arrivati in Nazionale e in Serie A.
          Un patrimonio di persone, passione e pallavolo da raccontare.
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
                ["LE ORIGINI", "LA NOSTRA ENERGIA", "LE NUOVE GENERAZIONI"][
                  timelineTab
                ]
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
              onClick={() => openContact("Storia e archivio Foiano Pallavolo")}
            >
              Condividi un ricordo <ArrowUpRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
