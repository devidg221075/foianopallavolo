import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { NEWS } from "../data/news";

export function NewsSection({ variant = "home" }) {
  return (
    <section
      className={
        "club-news " +
        (variant === "home" ? "home-news section-wrap" : "teams-wrap")
      }
      id={variant === "home" ? "news" : "rassegna-stampa"}
      aria-labelledby={"news-title-" + variant}
    >
      <div className="club-news-heading">
        <div>
          <div className="teams-kicker">DENTRO E FUORI DAL CAMPO</div>
          <h2 id={"news-title-" + variant}>
            {variant === "home" ? (
              <>
                Le storie del nostro club<span>.</span>
              </>
            ) : (
              <>
                Le pagine più recenti
                <br />
                della nostra storia.
              </>
            )}
          </h2>
        </div>
        {variant === "home" && (
          <a className="text-link" href="/dal-1976.html#rassegna-stampa">
            Tutte le notizie <ArrowRightIcon />
          </a>
        )}
      </div>
      <p className="club-news-note">
        Rassegna stampa · Le nostre sintesi, le fonti originali.
      </p>
      <div className="club-news-grid">
        {NEWS.map((item, index) => (
          <article
            key={item.id}
            id={variant === "history" ? item.id : undefined}
          >
            <div
              className={"club-news-visual news-visual-" + index}
              aria-hidden="true"
            >
              {index === 0 ? (
                <>
                  <span>1976 — 2026</span>
                  <strong>
                    50<span>ANNI.</span>
                  </strong>
                  <img src="/assets/giglio-bianco.png" alt="" loading="lazy" />
                </>
              ) : index === 1 ? (
                <>
                  <span>LA NOSTRA CASA</span>
                  <img src="/assets/giglio-rosso.png" alt="" loading="lazy" />
                  <strong>
                    IL SUO
                    <br />
                    NOME.
                  </strong>
                </>
              ) : (
                <>
                  <span>IL NOSTRO GRAZIE.</span>
                  <strong>
                    PER
                    <br />
                    SEMPRE.
                  </strong>
                  <span>LOREDANO VANNUCCINI</span>
                </>
              )}
            </div>
            <div className="club-news-body">
              <div className="club-news-meta">
                <span>{item.tag}</span>
                <time dateTime={item.iso}>{item.date}</time>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                Leggi su {item.source} <ArrowUpRightIcon />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
