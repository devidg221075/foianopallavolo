import { useState } from "react";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { NewsSection } from "../components/NewsSection";
import { HISTORY_CHAPTERS } from "../data/history";

export function HistoryPage({ openContact }) {
  const [activeChapter, setActiveChapter] = useState(0);
  const chapter = HISTORY_CHAPTERS[activeChapter];
  function onTabKeyDown(event) {
    let next = activeChapter;
    if (event.key === "ArrowRight") next = (activeChapter + 1) % 4;
    else if (event.key === "ArrowLeft") next = (activeChapter + 3) % 4;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 3;
    else return;
    event.preventDefault();
    setActiveChapter(next);
    document.getElementById("chapter-" + next)?.focus();
  }
  return (
    <div className="history-page">
      <section className="teams-hero on-red history-master-hero">
        <img
          className="teams-hero-photo"
          src="/assets/story.webp"
          alt="Atleti e atlete in maglia rossa festeggiano insieme, immagine dimostrativa"
          fetchPriority="high"
        />
        <div className="teams-hero-red" />
        <div className="teams-hero-copy">
          <div className="teams-breadcrumb">
            <a href="/">HOME</a>
            <span>/</span>DAL 1976
          </div>
          <h1>
            <span>DAL 1976.</span>
            <span>SEMPRE</span>
            <span>IN CAMPO.</span>
          </h1>
          <p>
            Le persone cambiano.
            <br />
            La passione resta.
          </p>
        </div>
        <span className="teams-photo-note">
          FOTO DIMOSTRATIVA · NON D’ARCHIVIO
        </span>
      </section>
      <div className="history-anniversary on-red">
        <span>1976 — 2026</span>
        <strong>50</strong>
        <p>
          ANNI DI VOLLEY.
          <br />
          UNA SOLA FAMIGLIA.
        </p>
        <a href="#capitoli">
          Ripercorri la storia <ArrowRightIcon />
        </a>
      </div>
      <section className="history-intro teams-wrap">
        <div data-reveal>
          <div className="teams-kicker">LE NOSTRE RADICI</div>
          <h2>
            Una storia di sport.
            <br />
            <em>Prima di tutto, di persone.</em>
          </h2>
        </div>
        <div>
          <p>
            Dal 1976 Foiano Pallavolo è un punto d’incontro per chi ama questo
            sport. Una società cresciuta con il territorio, grazie all’impegno
            di atleti, allenatori, dirigenti, volontari e famiglie.
          </p>
          <p>
            Educare al rispetto, imparare a stare insieme, trovare il proprio
            posto in squadra: sono i valori con cui è cominciato tutto. E con
            cui continuiamo a entrare in palestra.
          </p>
        </div>
      </section>
      <section className="history-chapters teams-wrap" id="capitoli">
        <div className="teams-kicker">I CAPITOLI DELLA NOSTRA STORIA</div>
        <h2>
          Il tempo passa.
          <br />
          La passione si tramanda.
        </h2>
        <div
          className="history-tabs"
          role="tablist"
          aria-label="Capitoli della storia"
          onKeyDown={onTabKeyDown}
        >
          {HISTORY_CHAPTERS.map((chapterItem, index) => (
            <button
              key={chapterItem.date}
              id={"chapter-" + index}
              role="tab"
              aria-selected={activeChapter === index}
              aria-controls="history-panel"
              tabIndex={activeChapter === index ? 0 : -1}
              onClick={() => setActiveChapter(index)}
            >
              <strong>{chapterItem.date}</strong>
              <span>{chapterItem.label}</span>
            </button>
          ))}
        </div>
        <div
          className="history-panel"
          id="history-panel"
          role="tabpanel"
          aria-labelledby={"chapter-" + activeChapter}
          tabIndex={0}
        >
          <div className="history-panel-number" aria-hidden="true">
            0{activeChapter + 1}
          </div>
          <div key={activeChapter}>
            <span className="teams-kicker">{chapter.label}</span>
            <h3>{chapter.title}</h3>
            <p>{chapter.text}</p>
          </div>
        </div>
      </section>
      <section className="history-caronte on-red" id="loredano">
        <div className="teams-wrap history-caronte-grid">
          <div className="history-memorial">
            <img src="/assets/giglio-bianco.png" alt="" loading="lazy" />
            <span>IL NOSTRO GRAZIE, PER SEMPRE.</span>
            <strong>
              LOREDANO
              <br />
              VANNUCCINI
            </strong>
            <em>Per tutti, Caronte.</em>
          </div>
          <div className="history-caronte-copy">
            <div className="teams-kicker">UNA PRESENZA CHE RESTA</div>
            <h2>
              La nostra casa.
              <br />
              Il suo nome.
            </h2>
            <p>
              Socio fondatore e storico presidente, Loredano Vannuccini ha
              accompagnato generazioni di atleti. La sua scomparsa, nell’ottobre
              2025, ha lasciato un vuoto nella famiglia della pallavolo
              foianese.
            </p>
            <p>
              Il 20 settembre 2026 il Palazzetto dello Sport di Foiano della
              Chiana è stato intitolato alla sua memoria. Un legame che continua
              ogni volta che una nuova squadra entra in campo.
            </p>
            <a
              className="button white"
              href="https://arezzonetweek.it/foiano-della-chiana/a-foiano-il-palazzetto-dello-sport-ricorda-loredano-vannuccini/"
              target="_blank"
              rel="noopener noreferrer"
            >
              La cerimonia di intitolazione <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </section>
      <section className="history-talent teams-wrap">
        <div>
          <div className="teams-kicker">DAL NOSTRO VIVAIO</div>
          <h2>
            Il primo campo,
            <br />
            <em>non si dimentica.</em>
          </h2>
          <p>
            La storia di Alessandro Fei unisce le origini a Foiano ai grandi
            palcoscenici della pallavolo. Un esempio di quanto lontano possa
            arrivare una passione nata in una palestra di provincia.
          </p>
        </div>
        <div className="history-fei">
          <span>FOIANO → SERIE A → NAZIONALE</span>
          <strong>
            ALESSANDRO
            <br />
            FEI<span>.</span>
          </strong>
          <p>
            Una storia di talento.
            <br />
            Le radici, qui.
          </p>
        </div>
      </section>
      <NewsSection variant="history" />
      <section className="teams-join on-red">
        <div className="teams-wrap">
          <div>
            <h2>ANCHE TU SEI LA NOSTRA STORIA.</h2>
            <p>Una fotografia, un ricordo, una stagione da raccontare.</p>
          </div>
          <button
            className="button white"
            onClick={() => openContact("Storia e archivio Foiano Pallavolo")}
          >
            Condividi un ricordo <ArrowRightIcon />
          </button>
        </div>
      </section>
      <div className="history-sources teams-wrap">
        <details>
          <summary>Fonti e approfondimenti</summary>
          <p>
            Testi aggiornati a novembre 2026. Le immagini sono dimostrative; non
            rappresentano fotografie storiche.
          </p>
          <a
            href="https://comune.foiano.ar.it/luoghi/3294796/foiano-pallavolo-g-s-d"
            target="_blank"
            rel="noopener noreferrer"
          >
            Comune di Foiano della Chiana · Origini, valori e percorso sportivo
          </a>
          <a
            href="https://arezzonetweek.it/foiano-della-chiana/a-foiano-il-palazzetto-dello-sport-ricorda-loredano-vannuccini/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arezzo Netweek · Intitolazione del palazzetto
          </a>
          <p>
            Le date dei capitoli “B1” e “I talenti” non indicano una stagione
            specifica. L’archivio storico è in costruzione: contribuisci con
            documenti e fotografie.
          </p>
        </details>
      </div>
    </div>
  );
}
