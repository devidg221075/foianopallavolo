import {
  ArrowUpIcon,
  ArrowUpRightIcon,
  PauseIcon,
  PlayIcon,
} from "@phosphor-icons/react";
import { SiteLink } from "./SiteLink";
import { ASSET_BASE } from "../config";
import { TEAMS } from "../data/teams";
import { isHistoryPage } from "../lib/routes";

export function SiteFooter({ motionOff, openContact, openTeam, setMotionOff }) {
  return (
    <footer id="contatti">
      <div className="footer-main section-wrap">
        <a href="/" className="footer-brand">
          <img
            src={ASSET_BASE + "logo-ufficiale-fondo-rosso.png"}
            alt="Foiano Pallavolo dal 1976"
          />
        </a>
        <div className="footer-contact">
          <span className="red-label">FOIANO PALLAVOLO · DAL 1976</span>
          <h2>
            Restiamo
            <br />
            in contatto.
          </h2>
          <a href="tel:+393339331480">
            333 9331480 <ArrowUpRightIcon />
          </a>
          <a href="mailto:marketing.foianopallavolo@gmail.com">
            marketing.foianopallavolo@gmail.com <ArrowUpRightIcon />
          </a>
          <p>
            Via Foro Boario
            <br />
            Foiano della Chiana (AR)
            <br />
            Matricola FIPAV 100460024
          </p>
        </div>
        <div className="footer-links">
          <span>IL CLUB</span>
          <SiteLink to="home">Home</SiteLink>
          <SiteLink to="squadre">Squadre</SiteLink>
          <SiteLink
            to="storia"
            aria-current={isHistoryPage ? "page" : undefined}
          >
            Dal 1976
          </SiteLink>
          <SiteLink to="partite">Partite e risultati</SiteLink>
          <SiteLink to="galleria">Galleria</SiteLink>
          <SiteLink to="club">Il club</SiteLink>
          <a href="/#news">News</a>
          <SiteLink to="sponsor">Sponsor</SiteLink>
          <SiteLink to="contatti">Contatti</SiteLink>
          <button onClick={() => openContact()}>Vieni a giocare</button>
        </div>
        <div className="footer-links">
          <span>IN CAMPO</span>
          {TEAMS.map((item) => (
            <button key={item.id} onClick={() => openTeam(item)}>
              {item.name}
            </button>
          ))}
          <span className="fipav">Matricola FIPAV 100460024</span>
        </div>
      </div>
      <div className="footer-bottom section-wrap">
        <span>
          © {new Date().getFullYear()} Foiano Pallavolo · Tutti i diritti
          riservati
        </span>
        <span className="footer-version">
          Versione sito 1.12{" "}
          <details>
            <summary>Changelog</summary>
            <div>
              <strong>Versione 1.12</strong>
              <p>
                Galleria con album e categorie (FIPAV 3G, Foiano – Savinese), logo
                dei 50 anni, mascotte, comitati FIPAV e etichetta della squadra
                su ogni gara.
              </p>
              <strong>Versione 1.11</strong>
              <p>Galleria per squadra con filtri e foto ingrandibili.</p>
              <strong>Versione 1.10</strong>
              <p>
                Primo e secondo arbitro nei dettagli gara, quando presenti nella
                fonte FIPAV.
              </p>
              <strong>Versione 1.9</strong>
              <p>
                Classifica in Home e popup con quozienti set e punti condivisa
                con Partite e risultati.
              </p>
              <strong>Versione 1.8</strong>
              <p>
                Loghi più grandi, dettaglio partita affiancato al calendario e
                avversari nelle celle.
              </p>
              <strong>Versione 1.7</strong>
              <p>Loghi ufficiali avversari e calendario con colori e risultati.</p>
              <strong>Versione 1.6</strong>
              <p>Calendario, risultati e classifica Serie C collegati a FIPAV.</p>
              <strong>Versione 1.5</strong>
              <p>Regole di contrasto consolidate e verifiche mobile.</p>
              <strong>Versione 1.4</strong>
              <p>Contrasto verificato su tutte le pagine desktop e mobile.</p>
              <strong>Versione 1.3</strong>
              <p>Testi e footer più leggibili.</p>
              <strong>Versione 1.2</strong>
              <p>Aggiunte le pagine Sponsor e Contatti.</p>
              <strong>Versione 1.1</strong>
              <p>Footer, crediti e leggibilità mobile aggiornati.</p>
              <strong>Versione 1.0</strong>
              <p>Home, squadre, storia, club, partite e notizie.</p>
            </div>
          </details>
        </span>
        <span className="footer-credit">
          {"Powered & Design by "}
          <a
            href="https://www.keyidea.it/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Keyidea di David Felci ↗
          </a>
        </span>
        <span className="footer-disclaimer">
          Foto dimostrative · Calendari in aggiornamento
        </span>
        <button onClick={() => setMotionOff((current) => !current)}>
          {motionOff ? <PlayIcon /> : <PauseIcon />}{" "}
          {motionOff ? "Attiva animazioni" : "Riduci animazioni"}
        </button>
        <button
          className="back-top"
          aria-label="Torna in cima"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: motionOff ? "instant" : "smooth",
            })
          }
        >
          <ArrowUpIcon />
        </button>
      </div>
    </footer>
  );
}
